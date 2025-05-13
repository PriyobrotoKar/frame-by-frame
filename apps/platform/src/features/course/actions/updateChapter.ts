import apiClient from '@/lib/api-client';

export const updateChapter = async (
  courseSlug: string,
  chapterSlug: string,
  data: { title?: string; order?: number },
) => {
  return await apiClient.patch(
    `/courses/${courseSlug}/chapters/${chapterSlug}`,
    data,
  );
};
