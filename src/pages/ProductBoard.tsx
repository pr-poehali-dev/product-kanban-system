import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Feature, Status, KanbanColumnType } from "@/types/product";
import { mockFeatures, statusConfig, mockProducts } from "@/lib/mockData";
import KanbanColumn from "@/components/KanbanColumn";
import CreateFeatureDialog from "@/components/CreateFeatureDialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ProductBoard = () => {
  const { productId } = useParams<{ productId: string }>();
  const [features, setFeatures] = useState<Feature[]>(mockFeatures);

  const product = mockProducts.find((p) => p.id === productId);
  const productFeatures = features.filter((f) =>
    product?.features.some((pf) => pf.id === f.id),
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-700 mb-4">
            Продукт не найден
          </h1>
          <Link to="/">
            <Button>Вернуться к списку продуктов</Button>
          </Link>
        </div>
      </div>
    );
  }

  const columns: KanbanColumnType[] = Object.entries(statusConfig).map(
    ([status, config]) => ({
      id: status as Status,
      title: config.title,
      features: productFeatures.filter((feature) => feature.status === status),
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

  const totalFeatures = productFeatures.length;
  const completedFeatures = productFeatures.filter(
    (f) => f.status === "production",
  ).length;
  const inProgressFeatures = productFeatures.filter((f) =>
    ["development", "testing"].includes(f.status),
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-violet-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Link to="/">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Icon name="ArrowLeft" size={20} />
                    </Button>
                  </Link>
                  <span className="text-2xl">{product.icon}</span>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {product.name}
                  </h1>
                </div>
                <p className="text-slate-600 mb-4">{product.description}</p>
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                    <span className="text-slate-700 font-medium">
                      Всего фич:{" "}
                      <span className="text-indigo-600 font-bold">
                        {totalFeatures}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse"></div>
                    <span className="text-slate-700 font-medium">
                      В работе:{" "}
                      <span className="text-orange-600 font-bold">
                        {inProgressFeatures}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                    <span className="text-slate-700 font-medium">
                      Завершено:{" "}
                      <span className="text-green-600 font-bold">
                        {completedFeatures}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <CreateFeatureDialog onCreateFeature={handleCreateFeature} />
            </div>
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
