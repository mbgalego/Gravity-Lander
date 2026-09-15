import fs from 'fs';

// Standalone SVG for Spectre Recon (SP-4 Stealth Surveyor)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
  <defs>
    <!-- Spectre Stealth: Matte Carbon Monocoque -->
    <linearGradient id="spectre-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b"/>
      <stop offset="25%" stop-color="#0f172a"/>
      <stop offset="65%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <!-- Spectre Stealth: Faceted Diamond Wings / Chines -->
    <linearGradient id="spectre-wing-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="35%" stop-color="#1e1b4b"/>
      <stop offset="70%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <!-- Spectre Stealth: Spectral Ultraviolet Glow / Formation Lights -->
    <linearGradient id="spectre-plasma-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6b21a8"/>
    </linearGradient>

    <!-- Spectre Stealth: 2D Stealth Vectoring Exhaust Troughs -->
    <linearGradient id="spectre-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#090d16"/>
    </linearGradient>

    <!-- Spectre Stealth: Amethyst Sensor Core & Visor -->
    <linearGradient id="spectre-visor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#e9d5ff"/>
      <stop offset="25%" stop-color="#c084fc"/>
      <stop offset="65%" stop-color="#7e22ce"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </linearGradient>

    <!-- Spectre Stealth: Titanium RAM Footpads -->
    <linearGradient id="spectre-foot-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#090d16"/>
    </linearGradient>
  </defs>

  <!-- 1. LANDING GEAR ASSEMBLY (Struts + Isolated Footpads) -->
  <g data-part="landing-gear" stroke-linecap="round">
    <!-- Main Articulated Stealth Struts extending from recessed bays -->
    <line x1="-12" y1="12" x2="-25" y2="28" stroke="#334155" stroke-width="2.2"/>
    <line x1="12" y1="12" x2="25" y2="28" stroke="#334155" stroke-width="2.2"/>
    <!-- Scissor Anti-Torque Links -->
    <line x1="-6" y1="16" x2="-25" y2="28" stroke="#475569" stroke-width="1.2"/>
    <line x1="6" y1="16" x2="25" y2="28" stroke="#475569" stroke-width="1.2"/>
    <!-- Chrome Piston Sliders -->
    <line x1="-22" y1="23" x2="-25" y2="28" stroke="#cbd5e1" stroke-width="1.4"/>
    <line x1="22" y1="23" x2="25" y2="28" stroke="#cbd5e1" stroke-width="1.4"/>
  </g>

  <!-- Left Footpad (y=28..31, center x=-25, y=29.5) -->
  <g data-part="footpad">
    <rect x="-31" y="28" width="12" height="3" rx="1.2" fill="url(#spectre-foot-grad)" stroke="#a855f7" stroke-width="0.8"/>
    <rect x="-29" y="29.6" width="8" height="1.2" rx="0.5" fill="#020617"/>
  </g>

  <!-- Right Footpad (y=28..31, center x=25, y=29.5) -->
  <g data-part="footpad">
    <rect x="19" y="28" width="12" height="3" rx="1.2" fill="url(#spectre-foot-grad)" stroke="#a855f7" stroke-width="0.8"/>
    <rect x="21" y="29.6" width="8" height="1.2" rx="0.5" fill="#020617"/>
  </g>

  <!-- 2. WINGS / FACETED STEALTH CHINE PLANFORM (Sweep 55 deg, sawtooth trailing edge) -->
  <g data-part="wing">
    <!-- Port Diamond Wing -->
    <path d="M-6 -10 L-34 10 L-34 13 L-26 13 L-23 18 L-8 18 L-8 10 Z" fill="url(#spectre-wing-grad)" stroke="#1e1b4b" stroke-width="0.8"/>
    <!-- Starboard Diamond Wing -->
    <path d="M6 -10 L34 10 L34 13 L26 13 L23 18 L8 18 L8 10 Z" fill="url(#spectre-wing-grad)" stroke="#1e1b4b" stroke-width="0.8"/>
    <!-- Wing Outer Leading Edge RAM Chamfer -->
    <path d="M-6 -10 L-34 10 L-30 11 L-6 -8 Z" fill="#090d16" stroke="#475569" stroke-width="0.4"/>
    <path d="M6 -10 L34 10 L30 11 L6 -8 Z" fill="#090d16" stroke="#475569" stroke-width="0.4"/>
    <!-- Wingtip Shielded Low-Observable RCS Fairings -->
    <path d="M-34 9 L-32 9 L-32 14 L-34 14 Z" fill="#0f172a" stroke="#a855f7" stroke-width="0.5"/>
    <path d="M32 9 L34 9 L34 14 L32 14 Z" fill="#0f172a" stroke="#a855f7" stroke-width="0.5"/>
  </g>

  <!-- 3. MAIN FUSELAGE / FACETED STEALTH DIAMOND MONOCOQUE -->
  <g data-part="hull">
    <!-- Main Centerbody Contour -->
    <path d="M0 -38 L5 -28 L8 -12 L10 4 L8 18 L0 20 L-8 18 L-10 4 L-8 -12 L-5 -28 Z" fill="url(#spectre-hull-grad)" stroke="#312e81" stroke-width="0.8"/>
    <!-- Faceted Nose Cap & Radar-Scattering Apex -->
    <path d="M0 -38 L5 -28 L-5 -28 Z" fill="#020617" stroke="#334155" stroke-width="0.5"/>
    <!-- Pitot / Air-Data Low-RCS Spike -->
    <line x1="0" y1="-38" x2="0" y2="-39.4" stroke="#94a3b8" stroke-width="0.8" stroke-linecap="round"/>
    <!-- Central Faceted Ridge / Dorsal Knife-Edge -->
    <path d="M0 -38 L1.5 -26 L1.8 6 L0 18 L-1.8 6 L-1.5 -26 Z" fill="#1e1b4b" stroke="#a855f7" stroke-width="0.5"/>
  </g>

  <!-- 4. ENGINES / 2D STEALTH VECTORING NOZZLE TROUGHS -->
  <!-- Port 2D Nozzle Trough (exit at y=24, x=-13.5) -->
  <g data-part="engine" data-engine="left">
    <!-- Nacelle Shroud -->
    <path d="M-17 8 L-9 8 L-8.5 18 L-17.5 18 Z" fill="url(#spectre-nozzle-grad)" stroke="#1e1b4b" stroke-width="0.7"/>
    <!-- 2D Serrated Nozzle Bell Opening -->
    <path d="M-16 18 L-10 18 L-9 24 L-17 24 Z" fill="#090d16" stroke="#475569" stroke-width="0.7"/>
    <!-- Heat Shield Trim -->
    <rect x="-16.5" y="18" width="7" height="1.6" fill="#312e81"/>
    <!-- Nozzle Throat Inner Cavity -->
    <ellipse cx="-13" cy="23.5" rx="3.5" ry="0.9" fill="#1e1b4b"/>
    <ellipse cx="-13" cy="23.5" rx="1.8" ry="0.5" fill="#a855f7"/>
  </g>

  <!-- Starboard 2D Nozzle Trough (exit at y=24, x=13.5) -->
  <g data-part="engine" data-engine="right">
    <!-- Nacelle Shroud -->
    <path d="M9 8 L17 8 L17.5 18 L8.5 18 Z" fill="url(#spectre-nozzle-grad)" stroke="#1e1b4b" stroke-width="0.7"/>
    <!-- 2D Serrated Nozzle Bell Opening -->
    <path d="M10 18 L16 18 L17 24 L9 24 Z" fill="#090d16" stroke="#475569" stroke-width="0.7"/>
    <!-- Heat Shield Trim -->
    <rect x="9.5" y="18" width="7" height="1.6" fill="#312e81"/>
    <!-- Nozzle Throat Inner Cavity -->
    <ellipse cx="13" cy="23.5" rx="3.5" ry="0.9" fill="#1e1b4b"/>
    <ellipse cx="13" cy="23.5" rx="1.8" ry="0.5" fill="#a855f7"/>
  </g>

  <!-- Center Aft Beaver-Tail Fairing -->
  <path d="M-4 18 L4 18 L2 21.5 L-2 21.5 Z" fill="#090d16" stroke="#312e81" stroke-width="0.6"/>

  <!-- 5. CANOPY / FACETED AMETHYST SENSOR APERTURE -->
  <g data-part="canopy">
    <!-- Sensor Housing Bezel -->
    <path d="M0 -24 L5.2 -15 L4.8 -7 L0 -5 L-4.8 -7 L-5.2 -15 Z" fill="#020617" stroke="#6b21a8" stroke-width="0.8"/>
    <!-- Polarized Amethyst Glass Core -->
    <path d="M0 -23 L4.2 -15 L3.8 -8 L0 -6 L-3.8 -8 L-4.2 -15 Z" fill="url(#spectre-visor-grad)" stroke="#c084fc" stroke-width="0.5"/>
    <!-- Facet Cross-Divider Frame -->
    <line x1="-4.2" y1="-15" x2="4.2" y2="-15" stroke="#1e1b4b" stroke-width="0.9"/>
    <!-- Antireflective High-Index Glare Highlight -->
    <ellipse cx="-1.5" cy="-17" rx="1" ry="3.5" transform="rotate(-15 -1.5 -17)" fill="#ffffff" opacity="0.6"/>
  </g>

  <!-- 6. DETAILS / RAM SAWTOOTH SEAMS, FORMATION STRIPS, RCS JETS -->
  <g data-part="detail">
    <!-- Spectral Purple Luminescent Formation Strips (Low-Observable Navigation) -->
    <path d="M-7 1 L-29 12 L-29 13.5 L-7 2.8 Z" fill="url(#spectre-plasma-grad)"/>
    <path d="M7 1 L29 12 L29 13.5 L7 2.8 Z" fill="url(#spectre-plasma-grad)"/>
    <line x1="-8" y1="4" x2="-27" y2="13" stroke="#e9d5ff" stroke-width="0.5" opacity="0.85"/>
    <line x1="8" y1="4" x2="27" y2="13" stroke="#e9d5ff" stroke-width="0.5" opacity="0.85"/>

    <!-- Sawtooth Trailing Edge Elevon Control Surface Lines -->
    <g stroke="#312e81" stroke-width="0.6" fill="none">
      <line x1="-9" y1="15" x2="-28" y2="15"/>
      <line x1="9" y1="15" x2="28" y2="15"/>
      <!-- Hydraulic Actuator Blisters -->
      <rect x="-20" y="14" width="2" height="3" rx="0.5" fill="#1e1b4b"/>
      <rect x="-14" y="14" width="2" height="3" rx="0.5" fill="#1e1b4b"/>
      <rect x="12" y="14" width="2" height="3" rx="0.5" fill="#1e1b4b"/>
      <rect x="18" y="14" width="2" height="3" rx="0.5" fill="#1e1b4b"/>
    </g>

    <!-- RAM Panel Edge Seams & Avionics Access Latches -->
    <g stroke="#334155" stroke-width="0.4" fill="none">
      <line x1="-3.5" y1="-26" x2="3.5" y2="-26"/>
      <line x1="-4.2" y1="-20" x2="4.2" y2="-20"/>
      <circle cx="-5" cy="4" r="0.7" fill="#1e1b4b"/>
      <circle cx="5" cy="4" r="0.7" fill="#1e1b4b"/>
    </g>

    <!-- Micro-Pulsed Cold-Gas RCS Nozzle Clusters (Titanium Gold Core) -->
    <g fill="#ca8a04">
      <circle cx="-33.5" cy="10.5" r="0.5"/>
      <circle cx="-33.5" cy="12.5" r="0.5"/>
      <circle cx="33.5" cy="10.5" r="0.5"/>
      <circle cx="33.5" cy="12.5" r="0.5"/>
    </g>
  </g>

  <!-- 7. NAVIGATION LIGHTS -->
  <g data-part="navlight">
    <!-- Low-observable port red / stbd green at wingtip edge -->
    <circle cx="-33.5" cy="14" r="0.7" fill="#ef4444"/>
    <circle cx="33.5" cy="14" r="0.7" fill="#22c55e"/>
    <!-- Tail Beacon / Sensor strobe -->
    <circle cx="0" cy="19.5" r="0.7" fill="#c084fc"/>
  </g>
