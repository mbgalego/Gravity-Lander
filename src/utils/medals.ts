import {
  Feather,
  Zap,
  Shield,
  Flame,
  Package,
  Truck,
  Timer,
  ArrowUp,
  Target,
  Hand,
  Package2,
  Skull,
  Mountain,
} from 'lucide-react';

export type MedalCategory = 'flight' | 'logistics' | 'hazard' | 'misc';
export type MedalColor = 'amber' | 'emerald' | 'sky' | 'purple' | 'teal' | 'rose' | 'slate';

export interface Medal {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: MedalCategory;
  color: MedalColor;
  check: (ctx: MedalContext) => boolean;
}

export interface MedalContext {
  // Flight data
  verticalSpeed: number;
  horizontalSpeed: number;
  fuelUsed: number;
  fuelCapacity: number;
  timeTaken: number;
  parTime: number;
  hullDamage: number;
  // Cargo/Logistics
  cargoCollected: number;
  cargoTotal: number;
  roversCollected: number;
  roversTotal: number;
  cargoDelivered: number;
  // Hazard events (tracked during flight)
  volcanicRockHits: number;
  crashTimeMs: number;
  nearMisses: number;
  maxAltitude: number;
  // Landing status
  isLanded: boolean;
  isCrashed: boolean;
}

const MEDALS: Medal[] = [
  // Core flight medals
  {
    id: 'feather_touch',
    title: 'Feather Touch',
    description: 'Land with ≤0.5 m/s vertical speed',
    icon: Feather,
    category: 'flight',
    color: 'emerald',
    check: (c) => c.isLanded && c.verticalSpeed <= 0.5,
  },
  {
    id: 'fuel_sipper',
    title: 'Fuel Sipper',
    description: 'Finish with ≥75% fuel remaining',
    icon: Zap,
    category: 'flight',
    color: 'sky',
    check: (c) => c.isLanded && c.fuelUsed / c.fuelCapacity <= 0.25,
  },
  {
    id: 'pristine_hull',
    title: 'Pristine Hull',
    description: 'Zero hull damage on landing',
    icon: Shield,
    category: 'flight',
    color: 'teal',
    check: (c) => c.isLanded && c.hullDamage === 0,
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Beat par time by 25%',
    icon: Flame,
    category: 'flight',
    color: 'amber',
    check: (c) => c.isLanded && c.timeTaken <= c.parTime * 0.75,
  },
  // Logistics medals
  {
    id: 'cargo_master',
    title: 'Cargo Master',
    description: 'Collect all cargo on the map',
    icon: Package,
    category: 'logistics',
    color: 'amber',
    check: (c) => c.isLanded && c.cargoCollected === c.cargoTotal && c.cargoTotal > 0,
  },
  {
    id: 'rover_roundup',
    title: 'Rover Roundup',
    description: 'Collect all rovers on the map',
    icon: Truck,
    category: 'logistics',
    color: 'teal',
    check: (c) => c.isLanded && c.roversCollected === c.roversTotal && c.roversTotal > 0,
  },
  {
    id: 'pack_mule',
    title: 'Pack Mule',
    description: 'Deliver 3+ cargo containers in one run',
    icon: Package2,
    category: 'logistics',
    color: 'amber',
    check: (c) => c.isLanded && c.cargoDelivered >= 3,
  },
  {
    id: 'empty_handed',
    title: 'Empty Handed',
    description: 'Land without collecting any cargo/rovers (when available)',
    icon: Hand,
    category: 'logistics',
    color: 'slate',
    check: (c) => c.isLanded && c.cargoCollected === 0 && c.roversCollected === 0 && (c.cargoTotal > 0 || c.roversTotal > 0),
  },
  // Hazard / Fun medals
  {
    id: 'volcanic_kiss',
    title: 'Volcanic Kiss',
    description: 'Survive hitting a volcanic rock',
    icon: Mountain,
    category: 'hazard',
    color: 'rose',
    check: (c) => c.isLanded && c.volcanicRockHits > 0 && c.hullDamage < 100,
  },
  {
    id: 'instant_crash',
    title: 'Flash in the Pan',
    description: 'Crash within 1 second of launch',
    icon: Skull,
    category: 'misc',
    color: 'rose',
    check: (c) => c.isCrashed && c.crashTimeMs > 0 && c.crashTimeMs < 1000,
  },
  {
    id: 'speed_runner',
    title: 'Speed Runner',
    description: 'Land in under 15 seconds',
    icon: Timer,
    category: 'flight',
    color: 'amber',
    check: (c) => c.isLanded && c.timeTaken < 15,
  },
  {
    id: 'high_flyer',
    title: 'High Flyer',
    description: 'Reach 2000m altitude',
    icon: ArrowUp,
    category: 'flight',
    color: 'sky',
    check: (c) => c.maxAltitude > 2000,
  },
  {
    id: 'thread_needle',
    title: 'Thread the Needle',
    description: 'Pass within 5m of terrain 10+ times',
    icon: Target,
    category: 'flight',
    color: 'purple',
    check: (c) => c.nearMisses >= 10,
  },
];

export function checkMedals(ctx: MedalContext): Medal[] {
  return MEDALS.filter((m) => m.check(ctx));
}

export function getAllMedals(): Medal[] {
  return [...MEDALS];
}

export function getMedalById(id: string): Medal | undefined {
  return MEDALS.find((m) => m.id === id);
}

export function getMedalColorClass(color: MedalColor): string {
  const colors: Record<MedalColor, string> = {
    amber: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
    emerald: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40',
    sky: 'border-sky-500/50 text-sky-300 bg-sky-950/40',
    purple: 'border-purple-500/50 text-purple-300 bg-purple-950/40',
    teal: 'border-teal-500/50 text-teal-300 bg-teal-950/40',
    rose: 'border-rose-500/50 text-rose-300 bg-rose-950/40',
    slate: 'border-slate-500/50 text-slate-300 bg-slate-950/40',
  };
  return colors[color] || colors.slate;
}

export function getMedalBadgeClass(color: MedalColor): string {
  const colors: Record<MedalColor, string> = {
    amber: 'bg-amber-900/60 text-amber-200 border-amber-500/40',
    emerald: 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40',
    sky: 'bg-sky-900/60 text-sky-200 border-sky-500/40',
    purple: 'bg-purple-900/60 text-purple-200 border-purple-500/40',
    teal: 'bg-teal-900/60 text-teal-200 border-teal-500/40',
    rose: 'bg-rose-900/60 text-rose-200 border-rose-500/40',
    slate: 'bg-slate-900/60 text-slate-200 border-slate-500/40',
  };
  return colors[color] || colors.slate;
}