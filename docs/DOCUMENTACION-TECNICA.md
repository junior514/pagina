# Electrind: documentación técnica del sitio web

Documento base para la documentación del proyecto. Describe la tecnología, la arquitectura, cada efecto visual, los recursos gráficos y cómo mantener y desplegar el sitio.

---

## 1. Resumen

Sitio web de Electrind, empresa de capacitación en electricidad: tableros eléctricos, programación PLC, automatización, energía solar y seguridad eléctrica.

| Página | Ruta | Contenido |
|---|---|---|
| Portada | `/` | Carrusel principal, 4 cursos destacados, Nosotros, Metodología, Testimonios, contacto |
| Catálogo | `/cursos` | Todos los cursos, con filtro por categoría y buscador |
| Detalle de curso | `/cursos/[slug]` | Una página por curso: temario, beneficios y botón de inscripción |
| Error 404 | cualquier ruta inexistente | Página "Este circuito está abierto" |

Elementos presentes en todas las páginas:
- menú superior con el botón **Contáctame**, que abre un formulario cuyo envío llega a WhatsApp;
- botones flotantes de **LinkedIn, Facebook, TikTok, Instagram y YouTube**, cada uno con el color oficial de su red;
- botón flotante de **WhatsApp**.

---

## 2. Tecnología

| Capa | Tecnología | Versión | Para qué se usa |
|---|---|---|---|
| Framework | Next.js (App Router) | 15.5 | Páginas, rutas, SEO, optimización de imágenes |
| UI | React | 19 | Componentes |
| Lenguaje | TypeScript | 5 | Tipado estricto en todo el código |
| Estilos | Tailwind CSS | 4 | Sistema de diseño (colores y tipografía en `@theme`) |
| Animación | Motion (antes Framer Motion) | 14 | Animaciones de entrada y salida, scroll y gestos |
| Fuentes | `next/font` (Manrope + DM Sans) | n/a | Se descargan en la compilación y se sirven desde el propio servidor |
| Servidor (producción) | Node.js + PM2 (modo cluster) + Nginx | n/a | Alta disponibilidad en el VPS |

No hay base de datos. El contenido vive en archivos TypeScript (`src/data/`), así que todo el sitio se compila como **HTML estático**.

---

## 3. Arquitectura

```
src/
  app/                     Rutas (App Router)
    layout.tsx             Estructura común: menú, pie, botones flotantes, modal de contacto, SEO
    template.tsx           Transición de cortina al navegar entre páginas
    page.tsx               Portada
    cursos/page.tsx        Catálogo
    cursos/[slug]/page.tsx Detalle (se genera una página estática por curso)
    sitemap.ts, robots.ts  SEO
    not-found.tsx          404
    icon.svg               Favicon (isotipo de Electrind)
    globals.css            Tema (colores, fuentes) y animaciones en CSS
  components/
    layout/                Header, Footer, FloatingSocial, ContactModal
    home/                  Secciones de la portada (HeroCarousel, ElectricTitle, PhotoRevealZone…)
    courses/               CourseCard, CourseCatalog, CourseDetailParts
    ui/                    Logo, LogoMark, Icons, Reveal, PageHero
  config/site.ts           DATOS DE LA EMPRESA: WhatsApp, redes, correo, menú
  data/courses.ts          Catálogo de cursos
  data/slides.ts           Diapositivas del carrusel (imagen o video)
  lib/whatsapp.ts          Generador de enlaces wa.me con mensaje prellenado
public/
  brand/                   Logo en SVG y PNG transparentes
  images/                  Fotos (hero, cursos, fondos)
deploy/                    nginx.conf y deploy.sh para el VPS
scripts/logo-to-png.mjs    Quita el fondo blanco de un logo y genera los PNG
```

**Criterios de diseño del código**
- **Contenido separado de la presentación.** Para cambiar textos, cursos, número de WhatsApp o redes no hay que tocar componentes, solo `config/` y `data/`.
- **Componentes de servidor por defecto.** Solo llevan `"use client"` los que necesitan interacción o animación.
- **Generación estática (SSG).** Las 14 páginas se generan en la compilación, así que cada visita no consume procesamiento del servidor.

