import apiClient from '@/lib/api-client';

export const markAllAsRead = async () => {
  return await apiClient.post('/notification/read-all');
};
