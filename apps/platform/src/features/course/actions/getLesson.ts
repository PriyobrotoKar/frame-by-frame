import apiClient from '@/lib/api-client';
import { Attachment, Prisma, Video } from '@frame-by-frame/db';

export type Lesson =
  | (Prisma.DocumentGetPayload<{
      include: {
        attachments: true;
      };
    }> & {
      type: 'document';
    })
  | (Video & {
      type: 'video';
      attachments: Attachment[];
    });

export const getLessonBySlug = async (
  courseSlug: string,
  chapterSlug: string,
  lessonSlug: string,
) => {
  return await apiClient.get<Lesson>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/${lessonSlug}`,
  );
};
