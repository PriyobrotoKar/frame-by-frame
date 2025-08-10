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

  return (
    <div className="space-y-9 rounded-lg border p-5">
      <div className="space-y-1">
        <h3 className="text-md">Lifetime Sales</h3>
        <h2 className="text-2xl">₹{(totalSales / 100).toFixed(2)}</h2>
      </div>
      <div>
        {data.length > 1 ? (
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
              data={data}
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
        ) : (
          <div className="text-muted-foreground flex h-[80px] justify-center pt-4 text-sm">
            Graphs will be available from the next month
          </div>
        )}
      </div>
    </div>
  );
};

export default LifetimeSales;
