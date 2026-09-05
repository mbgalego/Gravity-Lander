export interface Vector2D {
  x: number;
  y: number;
}

export interface TerrainPoint {
  x: number;
  y: number;
}

export interface TerrainSegment {
  p1: Vector2D;
  p2: Vector2D;
  angle?: number;
  length?: number;
  normal?: Vector2D;
  isLandingPad?: boolean;
  isCeiling?: boolean;
  type?: string;
}

export interface LandingPad {
  p1?: Vector2D;
  p2?: Vector2D;
  length?: number;
  center: Vector2D;
  isSecondary?: boolean;
  isVehicleDepot?: boolean;
  x?: number;
  y: number;
  x1?: number;
  x2?: number;
  width: number;
}

export interface FuelPickup {
  id: string;
  pos?: Vector2D;
  x?: number;
  y?: number;
  radius?: number;
  collected?: boolean;
  amount?: number;
  respawnTimer?: number;
}

export type CargoWeightClass = 'light' | 'medium' | 'heavy';
export type CargoType = 'standard' | 'explosive' | 'cryogenic' | 'isotope' | 'magnetic' | 'plasma';

export interface CargoContainer {
  id: string;
  name: string;
  weightClass: CargoWeightClass;
  cargoType: CargoType;
  mass: number;
  radius?: number;
  width?: number;
  height?: number;
  color?: string;
  accentColor?: string;
  chargeTimer?: number;
  maxChargeTimer?: number;
  tetherLength?: number;
  isDetonated?: boolean;
  pos: Vector2D;
  vel: Vector2D;
  attached?: boolean;
  delivered?: boolean;
  deliveredTime?: number;
  isAttached?: boolean;
  isDelivered?: boolean;
  integrity: number;
  temperature?: number;
  charge?: number;
  timer?: number;
  isExploded?: boolean;
  glowColor?: string;
  pickupPadId?: string;
  platformId?: string;
}

export interface CargoPlatform {
  id: string;
  pos?: Vector2D;
  width: number;
  type: 'pickup' | 'delivery' | 'vehicle_depot';
  label?: string;
  cargo?: CargoContainer;
  cargoId?: string;
  cargoType?: CargoType;
  weightClass?: CargoWeightClass;
  cargoWeight?: any;
  active?: boolean;
  truckCount?: number;
  center?: any;
  y?: number;
  x1?: number;
  x2?: number;
  isFulfilled?: boolean;
}

export interface PlanetaryTruck {
  id: string;
  name?: string;
  x?: number;
  y?: number;
  width: number;
  height: number;
  speed?: number;
  minX?: number;
  maxX?: number;
  dir?: number;
  wheelRotation?: number;
  wheelAngle?: number;
  color?: string;
  accentColor?: string;
  type?: string;
  bedLoad?: 'empty' | 'ore' | 'cargo_crate' | 'fuel_cell' | any;
  headlightGlow?: boolean;
  headlightsOn?: boolean;
  exhaustTimer?: number;
  state?: string;
  pos?: Vector2D;
  vel?: Vector2D;
  baseX?: number;
  baseY?: number;
  targetX?: number;
  targetY?: number;
  progress?: number;
}

export interface CaveZoneInfo {
  id: string;
  name: string;
  description?: string;
  level: number;
  bounds: { x1: number; x2: number; y1: number; y2: number };
}

export interface MineSignpost {
  id: string;
  pos?: Vector2D;
  x?: number;
  y?: number;
  direction: 'left' | 'right' | 'up' | 'down' | 'up_left' | 'up_right' | 'down_left' | 'down_right';
  targetType: 'landing' | 'pickup' | 'hazard' | 'vehicle_depot' | 'fuel' | 'launch' | any;
  targetName: string;
  subText?: string;
  color: string;
  distanceMeters?: number;
}

