# Gravity-Lander — Agent Memory

## Project overview
A physics-based lunar/cavern lander game (React + Vite + TypeScript, Tailwind CSS,
lucide-react icons) with dual thrusters, heavy-transport rover/truck missions,
multi-route alien worlds, and an interactive level editor.

## Common commands
- `npm run dev` — start the Vite dev server (serves on http://localhost:3000/)
- `npx tsc --noEmit` — type-check only (the "lint" script). Use this before committing.
- `npm run build` — full production build; runs `scripts/generate-pwa-assets.js` (PWA icons) then `tsc && vite build`
- `npm run preview` — preview the built output
- Playwright scripts: `node <script>.mjs` with a dev server running; use `playwright-core` + `chromium.launch()` in eval scripts.

## Repository structure
- `src/game/` — core game logic: physics, planets, sound, particles/HUD
- `src/components/` — UI: StartMenu, LogbookModal, PlanetCardSlider, PlanetSelector, ShipSelector, SettingsModal, VersionHistoryModal, FlightHUD
- `src/utils/` — medals, scoreStorage, versionHistory, customMapsStorage, fullscreen, pwaInstall
- `metadata.json` + `public/manifest.json` — PWA/app metadata (do not confuse with AGENTS.md)
- `scripts/generate-pwa-assets.js` — regenerates PWA icon assets

## Conventions & gotchas
- **Versioning**: the single source of truth is `src/utils/versionHistory.ts` —
  `CURRENT_GAME_VERSION` (e.g. `v1.7.0`) plus `GAME_VERSION_HISTORY[]`.
  When bumping, mirror the version in `package.json` AND `package-lock.json`
  (both the root and the packages[""] entries). Latest release entry is tagged `LATEST`.
- **Logbook medals**: medal popups read `medal.description` from `src/utils/medals.ts`.
  Medals are identified by id (snake_case) and evaluated against a `MedalContext`.
- **No update banner**: the top-left "UPDATE" banner was removed in v1.7.0. There is a
  separate, still-present PWA install banner; don't confuse the two.
- **Persistence**: scores/records persist in localStorage under `gravity_lander_scores_v1`
  (per-planet records with `medalsEarned`, bestTime, highScore, counts, dates).
- **UI automation**: use real mouse clicks (locator.click()) rather than dispatchEvent for
  reliable headless testing of interactive elements.

## Git workflow
- Main development branch: `main` (pushed to `origin/main`).
- A remote branch `remove-procedural-menu` points at the same commit as `main`
  (redundant — candidate for deletion, not upstream work).
- Commit style: conventional commits; include `Co-authored-by: openhands <openhands@all-hands.dev>`.
- Do not commit `promethean_core.json` at repo root unless a tracking convention is established.