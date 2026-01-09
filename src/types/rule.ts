// Rule entity
export interface Rule {
  id: string;
  name: string;
  senderPattern: string | null;
  subjectPattern: string | null;
  keywordPattern: string | null;
  labelPattern: string | null;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Create rule request
export interface CreateRuleRequest {
  name: string;
  senderPattern?: string;
  subjectPattern?: string;
  keywordPattern?: string;
  labelPattern?: string;
  priority?: number;
}

// Update rule request
export interface UpdateRuleRequest {
  name?: string;
  senderPattern?: string;
  subjectPattern?: string;
  keywordPattern?: string;
  labelPattern?: string;
  priority?: number;
}
