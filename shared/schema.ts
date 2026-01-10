import { z } from "zod";

export interface Meditacion {
  id: string;
  titulo: string;
  categoria: string;
  categoriaId: string;
  duracion: string;
  descripcion: string;
  texto: string;
}

export interface MeditacionPersonalizada extends Meditacion {
  createdAt: number;
}

export interface NarrationPreset {
  id: string;
  nombre: string;
  speed: number;
  pitch: number;
  volume: number;
  voiceURI: string;
  pauseBetweenPhrases: number;
  createdAt: number;
}

export interface AmbientSound {
  id: string;
  nombre: string;
  icon: string;
  category: 'oriental' | 'natural' | 'rhythm' | 'relaxing';
  url?: string;
}

export interface SoundPreset {
  id: string;
  nombre: string;
  sounds: Record<string, { active: boolean; volume: number }>;
  createdAt: number;
}

export const insertMeditacionSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  duracion: z.string().min(1, "La duración es requerida"),
  texto: z.string().min(10, "El texto debe tener al menos 10 caracteres"),
  categoria: z.string().optional(),
  categoriaId: z.string().optional(),
});

export type InsertMeditacion = z.infer<typeof insertMeditacionSchema>;

export const insertNarrationPresetSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  speed: z.number().min(0.5).max(1.5),
  pitch: z.number().min(0.5).max(2),
  volume: z.number().min(0).max(1),
  voiceURI: z.string(),
  pauseBetweenPhrases: z.number().min(1).max(10),
});

export type InsertNarrationPreset = z.infer<typeof insertNarrationPresetSchema>;

export const insertSoundPresetSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  sounds: z.record(z.object({
    active: z.boolean(),
    volume: z.number().min(0).max(1),
  })),
});

export type InsertSoundPreset = z.infer<typeof insertSoundPresetSchema>;

export interface TraderMission {
  id: string;
  dia: number;
  titulo: string;
  descripcion: string;
  texto: string;
  cita?: string;
  aplicacionCotidiana?: string;
  meditacionRecomendada?: string;
}

export interface TraderEntry {
  id: string;
  missionId: string;
  date: string;
  content: string;
  completed: boolean;
  createdAt: number;
}

export const insertTraderEntrySchema = z.object({
  missionId: z.string(),
  date: z.string(),
  content: z.string().min(1, "El contenido es requerido"),
  completed: z.boolean().default(true),
});

export type InsertTraderEntry = z.infer<typeof insertTraderEntrySchema>;
