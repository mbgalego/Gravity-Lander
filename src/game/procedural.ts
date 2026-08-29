import {
  WorldMap,
  TerrainPoint,
  TerrainSegment,
  LandingPad,
  FuelPickup,
  CargoPlatform,
  CargoContainer,
  PlanetaryTruck,
  CaveZoneInfo,
  CargoWeightClass,
  CargoType,
  MineSignpost,
} from '../types';

// Deterministic Pseudo-Random Number Generator (PRNG)
class PRNG {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  public next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  public range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  public int(min: number, max: number): number {
    return Math.floor(this.range(min, max + 1));
  }

  public chance(prob: number): boolean {
    return this.next() < prob;
  }
}

// 1D harmonic multi-octave noise function
function multiHarmonicNoise(x: number, seed: number, octaves = 4): number {
  let val = 0;
  let freq = 0.0008;
  let amp = 1.0;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    const phase = ((seed * (i + 1) * 1337) % 10000) / 100;
    val += Math.sin(x * freq + phase) * amp;
    val += Math.cos(x * freq * 0.73 + phase * 1.3) * amp * 0.5;
    maxAmp += amp * 1.5;
    freq *= 2.15;
    amp *= 0.48;
  }

  return val / maxAmp;
}

// Helper to generate a random polygon obstacle (rock island)
function createOrganicPolygon(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  numSides: number,
  rng: PRNG
): TerrainPoint[] {
  const points: TerrainPoint[] = [];
  const angleStep = (Math.PI * 2) / numSides;
  for (let i = 0; i < numSides; i++) {
    const angle = i * angleStep + rng.range(-0.15, 0.15);
    const rX = radiusX * rng.range(0.75, 1.25);
    const rY = radiusY * rng.range(0.75, 1.25);
    points.push({
      x: Math.round(centerX + Math.cos(angle) * rX),
      y: Math.round(centerY + Math.sin(angle) * rY),
    });
  }
  return points;
}

// Helper to generate an arched bridge obstacle
function createArchedBridge(
  xStart: number,
  xEnd: number,
  topY: number,
  thickness: number,
  archDip: number
): TerrainPoint[] {
  const midX = (xStart + xEnd) / 2;
  return [
    { x: xStart, y: topY },
    { x: midX, y: topY - archDip },
    { x: xEnd, y: topY },
    { x: xEnd - 40, y: topY + thickness },
    { x: midX, y: topY + thickness - archDip * 0.6 },
    { x: xStart + 40, y: topY + thickness },
  ];
}

// Helper to generate a vertical rock pillar/column
function createPillar(
  x: number,
  topY: number,
  bottomY: number,
  topWidth: number,
  midWidth: number,
  bottomWidth: number
): TerrainPoint[] {
  const midY = (topY + bottomY) / 2;
  return [
    { x: x - topWidth / 2, y: topY },
    { x: x + topWidth / 2, y: topY },
    { x: x + midWidth / 2, y: midY },
    { x: x + bottomWidth / 2, y: bottomY },
    { x: x - bottomWidth / 2, y: bottomY },
    { x: x - midWidth / 2, y: midY },
  ];
}

