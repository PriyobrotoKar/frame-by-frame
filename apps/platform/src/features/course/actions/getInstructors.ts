import apiClient from '@/lib/api-client';
import { Instructor } from '@frame-by-frame/db';

export const getInstructors = async (courseSlug: string) => {
  return await apiClient.get<Instructor[]>(
    `/courses/${courseSlug}/instructors`,
  );
};
