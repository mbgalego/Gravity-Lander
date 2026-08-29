export interface Vector2D {
  x: number;
  y: number;
}

export type ShipModelId =
  | 'apollo'
  | 'titan'
  | 'viper'
  | 'aegis'
  | 'nebula'
  | 'vanguard'
  | 'goliath'
  | 'behemoth'
  | 'leviathan'
  | 'mammoth'
  | 'wasp'
  | 'kestrel'
  | 'spectre'
  | 'orion'
  | 'valkyrie'
  | 'juggernaut';

export interface ShipLocalPoints {
  nose: Vector2D;
  leftShoulder: Vector2D;
  rightShoulder: Vector2D;
  leftHip: Vector2D;
  rightHip: Vector2D;
  leftFoot: Vector2D;
  rightFoot: Vector2D;
  leftThrusterPos: Vector2D;
  rightThrusterPos: Vector2D;
  extraLeftFoot?: Vector2D;
  extraRightFoot?: Vector2D;
}

export interface PlanetaryTruck {
  id: string;
  name: string;
  type: 'rover' | 'heavy_truck';
  pos: Vector2D;
  vel: Vector2D;
  width: number;
  height: number;
  state: 'waiting_at_depot' | 'driving_to_craft' | 'onboard' | 'driving_out' | 'delivered';
  progress: number; // 0 to 1 for ramp driving animation
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  color: string;
  accentColor: string;
  wheelAngle: number;
  headlightsOn: boolean;
  depotId?: string;
}

export interface ShipModelConfig {
  id: ShipModelId;
  name: string;
  codename: string;
  tagline: string;
  description: string;
  classType?: 'Small Recon' | 'Medium Explorer' | 'Heavy Transport' | 'Rover Transporter';
  width: number;
  height: number;
  maxFuel: number;
  thrustMultiplier: number;
  torqueMultiplier: number;
  mass: number;
  armor: number; // 0.10 to 0.75 (damage absorption)
  primaryColor: string;
  accentColor: string;
  visorColor: string;
  localPoints: ShipLocalPoints;
  footpadSpan: number;
  renderScale?: number;
  isHeavyVehicleCarrier?: boolean;
  canCarryVehicles?: boolean;
  emptyMassTons?: number;
  maxThrustKn?: number;
  twr?: number;
  rcsResponseMs?: number;
  armorRatingMm?: number;
  cargoHookCapacityKg?: number;
  roverBayCapacity?: string;
  propulsionType?: string;
  operationalCeiling?: string;
  manufactureOrigin?: string;
  stats: {
    agility: number; // 1 to 5
    fuelTank: number; // 1 to 5
    stability: number; // 1 to 5
    thrust: number; // 1 to 5
    armor: number; // 1 to 5
  };
}

export interface ShipState {
  pos: Vector2D;
  vel: Vector2D;
  angle: number; // in radians, 0 is pointing straight UP
  angularVel: number; // in radians/s
  fuel: number;
  maxFuel: number;
  hull: number; // 0 to 100%
  maxHull: number;
  modelId: ShipModelId;
  leftThruster: boolean;
  rightThruster: boolean;
  isLanded: boolean;
  landingSettling: boolean;
  settleProgress: number; // 0 to 1.0
  isCrashed: boolean;
  crashTime: number;
  crashReason?: string;
  hasWon: boolean;
  lastDamageTime?: number;
  recentDamageAmount?: number;
  isSmoking?: boolean;
  isSparking?: number;
  thrusterDegraded?: boolean;
  isRepairing?: boolean;
  attachedCargoId?: string | null;
  deliveredCargoCount?: number;
  totalCargoCount?: number;
  totalMassKg?: number;
  cargoTension?: number; // 0 to 1.0
  rampState?: 'closed' | 'opening' | 'open' | 'closing';
  rampProgress?: number; // 0 (closed) to 1 (fully lowered ramp)
  gearCompression?: number; // 0.0 (fully extended in flight) to 1.0 (fully compressed upon heavy touchdown)
  gearSpringVelocity?: number; // spring velocity for realistic suspension oscillation on landing and liftoff
  loadedTrucksCount?: number;
  deliveredTrucksCount?: number;
  totalTrucksCount?: number;
  lastCargoEvent?: {
    type: 'attached' | 'delivered' | 'snapped' | 'truck_loaded' | 'truck_delivered' | 'detached';
    text: string;
    time: number;
  };
  landingScore?: LandingScore;
}

