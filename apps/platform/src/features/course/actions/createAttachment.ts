import apiClient from '@/lib/api-client';
import { Attachment } from '@frame-by-frame/db';

export const createAttachment = async (
  courseSlug: string,
  chapterSlug: string,
  documentSlug: string,
  data: Pick<Attachment, 'name' | 'url' | 'type' | 'size'>,
) => {
  return apiClient.post(
    `/courses/${courseSlug}/chapters/${chapterSlug}/lessons/documents/${documentSlug}/attachments`,
    data,
  );
};
