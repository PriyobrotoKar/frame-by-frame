'use client';

import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import {
  ChapterWithLessons,
  getAllChapters,
} from '@/features/course/actions/getChapters';
import { cn } from '@/lib/utils';
import {
  IconCircleCaretRight,
  IconCircleCheck,
  IconFileDescription,
} from '@tabler/icons-react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

interface ChapterListProps {
  initialChapters: ChapterWithLessons[];
  courseSlug: string;
}

const ChapterList = ({ initialChapters, courseSlug }: ChapterListProps) => {
  const { data: chapters } = useQuery({
    queryKey: ['chapters', courseSlug],
    queryFn: async () => {
      return await getAllChapters(courseSlug);
    },
    initialData: initialChapters,
  });

  const { details } = useParams<{
    details: string[] | undefined;
  }>();

  const [chapterSlug, lessonSlug] = details ?? [];

  if (!chapterSlug || !lessonSlug) {
    notFound();
  }

  const LessonIcon = ({
    type,
  }: {
    type: 'video' | 'document' | 'completed';
  }) => {
    switch (type) {
      case 'video':
        return <IconCircleCaretRight className="shrink-0" />;
      case 'document':
        return <IconFileDescription className="shrink-0" />;
      case 'completed':
        return <IconCircleCheck className="shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <Accordion
      defaultValue={[chapterSlug ?? '']}
      type="multiple"
      // value={[chapterSlug ?? '']}
      className="space-y-4"
    >
      {chapters.map((chapter) => {
        const isChapterCompleted = chapter.lessons.every((lesson) =>
          lesson.lessonProgresses.some((l) => l.completed),
        );

        return (
          <AccordionItem
            className="data-[state=open]:bg-muted group"
            key={chapter.id}
            value={chapter.slug}
          >
            <AccordionTrigger className="text-md">
              {isChapterCompleted && <IconCircleCheck className="shrink-0" />}
              {chapter.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-5">
              {chapter.lessons.map((lesson) => {
                const isCompleted = lesson.lessonProgresses.some(
                  (l) => l.completed,
                );

                return (
                  <Link
                    href={`/learn/${courseSlug}/${chapter.slug}/${lesson.slug}`}
                    key={lesson.id}
                    className={cn(
                      'flex gap-2',
                      lesson.slug === lessonSlug && 'text-primary',
                    )}
                  >
                    <LessonIcon
                      type={isCompleted ? 'completed' : lesson.type}
                    />
                    <div className="space-y-2">
                      <p className="text-sm-md">{lesson.title}</p>
                      <span>{Math.round(lesson.duration / 60)} mins</span>
                    </div>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ChapterList;
