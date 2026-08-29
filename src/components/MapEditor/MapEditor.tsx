import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  CustomMapData,
  CustomMapTheme,
  CustomObstacleData,
  CustomFuelData,
  CustomCargoPlatformData,
  CustomSignpostData,
  CustomTextNoteData,
  CustomVolcanoData,
  MapTextSize,
  MapTextStyle,
  MapTextAlign,
  CargoWeightClass,
  CargoType,
  EditorToolType,
  TerrainPoint,
} from '../../types';
import { CUSTOM_THEMES } from '../../game/customMapConverter';
import {
  saveCustomMap,
  exportMapToJSON,
  importMapFromJSON,
  createBlankCustomMap,
  generateRandomCustomMap,
  RandomMapOptions,
  getSavedCustomPalettes,
  saveCustomPalette,
  deleteCustomPalette,
} from '../../utils/customMapsStorage';
import { sound } from '../../game/sound';
import { useFullscreen } from '../../utils/fullscreen';
import {
  Play,
  Save,
  RotateCcw,
  Undo,
  Redo,
  Sliders,
  Share2,
  Download,
  Upload,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Maximize2,
  Grid,
  Trash2,
  Fuel,
  Rocket,
  Target,
  Mountain,
  Plus,
  Check,
  AlertCircle,
  Copy,
  Layers,
  ChevronRight,
  Move,
  Hand,
  X,
  Package,
  Box,
  Wand2,
  Sparkles,
  Shuffle,
  Truck,
  Signpost,
  Waypoints,
  Spline,
  Minus,
  Navigation,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowDownLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  ChevronDown,
  Palette,
  HelpCircle,
  BookOpen,
  Type,
  Square,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Activity,
  Gauge,
  Wind,
  Flame,
  ShieldAlert,
  Info,
  Zap,
  Snowflake,
  Bomb,
  Radio,
  Magnet,
  Atom,
} from 'lucide-react';
import { analyzeMapDifficulty, calculateMapDifficulty } from '../../utils/difficultyCalculator';

interface MapEditorProps {
  initialMap?: CustomMapData;
  onSave?: (map: CustomMapData) => void;
  onTestFly: (map: CustomMapData) => void;
  onExit?: () => void;
  onBackToMenu?: () => void;
}

// Distance from point to line segment
function pointToSegmentDistance(p: TerrainPoint, a: TerrainPoint, b: TerrainPoint): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(p.x - a.x, p.y - a.y);
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq));
  const projX = a.x + t * dx;
  const projY = a.y + t * dy;
  return Math.hypot(p.x - projX, p.y - projY);
}

// Ray-casting algorithm to test if a point is inside an obstacle polygon
function isPointInPolygon(p: TerrainPoint, vs: TerrainPoint[]): boolean {
  if (vs.length < 3) return false;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i].x, yi = vs[i].y;
    const xj = vs[j].x, yj = vs[j].y;
    const intersect = ((yi > p.y) !== (yj > p.y)) && (p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Test if point is either inside polygon OR within tolerance distance to any edge
function isPointNearPolygon(p: TerrainPoint, vs: TerrainPoint[], tolerance: number): boolean {
  if (isPointInPolygon(p, vs)) return true;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    if (pointToSegmentDistance(p, vs[i], vs[j]) <= tolerance) return true;
  }
  return false;
}

