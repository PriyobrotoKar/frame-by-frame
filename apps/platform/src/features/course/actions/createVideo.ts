import apiClient from '@/lib/api-client';
import { Video } from '@frame-by-frame/db';

export const createVideo = async (
  courseSlug: string,
  chapterSlug: string,
  data: { title: string; duration: number },
) => {
  return await apiClient.post<Video>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/videos`,
    data,
  );
};
