// Planetary Expedition Achievement & Milestone Tracking System

import { sound } from '../game/sound';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'flame' | 'shield' | 'zap' | 'package' | 'truck' | 'star' | 'feather' | 'sparkles' | 'award';
  category: 'flight' | 'logistics' | 'mastery';
  accentColor: 'amber' | 'emerald' | 'sky' | 'purple' | 'teal';
  unlockedAt?: number;
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  perfect_landing: {
    id: 'perfect_landing',
    title: 'Feather Touch',
    description: 'Executed a flawless touchdown with ≥95% landing softness',
    icon: 'feather',
    category: 'flight',
    accentColor: 'emerald',
  },
  max_fuel: {
    id: 'max_fuel',
    title: 'Eco-Pilot',
    description: 'Completed mission preserving ≥75% total fuel capacity',
    icon: 'zap',
    category: 'flight',
    accentColor: 'sky',
  },
  pristine_hull: {
    id: 'pristine_hull',
    title: 'Pristine Hull',
    description: 'Landed with 100% hull integrity and zero collision damage',
    icon: 'shield',
    category: 'flight',
    accentColor: 'teal',
  },
  speed_demon: {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Finished expedition significantly faster than target par time',
    icon: 'flame',
    category: 'flight',
    accentColor: 'amber',
  },
  heavy_hauler: {
    id: 'heavy_hauler',
    title: 'Heavy Hauler',
    description: 'Safely airlifted and delivered cargo container to destination LZ',
    icon: 'package',
    category: 'logistics',
    accentColor: 'amber',
  },
  rover_ferry: {
    id: 'rover_ferry',
    title: 'Surface Explorer',
    description: 'Embarked and delivered a Goliath rover vehicle to the LZ pad',
    icon: 'truck',
    category: 'logistics',
    accentColor: 'teal',
  },
  master_logistics: {
    id: 'master_logistics',
    title: 'Master Logistician',
    description: 'Delivered both cargo payload and vehicle rover in a single flight',
    icon: 'star',
    category: 'logistics',
    accentColor: 'purple',
  },
  first_touchdown: {
    id: 'first_touchdown',
    title: 'First Touchdown',
    description: 'Safely completed your first planetary cavern landing',
    icon: 'award',
    category: 'flight',
    accentColor: 'sky',
  },
  record_breaker: {
    id: 'record_breaker',
    title: 'Record Breaker',
    description: 'Established a brand-new planetary personal high score record',
    icon: 'trophy',
    category: 'mastery',
    accentColor: 'amber',
  },
  deep_scavenger: {
    id: 'deep_scavenger',
    title: 'Deep Scavenger',
    description: 'Refueled from 3 or more fuel caches during a single run',
    icon: 'sparkles',
    category: 'mastery',
    accentColor: 'sky',
  },
};

const STORAGE_KEY = 'gravity_lander_achievements_v1';

// In-memory unlock registry
let cachedUnlocked: Record<string, number> | null = null;

export function getUnlockedAchievements(): Record<string, number> {
  if (cachedUnlocked) return cachedUnlocked;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cachedUnlocked = raw ? JSON.parse(raw) : {};
  } catch {
    cachedUnlocked = {};
  }
  return cachedUnlocked || {};
}

// Global subscribers for real-time toast notifications
type AchievementCallback = (achievement: Achievement) => void;
const subscribers: Set<AchievementCallback> = new Set();

export function subscribeAchievements(cb: AchievementCallback): () => void {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

/**
 * Attempt to unlock an achievement.
 * If newly unlocked, saves to storage, emits to subscribers, and triggers a subtle sound chime.
 */
export function unlockAchievement(id: string): boolean {
  const achievement = ACHIEVEMENTS[id];
  if (!achievement) return false;

  const unlocked = getUnlockedAchievements();
  if (unlocked[id]) {
    return false; // Already unlocked previously
  }

  const now = Date.now();
  unlocked[id] = now;
  cachedUnlocked = unlocked;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
  } catch (err) {
    console.warn('Failed to save achievements to localStorage:', err);
  }

  // Play subtle sound chime
  sound.playAchievementChime();

  // Notify all toast listeners
  const achievementWithDate: Achievement = {
    ...achievement,
    unlockedAt: now,
  };

  subscribers.forEach((cb) => {
    try {
      cb(achievementWithDate);
    } catch (err) {
      console.error('Error in achievement subscriber:', err);
    }
  });

  return true;
}

/**
 * Checks all landing statistics against achievement criteria on touchdown.
 */
export function checkLandingAchievements(stats: {
  softnessScore: number;
  fuelRemaining: number;
  maxFuel?: number;
  hullRemaining: number;
  timeTaken: number;
  parTime: number;
  totalDeliveredCargo: number;
  totalDeliveredTrucks: number;
  isNewHighScore?: boolean;
}): void {
  // 1. First Touchdown
  unlockAchievement('first_touchdown');

  // 2. Perfect Landing (≥95% softness)
  if (stats.softnessScore >= 95) {
    unlockAchievement('perfect_landing');
  }

  // 3. Maximum Fuel Efficiency (≥75% fuel preserved, assuming standard 100 capacity)
  const maxFuel = stats.maxFuel || 100;
  const fuelPct = (stats.fuelRemaining / maxFuel) * 100;
  if (fuelPct >= 75) {
    unlockAchievement('max_fuel');
  }

  // 4. Pristine Hull (100% hull remaining)
  if (stats.hullRemaining >= 100) {
    unlockAchievement('pristine_hull');
  }

  // 5. Speed Demon (Completed under 75% of target par time or at least 15s faster)
  if (stats.timeTaken <= stats.parTime * 0.75 || (stats.parTime - stats.timeTaken >= 15 && stats.timeTaken < stats.parTime)) {
    unlockAchievement('speed_demon');
  }

  // 6. Logistics: Cargo Delivery
  if (stats.totalDeliveredCargo > 0) {
    unlockAchievement('heavy_hauler');
  }

  // 7. Logistics: Rover Delivery
  if (stats.totalDeliveredTrucks > 0) {
    unlockAchievement('rover_ferry');
  }

  // 8. Logistics: Master Logistician (Both cargo + rover in one flight)
  if (stats.totalDeliveredCargo > 0 && stats.totalDeliveredTrucks > 0) {
    unlockAchievement('master_logistics');
  }

  // 9. Record Breaker (New High Score)
  if (stats.isNewHighScore) {
    unlockAchievement('record_breaker');
  }
}