export function generateWorld(
  seed: number,
  width = 8600,
  height = 3200,
  planetId = 'luna'
): WorldMap {
  const rng = new PRNG(seed);
  const step = 32;
  const numSteps = Math.ceil(width / step) + 1;

  let launchPadX = 480;
  let launchPadY = 620;
  let launchPadWidth = 320;

  let pickupPadX = 2450;
  let pickupPadY = 2850;
  let pickupPadWidth = 280;

  let landingPadX = width - 650;
  let landingPadY = 1380;
  let landingPadWidth = 340;

  const groundPoints: TerrainPoint[] = [];
  const ceilingPoints: TerrainPoint[] = [];
  const obstacles: TerrainPoint[][] = [];
  const pickups: FuelPickup[] = [];
  const caveZones: CaveZoneInfo[] = [];

  // =========================================================================
  // 1. ARCHETYPE CONFIGURATIONS PER PLANET (Unique Cave Formations & Topology)
  // =========================================================================

  if (planetId === 'ares') {
    // -----------------------------------------------------------------------
    // ARES CANYON: Grand Martian Rift Valley & Jagged Terraced Mesas
    // Characteristics: High desert mesa launch, stepped diagonal canyon drops,
    // hanging red basalt overhangs, massive geothermal spires, deep caldera.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(460, 580);
    launchPadY = rng.range(500, 600);
    landingPadX = width - rng.range(540, 680);
    landingPadY = rng.range(2100, 2400); // Deep in the lower caldera
    pickupPadX = rng.range(3200, 3600);
    pickupPadY = rng.range(2300, 2500);

    // Ground: Stepped canyon descent with 3 massive terraces
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.88;

      if (normX < 0.10) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.26) {
        // Drop down from high launch mesa to mid canyon shelf
        const t = (normX - 0.10) / 0.16;
        baseGroundY = launchPadY + (height * 0.72 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.58) {
        // Deep geothermal trench basin
        const t = (normX - 0.26) / 0.32;
        baseGroundY = height * 0.72 + Math.sin(t * Math.PI * 3) * 55;
      } else if (normX < 0.80) {
        // Stepped descent into deep eastern caldera
        const t = (normX - 0.58) / 0.22;
        baseGroundY = height * 0.72 + (landingPadY + 14 - height * 0.72) * Math.sin(t * Math.PI * 0.5);
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed + 101, 4);
      let groundY = baseGroundY + noise * 45;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    // Ceiling: Jagged canyon roof with heavy overhangs
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const cNoise = multiHarmonicNoise(x, seed + 777, 4);
        ceilingY = height * 0.12 + cNoise * 50;
        // Slanted canyon overhangs
        if (normX > 0.35 && normX < 0.55) {
          ceilingY += Math.sin((normX - 0.35) / 0.20 * Math.PI) * 160;
        }
        const groundAtX = groundPoints[i]?.y ?? height * 0.8;
        ceilingY = Math.min(ceilingY, groundAtX - 380);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Ares Obstacles: Stepped red rock mesas, high suspension bridges, volcanic chimneys
    obstacles.push(
      // High Arch Bridge spanning upper canyon
      createArchedBridge(1100, 2500, 880, 110, 60),
      // Geothermal Mesa Platform holding Pickup Pad
      [
        { x: pickupPadX - 160, y: pickupPadY + 12 },
        { x: pickupPadX + 160, y: pickupPadY + 12 },
        { x: pickupPadX + 130, y: pickupPadY + 140 },
        { x: pickupPadX - 130, y: pickupPadY + 140 },
      ],
      // Mid-Canyon Divider Shelf (Split Level flight routes)
      [
        { x: 2600, y: 1550 },
        { x: 3800, y: 1500 },
        { x: 4900, y: 1560 },
        { x: 4850, y: 1690 },
        { x: 3800, y: 1720 },
        { x: 2650, y: 1690 },
      ],
      // Hanging Basalt Spire
      createPillar(4300, 380, 820, 120, 70, 30),
      // Geothermal Chimney Tower rising from caldera
      createPillar(6400, 1250, 2400, 80, 130, 180)
    );

    pickups.push(
      { id: `fuel-ares-1`, x: 1800, y: 640, radius: 22, amount: 80, collected: false },
      { id: `fuel-ares-2`, x: 3800, y: 1320, radius: 22, amount: 85, collected: false },
      { id: `fuel-ares-3`, x: 2300, y: 2200, radius: 24, amount: 90, collected: false },
      { id: `fuel-ares-4`, x: 5600, y: 840, radius: 20, amount: 75, collected: false },
      { id: `fuel-ares-5`, x: 7200, y: 1750, radius: 24, amount: 85, collected: false }
    );

    caveZones.push(
      { id: 'zone-ares-1', name: 'Upper Sandstone Ridge', level: 1, bounds: { x1: 0, x2: 3000, y1: 0, y2: 1200 } },
      { id: 'zone-ares-2', name: 'Central Geothermal Basin', level: 2, bounds: { x1: 2000, x2: 6000, y1: 1200, y2: 2400 } },
      { id: 'zone-ares-3', name: 'Deep Caldera Landing Zone', level: 3, bounds: { x1: 5800, x2: width, y1: 1000, y2: height } }
    );

  } else if (planetId === 'titan') {
    // -----------------------------------------------------------------------
    // TITAN GROTTO: Winding Serpentine Methane Labyrinth
    // Characteristics: Low gravity with atmospheric drag, organic undulating
    // S-bend tunnels, bulbous stalactites/stalagmites, deep cryo-vault.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(480, 560);
    launchPadY = rng.range(700, 800);
    landingPadX = width - rng.range(550, 680);
    landingPadY = rng.range(800, 950);
    pickupPadX = rng.range(4100, 4500);
    pickupPadY = rng.range(2600, 2800);

    // Ground: Deep undulating methane sea bottom
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.88;

      if (normX < 0.10) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.32) {
        const t = (normX - 0.10) / 0.22;
        baseGroundY = launchPadY + (height * 0.90 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.72) {
        const t = (normX - 0.32) / 0.40;
        baseGroundY = height * 0.88 + Math.sin(t * Math.PI * 4) * 60;
      } else if (normX < 0.90) {
        const t = (normX - 0.72) / 0.18;
        baseGroundY = height * 0.88 - (height * 0.88 - (landingPadY + 14)) * Math.sin(t * Math.PI * 0.5);
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed + 202, 4);
      let groundY = baseGroundY + noise * 40;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    // Ceiling: Winding organic cave roof with bulbous stalactites
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const cNoise = multiHarmonicNoise(x, seed + 888, 4);
        ceilingY = height * 0.15 + cNoise * 45;
        // Large organic ceiling dips creating S-bends
        const wave = Math.sin(normX * Math.PI * 4);
        if (wave > 0.2) {
          ceilingY += (wave - 0.2) * 180;
        }
        const groundAtX = groundPoints[i]?.y ?? height * 0.85;
        ceilingY = Math.min(ceilingY, groundAtX - 360);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Titan Obstacles: Serpentine hydrocarbon strata, floating crystal arches
    obstacles.push(
      // Upper Methane Strata Shelf
      createArchedBridge(1100, 4400, 1050, 120, -40),
      // Mid-Level Abyssal Partition with dual bypasses
      [
        { x: 2600, y: 2050 },
        { x: 4500, y: 2000 },
        { x: 6500, y: 2050 },
        { x: 6450, y: 2180 },
        { x: 4500, y: 2210 },
        { x: 2650, y: 2180 },
      ],
      // Deep Cryo-Depot Foundation
      [
        { x: pickupPadX - 150, y: pickupPadY + 12 },
        { x: pickupPadX + 150, y: pickupPadY + 12 },
        { x: pickupPadX + 120, y: pickupPadY + 130 },
        { x: pickupPadX - 120, y: pickupPadY + 130 },
      ],
      // Hanging Methane Crystal Arch
      createArchedBridge(5200, 6400, 780, 90, 80)
    );

    pickups.push(
      { id: `fuel-titan-1`, x: 2800, y: 720, radius: 22, amount: 80, collected: false },
      { id: `fuel-titan-2`, x: 1600, y: 1650, radius: 22, amount: 80, collected: false },
      { id: `fuel-titan-3`, x: 5300, y: 1600, radius: 24, amount: 90, collected: false },
      { id: `fuel-titan-4`, x: 3300, y: 2600, radius: 24, amount: 90, collected: false }
    );

    caveZones.push(
      { id: 'zone-titan-1', name: 'Upper Hydrocarbon Skyway', level: 1, bounds: { x1: 0, x2: 4500, y1: 0, y2: 1200 } },
      { id: 'zone-titan-2', name: 'Sub-Surface Methane Cavern', level: 2, bounds: { x1: 1500, x2: 6500, y1: 1200, y2: 2200 } },
      { id: 'zone-titan-3', name: 'Deep Cryo-Grotto', level: 3, bounds: { x1: 2000, x2: 7000, y1: 2200, y2: height } }
    );

  } else if (planetId === 'ceres') {
    // -----------------------------------------------------------------------
    // CERES HOLLOW: Sprawling Floating Asteroid Field & Zero-G Core Archipelago
    // Characteristics: Microgravity, NO continuous flat floor. A vast cavern
    // filled with 5+ floating faceted asteroid bastions of varying shapes & rotations.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(460, 540);
    launchPadY = rng.range(480, 560);
    landingPadX = width - rng.range(520, 640);
    landingPadY = rng.range(640, 760);
    pickupPadX = rng.range(5200, 5600);
    pickupPadY = rng.range(2550, 2750);

    // Ground: Deep crater basin with jagged asteroid impact ridges
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.91;

      if (normX < 0.08) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.20) {
        const t = (normX - 0.08) / 0.12;
        baseGroundY = launchPadY + (height * 0.91 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.85) {
        baseGroundY = height * 0.91 + Math.sin(normX * Math.PI * 6) * 50;
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed + 303, 4);
      let groundY = baseGroundY + noise * 45;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    // Ceiling: High asteroid hollow dome
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const cNoise = multiHarmonicNoise(x, seed + 999, 4);
        ceilingY = height * 0.12 + cNoise * 45;
        const groundAtX = groundPoints[i]?.y ?? height * 0.85;
        ceilingY = Math.min(ceilingY, groundAtX - 380);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Ceres Obstacles: 5+ Floating Asteroid Cores & Crystalline Bastions
    obstacles.push(
      // Floating Asteroid Core Alpha
      createOrganicPolygon(2100, 800, 360, 110, 7, rng),
      // Floating Asteroid Core Beta
      createOrganicPolygon(4400, 1150, 480, 130, 8, rng),
      // Deep Asteroid Bastion Gamma
      createOrganicPolygon(6800, 1600, 380, 140, 6, rng),
      // Abyssal Ledge Strata
      [
        { x: 3800, y: 2150 },
        { x: 5000, y: 2080 },
        { x: 6200, y: 2150 },
        { x: 6150, y: 2280 },
        { x: 5000, y: 2310 },
        { x: 3850, y: 2280 },
      ],
      // Pickup Depot Asteroid Core
      [
        { x: pickupPadX - 160, y: pickupPadY + 12 },
        { x: pickupPadX + 160, y: pickupPadY + 12 },
        { x: pickupPadX + 130, y: pickupPadY + 130 },
        { x: pickupPadX - 130, y: pickupPadY + 130 },
      ]
    );

    pickups.push(
      { id: `fuel-ceres-1`, x: 2100, y: 550, radius: 22, amount: 75, collected: false },
      { id: `fuel-ceres-2`, x: 4400, y: 880, radius: 22, amount: 80, collected: false },
      { id: `fuel-ceres-3`, x: 1900, y: 1800, radius: 24, amount: 85, collected: false },
      { id: `fuel-ceres-4`, x: 6800, y: 1350, radius: 22, amount: 80, collected: false }
    );

    caveZones.push(
      { id: 'zone-ceres-1', name: 'Asteroid Surface Rim', level: 1, bounds: { x1: 0, x2: 3500, y1: 0, y2: 1100 } },
      { id: 'zone-ceres-2', name: 'Central Hollow Bastion', level: 2, bounds: { x1: 2000, x2: 6000, y1: 1100, y2: 2100 } },
      { id: 'zone-ceres-3', name: 'Abyssal Isotope Vault', level: 3, bounds: { x1: 3500, x2: width, y1: 2100, y2: height } }
    );

  } else if (planetId === 'vespera') {
    // -----------------------------------------------------------------------
    // VESPERA HEAVY: Crushing High-Mass Basalt Quarry & Vertical Descent Shafts
    // Characteristics: 7.2G crushing gravity. Massive verticality, staggered
    // heavy basalt shelves, reinforced industrial gantry columns.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(500, 600);
    launchPadY = rng.range(480, 560);
    landingPadX = width - rng.range(580, 720);
    landingPadY = rng.range(1100, 1300);
    pickupPadX = rng.range(2900, 3300);
    pickupPadY = rng.range(2800, 2950);

    // Ground: Deep fortified quarry floor
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.90;

      if (normX < 0.08) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.20) {
        const t = (normX - 0.08) / 0.12;
        baseGroundY = launchPadY + (height * 0.90 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.75) {
        baseGroundY = height * 0.91 + Math.sin(normX * Math.PI * 6) * 35;
      } else if (normX < 0.88) {
        const t = (normX - 0.75) / 0.13;
        baseGroundY = height * 0.91 - (height * 0.91 - (landingPadY + 14)) * Math.sin(t * Math.PI * 0.5);
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed + 404, 4);
      let groundY = baseGroundY + noise * 40;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    // Ceiling: Fortified quarry ceiling
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const cNoise = multiHarmonicNoise(x, seed + 444, 4);
        ceilingY = height * 0.13 + cNoise * 40;
        const groundAtX = groundPoints[i]?.y ?? height * 0.85;
        ceilingY = Math.min(ceilingY, groundAtX - 360);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Vespera Obstacles: Stepped heavy basalt shelves, massive structural pillars
    obstacles.push(
      // Upper Heavy Quarry Strata
      [
        { x: 1100, y: 960 },
        { x: 2400, y: 920 },
        { x: 3700, y: 960 },
        { x: 3650, y: 1090 },
        { x: 2400, y: 1110 },
        { x: 1150, y: 1090 },
      ],
      // Structural Basalt Column 1
      createPillar(2000, 1090, 2000, 100, 90, 110),
      // Level 2 Industrial Terrace
      [
        { x: 3800, y: 1900 },
        { x: 5300, y: 1850 },
        { x: 6800, y: 1900 },
        { x: 6750, y: 2040 },
        { x: 5300, y: 2070 },
        { x: 3850, y: 2040 },
      ],
      // Deep Basalt Extraction Pad
      [
        { x: pickupPadX - 160, y: pickupPadY + 12 },
        { x: pickupPadX + 160, y: pickupPadY + 12 },
        { x: pickupPadX + 130, y: pickupPadY + 130 },
        { x: pickupPadX - 130, y: pickupPadY + 130 },
      ],
      // Structural Column 2
      createPillar(5900, 600, 1850, 90, 80, 100)
    );

    pickups.push(
      { id: `fuel-vespera-1`, x: 2800, y: 680, radius: 24, amount: 95, collected: false },
      { id: `fuel-vespera-2`, x: 4800, y: 1300, radius: 24, amount: 95, collected: false },
      { id: `fuel-vespera-3`, x: 1800, y: 2450, radius: 26, amount: 100, collected: false },
      { id: `fuel-vespera-4`, x: 6300, y: 2450, radius: 26, amount: 100, collected: false }
    );

    caveZones.push(
      { id: 'zone-vespera-1', name: 'Upper Fortress Gantry', level: 1, bounds: { x1: 0, x2: 4000, y1: 0, y2: 1100 } },
      { id: 'zone-vespera-2', name: 'Refining Sector Beta', level: 2, bounds: { x1: 3000, x2: 7000, y1: 1100, y2: 2100 } },
      { id: 'zone-vespera-3', name: 'Deep Basalt Extraction Rift', level: 3, bounds: { x1: 1000, x2: 6000, y1: 2100, y2: height } }
    );

  } else if (planetId === 'glacies') {
    // -----------------------------------------------------------------------
    // GLACIES CHASM: Sub-Zero Glacial Crevasse & Ice Needle Spire Forest
    // Characteristics: Hanging icicle teeth gates, crystalline arches,
    // vertical ice draft chimneys, deep sub-ice cryo-vault.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(480, 560);
    launchPadY = rng.range(580, 660);
    landingPadX = width - rng.range(560, 680);
    landingPadY = rng.range(2250, 2450);
    pickupPadX = rng.range(2100, 2400);
    pickupPadY = rng.range(2700, 2850);

    // Ground: Deep glacial crevasse floor
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.89;

      if (normX < 0.08) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.18) {
        const t = (normX - 0.08) / 0.10;
        baseGroundY = launchPadY + (height * 0.89 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.80) {
        baseGroundY = height * 0.89 + Math.sin(normX * Math.PI * 5) * 40;
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed + 505, 4);
      let groundY = baseGroundY + noise * 40;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    // Ceiling: Covered in hanging icicle teeth
    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const cNoise = multiHarmonicNoise(x, seed + 555, 4);
        ceilingY = height * 0.12 + cNoise * 40;
        // Hanging Icicle teeth
        const icicle = Math.sin(x * 0.008 + seed) * Math.cos(x * 0.016);
        if (icicle > 0.32) {
          ceilingY += (icicle - 0.32) * 220;
        }
        const groundAtX = groundPoints[i]?.y ?? height * 0.85;
        ceilingY = Math.min(ceilingY, groundAtX - 360);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Glacies Obstacles: Glacial overhangs, ice spire columns, ice bridge
    obstacles.push(
      // Glacial Crevasse Overhang
      createArchedBridge(1000, 3300, 920, 110, 50),
      // Mid-Glacier Strata Deck
      [
        { x: 3500, y: 1800 },
        { x: 5100, y: 1750 },
        { x: 6600, y: 1800 },
        { x: 6550, y: 1930 },
        { x: 5100, y: 1960 },
        { x: 3550, y: 1930 },
      ],
      // Deep Sub-Ice Vault Pad
      [
        { x: pickupPadX - 150, y: pickupPadY + 12 },
        { x: pickupPadX + 150, y: pickupPadY + 12 },
        { x: pickupPadX + 130, y: pickupPadY + 130 },
        { x: pickupPadX - 130, y: pickupPadY + 130 },
      ],
      // Ice Needle Spire Column 1
      createPillar(6900, 1000, 1900, 60, 90, 120),
      // Ice Needle Spire Column 2
      createPillar(2800, 1850, 2700, 50, 80, 100)
    );

    pickups.push(
      { id: `fuel-glacies-1`, x: 2300, y: 640, radius: 22, amount: 80, collected: false },
      { id: `fuel-glacies-2`, x: 4700, y: 1100, radius: 22, amount: 80, collected: false },
      { id: `fuel-glacies-3`, x: 1200, y: 2200, radius: 24, amount: 90, collected: false },
      { id: `fuel-glacies-4`, x: 5800, y: 2400, radius: 24, amount: 90, collected: false }
    );

    caveZones.push(
      { id: 'zone-glacies-1', name: 'Glacial Surface Fissure', level: 1, bounds: { x1: 0, x2: 3500, y1: 0, y2: 1100 } },
      { id: 'zone-glacies-2', name: 'Mid-Glacier Laboratory', level: 2, bounds: { x1: 3000, x2: 6800, y1: 1100, y2: 2000 } },
      { id: 'zone-glacies-3', name: 'Deep Sub-Ice Cavern LZ', level: 3, bounds: { x1: 1000, x2: width, y1: 2000, y2: height } }
    );

  } else {
    // -----------------------------------------------------------------------
    // LUNA CORE & DYNAMIC PROCEDURAL GENERATOR (Seed-Driven Cavern World)
    // Dynamic generation based on seed: constructs unique organic cave routes,
    // obstacles, and platform locations.
    // -----------------------------------------------------------------------
    launchPadX = rng.range(460, 580);
    launchPadY = rng.range(560, 660);
    landingPadX = width - rng.range(550, 700);
    landingPadY = rng.range(1250, 1500);
    pickupPadX = rng.range(2300, 2700);
    pickupPadY = rng.range(2700, 2900);

    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let baseGroundY = height * 0.88;

      if (normX < 0.08) {
        baseGroundY = launchPadY + 14;
      } else if (normX < 0.16) {
        const t = (normX - 0.08) / 0.08;
        baseGroundY = launchPadY + (height * 0.90 - launchPadY) * Math.sin(t * Math.PI * 0.5);
      } else if (normX < 0.72) {
        const trenchT = (normX - 0.16) / 0.56;
        const deepDip = Math.sin(trenchT * Math.PI) * (height * 0.06);
        const wavyFloor = Math.sin(trenchT * Math.PI * 4) * 40;
        baseGroundY = height * 0.88 + deepDip + wavyFloor;
      } else if (normX < 0.88) {
        const eastT = (normX - 0.72) / 0.16;
        baseGroundY = height * 0.88 - (height * 0.88 - (landingPadY + 14)) * Math.sin(eastT * Math.PI * 0.5);
      } else {
        baseGroundY = landingPadY + 14;
      }

      const noise = multiHarmonicNoise(x, seed, 4);
      let groundY = baseGroundY + noise * 40;
      if (x >= launchPadX - 140 && x <= launchPadX + 140) groundY = launchPadY;
      if (x >= landingPadX - 140 && x <= landingPadX + 140) groundY = landingPadY;
      if (x <= 60 || x >= width - 60) groundY = 50;
      groundPoints.push({ x, y: Math.max(70, Math.min(height - 40, groundY)) });
    }

    for (let i = 0; i <= numSteps; i++) {
      const x = Math.min(width, i * step);
      const normX = x / width;
      let ceilingY = 70;
      if (normX >= 0.05 && normX <= 0.95) {
        const ceilingNoise = multiHarmonicNoise(x, seed + 9999, 4);
        ceilingY = height * 0.14 + ceilingNoise * 45;
        const groundAtX = groundPoints[i]?.y ?? height * 0.85;
        ceilingY = Math.min(ceilingY, groundAtX - 360);
      }
      ceilingPoints.push({ x, y: Math.max(70, ceilingY) });
    }

    // Luna 3-tier Strata with organic variations
    obstacles.push(
      // Skyway Strata 1
      createArchedBridge(700, 1600, 920, 110, 20),
      // Skyway Strata 2
      createArchedBridge(2100, 3900, 920, 110, -20),
      // Skyway Strata 3
      createArchedBridge(4400, 6900, 920, 110, 30),
      // Level 2 Subterranean Shelf West
      [
        { x: 850, y: 1980 },
        { x: 2350, y: 1940 },
        { x: 3850, y: 1980 },
        { x: 3800, y: 2110 },
        { x: 2350, y: 2140 },
        { x: 900, y: 2110 },
      ],
      // Level 2 Subterranean Shelf East
      [
        { x: 4450, y: 1980 },
        { x: 5550, y: 1940 },
        { x: 6700, y: 1980 },
        { x: 6650, y: 2110 },
        { x: 5550, y: 2140 },
        { x: 4480, y: 2110 },
      ],
      // Deep Mining Pickup Pad
      [
        { x: pickupPadX - 150, y: pickupPadY + 12 },
        { x: pickupPadX + 150, y: pickupPadY + 12 },
        { x: pickupPadX + 130, y: pickupPadY + 130 },
        { x: pickupPadX - 130, y: pickupPadY + 130 },
      ]
    );

    pickups.push(
      { id: `fuel-luna-1`, x: 3000, y: 680, radius: 22, amount: 75, collected: false },
      { id: `fuel-luna-2`, x: 6200, y: 680, radius: 20, amount: 65, collected: false },
      { id: `fuel-luna-3`, x: 3100, y: 1480, radius: 22, amount: 75, collected: false },
      { id: `fuel-luna-4`, x: 1400, y: 2650, radius: 24, amount: 90, collected: false },
      { id: `fuel-luna-5`, x: 5650, y: 2750, radius: 22, amount: 80, collected: false }
    );

    caveZones.push(
      { id: 'zone-luna-1', name: 'Launch Mesa & Skyway', level: 1, bounds: { x1: 0, x2: 7000, y1: 0, y2: 1040 } },
      { id: 'zone-luna-2', name: 'Subterranean Nexus Hub', level: 2, bounds: { x1: 1500, x2: 7200, y1: 1040, y2: 2100 } },
      { id: 'zone-luna-3', name: 'Sub-Crust Mining Vault', level: 3, bounds: { x1: 600, x2: 7000, y1: 2100, y2: height } },
      { id: 'zone-luna-4', name: 'Eastern Terminal Basin', level: 1, bounds: { x1: 7000, x2: width, y1: 0, y2: height } }
    );
  }

  // 7. Base Platforms: Launch Site & Primary LZ
  const launchPad: LandingPad = {
    x1: launchPadX - launchPadWidth * 0.5,
    x2: launchPadX + launchPadWidth * 0.5,
    y: launchPadY,
    width: launchPadWidth,
    center: { x: launchPadX, y: launchPadY },
  };

  const landingPad: LandingPad = {
    x1: landingPadX - landingPadWidth * 0.5,
    x2: landingPadX + landingPadWidth * 0.5,
    y: landingPadY,
    width: landingPadWidth,
    center: { x: landingPadX, y: landingPadY },
  };

  // 8. Cargo Platforms (Pickup Depots & Mining Vaults - Destination is the Primary LZ)
  const cargoPlatforms: CargoPlatform[] = [
    {
      id: `cargo-pickup-${seed}`,
      type: 'pickup',
      x1: pickupPadX - pickupPadWidth * 0.5,
      x2: pickupPadX + pickupPadWidth * 0.5,
      y: pickupPadY,
      width: pickupPadWidth,
      center: { x: pickupPadX, y: pickupPadY },
      label: 'ORE & CARGO EXTRACTION DEPOT',
      cargoId: `cargo-container-${seed}`,
      isFulfilled: false,
    },
  ];

  // 8b. Vehicle Depot Platform & Planetary Trucks (for Goliath and Transport Missions)
  let vehicleDepotX = 2200;
  let vehicleDepotY = 1250;

  if (planetId === 'ares') {
    vehicleDepotX = 2200;
    vehicleDepotY = 880;
  } else if (planetId === 'titan') {
    vehicleDepotX = 3300;
    vehicleDepotY = 1550;
  } else if (planetId === 'ceres') {
    vehicleDepotX = 2200;
    vehicleDepotY = 1680;
  } else if (planetId === 'vespera') {
    vehicleDepotX = 2200;
    vehicleDepotY = 1520;
  } else if (planetId === 'glacies') {
    vehicleDepotX = 3800;
    vehicleDepotY = 1250;
  } else {
    vehicleDepotX = rng.range(2000, 2600);
    vehicleDepotY = Math.min(height - 480, Math.max(920, launchPadY + 360));
  }

  // WIDE 480m Logistics Deck with ample runway for surface operations
  const vehicleDepotWidth = 480;

  // Clear ground terrain below vehicle depot so rocks don't poke through deck
  for (let i = 0; i < groundPoints.length; i++) {
    const pt = groundPoints[i];
    if (pt.x >= vehicleDepotX - 300 && pt.x <= vehicleDepotX + 300) {
      if (pt.y < vehicleDepotY + 50) {
        pt.y = vehicleDepotY + 130;
      }
    }
  }

  // Clear ceiling terrain above vehicle depot for landing clearance
  for (let i = 0; i < ceilingPoints.length; i++) {
    const pt = ceilingPoints[i];
    if (pt.x >= vehicleDepotX - 300 && pt.x <= vehicleDepotX + 300) {
      if (pt.y > vehicleDepotY - 290) {
        pt.y = Math.max(70, vehicleDepotY - 310);
      }
    }
  }

  cargoPlatforms.push({
    id: `vehicle-depot-${seed}`,
    type: 'vehicle_depot',
    x1: vehicleDepotX - vehicleDepotWidth * 0.5,
    x2: vehicleDepotX + vehicleDepotWidth * 0.5,
    y: vehicleDepotY,
    width: vehicleDepotWidth,
    center: { x: vehicleDepotX, y: vehicleDepotY },
    label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
    truckCount: 2,
    isFulfilled: false,
  });

  // Supporting mesa/shelf obstacle under vehicle depot (only beneath the platform, never inside)
  obstacles.push([
    { x: vehicleDepotX - vehicleDepotWidth * 0.48, y: vehicleDepotY + 12 },
    { x: vehicleDepotX + vehicleDepotWidth * 0.48, y: vehicleDepotY + 12 },
    { x: vehicleDepotX + vehicleDepotWidth * 0.40, y: vehicleDepotY + 90 },
    { x: vehicleDepotX - vehicleDepotWidth * 0.40, y: vehicleDepotY + 90 },
  ]);

  const trucks: PlanetaryTruck[] = [
    {
      id: `truck-1-${seed}`,
      name: 'Titan Exploration Rover',
      type: 'rover',
      pos: { x: vehicleDepotX - 170, y: vehicleDepotY - 14 },
      vel: { x: 0, y: 0 },
      width: 52,
      height: 26,
      state: 'waiting_at_depot',
      progress: 0,
      baseX: vehicleDepotX - 170,
      baseY: vehicleDepotY - 14,
      targetX: landingPadX - 60,
      targetY: landingPadY - 14,
      color: '#f59e0b',
      accentColor: '#1e293b',
      wheelAngle: 0,
      headlightsOn: true,
    },
    {
      id: `truck-2-${seed}`,
      name: 'Colossus Heavy Mining Truck',
      type: 'heavy_truck',
      pos: { x: vehicleDepotX - 95, y: vehicleDepotY - 17 },
      vel: { x: 0, y: 0 },
      width: 64,
      height: 32,
      state: 'waiting_at_depot',
      progress: 0,
      baseX: vehicleDepotX - 95,
      baseY: vehicleDepotY - 17,
      targetX: landingPadX + 60,
      targetY: landingPadY - 17,
      color: '#0284c7',
      accentColor: '#0f172a',
      wheelAngle: 0,
      headlightsOn: true,
    },
  ];

  // 9. Cargo Container Instance (with Specialized Volatile / Fragile Payloads)
  let cargoType: CargoType = 'standard';
  let cargoName = 'Scientific Sensor Pod';
  let cargoWeightClass: CargoWeightClass = 'medium';
  let cargoMass = 320;
  let cargoColor = '#38bdf8';
  let cargoAccentColor = '#0284c7';
  let cargoIntegrity = 100;
  let cargoTemperature = 0;
  let cargoChargeTimer = 60;

  if (planetId === 'vespera') {
    cargoType = 'explosive';
    cargoName = 'High-Explosive Munitions Crate';
    cargoWeightClass = 'heavy';
    cargoMass = 650;
    cargoColor = '#f59e0b';
    cargoAccentColor = '#dc2626';
  } else if (planetId === 'glacies') {
    cargoType = 'cryogenic';
    cargoName = 'Sub-Zero Biological Specimen';
    cargoWeightClass = 'medium';
    cargoMass = 380;
    cargoColor = '#67e8f9';
    cargoAccentColor = '#06b6d4';
    cargoTemperature = 0;
  } else if (planetId === 'titan') {
    cargoType = 'plasma';
    cargoName = 'High-Voltage Plasma Battery';
    cargoWeightClass = 'medium';
    cargoMass = 420;
    cargoColor = '#2dd4bf';
    cargoAccentColor = '#059669';
    cargoChargeTimer = 60;
  } else if (planetId === 'ceres') {
    cargoType = 'isotope';
    cargoName = 'Unstable Quantum Isotope';
    cargoWeightClass = 'light';
    cargoMass = 180;
    cargoColor = '#c084fc';
    cargoAccentColor = '#9333ea';
    cargoIntegrity = 100;
  } else if (planetId === 'ares') {
    cargoType = 'magnetic';
    cargoName = 'Superconducting Magnetic Core';
    cargoWeightClass = 'heavy';
    cargoMass = 520;
    cargoColor = '#fb923c';
    cargoAccentColor = '#ea580c';
  } else {
    // Custom / Procedural Planets
    const types: CargoType[] = ['standard', 'explosive', 'cryogenic', 'isotope', 'magnetic', 'plasma'];
    cargoType = types[Math.floor(rng.next() * types.length)];
    if (cargoType === 'explosive') {
      cargoName = 'Volatile Seismic Charges';
      cargoMass = 550;
      cargoColor = '#ef4444';
      cargoAccentColor = '#f59e0b';
    } else if (cargoType === 'cryogenic') {
      cargoName = 'Cryo-Stabilized Coolant Cell';
      cargoMass = 340;
      cargoColor = '#38bdf8';
      cargoAccentColor = '#0284c7';
    } else if (cargoType === 'isotope') {
      cargoName = 'Fragile Antimatter Isotope';
      cargoMass = 210;
      cargoColor = '#c084fc';
      cargoAccentColor = '#7c3aed';
    } else if (cargoType === 'magnetic') {
      cargoName = 'Electromagnetic Flux Generator';
      cargoMass = 480;
      cargoColor = '#3b82f6';
      cargoAccentColor = '#1d4ed8';
    } else if (cargoType === 'plasma') {
      cargoName = 'Ionized Plasma Conduit';
      cargoMass = 390;
      cargoColor = '#10b981';
      cargoAccentColor = '#047857';
    }
  }

  // Update pickup platform label based on cargoType
  const pickupLabel =
    cargoType === 'explosive'
      ? 'HEAVY MUNITIONS & BLAST VAULT'
      : cargoType === 'cryogenic'
      ? 'SUB-ZERO CRYO-EXTRACTION BAY'
      : cargoType === 'isotope'
      ? 'QUANTUM ISOTOPE HARVEST STATION'
      : cargoType === 'magnetic'
      ? 'MAGNETIC DYNAMO ASSEMBLY RIG'
      : cargoType === 'plasma'
      ? 'HIGH-ENERGY PLASMA DEPOT'
      : 'ORE & SCIENTIFIC CARGO DEPOT';

  cargoPlatforms[0].label = pickupLabel;
  cargoPlatforms[0].cargoType = cargoType;

  const cargoItems: CargoContainer[] = [
    {
      id: `cargo-container-${seed}`,
      cargoType,
      name: cargoName,
      weightClass: cargoWeightClass,
      mass: cargoMass,
      pos: { x: pickupPadX, y: pickupPadY - 14 },
      vel: { x: 0, y: 0 },
      width: 26,
      height: 20,
      isAttached: false,
      isDelivered: false,
      tetherLength: 54,
      color: cargoColor,
      accentColor: cargoAccentColor,
      pickupPadId: `cargo-pickup-${seed}`,
      integrity: cargoIntegrity,
      temperature: cargoTemperature,
      chargeTimer: cargoChargeTimer,
      maxChargeTimer: cargoChargeTimer,
    },
  ];

  // 10. Multi-Level Connected Cave Zones Metadata
  if (caveZones.length === 0) {
    caveZones.push(
      {
        id: 'zone-lvl1-surface',
        name: 'Launch Mesa & Skyway',
        level: 1,
        bounds: { x1: 0, x2: 7000, y1: 0, y2: 1040 },
        description: 'Upper Stratum flight corridor with launch base and high archway bypasses.',
      },
      {
        id: 'zone-lvl2-nexus',
        name: 'Subterranean Nexus Hub',
        level: 2,
        bounds: { x1: 1500, x2: 7200, y1: 1040, y2: 2100 },
        description: 'Central cavern crossway housing the Research Receiver Bay and connecting shafts.',
      },
      {
        id: 'zone-lvl3-abyss',
        name: 'Sub-Crust Mining Vault',
        level: 3,
        bounds: { x1: 600, x2: 7000, y1: 2100, y2: height },
        description: 'Deep abyssal extraction cavern holding the valuable cargo container.',
      },
      {
        id: 'zone-terminal-dome',
        name: 'Eastern Terminal Basin',
        level: 1,
        bounds: { x1: 7000, x2: width, y1: 0, y2: height },
        description: 'Expedition primary landing destination outpost.',
      }
    );
  }

  // 10b. Generate Strategic Mine-Themed Directional Signposts close to all bases & waypoints
  const signposts: MineSignpost[] = [];

  // Sign 1: Placed right close to the Initial Launch Base, pointing towards the flight route to LZ
  signposts.push({
    id: `sign-launch-${seed}`,
    x: Math.round(launchPadX + 175),
    y: Math.round(launchPadY - 35),
    direction: landingPadX > launchPadX ? 'down_right' : 'down_left',
    targetType: 'landing',
    targetName: 'LZ',
    color: '#22c55e',
    distanceMeters: Math.round(Math.hypot(landingPadX - launchPadX, landingPadY - launchPadY) * 0.1),
  });

  // Sign 2: Placed right close to the Cargo Extraction Depot
  signposts.push({
    id: `sign-cargo-depot-${seed}`,
    x: Math.round(pickupPadX - 135),
    y: Math.round(pickupPadY - 35),
    direction: 'right',
    targetType: 'pickup',
    targetName: 'Cargo Vault',
    color: '#f59e0b',
    distanceMeters: 14,
  });

  // Sign 3: If vehicle depot exists, place sign right close to the Vehicle Depot
  if (planetId === 'zephyr' || planetId === 'tartarus') {
    const vehicleDepotX = Math.round(launchPadX + (pickupPadX - launchPadX) * 0.35 + 200);
    const vehicleDepotY = Math.round(launchPadY + 120);
    signposts.push({
      id: `sign-rover-station-${seed}`,
      x: Math.round(vehicleDepotX - 140),
      y: Math.round(vehicleDepotY - 35),
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'Rover Depot',
      color: '#38bdf8',
      distanceMeters: 15,
    });
  }

  // Sign 4: Placed right close to the Destination Landing Zone (LZ)
  signposts.push({
    id: `sign-destination-lz-${seed}`,
    x: Math.round(landingPadX - 150),
    y: Math.round(landingPadY - 35),
    direction: 'right',
    targetType: 'landing',
    targetName: 'LZ',
    color: '#22c55e',
    distanceMeters: 15,
  });

  // 11. Build Collision Segments
  const segments: TerrainSegment[] = [];

  // Ground segments
  for (let i = 0; i < groundPoints.length - 1; i++) {
    const p1 = groundPoints[i];
    const p2 = groundPoints[i + 1];
    segments.push({ p1, p2, type: 'ground' });
  }

  // Ceiling segments
  for (let i = 0; i < ceilingPoints.length - 1; i++) {
    const p1 = ceilingPoints[i];
    const p2 = ceilingPoints[i + 1];
    segments.push({ p1, p2, type: 'ceiling' });
  }

  // Solid left, right and top perimeter walls
  segments.push({ p1: { x: 50, y: 0 }, p2: { x: 50, y: height }, type: 'wall' });
  segments.push({ p1: { x: width - 50, y: 0 }, p2: { x: width - 50, y: height }, type: 'wall' });
  segments.push({ p1: { x: 0, y: 50 }, p2: { x: width, y: 50 }, type: 'ceiling' });

  // Obstacle segments
  for (const obs of obstacles) {
    for (let j = 0; j < obs.length; j++) {
      const p1 = obs[j];
      const p2 = obs[(j + 1) % obs.length];
      segments.push({ p1, p2, type: 'wall' });
    }
  }

  return {
    width,
    height,
    groundPoints,
    ceilingPoints,
    obstacles,
    segments,
    launchPad,
    landingPad,
    cargoPlatforms,
    cargoItems,
    trucks,
    caveZones,
    signposts,
    pickups,
  };
}
