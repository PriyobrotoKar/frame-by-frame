'use client';
import React, { useEffect } from 'react';
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
import {
  IconChevronLeft,
  IconChevronRight,
  IconMenu2,
} from '@tabler/icons-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import ChapterList from '@/components/sidebar/ChapterList';
import { ChapterWithLessons } from '../actions/getChapters';
import { updateUserActivity } from '../actions/updateUserActivity';

interface NavigationItem {
  id: string;
  name: string;
  slug: string;
}

interface NavigationProps {
  current: {
    course: NavigationItem;
    module: NavigationItem;
    lesson: NavigationItem & { type: 'video' | 'document' };
  };
  chapters: ChapterWithLessons[];
}

const getNextLesson = (
  chapters: ChapterWithLessons[],
  currentLessonSlug: string,
) => {
  const currentChapterIndex = chapters.findIndex((chapter) =>
    chapter.lessons.some((lesson) => lesson.slug === currentLessonSlug),
  );
  const currentChapter = chapters[currentChapterIndex];

  if (!currentChapter) {
    return {
      lesson: null,
      chapter: null,
    };
  }

  const currentLessonIndex = currentChapter.lessons.findIndex(
    (lesson) => lesson.slug === currentLessonSlug,
  );
  const nextLesson = currentChapter.lessons[currentLessonIndex + 1];

  if (!nextLesson) {
    return {
      lesson: chapters[currentChapterIndex + 1]?.lessons?.[0]?.slug ?? null,
      chapter: chapters[currentChapterIndex + 1]?.slug ?? null,
    };
  }

  return {
    lesson: nextLesson.slug,
    chapter: currentChapter.slug,
  };
};

const getPreviousLesson = (
  chapters: ChapterWithLessons[],
  currentLessonSlug: string,
) => {
  const currentChapterIndex = chapters.findIndex((chapter) =>
    chapter.lessons.some((lesson) => lesson.slug === currentLessonSlug),
  );
  const currentChapter = chapters[currentChapterIndex];

  if (!currentChapter) {
    return {
      lesson: null,
      chapter: null,
    };
  }

  const currentLessonIndex = currentChapter.lessons.findIndex(
    (lesson) => lesson.slug === currentLessonSlug,
  );
  const previousLesson = currentChapter.lessons[currentLessonIndex - 1];

  if (!previousLesson) {
    return {
      lesson:
        chapters[currentChapterIndex - 1]?.lessons?.slice(-1)[0]?.slug ?? null,
      chapter: chapters[currentChapterIndex - 1]?.slug ?? null,
    };
  }

  return {
    lesson: previousLesson.slug,
    chapter: currentChapter.slug,
  };
};

const Navigation = ({
  current: { course, module, lesson },
  chapters,
}: NavigationProps) => {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await updateUserActivity(course.slug, module.id, lesson.id, {
        type: lesson.type,
      });
    }, 30 * 1000);

    return () => {
      clearTimeout(timeout);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.slug]);

  return (
    <div className="flex flex-col-reverse justify-between gap-5 lg:flex-row lg:items-center">
      <BreadcrumbNavigation course={course} module={module} lesson={lesson} />
      <div className="flex w-full shrink-0 justify-between lg:w-fit">
        <ChapterListDrawer
          slug={course.slug}
          title={course.name}
          chapters={chapters}
        />

        <NavigationButtons
          course={course}
          nextLessonSlug={getNextLesson(chapters, lesson.slug)}
          previousLessonSlug={getPreviousLesson(chapters, lesson.slug)}
        />
      </div>
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
        <BreadcrumbItem>{module.name}</BreadcrumbItem>
        <BreadcrumbSeparator className="hidden lg:block" />
        <BreadcrumbItem className="hidden lg:block">
          <BreadcrumbPage>{lesson.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface NavigationButtonProps {
  course: NavigationItem;
  nextLessonSlug: {
    lesson: string | null;
    chapter: string | null;
  };
  previousLessonSlug: {
    lesson: string | null;
    chapter: string | null;
  };
}

const NavigationButtons = ({
  course,
  nextLessonSlug,
  previousLessonSlug,
}: NavigationButtonProps) => {
  return (
    <div className="space-x-5">
      {/* Previous Lesson Button */}
      <Link
        className={previousLessonSlug.lesson ? '' : 'pointer-events-none'}
        href={`/learn/${course.slug}/${previousLessonSlug.chapter}/${previousLessonSlug.lesson}`}
      >
        <Button
          variant={'secondary'}
          size={'icon'}
          disabled={!previousLessonSlug.lesson}
        >
          <IconChevronLeft />
        </Button>
      </Link>

      {/* Next Lesson Button */}
      <Link
        href={`/learn/${course.slug}/${nextLessonSlug.chapter}/${nextLessonSlug.lesson}`}
        className={nextLessonSlug ? '' : 'pointer-events-none'}
      >
        <Button
          variant={'secondary'}
          size={'icon'}
          disabled={!nextLessonSlug.lesson}
        >
          <IconChevronRight />
        </Button>
      </Link>
    </div>
  );
};

interface ChapterListDrawerProps {
  slug: string;
  title: string;
  chapters: ChapterWithLessons[];
}

const ChapterListDrawer = ({
  title,
  slug,
  chapters,
}: ChapterListDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className={'lg:hidden'} size={'icon'} variant={'outline'}>
          <IconMenu2 />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="space-y-6 p-6">
          <DrawerHeader>
            <DrawerTitle className="text-left text-xl">{title}</DrawerTitle>
          </DrawerHeader>

          <ChapterList courseSlug={slug} initialChapters={chapters} />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Navigation;
