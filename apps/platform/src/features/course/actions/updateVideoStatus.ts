import apiClient from '@/lib/api-client';
import { Video, VideoStatus } from '@frame-by-frame/db';

export const updateVideoStatus = async (
  videoSlug: string,
  status: VideoStatus,
) => {
  return apiClient.patch<Video>(
    `/courses/lessons/videos/${videoSlug}/status?status=${status}`,
  );
};
