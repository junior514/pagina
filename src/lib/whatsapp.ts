import { siteConfig } from "@/config/site";

/** Construye un enlace a WhatsApp con un mensaje prellenado. */
export function whatsappLink(message: string = siteConfig.whatsappDefaultMessage): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function courseWhatsappLink(courseTitle: string): string {
  return whatsappLink(
    `Hola Electrind 👋, quiero información sobre el curso "${courseTitle}": horarios, precio y modalidad.`,
  );
}
