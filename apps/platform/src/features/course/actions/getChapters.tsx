import apiClient from '@/lib/api-client';
import { Prisma } from '@frame-by-frame/db';

export type ChapterWithDocuments = Prisma.ChapterGetPayload<{
  include: { documents: { select: { id: true; title: true; slug: true } } };
}>;

export const getAllChapters = async (couresSlug: string) => {
  return await apiClient.get<ChapterWithDocuments[]>(
    `/courses/${couresSlug}/chapters`,
  );
};
