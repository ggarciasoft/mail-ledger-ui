import { apiClient } from './api-client';
import type { NotificationPreferences } from '../types/notification-preferences';

export const notificationPreferencesApi = {
  getPreferences: async (): Promise<NotificationPreferences> => {
    const response = await apiClient.get<NotificationPreferences>(
      '/users/me/notification-preferences'
    );
    return response.data;
  },

  updatePreferences: async (
    preferences: NotificationPreferences
  ): Promise<NotificationPreferences> => {
    const response = await apiClient.put<NotificationPreferences>(
      '/users/me/notification-preferences',
      preferences
    );
    return response.data;
  },
};
