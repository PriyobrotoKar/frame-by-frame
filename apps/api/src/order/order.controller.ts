import { Controller, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Query('courseId') courseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.createOrder(courseId, user);
  }
}
