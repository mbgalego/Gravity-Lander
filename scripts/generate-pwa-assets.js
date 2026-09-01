import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

// Helper to set pixel with alpha blending
function setPixel(png, x, y, r, g, b, a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || x >= png.width || y < 0 || y >= png.height) return;
  const idx = (png.width * y + x) << 2;
  if (a === 255) {
    png.data[idx] = r;
    png.data[idx + 1] = g;
    png.data[idx + 2] = b;
    png.data[idx + 3] = 255;
  } else {
    const srcA = a / 255;
    const dstA = png.data[idx + 3] / 255;
    const outA = srcA + dstA * (1 - srcA);
    if (outA > 0) {
      png.data[idx] = Math.round((r * srcA + png.data[idx] * dstA * (1 - srcA)) / outA);
      png.data[idx + 1] = Math.round((g * srcA + png.data[idx + 1] * dstA * (1 - srcA)) / outA);
      png.data[idx + 2] = Math.round((b * srcA + png.data[idx + 2] * dstA * (1 - srcA)) / outA);
      png.data[idx + 3] = Math.round(outA * 255);
    }
  }
}

function drawLine(png, x0, y0, x1, y1, r, g, b, a = 255, thickness = 1) {
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  let currX = x0;
  let currY = y0;

  while (true) {
    for (let tx = -Math.floor(thickness / 2); tx <= Math.floor(thickness / 2); tx++) {
      for (let ty = -Math.floor(thickness / 2); ty <= Math.floor(thickness / 2); ty++) {
        setPixel(png, currX + tx, currY + ty, r, g, b, a);
      }
    }
    if (Math.abs(currX - x1) < 1 && Math.abs(currY - y1) < 1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      currX += sx;
    }
    if (e2 < dx) {
      err += dx;
      currY += sy;
    }
  }
}

function fillCircle(png, cx, cy, radius, r, g, b, a = 255) {
  const r2 = radius * radius;
  for (let y = Math.floor(cy - radius); y <= Math.ceil(cy + radius); y++) {
    for (let x = Math.floor(cx - radius); x <= Math.ceil(cx + radius); x++) {
      const d2 = (x - cx) * (x - cx) + (y - cy) * (y - cy);
      if (d2 <= r2) {
        const edge = radius - Math.sqrt(d2);
        const alpha = edge < 1 ? Math.round(a * Math.max(0, Math.min(1, edge))) : a;
        setPixel(png, x, y, r, g, b, alpha);
      }
    }
  }
}

function drawFilledPolygon(png, vertices, r, g, b, a = 255) {
  let minY = png.height, maxY = 0;
  for (const v of vertices) {
    if (v.y < minY) minY = Math.floor(v.y);
    if (v.y > maxY) maxY = Math.ceil(v.y);
  }
  minY = Math.max(0, minY);
  maxY = Math.min(png.height - 1, maxY);

  for (let y = minY; y <= maxY; y++) {
    const intersections = [];
    for (let i = 0; i < vertices.length; i++) {
      const v1 = vertices[i];
      const v2 = vertices[(i + 1) % vertices.length];
      if ((v1.y <= y && v2.y > y) || (v2.y <= y && v1.y > y)) {
        const x = v1.x + ((y - v1.y) / (v2.y - v1.y)) * (v2.x - v1.x);
        intersections.push(x);
      }
    }
    intersections.sort((n1, n2) => n1 - n2);
    for (let i = 0; i < intersections.length; i += 2) {
      if (i + 1 < intersections.length) {
        const startX = Math.max(0, Math.floor(intersections[i]));
        const endX = Math.min(png.width - 1, Math.ceil(intersections[i + 1]));
        for (let x = startX; x <= endX; x++) {
          setPixel(png, x, y, r, g, b, a);
        }
      }
    }
  }
}

