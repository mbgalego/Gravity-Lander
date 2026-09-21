import { ShipModelConfig, ShipModelId } from '../types';

export const SHIPS: ShipModelConfig[] = [
  // =========================================================================
  // 1. SMALL RECON & RACING CRAFTS (Ultralight, High Agility, Precision Vector)
  // =========================================================================
  {
    id: 'viper',
    name: 'Colonial Viper',
    codename: 'Mk II Interceptor',
    tagline: 'Colonial Fleet Starfighter',
    classType: 'Interceptor',
    description: 'The legendary Colonial Fleet starfighter — a fast, agile interceptor with a needle nose, broad delta wings and twin turbo-fusion engines. Its golden wing-root cannons and deep-blue faceted canopy are recognizable across the fleet.',
    width: 90,
    height: 95,
    renderScale: 1.4,
    maxFuel: 100,
    thrustMultiplier: 1.15,
    torqueMultiplier: 1.10,
    mass: 1.25,
    armor: 0.16,
    emptyMassTons: 6.8,
    maxThrustKn: 72,
    twr: 1.65,
    rcsResponseMs: 12,
    armorRatingMm: 30,
    cargoHookCapacityKg: 250,
    roverBayCapacity: 'None (Starfighter Hull)',
    propulsionType: 'Twin Turbo-Fusion Reaction Drives',
    operationalCeiling: 'Atmospheric & Space Intercept',
    manufactureOrigin: 'Colonial Fleet Yards (Ragnar Anchorage)',
    primaryColor: '#cbd5e1',
    accentColor: '#ef4444',
    visorColor: '#1e1b4b',
    footpadSpan: 61.6,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -53.2 },
      leftShoulder: { x: -44.8, y: -4.2 },
      rightShoulder: { x: 44.8, y: -4.2 },
      leftHip: { x: -26.0, y: 25.2 },
      rightHip: { x: 26.0, y: 25.2 },
      leftFoot: { x: -30.8, y: 41.3 },
      rightFoot: { x: 30.8, y: 41.3 },
      leftThrusterPos: { x: -18.9, y: 33.6 },
      rightThrusterPos: { x: 18.9, y: 33.6 },
    },
    stats: {
      agility: 4,
      fuelTank: 2,
      stability: 4,
      thrust: 4,
      armor: 3,
    },
  },
  {
    id: 'wasp',
    name: 'Wasp Heavy Fighter',
    codename: 'WS-3 Stinger',
    tagline: 'Armored Gunship Interceptor',
    classType: 'Heavy Fighter',
    description: 'A heavily armored gunship built around twin hull-mounted fusion torches and wing cannon pods. Sluggish in a turn but brutally durable, with a deep-space fuel reserve and a raised armor spine meant to shrug off hits that would shred lighter craft.',
    width: 102,
    height: 95,
    renderScale: 1.4,
    maxFuel: 120,
    thrustMultiplier: 1.4,
    torqueMultiplier: 0.9,
    mass: 2.2,
    armor: 0.35,
    emptyMassTons: 21.4,
    maxThrustKn: 168,
    twr: 1.62,
    rcsResponseMs: 34,
    armorRatingMm: 90,
    cargoHookCapacityKg: 150,
    roverBayCapacity: 'None (Armored Chassis)',
    propulsionType: 'Twin Heavy Fusion Torch Drives',
    operationalCeiling: 'High-Atmosphere & Orbital Strike',
    manufactureOrigin: 'Stinger Aerospace (Ganymede)',
    primaryColor: '#cbd5e1',
    accentColor: '#ea580c',
    visorColor: '#0f172a',
    footpadSpan: 67.2,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -53.2 },
      leftShoulder: { x: -42.0, y: -8.4 },
      rightShoulder: { x: 42.0, y: -8.4 },
      leftHip: { x: -18.2, y: 36.4 },
      rightHip: { x: 18.2, y: 36.4 },
      leftFoot: { x: -33.6, y: 41.3 },
      rightFoot: { x: 33.6, y: 41.3 },
      leftThrusterPos: { x: -13.3, y: 39.2 },
      rightThrusterPos: { x: 13.3, y: 39.2 },
    },
    stats: {
      agility: 3,
      fuelTank: 3,
      stability: 4,
      thrust: 5,
      armor: 5,
    },
  },  {
    id: 'kestrel',
    name: 'Kestrel Stunt',
    codename: 'KS-9 Aerobatic Dart',
    tagline: 'Delta-Wing Acrobat Lander',
    classType: 'Small Recon',
    description: 'Equipped with forward swept canards and titanium skid plates. Exceptional rotational response allows for inverted flips and rapid descent corrections.',
    width: 100,
    height: 96,
    renderScale: 1.4,
    maxFuel: 140,
    thrustMultiplier: 1.12,
    torqueMultiplier: 1.45,
    mass: 0.85,
    armor: 0.25,
    emptyMassTons: 5.4,
    maxThrustKn: 88,
    twr: 1.66,
    rcsResponseMs: 18,
    armorRatingMm: 45,
    cargoHookCapacityKg: 350,
    roverBayCapacity: 'None (Acrobatic Frame)',
    propulsionType: 'Cryo-Methane Turbopump',
    operationalCeiling: 'Planetary Slopes & Mesas',
    manufactureOrigin: 'Veloce Dynamic Labs (Europa)',
    primaryColor: '#0f172a',
    accentColor: '#06b6d4',
    visorColor: '#0284c7',
    footpadSpan: 67.2,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -53.2 },
      leftShoulder: { x: -49.0, y: 19.6 },
      rightShoulder: { x: 49.0, y: 19.6 },
      leftHip: { x: -24.5, y: 25.2 },
      rightHip: { x: 24.5, y: 25.2 },
      leftFoot: { x: -33.6, y: 41.3 },
      rightFoot: { x: 33.6, y: 41.3 },
      leftThrusterPos: { x: -18.2, y: 33.6 },
      rightThrusterPos: { x: 18.2, y: 33.6 },
    },
    stats: {
      agility: 5,
      fuelTank: 3,
      stability: 3,
      thrust: 4,
      armor: 3,
    },
  },
  {
    id: 'spectre',
    name: 'Spectre Transport',
    codename: 'SP-7 Shadow Transport',
    tagline: 'Stealth Personnel & Cargo Dropship',
    classType: 'Stealth Transport',
    description: 'Engineered with radar-absorbent matte carbon composites, wide multi-pane command bridge, rear clamshell loading ramp, and heavy-lift 2D vectoring nacelles for covert transport missions.',
    width: 98,
    height: 94,
    renderScale: 1.45,
    maxFuel: 180,
    thrustMultiplier: 1.18,
    torqueMultiplier: 1.05,
    mass: 1.25,
    armor: 0.35,
    emptyMassTons: 8.4,
    maxThrustKn: 120,
    twr: 1.45,
    rcsResponseMs: 24,
    armorRatingMm: 85,
    cargoHookCapacityKg: 1200,
    roverBayCapacity: 'Internal Clamshell Cargo Hold (12 m³)',
    propulsionType: 'Twin 2D Vectoring Turbopump Plasma Core',
    operationalCeiling: 'All-Atmosphere Covert Ingress',
    manufactureOrigin: 'Shadowline Orbital (Titan)',
    primaryColor: '#090d16',
    accentColor: '#a855f7',
    visorColor: '#7e22ce',
    footpadSpan: 72.5,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -55.1 },
      leftShoulder: { x: -47.85, y: 14.5 },
      rightShoulder: { x: 47.85, y: 14.5 },
      leftHip: { x: -31.9, y: 26.1 },
      rightHip: { x: 31.9, y: 26.1 },
      leftFoot: { x: -36.25, y: 42.8 },
      rightFoot: { x: 36.25, y: 42.8 },
      leftThrusterPos: { x: -19.58, y: 34.8 },
      rightThrusterPos: { x: 19.58, y: 34.8 },
    },
    stats: {
      agility: 3,
      fuelTank: 4,
      stability: 4,
      thrust: 4,
      armor: 4,
    },
  },
  {
    id: 'apollo',
    name: 'Apollo Recon',
    codename: 'LM-Scout Mk IV',
    tagline: 'Standard Balanced Recon Lander',
    classType: 'Small Recon',
    description: 'A finely tuned, all-purpose exploration lander with balanced handling, reliable fuel reserves, gold thermal quilting, and responsive reaction thrusters.',
    width: 90,
    height: 88,
    renderScale: 1.45,
    maxFuel: 160,
    thrustMultiplier: 1.0,
    torqueMultiplier: 1.0,
    mass: 1.0,
    armor: 0.25,
    emptyMassTons: 7.2,
    maxThrustKn: 95,
    twr: 1.34,
    rcsResponseMs: 30,
    armorRatingMm: 45,
    cargoHookCapacityKg: 500,
    roverBayCapacity: 'Light Scientific Gear Only',
    propulsionType: 'Aerozine-50 / NTO Bipropellant',
    operationalCeiling: 'All Planetary Regimes',
    manufactureOrigin: 'Lunar Surface Systems (Luna)',
    primaryColor: '#f8fafc',
    accentColor: '#38bdf8',
    visorColor: '#0284c7',
    footpadSpan: 81.2,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -39.15 },
      leftShoulder: { x: -30.45, y: -7.25 },
      rightShoulder: { x: 30.45, y: -7.25 },
      leftHip: { x: -27.55, y: 31.9 },
      rightHip: { x: 27.55, y: 31.9 },
      leftFoot: { x: -40.6, y: 43.5 },
      rightFoot: { x: 40.6, y: 43.5 },
      leftThrusterPos: { x: -19.58, y: 35.53 },
      rightThrusterPos: { x: 19.58, y: 35.53 },
    },
    stats: {
      agility: 4,
      fuelTank: 3,
      stability: 4,
      thrust: 3,
      armor: 3,
    },
  },

  // =========================================================================
  // 2. MEDIUM EXPLORER & TACTICAL CRAFTS (Extended Range, Multi-Thruster, Heavy Gear)
  // =========================================================================
  {
    id: 'aegis',
    name: 'Clairvoyant Dropship',
    codename: '12-X Nomadic Dropship',
    tagline: 'Heavy Tactical VTOL Gunship & Surface Dropship',
    classType: 'Heavy Dropship',
    description: 'The iconic 12-X Nomadic heavy tactical dropship "Clairvoyant" from Quantum: Origins. Re-engineered to true heavy dropship scale (+30% volume) with a low-slung, high-stability ground clearance profile, ballistic ceramic cab armor, heavy cylindrical reactor spine, canted vertical tail fin with crosshair roundel, dual high-output ventral VTOL lift thrusters mounted below the belly, and heavy-duty squat hydraulic outrigger landing gear.',
    width: 146,
    height: 112,
    renderScale: 1.90,
    maxFuel: 240,
    thrustMultiplier: 1.28,
    torqueMultiplier: 1.15,
    mass: 1.5,
    armor: 0.52,
    emptyMassTons: 21.5,
    maxThrustKn: 320,
    twr: 1.48,
    rcsResponseMs: 38,
    armorRatingMm: 135,
    cargoHookCapacityKg: 2400,
    roverBayCapacity: 'Clairvoyant Dropship Internal Vehicle & Troop Hold',
    propulsionType: 'Dual Ventral VTOL Lift Thrusters + Aft Vectoring Nozzles',
    operationalCeiling: 'Tactical Planetary Ingress & Heavy Surface Logistics',
    manufactureOrigin: 'Nomadic Heavy Industries (Quantum: Origins)',
    primaryColor: '#c2bcb0',
    accentColor: '#eab308',
    visorColor: '#0284c7',
    footpadSpan: 87.4,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: -74.5, y: 4.75 },
      leftShoulder: { x: -41.8, y: -26.6 },
      rightShoulder: { x: 55.1, y: -58.9 },
      leftHip: { x: -49.4, y: 22.8 },
      rightHip: { x: 45.6, y: 22.8 },
      leftFoot: { x: -45.6, y: 38.0 },
      rightFoot: { x: 41.8, y: 38.0 },
      leftThrusterPos: { x: -26.6, y: 35.15 },
      rightThrusterPos: { x: 30.4, y: 35.15 },
    },
    stats: {
      agility: 3,
      fuelTank: 5,
      stability: 5,
      thrust: 4,
      armor: 5,
    },
  },
  {
    id: 'nebula',
    name: 'Nebula Starchaser',
    codename: 'NS-709 Starchaser',
    tagline: 'Deep Space Science Cruiser & Heavy Interstellar Explorer',
    classType: 'Heavy Explorer',
    description: 'The iconic NS-709 Nebula Starchaser interstellar exploration cruiser. Designed in an elongated side-profile with deep metallic royal violet armor, illuminated mission nameplate with the orbital star emblem, dorsal communications and rotating sensor mast array, forward panoramic multi-pane bridge deck, dual ventral VTOL lift thruster pods, and a massive aft sub-light fusion drive with split aerodynamic cowlings. Configured purely for deep-space research without planetary rover bays.',
    width: 192,
    height: 78,
    renderScale: 1.5,
    maxFuel: 280,
    thrustMultiplier: 1.35,
    torqueMultiplier: 0.95,
    mass: 1.65,
    armor: 0.55,
    emptyMassTons: 22.0,
    maxThrustKn: 340,
    twr: 1.52,
    rcsResponseMs: 35,
    armorRatingMm: 140,
    cargoHookCapacityKg: 2600,
    roverBayCapacity: 'None (Dedicated Deep Space Science Suite)',
    propulsionType: 'Sub-Light Fusion Drive + Dual Ventral VTOL Lift Thrusters',
    operationalCeiling: 'Interstellar Space, Planetary Survey & Deep-Core Logistics',
    manufactureOrigin: 'Starchaser Fleet Astroworks (Sol-Centauri Rim)',
    primaryColor: '#6b46c1',
    accentColor: '#00f0ff',
    visorColor: '#38bdf8',
    footpadSpan: 72.0,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 97.5, y: -0.75 },
      leftShoulder: { x: -93.0, y: -14.25 },
      rightShoulder: { x: 75.0, y: -12.0 },
      leftHip: { x: -93.0, y: 14.25 },
      rightHip: { x: 93.0, y: 9.75 },
      leftFoot: { x: -34.5, y: 32.25 },
      rightFoot: { x: 37.5, y: 32.25 },
      leftThrusterPos: { x: -34.5, y: 31.5 },
      rightThrusterPos: { x: 37.5, y: 31.5 },
    },
    collisionPolygon: [
      { x: 97.5, y: -0.75 },
      { x: 91.5, y: -6.75 },
      { x: 72.0, y: -12.0 },
      { x: 49.5, y: -14.25 },
      { x: 21.0, y: -15.0 },
      { x: -6.0, y: -15.0 },
      { x: -21.0, y: -21.0 },
      { x: -33.0, y: -22.5 },
      { x: -39.0, y: -37.5 },
      { x: -42.0, y: -22.5 },
      { x: -51.0, y: -25.5 },
      { x: -54.0, y: -16.5 },
      { x: -63.0, y: -15.0 },
      { x: -93.0, y: -14.25 },
      { x: -72.0, y: -9.0 },
      { x: -72.0, y: 9.0 },
      { x: -93.0, y: 14.25 },
      { x: -63.0, y: 16.5 },
      { x: -51.0, y: 21.0 },
      { x: -42.0, y: 18.0 },
      { x: -34.5, y: 32.25 },
      { x: -27.0, y: 18.0 },
      { x: -1.5, y: 18.0 },
      { x: 6.0, y: 18.0 },
      { x: 30.0, y: 18.0 },
      { x: 37.5, y: 32.25 },
      { x: 45.0, y: 18.0 },
      { x: 57.0, y: 22.5 },
      { x: 81.0, y: 16.5 },
      { x: 93.0, y: 10.5 },
      { x: 96.0, y: 6.0 },
    ],
    stats: {
      agility: 3,
      fuelTank: 5,
      stability: 4,
      thrust: 4,
      armor: 4,
    },
  },
  {
    id: 'vanguard',
    name: 'Vanguard Exoship',
    codename: 'VG-Exo Crusader',
    tagline: 'Multi-Stage Deep Core Explorer',
    classType: 'Medium Explorer',
    description: 'A towering, multi-module deep space cruiser wrapped in gold thermal foil with quad landing stabilizers and high-efficiency auxiliary booster tanks.',
    width: 82,
    height: 104,
    renderScale: 1.55,
    maxFuel: 220,
    thrustMultiplier: 1.25,
    torqueMultiplier: 1.05,
    mass: 1.2,
    armor: 0.35,
    emptyMassTons: 11.2,
    maxThrustKn: 165,
    twr: 1.50,
    rcsResponseMs: 32,
    armorRatingMm: 70,
    cargoHookCapacityKg: 750,
    roverBayCapacity: 'Modular Equipment Container',
    propulsionType: 'Nuclear Thermal Closed-Cycle Gas Core',
    operationalCeiling: 'Interplanetary Outer Reaches',
    manufactureOrigin: 'Vanguard Orbital Yards (Mars)',
    primaryColor: '#f8fafc',
    accentColor: '#eab308',
    visorColor: '#ca8a04',
    footpadSpan: 79.1,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 0, y: -62.0 },
      leftShoulder: { x: -22.6, y: -25.6 },
      rightShoulder: { x: 22.6, y: -25.6 },
      leftHip: { x: -28.7, y: 25.6 },
      rightHip: { x: 28.7, y: 25.6 },
      leftFoot: { x: -24.8, y: 47.3 },
      rightFoot: { x: 24.8, y: 47.3 },
      extraLeftFoot: { x: -39.5, y: 41.8 },
      extraRightFoot: { x: 39.5, y: 41.8 },
      leftThrusterPos: { x: -21.7, y: 38.4 },
      rightThrusterPos: { x: 21.7, y: 38.4 },
    },
    // Watertight collision hull derived from drawVanguard() geometry (scaled by renderScale 1.55)
    collisionPolygon: [
      { x: 0, y: -62.0 }, // probe tip
      { x: 18.6, y: -52.7 }, // halo ring top-right
      { x: 18.6, y: -46.5 }, // halo ring bottom-right
      { x: 22.6, y: -25.6 }, // command sphere right edge & RCS
      { x: 18.0, y: -7.0 }, // neck transition
      { x: 20.2, y: 0.8 }, // descent stage upper-right chamfer
      { x: 28.7, y: 25.6 }, // right sponson outer corner
      { x: 27.0, y: 38.4 }, // right engine nozzle outer lip
      { x: 16.4, y: 38.4 }, // right engine nozzle inner lip
      { x: 0, y: 27.9 }, // center belly floor
      { x: -16.4, y: 38.4 }, // left engine nozzle inner lip
      { x: -27.0, y: 38.4 }, // left engine nozzle outer lip
      { x: -28.7, y: 25.6 }, // left sponson outer corner
      { x: -20.2, y: 0.8 }, // descent stage upper-left chamfer
      { x: -18.0, y: -7.0 }, // neck transition
      { x: -22.6, y: -25.6 }, // command sphere left edge & RCS
      { x: -18.6, y: -46.5 }, // halo ring bottom-left
      { x: -18.6, y: -52.7 }, // halo ring top-left
    ],
    stats: {
      agility: 3,
      fuelTank: 5,
      stability: 4,
      thrust: 5,
      armor: 4,
    },
  },
  {
    id: 'orion',
    name: 'Terra-Hopper',
    codename: 'TH-01 Terrestrial Lander',
    tagline: 'Lightweight Planetary Personnel Transport',
    classType: 'Light Transport',
    description: 'A physically large yet lightweight planetary shuttle engineered for atmospheric and low-gravity operations. Features a spacious 6-seat passenger cabin with tactical telemetry monitors, dual high-efficiency VTOL ion hover thrusters, and rear cryogenic propellant tanks. Does not transport vehicles.',
    width: 144,
    height: 58,
    renderScale: 1.60,
    maxFuel: 240,
    thrustMultiplier: 1.28,
    torqueMultiplier: 1.20,
    mass: 0.95,
    armor: 0.38,
    emptyMassTons: 7.8,
    maxThrustKn: 165,
    twr: 1.65,
    rcsResponseMs: 22,
    armorRatingMm: 75,
    cargoHookCapacityKg: 600,
    roverBayCapacity: 'None (Dedicated 6-Seat Passenger Deck)',
    propulsionType: 'Dual Ventral VTOL Ion/Plasma Hover Drives',
    operationalCeiling: 'All Planetary Terrains & Low Orbit',
    manufactureOrigin: 'Terra Aerospace & Orbital Works',
    primaryColor: '#172554',
    accentColor: '#38bdf8',
    visorColor: '#0284c7',
    footpadSpan: 121.6,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: -84.8, y: -3.2 },
      leftShoulder: { x: -38.4, y: -22.4 },
      rightShoulder: { x: 38.4, y: -26.4 },
      leftHip: { x: -67.2, y: 12.0 },
      rightHip: { x: 70.4, y: 11.2 },
      leftFoot: { x: -60.8, y: 31.2 },
      rightFoot: { x: 60.8, y: 31.2 },
      extraLeftFoot: { x: -32.0, y: 28.0 },
      extraRightFoot: { x: 35.2, y: 28.0 },
      leftThrusterPos: { x: -32.0, y: 28.0 },
      rightThrusterPos: { x: 35.2, y: 28.0 },
    },
    // Watertight collision polygon enclosing the elongated silhouette with wide landing gear skids
    collisionPolygon: [
      { x: -86.4, y: -3.2 },  // nose headlight/probe tip
      { x: -60.8, y: -14.4 }, // cockpit fwd frame
      { x: -38.4, y: -22.4 }, // cockpit roof peak
      { x: -9.6, y: -26.4 },  // avionics bay fwd
      { x: 38.4, y: -26.4 },  // dorsal roof aft
      { x: 96.0, y: -24.0 },  // aft upper fin tip
      { x: 73.6, y: -6.4 },   // aft upper fin trailing root
      { x: 92.8, y: 22.4 },   // aft lower fin tip
      { x: 70.4, y: 8.0 },    // aft lower fin trailing root
      { x: 70.4, y: 11.2 },   // aft lower hull corner
      { x: 68.0, y: 31.2 },   // aft landing footpad rear tip
      { x: 53.6, y: 31.2 },   // aft landing footpad front tip
      { x: 40.8, y: 27.2 },   // rear thruster right lip
      { x: 28.8, y: 27.2 },   // rear thruster left lip
      { x: 0.0, y: 19.2 },    // mid underbelly shield
      { x: -25.6, y: 27.2 },  // front thruster right lip
      { x: -38.4, y: 27.2 },  // front thruster left lip
      { x: -45.0, y: 18.0 },  // underbelly shield behind front gear
      { x: -53.6, y: 31.2 },  // forward landing footpad rear tip
      { x: -68.0, y: 31.2 },  // forward landing footpad front tip
      { x: -72.0, y: 12.0 },  // chin ramp lower plate
      { x: -84.8, y: 9.6 },   // sensor chin turret bracket
    ],
    stats: {
      agility: 5,
      fuelTank: 4,
      stability: 4,
      thrust: 4,
      armor: 3,
    },
  },
  {
    id: 'valkyrie',
    name: 'Valkyrie Tactical',
    codename: 'VK-01 Cargo Lifter',
    tagline: 'Planetary Atmospheric Transport & Tactical VTOL Heavy Lifter',
    classType: 'Tactical Transport',
    description: 'The VK-01 Valkyrie Tactical heavy VTOL planetary atmospheric transport and cargo lifter. Engineered with reinforced crimson ballistic armor, forward aerodynamic cockpit canopy with pilot seat and FLIR targeting ball, mid-fuselage VTOL lift intake louvers, sealed side cargo bay ramp, dorsal docking hatch with hexagonal armor plating, flank sponson wing with nav lights, and a colossal aft vectoring main engine nozzle. Configured for high-payload planetary logistics and cargo transfer without vehicle transport.',
    width: 168,
    height: 64,
    renderScale: 1.55,
    maxFuel: 260,
    thrustMultiplier: 1.32,
    torqueMultiplier: 1.05,
    mass: 1.45,
    armor: 0.55,
    emptyMassTons: 16.5,
    maxThrustKn: 290,
    twr: 1.52,
    rcsResponseMs: 36,
    armorRatingMm: 130,
    cargoHookCapacityKg: 2000,
    roverBayCapacity: 'None (Dedicated Sealed Atmospheric Cargo Bay)',
    propulsionType: 'High-Compression VTOL Turbofans + Aft Vectoring Turboramjet',
    operationalCeiling: 'Planetary Atmospheric Logistics & High-G Drop Corridors',
    manufactureOrigin: 'Valkyrie Aerospace Systems (Valhalla Forge Sector)',
    primaryColor: '#991b1b',
    accentColor: '#facc15',
    visorColor: '#090d16',
    footpadSpan: 86.8,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 103.85, y: 9.3 },
      leftShoulder: { x: -83.7, y: -15.5 },
      rightShoulder: { x: 37.2, y: -24.8 },
      leftHip: { x: -105.4, y: 7.75 },
      rightHip: { x: 86.8, y: 15.5 },
      leftFoot: { x: -49.6, y: 31.0 },
      rightFoot: { x: 37.2, y: 31.0 },
      leftThrusterPos: { x: -40.3, y: 27.9 },
      rightThrusterPos: { x: 27.9, y: 27.9 },
    },
    // Watertight collision polygon tracing the aerodynamic cargo lifter silhouette (scaled raw coords x 1.55)
    collisionPolygon: [
      { x: 103.85, y: 9.3 },    // Nose probe tip
      { x: 89.9, y: 13.95 },    // Cockpit chin / FLIR ball
      { x: 55.8, y: 19.38 },    // Lower forward fuselage under fuel receptacle
      { x: 43.4, y: 31.0 },     // Forward landing pad front edge
      { x: 31.0, y: 31.0 },     // Forward landing pad rear edge
      { x: 15.5, y: 30.23 },    // Ventral pod skid bottom
      { x: 6.2, y: 26.35 },     // Ventral pod rear transition
      { x: -18.6, y: 24.8 },    // Cargo bay belly lower curve
      { x: -40.3, y: 31.0 },    // Rear landing pad front edge
      { x: -58.9, y: 31.0 },    // Rear landing pad rear edge
      { x: -74.4, y: 15.5 },    // Aft lower belly curve
      { x: -108.5, y: 8.53 },   // Aft nozzle lower lip
      { x: -108.5, y: -14.73 }, // Aft nozzle upper lip
      { x: -83.7, y: -16.28 },  // Aft upper empennage cowl
      { x: -55.8, y: -27.13 },  // Dorsal spine aft slope
      { x: -12.4, y: -27.13 },  // Dorsal spine mid (airlock / APU)
      { x: 12.4, y: -29.45 },   // Dorsal intake scoop top
      { x: 34.1, y: -26.35 },   // Cockpit roof peak
      { x: 43.4, y: -22.48 },   // Canopy top fwd
      { x: 68.2, y: -4.65 },    // Raked windshield
      { x: 89.9, y: 5.43 },     // Forward nose slope
    ],
    stats: {
      agility: 3,
      fuelTank: 4,
      stability: 4,
      thrust: 4,
      armor: 5,
    },
  },
  {
    id: 'nautilus',
    name: 'Nautilus Vector',
    codename: 'NX-5 Modular Scout',
    tagline: 'High-Mobility Tactical Exploration Lander',
    classType: 'Medium Explorer',
    description: 'An agile, asymmetric modular expedition craft featuring a distinctive spiral bow canopy with amber visor ring, an angled dorsal rocket pod, triple belly reaction thrusters, and stamped cross-pad landing skids.',
    width: 96,
    height: 90,
    renderScale: 1.52,
    maxFuel: 210,
    thrustMultiplier: 1.20,
    torqueMultiplier: 1.30,
    mass: 1.05,
    armor: 0.38,
    emptyMassTons: 9.2,
    maxThrustKn: 145,
    twr: 1.65,
    rcsResponseMs: 24,
    armorRatingMm: 75,
    cargoHookCapacityKg: 650,
    roverBayCapacity: 'Light Scientific Rig (Non-Heavy)',
    propulsionType: 'Vectored Ion-Plasma Aerospike Array',
    operationalCeiling: 'Low-G Moons, Canyons & Slalom Insertion',
    manufactureOrigin: 'Orbital Dynamics Consortium (Ganymede)',
    primaryColor: '#f8fafc',
    accentColor: '#eab308',
    visorColor: '#facc15',
    footpadSpan: 76.0,
    canCarryVehicles: false,
    isHeavyVehicleCarrier: false,
    localPoints: {
      nose: { x: 50.0, y: -8.0 },
      leftShoulder: { x: -38.0, y: -38.0 },
      rightShoulder: { x: 38.0, y: -35.0 },
      leftHip: { x: -44.0, y: 22.0 },
      rightHip: { x: 44.0, y: 22.0 },
      leftFoot: { x: -32.0, y: 44.0 },
      rightFoot: { x: 38.0, y: 44.0 },
      leftThrusterPos: { x: -38.0, y: 28.0 },
      rightThrusterPos: { x: 14.0, y: 28.0 },
    },
    stats: {
      agility: 4,
      fuelTank: 4,
      stability: 4,
      thrust: 4,
      armor: 3,
    },
  },

  // =========================================================================
  // 3. HEAVY INDUSTRIAL TRANSPORTS & ROVER CARRIERS (Vehicles, Ramps, Heavy Bays)
  // =========================================================================
  {
    id: 'titan',
    name: 'Titan Behemoth',
    codename: 'TB-01 HATV',
    tagline: 'Heavy Atmospheric Transport Vehicle',
    classType: 'Heavy Cargo / Rover Carrier',
    description: 'A monumental heavy atmospheric transport (HATV) constructed from white ceramic and titanium-aluminum composite armor. Features an articulated downward vehicle deployment ramp facing the player, dual VTOL lift engine pods with quad rocket nozzles, an illuminated heavy vehicle hangar with overhead hoist crane, 6-wheel APC, tracked tank, and rotating emergency bay beacons.',
    width: 144,
    height: 54,
    renderScale: 2.17,
    maxFuel: 340,
    thrustMultiplier: 1.45,
    torqueMultiplier: 0.88,
    mass: 1.90,
    armor: 0.65,
    emptyMassTons: 28.5,
    maxThrustKn: 380,
    twr: 1.54,
    rcsResponseMs: 40,
    armorRatingMm: 160,
    cargoHookCapacityKg: 5000,
    roverBayCapacity: 'Heavy Vehicle & Tank Bay (500t Payload)',
    propulsionType: 'Quad VTOL Lift Turbofans & Sub-Orbital Hydrolox',
    operationalCeiling: '35,000 m (Atmospheric / Sub-Orbital)',
    manufactureOrigin: 'Titan Heavy Industries & Shipyards',
    primaryColor: '#f8fafc',
    accentColor: '#f59e0b',
    visorColor: '#d97706',
    footpadSpan: 134.5,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 138.9, y: -4.3 },
      leftShoulder: { x: -143.2, y: -15.2 },
      rightShoulder: { x: 99.8, y: -23.9 },
      leftHip: { x: -121.5, y: 23.9 },
      rightHip: { x: 117.2, y: 15.2 },
      leftFoot: { x: -69.4, y: 47.7 },
      rightFoot: { x: 65.1, y: 47.7 },
      leftThrusterPos: { x: -69.4, y: 43.4 },
      rightThrusterPos: { x: 65.1, y: 43.4 },
    },
    collisionPolygon: [
      { x: 143.22, y: -3.26 },
      { x: 125.86, y: 13.02 },
      { x: 101.99, y: 26.04 },
      { x: 74.87, y: 47.74 },
      { x: 55.34, y: 47.74 },
      { x: 34.72, y: 36.89 },
      { x: -4.34, y: 44.49 },
      { x: -43.40, y: 36.89 },
      { x: -59.68, y: 47.74 },
      { x: -79.21, y: 47.74 },
      { x: -86.80, y: 26.04 },
      { x: -121.52, y: 23.87 },
      { x: -143.22, y: 6.51 },
      { x: -143.22, y: -15.19 },
      { x: -125.86, y: -21.70 },
      { x: -82.46, y: -32.55 },
      { x: -52.08, y: -32.55 },
      { x: 21.70, y: -30.38 },
      { x: 32.55, y: -36.89 },
      { x: 71.61, y: -36.89 },
      { x: 99.82, y: -23.87 },
      { x: 121.52, y: -13.02 },
    ],
    stats: {
      agility: 2,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'goliath',
    name: 'Goliath Carrier',
    codename: 'CT-950 Colossus Hauler',
    tagline: 'Heavy Atmospheric Transport & Vehicle Carrier',
    classType: 'Rover Transporter',
    description: 'A massive heavy atmospheric vehicle transporter cloned from the technical side-profile diagram. Features a rear-descending vehicle ramp on the left, dual port-side VTOL thruster pods, illuminated internal vehicle hold with parked green combat rover, descending ground crew technicians, stenciled GOLIATH CARRIER fuselage nameplate, and heavy ski landing gear.',
    width: 245,
    height: 82,
    renderScale: 2.15,
    maxFuel: 380,
    thrustMultiplier: 1.55,
    torqueMultiplier: 0.72,
    mass: 2.10,
    armor: 0.65,
    emptyMassTons: 32.0,
    maxThrustKn: 460,
    twr: 1.52,
    rcsResponseMs: 45,
    armorRatingMm: 180,
    cargoHookCapacityKg: 4000,
    roverBayCapacity: 'Rear Roll-On / Roll-Off Vehicle Ramp (Left Descent)',
    propulsionType: 'Dual Port VTOL Lift Jets + Underslung Auxiliary Drives',
    operationalCeiling: 'Planetary Surface & Atmospheric Logistics',
    manufactureOrigin: 'Colossus Heavy Transports (Luna)',
    primaryColor: '#334155',
    accentColor: '#dc2626',
    visorColor: '#38bdf8',
    footpadSpan: 137.6,
    isHeavyVehicleCarrier: true,
    canCarryVehicles: true,
    collisionPolygon: [
      { x: 120.4, y: 0.0 }, // Cockpit windshield & nose cap
      { x: 111.8, y: -12.9 }, // Cockpit windshield brow
      { x: 94.6, y: -32.25 }, // Forward roof chamfer
      { x: 77.4, y: -35.48 }, // Bridge roof plate
      { x: -94.6, y: -34.4 }, // Main dorsal spine aft
      { x: -116.1, y: -23.65 }, // Aft roof chamfer / door top
      { x: -77.4, y: 23.65 }, // Aft cargo sill / door bottom
      { x: -60.2, y: 43.0 }, // Aft ski pad back
      { x: -43.0, y: 43.0 }, // Aft ski pad front
      { x: -38.7, y: 23.65 }, // Aft belly line transition
      { x: 73.1, y: 23.65 }, // Mid belly forward transition
      { x: 75.25, y: 43.0 }, // Fwd ski pad back
      { x: 96.75, y: 43.0 }, // Fwd ski pad front
      { x: 103.2, y: 23.65 }, // Cockpit chin base
      { x: 122.55, y: 15.05 }, // Cockpit chin / lower nose
    ],
    localPoints: {
      nose: { x: 122.55, y: 15.05 },
      leftShoulder: { x: -94.6, y: -34.4 },
      rightShoulder: { x: 94.6, y: -32.25 },
      leftHip: { x: -77.4, y: 23.65 },
      rightHip: { x: 103.2, y: 23.65 },
      leftFoot: { x: -51.6, y: 43.0 },
      rightFoot: { x: 86.0, y: 43.0 },
      leftThrusterPos: { x: -51.6, y: 23.65 },
      rightThrusterPos: { x: 86.0, y: 23.65 },
    },
    stats: {
      agility: 2,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'behemoth',
    name: 'Behemoth-IX',
    codename: 'BH-900 Dreadnought',
    tagline: 'Massive Asymmetric Industrial Hauler',
    classType: 'Rover Transporter',
    description: 'A monstrous industrial transport featuring an offset starboard command bridge, a portside heavy cargo gantry truss, an articulated vehicle loading ramp, and an asymmetric heavy vehicle crane for automated planetary cargo handling.',
    width: 236,
    height: 84,
    renderScale: 1.68,
    maxFuel: 360,
    thrustMultiplier: 1.5,
    torqueMultiplier: 0.72,
    mass: 1.75,
    armor: 0.65,
    emptyMassTons: 25.4,
    maxThrustKn: 360,
    twr: 1.45,
    rcsResponseMs: 55,
    armorRatingMm: 175,
    cargoHookCapacityKg: 2500,
    roverBayCapacity: 'Asymmetric Heavy Vehicle Crane Ramp',
    propulsionType: 'Offset Dual-Chamber Fusion Torch Nozzles',
    operationalCeiling: 'Deep Mine Shaft Haulage',
    manufactureOrigin: 'Ironclad Heavy Foundries (Ares)',
    primaryColor: '#e2e8f0',
    accentColor: '#f97316',
    visorColor: '#0284c7',
    footpadSpan: 124.32,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: -114.24, y: -3.36 },
      leftShoulder: { x: -43.68, y: -15.12 },
      rightShoulder: { x: 94.08, y: -10.08 },
      leftHip: { x: -43.68, y: 16.8 },
      rightHip: { x: 94.08, y: 18.48 },
      leftFoot: { x: -43.68, y: 36.96 },
      rightFoot: { x: 80.64, y: 36.96 },
      extraLeftFoot: { x: -20.16, y: 36.96 },
      extraRightFoot: { x: 67.2, y: 36.96 },
      leftThrusterPos: { x: -30.24, y: 26.88 },
      rightThrusterPos: { x: 60.48, y: 26.88 },
    },
    collisionPolygon: [
      { x: -114.24, y: -3.36 },
      { x: -110.88, y: -15.12 },
      { x: -43.68, y: -15.12 },
      { x: -36.96, y: -21.84 },
      { x: -20.16, y: -11.76 },
      { x: 10.08, y: -35.28 },
      { x: 36.96, y: -35.28 },
      { x: 40.32, y: -11.76 },
      { x: 94.08, y: -10.08 },
      { x: 106.68, y: -7.56 },
      { x: 106.68, y: 14.28 },
      { x: 94.08, y: 18.48 },
      { x: 100.8, y: 36.96 },
      { x: 60.48, y: 36.96 },
      { x: 50.4, y: 18.48 },
      { x: -20.16, y: 18.48 },
      { x: -30.24, y: 34.44 },
      { x: -33.6, y: 36.96 },
      { x: -53.76, y: 36.96 },
      { x: -57.12, y: 33.6 },
      { x: -43.68, y: 16.8 },
      { x: -94.08, y: 6.72 },
      { x: -110.88, y: 3.36 },
    ],
    stats: {
      agility: 2,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'leviathan',
    name: 'Leviathan Titan',
    codename: 'LV-880 Split-Hull Carrier',
    tagline: 'Asymmetric Twin-Hull Supercarrier',
    classType: 'Rover Transporter',
    description: 'An immense asymmetric catamaran supercarrier with a heavy armored vehicle hangar on the port sponson, an offset starboard sensor spine, and an articulated hydraulic ramp door.',
    width: 140,
    height: 141,
    renderScale: 1.75,
    maxFuel: 380,
    thrustMultiplier: 1.55,
    torqueMultiplier: 0.70,
    mass: 1.85,
    armor: 0.70,
    emptyMassTons: 28.5,
    maxThrustKn: 410,
    twr: 1.47,
    rcsResponseMs: 58,
    armorRatingMm: 190,
    cargoHookCapacityKg: 3000,
    roverBayCapacity: 'Catamaran Dual-Sponson Heavy Hangar',
    propulsionType: 'Triple High-Volume Deuterium Jets',
    operationalCeiling: 'Planetary Citadel Logistics',
    manufactureOrigin: 'Leviathan Oceanic Orbital (Europa)',
    primaryColor: '#0f172a',
    accentColor: '#06b6d4',
    visorColor: '#38bdf8',
    footpadSpan: 140.0,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 38.5, y: -77.0 },
      leftShoulder: { x: -66.5, y: -49.0 },
      rightShoulder: { x: 66.5, y: -28.0 },
      leftHip: { x: -66.5, y: 28.0 },
      rightHip: { x: 66.5, y: 28.0 },
      leftFoot: { x: -70.0, y: 59.5 },
      rightFoot: { x: 70.0, y: 59.5 },
      extraLeftFoot: { x: -26.25, y: 59.5 },
      extraRightFoot: { x: 26.25, y: 59.5 },
      leftThrusterPos: { x: -42.0, y: 34.13 },
      rightThrusterPos: { x: 49.0, y: 34.13 },
    },
    stats: {
      agility: 1,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'mammoth',
    name: 'Mammoth Rig',
    codename: 'C-95 Mammoth Rig',
    tagline: 'Heavy Lift Cargo Transport',
    classType: 'Heavy Cargo Hauler',
    description: 'The C-95 Mammoth Rig heavy-lift cargo spacecraft. Features a blunt armored bow with dual HID searchlight banks, elevated command bridge with cyan RF/IR sensor suite and panoramic trapezoidal viewport, upper deck personnel quarters, central systems conduit hub, modular cargo holds (Main Cargo Hold A: 3000-ton capacity + Lower Deck Cargo Hold B), four heavy-duty articulated landing gear with hydraulic cylinders and hazard-striped footpads, twin primary vectored thruster pods with yellow-gold collars, main propulsion nozzle assembly, red rotating beacon on bridge mast, and duranium alloy hull plating with yellow hazard striping and MAMMOTH RIG identification stencils.',
    width: 140,
    height: 130,
    renderScale: 1.6,
    maxFuel: 400,
    thrustMultiplier: 1.55,
    torqueMultiplier: 0.70,
    mass: 1.95,
    armor: 0.72,
    emptyMassTons: 30.0,
    maxThrustKn: 440,
    twr: 1.50,
    rcsResponseMs: 60,
    armorRatingMm: 200,
    cargoHookCapacityKg: 3000,
    roverBayCapacity: 'Dual Cargo Holds (Main 3000t + Lower Deck) + Side Loading Ramps',
    propulsionType: 'Twin Primary Vectored Thruster Pods + Main Propulsion Nozzle',
    operationalCeiling: 'Heavy Gravity Industrial & Mining Worlds',
    manufactureOrigin: 'C-95 Fleet Yards (Industrial Sector)',
    primaryColor: '#59686A',
    accentColor: '#D4A62B',
    visorColor: '#39CBD0',
    footpadSpan: 140.0,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 63, y: -52 },
      leftShoulder: { x: -70, y: -45 },
      rightShoulder: { x: 70, y: -45 },
      leftHip: { x: -70, y: 30 },
      rightHip: { x: 70, y: 30 },
      leftFoot: { x: -70, y: 62 },
      rightFoot: { x: 70, y: 62 },
      extraLeftFoot: { x: -35, y: 62 },
      extraRightFoot: { x: 35, y: 62 },
      leftThrusterPos: { x: -55, y: 28 },
      rightThrusterPos: { x: 55, y: 28 },
    },
    collisionPolygon: [
      { x: 63, y: -52 },       // Bow tip
      { x: 55, y: -55 },       // Bow upper chamfer
      { x: 45, y: -58 },       // Bow upper deck edge
      { x: -65, y: -58 },      // Bridge rear top
      { x: -70, y: -45 },      // Left shoulder
      { x: -70, y: 30 },       // Left hip
      { x: -65, y: 40 },       // Lower hull rear
      { x: -55, y: 45 },       // Engine pod top
      { x: -55, y: 62 },       // Left foot
      { x: -35, y: 62 },       // Extra left foot
      { x: 0, y: 58 },         // Center keel
      { x: 35, y: 62 },        // Extra right foot
      { x: 55, y: 62 },        // Right foot
      { x: 55, y: 45 },        // Engine pod top
      { x: 65, y: 40 },        // Lower hull rear
      { x: 70, y: 30 },        // Right hip
      { x: 70, y: -45 },       // Right shoulder
    ],
    stats: {
      agility: 2,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'juggernaut',
    name: 'Juggernaut Lifter',
    codename: 'JG-1200 Planetary Heavy Lifter',
    tagline: 'Quad-Engine Super-Heavy Cargo Transport',
    classType: 'Heavy Cargo Hauler',
    description: 'The JG-1200 Juggernaut Lifter heavy-lift cargo spacecraft. Features a sharply angled wedge-shaped bow with forward sensor arrays, elevated command bridge with dark horizontal window bands and panoramic lower observation deck, central multi-deck cargo hold (exposed interior with tracked vehicle capacity), quad underside thrusters (2 forward + 2 aft) firing in alternating pairs, single massive circular main propulsion assembly at stern, quad tracked landing bogies with articulated suspension, broad front loading ramp with hinge at lower front aperture, dorsal antenna mast with blinking telemetry beacon, olive-green duranium hull with yellow-gold reinforcement bands and JUGGERNAUT LIFTER side markings.',
    width: 160,
    height: 150,
    renderScale: 1.8,
    maxFuel: 450,
    thrustMultiplier: 1.7,
    torqueMultiplier: 0.65,
    mass: 2.2,
    armor: 0.78,
    emptyMassTons: 35.0,
    maxThrustKn: 520,
    twr: 1.55,
    rcsResponseMs: 65,
    armorRatingMm: 240,
    cargoHookCapacityKg: 3800,
    roverBayCapacity: 'Multi-Deck Open Cargo Hold + Front Loading Ramp',
    propulsionType: 'Quad Underside Lift Thrusters (2 Fwd + 2 Aft) + Single Main Propulsion',
    operationalCeiling: 'Supermassive Gravity Industrial Worlds',
    manufactureOrigin: 'Juggernaut Fleet Yards (Omega Prime)',
    primaryColor: '#6D8558',
    accentColor: '#D5B43D',
    visorColor: '#303A39',
    footpadSpan: 160.0,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 60, y: -50 },
      leftShoulder: { x: -80, y: -40 },
      rightShoulder: { x: 80, y: -40 },
      leftHip: { x: -80, y: 35 },
      rightHip: { x: 80, y: 35 },
      leftFoot: { x: -85, y: 72 },
      rightFoot: { x: 85, y: 72 },
      extraLeftFoot: { x: -45, y: 72 },
      extraRightFoot: { x: 45, y: 72 },
      leftThrusterPos: { x: -35, y: 30 },
      rightThrusterPos: { x: 35, y: 30 },
    },
    collisionPolygon: [
      // Outer boundary of hull union (main fuselage + lower hull), traced CCW
      // Main fuselage: bow -> left bridge top -> right bridge top -> right upper hull
      { x: -70, y: -25 },      // Bow tip (wedge nose)
      { x: -55, y: -42 },      // Upper left bow
      { x: -30, y: -48 },      // Left bridge top (highest point)
      { x: 44, y: -42 },       // Right bridge top
      { x: 57, y: -30 },       // Right upper hull forward
      { x: 58, y: 9 },         // Right side upper

      // Drop down to lower hull on right side
      { x: 56, y: 8 },         // Lower hull right (top edge)
      { x: 58, y: 22 },        // Lower hull right lower
      { x: 39, y: 25 },        // Lower hull keel right
      { x: -42, y: 24 },       // Lower hull keel left
      { x: -65, y: 20 },       // Lower hull left lower
      { x: -67, y: 8 },        // Lower hull left (top edge)

      // Up left side back to main fuselage
      { x: -68, y: 5 },        // Left side upper
      { x: -80, y: -40 },      // Left shoulder
      // (closes back to bow tip)
    ],
    stats: {
      agility: 1,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'nutcracker',
    name: 'Nutcracker',
    codename: 'EX-920 Heavy Excavator',
    tagline: 'Deep-Crust Industrial Crawler Carrier',
    classType: 'Rover Transporter',
    description: 'A heavy desert-planet crawler carrier equipped with an aft rock-crusher drill bore, panoramic bridge superstructure, twin pneumatic conduit banks, and an articulated hydraulic belly ramp hold for planetary rovers.',
    width: 136,
    height: 124,
    renderScale: 1.70,
    maxFuel: 375,
    thrustMultiplier: 1.50,
    torqueMultiplier: 0.72,
    mass: 1.82,
    armor: 0.72,
    emptyMassTons: 27.5,
    maxThrustKn: 405,
    twr: 1.48,
    rcsResponseMs: 58,
    armorRatingMm: 210,
    cargoHookCapacityKg: 3200,
    roverBayCapacity: 'Underslung Hydraulic Crawler Ramp Hold',
    propulsionType: 'Asymmetric Quad Deuterium Combustion Array',
    operationalCeiling: 'Extreme Gravity Desert & Mining Outposts',
    manufactureOrigin: 'Caelum Heavy Industries (Arakkis Outpost)',
    primaryColor: '#b84538',
    accentColor: '#d4b276',
    visorColor: '#38bdf8',
    footpadSpan: 136.0,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 44.0, y: -64.0 },
      leftShoulder: { x: -64.0, y: -45.0 },
      rightShoulder: { x: 64.0, y: -45.0 },
      leftHip: { x: -64.0, y: 28.0 },
      rightHip: { x: 64.0, y: 28.0 },
      leftFoot: { x: -68.0, y: 57.8 },
      rightFoot: { x: 68.0, y: 57.8 },
      extraLeftFoot: { x: -28.0, y: 57.8 },
      extraRightFoot: { x: 28.0, y: 57.8 },
      leftThrusterPos: { x: -38.0, y: 34.0 },
      rightThrusterPos: { x: 40.0, y: 34.0 },
    },
    // Collision hull derived from drawNutcracker() geometry. Physics applies
    // transformPoint() (rotation + translation) with NO renderScale, while the
    // renderer draws hull coords under ctx.scale(renderScale) — so these points
    // are in renderScale-scaled units (raw draw coords x 1.70), matching
    // localPoints (e.g. leftFoot.y 57.8 = footPadY 34 x 1.70).
    // Vertices (clockwise from aft bottom-left) enclose the full silhouette:
    // aft drill arm (rotated -0.24 rad about (-40,-21)), hull blocks, bridge,
    // antenna beacon, searchlight projector, and both thruster bell lips.
    collisionPolygon: [
      { x: -71.4, y: 27.2 }, // aft hull bottom-left
      { x: -74.8, y: -27.2 }, // drill bracket bottom-left
      { x: -87.7, y: -51.9 }, // drill barrel far top-left
      { x: -58.0, y: -59.2 }, // drill barrel top (highest aft point)
      { x: -59.5, y: -34.0 }, // aft hull chamfer corner
      { x: 40.8, y: -34.0 }, // hull top run (aft + fwd blocks)
      { x: 51.0, y: -51.0 }, // bridge roof left transition
      { x: 59.5, y: -74.0 }, // antenna beacon top
      { x: 74.8, y: -61.2 }, // searchlight projector top-front
      { x: 74.8, y: 27.2 }, // hull floor front corner
      { x: 64.6, y: 40.8 }, // forward thruster lip outer
      { x: 37.4, y: 40.8 }, // forward thruster lip inner
      { x: 37.4, y: 27.2 }, // forward thruster inner top (belly start)
      { x: -40.8, y: 27.2 }, // belly end (aft thruster top-right)
      { x: -40.8, y: 40.8 }, // aft thruster lip inner
      { x: -64.6, y: 40.8 }, // aft thruster lip outer
    ],
    stats: {
      agility: 2,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
  {
    id: 'eagle',
    name: 'Eagle Transporter',
    codename: 'Alpha Eagle-One Mk IV',
    tagline: 'Modular Deep-Space Transport & Heavy Cargo Lander',
    classType: 'Heavy Transport',
    description: 'The iconic modular transport lander inspired by Space: 1999. Engineered with an open tubular spaceframe catwalk, interchangeable central cargo/passenger hold, forward beak cockpit module, 4-way RCS outrigger pods, dual downward VTOL lift bells, and quad aft nuclear fusion engines.',
    width: 138,
    height: 84,
    renderScale: 1.58,
    maxFuel: 330,
    thrustMultiplier: 1.40,
    torqueMultiplier: 0.90,
    mass: 1.48,
    armor: 0.54,
    emptyMassTons: 19.2,
    maxThrustKn: 295,
    twr: 1.52,
    rcsResponseMs: 36,
    armorRatingMm: 135,
    cargoHookCapacityKg: 2500,
    roverBayCapacity: 'Moonbase Alpha Modular Cargo & Rover Hold',
    propulsionType: 'Quad S-IV Nuclear Fusion Rockets + Dual Belly VTOL Lift Bells',
    operationalCeiling: 'Lunar Recon, Deep-Space Cargo & Planetary Surface Logistics',
    manufactureOrigin: 'Moonbase Alpha Technical Section (Luna Recon Sector 1)',
    primaryColor: '#f8fafc',
    accentColor: '#ef4444',
    visorColor: '#0f172a',
    footpadSpan: 110.6,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: 68.0, y: 0.0 },
      leftShoulder: { x: -44.0, y: -25.0 },
      rightShoulder: { x: 44.0, y: -25.0 },
      leftHip: { x: -42.0, y: 15.0 },
      rightHip: { x: 42.0, y: 15.0 },
      leftFoot: { x: -55.3, y: 34.8 },
      rightFoot: { x: 55.3, y: 34.8 },
      leftThrusterPos: { x: -17.4, y: 23.7 },
      rightThrusterPos: { x: 17.4, y: 23.7 },
    },
    // Collision hull derived from drawEagle() geometry (raw draw coords x 1.58,
    // physics applies rotation+translation with NO renderScale). Traced clockwise
    // around the full silhouette: quad fusion engine block, tanks, dorsal truss,
    // cargo pod, VTOL bells, outrigger RCS pods, landing gear, and beak cockpit.
    collisionPolygon: [
      { x: -112.2, y: 23.7 }, // aft engine block bottom-rear
      { x: -112.2, y: -22.9 }, // aft engine block top-rear
      { x: -80.6, y: -19.6 }, // propellant tank top
      { x: -71.1, y: -24.5 }, // aft truss collar
      { x: -37.9, y: -29.2 }, // raised bridge truss top (aft)
      { x: 34.0, y: -29.2 }, // raised bridge truss top (fwd)
      { x: 66.4, y: -24.5 }, // fwd truss collar top
      { x: 70.3, y: -24.5 }, // collar outer-top
      { x: 70.3, y: -11.1 }, // collar outer-bottom
      { x: 71.9, y: -14.2 }, // beak top start
      { x: 85.3, y: -14.2 }, // beak top
      { x: 94.8, y: -14.2 }, // beak top curve
      { x: 101.1, y: -9.2 }, // beak upper control
      { x: 107.9, y: -0.9 }, // nose probe tip (top)
      { x: 107.9, y: 1.0 }, // nose probe tip (bottom)
      { x: 105.1, y: 1.6 }, // beak underside root
      { x: 101.1, y: 8.5 }, // beak lower control
      { x: 94.8, y: 12.5 }, // beak bottom
      { x: 85.3, y: 12.5 }, // beak bottom mid
      { x: 71.9, y: 12.5 }, // beak bottom start
      { x: 67.9, y: 13.4 }, // service collar bottom
      { x: 64.0, y: 38.9 }, // fwd footpad outer-bottom
      { x: 43.5, y: 38.9 }, // fwd footpad inner-bottom
      { x: 37.9, y: 12.5 }, // pod fwd chamfer
      { x: 34.8, y: 15.0 }, // pod bottom fwd
      { x: 25.1, y: 16.6 }, // fwd VTOL bell outer-top
      { x: 25.1, y: 26.2 }, // fwd VTOL bell outer-bottom
      { x: 8.9, y: 25.9 }, // fwd VTOL bell inner-bottom
      { x: 13.8, y: 16.9 }, // fwd VTOL pylon inner
      { x: -13.8, y: 16.9 }, // aft VTOL pylon inner
      { x: -8.9, y: 25.9 }, // aft VTOL bell inner-bottom
      { x: -25.1, y: 26.2 }, // aft VTOL bell outer-bottom
      { x: -25.1, y: 16.6 }, // aft VTOL bell outer-top
      { x: -34.8, y: 15.0 }, // pod bottom aft
      { x: -37.9, y: 12.5 }, // pod aft chamfer
      { x: -43.5, y: 38.9 }, // aft footpad inner-bottom
      { x: -64.0, y: 38.9 }, // aft footpad outer-bottom
    ],
    stats: {
      agility: 3,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 4,
    },
  },
  {
    id: 'vulcan',
    name: 'Aegis Vulcan',
    codename: 'AV-17 Support Transport',
    tagline: 'Massive Military Support, Heavy Cargo & Multi-Role Fleet Transport',
    classType: 'Heavy Transport',
    description: 'The legendary Aegis Vulcan fleet support and heavy transport craft from Aegis Dynamics. Designed in an elongated heavy industrial side-profile with ballistic white cab armor, olive-drab military plate with weathered "R-17" tactical stencils, center drone operator airlock with Aegis insignia, underslung heavy propellant tank, dual ventral VTOL lift nozzles, and colossal hydraulic landing gear struts with articulated footpads.',
    width: 226,
    height: 72,
    renderScale: 1.55,
    maxFuel: 360,
    thrustMultiplier: 1.52,
    torqueMultiplier: 0.70,
    mass: 2.00,
    armor: 0.65,
    emptyMassTons: 29.5,
    maxThrustKn: 430,
    twr: 1.49,
    rcsResponseMs: 60,
    armorRatingMm: 165,
    cargoHookCapacityKg: 3400,
    roverBayCapacity: 'Aegis Heavy Cargo Hold & Drone Maintenance Bay',
    propulsionType: 'Dual High-Output Ventral VTOL Lift Thrusters + Aft Vectoring Nozzles',
    operationalCeiling: 'Deep-Space Fleet Support, Combat Logistics & Planetary Drops',
    manufactureOrigin: 'Aegis Dynamics Fleet Works (Sol Aerospace Sector)',
    primaryColor: '#3c4a36',
    accentColor: '#dc2626',
    visorColor: '#0f172a',
    footpadSpan: 114.7,
    canCarryVehicles: true,
    isHeavyVehicleCarrier: true,
    localPoints: {
      nose: { x: -112.4, y: -1.6 },
      leftShoulder: { x: -71.3, y: -29.5 },
      rightShoulder: { x: 102.3, y: -15.5 },
      leftHip: { x: -102.3, y: 4.7 },
      rightHip: { x: 112.4, y: 4.7 },
      leftFoot: { x: -49.6, y: 31.0 },
      rightFoot: { x: 65.1, y: 31.0 },
      leftThrusterPos: { x: -37.2, y: 25.58 },
      rightThrusterPos: { x: 55.8, y: 25.58 },
    },
    collisionPolygon: [
      { x: -112.4, y: -1.6 },
      { x: -108.5, y: -23.3 },
      { x: -105.4, y: -29.5 },
      { x: -71.3, y: -29.5 },
      { x: -12.4, y: -29.5 },
      { x: 21.7, y: -39.5 },
      { x: 48.8, y: -38.8 },
      { x: 65.1, y: -34.1 },
      { x: 86.8, y: -24.8 },
      { x: 102.3, y: -15.5 },
      { x: 108.5, y: -10.9 },
      { x: 112.4, y: -6.2 },
      { x: 112.4, y: 4.7 },
      { x: 108.5, y: 7.8 },
      { x: 102.3, y: 10.9 },
      { x: 102.3, y: 24.8 },
      { x: 83.7, y: 24.8 },
      { x: 70.5, y: 31.0 },
      { x: 59.7, y: 31.0 },
      { x: 55.8, y: 25.6 },
      { x: 7.8, y: 28.7 },
      { x: -37.2, y: 25.6 },
      { x: -44.2, y: 31.0 },
      { x: -55.0, y: 31.0 },
      { x: -71.3, y: 14.0 },
      { x: -102.3, y: 4.7 },
      { x: -110.8, y: 0.0 },
    ],
    stats: {
      agility: 1,
      fuelTank: 5,
      stability: 5,
      thrust: 5,
      armor: 5,
    },
  },
];

export function getShipConfig(modelId: ShipModelId = 'apollo'): ShipModelConfig {
  return SHIPS.find((s) => s.id === modelId) || SHIPS[0];
}

export const SHIP_MODELS = SHIPS;
