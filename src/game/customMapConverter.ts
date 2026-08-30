import {
  CustomMapData,
  CustomMapTheme,
  WorldMap,
  PlanetConfig,
  TerrainPoint,
  TerrainSegment,
  LandingPad,
  FuelPickup,
  PlanetaryTruck,
  CustomObstacleData,
  CustomFuelData,
  CustomCargoPlatformData,
  CustomSignpostData,
  CustomTextNoteData,
  MapTextNote,
  VolcanicRock,
  VolcanoHazard,
} from '../types';
import { generateWorld } from './procedural';
import {
  OFFICIAL_LUNA_MAP,
  OFFICIAL_TITAN_MAP,
  OFFICIAL_ARES_MAP,
  OFFICIAL_VESTA_MAP,
  OFFICIAL_PHOBOS_MAP,
  OFFICIAL_EUROPA_MAP,
  OFFICIAL_CERES_MAP,
  OFFICIAL_GLACIES_MAP,
  OFFICIAL_VESPERA_MAP,
  OFFICIAL_CALYPSO_MAP,
  OFFICIAL_ZEPHYR_MAP,
  OFFICIAL_TARTARUS_MAP,
} from '../utils/customMapsStorage';

export const CUSTOM_THEMES: Record<string, CustomMapTheme> = {
  blue: {
    id: 'blue',
    name: 'Cobalt Caverns',
    skyTop: '#030712',
    skyBottom: '#0c192e',
    terrainFill: '#0f172a',
    terrainBorder: '#38bdf8',
    terrainAccent: '#0284c7',
    gridColor: 'rgba(56, 189, 248, 0.07)',
    dustColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.15)',
    starDensity: 1.2,
  },
  volcanic: {
    id: 'volcanic',
    name: 'Inferno Fissure',
    skyTop: '#180505',
    skyBottom: '#2d0a0a',
    terrainFill: '#1c1313',
    terrainBorder: '#f87171',
    terrainAccent: '#ef4444',
    gridColor: 'rgba(248, 113, 113, 0.08)',
    dustColor: '#f97316',
    glowColor: 'rgba(239, 68, 68, 0.2)',
    starDensity: 0.9,
  },
  emerald: {
    id: 'emerald',
    name: 'Toxic Canopy',
    skyTop: '#021a10',
    skyBottom: '#062d1c',
    terrainFill: '#0b2318',
    terrainBorder: '#34d399',
    terrainAccent: '#10b981',
    gridColor: 'rgba(52, 211, 153, 0.07)',
    dustColor: '#6ee7b7',
    glowColor: 'rgba(16, 185, 129, 0.18)',
    starDensity: 1.1,
  },
  violet: {
    id: 'violet',
    name: 'Void Nebula',
    skyTop: '#0a0316',
    skyBottom: '#190a33',
    terrainFill: '#160d26',
    terrainBorder: '#c084fc',
    terrainAccent: '#a855f7',
    gridColor: 'rgba(192, 132, 252, 0.07)',
    dustColor: '#e879f9',
    glowColor: 'rgba(168, 85, 247, 0.18)',
    starDensity: 1.4,
  },
  amber: {
    id: 'amber',
    name: 'Martian Canyon',
    skyTop: '#140c03',
    skyBottom: '#2b1a06',
    terrainFill: '#1f160e',
    terrainBorder: '#fbbf24',
    terrainAccent: '#f59e0b',
    gridColor: 'rgba(251, 191, 36, 0.07)',
    dustColor: '#fde68a',
    glowColor: 'rgba(245, 158, 11, 0.16)',
    starDensity: 1.0,
  },
};

/**
 * Interpolates discrete control nodes into dense 2D collision paths.
 * Supports both:
 * 1. 'straight': Crisp, linear polygonal geometry between nodes (ideal for caves, shafts, overhangs, and sharp terrain).
 * 2. 'curved': Centripetal Catmull-Rom cubic spline interpolation for organic rolling hills.
 */
