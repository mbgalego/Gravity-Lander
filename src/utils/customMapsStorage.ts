import { CustomMapData, CustomMapTheme, CustomObstacleData, CustomFuelData, CustomCargoPlatformData, CustomSignpostData } from '../types';
import { calculateMapDifficulty } from './difficultyCalculator';

const STORAGE_KEY = 'gravity_lander_custom_maps_v4';

export const OFFICIAL_LUNA_MAP: CustomMapData = {
  id: 'official-luna',
  name: 'Luna Core',
  description: 'Official Tutorial World. 3-tier subterranean lunar training caverns with complete vacuum. Learn thruster flight, extract Scientific Sensor Pod from Mining Depot and deliver to Level 2 Nexus.',
  author: 'Flight Training Academy',
  createdAt: 1786979339599,
  updatedAt: 1788500000000,
  themeId: 'custom',
  terrainLineStyle: 'straight',
  customTheme: {
    id: 'theme-luna',
    name: 'Luna Core Atmosphere',
    skyTop: '#05070c',
    skyBottom: '#0d131f',
    terrainFill: '#141824',
    terrainBorder: '#94a3b8',
    terrainAccent: '#38bdf8',
    gridColor: 'rgba(148, 163, 184, 0.06)',
    dustColor: '#cbd5e1',
    glowColor: 'rgba(56, 189, 248, 0.25)',
    starDensity: 1.2,
  },
  worldWidth: 8600,
  worldHeight: 3200,
  gravity: 1.62,
  airResistance: 0,
  fuelBurnRate: 4.5,
  targetTimeSec: 300,
  difficulty: 'Easy',
  launchPad: {
    x: 459,
    y: 760,
    width: 260,
  },
  landingPad: {
    x: 7602,
    y: 1277,
    width: 260,
  },
  groundNodes: [
    { x: 0, y: 141 },
    { x: 128, y: 651 },
    { x: 242, y: 752 },
    { x: 300, y: 772 },
    { x: 462, y: 772 },
    { x: 654, y: 772 },
    { x: 768, y: 1042 },
    { x: 896, y: 1663 },
    { x: 1024, y: 2194 },
    { x: 1152, y: 2592 },
    { x: 1280, y: 2823 },
    { x: 1408, y: 2818 },
    { x: 1536, y: 2844 },
    { x: 1664, y: 2867 },
    { x: 1792, y: 2886 },
    { x: 1920, y: 2901 },
    { x: 2048, y: 2913 },
    { x: 2176, y: 2923 },
    { x: 2304, y: 2931 },
    { x: 2432, y: 2935 },
    { x: 2560, y: 2935 },
    { x: 2688, y: 2933 },
    { x: 2816, y: 2931 },
    { x: 2944, y: 2933 },
    { x: 3072, y: 2938 },
    { x: 3200, y: 2946 },
    { x: 3286, y: 2895 },
    { x: 3449, y: 2842 },
    { x: 3584, y: 2980 },
    { x: 3718, y: 2911 },
    { x: 3837, y: 2980 },
    { x: 3968, y: 3026 },
    { x: 4143, y: 2980 },
    { x: 4266, y: 2862 },
    { x: 4379, y: 2958 },
    { x: 4480, y: 3033 },
    { x: 4608, y: 3021 },
    { x: 4674, y: 3000 },
    { x: 4713, y: 2927 },
    { x: 4681, y: 2744 },
    { x: 4758, y: 2537 },
    { x: 4936, y: 2456 },
    { x: 5229, y: 2421 },
    { x: 5504, y: 2859 },
    { x: 5632, y: 2845 },
    { x: 5760, y: 2834 },
    { x: 5888, y: 2826 },
    { x: 6016, y: 2821 },
    { x: 6144, y: 2819 },
    { x: 6272, y: 2697 },
    { x: 6400, y: 2502 },
    { x: 6528, y: 2312 },
    { x: 6656, y: 2132 },
    { x: 6784, y: 1967 },
    { x: 6912, y: 1821 },
    { x: 6979, y: 1675 },
    { x: 7100, y: 1546 },
    { x: 7200, y: 1446 },
    { x: 7463, y: 1290 },
    { x: 7740, y: 1290 },
    { x: 7768, y: 1382 },
    { x: 7868, y: 1412 },
    { x: 7936, y: 1441 },
    { x: 8064, y: 1441 },
    { x: 8192, y: 1467 },
    { x: 8320, y: 1462 },
    { x: 8448, y: 1459 },
    { x: 8576, y: 70 },
    { x: 8600, y: 70 },
  ],
  ceilingNodes: [
    { x: 0, y: 144 },
    { x: 128, y: 70 },
    { x: 264, y: 121 },
    { x: 401, y: 140 },
    { x: 547, y: 217 },
    { x: 664, y: 215 },
    { x: 810, y: 299 },
    { x: 961, y: 327 },
    { x: 1115, y: 317 },
    { x: 1230, y: 391 },
    { x: 1310, y: 463 },
    { x: 1408, y: 445 },
    { x: 1519, y: 496 },
    { x: 1664, y: 447 },
    { x: 1765, y: 434 },
    { x: 1920, y: 447 },
    { x: 2048, y: 445 },
    { x: 2178, y: 378 },
    { x: 2304, y: 436 },
    { x: 2432, y: 430 },
    { x: 2560, y: 426 },
    { x: 2800, y: 461 },
    { x: 3072, y: 421 },
    { x: 3294, y: 385 },
    { x: 3584, y: 422 },
    { x: 3691, y: 360 },
    { x: 3854, y: 327 },
    { x: 4051, y: 295 },
    { x: 4165, y: 259 },
    { x: 4276, y: 313 },
    { x: 4401, y: 325 },
    { x: 4440, y: 401 },
    { x: 4736, y: 440 },
    { x: 4855, y: 471 },
    { x: 5120, y: 456 },
    { x: 5259, y: 501 },
    { x: 5504, y: 461 },
    { x: 5632, y: 461 },
    { x: 5860, y: 432 },
    { x: 6144, y: 470 },
    { x: 6374, y: 437 },
    { x: 6656, y: 474 },
    { x: 6912, y: 477 },
    { x: 7154, y: 426 },
    { x: 7247, y: 500 },
    { x: 7366, y: 431 },
    { x: 7510, y: 452 },
    { x: 7642, y: 542 },
    { x: 7759, y: 425 },
    { x: 7900, y: 509 },
    { x: 7937, y: 363 },
    { x: 8192, y: 70 },
    { x: 8320, y: 70 },
    { x: 8448, y: 70 },
    { x: 8576, y: 70 },
    { x: 8600, y: 70 },
  ],
  obstacles: [
    {
      id: 'obs-luna-1',
      name: 'Geological Formation 1',
      type: 'polygon',
      points: [
        { x: 700, y: 920 },
        { x: 1150, y: 900 },
        { x: 1347, y: 1045 },
        { x: 1319, y: 1095 },
        { x: 1073, y: 1149 },
        { x: 740, y: 1030 },
      ],
    },
    {
      id: 'obs-luna-2',
      name: 'Geological Formation 2',
      type: 'polygon',
      points: [
        { x: 2100, y: 920 },
        { x: 3000, y: 940 },
        { x: 3678, y: 902 },
        { x: 3694, y: 1096 },
        { x: 3000, y: 1042 },
        { x: 2140, y: 1030 },
      ],
    },
    {
      id: 'obs-luna-3',
      name: 'Geological Formation 3',
      type: 'polygon',
      points: [
        { x: 4576, y: 874 },
        { x: 5650, y: 890 },
        { x: 6662, y: 920 },
        { x: 6576, y: 1094 },
        { x: 5650, y: 1012 },
        { x: 4652, y: 984 },
      ],
    },
    {
      id: 'obs-luna-4',
      name: 'Geological Formation 4',
      type: 'polygon',
      points: [
        { x: 947, y: 1922 },
        { x: 2447, y: 1882 },
        { x: 3643, y: 1914 },
        { x: 3551, y: 2076 },
        { x: 2447, y: 2082 },
        { x: 997, y: 2052 },
      ],
    },
    {
      id: 'obs-luna-5',
      name: 'Geological Formation 5',
      type: 'polygon',
      points: [
        { x: 4866, y: 1891 },
        { x: 5590, y: 1891 },
        { x: 6793, y: 1933 },
        { x: 6706, y: 2058 },
        { x: 5590, y: 2091 },
        { x: 4920, y: 2005 },
      ],
    },
    {
      id: 'obs-luna-7',
      name: 'Geological Formation 7',
      type: 'polygon',
      points: [
        { x: 2453, y: 2813 },
        { x: 2753, y: 2813 },
        { x: 2733, y: 2931 },
        { x: 2473, y: 2931 },
      ],
    },
    {
      id: 'obs-luna-8',
      name: 'Geological Formation 8',
      type: 'polygon',
      points: [
        { x: 1605, y: 1487 },
        { x: 2065, y: 1487 },
        { x: 2027, y: 1565 },
        { x: 1643, y: 1565 },
      ],
    },
    {
      id: 'obs-1787234211409',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 1667, y: 2470 },
        { x: 1957, y: 2610 },
        { x: 1795, y: 2894 },
        { x: 1627, y: 2860 },
      ],
    },
  ],
  fuelPickups: [
    { id: 'fuel-luna-1', x: 6298, y: 1379, amount: 75 },
    { id: 'fuel-luna-3', x: 3100, y: 1480, amount: 75 },
    { id: 'fuel-luna-4', x: 1404, y: 2503, amount: 90 },
    { id: 'fuel-luna-5', x: 5803, y: 2529, amount: 80 },
    { id: 'fuel-1787240962762', x: 6298, y: 681, amount: 100 },
    { id: 'fuel-1787241058010', x: 3635, y: 2557, amount: 65 },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-42001',
      type: 'pickup',
      label: 'SUB-CRUST MINING DEPOT',
      x: 2603,
      y: 2801,
      width: 240,
    },
    {
      id: 'vehicle-depot-42001',
      type: 'vehicle_depot',
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      x: 1838,
      y: 1471,
      width: 480,
      truckCount: 2,
    },
  ],
  signposts: [
    {
      id: 'sign-1787239913405',
      x: 318,
      y: 213,
      direction: 'right',
      targetType: 'landing',
      targetName: 'PRIMARY BASE LZ',
      subText: 'EXPEDITION OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787239919210',
      x: 318,
      y: 350,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787239922965',
      x: 619,
      y: 354,
      direction: 'down_right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787239952343',
      x: 2273,
      y: 1140,
      direction: 'up_right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787239961010',
      x: 2556,
      y: 1139,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787239982775',
      x: 2571,
      y: 2195,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787239985902',
      x: 2574,
      y: 2327,
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787240019083',
      x: 4215,
      y: 433,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787240026394',
      x: 4222,
      y: 577,
      direction: 'down',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787240033127',
      x: 4221,
      y: 730,
      direction: 'down_left',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787240059713',
      x: 4228,
      y: 1837,
      direction: 'up_right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787240066211',
      x: 4234,
      y: 2115,
      direction: 'down_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787240070696',
      x: 4231,
      y: 1969,
      direction: 'up_left',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787240244980',
      x: 1712,
      y: 538,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787240251322',
      x: 1713,
      y: 664,
      direction: 'down',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787240255888',
      x: 1714,
      y: 787,
      direction: 'down',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787240305744',
      x: 7585,
      y: 765,
      direction: 'down',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787637540823',
      x: 1378,
      y: 2332,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
    {
      id: 'sign-1787637552710',
      x: 3653,
      y: 2370,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
    {
      id: 'sign-1787637558810',
      x: 6294,
      y: 1209,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
    {
      id: 'sign-1787637562584',
      x: 6284,
      y: 544,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
    {
      id: 'sign-1787637576142',
      x: 3070,
      y: 1264,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
    {
      id: 'sign-1787637620176',
      x: 5787,
      y: 2305,
      direction: 'down',
      targetType: 'fuel',
      targetName: 'FUEL DEPOT',
      subText: 'REFILL STATION',
      color: '#06b6d4',
    },
  ],
  textNotes: [
    {
      id: 'note-1787637705523',
      x: 389,
      y: 846,
      text: 'Go to Landing Zone (LZ)',
      size: 'xl',
      style: 'monospace',
      color: '#38bdf8',
      showBorder: false,
      align: 'center',
    },
    {
      id: 'note-1787637758855',
      x: 418,
      y: 958,
      text: 'Transport cargo and \nvehicles for extra points',
      size: 'xl',
      style: 'monospace',
      color: '#f8fafc',
      showBorder: false,
      align: 'left',
    },
    {
      id: 'note-1787638238407',
      x: 1841,
      y: 1683,
      text: "Base status:\nGreen - your craft can land and pickup vehicles\nRed   - your craft can't load vehicles, but can\n        land for repairs and fuel",
      size: 'large',
      style: 'monospace',
      color: '#f8fafc',
      showBorder: false,
      align: 'left',
    },
    {
      id: 'note-1787638495286',
      x: 2231,
      y: 2606,
      text: 'You can hover over the cargo \nor land to pick it up.\n\nThis base also repairs \nand refuels your craft.',
      size: 'large',
      style: 'monospace',
      color: '#f8fafc',
      showBorder: false,
      align: 'left',
    },
    {
      id: 'note-1787638638656',
      x: 8107,
      y: 1109,
      text: 'Land at LZ as quickly as possible!',
      size: 'large',
      style: 'mono',
      color: '#f59e0b',
      showBorder: false,
      align: 'center',
    },
    {
      id: 'note-1787638737331',
      x: 8103,
      y: 1197,
      text: 'Soft landing, delivering vehicles \nand cargo give extra points.',
      size: 'large',
      style: 'mono',
      color: '#f8fafc',
      showBorder: false,
      align: 'left',
    },
  ],
};

export const OFFICIAL_TITAN_MAP: CustomMapData = {
  "id": "official-titan",
  "name": "Titan Grotto",
  "description": "Low gravity with dense atmospheric drag. Navigate through deep methane fissure chambers to hoist the Cryo Fuel Cell.",
  "author": "Planetary Federation",
  "createdAt": 1787001231992,
  "updatedAt": 1787997174387,
  "themeId": "custom",
  "terrainLineStyle": "straight",
  "customTheme": {
    "id": "theme-titan",
    "name": "Titan Grotto Atmosphere",
    "skyTop": "#03141a",
    "skyBottom": "#07242c",
    "terrainFill": "#061a21",
    "terrainBorder": "#2dd4bf",
    "terrainAccent": "#34d399",
    "gridColor": "rgba(45, 212, 191, 0.08)",
    "dustColor": "#99f6e4",
    "glowColor": "rgba(45, 212, 191, 0.35)",
    "starDensity": 1.2
  },
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 1.38,
  "airResistance": 0.0032,
  "fuelBurnRate": 4.8,
  "targetTimeSec": 245,
  "difficulty": "Extreme",
  "launchPad": {
    "x": 512,
    "y": 713,
    "width": 260
  },
  "landingPad": {
    "x": 8229,
    "y": 817,
    "width": 260
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 716
    },
    {
      "x": 256,
      "y": 714
    },
    {
      "x": 384,
      "y": 713
    },
    {
      "x": 512,
      "y": 713
    },
    {
      "x": 640,
      "y": 713
    },
    {
      "x": 768,
      "y": 720
    },
    {
      "x": 896,
      "y": 770
    },
    {
      "x": 1082,
      "y": 1037
    },
    {
      "x": 1152,
      "y": 1221
    },
    {
      "x": 1230,
      "y": 1411
    },
    {
      "x": 1452,
      "y": 1636
    },
    {
      "x": 1536,
      "y": 1850
    },
    {
      "x": 1664,
      "y": 2036
    },
    {
      "x": 1540,
      "y": 2152
    },
    {
      "x": 1436,
      "y": 2216
    },
    {
      "x": 1422,
      "y": 2329
    },
    {
      "x": 1471,
      "y": 2421
    },
    {
      "x": 1629,
      "y": 2426
    },
    {
      "x": 1743,
      "y": 2426
    },
    {
      "x": 1839,
      "y": 2343
    },
    {
      "x": 1842,
      "y": 2262
    },
    {
      "x": 1841,
      "y": 2215
    },
    {
      "x": 1872,
      "y": 2179
    },
    {
      "x": 1918,
      "y": 2193
    },
    {
      "x": 1955,
      "y": 2222
    },
    {
      "x": 1997,
      "y": 2269
    },
    {
      "x": 2032,
      "y": 2307
    },
    {
      "x": 2084,
      "y": 2298
    },
    {
      "x": 2126,
      "y": 2326
    },
    {
      "x": 2048,
      "y": 2500
    },
    {
      "x": 2116,
      "y": 2683
    },
    {
      "x": 2303,
      "y": 2767
    },
    {
      "x": 2554,
      "y": 2775
    },
    {
      "x": 2583,
      "y": 2853
    },
    {
      "x": 2688,
      "y": 2864
    },
    {
      "x": 2844,
      "y": 2704
    },
    {
      "x": 2944,
      "y": 2848
    },
    {
      "x": 3098,
      "y": 2780
    },
    {
      "x": 3200,
      "y": 2874
    },
    {
      "x": 3328,
      "y": 2867
    },
    {
      "x": 3456,
      "y": 2848
    },
    {
      "x": 3584,
      "y": 2825
    },
    {
      "x": 3712,
      "y": 2802
    },
    {
      "x": 3840,
      "y": 2785
    },
    {
      "x": 3968,
      "y": 2777
    },
    {
      "x": 4096,
      "y": 2778
    },
    {
      "x": 4224,
      "y": 2790
    },
    {
      "x": 4352,
      "y": 2812
    },
    {
      "x": 4480,
      "y": 2839
    },
    {
      "x": 4608,
      "y": 2866
    },
    {
      "x": 4736,
      "y": 2885
    },
    {
      "x": 4864,
      "y": 2892
    },
    {
      "x": 4992,
      "y": 2885
    },
    {
      "x": 5120,
      "y": 2868
    },
    {
      "x": 5248,
      "y": 2844
    },
    {
      "x": 5376,
      "y": 2818
    },
    {
      "x": 5504,
      "y": 2793
    },
    {
      "x": 5632,
      "y": 2775
    },
    {
      "x": 5760,
      "y": 2768
    },
    {
      "x": 5888,
      "y": 2774
    },
    {
      "x": 6016,
      "y": 2794
    },
    {
      "x": 6144,
      "y": 2821
    },
    {
      "x": 6272,
      "y": 2674
    },
    {
      "x": 6400,
      "y": 2420
    },
    {
      "x": 6595,
      "y": 2222
    },
    {
      "x": 7016,
      "y": 2124
    },
    {
      "x": 7387,
      "y": 2208
    },
    {
      "x": 7180,
      "y": 2362
    },
    {
      "x": 6813,
      "y": 2448
    },
    {
      "x": 6637,
      "y": 2647
    },
    {
      "x": 6598,
      "y": 2898
    },
    {
      "x": 6822,
      "y": 3059
    },
    {
      "x": 7205,
      "y": 3065
    },
    {
      "x": 7404,
      "y": 2903
    },
    {
      "x": 7654,
      "y": 2628
    },
    {
      "x": 7864,
      "y": 2695
    },
    {
      "x": 8078,
      "y": 2526
    },
    {
      "x": 8117,
      "y": 2098
    },
    {
      "x": 7694,
      "y": 1862
    },
    {
      "x": 7188,
      "y": 1773
    },
    {
      "x": 7033,
      "y": 1760
    },
    {
      "x": 6828,
      "y": 1712
    },
    {
      "x": 6912,
      "y": 1515
    },
    {
      "x": 7040,
      "y": 1338
    },
    {
      "x": 7168,
      "y": 1186
    },
    {
      "x": 7296,
      "y": 1061
    },
    {
      "x": 7435,
      "y": 853
    },
    {
      "x": 7552,
      "y": 901
    },
    {
      "x": 7736,
      "y": 793
    },
    {
      "x": 7808,
      "y": 866
    },
    {
      "x": 7936,
      "y": 839
    },
    {
      "x": 8064,
      "y": 839
    },
    {
      "x": 8208,
      "y": 835
    },
    {
      "x": 8346,
      "y": 835
    },
    {
      "x": 8448,
      "y": 848
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 70
    },
    {
      "x": 256,
      "y": 70
    },
    {
      "x": 447,
      "y": 72
    },
    {
      "x": 641,
      "y": 177
    },
    {
      "x": 748,
      "y": 287
    },
    {
      "x": 820,
      "y": 378
    },
    {
      "x": 1036,
      "y": 418
    },
    {
      "x": 1176,
      "y": 533
    },
    {
      "x": 1268,
      "y": 691
    },
    {
      "x": 1428,
      "y": 854
    },
    {
      "x": 1600,
      "y": 1173
    },
    {
      "x": 1844,
      "y": 1287
    },
    {
      "x": 2062,
      "y": 1261
    },
    {
      "x": 2204,
      "y": 1084
    },
    {
      "x": 2318,
      "y": 892
    },
    {
      "x": 2284,
      "y": 752
    },
    {
      "x": 2344,
      "y": 571
    },
    {
      "x": 2432,
      "y": 493
    },
    {
      "x": 2580,
      "y": 532
    },
    {
      "x": 2688,
      "y": 488
    },
    {
      "x": 2830,
      "y": 410
    },
    {
      "x": 3016,
      "y": 514
    },
    {
      "x": 3130,
      "y": 415
    },
    {
      "x": 3200,
      "y": 495
    },
    {
      "x": 3328,
      "y": 496
    },
    {
      "x": 3456,
      "y": 495
    },
    {
      "x": 3592,
      "y": 467
    },
    {
      "x": 3712,
      "y": 496
    },
    {
      "x": 3840,
      "y": 495
    },
    {
      "x": 3970,
      "y": 440
    },
    {
      "x": 4096,
      "y": 486
    },
    {
      "x": 4224,
      "y": 480
    },
    {
      "x": 4352,
      "y": 545
    },
    {
      "x": 4480,
      "y": 485
    },
    {
      "x": 4656,
      "y": 477
    },
    {
      "x": 4770,
      "y": 612
    },
    {
      "x": 4872,
      "y": 689
    },
    {
      "x": 4986,
      "y": 697
    },
    {
      "x": 5150,
      "y": 600
    },
    {
      "x": 5248,
      "y": 608
    },
    {
      "x": 5376,
      "y": 611
    },
    {
      "x": 5504,
      "y": 607
    },
    {
      "x": 5688,
      "y": 479
    },
    {
      "x": 5800,
      "y": 486
    },
    {
      "x": 5938,
      "y": 475
    },
    {
      "x": 6016,
      "y": 526
    },
    {
      "x": 6168,
      "y": 462
    },
    {
      "x": 6272,
      "y": 468
    },
    {
      "x": 6400,
      "y": 459
    },
    {
      "x": 6588,
      "y": 548
    },
    {
      "x": 6608,
      "y": 706
    },
    {
      "x": 6764,
      "y": 788
    },
    {
      "x": 6870,
      "y": 822
    },
    {
      "x": 7104,
      "y": 792
    },
    {
      "x": 7188,
      "y": 674
    },
    {
      "x": 7308,
      "y": 582
    },
    {
      "x": 7416,
      "y": 483
    },
    {
      "x": 7551,
      "y": 558
    },
    {
      "x": 7694,
      "y": 532
    },
    {
      "x": 7785,
      "y": 405
    },
    {
      "x": 7936,
      "y": 479
    },
    {
      "x": 8064,
      "y": 479
    },
    {
      "x": 8192,
      "y": 70
    },
    {
      "x": 8320,
      "y": 70
    },
    {
      "x": 8448,
      "y": 70
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "obstacles": [
    {
      "id": "obs-titan-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 2691,
          "y": 1076
        },
        {
          "x": 2879,
          "y": 1126
        },
        {
          "x": 4439,
          "y": 1100
        },
        {
          "x": 4461,
          "y": 1312
        },
        {
          "x": 2841,
          "y": 1224
        },
        {
          "x": 2639,
          "y": 1284
        }
      ]
    },
    {
      "id": "obs-titan-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 3194,
          "y": 1986
        },
        {
          "x": 4500,
          "y": 2000
        },
        {
          "x": 6614,
          "y": 2212
        },
        {
          "x": 6412,
          "y": 2452
        },
        {
          "x": 4500,
          "y": 2210
        },
        {
          "x": 2806,
          "y": 2344
        }
      ]
    },
    {
      "id": "obs-titan-4",
      "name": "Geological Formation 4",
      "type": "polygon",
      "points": [
        {
          "x": 4062,
          "y": 2685
        },
        {
          "x": 4362,
          "y": 2685
        },
        {
          "x": 4332,
          "y": 2803
        },
        {
          "x": 4092,
          "y": 2803
        }
      ]
    },
    {
      "id": "obs-titan-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 5162,
          "y": 891
        },
        {
          "x": 5840,
          "y": 747
        },
        {
          "x": 6440,
          "y": 827
        },
        {
          "x": 6400,
          "y": 917
        },
        {
          "x": 5840,
          "y": 869
        },
        {
          "x": 5237,
          "y": 1030
        }
      ]
    },
    {
      "id": "obs-titan-6",
      "name": "Geological Formation 6",
      "type": "polygon",
      "points": [
        {
          "x": 1913,
          "y": 1676
        },
        {
          "x": 2785,
          "y": 1674
        },
        {
          "x": 2643,
          "y": 1890
        },
        {
          "x": 1951,
          "y": 1754
        }
      ]
    },
    {
      "id": "obs-1787236639246",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 4,
          "y": 62
        },
        {
          "x": 4,
          "y": 65
        },
        {
          "x": 191,
          "y": 65
        },
        {
          "x": 56,
          "y": 365
        }
      ]
    },
    {
      "id": "obs-1787702659927",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 5353,
          "y": 1318
        },
        {
          "x": 5923,
          "y": 1342
        },
        {
          "x": 6323,
          "y": 1112
        },
        {
          "x": 6241,
          "y": 1562
        },
        {
          "x": 5807,
          "y": 1720
        },
        {
          "x": 5477,
          "y": 1646
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-titan-1",
      "x": 5797,
      "y": 1121,
      "amount": 80
    },
    {
      "id": "fuel-titan-3",
      "x": 6077,
      "y": 657,
      "amount": 90
    },
    {
      "id": "fuel-titan-4",
      "x": 4049,
      "y": 1407,
      "amount": 90
    },
    {
      "id": "fuel-1787702821071",
      "x": 6112,
      "y": 2558,
      "amount": 65
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-51203",
      "type": "pickup",
      "label": "SUB-CRUST MINING DEPOT",
      "x": 4212,
      "y": 2673,
      "width": 240
    },
    {
      "id": "vehicle-depot-51203",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 3504,
      "y": 1107,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787702812447",
      "type": "pickup",
      "x": 6993,
      "y": 3049,
      "width": 140,
      "weightClass": "heavy",
      "label": "HEAVY DEPOT"
    },
    {
      "id": "cargo-pickup-1787930940093",
      "type": "pickup",
      "x": 1658,
      "y": 2417,
      "width": 140,
      "weightClass": "heavy",
      "cargoType": "cryogenic",
      "label": "CRYO SPECIMEN DOCK"
    }
  ],
  "signposts": [
    {
      "id": "sign-1787236443099",
      "x": 286,
      "y": 184,
      "direction": "down_right",
      "targetType": "landing",
      "targetName": "PRIMARY BASE LZ",
      "subText": "EXPEDITION OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787236450315",
      "x": 291,
      "y": 320,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787236454594",
      "x": 293,
      "y": 457,
      "direction": "down_right",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787236512001",
      "x": 5051,
      "y": 1638,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787236519170",
      "x": 5052,
      "y": 1480,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787236524632",
      "x": 5053,
      "y": 1321,
      "direction": "up_left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787236548707",
      "x": 3760,
      "y": 584,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787236553807",
      "x": 3438,
      "y": 590,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787236587883",
      "x": 4008,
      "y": 2338,
      "direction": "up_left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787236598173",
      "x": 4295,
      "y": 2341,
      "direction": "left",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787702900610",
      "x": 2493,
      "y": 2121,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787702927436",
      "x": 2353,
      "y": 1422,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787702947940",
      "x": 2350,
      "y": 1284,
      "direction": "up_right",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787931051730",
      "x": 1862,
      "y": 1916,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787931075620",
      "x": 6596,
      "y": 1749,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787931084460",
      "x": 6591,
      "y": 1597,
      "direction": "up_right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    }
  ],
  "textNotes": [],
  "difficultyMode": "auto",
  "volcanoes": [
    {
      "id": "volcano-1787998627100",
      "x": 2429,
      "y": 2773,
      "width": 260,
      "height": 160,
      "calderaWidth": 83,
      "eruptionHeight": 320,
      "eruptionInterval": 10,
      "eruptionDuration": 1.8,
      "colorTheme": "toxic"
    }
  ]
};

