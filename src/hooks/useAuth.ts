import { useMutation, useQuery } from '@tanstack/react-query';
import { authApi, RequestOtpPayload, VerifyOtpPayload } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: (payload: RequestOtpPayload) => authApi.requestOtp(payload),
    onSuccess: () => {
      toast.success('OTP sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    },
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Invalid OTP');
    },
  });
};

export const useMe = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ['me'],
    queryFn: authApi.getMe,
    enabled: isAuthenticated,
    retry: false,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logout();
      navigate('/login');
      toast.success('Logged out successfully');
    },
    onError: () => {
      logout();
      navigate('/login');
    },
  });
};
