import apiClient from '@/lib/api-client';

export const initializeMultiPartUpload = async (data: {
  contentType: string;
  key: string;
}): Promise<{ UploadId: string; Key: string }> => {
  return await apiClient.post(`/storage/initialize-multipart-upload`, data);
};

export interface GetMultipartSignedUrlsResponse {
  url: string;
  partNumber: number;
}

export const getMultipartSignedUrls = async (data: {
  fileKey: string;
  uploadId: string;
  parts: number;
}): Promise<{ url: string; partNumber: number }[]> => {
  return await apiClient.post(`/storage/get-multipart-signed-urls`, data);
};

export const completeMultipartUpload = async (data: {
  fileKey: string;
  uploadId: string;
  parts: { PartNumber: number; ETag: string }[];
}): Promise<{ url: string; key: string }> => {
  return await apiClient.post(`/storage/complete-multipart-upload`, data);
};
