import { apiClient } from './api-client';

export interface OAuthUrlResponse {
    url: string;
    state: string;
}

export interface OAuthCallbackRequest {
    code: string;
}

export interface LoginResponse {
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

/**
 * Get Google OAuth authorization URL
 */
export async function getGoogleAuthUrl(): Promise<OAuthUrlResponse> {
    const response = await apiClient.get<OAuthUrlResponse>('/auth/google/url');
    return response.data;
}

/**
 * Handle Google OAuth callback
 */
export async function handleGoogleCallback(code: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/google/callback', {
        code,
    });
    return response.data;
}

/**
 * Get Microsoft OAuth authorization URL
 */
export async function getMicrosoftAuthUrl(): Promise<OAuthUrlResponse> {
    const response = await apiClient.get<OAuthUrlResponse>('/auth/microsoft/url');
    return response.data;
}

/**
 * Handle Microsoft OAuth callback
 */
export async function handleMicrosoftCallback(code: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/microsoft/callback', {
        code,
    });
    return response.data;
}
