import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Feature, Status, Priority } from "@/types/product";
import { mockTags, statusConfig, priorityConfig } from "@/lib/mockData";

interface CreateFeatureDialogProps {
  onCreateFeature: (
    feature: Omit<Feature, "id" | "createdAt" | "updatedAt">,
  ) => void;
}

interface FormData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  tagIds: string[];
}

const CreateFeatureDialog = ({ onCreateFeature }: CreateFeatureDialogProps) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormData>({
    defaultValues: {
      status: "idea",
      priority: "medium",
      tagIds: [],
    },
  });

  const selectedTagIds = watch("tagIds") || [];

  const onSubmit = (data: FormData) => {
    const selectedTags = mockTags.filter((tag) => data.tagIds.includes(tag.id));

    onCreateFeature({
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      tags: selectedTags,
    });

    reset();
    setOpen(false);
  };

  const toggleTag = (tagId: string) => {
    const newTagIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId)
      : [...selectedTagIds, tagId];
    setValue("tagIds", newTagIds);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-6 py-2.5 rounded-xl font-semibold">
          <Icon name="Plus" size={18} className="mr-2" />✨ Добавить фичу
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md backdrop-blur-md bg-white/90 border border-white/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            🚀 Новая фича
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label
              htmlFor="title"
              className="text-sm font-semibold text-slate-700"
            >
              Название
            </Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Введите название фичи"
              className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50 focus:bg-white/80 transition-all duration-200"
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-slate-700"
            >
              Описание
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Опишите детали фичи"
              rows={3}
              className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50 focus:bg-white/80 transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-semibold text-slate-700">
                Статус
              </Label>
              <Select
                onValueChange={(value) => setValue("status", value as Status)}
              >
                <SelectTrigger className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50">
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-white/90">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700">
                Приоритет
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("priority", value as Priority)
                }
              >
                <SelectTrigger className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50">
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-md bg-white/90">
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold text-slate-700">Теги</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {mockTags.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant={
                    selectedTagIds.includes(tag.id) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => toggleTag(tag.id)}
                  className="text-xs h-8 px-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  style={
                    selectedTagIds.includes(tag.id)
                      ? {
                          background: `linear-gradient(135deg, ${tag.color}, ${tag.color}80)`,
                          borderColor: tag.color,
                          color: "white",
                        }
                      : {
                          borderColor: tag.color,
                          color: tag.color,
                          backgroundColor: `${tag.color}10`,
                        }
                  }
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="backdrop-blur-sm bg-white/60 border-white/50 hover:bg-white/80"
            >
              Отмена
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeatureDialog;
