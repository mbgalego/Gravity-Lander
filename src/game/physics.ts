import { ShipState, WorldMap, PlanetConfig, Vector2D, ShipModelId, CargoContainer, CargoDeliveryReport } from '../types';
import { getShipConfig } from './ships';
import { saveMissionScore } from '../utils/scoreStorage';
import { checkMedals } from '../utils/medals';
import { checkLandingAchievements, unlockAchievement } from '../utils/achievements';
import { triggerCargoHazardAlert } from '../utils/cargoAlerts';
import { sound } from './sound';
import { ParticleSystem } from './particles';

export function rotatePoint(pt: Vector2D, angle: number): Vector2D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: pt.x * cos - pt.y * sin,
    y: pt.x * sin + pt.y * cos,
  };
}

export function transformPoint(pt: Vector2D, center: Vector2D, angle: number): Vector2D {
  const rotated = rotatePoint(pt, angle);
  return {
    x: center.x + rotated.x,
    y: center.y + rotated.y,
  };
}

export function getShipWorldPoints(ship: ShipState) {
  const config = getShipConfig(ship.modelId);
  const lp = config.localPoints;
  return {
    nose: transformPoint(lp.nose, ship.pos, ship.angle),
    leftShoulder: transformPoint(lp.leftShoulder, ship.pos, ship.angle),
    rightShoulder: transformPoint(lp.rightShoulder, ship.pos, ship.angle),
    leftHip: transformPoint(lp.leftHip, ship.pos, ship.angle),
    rightHip: transformPoint(lp.rightHip, ship.pos, ship.angle),
    leftFoot: transformPoint(lp.leftFoot, ship.pos, ship.angle),
    rightFoot: transformPoint(lp.rightFoot, ship.pos, ship.angle),
    leftThruster: transformPoint(lp.leftThrusterPos, ship.pos, ship.angle),
    rightThruster: transformPoint(lp.rightThrusterPos, ship.pos, ship.angle),
  };
}

// Apply physics collision for cargo container against terrain, rock obstacles, and platforms
function applyCargoCollision(cargo: CargoContainer, world: WorldMap, shipPos?: Vector2D): { collided: boolean; impactSpeed: number } {
  const halfW = cargo.width * 0.5;
  const halfH = cargo.height * 0.5;
  const cRadius = Math.max(halfW, halfH) + 2;
  let collided = false;
  let maxImpact = 0;

  // 1. Cargo Platforms (Solid deck - supports cargo from above, bounces if hitting underside)
  if (world.cargoPlatforms) {
    for (const cp of world.cargoPlatforms) {
      if (cargo.pos.x >= cp.x1 - halfW && cargo.pos.x <= cp.x2 + halfW) {
        const topOfPad = cp.y - halfH;
        const isShipBelowPlatform = shipPos ? shipPos.y > cp.y + 10 : false;

        // Resting on top of deck from above (only when descending and ship is NOT below platform)
        if (!isShipBelowPlatform && cargo.pos.y >= topOfPad - 3 && cargo.pos.y <= topOfPad + 4 && cargo.vel.y >= -0.5) {
          if (cargo.vel.y > 1.0) {
            collided = true;
            maxImpact = Math.max(maxImpact, cargo.vel.y);
          }
          cargo.pos.y = topOfPad;
          if (cargo.vel.y > 0) cargo.vel.y = 0;
          cargo.vel.x *= 0.85;
        }
        // Hitting underside of platform when ascending with upward velocity
        else if (cargo.pos.y - halfH <= cp.y + 6 && cargo.pos.y - halfH >= cp.y - 4 && cargo.vel.y < -0.5) {
          collided = true;
          maxImpact = Math.max(maxImpact, Math.abs(cargo.vel.y));
          cargo.pos.y = cp.y + 6 + halfH;
          cargo.vel.y = Math.abs(cargo.vel.y) * 0.2;
        }
      }
    }
  }

  // 2. Terrain Segments (ground, ceiling, walls)
  for (const seg of world.segments) {
    if (seg.type === 'launch_pad' || seg.type === 'landing_pad') continue;
    const { dist: cDist, closest: cClosest, nx, ny } = distanceToSegment(cargo.pos, seg.p1, seg.p2);

    if (cDist < cRadius) {
      const dx = cargo.pos.x - cClosest.x;
      const dy = cargo.pos.y - cClosest.y;
      const len = Math.hypot(dx, dy);
      if (len < cRadius) {
        const penetration = cRadius - len;
        let pushX = len > 0.001 ? dx / len : nx;
        let pushY = len > 0.001 ? dy / len : ny;

        cargo.pos.x += pushX * penetration;
        cargo.pos.y += pushY * penetration;

        const dot = cargo.vel.x * pushX + cargo.vel.y * pushY;
        if (dot < 0) {
          collided = true;
          const normalSpd = Math.abs(dot);
          maxImpact = Math.max(maxImpact, normalSpd);
          cargo.vel.x -= pushX * dot * 1.35;
          cargo.vel.y -= pushY * dot * 1.35;
          cargo.vel.x *= 0.9;
        }
      }
    }
  }

  // 3. Scenario Rock Obstacles (polygons)
  if (world.obstacles) {
    for (const poly of world.obstacles) {
      if (poly.length < 3) continue;
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].x;
        const yi = poly[i].y;
        const xj = poly[j].x;
        const yj = poly[j].y;
        const intersect =
          yi > cargo.pos.y !== yj > cargo.pos.y &&
          cargo.pos.x < ((xj - xi) * (cargo.pos.y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }

      let minDist = Infinity;
      let bestClosest = { x: cargo.pos.x, y: cargo.pos.y };
      for (let i = 0; i < poly.length; i++) {
        const p1 = poly[i];
        const p2 = poly[(i + 1) % poly.length];
        const { dist, closest } = distanceToSegment(cargo.pos, p1, p2);
        if (dist < minDist) {
          minDist = dist;
          bestClosest = closest;
        }
      }

      if (inside || minDist < cRadius) {
        const dx = cargo.pos.x - bestClosest.x;
        const dy = cargo.pos.y - bestClosest.y;
        const len = Math.hypot(dx, dy);
        let pushX = 0;
        let pushY = -1;
        if (len > 0.001) {
          pushX = dx / len;
          pushY = dy / len;
        }
        if (inside) {
          let cx = 0;
          let cy = 0;
          for (const pt of poly) {
            cx += pt.x;
            cy += pt.y;
          }
          cx /= poly.length;
          cy /= poly.length;
          const outX = bestClosest.x - cx;
          const outY = bestClosest.y - cy;
          const outLen = Math.hypot(outX, outY) || 1;
          pushX = outX / outLen;
          pushY = outY / outLen;
        }
        cargo.pos.x = bestClosest.x + pushX * cRadius;
        cargo.pos.y = bestClosest.y + pushY * cRadius;
        const dot = cargo.vel.x * pushX + cargo.vel.y * pushY;
        if (dot < 0) {
          collided = true;
          const normalSpd = Math.abs(dot);
          maxImpact = Math.max(maxImpact, normalSpd);
          cargo.vel.x -= pushX * dot * 1.4;
          cargo.vel.y -= pushY * dot * 1.4;
        }
      }
    }
  }

  return { collided, impactSpeed: maxImpact };
}

// Distance from point to line segment with normal vector
function distanceToSegment(p: Vector2D, a: Vector2D, b: Vector2D): { dist: number; closest: Vector2D; t: number; nx: number; ny: number } {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  const len = Math.sqrt(lenSq) || 1;

  // Segment normal (pointing 90 deg counter-clockwise)
  const nx = -dy / len;
  const ny = dx / len;

  if (lenSq === 0) {
    const d = Math.hypot(p.x - a.x, p.y - a.y);
    return { dist: d, closest: a, t: 0, nx: 0, ny: -1 };
  }

  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const closest = {
    x: a.x + t * dx,
    y: a.y + t * dy,
  };

  const dist = Math.hypot(p.x - closest.x, p.y - closest.y);
  return { dist, closest, t, nx, ny };
}

// Line segment intersection with intersection point
function lineIntersection(p1: Vector2D, p2: Vector2D, p3: Vector2D, p4: Vector2D): { hit: boolean; pt?: Vector2D; nx?: number; ny?: number } {
  const det = (p2.x - p1.x) * (p4.y - p3.y) - (p2.y - p1.y) * (p4.x - p3.x);
  if (Math.abs(det) < 1e-6) return { hit: false };

  const lambda = ((p4.y - p3.y) * (p4.x - p1.x) + (p3.x - p4.x) * (p4.y - p1.y)) / det;
  const gamma = ((p1.y - p2.y) * (p4.x - p1.x) + (p2.x - p1.x) * (p4.y - p1.y)) / det;

  if (lambda >= 0 && lambda <= 1 && gamma >= 0 && gamma <= 1) {
    const segDx = p4.x - p3.x;
    const segDy = p4.y - p3.y;
    const len = Math.hypot(segDx, segDy) || 1;
    return {
      hit: true,
      pt: {
        x: p1.x + lambda * (p2.x - p1.x),
        y: p1.y + lambda * (p2.y - p1.y),
      },
      nx: -segDy / len,
      ny: segDx / len,
    };
  }

  return { hit: false };
}

export function createInitialShip(world: WorldMap, modelId: ShipModelId = 'apollo'): ShipState {
  const config = getShipConfig(modelId);
  return {
    pos: {
      x: world.launchPad.center.x,
      y: world.launchPad.y - Math.abs(config.localPoints.leftFoot.y),
    },
    vel: { x: 0, y: 0 },
    angle: 0,
    angularVel: 0,
    fuel: config.maxFuel,
    maxFuel: config.maxFuel,
    hull: 100,
    maxHull: 100,
    modelId: config.id,
    leftThruster: false,
    rightThruster: false,
    isLanded: false,
    landingSettling: false,
    settleProgress: 0,
    isCrashed: false,
    crashTime: 0,
    hasWon: false,
    isSmoking: false,
    thrusterDegraded: false,
    empDisabledTimer: 0,
    isRepairing: false,
    rampState: 'closed',
    rampProgress: 0,
    gearCompression: 0.65, // resting on pad at start
    gearSpringVelocity: 0,
    loadedTrucksCount: 0,
    deliveredTrucksCount: 0,
    totalTrucksCount: world.trucks?.length || 0,
  };
}

