import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IconCircleCaretRight } from '@tabler/icons-react';
import React from 'react';
import { ChapterWithLessons } from '../actions/getChapters';
import { formatDuration } from '@/lib/utils';

interface CourseContentProps {
  chapters: ChapterWithLessons[];
}

const CourseContent = ({ chapters }: CourseContentProps) => {
  return (
    <section className="bg-card space-y-6 rounded-2xl border p-4">
      <h2 className="text-xl">Course Content</h2>

      <div>
        <Accordion type="multiple" className="space-y-2">
          {chapters.map((module) => (
            <AccordionItem
              key={module.id}
              className="data-[state=open]:bg-muted hover:bg-muted hover:rounded-lg data-[state=open]:rounded-xl"
              value={module.id}
            >
              <AccordionTrigger>
                {module.title}{' '}
                <span className="text-muted-foreground shrink-0 text-sm">
                  {module.lessons.length} Lectures
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="text-sm-md flex justify-between gap-2 space-y-2"
                  >
                    <div className="line-clamp-2 flex items-center gap-2">
                      <IconCircleCaretRight className="size-6 shrink-0" />{' '}
                      {lesson.title}
                    </div>

                    <span className="text-muted-foreground shrink-0 text-sm">
                      {formatDuration(lesson.duration)}
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default CourseContent;
