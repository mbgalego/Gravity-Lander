import React, { useState, useEffect, useRef } from 'react';
import { ShipState, PlanetConfig, CargoDeliveryReport } from '../types';
import { sound } from '../game/sound';
import { InstructionsModal } from './InstructionsModal';
import {
  Award,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  X,
  ShieldCheck,
  Flame,
  Clock,
  Trophy,
  Sparkles,
  Map,
  Home,
  Package,
  Truck,
  Navigation,
  Shield,
  Sliders,
  Snowflake,
  Zap,
  Atom,
  Bomb,
  Magnet,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Info,
} from 'lucide-react';

interface VictoryScoreCardProps {
  landingScore: NonNullable<ShipState['landingScore']>;
  targetTimeSec: number;
}

function getCargoIcon(cargoType: string) {
  switch (cargoType) {
    case 'isotope':
      return Atom;
    case 'explosive':
      return Bomb;
    case 'cryogenic':
      return Snowflake;
    case 'plasma':
      return Zap;
    case 'magnetic':
      return Magnet;
    default:
      return Package;
  }
}

function getCargoTheme(cargoType: string) {
  switch (cargoType) {
    case 'isotope':
      return { border: 'border-purple-500/40', text: 'text-purple-300', bg: 'bg-purple-950/40', badge: 'bg-purple-900/60 text-purple-200' };
    case 'explosive':
      return { border: 'border-orange-500/40', text: 'text-orange-300', bg: 'bg-orange-950/40', badge: 'bg-orange-900/60 text-orange-200' };
    case 'cryogenic':
      return { border: 'border-cyan-500/40', text: 'text-cyan-300', bg: 'bg-cyan-950/40', badge: 'bg-cyan-900/60 text-cyan-200' };
    case 'plasma':
      return { border: 'border-emerald-500/40', text: 'text-emerald-300', bg: 'bg-emerald-950/40', badge: 'bg-emerald-900/60 text-emerald-200' };
    case 'magnetic':
      return { border: 'border-blue-500/40', text: 'text-blue-300', bg: 'bg-blue-950/40', badge: 'bg-blue-900/60 text-blue-200' };
    default:
      return { border: 'border-amber-500/40', text: 'text-amber-300', bg: 'bg-amber-950/40', badge: 'bg-amber-900/60 text-amber-200' };
  }
}

