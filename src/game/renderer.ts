import { ShipState, WorldMap, PlanetConfig, Vector2D, PlanetaryTruck, VolcanoHazard } from '../types';
import { ParticleSystem } from './particles';
import { getShipConfig } from './ships';
import { renderShipHull } from './shipDrawers';

function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(56, 189, 248, ${alpha})`;
  if (hex.startsWith('rgba(')) {
    return hex.replace(/[\d\.]+\)$/g, `${alpha})`);
  }
  if (hex.startsWith('rgb(')) {
    return hex.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  }
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else if (cleanHex.length >= 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(56, 189, 248, ${alpha})`;
}

function transformPoint(local: Vector2D, pos: Vector2D, angle: number): Vector2D {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: pos.x + local.x * cos - local.y * sin,
    y: pos.y + local.x * sin + local.y * cos,
  };
}

export interface CameraState {
  x: number;
  y: number;
  zoom: number;
  targetZoom: number;
}

export class GameRenderer {
  public camera: CameraState = {
    x: 0,
    y: 0,
    zoom: 1.0,
    targetZoom: 1.0,
  };

  private stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
  private starfieldInitialized = false;

  private initStars(density: number) {
    this.stars = [];
    const count = Math.min(density, 220);
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * 5600,
        y: Math.random() * 2200,
        size: 0.8 + Math.random() * 1.8,
        alpha: 0.2 + Math.random() * 0.7,
        speed: 0.1 + Math.random() * 0.4,
      });
    }
    this.starfieldInitialized = true;
  }

  public resetCamera(shipPos: Vector2D) {
    this.camera.x = shipPos.x;
    this.camera.y = shipPos.y - 30;
    this.camera.zoom = 0.85;
    this.camera.targetZoom = 0.85;
  }

  public updateCamera(ship: ShipState, world: WorldMap, canvasWidth: number, canvasHeight: number, dt: number) {
    const isPortrait = canvasHeight > canvasWidth * 1.05;
    const speed = Math.hypot(ship.vel.x, ship.vel.y);
    const distToPad = Math.hypot(ship.pos.x - world.landingPad.center.x, ship.pos.y - world.landingPad.center.y);

    // 1. Calculate orientation-aware, responsive target zoom
    // In horizontal (landscape) mode, ensure wider field of view so players can navigate and get bearings
    if (isPortrait) {
      if (distToPad < 220 && speed < 4.5) {
        // Precision touchdown approach
        this.camera.targetZoom = 1.25;
      } else if (speed > 8.0) {
        // High speed navigation
        this.camera.targetZoom = 0.80;
      } else if (speed > 4.0) {
        // Cruising speed
        this.camera.targetZoom = 0.92;
      } else {
        // Standard flight / hover
        this.camera.targetZoom = 1.05;
      }
    } else {
      // Landscape / Horizontal Mode: Wide panoramic view of cavern terrain and obstacles
      if (distToPad < 220 && speed < 4.5) {
        // Touchdown pad proximity
        this.camera.targetZoom = 1.10;
      } else if (speed > 8.0) {
        // High speed / rapid transit: zoom out for forward situational awareness
        this.camera.targetZoom = 0.65;
      } else if (speed > 4.0) {
        // Cruising speed
        this.camera.targetZoom = 0.76;
      } else {
        // Standard flight / exploring caverns
        this.camera.targetZoom = 0.85;
      }
    }

    // Smoothly interpolate current zoom toward target zoom
    this.camera.zoom += (this.camera.targetZoom - this.camera.zoom) * Math.min(1, 2.5 * dt);

    // 2. Dampened velocity lead offset (prevents camera from overshooting and pushing craft off-screen)
    const maxLead = isPortrait ? 90 : 120;
    const leadX = Math.sign(ship.vel.x) * Math.min(maxLead, Math.pow(Math.abs(ship.vel.x), 0.82) * 4.2);
    const leadY = Math.sign(ship.vel.y) * Math.min(maxLead * 0.75, Math.pow(Math.abs(ship.vel.y), 0.82) * 3.5);

    const targetX = ship.pos.x + leadX;
    const targetY = ship.pos.y + leadY - 20;

    // 3. Adaptive tracking speed: smoothly tracks at normal speed, accelerates during high-speed maneuvers
    const distToTarget = Math.hypot(targetX - this.camera.x, targetY - this.camera.y);
    const adaptiveLerp = Math.min(14.0, 4.5 + distToTarget * 0.035) * dt;
    this.camera.x += (targetX - this.camera.x) * Math.min(1, adaptiveLerp);
    this.camera.y += (targetY - this.camera.y) * Math.min(1, adaptiveLerp);

    // 4. Absolute Viewport Bounds Clamp: Craft is mathematically guaranteed to stay in safe view at all times
    const halfViewW = (canvasWidth * 0.5) / Math.max(0.2, this.camera.zoom);
    const halfViewH = (canvasHeight * 0.5) / Math.max(0.2, this.camera.zoom);
    const maxAllowedOffsetX = halfViewW * 0.65;
    const maxAllowedOffsetY = halfViewH * 0.65;

    const currentOffsetX = ship.pos.x - this.camera.x;
    const currentOffsetY = ship.pos.y - this.camera.y;

    if (Math.abs(currentOffsetX) > maxAllowedOffsetX) {
      this.camera.x = ship.pos.x - Math.sign(currentOffsetX) * maxAllowedOffsetX;
    }
    if (Math.abs(currentOffsetY) > maxAllowedOffsetY) {
      this.camera.y = ship.pos.y - Math.sign(currentOffsetY) * maxAllowedOffsetY;
    }
  }

  public render(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    ship: ShipState,
    world: WorldMap,
    planet: PlanetConfig,
    particles: ParticleSystem,
    settings: { showMinimap: boolean; showFlightPath: boolean },
    time: number
  ) {
    if (!this.starfieldInitialized || this.stars.length !== planet.theme.starDensity) {
      this.initStars(planet.theme.starDensity);
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 1. Draw Atmospheric Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    bgGrad.addColorStop(0, planet.theme.skyTop);
    bgGrad.addColorStop(1, planet.theme.skyBottom);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // 2. Parallax Starfield & Distant Grid
    ctx.save();
    for (const star of this.stars) {
      const sx = ((star.x - this.camera.x * star.speed) % canvasWidth + canvasWidth) % canvasWidth;
      const sy = ((star.y - this.camera.y * star.speed) % canvasHeight + canvasHeight) % canvasHeight;
      const pulse = Math.sin(time * 2 + star.x) * 0.2 + 0.8;

      ctx.fillStyle = planet.theme.dustColor;
      ctx.globalAlpha = star.alpha * pulse;
      ctx.fillRect(sx, sy, star.size, star.size);
    }
    ctx.restore();

    // 3. World Camera Transformation
    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.scale(this.camera.zoom, this.camera.zoom);
    ctx.translate(-this.camera.x, -this.camera.y);

    // Background Subtle Vector Grid inside world space
    ctx.strokeStyle = planet.theme.gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const gridSpacing = 160;
    const startGX = Math.floor((this.camera.x - canvasWidth / this.camera.zoom) / gridSpacing) * gridSpacing;
    const endGX = Math.ceil((this.camera.x + canvasWidth / this.camera.zoom) / gridSpacing) * gridSpacing;
    const startGY = Math.floor((this.camera.y - canvasHeight / this.camera.zoom) / gridSpacing) * gridSpacing;
    const endGY = Math.ceil((this.camera.y + canvasHeight / this.camera.zoom) / gridSpacing) * gridSpacing;

    for (let gx = startGX; gx <= endGX; gx += gridSpacing) {
      ctx.moveTo(gx, startGY);
      ctx.lineTo(gx, endGY);
    }
    for (let gy = startGY; gy <= endGY; gy += gridSpacing) {
      ctx.moveTo(startGX, gy);
      ctx.lineTo(endGX, gy);
    }
    ctx.stroke();

    // 4. Draw Solid Perimeter Bedrock Walls (Left & Right Boundaries - No empty space!)
    ctx.save();
    ctx.fillStyle = planet.theme.terrainFill;
    ctx.strokeStyle = planet.theme.terrainBorder;
    ctx.lineWidth = 3;

    // West Perimeter Wall
    ctx.fillRect(-600, -600, 660, world.height + 1200);
    ctx.beginPath();
    ctx.moveTo(60, -600);
    ctx.lineTo(60, world.height + 600);
    ctx.stroke();

    // East Perimeter Wall
    ctx.fillRect(world.width - 60, -600, 660, world.height + 1200);
    ctx.beginPath();
    ctx.moveTo(world.width - 60, -600);
    ctx.lineTo(world.width - 60, world.height + 600);
    ctx.stroke();

    // Top Atmospheric Mantle/Ceiling
    ctx.fillRect(-600, -600, world.width + 1200, 650);
    ctx.beginPath();
    ctx.moveTo(-600, 50);
    ctx.lineTo(world.width + 600, 50);
    ctx.stroke();
    ctx.restore();

    // 5. Draw Ground Terrain Polygon
    ctx.save();
    if (world.groundPoints.length > 0) {
      ctx.beginPath();
      const firstPt = world.groundPoints[0];
      const lastPt = world.groundPoints[world.groundPoints.length - 1];
      ctx.moveTo(firstPt.x, world.height + 600);
      ctx.lineTo(firstPt.x, firstPt.y);
      for (let i = 1; i < world.groundPoints.length; i++) {
        ctx.lineTo(world.groundPoints[i].x, world.groundPoints[i].y);
      }
      ctx.lineTo(lastPt.x, world.height + 600);
      ctx.closePath();

      ctx.fillStyle = planet.theme.terrainFill;
      ctx.fill();

      // Terrain outline
      ctx.strokeStyle = planet.theme.terrainBorder;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
    ctx.restore();

    // 6. Draw Cave Ceiling Polygon
    ctx.save();
    const activeCeiling = world.ceilingPoints.filter((pt) => pt.y > 0);
    if (activeCeiling.length > 1) {
      ctx.beginPath();
      const first = activeCeiling[0];
      const last = activeCeiling[activeCeiling.length - 1];

      ctx.moveTo(first.x, -200);
      ctx.lineTo(first.x, first.y);
      for (const pt of activeCeiling) {
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.lineTo(last.x, -200);
      ctx.closePath();

      ctx.fillStyle = planet.theme.terrainFill;
      ctx.fill();

      // Ceiling contour line
      ctx.strokeStyle = planet.theme.terrainBorder;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
    ctx.restore();

    // 7. Draw Cavern Obstacles, Rock Bridges & Spires
    for (let i = 0; i < world.obstacles.length; i++) {
      const obs = world.obstacles[i];
      if (!obs || obs.length < 3) continue;

      const meta = world.obstacleObjects?.[i];
      const isCrystal =
        meta?.type === 'crystals' ||
        meta?.type === 'crystal' ||
        meta?.name?.toLowerCase().includes('crystal');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(obs[0].x, obs[0].y);
      for (let j = 1; j < obs.length; j++) {
        ctx.lineTo(obs[j].x, obs[j].y);
      }
      ctx.closePath();

      if (isCrystal) {
        // Theme-adaptive crystal palette derived from active planet/map theme
        const borderCol = planet.theme.terrainBorder || '#38bdf8';
        const accentCol = planet.theme.terrainAccent || '#0284c7';
        const dustCol = planet.theme.dustColor || '#38bdf8';
        const fillCol = planet.theme.terrainFill || '#0f172a';

        let minY = Infinity;
        let maxY = -Infinity;
        let minX = Infinity;
        let maxX = -Infinity;
        for (const p of obs) {
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
        }
        const midX = (minX + maxX) / 2;

        // Multi-stop theme-adaptive crystal gradient
        const grad = ctx.createLinearGradient(midX, minY, midX, maxY);
        grad.addColorStop(0, hexToRgba(dustCol, 0.95)); // Radiant crown highlight
        grad.addColorStop(0.35, hexToRgba(borderCol, 0.88)); // Upper vibrant crystal body
        grad.addColorStop(0.70, hexToRgba(accentCol, 0.78)); // Deep mineral prism
        grad.addColorStop(1, hexToRgba(fillCol, 0.95)); // Base bedrock anchor

        ctx.fillStyle = grad;
        ctx.fill();

        // Dynamic internal prism light sweep reflection
        const shimmerPhase = (Math.sin(time * 2.2 + minX * 0.01) + 1) * 0.5;
        const shimmerGrad = ctx.createLinearGradient(minX, minY, maxX, maxY);
        shimmerGrad.addColorStop(Math.max(0, shimmerPhase - 0.25), 'rgba(255, 255, 255, 0)');
        shimmerGrad.addColorStop(shimmerPhase, hexToRgba(dustCol, 0.45));
        shimmerGrad.addColorStop(Math.min(1, shimmerPhase + 0.25), 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shimmerGrad;
        ctx.fill();

        // Radiant Glowing Crystal Contour Edge
        ctx.strokeStyle = borderCol;
        ctx.lineWidth = 2.8;
        ctx.shadowColor = borderCol;
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Gemstone Facet Lines connecting base to peaks & cross-ribs
        ctx.strokeStyle = hexToRgba(dustCol, 0.60);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        if (obs.length >= 7) {
          const baseMidX = (obs[0].x + obs[obs.length - 1].x) / 2;
          const baseMidY = (obs[0].y + obs[obs.length - 1].y) / 2;
          ctx.moveTo(baseMidX, baseMidY);
          ctx.lineTo(obs[2].x, obs[2].y);
          ctx.moveTo(baseMidX, baseMidY);
          ctx.lineTo(obs[4].x, obs[4].y);
          ctx.moveTo(baseMidX, baseMidY);
          ctx.lineTo(obs[6].x, obs[6].y);
          // Horizontal / diagonal facet ridges
          ctx.moveTo(obs[2].x, obs[2].y);
          ctx.lineTo(obs[3].x, obs[3].y);
          ctx.lineTo(obs[4].x, obs[4].y);
          ctx.lineTo(obs[5].x, obs[5].y);
          ctx.lineTo(obs[6].x, obs[6].y);
        } else {
          const cx = (minX + maxX) / 2;
          const cy = (minY + maxY) / 2;
          for (let j = 0; j < obs.length; j += 2) {
            ctx.moveTo(cx, cy);
            ctx.lineTo(obs[j].x, obs[j].y);
          }
        }
        ctx.stroke();

        // HIGH VISIBILITY VIBRANT SPARKLE & LIGHT ANIMATIONS
        const peaks: { x: number; y: number }[] = [];
        if (obs.length >= 7) {
          peaks.push(obs[2], obs[4], obs[6]);
        } else {
          const sorted = [...obs].sort((a, b) => a.y - b.y);
          peaks.push(...sorted.slice(0, 3));
        }

        for (let pIdx = 0; pIdx < peaks.length; pIdx++) {
          const tip = peaks[pIdx];
          const seedOffset = minX * 0.05 + pIdx * 2.1;
          const sparkleVal = Math.sin(time * 4.5 + seedOffset);
          const sparkleScale = Math.max(0, sparkleVal * 0.5 + 0.5); // 0.0 to 1.0

          if (sparkleScale > 0.05) {
            const currentSize = 6 + sparkleScale * 10; // 6px to 16px radius
            const rot = time * 1.5 + seedOffset;

            // 1. Ambient Glow Flare Aura
            ctx.fillStyle = hexToRgba(dustCol, 0.45 * sparkleScale);
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, currentSize * 1.3, 0, Math.PI * 2);
            ctx.fill();

            // 2. High-intensity White Core Diamond
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(tip.x, tip.y, 2.8 * sparkleScale, 0, Math.PI * 2);
            ctx.fill();

            // 3. Rotating 4-Point Starburst (Horizontal & Vertical)
            ctx.save();
            ctx.translate(tip.x, tip.y);
            ctx.rotate(rot);

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.8 * sparkleScale;
            ctx.beginPath();
            ctx.moveTo(-currentSize, 0);
            ctx.lineTo(currentSize, 0);
            ctx.moveTo(0, -currentSize);
            ctx.lineTo(0, currentSize);
            ctx.stroke();

            // 4. Secondary 45-degree Cross Rays for full 8-point dazzling star
            ctx.strokeStyle = hexToRgba(dustCol, 0.85 * sparkleScale);
            ctx.lineWidth = 1.2 * sparkleScale;
            const diagSize = currentSize * 0.65;
            ctx.beginPath();
            ctx.moveTo(-diagSize, -diagSize);
            ctx.lineTo(diagSize, diagSize);
            ctx.moveTo(-diagSize, diagSize);
            ctx.lineTo(diagSize, -diagSize);
            ctx.stroke();

            ctx.restore();
          }
        }

        // Floating Sparkling Crystal Essence Flecks
        for (let f = 0; f < 3; f++) {
          const fleckTime = (time * 1.2 + minX * 0.03 + f * 1.7) % 2.5;
          const progress = fleckTime / 2.5;
          const fleckAlpha = Math.sin(progress * Math.PI) * 0.8;
          if (fleckAlpha > 0.05) {
            const fleckX = midX + Math.sin(time * 2.0 + f * 3) * (maxX - minX) * 0.35;
            const fleckY = minY - progress * 40 - f * 5;
            const fleckRadius = 1.5 + Math.sin(time * 5 + f) * 0.8;

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(fleckX, fleckY, fleckRadius, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = hexToRgba(dustCol, fleckAlpha);
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(fleckX - 4, fleckY);
            ctx.lineTo(fleckX + 4, fleckY);
            ctx.moveTo(fleckX, fleckY - 4);
            ctx.lineTo(fleckX, fleckY + 4);
            ctx.stroke();
          }
        }
      } else {
        // Standard Cavern Obstacle Fill & Border
        ctx.fillStyle = planet.theme.terrainFill;
        ctx.fill();
        ctx.strokeStyle = planet.theme.terrainBorder;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Subtle mineral accent lines across large rock bridges
        if (obs.length >= 6) {
          ctx.strokeStyle = planet.theme.terrainAccent;
          ctx.globalAlpha = 0.35;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(obs[0].x + 30, obs[0].y + 10);
          ctx.lineTo(obs[2].x - 30, obs[2].y + 10);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // 7b. Draw Active Volcanoes (Mountain cone, molten caldera, fire plumes & ejected rocks)
    if (world.volcanoes && world.volcanoes.length > 0) {
      this.drawVolcanoes(ctx, world.volcanoes, ship, planet, time);
    }

    // 8. Draw Launch Pad (Start Point - Wide)
    this.drawLaunchPad(ctx, world.launchPad, planet, time);

    // 9. Draw Landing Pad (Finish Point - Wide)
    this.drawLandingPad(ctx, world.landingPad, planet, ship, time);

    // 10. Draw Cargo Platforms (Pickup Depot & Nexus Drop Zone)
    if (world.cargoPlatforms && world.cargoPlatforms.length > 0) {
      this.drawCargoPlatforms(ctx, world.cargoPlatforms, ship, time);
    }

    // 10b. Draw Strategic Cavern Directional Signposts with Mine Arrows pointing to bases
    if (world.signposts && world.signposts.length > 0) {
      this.drawStrategicSignposts(ctx, world.signposts, ship, time);
    }

    // 10c. Draw Map Text Notes (User Map Labels & Tactical Field Notes)
    if (world.textNotes && world.textNotes.length > 0) {
      this.drawTextNotes(ctx, world.textNotes, time);
    }

    // 12. Draw Fuel Pickups
    for (const pickup of world.pickups) {
      if (!pickup.collected) {
        this.drawFuelPickup(ctx, pickup, planet, time);
      }
    }

    // 13. Draw Cargo Containers
    if (world.cargoItems && world.cargoItems.length > 0) {
      this.drawCargoContainers(ctx, world.cargoItems, time);
    }

    // 13b. Draw Planetary Trucks & Heavy Rovers
    if (world.trucks && world.trucks.length > 0) {
      this.drawTrucks(ctx, world.trucks, ship, time);
    }

    // 14. Draw Tether Cable and Electromagnetic Hook
    if (world.cargoItems && world.cargoItems.length > 0 && !ship.isCrashed) {
      this.drawTether(ctx, ship, world.cargoItems, time);
    }

    // 15. Draw Flight Trajectory Vector / Guideline
    if (settings.showFlightPath && !ship.isCrashed && !ship.isLanded && !ship.landingSettling) {
      this.drawTrajectory(ctx, ship, planet);
    }

    // 16. Draw Particle Effects (Sparks, Smoke, and Broken Ship Debris Shards)
    particles.draw(ctx);

    // 17. Draw Spaceship
    if (!ship.isCrashed) {
      this.drawShip(ctx, ship, planet, time);
    }

    ctx.restore();
  }

  private drawCaveZones(
    ctx: CanvasRenderingContext2D,
    zones: WorldMap['caveZones'],
    ship: ShipState,
    time: number
  ) {
    if (!zones) return;
    ctx.save();

    for (const zone of zones) {
      const centerX = (zone.bounds.x1 + zone.bounds.x2) * 0.5;
      const topY = zone.bounds.y1 + 45;

      // Subtle architectural level beacon floating at the top of major chambers
      const inZone =
        ship.pos.x >= zone.bounds.x1 &&
        ship.pos.x <= zone.bounds.x2 &&
        ship.pos.y >= zone.bounds.y1 &&
        ship.pos.y <= zone.bounds.y2;

      ctx.save();
      ctx.translate(centerX, topY);

      // Ambient sector plaque
      ctx.fillStyle = inZone ? 'rgba(15, 23, 42, 0.75)' : 'rgba(15, 23, 42, 0.45)';
      ctx.strokeStyle = inZone ? '#38bdf8' : 'rgba(148, 163, 184, 0.35)';
      ctx.lineWidth = inZone ? 1.5 : 1.0;
      const plaqueW = 280;
      const plaqueH = 28;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(-plaqueW * 0.5, -plaqueH * 0.5, plaqueW, plaqueH, 6)
        : ctx.rect(-plaqueW * 0.5, -plaqueH * 0.5, plaqueW, plaqueH);
      ctx.fill();
      ctx.stroke();

      // Level badge
      ctx.fillStyle = inZone ? '#38bdf8' : '#94a3b8';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        `LEVEL ${zone.level} // ${zone.name.toUpperCase()}`,
        0,
        4
      );

      ctx.restore();
    }

    ctx.restore();
  }

  // =========================================================================
  // LARGE INDUSTRIAL MINE-THEMED NAVIGATION ARROWS & BASE SYMBOLS (3X SIZE, ELEVATED)
  // =========================================================================
  private drawMineBaseMarkers(
    ctx: CanvasRenderingContext2D,
    world: WorldMap,
    ship: ShipState,
    planet: PlanetConfig,
    time: number
  ) {
    ctx.save();

    interface BaseMarker {
      x: number;
      y: number;
      type: 'launch' | 'pickup' | 'vehicle_depot' | 'drop' | 'landing';
      name: string;
      color: string;
      accent: string;
      isFulfilled?: boolean;
    }

    const markers: BaseMarker[] = [
      {
        x: world.launchPad.center.x,
        y: world.launchPad.y,
        type: 'launch',
        name: 'ORIGIN / REPAIR DOCK',
        color: '#38bdf8',
        accent: '#0284c7',
      },
      {
        x: world.landingPad.center.x,
        y: world.landingPad.y,
        type: 'landing',
        name: 'PRIMARY EXTRACTION LZ',
        color: '#22c55e',
        accent: '#16a34a',
      },
    ];

    if (world.cargoPlatforms) {
      for (const cp of world.cargoPlatforms) {
        if (cp.type === 'pickup') {
          markers.push({
            x: cp.center.x,
            y: cp.y,
            type: 'pickup',
            name: cp.label || 'ORE / CARGO DEPOT',
            color: '#f59e0b',
            accent: '#d97706',
          });
        } else if (cp.type === 'vehicle_depot') {
          markers.push({
            x: cp.center.x,
            y: cp.y,
            type: 'vehicle_depot',
            name: cp.label || 'HEAVY ROVER STATION',
            color: '#38bdf8',
            accent: '#0284c7',
          });
        } else {
          markers.push({
            x: cp.center.x,
            y: cp.y,
            type: 'drop',
            name: cp.label || 'NEXUS CARGO RECEIVER',
            color: '#10b981',
            accent: '#059669',
            isFulfilled: cp.isFulfilled,
          });
        }
      }
    }

    for (const marker of markers) {
      const dist = Math.hypot(ship.pos.x - marker.x, ship.pos.y - marker.y);
      // High elevation above platform (195px up with gentle industrial float)
      const bob = Math.sin(time * 3.0 + marker.x * 0.01) * 12;
      const markerY = marker.y - 195 + bob;

      ctx.save();
      ctx.translate(marker.x, markerY);

      // Support gantry mast / cable truss connecting marker down to base platform
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.65)';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(-24, 85);
      ctx.lineTo(-12, 195 - bob);
      ctx.moveTo(24, 85);
      ctx.lineTo(12, 195 - bob);
      ctx.moveTo(-20, 120);
      ctx.lineTo(20, 145);
      ctx.moveTo(20, 120);
      ctx.lineTo(-20, 145);
      ctx.stroke();

      const isFulfilled = marker.isFulfilled;
      const primaryColor = isFulfilled ? '#22c55e' : marker.color;

      // Glow beacon aura
      const pulse = Math.sin(time * 4.5 + marker.x * 0.02) * 0.35 + 0.65;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 28 * pulse;

      // 3X SIZE Heavy Mine Octagonal Signboard Plate (Size: 154x154)
      const signSize = 154;
      const halfS = signSize * 0.5;
      const cornerCut = 26;

      ctx.fillStyle = '#060911';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 6.0;

      ctx.beginPath();
      ctx.moveTo(-halfS + cornerCut, -halfS);
      ctx.lineTo(halfS - cornerCut, -halfS);
      ctx.lineTo(halfS, -halfS + cornerCut);
      ctx.lineTo(halfS, halfS - cornerCut);
      ctx.lineTo(halfS - cornerCut, halfS);
      ctx.lineTo(-halfS + cornerCut, halfS);
      ctx.lineTo(-halfS, halfS - cornerCut);
      ctx.lineTo(-halfS, -halfS + cornerCut);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Yellow/Black Hazard Striped Outer Trim along top & bottom
      ctx.shadowBlur = 0;
      ctx.save();
      ctx.clip();
      ctx.fillStyle = '#f59e0b';
      for (let hx = -halfS - 40; hx < halfS + 40; hx += 24) {
        ctx.beginPath();
        ctx.moveTo(hx, -halfS);
        ctx.lineTo(hx + 12, -halfS);
        ctx.lineTo(hx - 6, -halfS + 12);
        ctx.lineTo(hx - 18, -halfS + 12);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(hx, halfS - 12);
        ctx.lineTo(hx + 12, halfS - 12);
        ctx.lineTo(hx - 6, halfS);
        ctx.lineTo(hx - 18, halfS);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // Inner Industrial Border with Rivets
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3.0;
      ctx.strokeRect(-halfS + 14, -halfS + 14, signSize - 28, signSize - 28);

      // Heavy Industrial Steel Corner Bolted Washers
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2.0;
      const rivetOff = halfS - 18;
      const drawRivet = (rx: number, ry: number) => {
        ctx.beginPath();
        ctx.arc(rx, ry, 5.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      };
      drawRivet(-rivetOff, -rivetOff);
      drawRivet(rivetOff, -rivetOff);
      drawRivet(rivetOff, rivetOff);
      drawRivet(-rivetOff, rivetOff);

      // =====================================================================
      // 2. ENLARGED 3X MINE/INDUSTRIAL SYMBOLS (Bold Vector Artwork)
      // =====================================================================
      ctx.fillStyle = primaryColor;
      ctx.strokeStyle = primaryColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (marker.type === 'pickup') {
        // MINE SYMBOL: Crossed Mining Pickaxes & Ore Crate
        ctx.lineWidth = 7.0;
        // Left Pickaxe Handle & Pick Head
        ctx.beginPath();
        ctx.moveTo(-36, 32);
        ctx.lineTo(32, -36);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(28, -32, 26, Math.PI * 1.05, Math.PI * 1.85);
        ctx.stroke();

        // Right Pickaxe Handle & Pick Head
        ctx.beginPath();
        ctx.moveTo(36, 32);
        ctx.lineTo(-32, -36);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-28, -32, 26, Math.PI * 1.15, Math.PI * 1.95);
        ctx.stroke();

        // Glowing Core Ore Crystal in center
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(0, 0, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-3, -3, 4, 0, Math.PI * 2);
        ctx.fill();

      } else if (marker.type === 'vehicle_depot') {
        // VEHICLE SYMBOL: Heavy Rover Cab & Giant Tread Sprockets
        ctx.lineWidth = 6.0;
        ctx.beginPath();
        ctx.moveTo(-42, 10);
        ctx.lineTo(-42, -10);
        ctx.lineTo(-12, -10);
        ctx.lineTo(10, -32);
        ctx.lineTo(42, -32);
        ctx.lineTo(42, 10);
        ctx.closePath();
        ctx.stroke();

        // Heavy Wheel Sprockets
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.arc(-26, 20, 14, 0, Math.PI * 2);
        ctx.arc(26, 20, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#060911';
        ctx.beginPath();
        ctx.arc(-26, 20, 5.5, 0, Math.PI * 2);
        ctx.arc(26, 20, 5.5, 0, Math.PI * 2);
        ctx.fill();

      } else if (marker.type === 'drop') {
        // DROP ZONE SYMBOL: Heavy Delivery Funnel Hopper with Downward Chute Arrow
        ctx.lineWidth = 7.0;
        ctx.beginPath();
        ctx.moveTo(-42, -32);
        ctx.lineTo(42, -32);
        ctx.lineTo(20, 0);
        ctx.lineTo(-20, 0);
        ctx.closePath();
        ctx.stroke();

        // Downward Delivery Arrow inside chute
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 36);
        ctx.lineTo(-14, 20);
        ctx.moveTo(0, 36);
        ctx.lineTo(14, 20);
        ctx.stroke();

      } else if (marker.type === 'landing') {
        // LANDING BASE SYMBOL: Massive Mining Helipad 'H' with Radar Scope Rings
        ctx.lineWidth = 8.0;
        ctx.beginPath();
        ctx.moveTo(-30, -36);
        ctx.lineTo(-30, 36);
        ctx.moveTo(30, -36);
        ctx.lineTo(30, 36);
        ctx.moveTo(-30, 0);
        ctx.lineTo(30, 0);
        ctx.stroke();

        // Circular Guidance Ring
        ctx.lineWidth = 4.0;
        ctx.beginPath();
        ctx.arc(0, 0, 48, 0, Math.PI * 2);
        ctx.stroke();

      } else {
        // LAUNCH SITE SYMBOL: Heavy Launch Rocket / Ascent Gantry
        ctx.lineWidth = 7.0;
        ctx.beginPath();
        ctx.moveTo(0, -42);
        ctx.lineTo(-32, 32);
        ctx.lineTo(0, 14);
        ctx.lineTo(32, 32);
        ctx.closePath();
        ctx.fill();
      }

      // =====================================================================
      // 3. LARGE CHUNKY DOWNWARD ARROW / CHEVRON (Points directly to base)
      // =====================================================================
      const arrowOffsetY = halfS + 6;
      ctx.fillStyle = primaryColor;
      ctx.strokeStyle = '#060911';
      ctx.lineWidth = 3.5;

      ctx.beginPath();
      ctx.moveTo(-40, arrowOffsetY);
      ctx.lineTo(40, arrowOffsetY);
      ctx.lineTo(0, arrowOffsetY + 46);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner Arrow High-Contrast Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-18, arrowOffsetY + 7);
      ctx.lineTo(18, arrowOffsetY + 7);
      ctx.lineTo(0, arrowOffsetY + 28);
      ctx.closePath();
      ctx.fill();

      // =====================================================================
      // 4. LARGE INDUSTRIAL SIGNBOARD TEXT & DISTANCE
      // =====================================================================
      const textY = -halfS - 26;
      const labelText = marker.name.toUpperCase();
      const distMeters = Math.round(dist * 0.1);

      ctx.font = 'bold 20px monospace';
      ctx.textAlign = 'center';
      const labelMetrics = ctx.measureText(labelText);
      const bgW = Math.max(280, labelMetrics.width + 36);
      const bgH = 38;

      // Dark Industrial Background Banner Box
      ctx.fillStyle = 'rgba(6, 9, 17, 0.95)';
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(-bgW * 0.5, textY - bgH + 8, bgW, bgH, 8)
        : ctx.rect(-bgW * 0.5, textY - bgH + 8, bgW, bgH);
      ctx.fill();
      ctx.stroke();

      // Glowing Text
      ctx.fillStyle = primaryColor;
      ctx.fillText(labelText, 0, textY - 4);

      // Distance Pill Beneath
      ctx.font = 'bold 15px monospace';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(`RANGE: ${distMeters} METERS`, 0, textY + 22);

      ctx.restore();
    }

    ctx.restore();
  }

  // =========================================================================
  // STRATEGIC CAVERN MINE SIGNPOSTS (Directional Signs Pointing to Bases)
  // =========================================================================
  private drawStrategicSignposts(
    ctx: CanvasRenderingContext2D,
    signposts: NonNullable<WorldMap['signposts']>,
    ship: ShipState,
    time: number
  ) {
    ctx.save();

    for (const sign of signposts) {
      const distToShip = Math.hypot(ship.pos.x - sign.x, ship.pos.y - sign.y);
      const bob = Math.sin(time * 3.0 + sign.x * 0.02) * 6;

      ctx.save();
      ctx.translate(sign.x, sign.y + bob);

      // 1. Hanging Industrial Chains / Mining Gantry Mount to Ceiling or Wall
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(-60, -50);
      ctx.lineTo(-60, -90);
      ctx.moveTo(60, -50);
      ctx.lineTo(60, -90);
      ctx.stroke();

      // Chain Links
      ctx.fillStyle = '#64748b';
      for (let cy = -85; cy <= -55; cy += 12) {
        ctx.fillRect(-63, cy, 6, 8);
        ctx.fillRect(57, cy, 6, 8);
      }

      // 2. Heavy Mine Signboard Frame (Chunky Dark Steel with Bold Color Trim)
      const signW = 200;
      const signH = 56;
      const halfW = signW * 0.5;
      const halfH = signH * 0.5;

      const pulse = Math.sin(time * 4 + sign.x * 0.01) * 0.3 + 0.7;
      ctx.shadowColor = sign.color;
      ctx.shadowBlur = 14 * pulse;

      // Dark Backplate
      ctx.fillStyle = '#060911';
      ctx.strokeStyle = sign.color;
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.roundRect
        ? ctx.roundRect(-halfW, -halfH, signW, signH, 10)
        : ctx.rect(-halfW, -halfH, signW, signH);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Hazard Diagonal Warning Border on Left / Right Wings
      ctx.save();
      ctx.clip();
      ctx.fillStyle = '#f59e0b';
      for (let hx = -halfW - 20; hx < -halfW + 24; hx += 10) {
        ctx.beginPath();
        ctx.moveTo(hx, -halfH);
        ctx.lineTo(hx + 5, -halfH);
        ctx.lineTo(hx - 5, halfH);
        ctx.lineTo(hx - 10, halfH);
        ctx.closePath();
        ctx.fill();
      }
      for (let hx = halfW - 24; hx < halfW + 20; hx += 10) {
        ctx.beginPath();
        ctx.moveTo(hx, -halfH);
        ctx.lineTo(hx + 5, -halfH);
        ctx.lineTo(hx - 5, halfH);
        ctx.lineTo(hx - 10, halfH);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // 3. Bold Directional Mine Arrow
      ctx.save();
      const arrowX = sign.direction.includes('left') ? -halfW + 30 : halfW - 30;
      ctx.translate(arrowX, 0);

      // Rotate arrow according to direction
      let rot = 0;
      if (sign.direction === 'right') rot = 0;
      else if (sign.direction === 'left') rot = Math.PI;
      else if (sign.direction === 'down') rot = Math.PI * 0.5;
      else if (sign.direction === 'up') rot = -Math.PI * 0.5;
      else if (sign.direction === 'down_right') rot = Math.PI * 0.25;
      else if (sign.direction === 'down_left') rot = Math.PI * 0.75;
      else if (sign.direction === 'up_right') rot = -Math.PI * 0.25;
      else if (sign.direction === 'up_left') rot = -Math.PI * 0.75;

      ctx.rotate(rot);

      // Chunky Glowing Arrow
      ctx.fillStyle = sign.color;
      ctx.strokeStyle = '#060911';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-14, -9);
      ctx.lineTo(3, -9);
      ctx.lineTo(3, -17);
      ctx.lineTo(18, 0);
      ctx.lineTo(3, 17);
      ctx.lineTo(3, 9);
      ctx.lineTo(-14, 9);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Arrow Core Highlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-9, -3);
      ctx.lineTo(4, -3);
      ctx.lineTo(4, -7);
      ctx.lineTo(12, 0);
      ctx.lineTo(4, 7);
      ctx.lineTo(4, 3);
      ctx.lineTo(-9, 3);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // 4. Industrial Mine Text in Sign Center
      const contentCenterX = sign.direction.includes('left') ? 16 : -16;
      ctx.textAlign = 'center';

      // Normalize sign display name according to type / targetName
      let displayName = sign.targetName || 'LZ';
      const upper = (sign.targetName || '').toUpperCase();
      if (sign.targetType === 'fuel' || upper.includes('FUEL') || upper.includes('REFILL') || upper.includes('GAS')) {
        displayName = 'Fuel';
      } else if (sign.targetType === 'pickup' || upper.includes('CARGO') || upper.includes('VAULT') || upper.includes('ORE')) {
        displayName = sign.targetName || 'Cargo Vault';
      } else if (sign.targetType === 'vehicle_depot' || upper.includes('ROVER') || upper.includes('VEHICLE')) {
        displayName = sign.targetName || 'Rover Depot';
      } else if (sign.targetType === 'landing' || sign.targetType === 'launch' || upper.includes('LZ') || upper.includes('LAND') || upper.includes('LAUNCH')) {
        displayName = sign.targetName || 'LZ';
      }

      const fontSize = displayName.length > 13 ? 14 : 17;
      ctx.font = `bold ${fontSize}px "Share Tech Mono", monospace`;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(displayName, contentCenterX, 6);

      ctx.restore();
    }

    ctx.restore();
  }

  private drawTextNotes(
    ctx: CanvasRenderingContext2D,
    textNotes: NonNullable<WorldMap['textNotes']>,
    time: number
  ) {
    if (!textNotes || textNotes.length === 0) return;
    ctx.save();

    for (const note of textNotes) {
      if (!note.text) continue;
      ctx.save();
      ctx.translate(note.x, note.y);

      // Font size
      let fontSize = 18;
      let padX = 14;
      let padY = 8;
      if (note.size === 'small') {
        fontSize = 13;
        padX = 10;
        padY = 5;
      } else if (note.size === 'medium') {
        fontSize = 18;
        padX = 14;
        padY = 8;
      } else if (note.size === 'large') {
        fontSize = 28;
        padX = 18;
        padY = 10;
      } else if (note.size === 'xl') {
        fontSize = 42;
        padX = 24;
        padY = 14;
      } else if (note.size === 'xxl') {
        fontSize = 62;
        padX = 32;
        padY = 18;
      }

      // Font family matching game themes
      let fontFamily = '"Share Tech Mono", monospace';
      if (note.style === 'sans-serif') fontFamily = '"Rajdhani", system-ui, -apple-system, sans-serif';
      else if (note.style === 'orbitron') fontFamily = '"Orbitron", sans-serif';
      else if (note.style === 'rajdhani') fontFamily = '"Rajdhani", sans-serif';
      else if (note.style === 'courier') fontFamily = '"Courier New", Courier, monospace';
      else fontFamily = '"Share Tech Mono", monospace';

      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textBaseline = 'middle';
      const align = note.align || 'center';
      ctx.textAlign = align as CanvasTextAlign;

      const lines = note.text.split('\n');
      const lineHeight = fontSize * 1.25;
      let maxWidth = 0;
      for (const line of lines) {
        const m = ctx.measureText(line).width;
        if (m > maxWidth) maxWidth = m;
      }
      const totalH = lines.length * lineHeight;
      const boxW = Math.max(maxWidth + padX * 2, 40);
      const boxH = Math.max(totalH + padY * 2, 28);
      const halfW = boxW * 0.5;
      const halfH = boxH * 0.5;

      const noteColor = note.color || '#38bdf8';

      // Draw box border and tech backdrop if enabled
      if (note.showBorder) {
        ctx.fillStyle = 'rgba(6, 10, 18, 0.85)';
        ctx.strokeStyle = noteColor;
        ctx.lineWidth = Math.max(1.8, Math.min(3.5, fontSize * 0.08));
        ctx.shadowColor = noteColor;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-halfW, -halfH, boxW, boxH, Math.min(8, fontSize * 0.25));
        } else {
          ctx.rect(-halfW, -halfH, boxW, boxH);
        }
        ctx.fill();
        ctx.stroke();

        // Corner tech accents
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        const cornerSize = Math.min(8, fontSize * 0.3);

        // Top-left
        ctx.beginPath();
        ctx.moveTo(-halfW + cornerSize, -halfH);
        ctx.lineTo(-halfW, -halfH);
        ctx.lineTo(-halfW, -halfH + cornerSize);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(halfW - cornerSize, halfH);
        ctx.lineTo(halfW, halfH);
        ctx.lineTo(halfW, halfH - cornerSize);
        ctx.stroke();
      } else {
        // Without border: subtle drop shadow for maximum legibility over rocks/space
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 8;
      }

      // Draw text lines
      ctx.fillStyle = noteColor;
      let textX = 0;
      if (align === 'left') {
        textX = note.showBorder ? -halfW + padX : -maxWidth * 0.5;
      } else if (align === 'right') {
        textX = note.showBorder ? halfW - padX : maxWidth * 0.5;
      }
      const startY = -totalH * 0.5 + lineHeight * 0.5;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], textX, startY + i * lineHeight);
      }

      ctx.restore();
    }

    ctx.restore();
  }

  private drawCargoPlatforms(
    ctx: CanvasRenderingContext2D,
    platforms: WorldMap['cargoPlatforms'],
    ship: ShipState,
    time: number
  ) {
    if (!platforms) return;
    ctx.save();

    const shipConfig = getShipConfig(ship.modelId);
    const canCarryVehicles = Boolean(shipConfig.canCarryVehicles || shipConfig.isHeavyVehicleCarrier);

    for (const pad of platforms) {
      const isPickup = pad.type === 'pickup';
      const isVehicleDepot = pad.type === 'vehicle_depot';
      const cType = pad.cargoType || 'standard';

      // Distance and approach telemetry from craft to platform
      const distToShip = Math.hypot(ship.pos.x - pad.center.x, ship.pos.y - pad.y);
      const isApproaching = distToShip < 680;
      const isClose = distToShip < 340;
      const isOverPad = ship.pos.x >= pad.x1 - 20 && ship.pos.x <= pad.x2 + 20 && ship.pos.y < pad.y;

      // Color scheme based on platform type and volatile cargo classification
      let padColor = '#f59e0b';
      let accentColor = '#d97706';
      let glowColor = 'rgba(245, 158, 11, 0.4)';
      let beaconColor = '#f59e0b';

      if (isVehicleDepot) {
        if (!isApproaching) {
          padColor = '#94a3b8';
          accentColor = '#64748b';
          glowColor = 'rgba(148, 163, 184, 0.3)';
          beaconColor = '#cbd5e1';
        } else if (canCarryVehicles) {
          padColor = '#22c55e';
          accentColor = '#16a34a';
          glowColor = 'rgba(34, 197, 94, 0.55)';
          beaconColor = '#4ade80';
        } else {
          padColor = '#ef4444';
          accentColor = '#dc2626';
          glowColor = 'rgba(239, 68, 68, 0.55)';
          beaconColor = '#f87171';
        }
      } else if (isPickup) {
        if (cType === 'explosive') {
          padColor = '#f97316';
          accentColor = '#ea580c';
          glowColor = 'rgba(249, 115, 22, 0.55)';
          beaconColor = '#ef4444';
        } else if (cType === 'cryogenic') {
          padColor = '#38bdf8';
          accentColor = '#0284c7';
          glowColor = 'rgba(56, 189, 248, 0.55)';
          beaconColor = '#67e8f9';
        } else if (cType === 'isotope') {
          padColor = '#c084fc';
          accentColor = '#9333ea';
          glowColor = 'rgba(192, 132, 252, 0.55)';
          beaconColor = '#e879f9';
        } else if (cType === 'magnetic') {
          padColor = '#3b82f6';
          accentColor = '#1d4ed8';
          glowColor = 'rgba(59, 130, 246, 0.55)';
          beaconColor = '#60a5fa';
        } else if (cType === 'plasma') {
          padColor = '#10b981';
          accentColor = '#059669';
          glowColor = 'rgba(16, 185, 129, 0.55)';
          beaconColor = '#34d399';
        } else {
          padColor = '#f59e0b';
          accentColor = '#d97706';
          glowColor = 'rgba(245, 158, 11, 0.45)';
          beaconColor = '#fbbf24';
        }
      } else {
        // Drop / fulfillment receiver platform
        padColor = pad.isFulfilled ? '#22c55e' : '#10b981';
        accentColor = pad.isFulfilled ? '#16a34a' : '#059669';
        glowColor = pad.isFulfilled ? 'rgba(34, 197, 94, 0.5)' : 'rgba(16, 185, 129, 0.45)';
        beaconColor = pad.isFulfilled ? '#4ade80' : '#34d399';
      }

      // =======================================================================
      // 1. UNDER-DECK GROUND ILLUMINATION & SUB-BEDROCK REINFORCEMENTS
      // =======================================================================
      const washIntensity = isClose ? 0.65 : isApproaching ? 0.4 : 0.2;
      const groundWash = ctx.createRadialGradient(
        pad.center.x, pad.y + 16, 8,
        pad.center.x, pad.y + 24, pad.width * 0.7
      );
      groundWash.addColorStop(0, glowColor);
      groundWash.addColorStop(0.6, `rgba(15, 23, 42, ${washIntensity * 0.4})`);
      groundWash.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = groundWash;
      ctx.beginPath();
      ctx.ellipse(pad.center.x, pad.y + 20, pad.width * 0.75, 24, 0, 0, Math.PI * 2);
      ctx.fill();

      // Heavy Subterranean Foundation Pylons with Hydraulic Shock Dampers
      const pylonWidth = isVehicleDepot ? 18 : 14;
      const pylonCount = isVehicleDepot ? 6 : 4;
      const pylonSpacing = (pad.width - pylonWidth) / (pylonCount - 1);

      for (let i = 0; i < pylonCount; i++) {
        const px = pad.x1 + i * pylonSpacing;
        // Pylon casing
        ctx.fillStyle = '#0b1120';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.0;
        ctx.fillRect(px, pad.y + 12, pylonWidth, 36);
        ctx.strokeRect(px, pad.y + 12, pylonWidth, 36);

        // Chrome damper piston rod
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(px + 3, pad.y + 14, pylonWidth - 6, 12);

        // Status LED strip on pylon
        ctx.fillStyle = beaconColor;
        ctx.fillRect(px + pylonWidth * 0.5 - 1.5, pad.y + 28, 3, 14);

        // Heavy anchor flange shoe
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(px - 2, pad.y + 44, pylonWidth + 4, 6);
      }

      // Continuous Heavy Sub-deck Truss Bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pad.x1 - 2, pad.y + 10, pad.width + 4, 6);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(pad.x1 - 2, pad.y + 10, pad.width + 4, 6);

      // Dynamic Energy Conduit Flow beneath deck
      const conduitPulseX = (time * (isApproaching ? 80 : 35)) % pad.width;
      ctx.fillStyle = padColor;
      ctx.fillRect(pad.x1 + conduitPulseX - 8, pad.y + 11, 16, 4);

      // =======================================================================
      // 2. STATIC PLATFORM STANCHIONS & ARCHITECTURAL BASE PERIMETER LIGHTS
      // (Tracking approach spotlights & guidance beams are strictly for the LZ)
      // =======================================================================
      const leftSpotX = pad.x1 - 10;
      const rightSpotX = pad.x2 + 10;
      const mastY = pad.y - 28;

      // Left Fixed Architectural Stanchion Mast & Downward Worklight
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2.0;
      ctx.fillRect(leftSpotX - 4, pad.y - 26, 8, 34);
      ctx.strokeRect(leftSpotX - 4, pad.y - 26, 8, 34);

      // Left Downward Worklight Lamp Head (Fixed angle illuminating deck)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.fillRect(leftSpotX - 6, mastY, 12, 8);
      ctx.strokeRect(leftSpotX - 6, mastY, 12, 8);
      ctx.fillStyle = padColor;
      ctx.beginPath();
      ctx.arc(leftSpotX + 4, mastY + 4, 3, 0, Math.PI * 2);
      ctx.fill();

      // Right Fixed Architectural Stanchion Mast & Downward Worklight
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2.0;
      ctx.fillRect(rightSpotX - 4, pad.y - 26, 8, 34);
      ctx.strokeRect(rightSpotX - 4, pad.y - 26, 8, 34);

      // Right Downward Worklight Lamp Head (Fixed angle illuminating deck)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      ctx.fillRect(rightSpotX - 6, mastY, 12, 8);
      ctx.strokeRect(rightSpotX - 6, mastY, 12, 8);
      ctx.fillStyle = padColor;
      ctx.beginPath();
      ctx.arc(rightSpotX - 4, mastY + 4, 3, 0, Math.PI * 2);
      ctx.fill();

      // =======================================================================
      // 3. HEAVY REINFORCED DECK PLATFORM SURFACE & HAZARD RUNWAY STRIPES
      // =======================================================================
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(pad.x1, pad.y, pad.width, 12);
      ctx.strokeStyle = padColor;
      ctx.lineWidth = 2.4;
      ctx.strokeRect(pad.x1, pad.y, pad.width, 12);

      // Warning Chevron Striping across platform deck
      ctx.strokeStyle = padColor;
      ctx.lineWidth = 2.0;
      for (let x = pad.x1 + 12; x < pad.x2 - 12; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, pad.y + 1);
        ctx.lineTo(x + 8, pad.y + 11);
        ctx.stroke();
      }

      // Static Runway Edge Markers (Deck perimeter LEDs)
      const numLeds = Math.floor(pad.width / 24);
      for (let i = 0; i < numLeds; i++) {
        const lx = pad.x1 + 12 + i * 24;
        ctx.fillStyle = padColor;
        ctx.beginPath();
        ctx.arc(lx, pad.y + 6, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // =======================================================================
      // 5. SPECIALIZED EQUIPMENT PER PLATFORM & VOLATILE CARGO TYPE
      // =======================================================================
      if (isVehicleDepot) {
        // Vehicle Depot Motorized Staging Bays & Garage Archway
        const bayW = 75;
        const bayH = 34;

        // Left Bay
        ctx.fillStyle = '#090d16';
        ctx.fillRect(pad.x1 + 18, pad.y - bayH, bayW, bayH);
        ctx.strokeStyle = padColor;
        ctx.lineWidth = 2.0;
        ctx.strokeRect(pad.x1 + 18, pad.y - bayH, bayW, bayH);

        // Right Bay
        ctx.fillStyle = '#090d16';
        ctx.fillRect(pad.x2 - 18 - bayW, pad.y - bayH, bayW, bayH);
        ctx.strokeStyle = padColor;
        ctx.lineWidth = 2.0;
        ctx.strokeRect(pad.x2 - 18 - bayW, pad.y - bayH, bayW, bayH);

        // Industrial Roll-up Shutter Slats
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.2;
        for (let sy = pad.y - bayH + 6; sy < pad.y; sy += 6) {
          ctx.beginPath();
          ctx.moveTo(pad.x1 + 22, sy);
          ctx.lineTo(pad.x1 + 14 + bayW, sy);
          ctx.moveTo(pad.x2 - 14 - bayW, sy);
          ctx.lineTo(pad.x2 - 22, sy);
          ctx.stroke();
        }

        // Overhead Vehicle Transfer Monorail Beam
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(pad.x1 + 10, pad.y - bayH - 12);
        ctx.lineTo(pad.x2 - 10, pad.y - bayH - 12);
        ctx.stroke();
      } else if (isPickup) {
        if (cType === 'explosive') {
          // Reinforced Armored Blast Deflector Walls & CO2 Fire-Suppression Tanks
          const shieldX = pad.x1 - 28;
          const shieldY = pad.y - 48;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(shieldX, shieldY, 18, 56);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2.0;
          ctx.strokeRect(shieldX, shieldY, 18, 56);

          // Red Strobe Emergency Beacon
          const redFlash = Math.sin(time * 12) > 0;
          ctx.fillStyle = redFlash ? '#ef4444' : '#7f1d1d';
          ctx.beginPath();
          ctx.arc(shieldX + 9, shieldY - 5, 5, 0, Math.PI * 2);
          ctx.fill();

          // Hazard chevron on blast wall
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(shieldX + 2, shieldY + 12, 14, 6);
          ctx.fillRect(shieldX + 2, shieldY + 28, 14, 6);
        } else if (cType === 'cryogenic') {
          // Sub-Zero Vacuum Dewars & Frost Manifold Vents
          const dewarX = pad.x1 - 28;
          const dewarY = pad.y - 42;
          ctx.fillStyle = '#0c4a6e';
          ctx.fillRect(dewarX, dewarY, 18, 48);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2.0;
          ctx.strokeRect(dewarX, dewarY, 18, 48);

          // Frost condensation dome cap
          ctx.fillStyle = '#e0f2fe';
          ctx.beginPath();
          ctx.arc(dewarX + 9, dewarY, 9, Math.PI, 0);
          ctx.fill();

          // Cryogenic Frost Plume Animation
          const vaporPulse = Math.sin(time * 6) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(224, 242, 254, ${vaporPulse * 0.4})`;
          ctx.beginPath();
          ctx.arc(dewarX + 9, dewarY - 10, 8, 0, Math.PI * 2);
          ctx.fill();
        } else if (cType === 'isotope') {
          // Quantum Magnetic Containment Ring & Radiation Shield Panels
          const ringX = pad.x1 - 24;
          const ringY = pad.y - 36;
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 3.0;
          ctx.beginPath();
          ctx.arc(ringX + 8, ringY + 8, 14, 0, Math.PI * 2);
          ctx.stroke();

          // Inner Singularity Glow
          const isoPulse = Math.sin(time * 8) * 0.4 + 0.6;
          ctx.fillStyle = `rgba(192, 132, 252, ${isoPulse})`;
          ctx.beginPath();
          ctx.arc(ringX + 8, ringY + 8, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (cType === 'magnetic') {
          // Heavy Copper Electromagnetic Induction Coils
          const coilX = pad.x1 - 26;
          const coilY = pad.y - 44;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(coilX, coilY, 16, 50);
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2.0;
          ctx.strokeRect(coilX, coilY, 16, 50);

          // Copper Coil Windings
          ctx.fillStyle = '#b45309';
          for (let cy = coilY + 6; cy < pad.y - 4; cy += 8) {
            ctx.fillRect(coilX + 2, cy, 12, 4);
          }
        } else if (cType === 'plasma') {
          // High-Energy Plasma Conduit Column with Bubbling Energy
          const tubeX = pad.x1 - 26;
          const tubeY = pad.y - 46;
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(tubeX, tubeY, 16, 52);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2.0;
          ctx.strokeRect(tubeX, tubeY, 16, 52);

          // Glowing Green Plasma Stream
          const plasmaOffset = (time * 40) % 36;
          ctx.fillStyle = '#34d399';
          ctx.fillRect(tubeX + 4, tubeY + 8 + plasmaOffset, 8, 8);
        } else {
          // Standard Heavy Crane Loader Rig
          const craneX = pad.x1 - 22;
          const craneY = pad.y - 44;
          ctx.fillStyle = '#334155';
          ctx.fillRect(craneX, craneY, 14, 48);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 1.8;
          ctx.strokeRect(craneX, craneY, 14, 48);

          // Crane Outrigger Arm
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2.6;
          ctx.beginPath();
          ctx.moveTo(craneX + 7, craneY);
          ctx.lineTo(craneX + 44, craneY - 8);
          ctx.stroke();
        }
      }

      // =======================================================================
      // 6. DYNAMIC HOLOGRAPHIC STATUS SIGNBOARD & CLEARANCE HUD
      // =======================================================================
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';

      let displayLabel = pad.label;
      if (pad.isFulfilled) {
        displayLabel = `${pad.label} [CARGO SECURED]`;
      } else if (isVehicleDepot && isApproaching) {
        displayLabel = canCarryVehicles
          ? `${pad.label} [VEHICLE BAY CLEAR • ${Math.round(distToShip * 0.1)}m]`
          : `${pad.label} [NO VEHICLE HOLD • REFUEL/REPAIR ONLY]`;
      } else if (isPickup && isApproaching) {
        displayLabel = `${pad.label} [CLEARANCE: ${Math.round(distToShip * 0.1)}m]`;
      }

      // Dark Industrial Background Pill for Label
      const labelMetrics = ctx.measureText(displayLabel);
      const pillW = labelMetrics.width + 24;
      const pillH = 18;
      const pillY = pad.y + 24;

      ctx.fillStyle = 'rgba(6, 10, 18, 0.92)';
      ctx.strokeStyle = padColor;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(pad.center.x - pillW * 0.5, pillY - pillH * 0.5, pillW, pillH, 4);
      } else {
        ctx.rect(pad.center.x - pillW * 0.5, pillY - pillH * 0.5, pillW, pillH);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = isApproaching ? '#ffffff' : padColor;
      ctx.fillText(displayLabel, pad.center.x, pillY + 3.5);
    }

    ctx.restore();
  }

  private drawTrucks(
    ctx: CanvasRenderingContext2D,
    trucks: PlanetaryTruck[],
    ship: ShipState,
    time: number
  ) {
    if (!trucks || trucks.length === 0) return;
    ctx.save();

    for (const truck of trucks) {
      // If onboard the ship, the truck is rendered safely inside the ship's hold!
      if (truck.state === 'onboard') continue;

      ctx.save();
      ctx.translate(truck.pos.x, truck.pos.y);

      const halfW = truck.width * 0.5;
      const halfH = truck.height * 0.5;
      const isDriving = truck.state === 'driving_to_craft' || truck.state === 'driving_out';

      // 1. High-Power LED Headlight Cones (Left-facing when driving left, Right-facing by default)
      if (truck.headlightsOn) {
        ctx.save();
        const beamDir = isDriving && truck.pos.x > (ship.pos.x - 30) && truck.state === 'driving_to_craft' ? -1 : 1;
        const beamX = beamDir > 0 ? halfW : -halfW;
        const beamGrad = ctx.createRadialGradient(
          beamX, -4, 2,
          beamX + beamDir * 110, -4, 120
        );
        beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.65)');
        beamGrad.addColorStop(0.4, 'rgba(254, 240, 138, 0.25)');
        beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(beamX, -6);
        ctx.lineTo(beamX + beamDir * 120, -32);
        ctx.lineTo(beamX + beamDir * 120, 24);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 2. Heavy Armored Vehicle Main Chassis
      const isRover = truck.type === 'rover';
      ctx.fillStyle = truck.accentColor || '#0f172a';
      ctx.fillRect(-halfW, -halfH + 4, truck.width, truck.height - 8);
      ctx.strokeStyle = truck.color || '#f59e0b';
      ctx.lineWidth = 2.4;
      ctx.strokeRect(-halfW, -halfH + 4, truck.width, truck.height - 8);

      // Warning Chevron Striping across bottom skirt
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.6;
      for (let sx = -halfW + 6; sx <= halfW - 8; sx += 10) {
        ctx.beginPath();
        ctx.moveTo(sx, halfH - 7);
        ctx.lineTo(sx + 5, halfH - 4);
        ctx.stroke();
      }

      // 3. Elevated Cabin Cockpit & Observation Visor
      const cabW = isRover ? 18 : 22;
      const cabH = isRover ? 12 : 14;
      const cabX = halfW - cabW - 2;
      const cabY = -halfH - 2;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(cabX, cabY, cabW, cabH);
      ctx.strokeStyle = truck.color || '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(cabX, cabY, cabW, cabH);

      // Glowing Cockpit Glass Viewport
      ctx.fillStyle = isRover ? '#38bdf8' : '#0284c7';
      ctx.fillRect(cabX + 3, cabY + 2, cabW - 6, cabH - 5);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.75;
      ctx.fillRect(cabX + 4, cabY + 3, 4, 3);
      ctx.globalAlpha = 1.0;

      // 4. Equipment Bed / Heavy Cargo Module / Comms Antenna
      if (isRover) {
        // High-Gain Satellite Dish on Rover Bed
        const dishX = -halfW + 12;
        const dishY = -halfH - 4;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(dishX, -halfH + 4);
        ctx.lineTo(dishX, dishY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(dishX, dishY, 6, Math.PI * 0.7, Math.PI * 2.1);
        ctx.stroke();
      } else {
        // Heavy Mining Hydraulic Drill / Ore Container
        ctx.fillStyle = '#334155';
        ctx.fillRect(-halfW + 4, -halfH - 2, truck.width - cabW - 10, 8);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-halfW + 4, -halfH - 2, truck.width - cabW - 10, 8);
      }

      // 5. Pulsing Amber / Cyan Beacon on Rooftop
      const beaconStrobe = Math.sin(time * 8 + truck.pos.x) * 0.5 + 0.5;
      ctx.fillStyle = isRover
        ? `rgba(245, 158, 11, ${0.4 + beaconStrobe * 0.6})`
        : `rgba(56, 189, 248, ${0.4 + beaconStrobe * 0.6})`;
      ctx.beginPath();
      ctx.arc(cabX + cabW * 0.5, cabY - 3, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // 6. Heavy Off-Road Planetary Wheels with Rotating Deep-Tread Spokes
      const wheelRadius = isRover ? 7.0 : 8.5;
      const wheelY = halfH - 2;
      const wheelPositions = isRover
        ? [-halfW + 8, 0, halfW - 8]
        : [-halfW + 9, -halfW * 0.3, halfW * 0.3, halfW - 9];

      for (const wx of wheelPositions) {
        ctx.save();
        ctx.translate(wx, wheelY);
        ctx.rotate(truck.wheelAngle || 0);

        // Heavy Rubber Outer Tire Rim
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.4;
        ctx.stroke();

        // Deep Tread Grips
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1.4;
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * (wheelRadius - 3), Math.sin(a) * (wheelRadius - 3));
          ctx.lineTo(Math.cos(a) * wheelRadius, Math.sin(a) * wheelRadius);
          ctx.stroke();
        }

        // Metallic Hub Cap
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      ctx.restore();
    }

    ctx.restore();
  }

  private drawCargoContainers(
    ctx: CanvasRenderingContext2D,
    items: WorldMap['cargoItems'],
    time: number
  ) {
    if (!items) return;
    ctx.save();

    for (const cargo of items) {
      if (cargo.isDetonated) continue;

      ctx.save();
      ctx.translate(cargo.pos.x, cargo.pos.y);

      const halfW = cargo.width * 0.5;
      const halfH = cargo.height * 0.5;
      const cType = cargo.cargoType || 'standard';

      // =======================================================================
      // DISTINCT VISUAL GRAPHICS PER CARGO TYPE
      // =======================================================================

      // 1. HIGH-EXPLOSIVE MUNITIONS
      if (cType === 'explosive') {
        // Heavy Armored Ordnance Shell (Orange / Dark Alloy)
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Center Munition Warhead Core
        ctx.fillStyle = '#ea580c';
        ctx.fillRect(-halfW + 4, -halfH + 4, cargo.width - 8, cargo.height - 8);

        // Yellow/Black Hazard Chevrons across belly
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        for (let hx = -halfW + 5; hx <= halfW - 7; hx += 6) {
          ctx.beginPath();
          ctx.moveTo(hx, -halfH + 5);
          ctx.lineTo(hx + 3, halfH - 5);
          ctx.stroke();
        }

        // Top Arming Strobe Beacon (Flashing Red)
        const redFlash = Math.sin(time * 10) > 0;
        ctx.fillStyle = redFlash ? '#ef4444' : '#7f1d1d';
        ctx.beginPath();
        ctx.arc(0, -halfH - 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Corner Armored Blast Clamps
        ctx.fillStyle = '#78716c';
        ctx.fillRect(-halfW - 1, -halfH - 1, 4, 4);
        ctx.fillRect(halfW - 3, -halfH - 1, 4, 4);
        ctx.fillRect(-halfW - 1, halfH - 3, 4, 4);
        ctx.fillRect(halfW - 3, halfH - 3, 4, 4);
      }

      // 2. SUB-ZERO CRYOGENIC SUPERCONDUCTOR / BIO SPECIMEN
      else if (cType === 'cryogenic') {
        // Dual Polished Chrome Cryo Dewars
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Transparent Frost Viewport Window with Liquid Coolant
        const temp = cargo.temperature || 0;
        const tempColor = temp > 70 ? '#f87171' : temp > 40 ? '#fbbf24' : '#38bdf8';
        ctx.fillStyle = '#082f49';
        ctx.fillRect(-halfW + 3, -halfH + 3, cargo.width - 6, cargo.height - 6);

        // Bubbling Sub-Zero Fluid inside chamber
        const bubbleY = Math.sin(time * 8) * 2;
        ctx.fillStyle = tempColor;
        ctx.fillRect(-halfW + 5, 0 + bubbleY, cargo.width - 10, halfH - 4);

        // Frost Ice Crystals on Corners
        ctx.strokeStyle = '#e0f2fe';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-halfW + 4, -halfH + 4);
        ctx.lineTo(-halfW + 8, -halfH + 8);
        ctx.moveTo(halfW - 4, -halfH + 4);
        ctx.lineTo(halfW - 8, -halfH + 8);
        ctx.stroke();
      }

      // 3. FRAGILE QUANTUM ISOTOPE CORE
      else if (cType === 'isotope') {
        // Tungsten Containment Capsule with Lead Shielding
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Central Spherical Glass Core with Quantum Singularity
        ctx.fillStyle = '#090d16';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#9333ea';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pulsing Purple Singularity
        const isoPulse = Math.sin(time * 7) * 0.35 + 0.65;
        ctx.fillStyle = `rgba(192, 132, 252, ${isoPulse})`;
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Rotating Outer Containment Ring Nodes
        ctx.save();
        ctx.rotate(time * 3.5);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-1.5, -7, 3, 2);
        ctx.fillRect(-1.5, 5, 3, 2);
        ctx.restore();
      }

      // 4. SUPERCONDUCTING MAGNETIC DYNAMO
      else if (cType === 'magnetic') {
        // Heavy Cylindrical Dynamo Chassis
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Left Magnetic Pole (Red / North +)
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(-halfW + 3, -halfH + 3, 5, cargo.height - 6);

        // Right Magnetic Pole (Blue / South -)
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(halfW - 8, -halfH + 3, 5, cargo.height - 6);

        // Central Copper Induction Coils
        ctx.fillStyle = '#b45309';
        ctx.fillRect(-halfW + 9, -halfH + 4, cargo.width - 18, cargo.height - 8);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1.0;
        ctx.strokeRect(-halfW + 9, -halfH + 4, cargo.width - 18, cargo.height - 8);

        // Cyan Electromagnetic Flux Arcs
        const arcPhase = Math.sin(time * 12);
        if (arcPhase > 0.4) {
          ctx.strokeStyle = '#60a5fa';
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(-halfW + 4, -halfH);
          ctx.lineTo(0, -halfH - 3);
          ctx.lineTo(halfW - 4, -halfH);
          ctx.stroke();
        }
      }

      // 5. HIGH-VOLTAGE PLASMA BATTERY CELL
      else if (cType === 'plasma') {
        // Hexagonal Carbon-Composite Frame
        ctx.fillStyle = '#022c22';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.2;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Central Plasma Vacuum Tube
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(-halfW + 4, -halfH + 3, cargo.width - 8, cargo.height - 6);

        // Animated Plasma Filaments
        const plasmaPulse = Math.sin(time * 9) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(52, 211, 153, ${plasmaPulse})`;
        ctx.beginPath();
        ctx.arc(-3, 0, 3, 0, Math.PI * 2);
        ctx.arc(3, 0, 3, 0, Math.PI * 2);
        ctx.fill();

        // Charge Level Bar
        const chargeRatio = Math.max(0, (cargo.chargeTimer ?? 60) / (cargo.maxChargeTimer ?? 60));
        ctx.fillStyle = chargeRatio < 0.3 ? '#ef4444' : '#10b981';
        ctx.fillRect(-halfW + 5, halfH - 4, (cargo.width - 10) * chargeRatio, 2);
      }

      // 6. STANDARD SCIENTIFIC SENSOR POD (Default)
      else {
        // Container Outer Hull Chassis
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(-halfW, -halfH, cargo.width, cargo.height);
        ctx.strokeStyle = cargo.color || '#38bdf8';
        ctx.lineWidth = 2.0;
        ctx.strokeRect(-halfW, -halfH, cargo.width, cargo.height);

        // Internal Energy Cell
        ctx.fillStyle = cargo.accentColor || '#0284c7';
        ctx.fillRect(-halfW + 4, -halfH + 4, cargo.width - 8, cargo.height - 8);

        // Core Glowing Status LED Bar
        const pulse = Math.sin(time * 5 + cargo.mass) * 0.3 + 0.7;
        ctx.fillStyle = cargo.isDelivered
          ? '#22c55e'
          : `rgba(255, 255, 255, ${pulse})`;
        ctx.fillRect(-halfW + 6, -2, cargo.width - 12, 4);
      }

      // =======================================================================
      // SHARED TOP MAGNETIC LATCH & BOTTOM ABSORBERS
      // =======================================================================

      // Top Magnetic Latch Ring / Attachment Node
      ctx.fillStyle = '#cbd5e1';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -halfH, 4, Math.PI, 0);
      ctx.fill();
      ctx.stroke();

      // Bottom Shock Absorb Cleats
      ctx.fillStyle = '#64748b';
      ctx.fillRect(-halfW + 2, halfH, 5, 2.5);
      ctx.fillRect(halfW - 7, halfH, 5, 2.5);

      ctx.restore();
    }

    ctx.restore();
  }

  private drawTether(
    ctx: CanvasRenderingContext2D,
    ship: ShipState,
    items: WorldMap['cargoItems'],
    time: number
  ) {
    if (!items || ship.isCrashed) return;

    for (const cargo of items) {
      if (!cargo.isAttached) continue;

      ctx.save();
      const config = getShipConfig(ship.modelId);
      const footHeight = Math.abs(config.localPoints.leftFoot.y);
      const shipAnchor = transformPoint(
        { x: 0, y: footHeight - 6 },
        ship.pos,
        ship.angle
      );
      const cargoAnchor = { x: cargo.pos.x, y: cargo.pos.y - cargo.height * 0.5 };

      // Draw Realistic Braided Steel Winch Cable (Inelastic, industrial)
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(shipAnchor.x, shipAnchor.y);
      ctx.lineTo(cargoAnchor.x, cargoAnchor.y);
      ctx.stroke();

      // Cable metallic core highlight
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(shipAnchor.x, shipAnchor.y);
      ctx.lineTo(cargoAnchor.x, cargoAnchor.y);
      ctx.stroke();

      // Ship Keel Electromagnetic Hook Assembly
      ctx.fillStyle = '#cbd5e1';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(shipAnchor.x, shipAnchor.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cargo Latch Node Clamp Ring
      ctx.fillStyle = '#94a3b8';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cargoAnchor.x, cargoAnchor.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }

  private drawLaunchPad(ctx: CanvasRenderingContext2D, pad: WorldMap['launchPad'], planet: PlanetConfig, time: number) {
    ctx.save();

    // 1. Heavy Subterranean Foundation Pylons / Bedrock Struts
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    const pylonWidth = 14;
    const pylonCount = 4;
    const pylonSpacing = (pad.width - pylonWidth) / (pylonCount - 1);
    for (let i = 0; i < pylonCount; i++) {
      const px = pad.x1 + i * pylonSpacing;
      ctx.fillRect(px, pad.y + 10, pylonWidth, 36);
      ctx.strokeRect(px, pad.y + 10, pylonWidth, 36);
      // Pylon cross-reinforcement rivets
      ctx.fillStyle = '#475569';
      ctx.fillRect(px + 3, pad.y + 16, 8, 3);
      ctx.fillRect(px + 3, pad.y + 28, 8, 3);
      ctx.fillStyle = '#0f172a';
    }

    // 2. Launch Outpost Fuel Storage Silo & Cryogenic Pipe (Left Flank)
    const siloX = pad.x1 - 24;
    const siloY = pad.y - 28;
    // Silo Body
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(siloX, siloY, 18, 38);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.8;
    ctx.strokeRect(siloX, siloY, 18, 38);
    // Silo Dome Cap
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(siloX + 9, siloY, 9, Math.PI, 0);
    ctx.fill();
    ctx.stroke();
    // Hazard Band on Silo
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(siloX + 2, siloY + 12, 14, 4);
    // Cryogenic Delivery Pipe to Pad
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(siloX + 18, siloY + 22);
    ctx.lineTo(pad.x1, pad.y + 6);
    ctx.stroke();

    // 3. Telemetry Tower & Rotating Radar Scanner (Right Flank)
    const towerX = pad.x2 + 14;
    const towerY = pad.y - 38;
    // Lattice Tower Mast
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(towerX - 6, pad.y + 10);
    ctx.lineTo(towerX, towerY);
    ctx.lineTo(towerX + 6, pad.y + 10);
    ctx.moveTo(towerX - 4, pad.y - 12);
    ctx.lineTo(towerX + 4, pad.y - 12);
    ctx.moveTo(towerX - 2, pad.y - 26);
    ctx.lineTo(towerX + 2, pad.y - 26);
    ctx.stroke();
    // Radar Dish
    ctx.save();
    ctx.translate(towerX, towerY);
    ctx.rotate(Math.sin(time * 2.5) * 0.45);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.arc(0, 0, 7, Math.PI * 0.8, Math.PI * 2.2);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, -7, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Heavy Reinforced Deck Platform Surface
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(pad.x1, pad.y, pad.width, 12);

    // High-Contrast Pad Rim Border
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(pad.x1, pad.y, pad.width, 12);

    // Yellow Hazard Diagonal Safety Chevrons across wide runway
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2.5;
    for (let x = pad.x1 + 10; x < pad.x2 - 10; x += 16) {
      ctx.beginPath();
      ctx.moveTo(x, pad.y + 1);
      ctx.lineTo(x + 8, pad.y + 11);
      ctx.stroke();
    }

    // Dual Start Beacon Light Mast Heads
    const pulse = Math.sin(time * 4) * 0.4 + 0.6;
    ctx.fillStyle = `rgba(34, 197, 94, ${pulse})`;
    ctx.beginPath();
    ctx.arc(pad.x1 + 8, pad.y - 7, 5.5, 0, Math.PI * 2);
    ctx.arc(pad.x2 - 8, pad.y - 7, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Beacon Light Glow Halos
    ctx.fillStyle = `rgba(34, 197, 94, ${pulse * 0.35})`;
    ctx.beginPath();
    ctx.arc(pad.x1 + 8, pad.y - 7, 12, 0, Math.PI * 2);
    ctx.arc(pad.x2 - 8, pad.y - 7, 12, 0, Math.PI * 2);
    ctx.fill();

    // Center Runway Guidance Line
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.85)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(pad.center.x, pad.y);
    ctx.lineTo(pad.center.x, pad.y + 12);
    ctx.stroke();

    ctx.restore();
  }

  private drawLandingPad(
    ctx: CanvasRenderingContext2D,
    pad: WorldMap['landingPad'],
    planet: PlanetConfig,
    ship: ShipState,
    time: number
  ) {
    ctx.save();

    // Proximity & Attitude Telemetry Calculations
    const distToPad = Math.hypot(ship.pos.x - pad.center.x, ship.pos.y - pad.center.y);
    const vertDist = pad.y - ship.pos.y;
    const horizOffset = ship.pos.x - pad.center.x;
    const vertSpeed = Math.abs(ship.vel.y);
    const horizSpeed = Math.abs(ship.vel.x);
    const angleOffsetDeg = Math.abs((ship.angle * 180) / Math.PI) % 360;
    const normalizedAngleDeg = angleOffsetDeg > 180 ? 360 - angleOffsetDeg : angleOffsetDeg;

    const isNear = distToPad < 850;
    const isClose = distToPad < 400;
    const isVeryClose = distToPad < 220;
    const isLanded = ship.isLanded || ship.landingSettling;

    // Safety checks matching touchdown physics thresholds (vertSpeed <= 8.5, horizSpeed <= 5.5, angle <= 36)
    const isSafeSpeed = vertSpeed <= 8.5 && horizSpeed <= 5.5;
    const isSafeAngle = normalizedAngleDeg <= 36;
    const isSafeApproach = isSafeSpeed && isSafeAngle;

    // Reactive Color Palette based on ship state
    let accentColor = '#38bdf8'; // Default Sky Blue
    let glowColor = 'rgba(56, 189, 248, 0.4)';
    let statusText = 'PRIMARY RECOVERY LZ // STANDBY';
    let statusColor = '#38bdf8';

    if (isLanded) {
      accentColor = '#22c55e'; // Green - Landed Secure
      glowColor = 'rgba(34, 197, 94, 0.6)';
      statusText = '✓ TOUCHDOWN CONFIRMED • LZ SECURED';
      statusColor = '#4ade80';
    } else if (isClose) {
      if (!isSafeSpeed && !isSafeAngle) {
        accentColor = '#ef4444';
        glowColor = 'rgba(239, 68, 68, 0.6)';
        statusText = `⚠ DANGER: HIGH VELOCITY (${vertSpeed.toFixed(1)}m/s) & TILT (${Math.round(normalizedAngleDeg)}°)`;
        statusColor = '#f87171';
      } else if (!isSafeSpeed) {
        accentColor = '#f59e0b';
        glowColor = 'rgba(245, 158, 11, 0.6)';
        statusText = `⚠ CAUTION: SINK RATE HIGH (-${vertSpeed.toFixed(1)}m/s)`;
        statusColor = '#fbbf24';
      } else if (!isSafeAngle) {
        accentColor = '#f43f5e';
        glowColor = 'rgba(244, 63, 94, 0.6)';
        statusText = `⚠ WARNING: OFF-AXIS ATTITUDE (${Math.round(normalizedAngleDeg)}°) • LEVEL CRAFT`;
        statusColor = '#fb7185';
      } else {
        accentColor = '#10b981'; // Emerald Cyan
        glowColor = 'rgba(16, 185, 129, 0.55)';
        statusText = `GUIDANCE LOCKED • V/S: -${vertSpeed.toFixed(1)}m/s [SAFE] • ${Math.round(distToPad * 0.1)}m`;
        statusColor = '#34d399';
      }
    } else if (isNear) {
      accentColor = '#06b6d4'; // Cyan
      glowColor = 'rgba(6, 182, 212, 0.45)';
      statusText = `APPROACH DETECTED [${Math.round(distToPad * 0.1)}m] • ACQUIRING VECTOR`;
      statusColor = '#38bdf8';
    }

    // 1. Under-Base Atmospheric / Ground Wash Illumination
    const groundWashIntensity = isLanded ? 0.6 : isClose ? 0.75 : isNear ? 0.45 : 0.25;
    const groundWashGrad = ctx.createRadialGradient(
      pad.center.x,
      pad.y + 16,
      10,
      pad.center.x,
      pad.y + 25,
      pad.width * 0.75
    );
    groundWashGrad.addColorStop(0, glowColor);
    groundWashGrad.addColorStop(0.5, `rgba(15, 23, 42, ${groundWashIntensity * 0.5})`);
    groundWashGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = groundWashGrad;
    ctx.beginPath();
    ctx.ellipse(pad.center.x, pad.y + 22, pad.width * 0.8, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. Heavy Articulated Hydraulic Shock Pistons & Bedrock Foundation Anchors
    const pylonWidth = 18;
    const pylonCount = 5;
    const pylonSpacing = (pad.width - pylonWidth) / (pylonCount - 1);
    for (let i = 0; i < pylonCount; i++) {
      const px = pad.x1 + i * pylonSpacing;
      // Cylinder Outer Housing (Dark alloy with hazard rim)
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.fillRect(px, pad.y + 18, pylonWidth, 38);
      ctx.strokeRect(px, pad.y + 18, pylonWidth, 38);

      // Chrome Piston Rod with Dynamic Compression
      const pistonCompression = isLanded ? 6 : isVeryClose ? 3 : 0;
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(px + 4, pad.y + 12 + pistonCompression, pylonWidth - 8, 14 - pistonCompression);

      // Hydraulic Status LED Strip on Cylinder
      ctx.fillStyle = isLanded ? '#22c55e' : isClose ? (isSafeSpeed ? '#10b981' : '#f59e0b') : '#38bdf8';
      ctx.fillRect(px + 7, pad.y + 24, 4, 18);

      // Heavy Bedrock Foot Anchor Flange
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px - 3, pad.y + 50, pylonWidth + 6, 8);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.2;
      ctx.strokeRect(px - 3, pad.y + 50, pylonWidth + 6, 8);
    }

    // Heavy Underdeck Reinforced Truss Bar & Interconnecting Energy Conduit
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(pad.x1 - 4, pad.y + 12, pad.width + 8, 8);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pad.x1 - 4, pad.y + 12, pad.width + 8, 8);

    // Flowing Energy Conduit Pulse
    const energyFlowX = (time * 60) % pad.width;
    ctx.fillStyle = accentColor;
    ctx.fillRect(pad.x1 + energyFlowX - 10, pad.y + 14, 20, 4);

    // 3. LEFT FLANK: Command & Telemetry Planetary Operations Tower
    const habX = pad.x1 - 46;
    const habY = pad.y - 32;
    const habW = 38;
    const habH = 44;

    // Main Hab Multi-tier Shell
    ctx.fillStyle = '#0b1120';
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(habX, habY, habW, habH, [8, 8, 2, 2]);
    } else {
      ctx.rect(habX, habY, habW, habH);
    }
    ctx.fill();
    ctx.stroke();

    // Command Center Panoramic Multi-pane Viewports (Illuminated)
    const windowPulse = Math.sin(time * 2) * 0.15 + 0.85;
    ctx.fillStyle = `rgba(56, 189, 248, ${0.75 * windowPulse})`;
    ctx.fillRect(habX + 6, habY + 6, 10, 8);
    ctx.fillRect(habX + 20, habY + 6, 12, 8);
    ctx.fillStyle = '#fbbf24'; // Warm secondary workstation glow
    ctx.fillRect(habX + 6, habY + 18, 26, 5);

    // Station Call Sign Decal
    ctx.font = 'bold 7px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText('LZ-BASE', habX + 5, habY + 32);

    // Rooftop Communications Antenna Mast
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(habX + 8, habY);
    ctx.lineTo(habX + 8, habY - 18);
    ctx.stroke();
    // Blinking Obstruction Beacon
    const beaconFlash = Math.sin(time * 8) > 0.2;
    ctx.fillStyle = beaconFlash ? '#ef4444' : '#7f1d1d';
    ctx.beginPath();
    ctx.arc(habX + 8, habY - 19, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Dynamic Reactive LIDAR / Tracking Radar Dish
    // When ship is near, radar locks on and aims at the approaching craft!
    const dishBaseX = habX + 26;
    const dishBaseY = habY - 2;
    let dishAngle = Math.sin(time * 2.2) * 0.6 - 0.5; // Idle panning

    if (isNear) {
      // Calculate angle from radar to incoming ship
      const angleToShip = Math.atan2(ship.pos.y - dishBaseY, ship.pos.x - dishBaseX);
      dishAngle = angleToShip + Math.PI * 0.5; // orient dish face towards craft
    }

    ctx.save();
    ctx.translate(dishBaseX, dishBaseY);
    ctx.rotate(dishAngle);

    // Radar Dish Base Mount
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-3, -3, 6, 4);

    // Parabolic Dish Curve
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(0, -9, 8, Math.PI * 0.25, Math.PI * 0.75);
    ctx.stroke();

    // Dish Transceiver Horn & Emitter Blip
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -9);
    ctx.lineTo(0, -15);
    ctx.stroke();
    ctx.fillStyle = isNear ? (isSafeApproach ? '#22c55e' : '#f59e0b') : '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, -15, 2, 0, Math.PI * 2);
    ctx.fill();

    // Active Radar Ping Waves towards ship when in tracking range
    if (isNear && !isLanded) {
      const pingPhase = (time * 3.5) % 1;
      ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - pingPhase) * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, -15, 10 + pingPhase * 25, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
    }
    ctx.restore();

    // 4. RIGHT FLANK: Automated Recovery Gantry & Docking Arm Structure
    const craneX = pad.x2 + 14;
    const craneY = pad.y - 28;
    const craneW = 28;
    const craneH = 40;

    // Heavy Gantry Base Mast
    ctx.fillStyle = '#0b1120';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(craneX, craneY, craneW, craneH, [4, 8, 2, 2]);
    } else {
      ctx.rect(craneX, craneY, craneW, craneH);
    }
    ctx.fill();
    ctx.stroke();

    // Gantry Yellow Caution Chevrons
    ctx.fillStyle = '#eab308';
    ctx.fillRect(craneX + 4, craneY + 6, craneW - 8, 3);
    ctx.fillRect(craneX + 4, craneY + 16, craneW - 8, 3);

    // Articulated Recovery Crane Arm
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(craneX + 6, craneY);
    const armFold = isLanded ? -14 : isClose ? -22 : -18;
    ctx.lineTo(craneX - 8, craneY + armFold);
    ctx.lineTo(craneX - 16, craneY + armFold + 6);
    ctx.stroke();

    // Crane Winch / Magnetic Docking Node
    ctx.fillStyle = isLanded ? '#22c55e' : accentColor;
    ctx.beginPath();
    ctx.arc(craneX - 16, craneY + armFold + 7, 3, 0, Math.PI * 2);
    ctx.fill();

    // Recovery Status LED Screen on Gantry
    ctx.fillStyle = '#020617';
    ctx.fillRect(craneX + 4, craneY + 24, craneW - 8, 10);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(craneX + 4, craneY + 24, craneW - 8, 10);
    ctx.fillStyle = isLanded ? '#4ade80' : isClose ? '#fbbf24' : '#38bdf8';
    ctx.font = 'bold 6.5px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(isLanded ? 'DOCK' : isClose ? 'READY' : 'STANDBY', craneX + craneW * 0.5, craneY + 31.5);

    // 5. DUAL ELEVATED APPROACH GUIDANCE FLOODLIGHTS (Left & Right)
    // Left Guidance Floodlight Tower
    const leftTowerX = pad.x1 + 4;
    const leftTowerY = pad.y - 20;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftTowerX + 2, pad.y);
    ctx.lineTo(leftTowerX - 8, leftTowerY);
    ctx.stroke();

    // Right Guidance Floodlight Tower
    const rightTowerX = pad.x2 - 4;
    const rightTowerY = pad.y - 20;
    ctx.beginPath();
    ctx.moveTo(rightTowerX - 2, pad.y);
    ctx.lineTo(rightTowerX + 8, rightTowerY);
    ctx.stroke();

    // Swivel Floodlight Cones (Dynamically point toward ship when approaching!)
    const leftLightAngle = isNear
      ? Math.atan2(ship.pos.y - leftTowerY, ship.pos.x - (leftTowerX - 8))
      : -Math.PI * 0.35;
    const rightLightAngle = isNear
      ? Math.atan2(ship.pos.y - rightTowerY, ship.pos.x - (rightTowerX + 8))
      : -Math.PI * 0.65;

    // Render Left Floodlight Volumetric Beam
    ctx.save();
    ctx.translate(leftTowerX - 8, leftTowerY);
    ctx.rotate(leftLightAngle);
    const floodLen = isClose ? 180 : isNear ? 130 : 70;
    const floodAlpha = isLanded ? 0.25 : isClose ? 0.55 : isNear ? 0.35 : 0.18;
    const floodGrad1 = ctx.createRadialGradient(0, 0, 2, floodLen * 0.7, 0, floodLen);
    floodGrad1.addColorStop(0, `rgba(56, 189, 248, ${floodAlpha})`);
    floodGrad1.addColorStop(0.5, `rgba(56, 189, 248, ${floodAlpha * 0.35})`);
    floodGrad1.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = floodGrad1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(floodLen, -30);
    ctx.lineTo(floodLen, 30);
    ctx.closePath();
    ctx.fill();
    // Lamp Head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Render Right Floodlight Volumetric Beam
    ctx.save();
    ctx.translate(rightTowerX + 8, rightTowerY);
    ctx.rotate(rightLightAngle);
    const floodGrad2 = ctx.createRadialGradient(0, 0, 2, floodLen * 0.7, 0, floodLen);
    floodGrad2.addColorStop(0, `rgba(56, 189, 248, ${floodAlpha})`);
    floodGrad2.addColorStop(0.5, `rgba(56, 189, 248, ${floodAlpha * 0.35})`);
    floodGrad2.addColorStop(1, 'rgba(56, 189, 248, 0)');
    ctx.fillStyle = floodGrad2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(floodLen, -30);
    ctx.lineTo(floodLen, 30);
    ctx.closePath();
    ctx.fill();
    // Lamp Head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 6. MAIN MULTI-LAYER RECOVERY PLATFORM DECK
    // Deck Foundation Base
    ctx.fillStyle = '#080c16';
    ctx.fillRect(pad.x1, pad.y, pad.width, 16);

    // Bevelled Outer Armor Lip
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(pad.x1 - 4, pad.y + 16);
    ctx.lineTo(pad.x1, pad.y);
    ctx.lineTo(pad.x2, pad.y);
    ctx.lineTo(pad.x2 + 4, pad.y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Main Composite Deck Face
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(pad.x1 + 4, pad.y + 1, pad.width - 8, 14);

    // Thermal Absorption Deck Tiles (Segmented grid)
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.2;
    for (let x = pad.x1 + 16; x < pad.x2 - 16; x += 22) {
      ctx.beginPath();
      ctx.moveTo(x, pad.y + 1);
      ctx.lineTo(x, pad.y + 15);
      ctx.stroke();
    }

    // Glowing Outpost Deck Perimeter Neon Light Channels
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(pad.x1 + 2, pad.y + 1, pad.width - 4, 14);

    // Yellow / Dark Caution Striping on Outer Edge Edges
    ctx.fillStyle = '#eab308';
    ctx.fillRect(pad.x1 + 2, pad.y + 12, 28, 3);
    ctx.fillRect(pad.x2 - 30, pad.y + 12, 28, 3);

    // 7. SEQUENTIAL RUNWAY APPROACH CHASE LIGHTS (Inward Motion)
    // Dynamic chase speed speeds up as craft gets closer!
    const chaseSpeed = isClose ? 14 : isNear ? 8 : 4;
    const chasePhase = (time * chaseSpeed) % 4;
    const strobeCount = 9;
    const strobeStep = (pad.width - 32) / (strobeCount - 1);

    for (let i = 0; i < strobeCount; i++) {
      const sx = pad.x1 + 16 + i * strobeStep;
      // Inward chevron sequence calculation
      const distFromCenter = Math.abs(i - Math.floor(strobeCount / 2));
      const isActiveStrobe = (Math.floor(distFromCenter - chasePhase + 4) % 3) === 0;

      const lightBrightness = isLanded
        ? 0.9
        : isActiveStrobe
        ? 1.0
        : isClose
        ? 0.5
        : 0.25;

      ctx.fillStyle = isLanded
        ? `rgba(34, 197, 94, ${lightBrightness})`
        : isClose && !isSafeApproach
        ? `rgba(239, 68, 68, ${lightBrightness})`
        : `rgba(56, 189, 248, ${lightBrightness})`;

      ctx.beginPath();
      ctx.arc(sx, pad.y + 8, isActiveStrobe ? 3.5 : 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Glow halo for active strobes
      if (isActiveStrobe || isLanded) {
        ctx.fillStyle = isLanded
          ? 'rgba(34, 197, 94, 0.3)'
          : isClose && !isSafeApproach
          ? 'rgba(239, 68, 68, 0.4)'
          : 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(sx, pad.y + 8, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Directional Inward Chevron Markers on Deck Wings (>>>  [+]  <<<)
    ctx.strokeStyle = `rgba(56, 189, 248, ${isClose ? 0.85 : 0.45})`;
    ctx.lineWidth = 1.8;
    // Left Wing Chevrons (pointing right)
    const leftChevrons = [pad.x1 + 38, pad.x1 + 54, pad.x1 + 70];
    for (const cx of leftChevrons) {
      if (cx < pad.center.x - 30) {
        ctx.beginPath();
        ctx.moveTo(cx - 4, pad.y + 4);
        ctx.lineTo(cx, pad.y + 8);
        ctx.lineTo(cx - 4, pad.y + 12);
        ctx.stroke();
      }
    }
    // Right Wing Chevrons (pointing left)
    const rightChevrons = [pad.x2 - 38, pad.x2 - 54, pad.x2 - 70];
    for (const cx of rightChevrons) {
      if (cx > pad.center.x + 30) {
        ctx.beginPath();
        ctx.moveTo(cx + 4, pad.y + 4);
        ctx.lineTo(cx, pad.y + 8);
        ctx.lineTo(cx + 4, pad.y + 12);
        ctx.stroke();
      }
    }

    // 8. CENTRAL TOUCHDOWN BULLS-EYE & TACTICAL TARGET INSIGNIA
    // Outer Target Ellipse
    ctx.strokeStyle = isLanded ? '#22c55e' : accentColor;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.ellipse(pad.center.x, pad.y + 8, 26, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Target Ellipse
    ctx.strokeStyle = isLanded ? '#4ade80' : '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(pad.center.x, pad.y + 8, 14, 3.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Center Crosshairs
    ctx.beginPath();
    ctx.moveTo(pad.center.x - 22, pad.y + 8);
    ctx.lineTo(pad.center.x + 22, pad.y + 8);
    ctx.stroke();

    // Center Target Box
    ctx.strokeStyle = isLanded ? '#22c55e' : accentColor;
    ctx.lineWidth = 1.8;
    ctx.strokeRect(pad.center.x - 28, pad.y + 1, 56, 14);

    // Center "LZ-01" / "RECOVERY" tactical badge
    ctx.font = '900 8.5px monospace';
    ctx.fillStyle = isLanded ? '#4ade80' : '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText('⬡ LZ-01 ⬡', pad.center.x, pad.y + 11.5);

    // 9. DYNAMIC OPTICAL LANDING SYSTEM & HOLOGRAPHIC GUIDANCE CORRIDOR
    // Activated when ship approaches the final descent funnel (distToPad < 450)
    if (isClose && !isLanded && vertDist > 0) {
      // Left and Right Vertical Laser Guidance Walls
      const laserHeight = Math.min(280, Math.max(80, vertDist + 40));
      const laserAlpha = Math.min(0.85, (400 - distToPad) / 280);

      // Left Guidance Laser
      ctx.strokeStyle = isSafeApproach
        ? `rgba(16, 185, 129, ${laserAlpha})`
        : isSafeSpeed
        ? `rgba(244, 63, 94, ${laserAlpha})`
        : `rgba(245, 158, 11, ${laserAlpha})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(pad.x1 + 12, pad.y);
      ctx.lineTo(pad.x1 + 12, pad.y - laserHeight);
      ctx.stroke();

      // Right Guidance Laser
      ctx.beginPath();
      ctx.moveTo(pad.x2 - 12, pad.y);
      ctx.lineTo(pad.x2 - 12, pad.y - laserHeight);
      ctx.stroke();
      ctx.setLineDash([]); // reset dash

      // Holographic Altitude Gate Rings along the descent corridor
      const gateCount = 3;
      for (let g = 1; g <= gateCount; g++) {
        const gateY = pad.y - (laserHeight / (gateCount + 1)) * g;
        if (gateY > ship.pos.y - 40) {
          const gatePulse = Math.sin(time * 6 - g) * 0.2 + 0.8;
          ctx.strokeStyle = isSafeApproach
            ? `rgba(56, 189, 248, ${0.4 * laserAlpha * gatePulse})`
            : `rgba(239, 68, 68, ${0.5 * laserAlpha * gatePulse})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.ellipse(pad.center.x, gateY, (pad.width * 0.45) * (1 - g * 0.1), 8, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Upward Holographic Touchdown Tractor Funnel (When very close)
      if (isVeryClose) {
        const funnelGrad = ctx.createLinearGradient(0, pad.y, 0, pad.y - 120);
        funnelGrad.addColorStop(0, isSafeApproach ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)');
        funnelGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = funnelGrad;
        ctx.beginPath();
        ctx.moveTo(pad.center.x - 35, pad.y);
        ctx.lineTo(pad.center.x - 55, pad.y - 100);
        ctx.lineTo(pad.center.x + 55, pad.y - 100);
        ctx.lineTo(pad.center.x + 35, pad.y);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 10. REAL-TIME TACTICAL TELEMETRY HUD BANNER BELOW BASE
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = statusColor;
    ctx.textAlign = 'center';

    // HUD Plaque Container
    ctx.fillStyle = 'rgba(11, 17, 32, 0.88)';
    const textWidth = ctx.measureText(statusText).width;
    const hudW = Math.max(pad.width * 0.9, textWidth + 24);
    ctx.fillRect(pad.center.x - hudW * 0.5, pad.y + 26, hudW, 18);
    ctx.strokeStyle = isLanded ? '#22c55e' : isClose && !isSafeApproach ? '#ef4444' : '#334155';
    ctx.lineWidth = 1.4;
    ctx.strokeRect(pad.center.x - hudW * 0.5, pad.y + 26, hudW, 18);

    // Status Glow Dot
    ctx.fillStyle = statusColor;
    ctx.beginPath();
    ctx.arc(pad.center.x - hudW * 0.5 + 8, pad.y + 35, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Render Text
    ctx.fillStyle = statusColor;
    ctx.fillText(statusText, pad.center.x + 4, pad.y + 39);

    ctx.restore();
  }

  private drawFuelPickup(ctx: CanvasRenderingContext2D, pickup: WorldMap['pickups'][0], planet: PlanetConfig, time: number) {
    ctx.save();
    const pulse = Math.sin(time * 5 + pickup.x) * 0.25 + 0.75;
    const bob = Math.sin(time * 3 + pickup.x) * 4;

    ctx.translate(pickup.x, pickup.y + bob);

    // 1. Vibrant Yellow Pulsing Radial Halo
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, Math.max(22, pickup.radius * 1.5));
    grad.addColorStop(0, `rgba(234, 179, 8, ${0.55 * pulse})`);
    grad.addColorStop(0.6, `rgba(234, 179, 8, ${0.2 * pulse})`);
    grad.addColorStop(1, 'rgba(234, 179, 8, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(22, pickup.radius * 1.5), 0, Math.PI * 2);
    ctx.fill();

    // 2. Yellow Fuel Pump Dispenser Casing (Matching Lucide Fuel Icon)
    // Main Body
    ctx.fillStyle = '#eab308';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(-9, -13, 16, 26, [3, 3, 2, 2]);
    } else {
      ctx.rect(-9, -13, 16, 26);
    }
    ctx.fill();
    ctx.stroke();

    // Top Cap / Hood
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-8, -15, 14, 3);

    // Digital Gauge / Meter Inset Screen
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 1.2;
    ctx.fillRect(-6, -10, 10, 8);
    ctx.strokeRect(-6, -10, 10, 8);

    // Glowing Yellow "F" / Digital Meter
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F', -1, -6);

    // Bottom Base Foundation
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-10, 11, 18, 4);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-10, 11, 18, 4);

    // Flexible Fuel Hose & Nozzle (Right side)
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(7, -8);
    ctx.quadraticCurveTo(14, -4, 14, 4);
    ctx.quadraticCurveTo(14, 10, 10, 10);
    ctx.stroke();

    // Fuel Nozzle Handle
    ctx.fillStyle = '#ca8a04';
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(7, -9);
    ctx.lineTo(10, -12);
    ctx.lineTo(12, -9);
    ctx.lineTo(9, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Nozzle Spout Tip
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(11, -11);
    ctx.lineTo(13, -14);
    ctx.stroke();

    ctx.restore();
  }

  private drawTrajectory(ctx: CanvasRenderingContext2D, ship: ShipState, planet: PlanetConfig) {
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);

    let simX = ship.pos.x;
    let simY = ship.pos.y;
    let simVx = ship.vel.x;
    let simVy = ship.vel.y;
    const dt = 0.08;

    ctx.beginPath();
    ctx.moveTo(simX, simY);

    for (let step = 0; step < 28; step++) {
      simVy += planet.gravity * 8.2 * dt;
      simX += simVx * dt * 10;
      simY += simVy * dt * 10;
      ctx.lineTo(simX, simY);
    }
    ctx.stroke();
    ctx.restore();
  }

  private drawShip(ctx: CanvasRenderingContext2D, ship: ShipState, planet: PlanetConfig, time: number) {
    const config = getShipConfig(ship.modelId);
    ctx.save();
    ctx.translate(ship.pos.x, ship.pos.y);
    ctx.rotate(ship.angle);

    const gearComp = ship.gearCompression !== undefined ? ship.gearCompression : 0.0;
    const gearSpringOffset = -gearComp * 8.5; 
    const rScale = config.renderScale || 1.0;

    // Shift entire visual ship down based on suspension compression 
    // so the hull visually sinks while footpads remain firmly on the ground.
    ctx.translate(0, -gearSpringOffset * rScale);

    const hasFuel = ship.fuel > 0;
    const lp = config.localPoints;

    // 1. Thruster Plumes / Flame Jets & Bright Afterburner Glow Base
    const halfWidth = 5.5 * Math.min(1.6, rScale * 0.85);
    const coreWidth = 3.2 * Math.min(1.6, rScale * 0.85);

    if (hasFuel && ship.leftThruster) {
      const flameLen = (24 + Math.random() * 18) * config.thrustMultiplier * Math.min(1.8, rScale);
      ctx.save();

      // Bright Afterburner Radial Base Glow
      const glowGrad = ctx.createRadialGradient(
        lp.leftThrusterPos.x,
        lp.leftThrusterPos.y,
        1,
        lp.leftThrusterPos.x,
        lp.leftThrusterPos.y,
        18 * rScale
      );
      glowGrad.addColorStop(0, '#ffffff');
      glowGrad.addColorStop(0.25, '#38bdf8');
      glowGrad.addColorStop(0.65, 'rgba(14, 165, 233, 0.4)');
      glowGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(lp.leftThrusterPos.x, lp.leftThrusterPos.y, 18 * rScale, 0, Math.PI * 2);
      ctx.fill();

      // Outer Flame Jet
      ctx.beginPath();
      ctx.moveTo(lp.leftThrusterPos.x - halfWidth, lp.leftThrusterPos.y);
      ctx.lineTo(lp.leftThrusterPos.x + halfWidth, lp.leftThrusterPos.y);
      ctx.lineTo(lp.leftThrusterPos.x, lp.leftThrusterPos.y + flameLen);
      ctx.closePath();
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14 * rScale;
      ctx.fill();

      // Inner White-Hot Plasma Core
      ctx.beginPath();
      ctx.moveTo(lp.leftThrusterPos.x - coreWidth, lp.leftThrusterPos.y);
      ctx.lineTo(lp.leftThrusterPos.x + coreWidth, lp.leftThrusterPos.y);
      ctx.lineTo(lp.leftThrusterPos.x, lp.leftThrusterPos.y + flameLen * 0.65);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Supersonic Shock Diamond Beads
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(lp.leftThrusterPos.x, lp.leftThrusterPos.y + flameLen * 0.28, 2.0 * rScale, 0, Math.PI * 2);
      ctx.arc(lp.leftThrusterPos.x, lp.leftThrusterPos.y + flameLen * 0.52, 1.4 * rScale, 0, Math.PI * 2);
      ctx.fill();

      // Intense Nozzle Ring Flash
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lp.leftThrusterPos.x - halfWidth - 1, lp.leftThrusterPos.y - 1.5, (halfWidth + 1) * 2, 3);
      ctx.restore();
    }

    if (hasFuel && ship.rightThruster) {
      const flameLen = (24 + Math.random() * 18) * config.thrustMultiplier * Math.min(1.8, rScale);
      ctx.save();

      // Bright Afterburner Radial Base Glow
      const glowGrad = ctx.createRadialGradient(
        lp.rightThrusterPos.x,
        lp.rightThrusterPos.y,
        1,
        lp.rightThrusterPos.x,
        lp.rightThrusterPos.y,
        18 * rScale
      );
      glowGrad.addColorStop(0, '#ffffff');
      glowGrad.addColorStop(0.25, '#38bdf8');
      glowGrad.addColorStop(0.65, 'rgba(14, 165, 233, 0.4)');
      glowGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(lp.rightThrusterPos.x, lp.rightThrusterPos.y, 18 * rScale, 0, Math.PI * 2);
      ctx.fill();

      // Outer Flame Jet
      ctx.beginPath();
      ctx.moveTo(lp.rightThrusterPos.x - halfWidth, lp.rightThrusterPos.y);
      ctx.lineTo(lp.rightThrusterPos.x + halfWidth, lp.rightThrusterPos.y);
      ctx.lineTo(lp.rightThrusterPos.x, lp.rightThrusterPos.y + flameLen);
      ctx.closePath();
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 14 * rScale;
      ctx.fill();

      // Inner White-Hot Plasma Core
      ctx.beginPath();
      ctx.moveTo(lp.rightThrusterPos.x - coreWidth, lp.rightThrusterPos.y);
      ctx.lineTo(lp.rightThrusterPos.x + coreWidth, lp.rightThrusterPos.y);
      ctx.lineTo(lp.rightThrusterPos.x, lp.rightThrusterPos.y + flameLen * 0.65);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Supersonic Shock Diamond Beads
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(lp.rightThrusterPos.x, lp.rightThrusterPos.y + flameLen * 0.28, 2.0 * rScale, 0, Math.PI * 2);
      ctx.arc(lp.rightThrusterPos.x, lp.rightThrusterPos.y + flameLen * 0.52, 1.4 * rScale, 0, Math.PI * 2);
      ctx.fill();

      // Intense Nozzle Ring Flash
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(lp.rightThrusterPos.x - halfWidth - 1, lp.rightThrusterPos.y - 1.5, (halfWidth + 1) * 2, 3);
      ctx.restore();
    }

    // 2. Main Full-Fidelity Ship Hull & Model Architecture (1:1 with Menu ShipGraphic)
    this.drawShipHullModel(ctx, config, lp, time, ship);

    // 3. Dynamic Damage FX (Fractures, Scorch Marks, Emergency Alerts)
    if (ship.hull < 80) {
      ctx.save();
      // Scorch Mark Dark Stains
      ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
      ctx.beginPath();
      ctx.arc(lp.leftHip.x + 12, lp.leftHip.y - 12, 6.5, 0, Math.PI * 2);
      ctx.fill();
      if (ship.hull < 50) {
        ctx.beginPath();
        ctx.arc(lp.rightHip.x - 14, lp.rightHip.y - 14, 8.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Hull Stress Fracture Fissures
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-10, -5);
      ctx.lineTo(-4, 2);
      ctx.lineTo(-12, 10);
      ctx.stroke();

      if (ship.hull < 35) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(8, -10);
        ctx.lineTo(14, -2);
        ctx.lineTo(6, 6);
        ctx.stroke();

        // Pulsing Electrical Spark Arc
        if (Math.random() < 0.35) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-15 + Math.random() * 30, -10 + Math.random() * 20);
          ctx.lineTo(-15 + Math.random() * 30, -10 + Math.random() * 20);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // 4. Nanite Repair Field Halo Aura (When on Launch/Landing Pad)
    if (ship.isRepairing) {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 2.0;
      ctx.setLineDash([4, 4]);
      const pulseR = 40 + Math.sin(time * 8) * 4;
      ctx.beginPath();
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.fill();
      ctx.restore();
    }

    // 5. EMP Electromagnetic Shockwave & Avionics Blackout FX
    if (ship.empDisabledTimer && ship.empDisabledTimer > 0) {
      ctx.save();
      // Crackling Emerald/Cyan Lightning Arcs across hull
      const arcs = 4;
      for (let a = 0; a < arcs; a++) {
        ctx.strokeStyle = Math.random() < 0.5 ? '#34d399' : '#38bdf8';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        let currX = (Math.random() - 0.5) * 36;
        let currY = (Math.random() - 0.5) * 36;
        ctx.moveTo(currX, currY);
        for (let seg = 0; seg < 3; seg++) {
          currX += (Math.random() - 0.5) * 16;
          currY += (Math.random() - 0.5) * 16;
          ctx.lineTo(currX, currY);
        }
        ctx.stroke();
      }

      // Flashing EMP Ring Aura
      const empPulse = 28 + Math.sin(time * 24) * 6;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.85)';
      ctx.lineWidth = 2.0;
      ctx.setLineDash([6, 3]);
      ctx.beginPath();
      ctx.arc(0, 0, empPulse, 0, Math.PI * 2);
      ctx.stroke();

      // EMP Warning Tag above craft
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#34d399';
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 6;
      ctx.fillText(`⚡ EMP BLACKOUT (${ship.empDisabledTimer.toFixed(1)}s)`, 0, -32);
      ctx.restore();
    }

    ctx.restore();
  }

  private drawShipHullModel(
    ctx: CanvasRenderingContext2D,
    config: ReturnType<typeof getShipConfig>,
    lp: ReturnType<typeof getShipConfig>['localPoints'],
    time: number,
    ship: ShipState
  ) {
    renderShipHull(ctx, config, lp, time, ship);
  }

  private drawWreckageMarker(ctx: CanvasRenderingContext2D, pos: Vector2D, planet: PlanetConfig) {
    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pos.x - 14, pos.y - 14);
    ctx.lineTo(pos.x + 14, pos.y + 14);
    ctx.moveTo(pos.x + 14, pos.y - 14);
    ctx.lineTo(pos.x - 14, pos.y + 14);
    ctx.stroke();
    ctx.restore();
  }

  private drawRadar(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    ship: ShipState,
    world: WorldMap,
    planet: PlanetConfig,
    time: number
  ) {
    const isMobilePortrait = canvasWidth < 680 || canvasHeight > canvasWidth * 1.05;
    const radarW = isMobilePortrait ? Math.min(220, canvasWidth - 24) : 250;
    const radarH = isMobilePortrait ? 90 : 105;

    const rx = isMobilePortrait ? canvasWidth - radarW - 12 : canvasWidth - radarW - 16;
    const ry = isMobilePortrait ? 122 : 16;

    ctx.save();
    // Glassy Radar frame with high contrast backdrop
    ctx.fillStyle = 'rgba(5, 10, 20, 0.90)';
    ctx.beginPath();
    ctx.roundRect(rx, ry, radarW, radarH, 10);
    ctx.fill();

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Radar Header with glowing pulse dot
    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('TACTICAL TOPOGRAPHY', rx + 16, ry + 12);

    const sweep = Math.sin(time * 4) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(56, 189, 248, ${0.5 + sweep * 0.5})`;
    ctx.beginPath();
    ctx.arc(rx + 9, ry + 9, 3, 0, Math.PI * 2);
    ctx.fill();

    const scaleX = (radarW - 18) / world.width;
    const scaleY = (radarH - 26) / world.height;
    const mapOffsetX = rx + 9;
    const mapOffsetY = ry + 18;

    // Mini ground line
    ctx.strokeStyle = planet.theme.terrainBorder;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i < world.groundPoints.length; i++) {
      const pt = world.groundPoints[i];
      const mx = mapOffsetX + pt.x * scaleX;
      const my = mapOffsetY + pt.y * scaleY;
      if (i === 0) ctx.moveTo(mx, my);
      else ctx.lineTo(mx, my);
    }
    ctx.stroke();

    // Mini ceiling line
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.65)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    let ceilingStarted = false;
    for (let i = 0; i < world.ceilingPoints.length; i++) {
      const pt = world.ceilingPoints[i];
      if (pt.y > 0) {
        const mx = mapOffsetX + pt.x * scaleX;
        const my = mapOffsetY + pt.y * scaleY;
        if (!ceilingStarted) {
          ctx.moveTo(mx, my);
          ceilingStarted = true;
        } else {
          ctx.lineTo(mx, my);
        }
      }
    }
    ctx.stroke();

    // Mini Obstacle Bridges & Spires on Radar
    ctx.strokeStyle = 'rgba(251, 146, 60, 0.7)';
    ctx.lineWidth = 1;
    for (const obs of world.obstacles) {
      if (obs.length > 0) {
        ctx.beginPath();
        ctx.moveTo(mapOffsetX + obs[0].x * scaleX, mapOffsetY + obs[0].y * scaleY);
        for (let j = 1; j < obs.length; j++) {
          ctx.lineTo(mapOffsetX + obs[j].x * scaleX, mapOffsetY + obs[j].y * scaleY);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Draw Fuel Pickups on radar as small emerald dots
    for (const pickup of world.pickups) {
      if (!pickup.collected) {
        const px = mapOffsetX + pickup.x * scaleX;
        const py = mapOffsetY + pickup.y * scaleY;
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Launch Pad (Green marker)
    const lmx = mapOffsetX + world.launchPad.center.x * scaleX;
    const lmy = mapOffsetY + world.launchPad.center.y * scaleY;
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(lmx - 5, lmy - 2, 10, 3);

    // Cargo Platforms on Tactical Radar
    if (world.cargoPlatforms) {
      for (const cp of world.cargoPlatforms) {
        const cpx = mapOffsetX + cp.center.x * scaleX;
        const cpy = mapOffsetY + cp.y * scaleY;
        if (cp.type === 'pickup') {
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(cpx - 4, cpy - 2, 8, 3);
          ctx.font = 'bold 7px monospace';
          ctx.fillText('MINE', cpx - 8, cpy - 4);
        } else {
          ctx.fillStyle = cp.isFulfilled ? '#22c55e' : '#10b981';
          ctx.fillRect(cpx - 4, cpy - 2, 8, 3);
          ctx.font = 'bold 7px monospace';
          ctx.fillText('DROP', cpx - 8, cpy - 4);
        }
      }
    }

    // Cargo Containers on Tactical Radar
    if (world.cargoItems) {
      for (const item of world.cargoItems) {
        if (!item.isDelivered) {
          const itx = mapOffsetX + item.pos.x * scaleX;
          const ity = mapOffsetY + item.pos.y * scaleY;
          ctx.fillStyle = item.isAttached ? '#f59e0b' : '#38bdf8';
          ctx.fillRect(itx - 2, ity - 2, 4, 4);
        }
      }
    }

    // Volcanoes on Tactical Radar
    if (world.volcanoes) {
      for (const v of world.volcanoes) {
        const vmx = mapOffsetX + v.x * scaleX;
        const vmy = mapOffsetY + (v.y - v.height * 0.5) * scaleY;
        ctx.fillStyle = v.isErupting ? '#ef4444' : '#f97316';
        ctx.beginPath();
        ctx.moveTo(vmx, vmy - 4);
        ctx.lineTo(vmx - 3.5, vmy + 3);
        ctx.lineTo(vmx + 3.5, vmy + 3);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Landing Pad (Pulsing Cyan marker with "LZ" tag)
    const tmx = mapOffsetX + world.landingPad.center.x * scaleX;
    const tmy = mapOffsetY + world.landingPad.center.y * scaleY;
    const pulse = Math.sin(time * 6) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(56, 189, 248, ${0.5 + pulse * 0.5})`;
    ctx.beginPath();
    ctx.arc(tmx, tmy - 1, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 8px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('LZ', tmx - 4, tmy - 6);

    // Ship position & direction arrow
    const smx = mapOffsetX + ship.pos.x * scaleX;
    const smy = mapOffsetY + ship.pos.y * scaleY;

    // Ship locator blip
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(smx, smy, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Ship heading blip
    const blipX = smx + Math.sin(ship.angle) * 7;
    const blipY = smy - Math.cos(ship.angle) * 7;
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(smx, smy);
    ctx.lineTo(blipX, blipY);
    ctx.stroke();

    ctx.restore();
  }

  /**
   * High-performance visual rendering for volcanic mountains, glowing calderas,
   * active eruptive fire plumes, and ejected molten rock projectiles.
   */
  private drawVolcanoes(
    ctx: CanvasRenderingContext2D,
    volcanoes: VolcanoHazard[],
    ship: ShipState,
    planet: PlanetConfig,
    time: number
  ) {
    const halfViewW = (ctx.canvas.width / this.camera.zoom) * 0.65;
    const halfViewH = (ctx.canvas.height / this.camera.zoom) * 0.65;
    const camLeft = this.camera.x - halfViewW;
    const camRight = this.camera.x + halfViewW;
    const camTop = this.camera.y - halfViewH;
    const camBottom = this.camera.y + halfViewH;

    const themePalettes = {
      magma: {
        glow: '#ef4444',
        accent: '#f97316',
        hotCore: '#ffffff',
        magmaPool: ['#ffffff', '#fef08a', '#f97316', '#dc2626'],
        flame: ['#ffffff', '#fde047', '#f97316', '#ef4444', '#991b1b'],
        basalt: '#1c1917',
        fissure: '#ea580c',
      },
      plasma: {
        glow: '#a855f7',
        accent: '#c084fc',
        hotCore: '#ffffff',
        magmaPool: ['#ffffff', '#f5d0fe', '#c084fc', '#7e22ce'],
        flame: ['#ffffff', '#f5d0fe', '#d946ef', '#a855f7', '#581c87'],
        basalt: '#18181b',
        fissure: '#a855f7',
      },
      toxic: {
        glow: '#10b981',
        accent: '#34d399',
        hotCore: '#ffffff',
        magmaPool: ['#ffffff', '#bbf7d0', '#34d399', '#047857'],
        flame: ['#ffffff', '#bbf7d0', '#4ade80', '#10b981', '#064e3b'],
        basalt: '#14221a',
        fissure: '#10b981',
      },
      cryo: {
        glow: '#38bdf8',
        accent: '#67e8f9',
        hotCore: '#ffffff',
        magmaPool: ['#ffffff', '#cffafe', '#38bdf8', '#0369a1'],
        flame: ['#ffffff', '#cffafe', '#67e8f9', '#38bdf8', '#075985'],
        basalt: '#0f172a',
        fissure: '#0284c7',
      },
    };

    for (const v of volcanoes) {
      const calderaX = v.x;
      const calderaY = v.y - v.height;
      const baseLeftX = v.x - v.width * 0.5;
      const baseRightX = v.x + v.width * 0.5;
      const rimLeftX = v.x - v.calderaWidth * 0.5;
      const rimRightX = v.x + v.calderaWidth * 0.5;
      const palette = themePalettes[v.colorTheme] || themePalettes.magma;

      // Viewport culling check (expanded vertical bound to accommodate gravity-scaled rock trajectories)
      const boundLeft = baseLeftX - 160;
      const boundRight = baseRightX + 160;
      const boundTop = calderaY - Math.max(v.eruptionHeight, v.height * 4.2) - 180;
      const boundBottom = v.y + 80;

      if (boundRight < camLeft || boundLeft > camRight || boundBottom < camTop || boundTop > camBottom) {
        continue; // Offscreen volcano culled for peak performance
      }

      ctx.save();

      // 1. VOLCANO MOUNTAIN SILHOUETTE & BASALT CONE
      // Outer mountain fill
      ctx.beginPath();
      ctx.moveTo(baseLeftX, v.y + 10);
      ctx.lineTo(rimLeftX, calderaY);
      // Caldera bowl dip
      ctx.quadraticCurveTo(calderaX, calderaY + v.height * 0.22, rimRightX, calderaY);
      ctx.lineTo(baseRightX, v.y + 10);
      ctx.closePath();

      const coneGrad = ctx.createLinearGradient(calderaX, calderaY, calderaX, v.y);
      coneGrad.addColorStop(0, palette.basalt);
      coneGrad.addColorStop(0.65, planet.theme.terrainFill);
      coneGrad.addColorStop(1, planet.theme.terrainFill);
      ctx.fillStyle = coneGrad;
      ctx.fill();

      // Mountain edge highlight
      ctx.strokeStyle = planet.theme.terrainBorder;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(baseLeftX, v.y);
      ctx.lineTo(rimLeftX, calderaY);
      ctx.moveTo(rimRightX, calderaY);
      ctx.lineTo(baseRightX, v.y);
      ctx.stroke();

      // 2. GLOWING MAGMA CRACKS & BASALT STRATA RIDGES
      const pulseMagma = Math.sin(time * 3 + v.x * 0.05) * 0.2 + 0.8;
      ctx.save();
      ctx.strokeStyle = palette.fissure;
      ctx.globalAlpha = 0.55 * pulseMagma;
      ctx.lineWidth = 2;
      // Left flank fissure
      ctx.beginPath();
      ctx.moveTo(rimLeftX + 12, calderaY + 14);
      ctx.lineTo(rimLeftX - (v.width * 0.12), calderaY + v.height * 0.45);
      ctx.lineTo(rimLeftX - (v.width * 0.22), v.y - 10);
      ctx.stroke();
      // Right flank fissure
      ctx.beginPath();
      ctx.moveTo(rimRightX - 14, calderaY + 12);
      ctx.lineTo(rimRightX + (v.width * 0.15), calderaY + v.height * 0.52);
      ctx.lineTo(rimRightX + (v.width * 0.26), v.y - 12);
      ctx.stroke();
      ctx.restore();

      // 3. CALDERA MAGMA POOL & BUBBLING LIQUID LAVA
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rimLeftX, calderaY);
      ctx.quadraticCurveTo(calderaX, calderaY + v.height * 0.24, rimRightX, calderaY);
      ctx.quadraticCurveTo(calderaX, calderaY - 6, rimLeftX, calderaY);
      ctx.closePath();

      const poolGrad = ctx.createRadialGradient(calderaX, calderaY + 4, 2, calderaX, calderaY + 4, v.calderaWidth * 0.6);
      poolGrad.addColorStop(0, palette.magmaPool[0]);
      poolGrad.addColorStop(0.35, palette.magmaPool[1]);
      poolGrad.addColorStop(0.75, palette.magmaPool[2]);
      poolGrad.addColorStop(1, palette.magmaPool[3]);
      ctx.fillStyle = poolGrad;
      ctx.fill();

      // Caldera heat distortion / glow ring
      const magmaAura = ctx.createRadialGradient(calderaX, calderaY, 0, calderaX, calderaY, v.calderaWidth * 1.2);
      magmaAura.addColorStop(0, palette.glow);
      magmaAura.addColorStop(0.5, 'rgba(239, 68, 68, 0.25)');
      magmaAura.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = magmaAura;
      ctx.globalAlpha = 0.45 * pulseMagma;
      ctx.beginPath();
      ctx.arc(calderaX, calderaY, v.calderaWidth * 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 4. PRE-ERUPTION CHARGING WARNING AURA
      if (v.isCharging) {
        const warnPhase = ((time * 8) % 1);
        ctx.save();
        ctx.globalAlpha = 0.4 + Math.sin(time * 16) * 0.3;
        const warnGrad = ctx.createRadialGradient(calderaX, calderaY, 10, calderaX, calderaY - 30, v.calderaWidth * 1.6);
        warnGrad.addColorStop(0, palette.hotCore);
        warnGrad.addColorStop(0.4, palette.accent);
        warnGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = warnGrad;
        ctx.beginPath();
        ctx.arc(calderaX, calderaY - 15, v.calderaWidth * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 5. ACTIVE ERUPTING FIRE PLUME & BILLOWING PLASMA COLUMN
      if (v.isErupting) {
        ctx.save();
        const plumeProgress = Math.sin(v.eruptPhase * Math.PI); // Smooth rise and fall of eruption height
        const currentPlumeHeight = v.eruptionHeight * (0.65 + plumeProgress * 0.35);
        const plumeTop = calderaY - currentPlumeHeight;

        // Outer Flame Column Jet
        const flameWidth = v.calderaWidth * 0.85;
        const flicker = Math.sin(time * 25 + v.x) * 6;

        ctx.beginPath();
        ctx.moveTo(rimLeftX + 4, calderaY);
        ctx.quadraticCurveTo(calderaX - flameWidth * 0.7 + flicker, calderaY - currentPlumeHeight * 0.5, calderaX - flameWidth * 0.3, plumeTop);
        ctx.lineTo(calderaX + flameWidth * 0.3, plumeTop);
        ctx.quadraticCurveTo(calderaX + flameWidth * 0.7 - flicker, calderaY - currentPlumeHeight * 0.5, rimRightX - 4, calderaY);
        ctx.closePath();

        const plumeGrad = ctx.createLinearGradient(calderaX, calderaY, calderaX, plumeTop);
        plumeGrad.addColorStop(0, palette.flame[0]);
        plumeGrad.addColorStop(0.2, palette.flame[1]);
        plumeGrad.addColorStop(0.5, palette.flame[2]);
        plumeGrad.addColorStop(0.85, palette.flame[3]);
        plumeGrad.addColorStop(1, palette.flame[4]);
        ctx.fillStyle = plumeGrad;
        ctx.globalAlpha = 0.88;
        ctx.fill();

        // Inner Incandescent Core Jet (Ultra hot white/gold)
        ctx.beginPath();
        ctx.moveTo(calderaX - flameWidth * 0.28, calderaY);
        ctx.quadraticCurveTo(calderaX - flameWidth * 0.2, calderaY - currentPlumeHeight * 0.55, calderaX, plumeTop + currentPlumeHeight * 0.2);
        ctx.quadraticCurveTo(calderaX + flameWidth * 0.2, calderaY - currentPlumeHeight * 0.55, calderaX + flameWidth * 0.28, calderaY);
        ctx.closePath();
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.95;
        ctx.fill();

        // Billowing Smoke Cap at Apex
        ctx.fillStyle = 'rgba(41, 37, 36, 0.65)';
        ctx.beginPath();
        ctx.arc(calderaX + flicker * 0.5, plumeTop, flameWidth * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 6. EJECTED VOLCANIC ROCK BOMBS
      for (const rock of v.rocks) {
        if (!rock.active) continue;

        const rockAlpha = Math.max(0, Math.min(1, (rock.maxLife - rock.life) / 0.28));
        ctx.save();
        ctx.globalAlpha = rockAlpha;
        ctx.translate(rock.x, rock.y);
        ctx.rotate(rock.rotation);

        // Molten boulder glow corona
        const rockGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, rock.size * 2.2);
        rockGlow.addColorStop(0, palette.flame[1]);
        rockGlow.addColorStop(0.4, palette.flame[3]);
        rockGlow.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = rockGlow;
        ctx.beginPath();
        ctx.arc(0, 0, rock.size * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Jagged jagged rock shape
        ctx.fillStyle = '#1c1917';
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const sides = 6;
        for (let s = 0; s < sides; s++) {
          const sAngle = (s / sides) * Math.PI * 2;
          const rad = rock.size * (0.8 + (s % 2 === 0 ? 0.3 : -0.15));
          const rx = Math.cos(sAngle) * rad;
          const ry = Math.sin(sAngle) * rad;
          if (s === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Hot molten vein on the rock surface
        ctx.strokeStyle = palette.hotCore;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(-rock.size * 0.4, 0);
        ctx.lineTo(rock.size * 0.4, 0);
        ctx.stroke();

        ctx.restore();
      }

      ctx.restore();
    }
  }
}
