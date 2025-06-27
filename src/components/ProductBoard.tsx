import { useState } from "react";
import { Feature, Status, KanbanColumn } from "@/types/product";
import { mockFeatures, statusConfig } from "@/lib/mockData";
import KanbanColumn from "./KanbanColumn";
import CreateFeatureDialog from "./CreateFeatureDialog";

const ProductBoard = () => {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  const columns: KanbanColumn[] = Object.entries(statusConfig).map(
    ([status, config]) => ({
      id: status as Status,
      title: config.title,
      features: features.filter((feature) => feature.status === status),
    }),
  );

  const handleCreateFeature = (
    newFeatureData: Omit<Feature, "id" | "createdAt" | "updatedAt">,
  ) => {
    const newFeature: Feature = {
      ...newFeatureData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setFeatures((prev) => [...prev, newFeature]);
  };

  const handleDeleteFeature = (featureId: string) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== featureId));
  };

  const totalFeatures = features.length;
  const completedFeatures = features.filter(
    (f) => f.status === "production",
  ).length;
  const inProgressFeatures = features.filter((f) =>
    ["development", "testing"].includes(f.status),
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Управление продуктом
              </h1>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <span>
                  Всего фич: <strong>{totalFeatures}</strong>
                </span>
                <span>
                  В работе: <strong>{inProgressFeatures}</strong>
                </span>
                <span>
                  Завершено: <strong>{completedFeatures}</strong>
                </span>
              </div>
            </div>
            <CreateFeatureDialog onCreateFeature={handleCreateFeature} />
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-6 overflow-x-auto pb-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDeleteFeature={handleDeleteFeature}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductBoard;
