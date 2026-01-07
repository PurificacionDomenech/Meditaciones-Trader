# Meditation App for Traders

## Overview

A guided meditation web application designed specifically for traders. The app provides voice-narrated meditation sessions with customizable speech synthesis, ambient sounds, and the ability to create personal meditations. It combines calming meditation aesthetics with professional utility to help traders manage stress, improve focus, control impulses, and build mental resilience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React useState/useRef for local state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for a dark-mode-first, meditation-focused theme
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful JSON API at `/api/*` routes
- **Storage**: Currently uses in-memory storage (MemStorage class) with interfaces designed for easy database migration

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL (schema defined but database not yet connected)
- **Validation**: Zod schemas for both client and server-side validation
- **Schema Location**: `shared/schema.ts` contains shared type definitions and validation schemas

### Key Features Implementation
1. **Speech Synthesis**: Uses Web Speech API for voice narration with configurable speed, pitch, volume, and pause timing
2. **Ambient Sounds**: Web Audio API generates synthetic sounds (oscillators, noise) for meditation backgrounds
3. **Meditation Categories**: Pre-defined meditations organized by trader-specific categories (stress, focus, impulse control, resilience, intuition)
4. **Custom Meditations**: Users can create, edit, and delete personal meditations stored in localStorage

### Design System
- Typography: Cinzel (serif) for headers, Inter/Open Sans for body
- Color scheme: Dark theme with gold accent gradients
- Layout: Two-column desktop layout (420px sidebar + flexible content area), single-column mobile

## External Dependencies

### Core Libraries
- **@tanstack/react-query**: Server state management and API data fetching
- **drizzle-orm** + **drizzle-zod**: Database ORM and schema validation (PostgreSQL ready)
- **express**: HTTP server framework
- **zod**: Runtime type validation

### UI Framework
- **@radix-ui/react-***: Accessible UI primitives (dialog, accordion, select, slider, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Browser APIs Used
- **Web Speech API**: `window.speechSynthesis` for text-to-speech narration
- **Web Audio API**: `AudioContext`, `OscillatorNode` for ambient sound generation
- **localStorage**: Persisting custom meditations and user preferences

### Database (Configured but not active)
- **PostgreSQL**: Target database (requires DATABASE_URL environment variable)
- **connect-pg-simple**: Session storage for PostgreSQL (available for future auth)