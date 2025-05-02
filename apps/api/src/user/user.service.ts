import { JwtPayload } from '@/types/jwt.payload';
import { db } from '@frame-by-frame/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async deleteSelf(user: JwtPayload) {
    // For now, we will just delete the user from the database
    // later we may add some more logic here

    await db.user.delete({
      where: {
        id: user.id,
      },
    });

    return { message: 'User deleted successfully' };
  }
}
