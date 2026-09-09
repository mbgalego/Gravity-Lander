import { ShipModelConfig, ShipState, ShipLocalPoints } from '../types';

// Helper: Gold Multi-Layer Insulation (MLI) Thermal Foil Gradient
export function createGoldFoil(ctx: CanvasRenderingContext2D, y1: number, y2: number) {
  const g = ctx.createLinearGradient(0, y1, 0, y2);
  g.addColorStop(0, '#fef08a');
  g.addColorStop(0.25, '#eab308');
  g.addColorStop(0.65, '#ca8a04');
  g.addColorStop(1, '#713f12');
  return g;
}

// Helper: Spherical Fuel Tank Gradient (Amber/Gold)
export function createFuelTank(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const g = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.4, 1, cx, cy, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.25, '#f59e0b');
  g.addColorStop(0.7, '#b45309');
  g.addColorStop(1, '#451a03');
  return g;
}

// Helper: Xenon Blue Propellant Gradient
export function createXenonTank(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const g = ctx.createRadialGradient(cx - r * 0.4, cy - r * 0.4, 1, cx, cy, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.3, '#38bdf8');
  g.addColorStop(0.75, '#0284c7');
  g.addColorStop(1, '#082f49');
  return g;
}

// Helper: Titanium Plate Linear Gradient
export function createTitaniumPlate(ctx: CanvasRenderingContext2D, y1: number, y2: number) {
  const g = ctx.createLinearGradient(0, y1, 0, y2);
  g.addColorStop(0, '#64748b');
  g.addColorStop(0.5, '#334155');
  g.addColorStop(1, '#0f172a');
  return g;
}

// Helper: Visor / Canopy Radial Gradient
export function createVisorGrad(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  accent: string,
  visor: string
) {
  const g = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, 1, cx, cy, r);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.4, accent);
  g.addColorStop(1, visor);
  return g;
}

// Helper: Hull Linear Gradient
export function createHullGrad(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  primaryColor: string
) {
  const g = ctx.createLinearGradient(x1, y1, x2, y2);
  g.addColorStop(0, '#ffffff');
  g.addColorStop(0.55, primaryColor);
  g.addColorStop(1, '#090d16');
  return g;
}

// Helper: Safe rounded rect drawing (uses moveTo + arcTo so it never connects to previous subpaths with lines)
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(Math.max(0, r), Math.abs(w) / 2, Math.abs(h) / 2);
  if (radius <= 0) {
    ctx.rect(x, y, w, h);
    return;
  }
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