export const OFFICIAL_ARES_MAP: CustomMapData = {
  "id": "official-ares",
  "name": "Ares Canyon",
  "description": "Multi-level jagged red sandstone caves with thin dust atmosphere. Transport the heavy Drill Core Matrix across geothermal shafts.",
  "author": "Planetary Federation",
  "createdAt": 1786995167668,
  "updatedAt": 1787997177694,
  "themeId": "custom",
  "terrainLineStyle": "straight",
  "customTheme": {
    "id": "theme-ares",
    "name": "Ares Canyon Atmosphere",
    "skyTop": "#130806",
    "skyBottom": "#29100a",
    "terrainFill": "#240d08",
    "terrainBorder": "#f87171",
    "terrainAccent": "#fb923c",
    "gridColor": "rgba(251, 146, 60, 0.07)",
    "dustColor": "#fdba74",
    "glowColor": "rgba(248, 113, 113, 0.3)",
    "starDensity": 1.2
  },
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 3.72,
  "airResistance": 0.0008,
  "fuelBurnRate": 5.5,
  "targetTimeSec": 210,
  "difficulty": "Medium",
  "launchPad": {
    "x": 517,
    "y": 552,
    "width": 260
  },
  "landingPad": {
    "x": 7979,
    "y": 2153,
    "width": 260
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 578
    },
    {
      "x": 256,
      "y": 586
    },
    {
      "x": 373,
      "y": 570
    },
    {
      "x": 512,
      "y": 552
    },
    {
      "x": 640,
      "y": 552
    },
    {
      "x": 768,
      "y": 597
    },
    {
      "x": 896,
      "y": 656
    },
    {
      "x": 1024,
      "y": 910
    },
    {
      "x": 1152,
      "y": 1155
    },
    {
      "x": 1280,
      "y": 1388
    },
    {
      "x": 1408,
      "y": 1605
    },
    {
      "x": 1536,
      "y": 1801
    },
    {
      "x": 1664,
      "y": 1972
    },
    {
      "x": 1792,
      "y": 2112
    },
    {
      "x": 1988,
      "y": 2141
    },
    {
      "x": 2089,
      "y": 2206
    },
    {
      "x": 2176,
      "y": 2320
    },
    {
      "x": 2304,
      "y": 2335
    },
    {
      "x": 2417,
      "y": 2235
    },
    {
      "x": 2501,
      "y": 2085
    },
    {
      "x": 2649,
      "y": 2161
    },
    {
      "x": 2840,
      "y": 1969
    },
    {
      "x": 2967,
      "y": 2264
    },
    {
      "x": 3065,
      "y": 2284
    },
    {
      "x": 3200,
      "y": 2297
    },
    {
      "x": 3328,
      "y": 2276
    },
    {
      "x": 3456,
      "y": 2261
    },
    {
      "x": 3625,
      "y": 2140
    },
    {
      "x": 3786,
      "y": 2123
    },
    {
      "x": 3840,
      "y": 2267
    },
    {
      "x": 3968,
      "y": 2287
    },
    {
      "x": 4096,
      "y": 2309
    },
    {
      "x": 4224,
      "y": 2330
    },
    {
      "x": 4352,
      "y": 2343
    },
    {
      "x": 4480,
      "y": 2349
    },
    {
      "x": 4608,
      "y": 2346
    },
    {
      "x": 4736,
      "y": 2336
    },
    {
      "x": 4864,
      "y": 2318
    },
    {
      "x": 4992,
      "y": 2295
    },
    {
      "x": 5120,
      "y": 2278
    },
    {
      "x": 5248,
      "y": 2262
    },
    {
      "x": 5376,
      "y": 2246
    },
    {
      "x": 5504,
      "y": 2232
    },
    {
      "x": 5657,
      "y": 2099
    },
    {
      "x": 5777,
      "y": 1979
    },
    {
      "x": 5881,
      "y": 1939
    },
    {
      "x": 5969,
      "y": 1850
    },
    {
      "x": 6023,
      "y": 1806
    },
    {
      "x": 6401,
      "y": 1807
    },
    {
      "x": 6453,
      "y": 1742
    },
    {
      "x": 6490,
      "y": 1619
    },
    {
      "x": 6510,
      "y": 1258
    },
    {
      "x": 6794,
      "y": 1162
    },
    {
      "x": 6810,
      "y": 1535
    },
    {
      "x": 6922,
      "y": 1396
    },
    {
      "x": 7058,
      "y": 1631
    },
    {
      "x": 7106,
      "y": 1852
    },
    {
      "x": 7359,
      "y": 1793
    },
    {
      "x": 7438,
      "y": 1993
    },
    {
      "x": 7552,
      "y": 2159
    },
    {
      "x": 7680,
      "y": 2159
    },
    {
      "x": 7808,
      "y": 2162
    },
    {
      "x": 7936,
      "y": 2153
    },
    {
      "x": 8064,
      "y": 2153
    },
    {
      "x": 8192,
      "y": 2169
    },
    {
      "x": 8320,
      "y": 2169
    },
    {
      "x": 8448,
      "y": 2170
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 70
    },
    {
      "x": 256,
      "y": 70
    },
    {
      "x": 384,
      "y": 70
    },
    {
      "x": 512,
      "y": 172
    },
    {
      "x": 640,
      "y": 172
    },
    {
      "x": 768,
      "y": 217
    },
    {
      "x": 896,
      "y": 276
    },
    {
      "x": 1024,
      "y": 409
    },
    {
      "x": 1152,
      "y": 410
    },
    {
      "x": 1280,
      "y": 412
    },
    {
      "x": 1408,
      "y": 413
    },
    {
      "x": 1536,
      "y": 411
    },
    {
      "x": 1664,
      "y": 407
    },
    {
      "x": 1792,
      "y": 402
    },
    {
      "x": 1920,
      "y": 399
    },
    {
      "x": 2048,
      "y": 398
    },
    {
      "x": 2176,
      "y": 398
    },
    {
      "x": 2304,
      "y": 396
    },
    {
      "x": 2432,
      "y": 394
    },
    {
      "x": 2560,
      "y": 392
    },
    {
      "x": 2688,
      "y": 392
    },
    {
      "x": 2816,
      "y": 395
    },
    {
      "x": 2944,
      "y": 399
    },
    {
      "x": 3072,
      "y": 419
    },
    {
      "x": 3200,
      "y": 456
    },
    {
      "x": 3328,
      "y": 488
    },
    {
      "x": 3456,
      "y": 515
    },
    {
      "x": 3584,
      "y": 536
    },
    {
      "x": 3712,
      "y": 549
    },
    {
      "x": 3840,
      "y": 551
    },
    {
      "x": 3968,
      "y": 542
    },
    {
      "x": 4096,
      "y": 525
    },
    {
      "x": 4224,
      "y": 502
    },
    {
      "x": 4352,
      "y": 476
    },
    {
      "x": 4480,
      "y": 446
    },
    {
      "x": 4608,
      "y": 411
    },
    {
      "x": 4736,
      "y": 374
    },
    {
      "x": 4864,
      "y": 371
    },
    {
      "x": 4992,
      "y": 368
    },
    {
      "x": 5120,
      "y": 367
    },
    {
      "x": 5248,
      "y": 367
    },
    {
      "x": 5376,
      "y": 366
    },
    {
      "x": 5504,
      "y": 363
    },
    {
      "x": 5632,
      "y": 359
    },
    {
      "x": 5760,
      "y": 356
    },
    {
      "x": 5888,
      "y": 355
    },
    {
      "x": 6016,
      "y": 356
    },
    {
      "x": 6163,
      "y": 671
    },
    {
      "x": 6404,
      "y": 906
    },
    {
      "x": 6653,
      "y": 746
    },
    {
      "x": 6954,
      "y": 835
    },
    {
      "x": 7424,
      "y": 377
    },
    {
      "x": 7552,
      "y": 380
    },
    {
      "x": 7680,
      "y": 384
    },
    {
      "x": 7808,
      "y": 386
    },
    {
      "x": 7936,
      "y": 387
    },
    {
      "x": 8064,
      "y": 386
    },
    {
      "x": 8192,
      "y": 70
    },
    {
      "x": 8320,
      "y": 70
    },
    {
      "x": 8448,
      "y": 70
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "obstacles": [
    {
      "id": "obs-ares-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 1007,
          "y": 888
        },
        {
          "x": 1707,
          "y": 828
        },
        {
          "x": 2407,
          "y": 888
        },
        {
          "x": 2367,
          "y": 998
        },
        {
          "x": 1707,
          "y": 962
        },
        {
          "x": 1047,
          "y": 998
        }
      ]
    },
    {
      "id": "obs-ares-2",
      "name": "Geological Formation 2",
      "type": "polygon",
      "points": [
        {
          "x": 3044,
          "y": 2190
        },
        {
          "x": 3364,
          "y": 2190
        },
        {
          "x": 3334,
          "y": 2318
        },
        {
          "x": 3082,
          "y": 2308
        }
      ]
    },
    {
      "id": "obs-ares-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 2600,
          "y": 1550
        },
        {
          "x": 3800,
          "y": 1500
        },
        {
          "x": 4648,
          "y": 1554
        },
        {
          "x": 4689,
          "y": 1719
        },
        {
          "x": 3800,
          "y": 1720
        },
        {
          "x": 2650,
          "y": 1690
        }
      ]
    },
    {
      "id": "obs-ares-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 4235,
          "y": 498
        },
        {
          "x": 4368,
          "y": 467
        },
        {
          "x": 4343,
          "y": 687
        },
        {
          "x": 4323,
          "y": 907
        },
        {
          "x": 4293,
          "y": 907
        },
        {
          "x": 4273,
          "y": 687
        }
      ]
    },
    {
      "id": "obs-ares-7",
      "name": "Geological Formation 7",
      "type": "polygon",
      "points": [
        {
          "x": 1439,
          "y": 1385
        },
        {
          "x": 1899,
          "y": 1385
        },
        {
          "x": 1861,
          "y": 1463
        },
        {
          "x": 1477,
          "y": 1463
        }
      ]
    },
    {
      "id": "obs-1787235302119",
      "name": "PILLAR Layer",
      "type": "pillar",
      "points": [
        {
          "x": 5263,
          "y": 893
        },
        {
          "x": 5490,
          "y": 1262
        },
        {
          "x": 5499,
          "y": 2234
        },
        {
          "x": 5244,
          "y": 2263
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-ares-1",
      "x": 1650,
      "y": 1598,
      "amount": 80
    },
    {
      "id": "fuel-ares-3",
      "x": 2262,
      "y": 2242,
      "amount": 90
    },
    {
      "id": "fuel-ares-4",
      "x": 8316,
      "y": 395,
      "amount": 75
    },
    {
      "id": "fuel-1787235539379",
      "x": 4663,
      "y": 608,
      "amount": 100
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-88412",
      "type": "pickup",
      "label": "SUB-CRUST MINING DEPOT",
      "x": 3199,
      "y": 2176,
      "width": 240
    },
    {
      "id": "vehicle-depot-88412",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 1669,
      "y": 1369,
      "width": 480,
      "truckCount": 2
    }
  ],
  "signposts": [
    {
      "id": "sign-1787235556334",
      "x": 1378,
      "y": 485,
      "direction": "right",
      "targetType": "landing",
      "targetName": "PRIMARY BASE LZ",
      "subText": "EXPEDITION OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787235574535",
      "x": 1637,
      "y": 488,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787235584664",
      "x": 1903,
      "y": 489,
      "direction": "down",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787235628605",
      "x": 1589,
      "y": 1062,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787235634556",
      "x": 1882,
      "y": 1055,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787235697188",
      "x": 3659,
      "y": 1800,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787235737713",
      "x": 3385,
      "y": 1802,
      "direction": "up_left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787235845989",
      "x": 5631,
      "y": 500,
      "direction": "left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787235859458",
      "x": 5900,
      "y": 501,
      "direction": "down_right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787235948400",
      "x": 5350,
      "y": 500,
      "direction": "left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    }
  ],
  "difficultyMode": "manual",
  "volcanoes": [
    {
      "id": "volcano-1787998478427",
      "x": 6218,
      "y": 1808,
      "width": 380,
      "height": 240,
      "calderaWidth": 122,
      "eruptionHeight": 480,
      "eruptionInterval": 10,
      "eruptionDuration": 1.8,
      "colorTheme": "magma"
    }
  ]
};

export const OFFICIAL_VESTA_MAP: CustomMapData = {
  "id": "official-vesta",
  "name": "Vesta Iron Ridge",
  "description": "Dense nickel-iron asteroid crater filled with magnetic ore towers and jagged slag overhangs. Heavy metallic obstacles require surgical vectoring.",
  "author": "Planetary Federation",
  "createdAt": 1787660235664,
  "updatedAt": 1787997181339,
  "themeId": "custom",
  "customTheme": {
    "id": "theme-vesta",
    "name": "Vesta Iron Ridge Atmosphere",
    "skyTop": "#0c0a06",
    "skyBottom": "#1c160e",
    "terrainFill": "#1a130a",
    "terrainBorder": "#f59e0b",
    "terrainAccent": "#fbbf24",
    "gridColor": "rgba(245, 158, 11, 0.06)",
    "dustColor": "#fde68a",
    "glowColor": "rgba(245, 158, 11, 0.28)",
    "starDensity": 1.2
  },
  "terrainLineStyle": "straight",
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 0.95,
  "airResistance": 0,
  "fuelBurnRate": 4,
  "targetTimeSec": 190,
  "difficulty": "Hard",
  "launchPad": {
    "x": 536,
    "y": 2749,
    "width": 320
  },
  "landingPad": {
    "x": 7964,
    "y": 1466,
    "width": 340
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 763
    },
    {
      "x": 120,
      "y": 810
    },
    {
      "x": 166,
      "y": 909
    },
    {
      "x": 170,
      "y": 1230
    },
    {
      "x": 235,
      "y": 1466
    },
    {
      "x": 399,
      "y": 1586
    },
    {
      "x": 459,
      "y": 1914
    },
    {
      "x": 286,
      "y": 2027
    },
    {
      "x": 273,
      "y": 2155
    },
    {
      "x": 218,
      "y": 2490
    },
    {
      "x": 250,
      "y": 2782
    },
    {
      "x": 385,
      "y": 2762
    },
    {
      "x": 683,
      "y": 2758
    },
    {
      "x": 860,
      "y": 2773
    },
    {
      "x": 936,
      "y": 2448
    },
    {
      "x": 913,
      "y": 2156
    },
    {
      "x": 886,
      "y": 1945
    },
    {
      "x": 972,
      "y": 1739
    },
    {
      "x": 1121,
      "y": 1541
    },
    {
      "x": 1285,
      "y": 1863
    },
    {
      "x": 1141,
      "y": 2114
    },
    {
      "x": 1145,
      "y": 2574
    },
    {
      "x": 1206,
      "y": 2663
    },
    {
      "x": 1280,
      "y": 2806
    },
    {
      "x": 1408,
      "y": 2808
    },
    {
      "x": 1573,
      "y": 2769
    },
    {
      "x": 1693,
      "y": 2851
    },
    {
      "x": 1792,
      "y": 2907
    },
    {
      "x": 1917,
      "y": 2881
    },
    {
      "x": 2048,
      "y": 2945
    },
    {
      "x": 2176,
      "y": 2956
    },
    {
      "x": 2304,
      "y": 2962
    },
    {
      "x": 2432,
      "y": 2966
    },
    {
      "x": 2560,
      "y": 2967
    },
    {
      "x": 2688,
      "y": 2965
    },
    {
      "x": 2851,
      "y": 2848
    },
    {
      "x": 3015,
      "y": 2653
    },
    {
      "x": 3157,
      "y": 2604
    },
    {
      "x": 3238,
      "y": 2452
    },
    {
      "x": 3376,
      "y": 2394
    },
    {
      "x": 3537,
      "y": 2365
    },
    {
      "x": 3732,
      "y": 2495
    },
    {
      "x": 3779,
      "y": 2671
    },
    {
      "x": 3886,
      "y": 2589
    },
    {
      "x": 4077,
      "y": 2561
    },
    {
      "x": 4110,
      "y": 2779
    },
    {
      "x": 4305,
      "y": 2830
    },
    {
      "x": 4352,
      "y": 3046
    },
    {
      "x": 4473,
      "y": 3004
    },
    {
      "x": 4559,
      "y": 2858
    },
    {
      "x": 4610,
      "y": 2638
    },
    {
      "x": 4826,
      "y": 2475
    },
    {
      "x": 5070,
      "y": 2466
    },
    {
      "x": 5155,
      "y": 2602
    },
    {
      "x": 5265,
      "y": 2812
    },
    {
      "x": 5376,
      "y": 2890
    },
    {
      "x": 5504,
      "y": 2871
    },
    {
      "x": 5634,
      "y": 2874
    },
    {
      "x": 5761,
      "y": 2873
    },
    {
      "x": 5888,
      "y": 2833
    },
    {
      "x": 6016,
      "y": 2827
    },
    {
      "x": 6091,
      "y": 2751
    },
    {
      "x": 6272,
      "y": 2705
    },
    {
      "x": 6400,
      "y": 2519
    },
    {
      "x": 6591,
      "y": 2358
    },
    {
      "x": 6656,
      "y": 2164
    },
    {
      "x": 6822,
      "y": 2005
    },
    {
      "x": 6942,
      "y": 1758
    },
    {
      "x": 7076,
      "y": 1610
    },
    {
      "x": 7183,
      "y": 1582
    },
    {
      "x": 7279,
      "y": 1601
    },
    {
      "x": 7459,
      "y": 1592
    },
    {
      "x": 7544,
      "y": 1461
    },
    {
      "x": 7680,
      "y": 1482
    },
    {
      "x": 7808,
      "y": 1479
    },
    {
      "x": 7934,
      "y": 1479
    },
    {
      "x": 8066,
      "y": 1481
    },
    {
      "x": 8192,
      "y": 1481
    },
    {
      "x": 8320,
      "y": 1481
    },
    {
      "x": 8448,
      "y": 1481
    },
    {
      "x": 8334,
      "y": 1150
    },
    {
      "x": 8381,
      "y": 825
    },
    {
      "x": 8600,
      "y": 595
    }
  ],
  "ceilingNodes": [
    {
      "x": 2,
      "y": 767
    },
    {
      "x": 124,
      "y": 809
    },
    {
      "x": 260,
      "y": 454
    },
    {
      "x": 370,
      "y": 402
    },
    {
      "x": 512,
      "y": 224
    },
    {
      "x": 640,
      "y": 208
    },
    {
      "x": 768,
      "y": 454
    },
    {
      "x": 892,
      "y": 414
    },
    {
      "x": 1024,
      "y": 446
    },
    {
      "x": 1219,
      "y": 379
    },
    {
      "x": 1361,
      "y": 370
    },
    {
      "x": 1408,
      "y": 440
    },
    {
      "x": 1571,
      "y": 511
    },
    {
      "x": 1664,
      "y": 434
    },
    {
      "x": 1852,
      "y": 372
    },
    {
      "x": 1920,
      "y": 433
    },
    {
      "x": 2077,
      "y": 472
    },
    {
      "x": 2260,
      "y": 518
    },
    {
      "x": 2427,
      "y": 530
    },
    {
      "x": 2552,
      "y": 526
    },
    {
      "x": 2716,
      "y": 462
    },
    {
      "x": 2816,
      "y": 445
    },
    {
      "x": 2944,
      "y": 447
    },
    {
      "x": 3072,
      "y": 447
    },
    {
      "x": 3200,
      "y": 447
    },
    {
      "x": 3321,
      "y": 501
    },
    {
      "x": 3456,
      "y": 450
    },
    {
      "x": 3633,
      "y": 402
    },
    {
      "x": 3748,
      "y": 386
    },
    {
      "x": 3889,
      "y": 381
    },
    {
      "x": 4003,
      "y": 355
    },
    {
      "x": 4114,
      "y": 411
    },
    {
      "x": 4224,
      "y": 463
    },
    {
      "x": 4352,
      "y": 464
    },
    {
      "x": 4508,
      "y": 500
    },
    {
      "x": 4661,
      "y": 528
    },
    {
      "x": 4803,
      "y": 546
    },
    {
      "x": 4937,
      "y": 552
    },
    {
      "x": 5173,
      "y": 565
    },
    {
      "x": 5414,
      "y": 516
    },
    {
      "x": 5504,
      "y": 457
    },
    {
      "x": 5688,
      "y": 411
    },
    {
      "x": 5899,
      "y": 379
    },
    {
      "x": 6090,
      "y": 319
    },
    {
      "x": 6266,
      "y": 296
    },
    {
      "x": 6446,
      "y": 387
    },
    {
      "x": 6528,
      "y": 444
    },
    {
      "x": 6705,
      "y": 504
    },
    {
      "x": 6961,
      "y": 544
    },
    {
      "x": 7220,
      "y": 535
    },
    {
      "x": 7445,
      "y": 400
    },
    {
      "x": 7552,
      "y": 449
    },
    {
      "x": 7729,
      "y": 505
    },
    {
      "x": 7857,
      "y": 509
    },
    {
      "x": 7832,
      "y": 616
    },
    {
      "x": 7962,
      "y": 646
    },
    {
      "x": 8085,
      "y": 705
    },
    {
      "x": 8196,
      "y": 720
    },
    {
      "x": 8242,
      "y": 888
    },
    {
      "x": 8382,
      "y": 825
    },
    {
      "x": 8600,
      "y": 596
    }
  ],
  "obstacles": [
    {
      "id": "obs-vesta-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 214,
          "y": 854
        },
        {
          "x": 647,
          "y": 857
        },
        {
          "x": 1114,
          "y": 854
        },
        {
          "x": 1074,
          "y": 964
        },
        {
          "x": 544,
          "y": 993
        },
        {
          "x": 268,
          "y": 955
        }
      ]
    },
    {
      "id": "obs-vesta-2",
      "name": "Geological Formation 2",
      "type": "polygon",
      "points": [
        {
          "x": 2100,
          "y": 920
        },
        {
          "x": 3158,
          "y": 901
        },
        {
          "x": 3900,
          "y": 920
        },
        {
          "x": 3860,
          "y": 1030
        },
        {
          "x": 2958,
          "y": 1179
        },
        {
          "x": 2140,
          "y": 1030
        }
      ]
    },
    {
      "id": "obs-vesta-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 4404,
          "y": 895
        },
        {
          "x": 5654,
          "y": 865
        },
        {
          "x": 6904,
          "y": 895
        },
        {
          "x": 6757,
          "y": 1083
        },
        {
          "x": 6012,
          "y": 1129
        },
        {
          "x": 4532,
          "y": 1059
        }
      ]
    },
    {
      "id": "obs-vesta-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 4092,
          "y": 2065
        },
        {
          "x": 5192,
          "y": 2025
        },
        {
          "x": 6342,
          "y": 2065
        },
        {
          "x": 6292,
          "y": 2195
        },
        {
          "x": 5192,
          "y": 2225
        },
        {
          "x": 4122,
          "y": 2195
        }
      ]
    },
    {
      "id": "obs-vesta-6",
      "name": "Geological Formation 6",
      "type": "polygon",
      "points": [
        {
          "x": 2223,
          "y": 2858
        },
        {
          "x": 2523,
          "y": 2858
        },
        {
          "x": 2503,
          "y": 2976
        },
        {
          "x": 2243,
          "y": 2976
        }
      ]
    },
    {
      "id": "obs-1787660576368",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 1120,
          "y": 1539
        },
        {
          "x": 1463,
          "y": 1467
        },
        {
          "x": 1919,
          "y": 1490
        },
        {
          "x": 1838,
          "y": 1623
        },
        {
          "x": 1459,
          "y": 1666
        },
        {
          "x": 1286,
          "y": 1857
        }
      ]
    },
    {
      "id": "obs-1787660781522",
      "name": "PILLAR Layer",
      "type": "pillar",
      "points": [
        {
          "x": 4262,
          "y": 1360
        },
        {
          "x": 4422,
          "y": 1360
        },
        {
          "x": 4452,
          "y": 2060
        },
        {
          "x": 4232,
          "y": 2060
        }
      ]
    },
    {
      "id": "obs-1787660828496",
      "name": "ISLAND Layer",
      "type": "island",
      "points": [
        {
          "x": 2070,
          "y": 1925
        },
        {
          "x": 2801,
          "y": 1836
        },
        {
          "x": 2636,
          "y": 2018
        },
        {
          "x": 1920,
          "y": 2123
        }
      ]
    },
    {
      "id": "obs-1787660849765",
      "name": "ISLAND Layer",
      "type": "island",
      "points": [
        {
          "x": 2802,
          "y": 1836
        },
        {
          "x": 3366,
          "y": 1956
        },
        {
          "x": 3228,
          "y": 2157
        },
        {
          "x": 2638,
          "y": 2016
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-luna-1",
      "x": 3005,
      "y": 580,
      "amount": 75
    },
    {
      "id": "fuel-luna-2",
      "x": 6222,
      "y": 425,
      "amount": 65
    },
    {
      "id": "fuel-luna-3",
      "x": 5329,
      "y": 1888,
      "amount": 75
    },
    {
      "id": "fuel-luna-4",
      "x": 1364,
      "y": 2664,
      "amount": 90
    },
    {
      "id": "fuel-luna-5",
      "x": 4450,
      "y": 2845,
      "amount": 80
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-39481",
      "type": "pickup",
      "label": "ORE & CARGO EXTRACTION DEPOT",
      "x": 2373,
      "y": 2848,
      "width": 280
    },
    {
      "id": "vehicle-depot-39481",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 646,
      "y": 840,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787930551864",
      "type": "pickup",
      "x": 5638,
      "y": 2865,
      "width": 140,
      "weightClass": "medium",
      "cargoType": "magnetic",
      "label": "MAGNETIC DYNAMO MATRIX"
    }
  ],
  "signposts": [
    {
      "id": "sign-launch-39481",
      "x": 676,
      "y": 1275,
      "direction": "right",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 760
    },
    {
      "id": "sign-cargo-depot-39481",
      "x": 1722,
      "y": 1770,
      "direction": "down",
      "targetType": "pickup",
      "targetName": "Cargo Vault",
      "color": "#f59e0b",
      "distanceMeters": 14
    },
    {
      "id": "sign-destination-lz-39481",
      "x": 8018,
      "y": 979,
      "direction": "down",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 15
    },
    {
      "id": "sign-1787660512656",
      "x": 679,
      "y": 1141,
      "direction": "up",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787660535200",
      "x": 952,
      "y": 1141,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787930567786",
      "x": 3855,
      "y": 2173,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    }
  ],
  "textNotes": [],
  "volcanoes": [
    {
      "id": "volcano-1787998105348",
      "x": 7369,
      "y": 1600,
      "width": 180,
      "height": 110,
      "calderaWidth": 58,
      "eruptionHeight": 220,
      "eruptionInterval": 6,
      "eruptionDuration": 1.8,
      "colorTheme": "magma"
    }
  ],
  "difficultyMode": "auto"
};

export const OFFICIAL_PHOBOS_MAP: CustomMapData = {
  "id": "official-phobos",
  "name": "Phobos Monolith",
  "description": "Ultra-low mass Martian moon with jagged monolith pillars. Inertia control and gentle RCS micro-pulses are essential to avoid drifting into the cavern roof.",
  "author": "Planetary Federation",
  "createdAt": 1787346000884,
  "updatedAt": 1787997188681,
  "themeId": "custom",
  "customTheme": {
    "id": "theme-phobos",
    "name": "Phobos Monolith Atmosphere",
    "skyTop": "#080511",
    "skyBottom": "#150d26",
    "terrainFill": "#130a21",
    "terrainBorder": "#a855f7",
    "terrainAccent": "#c084fc",
    "gridColor": "rgba(168, 85, 247, 0.06)",
    "dustColor": "#e9d5ff",
    "glowColor": "rgba(168, 85, 247, 0.3)",
    "starDensity": 1.2
  },
  "terrainLineStyle": "straight",
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 0.65,
  "airResistance": 0,
  "fuelBurnRate": 3.8,
  "targetTimeSec": 125,
  "difficulty": "Hard",
  "launchPad": {
    "x": 381,
    "y": 1417,
    "width": 320
  },
  "landingPad": {
    "x": 8197,
    "y": 1706,
    "width": 340
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 607
    },
    {
      "x": 199,
      "y": 1431
    },
    {
      "x": 352,
      "y": 1436
    },
    {
      "x": 577,
      "y": 1426
    },
    {
      "x": 568,
      "y": 702
    },
    {
      "x": 768,
      "y": 1013
    },
    {
      "x": 896,
      "y": 1649
    },
    {
      "x": 571,
      "y": 1780
    },
    {
      "x": 406,
      "y": 1778
    },
    {
      "x": 249,
      "y": 1944
    },
    {
      "x": 184,
      "y": 2196
    },
    {
      "x": 176,
      "y": 2502
    },
    {
      "x": 201,
      "y": 2716
    },
    {
      "x": 379,
      "y": 2891
    },
    {
      "x": 659,
      "y": 3020
    },
    {
      "x": 931,
      "y": 2845
    },
    {
      "x": 913,
      "y": 2720
    },
    {
      "x": 620,
      "y": 2595
    },
    {
      "x": 580,
      "y": 2410
    },
    {
      "x": 590,
      "y": 2171
    },
    {
      "x": 834,
      "y": 1984
    },
    {
      "x": 1024,
      "y": 2196
    },
    {
      "x": 1242,
      "y": 2488
    },
    {
      "x": 1471,
      "y": 2541
    },
    {
      "x": 1604,
      "y": 2654
    },
    {
      "x": 1725,
      "y": 2766
    },
    {
      "x": 1839,
      "y": 2859
    },
    {
      "x": 1943,
      "y": 2923
    },
    {
      "x": 2048,
      "y": 2952
    },
    {
      "x": 2176,
      "y": 2961
    },
    {
      "x": 2304,
      "y": 2964
    },
    {
      "x": 2432,
      "y": 2962
    },
    {
      "x": 2560,
      "y": 2957
    },
    {
      "x": 2688,
      "y": 2953
    },
    {
      "x": 2816,
      "y": 2951
    },
    {
      "x": 2944,
      "y": 2952
    },
    {
      "x": 3072,
      "y": 2956
    },
    {
      "x": 3206,
      "y": 2957
    },
    {
      "x": 3329,
      "y": 2952
    },
    {
      "x": 3458,
      "y": 2958
    },
    {
      "x": 3581,
      "y": 2954
    },
    {
      "x": 3764,
      "y": 2834
    },
    {
      "x": 3872,
      "y": 2645
    },
    {
      "x": 3961,
      "y": 2879
    },
    {
      "x": 4096,
      "y": 3025
    },
    {
      "x": 4255,
      "y": 2974
    },
    {
      "x": 4389,
      "y": 2831
    },
    {
      "x": 4502,
      "y": 3029
    },
    {
      "x": 4637,
      "y": 3036
    },
    {
      "x": 4749,
      "y": 2955
    },
    {
      "x": 4851,
      "y": 2842
    },
    {
      "x": 5035,
      "y": 2641
    },
    {
      "x": 5226,
      "y": 2492
    },
    {
      "x": 5400,
      "y": 2475
    },
    {
      "x": 5530,
      "y": 2560
    },
    {
      "x": 5718,
      "y": 2631
    },
    {
      "x": 5760,
      "y": 2804
    },
    {
      "x": 5884,
      "y": 2862
    },
    {
      "x": 6023,
      "y": 2863
    },
    {
      "x": 6144,
      "y": 2792
    },
    {
      "x": 6271,
      "y": 2644
    },
    {
      "x": 6547,
      "y": 2501
    },
    {
      "x": 6691,
      "y": 2283
    },
    {
      "x": 6782,
      "y": 2130
    },
    {
      "x": 6866,
      "y": 1940
    },
    {
      "x": 6959,
      "y": 1782
    },
    {
      "x": 7040,
      "y": 1656
    },
    {
      "x": 7163,
      "y": 1517
    },
    {
      "x": 7286,
      "y": 1400
    },
    {
      "x": 7409,
      "y": 1292
    },
    {
      "x": 7552,
      "y": 1228
    },
    {
      "x": 7720,
      "y": 1293
    },
    {
      "x": 7823,
      "y": 1400
    },
    {
      "x": 7892,
      "y": 1595
    },
    {
      "x": 8010,
      "y": 1717
    },
    {
      "x": 8239,
      "y": 1724
    },
    {
      "x": 8437,
      "y": 1725
    },
    {
      "x": 8496,
      "y": 1449
    },
    {
      "x": 8451,
      "y": 474
    },
    {
      "x": 8600,
      "y": 314
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 70
    },
    {
      "x": 256,
      "y": 70
    },
    {
      "x": 384,
      "y": 70
    },
    {
      "x": 512,
      "y": 208
    },
    {
      "x": 640,
      "y": 248
    },
    {
      "x": 776,
      "y": 383
    },
    {
      "x": 896,
      "y": 459
    },
    {
      "x": 1024,
      "y": 462
    },
    {
      "x": 1152,
      "y": 463
    },
    {
      "x": 1280,
      "y": 463
    },
    {
      "x": 1408,
      "y": 462
    },
    {
      "x": 1536,
      "y": 461
    },
    {
      "x": 1664,
      "y": 461
    },
    {
      "x": 1792,
      "y": 462
    },
    {
      "x": 1920,
      "y": 463
    },
    {
      "x": 2048,
      "y": 463
    },
    {
      "x": 2176,
      "y": 461
    },
    {
      "x": 2304,
      "y": 459
    },
    {
      "x": 2432,
      "y": 458
    },
    {
      "x": 2560,
      "y": 458
    },
    {
      "x": 2688,
      "y": 457
    },
    {
      "x": 2816,
      "y": 454
    },
    {
      "x": 2944,
      "y": 450
    },
    {
      "x": 3072,
      "y": 445
    },
    {
      "x": 3200,
      "y": 443
    },
    {
      "x": 3328,
      "y": 444
    },
    {
      "x": 3456,
      "y": 447
    },
    {
      "x": 3584,
      "y": 450
    },
    {
      "x": 3712,
      "y": 451
    },
    {
      "x": 3840,
      "y": 451
    },
    {
      "x": 3968,
      "y": 451
    },
    {
      "x": 4096,
      "y": 452
    },
    {
      "x": 4224,
      "y": 452
    },
    {
      "x": 4352,
      "y": 451
    },
    {
      "x": 4480,
      "y": 448
    },
    {
      "x": 4608,
      "y": 443
    },
    {
      "x": 4736,
      "y": 440
    },
    {
      "x": 4864,
      "y": 438
    },
    {
      "x": 4992,
      "y": 438
    },
    {
      "x": 5109,
      "y": 435
    },
    {
      "x": 5248,
      "y": 435
    },
    {
      "x": 5376,
      "y": 433
    },
    {
      "x": 5504,
      "y": 431
    },
    {
      "x": 5632,
      "y": 432
    },
    {
      "x": 5760,
      "y": 433
    },
    {
      "x": 5888,
      "y": 434
    },
    {
      "x": 6016,
      "y": 431
    },
    {
      "x": 6144,
      "y": 426
    },
    {
      "x": 6272,
      "y": 421
    },
    {
      "x": 6400,
      "y": 418
    },
    {
      "x": 6528,
      "y": 417
    },
    {
      "x": 6656,
      "y": 418
    },
    {
      "x": 6784,
      "y": 419
    },
    {
      "x": 6912,
      "y": 420
    },
    {
      "x": 7040,
      "y": 422
    },
    {
      "x": 7168,
      "y": 426
    },
    {
      "x": 7296,
      "y": 432
    },
    {
      "x": 7424,
      "y": 437
    },
    {
      "x": 7552,
      "y": 442
    },
    {
      "x": 7680,
      "y": 445
    },
    {
      "x": 7808,
      "y": 447
    },
    {
      "x": 7936,
      "y": 451
    },
    {
      "x": 8064,
      "y": 456
    },
    {
      "x": 8148,
      "y": 481
    },
    {
      "x": 8246,
      "y": 479
    },
    {
      "x": 8370,
      "y": 493
    },
    {
      "x": 8453,
      "y": 472
    },
    {
      "x": 8600,
      "y": 312
    }
  ],
  "obstacles": [
    {
      "id": "obs-phobos-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 700,
          "y": 920
        },
        {
          "x": 1150,
          "y": 900
        },
        {
          "x": 1600,
          "y": 920
        },
        {
          "x": 1560,
          "y": 1030
        },
        {
          "x": 1150,
          "y": 1018
        },
        {
          "x": 740,
          "y": 1030
        }
      ]
    },
    {
      "id": "obs-phobos-2",
      "name": "Geological Formation 2",
      "type": "polygon",
      "points": [
        {
          "x": 2099,
          "y": 890
        },
        {
          "x": 2999,
          "y": 910
        },
        {
          "x": 3899,
          "y": 890
        },
        {
          "x": 3859,
          "y": 1000
        },
        {
          "x": 2999,
          "y": 1012
        },
        {
          "x": 2139,
          "y": 1000
        }
      ]
    },
    {
      "id": "obs-phobos-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 4393,
          "y": 954
        },
        {
          "x": 5643,
          "y": 924
        },
        {
          "x": 6893,
          "y": 954
        },
        {
          "x": 6853,
          "y": 1064
        },
        {
          "x": 5643,
          "y": 1046
        },
        {
          "x": 4433,
          "y": 1064
        }
      ]
    },
    {
      "id": "obs-phobos-4",
      "name": "Geological Formation 4",
      "type": "polygon",
      "points": [
        {
          "x": 1323,
          "y": 1954
        },
        {
          "x": 2337,
          "y": 1946
        },
        {
          "x": 3837,
          "y": 1986
        },
        {
          "x": 3787,
          "y": 2116
        },
        {
          "x": 2337,
          "y": 2146
        },
        {
          "x": 1368,
          "y": 2124
        }
      ]
    },
    {
      "id": "obs-phobos-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 4450,
          "y": 1980
        },
        {
          "x": 5550,
          "y": 1940
        },
        {
          "x": 6736,
          "y": 1863
        },
        {
          "x": 6519,
          "y": 2077
        },
        {
          "x": 5550,
          "y": 2140
        },
        {
          "x": 4480,
          "y": 2110
        }
      ]
    },
    {
      "id": "obs-phobos-6",
      "name": "Geological Formation 6",
      "type": "polygon",
      "points": [
        {
          "x": 2236,
          "y": 2838
        },
        {
          "x": 2536,
          "y": 2838
        },
        {
          "x": 2516,
          "y": 2956
        },
        {
          "x": 2256,
          "y": 2956
        }
      ]
    },
    {
      "id": "obs-1787353567045",
      "name": "PILLAR Layer",
      "type": "pillar",
      "points": [
        {
          "x": 2685,
          "y": 2254
        },
        {
          "x": 2848,
          "y": 2181
        },
        {
          "x": 2875,
          "y": 2954
        },
        {
          "x": 2655,
          "y": 2954
        }
      ]
    },
    {
      "id": "obs-1787353872629",
      "name": "PILLAR Layer",
      "type": "pillar",
      "points": [
        {
          "x": 2723,
          "y": 1227
        },
        {
          "x": 2882,
          "y": 1258
        },
        {
          "x": 2912,
          "y": 1958
        },
        {
          "x": 2692,
          "y": 1958
        }
      ]
    },
    {
      "id": "obs-1787353908558",
      "name": "SPIRE Layer",
      "type": "spire",
      "points": [
        {
          "x": 6044,
          "y": 1034
        },
        {
          "x": 6213,
          "y": 1051
        },
        {
          "x": 6127,
          "y": 1678
        },
        {
          "x": 6106,
          "y": 1474
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-luna-1",
      "x": 3000,
      "y": 680,
      "amount": 75
    },
    {
      "id": "fuel-luna-2",
      "x": 6200,
      "y": 680,
      "amount": 65
    },
    {
      "id": "fuel-luna-3",
      "x": 3100,
      "y": 1480,
      "amount": 75
    },
    {
      "id": "fuel-luna-4",
      "x": 2082,
      "y": 2750,
      "amount": 90
    },
    {
      "id": "fuel-luna-5",
      "x": 6355,
      "y": 1174,
      "amount": 80
    },
    {
      "id": "fuel-1787353734774",
      "x": 722,
      "y": 2815,
      "amount": 100
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-15403",
      "type": "pickup",
      "label": "ORE & CARGO EXTRACTION DEPOT",
      "x": 2386,
      "y": 2826,
      "width": 280
    },
    {
      "id": "vehicle-depot-15403",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 3349,
      "y": 2935,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787929819522",
      "type": "pickup",
      "x": 5955,
      "y": 2848,
      "width": 140,
      "weightClass": "medium",
      "cargoType": "isotope",
      "label": "QUANTUM ISOTOPE FACILITY"
    }
  ],
  "signposts": [
    {
      "id": "sign-launch-15403",
      "x": 342,
      "y": 230,
      "direction": "down_right",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 753
    },
    {
      "id": "sign-destination-lz-15403",
      "x": 7476,
      "y": 633,
      "direction": "down_right",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 15
    },
    {
      "id": "sign-1787354318022",
      "x": 344,
      "y": 380,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787354321824",
      "x": 348,
      "y": 535,
      "direction": "down_right",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787354355907",
      "x": 1758,
      "y": 600,
      "direction": "down",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787354371711",
      "x": 4062,
      "y": 601,
      "direction": "down",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787354397701",
      "x": 4178,
      "y": 2058,
      "direction": "down_left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787354401550",
      "x": 1098,
      "y": 1591,
      "direction": "down",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787354436790",
      "x": 2026,
      "y": 601,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787354449966",
      "x": 4311,
      "y": 597,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787930021322",
      "x": 4188,
      "y": 2207,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787930033120",
      "x": 4058,
      "y": 742,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    }
  ],
  "textNotes": [
    {
      "id": "note-1787353981892",
      "x": 390,
      "y": 1505,
      "text": "Got to Landing Zone (LZ)",
      "size": "xl",
      "style": "monospace",
      "color": "#38bdf8",
      "showBorder": false
    },
    {
      "id": "note-1787997370226",
      "x": 5974,
      "y": 2962,
      "text": "Special type of cargo.\nA message will inform you\nabout it's hazerds.",
      "size": "large",
      "style": "monospace",
      "color": "#f8fafc",
      "showBorder": false,
      "align": "left"
    }
  ],
  "difficultyMode": "auto"
};

