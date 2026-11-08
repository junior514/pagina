/**
 * Configuración central del sitio.
 * Cambia aquí el número de WhatsApp, las redes sociales y el menú:
 * todo el sitio toma los datos de este archivo.
 */

export const siteConfig = {
  name: "Electrind",
  tagline: "Capacitación eléctrica e industrial",
  description:
    "Cursos de electricidad, armado de tableros eléctricos, programación PLC y automatización industrial. Aprende con práctica real y certificación.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_PE",

  /** Número en formato internacional, solo dígitos (código de país + número). */
  whatsappNumber: "51999999999",
  whatsappDefaultMessage:
    "Hola Electrind 👋, quisiera más información sobre sus cursos.",

  email: "informes@electrind.pe",
  phoneDisplay: "+51 999 999 999",
  address: "Lima, Perú",
} as const;

export type SocialNetwork = "linkedin" | "facebook" | "tiktok" | "instagram" | "youtube";

export const socialLinks: { network: SocialNetwork; label: string; href: string }[] = [
  { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/electrind" },
  { network: "facebook", label: "Facebook", href: "https://www.facebook.com/electrind" },
  { network: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@electrind" },
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/electrind" },
  { network: "youtube", label: "YouTube", href: "https://www.youtube.com/@electrind" },
];

export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Cursos", href: "/cursos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Metodología", href: "/#metodologia" },
  { label: "Testimonios", href: "/#testimonios" },
] as const;
