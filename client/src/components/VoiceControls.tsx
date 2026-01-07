import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Heart, Trash2, Volume2, Gauge, Music2, Timer } from "lucide-react";
import type { NarrationPreset } from "@shared/schema";

interface VoiceControlsProps {
  speed: number;
  pitch: number;
  volume: number;
  pauseBetweenPhrases: number;
  selectedVoice: string;
  onSpeedChange: (value: number) => void;
  onPitchChange: (value: number) => void;
  onVolumeChange: (value: number) => void;
  onPauseChange: (value: number) => void;
  onVoiceChange: (value: string) => void;
}

interface GroupedVoices {
  female: SpeechSynthesisVoice[];
  male: SpeechSynthesisVoice[];
  other: SpeechSynthesisVoice[];
}

const femaleNames = [
  "laura", "mónica", "paulina", "marisol", "elena", "francisca", 
  "angelica", "carmen", "lucia", "sofia", "maria", "ana", "rosa",
  "isabel", "marta", "cristina", "andrea", "beatriz", "gloria",
  "microsoft helena", "microsoft sabina", "google español"
];

const maleNames = [
  "jorge", "juan", "diego", "carlos", "miguel", "pablo", "andres",
  "antonio", "manuel", "jose", "francisco", "david", "daniel",
  "microsoft pablo", "microsoft raul"
];

function getVoiceGender(voice: SpeechSynthesisVoice): "female" | "male" | "other" {
  const name = voice.name.toLowerCase();
  if (femaleNames.some(n => name.includes(n))) return "female";
  if (maleNames.some(n => name.includes(n))) return "male";
  return "other";
}

function getVoiceCountry(voice: SpeechSynthesisVoice): string {
  const lang = voice.lang.toLowerCase();
  if (lang.includes("es-mx")) return "Mexico";
  if (lang.includes("es-es")) return "Espana";
  if (lang.includes("es-ar")) return "Argentina";
  if (lang.includes("es-co")) return "Colombia";
  if (lang.includes("es-cl")) return "Chile";
  if (lang.includes("es-pe")) return "Peru";
  if (lang.includes("es-ve")) return "Venezuela";
  if (lang.includes("es-us")) return "US";
  if (lang.includes("es")) return "Espanol";
  return voice.lang;
}

function getCleanVoiceName(voice: SpeechSynthesisVoice): string {
  let name = voice.name;
  name = name.replace(/Microsoft /i, "").replace(/ Online \(Natural\)/i, "");
  name = name.replace(/Google /i, "");
  return name.split(" ")[0];
}

