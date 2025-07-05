import apiClient from '@/lib/api-client';
import { Document } from '@frame-by-frame/db';

export const updateDocument = async (
  courseSlug: string,
  chapterSlug: string,
  documentSlug: string,
  data: Pick<Document, 'title' | 'content' | 'duration'>,
) => {
  return await apiClient.patch<Document>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/documents/${documentSlug}`,
    data,
  );
};
