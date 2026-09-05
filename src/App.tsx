import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShipState, WorldMap, PlanetConfig, GameSettings, ShipModelId, CustomMapData } from './types';
import { PLANETS, createCustomPlanet } from './game/planets';
import { generateWorld } from './game/procedural';
import { createInitialShip, updatePhysics } from './game/physics';
import { getShipConfig } from './game/ships';
import { ParticleSystem } from './game/particles';
import { GameRenderer } from './game/renderer';
import { sound } from './game/sound';
import { convertCustomMapToPlanet, convertCustomMapToWorld } from './game/customMapConverter';
import { createBlankCustomMap, getSavedMapForPlanet, getSavedCustomMaps } from './utils/customMapsStorage';
import { StartMenu } from './components/StartMenu';
import { FlightHUD } from './components/FlightHUD';
import { TouchControls } from './components/TouchControls';
import { PlanetSelector } from './components/PlanetSelector';
import { ShipSelector } from './components/ShipSelector';
import { SettingsModal } from './components/SettingsModal';
import { MissionOverlays } from './components/MissionOverlays';
import { DebugOverlay } from './components/DebugOverlay';
import { MapEditor } from './components/MapEditor/MapEditor';
import { AchievementToastContainer } from './components/AchievementToast';
import { CargoHazardToastContainer } from './components/CargoHazardToast';
import { resetCargoAlertHistory } from './utils/cargoAlerts';
import {
  getLastPlayedPlanetId,
  saveLastPlayedPlanetId,
  getLastSelectedShipId,
  saveLastSelectedShipId,
} from './utils/scoreStorage';

