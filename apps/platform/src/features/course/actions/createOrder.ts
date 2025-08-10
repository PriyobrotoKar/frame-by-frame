import apiClient from '@/lib/api-client';

export const createOrder = async (courseId: string) => {
  return apiClient.post<{
    orderId: string;
    amount: number;
    currency: string;
  }>(`/order?courseId=${courseId}`);
};
