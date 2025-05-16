import { getLessonBySlug } from '@/features/course/actions/getLesson';
import EditModule from '@/features/course/components/EditModule';
import ModulePreview from '@/features/course/components/ModulePreview';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function AdminLessonPage({
  params,
}: {
  params: Promise<{ slug: string; details: string[] }>;
}) {
  const { slug, details } = await params;

  const [chapterSlug, lessonSlug] = details;

  if (!chapterSlug || !lessonSlug) {
    return notFound();
  }

  const lesson = await getLessonBySlug(slug, chapterSlug, lessonSlug);

  return (
    <div className="space-y-6">
      <h2 className="text-xl">Specifications</h2>
      <div className="flex gap-8">
        <EditModule
          courseSlug={slug}
          chapterSlug={chapterSlug}
          module={lesson}
        />
        <ModulePreview
          initialData={lesson}
          courseSlug={slug}
          chapterSlug={chapterSlug}
          lessonSlug={lessonSlug}
        />
      </div>
    </div>
  );
}