export const MapEditor: React.FC<MapEditorProps> = ({
  initialMap,
  onSave,
  onTestFly,
  onExit,
  onBackToMenu,
}) => {
  const [mapData, setMapData] = useState<CustomMapData>(() => initialMap || createBlankCustomMap());
  const [history, setHistory] = useState<CustomMapData[]>(() => [initialMap || createBlankCustomMap()]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Active Tool
  const [activeTool, setActiveTool] = useState<EditorToolType>('select');
  const [selectedObstacleStamp, setSelectedObstacleStamp] = useState<
    'arch' | 'island' | 'pillar' | 'spire' | 'shelf' | 'magma_shelf'
  >('shelf');
  const [selectedFuelAmount, setSelectedFuelAmount] = useState<number>(65);
  const [selectedCargoWeight, setSelectedCargoWeight] = useState<CargoWeightClass>('medium');
  const [selectedCargoType, setSelectedCargoType] = useState<CargoType>('standard');

  // Signpost tool settings
  const [selectedSignpostDirection, setSelectedSignpostDirection] = useState<CustomSignpostData['direction']>('right');
  const [selectedSignpostTarget, setSelectedSignpostTarget] = useState<CustomSignpostData['targetType']>('landing');
  const [selectedSignpostName, setSelectedSignpostName] = useState<string>('PRIMARY BASE LZ');
  const [selectedSignpostSubText, setSelectedSignpostSubText] = useState<string>('EXPEDITION OUTPOST');
  const [selectedSignpostColor, setSelectedSignpostColor] = useState<string>('#22c55e');

  // Text tool settings
  const [selectedTextContent, setSelectedTextContent] = useState<string>('SECTOR ALPHA');
  const [selectedTextSize, setSelectedTextSize] = useState<MapTextSize>('medium');
  const [selectedTextStyle, setSelectedTextStyle] = useState<MapTextStyle>('monospace');
  const [selectedTextColor, setSelectedTextColor] = useState<string>('#38bdf8');
  const [selectedTextBorder, setSelectedTextBorder] = useState<boolean>(true);
  const [selectedTextAlign, setSelectedTextAlign] = useState<MapTextAlign>('center');

  // Volcano tool settings
  const [selectedVolcanoTheme, setSelectedVolcanoTheme] = useState<'magma' | 'plasma' | 'toxic' | 'cryo'>('magma');
  const [selectedVolcanoWidth, setSelectedVolcanoWidth] = useState<number>(260);
  const [selectedVolcanoHeight, setSelectedVolcanoHeight] = useState<number>(160);
  const [selectedVolcanoEruptionHeight, setSelectedVolcanoEruptionHeight] = useState<number>(320);
  const [selectedVolcanoInterval, setSelectedVolcanoInterval] = useState<number>(4.5);
  const [selectedVolcanoDuration, setSelectedVolcanoDuration] = useState<number>(1.8);

  // Selection state
  const [selectedItem, setSelectedItem] = useState<{
    type: 'ground_node' | 'ceiling_node' | 'launch_pad' | 'landing_pad' | 'obstacle' | 'obstacle_point' | 'fuel' | 'cargo_platform' | 'signpost' | 'text_note' | 'volcano';
    index?: number;
    subIndex?: number;
    id?: string;
  } | null>(null);

  // Custom Polygon in-progress
  const [polyDraftPoints, setPolyDraftPoints] = useState<TerrainPoint[]>([]);

  // Canvas Viewport (Pan & Zoom)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [zoom, setZoom] = useState<number>(0.22);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 60, y: 40 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Multi-Touch (Two-Finger Pinch Zoom & Two-Finger Pan) State
  const activePointersRef = useRef<Map<number, { clientX: number; clientY: number }>>(new Map());
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);
  const pinchStartMidpointRef = useRef<{ screenX: number; screenY: number; worldX: number; worldY: number } | null>(null);
  const isPinchGesturingRef = useRef<boolean>(false);
  const touchSuppressionTimerRef = useRef<number>(0);

  // Dragging state and snapshots for reliable Undo
  const isDraggingRef = useRef(false);
  const dragStartWorldRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragHasMovedRef = useRef(false);
  const mouseWorldPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [mouseWorldDisplay, setMouseWorldDisplay] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Robust History References to prevent stale closure bugs
  const mapDataRef = useRef<CustomMapData>(mapData);
  mapDataRef.current = mapData;
  const historyRef = useRef<CustomMapData[]>([initialMap || createBlankCustomMap()]);
  const historyIndexRef = useRef<number>(0);

  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // UI Modals
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isRandomizerOpen, setIsRandomizerOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [randomPreset, setRandomPreset] = useState<'caves' | 'volcanic' | 'glacial' | 'asteroid' | 'vertical_shaft' | 'labyrinth' | 'random'>('caves');
  const [randomSizePreset, setRandomSizePreset] = useState<'compact' | 'standard' | 'large' | 'abyss'>('standard');
  const [randomComplexity, setRandomComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');
  const [randomIncludeCargo, setRandomIncludeCargo] = useState(true);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importFileSummary, setImportFileSummary] = useState<{
    name: string;
    author?: string;
    width: number;
    height: number;
    gravity: number;
    obstaclesCount: number;
    platformsCount: number;
  } | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [saveSuccessNotification, setSaveSuccessNotification] = useState(false);
  const [activeToolName, setActiveToolName] = useState<string | null>(null);
  const [toolNotification, setToolNotification] = useState<{ id: string; name: string } | null>(null);
  const toolNotificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom User Palettes state
  const [userPalettes, setUserPalettes] = useState<CustomMapTheme[]>(() => getSavedCustomPalettes());
  const [isCreatingPalette, setIsCreatingPalette] = useState(false);
  const [paletteDraft, setPaletteDraft] = useState<CustomMapTheme>({
    id: `custom-theme-${Date.now()}`,
    name: 'My Custom Palette',
    skyTop: '#050b14',
    skyBottom: '#0e1e38',
    terrainFill: '#111827',
    terrainBorder: '#06b6d4',
    terrainAccent: '#0891b2',
    gridColor: 'rgba(6, 182, 212, 0.08)',
    dustColor: '#22d3ee',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    starDensity: 1.2,
  });

  useEffect(() => {
    const handlePalettesChanged = () => {
      setUserPalettes(getSavedCustomPalettes());
    };
    window.addEventListener('gravity_lander_palettes_changed', handlePalettesChanged);
    return () => window.removeEventListener('gravity_lander_palettes_changed', handlePalettesChanged);
  }, []);

  // Keep track of the last explicitly saved/loaded map state to determine "Unsaved Changes"
  const [savedMapData, setSavedMapData] = useState<CustomMapData>(() => initialMap || createBlankCustomMap());
  // The map is "unsaved" if the current mapData is different from savedMapData by value.
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const theme = mapData.customTheme || CUSTOM_THEMES[mapData.themeId] || CUSTOM_THEMES.blue;

  const handleToolSelect = useCallback((toolId: EditorToolType, toolName: string) => {
    setActiveTool(toolId);
    setActiveToolName(toolName);
    
    // Show notification toast
    if (toolNotificationTimeoutRef.current) {
      clearTimeout(toolNotificationTimeoutRef.current);
    }
    setToolNotification({ id: Date.now().toString(), name: toolName });
    toolNotificationTimeoutRef.current = setTimeout(() => {
      setToolNotification(null);
    }, 2000);
  }, []);

  // Record Undo History with deep clone and ref tracking
  const pushHistory = useCallback((nextState: CustomMapData) => {
    const curIdx = historyIndexRef.current;
    const cloned = JSON.parse(JSON.stringify(nextState));
    const newHistory = historyRef.current.slice(0, curIdx + 1);
    newHistory.push(cloned);
    if (newHistory.length > 60) {
      newHistory.shift();
    }
    historyRef.current = newHistory;
    historyIndexRef.current = newHistory.length - 1;

    setHistory([...newHistory]);
    setHistoryIndex(newHistory.length - 1);
    setMapData(cloned);
    mapDataRef.current = cloned;
    setHasUnsavedChanges(true);
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      const nextIndex = historyIndexRef.current - 1;
      historyIndexRef.current = nextIndex;
      const targetState = JSON.parse(JSON.stringify(historyRef.current[nextIndex]));
      setHistoryIndex(nextIndex);
      setMapData(targetState);
      mapDataRef.current = targetState;
      setSelectedItem(null);
      sound.playClick();
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      const nextIndex = historyIndexRef.current + 1;
      historyIndexRef.current = nextIndex;
      const targetState = JSON.parse(JSON.stringify(historyRef.current[nextIndex]));
      setHistoryIndex(nextIndex);
      setMapData(targetState);
      mapDataRef.current = targetState;
      setSelectedItem(null);
      sound.playClick();
    }
  }, []);

  // Coordinate Conversion Helpers
  const screenToWorld = useCallback(
    (screenX: number, screenY: number): { x: number; y: number } => {
      return {
        x: Math.round((screenX - pan.x) / zoom),
        y: Math.round((screenY - pan.y) / zoom),
      };
    },
    [pan.x, pan.y, zoom]
  );

  const worldToScreen = useCallback(
    (worldX: number, worldY: number): { x: number; y: number } => {
      return {
        x: worldX * zoom + pan.x,
        y: worldY * zoom + pan.y,
      };
    },
    [pan.x, pan.y, zoom]
  );

  // Validation Warnings
  const getValidationReport = () => {
    const warnings: string[] = [];
    const lPad = mapData.launchPad;
    const tPad = mapData.landingPad;

    if (tPad.x <= lPad.x + 800) {
      warnings.push('Landing Pad is too close to Launch Pad.');
    }
    if (lPad.y < 300 || lPad.y > mapData.worldHeight - 200) {
      warnings.push('Launch Pad height is near map boundaries.');
    }
    if (tPad.y < 300 || tPad.y > mapData.worldHeight - 200) {
      warnings.push('Landing Pad height is near map boundaries.');
    }
    if (mapData.groundNodes.length < 3) {
      warnings.push('Add more ground control nodes for smooth terrain.');
    }

    return {
      isValid: warnings.length === 0,
      warnings,
    };
  };

  const validation = getValidationReport();

  // Dynamic Difficulty & Threat Analysis (Recomputed on every terrain, physics, hazard, cargo change)
  const difficultyAnalysis = React.useMemo(() => analyzeMapDifficulty(mapData), [mapData]);

  // Active difficulty resolves to manual user override if set, or auto-calculated
  const isManualDifficulty = mapData.difficultyMode === 'manual';
  const activeDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme' =
    isManualDifficulty && mapData.difficulty
      ? mapData.difficulty
      : difficultyAnalysis.difficulty;

  const difficultyBadgeConfig: Record<
    'Easy' | 'Medium' | 'Hard' | 'Extreme',
    {
      label: string;
      bg: string;
      border: string;
      text: string;
      activeBorder: string;
      activeRing: string;
      glow: string;
      dot: string;
      desc: string;
    }
  > = {
    Easy: {
      label: 'Easy',
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-700/60',
      text: 'text-emerald-300',
      activeBorder: 'border-emerald-400 bg-emerald-950/90',
      activeRing: 'ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      glow: 'rgba(16,185,129,0.4)',
      dot: 'bg-emerald-400',
      desc: 'Gentle gravity, wide corridors, forgiving landings',
    },
    Medium: {
      label: 'Medium',
      bg: 'bg-amber-950/60',
      border: 'border-amber-700/60',
      text: 'text-amber-300',
      activeBorder: 'border-amber-400 bg-amber-950/90',
      activeRing: 'ring-2 ring-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.35)]',
      glow: 'rgba(245,158,11,0.4)',
      dot: 'bg-amber-400',
      desc: 'Moderate pull, standard hazards, balanced flight',
    },
    Hard: {
      label: 'Hard',
      bg: 'bg-orange-950/60',
      border: 'border-orange-700/60',
      text: 'text-orange-300',
      activeBorder: 'border-orange-400 bg-orange-950/90',
      activeRing: 'ring-2 ring-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.35)]',
      glow: 'rgba(249,115,22,0.4)',
      dot: 'bg-orange-400',
      desc: 'Heavy gravity, tight caverns, precision touch required',
    },
    Extreme: {
      label: 'Extreme',
      bg: 'bg-rose-950/60',
      border: 'border-rose-700/60',
      text: 'text-rose-300',
      activeBorder: 'border-rose-400 bg-rose-950/90',
      activeRing: 'ring-2 ring-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.35)]',
      glow: 'rgba(244,63,94,0.4)',
      dot: 'bg-rose-400',
      desc: 'Punishing gravity, lethal obstacles, zero margin for error',
    },
  };

  // Handle Save
  const handleSaveMap = () => {
    const mapToSave: CustomMapData = {
      ...mapData,
      difficulty: activeDifficulty,
      difficultyMode: mapData.difficultyMode || (isManualDifficulty ? 'manual' : 'auto'),
    };
    saveCustomMap(mapToSave);
    setMapData(mapToSave);
    setSavedMapData(mapToSave);
    setHasUnsavedChanges(false);
    if (onSave) {
      onSave(mapToSave);
    }
    setSaveSuccessNotification(true);
    sound.playLandingChime();
    setTimeout(() => setSaveSuccessNotification(false), 2500);
  };

  const handleSaveAsNew = () => {
    const newMap: CustomMapData = {
      ...mapData,
      id: `custom-map-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: `${mapData.name} (Copy)`,
      difficulty: activeDifficulty,
      difficultyMode: mapData.difficultyMode || (isManualDifficulty ? 'manual' : 'auto'),
    };
    setMapData(newMap);
    setSavedMapData(newMap);
    setHasUnsavedChanges(false);
    setHistory([newMap]);
    setHistoryIndex(0);
    saveCustomMap(newMap);
    if (onSave) onSave(newMap);
    setSaveSuccessNotification(true);
    sound.playLandingChime();
    setTimeout(() => setSaveSuccessNotification(false), 2500);
  };

  const handleDiscardChanges = () => {
    setMapData(savedMapData);
    setHistory([savedMapData]);
    setHistoryIndex(0);
    setHasUnsavedChanges(false);
    setSelectedItem(null);
  };

  const handleGenerateRandomMap = (presetOverride?: 'caves' | 'volcanic' | 'glacial' | 'asteroid' | 'vertical_shaft' | 'labyrinth' | 'random') => {
    sound.playClick();
    const chosenPreset = presetOverride || randomPreset;
    let width = 7600;
    let height = 2800;
    if (randomSizePreset === 'compact') {
      width = 5400;
      height = 2200;
    } else if (randomSizePreset === 'large') {
      width = 9600;
      height = 4200;
    } else if (randomSizePreset === 'abyss') {
      width = 8000;
      height = 6800;
    }

    const generated = generateRandomCustomMap({
      preset: chosenPreset,
      width,
      height,
      complexity: randomComplexity,
      includeCargo: randomIncludeCargo,
    });

    pushHistory(generated);
    setSelectedItem(null);
    setIsRandomizerOpen(false);
    setPan({ x: 40, y: 40 });
    setZoom(0.18);
  };

  const handleExit = () => {
    if (onExit) onExit();
    else if (onBackToMenu) onBackToMenu();
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveMap();
      } else if (e.key === 'v' || e.key === 'V') {
        handleToolSelect('select', 'Select (V)');
      } else if (e.key === 'h' || e.key === 'H') {
        handleToolSelect('pan', 'Pan (H)');
      } else if (e.key === 'g' || e.key === 'G') {
        handleToolSelect('ground', 'Ground (G)');
      } else if (e.key === 'c' || e.key === 'C') {
        handleToolSelect('ceiling', 'Ceiling (C)');
      } else if (e.key === 't' || e.key === 'T') {
        handleToolSelect('text', 'Text Note (T)');
      } else if (e.key === 'l' || e.key === 'L') {
        handleToolSelect('cave_layer', 'Cave Layer (L)');
      } else if (e.key === 'o' || e.key === 'O') {
        handleToolSelect('volcano', 'Volcano Hazard (O)');
      } else if (e.key === 'f' || e.key === 'F') {
        handleToolSelect('fuel', 'Fuel (F)');
      } else if (e.key === 's' || e.key === 'S') {
        handleToolSelect('signpost', 'Signpost (S)');
      } else if (e.key === 'e' || e.key === 'E') {
        handleToolSelect('eraser', 'Eraser (E)');
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedItem) {
          handleDeleteItem();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, selectedItem, mapData]);

  // Prevent default mobile browser pinch/drag gestures on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preventTouchDefault = (e: TouchEvent) => {
      if (e.touches.length >= 2 || e.target === canvas) {
        e.preventDefault();
      }
    };

    canvas.addEventListener('touchstart', preventTouchDefault, { passive: false });
    canvas.addEventListener('touchmove', preventTouchDefault, { passive: false });
    canvas.addEventListener('touchend', preventTouchDefault, { passive: false });
    canvas.addEventListener('touchcancel', preventTouchDefault, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', preventTouchDefault);
      canvas.removeEventListener('touchmove', preventTouchDefault);
      canvas.removeEventListener('touchend', preventTouchDefault);
      canvas.removeEventListener('touchcancel', preventTouchDefault);
    };
  }, []);

  // Delete currently selected item
  const handleDeleteItem = () => {
    if (!selectedItem) return;

    if (selectedItem.type === 'ground_node' && selectedItem.index !== undefined) {
      if (mapData.groundNodes.length > 2) {
        const next = {
          ...mapData,
          groundNodes: mapData.groundNodes.filter((_, i) => i !== selectedItem.index),
        };
        pushHistory(next);
        setSelectedItem(null);
      }
    } else if (selectedItem.type === 'ceiling_node' && selectedItem.index !== undefined) {
      if (mapData.ceilingNodes.length > 2) {
        const next = {
          ...mapData,
          ceilingNodes: mapData.ceilingNodes.filter((_, i) => i !== selectedItem.index),
        };
        pushHistory(next);
        setSelectedItem(null);
      }
    } else if (selectedItem.type === 'obstacle_point' && selectedItem.index !== undefined) {
      const obsIndex = selectedItem.index;
      const pointIndex = selectedItem.subIndex;
      const obs = mapData.obstacles[obsIndex];
      if (obs) {
        if (obs.points.length > 3 && pointIndex !== undefined) {
          const nextObstacles = mapData.obstacles.map((o, idx) => {
            if (idx !== obsIndex) return o;
            return {
              ...o,
              points: o.points.filter((_, pIdx) => pIdx !== pointIndex),
            };
          });
          pushHistory({ ...mapData, obstacles: nextObstacles });
          setSelectedItem(null);
        } else {
          const next = {
            ...mapData,
            obstacles: mapData.obstacles.filter((_, i) => i !== obsIndex),
          };
          pushHistory(next);
          setSelectedItem(null);
        }
      }
    } else if (selectedItem.type === 'obstacle' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        obstacles: mapData.obstacles.filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    } else if (selectedItem.type === 'fuel' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        fuelPickups: mapData.fuelPickups.filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    } else if (selectedItem.type === 'cargo_platform' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        cargoPlatforms: (mapData.cargoPlatforms || []).filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    } else if (selectedItem.type === 'signpost' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        signposts: (mapData.signposts || []).filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    } else if (selectedItem.type === 'text_note' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        textNotes: (mapData.textNotes || []).filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    } else if (selectedItem.type === 'volcano' && selectedItem.index !== undefined) {
      const next = {
        ...mapData,
        volcanoes: (mapData.volcanoes || []).filter((_, i) => i !== selectedItem.index),
      };
      pushHistory(next);
      setSelectedItem(null);
    }
  };

  // Stamp Obstacle Presets at coordinates
  const stampPresetObstacle = (
    type: 'arch' | 'island' | 'pillar' | 'spire' | 'shelf' | 'magma_shelf',
    cx: number,
    cy: number
  ) => {
    let points: TerrainPoint[] = [];
    const id = `obs-${Date.now()}`;

    if (type === 'shelf') {
      points = [
        { x: cx - 800, y: cy - 25 },
        { x: cx + 800, y: cy - 25 },
        { x: cx + 750, y: cy + 75 },
        { x: cx - 750, y: cy + 75 },
      ];
    } else if (type === 'magma_shelf') {
      points = [
        { x: cx - 950, y: cy },
        { x: cx - 250, y: cy - 35 },
        { x: cx + 350, y: cy + 15 },
        { x: cx + 950, y: cy },
        { x: cx + 900, y: cy + 95 },
        { x: cx - 900, y: cy + 95 },
      ];
    } else if (type === 'arch') {
      points = [
        { x: cx - 400, y: cy },
        { x: cx, y: cy - 40 },
        { x: cx + 400, y: cy },
        { x: cx + 360, y: cy + 90 },
        { x: cx, y: cy + 120 },
        { x: cx - 360, y: cy + 90 },
      ];
    } else if (type === 'island') {
      points = [
        { x: cx - 350, y: cy - 20 },
        { x: cx + 350, y: cy - 20 },
        { x: cx + 300, y: cy + 80 },
        { x: cx - 300, y: cy + 80 },
      ];
    } else if (type === 'pillar') {
      points = [
        { x: cx - 80, y: cy - 350 },
        { x: cx + 80, y: cy - 350 },
        { x: cx + 110, y: cy + 350 },
        { x: cx - 110, y: cy + 350 },
      ];
    } else if (type === 'spire') {
      points = [
        { x: cx - 70, y: cy - 200 },
        { x: cx + 70, y: cy - 200 },
        { x: cx + 20, y: cy + 200 },
        { x: cx - 20, y: cy + 200 },
      ];
    }

    const newObs: CustomObstacleData = {
      id,
      name: `${type.toUpperCase().replace('_', ' ')} Layer`,
      type: type === 'shelf' || type === 'magma_shelf' ? 'strata' : type,
      points,
    };

    const next = {
      ...mapData,
      obstacles: [...mapData.obstacles, newObs],
    };
    pushHistory(next);
  };

  // Instant Multi-Level Cavern Generator
  const addMultiLevelCavernTier = (tier: 2 | 3 | 'vertical_shaft') => {
    const w = mapData.worldWidth || 7200;
    const h = mapData.worldHeight || 2400;
    const newObstacles: CustomObstacleData[] = [];

    if (tier === 2) {
      // 2-Level Cavern (Horizontal shelf dividing map with transit shafts)
      newObstacles.push({
        id: `cave-tier1-${Date.now()}`,
        name: 'Mid Cavern Shelf',
        type: 'strata',
        points: [
          { x: Math.round(w * 0.18), y: Math.round(h * 0.48) },
          { x: Math.round(w * 0.82), y: Math.round(h * 0.48) },
          { x: Math.round(w * 0.80), y: Math.round(h * 0.54) },
          { x: Math.round(w * 0.20), y: Math.round(h * 0.54) },
        ],
      });
    } else if (tier === 3) {
      // 3-Level Cavern (Upper Skyway, Mid Chasm, Deep Abyss)
      newObstacles.push({
        id: `cave-tier1-${Date.now()}`,
        name: 'Upper Skyway Shelf',
        type: 'strata',
        points: [
          { x: Math.round(w * 0.14), y: Math.round(h * 0.33) },
          { x: Math.round(w * 0.74), y: Math.round(h * 0.33) },
          { x: Math.round(w * 0.72), y: Math.round(h * 0.38) },
          { x: Math.round(w * 0.16), y: Math.round(h * 0.38) },
        ],
      });
      newObstacles.push({
        id: `cave-tier2-${Date.now() + 1}`,
        name: 'Lower Abyss Stratum',
        type: 'strata',
        points: [
          { x: Math.round(w * 0.26), y: Math.round(h * 0.66) },
          { x: Math.round(w * 0.86), y: Math.round(h * 0.66) },
          { x: Math.round(w * 0.84), y: Math.round(h * 0.71) },
          { x: Math.round(w * 0.28), y: Math.round(h * 0.71) },
        ],
      });
    } else if (tier === 'vertical_shaft') {
      const stepH = h / 5;
      for (let i = 1; i <= 3; i++) {
        const isLeft = i % 2 === 1;
        newObstacles.push({
          id: `vert-tier-${i}-${Date.now() + i}`,
          name: `Shaft Tier ${i}`,
          type: 'strata',
          points: isLeft
            ? [
                { x: 100, y: Math.round(stepH * i) },
                { x: Math.round(w * 0.65), y: Math.round(stepH * i) },
                { x: Math.round(w * 0.62), y: Math.round(stepH * i + 80) },
                { x: 100, y: Math.round(stepH * i + 80) },
              ]
            : [
                { x: Math.round(w * 0.35), y: Math.round(stepH * i) },
                { x: w - 100, y: Math.round(stepH * i) },
                { x: w - 100, y: Math.round(stepH * i + 80) },
                { x: Math.round(w * 0.38), y: Math.round(stepH * i + 80) },
              ],
        });
      }
    }

    const next = {
      ...mapData,
      obstacles: [...mapData.obstacles, ...newObstacles],
    };
    pushHistory(next);
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Fill Viewport Background
      ctx.fillStyle = theme.skyTop;
      ctx.fillRect(0, 0, width, height);

      // 2. World Space Transform
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // 2a. Sky gradient inside world boundaries
      const skyGrad = ctx.createLinearGradient(0, 0, 0, mapData.worldHeight);
      skyGrad.addColorStop(0, theme.skyTop);
      skyGrad.addColorStop(1, theme.skyBottom);
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, mapData.worldWidth, mapData.worldHeight);

      // 2b. Coordinate Grid
      if (showGrid) {
        ctx.strokeStyle = theme.gridColor;
        ctx.lineWidth = 1.5 / zoom;
        const gridStep = 400;

        ctx.beginPath();
        for (let gx = 0; gx <= mapData.worldWidth; gx += gridStep) {
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, mapData.worldHeight);
        }
        for (let gy = 0; gy <= mapData.worldHeight; gy += gridStep) {
          ctx.moveTo(0, gy);
          ctx.lineTo(mapData.worldWidth, gy);
        }
        ctx.stroke();

        // Distance / Sector Markers
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.font = `${Math.max(14, Math.round(16 / zoom))}px monospace`;
        ctx.textAlign = 'left';
        for (let gx = 800; gx < mapData.worldWidth; gx += 800) {
          ctx.fillText(`${gx}m`, gx + 10, 40 / zoom);
        }
      }

      // 2c. Outer Boundary Frame
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3 / zoom;
      ctx.strokeRect(0, 0, mapData.worldWidth, mapData.worldHeight);

      // 2d. Render Ground Terrain (Straight or Parametric Catmull-Rom)
      const groundNodes = mapData.groundNodes;
      const isCurved = mapData.terrainLineStyle === 'curved';
      if (groundNodes.length > 0) {
        ctx.beginPath();
        ctx.moveTo(groundNodes[0].x, mapData.worldHeight);
        ctx.lineTo(groundNodes[0].x, groundNodes[0].y);

        if (groundNodes.length === 1 || !isCurved) {
          // Straight polygonal lines (User preference for authentic sharp caves)
          for (let i = 1; i < groundNodes.length; i++) {
            ctx.lineTo(groundNodes[i].x, groundNodes[i].y);
          }
        } else {
          for (let i = 0; i < groundNodes.length - 1; i++) {
            const p0 = i > 0 ? groundNodes[i - 1] : groundNodes[0];
            const p1 = groundNodes[i];
            const p2 = groundNodes[i + 1];
            const p3 = i + 2 < groundNodes.length ? groundNodes[i + 2] : groundNodes[i + 1];

            const segSteps = 20;
            for (let s = 1; s <= segSteps; s++) {
              const t = s / segSteps;
              const t2 = t * t;
              const t3 = t2 * t;

              const sx =
                0.5 *
                (2 * p1.x +
                  (-p0.x + p2.x) * t +
                  (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                  (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
              const sy =
                0.5 *
                (2 * p1.y +
                  (-p0.y + p2.y) * t +
                  (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                  (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
              ctx.lineTo(sx, sy);
            }
          }
        }

        ctx.lineTo(groundNodes[groundNodes.length - 1].x, mapData.worldHeight);
        ctx.closePath();

        ctx.fillStyle = theme.terrainFill;
        ctx.fill();

        ctx.strokeStyle = theme.terrainBorder;
        ctx.lineWidth = Math.max(3, 4 / zoom);
        ctx.stroke();
      }

      // 2e. Render Ceiling Cavern Curve (Straight or Parametric Catmull-Rom)
      const ceilingNodes = mapData.ceilingNodes;
      if (ceilingNodes.length > 0) {
        ctx.beginPath();
        ctx.moveTo(ceilingNodes[0].x, 0);
        ctx.lineTo(ceilingNodes[0].x, ceilingNodes[0].y);

        if (ceilingNodes.length === 1 || !isCurved) {
          // Straight polygonal lines (User preference for authentic sharp caves)
          for (let i = 1; i < ceilingNodes.length; i++) {
            ctx.lineTo(ceilingNodes[i].x, ceilingNodes[i].y);
          }
        } else {
          for (let i = 0; i < ceilingNodes.length - 1; i++) {
            const p0 = i > 0 ? ceilingNodes[i - 1] : ceilingNodes[0];
            const p1 = ceilingNodes[i];
            const p2 = ceilingNodes[i + 1];
            const p3 = i + 2 < ceilingNodes.length ? ceilingNodes[i + 2] : ceilingNodes[i + 1];

            const segSteps = 20;
            for (let s = 1; s <= segSteps; s++) {
              const t = s / segSteps;
              const t2 = t * t;
              const t3 = t2 * t;

              const sx =
                0.5 *
                (2 * p1.x +
                  (-p0.x + p2.x) * t +
                  (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                  (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
              const sy =
                0.5 *
                (2 * p1.y +
                  (-p0.y + p2.y) * t +
                  (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                  (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);
              ctx.lineTo(sx, sy);
            }
          }
        }

        ctx.lineTo(ceilingNodes[ceilingNodes.length - 1].x, 0);
        ctx.closePath();

        ctx.fillStyle = theme.terrainFill;
        ctx.fill();

        ctx.strokeStyle = theme.terrainBorder;
        ctx.lineWidth = Math.max(3, 4 / zoom);
        ctx.stroke();
      }

      // 2f. Render Obstacles
      for (let i = 0; i < mapData.obstacles.length; i++) {
        const obs = mapData.obstacles[i];
        if (obs.points.length < 3) continue;

        ctx.beginPath();
        ctx.moveTo(obs.points[0].x, obs.points[0].y);
        for (let j = 1; j < obs.points.length; j++) {
          ctx.lineTo(obs.points[j].x, obs.points[j].y);
        }
        ctx.closePath();

        const isSelected = selectedItem?.type === 'obstacle' && selectedItem.index === i;
        ctx.fillStyle = isSelected ? '#1e293b' : theme.terrainFill;
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#38bdf8' : theme.terrainAccent;
        ctx.lineWidth = isSelected ? 4 : 2.5;
        ctx.stroke();

        // Draw obstacle vertex handles if selected
        if (isSelected) {
          for (let j = 0; j < obs.points.length; j++) {
            const pt = obs.points[j];
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 8 / zoom, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2 / zoom;
            ctx.stroke();
          }
        }
      }

      // 2g. Render Polygon In-Progress Draft
      if (polyDraftPoints.length > 0) {
        ctx.beginPath();
        ctx.moveTo(polyDraftPoints[0].x, polyDraftPoints[0].y);
        for (let j = 1; j < polyDraftPoints.length; j++) {
          ctx.lineTo(polyDraftPoints[j].x, polyDraftPoints[j].y);
        }
        ctx.lineTo(mouseWorldPosRef.current.x, mouseWorldPosRef.current.y);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3 / zoom;
        ctx.setLineDash([8 / zoom, 4 / zoom]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2h. Render Launch Pad Platform
      const lPad = mapData.launchPad;
      const isLSelected = selectedItem?.type === 'launch_pad';
      ctx.fillStyle = isLSelected ? '#0284c7' : '#0369a1';
      ctx.fillRect(lPad.x - lPad.width / 2, lPad.y - 12, lPad.width, 24);
      ctx.strokeStyle = isLSelected ? '#38bdf8' : '#7dd3fc';
      ctx.lineWidth = 3;
      ctx.strokeRect(lPad.x - lPad.width / 2, lPad.y - 12, lPad.width, 24);

      // Launch Pad Beacon Lights
      ctx.fillStyle = '#38bdf8';
      ctx.font = `bold ${Math.round(18 / zoom)}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('🚀 LAUNCH PLATFORM', lPad.x, lPad.y - 30);

      // 2i. Render Landing Pad Platform (LZ Base)
      const tPad = mapData.landingPad;
      const isTSelected = selectedItem?.type === 'landing_pad';
      const padX1 = tPad.x - tPad.width / 2;
      const padX2 = tPad.x + tPad.width / 2;

      // Bedrock hydraulic pistons
      ctx.fillStyle = '#090d16';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      const pCount = 5;
      const pSpacing = (tPad.width - 16) / (pCount - 1);
      for (let p = 0; p < pCount; p++) {
        const px = padX1 + p * pSpacing;
        ctx.fillRect(px, tPad.y + 10, 16, 26);
        ctx.strokeRect(px, tPad.y + 10, 16, 26);
      }

      // Left Flank - Outpost Hab Pod
      ctx.fillStyle = '#0b1120';
      ctx.strokeStyle = isTSelected ? '#38bdf8' : '#0284c7';
      ctx.lineWidth = 2;
      ctx.fillRect(padX1 - 32, tPad.y - 24, 28, 36);
      ctx.strokeRect(padX1 - 32, tPad.y - 24, 28, 36);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(padX1 - 26, tPad.y - 18, 16, 6);

      // Right Flank - Recovery Crane Gantry
      ctx.fillStyle = '#0b1120';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.fillRect(padX2 + 4, tPad.y - 22, 22, 34);
      ctx.strokeRect(padX2 + 4, tPad.y - 22, 22, 34);
      ctx.strokeStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(padX2 + 8, tPad.y - 22);
      ctx.lineTo(padX2 - 4, tPad.y - 36);
      ctx.stroke();

      // Main Deck Surface
      ctx.fillStyle = isTSelected ? '#0f172a' : '#0b0f19';
      ctx.fillRect(padX1, tPad.y - 6, tPad.width, 18);
      ctx.strokeStyle = isTSelected ? '#38bdf8' : '#0284c7';
      ctx.lineWidth = isTSelected ? 3.5 : 2.5;
      ctx.strokeRect(padX1, tPad.y - 6, tPad.width, 18);

      // Center Touchdown Decals & Runway Chevrons
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(tPad.x, tPad.y + 3, 20, 5, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = isTSelected ? '#38bdf8' : '#7dd3fc';
      ctx.font = `bold ${Math.round(17 / zoom)}px monospace`;
      ctx.textAlign = 'center';
      ctx.fillText('🎯 PRIMARY RECOVERY LZ', tPad.x, tPad.y - 38);

      // 2j. Render Fuel Pickups (Yellow Gas Pump Dispenser Icon)
      for (let i = 0; i < mapData.fuelPickups.length; i++) {
        const fuel = mapData.fuelPickups[i];
        const isFSelected = selectedItem?.type === 'fuel' && selectedItem.index === i;

        ctx.save();
        ctx.translate(fuel.x, fuel.y);

        // Selection / Pulsing Halo
        ctx.fillStyle = isFSelected ? 'rgba(56, 189, 248, 0.4)' : 'rgba(234, 179, 8, 0.3)';
        ctx.beginPath();
        ctx.arc(0, 0, 26, 0, Math.PI * 2);
        ctx.fill();

        // Main Pump Body (Yellow)
        ctx.fillStyle = '#eab308';
        ctx.strokeStyle = isFSelected ? '#38bdf8' : '#fef08a';
        ctx.lineWidth = isFSelected ? 3.0 : 2.0;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-12, -16, 20, 32, [4, 4, 2, 2]);
        } else {
          ctx.rect(-12, -16, 20, 32);
        }
        ctx.fill();
        ctx.stroke();

        // Top Hood Cap
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(-10, -19, 16, 4);

        // Meter Screen
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.2;
        ctx.fillRect(-9, -12, 14, 11);
        ctx.strokeRect(-9, -12, 14, 11);

        // Fuel Amount Text
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${fuel.amount}`, -2, -6.5);

        // Base foundation plate
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-14, 14, 24, 5);

        // Flexible Fuel Hose & Nozzle (Right flank)
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(8, -10);
        ctx.quadraticCurveTo(18, -4, 18, 6);
        ctx.quadraticCurveTo(18, 14, 13, 14);
        ctx.stroke();

        // Nozzle Handle
        ctx.fillStyle = '#ca8a04';
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(8, -11);
        ctx.lineTo(12, -15);
        ctx.lineTo(15, -12);
        ctx.lineTo(11, -8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }

      // 2k. Render Cargo Platforms (Pickup Depots & Drop Zones)
      const cargoPlatforms = mapData.cargoPlatforms || [];
      for (let i = 0; i < cargoPlatforms.length; i++) {
        const cp = cargoPlatforms[i];
        const isSelected = selectedItem?.type === 'cargo_platform' && selectedItem.index === i;
        const isPickup = cp.type === 'pickup';

        ctx.save();
        ctx.translate(cp.x, cp.y);

        // Selection Aura
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3 / zoom;
          ctx.setLineDash([8 / zoom, 4 / zoom]);
          ctx.strokeRect(-cp.width / 2 - 10, -50, cp.width + 20, 80);
          ctx.setLineDash([]);
        }

        // Platform Base Deck
        if (cp.type === 'vehicle_depot') {
          // Logistics Platform Base Deck (Wide 480m Logistics Deck)
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-cp.width / 2, -14, cp.width, 28);
          ctx.strokeStyle = isSelected ? '#38bdf8' : '#0284c7';
          ctx.lineWidth = 3.0;
          ctx.strokeRect(-cp.width / 2, -14, cp.width, 28);

          // Staging Bay Hazard Chevrons
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 2.0;
          for (let sx = -cp.width / 2 + 15; sx < cp.width / 2 - 15; sx += 24) {
            ctx.beginPath();
            ctx.moveTo(sx - 5, 10);
            ctx.lineTo(sx, -10);
            ctx.lineTo(sx + 5, 10);
            ctx.stroke();
          }

          // Boundary Stanchion Light Beacons
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(-cp.width / 2 + 2, -36, 8, 22);
          ctx.fillRect(cp.width / 2 - 10, -36, 8, 22);
          ctx.beginPath();
          ctx.arc(-cp.width / 2 + 6, -38, 5, 0, Math.PI * 2);
          ctx.arc(cp.width / 2 - 6, -38, 5, 0, Math.PI * 2);
          ctx.fill();

          // Parked Planetary Rover (Left Side)
          ctx.fillStyle = '#f59e0b';
          ctx.fillRect(-170, -36, 50, 22);
          ctx.fillStyle = '#38bdf8';
          ctx.fillRect(-155, -45, 22, 10); // Cabin
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(-160, -14, 8, 0, Math.PI * 2);
          ctx.arc(-130, -14, 8, 0, Math.PI * 2);
          ctx.fill();

          // Parked Heavy Mining Truck (Right Side)
          ctx.fillStyle = '#0284c7';
          ctx.fillRect(-95, -40, 62, 26);
          ctx.fillStyle = '#334155';
          ctx.fillRect(-65, -52, 24, 14); // High Cab
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(-82, -14, 10, 0, Math.PI * 2);
          ctx.arc(-45, -14, 10, 0, Math.PI * 2);
          ctx.fill();

          // Label
          ctx.fillStyle = '#38bdf8';
          ctx.font = `bold ${Math.max(11, Math.round(13 / zoom))}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(`🚛 ${cp.label || 'SURFACE VEHICLE & ROVER LOGISTICS BASE'}`, 0, -58);
        } else if (isPickup) {
          const cType = cp.cargoType || 'standard';
          const weight = cp.weightClass || 'medium';

          // Base color theme depending on cargo type
          let baseAccent = '#f59e0b';
          let podColor = weight === 'heavy' ? '#ef4444' : weight === 'light' ? '#38bdf8' : '#f59e0b';
          let podBorder = weight === 'heavy' ? '#b91c1c' : weight === 'light' ? '#0284c7' : '#d97706';
          let typeIcon = '📦';
          let typeName = `${cType.toUpperCase()}`;

          if (cType === 'explosive') {
            baseAccent = '#ef4444';
            podColor = '#f59e0b';
            podBorder = '#dc2626';
            typeIcon = '💣';
          } else if (cType === 'cryogenic') {
            baseAccent = '#38bdf8';
            podColor = '#67e8f9';
            podBorder = '#06b6d4';
            typeIcon = '❄️';
          } else if (cType === 'isotope') {
            baseAccent = '#c084fc';
            podColor = '#c084fc';
            podBorder = '#9333ea';
            typeIcon = '⚛️';
          } else if (cType === 'magnetic') {
            baseAccent = '#ea580c';
            podColor = '#fb923c';
            podBorder = '#ea580c';
            typeIcon = '🧲';
          } else if (cType === 'plasma') {
            baseAccent = '#10b981';
            podColor = '#2dd4bf';
            podBorder = '#059669';
            typeIcon = '⚡';
          }

          // Platform Deck
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(-cp.width / 2, -10, cp.width, 20);
          ctx.strokeStyle = isSelected ? '#38bdf8' : baseAccent;
          ctx.lineWidth = 2.5;
          ctx.strokeRect(-cp.width / 2, -10, cp.width, 20);

          // Crane Gantries / Docking Pylons
          ctx.fillStyle = baseAccent;
          ctx.fillRect(-cp.width / 2, -28, 8, 20);
          ctx.fillRect(cp.width / 2 - 8, -28, 8, 20);

          // Specialized Type-Specific Hardware Module
          if (cType === 'explosive') {
            // Blast Wall
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(-cp.width / 2 - 12, -34, 10, 30);
            ctx.strokeRect(-cp.width / 2 - 12, -34, 10, 30);
          } else if (cType === 'cryogenic') {
            // Cryo Dewar
            ctx.fillStyle = '#0284c7';
            ctx.fillRect(-cp.width / 2 - 12, -28, 10, 24);
            ctx.fillStyle = '#e0f2fe';
            ctx.beginPath();
            ctx.arc(-cp.width / 2 - 7, -28, 5, Math.PI, 0);
            ctx.fill();
          } else if (cType === 'isotope') {
            // Magnetic Ring
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(-cp.width / 2 - 6, -20, 8, 0, Math.PI * 2);
            ctx.stroke();
          } else if (cType === 'magnetic') {
            // Copper Coil
            ctx.fillStyle = '#b45309';
            ctx.fillRect(-cp.width / 2 - 12, -28, 10, 24);
          } else if (cType === 'plasma') {
            // Glowing Green Tube
            ctx.fillStyle = '#10b981';
            ctx.fillRect(-cp.width / 2 - 10, -30, 8, 26);
          }

          // Cargo Container Box
          ctx.fillStyle = podColor;
          ctx.fillRect(-16, -34, 32, 24);
          ctx.strokeStyle = podBorder;
          ctx.lineWidth = 2;
          ctx.strokeRect(-16, -34, 32, 24);

          // Container Hook Ring
          ctx.beginPath();
          ctx.arc(0, -38, 5, 0, Math.PI * 2);
          ctx.strokeStyle = '#f8fafc';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Container Inner Graphic / Detail
          if (cType === 'explosive') {
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(-8, -26, 16, 8);
          } else if (cType === 'cryogenic') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-8, -26, 16, 8);
          } else if (cType === 'isotope') {
            ctx.fillStyle = '#9333ea';
            ctx.beginPath();
            ctx.arc(0, -22, 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (cType === 'plasma') {
            ctx.fillStyle = '#34d399';
            ctx.fillRect(-6, -28, 12, 12);
          }

          // Label
          ctx.fillStyle = isSelected ? '#38bdf8' : '#f8fafc';
          ctx.font = `bold ${Math.max(10, Math.round(12 / zoom))}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(`${typeIcon} ${cp.label || typeName} (${weight.toUpperCase()})`, 0, -48);
        } else {
          ctx.fillStyle = '#042f2e';
          ctx.fillRect(-cp.width / 2, -10, cp.width, 20);
          ctx.strokeStyle = isSelected ? '#38bdf8' : '#14b8a6';
          ctx.lineWidth = 2.5;
          ctx.strokeRect(-cp.width / 2, -10, cp.width, 20);

          // Crane Gantries / Docking Pylons
          ctx.fillStyle = '#14b8a6';
          ctx.fillRect(-cp.width / 2, -28, 8, 20);
          ctx.fillRect(cp.width / 2 - 8, -28, 8, 20);

          // Drop Zone Holographic Receiver
          ctx.fillStyle = 'rgba(20, 184, 166, 0.2)';
          ctx.fillRect(-cp.width / 2 + 10, -35, cp.width - 20, 25);
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
          ctx.setLineDash([4 / zoom, 4 / zoom]);
          ctx.strokeRect(-cp.width / 2 + 10, -35, cp.width - 20, 25);
          ctx.setLineDash([]);

          ctx.fillStyle = '#2dd4bf';
          ctx.font = `bold ${Math.max(10, Math.round(12 / zoom))}px monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(`📥 ${cp.label || 'DROP ZONE'}`, 0, -45);
        }

        ctx.restore();
      }

      // 2ka. Render Tactical Waypoint Signposts (Directional Base Clues)
      const signposts = mapData.signposts || [];
      for (let i = 0; i < signposts.length; i++) {
        const sign = signposts[i];
        const isSelected = selectedItem?.type === 'signpost' && selectedItem.index === i;
        const signColor = sign.color || '#22c55e';

        ctx.save();
        ctx.translate(sign.x, sign.y);

        // Hanging chains / support anchors
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-50, -28);
        ctx.lineTo(-50, -65);
        ctx.moveTo(50, -28);
        ctx.lineTo(50, -65);
        ctx.stroke();

        const signW = 200;
        const signH = 68;
        const halfW = signW * 0.5;
        const halfH = signH * 0.5;

        // Selection highlight ring
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = Math.max(2.5, 3 / zoom);
          ctx.setLineDash([8 / zoom, 4 / zoom]);
          ctx.strokeRect(-halfW - 8, -halfH - 8, signW + 16, signH + 16);
          ctx.setLineDash([]);
        }

        // Heavy dark steel sign plate
        ctx.fillStyle = '#060911';
        ctx.strokeStyle = isSelected ? '#38bdf8' : signColor;
        ctx.lineWidth = isSelected ? 4 : 3;
        ctx.beginPath();
        ctx.roundRect
          ? ctx.roundRect(-halfW, -halfH, signW, signH, 10)
          : ctx.rect(-halfW, -halfH, signW, signH);
        ctx.fill();
        ctx.stroke();

        // Direction Arrow
        ctx.save();
        const arrowX = sign.direction.includes('left') ? -halfW + 28 : halfW - 28;
        ctx.translate(arrowX, 0);

        let rot = 0;
        if (sign.direction === 'right') rot = 0;
        else if (sign.direction === 'left') rot = Math.PI;
        else if (sign.direction === 'down') rot = Math.PI * 0.5;
        else if (sign.direction === 'up') rot = -Math.PI * 0.5;
        else if (sign.direction === 'down_right') rot = Math.PI * 0.25;
        else if (sign.direction === 'down_left') rot = Math.PI * 0.75;
        else if (sign.direction === 'up_right') rot = -Math.PI * 0.25;
        else if (sign.direction === 'up_left') rot = -Math.PI * 0.75;

        ctx.rotate(rot);

        ctx.fillStyle = signColor;
        ctx.strokeStyle = '#060911';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-14, -8);
        ctx.lineTo(2, -8);
        ctx.lineTo(2, -15);
        ctx.lineTo(16, 0);
        ctx.lineTo(2, 15);
        ctx.lineTo(2, 8);
        ctx.lineTo(-14, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Target name & Subtitle in Signboard Center
        const contentCenterX = sign.direction.includes('left') ? 16 : -16;
        ctx.textAlign = 'center';
        ctx.fillStyle = signColor;
        ctx.font = 'bold 12px monospace';
        ctx.fillText(sign.targetName || 'BASE LZ', contentCenterX, -6);

        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(sign.subText || 'WAYPOINT CLUE', contentCenterX, 12);

        // Distance range indicator below sign
        const targetX = sign.targetType === 'pickup' && (mapData.cargoPlatforms || []).find(p => p.type === 'pickup')
          ? (mapData.cargoPlatforms || []).find(p => p.type === 'pickup')!.x
          : mapData.landingPad.x;
        const targetY = sign.targetType === 'pickup' && (mapData.cargoPlatforms || []).find(p => p.type === 'pickup')
          ? (mapData.cargoPlatforms || []).find(p => p.type === 'pickup')!.y
          : mapData.landingPad.y;
        const distMeters = Math.round(Math.hypot(targetX - sign.x, targetY - sign.y) * 0.1);

        ctx.fillStyle = '#cbd5e1';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`DIST: ${distMeters}M`, 0, halfH + 14);

        ctx.restore();
      }

      // 2kb. Render Text Notes on Map
      const textNotes = mapData.textNotes || [];
      for (let i = 0; i < textNotes.length; i++) {
        const note = textNotes[i];
        if (!note.text) continue;
        const isSelected = selectedItem?.type === 'text_note' && selectedItem.index === i;
        const noteColor = note.color || '#38bdf8';

        ctx.save();
        ctx.translate(note.x, note.y);

        // Font size calculation
        let fontSize = 18;
        let padX = 14;
        let padY = 8;
        if (note.size === 'small') {
          fontSize = 13;
          padX = 10;
          padY = 5;
        } else if (note.size === 'medium') {
          fontSize = 18;
          padX = 14;
          padY = 8;
        } else if (note.size === 'large') {
          fontSize = 28;
          padX = 18;
          padY = 10;
        } else if (note.size === 'xl') {
          fontSize = 42;
          padX = 24;
          padY = 14;
        } else if (note.size === 'xxl') {
          fontSize = 62;
          padX = 32;
          padY = 18;
        }

        let fontFamily = '"Share Tech Mono", monospace';
        if (note.style === 'sans-serif') fontFamily = '"Rajdhani", system-ui, sans-serif';
        else if (note.style === 'orbitron') fontFamily = '"Orbitron", sans-serif';
        else if (note.style === 'rajdhani') fontFamily = '"Rajdhani", sans-serif';
        else if (note.style === 'courier') fontFamily = '"Courier New", Courier, monospace';
        else fontFamily = '"Share Tech Mono", monospace';

        ctx.font = `bold ${fontSize}px ${fontFamily}`;
        ctx.textBaseline = 'middle';
        const align = note.align || 'center';
        ctx.textAlign = align as CanvasTextAlign;

        const lines = note.text.split('\n');
        const lineHeight = fontSize * 1.25;
        let maxWidth = 0;
        for (const line of lines) {
          const m = ctx.measureText(line).width;
          if (m > maxWidth) maxWidth = m;
        }
        const totalH = lines.length * lineHeight;
        const boxW = Math.max(maxWidth + padX * 2, 40);
        const boxH = Math.max(totalH + padY * 2, 28);
        const halfW = boxW * 0.5;
        const halfH = boxH * 0.5;

        // Selection highlight ring
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = Math.max(2.5, 3 / zoom);
          ctx.setLineDash([8 / zoom, 4 / zoom]);
          ctx.strokeRect(-halfW - 8, -halfH - 8, boxW + 16, boxH + 16);
          ctx.setLineDash([]);
        }

        // Draw box border if enabled
        if (note.showBorder) {
          ctx.fillStyle = 'rgba(6, 10, 18, 0.88)';
          ctx.strokeStyle = isSelected ? '#38bdf8' : noteColor;
          ctx.lineWidth = isSelected ? 3.5 : Math.max(1.8, Math.min(3.5, fontSize * 0.08));
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-halfW, -halfH, boxW, boxH, Math.min(8, fontSize * 0.25));
          } else {
            ctx.rect(-halfW, -halfH, boxW, boxH);
          }
          ctx.fill();
          ctx.stroke();

          // Corner tech accents
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.5;
          const cornerSize = Math.min(8, fontSize * 0.3);
          ctx.beginPath();
          ctx.moveTo(-halfW + cornerSize, -halfH);
          ctx.lineTo(-halfW, -halfH);
          ctx.lineTo(-halfW, -halfH + cornerSize);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(halfW - cornerSize, halfH);
          ctx.lineTo(halfW, halfH);
          ctx.lineTo(halfW, halfH - cornerSize);
          ctx.stroke();
        } else {
          // Subtle background tint on hover / editor view
          ctx.fillStyle = 'rgba(6, 10, 18, 0.45)';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(-halfW, -halfH, boxW, boxH, 4);
          } else {
            ctx.rect(-halfW, -halfH, boxW, boxH);
          }
          ctx.fill();
        }

        // Draw text lines
        ctx.fillStyle = noteColor;
        let textX = 0;
        if (align === 'left') {
          textX = note.showBorder ? -halfW + padX : -maxWidth * 0.5;
        } else if (align === 'right') {
          textX = note.showBorder ? halfW - padX : maxWidth * 0.5;
        }
        const startY = -totalH * 0.5 + lineHeight * 0.5;
        for (let l = 0; l < lines.length; l++) {
          ctx.fillText(lines[l], textX, startY + l * lineHeight);
        }

        ctx.restore();
      }

      // 2kc. Render Active Volcano Hazards
      const volcanoes = mapData.volcanoes || [];
      const volcanoThemes = {
        magma: { glow: '#ef4444', accent: '#f97316', core: '#fde047', basalt: '#1c1917' },
        plasma: { glow: '#a855f7', accent: '#c084fc', core: '#f5d0fe', basalt: '#18181b' },
        toxic: { glow: '#10b981', accent: '#34d399', core: '#bbf7d0', basalt: '#14221a' },
        cryo: { glow: '#38bdf8', accent: '#67e8f9', core: '#cffafe', basalt: '#0f172a' },
      };

      for (let i = 0; i < volcanoes.length; i++) {
        const v = volcanoes[i];
        const isSelected = selectedItem?.type === 'volcano' && selectedItem.index === i;
        const vPal = volcanoThemes[v.colorTheme || 'magma'] || volcanoThemes.magma;
        const calderaW = v.calderaWidth || Math.round(v.width * 0.32);

        ctx.save();

        // Selection highlight ring
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = Math.max(2.5, 3 / zoom);
          ctx.setLineDash([8 / zoom, 4 / zoom]);
          ctx.strokeRect(v.x - v.width * 0.5 - 15, v.y - v.height - v.eruptionHeight - 20, v.width + 30, v.height + v.eruptionHeight + 35);
          ctx.setLineDash([]);
        }

        // Volcano mountain basalt cone
        ctx.beginPath();
        ctx.moveTo(v.x - v.width * 0.5, v.y);
        ctx.lineTo(v.x - calderaW * 0.5, v.y - v.height);
        ctx.quadraticCurveTo(v.x, v.y - v.height + v.height * 0.22, v.x + calderaW * 0.5, v.y - v.height);
        ctx.lineTo(v.x + v.width * 0.5, v.y);
        ctx.closePath();

        const vGrad = ctx.createLinearGradient(v.x, v.y - v.height, v.x, v.y);
        vGrad.addColorStop(0, vPal.basalt);
        vGrad.addColorStop(0.7, theme.terrainFill);
        vGrad.addColorStop(1, theme.terrainFill);
        ctx.fillStyle = vGrad;
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#38bdf8' : theme.terrainBorder;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Molten Caldera Pool
        ctx.beginPath();
        ctx.moveTo(v.x - calderaW * 0.5, v.y - v.height);
        ctx.quadraticCurveTo(v.x, v.y - v.height + v.height * 0.24, v.x + calderaW * 0.5, v.y - v.height);
        ctx.quadraticCurveTo(v.x, v.y - v.height - 4, v.x - calderaW * 0.5, v.y - v.height);
        ctx.closePath();
        ctx.fillStyle = vPal.glow;
        ctx.fill();

        // Eruption Plume Trajectory / Danger Zone Preview (Dashed Flame Column)
        ctx.save();
        ctx.strokeStyle = vPal.accent;
        ctx.setLineDash([6 / zoom, 4 / zoom]);
        ctx.lineWidth = 2 / zoom;
        ctx.globalAlpha = 0.65;
        ctx.beginPath();
        ctx.moveTo(v.x - calderaW * 0.4, v.y - v.height);
        ctx.lineTo(v.x - calderaW * 0.25, v.y - v.height - v.eruptionHeight);
        ctx.lineTo(v.x + calderaW * 0.25, v.y - v.height - v.eruptionHeight);
        ctx.lineTo(v.x + calderaW * 0.4, v.y - v.height);
        ctx.stroke();
        ctx.restore();

        // Eruption Peak Flame Marker
        ctx.fillStyle = vPal.glow;
        ctx.beginPath();
        ctx.arc(v.x, v.y - v.height - v.eruptionHeight, Math.max(6, 6 / zoom), 0, Math.PI * 2);
        ctx.fill();

        // Text Tag
        ctx.fillStyle = vPal.accent;
        ctx.font = `bold ${Math.max(10, Math.round(11 / zoom))}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`🌋 VOLCANO (${(v.colorTheme || 'magma').toUpperCase()}) [${v.eruptionInterval}s]`, v.x, v.y - v.height - v.eruptionHeight - 12);

        ctx.restore();
      }

      // 2l. Control Node Handles for Ground & Ceiling
      if (activeTool === 'ground' || activeTool === 'select') {
        for (let i = 0; i < mapData.groundNodes.length; i++) {
          const pt = mapData.groundNodes[i];
          const isNodeSel = selectedItem?.type === 'ground_node' && selectedItem.index === i;
          ctx.fillStyle = isNodeSel ? '#38bdf8' : '#f59e0b';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (isNodeSel ? 9 : 6) / zoom, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2 / zoom;
          ctx.stroke();
        }
      }

      if (activeTool === 'ceiling' || activeTool === 'select') {
        for (let i = 0; i < mapData.ceilingNodes.length; i++) {
          const pt = mapData.ceilingNodes[i];
          const isNodeSel = selectedItem?.type === 'ceiling_node' && selectedItem.index === i;
          ctx.fillStyle = isNodeSel ? '#38bdf8' : '#a855f7';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (isNodeSel ? 9 : 6) / zoom, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2 / zoom;
          ctx.stroke();
        }
      }

      // 2l. Ship Scale Visual Reference on Launch Pad
      ctx.save();
      ctx.translate(lPad.x, lPad.y - 28);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(16, 16);
      ctx.lineTo(-16, 16);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Exit world transform
      ctx.restore(); // Exit screen scale

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    mapData,
    zoom,
    pan,
    theme,
    showGrid,
    selectedItem,
    polyDraftPoints,
    activeTool,
  ]);

  // Mouse & Multi-Touch Pointer Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Record pointer for multi-touch tracking
    activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Check for Two-Finger Multi-Touch Gesture (Pinch-to-zoom & Two-finger drag-to-pan)
    if (activePointersRef.current.size >= 2) {
      isPinchGesturingRef.current = true;
      isDraggingRef.current = false;
      setIsPanning(false);

      const pts = Array.from(activePointersRef.current.values()) as Array<{ clientX: number; clientY: number }>;
      const dist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
      pinchStartDistRef.current = Math.max(1, dist);
      pinchStartZoomRef.current = zoom;

      const midClientX = (pts[0].clientX + pts[1].clientX) / 2;
      const midClientY = (pts[0].clientY + pts[1].clientY) / 2;
      const screenX = midClientX - rect.left;
      const screenY = midClientY - rect.top;
      const worldX = (screenX - pan.x) / zoom;
      const worldY = (screenY - pan.y) / zoom;
      pinchStartMidpointRef.current = { screenX, screenY, worldX, worldY };
      return;
    }

    // Suppress stray clicks immediately after a multi-touch gesture
    if (isPinchGesturingRef.current || Date.now() < touchSuppressionTimerRef.current) {
      return;
    }

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPos = screenToWorld(screenX, screenY);

    // Pan tool, Right click, Middle click, or Alt key = Pan
    if (activeTool === 'pan' || e.button === 1 || e.button === 2 || e.altKey) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      return;
    }

    if (e.button === 0) {
      isDraggingRef.current = true;
      dragStartWorldRef.current = worldPos;

      // 1. Tool-specific click actions
      if (activeTool === 'ground') {
        // Add new ground node or select existing
        const clickedNodeIdx = mapData.groundNodes.findIndex(
          (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) < 30 / zoom
        );

        if (clickedNodeIdx >= 0) {
          setSelectedItem({ type: 'ground_node', index: clickedNodeIdx });
        } else {
          // Insert after selected node or into closest path segment
          let insertIdx = mapData.groundNodes.length;
          if (selectedItem?.type === 'ground_node' && selectedItem.index !== undefined) {
            insertIdx = selectedItem.index + 1;
          } else if (mapData.groundNodes.length >= 2) {
            let bestDist = Infinity;
            let bestSeg = mapData.groundNodes.length - 1;
            for (let i = 0; i < mapData.groundNodes.length - 1; i++) {
              const d = pointToSegmentDistance(worldPos, mapData.groundNodes[i], mapData.groundNodes[i + 1]);
              if (d < bestDist) {
                bestDist = d;
                bestSeg = i;
              }
            }
            insertIdx = bestSeg + 1;
          }

          const newNodes = [...mapData.groundNodes];
          newNodes.splice(insertIdx, 0, { x: worldPos.x, y: worldPos.y });
          const next = { ...mapData, groundNodes: newNodes };
          pushHistory(next);
          setSelectedItem({ type: 'ground_node', index: insertIdx });
        }
        return;
      }

      if (activeTool === 'ceiling') {
        const clickedNodeIdx = mapData.ceilingNodes.findIndex(
          (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) < 30 / zoom
        );

        if (clickedNodeIdx >= 0) {
          setSelectedItem({ type: 'ceiling_node', index: clickedNodeIdx });
        } else {
          let insertIdx = mapData.ceilingNodes.length;
          if (selectedItem?.type === 'ceiling_node' && selectedItem.index !== undefined) {
            insertIdx = selectedItem.index + 1;
          } else if (mapData.ceilingNodes.length >= 2) {
            let bestDist = Infinity;
            let bestSeg = mapData.ceilingNodes.length - 1;
            for (let i = 0; i < mapData.ceilingNodes.length - 1; i++) {
              const d = pointToSegmentDistance(worldPos, mapData.ceilingNodes[i], mapData.ceilingNodes[i + 1]);
              if (d < bestDist) {
                bestDist = d;
                bestSeg = i;
              }
            }
            insertIdx = bestSeg + 1;
          }

          const newNodes = [...mapData.ceilingNodes];
          newNodes.splice(insertIdx, 0, { x: worldPos.x, y: worldPos.y });
          const next = { ...mapData, ceilingNodes: newNodes };
          pushHistory(next);
          setSelectedItem({ type: 'ceiling_node', index: insertIdx });
        }
        return;
      }

      if (activeTool === 'cave_layer') {
        stampPresetObstacle(selectedObstacleStamp, worldPos.x, worldPos.y);
        setActiveTool('select');
        return;
      }

      if (activeTool === 'obstacle_polygon') {
        // Add point to polygon draft
        if (polyDraftPoints.length >= 3) {
          // Check if clicked close to start point to close polygon
          const first = polyDraftPoints[0];
          if (Math.hypot(first.x - worldPos.x, first.y - worldPos.y) < 35 / zoom) {
            // Close polygon!
            const newObs: CustomObstacleData = {
              id: `obs-poly-${Date.now()}`,
              name: 'Custom Rock Barrier',
              type: 'polygon',
              points: [...polyDraftPoints],
            };
            const next = {
              ...mapData,
              obstacles: [...mapData.obstacles, newObs],
            };
            pushHistory(next);
            setPolyDraftPoints([]);
            setActiveTool('select');
            return;
          }
        }
        setPolyDraftPoints((prev) => [...prev, worldPos]);
        return;
      }

      if (activeTool === 'fuel') {
        const newFuel: CustomFuelData = {
          id: `fuel-${Date.now()}`,
          x: worldPos.x,
          y: worldPos.y,
          amount: selectedFuelAmount,
        };
        const next = {
          ...mapData,
          fuelPickups: [...mapData.fuelPickups, newFuel],
        };
        pushHistory(next);
        return;
      }

      if (activeTool === 'cargo_pickup') {
        const typeLabels: Record<CargoType, string> = {
          standard: `${selectedCargoWeight.toUpperCase()} CARGO DEPOT`,
          explosive: 'HIGH-EXPLOSIVE MUNITIONS DEPOT',
          cryogenic: 'CRYO SPECIMEN DOCK',
          isotope: 'QUANTUM ISOTOPE FACILITY',
          magnetic: 'MAGNETIC DYNAMO MATRIX',
          plasma: 'PLASMA BATTERY RECHARGE HUB',
        };

        const newPlatform: CustomCargoPlatformData = {
          id: `cargo-pickup-${Date.now()}`,
          type: 'pickup',
          x: Math.round(worldPos.x),
          y: Math.round(worldPos.y),
          width: 140,
          weightClass: selectedCargoWeight,
          cargoType: selectedCargoType,
          label: typeLabels[selectedCargoType] || `${selectedCargoWeight.toUpperCase()} DEPOT`,
        };
        const next = {
          ...mapData,
          cargoPlatforms: [...(mapData.cargoPlatforms || []), newPlatform],
        };
        pushHistory(next);
        sound.playLandingChime();
        setActiveTool('select');
        setSelectedItem({ type: 'cargo_platform', index: (next.cargoPlatforms || []).length - 1 });
        return;
      }

      if (activeTool === 'vehicle_depot') {
        const newPlatform: CustomCargoPlatformData = {
          id: `vehicle-depot-${Date.now()}`,
          type: 'vehicle_depot',
          x: Math.round(worldPos.x),
          y: Math.round(worldPos.y),
          width: 480,
          label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
          truckCount: 2,
        };
        const next = {
          ...mapData,
          cargoPlatforms: [...(mapData.cargoPlatforms || []), newPlatform],
        };
        pushHistory(next);
        sound.playLandingChime();
        setActiveTool('select');
        return;
      }

      if (activeTool === 'signpost') {
        const newSign: CustomSignpostData = {
          id: `sign-${Date.now()}`,
          x: Math.round(worldPos.x),
          y: Math.round(worldPos.y),
          direction: selectedSignpostDirection,
          targetType: selectedSignpostTarget,
          targetName: selectedSignpostName,
          subText: selectedSignpostSubText,
          color: selectedSignpostColor,
        };
        const next = {
          ...mapData,
          signposts: [...(mapData.signposts || []), newSign],
        };
        pushHistory(next);
        sound.playLandingChime();
        setSelectedItem({ type: 'signpost', index: (next.signposts || []).length - 1 });
        return;
      }

      if (activeTool === 'text') {
        // First check if clicked on existing text note to select it
        const tnHitIdx = (mapData.textNotes || []).findIndex((tn) => {
          const hitR = tn.size === 'xxl' ? 70 : tn.size === 'xl' ? 55 : tn.size === 'large' ? 45 : 35;
          return Math.hypot(tn.x - worldPos.x, tn.y - worldPos.y) <= Math.max(hitR, 35 / zoom);
        });

        if (tnHitIdx >= 0) {
          const clickedNote = mapData.textNotes![tnHitIdx];
          setSelectedTextContent(clickedNote.text);
          if (clickedNote.size) setSelectedTextSize(clickedNote.size);
          if (clickedNote.style) setSelectedTextStyle(clickedNote.style);
          if (clickedNote.color) setSelectedTextColor(clickedNote.color);
          if (clickedNote.showBorder !== undefined) setSelectedTextBorder(clickedNote.showBorder);
          if (clickedNote.align) setSelectedTextAlign(clickedNote.align);
          else setSelectedTextAlign('center');
          setSelectedItem({ type: 'text_note', index: tnHitIdx });
          return;
        }

        // Otherwise place a new text note at current world position
        const newNote: CustomTextNoteData = {
          id: `note-${Date.now()}`,
          x: Math.round(worldPos.x),
          y: Math.round(worldPos.y),
          text: selectedTextContent || 'SECTOR ALPHA',
          size: selectedTextSize,
          style: selectedTextStyle,
          color: selectedTextColor,
          showBorder: selectedTextBorder,
          align: selectedTextAlign,
        };
        const next = {
          ...mapData,
          textNotes: [...(mapData.textNotes || []), newNote],
        };
        pushHistory(next);
        sound.playLandingChime();
        setSelectedItem({ type: 'text_note', index: (next.textNotes || []).length - 1 });
        return;
      }

      if (activeTool === 'volcano') {
        const newVolcano: CustomVolcanoData = {
          id: `volcano-${Date.now()}`,
          x: Math.round(worldPos.x),
          y: Math.round(worldPos.y),
          width: selectedVolcanoWidth,
          height: selectedVolcanoHeight,
          calderaWidth: Math.round(selectedVolcanoWidth * 0.32),
          eruptionHeight: selectedVolcanoEruptionHeight,
          eruptionInterval: selectedVolcanoInterval,
          eruptionDuration: selectedVolcanoDuration,
          colorTheme: selectedVolcanoTheme,
        };
        const next = {
          ...mapData,
          volcanoes: [...(mapData.volcanoes || []), newVolcano],
        };
        pushHistory(next);
        sound.playVolcanoBlast(0.6);
        setSelectedItem({ type: 'volcano', index: (next.volcanoes || []).length - 1 });
        return;
      }

      if (activeTool === 'eraser') {
        const hitTol = Math.max(35, 30 / zoom);
        const fuelHitTol = Math.max(40, 35 / zoom);
        const cargoHitTol = Math.max(50, 45 / zoom);
        const signHitTol = Math.max(55, 45 / zoom);

        // 0a. Check Text Notes
        const tnIdx = (mapData.textNotes || []).findIndex((tn) => {
          const hitR = tn.size === 'xxl' ? 70 : tn.size === 'xl' ? 55 : tn.size === 'large' ? 45 : 35;
          return Math.hypot(tn.x - worldPos.x, tn.y - worldPos.y) <= Math.max(hitR, 35 / zoom);
        });
        if (tnIdx >= 0) {
          const next = {
            ...mapData,
            textNotes: (mapData.textNotes || []).filter((_, i) => i !== tnIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 0b. Check Tactical Signposts
        const sIdx = (mapData.signposts || []).findIndex(
          (s) => Math.hypot(s.x - worldPos.x, s.y - worldPos.y) <= signHitTol
        );
        if (sIdx >= 0) {
          const next = {
            ...mapData,
            signposts: (mapData.signposts || []).filter((_, i) => i !== sIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 0c. Check Volcano Hazards
        const vDelIdx = (mapData.volcanoes || []).findIndex((v) => {
          const halfW = v.width * 0.5;
          return (
            worldPos.x >= v.x - halfW - hitTol &&
            worldPos.x <= v.x + halfW + hitTol &&
            worldPos.y >= v.y - v.height - hitTol &&
            worldPos.y <= v.y + hitTol
          );
        });
        if (vDelIdx >= 0) {
          const next = {
            ...mapData,
            volcanoes: (mapData.volcanoes || []).filter((_, i) => i !== vDelIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 0c. Check Cargo Platforms
        const cpIdx = (mapData.cargoPlatforms || []).findIndex((cp) => {
          const halfW = cp.width ? cp.width / 2 : 70;
          return (
            worldPos.x >= cp.x - halfW - cargoHitTol &&
            worldPos.x <= cp.x + halfW + cargoHitTol &&
            Math.abs(worldPos.y - cp.y) <= cargoHitTol
          );
        });
        if (cpIdx >= 0) {
          const next = {
            ...mapData,
            cargoPlatforms: (mapData.cargoPlatforms || []).filter((_, i) => i !== cpIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 1. Check Fuel pickups
        const fIdx = mapData.fuelPickups.findIndex(
          (f) => Math.hypot(f.x - worldPos.x, f.y - worldPos.y) <= fuelHitTol
        );
        if (fIdx >= 0) {
          const next = {
            ...mapData,
            fuelPickups: mapData.fuelPickups.filter((_, i) => i !== fIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 2. Check Obstacles (Vertex, Edge, or Polygon Interior Body)
        const oIdx = mapData.obstacles.findIndex((obs) => {
          return isPointNearPolygon(worldPos, obs.points, hitTol);
        });
        if (oIdx >= 0) {
          const next = {
            ...mapData,
            obstacles: mapData.obstacles.filter((_, i) => i !== oIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 3. Check Ground Node
        const gIdx = mapData.groundNodes.findIndex(
          (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) <= hitTol
        );
        if (gIdx >= 0 && mapData.groundNodes.length > 2) {
          const next = {
            ...mapData,
            groundNodes: mapData.groundNodes.filter((_, i) => i !== gIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }

        // 4. Check Ceiling Node
        const cIdx = mapData.ceilingNodes.findIndex(
          (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) <= hitTol
        );
        if (cIdx >= 0 && mapData.ceilingNodes.length > 2) {
          const next = {
            ...mapData,
            ceilingNodes: mapData.ceilingNodes.filter((_, i) => i !== cIdx),
          };
          pushHistory(next);
          sound.playExplosion();
          return;
        }
        return;
      }

      // Default: 'select' Tool Selection Hit Testing
      const selectVertexTol = Math.max(18, 16 / zoom);
      const selectTol = Math.max(30, 24 / zoom);

      // 0. Text Notes
      const tnIdx = (mapData.textNotes || []).findIndex((tn) => {
        const hitR = tn.size === 'xxl' ? 70 : tn.size === 'xl' ? 55 : tn.size === 'large' ? 45 : 35;
        return Math.hypot(tn.x - worldPos.x, tn.y - worldPos.y) <= Math.max(hitR, 35 / zoom);
      });
      if (tnIdx >= 0) {
        setSelectedItem({ type: 'text_note', index: tnIdx });
        return;
      }

      // 0b. Volcano Hazards
      const vHitIdx = (mapData.volcanoes || []).findIndex((v) => {
        const halfW = v.width * 0.5;
        return (
          worldPos.x >= v.x - halfW - selectTol &&
          worldPos.x <= v.x + halfW + selectTol &&
          worldPos.y >= v.y - v.height - selectTol &&
          worldPos.y <= v.y + selectTol
        );
      });
      if (vHitIdx >= 0) {
        setSelectedItem({ type: 'volcano', index: vHitIdx });
        return;
      }

      // 1. Launch Pad
      const lPad = mapData.launchPad;
      if (
        worldPos.x >= lPad.x - lPad.width / 2 - selectTol &&
        worldPos.x <= lPad.x + lPad.width / 2 + selectTol &&
        Math.abs(worldPos.y - lPad.y) < Math.max(50, 40 / zoom)
      ) {
        setSelectedItem({ type: 'launch_pad' });
        return;
      }

      // 2. Landing Pad
      const tPad = mapData.landingPad;
      if (
        worldPos.x >= tPad.x - tPad.width / 2 - selectTol &&
        worldPos.x <= tPad.x + tPad.width / 2 + selectTol &&
        Math.abs(worldPos.y - tPad.y) < Math.max(50, 40 / zoom)
      ) {
        setSelectedItem({ type: 'landing_pad' });
        return;
      }

      // 3. Fuel Canister
      const fIdx = mapData.fuelPickups.findIndex(
        (f) => Math.hypot(f.x - worldPos.x, f.y - worldPos.y) <= Math.max(35, 30 / zoom)
      );
      if (fIdx >= 0) {
        setSelectedItem({ type: 'fuel', index: fIdx });
        return;
      }

      // 3b. Cargo Platforms (Pickup, Drop, Vehicle Depot)
      const cpIdx = (mapData.cargoPlatforms || []).findIndex((cp) => {
        const halfW = cp.width ? cp.width / 2 : 70;
        return (
          worldPos.x >= cp.x - halfW - selectTol &&
          worldPos.x <= cp.x + halfW + selectTol &&
          Math.abs(worldPos.y - cp.y) < Math.max(50, 40 / zoom)
        );
      });
      if (cpIdx >= 0) {
        setSelectedItem({ type: 'cargo_platform', index: cpIdx });
        return;
      }

      // 3c. Signposts (Directional Base Clues)
      const sIdx = (mapData.signposts || []).findIndex(
        (s) => Math.hypot(s.x - worldPos.x, s.y - worldPos.y) <= Math.max(55, 45 / zoom)
      );
      if (sIdx >= 0) {
        setSelectedItem({ type: 'signpost', index: sIdx });
        return;
      }

      // 4. Obstacle Vertex or Body
      for (let i = 0; i < mapData.obstacles.length; i++) {
        const obs = mapData.obstacles[i];
        for (let j = 0; j < obs.points.length; j++) {
          if (Math.hypot(obs.points[j].x - worldPos.x, obs.points[j].y - worldPos.y) <= selectVertexTol) {
            setSelectedItem({ type: 'obstacle_point', index: i, subIndex: j });
            return;
          }
        }
        if (isPointNearPolygon(worldPos, obs.points, selectTol)) {
          setSelectedItem({ type: 'obstacle', index: i });
          return;
        }
      }

      // 5. Ground Nodes
      const gIdx = mapData.groundNodes.findIndex(
        (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) <= selectVertexTol
      );
      if (gIdx >= 0) {
        setSelectedItem({ type: 'ground_node', index: gIdx });
        return;
      }

      // 6. Ceiling Nodes
      const cIdx = mapData.ceilingNodes.findIndex(
        (pt) => Math.hypot(pt.x - worldPos.x, pt.y - worldPos.y) <= selectVertexTol
      );
      if (cIdx >= 0) {
        setSelectedItem({ type: 'ceiling_node', index: cIdx });
        return;
      }

      // Clicked on empty space: deselect
      setSelectedItem(null);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // Update pointer position in multi-touch map
    if (activePointersRef.current.has(e.pointerId)) {
      activePointersRef.current.set(e.pointerId, { clientX: e.clientX, clientY: e.clientY });
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Handle 2-Finger Multi-Touch: Simultaneous Pinch Zoom & Sliding Pan
    if (activePointersRef.current.size >= 2 && pinchStartDistRef.current && pinchStartMidpointRef.current) {
      const pts = Array.from(activePointersRef.current.values()) as Array<{ clientX: number; clientY: number }>;
      const curDist = Math.hypot(pts[0].clientX - pts[1].clientX, pts[0].clientY - pts[1].clientY);
      const scaleFactor = curDist / pinchStartDistRef.current;
      const targetZoom = Math.max(0.06, Math.min(1.5, pinchStartZoomRef.current * scaleFactor));

      const curMidClientX = (pts[0].clientX + pts[1].clientX) / 2;
      const curMidClientY = (pts[0].clientY + pts[1].clientY) / 2;
      const curScreenX = curMidClientX - rect.left;
      const curScreenY = curMidClientY - rect.top;

      // Keep world coordinate originally under finger midpoint pinned to the current midpoint
      const newPanX = curScreenX - pinchStartMidpointRef.current.worldX * targetZoom;
      const newPanY = curScreenY - pinchStartMidpointRef.current.worldY * targetZoom;

      setZoom(targetZoom);
      setPan({ x: newPanX, y: newPanY });
      return;
    }

    if (isPinchGesturingRef.current) return;

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldPos = screenToWorld(screenX, screenY);
    mouseWorldPosRef.current = worldPos;
    setMouseWorldDisplay(worldPos);

    if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      });
      return;
    }

    if (isDraggingRef.current && selectedItem) {
      const dx = worldPos.x - dragStartWorldRef.current.x;
      const dy = worldPos.y - dragStartWorldRef.current.y;
      dragStartWorldRef.current = worldPos;

      if (selectedItem.type === 'launch_pad') {
        setMapData((prev) => ({
          ...prev,
          launchPad: {
            ...prev.launchPad,
            x: Math.max(200, Math.min(prev.worldWidth - 200, prev.launchPad.x + dx)),
            y: Math.max(100, Math.min(prev.worldHeight - 100, prev.launchPad.y + dy)),
          },
        }));
      } else if (selectedItem.type === 'landing_pad') {
        setMapData((prev) => ({
          ...prev,
          landingPad: {
            ...prev.landingPad,
            x: Math.max(200, Math.min(prev.worldWidth - 200, prev.landingPad.x + dx)),
            y: Math.max(100, Math.min(prev.worldHeight - 100, prev.landingPad.y + dy)),
          },
        }));
      } else if (selectedItem.type === 'ground_node' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const nodes = [...prev.groundNodes];
          const node = nodes[selectedItem.index!];
          if (node) {
            node.x = Math.max(0, Math.min(prev.worldWidth, node.x + dx));
            node.y = Math.max(50, Math.min(prev.worldHeight - 30, node.y + dy));
          }
          return { ...prev, groundNodes: nodes };
        });
      } else if (selectedItem.type === 'ceiling_node' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const nodes = [...prev.ceilingNodes];
          const node = nodes[selectedItem.index!];
          if (node) {
            node.x = Math.max(0, Math.min(prev.worldWidth, node.x + dx));
            node.y = Math.max(30, Math.min(prev.worldHeight - 100, node.y + dy));
          }
          return { ...prev, ceilingNodes: nodes };
        });
      } else if (selectedItem.type === 'obstacle' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const obsList = [...prev.obstacles];
          const obs = obsList[selectedItem.index!];
          if (obs) {
            obs.points = obs.points.map((p) => ({
              x: Math.max(0, Math.min(prev.worldWidth, p.x + dx)),
              y: Math.max(0, Math.min(prev.worldHeight, p.y + dy)),
            }));
          }
          return { ...prev, obstacles: obsList };
        });
      } else if (
        selectedItem.type === 'obstacle_point' &&
        selectedItem.index !== undefined &&
        selectedItem.subIndex !== undefined
      ) {
        setMapData((prev) => {
          const obsList = [...prev.obstacles];
          const obs = obsList[selectedItem.index!];
          if (obs && obs.points[selectedItem.subIndex!]) {
            obs.points[selectedItem.subIndex!].x += dx;
            obs.points[selectedItem.subIndex!].y += dy;
          }
          return { ...prev, obstacles: obsList };
        });
      } else if (selectedItem.type === 'fuel' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const fuels = [...prev.fuelPickups];
          const f = fuels[selectedItem.index!];
          if (f) {
            f.x = Math.max(50, Math.min(prev.worldWidth - 50, f.x + dx));
            f.y = Math.max(50, Math.min(prev.worldHeight - 50, f.y + dy));
          }
          return { ...prev, fuelPickups: fuels };
        });
      } else if (selectedItem.type === 'cargo_platform' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const platforms = [...(prev.cargoPlatforms || [])];
          const cp = platforms[selectedItem.index!];
          if (cp) {
            cp.x = Math.max(100, Math.min(prev.worldWidth - 100, cp.x + dx));
            cp.y = Math.max(100, Math.min(prev.worldHeight - 100, cp.y + dy));
          }
          return { ...prev, cargoPlatforms: platforms };
        });
      } else if (selectedItem.type === 'signpost' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const signs = [...(prev.signposts || [])];
          const s = signs[selectedItem.index!];
          if (s) {
            s.x = Math.max(100, Math.min(prev.worldWidth - 100, s.x + dx));
            s.y = Math.max(100, Math.min(prev.worldHeight - 100, s.y + dy));
          }
          return { ...prev, signposts: signs };
        });
      } else if (selectedItem.type === 'text_note' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const notes = [...(prev.textNotes || [])];
          const note = notes[selectedItem.index!];
          if (note) {
            note.x = Math.max(50, Math.min(prev.worldWidth - 50, note.x + dx));
            note.y = Math.max(50, Math.min(prev.worldHeight - 50, note.y + dy));
          }
          return { ...prev, textNotes: notes };
        });
      } else if (selectedItem.type === 'volcano' && selectedItem.index !== undefined) {
        setMapData((prev) => {
          const volcanoes = [...(prev.volcanoes || [])];
          const v = volcanoes[selectedItem.index!];
          if (v) {
            v.x = Math.max(100, Math.min(prev.worldWidth - 100, v.x + dx));
            v.y = Math.max(100, Math.min(prev.worldHeight - 50, v.y + dy));
          }
          return { ...prev, volcanoes };
        });
      }
      dragHasMovedRef.current = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    activePointersRef.current.delete(e.pointerId);

    if (activePointersRef.current.size < 2) {
      pinchStartDistRef.current = null;
      pinchStartMidpointRef.current = null;
      if (isPinchGesturingRef.current) {
        isPinchGesturingRef.current = false;
        touchSuppressionTimerRef.current = Date.now() + 150;
      }
    }

    if (activePointersRef.current.size === 0) {
      if (isPanning) {
        setIsPanning(false);
      }
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        if (dragHasMovedRef.current) {
          dragHasMovedRef.current = false;
          // Record history on drag completion
          pushHistory(mapDataRef.current);
        }
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLCanvasElement>) => {
    handlePointerUp(e);
  };

  // Mouse Wheel Zoom centered on cursor
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.87;
    const nextZoom = Math.max(0.06, Math.min(1.5, zoom * zoomFactor));

    // Keep world coordinate under mouse fixed
    const worldBefore = screenToWorld(mouseX, mouseY);
    const newPanX = mouseX - worldBefore.x * nextZoom;
    const newPanY = mouseY - worldBefore.y * nextZoom;

    setZoom(nextZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Quick Zoom Helper: Fit entire world in view
  const handleFitWorld = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pad = 40;
    const scaleX = (canvas.clientWidth - pad * 2) / mapData.worldWidth;
    const scaleY = (canvas.clientHeight - pad * 2) / mapData.worldHeight;
    const fitScale = Math.max(0.06, Math.min(1.2, Math.min(scaleX, scaleY)));
    setZoom(fitScale);
    setPan({
      x: (canvas.clientWidth - mapData.worldWidth * fitScale) / 2,
      y: (canvas.clientHeight - mapData.worldHeight * fitScale) / 2,
    });
  };

  // Import JSON & File Upload handlers
  const processJsonString = (text: string) => {
    setImportError(null);
    try {
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') {
        setImportFileSummary({
          name: parsed.name || 'Untitled Map',
          author: parsed.author || 'Anonymous',
          width: parsed.worldWidth || 7200,
          height: parsed.worldHeight || 2400,
          gravity: typeof parsed.gravity === 'number' ? parsed.gravity : 3.5,
          obstaclesCount: Array.isArray(parsed.obstacles) ? parsed.obstacles.length : 0,
          platformsCount: Array.isArray(parsed.cargoPlatforms) ? parsed.cargoPlatforms.length : 0,
        });
      }
    } catch {
      setImportFileSummary(null);
    }
  };

  const handleFileRead = (file: File) => {
    setImportError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || '';
      setImportJsonText(text);
      processJsonString(text);
    };
    reader.onerror = () => {
      setImportError('Failed to read selected file.');
      setImportFileSummary(null);
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileRead(file);
    }
  };

  const handleImportSubmit = () => {
    setImportError(null);
    if (!importJsonText.trim()) {
      setImportError('Please select a JSON file or paste JSON map code.');
      return;
    }
    const res = importMapFromJSON(importJsonText);
    if ('error' in res) {
      setImportError(res.error);
    } else {
      setMapData(res);
      pushHistory(res);
      setIsImportOpen(false);
      setImportJsonText('');
      setImportFileSummary(null);
      sound.playLandingChime();
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-950 text-slate-100 flex flex-col select-none overflow-hidden font-sans">
      {/* Tool Notification Toast */}
      {toolNotification && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-sky-500/90 text-slate-950 font-mono font-bold px-4 py-2 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.5)] border border-sky-300 animate-pulse transition-all duration-200">
            {toolNotification.name}
          </div>
        </div>
      )}

      {/* 1. Editor Top Navigation & Action Header (Responsive for both Portrait & Landscape) */}
      <header className="min-h-14 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md px-2.5 sm:px-4 py-2 flex items-center justify-between z-20 shrink-0 gap-1.5 sm:gap-3 flex-wrap sm:flex-nowrap">
        {/* Left: Exit & Map Title */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            id="btn-editor-exit"
            type="button"
            onClick={handleExit}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono font-medium transition-colors border border-slate-700 shrink-0"
            title="Exit Level Editor"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">Exit</span>
          </button>

          <div className="h-5 w-px bg-slate-700/60 hidden xs:block" />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <input
                id="input-map-name"
                type="text"
                value={mapData.name}
                onChange={(e) => setMapData((prev) => ({ ...prev, name: e.target.value }))}
                onBlur={() => pushHistory(mapData)}
                className="bg-transparent font-mono font-bold text-xs sm:text-sm text-slate-100 hover:bg-slate-800/60 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400 px-1.5 py-0.5 rounded transition-all w-24 xs:w-36 sm:w-48 md:w-56 truncate"
                title="Click to rename map"
              />
              <span className="hidden md:inline text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-sky-950 border border-sky-800 text-sky-400 shrink-0">
                EDITOR
              </span>
              <button
                id="btn-editor-threat-badge"
                type="button"
                onClick={() => setIsSettingsOpen(true)}
                className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider border flex items-center gap-1 transition-all hover:scale-105 cursor-pointer shrink-0 ${difficultyBadgeConfig[activeDifficulty].bg} ${difficultyBadgeConfig[activeDifficulty].border} ${difficultyBadgeConfig[activeDifficulty].text}`}
                title={`Threat Level: ${activeDifficulty}${isManualDifficulty ? ' (Manual Override)' : ` (Auto-calculated: ${difficultyAnalysis.totalScore} pts)`}. Click to adjust in Map Settings.`}
              >
                <Activity className="w-3 h-3 animate-pulse" />
                <span>{activeDifficulty}</span>
                {isManualDifficulty ? (
                  <span className="opacity-80 text-[8px] font-bold px-1 rounded bg-black/40 border border-current hidden lg:inline">MANUAL</span>
                ) : (
                  <span className="opacity-70 text-[8px] font-normal hidden lg:inline">({difficultyAnalysis.totalScore} pts)</span>
                )}
              </button>
            </div>
            <span className="hidden md:inline text-[10px] font-mono text-slate-400 px-1 truncate">
              {mapData.worldWidth}×{mapData.worldHeight}m • {mapData.gravity}g • {theme.name} • {activeDifficulty} {isManualDifficulty ? '(Manual)' : `(${difficultyAnalysis.totalScore} pts)`}
            </span>
          </div>
        </div>

        {/* Center / Right: Undo/Redo, Settings, Save, More Actions Dropdown, Test Flight */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto shrink-0 relative">
          {/* Undo / Redo */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/80 rounded-lg p-0.5 shrink-0">
            <button
              id="btn-editor-undo"
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1 sm:p-1.5 rounded text-slate-300 hover:text-slate-100 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              id="btn-editor-redo"
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1 sm:p-1.5 rounded text-slate-300 hover:text-slate-100 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Fullscreen Toggle button */}
          <button
            id="btn-editor-fullscreen"
            type="button"
            onClick={toggleFullscreen}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 shrink-0 text-xs font-mono transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            ) : (
              <Maximize className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            )}
            <span className="hidden md:inline">{isFullscreen ? 'Window' : 'Fullscreen'}</span>
          </button>

          {/* Help & Guide button */}
          <button
            id="btn-editor-help"
            type="button"
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-teal-950/60 hover:bg-teal-900/80 text-teal-300 hover:text-white border border-teal-500/40 hover:border-teal-400 shrink-0 text-xs font-mono font-bold transition-all shadow-[0_0_10px_rgba(20,184,166,0.15)]"
            title="Editor Guide & Manual"
          >
            <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Settings button */}
          <button
            id="btn-editor-settings"
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 shrink-0 text-xs font-mono"
            title="Planet & Environment Settings"
          >
            <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
            <span className="hidden sm:inline">Settings</span>
          </button>

          {/* Save button (Color coded: Amber when unsaved, Slate when saved) */}
          <button
            id="btn-editor-save"
            type="button"
            onClick={handleSaveMap}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all shrink-0 ${
              hasUnsavedChanges
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
            title={hasUnsavedChanges ? 'Save Unsaved Changes (Ctrl+S)' : 'Map Saved (Ctrl+S)'}
          >
            <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Save</span>
          </button>

          {/* More Actions Dropdown Toggle */}
          <div className="relative">
            <button
              id="btn-editor-more-actions"
              type="button"
              onClick={() => setIsMoreMenuOpen((prev) => !prev)}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-slate-100 border border-slate-700 shrink-0 flex items-center gap-0.5"
              title="More Actions (Save Copy, Discard, Import, Export, Randomize)"
            >
              <MoreHorizontal className="w-4 h-4" />
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* Dropdown Menu Box */}
            {isMoreMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMoreMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-1.5 z-50 w-52 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-1.5 space-y-1 font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      handleSaveAsNew();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span>Save As New Copy</span>
                  </button>

                  {hasUnsavedChanges && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        handleDiscardChanges();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-red-400 hover:text-red-300 hover:bg-red-950/40 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Discard Changes</span>
                    </button>
                  )}

                  <div className="h-px bg-slate-800 my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      setIsRandomizerOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-teal-300 hover:text-teal-200 hover:bg-teal-950/40 transition-colors"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>Procedural Generator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      setIsHelpOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-teal-300 hover:text-teal-200 hover:bg-teal-950/40 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                    <span>Editor Manual & Guide</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      setIsImportOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Import Map (JSON)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsMoreMenuOpen(false);
                      setIsExportOpen(true);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Export / Share Map</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Test Flight button */}
          <button
            id="btn-editor-test-fly"
            type="button"
            onClick={() => {
              const mapToFly: CustomMapData = {
                ...mapData,
                difficulty: activeDifficulty,
                difficultyMode: mapData.difficultyMode || (isManualDifficulty ? 'manual' : 'auto'),
              };
              saveCustomMap(mapToFly);
              onTestFly(mapToFly);
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono shadow-[0_0_16px_rgba(56,189,248,0.4)] transition-all shrink-0"
            title="Test Flight in Physics Simulator"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            <span>Test<span className="hidden xs:inline"> Flight</span></span>
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveSuccessNotification && (
        <div className="absolute top-16 right-4 sm:right-6 z-50 bg-emerald-950 border border-emerald-500 text-emerald-200 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-mono shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" /> Map saved to your library!
        </div>
      )}

      {/* 2. Main Workspace Layout */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Left Floating Tools Palette */}
        <div className="absolute left-2.5 sm:left-4 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-slate-800/90 rounded-2xl p-1.5 sm:p-2 shadow-2xl flex flex-col gap-1 sm:gap-1.5 backdrop-blur-md max-h-[calc(100%-80px)] overflow-y-auto">
          <button
            id="tool-select"
            type="button"
            onClick={() => setActiveTool('select')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'select'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Select & Move (V)"
          >
            <Move className="w-4 h-4" />
            <span className="hidden xl:inline">Select (V)</span>
          </button>

          <button
            id="tool-pan"
            type="button"
            onClick={() => setActiveTool('pan')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'pan'
                ? 'bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Pan Viewport (H) - Drag to scroll map"
          >
            <Hand className="w-4 h-4" />
            <span className="hidden xl:inline">Pan (H)</span>
          </button>

          <div className="h-px bg-slate-800 my-0.5" />

          <button
            id="tool-ceiling"
            type="button"
            onClick={() => { setActiveTool('ceiling'); setActiveToolName('Ceiling (C)'); }}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'ceiling'
                ? 'bg-purple-400 text-slate-950 font-bold shadow-lg shadow-purple-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Cavern Roof / Ceiling (C) - Click to add roof nodes"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden xl:inline">Ceiling (C)</span>
          </button>

          <button
            id="tool-ground"
            type="button"
            onClick={() => { setActiveTool('ground'); setActiveToolName('Ground (G)'); }}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'ground'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Ground Sculptor (G) - Click to add terrain points"
          >
            <Mountain className="w-4 h-4" />
            <span className="hidden xl:inline">Ground (G)</span>
          </button>

          <div className="h-px bg-slate-800 my-0.5" />

          <button
            id="tool-cave-layer"
            type="button"
            onClick={() => setActiveTool('cave_layer')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'cave_layer'
                ? 'bg-teal-400 text-slate-950 font-bold shadow-lg shadow-teal-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Cave Layer & Strata (L) - Add multi-level cave shelves and tunnels"
          >
            <Layers className="w-4 h-4" />
            <span className="hidden xl:inline">Cave Layer (L)</span>
          </button>

          <div className="h-px bg-slate-800 my-0.5" />

          <button
            id="tool-cargo-pickup"
            type="button"
            onClick={() => setActiveTool('cargo_pickup')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'cargo_pickup'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Place Cargo Pickup Depot Platform (Hook transport challenge)"
          >
            <Package className="w-4 h-4" />
            <span className="hidden xl:inline">Cargo Depot</span>
          </button>

          <button
            id="tool-vehicle-depot"
            type="button"
            onClick={() => setActiveTool('vehicle_depot')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'vehicle_depot'
                ? 'bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Place Vehicle & Rover Depot Platform (Goliath Truck Transporter Base)"
          >
            <Truck className="w-4 h-4" />
            <span className="hidden xl:inline">Vehicle Depot</span>
          </button>

          <button
            id="tool-fuel"
            type="button"
            onClick={() => setActiveTool('fuel')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'fuel'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Fuel Canister Placer (F)"
          >
            <Fuel className="w-4 h-4" />
            <span className="hidden xl:inline">Fuel (F)</span>
          </button>

          <button
            id="tool-signpost"
            type="button"
            onClick={() => setActiveTool('signpost')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'signpost'
                ? 'bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Strategic Base Clue Signpost (S) - Place tactical signs pointing toward LZ or Cargo"
          >
            <Signpost className="w-4 h-4" />
            <span className="hidden xl:inline">Signpost (S)</span>
          </button>

          <button
            id="tool-text-note"
            type="button"
            onClick={() => { setActiveTool('text'); setActiveToolName('Text Note (T)'); }}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'text'
                ? 'bg-sky-400 text-slate-950 font-bold shadow-lg shadow-sky-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Map Text Tool (T) - Add tactical or custom text labels to the map"
          >
            <Type className="w-4 h-4" />
            <span className="hidden xl:inline">Text Note (T)</span>
          </button>

          <button
            id="tool-volcano"
            type="button"
            onClick={() => { setActiveTool('volcano'); setActiveToolName('Volcano Hazard (O)'); }}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'volcano'
                ? 'bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Volcano Hazard (O) - Place erupting volcanic mountains that spit fire & molten rocks"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="hidden xl:inline">Volcano (O)</span>
          </button>

          <button
            id="tool-eraser"
            type="button"
            onClick={() => setActiveTool('eraser')}
            className={`p-2 sm:p-2.5 rounded-xl flex items-center gap-2 transition-all text-xs font-mono ${
              activeTool === 'eraser'
                ? 'bg-red-400 text-slate-950 font-bold shadow-lg shadow-red-400/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
            }`}
            title="Eraser (E) - Click any node or obstacle to delete"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden xl:inline">Eraser (E)</span>
          </button>
        </div>

        {/* Tool Options Sub-Bar (When Cave Layer & Strata tool is selected) */}
        {activeTool === 'cave_layer' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-slate-800 rounded-xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-slate-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0">STRATA:</span>
            {(['shelf', 'magma_shelf', 'arch', 'pillar', 'spire', 'island'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedObstacleStamp(t)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg uppercase text-[10px] sm:text-[11px] font-bold transition-colors shrink-0 ${
                  selectedObstacleStamp === t
                    ? 'bg-teal-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {t.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}

        {activeTool === 'fuel' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-slate-800 rounded-xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-slate-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0">AMOUNT:</span>
            {[40, 65, 85, 100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setSelectedFuelAmount(amt)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-colors shrink-0 ${
                  selectedFuelAmount === amt
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                +{amt}
              </button>
            ))}
            <span className="hidden md:inline text-[10px] text-slate-400 ml-1 shrink-0">Click air to place</span>
          </div>
        )}

        {activeTool === 'cargo_pickup' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-amber-800/80 rounded-xl p-1.5 sm:p-2 shadow-2xl flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-amber-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0 flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              CARGO TYPE:
            </span>

            {/* 6 Unique Cargo Hazard & Volatile Types */}
            {([
              { id: 'standard', label: 'Standard', icon: '📦', color: 'bg-amber-500 text-slate-950', desc: 'Standard Supply Pod' },
              { id: 'explosive', label: 'Explosive', icon: '💣', color: 'bg-orange-500 text-slate-950', desc: 'High-Explosive Munitions (Detonates on hard impact)' },
              { id: 'cryogenic', label: 'Cryo', icon: '❄️', color: 'bg-sky-400 text-slate-950', desc: 'Sub-Zero Specimen (Melts near magma)' },
              { id: 'isotope', label: 'Isotope', icon: '⚛️', color: 'bg-purple-400 text-slate-950', desc: 'Quantum Isotope (Fragile integrity)' },
              { id: 'magnetic', label: 'Magnetic', icon: '🧲', color: 'bg-amber-600 text-white', desc: 'Superconducting Core (Heavy magnetic torque)' },
              { id: 'plasma', label: 'Plasma', icon: '⚡', color: 'bg-emerald-400 text-slate-950', desc: 'Plasma Battery (Periodic EMP discharge)' },
            ] as const).map(({ id, label, icon, color, desc }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedCargoType(id as CargoType)}
                className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-colors shrink-0 ${
                  selectedCargoType === id
                    ? `${color} font-bold shadow-sm ring-1 ring-white/50`
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title={desc}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            <span className="text-slate-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0">WEIGHT:</span>
            {(['light', 'medium', 'heavy'] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setSelectedCargoWeight(w)}
                className={`px-2 py-1 rounded-lg uppercase text-[10px] sm:text-[11px] font-bold transition-colors shrink-0 ${
                  selectedCargoWeight === w
                    ? w === 'heavy'
                      ? 'bg-red-500 text-white shadow-sm'
                      : w === 'light'
                      ? 'bg-sky-400 text-slate-950 shadow-sm'
                      : 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {w} ({w === 'heavy' ? '650kg' : w === 'light' ? '140kg' : '320kg'})
              </button>
            ))}
            <span className="hidden lg:inline text-[10px] text-slate-400 ml-1 shrink-0">Click map to place base</span>
          </div>
        )}

        {activeTool === 'vehicle_depot' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-sky-800/80 rounded-xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-sky-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5" />
              VEHICLE DEPOT (GOLIATH TRANSPORTER BASE)
            </span>
            <span className="hidden md:inline text-[10px] text-slate-400 ml-1 shrink-0">Click open space to place 320m logistics platform & rovers</span>
          </div>
        )}

        {/* Tactical Signpost Sub-Bar */}
        {activeTool === 'signpost' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-emerald-800/80 rounded-xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-emerald-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0 flex items-center gap-1">
              <Signpost className="w-3.5 h-3.5" />
              SIGNPOST:
            </span>

            {/* Direction Selectors */}
            <div className="flex items-center gap-0.5 bg-slate-800/80 rounded-lg p-0.5 shrink-0">
              {([
                { dir: 'left', label: '⬅' },
                { dir: 'right', label: '➡' },
                { dir: 'down', label: '⬇' },
                { dir: 'up', label: '⬆' },
                { dir: 'down_right', label: '↘' },
                { dir: 'down_left', label: '↙' },
                { dir: 'up_right', label: '↗' },
                { dir: 'up_left', label: '↖' },
              ] as const).map(({ dir, label }) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setSelectedSignpostDirection(dir)}
                  className={`px-1.5 py-0.5 rounded text-xs font-bold transition-colors ${
                    selectedSignpostDirection === dir
                      ? 'bg-emerald-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`Point ${dir.replace('_', ' ')}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Target Presets */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSelectedSignpostTarget('landing');
                  setSelectedSignpostName('BASE LZ');
                  setSelectedSignpostSubText('PRIMARY OUTPOST');
                  setSelectedSignpostColor('#22c55e');
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                  selectedSignpostTarget === 'landing'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Base LZ
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSignpostTarget('pickup');
                  setSelectedSignpostName('CARGO VAULT');
                  setSelectedSignpostSubText('SUPPLY POD DEPOT');
                  setSelectedSignpostColor('#f59e0b');
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                  selectedSignpostTarget === 'pickup'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Cargo
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSignpostTarget('vehicle_depot');
                  setSelectedSignpostName('ROVER DEPOT');
                  setSelectedSignpostSubText('VEHICLE BAY');
                  setSelectedSignpostColor('#38bdf8');
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                  selectedSignpostTarget === 'vehicle_depot'
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Rover
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSignpostTarget('fuel');
                  setSelectedSignpostName('FUEL DEPOT');
                  setSelectedSignpostSubText('REFILL STATION');
                  setSelectedSignpostColor('#06b6d4');
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                  selectedSignpostTarget === 'fuel'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Fuel
              </button>
            </div>

            <span className="hidden md:inline text-[10px] text-slate-400 ml-1 shrink-0">Click air to place sign clue</span>
          </div>
        )}

        {/* Text Note Placer Sub-Bar */}
        {activeTool === 'text' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-sky-800/80 rounded-xl p-1.5 sm:p-2 shadow-2xl flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-sky-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0 flex items-center gap-1">
              <Type className="w-3.5 h-3.5" />
              TEXT NOTE:
            </span>

            {/* Note text input - multiline textarea */}
            <textarea
              value={selectedTextContent}
              onChange={(e) => setSelectedTextContent(e.target.value)}
              placeholder="Enter text (multiline supported)..."
              rows={2}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white placeholder-slate-500 font-mono w-36 sm:w-48 focus:outline-none focus:border-sky-400 shrink-0 resize-y min-h-[30px] max-h-[100px] leading-tight"
              title="Content of the text note (supports multiple lines)"
            />

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Text Alignment Selector */}
            <div className="flex items-center gap-0.5 bg-slate-800/80 rounded-lg p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedTextAlign('left')}
                className={`p-1 rounded transition-colors ${
                  selectedTextAlign === 'left'
                    ? 'bg-sky-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedTextAlign('center')}
                className={`p-1 rounded transition-colors ${
                  selectedTextAlign === 'center'
                    ? 'bg-sky-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedTextAlign('right')}
                className={`p-1 rounded transition-colors ${
                  selectedTextAlign === 'right'
                    ? 'bg-sky-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Size Selector */}
            <div className="flex items-center gap-0.5 bg-slate-800/80 rounded-lg p-0.5 shrink-0">
              {(
                [
                  { id: 'small', label: 'S' },
                  { id: 'medium', label: 'M' },
                  { id: 'large', label: 'L' },
                  { id: 'xl', label: 'XL' },
                  { id: 'xxl', label: 'XXL' },
                ] as const
              ).map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedTextSize(id)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                    selectedTextSize === id
                      ? 'bg-sky-400 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={`Size: ${id.toUpperCase()}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Font Style Selector */}
            <select
              value={selectedTextStyle}
              onChange={(e) => setSelectedTextStyle(e.target.value as MapTextStyle)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-[10px] sm:text-[11px] text-slate-200 font-mono focus:outline-none focus:border-sky-400 shrink-0 cursor-pointer"
              title="Font family / style"
            >
              <option value="mono">Share Tech Mono</option>
              <option value="orbitron">Orbitron (Sci-Fi)</option>
              <option value="rajdhani">Rajdhani (HUD)</option>
              <option value="courier">Courier (Terminal)</option>
              <option value="sans-serif">Sans-Serif</option>
            </select>

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Border Toggle Button */}
            <button
              type="button"
              onClick={() => setSelectedTextBorder((prev) => !prev)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors shrink-0 ${
                selectedTextBorder
                  ? 'bg-sky-500/20 border border-sky-400 text-sky-300'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
              title="Toggle text container border box"
            >
              <Square className="w-3 h-3" />
              <span>Border: {selectedTextBorder ? 'ON' : 'OFF'}</span>
            </button>

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Color Selector & Presets */}
            <div className="flex items-center gap-1 shrink-0">
              {['#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#f8fafc'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedTextColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    selectedTextColor === c ? 'scale-125 ring-2 ring-white shadow' : 'opacity-80 hover:opacity-100'
                  }`}
                  title={c}
                />
              ))}
              <input
                type="color"
                value={selectedTextColor}
                onChange={(e) => setSelectedTextColor(e.target.value)}
                className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 shrink-0 ml-0.5"
                title="Custom Color"
              />
            </div>

            <span className="hidden lg:inline text-[10px] text-slate-400 ml-1 shrink-0">Click map to place text</span>
          </div>
        )}

        {/* Volcano Hazard Placer Sub-Bar */}
        {activeTool === 'volcano' && (
          <div className="absolute left-14 sm:left-24 xl:left-52 top-2.5 sm:top-4 z-20 bg-slate-900/95 border border-orange-800/80 rounded-xl p-1.5 sm:p-2 shadow-2xl flex items-center gap-1.5 sm:gap-2 text-xs font-mono backdrop-blur-md max-w-[calc(100%-70px)] overflow-x-auto">
            <span className="text-orange-400 text-[10px] sm:text-[11px] px-1 font-bold shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              VOLCANO THEME:
            </span>

            {/* Element Theme Selector */}
            {(['magma', 'plasma', 'toxic', 'cryo'] as const).map((th) => (
              <button
                key={th}
                type="button"
                onClick={() => setSelectedVolcanoTheme(th)}
                className={`px-2 py-1 rounded-lg uppercase text-[10px] font-bold transition-colors shrink-0 ${
                  selectedVolcanoTheme === th
                    ? th === 'magma'
                      ? 'bg-orange-500 text-slate-950 font-bold'
                      : th === 'plasma'
                      ? 'bg-purple-500 text-white font-bold'
                      : th === 'toxic'
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-sky-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {th}
              </button>
            ))}

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Interval Presets */}
            <span className="text-slate-400 text-[10px] font-bold shrink-0">INTERVAL:</span>
            {[3, 4.5, 6, 10, 20].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedVolcanoInterval(sec)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors shrink-0 ${
                  selectedVolcanoInterval === sec
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sec}s
              </button>
            ))}

            <div className="h-4 w-px bg-slate-700 mx-0.5 shrink-0" />

            {/* Size Presets */}
            <span className="text-slate-400 text-[10px] font-bold shrink-0">SIZE:</span>
            {[
              { label: 'Vent (180m)', w: 180, h: 110, eh: 220 },
              { label: 'Standard (260m)', w: 260, h: 160, eh: 320 },
              { label: 'Colossus (380m)', w: 380, h: 240, eh: 480 },
            ].map((sz) => (
              <button
                key={sz.label}
                type="button"
                onClick={() => {
                  setSelectedVolcanoWidth(sz.w);
                  setSelectedVolcanoHeight(sz.h);
                  setSelectedVolcanoEruptionHeight(sz.eh);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors shrink-0 ${
                  selectedVolcanoWidth === sz.w
                    ? 'bg-orange-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sz.label}
              </button>
            ))}

            <span className="hidden lg:inline text-[10px] text-slate-400 ml-1 shrink-0">Click terrain to place volcano</span>
          </div>
        )}

        {/* Interactive Editor Canvas */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onWheel={handleWheel}
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {/* Selected Item Floating Action Bar */}
        {selectedItem && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-slate-950/95 border border-sky-400/40 rounded-2xl px-3 sm:px-4 py-2 shadow-2xl backdrop-blur-xl flex items-center gap-2.5 sm:gap-3.5 text-xs font-mono animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-bold text-sky-300 uppercase text-[11px] sm:text-xs">
                {selectedItem.type === 'ground_node'
                  ? `Ground Node #${(selectedItem.index ?? 0) + 1}`
                  : selectedItem.type === 'ceiling_node'
                  ? `Ceiling Node #${(selectedItem.index ?? 0) + 1}`
                  : selectedItem.type === 'obstacle_point'
                  ? `Obstacle Vertex (Rock #${(selectedItem.index ?? 0) + 1})`
                  : selectedItem.type === 'obstacle'
                  ? `Rock Obstacle #${(selectedItem.index ?? 0) + 1}`
                  : selectedItem.type === 'fuel'
                  ? `Fuel Canister (+${mapData.fuelPickups[selectedItem.index ?? 0]?.amount || 50}L)`
                  : selectedItem.type === 'cargo_platform'
                  ? mapData.cargoPlatforms?.[selectedItem.index ?? 0]?.type === 'vehicle_depot'
                    ? '🚛 VEHICLE & ROVER LOGISTICS DEPOT'
                    : `${mapData.cargoPlatforms?.[selectedItem.index ?? 0]?.type === 'pickup' ? '📦 CARGO DEPOT' : '📥 DROP ZONE'} (${mapData.cargoPlatforms?.[selectedItem.index ?? 0]?.weightClass?.toUpperCase() || 'PLATFORM'})`
                  : selectedItem.type === 'signpost'
                  ? `🗺️ BASE CLUE SIGNPOST #${(selectedItem.index ?? 0) + 1} (${mapData.signposts?.[selectedItem.index ?? 0]?.direction?.toUpperCase() || 'RIGHT'})`
                  : selectedItem.type === 'text_note'
                  ? `📝 TEXT NOTE #${(selectedItem.index ?? 0) + 1}`
                  : selectedItem.type === 'volcano'
                  ? `🌋 VOLCANIC PEAK #${(selectedItem.index ?? 0) + 1} (${(mapData.volcanoes?.[selectedItem.index ?? 0]?.colorTheme || 'MAGMA').toUpperCase()})`
                  : selectedItem.type === 'launch_pad'
                  ? 'Launch Platform'
                  : 'Landing Pad LZ'}
              </span>
            </div>

            {/* Cargo Platform Quick Editor in Inspector */}
            {selectedItem.type === 'cargo_platform' && selectedItem.index !== undefined && mapData.cargoPlatforms?.[selectedItem.index] && (
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-amber-800/80">
                {/* Platform Base Role */}
                {mapData.cargoPlatforms[selectedItem.index].type === 'pickup' && (
                  <>
                    <span className="text-[10px] text-amber-400 font-bold">TYPE:</span>
                    {([
                      { id: 'standard', label: '📦 Std', color: 'bg-amber-500 text-slate-950' },
                      { id: 'explosive', label: '💣 Explosive', color: 'bg-orange-500 text-slate-950' },
                      { id: 'cryogenic', label: '❄️ Cryo', color: 'bg-sky-400 text-slate-950' },
                      { id: 'isotope', label: '⚛️ Isotope', color: 'bg-purple-400 text-slate-950' },
                      { id: 'magnetic', label: '🧲 Mag', color: 'bg-amber-600 text-white' },
                      { id: 'plasma', label: '⚡ Plasma', color: 'bg-emerald-400 text-slate-950' },
                    ] as const).map(({ id, label, color }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          const platforms = [...(mapData.cargoPlatforms || [])];
                          if (platforms[selectedItem.index!]) {
                            platforms[selectedItem.index!] = {
                              ...platforms[selectedItem.index!],
                              cargoType: id as CargoType,
                            };
                            const next = { ...mapData, cargoPlatforms: platforms };
                            pushHistory(next);
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-colors ${
                          (mapData.cargoPlatforms[selectedItem.index]?.cargoType || 'standard') === id
                            ? `${color} font-bold shadow-sm`
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {label}
                      </button>
                    ))}

                    <div className="h-4 w-px bg-slate-700 mx-0.5" />

                    <span className="text-[10px] text-slate-400 font-bold">MASS:</span>
                    {(['light', 'medium', 'heavy'] as const).map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => {
                          const platforms = [...(mapData.cargoPlatforms || [])];
                          if (platforms[selectedItem.index!]) {
                            platforms[selectedItem.index!] = {
                              ...platforms[selectedItem.index!],
                              weightClass: w,
                            };
                            const next = { ...mapData, cargoPlatforms: platforms };
                            pushHistory(next);
                          }
                        }}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          (mapData.cargoPlatforms[selectedItem.index]?.weightClass || 'medium') === w
                            ? 'bg-sky-400 text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </>
                )}

                {/* Base Name / Label Input */}
                <input
                  type="text"
                  value={mapData.cargoPlatforms[selectedItem.index].label || ''}
                  onChange={(e) => {
                    const platforms = [...(mapData.cargoPlatforms || [])];
                    if (platforms[selectedItem.index!]) {
                      platforms[selectedItem.index!] = {
                        ...platforms[selectedItem.index!],
                        label: e.target.value,
                      };
                      const next = { ...mapData, cargoPlatforms: platforms };
                      pushHistory(next);
                    }
                  }}
                  className="bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-white font-mono w-28 sm:w-36 focus:outline-none focus:border-sky-400 ml-1"
                  placeholder="Base Station Name..."
                />
              </div>
            )}

            {/* Volcano Quick Editor in Inspector */}
            {selectedItem.type === 'volcano' && selectedItem.index !== undefined && mapData.volcanoes?.[selectedItem.index] && (
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
                {/* Element Theme Selector */}
                {(['magma', 'plasma', 'toxic', 'cryo'] as const).map((th) => (
                  <button
                    key={th}
                    type="button"
                    onClick={() => {
                      const volcanoes = [...(mapData.volcanoes || [])];
                      if (volcanoes[selectedItem.index!]) {
                        volcanoes[selectedItem.index!] = { ...volcanoes[selectedItem.index!], colorTheme: th };
                        const next = { ...mapData, volcanoes };
                        pushHistory(next);
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-colors ${
                      (mapData.volcanoes[selectedItem.index]?.colorTheme || 'magma') === th
                        ? 'bg-orange-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {th}
                  </button>
                ))}

                {/* Eruption Cycle Timing Toggle */}
                <div className="flex items-center gap-1 pl-1">
                  <span className="text-[9px] text-slate-400">INTERVAL:</span>
                  {[3, 4.5, 6, 10, 20].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        const volcanoes = [...(mapData.volcanoes || [])];
                        if (volcanoes[selectedItem.index!]) {
                          volcanoes[selectedItem.index!] = { ...volcanoes[selectedItem.index!], eruptionInterval: sec };
                          const next = { ...mapData, volcanoes };
                          pushHistory(next);
                        }
                      }}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        (mapData.volcanoes[selectedItem.index]?.eruptionInterval || 4.5) === sec
                          ? 'bg-orange-400 text-slate-950'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedItem.type === 'signpost' && selectedItem.index !== undefined && mapData.signposts?.[selectedItem.index] && (
              <div className="flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold">DIR:</span>
                {([
                  { dir: 'left', label: '⬅' },
                  { dir: 'right', label: '➡' },
                  { dir: 'down', label: '⬇' },
                  { dir: 'up', label: '⬆' },
                  { dir: 'down_right', label: '↘' },
                  { dir: 'down_left', label: '↙' },
                  { dir: 'up_right', label: '↗' },
                  { dir: 'up_left', label: '↖' },
                ] as const).map(({ dir, label }) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => {
                      const signs = [...(mapData.signposts || [])];
                      if (signs[selectedItem.index!]) {
                        signs[selectedItem.index!] = { ...signs[selectedItem.index!], direction: dir };
                        const next = { ...mapData, signposts: signs };
                        pushHistory(next);
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-xs font-bold transition-colors ${
                      mapData.signposts[selectedItem.index]?.direction === dir
                        ? 'bg-emerald-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {/* Text Note Quick Editor in Inspector */}
            {selectedItem.type === 'text_note' && selectedItem.index !== undefined && mapData.textNotes?.[selectedItem.index] && (
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
                {/* Multiline Text Content Input */}
                <textarea
                  value={mapData.textNotes[selectedItem.index].text || ''}
                  onChange={(e) => {
                    const notes = [...(mapData.textNotes || [])];
                    if (notes[selectedItem.index!]) {
                      notes[selectedItem.index!] = { ...notes[selectedItem.index!], text: e.target.value };
                      const next = { ...mapData, textNotes: notes };
                      pushHistory(next);
                    }
                  }}
                  rows={2}
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono w-32 sm:w-44 focus:outline-none focus:border-sky-400 resize-y min-h-[30px] max-h-[100px] leading-tight"
                  placeholder="Text note (multiline)..."
                />

                {/* Text Alignment Selector */}
                <div className="flex items-center gap-0.5 bg-slate-950 rounded p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      const notes = [...(mapData.textNotes || [])];
                      if (notes[selectedItem.index!]) {
                        notes[selectedItem.index!] = { ...notes[selectedItem.index!], align: 'left' };
                        const next = { ...mapData, textNotes: notes };
                        pushHistory(next);
                      }
                    }}
                    className={`p-1 rounded transition-colors ${
                      (mapData.textNotes[selectedItem.index]?.align || 'center') === 'left'
                        ? 'bg-sky-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Align Left"
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const notes = [...(mapData.textNotes || [])];
                      if (notes[selectedItem.index!]) {
                        notes[selectedItem.index!] = { ...notes[selectedItem.index!], align: 'center' };
                        const next = { ...mapData, textNotes: notes };
                        pushHistory(next);
                      }
                    }}
                    className={`p-1 rounded transition-colors ${
                      (mapData.textNotes[selectedItem.index]?.align || 'center') === 'center'
                        ? 'bg-sky-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Align Center"
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const notes = [...(mapData.textNotes || [])];
                      if (notes[selectedItem.index!]) {
                        notes[selectedItem.index!] = { ...notes[selectedItem.index!], align: 'right' };
                        const next = { ...mapData, textNotes: notes };
                        pushHistory(next);
                      }
                    }}
                    className={`p-1 rounded transition-colors ${
                      (mapData.textNotes[selectedItem.index]?.align || 'center') === 'right'
                        ? 'bg-sky-400 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Align Right"
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Size Selector */}
                <div className="flex items-center gap-0.5 bg-slate-950 rounded p-0.5 border border-slate-800">
                  {(
                    [
                      { id: 'small', label: 'S' },
                      { id: 'medium', label: 'M' },
                      { id: 'large', label: 'L' },
                      { id: 'xl', label: 'XL' },
                      { id: 'xxl', label: 'XXL' },
                    ] as const
                  ).map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        const notes = [...(mapData.textNotes || [])];
                        if (notes[selectedItem.index!]) {
                          notes[selectedItem.index!] = { ...notes[selectedItem.index!], size: id };
                          const next = { ...mapData, textNotes: notes };
                          pushHistory(next);
                        }
                      }}
                      className={`px-1 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        (mapData.textNotes[selectedItem.index]?.size || 'medium') === id
                          ? 'bg-sky-400 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title={`Size: ${id.toUpperCase()}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Style Selector */}
                <select
                  value={mapData.textNotes[selectedItem.index].style || 'mono'}
                  onChange={(e) => {
                    const notes = [...(mapData.textNotes || [])];
                    if (notes[selectedItem.index!]) {
                      notes[selectedItem.index!] = {
                        ...notes[selectedItem.index!],
                        style: e.target.value as MapTextStyle,
                      };
                      const next = { ...mapData, textNotes: notes };
                      pushHistory(next);
                    }
                  }}
                  className="bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-slate-200 font-mono focus:outline-none focus:border-sky-400 cursor-pointer"
                  title="Font style"
                >
                  <option value="mono">Mono</option>
                  <option value="orbitron">Orbitron</option>
                  <option value="rajdhani">Rajdhani</option>
                  <option value="courier">Courier</option>
                  <option value="sans-serif">Sans</option>
                </select>

                {/* Border Box Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const notes = [...(mapData.textNotes || [])];
                    if (notes[selectedItem.index!]) {
                      const cur = notes[selectedItem.index!].showBorder;
                      notes[selectedItem.index!] = { ...notes[selectedItem.index!], showBorder: !cur };
                      const next = { ...mapData, textNotes: notes };
                      pushHistory(next);
                    }
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                    mapData.textNotes[selectedItem.index].showBorder
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-950 border-slate-700 text-slate-400'
                  }`}
                  title="Toggle Border"
                >
                  Border: {mapData.textNotes[selectedItem.index].showBorder ? 'ON' : 'OFF'}
                </button>

                {/* Color Input */}
                <input
                  type="color"
                  value={mapData.textNotes[selectedItem.index].color || '#38bdf8'}
                  onChange={(e) => {
                    const notes = [...(mapData.textNotes || [])];
                    if (notes[selectedItem.index!]) {
                      notes[selectedItem.index!] = { ...notes[selectedItem.index!], color: e.target.value };
                      const next = { ...mapData, textNotes: notes };
                      pushHistory(next);
                    }
                  }}
                  className="w-5 h-5 rounded cursor-pointer bg-transparent border-0 shrink-0"
                  title="Change text color"
                />
              </div>
            )}

            <div className="h-4 w-px bg-slate-700" />

            {/* Quick Delete Item Button */}
            {(selectedItem.type === 'ground_node' ||
              selectedItem.type === 'ceiling_node' ||
              selectedItem.type === 'obstacle' ||
              selectedItem.type === 'obstacle_point' ||
              selectedItem.type === 'fuel' ||
              selectedItem.type === 'cargo_platform' ||
              selectedItem.type === 'signpost' ||
              selectedItem.type === 'text_note') && (
              <button
                id="btn-delete-selected-item"
                type="button"
                onClick={handleDeleteItem}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/20 hover:bg-red-500 border border-red-500/50 hover:border-red-400 text-red-300 hover:text-white font-bold transition-all shadow-sm cursor-pointer"
                title="Delete Selected Item (Delete or Backspace)"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete (Del)</span>
              </button>
            )}

            {/* Deselect Button */}
            <button
              id="btn-deselect-item"
              type="button"
              onClick={() => setSelectedItem(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Deselect"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Status & Viewport Controls Bar (Responsive & Non-Clipping) */}
        <div className="absolute bottom-3 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pointer-events-none">
          {/* Coordinates & Selection Info */}
          <div className="pointer-events-auto bg-slate-900/95 border border-slate-800/90 rounded-xl px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-[11px] font-mono text-slate-400 backdrop-blur-md flex items-center gap-2 sm:gap-3 shadow-xl shrink-0">
            <span>
              X: <strong className="text-sky-300">{mouseWorldDisplay.x}m</strong>
            </span>
            <span>
              Y: <strong className="text-sky-300">{mouseWorldDisplay.y}m</strong>
            </span>
            <div className="hidden sm:block h-3.5 w-px bg-slate-700" />
            <span className="hidden sm:inline">
              Obstacles: <strong className="text-slate-200">{mapData.obstacles.length}</strong>
            </span>
            <span className="hidden sm:inline">
              Fuel: <strong className="text-amber-400">{mapData.fuelPickups.length}</strong>
            </span>
          </div>

          {/* Zoom & Viewport Controls */}
          <div className="pointer-events-auto bg-slate-900/95 border border-slate-800/90 rounded-xl p-1 text-xs font-mono text-slate-300 backdrop-blur-md flex items-center gap-1 shadow-xl shrink-0">
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.max(0.06, prev * 0.85))}
              className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="px-1 text-[10px] sm:text-[11px] font-bold min-w-[36px] sm:min-w-[42px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((prev) => Math.min(1.5, prev * 1.18))}
              className="p-1 sm:p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <div className="h-4 w-px bg-slate-700 mx-0.5" />
            <button
              type="button"
              onClick={handleFitWorld}
              className="px-1.5 sm:px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-slate-100 text-[10px] sm:text-[11px] font-bold flex items-center gap-1"
              title="Fit Full Map to Viewport"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Fit<span className="hidden sm:inline"> Map</span></span>
            </button>
            <button
              type="button"
              onClick={() => setShowGrid((prev) => !prev)}
              className={`p-1 sm:p-1.5 rounded-lg transition-colors ${
                showGrid ? 'bg-sky-950 text-sky-400' : 'hover:bg-slate-800 text-slate-400'
              }`}
              title="Toggle Grid"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Settings & Planet Theme Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-y-auto max-h-[90vh] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-sky-400" />
                <h3 className="font-mono font-bold text-base text-slate-100">
                  MAP & ENVIRONMENT SETTINGS
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* General Info */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">MAP TITLE</label>
                <input
                  type="text"
                  value={mapData.name}
                  onChange={(e) => setMapData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">CREATOR / AUTHOR</label>
                <input
                  type="text"
                  value={mapData.author}
                  onChange={(e) => setMapData((prev) => ({ ...prev, author: e.target.value }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">MISSION BRIEFING</label>
                <textarea
                  value={mapData.description}
                  onChange={(e) => setMapData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-mono resize-none"
                />
              </div>
            </div>

            {/* Visual Theme Picker & Custom Palette Builder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300 font-bold">VISUAL THEME & PALETTE</label>
                <button
                  type="button"
                  onClick={() => setIsCreatingPalette((prev) => !prev)}
                  className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-700/60 text-sky-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isCreatingPalette ? 'Close Palette Editor' : 'Create Custom Palette'}</span>
                </button>
              </div>

              {/* Custom Palette Creation Form */}
              {isCreatingPalette && (
                <div className="bg-slate-900 border border-sky-600/50 rounded-xl p-4 space-y-3 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-300">
                      <Palette className="w-4 h-4 text-sky-400" />
                      <span>CUSTOM PALETTE DESIGNER</span>
                    </div>
                    {/* Live Preview Box */}
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="w-4 h-3 rounded" style={{ backgroundColor: paletteDraft.skyTop }} title="Sky Top" />
                      <div className="w-4 h-3 rounded" style={{ backgroundColor: paletteDraft.skyBottom }} title="Sky Bottom" />
                      <div className="w-4 h-3 rounded" style={{ backgroundColor: paletteDraft.terrainFill }} title="Terrain Mantle" />
                      <div className="w-4 h-3 rounded border" style={{ borderColor: paletteDraft.terrainBorder, backgroundColor: paletteDraft.terrainAccent }} title="Terrain Border/Accent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 mb-1">PALETTE NAME</label>
                    <input
                      type="text"
                      value={paletteDraft.name}
                      onChange={(e) => setPaletteDraft((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 font-mono focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Sky Zenith (Top)</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.skyTop}
                          onChange={(e) => setPaletteDraft((prev) => ({ ...prev, skyTop: e.target.value }))}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.skyTop}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Sky Horizon (Bottom)</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.skyBottom}
                          onChange={(e) => setPaletteDraft((prev) => ({ ...prev, skyBottom: e.target.value }))}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.skyBottom}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Terrain Mantle (Fill)</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.terrainFill}
                          onChange={(e) => setPaletteDraft((prev) => ({ ...prev, terrainFill: e.target.value }))}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.terrainFill}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Terrain Surface (Border)</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.terrainBorder}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPaletteDraft((prev) => ({
                              ...prev,
                              terrainBorder: val,
                              gridColor: `rgba(${parseInt(val.slice(1, 3), 16) || 50}, ${parseInt(val.slice(3, 5), 16) || 150}, ${parseInt(val.slice(5, 7), 16) || 250}, 0.08)`,
                              glowColor: `rgba(${parseInt(val.slice(1, 3), 16) || 50}, ${parseInt(val.slice(3, 5), 16) || 150}, ${parseInt(val.slice(5, 7), 16) || 250}, 0.25)`,
                            }));
                          }}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.terrainBorder}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Mineral Accent</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.terrainAccent}
                          onChange={(e) => setPaletteDraft((prev) => ({ ...prev, terrainAccent: e.target.value }))}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.terrainAccent}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Atmosphere Dust</label>
                      <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                        <input
                          type="color"
                          value={paletteDraft.dustColor}
                          onChange={(e) => setPaletteDraft((prev) => ({ ...prev, dustColor: e.target.value }))}
                          className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                        />
                        <span className="text-[11px] text-slate-300 truncate">{paletteDraft.dustColor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        const newPalette: CustomMapTheme = {
                          ...paletteDraft,
                          id: `custom-theme-${Date.now()}`,
                        };
                        saveCustomPalette(newPalette);
                        setUserPalettes(getSavedCustomPalettes());
                        setMapData((prev) => ({ ...prev, themeId: newPalette.id, customTheme: newPalette }));
                        setIsCreatingPalette(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-colors shadow-md"
                    >
                      Save & Apply Palette
                    </button>
                  </div>
                </div>
              )}

              {/* Saved User Palettes list */}
              {userPalettes.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-sky-400 font-bold tracking-wider">YOUR CUSTOM PALETTES</span>
                  <div className="grid grid-cols-2 gap-2">
                    {userPalettes.map((up) => {
                      const isSelected = mapData.customTheme?.id === up.id || mapData.themeId === up.id;
                      return (
                        <div
                          key={up.id}
                          className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all relative group cursor-pointer ${
                            isSelected
                              ? 'border-sky-400 bg-sky-950/40'
                              : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
                          }`}
                          onClick={() => setMapData((prev) => ({ ...prev, themeId: up.id, customTheme: up }))}
                        >
                          <div className="flex items-center justify-between pr-4">
                            <span className="font-mono text-xs font-bold text-slate-200 truncate">{up.name}</span>
                            <div
                              className="w-3 h-3 rounded-full border border-slate-700 shadow-sm shrink-0"
                              style={{ backgroundColor: up.terrainBorder }}
                            />
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-4 h-2.5 rounded" style={{ backgroundColor: up.skyTop }} />
                            <div className="w-4 h-2.5 rounded" style={{ backgroundColor: up.skyBottom }} />
                            <div className="w-4 h-2.5 rounded" style={{ backgroundColor: up.terrainFill }} />
                            <div className="w-4 h-2.5 rounded border" style={{ borderColor: up.terrainBorder, backgroundColor: up.terrainAccent }} />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomPalette(up.id);
                              setUserPalettes(getSavedCustomPalettes());
                              if (mapData.themeId === up.id) {
                                setMapData((prev) => ({ ...prev, themeId: 'luna', customTheme: undefined }));
                              }
                            }}
                            className="absolute right-2 top-2 p-1 rounded hover:bg-red-950 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete custom palette"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Standard Preset Themes */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-wider">OFFICIAL PLANET PRESETS</span>
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.values(CUSTOM_THEMES).map((th) => {
                    const isSelected = (!mapData.customTheme || mapData.themeId !== 'custom') && mapData.themeId === th.id;
                    return (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => setMapData((prev) => ({ ...prev, themeId: th.id, customTheme: undefined }))}
                        className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                          isSelected
                            ? 'border-sky-400 bg-sky-950/30'
                            : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-slate-200">{th.name}</span>
                          <div
                            className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                            style={{ backgroundColor: th.terrainBorder }}
                          />
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className="w-5 h-3 rounded" style={{ backgroundColor: th.skyTop }} />
                          <div className="w-5 h-3 rounded" style={{ backgroundColor: th.skyBottom }} />
                          <div className="w-5 h-3 rounded" style={{ backgroundColor: th.terrainFill }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Terrain Geometry Line Style (Straight vs Curved) */}
            <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">TERRAIN GEOMETRY & WALL STYLE</span>
                <span className={mapData.terrainLineStyle === 'curved' ? 'text-purple-400 font-bold' : 'text-amber-400 font-bold'}>
                  {mapData.terrainLineStyle === 'curved' ? 'Smooth Curves' : 'Straight Lines (Caves)'}
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                Choose straight angular polygonal lines between nodes for authentic sharp rock caves, or smooth Catmull-Rom splines for rolling dunes.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setMapData((prev) => ({ ...prev, terrainLineStyle: 'straight' }))}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    mapData.terrainLineStyle !== 'curved'
                      ? 'border-amber-400 bg-amber-950/30 text-amber-300 font-bold'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Minus className="w-4 h-4 text-amber-400" />
                    <span>Straight Lines</span>
                  </div>
                  {mapData.terrainLineStyle !== 'curved' && <Check className="w-4 h-4 text-amber-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => setMapData((prev) => ({ ...prev, terrainLineStyle: 'curved' }))}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    mapData.terrainLineStyle === 'curved'
                      ? 'border-purple-400 bg-purple-950/30 text-purple-300 font-bold'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Spline className="w-4 h-4 text-purple-400" />
                    <span>Curved Splines</span>
                  </div>
                  {mapData.terrainLineStyle === 'curved' && <Check className="w-4 h-4 text-purple-400" />}
                </button>
              </div>
            </div>

            {/* Map Scale & World Dimensions (1x, 2x, 3x sizes) */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-bold">MAP SCALE & WORLD SIZE</span>
                <span className="text-teal-400 font-bold">
                  {mapData.worldWidth} × {mapData.worldHeight}m ({(Math.round((mapData.worldWidth / 7200) * 10) / 10).toFixed(1)}x)
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '1x Standard', w: 7200, h: 2400 },
                  { label: 'Deep Caverns', w: 7200, h: 4800 },
                  { label: 'Abyssal 8k', w: 9600, h: 8000 },
                  { label: 'Towering Mine', w: 12000, h: 14000 },
                  { label: '2x Wide', w: 14400, h: 3600 },
                  { label: 'Colossal 20k', w: 21600, h: 20000 },
                ].map((preset) => {
                  const isCurrent = mapData.worldWidth === preset.w && mapData.worldHeight === preset.h;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        const oldW = mapData.worldWidth || 7200;
                        const oldH = mapData.worldHeight || 2400;
                        const scaleX = preset.w / oldW;
                        const scaleY = preset.h / oldH;

                        setMapData((prev) => ({
                          ...prev,
                          worldWidth: preset.w,
                          worldHeight: preset.h,
                          launchPad: {
                            ...prev.launchPad,
                            x: Math.round(prev.launchPad.x * scaleX),
                            y: Math.round(prev.launchPad.y * scaleY),
                          },
                          landingPad: {
                            ...prev.landingPad,
                            x: Math.round(prev.landingPad.x * scaleX),
                            y: Math.round(prev.landingPad.y * scaleY),
                          },
                          groundNodes: prev.groundNodes.map((pt) => ({
                            x: Math.round(pt.x * scaleX),
                            y: Math.round(pt.y * scaleY),
                          })),
                          ceilingNodes: prev.ceilingNodes.map((pt) => ({
                            x: Math.round(pt.x * scaleX),
                            y: Math.round(pt.y * scaleY),
                          })),
                          obstacles: prev.obstacles.map((obs) => ({
                            ...obs,
                            points: obs.points.map((pt) => ({
                              x: Math.round(pt.x * scaleX),
                              y: Math.round(pt.y * scaleY),
                            })),
                          })),
                          fuelPickups: prev.fuelPickups.map((f) => ({
                            ...f,
                            x: Math.round(f.x * scaleX),
                            y: Math.round(f.y * scaleY),
                          })),
                        }));
                      }}
                      className={`py-2 px-2 rounded-xl text-[11px] font-mono font-bold border transition-all ${
                        isCurrent
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-sm'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              {/* Custom Sliders for Fine-Tuning Dimensions */}
              <div className="space-y-2 pt-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Width:</span>
                  <span className="text-slate-200">{mapData.worldWidth}m</span>
                </div>
                <input
                  type="range"
                  min="4000"
                  max="24000"
                  step="800"
                  value={mapData.worldWidth}
                  onChange={(e) => {
                    const newW = parseInt(e.target.value);
                    setMapData((prev) => ({
                      ...prev,
                      worldWidth: newW,
                    }));
                  }}
                  className="w-full accent-teal-400"
                />

                <div className="flex justify-between text-slate-400 pt-1">
                  <span>Height (Depth):</span>
                  <span className="text-slate-200">{mapData.worldHeight}m</span>
                </div>
                <input
                  type="range"
                  min="1200"
                  max="20000"
                  step="200"
                  value={mapData.worldHeight}
                  onChange={(e) => {
                    const newH = parseInt(e.target.value);
                    setMapData((prev) => ({
                      ...prev,
                      worldHeight: newH,
                    }));
                  }}
                  className="w-full accent-teal-400"
                />
              </div>
            </div>

            {/* Physics Parameters */}
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  <span>PLANETARY GRAVITY</span>
                </span>
                <span className="text-amber-400 font-bold">{mapData.gravity.toFixed(1)} g</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={mapData.gravity}
                onChange={(e) => setMapData((prev) => ({ ...prev, gravity: parseFloat(e.target.value) }))}
                className="w-full accent-amber-400"
              />

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ATMOSPHERIC DRAG</span>
                </span>
                <span className="text-cyan-400 font-bold">
                  {mapData.airResistance <= 0.0001
                    ? '0.0000 (Vacuum)'
                    : `${(mapData.airResistance * 1000).toFixed(1)} mbar`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="0.008"
                step="0.0002"
                value={mapData.airResistance}
                onChange={(e) => setMapData((prev) => ({ ...prev, airResistance: parseFloat(e.target.value) }))}
                className="w-full accent-cyan-400"
              />

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>FUEL CONSUMPTION RATE</span>
                </span>
                <span className="text-orange-400 font-bold">{(mapData.fuelBurnRate || 15).toFixed(0)} units/s</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={mapData.fuelBurnRate || 15}
                onChange={(e) => setMapData((prev) => ({ ...prev, fuelBurnRate: parseInt(e.target.value) }))}
                className="w-full accent-orange-400"
              />

              <div className="flex items-center justify-between text-xs font-mono pt-2">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  <span>PAR TARGET TIME</span>
                </span>
                <span className="text-sky-400 font-bold">{mapData.targetTimeSec}s</span>
              </div>
              <input
                type="range"
                min="15"
                max="500"
                step="5"
                value={mapData.targetTimeSec}
                onChange={(e) => setMapData((prev) => ({ ...prev, targetTimeSec: parseInt(e.target.value) }))}
                className="w-full accent-sky-400"
              />
            </div>

            {/* Difficulty Rating & Manual Override Badges */}
            <div className="space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-xs font-mono text-slate-100 uppercase tracking-wide">
                    MAP DIFFICULTY RATING
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isManualDifficulty ? (
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>MANUAL OVERRIDE</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/70 border border-sky-800/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-sky-300 animate-pulse" />
                      <span>AUTO-CALCULATED</span>
                    </span>
                  )}
                </div>
              </div>

              <p className="text-[11px] font-mono text-slate-400 leading-relaxed">
                Choose the difficulty badge that best represents this map's challenge, or keep auto mode to calculate dynamically from gravity and hazards.
              </p>

              {/* Badges Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {(['Easy', 'Medium', 'Hard', 'Extreme'] as const).map((tier) => {
                  const cfg = difficultyBadgeConfig[tier];
                  const isSelected = activeDifficulty === tier;

                  return (
                    <button
                      key={tier}
                      id={`btn-difficulty-${tier.toLowerCase()}`}
                      type="button"
                      onClick={() => {
                        setMapData((prev) => ({
                          ...prev,
                          difficultyMode: 'manual',
                          difficulty: tier,
                        }));
                        sound.playClick();
                      }}
                      className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border font-mono transition-all text-center cursor-pointer ${
                        isSelected
                          ? `${cfg.activeBorder} ${cfg.activeRing}`
                          : `${cfg.bg} ${cfg.border} hover:border-slate-500 hover:scale-[1.02] opacity-75 hover:opacity-100`
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900/90 border border-slate-700">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                        <span className={`text-xs font-extrabold uppercase tracking-wide ${cfg.text}`}>
                          {tier}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 line-clamp-1 leading-tight">
                        {cfg.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Reset to Auto button */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[11px] font-mono">
                <span className="text-slate-400 text-[10px] sm:text-[11px]">
                  Physics Engine score:{' '}
                  <span className="font-bold text-slate-200">{difficultyAnalysis.difficulty}</span>{' '}
                  <span className="text-[10px] text-slate-500">({difficultyAnalysis.totalScore} pts)</span>
                </span>
                <button
                  id="btn-difficulty-auto-reset"
                  type="button"
                  onClick={() => {
                    setMapData((prev) => ({
                      ...prev,
                      difficultyMode: 'auto',
                      difficulty: difficultyAnalysis.difficulty,
                    }));
                    sound.playClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all ${
                    !isManualDifficulty
                      ? 'bg-sky-500 text-slate-950 border-sky-400 font-extrabold'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                  title="Recalculate and synchronize difficulty automatically from physics telemetry and obstacles"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{!isManualDifficulty ? 'Auto Active' : 'Reset to Auto'}</span>
                </button>
              </div>
            </div>

            {/* Dynamic Threat Rating & Flight Telemetry Card */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-700/80 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-slate-100 uppercase tracking-wide">
                    TELEMETRY & HAZARD ANALYSIS
                  </span>
                </div>
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-extrabold uppercase border flex items-center gap-1.5 ${difficultyAnalysis.badgeBg} ${difficultyAnalysis.badgeBorder} ${difficultyAnalysis.badgeText}`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{difficultyAnalysis.difficulty}</span>
                  <span className="opacity-80">({difficultyAnalysis.totalScore} pts)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                {difficultyAnalysis.summary}
              </p>

              {/* Breakdown by factor */}
              <div className="space-y-2 pt-1">
                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
                  <span>THREAT VECTOR BREAKDOWN</span>
                  <span className="text-[9px] text-slate-500 lowercase">updates automatically</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {difficultyAnalysis.factors.map((f, i) => (
                    <div
                      key={i}
                      className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/80 space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-200 font-medium">{f.name}</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                              f.rating === 'Severe'
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : f.rating === 'High'
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : f.rating === 'Moderate'
                                ? 'bg-sky-950 text-sky-400 border border-sky-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {f.rating}
                          </span>
                          <span className="font-bold text-slate-300 text-[10px] w-12 text-right">
                            {f.score} / {f.maxScore} pt
                          </span>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            f.rating === 'Severe'
                              ? 'bg-red-500'
                              : f.rating === 'High'
                              ? 'bg-amber-500'
                              : f.rating === 'Moderate'
                              ? 'bg-sky-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, (f.score / f.maxScore) * 100)}%` }}
                        />
                      </div>

                      <div className="text-[10px] text-slate-400">{f.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threshold indicator */}
              <div className="pt-1 text-[9px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 justify-between bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                <span className="text-emerald-400">&lt; 40 pts: Easy</span>
                <span className="text-sky-400">40-75 pts: Medium</span>
                <span className="text-amber-400">75-110 pts: Hard</span>
                <span className="text-red-400">&gt; 110 pts: Extreme</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  pushHistory(mapData);
                  setIsSettingsOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Export & Share Modal */}
      {isExportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-sky-400" />
                <h3 className="font-mono font-bold text-base text-slate-100">
                  EXPORT & SHARE MAP
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              Copy this JSON map code to share your level with friends or import it on any device.
            </p>

            <textarea
              readOnly
              value={exportMapToJSON(mapData)}
              rows={8}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-sky-300 focus:outline-none select-all"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(exportMapToJSON(mapData));
                  setCopiedNotification(true);
                  setTimeout(() => setCopiedNotification(false), 2000);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copiedNotification ? 'Copied to Clipboard!' : 'Copy Code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  const blob = new Blob([exportMapToJSON(mapData)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${mapData.name.toLowerCase().replace(/\s+/g, '_')}.json`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-mono font-bold"
              >
                <Download className="w-4 h-4" /> Download .JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Import Map Modal with File Upload & JSON Drag-and-Drop */}
      {isImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh] overflow-hidden text-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-sky-400" />
                <h3 className="font-mono font-bold text-base text-slate-100">
                  IMPORT CUSTOM MAP
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsImportOpen(false);
                  setImportError(null);
                  setImportFileSummary(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-4 overflow-y-auto pr-1 my-3">
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Import any saved map by dropping a <span className="text-sky-300 font-bold">.json</span> file or pasting map code below.
              </p>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Interactive File Dropzone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingFile(true);
                }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer transition-all ${
                  isDraggingFile
                    ? 'border-sky-400 bg-sky-950/40 text-sky-200 scale-[0.99]'
                    : 'border-slate-700/80 bg-slate-900/60 text-slate-300 hover:border-sky-500/50 hover:bg-slate-900/90'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-slate-100">
                    Click to select .JSON file or drag & drop here
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Supports any Gravity Lander exported level
                  </div>
                </div>
              </div>

              {/* Map File Summary Preview */}
              {importFileSummary && (
                <div className="p-3.5 bg-slate-900/80 border border-sky-500/40 rounded-xl space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-300">{importFileSummary.name}</span>
                    <span className="text-[10px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      {importFileSummary.gravity.toFixed(1)} g
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Dimensions: {importFileSummary.width}×{importFileSummary.height}m</span>
                    <span>Obstacles: {importFileSummary.obstaclesCount}</span>
                    <span>Platforms: {importFileSummary.platformsCount}</span>
                  </div>
                </div>
              )}

              {/* Direct Paste JSON Textarea */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-slate-400">
                  Or paste JSON raw code:
                </label>
                <textarea
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    processJsonString(e.target.value);
                  }}
                  placeholder='{"name": "My Map", "worldWidth": 7200, ...}'
                  rows={4}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-sky-400 leading-normal"
                />
              </div>

              {importError && (
                <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-300 font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{importError}</span>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsImportOpen(false);
                  setImportError(null);
                  setImportFileSummary(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Import Level</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Procedural Map Generator Modal (Scrollable on all screen sizes) */}
      {isRandomizerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-xl bg-slate-950 border border-teal-500/40 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-teal-400" />
                <h3 className="font-mono font-bold text-base text-slate-100">
                  PROCEDURAL MAP GENERATOR
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRandomizerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="space-y-4 overflow-y-auto pr-1 sm:pr-2 my-2 text-slate-200">
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                Generate a completely new procedural cavern network with multi-tiered rock strata, tunnels, cargo platforms, and fuel caches that you can fully edit.
              </p>

              {/* Cavern Preset Archetypes */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-slate-300 tracking-wider">
                  CAVERN ARCHETYPE & PLANET STRATA
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'caves', name: 'Subterranean', desc: 'Balanced chasm', color: 'border-sky-500/60 bg-sky-950/40 text-sky-200' },
                    { id: 'volcanic', name: 'Magma Trench', desc: 'Dense basalt & vents', color: 'border-orange-500/60 bg-orange-950/40 text-orange-200' },
                    { id: 'glacial', name: 'Glacial Ice', desc: 'Slick ice arches', color: 'border-emerald-500/60 bg-emerald-950/40 text-emerald-200' },
                    { id: 'asteroid', name: 'Asteroid Rift', desc: 'Floating monoliths', color: 'border-purple-500/60 bg-purple-950/40 text-purple-200' },
                    { id: 'vertical_shaft', name: 'Vertical Mine', desc: 'Multi-deck shafts', color: 'border-amber-500/60 bg-amber-950/40 text-amber-200' },
                    { id: 'labyrinth', name: 'Cavern Maze', desc: 'Branching tunnels', color: 'border-rose-500/60 bg-rose-950/40 text-rose-200' },
                    { id: 'random', name: 'Pure Random', desc: 'Unpredictable seed', color: 'border-teal-500/60 bg-teal-950/40 text-teal-200' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRandomPreset(item.id as any)}
                      className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                        randomPreset === item.id
                          ? `${item.color} ring-2 ring-teal-400/50`
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.name}</div>
                      <div className="text-[10px] opacity-75">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Scale Preset */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-slate-300 tracking-wider">
                  MAP SIZE & DIMENSIONS
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'compact', name: 'Compact', dims: '5.4km × 2.2km' },
                    { id: 'standard', name: 'Standard', dims: '7.6km × 2.8km' },
                    { id: 'large', name: 'Expansive', dims: '9.6km × 4.2km' },
                    { id: 'abyss', name: 'Deep Abyss', dims: '8.0km × 6.8km' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setRandomSizePreset(s.id as any)}
                      className={`p-2 rounded-xl border text-center font-mono transition-all ${
                        randomSizePreset === s.id
                          ? 'border-teal-500 bg-teal-950/50 text-teal-200'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{s.name}</div>
                      <div className="text-[10px] text-slate-500">{s.dims}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Density & Complexity */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono font-bold text-slate-300 tracking-wider">
                  OBSTACLE DENSITY & COMPLEXITY
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'simple', name: 'Open Cavern', desc: 'Fewer hazards' },
                    { id: 'medium', name: 'Balanced', desc: 'Standard strata' },
                    { id: 'complex', name: 'Dense Maze', desc: 'Tight navigation' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setRandomComplexity(c.id as any)}
                      className={`p-2 rounded-xl border text-center font-mono transition-all ${
                        randomComplexity === c.id
                          ? 'border-teal-500 bg-teal-950/50 text-teal-200'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{c.name}</div>
                      <div className="text-[10px] text-slate-500">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Include Cargo Missions Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-amber-400" />
                  <div className="text-xs font-mono">
                    <span className="text-slate-200 font-bold">Include Cargo Platform Objectives</span>
                    <div className="text-[10px] text-slate-400">Generates Deep Vault depot & cargo transport objectives</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={randomIncludeCargo}
                  onChange={(e) => setRandomIncludeCargo(e.target.checked)}
                  className="w-4 h-4 accent-teal-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => handleGenerateRandomMap('random')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                title="Quick Randomize"
              >
                <Shuffle className="w-3.5 h-3.5 text-teal-400" />
                <span>Quick Roll</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsRandomizerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleGenerateRandomMap()}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-teal-500/20"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  <span>Generate Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Level Editor Manual & Comprehensive Guide Modal */}
      {isHelpOpen && (
        <div
          id="editor-guide-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-sm sm:text-base text-slate-100 uppercase tracking-wide">
                    LEVEL EDITOR MANUAL & CREATOR GUIDE
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">
                    Terrain Sculpting, Logistics Placement, Signposts, & Multi-Deck Caverns
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="text-slate-400 hover:text-slate-100 p-1.5 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Guide Content */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
              
              {/* Quick Navigation & Viewport */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase">
                  <Hand className="w-4 h-4 text-teal-400" />
                  <span>1. VIEWPORT NAVIGATION & SHORTCUTS</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-teal-300 font-bold block">Pan / Move Canvas:</span>
                    <p className="text-slate-400">Select Pan Tool [H], or click & drag with Middle Mouse Button, or use 2-finger drag on touchscreens.</p>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-teal-300 font-bold block">Zoom In / Out:</span>
                    <p className="text-slate-400">Use Mouse Wheel, Zoom buttons (+/-), or 2-finger pinch gesture on mobile/trackpads.</p>
                  </div>
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5 sm:col-span-2 space-y-1">
                    <span className="text-sky-300 font-bold block">Essential Shortcuts:</span>
                    <p className="text-slate-400">[V] Select • [H] Pan • [Ctrl+Z] Undo • [Ctrl+Shift+Z] Redo • [Ctrl+S] Save • [Delete] Remove Selected</p>
                  </div>
                </div>
              </div>

              {/* Sculpting Terrain & Caves */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase">
                  <Mountain className="w-4 h-4 text-sky-400" />
                  <span>2. TERRAIN SCULPTING (GROUND & CAVERN CEILINGS)</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Caverns are composed of floor nodes, overhead rock ceilings, and floating rock arches:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li><strong className="text-slate-200">Ground Nodes (Floor):</strong> Click along the terrain to add floor nodes. Drag existing nodes to shape canyons, hills, and ravines.</li>
                  <li><strong className="text-slate-200">Ceiling Nodes (Roof):</strong> Add overhead rock barriers to create subterranean cavern shafts and tunnels.</li>
                  <li><strong className="text-slate-200">Obstacle Stamps:</strong> Drop pre-fabricated rock arches, floating islands, basalt spires, and magma shelves directly into the world.</li>
                  <li><strong className="text-slate-200">Curved vs. Straight Lines:</strong> Switch in Settings between authentic sharp polygonal rock walls or smooth Catmull-Rom splines.</li>
                </ul>
              </div>

              {/* Bases, Cargo & Logistics */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <Package className="w-4 h-4 text-amber-400" />
                  <span>3. BASES, CARGO DEPOTS & ROVER VEHICLES</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Every map needs an expedition path from launch to recovery:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li><strong className="text-emerald-300">Launch Pad (Origin):</strong> The starting base where your lander deploys. (Ensure clearance above the pad).</li>
                  <li><strong className="text-teal-300">Landing Zone LZ (Destination):</strong> The ultimate mission target. Delivering cargo containers and vehicle rovers here completes the mission with bonus scores!</li>
                  <li><strong className="text-amber-300">Cargo Platform Depots:</strong> Place supply pods (Light 140kg, Medium 320kg, Heavy 650kg) for pilots to hook via electromagnetic winch.</li>
                  <li><strong className="text-blue-300">Vehicle Depots:</strong> Place ground depots with exploration rovers. When a lander touches down, rovers board for transport.</li>
                  <li><strong className="text-purple-300">Fuel Caches:</strong> Scatter orbital fuel stations along narrow shafts so pilots can refuel mid-mission.</li>
                </ul>
              </div>

              {/* Mine Signposts */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <Signpost className="w-4 h-4 text-emerald-400" />
                  <span>4. DIRECTIONAL MINE SIGNPOSTS</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Add industrial signposts near cave forks, vertical shafts, and bases. Configure the 8-directional pointer arrow (Left, Right, Up, Down, Diagonals), target badge color, and custom text to guide pilots through deep cavern labyrinths.
                </p>
              </div>

              {/* Environment, Custom Palettes & Testing */}
              <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  <span>5. PHYSICS, CUSTOM PALETTES & TEST FLIGHT</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li><strong className="text-slate-200">Custom Dimensions:</strong> Expand maps up to 3x standard width (21,600m) and 8,400m depth in Map Settings.</li>
                  <li><strong className="text-slate-200">Custom Themes & Colors:</strong> Design and save your own planetary color palettes (sky gradient, rock fill, neon border, and glow).</li>
                  <li><strong className="text-slate-200">Instant Test Flight:</strong> Click &quot;Test Flight&quot; to immediately launch the simulation engine with real-time physics and telemetry!</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setIsHelpOpen(false)}
                className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-400 hover:to-sky-400 text-slate-950 font-mono font-bold text-xs uppercase rounded-xl transition-all shadow-lg cursor-pointer"
              >
                Back to Map Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
