import { Feature, Product, Tag, Status, Priority } from "@/types/product";

export const mockTags: Tag[] = [
  { id: "1", name: "Frontend", color: "#8B5CF6" },
  { id: "2", name: "Backend", color: "#F97316" },
  { id: "3", name: "UX", color: "#0EA5E9" },
  { id: "4", name: "Bug", color: "#EF4444" },
  { id: "5", name: "Enhancement", color: "#10B981" },
];

export const mockFeatures: Feature[] = [
  {
    id: "1",
    title: "Авторизация пользователей",
    description: "Реализовать систему входа через email и пароль",
    status: "development",
    priority: "high",
    tags: [mockTags[1], mockTags[0]],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "Дашборд аналитики",
    description: "Создать панель с основными метриками продукта",
    status: "idea",
    priority: "medium",
    tags: [mockTags[0], mockTags[2]],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "3",
    title: "Мобильная адаптация",
    description: "Оптимизировать интерфейс для мобильных устройств",
    status: "analysis",
    priority: "high",
    tags: [mockTags[0], mockTags[2]],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "4",
    title: "API документация",
    description: "Написать подробную документацию для API",
    status: "testing",
    priority: "low",
    tags: [mockTags[1]],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22"),
  },
  {
    id: "5",
    title: "Система уведомлений",
    description: "Реализовать push-уведомления для пользователей",
    status: "production",
    priority: "medium",
    tags: [mockTags[1], mockTags[0]],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-25"),
  },
];

export const mockProduct: Product = {
  id: "1",
  name: "Главный продукт",
  description: "Основной продукт компании",
  features: mockFeatures,
  createdAt: new Date("2024-01-01"),
};

export const statusConfig = {
  idea: { title: "Идея", color: "#6B7280" },
  analysis: { title: "Анализ", color: "#F59E0B" },
  development: { title: "В разработке", color: "#8B5CF6" },
  testing: { title: "В тесте", color: "#0EA5E9" },
  production: { title: "В проде", color: "#10B981" },
};

export const priorityConfig = {
  low: { title: "Низкий", color: "#6B7280" },
  medium: { title: "Средний", color: "#F59E0B" },
  high: { title: "Высокий", color: "#EF4444" },
  critical: { title: "Критичный", color: "#DC2626" },
};
