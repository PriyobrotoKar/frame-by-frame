'use client';

import { Prisma } from '@frame-by-frame/db';
import { IconPdf, IconZip } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { updateLessonProgress } from '../actions/updateLessonProgress';

interface DocumentPreviewProps {
  courseSlug: string;
  chapterSlug: string;
  document: Prisma.DocumentGetPayload<{
    include: {
      attachments: true;
    };
  }>;
}

const DocumentPreview = ({
  courseSlug,
  chapterSlug,
  document,
}: DocumentPreviewProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      return await updateLessonProgress(
        courseSlug,
        chapterSlug,
        'document',
        document.slug,
        {
          progress: document.duration,
        },
      );
    },
    onError: (error) => {
      console.error('Error updating lesson progress:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chapters', courseSlug],
      });
    },
  });

  useEffect(() => {
    mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 py-6">
      <h3 className="text-2xl">{document.title}</h3>
      <p className="whitespace-pre-wrap">{document.content}</p>
      <div>
        {document.attachments.map((attachment) => {
          return (
            <div
              key={attachment.id}
              className="bg-muted flex items-center gap-2 rounded-lg border px-4 py-3 md:max-w-60"
            >
              <div>{attachment.type === 'PDF' ? <IconPdf /> : <IconZip />}</div>
              <div className="flex flex-col">
                <span className="text-sm-md line-clamp-1 break-all">
                  {attachment.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {(attachment.size / Math.pow(2, 20)).toFixed(2)} MB
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DocumentPreview;
