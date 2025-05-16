'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DocuementLessonWithType } from '../actions/getLesson';
import { Textarea } from '@/components/ui/textarea';
import useFormWatch from '../hooks/useFormWatch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '../actions/updateDocument';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface EditModuleProps {
  chapterSlug: string;
  courseSlug: string;
  module: DocuementLessonWithType;
}

const ModuleSchema = z.object({
  title: z.string().min(1, {
    message: 'Module name is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
});

const EditModule = ({ module, chapterSlug, courseSlug }: EditModuleProps) => {
  const form = useForm<z.infer<typeof ModuleSchema>>({
    resolver: zodResolver(ModuleSchema),
    defaultValues: {
      title: module.title,
      description: module.content ?? '',
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof ModuleSchema>) => {
      return await updateDocument(courseSlug, chapterSlug, module.slug, {
        title: data.title,
        content: data.description,
      });
    },
    onError: (error) => {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    },
    onSuccess: (data) => {
      if (data.title !== module.title) {
        queryClient.invalidateQueries({
          queryKey: ['course', courseSlug, 'chapters'],
        });
        router.replace(
          `/admin/course/${courseSlug}/content/${chapterSlug}/${data.slug}`,
        );
      }
      toast.success('Document updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['lesson', module.slug],
      });
    },
  });

  useFormWatch({
    control: form.control,
    defaultValues: {
      title: module.title,
      description: module.content ?? '',
    },
    callbackFn: () => {
      const submitForm = form.handleSubmit(
        (data: z.infer<typeof ModuleSchema>) => {
          mutate(data);
        },
      );

      submitForm();
    },
  });

  return (
    <Form {...form}>
      <form className="flex-1 space-y-6">
        <FormField
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea className="h-40 resize-none" {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
};

export default EditModule;
