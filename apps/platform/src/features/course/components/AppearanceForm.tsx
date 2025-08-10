'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { updateCourse } from '../actions/updateCourse';
import { toast } from 'sonner';
import useFormWatch from '../hooks/useFormWatch';
import { IconCircleCaretRight, IconPhotoPlus } from '@tabler/icons-react';
import { Label } from '@/components/ui/label';
import { cn, mediaUrl, slugify } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { getUploadSignedUrl } from '@/features/storage/actions/getUploadSignedUrl';
import Image from 'next/image';
import { createTrailer } from '../actions/createTrailer';
import { useMultipartUpload } from '@/providers/MultipartUploadProvider';
import { Video, VideoStatus } from '@frame-by-frame/db';
import { updateVideoStatus } from '../actions/updateVideoStatus';
import VideoPlayer from './VideoPlayer';
import { CourseWithChapters, getCourseBySlug } from '../actions/getCourse';
import { useRouter } from 'next/navigation';
import usePollUploadStatus from '../hooks/usePollUploadStatus';

const AppearanceSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  price: z.number().optional(),
  image: z.string().optional(),
});

interface AppearanceFormProps {
  course: CourseWithChapters;
  trailer: Video | null;
}

const AppearanceForm = ({ course, trailer }: AppearanceFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AppearanceSchema),
    defaultValues: {
      title: course.title,
      subtitle: course.subtitle || '',
      price: course.price ? Number((course.price / 100).toFixed(2)) : 0,
      image: course.image || '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof AppearanceSchema>) => {
      return await updateCourse(course.slug, data);
    },
    onError: (error) => {
      console.error('Error updating course:', error);
      toast.error('Failed to update course appearance');
    },
    onSuccess: () => {
      toast.success('Course appearance updated successfully');
      router.refresh();
    },
  });

  useFormWatch({
    control: form.control,
    defaultValues: {
      title: course.title,
      subtitle: course.subtitle || '',
      price: course.price ? Number((course.price / 100).toFixed(2)) : 0,
      image: course.image || '',
    },
    callbackFn: () => {
      const submitForm = form.handleSubmit(
        (data: z.infer<typeof AppearanceSchema>) => {
          mutate(data);
        },
      );

      submitForm();
    },
  });

  return (
    <div>
      <Form {...form}>
        <form className="max-w-md space-y-6">
          <FormField
            name="image"
            render={({ field }) => {
              return (
                <div className="space-y-2">
                  <Label>Course Thumbnail</Label>

                  <div className="border-primary relative h-60 overflow-hidden rounded-lg border p-2">
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
                        'space-y-4 rounded-lg p-12 text-center',
                        field.value &&
                          'bg-background/50 absolute inset-0 h-full w-full opacity-0 backdrop-blur-xl transition-opacity hover:opacity-100',
                      )}
                    >
                      <IconPhotoPlus className="mx-auto size-7" />
                      <div className="space-y-1">
                        <h3 className="text-md">
                          Drag and drop an image or select a local file
                        </h3>
                        <p className="text-sm">
                          Changes aren’t saved unless published.
                        </p>
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
                                toast.error('Failed to upload thumbnail image');
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

          <CourseTrailerUploader courseSlug={course.slug} trailer={trailer} />

          <FormField
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Course Title" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="subtitle"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Course subtitle" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <FormField
            name="price"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Course Price (INR)</FormLabel>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="3000"
                      value={field.value}
                      className="max-w-28"
                      onChange={(e) => {
                        const value = e.target.value;
                        // Ensure the value is a valid number or empty
                        if (!isNaN(Number(value))) {
                          field.onChange(Number(value));
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
};

interface CourseTrailerUploaderProps {
  courseSlug: string;
  trailer?: Video | null;
}

const CourseTrailerUploader = ({
  courseSlug,
  trailer,
}: CourseTrailerUploaderProps) => {
  const [status, setStatus] = useState<VideoStatus>(
    trailer?.status ?? VideoStatus.NOT_STARTED,
  );
  const [videoId, setVideoId] = useState<string | undefined>();
  const { uploadFile, isUploading, progress, isSuccess } = useMultipartUpload();

  const { data } = usePollUploadStatus({
    fn: async () => {
      const { trailer } = await getCourseBySlug(courseSlug, true);
      return trailer;
    },
    status,
    setStatus,
    slug: courseSlug,
  });

  const { mutate: createVideoMutation, isPending: isCreatingVideo } =
    useMutation({
      mutationFn: async (data: { title: string; videoFile: File }) => {
        const video = await createTrailer(courseSlug);

        // Key format: courseSlug-chapterSlug-videoName-videoId.fileExtension
        uploadFile({
          file: data.videoFile,
          key: `${courseSlug}-trailer-${slugify(data.videoFile.name.split('.')[0])}-${video.id}.${data.videoFile.name.split('.').pop()}`,
        });
        setVideoId(video.id);
        return video;
      },
      onError: (error) => {
        console.error('Error uploading video:', error);
        toast.error(error.message);
      },
    });

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!videoId) {
        throw new Error('Video ID is not set');
      }
      updateVideoStatus(videoId, 'PENDING');
    },
    onError: (error) => {
      console.error('Error updating video status:', error);
    },
  });

  useEffect(() => {
    if (isSuccess && status === VideoStatus.NOT_STARTED) {
      setStatus(VideoStatus.PENDING);
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, status]);

  return (
    <div className="space-y-3">
      <Label>Course Trailer</Label>
      <div className="border-primary min-h-64 space-y-4 overflow-hidden rounded-lg border">
        {status === VideoStatus.NOT_STARTED && !isUploading && (
          <div className="flex min-h-[inherit] flex-col items-center justify-center gap-4 text-center">
            <IconCircleCaretRight className="text-primary mx-auto size-8" />
            <div className="space-y-1.5">
              <h4 className="text-sm-md">
                Select a local file to show as course trailer
              </h4>
              <p className="text-sm">
                Your video will not air until you publish course
              </p>
            </div>

            <div>
              <Label
                tabIndex={0}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  isCreatingVideo &&
                    'pointer-events-none cursor-not-allowed opacity-50',
                )}
                htmlFor="video-input"
              >
                Select File
              </Label>
              <Input
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  createVideoMutation({
                    title: 'Untitled Video',
                    videoFile: file,
                  });
                }}
                disabled={isCreatingVideo}
                type="file"
                accept="video/mp4"
                hidden
                id="video-input"
              />
            </div>
          </div>
        )}

        {status === VideoStatus.READY && (
          <VideoPlayer
            className="rounded-none p-2"
            src={data?.url ?? trailer!.url}
          />
        )}

        {status !== VideoStatus.READY && status !== VideoStatus.NOT_STARTED && (
          <div className="flex min-h-[inherit] flex-col p-2">
            <div className="bg-muted text-muted-foreground flex flex-1 items-center justify-center rounded-lg border">
              {status}
            </div>
          </div>
        )}

        {isUploading && (
          <div className="flex min-h-[inherit] flex-col p-2">
            <div className="bg-muted text-muted-foreground flex flex-1 items-center justify-center rounded-lg border">
              Uploading {progress}%...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppearanceForm;
