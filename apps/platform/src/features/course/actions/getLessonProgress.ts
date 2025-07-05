import apiClient from '@/lib/api-client';
import { UserLessonProgress } from '@frame-by-frame/db';

export const getLessonProgress = async (
  courseSlug: string,
  chapterSlug: string,
  lessonSlug: string,
) => {
  try {
    return await apiClient.get<UserLessonProgress>(
      `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/${lessonSlug}/progress`,
    );
  } catch (error) {
    console.log('Error fetching lesson progress:', error);
  }
};
