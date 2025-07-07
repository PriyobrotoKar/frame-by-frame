import { getLessonBySlug } from '@/features/course/actions/getLesson';
import DeleteModuleBtn from '@/features/course/components/DeleteModuleBtn';
import EditAttachments from '@/features/course/components/EditAttachments';
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
    <div className="flex gap-8">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Specifications</h2>
          {(lesson.type !== 'video' || lesson.status === 'READY') && (
            <DeleteModuleBtn
              type={lesson.type}
              courseSlug={slug}
              chapterSlug={chapterSlug}
              lessonSlug={lessonSlug}
            />
          )}
        </div>
        <div className="flex-1 space-y-6">
          <EditModule
            courseSlug={slug}
            chapterSlug={chapterSlug}
            module={lesson}
          />
          <EditAttachments
            courseSlug={slug}
            chapterSlug={chapterSlug}
            module={lesson}
          />
        </div>
      </div>
      <ModulePreview
        initialData={lesson}
        courseSlug={slug}
        chapterSlug={chapterSlug}
        lessonSlug={lessonSlug}
      />
    </div>
  );
}
