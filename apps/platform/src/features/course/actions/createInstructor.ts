import apiClient from '@/lib/api-client';

export const createInstructor = async (
  courseSlug: string,
  instructorName: string,
) => {
  return await apiClient.post(`/courses/${courseSlug}/instructors`, {
    name: instructorName,
  });
};
