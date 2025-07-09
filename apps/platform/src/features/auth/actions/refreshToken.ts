import apiClient from '@/lib/api-client';

export const refreshToken = async (oldRefreshToken: string) => {
  return await apiClient.post<{
    access_token: string;
    refresh_token: string;
  }>('/auth/refresh-token', undefined, {
    Authorization: `Bearer ${oldRefreshToken}`,
  });
};
