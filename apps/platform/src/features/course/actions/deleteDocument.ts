import apiClient from '@/lib/api-client';

export const deleteDocument = async (
  courseSlug: string,
  chapterSlug: string,
  documentSlug: string,
) => {
  return await apiClient.delete(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/documents/${documentSlug}`,
  );
};