export interface CargoDeliveryReport {
  id: string;
  name: string;
  cargoType: CargoType;
  weightClass: CargoWeightClass;
  mass: number;
  isDelivered: boolean;
  baseScore: number;
  conditionPct: number; // 0 to 100
  conditionStatus: string;
  conditionMultiplier: number;
  finalScore: number;
}

export interface LandingScore {
  softness: number;
  fuelRemaining: number;
  hullRemaining?: number;
  hullBonus?: number;
  timeBonus: number;
  cargoBonus?: number;
  vehicleBonus?: number;
  cargoDetails?: CargoDeliveryReport[];
  timeTaken: number;
  parTime: number;
  total: number;
  rank?: 'S' | 'A' | 'B' | 'C';
  isNewBestTime?: boolean;
  isNewHighScore?: boolean;
}

export interface TerrainPoint {
  x: number;
  y: number;
}

export interface TerrainSegment {
  p1: TerrainPoint;
  p2: TerrainPoint;
  type: 'ground' | 'ceiling' | 'wall' | 'landing_pad' | 'launch_pad';
}

export type CargoWeightClass = 'light' | 'medium' | 'heavy';
export type CargoType = 'standard' | 'explosive' | 'cryogenic' | 'isotope' | 'magnetic' | 'plasma';

export type MapTextSize = 'small' | 'medium' | 'large' | 'xl' | 'xxl';
export type MapTextStyle = 'monospace' | 'mono' | 'sans-serif' | 'orbitron' | 'rajdhani' | 'courier';
export type MapTextAlign = 'left' | 'center' | 'right';

export interface MapTextNote {
  id: string;
  x: number;
  y: number;
  text: string;
  size: MapTextSize;
  color: string;
  style: MapTextStyle;
  showBorder: boolean;
  align?: MapTextAlign;
}

export interface CargoContainer {
  id: string;
  name: string;
  weightClass: CargoWeightClass;
  cargoType?: CargoType;
  mass: number; // in kg (e.g. 150, 350, 750)
  pos: Vector2D;
  vel: Vector2D;
  width: number;
  height: number;
  isAttached: boolean;
  isDelivered: boolean;
  tetherLength: number; // nominal wire length in px
  color: string;
  accentColor: string;
  deliveredTime?: number;
  pickupPadId?: string;
  platformId?: string;
  dropZoneId?: string;
  // Volatile & Fragile Cargo Transport attributes
  integrity?: number; // 0 to 100% (for fragile isotope and physical structural damage)
  temperature?: number; // 0 to 100% (for cryogenic pods; heats up near magma / friction)
  chargeTimer?: number; // seconds remaining before discharge for plasma battery
  maxChargeTimer?: number;
  isDetonated?: boolean;
  hazardStatus?: string;
  empCooldown?: number;
}

export interface CargoPlatform {
  id: string;
  type: 'pickup' | 'vehicle_depot' | 'vehicle_dest';
  x1: number;
  x2: number;
  y: number;
  width: number;
  center: Vector2D;
  label: string;
  weightClass?: CargoWeightClass;
  cargoWeight?: CargoWeightClass;
  cargoType?: CargoType;
  cargoId?: string;
  isFulfilled?: boolean;
  truckCount?: number;
}

export interface CaveZoneInfo {
  id: string;
  name: string;
  level: number; // 1 = Upper, 2 = Middle, 3 = Deep Abyss
  bounds: { x1: number; x2: number; y1: number; y2: number };
  description?: string;
}

export interface LandingPad {
  x1: number;
  x2: number;
  y: number;
  width: number;
  center: Vector2D;
}

export interface FuelPickup {
  id: string;
  x: number;
  y: number;
  radius: number;
  amount: number;
  collected: boolean;
}

export interface MineSignpost {
  id: string;
  x: number;
  y: number;
  direction: 'left' | 'right' | 'down' | 'up' | 'down_left' | 'down_right' | 'up_left' | 'up_right';
  targetType: 'pickup' | 'vehicle_depot' | 'drop' | 'landing' | 'launch' | 'fuel';
  targetName: string;
  color: string;
  distanceMeters?: number;
  subText?: string;
}

export interface VolcanicRock {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  color: string;
  glowColor: string;
  active: boolean;
}

export interface VolcanoHazard {
  id: string;
  name?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  calderaWidth: number;
  eruptionHeight: number;
  interval: number;
  duration: number;
  hazardRadius: number;
  colorTheme: 'magma' | 'plasma' | 'toxic' | 'cryo';
  cycleTimer: number;
  isErupting: boolean;
  isCharging: boolean;
  eruptPhase: number;
  rocks: VolcanicRock[];
}

