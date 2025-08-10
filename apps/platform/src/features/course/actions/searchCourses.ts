import apiClient from '@/lib/api-client';
import { CourseWithChapters } from './getCourse';

export const searchCourses = async (query: string) => {
  return await apiClient.get<CourseWithChapters[]>('/courses/search', {
    query,
  });
};
