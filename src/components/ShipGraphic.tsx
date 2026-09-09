import React from 'react';
import { ShipModelConfig } from '../types';

interface ShipGraphicProps {
  ship: ShipModelConfig;
  size?: number; // pixel width/height (default: 56)
  className?: string;
  showThrusters?: boolean;
  showGlow?: boolean;
}

export const ShipGraphic: React.FC<ShipGraphicProps> = ({
  ship,
  size = 56,
  className = '',
  showThrusters = false,
  showGlow = true,
}) => {
  const modelId = ship.id;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Soft Thruster/Accent Glow */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-xl blur-md opacity-40 pointer-events-none transition-all duration-300 group-hover:opacity-80 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle, ${ship.accentColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      {/* High-Fidelity SVG Craft Render */}
      <svg
        viewBox="-40 -40 80 80"
        className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)] relative z-10 overflow-visible"
      >
        <defs>
          {/* Hull Shaders */}
          <linearGradient id={`hull-grad-${modelId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor={ship.primaryColor} />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Spherical Fuel Tank Gradient */}
          <radialGradient id="fuel-tank-grad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* Xenon Blue Fuel Tank Gradient */}
          <radialGradient id="xenon-tank-grad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>

          {/* Gold Multi-Layer Insulation (MLI) Thermal Foil */}
          <linearGradient id="gold-foil" x1="0%" y1="0%" x2="100%" y2="90%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#eab308" />
            <stop offset="65%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>

          {/* Dark Titanium Plate */}
          <linearGradient id="titanium-plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Valkyrie Tactical Armored Slate Hull */}
          <linearGradient id="valkyrie-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="25%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Titan Heavy Industrial Armor Gradient */}
          <linearGradient id="titan-hull-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="18%" stopColor="#f1f5f9" />
            <stop offset="55%" stopColor="#cbd5e1" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Titan Deep Tungsten-Amber Bridge Glass */}
          <radialGradient id="titan-visor-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>

          {/* Titan Spherical Propellant Tank */}
          <radialGradient id="titan-tank-grad" cx="25%" cy="25%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>

          {/* Titan Nozzle Gradients */}
          <linearGradient id="titan-nozzle-left" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id="titan-nozzle-right" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Leviathan Chrome Oleo Piston */}
          <linearGradient id="leviathan-piston" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Leviathan Ventral Approach Spotlight Beam */}
          <linearGradient id="leviathan-spotlight-beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#bae6fd" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
          </linearGradient>

          {/* Cockpit Canopy Shader */}
          <radialGradient
            id={`visor-grad-${modelId}`}
            cx="35%"
            cy="30%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="40%" stopColor={ship.accentColor} />
            <stop offset="100%" stopColor={ship.visorColor} />
          </radialGradient>

          {/* Thruster Plume Flame */}
          <linearGradient id="thruster-flame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor={ship.accentColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* ========================================================= */}
        {/* MODEL: APOLLO RECON (LM-Scout Mk IV)                      */}
        {/* ========================================================= */}
        {modelId === 'apollo' && (
          <g>
            {/* 1. Landing Gear Assembly: Struts, Hydraulic Pistons, Cross-Braces */}
            <g stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round">
              {/* Left Primary Strut & Hydraulic Cylinder */}
              <line x1="-15" y1="12" x2="-28" y2="30" />
              <line x1="-11" y1="18" x2="-28" y2="30" strokeWidth="1.6" stroke="#64748b" />
              <line x1="-6" y1="20" x2="-22" y2="28" strokeWidth="1.2" stroke="#475569" />

              {/* Right Primary Strut & Hydraulic Cylinder */}
              <line x1="15" y1="12" x2="28" y2="30" />
              <line x1="11" y1="18" x2="28" y2="30" strokeWidth="1.6" stroke="#64748b" />
              <line x1="6" y1="20" x2="22" y2="28" strokeWidth="1.2" stroke="#475569" />
            </g>

            {/* Shock-Absorbing Footpads */}
            <ellipse cx="-28" cy="30" rx="6.5" ry="2.6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.4" />
            <line x1="-33" y1="31" x2="-23" y2="31" stroke="#0f172a" strokeWidth="1" />
            <ellipse cx="28" cy="30" rx="6.5" ry="2.6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.4" />
            <line x1="23" y1="31" x2="33" y2="31" stroke="#0f172a" strokeWidth="1" />

            {/* 2. Descent Stage (Gold Multi-Layer Insulation Octagon) */}
            <polygon
              points="-19,6 -19,22 19,22 19,6 14,2 -14,2"
              fill="url(#gold-foil)"
              stroke="#713f12"
              strokeWidth="1.6"
            />
            {/* Gold Thermal Seam Quilting */}
            <line x1="-15" y1="10" x2="15" y2="10" stroke="#a16207" strokeWidth="1.1" strokeDasharray="2,2" />
            <line x1="-17" y1="16" x2="17" y2="16" stroke="#a16207" strokeWidth="1.1" strokeDasharray="2,2" />
            <line x1="0" y1="2" x2="0" y2="22" stroke="#a16207" strokeWidth="1.2" />

            {/* 3. Spherical High-Pressure Fuel & Oxidizer Tanks */}
            <circle cx="-10" cy="14" r="5" fill="url(#fuel-tank-grad)" stroke="#78350f" strokeWidth="1" />
            <circle cx="10" cy="14" r="5" fill="url(#xenon-tank-grad)" stroke="#0369a1" strokeWidth="1" />
            {/* Braided Fuel Feed Lines */}
            <path d="M-10 19 L-14 24" stroke="#e2e8f0" strokeWidth="1.2" fill="none" />
            <path d="M10 19 L14 24" stroke="#e2e8f0" strokeWidth="1.2" fill="none" />

            {/* 4. Ascent Stage (White Faceted Command Cabin) */}
            <polygon
              points="0,-27 18,-11 18,4 -18,4 -18,-11"
              fill="url(#hull-grad-apollo)"
              stroke="#cbd5e1"
              strokeWidth="1.6"
            />
            {/* Crew Ingress Hatch Outline */}
            <rect x="-6" y="-8" width="12" height="11" rx="1.5" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.9" />

            {/* 5. Azure Cockpit Viewport with Specular Shine */}
            <ellipse cx="0" cy="-14" rx="7.5" ry="5.5" fill="url(#visor-grad-apollo)" stroke="#bae6fd" strokeWidth="1.2" />
            <ellipse cx="-2" cy="-16" rx="3.2" ry="1.6" fill="#ffffff" opacity="0.75" />

            {/* 6. High-Gain Parabolic Communications Dish */}
            <line x1="12" y1="-11" x2="16" y2="-20" stroke="#94a3b8" strokeWidth="1.2" />
            <path d="M12 -23 Q16 -19 20 -23" stroke="#e2e8f0" strokeWidth="1.6" fill="none" />

            {/* 7. RCS Attitude Control Quads */}
            <rect x="-21" y="-8" width="3.5" height="5.5" fill="#334155" stroke="#64748b" strokeWidth="0.8" rx="1" />
            <rect x="17.5" y="-8" width="3.5" height="5.5" fill="#334155" stroke="#64748b" strokeWidth="0.8" rx="1" />

            {/* 8. Thruster Rocket Nozzle Bells */}
            <polygon points="-16,22 -11,22 -9,27 -18,27" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <polygon points="11,22 16,22 18,27 9,27" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: TITAN BEHEMOTH (Heavy Armored Industrial Hauler)   */}
        {/* ========================================================= */}
        {modelId === 'titan' && (
          <g>
            {/* 1. Heavy Industrial Shock Struts & Suspension Rig */}
            {/* Upper Trunnion Mount Brackets */}
            <rect x="-31" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.2" />
            <rect x="25" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.2" />

            {/* Primary Heavy Oleo Hydraulic Struts */}
            {/* Outer Barrels */}
            <line x1="-28" y1="14" x2="-31.5" y2="21" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="-28" y1="14" x2="-31.5" y2="21" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="28" y1="14" x2="31.5" y2="21" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="28" y1="14" x2="31.5" y2="21" stroke="#475569" strokeWidth="3.2" strokeLinecap="round" />

            {/* Inner Telescopic Chrome Piston Rods */}
            <line x1="-31.5" y1="20" x2="-35" y2="26" stroke="#f8fafc" strokeWidth="2.0" strokeLinecap="round" />
            <line x1="31.5" y1="20" x2="35" y2="26" stroke="#f8fafc" strokeWidth="2.0" strokeLinecap="round" />

            {/* Secondary Diagonal A-Frame Scissor Links / Trailing Arms */}
            <line x1="-18" y1="16" x2="-33" y2="25.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="-18" y1="16" x2="-33" y2="25.5" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="18" y1="16" x2="33" y2="25.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="18" y1="16" x2="33" y2="25.5" stroke="#94a3b8" strokeWidth="1.2" />

            {/* Nitrogen Accumulator Canisters */}
            <rect x="-26.5" y="18" width="3.5" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="23" y="18" width="3.5" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />

            {/* Knuckle Joint Assemblies */}
            <circle cx="-35" cy="25.5" r="2.8" fill="#475569" stroke="#f59e0b" strokeWidth="1.2" />
            <circle cx="35" cy="25.5" r="2.8" fill="#475569" stroke="#f59e0b" strokeWidth="1.2" />

            {/* Port Heavy Cast Rocker Footpad */}
            <g>
              <rect x="-42" y="23.5" width="14" height="4.5" rx="1.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.4" />
              {/* Hazard stripes on footpad */}
              <line x1="-41" y1="28" x2="-38" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              <line x1="-36.5" y1="28" x2="-33.5" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              <line x1="-32" y1="28" x2="-29" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              {/* Ground cleats */}
              <rect x="-40" y="28" width="2.2" height="1.6" fill="#64748b" />
              <rect x="-36" y="28" width="2.2" height="1.6" fill="#64748b" />
              <rect x="-32" y="28" width="2.2" height="1.6" fill="#64748b" />
            </g>

            {/* Starboard Heavy Cast Rocker Footpad */}
            <g>
              <rect x="28" y="23.5" width="14" height="4.5" rx="1.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.4" />
              {/* Hazard stripes on footpad */}
              <line x1="29" y1="28" x2="32" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              <line x1="33.5" y1="28" x2="36.5" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              <line x1="38" y1="28" x2="41" y2="23.5" stroke="#f59e0b" strokeWidth="1.8" />
              {/* Ground cleats */}
              <rect x="30" y="28" width="2.2" height="1.6" fill="#64748b" />
              <rect x="34" y="28" width="2.2" height="1.6" fill="#64748b" />
              <rect x="38" y="28" width="2.2" height="1.6" fill="#64748b" />
            </g>

            {/* 2. Heavy Dual Gimbaled Thrusters */}
            {/* Left Engine Assembly */}
            <g>
              <circle cx="-19" cy="18" r="3.2" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <line x1="-23" y1="17" x2="-21" y2="22" stroke="#e2e8f0" strokeWidth="1.4" />
              <polygon points="-25,18 -13,18 -10,27 -28,27" fill="url(#titan-nozzle-left)" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="-24" y1="21" x2="-14" y2="21" stroke="#64748b" strokeWidth="0.9" />
              <line x1="-26" y1="24" x2="-12" y2="24" stroke="#64748b" strokeWidth="0.9" />
              <line x1="-28.5" y1="27" x2="-9.5" y2="27" stroke="#d97706" strokeWidth="1.8" />
              {/* Internal Chamber Glow */}
              <ellipse cx="-19" cy="25" rx="6" ry="2.5" fill="#f59e0b" opacity="0.65">
                <animate attributeName="opacity" values="0.4;0.75;0.4" dur="2s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Right Engine Assembly */}
            <g>
              <circle cx="19" cy="18" r="3.2" fill="#334155" stroke="#0f172a" strokeWidth="1" />
              <line x1="23" y1="17" x2="21" y2="22" stroke="#e2e8f0" strokeWidth="1.4" />
              <polygon points="13,18 25,18 28,27 10,27" fill="url(#titan-nozzle-right)" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="14" y1="21" x2="24" y2="21" stroke="#64748b" strokeWidth="0.9" />
              <line x1="12" y1="24" x2="26" y2="24" stroke="#64748b" strokeWidth="0.9" />
              <line x1="9.5" y1="27" x2="28.5" y2="27" stroke="#d97706" strokeWidth="1.8" />
              {/* Internal Chamber Glow */}
              <ellipse cx="19" cy="25" rx="6" ry="2.5" fill="#f59e0b" opacity="0.65">
                <animate attributeName="opacity" values="0.75;0.4;0.75" dur="2s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* 3. Main Armored Heavy Hull */}
            <polygon
              points="-34,2 -24,-22 24,-22 34,2 28,18 -28,18"
              fill="url(#titan-hull-grad)"
              stroke="#f59e0b"
              strokeWidth="2.4"
              strokeLinejoin="miter"
            />

            {/* Bulkhead Ribs & Panel Seams */}
            <g stroke="#94a3b8" strokeWidth="1.0" fill="none">
              <path d="M-24 -22 L-30 2 L-25 18" />
              <path d="M24 -22 L30 2 L25 18" />
              <line x1="-22" y1="-9" x2="22" y2="-9" />
              <line x1="-26" y1="7" x2="-17" y2="7" />
              <line x1="17" y1="7" x2="26" y2="7" />
            </g>

            {/* Titanium Seam Rivets */}
            {[-22, -16, -10, 0, 10, 16, 22].map((rx) => (
              <g key={`titan-rivet-${rx}`}>
                <circle cx={rx} cy="-20.5" r="0.9" fill="#64748b" />
                <circle cx={rx} cy="-9.5" r="0.9" fill="#64748b" />
              </g>
            ))}

            {/* Top Deck Rigging & Avionics Sensor Mast */}
            <path d="M-22.5 -22 A2.5 2.5 0 0 1 -17.5 -22" stroke="#475569" strokeWidth="1.8" fill="none" />
            <path d="M17.5 -22 A2.5 2.5 0 0 1 22.5 -22" stroke="#475569" strokeWidth="1.8" fill="none" />

            <line x1="0" y1="-22" x2="0" y2="-30" stroke="#334155" strokeWidth="1.8" />
            <line x1="-5" y1="-26" x2="5" y2="-26" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="-3" y1="-28.5" x2="3" y2="-28.5" stroke="#94a3b8" strokeWidth="1.2" />
            {/* Pulsing Mast Beacon */}
            <circle cx="0" cy="-30" r="4.5" fill="rgba(245, 158, 11, 0.4)">
              <animate attributeName="r" values="2;5;2" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="-30" r="1.4" fill="#fef08a" />

            {/* 4. Dual Heavy Bridge Cockpit Viewports */}
            {/* Left Viewport */}
            <rect x="-18.5" y="-16.5" width="14" height="9" rx="2.2" fill="#0f172a" stroke="#b45309" strokeWidth="1.4" />
            <rect x="-17.5" y="-15.5" width="12" height="7" rx="1.6" fill="url(#titan-visor-grad)" />
            {/* Left Bridge HUD Reticle */}
            <line x1="-15.5" y1="-12" x2="-7.5" y2="-12" stroke="#38bdf8" strokeWidth="0.7" opacity="0.65" />
            <line x1="-11.5" y1="-14.5" x2="-11.5" y2="-9.5" stroke="#38bdf8" strokeWidth="0.7" opacity="0.65" />
            <ellipse cx="-14" cy="-14" rx="3.2" ry="1.4" fill="#ffffff" opacity="0.75" transform="rotate(-15 -14 -14)" />

            {/* Right Viewport */}
            <rect x="4.5" y="-16.5" width="14" height="9" rx="2.2" fill="#0f172a" stroke="#b45309" strokeWidth="1.4" />
            <rect x="5.5" y="-15.5" width="12" height="7" rx="1.6" fill="url(#titan-visor-grad)" />
            {/* Right Bridge HUD Reticle */}
            <line x1="7.5" y1="-12" x2="15.5" y2="-12" stroke="#38bdf8" strokeWidth="0.7" opacity="0.65" />
            <line x1="11.5" y1="-14.5" x2="11.5" y2="-9.5" stroke="#38bdf8" strokeWidth="0.7" opacity="0.65" />
            <ellipse cx="9" cy="-14" rx="3.2" ry="1.4" fill="#ffffff" opacity="0.75" transform="rotate(-15 9 -14)" />

            {/* Overhead Brow Driving Lamps */}
            {[-15, -9, 9, 15].map((lx) => (
              <rect key={`titan-lamp-${lx}`} x={lx - 1.5} y="-18.5" width="3" height="1.8" rx="0.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            ))}

            {/* Stenciled Monospace Designation: HC-9000 */}
            <text x="0" y="-11" fill="#334155" fontSize="3.2" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              HC-9000
            </text>

            {/* 5. Central Heavy Spherical Propellant Tanks & Cryo Plumbing */}
            <circle cx="-10" cy="2" r="7.5" fill="url(#titan-tank-grad)" stroke="#78350f" strokeWidth="1.5" />
            <circle cx="10" cy="2" r="7.5" fill="url(#titan-tank-grad)" stroke="#78350f" strokeWidth="1.5" />

            {/* Retention Girth Straps */}
            <line x1="-17.5" y1="2" x2="-2.5" y2="2" stroke="#0f172a" strokeWidth="2.0" />
            <line x1="2.5" y1="2" x2="17.5" y2="2" stroke="#0f172a" strokeWidth="2.0" />
            <line x1="-16" y1="-1.5" x2="-4" y2="-1.5" stroke="#334155" strokeWidth="1.2" />
            <line x1="-16" y1="5.5" x2="-4" y2="5.5" stroke="#334155" strokeWidth="1.2" />
            <line x1="4" y1="-1.5" x2="16" y2="-1.5" stroke="#334155" strokeWidth="1.2" />
            <line x1="4" y1="5.5" x2="16" y2="5.5" stroke="#334155" strokeWidth="1.2" />

            {/* Central Pressure Gauge */}
            <circle cx="0" cy="2" r="2.4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.0" />
            <line x1="0" y1="2" x2="1.2" y2="0.8" stroke="#38bdf8" strokeWidth="0.8" />

            {/* Stainless Cryo Feed Lines */}
            <path d="M-10 9 Q-14 14 -19 18" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
            <path d="M-10 9 Q-14 14 -19 18" stroke="#f8fafc" strokeWidth="0.8" fill="none" />
            <path d="M10 9 Q14 14 19 18" stroke="#94a3b8" strokeWidth="1.8" fill="none" />
            <path d="M10 9 Q14 14 19 18" stroke="#f8fafc" strokeWidth="0.8" fill="none" />

            {/* 6. Industrial Hazard Warning Belt & Vehicle Cargo Winch */}
            <g>
              <defs>
                <clipPath id="titan-svg-hazard-clip">
                  <polygon points="-26,10 26,10 28,18 -28,18" />
                </clipPath>
              </defs>
              <g clipPath="url(#titan-svg-hazard-clip)">
                <rect x="-30" y="9" width="60" height="10" fill="#0f172a" />
                <path
                  d="M-32 10 L-27.5 18 M-26.5 10 L-22 18 M-21 10 L-16.5 18 M-15.5 10 L-11 18 M-10 10 L-5.5 18 M-4.5 10 L0 18 M1 10 L5.5 18 M6.5 10 L11 18 M12 10 L16.5 18 M17.5 10 L22 18 M23 10 L27.5 18 M28.5 10 L33 18"
                  stroke="#f59e0b"
                  strokeWidth="2.8"
                />
              </g>
            </g>

            {/* Heavy Vehicle Magnetic Tow Clamp / Cargo Winch Collar */}
            <rect x="-4.5" y="14" width="9" height="4.5" rx="1.5" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.4" />
            <circle cx="0" cy="16.5" r="1.8" stroke="#e2e8f0" strokeWidth="1.4" fill="none" />

            {/* 7. Sponson RCS Clusters & Navigation Strobes */}
            <rect x="-34.5" y="-2" width="2.5" height="6" rx="0.8" fill="#1e293b" stroke="#475569" strokeWidth="0.9" />
            <rect x="32" y="-2" width="2.5" height="6" rx="0.8" fill="#1e293b" stroke="#475569" strokeWidth="0.9" />

            {/* Port Navigation Strobe (Red) */}
            <circle cx="-33.5" cy="2" r="1.5" fill="#ef4444" />
            <circle cx="-33.5" cy="2" r="4.5" fill="rgba(239, 68, 68, 0.45)">
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* Starboard Navigation Strobe (Green) */}
            <circle cx="33.5" cy="2" r="1.5" fill="#22c55e" />
            <circle cx="33.5" cy="2" r="4.5" fill="rgba(34, 197, 94, 0.45)">
              <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: VIPER DART (Stealth High-Agility Interceptor)      */}
        {/* ========================================================= */}
        {modelId === 'viper' && (
          <g>
            {/* 1. Sleek Carbon Retractable Gear Struts & Footpads */}
            <g stroke="#f43f5e" strokeWidth="2.2" strokeLinecap="round">
              <line x1="-16" y1="16" x2="-24" y2="30" />
              <line x1="16" y1="16" x2="24" y2="30" />
            </g>
            <ellipse cx="-24" cy="30" rx="4.5" ry="1.8" fill="#fda4af" stroke="#9f1239" strokeWidth="1.1" />
            <ellipse cx="24" cy="30" rx="4.5" ry="1.8" fill="#fda4af" stroke="#9f1239" strokeWidth="1.1" />

            {/* 2. Aerodynamic Stealth Delta Wings */}
            <polygon
              points="0,-33 19,13 28,21 14,24 0,16 -14,24 -28,21 -19,13"
              fill="#090d16"
              stroke="#f43f5e"
              strokeWidth="2.0"
            />

            {/* 3. Titanium High-Pressure Fuel Core */}
            <circle cx="0" cy="5" r="6" fill="url(#fuel-tank-grad)" stroke="#be123c" strokeWidth="1.2" />

            {/* 4. Center Fuselage Razor Spine */}
            <polygon
              points="0,-35 10,11 0,17 -10,11"
              fill="#1e293b"
              stroke="#fb7185"
              strokeWidth="1.2"
            />

            {/* 5. Crimson Stealth Holographic Cockpit */}
            <polygon
              points="0,-25 6,-7 0,-3 -6,-7"
              fill="url(#visor-grad-viper)"
              stroke="#fda4af"
              strokeWidth="1.3"
            />
            <ellipse cx="0" cy="-14" rx="2.5" ry="5" fill="#ffffff" opacity="0.65" />

            {/* 6. Vectoring Exhaust Bells */}
            <polygon points="-12,22 -6,22 -4,28 -14,28" fill="#e11d48" stroke="#fda4af" strokeWidth="0.8" />
            <polygon points="6,22 12,22 14,28 4,28" fill="#e11d48" stroke="#fda4af" strokeWidth="0.8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: AEGIS FORTRESS (Armored Heavy Planetary Pod)       */}
        {/* ========================================================= */}
        {modelId === 'aegis' && (
          <g>
            {/* 1. Heavy Outrigger Hydraulic Landing Legs */}
            <g stroke="#10b981" strokeWidth="3" strokeLinecap="round">
              <line x1="-22" y1="8" x2="-33" y2="28" />
              <line x1="-12" y1="16" x2="-33" y2="28" strokeWidth="1.8" stroke="#047857" />
              <line x1="22" y1="8" x2="33" y2="28" />
              <line x1="12" y1="16" x2="33" y2="28" strokeWidth="1.8" stroke="#047857" />
            </g>
            {/* Broad Magnetic Footpad Discs */}
            <ellipse cx="-33" cy="28" rx="6" ry="2.5" fill="#34d399" stroke="#064e3b" strokeWidth="1.3" />
            <ellipse cx="33" cy="28" rx="6" ry="2.5" fill="#34d399" stroke="#064e3b" strokeWidth="1.3" />

            {/* 2. Reinforced Hexagonal Armored Hull — emerald gradient + seams + rivets */}
            <polygon points="0,-25 25,-9 25,14 0,23 -25,14 -25,-9" fill="url(#titanium-plate)" stroke="#10b981" strokeWidth="2.4" />
            <g stroke="#34d399" strokeWidth="0.9">
              <line x1="0" y1="-25" x2="0" y2="23" />
              <line x1="-25" y1="-9" x2="25" y2="14" />
              <line x1="25" y1="-9" x2="-25" y2="14" />
              <line x1="-12" y1="2" x2="12" y2="2" />
            </g>
            <g fill="#6ee7b7">
              <circle cx="-20" cy="-10" r="0.8" />
              <circle cx="20" cy="-10" r="0.8" />
              <circle cx="0" cy="7" r="0.8" />
              <circle cx="-20" cy="5" r="0.8" />
              <circle cx="20" cy="5" r="0.8" />
              <circle cx="-20" cy="16" r="0.8" />
              <circle cx="20" cy="16" r="0.8" />
            </g>
            {/* Inner Kinetic Deflector Plate */}
            <polygon points="0,-18 19,-6 19,10 0,16 -19,10 -19,-6" fill="#047857" stroke="#34d399" strokeWidth="1.2" />

            {/* 3. Twin High-Pressure Propellant Spheres */}
            <circle cx="-11" cy="4" r="5" fill="url(#xenon-tank-grad)" stroke="#059669" strokeWidth="1.2" />
            <circle cx="11" cy="4" r="5" fill="url(#xenon-tank-grad)" stroke="#059669" strokeWidth="1.2" />

            {/* 4. Panoramic Emerald Observation Dome */}
            <circle cx="0" cy="-4" r="8.5" fill="url(#visor-grad-aegis)" stroke="#6ee7b7" strokeWidth="1.6" />
            <circle cx="-2.5" cy="-6" r="3.2" fill="#ffffff" opacity="0.8" />

            {/* 5. Dual Heavy Rocket Nozzles */}
            <rect x="-18" y="16" width="9" height="7" fill="#065f46" stroke="#34d399" rx="1.5" strokeWidth="1.2" />
            <rect x="9" y="16" width="9" height="7" fill="#065f46" stroke="#34d399" rx="1.5" strokeWidth="1.2" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: NEBULA CLIPPER (Catamaran Ion Cruiser)             */}
        {/* ========================================================= */}
        {modelId === 'nebula' && (
          <g>
            {/* 1. Catamaran Landing Skids with Footpads */}
            <line x1="-22" y1="18" x2="-24" y2="30" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="22" y1="18" x2="24" y2="30" stroke="#c084fc" strokeWidth="2.8" strokeLinecap="round" />
            <rect x="-29" y="29" width="10" height="3" rx="1.2" fill="#e879f9" stroke="#7e22ce" strokeWidth="1" />
            <rect x="19" y="29" width="10" height="3" rx="1.2" fill="#e879f9" stroke="#7e22ce" strokeWidth="1" />

            {/* 2. Twin Aerodynamic Carbon Booms — indigo gradient + seams + rivets */}
            <polygon points="-25,-25 -16,-10 -16,21 -27,23 -29,-14" fill="url(#titanium-plate)" stroke="#c084fc" strokeWidth="2.0" />
            <polygon points="25,-25 16,-10 16,21 27,23 29,-14" fill="url(#titanium-plate)" stroke="#c084fc" strokeWidth="2.0" />
            <g stroke="#a78bfa" strokeWidth="0.8">
              <line x1="-16" y1="-10" x2="-16" y2="21" />
              <line x1="16" y1="-10" x2="16" y2="21" />
            </g>
            <g fill="#c084fc">
              <circle cx="-18" cy="-10" r="0.7" />
              <circle cx="-18" cy="0" r="0.7" />
              <circle cx="-18" cy="6" r="0.7" />
              <circle cx="-18" cy="15" r="0.7" />
              <circle cx="18" cy="-10" r="0.7" />
              <circle cx="18" cy="0" r="0.7" />
              <circle cx="18" cy="6" r="0.7" />
              <circle cx="18" cy="15" r="0.7" />
            </g>

            {/* 3. Central Xenon Fuel Sphere — gradient + seam + rivets */}
            <circle cx="0" cy="5" r="7" fill="url(#titanium-plate)" stroke="#a855f7" strokeWidth="1.4" />
            <g stroke="#f0abfc" strokeWidth="0.7">
              <line x1="0" y1="-2" x2="0" y2="12" />
            </g>
            <g fill="#e879f9">
              <circle cx="0" cy="0" r="0.6" />
              <circle cx="0" cy="4" r="0.6" />
              <circle cx="0" cy="8" r="0.6" />
            </g>

            {/* 4. Center Bridge & Wings — violet gradient + seam + rivets */}
            <polygon points="0,-15 16,0 16,13 -16,13 -16,0" fill="url(#titanium-plate)" stroke="#e879f9" strokeWidth="1.6" />
            <g stroke="#a78bfa" strokeWidth="0.8">
              <line x1="0" y1="-15" x2="0" y2="13" />
              <line x1="-8" y1="3" x2="8" y2="3" />
            </g>
            <g fill="#e879f9">
              <circle cx="-6" cy="7" r="0.6" />
              <circle cx="0" cy="7" r="0.6" />
              <circle cx="6" cy="7" r="0.6" />
            </g>

            {/* 5. Violet Sensor Canopy — seam + rivets */}
            <ellipse cx="0" cy="-3" rx="9" ry="5.5" fill="url(#visor-grad-nebula)" stroke="#f0abfc" strokeWidth="1.3" />
            <g stroke="#f0abfc" strokeWidth="0.9">
              <line x1="-9" y1="-3" x2="9" y2="-3" />
              <line x1="0" y1="-8" x2="0" y2="2" />
            </g>
            <g fill="#e879f9">
              <circle cx="-6" cy="-3" r="0.7" />
              <circle cx="0" cy="-3" r="0.7" />
              <circle cx="6" cy="-3" r="0.7" />
              <circle cx="0" cy="-0.5" r="0.7" />
            </g>
            <ellipse cx="-2.5" cy="-5" rx="3.5" ry="1.6" fill="#ffffff" opacity="0.75" />

            {/* 6. Ion Plasma Emitters */}
            <circle cx="-21" cy="22" r="4.5" fill="#c084fc" />
            <circle cx="21" cy="22" r="4.5" fill="#c084fc" />
            <circle cx="-21" cy="22" r="2.2" fill="#ffffff" />
            <circle cx="21" cy="22" r="2.2" fill="#ffffff" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: GOLIATH TRANSPORTER (Heavy Vehicle Carrier)        */}
        {/* ========================================================= */}
        {modelId === 'goliath' && (
          <g>
            {/* 1. Heavy Landing Struts, Oleo Piston Cylinders & Articulated Rocker Footpads */}
            {/* Upper Trunnion Mount Brackets */}
            <rect x="-35" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.0" />
            <rect x="29" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.0" />

            {/* Primary Oleo Hydraulic Struts */}
            <line x1="-32" y1="14" x2="-35.5" y2="24" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="-32" y1="14" x2="-35.5" y2="24" stroke="#475569" strokeWidth="3.0" />
            <line x1="-35.5" y1="23" x2="-38" y2="29.5" stroke="#f8fafc" strokeWidth="2.0" />

            <line x1="32" y1="14" x2="35.5" y2="24" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="32" y1="14" x2="35.5" y2="24" stroke="#475569" strokeWidth="3.0" />
            <line x1="35.5" y1="23" x2="38" y2="29.5" stroke="#f8fafc" strokeWidth="2.0" />

            {/* Diagonal A-Frame Scissor Stabilizers */}
            <line x1="-24" y1="18" x2="-37" y2="29" stroke="#334155" strokeWidth="2.4" />
            <line x1="-24" y1="18" x2="-37" y2="29" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="24" y1="18" x2="37" y2="29" stroke="#334155" strokeWidth="2.4" />
            <line x1="24" y1="18" x2="37" y2="29" stroke="#94a3b8" strokeWidth="1.2" />

            {/* Nitrogen Accumulators */}
            <rect x="-31" y="20" width="3.4" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="27.6" y="20" width="3.4" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />

            {/* Knuckle Joint Pivots */}
            <circle cx="-38" cy="29.5" r="2.8" fill="#475569" stroke="#f59e0b" strokeWidth="1.2" />
            <circle cx="38" cy="29.5" r="2.8" fill="#475569" stroke="#f59e0b" strokeWidth="1.2" />

            {/* Port Articulated Rocker Footpad with Hazard Stripes & Cleats */}
            <rect x="-45.5" y="29.5" width="15" height="4.8" rx="1.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.4" />
            <line x1="-43" y1="34.3" x2="-40" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="-39" y1="34.3" x2="-36" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="-35" y1="34.3" x2="-32" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <rect x="-44" y="34.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="-39.5" y="34.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="-35" y="34.3" width="2.2" height="1.6" fill="#64748b" />

            {/* Starboard Articulated Rocker Footpad with Hazard Stripes & Cleats */}
            <rect x="30.5" y="29.5" width="15" height="4.8" rx="1.5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.4" />
            <line x1="33" y1="34.3" x2="36" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="37" y1="34.3" x2="40" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="41" y1="34.3" x2="44" y2="29.5" stroke="#f59e0b" strokeWidth="1.6" />
            <rect x="32" y="34.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="36.5" y="34.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="41" y="34.3" width="2.2" height="1.6" fill="#64748b" />

            {/* 2. Starboard Right Flank Propulsion Nacelle (x: +16 to +38) */}
            <rect x="16" y="-8" width="22" height="26" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.8" />
            <rect x="19" y="-5" width="16" height="20" rx="1.5" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Nacelle Thermal Radiator Louvers */}
            <line x1="21" y1="-1" x2="33" y2="-1" stroke="#ea580c" strokeWidth="1.6" />
            <line x1="21" y1="4" x2="33" y2="4" stroke="#ea580c" strokeWidth="1.6" />
            <line x1="21" y1="9" x2="33" y2="9" stroke="#ea580c" strokeWidth="1.6" />
            {/* Helium Pressurant Tank in Dorsal Saddle */}
            <circle cx="29" cy="-5" r="4.2" fill="url(#fuel-tank-grad)" stroke="#78350f" strokeWidth="1.0" />
            <line x1="25" y1="-5" x2="33" y2="-5" stroke="#0f172a" strokeWidth="1.4" />
            {/* Starboard RCS Cluster */}
            <rect x="35" y="-4" width="4" height="8" rx="1" fill="#334155" stroke="#64748b" strokeWidth="1.0" />
            {/* Green Navigation Light */}
            <circle cx="37" cy="-7" r="1.4" fill="#22c55e" />

            {/* 3. Overhead Structural Gantry Truss (x: -16 to +16) */}
            <rect x="-16" y="-14" width="32" height="6.5" rx="1.5" fill="#0f172a" stroke="#334155" strokeWidth="1.6" />
            {/* Lattice Web Struts */}
            <path d="M-14 -13.5 L-10 -8.5 L-6 -13.5 L-2 -8.5 L2 -13.5 L6 -8.5 L10 -13.5 L14 -8.5" stroke="#64748b" strokeWidth="1.0" fill="none" />
            {/* Bottom Hazard Chevron Band */}
            <line x1="-15" y1="-8.5" x2="15" y2="-8.5" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3,2" />
            {/* Center Crane Trolley Collar */}
            <rect x="-3.5" y="-8.8" width="7" height="3.2" rx="1" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.0" />

            {/* 4. Hollow Center Vehicle Hold Bay */}
            <rect x="-16" y="-8" width="32" height="24" rx="1" fill="#030712" stroke="#334155" strokeWidth="1.6" />
            {/* Hold Perspective Bulkhead Ribs */}
            <line x1="-6" y1="-8" x2="-6" y2="16" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="6" y1="-8" x2="6" y2="16" stroke="#1e293b" strokeWidth="1.2" />
            {/* Ceiling Halogen Floodlights */}
            <rect x="-10" y="-8" width="3.5" height="1.2" fill="#fef08a" />
            <rect x="-1.75" y="-8" width="3.5" height="1.2" fill="#fef08a" />
            <rect x="6.5" y="-8" width="3.5" height="1.2" fill="#fef08a" />
            {/* Hold Floor Guide Rails */}
            <line x1="-14" y1="14.8" x2="14" y2="14.8" stroke="#f59e0b" strokeWidth="0.9" />

            {/* 5. Left Port Side Door / Hydraulic Loading Ramp */}
            <line x1="-16" y1="14" x2="-26" y2="22" stroke="#1e293b" strokeWidth="4.0" strokeLinecap="round" />
            <line x1="-16" y1="14" x2="-26" y2="22" stroke="#f59e0b" strokeWidth="2.4" />
            <line x1="-16" y1="14" x2="-26" y2="22" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2,2" />
            <circle cx="-16" cy="14" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="-26" cy="22" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="1.0" />
            {/* Status LED */}
            <circle cx="-16" cy="10" r="1.2" fill="#22c55e" />

            {/* 6. Elevated Left Side Controller Tower (Command Bridge & ATC) */}
            <polygon
              points="-36,-26 -28,-34 -16,-34 -16,16 -36,16"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="2.0"
            />
            {/* Tower Armor Plate */}
            <rect x="-34" y="-18" width="16" height="30" rx="2" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Armor Rivets */}
            <circle cx="-32.5" cy="-14" r="0.7" fill="#64748b" />
            <circle cx="-19.5" cy="-14" r="0.7" fill="#64748b" />
            <circle cx="-32.5" cy="-2" r="0.7" fill="#64748b" />
            <circle cx="-19.5" cy="-2" r="0.7" fill="#64748b" />
            <circle cx="-32.5" cy="10" r="0.7" fill="#64748b" />
            <circle cx="-19.5" cy="10" r="0.7" fill="#64748b" />

            {/* Panoramic Flight Control Bridge Observation Visor (Cyan Deep Glass) */}
            <polygon points="-33,-24 -27,-30 -18,-30 -18,-20 -33,-20" fill="url(#visor-grad-goliath)" stroke="#bae6fd" strokeWidth="1.2" />
            <ellipse cx="-26" cy="-25" rx="3.8" ry="1.6" fill="#ffffff" opacity="0.85" />
            {/* Xenon Searchlights on Tower Roof */}
            <rect x="-31" y="-32.5" width="3.5" height="1.8" rx="0.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <rect x="-23" y="-32.5" width="3.5" height="1.8" rx="0.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />

            {/* Antenna Mast & Telemetry Radar on Left Tower */}
            <line x1="-28" y1="-34" x2="-28" y2="-43" stroke="#94a3b8" strokeWidth="1.8" />
            <line x1="-32" y1="-39" x2="-24" y2="-39" stroke="#cbd5e1" strokeWidth="1.2" />
            <path d="M-33 -42 Q-28 -39 -23 -42" stroke="#38bdf8" strokeWidth="1.8" fill="none" />
            <circle cx="-28" cy="-43.5" r="1.6" fill="#ef4444" />
            <circle cx="-35" cy="-25" r="1.4" fill="#ef4444" />

            {/* 7. Industrial Rotating Hazard Beacons on Gantry Corners */}
            {/* Left Beacon Housing (-16, -14.5) */}
            <rect x="-19.2" y="-13.3" width="6.4" height="2.4" rx="0.8" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
            <rect x="-18.8" y="-18.1" width="5.6" height="5.0" rx="2.0" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.0" />
            <circle cx="-16" cy="-15.5" r="1.5" fill="#fef08a" opacity="0.9" />

            {/* Right Beacon Housing (16, -14.5) */}
            <rect x="12.8" y="-13.3" width="6.4" height="2.4" rx="0.8" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
            <rect x="13.2" y="-18.1" width="5.6" height="5.0" rx="2.0" fill="#f59e0b" stroke="#fef08a" strokeWidth="1.0" />
            <circle cx="16" cy="-15.5" r="1.5" fill="#fef08a" opacity="0.9" />

            {/* 8. Heavy Thruster Bells with Machined Copper Expansion Lips */}
            {/* Port Engine Bell */}
            <path d="M-31 16 L-23 16 L-21 24 L-33 24 Z" fill="url(#titan-nozzle-left)" stroke="#f59e0b" strokeWidth="1.2" />
            <line x1="-33.5" y1="24" x2="-20.5" y2="24" stroke="#d97706" strokeWidth="1.8" />

            {/* Starboard Engine Bell */}
            <path d="M22 16 L30 16 L32 24 L20 24 Z" fill="url(#titan-nozzle-right)" stroke="#f59e0b" strokeWidth="1.2" />
            <line x1="19.5" y1="24" x2="32.5" y2="24" stroke="#d97706" strokeWidth="1.8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: BEHEMOTH-IX (Dreadnought Planetary Carrier)        */}
        {/* ========================================================= */}
        {modelId === 'behemoth' && (
          <g>
            {/* 1. Quad Outrigger Landing Gear & Rocker Footpads */}
            {/* Upper Trunnion Mount Brackets */}
            <rect x="-35" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.2" />
            <rect x="29" y="11" width="6" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="1.2" />

            {/* Heavy Hydraulic Oleo Outer Barrels */}
            <g stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round">
              <line x1="-32" y1="14" x2="-35.5" y2="24" />
              <line x1="32" y1="14" x2="35.5" y2="24" />
            </g>
            <g stroke="#475569" strokeWidth="3.0">
              <line x1="-32" y1="14" x2="-35.5" y2="24" />
              <line x1="32" y1="14" x2="35.5" y2="24" />
            </g>

            {/* Telescopic Chrome Piston Rods */}
            <g stroke="#f8fafc" strokeWidth="2.0">
              <line x1="-35.5" y1="23" x2="-38" y2="30.5" />
              <line x1="35.5" y1="23" x2="38" y2="30.5" />
            </g>

            {/* Secondary Diagonal A-Frame Scissor Stabilizers */}
            <g stroke="#334155" strokeWidth="2.4">
              <line x1="-24" y1="18" x2="-37" y2="30" />
              <line x1="24" y1="18" x2="37" y2="30" />
            </g>
            <g stroke="#94a3b8" strokeWidth="1.2">
              <line x1="-24" y1="18" x2="-37" y2="30" />
              <line x1="24" y1="18" x2="37" y2="30" />
            </g>

            {/* Nitrogen Accumulator Canisters */}
            <rect x="-31" y="20" width="3.4" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="27.6" y="20" width="3.4" height="7" rx="1" fill="#64748b" stroke="#0f172a" strokeWidth="0.8" />

            {/* Knuckle Joint Assemblies */}
            <circle cx="-38" cy="30.5" r="2.8" fill="#475569" stroke="#f97316" strokeWidth="1.2" />
            <circle cx="38" cy="30.5" r="2.8" fill="#475569" stroke="#f97316" strokeWidth="1.2" />

            {/* Port Cast Manganese-Steel Rocker Footpad */}
            <rect x="-45.5" y="30.5" width="15" height="4.8" rx="1.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.4" />
            {/* Port Hazard Stripes */}
            <g stroke="#f97316" strokeWidth="1.8">
              <line x1="-44" y1="35" x2="-41" y2="30.5" />
              <line x1="-39.5" y1="35" x2="-36.5" y2="30.5" />
              <line x1="-35" y1="35" x2="-32" y2="30.5" />
            </g>
            {/* Port Traction Cleats */}
            <rect x="-44" y="35.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="-39.5" y="35.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="-35" y="35.3" width="2.2" height="1.6" fill="#64748b" />

            {/* Starboard Cast Manganese-Steel Rocker Footpad */}
            <rect x="30.5" y="30.5" width="15" height="4.8" rx="1.5" fill="#0f172a" stroke="#f97316" strokeWidth="1.4" />
            {/* Starboard Hazard Stripes */}
            <g stroke="#f97316" strokeWidth="1.8">
              <line x1="32" y1="35" x2="35" y2="30.5" />
              <line x1="36.5" y1="35" x2="39.5" y2="30.5" />
              <line x1="41" y1="35" x2="44" y2="30.5" />
            </g>
            {/* Starboard Traction Cleats */}
            <rect x="32" y="35.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="36.5" y="35.3" width="2.2" height="1.6" fill="#64748b" />
            <rect x="41" y="35.3" width="2.2" height="1.6" fill="#64748b" />

            {/* 2. Left Portside Heavy Gantry Crane & Cargo Structure (x: -36 to -14) */}
            <rect x="-36" y="-14" width="22" height="30" rx="2" fill="#0f172a" stroke="#f97316" strokeWidth="1.8" />
            {/* Titanium Armored Insert Panel */}
            <rect x="-34" y="-10" width="18" height="22" rx="1.5" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Stenciled Industrial Markings */}
            <text x="-25" y="4" fill="#64748b" fontSize="2.8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CR-2500</text>
            {/* High-Visibility Base Hazard Stripes */}
            <g stroke="#f97316" strokeWidth="1.6">
              <line x1="-33" y1="9" x2="-17" y2="9" />
              <line x1="-33" y1="12" x2="-17" y2="12" />
            </g>

            {/* Crane Motorized Winch Drum */}
            <rect x="-29" y="-13" width="10" height="5" rx="1" fill="#334155" stroke="#0f172a" strokeWidth="1.0" />
            <g stroke="#94a3b8" strokeWidth="0.8">
              <line x1="-27" y1="-13" x2="-27" y2="-8" />
              <line x1="-25" y1="-13" x2="-25" y2="-8" />
              <line x1="-23" y1="-13" x2="-23" y2="-8" />
              <line x1="-21" y1="-13" x2="-21" y2="-8" />
            </g>

            {/* Hydraulic Elevation Cylinder */}
            <line x1="-24" y1="-13" x2="-30" y2="-23" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="-27" y1="-18" x2="-30" y2="-23" stroke="#f8fafc" strokeWidth="1.6" />

            {/* Reinforced Box-Girder Crane Boom Arm */}
            <path d="M-30 -14 L-30 -26 L-37 -22" stroke="#f97316" strokeWidth="3.2" fill="none" strokeLinejoin="round" />
            {/* Internal Triangular Lattice Web Bracing */}
            <g stroke="#ea580c" strokeWidth="1.4">
              <line x1="-30" y1="-18" x2="-24" y2="-14" />
              <line x1="-30" y1="-22" x2="-34" y2="-20" />
              <line x1="-30" y1="-26" x2="-24" y2="-14" />
            </g>

            {/* Crane Boom Head Sheave Pulley Wheel */}
            <circle cx="-37" cy="-22" r="2.5" fill="#fdba74" stroke="#c2410c" strokeWidth="1.0" />
            <circle cx="-37" cy="-22" r="0.9" fill="#0f172a" />

            {/* NEW FEATURE: Suspended Braided Steel Hoist Cable & Magnetic Spreader Bar */}
            {/* Steel Wire Rope Cable */}
            <line x1="-37" y1="-20" x2="-37" y2="-6" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Lifting Eye Shackle */}
            <circle cx="-37" cy="-7.5" r="1.5" fill="none" stroke="#94a3b8" strokeWidth="1.2" />

            {/* Heavy Magnetic Spreader Bar Girder */}
            <rect x="-44" y="-6" width="14" height="3.2" rx="0.8" fill="#1e293b" stroke="#f97316" strokeWidth="1.2" />
            {/* Spreader Hazard Chevrons */}
            <g stroke="#ea580c" strokeWidth="1.0">
              <line x1="-42" y1="-3" x2="-40" y2="-6" />
              <line x1="-34" y1="-3" x2="-32" y2="-6" />
            </g>
            {/* Left & Right Gripper Solenoids */}
            <rect x="-43.5" y="-2.8" width="3.2" height="2.2" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="-33.7" y="-2.8" width="3.2" height="2.2" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.8" />
            {/* Active Electromagnetic Flux Glow */}
            <ellipse cx="-37" cy="-2" rx="7.5" ry="3.5" fill="#38bdf8" opacity="0.4" />
            <circle cx="-37" cy="-4.5" r="1.2" fill="#38bdf8" />
            <circle cx="-37" cy="-5" r="0.8" fill="#22c55e" />

            {/* High-Intensity Halogen Work Floodlight on Boom */}
            <rect x="-39" y="-18.8" width="4.0" height="2.2" rx="0.6" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="-37" cy="-17.8" r="1.5" fill="#fef08a" />
            {/* Volumetric Warm Downward Light Cone */}
            <polygon points="-37,-17.8 -49,10 -27,10" fill="#fef08a" opacity="0.16" />

            {/* 3. Center Hollow Vehicle Hold Bay (x: -14 to +14, y: -8 to +16) */}
            <rect x="-14" y="-8" width="28" height="24" rx="1.5" fill="#030712" stroke="#475569" strokeWidth="1.6" />
            {/* Interior Bulkhead Ribs */}
            <g stroke="#1e293b" strokeWidth="1.2">
              <line x1="-5" y1="-8" x2="-5" y2="16" />
              <line x1="5" y1="-8" x2="5" y2="16" />
            </g>
            {/* Stenciled Hold Designation */}
            <text x="0" y="-4" fill="#334155" fontSize="3.0" fontFamily="monospace" fontWeight="bold" textAnchor="middle">BH-09 HOLD</text>
            {/* Ceiling Halogen Floodlights */}
            <rect x="-9" y="-8" width="3.2" height="1.2" fill="#fef08a" />
            <rect x="-1.6" y="-8" width="3.2" height="1.2" fill="#fef08a" />
            <rect x="5.8" y="-8" width="3.2" height="1.2" fill="#fef08a" />
            <polygon points="-9,-6.8 -12,16 -2,16 -5.8,-6.8" fill="#fef08a" opacity="0.08" />
            <polygon points="5.8,-6.8 2,16 12,16 9,-6.8" fill="#fef08a" opacity="0.08" />
            {/* Floor Guide Tracks */}
            <rect x="-13" y="13.5" width="26" height="2.5" fill="#1e293b" />
            <line x1="-12" y1="14.8" x2="12" y2="14.8" stroke="#f97316" strokeWidth="0.8" />

            {/* Loaded Heavy 8-Wheel Exploration Rover Rig */}
            <g transform="translate(0, 9)">
              {/* Chassis Body */}
              <rect x="-11" y="-4.5" width="22" height="7.5" rx="1.5" fill="#1e293b" stroke="#f97316" strokeWidth="1.2" />
              {/* Cockpit Visor */}
              <rect x="-9.5" y="-6.8" width="7.5" height="3.2" rx="1" fill="#0ea5e9" stroke="#38bdf8" strokeWidth="0.8" />
              <ellipse cx="-7.5" cy="-5.5" rx="2.0" ry="0.8" fill="#ffffff" opacity="0.8" />
              {/* Rear Nuclear RTG Module */}
              <rect x="0.5" y="-6.5" width="9" height="3.5" rx="1" fill="#334155" stroke="#64748b" strokeWidth="0.8" />
              {/* Radiator Fins */}
              <g stroke="#f97316" strokeWidth="0.7">
                <line x1="3" y1="-6.5" x2="3" y2="-3.0" />
                <line x1="5.5" y1="-6.5" x2="5.5" y2="-3.0" />
                <line x1="8" y1="-6.5" x2="8" y2="-3.0" />
              </g>
              {/* Rooftop Antenna Dish */}
              <line x1="6.5" y1="-6.5" x2="6.5" y2="-9.5" stroke="#94a3b8" strokeWidth="0.9" />
              <path d="M5 -10 Q6.5 -8.5 8 -10" stroke="#94a3b8" strokeWidth="0.9" fill="none" />
              <circle cx="2" cy="-7.5" r="1.0" fill="#f97316" />
              {/* Heavy Planetary Wheels */}
              <g fill="#0f172a" stroke="#475569" strokeWidth="0.9">
                <circle cx="-8.5" cy="3.2" r="2.3" />
                <circle cx="-4.0" cy="3.2" r="2.3" />
                <circle cx="1.0" cy="3.2" r="2.3" />
                <circle cx="5.5" cy="3.2" r="2.3" />
                <circle cx="8.5" cy="3.2" r="2.3" />
              </g>
              <g fill="#94a3b8">
                <circle cx="-8.5" cy="3.2" r="0.8" />
                <circle cx="-4.0" cy="3.2" r="0.8" />
                <circle cx="1.0" cy="3.2" r="0.8" />
                <circle cx="5.5" cy="3.2" r="0.8" />
                <circle cx="8.5" cy="3.2" r="0.8" />
              </g>
              {/* Deck Tie-Down Tensioners */}
              <line x1="-10" y1="2" x2="-12" y2="5" stroke="#f97316" strokeWidth="1.2" />
              <line x1="10" y1="2" x2="12" y2="5" stroke="#f97316" strokeWidth="1.2" />
            </g>

            {/* 4. Left Asymmetrical Hydraulic Loading Ramp Door */}
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#1e293b" strokeWidth="4.0" strokeLinecap="round" />
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#f97316" strokeWidth="2.8" />
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#fed7aa" strokeWidth="1.2" strokeDasharray="2,2" />
            {/* Pressure Door Hinge Bosses */}
            <circle cx="-14" cy="14" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="-26" cy="23" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="-14" cy="10" r="1.2" fill="#22c55e" />

            {/* 5. Starboard Heavy Command Bridge Tower (x: +14 to +36, y: -34 to +16) */}
            <polygon
              points="14,-34 34,-34 36,-26 36,16 14,16"
              fill="#0f172a"
              stroke="#f97316"
              strokeWidth="2.0"
            />
            {/* Heavy Ballistic Outer Titanium Armor Plate */}
            <rect x="16" y="-18" width="18" height="30" rx="2" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Armor Hex Rivets */}
            <g fill="#64748b">
              <circle cx="18.5" cy="-14" r="0.7" />
              <circle cx="31.5" cy="-14" r="0.7" />
              <circle cx="18.5" cy="-8" r="0.7" />
              <circle cx="31.5" cy="-8" r="0.7" />
              <circle cx="18.5" cy="-2" r="0.7" />
              <circle cx="31.5" cy="-2" r="0.7" />
              <circle cx="18.5" cy="4" r="0.7" />
              <circle cx="31.5" cy="4" r="0.7" />
              <circle cx="18.5" cy="10" r="0.7" />
              <circle cx="31.5" cy="10" r="0.7" />
            </g>
            {/* Stenciled Markings */}
            <text x="25" y="4" fill="#f97316" fontSize="2.6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">BH-900</text>
            <text x="25" y="8" fill="#64748b" fontSize="2.0" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DREADNOUGHT</text>

            {/* Cyan Panoramic Bridge Visor */}
            <polygon points="17,-30 31,-30 33,-22 17,-22" fill="url(#visor-grad-behemoth)" stroke="#7dd3fc" strokeWidth="1.2" />
            {/* Tactical CRT HUD Crosshairs */}
            <g stroke="rgba(56, 189, 248, 0.65)" strokeWidth="0.7">
              <line x1="21" y1="-26" x2="29" y2="-26" />
              <line x1="25" y1="-29" x2="25" y2="-23" />
            </g>
            <ellipse cx="24" cy="-26" rx="3.8" ry="1.6" fill="#ffffff" opacity="0.85" />

            {/* Xenon Brow Searchlights */}
            <rect x="18" y="-32.5" width="3.5" height="1.8" rx="0.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <rect x="26" y="-32.5" width="3.5" height="1.8" rx="0.6" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />

            {/* Tower Radar & Telemetry Mast */}
            <line x1="28" y1="-34" x2="28" y2="-44" stroke="#cbd5e1" strokeWidth="1.8" />
            {/* Telemetry Dipole Crossbar */}
            <line x1="25" y1="-39" x2="31" y2="-39" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Phased-Array Curved Radar Dish */}
            <path d="M22 -42 Q28 -39 34 -42" stroke="#38bdf8" strokeWidth="1.8" fill="none" />
            {/* Red Anti-Collision Mast Strobe */}
            <circle cx="28" cy="-44.5" r="1.6" fill="#ef4444" />
            <circle cx="28" cy="-44.5" r="4.0" fill="rgba(239, 68, 68, 0.35)" />
            {/* Starboard Green Nav Light */}
            <circle cx="36" cy="-26" r="1.4" fill="#22c55e" />

            {/* 6. Asymmetrical Heavy Propulsion Array ("Offset Dual-Chamber Fusion Torch Nozzles") */}
            {/* Port Engine Housing & Bell */}
            <circle cx="-25" cy="16" r="2.8" fill="#334155" stroke="#0f172a" strokeWidth="1.0" />
            <polygon points="-29,16 -21,16 -19.5,24 -30.5,24" fill="url(#titan-nozzle-left)" stroke="#f97316" strokeWidth="1.3" />
            <line x1="-31" y1="24" x2="-19" y2="24" stroke="#ea580c" strokeWidth="1.8" />

            {/* Starboard Dual Rocket Bells */}
            <circle cx="21" cy="16" r="2.6" fill="#334155" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="29" cy="16" r="2.6" fill="#334155" stroke="#0f172a" strokeWidth="1.0" />
            <polygon points="17.5,16 24.5,16 25.5,24 16.5,24" fill="url(#titan-nozzle-right)" stroke="#f97316" strokeWidth="1.4" />
            <polygon points="25.5,16 32.5,16 33.5,24 24.5,24" fill="url(#titan-nozzle-right)" stroke="#f97316" strokeWidth="1.4" />
            <line x1="16" y1="24" x2="26" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            <line x1="24" y1="24" x2="34" y2="24" stroke="#ea580c" strokeWidth="1.8" />

            {/* Combustion Chamber Throat Idle Glow */}
            <ellipse cx="-25" cy="22.5" rx="4.0" ry="1.6" fill="#f97316" opacity="0.5" />
            <ellipse cx="21" cy="22.5" rx="3.8" ry="1.6" fill="#f97316" opacity="0.5" />
            <ellipse cx="29" cy="22.5" rx="3.8" ry="1.6" fill="#f97316" opacity="0.5" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: LEVIATHAN TITAN (Split-Hull Catamaran Supercarrier) */}
        {/* ========================================================= */}
        {modelId === 'leviathan' && (
          <g>
            {/* 0. Downward Landing Spotlight Beam */}
            <polygon
              points="-3,16 -24,46 30,46 3,16"
              fill="url(#leviathan-spotlight-beam)"
            />
            <ellipse cx="3" cy="46" rx="27" ry="4.5" fill="#06b6d4" opacity="0.25" />
            <ellipse cx="3" cy="46" rx="15" ry="2.5" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" />

            {/* 1. Catamaran Outrigger Landing Gear (Strictly Isolated Subpaths) */}
            {/* Port Strut Assembly */}
            <line x1="-34" y1="12" x2="-38" y2="22" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="-38" y1="22" x2="-42" y2="34" stroke="url(#leviathan-piston)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-26 16 L-33 24 L-42 34" fill="none" stroke="#0891b2" strokeWidth="1.8" />
            {/* Port Nitrogen Canister */}
            <rect x="-32" y="16" width="4" height="9" rx="1.5" fill="#0284c7" stroke="#082f49" strokeWidth="1.0" />
            {/* Port Knuckle & Footpad */}
            <circle cx="-42" cy="29.5" r="2.2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.2" />
            <ellipse cx="-42" cy="34" rx="9" ry="3.2" fill="#0891b2" stroke="#164e63" strokeWidth="1.5" />
            <line x1="-45" y1="32" x2="-43" y2="36" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="-41" y1="32" x2="-39" y2="36" stroke="#0f172a" strokeWidth="1.2" />

            {/* Starboard Strut Assembly */}
            <line x1="34" y1="12" x2="38" y2="22" stroke="#1e293b" strokeWidth="4.2" strokeLinecap="round" />
            <line x1="38" y1="22" x2="42" y2="34" stroke="url(#leviathan-piston)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M26 16 L33 24 L42 34" fill="none" stroke="#0891b2" strokeWidth="1.8" />
            {/* Starboard Nitrogen Canister */}
            <rect x="28" y="16" width="4" height="9" rx="1.5" fill="#0284c7" stroke="#082f49" strokeWidth="1.0" />
            {/* Starboard Knuckle & Footpad */}
            <circle cx="42" cy="29.5" r="2.2" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.2" />
            <ellipse cx="42" cy="34" rx="9" ry="3.2" fill="#0891b2" stroke="#164e63" strokeWidth="1.5" />
            <line x1="39" y1="32" x2="41" y2="36" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="43" y1="32" x2="45" y2="36" stroke="#0f172a" strokeWidth="1.2" />

            {/* 2. Massive Port Armored Vehicle Hangar Sponson (x: -40 to -10, y: -28 to +16) */}
            <polygon
              points="-40,-18 -34,-28 -10,-28 -10,16 -40,16"
              fill="#0f172a"
              stroke="#06b6d4"
              strokeWidth="2.0"
            />
            <rect x="-36" y="-14" width="24" height="28" rx="2" fill="url(#titanium-plate)" stroke="#67e8f9" strokeWidth="1.0" />
            {/* Port Armor Plate Rivets */}
            <circle cx="-34" cy="-9" r="0.7" fill="#64748b" />
            <circle cx="-34" cy="0" r="0.7" fill="#64748b" />
            <circle cx="-34" cy="9" r="0.7" fill="#64748b" />
            <circle cx="-14" cy="-9" r="0.7" fill="#64748b" />
            <circle cx="-14" cy="0" r="0.7" fill="#64748b" />
            <circle cx="-14" cy="9" r="0.7" fill="#64748b" />
            {/* Stenciled Fleet Marking */}
            <text x="-24" y="5" fill="#22d3ee" fontSize="2.8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LV-880</text>
            {/* Radiator Vents */}
            <rect x="-35" y="-24" width="8" height="6" fill="#082f49" stroke="#06b6d4" strokeWidth="0.8" />
            <line x1="-35" y1="-22" x2="-27" y2="-22" stroke="#06b6d4" strokeWidth="0.8" />
            <line x1="-35" y1="-20" x2="-27" y2="-20" stroke="#06b6d4" strokeWidth="0.8" />

            {/* Port Sponson Glacial Visor Observation Dome */}
            <ellipse cx="-22" cy="-22" rx="6.5" ry="3.8" fill="url(#visor-grad-leviathan)" stroke="#a5f3fc" strokeWidth="1.2" />
            <line x1="-25" y1="-22" x2="-19" y2="-22" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7" />
            <line x1="-22" y1="-24" x2="-22" y2="-20" stroke="#38bdf8" strokeWidth="0.6" opacity="0.7" />
            <ellipse cx="-24" cy="-23.2" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.85" />
            {/* Port Navigation Strobe */}
            <circle cx="-39" cy="-18" r="1.3" fill="#ef4444" />

            {/* 3. Center Pass-Through Hold & Overhead Box-Girder Bridge (x: -10 to +16) */}
            <rect x="-10" y="-16" width="26" height="7" rx="1.5" fill="#1e293b" stroke="#0891b2" strokeWidth="1.4" />
            {/* Girder Triangular Cutouts */}
            <polygon points="-7,-15 -3,-15 -5,-10" fill="#0f172a" />
            <polygon points="-1,-15 3,-15 1,-10" fill="#0f172a" />
            <polygon points="5,-15 9,-15 7,-10" fill="#0f172a" />
            <polygon points="11,-15 15,-15 13,-10" fill="#0f172a" />
            {/* Industrial Hazard Warning Striping */}
            <rect x="-10" y="-9" width="26" height="2" fill="#eab308" />
            <line x1="-8" y1="-9" x2="-6" y2="-7" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="-2" y1="-9" x2="0" y2="-7" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="4" y1="-9" x2="6" y2="-7" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="10" y1="-9" x2="12" y2="-7" stroke="#0f172a" strokeWidth="1.0" />

            {/* Recessed Interior Vehicle Hold */}
            <rect x="-10" y="-7" width="26" height="23" fill="#020617" stroke="#155e75" strokeWidth="1.2" />
            {/* Overhead Deck Lamps */}
            <circle cx="-4" cy="-5.5" r="1.2" fill="#fef08a" />
            <circle cx="4" cy="-5.5" r="1.2" fill="#fef08a" />
            <circle cx="10" cy="-5.5" r="1.2" fill="#fef08a" />
            {/* Deck Rails */}
            <line x1="-8" y1="14.5" x2="14" y2="14.5" stroke="#38bdf8" strokeWidth="0.8" />

            {/* Onboard Planetary Rover */}
            <g transform="translate(3, 7)">
              <rect x="-10" y="-5" width="20" height="9" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.0" />
              <rect x="3" y="-7.5" width="6.5" height="4.5" rx="1" fill="#38bdf8" stroke="#bae6fd" strokeWidth="0.6" />
              <rect x="-9" y="-7" width="5" height="3" fill="#ea580c" stroke="#fdba74" strokeWidth="0.6" />
              {/* All-Terrain Wheels */}
              <circle cx="-7.5" cy="4.8" r="2.0" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <circle cx="-7.5" cy="4.8" r="0.8" fill="#06b6d4" />
              <circle cx="-2.5" cy="4.8" r="2.0" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <circle cx="-2.5" cy="4.8" r="0.8" fill="#06b6d4" />
              <circle cx="2.5" cy="4.8" r="2.0" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <circle cx="2.5" cy="4.8" r="0.8" fill="#06b6d4" />
              <circle cx="7.5" cy="4.8" r="2.0" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <circle cx="7.5" cy="4.8" r="0.8" fill="#06b6d4" />
            </g>

            {/* 4. Closed Hydraulic Ramp Door */}
            <line x1="-10" y1="14" x2="-22" y2="23" stroke="#06b6d4" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="-22" cy="23" r="2.0" fill="#22d3ee" />

            {/* 5. Starboard Slender Sensor Spire & Tokamak Spine (x: +16 to +38, y: -42 to +16) */}
            <polygon
              points="16,-38 28,-38 38,-16 38,16 16,16"
              fill="#020617"
              stroke="#06b6d4"
              strokeWidth="1.8"
            />
            {/* Starboard Navigation Strobe */}
            <circle cx="37" cy="-16" r="1.3" fill="#22c55e" />
            {/* Communications Sensor Mast */}
            <line x1="22" y1="-38" x2="22" y2="-45" stroke="#a5f3fc" strokeWidth="2.0" />
            <line x1="18" y1="-42" x2="26" y2="-42" stroke="#67e8f9" strokeWidth="1.2" />
            <path d="M17 -43 Q22 -41 27 -43" stroke="#22d3ee" strokeWidth="2.0" fill="none" />
            <circle cx="22" cy="-45.5" r="1.4" fill="#ef4444" />

            {/* Tokamak Fusion Reactor Spine with Luminescent Plasma Rings */}
            <rect x="18" y="-16" width="18" height="28" fill="#082f49" stroke="#0891b2" strokeWidth="1.0" />
            <rect x="20" y="-12" width="14" height="4" rx="1" fill="#06b6d4" />
            <rect x="23" y="-10.8" width="8" height="1.6" rx="0.5" fill="#ffffff" />
            <rect x="20" y="-4" width="14" height="4" rx="1" fill="#06b6d4" />
            <rect x="23" y="-2.8" width="8" height="1.6" rx="0.5" fill="#ffffff" />
            <rect x="20" y="4" width="14" height="4" rx="1" fill="#06b6d4" />
            <rect x="23" y="5.2" width="8" height="1.6" rx="0.5" fill="#ffffff" />
            <rect x="20" y="11" width="14" height="4" rx="1" fill="#06b6d4" />
            <rect x="23" y="12.2" width="8" height="1.6" rx="0.5" fill="#ffffff" />

            {/* 6. Spotlight Gimbal Projector Assembly at Keel (x: 3, y: 16) */}
            <g transform="translate(3, 16)">
              <rect x="-4.5" y="-3" width="9" height="4" rx="1" fill="#334155" stroke="#06b6d4" strokeWidth="1.0" />
              <polygon points="-4,0 -3,3.5 3,3.5 4,0" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.0" />
              <ellipse cx="0" cy="3.2" rx="3.2" ry="1.2" fill="#f1f5f9" />
              <circle cx="0" cy="2.8" r="1.3" fill="#ffffff" />
              <circle cx="-2.6" cy="1.2" r="0.7" fill="#22c55e" />
              {/* Starburst Flare */}
              <line x1="-5" y1="2.8" x2="5" y2="2.8" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              <line x1="0" y1="-2.2" x2="0" y2="7.8" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
            </g>

            {/* 7. Heavy Asymmetric Rocket Propulsion Array */}
            {/* Port Dual Main Bells */}
            <polygon points="-35,16 -25,16 -23,24 -37,24" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
            <line x1="-37" y1="24" x2="-23" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            <polygon points="-23,16 -13,16 -11,24 -25,24" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
            <line x1="-25" y1="24" x2="-11" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            {/* Starboard High-Thrust Bell */}
            <polygon points="21,16 35,16 37,25 19,25" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.4" />
            <line x1="19" y1="25" x2="37" y2="25" stroke="#f97316" strokeWidth="2.0" />
            {/* Throat Idle Glow */}
            <ellipse cx="-30" cy="22.5" rx="4.5" ry="1.6" fill="#06b6d4" opacity="0.5" />
            <ellipse cx="-18" cy="22.5" rx="4.5" ry="1.6" fill="#06b6d4" opacity="0.5" />
            <ellipse cx="28" cy="23.5" rx="6.5" ry="1.8" fill="#06b6d4" opacity="0.5" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: MAMMOTH RIG (Excavator Mobile Base Carrier)        */}
        {/* ========================================================= */}
        {modelId === 'mammoth' && (
          <g>
            {/* 1. Heavy Articulated Mining Struts */}
            <g stroke="#eab308" strokeWidth="2.4" strokeLinecap="round">
              <line x1="-32" y1="14" x2="-38" y2="34" />
              <line x1="-22" y1="18" x2="-38" y2="34" strokeWidth="1.8" stroke="#854d0e" />
              <line x1="32" y1="14" x2="38" y2="34" />
              <line x1="22" y1="18" x2="38" y2="34" strokeWidth="1.8" stroke="#854d0e" />
            </g>
            <ellipse cx="-38" cy="34" rx="7.5" ry="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
            <ellipse cx="38" cy="34" rx="7.5" ry="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />

            {/* 2. Portside Excavator Hydraulic Crane Boom & Trusses (x: -38 to -14) */}
            <rect x="-38" y="-14" width="24" height="30" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1.8" />
            {/* Crane boom arm reaching up-left */}
            <line x1="-32" y1="-14" x2="-38" y2="-28" stroke="#eab308" strokeWidth="2.5" />
            <line x1="-24" y1="-14" x2="-38" y2="-28" stroke="#ca8a04" strokeWidth="1.6" />
            <circle cx="-38" cy="-28" r="2.2" fill="#fde047" />

            {/* 3. Center Ultra-Wide Mining Vehicle Bay (x: -14 to +14) */}
            <rect x="-14" y="-8" width="28" height="24" rx="1.5" fill="#0f172a" stroke="#ca8a04" strokeWidth="1.4" />

            {/* 4. Drop-Down Hydraulic Mining Ramp */}
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="-26" cy="23" r="1.8" fill="#facc15" />

            {/* 5. Starboard Cylindrical Refinery & Crimson Observation Bridge (x: +14 to +38, y: -34 to +16) */}
            <polygon
              points="14,-34 32,-34 38,-18 38,16 14,16"
              fill="#0f172a"
              stroke="#eab308"
              strokeWidth="2.0"
            />
            {/* Refinery fuel column */}
            <rect x="18" y="-12" width="16" height="24" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="18" y1="-4" x2="34" y2="-4" stroke="#eab308" strokeWidth="1.4" />
            <line x1="18" y1="4" x2="34" y2="4" stroke="#eab308" strokeWidth="1.4" />

            {/* Crimson Command Cupola */}
            <polygon points="16,-30 30,-30 33,-22 16,-22" fill="url(#visor-grad-mammoth)" stroke="#fda4af" strokeWidth="1.2" />
            <ellipse cx="23" cy="-26" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.85" />

            {/* Starboard Beacon */}
            <circle cx="34" cy="-32" r="2" fill="#ef4444" />

            {/* 6. Thruster Assemblies */}
            <rect x="-30" y="16" width="12" height="7" rx="1" fill="#1e293b" stroke="#eab308" strokeWidth="1" />
            <rect x="20" y="16" width="14" height="7" rx="1" fill="#1e293b" stroke="#eab308" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: VANGUARD ORBITAL (Classic Titanium Lunar Lander)   */}
        {/* ========================================================= */}
        {modelId === 'vanguard' && (
          <g>
            {/* 1. Articulated Tripod Landing Struts & Footpads */}
            <g stroke="#0ea5e9" strokeWidth="2.4" strokeLinecap="round">
              <line x1="-16" y1="8" x2="-28" y2="28" />
              <line x1="-10" y1="16" x2="-28" y2="28" strokeWidth="1.6" stroke="#0284c7" />
              <line x1="16" y1="8" x2="28" y2="28" />
              <line x1="10" y1="16" x2="28" y2="28" strokeWidth="1.6" stroke="#0284c7" />
            </g>
            <ellipse cx="-28" cy="28" rx="6" ry="2.4" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.3" />
            <ellipse cx="28" cy="28" rx="6" ry="2.4" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.3" />

            {/* 2. Gold Thermal Foil Descent Stage */}
            <polygon
              points="-18,2 -18,19 18,19 18,2 13,-2 -13,-2"
              fill="url(#gold-foil)"
              stroke="#a16207"
              strokeWidth="1.6"
            />
            {/* Thermal Foil Grid Pattern */}
            <line x1="-14" y1="7" x2="14" y2="7" stroke="#ca8a04" strokeWidth="1" />
            <line x1="-16" y1="14" x2="16" y2="14" stroke="#ca8a04" strokeWidth="1" />

            {/* 3. Spherical Propellant Tanks */}
            <circle cx="-9" cy="11" r="5" fill="url(#fuel-tank-grad)" stroke="#92400e" strokeWidth="1" />
            <circle cx="9" cy="11" r="5" fill="url(#xenon-tank-grad)" stroke="#0369a1" strokeWidth="1" />

            {/* 4. Titanium Command Sphere */}
            <circle cx="0" cy="-13" r="14.5" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.2" />

            {/* 5. High-Tech Cyan Visor */}
            <ellipse cx="0" cy="-13" rx="7.5" ry="6" fill="url(#visor-grad-vanguard)" stroke="#38bdf8" strokeWidth="1.4" />
            <ellipse cx="-2.5" cy="-15.5" rx="3.2" ry="1.6" fill="#ffffff" opacity="0.8" />

            {/* 6. Orbital Antenna Dish Mast */}
            <line x1="0" y1="-27" x2="0" y2="-34" stroke="#94a3b8" strokeWidth="1.8" />
            <path d="M-7 -36 Q0 -33 7 -36" stroke="#38bdf8" strokeWidth="2.2" fill="none" />

            {/* 7. Rocket Engine Nozzles */}
            <polygon points="-15,19 -10,19 -8,25 -17,25" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <polygon points="10,19 15,19 17,25 8,25" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: WASP SCOUT (WS-2 Stinger Micro Lander)             */}
        {/* ========================================================= */}
        {modelId === 'wasp' && (
          <g>
            <g stroke="#94a3b8" strokeWidth="2.0" strokeLinecap="round">
              <line x1="-12" y1="10" x2="-24" y2="28" />
              <line x1="-8" y1="16" x2="-24" y2="28" strokeWidth="1.6" stroke="#64748b" />
              <line x1="12" y1="10" x2="22" y2="28" />
              <line x1="8" y1="16" x2="22" y2="28" strokeWidth="1.6" stroke="#64748b" />
            </g>
            <rect x="-28" y="27" width="9" height="3" rx="1" fill="#475569" stroke="#eab308" strokeWidth="1.2" />
            <rect x="19" y="27" width="9" height="3" rx="1" fill="#475569" stroke="#eab308" strokeWidth="1.2" />

            {/* Outrigger Pods — brushed titanium gradient + panel seams + rivets */}
            <rect x="-24" y="2" width="8" height="20" rx="2" fill="url(#titanium-plate)" stroke="#eab308" strokeWidth="1.3" />
            <rect x="16" y="2" width="8" height="20" rx="2" fill="url(#titanium-plate)" stroke="#eab308" strokeWidth="1.3" />
            <g stroke="#334155" strokeWidth="0.7">
              <line x1="-24" y1="3" x2="-16" y2="3" />
              <line x1="-24" y1="10" x2="-16" y2="10" />
              <line x1="-24" y1="17" x2="-16" y2="17" />
              <line x1="16" y1="3" x2="24" y2="3" />
              <line x1="16" y1="10" x2="24" y2="10" />
              <line x1="16" y1="17" x2="24" y2="17" />
            </g>
            <g fill="#94a3b8">
              {[-23,-19,-17,-21].map((x)=><circle key={x} cx={x} cy={3} r={0.9} />)}
              {[-23,-19,-17,-21].map((x)=><circle key={x+"b"} cx={x} cy={10} r={0.9} />)}
              {[-23,-19,-17,-21].map((x)=><circle key={x+"c"} cx={x} cy={17} r={0.9} />)}
              {[17,19,21,23].map((x)=><circle key={x+"a"} cx={x} cy={3} r={0.9} />)}
              {[17,19,21,23].map((x)=><circle key={x+"d"} cx={x} cy={10} r={0.9} />)}
              {[17,19,21,23].map((x)=><circle key={x+"e"} cx={x} cy={17} r={0.9} />)}
            </g>

            {/* Outrigger Trusses */}
            <g stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
              <line x1="-10" y1="4" x2="-16" y2="4" />
              <line x1="-10" y1="14" x2="-16" y2="14" />
              <line x1="10" y1="4" x2="16" y2="4" />
              <line x1="10" y1="14" x2="16" y2="14" />
            </g>

            {/* Gold Foil Core — multi-stop gradient + quilting seams */}
            <polygon points="-12,4 -14,18 14,18 12,4" fill="url(#gold-foil)" stroke="#713f12" strokeWidth="1.2" />
            <line x1="-12" y1="11" x2="12" y2="11" stroke="#a16207" strokeWidth="1.0" />
            <line x1="-13" y1="7" x2="13" y2="7" stroke="#fde68a" strokeWidth="0.8" />
            <line x1="-13" y1="15" x2="13" y2="15" stroke="#a16207" strokeWidth="0.6" />

            {/* Upper Stinger Cabin — faceted seams + rivets + gold trim */}
            <polygon points="0,-27 13,-10 11,4 -11,4 -13,-10" fill="#0f172a" stroke="#eab308" strokeWidth="1.4" />
            <g stroke="#94a3b8" strokeWidth="0.7">
              <line x1="0" y1="-27" x2="0" y2="4" />
              <line x1="-13" y1="-10" x2="-11" y2="4" />
              <line x1="13" y1="-10" x2="11" y2="4" />
              <line x1="-7" y1="-18" x2="7" y2="-18" />
            </g>
            <g fill="#64748b">
              <circle cx="-11" cy="-18" r={0.8} />
              <circle cx="11" cy="-18" r={0.8} />
              <circle cx="0" cy="-18" r={0.8} />
              <circle cx="-11" cy="-8" r={0.8} />
              <circle cx="11" cy="-8" r={0.8} />
            </g>

            {/* Antenna Spikes on the Stinger Crown */}
            <g stroke="#94a3b8" strokeWidth="1.0" strokeLinecap="round">
              <line x1="-4" y1="-28" x2="-6" y2="-34" />
              <line x1="4" y1="-28" x2="6" y2="-34" />
            </g>

            <ellipse cx="0" cy="-14" rx="6.5" ry="4.5" fill="url(#visor-grad-wasp)" stroke="#fef08a" strokeWidth="1" />
            <ellipse cx="-2" cy="-15.5" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: KESTREL STUNT (KS-9 Aerobatic Dart)                */}
        {/* ========================================================= */}
        {modelId === 'kestrel' && (
          <g>
            <g stroke="#64748b" strokeWidth="2.0" strokeLinecap="round">
              <line x1="-14" y1="12" x2="-24" y2="28" />
              <line x1="14" y1="12" x2="24" y2="28" />
            </g>
            <rect x="-28" y="27" width="8" height="3" rx="1" fill="#334155" stroke="#06b6d4" strokeWidth="1" />
            <rect x="20" y="27" width="8" height="3" rx="1" fill="#334155" stroke="#06b6d4" strokeWidth="1" />

            {/* Swept Wings — multi-stop gradient + seams + rivets */}
            <polygon points="0,-22 25,12 18,18 -18,18 -25,12" fill="url(#titanium-plate)" stroke="#06b6d4" strokeWidth="1.4" />
            <g stroke="#0891b2" strokeWidth="0.7">
              <line x1="0" y1="-22" x2="0" y2="18" />
              <line x1="-13" y1="-4" x2="-22" y2="14" />
              <line x1="13" y1="-4" x2="22" y2="14" />
              <line x1="-20" y1="10" x2="20" y2="10" />
            </g>
            <g fill="#67e8f9">
              <circle cx="-22" cy="4" r="0.8" />
              <circle cx="22" cy="4" r="0.8" />
              <circle cx="-22" cy="11" r="0.8" />
              <circle cx="22" cy="11" r="0.8" />
              <circle cx="0" cy="11" r="0.8" />
            </g>
            {/* Needle Spine — faceted seams + rivets */}
            <polygon points="0,-32 8,-10 9,16 -9,16 -8,-10" fill="#0f172a" stroke="#67e8f9" strokeWidth="1.3" />
            <g stroke="#94a3b8" strokeWidth="0.7">
              <line x1="0" y1="-32" x2="0" y2="16" />
              <line x1="-8" y1="-10" x2="-9" y2="16" />
              <line x1="8" y1="-10" x2="9" y2="16" />
              <line x1="-4" y1="-18" x2="4" y2="-18" />
            </g>
            <g fill="#67e8f9">
              <circle cx="-9" cy="-18" r="0.8" />
              <circle cx="9" cy="-18" r="0.8" />
              <circle cx="-9" cy="-2" r="0.8" />
              <circle cx="9" cy="-2" r="0.8" />
              <circle cx="0" cy="-18" r="0.8" />
            </g>
            {/* Cyan Visor */}
            <polygon points="0,-22 4,-8 -4,-8" fill="url(#visor-grad-kestrel)" stroke="#a5f3fc" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: SPECTRE RECON (SP-4 Stealth Surveyor)              */}
        {/* ========================================================= */}
        {modelId === 'spectre' && (
          <g>
            <g stroke="#475569" strokeWidth="2.0" strokeLinecap="round">
              <line x1="-12" y1="14" x2="-24" y2="29" />
              <line x1="12" y1="14" x2="24" y2="29" />
            </g>
            <rect x="-28" y="28" width="8" height="3" rx="1" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" />
            <rect x="20" y="28" width="8" height="3" rx="1" fill="#1e1b4b" stroke="#a855f7" strokeWidth="1" />

            {/* Stealth Diamond Hull — purple gradient + seams + rivets */}
            <polygon points="0,-32 24,0 18,18 -18,18 -24,0" fill="url(#titanium-plate)" stroke="#a855f7" strokeWidth="1.6" />
            <g stroke="#6b21a8" strokeWidth="1.0">
              <line x1="0" y1="-32" x2="0" y2="18" />
              <line x1="-24" y1="0" x2="0" y2="6" />
              <line x1="24" y1="0" x2="0" y2="6" />
            </g>
            <g stroke="#8b5cf6" strokeWidth="0.8">
              <line x1="-12" y1="-11" x2="12" y2="-11" />
            </g>
            <g fill="#c084fc">
              <circle cx="-12" cy="-18" r="0.7" />
              <circle cx="12" cy="-18" r="0.7" />
              <circle cx="-12" cy="-4" r="0.7" />
              <circle cx="12" cy="-4" r="0.7" />
              <circle cx="0" cy="-16" r="0.7" />
              <circle cx="-12" cy="9" r="0.7" />
              <circle cx="12" cy="9" r="0.7" />
            </g>
            {/* Purple Slit Visor */}
            <polygon points="0,-18 6,-8 0,-4 -6,-8" fill="url(#visor-grad-spectre)" stroke="#e9d5ff" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: ORION SURVEYOR (OR-300 Deep Space Scout)           */}
        {/* ========================================================= */}
        {modelId === 'orion' && (
          <g>
            {/* 1. Heavy Structural Inter-Boom Trusses (Fuselage to Booms) */}
            <g stroke="#475569" strokeWidth="1.6" strokeLinecap="round">
              {/* Upper Horizontal & Diagonal Girders */}
              <line x1="-14" y1="-2" x2="-18" y2="-2" />
              <line x1="-14" y1="-2" x2="-18" y2="5" />
              <line x1="-14" y1="5" x2="-18" y2="-2" />
              <line x1="14" y1="-2" x2="18" y2="-2" />
              <line x1="14" y1="-2" x2="18" y2="5" />
              <line x1="14" y1="5" x2="18" y2="-2" />
              {/* Lower Diagonal Girders (angled to booms, no horizontal bar at gear root) */}
              <line x1="-14" y1="5" x2="-18" y2="11" />
              <line x1="14" y1="5" x2="18" y2="11" />
            </g>

            {/* 2. Telescopic Articulated Landing Gear */}
            {/* Outer Oleo Cylinders */}
            <g stroke="#64748b" strokeWidth="2.4" strokeLinecap="round">
              <line x1="-15" y1="10" x2="-27" y2="28" />
              <line x1="15" y1="10" x2="27" y2="28" />
            </g>
            {/* Chrome Piston Shafts */}
            <g stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round">
              <line x1="-22" y1="19" x2="-27" y2="28" />
              <line x1="22" y1="19" x2="27" y2="28" />
            </g>
            {/* Articulated Knuckle Joints */}
            <circle cx="-27" cy="28" r="2.2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.1" />
            <circle cx="27" cy="28" r="2.2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.1" />
            {/* Heavy-Duty Surveyor Footpads */}
            <rect x="-33" y="27" width="12" height="3.6" rx="1.2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.3" />
            <rect x="21" y="27" width="12" height="3.6" rx="1.2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.3" />
            <line x1="-30" y1="30" x2="-24" y2="30" stroke="#0f172a" strokeWidth="0.9" />
            <line x1="24" y1="30" x2="30" y2="30" stroke="#0f172a" strokeWidth="0.9" />
            <circle cx="-27" cy="28.8" r="0.9" fill="#38bdf8" />
            <circle cx="27" cy="28.8" r="0.9" fill="#38bdf8" />

            {/* 3. Port Science Boom (Subsurface Radar / High-Gain Parabolic Dish) */}
            {/* Outer Radiator Fins */}
            <g stroke="#0284c7" strokeWidth="0.8">
              <line x1="-26" y1="-3" x2="-29" y2="-3" />
              <line x1="-26" y1="3" x2="-29" y2="3" />
              <line x1="-26" y1="9" x2="-29" y2="9" />
            </g>
            {/* Port Boom Structural Housing */}
            <rect x="-26" y="-8" width="8" height="24" rx="2" fill="url(#titanium-plate)" stroke="#38bdf8" strokeWidth="1.4" />
            {/* Panel Seams */}
            <g stroke="#0284c7" strokeWidth="0.7">
              <line x1="-26" y1="-1" x2="-18" y2="-1" />
              <line x1="-26" y1="6" x2="-18" y2="6" />
              <line x1="-26" y1="12" x2="-18" y2="12" />
            </g>
            {/* Precision Micro-Rivets */}
            <g fill="#bae6fd">
              <circle cx="-24.5" cy="-5" r="0.65" />
              <circle cx="-19.5" cy="-5" r="0.65" />
              <circle cx="-24.5" cy="2.5" r="0.65" />
              <circle cx="-19.5" cy="2.5" r="0.65" />
              <circle cx="-24.5" cy="9" r="0.65" />
              <circle cx="-19.5" cy="9" r="0.65" />
              <circle cx="-24.5" cy="14" r="0.65" />
              <circle cx="-19.5" cy="14" r="0.65" />
            </g>
            {/* High-Gain Parabolic Deep Space Dish */}
            <line x1="-22" y1="-8" x2="-22" y2="-16" stroke="#94a3b8" strokeWidth="1.6" />
            <circle cx="-22" cy="-8" r="1.8" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.9" />
            {/* Parabolic Reflector Path */}
            <path d="M -26.5,-14.5 Q -22,-22.5 -17.5,-14.5" fill="rgba(186, 230, 253, 0.25)" stroke="#38bdf8" strokeWidth="1.8" />
            {/* Feed Horn Struts & Emitter */}
            <line x1="-26" y1="-14.5" x2="-22" y2="-21" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-18" y1="-14.5" x2="-22" y2="-21" stroke="#94a3b8" strokeWidth="0.8" />
            <circle cx="-22" cy="-21" r="1.3" fill="#38bdf8" />
            <circle cx="-22" cy="-21" r="0.6" fill="#ffffff" />

            {/* 4. Starboard Science Boom (Multi-Spectral Spectrometer & Magnetometer) */}
            {/* Outer Radiator Fins */}
            <g stroke="#0284c7" strokeWidth="0.8">
              <line x1="26" y1="-3" x2="29" y2="-3" />
              <line x1="26" y1="3" x2="29" y2="3" />
              <line x1="26" y1="9" x2="29" y2="9" />
            </g>
            {/* Starboard Boom Structural Housing */}
            <rect x="18" y="-8" width="8" height="24" rx="2" fill="url(#titanium-plate)" stroke="#38bdf8" strokeWidth="1.4" />
            {/* Panel Seams */}
            <g stroke="#0284c7" strokeWidth="0.7">
              <line x1="18" y1="-1" x2="26" y2="-1" />
              <line x1="18" y1="6" x2="26" y2="6" />
              <line x1="18" y1="12" x2="26" y2="12" />
            </g>
            {/* Precision Micro-Rivets */}
            <g fill="#bae6fd">
              <circle cx="19.5" cy="-5" r="0.65" />
              <circle cx="24.5" cy="-5" r="0.65" />
              <circle cx="19.5" cy="2.5" r="0.65" />
              <circle cx="24.5" cy="2.5" r="0.65" />
              <circle cx="19.5" cy="9" r="0.65" />
              <circle cx="24.5" cy="9" r="0.65" />
              <circle cx="19.5" cy="14" r="0.65" />
              <circle cx="24.5" cy="14" r="0.65" />
            </g>
            {/* Spectrometer Sensor Turret & Multi-Spectral Lens */}
            <circle cx="22" cy="-10" r="4.2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="22" cy="-10" r="3.2" fill="url(#xenon-tank-grad)" />
            <circle cx="21" cy="-11.2" r="0.9" fill="#ffffff" opacity="0.85" />
            {/* Forward Magnetometer / RF Sensor Mast */}
            <line x1="22" y1="-14" x2="22" y2="-26" stroke="#94a3b8" strokeWidth="1.4" />
            <line x1="19" y1="-26" x2="25" y2="-26" stroke="#38bdf8" strokeWidth="0.9" />
            <line x1="22" y1="-23" x2="22" y2="-29" stroke="#38bdf8" strokeWidth="0.9" />
            <circle cx="22" cy="-26" r="1.2" fill="#38bdf8" />

            {/* 5. Spherical Xenon Propellant Tanks */}
            <circle cx="-10" cy="8" r="5.5" fill="url(#xenon-tank-grad)" stroke="#0284c7" strokeWidth="1.1" />
            <path d="M -15,7.2 A 5.5 5.5 0 0 1 -5,7.2" fill="none" stroke="#0f172a" strokeWidth="1.2" />
            <rect x="-11" y="7.2" width="2" height="1.6" fill="#38bdf8" />

            <circle cx="10" cy="8" r="5.5" fill="url(#xenon-tank-grad)" stroke="#0284c7" strokeWidth="1.1" />
            <path d="M 5,7.2 A 5.5 5.5 0 0 1 15,7.2" fill="none" stroke="#0f172a" strokeWidth="1.2" />
            <rect x="9" y="7.2" width="2" height="1.6" fill="#38bdf8" />

            <line x1="-5.5" y1="9" x2="-2" y2="12" stroke="#38bdf8" strokeWidth="0.8" />
            <line x1="5.5" y1="9" x2="2" y2="12" stroke="#38bdf8" strokeWidth="0.8" />

            {/* 6. Main Surveyor Command Fuselage */}
            <polygon
              points="0,-34 14,-14 15,17 11,18 7,18 0,13 -7,18 -11,18 -15,17 -14,-14"
              fill="url(#hull-grad-orion)"
              stroke="#38bdf8"
              strokeWidth="1.7"
            />
            {/* Longitudinal Keel Seam & Structural Bulkhead Lines */}
            <g stroke="#0284c7" strokeWidth="0.8">
              <line x1="0" y1="-34" x2="0" y2="13" />
              <line x1="-11" y1="-8" x2="11" y2="-8" />
            </g>
            {/* Hull Facet Lines */}
            <g stroke="#38bdf8" strokeWidth="0.8" opacity="0.45">
              <polyline points="0,-34 -8,-14 -8,18" />
              <polyline points="0,-34 8,-14 8,18" />
            </g>
            {/* Fuselage Rivet Detailing */}
            <g fill="#bae6fd">
              <circle cx="-13" cy="-22" r="0.65" />
              <circle cx="13" cy="-22" r="0.65" />
              <circle cx="-13" cy="-16" r="0.65" />
              <circle cx="13" cy="-16" r="0.65" />
              <circle cx="-13" cy="-6" r="0.65" />
              <circle cx="13" cy="-6" r="0.65" />
              <circle cx="-13" cy="-1" r="0.65" />
              <circle cx="13" cy="-1" r="0.65" />
              <circle cx="-13" cy="5" r="0.65" />
              <circle cx="13" cy="5" r="0.65" />
              <circle cx="-13" cy="8" r="0.65" />
              <circle cx="13" cy="8" r="0.65" />
              <circle cx="-13" cy="14" r="0.65" />
              <circle cx="13" cy="14" r="0.65" />
            </g>

            {/* 7. Panoramic Surveyor Visor & Cupola */}
            <ellipse cx="0" cy="-14" rx="7.5" ry="5.5" fill="url(#visor-grad-orion)" stroke="#bae6fd" strokeWidth="1.3" />
            {/* Window Mullions */}
            <line x1="0" y1="-19.5" x2="0" y2="-8.5" stroke="#0f172a" strokeWidth="0.9" />
            <line x1="-6.5" y1="-14" x2="6.5" y2="-14" stroke="#0f172a" strokeWidth="0.9" />
            {/* Visor Frame Perimeter Rivets */}
            <g fill="#e0f2fe">
              <circle cx="-6" cy="-19" r="0.55" />
              <circle cx="-3" cy="-19" r="0.55" />
              <circle cx="0" cy="-19" r="0.55" />
              <circle cx="3" cy="-19" r="0.55" />
              <circle cx="6" cy="-19" r="0.55" />
              <circle cx="-6" cy="-9" r="0.55" />
              <circle cx="-3" cy="-9" r="0.55" />
              <circle cx="0" cy="-9" r="0.55" />
              <circle cx="3" cy="-9" r="0.55" />
              <circle cx="6" cy="-9" r="0.55" />
            </g>
            {/* Glass Specular Gloss Arc */}
            <ellipse cx="-2.8" cy="-16" rx="2.8" ry="1.4" transform="rotate(-15 -2.8 -16)" fill="#ffffff" opacity="0.85" />

            {/* 8. Dual MPD Vector Thruster Nozzles */}
            {/* Left Nozzle */}
            <polygon points="-13.5,18 -7.5,18 -6,24 -15,24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.1" />
            <ellipse cx="-10.5" cy="23.5" rx="3.5" ry="1.2" fill="#38bdf8" />
            <ellipse cx="-10.5" cy="23.5" rx="1.8" ry="0.7" fill="#ffffff" />
            <line x1="-14.5" y1="18" x2="-14.5" y2="22" stroke="#64748b" strokeWidth="0.9" />
            {/* Right Nozzle */}
            <polygon points="7.5,18 13.5,18 15,24 6,24" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.1" />
            <ellipse cx="10.5" cy="23.5" rx="3.5" ry="1.2" fill="#38bdf8" />
            <ellipse cx="10.5" cy="23.5" rx="1.8" ry="0.7" fill="#ffffff" />
            <line x1="14.5" y1="18" x2="14.5" y2="22" stroke="#64748b" strokeWidth="0.9" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: VALKYRIE TACTICAL (VK-55 Armored Dropship)         */}
        {/* ========================================================= */}
        {modelId === 'valkyrie' && (
          <g>
            {/* 1. Heavy Tactical Landing Gear Assembly (Engineered for Vertical Landing) */}
            {/* Primary Hydraulic Oleo Struts */}
            <g stroke="#334155" strokeWidth="2.8" strokeLinecap="round">
              <line x1="-18" y1="9" x2="-29" y2="28.5" />
              <line x1="18" y1="9" x2="29" y2="28.5" />
            </g>
            {/* Polished Chrome Inner Telescopic Pistons */}
            <g stroke="#e2e8f0" strokeWidth="1.6" strokeLinecap="round">
              <line x1="-24" y1="21" x2="-29" y2="28.5" />
              <line x1="24" y1="21" x2="29" y2="28.5" />
            </g>
            {/* A-Frame Retraction Braces / Scissor Links */}
            <g stroke="#475569" strokeWidth="1.3" strokeLinecap="round">
              <line x1="-10" y1="16" x2="-23" y2="26" />
              <line x1="10" y1="16" x2="23" y2="26" />
            </g>
            {/* Knuckle Pivot Joints */}
            <circle cx="-29" cy="28.5" r="2.5" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="-29" cy="28.5" r="1.0" fill="#94a3b8" />
            <circle cx="29" cy="28.5" r="2.5" fill="#0f172a" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="29" cy="28.5" r="1.0" fill="#94a3b8" />

            {/* Heavy Armored Footpads with Hazard Striping & Ground Cleats */}
            {/* Port Footpad */}
            <rect x="-35" y="27.6" width="12" height="3.6" rx="1.2" fill="#0f172a" stroke="#ef4444" strokeWidth="1.4" />
            <line x1="-32" y1="28" x2="-30" y2="30.4" stroke="#f59e0b" strokeWidth="1.0" />
            <line x1="-28" y1="28" x2="-26" y2="30.4" stroke="#f59e0b" strokeWidth="1.0" />
            <line x1="-34" y1="31" x2="-24" y2="31" stroke="#475569" strokeWidth="1.0" />

            {/* Starboard Footpad */}
            <rect x="23" y="27.6" width="12" height="3.6" rx="1.2" fill="#0f172a" stroke="#ef4444" strokeWidth="1.4" />
            <line x1="26" y1="28" x2="28" y2="30.4" stroke="#f59e0b" strokeWidth="1.0" />
            <line x1="30" y1="28" x2="32" y2="30.4" stroke="#f59e0b" strokeWidth="1.0" />
            <line x1="24" y1="31" x2="34" y2="31" stroke="#475569" strokeWidth="1.0" />

            {/* 2. Heavy Downward-Firing Methalox VTOL Thrusters (Conical Flared Bells) */}
            <g fill="#090d16" stroke="#475569" strokeWidth="1.1" strokeLinejoin="round">
              <polygon points="-17,18 -11,18 -9,26 -19,26" />
              <polygon points="-9,18 -3,18 -2,25 -10,25" />
              <polygon points="3,18 9,18 10,25 2,25" />
              <polygon points="11,18 17,18 19,26 9,26" />
            </g>
            {/* Gimbal Actuator Collars */}
            <g stroke="#94a3b8" strokeWidth="0.9">
              <line x1="-16" y1="20" x2="-12" y2="20" />
              <line x1="-8" y1="20" x2="-4" y2="20" />
              <line x1="4" y1="20" x2="8" y2="20" />
              <line x1="12" y1="20" x2="16" y2="20" />
            </g>
            {/* Copper Thermal Expansion Lips */}
            <g stroke="#d97706" strokeWidth="1.2">
              <line x1="-19" y1="25.5" x2="-9" y2="25.5" />
              <line x1="-10" y1="24.5" x2="-2" y2="24.5" />
              <line x1="2" y1="24.5" x2="10" y2="24.5" />
              <line x1="9" y1="25.5" x2="19" y2="25.5" />
            </g>
            {/* Throat Pre-Ignition Glow */}
            <circle cx="-14" cy="22" r="1.8" fill="#ef4444" opacity="0.65" />
            <circle cx="-6" cy="21.5" r="1.5" fill="#ef4444" opacity="0.65" />
            <circle cx="6" cy="21.5" r="1.5" fill="#ef4444" opacity="0.65" />
            <circle cx="14" cy="22" r="1.8" fill="#ef4444" opacity="0.65" />

            {/* 3. Heavy Armored Dropship Fuselage & Crew Pod Chassis */}
            <polygon
              points="0,-29 9,-27 14,-14 26,-4 27,8 21,17 17,18 0,17 -17,18 -21,17 -27,8 -26,-4 -14,-14 -9,-27"
              fill="url(#valkyrie-hull-grad)"
              stroke="#ef4444"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            {/* Upper Hoisting Crane Recovery Shackles */}
            <path d="M-9,-27 A2 2 0 0 1 -5,-27" stroke="#94a3b8" strokeWidth="1.2" fill="none" />
            <path d="M5,-27 A2 2 0 0 1 9,-27" stroke="#94a3b8" strokeWidth="1.2" fill="none" />

            {/* Dorsal Comms Blade Antenna & Telemetry Mast */}
            <line x1="0" y1="-29" x2="0" y2="-37" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="-2" y1="-34" x2="2" y2="-34" stroke="#94a3b8" strokeWidth="1.2" />
            <circle cx="0" cy="-37" r="1.2" fill="#38bdf8">
              <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
            </circle>

            {/* Armor Bulkhead Seams & Reinforcement Ribs */}
            <g stroke="#334155" strokeWidth="1.0">
              <line x1="-14" y1="-14" x2="14" y2="-14" />
              <line x1="-26" y1="-4" x2="26" y2="-4" />
              <line x1="-21" y1="17" x2="21" y2="17" />
              <line x1="-14" y1="-14" x2="-26" y2="-4" />
              <line x1="14" y1="-14" x2="26" y2="-4" />
            </g>

            {/* Structural Rivet Fasteners */}
            {[-2, 4, 10].map((ry, idx) => (
              <g key={idx} fill="#94a3b8">
                <circle cx="-24.5" cy={ry} r="0.65" />
                <circle cx="24.5" cy={ry} r="0.65" />
              </g>
            ))}

            {/* 4. Sponson Hardware: High-Pressure Propellant Spheres & Radiator Louvers */}
            {/* Spherical Methalox Tanks */}
            <circle cx="-18" cy="4" r="4.2" fill="url(#xenon-tank-grad)" stroke="#ef4444" strokeWidth="1.0" />
            <line x1="-22.2" y1="4" x2="-13.8" y2="4" stroke="#0f172a" strokeWidth="1.4" />
            <circle cx="18" cy="4" r="4.2" fill="url(#xenon-tank-grad)" stroke="#ef4444" strokeWidth="1.0" />
            <line x1="13.8" y1="4" x2="22.2" y2="4" stroke="#0f172a" strokeWidth="1.4" />

            {/* Braided Propellant Feed Lines */}
            <line x1="-18" y1="8.2" x2="-15" y2="18" stroke="#cbd5e1" strokeWidth="1.1" />
            <line x1="18" y1="8.2" x2="15" y2="18" stroke="#cbd5e1" strokeWidth="1.1" />

            {/* Radiator Cooling Louvers on Sponson Outer Flanks */}
            <rect x="-26" y="0" width="3.2" height="9" rx="0.6" fill="#090d16" stroke="#b91c1c" strokeWidth="0.8" />
            <rect x="22.8" y="0" width="3.2" height="9" rx="0.6" fill="#090d16" stroke="#b91c1c" strokeWidth="0.8" />
            {/* Thermal Slots */}
            <g stroke="#ea580c" strokeWidth="0.8">
              <line x1="-25.5" y1="2.5" x2="-23.5" y2="2.5" />
              <line x1="-25.5" y1="5" x2="-23.5" y2="5" />
              <line x1="-25.5" y1="7.5" x2="-23.5" y2="7.5" />
              <line x1="23.3" y1="2.5" x2="25.3" y2="2.5" />
              <line x1="23.3" y1="5" x2="25.3" y2="5" />
              <line x1="23.3" y1="7.5" x2="25.3" y2="7.5" />
            </g>

            {/* RCS Attitude Control Quad Blocks */}
            <rect x="-27.5" y="-4.5" width="3.0" height="3.0" fill="#090d16" stroke="#ef4444" strokeWidth="0.8" />
            <line x1="-26" y1="-4.5" x2="-26" y2="-6.5" stroke="#f87171" strokeWidth="0.7" />
            <line x1="-27.5" y1="-3" x2="-29.5" y2="-3" stroke="#f87171" strokeWidth="0.7" />
            <rect x="24.5" y="-4.5" width="3.0" height="3.0" fill="#090d16" stroke="#ef4444" strokeWidth="0.8" />
            <line x1="26" y1="-4.5" x2="26" y2="-6.5" stroke="#f87171" strokeWidth="0.7" />
            <line x1="27.5" y1="-3" x2="29.5" y2="-3" stroke="#f87171" strokeWidth="0.7" />

            {/* 5. Central Armored Personnel/Cargo Hatch Door & Tactical Markings */}
            <rect x="-7" y="-2" width="14" height="17" rx="1.2" fill="#1e293b" stroke="#ef4444" strokeWidth="1.2" />
            {/* Red Delta Combat Insignia */}
            <polygon points="0,1 2.8,4 -2.8,4" fill="#ef4444" />
            {/* Retro Stenciled VK-55 */}
            <text
              x="0"
              y="8"
              fill="#f8fafc"
              fontSize="3.8"
              fontFamily="Courier New, monospace"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              VK-55
            </text>
            {/* Threshold Hazard Warning Chevrons */}
            <g stroke="#f59e0b" strokeWidth="1.0">
              <line x1="-5.5" y1="12" x2="-3.5" y2="14" />
              <line x1="-2.5" y1="12" x2="-0.5" y2="14" />
              <line x1="0.5" y1="12" x2="2.5" y2="14" />
              <line x1="3.5" y1="12" x2="5.5" y2="14" />
            </g>

            {/* 6. Tactical Downward-Angled Cockpit Canopy & Landing CRT HUD */}
            <polygon
              points="0,-26 6.5,-21 5.5,-14 -5.5,-14 -6.5,-21"
              fill="#090d16"
              stroke="#f87171"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon
              points="0,-24.5 5.0,-20 4.2,-15 -4.2,-15 -5.0,-20"
              fill="url(#visor-grad-valkyrie)"
              stroke="#fca5a5"
              strokeWidth="0.8"
              strokeLinejoin="round"
            />

            {/* Tactical CRT HUD Reticle */}
            <g stroke="#38bdf8" strokeWidth="0.6" opacity="0.9">
              <line x1="-2.5" y1="-18" x2="2.5" y2="-18" />
              <line x1="0" y1="-20.5" x2="0" y2="-15.5" />
              <line x1="-1.6" y1="-21.5" x2="1.6" y2="-21.5" />
            </g>
            <circle cx="0" cy="-18" r="1.8" fill="none" stroke="#fef08a" strokeWidth="0.55" opacity="0.8" />
            {/* Specular Glare */}
            <polygon points="-0.8,-24 2.2,-19 1.2,-19 -2,-24" fill="#ffffff" opacity="0.55" />

            {/* 7. Forward Ground Landing Searchlights */}
            <g>
              {/* Port Floodlight */}
              <circle cx="-4.5" cy="-11" r="1.8" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              <circle cx="-4.5" cy="-11" r="1.2" fill="#fef08a" />
              <circle cx="-4.5" cy="-11" r="0.6" fill="#ffffff" />
              {/* Starboard Floodlight */}
              <circle cx="4.5" cy="-11" r="1.8" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.8" />
              <circle cx="4.5" cy="-11" r="1.2" fill="#fef08a" />
              <circle cx="4.5" cy="-11" r="0.6" fill="#ffffff" />
              {/* Downward Light Beams */}
              <polygon points="-5.5,-9 -12,16 1,16 -3.5,-9" fill="#fef08a" opacity="0.2" />
              <polygon points="3.5,-9 -1,16 12,16 5.5,-9" fill="#fef08a" opacity="0.2" />
            </g>

            {/* 8. Blinking Retro Navigation Strobes & Anti-Collision Beacon */}
            {/* Port Red Navigation Strobe */}
            <circle cx="-27" cy="2" r="1.9" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="-27" cy="2" r="6" fill="#ef4444" opacity="0.3">
              <animate attributeName="opacity" values="0.9;0.1;0.9;0.1;0.05;0.05" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="-27" cy="2" r="1.5" fill="#ffffff">
              <animate attributeName="opacity" values="1;0.4;1;0.4;0.2;0.2" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="-27" cy="2" r="1.1" fill="#ef4444" />

            {/* Starboard Green Navigation Strobe */}
            <circle cx="27" cy="2" r="1.9" fill="#0f172a" stroke="#64748b" strokeWidth="0.8" />
            <circle cx="27" cy="2" r="6" fill="#10b981" opacity="0.3">
              <animate attributeName="opacity" values="0.9;0.1;0.9;0.1;0.05;0.05" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="2" r="1.5" fill="#ffffff">
              <animate attributeName="opacity" values="1;0.4;1;0.4;0.2;0.2" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="2" r="1.1" fill="#10b981" />

            {/* Dorsal Amber Anti-Collision Beacon (Cabin Roof) */}
            <circle cx="0" cy="-27" r="1.8" fill="#090d16" stroke="#f59e0b" strokeWidth="0.8" />
            <circle cx="0" cy="-27" r="4.5" fill="#f59e0b" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.9;0.2;0.2" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="-27" r="1.1" fill="#fef08a">
              <animate attributeName="opacity" values="0.4;1;0.4;0.4" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: JUGGERNAUT LIFTER (JG-1200 Heavy Rover Carrier)    */}
        {/* ========================================================= */}
        {modelId === 'juggernaut' && (
          <g>
            <g stroke="#475569" strokeWidth="3" strokeLinecap="round">
              <line x1="-30" y1="14" x2="-38" y2="34" />
              <line x1="30" y1="14" x2="38" y2="34" />
            </g>
            <rect x="-42" y="33" width="12" height="4.5" rx="1.5" fill="#10b981" stroke="#047857" strokeWidth="1.2" />
            <rect x="30" y="33" width="12" height="4.5" rx="1.5" fill="#10b981" stroke="#047857" strokeWidth="1.2" />

            {/* Massive Heavy Chassis */}
            <polygon points="0,-38 36,-20 38,22 -38,22 -36,-20" fill="#0f172a" stroke="#10b981" strokeWidth="2.2" />
            {/* Center Vehicle Bay */}
            <rect x="-15" y="-4" width="30" height="24" rx="2" fill="#050b14" stroke="#34d399" strokeWidth="1.2" />
            {/* Hazard lines */}
            <line x1="-12" y1="18" x2="-6" y2="12" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="-2" y1="18" x2="4" y2="12" stroke="#f59e0b" strokeWidth="1.6" />
            <line x1="8" y1="18" x2="14" y2="12" stroke="#f59e0b" strokeWidth="1.6" />

            {/* Emerald Bridge Tower */}
            <polygon points="0,-38 14,-24 14,-6 -14,-6 -14,-24" fill="#1e293b" stroke="#10b981" strokeWidth="1.6" />
            <ellipse cx="0" cy="-26" rx="8" ry="5.5" fill="url(#visor-grad-juggernaut)" stroke="#6ee7b7" strokeWidth="1.2" />
            <ellipse cx="-2.5" cy="-28" rx="3.2" ry="1.5" fill="#ffffff" opacity="0.85" />
          </g>
        )}

        {/* Thruster Flame Animation */}
        {showThrusters && (
          <g>
            <polygon
              points="-18,24 -14,37 -10,24"
              fill="url(#thruster-flame)"
              opacity="0.9"
            />
            <polygon
              points="10,24 14,37 18,24"
              fill="url(#thruster-flame)"
              opacity="0.9"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
