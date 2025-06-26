'use client';
import React from 'react';
import { AnalyticsOverview } from '../actions/getCourseAnalytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Line, LineChart } from 'recharts';

interface LifetimeSalesProps {
  analytics: AnalyticsOverview;
}

const LifetimeSales = ({
  analytics: { totalSales, analytics },
}: LifetimeSalesProps) => {
  const data = analytics.monthlyAnalytics.map((sale) => ({
    month: sale.createdAt,
    sales: sale.totalSales,
  }));

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

  console.log('LifetimeSales data:', [...data, ...data, ...data, ...data]);

  const _data = [
    {
      month: new Date('2023-01-01'),
      sales: 1000,
    },
    {
      month: new Date('2023-02-01'),
      sales: 1500,
    },
    {
      month: new Date('2023-03-01'),
      sales: 1200,
    },
    {
      month: new Date('2023-04-01'),
      sales: 1700,
    },
    {
      month: new Date('2023-05-01'),
      sales: 2000,
    },
    {
      month: new Date('2023-06-01'),
      sales: 2500,
    },
  ];

  return (
    <div className="space-y-4 rounded-lg border p-5">
      <div className="space-y-1">
        <h3 className="text-md">Lifetime Sales</h3>
        <h2 className="text-2xl">₹{(totalSales / 100).toFixed(2)}</h2>
      </div>
      <div>
        <ChartContainer config={chartConfig} className="h-[80px] w-full">
          <LineChart
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
            data={_data}
          >
            <Line
              type="natural"
              strokeWidth={2}
              dataKey="sales"
              stroke="var(--color-primary)"
              activeDot={{
                r: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default LifetimeSales;
