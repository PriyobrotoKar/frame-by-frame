import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create.notification';
import { db, Role } from '@frame-by-frame/db';
import { JwtPayload } from '@/types/jwt.payload';

@Injectable()
export class NotificationService {
  async sendNotification(body: CreateNotificationDto) {
    const notification = await db.notification.create({
      data: body,
    });

    return notification;
  }

  async getNotificationHistory() {
    const notifications = await db.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications;
  }

  async getNotifications(user: JwtPayload, page: number, limit: number) {
    const notifications = await db.notification.findMany({
      skip: page * limit,
      take: limit,
      include: {
        readBy: {
          where: {
            id: user.id,
          },
          select: { id: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const notificationWithReadStatus = notifications.map((notification) => {
      return {
        ...notification,
        isRead:
          user.role === Role.ADMIN ? true : notification.readBy.length > 0,
      };
    });

    const totalCount = await db.notification.count();

    return {
      notifications: notificationWithReadStatus,
      totalCount,
      page,
      limit,
    };
  }

  async getUnreadCount(user: JwtPayload) {
    const totalCount = await db.notification.count();

    const readCount = await db.notification.count({
      where: {
        readBy: {
          some: {
            id: user.id,
          },
        },
      },
    });

    const unreadCount = totalCount - readCount;

    return {
      unreadCount,
    };
  }

  async markAsRead(notificationId: string, user: JwtPayload) {
    // Check if the notification exists
    const notification = await db.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      throw new Error('Notification not found');
    }

    // Check if the user has already read the notification
    const alreadyRead = await db.notification.findUnique({
      where: {
        id: notificationId,
        readBy: {
          some: {
            id: user.id,
          },
        },
      },
    });

    if (alreadyRead) {
      return { message: 'Notification already marked as read' };
    }

    // Mark the notification as read by the user
    const readNotification = await db.notification.update({
      where: { id: notificationId },
      data: {
        readBy: {
          connect: { id: user.id },
        },
      },
    });

    return readNotification;
  }

  async markAllAsRead(user: JwtPayload) {
    // Get all notifications for the user that are not read
    const notifications = await db.notification.findMany({
      where: {
        readBy: {
          none: {
            id: user.id,
          },
        },
      },
    });

    if (notifications.length === 0) {
      return { message: 'No unread notifications to mark as read' };
    }

    // Mark all notifications as read by the user
    const updatedNotifications = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        notifications: {
          connect: notifications.map((notification) => ({
            id: notification.id,
          })),
        },
      },
      select: {
        notifications: true,
      },
    });

    return updatedNotifications;
  }
}
