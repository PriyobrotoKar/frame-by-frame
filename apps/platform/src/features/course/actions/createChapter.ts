import apiClient from '@/lib/api-client';

export const createChapter = async (
  courseSlug: string,
  data: { title: string },
) => {
  return await apiClient.post(`/courses/${courseSlug}/chapters`, data);
};
