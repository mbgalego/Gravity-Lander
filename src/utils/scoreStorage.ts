export interface PlanetRecord {
  bestTime: number | null; // in seconds
  highScore: number | null;
  completedCount: number;
  // NEW FIELDS for Logbook
  totalCargoCollected: number;
  totalRoversCollected: number;
  medalsEarned: Record<string, number>; // medalId -> count
  firstLandingDate: string | null;      // ISO string
  lastPlayedDate: string | null;
}

const STORAGE_KEY = 'gravity_lander_scores_v1';

/**
 * Normalize a planet identifier to a canonical form so that the same logical
 * world aliases to one record, WITHOUT collapsing distinct community maps.
 *
 * - Official worlds: `luna`, `official-luna`, `custom-official-luna` all -> `luna`
 * - Custom maps:     `custom-map-123`, `custom-custom-map-123` both -> `custom-map-123`
 */
export function canonicalPlanetId(id: string): string {
  let clean = id || '';

  // Strip the converter wrapper on custom worlds (once).
  if (clean.startsWith('custom-')) {
    clean = clean.slice('custom-'.length);
    // If stripping reveals another 'custom-' wrapper (custom-custom-map-x), strip again
    if (clean.startsWith('custom-')) clean = clean.slice('custom-'.length);
  }

  // Strip official wrapper when it prefixes something, so custom-official-luna -> luna
  if (clean.startsWith('official-')) {
    clean = clean.slice('official-'.length);
  }

  return clean;
}

export function getStoredScores(): Record<string, PlanetRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** Look up a record tolerating any key form that canonicalizes to planetId. */
function findRecord(scores: Record<string, PlanetRecord>, planetId: string): PlanetRecord | null {
  const canonical = canonicalPlanetId(planetId);
  for (const [key, rec] of Object.entries(scores)) {
    if (canonicalPlanetId(key) === canonical) return rec;
  }
  return null;
}

export function getPlanetRecord(planetId: string): PlanetRecord {
  const scores = getStoredScores();
  const existing = findRecord(scores, planetId);
  return existing || {
    bestTime: null,
    highScore: null,
    completedCount: 0,
    totalCargoCollected: 0,
    totalRoversCollected: 0,
    medalsEarned: {},
    firstLandingDate: null,
    lastPlayedDate: null,
  };
}

export interface SaveScoreOptions {
  timeSec: number;
  score: number;
  cargoCollected?: number;
  roversCollected?: number;
  medalsEarned?: string[]; // array of medal IDs
}

