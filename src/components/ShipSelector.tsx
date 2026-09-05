import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShipModelId, ShipModelConfig } from '../types';
import { SHIP_MODELS } from '../game/ships';
import { sound } from '../game/sound';
import { ShipGraphic } from './ShipGraphic';
import {
  Shield,
  Zap,
  Flame,
  Rocket,
  ChevronLeft,
  ChevronRight,
  X,
  Truck,
  Check,
  Info,
  Layers,
  Search,
  Gauge,
  Maximize2,
} from 'lucide-react';

interface ShipSelectorProps {
  selectedModelId: ShipModelId;
  onSelectModel: (modelId: ShipModelId) => void;
  onClose?: () => void;
  isModal?: boolean;
  onOpenModal?: () => void;
}

export const ShipSelector: React.FC<ShipSelectorProps> = ({
  selectedModelId,
  onSelectModel,
  onClose,
  isModal = false,
  onOpenModal,
}) => {
  // Modal State
  const [modalTab, setModalTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Inline Carousel State
  const currentIndex = Math.max(
    0,
    SHIP_MODELS.findIndex((s) => s.id === selectedModelId)
  );
  const [activeIndex, setActiveIndex] = useState<number>(currentIndex);
  const [direction, setDirection] = useState<number>(1);
  const [showDescPopup, setShowDescPopup] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Modal ESC handler
  useEffect(() => {
    if (!isModal || !onClose) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, onClose]);

  // Filtered ships for modal view
  const filteredShips = useMemo(() => {
    return SHIP_MODELS.filter((ship) => {
      const matchesTab =
        modalTab === 'all' ||
        ship.classType.toLowerCase().includes(modalTab.toLowerCase()) ||
        (modalTab === 'rover' && (ship.canCarryVehicles || ship.isHeavyVehicleCarrier));

      const matchesSearch =
        !searchQuery ||
        ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.classType.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [modalTab, searchQuery]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return {
      all: SHIP_MODELS.length,
      recon: SHIP_MODELS.filter((s) => s.classType.includes('Recon')).length,
      explorer: SHIP_MODELS.filter((s) => s.classType.includes('Explorer')).length,
      transport: SHIP_MODELS.filter((s) => s.classType.includes('Transport')).length,
      rover: SHIP_MODELS.filter((s) => s.canCarryVehicles || s.isHeavyVehicleCarrier).length,
    };
  }, []);

  // =========================================================================
  // 1. FULL PLANET-STYLE MODAL CATALOGUE VIEW
  // =========================================================================
  if (isModal) {
    return (
      <div
        id="ship-selector-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="w-full max-w-3xl bg-slate-950/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] backdrop-blur-2xl text-slate-100 relative my-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-slate-900/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-100 font-mono tracking-wide">
                  SPACECRAFT HANGAR & FLEET CATALOG
                </h2>
                <p className="text-[10px] sm:text-xs font-mono text-slate-400 hidden xs:block">
                  Select a lander chassis optimized for agility, cargo payload, or gravity resistance
                </p>
              </div>
            </div>
            {onClose && (
              <button
                id="btn-close-ship-modal"
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors cursor-pointer border border-transparent hover:border-slate-700"
                title="Close Catalog [ESC]"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filter & Category Tab Switcher - Pill Shaped matching PlanetSelector */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/60 px-4 sm:px-6 py-2.5 gap-2 overflow-x-auto shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
              <button
                id="tab-ship-all"
                type="button"
                onClick={() => setModalTab('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'all'
                    ? 'bg-purple-500/20 border border-purple-400/70 text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                All Fleet ({tabCounts.all})
              </button>

              <button
                id="tab-ship-recon"
                type="button"
                onClick={() => setModalTab('Recon')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'Recon'
                    ? 'bg-purple-500/20 border border-purple-400/70 text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Zap className="w-3 h-3 text-rose-400" />
                Small Recon ({tabCounts.recon})
              </button>

              <button
                id="tab-ship-explorer"
                type="button"
                onClick={() => setModalTab('Explorer')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'Explorer'
                    ? 'bg-purple-500/20 border border-purple-400/70 text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Rocket className="w-3 h-3 text-sky-400" />
                Medium Explorer ({tabCounts.explorer})
              </button>

              <button
                id="tab-ship-transport"
                type="button"
                onClick={() => setModalTab('Transport')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'Transport'
                    ? 'bg-purple-500/20 border border-purple-400/70 text-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.25)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Shield className="w-3 h-3 text-amber-400" />
                Heavy Transport ({tabCounts.transport})
              </button>

              <button
                id="tab-ship-rover"
                type="button"
                onClick={() => setModalTab('rover')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  modalTab === 'rover'
                    ? 'bg-emerald-500/20 border border-emerald-400/70 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
                    : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Truck className="w-3 h-3 text-emerald-400" />
                Rover Bay ({tabCounts.rover})
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative hidden md:block w-40 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search fleet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 bg-slate-900/80 border border-white/10 rounded-full text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          </div>

          {/* Grid of Ship Cards */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {filteredShips.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-white/15 rounded-2xl bg-slate-900/20 text-slate-400 font-mono text-xs">
                No spacecraft models found matching "{searchQuery}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredShips.map((ship) => {
                  const isSelected = selectedModelId === ship.id;

                  return (
                    <button
                      key={ship.id}
                      id={`ship-card-${ship.id}`}
                      type="button"
                      onClick={() => {
                        onSelectModel(ship.id);
                        sound.playLandingChime();
                        if (onClose) onClose();
                      }}
                      className={`group flex items-start gap-3.5 text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 text-slate-200 relative cursor-pointer backdrop-blur-xl ${
                        isSelected
                          ? 'border-purple-400 bg-purple-950/30 shadow-[0_0_24px_rgba(192,132,252,0.25)] ring-1 ring-purple-400/50'
                          : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/70 hover:border-purple-400/40'
                      }`}
                    >
                      {/* Realistic Craft Graphic Preview */}
                      <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                        <ShipGraphic ship={ship} size={58} showGlow={isSelected} />
                      </div>

                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="flex items-center justify-between w-full mb-0.5">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors truncate">
                              {ship.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 truncate hidden xs:inline">
                              {ship.codename}
                            </span>
                          </div>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0 ml-1">
                              <Check className="w-2.5 h-2.5" /> EQUIPPED
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-purple-300/80 mb-1.5 truncate">
                          {ship.classType} • {ship.tagline}
                        </span>

                        <p className="text-xs text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                          {ship.description}
                        </p>

                        <div className="flex items-center gap-1.5 mt-auto text-[9px] font-mono flex-wrap">
                          <span className="bg-slate-950/60 text-amber-300 px-2 py-0.5 rounded-full border border-white/5">
                            {ship.emptyMassTons}t
                          </span>
                          <span className="bg-slate-950/60 text-sky-300 px-2 py-0.5 rounded-full border border-white/5">
                            {ship.maxThrustKn} kN
                          </span>
                          <span className="bg-slate-950/60 text-teal-300 px-2 py-0.5 rounded-full border border-white/5">
                            {ship.maxFuel} L
                          </span>
                          <span className="bg-slate-950/60 text-rose-300 px-2 py-0.5 rounded-full border border-white/5">
                            Agility {ship.stats.agility}/5
                          </span>
                          {(ship.canCarryVehicles || ship.isHeavyVehicleCarrier) && (
                            <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                              <Truck className="w-2.5 h-2.5 text-emerald-400" /> Rover
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. INLINE CAROUSEL & HANGAR SLIDER VIEW (Start Menu / In-flight HUD)
  // =========================================================================
  const currentShip: ShipModelConfig = SHIP_MODELS[activeIndex] || SHIP_MODELS[0];
  const isCurrentShipEquipped = currentShip.id === selectedModelId;

  const handleGoTo = (newIndex: number, dir: number) => {
    const wrapped = (newIndex + SHIP_MODELS.length) % SHIP_MODELS.length;
    setDirection(dir);
    setActiveIndex(wrapped);
    onSelectModel(SHIP_MODELS[wrapped].id);
    sound.playLandingChime();
  };

  const handlePrev = () => handleGoTo(activeIndex - 1, -1);
  const handleNext = () => handleGoTo(activeIndex + 1, 1);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.current = clientX;
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchEndX.current = clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 35;
      if (diff > minSwipeDistance) {
        handleNext();
      } else if (diff < -minSwipeDistance) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const cardVariants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      scale: 0.8,
      opacity: 0,
      rotateY: dir > 0 ? 15 : -15,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 380, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { type: 'spring', stiffness: 350, damping: 28 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      scale: 0.82,
      opacity: 0,
      rotateY: dir > 0 ? -18 : 18,
      filter: 'blur(6px)',
      transition: {
        duration: 0.22,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Section Title on Top */}
      <div className="w-full mb-2 px-1 flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-sky-300 font-extrabold uppercase bg-sky-950/50 border border-sky-500/30 px-3 py-1 rounded-lg backdrop-blur-md shadow-sm">
          <Rocket className="w-4 h-4 text-sky-400" />
          <span>SPACECRAFT FLEET</span>
        </div>
      </div>

      {/* Sub-options Row: Catalog Button (below the title) */}
      <div className="flex items-center justify-between gap-2 mb-2.5 w-full px-1">
        {onOpenModal && (
          <button
            id="btn-open-hangar-specs-modal"
            type="button"
            onClick={onOpenModal}
            title="Open full Spacecraft Fleet Specifications & Hangar catalog"
            className="flex items-center gap-1.5 text-xs font-mono text-sky-300 hover:text-white bg-slate-900/70 hover:bg-slate-800 border border-sky-400/30 hover:border-sky-400/60 px-3 py-1 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>FLEET CATALOG</span>
          </button>
        )}
      </div>

      {/* Main Single Ship Sliding Carousel Card */}
      <div
        className="relative w-full max-w-lg flex items-center justify-between gap-1 sm:gap-2 px-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        style={{ perspective: 1000 }}
      >
        {/* Left Arrow Button */}
        <button
          id="btn-ship-prev"
          type="button"
          onClick={handlePrev}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-sky-400/50 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shrink-0 shadow-lg active:scale-90 z-20"
          title="Previous Spacecraft"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Animated Deck Stage */}
        <div className="flex-1 relative flex flex-col items-center min-w-0 overflow-hidden py-1">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentShip.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center text-center"
            >
              {/* Spacecraft Visual Render */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative mb-1 transition-transform duration-200">
                <ShipGraphic
                  ship={currentShip}
                  size={90}
                  showGlow={true}
                  showThrusters={true}
                />
              </div>

              {/* World/Ship Full Name & Classification Badges */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-1 w-full px-2">
                <h3 className="font-mono text-sm sm:text-base font-black text-white tracking-wide uppercase leading-tight">
                  {currentShip.name}
                </h3>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md whitespace-nowrap shrink-0"
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.7)',
                    borderColor: '#c084fc',
                    color: '#c084fc',
                  }}
                >
                  {currentShip.classType}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-slate-900/80 border border-white/10 text-slate-400 whitespace-nowrap">
                  {currentShip.codename}
                </span>
                {(currentShip.canCarryVehicles || currentShip.isHeavyVehicleCarrier) && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-950/70 border border-emerald-400 text-emerald-300 flex items-center gap-1 whitespace-nowrap">
                    <Truck className="w-2.5 h-2.5" />
                    ROVER CARRIER
                  </span>
                )}
              </div>

              {/* Tagline & Lore description with expand preview */}
              <div
                onClick={() => setShowDescPopup(true)}
                className="group flex items-center justify-center gap-1 max-w-sm mb-1.5 px-2 cursor-pointer"
                title="Click to expand spacecraft specifications"
              >
                <p className="text-[11px] sm:text-xs text-slate-300 group-hover:text-purple-200 font-sans line-clamp-2 leading-relaxed transition-colors text-center">
                  {currentShip.description}
                </p>
                <Maximize2 className="w-3 h-3 text-slate-400 group-hover:text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-0.5" />
              </div>

              {/* 4 Performance Telemetry Indicators matching Planet layout */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full max-w-md text-slate-300 font-mono text-[10px] px-1">
                {/* Thrust */}
                <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Rocket className="w-2.5 h-2.5 text-sky-400" /> THRUST
                    </span>
                    <span className="text-sky-300 font-bold ml-1">{currentShip.maxThrustKn} kN</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full ${
                          lvl <= currentShip.stats.thrust ? 'bg-sky-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* TWR */}
                <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Gauge className="w-2.5 h-2.5 text-emerald-400" /> TWR
                    </span>
                    <span className="text-emerald-300 font-bold ml-1">{currentShip.twr.toFixed(2)}x</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full ${
                          lvl <= currentShip.stats.stability ? 'bg-emerald-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Fuel Capacity */}
                <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Flame className="w-2.5 h-2.5 text-amber-400" /> FUEL
                    </span>
                    <span className="text-amber-300 font-bold ml-1">{currentShip.maxFuel} L</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full ${
                          lvl <= currentShip.stats.fuelTank ? 'bg-amber-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Agility */}
                <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-rose-400" /> AGILITY
                    </span>
                    <span className="text-rose-300 font-bold ml-1">{currentShip.stats.agility}/5</span>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full ${
                          lvl <= currentShip.stats.agility ? 'bg-rose-400' : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          id="btn-ship-next"
          type="button"
          onClick={handleNext}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-sky-400/50 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shrink-0 shadow-lg active:scale-90 z-20"
          title="Next Spacecraft"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Ship Selection Dots Navigation */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {SHIP_MODELS.map((ship, idx) => (
          <button
            key={ship.id}
            type="button"
            onClick={() => handleGoTo(idx, idx > activeIndex ? 1 : -1)}
            className={`transition-all rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-5 h-1.5 bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]'
                : 'w-1.5 h-1.5 bg-slate-700 hover:bg-slate-500'
            }`}
            title={ship.name}
          />
        ))}
      </div>

      {/* Full Telemetry & Specifications Popup Modal */}
      <AnimatePresence>
        {showDescPopup && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowDescPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-950/95 border border-purple-400/40 rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl space-y-4 text-left max-h-[85vh] overflow-y-auto backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center relative">
                    <ShipGraphic ship={currentShip} size={48} showGlow={true} />
                  </div>
                  <div>
                    <h3 className="font-mono text-base font-bold text-slate-100 flex items-center gap-2">
                      <span>{currentShip.name}</span>
                      <span className="text-xs text-purple-400">[{currentShip.codename}]</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {currentShip.classType} • {currentShip.manufactureOrigin || 'Sol Aerospace'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDescPopup(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  FLIGHT MANUAL DESCRIPTION
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {currentShip.description}
                </p>
              </div>

              {/* Detailed Specs Grid */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  TELEMETRY & HARDWARE SPECS
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">DRY MASS</span>
                    <span className="text-amber-300 font-bold">{currentShip.emptyMassTons} Metric Tons</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">MAIN ENGINE THRUST</span>
                    <span className="text-sky-300 font-bold">{currentShip.maxThrustKn} kN</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">THRUST-TO-WEIGHT</span>
                    <span className="text-emerald-300 font-bold">{currentShip.twr.toFixed(2)} : 1</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">RCS REACTION</span>
                    <span className="text-rose-300 font-bold">{currentShip.rcsResponseMs} ms</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">FUEL CAPACITY</span>
                    <span className="text-teal-300 font-bold">{currentShip.maxFuel} Units</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">CARGO HOOK</span>
                    <span className="text-purple-300 font-bold">{currentShip.cargoHookCapacityKg || 500} kg</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5 sm:col-span-2">
                    <span className="text-slate-400 text-[9px] block">PROPULSION CORE</span>
                    <span className="text-slate-200 font-bold truncate block">
                      {currentShip.propulsionType || 'Bipropellant Thrusters'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle Transporter Badge in Popup */}
              <div className="p-3 rounded-2xl bg-slate-900/70 border border-white/10 mb-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400">VEHICLE LOGISTICS BAY:</span>
                  {(currentShip.canCarryVehicles || currentShip.isHeavyVehicleCarrier) ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/50 text-emerald-300">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ROVER CAPABLE</span>
                      <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950/80 border border-rose-500/50 text-rose-300">
                      <X className="w-3 h-3 text-rose-400 stroke-[3]" />
                      <span>LIGHT CARGO ONLY</span>
                    </span>
                  )}
                </div>
                {currentShip.roverBayCapacity && (
                  <div className="text-[10px] font-mono text-slate-300">
                    Configuration: <span className="text-white font-semibold">{currentShip.roverBayCapacity}</span>
                  </div>
                )}
              </div>

              {/* Stat Ratings Bars in Popup */}
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 mb-4 space-y-2">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                  PERFORMANCE PROFILE
                </div>
                {[
                  { label: 'AGILITY', val: currentShip.stats.agility, color: 'bg-rose-400', icon: Zap },
                  { label: 'FUEL TANK', val: currentShip.stats.fuelTank, color: 'bg-amber-400', icon: Flame },
                  { label: 'STABILITY', val: currentShip.stats.stability, color: 'bg-emerald-400', icon: Shield },
                  { label: 'MAIN THRUST', val: currentShip.stats.thrust, color: 'bg-sky-400', icon: Rocket },
                  { label: 'ARMOR HULL', val: currentShip.stats.armor, color: 'bg-purple-400', icon: Shield },
                ].map((st) => (
                  <div key={st.label} className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-slate-400 w-28 text-[10px]">
                      <st.icon className="w-3 h-3 text-slate-500" />
                      {st.label}
                    </span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-4 h-1.5 rounded-sm ${
                            level <= st.val ? st.color : 'bg-slate-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowDescPopup(false)}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-400 hover:from-purple-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg text-center"
              >
                CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
