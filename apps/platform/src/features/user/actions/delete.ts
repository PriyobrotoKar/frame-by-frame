import apiClient from '@/lib/api-client';

export const deleteSelf = async () => apiClient.delete('/user');
