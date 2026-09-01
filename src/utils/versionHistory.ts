export interface VersionRelease {
  version: string;
  releaseDate: string;
  title: string;
  tag?: 'LATEST' | 'MAJOR' | 'PHYSICS' | 'MISSIONS' | 'EDITOR';
  tagColor?: string;
  summary: string;
  categories: {
    name: string;
    iconType: 'physics' | 'missions' | 'editor' | 'audio' | 'system';
    items: string[];
  }[];
}

export const CURRENT_GAME_VERSION = 'v1.5.0';

export const GAME_VERSION_HISTORY: VersionRelease[] = [
  {
    version: 'v1.5.0',
    releaseDate: 'September 1, 2026',
    title: 'Main Menu Visual Polish, Music Toggle & Cleaned Training Sector',
    tag: 'LATEST',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    summary:
      'Refined main menu layout with clean transparent card decks, single-line action buttons on widescreen, dedicated music toggle, magnified title thrusters, and removed tutorial clutter on Luna.',
    categories: [
      {
        name: 'Interface & Visual Design',
        iconType: 'system',
        items: [
          'Removed semi-transparent section boxes and clipping borders on the main screen to provide an unobstructed view of the dynamic cosmic starfield.',
          'Ensured planet and spacecraft detail modal pop-ups layer smoothly on top without clipping constraints.',
          'Widescreen single-line action buttons: Launch, Level Editor, and Instructions buttons now display seamlessly without multi-line text wrapping.',
          'Magnified dual-throttle afterburner plumes and supersonic shock diamonds on the title spacecraft emblem for high visibility across all screens.',
          'Added a dismissible top-left quick update notification banner.',
        ],
      },
      {
        name: 'Audio & Music Controls',
        iconType: 'audio',
        items: [
          'Added a dedicated Music Mute button in the main menu to silence background ambient synth chords independently while preserving sound effects (thrusters, clicks, chimes).',
        ],
      },
      {
        name: 'Campaign Worlds',
        iconType: 'missions',
        items: [
          'Luna Core: Removed the large yellow tutorial billboard from the initial launch pad for a pristine flight staging area.',
        ],
      },
    ],
  },
  {
    version: 'v1.4.0',
    releaseDate: 'August 29, 2026',
    title: 'Official Maps Expansion & Volcano Timing Overhaul',
    tag: 'MAJOR',
    tagColor: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    summary:
      'Integrated official world maps for Zephyr Tempest and Calypso Caldera. Expanded volcano eruption cycles with 10s and 20s intervals in both the simulation engine and Map Editor for tactical navigation through intense geothermal hazards.',
    categories: [
      {
        name: 'Official Planetary Maps',
        iconType: 'missions',
        items: [
          'Zephyr Tempest (official-zephyr): Atmospheric high-wind storm basin featuring 140 km/h crosswind shear corridors, toxic volcanic vents, plasma recharge hubs, and rover logistics.',
          'Calypso Caldera (official-calypso): Deep geothermal rift valley with high updrafts, hanging basalt pillars, explosive munitions extraction depot, and magma chimneys.',
          'Synchronized campaign planet rosters with default factory geometry and custom override management.',
        ],
      },
      {
        name: 'Volcano Hazard Timings & Ballistics',
        iconType: 'physics',
        items: [
          'Added 10s and 20s eruption interval presets to eliminate overly aggressive 6s choke points and provide strategic traversal windows.',
          'Dynamic Gravity-Scaled Rock Ballistics: Volcanic rock apex height and horizontal spread are now realistically governed by planetary gravity (ejecting up to ~3.8x cone height on low-g moons like Phobos & Luna, while suppressed on heavy worlds like Calypso & Ares).',
          'Recalibrated official volcano eruption frequencies across Zephyr Tempest, Calypso Caldera, and deep cavern worlds.',
          'Updated Map Editor volcano placer sub-bar and inspector panels with responsive 10s and 20s cycle interval toggles.',
        ],
      },
      {
        name: 'Custom Map Engine',
        iconType: 'editor',
        items: [
          'Enhanced volcano conversion to accurately parse and preserve eruptionInterval and eruptionDuration properties.',
          'Full starter template and default map sync for all 11 official planetary campaign worlds.',
        ],
      },
    ],
  },
  {
    version: 'v1.3.0',
    releaseDate: 'August 28, 2026',
    title: 'Dynamic Ricochet Physics & Hazard Overhaul',
    tag: 'PHYSICS',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    summary:
      'Refactored terrain and rock collision response with realistic elastic ricochet, firm outward pushback, and angular spin dampening for seamless flight recovery. Calibrated default campaign chasm hazards.',
    categories: [
      {
        name: 'Collision & Flight Physics',
        iconType: 'physics',
        items: [
          'Elastic ricochet normal reflection: Striking rocks and terrain now ricochets the lander cleanly away with momentum pushback instead of snagging.',
          'Angular torque stabilization: Prevented catastrophic multi-flip death spins on glancing terrain impacts by dampening angular velocity and capping collision torque.',
          'Expanded separation clearance: Increased collision pushback offset to prevent multi-frame clipping into complex rock geometries.',
          'Volcanic rock ballistic deflection: Airborne molten rock bomb hits now produce radial knockback away from the impact point with controlled angular deflection.',
        ],
      },
      {
        name: 'Campaign Worlds & Hazards',
        iconType: 'missions',
        items: [
          'Glacies Chasm: Added dedicated Cryo Specimen Dock platform and subsurface geothermal cryo-geysers with timed thermal vapor plumes.',
          'Vespera Heavy: Deployed triple caldera magma volcanoes along deep basalt rifts with calibrated eruption timing.',
          'Synchronized default campaign map schemas with version timestamps.',
        ],
      },
      {
        name: 'System & Interface',
        iconType: 'system',
        items: [
          'Interactive Version History Modal: Tap or click the version badge anywhere in the game to inspect full changelogs and release notes.',
          'Version badges integrated into Start Menu, Flight HUD, and Mission Pause settings.',
        ],
      },
    ],
  },
  {
    version: 'v1.2.0',
    releaseDate: 'August 28, 2026',
    title: 'Active Geothermal Volcano Hazard Systems',
    tag: 'MAJOR',
    tagColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    summary:
      'Introduced dynamic planetary volcano hazard simulation with timed charging phases, boiling magma plumes, and ballistic rock bomb projectile physics.',
    categories: [
      {
        name: 'Hazard Systems',
        iconType: 'missions',
        items: [
          'Dynamic volcano entities with configurable caldera width, eruption height, charging indicators, and cyclic intervals.',
          'Ballistic molten rock bombs with parabolic gravity trajectories and surface impact effects.',
          'Cryo & Magma thermal color themes with specialized convection turbulence and hull damage rates.',
        ],
      },
      {
        name: 'Custom Map Editor',
        iconType: 'editor',
        items: [
          'Dedicated Volcano Hazard placement tool with interactive drag-to-size and live eruption previews.',
          'Hazard parameter sliders for eruption duration, cycle frequency, and caldera radius.',
        ],
      },
      {
        name: 'Audio & FX',
        iconType: 'audio',
        items: [
          'Volcanic eruption blast audio, bubbling magma sizzle, and molten rock bomb impact sound effects.',
          'Volumetric convection smoke plumes, glowing ember emitters, and radiant blast flares.',
        ],
      },
    ],
  },
  {
    version: 'v1.1.0',
    releaseDate: 'August 27, 2026',
    title: 'Specialized Multi-Class Cargo & Vehicle Logistics',
    tag: 'MISSIONS',
    tagColor: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
    summary:
      'Implemented high-tensile electromagnetic winch tether mechanics and 5 volatile cargo classes alongside planetary vehicle transport depots.',
    categories: [
      {
        name: 'Logistics & Cargo',
        iconType: 'missions',
        items: [
          '5 Volatile Payload Types: Isotope (radiation/integrity), Cryogenic (thermal boiloff), Explosive (impact detonation), Plasma (timed discharge), and Magnetic (electromagnetic latching).',
          'Heavy Vehicle Depots: Automated roll-on / roll-off planetary truck boarding with cargo ramps and destination vehicle bonuses.',
          'High-tensile winch tether simulation with real-time payload mass transfer and cable tension telemetry.',
        ],
      },
      {
        name: 'Audio & Visuals',
        iconType: 'audio',
        items: [
          'Electromagnetic latch chimes, cryo venting hiss, isotope Geiger ticks, and cargo detonation explosions.',
          'HUD cargo condition bars and volatile cargo hazard warnings.',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    releaseDate: 'August 26, 2026',
    title: 'Official Planetary Expedition Release',
    tag: 'MAJOR',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    summary:
      'Initial release featuring 9 official solar system celestial bodies, 16 pilotable lander spacecraft, comprehensive level editor, PWA offline support, and dual-throttle flight physics.',
    categories: [
      {
        name: 'Core Flight Simulation',
        iconType: 'physics',
        items: [
          'Dual-throttle independent engine mechanics with authentic torque, differential steering, and atmospheric drag.',
          '16 distinct spacecraft models with calibrated mass, thrust, armor, fuel efficiency, and spring suspension.',
          '9 official expedition planets with bespoke gravitational constants, par times, and landscape geology.',
        ],
      },
      {
        name: 'Level Editor & Tools',
        iconType: 'editor',
        items: [
          'Full-featured in-game Map Editor with bezier terrain sculpting, arch bridges, rock polygons, spires, and fuel placement.',
          'Export and import custom map JSON payloads with instant test-flight mode.',
        ],
      },
      {
        name: 'Platform & Controls',
        iconType: 'system',
        items: [
          'Progressive Web App (PWA) offline installation with standalone fullscreen mode.',
          'Customizable dual-touch virtual throttle controls with multi-touch precision.',
          'Dynamic particle systems, cosmic nebulas, and procedural starfields.',
        ],
      },
    ],
  },
];
