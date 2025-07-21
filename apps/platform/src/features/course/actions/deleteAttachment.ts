import apiClient from '@/lib/api-client';

export const deleteAttachment = async (
  courseSlug: string,
  attachmentId: string,
) => {
  return await apiClient.delete(
    `/courses/${courseSlug}/attachments/${attachmentId}`,
  );
};