---

## 4. Identidad visual

### Colores (`src/app/globals.css`, bloque `@theme`)
| Token | Color | Uso |
|---|---|---|
| `ink` | #0B1218 | Fondos oscuros, texto principal |
| `volt` | #F4BD28 | Amarillo de acción: botones y resaltados |
| `arc` / `arc-2` | #1FB6D9 / #8BE9FF | Cian del logo: efectos eléctricos y palabra "ELECTRIND" |
| `ember` | #FF6B1A | Naranja del logo (chispas) |
| `mist` | #F3F5F6 | Fondos claros |
| `steel` | #66737C | Texto secundario |

### Tipografías
- **Manrope 800:** títulos y logo.
- **DM Sans:** textos.

### Logo
- **Isotipo vectorial** (rayo 3D celeste con rayo naranja y anillo amarillo): `src/components/ui/LogoMark.tsx` y `public/brand/electrind-mark.svg`. Es una recreación fiel del logo entregado como imagen.
- **PNG transparentes** en `public/brand/`: `electrind-icon.png` (512 px), `electrind-logo-horizontal.png` y `electrind-logo-vertical.png`.
- **Logo original del cliente en imagen:** `npm run logo ruta/al/logo.jpg` le quita el fondo blanco y genera los PNG recortados.

### Redes sociales
Cada botón usa el color oficial de su red. La definición está en `socialBrandClass` (`src/components/ui/Icons.tsx`).

| Red | Estilo del botón |
|---|---|
| LinkedIn | Fondo #0A66C2 |
| Facebook | Fondo #1877F2 |
| TikTok | Fondo negro y efecto cian/rojo en el ícono |
| Instagram | Degradado oficial (amarillo, naranja, magenta, azul) |
| YouTube | Fondo #FF0000 |

---

## 5. Catálogo de efectos y animaciones

Principios aplicados:
- cada efecto explica algo (entrada, estado, relación o respuesta a una acción);
- las salidas son más rápidas que las entradas;
- la curva de aceleración es `cubic-bezier(0.16, 1, 0.3, 1)`, una desaceleración natural sin rebotes;
- **todo respeta "Reducir movimiento"** del sistema operativo: si el usuario lo activa, el contenido aparece sin desplazamientos.

