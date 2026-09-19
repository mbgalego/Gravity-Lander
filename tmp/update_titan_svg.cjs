const fs = require('fs');

const file = 'src/components/ShipGraphic.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = "{modelId === 'titan' && (";
const endMarker = "{/* MODEL: COLONIAL VIPER";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);
if (startIndex === -1 || endIndex === -1) {
  console.error("Markers not found");
  process.exit(1);
}

const commentBeforeViper = content.lastIndexOf("{/* =", endIndex);

const newTitanBlock = `{modelId === 'titan' && (
          <g id="titan-behemoth-svg">
            {/* 1. Far-side landing gear & ground contact shadows */}
            <rect x="-36" y="20.8" width="8" height="1.8" fill="#141a13" rx="0.5" />
            <line x1="-32" y1="14" x2="-32" y2="21" stroke="#141a13" strokeWidth="1.8" />
            <rect x="26" y="20.8" width="8" height="1.8" fill="#141a13" rx="0.5" />
            <line x1="30" y1="14" x2="30" y2="21" stroke="#141a13" strokeWidth="1.8" />

            {/* 2. Main Armored Fuselage Hull (Titanium-Aluminum Alloy) */}
            <path
              d="M 64,-2 L 58,-6 L 46,-11 L 38,-11 L 34,-14 L 14,-14 L 10,-11 L -20,-11 L -24,-13 L -44,-13 L -58,-10 L -66,-7 L -66,3 L -56,11 L -40,11 L -20,11 L 16,11 L 40,11 L 54,7 L 64,1 Z"
              fill="url(#titan-hull-grad)"
              stroke="#1a2018"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 3. Aft Propulsion & Engine Cowling (Left Module, x = -66 to -44) */}
            <path
              d="M -65,-5 L -50,-5 L -46,5 L -56,9 L -65,2 Z"
              fill="#3a4336"
              stroke="#1e241c"
              strokeWidth="0.8"
            />
            {/* Lower exhaust louver vents */}
            <rect x="-62" y="1" width="7" height="1.2" fill="#181f17" rx="0.3" />
            <rect x="-62" y="3.2" width="7" height="1.2" fill="#181f17" rx="0.3" />
            <rect x="-62" y="5.4" width="7" height="1.2" fill="#181f17" rx="0.3" />
            <rect x="-62" y="7.6" width="7" height="1.2" fill="#181f17" rx="0.3" />

            {/* TB-01 Stencil */}
            <text x="-63" y="-0.5" fill="#e2e8f0" fontSize="7" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
              TB-01
            </text>

            {/* Tactical identification hazard block */}
            <rect x="-49" y="-4.5" width="4" height="3" fill="#f59e0b" rx="0.4" />
            <rect x="-48" y="-4.5" width="1" height="3" fill="#0f172a" />
            <rect x="-46.5" y="-4.5" width="1" height="3" fill="#0f172a" />

            {/* Fuselage Stencil: TITAN BEHEMOTH */}
            <text x="-43" y="-2.5" fill="#94a3b8" fontSize="3.2" fontWeight="bold" fontFamily="monospace" letterSpacing="0.4">
              TITAN BEHEMOTH
            </text>

            {/* 4. Upper Dorsal Systems & Goliath-14 Fusion Reactor Core */}
            {/* Atmospheric Intake Duct */}
            <path d="M -38,-11 L -36,-15 L -24,-15 L -22,-11 Z" fill="#2d352b" stroke="#181e17" strokeWidth="0.8" />
            <rect x="-35" y="-14.5" width="9" height="3" fill="#0f140e" rx="0.5" />
            <line x1="-34" y1="-14.5" x2="-34" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-32" y1="-14.5" x2="-32" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-30" y1="-14.5" x2="-30" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-28" y1="-14.5" x2="-28" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />

            {/* Crew Quarters Window Louvers */}
            <rect x="-20" y="-9.5" width="6" height="4.5" fill="#252b22" stroke="#181e17" strokeWidth="0.6" rx="0.5" />
            <line x1="-19.5" y1="-8.5" x2="-14.5" y2="-8.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-19.5" y1="-7.3" x2="-14.5" y2="-7.3" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-19.5" y1="-6.1" x2="-14.5" y2="-6.1" stroke="#64748b" strokeWidth="0.5" />

            {/* Goliath-14 Reactor Core */}
            <rect x="15" y="-16.5" width="18" height="4.5" fill="url(#titan-reactor-grad)" stroke="#0f172a" strokeWidth="0.8" rx="1.2" />
            <line x1="17" y1="-16.5" x2="17" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="19" y1="-16.5" x2="19" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="21" y1="-16.5" x2="21" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="23" y1="-16.5" x2="23" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="25" y1="-16.5" x2="25" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="27" y1="-16.5" x2="27" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="29" y1="-16.5" x2="29" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="31" y1="-16.5" x2="31" y2="-12" stroke="#94a3b8" strokeWidth="0.5" />
            <circle cx="24" cy="-16.5" r="1.5" fill="#cbd5e1" />

            {/* 5. Forward Avionics Bay & Wing Root Intake */}
            <path d="M 24,-9.5 L 36,-9.5 L 37,-3.5 L 23,-3.5 Z" fill="url(#titan-avionics-grad)" stroke="#0284c7" strokeWidth="0.8" />
            <line x1="30" y1="-9.5" x2="30" y2="-3.5" stroke="#1e293b" strokeWidth="0.6" />
            <line x1="23" y1="-6.5" x2="37" y2="-6.5" stroke="#1e293b" strokeWidth="0.6" />
            <rect x="25" y="-5.8" width="3" height="1.5" fill="#34d399" />
            <rect x="32" y="-5.8" width="3" height="1.5" fill="#60a5fa" />

            {/* Wing root intake scoop */}
            <rect x="36.5" y="-0.5" width="4.5" height="7.5" fill="#1e241c" stroke="#334155" strokeWidth="0.8" rx="1" />
            <rect x="37.5" y="0.5" width="2.5" height="5.5" fill="#090d09" rx="0.5" />

            {/* 6. Command Cockpit (Crew of 6) */}
            <path d="M 44,-10.5 L 56,-6 L 63,-1.5 L 63,2.5 L 54,6.5 L 44,6.5 Z" fill="#485243" stroke="#181e17" strokeWidth="0.9" />
            <path d="M 48,-8 L 57,-4.5 L 61.5,-0.5 L 55,0.5 L 47,-3 Z" fill="url(#titan-cockpit-grad)" stroke="#1c1917" strokeWidth="0.8" />
            <line x1="53" y1="-6" x2="51" y2="-1.5" stroke="#1c1917" strokeWidth="0.7" />
            <line x1="58" y1="-4" x2="56" y2="0.2" stroke="#1c1917" strokeWidth="0.7" />
            <circle cx="52" cy="-3.5" r="1.2" fill="#18181b" />
            <circle cx="57" cy="-1.8" r="1.0" fill="#18181b" />
            <line x1="63" y1="-1.5" x2="66.5" y2="-1.5" stroke="#94a3b8" strokeWidth="0.7" strokeLinecap="round" />

            {/* Chin FLIR Sensor Turret Ball */}
            <circle cx="48" cy="9.5" r="2.2" fill="#262e24" stroke="#475569" strokeWidth="0.7" />
            <circle cx="49.2" cy="9.5" r="0.8" fill="#38bdf8" />

            {/* 7. Sponson Wings & Stabilizers */}
            <path d="M -47,-1 L -24,-1 L -28,8 L -44,8 Z" fill="url(#titan-sponson-grad)" stroke="#161b15" strokeWidth="0.8" />
            <circle cx="-36" cy="3.5" r="2.5" fill="#e2e8f0" />
            <circle cx="-36" cy="3.5" r="1.6" fill="#0284c7" />
            <circle cx="-36" cy="3.5" r="0.8" fill="#f59e0b" />

            <path d="M 18,-1 L 37,-1 L 34,8 L 19,8 Z" fill="url(#titan-sponson-grad)" stroke="#161b15" strokeWidth="0.8" />

            {/* 8. Underslung Hydrogen Fuel Tanks */}
            <rect x="-18" y="11" width="34" height="2.8" fill="#1e241c" stroke="#334155" strokeWidth="0.7" rx="1.0" />
            <line x1="-10" y1="11" x2="-10" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="0" y1="11" x2="0" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="8" y1="11" x2="8" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />

            {/* 9. Dual VTOL Lift Pods (Aft & Forward, with Dual Nozzles each) */}
            {/* Aft Lift Pod */}
            <rect x="-39" y="9" width="14" height="6" fill="#2c3429" stroke="#181e16" strokeWidth="0.8" rx="1.2" />
            <polygon points="-38.5,15 -33.5,15 -32.2,19 -39.8,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="-36" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />
            <polygon points="-30.5,15 -25.5,15 -24.2,19 -31.8,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="-28" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />

            {/* Forward Lift Pod */}
            <rect x="23" y="9" width="14" height="6" fill="#2c3429" stroke="#181e16" strokeWidth="0.8" rx="1.2" />
            <polygon points="23.5,15 28.5,15 29.8,19 22.2,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="26" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />
            <polygon points="31.5,15 36.5,15 37.8,19 30.2,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="34" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />

            {/* 10. Primary Heavy Industrial Landing Gear */}
            {/* Aft Gear */}
            <line x1="-32" y1="15" x2="-32" y2="18.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="-32" y1="18" x2="-32" y2="21" stroke="#e2e8f0" strokeWidth="1.4" />
            <rect x="-36.5" y="20.5" width="9" height="2.2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" rx="0.8" />
            <line x1="-35" y1="20.5" x2="-35" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-33" y1="20.5" x2="-33" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-31" y1="20.5" x2="-31" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-29" y1="20.5" x2="-29" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />

            {/* Forward Gear */}
            <line x1="30" y1="15" x2="30" y2="18.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="30" y1="18" x2="30" y2="21" stroke="#e2e8f0" strokeWidth="1.4" />
            <rect x="25.5" y="20.5" width="9" height="2.2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" rx="0.8" />
            <line x1="27" y1="20.5" x2="27" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="29" y1="20.5" x2="29" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="31" y1="20.5" x2="31" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="33" y1="20.5" x2="33" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />

            {/* 11. CENTRAL HEAVY VEHICLE & CARGO HANGAR BAY (x = -20 to 16, y = -6 to 11) */}
            {/* Interior back wall bulkhead */}
            <rect x="-20" y="-6" width="36" height="17" fill="url(#titan-bay-bg)" stroke="#0a0d09" strokeWidth="1.0" />
            <line x1="-14" y1="-6" x2="-14" y2="11" stroke="#273024" strokeWidth="0.8" />
            <line x1="-8" y1="-6" x2="-8" y2="11" stroke="#273024" strokeWidth="0.8" />
            <line x1="-2" y1="-6" x2="-2" y2="11" stroke="#273024" strokeWidth="0.8" />
            <line x1="4" y1="-6" x2="4" y2="11" stroke="#273024" strokeWidth="0.8" />
            <line x1="10" y1="-6" x2="10" y2="11" stroke="#273024" strokeWidth="0.8" />

            {/* Bay Top Hazard Chevron Strip */}
            <rect x="-20" y="-6" width="36" height="1.8" fill="#0f172a" />
            <polygon points="-20,-6 -18,-6 -19.5,-4.2 -21.5,-4.2" fill="#f59e0b" />
            <polygon points="-16.5,-6 -14.5,-6 -16,-4.2 -18,-4.2" fill="#f59e0b" />
            <polygon points="-13,-6 -11,-6 -12.5,-4.2 -14.5,-4.2" fill="#f59e0b" />
            <polygon points="-9.5,-6 -7.5,-6 -9,-4.2 -11,-4.2" fill="#f59e0b" />
            <polygon points="-6,-6 -4,-6 -5.5,-4.2 -7.5,-4.2" fill="#f59e0b" />
            <polygon points="-2.5,-6 -0.5,-6 -2,-4.2 -4,-4.2" fill="#f59e0b" />
            <polygon points="1,-6 3,-6 1.5,-4.2 -0.5,-4.2" fill="#f59e0b" />
            <polygon points="4.5,-6 6.5,-6 5,-4.2 3,-4.2" fill="#f59e0b" />
            <polygon points="8,-6 10,-6 8.5,-4.2 6.5,-4.2" fill="#f59e0b" />
            <polygon points="11.5,-6 13.5,-6 12,-4.2 10,-4.2" fill="#f59e0b" />
            <polygon points="15,-6 16,-6 15.5,-4.2 13.5,-4.2" fill="#f59e0b" />

            {/* Stored Cargo: Green Containers & Supply Crates */}
            <rect x="-5" y="2" width="6" height="8.8" fill="#2f3b2a" stroke="#182015" strokeWidth="0.6" />
            <line x1="-5" y1="2" x2="1" y2="10.8" stroke="#41523a" strokeWidth="0.5" />
            <line x1="-5" y1="10.8" x2="1" y2="2" stroke="#41523a" strokeWidth="0.5" />

            <rect x="4" y="3" width="5" height="7.8" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
            <rect x="9.5" y="4.5" width="5" height="6.3" fill="#334155" stroke="#1e293b" strokeWidth="0.6" />

            {/* Overhead Cargo Hoist System */}
            <rect x="-19" y="-5.5" width="34" height="1.2" fill="#eab308" />
            <rect x="-12" y="-4.5" width="4" height="1.6" fill="#0f172a" />
            <line x1="-10" y1="-3" x2="-10" y2="0.5" stroke="#e2e8f0" strokeWidth="0.6" />
            <path d="M -10,0.5 L -10,1.5 A 1 1 0 0 0 -9,2.5" stroke="#eab308" strokeWidth="1.0" fill="none" />

            {/* Vehicle 1: 6-Wheeled Armored Recon Vehicle / APC */}
            <g id="titan-bay-apc">
              <polygon points="-18,9 -18,6.5 -16,5 -8,5 -6.5,7 -6.5,9" fill="#414d3b" stroke="#181f16" strokeWidth="0.6" />
              <rect x="-16" y="5.5" width="2.5" height="0.8" fill="#0284c7" />
              <rect x="-12" y="4.2" width="2.8" height="1.0" fill="#1e241c" />
              <line x1="-10.5" y1="4.2" x2="-9" y2="3.2" stroke="#64748b" strokeWidth="0.5" />
              <circle cx="-16.5" cy="9.8" r="1.3" fill="#0f172a" />
              <circle cx="-16.5" cy="9.8" r="0.5" fill="#475569" />
              <circle cx="-12.5" cy="9.8" r="1.3" fill="#0f172a" />
              <circle cx="-12.5" cy="9.8" r="0.5" fill="#475569" />
              <circle cx="-8.5" cy="9.8" r="1.3" fill="#0f172a" />
              <circle cx="-8.5" cy="9.8" r="0.5" fill="#475569" />
            </g>

            {/* Vehicle 2: Tracked Planetary Battle Tank */}
            <g id="titan-bay-tank">
              <rect x="-3.5" y="8.8" width="16.5" height="2.2" rx="0.8" fill="#0f172a" />
              <circle cx="-2" cy="9.9" r="0.8" fill="#475569" />
              <circle cx="0.8" cy="9.9" r="0.8" fill="#475569" />
              <circle cx="3.6" cy="9.9" r="0.8" fill="#475569" />
              <circle cx="6.4" cy="9.9" r="0.8" fill="#475569" />
              <circle cx="9.2" cy="9.9" r="0.8" fill="#475569" />
              <circle cx="11.5" cy="9.9" r="0.8" fill="#475569" />
              <polygon points="-3,8.8 -2,7 12,7 12.8,8.8" fill="#374232" stroke="#181f15" strokeWidth="0.6" />
              <rect x="0" y="5.5" width="7.5" height="1.8" rx="0.6" fill="#44513e" stroke="#181f15" strokeWidth="0.6" />
              <line x1="7.5" y1="6.4" x2="14.5" y2="6.4" stroke="#1e241c" strokeWidth="0.9" strokeLinecap="round" />
              {/* Vehicle tie-down restraints */}
              <line x1="-2.5" y1="10.8" x2="-0.5" y2="7.5" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="1,0.6" />
              <line x1="11" y1="10.8" x2="9.5" y2="7.5" stroke="#f59e0b" strokeWidth="0.6" strokeDasharray="1,0.6" />
            </g>

            {/* 12. INTERNAL BAY LIGHTS (TURNING / ROTATING WHEN LANDED) */}
            {/* Ceiling illumination strip lights */}
            <rect x="-17" y="-5.2" width="9" height="0.8" fill="#fef08a" opacity="0.8" rx="0.3" />
            <rect x="-5" y="-5.2" width="9" height="0.8" fill="#fef08a" opacity="0.8" rx="0.3" />
            <rect x="7" y="-5.2" width="7" height="0.8" fill="#fef08a" opacity="0.8" rx="0.3" />
            <rect x="-20" y="-5" width="36" height="16" fill="url(#titan-bay-light-wash)" />

            {/* Rotating Amber Emergency Warning Beacons */}
            {/* Left Beacon (turning clockwise) */}
            <g transform="translate(-17, -4.5)">
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.8s" repeatCount="indefinite" />
                <path d="M 0,0 L 13,-4 A 14 14 0 0 1 13,4 Z" fill="url(#titan-beacon-glow)" />
                <path d="M 0,0 L -13,-4 A 14 14 0 0 0 -13,4 Z" fill="url(#titan-beacon-glow)" />
              </g>
              <rect x="-1.5" y="-0.2" width="3" height="1.4" fill="#0f172a" rx="0.3" />
              <circle cx="0" cy="0" r="1.2" fill="#f59e0b" />
              <circle cx="0" cy="-0.3" r="0.5" fill="#ffffff">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Right Beacon (turning counter-clockwise) */}
            <g transform="translate(13, -4.5)">
              <g>
                <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.8s" repeatCount="indefinite" />
                <path d="M 0,0 L 13,-4 A 14 14 0 0 1 13,4 Z" fill="url(#titan-beacon-glow)" />
                <path d="M 0,0 L -13,-4 A 14 14 0 0 0 -13,4 Z" fill="url(#titan-beacon-glow)" />
              </g>
              <rect x="-1.5" y="-0.2" width="3" height="1.4" fill="#0f172a" rx="0.3" />
              <circle cx="0" cy="0" r="1.2" fill="#f59e0b" />
              <circle cx="0" cy="-0.3" r="0.5" fill="#ffffff">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* 13. DEPLOYMENT RAMP (OPENING DOWN FACING THE PLAYER) */}
            {/* Trapezoidal heavy steel loading ramp plate */}
            <polygon
              points="-20,11 16,11 18.5,20.5 -23,20.5"
              fill="url(#titan-ramp-grad)"
              stroke="#0f140e"
              strokeWidth="1.0"
              strokeLinejoin="round"
            />

            {/* Longitudinal vehicle wheel guidance ribs */}
            <line x1="-13.5" y1="11" x2="-15.5" y2="20.5" stroke="#4e5b4b" strokeWidth="0.8" />
            <line x1="-7.8" y1="11" x2="-8.9" y2="20.5" stroke="#4e5b4b" strokeWidth="0.8" />
            <line x1="-2" y1="11" x2="-2.25" y2="20.5" stroke="#4e5b4b" strokeWidth="0.8" />
            <line x1="3.8" y1="11" x2="4.4" y2="20.5" stroke="#4e5b4b" strokeWidth="0.8" />
            <line x1="9.5" y1="11" x2="11" y2="20.5" stroke="#4e5b4b" strokeWidth="0.8" />

            {/* Vehicle alignment chevrons on ramp surface */}
            <polyline points="-5.5,13.8 -2,12.5 1.5,13.8" fill="none" stroke="#f59e0b" strokeWidth="0.7" />
            <polyline points="-5.5,16.3 -2,15 1.5,16.3" fill="none" stroke="#f59e0b" strokeWidth="0.7" />
            <polyline points="-5.5,18.8 -2,17.5 1.5,18.8" fill="none" stroke="#f59e0b" strokeWidth="0.7" />

            {/* Yellow/black caution hazard stripes along ramp ground contact lip */}
            <polygon points="-23,19.2 -21.2,19.2 -22.4,20.5 -24.2,20.5" fill="#f59e0b" />
            <polygon points="-19.5,19.2 -17.7,19.2 -18.9,20.5 -20.7,20.5" fill="#f59e0b" />
            <polygon points="-16,19.2 -14.2,19.2 -15.4,20.5 -17.2,20.5" fill="#f59e0b" />
            <polygon points="-12.5,19.2 -10.7,19.2 -11.9,20.5 -13.7,20.5" fill="#f59e0b" />
            <polygon points="-9,19.2 -7.2,19.2 -8.4,20.5 -10.2,20.5" fill="#f59e0b" />
            <polygon points="-5.5,19.2 -3.7,19.2 -4.9,20.5 -6.7,20.5" fill="#f59e0b" />
            <polygon points="-2,19.2 -0.2,19.2 -1.4,20.5 -3.2,20.5" fill="#f59e0b" />
            <polygon points="1.5,19.2 3.3,19.2 2.1,20.5 0.3,20.5" fill="#f59e0b" />
            <polygon points="5,19.2 6.8,19.2 5.6,20.5 3.8,20.5" fill="#f59e0b" />
            <polygon points="8.5,19.2 10.3,19.2 9.1,20.5 7.3,20.5" fill="#f59e0b" />
            <polygon points="12,19.2 13.8,19.2 12.6,20.5 10.8,20.5" fill="#f59e0b" />
            <polygon points="15.5,19.2 17.3,19.2 16.1,20.5 14.3,20.5" fill="#f59e0b" />

            {/* Hydraulic side ramp actuators connecting hull to ramp */}
            <line x1="-20" y1="11" x2="-22" y2="19.5" stroke="#94a3b8" strokeWidth="1.0" strokeLinecap="round" />
            <line x1="16" y1="11" x2="17.5" y2="19.5" stroke="#94a3b8" strokeWidth="1.0" strokeLinecap="round" />

            {/* 14. Navigation & Status Beacon Strobes */}
            <circle cx="-63" cy="-8" r="1.2" fill="#ef4444" />
            <circle cx="-63" cy="-8" r="3.5" fill="#ef4444" opacity="0.45" />
            <circle cx="61" cy="4.5" r="1.2" fill="#22c55e" />
            <circle cx="61" cy="4.5" r="3.5" fill="#22c55e" opacity="0.45" />
          </g>
        )}`;

content = content.substring(0, startIndex) + newTitanBlock + "\n\n" + content.substring(commentBeforeViper);
fs.writeFileSync(file, content, 'utf8');
console.log('Update script executed successfully!');
