import { apiClient } from './client';

export const authApi = {
  async signUp(userData: { username: string; password: string }) {
    return apiClient.post('/user/auth/sign-up', userData);
  },

  async signIn(credentials: { username: string; password: string }) {
    return apiClient.post('/user/auth/sign-in', credentials);
  },
};