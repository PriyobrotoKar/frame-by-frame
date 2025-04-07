import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface NavigationItem {
  name: string;
  slug: string;
}

interface NavigationProps {
  current: {
    course: NavigationItem;
    module: NavigationItem;
    lesson: NavigationItem;
  };
  nextLessonSlug?: string;
  previousLessonSlug?: string;
}

const Navigation = ({
  current: { course, module, lesson },
  nextLessonSlug,
  previousLessonSlug,
}: NavigationProps) => {
  return (
    <div className="flex items-center justify-between">
      <BreadcrumbNavigation course={course} module={module} lesson={lesson} />
      <NavigationButtons
        course={course}
        module={module}
        nextLessonSlug={nextLessonSlug}
        previousLessonSlug={previousLessonSlug}
      />
    </div>
  );
};

interface BreadcrumbNavigationProps {
  course: NavigationItem;
  module: NavigationItem;
  lesson: NavigationItem;
}

const BreadcrumbNavigation = ({
  course,
  module,
  lesson,
}: BreadcrumbNavigationProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${course.slug}`}>
            {course.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${course.slug}/${module.slug}`}>
            {module.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{lesson.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface NavigationButtonProps {
  course: NavigationItem;
  module: NavigationItem;
  nextLessonSlug?: string;
  previousLessonSlug?: string;
}

const NavigationButtons = ({
  course,
  module,
  nextLessonSlug,
  previousLessonSlug,
}: NavigationButtonProps) => {
  return (
    <div className="space-x-5">
      {/* Previous Lesson Button */}
      <Link
        className={previousLessonSlug ? '' : 'pointer-events-none'}
        href={`/${course.slug}/${module.slug}/${previousLessonSlug}`}
      >
        <Button
          variant={'secondary'}
          size={'icon'}
          disabled={!previousLessonSlug}
        >
          <IconChevronLeft />
        </Button>
      </Link>

      {/* Next Lesson Button */}
      <Link
        href={`/${course.slug}/${module.slug}/${nextLessonSlug}`}
        className={nextLessonSlug ? '' : 'pointer-events-none'}
      >
        <Button variant={'secondary'} size={'icon'} disabled={!nextLessonSlug}>
          <IconChevronRight />
        </Button>
      </Link>
    </div>
  );
};

export default Navigation;
