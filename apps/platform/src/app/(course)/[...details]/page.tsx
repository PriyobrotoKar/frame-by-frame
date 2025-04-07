import Navigation from '@/features/course/components/Navigation';
import VideoPlayer from '@/features/course/components/VideoPlayer';
import { demoCourse } from '@/lib/mocks';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function LessonPage({
  params,
}: {
  params: Promise<{ details: string[] }>;
}) {
  const { details } = await params;
  const [slug, chapter, lesson] = details;

  console.log('slug', slug);
  console.log('chapter', chapter);
  console.log('lesson', lesson);

  if (!chapter || !lesson) {
    notFound();
  }

  return (
    <div>
      <Navigation
        current={{
          course: {
            name: demoCourse.title,
            slug: demoCourse.slug,
          },
          module: {
            name: demoCourse.modules[0]?.title ?? '',
            slug: demoCourse.modules[0]?.slug ?? '',
          },
          lesson: {
            name: demoCourse.modules[0]?.lessons[0]?.title ?? '',
            slug: demoCourse.modules[0]?.lessons[0]?.title ?? '',
          },
        }}
        nextLessonSlug={demoCourse.modules[0]?.lessons[1]?.slug}
      />

      <VideoPlayer />
    </div>
  );
}
