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
            {/* 1. Heavy Industrial Shock Struts & Cast Footpads */}
            <g stroke="#64748b" strokeWidth="3" strokeLinecap="round">
              <path d="M-28 14 L-35 28" />
              <path d="M-18 16 L-35 28" strokeWidth="1.8" stroke="#475569" />
              <path d="M28 14 L35 28" />
              <path d="M18 16 L35 28" strokeWidth="1.8" stroke="#475569" />
            </g>
            {/* Reinforced Steel Footpads with Cleats */}
            <rect x="-39" y="27" width="13" height="4.5" rx="1.5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.2" />
            <rect x="26" y="27" width="13" height="4.5" rx="1.5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.2" />

            {/* 2. Main Armored Heavy Hull */}
            <polygon
              points="-34,2 -24,-22 24,-22 34,2 28,18 -28,18"
              fill="url(#hull-grad-titan)"
              stroke="#f59e0b"
              strokeWidth="2.2"
            />

            {/* 3. Central Heavy Spherical Propellant Tanks with Brackets */}
            <circle cx="-10" cy="2" r="7" fill="url(#fuel-tank-grad)" stroke="#78350f" strokeWidth="1.4" />
            <circle cx="10" cy="2" r="7" fill="url(#fuel-tank-grad)" stroke="#78350f" strokeWidth="1.4" />
            {/* Heavy Reinforcement Bands */}
            <path d="M-17 2 L-3 2 M3 2 L17 2" stroke="#0f172a" strokeWidth="1.8" />

            {/* 4. Industrial Hazard Warning Stripes */}
            <path
              d="M-14 11 L-10 18 M-7 11 L-3 18 M0 11 L4 18 M7 11 L11 18 M14 11 L18 18"
              stroke="#f59e0b"
              strokeWidth="2.4"
            />

            {/* 5. Dual Heavy Bridge Cockpit Viewports */}
            <rect x="-18" y="-16" width="13" height="8" rx="2" fill="url(#visor-grad-titan)" stroke="#fbbf24" strokeWidth="1.2" />
            <ellipse cx="-13" cy="-14" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.6" />
            <rect x="5" y="-16" width="13" height="8" rx="2" fill="url(#visor-grad-titan)" stroke="#fbbf24" strokeWidth="1.2" />
            <ellipse cx="10" cy="-14" rx="3.5" ry="1.5" fill="#ffffff" opacity="0.6" />

            {/* 6. Heavy Dual Gimbaled Thrusters */}
            <polygon points="-25,18 -13,18 -10,27 -28,27" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <polygon points="13,18 25,18 28,27 10,27" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
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

            {/* 2. Reinforced Hexagonal Armored Hull */}
            <polygon
              points="0,-25 25,-9 25,14 0,23 -25,14 -25,-9"
              fill="#064e3b"
              stroke="#10b981"
              strokeWidth="2.4"
            />
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

            {/* 2. Twin Aerodynamic Carbon Booms */}
            <polygon points="-25,-25 -16,-10 -16,21 -27,23 -29,-14" fill="#3b0764" stroke="#c084fc" strokeWidth="2.0" />
            <polygon points="25,-25 16,-10 16,21 27,23 29,-14" fill="#3b0764" stroke="#c084fc" strokeWidth="2.0" />

            {/* 3. Central Xenon Fuel Sphere */}
            <circle cx="0" cy="5" r="7" fill="url(#xenon-tank-grad)" stroke="#a855f7" strokeWidth="1.4" />

            {/* 4. Center Bridge & Wings */}
            <polygon points="0,-15 16,0 16,13 -16,13 -16,0" fill="#581c87" stroke="#e879f9" strokeWidth="1.6" />

            {/* 5. Violet Sensor Canopy */}
            <ellipse cx="0" cy="-3" rx="9" ry="5.5" fill="url(#visor-grad-nebula)" stroke="#f0abfc" strokeWidth="1.3" />
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
            {/* 1. Heavy Landing Struts & Cast Footpads */}
            <g stroke="#94a3b8" strokeWidth="2.8" strokeLinecap="round">
              <line x1="-32" y1="14" x2="-38" y2="32" />
              <line x1="-24" y1="18" x2="-38" y2="32" strokeWidth="2.0" stroke="#475569" />
              <line x1="32" y1="14" x2="38" y2="32" />
              <line x1="24" y1="18" x2="38" y2="32" strokeWidth="2.0" stroke="#475569" />
            </g>
            <ellipse cx="-38" cy="32" rx="7.5" ry="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            <ellipse cx="38" cy="32" rx="7.5" ry="3" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            {/* 2. Starboard Right Flank Propulsion Nacelle (x: +16 to +38) */}
            <rect x="16" y="-8" width="20" height="26" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.6" />
            <rect x="19" y="-5" width="14" height="20" rx="1.5" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />
            {/* Nacelle heat fins */}
            <line x1="20" y1="0" x2="32" y2="0" stroke="#f59e0b" strokeWidth="1.4" />
            <line x1="20" y1="6" x2="32" y2="6" stroke="#f59e0b" strokeWidth="1.4" />

            {/* 3. Overhead Structural Arch (x: -16 to +16) */}
            <rect x="-16" y="-14" width="32" height="6" rx="1.5" fill="#0f172a" stroke="#475569" strokeWidth="1.4" />

            {/* 4. Hollow Center Vehicle Hold Bay (Empty in the Middle) */}
            <rect x="-16" y="-8" width="32" height="24" rx="1" fill="#030712" stroke="#334155" strokeWidth="1.4" />

            {/* 5. Left Port Side Door / Hydraulic Ramp (-22 to -16) */}
            <line x1="-16" y1="14" x2="-26" y2="22" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="-16" y1="14" x2="-26" y2="22" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="2,2" />
            <circle cx="-26" cy="22" r="1.8" fill="#f59e0b" />

            {/* 6. Elevated Left Side Controller Tower (Command Bridge & ATC) (x: -36 to -16, y: -34 to +16) */}
            <polygon
              points="-36,-26 -28,-34 -16,-34 -16,16 -36,16"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="2.0"
            />
            {/* Tower Armor Plate */}
            <rect x="-34" y="-18" width="16" height="30" rx="2" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />

            {/* Panoramic Flight Control Bridge Observation Visor (Cyan) */}
            <polygon points="-33,-24 -27,-30 -18,-30 -18,-20 -33,-20" fill="url(#visor-grad-goliath)" stroke="#bae6fd" strokeWidth="1.2" />
            <ellipse cx="-26" cy="-25" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.85" />

            {/* Antenna Mast & Telemetry Radar on Left Tower */}
            <line x1="-28" y1="-34" x2="-28" y2="-42" stroke="#94a3b8" strokeWidth="1.6" />
            <path d="M-33 -41 Q-28 -38 -23 -41" stroke="#38bdf8" strokeWidth="1.8" fill="none" />
            <circle cx="-19" cy="-33" r="1.8" fill="#ef4444" />

            {/* 7. Heavy Thruster Bells */}
            <rect x="-33" y="16" width="12" height="7" rx="1" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
            <rect x="20" y="16" width="12" height="7" rx="1" fill="#334155" stroke="#f59e0b" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: BEHEMOTH-IX (Dreadnought Planetary Carrier)        */}
        {/* ========================================================= */}
        {modelId === 'behemoth' && (
          <g>
            {/* 1. Quad Outrigger Landing Gear & Articulated Footpads */}
            <g stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round">
              <line x1="-32" y1="14" x2="-38" y2="33" />
              <line x1="-24" y1="18" x2="-38" y2="33" strokeWidth="1.8" stroke="#475569" />
              <line x1="32" y1="14" x2="38" y2="33" />
              <line x1="24" y1="18" x2="38" y2="33" strokeWidth="1.8" stroke="#475569" />
            </g>
            <ellipse cx="-38" cy="33" rx="7.5" ry="3.2" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
            <ellipse cx="38" cy="33" rx="7.5" ry="3.2" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            {/* 2. Left Portside Heavy Gantry Crane & Cargo Structure (x: -36 to -14) */}
            <rect x="-36" y="-12" width="22" height="28" rx="2" fill="#1e293b" stroke="#f97316" strokeWidth="1.6" />
            <line x1="-34" y1="-4" x2="-16" y2="-4" stroke="#f97316" strokeWidth="1.4" />
            <line x1="-34" y1="4" x2="-16" y2="4" stroke="#f97316" strokeWidth="1.4" />
            {/* Gantry crane boom truss */}
            <line x1="-30" y1="-12" x2="-30" y2="-24" stroke="#f97316" strokeWidth="2.2" />
            <line x1="-30" y1="-24" x2="-16" y2="-12" stroke="#ea580c" strokeWidth="1.6" />
            <circle cx="-30" cy="-24" r="2" fill="#fdba74" />

            {/* 3. Center Hollow Vehicle Hold Bay (x: -14 to +14) */}
            <rect x="-14" y="-8" width="28" height="24" rx="1.5" fill="#030712" stroke="#475569" strokeWidth="1.4" />

            {/* 4. Left Asymmetrical Hydraulic Loading Ramp Door */}
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="-14" y1="14" x2="-26" y2="23" stroke="#fed7aa" strokeWidth="1.2" strokeDasharray="2,2" />
            <circle cx="-26" cy="23" r="1.8" fill="#f97316" />

            {/* 5. Starboard Heavy Command Bridge Tower (x: +14 to +36, y: -34 to +16) */}
            <polygon
              points="14,-34 34,-34 36,-26 36,16 14,16"
              fill="#0f172a"
              stroke="#f97316"
              strokeWidth="2.0"
            />
            <rect x="16" y="-18" width="18" height="30" rx="2" fill="url(#titanium-plate)" stroke="#94a3b8" strokeWidth="1.0" />

            {/* Cyan Panoramic Bridge Visor */}
            <polygon points="17,-30 31,-30 33,-22 17,-22" fill="url(#visor-grad-behemoth)" stroke="#7dd3fc" strokeWidth="1.2" />
            <ellipse cx="24" cy="-26" rx="3.5" ry="1.8" fill="#ffffff" opacity="0.85" />

            {/* Tower Radar & Telemetry Mast */}
            <line x1="28" y1="-34" x2="28" y2="-43" stroke="#cbd5e1" strokeWidth="1.8" />
            <path d="M23 -42 Q28 -39 33 -42" stroke="#38bdf8" strokeWidth="1.8" fill="none" />
            <circle cx="19" cy="-33" r="1.8" fill="#ef4444" />

            {/* 6. Asymmetrical Thruster Arrays */}
            <rect x="-30" y="16" width="12" height="7" rx="1" fill="#334155" stroke="#f97316" strokeWidth="1" />
            <rect x="18" y="16" width="16" height="7" rx="1" fill="#334155" stroke="#f97316" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: LEVIATHAN TITAN (Split-Hull Catamaran Supercarrier) */}
        {/* ========================================================= */}
        {modelId === 'leviathan' && (
          <g>
            {/* 1. Wide Catamaran Outriggers */}
            <g stroke="#06b6d4" strokeWidth="2.4" strokeLinecap="round">
              <line x1="-34" y1="12" x2="-40" y2="34" />
              <line x1="-26" y1="16" x2="-40" y2="34" strokeWidth="1.8" stroke="#0891b2" />
              <line x1="32" y1="12" x2="40" y2="34" />
              <line x1="24" y1="16" x2="40" y2="34" strokeWidth="1.8" stroke="#0891b2" />
            </g>
            <ellipse cx="-40" cy="34" rx="8" ry="3.2" fill="#0891b2" stroke="#164e63" strokeWidth="1.5" />
            <ellipse cx="40" cy="34" rx="8" ry="3.2" fill="#0891b2" stroke="#164e63" strokeWidth="1.5" />

            {/* 2. Massive Port Armored Vehicle Hangar Sponson (x: -38 to -10, y: -26 to +16) */}
            <polygon
              points="-38,-18 -32,-28 -10,-28 -10,16 -38,16"
              fill="#0f172a"
              stroke="#06b6d4"
              strokeWidth="2.0"
            />
            <rect x="-34" y="-12" width="22" height="24" rx="2" fill="url(#titanium-plate)" stroke="#67e8f9" strokeWidth="1.0" />

            {/* Port Sponson Glacial Visor Observation Dome */}
            <ellipse cx="-22" cy="-22" rx="6" ry="3.5" fill="url(#visor-grad-leviathan)" stroke="#a5f3fc" strokeWidth="1.2" />
            <ellipse cx="-24" cy="-23" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.85" />

            {/* 3. Center Pass-Through Hold & Overhead Truss Bridge (x: -10 to +16) */}
            <rect x="-10" y="-14" width="26" height="5" rx="1" fill="#0f172a" stroke="#0891b2" strokeWidth="1.2" />
            <rect x="-10" y="-9" width="26" height="25" fill="#020617" stroke="#155e75" strokeWidth="1.2" />

            {/* 4. Hydraulic Ramp Door Folding Downward */}
            <line x1="-10" y1="14" x2="-22" y2="23" stroke="#06b6d4" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="-22" cy="23" r="1.8" fill="#22d3ee" />

            {/* 5. Starboard Slender Sensor Spire & Reactor Spine (x: +16 to +38, y: -38 to +16) */}
            <polygon
              points="16,-38 28,-38 38,-16 38,16 16,16"
              fill="#020617"
              stroke="#06b6d4"
              strokeWidth="1.8"
            />
            <line x1="22" y1="-38" x2="22" y2="-44" stroke="#a5f3fc" strokeWidth="2.0" />
            <path d="M17 -43 Q22 -40 27 -43" stroke="#22d3ee" strokeWidth="2.0" fill="none" />
            {/* Reactor Luminescent Rings */}
            <rect x="20" y="-10" width="14" height="4" rx="1" fill="#06b6d4" />
            <rect x="20" y="-2" width="14" height="4" rx="1" fill="#06b6d4" />

            {/* 6. Heavy Triple/Single Asymmetrical Thrusters */}
            <rect x="-34" y="16" width="20" height="7" rx="1" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
            <rect x="22" y="16" width="12" height="7" rx="1" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.2" />
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
              <line x1="-10" y1="10" x2="-22" y2="28" />
              <line x1="10" y1="10" x2="22" y2="28" />
            </g>
            <rect x="-26" y="27" width="8" height="3" rx="1" fill="#475569" stroke="#eab308" strokeWidth="1" />
            <rect x="18" y="27" width="8" height="3" rx="1" fill="#475569" stroke="#eab308" strokeWidth="1" />

            {/* Outrigger Pods */}
            <rect x="-24" y="2" width="8" height="20" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1.3" />
            <rect x="16" y="2" width="8" height="20" rx="2" fill="#1e293b" stroke="#eab308" strokeWidth="1.3" />

            {/* Gold Foil Core */}
            <polygon points="-12,4 -14,18 14,18 12,4" fill="url(#gold-foil)" stroke="#713f12" strokeWidth="1.2" />

            {/* Upper Stinger Cabin */}
            <polygon points="0,-27 13,-10 11,4 -11,4 -13,-10" fill="#1e293b" stroke="#eab308" strokeWidth="1.4" />
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

            {/* Swept Wings */}
            <polygon points="0,-22 25,12 18,18 -18,18 -25,12" fill="#1e293b" stroke="#06b6d4" strokeWidth="1.4" />
            {/* Needle Spine */}
            <polygon points="0,-32 8,-10 9,16 -9,16 -8,-10" fill="#0f172a" stroke="#67e8f9" strokeWidth="1.3" />
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

            {/* Stealth Diamond Hull */}
            <polygon points="0,-32 24,0 18,18 -18,18 -24,0" fill="#090d16" stroke="#a855f7" strokeWidth="1.6" />
            <line x1="0" y1="-32" x2="0" y2="18" stroke="#6b21a8" strokeWidth="1.0" />
            {/* Purple Slit Visor */}
            <polygon points="0,-18 6,-8 0,-4 -6,-8" fill="url(#visor-grad-spectre)" stroke="#e9d5ff" strokeWidth="1" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: ORION SURVEYOR (OR-300 Deep Space Scout)           */}
        {/* ========================================================= */}
        {modelId === 'orion' && (
          <g>
            <g stroke="#64748b" strokeWidth="2.2" strokeLinecap="round">
              <line x1="-15" y1="12" x2="-26" y2="30" />
              <line x1="15" y1="12" x2="26" y2="30" />
            </g>
            <rect x="-30" y="29" width="9" height="3.5" rx="1" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />
            <rect x="21" y="29" width="9" height="3.5" rx="1" fill="#334155" stroke="#38bdf8" strokeWidth="1.2" />

            {/* Side Booms */}
            <rect x="-25" y="-8" width="8" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.3" />
            <rect x="17" y="-8" width="8" height="24" rx="2" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.3" />
            <circle cx="-10" cy="8" r="4.5" fill="url(#xenon-tank-grad)" stroke="#0284c7" strokeWidth="1" />
            <circle cx="10" cy="8" r="4.5" fill="url(#xenon-tank-grad)" stroke="#0284c7" strokeWidth="1" />

            {/* Central Fuselage */}
            <polygon points="0,-32 14,-12 14,18 -14,18 -14,-12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.6" />
            <ellipse cx="0" cy="-14" rx="7" ry="5" fill="url(#visor-grad-orion)" stroke="#bae6fd" strokeWidth="1.2" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: VALKYRIE TACTICAL (VK-55 Combat Dropship)          */}
        {/* ========================================================= */}
        {modelId === 'valkyrie' && (
          <g>
            <g stroke="#475569" strokeWidth="2.5" strokeLinecap="round">
              <line x1="-16" y1="12" x2="-28" y2="30" />
              <line x1="16" y1="12" x2="28" y2="30" />
            </g>
            <rect x="-32" y="29" width="10" height="4" rx="1" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />
            <rect x="22" y="29" width="10" height="4" rx="1" fill="#ef4444" stroke="#991b1b" strokeWidth="1.2" />

            {/* Armored Outer Dropship */}
            <polygon points="0,-32 26,-6 22,20 -22,20 -26,-6" fill="#1e293b" stroke="#ef4444" strokeWidth="1.8" />
            <polygon points="0,-28 11,-10 9,10 -9,10 -11,-10" fill="#0f172a" stroke="#f87171" strokeWidth="1.3" />
            {/* Crimson Visor */}
            <polygon points="-6,-12 6,-12 4,-7 -4,-7" fill="url(#visor-grad-valkyrie)" stroke="#fca5a5" strokeWidth="1" />
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