export function VoiceControls({
  speed,
  pitch,
  volume,
  pauseBetweenPhrases,
  selectedVoice,
  onSpeedChange,
  onPitchChange,
  onVolumeChange,
  onPauseChange,
  onVoiceChange,
}: VoiceControlsProps) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [presets, setPresets] = useState<NarrationPreset[]>([]);
  const [presetName, setPresetName] = useState("");

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const spanishVoices = allVoices.filter(v => 
        v.lang.toLowerCase().startsWith("es")
      );
      setVoices(spanishVoices.length > 0 ? spanishVoices : allVoices.slice(0, 10));
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    const saved = localStorage.getItem("narrationPresets");
    if (saved) setPresets(JSON.parse(saved));

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const groupedVoices: GroupedVoices = voices.reduce(
    (acc, voice) => {
      const gender = getVoiceGender(voice);
      acc[gender].push(voice);
      return acc;
    },
    { female: [], male: [], other: [] } as GroupedVoices
  );

  const savePreset = useCallback(() => {
    if (!presetName.trim()) return;
    
    const newPreset: NarrationPreset = {
      id: crypto.randomUUID(),
      nombre: presetName.trim(),
      speed,
      pitch,
      volume,
      voiceURI: selectedVoice,
      pauseBetweenPhrases,
      createdAt: Date.now(),
    };
    
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem("narrationPresets", JSON.stringify(updated));
    setPresetName("");
  }, [presetName, speed, pitch, volume, selectedVoice, pauseBetweenPhrases, presets]);

  const loadPreset = (preset: NarrationPreset) => {
    onSpeedChange(preset.speed);
    onPitchChange(preset.pitch);
    onVolumeChange(preset.volume);
    onVoiceChange(preset.voiceURI);
    onPauseChange(preset.pauseBetweenPhrases);
  };

  const deletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id);
    setPresets(updated);
    localStorage.setItem("narrationPresets", JSON.stringify(updated));
  };

  return (
    <Card className="glass-card">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-lg uppercase tracking-wider gold-text">
          Controles de Narración
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Gauge className="h-3.5 w-3.5" />
                Velocidad
              </Label>
              <span className="text-xs text-muted-foreground">{speed.toFixed(2)}x</span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={([v]) => onSpeedChange(v)}
              min={0.5}
              max={1.5}
              step={0.05}
              data-testid="slider-speed"
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Music2 className="h-3.5 w-3.5" />
                Tono
              </Label>
              <span className="text-xs text-muted-foreground">{pitch.toFixed(1)}</span>
            </div>
            <Slider
              value={[pitch]}
              onValueChange={([v]) => onPitchChange(v)}
              min={0.5}
              max={2}
              step={0.1}
              data-testid="slider-pitch"
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Volume2 className="h-3.5 w-3.5" />
                Volumen
              </Label>
              <span className="text-xs text-muted-foreground">{Math.round(volume * 100)}%</span>
            </div>
            <Slider
              value={[volume]}
              onValueChange={([v]) => onVolumeChange(v)}
              min={0}
              max={1}
              step={0.05}
              data-testid="slider-volume"
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="h-3.5 w-3.5" />
                Pausa entre frases
              </Label>
              <span className="text-xs text-muted-foreground">{pauseBetweenPhrases}s</span>
            </div>
            <Slider
              value={[pauseBetweenPhrases]}
              onValueChange={([v]) => onPauseChange(v)}
              min={1}
              max={10}
              step={1}
              data-testid="slider-pause"
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Voz</Label>
          <Select value={selectedVoice} onValueChange={onVoiceChange}>
            <SelectTrigger data-testid="select-voice" className="bg-background/50">
              <SelectValue placeholder="Selecciona una voz" />
            </SelectTrigger>
            <SelectContent>
              {groupedVoices.female.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Femeninas
                  </div>
                  {groupedVoices.female.map((voice) => (
                    <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                      {getCleanVoiceName(voice)} - {getVoiceCountry(voice)}
                    </SelectItem>
                  ))}
                </>
              )}
              {groupedVoices.male.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Masculinas
                  </div>
                  {groupedVoices.male.map((voice) => (
                    <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                      {getCleanVoiceName(voice)} - {getVoiceCountry(voice)}
                    </SelectItem>
                  ))}
                </>
              )}
              {groupedVoices.other.length > 0 && (
                <>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                    Otras
                  </div>
                  {groupedVoices.other.map((voice) => (
                    <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                      {getCleanVoiceName(voice)} - {getVoiceCountry(voice)}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="border-t border-white/10 pt-4 space-y-3">
          <Label className="text-xs text-muted-foreground">Guardar Configuración</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Nombre del preset"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              data-testid="input-preset-name"
              className="bg-background/50 text-sm"
            />
            <Button
              size="icon"
              variant="secondary"
              onClick={savePreset}
              disabled={!presetName.trim()}
              data-testid="button-save-preset"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {presets.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-md bg-background/30"
                >
                  <button
                    onClick={() => loadPreset(preset)}
                    className="text-xs text-left flex-1 hover:text-amber-400 transition-colors"
                    data-testid={`button-load-preset-${preset.id}`}
                  >
                    {preset.nombre}
                  </button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deletePreset(preset.id)}
                    className="h-6 w-6"
                    data-testid={`button-delete-preset-${preset.id}`}
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
}
