with open('src/game/shipDrawers.ts') as f:
    text = f.read()

pos1 = text.find('export function drawBehemoth(')
pos2 = text.find('export function drawLeviathan(')

code = '''export function drawBehemoth(
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
  const isVehicleLoading =
    (ship?.rampProgress !== undefined && ship.rampProgress > 0.01) ||
    ship?.rampState === 'opening' ||
    ship?.rampState === 'open' ||
    ship?.rampState === 'closing' ||
    (ship?.isLanded && (ship?.loadedTrucksCount || 0) > 0);
  const rampProg = ship?.rampProgress !== undefined ? ship.rampProgress : (isVehicleLoading ? 1.0 : 0);

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
  // User Requirement: "The back door/ramp should descend/ascend when loading or unloading vehicles."
  // "remove the vehicle in the ramp, but keep the people that descend the ramp when it opens"
  ctx.save();
  const rampHingeX = -22;
  const rampHingeY = 9;
  const rampLen = 42;

  // Angular interpolation: closed = folded up along angled keel, open = rests on ground footPadY
  const angleClosed = Math.PI * 0.94; // folded along forward gantry keel
  const angleOpen = Math.atan2(footPadY - rampHingeY, -64 - rampHingeX); // touches ground at x=-64
  const currentRampAngle = angleClosed + (angleOpen - angleClosed) * rampProg;

  const rampTipX = rampHingeX + Math.cos(currentRampAngle) * rampLen;
  const rampTipY = rampHingeY + Math.sin(currentRampAngle) * rampLen;

  // Hydraulic actuator cylinder driving the ramp
  const cylHingeX = -25;
  const cylHingeY = 10;
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
}'''

new_text = text[:pos1] + code + '\n\n' + text[pos2:]

# Also update renderShipHull to pass world to drawBehemoth
old_hull_call = "case 'behemoth':\\n      drawBehemoth(ctx, config, gearSpringOffset, ship, time);\\n      break;"
new_hull_call = "case 'behemoth':\\n      drawBehemoth(ctx, config, gearSpringOffset, ship, time, world);\\n      break;"
if old_hull_call in new_text:
    new_text = new_text.replace(old_hull_call, new_hull_call)
else:
    # try single line or different whitespace
    import re
    new_text = re.sub(
        r"case 'behemoth':\s+drawBehemoth\(ctx,\s*config,\s*gearSpringOffset,\s*ship,\s*time\);",
        "case 'behemoth':\\n      drawBehemoth(ctx, config, gearSpringOffset, ship, time, world);",
        new_text
    )

with open('src/game/shipDrawers.ts', 'w') as f:
    f.write(new_text)

print('Updated shipDrawers.ts successfully!')
