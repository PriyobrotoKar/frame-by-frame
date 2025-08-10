'use client';

import { Button } from '@/components/ui/button';
import { IconSchool } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { createInstructor } from '../actions/createInstructor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AddInstructorProps {
  courseSlug: string;
}

export const AddInstructor = ({ courseSlug }: AddInstructorProps) => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await createInstructor(courseSlug, 'New Instructor');
    },
    onError: (error) => {
      console.error('Error creating instructor:', error);
      toast.error('Failed to add instructor. Please try again.');
    },
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <div>
      <Button
        onClick={() => mutate()}
        disabled={isPending}
        variant={'secondary'}
      >
        <IconSchool /> Add Instructor
      </Button>
    </div>
  );
};
