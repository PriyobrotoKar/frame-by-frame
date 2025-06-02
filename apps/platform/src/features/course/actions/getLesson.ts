import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';

export type DocuementLessonWithType = Prisma.DocumentGetPayload<{
  include: {
    attachments: true;
  };
}> & {
  type: 'document';
};

export const getLessonBySlug = async (
  courseSlug: string,
  chapterSlug: string,
  lessonSlug: string,
) => {
  return await apiClient.get<DocuementLessonWithType>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/${lessonSlug}`,
  );
};
