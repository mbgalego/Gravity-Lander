# Repository Notes — Gravity-Lander
## Craft Graphics (Two Sources — Remember This)
- In-game: src/game/shipDrawers.ts (renderShipHull / drawWasp)
- Menu / Catalogue: src/components/ShipGraphic.tsx (hardcoded SVG)
- Must sync both when changing craft design. Broken canvas wrapper (ba38ec6) removed SVG and left menu cards blank — restored to working SVG.
- Wasp details added: brushed titanium pods + seams + rivets, multi-stop gold MLI, faceted cabin seams, antenna spikes.
## Build
- npx tsc --noEmit
- ALWAYS update both: shipDrawers.ts (in-game) AND ShipGraphic.tsx (menu SVG)
