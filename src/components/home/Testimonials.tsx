import { Reveal } from "@/components/ui/Reveal";

// Testimonios de ejemplo: reemplazar por testimonios reales del cliente.
const testimonials = [
  {
    quote:
      "El curso de PLC me abrió las puertas en planta. Las prácticas con equipos reales hicieron toda la diferencia.",
    name: "Alumno de ejemplo",
    role: "Técnico de mantenimiento",
  },
  {
    quote: "Aprendí a armar tableros con un acabado profesional. Hoy tengo mi propio taller de servicios eléctricos.",
    name: "Alumna de ejemplo",
    role: "Contratista eléctrica",
  },
  {
    quote: "Docentes con mucha experiencia de campo. Explican lo que de verdad se usa en la industria.",
    name: "Alumno de ejemplo",
    role: "Ingeniero de proyectos",
  },
];

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-mist py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="max-w-2xl">
          <span className="eyebrow !text-ink/60">Testimonios</span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-5xl">
            Lo que dicen <span className="marker">nuestros alumnos</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.12} direction={i === 0 ? "right" : i === 2 ? "left" : "up"}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_50px_-30px_rgba(11,18,24,0.4)]">
                <span className="font-display text-6xl leading-none font-extrabold text-volt" aria-hidden="true">
                  “
                </span>
                <blockquote className="mt-2 flex-1 leading-relaxed text-ink/80">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink font-bold text-volt">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold">{t.name}</span>
                    <span className="block text-xs text-steel">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
