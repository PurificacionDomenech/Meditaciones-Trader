import { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heart, Trash2, Waves, Wind, CloudRain, Bird, Flame, Music, Bell, Sparkles, Volume2 } from "lucide-react";
import type { SoundPreset, AmbientSound } from "@shared/schema";

import meditationMp3 from "@assets/custom_sounds/Musica/meditation.mp3";
import alphaMp3 from "@assets/custom_sounds/Musica/alpha-8-to-12-hz-healing-frequencies-222945.mp3";
import hz333Mp3 from "@assets/custom_sounds/Musica/333-hz.mp3";
import pajarosMp3 from "@assets/custom_sounds/pajaros.mp3";
import lluviaMp3 from "@assets/custom_sounds/lluvia.mp3";
import gongMp3 from "@assets/custom_sounds/Gong.mp3";
import campanillasMp3 from "@assets/custom_sounds/campanillas.mp3";
import campanillaMp3 from "@assets/custom_sounds/campanilla.mp3";

const ambientSounds: AmbientSound[] = [
  { id: "custom-campanilla", nombre: "Campanilla", icon: "Bell", category: "oriental", url: campanillaMp3 },
  { id: "custom-campanillas", nombre: "Campanillas", icon: "Bell", category: "oriental", url: campanillasMp3 },
  { id: "custom-gong", nombre: "Gong Personalizado", icon: "Music", category: "oriental", url: gongMp3 },
  { id: "custom-lluvia", nombre: "Lluvia Real", icon: "CloudRain", category: "natural", url: lluviaMp3 },
  { id: "custom-pajaros", nombre: "Pájaros Bosque", icon: "Bird", category: "natural", url: pajarosMp3 },
  { id: "metronome", nombre: "Metrónomo", icon: "Music", category: "rhythm" },
  { id: "music-333", nombre: "333 Hz Healing", icon: "Music", category: "relaxing", url: hz333Mp3 },
  { id: "music-alpha", nombre: "Alpha Waves", icon: "Music", category: "relaxing", url: alphaMp3 },
  { id: "music-meditation", nombre: "Meditación Zen", icon: "Music", category: "relaxing", url: meditationMp3 },
];

const iconMap: Record<string, typeof Bell> = {
  Bell,
  Music,
  Waves,
  Wind,
  CloudRain,
  Bird,
  Flame,
};

interface SoundState {
  active: boolean;
  volume: number;
}

export interface AmbientSoundsRef {
  stopAll: () => void;
}

class AudioGenerator {
  private audioContext: AudioContext | null = null;
  private oscillators: Map<string, { nodes: AudioNode[]; gainNode: GainNode }> = new Map();

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  private createNoiseBuffer(): AudioBuffer {
    const ctx = this.getContext();
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  createWaterSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 800;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.3;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.3;

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("water", { nodes: [noiseNode, lfo, filter], gainNode });
  }

  createWindSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 400;
    filter.Q.value = 0.5;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.1;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 300;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.25;

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("wind", { nodes: [noiseNode, lfo, filter], gainNode });
  }

  createRainSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 1000;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.2;

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("rain", { nodes: [noiseNode, filter], gainNode });
  }

  createOceanSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.3;
    lfo.connect(lfoGain);
    
    const mainGain = ctx.createGain();
    lfoGain.connect(mainGain.gain);
    mainGain.gain.value = volume * 0.35;
    lfo.start();

    noiseNode.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("ocean", { nodes: [noiseNode, lfo, filter], gainNode: mainGain });
  }

  createFireSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 200;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.15;

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("fire", { nodes: [noiseNode, filter], gainNode });
  }

  createNatureSound(volume: number): void {
    const ctx = this.getContext();
    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = this.createNoiseBuffer();
    noiseNode.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 2000;
    filter.Q.value = 1;

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume * 0.1;

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    noiseNode.start();

    this.oscillators.set("nature", { nodes: [noiseNode, filter], gainNode });
  }

  createBirdsSound(volume: number): void {
    this.createNatureSound(volume);
    const existing = this.oscillators.get("nature");
    if (existing) {
      this.oscillators.set("birds", existing);
      this.oscillators.delete("nature");
    }
  }

  createBellSound(id: string, volume: number): void {
    const ctx = this.getContext();
    const frequencies = id.includes("1") ? [523.25, 659.25] : [440, 554.37];
    
    const playBell = () => {
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(volume * 0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + 4);
      });
    };

    playBell();
    const interval = setInterval(playBell, 8000);
    
    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    
    this.oscillators.set(id, { nodes: [], gainNode });
    (this.oscillators.get(id) as any).interval = interval;
  }

  createSingingBowlSound(id: string, volume: number): void {
    const ctx = this.getContext();
    const freq = id.includes("1") ? 256 : 384;

    const playBowl = () => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume * 0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 6);
    };

    playBowl();
    const interval = setInterval(playBowl, 10000);

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;

    this.oscillators.set(id, { nodes: [], gainNode });
    (this.oscillators.get(id) as any).interval = interval;
  }

  createGongSound(volume: number): void {
    const ctx = this.getContext();

    const playGong = () => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = 100;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 8);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 8);
    };

    playGong();
    const interval = setInterval(playGong, 30000);

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;

    this.oscillators.set("gong", { nodes: [], gainNode });
    (this.oscillators.get("gong") as any).interval = interval;
  }

  createMetronomeSound(volume: number): void {
    const ctx = this.getContext();

    const playTick = () => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 1000;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume * 0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    };

    const interval = setInterval(playTick, 1000);

    const gainNode = ctx.createGain();
    gainNode.gain.value = volume;

    this.oscillators.set("metronome", { nodes: [], gainNode });
    (this.oscillators.get("metronome") as any).interval = interval;
  }

  createRelaxingMusic(id: string, volume: number): void {
    const ctx = this.getContext();
    const frequencies = id === "music-zen" ? [220, 277.18, 329.63] : id === "music-space" ? [110, 164.81, 220] : [261.63, 329.63, 392];
    
    const oscillators: OscillatorNode[] = [];
    const mainGain = ctx.createGain();
    mainGain.gain.value = volume * 0.15;

    frequencies.forEach(freq => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.1 + Math.random() * 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      osc.connect(mainGain);
      osc.start();
      lfo.start();
      oscillators.push(osc, lfo);
    });

    mainGain.connect(ctx.destination);
    this.oscillators.set(id, { nodes: oscillators, gainNode: mainGain });
  }

  startSound(id: string, volume: number): void {
    this.stopSound(id);
    
    const soundData = ambientSounds.find(s => s.id === id);
    if (soundData?.url) {
      const ctx = this.getContext();
      const audio = new Audio();
      audio.src = soundData.url;
      audio.crossOrigin = "anonymous";
      
      const source = ctx.createMediaElementSource(audio);
      const gainNode = ctx.createGain();
      
      let multiplier = 0.3;
      if (id.startsWith("music-")) multiplier = 0.15;
      
      gainNode.gain.value = volume * multiplier;
      source.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      audio.loop = true;
      audio.play().catch(err => console.error("Error playing audio:", err));
      
      this.oscillators.set(id, { nodes: [source as any], gainNode, audio } as any);
      return;
    }

    switch (id) {
      case "water":
        this.createWaterSound(volume);
        break;
      case "wind":
        this.createWindSound(volume);
        break;
      case "rain":
        this.createRainSound(volume);
        break;
      case "ocean":
        this.createOceanSound(volume);
        break;
      case "fire":
        this.createFireSound(volume);
        break;
      case "birds":
        this.createBirdsSound(volume);
        break;
      case "bell-1":
      case "bell-2":
        this.createBellSound(id, volume);
        break;
      case "bowl-1":
      case "bowl-2":
        this.createSingingBowlSound(id, volume);
        break;
      case "gong":
        this.createGongSound(volume);
        break;
      case "metronome":
        this.createMetronomeSound(volume);
        break;
      case "music-zen":
      case "music-space":
      case "music-healing":
        this.createRelaxingMusic(id, volume);
        break;
    }
  }

  stopSound(id: string): void {
    const sound = this.oscillators.get(id);
    if (sound) {
      if ((sound as any).audio) {
        (sound as any).audio.pause();
        (sound as any).audio.src = "";
      }
      sound.nodes.forEach(node => {
        try {
          if ((node as any).stop) (node as any).stop();
          node.disconnect();
        } catch {}
      });
      if ((sound as any).interval) {
        clearInterval((sound as any).interval);
      }
      this.oscillators.delete(id);
    }
  }

  setVolume(id: string, volume: number): void {
    const sound = this.oscillators.get(id);
    if (sound) {
      // Adjusted scaling to match the specific sound multipliers
      let multiplier = 0.3;
      if (id === "water") multiplier = 0.3;
      else if (id === "wind") multiplier = 0.25;
      else if (id === "rain") multiplier = 0.2;
      else if (id === "ocean") multiplier = 0.35;
      else if (id === "fire") multiplier = 0.15;
      else if (id === "nature" || id === "birds") multiplier = 0.1;
      else if (id.startsWith("music-")) multiplier = 0.15;
      else if (id === "gong") multiplier = 0.5;
      
      sound.gainNode.gain.setTargetAtTime(volume * multiplier, this.getContext().currentTime, 0.1);
    }
  }

  stopAll(): void {
    this.oscillators.forEach((_, id) => this.stopSound(id));
  }
}

