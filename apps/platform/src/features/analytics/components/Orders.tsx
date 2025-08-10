'use client';
import React from 'react';
import { AnalyticsOverview } from '../actions/getCourseAnalytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart } from 'recharts';

interface OrdersProps {
  analytics: AnalyticsOverview;
}

const Orders = ({ analytics: { totalOrders, analytics } }: OrdersProps) => {
  const data = analytics.monthlyAnalytics.map((sale) => ({
    month: sale.createdAt,
    orders: sale.totalOrders,
  }));

  const chartConfig = {
    sales: {
      label: 'Orders',
      color: 'var(--color-chart-1)',
    },
    month: {
      label: 'Month',
      color: 'var(--color-chart-2)',
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-4 rounded-lg border">
      <div className="space-y-1 p-5">
        <h3 className="text-md">Monthly Orders</h3>
        <h2 className="text-2xl">{totalOrders ?? 0}</h2>
      </div>
      <div>
        {data.length > 1 ? (
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <AreaChart
              data={data}
              margin={{
                left: 0,
                right: 0,
                top: 10,
                bottom: 0,
              }}
            >
              <Area
                dataKey="orders"
                type="natural"
                fill="var(--color-primary)"
                fillOpacity={0.05}
                strokeWidth={2}
                stroke="var(--color-primary)"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <div className="text-muted-foreground h-[80px] pt-4 text-center text-sm">
            Graphs will be available from the next month
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
