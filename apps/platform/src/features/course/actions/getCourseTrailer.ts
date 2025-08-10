import apiClient from '@/lib/api-client';
import { Video } from '@frame-by-frame/db';

export const getCourseTrailer = async (courseSlug: string) => {
  return await apiClient.get<Video>(`/courses/${courseSlug}/trailer`);
};
