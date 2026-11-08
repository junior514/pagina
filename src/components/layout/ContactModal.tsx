"use client";

import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { courses } from "@/data/courses";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { CloseIcon, WhatsAppIcon } from "@/components/ui/Icons";

type ContactContextValue = { openContact: (courseTitle?: string) => void };
const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact debe usarse dentro de <ContactProvider>");
  return ctx;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState("");

  const openContact = useCallback((courseTitle?: string) => {
    setCourse(courseTitle ?? "");
    setOpen(true);
  }, []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <AnimatePresence>{open && <ContactDialog initialCourse={course} onClose={() => setOpen(false)} />}</AnimatePresence>
    </ContactContext.Provider>
  );
}

function ContactDialog({ initialCourse, onClose }: { initialCourse: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState(initialCourse);
  const [message, setMessage] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Hola ${siteConfig.name} 👋`,
      name && `Mi nombre es ${name.trim()}.`,
      course ? `Me interesa el curso: *${course}*.` : "Quisiera información sobre sus cursos.",
      message.trim(),
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <motion.button
        aria-label="Cerrar"
        className="absolute inset-0 bg-ink/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1, transition: { type: "spring", damping: 26, stiffness: 260 } }}
        exit={{ y: 60, opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
      >
        <div className="bg-circuit relative bg-ink px-7 pt-7 pb-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:rotate-90 hover:bg-white/20"
            aria-label="Cerrar formulario"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <span className="eyebrow">Contáctame</span>
          <h2 id="contact-title" className="mt-2 text-2xl font-extrabold">
            Hablemos por WhatsApp
          </h2>
          <p className="mt-1 text-sm text-white/65">Te respondemos en minutos con horarios, precios y modalidades.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-7 py-6">
          <Field label="Tu nombre">
            <input
              ref={firstField}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Ej. Carlos Ramírez"
              className="input"
            />
          </Field>
          <Field label="Curso de interés">
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="input">
              <option value="">Información general</option>
              {courses.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mensaje (opcional)">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="¿Alguna consulta adicional?"
              className="input resize-none"
            />
          </Field>
          <button type="submit" className="btn btn-primary shine w-full py-3.5 text-base">
            <WhatsAppIcon className="h-5 w-5" />
            Enviar a WhatsApp
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold tracking-wide text-steel uppercase">{label}</span>
      {children}
    </label>
  );
}
