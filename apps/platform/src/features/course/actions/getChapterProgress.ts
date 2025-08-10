import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';

export type ChapterProgress = Prisma.UserChapterProgressGetPayload<{
  include: {
    lessonProgresses: true;
  };
}>;

export const getChapterProgress = async (
  courseSlug: string,
  chapterSlug: string,
) => {
  return await apiClient.get<ChapterProgress>(
    `/courses/${courseSlug}/chapters/${chapterSlug}/progress`,
  );
};
