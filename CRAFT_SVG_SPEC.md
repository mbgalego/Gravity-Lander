# Gravity-Lander Craft SVG Import Spec

You are designing a **2D top-down spaceship** for the game *Gravity-Lander*.
Your single deliverable is **one standalone SVG file** following the rules below.
A conversion tool will turn that SVG into the game's native format
(in-game Canvas renderer + menu SVG + ship config). If you follow these rules,
**no gameplay features are lost** — notably the **spring landing gear**, the
per-engine **thruster flames**, and the **damage effects** (smoke/sparks/flame
flicker when the hull is damaged).

---

## 1. Coordinate system (mandatory)

- Single SVG, **`viewBox="-40 -40 80 80"`** — put this attribute on the `<svg>`.
- **Top-down / plan view**, **nose pointing UP** (negative Y), engines at the **BOTTOM** (positive Y).
- Draw the craft **inside** the box: `x ∈ [-40, 40]`, `y ∈ [-40, 40]`.
- Recommended proportions:
  - Nose tip ≈ `y = -38` (top of box)
  - Main body roughly centered on **`x = 0`**
  - **Footpads / landing pads at `y = 30`** (bottom area)
- **Symmetry:** make the craft **mirror-symmetric about the X-axis line `x = 0`**
  (left half mirrors right half). This is required for correct physics and flight balance.
- All coordinates and stroke widths are in these same game units.
  `1` unit ≈ 1 SVG pixel.

```
             nose  (-38)                ▲ UP = FORWARD
              ▀▀▀
            hull body (≈ ±40 wide at most)
            engines (≈ y 16–24)
      footpads (y = 30)                 ▼ engines / DOWN = REAR
```

## 2. Paint order (bottom → top)

Your document order **is** the draw order — later elements paint on top of earlier ones.
Use this order so z-indexing stays correct after conversion:

1. **Landing gear** (struts + footpads) — always painted first
2. **Wings / fins / side pods** (swept shapes under the body)
3. **Hull** (main body/centerline)
4. **Engines / nacelles** (rear blocks)
5. **Canopy / glass** (if any)
6. **Details** (panel lines, hatches, rivets, stripes, lights) — painted last, on top

## 3. Marking parts with `data-part` (the critical part)

Tag each meaningful group with a `data-part` attribute. This is what lets the
converter map your SVG to game features (spring, thrusters, damage). **Every
craft must contain:** `hull`, `engine`, `landing-gear`, and at least two `footpad`.

| `data-part` | Meaning | Required? | Converter uses it to… |
|---|---|---|---|
| `data-part="hull"` | Main body / center fuselage (fills + outline) | ✅ | Anchor smoke & sparks (damage), compute center of mass, space for detail layer |
| `data-part="nose"` | Forward point / spike (part of or above the hull) | optional | Set forward extremity for aim/collision feel |
| `data-part="wing"` | Wings / fins / side pods | optional | Preserve sweep + placement on top of hull ordering |
| `data-part="canopy"` | Glass/canopy (drawn semi-transparent) | optional | Apply canopy gradient + glow treatment |
| `data-part="engine"` | **One tag PER engine nozzle/exhaust** | ✅ | Compute **thruster anchor** (flames fire here); engine degradation attaches here |
| `data-part="rcs"` | Small RCS thruster quads | optional | Minor animated hint or static detail |
| `data-part="landing-gear"` | Struts/legs connecting hull → footpads | ✅ | **Redraw dynamically during gear spring** so legs stretch/compress |
| `data-part="footpad"` | One tag PER contact pad | ✅ (≥2) | Contact line → landing height; pads stay planted while hull springs |
| `data-part="detail"` | Panel lines, hatches, rivets, stripes, markings | optional | Painted last above hull (details) |
| `data-part="navlight"` | Tiny colored lights | optional | Converted to colored dots (blink added in game) |

### Engine labelling (`data-engine`)

Known engines → thrusters:

- `data-engine="left"` → mapped to the **left thruster** (port, left side of screen)
- `data-engine="right"` → mapped to the **right thruster** (starboard, right side)
- `data-engine="center"` → NOT dynamically fired (the game is dual-thruster only). It is imported as a **static exhaust detail** — the craft will still fly, but no flame ever fires from it.

The thruster anchor is the **center of the nozzle's exit plane** — the edge of the
polygon with the greatest y, averaged across its x endpoints — NOT the polygon's
centroid (the centroid sits above the opening, which offsets flames).
The converter applies the ship's render scale automatically, so the in-game flame
will fire straight out of your nozzle opening.

