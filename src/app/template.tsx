"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

// En la primera carga no animamos (el contenido se ve de inmediato: mejor LCP/SEO).
// En las navegaciones siguientes se muestra la cortina de transición.
let isFirstLoad = true;

/** Transición de entrada al navegar entre páginas. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animateIn = !isFirstLoad;
  useEffect(() => {
    isFirstLoad = false;
  }, []);

  return (
    <>
      {animateIn && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-volt"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.div
        initial={animateIn ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
