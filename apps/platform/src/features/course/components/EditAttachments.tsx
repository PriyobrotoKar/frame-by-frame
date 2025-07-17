'use client';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUploadSignedUrl } from '@/features/storage/actions/getUploadSignedUrl';
import { cn } from '@/lib/utils';
import { IconLoader, IconPdf, IconPlus, IconZip } from '@tabler/icons-react';
import React, { useState } from 'react';
import { createAttachment } from '../actions/createAttachment';
import { getLessonBySlug, Lesson } from '../actions/getLesson';
import { AttachmentType } from '@frame-by-frame/db';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface EditAttachmentsProps {
  courseSlug: string;
  chapterSlug: string;
  module: Lesson;
}

const EditAttachments = ({
  courseSlug,
  chapterSlug,
  module,
}: EditAttachmentsProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['lesson', module.slug],
    queryFn: async () => {
      return await getLessonBySlug(courseSlug, chapterSlug, module.slug);
    },
    initialData: module,
  });

  const { mutate } = useMutation({
    mutationFn: async (file: File) => {
      setIsUploading(true);
      const type = file.type.split('/')[1]!;

      const uploadUrl = await getUploadSignedUrl({
        directory: 'attachments',
        fileType: type,
      });

      const response = await fetch(uploadUrl.url, {
        method: 'PUT',
        body: file,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return await createAttachment(
        courseSlug,
        chapterSlug,
        module.slug,
        module.type,
        {
          name: file.name,
          size: file.size,
          url: uploadUrl.key,
          type: type.toUpperCase() as AttachmentType,
        },
      );
    },
    onError: (error) => {
      console.error('Error uploading file:', error);
      toast.error((error as Error).message);
      setIsUploading(false);
    },
    onSuccess: async (newData) => {
      setIsUploading(false);

      queryClient.setQueryData(
        ['lesson', module.slug],
        (oldData: Lesson | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            attachments: [...(oldData.attachments || []), newData],
          };
        },
      );
    },
  });

  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    mutate(file);
  };

  if (isLoading) {
    return <div>Loading attachments...</div>;
  }

  if (isError || !data) {
    return <div>Error loading attachments</div>;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-body-md">Attachments</h3>
      <div className="flex flex-wrap gap-2">
        <div>
          <Label
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-12 w-28 cursor-pointer rounded-2xl',
            )}
            htmlFor="attachment"
          >
            {isUploading ? (
              <IconLoader className="animate-spin" />
            ) : (
              <>
                <IconPlus /> New
              </>
            )}
          </Label>
          <Input
            disabled={isUploading}
            accept="application/pdf,application/zip"
            type="file"
            id="attachment"
            onChange={handleFileInput}
            hidden
          />
        </div>
        {data.attachments.map((attachment) => {
          return (
            <div
              key={attachment.id}
              className="bg-muted flex max-w-60 items-center gap-2 rounded-2xl border px-4 py-3"
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

export default EditAttachments;
