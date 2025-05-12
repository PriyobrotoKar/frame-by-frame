import React from 'react';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { IconCirclePlus } from '@tabler/icons-react';

export default function AdminCourseSidebar() {
  return (
    <aside className="h-full w-64 shrink-0 space-y-4 border-r py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Course Chapters</h2>
        <Button size={'icon'} variant={'ghost'}>
          <IconCirclePlus />
        </Button>
      </div>
      <Separator />
    </aside>
  );
}
