import React from 'react';
import { buttonVariants } from './ui/button';
import { IconPlayerPlay } from '@tabler/icons-react';
import {
  Activity as ActivityType,
  getUserActivity,
} from '@/features/course/actions/getUserActivity';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Banner from './Banner';

const Activity = async () => {
  const activity = await getUserActivity();

  if (!activity) {
    return (
      <Banner
        title="From Basics to Advanced, Taught by Experts."
        subtitle="Digital Courses"
        image="/illustrations/courses.svg"
        link={{ href: '/', label: 'Learn More' }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl">Learning Progress</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        <LastWatched activity={activity} />
        <WeekActivity activeDays={activity.activeDaysOfWeek} />
      </div>
    </div>
  );
};

interface LastWatchedProps {
  activity: ActivityType;
}

const LastWatched = ({ activity }: LastWatchedProps) => {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 rounded-xl border px-6 py-5 lg:flex-row">
      <div className="w-full flex-1 space-y-3">
        <div className="space-y-1">
          <h4 className="text-muted-foreground text-sm">
            {activity.course.subtitle}
          </h4>
          <h3 className="text-lg">{activity.course.title}</h3>
        </div>
        <div className="flex-1 space-y-3">
          <div className="text-muted-foreground text-sm">
            {activity.progress}% Progress
          </div>
          <div className="bg-muted h-1 w-full rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{
                width: `${activity.progress}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-muted flex w-full flex-1 items-center justify-between gap-4 rounded-lg px-7 py-4 lg:w-fit">
        <div className="space-y-1">
          <h3 className="text-md">{activity.chapter.title}</h3>
          <p className="text-sm">{activity.lesson.title}</p>
        </div>
        <Link
          href={`/learn/${activity.course.slug}/${activity.chapter.slug}/${activity.lesson.slug}`}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <IconPlayerPlay />
          Resume
        </Link>
      </div>
    </div>
  );
};

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

interface WeekActivityProps {
  activeDays: number[];
}

const WeekActivity = ({ activeDays }: WeekActivityProps) => {
  return (
    <div className="h-fit space-y-4 rounded-lg border p-4">
      <h3 className="text-lg">Activity</h3>
      <div className="flex justify-between gap-2 sm:gap-4">
        {weekdays.map((day, index) => {
          const isActive = activeDays.includes((index + 1) % 7);

          return (
            <div
              key={index}
              className={cn(
                'text-sm-md bg-muted flex size-10 items-center justify-center rounded-full p-3',
                isActive && 'bg-primary text-primary-foreground',
              )}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;
