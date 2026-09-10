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
  time?: number
) {
  const t = time !== undefined ? time : performance.now() / 1000;
  const footPadY = 28 + gearSpringOffset;

  // 1. Heavy Industrial Shock Struts & Suspension Rig
  // Upper Trunnion Mount Brackets (at x = ±28, y = 14)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -31, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 25, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();

  // Primary Heavy Oleo Hydraulic Struts
  // Outer Barrel (matte slate cylinder)
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-28, 14);
  ctx.lineTo(-31.5, 14 + (footPadY - 14) * 0.5);
  ctx.moveTo(28, 14);
  ctx.lineTo(31.5, 14 + (footPadY - 14) * 0.5);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(-28, 14);
  ctx.lineTo(-31.5, 14 + (footPadY - 14) * 0.5);
  ctx.moveTo(28, 14);
  ctx.lineTo(31.5, 14 + (footPadY - 14) * 0.5);
  ctx.stroke();

  // Inner Telescopic Chrome Piston Rod
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-31.5, 14 + (footPadY - 14) * 0.45);
  ctx.lineTo(-35, footPadY - 2);
  ctx.moveTo(31.5, 14 + (footPadY - 14) * 0.45);
  ctx.lineTo(35, footPadY - 2);
  ctx.stroke();

  // Secondary Diagonal A-Frame Scissor Link / Trailing Arm
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-18, 16);
  ctx.lineTo(-33, footPadY - 2.5);
  ctx.moveTo(18, 16);
  ctx.lineTo(33, footPadY - 2.5);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-18, 16);
  ctx.lineTo(-33, footPadY - 2.5);
  ctx.moveTo(18, 16);
  ctx.lineTo(33, footPadY - 2.5);
  ctx.stroke();

  // Nitrogen Accumulator Canisters (shock dampeners)
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -26.5, 18, 3.5, 7, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 23, 18, 3.5, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Knuckle Joint Assemblies (ISOLATED subpaths)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-35, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(35, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Heavy Industrial Cast Rocker Footpads (ISOLATED per user rule)
  // Port Footpad
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, -42, footPadY - 4.5, 14, 4.5, 1.5);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  // Diagonal safety hazard stripes on port footpad
  ctx.clip();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let x = -44; x < -26; x += 4.5) {
    ctx.moveTo(x, footPadY);
    ctx.lineTo(x + 3.5, footPadY - 5.5);
  }
  ctx.stroke();
  ctx.restore();

  // Ground traction cleats (port)
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(-40, footPadY, 2.2, 1.6);
  ctx.rect(-36, footPadY, 2.2, 1.6);
  ctx.rect(-32, footPadY, 2.2, 1.6);
  ctx.fill();

  // Starboard Footpad (ISOLATED)
  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 28, footPadY - 4.5, 14, 4.5, 1.5);
  ctx.fillStyle = '#0f172a';
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.stroke();
  // Diagonal safety hazard stripes on starboard footpad
  ctx.clip();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let x = 26; x < 44; x += 4.5) {
    ctx.moveTo(x, footPadY);
    ctx.lineTo(x + 3.5, footPadY - 5.5);
  }
  ctx.stroke();
  ctx.restore();

  // Ground traction cleats (starboard)
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(30, footPadY, 2.2, 1.6);
  ctx.rect(34, footPadY, 2.2, 1.6);
  ctx.rect(38, footPadY, 2.2, 1.6);
  ctx.fill();

  // 2. Heavy Dual Gimbaled Rocket Thrusters (Rear Engine Deck)
  // Left Engine Assembly
  ctx.save();
  // Gimbal Pivot Ball & Hydraulic Actuator
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-19, 18, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-23, 17);
  ctx.lineTo(-21, 22);
  ctx.stroke();

  // Engine Bell Conical Nozzle
  const leftNozzleGrad = ctx.createLinearGradient(-26, 18, -12, 27);
  leftNozzleGrad.addColorStop(0, '#475569');
  leftNozzleGrad.addColorStop(0.4, '#1e293b');
  leftNozzleGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = leftNozzleGrad;
  ctx.beginPath();
  ctx.moveTo(-25, 18);
  ctx.lineTo(-13, 18);
  ctx.lineTo(-10, 27);
  ctx.lineTo(-28, 27);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Cooling jacket horizontal ribs
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-24, 21);
  ctx.lineTo(-14, 21);
  ctx.moveTo(-26, 24);
  ctx.lineTo(-12, 24);
  ctx.stroke();

  // Flared Machined Copper Expansion Lip
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-28.5, 27);
  ctx.lineTo(-9.5, 27);
  ctx.stroke();

  // Internal Combustion Chamber Throat Breathing Glow
  const leftGlowAlpha = 0.45 + 0.25 * Math.sin(t * 4);
  const leftThroatGrad = ctx.createRadialGradient(-19, 23, 1, -19, 25, 6.5);
  leftThroatGrad.addColorStop(0, `rgba(254, 240, 138, ${leftGlowAlpha})`);
  leftThroatGrad.addColorStop(0.5, `rgba(245, 158, 11, ${leftGlowAlpha * 0.7})`);
  leftThroatGrad.addColorStop(1, 'rgba(180, 83, 9, 0)');
  ctx.fillStyle = leftThroatGrad;
  ctx.beginPath();
  ctx.ellipse(-19, 25, 6, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Right Engine Assembly
  ctx.save();
  // Gimbal Pivot Ball & Hydraulic Actuator
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(19, 18, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(23, 17);
  ctx.lineTo(21, 22);
  ctx.stroke();

  // Engine Bell Conical Nozzle
  const rightNozzleGrad = ctx.createLinearGradient(12, 18, 26, 27);
  rightNozzleGrad.addColorStop(0, '#475569');
  rightNozzleGrad.addColorStop(0.4, '#1e293b');
  rightNozzleGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = rightNozzleGrad;
  ctx.beginPath();
  ctx.moveTo(13, 18);
  ctx.lineTo(25, 18);
  ctx.lineTo(28, 27);
  ctx.lineTo(10, 27);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Cooling jacket horizontal ribs
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(14, 21);
  ctx.lineTo(24, 21);
  ctx.moveTo(12, 24);
  ctx.lineTo(26, 24);
  ctx.stroke();

  // Flared Machined Copper Expansion Lip
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(9.5, 27);
  ctx.lineTo(28.5, 27);
  ctx.stroke();

  // Internal Combustion Chamber Throat Breathing Glow
  const rightGlowAlpha = 0.45 + 0.25 * Math.sin(t * 4 + 0.5);
  const rightThroatGrad = ctx.createRadialGradient(19, 23, 1, 19, 25, 6.5);
  rightThroatGrad.addColorStop(0, `rgba(254, 240, 138, ${rightGlowAlpha})`);
  rightThroatGrad.addColorStop(0.5, `rgba(245, 158, 11, ${rightGlowAlpha * 0.7})`);
  rightThroatGrad.addColorStop(1, 'rgba(180, 83, 9, 0)');
  ctx.fillStyle = rightThroatGrad;
  ctx.beginPath();
  ctx.ellipse(19, 25, 6, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Main Armored Heavy Hull
  // Base polygon: (-34, 2) -> (-24, -22) -> (24, -22) -> (34, 2) -> (28, 18) -> (-28, 18)
  const hullGrad = ctx.createLinearGradient(-15, -22, 15, 18);
  hullGrad.addColorStop(0.0, '#ffffff');
  hullGrad.addColorStop(0.18, '#f1f5f9');
  hullGrad.addColorStop(0.55, '#cbd5e1');
  hullGrad.addColorStop(0.85, '#94a3b8');
  hullGrad.addColorStop(1.0, '#475569');

  ctx.fillStyle = hullGrad;
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
  ctx.lineWidth = 2.4;
  ctx.lineJoin = 'miter';
  ctx.stroke();

  // Heavy Bulkhead Ribs & Plating Seams
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  // Sponson Chamfer Lines
  ctx.moveTo(-24, -22);
  ctx.lineTo(-30, 2);
  ctx.lineTo(-25, 18);
  ctx.moveTo(24, -22);
  ctx.lineTo(30, 2);
  ctx.lineTo(25, 18);
  // Bridge Coaming Horizontal Line
  ctx.moveTo(-22, -9);
  ctx.lineTo(22, -9);
  // Middeck Horizontal Line
  ctx.moveTo(-26, 7);
  ctx.lineTo(-17, 7);
  ctx.moveTo(17, 7);
  ctx.lineTo(26, 7);
  ctx.stroke();

  // Structural Titanium Rivets along armor seams
  ctx.fillStyle = '#64748b';
  const rivetXs = [-22, -16, -10, 0, 10, 16, 22];
  rivetXs.forEach((rx) => {
    ctx.beginPath();
    ctx.arc(rx, -20.5, 0.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(rx, -9.5, 0.9, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top Deck Rigging & Avionics Sensor Mast (at y = -22)
  // Heavy Lifting Lugs / Hoist Shackles
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(-20, -22, 2.5, Math.PI, 0);
  ctx.arc(20, -22, 2.5, Math.PI, 0);
  ctx.stroke();

  // Central Avionics / Communications Mast
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(0, -30);
  ctx.stroke();
  // Cross-dipole radar bars
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-5, -26);
  ctx.lineTo(5, -26);
  ctx.moveTo(-3, -28.5);
  ctx.lineTo(3, -28.5);
  ctx.stroke();

  // Mast Anti-Collision Warning Strobe (Pulsing Amber)
  const mastBeaconPulse = 0.5 + 0.5 * Math.sin(t * 6);
  ctx.fillStyle = `rgba(245, 158, 11, ${0.4 * mastBeaconPulse})`;
  ctx.beginPath();
  ctx.arc(0, -30, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(0, -30, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // 4. Dual Heavy Bridge Cockpit Viewports (Panoramic Command Deck)
  // Left Bridge Viewport
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  roundRect(ctx, -18.5, -16.5, 14, 9, 2.2);
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  const leftVisorGrad = ctx.createRadialGradient(-13, -13, 1, -12, -12, 7.5);
  leftVisorGrad.addColorStop(0, '#fef08a');
  leftVisorGrad.addColorStop(0.3, '#f59e0b');
  leftVisorGrad.addColorStop(0.7, '#ea580c');
  leftVisorGrad.addColorStop(1, '#7c2d12');
  ctx.fillStyle = leftVisorGrad;
  ctx.beginPath();
  roundRect(ctx, -17.5, -15.5, 12, 7, 1.6);
  ctx.fill();

  // Left Bridge HUD / CRT Flight Display Reticle
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-15.5, -12);
  ctx.lineTo(-7.5, -12);
  ctx.moveTo(-11.5, -14.5);
  ctx.lineTo(-11.5, -9.5);
  ctx.stroke();

  // Left Bridge Glare / Specular Highlight
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.ellipse(-14, -14, 3.2, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Right Bridge Viewport
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  roundRect(ctx, 4.5, -16.5, 14, 9, 2.2);
  ctx.fill();
  ctx.strokeStyle = '#b45309';
  ctx.lineWidth = 1.4;
  ctx.stroke();

  const rightVisorGrad = ctx.createRadialGradient(10, -13, 1, 11, -12, 7.5);
  rightVisorGrad.addColorStop(0, '#fef08a');
  rightVisorGrad.addColorStop(0.3, '#f59e0b');
  rightVisorGrad.addColorStop(0.7, '#ea580c');
  rightVisorGrad.addColorStop(1, '#7c2d12');
  ctx.fillStyle = rightVisorGrad;
  ctx.beginPath();
  roundRect(ctx, 5.5, -15.5, 12, 7, 1.6);
  ctx.fill();

  // Right Bridge HUD / CRT Flight Display Reticle
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(7.5, -12);
  ctx.lineTo(15.5, -12);
  ctx.moveTo(11.5, -14.5);
  ctx.lineTo(11.5, -9.5);
  ctx.stroke();

  // Right Bridge Glare / Specular Highlight
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  ctx.ellipse(9, -14, 3.2, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Overhead High-Output Xenon Brow Lamps
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.8;
  [-15, -9, 9, 15].forEach((lx) => {
    ctx.beginPath();
    roundRect(ctx, lx - 1.5, -18.5, 3, 1.8, 0.6);
    ctx.fill();
    ctx.stroke();
  });

  // Stenciled Monospace Designation: "HC-9000"
  ctx.save();
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 3.2px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HC-9000', 0, -12);
  ctx.restore();

  // 5. Central Heavy Spherical Propellant Tanks & Cryo Plumbing
  // Left Tank (-10, 2) r=7.5
  const leftTankGrad = ctx.createRadialGradient(-12, 0, 1.2, -10, 2, 8.0);
  leftTankGrad.addColorStop(0, '#ffffff');
  leftTankGrad.addColorStop(0.2, '#fef08a');
  leftTankGrad.addColorStop(0.45, '#f59e0b');
  leftTankGrad.addColorStop(0.75, '#b45309');
  leftTankGrad.addColorStop(1, '#451a03');

  ctx.fillStyle = leftTankGrad;
  ctx.beginPath();
  ctx.arc(-10, 2, 7.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Right Tank (10, 2) r=7.5
  const rightTankGrad = ctx.createRadialGradient(8, 0, 1.2, 10, 2, 8.0);
  rightTankGrad.addColorStop(0, '#ffffff');
  rightTankGrad.addColorStop(0.2, '#fef08a');
  rightTankGrad.addColorStop(0.45, '#f59e0b');
  rightTankGrad.addColorStop(0.75, '#b45309');
  rightTankGrad.addColorStop(1, '#451a03');

  ctx.fillStyle = rightTankGrad;
  ctx.beginPath();
  ctx.arc(10, 2, 7.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Heavy Structural Retention Girth Straps with Bolt Tabs
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-17.5, 2);
  ctx.lineTo(-2.5, 2);
  ctx.moveTo(2.5, 2);
  ctx.lineTo(17.5, 2);
  ctx.stroke();

  // Upper/Lower Strap Tensioners
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-16, -1.5);
  ctx.lineTo(-4, -1.5);
  ctx.moveTo(-16, 5.5);
  ctx.lineTo(-4, 5.5);
  ctx.moveTo(4, -1.5);
  ctx.lineTo(16, -1.5);
  ctx.moveTo(4, 5.5);
  ctx.lineTo(16, 5.5);
  ctx.stroke();

  // Central Pressure Gauge Dial
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(0, 2, 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  // Gauge Needle
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, 2);
  ctx.lineTo(1.2, 0.8);
  ctx.stroke();

  // Stainless Cryo Feed Lines Looping to Engine Manifolds
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  // Left feed line
  ctx.moveTo(-10, 9);
  ctx.quadraticCurveTo(-14, 14, -19, 18);
  // Right feed line
  ctx.moveTo(10, 9);
  ctx.quadraticCurveTo(14, 14, 19, 18);
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-10, 9);
  ctx.quadraticCurveTo(-14, 14, -19, 18);
  ctx.moveTo(10, 9);
  ctx.quadraticCurveTo(14, 14, 19, 18);
  ctx.stroke();

  // 6. Industrial Hazard Warning Belt & Vehicle Cargo Winch
  // Lower Engine Deck Band: y = 10 to 18, x = -27 to 27
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-26, 10);
  ctx.lineTo(26, 10);
  ctx.lineTo(28, 18);
  ctx.lineTo(-28, 18);
  ctx.closePath();
  ctx.clip();

  // High-contrast alternating chevron plate
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-30, 9, 60, 10);

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  for (let hx = -32; hx <= 32; hx += 5.5) {
    ctx.moveTo(hx, 10);
    ctx.lineTo(hx + 4.5, 18);
  }
  ctx.stroke();
  ctx.restore();

  // Heavy Vehicle Magnetic Tow Clamp / Cargo Winch Collar
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -4.5, 14, 9, 4.5, 1.5);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(0, 16.5, 1.8, 0, Math.PI * 2);
  ctx.stroke();

  // 7. Sponson Attitude Thrusters & Aviation Navigation Lights
  // Port / Starboard Sponson RCS Nozzle Clusters
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  roundRect(ctx, -34.5, -2, 2.5, 6, 0.8);
  roundRect(ctx, 32, -2, 2.5, 6, 0.8);
  ctx.fill();
  ctx.stroke();

  // Wingtip Navigation Strobes (Port Red, Starboard Green)
  const isStrobeOn = Math.floor((t * 2.5) % 1) < 0.2 || (Math.floor((t * 2.5) % 1) > 0.3 && Math.floor((t * 2.5) % 1) < 0.5);
  // Port Navigation Light (Red)
  ctx.fillStyle = isStrobeOn ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(-33.5, 2, 1.5, 0, Math.PI * 2);
  ctx.fill();
  if (isStrobeOn) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.beginPath();
    ctx.arc(-33.5, 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Starboard Navigation Light (Green)
  ctx.fillStyle = isStrobeOn ? '#22c55e' : '#14532d';
  ctx.beginPath();
  ctx.arc(33.5, 2, 1.5, 0, Math.PI * 2);
  ctx.fill();
  if (isStrobeOn) {
    ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
    ctx.beginPath();
    ctx.arc(33.5, 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }
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
  ship: ShipState,
  time?: number
) {
  const t = time !== undefined ? time : performance.now() / 1000;
  const footPadY = 32 + gearSpringOffset;

  // Bay door / ramp working status:
  // Active during opening, fully open while vehicles load/unload, and during closing
  const rampProgress = ship?.rampProgress !== undefined ? ship.rampProgress : 0;
  const rampState = ship?.rampState || 'closed';
  const isBayWorking = rampProgress > 0.01 || rampState === 'opening' || rampState === 'open' || rampState === 'closing';

  // Helper: Draw spinning yellow/orange industrial warning beacon
  const drawHazardBeacon = (bx: number, by: number, phaseOffset: number = 0) => {
    // Chrome / Dark Gunmetal Mounting Bracket Collar
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    roundRect(ctx, bx - 3.2, by + 1.2, 6.4, 2.4, 0.8);
    ctx.fill();
    ctx.stroke();

    if (isBayWorking) {
      // ACTIVE SPINNING BEACON
      const spinAngle = t * 13.5 + phaseOffset;
      const cosAngle = Math.cos(spinAngle);
      const sinAngle = Math.sin(spinAngle);

      // 1. Sweeping Directional Amber Light Beam Cone
      ctx.save();
      const beamLength = 36;
      const beamSpread = 0.58; // radians
      const coneGrad = ctx.createRadialGradient(bx, by, 1, bx, by, beamLength);
      coneGrad.addColorStop(0, 'rgba(254, 240, 138, 0.75)');
      coneGrad.addColorStop(0.25, 'rgba(245, 158, 11, 0.42)');
      coneGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.12)');
      coneGrad.addColorStop(1, 'rgba(180, 83, 9, 0)');

      ctx.fillStyle = coneGrad;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.arc(bx, by, beamLength, spinAngle - beamSpread, spinAngle + beamSpread);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 2. Ambient warning strobe reflection on surrounding hull
      const ambientPulse = 0.4 + 0.3 * Math.sin(spinAngle);
      const ambientGrad = ctx.createRadialGradient(bx, by, 1, bx, by, 18);
      ambientGrad.addColorStop(0, `rgba(254, 240, 138, ${ambientPulse * 0.8})`);
      ambientGrad.addColorStop(0.45, `rgba(245, 158, 11, ${ambientPulse * 0.45})`);
      ambientGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(bx, by, 18, 0, Math.PI * 2);
      ctx.fill();

      // 3. Polycarbonate Amber Dome Housing
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, bx - 2.8, by - 3.6, 5.6, 5.0, 2.0);
      const domeGrad = ctx.createLinearGradient(bx - 2.8, by - 3.6, bx + 2.8, by + 1.4);
      domeGrad.addColorStop(0, '#fef08a');
      domeGrad.addColorStop(0.25, '#f59e0b');
      domeGrad.addColorStop(0.75, '#d97706');
      domeGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = domeGrad;
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // 4. Internal Spinning Parabolic Reflector Facet
      const reflectorX = bx + sinAngle * 1.6;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(reflectorX, by - 1.0, 1.2, 2.0, 0, 0, Math.PI * 2);
      ctx.fill();

      // 5. Direct Camera-Facing Optical Lens Flare & Flash
      if (cosAngle > 0.35) {
        const flashStrength = (cosAngle - 0.35) / 0.65;
        // Central brilliant hotspot
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * flashStrength})`;
        ctx.beginPath();
        ctx.arc(bx, by - 1.0, 2.8 * flashStrength, 0, Math.PI * 2);
        ctx.fill();

        // Optical flare cross-spikes
        ctx.strokeStyle = `rgba(254, 240, 138, ${0.9 * flashStrength})`;
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(bx - 10 * flashStrength, by - 1.0);
        ctx.lineTo(bx + 10 * flashStrength, by - 1.0);
        ctx.moveTo(bx, by - 1.0 - 6 * flashStrength);
        ctx.lineTo(bx, by - 1.0 + 6 * flashStrength);
        ctx.stroke();
      }
      ctx.restore();
    } else {
      // INACTIVE / IDLE BEACON (Bay door closed & not loading/unloading)
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, bx - 2.8, by - 3.6, 5.6, 5.0, 2.0);
      const idleDomeGrad = ctx.createLinearGradient(bx - 2.8, by - 3.6, bx + 2.8, by + 1.4);
      idleDomeGrad.addColorStop(0, '#92400e');
      idleDomeGrad.addColorStop(0.5, '#78350f');
      idleDomeGrad.addColorStop(1, '#451a03');
      ctx.fillStyle = idleDomeGrad;
      ctx.fill();
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Dark unpowered bulb filament
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(bx, by - 1.0, 1.0, 0, Math.PI * 2);
      ctx.fill();

      // Specular glass glint
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.ellipse(bx - 0.9, by - 2.2, 0.9, 0.5, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  // =====================================================================
  // 1. Heavy Outrigger Landing Gear & Rocker Footpads (Isolated Paths)
  // =====================================================================
  // Upper Trunnion Mount Brackets
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -35, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 29, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();

  // Primary Heavy Oleo Hydraulic Struts - Outer Barrels
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(32, 14);
  ctx.lineTo(35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(32, 14);
  ctx.lineTo(35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();

  // Inner Telescopic Chrome Piston Rods
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-35.5, 14 + (footPadY - 14) * 0.50);
  ctx.lineTo(-38, footPadY - 2.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(35.5, 14 + (footPadY - 14) * 0.50);
  ctx.lineTo(38, footPadY - 2.5);
  ctx.stroke();

  // Secondary Diagonal A-Frame Scissor Stabilizers
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-37, footPadY - 3.0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 18);
  ctx.lineTo(37, footPadY - 3.0);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-37, footPadY - 3.0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 18);
  ctx.lineTo(37, footPadY - 3.0);
  ctx.stroke();

  // Nitrogen Accumulator Canisters
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -31, 20, 3.4, 7, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 27.6, 20, 3.4, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Knuckle Joint Assemblies (strictly isolated per user rule)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-38, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(38, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Port Cast Manganese-Steel Rocker Footpad (strictly isolated per user rule)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -45.5, footPadY - 2.5, 15, 4.8, 1.5);
  ctx.fill();
  ctx.stroke();

  // Port Footpad Hazard Stripes
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-44, footPadY + 2.0);
  ctx.lineTo(-41, footPadY - 2.5);
  ctx.moveTo(-39.5, footPadY + 2.0);
  ctx.lineTo(-36.5, footPadY - 2.5);
  ctx.moveTo(-35, footPadY + 2.0);
  ctx.lineTo(-32, footPadY - 2.5);
  ctx.stroke();

  // Port Ground Traction Cleats
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(-44, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(-39.5, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(-35, footPadY + 2.3, 2.2, 1.6);
  ctx.fill();

  // Starboard Cast Manganese-Steel Rocker Footpad (strictly isolated per user rule)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 30.5, footPadY - 2.5, 15, 4.8, 1.5);
  ctx.fill();
  ctx.stroke();

  // Starboard Footpad Hazard Stripes
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(32, footPadY + 2.0);
  ctx.lineTo(35, footPadY - 2.5);
  ctx.moveTo(36.5, footPadY + 2.0);
  ctx.lineTo(39.5, footPadY - 2.5);
  ctx.moveTo(41, footPadY + 2.0);
  ctx.lineTo(44, footPadY - 2.5);
  ctx.stroke();

  // Starboard Ground Traction Cleats
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(32, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(36.5, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(41, footPadY + 2.3, 2.2, 1.6);
  ctx.fill();

  // =====================================================================
  // 2. Starboard Right Flank Propulsion Nacelle (x: +16 to +38, y: -8 to 18)
  // =====================================================================
  // Armored Structural Nacelle Housing
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, 16, -8, 22, 26, 3);
  ctx.fill();
  ctx.stroke();

  // Titanium Armored Insert Panel
  ctx.fillStyle = createTitaniumPlate(ctx, -6, 16);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 19, -5, 16, 20, 1.5);
  ctx.fill();
  ctx.stroke();

  // Thermal Radiator Louvers / Heat Dissipation Vents
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(21, -1);
  ctx.lineTo(33, -1);
  ctx.moveTo(21, 4);
  ctx.lineTo(33, 4);
  ctx.moveTo(21, 9);
  ctx.lineTo(33, 9);
  ctx.stroke();

  // High-Pressure Helium Pressurant Spherical Tank in Dorsal Saddle
  const tankGrad = ctx.createRadialGradient(28, -7, 0.5, 29, -6, 4.5);
  tankGrad.addColorStop(0, '#ffffff');
  tankGrad.addColorStop(0.3, '#f59e0b');
  tankGrad.addColorStop(0.75, '#b45309');
  tankGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = tankGrad;
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(29, -5, 4.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Tank Retention Girth Strap
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(25, -5);
  ctx.lineTo(33, -5);
  ctx.stroke();

  // Sponson 4-Way RCS Cluster (Starboard Shoulder)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 35, -4, 4, 8, 1);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.rect(38.5, -2, 1.5, 1.5);
  ctx.rect(38.5, 2, 1.5, 1.5);
  ctx.rect(36, -5.5, 1.5, 1.5);
  ctx.rect(36, 4, 1.5, 1.5);
  ctx.fill();

  // Starboard Green Navigation Strobe
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(37, -7, 1.4, 0, Math.PI * 2);
  ctx.fill();
  if (Math.sin(t * 5.5) > 0.5) {
    ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
    ctx.beginPath();
    ctx.arc(37, -7, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // =====================================================================
  // 3. Overhead Heavy Structural Arch / Cross-Gantry Truss (x: -16 to +16)
  // =====================================================================
  // Gantry Base Beam Housing
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -16, -14, 32, 6.5, 1.5);
  ctx.fill();
  ctx.stroke();

  // Open Structural Web / Triangle Lattice Cutouts
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-14, -13.5);
  ctx.lineTo(-10, -8.5);
  ctx.lineTo(-6, -13.5);
  ctx.lineTo(-2, -8.5);
  ctx.lineTo(2, -13.5);
  ctx.lineTo(6, -8.5);
  ctx.lineTo(10, -13.5);
  ctx.lineTo(14, -8.5);
  ctx.stroke();

  // High-Visibility Hazard Chevron Stripe Band along Bottom of Gantry Beam
  ctx.save();
  ctx.beginPath();
  ctx.rect(-15.5, -9.5, 31, 2.0);
  ctx.clip();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  for (let hx = -16; hx <= 16; hx += 3.5) {
    ctx.moveTo(hx, -7.5);
    ctx.lineTo(hx + 2.5, -9.5);
  }
  ctx.stroke();
  ctx.restore();

  // Upper Conduit Line along Gantry Arch
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-15, -13.5);
  ctx.lineTo(15, -13.5);
  ctx.stroke();

  // Center Crane Trolley / Winch Guide Collar
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -3.5, -8.8, 7, 3.2, 1);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(0, -7.2, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // =====================================================================
  // 4. Hollow Center Vehicle Hold Bay (x: -16 to +16, y: -8 to +16)
  // =====================================================================
  const gHoldX = -16;
  const gHoldY = -8;
  const gHoldW = 32;
  const gHoldH = 24;

  // Interior Hold Cavity Background
  const holdGrad = ctx.createLinearGradient(0, gHoldY, 0, gHoldY + gHoldH);
  holdGrad.addColorStop(0, '#030712');
  holdGrad.addColorStop(0.65, '#090d16');
  holdGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = holdGrad;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, gHoldX, gHoldY, gHoldW, gHoldH, 1);
  ctx.fill();
  ctx.stroke();

  // Interior Bulkhead Ribs & Stencil Markings
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-6, gHoldY);
  ctx.lineTo(-6, gHoldY + gHoldH);
  ctx.moveTo(6, gHoldY);
  ctx.lineTo(6, gHoldY + gHoldH);
  ctx.stroke();

  // Stenciled Hold Designation: BAY 01
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 3.2px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BAY 01', 0, gHoldY + 4);

  // Ceiling Halogen Deck Floodlights
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.rect(-10, gHoldY, 3.5, 1.2);
  ctx.rect(-1.75, gHoldY, 3.5, 1.2);
  ctx.rect(6.5, gHoldY, 3.5, 1.2);
  ctx.fill();

  // Translucent Downward Cones of Light from Hold Ceiling
  ctx.fillStyle = 'rgba(254, 240, 138, 0.08)';
  ctx.beginPath();
  ctx.moveTo(-10, gHoldY + 1.2);
  ctx.lineTo(-14, gHoldY + gHoldH);
  ctx.lineTo(-2, gHoldY + gHoldH);
  ctx.lineTo(-6.5, gHoldY + 1.2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(6.5, gHoldY + 1.2);
  ctx.lineTo(2, gHoldY + gHoldH);
  ctx.lineTo(14, gHoldY + gHoldH);
  ctx.lineTo(10, gHoldY + 1.2);
  ctx.fill();

  // Floor Deck Guide Roller Tracks & Tie-Down Cleats
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.rect(-15, gHoldY + gHoldH - 2.5, 30, 2.5);
  ctx.fill();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-14, gHoldY + gHoldH - 1.2);
  ctx.lineTo(14, gHoldY + gHoldH - 1.2);
  ctx.stroke();

  // Render Onboard Heavy Planetary Rover if loaded
  if ((ship?.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(0, 9);

    // Rover Chassis Body
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    roundRect(ctx, -12, -4.5, 24, 7.5, 1.5);
    ctx.fill();
    ctx.stroke();

    // Rover Pressurized Crew Cockpit
    const roverVisorGrad = ctx.createLinearGradient(-10, -4, 0, -4);
    roverVisorGrad.addColorStop(0, '#bae6fd');
    roverVisorGrad.addColorStop(0.5, '#0ea5e9');
    roverVisorGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = roverVisorGrad;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    roundRect(ctx, -10, -6.8, 8, 3.2, 1);
    ctx.fill();
    ctx.stroke();

    // Specular Glint on Rover Cockpit
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-8, -5.5, 2.2, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rover Rear Cargo Container / Power Module
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    roundRect(ctx, 0, -6.5, 10, 3.5, 1);
    ctx.fill();
    ctx.stroke();

    // Rover Rooftop Dish Antenna & Flasher
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(7, -6.5);
    ctx.lineTo(7, -9.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(7, -10, 1.8, Math.PI * 0.8, Math.PI * 1.8);
    ctx.stroke();

    // Flashing Amber Beacon on Rover Roof
    ctx.fillStyle = Math.sin(t * 8) > 0 ? '#f59e0b' : '#78350f';
    ctx.beginPath();
    ctx.arc(2, -7.5, 1.0, 0, Math.PI * 2);
    ctx.fill();

    // 6 Rugged All-Terrain Wheels with Deep Tread
    const wheelPositions = [-9.5, -4.5, 0.5, 5.5, 9.5];
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.9;
    for (const wx of wheelPositions) {
      ctx.beginPath();
      ctx.arc(wx, 3.2, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Metallic Hub
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(wx, 3.2, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
    }

    // Magnetic Deck Tie-Down Clamps Locking the Rover Down
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-11, 2);
    ctx.lineTo(-13, 5);
    ctx.moveTo(11, 2);
    ctx.lineTo(13, 5);
    ctx.stroke();

    ctx.restore();
  }

  // =====================================================================
  // 5. Left Port Side Door / Hydraulic Loading Ramp
  // =====================================================================
  const rampHingeX = gHoldX; // -16
  const rampHingeY = gHoldY + gHoldH - 2; // 14

  if (rampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * rampProgress;
    const rampEndX = rampHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = rampHingeY + Math.sin(currentAngle) * rampLength;

    // Heavy Hydraulic Lift Actuator Cylinder
    const cylAnchorX = -22;
    const cylAnchorY = 6;
    const midRampX = rampHingeX + (rampEndX - rampHingeX) * 0.45;
    const midRampY = rampHingeY + (rampEndY - rampHingeY) * 0.45;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(cylAnchorX, cylAnchorY);
    ctx.lineTo(midRampX, midRampY);
    ctx.stroke();

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cylAnchorX + (midRampX - cylAnchorX) * 0.4, cylAnchorY + (midRampY - cylAnchorY) * 0.4);
    ctx.lineTo(midRampX, midRampY);
    ctx.stroke();

    // Primary Heavy Loading Ramp Girder Bed
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 5.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Non-Slip Diamond Tread-Plate Deck Surface
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Hazard Safety Warning Curb Striping
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(rampHingeX, rampHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Articulated Folding Safety Handrail Stanchions
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.0;
    const normX = -(rampEndY - rampHingeY) / rampLength;
    const normY = (rampEndX - rampHingeX) / rampLength;
    const railHeight = 3.5;

    const r1X = rampHingeX + (rampEndX - rampHingeX) * 0.3;
    const r1Y = rampHingeY + (rampEndY - rampHingeY) * 0.3;
    const r2X = rampHingeX + (rampEndX - rampHingeX) * 0.7;
    const r2Y = rampHingeY + (rampEndY - rampHingeY) * 0.7;

    ctx.beginPath();
    ctx.moveTo(r1X, r1Y);
    ctx.lineTo(r1X + normX * railHeight, r1Y + normY * railHeight);
    ctx.moveTo(r2X, r2Y);
    ctx.lineTo(r2X + normX * railHeight, r2Y + normY * railHeight);
    ctx.moveTo(rampHingeX + normX * railHeight, rampHingeY + normY * railHeight);
    ctx.lineTo(rampEndX + normX * railHeight, rampEndY + normY * railHeight);
    ctx.stroke();

    // Ground Contact Rocker Toe Pad with Rubber Damper
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  } else {
    // CLOSED & SEALED BAY DOOR
    // Outer Door Panel with Heavy Vertical Locking Lugs
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.lineTo(-26, 22);
    ctx.stroke();

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.lineTo(-26, 22);
    ctx.stroke();

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(-16, 14);
    ctx.lineTo(-26, 22);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pressure Door Hinge Boss & Locking Pins
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(-16, 14, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-26, 22, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Status Indicator LED (Solid Green: Locked & Pressure Sealed)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(-16, 10, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // =====================================================================
  // 6. Elevated Left Side Controller Tower (Command Bridge & ATC)
  // (x: -36 to -16, y: -34 to +16)
  // =====================================================================
  // Primary Structural Tower Polygon
  const towerGrad = ctx.createLinearGradient(-36, -34, -16, 16);
  towerGrad.addColorStop(0, '#1e293b');
  towerGrad.addColorStop(0.5, '#0f172a');
  towerGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = towerGrad;
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

  // Heavy Armored Outer Hull Plating
  ctx.fillStyle = createTitaniumPlate(ctx, -18, 12);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -34, -18, 16, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Tower Armor Seam Rivets
  ctx.fillStyle = '#64748b';
  for (let ry = -16; ry <= 10; ry += 6) {
    ctx.beginPath();
    ctx.arc(-32.5, ry, 0.7, 0, Math.PI * 2);
    ctx.arc(-19.5, ry, 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Monospace Tower Stencil Markings
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 2.8px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CT-950', -26, 4);

  // Panoramic Flight Control Bridge Observation Visor (Cyan Deep Glass)
  const visorGrad = ctx.createRadialGradient(-26, -25, 1, -25.5, -25, 9);
  visorGrad.addColorStop(0, '#f0fdf4');
  visorGrad.addColorStop(0.2, '#bae6fd');
  visorGrad.addColorStop(0.55, '#0ea5e9');
  visorGrad.addColorStop(0.85, '#0284c7');
  visorGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = visorGrad;
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

  // Internal CRT Flight Instruments & Radar Reticle in Bridge
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-29, -25);
  ctx.lineTo(-21, -25);
  ctx.moveTo(-25, -28);
  ctx.lineTo(-25, -22);
  ctx.stroke();

  // Anti-Glare Specular Glint on Bridge Visor
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(-26, -26, 3.8, 1.6, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Xenon Brow Driving / Taxi Searchlights
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -31, -32.5, 3.5, 1.8, 0.6);
  roundRect(ctx, -23, -32.5, 3.5, 1.8, 0.6);
  ctx.fill();
  ctx.stroke();

  // Antenna Mast & Telemetry Radar on Left Tower
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-28, -34);
  ctx.lineTo(-28, -43);
  ctx.stroke();

  // Telemetry Crossbars & Dipoles
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-32, -39);
  ctx.lineTo(-24, -39);
  ctx.moveTo(-30, -41.5);
  ctx.lineTo(-26, -41.5);
  ctx.stroke();

  // Radar Dish Curve
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-33, -42);
  ctx.quadraticCurveTo(-28, -39, -23, -42);
  ctx.stroke();

  // Red Anti-Collision Warning Strobe at Tower Mast Tip
  const mastStrobe = Math.sin(t * 6.0) > 0.4;
  ctx.fillStyle = mastStrobe ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(-28, -43.5, 1.6, 0, Math.PI * 2);
  ctx.fill();
  if (mastStrobe) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(-28, -43.5, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Port Red Navigation Marker
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(-35, -25, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // =====================================================================
  // 7. SPINNING YELLOW/ORANGE HAZARD WARNING LIGHTS
  // (Only function when the bay door is working to load or unload rovers)
  // =====================================================================
  // Port Beacon (Above Ramp Portal Frame Entrance): x = -16, y = -14.5
  drawHazardBeacon(-16, -14.5, 0);

  // Starboard Beacon (Above Vehicle Bay Arch Shoulder): x = 16, y = -14.5
  drawHazardBeacon(16, -14.5, Math.PI * 0.7);

  // =====================================================================
  // 8. Heavy Main Thruster Rocket Bells
  // =====================================================================
  // Port Engine (under Tower)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-27, 16, 3.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Port Engine Nozzle Bell
  const nozzleGradLeft = ctx.createLinearGradient(-33, 16, -21, 24);
  nozzleGradLeft.addColorStop(0, '#475569');
  nozzleGradLeft.addColorStop(0.4, '#1e293b');
  nozzleGradLeft.addColorStop(1, '#090d16');
  ctx.fillStyle = nozzleGradLeft;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-31, 16);
  ctx.lineTo(-23, 16);
  ctx.lineTo(-21, 24);
  ctx.lineTo(-33, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Port Engine Expansion Lip (Machined Copper)
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-33.5, 24);
  ctx.lineTo(-20.5, 24);
  ctx.stroke();

  // Starboard Engine (under Nacelle)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(26, 16, 3.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Starboard Engine Nozzle Bell
  const nozzleGradRight = ctx.createLinearGradient(20, 16, 32, 24);
  nozzleGradRight.addColorStop(0, '#475569');
  nozzleGradRight.addColorStop(0.4, '#1e293b');
  nozzleGradRight.addColorStop(1, '#090d16');
  ctx.fillStyle = nozzleGradRight;
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(22, 16);
  ctx.lineTo(30, 16);
  ctx.lineTo(32, 24);
  ctx.lineTo(20, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Engine Expansion Lip (Machined Copper)
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(19.5, 24);
  ctx.lineTo(32.5, 24);
  ctx.stroke();

  // Internal Combustion Chamber Throat Glow (Idle Breathing)
  const throatPulse = 0.45 + 0.25 * Math.sin(t * 3.5);
  ctx.fillStyle = `rgba(245, 158, 11, ${throatPulse})`;
  ctx.beginPath();
  ctx.ellipse(-27, 22.5, 4.5, 1.8, 0, 0, Math.PI * 2);
  ctx.ellipse(26, 22.5, 4.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 8. BEHEMOTH-IX (Dreadnought Planetary Carrier)
// =====================================================================
export function drawBehemoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time?: number
) {
  const t = time !== undefined ? time : performance.now() / 1000;
  const footPadY = 33 + gearSpringOffset;

  // Bay door & crane active state
  const bRampProgress = ship?.rampProgress !== undefined ? ship.rampProgress : 0;
  const bRampState = ship?.rampState || 'closed';
  const isCraneActive = bRampProgress > 0.01 || bRampState === 'opening' || bRampState === 'open' || bRampState === 'closing' || (ship?.loadedTrucksCount || 0) > 0;

  // =====================================================================
  // 1. Quad Outrigger Landing Gear & Rocker Footpads (Strictly Isolated Paths)
  // =====================================================================
  // Upper Trunnion Mount Brackets
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -35, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 29, 11, 6, 6, 1.5);
  ctx.fill();
  ctx.stroke();

  // Primary Heavy Oleo Hydraulic Struts - Outer Barrels
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 4.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(32, 14);
  ctx.lineTo(35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();

  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3.0;
  ctx.beginPath();
  ctx.moveTo(-32, 14);
  ctx.lineTo(-35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(32, 14);
  ctx.lineTo(35.5, 14 + (footPadY - 14) * 0.55);
  ctx.stroke();

  // Inner Telescopic Chrome Piston Rods
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-35.5, 14 + (footPadY - 14) * 0.50);
  ctx.lineTo(-38, footPadY - 2.5);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(35.5, 14 + (footPadY - 14) * 0.50);
  ctx.lineTo(38, footPadY - 2.5);
  ctx.stroke();

  // Secondary Diagonal A-Frame Scissor Stabilizers
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-37, footPadY - 3.0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 18);
  ctx.lineTo(37, footPadY - 3.0);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-24, 18);
  ctx.lineTo(-37, footPadY - 3.0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(24, 18);
  ctx.lineTo(37, footPadY - 3.0);
  ctx.stroke();

  // Nitrogen Accumulator Canisters
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -31, 20, 3.4, 7, 1);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  roundRect(ctx, 27.6, 20, 3.4, 7, 1);
  ctx.fill();
  ctx.stroke();

  // Knuckle Joint Assemblies (strictly isolated per user rule)
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-38, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(38, footPadY - 2.5, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Port Cast Manganese-Steel Rocker Footpad (strictly isolated per user rule)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -45.5, footPadY - 2.5, 15, 4.8, 1.5);
  ctx.fill();
  ctx.stroke();

  // Port Footpad Hazard Stripes
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-44, footPadY + 2.0);
  ctx.lineTo(-41, footPadY - 2.5);
  ctx.moveTo(-39.5, footPadY + 2.0);
  ctx.lineTo(-36.5, footPadY - 2.5);
  ctx.moveTo(-35, footPadY + 2.0);
  ctx.lineTo(-32, footPadY - 2.5);
  ctx.stroke();

  // Port Ground Traction Cleats
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(-44, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(-39.5, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(-35, footPadY + 2.3, 2.2, 1.6);
  ctx.fill();

  // Starboard Cast Manganese-Steel Rocker Footpad (strictly isolated per user rule)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 30.5, footPadY - 2.5, 15, 4.8, 1.5);
  ctx.fill();
  ctx.stroke();

  // Starboard Footpad Hazard Stripes
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(32, footPadY + 2.0);
  ctx.lineTo(35, footPadY - 2.5);
  ctx.moveTo(36.5, footPadY + 2.0);
  ctx.lineTo(39.5, footPadY - 2.5);
  ctx.moveTo(41, footPadY + 2.0);
  ctx.lineTo(44, footPadY - 2.5);
  ctx.stroke();

  // Starboard Ground Traction Cleats
  ctx.fillStyle = '#64748b';
  ctx.beginPath();
  ctx.rect(32, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(36.5, footPadY + 2.3, 2.2, 1.6);
  ctx.rect(41, footPadY + 2.3, 2.2, 1.6);
  ctx.fill();

  // =====================================================================
  // 2. Left Portside Heavy Gantry Crane & Cargo Structure (x: -36 to -14)
  // =====================================================================
  // Primary Structural Cargo Tower Housing
  const craneHousingGrad = ctx.createLinearGradient(-36, -14, -14, 16);
  craneHousingGrad.addColorStop(0, '#1e293b');
  craneHousingGrad.addColorStop(0.5, '#0f172a');
  craneHousingGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = craneHousingGrad;
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  roundRect(ctx, -36, -14, 22, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Titanium Armored Insert Panel with Hex Rivets
  ctx.fillStyle = createTitaniumPlate(ctx, -12, 14);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -34, -10, 18, 22, 1.5);
  ctx.fill();
  ctx.stroke();

  // Stenciled Industrial Markings
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 2.8px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('CR-2500', -25, 4);

  // High-Visibility Safety Hazard Stripes along Gantry Base
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-33, 9);
  ctx.lineTo(-17, 9);
  ctx.moveTo(-33, 12);
  ctx.lineTo(-17, 12);
  ctx.stroke();

  // Crane Motorized Winch Drum with Wound Steel Cable Coil
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -29, -13, 10, 5, 1);
  ctx.fill();
  ctx.stroke();

  // Cable coil grooves
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  for (let cx = -27; cx <= -21; cx += 1.8) {
    ctx.moveTo(cx, -13);
    ctx.lineTo(cx, -8);
  }
  ctx.stroke();

  // Heavy Articulated Crane Boom Mast & Luffing Hydraulic Cylinder
  // Hydraulic Elevation Cylinder from Base to Boom
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-24, -13);
  ctx.lineTo(-30, -23);
  ctx.stroke();
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-27, -18);
  ctx.lineTo(-30, -23);
  ctx.stroke();

  // Reinforced Box-Girder Crane Boom Arm
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 3.2;
  ctx.beginPath();
  ctx.moveTo(-30, -14);
  ctx.lineTo(-30, -26);
  ctx.lineTo(-37, -22);
  ctx.stroke();

  // Internal Triangular Lattice Web Bracing
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-30, -18);
  ctx.lineTo(-24, -14);
  ctx.moveTo(-30, -22);
  ctx.lineTo(-34, -20);
  ctx.moveTo(-30, -26);
  ctx.lineTo(-24, -14);
  ctx.stroke();

  // Crane Boom Head Sheave Pulley Wheel
  ctx.fillStyle = '#fdba74';
  ctx.strokeStyle = '#c2410c';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-37, -22, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-37, -22, 0.9, 0, Math.PI * 2);
  ctx.fill();

  // ---------------------------------------------------------------------
  // NEW FEATURE: Suspended Braided Steel Hoist Cable & Articulated Magnetic
  // Lifting Spreader Bar with Active Electromagnetic Lock Core
  // ---------------------------------------------------------------------
  const hoistSway = Math.sin(t * 1.8) * 0.05;
  const cableTopX = -37;
  const cableTopY = -20;
  const cableLen = isCraneActive ? 17 : 14;
  const spreaderX = cableTopX + Math.sin(hoistSway) * cableLen;
  const spreaderY = cableTopY + Math.cos(hoistSway) * cableLen;

  // Braided Steel Wire Rope Hoist Cable
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cableTopX, cableTopY);
  ctx.lineTo(spreaderX, spreaderY);
  ctx.stroke();

  // Heavy Magnetic Spreader Bar Girder
  ctx.save();
  ctx.translate(spreaderX, spreaderY);
  ctx.rotate(hoistSway);

  // Lifting Eye Shackle Link
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, -2.5, 1.8, 0, Math.PI * 2);
  ctx.stroke();

  // Main Spreader Bar Body
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -7, -1.5, 14, 3.2, 0.8);
  ctx.fill();
  ctx.stroke();

  // Spreader Hazard Stripes
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-5, 1.5);
  ctx.lineTo(-3, -1.5);
  ctx.moveTo(3, 1.5);
  ctx.lineTo(5, -1.5);
  ctx.stroke();

  // Left & Right Electromagnetic Gripper Solenoids
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -6.5, 1.7, 3.2, 2.2, 0.5);
  roundRect(ctx, 3.3, 1.7, 3.2, 2.2, 0.5);
  ctx.fill();
  ctx.stroke();

  // Active Electromagnetic Core / Lock Status
  if (isCraneActive) {
    // ACTIVE MAGNETIC CLAMPING FIELD
    const magPulse = 0.5 + 0.4 * Math.sin(t * 8.0);
    // Cyan electromagnetic flux aura
    ctx.fillStyle = `rgba(56, 189, 248, ${0.4 * magPulse})`;
    ctx.beginPath();
    ctx.ellipse(0, 2.5, 7.5, 4.0, 0, 0, Math.PI * 2);
    ctx.fill();

    // Central illuminated electromagnet core
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Dual blue magnetic arc discharge lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-4.9, 3.9);
    ctx.lineTo(-4.9, 5.2);
    ctx.moveTo(4.9, 3.9);
    ctx.lineTo(4.9, 5.2);
    ctx.stroke();

    // Green locked status LED
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(0, -0.6, 0.8, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // STANDBY CLAMP
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(0, 0, 1.0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // ---------------------------------------------------------------------
  // High-Intensity Steerable Halogen Work Floodlight on Crane Boom
  // ---------------------------------------------------------------------
  const floodX = -37;
  const floodY = -20;
  // Lamp Bracket
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, floodX - 2.0, floodY + 1.2, 4.0, 2.2, 0.6);
  ctx.fill();
  ctx.stroke();

  // Lamp Polycarbonate Lens
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(floodX, floodY + 2.2, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Volumetric Warm Halogen Downward Light Cone
  ctx.save();
  const workLightGrad = ctx.createRadialGradient(floodX, floodY + 2.2, 1, floodX, floodY + 24, 26);
  workLightGrad.addColorStop(0, 'rgba(254, 240, 138, 0.45)');
  workLightGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.18)');
  workLightGrad.addColorStop(0.85, 'rgba(245, 158, 11, 0.04)');
  workLightGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = workLightGrad;
  ctx.beginPath();
  ctx.moveTo(floodX, floodY + 2.2);
  ctx.lineTo(floodX - 12, floodY + 28);
  ctx.lineTo(floodX + 10, floodY + 28);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // =====================================================================
  // 3. Center Hollow Vehicle Hold Bay (x: -14 to +14, y: -8 to +16)
  // =====================================================================
  const bHoldX = -14;
  const bHoldY = -8;
  const bHoldW = 28;
  const bHoldH = 24;

  // Hold Interior Cavity Gradient
  const bHoldGrad = ctx.createLinearGradient(0, bHoldY, 0, bHoldY + bHoldH);
  bHoldGrad.addColorStop(0, '#030712');
  bHoldGrad.addColorStop(0.65, '#090d16');
  bHoldGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = bHoldGrad;
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, bHoldX, bHoldY, bHoldW, bHoldH, 1.5);
  ctx.fill();
  ctx.stroke();

  // Interior Bulkhead Ribs & Stencil Markings
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-5, bHoldY);
  ctx.lineTo(-5, bHoldY + bHoldH);
  ctx.moveTo(5, bHoldY);
  ctx.lineTo(5, bHoldY + bHoldH);
  ctx.stroke();

  // Stenciled Hold Designation: BH-09 HOLD
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 3.0px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BH-09 HOLD', 0, bHoldY + 4);

  // Ceiling Halogen Deck Floodlights
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.rect(-9, bHoldY, 3.2, 1.2);
  ctx.rect(-1.6, bHoldY, 3.2, 1.2);
  ctx.rect(5.8, bHoldY, 3.2, 1.2);
  ctx.fill();

  // Translucent Downward Cones of Light from Hold Ceiling
  ctx.fillStyle = 'rgba(254, 240, 138, 0.08)';
  ctx.beginPath();
  ctx.moveTo(-9, bHoldY + 1.2);
  ctx.lineTo(-12, bHoldY + bHoldH);
  ctx.lineTo(-2, bHoldY + bHoldH);
  ctx.lineTo(-5.8, bHoldY + 1.2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(5.8, bHoldY + 1.2);
  ctx.lineTo(2, bHoldY + bHoldH);
  ctx.lineTo(12, bHoldY + bHoldH);
  ctx.lineTo(9, bHoldY + 1.2);
  ctx.fill();

  // Floor Deck Guide Roller Tracks & Tie-Down Cleats
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.rect(-13, bHoldY + bHoldH - 2.5, 26, 2.5);
  ctx.fill();

  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-12, bHoldY + bHoldH - 1.2);
  ctx.lineTo(12, bHoldY + bHoldH - 1.2);
  ctx.stroke();

  // Render Onboard Heavy 8-Wheel Exploration Rover if loaded
  if ((ship?.loadedTrucksCount || 0) > 0) {
    ctx.save();
    ctx.translate(0, 9);

    // Rover Chassis Body
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    roundRect(ctx, -11, -4.5, 22, 7.5, 1.5);
    ctx.fill();
    ctx.stroke();

    // Pressurized Crew Cockpit
    const roverVisorGrad = ctx.createLinearGradient(-9, -4, 0, -4);
    roverVisorGrad.addColorStop(0, '#bae6fd');
    roverVisorGrad.addColorStop(0.5, '#0ea5e9');
    roverVisorGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = roverVisorGrad;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    roundRect(ctx, -9.5, -6.8, 7.5, 3.2, 1);
    ctx.fill();
    ctx.stroke();

    // Specular Glint on Rover Cockpit
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(-7.5, -5.5, 2.0, 0.8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rear Power Module / Nuclear RTG Canister with Cooling Fins
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    roundRect(ctx, 0.5, -6.5, 9, 3.5, 1);
    ctx.fill();
    ctx.stroke();

    // Radiator Fins on Power Module
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    ctx.moveTo(3, -6.5);
    ctx.lineTo(3, -3.0);
    ctx.moveTo(5.5, -6.5);
    ctx.lineTo(5.5, -3.0);
    ctx.moveTo(8, -6.5);
    ctx.lineTo(8, -3.0);
    ctx.stroke();

    // Rooftop Antenna Mast & Flasher
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(6.5, -6.5);
    ctx.lineTo(6.5, -9.5);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(6.5, -10, 1.8, Math.PI * 0.8, Math.PI * 1.8);
    ctx.stroke();

    // Flashing Orange Strobe on Rover Roof
    ctx.fillStyle = Math.sin(t * 8) > 0 ? '#f97316' : '#78350f';
    ctx.beginPath();
    ctx.arc(2, -7.5, 1.0, 0, Math.PI * 2);
    ctx.fill();

    // 8 Rugged Heavy-Duty Planetary Wheels
    const bRoverWheels = [-8.5, -4.0, 1.0, 5.5, 8.5];
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 0.9;
    for (const wx of bRoverWheels) {
      ctx.beginPath();
      ctx.arc(wx, 3.2, 2.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Metallic Hub
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.arc(wx, 3.2, 0.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
    }

    // Magnetic Deck Tie-Down Tensioners
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-10, 2);
    ctx.lineTo(-12, 5);
    ctx.moveTo(10, 2);
    ctx.lineTo(12, 5);
    ctx.stroke();

    ctx.restore();
  }

  // =====================================================================
  // 4. Left Asymmetrical Hydraulic Loading Ramp Door
  // =====================================================================
  const bHingeX = bHoldX; // -14
  const bHingeY = bHoldY + bHoldH - 2; // 14

  if (bRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * bRampProgress;
    const rampEndX = bHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = bHingeY + Math.sin(currentAngle) * rampLength;

    // Heavy Hydraulic Lift Actuator Cylinder
    const cylAnchorX = -20;
    const cylAnchorY = 6;
    const midRampX = bHingeX + (rampEndX - bHingeX) * 0.45;
    const midRampY = bHingeY + (rampEndY - bHingeY) * 0.45;

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(cylAnchorX, cylAnchorY);
    ctx.lineTo(midRampX, midRampY);
    ctx.stroke();

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cylAnchorX + (midRampX - cylAnchorX) * 0.4, cylAnchorY + (midRampY - cylAnchorY) * 0.4);
    ctx.lineTo(midRampX, midRampY);
    ctx.stroke();

    // Primary Heavy Loading Ramp Girder Bed
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 5.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bHingeX, bHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Non-Slip Diamond Tread-Plate Deck Surface
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 3.4;
    ctx.beginPath();
    ctx.moveTo(bHingeX, bHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Hazard Safety Warning Curb Striping
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(bHingeX, bHingeY);
    ctx.lineTo(rampEndX, rampEndY);
    ctx.stroke();

    // Articulated Folding Safety Handrail Stanchions
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.0;
    const normX = -(rampEndY - bHingeY) / rampLength;
    const normY = (rampEndX - bHingeX) / rampLength;
    const railHeight = 3.5;

    const r1X = bHingeX + (rampEndX - bHingeX) * 0.3;
    const r1Y = bHingeY + (rampEndY - bHingeY) * 0.3;
    const r2X = bHingeX + (rampEndX - bHingeX) * 0.7;
    const r2Y = bHingeY + (rampEndY - bHingeY) * 0.7;

    ctx.beginPath();
    ctx.moveTo(r1X, r1Y);
    ctx.lineTo(r1X + normX * railHeight, r1Y + normY * railHeight);
    ctx.moveTo(r2X, r2Y);
    ctx.lineTo(r2X + normX * railHeight, r2Y + normY * railHeight);
    ctx.moveTo(bHingeX + normX * railHeight, bHingeY + normY * railHeight);
    ctx.lineTo(rampEndX + normX * railHeight, rampEndY + normY * railHeight);
    ctx.stroke();

    // Ground Contact Rocker Toe Pad with Rubber Damper
    ctx.fillStyle = '#f97316';
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  } else {
    // CLOSED & SEALED BAY DOOR
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4.0;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-14, 14);
    ctx.lineTo(-26, 23);
    ctx.stroke();

    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.8;
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

    // Pressure Door Hinge Boss & Locking Pins
    ctx.fillStyle = '#475569';
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.arc(-14, 14, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-26, 23, 2.0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Status Indicator LED (Solid Green: Locked & Pressure Sealed)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(-14, 10, 1.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // =====================================================================
  // 5. Starboard Heavy Command Bridge Tower (x: +14 to +36, y: -34 to +16)
  // =====================================================================
  // Primary Armored Bridge Tower Polygon
  const towerGrad = ctx.createLinearGradient(14, -34, 36, 16);
  towerGrad.addColorStop(0, '#1e293b');
  towerGrad.addColorStop(0.5, '#0f172a');
  towerGrad.addColorStop(1, '#090d16');
  ctx.fillStyle = towerGrad;
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

  // Heavy Ballistic Titanium Outer Armor Plate
  ctx.fillStyle = createTitaniumPlate(ctx, -18, 12);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 16, -18, 18, 30, 2);
  ctx.fill();
  ctx.stroke();

  // Armor Plate Hex Rivets
  ctx.fillStyle = '#64748b';
  for (let ry = -14; ry <= 10; ry += 6) {
    ctx.beginPath();
    ctx.arc(18.5, ry, 0.7, 0, Math.PI * 2);
    ctx.arc(31.5, ry, 0.7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stenciled Hull Markings
  ctx.fillStyle = '#f97316';
  ctx.font = 'bold 2.6px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BH-900', 25, 4);
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 2.0px monospace';
  ctx.fillText('DREADNOUGHT', 25, 8);

  // Cyan Panoramic Flight Control Bridge Observation Visor
  const visorGrad = ctx.createRadialGradient(25, -26, 1, 25.5, -26, 9);
  visorGrad.addColorStop(0, '#f0fdf4');
  visorGrad.addColorStop(0.2, '#bae6fd');
  visorGrad.addColorStop(0.55, '#0ea5e9');
  visorGrad.addColorStop(0.85, '#0284c7');
  visorGrad.addColorStop(1, '#082f49');
  ctx.fillStyle = visorGrad;
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

  // Tactical CRT HUD Reticle in Bridge
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(21, -26);
  ctx.lineTo(29, -26);
  ctx.moveTo(25, -29);
  ctx.lineTo(25, -23);
  ctx.stroke();

  // Anti-Glare Specular Glint on Bridge Visor
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.ellipse(24, -26, 3.8, 1.6, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Xenon Brow Searchlights on Tower Roof
  ctx.fillStyle = '#fef08a';
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 18, -32.5, 3.5, 1.8, 0.6);
  roundRect(ctx, 26, -32.5, 3.5, 1.8, 0.6);
  ctx.fill();
  ctx.stroke();

  // Tower Sensor Mast & Rotating Phased-Array Radar
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(28, -34);
  ctx.lineTo(28, -44);
  ctx.stroke();

  // Telemetry Crossbars & Dipoles
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(25, -39);
  ctx.lineTo(31, -39);
  ctx.stroke();

  // Rotating 3D Phased-Array Scanner / Radar Dish
  const radarSweep = Math.cos(t * 3.8);
  const radarSpread = Math.abs(radarSweep) * 5 + 2;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(28 - radarSpread, -42);
  ctx.quadraticCurveTo(28, -39 - Math.sin(t * 3.8) * 1.5, 28 + radarSpread, -42);
  ctx.stroke();

  // Red Anti-Collision Warning Strobe at Mast Tip
  const mastStrobe = Math.sin(t * 6.0) > 0.3;
  ctx.fillStyle = mastStrobe ? '#ef4444' : '#7f1d1d';
  ctx.beginPath();
  ctx.arc(28, -44.5, 1.6, 0, Math.PI * 2);
  ctx.fill();
  if (mastStrobe) {
    ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.beginPath();
    ctx.arc(28, -44.5, 4.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Starboard Green Navigation Marker
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.arc(36, -26, 1.4, 0, Math.PI * 2);
  ctx.fill();

  // =====================================================================
  // 6. Asymmetrical Thruster Arrays ("Offset Dual-Chamber Fusion Torch Nozzles")
  // =====================================================================
  // Port Auxiliary Engine Bell (under Gantry, x: -30 to -20)
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-25, 16, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  const nozzleGradPort = ctx.createLinearGradient(-30, 16, -20, 24);
  nozzleGradPort.addColorStop(0, '#475569');
  nozzleGradPort.addColorStop(0.4, '#1e293b');
  nozzleGradPort.addColorStop(1, '#090d16');
  ctx.fillStyle = nozzleGradPort;
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-29, 16);
  ctx.lineTo(-21, 16);
  ctx.lineTo(-19.5, 24);
  ctx.lineTo(-30.5, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Port Engine Expansion Lip (Machined Copper)
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(-31, 24);
  ctx.lineTo(-19, 24);
  ctx.stroke();

  // Starboard Heavy Dual-Chamber Fusion Torch Rocket Bells (under Bridge, x: +16 to +34)
  // Engine 1
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(21, 16, 2.6, 0, Math.PI * 2);
  ctx.arc(29, 16, 2.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Dual Nozzle Bells
  const nozzleGradStarboard = ctx.createLinearGradient(16, 16, 34, 24);
  nozzleGradStarboard.addColorStop(0, '#475569');
  nozzleGradStarboard.addColorStop(0.4, '#1e293b');
  nozzleGradStarboard.addColorStop(1, '#090d16');
  ctx.fillStyle = nozzleGradStarboard;
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 1.4;

  // Starboard Nozzle A
  ctx.beginPath();
  ctx.moveTo(17.5, 16);
  ctx.lineTo(24.5, 16);
  ctx.lineTo(25.5, 24);
  ctx.lineTo(16.5, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Nozzle B
  ctx.beginPath();
  ctx.moveTo(25.5, 16);
  ctx.lineTo(32.5, 16);
  ctx.lineTo(33.5, 24);
  ctx.lineTo(24.5, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Starboard Expansion Lips
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(16, 24);
  ctx.lineTo(26, 24);
  ctx.moveTo(24, 24);
  ctx.lineTo(34, 24);
  ctx.stroke();

  // Internal Combustion Chamber Throat Glow (Idle Breathing)
  const throatPulse = 0.45 + 0.25 * Math.sin(t * 3.5);
  ctx.fillStyle = `rgba(249, 115, 22, ${throatPulse})`;
  ctx.beginPath();
  ctx.ellipse(-25, 22.5, 4.0, 1.6, 0, 0, Math.PI * 2);
  ctx.ellipse(21, 22.5, 3.8, 1.6, 0, 0, Math.PI * 2);
  ctx.ellipse(29, 22.5, 3.8, 1.6, 0, 0, Math.PI * 2);
  ctx.fill();
}

// =====================================================================
// 9. LEVIATHAN TITAN (Split-Hull Catamaran Supercarrier)
// =====================================================================
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
// 10. MAMMOTH RIG (MR-700 Excavator Mobile Base Carrier)
// =====================================================================
export function drawMammoth(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  ship: ShipState,
  time: number = 0
) {
  const footPadY = 34 + gearSpringOffset;

  // ---------------------------------------------------------
  // 0. Downward Volumetric Halogen Floodlight Cones (Background)
  // ---------------------------------------------------------
  ctx.save();
  const shimmer = 0.22 + Math.sin(time * 5.0) * 0.03;
  const floodGrad = ctx.createLinearGradient(0, -33, 0, 42);
  floodGrad.addColorStop(0, `rgba(254, 240, 138, ${shimmer})`);
  floodGrad.addColorStop(0.4, `rgba(254, 240, 138, ${shimmer * 0.4})`);
  floodGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');

  ctx.fillStyle = floodGrad;
  // Left Floodlight Beam
  ctx.beginPath();
  ctx.moveTo(18, -33);
  ctx.lineTo(6, 40);
  ctx.lineTo(30, 40);
  ctx.closePath();
  ctx.fill();

  // Right Floodlight Beam
  ctx.beginPath();
  ctx.moveTo(30, -33);
  ctx.lineTo(18, 40);
  ctx.lineTo(42, 40);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 1. Heavy Asymmetric Propulsion Array (Underchassis)
  // ---------------------------------------------------------
  ctx.save();
  // Port Dual Vectoring Rocket Thrusters
  // Outer Port Thruster
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-31, 16);
  ctx.lineTo(-27, 16);
  ctx.lineTo(-25, 24);
  ctx.lineTo(-33, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(-29, 24, 4, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#06b6d4';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(-29, 23.5, 2.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Inner Port Thruster
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#64748b';
  ctx.beginPath();
  ctx.moveTo(-21, 16);
  ctx.lineTo(-17, 16);
  ctx.lineTo(-15, 24);
  ctx.lineTo(-23, 24);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(-19, 24, 4, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#06b6d4';
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(-19, 23.5, 2.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Starboard Heavy Thermal Primary Thruster Bell
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(23, 16);
  ctx.lineTo(33, 16);
  ctx.lineTo(36, 25);
  ctx.lineTo(20, 25);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Thruster Cooling Ribs
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(24.5, 17);
  ctx.lineTo(23, 24);
  ctx.moveTo(28, 17);
  ctx.lineTo(28, 24.5);
  ctx.moveTo(31.5, 17);
  ctx.lineTo(33, 24);
  ctx.stroke();

  ctx.fillStyle = '#020617';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.ellipse(28, 25, 8, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = 0.65;
  ctx.beginPath();
  ctx.ellipse(28, 24.5, 5.5, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;
  ctx.restore();

  // ---------------------------------------------------------
  // 2. Heavy Articulated Mining Outriggers & Suspension
  // (CRITICAL RULE: STRICTLY ISOLATED SUBPATHS PER FOOTPAD)
  // ---------------------------------------------------------
  ctx.save();
  // Left Outrigger Leg Assembly
  // Knuckle Bracket
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-32, 12, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(-32, 12, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Armored Yellow Main Strut
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-32, 13);
  ctx.lineTo(-38, footPadY);
  ctx.stroke();

  // Inner Hydraulic Chrome Piston & Damper Spring
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-22, 17);
  ctx.lineTo(-38, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([2.5, 2]);
  ctx.beginPath();
  ctx.moveTo(-22, 17);
  ctx.lineTo(-38, footPadY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Scissor Torque Linkage
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(-35, 22);
  ctx.lineTo(-38, 26);
  ctx.lineTo(-33, 26);
  ctx.closePath();
  ctx.fill();

  // Left Ground Footpad with Regolith Traction Cleats (STRICTLY ISOLATED)
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(-38, footPadY, 8.5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(-38, footPadY - 0.5, 6.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.arc(-38, footPadY - 0.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Carbide Traction Teeth
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(-43, footPadY + 2);
  ctx.lineTo(-41, footPadY + 4);
  ctx.lineTo(-40, footPadY + 2);
  ctx.moveTo(-39, footPadY + 2);
  ctx.lineTo(-38, footPadY + 4.5);
  ctx.lineTo(-37, footPadY + 2);
  ctx.moveTo(-36, footPadY + 2);
  ctx.lineTo(-35, footPadY + 4);
  ctx.lineTo(-33, footPadY + 2);
  ctx.closePath();
  ctx.fill();

  // Right Outrigger Leg Assembly
  // Knuckle Bracket
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(32, 12, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(32, 12, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Armored Yellow Main Strut
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(32, 13);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  // Inner Hydraulic Chrome Piston & Damper Spring
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(22, 17);
  ctx.lineTo(38, footPadY);
  ctx.stroke();

  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([2.5, 2]);
  ctx.beginPath();
  ctx.moveTo(22, 17);
  ctx.lineTo(38, footPadY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Scissor Torque Linkage
  ctx.fillStyle = '#334155';
  ctx.beginPath();
  ctx.moveTo(35, 22);
  ctx.lineTo(38, 26);
  ctx.lineTo(33, 26);
  ctx.closePath();
  ctx.fill();

  // Right Ground Footpad with Regolith Traction Cleats (STRICTLY ISOLATED)
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.ellipse(38, footPadY, 8.5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.ellipse(38, footPadY - 0.5, 6.5, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#451a03';
  ctx.beginPath();
  ctx.arc(38, footPadY - 0.5, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Carbide Traction Teeth
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.moveTo(33, footPadY + 2);
  ctx.lineTo(35, footPadY + 4);
  ctx.lineTo(36, footPadY + 2);
  ctx.moveTo(37, footPadY + 2);
  ctx.lineTo(38, footPadY + 4.5);
  ctx.lineTo(39, footPadY + 2);
  ctx.moveTo(40, footPadY + 2);
  ctx.lineTo(41, footPadY + 4);
  ctx.lineTo(43, footPadY + 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 3. Portside Heavy Machinery Housing & Crane Base (x: -38 to -14)
  // ---------------------------------------------------------
  ctx.save();
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  roundRect(ctx, -38, -14, 24, 30, 2.5);
  ctx.fill();
  ctx.stroke();

  // Armored Inspection Access Panel & Louvers
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -35, -10, 18, 18, 1.5);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-33, -5);
  ctx.lineTo(-28, -5);
  ctx.moveTo(-33, -1);
  ctx.lineTo(-28, -1);
  ctx.moveTo(-33, 3);
  ctx.lineTo(-28, 3);
  ctx.stroke();

  // Equipment Safety Hazard Chevron Striping along Lower Skirt
  ctx.save();
  ctx.beginPath();
  ctx.rect(-38, 10, 24, 5);
  ctx.clip();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-38, 10, 24, 5);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 3.2;
  for (let sx = -45; sx < -10; sx += 6) {
    ctx.beginPath();
    ctx.moveTo(sx, 16);
    ctx.lineTo(sx + 6, 9);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(-38, 10, 24, 5);

  // Turntable Slew Ring Turret
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(-28, -14, 6, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(-28, -14, 1.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 4. Articulated Lattice Box-Girder Crane Boom & Hydraulic Lift Rams
  // ---------------------------------------------------------
  ctx.save();
  // Hydraulic Lift Cylinder (Lower)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-24, -13);
  ctx.lineTo(-32, -22);
  ctx.stroke();

  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-24, -13);
  ctx.lineTo(-32, -22);
  ctx.stroke();

  // Main Upper and Lower Boom Chords
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-28, -14);
  ctx.lineTo(-37, -34);
  ctx.stroke();

  ctx.lineWidth = 2.0;
  ctx.beginPath();
  ctx.moveTo(-23, -12);
  ctx.lineTo(-35, -32);
  ctx.stroke();

  // Diagonal Lattice Bracing
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-27, -16);
  ctx.lineTo(-24, -14);
  ctx.lineTo(-29, -21);
  ctx.lineTo(-26, -18);
  ctx.lineTo(-32, -26);
  ctx.lineTo(-29, -24);
  ctx.lineTo(-35, -31);
  ctx.stroke();

  // Boom Tip Sheave Pulley Wheels
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-37, -34, 2.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(-37, -34, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 5. Hanging Steel Hoist Cable & Magnetic Core Grabber (ORIGINAL FEATURE)
  // ---------------------------------------------------------
  ctx.save();
  const cableSway = Math.sin(time * 2.5) * 1.5;
  const tipX = -37;
  const tipY = -34;
  const grabberX = -36 + cableSway;
  const grabberY = -17;

  // Braided Steel Hoist Cable
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 1]);
  ctx.beginPath();
  ctx.moveTo(tipX, tipY);
  ctx.lineTo(grabberX, grabberY - 1);
  ctx.stroke();
  ctx.setLineDash([]);

  // Cable Guide Shackle
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(grabberX, grabberY - 1, 1.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Magnetic Core Grabber Housing
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, grabberX - 3.5, grabberY, 7, 6.5, 1.2);
  ctx.fill();
  ctx.stroke();

  // Glowing Subsurface Core Sensor (Pulsing Amber)
  const pulseSensor = 0.7 + Math.sin(time * 4.0) * 0.3;
  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = pulseSensor;
  ctx.beginPath();
  ctx.arc(grabberX, grabberY + 3.2, 2.0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fef08a';
  ctx.globalAlpha = 1.0;
  ctx.beginPath();
  ctx.arc(grabberX, grabberY + 3.2, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Articulated Tungsten Grabber Claws
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  // Outer Left Claw
  ctx.moveTo(grabberX - 3.5, grabberY + 4.5);
  ctx.lineTo(grabberX - 6.0, grabberY + 8.0);
  ctx.lineTo(grabberX - 5.0, grabberY + 10.0);
  // Outer Right Claw
  ctx.moveTo(grabberX + 3.5, grabberY + 4.5);
  ctx.lineTo(grabberX + 6.0, grabberY + 8.0);
  ctx.lineTo(grabberX + 5.0, grabberY + 10.0);
  ctx.stroke();

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  // Inner Claws
  ctx.moveTo(grabberX - 1.0, grabberY + 6.5);
  ctx.lineTo(grabberX - 1.5, grabberY + 10.0);
  ctx.moveTo(grabberX + 1.0, grabberY + 6.5);
  ctx.lineTo(grabberX + 1.5, grabberY + 10.0);
  ctx.stroke();
  ctx.restore();

  // ---------------------------------------------------------
  // 6. Center Ultra-Wide Mining Vehicle Cargo Bay (x: -14 to +14)
  // ---------------------------------------------------------
  const mHoldX = -14;
  const mHoldY = -10;
  const mHoldW = 28;
  const mHoldH = 25;

  ctx.save();
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, mHoldX, mHoldY, mHoldW, mHoldH, 1.5);
  ctx.fill();
  ctx.stroke();

  // Overhead Heavy Gantry Monorail & Trolley Hoist
  ctx.fillStyle = '#eab308';
  ctx.strokeStyle = '#854d0e';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.rect(-13, -9, 26, 2.5);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.beginPath();
  roundRect(ctx, -3, -8, 6, 2, 0.5);
  ctx.fill();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(0, -6, 0.8, 0, Math.PI * 2);
  ctx.fill();

  // Render Onboard 6-Wheeled Deep-Core Exploration Crawler if loaded or in hold
  if ((ship.loadedTrucksCount || 0) > 0) {
    ctx.save();
    // Rover Armored Chassis
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    roundRect(ctx, -10, 3, 20, 7.5, 1.8);
    ctx.fill();
    ctx.stroke();

    // Rover Angled Cab & Amber Cockpit
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(1, 3);
    ctx.lineTo(7, 3);
    ctx.lineTo(9, 0);
    ctx.lineTo(3, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#fef08a';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(2, 2.5);
    ctx.lineTo(6, 2.5);
    ctx.lineTo(7.5, 0.8);
    ctx.lineTo(3.5, 0.8);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Dual Forward Headlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(8, 5, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(10, 5, 2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Roof Beacon
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(4, -1.5, 1.0, 0, Math.PI * 2);
    ctx.fill();

    // 6 Heavy All-Terrain Crawler Wheels with Rims
    const wheelPositions = [-7.5, 0, 7.5];
    for (const wx of wheelPositions) {
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.arc(wx, 11.5, 2.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ca8a04';
      ctx.beginPath();
      ctx.arc(wx, 11.5, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ---------------------------------------------------------
  // 7. Drop-Down Hydraulic Mining Ramp
  // ---------------------------------------------------------
  const mRampProgress = ship.rampProgress || 0;
  const mHingeX = mHoldX;
  const mHingeY = mHoldY + mHoldH - 2;

  // Ramp Threshold Hazard Striping Band
  ctx.save();
  ctx.beginPath();
  ctx.rect(-14, 13, 28, 3.5);
  ctx.clip();
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(-14, 13, 28, 3.5);
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 2.8;
  for (let rx = -20; rx < 18; rx += 5) {
    ctx.beginPath();
    ctx.moveTo(rx, 17);
    ctx.lineTo(rx + 5, 12);
    ctx.stroke();
  }
  ctx.restore();
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 0.8;
  ctx.strokeRect(-14, 13, 28, 3.5);

  if (mRampProgress > 0.01) {
    ctx.save();
    const rampLength = 36;
    const closedAngle = -Math.PI * 0.5;
    const openAngle = Math.PI * 0.12;
    const currentAngle = closedAngle + (openAngle - closedAngle) * mRampProgress;
    const rampEndX = mHingeX - Math.cos(currentAngle) * rampLength;
    const rampEndY = mHingeY + Math.sin(currentAngle) * rampLength;

    // Heavy ramp structural door
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

    // Chrome hydraulic actuator piston
    const midX = (mHingeX + rampEndX) * 0.5;
    const midY = (mHingeY + rampEndY) * 0.5;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(mHingeX + 3, mHingeY - 4);
    ctx.lineTo(midX, midY);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(rampEndX, rampEndY, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    // Closed position hydraulic ram markers matching SVG
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-13, 13);
    ctx.lineTo(-23, 22);
    ctx.stroke();

    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-13, 13);
    ctx.lineTo(-23, 22);
    ctx.stroke();

    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(-23, 22, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // ---------------------------------------------------------
  // 8. Starboard Catalytic Refinery Columns & Sight-Glass (x: 14 to 38)
  // ---------------------------------------------------------
  ctx.save();
  // Primary High-Pressure Cracking Column
  const refGrad1 = ctx.createLinearGradient(17, 0, 28, 0);
  refGrad1.addColorStop(0, '#1e293b');
  refGrad1.addColorStop(0.25, '#475569');
  refGrad1.addColorStop(0.6, '#334155');
  refGrad1.addColorStop(1, '#0f172a');

  ctx.fillStyle = refGrad1;
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, 17, -18, 11, 33, 2.5);
  ctx.fill();
  ctx.stroke();

  // Secondary Fractionating Column
  const refGrad2 = ctx.createLinearGradient(28, 0, 37, 0);
  refGrad2.addColorStop(0, '#1e293b');
  refGrad2.addColorStop(0.3, '#475569');
  refGrad2.addColorStop(0.7, '#334155');
  refGrad2.addColorStop(1, '#0f172a');

  ctx.fillStyle = refGrad2;
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, 28, -14, 9, 29, 2.0);
  ctx.fill();
  ctx.stroke();

  // Structural Reinforcing Band Collars
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(17, -8);
  ctx.lineTo(37, -8);
  ctx.moveTo(17, 0);
  ctx.lineTo(37, 0);
  ctx.moveTo(17, 8);
  ctx.lineTo(37, 8);
  ctx.stroke();

  // Illuminated Catalytic Fluid Sight-Glass (ORIGINAL FEATURE)
  // Protective Metal Outer Bezel
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 20.5, -12, 4, 21, 1.5);
  ctx.fill();
  ctx.stroke();

  // Glowing Bio-Catalyst Fluid Tube (with dynamic luminescence pulse)
  const fluidGrad = ctx.createLinearGradient(21, 0, 24, 0);
  fluidGrad.addColorStop(0, '#064e3b');
  fluidGrad.addColorStop(0.35, '#10b981');
  fluidGrad.addColorStop(0.7, '#34d399');
  fluidGrad.addColorStop(1, '#047857');

  ctx.fillStyle = fluidGrad;
  ctx.beginPath();
  roundRect(ctx, 21.5, -11, 2, 19, 1.0);
  ctx.fill();

  // Calibration Graduation Ticks
  ctx.strokeStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(20.8, -7);
  ctx.lineTo(22, -7);
  ctx.moveTo(20.8, -3);
  ctx.lineTo(22.4, -3);
  ctx.moveTo(20.8, 1);
  ctx.lineTo(22, 1);
  ctx.moveTo(20.8, 5);
  ctx.lineTo(22.4, 5);
  ctx.stroke();

  // Meniscus Fluid Shimmer
  const meniscusY = -9 + Math.sin(time * 3.0) * 0.5;
  ctx.fillStyle = '#a7f3d0';
  ctx.beginPath();
  ctx.ellipse(22.5, meniscusY, 1.0, 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // High-Pressure Interconnecting Manifold Piping & Valve
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.4;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(28, -4);
  ctx.lineTo(32, -4);
  ctx.lineTo(32, 4);
  ctx.lineTo(28, 4);
  ctx.stroke();

  // Brass Valve Handwheel
  ctx.fillStyle = '#ca8a04';
  ctx.strokeStyle = '#713f12';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.arc(32, 0, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(32, 0, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Top Scrubber & Titanium Heat-Tint Exhaust Cowl
  // Radiator Cooling Fin Array
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 21, -21, 14, 3, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(24, -21);
  ctx.lineTo(24, -18);
  ctx.moveTo(28, -21);
  ctx.lineTo(28, -18);
  ctx.moveTo(32, -21);
  ctx.lineTo(32, -18);
  ctx.stroke();

  // Heat-Treated Titanium Exhaust Stack (Blue/Purple/Gold Anodized Heat Tint)
  const heatGrad = ctx.createLinearGradient(24, 0, 31, 0);
  heatGrad.addColorStop(0, '#334155');
  heatGrad.addColorStop(0.25, '#3b82f6');
  heatGrad.addColorStop(0.5, '#8b5cf6');
  heatGrad.addColorStop(0.75, '#d97706');
  heatGrad.addColorStop(1, '#1e293b');

  ctx.fillStyle = heatGrad;
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 24, -24, 7, 3.5, 1.0);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.ellipse(27.5, -24, 2.5, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // ---------------------------------------------------------
  // 9. Starboard Elevated Heavy Equipment Operator Bridge (x: 15 to 35)
  // ---------------------------------------------------------
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(15, -34);
  ctx.lineTo(31, -34);
  ctx.lineTo(35, -21);
  ctx.lineTo(15, -21);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Multi-Pane Crimson Visor
  ctx.fillStyle = createVisorGrad(ctx, 23, -27, 8, config.accentColor, config.visorColor);
  ctx.strokeStyle = '#fda4af';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(16.5, -31);
  ctx.lineTo(29.5, -31);
  ctx.lineTo(32.5, -23);
  ctx.lineTo(16.5, -23);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Specular Glare Reflection
  ctx.fillStyle = '#ffffff';
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  ctx.moveTo(18, -30);
  ctx.lineTo(24, -30);
  ctx.lineTo(22, -24);
  ctx.lineTo(17.5, -24);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1.0;

  // Heavy Equipment ROPS (Roll-Over Protective Structure) Safety Cage (ORIGINAL FEATURE)
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  // Roof Frame
  ctx.moveTo(14.5, -34.5);
  ctx.lineTo(31.5, -34.5);
  // Angled A-Pillar Protective Bar
  ctx.lineTo(35.5, -21);
  // Cab Corner Pillar
  ctx.moveTo(14.5, -34.5);
  ctx.lineTo(14.5, -21);
  ctx.stroke();

  ctx.strokeStyle = '#ca8a04';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(23, -34.5);
  ctx.lineTo(23, -21);
  ctx.stroke();

  // ---------------------------------------------------------
  // 10. Dual Roof-Mounted Heavy Halogen Floodlights (ORIGINAL FEATURE)
  // ---------------------------------------------------------
  // Left Floodlight Pod
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 16.5, -36, 3.5, 3, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(18.2, -33, 1.6, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right Floodlight Pod
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, 28.5, -36, 3.5, 3, 0.8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#fef08a';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.ellipse(30.2, -33, 1.6, 0.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Starboard Comms Antenna & High-Intensity Amber Safety Strobe Beacon
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(33, -34);
  ctx.lineTo(33, -40);
  ctx.stroke();

  // Dynamic Strobe Beacon
  const strobePulse = Math.sin(time * 8.0) > 0.4 ? 1.0 : 0.25;
  ctx.fillStyle = '#f59e0b';
  ctx.globalAlpha = strobePulse * 0.45;
  ctx.beginPath();
  ctx.arc(33, -40, 2.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = strobePulse;
  ctx.beginPath();
  ctx.arc(33, -40, 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(33, -40, 0.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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

  // Skid Footpads
  ctx.fillStyle = '#475569';
  ctx.strokeStyle = '#eab308';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -28, footPadY - 3.0, 9, 3.0, 1);
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

  // Titanium Skids
  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -28, footPadY - 3.0, 9, 3.0, 1);
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

  // 1. Landing Gear Assembly
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.lineTo(-28, footPadY);
  ctx.moveTo(16, 12);
  ctx.lineTo(28, footPadY);
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  roundRect(ctx, -32, footPadY - 3.2, 10, 3.2, 1);
  roundRect(ctx, 22, footPadY - 3.2, 10, 3.2, 1);
  ctx.fill();
  ctx.stroke();

  // 2. Twin Side Booms & Sensor Array — steel gradient + seams + rivets
  const boomGrad = ctx.createLinearGradient(-26, -8, 26, 16);
  boomGrad.addColorStop(0, '#334155');
  boomGrad.addColorStop(0.5, '#1e293b');
  boomGrad.addColorStop(1, '#0f172a');
  ctx.fillStyle = boomGrad;
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -26, -8, 8, 24, 2);
  roundRect(ctx, 18, -8, 8, 24, 2);
  ctx.fill();
  ctx.stroke();
  // Boom panel seams + rivets
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-22, -8); ctx.lineTo(-22, 16);   // port boom seam
  ctx.moveTo(22, -8); ctx.lineTo(22, 16);     // starboard boom seam
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  for (let rY of [-4, 4, 10]) {
    ctx.beginPath(); ctx.arc(-22, rY, 0.6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(22, rY, 0.6, 0, Math.PI * 2); ctx.fill();
  }

  // Dish on Port Boom
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-22, -8);
  ctx.lineTo(-22, -18);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-22, -20, 5, 0, Math.PI, true);
  ctx.stroke();

  // Sensor array on Starboard Boom
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(22, -12, 3, 0, Math.PI * 2);
  ctx.fill();

  // 3. Spherical Xenon Propellant Tanks
  ctx.fillStyle = createXenonTank(ctx, -10, 8, 5);
  ctx.beginPath();
  ctx.arc(-10, 8, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 1.0;
  ctx.stroke();

  ctx.fillStyle = createXenonTank(ctx, 10, 8, 5);
  ctx.beginPath();
  ctx.arc(10, 8, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 4. Main Command Fuselage
  ctx.fillStyle = createHullGrad(ctx, -14, -30, 14, 18, config.primaryColor);
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(0, -32);
  ctx.lineTo(14, -12);
  ctx.lineTo(14, 18);
  ctx.lineTo(-14, 18);
  ctx.lineTo(-14, -12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // 5. Azure Visor
  ctx.fillStyle = createVisorGrad(ctx, 0, -14, 7, config.accentColor, config.visorColor);
  ctx.beginPath();
  ctx.ellipse(0, -14, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 6. Dual Nozzles — gradient + glow ring + rivets
  const nozzleGrad = ctx.createLinearGradient(-16, 18, 16, 24);
  nozzleGrad.addColorStop(0, '#1e293b');
  nozzleGrad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = nozzleGrad;
  ctx.strokeStyle = '#0ea5e9';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -16, 18, 9, 6, 1);
  roundRect(ctx, 7, 18, 9, 6, 1);
  ctx.fill();
  ctx.stroke();
  // Glowing inner rings
  ctx.fillStyle = '#bae6fd';
  ctx.beginPath(); ctx.arc(-11.5, 21, 2.5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(11.5, 21, 2.5, 0, Math.PI*2); ctx.fill();
  // Nozzle rivet / seam detail
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-11.5, 18); ctx.lineTo(-11.5, 24);
  ctx.moveTo(11.5, 18); ctx.lineTo(11.5, 24);
  ctx.stroke();

  // 7. Heat-sink radiator array (creative addition)
  ctx.fillStyle = '#0ea5e9';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 0.8;
  for (let idx = 0; idx < 5; idx++) {
    const yOff = -6 + idx * 4;
    ctx.beginPath();
    ctx.moveTo(-14, yOff); ctx.lineTo(-14, yOff + 3); ctx.lineTo(-12, yOff + 3); ctx.lineTo(-12, yOff); ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(12, yOff); ctx.lineTo(12, yOff + 3); ctx.lineTo(14, yOff + 3); ctx.lineTo(14, yOff); ctx.closePath();
    ctx.fill(); ctx.stroke();
  }
  // Cross-heat rail
  ctx.strokeStyle = '#bae6fd';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-12, -2); ctx.lineTo(10, -2);
  ctx.stroke();
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  roundRect(ctx, -16, 18, 9, 6, 1);
  roundRect(ctx, 7, 18, 9, 6, 1);
  ctx.fill();
  ctx.stroke();
}

// =====================================================================
// 15. VALKYRIE TACTICAL (VK-55 Armored Dropship)
// =====================================================================
export function drawValkyrie(
  ctx: CanvasRenderingContext2D,
  config: ShipModelConfig,
  gearSpringOffset: number,
  time?: number
) {
  const footPadY = 31 + gearSpringOffset;

  // Strobe & Beacon Timing Engine
  const t = time !== undefined ? (time > 10000 ? time / 1000 : time) : performance.now() / 1000;
  // Tactical double-flash navigation strobe cycle (1.2s cycle period)
  const cycle12 = (t % 1.2) / 1.2;
  const isNavStrobe = cycle12 < 0.08 || (cycle12 >= 0.16 && cycle12 < 0.24);
  // Pulsing dorsal anti-collision beacon (warm amber/gold)
  const beaconPulse = 0.35 + 0.65 * Math.pow(Math.max(0, Math.sin(t * 4.5)), 3);
  // Alternating telemetry micro-transponders
  const antennaBlink = Math.sin(t * 7.5) > 0;
  // Thruster pre-ignition throat breathing glow
  const thrusterBreath = 0.45 + 0.35 * Math.sin(t * 3.2);

  // -------------------------------------------------------------------
  // 1. Heavy Tactical Landing Gear Assembly (Engineered for Vertical Landing)
  // -------------------------------------------------------------------
  // Primary Hydraulic Oleo Struts (anchored to heavy sponson shoulder brackets)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-18, 9); ctx.lineTo(-29, footPadY - 2.5);
  ctx.moveTo(18, 9); ctx.lineTo(29, footPadY - 2.5);
  ctx.stroke();

  // Polished Chrome Inner Telescopic Piston Shafts
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.6;
  ctx.beginPath();
<<<<<<< HEAD
  roundRect(ctx, -34, footPadY - 3.5, 11, 3.5, 1.5);
  roundRect(ctx, 23, footPadY - 3.5, 11, 3.5, 1.5);
  ctx.fill();
=======
  ctx.moveTo(-24, footPadY - 10); ctx.lineTo(-29, footPadY - 2.5);
  ctx.moveTo(24, footPadY - 10); ctx.lineTo(29, footPadY - 2.5);
>>>>>>> origin/main
  ctx.stroke();

  // A-Frame Diagonal Retraction Braces / Scissor Links
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-10, 16); ctx.lineTo(-23, footPadY - 5);
  ctx.moveTo(10, 16); ctx.lineTo(23, footPadY - 5);
  ctx.stroke();

  // Knuckle Pivot Joints (strictly isolated subpaths per footpad)
  // Port Knuckle Joint
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-29, footPadY - 2.5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(-29, footPadY - 2.5, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Starboard Knuckle Joint
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(29, footPadY - 2.5, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#94a3b8';
  ctx.beginPath();
  ctx.arc(29, footPadY - 2.5, 1.0, 0, Math.PI * 2);
  ctx.fill();

  // Heavy Armored All-Terrain Footpads (strictly isolated subpaths)
  // Port Footpad
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -35, footPadY - 3.4, 12, 3.6, 1.2);
  ctx.fill();
  ctx.stroke();

  // Port Hazard Striping & Ground Cleats
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-32, footPadY - 3.0); ctx.lineTo(-30, footPadY - 0.6);
  ctx.moveTo(-28, footPadY - 3.0); ctx.lineTo(-26, footPadY - 0.6);
  ctx.stroke();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-34, footPadY); ctx.lineTo(-24, footPadY);
  ctx.stroke();

  // Starboard Footpad
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, 23, footPadY - 3.4, 12, 3.6, 1.2);
  ctx.fill();
  ctx.stroke();

  // Starboard Hazard Striping & Ground Cleats
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(26, footPadY - 3.0); ctx.lineTo(28, footPadY - 0.6);
  ctx.moveTo(30, footPadY - 3.0); ctx.lineTo(32, footPadY - 0.6);
  ctx.stroke();
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(24, footPadY); ctx.lineTo(34, footPadY);
  ctx.stroke();

  // -------------------------------------------------------------------
  // 2. Heavy Downward-Firing Methalox VTOL Thrusters (Conical Flared Bells)
  // -------------------------------------------------------------------
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 1.1;

  // Port Outer Bell
  ctx.beginPath();
  ctx.moveTo(-17, 18); ctx.lineTo(-11, 18); ctx.lineTo(-9, 26); ctx.lineTo(-19, 26); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Port Inner Bell
  ctx.beginPath();
  ctx.moveTo(-9, 18); ctx.lineTo(-3, 18); ctx.lineTo(-2, 25); ctx.lineTo(-10, 25); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Starboard Inner Bell
  ctx.beginPath();
  ctx.moveTo(3, 18); ctx.lineTo(9, 18); ctx.lineTo(10, 25); ctx.lineTo(2, 25); ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Starboard Outer Bell
  ctx.beginPath();
  ctx.moveTo(11, 18); ctx.lineTo(17, 18); ctx.lineTo(19, 26); ctx.lineTo(9, 26); ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Gimbal Actuator Collars
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(-16, 20); ctx.lineTo(-12, 20);
  ctx.moveTo(-8, 20); ctx.lineTo(-4, 20);
  ctx.moveTo(4, 20); ctx.lineTo(8, 20);
  ctx.moveTo(12, 20); ctx.lineTo(16, 20);
  ctx.stroke();

  // Copper Thermal Expansion Lips on Bells
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-19, 25.5); ctx.lineTo(-9, 25.5);
  ctx.moveTo(-10, 24.5); ctx.lineTo(-2, 24.5);
  ctx.moveTo(2, 24.5); ctx.lineTo(10, 24.5);
  ctx.moveTo(9, 25.5); ctx.lineTo(19, 25.5);
  ctx.stroke();

  // Internal Throat Pre-Ignition Glow (breathing)
  ctx.fillStyle = `rgba(239, 68, 68, ${thrusterBreath * 0.75})`;
  ctx.beginPath();
  ctx.arc(-14, 22, 1.8, 0, Math.PI * 2);
  ctx.arc(-6, 21.5, 1.5, 0, Math.PI * 2);
  ctx.arc(6, 21.5, 1.5, 0, Math.PI * 2);
  ctx.arc(14, 22, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // -------------------------------------------------------------------
  // 3. Heavy Armored Dropship Fuselage & Crew Pod Chassis
  // -------------------------------------------------------------------
  const hullGrad = ctx.createLinearGradient(0, -30, 0, 20);
  hullGrad.addColorStop(0, '#334155');
  hullGrad.addColorStop(0.25, '#1e293b');
  hullGrad.addColorStop(0.7, '#0f172a');
  hullGrad.addColorStop(1, '#090d16');

  ctx.fillStyle = hullGrad;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(0, -29);
  ctx.lineTo(9, -27);       // Starboard cabin roof corner
  ctx.lineTo(14, -14);      // Cockpit lower brow
  ctx.lineTo(26, -4);       // Starboard upper sponson shoulder
  ctx.lineTo(27, 8);        // Starboard outer sponson flank
  ctx.lineTo(21, 17);       // Starboard lower sponson step
  ctx.lineTo(17, 18);       // Starboard engine deck corner
  ctx.lineTo(0, 17);        // Center keel notch
  ctx.lineTo(-17, 18);      // Port engine deck corner
  ctx.lineTo(-21, 17);      // Port lower sponson step
  ctx.lineTo(-27, 8);       // Port outer sponson flank
  ctx.lineTo(-26, -4);      // Port upper sponson shoulder
  ctx.lineTo(-14, -14);     // Cockpit lower brow
  ctx.lineTo(-9, -27);      // Port cabin roof corner
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Upper Hoisting Crane Recovery Shackles (Cabin Roof)
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(-7, -27, 2.0, Math.PI, Math.PI * 2);
  ctx.moveTo(9, -27);
  ctx.arc(7, -27, 2.0, Math.PI, Math.PI * 2);
  ctx.stroke();

  // Dorsal Comms Blade Antenna & Telemetry Mast
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -29); ctx.lineTo(0, -37);
  ctx.moveTo(-2, -34); ctx.lineTo(2, -34);
  ctx.stroke();
  ctx.fillStyle = antennaBlink ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)';
  ctx.beginPath();
  ctx.arc(0, -37, 1.2, 0, Math.PI * 2);
  ctx.fill();

  // Armor Bulkhead Seams & Reinforcement Ribs
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  // Horizontal deck partitions
  ctx.moveTo(-14, -14); ctx.lineTo(14, -14);
  ctx.moveTo(-26, -4); ctx.lineTo(26, -4);
  ctx.moveTo(-21, 17); ctx.lineTo(21, 17);
  // Sponson diagonal braces
  ctx.moveTo(-14, -14); ctx.lineTo(-26, -4);
  ctx.moveTo(14, -14); ctx.lineTo(26, -4);
  ctx.stroke();

  // Structural Rivet Fasteners
  ctx.fillStyle = '#94a3b8';
  for (const ry of [-2, 4, 10]) {
    ctx.beginPath(); ctx.arc(-24.5, ry, 0.65, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(24.5, ry, 0.65, 0, Math.PI * 2); ctx.fill();
  }

  // -------------------------------------------------------------------
  // 4. Sponson Hardware: High-Pressure Propellant Spheres & Radiator Louvers
  // -------------------------------------------------------------------
  // Port Spherical Methalox Propellant Tank
  const tankGradL = ctx.createRadialGradient(-18, 3, 0.8, -17, 4, 4.5);
  tankGradL.addColorStop(0, '#f8fafc');
  tankGradL.addColorStop(0.3, '#64748b');
  tankGradL.addColorStop(0.8, '#1e293b');
  tankGradL.addColorStop(1, '#090d16');
  ctx.fillStyle = tankGradL;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(-18, 4, 4.2, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Tank retaining band
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-22.2, 4); ctx.lineTo(-13.8, 4);
  ctx.stroke();

  // Starboard Spherical Methalox Propellant Tank
  const tankGradR = ctx.createRadialGradient(18, 3, 0.8, 17, 4, 4.5);
  tankGradR.addColorStop(0, '#f8fafc');
  tankGradR.addColorStop(0.3, '#64748b');
  tankGradR.addColorStop(0.8, '#1e293b');
  tankGradR.addColorStop(1, '#090d16');
  ctx.fillStyle = tankGradR;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.arc(18, 4, 4.2, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Tank retaining band
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(13.8, 4); ctx.lineTo(22.2, 4);
  ctx.stroke();

  // Braided Propellant Feed Lines running from tanks to engine bay
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.moveTo(-18, 8.2); ctx.lineTo(-15, 18);
  ctx.moveTo(18, 8.2); ctx.lineTo(15, 18);
  ctx.stroke();

  // Radiator Cooling Louvers on Sponson Outer Flanks
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#b91c1c';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  roundRect(ctx, -26, 0, 3.2, 9, 0.6);
  roundRect(ctx, 22.8, 0, 3.2, 9, 0.6);
  ctx.fill(); ctx.stroke();

  // Internal Thermal Amber Heat Radiator Slots
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(-25.5, 2.5); ctx.lineTo(-23.5, 2.5);
  ctx.moveTo(-25.5, 5); ctx.lineTo(-23.5, 5);
  ctx.moveTo(-25.5, 7.5); ctx.lineTo(-23.5, 7.5);
  ctx.moveTo(23.3, 2.5); ctx.lineTo(25.3, 2.5);
  ctx.moveTo(23.3, 5); ctx.lineTo(25.3, 5);
  ctx.moveTo(23.3, 7.5); ctx.lineTo(25.3, 7.5);
  ctx.stroke();

  // RCS Attitude Control Quad Blocks (Upper Sponson Corners)
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 0.8;
  // Port RCS Block & Nozzles
  ctx.beginPath();
  ctx.rect(-27.5, -4.5, 3.0, 3.0);
  ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(-26, -4.5); ctx.lineTo(-26, -6.5); // Up nozzle
  ctx.moveTo(-27.5, -3); ctx.lineTo(-29.5, -3); // Out nozzle
  ctx.stroke();

  // Starboard RCS Block & Nozzles
  ctx.beginPath();
  ctx.rect(24.5, -4.5, 3.0, 3.0);
  ctx.fill(); ctx.stroke();
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(26, -4.5); ctx.lineTo(26, -6.5); // Up nozzle
  ctx.moveTo(27.5, -3); ctx.lineTo(29.5, -3); // Out nozzle
  ctx.stroke();

  // -------------------------------------------------------------------
  // 5. Central Armored Personnel/Cargo Hatch Door & Tactical Markings
  // -------------------------------------------------------------------
  // Recessed Hatch Doorway
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  roundRect(ctx, -7, -2, 14, 17, 1.2);
  ctx.fill(); ctx.stroke();

  // Red Delta Combat Insignia
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.moveTo(0, 1); ctx.lineTo(2.8, 4); ctx.lineTo(-2.8, 4); ctx.closePath();
  ctx.fill();

  // Retro Tactical Stenciled "VK-55"
  ctx.save();
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 3.8px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('VK-55', 0, 8);
  ctx.restore();

  // Threshold Hazard Warning Chevrons (Yellow/Black striped bar at base of hatch)
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-5.5, 12); ctx.lineTo(-3.5, 14);
  ctx.moveTo(-2.5, 12); ctx.lineTo(-0.5, 14);
  ctx.moveTo(0.5, 12); ctx.lineTo(2.5, 14);
  ctx.moveTo(3.5, 12); ctx.lineTo(5.5, 14);
  ctx.stroke();

  // -------------------------------------------------------------------
  // 6. Tactical Downward-Angled Cockpit Canopy & Landing CRT HUD
  // -------------------------------------------------------------------
  // Hardened Ballistic Canopy Frame (Sloping downward for landing visibility)
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#f87171';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -26);
  ctx.lineTo(6.5, -21);
  ctx.lineTo(5.5, -14);
  ctx.lineTo(-5.5, -14);
  ctx.lineTo(-6.5, -21);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Polarized Ruby Canopy Glass
  const visorGrad = ctx.createRadialGradient(-1, -21, 1, 0, -18, 8);
  visorGrad.addColorStop(0, '#fecdd3');
  visorGrad.addColorStop(0.3, '#f43f5e');
  visorGrad.addColorStop(0.7, '#be123c');
  visorGrad.addColorStop(1, '#881337');

  ctx.fillStyle = visorGrad;
  ctx.strokeStyle = '#fca5a5';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -24.5);
  ctx.lineTo(5.0, -20);
  ctx.lineTo(4.2, -15);
  ctx.lineTo(-4.2, -15);
  ctx.lineTo(-5.0, -20);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Tactical Landing CRT HUD Projection
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  // Flight vector crosshair & horizon ladder
  ctx.moveTo(-2.5, -18); ctx.lineTo(2.5, -18);
  ctx.moveTo(0, -20.5); ctx.lineTo(0, -15.5);
  ctx.moveTo(-1.6, -21.5); ctx.lineTo(1.6, -21.5);
  ctx.stroke();

  // Circular Landing Collimator Ring
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.75)';
  ctx.lineWidth = 0.55;
  ctx.beginPath();
  ctx.arc(0, -18, 1.8, 0, Math.PI * 2);
  ctx.stroke();

  // Canopy Specular Glare Arc
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.beginPath();
  ctx.moveTo(-0.8, -24);
  ctx.lineTo(2.2, -19);
  ctx.lineTo(1.2, -19);
  ctx.lineTo(-2, -24);
  ctx.closePath();
  ctx.fill();

  // -------------------------------------------------------------------
  // 7. Forward Ground Landing Searchlights (Illuminating the Landing Pad)
  // -------------------------------------------------------------------
  ctx.save();
  // Port Landing Floodlight
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-4.5, -11, 1.8, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Floodlight Halogen Emitter Core
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(-4.5, -11, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-4.5, -11, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Starboard Landing Floodlight
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(4.5, -11, 1.8, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Floodlight Halogen Emitter Core
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(4.5, -11, 1.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(4.5, -11, 0.6, 0, Math.PI * 2);
  ctx.fill();

  // Downward Light Cones / Beams (illuminating downward toward landing terrain)
  const beamGrad = ctx.createLinearGradient(0, -9, 0, 16);
  beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.25)');
  beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0.0)');
  ctx.fillStyle = beamGrad;
  ctx.beginPath();
  ctx.moveTo(-5.5, -9); ctx.lineTo(-12, 16); ctx.lineTo(1, 16); ctx.lineTo(-3.5, -9); ctx.closePath();
  ctx.moveTo(3.5, -9); ctx.lineTo(-1, 16); ctx.lineTo(12, 16); ctx.lineTo(5.5, -9); ctx.closePath();
  ctx.fill();
  ctx.restore();

  // -------------------------------------------------------------------
  // 8. Blinking Retro Navigation Strobes & Anti-Collision Beacon
  // -------------------------------------------------------------------
  // A. Port Sponson Navigation Strobe (Aviation Red) at (-27, 2)
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(-27, 2, 1.9, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  if (isNavStrobe) {
    const flareL = ctx.createRadialGradient(-27, 2, 0.4, -27, 2, 8);
    flareL.addColorStop(0, 'rgba(255, 255, 255, 1)');
    flareL.addColorStop(0.3, 'rgba(239, 68, 68, 0.95)');
    flareL.addColorStop(0.7, 'rgba(220, 38, 38, 0.4)');
    flareL.addColorStop(1, 'rgba(220, 38, 38, 0)');
    ctx.fillStyle = flareL;
    ctx.beginPath();
    ctx.arc(-27, 2, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-27, 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(-27, 2, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // B. Starboard Sponson Navigation Strobe (Aviation Emerald Green) at (27, 2)
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(27, 2, 1.9, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  if (isNavStrobe) {
    const flareR = ctx.createRadialGradient(27, 2, 0.4, 27, 2, 8);
    flareR.addColorStop(0, 'rgba(255, 255, 255, 1)');
    flareR.addColorStop(0.3, 'rgba(16, 185, 129, 0.95)');
    flareR.addColorStop(0.7, 'rgba(5, 150, 105, 0.4)');
    flareR.addColorStop(1, 'rgba(5, 150, 105, 0)');
    ctx.fillStyle = flareR;
    ctx.beginPath();
    ctx.arc(27, 2, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(27, 2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(27, 2, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // C. Dorsal Anti-Collision Amber Beacon (Cabin Roof) at (0, -27)
  ctx.fillStyle = '#090d16';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(0, -27, 1.8, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();

  // Pulsing Amber Flare Halo
  const beaconFlare = ctx.createRadialGradient(0, -27, 0.3, 0, -27, 5 * beaconPulse);
  beaconFlare.addColorStop(0, `rgba(254, 240, 138, ${0.9 * beaconPulse})`);
  beaconFlare.addColorStop(0.4, `rgba(245, 158, 11, ${0.7 * beaconPulse})`);
  beaconFlare.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = beaconFlare;
  ctx.beginPath();
  ctx.arc(0, -27, 5 * beaconPulse, 0, Math.PI * 2);
  ctx.fill();

  // Beacon Lamp Core
  ctx.fillStyle = beaconPulse > 0.7 ? '#ffffff' : '#fef08a';
  ctx.beginPath();
  ctx.arc(0, -27, 1.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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

  // Heavy Tungsten Footpads
  ctx.fillStyle = '#10b981';
  ctx.strokeStyle = '#047857';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  roundRect(ctx, -49, footPadY - 4.5, 13, 4.5, 2);
  roundRect(ctx, 36, footPadY - 4.5, 13, 4.5, 2);
  roundRect(ctx, -22, footPadY - 3.5, 8, 3.5, 1.5);
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
      drawTitan(ctx, config, gearSpringOffset, time);
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
      drawGoliath(ctx, config, gearSpringOffset, ship, time);
      break;
    case 'behemoth':
      drawBehemoth(ctx, config, gearSpringOffset, ship, time);
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
      drawOrion(ctx, config, gearSpringOffset);
      break;
    case 'valkyrie':
      drawValkyrie(ctx, config, gearSpringOffset, time);
      break;
    case 'juggernaut':
      drawJuggernaut(ctx, config, gearSpringOffset, ship);
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
  }

  ctx.restore();
}