// Generate the Gravity Lander Icon
function generateIcon(size, isMaskable = false) {
  const png = new PNG({ width: size, height: size });
  
  // Fill dark cosmic background
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grad = y / size;
      const bgR = Math.round(2 + grad * 8);
      const bgG = Math.round(6 + grad * 12);
      const bgB = Math.round(23 + grad * 20);
      setPixel(png, x, y, bgR, bgG, bgB, 255);
    }
  }

  // Draw subtle circular glow / planet horizon in background
  const cx = size / 2;
  const cy = size / 2;
  const scale = isMaskable ? 0.65 : 0.85;

  // Background stars
  const starSeeds = [
    [0.15, 0.18, 0.9], [0.82, 0.14, 0.8], [0.25, 0.75, 0.7], [0.88, 0.72, 0.85],
    [0.12, 0.45, 0.6], [0.85, 0.42, 0.9], [0.5, 0.12, 0.7], [0.68, 0.88, 0.6],
    [0.35, 0.22, 0.8], [0.72, 0.28, 0.75], [0.18, 0.85, 0.65]
  ];
  for (const [sx, sy, b] of starSeeds) {
    fillCircle(png, sx * size, sy * size, Math.max(1, size * 0.008), 224, 242, 254, Math.round(b * 220));
  }

  // Background lunar terrain / landing base
  const groundY = cy + size * scale * 0.42;
  const padW = size * scale * 0.6;
  const padX1 = cx - padW / 2;
  const padX2 = cx + padW / 2;

  // Terrain line
  drawLine(png, 0, groundY + size * 0.05, padX1, groundY, 71, 85, 105, 255, Math.max(1, size * 0.015));
  drawLine(png, padX2, groundY, size, groundY + size * 0.05, 71, 85, 105, 255, Math.max(1, size * 0.015));
  
  // Landing Pad (Emerald glow)
  drawLine(png, padX1, groundY, padX2, groundY, 52, 211, 153, 255, Math.max(2, size * 0.025));
  fillCircle(png, padX1, groundY, Math.max(2, size * 0.02), 16, 185, 129, 255);
  fillCircle(png, padX2, groundY, Math.max(2, size * 0.02), 16, 185, 129, 255);
  fillCircle(png, cx, groundY, Math.max(2, size * 0.018), 52, 211, 153, 255);

  // Ship center position
  const shipY = cy - size * scale * 0.06;
  const shipW = size * scale * 0.5;
  const shipH = size * scale * 0.42;

  // Thruster Flames (Underneath Lander)
  const flameLength = shipH * 0.85;
  const flameL = [
    { x: cx - shipW * 0.28, y: shipY + shipH * 0.45 },
    { x: cx - shipW * 0.12, y: shipY + shipH * 0.45 },
    { x: cx - shipW * 0.20, y: shipY + shipH * 0.45 + flameLength }
  ];
  const flameR = [
    { x: cx + shipW * 0.12, y: shipY + shipH * 0.45 },
    { x: cx + shipW * 0.28, y: shipY + shipH * 0.45 },
    { x: cx + shipW * 0.20, y: shipY + shipH * 0.45 + flameLength }
  ];

  // Outer blue fire
  drawFilledPolygon(png, flameL, 56, 189, 248, 230);
  drawFilledPolygon(png, flameR, 56, 189, 248, 230);

  // Inner white/cyan core flame
  const innerFlameL = [
    { x: cx - shipW * 0.24, y: shipY + shipH * 0.45 },
    { x: cx - shipW * 0.16, y: shipY + shipH * 0.45 },
    { x: cx - shipW * 0.20, y: shipY + shipH * 0.45 + flameLength * 0.7 }
  ];
  const innerFlameR = [
    { x: cx + shipW * 0.16, y: shipY + shipH * 0.45 },
    { x: cx + shipW * 0.24, y: shipY + shipH * 0.45 },
    { x: cx + shipW * 0.20, y: shipY + shipH * 0.45 + flameLength * 0.7 }
  ];
  drawFilledPolygon(png, innerFlameL, 255, 255, 255, 255);
  drawFilledPolygon(png, innerFlameR, 255, 255, 255, 255);

  // Landing Legs
  const legThick = Math.max(1.5, size * 0.016);
  // Left leg strut
  drawLine(png, cx - shipW * 0.35, shipY + shipH * 0.1, cx - shipW * 0.48, shipY + shipH * 0.6, 148, 163, 184, 255, legThick);
  drawLine(png, cx - shipW * 0.48, shipY + shipH * 0.6, cx - shipW * 0.52, shipY + shipH * 0.6, 56, 189, 248, 255, legThick * 1.5);
  // Right leg strut
  drawLine(png, cx + shipW * 0.35, shipY + shipH * 0.1, cx + shipW * 0.48, shipY + shipH * 0.6, 148, 163, 184, 255, legThick);
  drawLine(png, cx + shipW * 0.48, shipY + shipH * 0.6, cx + shipW * 0.52, shipY + shipH * 0.6, 56, 189, 248, 255, legThick * 1.5);

  // Lander Fuselage Body (Hexagonal / Angled spacecraft hull)
  const hullPoly = [
    { x: cx, y: shipY - shipH * 0.55 },
    { x: cx + shipW * 0.35, y: shipY - shipH * 0.15 },
    { x: cx + shipW * 0.38, y: shipY + shipH * 0.4 },
    { x: cx - shipW * 0.38, y: shipY + shipH * 0.4 },
    { x: cx - shipW * 0.35, y: shipY - shipH * 0.15 }
  ];
  drawFilledPolygon(png, hullPoly, 15, 23, 42, 255); // dark slate

  // Outer Hull cyan/teal highlight trim
  const trimPoly = [
    { x: cx, y: shipY - shipH * 0.52 },
    { x: cx + shipW * 0.32, y: shipY - shipH * 0.15 },
    { x: cx + shipW * 0.35, y: shipY + shipH * 0.37 },
    { x: cx - shipW * 0.35, y: shipY + shipH * 0.37 },
    { x: cx - shipW * 0.32, y: shipY - shipH * 0.15 }
  ];
  drawFilledPolygon(png, trimPoly, 30, 41, 59, 255);

  // Command Cockpit Canopy (Bright cyan reflective glass)
  const cockpitPoly = [
    { x: cx, y: shipY - shipH * 0.45 },
    { x: cx + shipW * 0.22, y: shipY - shipH * 0.15 },
    { x: cx + shipW * 0.18, y: shipY + shipH * 0.05 },
    { x: cx - shipW * 0.18, y: shipY + shipH * 0.05 },
    { x: cx - shipW * 0.22, y: shipY - shipH * 0.15 }
  ];
  drawFilledPolygon(png, cockpitPoly, 14, 165, 233, 255); // Sky cyan

  // Cockpit Inner Glow / Glare
  const cockpitGlare = [
    { x: cx, y: shipY - shipH * 0.40 },
    { x: cx + shipW * 0.14, y: shipY - shipH * 0.15 },
    { x: cx + shipW * 0.10, y: shipY - shipH * 0.02 },
    { x: cx - shipW * 0.10, y: shipY - shipH * 0.02 },
    { x: cx - shipW * 0.14, y: shipY - shipH * 0.15 }
  ];
  drawFilledPolygon(png, cockpitGlare, 224, 242, 254, 240); // White glare

  // Thruster Bell Nozzles
  fillCircle(png, cx - shipW * 0.20, shipY + shipH * 0.42, Math.max(1.5, size * 0.02), 148, 163, 184, 255);
  fillCircle(png, cx + shipW * 0.20, shipY + shipH * 0.42, Math.max(1.5, size * 0.02), 148, 163, 184, 255);

  return png;
}