export interface WorldMap {
  width: number;
  height: number;
  groundPoints: TerrainPoint[];
  ceilingPoints: TerrainPoint[];
  obstacles: TerrainPoint[][];
  segments: TerrainSegment[];
  launchPad: LandingPad;
  landingPad: LandingPad;
  cargoPlatforms?: CargoPlatform[];
  cargoItems?: CargoContainer[];
  trucks?: PlanetaryTruck[];
  caveZones?: CaveZoneInfo[];
  signposts?: MineSignpost[];
  textNotes?: MapTextNote[];
  pickups: FuelPickup[];
  checkpoints?: Vector2D[];
  volcanoes?: VolcanoHazard[];
}

export interface PlanetConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  sizeCategory?: 'Small' | 'Medium' | 'Large' | 'Very Large';
  width?: number;
  height?: number;
  surfacePressureBar?: number;
  surfaceTempC?: number;
  radiationRadPerHr?: number;
  windSpeedKmh?: number;
  hazards?: string[];
  objectives?: string[];
  recommendedCraft?: string;
  gravity: number; // e.g. 1.2 to 8.5
  airResistance: number; // 0.0001 to 0.005
  fuelBurnRate: number; // 15 to 30
  theme: {
    skyTop: string;
    skyBottom: string;
    terrainFill: string;
    terrainBorder: string;
    terrainAccent: string;
    gridColor: string;
    dustColor: string;
    starDensity: number;
    glowColor: string;
  };
  seed: number;
  targetTimeSec: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  masterVolume: number;
  showMinimap: boolean;
  showFlightPath: boolean;
  touchControls: boolean;
  highPrecisionMode: boolean;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
  isGlow?: boolean;
  glowColor?: string;
}

export type EditorToolType =
  | 'select'
  | 'pan'
  | 'ground'
  | 'ceiling'
  | 'cave_layer'
  | 'cave_tunnel'
  | 'cargo_pickup'
  | 'vehicle_depot'
  | 'obstacle_polygon'
  | 'volcano'
  | 'signpost'
  | 'text'
  | 'fuel'
  | 'eraser';

export interface CustomVolcanoData {
  id: string;
  name?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  calderaWidth?: number;
  eruptionHeight?: number;
  interval?: number;
  duration?: number;
  eruptionInterval?: number;
  eruptionDuration?: number;
  hazardRadius?: number;
  colorTheme?: 'magma' | 'plasma' | 'toxic' | 'cryo';
}

export interface CustomCargoPlatformData {
  id: string;
  type: 'pickup' | 'vehicle_depot' | 'vehicle_dest';
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
  direction: 'left' | 'right' | 'down' | 'up' | 'down_left' | 'down_right' | 'up_left' | 'up_right';
  targetType: 'landing' | 'pickup' | 'vehicle_depot' | 'drop' | 'launch' | 'fuel';
  targetName: string;
  subText?: string;
  color?: string;
  distanceMeters?: number;
}

export interface CustomTextNoteData {
  id: string;
  x: number;
  y: number;
  text: string;
  size: MapTextSize;
  color: string;
  style: MapTextStyle;
  showBorder: boolean;
  align?: MapTextAlign;
}

export interface CustomObstacleData {
  id: string;
  name: string;
  type: 'arch' | 'spire' | 'pillar' | 'island' | 'polygon' | 'strata' | 'cave_shelf' | 'tunnel';
  points: TerrainPoint[];
}

export interface CustomFuelData {
  id: string;
  x: number;
  y: number;
  amount: number;
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
}

export interface CustomMapData {
  id: string;
  name: string;
  description: string;
  author: string;
  createdAt: number;
  updatedAt: number;
  worldWidth: number;
  worldHeight: number;
  gravity: number;
  airResistance: number;
  fuelBurnRate: number;
  targetTimeSec: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  difficultyMode?: 'auto' | 'manual';
  themeId: string;
  customTheme?: CustomMapTheme;
  terrainLineStyle?: 'straight' | 'curved';
  launchPad: {
    x: number;
    y: number;
    width: number;
  };
  landingPad: {
    x: number;
    y: number;
    width: number;
  };
  groundNodes: TerrainPoint[];
  ceilingNodes: TerrainPoint[];
  obstacles: CustomObstacleData[];
  fuelPickups: CustomFuelData[];
  cargoPlatforms?: CustomCargoPlatformData[];
  signposts?: CustomSignpostData[];
  textNotes?: CustomTextNoteData[];
  volcanoes?: CustomVolcanoData[];
}

