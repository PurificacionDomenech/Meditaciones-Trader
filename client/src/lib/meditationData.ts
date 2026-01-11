import type { Meditacion } from "@shared/schema";
import motivacionAudio from "../assets/motivacion-Constancia_1768043025655.mp3";
import disciplinaAudio from "../assets/Sin plan no hay camino.mp3";
import noEsElMercadoAudio from "../assets/Confía en el proceso, no en la emoción del momento.mp3";
import silencioAudio from "../assets/ElSilencioDelTraderMaduro.mp3";
import gestionRiesgoAudio from "../assets/No necesitas ganar todos los días.mp3";
import menosOperacionesAudio from "../assets/Menos_operaciones_mas_resultados.mp3";
import tradingVidaAudio from "../assets/Trading y vida. No puedes descuidar uno para cuidar el otro.mp3";
import cuentaQuemadaAudio from "../assets/Una cuenta quemada una lección cara.mp3";

export const categorias = [
  { id: "fundamento", nombre: "I. El Fundamento Inquebrantable", icon: "Anchor" },
  { id: "escudo", nombre: "II. El Escudo del Capital", icon: "Shield" },
  { id: "vision", nombre: "III. La Visión Clara del Mercado", icon: "Eye" },
  { id: "maestria", nombre: "IV. La Maestría Emocional", icon: "Brain" },
  { id: "recuperacion", nombre: "V. El Arte de la Recuperación", icon: "RefreshCcw" },
  { id: "proyeccion", nombre: "VI. La Forja del Éxito", icon: "Sparkles" },
  { id: "cafe", nombre: "Café con Rafa", icon: "Coffee" },
];

