import apiClient from '@/lib/api-client';
import { CourseLearnings } from '@frame-by-frame/db';

export const getLearnings = async (courseSlug: string) => {
  return await apiClient.get<CourseLearnings[]>(
    `/courses/${courseSlug}/learnings`,
  );
};
