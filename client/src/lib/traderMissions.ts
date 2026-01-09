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

export const TRADER_MISSIONS: TraderMission[] = [
  {
    id: "mision-1",
    dia: 1,
    titulo: "La Semilla del Mes",
    descripcion: "Escribe tu propósito principal para estas 30 misiones. Sé específico y guárdalo.",
    texto: `Bienvenido, futuro trader. Hoy siembras la semilla de tu disciplina. No es un deseo, es un compromiso. Escribe aquí, con la claridad de un contrato, tu propósito principal para estas 30 misiones. Sé específico. ¿Qué vas a lograr? ¿Qué hábito vas a forjar? ¿Qué debilidad vas a transformar? Guárdalo. Lo necesitarás.`, 
    cita: "La disciplina es el puente entre metas y logros. — Jim Rohn",
    aplicacionCotidiana: "**Cama hecha:** Haz tu cama al levantarte para sellar tu primer compromiso del día. Pequeñas victorias construyen grandes hábitos.",
    meditacionRecomendada: "fundamento-1",
  },
  {
    id: "mision-2",
    dia: 2,
    titulo: "El Mapa del Año",
    descripcion: "Proyecta tu 'Yo Trader' dentro de 365 misiones. ¿Cómo operas? ¿Cómo te sientes?",
    texto: `Hoy, eleva tu mirada. No mires el gráfico, mira el horizonte. Proyecta tu 'Yo Trader' dentro de 365 misiones. No solo pienses en números, piensa en quién serás. ¿Cómo operas? ¿Cómo te sientes ante el mercado? ¿Qué tipo de decisiones tomas? Escribe tu visión. Este es tu mapa. Lo revisaremos al final del camino.`, 
    cita: "No te preocupes por lo que el mercado va a hacer, preocúpate por lo que tú vas a hacer. — Bruce Kovner",
    aplicacionCotidiana: "**Ropa lista:** Prepara tu ropa de mañana hoy; planifica tu éxito desde los detalles. La anticipación reduce el estrés.",
    meditacionRecomendada: "fundamento-3",
  },
  {
    id: "mision-3",
    dia: 3,
    titulo: "El Bautismo del Papel",
    descripcion: "Transforma el trauma emocional de la pérdida en sabiduría técnica con un ejercicio de psicomagia.",
    texto: `Recuerda tu peor pérdida. Esa que te quemó, que te dolió. Escríbela en un papel. Cada detalle, cada emoción. Ahora, llévalo al agua. Sumérgelo. Deja que la tinta se disuelva, que el dolor se borre. Cuando el papel esté seco, sobre ese mismo papel, escribe la lección técnica que te dejó. Guárdalo. Es tu primer trofeo de alquimia emocional.`, 
    cita: "Aceptar la pérdida es la mayor victoria del trader. — Victor Sperandeo",
    aplicacionCotidiana: "**Vaso de agua:** Bebe un vaso de agua visualizando que limpias una culpa o error pasado. Simboliza la purificación.",
    meditacionRecomendada: "escudo-3",
  },
  {
    id: "mision-4",
    dia: 4,
    titulo: "El Código de Honor",
    descripcion: "Escribe tus 3 reglas de oro de trading inquebrantables. Son tu brújula.",
    texto: `Todo trader que perdura tiene un código. Unas reglas inquebrantables. Hoy, escribe tus 3 reglas de oro de trading. Esas que JAMÁS vas a romper, pase lo que pase. No son sugerencias, son mandamientos. Léelas en voz alta. Si no puedes cumplirlas, no tienes un plan, tienes una lista de deseos. Guárdalas. Son tu brújula.`, 
    cita: "Sin reglas, el trading es solo azar. — Jesse Livermore",
    aplicacionCotidiana: "**Reglas de Mesa:** No uses el móvil mientras comes hoy. Respeta tus propios límites y reglas en tu vida diaria.",
    meditacionRecomendada: "fundamento-2",
  },
  {
    id: "mision-5",
    dia: 5,
    titulo: "El Voto de Silencio",
    descripcion: "Opera y registra en silencio absoluto, sin buscar validación externa.",
    texto: `Hoy, tras tu sesión de trading, haz un voto de silencio. Prohibido hablar de trading en redes, foros o con amigos. No busques validación externa. Opera, registra y cierra en silencio absoluto. Al final del día, escribe cómo te sentiste en esa soledad. ¿Hubo ansiedad? ¿Paz? ¿Qué te dijo tu voz interior?`, 
    cita: "El mercado premia al que sabe callar y observar. — Warren Buffett",
    aplicacionCotidiana: "**Trayecto en silencio:** Conduce o camina hoy sin música ni podcasts; escucha tu voz interior y tus pensamientos.",
    meditacionRecomendada: "cafe-4",
  },
  {
    id: "mision-6",
    dia: 6,
    titulo: "La Regla de Rafa (2-1)",
    descripcion: "Aplica el límite: Máximo 2 operaciones. Si la primera es roja, fin del día.",
    texto: `Hoy aplicas la regla de oro de tu mentor: Máximo 2 operaciones. Si la primera es roja, el portátil se cierra inmediatamente. Sin excepciones. No hay 'una más'. No hay 'recuperar'. Es una prueba de fuego para tu disciplina. Al final del día, escribe si lograste cerrar el portátil. La honestidad es tu mayor activo.`, 
    cita: "El objetivo de un trader exitoso es hacer los mejores trades. El dinero es secundario. — Alexander Elder",
    aplicacionCotidiana: "**Límite de Dulce:** Si te apetece algo dulce, toma solo uno. Si no es perfecto, no tomes más. Practica el 'suficiente' en tu vida.",
    meditacionRecomendada: "escudo-1",
  },
  {
    id: "mision-7",
    dia: 7,
    titulo: "El Anclaje de Calma",
    descripcion: "Crea un interruptor físico para entrar en estado de 'Neutralidad' emocional.",
    texto: `Tu mente es un interruptor. Hoy, vamos a crear un anclaje. Elige un gesto físico discreto (ej. presionar el pulgar contra el índice, tocarte la muñeca). Cada vez que lo hagas, visualiza tu mejor trade, ese momento de calma y claridad. Úsalo 10 veces hoy, antes de cada decisión importante (incluso fuera del trading). Escribe cómo te sentiste al activarlo.`, 
    cita: "La confianza no es saber que vas a ganar, es saber que estarás bien si pierdes. — Anónimo",
    aplicacionCotidiana: "**Anclaje de Llaves:** Cada vez que toques tus llaves hoy, respira profundamente y siente 'control' y 'calma'.",
    meditacionRecomendada: "fundamento-4",
  },
  {
    id: "mision-8",
    dia: 8,
    titulo: "Caza de Errores",
    descripcion: "Identifica tu error más repetido y ponle un nombre gracioso para quitarle peso emocional.",
    texto: `Revisa tus trades de la última semana. No busques culpas, busca patrones. Identifica el error más repetido. Ahora, ponle un nombre gracioso (ej. 'El Fantasma del FOMO', 'El Monstruo de la Venganza'). Escribe cómo se llama tu error y qué te dice. Al nombrarlo, le quitas poder.`, 
    cita: "Los errores son los mejores maestros, si tienes el valor de admitirlos. — Ray Dalio",
    aplicacionCotidiana: "**Etiqueta el Caos:** Si algo sale mal hoy (ej. se cae algo), dile: '¡Hola, [nombre gracioso]!' y ríete. Desdramatiza.",
    meditacionRecomendada: "cafe-3",
  },
  {
    id: "mision-9",
    dia: 9,
    titulo: "El Espejo Racional",
    descripcion: "Graba o escribe por qué vas a entrar en un trade. Si suena emocional, no entres.",
    texto: `Antes de abrir una operación, haz esto: graba un audio de 1 minuto (o escríbelo) explaining por qué vas a entrar en ese trade. Escúchalo (o léelo). Si detectas en tu voz o en tus palabras un atisbo de miedo, avaricia, prisa o necesidad, NO entres. Cierra la operación. Escribe qué detectaste y qué decisión tomaste.`, 
    cita: "En el trading, lo que parece más difícil es lo que suele ser correcto. — Dennis Gartman",
    aplicacionCotidiana: "**Audio-Gasto:** Antes de comprar algo hoy, graba un audio explicando por qué lo necesitas. Si suena impulsivo, no lo compres.",
    meditacionRecomendada: "cafe-6",
  },
  {
    id: "mision-10",
    dia: 10,
    titulo: "Primer Espejo: La Semilla y el Guerrero",
    descripcion: "Evalúa la coherencia entre tu propósito (Misión 1) y tus acciones de estos 10 días.",
    texto: `Hoy es un día de balance. Vuelve a la Misión 1 y lee tu propósito para este mes. Ahora, mira tus acciones de estos 10 días. ¿Has sido leal a esa semilla que sembraste? ¿Tus decisiones han abonado tu crecimiento o lo han pisoteado? Escribe tu verdad. Sin filtros. Y si es necesario, ajusta tu rumbo. El trader maduro se corrige a sí mismo.`, 
    cita: "La consistencia es el resultado de la disciplina mental. — Mark Douglas",
    aplicacionCotidiana: "**Balance de Nevera:** Revisa qué comida compraste y qué comiste. ¿Fuiste fiel a tu plan de alimentación?",
    meditacionRecomendada: "cafe-1",
  },
  {
    id: "mision-11",
    dia: 11,
    titulo: "El Ayuno de Gráficos",
    descripcion: "Desconéctate del mercado por un día y registra la ansiedad que sientes.",
    texto: `Hoy, tras tu sesión de trading (o si no operas, después de tu análisis), prohíbete mirar el precio el resto del día. Cierra las plataformas, apaga las notificaciones. Registra la ansiedad, la curiosidad, la 'necesidad' de saber que sientes. ¿Puedes desconectar? Escribe tus sensaciones. La libertad está en el desapego.`, 
    cita: "La paciencia es una de las virtudes más importantes en el trading. — George Soros",
    aplicacionCotidiana: "**Ayuno de Redes:** Desconéctate de tus redes sociales favoritas por unas horas. Observa la 'necesidad' de revisar.",
    meditacionRecomendada: "vision-2",
  },
  {
    id: "mision-12",
    dia: 12,
    titulo: "El Guardián del Capital",
    descripcion: "Revisa tu gestión de riesgo actual. ¿Es coherente con tu capital hoy?",
    texto: `Revisa tu gestión de riesgo actual. ¿Es coherente con el capital que tienes HOY? ¿Tu stop loss es un número fijo o una decisión emocional? Escribe tu plan de gestión de riesgo en detalle. Este es el escudo de tu capital. Sin él, estás operando a ciegas. ¿Estás dispuesto a protegerlo?`, 
    cita: "La regla número uno es no perder dinero. La regla número dos es no olvidar la regla número uno. — Warren Buffett",
    aplicacionCotidiana: "**Presupuesto Personal:** Revisa tus gastos del día. ¿Son coherentes con tu presupuesto o son decisiones emocionales?",
    meditacionRecomendada: "cafe-5",
  },
  {
    id: "mision-13",
    dia: 13,
    titulo: "La Voz del Saboteador",
    descripcion: "Identifica y neutraliza los pensamientos auto-saboteadores que te impulsan a operar mal.",
    texto: `Todos tenemos una voz interior que nos sabotea. Esa que dice 'una operación más', 'mueve el stop', 'recupera la pérdida'. Hoy, sé consciente de esa voz. Cada vez que aparezca, escríbela. No la juzgues, solo regístrala. Al final del día, revisa tu lista. Conocer a tu enemigo es el primer paso para vencerlo.`, 
    cita: "Tu mayor enemigo en el mercado eres tú mismo. — Jack D. Schwager",
    aplicacionCotidiana: "**Diario de Pensamientos:** Anota 3 pensamientos negativos recurrentes que tengas hoy. Solo obsérvalos, sin juzgar.",
    meditacionRecomendada: "escudo-4",
  },
  {
    id: "mision-14",
    dia: 14,
    titulo: "El Ritual de Cierre",
    descripcion: "Crea un cierre consciente para cada sesión de trading, soltando el resultado.",
    texto: `Cierra tu sesión de trading con un ritual. Puede ser una respiración profunda, un estiramiento, o simplemente apagar el monitor con una frase como 'El trabajo está hecho'. El objetivo es soltar el resultado del día. No te lleves el mercado a casa. Escribe tu ritual y cómo te ayuda a desconectar.`, 
    cita: "Deja que el mercado se quede en el mercado. — Rafa (tu mentor)",
    aplicacionCotidiana: "**Cierre de Jornada:** Al terminar tu trabajo o estudios, haz un pequeño ritual (ej. guardar todo, estirar) y di: 'El trabajo está hecho'.",
    meditacionRecomendada: "fundamento-4",
  },
  {
    id: "mision-15",
    dia: 15,
    titulo: "Segundo Espejo: El Código y el Saboteador",
    descripcion: "Evalúa la lealtad a tu Código de Honor (Misión 4) y la influencia de tu saboteador (Misión 13).",
    texto: `Vuelve a la Misión 4 (Tu Código de Honor). ¿Has roto alguna de tus reglas en estos 15 días? Si es así, escribe por qué permitiste que tu ego o tu saboteador ganaran a tu razón. Ahora, vuelve a la Misión 13 (La Voz del Saboteador). ¿Qué patrones ves? ¿Cómo puedes fortalecer tu escudo contra esa voz? Este es tu momento de ajuste.`, 
    cita: "La autoconciencia es el primer paso para cualquier cambio. — Anónimo",
    aplicacionCotidiana: "**Balance de Rutina:** Revisa si has cumplido tus hábitos diarios básicos esta semana.",
    meditacionRecomendada: "maestria-1",
  }
];

export const getMissionByDay = (day: number): TraderMission | undefined => {
  return TRADER_MISSIONS.find((m) => m.dia === day);
};

export const getTotalMissions = (): number => {
  return TRADER_MISSIONS.length;
};