export function saveMissionScore(
  planetId: string,
  options: SaveScoreOptions
): { isNewBestTime: boolean; isNewHighScore: boolean } {
  try {
    const canonical = canonicalPlanetId(planetId);
    const scores = getStoredScores();

    // Merge any legacy aliased records (e.g. `custom-official-luna`) into one canonical entry.
    let current: PlanetRecord | null = null;
    for (const [key, rec] of Object.entries(scores)) {
      if (canonicalPlanetId(key) === canonical) {
        if (!current) {
          current = { ...rec };
        } else {
          // Merge best time / score / counters across aliases
          current.bestTime = current.bestTime === null || (rec.bestTime !== null && rec.bestTime < current.bestTime) ? (rec.bestTime ?? current.bestTime) : current.bestTime;
          current.highScore = current.highScore === null || (rec.highScore !== null && rec.highScore > current.highScore) ? (rec.highScore ?? current.highScore) : current.highScore;
          current.completedCount = (current.completedCount || 0) + (rec.completedCount || 0);
          current.totalCargoCollected = (current.totalCargoCollected || 0) + (rec.totalCargoCollected || 0);
          current.totalRoversCollected = (current.totalRoversCollected || 0) + (rec.totalRoversCollected || 0);
          current.medalsEarned = { ...(rec.medalsEarned || {}), ...(current.medalsEarned || {}) };
          current.firstLandingDate = current.firstLandingDate || rec.firstLandingDate;
          current.lastPlayedDate = current.lastPlayedDate || rec.lastPlayedDate;
        }
      }
    }
    const seed = current || {
      bestTime: null,
      highScore: null,
      completedCount: 0,
      totalCargoCollected: 0,
      totalRoversCollected: 0,
      medalsEarned: {},
      firstLandingDate: null,
      lastPlayedDate: null,
    };

    const isNewBestTime = seed.bestTime === null || options.timeSec < seed.bestTime;
    const isNewHighScore = seed.highScore === null || options.score > seed.highScore;
    const now = new Date().toISOString();

    // Update medal counts
    const updatedMedals = { ...(seed.medalsEarned || {}) };
    if (options.medalsEarned) {
      for (const medalId of options.medalsEarned) {
        updatedMedals[medalId] = (updatedMedals[medalId] || 0) + 1;
      }
    }

    const updated: PlanetRecord = {
      bestTime: isNewBestTime ? options.timeSec : seed.bestTime,
      highScore: isNewHighScore ? options.score : seed.highScore,
      completedCount: (seed.completedCount || 0) + 1,
      totalCargoCollected: (seed.totalCargoCollected || 0) + (options.cargoCollected || 0),
      totalRoversCollected: (seed.totalRoversCollected || 0) + (options.roversCollected || 0),
      medalsEarned: updatedMedals,
      firstLandingDate: seed.firstLandingDate || now,
      lastPlayedDate: now,
    };

    // Remove stale aliased keys for this world, then store under canonical id.
    for (const key of Object.keys(scores)) {
      if (canonicalPlanetId(key) === canonical && key !== canonical) {
        delete scores[key];
      }
    }
    scores[canonical] = updated;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return { isNewBestTime, isNewHighScore };
  } catch {
    return { isNewBestTime: false, isNewHighScore: false };
  }
}

// Global summary for Logbook "All Worlds" tab
export interface WorldSummary {
  totalLandings: number;
  totalFlightTimeSec: number;
  totalCargoCollected: number;
  totalRoversCollected: number;
  uniqueMedalsCount: number;
  totalMedalsCount: number;
  favoritePlanet: { id: string; name: string; landings: number } | null;
  firstLandingOverall: { planetId: string; date: string } | null;
  bestOverallScore: { planetId: string; score: number } | null;
}

export function getWorldSummary(planets: Array<{ id: string; name: string }>): WorldSummary {
  const scores = getStoredScores();
  let totalLandings = 0;
  let totalFlightTimeSec = 0;
  let totalCargoCollected = 0;
  let totalRoversCollected = 0;
  const medalIds = new Set<string>();
  let totalMedalsCount = 0;
  let favoritePlanet: { id: string; name: string; landings: number } | null = null;
  let firstLandingOverall: { planetId: string; date: string } | null = null;
  let bestOverallScore: { planetId: string; score: number } | null = null;

  for (const planet of planets) {
    const record = findRecord(scores, planet.id);
    if (!record) continue;

    totalLandings += record.completedCount || 0;
    totalCargoCollected += record.totalCargoCollected || 0;
    totalRoversCollected += record.totalRoversCollected || 0;

    for (const [medalId, count] of Object.entries(record.medalsEarned || {})) {
      medalIds.add(medalId);
      totalMedalsCount += count;
    }

    if (record.firstLandingDate) {
      if (!firstLandingOverall || record.firstLandingDate < firstLandingOverall.date) {
        firstLandingOverall = { planetId: planet.id, date: record.firstLandingDate };
      }
    }

    if (record.highScore) {
      if (!bestOverallScore || record.highScore > bestOverallScore.score) {
        bestOverallScore = { planetId: planet.id, score: record.highScore };
      }
    }

    const landings = record.completedCount || 0;
    if (landings > (favoritePlanet?.landings || 0)) {
      favoritePlanet = { id: planet.id, name: planet.name, landings };
    }
  }

  // Estimate flight time: average 2 min per landing (rough)
  totalFlightTimeSec = totalLandings * 120;

  return {
    totalLandings,
    totalFlightTimeSec,
    totalCargoCollected,
    totalRoversCollected,
    uniqueMedalsCount: medalIds.size,
    totalMedalsCount,
    favoritePlanet,
    firstLandingOverall,
    bestOverallScore,
  };
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

