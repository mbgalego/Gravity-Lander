import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  Flame,
  Package,
  Truck,
  Navigation,
  Shield,
  Sliders,
  Keyboard,
  Smartphone,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Trophy,
  Zap,
  Star,
  Feather,
  Award,
  Bomb,
  Snowflake,
  Atom,
  Magnet,
  Radio,
} from 'lucide-react';
import { ACHIEVEMENTS, getUnlockedAchievements } from '../utils/achievements';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame?: () => void;
  initialTab?: 'controls' | 'physics' | 'logistics' | 'thresholds' | 'milestones';
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartGame,
  initialTab = 'controls',
}) => {
  const [activeTab, setActiveTab] = useState<'controls' | 'physics' | 'logistics' | 'thresholds' | 'milestones'>(initialTab);
  const [controlDevice, setControlDevice] = useState<'pc' | 'mobile'>('pc');

  const unlocked = getUnlockedAchievements();
  const unlockedCount = Object.keys(unlocked).length;
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;

  if (!isOpen) return null;

  return (
    <div
      id="instructions-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="instructions-modal-dialog"
        className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl text-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 sm:px-6 py-3.5 sm:py-4 shrink-0 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Compass className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="font-mono font-bold text-sm sm:text-base text-slate-100 uppercase tracking-wide flex items-center gap-2">
                <span>FLIGHT INSTRUCTIONS & CONTROLS</span>
                <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-300 hidden sm:inline">
                  OFFICIAL PILOT MANUAL
                </span>
              </h2>
              <p className="text-[11px] font-mono text-slate-400 hidden xs:block">
                Master dual-nozzle thrust physics, keyboard & touch controls, and payload logistics
              </p>
            </div>
          </div>
          <button
            id="btn-close-instructions"
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
            title="Close Instructions [ESC]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-900/80 border-b border-slate-800 overflow-x-auto shrink-0 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('controls')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer font-bold ${
              activeTab === 'controls'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>1. CONTROLS & DIAGRAMS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('physics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer font-bold ${
              activeTab === 'physics'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>2. FLIGHT PHYSICS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logistics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer font-bold ${
              activeTab === 'logistics'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>3. CARGO & ROVERS</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('thresholds')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer font-bold ${
              activeTab === 'thresholds'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>4. TOUCHDOWN & NAVIGATION</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('milestones')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap cursor-pointer font-bold ${
              activeTab === 'milestones'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>5. MILESTONES ({unlockedCount}/{totalAchievements})</span>
          </button>
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-5 text-xs font-mono text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* TAB 1: CONTROLS & SCHEMATICS */}
          {activeTab === 'controls' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Device Selector Sub-toggle (PC Keyboard vs Mobile Phone) */}
              <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-1.5 rounded-2xl">
                <div className="text-[11px] font-bold text-slate-300 px-2.5 flex items-center gap-1.5">
                  <span>SELECT CONTROLLER DIAGRAM:</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setControlDevice('pc')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      controlDevice === 'pc'
                        ? 'bg-sky-500 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    <span>PC KEYBOARD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setControlDevice('mobile')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      controlDevice === 'mobile'
                        ? 'bg-teal-400 text-slate-950 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>MOBILE / TOUCH</span>
                  </button>
                </div>
              </div>

              {/* PC KEYBOARD DIAGRAM */}
              {controlDevice === 'pc' && (
                <div className="space-y-4">
                  {/* Keyboard Visual Card */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Keyboard className="w-4 h-4 text-sky-400" />
                        <span className="font-bold text-slate-100 text-sm">DESKTOP / LAPTOP KEYBOARD MAPPING</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">WASD or Arrow Keys</span>
                    </div>

                    {/* Visual Keyboards Rendering */}
                    <div className="flex flex-col items-center justify-center gap-3 py-2">
                      {/* Main Thrusters Row: [A] & [D] Keys + Arrows */}
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Primary WASD Controls Block */}
                        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center space-y-3">
                          <span className="text-[10px] font-bold text-sky-400 tracking-wider">PRIMARY FLIGHT KEYS (WASD)</span>
                          
                          {/* WASD Cluster Mockup */}
                          <div className="inline-flex flex-col items-center gap-1.5">
                            {/* Top W key */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/80 flex flex-col items-center justify-center text-emerald-300 font-bold shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                                <span className="text-sm sm:text-base">W</span>
                                <span className="text-[8px] text-emerald-400">BOTH</span>
                              </div>
                            </div>

                            {/* Bottom A, S, D keys */}
                            <div className="flex items-center gap-1.5">
                              {/* [A] Key */}
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-950/80 border-2 border-sky-400 flex flex-col items-center justify-center text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-2 ring-sky-400/30">
                                <span className="text-sm sm:text-base">A</span>
                                <span className="text-[8px] text-sky-300">LEFT</span>
                              </div>

                              {/* [S] Key (Inactive) */}
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/60 border border-slate-700 flex flex-col items-center justify-center text-slate-500 font-bold">
                                <span className="text-sm sm:text-base">S</span>
                                <span className="text-[8px] text-slate-600">--</span>
                              </div>

                              {/* [D] Key */}
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-950/80 border-2 border-sky-400 flex flex-col items-center justify-center text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] ring-2 ring-sky-400/30">
                                <span className="text-sm sm:text-base">D</span>
                                <span className="text-[8px] text-sky-300">RIGHT</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 leading-tight">
                            Hold <strong className="text-sky-300">[A]</strong> to tilt right • Hold <strong className="text-sky-300">[D]</strong> to tilt left • Hold <strong className="text-emerald-300">[A]+[D]</strong> or <strong className="text-emerald-300">[W]</strong> for full lift
                          </p>
                        </div>

                        {/* Alternate Arrow Keys Block */}
                        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center space-y-3">
                          <span className="text-[10px] font-bold text-teal-400 tracking-wider">ARROW KEYS EQUIVALENT</span>
                          
                          {/* Arrow Cluster Mockup */}
                          <div className="inline-flex flex-col items-center gap-1.5">
                            {/* Up Arrow */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/80 flex flex-col items-center justify-center text-emerald-300 font-bold shadow-[0_0_12px_rgba(52,211,153,0.25)]">
                                <span className="text-sm sm:text-base">▲</span>
                                <span className="text-[8px] text-emerald-400">LIFT</span>
                              </div>
                            </div>

                            {/* Left, Down, Right */}
                            <div className="flex items-center gap-1.5">
                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-950/80 border-2 border-sky-400 flex flex-col items-center justify-center text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                <span className="text-sm sm:text-base">◄</span>
                                <span className="text-[8px] text-sky-300">LEFT</span>
                              </div>

                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-slate-900/60 border border-slate-700 flex flex-col items-center justify-center text-slate-500 font-bold">
                                <span className="text-sm sm:text-base">▼</span>
                                <span className="text-[8px] text-slate-600">--</span>
                              </div>

                              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-950/80 border-2 border-sky-400 flex flex-col items-center justify-center text-sky-200 font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                                <span className="text-sm sm:text-base">►</span>
                                <span className="text-[8px] text-sky-300">RIGHT</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[10px] text-slate-400 leading-tight">
                            Arrow keys perform the identical dual thruster thrust & rotation physics
                          </p>
                        </div>

                      </div>

                      {/* Action Keys Row: [P], [H], [R], [SPACE], [ESC] */}
                      <div className="w-full grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-sky-500/30 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-sky-950/80 border border-sky-400 flex items-center justify-center font-bold text-sky-300 text-sm shrink-0">
                            P
                          </div>
                          <div className="min-w-0">
                            <span className="text-sky-300 font-bold text-[11px] block">PLANETS</span>
                            <span className="text-[9px] text-slate-400">Expedition catalog</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-purple-500/30 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-400 flex items-center justify-center font-bold text-purple-300 text-sm shrink-0">
                            H
                          </div>
                          <div className="min-w-0">
                            <span className="text-purple-300 font-bold text-[11px] block">CRAFTS</span>
                            <span className="text-[9px] text-slate-400">Fleet hangar</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-rose-500/30 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-400 flex items-center justify-center font-bold text-rose-300 text-sm shrink-0">
                            R
                          </div>
                          <div className="min-w-0">
                            <span className="text-rose-300 font-bold text-[11px] block">RESTART</span>
                            <span className="text-[9px] text-slate-400">Instant reload</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-400 flex items-center justify-center font-bold text-emerald-300 text-[10px] shrink-0">
                            SPACE
                          </div>
                          <div className="min-w-0">
                            <span className="text-emerald-300 font-bold text-[11px] block">RE-DEPLOY</span>
                            <span className="text-[9px] text-slate-400">Respawn craft</span>
                          </div>
                        </div>

                        <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-700/80 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-600 flex items-center justify-center font-bold text-slate-200 text-xs shrink-0">
                            ESC
                          </div>
                          <div className="min-w-0">
                            <span className="text-slate-300 font-bold text-[11px] block">PAUSE</span>
                            <span className="text-[9px] text-slate-400">Settings & audio</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* MOBILE / TOUCH SPLIT-SCREEN DIAGRAM */}
              {controlDevice === 'mobile' && (
                <div className="space-y-4">
                  {/* Phone Bezel Landscape Mockup Card */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-teal-400" />
                        <span className="font-bold text-slate-100 text-sm">MOBILE SPLIT-SCREEN TOUCH CONTROLS</span>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono font-bold">50% / 50% Touch Surface</span>
                    </div>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      On smartphones and tablets, the entire screen acts as an invisible, highly responsive dual-zone touch controller:
                    </p>

                    {/* Smartphone Landscape Frame Mockup */}
                    <div className="w-full max-w-xl mx-auto p-2.5 sm:p-3 bg-slate-950 border-2 border-slate-700 rounded-3xl shadow-2xl relative select-none">
                      
                      {/* Camera notch / Speaker earbud */}
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-slate-800 rounded-full hidden sm:block" />

                      {/* Screen Area (Split Screen) */}
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden relative grid grid-cols-2">
                        
                        {/* LEFT 50% TOUCH ZONE */}
                        <div className="h-full bg-gradient-to-br from-sky-950/40 via-sky-900/20 to-transparent border-r border-dashed border-sky-400/40 p-3 sm:p-4 flex flex-col justify-between items-center text-center relative group">
                          
                          {/* Zone Header */}
                          <div className="w-full flex items-center justify-between">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300">
                              LEFT ZONE (50%)
                            </span>
                            <span className="text-[10px] text-sky-400 font-bold">TOUCH ANYWHERE</span>
                          </div>

                          {/* Left Thruster Action Graphic */}
                          <div className="my-auto flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.4)] animate-pulse mb-1.5">
                              <Flame className="w-6 h-6 text-sky-400 rotate-180" />
                            </div>
                            <span className="font-bold text-xs text-white">FIRES LEFT THRUSTER</span>
                            <span className="text-[9px] text-sky-300 font-sans">Craft Banks Right ↷ + Diagonal Lift</span>
                          </div>

                          {/* Touch Instruction */}
                          <div className="text-[9px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/5">
                            Tap or hold left thumb
                          </div>
                        </div>

                        {/* RIGHT 50% TOUCH ZONE */}
                        <div className="h-full bg-gradient-to-bl from-sky-950/40 via-sky-900/20 to-transparent p-3 sm:p-4 flex flex-col justify-between items-center text-center relative group">
                          
                          {/* Zone Header */}
                          <div className="w-full flex items-center justify-between">
                            <span className="text-[10px] text-sky-400 font-bold">TOUCH ANYWHERE</span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300">
                              RIGHT ZONE (50%)
                            </span>
                          </div>

                          {/* Right Thruster Action Graphic */}
                          <div className="my-auto flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.4)] animate-pulse mb-1.5">
                              <Flame className="w-6 h-6 text-sky-400 rotate-180" />
                            </div>
                            <span className="font-bold text-xs text-white">FIRES RIGHT THRUSTER</span>
                            <span className="text-[9px] text-sky-300 font-sans">Craft Banks Left ↶ + Diagonal Lift</span>
                          </div>

                          {/* Touch Instruction */}
                          <div className="text-[9px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/5">
                            Tap or hold right thumb
                          </div>
                        </div>

                        {/* Dual Touch Indicator Banner (Floating in Center) */}
                        <div className="absolute inset-x-4 bottom-2 bg-slate-950/95 border border-emerald-400/60 rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] shadow-lg">
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            DUAL-TOUCH (BOTH THUMBS):
                          </span>
                          <span className="text-white font-bold font-sans">
                            Fires Both Nozzles for Maximum Upward Lift ⇡
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Touch Tips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-1">
                        <strong className="text-teal-300 block">Touch Anywhere:</strong>
                        <p className="text-slate-400">You do not need to target specific on-screen buttons. Touching anywhere on the left or right half activates the corresponding rocket nozzle.</p>
                      </div>
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-1">
                        <strong className="text-teal-300 block">Rhythmic Feathering:</strong>
                        <p className="text-slate-400">Alternate quick thumb taps on left and right sides to stabilize your roll angle during turbulent descents.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FLIGHT PHYSICS & MOMENTUM */}
          {activeTab === 'physics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase">
                  <Flame className="w-4 h-4 text-sky-400" />
                  <span>PURE NEWTONIAN FLIGHT DYNAMICS</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Gravity Lander simulates authentic lunar-style momentum physics. There is no artificial drag or auto-braking in zero or thin atmospheres.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-sky-300 font-bold block flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                      Inertial Rotation:
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Firing one thruster causes the ship to rotate continuously. To stop rotating, you must fire the opposite thruster for an equal duration to cancel rotational momentum.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-emerald-300 font-bold block flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-emerald-400" />
                      Gravity & Ascent:
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Planets have distinct gravity constants (from Luna 1.62 m/s² up to high-gravity worlds). Monitor your vertical speed gauge on the HUD at all times.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-amber-300 font-bold block flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Atmospheric Resistance:
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Worlds like Titan feature dense atmospheres that slow your fall with aerodynamic drag, while vacuum moons offer zero air resistance.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-white/5 space-y-1.5">
                    <span className="text-purple-300 font-bold block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      Fuel Conservation:
                    </span>
                    <p className="text-slate-400 leading-relaxed">
                      Each second of thruster burn consumes fuel. Collect floating blue fuel pods throughout cavern shafts to replenish your tanks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CARGO & ROVER LOGISTICS */}
          {activeTab === 'logistics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Winch & Tether Mechanics */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>ELECTROMAGNETIC WINCH & TETHER DYNAMICS</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Industrial vaults and cargo stations contain valuable supply containers waiting for planetary extraction:
                </p>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-amber-300 font-bold">1. Electromagnetic Winch Hook:</span>
                    <p className="text-slate-400">Hover steadily 30m–80m directly above a cargo container on a depot to automatically latch your electromagnetic winch cable.</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-amber-300 font-bold">2. Dynamic Pendulum Swing & Mass:</span>
                    <p className="text-slate-400">Attached containers swing realistically on a tether, shifting your craft&apos;s center of gravity. Counter-steer smoothly when banking through narrow shafts.</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-amber-300 font-bold">3. Destination LZ Delivery:</span>
                    <p className="text-slate-400">Transport the container all the way to the final Landing Zone (LZ) and touchdown safely for a massive <strong className="text-amber-300">+5,000 pts</strong> mission bonus!</p>
                  </div>
                </div>
              </div>

              {/* 6 Specialized Cargo Classes */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>SPECIALIZED HAZARDOUS CARGO CLASSIFICATIONS</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Each payload class possesses unique behavioral properties and hazards:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  {/* Standard */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-amber-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Package className="w-3.5 h-3.5" />
                      <span>Standard Titanium Crate (140-650kg)</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      Reinforced mineral freight. Stable in flight with predictable pendulum oscillation.
                    </p>
                  </div>

                  {/* Explosive */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-orange-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-orange-400 font-bold">
                      <Bomb className="w-3.5 h-3.5" />
                      <span>Volatile Explosive Munitions</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      Highly sensitive to kinetic shock. If the container slams violently into rock walls, it detonates in a devastating fireball!
                    </p>
                  </div>

                  {/* Cryogenic */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-sky-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-sky-300 font-bold">
                      <Snowflake className="w-3.5 h-3.5" />
                      <span>Sub-Zero Cryo Superconductor</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      Venting freezing vapor trails. Requires gentle maneuvering to prevent thermal containment breach.
                    </p>
                  </div>

                  {/* Quantum Isotope */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-purple-500/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                      <Atom className="w-3.5 h-3.5" />
                      <span>Quantum Fission Isotope</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      Glows with Cherenkov radiation. Emits particle halos that challenge navigation instruments in pitch darkness.
                    </p>
                  </div>

                  {/* Magnetic */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-amber-600/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                      <Magnet className="w-3.5 h-3.5" />
                      <span>Super-Dense Magnetic Dynamo</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">
                      Dense mass ballast that exerts magnetic drag against ferrous rock strata, dampening pendulum swings.
                    </p>
                  </div>

                  {/* Plasma Volta with EMP */}
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-emerald-500/40 space-y-1 bg-emerald-950/20">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>High-Voltage Plasma Volta Battery</span>
                    </div>
                    <p className="text-slate-300 text-[10px]">
                      Surges with voltaic arcing. Periodically discharges a randomized EMP blast that temporarily disables flight thruster controls for <strong className="text-emerald-400">0.5s to 2.0s</strong>! Prepare to glide on inertia!
                    </p>
                  </div>
                </div>
              </div>

              {/* Rover Vehicles */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase">
                  <Truck className="w-4 h-4 text-teal-400" />
                  <span>SURFACE VEHICLES & ROVER LOGISTICS</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Automated Goliath exploration rovers station at vehicle depots:
                </p>

                <div className="space-y-2 text-[11px] text-slate-300">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-teal-300 font-bold">1. Vehicle Depot Docking:</span>
                    <p className="text-slate-400">Touch down gently on a Vehicle Depot platform. The rover will automatically drive into your ship&apos;s internal transport bay.</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-teal-300 font-bold">2. Payload Mass (+600kg):</span>
                    <p className="text-slate-400">Loaded rovers add mass, requiring slightly more thruster throttle to climb vertical cave chimneys.</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 space-y-1">
                    <span className="text-teal-300 font-bold">3. Destination Offload (+15,000 pts):</span>
                    <p className="text-slate-400">Deliver the rover safely to the destination LZ pad to complete the vehicle logistics contract.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TOUCHDOWN LIMITS, VOLCANOES & SIGNPOSTS */}
          {activeTab === 'thresholds' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Safe Landing Thresholds */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>SAFE TOUCHDOWN SAFETY CRITERIA</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Your landing gear sensors monitor three critical telemetry limits upon touching down on the Landing Zone (LZ):
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/40">
                    <span className="text-slate-400 text-[10px] block mb-1">VERTICAL DESCENT RATE</span>
                    <strong className="text-emerald-400 text-sm font-mono">&le; 8.5 m/s</strong>
                    <span className="text-[9px] text-slate-500 block mt-1">Soft landing target</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/40">
                    <span className="text-slate-400 text-[10px] block mb-1">LATERAL DRIFT SPEED</span>
                    <strong className="text-emerald-400 text-sm font-mono">&le; 5.5 m/s</strong>
                    <span className="text-[9px] text-slate-500 block mt-1">Prevents landing gear snap</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/40">
                    <span className="text-slate-400 text-[10px] block mb-1">ATTITUDE TILT ANGLE</span>
                    <strong className="text-emerald-400 text-sm font-mono">&le; &plusmn;36.0&deg;</strong>
                    <span className="text-[9px] text-slate-500 block mt-1">Level upright orientation</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2.5 bg-emerald-950/30 rounded-xl border border-emerald-500/30 text-[11px] text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>On-screen HUD gauges glow <strong>GREEN</strong> when all values are within safe touchdown limits!</span>
                </div>
              </div>

              {/* Active Volcanoes Hazard */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <span>ACTIVE VOLCANIC CALDERAS & ERUPTION PLUMES</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Planetary calderas erupt in rhythmic cycles, threatening low-flying exploration craft:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-500/30 space-y-1">
                    <strong className="text-rose-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Thermal Blast Plume
                    </strong>
                    <p className="text-slate-400 text-[10px]">
                      Vertical columns of superheated gas and plasma disintegrate ships on contact. Time your flight across caldera vents during quiescent rest phases.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-amber-500/30 space-y-1">
                    <strong className="text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Ballistic Rock Ejecta
                    </strong>
                    <p className="text-slate-400 text-[10px]">
                      Eruptions propel fiery volcanic debris high into the air that arch through gravity and rebound off subterranean cave ceilings.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-purple-500/30 space-y-1">
                    <strong className="text-purple-400 flex items-center gap-1">
                      <Radio className="w-3.5 h-3.5" /> Caldera Variations
                    </strong>
                    <p className="text-slate-400 text-[10px]">
                      Encounter Magma (Incandescent Red/Orange), Plasma (Cyan/Violet), Toxic (Emerald), and Cryo (Sub-Zero Frost) geothermal calderas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Directional Signposts */}
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm uppercase">
                  <Navigation className="w-4 h-4 text-sky-400" />
                  <span>DIRECTIONAL SIGNPOST NAVIGATION</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Luminescent directional signposts mark cavern forks and elevator shafts:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-emerald-500/30 space-y-1">
                    <strong className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> GREEN SIGNS
                    </strong>
                    <p className="text-slate-400 text-[10px]">Points to the final Destination Landing Zone (LZ).</p>
                  </div>

                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-amber-500/30 space-y-1">
                    <strong className="text-amber-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> AMBER SIGNS
                    </strong>
                    <p className="text-slate-400 text-[10px]">Directs you to supply pod vaults and cargo containers.</p>
                  </div>

                  <div className="p-2.5 bg-slate-950/60 rounded-xl border border-sky-500/30 space-y-1">
                    <strong className="text-sky-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400" /> BLUE SIGNS
                    </strong>
                    <p className="text-slate-400 text-[10px]">Directs you to vehicle and rover staging depots.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: MILESTONES & EXPEDITION ACHIEVEMENTS */}
          {activeTab === 'milestones' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>EXPEDITION MILESTONES & PILOT ACHIEVEMENTS</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40">
                    {unlockedCount} / {totalAchievements} COMPLETED
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Earn milestone honors during flight expeditions. Achievements trigger real-time telemetry toasts and record permanently to your flight log:
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.values(ACHIEVEMENTS).map((ach) => {
                  const isAchUnlocked = !!unlocked[ach.id];
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isAchUnlocked
                          ? 'bg-slate-900/90 border-amber-400/40 shadow-lg shadow-amber-500/10'
                          : 'bg-slate-950/60 border-slate-800/80 opacity-75'
                      } flex items-start gap-3`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center border ${
                          isAchUnlocked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                            : 'bg-slate-800/80 text-slate-500 border-slate-700'
                        }`}
                      >
                        {isAchUnlocked ? (
                          <CheckCircle2 className="w-5 h-5 text-amber-400" />
                        ) : (
                          <Trophy className="w-4 h-4 text-slate-500" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4
                            className={`font-mono font-bold text-xs sm:text-sm truncate ${
                              isAchUnlocked ? 'text-slate-100' : 'text-slate-400'
                            }`}
                          >
                            {ach.title}
                          </h4>
                          <span
                            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full border ${
                              isAchUnlocked
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-900 text-slate-500 border-slate-700'
                            }`}
                          >
                            {isAchUnlocked ? 'UNLOCKED' : 'LOCKED'}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-400 font-sans leading-tight">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 px-4 sm:px-6 py-3 shrink-0 bg-slate-900/70">
          <div className="text-[10px] text-slate-400 font-mono hidden sm:block">
            Press <strong className="text-slate-200">[ESC]</strong> to dismiss
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
            {onStartGame && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartGame();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-lg cursor-pointer"
              >
                <span>Launch Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono font-bold text-xs uppercase rounded-xl transition-colors cursor-pointer border border-slate-700"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
