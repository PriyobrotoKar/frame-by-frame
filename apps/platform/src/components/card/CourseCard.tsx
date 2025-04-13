import React from 'react';
import Card from '../ui/card';
import { Button } from '../ui/button';
import { IconClock, IconShoppingCart, IconStack2 } from '@tabler/icons-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  duration: string;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  price: number;
  originalPrice: number;
  currency: string;
  duration: string;
  lessons: number;
  imageUrl: string;
  modules: Module[];
}

interface CourseCardProps {
  course: Course;
  showTitle?: boolean;
  className?: string;
}

const CourseCard = ({
  course,
  className,
  showTitle = true,
}: CourseCardProps) => {
  return (
    <Link className="block" href={`/${course.slug}`}>
      <Card className={className}>
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
          {showTitle && (
            <div className="space-y-2">
              <Card.Header>
                <Card.Subtitle>{course.subtitle}</Card.Subtitle>
                <Card.Title>{course.title}</Card.Title>
              </Card.Header>
            </div>
          )}
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
    </Link>
  );
};

export default CourseCard;
