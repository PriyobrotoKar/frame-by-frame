import apiClient from '@/lib/api-client';

export const updateUserActivity = async (
  courseSlug: string,
  chapterId: string,
  lessonId: string,
  data: {
    type: 'video' | 'document';
  },
) => {
  return await apiClient.post(
    `/courses/activity/${courseSlug}/chapters/${chapterId}/lessons/${lessonId}`,
    data,
  );
};
