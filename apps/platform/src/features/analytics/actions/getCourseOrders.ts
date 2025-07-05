import apiClient, { ApiError } from '@/lib/api-client';
import { Order } from '@frame-by-frame/db';

export type OrderWithUser = Order & {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
};

export const getCourseOrders = async (
  courseId: string,
  pagination?: {
    pageIndex: number;
    pageSize: number;
  },
) => {
  return await apiClient.get<{
    orders: OrderWithUser[];
    totalOrders: number;
  }>(`/order/${courseId}/all`, {
    page: (pagination?.pageIndex ?? 0).toString(),
    limit: (pagination?.pageSize ?? 10).toString(),
  });
};

export const getOrderByCourse = async (courseId: string) => {
  try {
    return await apiClient.get<Order>(`/order/${courseId}`);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 404) {
        return null;
      }
    }
    throw error;
  }
};