export const OFFICIAL_EUROPA_MAP: CustomMapData = {
  "id": "official-europa",
  "name": "Europa Crevasse",
  "description": "Sub-surface cryogenic ice fissure with jagged hanging icicle bridges and narrow thermal vents. Watch for slippery touch-and-go landing perches.",
  "author": "Planetary Federation",
  "createdAt": 1787695382965,
  "updatedAt": 1787997570625,
  "themeId": "custom",
  "customTheme": {
    "id": "theme-europa",
    "name": "Europa Crevasse Atmosphere",
    "skyTop": "#021019",
    "skyBottom": "#062030",
    "terrainFill": "#081d2a",
    "terrainBorder": "#38bdf8",
    "terrainAccent": "#7dd3fc",
    "gridColor": "rgba(56, 189, 248, 0.07)",
    "dustColor": "#bae6fd",
    "glowColor": "rgba(56, 189, 248, 0.3)",
    "starDensity": 1.2
  },
  "terrainLineStyle": "straight",
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 1.32,
  "airResistance": 0.0002,
  "fuelBurnRate": 4.4,
  "targetTimeSec": 450,
  "difficulty": "Hard",
  "launchPad": {
    "x": 748,
    "y": 2211,
    "width": 320
  },
  "landingPad": {
    "x": 7229,
    "y": 2899,
    "width": 340
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 578
    },
    {
      "x": 230,
      "y": 1200
    },
    {
      "x": 238,
      "y": 1861
    },
    {
      "x": 104,
      "y": 2057
    },
    {
      "x": 111,
      "y": 2407
    },
    {
      "x": 245,
      "y": 2755
    },
    {
      "x": 445,
      "y": 3045
    },
    {
      "x": 694,
      "y": 3071
    },
    {
      "x": 1102,
      "y": 3055
    },
    {
      "x": 1201,
      "y": 2649
    },
    {
      "x": 1405,
      "y": 2437
    },
    {
      "x": 1574,
      "y": 2354
    },
    {
      "x": 1706,
      "y": 2463
    },
    {
      "x": 1924,
      "y": 2619
    },
    {
      "x": 2030,
      "y": 2764
    },
    {
      "x": 2048,
      "y": 2913
    },
    {
      "x": 2176,
      "y": 2925
    },
    {
      "x": 2304,
      "y": 2932
    },
    {
      "x": 2432,
      "y": 2935
    },
    {
      "x": 2560,
      "y": 2933
    },
    {
      "x": 2690,
      "y": 2704
    },
    {
      "x": 2777,
      "y": 2502
    },
    {
      "x": 2966,
      "y": 2323
    },
    {
      "x": 3276,
      "y": 2257
    },
    {
      "x": 3587,
      "y": 2193
    },
    {
      "x": 3776,
      "y": 2323
    },
    {
      "x": 3762,
      "y": 2716
    },
    {
      "x": 3915,
      "y": 2851
    },
    {
      "x": 4223,
      "y": 2850
    },
    {
      "x": 4498,
      "y": 2845
    },
    {
      "x": 4608,
      "y": 3024
    },
    {
      "x": 4741,
      "y": 2889
    },
    {
      "x": 4864,
      "y": 2980
    },
    {
      "x": 4982,
      "y": 2856
    },
    {
      "x": 5120,
      "y": 2926
    },
    {
      "x": 5245,
      "y": 2746
    },
    {
      "x": 5376,
      "y": 2882
    },
    {
      "x": 5532,
      "y": 2939
    },
    {
      "x": 5706,
      "y": 2936
    },
    {
      "x": 5786,
      "y": 2924
    },
    {
      "x": 5888,
      "y": 2834
    },
    {
      "x": 5991,
      "y": 2634
    },
    {
      "x": 6144,
      "y": 2830
    },
    {
      "x": 6169,
      "y": 2520
    },
    {
      "x": 6380,
      "y": 2515
    },
    {
      "x": 6528,
      "y": 2315
    },
    {
      "x": 6752,
      "y": 1973
    },
    {
      "x": 6861,
      "y": 1449
    },
    {
      "x": 7165,
      "y": 1624
    },
    {
      "x": 7450,
      "y": 1575
    },
    {
      "x": 7715,
      "y": 1743
    },
    {
      "x": 7457,
      "y": 2156
    },
    {
      "x": 6964,
      "y": 2312
    },
    {
      "x": 6723,
      "y": 2569
    },
    {
      "x": 6698,
      "y": 2912
    },
    {
      "x": 7244,
      "y": 2916
    },
    {
      "x": 7647,
      "y": 2921
    },
    {
      "x": 8164,
      "y": 2724
    },
    {
      "x": 8335,
      "y": 2495
    },
    {
      "x": 8456,
      "y": 2110
    },
    {
      "x": 8365,
      "y": 1700
    },
    {
      "x": 8448,
      "y": 1442
    },
    {
      "x": 8400,
      "y": 771
    },
    {
      "x": 8600,
      "y": 667
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 131,
      "y": 606
    },
    {
      "x": 228,
      "y": 1236
    },
    {
      "x": 530,
      "y": 1177
    },
    {
      "x": 622,
      "y": 1034
    },
    {
      "x": 751,
      "y": 914
    },
    {
      "x": 775,
      "y": 721
    },
    {
      "x": 466,
      "y": 557
    },
    {
      "x": 297,
      "y": 236
    },
    {
      "x": 771,
      "y": 191
    },
    {
      "x": 1212,
      "y": 244
    },
    {
      "x": 1144,
      "y": 611
    },
    {
      "x": 1209,
      "y": 940
    },
    {
      "x": 1367,
      "y": 1246
    },
    {
      "x": 1647,
      "y": 996
    },
    {
      "x": 1747,
      "y": 712
    },
    {
      "x": 1932,
      "y": 498
    },
    {
      "x": 2162,
      "y": 329
    },
    {
      "x": 2304,
      "y": 419
    },
    {
      "x": 2519,
      "y": 378
    },
    {
      "x": 2612,
      "y": 456
    },
    {
      "x": 2706,
      "y": 367
    },
    {
      "x": 2811,
      "y": 465
    },
    {
      "x": 2894,
      "y": 553
    },
    {
      "x": 2734,
      "y": 902
    },
    {
      "x": 3006,
      "y": 1039
    },
    {
      "x": 3146,
      "y": 702
    },
    {
      "x": 3425,
      "y": 578
    },
    {
      "x": 3584,
      "y": 431
    },
    {
      "x": 3772,
      "y": 552
    },
    {
      "x": 3840,
      "y": 431
    },
    {
      "x": 3972,
      "y": 363
    },
    {
      "x": 4131,
      "y": 340
    },
    {
      "x": 4296,
      "y": 342
    },
    {
      "x": 4348,
      "y": 460
    },
    {
      "x": 4471,
      "y": 548
    },
    {
      "x": 4658,
      "y": 601
    },
    {
      "x": 4870,
      "y": 616
    },
    {
      "x": 5049,
      "y": 633
    },
    {
      "x": 5246,
      "y": 578
    },
    {
      "x": 5194,
      "y": 391
    },
    {
      "x": 5342,
      "y": 399
    },
    {
      "x": 5414,
      "y": 479
    },
    {
      "x": 5538,
      "y": 549
    },
    {
      "x": 5676,
      "y": 564
    },
    {
      "x": 5760,
      "y": 467
    },
    {
      "x": 5933,
      "y": 367
    },
    {
      "x": 6078,
      "y": 342
    },
    {
      "x": 6206,
      "y": 323
    },
    {
      "x": 6272,
      "y": 461
    },
    {
      "x": 6398,
      "y": 540
    },
    {
      "x": 6583,
      "y": 581
    },
    {
      "x": 6739,
      "y": 629
    },
    {
      "x": 6898,
      "y": 635
    },
    {
      "x": 7024,
      "y": 605
    },
    {
      "x": 7111,
      "y": 533
    },
    {
      "x": 7168,
      "y": 460
    },
    {
      "x": 7296,
      "y": 460
    },
    {
      "x": 7424,
      "y": 460
    },
    {
      "x": 7552,
      "y": 460
    },
    {
      "x": 7680,
      "y": 460
    },
    {
      "x": 7808,
      "y": 460
    },
    {
      "x": 7972,
      "y": 535
    },
    {
      "x": 8075,
      "y": 686
    },
    {
      "x": 8191,
      "y": 781
    },
    {
      "x": 8248,
      "y": 900
    },
    {
      "x": 8426,
      "y": 1057
    },
    {
      "x": 8407,
      "y": 775
    },
    {
      "x": 8600,
      "y": 660
    }
  ],
  "obstacles": [
    {
      "id": "obs-europa-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 123,
          "y": 2442
        },
        {
          "x": 504,
          "y": 2223
        },
        {
          "x": 1030,
          "y": 2217
        },
        {
          "x": 1002,
          "y": 2406
        },
        {
          "x": 594,
          "y": 2399
        },
        {
          "x": 215,
          "y": 2670
        }
      ]
    },
    {
      "id": "obs-europa-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 4407,
          "y": 928
        },
        {
          "x": 5657,
          "y": 898
        },
        {
          "x": 6907,
          "y": 928
        },
        {
          "x": 6867,
          "y": 1038
        },
        {
          "x": 5657,
          "y": 1020
        },
        {
          "x": 4447,
          "y": 1038
        }
      ]
    },
    {
      "id": "obs-europa-4",
      "name": "Geological Formation 4",
      "type": "polygon",
      "points": [
        {
          "x": 1244,
          "y": 1678
        },
        {
          "x": 1787,
          "y": 1644
        },
        {
          "x": 2814,
          "y": 1626
        },
        {
          "x": 2860,
          "y": 2041
        },
        {
          "x": 2305,
          "y": 2115
        },
        {
          "x": 1354,
          "y": 1948
        }
      ]
    },
    {
      "id": "obs-europa-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 4381,
          "y": 2001
        },
        {
          "x": 5481,
          "y": 1961
        },
        {
          "x": 6733,
          "y": 2015
        },
        {
          "x": 6467,
          "y": 2418
        },
        {
          "x": 5481,
          "y": 2161
        },
        {
          "x": 4774,
          "y": 2519
        }
      ]
    },
    {
      "id": "obs-europa-6",
      "name": "Geological Formation 6",
      "type": "polygon",
      "points": [
        {
          "x": 2213,
          "y": 2866
        },
        {
          "x": 2513,
          "y": 2866
        },
        {
          "x": 2493,
          "y": 2984
        },
        {
          "x": 2233,
          "y": 2984
        }
      ]
    },
    {
      "id": "obs-europa-7",
      "name": "Geological Formation 7",
      "type": "polygon",
      "points": [
        {
          "x": 2229,
          "y": 934
        },
        {
          "x": 2689,
          "y": 934
        },
        {
          "x": 2651,
          "y": 1012
        },
        {
          "x": 2267,
          "y": 1012
        }
      ]
    },
    {
      "id": "obs-1787696208596",
      "name": "SHELF Layer",
      "type": "strata",
      "points": [
        {
          "x": 2808,
          "y": 1625
        },
        {
          "x": 3675,
          "y": 1558
        },
        {
          "x": 3868,
          "y": 1777
        },
        {
          "x": 2857,
          "y": 2026
        }
      ]
    },
    {
      "id": "obs-1787696259875",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 3467,
          "y": 1109
        },
        {
          "x": 3867,
          "y": 1069
        },
        {
          "x": 4170,
          "y": 1097
        },
        {
          "x": 4199,
          "y": 1319
        },
        {
          "x": 3935,
          "y": 1251
        },
        {
          "x": 3507,
          "y": 1199
        }
      ]
    },
    {
      "id": "obs-1787696298856",
      "name": "SPIRE Layer",
      "type": "spire",
      "points": [
        {
          "x": 4951,
          "y": 1030
        },
        {
          "x": 5119,
          "y": 1030
        },
        {
          "x": 5054,
          "y": 1458
        },
        {
          "x": 5046,
          "y": 1520
        }
      ]
    },
    {
      "id": "obs-1787696330883",
      "name": "PILLAR Layer",
      "type": "pillar",
      "points": [
        {
          "x": 5568,
          "y": 1619
        },
        {
          "x": 5658,
          "y": 1235
        },
        {
          "x": 5719,
          "y": 1979
        },
        {
          "x": 5469,
          "y": 1959
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-luna-1",
      "x": 3601,
      "y": 580,
      "amount": 75
    },
    {
      "id": "fuel-luna-2",
      "x": 6062,
      "y": 474,
      "amount": 65
    },
    {
      "id": "fuel-luna-3",
      "x": 4781,
      "y": 1140,
      "amount": 75
    },
    {
      "id": "fuel-luna-4",
      "x": 7728,
      "y": 573,
      "amount": 90
    },
    {
      "id": "fuel-luna-5",
      "x": 5960,
      "y": 1843,
      "amount": 80
    },
    {
      "id": "fuel-1787695537112",
      "x": 861,
      "y": 440,
      "amount": 65
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-71204",
      "type": "pickup",
      "label": "ORE & CARGO EXTRACTION DEPOT",
      "x": 2363,
      "y": 2854,
      "width": 280
    },
    {
      "id": "vehicle-depot-71204",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 2459,
      "y": 922,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787696386778",
      "type": "pickup",
      "x": 5616,
      "y": 2928,
      "width": 140,
      "weightClass": "heavy",
      "label": "HEAVY DEPOT"
    },
    {
      "id": "cargo-pickup-1787930139815",
      "type": "pickup",
      "x": 701,
      "y": 3060,
      "width": 140,
      "weightClass": "medium",
      "cargoType": "cryogenic",
      "label": "CRYO SPECIMEN DOCK"
    }
  ],
  "signposts": [
    {
      "id": "sign-launch-71204",
      "x": 527,
      "y": 1852,
      "direction": "right",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 756
    },
    {
      "id": "sign-destination-lz-71204",
      "x": 7619,
      "y": 1206,
      "direction": "down_right",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 15
    },
    {
      "id": "sign-1787696078839",
      "x": 525,
      "y": 1582,
      "direction": "up_right",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787696109384",
      "x": 529,
      "y": 1709,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787696134276",
      "x": 1888,
      "y": 1272,
      "direction": "up_right",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787696142351",
      "x": 1890,
      "y": 1138,
      "direction": "right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787696180567",
      "x": 2137,
      "y": 2240,
      "direction": "up_left",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787696184911",
      "x": 2441,
      "y": 2241,
      "direction": "up_right",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787698116639",
      "x": 4074,
      "y": 2033,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787930433934",
      "x": 1240,
      "y": 2309,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787930441098",
      "x": 1244,
      "y": 2135,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    }
  ],
  "textNotes": [],
  "volcanoes": [
    {
      "id": "volcano-1787930174730",
      "x": 4061,
      "y": 2850,
      "width": 260,
      "height": 160,
      "calderaWidth": 83,
      "eruptionHeight": 320,
      "eruptionInterval": 6,
      "eruptionDuration": 1.8,
      "colorTheme": "cryo"
    }
  ],
  "difficultyMode": "manual"
};

export const OFFICIAL_CERES_MAP: CustomMapData = {
  "id": "official-ceres",
  "name": "Ceres Hollow",
  "description": "Subterranean microgravity asteroid labyrinth. Inertia is your biggest challenge while maneuvering tethered isotope canisters through narrow rock shafts.",
  "author": "Planetary Federation",
  "createdAt": 1787768763682,
  "updatedAt": 1787997171327,
  "themeId": "custom",
  "customTheme": {
    "id": "theme-ceres",
    "name": "Ceres Hollow Atmosphere",
    "skyTop": "#0a0518",
    "skyBottom": "#170c32",
    "terrainFill": "#160d2e",
    "terrainBorder": "#c084fc",
    "terrainAccent": "#e879f9",
    "gridColor": "rgba(192, 132, 252, 0.06)",
    "dustColor": "#e9d5ff",
    "glowColor": "rgba(192, 132, 252, 0.3)",
    "starDensity": 1.2
  },
  "terrainLineStyle": "straight",
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 0.78,
  "airResistance": 0,
  "fuelBurnRate": 4,
  "targetTimeSec": 335,
  "difficulty": "Medium",
  "launchPad": {
    "x": 7995,
    "y": 2705,
    "width": 320
  },
  "landingPad": {
    "x": 438,
    "y": 1256,
    "width": 340
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 585
    },
    {
      "x": 165,
      "y": 715
    },
    {
      "x": 175,
      "y": 922
    },
    {
      "x": 186,
      "y": 1061
    },
    {
      "x": 89,
      "y": 1137
    },
    {
      "x": 124,
      "y": 1209
    },
    {
      "x": 100,
      "y": 1242
    },
    {
      "x": 90,
      "y": 1268
    },
    {
      "x": 157,
      "y": 1247
    },
    {
      "x": 200,
      "y": 1268
    },
    {
      "x": 377,
      "y": 1268
    },
    {
      "x": 697,
      "y": 1267
    },
    {
      "x": 724,
      "y": 1114
    },
    {
      "x": 680,
      "y": 978
    },
    {
      "x": 464,
      "y": 905
    },
    {
      "x": 463,
      "y": 729
    },
    {
      "x": 493,
      "y": 601
    },
    {
      "x": 640,
      "y": 599
    },
    {
      "x": 768,
      "y": 873
    },
    {
      "x": 896,
      "y": 1321
    },
    {
      "x": 1024,
      "y": 1741
    },
    {
      "x": 1152,
      "y": 2115
    },
    {
      "x": 683,
      "y": 2173
    },
    {
      "x": 538,
      "y": 2274
    },
    {
      "x": 380,
      "y": 2410
    },
    {
      "x": 315,
      "y": 2662
    },
    {
      "x": 400,
      "y": 2874
    },
    {
      "x": 546,
      "y": 3033
    },
    {
      "x": 832,
      "y": 3043
    },
    {
      "x": 1145,
      "y": 3039
    },
    {
      "x": 1231,
      "y": 2868
    },
    {
      "x": 1185,
      "y": 2713
    },
    {
      "x": 1196,
      "y": 2461
    },
    {
      "x": 1408,
      "y": 2678
    },
    {
      "x": 1536,
      "y": 2847
    },
    {
      "x": 1664,
      "y": 2932
    },
    {
      "x": 1792,
      "y": 2904
    },
    {
      "x": 1920,
      "y": 2893
    },
    {
      "x": 2048,
      "y": 2885
    },
    {
      "x": 2176,
      "y": 2881
    },
    {
      "x": 2304,
      "y": 2882
    },
    {
      "x": 2432,
      "y": 2888
    },
    {
      "x": 2560,
      "y": 2895
    },
    {
      "x": 2688,
      "y": 2903
    },
    {
      "x": 2816,
      "y": 2911
    },
    {
      "x": 2944,
      "y": 2921
    },
    {
      "x": 3072,
      "y": 2934
    },
    {
      "x": 3200,
      "y": 2947
    },
    {
      "x": 3328,
      "y": 2958
    },
    {
      "x": 3456,
      "y": 2964
    },
    {
      "x": 3584,
      "y": 2965
    },
    {
      "x": 3712,
      "y": 2962
    },
    {
      "x": 3840,
      "y": 2956
    },
    {
      "x": 3968,
      "y": 2946
    },
    {
      "x": 4091,
      "y": 2915
    },
    {
      "x": 4224,
      "y": 2917
    },
    {
      "x": 4386,
      "y": 2918
    },
    {
      "x": 4480,
      "y": 2883
    },
    {
      "x": 4608,
      "y": 2870
    },
    {
      "x": 4736,
      "y": 2861
    },
    {
      "x": 4864,
      "y": 2856
    },
    {
      "x": 4992,
      "y": 2853
    },
    {
      "x": 5120,
      "y": 2852
    },
    {
      "x": 5248,
      "y": 2855
    },
    {
      "x": 5376,
      "y": 2862
    },
    {
      "x": 5504,
      "y": 2873
    },
    {
      "x": 5632,
      "y": 2885
    },
    {
      "x": 5760,
      "y": 2897
    },
    {
      "x": 5888,
      "y": 2906
    },
    {
      "x": 6016,
      "y": 2912
    },
    {
      "x": 6082,
      "y": 2991
    },
    {
      "x": 6218,
      "y": 2981
    },
    {
      "x": 6397,
      "y": 2959
    },
    {
      "x": 6699,
      "y": 2829
    },
    {
      "x": 6865,
      "y": 2849
    },
    {
      "x": 7127,
      "y": 2702
    },
    {
      "x": 7270,
      "y": 2726
    },
    {
      "x": 7536,
      "y": 2728
    },
    {
      "x": 7569,
      "y": 2525
    },
    {
      "x": 7625,
      "y": 2585
    },
    {
      "x": 7701,
      "y": 2682
    },
    {
      "x": 7826,
      "y": 2720
    },
    {
      "x": 7998,
      "y": 2724
    },
    {
      "x": 8173,
      "y": 2722
    },
    {
      "x": 8344,
      "y": 2613
    },
    {
      "x": 8408,
      "y": 2392
    },
    {
      "x": 8169,
      "y": 2140
    },
    {
      "x": 7964,
      "y": 2060
    },
    {
      "x": 7722,
      "y": 2068
    },
    {
      "x": 7837,
      "y": 1868
    },
    {
      "x": 7995,
      "y": 1678
    },
    {
      "x": 8101,
      "y": 1665
    },
    {
      "x": 8211,
      "y": 1733
    },
    {
      "x": 8186,
      "y": 1420
    },
    {
      "x": 8334,
      "y": 999
    },
    {
      "x": 8261,
      "y": 836
    },
    {
      "x": 8320,
      "y": 761
    },
    {
      "x": 8325,
      "y": 555
    },
    {
      "x": 8532,
      "y": 372
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 87,
      "y": 424
    },
    {
      "x": 130,
      "y": 581
    },
    {
      "x": 197,
      "y": 447
    },
    {
      "x": 296,
      "y": 332
    },
    {
      "x": 417,
      "y": 288
    },
    {
      "x": 532,
      "y": 291
    },
    {
      "x": 664,
      "y": 312
    },
    {
      "x": 849,
      "y": 348
    },
    {
      "x": 978,
      "y": 484
    },
    {
      "x": 1054,
      "y": 621
    },
    {
      "x": 1089,
      "y": 718
    },
    {
      "x": 1139,
      "y": 873
    },
    {
      "x": 1243,
      "y": 882
    },
    {
      "x": 1373,
      "y": 795
    },
    {
      "x": 1495,
      "y": 639
    },
    {
      "x": 1626,
      "y": 548
    },
    {
      "x": 1789,
      "y": 447
    },
    {
      "x": 2036,
      "y": 377
    },
    {
      "x": 2278,
      "y": 399
    },
    {
      "x": 2536,
      "y": 473
    },
    {
      "x": 2678,
      "y": 551
    },
    {
      "x": 2847,
      "y": 641
    },
    {
      "x": 2995,
      "y": 523
    },
    {
      "x": 3072,
      "y": 392
    },
    {
      "x": 3214,
      "y": 336
    },
    {
      "x": 3328,
      "y": 382
    },
    {
      "x": 3446,
      "y": 466
    },
    {
      "x": 3584,
      "y": 381
    },
    {
      "x": 3725,
      "y": 495
    },
    {
      "x": 3826,
      "y": 540
    },
    {
      "x": 4016,
      "y": 567
    },
    {
      "x": 4240,
      "y": 612
    },
    {
      "x": 4546,
      "y": 662
    },
    {
      "x": 4801,
      "y": 705
    },
    {
      "x": 4947,
      "y": 850
    },
    {
      "x": 5127,
      "y": 861
    },
    {
      "x": 5316,
      "y": 996
    },
    {
      "x": 5613,
      "y": 1120
    },
    {
      "x": 5928,
      "y": 1059
    },
    {
      "x": 5913,
      "y": 966
    },
    {
      "x": 5814,
      "y": 852
    },
    {
      "x": 5606,
      "y": 851
    },
    {
      "x": 5490,
      "y": 812
    },
    {
      "x": 5460,
      "y": 673
    },
    {
      "x": 5293,
      "y": 672
    },
    {
      "x": 5137,
      "y": 675
    },
    {
      "x": 5073,
      "y": 599
    },
    {
      "x": 5108,
      "y": 457
    },
    {
      "x": 5202,
      "y": 325
    },
    {
      "x": 5393,
      "y": 288
    },
    {
      "x": 5582,
      "y": 400
    },
    {
      "x": 5737,
      "y": 507
    },
    {
      "x": 5982,
      "y": 543
    },
    {
      "x": 6222,
      "y": 443
    },
    {
      "x": 6436,
      "y": 526
    },
    {
      "x": 6718,
      "y": 420
    },
    {
      "x": 6905,
      "y": 353
    },
    {
      "x": 7129,
      "y": 473
    },
    {
      "x": 7497,
      "y": 495
    },
    {
      "x": 7704,
      "y": 475
    },
    {
      "x": 7808,
      "y": 368
    },
    {
      "x": 7956,
      "y": 443
    },
    {
      "x": 8064,
      "y": 364
    },
    {
      "x": 8164,
      "y": 479
    },
    {
      "x": 8353,
      "y": 403
    },
    {
      "x": 8528,
      "y": 371
    },
    {
      "x": 8576,
      "y": 70
    },
    {
      "x": 8600,
      "y": 70
    }
  ],
  "obstacles": [
    {
      "id": "obs-ceres-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 2447,
          "y": 783
        },
        {
          "x": 2313,
          "y": 896
        },
        {
          "x": 2047,
          "y": 931
        },
        {
          "x": 1783,
          "y": 857
        },
        {
          "x": 1834,
          "y": 752
        },
        {
          "x": 1982,
          "y": 708
        },
        {
          "x": 2376,
          "y": 735
        }
      ]
    },
    {
      "id": "obs-ceres-2",
      "name": "Geological Formation 2",
      "type": "polygon",
      "points": [
        {
          "x": 4904,
          "y": 1166
        },
        {
          "x": 4871,
          "y": 1242
        },
        {
          "x": 4457,
          "y": 1284
        },
        {
          "x": 4134,
          "y": 1225
        },
        {
          "x": 3959,
          "y": 1141
        },
        {
          "x": 4126,
          "y": 1045
        },
        {
          "x": 4480,
          "y": 1014
        },
        {
          "x": 4794,
          "y": 1053
        }
      ]
    },
    {
      "id": "obs-ceres-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 7182,
          "y": 1588
        },
        {
          "x": 7026,
          "y": 1738
        },
        {
          "x": 6601,
          "y": 1691
        },
        {
          "x": 6458,
          "y": 1595
        },
        {
          "x": 6682,
          "y": 1455
        },
        {
          "x": 6938,
          "y": 1456
        }
      ]
    },
    {
      "id": "obs-ceres-4",
      "name": "Geological Formation 4",
      "type": "polygon",
      "points": [
        {
          "x": 4479,
          "y": 2114
        },
        {
          "x": 4937,
          "y": 1963
        },
        {
          "x": 5930,
          "y": 2154
        },
        {
          "x": 6068,
          "y": 2346
        },
        {
          "x": 5000,
          "y": 2310
        },
        {
          "x": 4593,
          "y": 2316
        }
      ]
    },
    {
      "id": "obs-ceres-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 5167,
          "y": 2751
        },
        {
          "x": 5487,
          "y": 2751
        },
        {
          "x": 5457,
          "y": 2869
        },
        {
          "x": 5194,
          "y": 2852
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-ceres-1",
      "x": 3187,
      "y": 409,
      "amount": 75
    },
    {
      "id": "fuel-ceres-2",
      "x": 4400,
      "y": 880,
      "amount": 80
    },
    {
      "id": "fuel-ceres-3",
      "x": 2649,
      "y": 1726,
      "amount": 85
    },
    {
      "id": "fuel-ceres-4",
      "x": 8185,
      "y": 1034,
      "amount": 80
    },
    {
      "id": "fuel-1787769222155",
      "x": 6910,
      "y": 514,
      "amount": 100
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-19302",
      "type": "pickup",
      "label": "ORE & CARGO EXTRACTION DEPOT",
      "x": 5330,
      "y": 2738,
      "width": 280
    },
    {
      "id": "vehicle-depot-19302",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 856,
      "y": 3026,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787769208423",
      "type": "pickup",
      "x": 5296,
      "y": 661,
      "width": 140,
      "weightClass": "heavy",
      "label": "HEAVY DEPOT"
    },
    {
      "id": "cargo-pickup-1787931193030",
      "type": "pickup",
      "x": 2126,
      "y": 712,
      "width": 140,
      "weightClass": "heavy",
      "cargoType": "isotope",
      "label": "QUANTUM ISOTOPE FACILITY"
    }
  ],
  "signposts": [
    {
      "id": "sign-launch-19302",
      "x": 1200,
      "y": 1066,
      "direction": "up_left",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 753
    },
    {
      "id": "sign-destination-lz-19302",
      "x": 7487,
      "y": 2039,
      "direction": "left",
      "targetType": "landing",
      "targetName": "LZ",
      "color": "#22c55e",
      "distanceMeters": 15
    },
    {
      "id": "sign-1787769530954",
      "x": 7486,
      "y": 1875,
      "direction": "up_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787769536038",
      "x": 7484,
      "y": 1731,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787769564204",
      "x": 7490,
      "y": 2188,
      "direction": "left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787769582895",
      "x": 6201,
      "y": 1139,
      "direction": "up_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787769604652",
      "x": 6249,
      "y": 2294,
      "direction": "down_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787769609902",
      "x": 4085,
      "y": 2303,
      "direction": "down_right",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    },
    {
      "id": "sign-1787769635554",
      "x": 4087,
      "y": 2149,
      "direction": "left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787769645756",
      "x": 4093,
      "y": 2000,
      "direction": "up_left",
      "targetType": "landing",
      "targetName": "BASE LZ",
      "subText": "PRIMARY OUTPOST",
      "color": "#22c55e"
    },
    {
      "id": "sign-1787769690461",
      "x": 1194,
      "y": 1220,
      "direction": "down",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787769708528",
      "x": 1438,
      "y": 2124,
      "direction": "down_left",
      "targetType": "vehicle_depot",
      "targetName": "ROVER DEPOT",
      "subText": "VEHICLE BAY",
      "color": "#38bdf8"
    },
    {
      "id": "sign-1787931222588",
      "x": 2985,
      "y": 759,
      "direction": "up_left",
      "targetType": "pickup",
      "targetName": "CARGO VAULT",
      "subText": "SUPPLY POD DEPOT",
      "color": "#f59e0b"
    }
  ],
  "textNotes": [],
  "difficultyMode": "manual",
  "volcanoes": [
    {
      "id": "volcano-1787998841982",
      "x": 7397,
      "y": 2724,
      "width": 260,
      "height": 160,
      "calderaWidth": 83,
      "eruptionHeight": 320,
      "eruptionInterval": 20,
      "eruptionDuration": 1.8,
      "colorTheme": "plasma"
    },
    {
      "id": "volcano-1787998889695",
      "x": 4249,
      "y": 2917,
      "width": 260,
      "height": 160,
      "calderaWidth": 83,
      "eruptionHeight": 320,
      "eruptionInterval": 10,
      "eruptionDuration": 1.8,
      "colorTheme": "plasma"
    }
  ]
};

