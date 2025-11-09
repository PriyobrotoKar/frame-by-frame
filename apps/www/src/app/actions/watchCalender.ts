import { google } from 'googleapis';
import auth from '@/lib/googleAuth';
import { v4 as uuidv4 } from 'uuid';

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://webhook.site/3a4329be-ca30-45ad-a9be-bdd0dd393651';

export const watchCalender = async () => {
  try {
    console.log('Creating calendar watch...');
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
    console.log('Watching for calendar events...');
  } catch (error) {
    console.error(error);
  }
};

watchCalender();
