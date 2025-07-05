import apiClient from '@/lib/api-client';
import { Notification } from '@frame-by-frame/db';

export type NotificationWithReadStatus = Notification & {
  isRead: boolean;
};

export const getNotifications = async () => {
  return await apiClient.get<{
    notifications: NotificationWithReadStatus[];
    totalCount: number;
    page: number;
    limit: number;
  }>('/notification');
};
