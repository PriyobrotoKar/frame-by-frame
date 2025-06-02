'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DocuementLessonWithType, getLessonBySlug } from '../actions/getLesson';
import { IconPdf, IconZip } from '@tabler/icons-react';

interface ModulePreviewProps {
  courseSlug: string;
  chapterSlug: string;
  lessonSlug: string;
  initialData: DocuementLessonWithType;
}

const ModulePreview = ({
  lessonSlug,
  courseSlug,
  chapterSlug,
  initialData,
}: ModulePreviewProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lesson', lessonSlug],
    queryFn: async () => {
      return await getLessonBySlug(courseSlug, chapterSlug, lessonSlug);
    },
    initialData,
  });

  if (isLoading) {
    return <ModulePreviewSkeleton type="document" />;
  }

  if (isError || !data) {
    return <div>Error in fetching module</div>;
  }

  return (
    <div className="flex w-72 flex-col rounded-lg border p-4">
      <h2 className="text-xl">Module Preview</h2>
      <div className="flex-1 space-y-4 px-4 py-5">
        <h3 className="text-body-semibold">{data.title}</h3>
        <p className="text-muted-foreground line-clamp-[10]">{data.content}</p>
      </div>
      <div className="space-y-2">
        {data.attachments.map((attachment) => {
          return (
            <div key={attachment.id}>
              <div className="bg-primary-foreground flex items-center gap-4 rounded-lg border p-4">
                {attachment.type === 'PDF' ? <IconPdf /> : <IconZip />}
                <div className="text-sm-md line-clamp-1 flex-1">
                  {attachment.name}
                </div>
                <div className="text-muted-foreground min-w-8 text-sm">
                  {(attachment.size / Math.pow(2, 20)).toFixed(2)} MB
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ModulePreviewSkeleton = ({ type }: { type: 'video' | 'document' }) => {
  return (
    <div className="border-border/50 min-w-72 space-y-4 rounded-lg border p-4">
      <div className="bg-muted h-10 w-40 animate-pulse rounded-md"></div>
      {type === 'video' && (
        <div className="bg-primary-foreground space-y-4 rounded-md p-4">
          <div className="bg-muted h-40 w-full animate-pulse rounded-md"></div>

          <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

          <div className="space-y-1">
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="bg-muted h-4 animate-pulse rounded-md"
              key={index}
            ></div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
          <IconPdf className="text-muted-foreground/30" />
          <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
          <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
        </div>

        <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
          <IconZip className="text-muted-foreground/30" />
          <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
          <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ModulePreview;