export const OFFICIAL_GLACIES_MAP: CustomMapData = {
  id: 'official-glacies',
  name: 'Glacies Chasm',
  description: 'Subterranean glacial crevasses and icicle gates. Ferry cryogenic superconductors through ice arches and vertical draft chimneys.',
  author: 'Planetary Federation',
  createdAt: 1787770393513,
  updatedAt: 1787933200000,
  themeId: 'custom',
  customTheme: {
    id: 'theme-glacies',
    name: 'Glacies Chasm Atmosphere',
    skyTop: '#030d17',
    skyBottom: '#071b2d',
    terrainFill: '#0a1d30',
    terrainBorder: '#67e8f9',
    terrainAccent: '#a5f3fc',
    gridColor: 'rgba(103, 232, 249, 0.07)',
    dustColor: '#cffafe',
    glowColor: 'rgba(103, 232, 249, 0.3)',
    starDensity: 1.2,
  },
  terrainLineStyle: 'straight',
  worldWidth: 8600,
  worldHeight: 3200,
  gravity: 2.1,
  airResistance: 0.0003,
  fuelBurnRate: 4.8,
  targetTimeSec: 195,
  difficulty: 'Hard',
  launchPad: {
    x: 634,
    y: 1661,
    width: 320,
  },
  landingPad: {
    x: 8009,
    y: 2295,
    width: 340,
  },
  groundNodes: [
    { x: 0, y: 70 },
    { x: 128, y: 604 },
    { x: 256, y: 609 },
    { x: 388, y: 503 },
    { x: 574, y: 477 },
    { x: 640, y: 606 },
    { x: 768, y: 928 },
    { x: 787, y: 1110 },
    { x: 707, y: 1214 },
    { x: 630, y: 1180 },
    { x: 566, y: 1156 },
    { x: 471, y: 1117 },
    { x: 300, y: 1144 },
    { x: 236, y: 1254 },
    { x: 162, y: 1399 },
    { x: 232, y: 1533 },
    { x: 338, y: 1634 },
    { x: 457, y: 1672 },
    { x: 613, y: 1670 },
    { x: 830, y: 1671 },
    { x: 1024, y: 1897 },
    { x: 1152, y: 2288 },
    { x: 1280, y: 2586 },
    { x: 1410, y: 2635 },
    { x: 1647, y: 2640 },
    { x: 1857, y: 2633 },
    { x: 1911, y: 2650 },
    { x: 2037, y: 2626 },
    { x: 2141, y: 2616 },
    { x: 2275, y: 2638 },
    { x: 2379, y: 2663 },
    { x: 2477, y: 2708 },
    { x: 2590, y: 2748 },
    { x: 2699, y: 2791 },
    { x: 2777, y: 2820 },
    { x: 2944, y: 2822 },
    { x: 3072, y: 2827 },
    { x: 3228, y: 2724 },
    { x: 3405, y: 2640 },
    { x: 3547, y: 2465 },
    { x: 3549, y: 2741 },
    { x: 3629, y: 2862 },
    { x: 3746, y: 2945 },
    { x: 3957, y: 2946 },
    { x: 4069, y: 2828 },
    { x: 4112, y: 2678 },
    { x: 4282, y: 2510 },
    { x: 4480, y: 2350 },
    { x: 4650, y: 2566 },
    { x: 4736, y: 2781 },
    { x: 4864, y: 2877 },
    { x: 4999, y: 2728 },
    { x: 5120, y: 2856 },
    { x: 5290, y: 2913 },
    { x: 5445, y: 2971 },
    { x: 5601, y: 2989 },
    { x: 5674, y: 2870 },
    { x: 5760, y: 2808 },
    { x: 5888, y: 2802 },
    { x: 6071, y: 2685 },
    { x: 6179, y: 2598 },
    { x: 6349, y: 2451 },
    { x: 6525, y: 2358 },
    { x: 6660, y: 2234 },
    { x: 6740, y: 2146 },
    { x: 6784, y: 2337 },
    { x: 6899, y: 2382 },
    { x: 7040, y: 2294 },
    { x: 7168, y: 2297 },
    { x: 7296, y: 2301 },
    { x: 7424, y: 2303 },
    { x: 7552, y: 2304 },
    { x: 7680, y: 2303 },
    { x: 7808, y: 2304 },
    { x: 7936, y: 2295 },
    { x: 8064, y: 2295 },
    { x: 8192, y: 2312 },
    { x: 8320, y: 2313 },
    { x: 8448, y: 2314 },
    { x: 8212, y: 1426 },
    { x: 8600, y: 1258 },
  ],
  ceilingNodes: [
    { x: 0, y: 70 },
    { x: 128, y: 602 },
    { x: 251, y: 604 },
    { x: 384, y: 507 },
    { x: 571, y: 478 },
    { x: 640, y: 246 },
    { x: 768, y: 396 },
    { x: 896, y: 398 },
    { x: 1024, y: 470 },
    { x: 1152, y: 403 },
    { x: 1280, y: 403 },
    { x: 1408, y: 402 },
    { x: 1536, y: 401 },
    { x: 1664, y: 402 },
    { x: 1792, y: 513 },
    { x: 1920, y: 406 },
    { x: 2048, y: 407 },
    { x: 2176, y: 405 },
    { x: 2304, y: 402 },
    { x: 2432, y: 399 },
    { x: 2560, y: 533 },
    { x: 2688, y: 396 },
    { x: 2816, y: 400 },
    { x: 2944, y: 390 },
    { x: 3072, y: 385 },
    { x: 3200, y: 382 },
    { x: 3328, y: 523 },
    { x: 3456, y: 382 },
    { x: 3584, y: 410 },
    { x: 3712, y: 384 },
    { x: 3840, y: 385 },
    { x: 3968, y: 386 },
    { x: 4096, y: 517 },
    { x: 4224, y: 390 },
    { x: 4352, y: 418 },
    { x: 4480, y: 387 },
    { x: 4608, y: 383 },
    { x: 4736, y: 380 },
    { x: 4864, y: 474 },
    { x: 4992, y: 379 },
    { x: 5120, y: 394 },
    { x: 5248, y: 379 },
    { x: 5376, y: 377 },
    { x: 5504, y: 375 },
    { x: 5632, y: 421 },
    { x: 5760, y: 379 },
    { x: 5888, y: 375 },
    { x: 6016, y: 373 },
    { x: 6144, y: 369 },
    { x: 6272, y: 364 },
    { x: 6400, y: 360 },
    { x: 6528, y: 410 },
    { x: 6656, y: 356 },
    { x: 6784, y: 355 },
    { x: 6912, y: 354 },
    { x: 7040, y: 353 },
    { x: 7105, y: 411 },
    { x: 7126, y: 497 },
    { x: 7058, y: 594 },
    { x: 6912, y: 661 },
    { x: 6864, y: 739 },
    { x: 6907, y: 831 },
    { x: 6979, y: 910 },
    { x: 7205, y: 879 },
    { x: 7315, y: 947 },
    { x: 7570, y: 1093 },
    { x: 7969, y: 1251 },
    { x: 8199, y: 1433 },
    { x: 8600, y: 1273 },
  ],
  obstacles: [
    {
      id: 'obs-glacies-1',
      name: 'Geological Formation 1',
      type: 'polygon',
      points: [
        { x: 1132, y: 911 },
        { x: 2150, y: 870 },
        { x: 2788, y: 885 },
        { x: 2838, y: 1129 },
        { x: 2150, y: 1000 },
        { x: 1205, y: 1079 },
      ],
    },
    {
      id: 'obs-glacies-2',
      name: 'Geological Formation 2',
      type: 'polygon',
      points: [
        { x: 3444, y: 1839 },
        { x: 5092, y: 1831 },
        { x: 6036, y: 1686 },
        { x: 6285, y: 2087 },
        { x: 4254, y: 2032 },
        { x: 3369, y: 2136 },
      ],
    },
    {
      id: 'obs-glacies-3',
      name: 'Geological Formation 3',
      type: 'polygon',
      points: [
        { x: 1924, y: 2309 },
        { x: 2224, y: 2309 },
        { x: 2204, y: 2427 },
        { x: 1944, y: 2427 },
      ],
    },
    {
      id: 'obs-glacies-4',
      name: 'Geological Formation 4',
      type: 'polygon',
      points: [
        { x: 7111, y: 1609 },
        { x: 7147, y: 1397 },
        { x: 7211, y: 1940 },
        { x: 7300, y: 2301 },
        { x: 7057, y: 2297 },
        { x: 7072, y: 1847 },
      ],
    },
    {
      id: 'obs-glacies-5',
      name: 'Geological Formation 5',
      type: 'polygon',
      points: [
        { x: 2807, y: 1970 },
        { x: 2857, y: 1970 },
        { x: 2872, y: 2395 },
        { x: 2882, y: 2820 },
        { x: 2782, y: 2820 },
        { x: 2792, y: 2395 },
      ],
    },
    {
      id: 'obs-glacies-6',
      name: 'Geological Formation 6',
      type: 'polygon',
      points: [
        { x: 3570, y: 1262 },
        { x: 4030, y: 1262 },
        { x: 4072, y: 1405 },
        { x: 3449, y: 1354 },
      ],
    },
  ],
  fuelPickups: [
    { id: 'fuel-glacies-1', x: 2300, y: 640, amount: 80 },
    { id: 'fuel-glacies-2', x: 6692, y: 587, amount: 80 },
    { id: 'fuel-glacies-3', x: 3185, y: 2262, amount: 90 },
    { id: 'fuel-glacies-4', x: 5800, y: 2400, amount: 90 },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-33719',
      type: 'pickup',
      label: 'ORE & CARGO EXTRACTION DEPOT',
      x: 2076,
      y: 2298,
      width: 280,
    },
    {
      id: 'vehicle-depot-33719',
      type: 'vehicle_depot',
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      x: 3796,
      y: 1247,
      width: 480,
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1787932805384',
      type: 'pickup',
      x: 3870,
      y: 2936,
      width: 140,
      weightClass: 'medium',
      cargoType: 'cryogenic',
      label: 'CRYO SPECIMEN DOCK',
    },
  ],
  signposts: [
    {
      id: 'sign-launch-33719',
      x: 895,
      y: 1239,
      direction: 'right',
      targetType: 'landing',
      targetName: 'LZ',
      color: '#22c55e',
      distanceMeters: 770,
    },
    {
      id: 'sign-cargo-depot-33719',
      x: 902,
      y: 1380,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'Cargo Vault',
      color: '#f59e0b',
      distanceMeters: 14,
    },
    {
      id: 'sign-destination-lz-33719',
      x: 7859,
      y: 2260,
      direction: 'right',
      targetType: 'landing',
      targetName: 'LZ',
      color: '#22c55e',
      distanceMeters: 15,
    },
    {
      id: 'sign-1787770562091',
      x: 1171,
      y: 1241,
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787770743206',
      x: 3752,
      y: 722,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787770749892',
      x: 3754,
      y: 870,
      direction: 'down_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787770768136',
      x: 2045,
      y: 1898,
      direction: 'up_right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787770773056',
      x: 2049,
      y: 1752,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
  ],
  textNotes: [],
  difficultyMode: 'auto',
  volcanoes: [
    {
      id: 'volcano-1787932832295',
      x: 1669,
      y: 2638,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 4.5,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
  ],
};

export const OFFICIAL_VESPERA_MAP: CustomMapData = {
  "id": "official-vespera",
  "name": "Vespera Heavy",
  "description": "Crushing gravity. Transport a 650kg Heavy Fusion Reactor Core between deep basalt chambers without structural cable failure.",
  "author": "Planetary Federation",
  "createdAt": 1787777132203,
  "updatedAt": 1787997160211,
  "themeId": "custom",
  "customTheme": {
    "id": "theme-vespera",
    "name": "Vespera Heavy Atmosphere",
    "skyTop": "#140c03",
    "skyBottom": "#281704",
    "terrainFill": "#211303",
    "terrainBorder": "#f59e0b",
    "terrainAccent": "#ef4444",
    "gridColor": "rgba(245, 158, 11, 0.08)",
    "dustColor": "#fde68a",
    "glowColor": "rgba(245, 158, 11, 0.35)",
    "starDensity": 1.2
  },
  "terrainLineStyle": "straight",
  "worldWidth": 8600,
  "worldHeight": 3200,
  "gravity": 7.2,
  "airResistance": 0.0015,
  "fuelBurnRate": 6.8,
  "targetTimeSec": 400,
  "difficulty": "Extreme",
  "launchPad": {
    "x": 438,
    "y": 1128,
    "width": 320
  },
  "landingPad": {
    "x": 6347,
    "y": 1842,
    "width": 340
  },
  "groundNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 128,
      "y": 501
    },
    {
      "x": 229,
      "y": 738
    },
    {
      "x": 181,
      "y": 962
    },
    {
      "x": 166,
      "y": 1140
    },
    {
      "x": 438,
      "y": 1144
    },
    {
      "x": 613,
      "y": 1144
    },
    {
      "x": 896,
      "y": 1247
    },
    {
      "x": 1024,
      "y": 1674
    },
    {
      "x": 1152,
      "y": 2056
    },
    {
      "x": 1374,
      "y": 2315
    },
    {
      "x": 1445,
      "y": 2515
    },
    {
      "x": 1542,
      "y": 2486
    },
    {
      "x": 1587,
      "y": 2618
    },
    {
      "x": 1661,
      "y": 2580
    },
    {
      "x": 1790,
      "y": 2541
    },
    {
      "x": 1911,
      "y": 2600
    },
    {
      "x": 2124,
      "y": 2674
    },
    {
      "x": 2472,
      "y": 2668
    },
    {
      "x": 2490,
      "y": 2740
    },
    {
      "x": 2577,
      "y": 2774
    },
    {
      "x": 2665,
      "y": 2817
    },
    {
      "x": 2802,
      "y": 2712
    },
    {
      "x": 2979,
      "y": 2609
    },
    {
      "x": 3141,
      "y": 2562
    },
    {
      "x": 3368,
      "y": 2416
    },
    {
      "x": 3435,
      "y": 2549
    },
    {
      "x": 3797,
      "y": 2551
    },
    {
      "x": 3983,
      "y": 2603
    },
    {
      "x": 4144,
      "y": 2574
    },
    {
      "x": 4317,
      "y": 2750
    },
    {
      "x": 4452,
      "y": 2726
    },
    {
      "x": 4561,
      "y": 2553
    },
    {
      "x": 4769,
      "y": 2576
    },
    {
      "x": 4811,
      "y": 2442
    },
    {
      "x": 4973,
      "y": 2375
    },
    {
      "x": 5189,
      "y": 2372
    },
    {
      "x": 5456,
      "y": 2386
    },
    {
      "x": 5711,
      "y": 2340
    },
    {
      "x": 5920,
      "y": 2297
    },
    {
      "x": 6090,
      "y": 2416
    },
    {
      "x": 6248,
      "y": 2482
    },
    {
      "x": 6425,
      "y": 2481
    },
    {
      "x": 6504,
      "y": 2466
    },
    {
      "x": 6800,
      "y": 2319
    },
    {
      "x": 6940,
      "y": 2087
    },
    {
      "x": 7012,
      "y": 1864
    },
    {
      "x": 7008,
      "y": 1703
    },
    {
      "x": 6933,
      "y": 1541
    },
    {
      "x": 7173,
      "y": 1283
    },
    {
      "x": 7370,
      "y": 1101
    },
    {
      "x": 7554,
      "y": 1097
    },
    {
      "x": 7689,
      "y": 1261
    },
    {
      "x": 7513,
      "y": 1519
    },
    {
      "x": 7240,
      "y": 1682
    },
    {
      "x": 7382,
      "y": 2112
    },
    {
      "x": 7351,
      "y": 2458
    },
    {
      "x": 7425,
      "y": 2777
    },
    {
      "x": 7712,
      "y": 2945
    },
    {
      "x": 7990,
      "y": 2948
    },
    {
      "x": 8237,
      "y": 2949
    },
    {
      "x": 8309,
      "y": 2514
    },
    {
      "x": 8302,
      "y": 2230
    },
    {
      "x": 8230,
      "y": 2183
    },
    {
      "x": 8001,
      "y": 2233
    },
    {
      "x": 7866,
      "y": 2074
    },
    {
      "x": 7832,
      "y": 1887
    },
    {
      "x": 8000,
      "y": 1683
    },
    {
      "x": 8216,
      "y": 1682
    },
    {
      "x": 8254,
      "y": 1488
    },
    {
      "x": 8216,
      "y": 1369
    },
    {
      "x": 8190,
      "y": 1244
    },
    {
      "x": 8309,
      "y": 1086
    },
    {
      "x": 8501,
      "y": 581
    },
    {
      "x": 8600,
      "y": 471
    }
  ],
  "ceilingNodes": [
    {
      "x": 0,
      "y": 70
    },
    {
      "x": 153,
      "y": 538
    },
    {
      "x": 336,
      "y": 509
    },
    {
      "x": 519,
      "y": 503
    },
    {
      "x": 645,
      "y": 636
    },
    {
      "x": 797,
      "y": 680
    },
    {
      "x": 898,
      "y": 635
    },
    {
      "x": 978,
      "y": 625
    },
    {
      "x": 1054,
      "y": 518
    },
    {
      "x": 1152,
      "y": 414
    },
    {
      "x": 1332,
      "y": 476
    },
    {
      "x": 1484,
      "y": 561
    },
    {
      "x": 1601,
      "y": 565
    },
    {
      "x": 1726,
      "y": 574
    },
    {
      "x": 1846,
      "y": 636
    },
    {
      "x": 1998,
      "y": 705
    },
    {
      "x": 2197,
      "y": 709
    },
    {
      "x": 2305,
      "y": 641
    },
    {
      "x": 2358,
      "y": 527
    },
    {
      "x": 2432,
      "y": 385
    },
    {
      "x": 2598,
      "y": 480
    },
    {
      "x": 2762,
      "y": 502
    },
    {
      "x": 2874,
      "y": 565
    },
    {
      "x": 3040,
      "y": 679
    },
    {
      "x": 3220,
      "y": 639
    },
    {
      "x": 3372,
      "y": 673
    },
    {
      "x": 3441,
      "y": 574
    },
    {
      "x": 3545,
      "y": 511
    },
    {
      "x": 3584,
      "y": 397
    },
    {
      "x": 3758,
      "y": 312
    },
    {
      "x": 3840,
      "y": 400
    },
    {
      "x": 4018,
      "y": 343
    },
    {
      "x": 4067,
      "y": 517
    },
    {
      "x": 4224,
      "y": 416
    },
    {
      "x": 4404,
      "y": 558
    },
    {
      "x": 4480,
      "y": 424
    },
    {
      "x": 4607,
      "y": 564
    },
    {
      "x": 4736,
      "y": 431
    },
    {
      "x": 4885,
      "y": 563
    },
    {
      "x": 5003,
      "y": 565
    },
    {
      "x": 5162,
      "y": 520
    },
    {
      "x": 5284,
      "y": 498
    },
    {
      "x": 5376,
      "y": 428
    },
    {
      "x": 5489,
      "y": 288
    },
    {
      "x": 5688,
      "y": 215
    },
    {
      "x": 5914,
      "y": 187
    },
    {
      "x": 6098,
      "y": 177
    },
    {
      "x": 6197,
      "y": 268
    },
    {
      "x": 6326,
      "y": 277
    },
    {
      "x": 6334,
      "y": 400
    },
    {
      "x": 6400,
      "y": 435
    },
    {
      "x": 6511,
      "y": 485
    },
    {
      "x": 6538,
      "y": 579
    },
    {
      "x": 6608,
      "y": 640
    },
    {
      "x": 6539,
      "y": 647
    },
    {
      "x": 6685,
      "y": 921
    },
    {
      "x": 6806,
      "y": 963
    },
    {
      "x": 6933,
      "y": 861
    },
    {
      "x": 7142,
      "y": 681
    },
    {
      "x": 7278,
      "y": 535
    },
    {
      "x": 7434,
      "y": 520
    },
    {
      "x": 7635,
      "y": 534
    },
    {
      "x": 7782,
      "y": 597
    },
    {
      "x": 7932,
      "y": 578
    },
    {
      "x": 8102,
      "y": 707
    },
    {
      "x": 8272,
      "y": 809
    },
    {
      "x": 8323,
      "y": 1075
    },
    {
      "x": 8504,
      "y": 580
    },
    {
      "x": 8600,
      "y": 466
    }
  ],
  "obstacles": [
    {
      "id": "obs-vespera-1",
      "name": "Geological Formation 1",
      "type": "polygon",
      "points": [
        {
          "x": 1100,
          "y": 960
        },
        {
          "x": 2400,
          "y": 920
        },
        {
          "x": 3700,
          "y": 960
        },
        {
          "x": 3650,
          "y": 1090
        },
        {
          "x": 2400,
          "y": 1110
        },
        {
          "x": 1150,
          "y": 1090
        }
      ]
    },
    {
      "id": "obs-vespera-2",
      "name": "Geological Formation 2",
      "type": "polygon",
      "points": [
        {
          "x": 1949,
          "y": 1101
        },
        {
          "x": 2049,
          "y": 1101
        },
        {
          "x": 2044,
          "y": 1556
        },
        {
          "x": 2054,
          "y": 2011
        },
        {
          "x": 1944,
          "y": 2011
        },
        {
          "x": 1954,
          "y": 1556
        }
      ]
    },
    {
      "id": "obs-vespera-3",
      "name": "Geological Formation 3",
      "type": "polygon",
      "points": [
        {
          "x": 3792,
          "y": 1903
        },
        {
          "x": 5292,
          "y": 1853
        },
        {
          "x": 6789,
          "y": 1856
        },
        {
          "x": 6742,
          "y": 2043
        },
        {
          "x": 5292,
          "y": 2073
        },
        {
          "x": 3842,
          "y": 2043
        }
      ]
    },
    {
      "id": "obs-vespera-4",
      "name": "Geological Formation 4",
      "type": "polygon",
      "points": [
        {
          "x": 4102,
          "y": 2507
        },
        {
          "x": 4592,
          "y": 2508
        },
        {
          "x": 4459,
          "y": 2723
        },
        {
          "x": 4311,
          "y": 2749
        }
      ]
    },
    {
      "id": "obs-vespera-5",
      "name": "Geological Formation 5",
      "type": "polygon",
      "points": [
        {
          "x": 5855,
          "y": 600
        },
        {
          "x": 5945,
          "y": 600
        },
        {
          "x": 5940,
          "y": 1225
        },
        {
          "x": 5950,
          "y": 1850
        },
        {
          "x": 5850,
          "y": 1850
        },
        {
          "x": 5860,
          "y": 1225
        }
      ]
    },
    {
      "id": "obs-vespera-6",
      "name": "Geological Formation 6",
      "type": "polygon",
      "points": [
        {
          "x": 2049,
          "y": 1491
        },
        {
          "x": 2540,
          "y": 1494
        },
        {
          "x": 2508,
          "y": 1597
        },
        {
          "x": 2047,
          "y": 1604
        }
      ]
    },
    {
      "id": "obs-1787777563581",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 4263,
          "y": 1141
        },
        {
          "x": 4726,
          "y": 1056
        },
        {
          "x": 5063,
          "y": 1141
        },
        {
          "x": 4935,
          "y": 1229
        },
        {
          "x": 4636,
          "y": 1298
        },
        {
          "x": 4290,
          "y": 1275
        }
      ]
    },
    {
      "id": "obs-1787777655351",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 6328,
          "y": 1514
        },
        {
          "x": 6771,
          "y": 1312
        },
        {
          "x": 7090,
          "y": 1376
        },
        {
          "x": 6936,
          "y": 1541
        },
        {
          "x": 6786,
          "y": 1472
        },
        {
          "x": 6509,
          "y": 1567
        }
      ]
    },
    {
      "id": "obs-1787777731134",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 5943,
          "y": 923
        },
        {
          "x": 6097,
          "y": 954
        },
        {
          "x": 6219,
          "y": 933
        },
        {
          "x": 6296,
          "y": 1053
        },
        {
          "x": 6077,
          "y": 1074
        },
        {
          "x": 5943,
          "y": 1084
        }
      ]
    },
    {
      "id": "obs-1787778038845",
      "name": "SPIRE Layer",
      "type": "spire",
      "points": [
        {
          "x": 2752,
          "y": 1102
        },
        {
          "x": 2892,
          "y": 1102
        },
        {
          "x": 2868,
          "y": 1349
        },
        {
          "x": 2847,
          "y": 1455
        }
      ]
    },
    {
      "id": "obs-1787778170791",
      "name": "ARCH Layer",
      "type": "arch",
      "points": [
        {
          "x": 2669,
          "y": 2054
        },
        {
          "x": 2988,
          "y": 1829
        },
        {
          "x": 3219,
          "y": 1933
        },
        {
          "x": 3233,
          "y": 2057
        },
        {
          "x": 2998,
          "y": 2022
        },
        {
          "x": 2835,
          "y": 2095
        }
      ]
    }
  ],
  "fuelPickups": [
    {
      "id": "fuel-vespera-1",
      "x": 2800,
      "y": 680,
      "amount": 95
    },
    {
      "id": "fuel-vespera-2",
      "x": 4807,
      "y": 1323,
      "amount": 95
    },
    {
      "id": "fuel-vespera-3",
      "x": 2000,
      "y": 2111,
      "amount": 100
    },
    {
      "id": "fuel-vespera-4",
      "x": 6576,
      "y": 2166,
      "amount": 100
    },
    {
      "id": "fuel-1787777516456",
      "x": 7445,
      "y": 707,
      "amount": 100
    }
  ],
  "cargoPlatforms": [
    {
      "id": "cargo-pickup-94811",
      "type": "pickup",
      "label": "ORE & CARGO EXTRACTION DEPOT",
      "x": 4308,
      "y": 2491,
      "width": 280
    },
    {
      "id": "vehicle-depot-94811",
      "type": "vehicle_depot",
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "x": 2303,
      "y": 1479,
      "width": 480,
      "truckCount": 2
    },
    {
      "id": "vehicle-depot-1787777394355",
      "type": "vehicle_depot",
      "x": 7977,
      "y": 2928,
      "width": 480,
      "label": "SURFACE VEHICLE & ROVER LOGISTICS BASE",
      "truckCount": 2
    },
    {
      "id": "cargo-pickup-1787778101065",
      "type": "pickup",
      "x": 8109,
      "y": 1676,
      "width": 140,
      "weightClass": "heavy",
      "label": "HEAVY DEPOT"
    }
  ],
  "signposts": [],
  "textNotes": [
    {
      "id": "note-1788000090665",
      "x": 434,
      "y": 1214,
      "text": "WARNING!",
      "size": "xl",
      "style": "monospace",
      "color": "#ef4444",
      "showBorder": false,
      "align": "center"
    },
    {
      "id": "note-1788000149886",
      "x": 430,
      "y": 1301,
      "text": "High GRAVITY\nBe extremely careful\nwith landings!",
      "size": "large",
      "style": "monospace",
      "color": "#f8fafc",
      "showBorder": false,
      "align": "center"
    }
  ],
  "difficultyMode": "auto",
  "volcanoes": [
    {
      "id": "volcano-1787933037975",
      "x": 3609,
      "y": 2551,
      "width": 380,
      "height": 240,
      "calderaWidth": 122,
      "eruptionHeight": 480,
      "eruptionInterval": 6,
      "eruptionDuration": 1.8,
      "colorTheme": "magma"
    },
    {
      "id": "volcano-1787933069327",
      "x": 2289,
      "y": 2668,
      "width": 260,
      "height": 160,
      "calderaWidth": 83,
      "eruptionHeight": 320,
      "eruptionInterval": 4.5,
      "eruptionDuration": 1.8,
      "colorTheme": "magma"
    },
    {
      "id": "volcano-1787933096897",
      "x": 6339,
      "y": 2482,
      "width": 180,
      "height": 110,
      "calderaWidth": 58,
      "eruptionHeight": 220,
      "eruptionInterval": 3,
      "eruptionDuration": 1.8,
      "colorTheme": "magma"
    }
  ]
};

