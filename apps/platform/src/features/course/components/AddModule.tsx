'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IconCircleCaretRight, IconFileDescription } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { createDocument } from '../actions/createDocument';
import { toast } from 'sonner';

interface AddModuleProps {
  chapter: { name: string; slug: string } | undefined;
  open: boolean;
  setOpen: (value: 'EDIT' | 'DELETE' | 'ADD' | undefined) => void;
}

const AddModule = ({ chapter, open, setOpen }: AddModuleProps) => {
  const router = useRouter();
  const { slug: courseSlug } = useParams<{ slug: string }>();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { title: string }) => {
      if (chapter === undefined) {
        return;
      }
      return await createDocument(courseSlug, chapter.slug, data);
    },
    onSuccess: (data) => {
      if (!chapter || !data) {
        return;
      }
      setOpen(undefined);
      router.push(
        `/admin/course/${courseSlug}/content/${chapter.slug}/${data.slug}`,
      );
    },
    onError: (error) => {
      console.error('Error uploading video:', error);
      toast.error(error.message);
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
          setOpen(undefined);
        }
      }}
    >
      <DialogContent className="gap-6 p-14 *:text-center sm:max-w-md">
        <DialogHeader className="*:text-center">
          <DialogTitle className="text-primary">Upload a video</DialogTitle>
          <DialogDescription>
            For best results, video uploads should be at least 1080p(1920 x
            1080p) in mp4 format
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="border-primary space-y-4 rounded-lg border px-12 py-7">
            <IconCircleCaretRight className="text-primary mx-auto size-8" />

            <div className="space-y-1.5">
              <h4 className="text-sm-md">
                Drag and drop a video file to upload
              </h4>
              <p className="text-sm">
                Your video will not air until you publish course
              </p>
            </div>

            <div>
              <Label
                tabIndex={0}
                className={cn(buttonVariants({ variant: 'outline' }))}
                htmlFor="video-input"
              >
                Select File
              </Label>
              <Input type="file" accept="video/mp4" hidden id="video-input" />
            </div>
          </div>

          <div>or</div>

          <Button
            variant={'outline'}
            disabled={isPending}
            onClick={() => mutate({ title: 'Untitled' })}
          >
            <IconFileDescription /> Create a reading document
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddModule;
