import apiClient from '@/lib/api-client';
import { DailyAnalytics, MonthlyAnalytics } from '@frame-by-frame/db';

export interface AnalyticsOverview {
  totalSales: number;
  totalOrders: number;
  monthlySales: number;
  analytics: {
    monthlyAnalytics: MonthlyAnalytics[];
    dailyAnalytics: DailyAnalytics[];
  };
}

export const getCourseAnalyticsOverview = async (courseId: string) => {
  return await apiClient.get<AnalyticsOverview>(
    `/courses/${courseId}/analytics/overview`,
  );
};