// Generate Screenshot for Desktop (1280x720)
function generateScreenshot(width, height) {
  const png = new PNG({ width, height });

  // Deep space gradient
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const grad = y / height;
      const r = Math.round(2 + grad * 12);
      const g = Math.round(6 + grad * 16);
      const b = Math.round(23 + grad * 32);
      setPixel(png, x, y, r, g, b, 255);
    }
  }

  // Starfield
  for (let i = 0; i < 150; i++) {
    const sx = Math.sin(i * 997) * 0.5 + 0.5;
    const sy = Math.cos(i * 733) * 0.5 + 0.5;
    fillCircle(png, sx * width, sy * height, 1.2, 224, 242, 254, Math.round(150 + Math.sin(i) * 90));
  }

  // Cavern / Terrain Landscape
  const terrainPoints = [];
  const segments = 24;
  for (let i = 0; i <= segments; i++) {
    const tx = (i / segments) * width;
    let ty = height * 0.72 + Math.sin(i * 0.8) * height * 0.08 + Math.cos(i * 1.5) * height * 0.04;
    // Landing pad flat zones
    if (i >= 8 && i <= 12) ty = height * 0.78; // Pad 1
    if (i >= 18 && i <= 21) ty = height * 0.65; // Pad 2
    terrainPoints.push({ x: tx, y: ty });
  }

  // Draw solid terrain polygon
  const terrainPoly = [
    ...terrainPoints,
    { x: width, y: height },
    { x: 0, y: height }
  ];
  drawFilledPolygon(png, terrainPoly, 15, 23, 42, 255);

  // Terrain glowing outline
  for (let i = 0; i < terrainPoints.length - 1; i++) {
    const isPad = (i >= 8 && i <= 11) || (i >= 18 && i <= 20);
    const r = isPad ? 52 : 71;
    const g = isPad ? 211 : 85;
    const b = isPad ? 153 : 105;
    drawLine(png, terrainPoints[i].x, terrainPoints[i].y, terrainPoints[i+1].x, terrainPoints[i+1].y, r, g, b, 255, isPad ? 4 : 2);
  }

  // Landing Pad Beacons
  const pad1X = (10 / segments) * width;
  const pad1Y = height * 0.78;
  fillCircle(png, pad1X - width * 0.06, pad1Y, 6, 16, 185, 129, 255);
  fillCircle(png, pad1X + width * 0.06, pad1Y, 6, 16, 185, 129, 255);

  // Spacecraft descending toward Pad 1
  const shipX = width * 0.45;
  const shipY = height * 0.42;
  const sW = width * 0.06;
  const sH = height * 0.08;

  // Thruster jet flame
  const flamePoly = [
    { x: shipX - sW * 0.3, y: shipY + sH * 0.4 },
    { x: shipX + sW * 0.3, y: shipY + sH * 0.4 },
    { x: shipX, y: shipY + sH * 1.3 }
  ];
  drawFilledPolygon(png, flamePoly, 56, 189, 248, 240);
  const innerFlame = [
    { x: shipX - sW * 0.15, y: shipY + sH * 0.4 },
    { x: shipX + sW * 0.15, y: shipY + sH * 0.4 },
    { x: shipX, y: shipY + sH * 0.9 }
  ];
  drawFilledPolygon(png, innerFlame, 255, 255, 255, 255);

  // Lander body
  const shipPoly = [
    { x: shipX, y: shipY - sH * 0.5 },
    { x: shipX + sW * 0.4, y: shipY - sH * 0.1 },
    { x: shipX + sW * 0.35, y: shipY + sH * 0.4 },
    { x: shipX - sW * 0.35, y: shipY + sH * 0.4 },
    { x: shipX - sW * 0.4, y: shipY - sH * 0.1 }
  ];
  drawFilledPolygon(png, shipPoly, 30, 41, 59, 255);

  // Cockpit
  const cockPoly = [
    { x: shipX, y: shipY - sH * 0.4 },
    { x: shipX + sW * 0.2, y: shipY - sH * 0.1 },
    { x: shipX - sW * 0.2, y: shipY - sH * 0.1 }
  ];
  drawFilledPolygon(png, cockPoly, 56, 189, 248, 255);

  // Top Flight HUD Bar (Simulation indicators)
  const hudY = height * 0.06;
  drawLine(png, width * 0.05, hudY, width * 0.95, hudY, 56, 189, 248, 120, 1.5);
  // Fuel Gauge bar
  drawLine(png, width * 0.08, hudY + 16, width * 0.28, hudY + 16, 16, 185, 129, 255, 6);
  // Velocity indicator
  drawLine(png, width * 0.72, hudY + 16, width * 0.92, hudY + 16, 56, 189, 248, 255, 6);

  return png;
}

