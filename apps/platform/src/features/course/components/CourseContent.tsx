import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { demoCourse } from '@/lib/mocks';
import { IconCircleCaretRight } from '@tabler/icons-react';
import React from 'react';

const CourseContent = () => {
  return (
    <section className="bg-card space-y-6 rounded-2xl border p-4">
      <h2 className="text-xl">Course Content</h2>

      <div>
        <Accordion type="multiple" className="space-y-2">
          {demoCourse.modules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger>
                {module.title}{' '}
                <span className="text-muted-foreground text-sm">
                  {module.lessons.length} Lectures
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="text-sm-md flex items-center justify-between space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <IconCircleCaretRight className="size-6" /> {lesson.title}
                    </div>

                    <span className="text-muted-foreground text-sm">
                      {lesson.duration}
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
