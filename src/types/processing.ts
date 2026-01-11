// Processing status response
export interface ProcessingStatus {
  pendingClassification: number;
  pendingExtraction: number;
  canClassify: boolean;
  canExtract: boolean;
  lastClassificationJob: JobStatus | null;
  lastExtractionJob: JobStatus | null;
}

// Processing job info
export interface JobStatus {
  startedAt: string;
  completedAt?: string;
  processed: number;
  succeeded: number;
  failed: number;
}

// Trigger classification/extraction response
export interface TriggerResponse {
  success: boolean;
  message: string;
  processedCount: number;
  succeededCount: number;
  failedCount: number;
}

// Trigger classification request
export interface TriggerClassificationRequest {
  batchSize?: number;
}

// Trigger extraction request
export interface TriggerExtractionRequest {
  batchSize?: number;
}