export interface VolcanoHazard {
  id: string;
  name?: string;
  pos?: Vector2D;
  x: number;
  y: number;
  width: number;
  height: number;
  calderaWidth: number;
  calderaX?: number;
  calderaY?: number;
  eruptionHeight: number;
  eruptionInterval?: number;
  eruptionDuration?: number;
  timer?: number;
  isErupting?: boolean;
  colorTheme: 'magma' | 'plasma' | 'toxic' | 'cryo';
  particleTimer?: number;
  isCharging?: boolean;
  eruptPhase?: number;
  rocks?: VolcanicRock[];
  cycleTimer?: number;
  interval?: number;
  duration?: number;
  hazardRadius?: number;
}

export interface VolcanicRock {
  id: string | number;
  pos?: Vector2D;
  vel?: Vector2D;
  radius?: number;
  rotation: number;
  rotSpeed: number;
  lifetime?: number;
  maxLifetime?: number;
  colorTheme?: 'magma' | 'plasma' | 'toxic' | 'cryo' | any;
  active?: boolean;
  maxLife?: number;
  life?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  size?: number;
  color?: string;
  glowColor?: string;
}

export type MapTextSize = 'small' | 'medium' | 'large' | 'xl' | 'xxl';
export type MapTextStyle = 'normal' | 'glow' | 'danger' | 'tech' | 'monospace' | 'mono' | 'sans-serif' | 'orbitron' | 'rajdhani' | 'courier' | string;
export type MapTextAlign = 'left' | 'center' | 'right';

export interface MapTextNote {
  id: string;
  pos?: Vector2D;
  x?: number;
  y?: number;
  text: string;
  size: MapTextSize;
  style: MapTextStyle;
  align?: MapTextAlign;
  color: string;
  showBorder?: boolean;
}

export interface WorldMap {
  width: number;
  height: number;
  groundSegments?: TerrainSegment[];
  ceilingSegments?: TerrainSegment[];
  segments?: TerrainSegment[];
  launchPad: LandingPad;
  landingPad: LandingPad;
  secondaryPads?: LandingPad[];
  fuelPickups?: FuelPickup[];
  pickups: FuelPickup[];
  cargoPlatforms: CargoPlatform[];
  cargoContainers?: CargoContainer[];
  cargoItems?: CargoContainer[];
  trucks: PlanetaryTruck[];
  caveZones?: CaveZoneInfo[];
  signposts: MineSignpost[];
  volcanoes?: VolcanoHazard[];
  volcanicRocks?: VolcanicRock[];
  textNotes?: MapTextNote[];
  groundPoints?: TerrainPoint[];
  ceilingPoints?: TerrainPoint[];
  obstacles?: any;
  obstacleObjects?: any;
  rawGroundPoints?: TerrainPoint[];
  rawCeilingPoints?: TerrainPoint[];
  rawObstacles?: CustomObstacleData[];
}

export type ShipModelId =
  | 'viper'
  | 'wasp'
  | 'kestrel'
  | 'spectre'
  | 'apollo'
  | 'aegis'
  | 'nebula'
  | 'vanguard'
  | 'orion'
  | 'valkyrie'
  | 'titan'
  | 'goliath'
  | 'behemoth'
  | 'leviathan'
  | 'mammoth'
  | 'juggernaut'
  | 'sparrow'
  | 'phoenix'
  | 'nautilus'
  | 'mantis'
  | 'colossus';

export interface ShipLocalPoints {
  [key: string]: Vector2D;
}

export interface ShipModelConfig {
  id: ShipModelId;
  name: string;
  description: string;
  codename?: string;
  tagline?: string;
  classType?: string;
  width?: number;
  height?: number;
  renderScale?: number;
  dryMass?: number;
  mass?: number;
  armor?: number;
  emptyMassTons?: number;
  maxThrustKn?: number;
  twr?: number;
  rcsResponseMs?: number;
  armorRatingMm?: number;
  cargoHookCapacityKg?: number;
  roverBayCapacity?: string;
  operationalCeiling?: string;
  manufactureOrigin?: string;
  footpadSpan?: number;
  canCarryVehicles?: boolean;
  isHeavyVehicleCarrier?: boolean;
  maxFuel: number;
  thrustMultiplier?: number;
  torqueMultiplier?: number;
  mainThrustForce?: number;
  rcsThrustForce?: number;
  fuelBurnRateMultiplier?: number;
  maxLandingSpeed?: number;
  maxLandingAngle?: number;
  cableAnchorOffset?: Vector2D;
  cargoCapacity?: 'light' | 'medium' | 'heavy';
  hullHealthMax?: number;
  propulsionType?: string;
  rcsType?: string;
  avionicsRating?: string;
  dimensions?: { width: number; height: number };
  visualColor?: string;
  primaryColor: string;
  accentColor: string;
  visorColor: string;
  thrusterColor?: string;
  localPoints?: Record<string, Vector2D>;
  stats?: {
    agility: number;
    fuelTank: number;
    stability: number;
    thrust: number;
    armor: number;
  };
  role?: string;
}

