# Repository Notes — Gravity-Lander
## Craft Graphics (Two Sources — Remember This)
- In-game: src/game/shipDrawers.ts (renderShipHull / drawWasp)
- Menu / Catalogue: src/components/ShipGraphic.tsx (hardcoded SVG)
- Must sync both when changing craft design. Broken canvas wrapper (ba38ec6) removed SVG and left menu cards blank — restored to working SVG.
- Wasp details added: brushed titanium pods + seams + rivets, multi-stop gold MLI, faceted cabin seams, antenna spikes.
- Colonial Viper (1st craft, id 'viper'): fidelity pass — long needle nose + dark gunmetal nose cap w/ sensor dot; CURVED (quadratic) wing leading edges with red chevron stripes; twin golden cannon mounts forward of canopy w/ pointed muzzles + black base bands; twin engine nacelles with vent-slit grilles, exhaust faces at local (±7.5, ~23.5) ALIGNED to thruster anchors localPoints (±10.5, 33.6) at renderScale 1.4; light-grey hull (#c5c9d0) with panel grid + access hatches; hexagonal navy canopy (#0d1b4c) pointed front/rear with internal framing; red dorsal stripe rear→mid. Canvas drawViper + SVG block share coordinates; SVG gradients viper-hull/wing/gun/nozzle/canopy-grad. React JSX uses camelCase (stopColor/strokeWidth) — browser + canvas render fine.
## Landing Gear & Canvas Path Isolation (NEVER CONNECT FOOTPADS)
- In HTML Canvas (`shipDrawers.ts`), methods like `arc`, `ellipse`, and native `roundRect` will automatically draw an implicit connecting line (`lineTo`) from the previous subpath endpoint if called consecutively within the same subpath before `stroke()`.
- Disconnected symmetrical components (especially left and right landing gear footpads, knuckles, sensors, or twin thruster bells) MUST NEVER share an open subpath.
- ALWAYS isolate them: either call `ctx.beginPath()` / `ctx.fill()` / `ctx.stroke()` per footpad, or explicitly `ctx.moveTo()` to the start of the next shape.
- The `roundRect` helper in `shipDrawers.ts` is implemented with an explicit `moveTo(x + radius, y)` and `arcTo` to avoid browser-native connecting lines between consecutive rects.
## Build
- npx tsc --noEmit
- ALWAYS update both: shipDrawers.ts (in-game) AND ShipGraphic.tsx (menu SVG)
