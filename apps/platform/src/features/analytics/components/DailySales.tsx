'use client';
import React from 'react';
import { AnalyticsOverview } from '../actions/getCourseAnalytics';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart, XAxis } from 'recharts';

interface DailySalesProps {
  analytics: AnalyticsOverview;
}

const DailySales = ({ analytics: { analytics } }: DailySalesProps) => {
  const dailyAnalytics = analytics.dailyAnalytics;

  const chartConfig = {
    totalSales: {
      label: 'Sales',
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-12 rounded-lg border p-6">
      <div>
        <div className="space-y-1">
          <h2 className="text-md">Sales Analytics</h2>
          <p className="text-sm">Activity from last 3 months</p>
        </div>
        <div></div>
      </div>

      <div>
        <ChartContainer config={chartConfig} className="h-[80px] w-full">
          <AreaChart data={dailyAnalytics}>
            <XAxis
              className="text-sm"
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value: string) =>
                new Date(value).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />

            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey={'totalSales'}
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-primary)"
              fillOpacity={0.5}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default DailySales;
