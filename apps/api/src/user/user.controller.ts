import { Body, Controller, Delete, Patch, Res } from '@nestjs/common';
import { UserService } from './user.service';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';
import { type Response } from 'express';
import { clearCookies } from '@/common/utils';
import { UpdateUserDto } from './dto/upate.user';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  async updateSelf(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const data = await this.userService.updateSelf(dto, user);
    return data;
  }

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
