import React, { useState, useEffect } from 'react';
import { ShipState, PlanetConfig, WorldMap } from '../types';
import { Bug, Terminal, Activity, X, Copy, Check } from 'lucide-react';

interface DebugOverlayProps {
  ship: ShipState;
  planet: PlanetConfig;
  world: WorldMap;
  elapsedTime: number;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isOpen: boolean;
  onClose: () => void;
}

export const DebugOverlay: React.FC<DebugOverlayProps> = ({
  ship,
  planet,
  world,
  elapsedTime,
  canvasRef,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewportInfo, setViewportInfo] = useState({
    innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
    innerHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    dpr: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
    orientation: typeof window !== 'undefined' ? (window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape') : 'Unknown',
    canvasWidth: 0,
    canvasHeight: 0,
    canvasCssWidth: 0,
    canvasCssHeight: 0,
  });

  useEffect(() => {
    const updateVp = () => {
      const canvas = canvasRef.current;
      const rect = canvas ? canvas.getBoundingClientRect() : { width: 0, height: 0 };
      setViewportInfo({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        dpr: window.devicePixelRatio || 1,
        orientation: window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape',
        canvasWidth: canvas ? canvas.width : 0,
        canvasHeight: canvas ? canvas.height : 0,
        canvasCssWidth: Math.round(rect.width),
        canvasCssHeight: Math.round(rect.height),
      });
    };

    updateVp();
    const interval = setInterval(updateVp, 250);
    window.addEventListener('resize', updateVp);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateVp);
    };
  }, [canvasRef]);

  if (!isOpen) return null;

  const speed = Math.hypot(ship.vel.x, ship.vel.y);
  let angleDeg = (ship.angle * 180) / Math.PI;
  angleDeg = ((angleDeg + 180) % 360) - 180;
  const distToPad = Math.hypot(ship.pos.x - world.landingPad.center.x, ship.pos.y - world.landingPad.center.y);

  const dumpDiagnostic = () => {
    const report = {
      timestamp: new Date().toISOString(),
      viewport: viewportInfo,
      planet: { id: planet.id, name: planet.name, gravity: planet.gravity, airResistance: planet.airResistance, burnRate: planet.fuelBurnRate },
      ship: {
        pos: { x: Math.round(ship.pos.x), y: Math.round(ship.pos.y) },
        vel: { vx: Number(ship.vel.x.toFixed(2)), vy: Number(ship.vel.y.toFixed(2)), speed: Number(speed.toFixed(2)) },
        angleDeg: Number(angleDeg.toFixed(1)),
        fuel: Math.round(ship.fuel),
        isLanded: ship.isLanded,
        isCrashed: ship.isCrashed,
        leftThruster: ship.leftThruster,
        rightThruster: ship.rightThruster,
      },
      landingPad: {
        x1: world.landingPad.x1,
        x2: world.landingPad.x2,
        y: world.landingPad.y,
        center: world.landingPad.center,
        distToPad: Math.round(distToPad),
      },
      flightTime: Number(elapsedTime.toFixed(2)),
    };

    console.table(report);
    navigator.clipboard?.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-x-2 top-20 sm:top-24 sm:right-4 sm:left-auto sm:w-96 z-50 bg-slate-950/95 border border-sky-500/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-lg text-slate-200 font-mono text-[11px] select-text animate-in fade-in">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-sky-400 font-bold">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-4 h-4 text-sky-400" />
          DIAGNOSTIC TELEMETRY
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={dumpDiagnostic}
            className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[10px]"
            title="Copy & Log to Console"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-0.5 text-slate-400 hover:text-white rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
        {/* Viewport Sizing & Aspect */}
        <div className="bg-slate-900/90 rounded p-2 border border-slate-800 space-y-1">
          <div className="text-sky-300 font-semibold text-[10px] uppercase flex items-center justify-between">
            <span>Viewport & Canvas</span>
            <span className={viewportInfo.orientation === 'Portrait' ? 'text-amber-400' : 'text-emerald-400'}>
              {viewportInfo.orientation}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 text-[10px] text-slate-300">
            <div>Window: {viewportInfo.innerWidth} × {viewportInfo.innerHeight}</div>
            <div>DPR: {viewportInfo.dpr.toFixed(2)}</div>
            <div>Canvas Buffer: {viewportInfo.canvasWidth} × {viewportInfo.canvasHeight}</div>
            <div>Canvas CSS: {viewportInfo.canvasCssWidth} × {viewportInfo.canvasCssHeight}</div>
          </div>
        </div>

        {/* Ship Position & Speed */}
        <div className="bg-slate-900/90 rounded p-2 border border-slate-800 space-y-1">
          <div className="text-sky-300 font-semibold text-[10px] uppercase">Ship Dynamics</div>
          <div className="grid grid-cols-2 gap-x-2 text-[10px] text-slate-300">
            <div>Pos: ({Math.round(ship.pos.x)}, {Math.round(ship.pos.y)})</div>
            <div>Speed: {speed.toFixed(2)} m/s</div>
            <div>Vel: X:{ship.vel.x.toFixed(2)} Y:{ship.vel.y.toFixed(2)}</div>
            <div>Tilt: {angleDeg.toFixed(1)}°</div>
            <div>Fuel: {ship.fuel.toFixed(1)} / {ship.maxFuel}</div>
            <div>State: {ship.isLanded ? 'LANDED' : ship.isCrashed ? 'CRASHED' : 'FLYING'}</div>
          </div>
        </div>

        {/* Landing Zone Target */}
        <div className="bg-slate-900/90 rounded p-2 border border-slate-800 space-y-1">
          <div className="text-sky-300 font-semibold text-[10px] uppercase">Landing Pad LZ</div>
          <div className="grid grid-cols-2 gap-x-2 text-[10px] text-slate-300">
            <div>Pad X: {world.landingPad.x1} - {world.landingPad.x2}</div>
            <div>Pad Y: {world.landingPad.y}</div>
            <div>Distance: {Math.round(distToPad)} px</div>
            <div>Par Time: {planet.targetTimeSec}s (Elapsed: {elapsedTime.toFixed(1)}s)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
