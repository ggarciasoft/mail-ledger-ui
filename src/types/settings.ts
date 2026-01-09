// API Key
export interface ApiKey {
  id: string;
  name: string;
  keyPrefix: string;
  createdAt: string;
  lastUsedAt?: string;
  expiresAt?: string;
}

// Create API Key request
export interface CreateApiKeyRequest {
  name: string;
}

// Create API Key response
export interface CreateApiKeyResponse {
  apiKey: ApiKey;
  fullKey: string; // Only returned once
}

// Gmail Sync History
export interface GmailSyncHistory {
  id: string;
  startedAt: string;
  completedAt?: string;
  emailsProcessed: number;
  status: 'InProgress' | 'Completed' | 'Failed';
  errorMessage?: string;
}

// Gmail Connection Status
export interface GmailConnectionStatus {
  isConnected: boolean;
  email?: string;
  lastSyncAt?: string;
}
