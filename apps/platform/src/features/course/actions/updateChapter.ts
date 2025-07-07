import apiClient from '@/lib/api-client';
import { Chapter } from '@frame-by-frame/db';

export const updateChapter = async (
  courseSlug: string,
  chapterSlug: string,
  data: { title?: string; order?: number },
) => {
  return await apiClient.patch<Chapter>(
    `/courses/${courseSlug}/chapters/${chapterSlug}`,
    data,
  );
};
