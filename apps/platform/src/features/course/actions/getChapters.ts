import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';
import { Lesson } from './getLesson';

export type ChapterWithLessons = Prisma.ChapterGetPayload<{
  include: {
    chapterProgresses: {
      select: {
        lessonProgresses: true;
      };
    };
  };
}> & {
  lessons: Lesson[];
};

export const getAllChapters = async (couresSlug: string) => {
  return await apiClient.get<ChapterWithLessons[]>(
    `/courses/${couresSlug}/chapters`,
  );
};