export interface ShipState {
  pos: Vector2D;
  vel: Vector2D;
  angle: number;
  angularVel: number;
  fuel: number;
  maxFuel: number;
  health?: number;
  maxHealth?: number;
  altitude?: number;
  isLanded?: boolean;
  isCrashed?: boolean;
  crashReason?: string;
  crashTime?: number;
  isRefueling?: boolean;
  missionSuccess?: boolean;
  hasWon?: boolean;
  totalMassKg?: number;
  attachedCargo?: CargoContainer | null;
  attachedCargoId?: string | null;
  winchCableLength?: number;
  winchTargetLength?: number;
  model?: ShipModelId;
  modelId?: ShipModelId;
  leftThruster?: number | boolean;
  rightThruster?: number | boolean;
  hull?: number;
  maxHull?: number;
  isRepairing?: boolean;
  empDisabledTimer?: number;
  rampProgress?: number;
  gearCompression?: number;
  gearSpringVelocity?: number;
  rampState?: string;
  lastCargoEvent?: any;
  deliveredCargoCount?: number;
  deliveredTrucksCount?: number;
  loadedTrucksCount?: number;
  landingSettling?: number | boolean;
  settleProgress?: number;
  landingScore?: any;
  isSmoking?: boolean;
  thrusterDegraded?: boolean;
  totalCargoCount?: number;
  totalTrucksCount?: number;
  cargoTension?: number;
}

export interface PlanetTheme {
  skyTop: string;
  skyBottom: string;
  terrainFill: string;
  terrainBorder: string;
  terrainAccent: string;
  gridColor: string;
  dustColor: string;
  glowColor: string;
  starDensity: number;
  thrusterCore?: string;
  [key: string]: any;
}

export interface PlanetConfig {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  gravity: number;
  airResistance: number;
  terrainRoughness?: number;
  fuelBurnRate: number;
  targetTimeSec: number;
  hazards?: string[];
  objectives?: string[];
  visualTheme?: PlanetTheme;
  theme: PlanetTheme;
  difficulty: string;
  category?: string;
  sizeCategory?: string;
  width?: number;
  height?: number;
  surfacePressureBar?: number;
  surfaceTempC?: number;
  radiationRadPerHr?: number;
  windSpeedKmh?: number;
  windResistance?: number;
  recommendedCraft?: any;
  seed?: number;
  author?: string;
  isCustom?: boolean;
}

export interface CustomObstacleData {
  id: string;
  name: string;
  type: 'polygon' | 'arch' | 'spire' | 'strata' | 'crystals' | 'pillar' | 'island' | 'crystal' | string;
  points: TerrainPoint[];
  color?: string;
}

export interface CustomFuelData {
  id: string;
  x: number;
  y: number;
  amount: number;
}

export interface CustomCargoPlatformData {
  id: string;
  type: 'pickup' | 'delivery' | 'vehicle_depot';
  x: number;
  y: number;
  width: number;
  weightClass?: CargoWeightClass;
  cargoType?: CargoType;
  label?: string;
  truckCount?: number;
}

export interface CustomSignpostData {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right' | 'up' | 'down' | 'up_left' | 'up_right' | 'down_left' | 'down_right';
  targetType: 'landing' | 'pickup' | 'hazard' | 'vehicle_depot' | 'fuel' | 'launch' | any;
  targetName: string;
  subText?: string;
  color: string;
  distanceMeters?: number;
}

