import apiClient from '@/lib/api-client';
import { CourseWithChapters } from './getCourse';

export const getLibraryCourses = async () => {
  return await apiClient.get<CourseWithChapters[]>('/courses/library');
};
