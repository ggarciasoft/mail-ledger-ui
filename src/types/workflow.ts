export enum WorkflowMode {
  Manual = 0,
  Separate = 1,
  Sequential = 2,
}

export interface WorkflowConfiguration {
  mode: WorkflowMode;
  emailSyncSchedule: string | null;
  classificationSchedule: string | null;
  extractionSchedule: string | null;
  pipelineSchedule: string | null;
  emailSyncBatchSize: number;
  classificationBatchSize: number;
  extractionBatchSize: number;
}

export interface UpdateWorkflowConfigRequest {
  mode: WorkflowMode;
  emailSyncSchedule?: string | null;
  classificationSchedule?: string | null;
  extractionSchedule?: string | null;
  pipelineSchedule?: string | null;
  emailSyncBatchSize: number;
  classificationBatchSize: number;
  extractionBatchSize: number;
}
