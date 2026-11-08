/**
 * Catálogo de cursos. Para agregar un curso nuevo, añade un objeto a la lista.
 * `featured: true` lo muestra en la portada (se muestran los primeros 4).
 */

export type CourseCategory =
  | "Automatización"
  | "Tableros"
  | "Instalaciones"
  | "Seguridad"
  | "Energías renovables"
  | "Potencia"
  | "Fundamentos";

export type CourseLevel = "Básico" | "Intermedio" | "Avanzado";
export type CourseModality = "Presencial" | "Virtual en vivo" | "Híbrido";

export interface Course {
  slug: string;
  title: string;
  category: CourseCategory;
  level: CourseLevel;
  modality: CourseModality;
  durationHours: number;
  image: string;
  summary: string;
  learn: string[];
  syllabus: { module: string; topics: string[] }[];
  featured?: boolean;
}

export const courses: Course[] = [
  {
    slug: "programacion-plc-desde-cero",
    title: "Programación de PLC desde cero",
    category: "Automatización",
    level: "Básico",
    modality: "Híbrido",
    durationHours: 48,
    image: "/images/cursos/plc.jpg",
    featured: true,
    summary:
      "Aprende lógica ladder, temporizadores, contadores y comunicación con sensores para automatizar procesos reales.",
    learn: [
      "Arquitectura y cableado de un PLC",
      "Programación en lenguaje Ladder (KOP)",
      "Temporizadores, contadores y comparadores",
      "Simulación y puesta en marcha",
    ],
    syllabus: [
      { module: "Fundamentos del PLC", topics: ["Entradas y salidas", "Ciclo de scan", "Tipos de memoria"] },
      { module: "Lógica Ladder", topics: ["Contactos y bobinas", "Enclavamientos", "Set / Reset"] },
      { module: "Funciones", topics: ["Temporizadores TON/TOF", "Contadores", "Comparadores"] },
      { module: "Proyecto final", topics: ["Arranque de motores", "Control de semáforo", "Banda transportadora"] },
    ],
  },
  {
    slug: "armado-de-tableros-electricos",
    title: "Armado de tableros eléctricos industriales",
    category: "Tableros",
    level: "Intermedio",
    modality: "Presencial",
    durationHours: 40,
    image: "/images/cursos/terminales.jpg",
    featured: true,
    summary:
      "Diseña, cablea y prueba tableros de fuerza y control siguiendo normas técnicas y buenas prácticas de taller.",
    learn: [
      "Lectura de diagramas de fuerza y control",
      "Selección de protecciones y conductores",
      "Peinado, borneras y rotulado profesional",
      "Pruebas de aislamiento y continuidad",
    ],
    syllabus: [
      { module: "Diseño", topics: ["Diagramas unifilares", "Cálculo de carga", "Selección de equipos"] },
      { module: "Montaje", topics: ["Riel DIN y canaletas", "Borneras", "Terminales y ponchado"] },
      { module: "Cableado", topics: ["Código de colores", "Peinado de cables", "Rotulado"] },
      { module: "Pruebas", topics: ["Megado", "Continuidad", "Energización segura"] },
    ],
  },
  {
    slug: "instalaciones-electricas-residenciales",
    title: "Instalaciones eléctricas residenciales",
    category: "Instalaciones",
    level: "Básico",
    modality: "Presencial",
    durationHours: 32,
    image: "/images/cursos/cableado.jpg",
    featured: true,
    summary:
      "Domina el cableado de viviendas: circuitos de alumbrado, tomacorrientes, tableros de distribución y puesta a tierra.",
    learn: [
      "Circuitos de alumbrado y tomacorrientes",
      "Tablero de distribución domiciliario",
      "Sistemas de puesta a tierra",
      "Código Nacional de Electricidad",
    ],
    syllabus: [
      { module: "Bases", topics: ["Ley de Ohm", "Potencia", "Herramientas"] },
      { module: "Circuitos", topics: ["Interruptores simples y de 3 vías", "Tomacorrientes", "Luminarias"] },
      { module: "Protección", topics: ["Termomagnéticos", "Diferenciales", "Puesta a tierra"] },
      { module: "Práctica", topics: ["Instalación completa de un módulo de vivienda"] },
    ],
  },
  {
    slug: "control-de-motores-y-variadores",
    title: "Control de motores y variadores de frecuencia",
    category: "Automatización",
    level: "Intermedio",
    modality: "Híbrido",
    durationHours: 36,
    image: "/images/cursos/motor.jpg",
    featured: true,
    summary:
      "Arranque directo, estrella-triángulo, inversión de giro y control de velocidad con variadores de frecuencia.",
    learn: [
      "Arranques directos y estrella-triángulo",
      "Inversión de giro con enclavamientos",
      "Parametrización de variadores (VFD)",
      "Diagnóstico de fallas en motores",
    ],
    syllabus: [
      { module: "Motores", topics: ["Motor trifásico", "Placa de datos", "Conexiones"] },
      { module: "Control clásico", topics: ["Contactores", "Relés térmicos", "Pulsadores"] },
      { module: "Variadores", topics: ["Parámetros básicos", "Rampas", "Control por bornes"] },
      { module: "Mantenimiento", topics: ["Medición de aislamiento", "Fallas comunes"] },
    ],
  },
  {
    slug: "plc-avanzado-tia-portal",
    title: "PLC avanzado con TIA Portal y HMI",
    category: "Automatización",
    level: "Avanzado",
    modality: "Virtual en vivo",
    durationHours: 56,
    image: "/images/cursos/plc-delta.jpg",
    summary:
      "Programación estructurada, bloques de función, señales analógicas, redes industriales y pantallas HMI.",
    learn: [
      "Bloques FC, FB y DB",
      "Señales analógicas y escalamiento",
      "Comunicación Profinet y Modbus",
      "Diseño de pantallas HMI",
    ],
    syllabus: [
      { module: "Programación estructurada", topics: ["FC / FB / DB", "Lenguaje SCL"] },
      { module: "Analógicas", topics: ["Escalamiento", "Control PID"] },
      { module: "Redes", topics: ["Profinet", "Modbus TCP"] },
      { module: "HMI", topics: ["Pantallas", "Alarmas", "Recetas"] },
    ],
  },
  {
    slug: "seguridad-electrica-nfpa-70e",
    title: "Seguridad eléctrica y NFPA 70E",
    category: "Seguridad",
    level: "Básico",
    modality: "Virtual en vivo",
    durationHours: 16,
    image: "/images/cursos/seguridad.jpg",
    summary:
      "Prevención de riesgos eléctricos, arco eléctrico, bloqueo y etiquetado (LOTO) y equipos de protección personal.",
    learn: ["Riesgos de choque y arco eléctrico", "Procedimiento LOTO", "Selección de EPP", "Trabajo seguro en tableros"],
    syllabus: [
      { module: "Riesgos", topics: ["Choque eléctrico", "Arco eléctrico"] },
      { module: "Prevención", topics: ["LOTO", "Distancias de seguridad"] },
      { module: "EPP", topics: ["Categorías", "Selección e inspección"] },
    ],
  },
  {
    slug: "sistemas-fotovoltaicos",
    title: "Diseño e instalación de sistemas fotovoltaicos",
    category: "Energías renovables",
    level: "Intermedio",
    modality: "Híbrido",
    durationHours: 40,
    image: "/images/cursos/solar-tablero.jpg",
    summary:
      "Dimensiona e instala sistemas solares aislados y conectados a red, con baterías, inversores y protecciones.",
    learn: ["Dimensionamiento de paneles", "Baterías e inversores", "Protecciones DC/AC", "Instalación y puesta en marcha"],
    syllabus: [
      { module: "Recurso solar", topics: ["Radiación", "Orientación", "Sombras"] },
      { module: "Componentes", topics: ["Paneles", "Inversores", "Baterías"] },
      { module: "Diseño", topics: ["Sistemas aislados", "Sistemas on-grid"] },
    ],
  },
  {
    slug: "subestaciones-media-tension",
    title: "Subestaciones y media tensión",
    category: "Potencia",
    level: "Avanzado",
    modality: "Presencial",
    durationHours: 40,
    image: "/images/cursos/subestacion.jpg",
    summary:
      "Componentes, maniobras y mantenimiento de subestaciones, transformadores y celdas de media tensión.",
    learn: ["Transformadores de potencia", "Celdas y seccionadores", "Maniobras seguras", "Mantenimiento predictivo"],
    syllabus: [
      { module: "Equipos", topics: ["Transformadores", "Celdas", "Pararrayos"] },
      { module: "Operación", topics: ["Maniobras", "Protecciones"] },
      { module: "Mantenimiento", topics: ["Termografía", "Pruebas de aceite"] },
    ],
  },
  {
    slug: "electricidad-basica",
    title: "Electricidad básica para principiantes",
    category: "Fundamentos",
    level: "Básico",
    modality: "Virtual en vivo",
    durationHours: 20,
    image: "/images/hero/electricista.jpg",
    summary:
      "El punto de partida ideal: conceptos, mediciones con multímetro y circuitos simples con total seguridad.",
    learn: ["Voltaje, corriente y resistencia", "Uso del multímetro", "Circuitos serie y paralelo", "Herramientas del electricista"],
    syllabus: [
      { module: "Conceptos", topics: ["Ley de Ohm", "Potencia y energía"] },
      { module: "Mediciones", topics: ["Multímetro", "Pinza amperimétrica"] },
      { module: "Circuitos", topics: ["Serie", "Paralelo", "Mixtos"] },
    ],
  },
  {
    slug: "lectura-de-planos-electricos",
    title: "Lectura de planos y diseño eléctrico",
    category: "Tableros",
    level: "Intermedio",
    modality: "Virtual en vivo",
    durationHours: 24,
    image: "/images/hero/tablero.jpg",
    summary:
      "Interpreta y elabora planos eléctricos, diagramas unifilares y esquemas de control con software CAD.",
    learn: ["Simbología normalizada", "Diagramas unifilares", "Esquemas de control", "Metrados y presupuestos"],
    syllabus: [
      { module: "Simbología", topics: ["IEC", "ANSI"] },
      { module: "Planos", topics: ["Unifilares", "Multifilares", "Control"] },
      { module: "CAD", topics: ["Plantillas", "Bloques", "Impresión"] },
    ],
  },
];

export const categories = Array.from(new Set(courses.map((c) => c.category)));

export function getFeaturedCourses(limit = 4): Course[] {
  return courses.filter((c) => c.featured).slice(0, limit);
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
