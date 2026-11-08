"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 56 },
  right: { x: -56 },
  none: {},
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** Si es false, el elemento también anima su salida al abandonar la pantalla. */
  once?: boolean;
  as?: "div" | "section" | "li" | "article" | "header";
}

/**
 * Animación de entrada/salida al hacer scroll.
 * Respeta "reducir movimiento" del sistema operativo.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = false,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(6px)", ...offset[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: "0px 0px -60px 0px" }}
      variants={variants}
    >
      {children}
    </Tag>
  );
}

/** Contenedor que anima a sus hijos en cascada. */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  once = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