### Footpad labelling

Any number of pads is fine (2 typical, up to 4 for heavy crafts). Tag each with
its own `<g data-part="footpad">`. Pads should look like **blades / ellipses /
rounded rects**, never a single closed shape that loops between the two sides.
The converter takes the **pad Y position (≈ 30)** as the contact height
(`localPoints.leftFoot.y`) used by the landing physics.

## 4. Rules that preserve gameplay features

### 4.1 Spring landing gear
- Draw **gear as separate segments**: each strut starts at an anchor point on the
  **hull** and ends at a **footpad**. Do **not** merge struts + hull into one body.
- Draw left and right gear independently (never one open path connecting both).
- In-game, when landing, the **hull sinks** (`gearSpringOffset` shrinks the body
  toward the pads) while **footpads stay on the ground**. Because you keep struts
  as their own `landing-gear` / `footpad` parts, the converter preserves this exactly.

### 4.2 Engines & thruster flames
- Draw **only the nozzle/exhaust openings** (rects, circles, nacelle blocks).
- **Do NOT draw flames, exhaust glow, or engine fire** — the game renders flames
  dynamically and they will be layered onto your nozzles automatically.
- Position nozzles at the craft's bottom (`y ≈ 16–24`), symmetric left/right.
- Flame reaches the outside of the box only if nozzles are near `y = 30` max;
  recommend keeping nozzles above `y ≈ 24` so flame draw-space stays clean.

### 4.3 Damage effects (smoke, sparks, degraded engine)
- Keep the **hull centered on `x = 0`** — smoke and sparks spawn at the hull's
  center position in the game.
- Hull breakpoint: below ~50% hull the craft **smokes**; below ~35% the engine
  **sputters** (flame flicker + sparks). You don't need to draw any smoke/fire —
  the game adds it — but making the hull a single well-defined body (not scattered
  fragments) gives the effects a clean anchor.

### 4.4 Details
- Panel lines: thin strokes (`stroke-width ≤ 0.5`), slightly darker than the hull.
- Hatches/rivets: small filled shapes; keep them small and symmetric.
- Stripes (e.g. Viper chevrons): filled polygons.
- Details are auto-rendered **above** the hull in both views.

## 5. What to EXCLUDE from the SVG

The game renders these on top dynamically — if you draw them they will duplicate
or fight the game visuals:

- ❌ Engine flames / exhaust glow / any fire
- ❌ Landing glow / ground shadow / landing pad marker
- ❌ HUD text, crosshairs, arrows, coordinates
- ❌ Missiles, bombs, cargo crates (they are separate game entities)
- ❌ Sensors overlays, circular radar rings

## 6. SVG authoring constraints (Canvas-compatible)

The converter targets HTML5 Canvas. Keep the SVG to what Canvas can do:

- ✅ Inline **presentation attributes** (`fill="…"`, `stroke="…"`, `stroke-width="…"`).
  **No CSS stylesheets, no `<style>` blocks, no `class`-based styling.**
- ✅ Hex colors (`#0d1b4c`) or CSS color names. Use **hex**.
- ✅ `opacity`, `fill-opacity`, `stroke-opacity` (0–1).
- ✅ Grouping with `<g>`; `transform` (`translate`, `rotate`, `scale`, `matrix`).
- ✅ `linearGradient` and `radialGradient` inside `<defs>` with `id`s and hex
  `stop-color` stops. Each gradient must have a **unique id**.
- ✅ Basic shapes: `<path>` (L/C/Q/A), `<rect>`, `<circle>`, `<ellipse>`,
  `<polygon>`, `<polyline>`, `<line>`; `stroke-dasharray`; `stroke-linecap`.
- ❌ `<filter>` (blur/glow), `<mask>`, `<clipPath>`/`<clip-path>`,
  `<pattern>`, `<text>`, `<image>`, `<foreignObject>`, mesh gradients.
  *(Approximate glow with low-opacity shapes / radial gradients instead.)*
- ❌ External file references (`<use href="other.svg">`). Self-contained only.
- Keep the shape count reasonable (**< ~250 primitives**) for canvas performance.

## 7. Optional: craft stats (skip if not supplied)

If you want to influence flight feel (otherwise defaults are used), add a small
comment block at the top of the file:

