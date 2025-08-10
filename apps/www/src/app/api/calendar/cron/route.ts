import { watchCalender } from '@/app/actions/watchCalender';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }

    await watchCalender();

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
