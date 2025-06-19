'use client';

import React from 'react';
import Card from '../ui/card';
import { Button } from '../ui/button';
import { IconClock, IconShoppingCart, IconStack2 } from '@tabler/icons-react';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Script from 'next/script';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/features/course/actions/createOrder';
import { ApiError } from '@/lib/api-client';
import { useLoginDialog } from '@/providers/LoginDialogProvider';

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
}: CourseCardProps) => {
  const { setOpen } = useLoginDialog();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const order = await createOrder('cmbo23e680001l708k8fvn5jd');

      console.log('Order created:', order);

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
      }
    },
  });

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
            <Button
              disabled={isPending}
              onClick={() => mutate()}
              className="w-full"
            >
              <IconShoppingCart />
              Buy Now
            </Button>
            <p className="text-muted-foreground text-center text-sm">
              Earn certificate upon completion
            </p>
          </Card.Footer>
        </Card.Content>
      </Card>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </Link>
  );
};

export default CourseCard;
