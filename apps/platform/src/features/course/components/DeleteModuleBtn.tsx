'use client';

import { Button } from '@/components/ui/button';
import { IconTrash } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { deleteVideo } from '../actions/deleteVideo';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteDocument } from '../actions/deleteDocument';

interface DeleteModuleBtnProps {
  type: 'video' | 'document';
  courseSlug: string;
  chapterSlug: string;
  lessonSlug: string;
}

const DeleteModuleBtn = ({
  type,
  courseSlug,
  chapterSlug,
  lessonSlug,
}: DeleteModuleBtnProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (type === 'video') {
        return await deleteVideo(courseSlug, chapterSlug, lessonSlug);
      }
      if (type === 'document') {
        return await deleteDocument(courseSlug, chapterSlug, lessonSlug);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['course', courseSlug, 'chapters'],
      });
      toast.success('Module deleted successfully');
      router.replace(`/admin/course/${courseSlug}/content`);
    },
    onError: (error) => {
      console.error('Error deleting module:', error);
      toast.error('Failed to delete module');
    },
  });

  return (
    <Button variant={'destructive'} onClick={() => mutate()}>
      <IconTrash />
    </Button>
  );
};

export default DeleteModuleBtn;
