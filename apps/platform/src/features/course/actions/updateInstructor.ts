import apiClient from '@/lib/api-client';

export const updateInstructor = async (
  slug: string,
  instructorId: string,
  body: {
    name?: string;
    specialization?: string;
    experienceYears?: number;
    followers?: number;
    revenue?: number;
    profilePic?: string;
  },
) => {
  return await apiClient.patch(
    `/courses/${slug}/instructors/${instructorId}`,
    body,
  );
};
