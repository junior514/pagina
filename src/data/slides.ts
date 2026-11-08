/**
 * Diapositivas del carrusel principal.
 * Admite imágenes (`type: "image"`) o videos (`type: "video"`, con `poster` de respaldo).
 * Ejemplo de video:
 *   { type: "video", src: "/videos/taller.mp4", poster: "/images/hero/tablero.jpg", ... }
 */

export type Slide = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: { label: string; href: string };
};

export const slides: Slide[] = [
  {
    type: "image",
    src: "/images/hero/tablero.jpg",
    alt: "Técnico cableando un tablero eléctrico",
    eyebrow: "Tableros eléctricos",
    title: "Arma tableros como",
    highlight: "un profesional",
    text: "Aprende diseño, montaje y cableado de tableros de fuerza y control con práctica real en taller.",
    cta: { label: "Ver curso", href: "/cursos/armado-de-tableros-electricos" },
  },
  {
    type: "image",
    src: "/images/hero/subestacion.jpg",
    alt: "Subestación eléctrica de alta tensión",
    eyebrow: "Automatización industrial",
    title: "Programa PLC y",
    highlight: "automatiza procesos",
    text: "Lógica ladder, HMI y redes industriales: las habilidades que la industria está buscando hoy.",
    cta: { label: "Ver curso", href: "/cursos/programacion-plc-desde-cero" },
  },
  {
    type: "image",
    src: "/images/hero/solar.jpg",
    alt: "Instalación de paneles solares fotovoltaicos",
    eyebrow: "Energías renovables",
    title: "Instala sistemas",
    highlight: "fotovoltaicos",
    text: "Dimensiona e instala sistemas solares aislados y conectados a red con seguridad y eficiencia.",
    cta: { label: "Ver curso", href: "/cursos/sistemas-fotovoltaicos" },
  },
  {
    type: "image",
    src: "/images/cursos/cableado.jpg",
    alt: "Electricista instalando cableado en obra",
    eyebrow: "Certificación técnica",
    title: "Tu carrera eléctrica",
    highlight: "empieza aquí",
    text: "Cursos prácticos, docentes con experiencia en campo y certificado al finalizar.",
    cta: { label: "Ver todos los cursos", href: "/cursos" },
  },
];