export const OFFICIAL_CALYPSO_MAP: CustomMapData = {
  id: 'official-calypso',
  name: 'Calypso Caldera',
  description: 'Expansive volcanic rift filled with superheated thermal columns, hanging basalt stalactites, and active lava chimneys. High updrafts require active counter-thrust.',
  author: 'Planetary Federation',
  createdAt: 1787828886245,
  updatedAt: 1787948800000,
  themeId: 'custom',
  customTheme: {
    id: 'theme-calypso',
    name: 'Calypso Caldera Atmosphere',
    skyTop: '#1a0505',
    skyBottom: '#340808',
    terrainFill: '#2c0606',
    terrainBorder: '#ef4444',
    terrainAccent: '#f97316',
    gridColor: 'rgba(239, 68, 68, 0.08)',
    dustColor: '#fca5a5',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    starDensity: 1.2,
  },
  terrainLineStyle: 'straight',
  worldWidth: 8600,
  worldHeight: 3200,
  gravity: 4.8,
  airResistance: 0.0018,
  fuelBurnRate: 6.2,
  targetTimeSec: 255,
  difficulty: 'Hard',
  launchPad: {
    x: 974,
    y: 2997,
    width: 320,
  },
  landingPad: {
    x: 8128,
    y: 2147,
    width: 340,
  },
  groundNodes: [
    { x: 0, y: 70 },
    { x: 84, y: 1398 },
    { x: 112, y: 2176 },
    { x: 195, y: 2487 },
    { x: 192, y: 2713 },
    { x: 395, y: 2721 },
    { x: 494, y: 2811 },
    { x: 649, y: 2808 },
    { x: 729, y: 3006 },
    { x: 950, y: 3008 },
    { x: 1205, y: 3010 },
    { x: 1408, y: 2825 },
    { x: 1536, y: 2857 },
    { x: 1659, y: 2931 },
    { x: 1845, y: 2930 },
    { x: 1929, y: 2920 },
    { x: 2048, y: 2944 },
    { x: 2167, y: 2937 },
    { x: 2295, y: 2942 },
    { x: 2408, y: 2918 },
    { x: 2548, y: 2933 },
    { x: 2688, y: 2953 },
    { x: 2816, y: 2949 },
    { x: 2944, y: 2948 },
    { x: 3072, y: 2953 },
    { x: 3176, y: 2988 },
    { x: 3317, y: 2986 },
    { x: 3456, y: 2985 },
    { x: 3596, y: 2988 },
    { x: 3712, y: 3014 },
    { x: 3840, y: 3028 },
    { x: 3968, y: 3041 },
    { x: 4096, y: 3048 },
    { x: 4231, y: 3059 },
    { x: 4352, y: 3045 },
    { x: 4480, y: 3036 },
    { x: 4608, y: 3023 },
    { x: 4736, y: 3005 },
    { x: 4920, y: 2966 },
    { x: 5036, y: 2983 },
    { x: 5120, y: 2966 },
    { x: 5230, y: 2939 },
    { x: 5335, y: 2915 },
    { x: 5463, y: 2886 },
    { x: 5632, y: 2838 },
    { x: 5760, y: 2821 },
    { x: 5876, y: 2821 },
    { x: 6020, y: 2821 },
    { x: 6152, y: 2823 },
    { x: 6243, y: 2786 },
    { x: 6340, y: 2772 },
    { x: 6376, y: 2753 },
    { x: 6396, y: 2723 },
    { x: 6365, y: 2665 },
    { x: 6374, y: 2636 },
    { x: 6399, y: 2627 },
    { x: 6499, y: 2634 },
    { x: 6586, y: 2632 },
    { x: 6690, y: 2636 },
    { x: 6765, y: 2666 },
    { x: 6820, y: 2711 },
    { x: 6810, y: 2739 },
    { x: 6776, y: 2749 },
    { x: 6743, y: 2748 },
    { x: 6690, y: 2733 },
    { x: 6619, y: 2738 },
    { x: 6551, y: 2762 },
    { x: 6530, y: 2805 },
    { x: 6488, y: 2836 },
    { x: 6457, y: 2900 },
    { x: 6461, y: 2989 },
    { x: 6425, y: 3040 },
    { x: 6447, y: 3102 },
    { x: 6643, y: 3100 },
    { x: 6982, y: 3095 },
    { x: 7080, y: 3073 },
    { x: 7129, y: 3045 },
    { x: 7202, y: 2994 },
    { x: 7192, y: 2930 },
    { x: 7211, y: 2875 },
    { x: 7205, y: 2811 },
    { x: 7226, y: 2778 },
    { x: 7259, y: 2706 },
    { x: 7305, y: 2655 },
    { x: 7298, y: 2593 },
    { x: 7279, y: 2519 },
    { x: 7248, y: 2452 },
    { x: 7090, y: 2371 },
    { x: 6949, y: 2335 },
    { x: 6786, y: 2326 },
    { x: 6621, y: 2330 },
    { x: 6554, y: 2352 },
    { x: 6491, y: 2347 },
    { x: 6476, y: 2298 },
    { x: 6500, y: 2238 },
    { x: 6538, y: 2195 },
    { x: 6656, y: 2019 },
    { x: 6784, y: 1836 },
    { x: 6912, y: 1674 },
    { x: 7016, y: 1597 },
    { x: 7121, y: 1601 },
    { x: 7242, y: 1697 },
    { x: 7507, y: 1827 },
    { x: 7687, y: 1921 },
    { x: 7779, y: 1967 },
    { x: 7827, y: 2158 },
    { x: 8053, y: 2161 },
    { x: 8190, y: 2162 },
    { x: 8423, y: 2167 },
    { x: 8420, y: 1905 },
    { x: 8327, y: 1678 },
    { x: 8325, y: 1279 },
    { x: 8287, y: 891 },
    { x: 8463, y: 279 },
    { x: 8600, y: 110 },
  ],
  ceilingNodes: [
    { x: 0, y: 70 },
    { x: 67, y: 474 },
    { x: 197, y: 359 },
    { x: 348, y: 342 },
    { x: 512, y: 284 },
    { x: 640, y: 284 },
    { x: 768, y: 446 },
    { x: 892, y: 420 },
    { x: 1024, y: 455 },
    { x: 1140, y: 487 },
    { x: 1280, y: 464 },
    { x: 1404, y: 434 },
    { x: 1536, y: 464 },
    { x: 1664, y: 463 },
    { x: 1792, y: 464 },
    { x: 1920, y: 467 },
    { x: 2048, y: 471 },
    { x: 2176, y: 473 },
    { x: 2304, y: 474 },
    { x: 2432, y: 475 },
    { x: 2560, y: 476 },
    { x: 2688, y: 477 },
    { x: 2816, y: 476 },
    { x: 2944, y: 473 },
    { x: 3072, y: 468 },
    { x: 3200, y: 463 },
    { x: 3328, y: 460 },
    { x: 3456, y: 460 },
    { x: 3584, y: 460 },
    { x: 3750, y: 551 },
    { x: 3840, y: 458 },
    { x: 4017, y: 559 },
    { x: 4096, y: 457 },
    { x: 4163, y: 559 },
    { x: 4337, y: 611 },
    { x: 4541, y: 597 },
    { x: 4608, y: 463 },
    { x: 4770, y: 556 },
    { x: 4960, y: 596 },
    { x: 5102, y: 565 },
    { x: 5208, y: 586 },
    { x: 5304, y: 538 },
    { x: 5427, y: 571 },
    { x: 5602, y: 570 },
    { x: 5783, y: 595 },
    { x: 5940, y: 592 },
    { x: 6046, y: 588 },
    { x: 6016, y: 451 },
    { x: 6093, y: 353 },
    { x: 6234, y: 276 },
    { x: 6435, y: 330 },
    { x: 6543, y: 487 },
    { x: 6703, y: 540 },
    { x: 6879, y: 619 },
    { x: 7050, y: 678 },
    { x: 7108, y: 849 },
    { x: 7199, y: 905 },
    { x: 7341, y: 878 },
    { x: 7484, y: 751 },
    { x: 7507, y: 661 },
    { x: 7668, y: 600 },
    { x: 7790, y: 558 },
    { x: 7887, y: 609 },
    { x: 8067, y: 585 },
    { x: 8161, y: 659 },
    { x: 8273, y: 606 },
    { x: 8460, y: 491 },
    { x: 8465, y: 273 },
    { x: 8600, y: 109 },
  ],
  obstacles: [
    {
      id: 'obs-calypso-1',
      name: 'Geological Formation 1',
      type: 'polygon',
      points: [
        { x: 46, y: 767 },
        { x: 538, y: 746 },
        { x: 988, y: 766 },
        { x: 948, y: 876 },
        { x: 538, y: 864 },
        { x: 52, y: 890 },
      ],
    },
    {
      id: 'obs-calypso-3',
      name: 'Geological Formation 3',
      type: 'polygon',
      points: [
        { x: 4400, y: 920 },
        { x: 5650, y: 890 },
        { x: 6835, y: 1068 },
        { x: 6804, y: 1193 },
        { x: 5650, y: 1012 },
        { x: 4452, y: 1176 },
      ],
    },
    {
      id: 'obs-calypso-4',
      name: 'Geological Formation 4',
      type: 'polygon',
      points: [
        { x: 499, y: 1984 },
        { x: 1999, y: 1944 },
        { x: 3499, y: 1984 },
        { x: 3449, y: 2114 },
        { x: 1999, y: 2144 },
        { x: 549, y: 2114 },
      ],
    },
    {
      id: 'obs-calypso-5',
      name: 'Geological Formation 5',
      type: 'polygon',
      points: [
        { x: 3941, y: 2534 },
        { x: 3978, y: 2300 },
        { x: 4040, y: 2836 },
        { x: 4096, y: 3044 },
        { x: 3718, y: 3016 },
        { x: 3841, y: 2768 },
      ],
    },
    {
      id: 'obs-calypso-6',
      name: 'Geological Formation 6',
      type: 'polygon',
      points: [
        { x: 399, y: 1448 },
        { x: 1008, y: 1681 },
        { x: 837, y: 1975 },
        { x: 498, y: 1984 },
      ],
    },
    {
      id: 'obs-calypso-7',
      name: 'Geological Formation 7',
      type: 'polygon',
      points: [
        { x: 1911, y: 1591 },
        { x: 2377, y: 1708 },
        { x: 2928, y: 1970 },
        { x: 2032, y: 1947 },
      ],
    },
    {
      id: 'obs-1787829345926',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 3243, y: 1614 },
        { x: 3409, y: 1622 },
        { x: 3459, y: 1982 },
        { x: 3239, y: 1982 },
      ],
    },
    {
      id: 'obs-1787829368105',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 4766, y: 2730 },
        { x: 4765, y: 2293 },
        { x: 4921, y: 2968 },
        { x: 4730, y: 3009 },
      ],
    },
    {
      id: 'obs-1787829385728',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 4374, y: 2815 },
        { x: 4432, y: 2497 },
        { x: 4523, y: 3033 },
        { x: 4300, y: 3051 },
      ],
    },
    {
      id: 'obs-1787829404224',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 5059, y: 2242 },
        { x: 5190, y: 2682 },
        { x: 5249, y: 2942 },
        { x: 5061, y: 2983 },
      ],
    },
    {
      id: 'obs-1787829421139',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 5414, y: 2649 },
        { x: 5510, y: 2137 },
        { x: 5569, y: 2860 },
        { x: 5349, y: 2912 },
      ],
    },
    {
      id: 'obs-1787829462476',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 2422, y: 474 },
        { x: 2562, y: 474 },
        { x: 2512, y: 971 },
        { x: 2472, y: 874 },
      ],
    },
    {
      id: 'obs-1787829472706',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 2778, y: 476 },
        { x: 2918, y: 476 },
        { x: 2868, y: 876 },
        { x: 2833, y: 963 },
      ],
    },
    {
      id: 'obs-1787829494126',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 3078, y: 469 },
        { x: 3220, y: 464 },
        { x: 3163, y: 805 },
        { x: 3153, y: 999 },
      ],
    },
    {
      id: 'obs-1787829513769',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 3324, y: 459 },
        { x: 3464, y: 459 },
        { x: 3402, y: 794 },
        { x: 3376, y: 882 },
      ],
    },
    {
      id: 'obs-1787829549813',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 2152, y: 476 },
        { x: 2292, y: 476 },
        { x: 2242, y: 781 },
        { x: 2206, y: 845 },
      ],
    },
    {
      id: 'obs-1787829564349',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 1894, y: 469 },
        { x: 2034, y: 469 },
        { x: 1998, y: 681 },
        { x: 1956, y: 772 },
      ],
    },
    {
      id: 'obs-1787829575771',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 1670, y: 464 },
        { x: 1810, y: 464 },
        { x: 1736, y: 744 },
        { x: 1727, y: 816 },
      ],
    },
  ],
  fuelPickups: [
    {
      id: 'fuel-luna-1',
      x: 5344,
      y: 670,
      amount: 75,
    },
    {
      id: 'fuel-luna-3',
      x: 2990,
      y: 611,
      amount: 75,
    },
    {
      id: 'fuel-luna-5',
      x: 6279,
      y: 2708,
      amount: 80,
    },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-62019',
      type: 'pickup',
      label: 'ORE & CARGO EXTRACTION DEPOT',
      x: 3321,
      y: 2973,
      width: 280,
    },
    {
      id: 'vehicle-depot-62019',
      type: 'vehicle_depot',
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      x: 1691,
      y: 1945,
      width: 480,
      truckCount: 2,
    },
    {
      id: 'vehicle-depot-1787829929942',
      type: 'vehicle_depot',
      x: 6729,
      y: 3086,
      width: 480,
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1787934350852',
      type: 'pickup',
      x: 516,
      y: 742,
      width: 140,
      weightClass: 'medium',
      cargoType: 'explosive',
      label: 'HIGH-EXPLOSIVE MUNITIONS DEPOT',
    },
  ],
  signposts: [
    {
      id: 'sign-1787934397324',
      x: 1682,
      y: 1107,
      direction: 'up_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787934406029',
      x: 3817,
      y: 2035,
      direction: 'down_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787934427176',
      x: 6304,
      y: 1896,
      direction: 'down',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787934452554',
      x: 7107,
      y: 1153,
      direction: 'down_right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787934480001',
      x: 1682,
      y: 1241,
      direction: 'down',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787934501263',
      x: 1024,
      y: 2240,
      direction: 'up_left',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787934508059',
      x: 1025,
      y: 2376,
      direction: 'up_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787934514176',
      x: 1281,
      y: 2378,
      direction: 'right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787934518162',
      x: 1281,
      y: 2237,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
  ],
  textNotes: [],
  difficultyMode: 'manual',
  volcanoes: [
    {
      id: 'volcano-1787832505460',
      x: 5951,
      y: 2822,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'magma',
    },
    {
      id: 'volcano-1787832512939',
      x: 2944,
      y: 2954,
      width: 260,
      height: 160,
      calderaWidth: 83,
      eruptionHeight: 320,
      eruptionInterval: 20,
      eruptionDuration: 1.8,
      colorTheme: 'magma',
    },
    {
      id: 'volcano-1787832845414',
      x: 1121,
      y: 1967,
      width: 260,
      height: 160,
      calderaWidth: 83,
      eruptionHeight: 320,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'magma',
    },
  ],
};

export const OFFICIAL_ZEPHYR_MAP: CustomMapData = {
  id: 'official-zephyr',
  name: 'Zephyr Tempest',
  description: 'Vast storm cavern with persistent high-velocity lateral jetstreams. Pilots must constantly counter horizontal drift while navigating stepped cavern corridors.',
  author: 'Planetary Federation',
  createdAt: 1787947608985,
  updatedAt: 1787949600000,
  themeId: 'custom',
  customTheme: {
    id: 'theme-zephyr',
    name: 'Zephyr Tempest Atmosphere',
    skyTop: '#021818',
    skyBottom: '#052c2c',
    terrainFill: '#042222',
    terrainBorder: '#14b8a6',
    terrainAccent: '#5eead4',
    gridColor: 'rgba(20, 184, 166, 0.08)',
    dustColor: '#99f6e4',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    starDensity: 1.2,
  },
  terrainLineStyle: 'straight',
  worldWidth: 8600,
  worldHeight: 3200,
  gravity: 2.8,
  airResistance: 0.0042,
  fuelBurnRate: 5.6,
  targetTimeSec: 275,
  difficulty: 'Medium',
  launchPad: {
    x: 1100,
    y: 539,
    width: 320,
  },
  landingPad: {
    x: 7222,
    y: 437,
    width: 340,
  },
  groundNodes: [
    { x: 0, y: 70 },
    { x: 128, y: 636 },
    { x: 256, y: 638 },
    { x: 340, y: 805 },
    { x: 491, y: 886 },
    { x: 620, y: 977 },
    { x: 792, y: 1131 },
    { x: 896, y: 1666 },
    { x: 1024, y: 2206 },
    { x: 1252, y: 2580 },
    { x: 1280, y: 2844 },
    { x: 1408, y: 2838 },
    { x: 1548, y: 2816 },
    { x: 1664, y: 2889 },
    { x: 1808, y: 2952 },
    { x: 1920, y: 2931 },
    { x: 2068, y: 2899 },
    { x: 2212, y: 2892 },
    { x: 2304, y: 2957 },
    { x: 2432, y: 2961 },
    { x: 2560, y: 2962 },
    { x: 2688, y: 2962 },
    { x: 2824, y: 2926 },
    { x: 2944, y: 2954 },
    { x: 3072, y: 2952 },
    { x: 3200, y: 2953 },
    { x: 3328, y: 2958 },
    { x: 3456, y: 2967 },
    { x: 3641, y: 3010 },
    { x: 3848, y: 2985 },
    { x: 4108, y: 2885 },
    { x: 4374, y: 2938 },
    { x: 4587, y: 2969 },
    { x: 4782, y: 3053 },
    { x: 5019, y: 3027 },
    { x: 5202, y: 3005 },
    { x: 5342, y: 2963 },
    { x: 5403, y: 2833 },
    { x: 5495, y: 2661 },
    { x: 5740, y: 2662 },
    { x: 5949, y: 2733 },
    { x: 6217, y: 2812 },
    { x: 6453, y: 2890 },
    { x: 6669, y: 2885 },
    { x: 6863, y: 2896 },
    { x: 7216, y: 2898 },
    { x: 7488, y: 2954 },
    { x: 7790, y: 2949 },
    { x: 7933, y: 2828 },
    { x: 7930, y: 2635 },
    { x: 7829, y: 2430 },
    { x: 7772, y: 2247 },
    { x: 7553, y: 2071 },
    { x: 7469, y: 1839 },
    { x: 7273, y: 1633 },
    { x: 7059, y: 1511 },
    { x: 7037, y: 1357 },
    { x: 7125, y: 1267 },
    { x: 7224, y: 1272 },
    { x: 7536, y: 1274 },
    { x: 7645, y: 1262 },
    { x: 7739, y: 1114 },
    { x: 7948, y: 1045 },
    { x: 8144, y: 1029 },
    { x: 8213, y: 949 },
    { x: 8347, y: 798 },
    { x: 8347, y: 682 },
    { x: 8400, y: 504 },
    { x: 8539, y: 570 },
    { x: 8525, y: 377 },
    { x: 8600, y: 70 },
  ],
  ceilingNodes: [
    { x: 0, y: 70 },
    { x: 132, y: 634 },
    { x: 260, y: 638 },
    { x: 204, y: 540 },
    { x: 205, y: 411 },
    { x: 243, y: 318 },
    { x: 266, y: 238 },
    { x: 351, y: 178 },
    { x: 404, y: 110 },
    { x: 503, y: 74 },
    { x: 597, y: 72 },
    { x: 691, y: 137 },
    { x: 792, y: 95 },
    { x: 915, y: 75 },
    { x: 1028, y: 66 },
    { x: 1162, y: 61 },
    { x: 1261, y: 108 },
    { x: 1330, y: 171 },
    { x: 1355, y: 247 },
    { x: 1350, y: 324 },
    { x: 1322, y: 396 },
    { x: 1299, y: 555 },
    { x: 1114, y: 545 },
    { x: 930, y: 551 },
    { x: 792, y: 571 },
    { x: 752, y: 575 },
    { x: 741, y: 616 },
    { x: 773, y: 652 },
    { x: 834, y: 669 },
    { x: 968, y: 655 },
    { x: 1129, y: 639 },
    { x: 1291, y: 634 },
    { x: 1456, y: 535 },
    { x: 1536, y: 464 },
    { x: 1685, y: 509 },
    { x: 1792, y: 458 },
    { x: 1947, y: 507 },
    { x: 2053, y: 444 },
    { x: 2201, y: 426 },
    { x: 2360, y: 406 },
    { x: 2496, y: 383 },
    { x: 2588, y: 425 },
    { x: 2690, y: 493 },
    { x: 2863, y: 515 },
    { x: 2944, y: 444 },
    { x: 3107, y: 428 },
    { x: 3208, y: 486 },
    { x: 3328, y: 449 },
    { x: 3504, y: 498 },
    { x: 3538, y: 443 },
    { x: 3716, y: 487 },
    { x: 3838, y: 412 },
    { x: 3978, y: 381 },
    { x: 4124, y: 394 },
    { x: 4224, y: 436 },
    { x: 4372, y: 493 },
    { x: 4550, y: 498 },
    { x: 4686, y: 506 },
    { x: 4819, y: 530 },
    { x: 4965, y: 563 },
    { x: 5124, y: 586 },
    { x: 5164, y: 513 },
    { x: 5248, y: 421 },
    { x: 5392, y: 373 },
    { x: 5539, y: 387 },
    { x: 5632, y: 416 },
    { x: 5787, y: 464 },
    { x: 5886, y: 384 },
    { x: 5963, y: 480 },
    { x: 6023, y: 408 },
    { x: 6105, y: 486 },
    { x: 6264, y: 420 },
    { x: 6531, y: 425 },
    { x: 6735, y: 526 },
    { x: 6878, y: 582 },
    { x: 7019, y: 600 },
    { x: 7193, y: 593 },
    { x: 7355, y: 607 },
    { x: 7525, y: 634 },
    { x: 7638, y: 645 },
    { x: 7739, y: 604 },
    { x: 7807, y: 586 },
    { x: 7896, y: 579 },
    { x: 7936, y: 508 },
    { x: 7912, y: 439 },
    { x: 7804, y: 404 },
    { x: 7696, y: 371 },
    { x: 7582, y: 354 },
    { x: 7477, y: 372 },
    { x: 7414, y: 454 },
    { x: 7023, y: 449 },
    { x: 6964, y: 408 },
    { x: 6980, y: 295 },
    { x: 7003, y: 212 },
    { x: 6985, y: 160 },
    { x: 6969, y: 72 },
    { x: 7002, y: 35 },
    { x: 7112, y: 35 },
    { x: 7225, y: 36 },
    { x: 7314, y: 53 },
    { x: 7339, y: 100 },
    { x: 7404, y: 88 },
    { x: 7478, y: 65 },
    { x: 7546, y: 80 },
    { x: 7621, y: 56 },
    { x: 7691, y: 76 },
    { x: 7816, y: 93 },
    { x: 7926, y: 69 },
    { x: 8037, y: 85 },
    { x: 8111, y: 132 },
    { x: 8167, y: 204 },
    { x: 8249, y: 255 },
    { x: 8342, y: 401 },
    { x: 8401, y: 509 },
    { x: 8540, y: 575 },
    { x: 8523, y: 383 },
    { x: 8600, y: 70 },
  ],
  obstacles: [
    {
      id: 'obs-zephyr-1',
      name: 'Geological Formation 1',
      type: 'polygon',
      points: [
        { x: 785, y: 1136 },
        { x: 1011, y: 1062 },
        { x: 1582, y: 1084 },
        { x: 1499, y: 1258 },
        { x: 1157, y: 1235 },
        { x: 828, y: 1339 },
      ],
    },
    {
      id: 'obs-zephyr-2',
      name: 'Geological Formation 2',
      type: 'polygon',
      points: [
        { x: 2244, y: 1001 },
        { x: 2665, y: 900 },
        { x: 3962, y: 945 },
        { x: 3922, y: 1055 },
        { x: 3100, y: 1099 },
        { x: 2450, y: 1115 },
      ],
    },
    {
      id: 'obs-zephyr-3',
      name: 'Geological Formation 3',
      type: 'polygon',
      points: [
        { x: 4441, y: 1052 },
        { x: 5550, y: 870 },
        { x: 6695, y: 983 },
        { x: 6511, y: 1248 },
        { x: 5923, y: 1244 },
        { x: 4481, y: 1162 },
      ],
    },
    {
      id: 'obs-zephyr-4',
      name: 'Geological Formation 4',
      type: 'polygon',
      points: [
        { x: 977, y: 1981 },
        { x: 2488, y: 1879 },
        { x: 3877, y: 2055 },
        { x: 3804, y: 2194 },
        { x: 2497, y: 2069 },
        { x: 1022, y: 2184 },
      ],
    },
    {
      id: 'obs-zephyr-5',
      name: 'Geological Formation 5',
      type: 'polygon',
      points: [
        { x: 4471, y: 1872 },
        { x: 5150, y: 1793 },
        { x: 6593, y: 1850 },
        { x: 6673, y: 2045 },
        { x: 4988, y: 2116 },
        { x: 4501, y: 2002 },
      ],
    },
    {
      id: 'obs-zephyr-6',
      name: 'Geological Formation 6',
      type: 'polygon',
      points: [
        { x: 2399, y: 2833 },
        { x: 2699, y: 2833 },
        { x: 2679, y: 2951 },
        { x: 2419, y: 2951 },
      ],
    },
    {
      id: 'obs-1787949004835',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 7329, y: 2628 },
        { x: 7454, y: 2705 },
        { x: 7469, y: 2952 },
        { x: 7287, y: 2911 },
      ],
    },
    {
      id: 'obs-1787949111290',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 1470, y: 1718 },
        { x: 2086, y: 1711 },
        { x: 2264, y: 1625 },
        { x: 2483, y: 1881 },
        { x: 1880, y: 1915 },
        { x: 1449, y: 1949 },
      ],
    },
    {
      id: 'obs-1787949143314',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 1158, y: 1614 },
        { x: 1472, y: 1718 },
        { x: 1449, y: 1948 },
        { x: 1229, y: 1966 },
      ],
    },
    {
      id: 'obs-1787992046968',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 4309, y: 2720 },
        { x: 4549, y: 2377 },
        { x: 4376, y: 2939 },
        { x: 4108, y: 2884 },
      ],
    },
    {
      id: 'obs-1787992086404',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 3829, y: 2543 },
        { x: 3946, y: 2746 },
        { x: 4103, y: 2884 },
        { x: 3854, y: 2984 },
      ],
    },
    {
      id: 'obs-1787992175953',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 4539, y: 1166 },
        { x: 4645, y: 1169 },
        { x: 4591, y: 1370 },
        { x: 4585, y: 1286 },
      ],
    },
    {
      id: 'obs-1787992185875',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 3670, y: 1073 },
        { x: 3842, y: 1061 },
        { x: 3766, y: 1178 },
        { x: 3738, y: 1264 },
      ],
    },
    {
      id: 'obs-1787992197236',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 4789, y: 1181 },
        { x: 4926, y: 1186 },
        { x: 4871, y: 1282 },
        { x: 4847, y: 1364 },
      ],
    },
    {
      id: 'obs-178799202276',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 5070, y: 1194 },
        { x: 5190, y: 1201 },
        { x: 5095, y: 1427 },
        { x: 5098, y: 1292 },
      ],
    },
    {
      id: 'obs-1787992206919',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 5296, y: 1209 },
        { x: 5424, y: 1216 },
        { x: 5377, y: 1312 },
        { x: 5349, y: 1420 },
      ],
    },
    {
      id: 'obs-1787992210856',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 5573, y: 1225 },
        { x: 5697, y: 1231 },
        { x: 5642, y: 1456 },
        { x: 5623, y: 1336 },
      ],
    },
  ],
  fuelPickups: [
    {
      id: 'fuel-luna-1',
      x: 3000,
      y: 680,
      amount: 75,
    },
    {
      id: 'fuel-luna-2',
      x: 6200,
      y: 680,
      amount: 65,
    },
    {
      id: 'fuel-luna-3',
      x: 3424,
      y: 1502,
      amount: 75,
    },
    {
      id: 'fuel-luna-4',
      x: 5923,
      y: 1395,
      amount: 90,
    },
    {
      id: 'fuel-luna-5',
      x: 6252,
      y: 2362,
      amount: 80,
    },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-83105',
      type: 'pickup',
      label: 'ORE & SCIENTIFIC CARGO DEPOT',
      x: 2549,
      y: 2821,
      width: 280,
    },
    {
      id: 'vehicle-depot-83105',
      type: 'vehicle_depot',
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      x: 1777,
      y: 1701,
      width: 480,
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1787948983085',
      type: 'pickup',
      x: 7633,
      y: 2942,
      width: 140,
      weightClass: 'heavy',
      cargoType: 'plasma',
      label: 'PLASMA BATTERY RECHARGE HUB',
    },
  ],
  signposts: [
    {
      id: 'sign-1787992778086',
      x: 2673,
      y: 1331,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787992784566',
      x: 6233,
      y: 1488,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787992790656',
      x: 6236,
      y: 1343,
      direction: 'up_right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787992809204',
      x: 2673,
      y: 1197,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787992819697',
      x: 1891,
      y: 618,
      direction: 'down',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1787992827069',
      x: 1885,
      y: 744,
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1787992845301',
      x: 4197,
      y: 1938,
      direction: 'down_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787992852809',
      x: 4196,
      y: 1793,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1787992920481',
      x: 6725,
      y: 631,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
  ],
  textNotes: [],
  difficultyMode: 'manual',
  volcanoes: [
    {
      id: 'volcano-1787948659821',
      x: 7373,
      y: 1267,
      width: 260,
      height: 160,
      calderaWidth: 83,
      eruptionHeight: 320,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'toxic',
    },
    {
      id: 'volcano-1787948910433',
      x: 3173,
      y: 2947,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'toxic',
    },
    {
      id: 'volcano-1787948932342',
      x: 5617,
      y: 2654,
      width: 180,
      height: 110,
      calderaWidth: 58,
      eruptionHeight: 220,
      eruptionInterval: 6,
      eruptionDuration: 1.8,
      colorTheme: 'toxic',
    },
    {
      id: 'volcano-1787948955237',
      x: 7051,
      y: 2899,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'toxic',
    },
  ],
};

