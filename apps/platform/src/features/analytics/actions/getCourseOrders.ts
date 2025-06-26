import apiClient from '@/lib/api-client';
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
  }>(`/order/${courseId}`, {
    page: (pagination?.pageIndex ?? 0).toString(),
    limit: (pagination?.pageSize ?? 10).toString(),
  });
};
