import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';
import { ChapterWithLessons } from './getChapters';

export type CourseWithChapters = Prisma.CourseVersionGetPayload<{
  include: {
    trailer: true;
    learnings: true;
    instructors: true;
  };
}> & {
  chapters: ChapterWithLessons[];
};

export const getCourseBySlug = async (slug: string, isAdmin = false) => {
  return await apiClient.get<CourseWithChapters>(
    `/courses/${slug}` + (isAdmin ? '/admin' : ''),
  );
};

export const getCourses = async (isAdmin = false) => {
  console.log('Fetching courses');
  return await apiClient.get<CourseWithChapters[]>(
    '/courses' + (isAdmin ? '/admin' : ''),
  );
};
