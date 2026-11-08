"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Fondo fotográfico que acompaña todo el bloque (Cursos + Nosotros).
 * La foto queda fija detrás del contenido (sticky, funciona también en iPhone)
 * y se va revelando al bajar: la "ventana" se abre de una franja central a
 * pantalla completa, la imagen se acerca suavemente y gana color.
 */
export function PhotoRevealZone({
  children,
  src = "/images/fondos/cableado-industrial.jpg",
  alt = "Bandejas de cableado y tableros eléctricos en una sala técnica",
}: {
  children: ReactNode;
  src?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // 0 → la zona asoma por abajo · 1 → la zona salió por arriba
  const clip = useTransform(
    p,
    [0, 0.22, 0.9, 1],
    [
      "inset(22% 12% 22% 12% round 40px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(6% 4% 6% 4% round 32px)",
    ],
  );
  const scale = useTransform(p, [0, 0.3, 1], [1.28, 1.06, 1.16]);
  const y = useTransform(p, [0, 1], ["-4%", "4%"]);
  const filter = useTransform(
    p,
    [0, 0.25, 0.85, 1],
    ["saturate(0) brightness(0.9)", "saturate(1) brightness(1)", "saturate(1) brightness(1)", "saturate(0.3) brightness(0.9)"],
  );
  const veil = useTransform(p, [0, 0.22, 0.85, 1], [0.9, 0.62, 0.62, 0.9]);

  return (
    <div ref={ref} className="relative isolate bg-ink">
      {/* Capa de fondo: ocupa toda la zona; dentro, la foto queda fija en pantalla */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <motion.div className="absolute inset-0" style={reduce ? undefined : { clipPath: clip }}>
            <motion.div className="absolute inset-0" style={reduce ? undefined : { scale, y, filter }}>
              <Image src={src} alt={alt} fill sizes="100vw" quality={78} className="object-cover object-[50%_35%]" />
            </motion.div>
            {/* Velo para mantener la lectura del contenido */}
            <motion.div className="absolute inset-0 bg-ink" style={{ opacity: reduce ? 0.68 : veil }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(11,18,24,0.75)_100%)]" />
          </motion.div>
        </div>
      </div>
      {children}
    </div>
  );
}
