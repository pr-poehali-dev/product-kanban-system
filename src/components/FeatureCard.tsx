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
    <div className="backdrop-blur-sm bg-white/40 rounded-xl border border-white/50 shadow-lg hover:shadow-xl hover:bg-white/50 transition-all duration-300 cursor-pointer group hover:scale-[1.02] hover:-translate-y-1">
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-slate-800 leading-tight flex-1 pr-2">
            {feature.title}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-white/60 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(feature);
              }}
            >
              <Icon name="Edit2" size={14} className="text-indigo-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-red-50 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(feature.id);
              }}
            >
              <Icon name="Trash2" size={14} className="text-red-500" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {feature.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {feature.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm border border-white/30"
                style={{
                  background: `linear-gradient(135deg, ${tag.color}20, ${tag.color}10)`,
                  color: tag.color,
                  borderColor: `${tag.color}30`,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div
            className="w-3 h-3 rounded-full shadow-lg ring-2 ring-white/50"
            style={{
              background: `linear-gradient(135deg, ${priorityColor}, ${priorityColor}80)`,
            }}
            title={priorityConfig[feature.priority].title}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
