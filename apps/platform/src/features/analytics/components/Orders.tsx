'use client';
import React from 'react';
import { AnalyticsOverview } from '../actions/getCourseAnalytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart } from 'recharts';

interface OrdersProps {
  analytics: AnalyticsOverview;
}

const Orders = ({ analytics: { totalOrders } }: OrdersProps) => {
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

  const _data = [
    {
      month: new Date('2023-01-01'),
      orders: 1,
    },
    {
      month: new Date('2023-02-01'),
      orders: 6,
    },
    {
      month: new Date('2023-03-01'),
      orders: 10,
    },
    {
      month: new Date('2023-04-01'),
      orders: 7,
    },
    {
      month: new Date('2023-05-01'),
      orders: 8,
    },
    {
      month: new Date('2023-06-01'),
      orders: 5,
    },
  ];

  return (
    <div className="space-y-4 rounded-lg border">
      <div className="space-y-1 p-5">
        <h3 className="text-md">Monthly Sales</h3>
        <h2 className="text-2xl">{totalOrders}</h2>
      </div>
      <div>
        <ChartContainer config={chartConfig} className="h-[80px] w-full">
          <AreaChart
            data={_data}
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
      </div>
    </div>
  );
};

export default Orders;
