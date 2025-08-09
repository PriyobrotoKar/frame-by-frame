import { google } from 'googleapis';
import auth from '@/lib/googleAuth';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = 'https://webhook.site/9f427cf1-942e-47bb-a0c7-9886b72acf6c';

export const watchCalender = async () => {
  const calendar = google.calendar({ version: 'v3', auth });

  const response = await calendar.events.watch({
    calendarId: 'mail@domicon.co',
    requestBody: {
      id: uuidv4(),
      type: 'web_hook',
      address: `${baseUrl}/api/calendar/webhook`,
    },
  });

  console.log(response.data);
};

watchCalender();
