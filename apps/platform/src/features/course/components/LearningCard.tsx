'use client';

import { Button } from '@/components/ui/button';
import { CourseLearnings } from '@frame-by-frame/db';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';
import LearningDialog from './LearningDialog';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteLearning } from '../actions/deleteLearning';

interface LearningCardProps {
  courseSlug: string;
  learning: CourseLearnings;
  index: number;
}

const LearningCard = ({ courseSlug, learning, index }: LearningCardProps) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await deleteLearning(courseSlug, learning.id);
    },
    onError: (error) => {
      console.error('Error deleting learning:', error);
      toast.error('Failed to delete learning');
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm-md">
          {index + 1}. {learning.title}
        </h3>
        <div className="flex items-center">
          <LearningDialog
            trigger={
              <Button size={'icon'} variant={'ghost'}>
                <IconPencil />
              </Button>
            }
            courseSlug={courseSlug}
            type="edit"
            learningId={learning.id}
            defaultValues={{
              title: learning.title,
              description: learning.description,
            }}
          />
          <Button
            onClick={() => mutate()}
            disabled={isPending}
            size={'icon'}
            variant={'ghost'}
          >
            <IconTrash />
          </Button>
        </div>
      </div>
      <p className="bg-muted flex-1 rounded-md p-3 text-sm">
        {learning.description}
      </p>
    </div>
  );
};

export default LearningCard;
