'use client';
import { demoCourse } from '@/lib/mocks';
import Image from 'next/image';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { IconCircleCaretRight } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const CourseSidebar = () => {
  const { details } = useParams<{
    details: string[];
  }>();
  const lessonSlug = details[2];
  const courseSlug = details[1];

  const defaultModule = demoCourse.modules.find(
    (module) => module.slug === courseSlug,
  );

  return (
    <aside className="bg-card flex w-56 flex-col gap-4 self-stretch border-r px-7 py-10">
      <div className="space-y-20">
        <Image src={'/logo.svg'} alt="logo" width={71} height={21} />
      </div>
      <div className="space-y-14">
        <div className="space-y-3">
          <h1 className="text-xl">{demoCourse.title}</h1>
          <p className="text-sm">{demoCourse.subtitle}</p>
        </div>

        <Accordion
          defaultValue={defaultModule ? [defaultModule.id] : undefined}
          type="multiple"
          className="space-y-4"
        >
          {demoCourse.modules.map((module) => {
            return (
              <AccordionItem
                className="data-[state=open]:bg-background data-[state=open]:border-border rounded-2xl border px-4 data-[state=closed]:border-transparent"
                key={module.id}
                value={module.id}
              >
                <AccordionTrigger className="text-md [&>svg]:hidden">
                  {module.title}
                </AccordionTrigger>
                <AccordionContent className="space-y-5">
                  {module.lessons.map((lesson) => {
                    return (
                      <div
                        key={lesson.id}
                        className={cn(
                          'flex gap-2',
                          lesson.slug === lessonSlug && 'text-primary',
                        )}
                      >
                        <IconCircleCaretRight className="size-6 shrink-0" />
                        <div className="space-y-2">
                          <p className="text-sm-md">{lesson.title}</p>
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </aside>
  );
};

export default CourseSidebar;
