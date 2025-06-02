'use client';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUploadSignedUrl } from '@/features/storage/actions/getUploadSignedUrl';
import { cn } from '@/lib/utils';
import { IconPdf, IconPlus } from '@tabler/icons-react';
import React from 'react';
import { createAttachment } from '../actions/createAttachment';
import { DocuementLessonWithType } from '../actions/getLesson';
import { AttachmentType } from '@frame-by-frame/db';
import { toast } from 'sonner';

interface EditAttachmentsProps {
  courseSlug: string;
  chapterSlug: string;
  module: DocuementLessonWithType;
}

const EditAttachments = ({
  courseSlug,
  chapterSlug,
  module,
}: EditAttachmentsProps) => {
  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    const file = event.target.files[0];
    if (!file) return;

    try {
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

      await createAttachment(courseSlug, chapterSlug, module.slug, {
        name: file.name,
        size: file.size,
        url: uploadUrl.key,
        type: type.toUpperCase() as AttachmentType,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-body-md">Attachments</h3>
      <div className="flex flex-wrap gap-2">
        <div>
          <Label
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'h-full w-28',
            )}
            htmlFor="attachment"
          >
            <IconPlus /> New
          </Label>
          <Input
            accept="application/pdf,application/zip"
            type="file"
            id="attachment"
            onChange={handleFileInput}
            hidden
          />
        </div>
        {module.attachments.map((attachment) => {
          return (
            <div
              key={attachment.id}
              className="bg-muted flex max-w-40 items-center gap-2 rounded-lg border px-4 py-3"
            >
              <div>
                <IconPdf />
              </div>
              <div className="flex flex-col">
                <span className="text-sm-md line-clamp-1">
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
