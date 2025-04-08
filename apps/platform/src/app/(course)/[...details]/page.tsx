import { Lesson, Module } from '@/components/card/CourseCard';
import Navigation from '@/features/course/components/Navigation';
import VideoDescription from '@/features/course/components/VideoDescription';
import VideoPlayer from '@/features/course/components/VideoPlayer';
import VideoResources from '@/features/course/components/VideoResources';
import { demoCourse } from '@/lib/mocks';
import { notFound } from 'next/navigation';
import React from 'react';

const courseModule = demoCourse.modules[0] as Module;
const courseLesson = courseModule.lessons[0] as Lesson;
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
    <div className="space-y-4">
      <Navigation
        current={{
          course: {
            name: demoCourse.title,
            slug: demoCourse.slug,
          },
          module: {
            name: courseModule.title,
            slug: courseModule.slug,
          },
          lesson: {
            name: courseLesson.title,
            slug: courseLesson.slug,
          },
        }}
        nextLessonSlug={demoCourse.modules[0]?.lessons[1]?.slug}
      />

      <VideoPlayer
        lessonName={courseLesson.title}
        moduleName={courseModule.title}
      />

      <VideoDescription />

      <VideoResources />
    </div>
  );
}
