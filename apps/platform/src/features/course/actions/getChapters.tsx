import apiClient from '@/lib/api-client';
import { Chapter } from '@frame-by-frame/db';

export const getAllChapters = async (couresSlug: string) => {
  return await apiClient.get<Chapter[]>(`/courses/${couresSlug}/chapters`);
};
