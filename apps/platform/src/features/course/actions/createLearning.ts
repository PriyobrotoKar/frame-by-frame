import apiClient from '@/lib/api-client';

export const createLearning = async (
  courseSlug: string,
  data: {
    title: string;
    description: string;
  },
) => {
  return await apiClient.post(`/courses/${courseSlug}/learnings`, data);
};
