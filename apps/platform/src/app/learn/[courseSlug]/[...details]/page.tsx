import { getOrderByCourse } from '@/features/analytics/actions/getCourseOrders';
import { getAllChapters } from '@/features/course/actions/getChapters';
import { getLessonBySlug } from '@/features/course/actions/getLesson';
import { getLessonProgress } from '@/features/course/actions/getLessonProgress';
import VideoPreview from '@/features/course/actions/VideoPreview';
import DocumentPreview from '@/features/course/components/DocumentPreview';
import Navigation from '@/features/course/components/Navigation';
import { getSession } from '@/lib/session';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; details: string[] }>;
}) {
  const session = await getSession();
  const { courseSlug, details } = await params;
  const [chapter, lessonSlug] = details;
  if (!chapter || !lessonSlug) {
    notFound();
  }

  const lesson = await getLessonBySlug(courseSlug, chapter, lessonSlug);

  const isEnrolled =
    session?.user.role === 'ADMIN' ||
    (await getOrderByCourse(lesson.chapter!.courseVersion!.courseId))
      ?.status === 'COMPLETED';

  if (!isEnrolled) {
    notFound();
  }

  const chapters = await getAllChapters(courseSlug);
  const lessonProgress = await getLessonProgress(
    courseSlug,
    chapter,
    lessonSlug,
  );

  return (
    <div className="mb-40 space-y-4">
      <Navigation
        current={{
          course: {
            id: lesson.chapter?.courseVersion?.id || '',
            name: lesson.chapter?.courseVersion?.title || '-',
            slug: lesson.chapter?.courseVersion?.slug || '',
          },
          module: {
            id: lesson.chapter?.id || '',
            name: lesson.chapter?.title || '-',
            slug: lesson.chapter?.slug || '',
          },
          lesson: {
            id: lesson.id,
            name: lesson.title,
            slug: lesson.slug,
            type: lesson.type,
          },
        }}
        chapters={chapters}
      />

      {lesson.type === 'document' ? (
        <DocumentPreview
          document={lesson}
          courseSlug={courseSlug}
          chapterSlug={chapter}
        />
      ) : (
        <VideoPreview
          courseSlug={courseSlug}
          lesson={lesson}
          session={session}
          lessonProgress={lessonProgress}
        />
      )}
    </div>
  );
}
