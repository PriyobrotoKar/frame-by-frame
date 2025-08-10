import apiClient from '@/lib/api-client';
import { Video } from '@frame-by-frame/db';

export const updateVideo = async (
  courseSlug: string,
  chapterSlug: string,
  videoSlug: string,
  data: Pick<Video, 'title' | 'description'>,
) => {
  return await apiClient.patch<Video>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/videos/${videoSlug}`,
    data,
  );
};
