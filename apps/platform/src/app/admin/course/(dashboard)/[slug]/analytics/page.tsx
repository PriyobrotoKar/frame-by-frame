import { getCourseAnalyticsOverview } from '@/features/analytics/actions/getCourseAnalytics';
import { getCourseOrders } from '@/features/analytics/actions/getCourseOrders';
import DailySales from '@/features/analytics/components/DailySales';
import LifetimeSales from '@/features/analytics/components/LifetimeSales';
import MonthlySales from '@/features/analytics/components/MonthlySales';
import Orders from '@/features/analytics/components/Orders';
import OrderTable from '@/features/analytics/components/OrderTable';
import { getCourseBySlug } from '@/features/course/actions/getCourse';
import React from 'react';

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug, true);
  const analytics = await getCourseAnalyticsOverview(slug);
  const { orders, totalOrders } = await getCourseOrders(course.courseId);

  return (
    <div className="flex-1 space-y-10 p-8">
      <div className="flex gap-6 [&>*]:flex-1">
        <LifetimeSales analytics={analytics} />
        <MonthlySales analytics={analytics} />
        <Orders analytics={analytics} />
      </div>
      <DailySales analytics={analytics} />
      <OrderTable
        totalCount={totalOrders}
        courseId={course.courseId}
        initialData={orders}
      />
    </div>
  );
}
