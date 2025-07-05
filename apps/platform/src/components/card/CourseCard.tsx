'use client';

import React from 'react';
import Card from '../ui/card';
import { Button, buttonVariants } from '../ui/button';
import {
  IconClock,
  IconPlayerPlay,
  IconShoppingCart,
  IconStack2,
} from '@tabler/icons-react';
import Image from 'next/image';
import { cn, formatDuration, formatPrice, mediaUrl } from '@/lib/utils';
import Link from 'next/link';
import Script from 'next/script';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/features/course/actions/createOrder';
import { ApiError } from '@/lib/api-client';
import { useLoginDialog } from '@/providers/LoginDialogProvider';
import { toast } from 'sonner';
import { CourseWithChapters } from '@/features/course/actions/getCourse';

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

interface CourseCardProps {
  course: CourseWithChapters;
  showTitle?: boolean;
  showFooter?: boolean;
  className?: string;
  isEnrolled?: boolean;
}

interface RazorpayOptions {
  amount: number;
  currency?: string;
  description: string;
  order_id: string;
}

function displayRazorpay(options: RazorpayOptions) {
  const payload = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    currency: 'INR',
    name: 'Frame By Frame',
    image: 'https://example.com/your_logo',
    callback_url: 'http://localhost:3000/',
    theme: {
      color: '#3399cc',
    },
    ...options,
  };

  // eslint-disable-next-line
  const razorpay = new (window as any).Razorpay(payload);
  razorpay.open();
}

const CourseCard = ({
  course,
  className,
  showTitle = true,
  showFooter = true,
  isEnrolled = false,
}: CourseCardProps) => {
  const { setOpen } = useLoginDialog();

  const lessonCount = course.chapters.reduce((acc, chapter) => {
    return acc + chapter.lessons.length;
  }, 0);

  const courseDuration = course.chapters
    .map((chapter) => chapter.lessons)
    .flat(1)
    .reduce((acc, lesson) => {
      return acc + lesson.duration;
    }, 0);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const order = await createOrder(course.courseId);

      displayRazorpay({
        amount: order.amount,
        currency: order.currency,
        description: `Purchase of course ${course.title}`,
        order_id: order.orderId,
      });
    },
    onError: (error: ApiError) => {
      if (error.status === 401) {
        setOpen(true);
        return;
      }
      toast.error(
        error.message || 'An error occurred while creating the order',
      );
    },
  });

  return (
    <>
      <Card className={className}>
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
                  amount: course.price
                    ? Number((course.price / 100).toFixed(2))
                    : 0,
                  currency: course.currency,
                })}
              </span>
              {/* <span className="text-muted-foreground text-sm line-through"> */}
              {/*   {formatPrice({ */}
              {/*     amount: course.originalPrice, */}
              {/*     currency: course.currency, */}
              {/*   })} */}
              {/* </span> */}
            </div>
            <div className="space-x-6">
              <Card.Info>
                <IconClock /> {formatDuration(courseDuration)}
              </Card.Info>
              <Card.Info>
                <IconStack2 /> {lessonCount} Lessons
              </Card.Info>
            </div>
          </div>

          {showFooter && (
            <Card.Footer>
              {isEnrolled ? (
                <Link
                  href={`/learn/${course.slug}/${course.chapters[0]?.slug}/${course.chapters[0]?.lessons[0]?.slug}`}
                  className={cn(buttonVariants(), 'w-full')}
                >
                  <IconPlayerPlay />
                  Resume
                </Link>
              ) : (
                <Button
                  disabled={isPending}
                  onClick={() => mutate()}
                  className="w-full"
                >
                  <IconShoppingCart />
                  Buy Now
                </Button>
              )}
              <p className="text-muted-foreground text-center text-sm">
                Secured Payment Gateway
              </p>
            </Card.Footer>
          )}
        </Card.Content>
      </Card>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default CourseCard;
