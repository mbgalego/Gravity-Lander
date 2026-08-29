import { CustomMapData, CargoWeightClass } from '../types';

export interface DifficultyFactor {
  name: string;
  score: number;
  rating: 'Low' | 'Moderate' | 'High' | 'Severe';
  detail: string;
}

export interface DifficultyAnalysisResult {
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  totalScore: number;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  summary: string;
  factors: DifficultyFactor[];
}

/**
 * Calculates the dynamic difficulty tier ('Easy' | 'Medium' | 'Hard' | 'Extreme')
 * for any given CustomMapData based on physical parameters, hazards, navigation,
 * and mission objectives.
 */
export function calculateMapDifficulty(mapData: Partial<CustomMapData>): 'Easy' | 'Medium' | 'Hard' | 'Extreme' {
  return analyzeMapDifficulty(mapData).difficulty;
}

/**
 * Performs a comprehensive multi-factor breakdown of map difficulty.
 * Evaluates:
 * 1. Gravity & Engine Thrust Strain
 * 2. Atmospheric Drag & Turbulence
 * 3. Flight Distance & Vertical Elevation Delta
 * 4. Landing & Launch Pad Clearance Tolerance
 * 5. Cavern Obstacle Density & Structural Geometry
 * 6. Logistics, Cargo Lifts, & Heavy Payload Mass
 * 7. Par Time Tightness & Fuel Supply Scarcity
 */
