import apiClient from '@/lib/api-client';
import { Course } from '@frame-by-frame/db';

export const getCourseBySlug = async (courseId: string) => {
  return await apiClient.get<Course>(`/courses/${courseId}`);
};

export const getCourses = async () => {
  console.log('Fetching courses');
  return await apiClient.get<Course[]>('/courses');
};
