import apiClient from '@/lib/api-client';
import { Course, CourseVersion } from '@frame-by-frame/db';

export type CourseWithVersion = Course &
  CourseVersion & {
    lessonCount: number;
  };

export const createCourse = async (data: { title: string }) => {
  return await apiClient.post<CourseWithVersion>('/courses', data);
};
