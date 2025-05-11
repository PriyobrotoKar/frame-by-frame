import apiClient from '@/lib/api-client';

export const logout = async () => apiClient.post('/auth/logout');
