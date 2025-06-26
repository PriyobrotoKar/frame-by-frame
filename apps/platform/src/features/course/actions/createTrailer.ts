import apiClient from '@/lib/api-client';
import { Video } from '@frame-by-frame/db';

export const createTrailer = async (courseSlug: string) => {
  return await apiClient.post<Video>(`/courses/${courseSlug}/trailer`);
};
