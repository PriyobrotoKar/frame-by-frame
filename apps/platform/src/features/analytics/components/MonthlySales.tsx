'use client';
import React from 'react';
import { AnalyticsOverview } from '../actions/getCourseAnalytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart } from 'recharts';

interface MonthlySalesProps {
  analytics: AnalyticsOverview;
}

// TODO: Replace with actual data from the API
const MonthlySales = ({ analytics: { monthlySales } }: MonthlySalesProps) => {
  const chartConfig = {
    sales: {
      label: 'Sales',
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
      sales: 1000,
    },
    {
      month: new Date('2023-02-01'),
      sales: 500,
    },
    {
      month: new Date('2023-03-01'),
      sales: 200,
    },
    {
      month: new Date('2023-04-01'),
      sales: 700,
    },
    {
      month: new Date('2023-05-01'),
      sales: 800,
    },
    {
      month: new Date('2023-06-01'),
      sales: 500,
    },
  ];

  return (
    <div className="space-y-4 rounded-lg border">
      <div className="space-y-1 p-5">
        <h3 className="text-md">Monthly Sales</h3>
        <h2 className="text-2xl">₹{(monthlySales ?? 0 / 100).toFixed(2)}</h2>
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
              dataKey="sales"
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

export default MonthlySales;