| # | Dónde | Efecto | Técnica | Archivo |
|---|---|---|---|---|
| 1 | Logo (menú y pie) | Cada ~4 s y al pasar el mouse, el rayo destella y lanza chispas blancas, cian, amarillas y naranjas | Motion: 14 partículas con ángulo aleatorio y filtro de brillo | `ui/Logo.tsx` |
| 2 | Menú | Aparece al cargar, se oculta al bajar y reaparece al subir; la pastilla del ítem activo se desliza | Motion (`useScroll`, `layoutId`) | `layout/Header.tsx` |
| 3 | Menú móvil | Se abre como un círculo que crece desde la esquina; los enlaces entran en cascada | `clip-path: circle()` + Motion | `layout/Header.tsx` |
| 4 | Carrusel principal | Cambio de diapositiva con cortina lateral (`clip-path`), zoom lento tipo Ken Burns, barra de progreso, pausa, flechas, teclado y swipe | Motion | `home/HeroCarousel.tsx` |
| 5 | Títulos del carrusel | Se escriben y se borran solos; cada letra nueva enciende con un destello, el cursor es un arco que suelta chispas y al terminar parpadea como un fluorescente. La escritura y el borrado tienen su propio reloj y nunca se congelan a mitad de palabra; la diapositiva cambia recién cuando el título terminó de borrarse. El carrusel solo se pausa con el botón de pausa o cuando la pestaña está oculta (y continúa al volver) | CSS (`text-shadow`, keyframes) + Motion | `home/ElectricTitle.tsx` |
| 6 | Franja amarilla | Texto en desplazamiento infinito que se detiene al pasar el mouse | CSS keyframes | `home/TopicsMarquee.tsx` |
| 7 | Bloque Cursos + Nosotros | La foto de fondo aparece en una ventana redondeada que se abre a pantalla completa, gana color y se queda fija mientras el contenido se desliza encima | Motion `useScroll` + `position: sticky` (funciona en iPhone) | `home/PhotoRevealZone.tsx` |
| 8 | Secciones en general | Los bloques entran al aparecer en pantalla (suben, se enfocan) y salen al abandonarla | Motion `whileInView` | `ui/Reveal.tsx` |
| 9 | Cifras de Nosotros | Contadores que suben de 0 al valor final | Motion `animate` | `home/AboutStats.tsx` |
| 10 | **Cabecera de páginas internas** (catálogo y detalle) | **Efecto "encendido":** una línea de luz cian barre la cabecera y destapa la foto con un destello, como un tubo fluorescente; el título sube palabra por palabra. **Salida:** al bajar, el contenido sube, se desvanece y se desenfoca, con parallax en la foto | Entrada en **CSS puro** (se ve aunque JavaScript aún no cargue); salida con Motion `useScroll` | `ui/PageHero.tsx` + `globals.css` |
| 11 | **Tarjetas de curso** | **Entrada:** la tarjeta sube y la foto se destapa de abajo hacia arriba con un zoom que se asienta; en cada fila entran en cascada de izquierda a derecha. **Salida:** se desvanecen al salir de la pantalla y vuelven a entrar al regresar | Motion (variantes, `clip-path`) | `courses/CourseCard.tsx` |
| 12 | Tarjetas: al pasar el mouse | Inclinación 3D que sigue al cursor, luz cian/amarilla que sigue al puntero, la tarjeta se eleva y la flecha gira. En celulares no hay inclinación | Motion (`useSpring`, `useMotionTemplate`) | `courses/CourseCard.tsx` |
| 13 | Filtros del catálogo | La pastilla amarilla se desliza a la categoría elegida; las tarjetas que salen se encogen y se desenfocan, y las que quedan se reacomodan con un resorte | Motion (`layout`, `AnimatePresence`) | `courses/CourseCatalog.tsx` |
| 14 | Temario (detalle) | Acordeón que se abre y cierra con animación de altura | Motion | `courses/CourseDetailParts.tsx` |
| 15 | Navegación entre páginas | Cortina amarilla que se retira al cambiar de página (no se muestra en la primera carga, para no retrasarla) | Motion | `app/template.tsx` |
| 16 | Modal de contacto | Entra desde abajo con resorte; el fondo se desenfoca | Motion | `layout/ContactModal.tsx` |
| 17 | Botones flotantes | Las redes entran en cascada; WhatsApp gira al aparecer y emite un pulso continuo | Motion + CSS | `layout/FloatingSocial.tsx` |
| 18 | Botones principales | Brillo que recorre el botón al pasar el mouse | CSS (`.shine`) | `globals.css` |

---

## 6. Rendimiento

- **HTML estático:** el servidor solo entrega archivos ya generados.
- **Imágenes:** `next/image` las convierte a AVIF/WebP y las redimensiona según el dispositivo. Por ejemplo, la foto del carrusel pasa de 361 KB a ~105 KB.
- **Caché:** las imágenes y los archivos JS/CSS tienen caché de 1 año, y Nginx además guarda en caché las páginas y las imágenes optimizadas.
- **Animaciones:** usan propiedades que procesa la tarjeta gráfica (transform, opacity, clip-path). Los efectos en bucle se pausan cuando no están en pantalla o la pestaña está oculta.
- **Fuentes:** se sirven desde el propio servidor, sin peticiones a Google en cada visita.
- **JavaScript inicial:** ~103 KB compartidos por todas las páginas.

---

## 7. SEO y accesibilidad

