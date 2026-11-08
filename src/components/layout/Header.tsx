"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { mainNav, socialLinks } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { CloseIcon, MenuIcon, WhatsAppIcon, socialIcons, socialBrandClass } from "@/components/ui/Icons";
import { useContact } from "./ContactModal";

export function Header() {
  const pathname = usePathname();
  const { openContact } = useContact();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-out-expo ${
            scrolled ? "bg-ink/85 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl" : "bg-transparent py-5"
          }`}
        >
          <nav className="container-x flex items-center justify-between gap-6" aria-label="Principal">
            <Logo />

            <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur lg:flex">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative">
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/12"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Link
                      href={item.href}
                      className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        active ? "text-volt" : "text-white/75 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <button onClick={() => openContact()} className="btn btn-primary shine hidden sm:inline-flex">
                <WhatsAppIcon className="h-4 w-4" />
                Contáctame
              </button>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white lg:hidden"
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="bg-circuit fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-28 pb-10 lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }}
          >
            <motion.ul
              className="space-y-2"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {mainNav.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 font-display text-4xl font-extrabold ${
                      isActive(item.href) ? "text-volt" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              className="mt-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openContact();
                }}
                className="btn btn-primary w-full py-4 text-base"
              >
                <WhatsAppIcon className="h-5 w-5" /> Contáctame
              </button>
              <div className="flex justify-center gap-3">
                {socialLinks.map(({ network, label, href }) => {
                  const Icon = socialIcons[network];
                  return (
                    <a
                      key={network}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`grid h-11 w-11 place-items-center rounded-full ${socialBrandClass[network]}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