export interface CustomTextNoteData {
  id: string;
  x: number;
  y: number;
  text: string;
  size: MapTextSize;
  style: MapTextStyle;
  align?: MapTextAlign;
  color: string;
  showBorder?: boolean;
}

export interface CustomVolcanoData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  calderaWidth: number;
  eruptionHeight: number;
  eruptionInterval?: number;
  eruptionDuration?: number;
  colorTheme?: 'magma' | 'plasma' | 'toxic' | 'cryo';
  interval?: number;
  duration?: number;
  hazardRadius?: number;
  name?: string;
}

export interface CustomMapTheme {
  id: string;
  name: string;
  skyTop: string;
  skyBottom: string;
  terrainFill: string;
  terrainBorder: string;
  terrainAccent: string;
  gridColor: string;
  dustColor: string;
  glowColor: string;
  starDensity: number;
  isCustom?: boolean;
  thrusterCore?: string;
}

export interface CustomMapData {
  id: string;
  name: string;
  description: string;
  author?: string;
  createdAt: number;
  updatedAt: number;
  themeId?: string;
  customTheme?: CustomMapTheme;
  terrainLineStyle?: 'straight' | 'smooth' | 'curved';
  worldWidth: number;
  worldHeight: number;
  gravity: number;
  airResistance: number;
  fuelBurnRate: number;
  targetTimeSec: number;
  difficulty: string;
  launchPad: { x: number; y: number; width: number };
  landingPad: { x: number; y: number; width: number };
  groundNodes: TerrainPoint[];
  ceilingNodes?: TerrainPoint[];
  obstacles?: CustomObstacleData[];
  fuelPickups?: CustomFuelData[];
  cargoPlatforms?: CustomCargoPlatformData[];
  signposts?: CustomSignpostData[];
  textNotes?: CustomTextNoteData[];
  difficultyMode?: 'auto' | 'manual';
  volcanoes?: CustomVolcanoData[];
  basePlanet?: string;
  seed?: number;
}

export interface CargoDeliveryReport {
  id?: string;
  name?: string;
  cargoName?: string;
  weightClass?: CargoWeightClass;
  cargoType?: CargoType;
  timeElapsed?: number;
  targetTime?: number;
  fuelRemaining?: number;
  cargoIntegrity?: number;
  timeBonus?: number;
  fuelBonus?: number;
  conditionBonus?: number;
  rawScore?: number;
  baseScore?: number;
  finalScore?: number;
  mass?: number;
  isDelivered?: boolean;
  conditionPct?: number;
  conditionStatus?: string;
  conditionMultiplier?: number;
  rating?: 'PERFECT' | 'EXCELLENT' | 'GOOD' | 'PASS' | 'FAILED';
  specialBonusText?: string;
}

export interface Particle {
  pos?: Vector2D;
  vel?: Vector2D;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  color: string;
  glowColor?: string;
  isGlow?: boolean;
  size: number;
  alpha: number;
  maxLife: number;
  life: number;
  type?: 'thrust' | 'rcs' | 'dust' | 'spark' | 'explosion' | 'smoke' | 'debris' | 'magma' | 'geyser' | 'cryo' | 'plasma' | string;
}

export interface GameSettings {
  soundVolume?: number;
  musicVolume?: number;
  controlSensitivity?: number;
  showHUD?: boolean;
  touchControls?: boolean;
  colorblindMode?: boolean;
  screenShake?: boolean;
  particleQuality?: 'low' | 'medium' | 'high';
  soundEnabled?: boolean;
  musicEnabled?: boolean;
  masterVolume?: number;
  highPrecisionMode?: boolean;
  showMinimap?: boolean;
  showFlightPath?: boolean;
}

export type EditorToolType =
  | 'select'
  | 'pan'
  | 'draw_ground'
  | 'draw_ceiling'
  | 'eraser'
  | 'add_obstacle'
  | 'add_fuel'
  | 'add_cargo'
  | 'add_signpost'
  | 'add_volcano'
  | 'add_text'
  | 'signpost'
  | 'text'
  | 'volcano'
  | 'cave_layer'
  | 'fuel'
  | 'cargo_pickup'
  | 'vehicle_depot'
  | string;
