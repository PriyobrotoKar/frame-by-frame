'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createLearning } from '../actions/createLearning';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { editLearning } from '../actions/editLearning';

interface LearningDialogProps {
  type: 'create' | 'edit';
  courseSlug: string;
  trigger: ReactNode;
  learningId?: string;
  defaultValues?: {
    title?: string;
    description?: string | null;
  };
}

const createSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

const editSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const schemas: Record<
  LearningDialogProps['type'],
  typeof createSchema | typeof editSchema
> = {
  create: createSchema,
  edit: editSchema,
};

const LearningDialog = ({
  type,
  courseSlug,
  defaultValues,
  trigger,
  learningId,
}: LearningDialogProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schemas[type]),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<(typeof schemas)[typeof type]>) => {
      if (type === 'create') {
        // @ts-expect-error - TypeScript doesn't infer the type correctly here
        return await createLearning(courseSlug, data);
      } else if (type === 'edit' && learningId) {
        return await editLearning(courseSlug, learningId, data);
      }
    },
    onError: (error) => {
      console.error('Error creating learning:', error);
      toast.error('Failed to create learning');
    },
    onSuccess: () => {
      setOpen(false);
      form.reset();
      router.refresh();
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {type === 'create' ? 'Create Learning' : 'Edit Learning'}
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-5">
              <FormField
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-32 resize-none"
                        placeholder="Description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={isPending}>
                  {type === 'create' ? 'Create' : 'Edit'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningDialog;
