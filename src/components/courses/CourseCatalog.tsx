"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import type { Course, CourseCategory } from "@/data/courses";
import { CourseCard } from "./CourseCard";
import { SearchIcon } from "@/components/ui/Icons";

type Filter = "Todos" | CourseCategory;

export function CourseCatalog({ courses, categories }: { courses: Course[]; categories: CourseCategory[] }) {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = deferredQuery
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
    return courses.filter((c) => {
      if (filter !== "Todos" && c.category !== filter) return false;
      if (!q) return true;
      const hay = `${c.title} ${c.summary} ${c.category}`
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");
      return hay.includes(q);
    });
  }, [courses, filter, deferredQuery]);

  const filters: Filter[] = ["Todos", ...categories];

  return (
    <div>
      <div className="sticky top-20 z-30 -mx-4 mb-10 flex flex-col gap-4 bg-mist/90 px-4 py-4 backdrop-blur-lg sm:mx-0 sm:rounded-2xl lg:flex-row lg:items-center lg:justify-between">
        <LayoutGroup>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="tablist" aria-label="Categorías">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors ${
                    active ? "text-ink" : "text-steel hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-volt"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <label className="relative block lg:w-72">
          <span className="sr-only">Buscar curso</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-steel" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar curso…"
            className="input !rounded-full !bg-white pl-11"
          />
        </label>
      </div>

      <p className="mb-6 text-sm font-semibold text-steel" aria-live="polite">
        {results.length} {results.length === 1 ? "curso encontrado" : "cursos encontrados"}
      </p>

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {results.map((course, i) => (
            <motion.div
              key={course.slug}
              layout
              initial="hidden"
              whileInView="visible"
              // Entra al aparecer en pantalla y se desvanece al salir (también al volver a subir)
              viewport={{ once: false, amount: 0.15, margin: "0px 0px -40px 0px" }}
              // Al cambiar de filtro: sale rápido encogiéndose y desenfocándose
              exit={{ opacity: 0, scale: 0.86, filter: "blur(8px)", transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] } }}
              transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
            >
              {/* Retraso por columna: la fila entra en cascada de izquierda a derecha */}
              <CourseCard course={course} priority={i < 4} revealDelay={(i % 4) * 0.08} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {results.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
          <p className="font-display text-2xl font-extrabold">No encontramos cursos</p>
          <p className="mt-2 text-steel">Prueba con otra palabra o categoría.</p>
        </motion.div>
      )}
    </div>
  );
}
