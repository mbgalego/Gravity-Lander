import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlanetConfig, CustomMapData } from '../types';
import { PLANETS } from '../game/planets';
import {
  getSavedCustomMaps,
  deleteCustomMap,
  duplicateCustomMap,
  createBlankCustomMap,
  importMapFromJSON,
  resetCustomMapsToDefaults,
} from '../utils/customMapsStorage';
import { convertCustomMapToPlanet } from '../game/customMapConverter';
import { PlanetGraphic } from './PlanetGraphic';
import {
  Compass,
  Sparkles,
  X,
  Shuffle,
  Sliders,
  Play,
  Check,
  Map,
  Plus,
  Edit,
  Trash2,
  Copy,
  Layers,
  Award,
  Upload,
  Download,
  AlertCircle,
  RotateCcw,
  GraduationCap,
} from 'lucide-react';

interface PlanetSelectorProps {
  currentPlanet: PlanetConfig;
  onSelectPlanet: (planet: PlanetConfig) => void;
  isOpen: boolean;
  onClose: () => void;
  completedPlanets: Record<string, boolean>;
  onOpenEditor?: (mapData?: CustomMapData) => void;
  onSelectCustomMap?: (mapData: CustomMapData) => void;
}

export const PlanetSelector: React.FC<PlanetSelectorProps> = ({
  currentPlanet,
  onSelectPlanet,
  isOpen,
  onClose,
  completedPlanets,
  onOpenEditor,
  onSelectCustomMap,
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'user_maps'>('catalog');
  const [customMaps, setCustomMaps] = useState<CustomMapData[]>([]);
  const [importNotification, setImportNotification] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const refresh = () => setCustomMaps(getSavedCustomMaps());
      refresh();
      window.addEventListener('gravity_lander_maps_changed', refresh);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('gravity_lander_maps_changed', refresh);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleJsonFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    setImportNotification(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = (event.target?.result as string) || '';
        const res = importMapFromJSON(text);
        if ('error' in res) {
          setImportError(res.error);
        } else {
          setCustomMaps(getSavedCustomMaps());
          setImportNotification(`Imported "${res.name}" successfully!`);
          setTimeout(() => setImportNotification(null), 3000);
        }
      } catch (err) {
        setImportError('Invalid JSON file format.');
      }
    };
    reader.onerror = () => {
      setImportError('Could not read file.');
    };
    reader.readAsText(file);
    // Reset file input value so same file can be re-imported if needed
    e.target.value = '';
  };

  if (!isOpen) return null;

  const handlePlayUserMap = (mapData: CustomMapData) => {
    if (onSelectCustomMap) {
      onSelectCustomMap(mapData);
    } else {
      const p = convertCustomMapToPlanet(mapData);
      onSelectPlanet(p);
    }
    onClose();
  };

  const handleCreateNewMap = () => {
    const blank = createBlankCustomMap();
    if (onOpenEditor) {
      onOpenEditor(blank);
      onClose();
    }
  };

  const handleEditMap = (mapData: CustomMapData, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenEditor) {
      onOpenEditor(mapData);
      onClose();
    }
  };

  const handleDeleteMap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteCustomMap(id);
    setCustomMaps(updated);
  };

  const handleDuplicateMap = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateCustomMap(id);
    setCustomMaps(getSavedCustomMaps());
  };

  return (
    <div
      id="planet-selector-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-slate-950/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center">
              <Compass className="w-4 h-4 text-sky-400" />
            </div>
            <h2 className="text-sm sm:text-base font-bold text-slate-100 font-mono tracking-wide">
              EXPEDITION DESTINATIONS & CELESTIAL WORLDS
            </h2>
          </div>
          <button
            id="btn-close-planet-modal"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher - Pill Shaped */}
        <div className="flex border-b border-white/10 bg-slate-950/60 px-6 py-2.5 gap-2">
          <button
            id="tab-catalog"
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-sky-500/20 border border-sky-400/70 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            Solar Missions ({PLANETS.length})
          </button>

          <button
            id="tab-user-maps"
            type="button"
            onClick={() => setActiveTab('user_maps')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'user_maps'
                ? 'bg-sky-500/20 border border-sky-400/70 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Custom Maps ({customMaps.length})
          </button>

          <button
            id="tab-procedural"
            type="button"
            onClick={() => setActiveTab('user_maps')}
            className="hidden"
          >
            Seed Generator
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'catalog' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PLANETS.map((planet) => {
                const isSelected = currentPlanet.id === planet.id;
                const isDone = completedPlanets[planet.id];

                return (
                  <button
                    key={planet.id}
                    id={`planet-card-${planet.id}`}
                    type="button"
                    onClick={() => {
                      onSelectPlanet(planet);
                      onClose();
                    }}
                    className={`group flex items-start gap-3.5 text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 text-slate-200 relative cursor-pointer backdrop-blur-xl ${
                      isSelected
                        ? 'border-sky-400 bg-sky-950/30 shadow-[0_0_24px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/50'
                        : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/70 hover:border-sky-400/40'
                    }`}
                  >
                    {/* Realistic Planet Graphic Preview */}
                    <div className="transition-transform duration-200 group-hover:scale-110">
                      <PlanetGraphic planet={planet} size={58} showGlow={isSelected} />
                    </div>

                    <div className="flex flex-col flex-1 min-w-0">
                      <div className="flex items-center justify-between w-full mb-0.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-sky-300 transition-colors truncate">
                            {planet.name}
                          </span>
                          {planet.id === 'luna' && (
                            <span className="flex items-center gap-1 text-[8px] font-mono font-black text-amber-300 bg-amber-400/20 border border-amber-400 px-1.5 py-0.2 rounded-full shrink-0">
                              <GraduationCap className="w-2.5 h-2.5" /> TUTORIAL
                            </span>
                          )}
                        </div>
                        {isDone && (
                          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0 ml-1">
                            <Check className="w-2.5 h-2.5" /> LANDED
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-slate-400 mb-1.5 truncate">
                        {planet.category}
                      </span>

                      <p className="text-xs text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                        {planet.description}
                      </p>

                      <div className="flex items-center gap-1.5 mt-auto text-[9px] font-mono flex-wrap">
                        <span className="bg-slate-950/60 text-amber-300 px-2 py-0.5 rounded-full border border-white/5">
                          {planet.gravity.toFixed(2)} g
                        </span>
                        <span className="bg-slate-950/60 text-slate-300 px-2 py-0.5 rounded-full border border-white/5">
                          {planet.difficulty}
                        </span>
                        <span className="bg-slate-950/60 text-sky-300 px-2 py-0.5 rounded-full border border-white/5">
                          Target: {planet.targetTimeSec}s
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {activeTab === 'user_maps' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                onChange={handleJsonFileUpload}
                className="hidden"
              />

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-mono text-sm font-bold text-slate-200">
                    Custom Maps Library
                  </h3>
                  <p className="text-xs text-slate-400">
                    Play community creations, or design your own subterranean worlds.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetConfirm(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 font-mono font-bold text-xs border border-white/10 transition-all cursor-pointer"
                    title="Clear storage and restore official default maps"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>RESTORE DEFAULTS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono font-bold text-xs border border-sky-500/30 transition-all cursor-pointer"
                    title="Import map from .json file"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>IMPORT JSON</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCreateNewMap}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs shadow-lg transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>NEW MAP</span>
                  </button>
                </div>
              </div>

              {importNotification && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs font-mono text-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{importNotification}</span>
                </div>
              )}

              {importError && (
                <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-xs font-mono text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {customMaps.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-white/15 rounded-2xl bg-slate-900/20 text-slate-400 font-mono text-xs">
                  No custom maps yet. Click "New Map" above to launch the Subterranean Level Editor!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {customMaps.map((mapData) => {
                    const mapPlanet = convertCustomMapToPlanet(mapData);
                    const isSelected =
                      currentPlanet.id === mapData.id ||
                      currentPlanet.id === `custom-${mapData.id}` ||
                      currentPlanet.name === mapData.name;
                    const isDone = !!(completedPlanets[`custom-${mapData.id}`] || completedPlanets[mapData.id]);

                    return (
                      <div
                        key={mapData.id}
                        id={`custom-map-card-${mapData.id}`}
                        onClick={() => handlePlayUserMap(mapData)}
                        className={`group flex items-start gap-3.5 text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 text-slate-200 relative cursor-pointer backdrop-blur-xl ${
                          isSelected
                            ? 'border-sky-400 bg-sky-950/30 shadow-[0_0_24px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/50'
                            : 'border-white/10 bg-slate-900/40 hover:bg-slate-900/70 hover:border-sky-400/40'
                        }`}
                      >
                        {/* Realistic Planet Graphic Preview */}
                        <div className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                          <PlanetGraphic planet={mapPlanet} size={58} showGlow={isSelected} />
                        </div>

                        <div className="flex flex-col flex-1 min-w-0">
                          <div className="flex items-center justify-between w-full mb-0.5">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-mono font-bold text-sm text-slate-100 group-hover:text-sky-300 transition-colors truncate">
                                {mapData.name}
                              </span>
                              <span className="text-[9px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.2 rounded-full border border-amber-800/40 shrink-0">
                                {mapData.difficulty}
                              </span>
                            </div>
                            {isDone && (
                              <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0 ml-1">
                                <Check className="w-2.5 h-2.5" /> LANDED
                              </span>
                            )}
                          </div>

                          <span className="text-[10px] font-mono text-slate-400 mb-1.5 truncate">
                            BY {mapData.author || 'Commander'} • {mapData.worldWidth}x{mapData.worldHeight}m
                          </span>

                          <p className="text-xs text-slate-300 mb-2.5 leading-relaxed line-clamp-2">
                            {mapData.description || 'Custom crafted subterranean landing expedition.'}
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono text-slate-400 mt-auto">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="bg-slate-950/60 text-amber-300 px-2 py-0.5 rounded-full border border-white/5">
                                {mapData.gravity.toFixed(2)} g
                              </span>
                              <span className="bg-slate-950/60 text-sky-300 px-2 py-0.5 rounded-full border border-white/5">
                                Target: {mapData.targetTimeSec || 135}s
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                onClick={(e) => handleEditMap(mapData, e)}
                                className="p-1.5 rounded-full bg-slate-800/80 hover:bg-sky-500 hover:text-slate-950 text-slate-300 transition-colors cursor-pointer"
                                title="Edit in Level Editor"
                              >
                                <Edit className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDuplicateMap(mapData.id, e)}
                                className="p-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                                title="Duplicate Map"
                              >
                                <Copy className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDeleteMap(mapData.id, e)}
                                className="p-1.5 rounded-full bg-slate-800/80 hover:bg-red-500 hover:text-white text-slate-300 transition-colors cursor-pointer"
                                title="Delete Map"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-slate-100">Reset Default Maps?</h3>
                  <p className="text-xs text-amber-300/80 font-mono">Confirm map library reset</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                This will perform a complete factory reset on <strong className="text-white">all campaign planets</strong> and restore all starter templates to their factory defaults.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetCustomMapsToDefaults();
                    setCustomMaps(getSavedCustomMaps());
                    setImportNotification('Reset map library to official default planets!');
                    setTimeout(() => setImportNotification(null), 3000);
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Yes, Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