export const AmbientSounds = forwardRef<AmbientSoundsRef>((_, ref) => {
  const [sounds, setSounds] = useState<Record<string, SoundState>>(() =>
    ambientSounds.reduce((acc, s) => ({ ...acc, [s.id]: { active: false, volume: 0.5 } }), {})
  );
  const [presets, setPresets] = useState<SoundPreset[]>([]);
  const [presetName, setPresetName] = useState("");
  const audioRef = useRef<AudioGenerator | null>(null);

  useEffect(() => {
    audioRef.current = new AudioGenerator();
    const saved = localStorage.getItem("soundPresets");
    if (saved) setPresets(JSON.parse(saved));

    return () => {
      audioRef.current?.stopAll();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    stopAll: () => {
      audioRef.current?.stopAll();
      setSounds(prev => 
        Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, { ...v, active: false }]))
      );
    }
  }));

  const toggleSound = useCallback((id: string) => {
    setSounds(prev => {
      const newState = { ...prev, [id]: { ...prev[id], active: !prev[id].active } };
      if (newState[id].active) {
        audioRef.current?.startSound(id, newState[id].volume);
      } else {
        audioRef.current?.stopSound(id);
      }
      return newState;
    });
  }, []);

  const changeVolume = useCallback((id: string, volume: number) => {
    setSounds(prev => {
      const newState = { ...prev, [id]: { ...prev[id], volume } };
      if (newState[id].active) {
        audioRef.current?.setVolume(id, volume);
      }
      return newState;
    });
  }, []);

  const savePreset = useCallback(() => {
    if (!presetName.trim()) return;
    
    const newPreset: SoundPreset = {
      id: crypto.randomUUID(),
      nombre: presetName.trim(),
      sounds,
      createdAt: Date.now(),
    };
    
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem("soundPresets", JSON.stringify(updated));
    setPresetName("");
  }, [presetName, sounds, presets]);

  const loadPreset = (preset: SoundPreset) => {
    audioRef.current?.stopAll();
    setSounds(preset.sounds);
    Object.entries(preset.sounds).forEach(([id, state]) => {
      if (state.active) {
        audioRef.current?.startSound(id, state.volume);
      }
    });
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    setPresets(updated);
    localStorage.setItem("soundPresets", JSON.stringify(updated));
  };

  const orientalSounds = ambientSounds.filter(s => s.category === "oriental");
  const naturalSounds = ambientSounds.filter(s => s.category === "natural");
  const relaxingMusic = ambientSounds.filter(s => s.category === "relaxing");

  const renderSoundItem = (sound: AmbientSound) => {
    const Icon = iconMap[sound.icon] || Music;
    const state = sounds[sound.id];
    
    return (
      <div
        key={sound.id}
        className="flex items-center justify-between gap-3 py-2"
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Switch
            checked={state.active}
            onCheckedChange={() => toggleSound(sound.id)}
            data-testid={`switch-sound-${sound.id}`}
          />
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="text-xs truncate">{sound.nombre}</span>
        </div>
        <div className="w-20 flex-shrink-0">
          <Slider
            value={[state.volume]}
            onValueChange={([v]) => changeVolume(sound.id, v)}
            min={0}
            max={1}
            step={0.05}
            disabled={!state.active}
            data-testid={`slider-sound-${sound.id}`}
            className="cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-lg uppercase tracking-wider gold-text">
          Sonidos Ambientales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="multiple" className="space-y-2">
          <AccordionItem value="ambient" className="border-white/10">
            <AccordionTrigger className="text-sm hover:no-underline py-2">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-amber-400" />
                <span>Sonidos Ambientales</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              {[...orientalSounds, ...naturalSounds, ambientSounds.find(s => s.id === "metronome")].filter(Boolean).map(s => renderSoundItem(s!))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="relaxing" className="border-white/10">
            <AccordionTrigger className="text-sm hover:no-underline py-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>Música Relajante</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              {relaxingMusic.map(renderSoundItem)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Label className="text-xs text-muted-foreground">Guardar Combinación</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Nombre del preset"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              data-testid="input-sound-preset-name"
              className="bg-background/50 text-sm"
            />
            <Button
              size="icon"
              variant="secondary"
              onClick={savePreset}
              disabled={!presetName.trim()}
              data-testid="button-save-sound-preset"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {presets.length > 0 && (
            <div className="space-y-2 max-h-24 overflow-y-auto">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-md bg-background/30"
                >
                  <button
                    onClick={() => loadPreset(preset)}
                    className="text-xs text-left flex-1 hover:text-amber-400 transition-colors"
                    data-testid={`button-load-sound-preset-${preset.id}`}
                  >
                    {preset.nombre}
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deletePreset(preset.id)}
                    className="h-6 w-6"
                    data-testid={`button-delete-sound-preset-${preset.id}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

AmbientSounds.displayName = "AmbientSounds";
