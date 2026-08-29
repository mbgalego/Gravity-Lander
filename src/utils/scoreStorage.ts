export interface PlanetRecord {
  bestTime: number | null; // in seconds
  highScore: number | null;
  completedCount: number;
}

const STORAGE_KEY = 'gravity_lander_scores_v1';

export function getStoredScores(): Record<string, PlanetRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function getPlanetRecord(planetId: string): PlanetRecord {
  const scores = getStoredScores();
  return scores[planetId] || {
    bestTime: null,
    highScore: null,
    completedCount: 0,
  };
}

export function saveMissionScore(
  planetId: string,
  timeSec: number,
  score: number
): { isNewBestTime: boolean; isNewHighScore: boolean } {
  try {
    const scores = getStoredScores();
    const current = scores[planetId] || {
      bestTime: null,
      highScore: null,
      completedCount: 0,
    };

    const isNewBestTime = current.bestTime === null || timeSec < current.bestTime;
    const isNewHighScore = current.highScore === null || score > current.highScore;

    scores[planetId] = {
      bestTime: isNewBestTime ? timeSec : current.bestTime,
      highScore: isNewHighScore ? score : current.highScore,
      completedCount: (current.completedCount || 0) + 1,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return { isNewBestTime, isNewHighScore };
  } catch {
    return { isNewBestTime: false, isNewHighScore: false };
  }
}

const LAST_PLANET_KEY = 'gravity_lander_last_planet_id_v2';
const LAST_SHIP_KEY = 'gravity_lander_last_ship_id_v2';

export function getLastPlayedPlanetId(): string {
  try {
    return localStorage.getItem(LAST_PLANET_KEY) || 'luna';
  } catch {
    return 'luna';
  }
}

export function saveLastPlayedPlanetId(planetId: string): void {
  try {
    if (planetId) {
      localStorage.setItem(LAST_PLANET_KEY, planetId);
    }
  } catch {}
}

export function getLastSelectedShipId(): string {
  try {
    return localStorage.getItem(LAST_SHIP_KEY) || 'apollo';
  } catch {
    return 'apollo';
  }
}

export function saveLastSelectedShipId(shipId: string): void {
  try {
    if (shipId) {
      localStorage.setItem(LAST_SHIP_KEY, shipId);
    }
  } catch {}
}