export function analyzeMapDifficulty(mapData: Partial<CustomMapData>): DifficultyAnalysisResult {
  const gravity = typeof mapData.gravity === 'number' ? mapData.gravity : 1.62;
  const airResistance = typeof mapData.airResistance === 'number' ? mapData.airResistance : 0;
  const fuelBurnRate = typeof mapData.fuelBurnRate === 'number' ? mapData.fuelBurnRate : 4.5;
  const targetTimeSec = typeof mapData.targetTimeSec === 'number' ? mapData.targetTimeSec : 240;

  const lPad = mapData.launchPad || { x: 500, y: 800, width: 260 };
  const tPad = mapData.landingPad || { x: 7500, y: 1200, width: 260 };

  const obstacles = mapData.obstacles || [];
  const groundNodes = mapData.groundNodes || [];
  const ceilingNodes = mapData.ceilingNodes || [];
  const cargoPlatforms = mapData.cargoPlatforms || [];
  const fuelPickups = mapData.fuelPickups || [];
  const volcanoes = mapData.volcanoes || [];

  const factors: DifficultyFactor[] = [];

  // 1. Gravity Factor (0 - 65 pts)
  let gravityScore = 0;
  let gravityRating: DifficultyFactor['rating'] = 'Low';
  let gravityDetail = '';

  if (gravity <= 0.8) {
    gravityScore = 4;
    gravityRating = 'Low';
    gravityDetail = `Micro-gravity (${gravity.toFixed(2)} g) — easy lift, delicate RCS drift`;
  } else if (gravity <= 1.8) {
    gravityScore = 10;
    gravityRating = 'Low';
    gravityDetail = `Lunar baseline (${gravity.toFixed(2)} g) — balanced vertical climb`;
  } else if (gravity <= 3.2) {
    gravityScore = 24;
    gravityRating = 'Moderate';
    gravityDetail = `Medium gravity (${gravity.toFixed(2)} g) — sustained thruster burn required`;
  } else if (gravity <= 4.8) {
    gravityScore = 40;
    gravityRating = 'High';
    gravityDetail = `High planetary pull (${gravity.toFixed(2)} g) — rapid descent acceleration`;
  } else if (gravity <= 6.5) {
    gravityScore = 58;
    gravityRating = 'Severe';
    gravityDetail = `Crushing gravity (${gravity.toFixed(2)} g) — extreme deceleration load`;
  } else {
    gravityScore = 75;
    gravityRating = 'Severe';
    gravityDetail = `Hyper-gravity anomaly (${gravity.toFixed(2)} g) — lethal gravitational field`;
  }

  factors.push({
    name: 'Planetary Gravity',
    score: gravityScore,
    rating: gravityRating,
    detail: gravityDetail,
  });

  // 2. Atmospheric Drag & Fuel Consumption (0 - 30 pts)
  let atmScore = 0;
  let atmRating: DifficultyFactor['rating'] = 'Low';
  let atmDetail = '';

  if (airResistance <= 0.0001) {
    atmScore = 0;
    atmRating = 'Low';
    atmDetail = 'Complete vacuum — zero aerodynamic drag';
  } else if (airResistance <= 0.0015) {
    atmScore = 6;
    atmRating = 'Moderate';
    atmDetail = `Thin atmosphere (${(airResistance * 1000).toFixed(1)} mbar) — mild velocity decay`;
  } else if (airResistance <= 0.004) {
    atmScore = 14;
    atmRating = 'High';
    atmDetail = `Dense atmosphere (${(airResistance * 1000).toFixed(1)} mbar) — strong drag resistance`;
  } else {
    atmScore = 24;
    atmRating = 'Severe';
    atmDetail = `Hyper-dense atmosphere (${(airResistance * 1000).toFixed(1)} mbar) — severe atmospheric resistance`;
  }

  if (fuelBurnRate > 20) {
    atmScore += 8;
    atmDetail += ` + rapid fuel drain (${fuelBurnRate}x)`;
  }

  factors.push({
    name: 'Atmosphere & Drag',
    score: atmScore,
    rating: atmRating,
    detail: atmDetail,
  });

  // 3. Navigation & Spatial Flight Distance (0 - 35 pts)
  const dx = Math.abs(tPad.x - lPad.x);
  const dy = Math.abs(tPad.y - lPad.y);
  const euclideanDist = Math.hypot(dx, dy);

  let navScore = 0;
  let navRating: DifficultyFactor['rating'] = 'Low';
  let navDetail = '';

  if (euclideanDist < 2500) {
    navScore = 4;
    navRating = 'Low';
    navDetail = `Short hop (${Math.round(euclideanDist)}m span)`;
  } else if (euclideanDist < 5200) {
    navScore = 12;
    navRating = 'Moderate';
    navDetail = `Standard cross-cavern transit (${Math.round(euclideanDist)}m span)`;
  } else if (euclideanDist < 8500) {
    navScore = 20;
    navRating = 'High';
    navDetail = `Long-range subterranean expedition (${Math.round(euclideanDist)}m span)`;
  } else {
    navScore = 30;
    navRating = 'Severe';
    navDetail = `Colossal deep-core trek (${Math.round(euclideanDist)}m span)`;
  }

  if (dy > 1400) {
    navScore += 8;
    navDetail += ` + steep vertical ascent/descent (${Math.round(dy)}m)`;
  }

  factors.push({
    name: 'Flight Distance & Depth',
    score: navScore,
    rating: navRating,
    detail: navDetail,
  });

  // 4. Landing Pad Precision & Touchdown Margin (-6 to +20 pts)
  let padScore = 0;
  let padRating: DifficultyFactor['rating'] = 'Low';
  let padDetail = '';

  const padWidth = tPad.width || 260;
  if (padWidth >= 320) {
    padScore = -4;
    padRating = 'Low';
    padDetail = `Generous landing deck (${padWidth}m width) — wide touchdown tolerance`;
  } else if (padWidth >= 220) {
    padScore = 2;
    padRating = 'Low';
    padDetail = `Standard LZ platform (${padWidth}m width)`;
  } else if (padWidth >= 160) {
    padScore = 10;
    padRating = 'Moderate';
    padDetail = `Narrow landing pad (${padWidth}m width) — requires precision alignment`;
  } else {
    padScore = 20;
    padRating = 'Severe';
    padDetail = `Micro-perch landing target (${padWidth}m width) — zero error margin`;
  }

  factors.push({
    name: 'Landing Deck Tolerance',
    score: padScore,
    rating: padRating,
    detail: padDetail,
  });

  // 5. Cavern Geometry & Obstacle Density (0 - 35 pts)
  let obsScore = 0;
  let obsRating: DifficultyFactor['rating'] = 'Low';
  let obsDetail = '';

  const obsCount = obstacles.length;
  let totalObstaclePoints = 0;
  for (const obs of obstacles) {
    totalObstaclePoints += (obs.points || []).length;
  }

  if (obsCount === 0) {
    obsScore = 0;
    obsRating = 'Low';
    obsDetail = 'Open flight corridor — no internal cave obstructions';
  } else if (obsCount <= 3) {
    obsScore = 8;
    obsRating = 'Moderate';
    obsDetail = `${obsCount} cavern obstacles/rock formations`;
  } else if (obsCount <= 7) {
    obsScore = 16;
    obsRating = 'High';
    obsDetail = `${obsCount} cavern obstacles with structural pinch points`;
  } else {
    obsScore = 28;
    obsRating = 'Severe';
    obsDetail = `${obsCount} dense obstacle structures with narrow labyrinths`;
  }

  const complexNodes = (groundNodes.length + ceilingNodes.length);
  if (complexNodes > 35) {
    obsScore += 6;
    obsDetail += ` + jagged multi-tiered cave geometry (${complexNodes} nodes)`;
  }

  if (volcanoes.length > 0) {
    obsScore += volcanoes.length * 8;
    obsDetail += ` + ${volcanoes.length} active volcanic eruption peak${volcanoes.length > 1 ? 's' : ''}`;
    if (obsRating === 'Low') obsRating = 'Moderate';
    else if (obsRating === 'Moderate') obsRating = 'High';
    else obsRating = 'Severe';
  }

  factors.push({
    name: 'Cavern Obstacles & Hazards',
    score: obsScore,
    rating: obsRating,
    detail: obsDetail,
  });

  // 6. Mission Objectives & Heavy Cargo Logistics (0 - 40 pts)
  let missionScore = 0;
  let missionRating: DifficultyFactor['rating'] = 'Low';
  let missionDetail = '';

  const pickups = cargoPlatforms.filter((cp) => cp.type === 'pickup');
  const depots = cargoPlatforms.filter((cp) => cp.type === 'vehicle_depot');

  if (pickups.length === 0 && depots.length === 0) {
    missionScore = 0;
    missionRating = 'Low';
    missionDetail = 'Direct transit — no cargo retrieval required';
  } else {
    let heavyCount = 0;
    let mediumCount = 0;
    let lightCount = 0;

    for (const p of pickups) {
      const w = (p.weightClass as CargoWeightClass) || 'medium';
      if (w === 'heavy') heavyCount++;
      else if (w === 'light') lightCount++;
      else mediumCount++;
    }

    missionScore += lightCount * 6;
    missionScore += mediumCount * 12;
    missionScore += heavyCount * 22;
    missionScore += depots.length * 8;

    const parts: string[] = [];
    if (heavyCount > 0) parts.push(`${heavyCount} Heavy Cargo Pod${heavyCount > 1 ? 's' : ''}`);
    if (mediumCount > 0) parts.push(`${mediumCount} Medium Cargo Pod${mediumCount > 1 ? 's' : ''}`);
    if (lightCount > 0) parts.push(`${lightCount} Light Cargo Pod${lightCount > 1 ? 's' : ''}`);
    if (depots.length > 0) parts.push(`${depots.length} Vehicle Logistics Depot${depots.length > 1 ? 's' : ''}`);

    missionDetail = `Mandatory objectives: ${parts.join(', ')}`;
    missionRating = heavyCount > 0 || pickups.length >= 2 ? 'High' : 'Moderate';
  }

  factors.push({
    name: 'Cargo & Mission Tasks',
    score: missionScore,
    rating: missionRating,
    detail: missionDetail,
  });

  // 7. Par Time Pressure & Fuel Availability (-6 to +15 pts)
  let fuelScore = 0;
  let fuelRating: DifficultyFactor['rating'] = 'Low';
  let fuelDetail = '';

  if (fuelPickups.length >= 2) {
    fuelScore = -5;
    fuelRating = 'Low';
    fuelDetail = `${fuelPickups.length} auxiliary fuel stations available along route`;
  } else if (fuelPickups.length === 1) {
    fuelScore = 0;
    fuelRating = 'Low';
    fuelDetail = '1 intermediate refueling outpost';
  } else {
    if (euclideanDist > 5000) {
      fuelScore = 10;
      fuelRating = 'Moderate';
      fuelDetail = 'Zero fuel stations on long voyage — strict propellant management';
    } else {
      fuelScore = 2;
      fuelRating = 'Low';
      fuelDetail = 'Standard ship tank capacity adequate for route';
    }
  }

  if (targetTimeSec < 90 && euclideanDist > 4000) {
    fuelScore += 8;
    fuelDetail += ` + aggressive ${targetTimeSec}s par speed run`;
    fuelRating = 'High';
  }

  factors.push({
    name: 'Fuel & Time Constraints',
    score: fuelScore,
    rating: fuelRating,
    detail: fuelDetail,
  });

  // Aggregate Total Score
  const totalScore = Math.max(
    0,
    gravityScore + atmScore + navScore + padScore + obsScore + missionScore + fuelScore
  );

  let difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  let color = '#22c55e';
  let badgeBg = 'bg-emerald-950/70';
  let badgeBorder = 'border-emerald-500';
  let badgeText = 'text-emerald-300';
  let summary = '';

  if (totalScore < 36) {
    difficulty = 'Easy';
    color = '#22c55e';
    badgeBg = 'bg-emerald-950/70';
    badgeBorder = 'border-emerald-500';
    badgeText = 'text-emerald-300';
    summary = 'Forgiving gravity and clear flight corridors. Ideal for training and smooth piloting.';
  } else if (totalScore < 72) {
    difficulty = 'Medium';
    color = '#f59e0b';
    badgeBg = 'bg-amber-950/70';
    badgeBorder = 'border-amber-500';
    badgeText = 'text-amber-300';
    summary = 'Moderate planetary pull with cargo handling or atmospheric resistance requiring steady throttle control.';
  } else if (totalScore < 108) {
    difficulty = 'Hard';
    color = '#f97316';
    badgeBg = 'bg-orange-950/70';
    badgeBorder = 'border-orange-500';
    badgeText = 'text-orange-300';
    summary = 'High gravity or dense hazard layout with heavy cargo requirements. Strict fuel vectoring required.';
  } else {
    difficulty = 'Extreme';
    color = '#ef4444';
    badgeBg = 'bg-rose-950/70';
    badgeBorder = 'border-rose-500';
    badgeText = 'text-rose-300';
    summary = 'Extreme gravitational crushing, heavy payloads, narrow LZ clearance, or labyrinthine obstacles. Elite commanders only.';
  }

  return {
    difficulty,
    totalScore,
    color,
    badgeBg,
    badgeBorder,
    badgeText,
    summary,
    factors,
  };
}
