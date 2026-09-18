export interface PlanetScoreEntry {
  timeSec: number; // in seconds
  score: number;
  craftId: string; // ship id e.g. 'viper', 'wasp', 'apollo'
  date: string;    // ISO timestamp
}

export interface CraftTimeEntry {
  timeSec: number; // in seconds
  score: number;
  date: string;    // ISO timestamp
}

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
  topRuns?: PlanetScoreEntry[];        // Single scoreboard: top 5 fastest runs overall
  topScoreRuns?: PlanetScoreEntry[];   // Single scoreboard: top 5 highest score runs overall
  craftBestTimes?: Record<string, CraftTimeEntry[]>; // legacy / backward compatibility
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
  const canonical = canonicalPlanetId(planetId);
  const scores = getStoredScores();
  const existing = findRecord(scores, canonical);
  const rec: PlanetRecord = existing
    ? { ...existing }
    : {
        bestTime: null,
        highScore: null,
        completedCount: 0,
        totalCargoCollected: 0,
        totalRoversCollected: 0,
        medalsEarned: {},
        firstLandingDate: null,
        lastPlayedDate: null,
        topRuns: [],
        craftBestTimes: {},
      };

  let wasRepaired = false;

  // 1. Gather all authentic runs from craftBestTimes (each craft has its own dedicated record list)
  const authenticCraftRuns: PlanetScoreEntry[] = [];
  if (rec.craftBestTimes) {
    for (const [cId, entries] of Object.entries(rec.craftBestTimes)) {
      if (Array.isArray(entries)) {
        for (const e of entries) {
          if (e && typeof e.timeSec === 'number') {
            authenticCraftRuns.push({
              timeSec: e.timeSec,
              score: e.score || 0,
              craftId: cId,
              date: e.date || rec.lastPlayedDate || new Date().toISOString(),
            });
          }
        }
      }
    }
  }

  // 2. Build or repair topRuns and topScoreRuns
  const combinedList: PlanetScoreEntry[] = [];

  if (rec.topRuns && Array.isArray(rec.topRuns) && rec.topRuns.length > 0) {
    for (const r of rec.topRuns) {
      if (r && typeof r.timeSec === 'number') {
        // Cross-reference with craftBestTimes to check if this time has a verified craft
        const match = authenticCraftRuns.find(
          a => Math.abs(a.timeSec - r.timeSec) < 0.05
        );
        const verifiedCraftId = match ? match.craftId : (r.craftId || 'apollo');
        if (r.craftId !== verifiedCraftId) {
          wasRepaired = true;
        }
        combinedList.push({
          timeSec: r.timeSec,
          score: r.score || 0,
          craftId: verifiedCraftId,
          date: r.date,
        });
      }
    }
  }

  if (rec.topScoreRuns && Array.isArray(rec.topScoreRuns) && rec.topScoreRuns.length > 0) {
    for (const r of rec.topScoreRuns) {
      if (r && typeof r.score === 'number') {
        const match = authenticCraftRuns.find(
          a => Math.abs(a.timeSec - r.timeSec) < 0.05
        );
        const verifiedCraftId = match ? match.craftId : (r.craftId || 'apollo');
        if (!combinedList.some(c => Math.abs(c.timeSec - r.timeSec) < 0.001 && c.craftId === verifiedCraftId)) {
          combinedList.push({
            timeSec: r.timeSec,
            score: r.score,
            craftId: verifiedCraftId,
            date: r.date,
          });
        }
      }
    }
  }

  // 3. Merge in any authentic craft runs that might be missing from topRuns
  for (const ac of authenticCraftRuns) {
    if (!combinedList.some(c => Math.abs(c.timeSec - ac.timeSec) < 0.001 && c.craftId === ac.craftId)) {
      combinedList.push(ac);
      wasRepaired = true;
    }
  }

  // 4. If still empty, but an overall bestTime or highScore was recorded from prior missions
  if (combinedList.length === 0 && (rec.bestTime !== null || rec.highScore !== null)) {
    combinedList.push({
      timeSec: rec.bestTime || 0,
      score: rec.highScore || 0,
      craftId: 'apollo', // Stable default original lander, NEVER dynamic getLastSelectedShipId()!
      date: rec.lastPlayedDate || rec.firstLandingDate || new Date().toISOString(),
    });
    wasRepaired = true;
  }

  // 5. Deduplicate and sort for Time (fastest timeSec ascending)
  const timeSorted = [...combinedList].sort((a, b) => a.timeSec - b.timeSec);
  const dedupedTime: PlanetScoreEntry[] = [];
  for (const item of timeSorted) {
    if (!dedupedTime.some(d => Math.abs(d.timeSec - item.timeSec) < 0.001 && d.craftId === item.craftId)) {
      dedupedTime.push(item);
    }
  }
  rec.topRuns = dedupedTime.slice(0, 5);

  // 6. Deduplicate and sort for Score (highest score descending, tiebreaker fastest timeSec)
  const scoreSorted = [...combinedList].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeSec - b.timeSec;
  });
  const dedupedScore: PlanetScoreEntry[] = [];
  for (const item of scoreSorted) {
    if (!dedupedScore.some(d => d.score === item.score && Math.abs(d.timeSec - item.timeSec) < 0.001 && d.craftId === item.craftId)) {
      dedupedScore.push(item);
    }
  }
  rec.topScoreRuns = dedupedScore.slice(0, 5);

  // Sync bestTime and highScore
  if (rec.topRuns.length > 0 && (rec.bestTime === null || rec.topRuns[0].timeSec < rec.bestTime)) {
    rec.bestTime = rec.topRuns[0].timeSec;
    wasRepaired = true;
  }
  if (rec.topScoreRuns.length > 0 && (rec.highScore === null || rec.topScoreRuns[0].score > rec.highScore)) {
    rec.highScore = rec.topScoreRuns[0].score;
    wasRepaired = true;
  }

  // Ensure craftBestTimes contains the runs from topRuns
  rec.craftBestTimes = rec.craftBestTimes || {};
  for (const run of rec.topRuns) {
    const list = rec.craftBestTimes[run.craftId] || [];
    if (!list.some(e => Math.abs(e.timeSec - run.timeSec) < 0.001)) {
      rec.craftBestTimes[run.craftId] = [...list, { timeSec: run.timeSec, score: run.score, date: run.date }]
        .sort((a, b) => a.timeSec - b.timeSec)
        .slice(0, 5);
      wasRepaired = true;
    }
  }

  // If repairs or backfills were made and we're in a browser environment, persist canonical record
  if (wasRepaired && typeof window !== 'undefined' && window.localStorage) {
    try {
      scores[canonical] = rec;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    } catch {
      // Ignore quota or private-browsing errors
    }
  }

  return rec;
}

