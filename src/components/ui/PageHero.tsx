"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment, useRef } from "react";

interface PageHeroProps {
  eyebrow: string;
  /** Título; se anima palabra por palabra. */
  title: string;
  /** Palabras finales resaltadas en amarillo (opcional). */
  highlight?: string;
  text?: string;
  image: string;
  crumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}

/**
 * Cabecera de páginas internas con efecto "encendido":
 *  - ENTRADA (CSS puro, se ve aunque JS aún no cargue): la foto se destapa de
 *    izquierda a derecha detrás de una línea de luz cian, como un tubo que enciende,
 *    y el título sube palabra por palabra.
 *  - SALIDA (al hacer scroll): el contenido sube, se desvanece y se desenfoca;
 *    la foto se queda atrás con parallax.
 */
export function PageHero({ eyebrow, title, highlight, text, image, crumbs, children }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(p, [0, 1], [0, -90]);
  const contentOpacity = useTransform(p, [0, 0.75], [1, 0]);
  const contentBlur = useTransform(p, [0, 0.75], ["blur(0px)", "blur(6px)"]);
  const imageY = useTransform(p, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(p, [0, 1], [1, 1.12]);

  const words = [
    ...title.split(" ").map((w) => ({ w, hl: false })),
    ...(highlight ? highlight.split(" ").map((w) => ({ w, hl: true })) : []),
  ];
  const fullTitle = highlight ? `${title} ${highlight}` : title;
  const delayAfterTitle = 0.45 + words.length * 0.07;

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink pt-36 pb-20 text-white sm:pt-44 sm:pb-28">
      <motion.div
        className="hero-power-on absolute inset-0"
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
      >
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-35" />
      </motion.div>
      <span className="hero-scan" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      <div className="bg-circuit absolute inset-0" />

      <motion.div
        className="container-x relative md:pl-24 lg:pl-28"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity, filter: contentBlur }}
      >
        <nav aria-label="Ruta de navegación" className="hero-fade mb-6 text-xs font-semibold text-white/50" style={{ "--d": "0.2s" } as React.CSSProperties}>
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="hover:text-volt">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white/80" aria-current="page">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        <span className="eyebrow hero-fade" style={{ "--d": "0.3s" } as React.CSSProperties}>
          {eyebrow}
        </span>

        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.08] font-extrabold text-balance sm:text-6xl" aria-label={fullTitle}>
          {words.map(({ w, hl }, i) => (
            <Fragment key={i}>
              <span className="hero-word-mask" aria-hidden="true">
                <span
                  className={`hero-word ${hl ? "text-volt" : ""}`}
                  style={{ "--d": `${0.4 + i * 0.07}s` } as React.CSSProperties}
                >
                  {w}
                </span>
              </span>
              {i < words.length - 1 && " "}
            </Fragment>
          ))}
        </h1>

        {text && (
          <p
            className="hero-fade mt-5 max-w-2xl text-lg text-white/70"
            style={{ "--d": `${delayAfterTitle}s` } as React.CSSProperties}
          >
            {text}
          </p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
