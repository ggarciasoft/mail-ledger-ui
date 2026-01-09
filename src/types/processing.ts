// Processing status
export interface ProcessingStatus {
  isClassifying: boolean;
  isExtracting: boolean;
  classificationProgress?: ProcessingProgress;
  extractionProgress?: ProcessingProgress;
}

// Processing progress
export interface ProcessingProgress {
  totalItems: number;
  processedItems: number;
  successCount: number;
  failureCount: number;
  startedAt: string;
  completedAt?: string;
}

// Trigger classification request
export interface TriggerClassificationRequest {
  batchSize?: number;
}

// Trigger extraction request
export interface TriggerExtractionRequest {
  batchSize?: number;
}
