"use client";

import Image from "next/image";
import { useContact } from "@/components/layout/ContactModal";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";

export function ContactCta({ title = "¿Listo para dar el siguiente paso?" }: { title?: string }) {
  const { openContact } = useContact();
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center text-white sm:px-16">
            <Image
              src="/images/hero/subestacion.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover opacity-25"
            />
            <div className="bg-circuit absolute inset-0" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
              <p className="mx-auto mt-4 max-w-xl text-white/70">
                Escríbenos y te asesoramos para elegir el curso ideal según tu experiencia y objetivos.
              </p>
              <button onClick={() => openContact()} className="btn btn-primary shine mt-9 px-8 py-4 text-base">
                <WhatsAppIcon className="h-5 w-5" /> Contáctame por WhatsApp
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
