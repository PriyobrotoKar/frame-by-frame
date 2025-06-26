'use client';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { publishCourse } from '../actions/publishCourse';
import { toast } from 'sonner';

interface PublishButtonProps {
  courseSlug: string;
}

const PublishButton = ({ courseSlug }: PublishButtonProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await publishCourse(courseSlug);
    },
    onError: (error) => {
      console.error('Error publishing course:', error);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Course published successfully');
    },
  });

  return (
    <Button onClick={() => mutate()} disabled={isPending}>
      Publish
    </Button>
  );
};

export default PublishButton;
