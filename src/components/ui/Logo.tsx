"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { LogoMark } from "./LogoMark";

/**
 * Logo de Electrind (vector (SVG)) con efecto de chispas:
 * cada pocos segundos, y al pasar el mouse, el rayo "chispea".
 */
export function Logo({ sparks = true }: { sparks?: boolean }) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    if (!sparks || reduce) return;
    const first = setTimeout(() => setBurst((b) => b + 1), 900);
    const id = setInterval(() => setBurst((b) => b + 1), 3800);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [sparks, reduce]);

  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label={`${siteConfig.name}, ir al inicio`}
      onMouseEnter={() => sparks && !reduce && setBurst((b) => b + 1)}
    >
      <span className="relative block h-11 w-11 shrink-0">
        <motion.span
          key={burst}
          className="absolute inset-0"
          initial={false}
          animate={
            burst
              ? {
                  filter: [
                    "drop-shadow(0 0 0px #8be9ff) brightness(1)",
                    "drop-shadow(0 0 10px #8be9ff) brightness(1.6)",
                    "drop-shadow(0 0 2px #8be9ff) brightness(0.9)",
                    "drop-shadow(0 0 14px #f4bd28) brightness(1.5)",
                    "drop-shadow(0 0 0px #8be9ff) brightness(1)",
                  ],
                }
              : undefined
          }
          transition={{ duration: 0.6, times: [0, 0.15, 0.3, 0.45, 1] }}
        >
          <LogoMark className="h-full w-full transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:rotate-[-6deg]" />
        </motion.span>
        <AnimatePresence>{burst > 0 && <SparkBurst key={burst} />}</AnimatePresence>
      </span>
      <span className="font-display text-[1.35rem] leading-none font-extrabold tracking-[0.06em] text-arc sm:text-2xl">
        ELECTRIND
      </span>
    </Link>
  );
}

const COLORS = ["#ffffff", "#8be9ff", "#f4bd28", "#ff6b1a", "#fff6c2"];

function SparkBurst() {
  // Partículas generadas en el cliente (posición/ángulo aleatorio en cada ráfaga)
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5) * 0.6;
        const dist = 18 + Math.random() * 26;
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist + 6, // gravedad: caen un poco
          rot: (angle * 180) / Math.PI,
          len: 4 + Math.random() * 7,
          color: COLORS[i % COLORS.length],
          delay: Math.random() * 0.12,
        };
      }),
    [],
  );

  return (
    <span className="pointer-events-none absolute top-1/2 left-1/2" aria-hidden="true">
      {/* Destello central */}
      <motion.span
        className="absolute -top-5 -left-5 h-10 w-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.95),rgba(139,233,255,.5)_35%,transparent_70%)]"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.4, 0.6], opacity: [0, 1, 0] }}
        transition={{ duration: 0.45 }}
      />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute top-0 left-0 block h-[2px] rounded-full"
          style={{
            width: p.len,
            background: `linear-gradient(90deg, transparent, ${p.color})`,
            boxShadow: `0 0 6px ${p.color}`,
            rotate: p.rot,
            originX: 0,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.55 + Math.random() * 0.3, delay: p.delay, ease: [0.2, 0.8, 0.4, 1] }}
        />
      ))}
    </span>
  );
}
