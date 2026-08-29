import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlanetConfig, CustomMapData } from '../types';
import { PLANETS } from '../game/planets';
import { sound } from '../game/sound';
import { PlanetGraphic } from './PlanetGraphic';
import { getPlanetRecord } from '../utils/scoreStorage';
import {
  getSavedCustomMaps,
  createBlankCustomMap,
  resetCustomMapsToDefaults,
  deleteCustomMap,
  isOfficialMap,
  revertOfficialMapToDefault,
} from '../utils/customMapsStorage';
import { convertCustomMapToPlanet, convertOfficialPlanetToCustomMap } from '../game/customMapConverter';
import {
  ChevronLeft,
  ChevronRight,
  Award,
  Wind,
  Gauge,
  Clock,
  Flame,
  Globe,
  MapPin,
  Edit3,
  Plus,
  Sparkles,
  Trophy,
  X,
  Info,
  Maximize2,
  AlertTriangle,
  CheckCircle2,
  Thermometer,
  Compass,
  Radio,
  Rocket,
  Target,
  Layers,
  RotateCcw,
  Trash2,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';

export interface WorldItem {
  type: 'official' | 'custom' | 'create_new';
  id: string;
  name: string;
  category: string;
  planetConfig: PlanetConfig;
  customMapData?: CustomMapData;
  isCompleted?: boolean;
}

interface PlanetCardSliderProps {
  selectedWorldIndex: number;
  selectedPlanetId?: string;
  onSelectWorld: (worldItem: WorldItem, index: number) => void;
  completedPlanets: Record<string, boolean>;
  onOpenEditor?: (mapData?: CustomMapData) => void;
  onOpenPlanetSelector?: () => void;
}

export const PlanetCardSlider: React.FC<PlanetCardSliderProps> = ({
  selectedWorldIndex,
  selectedPlanetId,
  onSelectWorld,
  completedPlanets,
  onOpenEditor,
  onOpenPlanetSelector,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'official' | 'custom'>('all');
  const [direction, setDirection] = useState<number>(1);
  const [showDescPopup, setShowDescPopup] = useState<boolean>(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Load custom maps from localStorage
  const [customMaps, setCustomMaps] = useState<CustomMapData[]>([]);
  const [mapToDelete, setMapToDelete] = useState<CustomMapData | null>(null);
  const [officialToRevert, setOfficialToRevert] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => setCustomMaps(getSavedCustomMaps());
    refresh();
    window.addEventListener('gravity_lander_maps_changed', refresh);
    return () => window.removeEventListener('gravity_lander_maps_changed', refresh);
  }, []);

  // Construct combined world list
  const allWorldItems: WorldItem[] = useMemo(() => {
    const officials: WorldItem[] = PLANETS.map((p) => {
      // Check if user has saved custom edits for this official planet
      const savedOverride = customMaps.find((m) => m.id === `official-${p.id}` || m.id === p.id);
      if (savedOverride) {
        const overridePlanet = convertCustomMapToPlanet(savedOverride);
        return {
          type: 'official',
          id: p.id,
          name: p.name,
          category: p.category,
          planetConfig: overridePlanet,
          customMapData: savedOverride,
          isCompleted: !!completedPlanets[p.id],
        };
      }
      return {
        type: 'official',
        id: p.id,
        name: p.name,
        category: p.category,
        planetConfig: p,
        isCompleted: !!completedPlanets[p.id],
      };
    });

    const customs: WorldItem[] = customMaps
      .filter((cm) => !cm.id.startsWith('official-') && !PLANETS.some((p) => p.id === cm.id))
      .map((cm) => {
        const cfg = convertCustomMapToPlanet(cm);
        return {
          type: 'custom',
          id: `custom-${cm.id}`,
          name: cm.name || 'Custom World',
          category: `CUSTOM MAP • BY ${cm.author || 'Commander'}`,
          planetConfig: cfg,
          customMapData: cm,
          isCompleted: !!completedPlanets[`custom-${cm.id}`],
        };
      });

    const createSlide: WorldItem = {
      type: 'create_new',
      id: 'create-new-world-card',
      name: 'Create Custom World',
      category: 'LEVEL EDITOR & MAP MAKER',
      planetConfig: {
        id: 'new-world-creator',
        name: 'New Custom World',
        category: 'Custom World Creator',
        description: 'Design your own subterranean cavern maps up to 3x size with custom terrain, obstacles, and physics in the Level Editor.',
        gravity: 3.5,
        airResistance: 0.001,
        fuelBurnRate: 20,
        seed: 77777,
        targetTimeSec: 45,
        difficulty: 'Medium',
        theme: {
          skyTop: '#06101e',
          skyBottom: '#0d223f',
          terrainFill: '#0f172a',
          terrainBorder: '#38bdf8',
          terrainAccent: '#38bdf8',
          gridColor: 'rgba(56, 189, 248, 0.1)',
          dustColor: '#38bdf8',
          starDensity: 160,
          glowColor: 'rgba(56, 189, 248, 0.4)',
        },
      },
    };

    if (filterMode === 'official') return officials;
    if (filterMode === 'custom') return [...customs, createSlide];
    return [...officials, ...customs, createSlide];
  }, [completedPlanets, customMaps, filterMode]);

  // Match planet when selectedPlanetId is supplied or updated
  const hasMatchedInitialPlanet = useRef(false);
  const lastMatchedPlanetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (allWorldItems.length === 0) return;

    if (!hasMatchedInitialPlanet.current) {
      hasMatchedInitialPlanet.current = true;
      if (selectedPlanetId) {
        lastMatchedPlanetId.current = selectedPlanetId;
        const cleanTarget = selectedPlanetId.replace(/^custom-/, '').replace(/^official-/, '');
        const foundIdx = allWorldItems.findIndex(
          (item) =>
            item.id === selectedPlanetId ||
            item.id === cleanTarget ||
            item.planetConfig.id === selectedPlanetId ||
            item.planetConfig.id === cleanTarget ||
            (item.customMapData && item.customMapData.id === selectedPlanetId) ||
            (item.customMapData && item.customMapData.id === `official-${cleanTarget}`)
        );
        if (foundIdx !== -1) {
          onSelectWorld(allWorldItems[foundIdx], foundIdx);
          return;
        }
      }
      // Default initial sync
      const initialIdx = Math.min(Math.max(0, selectedWorldIndex), allWorldItems.length - 1);
      onSelectWorld(allWorldItems[initialIdx], initialIdx);
    } else if (selectedPlanetId && selectedPlanetId !== lastMatchedPlanetId.current) {
      lastMatchedPlanetId.current = selectedPlanetId;
      const cleanTarget = selectedPlanetId.replace(/^custom-/, '').replace(/^official-/, '');
      const foundIdx = allWorldItems.findIndex(
        (item) =>
          item.id === selectedPlanetId ||
          item.id === cleanTarget ||
          item.planetConfig.id === selectedPlanetId ||
          item.planetConfig.id === cleanTarget ||
          (item.customMapData && item.customMapData.id === selectedPlanetId) ||
          (item.customMapData && item.customMapData.id === `official-${cleanTarget}`)
      );
      if (foundIdx !== -1 && foundIdx !== selectedWorldIndex) {
        setDirection(1);
        onSelectWorld(allWorldItems[foundIdx], foundIdx);
      }
    }
  }, [allWorldItems, selectedPlanetId, selectedWorldIndex, onSelectWorld]);

  const safeIndex = Math.min(Math.max(0, selectedWorldIndex), Math.max(0, allWorldItems.length - 1));
  const currentItem = allWorldItems[safeIndex] || allWorldItems[0];
  const currentPlanet = currentItem?.planetConfig || PLANETS[0];
  const isCompleted = currentItem?.isCompleted;
  const record = currentItem ? getPlanetRecord(currentItem.id) : { bestTime: null, highScore: null, bestRank: null, completedCount: 0 };
  const isLuna =
    currentItem?.id === 'luna' ||
    currentItem?.id === 'official-luna' ||
    currentItem?.planetConfig?.id === 'luna' ||
    currentItem?.name?.toLowerCase().includes('luna');

  const handleDeleteConfirmed = () => {
    if (!mapToDelete) return;
    deleteCustomMap(mapToDelete.id);
    const updated = getSavedCustomMaps();
    setCustomMaps(updated);
    setMapToDelete(null);
    sound.playLandingChime();
    const nextIdx = Math.max(0, safeIndex - 1);
    handleGoTo(nextIdx, -1);
  };

  const handleRevertConfirmed = () => {
    if (!officialToRevert) return;
    revertOfficialMapToDefault(officialToRevert);
    const updated = getSavedCustomMaps();
    setCustomMaps(updated);
    setOfficialToRevert(null);
    sound.playLandingChime();
  };

  const handleGoTo = (newIndex: number, dir: number) => {
    if (allWorldItems.length === 0) return;
    const wrapped = (newIndex + allWorldItems.length) % allWorldItems.length;
    setDirection(dir);
    onSelectWorld(allWorldItems[wrapped], wrapped);
    sound.playLandingChime();
  };

  const handlePrev = () => handleGoTo(safeIndex - 1, -1);
  const handleNext = () => handleGoTo(safeIndex + 1, 1);

  // Swipe gesture support
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

  const gravLevel = Math.min(5, Math.max(1, Math.round(currentPlanet.gravity * 0.8)));
  const atmoLevel = Math.min(5, Math.max(1, Math.round(currentPlanet.airResistance * 1500)));
  const burnLevel = Math.min(5, Math.max(1, Math.round((currentPlanet.fuelBurnRate - 12) / 3)));

  // Deck slide transition variants
  const cardVariants = {
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
      {/* Header Tag and Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-teal-400 font-bold uppercase">
          <Globe className="w-3.5 h-3.5" />
          <span>DESTINATION WORLD</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-900/60 p-0.5 rounded-full border border-white/10 text-[10px] font-mono">
          <button
            type="button"
            onClick={() => {
              setFilterMode('all');
              handleGoTo(0, 1);
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-teal-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ALL ({PLANETS.length + customMaps.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterMode('official');
              handleGoTo(0, 1);
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
              filterMode === 'official'
                ? 'bg-teal-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            OFFICIAL ({PLANETS.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterMode('custom');
              handleGoTo(0, 1);
            }}
            className={`px-2 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              filterMode === 'custom'
                ? 'bg-teal-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-2.5 h-2.5" />
            CUSTOM ({customMaps.length})
          </button>
        </div>

        {/* Subtle Map Catalog Modal Button */}
        {onOpenPlanetSelector && (
          <button
            id="btn-open-planet-catalog-modal"
            type="button"
            onClick={onOpenPlanetSelector}
            title="Open Full Expedition Destination Catalog & Custom Maps modal"
            className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-teal-300 bg-slate-900/40 hover:bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-white/10 hover:border-teal-400/40 transition-all cursor-pointer shadow-sm"
          >
            <Compass className="w-2.5 h-2.5 text-teal-400" />
            <span>CATALOG</span>
          </button>
        )}
      </div>

      {/* Main Sliding Deck Container */}
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
          id="btn-planet-prev"
          type="button"
          onClick={handlePrev}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-teal-400/50 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shrink-0 shadow-lg active:scale-90 z-20"
          title="Previous Destination World"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Animated Deck Stage */}
        <div className="flex-1 relative flex flex-col items-center min-w-0 overflow-hidden py-1">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center text-center"
            >
              {currentItem.type === 'create_new' ? (
                /* Card to Create a Brand New Custom World */
                <div className="w-full flex flex-col items-center py-2">
                  <div
                    onClick={() => onOpenEditor?.(createBlankCustomMap())}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-sky-400/60 bg-sky-950/30 flex items-center justify-center cursor-pointer hover:scale-105 hover:border-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.25)] mb-2"
                  >
                    <Plus className="w-10 h-10 text-sky-400 animate-pulse" />
                  </div>
                  <h3 className="font-mono text-sm sm:text-base font-black text-white tracking-wide uppercase leading-tight mb-1">
                    CREATE CUSTOM WORLD
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-950/70 border border-sky-400 text-sky-300 mb-2">
                    UP TO 3X MAP SIZE
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-300 font-sans max-w-md mb-2 leading-relaxed px-2">
                    Build expansive cavern worlds, custom rock arches, islands, and gravity zones using the Map Editor.
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenEditor?.(createBlankCustomMap())}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>LAUNCH MAP EDITOR</span>
                  </button>
                </div>
              ) : (
                /* Standard or Custom World Card */
                <>
                  {/* Celestial Graphic Render with custom planet visual */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative mb-1 transition-transform duration-200">
                    <PlanetGraphic planet={currentPlanet} size={90} showGlow={true} />
                    {isCompleted && (
                      <div className="absolute top-0 right-0 bg-emerald-500/20 border border-emerald-400 text-emerald-300 p-1 rounded-full shadow-lg backdrop-blur-md flex items-center">
                        <Award className="w-3 h-3 text-emerald-300" />
                      </div>
                    )}
                  </div>

                  {/* World Full Name & Classification Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-1 w-full px-2">
                    <h3 className="font-mono text-sm sm:text-base font-black text-white tracking-wide uppercase leading-tight">
                      {currentItem.name}
                    </h3>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border backdrop-blur-md whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.7)',
                        borderColor: currentPlanet.theme.terrainAccent,
                        color: currentPlanet.theme.terrainAccent,
                      }}
                    >
                      {currentPlanet.difficulty}
                    </span>
                    {isLuna && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-black bg-amber-400/20 border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)] flex items-center gap-1 whitespace-nowrap">
                        <GraduationCap className="w-2.5 h-2.5" />
                        TUTORIAL WORLD
                      </span>
                    )}
                    {currentItem.type === 'custom' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/70 border border-purple-400 text-purple-300 whitespace-nowrap">
                        CUSTOM
                      </span>
                    )}
                    {currentItem.customMapData?.worldWidth && currentItem.customMapData.worldWidth > 10000 && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-950/70 border border-amber-400 text-amber-300 whitespace-nowrap">
                        {currentItem.customMapData.worldWidth >= 20000 ? '3X ULTRA MAP' : '2X LARGE MAP'}
                      </span>
                    )}
                  </div>

                  {/* Classification Lore or Creator tag - 2 lines by default with zoom popup on click */}
                  <div
                    onClick={() => setShowDescPopup(true)}
                    className="group flex items-center justify-center gap-1 max-w-sm mb-1.5 px-2 cursor-pointer"
                    title="Click to expand planet brief"
                  >
                    <p className="text-[11px] sm:text-xs text-slate-300 group-hover:text-teal-200 font-sans line-clamp-2 leading-relaxed transition-colors text-center">
                      {currentItem.planetConfig.description}
                    </p>
                    <Maximize2 className="w-3 h-3 text-slate-400 group-hover:text-teal-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-0.5" />
                  </div>

                  {/* High Score & Best Time Banner */}
                  {(record.highScore !== null || record.bestTime !== null || record.completedCount > 0) && (
                    <div className="w-full max-w-md bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-emerald-500/10 border border-amber-400/30 rounded-xl px-3 py-1.5 mb-2 flex items-center justify-between text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.12)]">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="text-[10px] text-slate-300">HIGH SCORE:</span>
                        <span className="font-black text-amber-300 text-sm tracking-wide">
                          {record.highScore !== null ? record.highScore.toLocaleString() : '--'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        {record.bestTime !== null && (
                          <div className="flex items-center gap-1 text-emerald-300">
                            <Clock className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-slate-400">BEST TIME:</span>
                            <span className="font-bold">{record.bestTime}s</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 4 Environmental Telemetry Indicators */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full max-w-md text-slate-300 font-mono text-[10px] px-1">
                    {/* Gravity */}
                    <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="flex items-center gap-1">
                          <Gauge className="w-2.5 h-2.5 text-sky-400" /> GRAV
                        </span>
                        <span className="text-sky-300 font-bold ml-1">{currentPlanet.gravity.toFixed(2)}g</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 flex-1 rounded-full ${
                              lvl <= gravLevel ? 'bg-sky-400' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Atmosphere / Drag */}
                    <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="flex items-center gap-1">
                          <Wind className="w-2.5 h-2.5 text-teal-400" /> DRAG
                        </span>
                        <span className="text-teal-300 font-bold ml-1">
                          {currentPlanet.airResistance > 0.0005 ? `${(currentPlanet.airResistance * 1000).toFixed(1)}x` : 'VACUUM'}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 flex-1 rounded-full ${
                              lvl <= atmoLevel ? 'bg-teal-400' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Fuel Burn Rate */}
                    <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 text-amber-400" /> BURN
                        </span>
                        <span className="text-amber-300 font-bold ml-1">
                          {currentPlanet.fuelBurnRate.toFixed(0)} u/s
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <div
                            key={lvl}
                            className={`h-1 flex-1 rounded-full ${
                              lvl <= burnLevel ? 'bg-amber-400' : 'bg-white/10'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Target / Best Record or Quick Edit & Delete button */}
                    <div className="flex flex-col bg-slate-900/40 border border-white/10 px-2 py-1 rounded-lg backdrop-blur-sm justify-between">
                      <div className="flex items-center justify-between text-slate-400 mb-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-purple-400" /> PAR
                        </span>
                        <span className="text-purple-300 font-bold ml-1">{currentPlanet.targetTimeSec}s</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (currentItem.customMapData) {
                              onOpenEditor?.(currentItem.customMapData);
                            } else {
                              const mapData = convertOfficialPlanetToCustomMap(currentPlanet);
                              onOpenEditor?.(mapData);
                            }
                          }}
                          className="text-sky-300 hover:text-sky-200 font-bold flex items-center justify-center gap-0.5 hover:underline cursor-pointer"
                          title="Edit this level in Level Editor"
                        >
                          <Edit3 className="w-2.5 h-2.5" /> Edit
                        </button>

                        {currentItem.type === 'custom' && currentItem.customMapData && (
                          <>
                            <span className="text-white/20">•</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMapToDelete(currentItem.customMapData || null);
                              }}
                              className="text-rose-400 hover:text-rose-300 font-bold flex items-center justify-center gap-0.5 hover:underline cursor-pointer"
                              title="Delete custom world"
                            >
                              <Trash2 className="w-2.5 h-2.5" /> Del
                            </button>
                          </>
                        )}

                        {currentItem.type === 'official' && currentItem.customMapData && (
                          <>
                            <span className="text-white/20">•</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOfficialToRevert(currentItem.id);
                              }}
                              className="text-amber-400 hover:text-amber-300 font-bold flex items-center justify-center gap-0.5 hover:underline cursor-pointer"
                              title="Revert custom edits back to official default"
                            >
                              <RotateCcw className="w-2.5 h-2.5" /> Revert
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          id="btn-planet-next"
          type="button"
          onClick={handleNext}
          className="p-2 sm:p-2.5 rounded-full bg-slate-900/50 hover:bg-slate-800/80 border border-white/10 hover:border-teal-400/50 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-md shrink-0 shadow-lg active:scale-90 z-20"
          title="Next Destination World"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2 max-w-sm">
        {allWorldItems.map((item, idx) => (
          <button
            key={item.id}
            id={`dot-world-${item.id}`}
            type="button"
            onClick={() => handleGoTo(idx, idx > safeIndex ? 1 : -1)}
            className={`transition-all duration-200 cursor-pointer rounded-full ${
              idx === safeIndex
                ? 'w-5 h-1 bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]'
                : item.type === 'custom'
                ? 'w-1 h-1 bg-purple-400/50 hover:bg-purple-300'
                : 'w-1 h-1 bg-white/20 hover:bg-white/50'
            }`}
            title={item.name}
          />
        ))}
      </div>

      {/* Planet Description Zoom Pop-up Modal */}
      <AnimatePresence>
        {showDescPopup && (
          <div
            id="planet-desc-zoom-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setShowDescPopup(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="w-full max-w-lg bg-slate-950/95 border border-teal-400/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(45,212,191,0.3)] text-left relative backdrop-blur-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/10 shrink-0 relative">
                    <PlanetGraphic planet={currentItem.planetConfig} size={50} />
                    {isLuna && (
                      <div className="absolute -top-1.5 -left-1.5 rotate-[-10deg]">
                        <div className="w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                          <GraduationCap className="w-2.5 h-2.5 fill-slate-950" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-mono text-base sm:text-lg font-black text-white uppercase tracking-wide">
                        {currentItem.name}
                      </h3>
                      {currentItem.planetConfig.sizeCategory && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-teal-950/80 border border-teal-400 text-teal-300">
                          {currentItem.planetConfig.sizeCategory} Cavern
                        </span>
                      )}
                      {isLuna && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-400/20 border border-amber-400 text-amber-300 flex items-center gap-1">
                          <GraduationCap className="w-2.5 h-2.5" />
                          TUTORIAL WORLD
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                        style={{
                          backgroundColor: 'rgba(15, 23, 42, 0.8)',
                          borderColor: currentItem.planetConfig.theme.terrainAccent,
                          color: currentItem.planetConfig.theme.terrainAccent,
                        }}
                      >
                        {currentItem.planetConfig.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {currentItem.planetConfig.category}
                      </span>
                      {currentItem.type === 'custom' && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-950/70 border border-purple-400 text-purple-300">
                          CUSTOM
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDescPopup(false)}
                  className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  title="Close Description"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Luna Tutorial Special Mission Briefing Box */}
              {isLuna && (
                <div className="flex items-start gap-3 p-3.5 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-400/40 rounded-2xl text-amber-200 font-mono text-xs mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                    <GraduationCap className="w-4 h-4 fill-slate-950" />
                  </div>
                  <div>
                    <div className="font-black text-amber-300 tracking-wide uppercase flex items-center gap-1.5">
                      <span>OFFICIAL TUTORIAL WORLD</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-[9px] text-amber-300 font-mono border border-amber-400/30">PILOT ACADEMY</span>
                    </div>
                    <p className="text-[11px] text-amber-100/90 font-sans mt-1 leading-relaxed">
                      Luna is the designated flight training proving ground for all newly certified Commanders. Master rotational thrusters, low-gravity deceleration, docking, and cargo crane extraction in vacuum before taking on deep-space hazards.
                    </p>
                  </div>
                </div>
              )}

              {/* Full Description Text */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-1.5 text-teal-400 text-xs font-mono font-bold mb-2">
                  <Info className="w-3.5 h-3.5" />
                  <span>GEOLOGICAL & ATMOSPHERIC SURVEY</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                  {currentItem.planetConfig.description}
                </p>
              </div>

              {/* Comprehensive Environmental Specs Grid */}
              <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3.5 mb-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-sky-400 text-xs font-mono font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>PLANETARY TELEMETRY & CONDITIONS</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">GRAVITY</span>
                    <span className="text-sky-300 font-bold">{currentItem.planetConfig.gravity.toFixed(2)} m/s² ({(currentItem.planetConfig.gravity / 9.81).toFixed(2)}g)</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">ATMOS DRAG</span>
                    <span className="text-teal-300 font-bold">{currentItem.planetConfig.airResistance.toFixed(4)} Cd</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">BURN RATE</span>
                    <span className="text-amber-300 font-bold">{currentItem.planetConfig.fuelBurnRate.toFixed(1)}x Normal</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">SURFACE TEMP</span>
                    <span className="text-rose-300 font-bold">{currentItem.planetConfig.surfaceTempC !== undefined ? `${currentItem.planetConfig.surfaceTempC}°C` : '-50°C'}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">PRESSURE</span>
                    <span className="text-purple-300 font-bold">{currentItem.planetConfig.surfacePressureBar !== undefined ? `${currentItem.planetConfig.surfacePressureBar} bar` : '0.00 bar'}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">RADIATION</span>
                    <span className="text-yellow-300 font-bold">{currentItem.planetConfig.radiationRadPerHr !== undefined ? `${currentItem.planetConfig.radiationRadPerHr} rad/h` : '1.2 rad/h'}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">WIND SPEED</span>
                    <span className="text-cyan-300 font-bold">{currentItem.planetConfig.windSpeedKmh !== undefined ? `${currentItem.planetConfig.windSpeedKmh} km/h` : '0 km/h'}</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">TARGET TIME</span>
                    <span className="text-emerald-300 font-bold">{currentItem.planetConfig.targetTimeSec} seconds</span>
                  </div>
                  <div className="p-2 bg-slate-950/70 rounded-xl border border-white/5">
                    <span className="text-slate-400 text-[9px] block">CAVERN SPAN</span>
                    <span className="text-slate-200 font-bold">{currentItem.planetConfig.width || 6400}m × {currentItem.planetConfig.height || 2600}m</span>
                  </div>
                </div>
              </div>

              {/* Mission Objectives */}
              {currentItem.planetConfig.objectives && currentItem.planetConfig.objectives.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 mb-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
                    <Target className="w-3.5 h-3.5" />
                    <span>EXPEDITION OBJECTIVES</span>
                  </div>
                  <div className="space-y-1.5">
                    {currentItem.planetConfig.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Environmental Hazards */}
              {currentItem.planetConfig.hazards && currentItem.planetConfig.hazards.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 mb-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>ACTIVE GEOLOGICAL HAZARDS</span>
                  </div>
                  <div className="space-y-1">
                    {currentItem.planetConfig.hazards.map((haz, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-amber-200/90 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{haz}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Craft */}
              {currentItem.planetConfig.recommendedCraft && (
                <div className="p-3 rounded-2xl bg-slate-900/70 border border-sky-500/20 mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold">
                    <Rocket className="w-3.5 h-3.5" />
                    <span>RECOMMENDED CRAFT:</span>
                  </div>
                  <span className="text-xs font-mono text-white font-semibold text-right">
                    {currentItem.planetConfig.recommendedCraft}
                  </span>
                </div>
              )}

              {/* Action Buttons in Description Popup */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setShowDescPopup(false);
                    if (currentItem.customMapData) {
                      onOpenEditor?.(currentItem.customMapData);
                    } else {
                      const mapData = convertOfficialPlanetToCustomMap(currentPlanet);
                      onOpenEditor?.(mapData);
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Open in Map Editor</span>
                </button>

                {currentItem.type === 'custom' && currentItem.customMapData && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowDescPopup(false);
                      setMapToDelete(currentItem.customMapData || null);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/50 text-rose-300 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Delete World</span>
                  </button>
                )}

                {currentItem.type === 'official' && currentItem.customMapData && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowDescPopup(false);
                      setOfficialToRevert(currentItem.id);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Revert to Factory Default</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowDescPopup(false)}
                  className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Custom Map Confirmation Modal */}
      <AnimatePresence>
        {mapToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-rose-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-slate-100">Delete Custom World?</h3>
                  <p className="text-xs text-rose-300/80 font-mono">Permanent Deletion</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
                <div className="font-mono text-xs font-bold text-white uppercase">{mapToDelete.name}</div>
                <div className="text-[11px] font-mono text-slate-400">Author: {mapToDelete.author || 'Commander'}</div>
                <div className="text-[10px] font-mono text-slate-500">
                  Span: {mapToDelete.worldWidth || 6400}m × {mapToDelete.worldHeight || 2600}m
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Are you sure you want to permanently delete <strong className="text-white">"{mapToDelete.name}"</strong>? This custom world will be removed from your library.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMapToDelete(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirmed}
                  className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Revert Official Map Confirmation Modal */}
      <AnimatePresence>
        {officialToRevert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-slate-100">Revert to Factory Default?</h3>
                  <p className="text-xs text-amber-300/80 font-mono">Official Campaign Protection</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Official campaign worlds cannot be deleted from the universe roster.</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                This will discard all custom Level Editor modifications made to this planet and restore its original layout, hazards, and mission objectives.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOfficialToRevert(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRevertConfirmed}
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Yes, Revert
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
