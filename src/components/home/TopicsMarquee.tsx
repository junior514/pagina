import { BoltIcon } from "@/components/ui/Icons";

const topics = [
  "Tableros eléctricos",
  "Programación PLC",
  "Variadores de frecuencia",
  "Instalaciones residenciales",
  "Automatización industrial",
  "Sistemas fotovoltaicos",
  "Seguridad eléctrica",
  "Media tensión",
];

export function TopicsMarquee() {
  const row = [...topics, ...topics];
  return (
    <div className="relative z-10 -mt-px overflow-hidden bg-volt py-5" aria-hidden="true">
      <div className="animate-marquee flex w-max gap-10 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-lg font-extrabold whitespace-nowrap text-ink uppercase">
            {t}
            <BoltIcon className="h-5 w-5" />
          </span>
        ))}
      </div>
    </div>
  );
}