// =====================================================================
// 1. APOLLO RECON (LM-Scout Mk IV)
// =====================================================================
export function drawApollo(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 30 + gearSpringOffset;

  // 1. Landing Gear Assembly: Struts, Hydraulic Pistons, Cross-Braces
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-15, 12);
  ctx.lineTo(-28, footPadY);
  ctx.moveTo(15, 12);
  ctx.lineTo(28, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-11, 18);
  ctx.lineTo(-28, footPadY);
  ctx.moveTo(11, 18);
  ctx.lineTo(28, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-6, 20);
  ctx.lineTo(-22, footPadY - 2);
  ctx.moveTo(6, 20);
  ctx.lineTo(22, footPadY - 2);
  ctx.stroke();

  // Shock-Absorbing Footpads
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(-28, footPadY - 2.2, 6.5, 2.2, 0, 0, Math.PI * 2);
  ctx.moveTo(28 + 6.5, footPadY - 2.2);
  ctx.ellipse(28, footPadY - 2.2, 6.5, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-33, footPadY);
  ctx.lineTo(-23, footPadY);
  ctx.moveTo(23, footPadY);
  ctx.lineTo(33, footPadY);
  ctx.stroke();

  // 2. Descent Stage (Gold Multi-Layer Insulation Octagon)
  ctx.fillStyle = createGoldFoil(ctx, 2, 22);
  ctx.beginPath();
  ctx.moveTo(-19, 6);
  ctx.lineTo(-19, 22);
  ctx.lineTo(19, 22);
  ctx.lineTo(19, 6);
  ctx.lineTo(14, 2);
  ctx.lineTo(-14, 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Gold Thermal Seam Quilting
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 1.1;
  ctx.setLineDash([2, 2]);
  ctx.beginPath();
  ctx.moveTo(-15, 10);
  ctx.lineTo(15, 10);
  ctx.moveTo(-17, 16);
  ctx.lineTo(17, 16);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.lineTo(0, 22);
  ctx.stroke();

  // 3. Spherical High-Pressure Fuel & Oxidizer Tanks
  ctx.fillStyle = createFuelTank(ctx, -10, 14, 5);
  ctx.beginPath();
  ctx.arc(-10, 14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  ctx.fillStyle = createXenonTank(ctx, 10, 14, 5);
  ctx.beginPath();
  ctx.arc(10, 14, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Braided Fuel Feed Lines
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-10, 19);
  ctx.lineTo(-14, 24);
  ctx.moveTo(10, 19);
  ctx.lineTo(14, 24);
  ctx.stroke();

  // 4. Ascent Stage (White Faceted Command Cabin)
  ctx.fillStyle = createHullGrad(ctx, 0, -27, 0, 4, config.primaryColor);
  ctx.beginPath();
  ctx.moveTo(0, -27);
  ctx.lineTo(18, -11);
  ctx.lineTo(18, 4);
  ctx.lineTo(-18, 4);
  ctx.lineTo(-18, -11);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Crew Ingress Hatch Outline
  ctx.fillStyle = '#f1f5f9';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, -6, -8, 12, 11, 1.5);
  ctx.fill();
  ctx.stroke();

  // 5. Azure Cockpit Viewport with Specular Shine
  ctx.fillStyle = createVisorGrad(ctx, 0, -14, 7.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -14, 7.5, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.ellipse(-2, -16, 3.2, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. High-Gain Parabolic Communications Dish
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(12, -11);
  ctx.lineTo(16, -20);
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(12, -23);
  ctx.quadraticCurveTo(16, -19, 20, -23);
  ctx.stroke();

  // 7. RCS Attitude Control Quads
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -21, -8, 3.5, 5.5, 1);
  roundRect(ctx, 17.5, -8, 3.5, 5.5, 1);
  ctx.fill();
  ctx.stroke();

  // 8. Thruster Rocket Nozzle Bells
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-16, 22);
  ctx.lineTo(-11, 22);
  ctx.lineTo(-9, 27);
  ctx.lineTo(-18, 27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(11, 22);
  ctx.lineTo(16, 22);
  ctx.lineTo(18, 27);
  ctx.lineTo(9, 27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 2. TITAN BEHEMOTH (Heavy Armored Industrial Hauler)
// =====================================================================
export function drawTitan(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 28 + gearSpringOffset;

  // 1. Heavy Industrial Shock Struts & Cast Footpads
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 3.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-28, 14);
  ctx.lineTo(-35, footPadY);
  ctx.moveTo(28, 14);
  ctx.lineTo(35, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-18, 16);
  ctx.lineTo(-35, footPadY);
  ctx.moveTo(18, 16);
  ctx.lineTo(35, footPadY);
  ctx.stroke();

  // Reinforced Steel Footpads with Cleats (isolated subpaths to prevent cross-connecting lines)
  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -39, footPadY - 4.0, 13, 4.0, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 26, footPadY - 4.0, 13, 4.0, 1.5);
  ctx.fill();
  ctx.stroke();

  // 2. Main Armored Heavy Hull
  ctx.fillStyle = createHullGrad(ctx, 0, -22, 0, 18, config.primaryColor);
  ctx.beginPath();
  ctx.moveTo(-34, 2);
  ctx.lineTo(-24, -22);
  ctx.lineTo(24, -22);
  ctx.lineTo(34, 2);
  ctx.lineTo(28, 18);
  ctx.lineTo(-28, 18);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // 3. Central Heavy Spherical Propellant Tanks with Brackets
  ctx.fillStyle = createFuelTank(ctx, -10, 2, 7);
  ctx.beginPath();
  ctx.arc(-10, 2, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = createFuelTank(ctx, 10, 2, 7);
  ctx.beginPath();
  ctx.arc(10, 2, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Heavy Reinforcement Bands
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-17, 2);
  ctx.lineTo(-3, 2);
  ctx.moveTo(3, 2);
  ctx.lineTo(17, 2);
  ctx.stroke();

  // 4. Industrial Hazard Warning Stripes
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-14, 11);
  ctx.lineTo(-10, 18);
  ctx.moveTo(-7, 11);
  ctx.lineTo(-3, 18);
  ctx.moveTo(0, 11);
  ctx.lineTo(4, 18);
  ctx.moveTo(7, 11);
  ctx.lineTo(11, 18);
  ctx.moveTo(14, 11);
  ctx.lineTo(18, 18);
  ctx.stroke();

  // 5. Dual Heavy Bridge Cockpit Viewports
  ctx.fillStyle = createVisorGrad(ctx, -11.5, -12, 6.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  roundRect(ctx, -18, -16, 13, 8, 2);
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(-13, -14, 3.5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = createVisorGrad(ctx, 11.5, -12, 6.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  roundRect(ctx, 5, -16, 13, 8, 2);
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(10, -14, 3.5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. Heavy Dual Gimbaled Thrusters
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-25, 18);
  ctx.lineTo(-13, 18);
  ctx.lineTo(-10, 27);
  ctx.lineTo(-28, 27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(13, 18);
  ctx.lineTo(25, 18);
  ctx.lineTo(28, 27);
  ctx.lineTo(10, 27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 3. VIPER DART (Stealth High-Agility Interceptor)
// =====================================================================
export function drawViper(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 30 + gearSpringOffset;

  // 1. Sleek Carbon Retractable Gear Struts & Footpads
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-16, 16);
  ctx.lineTo(-24, footPadY);
  ctx.moveTo(16, 16);
  ctx.lineTo(24, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#fda4af';
  ctx.strokeStyle = '#9f1239';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.ellipse(-24, footPadY - 1.8, 4.5, 1.8, 0, 0, Math.PI * 2);
  ctx.moveTo(24 + 4.5, footPadY - 1.8);
  ctx.ellipse(24, footPadY - 1.8, 4.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Aerodynamic Stealth Delta Wings
  ctx.fillStyle = '#090d16';
  ctx.beginPath();
  ctx.moveTo(0, -33);
  ctx.lineTo(19, 13);
  ctx.lineTo(28, 21);
  ctx.lineTo(14, 24);
  ctx.lineTo(0, 16);
  ctx.lineTo(-14, 24);
  ctx.lineTo(-28, 21);
  ctx.lineTo(-19, 13);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // 3. Titanium High-Pressure Fuel Core
  ctx.fillStyle = createFuelTank(ctx, 0, 5, 6);
  ctx.beginPath();
  ctx.arc(0, 5, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#be123c';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 4. Center Fuselage Razor Spine
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(0, -35);
  ctx.lineTo(10, 11);
  ctx.lineTo(0, 17);
  ctx.lineTo(-10, 11);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 5. Crimson Stealth Holographic Cockpit
  ctx.fillStyle = createVisorGrad(ctx, 0, -14, 11, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(0, -25);
  ctx.lineTo(6, -7);
  ctx.lineTo(0, -3);
  ctx.lineTo(-6, -7);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fda4af';
  ctx.lineWidth = 1.3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.ellipse(0, -14, 2.5, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. Vectoring Exhaust Bells
  ctx.fillStyle = '#e11d48';
  ctx.strokeStyle = '#fda4af';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-12, 22);
  ctx.lineTo(-6, 22);
  ctx.lineTo(-4, 28);
  ctx.lineTo(-14, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(6, 22);
  ctx.lineTo(12, 22);
  ctx.lineTo(14, 28);
  ctx.lineTo(4, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 4. AEGIS FORTRESS (Armored Heavy Planetary Pod)
// =====================================================================
export function drawAegis(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 28 + gearSpringOffset;

  // 1. Heavy Outrigger Hydraulic Landing Legs
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 3.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-22, 8);
  ctx.lineTo(-33, footPadY);
  ctx.moveTo(22, 8);
  ctx.lineTo(33, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#047857';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-12, 16);
  ctx.lineTo(-33, footPadY);
  ctx.moveTo(12, 16);
  ctx.lineTo(33, footPadY);
  ctx.stroke();

  // Broad Magnetic Footpad Discs
  ctx.fillStyle = '#34d399';
  ctx.strokeStyle = '#064e3b';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.ellipse(-33, footPadY - 2.2, 6, 2.2, 0, 0, Math.PI * 2);
  ctx.moveTo(33 + 6, footPadY - 2.2);
  ctx.ellipse(33, footPadY - 2.2, 6, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Reinforced Hexagonal Armored Hull — multi-stop emerald gradient
  const armorGrad = ctx.createLinearGradient(-25, -9, 25, 23);
  armorGrad.addColorStop(0, '#047857');
  armorGrad.addColorStop(0.5, '#064e3b');
  armorGrad.addColorStop(1, '#022c22');
  ctx.fillStyle = armorGrad;
  ctx.beginPath();
  ctx.moveTo(0, -25);
  ctx.lineTo(25, -9);
  ctx.lineTo(25, 14);
  ctx.lineTo(0, 23);
  ctx.lineTo(-25, 14);
  ctx.lineTo(-25, -9);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Armor panel seams (hex edges + cross braces)
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, -25); ctx.lineTo(0, 23);             // center vertical
  ctx.moveTo(-25, -9); ctx.lineTo(25, 14);            // left-to-right diagonal
  ctx.moveTo(25, -9); ctx.lineTo(-25, 14);            // right-to-left diagonal
  ctx.moveTo(-12, 2); ctx.lineTo(12, 2);              // mid horizontal
  ctx.stroke();
  // Rivet dots on armor seams
  ctx.fillStyle = '#6ee7b7';
  for (let rY of [-10, 5, 16]) {
    ctx.beginPath(); ctx.arc(-20, rY, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(20, rY, 0.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, 7, 0.8, 0, Math.PI * 2); ctx.fill();

  // Inner Kinetic Deflector Plate
  ctx.fillStyle = '#047857';
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(19, -6);
  ctx.lineTo(19, 10);
  ctx.lineTo(0, 16);
  ctx.lineTo(-19, 10);
  ctx.lineTo(-19, -6);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 3. Twin High-Pressure Propellant Spheres
  ctx.fillStyle = createXenonTank(ctx, -11, 4, 5);
  ctx.beginPath();
  ctx.arc(-11, 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = createXenonTank(ctx, 11, 4, 5);
  ctx.beginPath();
  ctx.arc(11, 4, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 4. Panoramic Emerald Observation Dome
  ctx.fillStyle = createVisorGrad(ctx, 0, -4, 8.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.arc(0, -4, 8.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(-2.5, -6, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 5. Dual Heavy Rocket Nozzles
  ctx.fillStyle = '#065f46';
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -18, 16, 9, 7, 1.5);
  roundRect(ctx, 9, 16, 9, 7, 1.5);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 5. NEBULA CLIPPER (Catamaran Ion Cruiser)
// =====================================================================
export function drawNebula(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 30 + gearSpringOffset;
  const skidY = 29 + gearSpringOffset;

  // 1. Catamaran Landing Skids with Footpads
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-22, 18);
  ctx.lineTo(-24, footPadY);
  ctx.moveTo(22, 18);
  ctx.lineTo(24, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#e879f9';
  ctx.strokeStyle = '#7e22ce';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -29, footPadY - 3.0, 10, 3.0, 1.2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 19, footPadY - 3.0, 10, 3.0, 1.2);
  ctx.fill();
  ctx.stroke();

  // 2. Twin Aerodynamic Carbon Booms — indigo gradient + panel seams + rivets
  const boomGrad = ctx.createLinearGradient(-29, -14, 29, 23);
  boomGrad.addColorStop(0, '#1e175b');
  boomGrad.addColorStop(0.5, '#3b0764');
  boomGrad.addColorStop(1, '#1e175b');
  ctx.fillStyle = boomGrad;
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-25, -25);
  ctx.lineTo(-16, -10);
  ctx.lineTo(-16, 21);
  ctx.lineTo(-27, 23);
  ctx.lineTo(-29, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right boom polygon (must match left)
  ctx.fillStyle = boomGrad;
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(25, -25);
  ctx.lineTo(16, -10);
  ctx.lineTo(16, 21);
  ctx.lineTo(27, 23);
  ctx.lineTo(29, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Boom panel seams (longitudinal + cross braces)
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-16, -10); ctx.lineTo(-16, 21);     // left spine
  ctx.moveTo(16, -10); ctx.lineTo(16, 21);       // right spine
  ctx.moveTo(-22, -6); ctx.lineTo(22, -6);        // lower cross brace
  ctx.moveTo(-22, 13); ctx.lineTo(22, 13);        // upper cross brace
  ctx.stroke();
  // Rivet rows along booms
  ctx.fillStyle = '#c084fc';
  for (let rY of [-10, 0, 6, 15]) {
    ctx.beginPath(); ctx.arc(-18, rY, 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(18, rY, 0.7, 0, Math.PI * 2); ctx.fill();
  }

  // 3. Central Xenon Fuel Sphere — gradient + longitudinal seam + rivets
  const fuelGrad = ctx.createRadialGradient(0, 5, 0, 0, 5, 7);
  fuelGrad.addColorStop(0, '#e879f9');
  fuelGrad.addColorStop(1, '#5b21b6');
  ctx.fillStyle = fuelGrad;
  ctx.beginPath();
  ctx.arc(0, 5, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  // Fuel tank seam (vertical line) and rivets
  ctx.strokeStyle = '#f0abfc';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, -2); ctx.lineTo(0, 12);
  ctx.stroke();
  ctx.fillStyle = '#e879f9';
  for (let rY of [0, 4, 8]) {
    ctx.beginPath(); ctx.arc(0, rY, 0.6, 0, Math.PI * 2); ctx.fill();
  }

  // 4. Center Bridge & Wings — violet gradient + seam panel
  const bridgeGrad = ctx.createLinearGradient(-16, 0, 16, 13);
  bridgeGrad.addColorStop(0, '#3b0764');
  bridgeGrad.addColorStop(0.5, '#581c87');
  bridgeGrad.addColorStop(1, '#3b0764');
  ctx.fillStyle = bridgeGrad;
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.lineTo(16, 0);
  ctx.lineTo(16, 13);
  ctx.lineTo(-16, 13);
  ctx.lineTo(-16, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e879f9';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  // Panel seams + rivets on bridge
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -15); ctx.lineTo(0, 13);     // center keel
  ctx.moveTo(-8, 3); ctx.lineTo(8, 3);          // mid horizontal
  ctx.stroke();
  ctx.fillStyle = '#e879f9';
  for (let rX of [-6, 0, 6]) {
    ctx.beginPath(); ctx.arc(rX, 7, 0.6, 0, Math.PI * 2); ctx.fill();
  }

  // 5. Violet Sensor Canopy — specular gradient + seam + rivets
  ctx.fillStyle = createVisorGrad(ctx, 0, -3, 9, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -3, 9, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();
  // Canopy seam (horizontal + vertical) + rivets on canopy edge
  ctx.strokeStyle = '#f0abfc';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-9, -3); ctx.lineTo(9, -3);    // horizontal seam
  ctx.moveTo(0, -8); ctx.lineTo(0, 2);      // vertical seam
  ctx.stroke();
  ctx.fillStyle = '#e879f9';
  for (let rX of [-6, 0, 6]) {
    ctx.beginPath(); ctx.arc(rX, -3, 0.7, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, -0.5, 0.7, 0, Math.PI * 2); ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.ellipse(-2.5, -5, 3.5, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. Ion Plasma Emitters — violet glow + white core highlights
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.arc(-21, 22, 4.5, 0, Math.PI * 2);
  ctx.arc(21, 22, 4.5, 0, Math.PI * 2);
  ctx.fill();
  // Emitter core glow
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-21, 22, 2.2, 0, Math.PI * 2);
  ctx.arc(21, 22, 2.2, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 6. VANGUARD ORBITAL (Classic Titanium Lunar Lander)
// =====================================================================
export function drawVanguard(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 28 + gearSpringOffset;

  // 1. Articulated Tripod Landing Struts & Footpads
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-16, 8);
  ctx.lineTo(-28, footPadY);
  ctx.moveTo(16, 8);
  ctx.lineTo(28, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-10, 16);
  ctx.lineTo(-28, footPadY);
  ctx.moveTo(10, 16);
  ctx.lineTo(28, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.ellipse(-28, footPadY - 2.2, 6, 2.2, 0, 0, Math.PI * 2);
  ctx.moveTo(28 + 6, footPadY - 2.2);
  ctx.ellipse(28, footPadY - 2.2, 6, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Gold Thermal Foil Descent Stage
  ctx.fillStyle = createGoldFoil(ctx, 2, 19);
  ctx.beginPath();
  ctx.moveTo(-18, 2);
  ctx.lineTo(-18, 19);
  ctx.lineTo(18, 19);
  ctx.lineTo(18, 2);
  ctx.lineTo(13, -2);
  ctx.lineTo(-13, -2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Thermal Foil Grid Pattern
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-14, 7);
  ctx.lineTo(14, 7);
  ctx.moveTo(-16, 14);
  ctx.lineTo(16, 14);
  ctx.stroke();

  // 3. Spherical Propellant Tanks
  ctx.fillStyle = createFuelTank(ctx, -9, 11, 5);
  ctx.beginPath();
  ctx.arc(-9, 11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  ctx.fillStyle = createXenonTank(ctx, 9, 11, 5);
  ctx.beginPath();
  ctx.arc(9, 11, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0369a1';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // 4. Titanium Command Sphere
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(0, -13, 14.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // 5. High-Tech Cyan Visor
  ctx.fillStyle = createVisorGrad(ctx, 0, -13, 7.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -13, 7.5, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.ellipse(-2.5, -15.5, 3.2, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. Orbital Antenna Dish Mast
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, -27);
  ctx.lineTo(0, -34);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-7, -36);
  ctx.quadraticCurveTo(0, -33, 7, -36);
  ctx.stroke();

  // 7. Rocket Engine Nozzles
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-15, 19);
  ctx.lineTo(-10, 19);
  ctx.lineTo(-8, 25);
  ctx.lineTo(-17, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, 19);
  ctx.lineTo(15, 19);
  ctx.lineTo(17, 25);
  ctx.lineTo(8, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 7. GOLIATH TRANSPORTER (Heavy Vehicle Carrier)
// =====================================================================
export function drawGoliath(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState
) {
  const footPadY = 32 + gearSpringOffset;

  // 1. Heavy Landing Struts & Cast Footpads
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(32, 14);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(24, 18);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  // Cast Steel Articulated Footpads
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-38, footPadY - 2.6, 7.5, 2.6, 0, 0, Math.PI * 2);
  ctx.moveTo(38 + 7.5, footPadY - 2.6);
  ctx.ellipse(38, footPadY - 2.6, 7.5, 2.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Starboard Right Flank Propulsion Nacelle (x: +16 to +38)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, 16, -8, 20, 26, 3);
  ctx.fill();
  ctx.stroke();

  // Titanium plate insert
  ctx.fillStyle = createTitaniumPlate(ctx, -5, 15);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 19, -5, 14, 20, 1.5);
  ctx.fill();
  ctx.stroke();

  // Nacelle heat fins
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(32, 0);
  ctx.moveTo(20, 6);
  ctx.lineTo(32, 6);
  ctx.stroke();

  // 3. Overhead Structural Arch (x: -16 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -16, -14, 32, 6, 1.5);
  ctx.fill();
  ctx.stroke();

  // 4. Hollow Center Vehicle Hold Bay (Empty in the Middle)
  const gHoldX = -16;
  const gHoldY = -8;
  const gHoldW = 32;
  const gHoldH = 24;

  ctx.fillStyle = '#030712';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, gHoldX, gHoldY, gHoldW, gHoldH, 1);
  ctx.fill();
  ctx.stroke();

  // Render Onboard Vehicle if loaded
  if ((ship.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(0, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-12, -4, 24, 8);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-12, -4, 24, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(2, -7, 8, 4);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(-7, 4, 2.5, 0, Math.PI * 2);
    ctx.arc(7, 4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 5. Left Port Side Door / Hydraulic Ramp (-22 to -16)
  const rampProgress = ship.rampProgress || 0;
  const rampHingeX = gHoldX;
  const rampHingeY = gHoldY + gHoldH - 2;

  if (rampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * rampProgress;
    const rampEndX = rampHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = rampHingeY + Math.sin(currentAngle) * rampLength;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed door marker matching SVG
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.lineTo(-26, 22);
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.4;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.lineTo(-26, 22);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-26, 22, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 6. Elevated Left Side Controller Tower (Command Bridge & ATC) (x: -36 to -16, y: -34 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-36, -26);
  ctx.lineTo(-28, -34);
  ctx.lineTo(-16, -34);
  ctx.lineTo(-16, 16);
  ctx.lineTo(-36, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // Tower Armor Plate
  ctx.fillStyle = createTitaniumPlate(ctx, -18, 12);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -34, -18, 16, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Panoramic Flight Control Bridge Observation Visor (Cyan)
  ctx.fillStyle = createVisorGrad(ctx, -25.5, -25, 9, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(-33, -24);
  ctx.lineTo(-27, -30);
  ctx.lineTo(-18, -30);
  ctx.lineTo(-18, -20);
  ctx.lineTo(-33, -20);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-26, -25, 3.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Antenna Mast & Telemetry Radar on Left Tower
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-28, -34);
  ctx.lineTo(-28, -42);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-33, -41);
  ctx.quadraticCurveTo(-28, -38, -23, -41);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-19, -33, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // 7. Heavy Thruster Bells
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -33, 16, 12, 7, 1);
  roundRect(ctx, 20, 16, 12, 7, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 8. BEHEMOTH-IX (Dreadnought Planetary Carrier)
// =====================================================================
export function drawBehemoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState
) {
  const footPadY = 33 + gearSpringOffset;

  // 1. Quad Outrigger Landing Gear & Articulated Footpads
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(32, 14);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(24, 18);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-38, footPadY - 2.8, 7.5, 2.8, 0, 0, Math.PI * 2);
  ctx.moveTo(38 + 7.5, footPadY - 2.8);
  ctx.ellipse(38, footPadY - 2.8, 7.5, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Left Portside Heavy Gantry Crane & Cargo Structure (x: -36 to -14)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -36, -12, 22, 28, 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-34, -4);
  ctx.lineTo(-16, -4);
  ctx.moveTo(-34, 4);
  ctx.lineTo(-16, 4);
  ctx.stroke();

  // Gantry crane boom truss
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-30, -12);
  ctx.lineTo(-30, -24);
  ctx.stroke();

  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-30, -24);
  ctx.lineTo(-16, -12);
  ctx.stroke();

  ctx.fillStyle = '#fdba74';
  ctx.beginPath();
  ctx.arc(-30, -24, 2, 0, Math.PI * 2);
  ctx.fill();

  // 3. Center Hollow Vehicle Hold Bay (x: -14 to +14)
  const bHoldX = -14;
  const bHoldY = -8;
  const bHoldW = 28;
  const bHoldH = 24;

  ctx.fillStyle = '#030712';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, bHoldX, bHoldY, bHoldW, bHoldH, 1.5);
  ctx.fill();
  ctx.stroke();

  // Render Onboard Vehicle if loaded
  if ((ship.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(0, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, -4, 20, 8);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-10, -4, 20, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(2, -7, 7, 4);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(-6, 4, 2.2, 0, Math.PI * 2);
    ctx.arc(6, 4, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 4. Left Asymmetrical Hydraulic Loading Ramp Door
  const bRampProgress = ship.rampProgress || 0;
  const bHingeX = bHoldX;
  const bHingeY = bHoldY + bHoldH - 2;

  if (bRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * bRampProgress;
    const rampEndX = bHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = bHingeY + Math.sin(currentAngle) * rampLength;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bHingeX, bHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bHingeX, bHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed door marker matching SVG
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-14, 14);
    ctx.lineTo(-26, 23);
    ctx.stroke();

    ctx.strokeStyle = '#fed7aa';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(-14, 14);
    ctx.lineTo(-26, 23);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(-26, 23, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Starboard Heavy Command Bridge Tower (x: +14 to +36, y: -34 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(14, -34);
  ctx.lineTo(34, -34);
  ctx.lineTo(36, -26);
  ctx.lineTo(36, 16);
  ctx.lineTo(14, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  ctx.fillStyle = createTitaniumPlate(ctx, -18, 12);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 16, -18, 18, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Cyan Panoramic Bridge Visor
  ctx.fillStyle = createVisorGrad(ctx, 24, -26, 9, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(17, -30);
  ctx.lineTo(31, -30);
  ctx.lineTo(33, -22);
  ctx.lineTo(17, -22);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(24, -26, 3.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Tower Radar & Telemetry Mast
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(28, -34);
  ctx.lineTo(28, -43);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(23, -42);
  ctx.quadraticCurveTo(28, -39, 33, -42);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(19, -33, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // 6. Asymmetrical Thruster Arrays
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -30, 16, 12, 7, 1);
  roundRect(ctx, 18, 16, 16, 7, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 9. LEVIATHAN TITAN (Split-Hull Catamaran Supercarrier)
// =====================================================================
export function drawLeviathan(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState
) {
  const footPadY = 34 + gearSpringOffset;

  // 1. Wide Catamaran Outriggers & Footpads
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-34, 12);
  ctx.lineTo(-40, footPadY);
  ctx.moveTo(32, 12);
  ctx.lineTo(40, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-26, 16);
  ctx.lineTo(-40, footPadY);
  ctx.moveTo(24, 16);
  ctx.lineTo(40, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#0891b2';
  ctx.strokeStyle = '#164e63';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-40, footPadY - 2.8, 8, 2.8, 0, 0, Math.PI * 2);
  ctx.moveTo(40 + 8, footPadY - 2.8);
  ctx.ellipse(40, footPadY - 2.8, 8, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Massive Port Armored Vehicle Hangar Sponson (x: -38 to -10, y: -26 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-38, -18);
  ctx.lineTo(-32, -28);
  ctx.lineTo(-10, -28);
  ctx.lineTo(-10, 16);
  ctx.lineTo(-38, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // Titanium plate insert
  ctx.fillStyle = createTitaniumPlate(ctx, -12, 12);
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -34, -12, 22, 24, 2);
  ctx.fill();
  ctx.stroke();

  // Port Sponson Glacial Visor Observation Dome
  ctx.fillStyle = createVisorGrad(ctx, -22, -22, 6, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(-22, -22, 6, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-24, -23, 2.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 3. Center Pass-Through Hold & Overhead Truss Bridge (x: -10 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -10, -14, 26, 5, 1);
  ctx.fill();
  ctx.stroke();

  const lHoldX = -10;
  const lHoldY = -9;
  const lHoldW = 26;
  const lHoldH = 25;

  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#155e75';
  ctx.lineWidth = 1.2;
  ctx.fillRect(lHoldX, lHoldY, lHoldW, lHoldH);
  ctx.strokeRect(lHoldX, lHoldY, lHoldW, lHoldH);

  // Render Onboard Vehicle if loaded
  if ((ship.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(3, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, -4, 20, 8);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-10, -4, 20, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(2, -7, 7, 4);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(-6, 4, 2.2, 0, Math.PI * 2);
    ctx.arc(6, 4, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 4. Hydraulic Ramp Door Folding Downward
  const lRampProgress = ship.rampProgress || 0;
  const lHingeX = lHoldX;
  const lHingeY = lHoldY + lHoldH - 2;

  if (lRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * lRampProgress;
    const rampEndX = lHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = lHingeY + Math.sin(currentAngle) * rampLength;

    ctx.strokeStyle = '#0891b2';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lHingeX, lHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lHingeX, lHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed door marker matching SVG
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-10, 14);
    ctx.lineTo(-22, 23);
    ctx.stroke();

    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(-22, 23, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Starboard Slender Sensor Spire & Reactor Spine (x: +16 to +38, y: -38 to +16)
  ctx.fillStyle = '#020617';
  ctx.beginPath();
  ctx.moveTo(16, -38);
  ctx.lineTo(28, -38);
  ctx.lineTo(38, -16);
  ctx.lineTo(38, 16);
  ctx.lineTo(16, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.8;
  ctx.stroke();

  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(22, -38);
  ctx.lineTo(22, -44);
  ctx.stroke();

  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(17, -43);
  ctx.quadraticCurveTo(22, -40, 27, -43);
  ctx.stroke();

  // Reactor Luminescent Rings
  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  roundRect(ctx, 20, -10, 14, 4, 1);
  roundRect(ctx, 20, -2, 14, 4, 1);
  ctx.fill();

  // 6. Heavy Triple/Single Asymmetrical Thrusters
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -34, 16, 20, 7, 1);
  roundRect(ctx, 22, 16, 12, 7, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 10. MAMMOTH RIG (Excavator Mobile Base Carrier)
// =====================================================================
export function drawMammoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState
) {
  const footPadY = 34 + gearSpringOffset;

  // 1. Heavy Articulated Mining Struts
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(32, 14);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-22, 18);
  ctx.lineTo(-38, footPadY);
  ctx.moveTo(22, 18);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-38, footPadY - 2.8, 7.5, 2.8, 0, 0, Math.PI * 2);
  ctx.moveTo(38 + 7.5, footPadY - 2.8);
  ctx.ellipse(38, footPadY - 2.8, 7.5, 2.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 2. Portside Excavator Hydraulic Crane Boom & Trusses (x: -38 to -14)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -38, -14, 24, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Crane boom arm reaching up-left
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-32, -14);
  ctx.lineTo(-38, -28);
  ctx.stroke();

  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-24, -14);
  ctx.lineTo(-38, -28);
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(-38, -28, 2.2, 0, Math.PI * 2);
  ctx.fill();

  // 3. Center Ultra-Wide Mining Vehicle Bay (x: -14 to +14)
  const mHoldX = -14;
  const mHoldY = -8;
  const mHoldW = 28;
  const mHoldH = 24;

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, mHoldX, mHoldY, mHoldW, mHoldH, 1.5);
  ctx.fill();
  ctx.stroke();

  // Render Onboard Vehicle if loaded
  if ((ship.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(0, 8);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(-10, -4, 20, 8);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-10, -4, 20, 8);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(2, -7, 7, 4);
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(-6, 4, 2.2, 0, Math.PI * 2);
    ctx.arc(6, 4, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 4. Drop-Down Hydraulic Mining Ramp
  const mRampProgress = ship.rampProgress || 0;
  const mHingeX = mHoldX;
  const mHingeY = mHoldY + mHoldH - 2;

  if (mRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * mRampProgress;
    const rampEndX = mHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = mHingeY + Math.sin(currentAngle) * rampLength;

    ctx.strokeStyle = '#854d0e';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(mHingeX, mHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mHingeX, mHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed door marker matching SVG
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-14, 14);
    ctx.lineTo(-26, 23);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-26, 23, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Starboard Cylindrical Refinery & Crimson Observation Bridge (x: +14 to +38, y: -34 to +16)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(14, -34);
  ctx.lineTo(32, -34);
  ctx.lineTo(38, -18);
  ctx.lineTo(38, 16);
  ctx.lineTo(14, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // Refinery fuel column
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, 18, -12, 16, 24, 3);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(18, -4);
  ctx.lineTo(34, -4);
  ctx.moveTo(18, 4);
  ctx.lineTo(34, 4);
  ctx.stroke();

  // Crimson Command Cupola
  ctx.fillStyle = createVisorGrad(ctx, 23, -26, 8, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(16, -30);
  ctx.lineTo(30, -30);
  ctx.lineTo(33, -22);
  ctx.lineTo(16, -22);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fda4af';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(23, -26, 3.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Starboard Beacon
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(34, -32, 2, 0, Math.PI * 2);
  ctx.fill();

  // 6. Thruster Assemblies
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -30, 16, 12, 7, 1);
  roundRect(ctx, 20, 16, 14, 7, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 11. WASP SCOUT (WS-2 Stinger - Dual-Pod Micro Recon Lander)
// =====================================================================
export function drawWasp(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 28 + gearSpringOffset;

  // 1. Landing Gear Struts
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-12, 10);
  ctx.lineTo(-24, footPadY);
  ctx.moveTo(-8, 16);
  ctx.lineTo(-24, footPadY);
  ctx.moveTo(12, 10);
  ctx.lineTo(24, footPadY);
  ctx.moveTo(8, 16);
  ctx.lineTo(24, footPadY);
  ctx.stroke();

  // Skid Footpads (isolated subpaths to prevent cross-connecting lines)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -28, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 19, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();

  // 2a. Outrigger Pod Hull Textures — brushed metal panel lines and rivet rows
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-24, 3); ctx.lineTo(-16, 3);
  ctx.moveTo(-24, 10); ctx.lineTo(-16, 10);
  ctx.moveTo(-24, 17); ctx.lineTo(-16, 17);
  ctx.moveTo(16, 3); ctx.lineTo(24, 3);
  ctx.moveTo(16, 10); ctx.lineTo(24, 10);
  ctx.moveTo(16, 17); ctx.lineTo(24, 17);
  ctx.stroke();
  ctx.fillStyle = '#94a3b8';
  for (let rX of [-23, -19, -17, -21]) {
    ctx.beginPath(); ctx.arc(rX, 3, 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rX, 10, 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rX, 17, 0.9, 0, Math.PI * 2); ctx.fill();
  }
  for (let rX of [17, 19, 21, 23]) {
    ctx.beginPath(); ctx.arc(rX, 3, 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rX, 10, 0.9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(rX, 17, 0.9, 0, Math.PI * 2); ctx.fill();
  }

  // 2b. Dual Side Engine Outrigger Pods (brushed titanium gradient)
  const podGradL = ctx.createLinearGradient(-24, 0, -16, 22);
  podGradL.addColorStop(0, '#334155'); podGradL.addColorStop(0.4, '#0f172a'); podGradL.addColorStop(1, '#1e293b');
  const podGradR = ctx.createLinearGradient(24, 0, 16, 22);
  podGradR.addColorStop(0, '#334155'); podGradR.addColorStop(0.4, '#0f172a'); podGradR.addColorStop(1, '#1e293b');
  ctx.fillStyle = podGradL;
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  roundRect(ctx, -24, 0, 8, 22, 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = podGradR;
  ctx.beginPath();
  roundRect(ctx, 16, 0, 8, 22, 2);
  ctx.fill();
  ctx.stroke();

  // Outrigger Trusses
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-10, 4);
  ctx.lineTo(-16, 4);
  ctx.moveTo(-10, 14);
  ctx.lineTo(-16, 14);
  ctx.moveTo(10, 4);
  ctx.lineTo(16, 4);
  ctx.moveTo(10, 14);
  ctx.lineTo(16, 14);
  ctx.stroke();

  // 3. Central Descent Core (Gold Thermal Foil) — multi-stop gradient + quilting seams
  const coreGrad = ctx.createLinearGradient(-14, 4, 14, 18);
  coreGrad.addColorStop(0, '#fef08a');
  coreGrad.addColorStop(0.3, '#eab308');
  coreGrad.addColorStop(0.65, '#ca8a04');
  coreGrad.addColorStop(1, '#713f12');
  ctx.fillStyle = coreGrad;
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-12, 4);
  ctx.lineTo(-14, 18);
  ctx.lineTo(14, 18);
  ctx.lineTo(12, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Gold Quilting Lines (MLI thermal seam quilting)
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-12, 11);
  ctx.lineTo(12, 11);
  ctx.stroke();

  // Additional quilting seam + MLI foil highlight
  ctx.strokeStyle = '#fde68a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-13, 7);
  ctx.lineTo(13, 7);
  ctx.stroke();
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-13, 15);
  ctx.lineTo(13, 15);
  ctx.stroke();

  // 4. Stinger Upper Cabin — faceted hull with seams + gold trim + rivets
  ctx.fillStyle = createHullGrad(ctx, -14, -26, 14, 4, config.primaryColor);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(14, -10);
  ctx.lineTo(12, 4);
  ctx.lineTo(-12, 4);
  ctx.lineTo(-14, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Faceted panel seams + rivet rows (over filled cabin)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, -28); ctx.lineTo(0, 4);
  ctx.moveTo(-14, -10); ctx.lineTo(-12, 4);
  ctx.moveTo(14, -10); ctx.lineTo(12, 4);
  ctx.moveTo(-7, -18); ctx.lineTo(7, -18);
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  for (let rY of [-18, -8]) {
    ctx.beginPath(); ctx.arc(-11, rY, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(11, rY, 0.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, -18, 0.8, 0, Math.PI * 2); ctx.fill();

  // 5. Amber Visor Canopy
  ctx.fillStyle = createVisorGrad(ctx, 0, -14, 6.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -14, 6.5, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 1.1;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.ellipse(-2, -15.5, 2.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 6. Antenna Spikes
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-4, -28);
  ctx.lineTo(-6, -34);
  ctx.moveTo(4, -28);
  ctx.lineTo(6, -34);
  ctx.stroke();

  // 7. Engine Nozzles
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-23, 22);
  ctx.lineTo(-17, 22);
  ctx.lineTo(-16, 26);
  ctx.lineTo(-24, 26);
  ctx.closePath();
  ctx.moveTo(17, 22);
  ctx.lineTo(23, 22);
  ctx.lineTo(24, 26);
  ctx.lineTo(16, 26);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 12. KESTREL STUNT (KS-9 Aerobatic Dart)
// =====================================================================
export function drawKestrel(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 28 + gearSpringOffset;

  // 1. Aerobatic Skid Struts
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.lineTo(-25, footPadY);
  ctx.moveTo(16, 12);
  ctx.lineTo(25, footPadY);
  ctx.stroke();

  // Titanium Skids (isolated subpaths to prevent cross-connecting lines)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -28, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 19, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();

  // 2. Swept Delta Wing Strakes — multi-stop gradient + panel seams + rivets
  const wingGrad = ctx.createLinearGradient(-26, 12, 26, 18);
  wingGrad.addColorStop(0, '#0f172a');
  wingGrad.addColorStop(0.5, '#1e293b');
  wingGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = wingGrad;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(26, 12);
  ctx.lineTo(18, 18);
  ctx.lineTo(-18, 18);
  ctx.lineTo(-26, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wing panel seams (leading-edge / trailing-edge / mid-span)
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, -22); ctx.lineTo(0, 18);            // center keel seam
  ctx.moveTo(-13, -4); ctx.lineTo(-22, 14);          // left flank seam
  ctx.moveTo(13, -4); ctx.lineTo(22, 14);             // right flank seam
  ctx.moveTo(-20, 10); ctx.lineTo(20, 10);            // trailing seam
  ctx.stroke();
  // Rivet rows along wing seams
  ctx.fillStyle = '#67e8f9';
  for (let rY of [4, 11]) {
    ctx.beginPath(); ctx.arc(-22, rY, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(22, rY, 0.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, 11, 0.8, 0, Math.PI * 2); ctx.fill();

  // Wing Tip Pylons
  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(-27, 8, 2, 7);
  ctx.fillRect(25, 8, 2, 7);
  // Pylon rivets
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath(); ctx.arc(-26, 11, 0.7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(26, 11, 0.7, 0, Math.PI * 2); ctx.fill();

  // 3. Central Needle Fuselage — faceted seams + rivets
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, -32); ctx.lineTo(0, 16);               // center keel
  ctx.moveTo(-8, -10); ctx.lineTo(-10, 16);            // left flank
  ctx.moveTo(8, -10); ctx.lineTo(10, 16);              // right flank
  ctx.moveTo(-4, -18); ctx.lineTo(4, -18);              // brow seam
  ctx.stroke();
  ctx.fillStyle = '#67e8f9';
  for (let rY of [-18, -2, 10]) {
    ctx.beginPath(); ctx.arc(-9, rY, 0.8, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(9, rY, 0.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, -18, 0.8, 0, Math.PI * 2); ctx.fill();

  // 3b. Central Needle Fuselage (multi-stop gradient + cyan trim)
  ctx.fillStyle = createHullGrad(ctx, -10, -32, 10, 16, config.primaryColor);
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(8, -10);
  ctx.lineTo(10, 16);
  ctx.lineTo(-10, 16);
  ctx.lineTo(-8, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 4. Cyan Aerobatic Visor
  ctx.fillStyle = createVisorGrad(ctx, 0, -12, 5.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(4, -8);
  ctx.lineTo(-4, -8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // 5. Dual Nozzles
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-8, 16);
  ctx.lineTo(-2, 16);
  ctx.lineTo(-1, 22);
  ctx.lineTo(-9, 22);
  ctx.closePath();
  ctx.moveTo(2, 16);
  ctx.lineTo(8, 16);
  ctx.lineTo(9, 22);
  ctx.lineTo(1, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 13. SPECTRE RECON (SP-4 Stealth Surveyor)
// =====================================================================
export function drawSpectre(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 29 + gearSpringOffset;

  // 1. Stealth Retractable Gear
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-14, 14);
  ctx.lineTo(-26, footPadY);
  ctx.moveTo(14, 14);
  ctx.lineTo(26, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#1e1b4b';
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -29, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 20, footPadY - 3.0, 9, 3.0, 1);
  ctx.fill();
  ctx.stroke();

  // 2. Stealth Diamond Faceted Fuselage — purple gradient + panel seams + rivets
  const stealthGrad = ctx.createLinearGradient(-24, -32, 24, 18);
  stealthGrad.addColorStop(0, '#1e1b4b');
  stealthGrad.addColorStop(0.5, '#090d16');
  stealthGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = stealthGrad;
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(24, 0);
  ctx.lineTo(18, 18);
  ctx.lineTo(-18, 18);
  ctx.lineTo(-24, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Inner facet seams — diamond panel lines + rivets on edges
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -32); ctx.lineTo(0, 18);            // center keel
  ctx.moveTo(-24, 0); ctx.lineTo(0, 6); ctx.lineTo(24, 0); // cross-facet
  ctx.moveTo(-12, -11); ctx.lineTo(12, -11);          // brow seam
  ctx.stroke();
  ctx.fillStyle = '#c084fc';
  for (let rY of [-18, -4, 9]) {
    ctx.beginPath(); ctx.arc(-12, rY, 0.7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(12, rY, 0.7, 0, Math.PI * 2); ctx.fill();
  }
  ctx.beginPath(); ctx.arc(0, -16, 0.7, 0, Math.PI * 2); ctx.fill();

  // 3. Purple Slit Visor — specular highlight
  ctx.fillStyle = createVisorGrad(ctx, 0, -10, 6, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(6, -8);
  ctx.lineTo(0, -4);
  ctx.lineTo(-6, -8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#e9d5ff';
  ctx.lineWidth = 1.1;
  ctx.stroke();

  // 4. Stealth Shielded Nozzles
  ctx.fillStyle = '#180828';
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -14, 18, 8, 5, 1);
  roundRect(ctx, 6, 18, 8, 5, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 14. ORION SURVEYOR (OR-300 Deep Space Scout)
// =====================================================================
export function drawOrion(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 30 + gearSpringOffset;

  // 1. Heavy Structural Inter-Boom Trusses (connecting booms to main fuselage)
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  // Upper horizontal & diagonal cross-trusses
  ctx.moveTo(-14, -2); ctx.lineTo(-18, -2);
  ctx.moveTo(-14, -2); ctx.lineTo(-18, 5);
  ctx.moveTo(-14, 5); ctx.lineTo(-18, -2);
  ctx.moveTo(14, -2); ctx.lineTo(18, -2);
  ctx.moveTo(14, -2); ctx.lineTo(18, 5);
  ctx.moveTo(14, 5); ctx.lineTo(18, -2);
  // Lower diagonal cross-braces (angled to booms, no horizontal bar at gear root)
  ctx.moveTo(-14, 5); ctx.lineTo(-18, 11);
  ctx.moveTo(14, 5); ctx.lineTo(18, 11);
  ctx.stroke();

  // 2. Telescopic Articulated Landing Gear
  // Main oleo hydraulic cylinders
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-15, 10); ctx.lineTo(-27, footPadY - 2);
  ctx.moveTo(15, 10); ctx.lineTo(27, footPadY - 2);
  ctx.stroke();

  // Chrome inner piston shafts
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-22, footPadY - 11); ctx.lineTo(-27, footPadY - 2);
  ctx.moveTo(22, footPadY - 11); ctx.lineTo(27, footPadY - 2);
  ctx.stroke();

  // Gear Knuckle Joints (drawn individually so canvas never adds a connecting line between them)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.arc(-27, footPadY - 2, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(27, footPadY - 2, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Articulated Surveyor Footpads (drawn individually so port and starboard feet are fully independent)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  roundRect(ctx, -33, footPadY - 3.2, 12, 3.6, 1.2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 21, footPadY - 3.2, 12, 3.6, 1.2);
  ctx.fill();
  ctx.stroke();

  // Sole grip treads & ground micro-sensors
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-30, footPadY); ctx.lineTo(-24, footPadY);
  ctx.moveTo(24, footPadY); ctx.lineTo(30, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-27, footPadY - 1.2, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(27, footPadY - 1.2, 0.9, 0, Math.PI * 2);
  ctx.fill();

  // 3. Port Science Boom (Outer Radiator Vanes & High-Gain Parabolic Dish)
  // Outer Radiator Cooling Fins on Port Boom
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-26, -3); ctx.lineTo(-29, -3);
  ctx.moveTo(-26, 3); ctx.lineTo(-29, 3);
  ctx.moveTo(-26, 9); ctx.lineTo(-29, 9);
  ctx.stroke();

  // Port Boom Housing
  const portBoomGrad = ctx.createLinearGradient(-26, -8, -18, 16);
  portBoomGrad.addColorStop(0, '#334155');
  portBoomGrad.addColorStop(0.45, '#1e293b');
  portBoomGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = portBoomGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -26, -8, 8, 24, 2);
  ctx.fill();
  ctx.stroke();

  // Port Boom Panel Seams & Rivets
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-26, -1); ctx.lineTo(-18, -1);
  ctx.moveTo(-26, 6); ctx.lineTo(-18, 6);
  ctx.moveTo(-26, 12); ctx.lineTo(-18, 12);
  ctx.stroke();
  ctx.fillStyle = '#bae6fd';
  for (const py of [-5, 2.5, 9, 14]) {
    ctx.beginPath();
    ctx.arc(-24.5, py, 0.65, 0, Math.PI * 2);
    ctx.arc(-19.5, py, 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  // Deployable High-Gain Deep-Space Parabolic Dish
  // Dish Gimbal Base & Mast
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-22, -8); ctx.lineTo(-22, -16);
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-22, -8, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Parabolic Dish Reflector (smooth curve)
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(-22, -19, 6.5, 0.25 * Math.PI, 0.75 * Math.PI, false);
  ctx.stroke();
  // Dish inner concave metallic glow
  ctx.fillStyle = '#bae6fd';
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.arc(-22, -19, 6, 0.25 * Math.PI, 0.75 * Math.PI, false);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Dish Feed Horn & Focal Support Struts
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-26, -14.5); ctx.lineTo(-22, -21);
  ctx.moveTo(-18, -14.5); ctx.lineTo(-22, -21);
  ctx.stroke();
  // Focal Feed Node
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-22, -21, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-22, -21, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // 4. Starboard Science Boom (Multi-Spectral Spectrometer & Magnetometer Mast)
  // Outer Radiator Cooling Fins on Starboard Boom
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(26, -3); ctx.lineTo(29, -3);
  ctx.moveTo(26, 3); ctx.lineTo(29, 3);
  ctx.moveTo(26, 9); ctx.lineTo(29, 9);
  ctx.stroke();

  // Starboard Boom Housing
  const starBoomGrad = ctx.createLinearGradient(18, -8, 26, 16);
  starBoomGrad.addColorStop(0, '#334155');
  starBoomGrad.addColorStop(0.45, '#1e293b');
  starBoomGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = starBoomGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 18, -8, 8, 24, 2);
  ctx.fill();
  ctx.stroke();

  // Starboard Boom Panel Seams & Rivets
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(18, -1); ctx.lineTo(26, -1);
  ctx.moveTo(18, 6); ctx.lineTo(26, 6);
  ctx.moveTo(18, 12); ctx.lineTo(26, 12);
  ctx.stroke();
  ctx.fillStyle = '#bae6fd';
  for (const py of [-5, 2.5, 9, 14]) {
    ctx.beginPath();
    ctx.arc(19.5, py, 0.65, 0, Math.PI * 2);
    ctx.arc(24.5, py, 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  // Multi-Spectral Optical Spectrometer Aperture & Laser Ranging Turret
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(22, -10, 4.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Spectrometer Primary Glass Lens (Glowing Cyan/Azure Ring)
  const lensGrad = ctx.createRadialGradient(21, -11, 0.5, 22, -10, 3.2);
  lensGrad.addColorStop(0, '#ffffff');
  lensGrad.addColorStop(0.4, '#38bdf8');
  lensGrad.addColorStop(0.85, '#0369a1');
  lensGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = lensGrad;
  ctx.beginPath();
  ctx.arc(22, -10, 3.2, 0, Math.PI * 2);
  ctx.fill();
  // Lens Specular Flare
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.arc(21, -11.2, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Forward Magnetometer / RF Sensor Mast
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(22, -14); ctx.lineTo(22, -26);
  ctx.stroke();
  // Tri-axial sensor tip & antenna cross-spikes
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(19, -26); ctx.lineTo(25, -26);
  ctx.moveTo(22, -23); ctx.lineTo(22, -29);
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(22, -26, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // 5. Spherical Xenon Propellant Pressurization Tanks (with containment girth straps)
  // Left Tank
  ctx.fillStyle = createXenonTank(ctx, -10, 8, 5.5);
  ctx.beginPath();
  ctx.arc(-10, 8, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.1;
  ctx.stroke();
  // Left tank titanium strap & tension bolt
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-10, 8, 5.5, -0.35 * Math.PI, 0.35 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-11, 7.2, 2, 1.6);

  // Right Tank
  ctx.fillStyle = createXenonTank(ctx, 10, 8, 5.5);
  ctx.beginPath();
  ctx.arc(10, 8, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.1;
  ctx.stroke();
  // Right tank titanium strap & tension bolt
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(10, 8, 5.5, 0.65 * Math.PI, 1.35 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(9, 7.2, 2, 1.6);

  // Cryo fuel supply lines into fuselage
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-5.5, 9); ctx.lineTo(-2, 12);
  ctx.moveTo(5.5, 9); ctx.lineTo(2, 12);
  ctx.stroke();

  // 6. Main Surveyor Command Fuselage
  const mainHullGrad = ctx.createLinearGradient(0, -34, 0, 18);
  mainHullGrad.addColorStop(0, '#334155');
  mainHullGrad.addColorStop(0.25, '#1e293b');
  mainHullGrad.addColorStop(0.65, '#0f172a');
  mainHullGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = mainHullGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.7;
  ctx.beginPath();
  ctx.moveTo(0, -34);       // Nose apex
  ctx.lineTo(14, -14);     // Upper avionics shoulder
  ctx.lineTo(15, 17);      // Lower science deck
  ctx.lineTo(11, 18);      // Right engine mount outer
  ctx.lineTo(7, 18);       // Right engine mount inner
  ctx.lineTo(0, 13);       // Recessed central keel arch (open clearance, no bridging bar)
  ctx.lineTo(-7, 18);      // Left engine mount inner
  ctx.lineTo(-11, 18);     // Left engine mount outer
  ctx.lineTo(-15, 17);     // Lower science deck left
  ctx.lineTo(-14, -14);    // Upper avionics shoulder left
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Longitudinal Keel Seam & Structural Bulkhead Lines
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -34); ctx.lineTo(0, 13);     // Center spine to recessed arch
  ctx.moveTo(-11, -8); ctx.lineTo(11, -8);   // Upper bulkhead
  ctx.stroke();

  // Hull Facet Lines
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -34); ctx.lineTo(-8, -14); ctx.lineTo(-8, 18);
  ctx.moveTo(0, -34); ctx.lineTo(8, -14); ctx.lineTo(8, 18);
  ctx.stroke();

  // Precision Micro-Rivets along Hull Seams
  ctx.fillStyle = '#bae6fd';
  for (const ry of [-22, -16, -6, -1, 5, 8, 14]) {
    ctx.beginPath();
    ctx.arc(-13, ry, 0.65, 0, Math.PI * 2);
    ctx.arc(13, ry, 0.65, 0, Math.PI * 2);
    ctx.fill();
  }

  // 7. Panoramic Surveyor Visor & Multi-Angle Cupola Dome
  ctx.fillStyle = createVisorGrad(ctx, 0, -14, 7.5, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -14, 7.5, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 1.3;
  ctx.stroke();

  // Cupola Armored Window Mullions (Vertical Divider & Horizontal Horizon Seam)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, -19.5); ctx.lineTo(0, -8.5);    // Center divider
  ctx.moveTo(-6.5, -14); ctx.lineTo(6.5, -14);  // Horizon seam
  ctx.stroke();

  // Visor Frame Perimeter Rivets
  ctx.fillStyle = '#e0f2fe';
  for (const rx of [-6, -3, 0, 3, 6]) {
    ctx.beginPath();
    ctx.arc(rx, -19, 0.55, 0, Math.PI * 2);
    ctx.arc(rx, -9, 0.55, 0, Math.PI * 2);
    ctx.fill();
  }

  // Glass Specular Gloss Arc
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-2.8, -16, 2.8, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 8. Dual MPD Vector Thruster Nozzles (Flared Rocket Bells with Heat Shields)
  // Left Nozzle Assembly
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  // Nozzle throat & divergent bell
  ctx.moveTo(-13.5, 18);
  ctx.lineTo(-7.5, 18);
  ctx.lineTo(-6, 24);
  ctx.lineTo(-15, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Left Nozzle Core Plasma Glow
  ctx.beginPath();
  ctx.ellipse(-10.5, 23.5, 3.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-10.5, 23.5, 1.8, 0.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Right Nozzle Assembly
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(7.5, 18);
  ctx.lineTo(13.5, 18);
  ctx.lineTo(15, 24);
  ctx.lineTo(6, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Right Nozzle Core Plasma Glow
  ctx.beginPath();
  ctx.ellipse(10.5, 23.5, 3.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(10.5, 23.5, 1.8, 0.7, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Gimbal Actuator Struts on Nozzles
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-14.5, 18); ctx.lineTo(-14.5, 22);
  ctx.moveTo(14.5, 18); ctx.lineTo(14.5, 22);
  ctx.stroke();
}

// =====================================================================
// 15. VALKYRIE TACTICAL (VK-55 Armored Dropship)
// =====================================================================
export function drawValkyrie(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 31 + gearSpringOffset;

  // 1. Reinforced Dual Shock Gear
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(-18, 12);
  ctx.lineTo(-30, footPadY);
  ctx.moveTo(18, 12);
  ctx.lineTo(30, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -34, footPadY - 3.5, 11, 3.5, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 23, footPadY - 3.5, 11, 3.5, 1.5);
  ctx.fill();
  ctx.stroke();

  // 2. Heavy Armored Dropship Outer Hull
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(28, -6);
  ctx.lineTo(24, 20);
  ctx.lineTo(-24, 20);
  ctx.lineTo(-28, -6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Armor Plates & Sponson Ribs
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-20, 4);
  ctx.lineTo(20, 4);
  ctx.moveTo(-16, 12);
  ctx.lineTo(16, 12);
  ctx.stroke();

  // 3. Central Armored Command Pod
  ctx.fillStyle = createHullGrad(ctx, -12, -26, 12, 10, config.primaryColor);
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(12, -10);
  ctx.lineTo(10, 10);
  ctx.lineTo(-10, 10);
  ctx.lineTo(-12, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 4. Crimson Visor Slit
  ctx.fillStyle = createVisorGrad(ctx, 0, -12, 6, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.moveTo(-7, -12);
  ctx.lineTo(7, -12);
  ctx.lineTo(5, -7);
  ctx.lineTo(-5, -7);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // 5. Heavy Quad Engine Bell Nozzles
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -20, 20, 8, 7, 1);
  roundRect(ctx, -8, 20, 6, 7, 1);
  roundRect(ctx, 2, 20, 6, 7, 1);
  roundRect(ctx, 12, 20, 8, 7, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 16. JUGGERNAUT LIFTER (JG-1200 Planetary Heavy Lifter & Rover Carrier)
// =====================================================================
export function drawJuggernaut(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState
) {
  const footPadY = 38 + gearSpringOffset;

  // 1. Quad Tungsten Outrigger Landing Gear
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-35, 15);
  ctx.lineTo(-45, footPadY);
  ctx.moveTo(-20, 20);
  ctx.lineTo(-45, footPadY);
  ctx.moveTo(35, 15);
  ctx.lineTo(45, footPadY);
  ctx.moveTo(20, 20);
  ctx.lineTo(45, footPadY);
  ctx.stroke();

  // Inner Ramp Stabilizer Struts
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(-16, 25);
  ctx.lineTo(-18, footPadY);
  ctx.moveTo(16, 25);
  ctx.lineTo(18, footPadY);
  ctx.stroke();

  // Heavy Tungsten Footpads (isolated subpaths to prevent cross-connecting lines)
  ctx.fillStyle = '#10b981';
  ctx.strokeStyle = '#047857';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -49, footPadY - 4.5, 13, 4.5, 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 36, footPadY - 4.5, 13, 4.5, 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, -22, footPadY - 3.5, 8, 3.5, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 14, footPadY - 3.5, 8, 3.5, 1.5);
  ctx.fill();
  ctx.stroke();

  // 2. Colossal Heavy Chassis & Wide Sponsons
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, -48);
  ctx.lineTo(42, -26);
  ctx.lineTo(44, 25);
  ctx.lineTo(-44, 25);
  ctx.lineTo(-42, -26);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 3. Central Vehicle Hold & Hydraulic Ramp
  const rampOpenProg = ship.rampProgress !== undefined ? ship.rampProgress : 0.0;
  const rampDropY = 25 + rampOpenProg * 14;

  // Interior Vehicle Bay Cavity
  ctx.fillStyle = '#050b14';
  ctx.strokeStyle = '#34d399';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -18, -4, 36, 28, 2);
  ctx.fill();
  ctx.stroke();

  // Safety Hazard Stripes in Bay
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-16, 22);
  ctx.lineTo(-10, 16);
  ctx.moveTo(-6, 22);
  ctx.lineTo(0, 16);
  ctx.moveTo(4, 22);
  ctx.lineTo(10, 16);
  ctx.stroke();

  // Articulated Hydraulic Ramp Door
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-18, 25);
  ctx.lineTo(-18, rampDropY);
  ctx.lineTo(18, rampDropY);
  ctx.lineTo(18, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 4. Emerald Command Bridge Tower
  ctx.fillStyle = createHullGrad(ctx, -16, -46, 16, -10, config.primaryColor);
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, -48);
  ctx.lineTo(16, -30);
  ctx.lineTo(16, -8);
  ctx.lineTo(-16, -8);
  ctx.lineTo(-16, -30);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Emerald Visor
  ctx.fillStyle = createVisorGrad(ctx, 0, -32, 9, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -32, 9, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#6ee7b7';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Specular Visor Glint
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-3, -34, 3.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // 5. Heavy Quad Fusion Exhaust Nozzles
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -38, 25, 12, 9, 2);
  roundRect(ctx, -24, 25, 10, 8, 2);
  roundRect(ctx, 14, 25, 10, 8, 2);
  roundRect(ctx, 26, 25, 12, 9, 2);
  ctx.fill();
  ctx.stroke();
}

// Master dispatch function for ship hull rendering
export function renderShipHull(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  lp: ShipLocalPoints,
  time: number,
  ship: ShipState
) {
  ctx.save();
  const scale = config.renderScale || 1.0;
  ctx.scale(scale, scale);

  const gearComp = ship.gearCompression !== undefined ? ship.gearCompression : 0.0;
  const gearSpringOffset = -gearComp * 8.5;

  switch (config.id) {
    case 'apollo':
      drawApollo(ctx, config, gearSpringOffset);
      break;
    case 'titan':
      drawTitan(ctx, config, gearSpringOffset);
      break;
    case 'viper':
      drawViper(ctx, config, gearSpringOffset);
      break;
    case 'aegis':
      drawAegis(ctx, config, gearSpringOffset);
      break;
    case 'nebula':
      drawNebula(ctx, config, gearSpringOffset);
      break;
    case 'vanguard':
      drawVanguard(ctx, config, gearSpringOffset);
      break;
    case 'goliath':
      drawGoliath(ctx, config, gearSpringOffset, ship);
      break;
    case 'behemoth':
      drawBehemoth(ctx, config, gearSpringOffset, ship);
      break;
    case 'leviathan':
      drawLeviathan(ctx, config, gearSpringOffset, ship);
      break;
    case 'mammoth':
      drawMammoth(ctx, config, gearSpringOffset, ship);
      break;
    case 'wasp':
      drawWasp(ctx, config, gearSpringOffset);
      break;
    case 'kestrel':
      drawKestrel(ctx, config, gearSpringOffset);
      break;
    case 'spectre':
      drawSpectre(ctx, config, gearSpringOffset);
      break;
    case 'orion':
      drawOrion(ctx, config, gearSpringOffset);
      break;
    case 'valkyrie':
      drawValkyrie(ctx, config, gearSpringOffset);
      break;
    case 'juggernaut':
      drawJuggernaut(ctx, config, gearSpringOffset, ship);
      break;
  }

  ctx.restore();
}
