import apiClient from '@/lib/api-client';

export const editLearning = async (
  courseSlug: string,
  learningSlug: string,
  data: {
    title?: string;
    description?: string;
  },
) => {
  return await apiClient.patch(
    `/courses/${courseSlug}/learnings/${learningSlug}`,
    data,
  );
};
