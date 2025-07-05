'use client';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Lesson, getLessonBySlug } from '../actions/getLesson';
import { IconPdf, IconZip } from '@tabler/icons-react';
import { useMultipartUpload } from '@/providers/MultipartUploadProvider';
import { updateVideoStatus } from '../actions/updateVideoStatus';
import { Video, VideoStatus } from '@frame-by-frame/db';
import usePollUploadStatus from '../hooks/usePollUploadStatus';
import VideoPlayer from './VideoPlayer';
import { useSession } from '@/providers/SessionProvider';

interface ModulePreviewProps {
  courseSlug: string;
  chapterSlug: string;
  lessonSlug: string;
  initialData: Lesson;
}

const ModulePreview = ({
  lessonSlug,
  courseSlug,
  chapterSlug,
  initialData,
}: ModulePreviewProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['lesson', lessonSlug],
    queryFn: async () => {
      return await getLessonBySlug(courseSlug, chapterSlug, lessonSlug);
    },
    initialData,
  });

  if (isLoading) {
    return <ModulePreviewSkeleton type="document" />;
  }

  if (isError || !data) {
    return <div>Error in fetching module</div>;
  }

  return (
    <div className="flex w-80 flex-col space-y-4 rounded-lg border p-4">
      <h2 className="text-xl">Module Preview</h2>
      {data.type === 'video' ? (
        <VideoPreview
          courseSlug={courseSlug}
          chapterSlug={chapterSlug}
          video={data}
          title={data.title}
          description={data.description}
        />
      ) : (
        <DocumentPreview title={data.title} content={data.content} />
      )}
      <div className="space-y-2">
        {data.attachments?.map((attachment) => {
          return (
            <div key={attachment.id}>
              <div className="bg-primary-foreground flex items-center gap-4 rounded-lg border p-4">
                {attachment.type === 'PDF' ? <IconPdf /> : <IconZip />}
                <div className="text-sm-md line-clamp-1 flex-1">
                  {attachment.name}
                </div>
                <div className="text-muted-foreground min-w-8 text-sm">
                  {(attachment.size / Math.pow(2, 20)).toFixed(2)} MB
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface DocumentPreviewProps {
  title: string;
  content: string | null;
}

const DocumentPreview = ({ title, content }: DocumentPreviewProps) => {
  return (
    <div className="flex-1 space-y-4 px-4 py-5">
      <h3 className="text-body-semibold">{title}</h3>
      <p className="text-muted-foreground line-clamp-[10] whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
};

interface VideoPreviewProps {
  courseSlug: string;
  chapterSlug: string;
  video: Video;
  title: string;
  description: string | null;
}

const VideoPreview = ({
  title,
  description,
  video,
  courseSlug,
  chapterSlug,
}: VideoPreviewProps) => {
  const { data: session } = useSession();

  const [status, setStatus] = useState<VideoStatus>(video.status);
  const { progress, isUploading, isSuccess } = useMultipartUpload();

  const { data } = usePollUploadStatus({
    fn: () => getLessonBySlug(courseSlug, chapterSlug, video.slug),
    status,
    setStatus,
    slug: video.slug,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => updateVideoStatus(video.id, 'PENDING'),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['lesson', video.slug],
      });
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
    <div className="space-y-5">
      {status !== VideoStatus.READY ? (
        <div className="bg-primary-foreground space-y-5 rounded-xl p-4">
          <div className="bg-muted text-muted-foreground flex aspect-video items-center justify-center rounded-lg border">
            {isUploading ? `Uploading ${progress}%...` : status}
          </div>
          <div>
            <div className="text-lg">{title}</div>
          </div>
        </div>
      ) : (
        <VideoPlayer
          title={video.title}
          src={`/courses/${courseSlug}/video/${data?.url ?? video.url}`}
          token={session?.accessToken}
        />
      )}

      <div className="space-y-4">
        <h3 className="text-body-semibold">Description</h3>
        <p className="text-muted-foreground line-clamp-6">{description}</p>
      </div>
    </div>
  );
};

const ModulePreviewSkeleton = ({ type }: { type: 'video' | 'document' }) => {
  return (
    <div className="border-border/50 min-w-72 space-y-4 rounded-lg border p-4">
      <div className="bg-muted h-10 w-40 animate-pulse rounded-md"></div>
      {type === 'video' && (
        <div className="bg-primary-foreground space-y-4 rounded-md p-4">
          <div className="bg-muted h-40 w-full animate-pulse rounded-md"></div>

          <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

          <div className="space-y-1">
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
            <div className="bg-muted h-4 animate-pulse rounded-md"></div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="bg-muted h-4 w-20 animate-pulse rounded-md"></div>

        <div className="space-y-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="bg-muted h-4 animate-pulse rounded-md"
              key={index}
            ></div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
          <IconPdf className="text-muted-foreground/30" />
          <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
          <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
        </div>

        <div className="bg-primary-foreground flex items-center gap-4 rounded-md p-4">
          <IconZip className="text-muted-foreground/30" />
          <div className="bg-muted h-4 flex-1 animate-pulse rounded-md"></div>
          <div className="bg-muted h-4 min-w-8 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default ModulePreview;
