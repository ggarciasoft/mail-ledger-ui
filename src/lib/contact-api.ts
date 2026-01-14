import { apiClient } from './api-client';
import type { ContactFormData, SubmitContactMessageResponse } from '../types/contact';

export async function submitContactMessage(data: ContactFormData): Promise<SubmitContactMessageResponse> {
    const response = await apiClient.post<SubmitContactMessageResponse>('/contact', data);
    return response.data;
}
