import { watchCalender } from '@/app/actions/watchCalender';

export async function GET(req: Request) {
  try {
    console.log('Running cron job...');
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('Unauthorized');

      return new Response('Unauthorized', {
        status: 401,
      });
    }

    await watchCalender();

    console.log('Rewatching calendar...');

    return new Response('Success', {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', {
      status: 500,
    });
  }
}