export const meditacionesPredefinidas: Meditacion[] = [
  {
    id: "fundamento-1",
    titulo: "El Despertar del Trader Consciente",
    categoria: "I. El Fundamento Inquebrantable",
    categoriaId: "fundamento",
    duracion: "8-10 min",
    descripcion: "Preparación mental antes de que el mercado despierte, buscando constancia y disciplina.",
    texto: "Bienvenido a tu espacio de preparación. El santuario de tu mente antes de que el mercado despierte.\n\nEncuentra tu postura. Firme, pero relajada. Cierra suavemente los ojos.\n\nConecta con tu respiración. Siente cómo el aire entra, llenando tus pulmones, y cómo sale, liberando cualquier residuo de la noche.\n\nNo busques motivación hoy. La motivación es volátil, se apaga. Busca constancia.\n\nBusca la decisión inquebrantable de hacer lo que toca, incluso sin ganas.\n\nEres un profesional. Y un profesional no depende de cómo se siente para ejecutar su plan.\n\nRespira profundamente. Al exhalar, suelta la necesidad de tener razón. Suelta el miedo a fallar.\n\nVisualiza tu sesión. Te ves frente a las pantallas. Sereno. Observando. Esperando tu momento.\n\nNo hay prisa. El mercado estará ahí mañana. Tu capital es tu herramienta, y hoy vas a protegerla con tu disciplina.\n\nCuando estés listo, abre los ojos. Entra al mercado con la mente de un profesional."
  },
  {
    id: "fundamento-2",
    titulo: "El Hábito que Transforma",
    categoria: "I. El Fundamento Inquebrantable",
    categoriaId: "fundamento",
    duracion: "7-9 min",
    descripcion: "Enfoque en la fuerza de la disciplina diaria y la construcción de rutinas sólidas.",
    texto: "Hoy nos enfocamos en la fuerza silenciosa que construye imperios: el hábito.\n\nNo la chispa fugaz del arranque, sino el fuego constante de la disciplina diaria.\n\nCierra los ojos. Siente tu respiración. Cada inhalación es un nuevo ladrillo en tu estructura. Cada exhalación es el cemento que une.\n\nPiensa en tu rutina. No en los resultados, sino en las acciones. ¿Revisas tu plan? ¿Estudias tus gráficos? ¿Respetas tus horarios?\n\nCada pequeña acción repetida es un voto a favor del trader en el que te estás convirtiendo.\n\nNo subestimes el poder de lo pequeño. Una gota de agua horada la piedra no por su fuerza, sino por su constancia.\n\nRespira esa constancia. Siéntela en tu pecho. Es tu armadura contra la impulsividad.\n\nHoy no buscas el 'home run'. Buscas la ejecución perfecta de tu proceso.\n\nVisualízate cumpliendo cada paso de tu rutina con calma y precisión.\n\nAbre los ojos. Ve y cumple con tu proceso. El resultado vendrá solo."
  },
  {
    id: "fundamento-3",
    titulo: "La Visión del Guerrero",
    categoria: "I. El Fundamento Inquebrantable",
    categoriaId: "fundamento",
    duracion: "10-12 min",
    descripcion: "Elevación sobre el ruido inmediato para mantener una visión de largo plazo.",
    texto: "El mercado te grita. Te tienta con movimientos rápidos. Te asusta con caídas repentinas.\n\nPero tú tienes una visión. Una visión que va más allá del gráfico de un minuto.\n\nCierra los ojos. Respira profundamente. Siente cómo te elevas por encima del ruido inmediato.\n\nEste camino no es un sprint. Es una maratón. Cada operación es solo un paso. Cada día, un entrenamiento.\n\nNo le des el control de tu crecimiento a un estado emocional momentáneo. Mantén la vista en el horizonte.\n\nEres un guerrero de la probabilidad. Sabes que un trade no significa nada, pero mil trades lo significan todo.\n\nSiente esa perspectiva en tu interior. Una calma profunda que nace de saber que estás jugando un juego de largo plazo.\n\nInhala confianza. Exhala ansiedad.\n\nVisualiza tu camino. Lleno de baches, sí, pero siempre avanzando hacia tu meta.\n\nAbre los ojos. Opera con la perspectiva del largo plazo."
  },
  {
    id: "fundamento-4",
    titulo: "Anclando la Constancia",
    categoria: "I. El Fundamento Inquebrantable",
    categoriaId: "fundamento",
    duracion: "6-8 min",
    descripcion: "Cierre de jornada para soltar resultados y preparar el día siguiente con lecciones aprendidas.",
    texto: "La jornada termina. Es momento de soltar. De dejar ir lo que fue, para preparar lo que será.\n\nAdopta una postura cómoda. Permite que tu cuerpo se relaje profundamente.\n\nRecorre el día que termina. Sin juicio. Solo observación. ¿Fuiste leal a tu sistema? ¿Cumpliste tu plan?\n\nSi hubo errores, obsérvalos como lecciones. No como fracasos. Cada error es una oportunidad para afinar.\n\nRespira profundamente. Con cada exhalación, libera cualquier apego a los resultados de hoy. Ya no puedes cambiarlos.\n\nLo que sí puedes cambiar es tu estado mental para mañana.\n\nSiente la gratitud por haber tenido la disciplina de operar hoy. Por haber respetado tu capital.\n\nVisualiza una noche de descanso reparador. Mañana volverás con la mente limpia y el espíritu renovado.\n\nSuelta... descansa... confía en tu proceso.\n\nAbre los ojos cuando estés listo. Tu trabajo de hoy ha terminado."
  },
  {
    id: "escudo-1",
    titulo: "La Calma en la Tormenta",
    categoria: "II. El Escudo del Capital",
    categoriaId: "escudo",
    duracion: "5-7 min",
    descripcion: "Reseteo de emergencia para recuperar la neutralidad ante la volatilidad extrema.",
    texto: "Detente. Ahora. Respira.\n\nEl mercado se mueve. Las noticias impactan. Sientes la urgencia, la presión. Eso es normal. Pero no es tu estrategia.\n\nCierra los ojos por un instante. Inhala profundamente por la nariz... uno... dos... tres... cuatro. Sostén... uno... dos... tres... cuatro. Exhala lentamente por la boca... uno... dos... tres... cuatro... cinco... seis.\n\nSiente cómo tu sistema nervioso se calma. Cómo la urgencia se disipa.\n\nAhora, pregúntate: \"¿Qué dice mi plan sobre esta situación? ¿Estoy reaccionando o estoy ejecutando?\"\n\nRecuerda: Tus emociones no son tu estrategia. Tu escudo es tu gestión de riesgo. Tu fortaleza es tu plan.\n\nNo necesitas ganar cada batalla. Necesitas proteger tu capital. Proteger tu mente.\n\nCuando estés listo, abre los ojos. Vuelve al gráfico. Pero no vuelvas igual. Vuelve con la calma del francotirador. Con la certeza de tu escudo."
  },
  {
    id: "escudo-2",
    titulo: "El Escudo del Stop Loss",
    categoria: "II. El Escudo del Capital",
    categoriaId: "escudo",
    duracion: "6-8 min",
    descripcion: "Aceptación del riesgo y el stop loss como un aliado protector del capital.",
    texto: "Estás a punto de entrar. O quizás ya estás dentro. Y el precio se acerca a tu límite.\n\nSientes la tentación de moverlo. De darle \"un poco más de aire\". Detente.\n\nCierra los ojos. Respira. Siente la responsabilidad que tienes con tu cuenta.\n\nTu stop loss no es un error. Es tu seguro de vida. Es el precio que pagas por la información que el mercado te está dando.\n\nSi el mercado toca tu stop, no te está atacando. Te está diciendo: \"Tu hipótesis no era correcta en este momento\". Nada más.\n\nAcepta el riesgo antes de que ocurra. Si no puedes aceptar la pérdida, no puedes aceptar la operación.\n\nRepite en tu interior: \"Mi stop es mi protección. Respetarlo es mi victoria. Mi capital es sagrado.\"\n\nVisualiza cómo cierras la operación con disciplina. Sin rabia. Sin deseo de venganza. Con la paz de quien ha cumplido su plan.\n\nCuando estés listo, abre los ojos. El mercado es soberano, pero tú eres el dueño de tu disciplina."
  },
  {
    id: "escudo-3",
    titulo: "La Lección de la Pérdida",
    categoria: "II. El Escudo del Capital",
    categoriaId: "escudo",
    duracion: "8-10 min",
    descripcion: "Procesamiento post-operación para extraer sabiduría del error sin victimismo.",
    texto: "Ha ocurrido una pérdida. Sientes el golpe. El ego herido. La frustración.\n\nPermítete sentirlo un momento. Pero no te quedes ahí. No te convirtieras en la víctima.\n\nEncuentra tu centro. Respira. Conecta con la realidad, no con la ilusión.\n\nNo es el mercado quien te ha hecho perder. Es el resultado de una probabilidad. O quizás, de una falta de disciplina.\n\nPregúntate con honestidad brutal: \"¿Seguí mi plan? ¿Respeté mi gestión? ¿Actué desde la razón o desde la necesidad?\"\n\nSi seguiste el plan, la pérdida es un coste del negocio. Si no lo seguiste, la pérdida es una lección cara.\n\nCada cuenta quemada, cada racha negativa, son los cimientos de tu futura rentabilidad. Si aprendes de ellos.\n\nRepite en tu interior: \"Una pérdida no me define. Aprendo. Evoluciono. Me reconstruyo.\"\n\nSiente cómo la frustración se transforma en determinación. El dolor en conocimiento.\n\nCuando estés listo, abre los ojos. La cuenta puede haberse resentido, pero tu mentalidad es ahora más fuerte."
  },
  {
    id: "escudo-4",
    titulo: "Neutralidad ante la Incertidumbre",
    categoria: "II. El Escudo del Capital",
    categoriaId: "escudo",
    duracion: "7-9 min",
    descripcion: "Aprender a soltar el control sobre lo incontrolable y confiar en el proceso.",
    texto: "El mercado es un océano de incertidumbre. No puedes controlarlo. No puedes adivinarlo.\n\nY en esa falta de control, nace la ansiedad. Vamos a soltarla.\n\nCierra los ojos. Respira profundamente. Siente cómo te rindes a la naturaleza impredecible del trading.\n\nTu poder no reside en saber qué hará el precio. Tu poder reside en saber qué harás TÚ ante cualquier movimiento.\n\nVisualiza el mercado como un río. Tú no intentas detenerlo. Tú aprendes a navegarlo con tu brújula: tu gestión de riesgo.\n\nCada operación es una probabilidad. Acepta que el resultado final está fuera de tu alcance. Tu éxito está en la ejecución impecable.\n\nRepite en tu interior: \"Acepto lo que no puedo controlar. Confío en mi proceso. Mi paz es inalterable.\"\n\nSiente la liberación que viene con esta aceptación. La calma de quien ya no necesita tener razón.\n\nCuando estés listo, abre los ojos. El mercado seguirá siendo incierto, pero tú estarás en paz."
  },
  {
    id: "vision-1",
    titulo: "La Mente en Blanco",
    categoria: "III. La Visión Clara del Mercado",
    categoriaId: "vision",
    duracion: "5-7 min",
    descripcion: "Limpia tus sesgos antes de analizar el mercado.",
    texto: "Siéntate derecho. Respira.\n\nTu mente está llena de gráficos pasados, de deseos de lo que el precio 'debería' hacer. Suéltalo.\n\nEl mercado es nuevo en cada segundo. No le importa lo que tú pienses.\n\nVisualiza una pizarra blanca. Con cada exhalación, borra un sesgo. Borra el deseo de ganar. Borra el miedo a perder.\n\nAhora, abre los ojos a la realidad de lo que ves, no de lo que esperas. Eres un observador puro. Sin juicios. Sin apegos. Solo tú y el flujo del precio.\n\nInhala claridad. Exhala expectativas.\n\nCuando estés listo, entra al mercado con la visión limpia del principiante y el rigor del maestro."
  },
  {
    id: "maestria-1",
    titulo: "El Dominio del Miedo",
    categoria: "IV. La Maestría Emocional",
    categoriaId: "maestria",
    duracion: "9-11 min",
    descripcion: "Aprende a reconocer y gestionar el miedo sin que paralice tus decisiones.",
    texto: "Cierra los ojos. Respira profundo.\n\nHoy no huimos del miedo. Hoy lo miramos de frente.\n\nEl miedo es tu compañero constante en el mercado. Miedo a perder. Miedo a perderte el movimiento. Miedo a equivocarte.\n\nBut el miedo no es tu enemigo. Es información.\n\nInhala profundamente. Siente dónde vive el miedo en tu cuerpo. ¿En el pecho? ¿En el estómago?\n\nObsérvalo. No lo juzgues. Solo reconócelo.\n\nEl trader amateur lucha contra el miedo. El profesional lo siente, lo acepta y opera según su plan. Porque sabe que el miedo es solo una emoción, no una orden.\n\nVisualiza tu próximo trade. Siente el miedo a perder. Y ahora, mira tu stop loss. Ahí está tu protección. El miedo pierde su poder cuando el riesgo está aceptado.\n\nRespira calma. Exhala tensión.\n\nCuando estés listo, abre los ojos. Opera con miedo si es necesario, pero opera con tu plan."
  },
  {
    id: "maestria-2",
    titulo: "La Trampa de la Euforia",
    categoria: "IV. La Maestría Emocional",
    categoriaId: "maestria",
    duracion: "8-10 min",
    descripcion: "Mantén la ecuanimidad en las rachas ganadoras y evita la sobreconfianza.",
    texto: "Encuentra tu centro. Cierra los ojos.\n\nHoy hablamos del enemigo silencioso: la victoria.\n\nEstás en racha. Tres trades verdes. Cinco. Diez.\n\nTe sientes invencible. El mercado tiene sentido. Todo es fácil.\n\nY justo ahí es cuando caes.\n\nRespira profundamente. Siente la tentación de la euforia.\n\nLa euforia es más peligrosa que el miedo. El miedo te paraliza. La euforia te destruye.\n\nInhala humildad. Exhala arrogancia.\n\nNo eres más listo cuando ganas. Solo estás en la parte positiva de la varianza. Mantén los pies en la tierra.\n\nTu sistema es el que gana, tú solo eres el ejecutor. No te atribuyas el éxito del mercado.\n\nVisualiza tu próximo trade con la misma cautela que el primero. Sin exceso de confianza. Respetando cada regla.\n\nAbre los ojos. La rentabilidad es para los humildes."
  },
  {
    id: "maestria-3",
    titulo: "La Rendición Consciente",
    categoria: "IV. La Maestría Emocional",
    categoriaId: "maestria",
    duracion: "7-9 min",
    descripcion: "Acepta lo que no puedes controlar y enfócate en lo que sí está en tus manos.",
    texto: "Respira. Suelta el control.\n\nCierra los ojos. Siente tu cuerpo relajarse.\n\nHoy practicamos la rendición. No la derrota. La rendición inteligente.\n\nNo controlas el mercado. No controlas si tu trade gana o pierde. No controlas la volatilidad.\n\nY está bien.\n\nInhala aceptación. Exhala frustración.\n\nEl trader amateur quiere controlar el resultado. El profesional solo controla el proceso.\n\n¿Qué controlas? Tu entrada. Tu stop. Tu size. Tu disciplina.\n\nNada más importa. Suelta el peso de querer tener razón. Ríndete a la incertidumbre del mercado y encuentra la paz en tu gestión.\n\nVisualízate operando con total desapego al resultado. Eres un gestor de probabilidades, no un adivino.\n\nAbre los ojos. Libérate de la carga del control."
  },
  {
    id: "maestria-4",
    titulo: "El Observador de Pensamientos",
    categoria: "IV. La Maestría Emocional",
    categoriaId: "maestria",
    duracion: "8-10 min",
    descripcion: "Crea distancia entre tú y tus pensamientos para no ser esclavo de ellos.",
    texto: "Cierra los ojos. Encuentra la quietud.\n\nHoy aprendes a crear espacio. Espacio entre tú y tu mente.\n\nTus pensamientos no eres tú. Son eventos que suceden en tu consciencia.\n\nRespira profundamente. Observa tus pensamientos como nubes pasando.\n\n'Voy a perder'. 'Debería haber entrado'. 'Este mercado es imposible'.\n\nSon solo pensamientos. No verdades. No órdenes. Simplemente ruido mental.\n\nInhala claridad. Exhala identificación.\n\nNo eres tus pensamientos. Eres el observador que los mira. Y desde ese lugar de observador, puedes elegir no actuar según ellos.\n\nSiente la libertad de no tener que obedecer a cada pensamiento impulsivo que cruza tu mente.\n\nAbre los ojos. Mira el gráfico desde la calma del observador."
  },
  {
    id: "recuperacion-1",
    titulo: "Levantarse del Golpe",
    categoria: "V. El Arte de la Recuperación",
    categoriaId: "recuperacion",
    duracion: "9-11 min",
    descripcion: "Reconstruye tu mentalidad después de una pérdida significativa.",
    texto: "Cierra los ojos. Respira, aunque duela.\n\nHoy estás aquí porque perdiste. Quizás mucho. Quizás duele.\n\nY está bien sentir ese dolor.\n\nNo lo niegues. No finjas fortaleza que no sientes. El dolor es real.\n\nInhala profundamente. Siente el peso en tu pecho.\n\nBut ahora escucha esto: Una pérdida no te define. Un mal día no borra tu camino.\n\nExhala lentamente. Suelta la vergüenza.\n\nTodos los grandes traders han estado donde estás ahora. Todos.\n\nLa diferencia es que ellos no se quedaron en el suelo. Se perdonaron. Analizaron. Y volvieron.\n\nPerdónate por el error, si lo hubo. Acepta el coste del aprendizaje. Mañana el mercado volverá a abrir y tú estarás listo, más sabio y más fuerte.\n\nVisualiza cómo te levantas, te sacudes el polvo y recuperas tu dignidad de profesional.\n\nAbre los ojos. Tu carrera acaba de empezar de nuevo."
  },
  {
    id: "recuperacion-2",
    titulo: "Romper el Ciclo de Venganza",
    categoria: "V. El Arte de la Recuperación",
    categoriaId: "recuperacion",
    duracion: "8-10 min",
    descripcion: "Detén el impulso destructivo de recuperar pérdidas inmediatamente.",
    texto: "Encuentra tu postura. Cierra los ojos.\n\nSientes la urgencia. El fuego en el pecho. La necesidad de recuperar.\n\nAhora. Ya. El siguiente trade.\n\nDetente. Respira.\n\nEse impulso te va a destruir.\n\nInhala claridad. Exhala venganza.\n\nEl mercado no te quitó nada. No es tu enemigo. No te debe nada.\n\nTú tomaste una decisión. El mercado respondió. Eso es todo.\n\nBut tu ego está herido. Y el ego herido es peligroso.\n\nQuiere recuperar. Quiere tener razón. Quiere venganza.\n\nNo operes hoy. No operes hasta que ese fuego se haya apagado. La mejor operación de hoy es NO operar.\n\nSiente cómo recuperas el control al elegir no actuar. Eso es verdadera fuerza.\n\nAbre los ojos. Vete de las pantallas. Has ganado la batalla más importante: la batalla contra tu impulsividad."
  },
  {
    id: "recuperacion-3",
    titulo: "El Reset Mental",
    categoria: "V. El Arte de la Recuperación",
    categoriaId: "recuperacion",
    duracion: "10-12 min",
    descripcion: "Limpia tu mente de la racha negativa y vuelve al estado neutral.",
    texto: "Cierra los ojos. Respira profundo.\n\nHoy borramos. Limpiamos. Reseteamos.\n\nLlevas días, quizás semanas, perdiendo. La confianza está rota.\n\nCada trade nuevo lo inicias esperando perder.\n\nY así, lo haces realidad.\n\nInhala profundamente. Exhala esa carga.\n\nTu sistema no cambió. El mercado no cambió. Tú cambiaste.\n\nTe dejaste infectar por la racha.\n\nBut una racha perdedora es solo estadística. Ruido. Parte del juego.\n\nRespira esa perspectiva.\n\nCada operación es independiente. Lo que pasó ayer no tiene poder sobre lo que pasará hoy. A menos que tú se lo des.\n\nVisualiza una cascada de agua pura limpiando tu mente de miedos y dudas pasadas. Vuelves a cero. Neutral. Impecable.\n\nAbre los ojos. Hoy es el primer día de tu nueva operativa."
  },
  {
    id: "recuperacion-4",
    titulo: "La Fortaleza en la Adversidad",
    categoria: "V. El Arte de la Recuperación",
    categoriaId: "recuperacion",
    duracion: "8-10 min",
    descripcion: "Encuentra la fuerza interna que te permitirá convertir el fracaso en combustible.",
    texto: "Respira. Encuentra tu centro.\n\nCierra los ojos. Hoy honramos algo poderoso: tu resistencia.\n\nHas llegado hasta aquí. A pesar de las pérdidas. A pesar del dolor.\n\nSigues aquí. Eso dice todo.\n\nInhala esa verdad. Exhala la autocompasión destructiva.\n\nLa adversidad no te rompe. Te revela.\n\nRevela si eres un turista buscando dinero fácil o un profesional construyendo un oficio.\n\nLos turistas huyen al primer drawdown. Los profesionales se adaptan. Analizan. Y se fortalecen.\n\nSiente esa fuerza de acero en tu interior. Es la fuerza de quien ha mirado al abismo y no ha parpadeado.\n\nUsa el dolor de la pérdida como combustible para tu estudio, para tu disciplina, para tu rigor.\n\nAbre los ojos. Eres un trader. Y un trader nunca se rinde ante la estadística."
  },
  {
    id: "proyeccion-1",
    titulo: "La Corona del Trader Completo",
    categoria: "VI. La Forja del Éxito",
    categoriaId: "proyeccion",
    duracion: "11-14 min",
    descripcion: "Integra todas las lecciones del camino y asume tu identidad como trader profesional.",
    texto: "Cierra los ojos. Respira profundo.\n\nHoy celebramos algo sagrado. Tu transformación.\n\nHas recorrido el camino. Desde el fundamento hasta aquí.\n\nDesde la ignorancia entusiasta hasta la maestría consciente.\n\nInhala con ese reconocimiento.\n\nRecuerda tu primer trade. La emoción. El miedo. La esperanza desmedida.\n\nEras un niño jugando en un campo de gladiadores.\n\nNo sabías lo que no sabías. Y esa ignorancia era peligrosa.\n\nBut también era necesaria. Porque te trajo hasta aquí.\n\nVisualiza ahora al trader que eres hoy. Sereno. Disciplinado. Humilde.\n\nAlguien que ya no busca la riqueza rápida, sino la excelencia constante.\n\nSiente la corona invisible de la maestría sobre tu cabeza. No es una corona de oro, es una corona de disciplina, de paciencia y de autoconocimiento.\n\nHas ganado el derecho a llamarte profesional. No por tus beneficios, sino por tu proceso.\n\nExhala gratitud. Por el mercado, por las lecciones, por ti mismo.\n\nAbre los ojos. Sal ahí fuera y opera como el maestro que ya eres."
  },
  {
    id: "cafe-1",
    titulo: "Motivación o constancia: Elige quién te entrena",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Charla sobre la diferencia entre motivación pasajera y disciplina constante.",
    audioUrl: motivacionAudio,
    texto: "Hola, ¿qué tal?\n\nVamos a por nuestro cafe.\n\nFíjate que que hoy tengo ganas, ¿no?\n\nHay días en los que te sientes imparable,te levantas con ganas, abres el gráfico con ilusión, haces tu rutina, todo fluye\n\ny hay días en los que no te apetece nada, ni operas, ni estudias, vamos, ni abrir el portátil.\n\nY sabes qué,\n\nno importa,\n\nbecause nosotros dentro de nuestro método no construimos desde la motivación,\n\nconstruimos desde la constancia.\n\nAsí que no importa si esos días no te apetece,\n\nsi tu disciplina depende de cómo te sientes, créeme que nunca vas a llegar lejos.\n\nLa motivación es ese emotion inicial, ese arranque, pero es volátil, se apaga.\n\nLo que te sostiene es otra cosa, es la rutina, es el hábito, es la decisión diaria de hacer lo que toca,\n\nincluso sin ganas.\n\nEl trader que solo actúa cuando está motivado, desaparece,\n\nse borra cuando vienen las pérdidas, ahí ya no lo encuentras.\n\nBut el que se construye con constancia es el que se siente todos los días como la lluvia o como el sol, con ánimos o sin él.\n\nÉl repite, él afina, él mejora, él no para.\n\nLa motivación te inspira.\n\nSí, es verdad, but la constancia, amigo, te transforma.\n\nAsí que no esperes a estar motivado para hacer lo que sabes que tienes que hacer.\n\nNo le des el control de tu crecimiento, de tu evolución a un estado emocional.\n\nHazlo tú.\n\nHazlo tú y deja que la constancia,\n\nel hábito, la disciplina te entrenen hasta que un día sin darte cuenta, quizás seas tú quien inspira a otros,\n\n¿verdad?\n\n¿Lo ves? No, yo te veo.\n\nGracias."
  },
  {
    id: "cafe-2",
    titulo: "Disciplina: el precio que pocos quieren pagar",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Reflexión sobre el verdadero coste de la libertad financiera.",
    audioUrl: disciplinaAudio,
    texto: "Hola, café de hoy.\n\nYo invito.\n\nMira, todo el mundo quiere ganar.\n\nTodo el mundo sueña con la libertad, con la rentabilidad, con dejar su trabajo, todo eso.\n\nBut cuando les dices la verdad, cuando les dices que se necesita constancia, rutina, repetición diaria, cuando les hablas de eso, muchos se van porque quieren resultado, pero no quieren pagar el precio.\n\nY no te digo el precio económico, el precio se llama disciplina.\n\n¿Sabes que yo lo digo sin rodeo?\n\nQue el trader no nace, se construye, se forja y se construye en los días en los que no apetece, en los días en los que, bueno, podrías improvisar y tú eliges seguir tu plan.\n\nEn esos días en los que pierdes y aún así no pierdes la cabeza.\n\nBecause la disciplina es eso, hacer lo que toca, hacer eso incluso cuando no tienes ganas, entrenar tu mente para que no te sabotee. Por eso la entrenamos constantemente a diario.\n\n¿Sabes que en el método no celebramos solo los días verdes?\n\nDentro de nuestra comunidad celebramos los días en los que te fuiste leal, en los que fuiste leal a tu sistema, en los que lo cumpliste, porque ahí es donde crece tu base, ahí es donde te forjas.\n\nUn trader disciplinado no necesita suerte, créeme, no necesita suerte.\n\nNecesitas hacer lo que tienes que hacer.\n\nNo necesitas motivación, solo necesitas recordárselo a diario quién quieres llegar a ser and actuar como si ya fueras esa persona.\n\nTe lo digo constantemente, actúa como si ya fueses esa persona.\n\nAsí que hoy estás dudando.\n\nSi te pesa ese esfuerzo, recuerda, no te olvides nunca que la disciplina es incómoda.\n\nSí,\n\nes incómoda,\n\nbut la frustración de no avanzar, eso, amigo mío, eso es mucho peor.\n\nGracias, gracias por tomarte ese cafe conmigo.\n\nCiao."
  },
  {
    id: "cafe-3",
    titulo: "No es el mercado, eres Tú",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Responsabilidad total sobre tus decisiones y resultados.",
    audioUrl: noEsElMercadoAudio,
    texto: "Hola, buenos días.\n\nAquí traigo nuestra taza de café.\n\nTe invito. La tuya y la mía.\n\n¿Sabes que no es el mercado, eres tú, verdad?\n\n¿Sabes cuál es la trampa más grande del trading?\n\nCulpar al mercado.\n\nNo es el mercado el que quema cuentas, eres tú.\n\nTu impaciencia, tu falta de plan, tus emociones desbordadas.\n\nYo lo digo siempre sin filtro, no es el mercado, eres tú.\n\nEl mercado no tiene intención de hacerte perder, simplemente se mueve.\n\nLo que hace perder es operar sin un plan, entrar sin contexto, cerrar por miedo, mover el stop por ansiedad.\n\n¿Te ha pasado, verdad?\n\nEl trader mediocre sobreopera porque no sabe esperar.\n\nEl trader disciplinado espera un momento como un francotirador, con calma, sin prisas y cuando dispara es porque sabe por qué lo hace.\n\nRecuerda que nosotros, con nuestro método no jugamos a adivinar nada.\n\nAquí no hay espacio para impulsos.\n\nHay un sistema, una gestión de riesgo clara, una mentalidad entrenada para soportar la presión porque va a venir,\n\nbecause la presión es parte de esto.\n\nBut recuerda, no es magia, es repitición,\n\nes dominio propio.\n\nY cuando entiendes eso, todo cambia, porque ya no buscas ganarle al mercado, ya no buscas tener la razón, buscas ganarte a ti mismo.\n\nNo necesitas adivinar el mercado, necesitas dominarte a ti.\n\nY créeme, esa es la verdadera victoria en el trading.\n\nSalud, rico café.Te espero mañana."
  },
  {
    id: "cafe-4",
    titulo: "El silencio del trader maduro",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "El valor del enfoque interior frente al ruido de las redes sociales.",
    audioUrl: silencioAudio,
    texto: "Hola, buenos días.\n\n¿Qué tal? ¿Me acompañas con el cafe? Venga, que yo invito.\n\nMira, te hago una pregunta. ¿Sabes quién habla todo el día de trading? El que todavía no ha entendido que esto va de procesar en silencio.\n\nEse trader novato que todavía no lo ha entendido.\n\nEl trader maduro no presume, observa, no entra a las redes a presumir de todos los puntos que sacó en el mercado, de todos los euros que sacó en el mercado, de todos los dólares que hoy le arrebató al mercado.\n\nNo, no, no, no. Él está en su gráfico refinando su estrategia.\n\nTe lo digo claro, el trader más peligroso es el que opera en silencio y ejecuta con precisión.\n\nEse que pasa desapercibido.\n\nNosotros dentro de nuestro método valoramos mucho el proceso más que el show.\n\nNosotros no estamos por ahí dando esos shows, porque lo que te mantiene no son las rachas, son los hábitos.\n\nNo necesitas que el mundo sepa que ganaste.\n\nMétete eso en la cabeza.\n\nLo único que necesitas es saber que tú sepas por qué ganaste, qué hiciste bien.\n\nYo creo que en este oficio callar es una ventaja.\n\nBecause el ruido está allá afuera, but el foco está adentro, adentro de ti.\n\nNo te olvides nunca que el mercado no premia al que más habla, no, créeme que no.\n\nPremia al que más aguanta, al que perdura sin romperse.\n\nAsí que te invito a que desarrolles y disfrutes ese silencio del trader maduro.\n\nHoy estaba divino el café, ¿no?\n\nGracias, gracias por compartir este ratito conmigo.\n\nNos vemos en el próximo.\n\nGracias."
  },
  {
    id: "cafe-5",
    titulo: "Gestión de riesgo: el escudo del trader",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Por qué conservar capital es más importante que buscar ganancias.",
    audioUrl: gestionRiesgoAudio,
    texto: "Hola, buenos días.\n\nAquí estamos con tu cafe.\n\nRecuerda que te lo invito y hoy quería hacerte una pregunta.\n\n¿Qué pasa cuando te concentras solo en ganar?\n\n¿Sabes lo que pasa? Que pierdes de vista lo más importante.\n\n¿Cuánto estás dispuesto a perder sin hundirte?\n\nMuchos entran al mercado pensando en rentabilidad, pero ignoran la parte más poderosa de todo sistema,\n\nla gestión del riesgo.\n\nY yo lo tengo muy claro, gestionar el riesgo es el escudo del trader.\n\nWhy?\n\nMira, ganar una operación no significa nada si la siguiente te quema la cuenta. ¿Te ha pasado?\n\nNo, no estás aquí para hacerte rico en un día.\n\nRecuérdalo, estás aquí para perdurar, para mantenerte.\n\nPor eso, en el método, la prioridad que yo siempre les estoy diciendo no es cuánto ganas, es cuánto conservas, cuánto perduras, cuánto vas a poner en riesgo tu cifra.\n\nTienes que tenerlo muy claro.\n\nTu riesgo está definido antes de entrar.\n\nTe pregunto. Tu stop es coherente con tu capital, con lo que tienes.\n\n¿Has revisado con cuánto empiezas ese día?\n\nEs que si no puedes responder a estas dos preguntas, estás operando sin plan, porque en tu plan la gestión del riesgo es fundamental.\n\nY recuerda, los traders profesionales no arriesgan más cuando quieren ganar más.\n\nTe lo repito, los pros no arriesgan más cuando queremos ganar más.\n\nLo que hacemos es aumentar el tamaño de la disciplina.\n\nQuédate con eso.\n\nAumenta el tamaño, pero de tu disciplina.\n\nProtege tu cuenta como si fuera esos soldados que te están defendiendo, esos guardaespaldas que te están defendiendo como si fuera oxígeno.\n\nBecause si la pierdes se acabó el juego.\n\nY aquí en este juego, el único que sobrevive, recuerda,\n\nes el que sabe protegerse.\n\nGracias,\n\nte veo en el próximo café."
  },
  {
    id: "cafe-7",
    titulo: "Una cuenta quemada una lección cara",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Transformando el fracaso en cimientos para el éxito futuro.",
    audioUrl: cuentaQuemadaAudio,
    texto: "Hola, buenos días.\n\nNuestro cafe. Acudes a la cita.\n\nClaro, te lo invito.\n\nMira, te quiero hacer una reflexión. Quemar una cuenta. ¿Has quemado, no?\n\nBueno, pues quemar una cuenta no duele solo por el dinero.\n\nEstarás conmigo en eso. No duele por lo que representa esa ilusión rota, ese esfuerzo perdido, ese golpe al ego, ¿verdad?\n\nBut cada cuenta quemada es una lección. No te olvides de eso.\n\nY si no aprendes, se convierte en un patrón repetitivo.\n\nYo te lo digo sin rodeo. Una cuenta quemada es una factura emocional, pero también es una oportunidad de transformación.\n\n¿Cómo lo quieres ver?\n\nSi analizas por qué la quemaste, si te faltó gestión, si operaste sin plan, si el ego te dominó, entonces esa pérdida se convierte en cimientos, en bases.\n\nAquí dentro de nuestra comunidad, sabes que no nos enfocamos en que evites errores.\n\nNo se trata de eso. No se trata de evitar errores, sino de no repetirlos.\n\nSi estás en este camino, asume que vas a perder, pero también asume que vas a evolucionar, que te vas a transformar.\n\nCada vez que fallas tienes dos opciones: victimismo o crecimiento, pañalitis o evolución, llantina o crezco.\n\nLa cuenta puede haberse perdido, but tú no.\n\nMientras tengas mentalidad, ganas de mejorar y disciplina para reconstruirte, sigues en el juego.\n\nY esta vez, créeme que vas a jugar distinto porque has aprendido y estás en proceso de mejora.\n\nAsí que recuerda que una cuenta quemada es una lección.\n\nEn ti está que esa lección sea una lección cara o por el contrario una oportunidad muy muy grande.\n\nRico el café, ¿no?\n\nGracias.\n\nTe veo en el próximo."
  },
  {
    id: "cafe-8",
    titulo: "Menos operaciones más resultados",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "La importancia de la precisión sobre la cantidad de trades.",
    audioUrl: menosOperacionesAudio,
    texto: "Hola, buenos días.\n\nVamos a por nuestro cafe.\n\nVenga, que te lo invito.\n\nMira, ¿te ha pasado que estás al frente de la pantalla y no puedes estar sin operar?\n\n¿Te ha pasado, verdad?\n\n¿Sientes que si no haces nada estás perdiendo oportunidades, estás perdiendo el tiempo?\n\nBut te digo algo, en el trading más no es mejor\n\ny me lo has escuchado en muchas ocasiones, ¿verdad?\n\nEl trader que sobreopera se desgasta, se desespera\n\ny acaba tomando decisiones sin sentido.\n\nYo soy claro en esto.\n\nMenos operaciones, más resultados.\n\nTengo esa frase, ¿no?, que te digo mucho.\n\nDe menos es más,\n\nde más lento se llega más lejos y más rápido.\n\nEn nuestro método no se entra por impulso, se entra por confirmación,\n\npor probabilidad y por proceso.\n\nEse proceso evolutivo. Las mejores operaciones no son las que te dan adrenalina, sino las que nacen dentro del marco de tu sistema.\n\nSi operas mucho, para mí es que estás persiguiendo al mercado.\n\nBut en cambio, si operas poco, pero con precisión, es el mercado el que viene a ti."
  },
  {
    id: "cafe-9",
    titulo: "Trading y media. No puedes descuidar uno para cuidar el otro",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "6 min",
    descripcion: "Equilibrio entre el foco en el mercado y la vida personal para la salud mental.",
    audioUrl: tradingVidaAudio,
    texto: "Hola, cafe.\n\nVenga, vamos a por nuestro cafe.\n\nQue yo sé que te está gustando, ¿verdad?\n\n¿Sabes que el trading exige foco, tiempo, energía?\n\nBut cuidado, que no se lleve tu vida entera.\n\nVeo a muchos que se dejan la vida.\n\nHay traders que lo dan todo por el mercado y por el dinero, pero olvidan disfrutar de lo que están construyendo.\n\nY yo lo digo claro: No puedes descuidar uno para cuidar el otro. El trading es una herramienta para mejorar tu vida, no para consumirla.\n\nSi estás todo el día pegado a las pantallas, si dejas de hablar con tu familia, si dejas de hacer deporte, si el mercado te quita el sueño y la alegría, entonces no estás ganando, amigo mío, estás perdiendo.\n\nIncluso si tu cuenta sube, estás perdiendo.\n\nEn el método, buscamos traders integrales. Gente que sabe operar con maestría, pero que también sabe cerrar el portátil y ser feliz allá afuera.\n\nTu rendimiento en el gráfico depende de tu equilibrio emocional fuera de él.\n\nSi tu vida es un caos, tu trading será un caos.\n\nAsí que hoy, cuando termines tu sesión, date el permiso de desconectar. Disfruta de lo que tienes. Respira aire puro.\n\nRecuerda que operamos para vivir, no vivimos para operar.\n\nGracias por este café. Te veo en el próximo."
  },
  {
    id: "cafe-6",
    titulo: "Tus emociones no son tu estrategia",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Operando desde la neutralidad emocional frente a la impulsividad.",
    texto: "Hola, buenos días.\n\nVamos a por nuestro cafecito.\n\nTe lo invito.\n\nMira, sabes que la mayoría de los errores que comete un trader no vienen de la falta de conocimiento,\n\nvienen de actuar bajo presión emocional.\n\nTe hago una pregunta, ¿cuántas veces has entrado mal por miedo a quedarte fuera?\n\nO cuántas veces has cerrado antes de tiempo por ansiedad.\n\nEl mercado no te castiga, te castiga tu reacción emocional.\n\nAcuérdate de eso.\n\nYo siempre se lo repito.\n\nTus emociones no son tu estrategia.\n\nRecuerda eso.\n\nSi vas al mercado con miedo, con rabia, con necesidad, ya estás en desventaja.\n\nNosotros dentro de nuestro método no nos dejamos llevar. No decide el trader desde la emoción.\n\nSi gano, perfecto, sigo igual. Si pierdo, perfecto, sigo igual,\n\nbecause la clave está en la neutralidad emocional,\n\nen estar neutro,\n\nen esa armonía,\n\nen esa templanza.\n\nY la única forma de operar con claridad es hacerlo desde el control, desde el plan, desde las reglas claras.\n\nLas emociones las sientes, pero no las obedeces.\n\nCuando estás ahí operando desde el control, no obedeces a las emociones.\n\nAsí que antes de abrir una operación, recuerda que siempre te digo, respira y pregúntate,\n\n¿es mi sistema quien decide o es mi ego?\n\nBecause solo uno de los dos te va a llevar a esos resultados sostenibles.\n\nSí. Último sorbito.\n\nVenga, gracias.\n\nHasta el próximo cafecito."
  },
  {
    id: "cafe-10",
    titulo: "El poder del dinero",
    categoria: "Café con Rafa",
    categoriaId: "cafe",
    duracion: "5 min",
    descripcion: "Comprende la verdadera naturaleza del dinero y el poder que tú le otorgas.",
    texto: "Hola, buenos días.\n\nAquí estamos con tu cafe.\n\nRecuerda que te lo invito y hoy quería hacerte una pregunta.\n\n¿Qué es el dinero para ti?\n\n¿Es una meta o es una herramienta?\n\nMuchos traders fracasan porque le dan demasiado poder emocional al dinero.\n\nLo ven como su seguridad, como su valor personal.\n\nY cuando el mercado les quita un poco, sienten que les quita su identidad.\n\nYo te lo digo claro: el dinero es energía en movimiento.\n\nEn el trading, es simplemente el marcador del juego.\n\nSi le tienes miedo a perderlo, nunca podrás ganar de verdad.\n\nBecause el miedo bloquea tu visión, te hace dudar de tu sistema.\n\nEn nuestro método, aprendemos a desapegarnos del resultado monetario inmediato.\n\nNos enfocamos en la ejecución.\n\nSi ejecutas bien, el dinero vendrá como una consecuencia natural.\n\nNo persigas el dinero, persigue la maestría.\n\nPersigue ser el mejor trader que puedas ser hoy.\n\nY verás cómo, cuando dejas de darle ese poder absoluto sobre tu paz mental, el dinero empieza a fluir hacia ti con más facilidad.\n\nSalud, rico café. Te espero mañana."
  }
];
