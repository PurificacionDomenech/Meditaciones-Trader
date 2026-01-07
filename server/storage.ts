import { randomUUID } from "crypto";

export interface Meditacion {
  id: string;
  titulo: string;
  categoria: string;
  categoriaId: string;
  duracion: string;
  descripcion: string;
  texto: string;
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

export interface SoundPreset {
  id: string;
  nombre: string;
  sounds: Record<string, { active: boolean; volume: number }>;
  createdAt: number;
}

export interface IStorage {
  getMeditations(): Promise<Meditacion[]>;
  getMeditation(id: string): Promise<Meditacion | undefined>;
  createMeditation(data: Omit<Meditacion, "id" | "createdAt">): Promise<Meditacion>;
  updateMeditation(id: string, data: Partial<Omit<Meditacion, "id" | "createdAt">>): Promise<Meditacion | undefined>;
  deleteMeditation(id: string): Promise<boolean>;
  
  getNarrationPresets(): Promise<NarrationPreset[]>;
  createNarrationPreset(data: Omit<NarrationPreset, "id" | "createdAt">): Promise<NarrationPreset>;
  deleteNarrationPreset(id: string): Promise<boolean>;
  
  getSoundPresets(): Promise<SoundPreset[]>;
  createSoundPreset(data: Omit<SoundPreset, "id" | "createdAt">): Promise<SoundPreset>;
  deleteSoundPreset(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private meditations: Map<string, Meditacion>;
  private narrationPresets: Map<string, NarrationPreset>;
  private soundPresets: Map<string, SoundPreset>;

  constructor() {
    this.meditations = new Map();
    this.narrationPresets = new Map();
    this.soundPresets = new Map();
  }

  async getMeditations(): Promise<Meditacion[]> {
    return Array.from(this.meditations.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  async getMeditation(id: string): Promise<Meditacion | undefined> {
    return this.meditations.get(id);
  }

  async createMeditation(data: Omit<Meditacion, "id" | "createdAt">): Promise<Meditacion> {
    const id = randomUUID();
    const meditation: Meditacion = {
      ...data,
      id,
      createdAt: Date.now(),
    };
    this.meditations.set(id, meditation);
    return meditation;
  }

  async updateMeditation(id: string, data: Partial<Omit<Meditacion, "id" | "createdAt">>): Promise<Meditacion | undefined> {
    const existing = this.meditations.get(id);
    if (!existing) return undefined;
    
    const updated: Meditacion = { ...existing, ...data };
    this.meditations.set(id, updated);
    return updated;
  }

  async deleteMeditation(id: string): Promise<boolean> {
    return this.meditations.delete(id);
  }

  async getNarrationPresets(): Promise<NarrationPreset[]> {
    return Array.from(this.narrationPresets.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  async createNarrationPreset(data: Omit<NarrationPreset, "id" | "createdAt">): Promise<NarrationPreset> {
    const id = randomUUID();
    const preset: NarrationPreset = {
      ...data,
      id,
      createdAt: Date.now(),
    };
    this.narrationPresets.set(id, preset);
    return preset;
  }

  async deleteNarrationPreset(id: string): Promise<boolean> {
    return this.narrationPresets.delete(id);
  }

  async getSoundPresets(): Promise<SoundPreset[]> {
    return Array.from(this.soundPresets.values()).sort((a, b) => b.createdAt - a.createdAt);
  }

  async createSoundPreset(data: Omit<SoundPreset, "id" | "createdAt">): Promise<SoundPreset> {
    const id = randomUUID();
    const preset: SoundPreset = {
      ...data,
      id,
      createdAt: Date.now(),
    };
    this.soundPresets.set(id, preset);
    return preset;
  }

  async deleteSoundPreset(id: string): Promise<boolean> {
    return this.soundPresets.delete(id);
  }
}

export const storage = new MemStorage();
