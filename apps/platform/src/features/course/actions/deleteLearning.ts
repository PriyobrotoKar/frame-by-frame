import apiClient from '@/lib/api-client';

export const deleteLearning = async (
  courseSlug: string,
  learningId: string,
): Promise<void> => {
  await apiClient.delete(`/courses/${courseSlug}/learnings/${learningId}`);
};
