import apiClient, { ApiError } from '@/lib/api-client';
import { CourseVersion, Prisma } from '@frame-by-frame/db';
import { Lesson } from './getLesson';

export type Activity = Prisma.UserActivityGetPayload<{
  include: {
    chapter: true;
  };
}> & {
  course: CourseVersion;
  lesson: Lesson;
  progress: number;
};

export const getUserActivity = async () => {
  try {
    return await apiClient.get<Activity>('/courses/activity');
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        return null; // User is not authenticated
      }
      if (error.status === 404) {
        return null; // No activity found
      }
    }
    console.log('Error fetching user activity:', error);
  }
};
