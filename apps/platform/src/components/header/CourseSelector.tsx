'use client';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { IconChevronDown } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '@/features/course/actions/getCourse';
import { buttonVariants } from '../ui/button';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CourseSelector = () => {
  const path = usePathname();
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => getCourses(true),
  });

  const activeCourse =
    courses && courses.find((course) => course.slug === slug);

  if (!path.startsWith('/admin')) return null;

  return (
    <div className="flex-1">
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full max-w-60 text-left">
          <span className="text-sm">Select Course</span>

          <div className="text-md flex gap-2">
            <div className="line-clamp-1 flex-1">
              {isLoading ? (
                <div className="bg-muted animate-pulse rounded-sm">
                  <span className="opacity-0">Loading...</span>
                </div>
              ) : (
                activeCourse?.title
              )}
            </div>
            <div>
              <IconChevronDown />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            width: 'var(--radix-dropdown-menu-trigger-width)',
          }}
          className="space-y-2 p-2"
        >
          {courses?.map((course) => (
            <DropdownMenuItem
              onClick={() => {
                router.push(`/admin/course/${course.slug}/content`);
              }}
              key={course.id}
              className="cursor-pointer"
            >
              {course.title}
            </DropdownMenuItem>
          ))}
          <Separator />
          <Link
            href={'/admin/course/create'}
            className={cn(buttonVariants({ variant: 'secondary' }), 'w-full')}
          >
            Create Course
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CourseSelector;
