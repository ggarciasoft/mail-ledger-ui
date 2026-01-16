export const EmailProvider = {
  Gmail: 'Gmail',
  Outlook: 'Outlook'
} as const;

export type EmailProvider = typeof EmailProvider[keyof typeof EmailProvider];

export interface EmailConnection {
  provider: EmailProvider;
  email: string;
  isConnected: boolean;
  lastSyncedAt?: string;
  connectedAt: string;
}

export interface GetAuthUrlResponse {
  authorizationUrl: string;
  state: string;
}

export interface ConnectProviderRequest {
  code: string;
}

export interface SyncEmailsRequest {
  syncFrom?: string;
  maxResults?: number;
}

export interface SyncResult {
  emailsSynced: number;
  emailsSkipped: number;
  errors: string[];
}
