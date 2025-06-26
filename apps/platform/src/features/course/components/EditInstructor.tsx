'use client';
import { buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Instructor } from '@frame-by-frame/db';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconCalendarUp,
  IconPhotoPlus,
  IconTrendingUp,
  IconUsers,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useFormWatch from '../hooks/useFormWatch';
import { useMutation } from '@tanstack/react-query';
import { updateInstructor } from '../actions/updateInstructor';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { cn, mediaUrl } from '@/lib/utils';
import { getUploadSignedUrl } from '@/features/storage/actions/getUploadSignedUrl';

const EditInstructorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  specialization: z.string().optional(),
  experienceYears: z
    .number()
    .int()
    .min(0, 'Experience must be a non-negative integer')
    .optional(),
  followers: z
    .number()
    .int()
    .min(0, 'Followers must be a non-negative integer')
    .optional(),
  revenue: z
    .number()
    .min(0, 'Revenue must be a non-negative number')
    .optional(),
  profilePic: z.string().optional(),
});

interface EditInstructorProps {
  instructor: Instructor;
  courseSlug: string;
}

const EditInstructor = ({ instructor, courseSlug }: EditInstructorProps) => {
  console.log('EditInstructor rendered with:', instructor, courseSlug);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm({
    resolver: zodResolver(EditInstructorSchema),
    defaultValues: {
      name: instructor.name || '',
      specialization: instructor.specialization || '',
      experienceYears: instructor.experienceYears || 0,
      followers: instructor.followers || 0,
      revenue: instructor.revenue || 0,
      profilePic: instructor.profilePic || '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof EditInstructorSchema>) => {
      return await updateInstructor(courseSlug, instructor.id, data);
    },
    onError: (error) => {
      console.error('Error updating instructor:', error);
      toast.error('Failed to update instructor');
    },
    onSuccess: () => {
      toast.success('Instructor updated successfully');
    },
  });

  useFormWatch({
    control: form.control,
    defaultValues: {
      name: instructor.name || '',
      specialization: instructor.specialization || '',
      experienceYears: instructor.experienceYears || 0,
      followers: instructor.followers || 0,
      revenue: instructor.revenue || 0,
      profilePic: instructor.profilePic || '',
    },
    callbackFn: () => {
      const submitForm = form.handleSubmit(
        (data: z.infer<typeof EditInstructorSchema>) => {
          mutate(data);
        },
      );

      submitForm();
    },
  });

  return (
    <div>
      <Form {...form}>
        <form className="flex gap-6 rounded-lg border p-5">
          <div className="space-y-2">
            <FormField
              name="profilePic"
              render={({ field }) => {
                return (
                  <div className="space-y-2">
                    <Label>Instructor Picture</Label>

                    <div className="border-primary relative aspect-square h-60 overflow-hidden rounded-lg border p-2">
                      {field.value && (
                        <Image
                          src={mediaUrl(field.value)}
                          width={800}
                          height={600}
                          alt="Course Thumbnail"
                          className="h-full w-full object-cover"
                        />
                      )}
                      <div
                        className={cn(
                          'space-y-4 rounded-lg px-7 py-8 text-center',
                          field.value &&
                            'bg-background/50 absolute inset-0 h-full w-full opacity-0 backdrop-blur-xl transition-opacity hover:opacity-100',
                        )}
                      >
                        <IconPhotoPlus className="mx-auto size-7" />
                        <div className="space-y-1">
                          <h3 className="min-w-40 text-sm">
                            Drag and drop an image or select a local file
                          </h3>
                        </div>

                        <FormLabel
                          tabIndex={0}
                          className={cn(
                            buttonVariants({ variant: 'outline' }),
                            isUploading &&
                              'pointer-events-none cursor-not-allowed opacity-50',
                          )}
                        >
                          Select File
                        </FormLabel>

                        <FormControl>
                          <Input
                            hidden
                            disabled={isUploading}
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                try {
                                  setIsUploading(true);
                                  const file = e.target.files[0];
                                  const signedUrl = await getUploadSignedUrl({
                                    directory: 'thumbnails',
                                    fileType: file.type.split('/')[1]!,
                                  });
                                  if (!signedUrl) {
                                    throw new Error('Failed to get signed URL');
                                  }
                                  const response = await fetch(signedUrl.url, {
                                    method: 'PUT',
                                    headers: {
                                      'Content-Type': file.type,
                                    },
                                    body: file,
                                  });
                                  if (!response.ok) {
                                    throw new Error('Failed to upload file');
                                  }
                                  field.onChange(signedUrl.key);
                                } catch (error) {
                                  console.error(
                                    'Error uploading thumbnail:',
                                    error,
                                  );
                                  toast.error(
                                    'Failed to upload thumbnail image',
                                  );
                                } finally {
                                  setIsUploading(false);
                                }
                              }
                            }}
                            placeholder="Upload thumbnail image"
                          />
                        </FormControl>
                      </div>
                    </div>
                  </div>
                );
              }}
            />
          </div>
          <div className="space-y-3">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter instructor name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter instructor specialization"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <div className="text-sm">Proficiency</div>
              <div className="flex gap-2">
                <FormField
                  name="experienceYears"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel>
                            <IconCalendarUp className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                          </FormLabel>
                          <Input
                            className="pl-8"
                            placeholder="4"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(Number(value))) {
                                field.onChange(Number(value));
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="followers"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel>
                            <IconUsers className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                          </FormLabel>
                          <Input
                            className="pl-8"
                            placeholder="3000"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(Number(value))) {
                                field.onChange(Number(value));
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <FormLabel>
                            <IconTrendingUp className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                          </FormLabel>
                          <Input
                            className="pl-8"
                            placeholder="1500"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isNaN(Number(value))) {
                                field.onChange(Number(value));
                              }
                            }}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditInstructor;
