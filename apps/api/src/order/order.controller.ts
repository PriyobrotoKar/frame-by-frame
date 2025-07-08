import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import CurrentUser from '@/decorators/user.decorator';
import { type JwtPayload } from '@/types/jwt.payload';
import Admin from '@/decorators/admin.decorator';

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

  @Admin()
  @Get(':courseId/all')
  async getOrders(
    @Param('courseId') courseId: string,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
  ) {
    return this.orderService.getOrders(courseId, page, limit);
  }

  @Get(':courseId')
  async getOrderByCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.orderService.getOrderByCourse(courseId, user);
  }
}
