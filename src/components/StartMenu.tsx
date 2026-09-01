import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PlanetConfig, ShipModelId, CustomMapData } from '../types';
import { PLANETS } from '../game/planets';
import { sound } from '../game/sound';
import { useFullscreen } from '../utils/fullscreen';
import { usePwaInstall } from '../utils/pwaInstall';
import { createBlankCustomMap } from '../utils/customMapsStorage';
import { convertCustomMapToPlanet } from '../game/customMapConverter';
import { PlanetCardSlider, WorldItem } from './PlanetCardSlider';
import { ShipSelector } from './ShipSelector';
import { PlanetSelector } from './PlanetSelector';
import { InstructionsModal } from './InstructionsModal';
import { VersionHistoryModal } from './VersionHistoryModal';
import { CURRENT_GAME_VERSION } from '../utils/versionHistory';
import {
  Play,
  Volume2,
  VolumeX,
  Award,
  Maximize,
  Minimize,
  HelpCircle,
  BookOpen,
  Map,
  Download,
  Check,
  Smartphone,
  Sparkles,
  ExternalLink,
  Music,
  X,
} from 'lucide-react';

interface StartMenuProps {
  onStartGame: (selectedPlanet?: PlanetConfig, customMap?: CustomMapData) => void;
  selectedPlanetId?: string;
  selectedShipId: ShipModelId;
  onSelectShipId: (id: ShipModelId) => void;
  completedPlanets: Record<string, boolean>;
  isMuted: boolean;
  onToggleMute: () => void;
  isMusicMuted?: boolean;
  onToggleMusicMute?: () => void;
  onOpenEditor: (mapData?: CustomMapData) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  onStartGame,
  selectedPlanetId,
  selectedShipId,
  onSelectShipId,
  completedPlanets,
  isMuted,
  onToggleMute,
  isMusicMuted = sound.getMusicMuted(),
  onToggleMusicMute,
  onOpenEditor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedWorldIndex, setSelectedWorldIndex] = useState(() => {
    if (selectedPlanetId) {
      const idx = PLANETS.findIndex((p) => p.id === selectedPlanetId);
      if (idx !== -1) return idx;
    }
    return 0;
  });
  const [currentWorldItem, setCurrentWorldItem] = useState<WorldItem | null>(null);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [isPlanetSelectorOpen, setIsPlanetSelectorOpen] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [dismissInstallBanner, setDismissInstallBanner] = useState(() => {
    try {
      return sessionStorage.getItem('dismiss_pwa_banner') === 'true';
    } catch {
      return false;
    }
  });
  const [dismissUpdateBanner, setDismissUpdateBanner] = useState(() => {
    try {
      return sessionStorage.getItem(`dismiss_update_banner_${CURRENT_GAME_VERSION}`) === 'true';
    } catch {
      return false;
    }
  });
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const { canInstall, isInstalled, isIframe, triggerInstall, openInNewTab } = usePwaInstall();

  const handleDismissBanner = () => {
    setDismissInstallBanner(true);
    try {
      sessionStorage.setItem('dismiss_pwa_banner', 'true');
    } catch {}
  };

  const handleDismissUpdateBanner = () => {
    setDismissUpdateBanner(true);
    try {
      sessionStorage.setItem(`dismiss_update_banner_${CURRENT_GAME_VERSION}`, 'true');
    } catch {}
  };

  const handleMusicToggle = () => {
    if (onToggleMusicMute) {
      onToggleMusicMute();
    } else {
      sound.toggleMusicMute();
    }
  };

  const completedCount = Object.values(completedPlanets).filter(Boolean).length;

  const handleSelectWorld = useCallback((item: WorldItem, index: number) => {
    setSelectedWorldIndex(index);
    setCurrentWorldItem(item);
  }, []);

  const handleSelectPlanetFromModal = useCallback(
    (planet: PlanetConfig) => {
      setIsPlanetSelectorOpen(false);
      const idx = PLANETS.findIndex((p) => p.id === planet.id);
      if (idx !== -1) {
        setSelectedWorldIndex(idx);
      }
      setCurrentWorldItem({
        type: 'official',
        id: planet.id,
        name: planet.name,
        category: planet.category,
        planetConfig: planet,
        isCompleted: !!completedPlanets[planet.id],
      });
      sound.playLandingChime();
    },
    [completedPlanets]
  );

  const handleSelectCustomMapFromModal = useCallback(
    (mapData: CustomMapData) => {
      setIsPlanetSelectorOpen(false);
      const cfg = convertCustomMapToPlanet(mapData);
      setCurrentWorldItem({
        type: 'custom',
        id: `custom-${mapData.id}`,
        name: mapData.name,
        category: `CUSTOM MAP • BY ${mapData.author || 'Commander'}`,
        planetConfig: cfg,
        customMapData: mapData,
        isCompleted: !!completedPlanets[`custom-${mapData.id}`],
      });
      sound.playLandingChime();
    },
    [completedPlanets]
  );

  // Auto-start ambient space menu music on first user gesture
  useEffect(() => {
    sound.startMenuMusic();

    const handleFirstGesture = () => {
      sound.startMenuMusic();
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleLaunch = () => {
    sound.stopMenuMusic();
    sound.playLandingChime();

    if (currentWorldItem?.type === 'create_new') {
      onOpenEditor(createBlankCustomMap());
      return;
    }

    if (currentWorldItem?.customMapData) {
      console.log('[StartMenu] Launching map with customMapData override:', currentWorldItem.customMapData.id, currentWorldItem.name);
      onStartGame(currentWorldItem.planetConfig, currentWorldItem.customMapData);
      return;
    }

    const officialPlanet = currentWorldItem?.planetConfig || PLANETS[0];
    onStartGame(officialPlanet);
  };

  const handleOpenEditorClick = (mapData?: CustomMapData) => {
    sound.stopMenuMusic();
    onOpenEditor(mapData);
  };

  const handleInstallClick = async () => {
    if (canInstall) {
      const accepted = await triggerInstall();
      if (!accepted) {
        setShowPwaModal(true);
      }
    } else {
      setShowPwaModal(true);
    }
  };

  // Cosmic Background Canvas with Traveling Spacecraft & Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Multi-layer Starfield
    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      hue: number;
    }

    const starCount = 200;
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 800),
      size: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      opacity: Math.random() * 0.75 + 0.25,
      twinkleSpeed: Math.random() * 2.5 + 1.2,
      twinkleOffset: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.8 ? 205 : Math.random() > 0.6 ? 40 : Math.random() > 0.4 ? 280 : 220,
    }));

    // Plasma Cosmic Dust Specks
    interface Dust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
    }

    const dustParticles: Dust[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * (height || 800),
      vx: -(Math.random() * 0.35 + 0.15),
      vy: (Math.random() - 0.5) * 0.12,
      size: Math.random() * 2.0 + 0.6,
      alpha: Math.random() * 0.4 + 0.2,
      color: Math.random() > 0.6 ? '#38bdf8' : Math.random() > 0.3 ? '#c084fc' : '#fb923c',
    }));

    // Shooting Meteors
    interface Meteor {
      x: number;
      y: number;
      vx: number;
      vy: number;
      len: number;
      alpha: number;
      color: string;
    }

    let meteors: Meteor[] = [];
    let nextMeteorTime = 3.0;

    // Background Traveling Spacecraft Entity
    const spaceCruiser = {
      x: -120,
      y: height * 0.28,
      vx: 60,
      angle: 0.08,
      w: 44,
      h: 22,
      exhaustParticles: [] as { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number; color: string }[],
    };

    let time = 0;
    let lastFrameTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastFrameTime) * 0.001, 0.05);
      lastFrameTime = now;
      time += dt;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Cosmic Background
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        40,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.95
      );
      bgGrad.addColorStop(0, '#090e1a');
      bgGrad.addColorStop(0.4, '#050811');
      bgGrad.addColorStop(0.8, '#030408');
      bgGrad.addColorStop(1, '#010204');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebula Aura
      const cyanNebula = ctx.createRadialGradient(
        width * 0.25 + Math.sin(time * 0.12) * 40,
        height * 0.65 + Math.cos(time * 0.15) * 30,
        20,
        width * 0.25,
        height * 0.65,
        Math.min(width, height) * 0.6
      );
      cyanNebula.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
      cyanNebula.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      cyanNebula.addColorStop(1, 'transparent');
      ctx.fillStyle = cyanNebula;
      ctx.fillRect(0, 0, width, height);

      // 2. Isotropic 3D Distant Gas Giant Planet
      const planetR = Math.min(width, height) * 0.14;
      const planetX = width * 0.85 + Math.sin(time * 0.02) * 5;
      const planetY = height * 0.2 + Math.cos(time * 0.02) * 4;

      ctx.save();
      // Outer glow
      const glowGrad = ctx.createRadialGradient(
        planetX,
        planetY,
        planetR * 0.85,
        planetX,
        planetY,
        planetR * 1.4
      );
      glowGrad.addColorStop(0, 'rgba(249, 115, 22, 0.25)');
      glowGrad.addColorStop(0.5, 'rgba(234, 88, 12, 0.08)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetR * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Planet Body
      const planetBodyGrad = ctx.createRadialGradient(
        planetX - planetR * 0.35,
        planetY - planetR * 0.35,
        planetR * 0.08,
        planetX,
        planetY,
        planetR
      );
      planetBodyGrad.addColorStop(0, '#fed7aa');
      planetBodyGrad.addColorStop(0.3, '#f97316');
      planetBodyGrad.addColorStop(0.65, '#c2410c');
      planetBodyGrad.addColorStop(0.9, '#431407');
      planetBodyGrad.addColorStop(1, '#1c0702');

      ctx.beginPath();
      ctx.arc(planetX, planetY, planetR, 0, Math.PI * 2);
      ctx.fillStyle = planetBodyGrad;
      ctx.fill();

      // Edge rim
      ctx.strokeStyle = 'rgba(254, 215, 170, 0.35)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetR - 1, -Math.PI * 0.8, Math.PI * 0.15);
      ctx.stroke();
      ctx.restore();

      // 3. Multi-layer Starfield
      stars.forEach((star) => {
        star.x -= star.speed * (1 + Math.sin(time * 0.08) * 0.15);
        if (star.x < 0) {
          star.x = width;
          star.y = Math.random() * height;
        }

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.35 + 0.65;
        ctx.fillStyle = `hsla(${star.hue}, 85%, 90%, ${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Shooting Meteors
      nextMeteorTime -= dt;
      if (nextMeteorTime <= 0) {
        nextMeteorTime = 4.5 + Math.random() * 5.0;
        meteors.push({
          x: Math.random() * width * 0.8 + width * 0.2,
          y: Math.random() * (height * 0.4),
          vx: -(Math.random() * 380 + 280),
          vy: Math.random() * 180 + 100,
          len: Math.random() * 50 + 25,
          alpha: 1.0,
          color: Math.random() > 0.5 ? '#38bdf8' : '#e0f2fe',
        });
      }

      meteors = meteors.filter((m) => m.alpha > 0.02);
      meteors.forEach((m) => {
        m.x += m.vx * dt;
        m.y += m.vy * dt;
        m.alpha -= dt * 1.5;

        ctx.save();
        ctx.strokeStyle = m.color;
        ctx.globalAlpha = Math.max(0, m.alpha);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - (m.vx / 380) * m.len, m.y - (m.vy / 180) * (m.len * 0.5));
        ctx.stroke();
        ctx.restore();
      });

      // 5. Background Traveling Spacecraft
      spaceCruiser.x += spaceCruiser.vx * dt;
      spaceCruiser.y += Math.sin(time * 0.6) * 10 * dt;
      spaceCruiser.angle = Math.sin(time * 0.6) * 0.05 + 0.04;

      if (spaceCruiser.x > width + 150) {
        spaceCruiser.x = -150;
        spaceCruiser.y = Math.random() * (height * 0.45) + height * 0.12;
        spaceCruiser.vx = Math.random() * 30 + 50;
      }

      if (Math.random() < 0.8) {
        const exX = spaceCruiser.x + Math.cos(spaceCruiser.angle + Math.PI) * 20;
        const exY = spaceCruiser.y + Math.sin(spaceCruiser.angle + Math.PI) * 20;
        spaceCruiser.exhaustParticles.push({
          x: exX,
          y: exY + (Math.random() - 0.5) * 3,
          vx: -spaceCruiser.vx * 0.4 - Math.random() * 25,
          vy: (Math.random() - 0.5) * 12,
          life: 0.7 + Math.random() * 0.4,
          maxLife: 1.0,
          size: Math.random() * 3.5 + 2,
          color: Math.random() > 0.4 ? '#38bdf8' : '#818cf8',
        });
      }

      spaceCruiser.exhaustParticles = spaceCruiser.exhaustParticles.filter((p) => p.life > 0);
      spaceCruiser.exhaustParticles.forEach((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        const alpha = Math.max(0, p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = alpha * 0.75;
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Spacecraft rendering
      ctx.save();
      ctx.translate(spaceCruiser.x, spaceCruiser.y);
      ctx.rotate(spaceCruiser.angle);

      // Thruster plume
      const flameLen = 14 + Math.sin(time * 25) * 4;
      const flameGrad = ctx.createLinearGradient(0, 0, -flameLen, 0);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.3, '#38bdf8');
      flameGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(-16, -3.5);
      ctx.lineTo(-16 - flameLen, 0);
      ctx.lineTo(-16, 3.5);
      ctx.closePath();
      ctx.fill();

      // Fuselage
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-10, -12);
      ctx.lineTo(-14, -5);
      ctx.lineTo(-16, -3.5);
      ctx.lineTo(-16, 3.5);
      ctx.lineTo(-14, 5);
      ctx.lineTo(-10, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Canopy
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.ellipse(6, 0, 5, 2, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 6. Dust
      dustParticles.forEach((dust) => {
        dust.x += dust.vx;
        dust.y += dust.vy;
        if (dust.x < -10) dust.x = width + 10;
        if (dust.y < -10) dust.y = height + 10;
        if (dust.y > height + 10) dust.y = -10;

        ctx.fillStyle = dust.color;
        ctx.globalAlpha = dust.alpha * (0.6 + Math.sin(time * 2 + dust.x) * 0.4);
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="start-menu-screen"
      className="relative w-full min-h-screen overflow-y-auto overflow-x-hidden flex flex-col justify-between select-none bg-slate-950 font-sans text-slate-100"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Background Cosmic Canvas */}
      <canvas
        ref={canvasRef}
        id="start-menu-canvas"
        className="fixed inset-0 w-full h-full block z-0 pointer-events-none"
      />

      {/* Top Header Controls */}
      <header className="relative z-20 w-full px-3 sm:px-6 py-2.5 flex items-start justify-between gap-2">
        <div className="flex flex-col items-start gap-2 max-w-[280px] sm:max-w-sm">
          {completedCount > 0 && (
            <div className="flex items-center gap-1.5 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1 rounded-full text-[11px] font-mono text-emerald-300 backdrop-blur-md shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>{completedCount}/{PLANETS.length} WORLDS</span>
            </div>
          )}

          {/* Dismissible Top-Left Latest Update Banner (2-3 lines max) */}
          {!dismissUpdateBanner && (
            <div
              id="banner-latest-update"
              className="w-full p-2.5 sm:p-3 rounded-2xl bg-slate-950/80 border border-teal-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md text-left transition-all"
            >
              <div className="flex items-center justify-between gap-1.5 pb-1 border-b border-white/5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-teal-300">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{CURRENT_GAME_VERSION} UPDATE</span>
                </div>
                <button
                  id="btn-dismiss-update-banner"
                  type="button"
                  onClick={handleDismissUpdateBanner}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Dismiss update banner"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] sm:text-[12px] text-slate-200 font-sans mt-1 leading-snug">
                Transparent menu cards, single-line action buttons, dedicated music mute, magnified title thrusters & cleaned Luna base.
              </p>
              <div className="mt-1.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowVersionHistory(true)}
                  className="text-[10px] font-mono text-teal-400 hover:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                >
                  <span>Changelog</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Fullscreen Toggle */}
          <button
            id="btn-menu-toggle-fullscreen"
            type="button"
            onClick={toggleFullscreen}
            className="p-2 sm:px-3 sm:py-1 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono backdrop-blur-md cursor-pointer flex items-center gap-1.5"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">EXIT</span>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </>
            )}
          </button>

          {/* Dedicated Menu Music Only Toggle */}
          <button
            id="btn-menu-toggle-music"
            type="button"
            onClick={handleMusicToggle}
            className={`p-2 sm:px-3 sm:py-1 rounded-full border transition-all text-xs font-mono backdrop-blur-md cursor-pointer flex items-center gap-1.5 ${
              isMusicMuted
                ? 'bg-rose-950/50 border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
                : 'bg-slate-900/50 hover:bg-slate-800/80 border-white/10 text-slate-300 hover:text-white'
            }`}
            title={isMusicMuted ? 'Unmute Menu Ambient Music' : 'Mute Menu Ambient Music (Keep SFX)'}
          >
            <Music className={`w-3.5 h-3.5 ${isMusicMuted ? 'text-rose-400' : 'text-teal-400'}`} />
            <span className="hidden sm:inline">{isMusicMuted ? 'MUSIC OFF' : 'MUSIC ON'}</span>
          </button>

          {/* Master Sound Effects / Audio Mute Toggle */}
          <button
            id="btn-menu-toggle-sound"
            type="button"
            onClick={onToggleMute}
            className={`p-2 sm:px-3 sm:py-1 rounded-full border transition-all text-xs font-mono backdrop-blur-md cursor-pointer flex items-center gap-1.5 ${
              isMuted
                ? 'bg-rose-950/50 border-rose-500/40 text-rose-300 hover:bg-rose-900/60'
                : 'bg-slate-900/50 hover:bg-slate-800/80 border-white/10 text-slate-300 hover:text-white'
            }`}
            title={isMuted ? 'Unmute Master Audio' : 'Mute Master Audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">SFX ON</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Center Content */}
      <main className="relative z-10 w-full max-w-2xl mx-auto px-3 sm:px-4 py-1 sm:py-2 flex flex-col items-center text-center my-auto">
        
        {/* Game Title with Custom Dual-Throttle Spaceship 'A' */}
        <h1 className="flex items-center justify-center flex-wrap gap-x-1 sm:gap-x-2 text-3xl sm:text-5xl md:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] mb-4">
          <span className="inline-flex items-center">
            GR
            {/* Custom Dual-Throttle Spaceship Letter 'A' with Magnified Thrusters */}
            <span className="inline-flex items-center justify-center relative mx-[0.03em] align-middle" style={{ height: '1.06em', width: '0.88em' }}>
              <svg
                viewBox="0 0 100 148"
                className="w-full h-full drop-shadow-[0_0_14px_rgba(56,189,248,0.85)] overflow-visible"
                aria-label="A"
              >
                <defs>
                  <filter id="afterburnerGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <radialGradient id="afterburnerBloom" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="30%" stopColor="#67e8f9" stopOpacity="0.9" />
                    <stop offset="65%" stopColor="#0284c7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="throatHotspot" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="45%" stopColor="#a5f3fc" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="shipHull" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="45%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>

                  <linearGradient id="shipCanopy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>

                  <linearGradient id="throttleFlameL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#a5f3fc" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="80%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>

                  <linearGradient id="throttleFlameR" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="20%" stopColor="#a5f3fc" />
                    <stop offset="50%" stopColor="#38bdf8" />
                    <stop offset="80%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>

                {/* AFTERBURNER AMBIENT RADIAL LIGHT GLOW */}
                <circle cx="18" cy="98" r="18" fill="url(#afterburnerBloom)" filter="url(#afterburnerGlowFilter)" className="animate-pulse" />
                <circle cx="82" cy="98" r="18" fill="url(#afterburnerBloom)" filter="url(#afterburnerGlowFilter)" className="animate-pulse" />

                {/* DUAL THROTTLE EXHAUST PLUMES */}
                <polygon points="7,97 29,97 18,144" fill="url(#throttleFlameL)" filter="url(#afterburnerGlowFilter)" className="animate-pulse" />
                <polygon points="71,97 93,97 82,144" fill="url(#throttleFlameR)" filter="url(#afterburnerGlowFilter)" className="animate-pulse" />
                
                {/* Inner Core Supersonic Jet */}
                <polygon points="10,97 26,97 18,134" fill="url(#throttleFlameL)" />
                <polygon points="74,97 90,97 82,134" fill="url(#throttleFlameR)" />
                <polygon points="13,97 23,97 18,124" fill="#ffffff" opacity="0.95" />
                <polygon points="77,97 87,97 82,124" fill="#ffffff" opacity="0.95" />

                {/* Supersonic Shock Diamonds */}
                <polygon points="18,103 20.5,107 18,111 15.5,107" fill="#ffffff" opacity="0.9" />
                <polygon points="18,114 20,118 18,122 16,118" fill="#e0f2fe" opacity="0.8" />
                <polygon points="18,125 19.5,129 18,133 16.5,129" fill="#bae6fd" opacity="0.75" />
                <polygon points="82,103 84.5,107 82,111 79.5,107" fill="#ffffff" opacity="0.9" />
                <polygon points="82,114 84,118 82,122 80,118" fill="#e0f2fe" opacity="0.8" />
                <polygon points="82,125 83.5,129 82,133 80.5,129" fill="#bae6fd" opacity="0.75" />

                {/* White-Hot Throat Flare Rings */}
                <ellipse cx="18" cy="97.5" rx="6.5" ry="2.5" fill="url(#throatHotspot)" />
                <ellipse cx="82" cy="97.5" rx="6.5" ry="2.5" fill="url(#throatHotspot)" />

                {/* LANDING GEAR LEGS & STRUTS forming the 'A' Outer Slopes */}
                {/* Left Leg Strut */}
                <line x1="40" y1="58" x2="16" y2="100" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                {/* Right Leg Strut */}
                <line x1="60" y1="58" x2="84" y2="100" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
                {/* Left Footpad */}
                <rect x="10" y="98" width="14" height="4" rx="1.5" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />
                {/* Right Footpad */}
                <rect x="76" y="98" width="14" height="4" rx="1.5" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />

                {/* MAIN SPACESHIP FUSELAGE (Forms the Apex & Flanks of 'A') */}
                <polygon
                  points="50,4 88,96 72,96 58,64 42,64 28,96 12,96"
                  fill="url(#shipHull)"
                  stroke="#38bdf8"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* INNER CABIN CUTOUT forming the upper triangle hole of 'A' */}
                <polygon
                  points="50,24 62,54 38,54"
                  fill="#030712"
                  stroke="#38bdf8"
                  strokeWidth="2.2"
                />

                {/* GLOWING COCKPIT VISOR */}
                <polygon
                  points="50,28 59,51 41,51"
                  fill="url(#shipCanopy)"
                  stroke="#7dd3fc"
                  strokeWidth="1.2"
                />

                {/* HORIZONTAL STRUCTURAL TRUSS / CROSSBAR (The Crossbar of 'A') */}
                <rect x="34" y="60" width="32" height="8" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                {/* Crossbar Hazard Stripes / Avionics Indicators */}
                <line x1="42" y1="62" x2="42" y2="66" stroke="#f59e0b" strokeWidth="2" />
                <line x1="50" y1="62" x2="50" y2="66" stroke="#38bdf8" strokeWidth="2" />
                <line x1="58" y1="62" x2="58" y2="66" stroke="#f59e0b" strokeWidth="2" />

                {/* LEFT THROTTLE ENGINE POD & GIMBAL BRACKET */}
                <g id="left-throttle-pod">
                  {/* Throttle Actuator Linkage */}
                  <line x1="28" y1="78" x2="18" y2="86" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Throttle Combustion Chamber Body */}
                  <rect x="13" y="82" width="10" height="9" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
                  {/* Throttle Bell Nozzle */}
                  <polygon points="12,91 24,91 22,98 14,98" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Throttle Heat Ring */}
                  <line x1="14" y1="94" x2="22" y2="94" stroke="#f59e0b" strokeWidth="1.2" />
                </g>

                {/* RIGHT THROTTLE ENGINE POD & GIMBAL BRACKET */}
                <g id="right-throttle-pod">
                  {/* Throttle Actuator Linkage */}
                  <line x1="72" y1="78" x2="82" y2="86" stroke="#94a3b8" strokeWidth="2.5" />
                  {/* Throttle Combustion Chamber Body */}
                  <rect x="77" y="82" width="10" height="9" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.8" />
                  {/* Throttle Bell Nozzle */}
                  <polygon points="76,91 88,91 86,98 78,98" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
                  {/* Throttle Heat Ring */}
                  <line x1="78" y1="94" x2="86" y2="94" stroke="#f59e0b" strokeWidth="1.2" />
                </g>

                {/* RCS ATTITUDE NOZZLES at Apex */}
                <rect x="42" y="5" width="3" height="2" rx="0.5" fill="#94a3b8" />
                <rect x="55" y="5" width="3" height="2" rx="0.5" fill="#94a3b8" />
              </svg>
            </span>
            VITY
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200">
            LANDER
          </span>
        </h1>

        {/* Main Selection Area: Fully Transparent and Unclipped */}
        <div className="w-full flex flex-col gap-2.5 sm:gap-3.5 mb-4">
          {/* Module 1: Destination World Selection */}
          <div id="menu-destination-section" className="w-full relative overflow-visible">
            <PlanetCardSlider
              selectedWorldIndex={selectedWorldIndex}
              selectedPlanetId={currentWorldItem?.id || selectedPlanetId}
              onSelectWorld={handleSelectWorld}
              completedPlanets={completedPlanets}
              onOpenEditor={handleOpenEditorClick}
              onOpenPlanetSelector={() => setIsPlanetSelectorOpen(true)}
            />
          </div>

          {/* Module 2: Spacecraft Fleet Selection */}
          <div id="menu-spacecraft-section" className="w-full relative overflow-visible">
            <ShipSelector
              selectedModelId={selectedShipId}
              onSelectModel={onSelectShipId}
              onOpenModal={() => setIsShipModalOpen(true)}
            />
          </div>
        </div>

        {/* Primary Action Buttons: Single line on widescreen */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl pb-3">
          <button
            id="btn-launch-mission"
            type="button"
            onClick={handleLaunch}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-sky-500 via-sky-400 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-[0_0_28px_rgba(56,189,248,0.55)] active:scale-98 transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>
              {currentWorldItem?.type === 'create_new' ? 'CREATE MAP' : 'LAUNCH MISSION'}
            </span>
          </button>

          <button
            id="btn-open-level-editor"
            type="button"
            onClick={() => handleOpenEditorClick()}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 border border-sky-400/30 hover:border-sky-400 text-sky-300 font-mono font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-1.5 backdrop-blur-md transition-all cursor-pointer whitespace-nowrap shadow-sm"
          >
            <Map className="w-3.5 h-3.5 text-sky-400" />
            <span>LEVEL EDITOR</span>
          </button>

          <button
            id="btn-open-instructions"
            type="button"
            onClick={() => setShowHowToPlay(true)}
            className="w-full sm:w-auto px-4 sm:px-5 py-3 rounded-full bg-slate-900/60 hover:bg-slate-800/90 border border-white/10 hover:border-white/20 text-slate-300 font-mono font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-1.5 backdrop-blur-md transition-all cursor-pointer shadow-sm hover:text-white whitespace-nowrap"
            title="Open Flight Instructions & Keyboard/Touch Controls"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>INSTRUCTIONS</span>
          </button>
        </div>

        {/* Footer: Interactive Version and Creator Credit */}
        <footer id="app-footer-credits" className="w-full text-center mt-auto pt-2 pb-1 select-none">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/60 border border-white/10 text-[11px] sm:text-xs font-mono text-slate-400 backdrop-blur-md shadow-lg">
            <button
              id="btn-open-version-history"
              type="button"
              onClick={() => setShowVersionHistory(true)}
              className="text-sky-400 hover:text-sky-300 font-bold tracking-wider hover:underline flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Click to view Version History & Release Notes"
            >
              <span>{CURRENT_GAME_VERSION}</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-sky-500/20 text-sky-300 rounded-md border border-sky-400/40 font-mono">
                HISTORY
              </span>
            </button>
            <span className="text-slate-600 font-bold">•</span>
            <span className="text-slate-300">
              Made by <strong className="text-white font-bold">Miguel Galego</strong>
            </span>
          </div>
        </footer>

      </main>

      {/* Floating Bottom PWA Install Banner (Shown when not installed yet) */}
      {!isInstalled && !dismissInstallBanner && (
        <aside
          id="pwa-install-bottom-banner"
          aria-label="App installation banner"
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-950/90 border border-sky-400/50 rounded-2xl p-3 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/icon-192.png"
              alt="Gravity Lander Icon"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl border border-sky-400/40 object-cover shrink-0 shadow-md bg-slate-900"
            />
            <div className="min-w-0">
              <div className="text-white font-mono font-bold text-xs truncate">
                Install Gravity Lander
              </div>
              <div className="text-sky-300/80 font-sans text-[11px] truncate">
                {isIframe ? 'Open in browser tab to install' : 'Play offline in standalone fullscreen'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {canInstall ? (
              <button
                type="button"
                onClick={async () => {
                  const accepted = await triggerInstall();
                  if (!accepted) setShowPwaModal(true);
                }}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.4)] flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
            ) : isIframe ? (
              <button
                type="button"
                onClick={openInNewTab}
                className="px-3 py-1.5 rounded-lg bg-sky-400 hover:bg-sky-300 text-slate-950 font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.4)] flex items-center gap-1"
              >
                <span>New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowPwaModal(true)}
                className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-300 hover:text-white font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Install</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDismissBanner}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              title="Dismiss"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* PWA Install Guide Modal */}
      {showPwaModal && (
        <div
          id="pwa-install-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <div className="w-full max-w-md bg-slate-950/95 border border-sky-400/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-left my-auto backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-sky-400" />
                <h3 className="font-mono font-bold text-sm sm:text-base text-white">
                  INSTALL GRAVITY LANDER (PWA)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPwaModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono px-3 py-1 bg-slate-900/80 rounded-full border border-white/10 cursor-pointer"
              >
                CLOSE
              </button>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/70 p-3 rounded-2xl border border-sky-400/20">
              <img
                src="/icon-192.png"
                alt="App Icon"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl shadow-lg border border-sky-400/40 object-cover shrink-0 bg-slate-950"
              />
              <div className="text-xs font-mono">
                <div className="font-bold text-white text-sm">Gravity Lander</div>
                <div className="text-sky-300/80">Native PWA Game • Offline • Fullscreen</div>
              </div>
            </div>

            {/* Direct 1-Click Install Button if supported by current browser session */}
            {canInstall && (
              <button
                type="button"
                onClick={async () => {
                  const success = await triggerInstall();
                  if (success) setShowPwaModal(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>INSTALL APPLICATION NOW</span>
              </button>
            )}

            {/* If in iframe preview, explain why browsers require opening top-level tab */}
            {isIframe && (
              <div className="p-3.5 bg-sky-950/50 rounded-2xl border border-sky-500/40 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sky-300 font-bold">Preview Iframe Detected</span>
                  <button
                    type="button"
                    onClick={openInNewTab}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-md"
                  >
                    <span>OPEN IN BROWSER TAB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-slate-300 font-sans text-[11px] leading-relaxed">
                  Web browsers (like Chrome, Edge, and Safari) <strong>block PWA installation inside embedded preview iframes</strong> for security. Opening in a direct browser tab activates the native <strong>"Install App"</strong> icon in Chrome's address bar.
                </p>
              </div>
            )}

            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                <div className="text-teal-300 font-bold mb-1">Desktop Chrome / Edge / Brave:</div>
                <p className="text-slate-400 leading-relaxed font-sans text-[11px]">
                  Open in a browser tab. Look for the <strong className="text-teal-300">Install icon</strong> (computer with down arrow) on the right side of the address bar, or click Chrome menu (<strong className="text-slate-200">⋮</strong>) → <strong className="text-teal-300">"Install Gravity Lander"</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                <div className="text-sky-300 font-bold mb-1">Android (Chrome / Samsung Internet):</div>
                <p className="text-slate-400 leading-relaxed font-sans text-[11px]">
                  Open the browser menu (<strong className="text-slate-200">⋮</strong>) and tap <strong className="text-emerald-400">"Install app"</strong> or <strong className="text-slate-200">"Add to Home screen"</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-white/5">
                <div className="text-purple-300 font-bold mb-1">iOS / iPadOS (Safari):</div>
                <p className="text-slate-400 leading-relaxed font-sans text-[11px]">
                  Tap the <strong className="text-slate-200">Share</strong> button (box with upward arrow ⎋) and select <strong className="text-purple-300">"Add to Home Screen"</strong>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPwaModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/10"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* Flight Instructions & Controls Modal */}
      <InstructionsModal
        isOpen={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
        onStartGame={() => {
          setShowHowToPlay(false);
          handleLaunch();
        }}
      />

      {/* Expedition Planet & Custom Map Selector Modal */}
      <PlanetSelector
        currentPlanet={currentWorldItem?.planetConfig || PLANETS[0]}
        onSelectPlanet={handleSelectPlanetFromModal}
        isOpen={isPlanetSelectorOpen}
        onClose={() => setIsPlanetSelectorOpen(false)}
        completedPlanets={completedPlanets}
        onOpenEditor={handleOpenEditorClick}
        onSelectCustomMap={handleSelectCustomMapFromModal}
      />

      {/* Spacecraft Hangar Fleet Selector Modal */}
      {isShipModalOpen && (
        <ShipSelector
          selectedModelId={selectedShipId}
          onSelectModel={(newModel) => {
            onSelectShipId(newModel);
            setIsShipModalOpen(false);
          }}
          onClose={() => setIsShipModalOpen(false)}
          isModal={true}
        />
      )}

      {/* Interactive Version History & Changelog Modal */}
      <VersionHistoryModal
        isOpen={showVersionHistory}
        onClose={() => setShowVersionHistory(false)}
      />
    </div>
  );
};
