import apiClient from '@/lib/api-client';
import { Notification } from '@frame-by-frame/db';

export const getNotificationHistory = async () => {
  return await apiClient.get<Notification[]>('/notification/history');
};