export interface SaveScoreOptions {
  craftId?: string;
  timeSec: number;
  score: number;
  cargoCollected?: number;
  roversCollected?: number;
  medalsEarned?: string[]; // array of medal IDs
}

export interface SaveScoreResult {
  isNewBestTime: boolean;
  isNewHighScore: boolean;
  craftRank?: number | null; // 1 to 5 if in top 5, or null
  isNewCraftRecord?: boolean; // true if #1 for that craft
}

export function saveMissionScore(
  planetId: string,
  options: SaveScoreOptions
): SaveScoreResult {
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

          // Merge topRuns across aliases
          if (rec.topRuns) {
            const combined = [...(current.topRuns || []), ...rec.topRuns];
            combined.sort((a, b) => a.timeSec - b.timeSec);
            current.topRuns = combined.slice(0, 5);
          }

          // Merge craftBestTimes across aliases
          if (rec.craftBestTimes) {
            current.craftBestTimes = current.craftBestTimes || {};
            for (const [cId, entries] of Object.entries(rec.craftBestTimes)) {
              const combined = [...(current.craftBestTimes[cId] || []), ...entries];
              combined.sort((a, b) => a.timeSec - b.timeSec);
              const deduped: CraftTimeEntry[] = [];
              for (const e of combined) {
                if (!deduped.some(d => Math.abs(d.timeSec - e.timeSec) < 0.001 && d.date === e.date)) {
                  deduped.push(e);
                }
              }
              current.craftBestTimes[cId] = deduped.slice(0, 5);
            }
          }
        }
      }
    }

    const seed = getPlanetRecord(canonical);
    const isNewBestTime = seed.bestTime === null || options.timeSec < seed.bestTime;
    const isNewHighScore = seed.highScore === null || options.score > seed.highScore;
    const now = new Date().toISOString();
    // Use the explicitly provided craftId from the simulation, fallback to 'apollo' if missing
    const craftId = options.craftId || 'apollo';

    // Update medal counts
    const updatedMedals = { ...(seed.medalsEarned || {}) };
    if (options.medalsEarned) {
      for (const medalId of options.medalsEarned) {
        updatedMedals[medalId] = (updatedMedals[medalId] || 0) + 1;
      }
    }

    // New run entry for single scoreboard (max 5 lines)
    const newRun: PlanetScoreEntry = {
      timeSec: options.timeSec,
      score: options.score,
      craftId,
      date: now,
    };

    const existingTopRuns = [...(seed.topRuns || [])];
    const combinedRuns = [...existingTopRuns, newRun].sort((a, b) => a.timeSec - b.timeSec);
    const dedupedTopRuns: PlanetScoreEntry[] = [];
    for (const r of combinedRuns) {
      if (!dedupedTopRuns.some(d => Math.abs(d.timeSec - r.timeSec) < 0.001 && d.date === r.date && d.craftId === r.craftId)) {
        dedupedTopRuns.push(r);
      }
    }
    const updatedTopRuns = dedupedTopRuns.slice(0, 5);

    // Update topScoreRuns (by highest score)
    const existingTopScoreRuns = [...(seed.topScoreRuns || [])];
    const combinedScoreRuns = [...existingTopScoreRuns, newRun].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeSec - b.timeSec;
    });
    const dedupedTopScoreRuns: PlanetScoreEntry[] = [];
    for (const r of combinedScoreRuns) {
      if (!dedupedTopScoreRuns.some(d => d.score === r.score && Math.abs(d.timeSec - r.timeSec) < 0.001 && d.date === r.date && d.craftId === r.craftId)) {
        dedupedTopScoreRuns.push(r);
      }
    }
    const updatedTopScoreRuns = dedupedTopScoreRuns.slice(0, 5);

    // Determine rank in top 5 (1 to 5)
    const rankIdx = updatedTopRuns.findIndex(
      r => r === newRun || (Math.abs(r.timeSec - newRun.timeSec) < 0.001 && r.date === newRun.date && r.craftId === newRun.craftId)
    );
    const craftRank = rankIdx !== -1 ? rankIdx + 1 : null;
    const isNewCraftRecord = craftRank === 1;

    // Backward compatible craft best times
    const updatedCraftBestTimes: Record<string, CraftTimeEntry[]> = {};
    if (seed.craftBestTimes) {
      for (const [cId, entries] of Object.entries(seed.craftBestTimes)) {
        updatedCraftBestTimes[cId] = [...entries];
      }
    }
    const existingCraftList = updatedCraftBestTimes[craftId] || [];
    updatedCraftBestTimes[craftId] = [...existingCraftList, { timeSec: options.timeSec, score: options.score, date: now }]
      .sort((a, b) => a.timeSec - b.timeSec)
      .slice(0, 5);

    const updated: PlanetRecord = {
      bestTime: isNewBestTime ? options.timeSec : seed.bestTime,
      highScore: isNewHighScore ? options.score : seed.highScore,
      completedCount: (seed.completedCount || 0) + 1,
      totalCargoCollected: (seed.totalCargoCollected || 0) + (options.cargoCollected || 0),
      totalRoversCollected: (seed.totalRoversCollected || 0) + (options.roversCollected || 0),
      medalsEarned: updatedMedals,
      firstLandingDate: seed.firstLandingDate || now,
      lastPlayedDate: now,
      topRuns: updatedTopRuns,
      topScoreRuns: updatedTopScoreRuns,
      craftBestTimes: updatedCraftBestTimes,
    };

    // Remove stale aliased keys for this world, then store under canonical id.
    for (const key of Object.keys(scores)) {
      if (canonicalPlanetId(key) === canonical && key !== canonical) {
        delete scores[key];
      }
    }
    scores[canonical] = updated;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    return { isNewBestTime, isNewHighScore, craftRank, isNewCraftRecord };
  } catch {
    return { isNewBestTime: false, isNewHighScore: false, craftRank: null, isNewCraftRecord: false };
  }
}

