import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';

export type Lesson =
  | (Prisma.DocumentGetPayload<{
      include: {
        attachments: true;
        lessonProgresses: {
          select: {
            progress: true;
            completed: true;
          };
        };
        chapter: {
          select: {
            id: true;
            title: true;
            slug: true;
            courseVersion: {
              select: {
                id: true;
                title: true;
                slug: true;
                courseId: true;
              };
            };
          };
        };
      };
    }> & {
      type: 'document';
    })
  | (Prisma.VideoGetPayload<{
      include: {
        attachments: true;
        lessonProgresses: {
          select: {
            progress: true;
            completed: true;
          };
        };
        chapter: {
          select: {
            id: true;
            title: true;
            slug: true;
            courseVersion: {
              select: {
                id: true;
                title: true;
                slug: true;
                courseId: true;
              };
            };
          };
        };
      };
    }> & {
      type: 'video';
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
