/**
 * Generates public/og.png (1200×630) for Open Graph / social sharing.
 * Pure Node — no canvas, no fonts. Draws the MenuSnap mark on a cream card
 * using 2× supersampling for smooth edges.
 *
 * Run: node scripts/generate-og.mjs
 */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;
const SS = 2; // supersample factor
const w = W * SS;
const h = H * SS;

const rgba = Buffer.alloc(w * h * 4);

function fill(x0, y0, x1, y1, [r, g, b, a]) {
  const xa = Math.max(0, Math.round(x0));
  const ya = Math.max(0, Math.round(y0));
  const xb = Math.min(w - 1, Math.round(x1));
  const yb = Math.min(h - 1, Math.round(y1));
  for (let y = ya; y <= yb; y++) {
    for (let x = xa; x <= xb; x++) {
      const i = (y * w + x) * 4;
      rgba[i] = r;
      rgba[i + 1] = g;
      rgba[i + 2] = b;
      rgba[i + 3] = a;
    }
  }
}

function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  let t = len2 === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function stroke(x0, y0, x1, y1, thickness, [r, g, b, a]) {
  const rad = (thickness * SS) / 2;
  for (let y = Math.floor(Math.min(y0, y1) * SS - rad); y <= Math.ceil(Math.max(y0, y1) * SS + rad); y++) {
    if (y < 0 || y >= h) continue;
    for (let x = Math.floor(Math.min(x0, x1) * SS - rad); x <= Math.ceil(Math.max(x0, x1) * SS + rad); x++) {
      if (x < 0 || x >= w) continue;
      if (distToSegment(x + 0.5, y + 0.5, x0 * SS, y0 * SS, x1 * SS, y1 * SS) <= rad) {
        const i = (y * w + x) * 4;
        rgba[i] = r;
        rgba[i + 1] = g;
        rgba[i + 2] = b;
        rgba[i + 3] = a;
      }
    }
  }
}

// Rounded-rect coverage per pixel (supersampled box test).
function roundedRect(x0, y0, x1, y1, radius, color) {
  const r = radius * SS;
  for (let y = Math.floor(y0 * SS); y <= Math.ceil(y1 * SS); y++) {
    for (let x = Math.floor(x0 * SS); x <= Math.ceil(x1 * SS); x++) {
      if (y < 0 || y >= h || x < 0 || x >= w) continue;
      const cx = Math.max(x0 * SS + r, Math.min(x + 0.5, x1 * SS - r));
      const cy = Math.max(y0 * SS + r, Math.min(y + 0.5, y1 * SS - r));
      const inside = Math.hypot(x + 0.5 - cx, y + 0.5 - cy) <= r;
      if (inside) {
        const i = (y * w + x) * 4;
        rgba[i] = color[0];
        rgba[i + 1] = color[1];
        rgba[i + 2] = color[2];
        rgba[i + 3] = color[3];
      }
    }
  }
}

/* ---- palette ---- */
const CREAM = [250, 250, 248, 255];
const INK = [16, 16, 16, 255];
const WHITE = [255, 255, 255, 255];
const WHITE_85 = [255, 255, 255, 217];
const WHITE_70 = [255, 255, 255, 178];
const ACCENT = [255, 90, 54, 255];

/* ---- background ---- */
fill(0, 0, w, h, CREAM);
// soft accent glow top right + bottom left
fill(780, -300, 1500, 300, [255, 90, 54, 26]);
fill(-300, 380, 300, 950, [255, 90, 54, 18]);

/* ---- card ---- */
roundedRect(90, 110, 1110, 520, 56, INK);

/* ---- menu lines (white) ---- */
roundedRect(200, 210, 620, 252, 21, WHITE);
roundedRect(200, 295, 760, 337, 21, WHITE_85);
roundedRect(200, 380, 500, 422, 21, WHITE_70);

/* ---- accent circle + dark check ---- */
const ccx = 870;
const ccy = 322;
const cr = 130;
// filled circle via box test
for (let y = Math.floor((ccy - cr) * SS); y <= Math.ceil((ccy + cr) * SS); y++) {
  for (let x = Math.floor((ccx - cr) * SS); x <= Math.ceil((ccx + cr) * SS); x++) {
    if (y < 0 || y >= h || x < 0 || x >= w) continue;
    if (Math.hypot(x + 0.5 - ccx * SS, y + 0.5 - ccy * SS) <= cr * SS) {
      const i = (y * w + x) * 4;
      rgba[i] = ACCENT[0];
      rgba[i + 1] = ACCENT[1];
      rgba[i + 2] = ACCENT[2];
      rgba[i + 3] = ACCENT[3];
    }
  }
}
// check mark (thick dark strokes, accent gap looks built in)
stroke(ccx - 52, ccy - 2, ccx - 14, ccy + 42, 30, INK);
stroke(ccx - 14, ccy + 42, ccx + 56, ccy - 46, 30, INK);

/* ---- downscale 2× ---- */
const out = Buffer.alloc(W * H * 4);
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    let r = 0,
      g = 0,
      b = 0,
      a = 0;
    for (let dy = 0; dy < SS; dy++) {
      for (let dx = 0; dx < SS; dx++) {
        const i = ((y * SS + dy) * w + (x * SS + dx)) * 4;
        r += rgba[i];
        g += rgba[i + 1];
        b += rgba[i + 2];
        a += rgba[i + 3];
      }
    }
    const n = SS * SS;
    const o = (y * W + x) * 4;
    // alpha-over composite onto white for clean PNG
    const aa = a / n / 255;
    out[o] = Math.round((r / n) * aa + 255 * (1 - aa));
    out[o + 1] = Math.round((g / n) * aa + 255 * (1 - aa));
    out[o + 2] = Math.round((b / n) * aa + 255 * (1 - aa));
    out[o + 3] = 255;
  }
}

/* ---- PNG encode ---- */
const crcTable = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // color type RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const raw = Buffer.alloc(H * (1 + W * 4));
for (let y = 0; y < H; y++) {
  raw[y * (1 + W * 4)] = 0; // filter: none
  out.copy(raw, y * (1 + W * 4) + 1, y * W * 4, (y + 1) * W * 4);
}

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "og.png"), png);
console.log("public/og.png written:", png.length, "bytes");
