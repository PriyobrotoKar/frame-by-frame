import auth from '@/lib/googleAuth';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';
import { SchemaType } from './contact';

interface CalendarEvent {
  startDate: string;
  endDate: string;
  attendee: {
    name: string;
    email: string;
  };
  details: SchemaType;
}

// currentIncome -> Current Income
const formatKey = (key: string) => {
  const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
  return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
};

export const addToCalender = async (event: CalendarEvent) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });

    const eventResponse = await calendar.events.insert({
      calendarId: 'mail@domicon.co',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `New Meeting with ${event.attendee.name}`,
        description: `${Object.entries(event.details)
          .map(([key, value]) => `<strong>${formatKey(key)}:</strong> ${value}`)
          .join('\n')}`,
        start: {
          dateTime: event.startDate,
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: event.endDate,
          timeZone: 'Asia/Kolkata',
        },
        attendees: [
          {
            email: event.attendee.email,
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: 'email',
              minutes: 10,
            },
          ],
        },
        conferenceData: {
          createRequest: {
            requestId: uuidv4(),
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    });

    return eventResponse.data;
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
};