export const OFFICIAL_TARTARUS_MAP: CustomMapData = {
  id: 'official-tartarus',
  name: 'Tartarus Nexus',
  description: 'Multi-layer underground industrial refinery with 3 distinct elevator shafts, heavy robotic gantries, and dual vehicle transport depots.',
  author: 'Planetary Federation',
  createdAt: 1787831102055,
  updatedAt: 1788080580060,
  themeId: 'custom',
  customTheme: {
    id: 'theme-tartarus',
    name: 'Tartarus Nexus Atmosphere',
    skyTop: '#0d0d17',
    skyBottom: '#181829',
    terrainFill: '#151524',
    terrainBorder: '#818cf8',
    terrainAccent: '#a5b4fc',
    gridColor: 'rgba(129, 140, 248, 0.07)',
    dustColor: '#c7d2fe',
    glowColor: 'rgba(129, 140, 248, 0.35)',
    starDensity: 1.2,
  },
  terrainLineStyle: 'straight',
  worldWidth: 4000,
  worldHeight: 7400,
  gravity: 5.4,
  airResistance: 0.0012,
  fuelBurnRate: 6.4,
  targetTimeSec: 260,
  difficulty: 'Hard',
  launchPad: {
    x: 1130,
    y: 6829,
    width: 320,
  },
  landingPad: {
    x: 3570,
    y: 817,
    width: 340,
  },
  groundNodes: [
    { x: 0, y: 1992 },
    { x: 144, y: 2147 },
    { x: 170, y: 2246 },
    { x: 188, y: 2436 },
    { x: 208, y: 2718 },
    { x: 304, y: 3298 },
    { x: 282, y: 3939 },
    { x: 394, y: 4283 },
    { x: 474, y: 4695 },
    { x: 452, y: 5380 },
    { x: 522, y: 5558 },
    { x: 720, y: 5580 },
    { x: 896, y: 6119 },
    { x: 512, y: 6504 },
    { x: 338, y: 6796 },
    { x: 580, y: 7049 },
    { x: 964, y: 6845 },
    { x: 1298, y: 6844 },
    { x: 1385, y: 6826 },
    { x: 1553, y: 6840 },
    { x: 1666, y: 6794 },
    { x: 1779, y: 6829 },
    { x: 1846, y: 6855 },
    { x: 1993, y: 6803 },
    { x: 2149, y: 6742 },
    { x: 2268, y: 6688 },
    { x: 2409, y: 6708 },
    { x: 2507, y: 6782 },
    { x: 2580, y: 6973 },
    { x: 2681, y: 6979 },
    { x: 2831, y: 6996 },
    { x: 2945, y: 7012 },
    { x: 3044, y: 7140 },
    { x: 3258, y: 7137 },
    { x: 3352, y: 7055 },
    { x: 3454, y: 6939 },
    { x: 3360, y: 6773 },
    { x: 3206, y: 6651 },
    { x: 3356, y: 6596 },
    { x: 3478, y: 6247 },
    { x: 3288, y: 5927 },
    { x: 3478, y: 5507 },
    { x: 3586, y: 5054 },
    { x: 3394, y: 4866 },
    { x: 3184, y: 4519 },
    { x: 3272, y: 4281 },
    { x: 3332, y: 4098 },
    { x: 3422, y: 3757 },
    { x: 3598, y: 3477 },
    { x: 3372, y: 3220 },
    { x: 3184, y: 2971 },
    { x: 3137, y: 2715 },
    { x: 3426, y: 2649 },
    { x: 3640, y: 2160 },
    { x: 3704, y: 1719 },
    { x: 3632, y: 1633 },
    { x: 3555, y: 1621 },
    { x: 3465, y: 1610 },
    { x: 3434, y: 1561 },
    { x: 3469, y: 1529 },
    { x: 3531, y: 1474 },
    { x: 3623, y: 1431 },
    { x: 3655, y: 1391 },
    { x: 3640, y: 1315 },
    { x: 3560, y: 1188 },
    { x: 4000, y: 904 },
  ],
  ceilingNodes: [
    { x: 0, y: 2018 },
    { x: 148, y: 2142 },
    { x: 320, y: 1716 },
    { x: 486, y: 1460 },
    { x: 502, y: 1116 },
    { x: 550, y: 816 },
    { x: 754, y: 666 },
    { x: 836, y: 698 },
    { x: 1008, y: 581 },
    { x: 1152, y: 456 },
    { x: 1424, y: 462 },
    { x: 1606, y: 414 },
    { x: 1794, y: 473 },
    { x: 1986, y: 394 },
    { x: 2168, y: 396 },
    { x: 2298, y: 375 },
    { x: 2476, y: 341 },
    { x: 2650, y: 401 },
    { x: 2932, y: 389 },
    { x: 3108, y: 323 },
    { x: 3372, y: 252 },
    { x: 3598, y: 252 },
    { x: 3770, y: 318 },
    { x: 3872, y: 473 },
    { x: 3934, y: 607 },
    { x: 3928, y: 731 },
    { x: 3892, y: 828 },
    { x: 3730, y: 826 },
    { x: 3558, y: 829 },
    { x: 3472, y: 834 },
    { x: 3383, y: 833 },
    { x: 3322, y: 801 },
    { x: 3260, y: 758 },
    { x: 3220, y: 732 },
    { x: 3177, y: 767 },
    { x: 3163, y: 822 },
    { x: 3188, y: 878 },
    { x: 3255, y: 923 },
    { x: 3325, y: 946 },
    { x: 3417, y: 979 },
    { x: 3518, y: 979 },
    { x: 3598, y: 1053 },
    { x: 3562, y: 1190 },
    { x: 4000, y: 908 },
  ],
  obstacles: [
    {
      id: 'obs-1788074066090',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 994, y: 1474 },
        { x: 1518, y: 1470 },
        { x: 1794, y: 1474 },
        { x: 1754, y: 1564 },
        { x: 1090, y: 1702 },
        { x: 1034, y: 1564 },
      ],
    },
    {
      id: 'obs-1788074073835',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2221, y: 1454 },
        { x: 2475, y: 1356 },
        { x: 3021, y: 1454 },
        { x: 2981, y: 1544 },
        { x: 2817, y: 1634 },
        { x: 2261, y: 1544 },
      ],
    },
    {
      id: 'obs-1788074154438',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 984, y: 2393 },
        { x: 1392, y: 2399 },
        { x: 1784, y: 2393 },
        { x: 1744, y: 2483 },
        { x: 1384, y: 2513 },
        { x: 1024, y: 2483 },
      ],
    },
    {
      id: 'obs-1788074164729',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2638, y: 2111 },
        { x: 3304, y: 1995 },
        { x: 3438, y: 2111 },
        { x: 3398, y: 2201 },
        { x: 3066, y: 2233 },
        { x: 2678, y: 2201 },
      ],
    },
    {
      id: 'obs-1788074168167',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 690, y: 3126 },
        { x: 1382, y: 3290 },
        { x: 1782, y: 3330 },
        { x: 1742, y: 3420 },
        { x: 1382, y: 3450 },
        { x: 1022, y: 3420 },
      ],
    },
    {
      id: 'obs-1788074175740',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2002, y: 3074 },
        { x: 2392, y: 3072 },
        { x: 2802, y: 3074 },
        { x: 2762, y: 3164 },
        { x: 2402, y: 3194 },
        { x: 2042, y: 3164 },
      ],
    },
    {
      id: 'obs-1788074179065',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2528, y: 3912 },
        { x: 2928, y: 3952 },
        { x: 2888, y: 4042 },
        { x: 2528, y: 4072 },
        { x: 2168, y: 4042 },
      ],
    },
    {
      id: 'obs-1788074185362',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 774, y: 3980 },
        { x: 1260, y: 4058 },
        { x: 1726, y: 4212 },
        { x: 1686, y: 4302 },
        { x: 1326, y: 4332 },
        { x: 842, y: 4512 },
      ],
    },
    {
      id: 'obs-1788074189040',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2140, y: 4762 },
        { x: 2548, y: 4770 },
        { x: 2940, y: 4762 },
        { x: 2900, y: 4852 },
        { x: 2540, y: 4882 },
        { x: 2180, y: 4852 },
      ],
    },
    {
      id: 'obs-1788074191897',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 958, y: 5079 },
        { x: 1192, y: 4999 },
        { x: 1758, y: 5079 },
        { x: 1690, y: 5289 },
        { x: 1358, y: 5233 },
        { x: 944, y: 5249 },
      ],
    },
    {
      id: 'obs-1788074204287',
      name: 'MAGMA SHELF Layer',
      type: 'strata',
      points: [
        { x: 1230, y: 6003 },
        { x: 1932, y: 5932 },
        { x: 2530, y: 6018 },
        { x: 3036, y: 5969 },
        { x: 2904, y: 6128 },
        { x: 1280, y: 6098 },
      ],
    },
    {
      id: 'obs-1788074519878',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 2882, y: 6935 },
        { x: 2938, y: 6821 },
        { x: 3044, y: 6997 },
        { x: 3028, y: 7119 },
        { x: 2954, y: 7027 },
        { x: 2888, y: 7003 },
      ],
    },
    {
      id: 'obs-1788074846450',
      name: 'PILLAR Layer',
      type: 'pillar',
      points: [
        { x: 1591, y: 1374 },
        { x: 1801, y: 1204 },
        { x: 1787, y: 1472 },
        { x: 1563, y: 1476 },
      ],
    },
    {
      id: 'obs-1788074966010',
      name: 'ISLAND Layer',
      type: 'island',
      points: [
        { x: 1576, y: 2270 },
        { x: 1796, y: 2252 },
        { x: 1728, y: 2392 },
        { x: 1650, y: 2396 },
      ],
    },
    {
      id: 'obs-1788074996070',
      name: 'ISLAND Layer',
      type: 'island',
      points: [
        { x: 1523, y: 2185 },
        { x: 1875, y: 2063 },
        { x: 1797, y: 2251 },
        { x: 1621, y: 2259 },
      ],
    },
    {
      id: 'obs-1788075026370',
      name: 'ISLAND Layer',
      type: 'island',
      points: [
        { x: 1525, y: 1976 },
        { x: 1867, y: 1932 },
        { x: 1863, y: 2068 },
        { x: 1407, y: 2230 },
      ],
    },
    {
      id: 'obs-1788075441460',
      name: 'SHELF Layer',
      type: 'strata',
      points: [
        { x: 1978, y: 2973 },
        { x: 2152, y: 2967 },
        { x: 2220, y: 3075 },
        { x: 2024, y: 3073 },
      ],
    },
    {
      id: 'obs-1788075487467',
      name: 'SHELF Layer',
      type: 'strata',
      points: [
        { x: 1964, y: 2877 },
        { x: 2206, y: 2861 },
        { x: 2176, y: 2977 },
        { x: 1974, y: 2975 },
      ],
    },
    {
      id: 'obs-1788075519255',
      name: 'SHELF Layer',
      type: 'strata',
      points: [
        { x: 1947, y: 2762 },
        { x: 2277, y: 2740 },
        { x: 2225, y: 2864 },
        { x: 1963, y: 2874 },
      ],
    },
    {
      id: 'obs-1788079094884',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 1564, y: 6836 },
        { x: 1518, y: 6710 },
        { x: 1529, y: 6642 },
        { x: 1577, y: 6702 },
        { x: 1590, y: 6578 },
        { x: 1629, y: 6666 },
        { x: 1701, y: 6566 },
        { x: 1665, y: 6780 },
        { x: 1643, y: 6808 },
      ],
    },
    {
      id: 'obs-pasted-1788080384166',
      name: 'Crystalline Spire Cluster (Copy)',
      type: 'crystals',
      points: [
        { x: 1765, y: 6818 },
        { x: 1737, y: 6732 },
        { x: 1730, y: 6624 },
        { x: 1778, y: 6734 },
        { x: 1815, y: 6648 },
        { x: 1816, y: 6756 },
        { x: 1862, y: 6694 },
        { x: 1866, y: 6762 },
        { x: 1832, y: 6850 },
      ],
    },
    {
      id: 'obs-1788080417161',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 1961, y: 6808 },
        { x: 1921, y: 6694 },
        { x: 1914, y: 6604 },
        { x: 1981, y: 6638 },
        { x: 2012, y: 6547 },
        { x: 2043, y: 6638 },
        { x: 2078, y: 6580 },
        { x: 2093, y: 6691 },
        { x: 2078, y: 6764 },
      ],
    },
    {
      id: 'obs-pasted-1788081564170',
      name: 'Crystalline Spire Cluster (Copy) (Copy)',
      type: 'crystals',
      points: [
        { x: 589, y: 5568 },
        { x: 579, y: 5454 },
        { x: 572, y: 5346 },
        { x: 620, y: 5456 },
        { x: 657, y: 5370 },
        { x: 658, y: 5478 },
        { x: 704, y: 5416 },
        { x: 708, y: 5484 },
        { x: 680, y: 5576 },
      ],
    },
    {
      id: 'obs-pasted-1788081593508',
      name: 'Crystalline Spire Cluster (Copy) (Copy)',
      type: 'crystals',
      points: [
        { x: 3372, y: 2660 },
        { x: 3334, y: 2636 },
        { x: 3327, y: 2552 },
        { x: 3367, y: 2622 },
        { x: 3380, y: 2572 },
        { x: 3387, y: 2608 },
        { x: 3429, y: 2538 },
        { x: 3413, y: 2620 },
        { x: 3405, y: 2654 },
      ],
    },
    {
      id: 'obs-pasted-1788081897458',
      name: 'Crystalline Spire Cluster (Copy) (Copy) (Copy)',
      type: 'crystals',
      points: [
        { x: 3555, y: 1466 },
        { x: 3509, y: 1430 },
        { x: 3502, y: 1346 },
        { x: 3542, y: 1416 },
        { x: 3555, y: 1366 },
        { x: 3562, y: 1402 },
        { x: 3604, y: 1332 },
        { x: 3588, y: 1414 },
        { x: 3580, y: 1448 },
      ],
    },
  ],
  fuelPickups: [
    { id: 'fuel-1788075376186', x: 2481, y: 5940, amount: 100 },
    { id: 'fuel-1788075380057', x: 2363, y: 3883, amount: 100 },
    { id: 'fuel-1788075402339', x: 1105, y: 3127, amount: 100 },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-1788074327859',
      type: 'pickup',
      x: 3136,
      y: 7132,
      width: 140,
      weightClass: 'heavy',
      cargoType: 'explosive',
      label: 'HIGH-EXPLOSIVE MUNITIONS DEPOT',
    },
    {
      id: 'vehicle-depot-1788074811728',
      type: 'vehicle_depot',
      x: 2544,
      y: 4753,
      width: 480,
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      truckCount: 2,
    },
    {
      id: 'vehicle-depot-1788074832879',
      type: 'vehicle_depot',
      x: 1245,
      y: 1465,
      width: 480,
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1788074926614',
      type: 'pickup',
      x: 1154,
      y: 2386,
      width: 140,
      weightClass: 'heavy',
      cargoType: 'explosive',
      label: 'HIGH-EXPLOSIVE MUNITIONS DEPOT',
    },
  ],
  signposts: [
    {
      id: 'sign-1788075154697',
      x: 1081,
      y: 6282,
      direction: 'up',
      targetType: 'landing',
      targetName: 'PRIMARY BASE LZ',
      subText: 'EXPEDITION OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1788076092389',
      x: 1085,
      y: 6428,
      direction: 'right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788076110371',
      x: 3062,
      y: 6347,
      direction: 'down',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788076131807',
      x: 955,
      y: 4574,
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788076168345',
      x: 3073,
      y: 2328,
      direction: 'up',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1788076184008',
      x: 3075,
      y: 2482,
      direction: 'left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788076210954',
      x: 461,
      y: 2826,
      direction: 'up',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788076215440',
      x: 462,
      y: 2974,
      direction: 'up',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788076236151',
      x: 461,
      y: 2673,
      direction: 'up_right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
  ],
  textNotes: [
    {
      id: 'note-1788076325210',
      x: 1128,
      y: 6909,
      text: 'WARNING!',
      size: 'xl',
      style: 'monospace',
      color: '#ef4444',
      showBorder: false,
      align: 'center',
    },
    {
      id: 'note-1788076363640',
      x: 1130,
      y: 6994,
      text: 'Extreme gravity\nLand carefully',
      size: 'large',
      style: 'monospace',
      color: '#f8fafc',
      showBorder: false,
      align: 'center',
    },
  ],
  volcanoes: [
    {
      id: 'volcano-1788074387434',
      x: 2717,
      y: 7002,
      width: 260,
      height: 160,
      calderaWidth: 83,
      eruptionHeight: 320,
      eruptionInterval: 6,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
    {
      id: 'volcano-1788075582513',
      x: 2601,
      y: 3074,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 6,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
  ],
  difficultyMode: 'manual',
};

export const OFFICIAL_HYPERION_MAP: CustomMapData = {
  id: 'official-hyperion',
  name: 'Hyperion Mega-Cavern',
  description: 'An immense subterranean expanse stretching across 14 kilometers of interconnected cave chambers, towering crystal spires, and multiple cargo extraction points.',
  author: 'Planetary Federation',
  createdAt: 1788076638275,
  updatedAt: 1788087578694,
  themeId: 'custom',
  customTheme: {
    id: 'theme-hyperion',
    name: 'Hyperion Mega-Cavern Atmosphere',
    skyTop: '#080c18',
    skyBottom: '#101a30',
    terrainFill: '#0d1526',
    terrainBorder: '#38bdf8',
    terrainAccent: '#818cf8',
    gridColor: 'rgba(56, 189, 248, 0.07)',
    dustColor: '#bae6fd',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    starDensity: 1.2,
  },
  terrainLineStyle: 'straight',
  worldWidth: 14400,
  worldHeight: 3200,
  gravity: 3.1,
  airResistance: 0.0016,
  fuelBurnRate: 5.8,
  targetTimeSec: 320,
  difficulty: 'Extreme',
  launchPad: {
    x: 522,
    y: 2771,
    width: 320,
  },
  landingPad: {
    x: 13394,
    y: 2380,
    width: 340,
  },
  groundNodes: [
    { x: 0, y: 854 },
    { x: 150, y: 759 },
    { x: 320, y: 741 },
    { x: 532, y: 755 },
    { x: 450, y: 940 },
    { x: 378, y: 1074 },
    { x: 378, y: 1269 },
    { x: 307, y: 1368 },
    { x: 247, y: 1446 },
    { x: 203, y: 1572 },
    { x: 181, y: 1674 },
    { x: 159, y: 1776 },
    { x: 170, y: 1912 },
    { x: 216, y: 2000 },
    { x: 266, y: 2110 },
    { x: 276, y: 2261 },
    { x: 226, y: 2403 },
    { x: 199, y: 2539 },
    { x: 199, y: 2644 },
    { x: 220, y: 2717 },
    { x: 274, y: 2773 },
    { x: 347, y: 2782 },
    { x: 698, y: 2782 },
    { x: 806, y: 2748 },
    { x: 852, y: 2698 },
    { x: 840, y: 2630 },
    { x: 787, y: 2539 },
    { x: 740, y: 2436 },
    { x: 683, y: 2329 },
    { x: 708, y: 1978 },
    { x: 746, y: 1891 },
    { x: 778, y: 1787 },
    { x: 757, y: 1730 },
    { x: 788, y: 1681 },
    { x: 850, y: 1679 },
    { x: 942, y: 1675 },
    { x: 1055, y: 1679 },
    { x: 1145, y: 1737 },
    { x: 1179, y: 1797 },
    { x: 1163, y: 1864 },
    { x: 1126, y: 1910 },
    { x: 1054, y: 1961 },
    { x: 1020, y: 2007 },
    { x: 993, y: 2087 },
    { x: 1008, y: 2146 },
    { x: 1024, y: 2201 },
    { x: 1052, y: 2279 },
    { x: 1084, y: 2324 },
    { x: 1115, y: 2397 },
    { x: 1139, y: 2453 },
    { x: 1167, y: 2519 },
    { x: 1173, y: 2569 },
    { x: 1179, y: 2628 },
    { x: 1191, y: 2666 },
    { x: 1222, y: 2752 },
    { x: 1292, y: 2804 },
    { x: 1408, y: 2816 },
    { x: 1536, y: 2844 },
    { x: 1736, y: 2824 },
    { x: 1842, y: 2776 },
    { x: 2018, y: 2674 },
    { x: 2156, y: 2786 },
    { x: 2214, y: 2871 },
    { x: 2304, y: 2951 },
    { x: 2432, y: 2954 },
    { x: 2572, y: 2905 },
    { x: 2688, y: 2948 },
    { x: 2876, y: 3002 },
    { x: 3076, y: 2986 },
    { x: 3120, y: 2914 },
    { x: 3200, y: 2941 },
    { x: 3378, y: 2863 },
    { x: 3492, y: 2773 },
    { x: 3656, y: 2760 },
    { x: 3836, y: 2763 },
    { x: 3924, y: 2878 },
    { x: 3968, y: 3001 },
    { x: 4144, y: 2914 },
    { x: 4224, y: 3013 },
    { x: 4364, y: 2876 },
    { x: 4552, y: 2855 },
    { x: 4790, y: 2730 },
    { x: 4930, y: 2669 },
    { x: 5032, y: 2696 },
    { x: 5210, y: 2700 },
    { x: 5254, y: 2763 },
    { x: 5296, y: 2827 },
    { x: 5376, y: 2870 },
    { x: 5504, y: 2857 },
    { x: 5632, y: 2848 },
    { x: 6036, y: 2860 },
    { x: 6156, y: 2640 },
    { x: 6336, y: 2636 },
    { x: 6564, y: 2724 },
    { x: 7026, y: 2706 },
    { x: 7636, y: 2599 },
    { x: 7784, y: 2535 },
    { x: 8288, y: 2583 },
    { x: 8426, y: 2531 },
    { x: 8660, y: 2538 },
    { x: 9128, y: 2656 },
    { x: 9320, y: 2588 },
    { x: 9810, y: 2571 },
    { x: 10300, y: 2647 },
    { x: 10790, y: 2712 },
    { x: 11180, y: 2782 },
    { x: 11502, y: 2663 },
    { x: 11876, y: 2756 },
    { x: 12372, y: 2660 },
    { x: 12792, y: 2753 },
    { x: 12863, y: 2632 },
    { x: 12970, y: 2514 },
    { x: 13071, y: 2417 },
    { x: 13221, y: 2399 },
    { x: 13426, y: 2400 },
    { x: 13631, y: 2389 },
    { x: 13688, y: 2319 },
    { x: 13812, y: 2167 },
    { x: 13884, y: 1921 },
    { x: 14016, y: 2075 },
    { x: 14164, y: 1906 },
    { x: 14400, y: 1866 },
  ],
  ceilingNodes: [
    { x: 0, y: 864 },
    { x: 162, y: 758 },
    { x: 324, y: 740 },
    { x: 526, y: 760 },
    { x: 642, y: 744 },
    { x: 712, y: 650 },
    { x: 838, y: 515 },
    { x: 964, y: 480 },
    { x: 1024, y: 457 },
    { x: 1152, y: 459 },
    { x: 1258, y: 518 },
    { x: 1454, y: 587 },
    { x: 1652, y: 643 },
    { x: 1816, y: 661 },
    { x: 1956, y: 680 },
    { x: 2062, y: 642 },
    { x: 2178, y: 561 },
    { x: 2246, y: 502 },
    { x: 2304, y: 440 },
    { x: 2454, y: 509 },
    { x: 2582, y: 579 },
    { x: 2804, y: 618 },
    { x: 2920, y: 694 },
    { x: 3074, y: 755 },
    { x: 3296, y: 845 },
    { x: 3488, y: 837 },
    { x: 3598, y: 885 },
    { x: 3840, y: 971 },
    { x: 3888, y: 973 },
    { x: 3923, y: 957 },
    { x: 3938, y: 930 },
    { x: 3941, y: 889 },
    { x: 3910, y: 871 },
    { x: 3858, y: 860 },
    { x: 3807, y: 833 },
    { x: 3791, y: 797 },
    { x: 3759, y: 769 },
    { x: 3716, y: 764 },
    { x: 3629, y: 759 },
    { x: 3560, y: 759 },
    { x: 3480, y: 762 },
    { x: 3447, y: 743 },
    { x: 3425, y: 680 },
    { x: 3421, y: 638 },
    { x: 3403, y: 593 },
    { x: 3438, y: 537 },
    { x: 3461, y: 488 },
    { x: 3510, y: 417 },
    { x: 3573, y: 392 },
    { x: 3622, y: 384 },
    { x: 3678, y: 384 },
    { x: 3746, y: 388 },
    { x: 3771, y: 396 },
    { x: 3806, y: 403 },
    { x: 3856, y: 391 },
    { x: 3910, y: 376 },
    { x: 3976, y: 370 },
    { x: 4112, y: 402 },
    { x: 4224, y: 440 },
    { x: 4412, y: 506 },
    { x: 4480, y: 443 },
    { x: 4612, y: 449 },
    { x: 4736, y: 440 },
    { x: 4918, y: 395 },
    { x: 4992, y: 436 },
    { x: 5188, y: 389 },
    { x: 5310, y: 308 },
    { x: 5376, y: 438 },
    { x: 5522, y: 564 },
    { x: 5632, y: 436 },
    { x: 5790, y: 357 },
    { x: 5888, y: 441 },
    { x: 6066, y: 335 },
    { x: 6320, y: 334 },
    { x: 6382, y: 403 },
    { x: 6400, y: 455 },
    { x: 6530, y: 415 },
    { x: 6688, y: 310 },
    { x: 6850, y: 306 },
    { x: 6978, y: 393 },
    { x: 7040, y: 459 },
    { x: 7154, y: 513 },
    { x: 7330, y: 584 },
    { x: 7566, y: 652 },
    { x: 7696, y: 703 },
    { x: 7810, y: 658 },
    { x: 7915, y: 627 },
    { x: 7972, y: 514 },
    { x: 8230, y: 628 },
    { x: 8472, y: 707 },
    { x: 8844, y: 648 },
    { x: 8996, y: 510 },
    { x: 9140, y: 507 },
    { x: 9450, y: 410 },
    { x: 9729, y: 495 },
    { x: 9998, y: 484 },
    { x: 10135, y: 509 },
    { x: 10415, y: 441 },
    { x: 10668, y: 558 },
    { x: 10953, y: 642 },
    { x: 11328, y: 723 },
    { x: 11515, y: 792 },
    { x: 11759, y: 670 },
    { x: 11844, y: 559 },
    { x: 12192, y: 436 },
    { x: 12544, y: 463 },
    { x: 12662, y: 578 },
    { x: 12750, y: 719 },
    { x: 12849, y: 833 },
    { x: 12957, y: 974 },
    { x: 13093, y: 1050 },
    { x: 13295, y: 1154 },
    { x: 13387, y: 1333 },
    { x: 13582, y: 1436 },
    { x: 13638, y: 1550 },
    { x: 13884, y: 1922 },
    { x: 14012, y: 2076 },
    { x: 14170, y: 1912 },
    { x: 14400, y: 1862 },
  ],
  obstacles: [
    {
      id: 'obs-hyperion-1',
      name: 'Geological Formation 1',
      type: 'polygon',
      points: [
        { x: 1300, y: 1050 },
        { x: 1750, y: 1030 },
        { x: 2200, y: 1050 },
        { x: 2160, y: 1160 },
        { x: 1608, y: 1242 },
        { x: 1340, y: 1160 },
      ],
    },
    {
      id: 'obs-hyperion-2',
      name: 'Geological Formation 2',
      type: 'polygon',
      points: [
        { x: 2578, y: 1328 },
        { x: 3468, y: 1268 },
        { x: 4378, y: 1328 },
        { x: 4338, y: 1438 },
        { x: 3478, y: 1450 },
        { x: 2618, y: 1438 },
      ],
    },
    {
      id: 'obs-hyperion-3',
      name: 'Geological Formation 3',
      type: 'polygon',
      points: [
        { x: 4944, y: 1008 },
        { x: 6448, y: 996 },
        { x: 7444, y: 1008 },
        { x: 7404, y: 1118 },
        { x: 6400, y: 1114 },
        { x: 4984, y: 1118 },
      ],
    },
    {
      id: 'obs-hyperion-4',
      name: 'Geological Formation 4',
      type: 'polygon',
      points: [
        { x: 1578, y: 2056 },
        { x: 3078, y: 2016 },
        { x: 4578, y: 2056 },
        { x: 4528, y: 2186 },
        { x: 3002, y: 2222 },
        { x: 1628, y: 2186 },
      ],
    },
    {
      id: 'obs-hyperion-5',
      name: 'Geological Formation 5',
      type: 'polygon',
      points: [
        { x: 5350, y: 1738 },
        { x: 6450, y: 1698 },
        { x: 7644, y: 1632 },
        { x: 7550, y: 1868 },
        { x: 6450, y: 1898 },
        { x: 5380, y: 1868 },
      ],
    },
    {
      id: 'obs-1788083556383',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 684, y: 2321 },
        { x: 660, y: 2331 },
        { x: 527, y: 2241 },
        { x: 618, y: 2267 },
        { x: 563, y: 2204 },
        { x: 644, y: 2253 },
        { x: 643, y: 2201 },
        { x: 690, y: 2252 },
        { x: 689, y: 2253 },
      ],
    },
    {
      id: 'obs-1788084148680',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 3814, y: 840 },
        { x: 3812, y: 786 },
        { x: 3833, y: 712 },
        { x: 3852, y: 782 },
        { x: 3893, y: 667 },
        { x: 3894, y: 788 },
        { x: 3945, y: 716 },
        { x: 3922, y: 837 },
        { x: 3881, y: 866 },
      ],
    },
    {
      id: 'obs-1788084435932',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 4328, y: 1902 },
        { x: 4478, y: 1906 },
        { x: 4558, y: 1996 },
        { x: 4478, y: 2052 },
        { x: 4258, y: 2044 },
        { x: 4236, y: 1998 },
      ],
    },
    {
      id: 'obs-1788084481332',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 4342, y: 1836 },
        { x: 4468, y: 1806 },
        { x: 4526, y: 1894 },
        { x: 4480, y: 1904 },
        { x: 4330, y: 1900 },
        { x: 4278, y: 1882 },
      ],
    },
    {
      id: 'obs-1788084529865',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 3192, y: 1838 },
        { x: 3216, y: 1786 },
        { x: 3480, y: 1878 },
        { x: 3556, y: 2030 },
        { x: 3094, y: 2014 },
        { x: 3072, y: 1920 },
      ],
    },
    {
      id: 'obs-1788086506778',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 1408, y: 2813 },
        { x: 1398, y: 2769 },
        { x: 1433, y: 2689 },
        { x: 1462, y: 2775 },
        { x: 1485, y: 2652 },
        { x: 1496, y: 2777 },
        { x: 1525, y: 2723 },
        { x: 1542, y: 2798 },
        { x: 1499, y: 2835 },
      ],
    },
    {
      id: 'obs-1788086555228',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 1772, y: 2808 },
        { x: 1714, y: 2770 },
        { x: 1717, y: 2690 },
        { x: 1780, y: 2740 },
        { x: 1771, y: 2605 },
        { x: 1816, y: 2716 },
        { x: 1835, y: 2674 },
        { x: 1870, y: 2713 },
        { x: 1843, y: 2778 },
      ],
    },
    {
      id: 'obs-1788086597803',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 1182, y: 2636 },
        { x: 1190, y: 2592 },
        { x: 1227, y: 2522 },
        { x: 1228, y: 2594 },
        { x: 1287, y: 2525 },
        { x: 1262, y: 2622 },
        { x: 1315, y: 2580 },
        { x: 1260, y: 2669 },
        { x: 1197, y: 2676 },
      ],
    },
    {
      id: 'obs-1788086927764',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 6591, y: 1691 },
        { x: 6575, y: 1655 },
        { x: 6598, y: 1521 },
        { x: 6613, y: 1615 },
        { x: 6670, y: 1462 },
        { x: 6651, y: 1607 },
        { x: 6706, y: 1519 },
        { x: 6699, y: 1642 },
        { x: 6676, y: 1691 },
      ],
    },
    {
      id: 'obs-1788086943034',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 6806, y: 1678 },
        { x: 6776, y: 1622 },
        { x: 6785, y: 1522 },
        { x: 6818, y: 1596 },
        { x: 6863, y: 1443 },
        { x: 6866, y: 1576 },
        { x: 6921, y: 1506 },
        { x: 6928, y: 1611 },
        { x: 6903, y: 1676 },
      ],
    },
    {
      id: 'obs-pasted-1788087018655',
      name: 'Crystalline Spire Cluster (Copy)',
      type: 'crystals',
      points: [
        { x: 7087, y: 1660 },
        { x: 7055, y: 1626 },
        { x: 7042, y: 1508 },
        { x: 7097, y: 1568 },
        { x: 7120, y: 1465 },
        { x: 7127, y: 1580 },
        { x: 7194, y: 1530 },
        { x: 7173, y: 1647 },
        { x: 7152, y: 1662 },
      ],
    },
    {
      id: 'obs-1788087089014',
      name: 'SHELF Layer',
      type: 'strata',
      points: [
        { x: 8138, y: 2078 },
        { x: 9738, y: 2078 },
        { x: 9688, y: 2178 },
        { x: 8188, y: 2178 },
      ],
    },
    {
      id: 'obs-pasted-1788087134510',
      name: 'Crystalline Spire Cluster (Copy)',
      type: 'crystals',
      points: [
        { x: 8694, y: 2076 },
        { x: 8678, y: 2040 },
        { x: 8701, y: 1906 },
        { x: 8716, y: 2000 },
        { x: 8773, y: 1847 },
        { x: 8754, y: 1992 },
        { x: 8809, y: 1904 },
        { x: 8802, y: 2027 },
        { x: 8779, y: 2076 },
      ],
    },
    {
      id: 'obs-pasted-1788087174180',
      name: 'Crystalline Spire Cluster (Copy) (Copy)',
      type: 'crystals',
      points: [
        { x: 8513, y: 2074 },
        { x: 8481, y: 2040 },
        { x: 8468, y: 1922 },
        { x: 8523, y: 1982 },
        { x: 8546, y: 1879 },
        { x: 8553, y: 1994 },
        { x: 8620, y: 1944 },
        { x: 8599, y: 2061 },
        { x: 8578, y: 2076 },
      ],
    },
    {
      id: 'obs-1788087192656',
      name: 'MAGMA SHELF Layer',
      type: 'strata',
      points: [
        { x: 8103, y: 1083 },
        { x: 8803, y: 1048 },
        { x: 9403, y: 1098 },
        { x: 10003, y: 1083 },
        { x: 9953, y: 1178 },
        { x: 8153, y: 1178 },
      ],
    },
    {
      id: 'obs-1788087215206',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 9524, y: 1178 },
        { x: 9664, y: 1178 },
        { x: 9644, y: 1286 },
        { x: 9576, y: 1522 },
      ],
    },
    {
      id: 'obs-1788087235271',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 9720, y: 1175 },
        { x: 9860, y: 1175 },
        { x: 9850, y: 1203 },
        { x: 9738, y: 1459 },
      ],
    },
    {
      id: 'obs-1788087248422',
      name: 'SPIRE Layer',
      type: 'spire',
      points: [
        { x: 9331, y: 1173 },
        { x: 9471, y: 1173 },
        { x: 9433, y: 1445 },
        { x: 9389, y: 1311 },
      ],
    },
    {
      id: 'obs-1788087306264',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 10541, y: 1179 },
        { x: 10941, y: 1139 },
        { x: 11341, y: 1179 },
        { x: 11301, y: 1269 },
        { x: 10935, y: 1391 },
        { x: 10581, y: 1269 },
      ],
    },
    {
      id: 'obs-1788087311625',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 11714, y: 1072 },
        { x: 12092, y: 906 },
        { x: 12608, y: 1058 },
        { x: 12512, y: 1280 },
        { x: 12114, y: 1192 },
        { x: 11754, y: 1162 },
      ],
    },
    {
      id: 'obs-1788087314096',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 10666, y: 1970 },
        { x: 11016, y: 1786 },
        { x: 11466, y: 1970 },
        { x: 11426, y: 2060 },
        { x: 11066, y: 2090 },
        { x: 10610, y: 2254 },
      ],
    },
    {
      id: 'obs-1788087316414',
      name: 'ARCH Layer',
      type: 'arch',
      points: [
        { x: 11731, y: 1564 },
        { x: 12177, y: 1704 },
        { x: 12577, y: 1744 },
        { x: 12537, y: 1834 },
        { x: 12177, y: 1864 },
        { x: 11817, y: 1834 },
      ],
    },
    {
      id: 'obs-1788087480353',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 11030, y: 2756 },
        { x: 11004, y: 2682 },
        { x: 11011, y: 2584 },
        { x: 11068, y: 2700 },
        { x: 11075, y: 2501 },
        { x: 11104, y: 2674 },
        { x: 11135, y: 2550 },
        { x: 11164, y: 2673 },
        { x: 11095, y: 2768 },
      ],
    },
    {
      id: 'obs-1788087504496',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 11320, y: 2732 },
        { x: 11268, y: 2656 },
        { x: 11289, y: 2534 },
        { x: 11324, y: 2628 },
        { x: 11341, y: 2471 },
        { x: 11362, y: 2636 },
        { x: 11401, y: 2520 },
        { x: 11430, y: 2629 },
        { x: 11413, y: 2704 },
      ],
    },
    {
      id: 'obs-1788087528612',
      name: 'Crystalline Spire Cluster',
      type: 'crystals',
      points: [
        { x: 11637, y: 2700 },
        { x: 11609, y: 2630 },
        { x: 11648, y: 2546 },
        { x: 11669, y: 2638 },
        { x: 11700, y: 2483 },
        { x: 11723, y: 2648 },
        { x: 11760, y: 2532 },
        { x: 11779, y: 2657 },
        { x: 11710, y: 2712 },
      ],
    },
  ],
  fuelPickups: [
    { id: 'fuel-luna-2', x: 6200, y: 680, amount: 65 },
    { id: 'fuel-1788087376530', x: 11160, y: 990, amount: 100 },
    { id: 'fuel-1788087380413', x: 9811, y: 947, amount: 100 },
    { id: 'fuel-1788087396132', x: 2977, y: 2897, amount: 100 },
  ],
  cargoPlatforms: [
    {
      id: 'cargo-pickup-1788084078619',
      type: 'pickup',
      x: 3599,
      y: 749,
      width: 140,
      weightClass: 'medium',
      cargoType: 'plasma',
      label: 'PLASMA BATTERY RECHARGE HUB',
    },
    {
      id: 'vehicle-depot-1788084419099',
      type: 'vehicle_depot',
      x: 3933,
      y: 2026,
      width: 480,
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1788086734237',
      type: 'pickup',
      x: 6245,
      y: 2627,
      width: 140,
      weightClass: 'heavy',
      cargoType: 'standard',
      label: 'HEAVY CARGO DEPOT',
    },
    {
      id: 'vehicle-depot-1788087103963',
      type: 'vehicle_depot',
      x: 9133,
      y: 2058,
      width: 480,
      label: 'SURFACE VEHICLE & ROVER LOGISTICS BASE',
      truckCount: 2,
    },
    {
      id: 'cargo-pickup-1788087889218',
      type: 'pickup',
      x: 6341,
      y: 1691,
      width: 140,
      weightClass: 'heavy',
      cargoType: 'cryogenic',
      label: 'CRYO SPECIMEN DOCK',
    },
  ],
  signposts: [
    {
      id: 'sign-1788087917558',
      x: 966,
      y: 652,
      direction: 'right',
      targetType: 'landing',
      targetName: 'PRIMARY BASE LZ',
      subText: 'EXPEDITION OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1788087927546',
      x: 968,
      y: 810,
      direction: 'right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788087933125',
      x: 965,
      y: 977,
      direction: 'down_right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788087971392',
      x: 1392,
      y: 1831,
      direction: 'right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788087986972',
      x: 4549,
      y: 1011,
      direction: 'up_left',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788087994332',
      x: 4545,
      y: 866,
      direction: 'right',
      targetType: 'landing',
      targetName: 'BASE LZ',
      subText: 'PRIMARY OUTPOST',
      color: '#22c55e',
    },
    {
      id: 'sign-1788087999745',
      x: 4554,
      y: 1152,
      direction: 'down_left',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788088038022',
      x: 4544,
      y: 1294,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788088049260',
      x: 5086,
      y: 1997,
      direction: 'down_right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788088070608',
      x: 4547,
      y: 1437,
      direction: 'right',
      targetType: 'pickup',
      targetName: 'CARGO VAULT',
      subText: 'SUPPLY POD DEPOT',
      color: '#f59e0b',
    },
    {
      id: 'sign-1788088105278',
      x: 7767,
      y: 1207,
      direction: 'down_right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
    {
      id: 'sign-1788088114447',
      x: 7759,
      y: 2216,
      direction: 'up_right',
      targetType: 'vehicle_depot',
      targetName: 'ROVER DEPOT',
      subText: 'VEHICLE BAY',
      color: '#38bdf8',
    },
  ],
  textNotes: [],
  difficultyMode: 'auto',
  volcanoes: [
    {
      id: 'volcano-1788083724200',
      x: 924,
      y: 1689,
      width: 260,
      height: 160,
      calderaWidth: 83,
      eruptionHeight: 320,
      eruptionInterval: 4.5,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
    {
      id: 'volcano-1788086780454',
      x: 5837,
      y: 2849,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 6,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
    {
      id: 'volcano-1788086805870',
      x: 6673,
      y: 2711,
      width: 180,
      height: 110,
      calderaWidth: 58,
      eruptionHeight: 220,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
    {
      id: 'volcano-1788087357802',
      x: 12396,
      y: 2694,
      width: 380,
      height: 240,
      calderaWidth: 122,
      eruptionHeight: 480,
      eruptionInterval: 10,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
    {
      id: 'volcano-1788087564953',
      x: 10766,
      y: 1965,
      width: 180,
      height: 110,
      calderaWidth: 58,
      eruptionHeight: 220,
      eruptionInterval: 3,
      eruptionDuration: 1.8,
      colorTheme: 'cryo',
    },
  ],
};

export const STARTER_TEMPLATES: CustomMapData[] = [
  OFFICIAL_LUNA_MAP,
  OFFICIAL_TITAN_MAP,
  OFFICIAL_ARES_MAP,
  OFFICIAL_VESTA_MAP,
  OFFICIAL_PHOBOS_MAP,
  OFFICIAL_EUROPA_MAP,
  OFFICIAL_CERES_MAP,
  OFFICIAL_GLACIES_MAP,
  OFFICIAL_VESPERA_MAP,
  OFFICIAL_CALYPSO_MAP,
  OFFICIAL_ZEPHYR_MAP,
  OFFICIAL_TARTARUS_MAP,
  OFFICIAL_HYPERION_MAP,
  {
    id: 'starter-abyssal-cavern',
    name: 'Abyssal Chasm',
    description: 'A subterranean cavern system with an upper skyway, mid-level nexus, and deep mining abyss.',
    author: 'Chief Engineer',
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    worldWidth: 7600,
    worldHeight: 2800,
    gravity: 3.2,
    airResistance: 0.001,
    fuelBurnRate: 20,
    targetTimeSec: 45,
    difficulty: 'Medium',
    themeId: 'blue',
    terrainLineStyle: 'straight',
    launchPad: { x: 450, y: 650, width: 240 },
    landingPad: { x: 7000, y: 1350, width: 260 },
    groundNodes: [
      { x: 0, y: 650 },
      { x: 750, y: 670 },
      { x: 1400, y: 1500 },
      { x: 2600, y: 2450 },
      { x: 3800, y: 2450 },
      { x: 5000, y: 1850 },
      { x: 6200, y: 1350 },
      { x: 7600, y: 1350 },
    ],
    ceilingNodes: [
      { x: 0, y: 80 },
      { x: 600, y: 100 },
      { x: 1800, y: 320 },
      { x: 3600, y: 260 },
      { x: 5400, y: 340 },
      { x: 6600, y: 120 },
      { x: 7600, y: 80 },
    ],
    cargoPlatforms: [
      { id: 'cargo-pk-abyss', type: 'pickup', x: 2800, y: 2430, width: 240, label: 'Deep Abyss Vault' },
    ],
    signposts: [
      {
        id: 'sign-1',
        x: 1700,
        y: 800,
        direction: 'down_right',
        targetType: 'pickup',
        targetName: 'DEEP ABYSS VAULT',
        subText: 'MINING DEPOT (TIER 3)',
        color: '#f59e0b',
      },
      {
        id: 'sign-2',
        x: 4800,
        y: 1100,
        direction: 'right',
        targetType: 'landing',
        targetName: 'PRIMARY BASE LZ',
        subText: 'RESEARCH STATION OUTPOST',
        color: '#22c55e',
      },
    ],
    obstacles: [
      {
        id: 'arch-1',
        name: 'Skyway Rock Shelf (Tier 1)',
        type: 'arch',
        points: [
          { x: 1200, y: 920 },
          { x: 2400, y: 880 },
          { x: 3400, y: 920 },
          { x: 3350, y: 1040 },
          { x: 2400, y: 1070 },
          { x: 1250, y: 1040 },
        ],
      },
      {
        id: 'shelf-mid',
        name: 'Mid-Level Nexus Shelf (Tier 2)',
        type: 'strata',
        points: [
          { x: 4200, y: 1270 },
          { x: 5800, y: 1270 },
          { x: 5750, y: 1390 },
          { x: 4250, y: 1390 },
        ],
      },
      {
        id: 'pillar-1',
        name: 'Central Monolith Support',
        type: 'pillar',
        points: [
          { x: 3600, y: 1040 },
          { x: 3760, y: 1040 },
          { x: 3740, y: 1850 },
          { x: 3620, y: 1850 },
        ],
      },
      {
        id: 'arch-2',
        name: 'Deep Abyss Divider',
        type: 'arch',
        points: [
          { x: 1800, y: 1850 },
          { x: 3200, y: 1800 },
          { x: 4000, y: 1850 },
          { x: 3950, y: 1960 },
          { x: 3200, y: 1990 },
          { x: 1850, y: 1960 },
        ],
      },
    ],
    fuelPickups: [
      { id: 'fuel-1', x: 2200, y: 550, amount: 70 },
      { id: 'fuel-2', x: 2400, y: 1450, amount: 80 },
      { id: 'fuel-3', x: 1800, y: 2250, amount: 90 },
      { id: 'fuel-4', x: 5600, y: 850, amount: 75 },
    ],
  },
  {
    id: 'starter-floating-islands',
    name: 'Floating Archipelagos',
    description: 'A low-gravity micro-world featuring multi-tier subterranean caverns and floating rocky plateaus.',
    author: 'Astro Surveyor',
    createdAt: 1700000001000,
    updatedAt: 1700000001000,
    worldWidth: 7000,
    worldHeight: 2400,
    gravity: 1.8,
    airResistance: 0.0005,
    fuelBurnRate: 18,
    targetTimeSec: 42,
    difficulty: 'Easy',
    themeId: 'emerald',
    launchPad: { x: 420, y: 850, width: 240 },
    landingPad: { x: 6450, y: 750, width: 240 },
    groundNodes: [
      { x: 0, y: 850 },
      { x: 750, y: 880 },
      { x: 1600, y: 1750 },
      { x: 3400, y: 2150 },
      { x: 5200, y: 1750 },
      { x: 6100, y: 750 },
      { x: 7000, y: 750 },
    ],
    ceilingNodes: [
      { x: 0, y: 70 },
      { x: 1800, y: 220 },
      { x: 3600, y: 180 },
      { x: 5400, y: 240 },
      { x: 7000, y: 70 },
    ],
    cargoPlatforms: [
      { id: 'cargo-pk-islands', type: 'pickup', x: 3400, y: 2130, width: 240, label: 'Crystal Basin Depot' },
    ],
    obstacles: [
      {
        id: 'island-1',
        name: 'Floating Ridge Alpha',
        type: 'island',
        points: [
          { x: 1500, y: 750 },
          { x: 2400, y: 720 },
          { x: 2700, y: 800 },
          { x: 2300, y: 920 },
          { x: 1400, y: 890 },
        ],
      },
      {
        id: 'island-2',
        name: 'Central Cavern Plateau',
        type: 'island',
        points: [
          { x: 3100, y: 950 },
          { x: 4200, y: 900 },
          { x: 4400, y: 1020 },
          { x: 3900, y: 1120 },
          { x: 3000, y: 1080 },
        ],
      },
      {
        id: 'island-3',
        name: 'Floating Sanctuary Platform',
        type: 'island',
        points: [
          { x: 4600, y: 1100 },
          { x: 5400, y: 1080 },
          { x: 5500, y: 1200 },
          { x: 4550, y: 1220 },
        ],
      },
      {
        id: 'arch-lower',
        name: 'Lower Crystal Gateway',
        type: 'arch',
        points: [
          { x: 2000, y: 1550 },
          { x: 2900, y: 1500 },
          { x: 3500, y: 1550 },
          { x: 3450, y: 1660 },
          { x: 2900, y: 1690 },
          { x: 2050, y: 1660 },
        ],
      },
    ],
    fuelPickups: [
      { id: 'fuel-1', x: 2000, y: 480, amount: 65 },
      { id: 'fuel-2', x: 3700, y: 650, amount: 65 },
      { id: 'fuel-3', x: 1800, y: 1350, amount: 75 },
      { id: 'fuel-4', x: 4500, y: 1600, amount: 80 },
    ],
  },
  {
    id: 'starter-volcanic-trench',
    name: 'Infernal Gorge',
    description: 'High-gravity volcanic fissure with hanging magma bridges, multi-level basalt shelves, and deep caldera extraction.',
    author: 'Magma Division',
    createdAt: 1700000002000,
    updatedAt: 1700000002000,
    worldWidth: 7200,
    worldHeight: 2600,
    gravity: 4.8,
    airResistance: 0.002,
    fuelBurnRate: 24,
    targetTimeSec: 36,
    difficulty: 'Hard',
    themeId: 'volcanic',
    launchPad: { x: 420, y: 600, width: 240 },
    landingPad: { x: 6700, y: 600, width: 240 },
    groundNodes: [
      { x: 0, y: 600 },
      { x: 750, y: 630 },
      { x: 1500, y: 1800 },
      { x: 2800, y: 2250 },
      { x: 4400, y: 2250 },
      { x: 5600, y: 1750 },
      { x: 6300, y: 600 },
      { x: 7200, y: 600 },
    ],
    ceilingNodes: [
      { x: 0, y: 60 },
      { x: 1800, y: 240 },
      { x: 3600, y: 200 },
      { x: 5400, y: 260 },
      { x: 7200, y: 60 },
    ],
    cargoPlatforms: [
      { id: 'cargo-pk-volcanic', type: 'pickup', x: 3600, y: 2230, width: 240, label: 'Magma Extraction Pad' },
    ],
    obstacles: [
      {
        id: 'spire-1',
        name: 'Hanging Stalactite',
        type: 'spire',
        points: [
          { x: 2400, y: 200 },
          { x: 2550, y: 200 },
          { x: 2490, y: 800 },
          { x: 2460, y: 800 },
        ],
      },
      {
        id: 'arch-1',
        name: 'Upper Magma Bridge (Tier 1)',
        type: 'arch',
        points: [
          { x: 1200, y: 950 },
          { x: 2300, y: 910 },
          { x: 3200, y: 950 },
          { x: 3150, y: 1060 },
          { x: 2300, y: 1090 },
          { x: 1250, y: 1060 },
        ],
      },
      {
        id: 'shelf-2',
        name: 'Citadel Mid-Shelf (Tier 2)',
        type: 'strata',
        points: [
          { x: 4400, y: 1070 },
          { x: 5800, y: 1070 },
          { x: 5750, y: 1190 },
          { x: 4450, y: 1190 },
        ],
      },
      {
        id: 'pillar-magma',
        name: 'Basalt Magma Column',
        type: 'pillar',
        points: [
          { x: 2900, y: 1060 },
          { x: 3040, y: 1060 },
          { x: 3010, y: 1800 },
          { x: 2930, y: 1800 },
        ],
      },
    ],
    fuelPickups: [
      { id: 'fuel-1', x: 2100, y: 650, amount: 80 },
      { id: 'fuel-2', x: 2100, y: 1450, amount: 85 },
      { id: 'fuel-3', x: 4200, y: 1700, amount: 90 },
      { id: 'fuel-4', x: 5200, y: 750, amount: 80 },
    ],
  },
  {
    id: 'starter-triple-tier-mines',
    name: 'Tri-Tier Subterranean Mines',
    description: 'A 3-level vertical cavern complex with upper skyway, mid-level transport tunnel, and deep magma abyss.',
    author: 'Mining Guild',
    createdAt: 1700000003000,
    updatedAt: 1700000003000,
    worldWidth: 9600,
    worldHeight: 4800,
    gravity: 3.4,
    airResistance: 0.001,
    fuelBurnRate: 20,
    targetTimeSec: 60,
    difficulty: 'Hard',
    themeId: 'violet',
    launchPad: { x: 500, y: 900, width: 240 },
    landingPad: { x: 8800, y: 4100, width: 260 },
    groundNodes: [
      { x: 0, y: 900 },
      { x: 900, y: 900 },
      { x: 1400, y: 1600 },
      { x: 2800, y: 2200 },
      { x: 4500, y: 3400 },
      { x: 6200, y: 4400 },
      { x: 8400, y: 4100 },
      { x: 9600, y: 4100 },
    ],
    ceilingNodes: [
      { x: 0, y: 100 },
      { x: 2400, y: 200 },
      { x: 4800, y: 300 },
      { x: 7200, y: 200 },
      { x: 9600, y: 100 },
    ],
    cargoPlatforms: [
      { id: 'cargo-pk-mines', type: 'pickup', x: 5400, y: 3380, width: 240, label: 'Deep Mine Vault' },
    ],
    obstacles: [
      {
        id: 'tier-1-shelf',
        name: 'Level 1 Mid Cavern Shelf',
        type: 'strata',
        points: [
          { x: 1200, y: 1350 },
          { x: 4200, y: 1300 },
          { x: 4600, y: 1450 },
          { x: 4550, y: 1600 },
          { x: 3900, y: 1480 },
          { x: 1250, y: 1480 },
        ],
      },
      {
        id: 'tier-2-shelf',
        name: 'Level 2 Deep Abyss Divider',
        type: 'strata',
        points: [
          { x: 3200, y: 2750 },
          { x: 6800, y: 2700 },
          { x: 7400, y: 2900 },
          { x: 7350, y: 3050 },
          { x: 6700, y: 2880 },
          { x: 3250, y: 2880 },
        ],
      },
      {
        id: 'pillar-shaft-1',
        name: 'Upper Support Column',
        type: 'pillar',
        points: [
          { x: 2500, y: 300 },
          { x: 2680, y: 300 },
          { x: 2620, y: 1300 },
          { x: 2480, y: 1300 },
        ],
      },
      {
        id: 'arch-overhang-1',
        name: 'Abyss Overhang Arch',
        type: 'arch',
        points: [
          { x: 5000, y: 3800 },
          { x: 5800, y: 3650 },
          { x: 6200, y: 3750 },
          { x: 6150, y: 3900 },
          { x: 5750, y: 3820 },
          { x: 5050, y: 3950 },
        ],
      },
    ],
    fuelPickups: [
      { id: 'fuel-t1', x: 2800, y: 900, amount: 80 },
      { id: 'fuel-t2', x: 5200, y: 2200, amount: 85 },
      { id: 'fuel-t3', x: 6200, y: 3300, amount: 100 },
    ],
  },
  {
    id: 'starter-vertical-abyss',
    name: 'Towering 8,000m Vertical Shaft',
    description: 'An extreme high-altitude descent through a gigantic vertical fissure with staggered cave shelves.',
    author: 'Deep Descent Program',
    createdAt: 1700000004000,
    updatedAt: 1700000004000,
    worldWidth: 7200,
    worldHeight: 8000,
    gravity: 3.8,
    airResistance: 0.0012,
    fuelBurnRate: 20,
    targetTimeSec: 75,
    difficulty: 'Extreme',
    themeId: 'volcanic',
    launchPad: { x: 800, y: 750, width: 260 },
    landingPad: { x: 6200, y: 7400, width: 280 },
    groundNodes: [
      { x: 0, y: 750 },
      { x: 1200, y: 750 },
      { x: 1600, y: 2200 },
      { x: 2200, y: 4400 },
      { x: 3400, y: 6200 },
      { x: 5400, y: 7400 },
      { x: 7200, y: 7400 },
    ],
    ceilingNodes: [
      { x: 0, y: 120 },
      { x: 2400, y: 180 },
      { x: 4800, y: 220 },
      { x: 7200, y: 120 },
    ],
    cargoPlatforms: [
      { id: 'cargo-pk-vert', type: 'pickup', x: 2800, y: 5730, width: 260, label: 'Abyssal Reactor Core' },
    ],
    obstacles: [
      {
        id: 'vert-shelf-1',
        name: 'Upper Observation Plateau',
        type: 'strata',
        points: [
          { x: 2400, y: 1800 },
          { x: 5600, y: 1750 },
          { x: 5800, y: 1900 },
          { x: 5750, y: 2050 },
          { x: 5300, y: 1920 },
          { x: 2450, y: 1950 },
        ],
      },
      {
        id: 'vert-shelf-2',
        name: 'Mid-Abyss Rock Bridge',
        type: 'strata',
        points: [
          { x: 1500, y: 3900 },
          { x: 4600, y: 3850 },
          { x: 5100, y: 4000 },
          { x: 5050, y: 4150 },
          { x: 4500, y: 4020 },
          { x: 1550, y: 4050 },
        ],
      },
      {
        id: 'vert-shelf-3',
        name: 'Deep Magma Barrier',
        type: 'strata',
        points: [
          { x: 2200, y: 5800 },
          { x: 6200, y: 5750 },
          { x: 6700, y: 5900 },
          { x: 6650, y: 6050 },
          { x: 6100, y: 5920 },
          { x: 2250, y: 5950 },
        ],
      },
    ],
    fuelPickups: [
      { id: 'vert-fuel-1', x: 3800, y: 1400, amount: 80 },
      { id: 'vert-fuel-2', x: 2800, y: 3400, amount: 85 },
      { id: 'vert-fuel-3', x: 4200, y: 5300, amount: 100 },
      { id: 'vert-fuel-4', x: 1800, y: 6800, amount: 90 },
    ],
  },
];

export function resetCustomMapsToDefaults(): CustomMapData[] {
  try {
    // Clear all storage keys related to custom maps
    localStorage.removeItem('gravity_lander_custom_maps_v1');
    localStorage.removeItem('gravity_lander_custom_maps_v2');
    localStorage.removeItem('gravity_lander_custom_maps_v3');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_TEMPLATES));

    // Reset last played planet to default initial planet 'luna'
    try {
      localStorage.removeItem('gravity_lander_last_planet_id_v2');
    } catch {}

    window.dispatchEvent(new CustomEvent('gravity_lander_maps_changed'));
    console.log('[CustomMapsStorage] Factory reset completed: All official planets, custom maps, and starter templates restored.');
    return STARTER_TEMPLATES;
  } catch (e) {
    console.error('Failed to reset custom maps:', e);
    return STARTER_TEMPLATES;
  }
}

export function getSavedCustomMaps(): CustomMapData[] {
  try {
    // Clear obsolete legacy keys if present
    try {
      localStorage.removeItem('gravity_lander_custom_maps_v1');
      localStorage.removeItem('gravity_lander_custom_maps_v2');
      localStorage.removeItem('gravity_lander_custom_maps_v3');
    } catch {}

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(STARTER_TEMPLATES));
      return STARTER_TEMPLATES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const syncOfficialMap = (officialMap: CustomMapData) => {
        const cleanId = officialMap.id.replace(/^official-/, '');
        const idx = parsed.findIndex((m: CustomMapData) => m.id === officialMap.id || m.id === cleanId);
        if (idx === -1) {
          parsed.unshift(officialMap);
        } else if (parsed[idx].updatedAt < officialMap.updatedAt) {
          parsed[idx] = officialMap;
        }
      };

      // Ensure official default maps are updated to latest versions if not customized
      syncOfficialMap(OFFICIAL_HYPERION_MAP);
      syncOfficialMap(OFFICIAL_TARTARUS_MAP);
      syncOfficialMap(OFFICIAL_ZEPHYR_MAP);
      syncOfficialMap(OFFICIAL_CALYPSO_MAP);
      syncOfficialMap(OFFICIAL_VESPERA_MAP);
      syncOfficialMap(OFFICIAL_GLACIES_MAP);
      syncOfficialMap(OFFICIAL_CERES_MAP);
      syncOfficialMap(OFFICIAL_EUROPA_MAP);
      syncOfficialMap(OFFICIAL_PHOBOS_MAP);
      syncOfficialMap(OFFICIAL_VESTA_MAP);
      syncOfficialMap(OFFICIAL_ARES_MAP);
      syncOfficialMap(OFFICIAL_TITAN_MAP);
      syncOfficialMap(OFFICIAL_LUNA_MAP);

      return parsed;
    }
    return STARTER_TEMPLATES;
  } catch (e) {
    console.error('Failed to load custom maps:', e);
    return STARTER_TEMPLATES;
  }
}

