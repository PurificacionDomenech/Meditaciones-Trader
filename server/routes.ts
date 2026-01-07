import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeditacionSchema, insertNarrationPresetSchema, insertSoundPresetSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/meditations", async (req, res) => {
    try {
      const meditations = await storage.getMeditations();
      res.json(meditations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meditations" });
    }
  });

  app.get("/api/meditations/:id", async (req, res) => {
    try {
      const meditation = await storage.getMeditation(req.params.id);
      if (!meditation) {
        return res.status(404).json({ error: "Meditation not found" });
      }
      res.json(meditation);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch meditation" });
    }
  });

  app.post("/api/meditations", async (req, res) => {
    try {
      const validated = insertMeditacionSchema.parse(req.body);
      const meditation = await storage.createMeditation({
        titulo: validated.titulo,
        descripcion: validated.descripcion,
        duracion: validated.duracion,
        texto: validated.texto,
        categoria: validated.categoria || "Personalizada",
        categoriaId: validated.categoriaId || "custom",
      });
      res.status(201).json(meditation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create meditation" });
    }
  });

  app.patch("/api/meditations/:id", async (req, res) => {
    try {
      const validated = insertMeditacionSchema.partial().parse(req.body);
      const meditation = await storage.updateMeditation(req.params.id, validated);
      if (!meditation) {
        return res.status(404).json({ error: "Meditation not found" });
      }
      res.json(meditation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update meditation" });
    }
  });

  app.delete("/api/meditations/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteMeditation(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Meditation not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete meditation" });
    }
  });

  app.get("/api/narration-presets", async (req, res) => {
    try {
      const presets = await storage.getNarrationPresets();
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch narration presets" });
    }
  });

  app.post("/api/narration-presets", async (req, res) => {
    try {
      const validated = insertNarrationPresetSchema.parse(req.body);
      const preset = await storage.createNarrationPreset(validated);
      res.status(201).json(preset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create narration preset" });
    }
  });

  app.delete("/api/narration-presets/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteNarrationPreset(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Narration preset not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete narration preset" });
    }
  });

  app.get("/api/sound-presets", async (req, res) => {
    try {
      const presets = await storage.getSoundPresets();
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sound presets" });
    }
  });

  app.post("/api/sound-presets", async (req, res) => {
    try {
      const validated = insertSoundPresetSchema.parse(req.body);
      const preset = await storage.createSoundPreset(validated);
      res.status(201).json(preset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create sound preset" });
    }
  });

  app.delete("/api/sound-presets/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSoundPreset(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Sound preset not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete sound preset" });
    }
  });

  return httpServer;
}
