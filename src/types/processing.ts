// Processing status response
export interface ProcessingStatus {
  pendingClassification: number;
  pendingExtraction: number;
  canClassify: boolean;
  canExtract: boolean;
  lastClassificationJob: ProcessingJobInfo | null;
  lastExtractionJob: ProcessingJobInfo | null;
}

// Processing job info
export interface ProcessingJobInfo {
  startedAt: string;
  completedAt?: string | null;
  processedCount: number;
  succeededCount: number;
  failedCount: number;
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