/** Get up to 5 best times overall for a planet (single scoreboard). */
export function getPlanetTopRuns(planetId: string): PlanetScoreEntry[] {
  const rec = getPlanetRecord(planetId);
  return rec.topRuns || [];
}

/** Get up to 5 highest scores overall for a planet (single scoreboard). */
export function getPlanetTopScoreRuns(planetId: string): PlanetScoreEntry[] {
  const rec = getPlanetRecord(planetId);
  return rec.topScoreRuns || [];
}

/** Get up to 5 best times for a specific craft on a planet. */
export function getCraftTopTimes(planetId: string, craftId: string): CraftTimeEntry[] {
  const rec = getPlanetRecord(planetId);
  return rec.craftBestTimes?.[craftId] || [];
}

/** Returns the fastest craft recorded on a world, or null. */
export function getPlanetFastestCraft(planetId: string): { craftId: string; bestTime: number } | null {
  const rec = getPlanetRecord(planetId);
  if (rec.topRuns && rec.topRuns.length > 0) {
    return { craftId: rec.topRuns[0].craftId, bestTime: rec.topRuns[0].timeSec };
  }
  if (!rec.craftBestTimes) return null;
  let fastest: { craftId: string; bestTime: number } | null = null;
  for (const [cId, entries] of Object.entries(rec.craftBestTimes)) {
    if (entries.length > 0) {
      const top = entries[0];
      if (!fastest || top.timeSec < fastest.bestTime) {
        fastest = { craftId: cId, bestTime: top.timeSec };
      }
    }
  }
  return fastest;
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
  fastestCraftOverall?: { planetId: string; craftId: string; timeSec: number } | null;
  totalCraftsFlown?: number;
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
  let fastestCraftOverall: { planetId: string; craftId: string; timeSec: number } | null = null;
  const flownCraftIds = new Set<string>();

  for (const planet of planets) {
    const record = getPlanetRecord(planet.id);
    if (!record || (record.completedCount === 0 && (!record.topRuns || record.topRuns.length === 0))) continue;

    totalLandings += record.completedCount || 0;
    totalCargoCollected += record.totalCargoCollected || 0;
    totalRoversCollected += record.totalRoversCollected || 0;

    for (const [medalId, count] of Object.entries(record.medalsEarned || {})) {
      medalIds.add(medalId);
      totalMedalsCount += count;
    }

    if (record.topRuns && record.topRuns.length > 0) {
      for (const run of record.topRuns) {
        if (run.craftId) {
          flownCraftIds.add(run.craftId);
          if (!fastestCraftOverall || run.timeSec < fastestCraftOverall.timeSec) {
            fastestCraftOverall = { planetId: planet.id, craftId: run.craftId, timeSec: run.timeSec };
          }
        }
      }
    }

    if (record.craftBestTimes) {
      for (const [cId, entries] of Object.entries(record.craftBestTimes)) {
        if (entries.length > 0) {
          flownCraftIds.add(cId);
          const top = entries[0];
          if (!fastestCraftOverall || top.timeSec < fastestCraftOverall.timeSec) {
            fastestCraftOverall = { planetId: planet.id, craftId: cId, timeSec: top.timeSec };
          }
        }
      }
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
    fastestCraftOverall,
    totalCraftsFlown: flownCraftIds.size,
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

