import React from 'react';
import Card from '../ui/card';
import { Button } from '../ui/button';
import { IconClock, IconShoppingCart, IconStack2 } from '@tabler/icons-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

export interface Course {
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  currency: string;
  duration: string;
  lessons: number;
  imageUrl: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
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

        <div className="space-y-2">
          <div className="space-x-1">
            <span className="text-xl">
              {formatPrice({
                amount: course.price,
                currency: course.currency,
              })}
            </span>
            <span className="text-muted-foreground text-sm line-through">
              {formatPrice({
                amount: course.originalPrice,
                currency: course.currency,
              })}
            </span>
          </div>
          <div className="space-x-6">
            <Card.Info>
              <IconClock /> {course.duration}
            </Card.Info>
            <Card.Info>
              <IconStack2 /> {course.lessons} Lessons
            </Card.Info>
          </div>
        </div>

        <Card.Footer>
          <Button className="w-full">
            <IconShoppingCart />
            Buy Now
          </Button>
          <p className="text-muted-foreground text-center text-sm">
            Earn certificate upon completion
          </p>
        </Card.Footer>
      </Card.Content>
    </Card>
  );
};

export default CourseCard;