export function interpolateParametricPath(
  nodes: TerrainPoint[],
  width: number,
  defaultY = 1500,
  maxStep = 28,
  lineStyle: 'straight' | 'curved' = 'straight'
): TerrainPoint[] {
  if (!nodes || nodes.length === 0) {
    return [
      { x: 0, y: defaultY },
      { x: width, y: defaultY },
    ];
  }

  if (nodes.length === 1) {
    return [
      { x: 0, y: nodes[0].y },
      { x: width, y: nodes[0].y },
    ];
  }

  // Ensure path spans from west to east boundaries if it starts/ends near edges
  const fullNodes = [...nodes];
  if (fullNodes[0].x > 60) {
    fullNodes.unshift({ x: 0, y: fullNodes[0].y });
  }
  if (fullNodes[fullNodes.length - 1].x < width - 60) {
    fullNodes.push({ x: width, y: fullNodes[fullNodes.length - 1].y });
  }

  const n = fullNodes.length;
  const result: TerrainPoint[] = [];

  if (lineStyle === 'straight') {
    // Exact straight lines between control vertices, subdivided finely for accurate physics & collision
    for (let i = 0; i < n - 1; i++) {
      const p1 = fullNodes[i];
      const p2 = fullNodes[i + 1];
      const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const steps = Math.max(1, Math.ceil(segDist / maxStep));

      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        result.push({
          x: p1.x + (p2.x - p1.x) * t,
          y: p1.y + (p2.y - p1.y) * t,
        });
      }
    }
    result.push(fullNodes[n - 1]);
    return result;
  }

  // Curved: Centripetal Catmull-Rom cubic spline interpolation
  for (let i = 0; i < n - 1; i++) {
    const p0 = i > 0 ? fullNodes[i - 1] : fullNodes[0];
    const p1 = fullNodes[i];
    const p2 = fullNodes[i + 1];
    const p3 = i + 2 < n ? fullNodes[i + 2] : fullNodes[i + 1];

    const segDist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const steps = Math.max(2, Math.ceil(segDist / maxStep));

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );

      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );

      result.push({ x, y });
    }
  }

  // Push the final endpoint
  result.push(fullNodes[n - 1]);
  return result;
}