export function updatePhysics(
  ship: ShipState,
  world: WorldMap,
  planet: PlanetConfig,
  dt: number,
  elapsedTime: number,
  particles?: ParticleSystem
): ShipState {
  const config = getShipConfig(ship.modelId);
  const safeDt = Math.min(dt, 0.05);

  // If already crashed, continue advancing crash timer for break-up debris animation
  if (ship.isCrashed) {
    return {
      ...ship,
      crashTime: ship.crashTime + safeDt,
    };
  }

  // If already fully landed and won, handle ongoing pad refuel/repair then return
  if (ship.isLanded && ship.hasWon) {
    return ship;
  }

  const footHeight = Math.abs(config.localPoints.leftFoot.y);
  const pad = world.landingPad;
  const lPad = world.launchPad;

  // Handle Touchdown Suspension & Settling Phase
  if (ship.landingSettling) {
    const nextProgress = Math.min(1.0, ship.settleProgress + safeDt / 1.5);
    const settledPos = {
      x: ship.pos.x + ship.vel.x * safeDt * 3,
      y: pad.y - footHeight,
    };

    // Soft spring bumper compression on touchdown settle
    let currentComp = ship.gearCompression !== undefined ? ship.gearCompression : 0.4;
    let currentVel = ship.gearSpringVelocity || 0;
    const targetComp = 0.70; // compressed under steady landed ship mass
    const springForce = (targetComp - currentComp) * 35.0;
    const dampingForce = -currentVel * 12.0;
    currentVel += (springForce + dampingForce) * safeDt;
    currentComp = Math.max(0, Math.min(1.0, currentComp + currentVel * safeDt));

    // LZ base does NOT repair or refuel crafts
    const repairedHull = ship.hull;
    const refueledFuel = ship.fuel;

    let rampProg = ship.rampProgress || 0;
    let rampSt = ship.rampState || 'closed';

    // Unload onboard vehicles down the ramp at destination pad
    if (world.trucks && world.trucks.length > 0) {
      const onboardTrucks = world.trucks.filter((t) => t.state === 'onboard' || t.state === 'driving_out');
      if (onboardTrucks.length > 0) {
        // Open ramp to deploy vehicles
        if (rampSt !== 'open') {
          rampSt = 'opening';
          rampProg = Math.min(1.0, rampProg + 0.95 * safeDt);
          if (rampProg >= 1.0) {
            rampSt = 'open';
          }
        } else {
          // Ramp is open -> Drive trucks down the ramp onto the pad
          const rampHingeX = settledPos.x - 30;
          const rampTipX = settledPos.x - 84;
          const holdY = settledPos.y + 4;
          const deckY = pad.y - 14;
          const targetPadX = pad.x1 + 45;

          for (const truck of onboardTrucks) {
            if (truck.state === 'onboard') {
              truck.state = 'driving_out';
              truck.progress = 0;
              truck.headlightsOn = true;
            }
            truck.wheelAngle = (truck.wheelAngle || 0) + 12 * safeDt;
            truck.progress = Math.min(1.0, truck.progress + 0.35 * safeDt);

            const p = truck.progress;
            if (p < 0.25) {
              // Roll out from central hold to left ramp hinge
              const t = p / 0.25;
              truck.pos.x = settledPos.x + (rampHingeX - settledPos.x) * t;
              truck.pos.y = holdY;
            } else if (p < 0.65) {
              // Drive down the ramp slope to the landing pad deck
              const t = (p - 0.25) / 0.40;
              truck.pos.x = rampHingeX + (rampTipX - rampHingeX) * t;
              truck.pos.y = holdY + (deckY - holdY) * t;
            } else {
              // Drive forward along the landing pad runway
              const t = (p - 0.65) / 0.35;
              truck.pos.x = rampTipX + (targetPadX - rampTipX) * t;
              truck.pos.y = deckY;
            }

            if (truck.progress >= 1.0) {
              truck.state = 'delivered';
              truck.pos.x = targetPadX;
              truck.pos.y = deckY;
              sound.playLandingChime();
              if (particles) {
                particles.emitRepairSparks(truck.pos);
              }
            }
          }
        }
      } else if (rampSt === 'open') {
        rampSt = 'closing';
      }
    }

    if (rampSt === 'closing') {
      rampProg = Math.max(0, rampProg - 0.95 * safeDt);
      if (rampProg <= 0) {
        rampSt = 'closed';
      }
    }

    const nextShip: ShipState = {
      ...ship,
      pos: settledPos,
      vel: {
        x: ship.vel.x * 0.80,
        y: 0,
      },
      angle: ship.angle * 0.75,
      angularVel: ship.angularVel * 0.60,
      hull: repairedHull,
      fuel: refueledFuel,
      rampProgress: rampProg,
      rampState: rampSt,
      gearCompression: currentComp,
      gearSpringVelocity: currentVel,
      isRepairing: false,
      landingSettling: nextProgress < 1.0,
      settleProgress: nextProgress,
      isLanded: nextProgress >= 1.0,
      hasWon: nextProgress >= 1.0,
    };

    return nextShip;
  }

  let newFuel = ship.fuel;
  let newHull = ship.hull;
  let empDisabledTimer = Math.max(0, (ship.empDisabledTimer || 0) - safeDt);
  let isRepairing = false;
  let isSmoking = newHull < 50;
  let thrusterDegraded = newHull < 35;
  const isEmpDisabled = empDisabledTimer > 0;

  // Fuel leak if hull is critically punctured (< 20%)
  if (newHull < 20 && newFuel > 0) {
    newFuel = Math.max(0, newFuel - 2.5 * safeDt);
  }

  // Emit smoke if hull is damaged
  if (particles && isSmoking && Math.random() < (newHull < 25 ? 0.6 : 0.25)) {
    particles.emitSmoke(ship.pos, 1);
  }

  // Emit electrical sparks if EMP is active
  if (particles && isEmpDisabled && Math.random() < 0.35) {
    particles.emitSparks(ship.pos, 2);
  }

  const hasFuel = newFuel > 0;

  // Calculate total dynamic mass including attached cargo and loaded vehicles
  let dynamicMass = config.mass;
  let attachedCargoMassKg = 0;
  if (ship.attachedCargoId) {
    const attachedCargo = world.cargoItems?.find(c => c.id === ship.attachedCargoId);
    if (attachedCargo) {
      // cargo.mass is 140kg to 650kg. Convert to relative ship mass units.
      attachedCargoMassKg = attachedCargo.mass;
      dynamicMass += (attachedCargo.mass / 2000);
    }
  }
  let loadedVehiclesMassKg = 0;
  if (ship.loadedTrucksCount) {
    // Each heavy vehicle adds 600kg equivalent mass
    loadedVehiclesMassKg = ship.loadedTrucksCount * 600;
    dynamicMass += ship.loadedTrucksCount * 0.30;
  }
  const totalMassKg = Math.round(config.mass * 1000 + attachedCargoMassKg + loadedVehiclesMassKg);

  // Dual Thruster Mechanics with ship stats & degradation
  const gravityForce = (planet.gravity * 7.5) * dynamicMass;
  let singleEngineThrust = (gravityForce * 0.95 + 29.0) * config.thrustMultiplier;

  // Sputtering engine if hull is heavily damaged
  if (thrusterDegraded && Math.random() < 0.15) {
    singleEngineThrust *= 0.55;
    if (particles && Math.random() < 0.3) {
      particles.emitSparks(ship.pos, 3);
    }
  }

  const torqueConstant = 9.4 * config.torqueMultiplier;

  let fx = 0;
  let fy = 0;
  let torque = 0;

  // Unit vector pointing along the ship's longitudinal axis (Up)
  const upX = Math.sin(ship.angle);
  const upY = -Math.cos(ship.angle);

  // Unit vector pointing right relative to ship
  const rightX = Math.cos(ship.angle);
  const rightY = Math.sin(ship.angle);

  if (hasFuel && !isEmpDisabled) {
    if (ship.leftThruster) {
      fx += upX * singleEngineThrust;
      fy += upY * singleEngineThrust;
      fx += rightX * (singleEngineThrust * 0.12);
      fy += rightY * (singleEngineThrust * 0.12);
      torque += torqueConstant;
      newFuel -= planet.fuelBurnRate * safeDt;
    }

    if (ship.rightThruster) {
      fx += upX * singleEngineThrust;
      fy += upY * singleEngineThrust;
      fx -= rightX * (singleEngineThrust * 0.12);
      fy -= rightY * (singleEngineThrust * 0.12);
      torque -= torqueConstant;
      newFuel -= planet.fuelBurnRate * safeDt;
    }

    // Synergistic upward boost when both fire
    if (ship.leftThruster && ship.rightThruster) {
      fx += upX * (singleEngineThrust * 0.3);
      fy += upY * (singleEngineThrust * 0.3);
    }
  }

  newFuel = Math.max(0, newFuel);

  // Apply Gravity (downwards)
  fy += gravityForce;

  // Atmospheric drag (air resistance)
  const speed = Math.hypot(ship.vel.x, ship.vel.y);
  if (speed > 0.001) {
    const dragMag = 0.5 * planet.airResistance * speed * speed * (config.width / 56);
    fx -= (ship.vel.x / speed) * dragMag;
    fy -= (ship.vel.y / speed) * dragMag;
  }

  // Linear integration adjusted by ship mass
  const invMass = 1 / dynamicMass;
  let newVelX = ship.vel.x + (fx * invMass) * safeDt;
  let newVelY = ship.vel.y + (fy * invMass) * safeDt;

  let newPosX = ship.pos.x + newVelX * safeDt * 10;
  let newPosY = ship.pos.y + newVelY * safeDt * 10;

  // Rotational integration
  const angularDamping = 0.92;
  let newAngularVel = (ship.angularVel + (torque * invMass) * safeDt) * angularDamping;
  let newAngle = ship.angle + newAngularVel * safeDt;

  // Landing Gear Suspension Spring & Bumper Dynamics
  // In mid-air/liftoff: springs gently uncompress back to 0.0 (fully extended)
  // When resting/landing: springs compress proportional to load & downward velocity
  let gearComp = ship.gearCompression !== undefined ? ship.gearCompression : 0.0;
  let gearSpringVel = ship.gearSpringVelocity || 0;

  // In flight without surface contact, spring pulls toward 0.0 (fully extended gear with damped oscillation)
  const targetFlightComp = 0.0;
  const inFlightSpringK = 22.0;
  const inFlightDamping = 8.5;
  const springAcc = (targetFlightComp - gearComp) * inFlightSpringK - gearSpringVel * inFlightDamping;
  gearSpringVel += springAcc * safeDt;
  gearComp = Math.max(0, Math.min(1.0, gearComp + gearSpringVel * safeDt));

  let updatedShip: ShipState = {
    ...ship,
    pos: { x: newPosX, y: newPosY },
    vel: { x: newVelX, y: newVelY },
    angle: newAngle,
    angularVel: newAngularVel,
    gearCompression: gearComp,
    gearSpringVelocity: gearSpringVel,
    fuel: newFuel,
    hull: newHull,
    totalMassKg,
    isSmoking,
    thrusterDegraded,
    empDisabledTimer,
    isRepairing,
  };

  // Perimeter Solid Cliff Wall Collisions
  if (updatedShip.pos.x < 35) {
    return {
      ...updatedShip,
      isCrashed: true,
      crashTime: 0,
      crashReason: 'Smashed into West Perimeter Rock Barrier',
    };
  }
  if (updatedShip.pos.x > world.width - 35) {
    return {
      ...updatedShip,
      isCrashed: true,
      crashTime: 0,
      crashReason: 'Smashed into East Perimeter Rock Barrier',
    };
  }
  if (updatedShip.pos.y < 25) {
    return {
      ...updatedShip,
      isCrashed: true,
      crashTime: 0,
      crashReason: 'Impacted Upper Atmospheric Rock Mantle',
    };
  }

  // Collect Fuel Pickups
  world.pickups.forEach((pickup) => {
    if (!pickup.collected) {
      const dist = Math.hypot(updatedShip.pos.x - pickup.x, updatedShip.pos.y - pickup.y);
      if (dist < pickup.radius + (config.width * 0.45)) {
        pickup.collected = true;
        updatedShip.fuel = Math.min(updatedShip.maxFuel, updatedShip.fuel + pickup.amount);
        sound.playFuelPickup();
        if (particles) {
          particles.emitSparks({ x: pickup.x, y: pickup.y }, 16);
        }
        const collectedCount = world.pickups.filter((p) => p.collected).length;
        if (collectedCount >= 3) {
          unlockAchievement('deep_scavenger');
        }
      }
    }
  });

  // =========================================================================
  // ACTIVE VOLCANOES: ERUPTION CYCLES, FIRE PLUMES, EJECTED ROCKS & DAMAGE
  // =========================================================================
  if (world.volcanoes && world.volcanoes.length > 0) {
    for (const v of world.volcanoes) {
      const prevTimer = v.cycleTimer;
      v.cycleTimer = (v.cycleTimer + safeDt) % v.interval;

      // 0.85s charge-up warning before eruption burst
      const chargeThreshold = v.interval - 0.85;
      const wasCharging = prevTimer >= chargeThreshold;
      v.isCharging = v.cycleTimer >= chargeThreshold;

      // Active eruption window
      const wasErupting = v.isErupting;
      v.isErupting = v.cycleTimer < v.duration;
      v.eruptPhase = v.isErupting ? v.cycleTimer / v.duration : 0;

      const calderaX = v.x;
      const calderaY = v.y - v.height;
      const distToShip = Math.hypot(updatedShip.pos.x - calderaX, updatedShip.pos.y - calderaY);

      // Warning phase audio rumble & warning sparks
      if (v.isCharging && !wasCharging) {
        sound.playVolcanoRumble(0.65, distToShip / 2800);
      }
      if (v.isCharging && particles && Math.random() < 0.45) {
        particles.emitVolcanoEmber({ x: calderaX, y: calderaY }, 3, v.colorTheme);
      }

      // Start of violent eruption: loud explosive blast + launch volcanic rock projectiles
      if (v.isErupting && !wasErupting) {
        sound.playVolcanoBlast(distToShip / 2800);

        // Launch volcanic rock projectiles scaled realistically to planetary gravity
        // Standard baseline gravity ref = 3.5 m/s²
        // Low gravity (e.g. 0.65 - 1.62): Ejects rocks much higher (up to 3.8x - 4.5x volcano height) and wider
        // High gravity (e.g. 4.8 - 6.5): Strong gravity suppresses blast height (~1.3x - 1.7x volcano height)
        const gravityRatio = 3.5 / Math.max(0.4, planet.gravity);
        const gravityHeightFactor = Math.min(3.8, Math.max(0.65, Math.pow(gravityRatio, 0.60)));
        const rockGravity = Math.max(140, planet.gravity * 36);
        let launched = 0;
        for (const rock of v.rocks) {
          if (!rock.active && launched < 6) {
            rock.active = true;
            rock.x = calderaX + (Math.random() - 0.5) * (v.calderaWidth * 0.5);
            rock.y = calderaY - 4;

            // Apex height dynamically scaled by volcano height and planetary gravity
            const baseApex = v.height * (1.9 + Math.random() * 0.35);
            const apexHeight = baseApex * gravityHeightFactor;
            rock.vy = -Math.sqrt(2 * rockGravity * apexHeight);

            // Horizontal ejection spread also expands under lower planetary gravity
            const spreadFactor = Math.min(2.2, Math.max(0.75, Math.pow(gravityRatio, 0.35)));
            rock.vx = (Math.random() - 0.5) * (v.calderaWidth * 1.15 * spreadFactor);

            rock.size = 3.5 + Math.random() * 4.0;
            rock.rotation = Math.random() * Math.PI * 2;
            rock.rotSpeed = (Math.random() - 0.5) * 6;
            rock.life = 0;
            // Estimated flight time to rise to apex and fall back to volcano base
            const estFlightTime = 2 * (Math.abs(rock.vy) / rockGravity) + 0.5;
            rock.maxLife = Math.max(1.5, estFlightTime);
            launched++;
          }
        }
      }

      // During active eruption: continuous roaring fire particles & smoke column
      if (v.isErupting && particles) {
        particles.emitVolcanoBlast({ x: calderaX, y: calderaY }, 4, v.colorTheme);
      } else if (!v.isCharging && particles && Math.random() < 0.2) {
        // Idle dormant smoking
        particles.emitVolcanoEmber({ x: calderaX, y: calderaY }, 1, v.colorTheme);
      }

      // Update active ejected volcanic rock bombs
      const rockGravity = Math.max(140, planet.gravity * 36);
      for (const rock of v.rocks) {
        if (!rock.active) continue;

        // Realistic downward gravity acceleration
        rock.vy += rockGravity * safeDt;
        rock.x += rock.vx * safeDt;
        rock.y += rock.vy * safeDt;
        rock.rotation += rock.rotSpeed * safeDt;
        rock.life += safeDt;

        // Continuous subtle ember trail from falling molten rocks
        if (particles && Math.random() < 0.25) {
          particles.emitVolcanoEmber({ x: rock.x, y: rock.y }, 1, v.colorTheme);
        }

        // Check if rock hits volcano cone slope or base ground
        const dxFromCenter = Math.abs(rock.x - v.x);
        const slopeY = calderaY + (v.height * Math.min(1, dxFromCenter / (v.width * 0.5)));
        const hitVolcanoSlope = rock.vy > 0 && dxFromCenter > (v.calderaWidth * 0.4) && rock.y >= slopeY;
        const hitGround = rock.y >= v.y;

        // Expire and disappear when rock hits ground / mountain slope or reaches max lifetime
        if (rock.life >= rock.maxLife || hitGround || hitVolcanoSlope) {
          rock.active = false;
          if (particles && (hitGround || hitVolcanoSlope)) {
            particles.emitSparks({ x: rock.x, y: rock.y }, 5);
          }
          continue;
        }

        // 1. Rock Collision with Craft
        const rockShipDist = Math.hypot(updatedShip.pos.x - rock.x, updatedShip.pos.y - rock.y) || 1;
        const craftRadius = config.width * 0.42;

        if (rockShipDist < rock.size + craftRadius && !updatedShip.isCrashed) {
          rock.active = false;
          const rockDmg = (14 + rock.size * 2.2) * (1 - config.armor);
          const newHull = Math.max(0, updatedShip.hull - rockDmg);

          // Impact force / physical knockback away from rock center
          const pushX = (updatedShip.pos.x - rock.x) / rockShipDist;
          const pushY = (updatedShip.pos.y - rock.y) / rockShipDist;
          const rockKnockback = Math.min(7.5, 3.5 + rock.size * 0.45);

          updatedShip.vel.x += pushX * rockKnockback + rock.vx * 0.06;
          updatedShip.vel.y += pushY * rockKnockback + rock.vy * 0.06;
          // Dampen existing spin and apply mild controlled deflection
          updatedShip.angularVel = updatedShip.angularVel * 0.40 + (Math.random() - 0.5) * 0.35;

          sound.playVolcanicRockHit();
          if (particles) {
            particles.emitVolcanicRockExplosion({ x: rock.x, y: rock.y }, v.colorTheme);
          }

          if (newHull <= 0) {
            return {
              ...updatedShip,
              hull: 0,
              isCrashed: true,
              crashTime: 0,
              crashReason: 'Destroyed by airborne volcanic rock bomb',
            };
          }

          updatedShip.hull = newHull;
          updatedShip.isSmoking = newHull < 50;
          updatedShip.thrusterDegraded = newHull < 35;
        }
      }

      // 2. Craft Collision with Active Eruption Fire Plume
      const plumeTopY = calderaY - v.eruptionHeight;
      const dxToCaldera = Math.abs(updatedShip.pos.x - calderaX);
      const isInsidePlumeHeight = updatedShip.pos.y >= plumeTopY - 25 && updatedShip.pos.y <= calderaY + 15;
      const isInsidePlumeRadius = dxToCaldera <= (v.hazardRadius + config.width * 0.35);

      if (v.isErupting && isInsidePlumeHeight && isInsidePlumeRadius && !updatedShip.isCrashed) {
        const fireDmg = (26 * safeDt) * (1 - config.armor);
        const newHull = Math.max(0, updatedShip.hull - fireDmg);

        // Thermal convection turbulence pushes craft upward and sideways
        updatedShip.vel.y -= (15 * safeDt);
        updatedShip.vel.x += (Math.random() - 0.5) * (12 * safeDt);
        updatedShip.angularVel += (Math.random() - 0.5) * (1.2 * safeDt);

        sound.playVolcanoSizzle();
        if (particles && Math.random() < 0.6) {
          particles.emitVolcanoBlast(updatedShip.pos, 2, v.colorTheme);
        }

        if (newHull <= 0) {
          return {
            ...updatedShip,
            hull: 0,
            isCrashed: true,
            crashTime: 0,
            crashReason: 'Hull incinerated inside erupting volcanic fire plume',
          };
        }

        updatedShip.hull = newHull;
        updatedShip.isSmoking = true;
        updatedShip.thrusterDegraded = newHull < 35;
      }

      // 3. Direct Contact with Open Molten Magma Reservoir at Caldera Top
      const isTouchingCalderaPool =
        dxToCaldera <= (v.calderaWidth * 0.55 + config.width * 0.25) &&
        Math.abs(updatedShip.pos.y - calderaY) <= 18 &&
        !updatedShip.isCrashed;

      if (isTouchingCalderaPool) {
        const magmaDmg = (45 * safeDt) * (1 - config.armor);
        const newHull = Math.max(0, updatedShip.hull - magmaDmg);

        sound.playVolcanoSizzle();
        if (particles) {
          particles.emitSparks(updatedShip.pos, 8);
        }

        if (newHull <= 0) {
          return {
            ...updatedShip,
            hull: 0,
            isCrashed: true,
            crashTime: 0,
            crashReason: 'Submerged and melted in volcanic magma crater',
          };
        }

        updatedShip.hull = newHull;
        updatedShip.isSmoking = true;
      }
    }
  }

  // --- CARGO SIMULATION & AUTOMATIC TETHER HOOK SYSTEM ---
  let attachedCargoId = ship.attachedCargoId || null;
  let deliveredCargoCount = ship.deliveredCargoCount || 0;
  const totalCargoCount = world.cargoItems?.length || 0;
  let cargoTension = 0;
  let lastCargoEvent = ship.lastCargoEvent;

  // Underside tether anchor point on the ship
  const shipAnchor = transformPoint({ x: 0, y: footHeight - 6 }, updatedShip.pos, updatedShip.angle);

  if (world.cargoItems && world.cargoItems.length > 0) {
    for (const cargo of world.cargoItems) {
      if (cargo.isDelivered || cargo.isDetonated) {
        // Securely delivered or detonated cargo
        continue;
      }

      // Default cargoType to 'standard' if missing
      const cType = cargo.cargoType || 'standard';
      if (cargo.integrity === undefined) cargo.integrity = 100;
      if (cargo.temperature === undefined) cargo.temperature = 0;
      if (cargo.chargeTimer === undefined) {
        cargo.chargeTimer = 60;
        cargo.maxChargeTimer = 60;
      }

      // 0. Check Volcano / Magma Hazard Proximity for Cargo
      let isNearVolcanoMagma = false;
      if (world.volcanoes) {
        for (const v of world.volcanoes) {
          const calderaX = v.x;
          const calderaY = v.y - v.height;
          const distToCaldera = Math.hypot(cargo.pos.x - calderaX, cargo.pos.y - calderaY);
          if (distToCaldera < (v.calderaWidth * 0.75 + 25)) {
            isNearVolcanoMagma = true;
            break;
          }
        }
      }

      // Volcano magma contact instantly detonates explosives & boils cryogenic tanks
      if (isNearVolcanoMagma) {
        if (cType === 'explosive') {
          cargo.isDetonated = true;
          cargo.isAttached = false;
          attachedCargoId = null;
          sound.playCargoDetonation();
          if (particles) {
            particles.emitCargoDetonation(cargo.pos, '#ef4444');
          }
          const distToShip = Math.hypot(shipAnchor.x - cargo.pos.x, shipAnchor.y - cargo.pos.y);
          if (distToShip < 190) {
            const blastDmg = Math.max(15, (190 - distToShip) * 0.75);
            updatedShip.hull = Math.max(0, updatedShip.hull - blastDmg);
            updatedShip.vel.x += ((shipAnchor.x - cargo.pos.x) / (distToShip || 1)) * 8.0;
            updatedShip.vel.y += ((shipAnchor.y - cargo.pos.y) / (distToShip || 1)) * 8.0;
          }
          lastCargoEvent = {
            type: 'detached',
            text: 'CRITICAL: HIGH-EXPLOSIVE CARGO IGNITED IN VOLCANIC MAGMA!',
            time: elapsedTime,
          };
          continue;
        } else if (cType === 'cryogenic') {
          cargo.temperature = Math.min(100, cargo.temperature + 45.0 * safeDt);
        }
      }

      if (!cargo.isAttached) {
        // --- 1. AUTOMATIC HOOK ATTACHMENT PROXIMITY DETECTION ---
        const cargoAnchor = { x: cargo.pos.x, y: cargo.pos.y - cargo.height * 0.5 };
        const distToAnchor = Math.hypot(shipAnchor.x - cargoAnchor.x, shipAnchor.y - cargoAnchor.y);
        const relVel = Math.hypot(updatedShip.vel.x - cargo.vel.x, updatedShip.vel.y - cargo.vel.y);

        // Craft must be above or level with cargo (cannot latch to cargo on top of a base when flying below it)
        const isShipAboveCargo = shipAnchor.y <= cargoAnchor.y + 20;

        // Line-of-sight check: hook cable cannot latch through platforms or solid obstacle polygons
        let isPathBlocked = false;
        if (world.cargoPlatforms) {
          for (const cp of world.cargoPlatforms) {
            if (
              (shipAnchor.y > cp.y && cargoAnchor.y < cp.y) ||
              (shipAnchor.y < cp.y && cargoAnchor.y > cp.y)
            ) {
              if (
                Math.min(shipAnchor.x, cargoAnchor.x) <= cp.x2 &&
                Math.max(shipAnchor.x, cargoAnchor.x) >= cp.x1
              ) {
                isPathBlocked = true;
                break;
              }
            }
          }
        }

        // Magnetic cargo has a slightly wider electromagnetic capture range
        const latchRadius = cType === 'magnetic' ? 95 : 85;

        // Automatically latches if hovering within range at manageable speed with clear line of sight
        if (!attachedCargoId && distToAnchor < latchRadius && relVel < 12.0 && isShipAboveCargo && !isPathBlocked && !updatedShip.isCrashed) {
          cargo.isAttached = true;
          cargo.tetherLength = Math.max(45, Math.min(latchRadius, distToAnchor));
          attachedCargoId = cargo.id;
          lastCargoEvent = {
            type: 'attached',
            text: `ELECTROMAGNETIC HOOK ENGAGED [${cargo.name.toUpperCase()} - ${cargo.mass}kg]`,
            time: elapsedTime,
          };
          triggerCargoHazardAlert(cargo, 'attached', true);
          sound.playCargoLatch();
          if (cType === 'magnetic') {
            sound.playMagneticHum();
          }
          if (particles) {
            particles.emitSparks(cargoAnchor, 14);
            if (cType === 'magnetic') {
              particles.emitMagneticFlux(cargoAnchor, 5);
            }
          }
        } else {
          // Unattached free cargo physics
          cargo.vel.y += (planet.gravity * 7.5) * safeDt;
          cargo.pos.x += cargo.vel.x * safeDt * 10;
          cargo.pos.y += cargo.vel.y * safeDt * 10;
          cargo.vel.x *= 0.98;

          // Apply comprehensive terrain, rock obstacle and platform deck collision
          const colResult = applyCargoCollision(cargo, world, updatedShip.pos);

          // Handle impact for unattached fragile/explosive containers
          if (colResult.collided && colResult.impactSpeed > 2.0) {
            if (cType === 'explosive' && colResult.impactSpeed > 6.0) {
              cargo.isDetonated = true;
              sound.playCargoDetonation();
              if (particles) particles.emitCargoDetonation(cargo.pos, '#ef4444');
            } else if (cType === 'isotope') {
              const loss = Math.min(45, (colResult.impactSpeed - 1.8) * 14.0);
              cargo.integrity = Math.max(0, cargo.integrity - loss);
              sound.playIsotopeDamage();
              if (particles) particles.emitRadiationSparks(cargo.pos, 5);
              if (cargo.integrity <= 0) {
                cargo.isDetonated = true;
                sound.playCargoDetonation();
                if (particles) particles.emitCargoDetonation(cargo.pos, '#c084fc');
              }
            }
          }
        }
      }

      if (cargo.isAttached) {
        // --- 2. INELASTIC HIGH-TENSILE WINCH TETHER DYNAMICS ---
        const nominalLength = cargo.tetherLength || 50;

        // Apply environment gravity and atmospheric drag to cargo
        cargo.vel.y += (planet.gravity * 7.5) * safeDt;
        cargo.vel.x *= (1 - planet.airResistance * 0.5);
        cargo.vel.y *= (1 - planet.airResistance * 0.5);

        // Integrate tentative cargo position
        cargo.pos.x += cargo.vel.x * safeDt * 10;
        cargo.pos.y += cargo.vel.y * safeDt * 10;

        // Reel cable gradually toward nominal length
        if (cargo.tetherLength && cargo.tetherLength > 50) {
          cargo.tetherLength = Math.max(50, cargo.tetherLength - 12 * safeDt);
        }

        // Calculate distance from ship anchor to top of cargo container
        const cargoAnchor = { x: cargo.pos.x, y: cargo.pos.y - cargo.height * 0.5 };
        const dx = cargoAnchor.x - shipAnchor.x;
        const dy = cargoAnchor.y - shipAnchor.y;
        const dist = Math.hypot(dx, dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;

        // Mass distribution: ship mass is normalized (~1.0), cargo mass is 0.12 to 0.35
        const mShip = 1.0;
        const mCargo = Math.max(0.08, Math.min(0.25, (cargo.mass || 320) / 1400));
        const totalMass = mShip + mCargo;

        // Cable only exerts tension when pulled taut (and only when cargo is hanging/trailing, not pushing)
        if (dist > nominalLength && ny >= -0.3) {
          // 1. Smooth damped velocity impulse along cable axis
          const relVx = cargo.vel.x - updatedShip.vel.x;
          const relVy = cargo.vel.y - updatedShip.vel.y;
          const relVProj = relVx * nx + relVy * ny;

          if (relVProj > 0) {
            const impulseFactor = 0.45;
            const impulse = relVProj * impulseFactor;

            // Lift cargo up and toward the craft smoothly
            cargo.vel.x -= nx * (mShip / totalMass) * impulse;
            cargo.vel.y -= ny * (mShip / totalMass) * impulse;
          }

          // 2. Length position constraint (cargo follows craft smoothly, never jerking ship backwards)
          const excess = dist - nominalLength;
          if (excess > 0) {
            const posCorrectionX = nx * excess;
            const posCorrectionY = ny * excess;

            // Pull cargo directly toward ship anchor
            cargo.pos.x -= posCorrectionX * 0.95;
            cargo.pos.y -= posCorrectionY * 0.95;
          }

          // 3. Gentle downward weight transfer from cargo onto the ship (only downwards)
          const cargoWeightForce = mCargo * planet.gravity * 3.5 * safeDt;
          if (ny > 0) {
            updatedShip.vel.y += ny * cargoWeightForce * 0.30;
            updatedShip.vel.x += nx * ny * cargoWeightForce * 0.15;
          }

          // Gentle rotational torque from off-center anchor
          const anchorRelX = shipAnchor.x - updatedShip.pos.x;
          const anchorRelY = shipAnchor.y - updatedShip.pos.y;
          const tetherTorque = (anchorRelX * ny - anchorRelY * nx) * cargoWeightForce * 0.00015;
          updatedShip.angularVel += tetherTorque;

          cargoTension = Math.min(1.0, (dist - nominalLength + 2) / 10);
        } else {
          // Slack cable
          cargoTension = 0;
        }

        // Apply comprehensive terrain, rock obstacle and platform deck collision
        const colResult = applyCargoCollision(cargo, world, updatedShip.pos);

        // --- VOLATILE CARGO SPECIALIZED IN-FLIGHT HAZARD SIMULATION ---
        const cargoSpeed = Math.hypot(cargo.vel.x, cargo.vel.y);

        // 1. High-Explosive Munitions
        if (cType === 'explosive') {
          if (colResult.collided && colResult.impactSpeed > 5.5) {
            // Detonation from hard impact!
            cargo.isDetonated = true;
            cargo.isAttached = false;
            attachedCargoId = null;
            sound.playCargoDetonation();
            if (particles) particles.emitCargoDetonation(cargo.pos, '#ef4444');

            const distToShip = Math.hypot(shipAnchor.x - cargo.pos.x, shipAnchor.y - cargo.pos.y);
            if (distToShip < 190) {
              const blastDmg = Math.max(20, (190 - distToShip) * 0.85);
              updatedShip.hull = Math.max(0, updatedShip.hull - blastDmg);
              updatedShip.vel.x += ((shipAnchor.x - cargo.pos.x) / (distToShip || 1)) * 9.0;
              updatedShip.vel.y += ((shipAnchor.y - cargo.pos.y) / (distToShip || 1)) * 9.0;
            }
            lastCargoEvent = {
              type: 'detached',
              text: 'CRITICAL: HIGH-EXPLOSIVE CARGO DETONATED FROM HARD IMPACT!',
              time: elapsedTime,
            };
            continue;
          }
        }

        // 2. Cryogenic Superconductor / Biological Specimen
        else if (cType === 'cryogenic') {
          // Friction heating at high speed + natural stabilization
          const heatRate = (cargoSpeed > 8.5 ? (cargoSpeed - 8.5) * 1.8 : 0) + (isNearVolcanoMagma ? 30.0 : 0);
          const coolRate = 2.5;
          cargo.temperature = Math.max(0, Math.min(100, cargo.temperature + (heatRate - coolRate) * safeDt));

          if (cargo.temperature > 40 && Math.random() < 0.25) {
            if (particles) particles.emitCryoVapor(cargo.pos, 2);
          }
          if (cargo.temperature >= 95) {
            cargo.integrity = Math.max(0, cargo.integrity - 6.0 * safeDt);
            if (Math.random() < 0.08) {
              sound.playCryoVent();
              if (particles) particles.emitCryoVapor(cargo.pos, 4);
            }
            if (cargo.integrity <= 0) {
              lastCargoEvent = {
                type: 'detached',
                text: 'WARNING: CRYOGENIC PAYLOAD THERMALLY COMPROMISED!',
                time: elapsedTime,
              };
            }
          }
        }

        // 3. Fragile Quantum Isotope Core
        else if (cType === 'isotope') {
          if (Math.random() < 0.12 && particles) {
            particles.emitRadiationSparks(cargo.pos, 1);
          }
          if (colResult.collided && colResult.impactSpeed > 2.0) {
            const loss = Math.min(40, (colResult.impactSpeed - 1.8) * 13.0);
            cargo.integrity = Math.max(0, cargo.integrity - loss);
            sound.playIsotopeDamage();
            if (particles) particles.emitRadiationSparks(cargo.pos, 7);
            lastCargoEvent = {
              type: 'attached',
              text: `WARNING: ISOTOPE INTEGRITY COMPROMISED [${Math.round(cargo.integrity)}%]`,
              time: elapsedTime,
            };
            if (cargo.integrity <= 0) {
              cargo.isDetonated = true;
              cargo.isAttached = false;
              attachedCargoId = null;
              sound.playCargoDetonation();
              if (particles) particles.emitCargoDetonation(cargo.pos, '#c084fc');
              lastCargoEvent = {
                type: 'detached',
                text: 'CRITICAL: QUANTUM ISOTOPE CORE COLLAPSED!',
                time: elapsedTime,
              };
              continue;
            }
          }
        }

        // 4. Magnetic Flux Dynamo
        else if (cType === 'magnetic') {
          if (Math.random() < 0.15 && particles) {
            particles.emitMagneticFlux(cargo.pos, 2);
          }
          // Slight rotational stability damping
          cargo.vel.x *= 0.995;
        }

        // 5. Plasma Battery Cell
        else if (cType === 'plasma') {
          cargo.chargeTimer = Math.max(0, (cargo.chargeTimer || 60) - safeDt);
          if (Math.random() < 0.18 && particles) {
            particles.emitPlasmaArc(cargo.pos, 2);
          }
          if (cargo.chargeTimer <= 0) {
            // EMP Burst! Disables ship flight avionics and thruster ignition for 0.5s to 2.0s (randomized)
            const blackoutDuration = Number((0.5 + Math.random() * 1.5).toFixed(2));
            sound.playPlasmaEMP();
            if (particles) {
              particles.emitPlasmaArc(cargo.pos, 20);
              particles.emitPlasmaArc(updatedShip.pos, 16);
              particles.emitSparks(updatedShip.pos, 14);
            }
            updatedShip.fuel = Math.max(0, updatedShip.fuel - 10.0);
            updatedShip.vel.x += (Math.random() - 0.5) * 3.5;
            updatedShip.empDisabledTimer = blackoutDuration;
            cargo.chargeTimer = 30; // reset for next cycle
            lastCargoEvent = {
              type: 'attached',
              text: `⚡ CRITICAL EMP BURST! AVIONICS DISABLED FOR ${blackoutDuration.toFixed(1)}s!`,
              time: elapsedTime,
            };
          }
        }

        // --- 3. AUTOMATIC DELIVERY DETECTION AT PRIMARY LANDING ZONE (LZ) ---
        const isOverLZ = cargo.pos.x >= pad.x1 + 10 && cargo.pos.x <= pad.x2 - 10;
        const isAboveLZSurface = cargo.pos.y >= pad.y - 45 && cargo.pos.y <= pad.y - cargo.height * 0.35;

        if (isOverLZ && isAboveLZSurface && cargoSpeed <= 8.5) {
          cargo.isAttached = false;
          cargo.isDelivered = true;
          cargo.pos.x = Math.max(pad.x1 + 25, Math.min(pad.x2 - 25, cargo.pos.x));
          cargo.pos.y = pad.y - cargo.height * 0.5;
          cargo.vel = { x: 0, y: 0 };
          cargo.deliveredTime = elapsedTime;
          attachedCargoId = null;
          deliveredCargoCount += 1;

          // Bonus calculation based on cargo condition
          let bonusText = '+5,000 PTS';
          if (cType === 'isotope' && (cargo.integrity || 100) > 85) {
            bonusText = '+7,500 PTS (PRISTINE CORE)';
          } else if (cType === 'cryogenic' && (cargo.temperature || 0) < 30) {
            bonusText = '+7,000 PTS (SUB-ZERO COND)';
          } else if (cType === 'explosive') {
            bonusText = '+8,000 PTS (HAZMAT SECURE)';
          }

          lastCargoEvent = {
            type: 'delivered',
            text: `CARGO SECURED AT LZ: ${cargo.name.toUpperCase()} [${bonusText}]`,
            time: elapsedTime,
          };
          sound.playCargoDelivered();
          if (particles) {
            particles.emitRepairSparks(cargo.pos);
          }
        }
      }
    }
  }

  updatedShip.attachedCargoId = attachedCargoId;
  updatedShip.deliveredCargoCount = deliveredCargoCount;
  updatedShip.totalCargoCount = totalCargoCount;
  updatedShip.cargoTension = cargoTension;
  updatedShip.lastCargoEvent = lastCargoEvent;

  // Calculate World Points for Ship Hull & Landing Gear
  let points = getShipWorldPoints(updatedShip);
  const footY = Math.max(points.leftFoot.y, points.rightFoot.y);
  const halfSpan = config.footpadSpan * 0.5;

  // 1. Launch Pad Interaction (Starting platform resting, safe takeoff, repair)
  const isOverLaunchPad =
    (updatedShip.pos.x >= lPad.x1 - 35 && updatedShip.pos.x <= lPad.x2 + 35) ||
    (points.leftFoot.x >= lPad.x1 - 25 && points.leftFoot.x <= lPad.x2 + 25) ||
    (points.rightFoot.x >= lPad.x1 - 25 && points.rightFoot.x <= lPad.x2 + 25);
  const feetTouchingLaunchPad =
    footY >= lPad.y - 7.0 && footY <= lPad.y + 15.0 && updatedShip.pos.y < lPad.y;

  if (isOverLaunchPad && feetTouchingLaunchPad) {
    const totalSpeed = Math.hypot(updatedShip.vel.x, updatedShip.vel.y);
    const vertSpeed = updatedShip.vel.y;
    const angleDeg = Math.abs((updatedShip.angle * 180) / Math.PI) % 360;
    const normalizedAngleDeg = angleDeg > 180 ? 360 - angleDeg : angleDeg;

    if (vertSpeed > 10.0 || totalSpeed > 13.0 || normalizedAngleDeg > 48) {
      // Hard crash into launch platform
      return {
        ...updatedShip,
        isCrashed: true,
        crashTime: 0,
        crashReason: 'Violent impact on launch platform',
      };
    } else {
      const isMovingUpward = updatedShip.vel.y < -0.1;
      const isThrusting = (ship.leftThruster || ship.rightThruster) && hasFuel;

      // Solid surface reaction: never allow ship to sink below the launch pad deck
      if (updatedShip.pos.y >= lPad.y - footHeight || updatedShip.vel.y >= 0) {
        updatedShip.pos.y = lPad.y - footHeight;
        if (updatedShip.vel.y > 0) {
          updatedShip.vel.y = 0;
        }
        points = getShipWorldPoints(updatedShip);
      }

      if (!isMovingUpward && !isThrusting) {
        // Resting / supported on launch pad -> Auto repair & refuel!
        const repairedHull = Math.min(100, updatedShip.hull + 20 * safeDt);
        const refueledFuel = Math.min(updatedShip.maxFuel, updatedShip.fuel + 30 * safeDt);

        if (updatedShip.hull < 100 && Math.random() < 0.25 && particles) {
          particles.emitRepairSparks(updatedShip.pos);
        }

        // Bumper suspension compression on launch pad
        let padComp = updatedShip.gearCompression !== undefined ? updatedShip.gearCompression : 0.65;
        let padVel = updatedShip.gearSpringVelocity || 0;
        const targetPadComp = 0.65;
        padVel += ((targetPadComp - padComp) * 30.0 - padVel * 10.0) * safeDt;
        padComp = Math.max(0, Math.min(1.0, padComp + padVel * safeDt));

        updatedShip = {
          ...updatedShip,
          hull: repairedHull,
          fuel: refueledFuel,
          gearCompression: padComp,
          gearSpringVelocity: padVel,
          isRepairing: updatedShip.hull < 100 || updatedShip.fuel < updatedShip.maxFuel,
          pos: {
            x: updatedShip.pos.x,
            y: lPad.y - footHeight,
          },
          vel: {
            x: updatedShip.vel.x * 0.7,
            y: 0,
          },
          angle: updatedShip.angle * 0.6,
          angularVel: updatedShip.angularVel * 0.4,
        };
        points = getShipWorldPoints(updatedShip);
      }
    }
  }

  // 1b. Cargo & Vehicle Platform Interaction (Pickup Depot, Drop Zone, Vehicle Depot Resting/Docking)
  let isRestingOnAnyPlatform = false;
  if (world.cargoPlatforms && world.cargoPlatforms.length > 0) {
    for (const cp of world.cargoPlatforms) {
      const isOverCp =
        (updatedShip.pos.x >= cp.x1 - 35 && updatedShip.pos.x <= cp.x2 + 35) ||
        (points.leftFoot.x >= cp.x1 - 25 && points.leftFoot.x <= cp.x2 + 25) ||
        (points.rightFoot.x >= cp.x1 - 25 && points.rightFoot.x <= cp.x2 + 25);
      const feetTouchingCp =
        footY >= cp.y - 7.0 && footY <= cp.y + 15.0 && updatedShip.pos.y < cp.y;

      if (isOverCp && feetTouchingCp) {
        const totalSpeed = Math.hypot(updatedShip.vel.x, updatedShip.vel.y);
        const vertSpeed = updatedShip.vel.y;
        const angleDeg = Math.abs((updatedShip.angle * 180) / Math.PI) % 360;
        const normalizedAngleDeg = angleDeg > 180 ? 360 - angleDeg : angleDeg;

        if (vertSpeed > 11.0 || totalSpeed > 14.0 || normalizedAngleDeg > 50) {
          // Hard crash into platform deck
          return {
            ...updatedShip,
            isCrashed: true,
            crashTime: 0,
            crashReason: `Severe impact on ${cp.label || 'platform'}`,
          };
        } else {
          const isMovingUpward = updatedShip.vel.y < -0.1;
          const isThrusting = (ship.leftThruster || ship.rightThruster) && hasFuel;

          // Solid platform surface reaction
          if (updatedShip.pos.y >= cp.y - footHeight || updatedShip.vel.y >= 0) {
            updatedShip.pos.y = cp.y - footHeight;
            if (updatedShip.vel.y > 0) {
              updatedShip.vel.y = 0;
            }
            points = getShipWorldPoints(updatedShip);
          }

          if (!isMovingUpward && !isThrusting) {
            isRestingOnAnyPlatform = true;
            // Resting on platform deck -> Stabilize and recharge
            const repairedHull = Math.min(100, updatedShip.hull + 15 * safeDt);
            const refueledFuel = Math.min(updatedShip.maxFuel, updatedShip.fuel + 20 * safeDt);

            if (updatedShip.hull < 100 && Math.random() < 0.2 && particles) {
              particles.emitRepairSparks(updatedShip.pos);
            }

            // Bumper suspension compression on cargo platform
            let cpComp = updatedShip.gearCompression !== undefined ? updatedShip.gearCompression : 0.65;
            let cpVel = updatedShip.gearSpringVelocity || 0;
            const targetCpComp = 0.65;
            cpVel += ((targetCpComp - cpComp) * 30.0 - cpVel * 10.0) * safeDt;
            cpComp = Math.max(0, Math.min(1.0, cpComp + cpVel * safeDt));

            updatedShip = {
              ...updatedShip,
              hull: repairedHull,
              fuel: refueledFuel,
              gearCompression: cpComp,
              gearSpringVelocity: cpVel,
              isRepairing: updatedShip.hull < 100 || updatedShip.fuel < updatedShip.maxFuel,
              pos: {
                x: updatedShip.pos.x,
                y: cp.y - footHeight,
              },
              vel: {
                x: updatedShip.vel.x * 0.7,
                y: 0,
              },
              angle: updatedShip.angle * 0.6,
              angularVel: updatedShip.angularVel * 0.4,
            };
            points = getShipWorldPoints(updatedShip);

            // ===============================================================
            // VEHICLE / TRUCK LOADING MECHANIC AT VEHICLE DEPOT PLATFORM
            // ===============================================================
            if (cp.type === 'vehicle_depot' && (config.canCarryVehicles || config.isHeavyVehicleCarrier) && world.trucks && world.trucks.length > 0) {
              const waitingTrucks = world.trucks.filter(
                (t) => (t.state === 'waiting_at_depot' || t.state === 'driving_to_craft') &&
                       t.baseX >= cp.x1 - 45 && t.baseX <= cp.x2 + 45
              );
              if (waitingTrucks.length > 0) {
                // Step 1: Smoothly Lower the Left Hydraulic Loading Ramp
                if (updatedShip.rampState !== 'open') {
                  updatedShip.rampState = 'opening';
                  const newProg = Math.min(1.0, (updatedShip.rampProgress || 0) + 0.85 * safeDt);
                  updatedShip.rampProgress = newProg;
                  if (newProg >= 1.0) {
                    updatedShip.rampState = 'open';
                    sound.playLandingChime();
                  }
                } else {
                  // Step 2: Ramp is fully open -> Trucks drive up the ramp into the hold
                  const rampHingeX = updatedShip.pos.x - 30;
                  const rampTipX = updatedShip.pos.x - 84;
                  const holdCenterX = updatedShip.pos.x;
                  const deckY = cp.y - 14;
                  const holdY = updatedShip.pos.y + 4;

                  for (const truck of waitingTrucks) {
                    if (truck.state === 'waiting_at_depot') {
                      truck.state = 'driving_to_craft';
                      truck.headlightsOn = true;
                    }
                    truck.wheelAngle = (truck.wheelAngle || 0) + 12 * safeDt;
                    truck.progress = Math.min(1.0, truck.progress + 0.32 * safeDt);

                    const p = truck.progress;
                    if (p < 0.50) {
                      // Stage A: Drive along the platform deck toward the ramp tip
                      const t = p / 0.50;
                      truck.pos.x = truck.baseX + (rampTipX - truck.baseX) * t;
                      truck.pos.y = deckY;
                    } else if (p < 0.85) {
                      // Stage B: Drive up the inclined ramp into the ship port entrance
                      const t = (p - 0.50) / 0.35;
                      truck.pos.x = rampTipX + (rampHingeX - rampTipX) * t;
                      truck.pos.y = deckY + (holdY - deckY) * t;
                    } else {
                      // Stage C: Roll into the center of the hollow vehicle hold
                      const t = (p - 0.85) / 0.15;
                      truck.pos.x = rampHingeX + (holdCenterX - rampHingeX) * t;
                      truck.pos.y = holdY;
                    }

                    if (truck.progress >= 1.0) {
                      truck.state = 'onboard';
                      truck.pos.x = holdCenterX;
                      truck.pos.y = holdY;
                      updatedShip.loadedTrucksCount = (updatedShip.loadedTrucksCount || 0) + 1;
                      sound.playCargoLatch();
                      if (particles) {
                        particles.emitRepairSparks(truck.pos);
                      }
                      updatedShip.lastCargoEvent = {
                        type: 'truck_loaded',
                        text: `HEAVY VEHICLE LOADED & SECURED: ${truck.name.toUpperCase()} [+7,500 PTS]`,
                        time: elapsedTime,
                      };
                    }
                  }
                }
              } else if (updatedShip.rampState === 'open') {
                // All waiting trucks are onboard -> Smoothly close side ramp
                updatedShip.rampState = 'closing';
              }
            }

            // Smooth ramp closing
            if (updatedShip.rampState === 'closing') {
              const newProg = Math.max(0, (updatedShip.rampProgress || 1.0) - 0.95 * safeDt);
              updatedShip.rampProgress = newProg;
              if (newProg <= 0) {
                updatedShip.rampState = 'closed';
              }
            }

            break;
          }
        }
      }
    }
  }

  // If ship is in the air, ensure ramp closes safely
  if (!isRestingOnAnyPlatform && (updatedShip.rampState === 'open' || updatedShip.rampState === 'opening' || updatedShip.rampState === 'closing')) {
    const newProg = Math.max(0, (updatedShip.rampProgress || 1.0) - 1.2 * safeDt);
    updatedShip.rampProgress = newProg;
    if (newProg <= 0) {
      updatedShip.rampState = 'closed';
    } else {
      updatedShip.rampState = 'closing';
    }
  }

  // 2. Landing Pad Interaction (Mission Target Platform)
  const isOverLandingPad =
    (updatedShip.pos.x >= pad.x1 - 35 && updatedShip.pos.x <= pad.x2 + 35) ||
    (points.leftFoot.x >= pad.x1 - 25 && points.leftFoot.x <= pad.x2 + 25) ||
    (points.rightFoot.x >= pad.x1 - 25 && points.rightFoot.x <= pad.x2 + 25) ||
    (updatedShip.pos.x >= pad.x1 - halfSpan && updatedShip.pos.x <= pad.x2 + halfSpan);

  const feetTouchingLandingPad =
    footY >= pad.y - 7.0 && footY <= pad.y + 15.0 && updatedShip.pos.y < pad.y;

  if (isOverLandingPad && feetTouchingLandingPad) {
    const totalSpeed = Math.hypot(updatedShip.vel.x, updatedShip.vel.y);
    const vertSpeed = Math.abs(updatedShip.vel.y);
    const horizSpeed = Math.abs(updatedShip.vel.x);
    const angleOffsetDeg = Math.abs((updatedShip.angle * 180) / Math.PI) % 360;
    const normalizedAngleDeg = angleOffsetDeg > 180 ? 360 - angleOffsetDeg : angleOffsetDeg;

    // Generous landing speed threshold
    const isSoftLanding = vertSpeed <= 8.5 && horizSpeed <= 5.5 && normalizedAngleDeg <= 36;

    if (isSoftLanding) {
      // Begin Touchdown Settling sequence
      const softnessScore = Math.max(0, Math.min(100, Math.round(100 - vertSpeed * 6.5 - horizSpeed * 5 - normalizedAngleDeg * 0.8)));
      const fuelScore = Math.round(updatedShip.fuel * 3.5);
      const hullScore = Math.round(updatedShip.hull * 5.0);
      const timeTaken = Number(elapsedTime.toFixed(2));
      const parTime = planet.targetTimeSec;
      const timeBonus = Math.max(0, Math.round((parTime - timeTaken) * 35));
      // Secure any attached cargo at LZ touchdown
      let newlyDeliveredCargoCount = 0;
      if (updatedShip.attachedCargoId || world.cargoItems) {
        for (const c of (world.cargoItems || [])) {
          if ((c.id === updatedShip.attachedCargoId || c.isAttached) && !c.isDelivered) {
            c.isAttached = false;
            c.isDelivered = true;
            c.pos.x = pad.x2 - 35;
            c.pos.y = pad.y - c.height * 0.5;
            c.vel = { x: 0, y: 0 };
            c.deliveredTime = elapsedTime;
            newlyDeliveredCargoCount++;
            sound.playCargoDelivered();
            if (particles) {
              particles.emitRepairSparks(c.pos);
            }
          }
        }
        updatedShip.attachedCargoId = null;
      }
      const totalDeliveredCargo = (updatedShip.deliveredCargoCount || 0) + newlyDeliveredCargoCount;
      updatedShip.deliveredCargoCount = totalDeliveredCargo;

      // Unload vehicles at destination if any onboard
      let newlyDeliveredCount = 0;
      if (world.trucks && world.trucks.length > 0) {
        for (const truck of world.trucks) {
          if (truck.state === 'onboard' || truck.state === 'driving_out') {
            truck.state = 'delivered';
            truck.pos.x = pad.x1 + 35;
            truck.pos.y = pad.y - 12;
            newlyDeliveredCount++;
            sound.playLandingChime();
          }
        }
      }
      const totalDeliveredTrucks = (updatedShip.deliveredTrucksCount || 0) + newlyDeliveredCount;
      updatedShip.deliveredTrucksCount = totalDeliveredTrucks;

      let cargoBonus = 0;
      const cargoDetails: CargoDeliveryReport[] = [];

      if (world.cargoItems && world.cargoItems.length > 0) {
        for (const c of world.cargoItems) {
          const cType = c.cargoType || 'standard';
          const wClass = c.weightClass || 'medium';

          // Base points per cargo type and weight class
          let basePoints = 5000;
          if (cType === 'isotope') {
            basePoints = wClass === 'heavy' ? 18000 : wClass === 'light' ? 7500 : 12000;
          } else if (cType === 'explosive') {
            basePoints = wClass === 'heavy' ? 16000 : wClass === 'light' ? 6000 : 10000;
          } else if (cType === 'cryogenic') {
            basePoints = wClass === 'heavy' ? 14000 : wClass === 'light' ? 5500 : 9000;
          } else if (cType === 'plasma') {
            basePoints = wClass === 'heavy' ? 13000 : wClass === 'light' ? 5500 : 8500;
          } else if (cType === 'magnetic') {
            basePoints = wClass === 'heavy' ? 12500 : wClass === 'light' ? 5000 : 8000;
          } else {
            basePoints = wClass === 'heavy' ? 8000 : wClass === 'light' ? 3000 : 5000;
          }

          let conditionPct = 100;
          let conditionStatus = 'DELIVERED INTACT';
          let conditionMultiplier = 1.0;

          if (!c.isDelivered) {
            conditionPct = 0;
            conditionStatus = c.isDetonated ? 'DETONATED (DESTROYED)' : 'UNDELIVERED / LOST';
            conditionMultiplier = 0;
          } else {
            if (cType === 'isotope') {
              conditionPct = Math.round(c.integrity ?? 100);
              if (conditionPct >= 98) {
                conditionMultiplier = 1.15; // 15% pristine handling bonus
                conditionStatus = 'PRISTINE INTEGRITY (+15% BONUS)';
              } else if (conditionPct >= 70) {
                conditionMultiplier = conditionPct / 100;
                conditionStatus = `INTACT (${conditionPct}% SHIELD)`;
              } else if (conditionPct >= 35) {
                conditionMultiplier = conditionPct / 100;
                conditionStatus = `DAMAGED (${conditionPct}% SHIELD)`;
              } else {
                conditionMultiplier = Math.max(0.15, conditionPct / 100);
                conditionStatus = `CRITICAL BREACH (${conditionPct}% SHIELD)`;
              }
            } else if (cType === 'cryogenic') {
              const temp = Math.round(c.temperature ?? 0);
              conditionPct = Math.max(0, 100 - temp);
              if (temp <= 5) {
                conditionMultiplier = 1.15; // 15% sub-zero cryo lock bonus
                conditionStatus = 'SUB-ZERO LOCK (+15% BONUS)';
              } else if (temp <= 35) {
                conditionMultiplier = Math.max(0.7, (100 - temp * 0.7) / 100);
                conditionStatus = `CHILLED (${temp}% HEAT)`;
              } else if (temp <= 75) {
                conditionMultiplier = Math.max(0.35, (100 - temp) / 100);
                conditionStatus = `HEAT DEGRADED (${temp}% HEAT)`;
              } else {
                conditionMultiplier = 0.20;
                conditionStatus = `NEAR MELTDOWN (${temp}% HEAT)`;
              }
            } else if (cType === 'explosive') {
              if (c.isDetonated) {
                conditionPct = 0;
                conditionMultiplier = 0;
                conditionStatus = 'DETONATED (LOST)';
              } else {
                conditionPct = 100;
                conditionMultiplier = 1.20; // 20% safe ordnance handling bonus
                conditionStatus = 'SAFE DISARM (+20% BONUS)';
              }
            } else if (cType === 'plasma') {
              const maxTimer = c.maxChargeTimer ?? 60;
              const curTimer = c.chargeTimer ?? 60;
              conditionPct = Math.round(Math.min(100, Math.max(0, (curTimer / maxTimer) * 100)));
              if (conditionPct >= 70) {
                conditionMultiplier = 1.10;
                conditionStatus = 'HIGH CHARGE (+10% BONUS)';
              } else if (conditionPct >= 30) {
                conditionMultiplier = 1.0;
                conditionStatus = `CHARGED (${conditionPct}%)`;
              } else {
                conditionMultiplier = 0.85;
                conditionStatus = `LOW CHARGE (${conditionPct}%)`;
              }
            } else if (cType === 'magnetic') {
              conditionPct = 100;
              conditionMultiplier = 1.0;
              conditionStatus = 'CONTAINMENT SECURED';
            } else {
              conditionPct = 100;
              conditionMultiplier = 1.0;
              conditionStatus = 'DELIVERED INTACT';
            }
          }

          const podFinalScore = Math.round(basePoints * conditionMultiplier);
          if (c.isDelivered) {
            cargoBonus += podFinalScore;
          }

          cargoDetails.push({
            id: c.id,
            name: c.name || `${cType.toUpperCase()} POD`,
            cargoType: cType,
            weightClass: wClass,
            mass: c.mass || 350,
            isDelivered: !!c.isDelivered,
            baseScore: basePoints,
            conditionPct,
            conditionStatus,
            conditionMultiplier,
            finalScore: podFinalScore,
          });
        }
      }
      if (cargoBonus === 0 && totalDeliveredCargo > 0) {
        cargoBonus = totalDeliveredCargo * 5000;
      }

      const vehicleBonus = totalDeliveredTrucks * 15000 + Math.max(0, (updatedShip.loadedTrucksCount || 0) - totalDeliveredTrucks) * 7500;
      const totalScore = softnessScore * 10 + fuelScore + hullScore + timeBonus + cargoBonus + vehicleBonus;

      // Evaluate medals for this landing
      const earnedMedals = checkMedals({
        verticalSpeed: vertSpeed,
        horizontalSpeed: horizSpeed,
        fuelUsed: Math.max(0, updatedShip.maxFuel - updatedShip.fuel),
        fuelCapacity: updatedShip.maxFuel,
        timeTaken,
        parTime,
        hullDamage: Math.max(0, 100 - (updatedShip.hull || 100)),
        cargoCollected: totalDeliveredCargo,
        cargoTotal: world.cargoItems?.length || 0,
        roversCollected: totalDeliveredTrucks,
        roversTotal: world.trucks?.length || 0,
        cargoDelivered: totalDeliveredCargo,
        volcanicRockHits: 0,
        crashTimeMs: 0,
        nearMisses: 0,
        maxAltitude: 0,
        isLanded: true,
        isCrashed: false,
      });

      const { isNewBestTime, isNewHighScore } = saveMissionScore(planet.id, {
        timeSec: timeTaken,
        score: totalScore,
        cargoCollected: totalDeliveredCargo,
        roversCollected: totalDeliveredTrucks,
        medalsEarned: earnedMedals.map((m) => m.id),
      });

      // Check and trigger milestone achievements
      checkLandingAchievements({
        softnessScore,
        fuelRemaining: Math.round(updatedShip.fuel),
        maxFuel: updatedShip.maxFuel,
        hullRemaining: Math.round(updatedShip.hull),
        timeTaken,
        parTime,
        totalDeliveredCargo,
        totalDeliveredTrucks,
        isNewHighScore,
      });

      // Dynamic bumper compression upon touchdown impact
      const impactComp = Math.min(1.0, 0.4 + (vertSpeed / 8.5) * 0.55);
      const impactSpringVel = vertSpeed * 1.8;

      return {
        ...updatedShip,
        landingSettling: true,
        settleProgress: 0,
        gearCompression: impactComp,
        gearSpringVelocity: impactSpringVel,
        landingScore: {
          softness: softnessScore,
          fuelRemaining: Math.round(updatedShip.fuel),
          hullRemaining: Math.round(updatedShip.hull),
          hullBonus: hullScore,
          timeBonus,
          timeTaken,
          parTime,
          cargoBonus,
          vehicleBonus,
          cargoDetails,
          total: totalScore,
          isNewBestTime,
          isNewHighScore,
        },
      };
    } else {
      // Hard impact on landing pad
      if (vertSpeed > 13.5 || totalSpeed > 16.0 || normalizedAngleDeg > 55) {
        let reason = 'Hard impact on landing pad';
        if (vertSpeed > 13.5) reason = `Descent velocity critical (${vertSpeed.toFixed(1)} m/s)`;
        else if (horizSpeed > 8.0) reason = `Lateral skid velocity critical (${horizSpeed.toFixed(1)} m/s)`;
        else if (normalizedAngleDeg > 55) reason = `Lander overturned (${normalizedAngleDeg.toFixed(1)}°)`;

        return {
          ...updatedShip,
          isCrashed: true,
          crashTime: 0,
          crashReason: reason,
        };
      } else {
        // Absorbed damage with landing gear bounce
        const impactDamage = Math.max(12, (totalSpeed - 5.0) * 8.0 * (1 - config.armor));
        const updatedHull = Math.max(0, updatedShip.hull - impactDamage);
        sound.playHullImpact(0.7);
        if (particles) {
          particles.emitSparks(updatedShip.pos, 16);
        }

        if (updatedHull <= 0) {
          return {
            ...updatedShip,
            hull: 0,
            isCrashed: true,
            crashTime: 0,
            crashReason: 'Hull collapsed from landing pad impact',
          };
        }

        // Rebound slightly upward
        return {
          ...updatedShip,
          hull: updatedHull,
          vel: {
            x: updatedShip.vel.x * 0.4,
            y: -Math.abs(updatedShip.vel.y) * 0.35,
          },
          angularVel: updatedShip.angularVel * 0.5,
        };
      }
    }
  }

  // 3. Terrain & Obstacle Collision Handling with Progressive Damage
  const shipEdges = [
    { a: points.nose, b: points.leftShoulder, name: 'nose_left' },
    { a: points.leftShoulder, b: points.leftFoot, name: 'left_flank' },
    { a: points.leftFoot, b: points.rightFoot, name: 'keel_gear' },
    { a: points.rightFoot, b: points.rightShoulder, name: 'right_flank' },
    { a: points.rightShoulder, b: points.nose, name: 'nose_right' },
  ];

  const testPoints = [
    { pt: points.nose, weight: 1.35, name: 'Cockpit Canopy' },
    { pt: points.leftShoulder, weight: 1.0, name: 'Port Hull' },
    { pt: points.rightShoulder, weight: 1.0, name: 'Starboard Hull' },
    { pt: points.leftFoot, weight: 0.6, name: 'Port Landing Strut' },
    { pt: points.rightFoot, weight: 0.6, name: 'Starboard Landing Strut' },
  ];

  let collisionOccurred = false;
  let collisionNormal: Vector2D = { x: 0, y: -1 };
  let collisionPoint: Vector2D = updatedShip.pos;
  let collisionPartMultiplier = 1.0;
  let collisionType: 'ground' | 'ceiling' | 'wall' = 'ground';

  const proximityRadius = Math.max(75, config.width * 0.6 + 25);

  for (const seg of world.segments) {
    if (seg.type === 'launch_pad' || seg.type === 'landing_pad') {
      continue;
    }

    // Skip ground segments adjacent to launch pad while ship is on it
    if (
      seg.type === 'ground' &&
      isOverLaunchPad &&
      updatedShip.pos.y >= lPad.y - (footHeight + 16) &&
      updatedShip.pos.y <= lPad.y + 16
    ) {
      continue;
    }

    // Skip ground segments adjacent to landing pad when ship is on it
    if (
      seg.type === 'ground' &&
      updatedShip.pos.x >= pad.x1 - 35 &&
      updatedShip.pos.x <= pad.x2 + 35 &&
      updatedShip.pos.y >= pad.y - (footHeight + 16) &&
      updatedShip.pos.y <= pad.y + 16
    ) {
      continue;
    }

    // Skip ground segments adjacent to any cargo platform or vehicle depot while ship is near platform deck
    if (seg.type === 'ground' && world.cargoPlatforms) {
      const nearCp = world.cargoPlatforms.find(
        (cp) =>
          updatedShip.pos.x >= cp.x1 - 35 &&
          updatedShip.pos.x <= cp.x2 + 35 &&
          updatedShip.pos.y >= cp.y - (footHeight + 20) &&
          updatedShip.pos.y <= cp.y + 16
      );
      if (nearCp && Math.abs(seg.p1.y - nearCp.y) < 36 && Math.abs(seg.p2.y - nearCp.y) < 36) {
        continue;
      }
    }

    // Proximity cull
    const minSegX = Math.min(seg.p1.x, seg.p2.x) - proximityRadius;
    const maxSegX = Math.max(seg.p1.x, seg.p2.x) + proximityRadius;
    const minSegY = Math.min(seg.p1.y, seg.p2.y) - proximityRadius;
    const maxSegY = Math.max(seg.p1.y, seg.p2.y) + proximityRadius;

    if (
      updatedShip.pos.x < minSegX ||
      updatedShip.pos.x > maxSegX ||
      updatedShip.pos.y < minSegY ||
      updatedShip.pos.y > maxSegY
    ) {
      continue;
    }

    // Test edge-to-edge intersections
    for (const edge of shipEdges) {
      const hitResult = lineIntersection(edge.a, edge.b, seg.p1, seg.p2);
      if (hitResult.hit && hitResult.pt) {
        collisionOccurred = true;
        collisionPoint = hitResult.pt;
        if (hitResult.nx !== undefined && hitResult.ny !== undefined) {
          // Normal vector should point from terrain segment toward ship center
          const toShipX = updatedShip.pos.x - collisionPoint.x;
          const toShipY = updatedShip.pos.y - collisionPoint.y;
          const dot = toShipX * hitResult.nx + toShipY * hitResult.ny;
          collisionNormal = dot >= 0 ? { x: hitResult.nx, y: hitResult.ny } : { x: -hitResult.nx, y: -hitResult.ny };
        }
        collisionType = seg.type === 'ceiling' ? 'ceiling' : seg.type === 'wall' ? 'wall' : 'ground';
        break;
      }
    }

    if (collisionOccurred) break;

    // Test point-to-segment proximity
    for (const tp of testPoints) {
      const { dist, closest, nx, ny } = distanceToSegment(tp.pt, seg.p1, seg.p2);
      if (dist < 4.0) {
        collisionOccurred = true;
        collisionPoint = closest;
        collisionPartMultiplier = tp.weight;
        const toShipX = updatedShip.pos.x - closest.x;
        const toShipY = updatedShip.pos.y - closest.y;
        const dot = toShipX * nx + toShipY * ny;
        collisionNormal = dot >= 0 ? { x: nx, y: ny } : { x: -nx, y: -ny };
        collisionType = seg.type === 'ceiling' ? 'ceiling' : seg.type === 'wall' ? 'wall' : 'ground';
        break;
      }
    }

    if (collisionOccurred) break;
  }

  // Handle Collision Physics & Progressive Hull Damage
  if (collisionOccurred) {
    const impactSpeed = Math.hypot(updatedShip.vel.x, updatedShip.vel.y);

    // Instant destruction if impact velocity is catastrophic (> 15 m/s)
    if (impactSpeed > 15.0) {
      return {
        ...updatedShip,
        hull: 0,
        isCrashed: true,
        crashTime: 0,
        crashReason: `Catastrophic impact (${impactSpeed.toFixed(1)} m/s on ${collisionType})`,
      };
    }

    // Progressive damage calculation
    const damageAmount = Math.max(
      3,
      (impactSpeed - 1.2) * 6.8 * collisionPartMultiplier * (1 - config.armor)
    );
    const afterDamageHull = Math.max(0, updatedShip.hull - damageAmount);

    // Sound effect trigger based on speed
    if (impactSpeed >= 5.5) {
      sound.playHullImpact(Math.min(1.0, impactSpeed / 12.0));
    } else {
      sound.playHullScrape(Math.min(1.0, impactSpeed / 5.5));
    }

    // Particle sparks & debris emission
    if (particles) {
      particles.emitSparks(collisionPoint, impactSpeed > 6.0 ? 14 : 7, collisionNormal);
      if (impactSpeed > 4.5) {
        particles.emitDamageDebris(collisionPoint, 3);
      }
    }

    // Low hull warning chime
    if (afterDamageHull <= 25 && updatedShip.hull > 25) {
      sound.playLowHullAlarm();
    }

    if (afterDamageHull <= 0) {
      return {
        ...updatedShip,
        hull: 0,
        isCrashed: true,
        crashTime: 0,
        crashReason: `Hull integrity depleted by ${collisionType} collision`,
      };
    }

    // Physical rebound velocity (elastic reflection along collision normal with restitution)
    const normLen = Math.hypot(collisionNormal.x, collisionNormal.y) || 1;
    const nx = collisionNormal.x / normLen;
    const ny = collisionNormal.y / normLen;

    const vDotN = updatedShip.vel.x * nx + updatedShip.vel.y * ny;

    // Decompose into normal and tangential velocity
    const vnX = vDotN * nx;
    const vnY = vDotN * ny;
    const vtX = updatedShip.vel.x - vnX;
    const vtY = updatedShip.vel.y - vnY;

    // Reflected normal velocity + tangential friction damping + active ricochet pushback
    let reboundVx: number;
    let reboundVy: number;

    const friction = 0.72;
    const restitution = 0.55;

    if (vDotN < 0) {
      // Ship was moving into the surface -> elastic ricochet bounce outward along normal
      const normalInSpeed = -vDotN;
      const ricochetPush = Math.max(2.2, normalInSpeed * restitution);
      reboundVx = vtX * friction + nx * ricochetPush;
      reboundVy = vtY * friction + ny * ricochetPush;
    } else {
      // Ship is already moving away or sliding -> give positive outward boost
      const ricochetPush = Math.max(1.8, vDotN * 0.9);
      reboundVx = vtX * friction + nx * ricochetPush;
      reboundVy = vtY * friction + ny * ricochetPush;
    }

    // Controlled rotational torque from off-center impact
    // Contact friction heavily damps previous wild rotation rather than spinning out of control
    const rX = collisionPoint.x - updatedShip.pos.x;
    const rY = collisionPoint.y - updatedShip.pos.y;
    // Cross product (r x n)
    const rCrossN = rX * ny - rY * nx;
    const normalForceEst = Math.max(1.2, Math.abs(vDotN));
    const rawTorque = (rCrossN / Math.max(20, config.width)) * normalForceEst * 0.04;
    // Strictly clamp torque impulse so it never imparts more than +/- 0.45 rad/s
    const clampedTorque = Math.max(-0.45, Math.min(0.45, rawTorque));

    // Strong rotational damping on contact (prevents endless tumbling and unrecoverable flips)
    const newAngularVel = updatedShip.angularVel * 0.32 + clampedTorque;

    // Separate ship position firmly away from surface to prevent sticking & multi-frame re-collision
    const pushDist = Math.max(7.0, config.width * 0.14);
    const separatedX = updatedShip.pos.x + nx * pushDist;
    const separatedY = updatedShip.pos.y + ny * pushDist;

    return {
      ...updatedShip,
      pos: { x: separatedX, y: separatedY },
      vel: { x: reboundVx, y: reboundVy },
      angularVel: newAngularVel,
      hull: afterDamageHull,
      isSmoking: afterDamageHull < 50,
      thrusterDegraded: afterDamageHull < 35,
    };
  }

  return updatedShip;
}


