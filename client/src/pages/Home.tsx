import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Home as HomeIcon, 
  Compass, 
  Plus, 
  BarChart3, 
  User, 
  Play, 
  Pause,
  SkipBack, 
  SkipForward,
  Sparkles,
  Bookmark,
  Bell,
  Settings,
  ChevronRight,
  Volume2,
  Mic
} from "lucide-react";
import { MeditationPlayer } from "@/components/MeditationPlayer";
import { VoiceControls } from "@/components/VoiceControls";
import { AmbientSounds, type AmbientSoundsRef } from "@/components/AmbientSounds";
import { CreateMeditationDialog } from "@/components/CreateMeditationDialog";
import { useToast } from "@/hooks/use-toast";
import { meditacionesPredefinidas, categorias } from "@/lib/meditationData";
import type { Meditacion, MeditacionPersonalizada, InsertMeditacion } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function cleanText(text: string): string {
  return text.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "").trim();
}

type TabType = "inicio" | "explorar" | "progreso" | "perfil";

export default function Home() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("inicio");
  const [selectedMeditation, setSelectedMeditation] = useState<Meditacion | null>(null);
  const [customMeditations, setCustomMeditations] = useState<MeditacionPersonalizada[]>([]);
  const [editingMeditation, setEditingMeditation] = useState<MeditacionPersonalizada | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [showAmbientSounds, setShowAmbientSounds] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(15 * 60);
  
  const [speed, setSpeed] = useState(0.75);
  const [pitch, setPitch] = useState(1.0);
  const [volume, setVolume] = useState(0.9);
  const [pauseBetweenPhrases, setPauseBetweenPhrases] = useState(3);
  const [selectedVoice, setSelectedVoice] = useState("");
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef<{ text: string; hasLineBreakAfter: boolean }[]>([]);
  const currentIndexRef = useRef(0);
  const isStoppedRef = useRef(false);
  const ambientSoundsRef = useRef<AmbientSoundsRef>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("customMeditations");
    if (saved) {
      setCustomMeditations(JSON.parse(saved));
    }

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(v => v.lang.toLowerCase().startsWith("es"));
      if (spanishVoice && !selectedVoice) {
        setSelectedVoice(spanishVoice.voiceURI);
      }
    };

    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;

    return () => {
      window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [selectedVoice]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            if (timerRef.current) clearInterval(timerRef.current);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration]);

  const parseTextIntoSegments = useCallback((text: string) => {
    const cleanedText = cleanText(text);
    const lines = cleanedText.split("\n").filter(line => line.trim());
    const segments: { text: string; hasLineBreakAfter: boolean }[] = [];

    lines.forEach((line, lineIndex) => {
      const sentences = line.split(/(?<=[.!?…])\s+/).filter(s => s.trim());
      sentences.forEach((sentence, sentenceIndex) => {
        const isLastSentenceInLine = sentenceIndex === sentences.length - 1;
        const isLastLine = lineIndex === lines.length - 1;
        segments.push({
          text: sentence.trim(),
          hasLineBreakAfter: isLastSentenceInLine && !isLastLine,
        });
      });
    });

    return segments;
  }, []);

  const speakSegment = useCallback((index: number) => {
    if (isStoppedRef.current || index >= segmentsRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      return;
    }

    const segment = segmentsRef.current[index];
    const utterance = new SpeechSynthesisUtterance(segment.text);
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onend = () => {
      if (isStoppedRef.current) return;
      
      const pauseDuration = segment.hasLineBreakAfter
        ? (pauseBetweenPhrases + 2) * 1000
        : pauseBetweenPhrases * 1000;

      setTimeout(() => {
        if (!isStoppedRef.current) {
          currentIndexRef.current = index + 1;
          speakSegment(index + 1);
        }
      }, pauseDuration);
    };

    utterance.onerror = (event) => {
      if (event.error !== "canceled") {
        console.error("Speech error:", event.error);
        setTimeout(() => {
          if (!isStoppedRef.current) {
            speakSegment(index);
          }
        }, 500);
      }
    };

    window.speechSynthesis.cancel();
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 50);
  }, [speed, pitch, volume, pauseBetweenPhrases, selectedVoice]);

  const handlePlay = useCallback(() => {
    if (!selectedMeditation) return;

    if (isPaused) {
      setIsPaused(false);
      setIsPlaying(true);
      isStoppedRef.current = false;
      speakSegment(currentIndexRef.current);
    } else {
      segmentsRef.current = parseTextIntoSegments(selectedMeditation.texto);
      currentIndexRef.current = 0;
      isStoppedRef.current = false;
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentTime(0);
      const durationMatch = selectedMeditation.duracion.match(/(\d+)/);
      if (durationMatch) {
        setTotalDuration(parseInt(durationMatch[1]) * 60);
      }
      speakSegment(0);
    }
  }, [selectedMeditation, isPaused, parseTextIntoSegments, speakSegment]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    isStoppedRef.current = true;
    window.speechSynthesis.cancel();
    currentIndexRef.current = 0;
    segmentsRef.current = [];
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
    ambientSoundsRef.current?.stopAll();
  }, []);

  const handleSelectMeditation = useCallback((meditation: Meditacion) => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedMeditation(meditation);
    const durationMatch = meditation.duracion.match(/(\d+)/);
    if (durationMatch) {
      setTotalDuration(parseInt(durationMatch[1]) * 60);
    }
  }, [isPlaying, handleStop]);

  const handleCreateMeditation = useCallback((data: InsertMeditacion) => {
    if (editingMeditation) {
      const updated = customMeditations.map(m =>
        m.id === editingMeditation.id
          ? { ...m, ...data, categoria: data.categoria || "Personalizada", categoriaId: data.categoriaId || "custom" }
          : m
      );
      setCustomMeditations(updated);
      localStorage.setItem("customMeditations", JSON.stringify(updated));
      toast({
        title: "Meditación actualizada",
        description: "Tu meditación ha sido guardada correctamente.",
      });
    } else {
      const newMeditation: MeditacionPersonalizada = {
        id: crypto.randomUUID(),
        titulo: data.titulo,
        descripcion: data.descripcion,
        duracion: data.duracion,
        texto: data.texto,
        categoria: data.categoria || "Personalizada",
        categoriaId: data.categoriaId || "custom",
        createdAt: Date.now(),
      };
      const updated = [...customMeditations, newMeditation];
      setCustomMeditations(updated);
      localStorage.setItem("customMeditations", JSON.stringify(updated));
      toast({
        title: "Meditación creada",
        description: "Tu nueva meditación ha sido guardada.",
      });
    }
    setEditingMeditation(null);
  }, [customMeditations, editingMeditation, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMeditationsByCategory = (categoryId: string) => {
    return meditacionesPredefinidas.filter(m => m.categoriaId === categoryId);
  };

  const categoryBackgrounds: Record<string, string> = {
    "estres": "from-cyan-800/60 via-teal-900/60 to-blue-900/60",
    "concentracion": "from-orange-800/60 via-amber-900/60 to-yellow-900/60",
    "impulsos": "from-rose-800/60 via-pink-900/60 to-red-900/60",
    "resiliencia": "from-emerald-800/60 via-green-900/60 to-teal-900/60",
    "visualizacion": "from-violet-800/60 via-purple-900/60 to-indigo-900/60",
    "intuicion": "from-blue-800/60 via-indigo-900/60 to-violet-900/60",
  };

  const renderHomeTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-purple-400/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-purple-300 uppercase tracking-wider">Bienvenido de nuevo</p>
              <h2 className="text-lg font-semibold text-white">Hola, Trader</h2>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-purple-300" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative rounded-2xl overflow-hidden" data-testid="card-now-playing">
          <div className="absolute inset-0 wave-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="relative p-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 backdrop-blur-sm border border-purple-400/20">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs text-purple-200 uppercase tracking-wider">Meditación Actual</span>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {selectedMeditation?.titulo || "Creando el Futuro Deseado"}
              </h3>
              <p className="text-sm text-purple-200/80 mt-1">
                {selectedMeditation?.categoria || "Visualización para Traders"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-sm font-medium">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-purple-900/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
                <span className="text-purple-300 text-sm">{formatTime(totalDuration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 pt-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white h-12 w-12"
                data-testid="button-previous"
              >
                <SkipBack className="h-6 w-6" />
              </Button>
              <Button
                size="icon"
                className="h-16 w-16 rounded-full bg-amber-400 hover:bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                onClick={isPlaying ? handlePause : handlePlay}
                data-testid="button-play-pause"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white h-12 w-12"
                data-testid="button-next"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              setEditingMeditation(null);
              setDialogOpen(true);
            }}
            className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left"
            data-testid="button-create-new"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-purple-300" />
            </div>
            <h4 className="font-semibold text-white">Crear Nueva</h4>
            <p className="text-xs text-purple-300/70 mt-0.5">Con IA Personalizada</p>
          </button>

          <button
            onClick={() => setActiveTab("explorar")}
            className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left"
            data-testid="button-saved"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-3">
              <Bookmark className="h-5 w-5 text-purple-300" />
            </div>
            <h4 className="font-semibold text-white">Mis Guardadas</h4>
            <p className="text-xs text-purple-300/70 mt-0.5">Tu librería personal</p>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowVoiceSettings(true)}
            className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left"
            data-testid="button-voice-settings"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
              <Mic className="h-5 w-5 text-amber-300" />
            </div>
            <h4 className="font-semibold text-white">Voz</h4>
            <p className="text-xs text-purple-300/70 mt-0.5">Ajustar narración</p>
          </button>

          <button
            onClick={() => setShowAmbientSounds(true)}
            className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left"
            data-testid="button-ambient-sounds"
          >
            <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center mb-3">
              <Volume2 className="h-5 w-5 text-teal-300" />
            </div>
            <h4 className="font-semibold text-white">Sonidos</h4>
            <p className="text-xs text-purple-300/70 mt-0.5">Ambiente relajante</p>
          </button>
        </div>

        {categorias.map(cat => {
          const meditations = getMeditationsByCategory(cat.id);
          if (meditations.length === 0) return null;
          
          return (
            <div key={cat.id} className="space-y-3" data-testid={`category-section-${cat.id}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{cat.nombre.split('. ')[1] || cat.nombre}</h3>
                <button className="text-sm text-purple-400 flex items-center gap-1">
                  Ver todo <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {meditations.slice(0, 5).map(med => (
                  <button
                    key={med.id}
                    onClick={() => handleSelectMeditation(med)}
                    className={`flex-shrink-0 w-36 rounded-xl overflow-hidden hover-elevate active-elevate-2 ${
                      selectedMeditation?.id === med.id ? 'ring-2 ring-amber-400' : ''
                    }`}
                    data-testid={`meditation-card-${med.id}`}
                  >
                    <div className={`h-24 bg-gradient-to-br ${categoryBackgrounds[cat.id] || 'from-purple-800/60 to-indigo-900/60'} relative`}>
                      <div className="absolute inset-0 wave-card-bg" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                        <span className="text-xs text-white">{med.duracion.split('-')[0]}m</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-900/60 border-t border-purple-500/10">
                      <h4 className="text-sm font-medium text-white truncate">{med.titulo}</h4>
                      <p className="text-xs text-purple-300/70 truncate mt-0.5">{cat.nombre.split('. ')[1]}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderExploreTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Explorar</h2>
          <Button size="icon" variant="ghost" className="text-purple-300">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {categorias.map(cat => {
          const meditations = getMeditationsByCategory(cat.id);
          if (meditations.length === 0) return null;
          
          return (
            <div key={cat.id} className="space-y-3">
              <h3 className="font-semibold text-white">{cat.nombre}</h3>
              <div className="space-y-2">
                {meditations.map(med => (
                  <button
                    key={med.id}
                    onClick={() => {
                      handleSelectMeditation(med);
                      setActiveTab("inicio");
                    }}
                    className={`w-full p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left flex items-center gap-4 ${
                      selectedMeditation?.id === med.id ? 'ring-2 ring-amber-400' : ''
                    }`}
                    data-testid={`explore-meditation-${med.id}`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryBackgrounds[cat.id] || 'from-purple-500 to-indigo-600'} flex items-center justify-center flex-shrink-0`}>
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{med.titulo}</h4>
                      <p className="text-sm text-purple-300/70 truncate">{med.duracion}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {customMeditations.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Mis Meditaciones</h3>
            <div className="space-y-2">
              {customMeditations.map(med => (
                <button
                  key={med.id}
                  onClick={() => {
                    handleSelectMeditation(med);
                    setActiveTab("inicio");
                  }}
                  className="w-full p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left flex items-center gap-4"
                  data-testid={`custom-meditation-${med.id}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{med.titulo}</h4>
                    <p className="text-sm text-purple-300/70 truncate">{med.duracion}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderProgressTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <h2 className="text-xl font-semibold text-white">Tu Progreso</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20">
            <p className="text-3xl font-bold text-amber-400">12</p>
            <p className="text-sm text-purple-300/70">Sesiones esta semana</p>
          </div>
          <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20">
            <p className="text-3xl font-bold text-emerald-400">5h 30m</p>
            <p className="text-sm text-purple-300/70">Tiempo total</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 space-y-3">
          <h3 className="font-semibold text-white">Racha Actual</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-purple-800/50 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </div>
            <span className="text-amber-400 font-semibold">7 días</span>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-purple-900/40 border border-purple-500/20 text-center">
          <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-3" />
          <p className="text-purple-300/70">Más estadísticas próximamente</p>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center text-center py-6">
          <Avatar className="h-20 w-20 border-4 border-purple-400/30 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-2xl">
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-white">Trader</h2>
          <p className="text-purple-300/70">Meditador desde 2024</p>
        </div>

        <div className="space-y-2">
          <button className="w-full p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Configuración de Voz</span>
            <ChevronRight className="h-5 w-5 text-purple-400" />
          </button>
          <button className="w-full p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Sonidos Guardados</span>
            <ChevronRight className="h-5 w-5 text-purple-400" />
          </button>
          <button className="w-full p-4 rounded-xl bg-purple-900/40 border border-purple-500/20 hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Preferencias</span>
            <ChevronRight className="h-5 w-5 text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen h-screen flex flex-col app-background">
      {activeTab === "inicio" && renderHomeTab()}
      {activeTab === "explorar" && renderExploreTab()}
      {activeTab === "progreso" && renderProgressTab()}
      {activeTab === "perfil" && renderProfileTab()}

      <nav className="fixed bottom-0 left-0 right-0 bg-purple-950/95 backdrop-blur-lg border-t border-purple-500/20 z-50">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "inicio" ? "text-purple-400" : "text-purple-500/60"
            }`}
            data-testid="nav-inicio"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab("explorar")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "explorar" ? "text-purple-400" : "text-purple-500/60"
            }`}
            data-testid="nav-explorar"
          >
            <Compass className="h-6 w-6" />
            <span className="text-xs">Explorar</span>
          </button>

          <button
            onClick={() => {
              setEditingMeditation(null);
              setDialogOpen(true);
            }}
            className="relative -top-4 w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-600/30 border-4 border-purple-950"
            data-testid="nav-create"
          >
            <Plus className="h-7 w-7 text-white" />
          </button>

          <button
            onClick={() => setActiveTab("progreso")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "progreso" ? "text-purple-400" : "text-purple-500/60"
            }`}
            data-testid="nav-progreso"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs">Progreso</span>
          </button>

          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "text-purple-400" : "text-purple-500/60"
            }`}
            data-testid="nav-perfil"
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </nav>

      <CreateMeditationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateMeditation}
        editingMeditation={editingMeditation}
      />

      {showVoiceSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end">
          <div className="w-full max-h-[80vh] overflow-y-auto bg-purple-950 rounded-t-3xl p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Configuración de Voz</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowVoiceSettings(false)}
                className="text-purple-300"
              >
                <ChevronRight className="h-5 w-5 rotate-90" />
              </Button>
            </div>
            <VoiceControls
              speed={speed}
              pitch={pitch}
              volume={volume}
              pauseBetweenPhrases={pauseBetweenPhrases}
              selectedVoice={selectedVoice}
              onSpeedChange={setSpeed}
              onPitchChange={setPitch}
              onVolumeChange={setVolume}
              onPauseChange={setPauseBetweenPhrases}
              onVoiceChange={setSelectedVoice}
            />
          </div>
        </div>
      )}

      {showAmbientSounds && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end">
          <div className="w-full max-h-[80vh] overflow-y-auto bg-purple-950 rounded-t-3xl p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Sonidos Ambiente</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowAmbientSounds(false)}
                className="text-purple-300"
              >
                <ChevronRight className="h-5 w-5 rotate-90" />
              </Button>
            </div>
            <AmbientSounds ref={ambientSoundsRef} />
          </div>
        </div>
      )}
    </div>
  );
}
