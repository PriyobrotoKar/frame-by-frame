import apiClient from '@/lib/api-client';
import { Document, Chapter, Video } from '@frame-by-frame/db';

export type ChapterWithLessons = Chapter & {
  lessons: ((Document & { type: 'document' }) | (Video & { type: 'video' }))[];
};

export const getAllChapters = async (couresSlug: string) => {
  return await apiClient.get<ChapterWithLessons[]>(
    `/courses/${couresSlug}/chapters`,
  );
};
