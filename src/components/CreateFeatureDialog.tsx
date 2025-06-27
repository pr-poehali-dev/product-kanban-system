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
        <Button className="bg-violet-600 hover:bg-violet-700">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить фичу
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Новая фича</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              {...register("title", { required: true })}
              placeholder="Введите название фичи"
            />
          </div>

          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Опишите детали фичи"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Статус</Label>
              <Select
                onValueChange={(value) => setValue("status", value as Status)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Приоритет</Label>
              <Select
                onValueChange={(value) =>
                  setValue("priority", value as Priority)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
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
            <Label>Теги</Label>
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
                  className="text-xs h-7"
                  style={
                    selectedTagIds.includes(tag.id)
                      ? { backgroundColor: tag.color, borderColor: tag.color }
                      : { borderColor: tag.color, color: tag.color }
                  }
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFeatureDialog;