- **SEO:** metadatos y Open Graph por página, `sitemap.xml`, `robots.txt` y datos estructurados (`EducationalOrganization` y `Course`).
- **Títulos animados:** el texto completo siempre está disponible para Google y para lectores de pantalla.
- **Navegación por teclado:** enlace "Saltar al contenido", foco visible en amarillo y carrusel controlable con las flechas.
- **Movimiento:** se respeta `prefers-reduced-motion` en todos los efectos.
- **Etiquetas:** `aria-label` en los botones de íconos (redes, flechas, menú).

---

## 8. Mantenimiento: qué editar

| Necesidad | Archivo |
|---|---|
| Número de WhatsApp, correo, teléfono, dirección | `src/config/site.ts` |
| Enlaces de redes sociales | `src/config/site.ts` → `socialLinks` |
| Opciones del menú | `src/config/site.ts` → `mainNav` |
| Agregar o editar un curso | `src/data/courses.ts` (`featured: true` lo muestra en la portada) |
| Diapositivas del carrusel (imagen o video) | `src/data/slides.ts` |
| Foto de fondo del bloque Cursos + Nosotros | `public/images/fondos/cableado-industrial.jpg` |
| Colores | `src/app/globals.css` → `@theme` |
| Testimonios | `src/components/home/Testimonials.tsx` |

---

## 9. Despliegue en VPS

1. Instalar Node.js 22 LTS, Nginx, PM2 y Certbot.
2. Subir el proyecto a `/var/www/electrind` y crear `.env.production` con `NEXT_PUBLIC_SITE_URL=https://dominio`.
3. Ejecutar `bash deploy/deploy.sh`. Compila y levanta la app con PM2 en modo cluster: un proceso por núcleo de CPU, con reinicio automático si alguno falla.
4. Copiar `deploy/nginx.conf` a Nginx, ajustar el dominio y ejecutar `certbot --nginx` para el HTTPS.
5. Ejecutar `pm2 startup` para que la app arranque sola al reiniciar el VPS.

Servidor recomendado: 2 vCPU y 2–4 GB de RAM.

> `NEXT_DIST_DIR` es una variable opcional que cambia la carpeta de compilación. Sirve para compilar una copia de prueba sin interferir con un `npm run dev` en curso. En producción no se usa.

---

## 10. Recursos de terceros y licencias

- **Fotos provisionales:** provienen de **Wikimedia Commons**, con licencias libres (algunas CC BY-SA exigen atribución). **Se recomienda reemplazarlas por fotos propias del cliente antes del lanzamiento.**
- **Íconos de redes sociales:** trazados SVG de las marcas, usados solo para enlazar a cada red, conforme a sus guías de marca.
- **Fuentes:** Manrope y DM Sans, con licencia SIL Open Font License.

---

## 11. Herramientas usadas durante el desarrollo

| Herramienta | Uso |
|---|---|
| Claude Code (asistente de IA) | Desarrollo del código, diseño y verificación |
| Skill **Impeccable** (diseño frontend) | Guías "overdrive" (efectos ambiciosos) y "animate" (motion con propósito), el piso de calidad visual (contraste, jerarquía, movimiento) y el detector automático de problemas de diseño. Por ejemplo, detectó y se corrigió un texto con degradado decorativo |
| Chrome sin interfaz + Puppeteer | Capturas automáticas en escritorio (1440 px) y móvil (390 px), fotograma a fotograma de las animaciones, para verificar los efectos y que no haya desbordes horizontales ni errores en consola |
| API de Wikimedia Commons | Búsqueda de fotos de temática eléctrica con licencia libre |

---

## 12. Pendientes del cliente

- [ ] Número real de WhatsApp, correo y teléfono (`src/config/site.ts`)
- [ ] URLs reales de LinkedIn, Facebook, TikTok, Instagram y YouTube
- [ ] Logo original (idealmente en vector: SVG, AI o PDF)
- [ ] Fotos reales del taller, laboratorio y alumnos
- [ ] Testimonios reales (los actuales son de ejemplo)
- [ ] Cursos, precios, horarios y modalidades definitivos
- [ ] Dominio y VPS
