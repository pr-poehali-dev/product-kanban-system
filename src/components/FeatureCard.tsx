import { Feature } from "@/types/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { priorityConfig } from "@/lib/mockData";

interface FeatureCardProps {
  feature: Feature;
  onEdit?: (feature: Feature) => void;
  onDelete?: (featureId: string) => void;
}

const FeatureCard = ({ feature, onEdit, onDelete }: FeatureCardProps) => {
  const priorityColor = priorityConfig[feature.priority].color;

  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-sm leading-tight">{feature.title}</h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(feature);
              }}
            >
              <Icon name="Edit2" size={12} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(feature.id);
              }}
            >
              <Icon name="Trash2" size={12} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {feature.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {feature.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-xs px-2 py-0 h-5"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>

          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: priorityColor }}
            title={priorityConfig[feature.priority].title}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
