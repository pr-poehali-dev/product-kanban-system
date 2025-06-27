export interface Feature {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  // Детальная документация
  problem?: string;
  goal?: string;
  targetUser?: string;
  acceptanceCriteria?: string[];
  successMetrics?: string[];
  attachments?: Attachment[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  icon?: string;
  features: Feature[];
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt: Date;
}

export interface ActivityLog {
  id: string;
  featureId: string;
  action: string;
  author: string;
  timestamp: Date;
  details?: string;
}

export type Status =
  | "idea"
  | "analysis"
  | "development"
  | "testing"
  | "production";

export type Priority = "low" | "medium" | "high" | "critical";

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface KanbanColumnType {
  id: Status;
  title: string;
  features: Feature[];
}
