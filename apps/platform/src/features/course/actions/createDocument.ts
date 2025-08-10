import apiClient from '@/lib/api-client';
import { Document } from '@frame-by-frame/db';

export const createDocument = async (
  courseSlug: string,
  chapterSlug: string,
  data: { title: string; duration: number },
) => {
  return await apiClient.post<Document>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/document`,
    data,
  );
};
