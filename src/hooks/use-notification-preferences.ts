import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationPreferencesApi } from '../lib/notification-preferences-api';
import type { NotificationPreferences } from '../types/notification-preferences';

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: notificationPreferencesApi.getPreferences,
  });
}

export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (preferences: NotificationPreferences) =>
      notificationPreferencesApi.updatePreferences(preferences),
    onSuccess: (data) => {
      queryClient.setQueryData(['notification-preferences'], data);
    },
  });
}
