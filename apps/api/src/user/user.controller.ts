import { Controller, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';
import { type Response } from 'express';
import { clearCookies } from '@/common/utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Delete()
  async deleteSelf(
    @CurrentUser() user: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.userService.deleteSelf(user);
    clearCookies(res);
    return data;
  }
}