export default function App() {
  // Game Navigation State
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'editor'>('menu');
  const [isTestFlight, setIsTestFlight] = useState<boolean>(false);

  // Planet & World State
  const [planet, setPlanet] = useState<PlanetConfig>(() => {
    const lastId = getLastPlayedPlanetId();
    if (lastId.startsWith('custom-map-')) {
      const maps = getSavedCustomMaps();
      const custom = maps.find(m => m.id === lastId);
      if (custom) return convertCustomMapToPlanet(custom);
    }
    const found = PLANETS.find((p) => p.id === lastId);
    const base = found || PLANETS[0];
    const saved = getSavedMapForPlanet(base.id);
    return saved ? convertCustomMapToPlanet(saved) : base;
  });
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState<number>(() => {
    const lastId = getLastPlayedPlanetId();
    const idx = PLANETS.findIndex((p) => p.id === lastId);
    return idx >= 0 ? idx : 0;
  });
  const [world, setWorld] = useState<WorldMap>(() => {
    const lastId = getLastPlayedPlanetId();
    if (lastId.startsWith('custom-map-')) {
      const maps = getSavedCustomMaps();
      const custom = maps.find(m => m.id === lastId);
      if (custom) return convertCustomMapToWorld(custom);
    }
    const found = PLANETS.find((p) => p.id === lastId) || PLANETS[0];
    const saved = getSavedMapForPlanet(found.id);
    if (saved) {
      return convertCustomMapToWorld(saved);
    }
    return generateWorld(found.seed, 8600, 3200, found.id);
  });
  const [completedPlanets, setCompletedPlanets] = useState<Record<string, boolean>>({});

  // Active Custom Map State (if playing a user-made level)
  const [currentCustomMap, setCurrentCustomMap] = useState<CustomMapData | null>(() => {
    const lastId = getLastPlayedPlanetId();
    if (lastId.startsWith('custom-map-')) {
      const maps = getSavedCustomMaps();
      const custom = maps.find(m => m.id === lastId);
      if (custom) return custom;
    }
    const found = PLANETS.find((p) => p.id === lastId) || PLANETS[0];
    return getSavedMapForPlanet(found.id);
  });

  // Ship Model Fleet State
  const [selectedShipId, setSelectedShipId] = useState<ShipModelId>(() => {
    const lastShip = getLastSelectedShipId() as ShipModelId;
    return lastShip || 'apollo';
  });

  const handleSelectShipWithSave = useCallback((shipId: ShipModelId) => {
    setSelectedShipId(shipId);
    saveLastSelectedShipId(shipId);
  }, []);

  // UI Modals & Settings State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isPlanetSelectorOpen, setIsPlanetSelectorOpen] = useState<boolean>(false);
  const [isShipSelectorOpen, setIsShipSelectorOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(sound.getMusicMuted());
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    musicEnabled: true,
    masterVolume: 0.7,
    showMinimap: false,
    showFlightPath: true,
    touchControls: true,
    highPrecisionMode: true,
  });

  // Ship Simulation State
  const shipRef = useRef<ShipState>(createInitialShip(world, 'apollo'));
  const [hudShipState, setHudShipState] = useState<ShipState>(shipRef.current);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Engine references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<GameRenderer>(new GameRenderer());
  const particlesRef = useRef<ParticleSystem>(new ParticleSystem());
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const elapsedTimeRef = useRef<number>(0);

  // Input states (Dual Thrusters)
  const leftPressed = useRef<boolean>(false);
  const rightPressed = useRef<boolean>(false);

  // Initialize or Reset a Level
  const initLevel = useCallback(
    (newPlanet: PlanetConfig, newShipId?: ShipModelId, customWorld?: WorldMap) => {
      const newWorld = customWorld || generateWorld(newPlanet.seed, 8600, 3200, newPlanet.id);
      setPlanet(newPlanet);
      setWorld(newWorld);

      const activeShipId = newShipId || selectedShipId;
      const initialShip = createInitialShip(newWorld, activeShipId);
      shipRef.current = initialShip;
      setHudShipState(initialShip);

      elapsedTimeRef.current = 0;
      setElapsedTime(0);

      leftPressed.current = false;
      rightPressed.current = false;

      rendererRef.current.resetCamera(initialShip.pos);
      particlesRef.current.clear();
      sound.stopAllThrusters();
      resetCargoAlertHistory();
    },
    [selectedShipId]
  );

  // Play a User Custom Map (from menu or hangar)
  const handlePlayCustomMap = useCallback(
    (mapData: CustomMapData) => {
      setIsTestFlight(false);
      setCurrentCustomMap(mapData);
      saveLastPlayedPlanetId(`custom-${mapData.id}`);
      const customPlanet = convertCustomMapToPlanet(mapData);
      const customWorld = convertCustomMapToWorld(mapData);
      initLevel(customPlanet, selectedShipId, customWorld);
      setGameState('playing');
    },
    [initLevel, selectedShipId]
  );

  // Test Flight direct from Level Editor (keeps changes safe & returns directly to editor)
  const handleTestFly = useCallback(
    (mapData: CustomMapData) => {
      setIsTestFlight(true);
      setCurrentCustomMap(mapData);
      const customPlanet = convertCustomMapToPlanet(mapData);
      const customWorld = convertCustomMapToWorld(mapData);
      initLevel(customPlanet, selectedShipId, customWorld);
      setGameState('playing');
    },
    [initLevel, selectedShipId]
  );

  // Return directly to Level Editor from test flight
  const handleReturnToEditor = useCallback(() => {
    sound.stopAllThrusters();
    sound.stopAmbience();
    setIsTestFlight(false);
    setGameState('editor');
  }, []);

  // Start Standard Mission Game from Menu
  const handleStartGame = useCallback(
    (selectedPlanet?: PlanetConfig, customMap?: CustomMapData) => {
      setIsTestFlight(false);
      if (customMap) {
        handlePlayCustomMap(customMap);
        return;
      }
      const p = selectedPlanet || planet;
      saveLastPlayedPlanetId(p.id);
      const idx = PLANETS.findIndex((item) => item.id === p.id);
      if (idx !== -1) setCurrentPlanetIndex(idx);

      const savedOverride = getSavedMapForPlanet(p.id);
      if (savedOverride) {
        handlePlayCustomMap(savedOverride);
        return;
      }

      setCurrentCustomMap(null);
      initLevel(p, selectedShipId);
      setGameState('playing');
    },
    [handlePlayCustomMap, initLevel, planet, selectedShipId]
  );

  // Open Level Editor
  const handleOpenEditor = useCallback(
    (mapData?: CustomMapData) => {
      setIsTestFlight(false);
      if (mapData) {
        setCurrentCustomMap(mapData);
      } else {
        // If we are currently on an official planet, check if it has a saved version or generate one
        const activePlanet = planet;
        const savedOverride = getSavedMapForPlanet(activePlanet.id);
        if (savedOverride) {
          setCurrentCustomMap(savedOverride);
        } else {
          const blankMap = createBlankCustomMap('New Custom Map');
          setCurrentCustomMap(blankMap);
        }
      }
      setGameState('editor');
    },
    [planet]
  );

  // Handle Planet Selection from In-Game Modal
  const handleSelectPlanet = useCallback(
    (selected: PlanetConfig) => {
      saveLastPlayedPlanetId(selected.id);
      // If this is a generated/procedural world (id starts with 'custom-')
      if (selected.id.startsWith('custom-')) {
        const seed = (selected.seed !== undefined && selected.seed > 0) ? selected.seed : parseInt(selected.id.replace('custom-', ''), 10) || 99999;
        const worldFromSeed = generateWorld(seed, selected.width || 8600, selected.height || 3200, selected.id);
        initLevel(selected, selectedShipId, worldFromSeed);
        setCurrentPlanetIndex(-1);
        setCurrentCustomMap(null);
      } else {
        const idx = PLANETS.findIndex((p) => p.id === selected.id);
        if (idx !== -1) setCurrentPlanetIndex(idx);

        const savedOverride = getSavedMapForPlanet(selected.id);
        if (savedOverride) {
          setCurrentCustomMap(savedOverride);
          const customPlanet = convertCustomMapToPlanet(savedOverride);
          const customWorld = convertCustomMapToWorld(savedOverride);
          initLevel(customPlanet, selectedShipId, customWorld);
        } else {
          setCurrentCustomMap(null);
          initLevel(selected, selectedShipId);
        }
      }
    },
    [initLevel, selectedShipId]
  );

  // Handle Ship Model Selection from Hangar Modal
  const handleSelectShipModel = useCallback(
    (modelId: ShipModelId) => {
      handleSelectShipWithSave(modelId);
      if (gameState === 'playing') {
        const activeWorld = currentCustomMap ? convertCustomMapToWorld(currentCustomMap) : undefined;
        initLevel(planet, modelId, activeWorld);
      }
    },
    [gameState, initLevel, planet, currentCustomMap, handleSelectShipWithSave]
  );

  // Next Planet Handler
  const handleNextPlanet = useCallback(() => {
    // Determine the current planet index reliably from the active planet object
    let currentId = planet.id;
    let isGeneratedPlanet = false;
    let currentSeed: number | undefined = undefined;
    
    if (currentCustomMap) {
      // Check if this is a generated/procedural world (starts with 'custom-')
      if (currentCustomMap.id.startsWith('custom-') && currentCustomMap.seed) {
        isGeneratedPlanet = true;
        currentSeed = currentCustomMap.seed;
        currentId = currentCustomMap.id;
      } else {
        // This is a saved custom map overriding an official planet
        const match = PLANETS.find((p) => p.id === currentCustomMap.basePlanet || p.id === currentCustomMap.id);
        if (match) currentId = match.id;
      }
    }
    
    if (!isGeneratedPlanet) {
      // Standard official planet progression
      const currentIdx = PLANETS.findIndex((p) => p.id === currentId);
      const baseIdx = currentIdx !== -1 ? currentIdx : currentPlanetIndex;
      const nextIdx = (baseIdx + 1) % PLANETS.length;
      const nextPlanet = PLANETS[nextIdx];

      setCurrentPlanetIndex(nextIdx);
      saveLastPlayedPlanetId(nextPlanet.id);

      // Check if the next planet has a saved custom map override
      const savedOverride = getSavedMapForPlanet(nextPlanet.id);
      if (savedOverride) {
        setCurrentCustomMap(savedOverride);
        const customPlanet = convertCustomMapToPlanet(savedOverride);
        const customWorld = convertCustomMapToWorld(savedOverride);
        initLevel(customPlanet, selectedShipId, customWorld);
      } else {
        setCurrentCustomMap(null);
        initLevel(nextPlanet, selectedShipId);
      }
      setGameState('playing');
    } else {
      // Continue through procedural generation seeds
      // Extract current seed from custom-map ID or from customMap
      let seed = currentSeed || (currentId.startsWith('custom-') ? parseInt(currentId.replace('custom-', ''), 10) : 99999);
      
      // Increment seed and create next procedural planet
      const nextSeed = seed + 1;
      const nextCustomPlanet = createCustomPlanet(nextSeed, 3.5, 'Medium');
      
      // Check if there's a saved custom map for this seed
      const savedOverride = getSavedMapForPlanet(nextCustomPlanet.id);
      if (savedOverride) {
        setCurrentCustomMap(savedOverride);
        const customPlanet = convertCustomMapToPlanet(savedOverride);
        const customWorld = convertCustomMapToWorld(savedOverride);
        initLevel(customPlanet, selectedShipId, customWorld);
      } else {
        setCurrentCustomMap(null);
        initLevel(nextCustomPlanet, selectedShipId);
      }
      setGameState('playing');
    }
  }, [planet, currentCustomMap, currentPlanetIndex, initLevel, selectedShipId]);

  // Restart Current Planet / Map
  const handleRestart = useCallback(() => {
    if (currentCustomMap) {
      const activeWorld = convertCustomMapToWorld(currentCustomMap);
      initLevel(planet, selectedShipId, activeWorld);
    } else {
      initLevel(planet, selectedShipId);
    }
  }, [initLevel, planet, currentCustomMap, selectedShipId]);

  // Return to Main Menu
  const handleReturnToMenu = useCallback(() => {
    sound.stopAllThrusters();
    sound.stopAmbience();
    sound.startMenuMusic();
    setGameState('menu');
  }, []);

  // Audio mute toggle
  const handleToggleMute = useCallback(() => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  }, []);

  // Music only mute toggle
  const handleToggleMusicMute = useCallback(() => {
    const nextMusicMuted = sound.toggleMusicMute();
    setIsMusicMuted(nextMusicMuted);
  }, []);

  // Thruster input handlers
  const handleLeftThrusterChange = useCallback((active: boolean) => {
    leftPressed.current = active;
    sound.setLeftThruster(
      active && shipRef.current.fuel > 0 && !shipRef.current.isCrashed && !shipRef.current.isLanded
    );
  }, []);

  const handleRightThrusterChange = useCallback((active: boolean) => {
    rightPressed.current = active;
    sound.setRightThruster(
      active && shipRef.current.fuel > 0 && !shipRef.current.isCrashed && !shipRef.current.isLanded
    );
  }, []);

  // Manual Cargo Winch Release
  const handleDetachCargo = useCallback(() => {
    const activeCargoId = shipRef.current.attachedCargoId;
    if (activeCargoId && world.cargoItems) {
      const cargo = world.cargoItems.find((c) => c.id === activeCargoId);
      if (cargo && cargo.isAttached) {
        cargo.isAttached = false;
        shipRef.current.attachedCargoId = null;
        shipRef.current.lastCargoEvent = {
          type: 'released',
          text: `CARGO HOOK RELEASED [${cargo.name.toUpperCase()}]`,
          time: elapsedTimeRef.current,
        };
        sound.playCargoLatch();
        if (particlesRef.current) {
          particlesRef.current.emitSparks(cargo.pos, 10);
        }
      }
    }
  }, [world]);

  // Keyboard Event Listeners
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') {
        if (gameState === 'menu' && (e.code === 'Enter' || e.code === 'Space')) {
          handleStartGame();
        }
        return;
      }

      if (e.repeat) return;

      // When modals are open, allow ESC to close them and prevent thruster firing
      if (isShipSelectorOpen || isPlanetSelectorOpen || isSettingsOpen || isHelpOpen) {
        if (e.code === 'Escape') {
          setIsShipSelectorOpen(false);
          setIsPlanetSelectorOpen(false);
          setIsSettingsOpen(false);
          setIsHelpOpen(false);
        }
        return;
      }

      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        handleLeftThrusterChange(true);
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        handleRightThrusterChange(true);
      }
      if (e.code === 'KeyC' || e.code === 'KeyX') {
        handleDetachCargo();
      }
      if (e.code === 'KeyR' || (e.code === 'Space' && (shipRef.current.isCrashed || shipRef.current.isLanded))) {
        handleRestart();
      }
      if (e.code === 'Escape') {
        setIsSettingsOpen((prev) => !prev);
      }
      if (e.code === 'KeyP') {
        setIsPlanetSelectorOpen((prev) => !prev);
      }
      if (e.code === 'KeyH') {
        setIsShipSelectorOpen((prev) => !prev);
      }
      if (e.code === 'KeyM') {
        if (isTestFlight) {
          handleReturnToEditor();
        } else {
          setGameState('menu');
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        handleLeftThrusterChange(false);
      }
      if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        handleRightThrusterChange(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [
    gameState,
    isTestFlight,
    isShipSelectorOpen,
    isPlanetSelectorOpen,
    isSettingsOpen,
    isHelpOpen,
    handleStartGame,
    handleLeftThrusterChange,
    handleRightThrusterChange,
    handleDetachCargo,
    handleRestart,
    handleReturnToEditor,
    handleReturnToMenu,
  ]);

  // Main 60 FPS Game Loop (when in 'playing' state)
  useEffect(() => {
    if (gameState !== 'playing') {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      sound.stopAllThrusters();
      sound.stopAmbience();
      return;
    }

    // Stop menu music when flight begins
    sound.stopMenuMusic();

    let prevWon = false;
    let prevCrashed = false;
    let hudUpdateCounter = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // 1. Update Thruster States from user input
          const currentShip = shipRef.current;
          const isEmpActive = (currentShip.empDisabledTimer || 0) > 0;
          currentShip.leftThruster =
            !isEmpActive && leftPressed.current && currentShip.fuel > 0 && !currentShip.isCrashed && !currentShip.isLanded;
          currentShip.rightThruster =
            !isEmpActive && rightPressed.current && currentShip.fuel > 0 && !currentShip.isCrashed && !currentShip.isLanded;

          // Sound update
          sound.setLeftThruster(currentShip.leftThruster);
          sound.setRightThruster(currentShip.rightThruster);

          // 2. Physics Simulation
          if (!currentShip.isCrashed && !currentShip.isLanded) {
            elapsedTimeRef.current += dt;

            // Emit Thruster Particles with Afterburner Flare
            const shipCfg = getShipConfig(currentShip.modelId);
            const rad = currentShip.angle;
            const cosA = Math.cos(rad);
            const sinA = Math.sin(rad);
            const rScale = shipCfg.renderScale || 1.0;

            if (currentShip.leftThruster) {
              const leftPos = {
                x: currentShip.pos.x + (shipCfg.localPoints.leftThrusterPos.x * cosA - shipCfg.localPoints.leftThrusterPos.y * sinA) * rScale,
                y: currentShip.pos.y + (shipCfg.localPoints.leftThrusterPos.x * sinA + shipCfg.localPoints.leftThrusterPos.y * cosA) * rScale,
              };
              particlesRef.current.emitThruster(leftPos, currentShip.angle, planet.theme.thrusterCore, shipCfg.thrustMultiplier);
            }
            if (currentShip.rightThruster) {
              const rightPos = {
                x: currentShip.pos.x + (shipCfg.localPoints.rightThrusterPos.x * cosA - shipCfg.localPoints.rightThrusterPos.y * sinA) * rScale,
                y: currentShip.pos.y + (shipCfg.localPoints.rightThrusterPos.x * sinA + shipCfg.localPoints.rightThrusterPos.y * cosA) * rScale,
              };
              particlesRef.current.emitThruster(rightPos, currentShip.angle, planet.theme.thrusterCore, shipCfg.thrustMultiplier);
            }

            // Update dynamic atmospheric wind whistling sound
            const altitudeRatio = Math.max(0, Math.min(1, 1 - currentShip.pos.y / world.height));
            const inCaveRatio = currentShip.pos.y > world.height * 0.45 ? 0.8 : 0.2;
            const shipSpeed = Math.hypot(currentShip.vel.x, currentShip.vel.y);

            sound.updateAmbience({
              altitudeRatio,
              inCaveRatio,
              speed: shipSpeed,
              atmosphereDensity: planet.windResistance ? planet.windResistance * 10 : 0.5,
              isCrashed: currentShip.isCrashed,
              isLanded: currentShip.isLanded,
            });
          } else {
            sound.stopAmbience();
          }

          const updatedShip = updatePhysics(currentShip, world, planet, dt, elapsedTimeRef.current, particlesRef.current);
          shipRef.current = updatedShip;

          // Check Win/Crash triggers
          if (updatedShip.hasWon && !prevWon) {
            prevWon = true;
            sound.stopAllThrusters();
            sound.stopAmbience();
            sound.playLandingChime();
            particlesRef.current.emitLandingCelebration(updatedShip.pos);
            if (!isTestFlight) {
              setCompletedPlanets((prev) => ({ ...prev, [planet.id]: true }));
            }
          }

          if (updatedShip.isCrashed && !prevCrashed) {
            prevCrashed = true;
            sound.stopAllThrusters();
            sound.stopAmbience();
            sound.playCrashSound();
            particlesRef.current.emitExplosion(updatedShip.pos, planet.theme.terrainAccent);
            particlesRef.current.emitShipBreakup(updatedShip);
          }

          // 3. Update Particles & Camera
          particlesRef.current.update(dt, planet.gravity);
          rendererRef.current.updateCamera(updatedShip, world, canvas.width, canvas.height, dt);

          // 4. Render Scene
          rendererRef.current.render(
            ctx,
            canvas.width,
            canvas.height,
            updatedShip,
            world,
            planet,
            particlesRef.current,
            settings,
            now * 0.001
          );

          // 5. Update HUD state throttled
          hudUpdateCounter++;
          if (hudUpdateCounter % 2 === 0) {
            setHudShipState({ ...updatedShip });
            setElapsedTime(elapsedTimeRef.current);
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      sound.stopAmbience();
      sound.stopAllThrusters();
    };
  }, [gameState, world, planet, settings]);

  // Responsive Canvas Resize Observer
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const width = rect.width > 0 ? rect.width : window.innerWidth;
        const height = rect.height > 0 ? rect.height : window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gameState]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {gameState === 'menu' && (
        <div className="w-full h-full flex-1 overflow-y-auto overflow-x-hidden">
          <StartMenu
            onStartGame={handleStartGame}
            selectedPlanetId={currentCustomMap ? `custom-${currentCustomMap.id}` : planet.id}
            selectedShipId={selectedShipId}
            onSelectShipId={handleSelectShipWithSave}
            completedPlanets={completedPlanets}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            isMusicMuted={isMusicMuted}
            onToggleMusicMute={handleToggleMusicMute}
            onOpenEditor={handleOpenEditor}
          />
        </div>
      )}

      {gameState === 'editor' && (
        <div className="w-full h-full">
          <MapEditor
            initialMap={currentCustomMap || undefined}
            onBackToMenu={() => setGameState('menu')}
            onExit={() => setGameState('menu')}
            onSave={(savedMap) => {
              setCurrentCustomMap(savedMap);
            }}
            onTestFly={handleTestFly}
          />
        </div>
      )}

      {gameState === 'playing' && (
        <main className="relative w-full h-full flex-1 overflow-hidden flex flex-col">
          {/* Flight Canvas Viewport */}
          <canvas
            ref={canvasRef}
            id="lander-viewport-canvas"
            className="absolute inset-0 w-full h-full block touch-none z-0"
          />

          {/* Streamlined Minimal In-Game Flight HUD */}
          <FlightHUD
            ship={hudShipState}
            planet={planet}
            world={world}
            elapsedTime={elapsedTime}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onRestart={handleRestart}
            onReturnToMenu={isTestFlight ? handleReturnToEditor : handleReturnToMenu}
            onOpenShips={() => setIsShipSelectorOpen(true)}
            isTestFlight={isTestFlight}
            onReturnToEditor={handleReturnToEditor}
          />

          {/* Invisible Dual Thruster Full-Screen Touch Zones (No Buttons) */}
          <TouchControls
            onLeftThrusterChange={handleLeftThrusterChange}
            onRightThrusterChange={handleRightThrusterChange}
            isLeftActive={!!hudShipState.leftThruster}
            isRightActive={!!hudShipState.rightThruster}
            disabled={hudShipState.isCrashed || hudShipState.isLanded}
          />

          {/* Dedicated In-Game Settings & Pause Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            planet={planet}
            ship={hudShipState}
            world={world}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onRestart={handleRestart}
            onOpenPlanets={() => setIsPlanetSelectorOpen(true)}
            onOpenShips={() => setIsShipSelectorOpen(true)}
            onOpenEditor={() => handleOpenEditor(currentCustomMap || undefined)}
            onOpenHelp={() => setIsHelpOpen(true)}
            onReturnToMenu={isTestFlight ? handleReturnToEditor : handleReturnToMenu}
            showDebug={showDebug}
            onToggleDebug={() => setShowDebug((prev) => !prev)}
            isCustomMap={!!currentCustomMap}
            isTestFlight={isTestFlight}
            onReturnToEditor={handleReturnToEditor}
          />

          {/* Diagnostic Debug Overlay (when enabled in settings) */}
          <DebugOverlay
            ship={hudShipState}
            planet={planet}
            world={world}
            elapsedTime={elapsedTime}
            canvasRef={canvasRef}
            isOpen={showDebug}
            onClose={() => setShowDebug(false)}
          />

          {/* Modals & Overlays */}
          <PlanetSelector
            currentPlanet={planet}
            onSelectPlanet={handleSelectPlanet}
            isOpen={isPlanetSelectorOpen}
            onClose={() => setIsPlanetSelectorOpen(false)}
            completedPlanets={completedPlanets}
            onOpenEditor={handleOpenEditor}
            onSelectCustomMap={handlePlayCustomMap}
          />

          {isShipSelectorOpen && (
            <ShipSelector
              selectedModelId={selectedShipId}
              onSelectModel={(newModel) => {
                handleSelectShipModel(newModel);
                setIsShipSelectorOpen(false);
              }}
              onClose={() => setIsShipSelectorOpen(false)}
              isModal={true}
            />
          )}

          <MissionOverlays
            ship={hudShipState}
            planet={planet}
            onRestart={handleRestart}
            onNextPlanet={handleNextPlanet}
            onMainMenu={isTestFlight ? undefined : handleReturnToMenu}
            isHelpOpen={isHelpOpen}
            onToggleHelp={() => setIsHelpOpen(!isHelpOpen)}
            isCustomMap={!!currentCustomMap}
            isTestFlight={isTestFlight}
            onReturnToEditor={handleReturnToEditor}
            onOpenEditor={() => handleOpenEditor(currentCustomMap || undefined)}
          />
        </main>
      )}

      {/* Global Subtle Achievement & Milestone Toast System */}
      <AchievementToastContainer />

      {/* Real-Time Cargo Identification & Hazard Briefing Toast System */}
      <CargoHazardToastContainer />
    </div>
  );
}
