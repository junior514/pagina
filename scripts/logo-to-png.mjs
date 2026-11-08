// Convierte el logo (fondo blanco) en PNG transparentes recortados:
//   public/brand/electrind-logo.png      → logo completo
//   public/brand/electrind-mark.png      → solo el ícono (rayo + anillo)
//   public/brand/electrind-wordmark.png  → solo el texto "ELECTRIND"
//   src/app/icon.png / apple-icon.png    → favicons
// Uso: node scripts/logo-to-png.mjs ruta/al/logo.jpg
// Requiere Chrome instalado y puppeteer-core (npm i -D puppeteer-core).
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const input = process.argv[2];
if (!input || !fs.existsSync(input)) {
  console.error("Indica la ruta del logo: node scripts/logo-to-png.mjs logo.jpg");
  process.exit(1);
}
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "..");
const ext = path.extname(input).slice(1).toLowerCase().replace("jpg", "jpeg");
const dataUrl = `data:image/${ext};base64,${fs.readFileSync(input).toString("base64")}`;

const chrome =
  process.env.CHROME_PATH ??
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) =>
    fs.existsSync(p),
  );

const browser = await puppeteer.launch({ executablePath: chrome, headless: "new" });
const page = await browser.newPage();
const out = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  const c = Object.assign(document.createElement("canvas"), { width: W, height: H });
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, W, H);
  const px = d.data;

  // Quitar el blanco conservando bordes suaves (des-mezcla sobre fondo blanco)
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i], g = px[i + 1], b = px[i + 2];
    let a = Math.max(255 - r, 255 - g, 255 - b) / 255;
    a = a < 0.08 ? 0 : Math.min(1, (a - 0.08) / 0.92); // limpia ruido JPEG
    if (a > 0) {
      px[i] = Math.max(0, Math.min(255, (r - 255 * (1 - a)) / a));
      px[i + 1] = Math.max(0, Math.min(255, (g - 255 * (1 - a)) / a));
      px[i + 2] = Math.max(0, Math.min(255, (b - 255 * (1 - a)) / a));
    }
    px[i + 3] = Math.round(a * 255);
  }
  ctx.putImageData(d, 0, 0);

  // Filas con contenido → grupos separados por filas vacías
  const rowHas = (y) => {
    for (let x = 0; x < W; x++) if (px[(y * W + x) * 4 + 3] > 40) return true;
    return false;
  };
  const groups = [];
  let start = -1;
  for (let y = 0; y < H; y++) {
    const has = rowHas(y);
    if (has && start < 0) start = y;
    if (!has && start >= 0) {
      if (y - start > 4) groups.push([start, y - 1]);
      start = -1;
    }
  }
  if (start >= 0) groups.push([start, H - 1]);

  const crop = (y0, y1, pad = 8) => {
    let x0 = W, x1 = 0;
    for (let y = y0; y <= y1; y++)
      for (let x = 0; x < W; x++)
        if (px[(y * W + x) * 4 + 3] > 40) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
        }
    x0 = Math.max(0, x0 - pad); x1 = Math.min(W - 1, x1 + pad);
    y0 = Math.max(0, y0 - pad); y1 = Math.min(H - 1, y1 + pad);
    const o = Object.assign(document.createElement("canvas"), { width: x1 - x0 + 1, height: y1 - y0 + 1 });
    o.getContext("2d").drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height);
    return o;
  };
  const square = (canvas, size, bg) => {
    const s = Object.assign(document.createElement("canvas"), { width: size, height: size });
    const sctx = s.getContext("2d");
    if (bg) { sctx.fillStyle = bg; sctx.fillRect(0, 0, size, size); }
    const k = (size * 0.86) / Math.max(canvas.width, canvas.height);
    const w = canvas.width * k, h = canvas.height * k;
    sctx.imageSmoothingQuality = "high";
    sctx.drawImage(canvas, (size - w) / 2, (size - h) / 2, w, h);
    return s.toDataURL("image/png");
  };

  const full = crop(groups[0][0], groups[groups.length - 1][1]);
  const mark = crop(groups[0][0], groups[0][1]);
  const word = groups.length > 1 ? crop(groups[groups.length - 1][0], groups[groups.length - 1][1], 4) : null;
  return {
    groups,
    full: full.toDataURL("image/png"),
    mark: mark.toDataURL("image/png"),
    word: word && word.toDataURL("image/png"),
    icon: square(mark, 512),
    apple: square(mark, 180, "#0b1218"),
  };
}, dataUrl);
await browser.close();

const save = (rel, url) => {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
  console.log("✓", rel);
};
console.log("Bloques detectados (filas):", JSON.stringify(out.groups));
save("public/brand/electrind-logo.png", out.full);
save("public/brand/electrind-mark.png", out.mark);
if (out.word) save("public/brand/electrind-wordmark.png", out.word);
save("src/app/icon.png", out.icon);
save("src/app/apple-icon.png", out.apple);
