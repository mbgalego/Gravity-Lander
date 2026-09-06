export type MinimapSize = 'small' | 'medium' | 'large' | 'xl';
export type MinimapCorner = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface PlayerPrefs {
  /** Multiplier applied on top of the auto camera zoom. 1.0 = default behavior. */
  zoomBias: number;
  showMinimap: boolean;
  minimapSize: MinimapSize;
  minimapCorner: MinimapCorner;
}

const STORAGE_KEY = 'gravity_lander_player_prefs_v1';

export const MIN_ZOOM_BIAS = 0.6;
export const MAX_ZOOM_BIAS = 2.0;

export const DEFAULT_PLAYER_PREFS: PlayerPrefs = {
  zoomBias: 1,
  showMinimap: false,
  minimapSize: 'medium',
  minimapCorner: 'top-right',
};

const isMinimapSize = (v: unknown): v is MinimapSize =>
  v === 'small' || v === 'medium' || v === 'large' || v === 'xl';

const isMinimapCorner = (v: unknown): v is MinimapCorner =>
  v === 'top-right' || v === 'top-left' || v === 'bottom-right' || v === 'bottom-left';

export function loadPlayerPrefs(): PlayerPrefs {
  const fallback = { ...DEFAULT_PLAYER_PREFS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PlayerPrefs>;
    return {
      zoomBias:
        typeof parsed.zoomBias === 'number' && parsed.zoomBias >= MIN_ZOOM_BIAS && parsed.zoomBias <= MAX_ZOOM_BIAS
          ? parsed.zoomBias
          : fallback.zoomBias,
      showMinimap: typeof parsed.showMinimap === 'boolean' ? parsed.showMinimap : fallback.showMinimap,
      minimapSize: isMinimapSize(parsed.minimapSize) ? parsed.minimapSize : fallback.minimapSize,
      minimapCorner: isMinimapCorner(parsed.minimapCorner) ? parsed.minimapCorner : fallback.minimapCorner,
    };
  } catch {
    return fallback;
  }
}

export function savePlayerPrefs(prefs: PlayerPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage unavailable (private mode, quota); prefs just won't persist.
  }
}