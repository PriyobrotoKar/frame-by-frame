import React from 'react';
import { Separator } from '../ui/separator';
import CreateChapterDialog from '@/features/course/components/CreateChapterDialog';
import ChapterLists from '@/features/course/components/ChapterLists';

export default function AdminCourseSidebar() {
  return (
    <aside className="h-full w-64 shrink-0 space-y-4 border-r py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Course Chapters</h2>
        <CreateChapterDialog />
      </div>
      <Separator />
      <ChapterLists />
    </aside>
  );
}
