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
  const isPlayingRef = useRef(false);
  const ambientSoundsRef = useRef<AmbientSoundsRef>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("customMeditations");
    if (saved) {
      setCustomMeditations(JSON.parse(saved));
    }

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      
      const spanishVoice = voices.find(v => v.lang.toLowerCase().includes("es"));
      const googleSpanish = voices.find(v => v.name.includes("Google") && v.lang.includes("es"));
      const finalVoice = googleSpanish || spanishVoice || voices[0];
      
      if (finalVoice && !selectedVoice) {
        setSelectedVoice(finalVoice.voiceURI);
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
      isPlayingRef.current = false;
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
        if (!isStoppedRef.current && isPlayingRef.current) {
          currentIndexRef.current = index + 1;
          speakSegment(index + 1);
        }
      }, pauseDuration);
    };

    utterance.onerror = (event) => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        console.error("Speech error:", event.error);
        setTimeout(() => {
          if (!isStoppedRef.current && isPlayingRef.current) {
            speakSegment(index);
          }
        }, 500);
      }
    };

    // Speak immediately
    window.speechSynthesis.speak(utterance);
  }, [speed, pitch, volume, pauseBetweenPhrases, selectedVoice]);

  const handlePlay = useCallback(() => {
    let currentMeditation = selectedMeditation;
    
    if (!currentMeditation) {
      currentMeditation = meditacionesPredefinidas[0];
      setSelectedMeditation(currentMeditation);
      const durationMatch = currentMeditation.duracion.match(/(\d+)/);
      if (durationMatch) {
        setTotalDuration(parseInt(durationMatch[1]) * 60);
      }
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();
    
    // Set refs immediately before calling speakSegment
    isStoppedRef.current = false;
    isPlayingRef.current = true;

    if (isPaused) {
      setIsPaused(false);
      setIsPlaying(true);
      speakSegment(currentIndexRef.current);
    } else {
      segmentsRef.current = parseTextIntoSegments(currentMeditation.texto);
      currentIndexRef.current = 0;
      setIsPlaying(true);
      setIsPaused(false);
      setCurrentTime(0);
      
      // Small delay after cancel to ensure it takes effect
      setTimeout(() => {
        speakSegment(0);
      }, 50);
    }
  }, [selectedMeditation, isPaused, parseTextIntoSegments, speakSegment]);

  const handlePause = useCallback(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isPlayingRef.current = false;
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const handleResume = useCallback(() => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Fallback if resume doesn't work or it wasn't really paused
      handlePlay();
    }
  }, [handlePlay]);

  const handleStop = useCallback(() => {
    isStoppedRef.current = true;
    isPlayingRef.current = false;
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
    "estres": "from-amber-900/40 via-yellow-900/30 to-amber-950/40",
    "concentracion": "from-amber-800/50 via-amber-900/40 to-yellow-950/40",
    "impulsos": "from-amber-900/40 via-orange-900/30 to-amber-950/40",
    "resiliencia": "from-yellow-900/40 via-amber-900/30 to-amber-950/40",
    "visualizacion": "from-amber-800/40 via-yellow-900/30 to-amber-950/40",
    "intuicion": "from-amber-900/40 via-amber-800/30 to-yellow-950/40",
  };

  const meditationImages: Record<string, string> = {
    "estres": "/src/assets/meditation_backgrounds/aa.png",
    "concentracion": "/src/assets/meditation_backgrounds/arbol.png",
    "impulsos": "/src/assets/meditation_backgrounds/Captura de pantalla 2025-12-17 202508.png",
    "resiliencia": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 190813.png",
    "visualizacion": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 190844.png",
    "intuicion": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 191053.png",
  };

  const currentBgImage = selectedMeditation 
    ? (meditationImages[selectedMeditation.categoriaId] || meditationImages["estres"])
    : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000";

  const renderHomeTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-amber-500/30">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-amber-400/80 uppercase tracking-wider">Bienvenido de nuevo</p>
              <h2 className="text-lg font-semibold text-white">Hola, Trader</h2>
            </div>
          </div>
          <Button size="icon" variant="ghost" className="text-amber-400/70" data-testid="button-notifications">
            <Bell className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative rounded-2xl overflow-hidden glass-dark" data-testid="card-now-playing">
          <div className="relative p-6 space-y-6 flex flex-col items-center text-center">
            <div className="w-48 h-48 rounded-full border-2 border-amber-500/20 overflow-hidden shadow-2xl shadow-amber-500/10">
              <img 
                src={currentBgImage} 
                alt="Meditation" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-white tracking-tight">
                {selectedMeditation?.titulo || "Deep Sleep Journey"}
              </h3>
              <p className="text-lg text-white/60">
                {selectedMeditation?.descripcion || "Relax your mind and body for a restful night."}
              </p>
            </div>

            <div className="w-full space-y-2 px-4">
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-xs font-medium">{formatTime(currentTime)}</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                    style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                  />
                </div>
                <span className="text-white/60 text-xs">{formatTime(totalDuration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4">
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white/60 hover:text-white h-12 w-12"
                onClick={handleStop}
                data-testid="button-stop"
              >
                <div className="h-6 w-6 bg-current rounded-sm" />
              </Button>
              <Button
                size="icon"
                className="h-20 w-20 rounded-full border-2 border-amber-500/30 bg-transparent hover:bg-amber-500/10 text-amber-500 shadow-xl"
                onClick={isPlaying ? handlePause : (isPaused ? handleResume : handlePlay)}
                data-testid="button-play-pause"
              >
                {isPlaying ? <Pause className="h-10 w-10 fill-current" /> : <Play className="h-10 w-10 ml-1 fill-current" />}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white/60 hover:text-white h-12 w-12"
                data-testid="button-next"
              >
                <SkipForward className="h-8 w-8" />
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
            className="p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left"
            data-testid="button-create-new"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <h4 className="font-semibold text-white">Crear Nueva</h4>
            <p className="text-xs text-white/50 mt-0.5">Con IA Personalizada</p>
          </button>

          <button
            onClick={() => setActiveTab("explorar")}
            className="p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left"
            data-testid="button-saved"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
              <Bookmark className="h-5 w-5 text-amber-400" />
            </div>
            <h4 className="font-semibold text-white">Mis Guardadas</h4>
            <p className="text-xs text-white/50 mt-0.5">Tu librería personal</p>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setShowVoiceSettings(true)}
            className="p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left"
            data-testid="button-voice-settings"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
              <Mic className="h-5 w-5 text-amber-400" />
            </div>
            <h4 className="font-semibold text-white">Voz</h4>
            <p className="text-xs text-white/50 mt-0.5">Ajustar narración</p>
          </button>

          <button
            onClick={() => setShowAmbientSounds(true)}
            className="p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left"
            data-testid="button-ambient-sounds"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
              <Volume2 className="h-5 w-5 text-amber-400" />
            </div>
            <h4 className="font-semibold text-white">Sonidos</h4>
            <p className="text-xs text-white/50 mt-0.5">Ambiente relajante</p>
          </button>
        </div>

        {categorias.map(cat => {
          const meditations = getMeditationsByCategory(cat.id);
          if (meditations.length === 0) return null;
          
          return (
            <div key={cat.id} className="space-y-3" data-testid={`category-section-${cat.id}`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{cat.nombre.split('. ')[1] || cat.nombre}</h3>
                <button className="text-sm text-amber-400/70 flex items-center gap-1">
                  Ver todo <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {meditations.slice(0, 5).map(med => (
                  <button
                    key={med.id}
                    onClick={() => handleSelectMeditation(med)}
                    className={`flex-shrink-0 w-36 rounded-xl overflow-hidden glass-dark hover-elevate active-elevate-2 ${
                      selectedMeditation?.id === med.id ? 'ring-2 ring-amber-400' : ''
                    }`}
                    data-testid={`meditation-card-${med.id}`}
                  >
                    <div className={`h-24 bg-gradient-to-br ${categoryBackgrounds[cat.id] || 'from-amber-900/40 to-amber-950/40'} relative`}>
                      <div className="absolute inset-0 wave-card-bg" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/20">
                        <span className="text-xs text-amber-400">{med.duracion.split('-')[0]}m</span>
                      </div>
                    </div>
                    <div className="p-3 bg-black/40 border-t border-amber-500/10">
                      <h4 className="text-sm font-medium text-white truncate">{med.titulo}</h4>
                      <p className="text-xs text-white/50 truncate mt-0.5">{cat.nombre.split('. ')[1]}</p>
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
          <Button size="icon" variant="ghost" className="text-amber-400/70">
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
                    className={`w-full p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left flex items-center gap-4 ${
                      selectedMeditation?.id === med.id ? 'ring-2 ring-amber-400' : ''
                    }`}
                    data-testid={`explore-meditation-${med.id}`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${categoryBackgrounds[cat.id] || 'from-amber-600 to-amber-800'} flex items-center justify-center flex-shrink-0`}>
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white truncate">{med.titulo}</h4>
                      <p className="text-sm text-white/50 truncate">{med.duracion}</p>
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
                  className="w-full p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left flex items-center gap-4"
                  data-testid={`custom-meditation-${med.id}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white truncate">{med.titulo}</h4>
                    <p className="text-sm text-white/50 truncate">{med.duracion}</p>
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
          <div className="p-4 rounded-xl glass-dark">
            <p className="text-3xl font-bold text-amber-400">12</p>
            <p className="text-sm text-white/50">Sesiones esta semana</p>
          </div>
          <div className="p-4 rounded-xl glass-dark">
            <p className="text-3xl font-bold text-amber-500">5h 30m</p>
            <p className="text-sm text-white/50">Tiempo total</p>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-dark space-y-3">
          <h3 className="font-semibold text-white">Racha Actual</h3>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
            </div>
            <span className="text-amber-400 font-semibold">7 días</span>
          </div>
        </div>

        <div className="p-6 rounded-xl glass-dark text-center">
          <BarChart3 className="h-12 w-12 text-amber-400/60 mx-auto mb-3" />
          <p className="text-white/50">Más estadísticas próximamente</p>
        </div>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center text-center py-6">
          <Avatar className="h-20 w-20 border-4 border-amber-500/30 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white text-2xl">
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold text-white">Trader</h2>
          <p className="text-white/50">Meditador desde 2024</p>
        </div>

        <div className="space-y-2">
          <button className="w-full p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Configuración de Voz</span>
            <ChevronRight className="h-5 w-5 text-amber-400/70" />
          </button>
          <button className="w-full p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Sonidos Guardados</span>
            <ChevronRight className="h-5 w-5 text-amber-400/70" />
          </button>
          <button className="w-full p-4 rounded-xl glass-dark hover-elevate active-elevate-2 text-left flex items-center justify-between">
            <span className="text-white">Preferencias</span>
            <ChevronRight className="h-5 w-5 text-amber-400/70" />
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

      <nav className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-amber-500/10 z-50">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab("inicio")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "inicio" ? "text-amber-400" : "text-white/40"
            }`}
            data-testid="nav-inicio"
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab("explorar")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "explorar" ? "text-amber-400" : "text-white/40"
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
            className="relative -top-4 w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 border-4 border-black"
            data-testid="nav-create"
          >
            <Plus className="h-7 w-7 text-black" />
          </button>

          <button
            onClick={() => setActiveTab("progreso")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "progreso" ? "text-amber-400" : "text-white/40"
            }`}
            data-testid="nav-progreso"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-xs">Progreso</span>
          </button>

          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "perfil" ? "text-amber-400" : "text-white/40"
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
          <div className="w-full max-h-[80vh] overflow-y-auto bg-neutral-900 border-t border-amber-500/20 rounded-t-3xl p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Configuración de Voz</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowVoiceSettings(false)}
                className="text-amber-400/70"
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
          <div className="w-full max-h-[80vh] overflow-y-auto bg-neutral-900 border-t border-amber-500/20 rounded-t-3xl p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">Sonidos Ambiente</h3>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setShowAmbientSounds(false)}
                className="text-amber-400/70"
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
