import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../lib/auth-api';
import { useAuthStore } from '../store/auth-store';

export const useAutoLogin = () => {
  const { isAuthenticated, setUser } = useAuthStore();

  const { data, error } = useQuery({
    queryKey: ['currentUser'],
    queryFn: authApi.getCurrentUser,
    enabled: isAuthenticated,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // Note: We don't handle errors here because the axios interceptor
  // already handles 401 errors by clearing tokens and redirecting to login

  return { user: data, isLoading: isAuthenticated && !data && !error };
};
