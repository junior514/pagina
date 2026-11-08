import { Reveal } from "@/components/ui/Reveal";
import { AwardIcon, BoltIcon, CpuIcon, WrenchIcon } from "@/components/ui/Icons";

const steps = [
  { icon: BoltIcon, title: "Fundamentos", text: "Teoría aplicada y normativa, explicada de forma clara y directa." },
  { icon: CpuIcon, title: "Simulación", text: "Practicas en software antes de tocar equipos reales." },
  { icon: WrenchIcon, title: "Laboratorio", text: "Armas, cableas y programas con equipos industriales." },
  { icon: AwardIcon, title: "Certificación", text: "Proyecto final evaluado y certificado de competencias." },
];

export function Methodology() {
  return (
    <section id="metodologia" className="bg-circuit relative overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Metodología</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Aprende en <span className="text-volt">4 pasos</span>
          </h2>
          <p className="mt-4 text-white/65">Un método probado que lleva de la teoría a la práctica profesional.</p>
        </Reveal>

        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute top-10 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-volt/0 via-volt/60 to-volt/0 lg:block" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="group relative">
              <div className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-volt/50 hover:bg-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-volt text-ink transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-5xl font-extrabold text-white/10">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-xl font-extrabold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
