# Aplicación de Meditación para Traders

## Resumen

Una aplicación web de meditación guiada diseñada específicamente para traders. La aplicación proporciona sesiones de meditación narradas por voz con síntesis de voz personalizable, sonidos ambientales y la capacidad de crear meditaciones personales. Combina una estética de meditación relajante con utilidad profesional para ayudar a los traders a gestionar el estrés, mejorar la concentración, controlar los impulsos y desarrollar resiliencia mental.

## Preferencias del Usuario

Estilo de comunicación preferido: Lenguaje sencillo y cotidiano.

## Arquitectura del Sistema

### Arquitectura del Frontend
- **Framework**: React 18 con TypeScript
- **Enrutamiento**: Wouter (enrutador React ligero)
- **Gestión de Estado**: TanStack React Query para el estado del servidor, React useState/useRef para el estado local
- **Componentes de UI**: Biblioteca de componentes shadcn/ui basada en primitivas de Radix UI
- **Estilo**: Tailwind CSS con tokens de diseño personalizados para un tema enfocado en la meditación, priorizando el modo oscuro
- **Herramienta de Construcción**: Vite con plugin de React

### Arquitectura del Backend
- **Entorno de ejecución**: Node.js con Express
- **Lenguaje**: TypeScript con módulos ESM
- **Patrón de API**: API JSON RESTful en rutas `/api/*`
- **Almacenamiento**: Actualmente utiliza almacenamiento en memoria (clase MemStorage) con interfaces diseñadas para una fácil migración a base de datos

### Capa de Datos
- **ORM**: Drizzle ORM configurado para PostgreSQL (esquema definido pero base de datos aún no conectada)
- **Validación**: Esquemas Zod para validación tanto en el cliente como en el servidor
- **Ubicación del Esquema**: `shared/schema.ts` contiene definiciones de tipos compartidos y esquemas de validación

### Implementación de Características Clave
1. **Síntesis de Voz**: Utiliza la Web Speech API para la narración de voz con velocidad, tono, volumen y tiempos de pausa configurables.
2. **Sonidos Ambientales**: La Web Audio API genera sonidos sintéticos (osciladores, ruido) para los fondos de meditación.
3. **Categorías de Meditación**: Meditaciones predefinidas organizadas por categorías específicas para traders (estrés, enfoque, control de impulsos, resiliencia, intuición).
4. **Misiones Trader**: Un currículo de 31 días con retos simbólicos y físicos diseñados para transformar la psicología del trader (ej. el ritual del reset, la caja de Pandora, caminata de pérdida).
5. **Meditaciones Personalizadas**: Los usuarios pueden crear, editar y eliminar meditaciones personales almacenadas en localStorage.

### Sistema de Diseño
- Tipografía: Cinzel (serif) para encabezados, Inter/Open Sans para el cuerpo.
- Esquema de colores: Tema oscuro con gradientes de acento dorados.
- Diseño: Diseño de escritorio de dos columnas (barra lateral de 420px + área de contenido flexible), columna única en móviles.

## Dependencias Externas

### Librerías Core
- **@tanstack/react-query**: Gestión de estado del servidor y obtención de datos de API.
- **drizzle-orm** + **drizzle-zod**: ORM de base de datos y validación de esquemas (listo para PostgreSQL).
- **express**: Framework de servidor HTTP.
- **zod**: Validación de tipos en tiempo de ejecución.

### Framework de UI
- **@radix-ui/react-***: Primitivas de UI accesibles (diálogo, acordeón, selección, deslizador, etc.)
- **tailwindcss**: Framework de CSS basado en utilidades.
- **class-variance-authority**: Gestión de variantes de componentes.
- **lucide-react**: Librería de iconos.

### APIs del Navegador Utilizadas
- **Web Speech API**: `window.speechSynthesis` para narración de texto a voz.
- **Web Audio API**: `AudioContext`, `OscillatorNode` para generación de sonido ambiental.
- **localStorage**: Persistencia de meditaciones personalizadas y preferencias de usuario.

### Base de Datos (Configurada pero no activa)
- **PostgreSQL**: Base de datos objetivo (requiere la variable de entorno DATABASE_URL).
- **connect-pg-simple**: Almacenamiento de sesiones para PostgreSQL (disponible para futura autenticación).
