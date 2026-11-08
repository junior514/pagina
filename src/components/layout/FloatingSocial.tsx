"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { socialLinks } from "@/config/site";
import { ShareIcon, CloseIcon, WhatsAppIcon, socialIcons, socialBrandClass } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Botones flotantes de redes sociales (cada uno con el color oficial de su red) + WhatsApp.
 * Están en el layout raíz, por lo que se mantienen en todas las páginas.
 */
export function FloatingSocial() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Escritorio: barra vertical a la izquierda */}
      <motion.aside
        aria-label="Redes sociales"
        className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 md:block"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
      >
        <ul className="flex flex-col gap-2.5 p-2">
          {socialLinks.map(({ network, label, href }) => {
            const Icon = socialIcons[network];
            return (
              <motion.li
                key={network}
                variants={{ hidden: { opacity: 0, x: -30, scale: 0.6 }, visible: { opacity: 1, x: 0, scale: 1 } }}
                className="group relative"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:scale-110 ${socialBrandClass[network]}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
                <span className="pointer-events-none absolute top-1/2 left-full ml-3 -translate-x-2 -translate-y-1/2 rounded-md bg-ink px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  {label}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.aside>

      {/* Móvil: botón que despliega las redes */}
      <div className="fixed bottom-5 left-4 z-40 md:hidden">
        <AnimatePresence>
          {mobileOpen && (
            <motion.ul
              className="mb-3 flex flex-col gap-2.5"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                hidden: { transition: { staggerChildren: 0.03 } },
              }}
            >
              {socialLinks.map(({ network, label, href }) => {
                const Icon = socialIcons[network];
                return (
                  <motion.li
                    key={network}
                    variants={{ hidden: { opacity: 0, y: 20, scale: 0.5 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className={`grid h-12 w-12 place-items-center rounded-full ${socialBrandClass[network]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Ocultar redes sociales" : "Mostrar redes sociales"}
          aria-expanded={mobileOpen}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink text-volt shadow-xl"
        >
          <motion.span animate={{ rotate: mobileOpen ? 90 : 0 }}>
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <ShareIcon className="h-5 w-5" />}
          </motion.span>
        </button>
      </div>

      {/* WhatsApp flotante (todas las vistas) */}
      <motion.a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="pulse-ring group fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)]"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
      >
        <WhatsAppIcon className="h-7 w-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden rounded-lg bg-white px-3 py-1.5 text-xs font-bold whitespace-nowrap text-ink opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
          ¿Hablamos?
        </span>
      </motion.a>
    </>
  );
}
