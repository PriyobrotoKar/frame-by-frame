import apiClient from '@/lib/api-client';
import { Course } from '@frame-by-frame/db';

export const createCourse = async (data: { title: Course['title'] }) => {
  return await apiClient.post<Course>('/courses', data);
};
