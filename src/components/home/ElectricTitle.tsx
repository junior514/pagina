"use client";

import { animate, useMotionValue, useMotionValueEvent, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/** Velocidad de escritura/borrado (por letra), con límites para títulos cortos o largos. */
const TYPE_MS_PER_CHAR = 55;
const TYPE_MIN = 1.1;
const TYPE_MAX = 2.2;
const DELETE_SECONDS = 0.6;

interface ElectricTitleProps {
  title: string;
  highlight: string;
  /** Cuando pasa a true, el título se borra; al terminar llama a onDeleted. */
  deleting: boolean;
  onDeleted: () => void;
}

/**
 * Título que se escribe y se borra solo, con efecto de electricidad:
 * cada letra nueva "enciende" con un destello, el cursor es un arco eléctrico
 * que suelta chispas y el texto parpadea como un fluorescente al terminar.
 *
 * La escritura y el borrado tienen su PROPIO reloj: nunca se congelan a mitad
 * de palabra (pausar el carrusel solo alarga el tiempo con el título completo).
 * El texto completo siempre está disponible para lectores de pantalla y SEO.
 */
export function ElectricTitle({ title, highlight, deleting, onDeleted }: ElectricTitleProps) {
  const reduce = useReducedMotion();
  const total = title.length + 1 + highlight.length; // +1 = salto de línea
  const progress = useMotionValue(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "idle" | "deleting">("typing");
  const onDeletedRef = useRef(onDeleted);
  onDeletedRef.current = onDeleted;

  useMotionValueEvent(progress, "change", (v) => setCount(Math.round(v)));

  // Escritura: arranca al montar y corre hasta el final sin depender de nada más
  useEffect(() => {
    if (reduce) {
      progress.set(total);
      setPhase("idle");
      return;
    }
    const duration = Math.min(TYPE_MAX, Math.max(TYPE_MIN, (total * TYPE_MS_PER_CHAR) / 1000));
    const c = animate(progress, total, {
      duration,
      ease: "linear",
      onComplete: () => setPhase("idle"),
    });
    return () => c.stop();
  }, [progress, total, reduce]);

  // Borrado: lo pide el carrusel al terminar el tiempo de la diapositiva
  useEffect(() => {
    if (!deleting) return;
    if (reduce) {
      onDeletedRef.current();
      return;
    }
    setPhase("deleting");
    const c = animate(progress, 0, {
      duration: DELETE_SECONDS,
      ease: "easeIn",
      onComplete: () => onDeletedRef.current(),
    });
    return () => c.stop();
  }, [deleting, progress, reduce]);

  const chars = useMemo(
    () => [
      ...[...title].map((c) => ({ c, hl: false })),
      { c: "\n", hl: false },
      ...[...highlight].map((c) => ({ c, hl: true })),
    ],
    [title, highlight],
  );

  const shown = reduce ? total : count;
  const active = !reduce && phase !== "idle";

  return (
    <span className="relative block">
      <span className="sr-only">
        {title} {highlight}
      </span>

      {/* Texto fantasma: reserva el espacio para que nada "salte" */}
      <span className="invisible block" aria-hidden="true">
        <span className="block">{title}</span>
        <span className="block">{highlight}</span>
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 block ${phase === "idle" && !reduce ? "e-flicker" : ""}`}
      >
        {renderLines(chars, shown, active, phase)}
      </span>
    </span>
  );
}

function renderLines(
  chars: { c: string; hl: boolean }[],
  shown: number,
  active: boolean,
  phase: "typing" | "idle" | "deleting",
) {
  const lines: React.ReactNode[][] = [[], []];
  let line = 0;
  let cursorPlaced = false;

  const cursor = (key: string) => (
    <span key={key} className={`e-cursor ${active ? "e-cursor-live" : ""}`}>
      {active && (
        <>
          <i className="e-spark e-spark-1" />
          <i className="e-spark e-spark-2" />
          <i className="e-spark e-spark-3" />
        </>
      )}
    </span>
  );

  chars.forEach((ch, i) => {
    if (ch.c === "\n") {
      if (i === shown && !cursorPlaced) {
        lines[line].push(cursor("cur"));
        cursorPlaced = true;
      }
      line = 1;
      return;
    }
    if (i < shown) {
      // Las 3 últimas letras escritas brillan como recién "energizadas"
      const hot = phase === "typing" && shown - i <= 3;
      lines[line].push(
        <span key={i} className={`${ch.hl ? "text-volt" : "text-white"} ${hot ? "e-hot" : ""}`}>
          {ch.c}
        </span>,
      );
    }
    if (i + 1 === shown && !cursorPlaced) {
      lines[line].push(cursor("cur"));
      cursorPlaced = true;
    }
  });
  if (!cursorPlaced) lines[0].unshift(cursor("cur"));

  return (
    <>
      <span className="block min-h-[1em]">{lines[0]}</span>
      <span className="block min-h-[1em]">{lines[1]}</span>
    </>
  );
}
