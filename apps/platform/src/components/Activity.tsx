import { demoCourse } from '@/lib/mocks';
import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { IconPlayerPlay } from '@tabler/icons-react';

const Activity = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl">Learning Progress</h2>
      <div className="flex gap-5">
        <LastWatched />
        <WeekActivity />
      </div>
    </div>
  );
};

const LastWatched = () => {
  return (
    <div className="flex flex-1 gap-6 rounded-xl border p-4">
      <div>
        <Image
          src={demoCourse.imageUrl}
          alt="course image"
          width={220}
          height={140}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1 space-y-6">
        <div className="space-y-1">
          <h4 className="text-muted-foreground text-sm">{demoCourse.title}</h4>
          <h3 className="text-body-semibold">
            {demoCourse.modules[0]?.lessons[0]?.title}
          </h3>
        </div>
        <div className="space-y-3">
          <div className="bg-muted h-1 w-full rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{
                width: '50%',
              }}
            ></div>
          </div>
          <Button className="w-full" variant={'outline'}>
            <IconPlayerPlay /> Resume
          </Button>
        </div>
      </div>
    </div>
  );
};

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const WeekActivity = () => {
  return (
    <div className="h-fit space-y-4 rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="text-lg">Activity</h3>
        <p className="text-sm">Track your weekly progress</p>
      </div>
      <div className="flex gap-4">
        {weekdays.map((day, index) => (
          <div
            key={index}
            className="text-sm-md bg-muted flex size-10 items-center justify-center rounded-full p-3"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
