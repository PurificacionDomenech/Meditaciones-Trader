import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Brain, Target, Scale, TrendingUp, Eye, Sparkles, Clock, Pencil, Trash2 } from "lucide-react";
import { meditacionesPredefinidas, categorias } from "@/lib/meditationData";
import type { Meditacion, MeditacionPersonalizada } from "@shared/schema";

interface MeditationListProps {
  selectedId: string | null;
  onSelect: (meditation: Meditacion) => void;
  customMeditations: MeditacionPersonalizada[];
  onEditCustom?: (meditation: MeditacionPersonalizada) => void;
  onDeleteCustom?: (id: string) => void;
}

const iconMap: Record<string, typeof Brain> = {
  Brain,
  Target,
  Scale,
  TrendingUp,
  Eye,
  Sparkles,
};

export function MeditationList({
  selectedId,
  onSelect,
  customMeditations,
  onEditCustom,
  onDeleteCustom,
}: MeditationListProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(["estres"]);

  const getMeditationsByCategory = (categoryId: string) => {
    return meditacionesPredefinidas.filter(m => m.categoriaId === categoryId);
  };

  return (
    <div className="space-y-4">
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="font-serif text-base uppercase tracking-wider gold-text">
            Meditaciones Predefinidas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <div className="px-4 pb-4">
              <Accordion
                type="multiple"
                value={openCategories}
                onValueChange={setOpenCategories}
                className="space-y-1"
              >
                {categorias.map((cat) => {
                  const Icon = iconMap[cat.icon] || Brain;
                  const meditations = getMeditationsByCategory(cat.id);
                  
                  return (
                    <AccordionItem
                      key={cat.id}
                      value={cat.id}
                      className="border-white/5 overflow-hidden rounded-md"
                    >
                      <AccordionTrigger className="text-xs hover:no-underline py-2 px-2 rounded-md hover:bg-white/5">
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5 text-amber-400" />
                          <span className="text-left">{cat.nombre}</span>
                          <Badge variant="secondary" className="ml-auto mr-2 text-[10px]">
                            {meditations.length}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-2">
                        <div className="space-y-1">
                          {meditations.map((med) => (
                            <button
                              key={med.id}
                              onClick={() => onSelect(med)}
                              data-testid={`button-meditation-${med.id}`}
                              className={`w-full text-left p-3 rounded-md transition-all duration-200 ${
                                selectedId === med.id
                                  ? "bg-amber-500/20 border border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                                  : "bg-white/5 hover:bg-white/10 border border-transparent"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm font-medium">{med.titulo}</h4>
                                <div className="flex items-center gap-1 text-amber-400/80 flex-shrink-0">
                                  <Clock className="h-3 w-3" />
                                  <span className="text-[10px] gold-text">{med.duracion}</span>
                                </div>
                              </div>
                              <p className="text-[11px] text-muted-foreground line-clamp-2">
                                {med.descripcion}
                              </p>
                            </button>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {customMeditations.length > 0 && (
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="font-serif text-base uppercase tracking-wider gold-text">
              Mis Meditaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="max-h-[200px]">
              <div className="px-4 pb-4 space-y-2">
                {customMeditations.map((med) => (
                  <div
                    key={med.id}
                    className={`p-3 rounded-md transition-all duration-200 ${
                      selectedId === med.id
                        ? "bg-amber-500/20 border border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onSelect(med)}
                        className="flex-1 text-left"
                        data-testid={`button-custom-meditation-${med.id}`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="text-sm font-medium">{med.titulo}</h4>
                          <div className="flex items-center gap-1 text-amber-400/80">
                            <Clock className="h-3 w-3" />
                            <span className="text-[10px] gold-text">{med.duracion}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-2">
                          {med.descripcion}
                        </p>
                      </button>
                      <div className="flex gap-1 flex-shrink-0">
                        {onEditCustom && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onEditCustom(med)}
                            className="h-7 w-7"
                            data-testid={`button-edit-meditation-${med.id}`}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        )}
                        {onDeleteCustom && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onDeleteCustom(med.id)}
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            data-testid={`button-delete-meditation-${med.id}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