export function convertCustomMapToWorld(customMap: CustomMapData): WorldMap {
  const width = customMap.worldWidth || 7200;
  const height = customMap.worldHeight || 2400;
  const lineStyle = customMap.terrainLineStyle || 'straight';

  // 1. Interpolate ground & ceiling using selected mode ('straight' lines for caves or 'curved' splines)
  const rawGround = interpolateParametricPath(customMap.groundNodes, width, height * 0.75, 28, lineStyle);
  const rawCeiling = interpolateParametricPath(customMap.ceilingNodes, width, 100, 28, lineStyle);

  const lPad = customMap.launchPad;
  const tPad = customMap.landingPad;

  // Flatten pads
  const groundPoints = rawGround.map((pt) => {
    let y = pt.y;
    // Flatten launch pad area
    if (pt.x >= lPad.x - lPad.width * 0.55 && pt.x <= lPad.x + lPad.width * 0.55 && Math.abs(pt.y - lPad.y) < 300) {
      y = lPad.y;
    }
    // Flatten landing pad area
    if (pt.x >= tPad.x - tPad.width * 0.55 && pt.x <= tPad.x + tPad.width * 0.55 && Math.abs(pt.y - tPad.y) < 300) {
      y = tPad.y;
    }
    return { x: pt.x, y: Math.max(50, Math.min(height - 30, y)) };
  });

  const ceilingPoints = rawCeiling.map((pt) => {
    let y = pt.y;
    return { x: pt.x, y: Math.max(50, Math.min(height - 100, y)) };
  });

  // 2. Build obstacles array
  const obstacles: TerrainPoint[][] = customMap.obstacles.map((obs) => obs.points);

  // 3. Collision segments
  const segments: TerrainSegment[] = [];

  // Ground segments
  for (let i = 0; i < groundPoints.length - 1; i++) {
    const p1 = groundPoints[i];
    const p2 = groundPoints[i + 1];
    const midX = (p1.x + p2.x) * 0.5;

    const isLaunchPad = midX >= lPad.x - lPad.width / 2 && midX <= lPad.x + lPad.width / 2;
    const isLandingPad = midX >= tPad.x - tPad.width / 2 && midX <= tPad.x + tPad.width / 2;

    let type: TerrainSegment['type'] = 'ground';
    if (isLaunchPad) type = 'launch_pad';
    else if (isLandingPad) type = 'landing_pad';

    segments.push({ p1, p2, type });
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

  // 4. Launch & Landing Pads
  const launchPad: LandingPad = {
    x1: lPad.x - lPad.width / 2,
    x2: lPad.x + lPad.width / 2,
    y: lPad.y,
    width: lPad.width,
    center: { x: lPad.x, y: lPad.y },
  };

  const landingPad: LandingPad = {
    x1: tPad.x - tPad.width / 2,
    x2: tPad.x + tPad.width / 2,
    y: tPad.y,
    width: tPad.width,
    center: { x: tPad.x, y: tPad.y },
  };

  // 5. Pickups
  const pickups: FuelPickup[] = (customMap.fuelPickups || []).map((f) => ({
    id: f.id,
    x: f.x,
    y: f.y,
    radius: 20,
    amount: f.amount || 65,
    collected: false,
  }));

  // 6. Cargo Platforms & Containers
  const cargoPlatforms: WorldMap['cargoPlatforms'] = (customMap.cargoPlatforms || [])
    .filter((cp) => (cp.type as string) !== 'drop_zone')
    .map((cp) => ({
      id: cp.id,
      type: cp.type,
      x1: cp.x - cp.width / 2,
      x2: cp.x + cp.width / 2,
      y: cp.y,
      width: cp.width,
      center: { x: cp.x, y: cp.y },
      isFulfilled: false,
      weightClass: cp.weightClass || (cp.type === 'pickup' ? 'medium' : undefined),
      cargoType: cp.cargoType || 'standard',
      label: cp.label || (cp.type === 'pickup' ? 'CARGO DEPOT' : 'LOGISTICS DEPOT'),
    }));

  const cargoItems: WorldMap['cargoItems'] = [];
  const trucks: PlanetaryTruck[] = [];

  for (const cp of cargoPlatforms) {
    // Add solid landing segment for platform deck
    segments.push({
      p1: { x: cp.x1, y: cp.y },
      p2: { x: cp.x2, y: cp.y },
      type: 'ground',
    });

    if (cp.type === 'pickup') {
      const weight = cp.weightClass || 'medium';
      const cType = cp.cargoType || 'standard';
      
      let mass = weight === 'heavy' ? 650 : weight === 'light' ? 140 : 320;
      let name = `${weight.toUpperCase()} POD`;
      let color = weight === 'heavy' ? '#ef4444' : weight === 'light' ? '#38bdf8' : '#f59e0b';
      let accentColor = weight === 'heavy' ? '#991b1b' : weight === 'light' ? '#0284c7' : '#b45309';
      let integrity = 100;
      let temperature = 0;
      let chargeTimer = 60;

      if (cType === 'explosive') {
        name = 'High-Explosive Munitions Crate';
        mass = 650;
        color = '#f59e0b';
        accentColor = '#dc2626';
      } else if (cType === 'cryogenic') {
        name = 'Sub-Zero Biological Specimen';
        mass = 380;
        color = '#67e8f9';
        accentColor = '#06b6d4';
        temperature = 0;
      } else if (cType === 'isotope') {
        name = 'Unstable Quantum Isotope';
        mass = 180;
        color = '#c084fc';
        accentColor = '#9333ea';
        integrity = 100;
      } else if (cType === 'magnetic') {
        name = 'Superconducting Magnetic Core';
        mass = 520;
        color = '#fb923c';
        accentColor = '#ea580c';
      } else if (cType === 'plasma') {
        name = 'High-Voltage Plasma Battery';
        mass = 420;
        color = '#2dd4bf';
        accentColor = '#059669';
        chargeTimer = 60;
      }

      cargoItems.push({
        id: `cargo-${cp.id}`,
        platformId: cp.id,
        name,
        weightClass: weight,
        cargoType: cType,
        mass,
        pos: { x: cp.center.x, y: cp.y - 15 },
        vel: { x: 0, y: 0 },
        width: 24,
        height: 18,
        isAttached: false,
        isDelivered: false,
        tetherLength: 55,
        color,
        accentColor,
        integrity,
        temperature,
        chargeTimer,
        maxChargeTimer: 60,
      });
    } else if (cp.type === 'vehicle_depot') {
      trucks.push(
        {
          id: `truck-custom-1-${cp.id}`,
          name: 'Custom Rover Transporter',
          type: 'rover',
          pos: { x: cp.center.x - 170, y: cp.y - 14 },
          vel: { x: 0, y: 0 },
          width: 52,
          height: 26,
          state: 'waiting_at_depot',
          progress: 0,
          baseX: cp.center.x - 170,
          baseY: cp.y - 14,
          targetX: landingPad.center.x - 60,
          targetY: landingPad.y - 14,
          color: '#f59e0b',
          accentColor: '#1e293b',
          wheelAngle: 0,
          headlightsOn: true,
        },
        {
          id: `truck-custom-2-${cp.id}`,
          name: 'Custom Mining Truck',
          type: 'heavy_truck',
          pos: { x: cp.center.x - 95, y: cp.y - 17 },
          vel: { x: 0, y: 0 },
          width: 64,
          height: 32,
          state: 'waiting_at_depot',
          progress: 0,
          baseX: cp.center.x - 95,
          baseY: cp.y - 17,
          targetX: landingPad.center.x + 60,
          targetY: landingPad.y - 17,
          color: '#0284c7',
          accentColor: '#0f172a',
          wheelAngle: 0,
          headlightsOn: true,
        }
      );
    }
  }

  // 7. Tactical Waypoint Signposts
  const signposts: WorldMap['signposts'] = (customMap.signposts || []).map((sp) => ({
    id: sp.id,
    x: sp.x,
    y: sp.y,
    direction: sp.direction,
    targetType: sp.targetType,
    targetName: sp.targetName,
    subText: sp.subText,
    color: sp.color || '#22c55e',
    distanceMeters: sp.distanceMeters ?? Math.round(Math.hypot(landingPad.center.x - sp.x, landingPad.y - sp.y) * 0.1),
  }));

  // 8. Map Text Notes
  const textNotes: WorldMap['textNotes'] = (customMap.textNotes || []).map((tn) => ({
    id: tn.id,
    x: tn.x,
    y: tn.y,
    text: tn.text,
    size: tn.size || 'medium',
    color: tn.color || '#38bdf8',
    style: tn.style || 'monospace',
    showBorder: tn.showBorder ?? true,
    align: tn.align || 'center',
  }));

  // 9. Active Volcanoes
  const volcanoes: WorldMap['volcanoes'] = (customMap.volcanoes || []).map((v, vIndex) => {
    const width = v.width || 260;
    const height = v.height || 160;
    const calderaWidth = v.calderaWidth || Math.round(width * 0.38);
    const eruptionHeight = v.eruptionHeight || Math.round(height * 2.0);
    const interval = v.eruptionInterval ?? v.interval ?? 4.5;
    const duration = v.eruptionDuration ?? v.duration ?? 1.8;
    const hazardRadius = v.hazardRadius || Math.round(calderaWidth * 0.7);
    const colorTheme = v.colorTheme || 'magma';

    // Stagger initial cycle timers so multiple volcanoes don't all erupt at identical sub-seconds
    const cycleTimer = (vIndex * 1.6) % interval;

    // Solid mountain cone collision segments
    const leftBase = { x: v.x - width * 0.5, y: v.y };
    const rightBase = { x: v.x + width * 0.5, y: v.y };
    const leftRim = { x: v.x - calderaWidth * 0.5, y: v.y - height };
    const rightRim = { x: v.x + calderaWidth * 0.5, y: v.y - height };

    segments.push({ p1: leftBase, p2: leftRim, type: 'ground' });
    segments.push({ p1: rightRim, p2: rightBase, type: 'ground' });

    // Pool of volcanic rocks
    const rockCount = 14;
    const rocks: VolcanicRock[] = Array.from({ length: rockCount }, (_, i) => ({
      id: i,
      x: v.x,
      y: v.y - height,
      vx: 0,
      vy: 0,
      size: 4 + (i % 5) * 1.5,
      rotation: 0,
      rotSpeed: 0,
      life: 0,
      maxLife: 2.5,
      color: '#fb923c',
      glowColor: '#ef4444',
      active: false,
    }));

    return {
      id: v.id,
      name: v.name || `Volcano ${vIndex + 1}`,
      x: v.x,
      y: v.y,
      width,
      height,
      calderaWidth,
      eruptionHeight,
      interval,
      duration,
      hazardRadius,
      colorTheme,
      cycleTimer,
      isErupting: false,
      isCharging: false,
      eruptPhase: 0,
      rocks,
    };
  });

  return {
    width,
    height,
    groundPoints,
    ceilingPoints,
    obstacles,
    obstacleObjects: (customMap.obstacles || []).map((obs) => ({
      points: obs.points,
      type: obs.type,
      name: obs.name,
    })),
    segments,
    launchPad,
    landingPad,
    cargoPlatforms,
    cargoItems,
    trucks,
    pickups,
    signposts,
    textNotes,
    volcanoes,
  };
}

export function convertCustomMapToPlanet(customMap: CustomMapData): PlanetConfig {
  const theme =
    customMap.customTheme ||
    CUSTOM_THEMES[customMap.themeId] ||
    CUSTOM_THEMES.blue;

  return {
    id: `custom-${customMap.id}`,
    name: customMap.name || 'Custom World',
    category: `USER MAP • By ${customMap.author || 'Commander'}`,
    description: customMap.description || 'A custom crafted landing zone expedition.',
    gravity: customMap.gravity || 3.5,
    airResistance: customMap.airResistance ?? 0.001,
    fuelBurnRate: customMap.fuelBurnRate || 20,
    seed: 99999,
    targetTimeSec: customMap.targetTimeSec || 135,
    difficulty: customMap.difficulty || 'Medium',
    theme: {
      skyTop: theme.skyTop,
      skyBottom: theme.skyBottom,
      terrainFill: theme.terrainFill,
      terrainBorder: theme.terrainBorder,
      terrainAccent: theme.terrainAccent,
      gridColor: theme.gridColor,
      dustColor: theme.dustColor,
      starDensity: theme.starDensity,
      glowColor: theme.glowColor,
    },
  };
}

/**
 * Converts any official default planet (Luna, Ares, Titan, etc.) into an editable CustomMapData object
 * so users or creators can edit it in the Map Editor and export/save their revisions.
 */
export function convertOfficialPlanetToCustomMap(planet: PlanetConfig): CustomMapData {
  if (planet.id === 'luna' || planet.id === 'official-luna') {
    return JSON.parse(JSON.stringify(OFFICIAL_LUNA_MAP));
  }
  if (planet.id === 'titan' || planet.id === 'official-titan') {
    return JSON.parse(JSON.stringify(OFFICIAL_TITAN_MAP));
  }
  if (planet.id === 'ares' || planet.id === 'official-ares') {
    return JSON.parse(JSON.stringify(OFFICIAL_ARES_MAP));
  }
  if (planet.id === 'vesta' || planet.id === 'official-vesta') {
    return JSON.parse(JSON.stringify(OFFICIAL_VESTA_MAP));
  }
  if (planet.id === 'phobos' || planet.id === 'official-phobos') {
    return JSON.parse(JSON.stringify(OFFICIAL_PHOBOS_MAP));
  }
  if (planet.id === 'europa' || planet.id === 'official-europa') {
    return JSON.parse(JSON.stringify(OFFICIAL_EUROPA_MAP));
  }
  if (planet.id === 'ceres' || planet.id === 'official-ceres') {
    return JSON.parse(JSON.stringify(OFFICIAL_CERES_MAP));
  }
  if (planet.id === 'glacies' || planet.id === 'official-glacies') {
    return JSON.parse(JSON.stringify(OFFICIAL_GLACIES_MAP));
  }
  if (planet.id === 'vespera' || planet.id === 'official-vespera') {
    return JSON.parse(JSON.stringify(OFFICIAL_VESPERA_MAP));
  }
  if (planet.id === 'calypso' || planet.id === 'official-calypso') {
    return JSON.parse(JSON.stringify(OFFICIAL_CALYPSO_MAP));
  }
  if (planet.id === 'zephyr' || planet.id === 'official-zephyr') {
    return JSON.parse(JSON.stringify(OFFICIAL_ZEPHYR_MAP));
  }
  if (planet.id === 'tartarus' || planet.id === 'official-tartarus') {
    return JSON.parse(JSON.stringify(OFFICIAL_TARTARUS_MAP));
  }

  const worldWidth = 8600;
  const worldHeight = 3200;
  const world = generateWorld(planet.seed, worldWidth, worldHeight, planet.id);

  // Sample ground points smoothly (every 4 steps = 128px) to capture the authentic contours & drops
  const groundNodes: TerrainPoint[] = [];
  const gStep = 4;
  for (let i = 0; i < world.groundPoints.length; i += gStep) {
    groundNodes.push({
      x: Math.round(world.groundPoints[i].x),
      y: Math.round(world.groundPoints[i].y),
    });
  }
  const lastG = world.groundPoints[world.groundPoints.length - 1];
  if (lastG && (groundNodes.length === 0 || groundNodes[groundNodes.length - 1].x !== lastG.x)) {
    groundNodes.push({ x: Math.round(lastG.x), y: Math.round(lastG.y) });
  }

  // Sample ceiling points smoothly (every 4 steps = 128px)
  const ceilingNodes: TerrainPoint[] = [];
  for (let i = 0; i < world.ceilingPoints.length; i += gStep) {
    ceilingNodes.push({
      x: Math.round(world.ceilingPoints[i].x),
      y: Math.round(world.ceilingPoints[i].y),
    });
  }
  const lastC = world.ceilingPoints[world.ceilingPoints.length - 1];
  if (lastC && (ceilingNodes.length === 0 || ceilingNodes[ceilingNodes.length - 1].x !== lastC.x)) {
    ceilingNodes.push({ x: Math.round(lastC.x), y: Math.round(lastC.y) });
  }

  // Map all actual geological obstacles (mesas, arched bridges, spires, rock islands, dividers)
  const obstacles: CustomObstacleData[] = world.obstacles.map((poly, idx) => ({
    id: `obs-${planet.id}-${idx + 1}`,
    name: `Geological Formation ${idx + 1}`,
    type: 'polygon',
    points: poly.map((pt) => ({ x: Math.round(pt.x), y: Math.round(pt.y) })),
  }));

  // Launch pad center & width
  const launchPad = {
    x: Math.round((world.launchPad.x1 + world.launchPad.x2) * 0.5),
    y: Math.round(world.launchPad.y),
    width: Math.round(world.launchPad.width),
  };

  // Landing pad center & width
  const landingPad = {
    x: Math.round((world.landingPad.x1 + world.landingPad.x2) * 0.5),
    y: Math.round(world.landingPad.y),
    width: Math.round(world.landingPad.width),
  };

  // Cargo platforms & vehicle depots
  const cargoPlatforms: CustomCargoPlatformData[] = (world.cargoPlatforms || []).map((plat) => ({
    id: plat.id,
    type: plat.type,
    label: plat.label,
    x: Math.round(plat.center.x),
    y: Math.round(plat.center.y),
    width: Math.round(plat.width),
    weightClass: plat.weightClass || plat.cargoWeight,
    truckCount: plat.truckCount,
  }));

  // Fuel pickups
  const fuelPickups: CustomFuelData[] = world.pickups.map((p, idx) => ({
    id: p.id || `fuel-${idx + 1}`,
    x: Math.round(p.x),
    y: Math.round(p.y),
    amount: Math.round(p.amount),
  }));

  // Directional Signposts & Base clues
  const signposts: CustomSignpostData[] = (world.signposts || []).map((sp) => ({
    id: sp.id,
    x: Math.round(sp.x),
    y: Math.round(sp.y),
    direction: sp.direction,
    targetType: sp.targetType,
    targetName: sp.targetName,
    subText: sp.subText,
    color: sp.color,
    distanceMeters: sp.distanceMeters,
  }));

  // Map Text Notes
  const textNotes: CustomTextNoteData[] = (world.textNotes || []).map((tn) => ({
    id: tn.id,
    x: Math.round(tn.x),
    y: Math.round(tn.y),
    text: tn.text,
    size: tn.size,
    color: tn.color,
    style: tn.style,
    showBorder: tn.showBorder,
    align: tn.align || 'center',
  }));

  // Theme configuration matching the official planet visuals
  const customTheme: CustomMapTheme = {
    id: `theme-${planet.id}`,
    name: `${planet.name} Atmosphere`,
    skyTop: planet.theme.skyTop,
    skyBottom: planet.theme.skyBottom,
    terrainFill: planet.theme.terrainFill,
    terrainBorder: planet.theme.terrainBorder,
    terrainAccent: planet.theme.terrainAccent,
    gridColor: planet.theme.gridColor || 'rgba(56, 189, 248, 0.07)',
    dustColor: planet.theme.dustColor || '#38bdf8',
    glowColor: planet.theme.glowColor || 'rgba(56, 189, 248, 0.2)',
    starDensity: 1.2,
  };

  return {
    id: `official-${planet.id}`,
    name: planet.name,
    description: planet.description,
    author: 'Planetary Federation',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    themeId: 'custom',
    customTheme,
    terrainLineStyle: 'straight',
    worldWidth,
    worldHeight,
    gravity: planet.gravity,
    airResistance: planet.airResistance,
    fuelBurnRate: planet.fuelBurnRate,
    targetTimeSec: planet.targetTimeSec,
    difficulty: planet.difficulty,
    launchPad,
    landingPad,
    groundNodes,
    ceilingNodes,
    obstacles,
    fuelPickups,
    cargoPlatforms,
    signposts,
    textNotes,
  };
}
