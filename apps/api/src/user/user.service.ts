import { JwtPayload } from '@/types/jwt.payload';
import { db } from '@frame-by-frame/db';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/upate.user';

@Injectable()
export class UserService {
  async updateSelf(dto: UpdateUserDto, user: JwtPayload) {
    // Check if the user exists
    const existingUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update the user in the database
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: dto,
    });

    // Return the updated user data
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.profilePic,
    };
  }

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
