import { VideoStatus } from '@frame-by-frame/db';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getLessonBySlug, Lesson } from '../actions/getLesson';

interface PollUploadStatusProps {
  courseSlug: string;
  chapterSlug: string;
  lessonSlug: string;
  status: VideoStatus;
  setStatus: (status: VideoStatus) => void;
}

export default function usePollUploadStatus({
  courseSlug,
  chapterSlug,
  lessonSlug,
  status,
  setStatus,
}: PollUploadStatusProps): {
  data?: Lesson;
} {
  const { data } = useQuery({
    queryKey: ['pollUploadStatus', lessonSlug],
    queryFn: async () => {
      return await getLessonBySlug(courseSlug, chapterSlug, lessonSlug);
    },
    refetchInterval: () => {
      if (status === VideoStatus.NOT_STARTED || status === VideoStatus.READY)
        return false;

      return 5000;
    },
  });

  useEffect(() => {
    if (data && data.type === 'video') {
      setStatus(data.status);
    }
  }, [data, setStatus]);

  return { data };
}
