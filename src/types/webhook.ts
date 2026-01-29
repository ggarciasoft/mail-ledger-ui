export const WebhookEventType = {
    CandidateConfirmed: 'CandidateConfirmed',
    CandidateBulkConfirmed: 'CandidateBulkConfirmed',
} as const;

export type WebhookEventType = typeof WebhookEventType[keyof typeof WebhookEventType];

export const WebhookDeliveryStatus = {
    Pending: 'Pending',
    Success: 'Success',
    Failed: 'Failed',
} as const;

export type WebhookDeliveryStatus = typeof WebhookDeliveryStatus[keyof typeof WebhookDeliveryStatus];

export interface WebhookEndpoint {
    id: string;
    url: string;
    events: string[];
    isActive: boolean;
    createdAt: string;
    lastTriggeredAt: string | null;
    secretKey?: string; // Only present on creation
}

export interface WebhookDelivery {
    id: string;
    webhookEndpointId: string;
    eventType: string;
    status: string;
    attemptCount: number;
    lastAttemptAt: string | null;
    responseStatusCode: number | null;
    errorMessage: string | null;
    createdAt: string;
}

export interface CreateWebhookEndpointRequest {
    url: string;
    events: string[];
}

export interface UpdateWebhookEndpointRequest {
    url: string;
    events: string[];
}

export interface GetWebhookDeliveriesResponse {
    deliveries: WebhookDelivery[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export interface WebhookDeliveryFilters {
    status?: WebhookDeliveryStatus;
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
}