/**
 * Returns any saved user custom map that overrides an official campaign planet,
 * e.g. when a user edits Luna, Titan, Ares, Vesta, Phobos, Europa, Ceres, Glacies, Vespera, Calypso, Zephyr, Tartarus, or Hyperion and saves it.
 */
export function getSavedMapForPlanet(planetId: string): CustomMapData | null {
  try {
    const maps = getSavedCustomMaps();
    const cleanId = planetId.replace(/^official-/, '').replace(/^custom-/, '');
    const match = maps.find(
      (m) =>
        m.id === `official-${cleanId}` ||
        m.id === cleanId ||
        m.id === planetId ||
        m.id === `official-${planetId}` ||
        m.id === `custom-${planetId}`
    );
    if (match) {
      console.log(`[CustomMapsStorage] Found saved map override for "${planetId}":`, match.id, match.name);
      return match;
    }
    if (cleanId === 'luna') {
      return OFFICIAL_LUNA_MAP;
    }
    if (cleanId === 'titan') {
      return OFFICIAL_TITAN_MAP;
    }
    if (cleanId === 'ares') {
      return OFFICIAL_ARES_MAP;
    }
    if (cleanId === 'vesta') {
      return OFFICIAL_VESTA_MAP;
    }
    if (cleanId === 'phobos') {
      return OFFICIAL_PHOBOS_MAP;
    }
    if (cleanId === 'europa') {
      return OFFICIAL_EUROPA_MAP;
    }
    if (cleanId === 'ceres') {
      return OFFICIAL_CERES_MAP;
    }
    if (cleanId === 'glacies') {
      return OFFICIAL_GLACIES_MAP;
    }
    if (cleanId === 'vespera') {
      return OFFICIAL_VESPERA_MAP;
    }
    if (cleanId === 'calypso') {
      return OFFICIAL_CALYPSO_MAP;
    }
    if (cleanId === 'zephyr') {
      return OFFICIAL_ZEPHYR_MAP;
    }
    if (cleanId === 'tartarus') {
      return OFFICIAL_TARTARUS_MAP;
    }
    if (cleanId === 'hyperion') {
      return OFFICIAL_HYPERION_MAP;
    }
    return null;
  } catch (e) {
    console.error('[CustomMapsStorage] Error in getSavedMapForPlanet:', e);
    if (planetId === 'luna' || planetId === 'official-luna') return OFFICIAL_LUNA_MAP;
    if (planetId === 'titan' || planetId === 'official-titan') return OFFICIAL_TITAN_MAP;
    if (planetId === 'ares' || planetId === 'official-ares') return OFFICIAL_ARES_MAP;
    if (planetId === 'vesta' || planetId === 'official-vesta') return OFFICIAL_VESTA_MAP;
    if (planetId === 'phobos' || planetId === 'official-phobos') return OFFICIAL_PHOBOS_MAP;
    if (planetId === 'europa' || planetId === 'official-europa') return OFFICIAL_EUROPA_MAP;
    if (planetId === 'ceres' || planetId === 'official-ceres') return OFFICIAL_CERES_MAP;
    if (planetId === 'glacies' || planetId === 'official-glacies') return OFFICIAL_GLACIES_MAP;
    if (planetId === 'vespera' || planetId === 'official-vespera') return OFFICIAL_VESPERA_MAP;
    if (planetId === 'calypso' || planetId === 'official-calypso') return OFFICIAL_CALYPSO_MAP;
    if (planetId === 'zephyr' || planetId === 'official-zephyr') return OFFICIAL_ZEPHYR_MAP;
    if (planetId === 'tartarus' || planetId === 'official-tartarus') return OFFICIAL_TARTARUS_MAP;
    if (planetId === 'hyperion' || planetId === 'official-hyperion') return OFFICIAL_HYPERION_MAP;
    return null;
  }
}

/**
 * Checks whether a map ID refers to an official campaign planet (Luna, Titan, Ares, Vesta, Phobos, Europa, Ceres, Glacies, Vespera, Calypso, Zephyr, Tartarus, Hyperion).
 * Official maps cannot be deleted from the game roster, though custom user edits can be reverted to defaults.
 */
export function isOfficialMap(mapId: string): boolean {
  if (!mapId) return false;
  const cleanId = mapId.replace(/^official-/, '').replace(/^custom-/, '');
  return ['luna', 'titan', 'ares', 'vesta', 'phobos', 'europa', 'ceres', 'glacies', 'vespera', 'calypso', 'zephyr', 'tartarus', 'hyperion'].includes(cleanId);
}

/**
 * Returns the default factory CustomMapData for an official planet.
 */
