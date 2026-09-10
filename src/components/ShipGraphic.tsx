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
  size,
  className = '',
  showThrusters = false,
  showGlow = true,
}) => {
  const modelId = ship.id;
  const isEagle = modelId === 'eagle';
  const viewBox = isEagle ? '-72 -24 144 52' : '-40 -40 80 80';

  const effectiveSize = size === undefined && !className ? 56 : size;
  const sizeStyle = effectiveSize
    ? {
        width: effectiveSize,
        height: isEagle ? Math.round(effectiveSize * (52 / 144)) : effectiveSize,
      }
    : undefined;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={sizeStyle}
    >
      {/* Background Soft Thruster/Accent Glow */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-2xl blur-lg opacity-40 pointer-events-none transition-all duration-300 group-hover:opacity-80 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle, ${ship.accentColor} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      {/* High-Fidelity SVG Craft Render */}
      <svg
        viewBox={viewBox}
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] relative z-10 overflow-visible"
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

          {/* Nutcracker Miner Shaders */}
          <linearGradient id="nutcracker-drill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5a493d" />
            <stop offset="35%" stopColor="#756050" />
            <stop offset="75%" stopColor="#45372d" />
            <stop offset="100%" stopColor="#2e241c" />
          </linearGradient>

          <linearGradient id="nutcracker-collar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#caa66e" />
            <stop offset="50%" stopColor="#ebd19d" />
            <stop offset="100%" stopColor="#8a6b3b" />
          </linearGradient>

          <linearGradient id="nutcracker-chisel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8f7762" />
            <stop offset="100%" stopColor="#5c4837" />
          </linearGradient>

          <linearGradient id="nutcracker-spotlight" x1="0%" y1="0%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="nutcracker-glass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Nautilus Vector Shaders */}
          <linearGradient id="nautilus-hull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="nautilus-visor" x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="nautilus-cowl" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="nautilus-engine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Eagle Transporter Shaders */}
          <linearGradient id="eagle-pod" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="eagle-bell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="35%" stopColor="#334155" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <radialGradient id="eagle-tank" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#f1f5f9" />
            <stop offset="80%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </radialGradient>

          <linearGradient id="eagle-beak" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#f8fafc" />
            <stop offset="80%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Mammoth Rig Industrial Mining Shaders & Patterns */}
          <pattern id="mammoth-hazard" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="4" height="8" fill="#eab308" />
            <rect x="4" y="0" width="4" height="8" fill="#0f172a" />
          </pattern>

          <linearGradient id="mammoth-refinery-column" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="25%" stopColor="#475569" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="mammoth-sight-tube" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="35%" stopColor="#10b981" />
            <stop offset="70%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="mammoth-piston" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="40%" stopColor="#f8fafc" />
            <stop offset="80%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="mammoth-floodlight-beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#fef08a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="mammoth-titanium-heat" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="25%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#1e293b" />
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
        {/* MODEL: MAMMOTH RIG (MR-700 Excavator Mobile Base Carrier) */}
        {/* ========================================================= */}
        {modelId === 'mammoth' && (
          <g>
            {/* 0. Downward Volumetric Halogen Floodlight Cones (Background Layer) */}
            <polygon
              points="18,-33 6,38 30,38"
              fill="url(#mammoth-floodlight-beam)"
              pointerEvents="none"
            />
            <polygon
              points="30,-33 18,38 42,38"
              fill="url(#mammoth-floodlight-beam)"
              pointerEvents="none"
            />

            {/* 1. Heavy Asymmetric Propulsion Array (Underchassis) */}
            {/* Port Dual Vectoring Rocket Thrusters */}
            <g>
              {/* Port Outer Thruster */}
              <path
                d="M -31 16 L -27 16 L -25 24 L -33 24 Z"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="1.0"
              />
              <ellipse cx="-29" cy="24" rx="4" ry="1.4" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <ellipse cx="-29" cy="23.5" rx="2.5" ry="0.8" fill="#06b6d4" opacity="0.6" />

              {/* Port Inner Thruster */}
              <path
                d="M -21 16 L -17 16 L -15 24 L -23 24 Z"
                fill="#1e293b"
                stroke="#64748b"
                strokeWidth="1.0"
              />
              <ellipse cx="-19" cy="24" rx="4" ry="1.4" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
              <ellipse cx="-19" cy="23.5" rx="2.5" ry="0.8" fill="#06b6d4" opacity="0.6" />
            </g>

            {/* Starboard Heavy Thermal Primary Thruster Bell */}
            <g>
              <path
                d="M 23 16 L 33 16 L 36 25 L 20 25 Z"
                fill="#0f172a"
                stroke="#64748b"
                strokeWidth="1.2"
              />
              {/* Cooling Rib Channels */}
              <line x1="24.5" y1="17" x2="23" y2="24" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="28" y1="17" x2="28" y2="24.5" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="31.5" y1="17" x2="33" y2="24" stroke="#94a3b8" strokeWidth="0.8" />
              <ellipse cx="28" cy="25" rx="8" ry="2.2" fill="#020617" stroke="#94a3b8" strokeWidth="1.0" />
              <ellipse cx="28" cy="24.5" rx="5.5" ry="1.4" fill="#f59e0b" opacity="0.65" />
            </g>

            {/* 2. Heavy Articulated Mining Outriggers & Suspension (Strictly Isolated Symmetrical Footpads) */}
            {/* Left Outrigger Leg Assembly */}
            <g>
              {/* Main Knuckle Bracket */}
              <circle cx="-32" cy="12" r="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.2" />
              <circle cx="-32" cy="12" r="1.2" fill="#1e293b" />
              {/* Armored Strut */}
              <line x1="-32" y1="13" x2="-38" y2="34" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
              {/* Inner Chrome Hydraulic Cylinder & Spring */}
              <line x1="-22" y1="17" x2="-38" y2="34" stroke="#cbd5e1" strokeWidth="2.0" />
              <line x1="-22" y1="17" x2="-38" y2="34" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="2.5 2" />
              {/* Scissor Torque Bracket */}
              <polygon points="-35,22 -38,26 -33,26" fill="#334155" />

              {/* Left Ground Footpad with Regolith Traction Cleats */}
              <ellipse cx="-38" cy="34" rx="8.5" ry="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.4" />
              <ellipse cx="-38" cy="33.5" rx="6.5" ry="1.8" fill="#eab308" />
              <circle cx="-38" cy="33.5" r="1.2" fill="#451a03" />
              {/* Carbide Traction Teeth */}
              <polygon points="-43,36 -41,38 -40,36" fill="#475569" />
              <polygon points="-39,36 -38,38.5 -37,36" fill="#475569" />
              <polygon points="-36,36 -35,38 -33,36" fill="#475569" />
            </g>

            {/* Right Outrigger Leg Assembly */}
            <g>
              {/* Main Knuckle Bracket */}
              <circle cx="32" cy="12" r="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.2" />
              <circle cx="32" cy="12" r="1.2" fill="#1e293b" />
              {/* Armored Strut */}
              <line x1="32" y1="13" x2="38" y2="34" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
              {/* Inner Chrome Hydraulic Cylinder & Spring */}
              <line x1="22" y1="17" x2="38" y2="34" stroke="#cbd5e1" strokeWidth="2.0" />
              <line x1="22" y1="17" x2="38" y2="34" stroke="#ca8a04" strokeWidth="1.2" strokeDasharray="2.5 2" />
              {/* Scissor Torque Bracket */}
              <polygon points="35,22 38,26 33,26" fill="#334155" />

              {/* Right Ground Footpad with Regolith Traction Cleats */}
              <ellipse cx="38" cy="34" rx="8.5" ry="3.2" fill="#ca8a04" stroke="#713f12" strokeWidth="1.4" />
              <ellipse cx="38" cy="33.5" rx="6.5" ry="1.8" fill="#eab308" />
              <circle cx="38" cy="33.5" r="1.2" fill="#451a03" />
              {/* Carbide Traction Teeth */}
              <polygon points="33,36 35,38 36,36" fill="#475569" />
              <polygon points="37,36 38,38.5 39,36" fill="#475569" />
              <polygon points="40,36 41,38 43,36" fill="#475569" />
            </g>

            {/* 3. Portside Heavy Machinery Housing & Crane Base (x: -38 to -14) */}
            <rect
              x="-38"
              y="-14"
              width="24"
              height="30"
              rx="2.5"
              fill="#1e293b"
              stroke="#ca8a04"
              strokeWidth="1.6"
            />
            {/* Armored Inspection Access Panel */}
            <rect x="-35" y="-10" width="18" height="18" rx="1.5" fill="#0f172a" stroke="#475569" strokeWidth="1.0" />
            <line x1="-33" y1="-5" x2="-28" y2="-5" stroke="#64748b" strokeWidth="1.0" />
            <line x1="-33" y1="-1" x2="-28" y2="-1" stroke="#64748b" strokeWidth="1.0" />
            <line x1="-33" y1="3" x2="-28" y2="3" stroke="#64748b" strokeWidth="1.0" />
            {/* Equipment Safety Hazard Chevron Band */}
            <rect
              x="-38"
              y="10"
              width="24"
              height="5"
              fill="url(#mammoth-hazard)"
              stroke="#eab308"
              strokeWidth="0.8"
            />
            {/* Turntable Slew Ring Turret */}
            <ellipse cx="-28" cy="-14" rx="6" ry="2.2" fill="#334155" stroke="#eab308" strokeWidth="1.2" />
            <circle cx="-28" cy="-14" r="1.6" fill="#facc15" />

            {/* 4. Articulated Lattice Box-Girder Crane Boom & Hydraulic Lift Rams */}
            {/* Hydraulic Lift Cylinder (Lower) */}
            <line x1="-24" y1="-13" x2="-32" y2="-22" stroke="#eab308" strokeWidth="3.2" strokeLinecap="round" />
            <line x1="-24" y1="-13" x2="-32" y2="-22" stroke="#f8fafc" strokeWidth="1.4" strokeLinecap="round" />
            {/* Main Upper and Lower Boom Chords */}
            <line x1="-28" y1="-14" x2="-37" y2="-34" stroke="#eab308" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="-23" y1="-12" x2="-35" y2="-32" stroke="#eab308" strokeWidth="2.0" strokeLinecap="round" />
            {/* Diagonal Lattice Bracing */}
            <g stroke="#ca8a04" strokeWidth="1.2">
              <line x1="-27" y1="-16" x2="-24" y2="-14" />
              <line x1="-24" y1="-14" x2="-29" y2="-21" />
              <line x1="-29" y1="-21" x2="-26" y2="-18" />
              <line x1="-26" y1="-18" x2="-32" y2="-26" />
              <line x1="-32" y1="-26" x2="-29" y2="-24" />
              <line x1="-29" y1="-24" x2="-35" y2="-31" />
            </g>
            {/* Boom Tip Sheave Pulley Wheels */}
            <circle cx="-37" cy="-34" r="2.8" fill="#ca8a04" stroke="#713f12" strokeWidth="1.0" />
            <circle cx="-37" cy="-34" r="1.2" fill="#facc15" />

            {/* 5. Hanging Steel Hoist Cable & Magnetic Core Grabber / Ore Extractor (ORIGINAL FEATURE) */}
            {/* Braided Steel Hoist Cable */}
            <line x1="-37" y1="-34" x2="-36" y2="-18" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 1" />
            {/* Cable Guide Shackle */}
            <circle cx="-36" cy="-18" r="1.4" fill="#ca8a04" stroke="#713f12" strokeWidth="0.8" />
            {/* Magnetic Core Extractor Housing */}
            <g>
              <rect x="-39.5" y="-17" width="7" height="6.5" rx="1.2" fill="#0f172a" stroke="#eab308" strokeWidth="1.2" />
              {/* Glowing Subsurface Core Sensor (Amber) */}
              <circle cx="-36" cy="-13.8" r="2.0" fill="#f59e0b" />
              <circle cx="-36" cy="-13.8" r="1.0" fill="#fef08a" />
              {/* Articulated Tungsten Grabber Claws */}
              <path
                d="M -39.5 -12.5 L -42 -9 L -41 -7"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M -32.5 -12.5 L -30 -9 L -31 -7"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M -37 -10.5 L -37.5 -7"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M -35 -10.5 L -34.5 -7"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </g>

            {/* 6. Center Ultra-Wide Mining Vehicle Cargo Bay (x: -14 to +14) */}
            {/* Bay Interior Recess */}
            <rect
              x="-14"
              y="-10"
              width="28"
              height="25"
              rx="1.5"
              fill="#090d16"
              stroke="#ca8a04"
              strokeWidth="1.4"
            />
            {/* Overhead Heavy Gantry Monorail & Trolley Hoist */}
            <rect x="-13" y="-9" width="26" height="2.5" fill="#eab308" stroke="#854d0e" strokeWidth="0.6" />
            <rect x="-3" y="-8" width="6" height="2" rx="0.5" fill="#334155" />
            <circle cx="0" cy="-6" r="0.8" fill="#facc15" />

            {/* Onboard 6-Wheeled Deep-Core Exploration Crawler */}
            <g>
              {/* Rover Armored Chassis */}
              <rect x="-10" y="3" width="20" height="7.5" rx="1.8" fill="#1e293b" stroke="#eab308" strokeWidth="1.0" />
              {/* Rover Angled Cab & Amber Cockpit */}
              <polygon points="1,3 7,3 9,0 3,0" fill="#f59e0b" stroke="#ca8a04" strokeWidth="0.8" />
              <polygon points="2,2.5 6,2.5 7.5,0.8 3.5,0.8" fill="#fef08a" opacity="0.8" />
              {/* Dual Illuminated Forward Headlights */}
              <circle cx="8" cy="5" r="1.2" fill="#ffffff" />
              <ellipse cx="10" cy="5" rx="2" ry="1.2" fill="#fef08a" opacity="0.6" />
              {/* Roof Comms Beacon */}
              <circle cx="4" cy="-1.5" r="1.0" fill="#ef4444" />
              {/* 6 Heavy All-Terrain Crawler Wheels with Rims */}
              <circle cx="-7.5" cy="11.5" r="2.8" fill="#0f172a" stroke="#475569" strokeWidth="1.0" />
              <circle cx="-7.5" cy="11.5" r="1.2" fill="#ca8a04" />
              <circle cx="0" cy="11.5" r="2.8" fill="#0f172a" stroke="#475569" strokeWidth="1.0" />
              <circle cx="0" cy="11.5" r="1.2" fill="#ca8a04" />
              <circle cx="7.5" cy="11.5" r="2.8" fill="#0f172a" stroke="#475569" strokeWidth="1.0" />
              <circle cx="7.5" cy="11.5" r="1.2" fill="#ca8a04" />
            </g>

            {/* 7. Drop-Down Hydraulic Mining Ramp Threshold with Hazard Chevron Band */}
            <rect
              x="-14"
              y="13"
              width="28"
              height="3.5"
              fill="url(#mammoth-hazard)"
              stroke="#eab308"
              strokeWidth="0.8"
            />
            {/* Hydraulic Ramp Lift Actuators */}
            <line x1="-13" y1="13" x2="-23" y2="22" stroke="#ca8a04" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="-13" y1="13" x2="-23" y2="22" stroke="#f8fafc" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="-23" cy="22" r="1.8" fill="#facc15" />

            {/* 8. Starboard Catalytic Refinery Columns & Sight-Glass (x: 14 to 38) */}
            {/* Main Primary High-Pressure Cracking Cylinder */}
            <rect
              x="17"
              y="-18"
              width="11"
              height="33"
              rx="2.5"
              fill="url(#mammoth-refinery-column)"
              stroke="#64748b"
              strokeWidth="1.2"
            />
            {/* Secondary Fractionating Column */}
            <rect
              x="28"
              y="-14"
              width="9"
              height="29"
              rx="2.0"
              fill="url(#mammoth-refinery-column)"
              stroke="#64748b"
              strokeWidth="1.0"
            />
            {/* Structural Reinforcing Band Collars */}
            <line x1="17" y1="-8" x2="37" y2="-8" stroke="#ca8a04" strokeWidth="1.4" />
            <line x1="17" y1="0" x2="37" y2="0" stroke="#ca8a04" strokeWidth="1.4" />
            <line x1="17" y1="8" x2="37" y2="8" stroke="#ca8a04" strokeWidth="1.4" />

            {/* Illuminated Catalytic Fluid Sight-Glass (ORIGINAL FEATURE) */}
            <g>
              {/* Sight-Glass Protective Metal Outer Bezel */}
              <rect x="20.5" y="-12" width="4" height="21" rx="1.5" fill="#0f172a" stroke="#ca8a04" strokeWidth="0.8" />
              {/* Glowing Bio-Catalyst Fluid Tube */}
              <rect x="21.5" y="-11" width="2" height="19" rx="1.0" fill="url(#mammoth-sight-tube)" />
              {/* Volumetric Calibration Graduation Ticks */}
              <line x1="20.8" y1="-7" x2="22" y2="-7" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
              <line x1="20.8" y1="-3" x2="22.4" y2="-3" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              <line x1="20.8" y1="1" x2="22" y2="1" stroke="#ffffff" strokeWidth="0.6" opacity="0.8" />
              <line x1="20.8" y1="5" x2="22.4" y2="5" stroke="#ffffff" strokeWidth="0.8" opacity="0.9" />
              {/* Fluid Meniscus Highlight */}
              <ellipse cx="22.5" cy="-9" rx="1.0" ry="0.6" fill="#a7f3d0" />
            </g>

            {/* High-Pressure Interconnecting Manifold & Valve Handwheel */}
            <path
              d="M 28 -4 L 32 -4 L 32 4 L 28 4"
              fill="none"
              stroke="#d97706"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Brass Valve Handwheel */}
            <circle cx="32" cy="0" r="1.8" fill="#ca8a04" stroke="#713f12" strokeWidth="0.6" />
            <circle cx="32" cy="0" r="0.6" fill="#facc15" />

            {/* Top Scrubber & Titanium Heat-Tint Exhaust Cowl */}
            <g>
              {/* Radiator Cooling Fin Array */}
              <rect x="21" y="-21" width="14" height="3" rx="0.8" fill="#475569" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="24" y1="-21" x2="24" y2="-18" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="28" y1="-21" x2="28" y2="-18" stroke="#1e293b" strokeWidth="0.8" />
              <line x1="32" y1="-21" x2="32" y2="-18" stroke="#1e293b" strokeWidth="0.8" />
              {/* Heat-Treated Titanium Exhaust Stack */}
              <rect x="24" y="-24" width="7" height="3.5" rx="1.0" fill="url(#mammoth-titanium-heat)" stroke="#334155" strokeWidth="0.8" />
              <ellipse cx="27.5" cy="-24" rx="2.5" ry="0.8" fill="#0f172a" />
            </g>

            {/* 9. Starboard Elevated Heavy Equipment Operator Bridge (x: 15 to 35, y: -34 to -21) */}
            <polygon
              points="15,-34 31,-34 35,-21 15,-21"
              fill="#0f172a"
              stroke="#ca8a04"
              strokeWidth="1.6"
            />
            {/* Multi-Pane Crimson Visor */}
            <polygon
              points="16.5,-31 29.5,-31 32.5,-23 16.5,-23"
              fill="url(#visor-grad-mammoth)"
              stroke="#fda4af"
              strokeWidth="1.0"
            />
            {/* Specular Glare Reflection */}
            <polygon points="18,-30 24,-30 22,-24 17.5,-24" fill="#ffffff" opacity="0.85" />

            {/* Heavy Equipment ROPS (Roll-Over Protective Structure) Safety Cage (ORIGINAL FEATURE) */}
            <g stroke="#eab308" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
              {/* Upper Roof Safety Frame */}
              <line x1="14.5" y1="-34.5" x2="31.5" y2="-34.5" />
              {/* Angled A-Pillar Protective Bar */}
              <line x1="31.5" y1="-34.5" x2="35.5" y2="-21" />
              {/* Cab Corner Pillar */}
              <line x1="14.5" y1="-34.5" x2="14.5" y2="-21" />
              {/* Center Reinforcement Bar */}
              <line x1="23" y1="-34.5" x2="23" y2="-21" strokeWidth="1.0" stroke="#ca8a04" />
            </g>

            {/* 10. Dual Roof-Mounted Heavy Halogen Work Floodlights (ORIGINAL FEATURE) */}
            {/* Left Floodlight Pod */}
            <rect x="16.5" y="-36" width="3.5" height="3" rx="0.8" fill="#475569" stroke="#cbd5e1" strokeWidth="0.8" />
            <ellipse cx="18.2" cy="-33" rx="1.6" ry="0.8" fill="#ffffff" stroke="#fef08a" strokeWidth="0.6" />
            {/* Right Floodlight Pod */}
            <rect x="28.5" y="-36" width="3.5" height="3" rx="0.8" fill="#475569" stroke="#cbd5e1" strokeWidth="0.8" />
            <ellipse cx="30.2" cy="-33" rx="1.6" ry="0.8" fill="#ffffff" stroke="#fef08a" strokeWidth="0.6" />

            {/* Starboard Comms Antenna & High-Intensity Amber Safety Strobe Beacon */}
            <line x1="33" y1="-34" x2="33" y2="-40" stroke="#94a3b8" strokeWidth="1.0" />
            <circle cx="33" cy="-40" r="2.8" fill="#f59e0b" opacity="0.4" />
            <circle cx="33" cy="-40" r="1.8" fill="#f59e0b" />
            <circle cx="33" cy="-40" r="0.8" fill="#ffffff" />
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

        {/* ========================================================= */}
        {/* MODEL: NUTCRACKER MINER (EX-920 Heavy Excavator Carrier)  */}
        {/* ========================================================= */}
        {modelId === 'nutcracker' && (
          <g>
            {/* 1. Forward Spotlight Light Cone */}
            <polygon
              points="44,-33 65,5 55,15 44,-31"
              fill="url(#nutcracker-spotlight)"
            />

            {/* 2. Five Articulated Excavator Suspension Footpads (Strictly Isolated Subpaths) */}
            {/* Footpad 1: Rear-Outer (x: -37) */}
            <circle cx="-37" cy="15" r="4.5" fill="#bfa06a" stroke="#4a3826" strokeWidth="1.6" />
            <line x1="-39.5" y1="13" x2="-39.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <line x1="-34.5" y1="13" x2="-34.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <rect x="-41" y="18" width="8" height="8" rx="1.5" fill="#b84538" stroke="#5c1910" strokeWidth="1.4" />
            <line x1="-37" y1="24" x2="-37" y2="31" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="-42.5,30.5 -31.5,30.5 -30,34 -44,34" fill="#9c8265" stroke="#453524" strokeWidth="1.5" />
            <line x1="-39" y1="31" x2="-39" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <line x1="-35" y1="31" x2="-35" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <ellipse cx="-37" cy="30.5" rx="3.2" ry="1.5" fill="#d4b276" />

            {/* Footpad 2: Rear-Inner (x: -23) */}
            <circle cx="-23" cy="15" r="4.5" fill="#bfa06a" stroke="#4a3826" strokeWidth="1.6" />
            <line x1="-25.5" y1="13" x2="-25.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <line x1="-20.5" y1="13" x2="-20.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <rect x="-27" y="18" width="8" height="8" rx="1.5" fill="#b84538" stroke="#5c1910" strokeWidth="1.4" />
            <line x1="-23" y1="24" x2="-23" y2="31" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="-28.5,30.5 -17.5,30.5 -16,34 -30,34" fill="#9c8265" stroke="#453524" strokeWidth="1.5" />
            <line x1="-25" y1="31" x2="-25" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <line x1="-21" y1="31" x2="-21" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <ellipse cx="-23" cy="30.5" rx="3.2" ry="1.5" fill="#d4b276" />

            {/* Footpad 3: Forward-Inner (x: 11) */}
            <circle cx="11" cy="15" r="4.5" fill="#bfa06a" stroke="#4a3826" strokeWidth="1.6" />
            <line x1="8.5" y1="13" x2="8.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <line x1="13.5" y1="13" x2="13.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <rect x="7" y="18" width="8" height="8" rx="1.5" fill="#b84538" stroke="#5c1910" strokeWidth="1.4" />
            <line x1="11" y1="24" x2="11" y2="31" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="5.5,30.5 16.5,30.5 18,34 4,34" fill="#9c8265" stroke="#453524" strokeWidth="1.5" />
            <line x1="9" y1="31" x2="9" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <line x1="13" y1="31" x2="13" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <ellipse cx="11" cy="30.5" rx="3.2" ry="1.5" fill="#d4b276" />

            {/* Footpad 4: Forward-Mid (x: 23) */}
            <circle cx="23" cy="15" r="4.5" fill="#bfa06a" stroke="#4a3826" strokeWidth="1.6" />
            <line x1="20.5" y1="13" x2="20.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <line x1="25.5" y1="13" x2="25.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <rect x="19" y="18" width="8" height="8" rx="1.5" fill="#b84538" stroke="#5c1910" strokeWidth="1.4" />
            <line x1="23" y1="24" x2="23" y2="31" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="17.5,30.5 28.5,30.5 30,34 16,34" fill="#9c8265" stroke="#453524" strokeWidth="1.5" />
            <line x1="21" y1="31" x2="21" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <line x1="25" y1="31" x2="25" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <ellipse cx="23" cy="30.5" rx="3.2" ry="1.5" fill="#d4b276" />

            {/* Footpad 5: Forward-Prow (x: 37) */}
            <circle cx="37" cy="15" r="4.5" fill="#bfa06a" stroke="#4a3826" strokeWidth="1.6" />
            <line x1="34.5" y1="13" x2="34.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <line x1="39.5" y1="13" x2="39.5" y2="17" stroke="#6e5334" strokeWidth="1.0" />
            <rect x="33" y="18" width="8" height="8" rx="1.5" fill="#b84538" stroke="#5c1910" strokeWidth="1.4" />
            <line x1="37" y1="24" x2="37" y2="31" stroke="#cbd5e1" strokeWidth="2.4" strokeLinecap="round" />
            <polygon points="31.5,30.5 42.5,30.5 44,34 30,34" fill="#9c8265" stroke="#453524" strokeWidth="1.5" />
            <line x1="35" y1="31" x2="35" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <line x1="39" y1="31" x2="39" y2="34" stroke="#261f17" strokeWidth="1.2" />
            <ellipse cx="37" cy="30.5" rx="3.2" ry="1.5" fill="#d4b276" />

            {/* 3. Aft Armored Hull Block (X: -42 to -11, Y: -20 to 16) */}
            <polygon
              points="-42,-10 -35,-20 -11,-20 -11,16 -42,16"
              fill="#b84538"
              stroke="#5c1910"
              strokeWidth="2.0"
            />
            {/* Aft Armor Seam */}
            <path d="M-34 -18 L-13 -18 L-13 14" fill="none" stroke="#d96c5e" strokeWidth="1.0" />
            {/* Aft Rivets */}
            <circle cx="-33" cy="-16" r="0.9" fill="#64748b" />
            <circle cx="-14" cy="-16" r="0.9" fill="#64748b" />
            <circle cx="-14" cy="12" r="0.9" fill="#64748b" />
            <circle cx="-39" cy="12" r="0.9" fill="#64748b" />
            {/* Aft Louvers */}
            <line x1="-24" y1="7" x2="-20" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="-21" y1="7" x2="-17" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="-18" y1="7" x2="-14" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="-15" y1="7" x2="-11" y2="11" stroke="#45120b" strokeWidth="1.4" />

            {/* 4. Rock-Crusher Drill Arm ("Nutcracker", Aft-Mounted) */}
            {/* Pivot Mount Bracket */}
            <rect x="-44" y="-26" width="8" height="10" rx="2" fill="#4a3c32" stroke="#261f1a" strokeWidth="1.8" />
            <circle cx="-40" cy="-21" r="2.5" fill="#d4b276" stroke="#6e5334" strokeWidth="1.2" />

            {/* Angled Cylinder Body & Chisel Head */}
            <g transform="translate(-40, -21) rotate(-14)">
              {/* Cylinder Barrel */}
              <rect x="-8" y="-12" width="16" height="26" rx="2" fill="url(#nutcracker-drill)" stroke="#261f1a" strokeWidth="1.8" />
              <rect x="-5" y="-6" width="10" height="5" fill="#261f1a" />
              <rect x="-3" y="-4" width="6" height="1.5" fill="#38bdf8" />

              {/* Fluted Collar */}
              <rect x="-9" y="14" width="18" height="7" rx="1" fill="url(#nutcracker-collar)" stroke="#5a4422" strokeWidth="1.6" />
              <line x1="-6" y1="14" x2="-6" y2="21" stroke="#5a4422" strokeWidth="1.0" />
              <line x1="-2" y1="14" x2="-2" y2="21" stroke="#5a4422" strokeWidth="1.0" />
              <line x1="2" y1="14" x2="2" y2="21" stroke="#5a4422" strokeWidth="1.0" />
              <line x1="6" y1="14" x2="6" y2="21" stroke="#5a4422" strokeWidth="1.0" />

              {/* Faceted Chisel Head */}
              <polygon points="-8,21 0,37 -2,37 -9,27" fill="#5c4837" stroke="#261f1a" strokeWidth="1.4" />
              <polygon points="-8,21 8,21 0,37" fill="url(#nutcracker-chisel)" stroke="#261f1a" strokeWidth="1.4" />
              <line x1="0" y1="21" x2="0" y2="37" stroke="#e8dccb" strokeWidth="1.2" />
              <polygon points="-2,37 0,39 2,37" fill="#cbd5e1" />
            </g>
            {/* Hydraulic Line */}
            <path d="M-33 -19 Q-39 -28 -44 -20" fill="none" stroke="#eab308" strokeWidth="1.8" />

            {/* 5. Center Recessed Spine & Underslung Rover Bay Pod */}
            {/* Recessed Backbone */}
            <rect x="-11" y="-16" width="22" height="10" fill="#261f1a" stroke="#4a3c32" strokeWidth="1.6" />
            <line x1="-9" y1="-16" x2="-4" y2="-6" stroke="#ca8a04" strokeWidth="1.4" />
            <line x1="-4" y1="-16" x2="1" y2="-6" stroke="#ca8a04" strokeWidth="1.4" />
            <line x1="1" y1="-16" x2="6" y2="-6" stroke="#ca8a04" strokeWidth="1.4" />

            {/* Two Thick Yellow Feeder Hoses */}
            <path d="M-6 -16 C-6 -11 -4 -9 -4 -6" fill="none" stroke="#ca8a04" strokeWidth="3.2" />
            <path d="M-6 -16 C-6 -11 -4 -9 -4 -6" fill="none" stroke="#fde047" strokeWidth="1.8" />
            <path d="M4 -16 C4 -11 2 -9 2 -6" fill="none" stroke="#ca8a04" strokeWidth="3.2" />
            <path d="M4 -16 C4 -11 2 -9 2 -6" fill="none" stroke="#fde047" strokeWidth="1.8" />

            {/* Underslung Rover Bay Pod */}
            <rect x="-10" y="-6" width="20" height="22" rx="2" fill="#b84538" stroke="#5c1910" strokeWidth="1.8" />
            {/* Status Visor */}
            <rect x="-6" y="-2" width="12" height="4" fill="#082f49" />
            <rect x="-5" y="-1" width="10" height="2" fill="#38bdf8" />
            <rect x="-2" y="-0.5" width="4" height="1" fill="#ffffff" />
            {/* Interior Garage Hold */}
            <rect x="-8" y="3" width="16" height="12" fill="#171310" />
            <circle cx="-4" cy="4.5" r="1.2" fill="#fef08a" />
            <circle cx="4" cy="4.5" r="1.2" fill="#fef08a" />
            <line x1="-6" y1="14" x2="6" y2="14" stroke="#0284c7" strokeWidth="0.8" />

            {/* Onboard Rover */}
            <g transform="translate(0, 9)">
              <rect x="-7" y="-3" width="14" height="6" rx="1" fill="#261f1a" stroke="#d4b276" strokeWidth="1.0" />
              <rect x="1" y="-5" width="5" height="3" fill="#38bdf8" />
              <rect x="-6" y="-5" width="5" height="2.5" fill="#ea580c" />
              <circle cx="-4.5" cy="3.5" r="1.8" fill="#0f172a" />
              <circle cx="0" cy="3.5" r="1.8" fill="#0f172a" />
              <circle cx="4.5" cy="3.5" r="1.8" fill="#0f172a" />
            </g>

            {/* Lowering Hydraulic Bay Door / Ramp (Partially Lowered in Menu Preview) */}
            <line x1="8" y1="11" x2="-5" y2="24" stroke="#cbd5e1" strokeWidth="1.8" />
            <line x1="-10" y1="14" x2="-22" y2="29" stroke="#453524" strokeWidth="4.8" strokeLinecap="round" />
            <line x1="-10" y1="14" x2="-22" y2="29" stroke="#d4b276" strokeWidth="2.2" />
            <circle cx="-22" cy="29" r="2.0" fill="#facc15" />

            {/* 6. Forward Command Superstructure & Bridge (X: 10 to 44) */}
            <polygon
              points="10,16 10,-20 24,-20 30,-30 44,-30 44,16"
              fill="#b84538"
              stroke="#5c1910"
              strokeWidth="2.0"
            />
            {/* Forward Armor Seam */}
            <path d="M12 14 L12 -18 L25 -18 L31 -28 L42 -28 L42 14" fill="none" stroke="#d96c5e" strokeWidth="1.0" />
            <circle cx="12" cy="-16" r="0.9" fill="#64748b" />
            <circle cx="26" cy="-16" r="0.9" fill="#64748b" />
            <circle cx="42" cy="-26" r="0.9" fill="#64748b" />
            <circle cx="42" cy="12" r="0.9" fill="#64748b" />
            <circle cx="12" cy="12" r="0.9" fill="#64748b" />

            {/* Panoramic Cyan Bridge Visor (3 Faceted Window Panes) */}
            <polygon points="31,-29 43,-29 41,-23 31,-23" fill="#1c1815" />
            {/* Pane 1 */}
            <polygon points="32,-28.5 34.5,-28.5 34.5,-23.5 32,-23.5" fill="url(#nutcracker-glass)" />
            <polygon points="32.4,-28 34.1,-28 34.1,-26.5 32.4,-27" fill="#ffffff" opacity="0.85" />
            {/* Pane 2 */}
            <polygon points="35.5,-28.5 38.5,-28.5 38.5,-23.5 35.5,-23.5" fill="url(#nutcracker-glass)" />
            <polygon points="35.9,-28 38.1,-28 38.1,-26.5 35.9,-27" fill="#ffffff" opacity="0.85" />
            {/* Pane 3 */}
            <polygon points="39.5,-28.5 42.5,-28.5 41,-23.5 39.5,-23.5" fill="url(#nutcracker-glass)" />
            <polygon points="39.9,-28 42.1,-28 41.5,-26.5 39.9,-27" fill="#ffffff" opacity="0.85" />

            {/* Dual Diagonal Intake Louvers */}
            <polygon points="17,-15 21,-11 19,-9 15,-13" fill="#261f1a" stroke="#e2e8f0" strokeWidth="1.2" />
            <polygon points="21,-17 25,-13 23,-11 19,-15" fill="#261f1a" stroke="#e2e8f0" strokeWidth="1.2" />

            {/* Lower Forward Louvers */}
            <line x1="28" y1="8" x2="31" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="31" y1="8" x2="34" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="34" y1="8" x2="37" y2="11" stroke="#45120b" strokeWidth="1.4" />
            <line x1="37" y1="8" x2="40" y2="11" stroke="#45120b" strokeWidth="1.4" />

            {/* Rooftop Antenna Mast & Searchlight */}
            <line x1="35" y1="-30" x2="35" y2="-42" stroke="#cbd5e1" strokeWidth="1.4" />
            <circle cx="35" cy="-42.5" r="1.6" fill="#ef4444" />
            <rect x="39" y="-36" width="5" height="6" rx="1" fill="#4a3c32" stroke="#261f1a" strokeWidth="1.2" />
            <ellipse cx="44" cy="-33" rx="1.2" ry="2.2" fill="#ffffff" />

            {/* 7. Heavy Propulsion Bells */}
            {/* Aft Bells */}
            <polygon points="-36,16 -26,16 -24,24 -38,24" fill="#1c1917" stroke="#4a3c32" strokeWidth="1.4" />
            <line x1="-38" y1="24" x2="-24" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            {/* Forward Bells */}
            <polygon points="24,16 36,16 38,24 22,24" fill="#1c1917" stroke="#4a3c32" strokeWidth="1.4" />
            <line x1="22" y1="24" x2="38" y2="24" stroke="#ea580c" strokeWidth="1.8" />
            {/* Throat Idle Glow */}
            <ellipse cx="-31" cy="23" rx="5" ry="1.5" fill="#38bdf8" opacity="0.45" />
            <ellipse cx="30" cy="23" rx="5" ry="1.5" fill="#38bdf8" opacity="0.45" />
          </g>
        )}

        {/* ================================================================= */}
        {/* NAUTILUS VECTOR SCOUT (Modular Tactical Lander & Spiral Bow)      */}
        {/* ================================================================= */}
        {modelId === 'nautilus' && (
          <g>
            {/* 1. Aft Propulsion Unit & 4 Aerospike Stabilizing Fins */}
            {/* Upper Fin */}
            <polygon
              points="-32,-11 -46,-21 -48,-20 -38,-11"
              fill="#334155"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            {/* Lower Fin */}
            <polygon
              points="-32,11 -46,21 -48,20 -38,11"
              fill="#334155"
              stroke="#0f172a"
              strokeWidth="1.4"
            />
            {/* Lateral Fin Ribs */}
            <polygon
              points="-42,-2 -47,-3 -47,3 -42,2"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.2"
            />
            {/* Neck Conduit */}
            <rect
              x="-24"
              y="-7"
              width="8"
              height="14"
              rx="1.5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <line x1="-21" y1="-7" x2="-21" y2="7" stroke="#475569" strokeWidth="1.0" />
            <line x1="-18" y1="-7" x2="-18" y2="7" stroke="#475569" strokeWidth="1.0" />

            {/* White Engine Housing Body */}
            <rect
              x="-42"
              y="-11"
              width="18"
              height="22"
              rx="2"
              fill="url(#nautilus-engine)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Engine Cylinder Vertical Slits */}
            <line x1="-36" y1="-5" x2="-36" y2="5" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="-33" y1="-5" x2="-33" y2="5" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="-30" y1="-5" x2="-30" y2="5" stroke="#0f172a" strokeWidth="1.4" />

            {/* Aft Exhaust Collar & Throat */}
            <rect
              x="-45"
              y="-12"
              width="4"
              height="24"
              rx="1.5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <ellipse cx="-45" cy="0" rx="2" ry="9" fill="#0f172a" />
            <ellipse cx="-45" cy="0" rx="1.5" ry="7" fill="#38bdf8" opacity="0.65" />

            {/* 2. Angled Dorsal Hex Rocket / Sensor Pod (Tilted ~27.5 deg) */}
            <g transform="translate(-16, -18) rotate(-27.5)">
              {/* Mounting Bracket */}
              <rect
                x="-14"
                y="5"
                width="20"
                height="5"
                rx="1"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="1.4"
              />
              {/* Faceted Pod Body */}
              <polygon
                points="-15,-4 -10,-9 12,-9 16,-4 16,4 12,9 -10,9 -15,4"
                fill="url(#nautilus-hull)"
                stroke="#0f172a"
                strokeWidth="1.8"
              />
              {/* Longitudinal Seam Line & Vent Louvers */}
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="1.0" />
              <line x1="-6" y1="-6" x2="-4" y2="-4" stroke="#0f172a" strokeWidth="1.4" />
              <line x1="-2" y1="-6" x2="0" y2="-4" stroke="#0f172a" strokeWidth="1.4" />

              {/* Recessed Hex Face */}
              <polygon
                points="9,-7 15,-3 15,3 9,7"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="1.4"
              />
              {/* 6 Circular Rocket Ports */}
              <circle cx="10.5" cy="-4" r="1.2" fill="#0f172a" />
              <circle cx="13.5" cy="-2" r="1.2" fill="#0f172a" />
              <circle cx="10.5" cy="0" r="1.2" fill="#0f172a" />
              <circle cx="13.5" cy="0" r="1.2" fill="#0f172a" />
              <circle cx="10.5" cy="4" r="1.2" fill="#0f172a" />
              <circle cx="13.5" cy="2" r="1.2" fill="#0f172a" />
            </g>

            {/* 3. Central Dark Backbone Spine & Modular Cabin */}
            <rect
              x="-18"
              y="-17"
              width="24"
              height="11"
              rx="2"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Spine Gantry Teeth */}
            <rect x="-16" y="-18.5" width="2.4" height="2" fill="#0f172a" />
            <rect x="-12" y="-18.5" width="2.4" height="2" fill="#0f172a" />
            <rect x="-8" y="-18.5" width="2.4" height="2" fill="#0f172a" />
            <rect x="-4" y="-18.5" width="2.4" height="2" fill="#0f172a" />
            <rect x="0" y="-18.5" width="2.4" height="2" fill="#0f172a" />

            {/* Crew Cabin Pod */}
            <rect
              x="-10"
              y="-16"
              width="18"
              height="18"
              rx="2.5"
              fill="url(#nautilus-hull)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Crew Window */}
            <rect
              x="-8"
              y="-13"
              width="7.5"
              height="10"
              rx="1.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1.2"
            />
            {/* Window Glass Specular Highlight */}
            <polygon
              points="-7.5,-12 -2,-12 -4,-9.5 -7.5,-9.5"
              fill="#ffffff"
              opacity="0.85"
            />
            {/* Status Dashes */}
            <line x1="1" y1="-11" x2="1" y2="-9.5" stroke="#94a3b8" strokeWidth="1.0" />
            <line x1="1" y1="-8" x2="1" y2="-6.5" stroke="#94a3b8" strokeWidth="1.0" />
            <line x1="1" y1="-5" x2="1" y2="-3.5" stroke="#94a3b8" strokeWidth="1.0" />

            {/* Vertical Intake Slit */}
            <rect
              x="3"
              y="-14"
              width="3.8"
              height="14"
              rx="1.8"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.4"
            />

            {/* 4. Lower Armored Module & Triple Reaction Ports */}
            {/* Center Block */}
            <polygon
              points="-10,0 4,0 4,21 -8,21 -10,18"
              fill="url(#nautilus-hull)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Slanted Louvers (// //) */}
            <line x1="-7" y1="3" x2="-5" y2="8" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="-4" y1="3" x2="-2" y2="8" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="0" y1="3" x2="2" y2="8" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="3" y1="3" x2="5" y2="8" stroke="#0f172a" strokeWidth="1.8" />
            {/* Lower Vent Slot */}
            <rect x="-6" y="17" width="7" height="2" fill="#0f172a" />

            {/* Lower Rear Pod */}
            <polygon
              points="-24,0 -10,0 -10,21 -22,21 -24,18"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Rear Tan Markings */}
            <rect x="-21" y="6" width="6" height="1.6" fill="#d4b276" />
            <rect x="-21" y="10" width="6" height="1.6" fill="#d4b276" />
            <rect x="-21" y="14" width="6" height="1.6" fill="#d4b276" />

            {/* Lower Forward Pod */}
            <polygon
              points="4,-1 16,-1 16,21 6,21 4,19"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            {/* Forward Tan Markings */}
            <rect x="7" y="6" width="5" height="1.6" fill="#d4b276" />
            <rect x="7" y="10" width="5" height="1.6" fill="#d4b276" />
            <rect x="7" y="14" width="5" height="1.6" fill="#d4b276" />

            {/* Three Stacked Circular/Oval Reaction Thruster Ports */}
            {/* Port 1 (Top) */}
            <ellipse cx="16" cy="4" rx="2.8" ry="3.2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
            <ellipse cx="16" cy="4" rx="1.8" ry="2.4" fill="#0f172a" />
            <ellipse cx="16" cy="4" rx="1.0" ry="1.5" fill="none" stroke="#facc15" strokeWidth="0.8" />
            {/* Port 2 (Mid) */}
            <ellipse cx="16" cy="11" rx="2.8" ry="3.2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
            <ellipse cx="16" cy="11" rx="1.8" ry="2.4" fill="#0f172a" />
            <ellipse cx="16" cy="11" rx="1.0" ry="1.5" fill="none" stroke="#facc15" strokeWidth="0.8" />
            {/* Port 3 (Bottom) */}
            <ellipse cx="16" cy="18" rx="2.8" ry="3.2" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
            <ellipse cx="16" cy="18" rx="1.8" ry="2.4" fill="#0f172a" />
            <ellipse cx="16" cy="18" rx="1.0" ry="1.5" fill="none" stroke="#facc15" strokeWidth="0.8" />

            {/* 5. Landing Skids with Stamped "X" Badges */}
            {/* Skid 1: Rear */}
            <rect x="-22" y="21" width="8" height="4" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="-22" y="24" width="8" height="7" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="-20.5" y1="25.5" x2="-15.5" y2="29.5" stroke="#94a3b8" strokeWidth="1.4" />
            <line x1="-20.5" y1="29.5" x2="-15.5" y2="25.5" stroke="#94a3b8" strokeWidth="1.4" />

            {/* Skid 2: Forward-Belly */}
            <rect x="6" y="21" width="8" height="4" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="6" y="24" width="8" height="7" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="7.5" y1="25.5" x2="12.5" y2="29.5" stroke="#94a3b8" strokeWidth="1.4" />
            <line x1="7.5" y1="29.5" x2="12.5" y2="25.5" stroke="#94a3b8" strokeWidth="1.4" />

            {/* Skid 3: Prow */}
            <rect x="25" y="17" width="8" height="4" rx="1" fill="#ffffff" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="25" y="20" width="8" height="7" rx="1" fill="#1e293b" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="26.5" y1="21.5" x2="31.5" y2="25.5" stroke="#94a3b8" strokeWidth="1.4" />
            <line x1="26.5" y1="25.5" x2="31.5" y2="21.5" stroke="#94a3b8" strokeWidth="1.4" />

            {/* 6. The Iconic Arched Spiral Cowled Bow */}
            {/* Dark Core Hub */}
            <circle cx="19" cy="-2" r="11" fill="#1e293b" stroke="#0f172a" strokeWidth="2.0" />
            <circle cx="19" cy="-2" r="7.5" fill="#334155" stroke="#0f172a" strokeWidth="1.2" />

            {/* Stator Blades */}
            <line x1="23" y1="-2" x2="26.2" y2="-2" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="15" y1="-2" x2="11.8" y2="-2" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="19" y1="2" x2="19" y2="5.2" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="19" y1="-6" x2="19" y2="-9.2" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="21.8" y1="0.8" x2="24.1" y2="3.1" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="16.2" y1="-4.8" x2="13.9" y2="-7.1" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="21.8" y1="-4.8" x2="24.1" y2="-7.1" stroke="#1e293b" strokeWidth="1.2" />
            <line x1="16.2" y1="0.8" x2="13.9" y2="3.1" stroke="#1e293b" strokeWidth="1.2" />

            {/* Central Boss & Pin */}
            <circle cx="19" cy="-2" r="3.5" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.2" />
            <circle cx="19" cy="-2" r="1.2" fill="#cbd5e1" />

            {/* Crescent Armored Cowl Shell */}
            <path
              d="M 15,-22 C 27,-24 40,-14 41,0 C 41,10 36,18 29,21 L 25,17 C 31,13 34,7 33,-1 C 32,-8 25,-15 16,-16 Z"
              fill="url(#nautilus-cowl)"
              stroke="#0f172a"
              strokeWidth="2.0"
            />

            {/* Radial Segment Seams on Cowl Shell */}
            <line x1="27" y1="-19" x2="24" y2="-13" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="41" y1="0" x2="33" y2="0" stroke="#0f172a" strokeWidth="1.4" />
            <line x1="37" y1="12" x2="30" y2="10" stroke="#0f172a" strokeWidth="1.4" />

            {/* 4 Circular Studs / Sensor Apertures on Cowl */}
            <circle cx="21" cy="-13" r="1.8" fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="21" cy="-13" r="0.6" fill="#cbd5e1" />

            <circle cx="34" cy="-4" r="1.8" fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="34" cy="-4" r="0.6" fill="#cbd5e1" />

            <circle cx="33" cy="7" r="1.8" fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="33" cy="7" r="0.6" fill="#cbd5e1" />

            <circle cx="25" cy="15" r="1.8" fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
            <circle cx="25" cy="15" r="0.6" fill="#cbd5e1" />

            {/* Outer Glowing Amber-Gold Visor Perimeter Arc Strip */}
            {/* Segment 1 */}
            <path
              d="M 22,-23.5 C 31,-23 38,-16 40.5,-8 L 38.5,-8 C 36,-14 30,-20.5 22,-21 Z"
              fill="url(#nautilus-visor)"
              stroke="#ca8a04"
              strokeWidth="1.2"
            />
            {/* Segment 2 */}
            <path
              d="M 41.5,-6 C 43.5,0 42.5,7 39,13 L 37,12 C 40,6 41,0 39.5,-6 Z"
              fill="url(#nautilus-visor)"
              stroke="#ca8a04"
              strokeWidth="1.2"
            />
          </g>
        )}

        {/* ================================================================= */}
        {/* EAGLE TRANSPORTER (Space: 1999 Modular Lunar Cargo Lander)        */}
        {/* ================================================================= */}
        {modelId === 'eagle' && (
          <g>
            {/* 1. Aft Propulsion Block: Rocket Engine Bells & Fuel Tanks */}
            {/* Thrust Mounting Truss Bars */}
            <line x1="-44" y1="-9" x2="-53" y2="-11" stroke="#334155" strokeWidth="2.0" />
            <line x1="-44" y1="9" x2="-53" y2="11" stroke="#334155" strokeWidth="2.0" />
            <line x1="-44" y1="0" x2="-53" y2="0" stroke="#334155" strokeWidth="2.0" />

            {/* Upper Rocket Engine Bell */}
            <path
              d="M -52,-11.5 C -58,-11.5 -64,-13.5 -68,-14 L -68,-1 C -64,-1.5 -58,-3.5 -52,-3.5 Z"
              fill="url(#eagle-bell)"
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <line x1="-57" y1="-12" x2="-57" y2="-3" stroke="#64748b" strokeWidth="1.0" />
            <line x1="-62" y1="-12.8" x2="-62" y2="-2.2" stroke="#64748b" strokeWidth="1.0" />
            <ellipse cx="-68" cy="-7.5" rx="2.0" ry="5.7" fill="#0f172a" />
            <ellipse cx="-68" cy="-7.5" rx="1.2" ry="4.0" fill="#38bdf8" opacity="0.6" />
            <line x1="-68" y1="-14" x2="-68" y2="-1" stroke="#0f172a" strokeWidth="1.4" />

            {/* Lower Rocket Engine Bell */}
            <path
              d="M -52,3.5 C -58,3.5 -64,1.5 -68,1 L -68,14 C -64,13.5 -58,11.5 -52,11.5 Z"
              fill="url(#eagle-bell)"
              stroke="#0f172a"
              strokeWidth="1.6"
            />
            <line x1="-57" y1="3" x2="-57" y2="12" stroke="#64748b" strokeWidth="1.0" />
            <line x1="-62" y1="2.2" x2="-62" y2="12.8" stroke="#64748b" strokeWidth="1.0" />
            <ellipse cx="-68" cy="7.5" rx="2.0" ry="5.7" fill="#0f172a" />
            <ellipse cx="-68" cy="7.5" rx="1.2" ry="4.0" fill="#38bdf8" opacity="0.6" />
            <line x1="-68" y1="1" x2="-68" y2="14" stroke="#0f172a" strokeWidth="1.4" />

            {/* 4 Spherical Propellant Tanks */}
            {/* Upper Aft Tank */}
            <circle cx="-51" cy="-6" r="5.0" fill="url(#eagle-tank)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="-51" cy="-6" rx="4.8" ry="1.8" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
            <rect x="-53.5" y="-7.2" width="5" height="2.4" fill="#ea580c" stroke="#0f172a" strokeWidth="0.6" />

            {/* Upper Fore Tank */}
            <circle cx="-44.5" cy="-6" r="4.6" fill="url(#eagle-tank)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="-44.5" cy="-6" rx="4.4" ry="1.6" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
            <rect x="-47" y="-7.2" width="5" height="2.4" fill="#ea580c" stroke="#0f172a" strokeWidth="0.6" />

            {/* Lower Aft Tank */}
            <circle cx="-51" cy="6" r="5.0" fill="url(#eagle-tank)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="-51" cy="6" rx="4.8" ry="1.8" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
            <rect x="-53.5" y="4.8" width="5" height="2.4" fill="#ea580c" stroke="#0f172a" strokeWidth="0.6" />

            {/* Lower Fore Tank */}
            <circle cx="-44.5" cy="6" r="4.6" fill="url(#eagle-tank)" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="-44.5" cy="6" rx="4.4" ry="1.6" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
            <rect x="-47" y="4.8" width="5" height="2.4" fill="#ea580c" stroke="#0f172a" strokeWidth="0.6" />

            {/* Plumbing Conduits */}
            <line x1="-51" y1="-1" x2="-44" y2="-1" stroke="#64748b" strokeWidth="1.2" />
            <line x1="-51" y1="1" x2="-44" y2="1" stroke="#64748b" strokeWidth="1.2" />

            {/* 2. Open Tubular Spaceframe Catwalk (The Space: 1999 Spine Truss) */}
            {/* Aft Catwalk Lattice */}
            <line x1="-44" y1="-8" x2="-24" y2="-8" stroke="#ffffff" strokeWidth="1.6" />
            <line x1="-44" y1="-14" x2="-24" y2="-14" stroke="#ffffff" strokeWidth="1.6" />
            <polyline
              points="-44,-8 -39,-14 -34,-8 -29,-14 -24,-8"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <polyline
              points="-44,-14 -39,-8 -34,-14 -29,-8 -24,-14"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />

            {/* Central Elevated Catwalk Truss (above Cargo Pod) */}
            <line x1="-24" y1="-16.5" x2="24" y2="-16.5" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="-24" y1="-10.5" x2="24" y2="-10.5" stroke="#ffffff" strokeWidth="1.8" />
            <line x1="-24" y1="-10" x2="-24" y2="-16.5" stroke="#0f172a" strokeWidth="2.0" />
            <line x1="24" y1="-10" x2="24" y2="-16.5" stroke="#0f172a" strokeWidth="2.0" />
            {/* Triangulated Diagonal Webbing */}
            <polyline
              points="-24,-10.5 -20,-16.5 -16,-10.5 -12,-16.5 -8,-10.5 -4,-16.5 0,-10.5 4,-16.5 8,-10.5 12,-16.5 16,-10.5 20,-16.5 24,-10.5"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <line x1="-20" y1="-10.5" x2="-20" y2="-16.5" stroke="#475569" strokeWidth="1.0" />
            <line x1="-12" y1="-10.5" x2="-12" y2="-16.5" stroke="#475569" strokeWidth="1.0" />
            <line x1="-4" y1="-10.5" x2="-4" y2="-16.5" stroke="#475569" strokeWidth="1.0" />
            <line x1="4" y1="-10.5" x2="4" y2="-16.5" stroke="#475569" strokeWidth="1.0" />
            <line x1="12" y1="-10.5" x2="12" y2="-16.5" stroke="#475569" strokeWidth="1.0" />
            <line x1="20" y1="-10.5" x2="20" y2="-16.5" stroke="#475569" strokeWidth="1.0" />

            {/* Forward Catwalk Lattice */}
            <line x1="24" y1="-8" x2="44" y2="-8" stroke="#ffffff" strokeWidth="1.6" />
            <line x1="24" y1="-14" x2="44" y2="-14" stroke="#ffffff" strokeWidth="1.6" />
            <polyline
              points="24,-8 29,-14 34,-8 39,-14 44,-8"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />
            <polyline
              points="24,-14 29,-8 34,-14 39,-8 44,-14"
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />

            {/* Red & White Hazard Docking Collars */}
            <rect x="-44" y="-15" width="2.5" height="8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="-44" y="-15" width="1.2" height="8" fill="#ef4444" />
            <rect x="-24" y="-17.5" width="2.5" height="8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="-24" y="-17.5" width="1.2" height="8" fill="#ef4444" />
            <rect x="21.5" y="-17.5" width="2.5" height="8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="21.5" y="-17.5" width="1.2" height="8" fill="#ef4444" />
            <rect x="42" y="-15" width="2.5" height="8" fill="#ffffff" stroke="#0f172a" strokeWidth="0.8" />
            <rect x="42" y="-15" width="1.2" height="8" fill="#ef4444" />

            {/* 3. Central Modular Cargo / Passenger Transporter Pod */}
            {/* Pod Shell */}
            <polygon
              points="-24,-7 -22,-9 22,-9 24,-7 24,7 22,8.5 -22,8.5 -24,7"
              fill="url(#eagle-pod)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />

            {/* Upper Viewport Strip */}
            <rect x="-22" y="-8.2" width="44" height="3.4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.0" />
            {/* 4 Viewport Windows */}
            <rect x="-19" y="-7.5" width="5.5" height="2.0" fill="#0f172a" />
            <rect x="-18.4" y="-7.1" width="4.3" height="0.6" fill="#38bdf8" />
            <rect x="-11" y="-7.5" width="5.5" height="2.0" fill="#0f172a" />
            <rect x="-10.4" y="-7.1" width="4.3" height="0.6" fill="#38bdf8" />
            <rect x="7" y="-7.5" width="5.5" height="2.0" fill="#0f172a" />
            <rect x="7.6" y="-7.1" width="4.3" height="0.6" fill="#38bdf8" />
            <rect x="15" y="-7.5" width="5.5" height="2.0" fill="#0f172a" />
            <rect x="15.6" y="-7.1" width="4.3" height="0.6" fill="#38bdf8" />

            {/* Center Embossed Airlock Door with "X" / "H" Stamping */}
            <rect x="-5" y="-4.5" width="10" height="12" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="-3.8" y="-3.2" width="7.6" height="9.4" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.0" />
            <line x1="-3" y1="-2" x2="3" y2="5" stroke="#64748b" strokeWidth="1.4" />
            <line x1="3" y1="-2" x2="-3" y2="5" stroke="#64748b" strokeWidth="1.4" />
            <line x1="-3" y1="1.5" x2="3" y2="1.5" stroke="#64748b" strokeWidth="1.4" />
            <rect x="2.6" y="1" width="1.2" height="2.5" fill="#ef4444" />

            {/* Flanking Corrugated Equipment Sections */}
            <rect x="-22" y="-2.5" width="15" height="8.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="-21.5" y1="-1.2" x2="-7.5" y2="-1.2" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-21.5" y1="0.2" x2="-7.5" y2="0.2" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-21.5" y1="1.6" x2="-7.5" y2="1.6" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-21.5" y1="3.0" x2="-7.5" y2="3.0" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="-21.5" y1="4.4" x2="-7.5" y2="4.4" stroke="#94a3b8" strokeWidth="0.8" />

            <rect x="7" y="-2.5" width="15" height="8.5" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="7.5" y1="-1.2" x2="21.5" y2="-1.2" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="7.5" y1="0.2" x2="21.5" y2="0.2" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="7.5" y1="1.6" x2="21.5" y2="1.6" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="7.5" y1="3.0" x2="21.5" y2="3.0" stroke="#94a3b8" strokeWidth="0.8" />
            <line x1="7.5" y1="4.4" x2="21.5" y2="4.4" stroke="#94a3b8" strokeWidth="0.8" />

            {/* Moonbase Alpha Insignia Blue Decals */}
            <rect x="-21" y="-4.2" width="3.2" height="1.4" fill="#1d4ed8" />
            <rect x="18" y="-4.2" width="3.2" height="1.4" fill="#1d4ed8" />

            {/* 4. Belly Downward VTOL Lift Thruster Bells */}
            {/* Aft VTOL Bell */}
            <rect x="-13.5" y="8.5" width="5" height="2" fill="#334155" stroke="#0f172a" strokeWidth="1.2" />
            <polygon points="-13,10.5 -9,10.5 -6.8,15 -15.2,15" fill="#1e293b" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="-11" cy="15" rx="4.0" ry="1.2" fill="#0f172a" />
            <ellipse cx="-11" cy="15" rx="2.2" ry="0.6" fill="#f59e0b" />

            {/* Forward VTOL Bell */}
            <rect x="8.5" y="8.5" width="5" height="2" fill="#334155" stroke="#0f172a" strokeWidth="1.2" />
            <polygon points="9,10.5 13,10.5 15.2,15 6.8,15" fill="#1e293b" stroke="#0f172a" strokeWidth="1.4" />
            <ellipse cx="11" cy="15" rx="4.0" ry="1.2" fill="#0f172a" />
            <ellipse cx="11" cy="15" rx="2.2" ry="0.6" fill="#f59e0b" />

            {/* 5. Aft Outrigger Service Pod & 4-Way RCS Quad */}
            <polygon
              points="-42,-4 -39,-7 -29,-7 -26,-4 -26,5 -29,8 -39,8 -42,5"
              fill="url(#eagle-pod)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <rect x="-38.5" y="-6.2" width="4.0" height="2.2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
            {/* Roundel Emblem */}
            <circle cx="-31.5" cy="-5.0" r="1.8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="1.0" />
            <circle cx="-31.5" cy="-5.0" r="0.8" fill="#1d4ed8" />
            {/* RCS 4-Way Thruster Quad */}
            <polygon points="-34,-1.8 -30.2,0.5 -34,2.8 -37.8,0.5" fill="#0f172a" stroke="#334155" strokeWidth="1.0" />
            <line x1="-37" y1="-1" x2="-31" y2="2" stroke="#64748b" strokeWidth="1.0" />
            <line x1="-31" y1="-1" x2="-37" y2="2" stroke="#64748b" strokeWidth="1.0" />
            {/* Micro Nozzles */}
            <polygon points="-35,-1.8 -33,-1.8 -32.4,-3.6 -35.6,-3.6" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="-35,2.8 -33,2.8 -32.4,4.6 -35.6,4.6" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="-37.8,-0.5 -37.8,1.5 -39.6,2.1 -39.6,-1.1" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="-30.2,-0.5 -30.2,1.5 -28.4,2.1 -28.4,-1.1" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <circle cx="-34" cy="0.5" r="0.9" fill="#f59e0b" />

            {/* 6. Forward Outrigger Service Pod & 4-Way RCS Quad */}
            <polygon
              points="26,-4 29,-7 39,-7 42,-4 42,5 39,8 29,8 26,5"
              fill="url(#eagle-pod)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <rect x="29.5" y="-6.2" width="4.0" height="2.2" fill="#cbd5e1" stroke="#475569" strokeWidth="0.8" />
            {/* Roundel Emblem */}
            <circle cx="36.5" cy="-5.0" r="1.8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="1.0" />
            <circle cx="36.5" cy="-5.0" r="0.8" fill="#1d4ed8" />
            {/* RCS 4-Way Thruster Quad */}
            <polygon points="34,-1.8 37.8,0.5 34,2.8 30.2,0.5" fill="#0f172a" stroke="#334155" strokeWidth="1.0" />
            <line x1="31" y1="-1" x2="37" y2="2" stroke="#64748b" strokeWidth="1.0" />
            <line x1="37" y1="-1" x2="31" y2="2" stroke="#64748b" strokeWidth="1.0" />
            {/* Micro Nozzles */}
            <polygon points="33,-1.8 35,-1.8 35.6,-3.6 32.4,-3.6" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="33,2.8 35,2.8 35.6,4.6 32.4,4.6" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="30.2,-0.5 30.2,1.5 28.4,2.1 28.4,-1.1" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <polygon points="37.8,-0.5 37.8,1.5 39.6,2.1 39.6,-1.1" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.8" />
            <circle cx="34" cy="0.5" r="0.9" fill="#f59e0b" />

            {/* 7. Heavy-Duty Articulated Landing Gear (Aft & Forward) */}
            {/* Aft Landing Gear */}
            <rect x="-36.5" y="8" width="5" height="2.5" fill="#334155" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="-35.5" y="10.5" width="3.0" height="5.0" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="-34" y1="15.5" x2="-34" y2="19.5" stroke="#cbd5e1" strokeWidth="2.0" />
            <polyline points="-34,11 -37.5,15 -34,18.5" fill="none" stroke="#475569" strokeWidth="1.4" />
            <circle cx="-37.5" cy="15" r="1.0" fill="#94a3b8" />
            {/* Aft Footpad */}
            <polygon points="-39.5,22 -36.5,18.8 -31.5,18.8 -28.5,22" fill="#475569" stroke="#0f172a" strokeWidth="1.6" />
            <rect x="-40.5" y="22" width="13" height="2.2" fill="#0f172a" />

            {/* Forward Landing Gear */}
            <rect x="31.5" y="8" width="5" height="2.5" fill="#334155" stroke="#0f172a" strokeWidth="1.4" />
            <rect x="32.5" y="10.5" width="3.0" height="5.0" fill="#1e293b" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="34" y1="15.5" x2="34" y2="19.5" stroke="#cbd5e1" strokeWidth="2.0" />
            <polyline points="34,11 30.5,15 34,18.5" fill="none" stroke="#475569" strokeWidth="1.4" />
            <circle cx="30.5" cy="15" r="1.0" fill="#94a3b8" />
            {/* Forward Footpad */}
            <polygon points="28.5,22 31.5,18.8 36.5,18.8 39.5,22" fill="#475569" stroke="#0f172a" strokeWidth="1.6" />
            <rect x="27.5" y="22" width="13" height="2.2" fill="#0f172a" />

            {/* 8. Forward Command Module Beak Cockpit */}
            {/* Red/White Hazard Collar Ring */}
            <rect x="43" y="-7.5" width="2.5" height="15" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
            <rect x="43" y="-7.5" width="1.2" height="15" fill="#ef4444" />

            {/* Faceted Aerodynamic Beak Nose */}
            <path
              d="M 45.5,-7.5 L 54,-8.0 C 60,-8.0 64,-5.0 66.5,0.0 C 64,4.5 60,7.0 54,7.0 L 45.5,7.0 Z"
              fill="url(#eagle-beak)"
              stroke="#0f172a"
              strokeWidth="1.8"
            />
            <line x1="47" y1="-3.5" x2="54" y2="-3.5" stroke="#94a3b8" strokeWidth="1.0" />
            <line x1="47" y1="3.5" x2="54" y2="3.5" stroke="#94a3b8" strokeWidth="1.0" />

            {/* Dual Iconic Cockpit Viewports */}
            {/* Upper Viewport */}
            <polygon points="54,-6.5 63.5,-0.8 54,-0.8" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
            <polygon points="55,-5.5 60.5,-1.8 55,-1.8" fill="#38bdf8" opacity="0.8" />
            {/* Lower Viewport */}
            <polygon points="54,0.8 63.5,0.8 54,5.5" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
            <polygon points="55,1.8 60.5,1.8 55,4.5" fill="#38bdf8" opacity="0.8" />
            {/* Window Center Mullion */}
            <line x1="53.5" y1="0.0" x2="64.5" y2="0.0" stroke="#f8fafc" strokeWidth="1.4" />

            {/* Side Circular Service Port / Sensor Hatch */}
            <circle cx="49.5" cy="-0.5" r="2.6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.0" />
            <circle cx="49.5" cy="-0.5" r="1.0" fill="#0f172a" />

            {/* Moonbase Alpha Insignia Emblem */}
            <rect x="57" y="4.0" width="2.8" height="1.6" fill="#1d4ed8" />
            {/* Forward Probe Tip */}
            <rect x="66.5" y="-0.6" width="1.8" height="1.2" fill="#334155" />
          </g>
        )}

        {/* Thruster Flame Animation */}
        {showThrusters && (
          <g>
            {isEagle ? (
              <>
                <polygon
                  points="-13.5,15 -11,23.5 -8.5,15"
                  fill="url(#thruster-flame)"
                  opacity="0.9"
                />
                <polygon
                  points="8.5,15 11,23.5 13.5,15"
                  fill="url(#thruster-flame)"
                  opacity="0.9"
                />
              </>
            ) : (
              <>
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
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
