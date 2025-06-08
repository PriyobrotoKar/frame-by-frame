import apiClient from '@/lib/api-client';
import { Video, VideoStatus } from '@frame-by-frame/db';

export const updateVideoStatus = async (
  courseSlug: string,
  chapterSlug: string,
  videoSlug: string,
  status: VideoStatus,
) => {
  return apiClient.patch<Video>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/videos/${videoSlug}/status?status=${status}`,
  );
};
