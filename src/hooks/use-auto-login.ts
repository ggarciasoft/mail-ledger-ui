import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../lib/auth-api';
import { useAuthStore } from '../store/auth-store';

export const useAutoLogin = () => {
  const { isAuthenticated, setUser, logout } = useAuthStore();

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

  useEffect(() => {
    if (error) {
      // If fetching user fails, logout
      logout();
    }
  }, [error, logout]);

  return { user: data, isLoading: isAuthenticated && !data && !error };
};
