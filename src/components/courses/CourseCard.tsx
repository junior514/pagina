"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import type { Course } from "@/data/courses";
import { ArrowRightIcon, ClockIcon, LevelIcon, MonitorIcon } from "@/components/ui/Icons";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrada/salida de la tarjeta (se activa por el contenedor: Stagger o el catálogo). */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: EASE, delay },
  }),
};

/** La foto se "destapa" de abajo hacia arriba mientras se aleja el zoom. */
const photoReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (delay: number = 0) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.9, ease: EASE, delay: delay + 0.12 },
  }),
};
const photoZoom: Variants = {
  hidden: { scale: 1.3 },
  visible: (delay: number = 0) => ({ scale: 1, transition: { duration: 1.2, ease: EASE, delay: delay + 0.12 } }),
};

export function CourseCard({
  course,
  priority = false,
  revealDelay = 0,
}: {
  course: Course;
  priority?: boolean;
  revealDelay?: number;
}) {
  const href = `/cursos/${course.slug}`;
  const reduce = useReducedMotion();

  // Inclinación 3D + luz que sigue al cursor (solo con mouse)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const lx = useMotionValue(-999);
  const ly = useMotionValue(-999);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${lx}px ${ly}px, rgba(31,182,217,0.16), rgba(244,189,40,0.08) 40%, transparent 70%)`;

  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    lx.set(e.clientX - r.left);
    ly.set(e.clientY - r.top);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.article
      variants={cardVariants}
      custom={revealDelay}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[box-shadow,border-color] duration-500 ease-out-expo hover:border-volt/60 hover:shadow-[0_30px_60px_-30px_rgba(11,18,24,0.45)]"
    >
      {/* Luz que sigue al cursor */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-ink" tabIndex={-1} aria-hidden="true">
        <motion.div className="absolute inset-0" variants={photoReveal} custom={revealDelay}>
          <motion.div className="absolute inset-0" variants={photoZoom} custom={revealDelay}>
            <Image
              src={course.image}
              alt=""
              fill
              priority={priority}
              sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        </motion.div>
        <span className="absolute top-4 left-4 z-10 rounded-full bg-volt px-3 py-1 text-[11px] font-extrabold tracking-wide text-ink uppercase">
          {course.category}
        </span>
        <span className="absolute right-4 bottom-4 z-10 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <ClockIcon className="h-3.5 w-3.5" /> {course.durationHours} h
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg leading-snug font-extrabold">
          <Link href={href} className="after:absolute after:inset-0 after:z-30 after:content-['']">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-steel">{course.summary}</p>

        <div className="mt-5 mb-6 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-ink/70">
          <span className="flex items-center gap-1.5">
            <LevelIcon className="h-4 w-4 text-volt" /> {course.level}
          </span>
          <span className="flex items-center gap-1.5">
            <MonitorIcon className="h-4 w-4 text-volt" /> {course.modality}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
          <span className="text-sm font-bold">Ver detalles</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-all duration-500 ease-out-expo group-hover:rotate-[-45deg] group-hover:bg-volt group-hover:text-ink">
            <ArrowRightIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
