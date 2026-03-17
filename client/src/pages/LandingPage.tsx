import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Heart, Sun, Moon } from "lucide-react";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/5 rounded-full blur-[120px]" />
      
      {/* Contenido principal */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 max-w-4xl px-6 text-center"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-16 h-16 text-[#D4AF37]" />
          </motion.div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
          <span className="block text-white opacity-100 font-extralight tracking-widest">TODO LO QUE TIENES,</span>
          <span className="block gold-text">ES TODO LO QUE NECESITAS</span>
        </h1>

        <div className="glass-dark p-8 md:p-12 rounded-3xl border border-white/10 group-hover:border-[#D4AF37]/40 transition-colors duration-1000 mb-10 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-all duration-1000" />
          
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light italic">
            "Tu búsqueda termina donde comienza tu conciencia. No busques fuera lo que ya florece en tu interior; 
            la abundancia, el amor y la paz no son destinos, son el origen que habita en ti. 
            Esta aplicación es el puente hacia tu propio templo, donde descubrirás que el universo entero late en tu corazón."
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button 
            onClick={() => setLocation("/app")}
            className="h-16 px-10 rounded-full bg-white text-black hover:bg-white/90 text-lg font-semibold transition-all hover:scale-105 active:scale-95 group"
          >
            Comenzar el Viaje
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex gap-4 text-white/40">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Amor Propio</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <Sun className="w-4 h-4" />
              <span className="text-sm">Abundancia</span>
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <Moon className="w-4 h-4" />
              <span className="text-sm">Conciencia</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pie de página sutil */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center text-white/20 text-xs tracking-widest uppercase"
      >
        Psicomagia • IA Espiritual • Meditación • Trascendencia
      </motion.div>
    </div>
  );
}
