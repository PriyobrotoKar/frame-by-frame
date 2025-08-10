import apiClient from '@/lib/api-client';

export const updateCourse = async (
  courseSlug: string,
  data: { title?: string; subtitle?: string; price?: number },
) => {
  return await apiClient.patch(`/courses/${courseSlug}`, data);
};