```svg
<!-- STATS
  mass: 1.55          (0.8–3.0; bigger = heavier/slower)
  thrustMultiplier: 1.0  (0.7–1.8)
  torqueMultiplier: 1.0  (0.6–1.5; rotation responsiveness)
  fuelCapacity: 100      (keep 60–140)
  renderScale: 1.4       (1.2–1.8; how large the hull appears vs world units)
-->
```

## 8. Deliverable checklist (verify before submitting)

- [ ] `viewBox="-40 -40 80 80"` present; craft fully inside the box
- [ ] Nose up, mirror-symmetric about `x = 0`
- [ ] `data-part` tags present for: `hull`, each `engine`, `landing-gear`, each `footpad`
- [ ] Gear drawn hull→pad, left and right separate
- [ ] No flames / glow / ground shadow / HUD drawn
- [ ] No filters / masks / clip paths / text; inline attrs only; unique gradient ids
- [ ] Footnotes: footpads near `y = 30`; nozzles near `y ≈ 16–24`symmetric
- [ ] Document order = paint order: gear → wings → hull → engines → canopy → details
- [ ] SVG validates (open it in a browser; nothing clipped, nothing missing)

---

### Minimal template

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
  <defs>
    <linearGradient id="hull" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#e8eef5"/>
      <stop offset="1" stop-color="#7f8b99"/>
    </linearGradient>
  </defs>

  <!-- 1. LANDING GEAR -->
  <g data-part="landing-gear">
    <path d="M -9 -2 L -20 28" stroke="#94a3b8" stroke-width="1.2" fill="none"/>
    <path d="M  9 -2 L  20 28" stroke="#94a3b8" stroke-width="1.2" fill="none"/>
  </g>
  <!-- 1b. FOOTPADS (at y=30) -->
  <g data-part="footpad" transform="translate(-20 29.5)">
    <ellipse rx="5" ry="1.4" fill="#334155"/>
  </g>
  <g data-part="footpad" transform="translate(20 29.5)">
    <ellipse rx="5" ry="1.4" fill="#334155"/>
  </g>

  <!-- 2. WINGS -->
  <g data-part="wing" fill="url(#hull)" stroke="#334155" stroke-width="0.8">
    <path d="M0 -2 L6 -2 Q22 3 34 15 L22 21 L7 19 L0 17 Z"/>
    <path d="M0 -2 L-6 -2 Q-22 3 -34 15 L-22 21 L-7 19 L0 17 Z"/>
  </g>

  <!-- 3. HULL -->
  <g data-part="hull" fill="url(#hull)" stroke="#3f4a57" stroke-width="0.8">
    <path d="M -4.5 -38 L 4.5 -38 Q 6 -24 5.4 -14 L 5.4 6 Q 5.4 16 0 16
             Q -5.4 16 -5.4 6 L -5.4 -14 Q -6 -24 -4.5 -38 Z"/>
  </g>

  <!-- 4. ENGINES (each nozzle = one engine) -->
  <g data-part="engine" data-engine="left">
    <path d="M -12.5 16 L -2.5 16 L -3.5 24 L -11.5 24 Z" fill="#1e293b" stroke="#0f172a"/>
  </g>
  <g data-part="engine" data-engine="right">
    <path d="M 12.5 16 L 2.5 16 L 3.5 24 L 11.5 24 Z" fill="#1e293b" stroke="#0f172a"/>
  </g>

  <!-- 5. CANOPY -->
  <g data-part="canopy" fill="none" stroke="#0d1b4c" stroke-width="0.8">
    <path d="M -3.4 -6 L 0 -8 L 3.4 -6 L 4 4 L 0 6 L -4 4 Z" fill="#0d1b4c" fill-opacity="0.85"/>
  </g>

  <!-- 6. DETAILS (painted last) -->
  <g data-part="detail" stroke="#aab7c4" stroke-width="0.4" fill="none">
    <path d="M 0 -30 L 0 -4"/>            <!-- center spine -->
    <path d="M -4 -22 L 4 -22"/>          <!-- panel seam -->
    <path d="M 0 6 L 0 14" stroke="#d32f2f" stroke-width="1"/>  <!-- dorsal stripe -->
  </g>
</svg>
```

If you deliver an SVG that satisfies every item in the checklist, the result in
the game will keep: **spring landing gear, aligned thruster flames per engine,
smoke/spark damage anchoring, and full menu + in-game visual parity.**