import Image from 'next/image';
import React from 'react';
import { notFound } from 'next/navigation';
import { getCourseBySlug } from '@/features/course/actions/getCourse';
import ChapterList from './ChapterList';
import { getAllChapters } from '@/features/course/actions/getChapters';

interface CourseSidebarProps {
  courseSlug: string;
  details: string[];
}

export default async function CourseSidebar({
  courseSlug,
}: CourseSidebarProps) {
  if (!courseSlug) {
    notFound(); // or handle the error as needed
  }

  const course = await getCourseBySlug(courseSlug);
  const chapters = await getAllChapters(courseSlug);

  return (
    <aside className="bg-card sticky top-0 hidden h-svh w-64 flex-col gap-4 self-stretch border-r px-7 py-10 lg:flex">
      <div className="space-y-20">
        <Image src={'/logo.svg'} alt="logo" width={71} height={21} />
      </div>
      <div className="space-y-14">
        <div className="space-y-3">
          <h1 className="text-xl">{course.title}</h1>
          <p className="text-sm">{course.subtitle}</p>
        </div>

        <ChapterList courseSlug={courseSlug} initialChapters={chapters} />
      </div>
    </aside>
  );
}
