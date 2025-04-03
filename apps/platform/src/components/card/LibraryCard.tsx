import React from 'react';
import Card from '../ui/card';
import Image from 'next/image';
import { Course } from './CourseCard';
import { IconClock, IconPlayerPlay, IconStack2 } from '@tabler/icons-react';
import { Button } from '../ui/button';

interface CourseCardProps {
  course: Course;
}

const LibraryCard = ({ course }: CourseCardProps) => {
  return (
    <Card>
      <div>
        <Image
          src={course.imageUrl}
          alt="Course Image"
          width={277}
          height={162}
          className="w-full rounded-lg"
        />
      </div>

      <Card.Content>
        <Card.Header>
          <Card.Subtitle>{course.subtitle}</Card.Subtitle>
          <Card.Title>{course.title}</Card.Title>
        </Card.Header>

        <div className="space-x-6">
          <Card.Info>
            <IconClock /> {course.duration}
          </Card.Info>
          <Card.Info>
            <IconStack2 /> {course.lessons} Lessons
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
