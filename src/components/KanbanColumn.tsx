import { KanbanColumnType } from "@/types/product";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FeatureCard from "./FeatureCard";
import { statusConfig } from "@/lib/mockData";

interface KanbanColumnProps {
  column: KanbanColumnType;
  onEditFeature?: (feature: any) => void;
  onDeleteFeature?: (featureId: string) => void;
}

const KanbanColumn = ({
  column,
  onEditFeature,
  onDeleteFeature,
}: KanbanColumnProps) => {
  const statusColor = statusConfig[column.id].color;

  return (
    <div className="flex-1 min-w-80">
      <div className="backdrop-blur-md bg-white/30 rounded-2xl border border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-300 h-full">
        <div className="p-5 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-slate-800">{column.title}</h2>
            <div
              className="px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${statusColor}20, ${statusColor}10)`,
                color: statusColor,
                borderColor: `${statusColor}30`,
              }}
            >
              {column.features.length}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {column.features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onEdit={onEditFeature}
                onDelete={onDeleteFeature}
              />
            ))}
            {column.features.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-2xl">💭</span>
                </div>
                <p className="text-slate-500 font-medium">Пока пусто</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
