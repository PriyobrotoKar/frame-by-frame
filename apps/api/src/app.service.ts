import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string } {
    console.log(process.env.GOOGLE_CLIENT_ID);
    return { status: 'ok' };
  }
}
