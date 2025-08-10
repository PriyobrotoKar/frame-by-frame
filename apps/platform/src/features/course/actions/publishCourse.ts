import apiClient from '@/lib/api-client';

export const publishCourse = async (courseSlug: string) => {
  return await apiClient.post(`/courses/${courseSlug}/publish`);
};
