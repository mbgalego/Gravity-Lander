import { Particle, Vector2D, ShipState } from '../types';
import { getShipConfig } from './ships';

export interface ShipDebris {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVel: number;
  life: number;
  maxLife: number;
  color: string;
  borderColor: string;
  points: { x: number; y: number }[];
  trailTimer: number;
}

export class ParticleSystem {
  public particles: Particle[] = [];
  public debris: ShipDebris[] = [];

  public emitThruster(pos: Vector2D, angle: number, color: string, intensity = 1.0) {
    // 1. Bright Afterburner Glow Base Particles (intense plasma flare right at nozzle exit)
    this.particles.push({
      x: pos.x + (Math.random() - 0.5) * 1.5,
      y: pos.y + (Math.random() - 0.5) * 1.5,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 0,
      maxLife: 0.09 + Math.random() * 0.08,
      size: 14 + Math.random() * 8 * intensity,
      color: '#38bdf8',
      glowColor: color || '#38bdf8',
      alpha: 0.95,
      isGlow: true,
    });

    // Intense White-Hot Core Flare at nozzle throat
    this.particles.push({
      x: pos.x,
      y: pos.y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      life: 0,
      maxLife: 0.06 + Math.random() * 0.05,
      size: 5 + Math.random() * 4 * intensity,
      color: '#ffffff',
      glowColor: '#ffffff',
      alpha: 1.0,
      isGlow: true,
    });

    // 2. High-speed supersonic exhaust plasma trail
    const exhaustAngle = angle + Math.PI + (Math.random() - 0.5) * 0.38;
    const speed = 75 + Math.random() * 95 * intensity;

    const vx = Math.sin(exhaustAngle) * speed;
    const vy = -Math.cos(exhaustAngle) * speed;

    const colors = [
      '#ffffff',
      '#67e8f9',
      '#38bdf8',
      color || '#38bdf8',
      '#fef08a',
      '#f59e0b',
    ];
    const particleColor = colors[Math.floor(Math.random() * colors.length)];

    this.particles.push({
      x: pos.x + (Math.random() - 0.5) * 2.5,
      y: pos.y + (Math.random() - 0.5) * 2.5,
      vx,
      vy,
      life: 0,
      maxLife: 0.2 + Math.random() * 0.26,
      size: 2.2 + Math.random() * 2.8,
      color: particleColor,
      alpha: 0.95,
    });
  }