const VictoryScoreCard: React.FC<VictoryScoreCardProps> = ({ landingScore, targetTimeSec }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const lastTickTimeRef = useRef(0);

  useEffect(() => {
    let start: number | null = null;
    let reqId: number;
    const duration = 2000; // 2.0s rolling count

    const delayTimer = window.setTimeout(() => {
      const frame = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min(1, elapsed / duration);
        // Smooth cubic ease-out for realistic slot reel deceleration
        const eased = 1 - Math.pow(1 - p, 3);
        setProgress(eased);

        // Slot machine sound tick
        const now = Date.now();
        const tickInterval = 35 + p * 65;
        if (now - lastTickTimeRef.current >= tickInterval) {
          lastTickTimeRef.current = now;
          const pitch = 0.8 + p * 0.5;
          sound.playScoreTick(pitch);
        }

        if (p < 1) {
          reqId = requestAnimationFrame(frame);
        } else {
          setProgress(1);
          setIsDone(true);
          sound.playScoreFinalChime();
        }
      };
      reqId = requestAnimationFrame(frame);
    }, 180);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(reqId);
    };
  }, [landingScore]);

  const handleSkip = () => {
    if (!isDone) {
      setProgress(1);
      setIsDone(true);
      sound.playScoreFinalChime();
    }
  };

  const softnessPts = Math.round(progress * (landingScore.softness * 10));
  const fuelPts = Math.round(progress * Math.round(landingScore.fuelRemaining * 3.5));
  const hullPct = landingScore.hullRemaining !== undefined ? landingScore.hullRemaining : 100;
  const hullBonus = landingScore.hullBonus !== undefined ? landingScore.hullBonus : Math.round(hullPct * 5.0);
  const hullPts = Math.round(progress * hullBonus);
  const cargoPts = landingScore.cargoBonus ? Math.round(progress * landingScore.cargoBonus) : 0;
  const vehiclePts = landingScore.vehicleBonus ? Math.round(progress * landingScore.vehicleBonus) : 0;
  const timeBonusPts = Math.round(progress * landingScore.timeBonus);
  const currentTotal = Math.round(progress * landingScore.total);
  const cargoDetails = landingScore.cargoDetails || [];

  return (
    <div
      onClick={handleSkip}
      title={!isDone ? 'Click to skip roll' : undefined}
      className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 sm:p-4 mb-4 space-y-2.5 font-mono text-xs text-left cursor-pointer select-none"
    >
      {/* Mission Flight Time */}
      <div className="flex justify-between items-center text-slate-300 pb-2 border-b border-slate-800">
        <span className="flex items-center gap-1.5 text-sky-300">
          <Clock className="w-3.5 h-3.5 text-sky-400" />
          Mission Flight Time:
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sky-200">
            {landingScore.timeTaken ?? 0}s
          </span>
          <span className="text-[10px] text-slate-400">
            (Target: {targetTimeSec}s)
          </span>
        </div>
      </div>

      {/* Landing Softness (Unboxed row) */}
      <div className="flex justify-between items-center text-slate-300">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Landing Softness ({landingScore.softness}%):
        </span>
        <span className="font-bold text-emerald-400">
          +{softnessPts.toLocaleString()} pts
        </span>
      </div>

      {/* Fuel Preserved (Unboxed row) */}
      <div className="flex justify-between items-center text-slate-300">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-teal-400" />
          Fuel Preserved ({Math.round(landingScore.fuelRemaining)} L):
        </span>
        <span className="font-bold text-teal-400">
          +{fuelPts.toLocaleString()} pts
        </span>
      </div>

      {/* Hull Integrity (Unboxed row) */}
      <div className="flex justify-between items-center text-slate-300">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Hull Integrity ({hullPct}%):
        </span>
        <span className="font-bold text-cyan-400">
          +{hullPts.toLocaleString()} pts
        </span>
      </div>

      {/* Vehicle & Rover Transport (Unboxed clean row) */}
      {landingScore.vehicleBonus !== undefined && landingScore.vehicleBonus > 0 && (
        <div className="flex justify-between items-center text-slate-300">
          <span className="flex items-center gap-1.5 text-sky-300">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            Vehicle & Rover Transport:
          </span>
          <span className="font-extrabold text-sky-400">
            +{vehiclePts.toLocaleString()} pts
          </span>
        </div>
      )}

      {/* Cargo Delivery Main Summary Row */}
      {landingScore.cargoBonus !== undefined && landingScore.cargoBonus > 0 && (
        <div className="flex justify-between items-center text-slate-300">
          <span className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Package className="w-3.5 h-3.5 text-amber-400" />
            Cargo Total Delivery:
          </span>
          <span className="font-extrabold text-amber-400">
            +{cargoPts.toLocaleString()} pts
          </span>
        </div>
      )}

      {/* Time Bonus (Unboxed row) */}
      <div className="flex justify-between items-center text-slate-300">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Time Bonus:
        </span>
        <span className="font-bold text-amber-400">
          +{timeBonusPts.toLocaleString()} pts
        </span>
      </div>

      {/* Detailed Cargo Status & Condition Breakdown Section */}
      {cargoDetails.length > 0 && (
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Package className="w-3 h-3 text-amber-400" />
              Cargo Manifest & Status
            </span>
            <span>Condition / Points</span>
          </div>

          <div className="space-y-1.5">
            {cargoDetails.map((cargo: any) => {
              const Icon = getCargoIcon(cargo.cargoType);
              const theme = getCargoTheme(cargo.cargoType);
              const earnedPts = Math.round(progress * cargo.finalScore);

              return (
                <div
                  key={cargo.id}
                  className={`p-2 rounded-lg border ${theme.border} ${theme.bg} flex flex-col gap-1 transition-colors`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon className={`w-3.5 h-3.5 ${theme.text} shrink-0`} />
                      <span className="font-bold text-slate-200 truncate text-[11px]">
                        {cargo.name}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-900/80 text-slate-400 border border-slate-700/60 shrink-0">
                        {cargo.mass}kg • {cargo.weightClass.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      {cargo.isDelivered ? (
                        <span className="font-bold text-amber-300 text-[11px]">
                          +{earnedPts.toLocaleString()} pts
                        </span>
                      ) : (
                        <span className="font-bold text-red-400 text-[10px]">
                          0 pts
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      {cargo.isDelivered ? (
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold ${
                            cargo.conditionMultiplier >= 1.15
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                              : cargo.conditionMultiplier >= 0.7
                              ? 'bg-sky-950 text-sky-300 border border-sky-500/40'
                              : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {cargo.conditionStatus}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-red-950 text-red-300 border border-red-500/40">
                          {cargo.conditionStatus}
                        </span>
                      )}
                    </div>

                    <span className="text-[9.5px] font-mono text-slate-400">
                      Base: {cargo.baseScore.toLocaleString()} × {cargo.conditionMultiplier.toFixed(2)}x
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Total Mission Score with Rolling Slot-Machine Counter */}
      <div className="border-t border-slate-800 pt-2.5 flex justify-between items-center text-sm font-bold">
        <span className="text-slate-100 flex items-center gap-1.5">
          <Trophy className={`w-4 h-4 ${isDone ? 'text-amber-400' : 'text-amber-400 animate-bounce'}`} />
          Total Mission Score:
        </span>
        <div className="flex items-center gap-2">
          {!isDone && (
            <span className="text-[10px] text-amber-400 font-bold animate-pulse tracking-wider">
              ROLLING...
            </span>
          )}
          <span
            className={`font-black font-mono text-xl sm:text-2xl transition-all duration-150 ${
              isDone
                ? 'text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.7)] scale-100'
                : 'text-amber-300 scale-105'
            }`}
          >
            {currentTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

interface MissionOverlaysProps {
  ship: ShipState;
  planet: PlanetConfig;
  onRestart: () => void;
  onNextPlanet: () => void;
  onMainMenu?: () => void;
  isHelpOpen: boolean;
  onToggleHelp: () => void;
  isCustomMap?: boolean;
  isTestFlight?: boolean;
  onReturnToEditor?: () => void;
  onOpenEditor?: () => void;
}

export const MissionOverlays: React.FC<MissionOverlaysProps> = ({
  ship,
  planet,
  onRestart,
  onNextPlanet,
  onMainMenu,
  isHelpOpen,
  onToggleHelp,
  isCustomMap = false,
  isTestFlight = false,
  onReturnToEditor,
  onOpenEditor,
}) => {
  const cleanPlanetTitle = (planet.name || 'Planet').replace(/\s*\(Custom Edition\)/gi, '').trim();
  const handleBackToEditor = onReturnToEditor || onOpenEditor;

  return (
    <>
      {/* 1. Mission Victory / Touchdown Dialog */}
      {ship.hasWon && ship.landingScore && (
        <div
          id="victory-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[88vh] sm:max-h-[92vh] overflow-y-auto bg-slate-950 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl text-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            
            {/* Mission Success Icon */}
            <div className="relative mb-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/90 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.35)]">
                <Trophy className="w-7 h-7 text-emerald-300" />
              </div>
              {ship.landingScore.isNewHighScore && !isTestFlight && (
                <span className="absolute -top-2 -right-3 bg-amber-500 text-slate-950 text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded-full shadow-md animate-bounce flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5" /> NEW BEST!
                </span>
              )}
            </div>

            {isTestFlight ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-mono text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>EDITOR TEST FLIGHT SUCCESS</span>
              </div>
            ) : (
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-widest mb-1">
                MISSION ACCOMPLISHED
              </span>
            )}

            <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-100 mb-4">
              Touchdown on {cleanPlanetTitle}
            </h2>

            {/* Score Breakdown with Unboxed Rows and Slot-Machine Rolling Tally */}
            <VictoryScoreCard
              landingScore={ship.landingScore}
              targetTimeSec={planet.targetTimeSec}
            />

            {/* Actions */}
            {isTestFlight ? (
              <div className="flex flex-col gap-2.5 w-full">
                <button
                  id="btn-victory-return-editor"
                  type="button"
                  onClick={handleBackToEditor}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-mono text-xs font-extrabold uppercase rounded-xl transition-all shadow-lg cursor-pointer active:scale-[0.98]"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Back to Map Editor</span>
                </button>

                <button
                  id="btn-victory-test-replay"
                  type="button"
                  onClick={onRestart}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 font-mono text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-sky-400" />
                  <span>Re-Fly Test Route [R]</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 w-full">
                <button
                  id="btn-victory-replay"
                  type="button"
                  onClick={onRestart}
                  className="flex items-center justify-center gap-1.5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-mono text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry
                </button>

                {onMainMenu ? (
                  <button
                    id="btn-victory-main-menu"
                    type="button"
                    onClick={onMainMenu}
                    className="flex items-center justify-center gap-1.5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-slate-100 font-mono text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-slate-400" />
                    Main Menu
                  </button>
                ) : null}

                <button
                  id="btn-victory-next"
                  type="button"
                  onClick={onNextPlanet}
                  className="col-span-2 flex items-center justify-center gap-1.5 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-lg cursor-pointer"
                >
                  Next Planet
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Crash / Impact Failure Dialog (Appears after 0.9s of debris animation) */}
      {ship.isCrashed && ship.crashTime >= 0.85 && (
        <div
          id="crash-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <div className="w-full max-w-md bg-slate-950 border border-red-500/50 rounded-2xl p-6 shadow-2xl text-slate-100 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border-2 border-red-400 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_20px_rgba(248,113,113,0.3)]">
              <AlertTriangle className="w-7 h-7" />
            </div>

            {isTestFlight ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 font-mono text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                <Sliders className="w-3.5 h-3.5 text-red-400" />
                <span>TEST FLIGHT IMPACT DETECTED</span>
              </div>
            ) : (
              <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-widest mb-1">
                VESSEL HULL BREACHED
              </span>
            )}

            <h2 className="text-xl font-bold font-mono text-slate-100 mb-2">
              {isTestFlight ? `Impact on ${cleanPlanetTitle}` : 'Mission Terminated'}
            </h2>

            <p className="text-xs font-mono text-red-300/90 bg-red-950/40 border border-red-900/60 px-3 py-2 rounded-lg mb-5 w-full">
              {ship.crashReason || 'Catastrophic collision with planetary terrain'}
            </p>

            <div className="flex flex-col gap-2.5 w-full">
              {isTestFlight ? (
                <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                  <button
                    id="btn-crash-return-editor"
                    type="button"
                    onClick={handleBackToEditor}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono text-xs font-extrabold uppercase rounded-xl transition-all shadow-lg cursor-pointer active:scale-[0.98]"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Back to Editor</span>
                  </button>

                  <button
                    id="btn-crash-retry"
                    type="button"
                    onClick={onRestart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-red-400" />
                    <span>Re-Deploy [SPACE]</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-2.5 w-full">
                  <button
                    id="btn-crash-retry"
                    type="button"
                    onClick={onRestart}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-400 text-slate-950 font-mono text-xs font-bold uppercase rounded-xl transition-colors shadow-lg cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Re-Deploy [SPACE]
                  </button>

                  {onMainMenu && (
                    <button
                      id="btn-crash-main-menu"
                      type="button"
                      onClick={onMainMenu}
                      className="px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-slate-100 font-mono text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Home className="w-4 h-4 text-slate-400" />
                      Main Menu
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. Flight Manual & Game Guide Modal */}
      <InstructionsModal isOpen={isHelpOpen} onClose={onToggleHelp} />
    </>
  );
};
