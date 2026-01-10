// API Key
export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  scopes: string[];
  isActive: boolean;
  expiresAt: string | null;
  lastUsedAt: string | null;
  createdAt: string;
}

// Create API Key request
export interface CreateApiKeyRequest {
  name: string;
  scopes: string[];
}

// Create API Key response
export interface CreateApiKeyResponse {
  id: string;
  apiKey: string; // Full API key - only shown once
  name: string;
  scopes: string[];
  expiresAt: string | null;
  message: string;
}

// Gmail Sync History
export interface GmailSyncHistory {
  history: GmailSyncHistoryList[];
  lastSucessfullSync: string;
  totalSyncs: number;
}

export interface GmailSyncHistoryList {
  syncedAt: string;
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
