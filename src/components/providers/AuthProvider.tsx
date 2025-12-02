import { useEffect } from 'react';
import { useMe } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { data, refetch } = useMe();

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    if (data) {
      updateUser(data);
    }
  }, [data, updateUser]);

  return <>{children}</>;
};
