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
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { Product } from "@/types/product";

interface CreateProductDialogProps {
  onCreateProduct: (product: Product) => void;
}

interface FormData {
  name: string;
  description: string;
  icon: string;
}

const CreateProductDialog = ({ onCreateProduct }: CreateProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      icon: "📦",
    },
  });

  const onSubmit = (data: FormData) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      icon: data.icon,
      features: [],
      createdAt: new Date(),
    };

    onCreateProduct(newProduct);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-6 py-2.5 rounded-xl font-semibold">
          <Icon name="Plus" size={18} className="mr-2" />
          Добавить продукт
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md backdrop-blur-md bg-white/90 border border-white/50 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Новый продукт
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-slate-700"
            >
              Название
            </Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              placeholder="Введите название продукта"
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
              placeholder="Опишите ваш продукт"
              rows={3}
              className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50 focus:bg-white/80 transition-all duration-200"
            />
          </div>

          <div>
            <Label
              htmlFor="icon"
              className="text-sm font-semibold text-slate-700"
            >
              Иконка (emoji)
            </Label>
            <Input
              id="icon"
              {...register("icon")}
              placeholder="📦"
              className="mt-1.5 backdrop-blur-sm bg-white/60 border-white/50 focus:bg-white/80 transition-all duration-200"
            />
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

export default CreateProductDialog;
