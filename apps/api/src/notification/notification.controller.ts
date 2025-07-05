import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import Admin from '@/decorators/admin.decorator';
import { CreateNotificationDto } from './dto/create.notification';
import { type JwtPayload } from '@/types/jwt.payload';
import CurrentUser from '@/decorators/user.decorator';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Admin()
  @Post()
  async sendNotification(@Body() body: CreateNotificationDto) {
    return this.notificationService.sendNotification(body);
  }

  @Admin()
  @Get('history')
  async getNotificationHistory() {
    return this.notificationService.getNotificationHistory();
  }

  @Get()
  async getNotifications(
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 10,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.notificationService.getNotifications(user, page, limit);
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser() user: JwtPayload) {
    return this.notificationService.getUnreadCount(user);
  }

  @Post(':notificationId/read')
  async markAsRead(
    @CurrentUser() user: JwtPayload,
    @Query('notificationId') notificationId: string,
  ) {
    return this.notificationService.markAsRead(notificationId, user);
  }

  @Post('read-all')
  async markAllAsRead(@CurrentUser() user: JwtPayload) {
    return this.notificationService.markAllAsRead(user);
  }
}
