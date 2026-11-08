"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Course } from "@/data/courses";
import { useContact } from "@/components/layout/ContactModal";
import { ClockIcon, LevelIcon, MonitorIcon, AwardIcon, WhatsAppIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { courseWhatsappLink } from "@/lib/whatsapp";

export function Syllabus({ syllabus }: { syllabus: Course["syllabus"] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {syllabus.map((m, i) => {
        const isOpen = open === i;
        return (
          <li key={m.module}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 px-6 py-5 text-left transition hover:bg-mist"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-sm font-extrabold text-volt">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-extrabold">{m.module}</span>
              <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-steel">
                <ChevronRightIcon className="h-5 w-5" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 px-6 pb-6 pl-[4.75rem] text-sm text-steel">
                    {m.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-volt" /> {t}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function EnrollCard({ course }: { course: Course }) {
  const { openContact } = useContact();
  const rows = [
    { icon: ClockIcon, label: "Duración", value: `${course.durationHours} horas` },
    { icon: LevelIcon, label: "Nivel", value: course.level },
    { icon: MonitorIcon, label: "Modalidad", value: course.modality },
    { icon: AwardIcon, label: "Certificado", value: "Incluido" },
  ];
  return (
    <motion.aside
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_60px_-35px_rgba(11,18,24,0.5)] lg:sticky lg:top-28"
    >
      <div className="relative aspect-video bg-ink">
        <Image src={course.image} alt={course.title} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
      </div>
      <div className="p-7">
        <ul className="space-y-4">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 text-steel">
                <r.icon className="h-4 w-4 text-volt" /> {r.label}
              </span>
              <span className="font-bold">{r.value}</span>
            </li>
          ))}
        </ul>
        <button onClick={() => openContact(course.title)} className="btn btn-primary shine mt-7 w-full py-4 text-base">
          <WhatsAppIcon className="h-5 w-5" /> Inscribirme
        </button>
        <a
          href={courseWhatsappLink(course.title)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-center text-xs font-semibold text-steel hover:text-ink"
        >
          o escríbenos directo a WhatsApp →
        </a>
      </div>
    </motion.aside>
  );
}
