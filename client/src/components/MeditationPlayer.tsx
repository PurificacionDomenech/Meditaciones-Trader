import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, Pause, Square, Clock, Sparkles } from "lucide-react";
import type { Meditacion } from "@shared/schema";

interface MeditationPlayerProps {
  meditation: Meditacion | null;
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export function MeditationPlayer({
  meditation,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
}: MeditationPlayerProps) {
  if (!meditation) {
    return (
      <Card className="glass-card h-full">
        <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
          <Sparkles className="h-12 w-12 text-amber-400/50 mb-4" />
          <h3 className="font-serif text-lg uppercase tracking-wider text-muted-foreground mb-2">
            Selecciona una Meditación
          </h3>
          <p className="text-sm text-muted-foreground/70 max-w-[280px]">
            Elige una meditación de la lista para comenzar tu práctica
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card transition-all duration-300 ${
      isPlaying ? "shadow-[0_0_30px_rgba(251,191,36,0.25)] border-amber-500/30" : ""
    }`}>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h2 className="font-serif text-xl uppercase tracking-wider gold-text truncate">
              {meditation.titulo}
            </h2>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {meditation.categoria}
              </Badge>
              <div className="flex items-center gap-1 text-amber-400">
                <Clock className="h-3 w-3" />
                <span className="text-xs gold-text">{meditation.duracion}</span>
              </div>
            </div>
          </div>
          {isPlaying && (
            <div className="flex items-center gap-1">
              <div className="w-1 h-4 bg-amber-400 rounded-full animate-pulse" />
              <div className="w-1 h-6 bg-amber-500 rounded-full animate-pulse delay-75" />
              <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse delay-150" />
              <div className="w-1 h-5 bg-amber-500 rounded-full animate-pulse delay-100" />
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground">{meditation.descripcion}</p>

        <div className="flex gap-3">
          {!isPlaying ? (
            <Button
              onClick={onPlay}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              data-testid="button-play"
            >
              <Play className="h-4 w-4 mr-2" />
              Iniciar Meditación
            </Button>
          ) : isPaused ? (
            <Button
              onClick={onPlay}
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900"
              data-testid="button-resume"
            >
              <Play className="h-4 w-4 mr-2" />
              Reanudar
            </Button>
          ) : (
            <Button
              onClick={onPause}
              variant="secondary"
              className="flex-1"
              data-testid="button-pause"
            >
              <Pause className="h-4 w-4 mr-2" />
              Pausar
            </Button>
          )}
          <Button
            onClick={onStop}
            variant="outline"
            size="icon"
            disabled={!isPlaying && !isPaused}
            data-testid="button-stop"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>

        <div className="border-t border-white/10 pt-4">
          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Vista previa del texto
          </h4>
          <ScrollArea className="h-32 rounded-md bg-background/30 p-3">
            <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {meditation.texto.slice(0, 500)}
              {meditation.texto.length > 500 && "..."}
            </p>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
