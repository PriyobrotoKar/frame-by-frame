import React from 'react';
import Card from '../ui/card';
import Image from 'next/image';
import { IconClock, IconPlayerPlay, IconStack2 } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { CourseWithChapters } from '@/features/course/actions/getCourse';
import { mediaUrl } from '@/lib/utils';

interface CourseCardProps {
  course: CourseWithChapters;
}

const LibraryCard = ({ course }: CourseCardProps) => {
  const courseDuration = course.chapters
    .map((chapter) => chapter.lessons)
    .flat(1)
    .reduce((acc, lesson) => {
      return acc + lesson.duration;
    }, 0);

  const lessonCount = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.length;
  }, 0);

  return (
    <Card>
      <div>
        {course.image && (
          <Image
            src={mediaUrl(course.image)}
            alt="Course Image"
            width={277}
            height={162}
            className="w-full rounded-lg"
          />
        )}
      </div>

      <Card.Content>
        <Card.Header>
          <Card.Subtitle>{course.subtitle}</Card.Subtitle>
          <Card.Title>{course.title}</Card.Title>
        </Card.Header>

        <div className="space-x-6">
          <Card.Info>
            <IconClock /> {courseDuration}
          </Card.Info>
          <Card.Info>
            <IconStack2 /> {lessonCount} Lessons
          </Card.Info>
        </div>

        <Card.Footer>
          <Button variant={'outline'} className="w-full">
            <IconPlayerPlay />
            Resume
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            Earn certificate upon completion
          </p>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default LibraryCard;
