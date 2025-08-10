import apiClient from '@/lib/api-client';

export const updateLessonProgress = async (
  courseSlug: string,
  chapterSlug: string,
  type: 'video' | 'document',
  lessonSlug: string,
  data: {
    progress: number;
  },
) => {
  return await apiClient.post(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/${type}s/${lessonSlug}/progress`,
    data,
  );
};
