import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { insertMeditacionSchema } from "@shared/schema";
import type { MeditacionPersonalizada, InsertMeditacion } from "@shared/schema";

interface CreateMeditationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertMeditacion) => void;
  editingMeditation?: MeditacionPersonalizada | null;
}

export function CreateMeditationDialog({
  open,
  onOpenChange,
  onSubmit,
  editingMeditation,
}: CreateMeditationDialogProps) {
  const form = useForm<InsertMeditacion>({
    resolver: zodResolver(insertMeditacionSchema),
    defaultValues: {
      titulo: "",
      descripcion: "",
      duracion: "",
      texto: "",
      categoria: "Personalizada",
      categoriaId: "custom",
    },
  });

  useEffect(() => {
    if (editingMeditation) {
      form.reset({
        titulo: editingMeditation.titulo,
        descripcion: editingMeditation.descripcion,
        duracion: editingMeditation.duracion,
        texto: editingMeditation.texto,
        categoria: editingMeditation.categoria,
        categoriaId: editingMeditation.categoriaId,
      });
    } else if (open) {
      form.reset({
        titulo: "",
        descripcion: "",
        duracion: "",
        texto: "",
        categoria: "Personalizada",
        categoriaId: "custom",
      });
    }
  }, [editingMeditation, form, open]);

  const handleSubmit = (data: InsertMeditacion) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] glass-card border-white/20">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl uppercase tracking-wider gold-text">
            {editingMeditation ? "Editar Meditación" : "Crear Nueva Meditación"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Meditación matutina para trading"
                      {...field}
                      data-testid="input-meditation-title"
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Breve descripción de la meditación..."
                      {...field}
                      rows={2}
                      data-testid="input-meditation-description"
                      className="bg-background/50 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duracion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">Duración estimada</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 5-10 min"
                      {...field}
                      data-testid="input-meditation-duration"
                      className="bg-background/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="texto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-muted-foreground">
                    Texto de la meditación
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe aquí el texto completo de tu meditación guiada..."
                      {...field}
                      rows={8}
                      data-testid="input-meditation-text"
                      className="bg-background/50 resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel-meditation"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                data-testid="button-submit-meditation"
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              >
                {editingMeditation ? "Guardar Cambios" : "Crear Meditación"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
