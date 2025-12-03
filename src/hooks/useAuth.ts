import { useMutation, useQuery } from '@tanstack/react-query';
import { 
  authApi, 
  LoginPayload, 
  RegisterPayload, 
  ForgotPasswordPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  RequestOtpPayload, 
  VerifyOtpPayload 
} from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Email + Password Authentication Hooks
export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success('Login successful');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Invalid email or password';
      toast.error(message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration successful! Please check your email to verify your account.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useVerifyEmail = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (payload: VerifyEmailPayload) => authApi.verifyEmail(payload),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      toast.success('Email verified successfully!');
      navigate('/dashboard');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Email verification failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => authApi.forgotPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset link sent to your email.');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send reset link. Please try again.';
      toast.error(message);
    },
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => authApi.resetPassword(payload),
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset successfully!');
      navigate('/login');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Password reset failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (email: string) => authApi.resendVerification({ email }),
    onSuccess: (data) => {
      toast.success(data.message || 'Verification email sent!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to resend verification email.';
      toast.error(message);
    },
  });
};

// Legacy OTP Hooks (kept for backward compatibility)
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

// Common Hooks
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
