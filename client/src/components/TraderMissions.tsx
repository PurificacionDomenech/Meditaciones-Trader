import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Trophy, Target, ShieldAlert, Star, ArrowLeft, Calendar, Lightbulb, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRADER_MISSIONS, getMissionByDay, getTotalMissions } from "@/lib/traderMissions";

interface MissionEntry {
  id: string;
  missionId: string;
  missionDay: number;
  missionTitle: string;
  date: string;
  content: string;
  completed: boolean;
  createdAt: number;
}

export function TraderMissions() {
  const [entries, setEntries] = useState<MissionEntry[]>(() => {
    const saved = localStorage.getItem("traderEntries");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentDay, setCurrentDay] = useState(1);
  const [content, setContent] = useState("");
  const [view, setView] = useState<'mission' | 'calendar' | 'detail'>('mission');
  const [selectedEntry, setSelectedEntry] = useState<MissionEntry | null>(null);

  const totalMissions = getTotalMissions();
  const mission = getMissionByDay(currentDay) || TRADER_MISSIONS[0];
  const completedDays = entries.filter(e => e.completed).length;
  const progress = (completedDays / totalMissions) * 100;

  const saveEntry = () => {
    if (!content.trim()) return;
    const newEntry: MissionEntry = {
      id: crypto.randomUUID(),
      missionId: mission.id,
      missionDay: mission.dia,
      missionTitle: mission.titulo,
      date: new Date().toISOString(),
      content: content.trim(),
      completed: true,
      createdAt: Date.now()
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem("traderEntries", JSON.stringify(updated));
    setContent("");
    if (currentDay < totalMissions) {
      setCurrentDay(currentDay + 1);
    }
  };

  const getEntryByDay = (day: number): MissionEntry | undefined => {
    return entries.find(e => e.missionDay === day || e.missionId === String(day));
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const handleDayClick = (day: number) => {
    const entry = getEntryByDay(day);
    if (entry) {
      setSelectedEntry(entry);
      setView('detail');
    } else {
      setCurrentDay(day);
      setView('mission');
    }
  };

  const goToPreviousDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDay < totalMissions) {
      setCurrentDay(currentDay + 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card border-amber-500/20 bg-black/40 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="border-amber-500/50 text-amber-500 font-serif uppercase tracking-wider">
              365 Días de Transformación
            </Badge>
            <span className="text-amber-500 font-bold">{completedDays}/{totalMissions} Días</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/5" />
        </CardHeader>
      </Card>

      <div className="flex gap-2 justify-center mb-4">
        <Button 
          variant={view === 'mission' ? 'default' : 'ghost'} 
          onClick={() => setView('mission')}
          className={cn(view === 'mission' && "bg-amber-500 text-black hover:bg-amber-600")}
        >
          Misión Diaria
        </Button>
        <Button 
          variant={view === 'calendar' ? 'default' : 'ghost'} 
          onClick={() => setView('calendar')}
          className={cn(view === 'calendar' && "bg-amber-500 text-black hover:bg-amber-600")}
        >
          Calendario
        </Button>
      </div>

      {view === 'mission' ? (
        <Card className="glass-card border-amber-500/30 bg-black/60 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <CardContent className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <Button
                size="icon"
                variant="ghost"
                onClick={goToPreviousDay}
                disabled={currentDay <= 1}
                className="text-amber-500/70 hover:text-amber-500"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="text-center space-y-4 flex-1">
                <Badge className="bg-amber-500 text-black hover:bg-amber-600 font-bold px-4 py-1">
                  DÍA {mission.dia}
                </Badge>
                <h2 className="text-2xl font-serif font-bold gold-text uppercase tracking-tighter">
                  {mission.titulo}
                </h2>
                <Badge variant="outline" className="border-white/20 text-white/50 text-xs">
                  {mission.categoria}
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={goToNextDay}
                disabled={currentDay >= totalMissions}
                className="text-amber-500/70 hover:text-amber-500"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 relative">
              <Sparkles className="absolute -top-3 -right-3 h-8 w-8 text-amber-500/20" />
              <h3 className="text-amber-400 font-bold text-sm uppercase mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                La Misión
              </h3>
              <p className="text-white/90 leading-relaxed text-lg whitespace-pre-line">{mission.texto}</p>
              
              {mission.cita && (
                <div className="mt-6 pt-6 border-t border-amber-500/10 italic text-white/60 text-sm text-center">
                  "{mission.cita}"
                </div>
              )}
            </div>

            {mission.aplicacionCotidiana && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-emerald-400 font-bold text-sm uppercase mb-2">Aplicación Cotidiana</h3>
                    <p className="text-white/80 leading-relaxed">{mission.aplicacionCotidiana}</p>
                  </div>
                </div>
              </div>
            )}

            {mission.meditacionRecomendada && (
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-purple-400 font-bold text-sm uppercase mb-2">Meditación Recomendada</h3>
                    <p className="text-white/80 leading-relaxed">
                      Se recomienda realizar la sesión: <span className="text-purple-300 font-semibold">{mission.meditacionRecomendada}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Label className="text-amber-500/80 uppercase tracking-widest text-[10px] font-bold">
                REFLEXIÓN DEL DÍA
              </Label>
              <Textarea 
                placeholder="Escribe tus pensamientos sobre la misión de hoy..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] bg-black/40 border-amber-500/20 focus-visible:ring-amber-500/50 resize-none text-white/90"
              />
              <Button 
                onClick={saveEntry}
                className="w-full bg-amber-500 text-black hover:bg-amber-600 font-bold h-12 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                Completar Misión del Día {mission.dia}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : view === 'calendar' ? (
        <Card className="glass-card border-amber-500/20 bg-black/40 backdrop-blur-xl">
          <CardContent className="pt-6">
            <p className="text-white/50 text-sm text-center mb-4">
              Toca un día para ver la misión o tu reflexión
            </p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: Math.min(totalMissions, 30) }).map((_, i) => {
                const day = i + 1;
                const entry = getEntryByDay(day);
                const isCompleted = !!entry;
                const missionData = getMissionByDay(day);
                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={cn(
                      "aspect-square rounded-lg flex items-center justify-center text-sm font-bold relative transition-all",
                      isCompleted 
                        ? "bg-amber-500 text-black cursor-pointer hover:bg-amber-400" 
                        : missionData 
                          ? "bg-white/10 text-white/70 border border-white/10 cursor-pointer hover:bg-white/20"
                          : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed"
                    )}
                    data-testid={`calendar-day-${day}`}
                  >
                    {day}
                    {isCompleted && <Star className="h-2 w-2 absolute top-1 right-1 fill-black" />}
                  </button>
                );
              })}
            </div>
            {totalMissions > 30 && (
              <p className="text-white/30 text-xs text-center mt-4">
                Mostrando los primeros 30 días de {totalMissions} misiones totales
              </p>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="glass-card border-amber-500/30 bg-black/60 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          <CardContent className="pt-6 space-y-6">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedEntry(null);
                setView('calendar');
              }}
              className="text-amber-500 hover:text-amber-400 -ml-2"
              data-testid="button-back-calendar"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Calendario
            </Button>

            {selectedEntry && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <Badge className="bg-amber-500 text-black hover:bg-amber-600 font-bold px-4 py-1">
                    DÍA {selectedEntry.missionDay || selectedEntry.missionId}
                  </Badge>
                  <h2 className="text-2xl font-serif font-bold gold-text uppercase tracking-tighter">
                    {selectedEntry.missionTitle || `Misión ${selectedEntry.missionId}`}
                  </h2>
                </div>

                <div className="flex items-center justify-center gap-2 text-white/50">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{formatDate(selectedEntry.date)}</span>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 space-y-3">
                  <Label className="text-amber-500/80 uppercase tracking-widest text-[10px] font-bold">
                    TU REFLEXIÓN
                  </Label>
                  <p className="text-white/90 leading-relaxed whitespace-pre-wrap">
                    {selectedEntry.content}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <Trophy className="h-5 w-5" />
                  <span className="font-semibold">Misión Completada</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
