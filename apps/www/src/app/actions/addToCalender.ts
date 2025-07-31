import auth from '@/lib/googleAuth';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';

interface CalendarEvent {
  startDate: string;
  endDate: string;
  attendee: string;
}

export const addToCalender = async (event: CalendarEvent) => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });

    const eventResponse = await calendar.events.insert({
      calendarId: 'teamdomicon@gmail.com',
      requestBody: {
        summary: 'New Meeting',
        description: 'Meeting with team',
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
            email: event.attendee,
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