// Write PNG buffer helper (Pure binary stream via PNG.sync.write)
function writePngFile(filePath, png) {
  const buffer = PNG.sync.write(png);
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Wrote valid binary PNG: ${filePath} (${buffer.length} bytes, header: ${buffer.slice(0, 8).toString('hex')})`);
}

// Generate minimal valid ICO file with standard PNG payload
function generateIcoFile(icoPath, png32Buffer) {
  // ICO Header: 6 bytes
  // ICONDIRENTRY: 16 bytes
  // Image data: png32Buffer
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 Image

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0); // Width 32
  entry.writeUInt8(32, 1); // Height 32
  entry.writeUInt8(0, 2);  // Palette count
  entry.writeUInt8(0, 3);  // Reserved
  entry.writeUInt16LE(1, 4); // Color planes
  entry.writeUInt16LE(32, 6); // Bits per pixel
  entry.writeUInt32LE(png32Buffer.length, 8); // Size of image data
  entry.writeUInt32LE(6 + 16, 12); // Offset to image data

  const icoBuf = Buffer.concat([header, entry, png32Buffer]);
  fs.writeFileSync(icoPath, icoBuf);
  console.log(`✓ Wrote valid ICO file: ${icoPath} (${icoBuf.length} bytes)`);
}

async function main() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const iconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 180, 192, 384, 512];
  let png32Buf = null;

  for (const size of iconSizes) {
    const png = generateIcon(size, false);
    if (size === 16) {
      writePngFile(path.join(publicDir, 'favicon-16x16.png'), png);
    } else if (size === 32) {
      const p = path.join(publicDir, 'favicon-32x32.png');
      writePngFile(p, png);
      png32Buf = PNG.sync.write(png);
    } else if (size === 180) {
      writePngFile(path.join(publicDir, 'apple-touch-icon.png'), png);
    } else {
      writePngFile(path.join(publicDir, `icon-${size}.png`), png);
    }
  }

  // Maskable 512x512
  const maskablePng = generateIcon(512, true);
  writePngFile(path.join(publicDir, 'icon-maskable-512.png'), maskablePng);

  // Favicon.ico
  if (png32Buf) {
    generateIcoFile(path.join(publicDir, 'favicon.ico'), png32Buf);
  }

  // Screenshots
  const desktopShot = generateScreenshot(1280, 720);
  writePngFile(path.join(publicDir, 'screenshot-desktop.png'), desktopShot);

  const mobileShot = generateScreenshot(720, 1280);
  writePngFile(path.join(publicDir, 'screenshot-mobile.png'), mobileShot);

  // Also write 512x512 as icon.jpg (using valid JPEG or PNG fallback)
  // For open graph og:image, we can write a valid 512x512 PNG as icon.png or use PNG buffer
  const ogPng = generateIcon(512, false);
  const ogBuf = PNG.sync.write(ogPng);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), ogBuf);
  // Also create icon.svg
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="transparent"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bg)"/>
  <!-- Stars -->
  <circle cx="90" cy="110" r="3" fill="#e0f2fe" opacity="0.8"/>
  <circle cx="420" cy="90" r="2.5" fill="#e0f2fe" opacity="0.7"/>
  <circle cx="400" cy="380" r="3" fill="#e0f2fe" opacity="0.85"/>
  <circle cx="110" cy="400" r="2" fill="#e0f2fe" opacity="0.6"/>
  <!-- Terrain & Landing Pad -->
  <path d="M 40 420 L 160 390 L 352 390 L 472 420" stroke="#334155" stroke-width="6" fill="none" stroke-linecap="round"/>
  <line x1="170" y1="390" x2="342" y2="390" stroke="#34d399" stroke-width="8" stroke-linecap="round"/>
  <circle cx="170" cy="390" r="8" fill="#10b981"/>
  <circle cx="342" cy="390" r="8" fill="#10b981"/>
  <!-- Thruster Fire -->
  <polygon points="205,295 240,295 222,380" fill="url(#flame)"/>
  <polygon points="272,295 307,295 290,380" fill="url(#flame)"/>
  <!-- Lander Legs -->
  <line x1="180" y1="230" x2="140" y2="320" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <line x1="130" y1="320" x2="150" y2="320" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
  <line x1="332" y1="230" x2="372" y2="320" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <line x1="362" y1="320" x2="382" y2="320" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
  <!-- Hull Body -->
  <polygon points="256,120 340,195 330,295 182,295 172,195" fill="#0f172a" stroke="#38bdf8" stroke-width="6" stroke-linejoin="round"/>
  <!-- Cockpit Canopy -->
  <polygon points="256,145 300,195 285,230 227,230 212,195" fill="#0284c7" stroke="#e0f2fe" stroke-width="3" stroke-linejoin="round"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');
  console.log(`✓ Wrote icon.svg`);

  console.log('All PWA assets successfully generated!');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
