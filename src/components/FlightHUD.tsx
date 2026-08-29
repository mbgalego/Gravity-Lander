import React from 'react';
import { ShipState, PlanetConfig, WorldMap } from '../types';
import { getShipConfig } from '../game/ships';
import { PlanetGraphic } from './PlanetGraphic';
import {
  Fuel,
  RotateCcw,
  Home,
  Settings,
  Shield,
  Wrench,
  AlertTriangle,
  Package,
  Layers,
  Truck,
  Weight,
  Clock,
  Sliders,
  Flame,
  Snowflake,
  Atom,
  Zap,
  Magnet,
} from 'lucide-react';

interface FlightHUDProps {
  ship: ShipState;
  planet: PlanetConfig;
  world: WorldMap;
  elapsedTime: number;
  onOpenSettings: () => void;
  onRestart: () => void;
  onReturnToMenu: () => void;
  onOpenShips?: () => void;
  isTestFlight?: boolean;
  onReturnToEditor?: () => void;
}

export const FlightHUD: React.FC<FlightHUDProps> = ({
  ship,
  planet,
  world,
  elapsedTime,
  onOpenSettings,
  onRestart,
  onReturnToMenu,
  onOpenShips,
  isTestFlight = false,
  onReturnToEditor,
}) => {
  const shipConfig = getShipConfig(ship.modelId);
  const fuelPct = Math.max(0, Math.min(100, (ship.fuel / ship.maxFuel) * 100));
  const hullPct = Math.max(0, Math.min(100, (ship.hull ?? 100)));
  const vertSpeed = Math.abs(ship.vel.y);
  const horizSpeed = Math.abs(ship.vel.x);

  // Normalize angle to degrees (-180 to 180)
  let angleDeg = (ship.angle * 180) / Math.PI;
  angleDeg = ((angleDeg + 180) % 360) - 180;
  const absAngle = Math.abs(angleDeg);

  // Active Attached Cargo
  const attachedCargo = world.cargoItems?.find((c) => c.id === ship.attachedCargoId || c.isAttached);

  // Active Loaded Trucks
  const loadedTrucksCount = ship.loadedTrucksCount || 0;
  const totalMassKg = ship.totalMassKg || Math.round(shipConfig.mass * 1000 + (attachedCargo?.mass || 0) + loadedTrucksCount * 600);

  // Landing safety checks with threshold coloring
  const isVertSpeedSafe = vertSpeed <= 8.5;
  const isVertSpeedWarn = vertSpeed > 8.5 && vertSpeed <= 12.0;

  const isHorizSpeedSafe = horizSpeed <= 5.5;
  const isHorizSpeedWarn = horizSpeed > 5.5 && horizSpeed <= 8.5;

  const isAngleSafe = absAngle <= 36.0;

  return (
    <header
      id="flight-hud"
      className="pointer-events-none select-none absolute inset-x-0 top-0 p-1.5 sm:p-2.5 flex flex-col gap-1 z-20"
    >
      {/* Unified Telemetry & Control Dashboard Card - Ultra-Compact Glassy Bar */}
      <div className="w-full max-w-5xl mx-auto bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-2xl text-slate-200 flex flex-col gap-1">
        
        {/* Tier 1: Planet Identity, Status Badges & Minimal Actions */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          
          {/* Planet & Ship Info & Mini Cargo/Vehicle/Time Badges */}
          <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0">
              <PlanetGraphic planet={planet} size={24} showGlow={false} />
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 truncate">
              <span className="text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-wider text-sky-300 truncate">
                {planet.name.replace(/\s*\(Custom Edition\)/gi, '').trim()}
              </span>

              {isTestFlight && (
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase bg-amber-950/90 border border-amber-500/80 text-amber-300 flex items-center gap-1 shrink-0 animate-pulse shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  title="Editor Test Flight Active"
                >
                  <Sliders className="w-2.5 h-2.5 text-amber-400" />
                  <span>TEST FLIGHT</span>
                </span>
              )}

              <button
                type="button"
                onClick={onOpenShips || onOpenSettings}
                className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border hidden md:inline-flex items-center gap-1 shrink-0 cursor-pointer pointer-events-auto hover:scale-105 transition-transform"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.7)',
                  borderColor: shipConfig.accentColor,
                  color: shipConfig.accentColor,
                }}
                title="Change spacecraft model"
              >
                <span>{shipConfig.codename}</span>
              </button>

              {/* Compact Vehicle Mini Icon */}
              {loadedTrucksCount > 0 && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/90 border border-amber-500/60 text-amber-300 flex items-center gap-1 shrink-0 animate-pulse"
                  title={`${loadedTrucksCount} Heavy Vehicle${loadedTrucksCount > 1 ? 's' : ''} Onboard (${loadedTrucksCount * 600}kg) ➔ Deliver to LZ`}
                >
                  <Truck className="w-3 h-3 text-amber-400" />
                  <span>{loadedTrucksCount}</span>
                </span>
              )}

              {/* Compact Cargo Mini Icon with Volatile Hazard Telemetry */}
              {attachedCargo && (() => {
                const cType = attachedCargo.cargoType || 'standard';
                if (cType === 'explosive') {
                  return (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-orange-950/90 border border-orange-500/80 text-orange-300 flex items-center gap-1 shrink-0 animate-pulse"
                      title={`HIGH EXPLOSIVE: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ Detonates on violent impact!`}
                    >
                      <Flame className="w-3 h-3 text-orange-400" />
                      <span>{attachedCargo.mass}kg • ARMED</span>
                    </span>
                  );
                }
                if (cType === 'cryogenic') {
                  const temp = Math.round(attachedCargo.temperature ?? 0);
                  const isHot = temp > 70;
                  return (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border flex items-center gap-1 shrink-0 ${
                        isHot
                          ? 'bg-red-950/90 border-red-500 text-red-300 animate-bounce'
                          : 'bg-sky-950/90 border-sky-400/80 text-sky-300 animate-pulse'
                      }`}
                      title={`CRYO SUPERCONDUCTOR: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ Temp: ${temp}% heat! Melts near volcanoes.`}
                    >
                      <Snowflake className={`w-3 h-3 ${isHot ? 'text-red-400' : 'text-sky-300'}`} />
                      <span>{attachedCargo.mass}kg • {temp}% HEAT</span>
                    </span>
                  );
                }
                if (cType === 'isotope') {
                  const integrity = Math.round(attachedCargo.integrity ?? 100);
                  const isCritical = integrity < 40;
                  return (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border flex items-center gap-1 shrink-0 ${
                        isCritical
                          ? 'bg-red-950/90 border-red-500 text-red-300 animate-bounce'
                          : 'bg-purple-950/90 border-purple-400/80 text-purple-300 animate-pulse'
                      }`}
                      title={`QUANTUM ISOTOPE: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ Integrity: ${integrity}%. Fragile!` }
                    >
                      <Atom className={`w-3 h-3 ${isCritical ? 'text-red-400' : 'text-purple-300'}`} />
                      <span>{attachedCargo.mass}kg • {integrity}%</span>
                    </span>
                  );
                }
                if (cType === 'magnetic') {
                  return (
                    <span
                      className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-blue-950/90 border border-blue-400/80 text-blue-300 flex items-center gap-1 shrink-0 animate-pulse"
                      title={`MAGNETIC DYNAMO: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ Heavy magnetic drag torque!`}
                    >
                      <Magnet className="w-3 h-3 text-blue-400" />
                      <span>{attachedCargo.mass}kg • MAG</span>
                    </span>
                  );
                }
                if (cType === 'plasma') {
                  const timer = Math.ceil(attachedCargo.chargeTimer ?? 60);
                  const isExpiring = timer < 15;
                  return (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold border flex items-center gap-1 shrink-0 ${
                        isExpiring
                          ? 'bg-red-950/90 border-red-500 text-red-300 animate-bounce'
                          : 'bg-emerald-950/90 border-emerald-400/80 text-emerald-300 animate-pulse'
                      }`}
                      title={`PLASMA BATTERY: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ EMP Discharge in ${timer}s!`}
                    >
                      <Zap className={`w-3 h-3 ${isExpiring ? 'text-red-400' : 'text-emerald-400'}`} />
                      <span>{attachedCargo.mass}kg • EMP:{timer}s</span>
                    </span>
                  );
                }
                return (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-sky-950/90 border border-sky-500/60 text-sky-300 flex items-center gap-1 shrink-0 animate-pulse"
                    title={`Attached Cargo: ${attachedCargo.name} (${attachedCargo.mass}kg) ➔ Deliver to LZ`}
                  >
                    <Package className="w-3 h-3 text-sky-400" />
                    <span>{attachedCargo.mass}kg</span>
                  </span>
                );
              })()}

              {/* Streamlined Live Mission Timer Badge */}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-slate-900/90 border border-white/10 text-slate-200 flex items-center gap-1 shrink-0 ml-auto sm:ml-0"
                title="Mission Elapsed Flight Time"
              >
                <Clock className="w-3 h-3 text-sky-400" />
                <span>{elapsedTime.toFixed(1)}s</span>
              </span>
            </div>
          </div>

          {/* Minimal Action Toolbar: Settings/Pause, Restart, Menu/Editor */}
          <div className="flex items-center gap-1 shrink-0 pointer-events-auto">
            
            {/* Quick Restart */}
            <button
              id="btn-quick-restart"
              type="button"
              onClick={onRestart}
              className="p-1 sm:px-2.5 sm:py-1 bg-slate-900/70 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white rounded-full text-[11px] font-mono transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1"
              title="Restart Mission [R]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Restart</span>
            </button>

            {/* In-Game Settings / Pause Button */}
            <button
              id="btn-open-settings"
              type="button"
              onClick={onOpenSettings}
              className="p-1 sm:px-2.5 sm:py-1 bg-slate-900/70 hover:bg-slate-800 border border-sky-400/40 hover:border-sky-400 text-sky-300 hover:text-white rounded-full text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1"
              title="Open Settings, Audio, Planets & Help"
            >
              <Settings className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {/* Return to Menu or Editor Button */}
            {isTestFlight ? (
              <button
                id="btn-return-editor"
                type="button"
                onClick={onReturnToEditor || onReturnToMenu}
                className="p-1 sm:px-2.5 sm:py-1 bg-gradient-to-r from-sky-950 to-teal-950 hover:from-sky-900 hover:to-teal-900 border border-sky-400/60 hover:border-sky-400 text-sky-300 hover:text-white rounded-full text-[11px] font-mono font-bold transition-all shadow-sm cursor-pointer backdrop-blur-md flex items-center gap-1"
                title="Return to Map Editor [M]"
              >
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Editor</span>
              </button>
            ) : (
              <button
                id="btn-return-menu"
                type="button"
                onClick={onReturnToMenu}
                className="p-1 sm:p-1.5 bg-slate-900/70 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white rounded-full text-[11px] font-mono transition-all shadow-sm cursor-pointer backdrop-blur-md"
                title="Return to Main Menu [M]"
              >
                <Home className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tier 2: Streamlined Real-Time Telemetry Bar (6 Compact Columns) */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 text-[10px] sm:text-xs font-mono">
          
          {/* 1. Fuel Gauge */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-between">
            <div className="flex items-center justify-between text-slate-400 leading-none">
              <span className="flex items-center gap-0.5">
                <Fuel className={`w-3 h-3 ${fuelPct < 20 ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`} />
                <span className="text-[9px] text-yellow-400 font-bold">FUEL</span>
              </span>
              <span className={`font-bold text-xs ${fuelPct < 20 ? 'text-red-400 font-extrabold' : 'text-yellow-300'}`}>
                {Math.round(fuelPct)}%
              </span>
            </div>
            <div className="w-full bg-slate-950/90 h-1 rounded-full overflow-hidden mt-0.5 border border-white/5">
              <div
                className={`h-full transition-all duration-75 rounded-full ${
                  fuelPct > 50
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-300'
                    : fuelPct > 20
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-red-500 animate-pulse'
                }`}
                style={{ width: `${fuelPct}%` }}
              />
            </div>
          </div>

          {/* 2. Hull Integrity Gauge */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-between">
            <div className="flex items-center justify-between text-slate-400 leading-none">
              <span className="flex items-center gap-0.5">
                {ship.isRepairing ? (
                  <Wrench className="w-3 h-3 text-emerald-400 animate-spin" />
                ) : hullPct < 30 ? (
                  <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
                ) : (
                  <Shield className="w-3 h-3 text-sky-400" />
                )}
                <span className="text-[9px]">HULL</span>
              </span>
              <span
                className={`font-bold text-xs ${
                  ship.isRepairing
                    ? 'text-emerald-400'
                    : hullPct > 60
                    ? 'text-slate-200'
                    : hullPct > 30
                    ? 'text-amber-400'
                    : 'text-red-400 animate-pulse'
                }`}
              >
                {Math.round(hullPct)}%
              </span>
            </div>
            <div className="w-full bg-slate-950/90 h-1 rounded-full overflow-hidden mt-0.5 border border-white/5">
              <div
                className={`h-full transition-all duration-75 rounded-full ${
                  ship.isRepairing
                    ? 'bg-emerald-400 animate-pulse'
                    : hullPct > 60
                    ? 'bg-gradient-to-r from-sky-400 to-emerald-400'
                    : hullPct > 30
                    ? 'bg-gradient-to-r from-amber-500 to-orange-400'
                    : 'bg-red-500 animate-pulse'
                }`}
                style={{ width: `${hullPct}%` }}
              />
            </div>
          </div>

          {/* 3. Vertical Speed */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-center">
            <div className="flex items-center justify-between leading-none">
              <span className="text-[9px] text-slate-400">V-SPD</span>
              <span
                className={`font-bold text-xs ${
                  isVertSpeedSafe
                    ? 'text-emerald-400'
                    : isVertSpeedWarn
                    ? 'text-amber-400'
                    : 'text-red-400 animate-pulse'
                }`}
              >
                {vertSpeed.toFixed(1)}
              </span>
            </div>
          </div>

          {/* 4. Horizontal Drift Speed */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-center">
            <div className="flex items-center justify-between leading-none">
              <span className="text-[9px] text-slate-400">H-DFT</span>
              <span
                className={`font-bold text-xs ${
                  isHorizSpeedSafe
                    ? 'text-emerald-400'
                    : isHorizSpeedWarn
                    ? 'text-amber-400'
                    : 'text-red-400 animate-pulse'
                }`}
              >
                {horizSpeed.toFixed(1)}
              </span>
            </div>
          </div>

          {/* 5. Craft Attitude / Tilt Angle */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-center">
            <div className="flex items-center justify-between leading-none">
              <span className="text-[9px] text-slate-400">ATT</span>
              <span
                className={`font-bold text-xs ${
                  isAngleSafe ? 'text-emerald-400' : 'text-red-400 animate-pulse'
                }`}
              >
                {absAngle.toFixed(1)}°
              </span>
            </div>
          </div>

          {/* 6. Total Dynamic Mass */}
          <div className="flex flex-col bg-slate-900/60 px-1.5 py-1 rounded-lg border border-white/5 justify-center">
            <div className="flex items-center justify-between leading-none">
              <span className="text-[9px] text-slate-400 flex items-center gap-0.5">
                <Weight className="w-2.5 h-2.5 text-sky-400" />
                <span>MASS</span>
              </span>
              <span className="font-bold text-xs text-sky-300">
                {totalMassKg.toLocaleString()}kg
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

