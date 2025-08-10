import apiClient from '@/lib/api-client';
import { Attachment } from '@frame-by-frame/db';

export const createAttachment = async (
  courseSlug: string,
  chapterSlug: string,
  lessonSlug: string,
  type: 'video' | 'document',
  data: Pick<Attachment, 'name' | 'url' | 'type' | 'size'>,
) => {
  return apiClient.post(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/${type}s/${lessonSlug}/attachments`,
    data,
  );
};
