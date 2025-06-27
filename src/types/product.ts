export interface Feature {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  createdAt: Date;
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
