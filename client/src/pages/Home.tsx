import { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Home as HomeIcon, 
  Compass, 
  Plus, 
  Trophy, 
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
  Mic,
  Star
} from "lucide-react";
import { MeditationPlayer } from "@/components/MeditationPlayer";
import { VoiceControls } from "@/components/VoiceControls";
import { AmbientSounds, type AmbientSoundsRef } from "@/components/AmbientSounds";
import { CreateMeditationDialog } from "@/components/CreateMeditationDialog";
import { useToast } from "@/hooks/use-toast";
import { meditacionesPredefinidas, categorias } from "@/lib/meditationData";
import type { Meditacion, MeditacionPersonalizada, InsertMeditacion } from "@shared/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { TraderMissions } from "@/components/TraderMissions";
import tradingDesdeCeroImg from "@assets/meditation_backgrounds/tradingDesdeCero.png";
import cafeConRafaImg from "@assets/image_1767882571491.png";

function cleanText(text: string): string {
  return text.replace(/\[.*?\]/g, "").replace(/\(.*?\)/g, "").trim();
}

type TabType = "inicio" | "explorar" | "misiones" | "perfil";

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
  const [completedMissions, setCompletedMissions] = useState<{missionDay: number}[]>([]);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const segmentsRef = useRef<{ text: string; isDeepPauseAfter: boolean }[]>([]);
  const currentIndexRef = useRef(0);
  const isStoppedRef = useRef(false);
  const isPlayingRef = useRef(false);
  const isCancellingRef = useRef(false);
  const ambientSoundsRef = useRef<AmbientSoundsRef>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("customMeditations");
    if (saved) {
      setCustomMeditations(JSON.parse(saved));
    }

    const savedMissions = localStorage.getItem("traderEntries");
    if (savedMissions) {
      const entries = JSON.parse(savedMissions);
      const completed = entries.filter((e: {completed: boolean}) => e.completed);
      setCompletedMissions(completed);
    }

    const loadVoice = () => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      const voices = window.speechSynthesis.getVoices();
      
      // En móviles, getVoices() puede tardar o devolver 0 al inicio
      // No retornamos si es 0, dejamos que onvoiceschanged vuelva a disparar
      if (voices.length > 0) {
        const spanishVoice = voices.find(v => v.lang.toLowerCase().includes("es"));
        const googleSpanish = voices.find(v => v.name.includes("Google") && v.lang.includes("es"));
        const finalVoice = googleSpanish || spanishVoice || voices[0];
        
        if (finalVoice && !selectedVoice) {
          setSelectedVoice(finalVoice.voiceURI);
        }
      }
    };

    if (typeof window !== "undefined" && window.speechSynthesis) {
      loadVoice();
      window.speechSynthesis.onvoiceschanged = loadVoice;
      
      // Polling para navegadores que no disparan onvoiceschanged (común en móviles)
      const voiceInterval = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          loadVoice();
          clearInterval(voiceInterval);
        }
      }, 500);

      return () => {
        clearInterval(voiceInterval);
        if (typeof window !== "undefined" && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
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
    // Split by double line breaks (deep pauses)
    const paragraphs = cleanedText.split(/\n\s*\n/);
    const segments: { text: string; isDeepPauseAfter: boolean }[] = [];

    paragraphs.forEach((paragraph, pIndex) => {
      // Split each paragraph into sentences or single line breaks (short pauses)
      const sentences = paragraph.split(/(?<=[.!?…])\s+|\n/).filter(s => s.trim());
      
      sentences.forEach((sentence, sIndex) => {
        const isLastInParagraph = sIndex === sentences.length - 1;
        const isLastParagraph = pIndex === paragraphs.length - 1;
        
        segments.push({
          text: sentence.trim(),
          isDeepPauseAfter: isLastInParagraph && !isLastParagraph
        });
      });
    });

    return segments;
  }, []);

  const speakSegment = useCallback((index: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    if (isStoppedRef.current || index >= segmentsRef.current.length) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setIsPaused(false);
      return;
    }

    const segment = segmentsRef.current[index];
    const utterance = new SpeechSynthesisUtterance(segment.text);
    
    // Force reset and initialization for production compatibility
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) utterance.voice = voice;

    utterance.lang = "es-ES";
    utterance.rate = speed;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onend = () => {
      if (isStoppedRef.current) return;
      
      const isLastSegment = index === segmentsRef.current.length - 1;
      
      if (isLastSegment) {
        setIsPlaying(false);
        isPlayingRef.current = false;
        setIsPaused(false);
        setCurrentTime(totalDuration);
        toast({
          title: "Meditación completada",
          description: "Has terminado tu sesión. Que tengas un buen trading.",
        });
        return;
      }
      
      const pauseDuration = segment.isDeepPauseAfter
        ? (pauseBetweenPhrases + 3) * 1000 // Deep pause (\n\n)
        : pauseBetweenPhrases * 1000;      // Normal pause (\n or punctuation)

      setTimeout(() => {
        if (!isStoppedRef.current && isPlayingRef.current) {
          currentIndexRef.current = index + 1;
          speakSegment(index + 1);
        }
      }, pauseDuration);
    };

    utterance.onerror = (event) => {
      if (isCancellingRef.current) {
        isCancellingRef.current = false;
        return;
      }
      if (event.error !== "canceled" && event.error !== "interrupted") {
        console.error("Speech error:", event.error);
      }
    };

    // Speak immediately
    window.speechSynthesis.speak(utterance);
  }, [speed, pitch, volume, pauseBetweenPhrases, selectedVoice]);

  const initializeSpeechSynthesis = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    
    // Force load voices (required for some browsers)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
      // Voices not loaded yet, wait for them
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
    
    // Warm up speech synthesis with a silent utterance (mobile browsers)
    const warmup = new SpeechSynthesisUtterance("");
    warmup.volume = 0;
    window.speechSynthesis.speak(warmup);
    window.speechSynthesis.cancel();
  }, []);

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

    // Initialize speech synthesis on user gesture (required for mobile)
    initializeSpeechSynthesis();

    // Cancel any existing speech
    if (typeof window !== "undefined" && window.speechSynthesis) {
      isCancellingRef.current = true;
      window.speechSynthesis.cancel();
    }
    
    // Set refs immediately before calling speakSegment
    isStoppedRef.current = false;
    isPlayingRef.current = true;
    isCancellingRef.current = false;

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
      }, 100);
    }
  }, [selectedMeditation, isPaused, parseTextIntoSegments, speakSegment, initializeSpeechSynthesis]);

  const handlePause = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      isPlayingRef.current = false;
      setIsPaused(true);
      setIsPlaying(false);
    }
  }, []);

  const handleResume = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.paused) {
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
    isCancellingRef.current = true;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    currentIndexRef.current = 0;
    segmentsRef.current = [];
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentTime(0);
    ambientSoundsRef.current?.stopAll();
  }, []);

  const handleRestartCurrentSegment = useCallback(() => {
    if (!isPlayingRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    
    isCancellingRef.current = true;
    window.speechSynthesis.cancel();
    
    setTimeout(() => {
      isCancellingRef.current = false;
      if (isPlayingRef.current && !isStoppedRef.current) {
        speakSegment(currentIndexRef.current);
      }
    }, 100);
  }, [speakSegment]);

  const handleSelectMeditation = useCallback((meditation: Meditacion) => {
    handleStop();
    setSelectedMeditation(meditation);
    const durationMatch = meditation.duracion.match(/(\d+)/);
    if (durationMatch) {
      setTotalDuration(parseInt(durationMatch[1]) * 60);
    }
  }, [handleStop]);

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



  const meditationImages: Record<string, string> = {
    "fundamento": "/src/assets/meditation_backgrounds/aa.png",
    "escudo": "/src/assets/meditation_backgrounds/arbol.png",
    "vision": "/src/assets/meditation_backgrounds/Captura de pantalla 2025-12-17 202508.png",
    "maestria": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 190813.png",
    "recuperacion": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 190844.png",
    "proyeccion": "/src/assets/meditation_backgrounds/Captura de pantalla 2026-01-07 191053.png",
    "cafe": cafeConRafaImg,
  };

  const categoryBackgrounds: Record<string, string> = {
    "fundamento": "from-amber-900/40 via-yellow-900/30 to-amber-950/40",
    "escudo": "from-amber-800/50 via-amber-900/40 to-yellow-950/40",
    "vision": "from-amber-900/40 via-orange-900/30 to-amber-950/40",
    "maestria": "from-yellow-900/40 via-amber-900/30 to-amber-950/40",
    "recuperacion": "from-amber-800/40 via-yellow-900/30 to-amber-950/40",
    "proyeccion": "from-amber-900/40 via-amber-800/30 to-yellow-950/40",
    "cafe": "from-amber-900/40 via-stone-900/30 to-amber-950/40",
  };

  const currentBgImage = selectedMeditation 
    ? (meditationImages[selectedMeditation.categoriaId] || meditationImages["fundamento"])
    : "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000";

  const renderHomeTab = () => (
    <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-amber-500/30">
            <AvatarImage src="/favicon.png" />
            <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs text-amber-400/80 uppercase tracking-wider">Bienvenido de nuevo</p>
            <h2 className="text-lg font-semibold text-white">Hola, Trader</h2>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-6">
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
                {selectedMeditation?.titulo || "Selecciona una Meditación"}
              </h3>
              <p className="text-lg text-white/60">
                {selectedMeditation?.descripcion || "Comienza tu camino hacia la maestría en el trading."}
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

            <div className="flex items-center gap-4 pt-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-amber-400/50 hover:text-amber-400"
                onClick={() => setShowVoiceSettings(true)}
                data-testid="button-voice-settings-home"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-amber-400/50 hover:text-amber-400"
                onClick={() => setShowAmbientSounds(true)}
                data-testid="button-ambient-sounds-home"
              >
                <Volume2 className="h-5 w-5" />
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

  const handleEditMeditation = useCallback((med: MeditacionPersonalizada) => {
    setEditingMeditation(med);
    setDialogOpen(true);
  }, []);

  const handleDeleteMeditation = useCallback((id: string) => {
    const updated = customMeditations.filter(m => m.id !== id);
    setCustomMeditations(updated);
    localStorage.setItem("customMeditations", JSON.stringify(updated));
    if (selectedMeditation?.id === id) {
      setSelectedMeditation(null);
    }
    toast({
      title: "Meditación eliminada",
      description: "La meditación ha sido eliminada de tu librería.",
    });
  }, [customMeditations, selectedMeditation, toast]);

  const renderExploreTab = () => (
    <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-white/5">
        <h2 className="text-xl font-semibold text-white">Explorar</h2>
        <Button 
          size="icon" 
          variant="ghost" 
          className="text-amber-400/70"
          onClick={() => setShowVoiceSettings(true)}
        >
          <Settings className="h-5 w-5" />
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
        onRestartCurrentSegment={handleRestartCurrentSegment}
      />
      <div className="p-4 space-y-6">
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
                <div key={med.id} className="group relative">
                  <button
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
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-amber-400 hover:text-amber-300 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMeditation(med);
                      }}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMeditation(med.id);
                      }}
                    >
                      <Plus className="h-4 w-4 rotate-45" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderMisionesTab = () => (
    <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-4 py-4 border-b border-white/5">
        <h2 className="text-xl font-semibold text-white">Misiones Trader</h2>
      </div>
      <div className="p-4">
        <TraderMissions 
          onSelectMeditation={(med) => {
            handleSelectMeditation(med);
            setActiveTab("inicio");
          }}
          onPlay={() => {
            setTimeout(handlePlay, 100);
          }}
        />
      </div>
    </div>
  );

  const renderProfileTab = () => {
    const savedTrophies = localStorage.getItem("traderTrophies");
    const trophies = savedTrophies ? JSON.parse(savedTrophies) : { bronze: false, silver: false, gold: false, platinum: false, diamond: false };
    const completedDays = completedMissions.length;

    return (
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md px-4 py-4 border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">Perfil</h2>
        </div>
        <div className="p-4 space-y-6">
          <div className="flex flex-col items-center text-center py-6 relative">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-amber-500/30 mb-4 shadow-2xl shadow-amber-500/20">
                <AvatarImage src="/favicon.png" />
                <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-white text-2xl">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              
              {/* Copas de Plata/Oro cerca del avatar (Victorias conseguidas) */}
              {trophies.silver && (
                <div className="absolute -top-1 -right-2 bg-slate-300 rounded-full p-1.5 shadow-lg border border-white/50 animate-bounce">
                  <Trophy className="h-4 w-4 text-slate-600" />
                </div>
              )}
              {trophies.gold && (
                <div className="absolute -top-1 -left-2 bg-amber-400 rounded-full p-1.5 shadow-lg border border-white/50 animate-pulse">
                  <Trophy className="h-4 w-4 text-amber-700" />
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Trader Disciplinado</h3>
            <p className="text-amber-500/80 text-sm font-medium">Nivel: Guardián del Capital</p>
          </div>

          {/* Medallas Especiales (Grandes) */}
          {(trophies.platinum || trophies.diamond) && (
            <div className="grid grid-cols-2 gap-4">
              {trophies.platinum && (
                <div className="glass-dark p-4 rounded-2xl border border-blue-400/30 flex flex-col items-center gap-2 text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-400/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-blue-300 fill-blue-300" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-300 uppercase block">Medalla Platino</span>
                    <span className="text-[8px] text-white/40">6 MESES CUMPLIDOS</span>
                  </div>
                </div>
              )}
              {trophies.diamond && (
                <div className="glass-dark p-4 rounded-2xl border border-cyan-300/30 flex flex-col items-center gap-2 text-center">
                  <div className="h-12 w-12 rounded-full bg-cyan-300/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-cyan-200 fill-cyan-200" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-cyan-200 uppercase block">Medalla Diamante</span>
                    <span className="text-[8px] text-white/40">1 AÑO DE MAESTRÍA</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div className="glass-dark p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-amber-400">{completedDays}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Días</p>
            </div>
            <div className="glass-dark p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-amber-400">{Math.floor(completedDays / 7)}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Semanas</p>
            </div>
            <div className="glass-dark p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-amber-400">{Math.floor(completedDays / 30)}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Meses</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">Tus Trofeos</h3>
            <div className="grid grid-cols-4 gap-3">
              <div className={cn("aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all", 
                trophies.bronze ? "bg-orange-900/20 border-orange-500/40" : "bg-white/5 border-white/5 opacity-30 grayscale")}>
                <Trophy className={cn("h-6 w-6", trophies.bronze ? "text-orange-500" : "text-white/20")} />
                <span className="text-[8px] font-bold uppercase">Bronce</span>
              </div>
              <div className={cn("aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all", 
                trophies.silver ? "bg-slate-400/20 border-slate-300/40" : "bg-white/5 border-white/5 opacity-30 grayscale")}>
                <Trophy className={cn("h-6 w-6", trophies.silver ? "text-slate-300" : "text-white/20")} />
                <span className="text-[8px] font-bold uppercase">Plata</span>
              </div>
              <div className={cn("aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all", 
                trophies.gold ? "bg-amber-500/20 border-amber-400/40" : "bg-white/5 border-white/5 opacity-30 grayscale")}>
                <Trophy className={cn("h-6 w-6", trophies.gold ? "text-amber-400" : "text-white/20")} />
                <span className="text-[8px] font-bold uppercase">Oro</span>
              </div>
              <div className={cn("aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all", 
                trophies.platinum ? "bg-blue-400/20 border-blue-300/40" : "bg-white/5 border-white/5 opacity-30 grayscale")}>
                <Trophy className={cn("h-6 w-6", trophies.platinum ? "text-blue-300" : "text-white/20")} />
                <span className="text-[8px] font-bold uppercase">Platino</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest px-2">Ajustes</h3>
            <div className="glass-dark rounded-xl overflow-hidden">
              <button className="w-full p-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors" onClick={() => setShowVoiceSettings(true)}>
                <div className="flex items-center gap-3">
                  <Mic className="h-5 w-5 text-amber-400" />
                  <span className="text-sm">Voz y Narración</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/30" />
              </button>
              <button className="w-full p-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors border-t border-white/5" onClick={() => setShowAmbientSounds(true)}>
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-amber-400" />
                  <span className="text-sm">Sonidos de Fondo</span>
                </div>
                <ChevronRight className="h-4 w-4 text-white/30" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen h-screen flex flex-col app-background">
      {activeTab === "inicio" && renderHomeTab()}
      {activeTab === "explorar" && renderExploreTab()}
      {activeTab === "misiones" && renderMisionesTab()}
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
            onClick={() => setActiveTab("misiones")}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === "misiones" ? "text-amber-400" : "text-white/40"
            }`}
            data-testid="nav-misiones"
          >
            <Trophy className="h-6 w-6" />
            <span className="text-xs">Misiones</span>
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

      <a 
        href="https://www.skool.com/metodo-medina/about?ref=5410d87590444ff6a99c244493fe47cd"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 left-0 right-0 z-40 flex justify-center px-4 py-1 bg-black/90"
        data-testid="banner-trading-desde-cero"
      >
        <img 
          src={tradingDesdeCeroImg} 
          alt="Trading Desde Cero" 
          className="h-10 object-contain rounded-md"
        />
      </a>

      <CreateMeditationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreateMeditation}
        editingMeditation={editingMeditation}
      />

      <div className={cn("fixed inset-0 z-50 bg-black/80 flex items-end transition-opacity duration-300", showVoiceSettings ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className={cn("w-full max-h-[80vh] overflow-y-auto bg-neutral-900 border-t border-amber-500/20 rounded-t-3xl p-4 space-y-4 transition-transform duration-300 transform", showVoiceSettings ? "translate-y-0" : "translate-y-full")}>
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
            onRestartCurrentSegment={handleRestartCurrentSegment}
          />
        </div>
      </div>

      <div className={cn("fixed inset-0 z-50 bg-black/80 flex items-end transition-opacity duration-300", showAmbientSounds ? "opacity-100" : "opacity-0 pointer-events-none")}>
        <div className={cn("w-full max-h-[80vh] overflow-y-auto bg-neutral-900 border-t border-amber-500/20 rounded-t-3xl p-4 space-y-4 transition-transform duration-300 transform", showAmbientSounds ? "translate-y-0" : "translate-y-full")}>
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
    </div>
  );
}
