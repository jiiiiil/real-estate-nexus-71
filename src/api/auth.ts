import apiClient from './client';
import { User } from '@/store/authStore';

// Email verification auth payloads
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export interface VerifyEmailPayload {
  token: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
  message?: string;
}

export interface MessageResponse {
  message: string;
}

// Legacy OTP payloads (kept for backward compatibility)
export interface RequestOtpPayload {
  phoneNumber: string;
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  otp: string;
}

export const authApi = {
  // Email + Password Authentication
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/register', payload);
    return response.data;
  },

  verifyEmail: async (payload: VerifyEmailPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/verify-email', payload);
    return response.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/forgot-password', payload);
    return response.data;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/reset-password', payload);
    return response.data;
  },

  resendVerification: async (payload: { email: string }): Promise<MessageResponse> => {
    const response = await apiClient.post<MessageResponse>('/auth/resend-verification', payload);
    return response.data;
  },

  // Legacy OTP methods (kept for backward compatibility)
  requestOtp: async (payload: RequestOtpPayload) => {
    const response = await apiClient.post('/auth/otp/request', payload);
    return response.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/otp/verify', payload);
    return response.data;
  },

  // Common methods
  getMe: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
