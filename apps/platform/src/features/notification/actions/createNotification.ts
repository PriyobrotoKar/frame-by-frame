import apiClient from '@/lib/api-client';
import { NotificationType } from '@frame-by-frame/db';

export const createNotification = async (data: {
  message: string;
  type: NotificationType;
}) => {
  return await apiClient.post('/notification', data);
};
