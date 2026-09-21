import { ShipModelConfig, ShipState, ShipLocalPoints, WorldMap } from '../types';

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

// Helper: Safe rounded rect drawing
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.rect(x, y, w, h);
  }
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
  gearSpringOffset: number,
  ship?: any,
  time?: number
) {
  const t = time !== undefined ? time : performance.now() / 1000;
  const isLanded = ship ? (ship.isLanded || ship.state === "landed" || (ship.rampProgress && ship.rampProgress > 0.05)) : true;
  const rampProg = ship ? (ship.rampProgress !== undefined ? ship.rampProgress : (isLanded ? 1.0 : 0.0)) : 1.0;
  const footPadY = 22 + gearSpringOffset;

  // 1. Far-side landing gear shadows
  ctx.save();
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 1.8;
  // Aft far-side footpad & strut
  ctx.fillRect(-36, footPadY - 1.2, 8, 1.8);
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-32, footPadY - 1.2);
  ctx.stroke();
  // Forward far-side footpad & strut
  ctx.fillRect(26, footPadY - 1.2, 8, 1.8);
  ctx.beginPath();
  ctx.moveTo(30, 14);
  ctx.lineTo(30, footPadY - 1.2);
  ctx.stroke();
  ctx.restore();

  // 2. Fuselage Main Armored Hull (Titanium-Aluminum Alloy)
  const hullGrad = ctx.createLinearGradient(0, -18, 0, 16);
  hullGrad.addColorStop(0, "#ffffff");
  hullGrad.addColorStop(0.18, "#f1f5f9");
  hullGrad.addColorStop(0.55, "#cbd5e1");
  hullGrad.addColorStop(0.85, "#94a3b8");
  hullGrad.addColorStop(1, "#64748b");

  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(64, -2);
  ctx.lineTo(58, -6);
  ctx.lineTo(46, -11);
  ctx.lineTo(38, -11);
  ctx.lineTo(34, -14);
  ctx.lineTo(14, -14);
  ctx.lineTo(10, -11);
  ctx.lineTo(-20, -11);
  ctx.lineTo(-24, -13);
  ctx.lineTo(-44, -13);
  ctx.lineTo(-58, -10);
  ctx.lineTo(-66, -7);
  ctx.lineTo(-66, 3);
  ctx.lineTo(-56, 11);
  ctx.lineTo(-40, 11);
  ctx.lineTo(-20, 11);
  ctx.lineTo(16, 11);
  ctx.lineTo(40, 11);
  ctx.lineTo(54, 7);
  ctx.lineTo(64, 1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 3. Aft Propulsion & Engine Cowling (TB-01 Module)
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-65, -5);
  ctx.lineTo(-50, -5);
  ctx.lineTo(-46, 5);
  ctx.lineTo(-56, 9);
  ctx.lineTo(-65, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lower exhaust louver vents
  ctx.fillStyle = "#0f172a";
  for (let ly = 1; ly <= 7; ly += 2.2) {
    ctx.fillRect(-62, ly, 7, 1.2);
  }

  // TB-01 Stencil
  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 7px monospace";
  ctx.fillText("TB-01", -63, -0.5);

  // Tactical hazard identifier block
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(-49, -4.5, 4, 3);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(-48, -4.5, 1, 3);
  ctx.fillRect(-46.5, -4.5, 1, 3);

  // Stenciled "TITAN BEHEMOTH" text along fuselage
  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 3.2px monospace";
  ctx.fillText("TITAN BEHEMOTH", -43, -2.5);
  ctx.restore();

  // 4. Upper Dorsal Systems & Goliath-14 Reactor Core
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-38, -11);
  ctx.lineTo(-36, -15);
  ctx.lineTo(-24, -15);
  ctx.lineTo(-22, -11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(-35, -14.5, 9, 3);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 0.5;
  for (let ix = -34; ix <= -27; ix += 2) {
    ctx.beginPath();
    ctx.moveTo(ix, -14.5);
    ctx.lineTo(ix, -11.5);
    ctx.stroke();
  }

  // Crew Quarters Louvers (-20 to -14)
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(-20, -9.5, 6, 4.5);
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.5;
  for (let qy = -8.5; qy <= -5.5; qy += 1.2) {
    ctx.beginPath();
    ctx.moveTo(-19.5, qy);
    ctx.lineTo(-14.5, qy);
    ctx.stroke();
  }

  // Goliath-14 Reactor Core
  const reactorGrad = ctx.createLinearGradient(0, -17, 0, -12);
  reactorGrad.addColorStop(0, "#64748b");
  reactorGrad.addColorStop(0.5, "#475569");
  reactorGrad.addColorStop(1, "#1e293b");
  ctx.fillStyle = reactorGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 15, -16.5, 18, 4.5, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 0.5;
  for (let fx = 17; fx <= 31; fx += 1.8) {
    ctx.beginPath();
    ctx.moveTo(fx, -16.5);
    ctx.lineTo(fx, -12);
    ctx.stroke();
  }
  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.arc(24, -16.5, 1.5, Math.PI, 0);
  ctx.fill();

  // 5. Forward Avionics Bay & Wing Root Intake
  const avionicsGrad = ctx.createLinearGradient(24, -10, 36, -3);
  avionicsGrad.addColorStop(0, "#38bdf8");
  avionicsGrad.addColorStop(0.5, "#0284c7");
  avionicsGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = avionicsGrad;
  ctx.strokeStyle = "#0284c7";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(24, -9.5);
  ctx.lineTo(36, -9.5);
  ctx.lineTo(37, -3.5);
  ctx.lineTo(23, -3.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(30, -9.5);
  ctx.lineTo(30, -3.5);
  ctx.moveTo(23, -6.5);
  ctx.lineTo(37, -6.5);
  ctx.stroke();
  ctx.fillStyle = "#34d399";
  ctx.fillRect(25, -5.8, 3, 1.5);
  ctx.fillStyle = "#60a5fa";
  ctx.fillRect(32, -5.8, 3, 1.5);

  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 36.5, -0.5, 4.5, 7.5, 1.0);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#020617";
  ctx.fillRect(37.5, 0.5, 2.5, 5.5);

  // 6. Command Cockpit (Crew of 6)
  ctx.fillStyle = "#cbd5e1";
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(44, -10.5);
  ctx.lineTo(56, -6);
  ctx.lineTo(63, -1.5);
  ctx.lineTo(63, 2.5);
  ctx.lineTo(54, 6.5);
  ctx.lineTo(44, 6.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const visorGrad = ctx.createLinearGradient(48, -8, 62, 0);
  visorGrad.addColorStop(0, "#fef08a");
  visorGrad.addColorStop(0.3, "#f59e0b");
  visorGrad.addColorStop(0.7, "#d97706");
  visorGrad.addColorStop(1, "#78350f");
  ctx.fillStyle = visorGrad;
  ctx.strokeStyle = "#1c1917";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(48, -8);
  ctx.lineTo(57, -4.5);
  ctx.lineTo(61.5, -0.5);
  ctx.lineTo(55, 0.5);
  ctx.lineTo(47, -3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#1c1917";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(53, -6);
  ctx.lineTo(51, -1.5);
  ctx.moveTo(58, -4);
  ctx.lineTo(56, 0.2);
  ctx.stroke();
  ctx.fillStyle = "#18181b";
  ctx.beginPath();
  ctx.arc(52, -3.5, 1.2, 0, Math.PI * 2);
  ctx.arc(57, -1.8, 1.0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(63, -1.5);
  ctx.lineTo(66.5, -1.5);
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.arc(48, 9.5, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(49.2, 9.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // 7. Sponson Wings & Stabilizers
  const sponsonGrad = ctx.createLinearGradient(0, -1, 0, 8);
  sponsonGrad.addColorStop(0, "#ffffff");
  sponsonGrad.addColorStop(0.25, "#f1f5f9");
  sponsonGrad.addColorStop(0.65, "#cbd5e1");
  sponsonGrad.addColorStop(1, "#94a3b8");
  ctx.fillStyle = sponsonGrad;
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-47, -1);
  ctx.lineTo(-24, -1);
  ctx.lineTo(-28, 8);
  ctx.lineTo(-44, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f1f5f9";
  ctx.beginPath();
  ctx.arc(-36, 3.5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0284c7";
  ctx.beginPath();
  ctx.arc(-36, 3.5, 1.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(-36, 3.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = sponsonGrad;
  ctx.beginPath();
  ctx.moveTo(18, -1);
  ctx.lineTo(37, -1);
  ctx.lineTo(34, 8);
  ctx.lineTo(19, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 8. Underslung Hydrogen Fuel Tanks
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, -18, 11, 34, 2.8, 1.0);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-10, 11);
  ctx.lineTo(-10, 13.8);
  ctx.moveTo(0, 11);
  ctx.lineTo(0, 13.8);
  ctx.moveTo(8, 11);
  ctx.lineTo(8, 13.8);
  ctx.stroke();

  // 9. Dual VTOL Lift Pods (Aft & Forward, with Dual Nozzles each)
  const nozzleGrad = ctx.createLinearGradient(0, 14, 0, 19);
  nozzleGrad.addColorStop(0, "#64748b");
  nozzleGrad.addColorStop(0.5, "#334155");
  nozzleGrad.addColorStop(1, "#0f172a");

  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -39, 9, 14, 6, 1.2);
  ctx.fill();
  ctx.stroke();

  for (const nx of [-36, -28]) {
    ctx.fillStyle = nozzleGrad;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(nx - 2.5, 15);
    ctx.lineTo(nx + 2.5, 15);
    ctx.lineTo(nx + 3.8, 19);
    ctx.lineTo(nx - 3.8, 19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(nx, 19, 3.2, 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 23, 9, 14, 6, 1.2);
  ctx.fill();
  ctx.stroke();

  for (const nx of [26, 34]) {
    ctx.fillStyle = nozzleGrad;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(nx - 2.5, 15);
    ctx.lineTo(nx + 2.5, 15);
    ctx.lineTo(nx + 3.8, 19);
    ctx.lineTo(nx - 3.8, 19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(nx, 19, 3.2, 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 10. Primary Heavy Industrial Landing Gear
  for (const gx of [-32, 30]) {
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(gx, 15);
    ctx.lineTo(gx, 15 + (footPadY - 15) * 0.5);
    ctx.stroke();

    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(gx, 15 + (footPadY - 15) * 0.45);
    ctx.lineTo(gx, footPadY - 1.2);
    ctx.stroke();

    ctx.fillStyle = "#475569";
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    roundRect(ctx, gx - 4.5, footPadY - 1.5, 9, 2.2, 0.8);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 0.5;
    for (let px = gx - 3; px <= gx + 3; px += 2) {
      ctx.beginPath();
      ctx.moveTo(px, footPadY - 1.5);
      ctx.lineTo(px, footPadY + 0.5);
      ctx.stroke();
    }
  }

  // 11. CENTRAL HEAVY VEHICLE & CARGO HANGAR BAY
  const bayBackGrad = ctx.createLinearGradient(0, -6, 0, 11);
  bayBackGrad.addColorStop(0, "#1e293b");
  bayBackGrad.addColorStop(0.5, "#0f172a");
  bayBackGrad.addColorStop(1, "#020617");
  ctx.fillStyle = bayBackGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.fillRect(-20, -6, 36, 17);
  ctx.strokeRect(-20, -6, 36, 17);

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  for (let vx = -14; vx <= 14; vx += 6) {
    ctx.beginPath();
    ctx.moveTo(vx, -6);
    ctx.lineTo(vx, 11);
    ctx.stroke();
  }

  // Hazard diagonal stripes along bay top portal frame
  ctx.save();
  ctx.beginPath();
  ctx.rect(-20, -6, 36, 1.8);
  ctx.clip();
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(-20, -6, 36, 1.8);
  ctx.fillStyle = "#f59e0b";
  for (let hx = -22; hx <= 18; hx += 3.5) {
    ctx.beginPath();
    ctx.moveTo(hx, -6);
    ctx.lineTo(hx + 2, -6);
    ctx.lineTo(hx + 0.5, -4.2);
    ctx.lineTo(hx - 1.5, -4.2);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // Stored cargo containers & crates
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.6;
  ctx.fillRect(-5, 2, 6, 8.8);
  ctx.strokeRect(-5, 2, 6, 8.8);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-5, 2);
  ctx.lineTo(1, 10.8);
  ctx.moveTo(-5, 10.8);
  ctx.lineTo(1, 2);
  ctx.stroke();

  ctx.fillStyle = "#78350f";
  ctx.strokeStyle = "#451a03";
  ctx.lineWidth = 0.6;
  ctx.fillRect(4, 3, 5, 7.8);
  ctx.strokeRect(4, 3, 5, 7.8);
  ctx.fillStyle = "#475569";
  ctx.fillRect(9.5, 4.5, 5, 6.3);
  ctx.strokeRect(9.5, 4.5, 5, 6.3);

  // Overhead Cargo Hoist System (Crane gantry rail + trolley + hook)
  ctx.fillStyle = "#eab308";
  ctx.fillRect(-19, -5.5, 34, 1.2);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(-12, -4.5, 4, 1.6);
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-10, -3);
  ctx.lineTo(-10, 0.5);
  ctx.stroke();
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-10, 1.5, 1.0, -Math.PI * 0.5, Math.PI * 0.8);
  ctx.stroke();

  // Vehicle 1: 6-Wheeled Armored Recon Vehicle / APC
  ctx.save();
  ctx.fillStyle = "#414d3b";
  ctx.strokeStyle = "#181f16";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-18, 9);
  ctx.lineTo(-18, 6.5);
  ctx.lineTo(-16, 5);
  ctx.lineTo(-8, 5);
  ctx.lineTo(-6.5, 7);
  ctx.lineTo(-6.5, 9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0284c7";
  ctx.fillRect(-16, 5.5, 2.5, 0.8);
  ctx.fillStyle = "#1e241c";
  ctx.fillRect(-12, 4.2, 2.8, 1.0);
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-10.5, 4.2);
  ctx.lineTo(-9, 3.2);
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  for (const wx of [-16.5, -12.5, -8.5]) {
    ctx.beginPath();
    ctx.arc(wx, 9.8, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.arc(wx, 9.8, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
  }
  ctx.restore();

  // Vehicle 2: Tracked Planetary Battle Tank
  ctx.save();
  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  roundRect(ctx, -3.5, 8.8, 16.5, 2.2, 0.8);
  ctx.fill();

  ctx.fillStyle = "#475569";
  for (let tx = -2; tx <= 11.5; tx += 2.8) {
    ctx.beginPath();
    ctx.arc(tx, 9.9, 0.8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#374232";
  ctx.strokeStyle = "#181f15";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-3, 8.8);
  ctx.lineTo(-2, 7);
  ctx.lineTo(12, 7);
  ctx.lineTo(12.8, 8.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#44513e";
  ctx.beginPath();
  roundRect(ctx, 0, 5.5, 7.5, 1.8, 0.6);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#1e241c";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(7.5, 6.4);
  ctx.lineTo(14.5, 6.4);
  ctx.stroke();

  // Vehicle tie-down restraints
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-2.5, 10.8);
  ctx.lineTo(-0.5, 7.5);
  ctx.moveTo(11, 10.8);
  ctx.lineTo(9.5, 7.5);
  ctx.stroke();
  ctx.restore();

  // 12. INTERNAL BAY LIGHTS (TURNING / ROTATING WHEN LANDED)
  ctx.fillStyle = "rgba(254, 240, 138, 0.7)";
  ctx.fillRect(-17, -5.2, 9, 0.8);
  ctx.fillRect(-5, -5.2, 9, 0.8);
  ctx.fillRect(7, -5.2, 7, 0.8);

  if (isLanded || rampProg > 0.05) {
    const bayLightWash = ctx.createLinearGradient(0, -5, 0, 11);
    bayLightWash.addColorStop(0, "rgba(254, 240, 138, 0.28)");
    bayLightWash.addColorStop(0.6, "rgba(254, 240, 138, 0.12)");
    bayLightWash.addColorStop(1, "rgba(254, 240, 138, 0.0)");
    ctx.fillStyle = bayLightWash;
    ctx.fillRect(-20, -5, 36, 16);

    const beacons = [
      { x: -17, y: -4.5, speed: 4.5 },
      { x: 13, y: -4.5, speed: -4.5 },
    ];

    for (const b of beacons) {
      const rot = t * b.speed;
      ctx.save();
      ctx.translate(b.x, b.y);

      ctx.save();
      ctx.rotate(rot);
      const beamGrad = ctx.createRadialGradient(0, 0, 0.5, 0, 0, 14);
      beamGrad.addColorStop(0, "rgba(251, 191, 36, 0.85)");
      beamGrad.addColorStop(0.3, "rgba(245, 158, 11, 0.45)");
      beamGrad.addColorStop(0.7, "rgba(217, 119, 6, 0.18)");
      beamGrad.addColorStop(1, "rgba(180, 83, 9, 0)");

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 14, -0.45, 0.45);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 14, Math.PI - 0.45, Math.PI + 0.45);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-1.5, -0.2, 3, 1.4);
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(0, 0, 1.2, Math.PI, 0);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(0, -0.3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else {
    for (const bx of [-17, 13]) {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(bx - 1.5, -4.7, 3, 1.4);
      ctx.fillStyle = "#b45309";
      ctx.beginPath();
      ctx.arc(bx, -4.5, 1.0, Math.PI, 0);
      ctx.fill();
    }
  }

  // 13. DEPLOYMENT RAMP (OPENING DOWN FACING THE PLAYER)
  if (rampProg > 0.02) {
    const rampDropH = 9.5 * rampProg;
    const rampBottomY = 11 + rampDropH;
    const rampLeftBottomX = -20 - 3.0 * rampProg;
    const rampRightBottomX = 16 + 2.5 * rampProg;

    const rampFaceGrad = ctx.createLinearGradient(0, 11, 0, rampBottomY);
    rampFaceGrad.addColorStop(0, "#475569");
    rampFaceGrad.addColorStop(0.4, "#334155");
    rampFaceGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = rampFaceGrad;
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(-20, 11);
    ctx.lineTo(16, 11);
    ctx.lineTo(rampRightBottomX, rampBottomY);
    ctx.lineTo(rampLeftBottomX, rampBottomY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 0.8;
    for (let f = 0.18; f <= 0.85; f += 0.16) {
      const topX = -20 + 36 * f;
      const botX = rampLeftBottomX + (rampRightBottomX - rampLeftBottomX) * f;
      ctx.beginPath();
      ctx.moveTo(topX, 11);
      ctx.lineTo(botX, rampBottomY);
      ctx.stroke();
    }

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 0.7;
    for (let cy = 13; cy <= rampBottomY - 2; cy += 2.5) {
      const prog = (cy - 11) / rampDropH;
      const midX = -2 + prog * 0.5;
      ctx.beginPath();
      ctx.moveTo(midX - 3.5, cy + 0.8);
      ctx.lineTo(midX, cy - 0.5);
      ctx.lineTo(midX + 3.5, cy + 0.8);
      ctx.stroke();
    }

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(rampLeftBottomX, rampBottomY - 1.2);
    ctx.lineTo(rampRightBottomX, rampBottomY - 1.2);
    ctx.lineTo(rampRightBottomX, rampBottomY);
    ctx.lineTo(rampLeftBottomX, rampBottomY);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(rampLeftBottomX - 2, rampBottomY - 1.5, 45, 2);
    ctx.fillStyle = "#f59e0b";
    for (let zx = rampLeftBottomX - 4; zx <= rampRightBottomX + 4; zx += 3.2) {
      ctx.beginPath();
      ctx.moveTo(zx, rampBottomY - 1.5);
      ctx.lineTo(zx + 1.8, rampBottomY - 1.5);
      ctx.lineTo(zx + 0.6, rampBottomY);
      ctx.lineTo(zx - 1.2, rampBottomY);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(-20, 11);
    ctx.lineTo(rampLeftBottomX + 1, rampBottomY - 1);
    ctx.moveTo(16, 11);
    ctx.lineTo(rampRightBottomX - 1, rampBottomY - 1);
    ctx.stroke();
  } else {
    const doorGrad = ctx.createLinearGradient(0, -6, 0, 11);
    doorGrad.addColorStop(0, "#4a5445");
    doorGrad.addColorStop(0.5, "#3b4337");
    doorGrad.addColorStop(1, "#272e24");
    ctx.fillStyle = doorGrad;
    ctx.strokeStyle = "#181e17";
    ctx.lineWidth = 1.0;
    ctx.fillRect(-20, -6, 36, 17);
    ctx.strokeRect(-20, -6, 36, 17);

    ctx.strokeStyle = "#161c15";
    ctx.lineWidth = 0.8;
    for (let dy = -2; dy <= 8; dy += 3.5) {
      ctx.beginPath();
      ctx.moveTo(-20, dy);
      ctx.lineTo(16, dy);
      ctx.stroke();
    }
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(-19.5, -4, 1.5, 2);
    ctx.fillRect(-19.5, 7, 1.5, 2);
    ctx.fillRect(14, -4, 1.5, 2);
    ctx.fillRect(14, 7, 1.5, 2);
  }

  // 14. Navigation & Status Beacon Strobes
  const isStrobeOn = Math.sin(t * 7) > 0;
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(-63, -8, 1.2, 0, Math.PI * 2);
  ctx.fill();
  if (isStrobeOn) {
    ctx.fillStyle = "rgba(239, 68, 68, 0.45)";
    ctx.beginPath();
    ctx.arc(-63, -8, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(61, 4.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  if (isStrobeOn) {
    ctx.fillStyle = "rgba(34, 197, 94, 0.45)";
    ctx.beginPath();
    ctx.arc(61, 4.5, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// =====================================================================
// 3. VIPER DART (Stealth High-Agility Interceptor)
// =====================================================================
// =====================================================================
// 3. VIPER DART (Stealth High-Agility Interceptor)
// =====================================================================
export function drawViper(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 29.5 + gearSpringOffset;

  // =================================================================
  // 1. LANDING GEAR — Dual-Strut Legs & Isolated Footpads
  // =================================================================
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#475467';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-14, 10);
  ctx.lineTo(-22, footPadY);
  ctx.moveTo(14, 10);
  ctx.lineTo(22, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-7, 15);
  ctx.lineTo(-22, footPadY);
  ctx.moveTo(7, 15);
  ctx.lineTo(22, footPadY);
  ctx.stroke();

  // Port footpad (isolated subpath — never connect to starboard)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-22, footPadY, 4.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Starboard footpad (isolated subpath)
  ctx.beginPath();
  ctx.ellipse(22, footPadY, 4.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 2. WINGS — Light Grey Deltas with Curved Cutouts over Cannons
  // =================================================================
  const wingGrad = ctx.createLinearGradient(0, -3, 0, 17);
  wingGrad.addColorStop(0, '#f8fafc');
  wingGrad.addColorStop(0.4, '#e2e8f0');
  wingGrad.addColorStop(0.85, '#cbd5e1');
  wingGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = wingGrad;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.75;

  // Port wing (cutout notch for the cannon mount)
  ctx.beginPath();
  ctx.moveTo(-8.5, 16.5);
  ctx.lineTo(-32, 16.5);
  ctx.lineTo(-32, -3);
  ctx.lineTo(-16, -3);
  ctx.bezierCurveTo(-16, 2, -14, 7, -10.5, 7);
  ctx.lineTo(-8.5, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard wing (cutout notch)
  ctx.beginPath();
  ctx.moveTo(8.5, 16.5);
  ctx.lineTo(32, 16.5);
  ctx.lineTo(32, -3);
  ctx.lineTo(16, -3);
  ctx.bezierCurveTo(16, 2, 14, 7, 10.5, 7);
  ctx.lineTo(8.5, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 3. CENTER FUSELAGE & NEEDLE NOSE — Light Grey Hull
  // =================================================================
  const hullGrad = ctx.createLinearGradient(0, -38, 0, 20);
  hullGrad.addColorStop(0, '#f8fafc');
  hullGrad.addColorStop(0.4, '#e2e8f0');
  hullGrad.addColorStop(0.85, '#cbd5e1');
  hullGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.75;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(3.8, -34);
  ctx.lineTo(4.2, -8);
  ctx.lineTo(6.8, -2);
  ctx.lineTo(6.8, 17);
  ctx.lineTo(0, 20);
  ctx.lineTo(-6.8, 17);
  ctx.lineTo(-6.8, -2);
  ctx.lineTo(-4.2, -8);
  ctx.lineTo(-3.8, -34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Nose tip point (dark gunmetal cap)
  ctx.fillStyle = '#475467';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(3.8, -34);
  ctx.lineTo(-3.8, -34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 4. ENGINE NACELLES & NOZZLES (L/R nozzles align to thruster anchors)
  // =================================================================
  const nacGrad = ctx.createLinearGradient(0, 1, 0, 18);
  nacGrad.addColorStop(0, '#475467');
  nacGrad.addColorStop(0.5, '#334155');
  nacGrad.addColorStop(1, '#1e293b');

  ctx.fillStyle = nacGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-18.5, 1);
  ctx.lineTo(-8.5, 1);
  ctx.lineTo(-8, 18);
  ctx.lineTo(-18.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(8.5, 1);
  ctx.lineTo(18.5, 1);
  ctx.lineTo(18.5, 18);
  ctx.lineTo(8, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Nozzle bells (dark exhaust openings)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  // Port engine nozzle (exit plane y=24 → thruster anchor plane)
  ctx.beginPath();
  ctx.moveTo(-18, 18);
  ctx.lineTo(-9, 18);
  ctx.lineTo(-10, 24);
  ctx.lineTo(-17, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Center tail nozzle (static detail — no dynamic flame)
  ctx.beginPath();
  ctx.moveTo(-4.5, 19);
  ctx.lineTo(4.5, 19);
  ctx.lineTo(3.5, 25);
  ctx.lineTo(-3.5, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Starboard engine nozzle
  ctx.beginPath();
  ctx.moveTo(9, 18);
  ctx.lineTo(18, 18);
  ctx.lineTo(17, 24);
  ctx.lineTo(10, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 5. FACETED BSG CANOPY — Dark Navy Glass Panes
  // =================================================================
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-4.5, -8);
  ctx.lineTo(4.5, -8);
  ctx.lineTo(5.5, 3);
  ctx.lineTo(0, 5.5);
  ctx.lineTo(-5.5, 3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const canopyGrad = ctx.createLinearGradient(0, -8, 0, 5.5);
  canopyGrad.addColorStop(0, '#1e1b4b');
  canopyGrad.addColorStop(0.5, '#0f172a');
  canopyGrad.addColorStop(1, '#020617');
  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.4;
  ctx.globalAlpha = 0.9;

  // Front upper facet
  ctx.beginPath();
  ctx.moveTo(-3.2, -7.2);
  ctx.lineTo(3.2, -7.2);
  ctx.lineTo(2.2, -3);
  ctx.lineTo(-2.2, -3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Left side facet
  ctx.beginPath();
  ctx.moveTo(-3.2, -7.2);
  ctx.lineTo(-2.2, -3);
  ctx.lineTo(-4.5, 2);
  ctx.lineTo(-4.8, -2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Right side facet
  ctx.beginPath();
  ctx.moveTo(3.2, -7.2);
  ctx.lineTo(2.2, -3);
  ctx.lineTo(4.5, 2);
  ctx.lineTo(4.8, -2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Center lower left facet
  ctx.beginPath();
  ctx.moveTo(-2.2, -3);
  ctx.lineTo(0, -3);
  ctx.lineTo(0, 4);
  ctx.lineTo(-4.5, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Center lower right facet
  ctx.beginPath();
  ctx.moveTo(2.2, -3);
  ctx.lineTo(0, -3);
  ctx.lineTo(0, 4);
  ctx.lineTo(4.5, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // =================================================================
  // 6. LIVERY & DETAILS (source paint order — seams OVER stripes)
  // =================================================================
  const redGrad = ctx.createLinearGradient(0, -33.5, 0, 16);
  redGrad.addColorStop(0, '#ef4444');
  redGrad.addColorStop(1, '#b91c1c');

  // Red liver stripes (separated above/below the canopy glass)
  ctx.fillStyle = redGrad;
  ctx.beginPath();
  ctx.moveTo(-1.8, -33.5);
  ctx.lineTo(1.8, -33.5);
  ctx.lineTo(1.8, -8);
  ctx.lineTo(-1.8, -8);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-1.8, 5.5);
  ctx.lineTo(1.8, 5.5);
  ctx.lineTo(2.2, 16);
  ctx.lineTo(-2.2, 16);
  ctx.closePath();
  ctx.fill();

  // Wing red markings (contoured around the wing cutouts)
  ctx.beginPath();
  ctx.moveTo(-6.5, -3);
  ctx.lineTo(-31.5, -3);
  ctx.lineTo(-31.5, 0);
  ctx.lineTo(-24, 0);
  ctx.bezierCurveTo(-17, 0, -14, 3, -12, 6);
  ctx.lineTo(-8.5, 6);
  ctx.lineTo(-8.5, 8.5);
  ctx.lineTo(-11.5, 8.5);
  ctx.bezierCurveTo(-14, 6, -17, 2.5, -24, 2.5);
  ctx.lineTo(-28.5, 2.5);
  ctx.lineTo(-28.5, 16.5);
  ctx.lineTo(-31.5, 16.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-31.5, 14);
  ctx.lineTo(-8.5, 14);
  ctx.lineTo(-8.5, 16.5);
  ctx.lineTo(-31.5, 16.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(6.5, -3);
  ctx.lineTo(31.5, -3);
  ctx.lineTo(31.5, 0);
  ctx.lineTo(24, 0);
  ctx.bezierCurveTo(17, 0, 14, 3, 12, 6);
  ctx.lineTo(8.5, 6);
  ctx.lineTo(8.5, 8.5);
  ctx.lineTo(11.5, 8.5);
  ctx.bezierCurveTo(14, 6, 17, 2.5, 24, 2.5);
  ctx.lineTo(28.5, 2.5);
  ctx.lineTo(28.5, 16.5);
  ctx.lineTo(31.5, 16.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(31.5, 14);
  ctx.lineTo(8.5, 14);
  ctx.lineTo(8.5, 16.5);
  ctx.lineTo(31.5, 16.5);
  ctx.closePath();
  ctx.fill();

  // Four red status squares per engine block
  ctx.fillStyle = '#ef4444';
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 0.3;
  for (let i = 0; i < 4; i++) {
    const y = 3 + i * 3;
    ctx.beginPath();
    ctx.rect(-16.2, y, 2, 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(14.2, y, 2, 2);
    ctx.fill();
    ctx.stroke();
  }

  // Wing-mounted laser cannons (inside the wing cutout gaps)
  const goldGrad = ctx.createLinearGradient(0, -23, 0, -13);
  goldGrad.addColorStop(0, '#eab308');
  goldGrad.addColorStop(0.5, '#ca8a04');
  goldGrad.addColorStop(1, '#854d0e');

  ctx.fillStyle = nacGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.4;
  // Port cannon base
  ctx.beginPath();
  roundRect(ctx, -11.2, -8, 2.4, 14, 0.4);
  ctx.fill();
  ctx.stroke();
  // Starboard cannon base
  ctx.beginPath();
  roundRect(ctx, 8.8, -8, 2.4, 14, 0.4);
  ctx.fill();
  ctx.stroke();
  // Port cannon collar
  ctx.beginPath();
  ctx.rect(-10.7, -13, 1.4, 5);
  ctx.fill();
  // Starboard cannon collar
  ctx.beginPath();
  ctx.rect(9.3, -13, 1.4, 5);
  ctx.fill();

  // Gold barrels
  ctx.fillStyle = goldGrad;
  ctx.strokeStyle = '#744210';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.rect(-10.4, -23, 0.8, 10);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(9.6, -23, 0.8, 10);
  ctx.fill();
  ctx.stroke();

  // Barrel ribs
  ctx.strokeStyle = '#451a03';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-10.4, -20);
  ctx.lineTo(-9.6, -20);
  ctx.moveTo(-10.4, -18);
  ctx.lineTo(-9.6, -18);
  ctx.moveTo(-10.4, -16);
  ctx.lineTo(-9.6, -16);
  ctx.moveTo(9.6, -20);
  ctx.lineTo(10.4, -20);
  ctx.moveTo(9.6, -18);
  ctx.lineTo(10.4, -18);
  ctx.moveTo(9.6, -16);
  ctx.lineTo(10.4, -16);
  ctx.stroke();

  // Engine intake grills
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    ctx.moveTo(-13.5, 3 + i * 2.5);
    ctx.lineTo(-9, 3 + i * 2.5);
    ctx.moveTo(9, 3 + i * 2.5);
    ctx.lineTo(13.5, 3 + i * 2.5);
  }
  ctx.stroke();

  // Panel seams & technical markings (kept OVER stripes per source order)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-3.7, -28);
  ctx.lineTo(3.7, -28);
  ctx.moveTo(-3.9, -20);
  ctx.lineTo(3.9, -20);
  ctx.moveTo(-4.1, -14);
  ctx.lineTo(4.1, -14);
  ctx.stroke();

  // Wing surface circular access ports
  ctx.strokeStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(-23, 7, 1.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(23, 7, 1.2, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(-23, 7, 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(23, 7, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // "000" identification markings (three bars per wing)
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.rect(-30.5, 14.5, 0.6, 1.2);
  ctx.rect(-29.6, 14.5, 0.6, 1.2);
  ctx.rect(-28.7, 14.5, 0.6, 1.2);
  ctx.rect(27.3, 14.5, 0.6, 1.2);
  ctx.rect(28.2, 14.5, 0.6, 1.2);
  ctx.rect(29.1, 14.5, 0.6, 1.2);
  ctx.fill();

  // Navigation lights
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-31.5, -2.5, 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(31.5, -2.5, 0.7, 0, Math.PI * 2);
  ctx.fill();
}

export function drawAegis(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  // Low-slung gear: footpads are close to ground (y = 20.0 in local SVG space)
  const footPadY = 20.0 + gearSpringOffset;

  // =========================================================================
  // 1. FAR-SIDE / BACKGROUND STRUCTURES
  // =========================================================================

  // Far-side canted vertical fin (shadowed)
  ctx.fillStyle = "#1e242d";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(21, -14);
  ctx.lineTo(26, -30);
  ctx.lineTo(31, -30);
  ctx.lineTo(33, -13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(26, -30);
  ctx.lineTo(31, -30);
  ctx.stroke();

  // Far-side VTOL nacelle pylon and bell (shadowed)
  ctx.fillStyle = "#12161b";
  ctx.strokeStyle = "#080b0e";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-16, 7);
  ctx.lineTo(-12, 7);
  ctx.lineTo(-10, 13);
  ctx.lineTo(-16, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#181e25";
  ctx.beginPath();
  ctx.moveTo(-15, 13);
  ctx.lineTo(-11, 13);
  ctx.lineTo(-9.5, 17);
  ctx.lineTo(-16.5, 17);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#080b0e";
  ctx.beginPath();
  ctx.ellipse(-13, 17, 3.5, 1.0, 0, 0, Math.PI * 2);
  ctx.fill();

  // Far-side aft VTOL nacelle
  ctx.fillStyle = "#12161b";
  ctx.strokeStyle = "#080b0e";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(14, 7);
  ctx.lineTo(18, 7);
  ctx.lineTo(20, 13);
  ctx.lineTo(14, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#181e25";
  ctx.beginPath();
  ctx.moveTo(15, 13);
  ctx.lineTo(19, 13);
  ctx.lineTo(20.5, 17);
  ctx.lineTo(13.5, 17);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#080b0e";
  ctx.beginPath();
  ctx.ellipse(17, 17, 3.5, 1.0, 0, 0, Math.PI * 2);
  ctx.fill();

  // Far-side low landing leg struts and footpads (connected to spring)
  ctx.strokeStyle = "#1f2937";
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-24, 11);
  ctx.lineTo(-25.5, footPadY - 1.5);
  ctx.stroke();

  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.moveTo(-28, footPadY - 1.5);
  ctx.lineTo(-22, footPadY - 1.5);
  ctx.lineTo(-23, footPadY);
  ctx.lineTo(-29, footPadY);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(21, 11);
  ctx.lineTo(20.5, footPadY - 1.5);
  ctx.stroke();

  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.moveTo(16.5, footPadY - 1.5);
  ctx.lineTo(22.5, footPadY - 1.5);
  ctx.lineTo(21.5, footPadY);
  ctx.lineTo(15.5, footPadY);
  ctx.closePath();
  ctx.fill();

  // =========================================================================
  // 2. MAIN HULL & FUSELAGE (Side Profile)
  // =========================================================================

  // Main Aft & Mid Fuselage Shell
  const hullGrad = ctx.createLinearGradient(0, -14, 0, 14);
  hullGrad.addColorStop(0, "#474d57");
  hullGrad.addColorStop(0.35, "#2d323b");
  hullGrad.addColorStop(0.7, "#1f2329");
  hullGrad.addColorStop(1, "#14171c");
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-22, -14);
  ctx.lineTo(12, -14);
  ctx.lineTo(20, -11);
  ctx.lineTo(34, -9);
  ctx.lineTo(36, -3);
  ctx.lineTo(36, 5);
  ctx.lineTo(32, 10);
  ctx.lineTo(18, 13);
  ctx.lineTo(-4, 14);
  ctx.lineTo(-16, 14);
  ctx.lineTo(-22, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Aft Tail Boom Extension & Rear Engine Housing
  ctx.fillStyle = "#1e232a";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(28, -9);
  ctx.lineTo(36, -9);
  ctx.lineTo(37, -6);
  ctx.lineTo(37, 3);
  ctx.lineTo(35, 7);
  ctx.lineTo(28, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 36.5, -5.5, 2, 9, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(37, -2.5);
  ctx.lineTo(38.5, -2.5);
  ctx.moveTo(37, 0.5);
  ctx.lineTo(38.5, 0.5);
  ctx.stroke();

  // Top Cylindrical Power Spine / Reactor Spine
  const spineGrad = ctx.createLinearGradient(0, -17.5, 0, -12);
  spineGrad.addColorStop(0, "#64748b");
  spineGrad.addColorStop(0.2, "#94a3b8");
  spineGrad.addColorStop(0.45, "#475569");
  spineGrad.addColorStop(0.8, "#1e293b");
  spineGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = spineGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.rect(-20, -17.5, 34, 5.5);
  ctx.fill();
  ctx.stroke();

  // Spine reactor cooling fins / ribs
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  for (let rx = -16; rx <= 12; rx += 4) {
    ctx.moveTo(rx, -17.5);
    ctx.lineTo(rx, -12);
  }
  ctx.stroke();

  // Spine specular highlight
  ctx.save();
  ctx.globalAlpha = 0.8;
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-19, -16);
  ctx.lineTo(13, -16);
  ctx.stroke();
  ctx.restore();

  // Forward Dorsal Turret / Comms Blister
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-17, -17.5);
  ctx.bezierCurveTo(-17, -20.5, -11, -20.5, -11, -17.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.arc(-14, -18.2, 1.1, 0, Math.PI * 2);
  ctx.fill();

  // Near-Side Canted Vertical Tail Fin
  const finGrad = ctx.createLinearGradient(23, -31, 35, -10);
  finGrad.addColorStop(0, "#475569");
  finGrad.addColorStop(0.4, "#334155");
  finGrad.addColorStop(0.8, "#1e293b");
  finGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = finGrad;
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(23, -11);
  ctx.lineTo(27.5, -31);
  ctx.lineTo(33.5, -31);
  ctx.lineTo(35, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tail fin trailing edge trim
  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(32.5, -30.5);
  ctx.lineTo(33.3, -30.5);
  ctx.lineTo(34.7, -10);
  ctx.lineTo(33.7, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Fin hazard chevron stripes
  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.moveTo(27.8, -30.5);
  ctx.lineTo(32.8, -30.5);
  ctx.lineTo(32.4, -28.5);
  ctx.lineTo(28.2, -28.5);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(28.4, -27.2);
  ctx.lineTo(33.1, -27.2);
  ctx.lineTo(32.8, -25.5);
  ctx.lineTo(28.8, -25.5);
  ctx.closePath();
  ctx.fill();

  // Quantum Origins Gold Crosshair Circle Emblem
  ctx.strokeStyle = "#eab308";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.arc(30.5, -19, 2.8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(30.5, -22.5);
  ctx.lineTo(30.5, -15.5);
  ctx.moveTo(27, -19);
  ctx.lineTo(34, -19);
  ctx.stroke();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.arc(30.5, -19, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Mid-Fuselage Troop / Cargo Compartment Recessed Door & Louvers
  ctx.fillStyle = "#1c2026";
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -4, -7, 14, 17, 1.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#292e37";
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, -2.5, -5.5, 11, 14, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(0, 6);
  ctx.moveTo(6, -4);
  ctx.lineTo(6, 6);
  ctx.moveTo(0, 1);
  ctx.lineTo(6, 1);
  ctx.stroke();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.rect(5, -3.5, 1.8, 1.0);
  ctx.fill();

  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-1, 8.5);
  ctx.lineTo(7, 8.5);
  ctx.moveTo(-1, 10.5);
  ctx.lineTo(7, 10.5);
  ctx.stroke();

  // Thermal Heat Dissipation Louvers
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let ly = -5; ly <= 3; ly += 2) {
    ctx.moveTo(12, ly);
    ctx.lineTo(19, ly);
  }
  ctx.stroke();

  // Forward Ballistic Ceramic Armor Cabin (Light Sand/Beige)
  const cabGrad = ctx.createLinearGradient(-36, -14, -8, 12);
  cabGrad.addColorStop(0, "#d6d3d1");
  cabGrad.addColorStop(0.35, "#a8a29e");
  cabGrad.addColorStop(0.7, "#78716c");
  cabGrad.addColorStop(1, "#57534e");
  ctx.fillStyle = cabGrad;
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-22, -14);
  ctx.lineTo(-11, -14);
  ctx.lineTo(-8, -7);
  ctx.lineTo(-9, 6);
  ctx.lineTo(-18, 12);
  ctx.lineTo(-27, 9);
  ctx.lineTo(-34, 4);
  ctx.lineTo(-36, 0);
  ctx.lineTo(-31, -7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Slanted Forward Lower Chin Sensor Housing
  ctx.fillStyle = "#78716c";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-36, 0);
  ctx.lineTo(-37.5, 3);
  ctx.lineTo(-31, 7);
  ctx.lineTo(-27, 9);
  ctx.lineTo(-34, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-36.5, 2);
  ctx.lineTo(-39.2, 2.5);
  ctx.stroke();

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-36.5, 2);
  ctx.lineTo(-39.2, 2.5);
  ctx.stroke();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(-35, 2, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fecaca";
  ctx.beginPath();
  ctx.arc(-35, 2, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Circular Tactical Access Port on Cab
  ctx.fillStyle = "#78716c";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-15, -2, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#a8a29e";
  ctx.beginPath();
  ctx.arc(-15, -2, 1.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(-15, -2, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#a8a29e";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-22, -14);
  ctx.lineTo(-18, 12);
  ctx.stroke();

  ctx.strokeStyle = "#57534e";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-31, -7);
  ctx.lineTo(-22, 3);
  ctx.stroke();

  // =========================================================================
  // 3. FACETED COCKPIT & CANOPY (Side Profile)
  // =========================================================================

  ctx.fillStyle = "#0f172a";
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-31, -7);
  ctx.lineTo(-22, -14);
  ctx.lineTo(-17, -14);
  ctx.lineTo(-20, -7);
  ctx.lineTo(-26, -2);
  ctx.lineTo(-31, -3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const canopyGrad = ctx.createLinearGradient(-31, -14, -17, -2);
  canopyGrad.addColorStop(0, "#38bdf8");
  canopyGrad.addColorStop(0.3, "#0284c7");
  canopyGrad.addColorStop(0.7, "#0369a1");
  canopyGrad.addColorStop(1, "#082f49");

  // Main Slanted Front Windshield Pane
  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = "#0369a1";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-30.5, -6.5);
  ctx.lineTo(-25, -12.5);
  ctx.lineTo(-23.5, -12.5);
  ctx.lineTo(-28, -6.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath();
  ctx.moveTo(-29.8, -7.5);
  ctx.lineTo(-25.2, -12.3);
  ctx.lineTo(-24.2, -12.3);
  ctx.lineTo(-28.5, -7.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Upper Skylight Cockpit Pane
  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = "#0369a1";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-23.5, -12.8);
  ctx.lineTo(-18, -12.8);
  ctx.lineTo(-19.5, -9.5);
  ctx.lineTo(-24.5, -9.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = "#e0f2fe";
  ctx.beginPath();
  ctx.moveTo(-22.8, -12.4);
  ctx.lineTo(-18.6, -12.4);
  ctx.lineTo(-19.7, -10.2);
  ctx.lineTo(-23.6, -10.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Side Quarter Triangular Pane
  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = "#0369a1";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-27.5, -5.5);
  ctx.lineTo(-23.5, -8.5);
  ctx.lineTo(-20.5, -6.5);
  ctx.lineTo(-25.5, -2.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.moveTo(-26.5, -5.2);
  ctx.lineTo(-23.5, -7.5);
  ctx.lineTo(-21.8, -6.2);
  ctx.lineTo(-25.2, -3.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Mullion Dividing Struts
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-24, -13);
  ctx.lineTo(-28.5, -6.2);
  ctx.stroke();

  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-24, -9.5);
  ctx.lineTo(-20, -7);
  ctx.moveTo(-27.5, -5.5);
  ctx.lineTo(-20.5, -6.5);
  ctx.stroke();

  // =========================================================================
  // 4. VTOL LIFT ENGINE NACELLES (BELOW THE CRAFT)
  // =========================================================================

  const vtolHousingGrad = ctx.createLinearGradient(0, 9, 0, 13);
  vtolHousingGrad.addColorStop(0, "#64748b");
  vtolHousingGrad.addColorStop(0.4, "#334155");
  vtolHousingGrad.addColorStop(1, "#0f172a");

  // Forward VTOL Engine
  ctx.fillStyle = vtolHousingGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-17, 9);
  ctx.lineTo(-11, 9);
  ctx.lineTo(-10, 13);
  ctx.lineTo(-18, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-14, 11.5, 2.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.arc(-14, 11.5, 1.0, 0, Math.PI * 2);
  ctx.fill();

  const leftBellGrad = ctx.createLinearGradient(-17, 17.5, -11, 13);
  leftBellGrad.addColorStop(0, "#334155");
  leftBellGrad.addColorStop(0.25, "#64748b");
  leftBellGrad.addColorStop(0.5, "#94a3b8");
  leftBellGrad.addColorStop(0.75, "#475569");
  leftBellGrad.addColorStop(1, "#1e293b");

  ctx.fillStyle = leftBellGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-17, 13);
  ctx.lineTo(-11, 13);
  ctx.lineTo(-9.5, 17.5);
  ctx.lineTo(-18.5, 17.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-16.5, 14.5);
  ctx.lineTo(-11.5, 14.5);
  ctx.stroke();

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-17.5, 16.2);
  ctx.lineTo(-10.5, 16.2);
  ctx.stroke();

  ctx.fillStyle = "#090d12";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-18.5, 17.5);
  ctx.lineTo(-9.5, 17.5);
  ctx.lineTo(-10.2, 18.5);
  ctx.lineTo(-17.8, 18.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.ellipse(-14, 18.5, 3.8, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.ellipse(-14, 18.3, 2.2, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.ellipse(-14, 18.3, 1.0, 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Aft VTOL Engine
  ctx.fillStyle = vtolHousingGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(13, 9);
  ctx.lineTo(19, 9);
  ctx.lineTo(20, 13);
  ctx.lineTo(12, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(16, 11.5, 2.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.arc(16, 11.5, 1.0, 0, Math.PI * 2);
  ctx.fill();

  const rightBellGrad = ctx.createLinearGradient(13, 17.5, 19, 13);
  rightBellGrad.addColorStop(0, "#334155");
  rightBellGrad.addColorStop(0.25, "#64748b");
  rightBellGrad.addColorStop(0.5, "#94a3b8");
  rightBellGrad.addColorStop(0.75, "#475569");
  rightBellGrad.addColorStop(1, "#1e293b");

  ctx.fillStyle = rightBellGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(13, 13);
  ctx.lineTo(19, 13);
  ctx.lineTo(20.5, 17.5);
  ctx.lineTo(11.5, 17.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(13.5, 14.5);
  ctx.lineTo(18.5, 14.5);
  ctx.stroke();

  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(12.5, 16.2);
  ctx.lineTo(19.5, 16.2);
  ctx.stroke();

  ctx.fillStyle = "#090d12";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(11.5, 17.5);
  ctx.lineTo(20.5, 17.5);
  ctx.lineTo(19.8, 18.5);
  ctx.lineTo(12.2, 18.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.ellipse(16, 18.5, 3.8, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.ellipse(16, 18.3, 2.2, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.ellipse(16, 18.3, 1.0, 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  // =========================================================================
  // 5. NEAR-SIDE HEAVY LOW-SLUNG LANDING GEAR (CLOSE TO GROUND)
  // =========================================================================

  // Chrome Piston Gradient
  const chromeGrad = ctx.createLinearGradient(-25, 0, -23, 0);
  chromeGrad.addColorStop(0, "#94a3b8");
  chromeGrad.addColorStop(0.35, "#ffffff");
  chromeGrad.addColorStop(0.7, "#cbd5e1");
  chromeGrad.addColorStop(1, "#64748b");

  // Forward Landing Gear Outrigger
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-27, 6);
  ctx.lineTo(-21, 6);
  ctx.lineTo(-20, 12);
  ctx.lineTo(-28, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-24, 9, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-26, 12);
  ctx.lineTo(-22, 12);
  ctx.lineTo(-21.5, 15.5);
  ctx.lineTo(-26.5, 15.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Telescoping Chrome Shock Piston (low-profile height)
  const forwardPistonH = Math.max(0.5, footPadY - 2.5 - 15.5);
  ctx.fillStyle = chromeGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(-24.8, 15.5, 1.6, forwardPistonH);
  ctx.fill();
  ctx.stroke();

  // Articulated Scissor Torque Linkage
  const forwardMidY = 13 + (footPadY - 2.5 - 13) * 0.5;
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-24, 13);
  ctx.lineTo(-26.8, forwardMidY);
  ctx.lineTo(-24, footPadY - 2.5);
  ctx.stroke();

  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.arc(-26.8, forwardMidY, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Aft Landing Gear Outrigger
  ctx.fillStyle = "#334155";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(19, 6);
  ctx.lineTo(25, 6);
  ctx.lineTo(26, 12);
  ctx.lineTo(18, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(22, 9, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#1e293b";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(20, 12);
  ctx.lineTo(24, 12);
  ctx.lineTo(24.5, 15.5);
  ctx.lineTo(19.5, 15.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Aft Telescoping Chrome Shock Piston (low-profile height)
  const aftPistonH = Math.max(0.5, footPadY - 2.5 - 15.5);
  ctx.fillStyle = chromeGrad;
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(21.2, 15.5, 1.6, aftPistonH);
  ctx.fill();
  ctx.stroke();

  // Aft Articulated Scissor Torque Linkage
  const aftMidY = 13 + (footPadY - 2.5 - 13) * 0.5;
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(22, 13);
  ctx.lineTo(19.2, aftMidY);
  ctx.lineTo(22, footPadY - 2.5);
  ctx.stroke();

  ctx.fillStyle = "#cbd5e1";
  ctx.beginPath();
  ctx.arc(19.2, aftMidY, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // =========================================================================
  // FOOTPADS (Strict Subpath Isolation — NEVER CONNECT FOOTPADS)
  // =========================================================================

  const footpadMetalGrad = ctx.createLinearGradient(0, footPadY - 2, 0, footPadY);
  footpadMetalGrad.addColorStop(0, "#64748b");
  footpadMetalGrad.addColorStop(0.5, "#334155");
  footpadMetalGrad.addColorStop(1, "#0f172a");

  // Forward Footpad (Isolated Subpath)
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.arc(-24, footPadY - 2.5, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = footpadMetalGrad;
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.2;
  ctx.moveTo(-29, footPadY - 2);
  ctx.lineTo(-19, footPadY - 2);
  ctx.lineTo(-18, footPadY);
  ctx.lineTo(-30, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0a0d12";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -30.5, footPadY, 13, 1.6, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.arc(-28, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(-24, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(-20, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Aft Footpad (Strictly Separate Isolated Subpath)
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = "#475569";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.8;
  ctx.arc(22, footPadY - 2.5, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = footpadMetalGrad;
  ctx.strokeStyle = "#0b0e12";
  ctx.lineWidth = 1.2;
  ctx.moveTo(17, footPadY - 2);
  ctx.lineTo(27, footPadY - 2);
  ctx.lineTo(28, footPadY);
  ctx.lineTo(16, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#0a0d12";
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 15.5, footPadY, 13, 1.6, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.arc(18, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(22, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(26, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 6. ULTRA-REALISTIC TACTICAL DETAILS, STENCILS & RIVETS
  // =========================================================================

  // Tactical Hazard Triangle on Forward Cab
  ctx.fillStyle = "#0f172a";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-24, 1);
  ctx.lineTo(-20, 8);
  ctx.lineTo(-28, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.moveTo(-24, 2);
  ctx.lineTo(-20.8, 7.3);
  ctx.lineTo(-27.2, 7.3);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(-24, 4, 0.7, 0, Math.PI * 2);
  ctx.arc(-22.5, 6.2, 0.7, 0, Math.PI * 2);
  ctx.arc(-25.5, 6.2, 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.arc(-24, 5.2, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Sponson Tip Warning Stripes
  ctx.fillStyle = "#eab308";
  ctx.beginPath();
  ctx.rect(-27, 13.5, 5, 1.0);
  ctx.rect(20, 13.5, 5, 1.0);
  ctx.fill();

  // Technical Stencil Markings
  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  ctx.rect(23, -5, 4, 0.8);
  ctx.fill();

  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.rect(23, -3.5, 6, 0.6);
  ctx.fill();

  ctx.fillStyle = "#ef4444";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.rect(-1, -9, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#eab308";
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.rect(2.5, -9, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  // Panel Seams & Specular Edge Lighting
  ctx.strokeStyle = "#1a1e24";
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-8, -14);
  ctx.lineTo(-8, -7);
  ctx.moveTo(0, -14);
  ctx.lineTo(0, -7);
  ctx.moveTo(8, -14);
  ctx.lineTo(8, -7);
  ctx.moveTo(16, -11);
  ctx.lineTo(16, -5);
  ctx.moveTo(22, -9);
  ctx.lineTo(22, 4);
  ctx.moveTo(28, -8);
  ctx.lineTo(28, 5);
  ctx.stroke();

  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.strokeStyle = "#4b5563";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-8, -13.5);
  ctx.lineTo(12, -13.5);
  ctx.lineTo(20, -10.5);
  ctx.lineTo(34, -8.5);
  ctx.stroke();
  ctx.restore();

  // Structural Rivets
  ctx.fillStyle = "#94a3b8";
  ctx.beginPath();
  const dorsalRivets = [
    [-19, -12.5], [-13, -12.5], [-5, -12.5], [3, -12.5],
    [11, -12.5], [17, -9.8], [23, -7.8], [29, -7.8]
  ];
  for (const [rx, ry] of dorsalRivets) {
    ctx.moveTo(rx + 0.5, ry);
    ctx.arc(rx, ry, 0.5, 0, Math.PI * 2);
  }
  ctx.fill();

  ctx.fillStyle = "#57534e";
  ctx.beginPath();
  const cabRivets = [
    [-31, -5], [-28, 1], [-21, 6], [-13, 8]
  ];
  for (const [rx, ry] of cabRivets) {
    ctx.moveTo(rx + 0.4, ry);
    ctx.arc(rx, ry, 0.4, 0, Math.PI * 2);
  }
  ctx.fill();

  // Navigation Lights & Beacons
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(-32, -6, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fecaca";
  ctx.beginPath();
  ctx.arc(-32, -6, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f8fafc";
  ctx.beginPath();
  ctx.arc(1, -18, 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.beginPath();
  ctx.arc(1, -18, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#f59e0b";
  ctx.beginPath();
  ctx.arc(37, -7, 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.arc(37, -7, 0.4, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 5. NEBULA STARCHASER (NX-Cosmos Delta Interceptor)
// =====================================================================
export function drawNebula(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship?: ShipState,
  time: number = 0
) {
  // Ground contact level for landing gear footpads (centered on nozzles / skid pads)
  const footPadY = 21.5 + gearSpringOffset;

  // Animation clocks for rotating parabolic dish and blinking clearance / antenna strobes
  const animTime = time > 0 ? time : (typeof performance !== 'undefined' ? performance.now() / 1000 : 0);
  const antennaBlink = (animTime % 1.0) < 0.5;
  const gearBlink = (animTime % 1.2) < 0.6;

  // ---------------------------------------------------------------------------
  // Gradients & Shaders
  // ---------------------------------------------------------------------------
  // Metallic Royal Purple Hull Gradient
  const hullPurpleGrad = ctx.createLinearGradient(0, -10, 0, 12);
  hullPurpleGrad.addColorStop(0, '#805ad5');
  hullPurpleGrad.addColorStop(0.25, '#6b46c1');
  hullPurpleGrad.addColorStop(0.7, '#44337a');
  hullPurpleGrad.addColorStop(1, '#2d1b69');

  // Upper Shroud Gradient
  const shroudUpperGrad = ctx.createLinearGradient(-48, -14, -32, -7);
  shroudUpperGrad.addColorStop(0, '#9f7aea');
  shroudUpperGrad.addColorStop(0.4, '#6b46c1');
  shroudUpperGrad.addColorStop(1, '#3c2468');

  // Lower Shroud Gradient
  const shroudLowerGrad = ctx.createLinearGradient(-48, 7, -32, 14);
  shroudLowerGrad.addColorStop(0, '#44337a');
  shroudLowerGrad.addColorStop(0.6, '#2d1b69');
  shroudLowerGrad.addColorStop(1, '#180e38');

  // Recessed Nameplate Background Gradient
  const nameplateBgGrad = ctx.createLinearGradient(0, -4.5, 0, 6);
  nameplateBgGrad.addColorStop(0, '#1a0f2e');
  nameplateBgGrad.addColorStop(1, '#120822');

  // Panoramic Bridge Glass Gradient
  const bridgeGlassGrad = ctx.createLinearGradient(48, 0, 65, 0);
  bridgeGlassGrad.addColorStop(0, '#0369a1');
  bridgeGlassGrad.addColorStop(0.35, '#0284c7');
  bridgeGlassGrad.addColorStop(0.75, '#38bdf8');
  bridgeGlassGrad.addColorStop(1, '#bae6fd');

  // Main Engine Fusion Bell Gradient
  const mainEngineGrad = ctx.createLinearGradient(-48, 0, -36, 0);
  mainEngineGrad.addColorStop(0, '#0f0a18');
  mainEngineGrad.addColorStop(0.3, '#2e2440');
  mainEngineGrad.addColorStop(0.7, '#473860');
  mainEngineGrad.addColorStop(1, '#191224');

  // Orbital Crescent Gold Gradient
  const crescentGoldGrad = ctx.createLinearGradient(-19, -2, -13, 4);
  crescentGoldGrad.addColorStop(0, '#fde047');
  crescentGoldGrad.addColorStop(0.4, '#f59e0b');
  crescentGoldGrad.addColorStop(1, '#b45309');

  // ---------------------------------------------------------------------------
  // 0. FAR-SIDE / BACKGROUND STRUCTURES (Shadowed)
  // ---------------------------------------------------------------------------
  ctx.save();
  // Far-side Aft VTOL Pod
  ctx.fillStyle = '#22143b';
  ctx.strokeStyle = '#120822';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-25, 9);
  ctx.lineTo(-21, 9);
  ctx.lineTo(-20, 16);
  ctx.lineTo(-26, 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#180e2b';
  ctx.beginPath();
  ctx.moveTo(-25.5, 16);
  ctx.lineTo(-20.5, 16);
  ctx.lineTo(-19.5, 18);
  ctx.lineTo(-26.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0d0517';
  ctx.beginPath();
  ctx.ellipse(-23, 18, 3.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Far-side Forward VTOL Pod
  ctx.fillStyle = '#22143b';
  ctx.strokeStyle = '#120822';
  ctx.beginPath();
  ctx.moveTo(23, 9);
  ctx.lineTo(27, 9);
  ctx.lineTo(28, 16);
  ctx.lineTo(22, 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#180e2b';
  ctx.beginPath();
  ctx.moveTo(22.5, 16);
  ctx.lineTo(27.5, 16);
  ctx.lineTo(28.5, 18);
  ctx.lineTo(21.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0d0517';
  ctx.beginPath();
  ctx.ellipse(25, 18, 3.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Far-side mast shadow lines
  ctx.strokeStyle = '#160e29';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-24, -14);
  ctx.lineTo(-24, -23);
  ctx.stroke();
  ctx.restore();

  // ---------------------------------------------------------------------------
  // 1. DORSAL SUPERSTRUCTURE & SENSOR/COMMS MAST ARRAY
  // ---------------------------------------------------------------------------
  // Raised Comms Deckhouse
  ctx.fillStyle = shroudUpperGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-36, -9);
  ctx.lineTo(-36, -13.5);
  ctx.lineTo(-18, -13.5);
  ctx.lineTo(-14, -9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-36, -13.5);
  ctx.lineTo(-18, -13.5);
  ctx.stroke();

  // Status Nav Lights on deckhouse lip
  const deckLights = [
    { x: -34.5, color: '#ef4444' },
    { x: -31.5, color: '#f59e0b' },
    { x: -28.5, color: '#f8fafc' },
    { x: -25.5, color: '#38bdf8' },
    { x: -22.5, color: '#22c55e' },
  ];
  for (const l of deckLights) {
    ctx.fillStyle = l.color;
    ctx.fillRect(l.x, -14.2, 1.6, 0.8);
  }

  // Rear Satellite Dish (Angled ~40° aft-upwards)
  ctx.save();
  ctx.translate(-33, -14);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-2, -2);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-2.5, -3, 3.2, 1.8, -35 * (Math.PI / 180), 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-2.5, -3);
  ctx.lineTo(-4.5, -4.5);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(-4.5, -4.5, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Sensor Radome
  ctx.save();
  ctx.translate(-24, -14);
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.fillRect(-1.5, -2, 3, 2);
  ctx.strokeRect(-1.5, -2, 3, 2);

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(-2.2, -2);
  ctx.quadraticCurveTo(-2.2, -5, 0, -5);
  ctx.quadraticCurveTo(2.2, -5, 2.2, -2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-2.2, -2);
  ctx.lineTo(2.2, -2);
  ctx.stroke();
  ctx.restore();

  // Primary Communications Mast & High Whip Antennas
  ctx.save();
  ctx.translate(-27, -14);
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.fillRect(-1, -3, 2, 3);
  ctx.strokeRect(-1, -3, 2, 3);

  // Tall Whip Antenna
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -3);
  ctx.lineTo(0, -12.5);
  ctx.stroke();

  // Blinking Top Red Antenna Beacon
  if (antennaBlink) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.35)';
    ctx.beginPath();
    ctx.arc(0, -12.5, 1.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -12.5, 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fecaca';
    ctx.beginPath();
    ctx.arc(0, -12.5, 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.arc(0, -12.5, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Secondary Whip Antenna
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(1.5, -3);
  ctx.lineTo(1.5, -8.5);
  ctx.stroke();
  ctx.restore();

  // Forward Sensor / Defense Turret
  ctx.save();
  ctx.translate(-18, -14);
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.rect(-1.5, -1.5, 3, 1.5);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -1.5);
  ctx.lineTo(2.8, -3);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(-0.5, -0.8);
  ctx.lineTo(2.3, -2.3);
  ctx.stroke();
  ctx.restore();

  // Mid-Dorsal Slowly Rotating Parabolic Antenna
  ctx.save();
  ctx.translate(-4, -10);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -4.5);
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, -4.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Rotating Dish Assembly (12s period)
  ctx.save();
  ctx.translate(0, -4.5);
  const dishAngle = (animTime * ((Math.PI * 2) / 12)) % (Math.PI * 2);
  ctx.rotate(dishAngle);

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -1.7);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(0, -1.7, 3.0, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#473860';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.ellipse(0, -1.5, 2.4, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -1.7);
  ctx.lineTo(0, -4.3);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(0, -4.3, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore(); // dish rotation
  ctx.restore(); // antenna root

  // Dorsal Docking Ring / Cupola
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(4, -11.5, 5, 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(6.5, -11.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // ---------------------------------------------------------------------------
  // 2. MAIN AFT ENGINE CLUSTER & BIFURCATED COWLING SHROUDS
  // ---------------------------------------------------------------------------
  // Central Main Fusion Engine Bell
  ctx.fillStyle = mainEngineGrad;
  ctx.strokeStyle = '#120822';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-36, -7.5);
  ctx.lineTo(-48, -6);
  ctx.lineTo(-48, 6);
  ctx.lineTo(-36, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Concentric Ribs
  ctx.strokeStyle = '#473860';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-45, -6.3); ctx.lineTo(-45, 6.3);
  ctx.moveTo(-42, -6.7); ctx.lineTo(-42, 6.7);
  ctx.moveTo(-39, -7.1); ctx.lineTo(-39, 7.1);
  ctx.stroke();

  // Engine Bell Throat Opening
  ctx.fillStyle = '#07030d';
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-48, 0, 2.2, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Intense Cyan Plasma Emission Glow inside the Bell
  ctx.fillStyle = '#00f0ff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-47.5, 0, 1.6, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.ellipse(-47.2, 0, 1.0, 3.0, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Upper Bifurcated Cowling Shroud
  ctx.fillStyle = shroudUpperGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-32, -13.5);
  ctx.bezierCurveTo(-42, -13, -52, -11.5, -64, -9.5);
  ctx.lineTo(-64, -7.5);
  ctx.bezierCurveTo(-52, -7, -44, -6.5, -32, -7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-32, -13.5);
  ctx.bezierCurveTo(-42, -13, -52, -11.5, -64, -9.5);
  ctx.stroke();

  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-60, -8.5);
  ctx.lineTo(-36, -8.5);
  ctx.stroke();

  // Cyan Tip Marker Light (Upper)
  ctx.fillStyle = '#00f0ff';
  ctx.beginPath();
  ctx.arc(-62, -8.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Lower Bifurcated Cowling Shroud
  ctx.fillStyle = shroudLowerGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-32, 13.5);
  ctx.bezierCurveTo(-42, 13, -52, 11.5, -64, 9.5);
  ctx.lineTo(-64, 7.5);
  ctx.bezierCurveTo(-52, 7, -44, 6.5, -32, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-60, 8.5);
  ctx.lineTo(-36, 8.5);
  ctx.stroke();

  // Cyan Tip Marker Light (Lower)
  ctx.fillStyle = '#00f0ff';
  ctx.beginPath();
  ctx.arc(-62, 8.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Curved Aft Ventral Keel Bulge
  ctx.fillStyle = shroudLowerGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-42, 7.5);
  ctx.bezierCurveTo(-38, 12, -34, 14, -26, 13.5);
  ctx.lineTo(-26, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Underside Cyan Beacon Light
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-34, 11.5, 0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-38, 9);
  ctx.lineTo(-30, 9);
  ctx.stroke();

  // Aft Mechanical Bulkhead Hinge Greeble
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-30, -9);
  ctx.lineTo(-30, 11);
  ctx.stroke();

  ctx.fillStyle = '#2e2048';
  ctx.strokeStyle = '#120822';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.arc(-30, 0, 3.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#473860';
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-30, 0, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(-30, 0, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Heat Sink Louver Grill
  ctx.fillStyle = '#1e1430';
  ctx.strokeStyle = '#120822';
  ctx.lineWidth = 0.5;
  ctx.fillRect(-33.5, -5.5, 4.5, 2.8);
  ctx.strokeRect(-33.5, -5.5, 4.5, 2.8);

  ctx.strokeStyle = '#473860';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-32.5, -4.6); ctx.lineTo(-30, -4.6);
  ctx.moveTo(-32.5, -3.6); ctx.lineTo(-30, -3.6);
  ctx.stroke();

  // ---------------------------------------------------------------------------
  // 3. MAIN FUSELAGE HULL & STRUCTURAL ARMOR
  // ---------------------------------------------------------------------------
  // Midships Main Body Plating
  ctx.fillStyle = hullPurpleGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.rect(-26, -9, 38, 20.5);
  ctx.fill();
  ctx.stroke();

  // Longitudinal Seam Grooves
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-26, -6.5); ctx.lineTo(12, -6.5);
  ctx.moveTo(-26, 8); ctx.lineTo(12, 8);
  ctx.stroke();

  // Top Deck Edge Bevel Highlight
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-26, -8.5); ctx.lineTo(12, -8.5);
  ctx.stroke();

  // Vertical Structural Expansion Collar Joint
  ctx.fillStyle = '#1c1133';
  ctx.strokeStyle = '#0f071f';
  ctx.lineWidth = 0.7;
  ctx.fillRect(12, -10, 3.5, 21.5);
  ctx.strokeRect(12, -10, 3.5, 21.5);

  ctx.strokeStyle = '#332154';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(13.7, -10);
  ctx.lineTo(13.7, 11.5);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.fillRect(13, -9.2, 1.5, 1.2);
  ctx.fillRect(13, 9.5, 1.5, 1.2);

  // ---------------------------------------------------------------------------
  // 4. ILLUMINATED MISSION NAMEPLATE (MIDSHIPS FLANK)
  // ---------------------------------------------------------------------------
  ctx.save();
  // Recessed Frame
  ctx.fillStyle = nameplateBgGrad;
  ctx.strokeStyle = '#5b21b6';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.rect(-22, -4.5, 30, 10.5);
  ctx.fill();
  ctx.stroke();

  // 4 Corner Cyan Indicator Lights
  ctx.fillStyle = '#00f0ff';
  ctx.fillRect(-21.2, -3.8, 1.0, 1.0);
  ctx.fillRect(6.2, -3.8, 1.0, 1.0);
  ctx.fillRect(-21.2, 4.2, 1.0, 1.0);
  ctx.fillRect(6.2, 4.2, 1.0, 1.0);

  // Mission Insignia: Stylized Orbital Crescent Loop + 4-Point Star
  ctx.save();
  ctx.translate(-16, 0.8);
  // Golden Orbital Crescent Arc
  ctx.strokeStyle = crescentGoldGrad;
  ctx.lineWidth = 1.1;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-2.2, -2.6);
  ctx.bezierCurveTo(0.8, -3.8, 3.6, -1.8, 3.8, 1.2);
  ctx.bezierCurveTo(4.0, 3.6, 1.8, 4.5, -0.6, 4.0);
  ctx.bezierCurveTo(-2.4, 3.6, -3.8, 1.8, -3.2, -0.4);
  ctx.stroke();

  // Brilliant White 4-Point Star
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(0, -2.5);
  ctx.quadraticCurveTo(0.3, -0.3, 2.5, 0);
  ctx.quadraticCurveTo(0.3, 0.3, 0, 2.5);
  ctx.quadraticCurveTo(-0.3, 0.3, -2.5, 0);
  ctx.quadraticCurveTo(-0.3, -0.3, 0, -2.5);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(0, 0, 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Typographic Lettering
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 3.8px system-ui, -apple-system, sans-serif';
  ctx.fillText('NEBULA', -10.5, -1.2);

  ctx.font = 'bold 3.4px system-ui, -apple-system, sans-serif';
  ctx.fillText('STARCHASER', -10.5, 2.4);

  ctx.fillStyle = '#93c5fd';
  ctx.font = '600 1.25px system-ui, -apple-system, sans-serif';
  ctx.fillText('INTERSTELLAR EXPLORATION   NS-709', -10.5, 4.8);
  ctx.restore();

  // ---------------------------------------------------------------------------
  // 5. FORWARD SECTION, MACHINERY BAY & PROW BRIDGE
  // ---------------------------------------------------------------------------
  // Sloping Upper Forward Hull
  ctx.fillStyle = hullPurpleGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(15.5, -10);
  ctx.lineTo(35, -10);
  ctx.lineTo(50, -7);
  ctx.lineTo(65, -0.5);
  ctx.lineTo(64, 4);
  ctx.lineTo(52, 7);
  ctx.lineTo(48, 11.5);
  ctx.lineTo(15.5, 11.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Raked Upper Hull Bevel Highlight
  ctx.strokeStyle = '#a78bfa';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(15.5, -9.5);
  ctx.lineTo(35, -9.5);
  ctx.lineTo(50, -6.5);
  ctx.lineTo(64.5, -0.5);
  ctx.stroke();

  // Raised Trapezoidal Observation Skylight
  ctx.fillStyle = '#7dd3fc';
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(32, -9);
  ctx.lineTo(36, -9);
  ctx.lineTo(35, -7.2);
  ctx.lineTo(33, -7.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Horizontal Sensor Readout Light Array
  ctx.fillStyle = '#1e1430';
  ctx.strokeStyle = '#0f081c';
  ctx.lineWidth = 0.5;
  ctx.fillRect(41, -3.2, 7.5, 1.6);
  ctx.strokeRect(41, -3.2, 7.5, 1.6);

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(41.6, -2.8, 1.8, 0.8);
  ctx.fillStyle = '#f59e0b';
  ctx.fillRect(43.8, -2.8, 1.8, 0.8);
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(46.0, -2.8, 1.8, 0.8);

  // Side Machinery / Greeble Equipment Bay
  ctx.fillStyle = '#120822';
  ctx.strokeStyle = '#090312';
  ctx.lineWidth = 0.6;
  ctx.fillRect(28, 0.5, 18, 7);
  ctx.strokeRect(28, 0.5, 18, 7);

  // Power Converter / Heat Exchanger Canister
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.fillRect(31, 1.8, 12, 3.2);
  ctx.strokeRect(31, 1.8, 12, 3.2);

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(34, 1.8); ctx.lineTo(34, 5.0);
  ctx.moveTo(37, 1.8); ctx.lineTo(37, 5.0);
  ctx.moveTo(40, 1.8); ctx.lineTo(40, 5.0);
  ctx.stroke();

  // Coolant Piping & Manifolds
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(29, 6);
  ctx.lineTo(44, 6);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(44, 6, 0.8, 0, Math.PI * 2);
  ctx.arc(30, 6, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Panoramic Bridge Observation Deck (Facing Right Prow)
  ctx.save();
  ctx.translate(48, -2.5);
  // Overhanging Brow Visor Armor
  ctx.fillStyle = '#1c1133';
  ctx.strokeStyle = '#0f071f';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(0, -1.5);
  ctx.lineTo(14, -1.5);
  ctx.lineTo(17, 2.2);
  ctx.lineTo(0, 2.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Faceted Glass Panes
  ctx.fillStyle = bridgeGlassGrad;
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(1, -0.8);
  ctx.lineTo(13.5, -0.8);
  ctx.lineTo(16, 1.8);
  ctx.lineTo(1, 1.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dark Structural Window Mullions
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(4.5, -0.8); ctx.lineTo(4.5, 1.8);
  ctx.moveTo(8.0, -0.8); ctx.lineTo(8.0, 1.8);
  ctx.moveTo(11.5, -0.8); ctx.lineTo(11.5, 1.8);
  ctx.stroke();

  // Glass Top Specular Glint
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(1.5, -0.5);
  ctx.lineTo(13, -0.5);
  ctx.stroke();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // Lower Forward Chin Bumper & RCS Array
  ctx.fillStyle = '#22143b';
  ctx.strokeStyle = '#120822';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(52, 4);
  ctx.lineTo(64, 4);
  ctx.lineTo(63, 7);
  ctx.lineTo(54, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f081c';
  ctx.fillRect(58, 5, 3, 1.5);
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(59, 5.7, 0.4, 0, Math.PI * 2);
  ctx.arc(60.2, 5.7, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // ---------------------------------------------------------------------------
  // 6. VENTRAL VTOL NACELLES & SCIENTIFIC SENSOR PROBES
  // ---------------------------------------------------------------------------
  // Aft Ventral VTOL Thruster Pod
  ctx.save();
  ctx.translate(-23, 11);
  ctx.fillStyle = shroudLowerGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(4, 0);
  ctx.lineTo(3, 6.5);
  ctx.lineTo(-3, 6.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e1238';
  ctx.fillRect(-1.5, 1, 3, 4);

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-2.2, 2, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Blinking Landing Gear Clearance Beacon (Aft)
  if (gearBlink) {
    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 1.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#083344';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rocket Nozzle Bell (Dynamic spring height)
  const aftNozzleLipY = Math.max(7.5, footPadY - 11);
  ctx.fillStyle = '#1e1b2e';
  ctx.strokeStyle = '#090312';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-3, 6.5);
  ctx.lineTo(3, 6.5);
  ctx.lineTo(3.8, aftNozzleLipY);
  ctx.lineTo(-3.8, aftNozzleLipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#090412';
  ctx.strokeStyle = '#473860';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(0, aftNozzleLipY, 3.8, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#00f0ff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.ellipse(0, aftNozzleLipY, 2.5, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // Forward Ventral VTOL Thruster Pod
  ctx.save();
  ctx.translate(25, 11);
  ctx.fillStyle = shroudLowerGrad;
  ctx.strokeStyle = '#1e1238';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(4, 0);
  ctx.lineTo(3, 6.5);
  ctx.lineTo(-3, 6.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e1238';
  ctx.fillRect(-1.5, 1, 3, 4);

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-2.2, 2, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Blinking Landing Gear Clearance Beacon (Forward)
  if (gearBlink) {
    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 1.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#083344';
    ctx.beginPath();
    ctx.arc(-2.2, 4.5, 0.35, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rocket Nozzle Bell (Dynamic spring height)
  const fwdNozzleLipY = Math.max(7.5, footPadY - 11);
  ctx.fillStyle = '#1e1b2e';
  ctx.strokeStyle = '#090312';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-3, 6.5);
  ctx.lineTo(3, 6.5);
  ctx.lineTo(3.8, fwdNozzleLipY);
  ctx.lineTo(-3.8, fwdNozzleLipY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#090412';
  ctx.strokeStyle = '#473860';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(0, fwdNozzleLipY, 3.8, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#00f0ff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.ellipse(0, fwdNozzleLipY, 2.5, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // Forward Ventral Keel Fin
  ctx.fillStyle = '#1e1238';
  ctx.strokeStyle = '#0f071f';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(36, 11.5);
  ctx.lineTo(40, 11.5);
  ctx.lineTo(38, 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Ventral Scientific Sensor Package (Flush Mount, Antennas Removed)
  ctx.save();
  ctx.translate(0, 11.5);
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.fillRect(-3, 0, 6, 2);
  ctx.strokeRect(-3, 0, 6, 2);

  // Gimballed FLIR / Optical Sensor Turret
  ctx.save();
  ctx.translate(5, 2.5);
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(-1, -1, 2, 1.2);
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, 1, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(0.4, 1.2, 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}


export function drawVanguard(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  _ship?: ShipState,
  time = 0
) {
  // Landing gear vertical offset dynamics
  const primaryFootPadY = 30.5 + gearSpringOffset;
  const rearFootPadY = 27.0 + gearSpringOffset * 0.7;
  const primaryKneeY = 25.0 + gearSpringOffset * 0.4;
  const rearKneeY = 23.5 + gearSpringOffset * 0.35;

  // Gradients for Canvas
  // 1. Gold Hull Gradient
  const hullGold = ctx.createLinearGradient(0, -28, 0, 18);
  hullGold.addColorStop(0, '#f5b938');
  hullGold.addColorStop(0.5, '#e5a823');
  hullGold.addColorStop(1, '#c88617');

  // 2. Hull Chamfer Facet Gradient
  const hullFacet = ctx.createLinearGradient(-18.5, 0, 18.5, 0);
  hullFacet.addColorStop(0, '#b87b14');
  hullFacet.addColorStop(0.5, '#d99920');
  hullFacet.addColorStop(1, '#94600e');

  // 3. Dish Footpad Gradient
  const dishPad = ctx.createLinearGradient(0, 26, 0, 32);
  dishPad.addColorStop(0, '#e5a823');
  dishPad.addColorStop(0.6, '#ca8a04');
  dishPad.addColorStop(1, '#854d0e');

  // 4. Thruster Bell Gradients
  const thrusterBell = ctx.createLinearGradient(-18, 0, -10, 0);
  thrusterBell.addColorStop(0, '#334155');
  thrusterBell.addColorStop(0.35, '#64748b');
  thrusterBell.addColorStop(0.6, '#94a3b8');
  thrusterBell.addColorStop(0.85, '#475569');
  thrusterBell.addColorStop(1, '#1e293b');

  const thrusterBellR = ctx.createLinearGradient(10, 0, 18, 0);
  thrusterBellR.addColorStop(0, '#1e293b');
  thrusterBellR.addColorStop(0.15, '#475569');
  thrusterBellR.addColorStop(0.4, '#94a3b8');
  thrusterBellR.addColorStop(0.65, '#64748b');
  thrusterBellR.addColorStop(1, '#334155');

  // -----------------------------------------------------------------
  // 1. LANDING GEAR & FOOTPADS (Disconnected symmetrical shapes isolated)
  // -----------------------------------------------------------------
  ctx.lineCap = 'round';

  // Left Rear Strut
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-14, 15);
  ctx.lineTo(-23, rearKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#e5a823';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-14, 15);
  ctx.lineTo(-23, rearKneeY);
  ctx.stroke();

  // Left Rear Chrome Piston
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-23, rearKneeY);
  ctx.lineTo(-25.5, rearFootPadY - 0.2);
  ctx.stroke();

  // Right Rear Strut
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(14, 15);
  ctx.lineTo(23, rearKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#e5a823';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(14, 15);
  ctx.lineTo(23, rearKneeY);
  ctx.stroke();

  // Right Rear Chrome Piston
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(23, rearKneeY);
  ctx.lineTo(25.5, rearFootPadY - 0.2);
  ctx.stroke();

  // Rear Outrigger Footpads (ISOLATED PATHS)
  ctx.fillStyle = dishPad;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.ellipse(-25.5, rearFootPadY, 3.8, 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-28.5, rearFootPadY);
  ctx.lineTo(-22.5, rearFootPadY);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(-25.5, rearFootPadY, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Right Rear Outrigger Footpad (ISOLATED PATH)
  ctx.fillStyle = dishPad;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.ellipse(25.5, rearFootPadY, 3.8, 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(22.5, rearFootPadY);
  ctx.lineTo(28.5, rearFootPadY);
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(25.5, rearFootPadY, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Front Primary Landing Gear Assembly
  // Left Upper Main Strut
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-8, 15.5);
  ctx.lineTo(-13.5, primaryKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#e5a823';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-8, 15.5);
  ctx.lineTo(-13.5, primaryKneeY);
  ctx.stroke();

  // Left Scissor A-Frame
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-2, 17.5);
  ctx.lineTo(-13.5, primaryKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#c88617';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-2, 17.5);
  ctx.lineTo(-13.5, primaryKneeY);
  ctx.stroke();

  // Right Upper Main Strut
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(8, 15.5);
  ctx.lineTo(13.5, primaryKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#e5a823';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(8, 15.5);
  ctx.lineTo(13.5, primaryKneeY);
  ctx.stroke();

  // Right Scissor A-Frame
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(2, 17.5);
  ctx.lineTo(13.5, primaryKneeY);
  ctx.stroke();

  ctx.strokeStyle = '#c88617';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(2, 17.5);
  ctx.lineTo(13.5, primaryKneeY);
  ctx.stroke();

  // Knee Collar / Wiper Rings
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -14.8, primaryKneeY - 0.8, 2.6, 1.8, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  roundRect(ctx, 12.2, primaryKneeY - 0.8, 2.6, 1.8, 0.5);
  ctx.fill();
  ctx.stroke();

  // Telescoping Chrome Oleo Pistons
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-13.5, primaryKneeY);
  ctx.lineTo(-16, primaryFootPadY);
  ctx.moveTo(13.5, primaryKneeY);
  ctx.lineTo(16, primaryFootPadY);
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-13.5, primaryKneeY);
  ctx.lineTo(-16, primaryFootPadY);
  ctx.moveTo(13.5, primaryKneeY);
  ctx.lineTo(16, primaryFootPadY);
  ctx.stroke();

  // Footpad Ball Knuckles
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(-16, primaryFootPadY, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(16, primaryFootPadY, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Left Front Footpad Dish (ISOLATED PATH)
  ctx.fillStyle = dishPad;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.ellipse(-16, primaryFootPadY, 4.5, 1.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(-16, primaryFootPadY, 3.3, 0.9, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-20.2, primaryFootPadY);
  ctx.lineTo(-11.8, primaryFootPadY);
  ctx.moveTo(-18.8, primaryFootPadY - 0.6);
  ctx.lineTo(-13.2, primaryFootPadY + 0.6);
  ctx.moveTo(-18.8, primaryFootPadY + 0.6);
  ctx.lineTo(-13.2, primaryFootPadY - 0.6);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-16, primaryFootPadY, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right Front Footpad Dish (ISOLATED PATH)
  ctx.fillStyle = dishPad;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.ellipse(16, primaryFootPadY, 4.5, 1.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(16, primaryFootPadY, 3.3, 0.9, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(11.8, primaryFootPadY);
  ctx.lineTo(20.2, primaryFootPadY);
  ctx.moveTo(13.2, primaryFootPadY - 0.6);
  ctx.lineTo(18.8, primaryFootPadY + 0.6);
  ctx.moveTo(13.2, primaryFootPadY + 0.6);
  ctx.lineTo(18.8, primaryFootPadY - 0.6);
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(16, primaryFootPadY, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // -----------------------------------------------------------------
  // 2. TWIN SIDE-MOUNTED PRIMARY THRUSTERS
  // -----------------------------------------------------------------
  // Left Engine
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, -16.2, 16.5, 4.4, 2.2, 0.4);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-15.5, 16.5);
  ctx.lineTo(-15.5, 18.7);
  ctx.moveTo(-12.5, 16.5);
  ctx.lineTo(-12.5, 18.7);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.ellipse(-14, 19.2, 2.2, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Flared Rocket Bell
  ctx.fillStyle = thrusterBell;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-15.8, 19.5);
  ctx.bezierCurveTo(-15.8, 21, -16.8, 23, -17.4, 24.8);
  ctx.lineTo(-10.6, 24.8);
  ctx.bezierCurveTo(-11.2, 23, -12.2, 21, -12.2, 19.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-14, 21.0, 2.3, 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(-14, 22.8, 2.8, 0.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-14, 24.8, 3.4, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right Engine
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, 11.8, 16.5, 4.4, 2.2, 0.4);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(12.5, 16.5);
  ctx.lineTo(12.5, 18.7);
  ctx.moveTo(15.5, 16.5);
  ctx.lineTo(15.5, 18.7);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.ellipse(14, 19.2, 2.2, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = thrusterBellR;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(12.2, 19.5);
  ctx.bezierCurveTo(12.2, 21, 11.2, 23, 10.6, 24.8);
  ctx.lineTo(17.4, 24.8);
  ctx.bezierCurveTo(16.8, 23, 15.8, 21, 15.8, 19.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(14, 21.0, 2.3, 0.4, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(14, 22.8, 2.8, 0.5, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(14, 24.8, 3.4, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // -----------------------------------------------------------------
  // 3. MAIN HULL STRUCTURE
  // -----------------------------------------------------------------
  // Lower Descent Stage Outer Chamfer Facets
  ctx.fillStyle = hullFacet;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-7.5, -2.5);
  ctx.lineTo(-13, 0.5);
  ctx.lineTo(-17, 14.5);
  ctx.lineTo(-18.5, 16.5);
  ctx.lineTo(-12, 19.5);
  ctx.lineTo(0, 18);
  ctx.lineTo(12, 19.5);
  ctx.lineTo(18.5, 16.5);
  ctx.lineTo(17, 14.5);
  ctx.lineTo(13, 0.5);
  ctx.lineTo(7.5, -2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Recessed Center Bulkhead Plate
  ctx.fillStyle = hullGold;
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-10, -1);
  ctx.lineTo(-10, 16.5);
  ctx.lineTo(-7, 18);
  ctx.lineTo(7, 18);
  ctx.lineTo(10, 16.5);
  ctx.lineTo(10, -1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Chamfer Seams
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-10, -1);
  ctx.lineTo(-13, 0.5);
  ctx.moveTo(-10, 16.5);
  ctx.lineTo(-18.5, 16.5);
  ctx.moveTo(10, -1);
  ctx.lineTo(13, 0.5);
  ctx.moveTo(10, 16.5);
  ctx.lineTo(18.5, 16.5);
  ctx.stroke();

  // Transitional Neck Collar
  ctx.fillStyle = '#92400e';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-6, -4.5);
  ctx.lineTo(6, -4.5);
  ctx.lineTo(7.5, -2.5);
  ctx.lineTo(-7.5, -2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-5.5, -3.5);
  ctx.lineTo(5.5, -3.5);
  ctx.stroke();

  // Spherical Cockpit Shell
  ctx.fillStyle = hullGold;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.arc(0, -16.5, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Shading Crescent
  ctx.save();
  ctx.beginPath();
  ctx.arc(0, -16.5, 12, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = '#b45309';
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(-3, -16.5, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Flank RCS Thruster Blocks
  ctx.fillStyle = '#cf9020';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -14.6, -18.2, 2.8, 3.4, 0.6);
  roundRect(ctx, 11.8, -18.2, 2.8, 3.4, 0.6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  roundRect(ctx, -15.5, -17.2, 1.0, 1.4, 0.3);
  roundRect(ctx, 14.5, -17.2, 1.0, 1.4, 0.3);
  ctx.fill();

  // Upper Left Periscope Cap
  ctx.save();
  ctx.translate(-7.8, -25.8);
  ctx.rotate((-35 * Math.PI) / 180);
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, -1.2, -1.5, 2.4, 2.0, 0.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(0, -1.5, 1.2, 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Upper Right Relief Disc
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(7, -26.5, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Umbilical Cable Harness Conduit
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-11.8, -13.5);
  ctx.bezierCurveTo(-11.5, -8, -11.0, -4, -9.5, -1.2);
  ctx.stroke();

  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-12.3, -10.5, 1.6, 0.8);
  ctx.fillRect(-11.6, -5.5, 1.6, 0.8);

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-9.6, -1.2, 0.6, 0, Math.PI * 2);
  ctx.arc(-8.4, -0.6, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // -----------------------------------------------------------------
  // 4. CANOPY & GOLD IRIS SENSOR
  // -----------------------------------------------------------------
  // Outer Bezel
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(0, -16.5, 10.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(0, -16.5, 9.7, 0, Math.PI * 2);
  ctx.fill();

  // Panoramic Glass
  const glassGrad = ctx.createRadialGradient(-2, -18.5, 1, 0, -16.5, 10);
  glassGrad.addColorStop(0, '#7ab0d2');
  glassGrad.addColorStop(0.5, '#4a7694');
  glassGrad.addColorStop(1, '#2c4d63');

  ctx.fillStyle = glassGrad;
  ctx.beginPath();
  ctx.arc(0, -16.5, 9.6, 0, Math.PI * 2);
  ctx.fill();

  // Structural Spoke Mullions (6 Radial Panes)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'butt';
  ctx.beginPath();
  ctx.moveTo(0, -26.1);
  ctx.lineTo(0, -21.4);
  ctx.moveTo(0, -11.6);
  ctx.lineTo(0, -6.9);
  ctx.moveTo(-8.2, -21.3);
  ctx.lineTo(-4.2, -18.9);
  ctx.moveTo(8.2, -21.3);
  ctx.lineTo(4.2, -18.9);
  ctx.moveTo(-8.2, -11.7);
  ctx.lineTo(-4.2, -14.1);
  ctx.moveTo(8.2, -11.7);
  ctx.lineTo(4.2, -14.1);
  ctx.stroke();

  // Specular Glare Arc on Glass
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.35;
  ctx.beginPath();
  ctx.ellipse(0, -16.5, 8.5, 6.5, 0, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.restore();

  // GOLD IRIS SENSOR
  const irisGrad = ctx.createRadialGradient(0, -16.5, 0.5, 0, -16.5, 5);
  irisGrad.addColorStop(0, '#fef08a');
  irisGrad.addColorStop(0.35, '#eab308');
  irisGrad.addColorStop(0.7, '#ca8a04');
  irisGrad.addColorStop(1, '#78350f');

  ctx.fillStyle = irisGrad;
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.arc(0, -16.5, 4.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, -16.5, 4.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = irisGrad;
  ctx.beginPath();
  ctx.arc(0, -16.5, 3.9, 0, Math.PI * 2);
  ctx.fill();

  // 24 Radial Diaphragm Blades
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.4;
  ctx.globalAlpha = 0.9;
  ctx.beginPath();
  for (let i = 0; i < 24; i++) {
    const rad = (i * 15 * Math.PI) / 180;
    const x1 = Math.sin(rad) * 2.3;
    const y1 = -16.5 - Math.cos(rad) * 2.3;
    const x2 = Math.sin(rad) * 3.9;
    const y2 = -16.5 - Math.cos(rad) * 3.9;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Inner Stepped Gold Collar & Central Optic
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(0, -16.5, 2.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#451a03';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(0, -16.5, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(0, -16.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-0.3, -16.8, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // -----------------------------------------------------------------
  // 5. DETAILS: HALO ANTENNA, FUEL TANK, AVIONICS, PLAQUE
  // -----------------------------------------------------------------
  // Lattice Truss
  ctx.fillStyle = 'rgba(45, 32, 16, 0.15)';
  ctx.beginPath();
  ctx.moveTo(-2.5, -27.5);
  ctx.lineTo(2.5, -27.5);
  ctx.lineTo(8, -32);
  ctx.lineTo(-8, -32);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#c88617';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-8.5, -32);
  ctx.lineTo(-2.5, -27.5);
  ctx.moveTo(8.5, -32);
  ctx.lineTo(2.5, -27.5);
  ctx.stroke();

  ctx.strokeStyle = '#e5a823';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(0, -32.5);
  ctx.lineTo(0, -27.5);
  ctx.stroke();

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-7.5, -31.5);
  ctx.lineTo(-5, -28.5);
  ctx.moveTo(-4, -31.5);
  ctx.lineTo(-2, -28.5);
  ctx.moveTo(7.5, -31.5);
  ctx.lineTo(5, -28.5);
  ctx.moveTo(4, -31.5);
  ctx.lineTo(2, -28.5);
  ctx.stroke();

  // Halo / Torus Ring
  ctx.fillStyle = hullGold;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.ellipse(0, -32.5, 12, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.ellipse(0, -32.5, 8.5, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Antenna Probe Mast with Twin-Fork Head
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -0.8, -34.5, 1.6, 2.0, 0.4);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, -34.5);
  ctx.lineTo(0, -38.8);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -34.5);
  ctx.lineTo(0, -38.8);
  ctx.stroke();

  // Fork Tips
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-0.8, -38.8);
  ctx.lineTo(0.8, -38.8);
  ctx.moveTo(-0.8, -38.8);
  ctx.lineTo(-0.8, -40.0);
  ctx.moveTo(0.8, -38.8);
  ctx.lineTo(0.8, -40.0);
  ctx.stroke();

  // COPPER FUEL TANK
  const copperGrad = ctx.createLinearGradient(-8.8, 0, -3.2, 0);
  copperGrad.addColorStop(0, '#853616');
  copperGrad.addColorStop(0.35, '#d96a3b');
  copperGrad.addColorStop(0.55, '#ea875a');
  copperGrad.addColorStop(0.85, '#a6441e');
  copperGrad.addColorStop(1, '#5c1d08');

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -7, 1.2, 2, 1.8, 0.3);
  roundRect(ctx, -7, 10.8, 2, 1.8, 0.3);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = copperGrad;
  ctx.strokeStyle = '#2d2010';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.rect(-8.8, 3.1, 5.6, 6.8);
  ctx.fill();
  ctx.stroke();

  // Top Dome
  ctx.beginPath();
  ctx.moveTo(-8.8, 3.1);
  ctx.bezierCurveTo(-8.8, 1.4, -3.2, 1.4, -3.2, 3.1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Bottom Dome
  ctx.beginPath();
  ctx.moveTo(-8.8, 9.9);
  ctx.bezierCurveTo(-8.8, 11.6, -3.2, 11.6, -3.2, 9.9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Weld Seam Band
  ctx.strokeStyle = '#7c2d12';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-8.8, 6.5);
  ctx.lineTo(-3.2, 6.5);
  ctx.stroke();

  ctx.strokeStyle = '#ea875a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-8.8, 6.5);
  ctx.lineTo(-3.2, 6.5);
  ctx.stroke();

  // Highlight
  ctx.strokeStyle = '#ffffff';
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-5.5, 2.2);
  ctx.lineTo(-5.5, 10.8);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Manifold Plumbing
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -4.8, 5.7, 2.0, 1.6, 0.3);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(-3.8, 6.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-6.0, 1.4);
  ctx.lineTo(-3.8, 1.4);
  ctx.lineTo(-3.8, 5.7);
  ctx.moveTo(-3.8, 7.3);
  ctx.lineTo(-3.8, 11.5);
  ctx.lineTo(-6.0, 11.5);
  ctx.stroke();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-3.8, 3.5);
  ctx.lineTo(-3.8, 2.5);
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-2.8, 6.0);
  ctx.bezierCurveTo(-1.5, 6.0, -0.5, 5.0, 2.6, 5.5);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-2.8, 7.0);
  ctx.bezierCurveTo(-1.0, 7.0, -0.5, 8.5, 2.6, 8.0);
  ctx.stroke();

  // AVIONICS BAY
  const avionicsGrad = ctx.createLinearGradient(0, 3.2, 0, 10.4);
  avionicsGrad.addColorStop(0, '#52789c');
  avionicsGrad.addColorStop(0.5, '#3d6082');
  avionicsGrad.addColorStop(1, '#2b4763');

  ctx.fillStyle = avionicsGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 2.6, 3.2, 6.4, 7.2, 0.8);
  ctx.fill();
  ctx.stroke();

  // 3 Whip Antennas
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(3.7, 2.5, 1.0, 0.8);
  ctx.fillRect(5.3, 2.5, 1.0, 0.8);
  ctx.fillRect(6.9, 2.5, 1.0, 0.8);

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(4.2, 2.5);
  ctx.lineTo(4.2, -0.5);
  ctx.moveTo(5.8, 2.5);
  ctx.lineTo(5.8, -1.8);
  ctx.moveTo(7.4, 2.5);
  ctx.lineTo(7.4, -1.0);
  ctx.stroke();

  // Connector Block
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, 2.0, 5.0, 0.8, 3.5, 0.2);
  ctx.fill();
  ctx.stroke();

  // Dials & Gauges
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(7.2, 5.2, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(7.2, 5.2);
  ctx.lineTo(7.8, 4.7);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(4.5, 5.2, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(4.5, 5.2, 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(4.5, 8.0, 0.9, 0, Math.PI * 2);
  ctx.arc(7.2, 8.0, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(4.5, 8.0, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  ctx.arc(7.2, 8.0, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Status Switch
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  roundRect(ctx, 5.4, 7.5, 1.0, 1.2, 0.2);
  ctx.fill();
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(5.9, 8.1, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Flush Access Hatch
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 0.8, -0.8, 2.4, 2.0, 0.4);
  ctx.fill();
  ctx.stroke();

  // PLAQUE
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -8.5, 12.4, 17, 3.2, 0.4);
  ctx.fill();
  ctx.stroke();

  // Screws
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(-7.8, 13.1, 0.3, 0, Math.PI * 2);
  ctx.arc(7.8, 13.1, 0.3, 0, Math.PI * 2);
  ctx.arc(-7.8, 14.9, 0.3, 0, Math.PI * 2);
  ctx.arc(7.8, 14.9, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Plaque text (crisp canvas render)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 0.85px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('VANGUARD ORBITAL YARDS', -4.8, 13.5);

  ctx.fillStyle = '#334155';
  ctx.font = '600 0.68px system-ui, sans-serif';
  ctx.fillText('(MARS) • VB-Exo Crusader', -4.8, 14.7);

  // Chevron Logo
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-6.8, 13.5);
  ctx.lineTo(-6.2, 13.1);
  ctx.lineTo(-5.6, 13.5);
  ctx.moveTo(-6.8, 14.0);
  ctx.lineTo(-6.2, 13.6);
  ctx.lineTo(-5.6, 14.0);
  ctx.moveTo(-6.8, 14.5);
  ctx.lineTo(-6.2, 14.1);
  ctx.lineTo(-5.6, 14.5);
  ctx.stroke();

  // Service Door
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 0.8, 16.3, 2.8, 4.0, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e2e8f0';
  ctx.beginPath();
  roundRect(ctx, 1.2, 16.7, 2.0, 3.2, 0.3);
  ctx.fill();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0.3, 17.0);
  ctx.lineTo(0.1, 17.0);
  ctx.lineTo(0.1, 18.6);
  ctx.lineTo(0.3, 18.6);
  ctx.stroke();

  // -----------------------------------------------------------------
  // 6. SUBTLE LANDING BLINKING LIGHTS (Gently pulsing, not prominent)
  // -----------------------------------------------------------------
  const kneePulse = 0.15 + (Math.sin(time * 4.2) * 0.5 + 0.5) * 0.45;
  const sponsonPulse = 0.15 + (Math.sin(time * 4.2 + 1.6) * 0.5 + 0.5) * 0.40;

  // Knee Landing Alignment Lights (Amber)
  ctx.save();
  ctx.globalAlpha = kneePulse;
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(-13.5, primaryKneeY, 1.3, 0, Math.PI * 2);
  ctx.arc(13.5, primaryKneeY, 1.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.arc(-13.5, primaryKneeY, 0.55, 0, Math.PI * 2);
  ctx.arc(13.5, primaryKneeY, 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Lower Sponson Clearance Beacons (Green)
  ctx.globalAlpha = sponsonPulse;
  ctx.fillStyle = '#4ade80';
  ctx.beginPath();
  ctx.arc(-17.8, 16.2, 1.2, 0, Math.PI * 2);
  ctx.arc(17.8, 16.2, 1.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.9;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#16a34a';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.arc(-17.8, 16.2, 0.5, 0, Math.PI * 2);
  ctx.arc(17.8, 16.2, 0.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

// =====================================================================
// 7. GOLIATH TRANSPORTER (Heavy Vehicle Carrier)
// =====================================================================
// =====================================================================
// 7. GOLIATH CARRIER (CT-950 Colossus Hauler)
// High-Fidelity Technical Blueprint Clone
// =====================================================================
export function drawGoliath(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number = 0,
  ship?: any,
  time: number = 0
) {
  // Ground contact / gear compression calculation
  const footPadY = 20.0 + gearSpringOffset;

  // Bay door & ramp deployment state (0.0 = closed/in-flight, 1.0 = fully deployed to ground)
  const rampProg = ship
    ? ship.rampProgress !== undefined
      ? ship.rampProgress
      : ship.isLanded
      ? 1.0
      : 0.0
    : 1.0;

  const isThrusting = ship ? (ship.thrust || 0) > 0.05 : false;
  const thrustPower = ship ? ship.thrust || 0 : 0;

  // =========================================================================
  // 1. FAR-SIDE (STARBOARD) LANDING LEGS & NOZZLE BELLS (Shadow Layer)
  // =========================================================================
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#0f172a';

  // Far Aft Thruster Bell (x = -24, bottom at y = 11 matches craft belly)
  ctx.beginPath();
  ctx.moveTo(-26.5, 8);
  ctx.lineTo(-21.5, 8);
  ctx.lineTo(-20.5, 11);
  ctx.lineTo(-27.5, 11);
  ctx.closePath();
  ctx.fill();

  // Far Aft Landing Leg & Ski Pad
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-24, 11);
  ctx.lineTo(-24, footPadY - 0.5);
  ctx.stroke();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-28, footPadY - 1.0, 8, 1.6, 0.8);
  } else {
    ctx.rect(-28, footPadY - 1.0, 8, 1.6);
  }
  ctx.fill();

  // Far Fwd Thruster Bell (x = 40, bottom at y = 11 matches craft belly)
  ctx.beginPath();
  ctx.moveTo(37.5, 8);
  ctx.lineTo(42.5, 8);
  ctx.lineTo(43.5, 11);
  ctx.lineTo(36.5, 11);
  ctx.closePath();
  ctx.fill();

  // Far Fwd Landing Leg & Ski Pad
  ctx.beginPath();
  ctx.moveTo(40, 11);
  ctx.lineTo(40, footPadY - 0.5);
  ctx.stroke();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(36, footPadY - 1.0, 8, 1.6, 0.8);
  } else {
    ctx.rect(36, footPadY - 1.0, 8, 1.6);
  }
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 3. MAIN CARGO & VEHICLE HOLD ("4. MAIN CARGO & VEHICLE HOLD")
  // The rear opening is DIAGONAL: sloping from (-54, -11) down to (-36, 10)
  // =========================================================================
  if (rampProg > 0.05) {
    ctx.save();
    ctx.globalAlpha = Math.min(1.0, rampProg * 1.2);

    // Recessed Cavernous Hold Chamber
    const bayGrad = ctx.createLinearGradient(-54, -11, -33, 10);
    bayGrad.addColorStop(0, '#070b14');
    bayGrad.addColorStop(0.5, '#0f172a');
    bayGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = bayGrad;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.8;

    ctx.beginPath();
    ctx.moveTo(-54, -10.5);
    ctx.lineTo(-36, -10.5);
    ctx.lineTo(-36, 10);
    ctx.lineTo(-54, -10.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cavern depth interior
    ctx.fillStyle = '#070b14';
    ctx.beginPath();
    ctx.moveTo(-54, -11);
    ctx.lineTo(-36, 10);
    ctx.lineTo(-33, 10);
    ctx.lineTo(-33, -11);
    ctx.closePath();
    ctx.fill();

    // Structural Bulkhead Ribs
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-44, -10.5); ctx.lineTo(-35, 3);
    ctx.moveTo(-50, -10.5); ctx.lineTo(-36, 7);
    ctx.stroke();

    // Ceiling Halogen Work Floodlights
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-45, -11, 5, 1.2, 0.4);
    } else {
      ctx.rect(-45, -11, 5, 1.2);
    }
    ctx.fill();

    // Soft warm halogen glow cone
    ctx.fillStyle = 'rgba(254, 240, 138, 0.12)';
    ctx.beginPath();
    ctx.ellipse(-42.5, -7, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Internal Vehicle Loading Tracks ("12. INTERNAL VEHICLE LOADING TRACKS")
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([1.5, 1.5]);
    ctx.beginPath();
    ctx.moveTo(-48, 2); ctx.lineTo(-36, 10);
    ctx.moveTo(-46, 4); ctx.lineTo(-35, 10);
    ctx.stroke();
    ctx.setLineDash([]);

    // Internal Telemetry Control Console (screens on inner bulkhead wall)
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-35.5, -3, 2.2, 3.5, 0.3);
    } else {
      ctx.rect(-35.5, -3, 2.2, 3.5);
    }
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#22c55e'; ctx.lineWidth = 0.4;
    ctx.beginPath(); ctx.moveTo(-35.2, -2); ctx.lineTo(-33.6, -2); ctx.stroke();
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath(); ctx.moveTo(-35.2, -1); ctx.lineTo(-34.0, -1); ctx.stroke();
    ctx.strokeStyle = '#eab308';
    ctx.beginPath(); ctx.moveTo(-35.2, 0); ctx.lineTo(-33.8, 0); ctx.stroke();

    // Parked Green Combat Rover / Tank inside Hold
    ctx.fillStyle = '#2d4a34';
    ctx.strokeStyle = '#14261a';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-41, 4.5, 6.8, 3.2, 0.8);
    } else {
      ctx.rect(-41, 4.5, 6.8, 3.2);
    }
    ctx.fill();
    ctx.stroke();

    // Tank turret
    ctx.fillStyle = '#365e3f';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-39.5, 2.8, 3.8, 1.8, 0.6);
    } else {
      ctx.rect(-39.5, 2.8, 3.8, 1.8);
    }
    ctx.fill();
    ctx.stroke();

    // Tank cannon barrel
    ctx.strokeStyle = '#14261a';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(-41.5, 3.6);
    ctx.lineTo(-39.5, 3.6);
    ctx.stroke();

    // Tank treads
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(-41.5, 7.2, 7.5, 1.4, 0.5);
    } else {
      ctx.rect(-41.5, 7.2, 7.5, 1.4);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    for (let wx = -40.5; wx <= -35.0; wx += 1.3) {
      ctx.beginPath();
      ctx.arc(wx, 7.9, 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    // Open Aft Door Leaves ("14. AFT DOOR (OPEN)")
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-54, -11);
    ctx.lineTo(-57, -13.5);
    ctx.lineTo(-52, -13.5);
    ctx.lineTo(-50, -11);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#dc2626';
    ctx.fillRect(-56, -13, 3, 1);

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(-36, 6.5);
    ctx.lineTo(-38.5, 6.5);
    ctx.lineTo(-39.5, 10);
    ctx.lineTo(-36, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // 4. REAR CARGO RAMP & HYDRAULICS ("10. REAR CARGO RAMP") - DYNAMIC DEPLOYMENT
  // Hinge sill at cargo floor corner: (-36, 10)
  // Closed position: folded along diagonal back of the craft from (-36, 10) to (-54, -11)
  // Deployed position: descends from (-36, 10) down to (-58, 18) and (-66, footPadY)
  // =========================================================================
  const hingeX = -36;
  const hingeY = 10;

  // Closed geometry (diagonal back of the craft)
  const closedMidX = -45;
  const closedMidY = -0.5;
  const closedEndX = -54;
  const closedEndY = -11;

  // Fully deployed geometry
  const deployedMidX = -58;
  const deployedMidY = 18.0 + (footPadY - 20.0) * 0.75;
  const deployedEndX = -66;
  const deployedEndY = footPadY;

  // Interpolated points based on rampProg
  const midX = closedMidX + (deployedMidX - closedMidX) * rampProg;
  const midY = closedMidY + (deployedMidY - closedMidY) * rampProg;
  const endX = closedEndX + (deployedEndX - closedEndX) * rampProg;
  const endY = closedEndY + (deployedEndY - closedEndY) * rampProg;

  ctx.save();

  if (rampProg < 0.05) {
    // -----------------------------------------------------------------------
    // RAMP CLOSED (In-flight / Cruise Mode)
    // Sits flush along the diagonal back edge from (-36, 10) to (-54, -11)
    // -----------------------------------------------------------------------
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY);
    ctx.lineTo(closedEndX, closedEndY);
    ctx.lineTo(closedEndX - 2.5, closedEndY + 1.2);
    ctx.lineTo(hingeX - 2.5, hingeY + 1.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Red diagonal accent stripe continuation on closed door
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(-42, 3);
    ctx.lineTo(-44, 1);
    ctx.lineTo(-46.5, 2.5);
    ctx.lineTo(-44.5, 4.5);
    ctx.closePath();
    ctx.fill();

    // Heavy hydraulic locking clamps
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.4;
    ctx.fillRect(-38.5, 7.5, 2.5, 1.5);
    ctx.fillRect(-51.5, -7.5, 2.5, 1.5);
  } else {
    // -----------------------------------------------------------------------
    // RAMP DEPLOYING / DEPLOYED (Loading Vehicles)
    // -----------------------------------------------------------------------
    // Dual Telescoping Hydraulic Rams ("11. RAMP HYDRAULICS")
    const trunnionX = -33.2;
    const trunnionY = 11.2;
    const bracketX = hingeX + (midX - hingeX) * 0.55;
    const bracketY = hingeY + (midY - hingeY) * 0.55 + 1.2;

    // Chassis Trunnion Bracket
    ctx.fillStyle = '#dc2626';
    ctx.strokeStyle = '#991b1b';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(trunnionX - 1.3, trunnionY - 1.0, 2.5, 2.0, 0.5);
    } else {
      ctx.rect(trunnionX - 1.3, trunnionY - 1.0, 2.5, 2.0);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(trunnionX, trunnionY, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Cylinder 1 (outer barrel + chrome rod)
    const cylMidX = trunnionX + (bracketX - trunnionX) * 0.55;
    const cylMidY = trunnionY + (bracketY - trunnionY) * 0.55;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(trunnionX, trunnionY);
    ctx.lineTo(cylMidX, cylMidY);
    ctx.stroke();

    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(cylMidX, cylMidY);
    ctx.lineTo(bracketX, bracketY);
    ctx.stroke();

    // Ramp underside pivot bracket
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.arc(bracketX, bracketY, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Main Ramp Bed descending to (midX, midY)
    const rampGrad = ctx.createLinearGradient(hingeX, hingeY, midX, midY);
    rampGrad.addColorStop(0, '#475569');
    rampGrad.addColorStop(0.5, '#334155');
    rampGrad.addColorStop(1, '#1e293b');

    ctx.fillStyle = rampGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY);
    ctx.lineTo(midX, midY);
    ctx.lineTo(midX, midY + 1.2);
    ctx.lineTo(hingeX, hingeY + 1.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Traction ribs across main ramp bed
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.8;
    for (let step = 0.1; step < 0.95; step += 0.13) {
      const rx = hingeX + (midX - hingeX) * step;
      const ry = hingeY + (midY - hingeY) * step;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx, ry + 1.1);
      ctx.stroke();
    }

    // Raised Side Curbs with Yellow & Black Hazard Chevrons
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(hingeX, hingeY - 0.5);
    ctx.lineTo(midX, midY - 0.5);
    ctx.lineTo(midX, midY + 0.5);
    ctx.lineTo(hingeX, hingeY + 0.5);
    ctx.closePath();
    ctx.fill();

    // Angled black hazard chevrons along curb
    ctx.fillStyle = '#0f172a';
    for (let step = 0.12; step < 0.95; step += 0.18) {
      const cx1 = hingeX + (midX - hingeX) * step;
      const cy1 = hingeY + (midY - hingeY) * step;
      ctx.beginPath();
      ctx.moveTo(cx1, cy1 - 0.5);
      ctx.lineTo(cx1 - 1.8, cy1 + 0.2);
      ctx.lineTo(cx1 - 1.2, cy1 + 0.6);
      ctx.lineTo(cx1 + 0.6, cy1 - 0.1);
      ctx.closePath();
      ctx.fill();
    }

    // Folding Ramp Section ("13. FOLDING RAMP SECTION") lying on ground
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX, endY + 0.6);
    ctx.lineTo(midX, midY + 1.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Hinge line between main ramp and folding section
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX, midY + 1.2);
    ctx.stroke();

    // Hazard curb on folding section
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX + 1, endY + 0.4);
    ctx.lineTo(midX, midY + 0.8);
    ctx.closePath();
    ctx.fill();

    // Ground Crew Technicians in Orange Hazard Suits Descending Ramp
    if (rampProg > 0.15) {
      const drawTech = (tx: number, ty: number, hasWand: boolean = false) => {
        ctx.save();
        ctx.translate(tx, ty);

        // Helmet
        ctx.fillStyle = '#f97316';
        ctx.strokeStyle = '#9a3412';
        ctx.lineWidth = 0.25;
        ctx.beginPath();
        ctx.arc(0, -2.6, 0.65, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Visor slit
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(-0.35, -2.7, 0.7, 0.3);

        // Torso
        ctx.fillStyle = '#ea580c';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-0.45, -1.9, 0.9, 1.8, 0.3);
        } else {
          ctx.rect(-0.45, -1.9, 0.9, 1.8);
        }
        ctx.fill();

        // Legs
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(-0.25, -0.1); ctx.lineTo(-0.35, 1.5);
        ctx.moveTo(0.25, -0.1); ctx.lineTo(0.35, 1.5);
        ctx.stroke();

        if (hasWand) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 0.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(0.4, -1.0); ctx.lineTo(1.3, -2.2);
          ctx.stroke();
          ctx.fillStyle = '#4ade80';
          ctx.beginPath();
          ctx.arc(1.3, -2.2, 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      };

      // Tech 1: At base of ramp on terrain with guidance wand
      const t1x = -64;
      const t1y = footPadY - 1.5;
      drawTech(t1x, t1y, true);

      // Tech 2: Halfway down descending ramp
      const s2 = 0.55;
      const t2x = hingeX + (midX - hingeX) * s2;
      const t2y = hingeY + (midY - hingeY) * s2 - 1.5;
      drawTech(t2x, t2y, false);

      // Tech 3: Exiting cargo hold at ramp head
      const s3 = 0.18;
      const t3x = hingeX + (midX - hingeX) * s3;
      const t3y = hingeY + (midY - hingeY) * s3 - 1.5;
      drawTech(t3x, t3y, false);
    }
  }
  ctx.restore();

  // =========================================================================
  // 5. MAIN FUSELAGE HULL: MULTI-TONE GREY PANELS & RED STRIPES
  // =========================================================================
  ctx.save();

  // Primary Fuselage Base Shell
  const hullGrad = ctx.createLinearGradient(0, -16, 0, 11);
  hullGrad.addColorStop(0, '#475569');
  hullGrad.addColorStop(0.35, '#334155');
  hullGrad.addColorStop(0.85, '#1e293b');
  hullGrad.addColorStop(1, '#0f172a');

  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-44, -16);
  ctx.lineTo(32, -16);
  ctx.lineTo(44, -15);
  ctx.lineTo(52, -6);
  ctx.lineTo(56, 0);
  ctx.lineTo(57, 7);
  ctx.lineTo(48, 11);
  ctx.lineTo(-36, 11);
  ctx.lineTo(-54, -11);
  ctx.lineTo(-44, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Multi-Tone Grey Panel 1: Aft Cargo Hold Structural Frame (-36 to -29)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-36, 11);
  ctx.lineTo(-29, 11);
  ctx.lineTo(-29, -14);
  ctx.lineTo(-39, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-33, -14);
  ctx.lineTo(-33, 11);
  ctx.stroke();

  // Upper Dorsal Spine Armor Plate (-44 to 44, y = -16 to -14)
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-44, -16);
  ctx.lineTo(32, -16);
  ctx.lineTo(44, -15);
  ctx.lineTo(43, -13.5);
  ctx.lineTo(32, -14);
  ctx.lineTo(-43, -14);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-44, -16);
  ctx.lineTo(32, -16);
  ctx.stroke();

  // Red Armor Gradient Helper
  const redGrad = ctx.createLinearGradient(0, -16, 0, 11);
  redGrad.addColorStop(0, '#dc2626');
  redGrad.addColorStop(0.4, '#b91c1c');
  redGrad.addColorStop(1, '#7f1d1d');

  // Red Accent 1: Aft Roof Bevel Plate ("5. REAR FTDRAULIENT")
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-48, -14.2);
  ctx.lineTo(-42, -15.5);
  ctx.lineTo(-42, -13.8);
  ctx.lineTo(-48, -12.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Red Accent 2: Crew Quarters Surrounding Armor ("3. CREW QUARTERS")
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-31, -15.0, 11, 4.2, 0.8);
  } else {
    ctx.rect(-31, -15.0, 11, 4.2);
  }
  ctx.fill();
  ctx.stroke();

  // Crew Quarters Tinted Observation Window Slit
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-28, -13.8, 6.5, 1.4, 0.4);
  } else {
    ctx.rect(-28, -13.8, 6.5, 1.4);
  }
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#e0f2fe';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-27.5, -13.1);
  ctx.lineTo(-22, -13.1);
  ctx.stroke();

  // Small adjacent red service hatch
  ctx.fillStyle = '#b91c1c';
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(-19, -14.2, 2.2, 2.4, 0.4);
  } else {
    ctx.rect(-19, -14.2, 2.2, 2.4);
  }
  ctx.fill();
  ctx.stroke();

  // Red Stripe 3: Rear Diagonal Red Armor Band (behind rear thruster)
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-17, -16);
  ctx.lineTo(-14, -16);
  ctx.lineTo(-19, 11);
  ctx.lineTo(-22, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Yellow & Black Hazard Chevron Badge on Upper Hull Chamfer
  ctx.fillStyle = '#eab308';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.moveTo(-13, -15.5);
  ctx.lineTo(-6, -15.5);
  ctx.lineTo(-5, -13);
  ctx.lineTo(-12, -13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(-12, -15.5); ctx.lineTo(-10.5, -15.5); ctx.lineTo(-9.5, -13); ctx.lineTo(-11, -13);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(-9, -15.5); ctx.lineTo(-7.5, -15.5); ctx.lineTo(-6.5, -13); ctx.lineTo(-8, -13);
  ctx.closePath();
  ctx.fill();

  // Multi-Tone Grey Panel 2: Mid-Fuselage Slate Plates (-14 to 6)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.rect(-14, -14, 20, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.rect(-14, 4, 20, 7);
  ctx.fill();
  ctx.stroke();

  // Red Stripe 4: Primary Mid-Fuselage Diagonal Red Armor Stripe
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 0.4;

  // Upper segment (above nameplate)
  ctx.beginPath();
  ctx.moveTo(6, -16); ctx.lineTo(9, -16); ctx.lineTo(8, -3.5); ctx.lineTo(5, -3.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lower segment (below nameplate)
  ctx.beginPath();
  ctx.moveTo(8, 3.5); ctx.lineTo(11, 3.5); ctx.lineTo(7, 11); ctx.lineTo(4, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Multi-Tone Grey Panel 3: Forward Mid-Fuselage Plates (6 to 22)
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.rect(6, -14, 16, 25);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Red Stripe 5: Forward Diagonal Red Armor Stripe (between nameplate & fwd thruster)
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(26, -16); ctx.lineTo(29, -16); ctx.lineTo(24, 11); ctx.lineTo(21, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Multi-Tone Grey Panel 4: Forward Section (29 to 36)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(29, -16); ctx.lineTo(35, -16); ctx.lineTo(35, 11); ctx.lineTo(24, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Prominent Central Craft Nameplate ("15. CRAFT NAME DISPLAY")
  // Shifted right to x = 1 to 29 (center x = 15) so it's fully uncovered by back thruster
  ctx.fillStyle = '#070b14';
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(1, -3.8, 28, 7.6, 1.0);
  } else {
    ctx.rect(1, -3.8, 28, 7.6);
  }
  ctx.fill();
  ctx.stroke();

  // Inner contour line
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(1.8, -3.0, 26.4, 6.0, 0.6);
  } else {
    ctx.rect(1.8, -3.0, 26.4, 6.0);
  }
  ctx.stroke();

  // Bold Off-White Lettering: GOLIATH CARRIER
  ctx.fillStyle = '#f8fafc';
  ctx.font = '900 4.8px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOLIATH CARRIER', 15, 0);

  // Red Stripe 6: Bridge / Cockpit Roof Red Accent Bar
  ctx.fillStyle = redGrad;
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(36, -16.5, 7, 1.5, 0.3);
  } else {
    ctx.rect(36, -16.5, 7, 1.5);
  }
  ctx.fill();
  ctx.stroke();

  // Cockpit & Bridge Section ("1. COCKPIT & BRIDGE")
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(44, -15); ctx.lineTo(52, -6); ctx.lineTo(48, 0); ctx.lineTo(42, -5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(48, 0); ctx.lineTo(56, 0); ctx.lineTo(52, 7); ctx.lineTo(48, 11); ctx.lineTo(44, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Polarized Cyan Cockpit Visor / Windshield
  const visorGrad = ctx.createLinearGradient(49, -6, 56, 0);
  visorGrad.addColorStop(0, '#38bdf8');
  visorGrad.addColorStop(0.5, '#0284c7');
  visorGrad.addColorStop(1, '#0369a1');

  ctx.fillStyle = visorGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(49, -6); ctx.lineTo(53, -6); ctx.lineTo(56, 0); ctx.lineTo(49, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Specular streak
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.lineWidth = 0.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(50, -5); ctx.lineTo(55, -0.5);
  ctx.stroke();

  // White structural mullions
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(52, -6); ctx.lineTo(52.5, 0);
  ctx.stroke();

  // Pilot Silhouettes inside bridge
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(51.5, -2.5, 0.7, 0, Math.PI * 2);
  ctx.arc(54, -2.0, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Cockpit Red Hazard Warning Decal
  ctx.fillStyle = '#dc2626';
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 0.2;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(51, 2.5, 1.6, 1.6, 0.2);
  } else {
    ctx.rect(51, 2.5, 1.6, 1.6);
  }
  ctx.fill();
  ctx.stroke();

  // Dark Composite Nose Cone
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.moveTo(56, 0); ctx.lineTo(57, 7); ctx.lineTo(54, 7); ctx.lineTo(53, 0);
  ctx.closePath();
  ctx.fill();

  // Forward Pitot & Sensor Cannon Probe
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(57, 6.5); ctx.lineTo(65, 6.5);
  ctx.stroke();

  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(57, 6.5); ctx.lineTo(63, 6.5);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(65, 6.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Ventral Keel & Stabilizing Fins ("8. STABILIZING FINS")
  // Mid-Fuselage Ventral Stabilizing Fin
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(3, 11); ctx.lineTo(15, 11); ctx.lineTo(12, 14.5); ctx.lineTo(4, 14.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(4.5, 14.5); ctx.lineTo(11.5, 14.5);
  ctx.stroke();

  // Forward Ventral Fin
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(44, 11); ctx.lineTo(53, 11); ctx.lineTo(50, 14.5); ctx.lineTo(45, 14.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dorsal Sensor Array & Communications ("2. SENSOR ARRAY & COMMUNICATIONS")
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.0;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, -16); ctx.lineTo(-32, -22.5);
  ctx.stroke();

  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-30, -16); ctx.lineTo(-30, -21.5);
  ctx.stroke();

  // Blinking Red Beacon Light at Antenna Tip
  const animTime = time > 0 ? time : (typeof performance !== 'undefined' ? performance.now() / 1000 : 0);
  const beaconBlink = Math.sin(animTime * 7) > 0.0;

  ctx.fillStyle = beaconBlink ? '#ffffff' : '#dc2626';
  ctx.beginPath();
  ctx.arc(-32, -22.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  if (beaconBlink) {
    ctx.save();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
    ctx.beginPath();
    ctx.arc(-32, -22.5, 2.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(254, 202, 202, 0.95)';
    ctx.beginPath();
    ctx.arc(-32, -22.5, 1.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Secondary antenna mast strobe
  const secStrobe = Math.sin(animTime * 5 + 1.8) > 0.2;
  ctx.fillStyle = secStrobe ? '#38bdf8' : '#0369a1';
  ctx.beginPath();
  ctx.arc(-30, -21.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  if (secStrobe) {
    ctx.save();
    ctx.fillStyle = 'rgba(56, 189, 248, 0.55)';
    ctx.beginPath();
    ctx.arc(-30, -21.5, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Swivel Radar Turret on Bridge Roof
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(38.5, -18.5, 4.0, 2.5, 0.6);
  } else {
    ctx.rect(38.5, -18.5, 4.0, 2.5);
  }
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(42.5, -17.5); ctx.lineTo(45.5, -17.5);
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(40.5, -17.2, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // =========================================================================
  // 6. PORT-SIDE VTOL THRUSTER PODS (SIDE-MOUNTED & SKI GEAR)
  // IN THIS CRAFT THE THRUSTERS ARE ON THE SIDE AND THEIR BOTTOM MATCHES THE CRAFT BELLY (y = 11)
  // REAR THRUSTER IS MOVED FURTHER BACK TO x = -24
  // FORWARD THRUSTER IS AT x = 40
  // =========================================================================
  const drawThrusterPod = (podX: number) => {
    ctx.save();

    // -----------------------------------------------------------------------
    // Articulated Ski Landing Gear (Extends down from belly y=11 to footPadY)
    // -----------------------------------------------------------------------
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(podX - 1.5, 10.5, 3.0, 1.5);

    // Heavy Hydraulic Cylinder Housing
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(podX - 1.2, 11.5, 2.4, 4.0, 0.5);
    } else {
      ctx.rect(podX - 1.2, 11.5, 2.4, 4.0);
    }
    ctx.fill();
    ctx.stroke();

    // Chrome Sliding Oleo Piston Rod
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(podX, 14.5);
    ctx.lineTo(podX, footPadY - 0.8);
    ctx.stroke();

    // Dual-Pivot Ankle Knuckle
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.arc(podX, footPadY - 0.8, 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(podX, footPadY - 0.8, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Wide Articulated Ski Footpad resting on terrain (y = footPadY)
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(podX - 6, footPadY - 0.8);
    ctx.lineTo(podX - 4, footPadY + 0.2);
    ctx.lineTo(podX + 4, footPadY + 0.2);
    ctx.lineTo(podX + 6, footPadY - 0.8);
    ctx.lineTo(podX + 5, footPadY - 0.8);
    ctx.lineTo(podX + 3, footPadY - 0.2);
    ctx.lineTo(podX - 3, footPadY - 0.2);
    ctx.lineTo(podX - 5, footPadY - 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Traction cleats beneath ski pad
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(podX - 2, footPadY + 0.2, 1.2, 0.5);
    ctx.fillRect(podX + 1, footPadY + 0.2, 1.2, 0.5);

    // -----------------------------------------------------------------------
    // Thruster Pod Cylindrical Casing (Side-Mounted, top y=-8.5 to y=7.0)
    // -----------------------------------------------------------------------
    const podCasingGrad = ctx.createLinearGradient(podX - 5, 0, podX + 5, 0);
    podCasingGrad.addColorStop(0, '#f8fafc');
    podCasingGrad.addColorStop(0.4, '#e2e8f0');
    podCasingGrad.addColorStop(0.8, '#cbd5e1');
    podCasingGrad.addColorStop(1, '#94a3b8');

    ctx.fillStyle = podCasingGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(podX - 5, -6.5, 10, 13.5, 1.5);
    } else {
      ctx.rect(podX - 5, -6.5, 10, 13.5);
    }
    ctx.fill();
    ctx.stroke();

    // Rounded Intake Dome Cap with Metallic Copper Collar
    const copperGrad = ctx.createLinearGradient(0, -9, 0, 11);
    copperGrad.addColorStop(0, '#f59e0b');
    copperGrad.addColorStop(0.35, '#d97706');
    copperGrad.addColorStop(0.7, '#b45309');
    copperGrad.addColorStop(1, '#78350f');

    ctx.fillStyle = copperGrad;
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(podX - 4.5, -6.5);
    ctx.quadraticCurveTo(podX, -9.0, podX + 4.5, -6.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(podX - 4.5, -6.5);
    ctx.lineTo(podX + 4.5, -6.5);
    ctx.stroke();

    // Pod Inset Red Status Badge with Gauges
    ctx.fillStyle = '#b91c1c';
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(podX - 2.5, -1.0, 5.0, 5.0, 0.6);
    } else {
      ctx.rect(podX - 2.5, -1.0, 5.0, 5.0);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(podX, 1.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(podX, 1.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Forward Aerodynamic Winglet ("8a. STABILIZING FINS (FRONT)")
    ctx.fillStyle = '#cbd5e1';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(podX + 5, 6.5);
    ctx.lineTo(podX + 11, 8.5);
    ctx.lineTo(podX + 5, 9.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Flared Copper Exhaust Nozzle Bell: FROM y=7.0 TO y=11.0!
    // NOZZLE BELL LIP IS AT y=11.0 -> EXACTLY MATCHES CRAFT BELLY LINE!
    ctx.fillStyle = copperGrad;
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(podX - 3.5, 7.0);
    ctx.lineTo(podX + 3.5, 7.0);
    ctx.lineTo(podX + 4.5, 11.0);
    ctx.lineTo(podX - 4.5, 11.0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cyan Radiant Throat Glow at Nozzle Lip (y = 11.0)
    const throatGrad = ctx.createRadialGradient(podX, 11.0, 0, podX, 11.0, 4.5);
    throatGrad.addColorStop(0, '#38bdf8');
    throatGrad.addColorStop(0.7, '#0284c7');
    throatGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');

    ctx.fillStyle = throatGrad;
    ctx.beginPath();
    ctx.ellipse(podX, 11.0, 4.5, 0.9, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // Draw Rear Thruster Pod (x = -24)
  drawThrusterPod(-24);

  // Draw Forward Thruster Pod (x = 40)
  drawThrusterPod(40);

  // =========================================================================
  // 7. ACTIVE FLAME PLUMES (When firing main lift thrusters)
  // Plumes shoot downwards directly from y = 11.0 (matching the nozzle bell lip and belly!)
  // =========================================================================
  if (isThrusting && thrustPower > 0.05) {
    ctx.save();
    const flameLen = (14 + Math.random() * 8) * Math.min(1.8, thrustPower * 1.5);
    const thrusterXList = [-24, 40];

    for (const tx of thrusterXList) {
      // Outer Amber/Red Exhaust Expansion
      const outerFlame = ctx.createLinearGradient(tx, 11.0, tx, 11.0 + flameLen);
      outerFlame.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
      outerFlame.addColorStop(0.4, 'rgba(245, 158, 11, 0.6)');
      outerFlame.addColorStop(0.8, 'rgba(234, 179, 8, 0.3)');
      outerFlame.addColorStop(1, 'rgba(234, 179, 8, 0)');

      ctx.fillStyle = outerFlame;
      ctx.beginPath();
      ctx.moveTo(tx - 4.5, 11.0);
      ctx.lineTo(tx + 4.5, 11.0);
      ctx.lineTo(tx + 1.2, 11.0 + flameLen);
      ctx.lineTo(tx - 1.2, 11.0 + flameLen);
      ctx.closePath();
      ctx.fill();

      // Inner High-Temperature Plasma Core (Cyan/White)
      const coreFlame = ctx.createLinearGradient(tx, 11.0, tx, 11.0 + flameLen * 0.65);
      coreFlame.addColorStop(0, '#ffffff');
      coreFlame.addColorStop(0.3, '#38bdf8');
      coreFlame.addColorStop(0.8, '#0284c7');
      coreFlame.addColorStop(1, 'rgba(2, 132, 199, 0)');

      ctx.fillStyle = coreFlame;
      ctx.beginPath();
      ctx.moveTo(tx - 2.6, 11.0);
      ctx.lineTo(tx + 2.6, 11.0);
      ctx.lineTo(tx + 0.6, 11.0 + flameLen * 0.65);
      ctx.lineTo(tx - 0.6, 11.0 + flameLen * 0.65);
      ctx.closePath();
      ctx.fill();

      // Shock Diamonds
      ctx.fillStyle = '#ffffff';
      const diamondDist = [3.5, 7.0, 11.0];
      for (const d of diamondDist) {
        if (d < flameLen * 0.7) {
          ctx.beginPath();
          ctx.ellipse(tx, 11.0 + d, 1.2, 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }
}

export function drawBehemoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number = 0,
  ship?: ShipState,
  time: number = 0,
  world?: any
) {
  const primaryColor = config.primaryColor || '#e2e8f0';
  const visorColor = config.visorColor || '#0284c7';

  // Ground level contact calculation
  const footPadY = 22 + gearSpringOffset;

  // -------------------------------------------------------------------------
  // 1. DYNAMIC OPERATIONAL STATES
  // -------------------------------------------------------------------------
  // Mechanic 1: Vehicle loading/unloading ramp
  // User Requirement: "The ramp door at the back is always open in-game, but it should only open when loading vehicles."
  const isVehicleLoading =
    (ship?.rampProgress !== undefined && ship.rampProgress > 0.01) ||
    ship?.rampState === 'opening' ||
    ship?.rampState === 'open' ||
    ship?.rampState === 'closing';
  const rampProg = ship?.rampProgress !== undefined ? ship.rampProgress : (isVehicleLoading ? 1.0 : 0.0);

  // Mechanic 2: Cargo approach & crane activation
  let craneFactor = ship?.cargoApproachFactor ?? 0;
  if (ship?.attachedCargo || ship?.attachedCargoId) {
    craneFactor = Math.max(craneFactor, 1.0);
  }
  if (world && ship?.pos) {
    let minCargoD = 99999;
    if (world.cargoPlatforms) {
      for (const cp of world.cargoPlatforms) {
        const cx = cp.center?.x ?? ((cp.x1 !== undefined && cp.x2 !== undefined) ? (cp.x1 + cp.x2) / 2 : (cp.pos?.x ?? 0));
        const cy = cp.center?.y ?? (cp.y ?? cp.pos?.y ?? 0);
        const d = Math.hypot(ship.pos.x - cx, ship.pos.y - cy);
        if (d < minCargoD) minCargoD = d;
      }
    }
    if (world.cargoItems) {
      for (const ci of world.cargoItems) {
        if (!ci.isDelivered && !ci.isDetonated) {
          const d = Math.hypot(ship.pos.x - ci.pos.x, ship.pos.y - ci.pos.y);
          if (d < minCargoD) minCargoD = d;
        }
      }
    }
    const distFactor = Math.max(0, Math.min(1.0, (280 - minCargoD) / 160));
    craneFactor = Math.max(craneFactor, distFactor);
  }

  // Engine throttle glow & idle animations
  const leftThrust = typeof ship?.leftThruster === 'number' ? ship.leftThruster : (ship?.leftThruster ? 1.0 : 0);
  const rightThrust = typeof ship?.rightThruster === 'number' ? ship.rightThruster : (ship?.rightThruster ? 1.0 : 0);
  const isFlying = !ship?.isLanded && !ship?.isCrashed;
  const pulseCore = Math.sin(time * 3.5) * 0.15 + 0.85;

  // =========================================================================
  // 2. REAR PROPULSION & MAIN TWIN ROCKET TORCH BELLS (Aft x=56..64)
  // =========================================================================
  // Upper rocket bell (y=-4..2)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(55, -3);
  ctx.lineTo(63.5, -4.5);
  ctx.lineTo(63.5, 1.5);
  ctx.lineTo(55, 0);
  ctx.closePath();
  const gradAftUp = ctx.createLinearGradient(55, -4, 64, 2);
  gradAftUp.addColorStop(0, '#1e293b');
  gradAftUp.addColorStop(0.5, '#334155');
  gradAftUp.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradAftUp;
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Upper nozzle throat glow
  ctx.beginPath();
  ctx.ellipse(63.5, -1.5, 1.2, 2.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(63.5, -1.5, 0.6, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Lower rocket bell (y=3..9)
  ctx.beginPath();
  ctx.moveTo(55, 4);
  ctx.lineTo(63.5, 2.5);
  ctx.lineTo(63.5, 8.5);
  ctx.lineTo(55, 7);
  ctx.closePath();
  const gradAftDn = ctx.createLinearGradient(55, 3, 64, 9);
  gradAftDn.addColorStop(0, '#1e293b');
  gradAftDn.addColorStop(0.5, '#334155');
  gradAftDn.addColorStop(1, '#0f172a');
  ctx.fillStyle = gradAftDn;
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Lower nozzle throat glow
  ctx.beginPath();
  ctx.ellipse(63.5, 5.5, 1.2, 2.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.ellipse(63.5, 5.5, 0.6, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 3. VENTRAL VTOL LIFT-FAN THRUSTER ASSEMBLIES (Front x=-18, Rear x=36)
  // =========================================================================
  const drawVentralThruster = (cx: number, cy: number, thrustVal: number) => {
    ctx.save();
    // Heavy nacelle mounting collar
    ctx.beginPath();
    ctx.rect(cx - 5.5, cy - 5, 11, 4.5);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Flared titanium bell housing (downward lip at y=16)
    ctx.beginPath();
    ctx.moveTo(cx - 4.5, cy - 0.5);
    ctx.lineTo(cx - 6.2, cy + 5);
    ctx.lineTo(cx + 6.2, cy + 5);
    ctx.lineTo(cx + 4.5, cy - 0.5);
    ctx.closePath();
    const bellGrad = ctx.createLinearGradient(cx - 6, cy, cx + 6, cy + 5);
    bellGrad.addColorStop(0, '#334155');
    bellGrad.addColorStop(0.5, '#475569');
    bellGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = bellGrad;
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Heat shielding bands (copper / bronze rings)
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(cx - 5.2, cy + 1.8);
    ctx.lineTo(cx + 5.2, cy + 1.8);
    ctx.moveTo(cx - 5.8, cy + 3.6);
    ctx.lineTo(cx + 5.8, cy + 3.6);
    ctx.stroke();

    // Nozzle internal throat glow
    ctx.beginPath();
    ctx.ellipse(cx, cy + 5, 5.5, 1.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = thrustVal > 0.1 || isFlying ? '#0284c7' : '#0f172a';
    ctx.fill();
    if (thrustVal > 0.1 || isFlying) {
      ctx.beginPath();
      ctx.ellipse(cx, cy + 5, 3.2, 0.9, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#e0f2fe';
      ctx.fill();
    }
    ctx.restore();
  };

  drawVentralThruster(-18, 11, leftThrust);
  drawVentralThruster(36, 11, rightThrust);

  // =========================================================================
  // 4. LANDING GEAR SYSTEM (Isolated paths, never connecting)
  // =========================================================================
  // FRONT GEAR: Articulated Hydraulic Ski Rocker Strut at x=-26
  ctx.save();
  ctx.beginPath();
  // Upper trunnion housing on hull
  ctx.rect(-28, 10, 4, 3);
  ctx.fillStyle = '#334155';
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Chrome hydraulic cylinder & piston
  const frontStrutTopY = 12.5;
  const frontStrutBotY = footPadY - 2.5;
  ctx.beginPath();
  ctx.moveTo(-26, frontStrutTopY);
  ctx.lineTo(-26, frontStrutBotY);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Inner chrome slider rod
  ctx.beginPath();
  ctx.moveTo(-26, frontStrutTopY + 3);
  ctx.lineTo(-26, frontStrutBotY);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Scissor torque link
  const kneeY = (frontStrutTopY + frontStrutBotY) * 0.5;
  ctx.beginPath();
  ctx.moveTo(-26, frontStrutTopY + 2);
  ctx.lineTo(-22.5, kneeY);
  ctx.lineTo(-26, frontStrutBotY - 1);
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-22.5, kneeY, 0.9, 0, Math.PI * 2);
  ctx.fillStyle = '#f97316';
  ctx.fill();

  // Front Ski Footpad (strictly isolated beginPath)
  ctx.beginPath();
  ctx.moveTo(-34, footPadY - 2.0);
  ctx.lineTo(-32, footPadY);
  ctx.lineTo(-20, footPadY);
  ctx.lineTo(-18, footPadY - 1.5);
  ctx.lineTo(-20, footPadY - 3.2);
  ctx.lineTo(-32, footPadY - 3.2);
  ctx.closePath();
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Ski runner rocker shoe
  ctx.beginPath();
  ctx.rect(-31, footPadY - 1.2, 11, 1.2);
  ctx.fillStyle = '#f97316';
  ctx.fill();
  ctx.restore();

  // REAR GEAR: Heavy Industrial Caterpillar Track Unit at x=48
  ctx.save();
  // Suspension mounting brackets from hull (x=42 & x=54)
  ctx.beginPath();
  ctx.moveTo(43, 11);
  ctx.lineTo(41, footPadY - 5);
  ctx.moveTo(53, 11);
  ctx.lineTo(55, footPadY - 5);
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // Twin chrome shock absorber rods
  ctx.beginPath();
  ctx.moveTo(43, 12);
  ctx.lineTo(41.5, footPadY - 4.5);
  ctx.moveTo(53, 12);
  ctx.lineTo(54.5, footPadY - 4.5);
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Heavy Track Assembly Carriage Chassis (x=36..60, y=footPadY-5..footPadY)
  ctx.beginPath();
  ctx.rect(36, footPadY - 5.5, 24, 5.5);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Continuous rubber/titanium crawler tread belt
  ctx.beginPath();
  ctx.rect(35.5, footPadY - 1.6, 25, 1.6);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Track tread cleats
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let tx = 37; tx <= 59; tx += 2.8) {
    ctx.moveTo(tx, footPadY - 1.6);
    ctx.lineTo(tx, footPadY);
  }
  ctx.stroke();

  // Track Road Wheels & Sprockets (6 bogie wheels)
  for (let wx = 38.5; wx <= 57.5; wx += 3.8) {
    ctx.beginPath();
    ctx.arc(wx, footPadY - 3.2, 1.4, 0, Math.PI * 2);
    ctx.fillStyle = '#475569';
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    // Center cap
    ctx.beginPath();
    ctx.arc(wx, footPadY - 3.2, 0.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f97316';
    ctx.fill();
  }

  // Safety hazard chevrons on track carriage
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(38, footPadY - 4.8);
  ctx.lineTo(40, footPadY - 4.8);
  ctx.lineTo(39, footPadY - 2.2);
  ctx.lineTo(37, footPadY - 2.2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(56, footPadY - 4.8);
  ctx.lineTo(58, footPadY - 4.8);
  ctx.lineTo(57, footPadY - 2.2);
  ctx.lineTo(55, footPadY - 2.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 5. MAIN PORT-SIDE GANTRY TRUSS STRUCTURE (x=-66 to x=-26)
  // =========================================================================
  ctx.save();
  // Main Gantry Backplane & Interior Trough
  ctx.beginPath();
  ctx.moveTo(-66, -9);
  ctx.lineTo(-26, -9);
  ctx.lineTo(-26, 10);
  ctx.lineTo(-56, 4);
  ctx.lineTo(-66, 2);
  ctx.closePath();
  const gantryBackGrad = ctx.createLinearGradient(-66, -9, -26, 10);
  gantryBackGrad.addColorStop(0, '#0f172a');
  gantryBackGrad.addColorStop(0.6, '#1e293b');
  gantryBackGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = gantryBackGrad;
  ctx.fill();

  // Upper heavy structural chord (gunmetal I-beam with orange runner track)
  ctx.beginPath();
  ctx.rect(-66, -9, 40, 3.2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Orange overhead crane runner track
  ctx.beginPath();
  ctx.rect(-65, -7.2, 38, 1.2);
  ctx.fillStyle = '#f97316';
  ctx.fill();

  // Lower angled structural chord
  ctx.beginPath();
  ctx.moveTo(-66, 2);
  ctx.lineTo(-56, 4);
  ctx.lineTo(-26, 10);
  ctx.lineTo(-26, 7.8);
  ctx.lineTo(-56, 2.2);
  ctx.lineTo(-66, 0.4);
  ctx.closePath();
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Heavy diagonal Warren truss braces
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  const trussNodes = [
    { x: -66, yTop: -6.5, yBot: 1.2 },
    { x: -56, yTop: -6.5, yBot: 3.2 },
    { x: -46, yTop: -6.5, yBot: 5.2 },
    { x: -36, yTop: -6.5, yBot: 7.2 },
    { x: -26, yTop: -6.5, yBot: 9.0 },
  ];
  for (let i = 0; i < trussNodes.length - 1; i++) {
    const n1 = trussNodes[i];
    const n2 = trussNodes[i + 1];
    // Vertical upright
    ctx.moveTo(n1.x, n1.yTop);
    ctx.lineTo(n1.x, n1.yBot);
    // Diagonal cross
    ctx.moveTo(n1.x, n1.yTop);
    ctx.lineTo(n2.x, n2.yBot);
    ctx.moveTo(n1.x, n1.yBot);
    ctx.lineTo(n2.x, n2.yTop);
  }
  ctx.stroke();

  // Front nose cap & pitot air data sensor probe (x=-68 to -66)
  ctx.beginPath();
  ctx.moveTo(-66, -9);
  ctx.lineTo(-68, -3.5);
  ctx.lineTo(-68, 0);
  ctx.lineTo(-66, 2);
  ctx.closePath();
  ctx.fillStyle = '#f97316';
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Pitot sensor probe needle
  ctx.beginPath();
  ctx.moveTo(-68, -2);
  ctx.lineTo(-72, -2);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-72, -2, 0.6, 0, Math.PI * 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.fill();

  // Front gantry floodlight projector
  ctx.beginPath();
  ctx.rect(-65.5, -5.5, 2.5, 3.5);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-65.5, -3.75, 0.8, 1.4, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 6. MAIN HULL & ENGINEERING DECK PLATING (x=-26 to x=56)
  // =========================================================================
  ctx.save();
  // Solid Pale Titanium / Off-white Composite Hull Plating
  ctx.beginPath();
  ctx.moveTo(-26, -9);
  ctx.lineTo(-22, -13); // Cockpit canopy rise
  ctx.lineTo(-12, -7);  // Cockpit rear deck
  ctx.lineTo(4, -7);    // Mid deck
  ctx.lineTo(6, -21);   // Starboard control tower front
  ctx.lineTo(22, -21);  // Starboard control tower roof
  ctx.lineTo(24, -7);   // Starboard control tower aft
  ctx.lineTo(56, -6);   // Aft engineering roof
  ctx.lineTo(56, 11);   // Aft engineering keel
  ctx.lineTo(-26, 11);  // Forward keel junction
  ctx.closePath();
  const mainHullGrad = ctx.createLinearGradient(0, -22, 0, 12);
  mainHullGrad.addColorStop(0, '#f8fafc');
  mainHullGrad.addColorStop(0.3, primaryColor);
  mainHullGrad.addColorStop(0.7, '#cbd5e1');
  mainHullGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = mainHullGrad;
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Structural panel separation seams & maintenance inspection hatches
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  // Vertical bulkheads
  ctx.moveTo(-12, -7);
  ctx.lineTo(-12, 11);
  ctx.moveTo(4, -7);
  ctx.lineTo(4, 11);
  ctx.moveTo(26, -7);
  ctx.lineTo(26, 11);
  ctx.moveTo(42, -6);
  ctx.lineTo(42, 11);
  // Horizontal datum lines
  ctx.moveTo(-26, 2);
  ctx.lineTo(56, 2);
  ctx.moveTo(-26, 7);
  ctx.lineTo(56, 7);
  ctx.stroke();

  // Aft Engineering Deck Fusion Reactor Core & Radiator Louvers (x=28..54)
  ctx.beginPath();
  ctx.rect(30, -4, 22, 8);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Pulsing cyan fusion reactor plasma glow through radiator slots
  ctx.save();
  ctx.globalAlpha = pulseCore;
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(41, 0, 7, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(41, 0, 4, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Slotted thermal radiator louvers over reactor
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  for (let lx = 32; lx <= 50; lx += 2.6) {
    ctx.moveTo(lx, -3);
    ctx.lineTo(lx, 3);
  }
  ctx.stroke();

  // Hazard warning chevron strip along aft deck keel
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.rect(28, 8, 26, 2.5);
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let hx = 30; hx <= 52; hx += 3.5) {
    ctx.moveTo(hx, 8);
    ctx.lineTo(hx + 2, 10.5);
  }
  ctx.stroke();
  ctx.restore();

  // =========================================================================
  // 7. COCKPIT / TACTICAL COORDINATION POST (x=-26 to -12, y=-13 to -2)
  // =========================================================================
  ctx.save();
  // Cockpit Shell & Aerodynamic Cab
  ctx.beginPath();
  ctx.moveTo(-26, -9);
  ctx.lineTo(-22, -13);
  ctx.lineTo(-13, -8.5);
  ctx.lineTo(-13, -2);
  ctx.lineTo(-26, -2);
  ctx.closePath();
  ctx.fillStyle = '#e2e8f0';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Forward-Raked Panoramic Cyan Bridge Visor (Multi-pane window)
  ctx.beginPath();
  ctx.moveTo(-24.5, -9.5);
  ctx.lineTo(-21.5, -12);
  ctx.lineTo(-14.5, -8.5);
  ctx.lineTo(-14.5, -3.5);
  ctx.lineTo(-24.5, -3.5);
  ctx.closePath();
  const visorGrad = ctx.createLinearGradient(-25, -12, -14, -3);
  visorGrad.addColorStop(0, '#38bdf8');
  visorGrad.addColorStop(0.5, visorColor);
  visorGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = visorGrad;
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Structural White Mullions
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-19.5, -10.8);
  ctx.lineTo(-19.5, -3.5);
  ctx.moveTo(-24.5, -6.5);
  ctx.lineTo(-14.5, -6.5);
  ctx.stroke();

  // Specular Reflection Highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.moveTo(-23, -9.8);
  ctx.lineTo(-20.5, -11.5);
  ctx.lineTo(-17, -9.5);
  ctx.lineTo(-21, -8.0);
  ctx.closePath();
  ctx.fill();

  // Roof FLIR Sensor Turret
  ctx.beginPath();
  ctx.arc(-18, -13.5, 1.4, 0, Math.PI * 2);
  ctx.fillStyle = '#1e293b';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-18, -13.5, 0.7, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
  ctx.restore();

  // =========================================================================
  // 8. OFFSET STARBOARD TYT CONTROL TOWER (x=4 to 24, y=-22 to -7)
  // =========================================================================
  ctx.save();
  // Tower Command Deck Body
  ctx.beginPath();
  ctx.moveTo(4, -7);
  ctx.lineTo(6, -21);
  ctx.lineTo(22, -21);
  ctx.lineTo(24, -7);
  ctx.closePath();
  ctx.fillStyle = '#f1f5f9';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.9;
  ctx.stroke();

  // Orange Vertical Identification Band
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.rect(11, -21, 6, 14);
  ctx.fill();

  // Tower Cupola Observation Windows (Panoramic strip)
  ctx.beginPath();
  ctx.rect(7, -19.5, 14, 4.2);
  const cupolaGrad = ctx.createLinearGradient(7, -20, 21, -15);
  cupolaGrad.addColorStop(0, '#0284c7');
  cupolaGrad.addColorStop(0.5, '#38bdf8');
  cupolaGrad.addColorStop(1, '#075985');
  ctx.fillStyle = cupolaGrad;
  ctx.fill();
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Window mullions
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(11, -19.5);
  ctx.lineTo(11, -15.3);
  ctx.moveTo(17, -19.5);
  ctx.lineTo(17, -15.3);
  ctx.stroke();

  // Bold Stencil TYT on Tower
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 3.2px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TYT', 14, -10.5);

  // Communication & Radar Lattice Mast
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(14, -21);
  ctx.lineTo(14, -34);
  // Cross bracing
  ctx.moveTo(12, -21);
  ctx.lineTo(14, -26);
  ctx.lineTo(16, -21);
  ctx.moveTo(12, -26);
  ctx.lineTo(14, -31);
  ctx.lineTo(16, -26);
  ctx.stroke();

  // Rotating Microwave Radar Dish
  const dishAngle = time * 2.0;
  const dishW = Math.cos(dishAngle) * 4.0;
  ctx.beginPath();
  ctx.ellipse(9, -27, Math.abs(dishW) + 0.5, 2.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#94a3b8';
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Top Antenna Probe Tip
  ctx.beginPath();
  ctx.moveTo(14, -34);
  ctx.lineTo(14, -38);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // USER REQUIREMENT: Blinking LED Strobe Light on top of the antenna
  const beaconBlink = Math.sin(time * 6.28) > 0.15;
  if (beaconBlink) {
    // Intense radial beacon flare
    const beaconGrad = ctx.createRadialGradient(14, -38, 0, 14, -38, 3.5);
    beaconGrad.addColorStop(0, '#ffffff');
    beaconGrad.addColorStop(0.3, '#f97316');
    beaconGrad.addColorStop(0.8, 'rgba(239, 68, 68, 0.4)');
    beaconGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = beaconGrad;
    ctx.beginPath();
    ctx.arc(14, -38, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Solid core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(14, -38, 0.8, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Dark unlit strobe housing
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.arc(14, -38, 0.7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // =========================================================================
  // 9. FUSELAGE STENCIL: BEHEMOTH-IX (Moved to the right so NOT covered by thruster)
  // =========================================================================
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = '900 4.2px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  // Positioned at x=9..26, y=0.5 (safe distance between front thruster x=-18 and rear thruster x=36)
  ctx.fillText('BEHEMOTH-IX', 9.5, 0.5);

  ctx.fillStyle = '#f97316';
  ctx.font = 'bold 2.4px monospace';
  ctx.fillText('BH-900 DREADNOUGHT // ARES', 9.5, 4.0);
  ctx.restore();

  // =========================================================================
  // 10. ARTICULATED VEHICLE LOADING RAMP (Mechanic 1)
  // =========================================================================
  // User Requirement: "The ramp door at the back is always open in-game, but it should only open when loading vehicles."
  // "remove the vehicle in the ramp, but keep the people that descend the ramp when it opens"
  ctx.save();
  const rampHingeX = -22;
  const rampHingeY = 9;
  const rampLen = 42;

  if (rampProg <= 0.01) {
    // -----------------------------------------------------------------------
    // RAMP DOOR CLOSED & LOCKED (Flush with hull contour)
    // -----------------------------------------------------------------------
    // Sealed bulkhead doorway frame
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.rect(-38, 4.5, 17, 5.5);
    ctx.fill();
    ctx.stroke();

    // Armored flush ramp door panel
    const doorGrad = ctx.createLinearGradient(-38, 4.5, -21, 10);
    doorGrad.addColorStop(0, '#cbd5e1');
    doorGrad.addColorStop(0.5, '#94a3b8');
    doorGrad.addColorStop(1, '#64748b');
    ctx.fillStyle = doorGrad;
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.rect(-37.5, 4.8, 16, 4.8);
    ctx.fill();
    ctx.stroke();

    // Horizontal reinforcement stiffeners
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(-37, 6.4);
    ctx.lineTo(-22, 6.4);
    ctx.moveTo(-37, 8.0);
    ctx.lineTo(-22, 8.0);
    ctx.stroke();

    // Heavy industrial hinge knuckles at bottom threshold
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.arc(-22, 9.2, 1.2, 0, Math.PI * 2);
    ctx.arc(-30, 9.2, 1.0, 0, Math.PI * 2);
    ctx.arc(-37, 9.2, 1.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dual hydraulic lock latch pins with amber/hazard casing
    ctx.fillStyle = '#f97316';
    ctx.fillRect(-35.5, 4.2, 2.5, 1.2);
    ctx.fillRect(-24.5, 4.2, 2.5, 1.2);
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(-34.8, 4.4, 1.1, 0.8);
    ctx.fillRect(-23.8, 4.4, 1.1, 0.8);

    // Green Status LEDs: RAMP SEALED & LOCKED
    ctx.fillStyle = '#22c55e';
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 3.0;
    ctx.beginPath();
    ctx.arc(-36.5, 5.5, 0.5, 0, Math.PI * 2);
    ctx.arc(-22.5, 5.5, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Micro-stencil text
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 1.8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RAMP LOCKED', -29.5, 7.2);
  } else {
    // -----------------------------------------------------------------------
    // RAMP DOOR OPENING / DEPLOYED (Articulated ramp descends to ground)
    // -----------------------------------------------------------------------
    // Inner vehicle hold bay revealed when door is opening/open
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.rect(-38, 4.5, 17, 5.5);
    ctx.fill();

    // Interior amber warning lights inside hold
    ctx.fillStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(-36, 5.5, 0.6, 0, Math.PI * 2);
    ctx.arc(-24, 5.5, 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Angular interpolation: folds out from stowed angle to ground
    // Closed: ramp door sealed against left gantry structure at x=-38, y≈7.6
    // Open: ramp touches ground at x=-64
    const angleClosed = Math.atan2(7.6 - rampHingeY, -38 - rampHingeX) + 2 * Math.PI; // ~185° (up-left, meeting gantry)
    const angleOpen = Math.atan2(footPadY - rampHingeY, -64 - rampHingeX); // ~163° (down-left, ground contact)
    const currentRampAngle = angleClosed + (angleOpen - angleClosed) * rampProg;

    const rampTipX = rampHingeX + Math.cos(currentRampAngle) * rampLen;
    const rampTipY = rampHingeY + Math.sin(currentRampAngle) * rampLen;

    // Hydraulic actuator cylinder driving the ramp
    const cylHingeX = -25;
    const cylHingeY = 7;
    const ramAttachDist = rampLen * 0.45;
    const ramAttachX = rampHingeX + Math.cos(currentRampAngle) * ramAttachDist;
    const ramAttachY = rampHingeY + Math.sin(currentRampAngle) * ramAttachDist;

    // Draw hydraulic actuator ram
    ctx.beginPath();
    ctx.moveTo(cylHingeX, cylHingeY);
    ctx.lineTo(ramAttachX, ramAttachY);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cylHingeX, cylHingeY);
    ctx.lineTo(ramAttachX, ramAttachY);
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Main Ramp Bed (Rigid box girder with high-traction surface)
    ctx.save();
    ctx.translate(rampHingeX, rampHingeY);
    ctx.rotate(currentRampAngle);

    // Main Ramp Girder
    ctx.beginPath();
    ctx.rect(0, -1.8, rampLen, 3.6);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Ribbed High-Traction Bed Surface
    ctx.beginPath();
    ctx.rect(1.5, -1.2, rampLen - 3, 2.4);
    ctx.fillStyle = '#334155';
    ctx.fill();

    // Traction cleats along bed
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    for (let rx = 3; rx <= rampLen - 3; rx += 2.5) {
      ctx.moveTo(rx, -1.2);
      ctx.lineTo(rx, 1.2);
    }
    ctx.stroke();

    // Safety Hazard Edge Chevrons along both side rails
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.rect(0, -2.4, rampLen, 0.6);
    ctx.rect(0, 1.8, rampLen, 0.6);
    ctx.fill();

    // Ground Toe Flap (Folds out at the end to meet the ground flush)
    ctx.beginPath();
    ctx.moveTo(rampLen, -1.8);
    ctx.lineTo(rampLen + 4, -0.4);
    ctx.lineTo(rampLen + 4, 1.0);
    ctx.lineTo(rampLen, 1.8);
    ctx.closePath();
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 0.6;
    ctx.stroke();
    ctx.restore();

    // USER REQUIREMENT: Keep the people that descend the ramp when it opens (NO vehicle)
    if (rampProg > 0.45 && ship?.isLanded) {
      // 3 ground crew technicians in orange hazard suits with helmets descending the ramp
      const crewPositions = [0.25, 0.55, 0.82];
      for (let ci = 0; ci < crewPositions.length; ci++) {
        const frac = crewPositions[ci];
        const personX = rampHingeX + (rampTipX - rampHingeX) * frac;
        const personY = rampHingeY + (rampTipY - rampHingeY) * frac - 2.5;

        ctx.save();
        // Orange hazmat suit body
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.rect(personX - 0.7, personY, 1.4, 2.2);
        ctx.fill();

        // Reflective silver safety vest
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.rect(personX - 0.6, personY + 0.6, 1.2, 0.6);
        ctx.fill();

        // White pressurized helmet with cyan visor
        ctx.beginPath();
        ctx.arc(personX, personY - 0.8, 0.9, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(personX - 0.3, personY - 0.8, 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        // Marshaling flash wand in hand (pulsing amber)
        if (ci === 0) {
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(personX - 0.8, personY + 1.0);
          ctx.lineTo(personX - 1.8, personY + 0.3);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(personX - 1.8, personY + 0.3, 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15';
          ctx.fill();
        }
        ctx.restore();
      }
    }
  }
  ctx.restore();

  // =========================================================================
  // 11. SIDE DOOR HOLDING THE CRANE & ASYMMETRIC CRANE MECHANISM (Mechanic 2)
  // =========================================================================
  // User Requirement: "When picking up cargo, in that approache to the cargo base
  // (any of them), the side door holding the crane should open and the crane needs
  // to move to simulate picking up the cargo."
  ctx.save();
  const doorMinX = -4;
  const doorMaxX = 26;
  const doorW = doorMaxX - doorMinX;
  const doorH = 16.5;
  const doorTopY = -5.5;

  // Door slide offset: slides upwards/retracts as craneFactor increases
  const doorSlideY = craneFactor * (doorH + 1.5);

  // Interior Cargo Bay Chamber (Revealed when door opens)
  if (craneFactor > 0.02) {
    ctx.save();
    // Bay Aperture Clip
    ctx.beginPath();
    ctx.rect(doorMinX, doorTopY, doorW, doorH);
    ctx.clip();

    // Dark interior bay cavity
    const bayCavityGrad = ctx.createLinearGradient(0, doorTopY, 0, doorTopY + doorH);
    bayCavityGrad.addColorStop(0, '#020617');
    bayCavityGrad.addColorStop(0.6, '#0f172a');
    bayCavityGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bayCavityGrad;
    ctx.fillRect(doorMinX, doorTopY, doorW, doorH);

    // Warm overhead bay floodlights
    ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
    ctx.beginPath();
    ctx.moveTo(doorMinX + 4, doorTopY);
    ctx.lineTo(doorMinX, doorTopY + doorH);
    ctx.lineTo(doorMinX + 10, doorTopY + doorH);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(doorMaxX - 4, doorTopY);
    ctx.lineTo(doorMaxX - 10, doorTopY + doorH);
    ctx.lineTo(doorMaxX, doorTopY + doorH);
    ctx.closePath();
    ctx.fill();

    // Overhead Crane Traverse Track on Bay Ceiling
    ctx.fillStyle = '#f97316';
    ctx.fillRect(doorMinX, doorTopY + 0.8, doorW, 1.4);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(doorMinX, doorTopY + 0.8, doorW, 1.4);

    // Bay Cargo Hardpoints on back bulkhead
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    for (let bx = doorMinX + 3; bx <= doorMaxX - 3; bx += 5.5) {
      ctx.moveTo(bx, doorTopY + 4);
      ctx.lineTo(bx, doorTopY + doorH - 2);
    }
    ctx.stroke();

    // ASYMMETRIC HEAVY VEHICLE CRANE MECHANISM
    // Trolley traverses along track based on craneFactor (x=20 to x=6)
    const craneBaseX = 20 - craneFactor * 13;
    const craneBaseY = doorTopY + 1.5;

    // Crane Trolley Carriage
    ctx.beginPath();
    ctx.rect(craneBaseX - 3.5, craneBaseY, 7, 3.2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Rotating Kingpost Column
    ctx.beginPath();
    ctx.rect(craneBaseX - 1.5, craneBaseY + 3.2, 3, 5.0);
    ctx.fillStyle = '#f97316';
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Boom arm pivot angle (tilts down towards cargo platform)
    const boomAngle = 0.28 + craneFactor * 0.45;
    const boomLen = 14 + craneFactor * 4; // Telescoping extension

    ctx.save();
    ctx.translate(craneBaseX, craneBaseY + 7.5);
    ctx.rotate(boomAngle);

    // Box-Girder Crane Boom Arm
    ctx.beginPath();
    ctx.rect(0, -1.4, boomLen, 2.8);
    ctx.fillStyle = '#f97316';
    ctx.fill();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.7;
    ctx.stroke();

    // Telescopic Inner Arm Extension
    ctx.beginPath();
    ctx.rect(boomLen * 0.5, -0.9, boomLen * 0.5, 1.8);
    ctx.fillStyle = '#e2e8f0';
    ctx.fill();

    // Boom Head Sheave / Pulley
    ctx.beginPath();
    ctx.arc(boomLen, 0, 1.2, 0, Math.PI * 2);
    ctx.fillStyle = '#334155';
    ctx.fill();
    ctx.restore();

    // Winch Cable & Heavy Cargo Hook (Deploys downward from boom tip)
    const boomTipX = craneBaseX + Math.cos(boomAngle) * boomLen;
    const boomTipY = craneBaseY + 7.5 + Math.sin(boomAngle) * boomLen;
    const hookDeployY = boomTipY + 4 + craneFactor * 9;

    // Braided Steel Cable
    ctx.beginPath();
    ctx.moveTo(boomTipX, boomTipY);
    ctx.lineTo(boomTipX, hookDeployY);
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    // Heavy Forged Alloy Cargo Hook & Weight Ball
    ctx.beginPath();
    ctx.arc(boomTipX, hookDeployY, 1.1, 0, Math.PI * 2);
    ctx.fillStyle = '#f97316';
    ctx.fill();

    // Forged Steel Hook Curve
    ctx.beginPath();
    ctx.arc(boomTipX, hookDeployY + 1.6, 1.3, Math.PI * 0.2, Math.PI * 1.6, false);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.0;
    ctx.stroke();

    // Crane Boom Tip Work Spotlight (illuminates cargo base)
    const spotConeGrad = ctx.createRadialGradient(boomTipX, boomTipY, 1, boomTipX, hookDeployY + 6, 12);
    spotConeGrad.addColorStop(0, 'rgba(56, 189, 248, 0.6)');
    spotConeGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.2)');
    spotConeGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = spotConeGrad;
    ctx.beginPath();
    ctx.moveTo(boomTipX - 1, boomTipY);
    ctx.lineTo(boomTipX - 8, hookDeployY + 8);
    ctx.lineTo(boomTipX + 8, hookDeployY + 8);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Sliding Armored Side Door Plating (Drawn over the aperture, offset by doorSlideY)
  ctx.save();
  // Clip so the door doesn't extend beyond the upper roof when sliding up
  ctx.beginPath();
  ctx.rect(doorMinX - 1, doorTopY - doorH - 4, doorW + 2, doorH * 2 + 8);
  ctx.clip();

  ctx.translate(0, -doorSlideY);

  // Armored Door Body Panel
  ctx.beginPath();
  ctx.rect(doorMinX, doorTopY, doorW, doorH);
  const doorGrad = ctx.createLinearGradient(doorMinX, doorTopY, doorMaxX, doorTopY + doorH);
  doorGrad.addColorStop(0, '#e2e8f0');
  doorGrad.addColorStop(0.5, '#cbd5e1');
  doorGrad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = doorGrad;
  ctx.fill();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Horizontal Reinforcing Ribs on Door
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(doorMinX, doorTopY + 4);
  ctx.lineTo(doorMaxX, doorTopY + 4);
  ctx.moveTo(doorMinX, doorTopY + 8);
  ctx.lineTo(doorMaxX, doorTopY + 8);
  ctx.moveTo(doorMinX, doorTopY + 12);
  ctx.lineTo(doorMaxX, doorTopY + 12);
  ctx.stroke();

  // Orange Safety Chevron Warning Trim along door perimeter
  ctx.fillStyle = '#f97316';
  ctx.fillRect(doorMinX, doorTopY, doorW, 1.2);
  ctx.fillRect(doorMinX, doorTopY + doorH - 1.2, doorW, 1.2);

  // Door Stenciling
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 2.0px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CARGO HOLD // ASYMMETRIC CRANE GANTRY', (doorMinX + doorMaxX) * 0.5, doorTopY + 2.5);

  // Mechanical Locking Pins
  ctx.fillStyle = '#f97316';
  for (let px = doorMinX + 2; px <= doorMaxX - 2; px += 4.5) {
    ctx.beginPath();
    ctx.arc(px, doorTopY + 0.6, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(px, doorTopY + doorH - 0.6, 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.restore();
}

export function drawLeviathan(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number = 0,
  world?: WorldMap
) {
  const footPadY = 34 + gearSpringOffset;

  // -------------------------------------------------------------------
  // 0. Ventral Base-Approach Landing Spotlight System
  // -------------------------------------------------------------------
  // Automatically detects landing approach when close to any base, pad, or platform
  let approachFactor = ship.approachBaseFactor !== undefined ? ship.approachBaseFactor : 0;
  let targetRelY = 180;

  if (world) {
    const bases = [
      world.landingPad ? { x: world.landingPad.center.x, y: world.landingPad.center.y } : null,
      world.launchPad ? { x: world.launchPad.center.x, y: world.launchPad.center.y } : null,
      ...(world.secondaryPads || []).map(p => ({ x: p.center.x, y: p.y })),
      ...(world.cargoPlatforms || []).map(cp => ({
        x: cp.center?.x ?? ((cp.x1 !== undefined && cp.x2 !== undefined) ? (cp.x1 + cp.x2) / 2 : (cp.pos?.x ?? 0)),
        y: cp.center?.y ?? (cp.y ?? cp.pos?.y ?? 0)
      }))
    ].filter(Boolean) as { x: number; y: number }[];

    let minDist = 99999;
    let nearestBase: { x: number; y: number } | null = null;
    for (const b of bases) {
      const d = Math.hypot(ship.pos.x - b.x, ship.pos.y - b.y);
      if (d < minDist) {
        minDist = d;
        nearestBase = b;
      }
    }

    if (nearestBase && minDist < 350) {
      // Smooth fade-in from 350px down to full intensity at 120px and below
      const distFactor = Math.max(0, Math.min(1.0, (350 - minDist) / 230));
      approachFactor = Math.max(approachFactor, distFactor);
      targetRelY = Math.max(35, nearestBase.y - ship.pos.y);
    }
  }

  if (ship.isLanded || ship.landingSettling) {
    approachFactor = 1.0;
    targetRelY = footPadY;
  }

  const spotMountX = 3;
  const spotMountY = 16;
  // Active motorized gimbal stabilization: counter-rotates searchlight so beam shines vertically down onto base
  const maxGimbalAngle = 0.65; // ~37 deg max swivel range
  const gimbalAngle = Math.max(-maxGimbalAngle, Math.min(maxGimbalAngle, -ship.angle * 0.85));

  // Render Volumetric Spotlight Beam when approaching a base
  if (approachFactor > 0.005) {
    ctx.save();
    ctx.translate(spotMountX, spotMountY);
    ctx.rotate(gimbalAngle);

    const beamLen = Math.max(48, Math.min(270, targetRelY - spotMountY));
    const coneHalfWidth = Math.max(22, beamLen * 0.35);

    // 1. Wide Outer Atmospheric Volumetric Light Cone
    const coneGrad = ctx.createLinearGradient(0, 0, 0, beamLen);
    coneGrad.addColorStop(0, `rgba(255, 255, 255, ${0.55 * approachFactor})`);
    coneGrad.addColorStop(0.12, `rgba(224, 242, 254, ${0.35 * approachFactor})`);
    coneGrad.addColorStop(0.45, `rgba(125, 211, 252, ${0.20 * approachFactor})`);
    coneGrad.addColorStop(0.85, `rgba(6, 182, 212, ${0.08 * approachFactor})`);
    coneGrad.addColorStop(1.0, 'rgba(6, 182, 212, 0.0)');

    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(-3.5, 0);
    ctx.lineTo(-coneHalfWidth, beamLen);
    ctx.lineTo(coneHalfWidth, beamLen);
    ctx.lineTo(3.5, 0);
    ctx.closePath();
    ctx.fill();

    // 2. High-Intensity Condensed Xenon Core Beam
    const coreGrad = ctx.createLinearGradient(0, 0, 0, beamLen * 0.9);
    coreGrad.addColorStop(0, `rgba(255, 255, 255, ${0.80 * approachFactor})`);
    coreGrad.addColorStop(0.25, `rgba(240, 249, 255, ${0.48 * approachFactor})`);
    coreGrad.addColorStop(0.70, `rgba(186, 230, 253, ${0.18 * approachFactor})`);
    coreGrad.addColorStop(1.0, 'rgba(186, 230, 253, 0.0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.moveTo(-1.6, 0);
    ctx.lineTo(-coneHalfWidth * 0.38, beamLen * 0.9);
    ctx.lineTo(coneHalfWidth * 0.38, beamLen * 0.9);
    ctx.lineTo(1.6, 0);
    ctx.closePath();
    ctx.fill();

    // 3. Floating Atmospheric Dust Motes Shimmering in the Spotlight
    for (let i = 0; i < 4; i++) {
      const moteProgress = ((time * 38 + i * 55) % beamLen) / beamLen;
      const moteY = moteProgress * beamLen;
      const maxSpread = moteProgress * (coneHalfWidth - 3);
      const moteX = Math.sin(time * 3.0 + i * 2.1) * maxSpread;
      const moteAlpha = Math.sin(moteProgress * Math.PI) * 0.7 * approachFactor;

      ctx.fillStyle = `rgba(255, 255, 255, ${moteAlpha})`;
      ctx.beginPath();
      ctx.arc(moteX, moteY, 1.0, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Ground Surface Illumination Pool & Landing Target Hotspot
    const poolR = coneHalfWidth;
    const poolHeight = Math.max(6, coneHalfWidth * 0.28);
    const poolGrad = ctx.createRadialGradient(0, beamLen, 1, 0, beamLen, poolR);
    poolGrad.addColorStop(0, `rgba(255, 255, 255, ${0.60 * approachFactor})`);
    poolGrad.addColorStop(0.35, `rgba(186, 230, 253, ${0.35 * approachFactor})`);
    poolGrad.addColorStop(0.75, `rgba(6, 182, 212, ${0.15 * approachFactor})`);
    poolGrad.addColorStop(1.0, 'rgba(6, 182, 212, 0.0)');

    ctx.fillStyle = poolGrad;
    ctx.beginPath();
    ctx.ellipse(0, beamLen, poolR, poolHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tactical Landing Crosshairs & Concentric Range Reticle on the base
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.45 * approachFactor})`;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(0, beamLen, poolR * 0.55, poolHeight * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-poolR * 0.75, beamLen);
    ctx.lineTo(poolR * 0.75, beamLen);
    ctx.moveTo(0, beamLen - poolHeight * 0.85);
    ctx.lineTo(0, beamLen + poolHeight * 0.85);
    ctx.stroke();

    ctx.restore();
  }

  // =====================================================================
  // 1. Heavy Catamaran Outrigger Landing Gear (PATH ISOLATION MANDATE)
  // =====================================================================
  // Port Strut Assembly (x: -34 to -42)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-34, 12);
  ctx.lineTo(-38, 22);
  ctx.stroke();

  // Port Chrome Oleo Piston Rod
  const portPistonGrad = ctx.createLinearGradient(-40, 22, -36, footPadY);
  portPistonGrad.addColorStop(0, '#f8fafc');
  portPistonGrad.addColorStop(0.5, '#cbd5e1');
  portPistonGrad.addColorStop(1, '#94a3b8');
  ctx.strokeStyle = portPistonGrad;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-38, 22);
  ctx.lineTo(-42, footPadY);
  ctx.stroke();

  // Port Diagonal A-Frame Scissor Linkage
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-26, 16);
  ctx.lineTo(-33, 24);
  ctx.lineTo(-42, footPadY);
  ctx.stroke();

  // Port Nitrogen Accumulator Bottle
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#082f49';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -32, 16, 4, 9, 1.5);
  ctx.fill();
  ctx.stroke();

  // Port Rocker Knuckle Pivot (Strictly Isolated Subpath)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-42, footPadY - 4.5, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Port Manganese-Steel Articulated Footpad (Strictly Isolated Subpath)
  ctx.fillStyle = '#0891b2';
  ctx.strokeStyle = '#164e63';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-42, footPadY - 2.5, 9, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Port Footpad Hazard Striping
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-45, footPadY - 4.5);
  ctx.lineTo(-43, footPadY - 0.5);
  ctx.moveTo(-41, footPadY - 4.5);
  ctx.lineTo(-39, footPadY - 0.5);
  ctx.stroke();

  // Starboard Strut Assembly (x: 34 to 42)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(34, 12);
  ctx.lineTo(38, 22);
  ctx.stroke();

  // Starboard Chrome Oleo Piston Rod
  const stbdPistonGrad = ctx.createLinearGradient(40, 22, 36, footPadY);
  stbdPistonGrad.addColorStop(0, '#f8fafc');
  stbdPistonGrad.addColorStop(0.5, '#cbd5e1');
  stbdPistonGrad.addColorStop(1, '#94a3b8');
  ctx.strokeStyle = stbdPistonGrad;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(38, 22);
  ctx.lineTo(42, footPadY);
  ctx.stroke();

  // Starboard Diagonal A-Frame Scissor Linkage
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(26, 16);
  ctx.lineTo(33, 24);
  ctx.lineTo(42, footPadY);
  ctx.stroke();

  // Starboard Nitrogen Accumulator Bottle
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#082f49';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 28, 16, 4, 9, 1.5);
  ctx.fill();
  ctx.stroke();

  // Starboard Rocker Knuckle Pivot (Strictly Isolated Subpath)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(42, footPadY - 4.5, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Starboard Manganese-Steel Articulated Footpad (Strictly Isolated Subpath)
  ctx.fillStyle = '#0891b2';
  ctx.strokeStyle = '#164e63';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(42, footPadY - 2.5, 9, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Starboard Footpad Hazard Striping
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(39, footPadY - 4.5);
  ctx.lineTo(41, footPadY - 0.5);
  ctx.moveTo(43, footPadY - 4.5);
  ctx.lineTo(45, footPadY - 0.5);
  ctx.stroke();

  // =====================================================================
  // 2. Massive Port Armored Vehicle Hangar Sponson (x: -40 to -10, y: -28 to +16)
  // =====================================================================
  // Primary Sponson Catamaran Hull
  const portHullGrad = ctx.createLinearGradient(-40, -28, -10, 16);
  portHullGrad.addColorStop(0, '#1e293b');
  portHullGrad.addColorStop(0.45, '#0f172a');
  portHullGrad.addColorStop(1, '#020617');
  ctx.fillStyle = portHullGrad;
  ctx.beginPath();
  ctx.moveTo(-40, -18);
  ctx.lineTo(-34, -28);
  ctx.lineTo(-10, -28);
  ctx.lineTo(-10, 16);
  ctx.lineTo(-40, 16);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // Ballistic Titanium Armor Plate Insert
  ctx.fillStyle = createTitaniumPlate(ctx, -14, 14);
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -36, -14, 24, 28, 2);
  ctx.fill();
  ctx.stroke();

  // Armor Plate Hex Rivets
  ctx.fillStyle = '#64748b';
  for (let ry = -11; ry <= 11; ry += 5.5) {
    ctx.beginPath();
    ctx.arc(-34, ry, 0.7, 0, Math.PI * 2);
    ctx.arc(-14, ry, 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stenciled Hull Markings
  ctx.fillStyle = '#22d3ee';
  ctx.font = 'bold 2.8px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('LV-880', -24, 4);
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 2.0px monospace';
  ctx.fillText('TITAN CARRIER', -24, 8);

  // Coolant Radiator Intake Louvers
  ctx.fillStyle = '#082f49';
  ctx.fillRect(-35, -24, 8, 7);
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 0.8;
  for (let ly = -23; ly <= -18; ly += 2) {
    ctx.beginPath();
    ctx.moveTo(-35, ly);
    ctx.lineTo(-27, ly);
    ctx.stroke();
  }

  // Port Sponson Glacial Visor Observation Dome
  const visorGrad = ctx.createRadialGradient(-22, -22, 1, -22, -22, 7);
  visorGrad.addColorStop(0, '#f0fdf4');
  visorGrad.addColorStop(0.3, '#a5f3fc');
  visorGrad.addColorStop(0.65, config.accentColor);
  visorGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = visorGrad;
  ctx.beginPath();
  ctx.ellipse(-22, -22, 6.5, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Tactical HUD Reticle in Observation Visor
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-25, -22);
  ctx.lineTo(-19, -22);
  ctx.moveTo(-22, -24);
  ctx.lineTo(-22, -20);
  ctx.stroke();

  // Specular Reflection Glint
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-24, -23.2, 2.5, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Port Red Navigation Strobe at Prow
  const portStrobeOn = Math.sin(time * 6) > 0;
  ctx.fillStyle = portStrobeOn ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(-39, -18, 1.3, 0, Math.PI * 2);
  ctx.fill();

  // =====================================================================
  // 3. Center Pass-Through Hold & Box-Girder Truss Bridge (x: -10 to +16)
  // =====================================================================
  // Heavy Box-Girder Connecting Bridge
  const bridgeGrad = ctx.createLinearGradient(-10, -16, 16, -10);
  bridgeGrad.addColorStop(0, '#1e293b');
  bridgeGrad.addColorStop(0.5, '#334155');
  bridgeGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = bridgeGrad;
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -10, -16, 26, 7, 1.5);
  ctx.fill();
  ctx.stroke();

  // Triangular Lattice Structural Cutouts in Bridge
  ctx.fillStyle = '#0f172a';
  for (let bx = -7; bx <= 11; bx += 5.5) {
    ctx.beginPath();
    ctx.moveTo(bx, -15);
    ctx.lineTo(bx + 4, -15);
    ctx.lineTo(bx + 2, -10);
    ctx.closePath();
    ctx.fill();
  }

  // Industrial Safety Hazard Warning Belt across Bridge Threshold
  ctx.fillStyle = '#eab308';
  ctx.fillRect(-10, -9, 26, 2);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  for (let hx = -9; hx <= 14; hx += 3.5) {
    ctx.beginPath();
    ctx.moveTo(hx, -9);
    ctx.lineTo(hx + 2, -7);
    ctx.stroke();
  }

  // Recessed Interior Cargo Hold Bay
  const lHoldX = -10;
  const lHoldY = -7;
  const lHoldW = 26;
  const lHoldH = 23;

  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#155e75';
  ctx.lineWidth = 1.2;
  ctx.fillRect(lHoldX, lHoldY, lHoldW, lHoldH);
  ctx.strokeRect(lHoldX, lHoldY, lHoldW, lHoldH);

  // Bulkhead Perspective Structural Ribs
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  for (let rx = -5; rx <= 11; rx += 5.5) {
    ctx.beginPath();
    ctx.moveTo(rx, lHoldY);
    ctx.lineTo(rx, lHoldY + lHoldH);
    ctx.stroke();
  }

  // Overhead Halogen Deck Work Lights
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(-4, lHoldY + 1.5, 1.2, 0, Math.PI * 2);
  ctx.arc(4, lHoldY + 1.5, 1.2, 0, Math.PI * 2);
  ctx.arc(10, lHoldY + 1.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Floor Guide Rails
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(lHoldX + 2, lHoldY + lHoldH - 1.5);
  ctx.lineTo(lHoldX + lHoldW - 2, lHoldY + lHoldH - 1.5);
  ctx.stroke();

  // Render Detailed Onboard Planetary Rover (When loaded, or standard transporter vehicle)
  if ((ship.loadedTrucksCount || 0) > 0 || true) {
    ctx.save();
    ctx.translate(3, 7);

    // Rover Armored Chassis
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-10, -5, 20, 9);
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.0;
    ctx.strokeRect(-10, -5, 20, 9);

    // Pressurized Cyan Cockpit Canopy
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    roundRect(ctx, 3, -7.5, 6.5, 4.5, 1);
    ctx.fill();
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Rear Nuclear RTG Generator with Radiator Fins
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-9, -7, 5, 3);
    ctx.strokeStyle = '#fdba74';
    ctx.lineWidth = 0.6;
    ctx.strokeRect(-9, -7, 5, 3);

    // All-Terrain Heavy Rubber Wheels
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.8;
    const wheelPositions = [-7.5, -2.5, 2.5, 7.5];
    for (const wx of wheelPositions) {
      ctx.beginPath();
      ctx.arc(wx, 4.8, 2.0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Cyan Wheel Hubcap
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(wx, 4.8, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
    }

    // Magnetic Deck Tie-Down Turnbuckles
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-9, 0);
    ctx.lineTo(-11, 4);
    ctx.moveTo(9, 0);
    ctx.lineTo(11, 4);
    ctx.stroke();

    ctx.restore();
  }

  // =====================================================================
  // 4. Hydraulic Ramp Door Folding Downward
  // =====================================================================
  const lRampProgress = ship.rampProgress || 0;
  const lHingeX = lHoldX;
  const lHingeY = lHoldY + lHoldH - 1;

  if (lRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * lRampProgress;
    const rampEndX = lHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = lHingeY + Math.sin(currentAngle) * rampLength;

    // Outer Heavy Ramp Bed
    ctx.strokeStyle = '#0891b2';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lHingeX, lHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Diamond-Tread Ramp Core Line
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(lHingeX, lHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Ground Contact Rocker Toe
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed door marker with hazard latch
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-10, 14);
    ctx.lineTo(-22, 23);
    ctx.stroke();

    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(-22, 23, 2.0, 0, Math.PI * 2);
    ctx.fill();
  }

  // =====================================================================
  // 5. Starboard Slender Sensor Spire & Tokamak Spine (x: +16 to +38, y: -42 to +16)
  // =====================================================================
  // Primary Starboard Reconnaissance Hull
  const stbdHullGrad = ctx.createLinearGradient(16, -38, 38, 16);
  stbdHullGrad.addColorStop(0, '#1e293b');
  stbdHullGrad.addColorStop(0.45, '#0f172a');
  stbdHullGrad.addColorStop(1, '#020617');
  ctx.fillStyle = stbdHullGrad;
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

  // Starboard Green Navigation Strobe
  const stbdStrobeOn = Math.sin(time * 6 + Math.PI) > 0;
  ctx.fillStyle = stbdStrobeOn ? '#22c55e' : '#14532d';
  ctx.beginPath();
  ctx.arc(37, -16, 1.3, 0, Math.PI * 2);
  ctx.fill();

  // Telecommunications Sensor Mast
  ctx.strokeStyle = '#a5f3fc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(22, -38);
  ctx.lineTo(22, -45);
  ctx.stroke();

  // Crossbar Dipoles
  ctx.strokeStyle = '#67e8f9';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(18, -42);
  ctx.lineTo(26, -42);
  ctx.moveTo(19, -40);
  ctx.lineTo(25, -40);
  ctx.stroke();

  // Rotating Parabolic Phased-Array Radar Dish
  const radarSweep = Math.sin(time * 3.5);
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(22 - 5 * Math.abs(radarSweep), -43);
  ctx.quadraticCurveTo(22, -41, 22 + 5 * Math.abs(radarSweep), -43);
  ctx.stroke();

  // Red Anti-Collision Warning Strobe at Masthead
  const mastStrobeOn = Math.sin(time * 8) > 0;
  ctx.fillStyle = mastStrobeOn ? '#ef4444' : '#450a0a';
  ctx.beginPath();
  ctx.arc(22, -45.5, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Tokamak Magnetic Fusion Reactor Spine with Luminescent Plasma Rings
  ctx.fillStyle = '#082f49';
  ctx.fillRect(18, -16, 18, 28);
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 1.0;
  ctx.strokeRect(18, -16, 18, 28);

  // Magnetic Containment Rings
  const ringYPositions = [-12, -4, 4, 11];
  for (let i = 0; i < ringYPositions.length; i++) {
    const ry = ringYPositions[i];
    // Animated plasma circulation brightness
    const pulseOffset = Math.sin(time * 6 + i * 1.5) * 0.3;
    ctx.fillStyle = `rgba(6, 182, 212, ${0.7 + pulseOffset})`;
    ctx.beginPath();
    roundRect(ctx, 20, ry, 14, 4, 1);
    ctx.fill();

    // Hot Plasma White Core
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    roundRect(ctx, 23, ry + 1.2, 8, 1.6, 0.5);
    ctx.fill();
  }

  // =====================================================================
  // 6. Spotlight Gimbal Housing & Xenon Projector Assembly (x: 3, y: 16)
  // =====================================================================
  ctx.save();
  ctx.translate(spotMountX, spotMountY);
  ctx.rotate(gimbalAngle);

  // Mounting Pivot Yoke
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -4.5, -3, 9, 4, 1);
  ctx.fill();
  ctx.stroke();

  // Parabolic Searchlight Casing
  const casingGrad = ctx.createLinearGradient(-4, 0, 4, 4);
  casingGrad.addColorStop(0, '#1e293b');
  casingGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = casingGrad;
  ctx.beginPath();
  ctx.moveTo(-4, 0);
  ctx.lineTo(-3, 3.5);
  ctx.lineTo(3, 3.5);
  ctx.lineTo(4, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#22d3ee';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  // Internal Polished Parabolic Mirror Bowl
  ctx.fillStyle = '#f1f5f9';
  ctx.beginPath();
  ctx.ellipse(0, 3.2, 3.2, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ultra-Bright Quartz Xenon Arc Emitter
  const bulbGlow = approachFactor > 0.05 ? '#ffffff' : '#94a3b8';
  ctx.fillStyle = bulbGlow;
  ctx.beginPath();
  ctx.arc(0, 2.8, 1.3, 0, Math.PI * 2);
  ctx.fill();

  // Starburst Lens Flare (when active)
  if (approachFactor > 0.15) {
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * approachFactor})`;
    ctx.lineWidth = 0.8;
    const flareSize = 4 + approachFactor * 4;
    ctx.beginPath();
    ctx.moveTo(-flareSize, 2.8);
    ctx.lineTo(flareSize, 2.8);
    ctx.moveTo(0, 2.8 - flareSize);
    ctx.lineTo(0, 2.8 + flareSize);
    ctx.stroke();
  }

  // Active Auto-Tracking Status LED
  ctx.fillStyle = approachFactor > 0.1 ? '#22c55e' : '#f59e0b';
  ctx.beginPath();
  ctx.arc(-2.6, 1.2, 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // =====================================================================
  // 7. Heavy Asymmetric Deuterium Rocket Propulsion Array
  // =====================================================================
  // Port Dual Main Rocket Bells (x: -34 to -14, y: 16 to 24)
  const portNozzleGrad = ctx.createLinearGradient(-34, 16, -14, 24);
  portNozzleGrad.addColorStop(0, '#1e293b');
  portNozzleGrad.addColorStop(0.5, '#334155');
  portNozzleGrad.addColorStop(1, '#0f172a');

  // Port Left Bell
  ctx.fillStyle = portNozzleGrad;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-35, 16);
  ctx.lineTo(-25, 16);
  ctx.lineTo(-23, 24);
  ctx.lineTo(-37, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Machined Copper Lip
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-37, 24);
  ctx.lineTo(-23, 24);
  ctx.stroke();

  // Port Right Bell
  ctx.fillStyle = portNozzleGrad;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-23, 16);
  ctx.lineTo(-13, 16);
  ctx.lineTo(-11, 24);
  ctx.lineTo(-25, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Machined Copper Lip
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-25, 24);
  ctx.lineTo(-11, 24);
  ctx.stroke();

  // Starboard High-Thrust Fusion Torch Bell (x: 20 to 36, y: 16 to 25)
  const stbdNozzleGrad = ctx.createLinearGradient(20, 16, 36, 25);
  stbdNozzleGrad.addColorStop(0, '#1e293b');
  stbdNozzleGrad.addColorStop(0.5, '#475569');
  stbdNozzleGrad.addColorStop(1, '#0f172a');

  ctx.fillStyle = stbdNozzleGrad;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(21, 16);
  ctx.lineTo(35, 16);
  ctx.lineTo(37, 25);
  ctx.lineTo(19, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Machined Copper Lip
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(19, 25);
  ctx.lineTo(37, 25);
  ctx.stroke();

  // Combustion Chamber Throat Idle Glow
  ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
  ctx.beginPath();
  ctx.ellipse(-30, 22.5, 4.5, 1.6, 0, 0, Math.PI * 2);
  ctx.ellipse(-18, 22.5, 4.5, 1.6, 0, 0, Math.PI * 2);
  ctx.ellipse(28, 23.5, 6.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// =====================================================================
// 10. MAMMOTH RIG (C-95 Heavy Lift Cargo Transport)
//     Faithful clone of the C-95 "MAMMOTH RIG" technical schematic.
//     Bow faces RIGHT. Primary blue-gray duranium hull, yellow-gold
//     accent collars & hazard stripes, cyan bridge glazing, red beacon.
// =====================================================================
export function drawMammoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number = 0
) {
  const footPadY = 38 + gearSpringOffset;
  const isFlying = !ship?.isLanded && !ship?.isCrashed;
  const flash = Math.sin(time * 6.0) > 0.2;

  const hullBase = '#647477';
  const hullDark = '#59686A';
  const hullDarker = '#394447';
  const hullHighlight = '#879597';
  const hullLight = '#9AA5A3';
  const outline = '#172125';
  const yellow = '#D4A62B';
  const yellowLight = '#E0B33A';
  const cyan = '#39CBD0';
  const cyanHi = '#55E0E2';
  const cream = '#FFF0C9';
  const creamGlow = '#F2C96A';
  const red = '#E84942';
  const orange = '#E86F42';

  const hullGrad = ctx.createLinearGradient(0, -58, 0, 22);
  hullGrad.addColorStop(0, hullLight);
  hullGrad.addColorStop(0.25, hullBase);
  hullGrad.addColorStop(0.6, hullDark);
  hullGrad.addColorStop(1, hullDarker);

  const keelGrad = ctx.createLinearGradient(0, 8, 0, 30);
  keelGrad.addColorStop(0, hullDarker);
  keelGrad.addColorStop(1, '#252E32');

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // 1. BOW SEARCHLIGHT BEAMS (background light cones)
  const beamPulse = 0.35 + Math.sin(time * 4.0) * 0.08;
  ctx.save();
  const beamGrad = ctx.createLinearGradient(58, -8, 95, 30);
  beamGrad.addColorStop(0, `rgba(255,240,201,${beamPulse})`);
  beamGrad.addColorStop(1, 'rgba(255,240,201,0)');
  ctx.fillStyle = beamGrad;
  ctx.beginPath();
  ctx.moveTo(58, -12);
  ctx.lineTo(95, 8);
  ctx.lineTo(95, 40);
  ctx.lineTo(58, -2);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(60, -4);
  ctx.lineTo(98, 18);
  ctx.lineTo(98, 44);
  ctx.lineTo(60, 6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 2. MAIN PROPULSION NOZZLE ASSEMBLY (stern center)
  const glow = isFlying ? 0.9 : 0.35;
  ctx.save();
  ctx.fillStyle = hullDarker;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(-48, 8, 22, 22, 3);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = yellow;
  ctx.beginPath();
  ctx.roundRect(-50, 8, 5, 22, 2.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#1B2528';
  ctx.beginPath();
  ctx.roundRect(-46, 12, 12, 14, 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = `rgba(242,201,106,${glow})`;
  ctx.beginPath();
  ctx.roundRect(-45, 13, 9, 12, 2);
  ctx.fill();
  ctx.restore();

  // 3. TWIN PRIMARY VECTORED THRUSTER PODS (lower rear)
  for (const py of [-6, 10]) {
    ctx.save();
    ctx.fillStyle = hullDarker;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.roundRect(-38, py, 20, 13, 2.5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = yellow;
    ctx.beginPath();
    ctx.roundRect(-40, py, 4, 13, 2);
    ctx.fill();
    ctx.fillStyle = '#1B2528';
    ctx.beginPath();
    ctx.roundRect(-37, py + 2, 11, 9, 2);
    ctx.fill();
    ctx.fillStyle = `rgba(242,201,106,${glow})`;
    ctx.beginPath();
    ctx.roundRect(-36, py + 3, 8, 7, 2);
    ctx.fill();
    ctx.restore();
  }

  // 4. LANDING GEAR (4 heavy articulated legs, isolated subpaths)
  const gearDefs = [
    { mountX: -34, footX: -52 },
    { mountX: -10, footX: -24 },
    { mountX: 20, footX: 6 },
    { mountX: 48, footX: 34 },
  ];
  for (const leg of gearDefs) {
    ctx.save();
    ctx.fillStyle = hullDarker;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(leg.mountX, 20, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = hullDark;
    ctx.lineWidth = 3.0;
    ctx.beginPath();
    ctx.moveTo(leg.mountX, 21);
    ctx.lineTo(leg.footX, footPadY - 4);
    ctx.stroke();
    ctx.strokeStyle = yellow;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(leg.mountX, 23);
    ctx.lineTo(leg.footX - 6, footPadY - 8);
    ctx.stroke();
    ctx.strokeStyle = '#DDE4DF';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(leg.footX - 6, footPadY - 8);
    ctx.lineTo(leg.footX, footPadY - 4);
    ctx.stroke();
    ctx.fillStyle = '#252E32';
    ctx.strokeStyle = outline;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.roundRect(leg.footX - 8, footPadY - 3, 16, 5, 2);
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(leg.footX - 8, footPadY - 3, 16, 5, 2);
    ctx.clip();
    ctx.fillStyle = yellow;
    ctx.fillRect(leg.footX - 8, footPadY - 3, 16, 5);
    ctx.strokeStyle = '#292D2D';
    ctx.lineWidth = 2.6;
    for (let hx = leg.footX - 10; hx < leg.footX + 12; hx += 5) {
      ctx.beginPath();
      ctx.moveTo(hx, footPadY + 2);
      ctx.lineTo(hx + 5, footPadY - 3);
      ctx.stroke();
    }
    ctx.restore();
    ctx.restore();
  }

  // 5. LOWER HULL / CARGO DECK SKIRT
  ctx.save();
  ctx.fillStyle = keelGrad;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-60, 10);
  ctx.lineTo(60, 10);
  ctx.lineTo(62, 22);
  ctx.lineTo(-62, 22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#303A3E';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-62, 16);
  ctx.lineTo(62, 16);
  ctx.moveTo(-62, 19);
  ctx.lineTo(62, 19);
  ctx.stroke();
  ctx.fillStyle = orange;
  for (let px = -54; px <= 54; px += 18) {
    ctx.beginPath();
    ctx.roundRect(px, 12, 4, 3, 1);
    ctx.fill();
  }
  ctx.restore();

  // 6. MAIN CARGO HOLD A (forward lower deck)
  ctx.save();
  ctx.fillStyle = '#252E32';
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(8, -6, 50, 18, 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#303A3E';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let rx = 12; rx <= 54; rx += 6) {
    ctx.moveTo(rx, -5);
    ctx.lineTo(rx, 11);
  }
  ctx.stroke();
  ctx.strokeStyle = yellow;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.roundRect(8, -6, 50, 18, 2);
  ctx.stroke();
  ctx.fillStyle = yellowLight;
  ctx.font = 'bold 4px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MAMMOTH', 33, 0.5);
  ctx.fillText('RIG', 33, 5.5);
  ctx.fillStyle = '#DDE4DF';
  ctx.font = 'bold 2.6px monospace';
  ctx.fillText('CARGO', 33, -3.2);
  ctx.fillStyle = '#1B2528';
  ctx.beginPath();
  ctx.roundRect(10, -4, 46, 14, 1.5);
  ctx.fill();
  const drumColor = '#B08D57';
  for (let dx = 14; dx <= 50; dx += 9) {
    ctx.fillStyle = drumColor;
    ctx.strokeStyle = '#7A5C34';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.roundRect(dx, 2, 6, 6, 1);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#5A4526';
    ctx.beginPath();
    ctx.arc(dx + 3, 5, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // 7. CENTRAL HULL & ENGINEERING DECK
  ctx.save();
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-60, -8);
  ctx.lineTo(60, -8);
  ctx.lineTo(62, 10);
  ctx.lineTo(-62, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#394447';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-30, -8);
  ctx.lineTo(-30, 10);
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 10);
  ctx.moveTo(30, -8);
  ctx.lineTo(30, 10);
  ctx.moveTo(-62, 4);
  ctx.lineTo(62, 4);
  ctx.stroke();
  ctx.fillStyle = '#394447';
  for (let rx = -56; rx <= 56; rx += 14) {
    for (let ry = -5; ry <= 6; ry += 9) {
      ctx.beginPath();
      ctx.arc(rx, ry, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = hullDarker;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.roundRect(-55, -18, 30, 12, 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = yellow;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-55, -12);
  ctx.lineTo(-25, -12);
  ctx.moveTo(-55, -7);
  ctx.lineTo(-25, -7);
  ctx.stroke();
  ctx.restore();

  // 8. UPPER DECK PERSONNEL QUARTERS
  ctx.save();
  ctx.fillStyle = hullBase;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-45, -8);
  ctx.lineTo(-45, -32);
  ctx.lineTo(-10, -32);
  ctx.lineTo(-5, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#394447';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-45, -20);
  ctx.lineTo(-8, -20);
  ctx.moveTo(-26, -32);
  ctx.lineTo(-26, -8);
  ctx.stroke();
  ctx.fillStyle = hullDarker;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.roundRect(-38, -30, 8, 4, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(-20, -30, 8, 4, 1);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#303A3E';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let vy = -16; vy <= -11; vy += 3) {
    ctx.moveTo(-30, vy);
    ctx.lineTo(-12, vy);
  }
  ctx.stroke();
  ctx.restore();

  // 9. COMMAND BRIDGE & SENSOR SUITE (forward upper)
  ctx.save();
  ctx.fillStyle = hullBase;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(5, -8);
  ctx.lineTo(8, -40);
  ctx.lineTo(42, -40);
  ctx.lineTo(46, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#394447';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(14, -40);
  ctx.lineTo(14, -8);
  ctx.moveTo(30, -40);
  ctx.lineTo(30, -8);
  ctx.stroke();
  ctx.fillStyle = cyan;
  ctx.strokeStyle = '#0F1B1E';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(12, -36);
  ctx.lineTo(36, -36);
  ctx.lineTo(40, -20);
  ctx.lineTo(9, -20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cyanHi;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(14, -33);
  ctx.lineTo(32, -33);
  ctx.lineTo(34, -27);
  ctx.lineTo(13, -27);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.fillStyle = hullDarker;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.roundRect(16, -38, 6, 3, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(26, -38, 6, 3, 1);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cyan;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.roundRect(44, -30, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cyanHi;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.arc(46, -27, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // 10. MASTS, ANTENNAS & RED BEACON
  ctx.save();
  ctx.strokeStyle = hullDarker;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(20, -40);
  ctx.lineTo(20, -52);
  ctx.stroke();
  if (flash) {
    const halo = ctx.createRadialGradient(20, -54, 0, 20, -54, 5);
    halo.addColorStop(0, 'rgba(232,73,66,0.9)');
    halo.addColorStop(1, 'rgba(232,73,66,0)');
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(20, -54, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(20, -54, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = red;
  ctx.beginPath();
  ctx.arc(20, -54, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = hullDarker;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(36, -40);
  ctx.lineTo(36, -49);
  ctx.stroke();
  ctx.fillStyle = '#252E32';
  ctx.beginPath();
  ctx.arc(36, -50, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 11. BLUNT ARMORED BOW WITH HID SEARCHLIGHT BANKS
  ctx.save();
  ctx.fillStyle = hullBase;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(46, -8);
  ctx.lineTo(56, -20);
  ctx.lineTo(62, -20);
  ctx.lineTo(66, -12);
  ctx.lineTo(66, 4);
  ctx.lineTo(58, 8);
  ctx.lineTo(46, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = hullHighlight;
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(56, -18);
  ctx.lineTo(63, -16);
  ctx.stroke();
  for (const sy of [-14, -8]) {
    ctx.fillStyle = '#252E32';
    ctx.strokeStyle = outline;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.roundRect(56, sy, 8, 4, 1);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = cream;
    ctx.beginPath();
    ctx.roundRect(57, sy + 1, 6, 2.4, 0.8);
    ctx.fill();
    ctx.fillStyle = creamGlow;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.roundRect(57.5, sy + 1, 5, 2.4, 0.8);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
  ctx.restore();

  // 12. FUSELAGE STENCIL: MAMMOTH RIG
  ctx.save();
  ctx.fillStyle = yellowLight;
  ctx.font = '900 3.4px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MAMMOTH RIG', -8, -2);
  ctx.fillStyle = '#DDE4DF';
  ctx.font = 'bold 2.2px monospace';
  ctx.fillText('C-95 HEAVY LIFT CARGO', -8, 3.2);
  ctx.fillStyle = '#DDE4DF';
  ctx.beginPath();
  ctx.moveTo(-30, -18);
  ctx.lineTo(-26, -13);
  ctx.lineTo(-34, -13);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#394447';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-30, -17);
  ctx.lineTo(-28, -13.6);
  ctx.stroke();
  ctx.restore();

  // 13. HAZARD STRIPES ALONG LOWER HULL EDGE
  ctx.save();
  ctx.beginPath();
  ctx.rect(-62, 22, 124, 4);
  ctx.clip();
  ctx.fillStyle = yellow;
  ctx.fillRect(-62, 22, 124, 4);
  ctx.strokeStyle = '#292D2D';
  ctx.lineWidth = 2.6;
  for (let hx = -64; hx < 64; hx += 6) {
    ctx.beginPath();
    ctx.moveTo(hx, 27);
    ctx.lineTo(hx + 6, 21);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = yellow;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(-62, 22, 124, 4);
}



// =====================================================================
// 11. WASP SCOUT (WS-2 Stinger - Dual-Pod Micro Recon Lander)
// =====================================================================
// =====================================================================
// 11. WASP HEAVY FIGHTER (WS-3 Stinger — Armored Gunship Interceptor)
// =====================================================================
export function drawWasp(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 29.5 + gearSpringOffset;

  // ---- gradients (user-space, per sub-shape bbox) ----
  const hullLight = ctx.createLinearGradient(0, -38, 0, 24);
  hullLight.addColorStop(0, '#f1f5f9');
  hullLight.addColorStop(1, '#94a3b8');

  const hullDark = ctx.createLinearGradient(0, -26, 0, 28);
  hullDark.addColorStop(0, '#94a3b8');
  hullDark.addColorStop(1, '#475569');

  const podL = ctx.createLinearGradient(-30, 0, -26, 0);
  podL.addColorStop(0, '#475569');
  podL.addColorStop(0.3, '#cbd5e1');
  podL.addColorStop(0.7, '#94a3b8');
  podL.addColorStop(1, '#334155');
  const podR = ctx.createLinearGradient(26, 0, 30, 0);
  podR.addColorStop(0, '#475569');
  podR.addColorStop(0.3, '#cbd5e1');
  podR.addColorStop(0.7, '#94a3b8');
  podR.addColorStop(1, '#334155');
  const cylL = ctx.createLinearGradient(-15, 0, -4, 0);
  cylL.addColorStop(0, '#475569');
  cylL.addColorStop(0.3, '#cbd5e1');
  cylL.addColorStop(0.7, '#94a3b8');
  cylL.addColorStop(1, '#334155');
  const cylR = ctx.createLinearGradient(4, 0, 15, 0);
  cylR.addColorStop(0, '#475569');
  cylR.addColorStop(0.3, '#cbd5e1');
  cylR.addColorStop(0.7, '#94a3b8');
  cylR.addColorStop(1, '#334155');

  const canopyGrad = ctx.createLinearGradient(0, -29, 0, -13);
  canopyGrad.addColorStop(0, '#0f172a');
  canopyGrad.addColorStop(0.4, '#1e293b');
  canopyGrad.addColorStop(1, '#020617');

  const orangeGrad = ctx.createLinearGradient(0, -6, 0, 8);
  orangeGrad.addColorStop(0, '#fb923c');
  orangeGrad.addColorStop(1, '#ea580c');

  const yellowGrad = ctx.createLinearGradient(0, 6, 0, 27);
  yellowGrad.addColorStop(0, '#fde047');
  yellowGrad.addColorStop(1, '#ca8a04');

  // =================================================================
  // 1. LANDING GEAR — Twin Struts & Isolated Footpads
  // =================================================================
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-12, 12);
  ctx.lineTo(-24, footPadY - 1.5);
  ctx.moveTo(12, 12);
  ctx.lineTo(24, footPadY - 1.5);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-12, 12);
  ctx.lineTo(-24, footPadY - 1.5);
  ctx.moveTo(12, 12);
  ctx.lineTo(24, footPadY - 1.5);
  ctx.stroke();

  // Port footpad (isolated subpath)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  roundRect(ctx, -31, footPadY - 2, 14, 4, 1.5);
  ctx.fill();
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  roundRect(ctx, -29, footPadY - 1.5, 10, 2, 1);
  ctx.fill();

  // Starboard footpad (isolated subpath)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  roundRect(ctx, 17, footPadY - 2, 14, 4, 1.5);
  ctx.fill();
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  roundRect(ctx, 19, footPadY - 1.5, 10, 2, 1);
  ctx.fill();

  // =================================================================
  // 2. WINGS — Swept Heavy Wings (hullDark grey)
  // =================================================================
  ctx.fillStyle = hullDark;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  // Port wing
  ctx.beginPath();
  ctx.moveTo(-10, -8);
  ctx.bezierCurveTo(-20, 2, -28, 12, -34, 20);
  ctx.lineTo(-36, 28);
  ctx.lineTo(-24, 24);
  ctx.lineTo(-12, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Starboard wing
  ctx.beginPath();
  ctx.moveTo(10, -8);
  ctx.bezierCurveTo(20, 2, 28, 12, 34, 20);
  ctx.lineTo(36, 28);
  ctx.lineTo(24, 24);
  ctx.lineTo(12, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cannon pods (on the wings)
  ctx.fillStyle = podL;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -30, -4, 4, 26, 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = podR;
  ctx.beginPath();
  roundRect(ctx, 26, -4, 4, 26, 2);
  ctx.fill();
  ctx.stroke();

  // Pod collars
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-29, -10);
  ctx.lineTo(-27, -10);
  ctx.lineTo(-27, -4);
  ctx.lineTo(-29, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(27, -10);
  ctx.lineTo(29, -10);
  ctx.lineTo(29, -4);
  ctx.lineTo(27, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 3. HULL — Armored Fuselage, Raised Plate & Crossbrace
  // =================================================================
  ctx.fillStyle = hullLight;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(6, -26);
  ctx.bezierCurveTo(12, -16, 16, -6, 16, 10);
  ctx.lineTo(12, 24);
  ctx.lineTo(-12, 24);
  ctx.lineTo(-16, 10);
  ctx.bezierCurveTo(-16, -6, -12, -16, -6, -26);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Raised center armor plate
  ctx.fillStyle = hullDark;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(8, -14);
  ctx.lineTo(8, 4);
  ctx.lineTo(4, 8);
  ctx.lineTo(-4, 8);
  ctx.lineTo(-8, 4);
  ctx.lineTo(-8, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Mid-section crossbrace
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -10, -6, 20, 6, 1);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-8, -3);
  ctx.lineTo(8, -3);
  ctx.stroke();

  // Engine cylinders (strapped to the hull)
  ctx.fillStyle = cylL;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -15, 4, 11, 20, 4.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = cylR;
  ctx.beginPath();
  roundRect(ctx, 4, 4, 11, 20, 4.5);
  ctx.fill();
  ctx.stroke();

  // Cylindrical ribbing
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    const y = 12 + i * 3;
    ctx.moveTo(-14, y);
    ctx.lineTo(-5, y);
    ctx.moveTo(5, y);
    ctx.lineTo(14, y);
  }
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // =================================================================
  // 4. ENGINE NOZZLES (L/R exits aligned to thruster anchor planes)
  // =================================================================
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  // Port nozzle
  ctx.beginPath();
  ctx.moveTo(-13, 24);
  ctx.lineTo(-6, 24);
  ctx.lineTo(-7, 28);
  ctx.lineTo(-12, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Starboard nozzle
  ctx.beginPath();
  ctx.moveTo(6, 24);
  ctx.lineTo(13, 24);
  ctx.lineTo(12, 28);
  ctx.lineTo(7, 28);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Nozzle apertures
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.rect(-11, 27, 4, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.rect(7, 27, 4, 2);
  ctx.fill();

  // =================================================================
  // 5. CANOPY — Deep Inset Cockpit Glass
  // =================================================================
  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -29);
  ctx.lineTo(4, -18);
  ctx.lineTo(3, -13);
  ctx.lineTo(-3, -13);
  ctx.lineTo(-4, -18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Canopy highlights
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -27);
  ctx.lineTo(2, -18);
  ctx.lineTo(2, -14);
  ctx.moveTo(0, -27);
  ctx.lineTo(-2, -18);
  ctx.lineTo(-2, -14);
  ctx.stroke();

  // =================================================================
  // 6. DETAILS — Antennae, Accent Struts, Fin, Decals
  // =================================================================
  // Antenna spikes (tips nudged inside viewBox so menu card never clips)
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-3, -32);
  ctx.lineTo(-3, -39.4);
  ctx.moveTo(3, -32);
  ctx.lineTo(3, -39.4);
  ctx.stroke();
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-3, -39.4, 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(3, -39.4, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Orange flanking struts
  ctx.fillStyle = orangeGrad;
  ctx.strokeStyle = '#9a3412';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-11, -6);
  ctx.lineTo(-13, 8);
  ctx.lineTo(-10, 8);
  ctx.lineTo(-8, -6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(11, -6);
  ctx.lineTo(13, 8);
  ctx.lineTo(10, 8);
  ctx.lineTo(8, -6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Central yellow tail fin
  ctx.fillStyle = yellowGrad;
  ctx.strokeStyle = '#a16207';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-1, 6);
  ctx.lineTo(1, 6);
  ctx.lineTo(1.5, 25);
  ctx.lineTo(0, 27);
  ctx.lineTo(-1.5, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wing yellow accent stripes
  ctx.beginPath();
  ctx.moveTo(-29, 14);
  ctx.lineTo(-27, 26);
  ctx.lineTo(-30, 26);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(29, 14);
  ctx.lineTo(27, 26);
  ctx.lineTo(30, 26);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wing panel lines
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-6, -20);
  ctx.lineTo(-14, -12);
  ctx.moveTo(6, -20);
  ctx.lineTo(14, -12);
  ctx.stroke();

  // Center geometric decal
  ctx.fillStyle = '#facc15';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(3, -1);
  ctx.lineTo(0, 2);
  ctx.lineTo(-3, -1);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(2, 2);
  ctx.lineTo(0, 4);
  ctx.lineTo(-2, 2);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

export function drawKestrel(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 29.5 + gearSpringOffset;

  // ---- Gradients (user-space, per sub-shape bbox) ----
  const hullGrad = ctx.createLinearGradient(0, -38, 0, 20);
  hullGrad.addColorStop(0, '#334155');
  hullGrad.addColorStop(0.3, '#1e293b');
  hullGrad.addColorStop(0.7, '#0f172a');
  hullGrad.addColorStop(1, '#020617');

  const wingGrad = ctx.createLinearGradient(0, -4, 0, 18);
  wingGrad.addColorStop(0, '#334155');
  wingGrad.addColorStop(0.45, '#1e293b');
  wingGrad.addColorStop(1, '#0f172a');

  const canardGrad = ctx.createLinearGradient(0, -18, 0, -8);
  canardGrad.addColorStop(0, '#334155');
  canardGrad.addColorStop(0.45, '#1e293b');
  canardGrad.addColorStop(1, '#0f172a');

  const cyanGrad = ctx.createLinearGradient(0, -18, 0, 15);
  cyanGrad.addColorStop(0, '#22d3ee');
  cyanGrad.addColorStop(0.5, '#06b6d4');
  cyanGrad.addColorStop(1, '#0891b2');

  const nacelleL = ctx.createLinearGradient(-17, 6, -8.5, 18);
  nacelleL.addColorStop(0, '#475569');
  nacelleL.addColorStop(0.5, '#334155');
  nacelleL.addColorStop(1, '#0f172a');

  const nacelleR = ctx.createLinearGradient(8.5, 6, 17, 18);
  nacelleR.addColorStop(0, '#475569');
  nacelleR.addColorStop(0.5, '#334155');
  nacelleR.addColorStop(1, '#0f172a');

  const canopyGrad = ctx.createLinearGradient(0, -25, 0, -6);
  canopyGrad.addColorStop(0, '#38bdf8');
  canopyGrad.addColorStop(0.25, '#0284c7');
  canopyGrad.addColorStop(0.7, '#0369a1');
  canopyGrad.addColorStop(1, '#082f49');

  const skidGradL = ctx.createLinearGradient(-30, 0, -18, 0);
  skidGradL.addColorStop(0, '#64748b');
  skidGradL.addColorStop(0.5, '#334155');
  skidGradL.addColorStop(1, '#1e293b');

  const skidGradR = ctx.createLinearGradient(18, 0, 30, 0);
  skidGradR.addColorStop(0, '#64748b');
  skidGradR.addColorStop(0.5, '#334155');
  skidGradR.addColorStop(1, '#1e293b');

  // =================================================================
  // 1. LANDING GEAR — Articulated Spring Struts & Titanium Skids
  // =================================================================
  ctx.lineCap = 'round';

  // Main Oleo Struts
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-13, 10);
  ctx.lineTo(-24, footPadY - 1.5);
  ctx.moveTo(13, 10);
  ctx.lineTo(24, footPadY - 1.5);
  ctx.stroke();

  // Secondary Scissor Torque Links
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-7, 15);
  ctx.lineTo(-24, footPadY - 1.5);
  ctx.moveTo(7, 15);
  ctx.lineTo(24, footPadY - 1.5);
  ctx.stroke();

  // Chrome Lower Piston Sliders
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-21, footPadY - 6.5);
  ctx.lineTo(-24, footPadY - 1.5);
  ctx.moveTo(21, footPadY - 6.5);
  ctx.lineTo(24, footPadY - 1.5);
  ctx.stroke();

  // Left Footpad (strictly isolated subpath)
  ctx.fillStyle = skidGradL;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -30, footPadY - 1.5, 12, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  roundRect(ctx, -28, footPadY + 0.1, 8, 1.2, 0.5);
  ctx.fill();

  // Right Footpad (strictly isolated subpath)
  ctx.fillStyle = skidGradR;
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 18, footPadY - 1.5, 12, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  roundRect(ctx, 20, footPadY + 0.1, 8, 1.2, 0.5);
  ctx.fill();

  // =================================================================
  // 2. WINGS — Forward-Swept Canards & High-Sweep Delta Wings
  // =================================================================
  // Port Canard
  ctx.fillStyle = canardGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-4.5, -18);
  ctx.lineTo(-18, -14);
  ctx.lineTo(-15, -8);
  ctx.lineTo(-5, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Canard
  ctx.beginPath();
  ctx.moveTo(4.5, -18);
  ctx.lineTo(18, -14);
  ctx.lineTo(15, -8);
  ctx.lineTo(5, -10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Canard Bevel Trim
  ctx.fillStyle = cyanGrad;
  ctx.beginPath();
  ctx.moveTo(-4.5, -18);
  ctx.lineTo(-18, -14);
  ctx.lineTo(-14, -13);
  ctx.lineTo(-4.5, -16);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(4.5, -18);
  ctx.lineTo(18, -14);
  ctx.lineTo(14, -13);
  ctx.lineTo(4.5, -16);
  ctx.closePath();
  ctx.fill();

  // Port Main Delta Wing
  ctx.fillStyle = wingGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-6, -4);
  ctx.lineTo(-35, 14);
  ctx.lineTo(-36, 7);
  ctx.lineTo(-35, 18);
  ctx.lineTo(-22, 17.5);
  ctx.lineTo(-8, 18);
  ctx.lineTo(-8, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Main Delta Wing
  ctx.beginPath();
  ctx.moveTo(6, -4);
  ctx.lineTo(35, 14);
  ctx.lineTo(36, 7);
  ctx.lineTo(35, 18);
  ctx.lineTo(22, 17.5);
  ctx.lineTo(8, 18);
  ctx.lineTo(8, 8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Wingtip Endplates / Vertical Fences
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(-36, 6, 2, 12);
  ctx.rect(34, 6, 2, 12);
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 3. HULL — Central Needle Fuselage & Dorsal Spine
  // =================================================================
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(3.5, -31);
  ctx.lineTo(4.8, -18);
  ctx.lineTo(6.5, -4);
  ctx.lineTo(8, 8);
  ctx.lineTo(8, 18);
  ctx.lineTo(0, 20);
  ctx.lineTo(-8, 18);
  ctx.lineTo(-8, 8);
  ctx.lineTo(-6.5, -4);
  ctx.lineTo(-4.8, -18);
  ctx.lineTo(-3.5, -31);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dark Carbon Nose Cap
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(3.5, -31);
  ctx.lineTo(-3.5, -31);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Titanium Airspeed Pitot Probe on Needle Apex
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(0, -39.4);
  ctx.stroke();

  // Central Raised Dorsal Anti-Torque Ridge
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(1.2, -30);
  ctx.lineTo(1.5, 6);
  ctx.lineTo(0, 18);
  ctx.lineTo(-1.5, 6);
  ctx.lineTo(-1.2, -30);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 4. ENGINES — Cryo-Methane Turbopump Nacelles & Bells
  // =================================================================
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.7;

  ctx.fillStyle = nacelleL;
  ctx.beginPath();
  ctx.moveTo(-17, 6);
  ctx.lineTo(-9, 6);
  ctx.lineTo(-8.5, 18);
  ctx.lineTo(-17.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = nacelleR;
  ctx.beginPath();
  ctx.moveTo(9, 6);
  ctx.lineTo(17, 6);
  ctx.lineTo(17.5, 18);
  ctx.lineTo(8.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center Aft Aerodynamic Fairing
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-4, 18);
  ctx.lineTo(4, 18);
  ctx.lineTo(2, 21);
  ctx.lineTo(-2, 21);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Left Engine Bell (exit plane at y=24, center x=-13)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-15.5, 18);
  ctx.lineTo(-10.5, 18);
  ctx.lineTo(-9, 24);
  ctx.lineTo(-17, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(-16, 18, 6, 1.6);

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(-13, 23.5, 3.5, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(-13, 23.5, 1.8, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Right Engine Bell (exit plane at y=24, center x=13)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(10.5, 18);
  ctx.lineTo(15.5, 18);
  ctx.lineTo(17, 24);
  ctx.lineTo(9, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#06b6d4';
  ctx.fillRect(10, 18, 6, 1.6);

  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.ellipse(13, 23.5, 3.5, 0.9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.ellipse(13, 23.5, 1.8, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // =================================================================
  // 5. CANOPY — Faceted Aerobatic Teardrop Bubble
  // =================================================================
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#0891b2';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -25);
  ctx.lineTo(4.8, -16);
  ctx.lineTo(4.5, -8);
  ctx.lineTo(0, -6);
  ctx.lineTo(-4.5, -8);
  ctx.lineTo(-4.8, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -24);
  ctx.lineTo(3.8, -16);
  ctx.lineTo(3.6, -9);
  ctx.lineTo(0, -7);
  ctx.lineTo(-3.6, -9);
  ctx.lineTo(-3.8, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Structural Roll-Bar Hoop
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-3.8, -16);
  ctx.lineTo(3.8, -16);
  ctx.stroke();

  // Specular Arc Highlight
  ctx.save();
  ctx.translate(-1.5, -18);
  ctx.rotate(-15 * Math.PI / 180);
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.ellipse(0, 0, 1.2, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // =================================================================
  // 6. DETAILS & RACING LIVERY
  // =================================================================
  // Electric Cyan Wing Chevrons
  ctx.fillStyle = cyanGrad;
  ctx.beginPath();
  ctx.moveTo(-7, 0);
  ctx.lineTo(-32, 13);
  ctx.lineTo(-32, 15);
  ctx.lineTo(-7, 2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(7, 0);
  ctx.lineTo(32, 13);
  ctx.lineTo(32, 15);
  ctx.lineTo(7, 2);
  ctx.closePath();
  ctx.fill();

  // Thin White Livery Pin-Stripes
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-8, 3);
  ctx.lineTo(-30, 14);
  ctx.moveTo(8, 3);
  ctx.lineTo(30, 14);
  ctx.stroke();
  ctx.restore();

  // Elevon Control Surface Seams & Actuators
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-9, 15);
  ctx.lineTo(-33, 15);
  ctx.moveTo(9, 15);
  ctx.lineTo(33, 15);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  roundRect(ctx, -22, 14, 2, 3, 0.5);
  roundRect(ctx, -15, 14, 2, 3, 0.5);
  roundRect(ctx, 13, 14, 2, 3, 0.5);
  roundRect(ctx, 20, 14, 2, 3, 0.5);
  ctx.fill();

  // Turbopump Air Intake Louvers on Engine Nacelles
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-15, 8); ctx.lineTo(-11, 8);
  ctx.moveTo(-15, 10.5); ctx.lineTo(-11, 10.5);
  ctx.moveTo(-15, 13); ctx.lineTo(-11, 13);
  ctx.moveTo(11, 8); ctx.lineTo(15, 8);
  ctx.moveTo(11, 10.5); ctx.lineTo(15, 10.5);
  ctx.moveTo(11, 13); ctx.lineTo(15, 13);
  ctx.stroke();

  // Fuselage Maintenance & Avionics Seams
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-3.2, -28); ctx.lineTo(3.2, -28);
  ctx.moveTo(-3.8, -22); ctx.lineTo(3.8, -22);
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(-5, 4, 0.8, 0, Math.PI * 2);
  ctx.arc(5, 4, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Wingtip RCS Quads (Roll/Pitch Micro-Thrusters)
  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.arc(-35.5, 9, 0.5, 0, Math.PI * 2);
  ctx.arc(-35.5, 11, 0.5, 0, Math.PI * 2);
  ctx.arc(35.5, 9, 0.5, 0, Math.PI * 2);
  ctx.arc(35.5, 11, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // =================================================================
  // 7. NAVIGATION LIGHTS
  // =================================================================
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-35.5, 16, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(35.5, 16, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(0, 18.5, 0.7, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 13. SPECTRE TRANSPORT (SP-7 Stealth Dropship)
// =====================================================================
export function drawSpectre(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number
) {
  const footPadY = 29.5 + gearSpringOffset;

  // ---- Gradients (user-space, per sub-shape bbox) ----
  const hullGrad = ctx.createLinearGradient(0, -36, 0, 20);
  hullGrad.addColorStop(0, '#1e1b4b');
  hullGrad.addColorStop(0.25, '#0f172a');
  hullGrad.addColorStop(0.65, '#090d16');
  hullGrad.addColorStop(1, '#020617');

  const sponsonGrad = ctx.createLinearGradient(0, -12, 0, 18);
  sponsonGrad.addColorStop(0, '#312e81');
  sponsonGrad.addColorStop(0.35, '#1e1b4b');
  sponsonGrad.addColorStop(0.7, '#0f172a');
  sponsonGrad.addColorStop(1, '#020617');

  const rampGrad = ctx.createLinearGradient(0, 8, 0, 18);
  rampGrad.addColorStop(0, '#1e1b4b');
  rampGrad.addColorStop(0.5, '#0f172a');
  rampGrad.addColorStop(1, '#020617');

  const plasmaGrad = ctx.createLinearGradient(0, -2, 0, 11);
  plasmaGrad.addColorStop(0, '#c084fc');
  plasmaGrad.addColorStop(0.5, '#a855f7');
  plasmaGrad.addColorStop(1, '#6b21a8');

  const nozzleGradL = ctx.createLinearGradient(-18, 6, -8.5, 18);
  nozzleGradL.addColorStop(0, '#334155');
  nozzleGradL.addColorStop(0.5, '#1e1b4b');
  nozzleGradL.addColorStop(1, '#090d16');

  const nozzleGradR = ctx.createLinearGradient(8.5, 6, 18.5, 18);
  nozzleGradR.addColorStop(0, '#334155');
  nozzleGradR.addColorStop(0.5, '#1e1b4b');
  nozzleGradR.addColorStop(1, '#090d16');

  const bridgeGrad = ctx.createLinearGradient(0, -27, 0, -12);
  bridgeGrad.addColorStop(0, '#e9d5ff');
  bridgeGrad.addColorStop(0.25, '#c084fc');
  bridgeGrad.addColorStop(0.65, '#7e22ce');
  bridgeGrad.addColorStop(1, '#3b0764');

  const footGradL = ctx.createLinearGradient(-31, 0, -19, 0);
  footGradL.addColorStop(0, '#475569');
  footGradL.addColorStop(0.5, '#1e1b4b');
  footGradL.addColorStop(1, '#090d16');

  const footGradR = ctx.createLinearGradient(19, 0, 31, 0);
  footGradR.addColorStop(0, '#475569');
  footGradR.addColorStop(0.5, '#1e1b4b');
  footGradR.addColorStop(1, '#090d16');

  // =================================================================
  // 1. HEAVY TRANSPORT LANDING GEAR (Articulated Struts & Wide Skids)
  // =================================================================
  ctx.lineCap = 'round';

  // Heavy Pneumatic Main Struts
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.lineTo(-25, footPadY - 1.5);
  ctx.moveTo(16, 12);
  ctx.lineTo(25, footPadY - 1.5);
  ctx.stroke();

  // Scissor Anti-Torque Hinges
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-8, 16);
  ctx.lineTo(-25, footPadY - 1.5);
  ctx.moveTo(8, 16);
  ctx.lineTo(25, footPadY - 1.5);
  ctx.stroke();

  // Heavy Hydraulic Piston Sliders
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-22, footPadY - 7.5);
  ctx.lineTo(-25, footPadY - 1.5);
  ctx.moveTo(22, footPadY - 7.5);
  ctx.lineTo(25, footPadY - 1.5);
  ctx.stroke();

  // Left Transport Skid Footpad (strictly isolated subpath)
  ctx.fillStyle = footGradL;
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -31, footPadY - 1.5, 12, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  roundRect(ctx, -29, footPadY + 0.1, 8, 1.2, 0.5);
  ctx.fill();

  // Right Transport Skid Footpad (strictly isolated subpath)
  ctx.fillStyle = footGradR;
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 19, footPadY - 1.5, 12, 3, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#020617';
  ctx.beginPath();
  roundRect(ctx, 21, footPadY + 0.1, 8, 1.2, 0.5);
  ctx.fill();

  // =================================================================
  // 2. FLANKING HEAVY LIFT SPONSONS & AERODYNAMIC CHINES
  // =================================================================
  // Port Sponson
  ctx.fillStyle = sponsonGrad;
  ctx.strokeStyle = '#1e1b4b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-10, -12);
  ctx.lineTo(-33, 6);
  ctx.lineTo(-33, 14);
  ctx.lineTo(-25, 15);
  ctx.lineTo(-22, 18);
  ctx.lineTo(-10, 18);
  ctx.lineTo(-9, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Sponson
  ctx.beginPath();
  ctx.moveTo(10, -12);
  ctx.lineTo(33, 6);
  ctx.lineTo(33, 14);
  ctx.lineTo(25, 15);
  ctx.lineTo(22, 18);
  ctx.lineTo(10, 18);
  ctx.lineTo(9, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Sponson Leading Edge Stealth Chamfers
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(-10, -12);
  ctx.lineTo(-33, 6);
  ctx.lineTo(-29, 7);
  ctx.lineTo(-10, -9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, -12);
  ctx.lineTo(33, 6);
  ctx.lineTo(29, 7);
  ctx.lineTo(10, -9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Outer Sponson Cargo Egress Flanges
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -33.5, 8, 3.5, 6, 0.8);
  roundRect(ctx, 30, 8, 3.5, 6, 0.8);
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 3. CENTRAL MAIN TRANSPORT FUSELAGE (Cargo Hold & Structural Keel)
  // =================================================================
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#312e81';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(6, -34);
  ctx.lineTo(11, -20);
  ctx.lineTo(13, 2);
  ctx.lineTo(11, 18);
  ctx.lineTo(0, 20);
  ctx.lineTo(-11, 18);
  ctx.lineTo(-13, 2);
  ctx.lineTo(-11, -20);
  ctx.lineTo(-6, -34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Faceted Forward Nose Cap / Radar Radome
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(6, -34);
  ctx.lineTo(7, -24);
  ctx.lineTo(-7, -24);
  ctx.lineTo(-6, -34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Low-RCS Forward Pitot & Sensor Probe
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(0, -39.2);
  ctx.stroke();

  // Central Cargo Hold Spine & Keel
  ctx.fillStyle = '#1e1b4b';
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(2, -22);
  ctx.lineTo(2.5, 4);
  ctx.lineTo(0, 18);
  ctx.lineTo(-2.5, 4);
  ctx.lineTo(-2, -22);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cargo Bay Rear Clamshell Loading Ramp
  ctx.fillStyle = rampGrad;
  ctx.strokeStyle = '#6b21a8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-6, 8);
  ctx.lineTo(6, 8);
  ctx.lineTo(5, 18);
  ctx.lineTo(-5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Ramp Sawtooth Hydraulic Seal Latches
  ctx.strokeStyle = '#a855f7';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-5, 12);
  ctx.lineTo(-4, 13);
  ctx.lineTo(-2, 12);
  ctx.lineTo(0, 13);
  ctx.lineTo(2, 12);
  ctx.lineTo(4, 13);
  ctx.lineTo(5, 12);
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-5, 18);
  ctx.lineTo(5, 18);
  ctx.stroke();

  // =================================================================
  // 4. ENGINES — Twin Heavy-Lift 2D Vectoring Nacelles
  // =================================================================
  ctx.strokeStyle = '#1e1b4b';
  ctx.lineWidth = 0.8;

  // Port Nacelle Shroud
  ctx.fillStyle = nozzleGradL;
  ctx.beginPath();
  ctx.moveTo(-18, 6);
  ctx.lineTo(-9, 6);
  ctx.lineTo(-8.5, 18);
  ctx.lineTo(-18.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Nacelle Shroud
  ctx.fillStyle = nozzleGradR;
  ctx.beginPath();
  ctx.moveTo(9, 6);
  ctx.lineTo(18, 6);
  ctx.lineTo(18.5, 18);
  ctx.lineTo(8.5, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Port 2D Serrated Nozzle Bell Opening
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-17, 18);
  ctx.lineTo(-10, 18);
  ctx.lineTo(-9, 24);
  ctx.lineTo(-18, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#312e81';
  ctx.fillRect(-17.5, 18, 8, 1.8);

  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.ellipse(-13.5, 23.5, 4, 1.0, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.ellipse(-13.5, 23.5, 2, 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Starboard 2D Serrated Nozzle Bell Opening
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(10, 18);
  ctx.lineTo(17, 18);
  ctx.lineTo(18, 24);
  ctx.lineTo(9, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#312e81';
  ctx.fillRect(9.5, 18, 8, 1.8);

  ctx.fillStyle = '#1e1b4b';
  ctx.beginPath();
  ctx.ellipse(13.5, 23.5, 4, 1.0, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.ellipse(13.5, 23.5, 2, 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Aft Beaver-Tail Aerodynamic Fairing
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#312e81';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-3.5, 18);
  ctx.lineTo(3.5, 18);
  ctx.lineTo(2, 21.5);
  ctx.lineTo(-2, 21.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // =================================================================
  // 5. COMMAND FLIGHT DECK (Wide Multi-Pane Bridge Canopy)
  // =================================================================
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#6b21a8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(0, -27);
  ctx.lineTo(7, -23);
  ctx.lineTo(6.5, -14);
  ctx.lineTo(0, -12);
  ctx.lineTo(-6.5, -14);
  ctx.lineTo(-7, -23);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = bridgeGrad;
  ctx.strokeStyle = '#c084fc';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(5.8, -22.5);
  ctx.lineTo(5.2, -15);
  ctx.lineTo(0, -13);
  ctx.lineTo(-5.2, -15);
  ctx.lineTo(-5.8, -22.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Window Mullions (Split Pilot & Commander Stations)
  ctx.strokeStyle = '#1e1b4b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(0, -13);
  ctx.moveTo(-5.5, -18.5);
  ctx.lineTo(5.5, -18.5);
  ctx.stroke();

  // Specular Reflection Highlight
  ctx.save();
  ctx.translate(-2.5, -21);
  ctx.rotate(-15 * Math.PI / 180);
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(0, 0, 1.2, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // =================================================================
  // 6. TRANSPORT CABIN DETAILS (Airlocks, Ports, Structural Ribs)
  // =================================================================
  // Side Personnel Airlock Doors
  ctx.fillStyle = '#1e1b4b';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  roundRect(ctx, -10.5, -5, 2, 6, 0.5);
  roundRect(ctx, 8.5, -5, 2, 6, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#a855f7';
  ctx.beginPath();
  ctx.arc(-9.5, -2, 0.4, 0, Math.PI * 2);
  ctx.arc(9.5, -2, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // Passenger / Sensor Observation Window Ports
  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  roundRect(ctx, -8.5, 2, 1.4, 2.2, 0.4);
  roundRect(ctx, -8.5, 5.5, 1.4, 2.2, 0.4);
  roundRect(ctx, 7.1, 2, 1.4, 2.2, 0.4);
  roundRect(ctx, 7.1, 5.5, 1.4, 2.2, 0.4);
  ctx.fill();

  // Luminescent Guidance Strips Along Sponson Flanks
  ctx.fillStyle = plasmaGrad;
  ctx.beginPath();
  ctx.moveTo(-11, -2);
  ctx.lineTo(-29, 9);
  ctx.lineTo(-29, 11);
  ctx.lineTo(-11, 0);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(11, -2);
  ctx.lineTo(29, 9);
  ctx.lineTo(29, 11);
  ctx.lineTo(11, 0);
  ctx.closePath();
  ctx.fill();

  ctx.save();
  ctx.globalAlpha = 0.85;
  ctx.strokeStyle = '#e9d5ff';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-12, 2);
  ctx.lineTo(-27, 11);
  ctx.moveTo(12, 2);
  ctx.lineTo(27, 11);
  ctx.stroke();
  ctx.restore();

  // Cargo Bay Tie-Down Latches & Structural Ribs
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-5, 3); ctx.lineTo(5, 3);
  ctx.moveTo(-5.5, -7); ctx.lineTo(5.5, -7);
  ctx.moveTo(-10, 13); ctx.lineTo(-24, 13);
  ctx.moveTo(10, 13); ctx.lineTo(24, 13);
  ctx.stroke();

  // Heavy-Duty Quad RCS Blocks on Sponsons
  ctx.fillStyle = '#ca8a04';
  ctx.beginPath();
  ctx.arc(-32.5, 9.5, 0.6, 0, Math.PI * 2);
  ctx.arc(-32.5, 12.5, 0.6, 0, Math.PI * 2);
  ctx.arc(32.5, 9.5, 0.6, 0, Math.PI * 2);
  ctx.arc(32.5, 12.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // =================================================================
  // 7. NAVIGATION LIGHTS & BEACONS
  // =================================================================
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-32.5, 14, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(32.5, 14, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#c084fc';
  ctx.beginPath();
  ctx.arc(0, 19.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(0, -34, 0.6, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 14. ORION / TERRA-HOPPER (TH-01 Lightweight Terrestrial Lander)
// =====================================================================
export function drawOrion(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship?: any,
  time?: number
) {
  const animTime = time !== undefined ? time : Date.now() / 1000;
  const footPadY = 19.5 + gearSpringOffset;
  const padKnuckleY = footPadY - 2.0;
  const bellY = 17.5 + gearSpringOffset * 0.4;

  // Gradients for Canvas Drawing
  const hullGrad = ctx.createLinearGradient(0, -17, 0, 11);
  hullGrad.addColorStop(0, '#1d4ed8');
  hullGrad.addColorStop(0.5, '#1e3a8a');
  hullGrad.addColorStop(1, '#0f172a');

  const shieldGrad = ctx.createLinearGradient(0, 6, 0, 13);
  shieldGrad.addColorStop(0, '#334155');
  shieldGrad.addColorStop(0.5, '#1e293b');
  shieldGrad.addColorStop(1, '#090d16');

  const frameGrad = ctx.createLinearGradient(0, -9, 0, 9);
  frameGrad.addColorStop(0, '#475569');
  frameGrad.addColorStop(0.5, '#1e293b');
  frameGrad.addColorStop(1, '#0f172a');

  const tankGrad = ctx.createLinearGradient(29, 0, 44, 0);
  tankGrad.addColorStop(0, '#1e293b');
  tankGrad.addColorStop(0.35, '#475569');
  tankGrad.addColorStop(0.7, '#64748b');
  tankGrad.addColorStop(1, '#1e293b');

  const bellGrad = ctx.createLinearGradient(0, 11, 0, bellY);
  bellGrad.addColorStop(0, '#475569');
  bellGrad.addColorStop(0.5, '#334155');
  bellGrad.addColorStop(1, '#1e293b');

  const strutGrad = ctx.createLinearGradient(-38, 7, -34, 18);
  strutGrad.addColorStop(0, '#94a3b8');
  strutGrad.addColorStop(0.4, '#f8fafc');
  strutGrad.addColorStop(0.7, '#cbd5e1');
  strutGrad.addColorStop(1, '#475569');

  // 1. DORSAL COMMUNICATION ANTENNAS (Background Layer)
  // Tall Vertical Whip Antenna
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(2, -16);
  ctx.lineTo(2, -23.5);
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(2, -16.2, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Blinking Top Red Antenna Beacon (1.0 Hz period: 0.5s on, 0.5s off)
  const isBeaconOn = (animTime % 1.0) < 0.5;
  if (isBeaconOn) {
    // Outer radiant halo
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(2, -23.5, 2.2, 0, Math.PI * 2);
    ctx.fill();
    // Mid glow core
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(2, -23.5, 0.8, 0, Math.PI * 2);
    ctx.fill();
    // Inner hot white spark
    ctx.fillStyle = '#fecaca';
    ctx.beginPath();
    ctx.arc(2, -23.5, 0.3, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Dormant filament bulb
    ctx.fillStyle = 'rgba(153, 27, 27, 0.6)';
    ctx.beginPath();
    ctx.arc(2, -23.5, 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Angled Comms Mast (45° backward rake)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(6, -16);
  ctx.lineTo(13.5, -22.5);
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(8, -15.5);
  ctx.lineTo(10, -19.5);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.arc(6, -15.8, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(13.5, -22.5, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // 2. FAR-SIDE / BACKGROUND STRUCTURES (Shadowed)
  // Far-Side Upper Canted Fin
  ctx.fillStyle = '#172554';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(43, -7); ctx.lineTo(57, -16); ctx.lineTo(58, -12); ctx.lineTo(45, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Far-Side Lower Canted Fin
  ctx.beginPath();
  ctx.moveTo(44, -1); ctx.lineTo(57, 11); ctx.lineTo(56, 14); ctx.lineTo(43, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Far-Side Landing Gear Skids (Background Shadow)
  // Front Far-Side Skid
  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-36, 7); ctx.lineTo(-41, footPadY - 2.5);
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-46, footPadY - 1); ctx.lineTo(-36, footPadY - 1); ctx.lineTo(-35, footPadY - 2.5); ctx.lineTo(-47, footPadY - 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Rear Far-Side Skid
  ctx.save();
  ctx.globalAlpha = 0.75;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(34, 7); ctx.lineTo(39, footPadY - 2.5);
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(34, footPadY - 1); ctx.lineTo(44, footPadY - 1); ctx.lineTo(45, footPadY - 2.5); ctx.lineTo(33, footPadY - 2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // 3. UNDERBELLY THERMAL SHIELDING & RETRACTED ACCESS RAMP
  ctx.fillStyle = shieldGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-42, 6); ctx.lineTo(-18, 11); ctx.lineTo(28, 11); ctx.lineTo(44, 7);
  ctx.lineTo(41, 9); ctx.lineTo(-18, 12.5); ctx.lineTo(-40, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Thermal Shielding Tile Texture & Seams
  ctx.save();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([1.5, 1.5]);
  ctx.beginPath();
  const seamLines = [
    [-34, 7.2, -34, 9.5], [-28, 8, -28, 10.5], [-22, 8.8, -22, 11.2],
    [-12, 9.8, -12, 12], [-2, 10.2, -2, 12.2], [8, 10.2, 8, 12.2],
    [18, 9.8, 18, 11.8], [28, 9.2, 28, 11], [36, 8.2, 36, 9.8]
  ];
  for (const [x1, y1, x2, y2] of seamLines) {
    ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
  }
  ctx.stroke();
  ctx.restore();

  // Retracted Foldable Access Ramp Under Cockpit Chin
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-47, 3.5); ctx.lineTo(-37, 7.2); ctx.lineTo(-36, 5.8); ctx.lineTo(-45.5, 2.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.arc(-46.5, 3.2, 0.7, 0, Math.PI * 2);
  ctx.arc(-37, 6.8, 0.7, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.7;
  ctx.setLineDash([1.2, 1]);
  ctx.beginPath();
  ctx.moveTo(-44, 3.2); ctx.lineTo(-39, 5.6);
  ctx.stroke();
  ctx.restore();

  // 4. MAIN CARBON COMPOSITE HULL (BLUE)
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#172554';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-54, -2); ctx.lineTo(-38, -9); ctx.lineTo(-24, -14); ctx.lineTo(-6, -16.5);
  ctx.lineTo(24, -16.5); ctx.lineTo(43, -7); ctx.lineTo(44, 7); ctx.lineTo(28, 11);
  ctx.lineTo(-18, 11); ctx.lineTo(-38, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Hull Dorsal Spine Chamfer / Upper High-Tech Bevel
  ctx.save();
  ctx.fillStyle = '#3b82f6';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(-38, -9); ctx.lineTo(-24, -14); ctx.lineTo(-6, -16.5); ctx.lineTo(24, -16.5);
  ctx.lineTo(41, -8); ctx.lineTo(39, -9.5); ctx.lineTo(23, -15.2); ctx.lineTo(-6, -15.2);
  ctx.lineTo(-23, -13); ctx.lineTo(-36, -8.2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Lower Keel Accent Pinstripe
  ctx.save();
  ctx.strokeStyle = '#60a5fa';
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(-37, 6.5); ctx.lineTo(-18, 10.2); ctx.lineTo(27, 10.2); ctx.lineTo(42, 6.5);
  ctx.stroke();
  ctx.restore();

  // Structural Panel Seams
  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-38, -9); ctx.lineTo(-38, 7);
  ctx.moveTo(-24, -14); ctx.lineTo(-24, -9);
  ctx.moveTo(24, -16.5); ctx.lineTo(24, -9);
  ctx.moveTo(28, -14); ctx.lineTo(28, 10);
  ctx.stroke();

  // 5. AVIONICS & NAVIGATION BAY (Louvered Dorsal Spine)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-22, -14); ctx.lineTo(-7, -16.2); ctx.lineTo(-6, -13.5); ctx.lineTo(-21, -11.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-20, -12.3); ctx.lineTo(-8, -14.5);
  ctx.moveTo(-19.5, -13); ctx.lineTo(-8.5, -15.1);
  ctx.moveTo(-19, -13.7); ctx.lineTo(-9, -15.7);
  ctx.stroke();

  // 6. ENERGY STORAGE UNIT (Power Core Housing)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, 9, -17.5, 7, 3.2, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  roundRect(ctx, 10, -17, 5, 2, 0.6);
  ctx.fill();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(11.5, -16, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(13.2, -16); ctx.lineTo(14.5, -16);
  ctx.stroke();

  // 7. AFT HYDROGEN/OXYGEN PROPELLANT TANKS
  // Upper Cylindrical Tank
  ctx.fillStyle = tankGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, 29, -8.5, 15, 8, 2.5);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.7;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(30, -7); ctx.lineTo(43, -7);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = '#292524';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(32, -8.5); ctx.lineTo(32, -0.5);
  ctx.moveTo(38, -8.5); ctx.lineTo(38, -0.5);
  ctx.moveTo(42.5, -8.5); ctx.lineTo(42.5, -0.5);
  ctx.stroke();

  ctx.fillStyle = '#44403c';
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(44, -4.5, 1, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Lower Cylindrical Tank
  ctx.fillStyle = tankGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, 29, -1.5, 15, 8, 2.5);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.7;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(30, 0); ctx.lineTo(43, 0);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = '#292524';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(32, -1.5); ctx.lineTo(32, 6.5);
  ctx.moveTo(38, -1.5); ctx.lineTo(38, 6.5);
  ctx.moveTo(42.5, -1.5); ctx.lineTo(42.5, 6.5);
  ctx.stroke();

  ctx.fillStyle = '#44403c';
  ctx.strokeStyle = '#1c1917';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(44, 2.5, 1, 3.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Cryogenic Plumbing
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(28, -4); ctx.lineTo(25, -4); ctx.lineTo(25, 2); ctx.lineTo(28, 2);
  ctx.stroke();
  ctx.fillStyle = '#0284c7';
  ctx.beginPath();
  ctx.arc(26.5, -1, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // 8. AFT MAIN CRUISE PROPULSION THRUSTERS (Dual Ion Vector Bells)
  // Upper Cruise Nozzle
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(44, -4.5); ctx.lineTo(49, -5); ctx.lineTo(51, -6); ctx.lineTo(51, -2); ctx.lineTo(49, -3); ctx.lineTo(44, -3.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(51, -4, 0.9, 2.0, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.ellipse(51, -4, 0.4, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Lower Cruise Nozzle
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(44, 2.5); ctx.lineTo(49, 2); ctx.lineTo(51, 1); ctx.lineTo(51, 5); ctx.lineTo(49, 4); ctx.lineTo(44, 3.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(51, 3, 0.9, 2.0, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.ellipse(51, 3, 0.4, 1.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // 9. AFT STABILIZATION FINS (Near-Side)
  // Upper Canted Fin
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(42, -7); ctx.lineTo(59, -17); ctx.lineTo(61, -13); ctx.lineTo(46, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(42, -7); ctx.lineTo(59, -17);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(43, -6); ctx.lineTo(58, -15.5);
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(56, -11); ctx.lineTo(60, -13); ctx.lineTo(58, -8); ctx.lineTo(54, -7);
  ctx.closePath();
  ctx.fill();

  // Navigation Strobe Upper Fin Tip
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(60.5, -15, 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.arc(60.5, -15, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Lower Canted Fin
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(43, 0); ctx.lineTo(59, 12); ctx.lineTo(58, 16); ctx.lineTo(44, 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(43, 0); ctx.lineTo(59, 12);
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(44, 1); ctx.lineTo(58, 11.5);
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(55, 10); ctx.lineTo(58, 14); ctx.lineTo(56, 15); ctx.lineTo(53, 11);
  ctx.closePath();
  ctx.fill();

  // Navigation Strobe Lower Fin Tip
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(58.5, 14, 0.7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fecaca';
  ctx.beginPath();
  ctx.arc(58.5, 14, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // 10. REACTION CONTROL SYSTEM (RCS) THRUSTERS
  // Forward Chin RCS Quad
  ctx.save();
  ctx.translate(-48, 0);
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(-2, -1); ctx.lineTo(-2, 1); ctx.closePath();
  ctx.moveTo(0, 0); ctx.lineTo(-1, -2); ctx.lineTo(1, -2); ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(0, 0, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Mid-Dorsal RCS Thruster Block
  ctx.save();
  ctx.translate(0, -17.2);
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -1.8, -1.2, 3.6, 1.8, 0.5);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(-1, 0); ctx.lineTo(-1, -2); ctx.lineTo(0, -2); ctx.lineTo(0, 0); ctx.closePath();
  ctx.moveTo(0, 0); ctx.lineTo(0, -2); ctx.lineTo(1, -2); ctx.lineTo(1, 0); ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Aft RCS Nozzle Cluster
  ctx.save();
  ctx.translate(46, 6.5);
  ctx.rotate(0.436); // ~25 deg
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, 0); ctx.lineTo(2.5, -1.5); ctx.lineTo(2.5, 1.5); ctx.closePath();
  ctx.moveTo(0, 0); ctx.lineTo(-1.5, 2.5); ctx.lineTo(1.5, 2.5); ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(0, 0, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 11. INTERNAL CARGO/PERSONNEL COMPARTMENT (Recessed Cutaway Door)
  ctx.fillStyle = '#060a12';
  ctx.strokeStyle = frameGrad;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-14, -9); ctx.lineTo(17, -9); ctx.lineTo(18, -7.5); ctx.lineTo(18, 7.5);
  ctx.lineTo(17, 9); ctx.lineTo(-13, 9); ctx.lineTo(-14, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lattice Framework
  ctx.save();
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(-12, -8); ctx.lineTo(-4, 8);
  ctx.moveTo(-4, -8); ctx.lineTo(-12, 8);
  ctx.moveTo(-4, -8); ctx.lineTo(4, 8);
  ctx.moveTo(4, -8); ctx.lineTo(-4, 8);
  ctx.moveTo(4, -8); ctx.lineTo(12, 8);
  ctx.moveTo(12, -8); ctx.lineTo(4, 8);
  ctx.moveTo(12, -8); ctx.lineTo(16, 8);
  ctx.moveTo(16, -8); ctx.lineTo(12, 8);
  ctx.stroke();
  ctx.restore();

  // Overhead Downlight Glow
  ctx.save();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.8;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(-12, -8.2); ctx.lineTo(16, -8.2);
  ctx.stroke();
  ctx.restore();

  // 6 PASSENGER ERGONOMIC SEATS (Arranged in 2 Rows)
  const drawSeat = (x: number, y: number, w: number, h: number, isFore: boolean) => {
    ctx.fillStyle = isFore ? '#334155' : '#1e293b';
    ctx.strokeStyle = isFore ? '#475569' : '#334155';
    ctx.lineWidth = isFore ? 0.7 : 0.6;
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, 0.8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isFore ? '#475569' : '#334155';
    ctx.beginPath();
    roundRect(ctx, x + 0.6, y - 2, w - 1.2, 2, 0.6);
    ctx.fill();
    if (isFore) {
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, y + 2.2); ctx.lineTo(x + w, y + 2.2);
      ctx.stroke();
    }
  };

  // Rear Row
  drawSeat(-3, -4, 3.4, 4.5, false);
  drawSeat(1.5, -4, 3.4, 4.5, false);
  drawSeat(6, -4, 3.4, 4.5, false);

  // Front Row
  drawSeat(-1, -1, 3.6, 5, true);
  drawSeat(3.5, -1, 3.6, 5, true);
  drawSeat(8, -1, 3.6, 5, true);

  // Tactical Status Screen
  ctx.fillStyle = '#052e16';
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, 12.5, -6, 4.5, 5.5, 0.6);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(13.2, -3.5); ctx.lineTo(14, -3.5); ctx.lineTo(14.5, -4.8); ctx.lineTo(15, -2.2); ctx.lineTo(15.4, -3.5); ctx.lineTo(16.2, -3.5);
  ctx.stroke();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.fillRect(13.2, -5.2, 1.4, 0.6);
  ctx.fillRect(15, -5.2, 1.4, 0.6);

  ctx.save();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([0.8, 0.6]);
  ctx.beginPath();
  ctx.moveTo(13.2, -1.5); ctx.lineTo(16.2, -1.5);
  ctx.stroke();
  ctx.restore();

  // Sliding Access Door Pocket (Left)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-14, -8.5); ctx.lineTo(-5.5, -8.5); ctx.lineTo(-5.5, 8.5); ctx.lineTo(-13.5, 8.5); ctx.lineTo(-14, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-12.5, -7); ctx.lineTo(-7, -7); ctx.lineTo(-7, 7); ctx.lineTo(-12, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -11.5, -4, 3.5, 7, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-6.5, -2); ctx.lineTo(-6.5, 3);
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-13.5, -8); ctx.lineTo(16.5, -8);
  ctx.moveTo(-13.5, 8); ctx.lineTo(16.5, 8);
  ctx.stroke();

  // 12. PILOT COCKPIT (Faceted Panoramic Cyan Visor)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-53, -2.5); ctx.lineTo(-38, -9.5); ctx.lineTo(-24, -14.5); ctx.lineTo(-22, -13);
  ctx.lineTo(-35, -4); ctx.lineTo(-46, 0); ctx.lineTo(-51, -0.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const visorGrad = ctx.createLinearGradient(-50, -10, -25, 0);
  visorGrad.addColorStop(0, '#06b6d4');
  visorGrad.addColorStop(0.5, '#0284c7');
  visorGrad.addColorStop(1, '#0c4a6e');

  // Facet 1
  ctx.fillStyle = visorGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-50.5, -2); ctx.lineTo(-39, -8.5); ctx.lineTo(-36, -4); ctx.lineTo(-46, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Facet 2
  ctx.beginPath();
  ctx.moveTo(-39, -8.5); ctx.lineTo(-25, -13.5); ctx.lineTo(-23, -12); ctx.lineTo(-36, -4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Facet 3: Eyebrow Glass
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.moveTo(-37.5, -8.8); ctx.lineTo(-25.2, -13.7); ctx.lineTo(-23.5, -13.7); ctx.lineTo(-34.5, -9.5);
  ctx.closePath();
  ctx.fill();

  // Specular Glare Highlights
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-47, -1); ctx.lineTo(-38, -7); ctx.lineTo(-37, -5.5);
  ctx.stroke();

  ctx.save();
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.7;
  ctx.beginPath();
  ctx.moveTo(-34, -5.5); ctx.lineTo(-26, -11.5);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-39, -8.5); ctx.lineTo(-36, -4);
  ctx.stroke();

  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-46, 0); ctx.lineTo(-36, -4);
  ctx.stroke();

  // 13. EXTERNAL SENSOR ARRAY WITH SLOW HORIZONTAL ROTATION
  // Gimballed Chin Turret just below cabin
  ctx.save();
  ctx.translate(-50, 4.5);

  // Static Yoke Bracket
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-3, -3); ctx.lineTo(3, -3); ctx.lineTo(2.2, -1.2); ctx.lineTo(-2.2, -1.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(0, -2.0, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Rotating Sensor Turret Assembly (Slow 3D Horizontal Rotation, period 7.5s)
  ctx.save();
  const sensorRotCycle = (animTime / 7.5) % 1;
  const sensorScaleX = Math.cos(sensorRotCycle * Math.PI * 2);
  ctx.scale(sensorScaleX, 1);

  // Turret Sphere / Casing
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -2.6, -1.5, 5.2, 4.4, 2.0);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-2.6, 0.7); ctx.lineTo(2.6, 0.7);
  ctx.stroke();

  // Primary FLIR / Optical Lens
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-0.8, 0.7, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#06b6d4';
  ctx.beginPath();
  ctx.arc(-0.8, 0.7, 0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-1.1, 0.4, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Secondary Optical Aperture
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(1.1, 0.7, 0.85, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(1.1, 0.7, 0.55, 0, Math.PI * 2);
  ctx.fill();

  // Status Indicator Green LED
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(0, -0.6, 0.35, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();

  // 14. NOSE HEADLIGHT / INTAKE & NAVIGATION LIGHTS
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-46, -1.5); ctx.lineTo(-40, 1); ctx.lineTo(-40, 2.5); ctx.lineTo(-45, 1.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#bae6fd';
  ctx.beginPath();
  ctx.moveTo(-45.5, -1); ctx.lineTo(-40.5, 1.2); ctx.lineTo(-40.5, 2.1); ctx.lineTo(-44.8, 1.2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(-36, 0.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(-36, 0.5, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // 15. PROMINENT VTOL ION/PLASMA HOVER THRUSTERS
  // Front VTOL Thruster Assembly (Between Cabin and Access Door, centered at x = -20)
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-24, -1.5); ctx.lineTo(-16, -1.5); ctx.lineTo(-16, 11); ctx.lineTo(-19, 12.2); ctx.lineTo(-23, 12.2); ctx.lineTo(-24, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-23, 0); ctx.lineTo(-17, 0); ctx.lineTo(-17, 10.5); ctx.lineTo(-23, 10.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(-20, 1.5, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Flared Nozzle Bell
  ctx.fillStyle = bellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-22, 11.5); ctx.lineTo(-18, 11.5); ctx.lineTo(-16, bellY); ctx.lineTo(-24, bellY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Concentric Cooling Rings
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-21.5, 13); ctx.lineTo(-18.5, 13);
  ctx.moveTo(-22.5, 14.8); ctx.lineTo(-17.5, 14.8);
  ctx.moveTo(-23.5, 16.3); ctx.lineTo(-16.5, 16.3);
  ctx.stroke();

  // Exit Aperture
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.ellipse(-20, bellY, 4.0, 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.ellipse(-20, bellY, 2.5, 0.7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Downward Ion Plume Glow
  ctx.save();
  const ionGrad3 = ctx.createLinearGradient(0, bellY, 0, bellY + 7);
  ionGrad3.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  ionGrad3.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = ionGrad3;
  ctx.beginPath();
  ctx.moveTo(-23, bellY); ctx.lineTo(-17, bellY); ctx.lineTo(-15, bellY + 7); ctx.lineTo(-25, bellY + 7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Rear Near-Side Thruster Assembly (VTOL Unit 4 of 4)
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(18, -1.5); ctx.lineTo(26, -1.5); ctx.lineTo(26, 11); ctx.lineTo(23, 12.2); ctx.lineTo(19, 12.2); ctx.lineTo(18, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(19, 0); ctx.lineTo(25, 0); ctx.lineTo(25, 10.5); ctx.lineTo(19, 10.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(22, 1.5, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Flared Nozzle Bell
  ctx.fillStyle = bellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(20, 11.5); ctx.lineTo(24, 11.5); ctx.lineTo(26, bellY); ctx.lineTo(18, bellY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Concentric Cooling Rings
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(20.5, 13); ctx.lineTo(23.5, 13);
  ctx.moveTo(19.5, 14.8); ctx.lineTo(24.5, 14.8);
  ctx.moveTo(18.5, 16.3); ctx.lineTo(25.5, 16.3);
  ctx.stroke();

  // Exit Aperture
  ctx.fillStyle = '#0284c7';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.ellipse(22, bellY, 4.0, 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e0f2fe';
  ctx.beginPath();
  ctx.ellipse(22, bellY, 2.5, 0.7, 0, 0, Math.PI * 2);
  ctx.fill();

  // Downward Ion Plume Glow
  ctx.save();
  const ionGrad4 = ctx.createLinearGradient(0, bellY, 0, bellY + 7);
  ionGrad4.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
  ionGrad4.addColorStop(1, 'rgba(2, 132, 199, 0)');
  ctx.fillStyle = ionGrad4;
  ctx.beginPath();
  ctx.moveTo(19, bellY); ctx.lineTo(25, bellY); ctx.lineTo(27, bellY + 7); ctx.lineTo(17, bellY + 7);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 16. WIDE BALANCED ARTICULATED LANDING GEAR (Foreground Layer)
  // Forward Heavy Landing Gear Assembly (x = -38)
  // Bracket
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-36, 6); ctx.lineTo(-31, 6); ctx.lineTo(-32, 10); ctx.lineTo(-37, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-34, 7.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Chrome Strut
  ctx.fillStyle = strutGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-35, 9); ctx.lineTo(-33, 9); ctx.lineTo(-37, padKnuckleY); ctx.lineTo(-39, padKnuckleY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Scissor Torque Link
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-34, 11); ctx.lineTo(-31.5, 13.5); ctx.lineTo(-35.5, 15.5);
  ctx.stroke();
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(-31.5, 13.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Knuckle Joint
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(-38, padKnuckleY, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(-38, padKnuckleY, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Footpad Skid (Isolated Subpath)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-45, footPadY - 3.0);
  ctx.lineTo(-44, footPadY - 2.0);
  ctx.lineTo(-32, footPadY - 2.0);
  ctx.lineTo(-31, footPadY - 3.0);
  ctx.lineTo(-31, footPadY);
  ctx.lineTo(-45, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-43, footPadY - 1.0); ctx.lineTo(-33, footPadY - 1.0);
  ctx.stroke();

  // Tread grooves
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-41, footPadY - 1.5); ctx.lineTo(-41, footPadY);
  ctx.moveTo(-38, footPadY - 1.5); ctx.lineTo(-38, footPadY);
  ctx.moveTo(-35, footPadY - 1.5); ctx.lineTo(-35, footPadY);
  ctx.stroke();

  // Rear Heavy Landing Gear Assembly (x = +38)
  // Bracket
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(31, 6); ctx.lineTo(36, 6); ctx.lineTo(37, 10); ctx.lineTo(32, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(34, 7.5, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Chrome Strut
  ctx.fillStyle = strutGrad;
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(33, 9); ctx.lineTo(35, 9); ctx.lineTo(39, padKnuckleY); ctx.lineTo(37, padKnuckleY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Scissor Torque Link
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(34, 11); ctx.lineTo(31.5, 13.5); ctx.lineTo(35.5, 15.5);
  ctx.stroke();
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(31.5, 13.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Knuckle Joint
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(38, padKnuckleY, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.arc(38, padKnuckleY, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Footpad Skid (Isolated Subpath)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(31, footPadY - 3.0);
  ctx.lineTo(32, footPadY - 2.0);
  ctx.lineTo(44, footPadY - 2.0);
  ctx.lineTo(45, footPadY - 3.0);
  ctx.lineTo(45, footPadY);
  ctx.lineTo(31, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(33, footPadY - 1.0); ctx.lineTo(43, footPadY - 1.0);
  ctx.stroke();

  // Tread grooves
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(35, footPadY - 1.5); ctx.lineTo(35, footPadY);
  ctx.moveTo(38, footPadY - 1.5); ctx.lineTo(38, footPadY);
  ctx.moveTo(41, footPadY - 1.5); ctx.lineTo(41, footPadY);
  ctx.stroke();

  // 17. HULL STENCIL MARKINGS & GRAPHICS
  ctx.save();
  ctx.fillStyle = 'rgba(147, 197, 253, 0.85)';
  ctx.font = '900 2.8px monospace';
  ctx.fillText('TH-01', 26, -10);

  ctx.fillStyle = 'rgba(96, 165, 250, 0.75)';
  ctx.font = 'bold 1.6px monospace';
  ctx.fillText('TERRA-HOPPER', -4, 10.2);
  ctx.restore();
}

// =====================================================================
// 15. VALKYRIE TACTICAL (VK-01 Cargo Lifter)
// High-fidelity clone of user reference concept - Crimson Ballistic Heavy Lifter
// =====================================================================
export function drawValkyrie(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship?: ShipState,
  time?: number
) {
  const footPadY = 19.2 + gearSpringOffset;
  const t = time !== undefined ? (time > 10000 ? time / 1000 : time) : performance.now() / 1000;
  const cycle12 = (t % 1.2) / 1.2;
  const isNavStrobeGreen = cycle12 < 0.1 || (cycle12 >= 0.2 && cycle12 < 0.3);
  const isNavStrobeRed = (cycle12 >= 0.5 && cycle12 < 0.6) || (cycle12 >= 0.7 && cycle12 < 0.8);
  const hazardBlink = (t % 0.9) < 0.45;

  ctx.save();

  // -------------------------------------------------------------------
  // 1. Far-side Background Landing Gear & Pod Shadows
  // -------------------------------------------------------------------
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#090d16';
  ctx.fillStyle = '#090d16';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';

  // Far-side rear strut and footpad
  ctx.beginPath();
  ctx.moveTo(-32, 13);
  ctx.lineTo(-32, footPadY);
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, -38, footPadY, 12, 2.4, 0.8);
  ctx.fill();

  // Far-side fwd strut and footpad
  ctx.beginPath();
  ctx.moveTo(24, 13);
  ctx.lineTo(24, footPadY);
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 18, footPadY, 12, 2.4, 0.8);
  ctx.fill();
  ctx.restore();

  // -------------------------------------------------------------------
  // 2. Aft Main Vectoring Propulsion Engine & Empennage
  // -------------------------------------------------------------------
  // Engine Gimbal Ring & Mounting Collar
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -55, -8.5, 4.5, 13, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(-53, -8);
  ctx.lineTo(-53, 4);
  ctx.stroke();

  // Hydraulic Gimbal Actuators
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-50, -7);
  ctx.lineTo(-55, -8);
  ctx.moveTo(-50, 3);
  ctx.lineTo(-55, 3.8);
  ctx.stroke();

  // Conical Vectoring Nozzle Bell
  const nozzleGrad = ctx.createLinearGradient(-54, -8, -70, -2);
  nozzleGrad.addColorStop(0, '#334155');
  nozzleGrad.addColorStop(0.3, '#1e293b');
  nozzleGrad.addColorStop(0.7, '#0f172a');
  nozzleGrad.addColorStop(1, '#020617');

  ctx.fillStyle = nozzleGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-54, -8);
  ctx.lineTo(-70, -9.5);
  ctx.lineTo(-70, 5.5);
  ctx.lineTo(-54, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Nozzle Petal Articulation Seams
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(-54, -5); ctx.lineTo(-70, -6);
  ctx.moveTo(-54, 1);  ctx.lineTo(-70, 1.2);
  ctx.stroke();

  ctx.strokeStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(-54, -2); ctx.lineTo(-70, -2.5);
  ctx.stroke();

  // Transverse Stiffener Ribs
  ctx.save();
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.setLineDash([1.2, 0.8]);
  ctx.beginPath();
  ctx.moveTo(-64, -8.8); ctx.lineTo(-64, 4.8);
  ctx.moveTo(-59, -8.4); ctx.lineTo(-59, 4.3);
  ctx.stroke();
  ctx.restore();

  // Nozzle Throat Interior Glow
  const throatGrad = ctx.createRadialGradient(-69.5, -2.0, 0.2, -69.5, -2.0, 5.0);
  throatGrad.addColorStop(0, '#ffffff');
  throatGrad.addColorStop(0.3, '#38bdf8');
  throatGrad.addColorStop(0.7, '#0284c7');
  throatGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');

  ctx.fillStyle = throatGrad;
  ctx.beginPath();
  ctx.ellipse(-69.5, -2.0, 1.8, 7.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.beginPath();
  ctx.ellipse(-69.0, -2.0, 0.9, 4.8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.ellipse(-68.6, -2.0, 0.4, 2.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Upper Empennage Aerodynamic Cowl Over Engine Root
  const empennageGrad = ctx.createLinearGradient(-54, -17, -36, -8);
  empennageGrad.addColorStop(0, '#9f1239');
  empennageGrad.addColorStop(0.5, '#881337');
  empennageGrad.addColorStop(1, '#4c0519');

  ctx.fillStyle = empennageGrad;
  ctx.strokeStyle = '#4c0519';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-36, -17.5);
  ctx.lineTo(-54, -10.5);
  ctx.lineTo(-54, -8);
  ctx.lineTo(-48, -8);
  ctx.lineTo(-36, -14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Empennage Yellow Hazard LEDs
  ctx.fillStyle = hazardBlink ? '#f59e0b' : '#78350f';
  ctx.strokeStyle = '#090d16';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  roundRect(ctx, -51.5, -12.5, 2.2, 1.4, 0.4);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = !hazardBlink ? '#f59e0b' : '#78350f';
  ctx.beginPath();
  roundRect(ctx, -47.5, -12.5, 2.2, 1.4, 0.4);
  ctx.fill();
  ctx.stroke();

  // Exhaust Danger Chevron Arrow
  ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
  ctx.beginPath();
  ctx.moveTo(-48, -14);
  ctx.lineTo(-45, -14);
  ctx.lineTo(-43, -12.5);
  ctx.lineTo(-45, -11);
  ctx.lineTo(-48, -11);
  ctx.closePath();
  ctx.fill();

  // -------------------------------------------------------------------
  // 3. Primary Crimson Ballistic Armor Hull
  // -------------------------------------------------------------------
  const hullGrad = ctx.createLinearGradient(0, -18, 0, 16);
  hullGrad.addColorStop(0, '#f43f5e');
  hullGrad.addColorStop(0.18, '#be123c');
  hullGrad.addColorStop(0.55, '#881337');
  hullGrad.addColorStop(1, '#4c0519');

  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#4c0519';
  ctx.lineWidth = 1.1;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(64, 6);
  ctx.lineTo(56, 3);
  ctx.lineTo(42, -4);
  ctx.lineTo(26, -15);
  ctx.lineTo(20, -17);
  ctx.lineTo(-36, -17.5);
  ctx.lineTo(-52, -10.5);
  ctx.lineTo(-54, -8);
  ctx.lineTo(-54, 4);
  ctx.lineTo(-48, 10);
  ctx.lineTo(-28, 14);
  ctx.lineTo(-12, 16);
  ctx.lineTo(4, 16);
  ctx.lineTo(16, 15);
  ctx.lineTo(24, 13);
  ctx.lineTo(40, 11);
  ctx.lineTo(56, 10);
  ctx.lineTo(64, 6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Upper Beveled Armor Deck Plate
  const upperDeckGrad = ctx.createLinearGradient(0, -17, 0, -6);
  upperDeckGrad.addColorStop(0, '#fb7185');
  upperDeckGrad.addColorStop(0.4, '#e11d48');
  upperDeckGrad.addColorStop(1, '#9f1239');

  ctx.fillStyle = upperDeckGrad;
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(24, -15);
  ctx.lineTo(-36, -17.5);
  ctx.lineTo(-50, -11);
  ctx.lineTo(-22, -6);
  ctx.lineTo(14, -6);
  ctx.lineTo(24, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lower Armored Machinery Bay / Belly Heat Shield
  const bellyGrad = ctx.createLinearGradient(0, 10, 0, 16);
  bellyGrad.addColorStop(0, '#1e293b');
  bellyGrad.addColorStop(0.5, '#0f172a');
  bellyGrad.addColorStop(1, '#020617');

  ctx.fillStyle = bellyGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-48, 10);
  ctx.lineTo(-28, 14);
  ctx.lineTo(-12, 16);
  ctx.lineTo(4, 16);
  ctx.lineTo(16, 15);
  ctx.lineTo(24, 13);
  ctx.lineTo(40, 11);
  ctx.lineTo(56, 10);
  ctx.lineTo(48, 12);
  ctx.lineTo(20, 15);
  ctx.lineTo(-10, 16);
  ctx.lineTo(-36, 13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // -------------------------------------------------------------------
  // 4. Dorsal Spine, Airlock, & Stenciled Markings
  // -------------------------------------------------------------------
  // Circular Dorsal Docking Hatch / Airlock at x = -24
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-24, -18, 3.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-24, -18, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(-24, -18, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Locking lugs
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-27.5, -18.4, 0.9, 0.8);
  ctx.fillRect(-21.4, -18.4, 0.9, 0.8);
  ctx.fillRect(-24.4, -21.4, 0.8, 0.9);
  ctx.fillRect(-24.4, -15.5, 0.8, 0.9);

  // Raised Spine Air Intake Scoop at x = 7 to 14
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(7, -17.5);
  ctx.lineTo(9, -19.2);
  ctx.lineTo(13, -19.2);
  ctx.lineTo(14, -17.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(9.5, -18.5);
  ctx.lineTo(12.5, -18.5);
  ctx.stroke();

  // APU Maintenance Hatch at x = -8.5 to -3
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -8.5, -16.8, 5.5, 2.5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(-7.5, -15.5, 0.4, 0, Math.PI * 2);
  ctx.arc(-4.0, -15.5, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // BOLD WHITE STENCILED NAMEPLATE
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 3.3px ui-monospace, monospace';
  ctx.fillText('VALKYRIE', -16, -13.3);

  ctx.fillStyle = '#fecdd3';
  ctx.font = 'bold 1.7px ui-monospace, monospace';
  ctx.fillText('TACTICAL', -16, -11.0);
  ctx.restore();

  // -------------------------------------------------------------------
  // 5. Hexagonal Embossed Armor Mesh (Honeycomb Pattern)
  // -------------------------------------------------------------------
  ctx.save();
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.45;
  ctx.globalAlpha = 0.85;

  const hexes = [
    // Row 1
    [-12,-11.5, -11,-12.3, -9.5,-12.3, -8.5,-11.5, -9.5,-10.7, -11,-10.7],
    [-8.5,-11.5, -7.5,-12.3, -6.0,-12.3, -5.0,-11.5, -6.0,-10.7, -7.5,-10.7],
    [-5.0,-11.5, -4.0,-12.3, -2.5,-12.3, -1.5,-11.5, -2.5,-10.7, -4.0,-10.7],
    [-1.5,-11.5, -0.5,-12.3, 1.0,-12.3, 2.0,-11.5, 1.0,-10.7, -0.5,-10.7],
    // Row 2
    [-10.2,-9.9, -9.2,-10.7, -7.7,-10.7, -6.7,-9.9, -7.7,-9.1, -9.2,-9.1],
    [-6.7,-9.9, -5.7,-10.7, -4.2,-10.7, -3.2,-9.9, -4.2,-9.1, -5.7,-9.1],
    [-3.2,-9.9, -2.2,-10.7, -0.7,-10.7, 0.3,-9.9, -0.7,-9.1, -2.2,-9.1],
    [0.3,-9.9, 1.3,-10.7, 2.8,-10.7, 3.8,-9.9, 2.8,-9.1, 1.3,-9.1],
    // Row 3
    [-12,-8.3, -11,-9.1, -9.5,-9.1, -8.5,-8.3, -9.5,-7.5, -11,-7.5],
    [-8.5,-8.3, -7.5,-9.1, -6.0,-9.1, -5.0,-8.3, -6.0,-7.5, -7.5,-7.5],
    [-5.0,-8.3, -4.0,-9.1, -2.5,-9.1, -1.5,-8.3, -2.5,-7.5, -4.0,-7.5],
    [-1.5,-8.3, -0.5,-9.1, 1.0,-9.1, 2.0,-8.3, 1.0,-7.5, -0.5,-7.5],
  ];

  for (const h of hexes) {
    ctx.beginPath();
    ctx.moveTo(h[0], h[1]);
    for (let p = 2; p < h.length; p += 2) {
      ctx.lineTo(h[p], h[p+1]);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();

  // -------------------------------------------------------------------
  // 6. Three Recessed Angled Heat-Sink / Intake Vents
  // -------------------------------------------------------------------
  const vents = [
    [-7.5, -4.5, -5.5, -8.5, -7.0, -4.8],
    [-1.5, 1.5, 0.5, -2.5, -1.0, 1.2],
    [4.5, 7.5, 6.5, 3.5, 5.0, 7.2]
  ];
  for (const v of vents) {
    ctx.fillStyle = '#090d16';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.moveTo(v[0], -8.8);
    ctx.lineTo(v[1], -8.8);
    ctx.lineTo(v[2], -6.8);
    ctx.lineTo(v[3], -6.8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(v[4], -7.8);
    ctx.lineTo(v[5], -7.8);
    ctx.stroke();
  }

  // -------------------------------------------------------------------
  // 7. Cockpit Canopy, Interior Pilot, & Nose Assembly
  // -------------------------------------------------------------------
  // Dark Gunmetal Nose Chin Cap
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(58, 4);
  ctx.lineTo(64, 6);
  ctx.lineTo(61, 8.5);
  ctx.lineTo(56, 8.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Needle Pitot Air Data Sensor Probe
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(64, 6);
  ctx.lineTo(67, 6);
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(66, 5.6);
  ctx.lineTo(66, 6.4);
  ctx.stroke();

  // FLIR / Targeting Electro-Optical Turret Ball
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(53.5, 5.5, 2.4, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(53.5, 5.5, 1.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(54.2, 5.2, 0.9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(54.5, 5.0, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Pilot Seat & Cockpit Dash
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  roundRect(ctx, 29, -9, 3.2, 4.5, 1.0);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(30.6, -10, 1.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(29.5, -9);
  ctx.lineTo(32, -5);
  ctx.stroke();

  ctx.fillStyle = 'rgba(3, 105, 161, 0.8)';
  ctx.beginPath();
  roundRect(ctx, 36, -3.5, 2.5, 1.8, 0.3);
  ctx.fill();

  // Multi-Pane Tinted Windshield & Canopy
  const canopyGrad = ctx.createLinearGradient(30, -14, 50, 4);
  canopyGrad.addColorStop(0, 'rgba(2, 132, 199, 0.85)');
  canopyGrad.addColorStop(0.3, 'rgba(7, 89, 133, 0.9)');
  canopyGrad.addColorStop(0.7, '#0f172a');
  canopyGrad.addColorStop(1, '#020617');

  ctx.fillStyle = canopyGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;

  // Forward Windshield Pane
  ctx.beginPath();
  ctx.moveTo(41, -4);
  ctx.lineTo(54, 3);
  ctx.lineTo(46, 3.8);
  ctx.lineTo(36, -1.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Main Pilot Canopy Pane
  ctx.beginPath();
  ctx.moveTo(26, -14);
  ctx.lineTo(39, -5.5);
  ctx.lineTo(34, -0.8);
  ctx.lineTo(26, -2.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Specular Glare Highlights
  ctx.strokeStyle = '#e0f2fe';
  ctx.lineWidth = 0.6;
  ctx.lineCap = 'round';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(28, -13); ctx.lineTo(38, -6);
  ctx.moveTo(42, -3.5); ctx.lineTo(52, 2.5);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Canopy Sill Micro-Text
  ctx.save();
  ctx.fillStyle = '#f1f5f9';
  ctx.font = 'bold 1.1px ui-monospace, monospace';
  ctx.fillText('VALKYRIE TACTICAL', 39, 2.8);

  // Serial Number VK-01
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 3.1px ui-monospace, monospace';
  ctx.fillText('VK-01', 23.5, -5.5);
  ctx.restore();

  // Maintenance Port at (18, -10)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(18, -10, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(18, -10, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // RESCUE Stencil Box
  ctx.save();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([1.0, 0.8]);
  ctx.strokeRect(8.5, -13, 6.5, 2.2);
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 1.1px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RESCUE', 11.7, -11.4);
  ctx.restore();

  // -------------------------------------------------------------------
  // 8. Mid-Fuselage VTOL Lift Intake Louvers (+12 to +22)
  // -------------------------------------------------------------------
  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, 13, -2.5, 8.5, 13.2, 1.4);
  ctx.fill();
  ctx.stroke();

  ctx.lineWidth = 0.9;
  ctx.lineCap = 'round';
  const louverY = [-0.8, 1.0, 2.8, 4.6, 6.4, 8.2, 10.0];
  for (let i = 0; i < louverY.length; i++) {
    ctx.strokeStyle = i % 2 === 0 ? '#334155' : '#475569';
    ctx.beginPath();
    ctx.moveTo(14, louverY[i]);
    ctx.lineTo(20.5, louverY[i]);
    ctx.stroke();
  }

  // Upper Splitter Vane
  ctx.fillStyle = '#e11d48';
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(12.5, -3);
  ctx.lineTo(22, -3);
  ctx.lineTo(21, -1);
  ctx.lineTo(13.5, -1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // -------------------------------------------------------------------
  // 9. Fuel Receptacle & Perforated Service Panel (+31 to +37)
  // -------------------------------------------------------------------
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, 31, 4.5, 6, 5.2, 0.6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(33, 7.0, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(33, 7.0, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(35.5, 5.8, 0.3, 0, Math.PI * 2);
  ctx.arc(35.5, 7.0, 0.3, 0, Math.PI * 2);
  ctx.arc(35.5, 8.2, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // -------------------------------------------------------------------
  // 10. VALKYRIE Winged Crest Emblem (-4 to +6)
  // -------------------------------------------------------------------
  ctx.save();
  // Gold wings
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.bezierCurveTo(-2, 0, -4, 1, -5, 3);
  ctx.bezierCurveTo(-3, 2.5, -1, 2.5, 0, 3);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(0, 3);
  ctx.bezierCurveTo(-2, 1.5, -4, 2.5, -4.5, 4.5);
  ctx.bezierCurveTo(-3, 4, -1, 3.5, 0, 4);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.bezierCurveTo(2, 0, 4, 1, 5, 3);
  ctx.bezierCurveTo(3, 2.5, 1, 2.5, 0, 3);
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.beginPath();
  ctx.moveTo(0, 3);
  ctx.bezierCurveTo(2, 1.5, 4, 2.5, 4.5, 4.5);
  ctx.bezierCurveTo(3, 4, 1, 3.5, 0, 4);
  ctx.fill();

  // Helm
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(0, 3.5, 1.6, 2.0, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.moveTo(-1.2, 2.8);
  ctx.lineTo(1.2, 2.8);
  ctx.lineTo(0, 4.2);
  ctx.closePath();
  ctx.fill();

  // Plaque banner
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -4.5, 5.5, 9.0, 2.8, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.font = '900 1.9px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VALKYRIE', 0, 7.6);
  ctx.restore();

  // Status bars & caution stencil
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(8.0, 2.2, 2.0, 0.8);
  ctx.fillRect(8.0, 3.6, 2.0, 0.8);
  ctx.fillRect(8.0, 5.0, 2.0, 0.8);

  ctx.fillStyle = '#facc15';
  ctx.font = 'bold 0.9px monospace';
  ctx.fillText('CAUTION', 6.8, 7.5);

  // -------------------------------------------------------------------
  // 11. Sealed Cargo Ramp Door (-24 to -10)
  // -------------------------------------------------------------------
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, -24, -1.5, 14, 13.5, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#111827';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -22.5, 0.2, 11, 10, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-22, 0.5); ctx.lineTo(-12, 10);
  ctx.moveTo(-12, 0.5); ctx.lineTo(-22, 10);
  ctx.stroke();

  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  roundRect(ctx, -12.5, 4.5, 1.2, 2.2, 0.3);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.fillRect(-20, 11.0, 6.0, 1.0);

  ctx.save();
  ctx.fillStyle = '#f59e0b';
  ctx.font = '0.9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CARGO RAMP', -17, 1.4);
  ctx.restore();

  // -------------------------------------------------------------------
  // 12. Flank Sponson Wing & Outboard Wingtip Pod
  // -------------------------------------------------------------------
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#580718';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-46, 4);
  ctx.lineTo(-24, 4);
  ctx.lineTo(-22, 7.5);
  ctx.lineTo(-46, 7.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cylindrical Pod
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  roundRect(ctx, -50, 4.6, 20, 2.8, 1.4);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-48, 6.0);
  ctx.lineTo(-32, 6.0);
  ctx.stroke();

  // Nav Strobes
  // Green Stbd
  ctx.fillStyle = isNavStrobeGreen ? '#34d399' : '#065f46';
  ctx.beginPath();
  ctx.arc(-30.5, 6.0, 1.1, 0, Math.PI * 2);
  ctx.fill();
  if (isNavStrobeGreen) {
    ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.beginPath();
    ctx.arc(-30.5, 6.0, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Red Port
  ctx.fillStyle = isNavStrobeRed ? '#f87171' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(-49.5, 6.0, 1.1, 0, Math.PI * 2);
  ctx.fill();
  if (isNavStrobeRed) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(-49.5, 6.0, 2.8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Auxiliary Booster Fairing Above Wing
  ctx.fillStyle = '#111827';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-50, -6);
  ctx.lineTo(-26, -6);
  ctx.lineTo(-24, -3);
  ctx.lineTo(-50, -3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.fillRect(-29, -5.4, 2.4, 1.6);
  ctx.fillRect(-25.5, -5.4, 2.4, 1.6);

  // -------------------------------------------------------------------
  // 13. Prominent VTOL Lift Thruster Assemblies (Forward & Aft)
  // -------------------------------------------------------------------
  // Ventral Keel Propellant Manifold Conduit linking thrusters
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(-22, 14, 36, 1.2);
  ctx.fill();
  ctx.stroke();

  ctx.save();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.setLineDash([1.5, 1.0]);
  ctx.beginPath();
  ctx.moveTo(-18, 14.6);
  ctx.lineTo(10, 14.6);
  ctx.stroke();
  ctx.restore();

  // Thruster Bell Linear Gradient Helper
  const aftBellGrad = ctx.createLinearGradient(-28.5, 14, -23.5, 18);
  aftBellGrad.addColorStop(0, '#1e293b');
  aftBellGrad.addColorStop(0.25, '#475569');
  aftBellGrad.addColorStop(0.5, '#64748b');
  aftBellGrad.addColorStop(0.75, '#334155');
  aftBellGrad.addColorStop(1, '#0f172a');

  // AFT VTOL THRUSTER ASSEMBLY (x = -26, aligned to leftThrusterPos)
  // Mounting Gimbal Collar
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -29, 12.2, 6, 2.2, 0.5);
  ctx.fill();
  ctx.stroke();

  // Hydraulic Gimbal Actuators
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-28.5, 12.0); ctx.lineTo(-27.5, 14.2);
  ctx.moveTo(-23.5, 12.0); ctx.lineTo(-24.5, 14.2);
  ctx.stroke();

  // Flared Conical Nozzle Bell
  ctx.fillStyle = aftBellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-28.5, 14.0);
  ctx.lineTo(-23.5, 14.0);
  ctx.lineTo(-22.2, 18.0);
  ctx.lineTo(-29.8, 18.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Exterior Stiffener / Cooling Ribs
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-27.8, 14.2); ctx.lineTo(-28.8, 17.8);
  ctx.moveTo(-24.2, 14.2); ctx.lineTo(-23.2, 17.8);
  ctx.stroke();
  ctx.strokeStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(-26.0, 14.2); ctx.lineTo(-26.0, 17.8);
  ctx.stroke();

  // Dark Nozzle Exhaust Exit Rim
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(-26, 18.0, 3.8, 0.95, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Glowing Throat Interior
  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.beginPath();
  ctx.ellipse(-26, 17.8, 2.4, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.ellipse(-26, 17.8, 1.1, 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Active Left/Aft Thruster Plasma Flash when firing
  if (ship && ship.fuel > 0 && ship.leftThruster) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(-26, 18.0, 3.4, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // FORWARD VTOL THRUSTER ASSEMBLY (x = +18, aligned to rightThrusterPos)
  const fwdBellGrad = ctx.createLinearGradient(15.5, 14, 20.5, 18);
  fwdBellGrad.addColorStop(0, '#1e293b');
  fwdBellGrad.addColorStop(0.25, '#475569');
  fwdBellGrad.addColorStop(0.5, '#64748b');
  fwdBellGrad.addColorStop(0.75, '#334155');
  fwdBellGrad.addColorStop(1, '#0f172a');

  // Mounting Gimbal Collar under intake louvers
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 15, 12.2, 6, 2.2, 0.5);
  ctx.fill();
  ctx.stroke();

  // Hydraulic Gimbal Actuators
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(15.5, 12.0); ctx.lineTo(16.5, 14.2);
  ctx.moveTo(20.5, 12.0); ctx.lineTo(19.5, 14.2);
  ctx.stroke();

  // Flared Conical Nozzle Bell
  ctx.fillStyle = fwdBellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(15.5, 14.0);
  ctx.lineTo(20.5, 14.0);
  ctx.lineTo(21.8, 18.0);
  ctx.lineTo(14.2, 18.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Exterior Stiffener / Cooling Ribs
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(16.2, 14.2); ctx.lineTo(15.2, 17.8);
  ctx.moveTo(19.8, 14.2); ctx.lineTo(20.8, 17.8);
  ctx.stroke();
  ctx.strokeStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(18.0, 14.2); ctx.lineTo(18.0, 17.8);
  ctx.stroke();

  // Dark Nozzle Exhaust Exit Rim
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(18, 18.0, 3.8, 0.95, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Glowing Throat Interior
  ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.beginPath();
  ctx.ellipse(18, 17.8, 2.4, 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.ellipse(18, 17.8, 1.1, 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Active Right/Forward Thruster Plasma Flash when firing
  if (ship && ship.fuel > 0 && ship.rightThruster) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.ellipse(18, 18.0, 3.4, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // -------------------------------------------------------------------
  // 14. Heavy Ground Landing Gear Skids (Articulated Spring Compression)
  // -------------------------------------------------------------------
  // FORWARD GEAR (x = 24)
  ctx.save();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(24, 13);
  ctx.lineTo(24, footPadY);
  ctx.stroke();

  // Chrome oleo piston shaft
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(24, 16);
  ctx.lineTo(24, footPadY);
  ctx.stroke();

  // Scissor torque link
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(22, 14);
  ctx.lineTo(20, 16.5);
  ctx.lineTo(24, 18.5);
  ctx.stroke();

  // Knuckle pivot
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(24, footPadY, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Isolated articulated footpad skid
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 18, footPadY, 12, 2.6, 0.8);
  ctx.fill();
  ctx.stroke();

  // Hazard stripes
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(20, footPadY + 0.2); ctx.lineTo(22, footPadY + 2.4);
  ctx.moveTo(24, footPadY + 0.2); ctx.lineTo(26, footPadY + 2.4);
  ctx.stroke();
  ctx.restore();

  // REAR GEAR (x = -32)
  ctx.save();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 13);
  ctx.lineTo(-32, footPadY);
  ctx.stroke();

  // Chrome oleo piston shaft
  ctx.strokeStyle = '#f1f5f9';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-32, 16);
  ctx.lineTo(-32, footPadY);
  ctx.stroke();

  // Scissor torque link
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-34, 14);
  ctx.lineTo(-36, 16.5);
  ctx.lineTo(-32, 18.5);
  ctx.stroke();

  // Knuckle pivot
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#facc15';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-32, footPadY, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Isolated articulated footpad skid
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -38, footPadY, 12, 2.6, 0.8);
  ctx.fill();
  ctx.stroke();

  // Hazard stripes
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-36, footPadY + 0.2); ctx.lineTo(-34, footPadY + 2.4);
  ctx.moveTo(-32, footPadY + 0.2); ctx.lineTo(-30, footPadY + 2.4);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}


// =====================================================================
// =====================================================================
// 16. JUGGERNAUT LIFTER (JG-1200 Heavy Transport Craft)
//     Faithful side-profile clone of the supplied concept diagram.
//     Front/bow is LEFT; main propulsion is the circular stern at RIGHT.
// =====================================================================
export function drawJuggernaut(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number = 0
) {
  const t = time > 10000 ? time / 1000 : time;
  const rampProg = Math.max(0, Math.min(1, ship.rampProgress ?? 0));
  const blink = Math.sin(t * 6.5) > 0;
  const beaconPulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 5.0));
  const footY = 40 + gearSpringOffset;

  const olive = '#6D8558';
  const oliveLight = '#829968';
  const oliveHi = '#91A878';
  const oliveDark = '#4C633F';
  const oliveDeep = '#344735';
  const line = '#20251F';
  const windowDark = '#303A39';
  const windowHi = '#9BA79A';
  const gold = '#D5B43D';
  const goldHi = '#F0D256';
  const goldDark = '#80691F';
  const metal = '#78776D';
  const metalHi = '#A09D8F';
  const cargoDark = '#40423E';
  const cream = '#F4F0D7';

  const hullGrad = ctx.createLinearGradient(0, -42, 0, 28);
  hullGrad.addColorStop(0, oliveHi);
  hullGrad.addColorStop(0.27, olive);
  hullGrad.addColorStop(0.7, oliveDark);
  hullGrad.addColorStop(1, oliveDeep);
  const lowerGrad = ctx.createLinearGradient(0, 12, 0, 45);
  lowerGrad.addColorStop(0, oliveDark);
  lowerGrad.addColorStop(1, '#29372B');

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';


  // Ramp door animation: 2-phase slide-out-then-descend.
  // Phase 0.0-0.5: ramp slides horizontally LEFT out of the hull.
  // Phase 0.5-1.0: ramp tip descends DOWN to the ground.
  const rampSlidePhase = Math.min(rampProg * 2, 1);
  const rampRotatePhase = Math.max((rampProg - 0.5) * 2, 0);

  // Ramp stowed inside the hull at x ≈ -58 to -38, door height y ≈ 8 to 14
  const rampStowedLeft = -58;
  const rampStowedTop = 8;
  const rampStowedBottom = 14;
  const rampWidth = 3.2; // thickness
  const rampLength = 35; // full extension length

  // Slide-out: hinge moves LEFT from the hull opening (-58) to -73 during slide.
  const slideX = -15 * rampSlidePhase; // slides left by ~15 units
  const hingeX = rampStowedLeft + slideX;
  const hingeY = (rampStowedTop + rampStowedBottom) / 2; // ~11

  // Descent: ramp rotates from horizontal (0) DOWN to ~54° so the tip
  // reaches the ground (hingeY + sin(54°)*35 ≈ 39.4 ≈ footY=40).
  const angleStart = 0;
  const angleEnd = Math.PI * 0.3;
  const rampAngle = angleStart + (angleEnd - angleStart) * rampRotatePhase;

  // Ramp extends LEFT from the hinge (-cos), and descends DOWN (+sin, canvas +y).
  const tipX = hingeX - Math.cos(rampAngle) * rampLength;
  const tipY = hingeY + Math.sin(rampAngle) * rampLength;

  // Side offset for thickness (perpendicular to ramp direction (-cos, sin)).
  const sideX = Math.sin(rampAngle) * rampWidth;
  const sideY = Math.cos(rampAngle) * rampWidth;

  // 2. Main circular stern propulsion assembly (center), with OUTER thrusters at edges.
  // Draw thrusters first (behind the main engine), then main engine on top.
  const drawThruster = (cx: number, cy: number, isOuter: boolean, pulse: number) => {
    const halfWTop = isOuter ? 4.5 : 3.5;
    const halfWBot = isOuter ? 6.0 : 4.8;
    const topY = cy - 2;
    const botY = cy + 5;
    // Bell.
    const bellGrad = ctx.createLinearGradient(cx - halfWBot, topY, cx + halfWBot, topY);
    bellGrad.addColorStop(0, '#1e293b');
    bellGrad.addColorStop(0.35, '#475569');
    bellGrad.addColorStop(0.7, '#334155');
    bellGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bellGrad;
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - halfWTop, topY);
    ctx.lineTo(cx + halfWTop, topY);
    ctx.lineTo(cx + halfWBot, botY);
    ctx.lineTo(cx - halfWBot, botY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Thermal trim.
    ctx.fillStyle = gold;
    ctx.fillRect(cx - halfWTop + 0.6, topY - 1.5, (halfWTop - 0.6) * 2, 2);
    // Gimbal struts.
    ctx.strokeStyle = metalHi;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(cx - halfWTop - 1, topY);
    ctx.lineTo(cx - halfWTop - 1, topY + 5);
    ctx.moveTo(cx + halfWTop + 1, topY);
    ctx.lineTo(cx + halfWTop + 1, topY + 5);
    ctx.stroke();
    // Plasma core.
    const plasmaR = isOuter ? 4.5 : 3.5;
    const plasmaGrad = ctx.createRadialGradient(cx, botY - 0.5, 0, cx, botY - 0.5, plasmaR);
    plasmaGrad.addColorStop(0, '#ffffff');
    plasmaGrad.addColorStop(0.35, `rgba(213,180,61,${pulse})`);
    plasmaGrad.addColorStop(0.75, '#D5B43D');
    plasmaGrad.addColorStop(1, '#80691F');
    ctx.fillStyle = plasmaGrad;
    ctx.beginPath();
    ctx.ellipse(cx, botY - 0.5, plasmaR, 1.6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Hot core pulse.
    ctx.fillStyle = '#fffef2';
    ctx.globalAlpha = Math.min(1.0, 0.75 + pulse * 0.25);
    ctx.beginPath();
    ctx.ellipse(cx, botY - 0.5, plasmaR * 0.4, 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  };

  // Thruster positions: 4 total — 2 at bow, 2 at stern, all below the hull.
  // They fire in pairs ("2 by 2"): the two bow thrusters pulse together, then
  // the two stern thrusters pulse together — alternating like a hover-hold pair.
  const bowPulse = 0.5 + 0.5 * Math.sin(t * 4.0);
  const sternPulse = 0.5 + 0.5 * Math.sin(t * 4.0 + Math.PI);
  drawThruster(-62, 28, true, bowPulse);   // Outer port (bow side)
  drawThruster(-48, 28, true, bowPulse);   // Inner port (bow side)
  drawThruster(58, 28, true, sternPulse);  // Inner starboard (below main engine)
  drawThruster(79, 28, true, sternPulse);  // Outer starboard

  // Now draw the main circular engine housing OVER the center thruster.
  ctx.save();
  ctx.fillStyle = '#67665E';
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(67, -1, 12, 17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#A09D8F';
  ctx.lineWidth = 1.0;
  for (const rx of [-8, -4, 0, 4, 8]) {
    ctx.beginPath();
    ctx.ellipse(67 + rx * 0.35, -1, 11 - Math.abs(rx) * 0.18, 15, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#40423E';
  ctx.strokeStyle = line;
  ctx.beginPath();
  ctx.ellipse(67, -1, 5, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = gold;
  ctx.fillRect(54, -15, 4, 3);
  ctx.fillRect(54, 12, 4, 3);
  ctx.restore();

  // 4. Tracked landing bogies and forward articulated support.
  const bogies = [-55, -12, 42];
  for (const x of bogies) {
    ctx.save();
    ctx.fillStyle = '#3E4D39';
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    roundRect(ctx, x - 12, footY - 5, 24, 5, 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#242D25';
    for (let wx = x - 8; wx <= x + 8; wx += 5) {
      ctx.beginPath();
      ctx.arc(wx, footY - 2.5, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = metalHi;
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(x - 10, footY - 6);
    ctx.lineTo(x + 10, footY - 6);
    ctx.stroke();
    ctx.restore();
  }
  for (const [mount, foot] of [[-50, -56], [-18, -20], [38, 42], [58, 58]]) {
    ctx.save();
    ctx.strokeStyle = oliveDeep;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(mount, 18);
    ctx.lineTo(foot, footY - 5);
    ctx.stroke();
    ctx.strokeStyle = metalHi;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(mount, 20);
    ctx.lineTo(foot, footY - 6);
    ctx.stroke();
    ctx.fillStyle = goldDark;
    ctx.beginPath();
    ctx.arc(mount, 18, 2.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 5. Open-sided multi-deck cargo hold, behind the outer hull framing.
  ctx.save();
  ctx.fillStyle = cargoDark;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -22, -1, 58, 23, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#9A988B';
  ctx.lineWidth = 0.8;
  for (const y of [5, 12, 19]) {
    ctx.beginPath();
    ctx.moveTo(-20, y);
    ctx.lineTo(34, y);
    ctx.stroke();
  }
  for (const x of [-16, -2, 12, 26]) {
    ctx.beginPath();
    ctx.moveTo(x, 1);
    ctx.lineTo(x, 22);
    ctx.stroke();
  }
  // Six small tracked cargo vehicles in the cutaway.
  for (const [x, y] of [[-14, 2], [12, 2], [-4, 9], [22, 9], [-14, 16], [10, 16]]) {
    ctx.fillStyle = '#4E6845';
    ctx.strokeStyle = line;
    ctx.lineWidth = 0.55;
    ctx.beginPath();
    roundRect(ctx, x - 4, y - 1.5, 8, 2.5, 0.7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#242D25';
    ctx.beginPath();
    ctx.ellipse(x, y + 1, 4.5, 1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6D8558';
    ctx.beginPath();
    roundRect(ctx, x - 1.8, y - 3, 3.6, 2, 0.6);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();

  // 6. Lower hull and main olive armored body.
  ctx.save();
  ctx.fillStyle = lowerGrad;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-67, 8);
  ctx.lineTo(56, 8);
  ctx.lineTo(58, 22);
  ctx.lineTo(39, 25);
  ctx.lineTo(-42, 24);
  ctx.lineTo(-65, 20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Main fuselage: wedge bow LEFT, long armored spine, stern RIGHT.
  ctx.save();
  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-70, -25);
  ctx.lineTo(-55, -42);
  ctx.lineTo(-30, -48);
  ctx.lineTo(44, -42);
  ctx.lineTo(57, -30);
  ctx.lineTo(58, 9);
  ctx.lineTo(38, 14);
  ctx.lineTo(-48, 13);
  ctx.lineTo(-68, 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Large diagonal forward cheek armor.
  ctx.fillStyle = oliveDark;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-66, -24);
  ctx.lineTo(-48, -38);
  ctx.lineTo(-30, -8);
  ctx.lineTo(-40, 12);
  ctx.lineTo(-64, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Rear raised engineering fairing.
  ctx.fillStyle = oliveLight;
  ctx.beginPath();
  ctx.moveTo(38, -37);
  ctx.lineTo(52, -28);
  ctx.lineTo(54, -9);
  ctx.lineTo(38, -6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Panel seams, access hatches, and vents.
  ctx.strokeStyle = oliveDeep;
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-40, -40); ctx.lineTo(-40, 8);
  ctx.moveTo(-10, -45); ctx.lineTo(-10, 7);
  ctx.moveTo(22, -44); ctx.lineTo(22, 8);
  ctx.moveTo(39, -36); ctx.lineTo(39, 7);
  ctx.moveTo(-53, -12); ctx.lineTo(-35, -12);
  ctx.moveTo(5, -35); ctx.lineTo(32, -35);
  ctx.stroke();
  ctx.fillStyle = oliveDeep;
  for (const [x, y, w, h] of [[-62,-3,8,5],[-50,3,8,3],[-26,-38,12,4],[27,-29,9,4],[44,0,8,4]]) {
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = line;
    ctx.strokeRect(x, y, w, h);
  }
  // Three ventilation slots on upper spine.
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(0, -38); ctx.lineTo(3, -33);
  ctx.moveTo(4, -38); ctx.lineTo(7, -33);
  ctx.moveTo(8, -37); ctx.lineTo(11, -32);
  ctx.stroke();
  ctx.restore();

  // 7. Gold reinforcement bands wrapping the central hull.
  for (const x of [-14, 22]) {
    ctx.save();
    ctx.fillStyle = gold;
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(x - 3, -43);
    ctx.lineTo(x + 3, -43);
    ctx.lineTo(x + 5, 10);
    ctx.lineTo(x - 4, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = goldDark;
    ctx.lineWidth = 0.75;
    for (let y = -38; y < 7; y += 5) {
      ctx.beginPath();
      ctx.moveTo(x - 2.5, y);
      ctx.lineTo(x + 3.2, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 8. Large octagonal front service hatch and loading aperture.
  ctx.save();
  ctx.fillStyle = '#40423E';
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-54, -20);
  ctx.lineTo(-47, -26);
  ctx.lineTo(-38, -26);
  ctx.lineTo(-34, -20);
  ctx.lineTo(-34, 4);
  ctx.lineTo(-40, 9);
  ctx.lineTo(-50, 7);
  ctx.lineTo(-55, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = gold;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-37, -25); ctx.lineTo(-34, -20); ctx.lineTo(-34, 4); ctx.lineTo(-40, 9);
  ctx.stroke();
  ctx.strokeStyle = oliveDeep;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-48, -22); ctx.lineTo(-40, -22); ctx.lineTo(-36, -17);
  ctx.moveTo(-48, -17); ctx.lineTo(-39, -17);
  ctx.moveTo(-48, 3); ctx.lineTo(-39, 3);
  ctx.stroke();
  ctx.restore();

  // 9. Forward armor face and sensor arrays.
  ctx.save();
  ctx.fillStyle = olive;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-70, -25);
  ctx.lineTo(-73, -15);
  ctx.lineTo(-70, 5);
  ctx.lineTo(-62, 8);
  ctx.lineTo(-59, -27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = gold;
  ctx.fillRect(-68, -18, 3, 10);
  ctx.fillRect(-67, -2, 3, 8);
  // Lower forward observation window band.
  ctx.fillStyle = windowDark;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-65, -18);
  ctx.lineTo(-47, -20);
  ctx.lineTo(-42, -15);
  ctx.lineTo(-46, -11);
  ctx.lineTo(-66, -11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = windowHi;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-62, -16); ctx.lineTo(-53, -17);
  ctx.moveTo(-50, -17); ctx.lineTo(-46, -16);
  ctx.stroke();
  // Twin forward sensor barrels with fine rods.
  for (const y of [-9, -1]) {
    ctx.fillStyle = metal;
    ctx.strokeStyle = line;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.ellipse(-70, y, 4, 2.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = '#262B25';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-73, y - 1);
    ctx.lineTo(-84, y - 6);
    ctx.moveTo(-73, y);
    ctx.lineTo(-85, y);
    ctx.moveTo(-73, y + 1);
    ctx.lineTo(-83, y + 6);
    ctx.stroke();
  }
  ctx.restore();

  // 10. Command bridge and crew quarters.
  ctx.save();
  ctx.fillStyle = oliveLight;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-52, -42);
  ctx.lineTo(-45, -53);
  ctx.lineTo(-22, -56);
  ctx.lineTo(-14, -45);
  ctx.lineTo(-17, -35);
  ctx.lineTo(-48, -34);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  // Main horizontal bridge window strip.
  ctx.fillStyle = windowDark;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-48, -43);
  ctx.lineTo(-27, -46);
  ctx.lineTo(-20, -41);
  ctx.lineTo(-24, -36);
  ctx.lineTo(-49, -36);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = windowHi;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-44, -41); ctx.lineTo(-36, -42);
  ctx.moveTo(-33, -43); ctx.lineTo(-26, -42);
  ctx.stroke();
  // Primary bridge turret on top.
  ctx.fillStyle = oliveHi;
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-39, -54);
  ctx.lineTo(-35, -59);
  ctx.lineTo(-21, -59);
  ctx.lineTo(-17, -54);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = windowDark;
  ctx.strokeStyle = line;
  ctx.beginPath();
  roundRect(ctx, -34, -57, 12, 3, 0.8);
  ctx.fill();
  ctx.stroke();
  // Yellow bridge markers.
  ctx.fillStyle = gold;
  ctx.fillRect(-48, -49, 6, 3);
  ctx.fillRect(-18, -48, 5, 3);
  ctx.restore();

  // 11. Dorsal antenna masts with independently blinking top lights.
  ctx.save();
  ctx.strokeStyle = line;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-27, -59); ctx.lineTo(-27, -72);
  ctx.moveTo(-36, -58); ctx.lineTo(-36, -65);
  ctx.moveTo(-18, -55); ctx.lineTo(-18, -63);
  ctx.stroke();
  ctx.fillStyle = blink ? '#F5DD70' : '#80691F';
  ctx.globalAlpha = blink ? 1 : 0.45;
  ctx.beginPath();
  ctx.arc(-27, -73, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E84942';
  ctx.globalAlpha = blink ? 0.95 : 0.25;
  ctx.beginPath();
  ctx.arc(-36, -66, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // 12. JUGGERNAUT LIFTER illuminated side plaque.
  ctx.save();
  ctx.fillStyle = '#3C4B36';
  ctx.strokeStyle = goldDark;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -2, -18, 31, 13, 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = goldHi;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -1, -17, 29, 11, 1.7);
  ctx.stroke();
  ctx.fillStyle = cream;
  ctx.font = 'bold 4.1px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('JUGGERNAUT', 13.5, -13);
  ctx.fillText('LIFTER', 13.5, -8);
  ctx.restore();

  // 13. Rear reaction-control rods and side machinery.
  ctx.save();
  ctx.strokeStyle = line;
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(45, -35); ctx.lineTo(57, -42);
  ctx.moveTo(48, -33); ctx.lineTo(62, -38);
  ctx.moveTo(51, -31); ctx.lineTo(65, -31);
  ctx.moveTo(52, 8); ctx.lineTo(63, 14);
  ctx.moveTo(54, 6); ctx.lineTo(66, 10);
  ctx.stroke();
  ctx.fillStyle = metal;
  ctx.strokeStyle = line;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 30, -25, 10, 7, 1);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = gold;
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(33, -23); ctx.lineTo(38, -23);
  ctx.moveTo(33, -20); ctx.lineTo(38, -20);
  ctx.stroke();
  ctx.restore();

  // 14. Front ramp door — 2-phase slide-out-then-descend animation
  // Flight mode (rampProg < 0.01): ramp is NOT VISIBLE (fully stowed inside hull)
  // Phase 1 (rampProg 0.01-0.5): ramp slides horizontally LEFT out of the hull
  // Phase 2 (rampProg 0.5-1.0): ramp rotates DOWN to ground
  ctx.save();

  if (rampProg < 0.01) {
    // Flight mode - ramp is completely invisible (stowed inside hull)
    // Nothing to draw
  } else {
    // Ramp is deployed - draw the sliding/rotating plate
    ctx.fillStyle = '#40423E';
    ctx.strokeStyle = line;
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(hingeX + sideX, hingeY + sideY);
    ctx.lineTo(tipX + sideX, tipY + sideY);
    ctx.lineTo(tipX - sideX, tipY - sideY);
    ctx.lineTo(hingeX - sideX, hingeY - sideY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gold trim edges
    ctx.strokeStyle = gold;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(hingeX + sideX, hingeY + sideY);
    ctx.lineTo(tipX + sideX, tipY + sideY);
    ctx.moveTo(hingeX - sideX, hingeY - sideY);
    ctx.lineTo(tipX - sideX, tipY - sideY);
    ctx.stroke();

    // Diagonal seam lines on ramp face
    ctx.strokeStyle = '#252B24';
    ctx.lineWidth = 0.7;
    for (let i = 0.15; i < 0.95; i += 0.2) {
      const cx = hingeX + (tipX - hingeX) * i;
      const cy = hingeY + (tipY - hingeY) * i;
      const sx = Math.sin(rampAngle) * rampWidth * 0.8;
      const sy = Math.cos(rampAngle) * rampWidth * 0.8;
      ctx.beginPath();
      ctx.moveTo(cx - sx, cy - sy);
      ctx.lineTo(cx + sx, cy + sy);
      ctx.stroke();
    }
  }

  ctx.restore();
}



// =====================================================================
// 17. NUTCRACKER (Heavy Desert-Planet Crawler Carrier & Drill Miner)
// =====================================================================
export function drawNutcracker(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number
) {
  const footPadY = 34 + gearSpringOffset;

  // ---------------------------------------------------------
  // 1. Five Articulated Excavator Suspension Legs & Footpads
  // (Strictly Isolated Subpaths to prevent connecting lines)
  // ---------------------------------------------------------
  const legXCoords = [-37, -23, 11, 23, 37];

  for (let i = 0; i < legXCoords.length; i++) {
    const lx = legXCoords[i];

    // Bronze Hip Joint / Knuckle Socket
    ctx.fillStyle = '#bfa06a';
    ctx.strokeStyle = '#4a3826';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(lx, 15, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Hip Joint Inner Ribs
    ctx.strokeStyle = '#6e5334';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(lx - 2.5, 13);
    ctx.lineTo(lx - 2.5, 17);
    ctx.moveTo(lx + 2.5, 13);
    ctx.lineTo(lx + 2.5, 17);
    ctx.stroke();

    // Terracotta Armored Shin Piston Housing
    ctx.fillStyle = '#b84538';
    ctx.strokeStyle = '#5c1910';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    roundRect(ctx, lx - 4, 18, 8, 8, 1.5);
    ctx.fill();
    ctx.stroke();

    // Chrome Oleo Piston
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(lx, 24);
    ctx.lineTo(lx, footPadY - 3);
    ctx.stroke();

    // Excavator Footpad Shoe with Flared Sole
    ctx.fillStyle = '#9c8265';
    ctx.strokeStyle = '#453524';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(lx - 5.5, footPadY - 3.5);
    ctx.lineTo(lx + 5.5, footPadY - 3.5);
    ctx.lineTo(lx + 7, footPadY);
    ctx.lineTo(lx - 7, footPadY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dual-Toed Sole Tread Grooves
    ctx.strokeStyle = '#261f17';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(lx - 2, footPadY - 3);
    ctx.lineTo(lx - 2, footPadY);
    ctx.moveTo(lx + 2, footPadY - 3);
    ctx.lineTo(lx + 2, footPadY);
    ctx.stroke();

    // Footpad Top Knuckle Cap
    ctx.fillStyle = '#d4b276';
    ctx.beginPath();
    ctx.ellipse(lx, footPadY - 3.5, 3.2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // ---------------------------------------------------------
  // 2. Aft Armored Hull Block (X: -42 to -11, Y: -20 to +16)
  // ---------------------------------------------------------
  const aftGrad = ctx.createLinearGradient(-42, -20, -11, 16);
  aftGrad.addColorStop(0, '#c75142');
  aftGrad.addColorStop(0.5, '#b84538');
  aftGrad.addColorStop(1, '#82271d');

  ctx.fillStyle = aftGrad;
  ctx.strokeStyle = '#5c1910';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-42, -10);
  ctx.lineTo(-35, -20);
  ctx.lineTo(-11, -20);
  ctx.lineTo(-11, 16);
  ctx.lineTo(-42, 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Aft Chamfered Corner Plating & Rivets
  ctx.strokeStyle = '#d96c5e';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-34, -18);
  ctx.lineTo(-13, -18);
  ctx.lineTo(-13, 14);
  ctx.stroke();

  // Aft Hex Bolts
  ctx.fillStyle = '#64748b';
  const aftBolts = [
    { x: -33, y: -16 },
    { x: -14, y: -16 },
    { x: -14, y: 12 },
    { x: -39, y: 12 },
  ];
  for (const b of aftBolts) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 0.9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Aft Slanted Ventilation Louvers (4 slots)
  ctx.strokeStyle = '#45120b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-24, 7);
  ctx.lineTo(-20, 11);
  ctx.moveTo(-21, 7);
  ctx.lineTo(-17, 11);
  ctx.moveTo(-18, 7);
  ctx.lineTo(-14, 11);
  ctx.moveTo(-15, 7);
  ctx.lineTo(-11, 11);
  ctx.stroke();

  // ---------------------------------------------------------
  // 3. The Heavy Rock-Crusher Drill Arm ("Nutcracker", Aft-Mounted)
  // ---------------------------------------------------------
  ctx.save();
  // Pivot Mount Bracket at upper-left corner of aft hull
  ctx.fillStyle = '#4a3c32';
  ctx.strokeStyle = '#261f1a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -44, -26, 8, 10, 2);
  ctx.fill();
  ctx.stroke();

  // Pivot Pin Boss
  ctx.fillStyle = '#d4b276';
  ctx.strokeStyle = '#6e5334';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-40, -21, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Angled Heavy Drill Cylinder Barrel (angled at ~78 deg)
  ctx.save();
  ctx.translate(-40, -21);
  ctx.rotate(-0.24); // Angled downward-left

  // Hydraulic Ram Arm Body
  const drillGrad = ctx.createLinearGradient(-8, 0, 8, 0);
  drillGrad.addColorStop(0, '#5a493d');
  drillGrad.addColorStop(0.3, '#756050');
  drillGrad.addColorStop(0.7, '#45372d');
  drillGrad.addColorStop(1, '#2e241c');

  ctx.fillStyle = drillGrad;
  ctx.strokeStyle = '#261f1a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -8, -12, 16, 26, 2);
  ctx.fill();
  ctx.stroke();

  // Recessed Panel Line & Port Holes
  ctx.fillStyle = '#261f1a';
  ctx.fillRect(-5, -6, 10, 5);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-3, -4, 6, 1.5); // Sensor slit

  // Warm Sand/Gold Fluted Collar Ring
  const collarGrad = ctx.createLinearGradient(-9, 14, 9, 14);
  collarGrad.addColorStop(0, '#caa66e');
  collarGrad.addColorStop(0.5, '#ebd19d');
  collarGrad.addColorStop(1, '#8a6b3b');

  ctx.fillStyle = collarGrad;
  ctx.strokeStyle = '#5a4422';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -9, 14, 18, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Vertical Flutes on Collar
  ctx.strokeStyle = '#5a4422';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-6, 14);
  ctx.lineTo(-6, 21);
  ctx.moveTo(-2, 14);
  ctx.lineTo(-2, 21);
  ctx.moveTo(2, 14);
  ctx.lineTo(2, 21);
  ctx.moveTo(6, 14);
  ctx.lineTo(6, 21);
  ctx.stroke();

  // Heavy Faceted Rock-Chisel Drill Bit (Extending downward)
  // Left facet (shadow)
  ctx.fillStyle = '#5c4837';
  ctx.strokeStyle = '#261f1a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-8, 21);
  ctx.lineTo(0, 37);
  ctx.lineTo(-2, 37);
  ctx.lineTo(-9, 27);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center-right facet (highlight/bevel)
  ctx.fillStyle = '#8f7762';
  ctx.beginPath();
  ctx.moveTo(-8, 21);
  ctx.lineTo(8, 21);
  ctx.lineTo(0, 37);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cutting edge highlight
  ctx.strokeStyle = '#e8dccb';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, 21);
  ctx.lineTo(0, 37);
  ctx.stroke();

  // Chisel Point Tip
  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.moveTo(-2, 37);
  ctx.lineTo(0, 39);
  ctx.lineTo(2, 37);
  ctx.closePath();
  ctx.fill();

  ctx.restore(); // restore drill rotation
  ctx.restore(); // restore drill save

  // High-Pressure Hydraulic Hose to Drill (Curving from hull)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-33, -19);
  ctx.bezierCurveTo(-36, -26, -42, -28, -44, -20);
  ctx.stroke();

  // ---------------------------------------------------------
  // 4. Center Recessed Spine & Underslung Rover Bay
  // ---------------------------------------------------------
  // Recessed Backbone Frame (x: -11 to +11, y: -16 to -6)
  ctx.fillStyle = '#261f1a';
  ctx.strokeStyle = '#4a3c32';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.fillRect(-11, -16, 22, 10);
  ctx.strokeRect(-11, -16, 22, 10);

  // Diagonal Reinforcement Hazard Chevron Stripes on Frame
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-9, -16);
  ctx.lineTo(-4, -6);
  ctx.moveTo(-4, -16);
  ctx.lineTo(1, -6);
  ctx.moveTo(1, -16);
  ctx.lineTo(6, -6);
  ctx.stroke();

  // Two Thick High-Pressure Pneumatic / Hydraulic Hoses Looping Down
  // Hose 1
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(-6, -16);
  ctx.bezierCurveTo(-6, -11, -4, -9, -4, -6);
  ctx.stroke();
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-6, -16);
  ctx.bezierCurveTo(-6, -11, -4, -9, -4, -6);
  ctx.stroke();

  // Hose 2
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(4, -16);
  ctx.bezierCurveTo(4, -11, 2, -9, 2, -6);
  ctx.stroke();
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(4, -16);
  ctx.bezierCurveTo(4, -11, 2, -9, 2, -6);
  ctx.stroke();

  // ---------------------------------------------------------
  // 5. Underslung Rover Bay Pod & Articulated Lowering Ramp
  // (X: -10 to +10, Y: -6 to +16)
  // ---------------------------------------------------------
  const bayW = 20;
  const bayH = 22;
  const bayX = -10;
  const bayY = -6;

  // Outer Pod Housing
  ctx.fillStyle = '#b84538';
  ctx.strokeStyle = '#5c1910';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, bayX, bayY, bayW, bayH, 2);
  ctx.fill();
  ctx.stroke();

  // Horizontal Cyan Status / Scanner Visor on Bay
  ctx.fillStyle = '#082f49';
  ctx.fillRect(-6, -2, 12, 4);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(-5, -1, 10, 2);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-2, -0.5, 4, 1);

  // Recessed Interior Garage Deck
  ctx.fillStyle = '#171310';
  ctx.fillRect(-8, 3, 16, 12);

  // Overhead Warm Yellow Garage Lamps
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(-4, 4.5, 1.2, 0, Math.PI * 2);
  ctx.arc(4, 4.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Deck Guide Rails
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-6, 14);
  ctx.lineTo(6, 14);
  ctx.stroke();

  // Onboard Rover (Rendered when loaded or ready in bay)
  const isLoaded = (ship.loadedTrucksCount || 0) > 0 || (config.isHeavyVehicleCarrier && (ship.rampProgress || 0) > 0.05);
  if (isLoaded) {
    ctx.save();
    ctx.translate(0, 9);
    // Rover Chassis
    ctx.fillStyle = '#261f1a';
    ctx.strokeStyle = '#d4b276';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    roundRect(ctx, -7, -3, 14, 6, 1);
    ctx.fill();
    ctx.stroke();
    // Rover Cabin
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(1, -5, 5, 3);
    // Rover Cargo Box
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-6, -5, 5, 2.5);
    // Rover All-Terrain Wheels
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-4.5, 3.5, 1.8, 0, Math.PI * 2);
    ctx.arc(0, 3.5, 1.8, 0, Math.PI * 2);
    ctx.arc(4.5, 3.5, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // LOWERING HYDRAULIC BAY DOOR / RAMP
  const nRampProgress = ship.rampProgress || 0;
  const rampHingeX = bayX;
  const rampHingeY = bayY + bayH - 2;

  if (nRampProgress > 0.01) {
    // Ramp is extending down toward ground level
    ctx.save();
    const rampLength = 32;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.15;
    const currentAngle = closedAngle + (openAngle - closedAngle) * nRampProgress;

    const rampEndX = rampHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = rampHingeY + Math.sin(currentAngle) * rampLength;

    // Heavy Hydraulic Guide Actuator Piston
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(bayX + bayW, rampHingeY - 4);
    ctx.lineTo((rampHingeX + rampEndX) * 0.5, (rampHingeY + rampEndY) * 0.5);
    ctx.stroke();

    // Ramp Main Plate Beam
    ctx.strokeStyle = '#453524';
    ctx.lineWidth = 5.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // High-Traction Diamond Tread Top Face
    ctx.strokeStyle = '#d4b276';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Hazard Chevrons / End Knuckle
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Sealed Armored Belly Hatch Door
    ctx.fillStyle = '#82271d';
    ctx.strokeStyle = '#45120b';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    roundRect(ctx, -8, 6, 16, 9, 1);
    ctx.fill();
    ctx.stroke();

    // Mechanical Lock Dogs / Latches
    ctx.fillStyle = '#d4b276';
    ctx.fillRect(-7, 9.5, 2.5, 2);
    ctx.fillRect(4.5, 9.5, 2.5, 2);

    // Hazard Border on Hatch Lip
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-9, 15);
    ctx.lineTo(9, 15);
    ctx.stroke();
  }

  // ---------------------------------------------------------
  // 6. Forward Command Superstructure & Bridge (X: +10 to +44)
  // ---------------------------------------------------------
  const fwdGrad = ctx.createLinearGradient(10, -32, 44, 16);
  fwdGrad.addColorStop(0, '#c75142');
  fwdGrad.addColorStop(0.5, '#b84538');
  fwdGrad.addColorStop(1, '#82271d');

  ctx.fillStyle = fwdGrad;
  ctx.strokeStyle = '#5c1910';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(10, 16);
  ctx.lineTo(10, -20);
  ctx.lineTo(24, -20);
  ctx.lineTo(30, -30);
  ctx.lineTo(44, -30);
  ctx.lineTo(44, 16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Forward Prow Chamfer & Armor Seam
  ctx.strokeStyle = '#d96c5e';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(12, 14);
  ctx.lineTo(12, -18);
  ctx.lineTo(25, -18);
  ctx.lineTo(31, -28);
  ctx.lineTo(42, -28);
  ctx.lineTo(42, 14);
  ctx.stroke();

  // Forward Hex Bolts
  const fwdBolts = [
    { x: 12, y: -16 },
    { x: 26, y: -16 },
    { x: 42, y: -26 },
    { x: 42, y: 12 },
    { x: 12, y: 12 },
  ];
  ctx.fillStyle = '#64748b';
  for (const b of fwdBolts) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 0.9, 0, Math.PI * 2);
    ctx.fill();
  }

  // Panoramic Cyan Bridge Visor Array (3 Faceted Trapezoidal Window Panes)
  // Window Frame Recess
  ctx.fillStyle = '#1c1815';
  ctx.beginPath();
  ctx.moveTo(31, -29);
  ctx.lineTo(43, -29);
  ctx.lineTo(41, -23);
  ctx.lineTo(31, -23);
  ctx.closePath();
  ctx.fill();

  // 3 Distinct Glass Panes
  const windowPanes = [
    { x1: 32, x2: 34.5, x3: 34.5, x4: 32 },
    { x1: 35.5, x2: 38.5, x3: 38.5, x4: 35.5 },
    { x1: 39.5, x2: 42.5, x3: 41, x4: 39.5 },
  ];

  for (const pane of windowPanes) {
    const paneGrad = ctx.createLinearGradient(pane.x1, -28.5, pane.x2, -23.5);
    paneGrad.addColorStop(0, '#e0f2fe');
    paneGrad.addColorStop(0.35, '#38bdf8');
    paneGrad.addColorStop(1, '#0284c7');

    ctx.fillStyle = paneGrad;
    ctx.beginPath();
    ctx.moveTo(pane.x1, -28.5);
    ctx.lineTo(pane.x2, -28.5);
    ctx.lineTo(pane.x3, -23.5);
    ctx.lineTo(pane.x4, -23.5);
    ctx.closePath();
    ctx.fill();

    // Specular Glint Highlight
    ctx.fillStyle = '#ffffff';
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(pane.x1 + 0.4, -28);
    ctx.lineTo(pane.x2 - 0.4, -28);
    ctx.lineTo(pane.x2 - 0.4, -26.5);
    ctx.lineTo(pane.x1 + 0.4, -27);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }

  // Dual Diagonal Intake Louvers (Top-left of forward superstructure)
  ctx.fillStyle = '#261f1a';
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(17, -15);
  ctx.lineTo(21, -11);
  ctx.lineTo(19, -9);
  ctx.lineTo(15, -13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(21, -17);
  ctx.lineTo(25, -13);
  ctx.lineTo(23, -11);
  ctx.lineTo(19, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Forward Lower Vent Slots (5 horizontal slashes)
  ctx.strokeStyle = '#45120b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(28, 8);
  ctx.lineTo(31, 11);
  ctx.moveTo(31, 8);
  ctx.lineTo(34, 11);
  ctx.moveTo(34, 8);
  ctx.lineTo(37, 11);
  ctx.moveTo(37, 8);
  ctx.lineTo(40, 11);
  ctx.stroke();

  // Forward Bridge Rooftop Gantry & Spotlight
  // Antenna Spire
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(35, -30);
  ctx.lineTo(35, -42);
  ctx.stroke();
  // Antenna Flashing Beacon
  const beaconAlpha = 0.5 + 0.5 * Math.sin(time * 6);
  ctx.fillStyle = `rgba(239, 68, 68, ${beaconAlpha})`;
  ctx.beginPath();
  ctx.arc(35, -42.5, 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Articulated Searchlight Projector on Cab Roof
  ctx.fillStyle = '#4a3c32';
  ctx.strokeStyle = '#261f1a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, 39, -36, 5, 6, 1);
  ctx.fill();
  ctx.stroke();
  // Lens Glass & Flare
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(44, -33, 1.2, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Forward Downward Spotlight Light Cone
  const spotGrad = ctx.createLinearGradient(44, -33, 62, 10);
  spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
  spotGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.3)');
  spotGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
  ctx.fillStyle = spotGrad;
  ctx.beginPath();
  ctx.moveTo(44, -34);
  ctx.lineTo(65, 5);
  ctx.lineTo(55, 15);
  ctx.lineTo(44, -32);
  ctx.closePath();
  ctx.fill();

  // ---------------------------------------------------------
  // 7. Heavy Propulsion Thrusters Array (Y: 16 to 24)
  // ---------------------------------------------------------
  // Aft Dual Thruster Bells
  ctx.fillStyle = '#1c1917';
  ctx.strokeStyle = '#4a3c32';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-36, 16);
  ctx.lineTo(-26, 16);
  ctx.lineTo(-24, 24);
  ctx.lineTo(-38, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Copper Nozzle Lip
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-38, 24);
  ctx.lineTo(-24, 24);
  ctx.stroke();

  // Forward Dual Thruster Bells
  ctx.fillStyle = '#1c1917';
  ctx.strokeStyle = '#4a3c32';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(24, 16);
  ctx.lineTo(36, 16);
  ctx.lineTo(38, 24);
  ctx.lineTo(22, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Copper Nozzle Lip
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(22, 24);
  ctx.lineTo(38, 24);
  ctx.stroke();

  // Idle Throat Glow
  ctx.fillStyle = '#38bdf8';
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.ellipse(-31, 23, 5, 1.5, 0, 0, Math.PI * 2);
  ctx.ellipse(30, 23, 5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
}

// =====================================================================
// 18. NAUTILUS (Modular Tactical Vector Scout & Spiral Bow Lander)
// =====================================================================
export function drawNautilus(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number
) {
  const footPadY = 28 + gearSpringOffset;

  // ---------------------------------------------------------
  // 1. Aft Propulsion Unit & 4 Aerospike Stabilizing Fins (X: -44 to -18)
  // ---------------------------------------------------------
  // Aerospike Upper & Lower Stabilizer Fins
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;

  // Upper Fin (angled back & up)
  ctx.beginPath();
  ctx.moveTo(-32, -11);
  ctx.lineTo(-46, -21);
  ctx.lineTo(-48, -20);
  ctx.lineTo(-38, -11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lower Fin (angled back & down)
  ctx.beginPath();
  ctx.moveTo(-32, 11);
  ctx.lineTo(-46, 21);
  ctx.lineTo(-48, 20);
  ctx.lineTo(-38, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lateral Fin Ribs (Horizontal Perspective Darts)
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.moveTo(-42, -2);
  ctx.lineTo(-47, -3);
  ctx.lineTo(-47, 3);
  ctx.lineTo(-42, 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Engine Neck Ribbed Conduit (Connecting to main hull)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -24, -7, 8, 14, 1.5);
  ctx.fill();
  ctx.stroke();

  // Neck Rib Rings
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-21, -7);
  ctx.lineTo(-21, 7);
  ctx.moveTo(-18, -7);
  ctx.lineTo(-18, 7);
  ctx.stroke();

  // White Cylindrical Engine Housing Body
  const engineGrad = ctx.createLinearGradient(-42, -11, -42, 11);
  engineGrad.addColorStop(0, '#ffffff');
  engineGrad.addColorStop(0.3, '#f1f5f9');
  engineGrad.addColorStop(0.7, '#e2e8f0');
  engineGrad.addColorStop(1, '#cbd5e1');

  ctx.fillStyle = engineGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -42, -11, 18, 22, 2);
  ctx.fill();
  ctx.stroke();

  // Engine Cylinder Panel Slits (3 vertical slashes)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-36, -5);
  ctx.lineTo(-36, 5);
  ctx.moveTo(-33, -5);
  ctx.lineTo(-33, 5);
  ctx.moveTo(-30, -5);
  ctx.lineTo(-30, 5);
  ctx.stroke();

  // Aft Exhaust Nozzle Lip & Throat
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -45, -12, 4, 24, 1.5);
  ctx.fill();
  ctx.stroke();

  // Deep Nozzle Throat Cavity
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(-45, 0, 2, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  // Idle Throat Glow
  const enginePulse = 0.4 + 0.2 * Math.sin(time * 5);
  ctx.fillStyle = `rgba(56, 189, 248, ${enginePulse})`;
  ctx.beginPath();
  ctx.ellipse(-45, 0, 1.5, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  // ---------------------------------------------------------
  // 2. Angled Dorsal Hex Rocket / Sensor Pod (Top Left: X ~ -32 to -4, Y ~ -34 to -12)
  // ---------------------------------------------------------
  ctx.save();
  ctx.translate(-16, -18);
  ctx.rotate(-0.48); // Tilted ~27.5 degrees back-up

  // Dark Mounting Bracket Base
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -14, 5, 20, 5, 1);
  ctx.fill();
  ctx.stroke();

  // Faceted Off-White Pod Body
  const podGrad = ctx.createLinearGradient(-15, -9, 15, 9);
  podGrad.addColorStop(0, '#ffffff');
  podGrad.addColorStop(0.5, '#f8fafc');
  podGrad.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = podGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-15, -4);
  ctx.lineTo(-10, -9);
  ctx.lineTo(12, -9);
  ctx.lineTo(16, -4);
  ctx.lineTo(16, 4);
  ctx.lineTo(12, 9);
  ctx.lineTo(-10, 9);
  ctx.lineTo(-15, 4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pod Longitudinal Seam Line & Vent Louvers
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(10, 0);
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-6, -6);
  ctx.lineTo(-4, -4);
  ctx.moveTo(-2, -6);
  ctx.lineTo(0, -4);
  ctx.stroke();

  // Recessed Hexagonal Front Intake / Rocket Port Face
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(9, -7);
  ctx.lineTo(15, -3);
  ctx.lineTo(15, 3);
  ctx.lineTo(9, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Perforated Circular Rocket / Exhaust Nozzles (7 Ports Honeycomb Array)
  ctx.fillStyle = '#0f172a';
  const podPorts = [
    { x: 10.5, y: -4 },
    { x: 13.5, y: -2 },
    { x: 10.5, y: 0 },
    { x: 13.5, y: 0 },
    { x: 10.5, y: 4 },
    { x: 13.5, y: 2 },
  ];
  for (const p of podPorts) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // ---------------------------------------------------------
  // 3. Central Dark Backbone Spine & Crew Cabin (Center)
  // ---------------------------------------------------------
  // Dark Mechanical Spine / Gantry Frame
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -18, -17, 24, 11, 2);
  ctx.fill();
  ctx.stroke();

  // Spine Top Serrated Gantry Teeth (5 notches)
  ctx.fillStyle = '#0f172a';
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(-16 + i * 4, -18.5, 2.4, 2);
  }

  // White Modular Crew Cabin Pod
  const cabinGrad = ctx.createLinearGradient(-10, -16, 8, 2);
  cabinGrad.addColorStop(0, '#ffffff');
  cabinGrad.addColorStop(0.6, '#f8fafc');
  cabinGrad.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = cabinGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -10, -16, 18, 18, 2.5);
  ctx.fill();
  ctx.stroke();

  // Tinted Crew Observation Window
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -8, -13, 7.5, 10, 1.5);
  ctx.fill();
  ctx.stroke();

  // Window Glass Specular Highlight
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(-7.5, -12);
  ctx.lineTo(-2, -12);
  ctx.lineTo(-4, -9.5);
  ctx.lineTo(-7.5, -9.5);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Window Status Indicator Slashes (3 vertical dashes)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(1, -11);
  ctx.lineTo(1, -9.5);
  ctx.moveTo(1, -8);
  ctx.lineTo(1, -6.5);
  ctx.moveTo(1, -5);
  ctx.lineTo(1, -3.5);
  ctx.stroke();

  // Vertical Intake Capsule Slit
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 3, -14, 3.8, 14, 1.8);
  ctx.fill();
  ctx.stroke();

  // ---------------------------------------------------------
  // 4. Lower Armored Module & Triple Intake / Reaction Thrusters (Belly)
  // ---------------------------------------------------------
  // Lower Center White Armor Block (X: -10 to +4, Y: 0 to +22)
  const bellyGrad = ctx.createLinearGradient(-10, 0, 4, 22);
  bellyGrad.addColorStop(0, '#ffffff');
  bellyGrad.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = bellyGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(4, 0);
  ctx.lineTo(4, 21);
  ctx.lineTo(-8, 21);
  ctx.lineTo(-10, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Top Slanted Ventilation Slashes (4 distinct black louvers: // //)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-7, 3);
  ctx.lineTo(-5, 8);
  ctx.moveTo(-4, 3);
  ctx.lineTo(-2, 8);
  ctx.moveTo(0, 3);
  ctx.lineTo(2, 8);
  ctx.moveTo(3, 3);
  ctx.lineTo(5, 8);
  ctx.stroke();

  // Lower Vent Slot
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-6, 17, 7, 2);

  // Lower Rear Pod (X: -24 to -10, Y: 0 to +21)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-24, 0);
  ctx.lineTo(-10, 0);
  ctx.lineTo(-10, 21);
  ctx.lineTo(-22, 21);
  ctx.lineTo(-24, 18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Rear Pod Horizontal Status Stripes (3 parallel tan markings)
  ctx.fillStyle = '#d4b276';
  ctx.fillRect(-21, 6, 6, 1.6);
  ctx.fillRect(-21, 10, 6, 1.6);
  ctx.fillRect(-21, 14, 6, 1.6);

  // Lower Forward Pod with Triple Vertical Thrusters (X: +4 to +16, Y: -2 to +22)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(4, -1);
  ctx.lineTo(16, -1);
  ctx.lineTo(16, 21);
  ctx.lineTo(6, 21);
  ctx.lineTo(4, 19);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Forward Pod Status Stripes
  ctx.fillStyle = '#d4b276';
  ctx.fillRect(7, 6, 5, 1.6);
  ctx.fillRect(7, 10, 5, 1.6);
  ctx.fillRect(7, 14, 5, 1.6);

  // Three Stacked Circular / Oval Reaction Thruster Ports (Right face of forward pod)
  const portYs = [4, 11, 18];
  for (const py of portYs) {
    // Outer Rim
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(16, py, 2.8, 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Dark Cavity
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(16, py, 1.8, 2.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner Glow Ring
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(16, py, 1.0, 1.5, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // ---------------------------------------------------------
  // 5. Landing Skids with Stamped "X" Badges (Strict Path Isolation)
  // ---------------------------------------------------------
  // Footpad 1: Rear Skid (under lower rear block, x: -18)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -22, 21, 8, 4, 1);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -22, 24, 8, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Stamped "X" Cross-Brace on Footpad 1
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-20.5, 25.5);
  ctx.lineTo(-15.5, 29.5);
  ctx.moveTo(-20.5, 29.5);
  ctx.lineTo(-15.5, 25.5);
  ctx.stroke();

  // Footpad 2: Forward Skid (under lower forward block, x: 10)
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 6, 21, 8, 4, 1);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, 6, 24, 8, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Stamped "X" Cross-Brace on Footpad 2
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(7.5, 25.5);
  ctx.lineTo(12.5, 29.5);
  ctx.moveTo(7.5, 29.5);
  ctx.lineTo(12.5, 25.5);
  ctx.stroke();

  // Footpad 3: Prow Skid (under front curved cowl, x: 29)
  const prowSkidY = 20 + gearSpringOffset * 0.7;
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 25, prowSkidY - 3, 8, 4, 1);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, 25, prowSkidY, 8, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Stamped "X" Cross-Brace on Footpad 3
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(26.5, prowSkidY + 1.5);
  ctx.lineTo(31.5, prowSkidY + 5.5);
  ctx.moveTo(26.5, prowSkidY + 5.5);
  ctx.lineTo(31.5, prowSkidY + 1.5);
  ctx.stroke();

  // ---------------------------------------------------------
  // 6. The Iconic Arched Spiral Cowled Bow (Front Right: X ~ +8 to +44)
  // ---------------------------------------------------------
  const hubX = 19;
  const hubY = -2;

  // Dark Internal Circular Hub / Intake Core (Inside the spiral)
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.arc(hubX, hubY, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Inner Concentric Turbine Ring
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(hubX, hubY, 7.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Turbine Stator Blades (Radial Spoke Slashes)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
    ctx.moveTo(hubX + Math.cos(a) * 4, hubY + Math.sin(a) * 4);
    ctx.lineTo(hubX + Math.cos(a) * 7.2, hubY + Math.sin(a) * 7.2);
  }
  ctx.stroke();

  // Central Pivot Boss & Pin
  ctx.fillStyle = '#94a3b8';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(hubX, hubY, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.beginPath();
  ctx.arc(hubX, hubY, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Outer Crescent Armored Cowl Shell (Sweeping around hub from top to bottom)
  const cowlGrad = ctx.createLinearGradient(16, -22, 42, 10);
  cowlGrad.addColorStop(0, '#ffffff');
  cowlGrad.addColorStop(0.5, '#f8fafc');
  cowlGrad.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = cowlGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  // Outer arc edge
  ctx.moveTo(15, -22);
  ctx.bezierCurveTo(27, -24, 40, -14, 41, 0);
  ctx.bezierCurveTo(41, 10, 36, 18, 29, 21);
  ctx.lineTo(25, 17);
  // Inner arc edge
  ctx.bezierCurveTo(31, 13, 34, 7, 33, -1);
  ctx.bezierCurveTo(32, -8, 25, -15, 16, -16);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Radial Segment Seams on Cowl Shell
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  // Seam 1 (Upper-Mid)
  ctx.moveTo(27, -19);
  ctx.lineTo(24, -13);
  // Seam 2 (Mid-Prow)
  ctx.moveTo(41, 0);
  ctx.lineTo(33, 0);
  // Seam 3 (Lower-Mid)
  ctx.moveTo(37, 12);
  ctx.lineTo(30, 10);
  ctx.stroke();

  // Circular Bolting Studs / Sensor Apertures on Cowl (4 distinct dark rivets)
  const cowlStuds = [
    { x: 21, y: -13 },
    { x: 34, y: -4 },
    { x: 33, y: 7 },
    { x: 25, y: 15 },
  ];
  for (const cs of cowlStuds) {
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(cs.x, cs.y, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#cbd5e1';
    ctx.beginPath();
    ctx.arc(cs.x, cs.y, 0.6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Outer Glowing Amber-Gold Visor Perimeter Arc Strip
  const visorGrad = ctx.createLinearGradient(22, -24, 44, 4);
  visorGrad.addColorStop(0, '#fef08a');
  visorGrad.addColorStop(0.5, '#facc15');
  visorGrad.addColorStop(1, '#eab308');

  ctx.fillStyle = visorGrad;
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.2;

  // Segment 1 (Top-Right Arc)
  ctx.beginPath();
  ctx.moveTo(22, -23.5);
  ctx.bezierCurveTo(31, -23, 38, -16, 40.5, -8);
  ctx.lineTo(38.5, -8);
  ctx.bezierCurveTo(36, -14, 30, -20.5, 22, -21);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Segment 2 (Nose Arc)
  ctx.beginPath();
  ctx.moveTo(41.5, -6);
  ctx.bezierCurveTo(43.5, 0, 42.5, 7, 39, 13);
  ctx.lineTo(37, 12);
  ctx.bezierCurveTo(40, 6, 41, 0, 39.5, -6);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// ============================================================================
// EAGLE TRANSPORTER (Space: 1999 Modular Lunar Cargo & Heavy Transport Lander)
// ============================================================================
export function drawEagle(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  _ship?: ShipState,
  _time: number = 0
) {
  // --------------------------------------------------------------------------
  // 1. Aft Propulsion Block: 4 Nuclear Fusion Rocket Bells & Propellant Tanks
  // --------------------------------------------------------------------------
  // Thrust Mounting Truss Bars
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-44, -9);
  ctx.lineTo(-53, -11);
  ctx.moveTo(-44, 9);
  ctx.lineTo(-53, 11);
  ctx.moveTo(-44, 0);
  ctx.lineTo(-53, 0);
  ctx.stroke();

  // 4 Flared Rocket Engine Nozzle Bells (Titanium Alloy with Cooling Rings)
  const drawEngineBell = (topY: number, botY: number) => {
    // Outer Bell Body
    const bellGrad = ctx.createLinearGradient(-68, topY, -52, botY);
    bellGrad.addColorStop(0, '#1e293b');
    bellGrad.addColorStop(0.35, '#334155');
    bellGrad.addColorStop(0.7, '#475569');
    bellGrad.addColorStop(1, '#1e293b');

    ctx.fillStyle = bellGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-52, topY + 2.5);
    ctx.bezierCurveTo(-58, topY + 2.5, -64, topY + 0.5, -68, topY);
    ctx.lineTo(-68, botY);
    ctx.bezierCurveTo(-64, botY - 0.5, -58, botY - 2.5, -52, botY - 2.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Exterior Machined Cooling Rings
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(-57, topY + 2.0);
    ctx.lineTo(-57, botY - 2.0);
    ctx.moveTo(-62, topY + 1.2);
    ctx.lineTo(-62, botY - 1.2);
    ctx.stroke();

    // Nozzle Throat Cavity (Deep Dark Recess & Subtle Fusion Glow)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(-68, (topY + botY) / 2, 2.0, Math.abs(botY - topY) / 2 - 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.ellipse(-68, (topY + botY) / 2, 1.2, Math.abs(botY - topY) / 2 - 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Outer Exit Lip Flange
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(-68, topY);
    ctx.lineTo(-68, botY);
    ctx.stroke();
  };

  // Upper Main Rocket Bell
  drawEngineBell(-14, -1);
  // Lower Main Rocket Bell
  drawEngineBell(1, 14);

  // 4 Pressurized Spherical Propellant Tanks (Upper pair and lower pair)
  const drawFuelTank = (cx: number, cy: number, r: number) => {
    ctx.save();
    const tankGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.15, cx, cy, r);
    tankGrad.addColorStop(0, '#ffffff');
    tankGrad.addColorStop(0.5, '#f1f5f9');
    tankGrad.addColorStop(0.85, '#cbd5e1');
    tankGrad.addColorStop(1, '#64748b');

    ctx.fillStyle = tankGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Circumferential Weld Seam
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.95, r * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Orange/Black Service Patch
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(cx - 2.5, cy - 1.2, 5, 2.4);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.6;
    ctx.strokeRect(cx - 2.5, cy - 1.2, 5, 2.4);
    ctx.restore();
  };

  // Upper Propellant Tanks (Aft and Fore)
  drawFuelTank(-51, -6, 5.0);
  drawFuelTank(-44.5, -6, 4.6);
  // Lower Propellant Tanks (Aft and Fore)
  drawFuelTank(-51, 6, 5.0);
  drawFuelTank(-44.5, 6, 4.6);

  // Fuel Feed Plumbing Conduits
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-51, -1);
  ctx.lineTo(-44, -1);
  ctx.moveTo(-51, 1);
  ctx.lineTo(-44, 1);
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 2. Open Tubular Spaceframe Catwalk (The Iconic Dorsal Truss of Space: 1999)
  // --------------------------------------------------------------------------
  // Aft Truss Section (x: -43 to -24)
  // Lower rail
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-44, -8);
  ctx.lineTo(-24, -8);
  ctx.moveTo(-44, -14);
  ctx.lineTo(-24, -14);
  ctx.stroke();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-44, -8);
  ctx.lineTo(-24, -8);
  ctx.moveTo(-44, -14);
  ctx.lineTo(-24, -14);
  ctx.stroke();

  // Aft Diagonal Cross-Struts (Triangulated Lattice)
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-44, -8);
  ctx.lineTo(-39, -14);
  ctx.lineTo(-34, -8);
  ctx.lineTo(-29, -14);
  ctx.lineTo(-24, -8);
  ctx.moveTo(-44, -14);
  ctx.lineTo(-39, -8);
  ctx.lineTo(-34, -14);
  ctx.lineTo(-29, -8);
  ctx.lineTo(-24, -14);
  ctx.stroke();

  // Central Raised Bridge Truss (Directly above Cargo Pod, x: -24 to +24)
  // Tubular Rails
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-24, -10);
  ctx.lineTo(-24, -16.5);
  ctx.lineTo(24, -16.5);
  ctx.lineTo(24, -10);
  ctx.moveTo(-24, -10.5);
  ctx.lineTo(24, -10.5);
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-24, -16.5);
  ctx.lineTo(24, -16.5);
  ctx.moveTo(-24, -10.5);
  ctx.lineTo(24, -10.5);
  ctx.stroke();

  // Central Open Truss Diagonal Bays
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  const trussStep = 8;
  for (let x = -24; x < 24; x += trussStep) {
    // Diagonal brace
    ctx.moveTo(x, -10.5);
    ctx.lineTo(x + trussStep / 2, -16.5);
    ctx.lineTo(x + trussStep, -10.5);
    // Vertical upright
    ctx.moveTo(x + trussStep / 2, -10.5);
    ctx.lineTo(x + trussStep / 2, -16.5);
  }
  ctx.stroke();

  // Forward Truss Section (x: +24 to +44)
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(24, -8);
  ctx.lineTo(44, -8);
  ctx.moveTo(24, -14);
  ctx.lineTo(44, -14);
  ctx.stroke();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(24, -8);
  ctx.lineTo(44, -8);
  ctx.moveTo(24, -14);
  ctx.lineTo(44, -14);
  ctx.stroke();

  // Forward Diagonal Cross-Struts
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(24, -8);
  ctx.lineTo(29, -14);
  ctx.lineTo(34, -8);
  ctx.lineTo(39, -14);
  ctx.lineTo(44, -8);
  ctx.moveTo(24, -14);
  ctx.lineTo(29, -8);
  ctx.lineTo(34, -14);
  ctx.lineTo(39, -8);
  ctx.lineTo(44, -14);
  ctx.stroke();

  // Red & White Hazard Striped Docking Collar Bands at Frame Junctions
  const drawHazardCollar = (x: number, y: number, w: number, h: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(x, y, w * 0.45, h);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.0;
    ctx.strokeRect(x, y, w, h);
  };
  drawHazardCollar(-44, -15, 2.5, 8);
  drawHazardCollar(-24, -17.5, 2.5, 8);
  drawHazardCollar(21.5, -17.5, 2.5, 8);
  drawHazardCollar(42, -15, 2.5, 8);

  // --------------------------------------------------------------------------
  // 3. Central Modular Cargo / Passenger Pod (Suspended Hold)
  // --------------------------------------------------------------------------
  // Main Pod Shell (x: -24 to +24, y: -9 to +8)
  const podGrad = ctx.createLinearGradient(0, -9, 0, 8);
  podGrad.addColorStop(0, '#ffffff');
  podGrad.addColorStop(0.3, '#f8fafc');
  podGrad.addColorStop(0.7, '#f1f5f9');
  podGrad.addColorStop(1, '#e2e8f0');

  ctx.fillStyle = podGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-24, -7);
  ctx.lineTo(-22, -9);
  ctx.lineTo(22, -9);
  ctx.lineTo(24, -7);
  ctx.lineTo(24, 7);
  ctx.lineTo(22, 8.5);
  ctx.lineTo(-22, 8.5);
  ctx.lineTo(-24, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Upper Observation Strip & Viewport Windows
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.rect(-22, -8.2, 44, 3.4);
  ctx.fill();
  ctx.stroke();

  // 4 Slit Viewport Windows (Black glass with specular glint)
  const windowXs = [-19, -11, 7, 15];
  windowXs.forEach((wx) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(wx, -7.5, 5.5, 2.0);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(wx + 0.6, -7.1, 4.3, 0.6);
  });

  // Center Embossed Airlock Door (with "H" / "X" structural stamping)
  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.rect(-5, -4.5, 10, 12);
  ctx.fill();
  ctx.stroke();

  // Recessed Door Panel
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.rect(-3.8, -3.2, 7.6, 9.4);
  ctx.fill();
  ctx.stroke();

  // Door "X" / "H" Embossed Relief
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-3, -2);
  ctx.lineTo(3, 5);
  ctx.moveTo(3, -2);
  ctx.lineTo(-3, 5);
  ctx.moveTo(-3, 1.5);
  ctx.lineTo(3, 1.5);
  ctx.stroke();

  // Emergency Door Release Handle
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(2.6, 1, 1.2, 2.5);

  // Flanking Corrugated / Ribbed Equipment Bays
  // Left Ribbed Section
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(-22, -2.5, 15, 8.5);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.strokeRect(-22, -2.5, 15, 8.5);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let ly = -1.2; ly <= 5.2; ly += 1.4) {
    ctx.moveTo(-21.5, ly);
    ctx.lineTo(-7.5, ly);
  }
  ctx.stroke();

  // Right Ribbed Section
  ctx.fillStyle = '#e2e8f0';
  ctx.fillRect(7, -2.5, 15, 8.5);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.strokeRect(7, -2.5, 15, 8.5);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let ry = -1.2; ry <= 5.2; ry += 1.4) {
    ctx.moveTo(7.5, ry);
    ctx.lineTo(21.5, ry);
  }
  ctx.stroke();

  // Moonbase Alpha Insignia Blue Decals on Cargo Pod
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(-21, -4.2, 3.2, 1.4);
  ctx.fillRect(18, -4.2, 3.2, 1.4);

  // --------------------------------------------------------------------------
  // 4. Belly VTOL Lift Thruster Bells (Dual Downward Thruster Nozzles)
  // --------------------------------------------------------------------------
  const drawVTOLEngine = (x: number) => {
    // Mounting Pylon
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.2;
    ctx.fillRect(x - 2.5, 8.5, 5, 2);
    ctx.strokeRect(x - 2.5, 8.5, 5, 2);

    // Flared VTOL Bell Nozzle
    const vtolGrad = ctx.createLinearGradient(x - 4, 10, x + 4, 15);
    vtolGrad.addColorStop(0, '#475569');
    vtolGrad.addColorStop(0.5, '#1e293b');
    vtolGrad.addColorStop(1, '#0f172a');

    ctx.fillStyle = vtolGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x - 2, 10.5);
    ctx.lineTo(x + 2, 10.5);
    ctx.lineTo(x + 4.2, 15);
    ctx.lineTo(x - 4.2, 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dark Throat Exit
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(x, 15, 4.0, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle Amber Throat Glow
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(x, 15, 2.2, 0.6, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  // Aft VTOL Engine Bell
  drawVTOLEngine(-11);
  // Forward VTOL Engine Bell
  drawVTOLEngine(11);

  // --------------------------------------------------------------------------
  // 5. Outrigger Service Pods & Landing Gear Assemblies (Aft and Forward)
  // --------------------------------------------------------------------------
  const drawOutriggerPod = (cx: number) => {
    // Chamfered Outrigger Service Box
    const podBoxGrad = ctx.createLinearGradient(cx - 8, -7, cx + 8, 8);
    podBoxGrad.addColorStop(0, '#ffffff');
    podBoxGrad.addColorStop(0.5, '#f8fafc');
    podBoxGrad.addColorStop(1, '#e2e8f0');

    ctx.fillStyle = podBoxGrad;
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(cx - 8, -4);
    ctx.lineTo(cx - 5, -7);
    ctx.lineTo(cx + 5, -7);
    ctx.lineTo(cx + 8, -4);
    ctx.lineTo(cx + 8, 5);
    ctx.lineTo(cx + 5, 8);
    ctx.lineTo(cx - 5, 8);
    ctx.lineTo(cx - 8, 5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Top Service Hatch
    ctx.fillStyle = '#cbd5e1';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.8;
    ctx.fillRect(cx - 4.5, -6.2, 4.0, 2.2);
    ctx.strokeRect(cx - 4.5, -6.2, 4.0, 2.2);

    // Moonbase Alpha Roundel Emblem
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#1d4ed8';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(cx + 2.5, -5.0, 1.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Inner Blue Dot
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.arc(cx + 2.5, -5.0, 0.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Iconic 4-Way Cross RCS Reaction Thruster Quad
    // Recessed Dark Diamond / Cross Base
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(cx, -1.8);
    ctx.lineTo(cx + 3.8, 0.5);
    ctx.lineTo(cx, 2.8);
    ctx.lineTo(cx - 3.8, 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // RCS Cross X-Brace
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(cx - 3, -1);
    ctx.lineTo(cx + 3, 2);
    ctx.moveTo(cx + 3, -1);
    ctx.lineTo(cx - 3, 2);
    ctx.stroke();

    // 4 Directional Reaction Nozzle Bells (Up, Down, Left, Right)
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.8;

    // Up nozzle
    ctx.beginPath();
    ctx.moveTo(cx - 1, -1.8);
    ctx.lineTo(cx + 1, -1.8);
    ctx.lineTo(cx + 1.6, -3.6);
    ctx.lineTo(cx - 1.6, -3.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Down nozzle
    ctx.beginPath();
    ctx.moveTo(cx - 1, 2.8);
    ctx.lineTo(cx + 1, 2.8);
    ctx.lineTo(cx + 1.6, 4.6);
    ctx.lineTo(cx - 1.6, 4.6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Left nozzle
    ctx.beginPath();
    ctx.moveTo(cx - 3.8, -0.5);
    ctx.lineTo(cx - 3.8, 1.5);
    ctx.lineTo(cx - 5.6, 2.1);
    ctx.lineTo(cx - 5.6, -1.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right nozzle
    ctx.beginPath();
    ctx.moveTo(cx + 3.8, -0.5);
    ctx.lineTo(cx + 3.8, 1.5);
    ctx.lineTo(cx + 5.6, 2.1);
    ctx.lineTo(cx + 5.6, -1.1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Center Thruster Core Pin
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cx, 0.5, 0.9, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw Aft Outrigger Pod
  drawOutriggerPod(-34);
  // Draw Forward Outrigger Pod
  drawOutriggerPod(34);

  // --------------------------------------------------------------------------
  // 6. Heavy-Duty Articulated Landing Gear (STRICTLY ISOLATED CANVAS SUBPATHS)
  // --------------------------------------------------------------------------
  // Rule Check: Never connect footpads across subpaths!
  const padY = 22 + gearSpringOffset;

  // AFT LANDING GEAR ASSEMBLY
  ctx.save();
  // Mounting Collar
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.rect(-36.5, 8, 5, 2.5);
  ctx.fill();
  ctx.stroke();

  // Upper Oleo Cylinder
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.rect(-35.5, 10.5, 3.0, 5.0);
  ctx.fill();
  ctx.stroke();

  // Lower Chrome Hydraulic Piston (Telescoping into Footpad)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-34, 15.5);
  ctx.lineTo(-34, padY - 2.5);
  ctx.stroke();

  // Folding Scissor Torque Linkage
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-34, 11);
  ctx.lineTo(-37.5, 15);
  ctx.lineTo(-34, 18.5);
  ctx.stroke();

  // Joint Knuckle Pins
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(-37.5, 15, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Aft Shock-Absorbing Wide Dished Footpad (Isolated path)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-39.5, padY);
  ctx.lineTo(-36.5, padY - 3.2);
  ctx.lineTo(-31.5, padY - 3.2);
  ctx.lineTo(-28.5, padY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Aft Ground Friction Pad Plate
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.rect(-40.5, padY, 13, 2.2);
  ctx.fill();
  ctx.restore();

  // FORWARD LANDING GEAR ASSEMBLY (Isolated path)
  ctx.save();
  // Mounting Collar
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.rect(31.5, 8, 5, 2.5);
  ctx.fill();
  ctx.stroke();

  // Upper Oleo Cylinder
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.rect(32.5, 10.5, 3.0, 5.0);
  ctx.fill();
  ctx.stroke();

  // Lower Chrome Hydraulic Piston (Telescoping into Footpad)
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(34, 15.5);
  ctx.lineTo(34, padY - 2.5);
  ctx.stroke();

  // Folding Scissor Torque Linkage
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(34, 11);
  ctx.lineTo(30.5, 15);
  ctx.lineTo(34, 18.5);
  ctx.stroke();

  // Joint Knuckle Pins
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(30.5, 15, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Forward Shock-Absorbing Wide Dished Footpad (Isolated path)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(28.5, padY);
  ctx.lineTo(31.5, padY - 3.2);
  ctx.lineTo(36.5, padY - 3.2);
  ctx.lineTo(39.5, padY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Forward Ground Friction Pad Plate
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.rect(27.5, padY, 13, 2.2);
  ctx.fill();
  ctx.restore();

  // --------------------------------------------------------------------------
  // 7. Forward Command Module (The Iconic Eagle Beak Cockpit)
  // --------------------------------------------------------------------------
  // Service Collar Ring with Red/White Hazard Stripe
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(43, -7.5, 2.5, 15);
  ctx.fillStyle = '#ef4444';
  ctx.fillRect(43, -7.5, 1.2, 15);
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(43, -7.5, 2.5, 15);

  // Beak Nose Main Hull (Faceted Aerodynamic Shell)
  const beakGrad = ctx.createLinearGradient(45, -8, 66, 6);
  beakGrad.addColorStop(0, '#ffffff');
  beakGrad.addColorStop(0.4, '#f8fafc');
  beakGrad.addColorStop(0.8, '#e2e8f0');
  beakGrad.addColorStop(1, '#cbd5e1');

  ctx.fillStyle = beakGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(45.5, -7.5);
  ctx.lineTo(54, -8.0);
  ctx.bezierCurveTo(60, -8.0, 64, -5.0, 66.5, 0.0);
  ctx.bezierCurveTo(64, 4.5, 60, 7.0, 54, 7.0);
  ctx.lineTo(45.5, 7.0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cockpit Lateral Facet Seam Lines
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(47, -3.5);
  ctx.lineTo(54, -3.5);
  ctx.moveTo(47, 3.5);
  ctx.lineTo(54, 3.5);
  ctx.stroke();

  // Dual Iconic Cockpit Viewports (Recessed Dark Angular Glass)
  // Upper Triangular/Trapezoidal Window
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(54, -6.5);
  ctx.lineTo(63.5, -0.8);
  ctx.lineTo(54, -0.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Upper Window Specular Glint
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(55, -5.5);
  ctx.lineTo(60.5, -1.8);
  ctx.lineTo(55, -1.8);
  ctx.closePath();
  ctx.fill();

  // Lower Triangular/Trapezoidal Window
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(54, 0.8);
  ctx.lineTo(63.5, 0.8);
  ctx.lineTo(54, 5.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Lower Window Specular Glint
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(55, 1.8);
  ctx.lineTo(60.5, 1.8);
  ctx.lineTo(55, 4.5);
  ctx.closePath();
  ctx.fill();

  // Window Center Mullion Frame
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(53.5, 0.0);
  ctx.lineTo(64.5, 0.0);
  ctx.stroke();

  // Side Circular Service Port / Sensor Hatch
  ctx.fillStyle = '#cbd5e1';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(49.5, -0.5, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Inner Port Detail
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(49.5, -0.5, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Moonbase Alpha Nose Insignia Emblem
  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(57, 4.0, 2.8, 1.6);

  // Nose Forward Sensor Probe Tip
  ctx.fillStyle = '#334155';
  ctx.fillRect(66.5, -0.6, 1.8, 1.2);
}

// ============================================================================
// AEGIS VULCAN (Aegis Dynamics Fleet Works Heavy Support & Multi-Role Transport)
// ============================================================================
export function drawVulcan(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship?: ShipState,
  _time: number = 0
) {
  // Ground contact level for landing gear footpads
  const footPadY = 20.0 + gearSpringOffset;

  // --------------------------------------------------------------------------
  // 1. Far-Side / Background Structures (Shadowed)
  // --------------------------------------------------------------------------
  // Far-side front gear strut
  ctx.strokeStyle = '#161d15';
  ctx.lineWidth = 1.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-34, 9);
  ctx.lineTo(-37, footPadY - 2.5);
  ctx.lineTo(-35, footPadY - 2.5);
  ctx.stroke();

  // Far-side front footpad
  ctx.fillStyle = '#101510';
  ctx.strokeStyle = '#0a0d09';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -38.5, footPadY - 2.5, 7, 2, 0.5);
  ctx.fill();
  ctx.stroke();

  // Far-side aft gear strut
  ctx.strokeStyle = '#161d15';
  ctx.lineWidth = 2.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(44, 9);
  ctx.lineTo(44, footPadY - 2.5);
  ctx.stroke();

  // Far-side aft footpad
  ctx.fillStyle = '#101510';
  ctx.strokeStyle = '#0a0d09';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 40.5, footPadY - 2.5, 7, 2, 0.5);
  ctx.fill();
  ctx.stroke();

  // Far-side engine exhaust nozzle bells
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 64, -8, 5, 5, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  roundRect(ctx, 64, -1, 5, 5, 0.8);
  ctx.fill();
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 2. Underslung Central Belly Propellant Tank Pod
  // --------------------------------------------------------------------------
  const tankGrad = ctx.createLinearGradient(0, 12.5, 0, 18.5);
  tankGrad.addColorStop(0, '#384335');
  tankGrad.addColorStop(0.35, '#2a3328');
  tankGrad.addColorStop(0.75, '#1c221b');
  tankGrad.addColorStop(1, '#101410');

  ctx.fillStyle = tankGrad;
  ctx.strokeStyle = '#0b0e0a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-4, 12.5);
  ctx.lineTo(14, 12.5);
  ctx.bezierCurveTo(16.5, 12.5, 17.5, 14, 17.5, 16);
  ctx.bezierCurveTo(17.5, 17.5, 16, 18.5, 13.5, 18.5);
  ctx.lineTo(-3.5, 18.5);
  ctx.bezierCurveTo(-6, 18.5, -7.5, 17.5, -7.5, 16);
  ctx.bezierCurveTo(-7.5, 14, -6.5, 12.5, -4, 12.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tank mounting straps
  ctx.fillStyle = '#181f17';
  ctx.strokeStyle = '#0b0e0a';
  ctx.lineWidth = 0.5;
  ctx.fillRect(-2, 12.5, 2, 6);
  ctx.strokeRect(-2, 12.5, 2, 6);
  ctx.fillRect(10, 12.5, 2, 6);
  ctx.strokeRect(10, 12.5, 2, 6);

  // Tank pressure valve
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.arc(4, 15.5, 1.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(4, 14.5);
  ctx.lineTo(4, 12.5);
  ctx.stroke();

  // Tank highlight line
  ctx.strokeStyle = '#485942';
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(-3, 14);
  ctx.lineTo(13, 14);
  ctx.stroke();
  ctx.globalAlpha = 1.0;

  // Umbilical conduits
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-15, 12);
  ctx.bezierCurveTo(-13, 14, -9, 14, -7, 12.5);
  ctx.stroke();

  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(14, 12.5);
  ctx.bezierCurveTo(16, 14.5, 18, 14, 20, 12);
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 3. VTOL Lift Engine Nozzles (Below Chassis)
  // --------------------------------------------------------------------------
  const bellGrad = ctx.createLinearGradient(-26.5, 13.5, -20.5, 16.5);
  bellGrad.addColorStop(0, '#334155');
  bellGrad.addColorStop(0.3, '#64748b');
  bellGrad.addColorStop(0.7, '#475569');
  bellGrad.addColorStop(1, '#1e293b');

  // Forward VTOL bell at x = -24
  ctx.fillStyle = '#1e241c';
  ctx.strokeStyle = '#0f140f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -26.5, 10.5, 5, 3, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = bellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-26.5, 13.5);
  ctx.lineTo(-21.5, 13.5);
  ctx.lineTo(-20.5, 16.5);
  ctx.lineTo(-27.5, 16.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(-24, 16.5, 3.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-24, 16.3, 2.0, 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Aft VTOL bell at x = 36
  const aftBellGrad = ctx.createLinearGradient(33.5, 13.5, 39.5, 16.5);
  aftBellGrad.addColorStop(0, '#334155');
  aftBellGrad.addColorStop(0.3, '#64748b');
  aftBellGrad.addColorStop(0.7, '#475569');
  aftBellGrad.addColorStop(1, '#1e293b');

  ctx.fillStyle = '#1e241c';
  ctx.strokeStyle = '#0f140f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 33.5, 10.5, 5, 3, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = aftBellGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(33.5, 13.5);
  ctx.lineTo(38.5, 13.5);
  ctx.lineTo(39.5, 16.5);
  ctx.lineTo(32.5, 16.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.ellipse(36, 16.5, 3.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(36, 16.3, 2.0, 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // --------------------------------------------------------------------------
  // 4. Lower Mechanical Conduit Bay & Chassis Frame
  // --------------------------------------------------------------------------
  const mechBayGrad = ctx.createLinearGradient(0, 5, 0, 12.5);
  mechBayGrad.addColorStop(0, '#242c23');
  mechBayGrad.addColorStop(0.5, '#181e17');
  mechBayGrad.addColorStop(1, '#0f140f');

  ctx.fillStyle = mechBayGrad;
  ctx.strokeStyle = '#0d110d';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-46, 5);
  ctx.lineTo(-8, 5);
  ctx.lineTo(-8, 12.5);
  ctx.lineTo(-40, 12.5);
  ctx.lineTo(-46, 9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-42, 7);
  ctx.lineTo(-10, 7);
  ctx.stroke();

  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-40, 9.5);
  ctx.lineTo(-12, 9.5);
  ctx.stroke();

  ctx.strokeStyle = '#4b5563';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-38, 11);
  ctx.lineTo(-15, 11);
  ctx.stroke();

  // Hydraulic conduit junctions
  ctx.fillStyle = '#2d3748';
  ctx.strokeStyle = '#1a202c';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, -38, 6, 3, 5, 0.5);
  roundRect(ctx, -26, 6.5, 3.5, 4.5, 0.5);
  roundRect(ctx, -14, 6, 3, 5, 0.5);
  ctx.fill();
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 5. Main Hull Shell: Center Airlock / Drone Module
  // --------------------------------------------------------------------------
  const olivePlateGrad = ctx.createLinearGradient(0, -19, 0, 12.5);
  olivePlateGrad.addColorStop(0, '#485942');
  olivePlateGrad.addColorStop(0.25, '#3c4a36');
  olivePlateGrad.addColorStop(0.75, '#2c3727');
  olivePlateGrad.addColorStop(1, '#1f271c');

  ctx.fillStyle = olivePlateGrad;
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-8, -19);
  ctx.lineTo(18, -19);
  ctx.lineTo(18, 12.5);
  ctx.lineTo(-8, 12.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Center vertical panel seams
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-8, -19);
  ctx.lineTo(-8, 12.5);
  ctx.moveTo(18, -19);
  ctx.lineTo(18, 12.5);
  ctx.stroke();

  ctx.strokeStyle = '#1e271c';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(4, -18);
  ctx.lineTo(4, 11.5);
  ctx.stroke();

  // Upper dorsal spine catwalk & antenna
  ctx.fillStyle = '#1e241c';
  ctx.strokeStyle = '#0f140f';
  ctx.lineWidth = 0.7;
  ctx.fillRect(-7, -20.5, 24, 2);
  ctx.strokeRect(-7, -20.5, 24, 2);

  ctx.strokeStyle = '#4b5563';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-6, -19.5);
  ctx.lineTo(16, -19.5);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(14, -20.5);
  ctx.lineTo(14, -25.5);
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(14, -25.5, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Aegis Dynamics Logo Emblem
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  ctx.moveTo(1, -6);
  ctx.lineTo(-2, -1);
  ctx.lineTo(0, -1);
  ctx.lineTo(1, -3);
  ctx.lineTo(2, -1);
  ctx.lineTo(4, -1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#cbd5e1';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.moveTo(1, -8);
  ctx.lineTo(-3, 0);
  ctx.lineTo(-1, 0);
  ctx.lineTo(1, -4);
  ctx.lineTo(3, 0);
  ctx.lineTo(5, 0);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '900 2.6px monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('AEGIS', 1, 2.5);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '700 1.4px monospace, sans-serif';
  ctx.fillText('DYNAMICS', 1, 5.2);

  // Drone Operator Airlock / Docking Bay Hatch
  ctx.fillStyle = '#2d3728';
  ctx.strokeStyle = '#161c14';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 5.5, -7.5, 11, 15, 1.0);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1f271c';
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 6.8, -6.2, 8.4, 12.4, 0.6);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f8fafc';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 8.2, -4.5, 5.6, 7.5, 1.0);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  roundRect(ctx, 9.2, -3.2, 3.6, 5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(11, -0.7, 1.1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(7.2, -3);
  ctx.lineTo(8.2, -3);
  ctx.moveTo(7.2, 1.5);
  ctx.lineTo(8.2, 1.5);
  ctx.moveTo(13.8, -3);
  ctx.lineTo(14.8, -3);
  ctx.moveTo(13.8, 1.5);
  ctx.lineTo(14.8, 1.5);
  ctx.stroke();

  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(8, 5, 0.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.arc(9.5, 5, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // --------------------------------------------------------------------------
  // 6. Forward Green Armor Flank with "R-17" Stencil & Hazard Chevrons
  // --------------------------------------------------------------------------
  ctx.fillStyle = olivePlateGrad;
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-46, -19);
  ctx.lineTo(-8, -19);
  ctx.lineTo(-8, 5);
  ctx.lineTo(-38, 5);
  ctx.lineTo(-46, 3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const oliveFlankGrad = ctx.createLinearGradient(-44, 0, -10, 0);
  oliveFlankGrad.addColorStop(0, '#506249');
  oliveFlankGrad.addColorStop(0.5, '#3c4a36');
  oliveFlankGrad.addColorStop(1, '#2a3426');

  ctx.fillStyle = oliveFlankGrad;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(-44, -17);
  ctx.lineTo(-10, -17);
  ctx.lineTo(-10, 3);
  ctx.lineTo(-37, 3);
  ctx.lineTo(-44, 1);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Hazard Stripe
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-45.5, -12);
  ctx.lineTo(-42.5, -12);
  ctx.lineTo(-44, -6);
  ctx.lineTo(-47, -6);
  ctx.closePath();
  ctx.clip();
  ctx.fillStyle = '#eab308';
  ctx.fillRect(-48, -13, 8, 8);
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-48, -11);
  ctx.lineTo(-43, -6);
  ctx.moveTo(-46, -13);
  ctx.lineTo(-41, -8);
  ctx.stroke();
  ctx.restore();

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(-45.5, -12);
  ctx.lineTo(-42.5, -12);
  ctx.lineTo(-44, -6);
  ctx.lineTo(-47, -6);
  ctx.closePath();
  ctx.stroke();

  // Weathered Military Stencil "R-17"
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'square';
  ctx.lineJoin = 'miter';
  ctx.globalAlpha = 0.9;

  // Letter R
  ctx.beginPath();
  ctx.moveTo(-35, -4);
  ctx.lineTo(-35, 3);
  ctx.moveTo(-35, -4);
  ctx.lineTo(-30.5, -4);
  ctx.bezierCurveTo(-29, -4, -28, -3, -28, -1.5);
  ctx.bezierCurveTo(-28, 0, -29, 1, -30.5, 1);
  ctx.lineTo(-35, 1);
  ctx.moveTo(-31, 1);
  ctx.lineTo(-28, 3);
  ctx.stroke();

  // Stencil cut bridge on R
  ctx.strokeStyle = '#3c4a36';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-35, -1.5);
  ctx.lineTo(-35, -0.5);
  ctx.stroke();

  // Hyphen -
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-26, -0.5);
  ctx.lineTo(-23, -0.5);
  ctx.stroke();

  // Number 1
  ctx.beginPath();
  ctx.moveTo(-20, -2);
  ctx.lineTo(-18.5, -4);
  ctx.lineTo(-18.5, 3);
  ctx.moveTo(-20.5, 3);
  ctx.lineTo(-16.5, 3);
  ctx.stroke();

  // Stencil cut bridge on 1
  ctx.strokeStyle = '#3c4a36';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-18.5, -1.5);
  ctx.lineTo(-18.5, -0.5);
  ctx.stroke();

  // Number 7
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-15, -4);
  ctx.lineTo(-9.5, -4);
  ctx.lineTo(-13, 3);
  ctx.stroke();

  // Stencil cut bridge on 7
  ctx.strokeStyle = '#3c4a36';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-12.5, -1);
  ctx.lineTo(-11.2, -0.5);
  ctx.stroke();

  ctx.globalAlpha = 1.0;

  // Panel latches
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.3;
  ctx.fillRect(-37, -15, 2, 1.2);
  ctx.strokeRect(-37, -15, 2, 1.2);
  ctx.fillRect(-18, -15, 2, 1.2);
  ctx.strokeRect(-18, -15, 2, 1.2);

  ctx.fillStyle = '#1e271c';
  ctx.strokeStyle = '#485942';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-13, 1, 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 7. Forward Cockpit Cab (White Ballistic Ceramic Armor)
  // --------------------------------------------------------------------------
  const whiteCabGrad = ctx.createLinearGradient(0, -19, 0, 3);
  whiteCabGrad.addColorStop(0, '#ffffff');
  whiteCabGrad.addColorStop(0.35, '#f1f5f9');
  whiteCabGrad.addColorStop(0.7, '#e2e8f0');
  whiteCabGrad.addColorStop(1, '#cbd5e1');

  ctx.fillStyle = whiteCabGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-68, -19);
  ctx.lineTo(-46, -19);
  ctx.lineTo(-46, 3);
  ctx.lineTo(-54, 3);
  ctx.lineTo(-66, -1);
  ctx.lineTo(-70, -6);
  ctx.lineTo(-68, -19);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Overhanging Nose Brow & Forehead Armor
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-68, -19);
  ctx.lineTo(-46, -19);
  ctx.lineTo(-44, -16);
  ctx.lineTo(-65, -16);
  ctx.lineTo(-70, -15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tinted Faceted Cockpit Canopy Glass
  ctx.fillStyle = '#090d14';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-69, -15);
  ctx.lineTo(-62, -15);
  ctx.lineTo(-60, -8);
  ctx.lineTo(-67, -8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.moveTo(-67.5, -13.5);
  ctx.lineTo(-64, -13.5);
  ctx.lineTo(-65, -10);
  ctx.lineTo(-67, -10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0284c7';
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(-64.5, -13.5);
  ctx.lineTo(-63, -13.5);
  ctx.lineTo(-61.5, -9.5);
  ctx.lineTo(-63, -9.5);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-64.5, -14.5);
  ctx.lineTo(-63.5, -8.5);
  ctx.stroke();

  // White Chin Armor Module & FLIR Optical Sensor Ball
  ctx.fillStyle = '#e2e8f0';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-70, -6);
  ctx.lineTo(-66, -1);
  ctx.lineTo(-58, -1);
  ctx.lineTo(-58, 3);
  ctx.lineTo(-66, 3);
  ctx.lineTo(-71, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(-67, 1, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(-67, 1, 0.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-70, -1);
  ctx.lineTo(-72, -1);
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-58, -19);
  ctx.lineTo(-58, -1);
  ctx.moveTo(-52, -19);
  ctx.lineTo(-52, 3);
  ctx.stroke();

  // Diagonal Crimson Red Slash Stripe Across Roof/Shoulder
  const redStripeGrad = ctx.createLinearGradient(-47, -19, -38, -13);
  redStripeGrad.addColorStop(0, '#ef4444');
  redStripeGrad.addColorStop(0.4, '#dc2626');
  redStripeGrad.addColorStop(1, '#991b1b');

  ctx.fillStyle = redStripeGrad;
  ctx.strokeStyle = '#7f1d1d';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-47, -19);
  ctx.lineTo(-42, -19);
  ctx.lineTo(-38, -13);
  ctx.lineTo(-43, -13);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-47, -19);
  ctx.lineTo(-43, -13);
  ctx.moveTo(-42, -19);
  ctx.lineTo(-38, -13);
  ctx.stroke();

  // --------------------------------------------------------------------------
  // 8. Aft Superstructure, Command Deck & Remote Turret
  // --------------------------------------------------------------------------
  ctx.fillStyle = olivePlateGrad;
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(18, -19);
  ctx.lineTo(22, -22);
  ctx.lineTo(42, -22);
  ctx.lineTo(56, -16);
  ctx.lineTo(66, -10);
  ctx.lineTo(66, 9);
  ctx.lineTo(50, 9);
  ctx.lineTo(50, 12.5);
  ctx.lineTo(18, 12.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Command bridge observation slit
  ctx.fillStyle = '#090d14';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(25, -21);
  ctx.lineTo(38, -21);
  ctx.lineTo(40, -18);
  ctx.lineTo(24, -18);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0284c7';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(26, -20.5);
  ctx.lineTo(37, -20.5);
  ctx.lineTo(38.5, -18.5);
  ctx.lineTo(25.5, -18.5);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  ctx.strokeStyle = '#3c4a36';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(31, -21);
  ctx.lineTo(31, -18);
  ctx.stroke();

  // Dorsal Remote Turret
  ctx.fillStyle = '#242c23';
  ctx.strokeStyle = '#0f140f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(28, -22);
  ctx.lineTo(35, -22);
  ctx.lineTo(34, -25);
  ctx.lineTo(29, -25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#3c4a36';
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(31.5, -23.5, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 25, -24.8, 5, 2, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(25, -24.3);
  ctx.lineTo(19, -24.3);
  ctx.moveTo(25, -23.3);
  ctx.lineTo(19, -23.3);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(18, -24.7, 1.5, 0.8);
  ctx.fillRect(18, -23.7, 1.5, 0.8);

  // Outrigger Sponson Armor
  const sponsonGrad = ctx.createLinearGradient(20, 0, 62, 0);
  sponsonGrad.addColorStop(0, '#506249');
  sponsonGrad.addColorStop(0.5, '#3c4a36');
  sponsonGrad.addColorStop(1, '#2a3426');

  ctx.fillStyle = sponsonGrad;
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(20, -14);
  ctx.lineTo(56, -14);
  ctx.lineTo(62, -6);
  ctx.lineTo(62, 5);
  ctx.lineTo(50, 7);
  ctx.lineTo(20, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#2c3727';
  ctx.strokeStyle = '#111611';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 24, -11, 6, 5, 0.5);
  roundRect(ctx, 34, -11, 8, 5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#333f2e';
  ctx.strokeStyle = '#161c14';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 46, -10, 7, 12, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(27, -1.5, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(27, -1.5, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Lower Aft Contrasting Ballistic White Armor Housing
  ctx.fillStyle = whiteCabGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(50, 9);
  ctx.lineTo(66, 9);
  ctx.lineTo(66, 16);
  ctx.lineTo(54, 16);
  ctx.lineTo(50, 12.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(56, 9);
  ctx.lineTo(56, 16);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.8;
  ctx.setLineDash([0.8, 0.8]);
  ctx.beginPath();
  ctx.moveTo(64, 11);
  ctx.lineTo(64, 14);
  ctx.stroke();
  ctx.setLineDash([]);

  // Main Aft Vectoring Engine Block
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(66, -9);
  ctx.lineTo(70, -7);
  ctx.lineTo(70, 5);
  ctx.lineTo(66, 7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 69, -6.5, 2.5, 4.5, 0.5);
  roundRect(ctx, 69, 0.5, 2.5, 4.5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = 0.8;
  ctx.beginPath();
  ctx.ellipse(71.5, -4.2, 0.8, 1.8, 0, 0, Math.PI * 2);
  ctx.ellipse(71.5, 2.8, 0.8, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // --------------------------------------------------------------------------
  // 9. Massive Industrial Hydraulic Landing Gear & Footpads
  // STRICT SUBPATH ISOLATION TO PREVENT IMPLICIT CONNECTING LINES
  // --------------------------------------------------------------------------
  const chromeGrad = ctx.createLinearGradient(-33, 0, -31, 0);
  chromeGrad.addColorStop(0, '#94a3b8');
  chromeGrad.addColorStop(0.35, '#ffffff');
  chromeGrad.addColorStop(0.7, '#cbd5e1');
  chromeGrad.addColorStop(1, '#64748b');

  const aftChromeGrad = ctx.createLinearGradient(41, 0, 43, 0);
  aftChromeGrad.addColorStop(0, '#94a3b8');
  aftChromeGrad.addColorStop(0.35, '#ffffff');
  aftChromeGrad.addColorStop(0.7, '#cbd5e1');
  aftChromeGrad.addColorStop(1, '#64748b');

  const footpadGrad = ctx.createLinearGradient(0, footPadY - 1.5, 0, footPadY);
  footpadGrad.addColorStop(0, '#475569');
  footpadGrad.addColorStop(0.4, '#334155');
  footpadGrad.addColorStop(1, '#0f172a');

  // --- FORWARD GEAR ASSEMBLY ---
  ctx.fillStyle = '#2d3748';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -35, 6, 6, 4, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-32, 8, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Forward scissor torque link
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 8);
  ctx.lineTo(-36, 13.5 + gearSpringOffset * 0.5);
  ctx.lineTo(-32, footPadY - 2);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(-36, 13.5 + gearSpringOffset * 0.5, 1.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Forward chrome piston
  ctx.fillStyle = chromeGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(-33, 10, 2, Math.max(2, footPadY - 12));
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  roundRect(ctx, -33.5, 13, 3, 1.2, 0.3);
  ctx.fill();
  ctx.stroke();

  // Forward footpad (ISOLATED PATH)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(-32, footPadY - 2, 1.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = footpadGrad;
  ctx.strokeStyle = '#0b0e0a';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-37, footPadY - 1.5);
  ctx.lineTo(-27, footPadY - 1.5);
  ctx.lineTo(-26, footPadY);
  ctx.lineTo(-38, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#090d12';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, -38.5, footPadY, 13, 1.5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(-36, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(-32, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(-28, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // --- AFT GEAR ASSEMBLY ---
  ctx.fillStyle = '#2d3748';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 39, 8, 6, 4, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.arc(42, 10, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Aft chrome shock piston
  ctx.fillStyle = aftChromeGrad;
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(41, 11, 2, Math.max(2, footPadY - 13));
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.4;
  ctx.beginPath();
  roundRect(ctx, 40.5, 13, 3, 1.2, 0.3);
  roundRect(ctx, 40.5, 15.5, 3, 1.2, 0.3);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(39, 9);
  ctx.lineTo(41, footPadY - 2.5);
  ctx.stroke();

  // Aft footpad (ISOLATED PATH)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(42, footPadY - 2, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = footpadGrad;
  ctx.strokeStyle = '#0b0e0a';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(36, footPadY - 1.5);
  ctx.lineTo(48, footPadY - 1.5);
  ctx.lineTo(49, footPadY);
  ctx.lineTo(35, footPadY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#090d12';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  roundRect(ctx, 34.5, footPadY, 15, 1.5, 0.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(37, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(42, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.arc(47, footPadY + 0.7, 0.4, 0, Math.PI * 2);
  ctx.fill();

  // --------------------------------------------------------------------------
  // 10. Human Scale Reference Technician (Only drawn when landed)
  // --------------------------------------------------------------------------
  if (ship && ship.isLanded) {
    ctx.save();
    ctx.globalAlpha = 0.85;

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(-64, footPadY - 6.8, 0.9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(-64, footPadY - 6.8, 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(-65, footPadY - 5.9);
    ctx.lineTo(-63, footPadY - 5.9);
    ctx.lineTo(-62.8, footPadY - 2.8);
    ctx.lineTo(-65.2, footPadY - 2.8);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-64.5, footPadY - 2.8);
    ctx.lineTo(-64.5, footPadY);
    ctx.moveTo(-63.5, footPadY - 2.8);
    ctx.lineTo(-63.5, footPadY);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    roundRect(ctx, -62.7, footPadY - 5, 0.8, 1.2, 0.2);
    ctx.fill();

    ctx.restore();
  }
}


// Master dispatch function for ship hull rendering
export function renderShipHull(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  lp: ShipLocalPoints,
  time: number,
  ship: ShipState,
  world?: WorldMap
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
      drawTitan(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'viper':
      drawViper(ctx, config, gearSpringOffset);
      break;
    case 'aegis':
      drawAegis(ctx, config, gearSpringOffset);
      break;
    case 'nebula':
      drawNebula(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'vanguard':
      drawVanguard(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'goliath':
      drawGoliath(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'behemoth':
      drawBehemoth(ctx, config, gearSpringOffset, ship, time, world);
      break;
    case 'leviathan':
      drawLeviathan(ctx, config, gearSpringOffset, ship, time, world);
      break;
    case 'mammoth':
      drawMammoth(ctx, config, gearSpringOffset, ship, time);
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
      drawOrion(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'valkyrie':
      drawValkyrie(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'juggernaut':
      drawJuggernaut(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'nutcracker':
      drawNutcracker(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'nautilus':
      drawNautilus(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'eagle':
      drawEagle(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'vulcan':
      drawVulcan(ctx, config, gearSpringOffset, ship, time);
      break;
  }

  ctx.restore();
}
