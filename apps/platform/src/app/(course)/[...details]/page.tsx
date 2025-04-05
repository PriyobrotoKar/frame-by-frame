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

  return <div>LessonPage</div>;
}
