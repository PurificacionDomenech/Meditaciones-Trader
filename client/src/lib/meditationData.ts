import type { Meditacion } from "@shared/schema";

export const categorias = [
  { id: "estres", nombre: "A. Manejo del Estrés y la Ansiedad", icon: "Brain" },
  { id: "enfoque", nombre: "B. Enfoque y Concentración", icon: "Target" },
  { id: "impulsos", nombre: "C. Control de Impulsos y Toma de Decisiones", icon: "Scale" },
  { id: "resiliencia", nombre: "D. Resiliencia y Mentalidad de Crecimiento", icon: "TrendingUp" },
  { id: "visualizacion", nombre: "E. Visualización del Futuro", icon: "Eye" },
  { id: "intuicion", nombre: "F. Conexión con la Intuición", icon: "Sparkles" },
];

export const meditacionesPredefinidas: Meditacion[] = [
  {
    id: "estres-1",
    titulo: "Antes de la Sesión",
    categoria: "A. Manejo del Estrés",
    categoriaId: "estres",
    duracion: "5-10 min",
    descripcion: "Enfoque en la calma, control de la respiración, visualizaciones de un entorno tranquilo.",
    texto: `Bienvenido a esta meditación para prepararte antes de tu sesión de trading.

Encuentra una posición cómoda y cierra suavemente los ojos.

Toma una respiración profunda... inhala lentamente por la nariz... siente cómo el aire llena tus pulmones... y exhala suavemente por la boca, liberando cualquier tensión.

Ahora imagina que estás en un lugar completamente tranquilo. Puede ser una playa serena al amanecer, un bosque silencioso, o una montaña cubierta de nieve.

Con cada respiración, sientes cómo la calma se expande por todo tu cuerpo. Desde la parte superior de tu cabeza... bajando por tus hombros... tus brazos... tu torso... hasta la punta de tus pies.

Repite internamente: "Estoy en calma. Estoy preparado. Confío en mi estrategia."

El mercado es solo un flujo de información. Tú eres el observador sereno que toma decisiones desde la claridad.

Cuando estés listo, toma una última respiración profunda y abre lentamente los ojos. Estás preparado para operar con calma y enfoque.`
  },
  {
    id: "estres-2",
    titulo: "Durante la Sesión (Malas Noticias)",
    categoria: "A. Manejo del Estrés",
    categoriaId: "estres",
    duracion: "3-5 min",
    descripcion: "Técnicas de 'detener', aceptación, re-enfoque en la estrategia.",
    texto: `Detente un momento. Respira.

Has recibido noticias que no esperabas. Eso está bien. Forma parte del trading.

Cierra los ojos por un instante. Inhala profundamente... uno... dos... tres... cuatro. Mantén... y exhala lentamente... uno... dos... tres... cuatro... cinco... seis.

Reconoce lo que sientes. Puede ser frustración, ansiedad o miedo. Estas emociones son naturales. Permítete sentirlas sin juzgarte.

Ahora, con suavidad, vuelve a tu estrategia. Pregúntate: "¿Qué dice mi plan sobre esta situación?"

El mercado siempre presenta volatilidad. Tu fortaleza está en seguir tu plan, no en reaccionar impulsivamente.

Respira una vez más. Estás en control de tus acciones, no de lo que sucede afuera.

Abre los ojos cuando estés listo. Continúa con claridad.`
  },
  {
    id: "estres-3",
    titulo: "Después de la Sesión (Pérdida)",
    categoria: "A. Manejo del Estrés",
    categoriaId: "estres",
    duracion: "7-10 min",
    descripcion: "Procesamiento emocional, auto-compasión, re-evaluación sin autocrítica.",
    texto: `Esta meditación es para ti después de un día difícil.

Encuentra un lugar tranquilo. Siéntate cómodamente y cierra los ojos.

Primero, reconoce que hoy fue un día de pérdida. No trates de escapar de esa realidad. El primer paso para sanar es aceptar.

Toma tres respiraciones profundas y lentas.

Ahora, coloca una mano sobre tu corazón. Siente los latidos. Estás vivo. Estás aprendiendo. Esto es parte del camino.

Repite internamente: "Una pérdida no me define. Soy más que mis resultados de hoy."

Visualiza la pérdida como agua que fluye por un río. La observas pasar. No te aferras a ella. Simplemente la dejas ir.

Pregúntate con compasión: "¿Qué puedo aprender de hoy? ¿Seguí mi plan? Si no lo hice, ¿por qué?"

No busques culpables. Solo busca claridad.

Mañana es un nuevo día. Cada sesión es una nueva oportunidad.

Cuando estés listo, abre los ojos. Tómate un momento para cuidar de ti mismo hoy.`
  },
  {
    id: "estres-4",
    titulo: "Antes del Mercado (Noche Anterior)",
    categoria: "A. Manejo del Estrés",
    categoriaId: "estres",
    duracion: "5 min",
    descripcion: "Relajación profunda, visualizaciones positivas para el día siguiente.",
    texto: `Es hora de descansar y preparar tu mente para mañana.

Acuéstate cómodamente. Deja que tu cuerpo se relaje completamente sobre la superficie.

Cierra los ojos y toma una respiración profunda. Con cada exhalación, siente cómo tu cuerpo se vuelve más pesado, más relajado.

Visualiza el día de mañana. Te ves a ti mismo despertando con energía renovada. Te preparas con calma. Revisas tu plan con claridad.

Imagina que tomas decisiones desde la serenidad. No hay prisa. No hay miedo. Solo claridad y confianza en tu estrategia.

Sea cual sea el resultado de mañana, sabes que estás preparado. Has hecho tu trabajo. Confías en ti mismo.

Ahora, suelta todos los pensamientos sobre el mercado. Esta noche es para descansar.

Respira suavemente y déjate llevar hacia un sueño reparador.`
  },
  {
    id: "enfoque-1",
    titulo: "Preparación para la Sesión",
    categoria: "B. Enfoque y Concentración",
    categoriaId: "enfoque",
    duracion: "5-8 min",
    descripcion: "Ejercicios de atención plena, centrado en la respiración, visualización de la estrategia.",
    texto: `Prepara tu mente para una sesión de máxima concentración.

Siéntate con la espalda recta. Las manos descansando sobre tus piernas. Cierra los ojos.

Comienza observando tu respiración. No la cambies, solo obsérvala. Nota cómo el aire entra... y cómo sale.

Ahora, con cada inhalación, imagina que absorbes claridad mental. Con cada exhalación, liberas cualquier distracción.

Visualiza tu estrategia de trading. Mírala como un mapa claro frente a ti. Conoces tus puntos de entrada. Conoces tus puntos de salida. Conoces tu gestión del riesgo.

Repite internamente: "Mi mente está enfocada. Sigo mi plan. Ejecuto con precisión."

Imagina que tu atención es como un láser. Puedes dirigirla exactamente donde necesitas. Las distracciones existen en la periferia, pero no te afectan.

Toma una última respiración profunda. Siente la claridad. Abre los ojos.

Estás listo para operar con enfoque total.`
  },
  {
    id: "enfoque-2",
    titulo: "Manteniendo la Concentración",
    categoria: "B. Enfoque y Concentración",
    categoriaId: "enfoque",
    duracion: "3-5 min",
    descripcion: "Técnicas para volver al presente cuando la mente divaga.",
    texto: `Si tu mente ha comenzado a divagar, esta práctica te ayudará a volver.

Detén lo que estés haciendo. Solo por un momento.

Cierra los ojos. Toma una respiración profunda.

Ahora, cuenta cinco respiraciones completas. Solo enfócate en contar.

Uno... inhala... exhala.
Dos... inhala... exhala.
Tres... inhala... exhala.
Cuatro... inhala... exhala.
Cinco... inhala... exhala.

Tu mente puede haber intentado distraerte. Eso es normal. Cada vez que notes que se va, suavemente tráela de vuelta al conteo.

Ahora, recuerda tu objetivo para esta sesión. ¿Qué estabas buscando? ¿Cuál era tu plan?

Visualízalo claramente. Estás aquí. Estás presente. Estás enfocado.

Abre los ojos. Continúa con renovada concentración.`
  },
  {
    id: "enfoque-3",
    titulo: "Enfrentando el Ruido",
    categoria: "B. Enfoque y Concentración",
    categoriaId: "enfoque",
    duracion: "7-10 min",
    descripcion: "Meditación sensorial, enfocándose en sonidos para anclar la atención.",
    texto: `El ruido del mercado, las noticias, las opiniones... todo puede ser abrumador. Esta meditación te ayudará a encontrar silencio interior.

Cierra los ojos y comienza a notar los sonidos a tu alrededor.

No los juzgues. No los etiquetes como buenos o malos. Solo escúchalos. El zumbido del ordenador. El sonido de la calle. Tu propia respiración.

Ahora, imagina que tienes un control de volumen para el mundo exterior. Lentamente, lo bajas. Los sonidos se vuelven más lejanos... más suaves...

En ese espacio de silencio interior, solo existe tu estrategia. Solo existe tu plan. El ruido de las opiniones ajenas no tiene poder aquí.

Respira profundamente. En este espacio de calma, tus decisiones vienen desde la claridad, no desde la reacción al ruido.

Repite internamente: "El ruido externo no me define. Mi claridad interior guía mis decisiones."

Lentamente, permite que los sonidos externos vuelvan. Pero ahora los escuchas desde un lugar de serenidad.

Abre los ojos. El ruido sigue ahí, pero tú estás centrado.`
  },
  {
    id: "impulsos-1",
    titulo: "Antes de Operar",
    categoria: "C. Control de Impulsos",
    categoriaId: "impulsos",
    duracion: "4-6 min",
    descripcion: "Ejercicio de 'pausa consciente', evaluar la estrategia, visualizar la ejecución.",
    texto: `Antes de hacer cualquier operación, tómate este momento.

Cierra los ojos. Respira tres veces profundamente.

Ahora, pregúntate: "¿Esta operación está en mi plan? ¿Cumple con mis criterios de entrada?"

Si la respuesta es no, respira y acepta. No todas las oportunidades son para ti. Tu disciplina es tu mayor activo.

Si la respuesta es sí, visualiza la operación completa. Imagina que la ejecutas. Ve el punto de entrada. Ve tu stop loss. Ve tu objetivo de ganancia.

¿Cómo te sientes? ¿Hay ansiedad? Si es así, respira. La ansiedad es información, no una orden.

Repite internamente: "Opero desde la claridad, no desde la urgencia. Mi paciencia es mi fortaleza."

Ahora, con calma y confianza, estás listo para decidir. No hay prisa. El mercado siempre ofrecerá nuevas oportunidades.

Abre los ojos. Decide con consciencia.`
  },
  {
    id: "impulsos-2",
    titulo: "Resistencia a la Impulsividad",
    categoria: "C. Control de Impulsos",
    categoriaId: "impulsos",
    duracion: "5-8 min",
    descripcion: "Técnicas de control de la respiración para evitar decisiones impulsivas.",
    texto: `Sientes la urgencia de actuar. Algo en ti dice: "¡Ahora! ¡Hazlo ya!"

Detente. Este es el momento más importante.

Cierra los ojos. Pon ambas manos sobre tu abdomen.

Inhala lentamente contando hasta cuatro... Siente cómo tu abdomen se expande.
Mantén el aire contando hasta cuatro...
Exhala lentamente contando hasta seis... Siente cómo tu cuerpo se relaja.

Repite este ciclo tres veces más.

Ahora pregúntate: "¿Por qué siento esta urgencia? ¿Es miedo a perderme algo? ¿Es la emoción del momento?"

Los impulsos son como olas. Vienen con fuerza, pero si no reaccionas, pasan. No tienes que actuar sobre cada impulso.

Visualiza la ola del impulso llegando... observa cómo se acerca... y mírala pasar. Tú permaneces en la orilla, firme y tranquilo.

Respira una vez más. La urgencia ha disminuido. La claridad ha vuelto.

Abre los ojos. Ahora puedes decidir desde la razón, no desde la reacción.`
  },
  {
    id: "impulsos-3",
    titulo: "Después de Ejecutar (Ganancia/Pérdida)",
    categoria: "C. Control de Impulsos",
    categoriaId: "impulsos",
    duracion: "7-10 min",
    descripcion: "Reconocer las emociones, evitar la euforia/desesperación, re-evaluar la estrategia.",
    texto: `Ya ejecutaste tu operación. Ahora es momento de procesar.

Cierra los ojos y respira profundamente tres veces.

Si tuviste una ganancia: siente la satisfacción, pero no te dejes llevar por la euforia. La euforia puede llevarte a sobreoperar o a tomar riesgos innecesarios.

Si tuviste una pérdida: reconoce la frustración, pero no te hundas en ella. Una pérdida es información, no un fracaso personal.

Repite internamente: "Mi valor no está determinado por esta operación. Soy un trader disciplinado en proceso de mejora constante."

Ahora, evalúa la operación con objetividad:
¿Seguiste tu plan?
¿El setup era válido?
¿Gestionaste bien el riesgo?

Si la respuesta a todo es sí, el resultado no importa. Hiciste lo correcto. A largo plazo, la consistencia gana.

Si hubo errores, anótalos con compasión. Son lecciones, no condenas.

Respira profundamente. Suelta el resultado. Prepárate para la siguiente oportunidad con mente clara.

Abre los ojos. Continúa con ecuanimidad.`
  },
  {
    id: "resiliencia-1",
    titulo: "Aprendiendo de las Pérdidas",
    categoria: "D. Resiliencia y Crecimiento",
    categoriaId: "resiliencia",
    duracion: "8-10 min",
    descripcion: "Reflexión sobre el error, identificando factores, generando un plan de acción.",
    texto: `Esta meditación te ayudará a transformar las pérdidas en aprendizaje.

Siéntate cómodamente y cierra los ojos. Respira profundamente tres veces.

Ahora, trae a tu mente la operación o el día que quieres analizar. Observa los hechos sin juzgarte. Como si estuvieras viendo una película de alguien más.

¿Qué sucedió exactamente? ¿Cuál fue el contexto del mercado? ¿Qué decisiones tomaste?

Ahora, con compasión hacia ti mismo, pregunta: "¿Qué factor o factores contribuyeron a este resultado?"

Puede haber sido:
- Falta de adherencia al plan
- Emociones que nublaron tu juicio
- Un setup que no era ideal
- Eventos externos impredecibles

Identifica los factores sin culparte. Solo busca claridad.

Ahora, visualiza cómo harías las cosas diferente la próxima vez. Ve la versión mejorada de ti mismo tomando decisiones desde la calma y la disciplina.

Repite internamente: "Cada pérdida es una lección. Estoy evolucionando como trader."

Finalmente, comprométete con una acción específica para mejorar. ¿Qué cambiarás en tu proceso? ¿Qué agregarás a tu lista de verificación?

Respira profundamente. Has transformado esta experiencia en crecimiento.

Abre los ojos. Estás más fuerte que antes.`
  },
  {
    id: "resiliencia-2",
    titulo: "Celebrando los Éxitos",
    categoria: "D. Resiliencia y Crecimiento",
    categoriaId: "resiliencia",
    duracion: "5-7 min",
    descripcion: "Gratitud, reconocimiento del esfuerzo, visualización de éxito continuo.",
    texto: `Has tenido un buen día, una buena semana, o un buen trade. Es momento de celebrarlo conscientemente.

Cierra los ojos y respira profundamente.

Siente la satisfacción del logro. Permítete estar orgulloso de ti mismo. Mereces reconocer tu esfuerzo.

Ahora, reflexiona: ¿Qué hiciste bien? ¿Qué decisiones te llevaron a este resultado positivo?

- ¿Fue tu disciplina al seguir el plan?
- ¿Fue tu paciencia al esperar el setup correcto?
- ¿Fue tu gestión del riesgo?

Reconoce esos factores. Esas son tus fortalezas. Esas son las bases de tu éxito.

Repite internamente: "Reconozco mi esfuerzo. Celebro mi disciplina. Continúo construyendo mi éxito."

Ahora, visualiza este éxito como parte de una cadena. Cada buen trade, cada buena decisión, es un eslabón que te acerca a tus metas mayores.

Siente gratitud por el proceso. Por la oportunidad de hacer lo que haces. Por tu capacidad de aprender y mejorar.

Respira profundamente una última vez. Abre los ojos.

Disfruta este momento. Mañana seguirás construyendo.`
  },
  {
    id: "resiliencia-3",
    titulo: "Aceptando la Volatilidad",
    categoria: "D. Resiliencia y Crecimiento",
    categoriaId: "resiliencia",
    duracion: "6-8 min",
    descripcion: "Meditación sobre el cambio, la impermanencia, enfocándose en lo que se puede controlar.",
    texto: `El mercado es volátil. La vida es volátil. Esta meditación te ayudará a encontrar paz en medio del cambio.

Cierra los ojos y respira profundamente.

Imagina que estás de pie en un campo. El viento sopla a tu alrededor, a veces suave, a veces fuerte. Tú permaneces firme, con los pies enraizados en la tierra.

El viento es la volatilidad del mercado. Viene y va. No puedes controlarlo. Pero puedes controlar cómo te mantienes de pie.

Repite internamente: "No puedo controlar el mercado. Puedo controlar mi respuesta."

Reflexiona sobre lo que SÍ puedes controlar:
- Tu preparación
- Tu plan de trading
- Tu gestión del riesgo
- Tu actitud
- Tu disciplina

Todo lo demás es como el viento. Observas, te adaptas, pero no te dejas arrastrar.

La impermanencia es la naturaleza de los mercados. Lo que sube puede bajar. Lo que baja puede subir. Tu trabajo no es predecir cada movimiento, sino navegar con habilidad.

Visualízate como un navegante experto. Las tormentas vienen, pero conoces tu embarcación. Confías en tus habilidades. Llegarás a puerto.

Respira profundamente. Acepta la volatilidad como tu aliada, no como tu enemiga.

Abre los ojos. Estás preparado para cualquier escenario.`
  },
  {
    id: "visualizacion-1",
    titulo: "Creando el Futuro Deseado",
    categoria: "E. Visualización del Futuro",
    categoriaId: "visualizacion",
    duracion: "8-12 min",
    descripcion: "Visualizar resultados positivos, estableciendo intenciones claras y sintiendo la emoción del éxito.",
    texto: `Esta meditación te guiará a visualizar tu futuro como trader exitoso.

Encuentra una posición cómoda. Cierra los ojos y toma tres respiraciones profundas y lentas.

Ahora, imagina que el tiempo avanza. Estás en el futuro. Has alcanzado tus objetivos como trader.

Imagina que ya has alcanzado tu objetivo... ¿Cómo te sientes? Permítete sentir esa emoción ahora. Orgullo. Satisfacción. Libertad. Confianza.

¿Qué estás haciendo en este momento futuro? Visualízalo con detalle. ¿Estás operando desde tu oficina ideal? ¿Estás revisando tus resultados del mes? ¿Estás enseñando a otros lo que has aprendido?

¿Cómo es tu entorno? Mira a tu alrededor. Los colores, la luz, los objetos. Siente la textura de donde estás sentado. Escucha los sonidos de tu ambiente.

En este futuro, ¿cómo operas? Visualízate tomando decisiones con calma absoluta. Ves las oportunidades claramente. Ejecutas con precisión. Tu disciplina es automática.

Repite internamente: "Este futuro es real. Cada día me acerco más. Mis acciones de hoy construyen este mañana."

Siente la gratitud por este momento futuro como si ya existiera. Porque en tu mente, ya existe.

Ahora, lentamente, trae contigo esa sensación de éxito al presente. No es un sueño lejano. Es tu destino que se construye con cada decisión disciplinada.

Respira profundamente. Abre los ojos. Lleva esta visión contigo hoy.`
  },
  {
    id: "visualizacion-2",
    titulo: "El Futuro desde Diferentes Ángulos",
    categoria: "E. Visualización del Futuro",
    categoriaId: "visualizacion",
    duracion: "6-8 min",
    descripcion: "Visualizar el resultado desde la perspectiva del trader, del cliente/familia, y del mercado.",
    texto: `Esta meditación explora tu éxito futuro desde múltiples perspectivas.

Cierra los ojos y respira profundamente tres veces.

Primero, visualiza tu éxito desde TU perspectiva como trader.

Estás frente a tus pantallas. El día ha terminado. Has seguido tu plan perfectamente. Sientes satisfacción profunda. No por las ganancias, sino por tu disciplina y crecimiento.

Ahora, cambia de perspectiva. Imagina cómo te ven tus seres queridos.

Ellos notan tu transformación. Tu calma. Tu confianza. Ven a alguien que ha dominado sus emociones, que trabaja con propósito. Se sienten orgullosos de ti. Inspirados por tu dedicación.

Ahora, visualiza tu relación con el mercado mismo.

El mercado ya no es tu adversario. Es tu socio. Un flujo constante de oportunidades. Tú eres un participante hábil que toma lo que el mercado ofrece, sin forzar, sin luchar.

Ves las tendencias como olas que puedes surfear. La volatilidad como oportunidad. Los retrocesos como pausas naturales.

Repite internamente: "Soy un trader completo. Mi éxito beneficia a quienes me rodean. Estoy en armonía con el mercado."

Une estas tres perspectivas en una sola imagen. Tú, tu círculo cercano, y el mercado, todos en equilibrio.

Respira profundamente. Abre los ojos. Llevas contigo esta visión multidimensional de tu éxito.`
  },
  {
    id: "visualizacion-3",
    titulo: "Yo Soy: Escenarios Hipotéticos",
    categoria: "E. Visualización del Futuro",
    categoriaId: "visualizacion",
    duracion: "10-12 min",
    descripcion: "Visualizar escenarios hipotéticos para anticipar situaciones y practicar la respuesta óptima.",
    texto: `Esta meditación te prepara mentalmente para diferentes escenarios de trading.

Cierra los ojos. Respira profundamente y relájate completamente.

Vamos a explorar diferentes escenarios. En cada uno, visualizarás la situación y tu respuesta ideal.

ESCENARIO 1: La Gran Oportunidad

Imagina que identificas un setup perfecto. Todo se alinea con tu estrategia. Sientes emoción, pero también mantienes la calma.

Visualízate ejecutando la operación sin dudar, pero sin precipitarte. Colocas tu orden. Defines tu stop. Defines tu objetivo. Sientes confianza serena.

Repite: "Yo soy disciplina. Yo soy precisión."

ESCENARIO 2: La Pérdida Inesperada

Ahora imagina que el mercado se mueve en tu contra. Tu stop se activa. Sientes la punzada de la pérdida.

Visualízate respirando profundamente. Aceptas el resultado. No te castigas. Revisas si seguiste tu plan. Si lo hiciste, te felicitas por tu disciplina. Si no, anotas la lección con compasión.

Repite: "Yo soy resiliencia. Yo soy aprendizaje continuo."

ESCENARIO 3: La Racha Ganadora

Imagina varios días de ganancias consecutivas. Te sientes invencible. Pero sabes que este es un momento de peligro.

Visualízate manteniendo humildad. No aumentas tu riesgo. No te desvías del plan. Celebras internamente, pero permaneces anclado a tu disciplina.

Repite: "Yo soy constancia. Yo soy gestión prudente."

ESCENARIO 4: El Mercado Caótico

Imagina un día de extrema volatilidad. Noticias inesperadas. Movimientos bruscos.

Visualízate observando desde la calma. Si no hay claridad, no operas. Esperas. El mercado siempre ofrecerá nuevas oportunidades. Tu capital se preserva para otro día.

Repite: "Yo soy paciencia. Yo soy protección de mi capital."

Respira profundamente. Has ensayado mentalmente múltiples escenarios. Tu cerebro ahora tiene estos patrones de respuesta listos.

Abre los ojos. Estás preparado para lo que venga.`
  },
  {
    id: "intuicion-1",
    titulo: "Espacio para la Intuición",
    categoria: "F. Conexión con la Intuición",
    categoriaId: "intuicion",
    duracion: "7-10 min",
    descripcion: "Meditación en blanco, atención plena, 'escuchar' al cuerpo.",
    texto: `Esta meditación es para traders avanzados que buscan conectar con su intuición.

Encuentra un espacio tranquilo. Cierra los ojos. Suelta todas las expectativas.

Comienza con cinco respiraciones profundas y lentas.

Ahora, simplemente... existe. No intentes pensar en nada específico. No analices. No planifiques.

Solo observa el espacio dentro de ti. Escucha el silencio entre tus pensamientos.

Cuando un pensamiento aparezca, obsérvalo como una nube que pasa. No lo sigas. Déjalo ir.

En este espacio vacío, tu intuición puede hablar. A veces viene como una sensación en el cuerpo. Un tirón en el estómago. Una expansión en el pecho. Una tensión en los hombros.

Escanea tu cuerpo lentamente. Desde la cabeza hasta los pies. ¿Qué sensaciones encuentras? No las juzgues. Solo obsérvalas.

Pregunta internamente: "¿Qué necesito saber?" Y luego... escucha. No busques una respuesta verbal. Solo permanece abierto.

Tu cuerpo tiene sabiduría acumulada de miles de horas frente al mercado. A veces sabe cosas antes que tu mente consciente.

Permanece en este espacio de escucha unos momentos más.

Cuando estés listo, toma una respiración profunda. Si recibiste alguna impresión, anótala después. Si no, está bien. La práctica constante desarrolla esta conexión.

Abre los ojos lentamente.`
  },
  {
    id: "intuicion-2",
    titulo: "Validando la Intuición",
    categoria: "F. Conexión con la Intuición",
    categoriaId: "intuicion",
    duracion: "5-8 min",
    descripcion: "Preguntas guía para analizar las señales intuitivas del trader.",
    texto: `Has recibido una señal intuitiva. Esta meditación te ayudará a validarla.

Cierra los ojos y respira profundamente tres veces.

Trae a tu mente la señal o sensación que recibiste. Puede haber sido sobre un trade específico, un mercado, o una decisión.

Ahora, hazte estas preguntas:

Primera: "¿Esta sensación viene de la calma o del miedo?"
La intuición verdadera generalmente surge desde un lugar de quietud, no de ansiedad o urgencia.

Segunda: "¿Esta señal alinea con mi análisis o lo contradice completamente?"
La intuición suele complementar el análisis, no reemplazarlo por completo.

Tercera: "¿He sentido algo similar antes? ¿Cuál fue el resultado?"
Tu historial de señales intuitivas puede revelar patrones.

Cuarta: "Si ignoro esta señal, ¿cómo me sentiré?"
A veces el arrepentimiento anticipado nos dice mucho.

Quinta: "¿Puedo actuar sobre esta señal de manera que respete mi gestión de riesgo?"
La intuición no debería llevarte a ignorar tus reglas fundamentales.

Toma unos momentos para reflexionar sobre tus respuestas.

La intuición es una herramienta poderosa, pero debe usarse junto con la disciplina, no en lugar de ella.

Repite internamente: "Escucho mi intuición. La valido con sabiduría. Actúo con prudencia."

Respira profundamente. Abre los ojos. Ahora tienes mayor claridad sobre cómo proceder.`
  }
];
