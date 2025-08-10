import { calendar_v3, google } from 'googleapis';
import { DateTime } from 'luxon';
import auth from '@/lib/googleAuth';
import { NextResponse } from 'next/server';
import { db, Prisma } from '@frame-by-frame/db';
import redis from '@/lib/redis';
import { revalidatePath } from 'next/cache';

const calendar = google.calendar({ version: 'v3', auth });

const storeSyncToken = async (token: string) => {
  await redis.set('syncToken', token);
};

const getSyncToken = async () => {
  try {
    return null;
    const token = await redis.get<string>('syncToken');
    return token;
  } catch (error) {
    console.error('Error reading sync token:', error);
    return null;
  }
};

const createBookingChunks = (event: calendar_v3.Schema$Event) => {
  if (!event.end?.dateTime || !event.start?.dateTime)
    throw new Error('Invalid event');

  const bookings = [];

  const startTime = new Date(event.start.dateTime);
  const endTime = new Date(event.end.dateTime);

  let time = startTime.getTime();

  while (time < endTime.getTime()) {
    const newStartTime = DateTime.fromMillis(time)
      .setZone('Asia/Kolkata')
      .toJSDate();
    newStartTime.setMinutes(0);
    newStartTime.setSeconds(0);

    console.log('newStartTime', newStartTime, newStartTime.toLocaleString());

    const newEvent: Prisma.BookingCreateInput = {
      eventId: event.id ?? null,
      createdBy: 'USER',
      bookedAt: newStartTime,
    };

    bookings.push(newEvent);

    time += 60 * 60 * 1000;
  }

  return bookings;
};

const refreshEvents = async (events: calendar_v3.Schema$Event[]) => {
  try {
    // delete all the events from the database which is created by the user
    await db.booking.deleteMany({
      where: {
        createdBy: 'USER',
      },
    });

    const structuredEvents = [];

    // create new events in the database
    // for each event, break that event into multiple events if it is longer than 1 hour
    for (const event of events) {
      const bookings = createBookingChunks(event);
      structuredEvents.push(...bookings);
    }

    await db.booking.createMany({
      data: structuredEvents,
    });
  } catch (error) {
    console.error('Error refreshing events:', error);
  }
};

const initialSyncCalendar = async () => {
  try {
    const blacklistedEvents = 'New Meeting';

    const response = await calendar.events.list({
      calendarId: 'mail@domicon.co',
      timeMin: new Date(Date.now() - 60000).toISOString(),
      singleEvents: true,
      maxResults: 250,
    });

    console.log('Recent events:', response.data);

    const filteredEvents = response.data.items?.filter(
      (event) => !blacklistedEvents.includes(event.summary ?? ''),
    );

    if (!filteredEvents) {
      console.log('No events found');
      return;
    }

    if (response.data.nextSyncToken) {
      await storeSyncToken(response.data.nextSyncToken);
    }

    await refreshEvents(filteredEvents);
  } catch (error) {
    console.error('Error syncing calendar:', error);
  }
};

const handleEventDeleted = async (eventId: string) => {
  try {
    // check if there was bookings with this event Id
    const bookings = await db.booking.findMany({
      where: {
        eventId,
      },
      include: {
        contact: true,
      },
    });

    if (!bookings.length) {
      console.log('No bookings found for event', eventId);
      return;
    }

    console.log('Deleting bookings for event: ', eventId);

    await db.booking.deleteMany({
      where: {
        eventId,
      },
    });

    const isBookingByApp = bookings.some(
      (booking) => booking.createdBy === 'APP',
    );

    if (isBookingByApp) {
      await db.contact.delete({
        where: {
          id: bookings[0]?.contact?.id,
        },
      });
    }
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

const handleEventUpdated = async (event: calendar_v3.Schema$Event) => {
  try {
    console.log('Updating bookings for event: ', event.id);

    // delete all bookings for this event
    await db.booking.deleteMany({
      where: {
        eventId: event.id,
      },
    });

    const newBookings = createBookingChunks(event);

    await db.booking.createMany({
      data: newBookings,
    });
  } catch (error) {
    console.error('Error updating event:', error);
  }
};

const handleEventCreated = async (event: calendar_v3.Schema$Event) => {
  try {
    const newBookings = createBookingChunks(event);

    await db.booking.createMany({
      data: newBookings,
    });
  } catch (error) {
    console.error('Error creating event:', error);
  }
};

const processChangedEvents = async (events: calendar_v3.Schema$Event[]) => {
  try {
    const blacklistedEvents = 'New Meeting';

    if (!events.length) {
      console.log('No events found');
      return;
    }

    for (const event of events) {
      if (!event.id) {
        console.log('Event ID is missing');
        continue;
      }

      if (event.status === 'cancelled') {
        // event was deleted
        await handleEventDeleted(event.id);
        continue;
      }

      if (event.summary?.includes(blacklistedEvents)) {
        console.log('Event is blacklisted');
        continue;
      }

      const existingBookings = await db.booking.findMany({
        where: {
          eventId: event.id,
        },
      });

      if (existingBookings.length) {
        // event was updated
        if (!event.start || !event.end) {
          console.log('Event start or end time is missing');
          continue;
        }

        await handleEventUpdated(event);
        continue;
      }

      // event was created
      await handleEventCreated(event);
    }
  } catch (error) {
    console.error('Error processing changed events:', error);
  }
};

export const POST = async () => {
  const syncToken = await getSyncToken();

  if (syncToken === null) {
    await initialSyncCalendar();

    revalidatePath('/');

    return NextResponse.json(
      {
        message: 'Webhook received successfully',
      },
      {
        status: 200,
      },
    );
  }

  const response = await calendar.events.list({
    calendarId: 'mail@domicon.co',
    syncToken,
    singleEvents: true,
  });

  console.log(response.data.items, response.data.nextSyncToken);

  const changedEvents = response.data.items;

  if (response.data.nextSyncToken)
    await storeSyncToken(response.data.nextSyncToken);

  if (!changedEvents) {
    console.log('No events found');
    return;
  }

  await processChangedEvents(changedEvents);

  revalidatePath('/');

  return NextResponse.json(
    {
      message: 'Webhook received successfully',
    },
    {
      status: 200,
    },
  );
};
