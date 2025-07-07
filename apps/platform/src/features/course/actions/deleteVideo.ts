import apiClient from '@/lib/api-client';

export const deleteVideo = async (
  courseSlug: string,
  chapterSlug: string,
  videoSlug: string,
) => {
  return await apiClient.delete(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/videos/${videoSlug}`,
  );
};
