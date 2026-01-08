export interface TraderMission {
  id: string;
  dia: number;
  semana: number;
  trimestre: number;
  titulo: string;
  objetivo: string;
  reto: string;
  porQueFunciona: string;
  aplicacionCotidiana: string;
  categoria: string;
}

export const TRADER_MISSIONS: TraderMission[] = [
  {
    id: "1",
    dia: 1,
    semana: 1,
    trimestre: 1,
    titulo: "El Experimento del Silencio",
    objetivo: "Aprender a observar sin necesidad de actuar",
    reto: "Hoy, NO abras tu plataforma de trading. En su lugar, observa el mercado por 30 minutos (gráficos, noticias, análisis). Anota 5 operaciones que HUBIERAS hecho. Para cada una, pregúntate: ¿Por qué? ¿Tengo un plan? ¿Cuál es mi riesgo?",
    porQueFunciona: "Mark Douglas enseña que la mayoría de traders operan por emoción, no por plan. Este ejercicio te separa de la acción impulsiva. Observar sin actuar es el primer paso para tomar decisiones racionales.",
    aplicacionCotidiana: "Hoy, en cualquier situación donde sientas el impulso de actuar (comprar algo, decir algo, hacer algo), espera 5 minutos. Solo observa. Luego decide.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "2",
    dia: 2,
    semana: 1,
    trimestre: 1,
    titulo: "El Juego de la Paciencia",
    objetivo: "Entrenar la tolerancia a la espera",
    reto: "Elige algo que normalmente haces rápido (desayunar, responder mensajes, revisar redes). Hoy, hazlo en DOBLE tiempo. Mastica lentamente. Lee cada mensaje antes de responder. Observa cada publicación. Nota cómo se siente la paciencia.",
    porQueFunciona: "Los traders impulsivos operan demasiado rápido. El mercado premia la paciencia. Este ejercicio entrena tu sistema nervioso a tolerar la espera.",
    aplicacionCotidiana: "Cada acción lenta es una victoria contra la impulsividad.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "3",
    dia: 3,
    semana: 1,
    trimestre: 1,
    titulo: "El Observador Neutral",
    objetivo: "Separar la observación de la emoción",
    reto: "Observa a alguien operando (si puedes) o mira un video de trading en vivo. Anota TODO lo que ves: entradas, salidas, emociones visibles, errores. NO juzgues. Solo observa como un científico. Pregúntate: ¿Qué emociones veo? ¿Cuáles son los errores psicológicos?",
    porQueFunciona: "Es más fácil ver los errores en otros que en ti mismo. Este ejercicio desarrolla la capacidad de observación objetiva que necesitas para tu propio trading.",
    aplicacionCotidiana: "Hoy, observa a las personas a tu alrededor sin juzgar. Solo nota sus comportamientos.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "4",
    dia: 4,
    semana: 1,
    trimestre: 1,
    titulo: "El Diario del Miedo",
    objetivo: "Identificar tus miedos específicos",
    reto: "Escribe los 5 miedos que más te paralizan en trading. Para cada uno, escribe: ¿De dónde viene? ¿Cuándo empezó? ¿Es real o imaginado? Ejemplo: 'Miedo a perder $100 en una operación' - ¿De dónde viene? Perdí $500 hace 6 meses - ¿Es real? Sí, pero mi plan de riesgo evita pérdidas mayores a $50",
    porQueFunciona: "Van Tharp dice que las creencias limitantes son invisibles hasta que las escribes. Una vez escritas, pierden poder.",
    aplicacionCotidiana: "Identifica un miedo cotidiano (no trading). Escribe su origen. Cuestiona su validez.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "5",
    dia: 5,
    semana: 1,
    trimestre: 1,
    titulo: "El Experimento de la Pausa",
    objetivo: "Crear espacio entre estímulo y respuesta",
    reto: "Hoy, antes de CUALQUIER decisión (trading o no), haz una pausa de 10 segundos. Respira profundo 3 veces. Pregúntate: ¿Es esta mi decisión racional o mi emoción? Luego actúa.",
    porQueFunciona: "Viktor Frankl dijo: 'Entre el estímulo y la respuesta hay un espacio. En ese espacio está nuestro poder'. Los traders ganadores viven en ese espacio.",
    aplicacionCotidiana: "10 segundos de pausa antes de cada decisión. Esto es todo lo que necesitas.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "6",
    dia: 6,
    semana: 1,
    trimestre: 1,
    titulo: "El Ayuno de Trading",
    objetivo: "Romper la adicción a la acción",
    reto: "Hoy, NO abras tu plataforma de trading. En su lugar, haz algo completamente diferente: camina, lee, crea, juega. Observa cómo se siente la abstinencia. Anota: ¿Qué impulsos siento? ¿Cuántas veces quiero abrir la plataforma?",
    porQueFunciona: "Muchos traders son adictos a la acción. Necesitan sentir que 'hacen algo'. Este ejercicio revela esa adicción.",
    aplicacionCotidiana: "Un día sin tu vicio favorito. Observa qué pasa.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "7",
    dia: 7,
    semana: 1,
    trimestre: 1,
    titulo: "La Reflexión de la Semana",
    objetivo: "Consolidar aprendizajes",
    reto: "Revisa los 6 días anteriores. Escribe: ¿Qué aprendí sobre mi impulsividad? ¿Cuál fue el reto más difícil? ¿Por qué? ¿Cómo puedo aplicar esto a mi trading?",
    porQueFunciona: "La reflexión consolida el aprendizaje. Sin reflexión, los retos son solo ejercicios.",
    aplicacionCotidiana: "Reflexiona sobre tus acciones de la semana cada domingo.",
    categoria: "Observación Sin Acción"
  },
  {
    id: "8",
    dia: 8,
    semana: 2,
    trimestre: 1,
    titulo: "El Espejo de las Emociones",
    objetivo: "Reconocer tus emociones en tiempo real",
    reto: "Hoy, cada vez que sientas una emoción fuerte (rabia, miedo, alegría, frustración), detente. Pregúntate: ¿Qué emoción es? ¿Dónde la siento en mi cuerpo? Anota: Emoción + Ubicación en el cuerpo + Intensidad (1-10)",
    porQueFunciona: "No puedes controlar lo que no reconoces. Los traders ganadores tienen un mapa emocional claro.",
    aplicacionCotidiana: "La conciencia emocional es el primer paso del control.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "9",
    dia: 9,
    semana: 2,
    trimestre: 1,
    titulo: "El Ejercicio de la Respiración",
    objetivo: "Usar la respiración como herramienta de control",
    reto: "Aprende la respiración 4-7-8: Inhala 4 segundos, sostén 7, exhala 8. Practica 5 minutos cada mañana. Cuando sientas una emoción fuerte, usa esta técnica. Anota: ¿Cambió mi estado emocional?",
    porQueFunciona: "La respiración es el único sistema nervioso que puedes controlar voluntariamente. Los traders ganadores respiran conscientemente.",
    aplicacionCotidiana: "Respira conscientemente 3 veces al día.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "10",
    dia: 10,
    semana: 2,
    trimestre: 1,
    titulo: "El Diario de Avaricia",
    objetivo: "Reconocer cuándo la avaricia te controla",
    reto: "Observa una operación ganadora (tuya o de alguien más). ¿En qué momento la avaricia dice 'espera más'? ¿Cuál sería la ganancia racional? ¿Cuál es la ganancia que la avaricia quiere? Escribe: 'Hoy reconozco que la avaricia quiere X, pero mi plan dice Y'",
    porQueFunciona: "La avaricia es el asesino silencioso del trading. Reconocerla es el primer paso para vencerla.",
    aplicacionCotidiana: "¿En qué área de tu vida la avaricia te controla? Nómbrala.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "11",
    dia: 11,
    semana: 2,
    trimestre: 1,
    titulo: "El Ejercicio del 'No'",
    objetivo: "Fortalecer tu capacidad de decir no",
    reto: "Hoy, di 'no' a algo que normalmente aceptarías. Puede ser: una invitación, una compra, una operación, un consejo. Observa cómo se siente decir 'no'. Anota: ¿Qué resistencia sentí? ¿De dónde viene?",
    porQueFunciona: "Los traders ganadores dicen 'no' a 90% de las operaciones. Necesitas fortalecer ese 'no'.",
    aplicacionCotidiana: "El 'no' es tu herramienta más poderosa.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "12",
    dia: 12,
    semana: 2,
    trimestre: 1,
    titulo: "El Mapa del Miedo",
    objetivo: "Visualizar tus miedos y sus consecuencias",
    reto: "Dibuja un círculo en el centro: 'Mi mayor miedo en trading'. Alrededor, dibuja 5 círculos: ¿Qué pasaría si este miedo se hace realidad? Para cada uno, pregúntate: ¿Sería realmente catastrófico? ¿O solo incómodo? Escribe la verdad: ¿Puedo sobrevivir a esto?",
    porQueFunciona: "La mayoría de nuestros miedos son exagerados. Cuando los escribes, ves su verdadero tamaño.",
    aplicacionCotidiana: "Mapea un miedo cotidiano. Cuestiona su validez.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "13",
    dia: 13,
    semana: 2,
    trimestre: 1,
    titulo: "El Experimento de la Pérdida Pequeña",
    objetivo: "Normalizar las pérdidas",
    reto: "Si tienes una cuenta de trading, toma una operación PEQUEÑA (1-2% de riesgo). El objetivo NO es ganar. Es perder y observar cómo reaccionas. Anota: ¿Qué emoción siento? ¿Quiero vengarme? ¿Quiero recuperarla rápido? Si no tienes cuenta, imagina: 'Acabo de perder $50. ¿Qué haría?'",
    porQueFunciona: "Los traders ganadores aceptan las pérdidas como parte del juego. Necesitas desensibilizarte a ellas.",
    aplicacionCotidiana: "Hoy, pierde algo pequeño a propósito (dinero, tiempo, una discusión). Observa.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "14",
    dia: 14,
    semana: 2,
    trimestre: 1,
    titulo: "La Reflexión de la Semana 2",
    objetivo: "Consolidar el control emocional",
    reto: "¿Qué emociones reconocí esta semana? ¿Cuál es mi emoción más peligrosa en trading? ¿Cuál técnica (respiración, pausa, reflexión) funcionó mejor? ¿Cómo ha cambiado mi relación con las emociones?",
    porQueFunciona: "La reflexión semanal consolida los aprendizajes emocionales y crea patrones de autoconocimiento.",
    aplicacionCotidiana: "Dedica 15 minutos cada semana a reflexionar sobre tus emociones.",
    categoria: "Control Emocional Básico"
  },
  {
    id: "15",
    dia: 15,
    semana: 3,
    trimestre: 1,
    titulo: "El Juego de la Ganancia Perfecta",
    objetivo: "Redefinir qué es 'ganar'",
    reto: "Mira 5 operaciones ganadoras (tuyas o de otros). Para cada una, pregúntate: ¿Cuál fue la ganancia máxima posible? ¿Cuál fue la ganancia real? Calcula el porcentaje dejado sobre la mesa. Pregúntate: ¿Fue un error no tomar la ganancia máxima? ¿O fue prudencia?",
    porQueFunciona: "La avaricia dice: 'Siempre hay más dinero'. La verdad es: 'Cualquier ganancia es una ganancia'. Este ejercicio recalibra tu definición de éxito.",
    aplicacionCotidiana: "¿En qué área de tu vida quieres 'más' cuando ya tienes 'suficiente'?",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "16",
    dia: 16,
    semana: 3,
    trimestre: 1,
    titulo: "El Experimento de la Ganancia Pequeña",
    objetivo: "Celebrar ganancias modestas",
    reto: "Hoy, si tienes una operación ganadora, CIÉRRALA cuando alcances el 50% de tu objetivo. Celebra esa ganancia como si fuera el 100%. Escribe: 'Hoy gané X. Es suficiente. Estoy satisfecho.'",
    porQueFunciona: "Los traders ganadores no son avaros. Son consistentes. Pequeñas ganancias repetidas = fortuna.",
    aplicacionCotidiana: "Celebra las pequeñas victorias en tu vida.",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "17",
    dia: 17,
    semana: 3,
    trimestre: 1,
    titulo: "El Diario de la Avaricia Pasada",
    objetivo: "Aprender de tus errores de avaricia",
    reto: "Busca 3 operaciones donde la avaricia te costó dinero. Para cada una: ¿En qué momento debería haber cerrado? ¿Por qué no lo hice? ¿Qué creencia sobre el dinero estaba operando? Escribe: 'La avaricia me costó X. Nunca más.'",
    porQueFunciona: "El dolor del pasado es tu mejor maestro. Úsalo.",
    aplicacionCotidiana: "¿Cuándo la avaricia te ha costado en tu vida no-trading?",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "18",
    dia: 18,
    semana: 3,
    trimestre: 1,
    titulo: "El Ejercicio del 'Suficiente'",
    objetivo: "Entrenar tu capacidad de satisfacción",
    reto: "Hoy, en cada situación donde quieras 'más', pregúntate: ¿Tengo suficiente? Si la respuesta es sí, DETENTE. Ejemplos: comida, dinero, tiempo en redes, validación. Anota: ¿Cuántas veces pude decir 'suficiente'?",
    porQueFunciona: "La satisfacción es una habilidad. Los traders ganadores la dominan.",
    aplicacionCotidiana: "'Suficiente' es una palabra poderosa.",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "19",
    dia: 19,
    semana: 3,
    trimestre: 1,
    titulo: "El Mapa de la Abundancia",
    objetivo: "Cambiar tu creencia sobre la escasez",
    reto: "Escribe: '¿Creo que hay suficiente dinero en el mercado para mí?' Si la respuesta es no, escribe por qué. Cuestiona esa creencia. ¿Es verdad? ¿Quién me la enseñó? Reescribe: 'Hay suficiente dinero. Mi trabajo es tomar lo que me corresponde con disciplina.'",
    porQueFunciona: "Van Tharp dice que tu creencia sobre la abundancia determina tu capacidad de ganar. Si crees que hay escasez, tu mente saboteará tus ganancias.",
    aplicacionCotidiana: "¿Crees en la abundancia o en la escasez?",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "20",
    dia: 20,
    semana: 3,
    trimestre: 1,
    titulo: "El Ayuno de Ganancias",
    objetivo: "Romper la adicción a ganar",
    reto: "Si tienes una operación ganadora hoy, NO cierres. Déjala abierta (si tu plan lo permite). Observa: ¿Qué siento? ¿Miedo de perder la ganancia? ¿Avaricia por más? Cierra cuando tu plan lo diga, no cuando la avaricia lo diga.",
    porQueFunciona: "Los traders ganadores operan el plan, no sus emociones.",
    aplicacionCotidiana: "Hoy, no cierres nada prematuramente.",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "21",
    dia: 21,
    semana: 3,
    trimestre: 1,
    titulo: "La Reflexión de la Semana 3",
    objetivo: "Consolidar la victoria sobre la avaricia",
    reto: "¿Cuántas veces la avaricia intentó controlarme? ¿Cuántas veces pude decir 'suficiente'? ¿Cómo ha cambiado mi relación con la ganancia? ¿Cuál es mi nueva definición de 'ganar'?",
    porQueFunciona: "La reflexión semanal integra los aprendizajes sobre la avaricia en tu subconsciente.",
    aplicacionCotidiana: "Reflexiona sobre tu relación con 'querer más'.",
    categoria: "Destruir la Avaricia"
  },
  {
    id: "22",
    dia: 22,
    semana: 4,
    trimestre: 1,
    titulo: "El Mapa del Miedo Profundo",
    objetivo: "Identificar el miedo raíz",
    reto: "Tu miedo en trading (ej: 'Miedo a perder dinero') es un síntoma. Pregúntate 5 veces '¿Por qué?' hasta encontrar el miedo raíz. Ejemplo: ¿Por qué tengo miedo a perder dinero? → Porque no podré pagar mis gastos → ¿Por qué eso es un problema? → Porque seré un fracaso → ¿Es verdad? → NO. Mi valor es intrínseco.",
    porQueFunciona: "La mayoría de miedos son síntomas. Necesitas encontrar la raíz.",
    aplicacionCotidiana: "Pregúntate '¿Por qué?' 5 veces sobre cualquier miedo.",
    categoria: "Destruir el Miedo"
  },
  {
    id: "23",
    dia: 23,
    semana: 4,
    trimestre: 1,
    titulo: "El Ejercicio de la Exposición Gradual",
    objetivo: "Desensibilizarse al miedo",
    reto: "Identifica tu miedo en trading (ej: 'Miedo a grandes pérdidas'). Crea una exposición gradual: Día 1: Piensa en una pérdida pequeña ($10). Día 2: Piensa en una pérdida mediana ($100). Día 3: Piensa en una pérdida grande ($1000). Día 4: Visualiza que sucede. ¿Sobrevives? Sí.",
    porQueFunciona: "La exposición gradual es la técnica más efectiva para vencer miedos. Los psicólogos la usan.",
    aplicacionCotidiana: "Exponte gradualmente a algo que te asusta.",
    categoria: "Destruir el Miedo"
  },
  {
    id: "24",
    dia: 24,
    semana: 4,
    trimestre: 1,
    titulo: "El Diario de la Verdad",
    objetivo: "Cuestionar la validez del miedo",
    reto: "Tu miedo principal: ¿Cuántas veces se ha hecho realidad? ¿Cuántas veces fue imaginario? Escribe la estadística: 'De 10 veces que tuve este miedo, sucedió X veces'. Pregúntate: ¿Es un miedo racional o una proyección?",
    porQueFunciona: "La mayoría de nuestros miedos nunca se hacen realidad. Cuando ves la estadística, pierden poder.",
    aplicacionCotidiana: "¿Cuántas veces tus miedos cotidianos se hacen realidad?",
    categoria: "Destruir el Miedo"
  },
  {
    id: "25",
    dia: 25,
    semana: 4,
    trimestre: 1,
    titulo: "El Experimento del Peor Caso",
    objetivo: "Aceptar el peor escenario",
    reto: "Tu peor miedo: ¿Cuál es el peor caso posible? Ejemplo: 'Pierdo toda mi cuenta'. Pregúntate: ¿Sería catastrófico? ¿O solo un revés? ¿Podría recuperarme? ¿Cuánto tiempo? Escribe: 'Incluso en el peor caso, sobrevivo. Puedo reconstruir.'",
    porQueFunciona: "Mark Douglas enseña que los traders ganadores aceptan el peor caso. Eso los libera.",
    aplicacionCotidiana: "¿Cuál es el peor caso en tu vida? ¿Podrías sobrevivir?",
    categoria: "Destruir el Miedo"
  },
  {
    id: "26",
    dia: 26,
    semana: 4,
    trimestre: 1,
    titulo: "El Ejercicio de la Valentía Pequeña",
    objetivo: "Construir confianza a través de acciones pequeñas",
    reto: "Hoy, haz algo pequeño que te asusta. Puede ser: una operación pequeña, una pregunta que querías hacer, un riesgo social pequeño. Anota: ¿Qué pasó? ¿Sobreviví? ¿Fue tan malo como imaginaba?",
    porQueFunciona: "La valentía es un músculo. Se construye con pequeñas acciones.",
    aplicacionCotidiana: "Una acción valiente al día.",
    categoria: "Destruir el Miedo"
  },
  {
    id: "27",
    dia: 27,
    semana: 4,
    trimestre: 1,
    titulo: "El Mapa de la Confianza",
    objetivo: "Construir confianza en tu plan",
    reto: "Tu plan de trading: ¿En qué estadísticas se basa? ¿Cuál es tu tasa de ganancia histórica? ¿Cuál es tu relación riesgo-recompensa? Escribe: 'Mi plan tiene X% de probabilidad de ganar. Puedo confiar en él.'",
    porQueFunciona: "La confianza viene de los números. Si tu plan es sólido, puedes confiar. Si no, necesitas un nuevo plan.",
    aplicacionCotidiana: "¿En qué confías? ¿Está basado en datos o en fe ciega?",
    categoria: "Destruir el Miedo"
  },
  {
    id: "28",
    dia: 28,
    semana: 4,
    trimestre: 1,
    titulo: "La Reflexión de la Semana 4 (y del Mes 1)",
    objetivo: "Consolidar la victoria sobre el miedo",
    reto: "¿Cuál era mi mayor miedo hace 28 días? ¿Cómo ha cambiado? ¿Cuál es mi mayor logro de este mes? ¿Cómo ha cambiado mi relación con la impulsividad, la avaricia y el miedo?",
    porQueFunciona: "La reflexión mensual consolida todo el progreso del primer mes y prepara para el siguiente nivel.",
    aplicacionCotidiana: "Reflexiona mensualmente sobre tu crecimiento personal.",
    categoria: "Destruir el Miedo"
  },
  {
    id: "29",
    dia: 29,
    semana: 5,
    trimestre: 1,
    titulo: "El Espejo del Ego",
    objetivo: "Reconocer cuando el ego interfiere",
    reto: "Hoy observa cada vez que tu ego quiera tener razón. Anota: ¿Cuántas veces quise ganar una discusión? ¿Cuántas veces me costó admitir un error? El ego en trading = pérdidas.",
    porQueFunciona: "El ego es el enemigo silencioso del trader. Cuando necesitas tener razón, ignoras las señales del mercado.",
    aplicacionCotidiana: "Practica decir 'Estaba equivocado' sin justificarte.",
    categoria: "Ego y Aceptación"
  },
  {
    id: "30",
    dia: 30,
    semana: 5,
    trimestre: 1,
    titulo: "El Ejercicio de la Humildad",
    objetivo: "Desarrollar humildad ante el mercado",
    reto: "Escribe: 'El mercado es más grande que yo. No puedo controlarlo. Solo puedo controlar mis acciones.' Repite esto 10 veces. Observa cómo cambia tu perspectiva.",
    porQueFunciona: "La humildad es la base de la disciplina. Los traders arrogantes pierden dinero intentando tener razón.",
    aplicacionCotidiana: "Practica la humildad en una situación donde normalmente querrías demostrar que tienes razón.",
    categoria: "Ego y Aceptación"
  },
];

export const getMissionByDay = (day: number): TraderMission | undefined => {
  return TRADER_MISSIONS.find(m => m.dia === day);
};

export const getMissionsByWeek = (week: number): TraderMission[] => {
  return TRADER_MISSIONS.filter(m => m.semana === week);
};

export const getMissionsByTrimester = (trimester: number): TraderMission[] => {
  return TRADER_MISSIONS.filter(m => m.trimestre === trimester);
};

export const getTotalMissions = (): number => {
  return TRADER_MISSIONS.length;
};