export function getOfficialDefaultMap(planetId: string): CustomMapData | null {
  const cleanId = planetId.replace(/^official-/, '').replace(/^custom-/, '');
  if (cleanId === 'luna') return OFFICIAL_LUNA_MAP;
  if (cleanId === 'titan') return OFFICIAL_TITAN_MAP;
  if (cleanId === 'ares') return OFFICIAL_ARES_MAP;
  if (cleanId === 'vesta') return OFFICIAL_VESTA_MAP;
  if (cleanId === 'phobos') return OFFICIAL_PHOBOS_MAP;
  if (cleanId === 'europa') return OFFICIAL_EUROPA_MAP;
  if (cleanId === 'ceres') return OFFICIAL_CERES_MAP;
  if (cleanId === 'glacies') return OFFICIAL_GLACIES_MAP;
  if (cleanId === 'vespera') return OFFICIAL_VESPERA_MAP;
  if (cleanId === 'calypso') return OFFICIAL_CALYPSO_MAP;
  if (cleanId === 'zephyr') return OFFICIAL_ZEPHYR_MAP;
  if (cleanId === 'tartarus') return OFFICIAL_TARTARUS_MAP;
  if (cleanId === 'hyperion') return OFFICIAL_HYPERION_MAP;
  return null;
}

/**
 * Reverts any custom user edits made to an official campaign map back to its factory default.
 */
export function revertOfficialMapToDefault(planetId: string): CustomMapData | null {
  try {
    const defaultMap = getOfficialDefaultMap(planetId);
    if (!defaultMap) return null;
    saveCustomMap(defaultMap);
    window.dispatchEvent(new CustomEvent('gravity_lander_maps_changed'));
    return defaultMap;
  } catch (e) {
    console.error('Failed to revert official map to default:', e);
    return null;
  }
}

export function saveCustomMap(mapData: CustomMapData): void {
  try {
    console.log('[CustomMapsStorage] Saving map:', mapData.id, mapData.name);
    const maps = getSavedCustomMaps();
    const existingIndex = maps.findIndex((m) => m.id === mapData.id);

    // If the map is in manual difficulty mode, respect the user's chosen difficulty; otherwise calculate dynamically
    const finalDifficulty =
      mapData.difficultyMode === 'manual' && mapData.difficulty
        ? mapData.difficulty
        : calculateMapDifficulty(mapData);

    const updated: CustomMapData = {
      ...mapData,
      difficulty: finalDifficulty,
      updatedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      maps[existingIndex] = updated;
    } else {
      maps.unshift(updated);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
    console.log('[CustomMapsStorage] Map saved successfully. Difficulty:', finalDifficulty, '(mode:', mapData.difficultyMode || 'auto', ') Total maps:', maps.length);
    // Dispatch custom event to notify all components to refresh custom maps immediately
    window.dispatchEvent(new CustomEvent('gravity_lander_maps_changed', { detail: updated }));
  } catch (e) {
    console.error('Failed to save custom map:', e);
  }
}

export function deleteCustomMap(mapId: string): CustomMapData[] {
  try {
    if (isOfficialMap(mapId)) {
      // Official maps cannot be deleted from the universe roster.
      // Revert user customizations to official factory defaults instead.
      console.warn(`[CustomMapsStorage] Official map "${mapId}" cannot be deleted. Reverting user overrides to default.`);
      revertOfficialMapToDefault(mapId);
      return getSavedCustomMaps();
    }

    const maps = getSavedCustomMaps().filter((m) => m.id !== mapId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
    window.dispatchEvent(new CustomEvent('gravity_lander_maps_changed'));
    return maps;
  } catch (e) {
    console.error('Failed to delete custom map:', e);
    return [];
  }
}

export function duplicateCustomMap(mapId: string): CustomMapData | null {
  try {
    const maps = getSavedCustomMaps();
    const source = maps.find((m) => m.id === mapId);
    if (!source) return null;

    const copy: CustomMapData = {
      ...source,
      id: `custom-map-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: `${source.name} (Copy)`,
      difficulty: calculateMapDifficulty(source),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    maps.unshift(copy);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(maps));
    return copy;
  } catch (e) {
    console.error('Failed to duplicate custom map:', e);
    return null;
  }
}

const PALETTES_STORAGE_KEY = 'gravity_lander_custom_palettes_v1';

export function getSavedCustomPalettes(): CustomMapTheme[] {
  try {
    const raw = localStorage.getItem(PALETTES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load custom palettes:', e);
    return [];
  }
}

export function saveCustomPalette(theme: CustomMapTheme): void {
  try {
    const list = getSavedCustomPalettes();
    const idx = list.findIndex((p) => p.id === theme.id);
    if (idx >= 0) {
      list[idx] = theme;
    } else {
      list.push(theme);
    }
    localStorage.setItem(PALETTES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('gravity_lander_palettes_changed', { detail: theme }));
  } catch (e) {
    console.error('Failed to save custom palette:', e);
  }
}

export function deleteCustomPalette(paletteId: string): void {
  try {
    const list = getSavedCustomPalettes().filter((p) => p.id !== paletteId);
    localStorage.setItem(PALETTES_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('gravity_lander_palettes_changed'));
  } catch (e) {
    console.error('Failed to delete custom palette:', e);
  }
}

export function createBlankCustomMap(name = 'New Custom Map'): CustomMapData {
  const blankMap: CustomMapData = {
    id: `custom-map-${Date.now()}`,
    name,
    description: 'A completely blank canvas waiting for your creation.',
    author: 'You',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    worldWidth: 8000,
    worldHeight: 3000,
    gravity: 3.5,
    airResistance: 0.001,
    fuelBurnRate: 15,
    targetTimeSec: 60,
    difficulty: 'Medium',
    themeId: 'luna',
    terrainLineStyle: 'straight',
    launchPad: { x: 500, y: 1500, width: 240 },
    landingPad: { x: 7500, y: 1500, width: 240 },
    groundNodes: [
      { x: 0, y: 1500 },
      { x: 500, y: 1500 },
      { x: 740, y: 1500 },
      { x: 7500, y: 1500 },
      { x: 7740, y: 1500 },
      { x: 8000, y: 1500 },
    ],
    ceilingNodes: [
      { x: 0, y: 100 },
      { x: 8000, y: 100 },
    ],
    obstacles: [],
    fuelPickups: [],
    cargoPlatforms: [],
    signposts: [],
    textNotes: [],
  };

  blankMap.difficulty = calculateMapDifficulty(blankMap);
  return blankMap;
}

export interface RandomMapOptions {
  name?: string;
  preset?: 'caves' | 'volcanic' | 'glacial' | 'asteroid' | 'vertical_shaft' | 'labyrinth' | 'random';
  width?: number;
  height?: number;
  complexity?: 'simple' | 'medium' | 'complex';
  gravity?: number;
  themeId?: string;
  includeCargo?: boolean;
}

/**
 * Generates a completely unique, structural procedural custom map.
 * Guarantees distinct geometry, organic ground/ceiling curves, dynamic obstacle formations,
 * and intelligent pad/cargo locations tailored to the selected planetary archetype and seed.
 */
export function generateRandomCustomMap(options?: RandomMapOptions): CustomMapData {
  const seed = Date.now() + Math.floor(Math.random() * 1000000);
  let preset = options?.preset || 'caves';
  if (preset === 'random') {
    const allPresets: Array<'caves' | 'volcanic' | 'glacial' | 'asteroid' | 'vertical_shaft' | 'labyrinth'> = [
      'caves',
      'volcanic',
      'glacial',
      'asteroid',
      'vertical_shaft',
      'labyrinth',
    ];
    preset = allPresets[Math.floor(Math.random() * allPresets.length)];
  }

  const width = options?.width || 7600;
  const height = options?.height || (preset === 'vertical_shaft' ? 5200 : 2800);
  const includeCargo = options?.includeCargo !== false;
  const complexity = options?.complexity || 'medium';

  // Archetype Theme & Physics defaults
  let themeId = options?.themeId || 'blue';
  let gravity = options?.gravity || 3.2;
  let airResistance = 0.001;
  let fuelBurnRate = 20;

  if (preset === 'volcanic') {
    themeId = options?.themeId || 'volcanic';
    gravity = options?.gravity ?? +(3.8 + Math.random() * 1.8).toFixed(1);
    airResistance = 0.0018;
    fuelBurnRate = 22;
  } else if (preset === 'glacial') {
    themeId = options?.themeId || 'blue';
    gravity = options?.gravity ?? +(2.2 + Math.random() * 1.2).toFixed(1);
    airResistance = 0.0006;
    fuelBurnRate = 19;
  } else if (preset === 'asteroid') {
    themeId = options?.themeId || 'violet';
    gravity = options?.gravity ?? +(1.0 + Math.random() * 1.2).toFixed(1);
    airResistance = 0.0002;
    fuelBurnRate = 18;
  } else if (preset === 'vertical_shaft') {
    themeId = options?.themeId || 'amber';
    gravity = options?.gravity ?? +(3.5 + Math.random() * 1.5).toFixed(1);
    airResistance = 0.0012;
    fuelBurnRate = 21;
  } else if (preset === 'labyrinth') {
    themeId = options?.themeId || 'emerald';
    gravity = options?.gravity ?? +(2.4 + Math.random() * 1.4).toFixed(1);
    airResistance = 0.0025;
    fuelBurnRate = 20;
  } else {
    // caves
    themeId = options?.themeId || 'blue';
    gravity = options?.gravity ?? +(2.8 + Math.random() * 1.2).toFixed(1);
  }

  // PRNG helpers
  let s = seed % 2147483647;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const randRange = (min: number, max: number) => min + rand() * (max - min);

  // Initialize structural elements
  const groundNodes: { x: number; y: number }[] = [];
  const ceilingNodes: { x: number; y: number }[] = [];
  const obstacles: CustomObstacleData[] = [];
  const fuelPickups: CustomFuelData[] = [];
  const cargoPlatforms: CustomCargoPlatformData[] = [];

  let launchPad = { x: 460, y: Math.round(height * 0.25), width: 240 };
  let landingPad = { x: width - 620, y: Math.round(height * 0.45), width: 260 };

  // =========================================================================
  // STRUCTURAL GENERATION ACCORDING TO ARCHETYPE
  // =========================================================================

  if (preset === 'asteroid') {
    // -----------------------------------------------------------------------
    // ASTEROID ARCHIPELAGO: Zero-G / Low-G Floating Core Field
    // Jagged impact bottom with 4 to 6 floating asteroid polygons
    // -----------------------------------------------------------------------
    launchPad.y = Math.round(height * randRange(0.20, 0.28));
    landingPad.y = Math.round(height * randRange(0.24, 0.36));

    // Ground: Deep crater basin with 8 points
    const gPointsCount = 8;
    for (let i = 0; i < gPointsCount; i++) {
      const x = Math.round((i / (gPointsCount - 1)) * width);
      let y = Math.round(height * (0.86 + randRange(-0.06, 0.06)));
      if (i === 0) y = launchPad.y + 12;
      if (i === gPointsCount - 1) y = landingPad.y + 12;
      groundNodes.push({ x, y });
    }

    // Ceiling: High dome
    const cPointsCount = 6;
    for (let i = 0; i < cPointsCount; i++) {
      const x = Math.round((i / (cPointsCount - 1)) * width);
      const y = Math.round(height * (0.08 + randRange(-0.02, 0.04)));
      ceilingNodes.push({ x, y });
    }

    // 4-6 Floating Asteroid Islands
    const numIslands = complexity === 'complex' ? 6 : complexity === 'simple' ? 3 : 4;
    const islandXSpacings = [0.22, 0.42, 0.62, 0.80, 0.32, 0.72];

    for (let k = 0; k < numIslands; k++) {
      const cx = Math.round(width * (islandXSpacings[k] + randRange(-0.04, 0.04)));
      const cy = Math.round(height * randRange(0.35, 0.68));
      const rx = Math.round(randRange(240, 420));
      const ry = Math.round(randRange(90, 160));
      const numSides = Math.round(randRange(5, 8));

      const polyPoints: { x: number; y: number }[] = [];
      for (let sIdx = 0; sIdx < numSides; sIdx++) {
        const ang = (sIdx / numSides) * Math.PI * 2 + randRange(-0.15, 0.15);
        polyPoints.push({
          x: Math.round(cx + Math.cos(ang) * rx * randRange(0.8, 1.2)),
          y: Math.round(cy + Math.sin(ang) * ry * randRange(0.8, 1.2)),
        });
      }

      obstacles.push({
        id: `asteroid-${k}-${seed}`,
        name: `Asteroid Core ${String.fromCharCode(65 + k)}`,
        type: 'island',
        points: polyPoints,
      });
    }

    if (includeCargo) {
      const pkX = Math.round(width * randRange(0.38, 0.48));
      const pkY = Math.round(height * 0.82);
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: pkX,
        y: pkY,
        width: 240,
        label: 'Asteroid Mineral Core',
        weightClass: 'light',
      });
    }

  } else if (preset === 'volcanic') {
    // -----------------------------------------------------------------------
    // MAGMA TRENCH: Stepped Terraces, Basalt Columns, Caldera Abyss
    // -----------------------------------------------------------------------
    launchPad.y = Math.round(height * randRange(0.18, 0.24));
    landingPad.y = Math.round(height * randRange(0.65, 0.75)); // Deep in eastern caldera

    // Stepped Ground with 3 Canyon Tiers
    groundNodes.push(
      { x: 0, y: launchPad.y },
      { x: Math.round(width * 0.12), y: launchPad.y + 20 },
      { x: Math.round(width * 0.22), y: Math.round(height * 0.50) },
      { x: Math.round(width * 0.38), y: Math.round(height * 0.52) },
      { x: Math.round(width * 0.52), y: Math.round(height * 0.85) },
      { x: Math.round(width * 0.75), y: Math.round(height * 0.88) },
      { x: Math.round(width * 0.88), y: landingPad.y },
      { x: width, y: landingPad.y }
    );

    ceilingNodes.push(
      { x: 0, y: 70 },
      { x: Math.round(width * 0.20), y: Math.round(height * 0.12) },
      { x: Math.round(width * 0.45), y: Math.round(height * 0.22) },
      { x: Math.round(width * 0.70), y: Math.round(height * 0.15) },
      { x: width, y: 70 }
    );

    // Volcanic Arch Bridge spanning high canyon
    const archY = Math.round(height * 0.32);
    obstacles.push({
      id: `volcanic-arch-${seed}`,
      name: 'Magma Suspension Arch',
      type: 'arch',
      points: [
        { x: Math.round(width * 0.18), y: archY },
        { x: Math.round(width * 0.38), y: archY - 50 },
        { x: Math.round(width * 0.54), y: archY },
        { x: Math.round(width * 0.52), y: archY + 110 },
        { x: Math.round(width * 0.38), y: archY + 140 },
        { x: Math.round(width * 0.20), y: archY + 110 },
      ],
    });

    // Hanging Basalt Spire
    const spireX = Math.round(width * 0.42);
    obstacles.push({
      id: `volcanic-spire-${seed}`,
      name: 'Hanging Basalt Spire',
      type: 'spire',
      points: [
        { x: spireX - 90, y: Math.round(height * 0.18) },
        { x: spireX + 90, y: Math.round(height * 0.18) },
        { x: spireX + 30, y: Math.round(height * 0.52) },
        { x: spireX - 30, y: Math.round(height * 0.52) },
      ],
    });

    // Geothermal Caldera Column
    const colX = Math.round(width * 0.68);
    obstacles.push({
      id: `volcanic-col-${seed}`,
      name: 'Geothermal Steam Column',
      type: 'pillar',
      points: [
        { x: colX - 60, y: Math.round(height * 0.40) },
        { x: colX + 60, y: Math.round(height * 0.40) },
        { x: colX + 90, y: Math.round(height * 0.85) },
        { x: colX - 90, y: Math.round(height * 0.85) },
      ],
    });

    if (includeCargo) {
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: Math.round(width * 0.60),
        y: Math.round(height * 0.82),
        width: 240,
        label: 'Caldera Magma Forge',
        weightClass: 'heavy',
      });
    }

  } else if (preset === 'glacial') {
    // -----------------------------------------------------------------------
    // GLACIAL CREVASSE: Ice Needles, Hanging Icicle Gates, Crystal Arch
    // -----------------------------------------------------------------------
    launchPad.y = Math.round(height * randRange(0.22, 0.28));
    landingPad.y = Math.round(height * randRange(0.68, 0.78));

    groundNodes.push(
      { x: 0, y: launchPad.y },
      { x: Math.round(width * 0.15), y: launchPad.y + 15 },
      { x: Math.round(width * 0.28), y: Math.round(height * 0.58) },
      { x: Math.round(width * 0.48), y: Math.round(height * 0.85) },
      { x: Math.round(width * 0.70), y: Math.round(height * 0.88) },
      { x: Math.round(width * 0.86), y: landingPad.y },
      { x: width, y: landingPad.y }
    );

    // Ceiling with sharp jagged icicles
    ceilingNodes.push(
      { x: 0, y: 70 },
      { x: Math.round(width * 0.18), y: Math.round(height * 0.14) },
      { x: Math.round(width * 0.32), y: Math.round(height * 0.28) },
      { x: Math.round(width * 0.50), y: Math.round(height * 0.12) },
      { x: Math.round(width * 0.68), y: Math.round(height * 0.30) },
      { x: Math.round(width * 0.85), y: Math.round(height * 0.12) },
      { x: width, y: 70 }
    );

    // Sub-Ice Crystal Arch
    const archY = Math.round(height * 0.42);
    obstacles.push({
      id: `glacial-arch-${seed}`,
      name: 'Crystalline Ice Arch',
      type: 'arch',
      points: [
        { x: Math.round(width * 0.24), y: archY },
        { x: Math.round(width * 0.42), y: archY - 40 },
        { x: Math.round(width * 0.60), y: archY },
        { x: Math.round(width * 0.58), y: archY + 110 },
        { x: Math.round(width * 0.42), y: archY + 130 },
        { x: Math.round(width * 0.26), y: archY + 110 },
      ],
    });

    // 2 Ice Spire Columns
    const spire1X = Math.round(width * 0.48);
    obstacles.push({
      id: `ice-spire-1-${seed}`,
      name: 'Ice Needle Spire Alpha',
      type: 'pillar',
      points: [
        { x: spire1X - 45, y: archY + 120 },
        { x: spire1X + 45, y: archY + 120 },
        { x: spire1X + 75, y: Math.round(height * 0.82) },
        { x: spire1X - 75, y: Math.round(height * 0.82) },
      ],
    });

    const spire2X = Math.round(width * 0.74);
    obstacles.push({
      id: `ice-spire-2-${seed}`,
      name: 'Glacial Pillar Beta',
      type: 'pillar',
      points: [
        { x: spire2X - 50, y: Math.round(height * 0.28) },
        { x: spire2X + 50, y: Math.round(height * 0.28) },
        { x: spire2X + 70, y: Math.round(height * 0.65) },
        { x: spire2X - 70, y: Math.round(height * 0.65) },
      ],
    });

    if (includeCargo) {
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: Math.round(width * 0.35),
        y: Math.round(height * 0.80),
        width: 240,
        label: 'Cryo Superconductor Depot',
        weightClass: 'medium',
      });
    }

  } else if (preset === 'vertical_shaft') {
    // -----------------------------------------------------------------------
    // VERTICAL SHAFT: Staggered Slalom Shelves Down a Deep Fissure
    // -----------------------------------------------------------------------
    launchPad.x = Math.round(width * 0.18);
    launchPad.y = Math.round(height * 0.10);
    landingPad.x = Math.round(width * 0.82);
    landingPad.y = Math.round(height * 0.90);

    groundNodes.push(
      { x: 0, y: launchPad.y },
      { x: Math.round(width * 0.28), y: launchPad.y + 20 },
      { x: Math.round(width * 0.40), y: Math.round(height * 0.45) },
      { x: Math.round(width * 0.60), y: Math.round(height * 0.72) },
      { x: Math.round(width * 0.75), y: landingPad.y },
      { x: width, y: landingPad.y }
    );

    ceilingNodes.push(
      { x: 0, y: 80 },
      { x: Math.round(width * 0.5), y: 120 },
      { x: width, y: 80 }
    );

    // Staggered Baffle Shelves (forcing slalom descent)
    const shelf1Y = Math.round(height * 0.30);
    obstacles.push({
      id: `v-shelf-1-${seed}`,
      name: 'Upper Descent Shelf (West)',
      type: 'strata',
      points: [
        { x: Math.round(width * 0.25), y: shelf1Y },
        { x: Math.round(width * 0.68), y: shelf1Y - 20 },
        { x: Math.round(width * 0.66), y: shelf1Y + 120 },
        { x: Math.round(width * 0.27), y: shelf1Y + 120 },
      ],
    });

    const shelf2Y = Math.round(height * 0.58);
    obstacles.push({
      id: `v-shelf-2-${seed}`,
      name: 'Mid Descent Shelf (East)',
      type: 'strata',
      points: [
        { x: Math.round(width * 0.35), y: shelf2Y },
        { x: Math.round(width * 0.80), y: shelf2Y - 20 },
        { x: Math.round(width * 0.78), y: shelf2Y + 130 },
        { x: Math.round(width * 0.37), y: shelf2Y + 130 },
      ],
    });

    if (includeCargo) {
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: Math.round(width * 0.45),
        y: shelf2Y - 18,
        width: 240,
        label: 'Mid-Shaft Extraction Bay',
        weightClass: 'heavy',
      });
    }

  } else if (preset === 'labyrinth') {
    // -----------------------------------------------------------------------
    // LABYRINTH: Multi-Tunnel Dual Passage Cave Network
    // -----------------------------------------------------------------------
    launchPad.y = Math.round(height * 0.25);
    landingPad.y = Math.round(height * 0.35);

    groundNodes.push(
      { x: 0, y: launchPad.y },
      { x: Math.round(width * 0.16), y: launchPad.y + 15 },
      { x: Math.round(width * 0.30), y: Math.round(height * 0.82) },
      { x: Math.round(width * 0.65), y: Math.round(height * 0.84) },
      { x: Math.round(width * 0.82), y: landingPad.y },
      { x: width, y: landingPad.y }
    );

    ceilingNodes.push(
      { x: 0, y: 80 },
      { x: Math.round(width * 0.25), y: Math.round(height * 0.14) },
      { x: Math.round(width * 0.50), y: Math.round(height * 0.20) },
      { x: Math.round(width * 0.75), y: Math.round(height * 0.14) },
      { x: width, y: 80 }
    );

    // Central Horizontal Divider creating Upper & Lower Tunnel
    const midDivY = Math.round(height * 0.50);
    obstacles.push({
      id: `lab-divider-${seed}`,
      name: 'Central Cavern Partition',
      type: 'strata',
      points: [
        { x: Math.round(width * 0.22), y: midDivY },
        { x: Math.round(width * 0.75), y: midDivY },
        { x: Math.round(width * 0.73), y: midDivY + 140 },
        { x: Math.round(width * 0.24), y: midDivY + 140 },
      ],
    });

    // Connector Chimney Column
    const colX = Math.round(width * 0.48);
    obstacles.push({
      id: `lab-column-${seed}`,
      name: 'Structural Tunnel Column',
      type: 'pillar',
      points: [
        { x: colX - 60, y: midDivY + 140 },
        { x: colX + 60, y: midDivY + 140 },
        { x: colX + 80, y: Math.round(height * 0.80) },
        { x: colX - 80, y: Math.round(height * 0.80) },
      ],
    });

    if (includeCargo) {
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: Math.round(width * 0.35),
        y: Math.round(height * 0.78),
        width: 240,
        label: 'Lower Tunnel Hydro Vault',
        weightClass: 'medium',
      });
    }

  } else {
    // -----------------------------------------------------------------------
    // SUBTERRANEAN CAVES (Classic Multi-Tier Cavern System)
    // -----------------------------------------------------------------------
    launchPad.y = Math.round(height * randRange(0.22, 0.28));
    landingPad.y = Math.round(height * randRange(0.42, 0.52));

    groundNodes.push(
      { x: 0, y: launchPad.y },
      { x: Math.round(width * 0.12), y: launchPad.y + 15 },
      { x: Math.round(width * 0.25), y: Math.round(height * 0.58) },
      { x: Math.round(width * 0.45), y: Math.round(height * 0.88) },
      { x: Math.round(width * 0.65), y: Math.round(height * 0.85) },
      { x: Math.round(width * 0.80), y: Math.round(height * 0.60) },
      { x: Math.round(width * 0.88), y: landingPad.y },
      { x: width, y: landingPad.y }
    );

    ceilingNodes.push(
      { x: 0, y: 80 },
      { x: Math.round(width * 0.20), y: Math.round(height * 0.12) },
      { x: Math.round(width * 0.45), y: Math.round(height * 0.15) },
      { x: Math.round(width * 0.70), y: Math.round(height * 0.12) },
      { x: width, y: 80 }
    );

    // Tier 1 Skyway Arch
    const tier1Y = Math.round(height * 0.35);
    obstacles.push({
      id: `cave-tier1-${seed}`,
      name: 'Skyway Rock Shelf (Tier 1)',
      type: 'arch',
      points: [
        { x: Math.round(width * 0.16), y: tier1Y },
        { x: Math.round(width * 0.36), y: tier1Y - 40 },
        { x: Math.round(width * 0.52), y: tier1Y },
        { x: Math.round(width * 0.50), y: tier1Y + 120 },
        { x: Math.round(width * 0.36), y: tier1Y + 150 },
        { x: Math.round(width * 0.18), y: tier1Y + 120 },
      ],
    });

    // Tier 2 Mid Shelf
    const tier2Y = Math.round(height * 0.64);
    obstacles.push({
      id: `cave-tier2-${seed}`,
      name: 'Mid-Cavern Strata (Tier 2)',
      type: 'strata',
      points: [
        { x: Math.round(width * 0.35), y: tier2Y },
        { x: Math.round(width * 0.70), y: tier2Y - 20 },
        { x: Math.round(width * 0.78), y: tier2Y + 20 },
        { x: Math.round(width * 0.76), y: tier2Y + 130 },
        { x: Math.round(width * 0.68), y: tier2Y + 110 },
        { x: Math.round(width * 0.37), y: tier2Y + 130 },
      ],
    });

    // Monolith Support
    const colX = Math.round(width * 0.52);
    obstacles.push({
      id: `cave-monolith-${seed}`,
      name: 'Central Monolith Support',
      type: 'pillar',
      points: [
        { x: colX - 60, y: tier1Y + 120 },
        { x: colX + 60, y: tier1Y + 120 },
        { x: colX + 45, y: tier2Y - 20 },
        { x: colX - 45, y: tier2Y - 20 },
      ],
    });

    if (includeCargo) {
      cargoPlatforms.push({
        id: `cargo-pk-${seed}`,
        type: 'pickup',
        x: Math.round(width * 0.42),
        y: Math.round(height * 0.84),
        width: 240,
        label: 'Sub-Crust Mining Vault',
        weightClass: 'medium',
      });
    }
  }

  // Generate 4-6 Fuel Pickups intelligently distributed
  const numFuel = complexity === 'complex' ? 6 : 4;
  for (let f = 0; f < numFuel; f++) {
    const fx = Math.round(width * (0.18 + (f / (numFuel - 1)) * 0.68 + randRange(-0.03, 0.03)));
    const fy = Math.round(height * randRange(0.25, 0.75));
    fuelPickups.push({
      id: `fuel-${f + 1}-${seed}`,
      x: fx,
      y: fy,
      amount: Math.round(randRange(70, 90)),
    });
  }

  const defaultNames: Record<string, string[]> = {
    caves: ['Subterranean Nexus', 'Cobalt Chasm VII', 'Deep Grotto Beta', 'Echo Caverns'],
    volcanic: ['Inferno Fissure', 'Magma Trench Omega', 'Basalt Caldera', 'Pyroclast Rift'],
    glacial: ['Glacial Crevasse IX', 'Frostbite Chasm', 'Cryo Needle Vault', 'Zero Kelvin Abyss'],
    asteroid: ['Asteroid Hollow Alpha', 'Floating Core Archipelago', 'Microgravity Rift', 'Orbital Bastion'],
    vertical_shaft: ['Towering 6,000m Fissure', 'Abyssal Elevator Shaft', 'Gravity Quarry', 'Vertical Rift'],
    labyrinth: ['Serpentine Grotto', 'Dual-Tunnel Maze', 'Sub-Crust Labyrinth', 'Emerald Catacombs'],
  };

  const nameList = defaultNames[preset] || defaultNames.caves;
  const pickedName = nameList[Math.floor(rand() * nameList.length)] + ` #${Math.floor(100 + rand() * 900)}`;
  const mapName = options?.name || pickedName;

  const signposts: CustomSignpostData[] = [
    {
      id: `sign-shaft-1-${seed}`,
      x: Math.round(launchPad.x + (landingPad.x - launchPad.x) * 0.35),
      y: Math.round(Math.min(launchPad.y, landingPad.y) + 200),
      direction: landingPad.x > launchPad.x ? 'down_right' : 'down_left',
      targetType: includeCargo && cargoPlatforms.length > 0 ? 'pickup' : 'landing',
      targetName: includeCargo && cargoPlatforms.length > 0 ? 'CARGO EXTRACTION VAULT' : 'BASE LANDING LZ',
      subText: 'DESCENT FLIGHT CORRIDOR',
      color: '#f59e0b',
    },
    {
      id: `sign-nexus-fork-${seed}`,
      x: Math.round(launchPad.x + (landingPad.x - launchPad.x) * 0.75),
      y: Math.round(landingPad.y - 180),
      direction: 'right',
      targetType: 'landing',
      targetName: 'PRIMARY BASE LZ',
      subText: 'EXPEDITION OUTPOST',
      color: '#22c55e',
    },
  ];

  const generatedMap: CustomMapData = {
    id: `custom-map-${seed}`,
    name: mapName,
    description: `Procedurally generated ${preset} cavern system with unique structural geometry and multi-tiered flight corridors.`,
    author: 'Procedural Architect',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    worldWidth: width,
    worldHeight: height,
    gravity,
    airResistance,
    fuelBurnRate,
    targetTimeSec: 45,
    difficulty: 'Medium',
    themeId,
    terrainLineStyle: 'straight',
    launchPad,
    landingPad,
    cargoPlatforms,
    groundNodes,
    ceilingNodes,
    obstacles,
    fuelPickups,
    signposts,
  };

  generatedMap.difficulty = calculateMapDifficulty(generatedMap);
  return generatedMap;
}

export function exportMapToJSON(mapData: CustomMapData): string {
  // Ensure difficulty is up to date when exporting if in auto mode
  const finalDiff =
    mapData.difficultyMode === 'manual' && mapData.difficulty
      ? mapData.difficulty
      : calculateMapDifficulty(mapData);

  const payload: CustomMapData = {
    ...mapData,
    difficulty: finalDiff,
  };
  return JSON.stringify(payload, null, 2);
}

export function importMapFromJSON(jsonString: string): CustomMapData | { error: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') {
      return { error: 'Invalid map file format.' };
    }
    if (!data.name || !Array.isArray(data.groundNodes) || !Array.isArray(data.ceilingNodes)) {
      return { error: 'Map format missing required ground or ceiling node definitions.' };
    }

    const importedDifficulty =
      data.difficultyMode === 'manual' && data.difficulty
        ? data.difficulty
        : calculateMapDifficulty(data);

    const imported: CustomMapData = {
      ...data,
      id: `imported-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: `${data.name} (Imported)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      difficulty: importedDifficulty,
      difficultyMode: data.difficultyMode || (data.difficulty ? 'manual' : 'auto'),
      worldWidth: data.worldWidth || 7200,
      worldHeight: data.worldHeight || 2400,
      gravity: Number(data.gravity) || 3.5,
      airResistance: Number(data.airResistance) || 0.001,
      fuelBurnRate: Number(data.fuelBurnRate) || 20,
      terrainLineStyle: data.terrainLineStyle || 'straight',
      launchPad: data.launchPad || { x: 420, y: 700, width: 240 },
      landingPad: data.landingPad || { x: 6500, y: 1300, width: 240 },
      groundNodes: data.groundNodes,
      ceilingNodes: data.ceilingNodes,
      obstacles: Array.isArray(data.obstacles) ? data.obstacles : [],
      fuelPickups: Array.isArray(data.fuelPickups) ? data.fuelPickups : [],
      cargoPlatforms: Array.isArray(data.cargoPlatforms)
        ? data.cargoPlatforms.filter((p: any) => p && p.type !== 'drop_zone')
        : [],
      signposts: Array.isArray(data.signposts) ? data.signposts : [],
      textNotes: Array.isArray(data.textNotes) ? data.textNotes : [],
    };

    saveCustomMap(imported);
    return imported;
  } catch (e) {
    return { error: 'Failed to parse JSON map code. Please check syntax.' };
  }
}
