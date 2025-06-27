import { KanbanColumn as KanbanColumnType } from "@/types/product";
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
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base">{column.title}</h2>
            <Badge
              variant="secondary"
              className="px-2 py-1 text-xs"
              style={{
                backgroundColor: `${statusColor}20`,
                color: statusColor,
              }}
            >
              {column.features.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-0">
            {column.features.map((feature) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                onEdit={onEditFeature}
                onDelete={onDeleteFeature}
              />
            ))}
            {column.features.length === 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">
                Пока пусто
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KanbanColumn;
