'use client';
import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import VideoDescription from '../components/VideoDescription';
import { Lesson } from './getLesson';
import { Session } from '@/lib/session';
import { updateLessonProgress } from './updateLessonProgress';
import { UserLessonProgress } from '@frame-by-frame/db';

interface VideoPreviewProps {
  courseSlug: string;
  lesson: Lesson;
  session: Session | null;
  lessonProgress?: UserLessonProgress;
}

const VideoPreview = ({
  lesson,
  courseSlug,
  session,
  lessonProgress,
}: VideoPreviewProps) => {
  if (lesson.type !== 'video') {
    return null;
  }

  return (
    <div className="space-y-4">
      <VideoPlayer
        title={lesson.title}
        subtitle={lesson.chapter?.title}
        src={`/courses/${lesson.chapter?.courseVersion?.slug}/video/hls/${lesson.url?.slice(4)}`}
        token={session?.accessToken}
        progress={lessonProgress?.progress}
        revalidateQueryKey={['chapters', courseSlug]}
        updateProgressFn={(progress) =>
          updateLessonProgress(
            courseSlug,
            lesson.chapter!.slug,
            'video',
            lesson.slug,
            {
              progress,
            },
          )
        }
      />
      <VideoDescription
        description={lesson.description}
        attachments={lesson.attachments}
      />
    </div>
  );
};

export default VideoPreview;
