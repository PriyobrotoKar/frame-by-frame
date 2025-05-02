import { demoCourse } from '@/lib/mocks';
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
    <div className="flex flex-1 items-center gap-6 rounded-xl border px-6 py-5">
      <div className="flex-1 space-y-3">
        <div className="space-y-1">
          <h4 className="text-muted-foreground text-sm">{demoCourse.title}</h4>
          <h3 className="text-lg">{demoCourse.modules[0]?.title}</h3>
        </div>
        <div className="space-y-3">
          <div className="text-muted-foreground text-sm">50% Progress</div>
          <div className="bg-muted h-1 w-full rounded-full">
            <div
              className="bg-primary h-full rounded-full"
              style={{
                width: '50%',
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-muted flex items-center gap-4 rounded-lg px-7 py-4">
        <div className="space-y-1">
          <h3 className="text-md">Chapter 1</h3>
          <p className="text-sm">{demoCourse.modules[0]?.lessons[0]?.title}</p>
        </div>
        <Button variant={'outline'}>
          <IconPlayerPlay />
          Resume
        </Button>
      </div>
    </div>
  );
};

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const WeekActivity = () => {
  return (
    <div className="h-fit space-y-4 rounded-lg border p-4">
      <h3 className="text-lg">Activity</h3>
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
