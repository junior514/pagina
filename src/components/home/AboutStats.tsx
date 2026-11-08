"use client";

import Image from "next/image";
import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { AwardIcon, UsersIcon, WrenchIcon } from "@/components/ui/Icons";

const stats = [
  { value: 3500, suffix: "+", label: "Alumnos capacitados" },
  { value: 12, suffix: "", label: "Años de experiencia" },
  { value: 25, suffix: "+", label: "Cursos y talleres" },
  { value: 98, suffix: "%", label: "Satisfacción" },
];

const pillars = [
  { icon: WrenchIcon, title: "Práctica real", text: "Laboratorios con tableros, PLC y motores industriales." },
  { icon: UsersIcon, title: "Docentes de campo", text: "Ingenieros con años de experiencia en planta y obra." },
  { icon: AwardIcon, title: "Certificación", text: "Certificado con horas lectivas al aprobar el curso." },
];

export function AboutStats() {
  return (
    <section id="nosotros" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-ink">
            <Image
              src="/images/cursos/cableado.jpg"
              alt="Técnicos realizando una instalación eléctrica"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
          </div>
          <motion.div
            className="absolute -right-2 bottom-10 rounded-2xl bg-volt p-6 text-ink shadow-2xl sm:-right-8"
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.3 }}
          >
            <p className="font-display text-5xl font-extrabold">12</p>
            <p className="text-sm font-bold">años formando
              <br />
              técnicos eléctricos</p>
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Nosotros</span>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
              Expertos en <span className="text-volt">electricidad industrial</span>
            </h2>
            <p className="mt-5 leading-relaxed text-white/80">
              En Electrind formamos técnicos e ingenieros con las competencias que exige la industria: desde
              instalaciones residenciales hasta automatización con PLC y sistemas de potencia.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-5">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 * i} direction="left" className="flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-volt text-ink">
                  <p.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-extrabold text-white">{p.title}</h3>
                  <p className="text-sm text-white/70">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.08 * i} className="rounded-2xl border border-white/15 bg-ink/40 p-4 backdrop-blur-sm">
                <p className="font-display text-3xl font-extrabold text-white">
                  <Counter to={s.value} />
                  <span className="text-volt">{s.suffix}</span>
                </p>
                <p className="mt-1 text-xs font-semibold text-white/65">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString("es-PE")}</span>;
}