</svg>`;

fs.writeFileSync('./spectre.svg', svg);
console.log('Saved ./spectre.svg');

// Validate the SVG according to CRAFT_SVG_SPEC rules
const errors = [];

// 1. Check viewBox
if (!svg.includes('viewBox="-40 -40 80 80"')) {
  errors.push('Invalid or missing viewBox="-40 -40 80 80"');
}

// 2. Prohibited elements
const prohibited = ['<filter', '<mask', '<clipPath', '<clip-path', '<pattern', '<text', '<image', '<foreignObject', '<style'];
for (const p of prohibited) {
  if (svg.includes(p)) {
    errors.push(`Prohibited SVG element: ${p}`);
  }
}

// 3. Required data-part tags
const requiredParts = ['hull', 'engine', 'landing-gear', 'footpad'];
for (const rp of requiredParts) {
  if (!svg.includes(`data-part="${rp}"`)) {
    errors.push(`Missing required data-part="${rp}"`);
  }
}

// Footpad count
const footpadMatches = svg.match(/data-part="footpad"/g) || [];
if (footpadMatches.length < 2) {
  errors.push(`Expected at least 2 footpads, got ${footpadMatches.length}`);
}

// Engine L/R
if (!svg.includes('data-engine="left"') || !svg.includes('data-engine="right"')) {
  errors.push('Missing data-engine="left" or data-engine="right"');
}

// Check coordinates bounds [-40, 40]
const graphicBody = svg.replace(/<defs>[\s\S]*?<\/defs>/, '').replace(/viewBox="[^"]+"/, '');
const geomRegex = /(?:x|y|x1|y1|x2|y2|cx|cy|rx|ry|r|width|height)="([^"]+)"|d="([^"]+)"|points="([^"]+)"/g;
let outOfBounds = [];
let match;
while ((match = geomRegex.exec(graphicBody)) !== null) {
  const content = match[1] || match[2] || match[3];
  if (content.includes('%')) continue;
  const nums = content.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
  for (const nStr of nums) {
    const n = parseFloat(nStr);
    if (isNaN(n)) continue;
    if (n < -40 || n > 40) {
      outOfBounds.push(`${n} in "${content}"`);
    }
  }
}

if (outOfBounds.length > 0) {
  errors.push(`Coords out of [-40, 40] bounds: ${outOfBounds.join(', ')}`);
}

if (errors.length > 0) {
  console.error('Validation errors:', errors);
  process.exit(1);
} else {
  console.log('✅ ALL CRAFT_SVG_SPEC VALIDATIONS PASSED for Spectre!');
}
