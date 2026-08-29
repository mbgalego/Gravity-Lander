import { CargoType, CargoWeightClass, CargoContainer } from '../types';
import { sound } from '../game/sound';

export interface CargoHazardAlert {
  id: string;
  cargoId: string;
  cargoType: CargoType;
  name: string;
  weightClass: CargoWeightClass;
  mass: number;
  title: string;
  dangerWarning: string;
  hazardLevel: 'CRITICAL DETONATION' | 'THERMAL HAZARD' | 'NUCLEAR RADIATION' | 'ELECTROMAGNETIC' | 'EMP DISCHARGE' | 'STANDARD LOGISTICS';
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  icon: 'flame' | 'snowflake' | 'atom' | 'magnet' | 'zap' | 'package';
  triggerReason: 'attached' | 'proximity' | 'manual';
  timestamp: number;
}

export const CARGO_HAZARD_INFO: Record<
  CargoType,
  {
    title: string;
    hazardLevel: CargoHazardAlert['hazardLevel'];
    dangerWarning: string;
    icon: CargoHazardAlert['icon'];
    accentColor: string;
    badgeBg: string;
    borderColor: string;
    textColor: string;
    isHazard: boolean;
  }
> = {
  explosive: {
    title: 'HIGH EXPLOSIVES',
    hazardLevel: 'CRITICAL DETONATION',
    dangerWarning: 'Explodes on hard impact. Touch down gently.',
    icon: 'flame',
    accentColor: '#f97316',
    badgeBg: 'bg-orange-950/90',
    borderColor: 'border-orange-500/80',
    textColor: 'text-orange-400',
    isHazard: true,
  },
  cryogenic: {
    title: 'CRYO SPECIMEN',
    hazardLevel: 'THERMAL HAZARD',
    dangerWarning: 'Melts near volcanoes and heat vents.',
    icon: 'snowflake',
    accentColor: '#38bdf8',
    badgeBg: 'bg-sky-950/90',
    borderColor: 'border-sky-400/80',
    textColor: 'text-sky-300',
    isHazard: true,
  },
  isotope: {
    title: 'QUANTUM ISOTOPE',
    hazardLevel: 'NUCLEAR RADIATION',
    dangerWarning: 'Shield degrades on collision. Avoid bumps.',
    icon: 'atom',
    accentColor: '#c084fc',
    badgeBg: 'bg-purple-950/90',
    borderColor: 'border-purple-500/80',
    textColor: 'text-purple-300',
    isHazard: true,
  },
  magnetic: {
    title: 'MAGNETIC CORE',
    hazardLevel: 'ELECTROMAGNETIC',
    dangerWarning: 'Magnetic drag. Heavy rotational torque.',
    icon: 'magnet',
    accentColor: '#60a5fa',
    badgeBg: 'bg-blue-950/90',
    borderColor: 'border-blue-500/80',
    textColor: 'text-blue-300',
    isHazard: true,
  },
  plasma: {
    title: 'PLASMA BATTERY',
    hazardLevel: 'EMP DISCHARGE',
    dangerWarning: 'Discharges disabling EMP pulses (kills thrusters for 0.5s–2.0s & drains 10% fuel).',
    icon: 'zap',
    accentColor: '#34d399',
    badgeBg: 'bg-emerald-950/90',
    borderColor: 'border-emerald-500/80',
    textColor: 'text-emerald-300',
    isHazard: true,
  },
  standard: {
    title: 'SUPPLY POD',
    hazardLevel: 'STANDARD LOGISTICS',
    dangerWarning: 'Standard cargo. Fly steady and watch tether swing.',
    icon: 'package',
    accentColor: '#38bdf8',
    badgeBg: 'bg-slate-900/90',
    borderColor: 'border-sky-500/50',
    textColor: 'text-sky-300',
    isHazard: false,
  },
};

type CargoAlertSubscriber = (alert: CargoHazardAlert) => void;
const subscribers: Set<CargoAlertSubscriber> = new Set();

// Recent alert history to prevent rapid repeat triggering for the same pod
const alertedCargoIds: Map<string, number> = new Map();

export function subscribeCargoAlerts(subscriber: CargoAlertSubscriber): () => void {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

export function triggerCargoHazardAlert(
  cargo: CargoContainer,
  triggerReason: 'attached' | 'proximity' | 'manual' = 'attached',
  force = false
): boolean {
  const cType = cargo.cargoType || 'standard';
  const info = CARGO_HAZARD_INFO[cType] || CARGO_HAZARD_INFO.standard;
  const now = Date.now();

  const key = `${cargo.id}_${triggerReason}`;
  const lastAlertTime = alertedCargoIds.get(key) || 0;

  // Throttle proximity alerts to once per 12 seconds per container, attachment alerts to once per 6 seconds
  const cooldownMs = triggerReason === 'attached' ? 6000 : 12000;
  if (!force && now - lastAlertTime < cooldownMs) {
    return false;
  }

  alertedCargoIds.set(key, now);

  const alert: CargoHazardAlert = {
    id: `${cargo.id}_${now}`,
    cargoId: cargo.id,
    cargoType: cType,
    name: cargo.name || info.title,
    weightClass: cargo.weightClass || 'medium',
    mass: cargo.mass || 320,
    title: info.title,
    dangerWarning: info.dangerWarning,
    hazardLevel: info.hazardLevel,
    accentColor: info.accentColor,
    badgeBg: info.badgeBg,
    borderColor: info.borderColor,
    textColor: info.textColor,
    icon: info.icon,
    triggerReason,
    timestamp: now,
  };

  // Play audio telemetry ping
  sound.playCargoWarning(info.isHazard);

  // Dispatch to all active subscribers
  subscribers.forEach((sub) => {
    try {
      sub(alert);
    } catch (err) {
      console.error('Error in cargo alert listener:', err);
    }
  });

  return true;
}

export function resetCargoAlertHistory(): void {
  alertedCargoIds.clear();
}
