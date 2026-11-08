import Link from "next/link";
import { mainNav, siteConfig, socialLinks } from "@/config/site";
import { courses } from "@/data/courses";
import { Logo } from "@/components/ui/Logo";
import { MailIcon, PhoneIcon, PinIcon, socialIcons, socialBrandClass } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-circuit relative overflow-hidden bg-ink text-white/70">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed">{siteConfig.description}</p>
          <div className="flex gap-2">
            {socialLinks.map(({ network, label, href }) => {
              const Icon = socialIcons[network];
              return (
                <a
                  key={network}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid h-9 w-9 place-items-center rounded-full transition hover:-translate-y-1 hover:scale-105 ${socialBrandClass[network]}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <FooterCol title="Navegación">
          {mainNav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="transition hover:text-volt">
                {n.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Cursos populares">
          {courses.slice(0, 5).map((c) => (
            <li key={c.slug}>
              <Link href={`/cursos/${c.slug}`} className="transition hover:text-volt">
                {c.title}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contacto">
          <li className="flex items-start gap-3">
            <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" /> {siteConfig.phoneDisplay}
          </li>
          <li className="flex items-start gap-3">
            <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-volt">
              {siteConfig.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-volt" /> {siteConfig.address}
          </li>
        </FooterCol>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos los derechos reservados.
          </p>
          <p className="text-white/40">Capacitación eléctrica e industrial</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-5 text-sm font-bold tracking-wider text-white uppercase">{title}</h3>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}
