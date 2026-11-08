# Electrind: sitio web

Sitio de cursos de electricidad, tableros, PLC y automatización.
Construido con **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 + Motion**.

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm run start    # servir la compilación
```

## Qué editar (sin tocar componentes)

| Qué cambiar | Archivo |
|---|---|
| Número de WhatsApp, correo, teléfono, redes sociales, menú | `src/config/site.ts` |
| Cursos (agregar, quitar, marcar como destacados en la portada) | `src/data/courses.ts` |
| Diapositivas del carrusel (imágenes **o videos**) | `src/data/slides.ts` |
| Imágenes | `public/images/` |
| Colores y tipografía | `src/app/globals.css` (bloque `@theme`) |

- La portada muestra los 4 primeros cursos con `featured: true`.
- Para un video en el carrusel: copia el `.mp4` a `public/videos/` y usa `type: "video"` con un `poster`.

## Estructura

```
src/
  app/                 Rutas (páginas)
    page.tsx           Portada
    cursos/page.tsx    Catálogo con filtros y buscador
    cursos/[slug]/     Detalle de cada curso (HTML estático por curso)
    sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/            Header, Footer, botones flotantes, modal de contacto
    home/              Secciones de la portada
    courses/           Tarjeta, catálogo y detalle de curso
    ui/                Iconos, animaciones (Reveal), logo
  config/site.ts       Datos de la empresa
  data/                Cursos y diapositivas
  lib/whatsapp.ts      Generador de enlaces wa.me
```

## Rendimiento

- Todas las páginas se **pre-generan como HTML estático** en el build: el servidor no consulta nada por cada visita.
- Imágenes optimizadas automáticamente a AVIF/WebP y redimensionadas según el dispositivo.
- Fuentes autoalojadas (`next/font`), sin peticiones a Google en tiempo real.
- Animaciones que respetan "reducir movimiento" del sistema.

## Despliegue en VPS (Ubuntu)

1. Instalar Node.js 20+ (recomendado 22 LTS), Nginx, PM2 (`npm i -g pm2`) y Certbot.
2. Subir el proyecto a `/var/www/electrind` y crear `.env.production` con `NEXT_PUBLIC_SITE_URL=https://tudominio.com`.
3. Ejecutar `bash deploy/deploy.sh`: compila y levanta la app en **modo cluster** (un proceso por núcleo de CPU, con reinicio automático si se cae).
4. Copiar `deploy/nginx.conf` a `/etc/nginx/sites-available/`, ajustar el dominio, activar el sitio y ejecutar `certbot --nginx`.
5. `pm2 startup` para que arranque solo al reiniciar el VPS.

Nginx sirve directamente los archivos estáticos con caché de 1 año y guarda en caché las páginas e imágenes, así que soporta mucho tráfico con un VPS modesto (2 vCPU / 2–4 GB RAM).

## Imágenes de ejemplo

Las fotos actuales son provisionales y vienen de Wikimedia Commons (licencias libres, algunas exigen atribución). Reemplázalas por fotos propias del cliente antes de publicar el sitio.

## Logo

- El logo está redibujado en vector: `src/components/ui/LogoMark.tsx` y `public/brand/electrind-mark.svg`.
- PNG transparentes listos para usar (redes, documentos, impresión digital): `public/brand/electrind-icon.png`, `electrind-logo-horizontal.png`, `electrind-logo-vertical.png`.
- Si el cliente entrega el logo original en imagen, `npm run logo ruta/al/logo.jpg` le quita el fondo blanco y genera los PNG recortados.
