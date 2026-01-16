import apiClient from './api-client';
import type {
  EmailConnection,
  EmailProvider,
  GetAuthUrlResponse,
  ConnectProviderRequest,
  SyncEmailsRequest,
  SyncResult
} from '../types/email-connection';

export const emailConnectionApi = {
  /**
   * Get OAuth authorization URL for email provider
   */
  getAuthUrl: (provider: EmailProvider) =>
    apiClient.get<GetAuthUrlResponse>(`/email/${provider}/auth-url`),

  /**
   * Handle OAuth callback and connect email provider
   */
  connectProvider: (provider: EmailProvider, code: string) =>
    apiClient.post<EmailConnection>(`/email/${provider}/callback`, { code } as ConnectProviderRequest),

  /**
   * Trigger email sync for provider
   */
  syncEmails: (provider: EmailProvider, options?: SyncEmailsRequest) =>
    apiClient.post<SyncResult>(`/email/${provider}/sync`, options || {}),

  /**
   * Get all email connections for current user
   */
  getConnections: () =>
    apiClient.get<EmailConnection[]>('/email/connections'),

  /**
   * Disconnect email provider
   */
  disconnect: (provider: EmailProvider) =>
    apiClient.delete(`/email/connections/${provider}`)
};