  public emitExplosion(pos: Vector2D, accentColor: string) {
    for (let i = 0; i < 75; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 30 + Math.random() * 210;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const colors = ['#ffffff', '#f87171', '#fb923c', '#facc15', accentColor];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx,
        vy,
        life: 0,
        maxLife: 0.5 + Math.random() * 1.1,
        size: 2.5 + Math.random() * 5.0,
        color,
        alpha: 1.0,
      });
    }
  }

  public emitSparks(pos: Vector2D, count = 10, normal?: Vector2D) {
    const baseAngle = normal ? Math.atan2(normal.y, normal.x) : Math.random() * Math.PI * 2;
    for (let i = 0; i < count; i++) {
      const angle = normal ? baseAngle + (Math.random() - 0.5) * 1.6 : Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 130;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const colors = ['#ffffff', '#fef08a', '#fde047', '#f59e0b', '#fb923c'];
      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 4,
        y: pos.y + (Math.random() - 0.5) * 4,
        vx,
        vy,
        life: 0,
        maxLife: 0.15 + Math.random() * 0.35,
        size: 1.5 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
      });
    }
  }

  public emitSmoke(pos: Vector2D, count = 1) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
      const speed = 8 + Math.random() * 18;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 6;
      const vy = Math.sin(angle) * speed;

      const gray = Math.floor(40 + Math.random() * 60);
      const color = `rgb(${gray},${gray},${gray})`;

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 6,
        y: pos.y + (Math.random() - 0.5) * 6,
        vx,
        vy,
        life: 0,
        maxLife: 0.8 + Math.random() * 0.7,
        size: 4.5 + Math.random() * 4.5,
        color,
        alpha: 0.65,
      });
    }
  }

  public emitDamageDebris(pos: Vector2D, count = 3) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 25 + Math.random() * 80;
      const colors = ['#94a3b8', '#64748b', '#475569', '#334155'];

      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.6 + Math.random() * 0.8,
        size: 2.0 + Math.random() * 3.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.9,
      });
    }
  }

  public emitRepairSparks(pos: Vector2D) {
    for (let i = 0; i < 3; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5;
      const speed = 20 + Math.random() * 50;
      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 16,
        y: pos.y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.3 + Math.random() * 0.3,
        size: 1.8 + Math.random() * 1.5,
        color: Math.random() > 0.4 ? '#38bdf8' : '#34d399',
        alpha: 0.9,
      });
    }
  }

  public emitVolcanoEmber(pos: Vector2D, count = 2, colorTheme: 'magma' | 'plasma' | 'toxic' | 'cryo' = 'magma') {
    const themePalettes = {
      magma: ['#ef4444', '#f97316', '#f59e0b', '#fbbf24', '#ffffff'],
      plasma: ['#a855f7', '#c084fc', '#e879f9', '#38bdf8', '#ffffff'],
      toxic: ['#10b981', '#34d399', '#6ee7b7', '#a3e635', '#ffffff'],
      cryo: ['#38bdf8', '#67e8f9', '#93c5fd', '#bae6fd', '#ffffff'],
    };
    const colors = themePalettes[colorTheme] || themePalettes.magma;

    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.1;
      const speed = 12 + Math.random() * 38;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 8;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 24,
        y: pos.y + (Math.random() - 0.5) * 8,
        vx,
        vy,
        life: 0,
        maxLife: 0.5 + Math.random() * 0.9,
        size: 1.8 + Math.random() * 2.8,
        color,
        glowColor: colors[0],
        alpha: 0.9,
        isGlow: Math.random() > 0.3,
      });
    }
  }

  public emitVolcanoBlast(pos: Vector2D, count = 6, colorTheme: 'magma' | 'plasma' | 'toxic' | 'cryo' = 'magma') {
    const themePalettes = {
      magma: {
        glow: '#ef4444',
        flame: ['#ffffff', '#fef08a', '#f59e0b', '#f97316', '#ef4444', '#b91c1c'],
        smoke: ['#292524', '#44403c', '#1c1917'],
      },
      plasma: {
        glow: '#a855f7',
        flame: ['#ffffff', '#f5d0fe', '#d946ef', '#a855f7', '#7e22ce', '#38bdf8'],
        smoke: ['#2e1065', '#1e1b4b', '#1e293b'],
      },
      toxic: {
        glow: '#10b981',
        flame: ['#ffffff', '#bbf7d0', '#4ade80', '#10b981', '#047857', '#a3e635'],
        smoke: ['#064e3b', '#022c22', '#1e293b'],
      },
      cryo: {
        glow: '#38bdf8',
        flame: ['#ffffff', '#cffafe', '#67e8f9', '#38bdf8', '#0284c7', '#93c5fd'],
        smoke: ['#082f49', '#0f172a', '#1e293b'],
      },
    };
    const theme = themePalettes[colorTheme] || themePalettes.magma;

    // Upward fire column blast
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.45;
      const speed = 90 + Math.random() * 190;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const isFire = Math.random() > 0.25;
      const color = isFire
        ? theme.flame[Math.floor(Math.random() * theme.flame.length)]
        : theme.smoke[Math.floor(Math.random() * theme.smoke.length)];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 32,
        y: pos.y + (Math.random() - 0.5) * 12,
        vx,
        vy,
        life: 0,
        maxLife: isFire ? 0.35 + Math.random() * 0.45 : 0.8 + Math.random() * 0.9,
        size: isFire ? 3.5 + Math.random() * 6.5 : 8.0 + Math.random() * 12.0,
        color,
        glowColor: theme.glow,
        alpha: isFire ? 0.95 : 0.5,
        isGlow: isFire,
      });
    }
  }

  public emitVolcanicRockExplosion(pos: Vector2D, colorTheme: 'magma' | 'plasma' | 'toxic' | 'cryo' = 'magma') {
    this.emitSparks(pos, 18);
    this.emitDamageDebris(pos, 5);
    this.emitVolcanoBlast(pos, 4, colorTheme);
  }

  // Specialized Volatile & Fragile Cargo Particle FX
  public emitCryoVapor(pos: Vector2D, count = 3) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.8;
      const speed = 8 + Math.random() * 22;
      const vx = Math.cos(angle) * speed + (Math.random() - 0.5) * 6;
      const vy = Math.sin(angle) * speed;
      const colors = ['#ffffff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 12,
        y: pos.y + (Math.random() - 0.5) * 8,
        vx,
        vy,
        life: 0,
        maxLife: 0.6 + Math.random() * 0.7,
        size: 3.0 + Math.random() * 4.5,
        color,
        glowColor: '#38bdf8',
        alpha: 0.8,
        isGlow: Math.random() > 0.4,
      });
    }
  }

  public emitRadiationSparks(pos: Vector2D, count = 4) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 20 + Math.random() * 55;
      const colors = ['#ffffff', '#f5d0fe', '#e879f9', '#c084fc', '#a855f7'];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 10,
        y: pos.y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.25 + Math.random() * 0.35,
        size: 1.8 + Math.random() * 2.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowColor: '#c084fc',
        alpha: 0.95,
        isGlow: true,
      });
    }
  }

  public emitPlasmaArc(pos: Vector2D, count = 3) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 35 + Math.random() * 70;
      const colors = ['#ffffff', '#dcfce7', '#86efac', '#22c55e', '#10b981'];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 8,
        y: pos.y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.15 + Math.random() * 0.25,
        size: 2.2 + Math.random() * 2.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowColor: '#22c55e',
        alpha: 1.0,
        isGlow: true,
      });
    }
  }

  public emitMagneticFlux(pos: Vector2D, count = 3) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 15 + Math.random() * 35;
      const colors = ['#ffffff', '#cffafe', '#67e8f9', '#38bdf8', '#0284c7'];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 6,
        y: pos.y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.3 + Math.random() * 0.35,
        size: 1.6 + Math.random() * 2.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        glowColor: '#38bdf8',
        alpha: 0.9,
        isGlow: true,
      });
    }
  }

  public emitCargoDetonation(pos: Vector2D, accentColor = '#f59e0b') {
    // 1. Shockwave Flash Core
    for (let i = 0; i < 4; i++) {
      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 0,
        maxLife: 0.18 + i * 0.05,
        size: 25 + i * 18,
        color: '#ffffff',
        glowColor: accentColor,
        alpha: 1.0,
        isGlow: true,
      });
    }

    // 2. High-speed fireball shards
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 240;
      const colors = ['#ffffff', '#fef08a', '#f59e0b', '#ef4444', '#b91c1c', accentColor];

      this.particles.push({
        x: pos.x,
        y: pos.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 0.4 + Math.random() * 0.8,
        size: 2.5 + Math.random() * 4.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        isGlow: Math.random() > 0.5,
      });
    }

    // 3. Dense smoke billowing
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 10 + Math.random() * 45;
      const gray = Math.floor(30 + Math.random() * 40);

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 15,
        y: pos.y + (Math.random() - 0.5) * 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 15,
        life: 0,
        maxLife: 0.8 + Math.random() * 1.2,
        size: 6 + Math.random() * 10,
        color: `rgb(${gray},${gray},${gray})`,
        alpha: 0.75,
      });
    }
  }

  public emitShipBreakup(ship: ShipState) {
    const config = getShipConfig(ship.modelId);
    const baseVx = ship.vel.x * 0.5;
    const baseVy = ship.vel.y * 0.5;

    // Define 7 distinct physical structural shards of the broken vessel
    const shardDefs: { points: { x: number; y: number }[]; color: string; offset: { x: number; y: number } }[] = [
      // 1. Cockpit Nose Capsule
      {
        points: [
          { x: 0, y: -18 },
          { x: 10, y: -2 },
          { x: -10, y: -2 },
        ],
        color: config.visorColor || '#38bdf8',
        offset: { x: 0, y: -14 },
      },
      // 2. Left Wing / Shoulder Armor
      {
        points: [
          { x: -12, y: -8 },
          { x: 0, y: -2 },
          { x: -18, y: 12 },
          { x: -26, y: 4 },
        ],
        color: config.primaryColor,
        offset: { x: -14, y: 0 },
      },
      // 3. Right Wing / Shoulder Armor
      {
        points: [
          { x: 12, y: -8 },
          { x: 26, y: 4 },
          { x: 18, y: 12 },
          { x: 0, y: -2 },
        ],
        color: config.primaryColor,
        offset: { x: 14, y: 0 },
      },
      // 4. Central Engine Core / Fuel Tank chunk
      {
        points: [
          { x: -10, y: -6 },
          { x: 10, y: -6 },
          { x: 8, y: 10 },
          { x: -8, y: 10 },
        ],
        color: config.accentColor,
        offset: { x: 0, y: 6 },
      },
      // 5. Left Landing Gear Strut & Footpad
      {
        points: [
          { x: -2, y: -12 },
          { x: 2, y: -12 },
          { x: 2, y: 12 },
          { x: 8, y: 14 },
          { x: -8, y: 14 },
          { x: -2, y: 12 },
        ],
        color: '#94a3b8',
        offset: { x: -18, y: 18 },
      },
      // 6. Right Landing Gear Strut & Footpad
      {
        points: [
          { x: -2, y: -12 },
          { x: 2, y: -12 },
          { x: 2, y: 12 },
          { x: 8, y: 14 },
          { x: -8, y: 14 },
          { x: -2, y: 12 },
        ],
        color: '#94a3b8',
        offset: { x: 18, y: 18 },
      },
      // 7. Left Thruster Bell Nozzle
      {
        points: [
          { x: -6, y: -4 },
          { x: 6, y: -4 },
          { x: 8, y: 8 },
          { x: -8, y: 8 },
        ],
        color: '#475569',
        offset: { x: -12, y: 22 },
      },
      // 8. Right Thruster Bell Nozzle
      {
        points: [
          { x: -6, y: -4 },
          { x: 6, y: -4 },
          { x: 8, y: 8 },
          { x: -8, y: 8 },
        ],
        color: '#475569',
        offset: { x: 12, y: 22 },
      },
    ];

    for (const def of shardDefs) {
      const angle = Math.random() * Math.PI * 2;
      const blastSpeed = 40 + Math.random() * 110;
      const vx = baseVx + Math.cos(angle) * blastSpeed;
      const vy = baseVy + Math.sin(angle) * blastSpeed - 20;

      this.debris.push({
        x: ship.pos.x + def.offset.x,
        y: ship.pos.y + def.offset.y,
        vx,
        vy,
        angle: ship.angle + (Math.random() - 0.5) * 1.5,
        angularVel: (Math.random() - 0.5) * 12,
        life: 0,
        maxLife: 3.5 + Math.random() * 1.5,
        color: def.color,
        borderColor: '#0f172a',
        points: def.points,
        trailTimer: 0,
      });
    }
  }

  public emitLandingCelebration(pos: Vector2D) {
    for (let i = 0; i < 55; i++) {
      const angle = -Math.PI * 0.5 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 50 + Math.random() * 140;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const colors = ['#4ade80', '#38bdf8', '#fbbf24', '#ffffff', '#a78bfa', '#34d399'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.particles.push({
        x: pos.x + (Math.random() - 0.5) * 50,
        y: pos.y - 8,
        vx,
        vy,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.9,
        size: 3 + Math.random() * 3.5,
        color,
        alpha: 1.0,
      });
    }
  }

  public update(dt: number, gravity = 3.5) {
    // 1. Update Spark & Smoke Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;

      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
        continue;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);
    }

    // 2. Update Broken Ship Debris Shards
    for (let i = this.debris.length - 1; i >= 0; i--) {
      const d = this.debris[i];
      d.life += dt;

      if (d.life >= d.maxLife) {
        this.debris.splice(i, 1);
        continue;
      }

      d.vy += gravity * 2.5 * dt * 10;
      d.vx *= 0.98;
      d.vy *= 0.98;

      d.x += d.vx * dt * 10;
      d.y += d.vy * dt * 10;
      d.angle += d.angularVel * dt;
      d.angularVel *= 0.98;

      // Emit smoke/spark trail behind tumbling hot metal shards
      d.trailTimer += dt;
      if (d.trailTimer > 0.04 && d.life < 1.8) {
        d.trailTimer = 0;
        this.particles.push({
          x: d.x,
          y: d.y,
          vx: (Math.random() - 0.5) * 15,
          vy: -10 - Math.random() * 20,
          life: 0,
          maxLife: 0.35 + Math.random() * 0.35,
          size: 2.2 + Math.random() * 2.5,
          color: Math.random() > 0.4 ? '#f97316' : '#64748b',
          alpha: 0.8,
        });
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    // 1. Draw Sparks, Afterburner Glow Flares, and Smoke
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      if (p.isGlow) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(1, p.size));
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, p.color || '#38bdf8');
        grad.addColorStop(0.65, p.glowColor || 'rgba(56, 189, 248, 0.45)');
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 2. Draw Broken Hull Shards
    for (const d of this.debris) {
      ctx.save();
      const alpha = Math.max(0, 1 - (d.life / d.maxLife) * 0.8);
      ctx.globalAlpha = alpha;
      ctx.translate(d.x, d.y);
      ctx.rotate(d.angle);

      ctx.beginPath();
      ctx.moveTo(d.points[0].x, d.points[0].y);
      for (let j = 1; j < d.points.length; j++) {
        ctx.lineTo(d.points[j].x, d.points[j].y);
      }
      ctx.closePath();

      ctx.fillStyle = d.color;
      ctx.fill();
      ctx.strokeStyle = d.borderColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Burnt glowing fracture edge
      ctx.strokeStyle = '#f97316';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    }
  }

  public clear() {
    this.particles = [];
    this.debris = [];
  }
}

