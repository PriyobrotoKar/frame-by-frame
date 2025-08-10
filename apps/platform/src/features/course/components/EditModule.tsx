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
import { Lesson } from '../actions/getLesson';
import { Textarea } from '@/components/ui/textarea';
import useFormWatch from '../hooks/useFormWatch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '../actions/updateDocument';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateVideo } from '../actions/updateVideo';
import { ChapterWithLessons } from '../actions/getChapters';

interface EditModuleProps {
  chapterSlug: string;
  courseSlug: string;
  module: Lesson;
}

const ModuleSchema = z.object({
  title: z.string().min(1, {
    message: 'Module name is required',
  }),
  description: z.string(),
});

const EditModule = ({ module, chapterSlug, courseSlug }: EditModuleProps) => {
  const form = useForm<z.infer<typeof ModuleSchema>>({
    resolver: zodResolver(ModuleSchema),
    defaultValues: {
      title: module.title,
      description:
        (module.type === 'video' ? module.description : module.content) ?? '',
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof ModuleSchema>) => {
      if (module.type === 'video') {
        return await updateVideo(courseSlug, chapterSlug, module.slug, {
          title: data.title,
          description: data.description,
        });
      }
      const wordsPerMinute = 200;
      const duration = Math.floor(data.description.length / wordsPerMinute);
      return await updateDocument(courseSlug, chapterSlug, module.slug, {
        title: data.title,
        content: data.description,
        duration,
      });
    },
    onError: (error) => {
      console.error('Error updating lesson:', error);
      toast.error('Failed to update lesson');
    },
    onSuccess: async (data) => {
      if (data.title !== module.title) {
        queryClient.setQueryData(
          ['course', courseSlug, 'chapters'],
          (oldData: ChapterWithLessons[]) => {
            return oldData?.map((chapter) => {
              if (chapter.slug === chapterSlug) {
                return {
                  ...chapter,
                  lessons: chapter.lessons.map((mod) =>
                    mod.slug === module.slug
                      ? { ...mod, title: data.title, slug: data.slug }
                      : mod,
                  ),
                };
              }
              return chapter;
            });
          },
        );
        router.replace(
          `/admin/course/${courseSlug}/content/${chapterSlug}/${data.slug}`,
        );
      }
      toast.success('Lesson updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['lesson', module.slug],
      });
    },
  });

  useFormWatch({
    control: form.control,
    defaultValues: {
      title: module.title,
      description:
        (module.type === 'video' ? module.description : module.content) ?? '',
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
