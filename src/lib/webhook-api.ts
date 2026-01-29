import apiClient from './api-client';
import type {
    WebhookEndpoint,
    CreateWebhookEndpointRequest,
    UpdateWebhookEndpointRequest,
    GetWebhookDeliveriesResponse,
    WebhookDeliveryFilters,
} from '../types/webhook';

const BASE_URL = '/webhooks';

export const getWebhookEndpoints = async (): Promise<WebhookEndpoint[]> => {
    const response = await apiClient.get<WebhookEndpoint[]>(BASE_URL);
    return response.data;
};

export const createWebhookEndpoint = async (
    request: CreateWebhookEndpointRequest
): Promise<WebhookEndpoint> => {
    const response = await apiClient.post<WebhookEndpoint>(BASE_URL, request);
    return response.data;
};

export const updateWebhookEndpoint = async (
    id: string,
    request: UpdateWebhookEndpointRequest
): Promise<void> => {
    await apiClient.put(`${BASE_URL}/${id}`, request);
};

export const deleteWebhookEndpoint = async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
};

export const toggleWebhookEndpoint = async (
    id: string,
    isActive: boolean
): Promise<void> => {
    await apiClient.patch(`${BASE_URL}/${id}/toggle`, isActive, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getWebhookDeliveries = async (
    endpointId: string,
    filters?: WebhookDeliveryFilters
): Promise<GetWebhookDeliveriesResponse> => {
    const params = new URLSearchParams();

    if (filters?.status) params.append('status', filters.status);
    if (filters?.fromDate) params.append('fromDate', filters.fromDate);
    if (filters?.toDate) params.append('toDate', filters.toDate);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.pageSize) params.append('pageSize', filters.pageSize.toString());

    const response = await apiClient.get<GetWebhookDeliveriesResponse>(
        `${BASE_URL}/${endpointId}/deliveries?${params.toString()}`
    );
    return response.data;
};
