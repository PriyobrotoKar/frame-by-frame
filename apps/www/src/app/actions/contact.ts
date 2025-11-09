'use server';
import {
  AmountToInvest,
  ContentFrequency,
  CurrentIncome,
  DesiredIncome,
  ScheduleMeeting,
} from '@/lib/store';
import z from 'zod';
import { db } from '@frame-by-frame/db';
import { addToSheet } from './addToSheet';
import { addToCalender } from './addToCalender';
import { verifyActionSecret } from '@/lib/utils';

const schema = z.object({
  name: z.string().min(2).max(100),
  instagram: z.string().min(2).max(100),
  email: z.string().email(),
  niche: z.string().min(2).max(500),
  contentFrequency: z.nativeEnum(ContentFrequency),
  challenge: z.string().min(2).max(1000),
  amountToInvest: z.nativeEnum(AmountToInvest),
  interest: z.string().min(2).max(1000),
  desiredIncome: z.nativeEnum(DesiredIncome),
  currentIncome: z.nativeEnum(CurrentIncome),
  bookedAt: z.date().min(new Date()),
});

export type SchemaType = z.infer<typeof schema>;

export const createContact = async (data: ScheduleMeeting, secret: string) => {
  try {
    await verifyActionSecret(secret);

    const parsedData = await schema.parseAsync(data);

    const [sheetData, calenderData] = await Promise.all([
      addToSheet({
        ...parsedData,
        bookedAt: parsedData.bookedAt.toLocaleString('en-US', {
          timeZone: 'Asia/Kolkata',
        }),
      }),
      addToCalender({
        details: parsedData,
        attendee: {
          email: parsedData.email,
          name: parsedData.name,
        },
        startDate: parsedData.bookedAt.toISOString(),
        endDate: new Date(
          parsedData.bookedAt.getTime() + 60 * 60 * 1000,
        ).toISOString(),
      }),
    ]);

    console.log('Data appended:', sheetData);
    console.log('Event added to calendar:', calenderData);

    const { bookedAt, ...details } = parsedData;

    const contact = await db.contact.create({
      data: {
        ...details,
        booking: {
          create: {
            bookedAt,
            eventId: calenderData.id,
          },
        },
      },
    });

    return contact;
  } catch (error) {
    console.error('Error creating contact:', error);
    return {
      error: 'Failed to create contact',
    };
  }
};

export const getBookings = async () => {
  try {
    const bookings = await db.booking.findMany({});

    return {
      data: bookings,
    };
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      error: 'Failed to fetch bookings',
    };
  }
};
