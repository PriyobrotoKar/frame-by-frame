import apiClient from '@/lib/api-client';
import { SessionUser } from '@/lib/session';

export const updateUser = async (dto: { name?: string }) => {
  return await apiClient.patch<SessionUser>('/user', dto);
};
