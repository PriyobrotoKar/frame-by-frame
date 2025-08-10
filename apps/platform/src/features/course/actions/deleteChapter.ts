import apiClient from '@/lib/api-client';

export const deleteChapter = async (
  courseSlug: string,
  chapterSlug: string,
) => {
  return await apiClient.delete(
    `/courses/${courseSlug}/chapters/${chapterSlug}`,
  );
};
