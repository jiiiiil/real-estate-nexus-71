import apiClient from './client';
import { User } from '@/store/authStore';

export interface RequestOtpPayload {
  phoneNumber: string;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export const authApi = {
  requestOtp: async (payload: RequestOtpPayload) => {
    const response = await apiClient.post('/auth/otp/request', payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/otp/verify', payload);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
