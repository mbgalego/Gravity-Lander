import React, { useState } from 'react';
import { PlanetConfig, ShipModelId, ShipState, WorldMap } from '../types';
import { useFullscreen } from '../utils/fullscreen';
import { PlanetGraphic } from './PlanetGraphic';
import { VersionHistoryModal } from './VersionHistoryModal';
import { CURRENT_GAME_VERSION } from '../utils/versionHistory';
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Compass,
  Rocket,
  Map,
  HelpCircle,
  BookOpen,
  Home,
  Bug,
  X,
  Play,
  Shield,
  Zap,
  Flame,
  ChevronDown,
  ChevronUp,
  Sliders,
  History,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planet: PlanetConfig;
  ship: ShipState;
  world: WorldMap;
  isMuted: boolean;
  onToggleMute: () => void;
  onRestart: () => void;
  onOpenPlanets: () => void;
  onOpenShips: () => void;
  onOpenEditor?: () => void;
  onOpenHelp: () => void;
  onReturnToMenu: () => void;
  showDebug: boolean;
  onToggleDebug: () => void;
  isCustomMap?: boolean;
  isTestFlight?: boolean;
  onReturnToEditor?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  planet,
  ship,
  world,
  isMuted,
  onToggleMute,
  onRestart,
  onOpenPlanets,
  onOpenShips,
  onOpenEditor,
  onOpenHelp,
  onReturnToMenu,
  showDebug,
  onToggleDebug,
  isCustomMap = false,
  isTestFlight = false,
  onReturnToEditor,
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const [isDebugSectionOpen, setIsDebugSectionOpen] = useState(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleExit = () => {
    onClose();
    if (isTestFlight) {
      if (onReturnToEditor) onReturnToEditor();
      else if (onOpenEditor) onOpenEditor();
      else onReturnToMenu();
    } else {
      onReturnToMenu();
    }
  };

  return (
    <div
      id="settings-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="w-full max-w-lg bg-slate-950/95 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-left my-auto backdrop-blur-2xl text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <PlanetGraphic planet={planet} size={30} showGlow={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  MISSION SETTINGS & PAUSE
                </h2>
                {isTestFlight && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/90 border border-amber-500/80 text-amber-300">
                    TEST FLIGHT
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {planet.name} • {planet.gravity.toFixed(2)} g
              </span>
            </div>
          </div>
          <button
            id="btn-close-settings"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Flight Controls */}
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <button
            id="btn-settings-resume"
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-teal-400 text-slate-950 font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer hover:from-sky-400 hover:to-teal-300"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>RESUME</span>
          </button>

          <button
            id="btn-settings-restart"
            type="button"
            onClick={() => {
              onClose();
              onRestart();
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-sky-400" />
            <span>RESTART [R]</span>
          </button>
        </div>

        {/* Navigation & Selectors */}
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            EXPEDITION NAVIGATION
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-settings-planets"
              type="button"
              onClick={() => {
                onClose();
                onOpenPlanets();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Change Planet</span>
            </button>

            <button
              id="btn-settings-ships"
              type="button"
              onClick={() => {
                onClose();
                onOpenShips();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4 text-purple-400" />
              <span>Change Spacecraft</span>
            </button>

            {onOpenEditor && (
              <button
                id="btn-settings-editor"
                type="button"
                onClick={() => {
                  onClose();
                  onOpenEditor();
                }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
              >
                <Map className="w-4 h-4 text-teal-400" />
                <span>{isCustomMap || isTestFlight ? 'Edit Custom Map' : 'Level Editor'}</span>
              </button>
            )}

            <button
              id="btn-settings-help"
              type="button"
              onClick={() => {
                onClose();
                onOpenHelp();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Flight Instructions</span>
            </button>
          </div>
        </div>

        {/* Audio & Display Preferences */}
        <div className="space-y-1.5 font-mono text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            AUDIO & DISPLAY
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="btn-settings-toggle-mute"
              type="button"
              onClick={onToggleMute}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                <span>Sound FX & Music</span>
              </div>
              <span className={`text-[10px] font-bold ${isMuted ? 'text-red-400' : 'text-emerald-400'}`}>
                {isMuted ? 'OFF' : 'ON'}
              </span>
            </button>

            <button
              id="btn-settings-toggle-fullscreen"
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 text-slate-200 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {isFullscreen ? <Minimize className="w-4 h-4 text-sky-400" /> : <Maximize className="w-4 h-4 text-slate-300" />}
                <span>Fullscreen View</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">
                {isFullscreen ? 'ACTIVE' : 'TOGGLE'}
              </span>
            </button>
          </div>
        </div>

        {/* Special Collapsible Debug & Diagnostics Section */}
        <div className="border border-white/10 rounded-2xl bg-slate-900/30 overflow-hidden">
          <button
            id="btn-toggle-debug-accordion"
            type="button"
            onClick={() => setIsDebugSectionOpen(!isDebugSectionOpen)}
            className="w-full flex items-center justify-between p-3 text-left font-mono text-xs text-amber-300/90 hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-amber-400" />
              <span className="font-bold">DEVELOPER DEBUG & DIAGNOSTICS</span>
            </div>
            {isDebugSectionOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {isDebugSectionOpen && (
            <div className="p-3 pt-0 border-t border-white/5 space-y-2 text-[11px] font-mono text-slate-300">
              <div className="flex items-center justify-between py-1">
                <span>Real-Time Overlay HUD:</span>
                <button
                  type="button"
                  onClick={onToggleDebug}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    showDebug
                      ? 'bg-amber-400 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {showDebug ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>

              <div className="p-2.5 bg-slate-950/70 rounded-xl border border-white/5 space-y-1 text-[10px] text-slate-400">
                <div>Pos: ({ship.pos.x.toFixed(1)}, {ship.pos.y.toFixed(1)}) | Vel: ({ship.vel.x.toFixed(2)}, {ship.vel.y.toFixed(2)})</div>
                <div>Angle: {((ship.angle * 180) / Math.PI).toFixed(1)}° | Fuel: {ship.fuel.toFixed(1)} / {ship.maxFuel}</div>
                <div>World: {world.width} x {world.height}m | Gravity: {planet.gravity}g</div>
              </div>
            </div>
          )}
        </div>

        {/* Exit to Main Menu or Editor */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2 justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              id="btn-settings-exit-menu"
              type="button"
              onClick={handleExit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
            >
              {isTestFlight ? (
                <>
                  <Sliders className="w-3.5 h-3.5 text-sky-400" />
                  <span>Return to Editor</span>
                </>
              ) : (
                <>
                  <Home className="w-3.5 h-3.5 text-sky-400" />
                  <span>Main Menu</span>
                </>
              )}
            </button>

            <button
              id="btn-settings-version-history"
              type="button"
              onClick={() => setIsVersionModalOpen(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-400 hover:text-sky-300 font-mono text-xs transition-colors cursor-pointer"
              title="View Version History & Changelog"
            >
              <History className="w-3.5 h-3.5 text-sky-400" />
              <span>{CURRENT_GAME_VERSION}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/50 text-sky-300 font-mono font-bold text-xs transition-colors cursor-pointer"
          >
            Back to Flight
          </button>
        </div>

      </div>

      {/* Interactive Version History Modal */}
      <VersionHistoryModal
        isOpen={isVersionModalOpen}
        onClose={() => setIsVersionModalOpen(false)}
      />
    </div>
  );
};
