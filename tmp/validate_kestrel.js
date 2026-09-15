// Design of Kestrel Stunt (KS-9 Aerobatic Dart)
const fs = require('fs');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 80 80">
  <defs>
    <!-- Kestrel Carbon-Composite Hull -->
    <linearGradient id="kestrel-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="30%" stop-color="#1e293b" />
      <stop offset="70%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <!-- Delta Wings & Canards -->
    <linearGradient id="kestrel-wing-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="45%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- Electric Cyan Stunt Livery -->
    <linearGradient id="kestrel-cyan-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22d3ee" />
      <stop offset="50%" stop-color="#06b6d4" />
      <stop offset="100%" stop-color="#0891b2" />
    </linearGradient>

    <!-- Cryo-Methane Turbopump Nacelles & Bells -->
    <linearGradient id="kestrel-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="50%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- High-G Aerobatic Teardrop Canopy -->
    <linearGradient id="kestrel-canopy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="25%" stop-color="#0284c7" />
      <stop offset="70%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#082f49" />
    </linearGradient>

    <!-- Titanium Landing Skids -->
    <linearGradient id="kestrel-skid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748b" />
      <stop offset="50%" stop-color="#334155" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
  </defs>

  <!-- 1. LANDING GEAR — Articulated Spring Struts & Isolated Titanium Skids -->
  <g data-part="landing-gear" stroke-linecap="round">
    <!-- Main Oleo Hydraulic Struts -->
    <line x1="-13" y1="10" x2="-24" y2="28" stroke="#475569" stroke-width="2.2" />
    <line x1="13" y1="10" x2="24" y2="28" stroke="#475569" stroke-width="2.2" />
    <!-- Secondary Scissor Torque Links -->
    <line x1="-7" y1="15" x2="-24" y2="28" stroke="#64748b" stroke-width="1.2" />
    <line x1="7" y1="15" x2="24" y2="28" stroke="#64748b" stroke-width="1.2" />
    <!-- Chrome Lower Piston Sliders -->
    <line x1="-21" y1="23" x2="-24" y2="28" stroke="#f8fafc" stroke-width="1.4" />
    <line x1="21" y1="23" x2="24" y2="28" stroke="#f8fafc" stroke-width="1.4" />
  </g>

  <!-- Footpads (at y ≈ 29.5, strictly isolated subpaths) -->
  <g data-part="footpad">
    <rect x="-30" y="28" width="12" height="3" rx="1.2" fill="url(#kestrel-skid-grad)" stroke="#06b6d4" stroke-width="0.8" />
    <rect x="-28" y="29.6" width="8" height="1.2" rx="0.5" fill="#0f172a" />
  </g>
  <g data-part="footpad">
    <rect x="18" y="28" width="12" height="3" rx="1.2" fill="url(#kestrel-skid-grad)" stroke="#06b6d4" stroke-width="0.8" />
    <rect x="20" y="29.6" width="8" height="1.2" rx="0.5" fill="#0f172a" />
  </g>

  <!-- 2. WINGS — Forward-Swept Canards & High-Sweep Aerobatic Delta Wings -->
  <!-- Forward-Swept Canards -->
  <g data-part="wing">
    <!-- Port Canard -->
    <path d="M-4.5 -18 L-18 -14 L-15 -8 L-5 -10 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" stroke-width="0.8" />
    <!-- Starboard Canard -->
    <path d="M4.5 -18 L18 -14 L15 -8 L5 -10 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" stroke-width="0.8" />
    <!-- Canard Bevel Trim -->
    <path d="M-4.5 -18 L-18 -14 L-14 -13 L-4.5 -16 Z" fill="url(#kestrel-cyan-grad)" />
    <path d="M4.5 -18 L18 -14 L14 -13 L4.5 -16 Z" fill="url(#kestrel-cyan-grad)" />

    <!-- Main Delta Wings -->
    <!-- Port Main Delta Wing -->
    <path d="M-6 -4 L-35 14 L-36 7 L-35 18 L-22 17.5 L-8 18 L-8 8 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" stroke-width="0.9" />
    <!-- Starboard Main Delta Wing -->
    <path d="M6 -4 L35 14 L36 7 L35 18 L22 17.5 L8 18 L8 8 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" stroke-width="0.9" />

    <!-- Wingtip Aerodynamic Endplates / Winglet Fences -->
    <path d="M-36 6 L-34 6 L-34 18 L-36 18 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="0.6" />
    <path d="M34 6 L36 6 L36 18 L34 18 Z" fill="#0f172a" stroke="#06b6d4" stroke-width="0.6" />
  </g>

  <!-- 3. HULL — Chisel Needle Fuselage, Dorsal Spine & Armor Facets -->
  <g data-part="hull">
    <!-- Main Center Fuselage -->
    <path d="M0 -38 L3.5 -31 L4.8 -18 L6.5 -4 L8 8 L8 18 L0 20 L-8 18 L-8 8 L-6.5 -4 L-4.8 -18 L-3.5 -31 Z" fill="url(#kestrel-hull-grad)" stroke="#334155" stroke-width="0.8" />

    <!-- Dark Carbon Nose Cap -->
    <path d="M0 -38 L3.5 -31 L-3.5 -31 Z" fill="#0f172a" stroke="#334155" stroke-width="0.5" />

    <!-- Titanium Airspeed Pitot Probe on Needle Apex -->
    <line x1="0" y1="-38" x2="0" y2="-39.4" stroke="#94a3b8" stroke-width="0.8" stroke-linecap="round" />

    <!-- Central Raised Dorsal Anti-Torque Ridge -->
    <path d="M0 -38 L1.2 -30 L1.5 6 L0 18 L-1.5 6 L-1.2 -30 Z" fill="#1e293b" stroke="#06b6d4" stroke-width="0.5" />
  </g>

  <!-- 4. ENGINES — Cryo-Methane Turbopump Nacelles & Vectored Bells -->
  <!-- Engine Nacelle Blocks -->
  <g stroke="#1e293b" stroke-width="0.7">
    <path d="M-17 6 L-9 6 L-8.5 18 L-17.5 18 Z" fill="url(#kestrel-nozzle-grad)" />
    <path d="M9 6 L17 6 L17.5 18 L8.5 18 Z" fill="url(#kestrel-nozzle-grad)" />
  </g>

  <!-- Center Aft Aerodynamic Fairing -->
  <path d="M-4 18 L4 18 L2 21 L-2 21 Z" fill="#0f172a" stroke="#334155" stroke-width="0.6" />

  <!-- Engine Exhaust Bells (nozzles at y=24, exit plane center at x=±13) -->
  <g data-part="engine" data-engine="left">
    <path d="M-15.5 18 L-10.5 18 L-9 24 L-17 24 Z" fill="#0f172a" stroke="#334155" stroke-width="0.7" />
    <!-- Gimbal Collar Ring -->
    <rect x="-16" y="18" width="6" height="1.6" fill="#06b6d4" />
    <!-- Refractory Throat Aperture -->
    <ellipse cx="-13" cy="23.5" rx="3.5" ry="0.9" fill="#0284c7" />
    <ellipse cx="-13" cy="23.5" rx="1.8" ry="0.5" fill="#38bdf8" />
  </g>
  <g data-part="engine" data-engine="right">
    <path d="M10.5 18 L15.5 18 L17 24 L9 24 Z" fill="#0f172a" stroke="#334155" stroke-width="0.7" />
    <!-- Gimbal Collar Ring -->
    <rect x="10" y="18" width="6" height="1.6" fill="#06b6d4" />
    <!-- Refractory Throat Aperture -->
    <ellipse cx="13" cy="23.5" rx="3.5" ry="0.9" fill="#0284c7" />
    <ellipse cx="13" cy="23.5" rx="1.8" ry="0.5" fill="#38bdf8" />
  </g>

  <!-- 5. CANOPY — Faceted Aerobatic Teardrop Bubble -->
  <g data-part="canopy">
    <!-- Canopy Base Frame -->
    <path d="M0 -25 L4.8 -16 L4.5 -8 L0 -6 L-4.5 -8 L-4.8 -16 Z" fill="#0f172a" stroke="#0891b2" stroke-width="0.8" />
    <!-- Canopy Tinted Multi-Facet Glass -->
    <path d="M0 -24 L3.8 -16 L3.6 -9 L0 -7 L-3.6 -9 L-3.8 -16 Z" fill="url(#kestrel-canopy-grad)" stroke="#38bdf8" stroke-width="0.5" />
    <!-- Structural Roll-Bar Hoop -->
    <line x1="-3.8" y1="-16" x2="3.8" y2="-16" stroke="#0f172a" stroke-width="0.9" />
    <!-- Specular Arc Highlight -->
    <ellipse cx="-1.5" cy="-18" rx="1.2" ry="4" transform="rotate(-15 -1.5 -18)" fill="#ffffff" opacity="0.65" />
  </g>

  <!-- 6. DETAILS & RACING LIVERY (painted last) -->
  <g data-part="detail">
    <!-- Electric Cyan Wing Chevrons -->
    <path d="M-7 0 L-32 13 L-32 15 L-7 2 Z" fill="url(#kestrel-cyan-grad)" />
    <path d="M7 0 L32 13 L32 15 L7 2 Z" fill="url(#kestrel-cyan-grad)" />

    <!-- Thin White Livery Pin-Stripes -->
    <path d="M-8 3 L-30 14" stroke="#f8fafc" stroke-width="0.5" fill="none" opacity="0.9" />
    <path d="M8 3 L30 14" stroke="#f8fafc" stroke-width="0.5" fill="none" opacity="0.9" />

    <!-- Elevon Control Surface Seams -->
    <g stroke="#334155" stroke-width="0.6" fill="none">
      <line x1="-9" y1="15" x2="-33" y2="15" />
      <line x1="9" y1="15" x2="33" y2="15" />
      <!-- Elevon Actuator Fairings -->
      <rect x="-22" y="14" width="2" height="3" rx="0.5" fill="#475569" />
      <rect x="-15" y="14" width="2" height="3" rx="0.5" fill="#475569" />
      <rect x="13" y="14" width="2" height="3" rx="0.5" fill="#475569" />
      <rect x="20" y="14" width="2" height="3" rx="0.5" fill="#475569" />
    </g>

    <!-- Turbopump Air Intake Louvers on Engine Nacelles -->
    <g stroke="#64748b" stroke-width="0.5" fill="none">
      <line x1="-15" y1="8" x2="-11" y2="8" />
      <line x1="-15" y1="10.5" x2="-11" y2="10.5" />
      <line x1="-15" y1="13" x2="-11" y2="13" />
      <line x1="11" y1="8" x2="15" y2="8" />
      <line x1="11" y1="10.5" x2="15" y2="10.5" />
      <line x1="11" y1="13" x2="15" y2="13" />
    </g>

    <!-- Fuselage Maintenance & Avionics Seams -->
    <g stroke="#475569" stroke-width="0.4" fill="none">
      <line x1="-3.2" y1="-28" x2="3.2" y2="-28" />
      <line x1="-3.8" y1="-22" x2="3.8" y2="-22" />
      <circle cx="-5" cy="4" r="0.8" />
      <circle cx="5" cy="4" r="0.8" />
    </g>

    <!-- Wingtip RCS Quads (Roll/Pitch Micro-Thrusters) -->
    <g fill="#ca8a04">
      <circle cx="-35.5" cy="9" r="0.5" />
      <circle cx="-35.5" cy="11" r="0.5" />
      <circle cx="35.5" cy="9" r="0.5" />
      <circle cx="35.5" cy="11" r="0.5" />
    </g>
  </g>

  <!-- 7. NAVIGATION LIGHTS -->
  <g data-part="navlight">
    <!-- Port Wingtip Nav Light (Red) -->
    <circle cx="-35.5" cy="16" r="0.8" fill="#ef4444" />
    <!-- Starboard Wingtip Nav Light (Green) -->
    <circle cx="35.5" cy="16" r="0.8" fill="#22c55e" />
    <!-- Dorsal Anti-Collision Strobe (Cyan) -->
    <circle cx="0" cy="18.5" r="0.7" fill="#38bdf8" />
  </g>
</svg>`;

fs.writeFileSync('/tmp/kestrel.svg', svg);
console.log('Wrote /tmp/kestrel.svg, size:', svg.length);
