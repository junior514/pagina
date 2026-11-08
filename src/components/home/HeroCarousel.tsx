"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Slide } from "@/data/slides";
import { ElectricTitle } from "./ElectricTitle";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "@/components/ui/Icons";

const AUTOPLAY_SECONDS = 6.5;
const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const reduce = useReducedMotion();
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false); // pausa manual (botón)
  const [tabHidden, setTabHidden] = useState(false); // pestaña en segundo plano
  const [deleting, setDeleting] = useState(false); // el título se está borrando
  const progress = useMotionValue(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  const go = useCallback(
    (dir: number, target?: number) =>
      setState(([i]) => [target ?? (i + dir + slides.length) % slides.length, dir]),
    [slides.length],
  );

  // Autoplay: la barra avanza; al llenarse, el título se borra y recién ahí cambia la diapositiva
  useEffect(() => {
    progress.set(0);
    setDeleting(false);
    controls.current = animate(progress, 1, {
      duration: AUTOPLAY_SECONDS,
      ease: "linear",
      onComplete: () => setDeleting(true),
    });
    return () => controls.current?.stop();
  }, [index, progress]);

  // La pausa solo detiene la barra (nunca congela el título a mitad de palabra)
  useEffect(() => {
    if (paused || tabHidden) controls.current?.pause();
    else controls.current?.play();
  }, [paused, tabHidden, index]);

  // Pestaña oculta: pausa; al volver: continúa (sin quitar una pausa manual)
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Cuando el título terminó de borrarse, pasa a la siguiente (solo si seguimos en la misma)
  const onTitleDeleted = useCallback(
    (from: number) =>
      setState(([i, d]) => (i === from ? [(i + 1) % slides.length, 1] : [i, d])),
    [slides.length],
  );

  const slide = slides[index];

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink"
      aria-roledescription="carrusel"
      aria-label="Destacados"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      {/* Fondo: imagen o video */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          className="absolute inset-0"
          variants={{
            enter: (d: number) => ({
              clipPath: reduce ? "inset(0 0 0 0)" : d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
              opacity: reduce ? 0 : 1,
              zIndex: 1,
            }),
            center: { clipPath: "inset(0 0 0 0)", opacity: 1, zIndex: 1, transition: { duration: 1.1, ease: EASE } },
            exit: { zIndex: 0, opacity: 0.4, transition: { duration: 1.1, ease: EASE } },
          }}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1);
            else if (info.offset.x > 80) go(-1);
          }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: reduce ? 1 : 1.18 }}
            animate={{ scale: reduce ? 1 : 1.04 }}
            transition={{ duration: AUTOPLAY_SECONDS + 2, ease: "easeOut" }}
          >
            {slide.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                quality={80}
                className="object-cover select-none"
                draggable={false}
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        </motion.div>
      </AnimatePresence>

      <div className="bg-circuit pointer-events-none absolute inset-0 z-[2] opacity-60" />

      {/* Contenido */}
      <div className="container-x pointer-events-none relative z-10 flex h-full flex-col justify-center pt-20 md:pl-24 lg:pl-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="pointer-events-auto max-w-2xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
              exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
            }}
          >
            <TextLine>
              <span className="eyebrow">{slide.eyebrow}</span>
            </TextLine>
            <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold text-white sm:text-6xl lg:text-7xl">
              <ElectricTitle
                title={slide.title}
                highlight={slide.highlight}
                deleting={deleting}
                onDeleted={() => onTitleDeleted(index)}
              />
            </h1>
            <TextLine>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{slide.text}</p>
            </TextLine>
            <TextLine>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={slide.cta.href} className="btn btn-primary shine group px-7 py-3.5">
                  {slide.cta.label}
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/cursos" className="btn btn-ghost px-7 py-3.5">
                  Explorar cursos
                </Link>
              </div>
            </TextLine>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controles */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="container-x flex items-end justify-between gap-6 pb-24 md:pb-8 md:pl-24 lg:pl-28">
          <div className="flex flex-1 gap-2 sm:max-w-md" role="tablist" aria-label="Seleccionar diapositiva">
            {slides.map((s, i) => (
              <button
                key={s.src + i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Diapositiva ${i + 1}: ${s.eyebrow}`}
                onClick={() => i !== index && go(i > index ? 1 : -1, i)}
                className="group flex-1 py-3 text-left"
              >
                <span className="mb-2 hidden text-[11px] font-bold tracking-widest text-white/50 uppercase transition group-hover:text-white sm:block">
                  0{i + 1}
                </span>
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/20">
                  {i === index ? (
                    <ProgressFill progress={progress} />
                  ) : (
                    <span className={`block h-full bg-white/60 ${i < index ? "w-full" : "w-0"}`} />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <CtrlButton label={paused ? "Reanudar" : "Pausar"} onClick={() => setPaused((p) => !p)}>
              {paused ? <PlayIcon className="h-4 w-4" /> : <PauseIcon className="h-4 w-4" />}
            </CtrlButton>
            <CtrlButton label="Anterior" onClick={() => go(-1)}>
              <ChevronLeftIcon className="h-5 w-5" />
            </CtrlButton>
            <CtrlButton label="Siguiente" onClick={() => go(1)}>
              <ChevronRightIcon className="h-5 w-5" />
            </CtrlButton>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-28 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-white/50 uppercase lg:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
        <span className="h-10 w-px bg-gradient-to-b from-volt to-transparent" />
      </motion.div>
    </section>
  );
}

function TextLine({ children }: { children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
          exit: { y: "-60%", opacity: 0, transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } },
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function ProgressFill({ progress }: { progress: ReturnType<typeof useMotionValue<number>> }) {
  const width = useTransform(progress, (v) => `${v * 100}%`);
  return <motion.span className="block h-full bg-volt" style={{ width }} />;
}

function CtrlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white backdrop-blur transition hover:border-volt hover:bg-volt hover:text-ink"
    >
      {children}
    </button>
  );
}
