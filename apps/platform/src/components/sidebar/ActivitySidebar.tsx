import React from 'react';
import { ProgressCircle } from '../ui/circular-progress';
import {
  IconChevronRight,
  IconDotsVertical,
  IconNotebook,
  IconPlayerPlay,
} from '@tabler/icons-react';
import { Button } from '../ui/button';
import Image from 'next/image';

export const ActivitySidebar = () => {
  return (
    <aside className="bg-card flex h-full w-72 flex-col gap-7 rounded-xl border p-4">
      <LastPlayedVideo />
      <CourseWatchHistory />
    </aside>
  );
};

const demoVideo = {
  title: 'How to install Premiere Pro 2024 on Windows',
  progress: 0.5,
  course: 'The Desktop Video Editing Masterclass',
  lesson: 'Lesson 4',
  thumbnail:
    'https://futurevisioncomputers.com/wp-content/uploads/2023/09/Adobe-Premiere-Pro-course-Adobe-Premiere-Pro.jpg',
};

const LastPlayedVideo = () => {
  return (
    <div className="bg-background rounded-md border pb-2 pt-3">
      <div className="flex items-center justify-between">
        <h2 className="px-4 text-lg">Last Watched</h2>
        <Button variant={'ghost'} size={'icon'}>
          <IconDotsVertical />
        </Button>
      </div>
      <VideoCard video={demoVideo} />
    </div>
  );
};

interface VideoCard {
  title: string;
  progress: number;
  course: string;
  lesson: string;
  thumbnail: string;
}

const VideoCard = ({ video }: { video: VideoCard }) => {
  return (
    <div className="space-y-5 p-4">
      <div className="space-y-1">
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={230}
          height={130}
          className="h-full w-full rounded-md"
        />
        <div className="bg-card h-1">
          <div
            style={{
              width: `${video.progress * 100}%`,
            }}
            className="bg-primary h-full rounded-full"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <span className="line-clamp-1 max-w-24">{video.course}</span>
            <IconChevronRight className="size-3" />
            <span className="line-clamp-1">{video.lesson}</span>
          </div>
          <h3 className="text-body-semibold">{video.title}</h3>
        </div>
        <Button variant={'outline'} className="w-full">
          <IconPlayerPlay />
          Resume
        </Button>
      </div>
    </div>
  );
};

interface CourseProgress {
  title: string;
  progress: number;
}

const history: CourseProgress[] = [
  {
    title: 'The Desktop Video Editing Masterclass Ch.4',
    progress: 0.5,
  },
  {
    title: 'The Desktop Video Editing Masterclass Ch.4',
    progress: 0.2,
  },
  {
    title: 'The Desktop Video Editing Masterclass Ch.4',
    progress: 0.1,
  },
];

const CourseWatchHistory = () => {
  return (
    <div className="h-full space-y-5 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">History</h2>
        <Button variant={'ghost'} size={'icon'}>
          <IconDotsVertical />
        </Button>
      </div>
      <div className="space-y-4">
        {history.map((item, i) => (
          <CourseProgress key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

const CourseProgress = ({ item }: { item: CourseProgress }) => {
  return (
    <div className="flex gap-3">
      <div className="relative flex h-9 shrink-0 basis-9 items-center justify-center">
        <IconNotebook className="text-primary" />
        <ProgressCircle
          className="absolute inset-0 h-full w-full"
          value={item.progress * 100}
        />
      </div>
      <div className="text-sm-md">{item.title}</div>
    </div>
  );
};
