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

export const CURRENT_GAME_VERSION = 'v1.9.11';

export const GAME_VERSION_HISTORY: VersionRelease[] = [
  {
    version: 'v1.9.11',
    releaseDate: 'September 23, 2026',
    title: 'Fleet Craft Visual Scaling Overhaul & ViewBox Optimization',
    tag: 'LATEST',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    summary:
      'Comprehensive preview and close-up overhaul across all 21 spacecraft in the hangar. Re-architected individual SVG viewBox framing to eliminate dead margins, and enlarged the main start-menu preview deck and inspect close-up stage by 25%–45%, allowing intricate hull paneling, thrusters, sensor suites, and liveries to command the screen.',
    categories: [
      {
        name: 'Precision ViewBox Framing',
        iconType: 'physics',
        items: [
          'Engineered tailored viewBoxes with balanced 2–4 unit margins for all 21 spacecraft in the fleet',
          'Eliminated wide empty padding on delta fighters (Viper, Wasp, Kestrel, Spectre, Vanguard), increasing rendered detail by +25%–40%',
          'Fixed Nutcracker mining excavator preview clipping, fully revealing its rotated drill arm and searchlight beam',
          'Tightly framed side-profile cruisers and transports (Apollo, Nautilus, Aegis, Orion, Titan, Goliath, Valkyrie) for maximum visual impact',
        ],
      },
      {
        name: 'Hangar Preview & Stage Enlargement',
        iconType: 'system',
        items: [
          'Enlarged main menu start deck stage across all breakpoints (up to 420px on desktop and 240px on mobile)',
          'Expanded the technical inspection modal showcase stage with enhanced radial hangar lighting and responsive height',
          'Boosted catalogue ship card preview resolution and thumbnail sizes for immediate recognition',
        ],
      },
    ],
  },
  {
    version: 'v1.9.10',
    releaseDate: 'September 23, 2026',
    title: 'Serenity Clamshell Ramp Kinematics Correction & Articulation Overhaul',
    tag: 'MAJOR',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    summary:
      'Corrected the cargo door and vehicle ramp deployment kinematics on Serenity. The articulated lower ramp now naturally unrolls downward and forward from the cargo bay threshold to the landing deck with hydraulic guide pistons and hazard traction treads, while the upper clamshell visor lifts upward for vehicle clearance.',
    categories: [
      {
        name: 'Cargo Door Kinematics Correction',
        iconType: 'physics',
        items: [
          'Corrected hinge knuckle placement to the lower cargo hold threshold at x=-10, y=12',
          'Eliminated inverted rotation trajectory: ramp now smoothly descends counter-clockwise by 36° from flush belly alignment down to the terrain deck without clipping through the ground',
          'Integrated upper clamshell visor articulation: visor slides upward during loading to clear rover cabs',
          'Added dual hydraulic guide pistons that extend dynamically as the ramp lowers and retract when sealed',
          'Updated locking seal state: when closed, status LED glows emerald green and latch pins lock into the hull',
        ],
      },
    ],
  },
  {
    version: 'v1.9.9',
    releaseDate: 'September 23, 2026',
    title: 'Serenity Scale Expansion (+40% Bulk) & Clamshell Cargo Deployment',
    tag: 'MAJOR',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    summary:
      'Substantially enlarged Serenity by 40% across both in-game rigid-body physics and UI menus. Now comfortably dwarfs planetary rovers, revealing all intricate technical details including the Chinese calligraphy crest, Geoffrey Mandel diamond lattice trusses, interactive clamshell vehicle ramp deployment, dynamic VTOL nacelle pivoting, and enhanced high-resolution textures.',
    categories: [
      {
        name: 'Scale & Detail Overhaul (+40%)',
        iconType: 'physics',
        items: [
          'Enlarged in-game rigid-body scale from renderScale 1.55 to 2.17 (+40% physical dimensions, length 304px, height 109px)',
          'Proportioned hull to realistically accommodate and dwarf planetary exploration rovers and heavy haulers',
          'Recalibrated watertight rigid-body collision polygon (21 vertices) and local landing gear contact anchors to exact 2.17x world scale',
          'Updated UI presentation: tightened menu & catalogue viewBox for +27.3% larger display in cards and hangar deck',
          'Enhanced legible resolution of Chinese calligraphy medallion (宁静), serif SERENITY logotype, and 03-K64 military hull stencils',
        ],
      },
      {
        name: 'Interactive Mechanics & FX',
        iconType: 'missions',
        items: [
          'Interactive clamshell vehicle loading ramp: smoothly lowers down to terrain deck when loading/unloading rovers with illuminated interior bay',
          'Dynamic in-flight vectoring: rotating VTOL nacelles tilt automatically to provide forward and reverse thrust vectoring during flight',
          'Pulsing Radion Accelerator core glow synchronized with thruster activity and engine throat flash',
        ],
      },
    ],
  },
  {
    version: 'v1.9.8',
    releaseDate: 'September 23, 2026',
    title: 'Serenity (Firefly-Class Transport) Arrives & Colonial Viper Battlestar Galactica Tribute',
    tag: 'MAJOR',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    summary:
      'Introduced the iconic Serenity Firefly-Class 03-K64 mid-bulk transport craft with its signature arched neck, panoramic cockpit, rotating VTOL nacelles, cargo belly, docked shuttle, and incandescent pulsing "Firefly" reactor drive. Updated the Colonial Viper description with its Battlestar Galactica lineage.',
    categories: [
      {
        name: 'New Craft: Firefly-Class Serenity',
        iconType: 'missions',
        items: [
          'Added Serenity (03-K64 Mid-Bulk Transport) to the hangar registry with full specs, balanced flight handling, and vehicle bay',
          'Dual-source visual fidelity: full SVG menu & catalogue graphic and real-time interactive canvas renderer',
          'Modeled arched neck, bird-like cockpit bridge with multi-pane glass, pilot silhouette, and searchlight',
          'Bulbous underbelly cargo deck with clamshell loading ramp, hazard warnings, and SERENITY fleet insignia stencil',
          'Docked upper auxiliary passenger shuttle, catwalk spine, communications mast with blinking nav strobe',
          'Rotating VTOL engine nacelles with forward intake cowls, cooling louvers, and downward rocket bells',
          'Incandescent pulsing Firefly reactor core tail and dual trailing stabilizer fins',
          'Articulated quad landing gear with chrome oleo shock struts, scissor links, and titanium saucer footpads',
          'Watertight 26-vertex collision polygon enclosing full nose-to-tail and gear footprint',
        ],
      },
      {
        name: 'Lore & Tribute Updates',
        iconType: 'system',
        items: [
          'Updated Colonial Viper (Mk II) description and manufacturer origin to proudly honor its iconic Battlestar Galactica heritage',
        ],
      },
    ],
  },
  {
    version: 'v1.9.7',
    releaseDate: 'September 22, 2026',
    title: 'Leviathan Titan Overhaul: Taller Profile, Short-Piston Landing Gear & 2-Strut Layout',
    tag: 'MAJOR',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    summary:
      'Overhauled the Leviathan Titan utility hauler with a stockier, taller hull profile (+25% vertical bulk and renderScale 1.75), streamlined low-profile landing gear with short-piston struts (ample clearance above VTOL bells), and updated physics collision polygon.',
    categories: [
      {
        name: 'Leviathan Craft Overhaul',
        iconType: 'physics',
        items: [
          'Increased vertical height and stature across hull, spine tank, structural gantry, and command bridge',
          'Increased renderScale to 1.75 for a grander in-game presence',
          'Shortened landing gear legs to low-profile pistons while maintaining >11px ground clearance above VTOL thruster bells',
          'Updated localPoints, footpadSpan, and 24-vertex watertight collisionPolygon',
        ],
      },
    ],
  },
  {
    version: 'v1.9.6',
    releaseDate: 'September 21, 2026',
    title: 'Juggernaut Lifter Fixes: Independent Thruster Flames, Blue Glow Removal & Correct Hitbox',
    tag: 'MAJOR',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    summary:
      'Fixed three critical Juggernaut Lifter rendering and physics issues: (1) removed unwanted blue afterburner glow by skipping generic thruster effects for Juggernaut in renderer, (2) implemented independent left/right thruster flame activation matching default ship mechanics (front pair fires with leftThruster, rear pair with rightThruster), and (3) rebuilt collisionPolygon with renderScale-correct coordinates (1.8× raw draw units) following the proven Nutcracker/Vulcan pattern to fix rocks passing through top/sides.',
    categories: [
      {
        name: 'Juggernaut Visual Fixes',
        iconType: 'physics',
        items: [
          'Blue Afterburner Removed: Generic renderer thruster effects now skipped for Juggernaut (config.id !== "juggernaut"), eliminating cyan radial glow and blue flame jets',
          'Independent Thruster Flames: Front thrusters (-35, -20) fire only when leftThruster > 0.05; rear thrusters (20, 35) fire only when rightThruster > 0.05 — matches default ship mechanics',
          'Gold Flame Plumes Only: All 4 thrusters now show correct gold/amber exhaust with shock diamonds, no blue artifacts',
        ],
      },
      {
        name: 'Juggernaut Hitbox Fix',
        iconType: 'physics',
        items: [
          'Collision Polygon Rebuilt: 14-vertex simple CCW polygon tracing outer hull union (main fuselage + lower hull)',
          'RenderScale Correct: All vertices multiplied by 1.8 (Juggernaut renderScale) — physics uses transformPoint() with NO scale, renderer uses ctx.scale(1.8)',
          'Follows Nutcracker/Vulcan Pattern: Same convention as proven collisionPolygon implementations',
          'Rock Collision Fixed: Rocks now properly collide with top bridge, side hulls, lower hull, and belly — no more passing through',
        ],
      },
    ],
  },
  {
    version: 'v1.9.5',
    releaseDate: 'September 19, 2026',
    title: 'Behemoth-IX Ramp Logic: Flush Locked Hatch & Vehicle-Only Articulation',
    tag: 'LATEST',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    summary:
      'Refined the Behemoth-IX vehicle ramp door system so the ramp stays cleanly sealed and locked shut during normal flight and landing, opening exclusively during active vehicle loading and unloading sequences at depot platforms.',
    categories: [
      {
        name: 'Behemoth-IX Ramp System',
        iconType: 'physics',
        items: [
          'Sealed Hatch in Flight: During standard flight, transit, and non-vehicle landing, the vehicle bay entrance is now sealed by a flush armored ramp hatch with rubber pressure gaskets, heavy hinge knuckles, hydraulic latch pins, and dual green status LEDs indicating "RAMP LOCKED".',
          'Vehicle-Only Articulation: The ramp door now smoothly unlocks and unfolds downward to ground level solely when an active vehicle loading or unloading sequence is triggered (such as at a vehicle depot platform), with ground crew technicians descending upon touchdown.',
          'Hangar Deck Sync: Updated the hangar / fleet catalogue SVG view in ShipGraphic to display the clean, flush locked hatch state.',
        ],
      },
    ],
  },
  {
    version: 'v1.9.4',
    releaseDate: 'September 19, 2026',
    title: 'Behemoth-IX Overhaul: Image Replica, Articulated Ramp, Cargo Crane & Calibrated Hitbox',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Completely redesigned the Behemoth-IX into an extra-detailed clone of the reference concept: a massive asymmetric industrial dreadnought hauler with an offset starboard command bridge tower, portside Warren-truss gantry, articulated vehicle loading ramp that descends with descending ground crew, proximity-activated sliding cargo bay door with telescoping asymmetric crane, pulsating fusion reactor louvers, twin aft rocket torch bells, and an exact 23-vertex watertight collision polygon calibrated for rock-solid clearance.',
    categories: [
      {
        name: 'Behemoth-IX Design & Mechanics',
        iconType: 'physics',
        items: [
          'High-Fidelity Clone: Meticulously replicated every detail from the reference blueprint: pale titanium composite hull plating, forward-raked cyan cockpit visor with mullions, offset starboard TYT control tower, rotating microwave radar dish, and aft rocket torch propulsion array.',
          'Articulated Vehicle Ramp & Ground Crew: Hydraulic ramp unfolds to ground level when loading/unloading vehicles, featuring high-traction ribbed bed, side safety hazard chevrons, and 3 ground crew technicians in orange hazard suits with white helmets, reflective vests, and flashing marshaling wand descending the ramp.',
          'Automated Side Cargo Crane: When approaching any cargo base or floating cargo, the armored side cargo door slides upward to reveal the illuminated interior hold; an asymmetric telescoping heavy vehicle crane traverses along the overhead ceiling track, tilting its box-girder boom and lowering a forged alloy hook with work spotlight.',
          'Watertight Hitbox & Rock Penetration Fix: Replaced oversized collision boundaries with a precise 23-vertex watertight polygon enclosing only solid craft structures; upgraded physics engine with polygon-accurate volcanic rock collision to prevent premature mid-air explosions.',
          'Visual Polish: Shifted fuselage stencil BEHEMOTH-IX to the right (x = 9.5) clear of thruster bells, added high-visibility flashing LED strobe to the top antenna mast, and ensured zero unwanted ground shadow artifacts.',
        ],
      },
    ],
  },
  {
    version: 'v1.9.3',
    releaseDate: 'September 19, 2026',
    title: 'Goliath Carrier Polish: Hitbox Calibration, Shadow Removal & Fuselage Visibility',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Addressed flight dynamics and visual presentation for the Goliath Carrier (CT-950 Colossus Hauler): recalibrated the watertight 15-vertex collision polygon to eliminate premature rock impacts, removed the artificial ground shadow, removed the ramp vehicle while retaining the descending ground crew, added high-visibility flashing beacons to the dorsal communications mast, and shifted the fuselage nameplate to the right so it remains completely visible clear of the aft thruster pod.',
    categories: [
      {
        name: 'Goliath Carrier: Collision & Visual Refinements',
        iconType: 'physics',
        items: [
          'Precision Hitbox Recalibration: Replaced the oversized bounding polygon with an exact 15-vertex watertight contour strictly bounded to the craft silhouette (x: -116.1 to 122.55, y: -35.48 to 43.0), eliminating premature terrain and rock obstacle explosions.',
          'Ground Shadow Removal: Removed the artificial ground shadow ellipse and ramp toe shadow to ensure clean planetary surface clearance and realistic lighting.',
          'Ramp Detail & Ground Crew: Removed the orange transport vehicle from the ramp while retaining and enhancing the ground crew technicians in orange hazard suits descending the ramp.',
          'Dorsal Antenna Blinking Beacons: Added rhythmic, high-intensity red and cyan flashing beacon strobes with glowing halos to the dorsal communications mast tips.',
          'Shifted Fuselage Nameplate: Repositioned the GOLIATH CARRIER red-bordered placard to the right (centered at x = 15) so the title is completely uncovered and legible against the aft thruster cowl.',
        ],
      },
    ],
  },
  {
    version: 'v1.9.2',
    releaseDate: 'September 19, 2026',
    title: 'Goliath Carrier Refinement: Diagonal Descending Ramp, Belly-Flush Thrusters & Multi-Tone Livery',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Fine-tuned the Goliath Carrier (CT-950 Colossus Hauler) to accurately reflect every structural detail from the reference concept: repositioned the rear vehicle loading door to sit diagonally along the aft hull so it lowers seamlessly as a descending ramp, shortened the side-mounted thruster pods so their exhaust bell lips match the craft belly line, shifted the rear thruster further aft, and enriched the fuselage with multiple tones of grey plating, bold diagonal red armor stripes, and updated collision polygons.',
    categories: [
      {
        name: 'Goliath Carrier: Geometric & Visual Refinements',
        iconType: 'physics',
        items: [
          'Diagonal Rear Loading Door & Ramp: The aft cargo door is positioned diagonally along the aft hull silhouette and descends smoothly around its cargo floor hinge to the terrain surface when loading vehicles or landed, with folding toe section, hazard chevrons, and telescoping dual hydraulic rams.',
          'Belly-Flush Thruster Pods: Shortened the side-mounted VTOL thruster pods so their flared copper exhaust nozzle bells terminate at y = 11.0, aligning directly with the craft belly line and creating realistic lift thrust dynamics.',
          'Rear Thruster Aft Relocation: Moved the rear thruster pod further aft (centered at x = -24) to balance the craft silhouette and provide wide, stable landing pad separation (footpadSpan 137.6).',
          'Rich Multi-Tone Fuselage Plating: Enriched the hull with multiple tones of grey ceramic panels, structural frame dividers, three diagonal red armor bands, crew quarters observation slit, and red-bordered GOLIATH CARRIER nameplate.',
          'Watertight Collision Polygon & Physics Anchors: Updated the rigid-body collision polygon and localPoints in ships.ts to trace the new aft diagonal door, belly-flush nozzle lips, and aft thruster position.',
        ],
      },
    ],
  },
  {
    version: 'v1.9.1',
    releaseDate: 'September 19, 2026',
    title: 'Goliath Carrier Diagram Clone: Descending Vehicle Ramp & Port VTOL Thruster Pods',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Re-engineered the Goliath Carrier (CT-950 Colossus Hauler) as an authentic clone of the technical side-profile diagram. Features a dynamic rear-descending vehicle ramp on the left that lowers smoothly to the terrain when loading vehicles, dual port-side VTOL thruster pods with copper cowls, illuminated vehicle hold with a parked tracked combat rover, an orange 6-wheeled vehicle rolling down the ramp, ground crew technicians, stenciled GOLIATH CARRIER banner, and heavy articulated ski landing gear.',
    categories: [
      {
        name: 'Goliath Carrier: Technical Diagram Clone',
        iconType: 'physics',
        items: [
          'Authentic Side-Profile Livery: Battleship slate gunmetal hull with crimson-red armor accent bands, yellow/black hazard chevrons, crew quarters with observation slit, and twin copper comms masts with blinking red strobe.',
          'Descending Left Ramp: When landed or loading vehicles, the rear vehicle ramp smoothly descends from the cargo floor sill down to the surface, accompanied by extending dual hydraulic pistons with shiny chrome rods and a folding toe section flat on the ground.',
          'Illuminated Vehicle Hold & Cargo: The cavernous interior features structural bulkhead ribs, warm halogen work lights, an active telemetry control console, a parked green combat rover, and an orange 6-wheeled transport rolling down the ramp.',
          'Port-Side VTOL Pods & Heavy Ski Gear: Dual light silver thruster pods with copper intake lips, flared exhaust nozzle bells with radiant cyan throat glow, aerodynamic winglets, and articulated hydraulic landing struts with curved ski footpads.',
          'Cockpit & Bridge: Forward-raked bridge deck with polarized cyan visor, pilot silhouettes, roof swivel sensor turret, under-nose sensor cannon, and ventral stabilizing fins.',
          'Watertight 17-Vertex Collision Hull: Derived directly from the exact diagram silhouette and raw coordinates multiplied by renderScale (2.15) for rock-solid ground contact and terrain collision.',
        ],
      },
    ],
  },
  {
    version: 'v1.9.0',
    releaseDate: 'September 19, 2026',
    title: 'Goliath Carrier Blueprint Redesign, Dual Deployable Ramps & +40% Vehicle Scaling',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Re-engineered the CT-950 Goliath Carrier from the ground up based on the multi-view technical blueprint. Features an authentic white ceramic armor livery, dual deployable vehicle ramps (Bay A & Bay B) with telescopic hydraulic actuators that lower to the surface for vehicle embarkation, +40% super-heavy scaling (renderScale 2.35) matching planetary rover proportions, heavy crawler track landing gear, and a 28-vertex watertight collision hull.',
    categories: [
      {
        name: 'Craft Overhaul: Goliath Carrier',
        iconType: 'physics',
        items: [
          'Blueprint Architecture: redesigned the CT-950 Colossus Hauler to match the multi-view technical diagram with elevated flight control bridge, panoramic cyan visor, comms lattice mast, dual radar dishes, and rear tri-stacked rocket array.',
          'Interactive Dual Loading Ramps: Bay A and Bay B feature downward-opening hydraulic ramps with telescopic actuator arms, ribbed traction beds, and side hazard chevrons that lower when loading vehicles or landed.',
          'Interior Vehicle Holds: Bay A houses a heavy mining dump truck [CT-MT1] and Bay B houses an exploration half-track rover, with ceiling halogen floodlights and runway guide strips.',
          'Livery Synchronization: unified the crisp white ceramic armor finish across in-game physics flight and hangar deck catalogue SVG preview.',
          'Scale & Ground Stability: enlarged craft by 40% (renderScale 2.35, width 178, height 182, footpadSpan 162.15) so planetary rovers and trucks fit proportionally.',
          'Watertight Collision Polygon: derived 28-vertex precision hull covering crawler tracks, engine array, and tower sensors to prevent terrain clipping.',
        ],
      },
    ],
  },
  {
    version: 'v1.8.0',
    releaseDate: 'September 18, 2026',
    title: 'Titan Behemoth Super-Heavy Transport, Scaled Vehicle Bay & White Livery',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Introduced the monumental Titan Behemoth (TB-01 HATV) super-heavy atmospheric transport with an articulated downward-opening deployment bay ramp, rotating landing hazard beacons, +40% expanded hull scaling for heavy planetary rovers, and unified white ceramic armor livery.',
    categories: [
      {
        name: 'New Craft: Titan Behemoth',
        iconType: 'physics',
        items: [
          'Added the TB-01 Titan Behemoth, an ultra-heavy atmospheric transport vehicle with quad VTOL lift engines and massive cargo payload capacity.',
          'Interactive Deployable Ramp: when landed, the central vehicle bay door unfolds downward facing the player, revealing an armored APC, tracked tank, and cargo hoist.',
          'Rotating Internal Bay Beacons: amber emergency beacons sweep light across the vehicle deck upon touchdown.',
          'Livery Synchronization: unified the pristine white titanium-aluminum composite armor across both in-game flight and hangar menu inspection.',
          'Super-Heavy Vehicle Scaling: increased craft scale by 40% (renderScale 2.17) to dwarf planetary trucks and rovers.',
          'Watertight 22-vertex collision hull matching the expanded dimensions and heavy landing skids.',
        ],
      },
      {
        name: 'User Experience & Mobile',
        iconType: 'system',
        items: [
          'Scrollable Craft Inspection Modal: made the craft detail popup vertically scrollable on smaller screens and mobile devices so all specs and lore remain visible.',
        ],
      },
    ],
  },
  {
    version: 'v1.7.0',
    releaseDate: 'September 5, 2026',
    title: 'Medal & Rank Info Popups, Promethean Core World & New Hazard Medals',
    tag: 'MAJOR',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    summary:
      'Click any medal to read its full description and click a rank badge to see what each rank means, in the Mission Logbook. Added the colossal Promethean Core world, four new hazard medals, and polished the Logbook quick-stats bar and All Worlds overview.',
    categories: [
      {
        name: 'Mission Logbook',
        iconType: 'missions',
        items: [
          'Clicking any medal — earned or locked — opens a popup with its description and unlock status, from the All Worlds collection and every per-planet medal grid.',
          'Clicking the rank badge (S/A/B/C/D) on any planet explains what ranks mean and their score thresholds.',
          'All Worlds highlight cards (First Touchdown, Best Score, Favorite World) now show full planet names instead of uppercase IDs.',
          'Removed the prev/next arrows from the quick-stats bar and switched the Earned counter to a medal icon for a clean single-line layout.',
          'FIXED: switching tabs no longer snaps the Logbook back to the planet selected in the main menu.',
        ],
      },
      {
        name: 'New World',
        iconType: 'missions',
        items: [
          'Promethean Core: a gigantic 15 km supermassive volcanic rift with multi-stage sinking basalt shafts, intense convective updrafts, and two separate vehicle loading bays.',
        ],
      },
      {
        name: 'Medal Achievement System',
        iconType: 'missions',
        items: [
          'Flash in the Pan — crash within 5 seconds.',
          'Rock Bottom — hit a rock at 30 m/s or faster.',
          'Base Crash — crash directly into the base station.',
          'Dry Landing — land with 0 fuel remaining.',
        ],
      },
    ],
  },
  {
    version: 'v1.6.1',
    releaseDate: 'September 2, 2026',
    title: 'Logbook Polish, Custom-Map Navigation Fixes & Menu Refinements',
    summary:
      'Refined the Mission Logbook with swipeable world tabs, prev/next arrows, and a proper earned-medal collection on the All Worlds page. Fixed custom-map "Next Planet" ordering and returning to the menu from a custom map, centered the main menu section titles, added more breathing room between sections, and added a dedicated LOGBOOK button between Launch Mission and Level Editor.',
    categories: [
      {
        name: 'Mission Logbook',
        iconType: 'missions',
        items: [
          'Earned medals now correctly display on the All Worlds page of the Logbook (previously only shown on individual planet tabs).',
          'World tabs are swipeable left/right anywhere in the logbook content, and prev/next arrow buttons were added to the footer bar.',
          'Keyboard arrows keep working for tab navigation.',
        ],
      },
      {
        name: 'Custom Map Navigation',
        iconType: 'missions',
        items: [
          'FIXED: "Next Planet" on the completion screen now follows the same ordered world list as the main menu (official worlds, then custom maps) instead of jumping to Phobos when playing a custom map.',
          'FIXED: Returning to the main menu (in-game button) from a custom map now correctly re-selects that same custom map instead of falling back to Luna.',
        ],
      },
      {
        name: 'Interface & Visual Design',
        iconType: 'system',
        items: [
          'Main menu section titles (DESTINATION WORLD & SPACECRAFT FLEET) are now centered.',
          'Increased vertical spacing between the Destination World and Spacecraft Fleet sections for clearer grouping.',
          'Added a dedicated LOGBOOK button in the action row between Launch Mission and Level Editor, complementing the header icon.',
        ],
      },
    ],
  },
  {
    version: 'v1.6.0',
    releaseDate: 'September 2, 2026',
    title: 'Mission Logbook, Medal Collection & HUD Logistics Trackers',
    tag: 'MAJOR',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    summary:
      'Added a full Mission Logbook tracking landings, medals, cargo & rover logistics per world, plus in-flight HUD counters and a complete medal achievement system. Refined the main menu section layout so Destination World and Spacecraft Fleet are clearly separated.',
    categories: [
      {
        name: 'Mission Logbook',
        iconType: 'missions',
        items: [
          'New LOGBOOK button in the main menu header opens an interactive modal with an All Worlds summary and per-planet detail tabs.',
          'Tracks best score, best time, landing count, total cargo & rovers collected, first and last landing dates for every official world and any custom map you have flown.',
          'World tabs and detail headers use the same procedural PlanetGraphic visuals as the main menu planet cards.',
          'Data refreshes each time the Logbook opens so newly-recorded missions appear immediately.',
        ],
      },
      {
        name: 'Medal Achievement System',
        iconType: 'missions',
        items: [
          '14 medals across flight, logistics, hazard, and misc categories — from Feather Touch to Cargo Master to Speed Runner.',
          'Medals are evaluated automatically on every soft landing and persisted as permanent per-world collections visible in the Logbook.',
          'All Worlds summary shows unique vs total medals earned with a full unobtained medal gallery grid.',
        ],
      },
      {
        name: 'Flight HUD Logistics Bidirectional Counters',
        iconType: 'system',
        items: [
          'Cargo and rover counters now display live collected-vs-total badges (📦 0/3 · 🚚 0/2) next to the planet name in the in-flight HUD.',
          'Counters update in real time as cargo pods and planetary trucks are delivered to the landing pad.',
        ],
      },
      {
        name: 'Interface & Visual Design',
        iconType: 'system',
        items: [
          'Main menu sections restructured: section titles (DESTINATION WORLD, SPACECRAFT FLEET) now sit on top of the cards with their filter chips and catalog buttons stacked below, clearly separating the two selection modules.',
        ],
      },
      {
        name: 'Bug Fixes & Stability',
        iconType: 'system',
        items: [
          'Fixed black screen on Launch caused by a Flight HUD ReferenceError for the cargo/rover counters.',
          'Replaced unsupported Volcano icon with Mountain for lucide-react compatibility.',
          'Updated mission score saving to the extended record format with medal and logistics persistence.',
        ],
      },
    ],
  },
  {
    version: 'v1.5.0',
    releaseDate: 'September 1, 2026',
    title: 'Main Menu Visual Polish, Music Toggle & Cleaned Training Sector',
    tag: 'MAJOR',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
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
