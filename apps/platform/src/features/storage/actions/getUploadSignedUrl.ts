import apiClient from '@/lib/api-client';

export const getUploadSignedUrl = async (data: {
  directory: string;
  fileType: string;
}) => {
  return await apiClient.post<{ url: string; key: string }>(
    '/storage/upload',
    data,
  );
};
