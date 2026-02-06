import type { CreateCheckoutSessionRequest, CreateCheckoutSessionResponse } from '../types/subscription';
import { apiClient } from './api-client';

/**
 * Create a Stripe Checkout session for subscription payment.
 */
export async function createCheckoutSession(
    request: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> {
    const response = await apiClient.post<CreateCheckoutSessionResponse>(
        '/subscriptions/checkout',
        request
    );
    return response.data;
}
