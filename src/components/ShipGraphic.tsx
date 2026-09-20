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
  const isLongCraft = modelId === 'eagle' || modelId === 'vulcan' || modelId === 'nebula' || modelId === 'orion' || modelId === 'valkyrie' || modelId === 'titan' || modelId === 'goliath' || modelId === 'behemoth' || modelId === 'mammoth' || modelId === 'juggernaut';
  const isEagle = modelId === 'eagle';
  const viewBox = (modelId === 'nebula' || modelId === 'orion' || modelId === 'valkyrie' || modelId === 'titan' || modelId === 'goliath')
    ? '-72 -26 144 54'
    : (modelId === 'behemoth'
      ? '-75 -42 150 68'
      : (modelId === 'mammoth'
        ? '-68 -56 140 98'
        : (modelId === 'juggernaut'
          ? '-96 -78 174 122'
          : (isLongCraft ? '-72 -24 144 52' : '-40 -40 80 80'))));

  const effectiveSize = size === undefined && !className ? 56 : size;
  const sizeStyle = effectiveSize
    ? {
        width: effectiveSize,
        height: isLongCraft
          ? Math.round(effectiveSize * (modelId === 'behemoth' ? 68 / 150 : (modelId === 'mammoth' ? 98 / 140 : (modelId === 'juggernaut' ? 122 / 174 : ((modelId === 'nebula' || modelId === 'orion' || modelId === 'valkyrie' || modelId === 'titan' || modelId === 'goliath') ? 54 / 144 : 52 / 144)))))
          : effectiveSize,
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
        className="w-full h-full drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] relative z-10 overflow-visible pointer-events-none"
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

          {/* Terra-Hopper (TH-01): Carbon Composite Blue Hull */}
          <linearGradient id="terra-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="25%" stopColor="#2563eb" />
            <stop offset="65%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          {/* Terra-Hopper: Structural Graphite Frame */}
          <linearGradient id="terra-frame-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Terra-Hopper: Hydrogen/Oxygen Metallic Tanks */}
          <linearGradient id="terra-tank-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f4" />
            <stop offset="25%" stopColor="#d6d3d1" />
            <stop offset="55%" stopColor="#a8a29e" />
            <stop offset="80%" stopColor="#78716c" />
            <stop offset="100%" stopColor="#44403c" />
          </linearGradient>

          {/* Terra-Hopper: Panoramic Cyan Visor */}
          <linearGradient id="terra-visor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="25%" stopColor="#38bdf8" />
            <stop offset="65%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Terra-Hopper: Corrugated Thruster Bell */}
          <linearGradient id="terra-bell-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="40%" stopColor="#475569" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Terra-Hopper: Thermal Underbelly Shielding */}
          <linearGradient id="terra-shield-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Terra-Hopper: Chrome Landing Gear Strut */}
          <linearGradient id="terra-strut-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="40%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Terra-Hopper: Ion/Plasma Thruster Plume Glow */}
          <linearGradient id="terra-ion-glow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
          </linearGradient>

          {/* Goliath Carrier (CT-950) Diagram-Matched Gradients */}
          <linearGradient id="goliath-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#334155" />
            <stop offset="85%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="goliath-red-armor" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>

          <linearGradient id="goliath-pod-casing" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="80%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="goliath-copper-lip" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="goliath-dark-plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="goliath-bay-interior" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="40%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="goliath-visor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5f3fc" />
            <stop offset="25%" stopColor="#38bdf8" />
            <stop offset="65%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <linearGradient id="goliath-ramp-bed" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="35%" stopColor="#475569" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <radialGradient id="goliath-thruster-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </radialGradient>
          <radialGradient id="goliath-thruster-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#f87171" />
            <stop offset="65%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>

          {/* Colonial Viper: Light Battleship Grey Hull */}
          <linearGradient id="viper-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Colonial Viper: Delta Wing Shader (same hull gradient) */}
          <linearGradient id="viper-wing-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="40%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Colonial Viper: Golden Laser Cannon Barrel */}
          <linearGradient id="viper-gun-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Colonial Viper: Twin Engine Nacelle Block */}
          <linearGradient id="viper-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475467" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Colonial Viper: Faceted Navy Canopy */}
          <linearGradient id="viper-canopy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Colonial Viper: Red Livery Accent */}
          <linearGradient id="viper-red-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Light Armor Hull */}
          <linearGradient id="wasp-hull-light-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Dark Armor / Wings */}
          <linearGradient id="wasp-hull-dark-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Horizontal Engine Pod Shader */}
          <linearGradient id="wasp-pod-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Inset Canopy Glass */}
          <linearGradient id="wasp-canopy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Orange Flank Accents */}
          <linearGradient id="wasp-orange-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Wasp Heavy Fighter: Yellow Fin / Tail Accents */}
          <linearGradient id="wasp-yellow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>

          {/* Kestrel Stunt: Carbon-Composite Hull */}
          <linearGradient id="kestrel-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="30%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Kestrel Stunt: Delta Wings & Canards */}
          <linearGradient id="kestrel-wing-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Kestrel Stunt: Electric Cyan Stunt Livery */}
          <linearGradient id="kestrel-cyan-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>

          {/* Kestrel Stunt: Cryo-Methane Turbopump Nacelles & Bells */}
          <linearGradient id="kestrel-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Kestrel Stunt: High-G Aerobatic Teardrop Canopy */}
          <linearGradient id="kestrel-canopy-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="25%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Kestrel Stunt: Titanium Landing Skids */}
          <linearGradient id="kestrel-skid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Spectre Stealth Transport: Matte Carbon RAM Composite Fuselage */}
          <linearGradient id="spectre-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="25%" stopColor="#0f172a" />
            <stop offset="65%" stopColor="#090d16" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Spectre Stealth Transport: Flanking Sponsons & Heavy-Lift Wings */}
          <linearGradient id="spectre-sponson-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="35%" stopColor="#1e1b4b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Spectre Stealth Transport: Cargo Bay / Rear Loading Ramp Door */}
          <linearGradient id="spectre-ramp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Spectre Stealth Transport: Luminescent Formation & Egress Strip Lighting */}
          <linearGradient id="spectre-plasma-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6b21a8" />
          </linearGradient>

          {/* Spectre Stealth Transport: 2D Heavy Vectoring Engine Nozzles */}
          <linearGradient id="spectre-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Spectre Stealth Transport: Command Bridge / Wide Flight Deck Canopy */}
          <linearGradient id="spectre-bridge-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="25%" stopColor="#c084fc" />
            <stop offset="65%" stopColor="#7e22ce" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>

          {/* Spectre Stealth Transport: Heavy Transport RAM Landing Skids */}
          <linearGradient id="spectre-foot-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Clairvoyant Heavy Dropship: Tactical Hull Gradients */}
          <linearGradient id="clair-hull-base" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#474d57" />
            <stop offset="35%" stopColor="#2d323b" />
            <stop offset="70%" stopColor="#1f2329" />
            <stop offset="100%" stopColor="#14171c" />
          </linearGradient>
          <linearGradient id="clair-cab-sand" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ebe8e1" />
            <stop offset="25%" stopColor="#dcd7cc" />
            <stop offset="60%" stopColor="#c2bcb0" />
            <stop offset="100%" stopColor="#938d81" />
          </linearGradient>
          <linearGradient id="clair-spine-cyl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="20%" stopColor="#94a3b8" />
            <stop offset="45%" stopColor="#475569" />
            <stop offset="80%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="clair-fin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="80%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="clair-vtol-bell" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="25%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="clair-vtol-housing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="clair-canopy-glass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="30%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
          <linearGradient id="clair-piston-chrome" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="clair-footpad-metal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Valkyrie Tactical Crimson Armored Hull */}
          <linearGradient id="valkyrie-crimson-hull" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="25%" stopColor="#991b1b" />
            <stop offset="65%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#4c0519" />
          </linearGradient>

          <linearGradient id="valkyrie-crimson-upper" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          <linearGradient id="valkyrie-crimson-accent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          {/* Valkyrie Dark Carbon Plates & Machinery */}
          <linearGradient id="valkyrie-carbon-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="35%" stopColor="#1e293b" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Valkyrie Cockpit Canopy Tint Glass */}
          <linearGradient id="valkyrie-canopy-tint" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#0284c7" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0.98" />
          </linearGradient>

          {/* Valkyrie Vectoring Engine Nozzle */}
          <linearGradient id="valkyrie-nozzle-petal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="30%" stopColor="#334155" />
            <stop offset="70%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <radialGradient id="valkyrie-nozzle-throat" cx="60%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#0284c7" />
            <stop offset="75%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Valkyrie Winged Emblem Gold */}
          <linearGradient id="valkyrie-gold-crest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Valkyrie VTOL Thruster Bell */}
          <linearGradient id="valkyrie-vtol-bell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="25%" stopColor="#475569" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="75%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
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

          {/* Aegis Vulcan Support Transport Shaders */}
          <linearGradient id="vulcan-white-cab" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f1f5f9" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="vulcan-olive-plate" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#485942" />
            <stop offset="25%" stopColor="#3c4a36" />
            <stop offset="75%" stopColor="#2c3727" />
            <stop offset="100%" stopColor="#1f271c" />
          </linearGradient>

          <linearGradient id="vulcan-olive-flank" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#506249" />
            <stop offset="50%" stopColor="#3c4a36" />
            <stop offset="100%" stopColor="#2a3426" />
          </linearGradient>

          <linearGradient id="vulcan-mech-bay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#242c23" />
            <stop offset="50%" stopColor="#181e17" />
            <stop offset="100%" stopColor="#0f140f" />
          </linearGradient>

          <linearGradient id="vulcan-red-stripe" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="40%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>

          <linearGradient id="vulcan-belly-tank" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#384335" />
            <stop offset="35%" stopColor="#2a3328" />
            <stop offset="75%" stopColor="#1c221b" />
            <stop offset="100%" stopColor="#101410" />
          </linearGradient>

          <linearGradient id="vulcan-chrome" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="35%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          <linearGradient id="vulcan-footpad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="vulcan-bell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="30%" stopColor="#64748b" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <pattern id="vulcan-hazard" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="3" height="6" fill="#eab308" />
            <rect x="3" y="0" width="3" height="6" fill="#1e293b" />
          </pattern>

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

          {/* Juggernaut Heavy Lifter Shaders & Patterns */}
          <pattern id="juggernaut-hazard" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="4" height="8" fill="#f59e0b" />
            <rect x="4" y="0" width="4" height="8" fill="#0f172a" />
          </pattern>

          <linearGradient id="juggernaut-hull-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#91A878" />
            <stop offset="30%" stopColor="#6D8558" />
            <stop offset="70%" stopColor="#4C633F" />
            <stop offset="100%" stopColor="#344735" />
          </linearGradient>

          <linearGradient id="juggernaut-armor-facet" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="45%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="juggernaut-thruster-bell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="35%" stopColor="#475569" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <radialGradient id="juggernaut-plasma-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#34d399" />
            <stop offset="75%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </radialGradient>

          <linearGradient id="juggernaut-docking-beam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
          </linearGradient>

          {/* Nebula Starchaser NS-709 Interstellar Cruiser Gradients */}
          <linearGradient id="nebula-hull-purple" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#805ad5" />
            <stop offset="25%" stopColor="#6b46c1" />
            <stop offset="70%" stopColor="#44337a" />
            <stop offset="100%" stopColor="#2d1b69" />
          </linearGradient>

          <linearGradient id="nebula-shroud-upper" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9f7aea" />
            <stop offset="40%" stopColor="#6b46c1" />
            <stop offset="100%" stopColor="#3c2468" />
          </linearGradient>

          <linearGradient id="nebula-shroud-lower" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#44337a" />
            <stop offset="60%" stopColor="#2d1b69" />
            <stop offset="100%" stopColor="#180e38" />
          </linearGradient>

          <linearGradient id="nebula-nameplate-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a0f2e" />
            <stop offset="100%" stopColor="#120822" />
          </linearGradient>

          <linearGradient id="nebula-bridge-glass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="35%" stopColor="#0284c7" />
            <stop offset="75%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          <linearGradient id="nebula-engine-main" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f0a18" />
            <stop offset="30%" stopColor="#2e2440" />
            <stop offset="70%" stopColor="#473860" />
            <stop offset="100%" stopColor="#191224" />
          </linearGradient>

          <linearGradient id="nebula-gold-crescent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Vanguard Exoship (VB-Exo Crusader) Shaders */}
          <linearGradient id="vanguard-hull-gold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f5b938" />
            <stop offset="50%" stopColor="#e5a823" />
            <stop offset="100%" stopColor="#c88617" />
          </linearGradient>

          <linearGradient id="vanguard-hull-facet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b87b14" />
            <stop offset="50%" stopColor="#d99920" />
            <stop offset="100%" stopColor="#94600e" />
          </linearGradient>

          <radialGradient id="vanguard-window-glass" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#7ab0d2" />
            <stop offset="50%" stopColor="#4a7694" />
            <stop offset="100%" stopColor="#2c4d63" />
          </radialGradient>

          <radialGradient id="vanguard-iris-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#78350f" />
          </radialGradient>

          <linearGradient id="vanguard-copper-tank" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#853616" />
            <stop offset="35%" stopColor="#d96a3b" />
            <stop offset="55%" stopColor="#ea875a" />
            <stop offset="85%" stopColor="#a6441e" />
            <stop offset="100%" stopColor="#5c1d08" />
          </linearGradient>

          <linearGradient id="vanguard-avionics" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#52789c" />
            <stop offset="50%" stopColor="#3d6082" />
            <stop offset="100%" stopColor="#2b4763" />
          </linearGradient>

          <linearGradient id="vanguard-thruster-bell" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="35%" stopColor="#64748b" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="vanguard-dish-pad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e5a823" />
            <stop offset="60%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          {/* Titan Behemoth Shaders */}
          <linearGradient id="titan-sponson-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#f1f5f9" />
            <stop offset="65%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="titan-reactor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="titan-avionics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="titan-cockpit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          <linearGradient id="titan-bay-bg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="titan-nozzle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="titan-ramp-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="titan-bay-light-wash" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#fef08a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="titan-beacon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>

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
          <g id="titan-behemoth-svg">
            {/* 1. Far-side landing gear & ground contact shadows */}
            <rect x="-36" y="20.8" width="8" height="1.8" fill="#1e293b" rx="0.5" />
            <line x1="-32" y1="14" x2="-32" y2="21" stroke="#1e293b" strokeWidth="1.8" />
            <rect x="26" y="20.8" width="8" height="1.8" fill="#1e293b" rx="0.5" />
            <line x1="30" y1="14" x2="30" y2="21" stroke="#1e293b" strokeWidth="1.8" />

            {/* 2. Main Armored Fuselage Hull (Titanium-Aluminum Alloy) */}
            <path
              d="M 64,-2 L 58,-6 L 46,-11 L 38,-11 L 34,-14 L 14,-14 L 10,-11 L -20,-11 L -24,-13 L -44,-13 L -58,-10 L -66,-7 L -66,3 L -56,11 L -40,11 L -20,11 L 16,11 L 40,11 L 54,7 L 64,1 Z"
              fill="url(#titan-hull-grad)"
              stroke="#334155"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 3. Aft Propulsion & Engine Cowling (Left Module, x = -66 to -44) */}
            <path
              d="M -65,-5 L -50,-5 L -46,5 L -56,9 L -65,2 Z"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            {/* Lower exhaust louver vents */}
            <rect x="-62" y="1" width="7" height="1.2" fill="#0f172a" rx="0.3" />
            <rect x="-62" y="3.2" width="7" height="1.2" fill="#0f172a" rx="0.3" />
            <rect x="-62" y="5.4" width="7" height="1.2" fill="#0f172a" rx="0.3" />
            <rect x="-62" y="7.6" width="7" height="1.2" fill="#0f172a" rx="0.3" />

            {/* TB-01 Stencil */}
            <text x="-63" y="-0.5" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="monospace" letterSpacing="0.5">
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
            <path d="M -38,-11 L -36,-15 L -24,-15 L -22,-11 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.8" />
            <rect x="-35" y="-14.5" width="9" height="3" fill="#0f172a" rx="0.5" />
            <line x1="-34" y1="-14.5" x2="-34" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-32" y1="-14.5" x2="-32" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-30" y1="-14.5" x2="-30" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-28" y1="-14.5" x2="-28" y2="-11.5" stroke="#64748b" strokeWidth="0.5" />

            {/* Crew Quarters Window Louvers */}
            <rect x="-20" y="-9.5" width="6" height="4.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.6" rx="0.5" />
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
            <rect x="36.5" y="-0.5" width="4.5" height="7.5" fill="#1e293b" stroke="#334155" strokeWidth="0.8" rx="1" />
            <rect x="37.5" y="0.5" width="2.5" height="5.5" fill="#020617" rx="0.5" />

            {/* 6. Command Cockpit (Crew of 6) */}
            <path d="M 44,-10.5 L 56,-6 L 63,-1.5 L 63,2.5 L 54,6.5 L 44,6.5 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="0.9" />
            <path d="M 48,-8 L 57,-4.5 L 61.5,-0.5 L 55,0.5 L 47,-3 Z" fill="url(#titan-cockpit-grad)" stroke="#1c1917" strokeWidth="0.8" />
            <line x1="53" y1="-6" x2="51" y2="-1.5" stroke="#1c1917" strokeWidth="0.7" />
            <line x1="58" y1="-4" x2="56" y2="0.2" stroke="#1c1917" strokeWidth="0.7" />
            <circle cx="52" cy="-3.5" r="1.2" fill="#18181b" />
            <circle cx="57" cy="-1.8" r="1.0" fill="#18181b" />
            <line x1="63" y1="-1.5" x2="66.5" y2="-1.5" stroke="#94a3b8" strokeWidth="0.7" strokeLinecap="round" />

            {/* Chin FLIR Sensor Turret Ball */}
            <circle cx="48" cy="9.5" r="2.2" fill="#1e293b" stroke="#475569" strokeWidth="0.7" />
            <circle cx="49.2" cy="9.5" r="0.8" fill="#38bdf8" />

            {/* 7. Sponson Wings & Stabilizers */}
            <path d="M -47,-1 L -24,-1 L -28,8 L -44,8 Z" fill="url(#titan-sponson-grad)" stroke="#334155" strokeWidth="0.8" />
            <circle cx="-36" cy="3.5" r="2.5" fill="#f1f5f9" />
            <circle cx="-36" cy="3.5" r="1.6" fill="#0284c7" />
            <circle cx="-36" cy="3.5" r="0.8" fill="#f59e0b" />

            <path d="M 18,-1 L 37,-1 L 34,8 L 19,8 Z" fill="url(#titan-sponson-grad)" stroke="#334155" strokeWidth="0.8" />

            {/* 8. Underslung Hydrogen Fuel Tanks */}
            <rect x="-18" y="11" width="34" height="2.8" fill="#334155" stroke="#475569" strokeWidth="0.7" rx="1.0" />
            <line x1="-10" y1="11" x2="-10" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="0" y1="11" x2="0" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />
            <line x1="8" y1="11" x2="8" y2="13.8" stroke="#94a3b8" strokeWidth="0.5" />

            {/* 9. Dual VTOL Lift Pods (Aft & Forward, with Dual Nozzles each) */}
            {/* Aft Lift Pod */}
            <rect x="-39" y="9" width="14" height="6" fill="#334155" stroke="#1e293b" strokeWidth="0.8" rx="1.2" />
            <polygon points="-38.5,15 -33.5,15 -32.2,19 -39.8,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="-36" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />
            <polygon points="-30.5,15 -25.5,15 -24.2,19 -31.8,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="-28" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />

            {/* Forward Lift Pod */}
            <rect x="23" y="9" width="14" height="6" fill="#334155" stroke="#1e293b" strokeWidth="0.8" rx="1.2" />
            <polygon points="23.5,15 28.5,15 29.8,19 22.2,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="26" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />
            <polygon points="31.5,15 36.5,15 37.8,19 30.2,19" fill="url(#titan-nozzle-grad)" stroke="#0f172a" strokeWidth="0.7" />
            <ellipse cx="34" cy="19" rx="3.2" ry="0.9" fill="#f59e0b" />

            {/* 10. Primary Heavy Industrial Landing Gear */}
            {/* Aft Gear */}
            <line x1="-32" y1="15" x2="-32" y2="18.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="-32" y1="18" x2="-32" y2="21" stroke="#f1f5f9" strokeWidth="1.4" />
            <rect x="-36.5" y="20.5" width="9" height="2.2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" rx="0.8" />
            <line x1="-35" y1="20.5" x2="-35" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-33" y1="20.5" x2="-33" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-31" y1="20.5" x2="-31" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="-29" y1="20.5" x2="-29" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />

            {/* Forward Gear */}
            <line x1="30" y1="15" x2="30" y2="18.5" stroke="#334155" strokeWidth="2.4" />
            <line x1="30" y1="18" x2="30" y2="21" stroke="#f1f5f9" strokeWidth="1.4" />
            <rect x="25.5" y="20.5" width="9" height="2.2" fill="#475569" stroke="#0f172a" strokeWidth="0.8" rx="0.8" />
            <line x1="27" y1="20.5" x2="27" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="29" y1="20.5" x2="29" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="31" y1="20.5" x2="31" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />
            <line x1="33" y1="20.5" x2="33" y2="22.5" stroke="#1e293b" strokeWidth="0.5" />

            {/* 11. CENTRAL HEAVY VEHICLE & CARGO HANGAR BAY (x = -20 to 16, y = -6 to 11) */}
            {/* Interior back wall bulkhead */}
            <rect x="-20" y="-6" width="36" height="17" fill="url(#titan-bay-bg)" stroke="#0f172a" strokeWidth="1.0" />
            <line x1="-14" y1="-6" x2="-14" y2="11" stroke="#334155" strokeWidth="0.8" />
            <line x1="-8" y1="-6" x2="-8" y2="11" stroke="#334155" strokeWidth="0.8" />
            <line x1="-2" y1="-6" x2="-2" y2="11" stroke="#334155" strokeWidth="0.8" />
            <line x1="4" y1="-6" x2="4" y2="11" stroke="#334155" strokeWidth="0.8" />
            <line x1="10" y1="-6" x2="10" y2="11" stroke="#334155" strokeWidth="0.8" />

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

            {/* Stored Cargo: Supply Crates & Pods */}
            <rect x="-5" y="2" width="6" height="8.8" fill="#334155" stroke="#1e293b" strokeWidth="0.6" />
            <line x1="-5" y1="2" x2="1" y2="10.8" stroke="#64748b" strokeWidth="0.5" />
            <line x1="-5" y1="10.8" x2="1" y2="2" stroke="#64748b" strokeWidth="0.5" />

            <rect x="4" y="3" width="5" height="7.8" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
            <rect x="9.5" y="4.5" width="5" height="6.3" fill="#475569" stroke="#1e293b" strokeWidth="0.6" />

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
              stroke="#0f172a"
              strokeWidth="1.0"
              strokeLinejoin="round"
            />

            {/* Longitudinal vehicle wheel guidance ribs */}
            <line x1="-13.5" y1="11" x2="-15.5" y2="20.5" stroke="#64748b" strokeWidth="0.8" />
            <line x1="-7.8" y1="11" x2="-8.9" y2="20.5" stroke="#64748b" strokeWidth="0.8" />
            <line x1="-2" y1="11" x2="-2.25" y2="20.5" stroke="#64748b" strokeWidth="0.8" />
            <line x1="3.8" y1="11" x2="4.4" y2="20.5" stroke="#64748b" strokeWidth="0.8" />
            <line x1="9.5" y1="11" x2="11" y2="20.5" stroke="#64748b" strokeWidth="0.8" />

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
        )}

        {/* ========================================================= */}
        {/* MODEL: COLONIAL VIPER (Mk II Fleet Interceptor)          */}
        {/* ========================================================= */}
                {modelId === 'viper' && (
          <g>
            {/* 1. Landing Gear — Dual-Strut Legs & Isolated Footpads */}
            <g stroke="#475467" strokeWidth="1.6" strokeLinecap="round" fill="none">
              <line x1="-14" y1="10" x2="-22" y2="29" />
              <line x1="14" y1="10" x2="22" y2="29" />
            </g>
            <g stroke="#334155" strokeWidth="1.0" strokeLinecap="round" fill="none">
              <line x1="-7" y1="15" x2="-22" y2="29" />
              <line x1="7" y1="15" x2="22" y2="29" />
            </g>
            <ellipse cx="-22" cy="29.5" rx="4.5" ry="1.2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.6" />
            <ellipse cx="22" cy="29.5" rx="4.5" ry="1.2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.6" />

            {/* 2. Wings — Light Grey Deltas with Curved Cutouts near Cannon Mounts */}
            <path
              d="M-8.5 16.5 L-32 16.5 L-32 -3 L-16 -3 C-16 2 -14 7 -10.5 7 L-8.5 7 Z"
              fill="url(#viper-wing-grad)"
              stroke="#334155"
              strokeWidth="0.75"
            />
            <path
              d="M8.5 16.5 L32 16.5 L32 -3 L16 -3 C16 2 14 7 10.5 7 L8.5 7 Z"
              fill="url(#viper-wing-grad)"
              stroke="#334155"
              strokeWidth="0.75"
            />

            {/* 3. Center Fuselage & Needle Nose — Light Grey Hull */}
            <path
              d="M0 -38 L3.8 -34 L4.2 -8 L6.8 -2 L6.8 17 L0 20 L-6.8 17 L-6.8 -2 L-4.2 -8 L-3.8 -34 Z"
              fill="url(#viper-hull-grad)"
              stroke="#334155"
              strokeWidth="0.75"
            />
            <path d="M0 -38 L3.8 -34 L-3.8 -34 Z" fill="#475467" stroke="#334155" strokeWidth="0.4" />

            {/* 4. Engine Nacelles & Nozzles (center nozzle is static detail only) */}
            <path d="M-18.5 1 L-8.5 1 L-8 18 L-18.5 18 Z" fill="url(#viper-nozzle-grad)" stroke="#1e293b" strokeWidth="0.6" />
            <path d="M8.5 1 L18.5 1 L18.5 18 L8 18 Z" fill="url(#viper-nozzle-grad)" stroke="#1e293b" strokeWidth="0.6" />
            <path d="M-18 18 L-9 18 L-10 24 L-17 24 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />
            <path d="M-4.5 19 L4.5 19 L3.5 25 L-3.5 25 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />
            <path d="M9 18 L18 18 L17 24 L10 24 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />

            {/* 5. Faceted BSG Canopy — Dark Navy Glass Panes */}
            <path d="M-4.5 -8 L4.5 -8 L5.5 3 L0 5.5 L-5.5 3 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
            <g stroke="#38bdf8" strokeWidth="0.4" strokeOpacity="0.9">
              <path d="M-3.2 -7.2 L3.2 -7.2 L2.2 -3 L-2.2 -3 Z" fill="url(#viper-canopy-grad)" />
              <path d="M-3.2 -7.2 L-2.2 -3 L-4.5 2 L-4.8 -2 Z" fill="url(#viper-canopy-grad)" />
              <path d="M3.2 -7.2 L2.2 -3 L4.5 2 L4.8 -2 Z" fill="url(#viper-canopy-grad)" />
              <path d="M-2.2 -3 L0 -3 L0 4 L-4.5 2 Z" fill="url(#viper-canopy-grad)" />
              <path d="M2.2 -3 L0 -3 L0 4 L4.5 2 Z" fill="url(#viper-canopy-grad)" />
            </g>

            {/* 6. Livery & Details (source paint order — panel seams OVER stripes) */}
            {/* Red liver stripes — separated above/below the canopy */}
            <path d="M-1.8 -33.5 L1.8 -33.5 L1.8 -8 L-1.8 -8 Z" fill="url(#viper-red-grad)" />
            <path d="M-1.8 5.5 L1.8 5.5 L2.2 16 L-2.2 16 Z" fill="url(#viper-red-grad)" />

            {/* Wing red markings (contoured around the wing cutouts) */}
            <path
              d="M-6.5 -3 L-31.5 -3 L-31.5 0 L-24 0 C-17 0 -14 3 -12 6 L-8.5 6 L-8.5 8.5 L-11.5 8.5 C-14 6 -17 2.5 -24 2.5 L-28.5 2.5 L-28.5 16.5 L-31.5 16.5 Z"
              fill="url(#viper-red-grad)"
            />
            <path d="M-31.5 14 L-8.5 14 L-8.5 16.5 L-31.5 16.5 Z" fill="url(#viper-red-grad)" />
            <path
              d="M6.5 -3 L31.5 -3 L31.5 0 L24 0 C17 0 14 3 12 6 L8.5 6 L8.5 8.5 L11.5 8.5 C14 6 17 2.5 24 2.5 L28.5 2.5 L28.5 16.5 L31.5 16.5 Z"
              fill="url(#viper-red-grad)"
            />
            <path d="M31.5 14 L8.5 14 L8.5 16.5 L31.5 16.5 Z" fill="url(#viper-red-grad)" />

            {/* Four red status squares per engine block */}
            <g fill="url(#viper-red-grad)" stroke="#7f1d1d" strokeWidth="0.3">
              <rect x="-16.2" y="3" width="2" height="2" />
              <rect x="-16.2" y="6" width="2" height="2" />
              <rect x="-16.2" y="9" width="2" height="2" />
              <rect x="-16.2" y="12" width="2" height="2" />
              <rect x="14.2" y="3" width="2" height="2" />
              <rect x="14.2" y="6" width="2" height="2" />
              <rect x="14.2" y="9" width="2" height="2" />
              <rect x="14.2" y="12" width="2" height="2" />
            </g>

            {/* Wing-mounted laser cannons (inside the wing cutout gaps) */}
            <rect x="-11.2" y="-8" width="2.4" height="14" rx="0.4" fill="url(#viper-nozzle-grad)" stroke="#1e293b" strokeWidth="0.4" />
            <rect x="8.8" y="-8" width="2.4" height="14" rx="0.4" fill="url(#viper-nozzle-grad)" stroke="#1e293b" strokeWidth="0.4" />
            <rect x="-10.7" y="-13" width="1.4" height="5" fill="url(#viper-nozzle-grad)" />
            <rect x="9.3" y="-13" width="1.4" height="5" fill="url(#viper-nozzle-grad)" />
            <rect x="-10.4" y="-23" width="0.8" height="10" fill="url(#viper-gun-grad)" stroke="#744210" strokeWidth="0.3" />
            <rect x="9.6" y="-23" width="0.8" height="10" fill="url(#viper-gun-grad)" stroke="#744210" strokeWidth="0.3" />
            <path
              d="M-10.4 -20 L-9.6 -20 M-10.4 -18 L-9.6 -18 M-10.4 -16 L-9.6 -16 M9.6 -20 L10.4 -20 M9.6 -18 L10.4 -18 M9.6 -16 L10.4 -16"
              stroke="#451a03"
              strokeWidth="0.4"
              fill="none"
            />

            {/* Engine intake grills */}
            <path
              d="M-13.5 3 L-9 3 M-13.5 5.5 L-9 5.5 M-13.5 8 L-9 8 M-13.5 10.5 L-9 10.5 M-13.5 13 L-9 13 M9 3 L13.5 3 M9 5.5 L13.5 5.5 M9 8 L13.5 8 M9 10.5 L13.5 10.5 M9 13 L13.5 13"
              stroke="#64748b"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Panel seams — kept OVER the stripes (source order) */}
            <path
              d="M-3.7 -28 L3.7 -28 M-3.9 -20 L3.9 -20 M-4.1 -14 L4.1 -14"
              stroke="#94a3b8"
              strokeWidth="0.4"
              fill="none"
            />

            {/* Wing surface circular access ports */}
            <circle cx="-23" cy="7" r="1.2" fill="none" stroke="#64748b" strokeWidth="0.4" />
            <circle cx="23" cy="7" r="1.2" fill="none" stroke="#64748b" strokeWidth="0.4" />
            <circle cx="-23" cy="7" r="0.3" fill="#64748b" />
            <circle cx="23" cy="7" r="0.3" fill="#64748b" />

            {/* "000" identification markings */}
            <g fill="#334155">
              <rect x="-30.5" y="14.5" width="0.6" height="1.2" />
              <rect x="-29.6" y="14.5" width="0.6" height="1.2" />
              <rect x="-28.7" y="14.5" width="0.6" height="1.2" />
              <rect x="27.3" y="14.5" width="0.6" height="1.2" />
              <rect x="28.2" y="14.5" width="0.6" height="1.2" />
              <rect x="29.1" y="14.5" width="0.6" height="1.2" />
            </g>

            {/* Navigation lights */}
            <circle cx="-31.5" cy="-2.5" r="0.7" fill="#ef4444" />
            <circle cx="31.5" cy="-2.5" r="0.7" fill="#22c55e" />
          </g>
        )}

        {/* MODEL: CLAIRVOYANT DROPSHIP (12-X Nomadic Heavy Dropship) */}
        {/* ========================================================= */}
        {modelId === 'aegis' && (
          <g>
            {/* 1. FAR-SIDE / BACKGROUND STRUCTURES */}
            <g id="clairvoyant-farside">
              {/* Far-side canted vertical fin */}
              <polygon points="21,-14 26,-30 31,-30 33,-13" fill="#1e242d" stroke="#0f172a" strokeWidth="0.8" />
              <line x1="26" y1="-30" x2="31" y2="-30" stroke="#eab308" strokeWidth="1.2" />

              {/* Far-side VTOL nacelle pylon and bell (shadowed) */}
              <polygon points="-16,7 -12,7 -10,13 -16,13" fill="#12161b" stroke="#080b0e" strokeWidth="0.8" />
              <path d="M -15,13 L -11,13 L -9.5,17 L -16.5,17 Z" fill="#181e25" stroke="#080b0e" strokeWidth="0.8" />
              <ellipse cx="-13" cy="17" rx="3.5" ry="1.0" fill="#080b0e" />

              <polygon points="14,7 18,7 20,13 14,13" fill="#12161b" stroke="#080b0e" strokeWidth="0.8" />
              <path d="M 15,13 L 19,13 L 20.5,17 L 13.5,17 Z" fill="#181e25" stroke="#080b0e" strokeWidth="0.8" />
              <ellipse cx="17" cy="17" rx="3.5" ry="1.0" fill="#080b0e" />

              {/* Far-side low landing leg struts & pads (squat, close to ground) */}
              <line x1="-24" y1="11" x2="-25.5" y2="18.5" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
              <polygon points="-28,18.5 -22,18.5 -23,20 -29,20" fill="#111827" />

              <line x1="21" y1="11" x2="20.5" y2="18.5" stroke="#1f2937" strokeWidth="2.2" strokeLinecap="round" />
              <polygon points="16.5,18.5 22.5,18.5 21.5,20 15.5,20" fill="#111827" />
            </g>

            {/* 2. MAIN HULL & FUSELAGE (Side Profile) */}
            <g id="clairvoyant-hull">
              {/* Main Aft & Mid Fuselage Shell */}
              <path d="M -22,-14 L 12,-14 L 20,-11 L 34,-9 L 36,-3 L 36,5 L 32,10 L 18,13 L -4,14 L -16,14 L -22,10 Z"
                    fill="url(#clair-hull-base)" stroke="#0b0e12" strokeWidth="1.2" />

              {/* Aft Tail Boom Extension & Rear Thruster Casing */}
              <path d="M 28,-9 L 36,-9 L 37,-6 L 37,3 L 35,7 L 28,8 Z"
                    fill="#1e232a" stroke="#0f172a" strokeWidth="1.0" />
              <rect x="36.5" y="-5.5" width="2" height="9" rx="0.5"
                    fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <line x1="37" y1="-2.5" x2="38.5" y2="-2.5" stroke="#64748b" strokeWidth="0.6" />
              <line x1="37" y1="0.5" x2="38.5" y2="0.5" stroke="#64748b" strokeWidth="0.6" />

              {/* Top Cylindrical Power / Reactor Spine */}
              <rect x="-20" y="-17.5" width="34" height="5.5"
                    fill="url(#clair-spine-cyl)" stroke="#0f172a" strokeWidth="1.0" />
              <g stroke="#0f172a" strokeWidth="0.9">
                <line x1="-16" y1="-17.5" x2="-16" y2="-12" />
                <line x1="-12" y1="-17.5" x2="-12" y2="-12" />
                <line x1="-8" y1="-17.5" x2="-8" y2="-12" />
                <line x1="-4" y1="-17.5" x2="-4" y2="-12" />
                <line x1="0" y1="-17.5" x2="0" y2="-12" />
                <line x1="4" y1="-17.5" x2="4" y2="-12" />
                <line x1="8" y1="-17.5" x2="8" y2="-12" />
                <line x1="12" y1="-17.5" x2="12" y2="-12" />
              </g>
              <line x1="-19" y1="-16" x2="13" y2="-16" stroke="#cbd5e1" strokeWidth="0.6" strokeOpacity="0.8" />

              {/* Forward Dorsal Turret / Comms Housing Blister */}
              <path d="M -17,-17.5 C -17,-20.5 -11,-20.5 -11,-17.5 Z"
                    fill="#334155" stroke="#0f172a" strokeWidth="0.9" />
              <circle cx="-14" cy="-18.2" r="1.1" fill="#64748b" />

              {/* Near-Side Canted Vertical Tail Fin */}
              <polygon points="23,-11 27.5,-31 33.5,-31 35,-10"
                       fill="url(#clair-fin-grad)" stroke="#0b0e12" strokeWidth="1.2" />
              <polygon points="32.5,-30.5 33.3,-30.5 34.7,-10 33.7,-10"
                       fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
              <polygon points="27.8,-30.5 32.8,-30.5 32.4,-28.5 28.2,-28.5" fill="#eab308" />
              <polygon points="28.4,-27.2 33.1,-27.2 32.8,-25.5 28.8,-25.5" fill="#eab308" />
              <circle cx="30.5" cy="-19" r="2.8" fill="none" stroke="#eab308" strokeWidth="0.7" />
              <line x1="30.5" y1="-22.5" x2="30.5" y2="-15.5" stroke="#eab308" strokeWidth="0.5" />
              <line x1="27" y1="-19" x2="34" y2="-19" stroke="#eab308" strokeWidth="0.5" />
              <circle cx="30.5" cy="-19" r="0.8" fill="#eab308" />

              {/* Mid-Fuselage Recessed Cargo/Troop Access Door */}
              <rect x="-4" y="-7" width="14" height="17" rx="1.5"
                    fill="#1c2026" stroke="#0b0e12" strokeWidth="1.0" />
              <rect x="-2.5" y="-5.5" width="11" height="14" rx="0.8"
                    fill="#292e37" stroke="#374151" strokeWidth="0.7" />
              <line x1="0" y1="-4" x2="0" y2="6" stroke="#111827" strokeWidth="1.2" />
              <line x1="6" y1="-4" x2="6" y2="6" stroke="#111827" strokeWidth="1.2" />
              <line x1="0" y1="1" x2="6" y2="1" stroke="#111827" strokeWidth="1.2" />
              <rect x="5" y="-3.5" width="1.8" height="1.0" fill="#eab308" />
              <line x1="-1" y1="8.5" x2="7" y2="8.5" stroke="#6b7280" strokeWidth="0.8" />
              <line x1="-1" y1="10.5" x2="7" y2="10.5" stroke="#6b7280" strokeWidth="0.8" />

              {/* Thermal Heat Dissipation Louvers */}
              <g stroke="#0f172a" strokeWidth="0.8">
                <line x1="12" y1="-5" x2="19" y2="-5" />
                <line x1="12" y1="-3" x2="19" y2="-3" />
                <line x1="12" y1="-1" x2="19" y2="-1" />
                <line x1="12" y1="1" x2="19" y2="1" />
                <line x1="12" y1="3" x2="19" y2="3" />
              </g>

              {/* Forward Ballistic Ceramic Armor Cabin (Light Sand/Beige) */}
              <path d="M -22,-14 L -11,-14 L -8,-7 L -9,6 L -18,12 L -27,9 L -34,4 L -36,0 L -31,-7 Z"
                    fill="url(#clair-cab-sand)" stroke="#0b0e12" strokeWidth="1.3" />

              {/* Forward Lower Chin Sensor Housing */}
              <polygon points="-36,0 -37.5,3 -31,7 -27,9 -34,4"
                       fill="#78716c" stroke="#0f172a" strokeWidth="0.8" />
              <line x1="-36.5" y1="2" x2="-39.2" y2="2.5" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="-36.5" y1="2" x2="-39.2" y2="2.5" stroke="#cbd5e1" strokeWidth="0.6" />
              <circle cx="-35" cy="2" r="1.1" fill="#ef4444" />
              <circle cx="-35" cy="2" r="0.5" fill="#fecaca" />

              {/* Circular Tactical Access Port on Cab */}
              <circle cx="-15" cy="-2" r="2.6" fill="#78716c" stroke="#0f172a" strokeWidth="0.8" />
              <circle cx="-15" cy="-2" r="1.4" fill="#a8a29e" />
              <circle cx="-15" cy="-2" r="0.5" fill="#0f172a" />

              {/* Ceramic Plate Structural Seam Lines */}
              <line x1="-22" y1="-14" x2="-18" y2="12" stroke="#a8a29e" strokeWidth="0.8" />
              <line x1="-31" y1="-7" x2="-22" y2="3" stroke="#57534e" strokeWidth="0.8" />
            </g>

            {/* 3. FACETED COCKPIT & CANOPY */}
            <g id="clairvoyant-canopy">
              <path d="M -31,-7 L -22,-14 L -17,-14 L -20,-7 L -26,-2 L -31,-3 Z"
                    fill="#0f172a" stroke="#0b0e12" strokeWidth="1.4" />
              <polygon points="-30.5,-6.5 -25,-12.5 -23.5,-12.5 -28,-6.2"
                       fill="url(#clair-canopy-glass)" stroke="#0369a1" strokeWidth="0.5" />
              <polygon points="-29.8,-7.5 -25.2,-12.3 -24.2,-12.3 -28.5,-7.2"
                       fill="#e0f2fe" opacity={0.75} />
              <polygon points="-23.5,-12.8 -18,-12.8 -19.5,-9.5 -24.5,-9.5"
                       fill="url(#clair-canopy-glass)" stroke="#0369a1" strokeWidth="0.5" />
              <polygon points="-22.8,-12.4 -18.6,-12.4 -19.7,-10.2 -23.6,-10.2"
                       fill="#e0f2fe" opacity={0.6} />
              <polygon points="-27.5,-5.5 -23.5,-8.5 -20.5,-6.5 -25.5,-2.8"
                       fill="url(#clair-canopy-glass)" stroke="#0369a1" strokeWidth="0.5" />
              <polygon points="-26.5,-5.2 -23.5,-7.5 -21.8,-6.2 -25.2,-3.5"
                       fill="#38bdf8" opacity={0.5} />
              <line x1="-24" y1="-13" x2="-28.5" y2="-6.2" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="-24" y1="-9.5" x2="-20" y2="-7" stroke="#0f172a" strokeWidth="1.0" />
              <line x1="-27.5" y1="-5.5" x2="-20.5" y2="-6.5" stroke="#0f172a" strokeWidth="1.0" />
            </g>

            {/* 4. VTOL LIFT ENGINE NACELLES (LOW PROFILE BELOW HULL) */}
            <g id="clairvoyant-vtol-left">
              <path d="M -17,9 L -11,9 L -10,13 L -18,13 Z"
                    fill="url(#clair-vtol-housing)" stroke="#0f172a" strokeWidth="1.0" />
              <circle cx="-14" cy="11.5" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <circle cx="-14" cy="11.5" r="1.0" fill="#94a3b8" />
              <path d="M -17,13 L -11,13 L -9.5,17.5 L -18.5,17.5 Z"
                    fill="url(#clair-vtol-bell)" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="-16.5" y1="14.5" x2="-11.5" y2="14.5" stroke="#334155" strokeWidth="0.8" />
              <line x1="-17.5" y1="16.2" x2="-10.5" y2="16.2" stroke="#1e293b" strokeWidth="0.8" />
              <polygon points="-18.5,17.5 -9.5,17.5 -10.2,18.5 -17.8,18.5"
                       fill="#090d12" stroke="#0f172a" strokeWidth="0.8" />
              <ellipse cx="-14" cy="18.5" rx="3.8" ry="0.9" fill="#0f172a" />
              <ellipse cx="-14" cy="18.3" rx="2.2" ry="0.5" fill="#f59e0b" opacity={0.85} />
              <ellipse cx="-14" cy="18.3" rx="1.0" ry="0.3" fill="#fef08a" />
            </g>

            <g id="clairvoyant-vtol-right">
              <path d="M 13,9 L 19,9 L 20,13 L 12,13 Z"
                    fill="url(#clair-vtol-housing)" stroke="#0f172a" strokeWidth="1.0" />
              <circle cx="16" cy="11.5" r="2.0" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <circle cx="16" cy="11.5" r="1.0" fill="#94a3b8" />
              <path d="M 13,13 L 19,13 L 20.5,17.5 L 11.5,17.5 Z"
                    fill="url(#clair-vtol-bell)" stroke="#0f172a" strokeWidth="1.2" />
              <line x1="13.5" y1="14.5" x2="18.5" y2="14.5" stroke="#334155" strokeWidth="0.8" />
              <line x1="12.5" y1="16.2" x2="19.5" y2="16.2" stroke="#1e293b" strokeWidth="0.8" />
              <polygon points="11.5,17.5 20.5,17.5 19.8,18.5 12.2,18.5"
                       fill="#090d12" stroke="#0f172a" strokeWidth="0.8" />
              <ellipse cx="16" cy="18.5" rx="3.8" ry="0.9" fill="#0f172a" />
              <ellipse cx="16" cy="18.3" rx="2.2" ry="0.5" fill="#f59e0b" opacity={0.85} />
              <ellipse cx="16" cy="18.3" rx="1.0" ry="0.3" fill="#fef08a" />
            </g>

            {/* 5. NEAR-SIDE HEAVY LOW-SLUNG LANDING GEAR (CLOSE TO GROUND) */}
            <g id="clairvoyant-gear">
              {/* Forward Outrigger & Low-Profile Suspension */}
              <path d="M -27,6 L -21,6 L -20,12 L -28,12 Z"
                    fill="#334155" stroke="#0f172a" strokeWidth="1.2" />
              <circle cx="-24" cy="9" r="1.8" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <polygon points="-26,12 -22,12 -21.5,15.5 -26.5,15.5"
                       fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
              <rect x="-24.8" y="15.5" width="1.6" height="2.5"
                    fill="url(#clair-piston-chrome)" stroke="#0f172a" strokeWidth="0.6" />
              <polyline points="-24,13 -26.8,15.2 -24,17.5" fill="none" stroke="#64748b" strokeWidth="1.3" />
              <circle cx="-26.8" cy="15.2" r="0.8" fill="#cbd5e1" />

              {/* Aft Outrigger & Low-Profile Suspension */}
              <path d="M 19,6 L 25,6 L 26,12 L 18,12 Z"
                    fill="#334155" stroke="#0f172a" strokeWidth="1.2" />
              <circle cx="22" cy="9" r="1.8" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <polygon points="20,12 24,12 24.5,15.5 19.5,15.5"
                       fill="#1e293b" stroke="#0f172a" strokeWidth="1.0" />
              <rect x="21.2" y="15.5" width="1.6" height="2.5"
                    fill="url(#clair-piston-chrome)" stroke="#0f172a" strokeWidth="0.6" />
              <polyline points="22,13 19.2,15.2 22,17.5" fill="none" stroke="#64748b" strokeWidth="1.3" />
              <circle cx="19.2" cy="15.2" r="0.8" fill="#cbd5e1" />
            </g>

            {/* Footpads (Strict path isolation, ground contact at y = 20) */}
            <g id="clairvoyant-footpad-forward">
              <circle cx="-24" cy="17.5" r="1.4" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <polygon points="-29,18 -19,18 -18,20 -30,20"
                       fill="url(#clair-footpad-metal)" stroke="#0b0e12" strokeWidth="1.2" />
              <rect x="-30.5" y="20" width="13" height="1.6" rx="0.5"
                    fill="#0a0d12" stroke="#1e293b" strokeWidth="0.6" />
              <circle cx="-28" cy="20.7" r="0.4" fill="#94a3b8" />
              <circle cx="-24" cy="20.7" r="0.4" fill="#94a3b8" />
              <circle cx="-20" cy="20.7" r="0.4" fill="#94a3b8" />
            </g>

            <g id="clairvoyant-footpad-aft">
              <circle cx="22" cy="17.5" r="1.4" fill="#475569" stroke="#0f172a" strokeWidth="0.8" />
              <polygon points="17,18 27,18 28,20 16,20"
                       fill="url(#clair-footpad-metal)" stroke="#0b0e12" strokeWidth="1.2" />
              <rect x="15.5" y="20" width="13" height="1.6" rx="0.5"
                    fill="#0a0d12" stroke="#1e293b" strokeWidth="0.6" />
              <circle cx="18" cy="20.7" r="0.4" fill="#94a3b8" />
              <circle cx="22" cy="20.7" r="0.4" fill="#94a3b8" />
              <circle cx="26" cy="20.7" r="0.4" fill="#94a3b8" />
            </g>

            {/* 6. ULTRA-REALISTIC TACTICAL DETAILS, STENCILS & RIVETS */}
            <g id="clairvoyant-details">
              <polygon points="-24,1 -20,8 -28,8" fill="#0f172a" stroke="#0f172a" strokeWidth="1.0" />
              <polygon points="-24,2 -20.8,7.3 -27.2,7.3" fill="#eab308" />
              <circle cx="-24" cy="4" r="0.7" fill="#0f172a" />
              <circle cx="-22.5" cy="6.2" r="0.7" fill="#0f172a" />
              <circle cx="-25.5" cy="6.2" r="0.7" fill="#0f172a" />
              <circle cx="-24" cy="5.2" r="0.4" fill="#eab308" />

              <rect x="-27" y="13.5" width="5" height="1.0" fill="#eab308" />
              <rect x="20" y="13.5" width="5" height="1.0" fill="#eab308" />

              <rect x="23" y="-5" width="4" height="0.8" fill="#94a3b8" />
              <rect x="23" y="-3.5" width="6" height="0.6" fill="#64748b" />
              <rect x="-1" y="-9" width="3" height="1.2" fill="#ef4444" stroke="#0f172a" strokeWidth="0.4" />
              <rect x="2.5" y="-9" width="3" height="1.2" fill="#eab308" stroke="#0f172a" strokeWidth="0.4" />

              <g stroke="#1a1e24" strokeWidth="0.7">
                <line x1="-8" y1="-14" x2="-8" y2="-7" />
                <line x1="0" y1="-14" x2="0" y2="-7" />
                <line x1="8" y1="-14" x2="8" y2="-7" />
                <line x1="16" y1="-11" x2="16" y2="-5" />
                <line x1="22" y1="-9" x2="22" y2="4" />
                <line x1="28" y1="-8" x2="28" y2="5" />
              </g>

              <g stroke="#4b5563" strokeWidth="0.5" strokeOpacity="0.7">
                <line x1="-8" y1="-13.5" x2="12" y2="-13.5" />
                <line x1="12" y1="-13.5" x2="20" y2="-10.5" />
                <line x1="20" y1="-10.5" x2="34" y2="-8.5" />
              </g>

              <g fill="#94a3b8">
                <circle cx="-19" cy="-12.5" r="0.5" />
                <circle cx="-13" cy="-12.5" r="0.5" />
                <circle cx="-5" cy="-12.5" r="0.5" />
                <circle cx="3" cy="-12.5" r="0.5" />
                <circle cx="11" cy="-12.5" r="0.5" />
                <circle cx="17" cy="-9.8" r="0.5" />
                <circle cx="23" cy="-7.8" r="0.5" />
                <circle cx="29" cy="-7.8" r="0.5" />
                <circle cx="-31" cy="-5" r="0.4" fill="#57534e" />
                <circle cx="-28" cy="1" r="0.4" fill="#57534e" />
                <circle cx="-21" cy="6" r="0.4" fill="#57534e" />
                <circle cx="-13" cy="8" r="0.4" fill="#57534e" />
              </g>

              <circle cx="-32" cy="-6" r="0.9" fill="#ef4444" />
              <circle cx="-32" cy="-6" r="0.4" fill="#fecaca" />
              <circle cx="1" cy="-18" r="0.8" fill="#f8fafc" />
              <circle cx="1" cy="-18" r="0.4" fill="#38bdf8" />
              <circle cx="37" cy="-7" r="0.8" fill="#f59e0b" />
              <circle cx="37" cy="-7" r="0.4" fill="#fef08a" />
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: NEBULA STARCHASER (NS-709 Interstellar Cruiser)    */}
        {/* ========================================================= */}
        {modelId === 'nebula' && (
          <g>
            {/* 0. FAR-SIDE / BACKGROUND STRUCTURES (Shadowed) */}
            <g data-part="farside">
              {/* Far-side Aft VTOL Pod */}
              <path d="M-25,9 L-21,9 L-20,16 L-26,16 Z" fill="#22143b" stroke="#120822" strokeWidth="0.6" />
              <path d="M-25.5,16 L-20.5,16 L-19.5,18 L-26.5,18 Z" fill="#180e2b" stroke="#0e051a" strokeWidth="0.6" />
              <ellipse cx="-23" cy="18" rx="3.5" ry="0.8" fill="#0d0517" />
              {/* Far-side Forward VTOL Pod */}
              <path d="M23,9 L27,9 L28,16 L22,16 Z" fill="#22143b" stroke="#120822" strokeWidth="0.6" />
              <path d="M22.5,16 L27.5,16 L28.5,18 L21.5,18 Z" fill="#180e2b" stroke="#0e051a" strokeWidth="0.6" />
              <ellipse cx="25" cy="18" rx="3.5" ry="0.8" fill="#0d0517" />
              {/* Far-side mast shadow lines */}
              <line x1="-24" y1="-14" x2="-24" y2="-23" stroke="#160e29" strokeWidth="0.7" />
            </g>

            {/* 1. DORSAL SUPERSTRUCTURE & SENSOR/COMMS MAST ARRAY */}
            <g data-part="dorsal">
              {/* Raised Comms Deckhouse */}
              <path d="M-36,-9 L-36,-13.5 L-18,-13.5 L-14,-9 Z" fill="url(#nebula-shroud-upper)" stroke="#1e1238" strokeWidth="0.8" />
              <line x1="-36" y1="-13.5" x2="-18" y2="-13.5" stroke="#a78bfa" strokeWidth="0.6" opacity="0.6" />
              {/* Status Nav Lights on deckhouse lip */}
              <rect x="-34.5" y="-14.2" width="1.6" height="0.8" rx="0.3" fill="#ef4444" />
              <rect x="-31.5" y="-14.2" width="1.6" height="0.8" rx="0.3" fill="#f59e0b" />
              <rect x="-28.5" y="-14.2" width="1.6" height="0.8" rx="0.3" fill="#f8fafc" />
              <rect x="-25.5" y="-14.2" width="1.6" height="0.8" rx="0.3" fill="#38bdf8" />
              <rect x="-22.5" y="-14.2" width="1.6" height="0.8" rx="0.3" fill="#22c55e" />

              {/* Rear Satellite Dish (Angled ~40° aft-upwards) */}
              <g transform="translate(-33 -14)">
                <line x1="0" y1="0" x2="-2" y2="-2" stroke="#334155" strokeWidth="1.0" />
                <ellipse cx="-2.5" cy="-3" rx="3.2" ry="1.8" transform="rotate(-35 -2.5 -3)" fill="#64748b" stroke="#1e293b" strokeWidth="0.6" />
                <line x1="-2.5" y1="-3" x2="-4.5" y2="-4.5" stroke="#94a3b8" strokeWidth="0.7" />
                <circle cx="-4.5" cy="-4.5" r="0.4" fill="#f8fafc" />
              </g>

              {/* Sensor Radome */}
              <g transform="translate(-24 -14)">
                <rect x="-1.5" y="-2" width="3" height="2" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                <path d="M-2.2,-2 Q-2.2,-5 0,-5 Q2.2,-5 2.2,-2 Z" fill="#94a3b8" stroke="#1e293b" strokeWidth="0.6" />
                <line x1="-2.2" y1="-2" x2="2.2" y2="-2" stroke="#475569" strokeWidth="0.6" />
              </g>

              {/* Primary Communications Mast & High Whip Antennas */}
              <g transform="translate(-27 -14)">
                <rect x="-1" y="-3" width="2" height="3" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
                {/* Tall Whip Antenna */}
                <line x1="0" y1="-3" x2="0" y2="-12.5" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" />
                {/* Blinking Top Red Antenna Beacon */}
                <circle cx="0" cy="-12.5" r="1.8" fill="#ef4444" opacity="0.35">
                  <animate attributeName="opacity" values="0.85;0.05;0.85" dur="1.0s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="-12.5" r="0.6" fill="#ef4444">
                  <animate attributeName="opacity" values="1.0;0.2;1.0" dur="1.0s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="-12.5" r="0.25" fill="#fecaca">
                  <animate attributeName="opacity" values="1.0;0.1;1.0" dur="1.0s" repeatCount="indefinite" />
                </circle>
                {/* Secondary Whip Antenna */}
                <line x1="1.5" y1="-3" x2="1.5" y2="-8.5" stroke="#94a3b8" strokeWidth="0.6" strokeLinecap="round" />
              </g>

              {/* Forward Sensor / Defense Turret */}
              <g transform="translate(-18 -14)">
                <rect x="-1.5" y="-1.5" width="3" height="1.5" rx="0.4" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                <line x1="0" y1="-1.5" x2="2.8" y2="-3" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="-0.5" y1="-0.8" x2="2.3" y2="-2.3" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
              </g>

              {/* Mid-Dorsal Slowly Rotating Parabolic Antenna */}
              <g transform="translate(-4 -10)">
                <line x1="0" y1="0" x2="0" y2="-4.5" stroke="#475569" strokeWidth="1.1" />
                <circle cx="0" cy="-4.5" r="0.9" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 -4.5"
                    to="360 0 -4.5"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                  <line x1="0" y1="-4.5" x2="0" y2="-6.2" stroke="#64748b" strokeWidth="0.8" />
                  <ellipse cx="0" cy="-6.2" rx="3.0" ry="1.4" fill="#64748b" stroke="#1e293b" strokeWidth="0.6" />
                  <ellipse cx="0" cy="-6.0" rx="2.4" ry="0.9" fill="#475569" stroke="#334155" strokeWidth="0.4" />
                  <line x1="0" y1="-6.2" x2="0" y2="-8.8" stroke="#94a3b8" strokeWidth="0.7" strokeLinecap="round" />
                  <circle cx="0" cy="-8.8" r="0.4" fill="#f8fafc" />
                </g>
              </g>

              {/* Dorsal Docking Ring / Cupola */}
              <rect x="4" y="-11.5" width="5" height="2" rx="0.7" fill="#334155" stroke="#1e293b" strokeWidth="0.6" />
              <circle cx="6.5" cy="-11.5" r="1.2" fill="#475569" />
            </g>

            {/* 2. MAIN AFT ENGINE CLUSTER & BIFURCATED COWLING SHROUDS */}
            <g data-part="aft-engine">
              {/* Central Main Fusion Engine Bell */}
              <path d="M-36,-7.5 L-48,-6 L-48,6 L-36,7.5 Z" fill="url(#nebula-engine-main)" stroke="#120822" strokeWidth="0.8" />
              {/* Concentric Cooling Ribs */}
              <line x1="-45" y1="-6.3" x2="-45" y2="6.3" stroke="#473860" strokeWidth="0.8" />
              <line x1="-42" y1="-6.7" x2="-42" y2="6.7" stroke="#473860" strokeWidth="0.8" />
              <line x1="-39" y1="-7.1" x2="-39" y2="7.1" stroke="#473860" strokeWidth="0.8" />
              {/* Engine Bell Throat Opening */}
              <ellipse cx="-48" cy="0" rx="2.2" ry="6" fill="#07030d" stroke="#1e1238" strokeWidth="0.6" />
              {/* Intense Cyan Plasma Emission Glow inside the Bell */}
              <ellipse cx="-47.5" cy="0" rx="1.6" ry="4.5" fill="#00f0ff" opacity="0.85" />
              <ellipse cx="-47.2" cy="0" rx="1.0" ry="3.0" fill="#ffffff" opacity="0.95" />

              {/* Upper Bifurcated Cowling Shroud */}
              <path d="M-32,-13.5 C-42,-13 -52,-11.5 -64,-9.5 L-64,-7.5 C-52,-7 -44,-6.5 -32,-7.5 Z" fill="url(#nebula-shroud-upper)" stroke="#1e1238" strokeWidth="0.8" />
              <path d="M-32,-13.5 C-42,-13 -52,-11.5 -64,-9.5" stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.8" />
              <line x1="-60" y1="-8.5" x2="-36" y2="-8.5" stroke="#1e1238" strokeWidth="0.5" />
              {/* Cyan Tip Marker Light */}
              <circle cx="-62" cy="-8.5" r="0.8" fill="#00f0ff" />

              {/* Lower Bifurcated Cowling Shroud */}
              <path d="M-32,13.5 C-42,13 -52,11.5 -64,9.5 L-64,7.5 C-52,7 -44,6.5 -32,7.5 Z" fill="url(#nebula-shroud-lower)" stroke="#1e1238" strokeWidth="0.8" />
              <line x1="-60" y1="8.5" x2="-36" y2="8.5" stroke="#1e1238" strokeWidth="0.5" />
              {/* Cyan Tip Marker Light */}
              <circle cx="-62" cy="8.5" r="0.8" fill="#00f0ff" />

              {/* Curved Aft Ventral Keel Bulge */}
              <path d="M-42,7.5 C-38,12 -34,14 -26,13.5 L-26,7.5 Z" fill="url(#nebula-shroud-lower)" stroke="#1e1238" strokeWidth="0.8" />
              {/* Underside Cyan Beacon Light */}
              <circle cx="-34" cy="11.5" r="0.9" fill="#38bdf8" />
              <line x1="-38" y1="9" x2="-30" y2="9" stroke="#1e1238" strokeWidth="0.6" />

              {/* Aft Mechanical Bulkhead Hinge Greeble */}
              <line x1="-30" y1="-9" x2="-30" y2="11" stroke="#1e1238" strokeWidth="0.8" />
              <circle cx="-30" cy="0" r="3.4" fill="#2e2048" stroke="#120822" strokeWidth="0.7" />
              <circle cx="-30" cy="0" r="1.8" fill="#473860" stroke="#1e1238" strokeWidth="0.5" />
              <circle cx="-30" cy="0" r="0.7" fill="#cbd5e1" />
              {/* Heat Sink Louver Grill */}
              <rect x="-33.5" y="-5.5" width="4.5" height="2.8" rx="0.4" fill="#1e1430" stroke="#120822" strokeWidth="0.5" />
              <line x1="-32.5" y1="-4.6" x2="-30" y2="-4.6" stroke="#473860" strokeWidth="0.5" />
              <line x1="-32.5" y1="-3.6" x2="-30" y2="-3.6" stroke="#473860" strokeWidth="0.5" />
            </g>

            {/* 3. MAIN FUSELAGE HULL & STRUCTURAL ARMOR */}
            <g data-part="hull">
              {/* Midships Main Body Plating */}
              <path d="M-26,-9 L12,-9 L12,11.5 L-26,11.5 Z" fill="url(#nebula-hull-purple)" stroke="#1e1238" strokeWidth="0.8" />
              {/* Longitudinal Seam Grooves */}
              <line x1="-26" y1="-6.5" x2="12" y2="-6.5" stroke="#1e1238" strokeWidth="0.6" />
              <line x1="-26" y1="8" x2="12" y2="8" stroke="#1e1238" strokeWidth="0.6" />
              {/* Top Deck Edge Bevel Highlight */}
              <line x1="-26" y1="-8.5" x2="12" y2="-8.5" stroke="#a78bfa" strokeWidth="0.6" opacity="0.7" />

              {/* Vertical Structural Expansion Collar Joint */}
              <rect x="12" y="-10" width="3.5" height="21.5" rx="0.5" fill="#1c1133" stroke="#0f071f" strokeWidth="0.7" />
              <line x1="13.7" y1="-10" x2="13.7" y2="11.5" stroke="#332154" strokeWidth="0.6" />
              <rect x="13" y="-9.2" width="1.5" height="1.2" rx="0.3" fill="#ef4444" />
              <rect x="13" y="9.5" width="1.5" height="1.2" rx="0.3" fill="#ef4444" />
            </g>

            {/* 4. ILLUMINATED MISSION NAMEPLATE (MIDSHIPS FLANK) */}
            <g data-part="nameplate">
              {/* Recessed Frame */}
              <rect x="-22" y="-4.5" width="30" height="10.5" rx="1.5" fill="url(#nebula-nameplate-bg)" stroke="#5b21b6" strokeWidth="0.8" />
              {/* 4 Corner Cyan Indicator Lights */}
              <rect x="-21.2" y="-3.8" width="1.0" height="1.0" rx="0.2" fill="#00f0ff" />
              <rect x="6.2" y="-3.8" width="1.0" height="1.0" rx="0.2" fill="#00f0ff" />
              <rect x="-21.2" y="4.2" width="1.0" height="1.0" rx="0.2" fill="#00f0ff" />
              <rect x="6.2" y="4.2" width="1.0" height="1.0" rx="0.2" fill="#00f0ff" />

              {/* Mission Insignia: Stylized Orbital Crescent Loop + 4-Point Star */}
              <g transform="translate(-16 0.8)">
                {/* Golden Orbital Crescent Arc */}
                <path d="M-2.2,-2.6 C0.8,-3.8 3.6,-1.8 3.8,1.2 C4.0,3.6 1.8,4.5 -0.6,4.0 C-2.4,3.6 -3.8,1.8 -3.2,-0.4" fill="none" stroke="url(#nebula-gold-crescent)" strokeWidth="1.1" strokeLinecap="round" />
                {/* Secondary Inner Trail */}
                <path d="M-1.8,-1.8 C0.6,-2.6 2.6,-1.2 2.8,0.8" fill="none" stroke="#fef08a" strokeWidth="0.5" opacity="0.8" />
                {/* Brilliant White 4-Point Star */}
                <path d="M0,-2.5 Q0.3,-0.3 2.5,0 Q0.3,0.3 0,2.5 Q-0.3,0.3 -2.5,0 Q-0.3,-0.3 0,-2.5 Z" fill="#ffffff" />
                <circle cx="0" cy="0" r="0.5" fill="#38bdf8" />
              </g>

              {/* Typographic Lettering */}
              <g fill="#f8fafc" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800">
                <text x="-10.5" y="-1.2" fontSize="4.0" letterSpacing="0.35">NEBULA</text>
                <text x="-10.5" y="2.5" fontSize="3.6" letterSpacing="0.25">STARCHASER</text>
                <text x="-10.5" y="4.8" fontSize="1.35" fontWeight="600" fill="#93c5fd" letterSpacing="0.1">INTERSTELLAR EXPLORATION      NS-709</text>
              </g>
            </g>

            {/* 5. FORWARD SECTION, MACHINERY BAY & PROW BRIDGE */}
            <g data-part="forward">
              {/* Sloping Upper Forward Hull */}
              <path d="M15.5,-10 L35,-10 L50,-7 L65,-0.5 L64,4 L52,7 L48,11.5 L15.5,11.5 Z" fill="url(#nebula-hull-purple)" stroke="#1e1238" strokeWidth="0.8" />
              {/* Raked Upper Hull Bevel Highlight */}
              <path d="M15.5,-9.5 L35,-9.5 L50,-6.5 L64.5,-0.5" stroke="#a78bfa" strokeWidth="0.6" fill="none" opacity="0.8" />

              {/* Raised Trapezoidal Observation Skylight */}
              <polygon points="32,-9 36,-9 35,-7.2 33,-7.2" fill="#7dd3fc" stroke="#0284c7" strokeWidth="0.5" />

              {/* Horizontal Sensor Readout Light Array */}
              <rect x="41" y="-3.2" width="7.5" height="1.6" rx="0.4" fill="#1e1430" stroke="#0f081c" strokeWidth="0.5" />
              <rect x="41.6" y="-2.8" width="1.8" height="0.8" rx="0.2" fill="#38bdf8" />
              <rect x="43.8" y="-2.8" width="1.8" height="0.8" rx="0.2" fill="#f59e0b" />
              <rect x="46.0" y="-2.8" width="1.8" height="0.8" rx="0.2" fill="#f8fafc" />

              {/* Side Machinery / Greeble Equipment Bay */}
              <rect x="28" y="0.5" width="18" height="7" rx="0.8" fill="#120822" stroke="#090312" strokeWidth="0.6" />
              {/* Power Converter / Heat Exchanger Canister */}
              <rect x="31" y="1.8" width="12" height="3.2" rx="0.6" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
              <line x1="34" y1="1.8" x2="34" y2="5.0" stroke="#64748b" strokeWidth="0.6" />
              <line x1="37" y1="1.8" x2="37" y2="5.0" stroke="#64748b" strokeWidth="0.6" />
              <line x1="40" y1="1.8" x2="40" y2="5.0" stroke="#64748b" strokeWidth="0.6" />
              {/* Coolant Piping & Manifolds */}
              <path d="M29,6 L44,6" stroke="#64748b" strokeWidth="0.8" strokeLinecap="round" />
              <circle cx="44" cy="6" r="0.8" fill="#94a3b8" />
              <circle cx="30" cy="6" r="0.8" fill="#94a3b8" />

              {/* Panoramic Bridge Observation Deck (Facing Right Prow) */}
              <g transform="translate(48 -2.5)">
                {/* Overhanging Brow Visor Armor */}
                <path d="M0,-1.5 L14,-1.5 L17,2.2 L0,2.2 Z" fill="#1c1133" stroke="#0f071f" strokeWidth="0.7" />
                {/* Faceted Glass Panes */}
                <polygon points="1,-0.8 13.5,-0.8 16,1.8 1,1.8" fill="url(#nebula-bridge-glass)" stroke="#0284c7" strokeWidth="0.5" />
                {/* Dark Structural Window Mullions */}
                <line x1="4.5" y1="-0.8" x2="4.5" y2="1.8" stroke="#0f172a" strokeWidth="0.7" />
                <line x1="8.0" y1="-0.8" x2="8.0" y2="1.8" stroke="#0f172a" strokeWidth="0.7" />
                <line x1="11.5" y1="-0.8" x2="11.5" y2="1.8" stroke="#0f172a" strokeWidth="0.7" />
                {/* Glass Top Specular Glint */}
                <line x1="1.5" y1="-0.5" x2="13" y2="-0.5" stroke="#ffffff" strokeWidth="0.5" opacity="0.7" />
              </g>

              {/* Lower Forward Chin Bumper & RCS Array */}
              <path d="M52,4 L64,4 L63,7 L54,7 Z" fill="#22143b" stroke="#120822" strokeWidth="0.6" />
              <rect x="58" y="5" width="3" height="1.5" rx="0.3" fill="#0f081c" />
              <circle cx="59" cy="5.7" r="0.4" fill="#cbd5e1" />
              <circle cx="60.2" cy="5.7" r="0.4" fill="#cbd5e1" />
            </g>

            {/* 6. VENTRAL VTOL NACELLES & SCIENTIFIC SENSOR SUITE */}
            <g data-part="ventral">
              {/* Aft Ventral VTOL Thruster Pod */}
              <g data-part="engine" data-engine="left" transform="translate(-23 11)">
                <path d="M-4,0 L4,0 L3,6.5 L-3,6.5 Z" fill="url(#nebula-shroud-lower)" stroke="#1e1238" strokeWidth="0.7" />
                <rect x="-1.5" y="1" width="3" height="4" fill="#1e1238" rx="0.3" />
                <circle cx="-2.2" cy="2" r="0.4" fill="#ef4444" />
                {/* Blinking Landing Gear Clearance Beacon */}
                <circle cx="-2.2" cy="4.5" r="1.6" fill="#00f0ff" opacity="0.35">
                  <animate attributeName="opacity" values="0.85;0.05;0.85" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="-2.2" cy="4.5" r="0.6" fill="#00f0ff">
                  <animate attributeName="opacity" values="1.0;0.2;1.0" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="-2.2" cy="4.5" r="0.25" fill="#ffffff">
                  <animate attributeName="opacity" values="1.0;0.1;1.0" dur="1.2s" repeatCount="indefinite" />
                </circle>
                {/* Rocket Nozzle Bell */}
                <path d="M-3,6.5 L3,6.5 L3.8,9.5 L-3.8,9.5 Z" fill="#1e1b2e" stroke="#090312" strokeWidth="0.7" />
                <ellipse cx="0" cy="9.5" rx="3.8" ry="0.9" fill="#090412" stroke="#473860" strokeWidth="0.5" />
                <ellipse cx="0" cy="9.5" rx="2.5" ry="0.5" fill="#00f0ff" opacity="0.8" />
              </g>

              {/* Forward Ventral VTOL Thruster Pod */}
              <g data-part="engine" data-engine="right" transform="translate(25 11)">
                <path d="M-4,0 L4,0 L3,6.5 L-3,6.5 Z" fill="url(#nebula-shroud-lower)" stroke="#1e1238" strokeWidth="0.7" />
                <rect x="-1.5" y="1" width="3" height="4" fill="#1e1238" rx="0.3" />
                <circle cx="-2.2" cy="2" r="0.4" fill="#ef4444" />
                {/* Blinking Landing Gear Clearance Beacon */}
                <circle cx="-2.2" cy="4.5" r="1.6" fill="#00f0ff" opacity="0.35">
                  <animate attributeName="opacity" values="0.85;0.05;0.85" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="-2.2" cy="4.5" r="0.6" fill="#00f0ff">
                  <animate attributeName="opacity" values="1.0;0.2;1.0" dur="1.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="-2.2" cy="4.5" r="0.25" fill="#ffffff">
                  <animate attributeName="opacity" values="1.0;0.1;1.0" dur="1.2s" repeatCount="indefinite" />
                </circle>
                {/* Rocket Nozzle Bell */}
                <path d="M-3,6.5 L3,6.5 L3.8,9.5 L-3.8,9.5 Z" fill="#1e1b2e" stroke="#090312" strokeWidth="0.7" />
                <ellipse cx="0" cy="9.5" rx="3.8" ry="0.9" fill="#090412" stroke="#473860" strokeWidth="0.5" />
                <ellipse cx="0" cy="9.5" rx="2.5" ry="0.5" fill="#00f0ff" opacity="0.8" />
              </g>

              {/* Forward Ventral Keel Fin */}
              <polygon points="36,11.5 40,11.5 38,15" fill="#1e1238" stroke="#0f071f" strokeWidth="0.6" />

              {/* Ventral Scientific Sensor Package (Flush Mount, Antennas Removed) */}
              <g transform="translate(0 11.5)">
                <rect x="-3" y="0" width="6" height="2" rx="0.4" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
                {/* Gimballed FLIR / Optical Sensor Turret */}
                <g transform="translate(5 2.5)">
                  <rect x="-1" y="-1" width="2" height="1.2" fill="#1e293b" />
                  <circle cx="0" cy="1" r="1.4" fill="#475569" stroke="#1e293b" strokeWidth="0.5" />
                  <circle cx="0.4" cy="1.2" r="0.6" fill="#38bdf8" />
                </g>
              </g>
            </g>
          </g>
        )}

                {/* ========================================================= */}
        {/* MODEL: GOLIATH CARRIER (CT-950 Colossus Hauler)           */}
        {/* Exact Clone of Heavy Atmospheric Transport Side Diagram   */}
        {/* ========================================================= */}
        {modelId === 'goliath' && (
          <g id="goliath-craft-svg">
            {/* 1. Far-Side (Starboard) Landing Legs & Nozzle Bells (Shadow Layer) */}
            <g id="goliath-far-gear" opacity="0.55">
              {/* Far Aft Thruster Bell (Bottom at y=11 matches craft belly) */}
              <path d="M -26.5,8 L -21.5,8 L -20.5,11 L -27.5,11 Z" fill="#0f172a" />
              {/* Far Aft Leg */}
              <line x1="-24" y1="11" x2="-24" y2="19.5" stroke="#0f172a" strokeWidth="2.0" />
              <rect x="-28" y="19" width="8" height="1.6" rx="0.8" fill="#0f172a" />

              {/* Far Fwd Thruster Bell (Bottom at y=11 matches craft belly) */}
              <path d="M 37.5,8 L 42.5,8 L 43.5,11 L 36.5,11 Z" fill="#0f172a" />
              {/* Far Fwd Leg */}
              <line x1="40" y1="11" x2="40" y2="19.5" stroke="#0f172a" strokeWidth="2.0" />
              <rect x="36" y="19" width="8" height="1.6" rx="0.8" fill="#0f172a" />
            </g>

            {/* 2. Main Cargo & Vehicle Hold ("4. MAIN CARGO & VEHICLE HOLD") */}
            {/* The rear opening is DIAGONAL: sloping from (-54, -11) down to (-36, 10) */}
            <g id="goliath-cargo-hold-interior">
              {/* Recessed Cavernous Hold Chamber */}
              <polygon
                points="-54,-10.5 -36,-10.5 -36,10 -54,-10.5"
                fill="url(#goliath-bay-interior)"
                stroke="#1e293b"
                strokeWidth="0.8"
              />
              <path
                d="M -54,-11 L -36,10 L -33,10 L -33,-11 Z"
                fill="#070b14"
              />
              {/* Structural Bulkhead Ribs */}
              <line x1="-44" y1="-10.5" x2="-35" y2="3" stroke="#1e293b" strokeWidth="1.2" />
              <line x1="-50" y1="-10.5" x2="-36" y2="7" stroke="#1e293b" strokeWidth="1.2" />

              {/* Ceiling Halogen Work Floodlights */}
              <rect x="-45" y="-11" width="5" height="1.2" rx="0.4" fill="#fef08a" opacity="0.9" />
              <ellipse cx="-42.5" cy="-7" rx="9" ry="4" fill="#fef08a" opacity="0.12" />

              {/* Internal Vehicle Loading Tracks ("12. INTERNAL VEHICLE LOADING TRACKS") */}
              <line x1="-48" y1="2" x2="-36" y2="10" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.8" />
              <line x1="-46" y1="4" x2="-35" y2="10" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1.5 1.5" opacity="0.8" />

              {/* Internal Telemetry Control Console */}
              <rect x="-35.5" y="-3" width="2.2" height="3.5" rx="0.3" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.3" />
              <line x1="-35.2" y1="-2" x2="-33.6" y2="-2" stroke="#22c55e" strokeWidth="0.4" />
              <line x1="-35.2" y1="-1" x2="-34.0" y2="-1" stroke="#38bdf8" strokeWidth="0.4" />
              <line x1="-35.2" y1="0" x2="-33.8" y2="0" stroke="#eab308" strokeWidth="0.4" />

              {/* Parked Green Combat Rover / Tank inside Hold */}
              <g id="goliath-parked-rover">
                <rect x="-41" y="4.5" width="6.8" height="3.2" rx="0.8" fill="#2d4a34" stroke="#14261a" strokeWidth="0.4" />
                <rect x="-39.5" y="2.8" width="3.8" height="1.8" rx="0.6" fill="#365e3f" stroke="#14261a" strokeWidth="0.3" />
                <line x1="-41.5" y1="3.6" x2="-39.5" y2="3.6" stroke="#14261a" strokeWidth="0.6" />
                <rect x="-41.5" y="7.2" width="7.5" height="1.4" rx="0.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.3" />
                <circle cx="-40.5" cy="7.9" r="0.45" fill="#64748b" />
                <circle cx="-39.2" cy="7.9" r="0.45" fill="#64748b" />
                <circle cx="-37.9" cy="7.9" r="0.45" fill="#64748b" />
                <circle cx="-36.6" cy="7.9" r="0.45" fill="#64748b" />
                <circle cx="-35.3" cy="7.9" r="0.45" fill="#64748b" />
              </g>

              {/* Open Aft Door Leaves ("14. AFT DOOR (OPEN)") */}
              <path
                d="M -54,-11 L -57,-13.5 L -52,-13.5 L -50,-11 Z"
                fill="#334155"
                stroke="#1e293b"
                strokeWidth="0.5"
              />
              <rect x="-56" y="-13" width="3" height="1" fill="#dc2626" />
              <path
                d="M -36,6.5 L -38.5,6.5 L -39.5,10 L -36,10 Z"
                fill="#334155"
                stroke="#1e293b"
                strokeWidth="0.5"
              />
            </g>

            {/* 3. Descending Rear Vehicle Cargo Ramp ("10. REAR CARGO RAMP") */}
            <g id="goliath-descending-ramp">
              {/* Dual Telescoping Hydraulic Rams ("11. RAMP HYDRAULICS") */}
              <g id="goliath-ramp-hydraulics">
                {/* Hull anchor trunnion bracket */}
                <rect x="-34.5" y="10.2" width="2.5" height="2.0" rx="0.5" fill="#dc2626" stroke="#991b1b" strokeWidth="0.4" />
                <circle cx="-33.2" cy="11.2" r="0.6" fill="#cbd5e1" />
                {/* Cylinder 1 (outer dark barrel) */}
                <line x1="-33.2" y1="11.2" x2="-44" y2="13.8" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
                {/* Cylinder 1 (chrome piston rod) */}
                <line x1="-44" y1="13.8" x2="-49" y2="15.0" stroke="#f1f5f9" strokeWidth="1.0" strokeLinecap="round" />
                {/* Ramp underside bracket */}
                <circle cx="-49" cy="15.0" r="0.6" fill="#dc2626" />

                {/* Cylinder 2 (parallel cylinder) */}
                <line x1="-32.2" y1="11.8" x2="-43" y2="14.4" stroke="#334155" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="-43" y1="14.4" x2="-48" y2="15.6" stroke="#e2e8f0" strokeWidth="0.9" strokeLinecap="round" />
                <circle cx="-48" cy="15.6" r="0.5" fill="#dc2626" />
              </g>

              {/* Main Ramp Bed (descending from sill (-36, 10) down to (-58, 18)) */}
              <polygon
                points="-36,10 -58,18 -58,19.2 -36,11.2"
                fill="url(#goliath-ramp-bed)"
                stroke="#0f172a"
                strokeWidth="0.5"
              />
              {/* Traction ribs across main ramp bed */}
              <line x1="-38" y1="10.8" x2="-38" y2="11.9" stroke="#475569" strokeWidth="0.8" />
              <line x1="-41" y1="11.9" x2="-41" y2="13.0" stroke="#475569" strokeWidth="0.8" />
              <line x1="-44" y1="13.0" x2="-44" y2="14.1" stroke="#475569" strokeWidth="0.8" />
              <line x1="-47" y1="14.1" x2="-47" y2="15.2" stroke="#475569" strokeWidth="0.8" />
              <line x1="-50" y1="15.2" x2="-50" y2="16.3" stroke="#475569" strokeWidth="0.8" />
              <line x1="-53" y1="16.3" x2="-53" y2="17.4" stroke="#475569" strokeWidth="0.8" />
              <line x1="-56" y1="17.4" x2="-56" y2="18.5" stroke="#475569" strokeWidth="0.8" />

              {/* Raised Side Curbs with Yellow/Black Hazard Chevrons */}
              <g id="goliath-ramp-hazard-curbs">
                <polygon points="-36,9.5 -58,17.5 -58,18.5 -36,10.5" fill="#eab308" />
                {/* Angled black hazard stripes */}
                <polygon points="-38,10.2 -40,10.9 -39.4,11.7 -37.4,11.0" fill="#0f172a" />
                <polygon points="-42,11.7 -44,12.4 -43.4,13.2 -41.4,12.5" fill="#0f172a" />
                <polygon points="-46,13.2 -48,13.9 -47.4,14.7 -45.4,14.0" fill="#0f172a" />
                <polygon points="-50,14.7 -52,15.4 -51.4,16.2 -49.4,15.5" fill="#0f172a" />
                <polygon points="-54,16.2 -56,16.9 -55.4,17.7 -53.4,17.0" fill="#0f172a" />
              </g>

              {/* Folding Ramp Section ("13. FOLDING RAMP SECTION") lying flat on ground */}
              <polygon
                points="-58,18 -66,20 -66,20.6 -58,19.2"
                fill="#334155"
                stroke="#0f172a"
                strokeWidth="0.5"
              />
              <line x1="-58" y1="18" x2="-58" y2="19.2" stroke="#dc2626" strokeWidth="0.8" />
              <polygon points="-58,18 -66,20 -65,20.4 -58,18.8" fill="#eab308" />
              <polygon points="-60,18.5 -62,19.0 -61.6,19.5 -59.6,19.0" fill="#0f172a" />
              <polygon points="-63,19.2 -65,19.7 -64.6,20.2 -62.6,19.7" fill="#0f172a" />

              {/* Ground Crew Technicians in Orange Hazard Suits Descending Ramp */}
              <g id="goliath-ground-crew">
                {/* Tech 1 (Lead technician at base of ramp on ground with guiding wand) */}
                <g transform="translate(-64, 18.5)">
                  <circle cx="0" cy="-2.6" r="0.65" fill="#f97316" stroke="#9a3412" strokeWidth="0.25" />
                  <rect x="-0.45" y="-1.9" width="0.9" height="1.8" rx="0.3" fill="#ea580c" />
                  <line x1="-0.25" y1="-0.1" x2="-0.3" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                  <line x1="0.25" y1="-0.1" x2="0.3" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                  {/* Marshalling wand */}
                  <line x1="0.4" y1="-1.0" x2="1.2" y2="-2.0" stroke="#22c55e" strokeWidth="0.4" strokeLinecap="round" />
                  <circle cx="1.2" cy="-2.0" r="0.3" fill="#4ade80" />
                </g>
                {/* Tech 2 (Mid-ramp technician descending slope) */}
                <g transform="translate(-50, 13.5)">
                  <circle cx="0" cy="-2.6" r="0.65" fill="#f97316" stroke="#9a3412" strokeWidth="0.25" />
                  <rect x="-0.45" y="-1.9" width="0.9" height="1.8" rx="0.3" fill="#ea580c" />
                  <line x1="-0.25" y1="-0.1" x2="-0.4" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                  <line x1="0.25" y1="-0.1" x2="0.2" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                </g>
                {/* Tech 3 (Upper technician stepping out of hold at ramp head) */}
                <g transform="translate(-40, 9.2)">
                  <circle cx="0" cy="-2.6" r="0.65" fill="#f97316" stroke="#9a3412" strokeWidth="0.25" />
                  <rect x="-0.45" y="-1.9" width="0.9" height="1.8" rx="0.3" fill="#ea580c" />
                  <line x1="-0.25" y1="-0.1" x2="-0.3" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                  <line x1="0.25" y1="-0.1" x2="0.3" y2="1.5" stroke="#1e293b" strokeWidth="0.4" />
                </g>
              </g>
            </g>

            {/* 4. Main Fuselage Hull: Multi-Tone Grey Panels & Red Stripes */}
            <g id="goliath-fuselage-hull">
              {/* Primary Fuselage Base Shell */}
              <path
                d="M -44,-16 L 32,-16 L 44,-15 L 52,-6 L 56,0 L 57,7 L 48,11 L -36,11 L -54,-11 L -44,-16 Z"
                fill="url(#goliath-hull-grad)"
                stroke="#0f172a"
                strokeWidth="1.0"
              />

              {/* Multi-Tone Grey Panel 1: Aft Cargo Hold Structural Frame (-36 to -29) */}
              <polygon
                points="-36,11 -29,11 -29,-14 -39,-14 -36,11"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="0.6"
              />
              <line x1="-33" y1="-14" x2="-33" y2="11" stroke="#0f172a" strokeWidth="0.6" />

              {/* Upper Dorsal Spine Armor Plate (-44 to 44, y=-16 to -14) */}
              <path
                d="M -44,-16 L 32,-16 L 44,-15 L 43,-13.5 L 32,-14 L -43,-14 Z"
                fill="#0f172a"
              />
              <line x1="-44" y1="-16" x2="32" y2="-16" stroke="#64748b" strokeWidth="0.6" />

              {/* Red Accent 1: Aft Roof Bevel Plate ("5. REAR FTDRAULIENT") */}
              <polygon
                points="-48,-14.2 -42,-15.5 -42,-13.8 -48,-12.5"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.4"
              />

              {/* Red Accent 2: Crew Quarters Surrounding Armor ("3. CREW QUARTERS") */}
              <rect
                x="-31"
                y="-15.0"
                width="11"
                height="4.2"
                rx="0.8"
                fill="url(#goliath-red-armor)"
                stroke="#7f1d1d"
                strokeWidth="0.5"
              />
              {/* Crew Quarters Tinted Observation Window Slit */}
              <rect
                x="-28"
                y="-13.8"
                width="6.5"
                height="1.4"
                rx="0.4"
                fill="#0284c7"
                stroke="#0f172a"
                strokeWidth="0.3"
              />
              <line x1="-27.5" y1="-13.1" x2="-22" y2="-13.1" stroke="#e0f2fe" strokeWidth="0.4" />
              {/* Small adjacent red service hatch */}
              <rect x="-19" y="-14.2" width="2.2" height="2.4" rx="0.4" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.3" />

              {/* Red Stripe 3: Rear Diagonal Red Armor Band (behind rear thruster) */}
              <polygon
                points="-17,-16 -14,-16 -19,11 -22,11"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.4"
              />

              {/* Yellow & Black Hazard Chevron Badge on Upper Hull Chamfer */}
              <g id="goliath-top-hazard-badge">
                <polygon points="-13,-15.5 -6,-15.5 -5,-13 -12,-13" fill="#eab308" stroke="#0f172a" strokeWidth="0.3" />
                <polygon points="-12,-15.5 -10.5,-15.5 -9.5,-13 -11,-13" fill="#0f172a" />
                <polygon points="-9,-15.5 -7.5,-15.5 -6.5,-13 -8,-13" fill="#0f172a" />
              </g>

              {/* Multi-Tone Grey Panel 2: Mid-Fuselage Slate Plates (-14 to 6) */}
              <polygon
                points="-14,-14 6,-14 6,-4 -14,-4"
                fill="#475569"
                stroke="#1e293b"
                strokeWidth="0.5"
              />
              <polygon
                points="-14,4 6,4 6,11 -14,11"
                fill="#334155"
                stroke="#1e293b"
                strokeWidth="0.5"
              />

              {/* Red Stripe 4: Primary Mid-Fuselage Diagonal Red Armor Stripe */}
              {/* Upper diagonal segment (above nameplate) */}
              <polygon
                points="6,-16 9,-16 8,-3.5 5,-3.5"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.4"
              />
              {/* Lower diagonal segment (below nameplate) */}
              <polygon
                points="8,3.5 11,3.5 7,11 4,11"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.4"
              />

              {/* Multi-Tone Grey Panel 3: Forward Mid-Fuselage Plates (6 to 22) */}
              <polygon
                points="6,-14 22,-14 22,11 6,11"
                fill="#334155"
                stroke="#1e293b"
                strokeWidth="0.5"
                opacity="0.7"
              />

              {/* Red Stripe 5: Forward Diagonal Red Armor Stripe (between nameplate and fwd thruster) */}
              <polygon
                points="26,-16 29,-16 24,11 21,11"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.4"
              />

              {/* Multi-Tone Grey Panel 4: Forward Section (29 to 36) */}
              <polygon
                points="29,-16 35,-16 35,11 24,11"
                fill="#475569"
                stroke="#1e293b"
                strokeWidth="0.5"
              />

              {/* Prominent Central Craft Nameplate ("15. CRAFT NAME DISPLAY") */}
              {/* Shifted right to x = 1 to 29 (center x = 15) so it's fully clear of the back thruster */}
              <g id="goliath-nameplate-banner">
                {/* Outer Inset Plate */}
                <rect
                  x="1"
                  y="-3.8"
                  width="28"
                  height="7.6"
                  rx="1.0"
                  fill="#070b14"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
                {/* Secondary inner contour line */}
                <rect
                  x="1.8"
                  y="-3.0"
                  width="26.4"
                  height="6.0"
                  rx="0.6"
                  fill="none"
                  stroke="#b91c1c"
                  strokeWidth="0.4"
                  opacity="0.8"
                />
                {/* Bold Off-White Lettering: GOLIATH CARRIER */}
                <text
                  x="15"
                  y="1.4"
                  textAnchor="middle"
                  fill="#f8fafc"
                  fontSize="4.8"
                  fontWeight="900"
                  letterSpacing="0.6"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  GOLIATH CARRIER
                </text>
              </g>

              {/* Red Stripe 6: Bridge / Cockpit Roof Red Accent Bar */}
              <rect
                x="36"
                y="-16.5"
                width="7"
                height="1.5"
                rx="0.3"
                fill="url(#goliath-red-armor)"
                stroke="#991b1b"
                strokeWidth="0.3"
              />

              {/* Cockpit & Bridge Section ("1. COCKPIT & BRIDGE") */}
              <g id="goliath-cockpit-bridge">
                {/* Cockpit Brow & Cheek Plates */}
                <polygon points="44,-15 52,-6 48,0 42,-5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.4" />
                <polygon points="48,0 56,0 52,7 48,11 44,7" fill="#334155" stroke="#0f172a" strokeWidth="0.4" />

                {/* Polarized Cyan Cockpit Visor / Windshield */}
                <polygon
                  points="49,-6 53,-6 56,0 49,0"
                  fill="url(#goliath-visor-grad)"
                  stroke="#0f172a"
                  strokeWidth="0.5"
                />
                {/* Visor Glare / Specular Streak */}
                <line x1="50" y1="-5" x2="55" y2="-0.5" stroke="#ffffff" strokeWidth="0.5" strokeLinecap="round" opacity="0.75" />
                {/* White structural mullions */}
                <line x1="52" y1="-6" x2="52.5" y2="0" stroke="#f8fafc" strokeWidth="0.4" />
                {/* Pilot Silhouettes inside bridge */}
                <circle cx="51.5" cy="-2.5" r="0.7" fill="#0f172a" />
                <circle cx="54" cy="-2" r="0.7" fill="#0f172a" />

                {/* Cockpit Red Hazard Warning Decal */}
                <rect x="51" y="2.5" width="1.6" height="1.6" rx="0.2" fill="#dc2626" stroke="#7f1d1d" strokeWidth="0.2" />

                {/* Dark Composite Nose Cone */}
                <polygon points="56,0 57,7 54,7 53,0" fill="#0f172a" />

                {/* Forward Pitot & Sensor Cannon Probe */}
                <line x1="57" y1="6.5" x2="65" y2="6.5" stroke="#475569" strokeWidth="1.0" strokeLinecap="round" />
                <line x1="57" y1="6.5" x2="63" y2="6.5" stroke="#f1f5f9" strokeWidth="0.5" strokeLinecap="round" />
                <circle cx="65" cy="6.5" r="0.6" fill="#38bdf8" />
              </g>

              {/* Ventral Keel & Stabilizing Fins ("8. STABILIZING FINS") */}
              {/* Mid-Fuselage Ventral Stabilizing Fin */}
              <polygon
                points="3,11 15,11 12,14.5 4,14.5"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="0.5"
              />
              <line x1="4.5" y1="14.5" x2="11.5" y2="14.5" stroke="#64748b" strokeWidth="0.5" />

              {/* Forward Ventral Fin ("8b. STABILIZING FINS (AFT/VENTRAL)") */}
              <polygon
                points="44,11 53,11 50,14.5 45,14.5"
                fill="#1e293b"
                stroke="#0f172a"
                strokeWidth="0.5"
              />

              {/* Dorsal Sensor Array & Communications ("2. SENSOR ARRAY & COMMUNICATIONS") */}
              <g id="goliath-dorsal-sensor-suite">
                {/* Twin Vertical Copper Antenna Masts */}
                <line x1="-32" y1="-16" x2="-32" y2="-22.5" stroke="#d97706" strokeWidth="1.0" strokeLinecap="round" />
                <line x1="-30" y1="-16" x2="-30" y2="-21.5" stroke="#d97706" strokeWidth="0.9" strokeLinecap="round" />

                {/* High-Intensity Blinking Red Beacon Light on Top Antenna Mast */}
                <circle cx="-32" cy="-22.5" r="0.8" fill="#ef4444" />
                <circle cx="-32" cy="-22.5" r="2.2" fill="#ef4444" opacity="0.6">
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="r" values="1.2;2.5;1.2" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="-32" cy="-22.5" r="0.4" fill="#ffffff">
                  <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" repeatCount="indefinite" />
                </circle>

                {/* Secondary Strobe on Lower Antenna */}
                <circle cx="-30" cy="-21.5" r="0.55" fill="#38bdf8">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur="1.1s" repeatCount="indefinite" />
                </circle>

                {/* Swivel Radar Turret on Bridge Roof */}
                <rect x="38.5" y="-18.5" width="4.0" height="2.5" rx="0.6" fill="#334155" stroke="#0f172a" strokeWidth="0.4" />
                <line x1="42.5" y1="-17.5" x2="45.5" y2="-17.5" stroke="#cbd5e1" strokeWidth="0.7" strokeLinecap="round" />
                <circle cx="40.5" cy="-17.2" r="0.5" fill="#38bdf8" />
              </g>
            </g>

            {/* 6. Port-Side VTOL Thruster Pods & Articulated Ski Landing Gear */}
            {/* IN THIS CRAFT THE THRUSTERS ARE ON THE SIDE AND THEIR BOTTOM MATCHES THE CRAFT BELLY (y=11) */}
            <g id="goliath-vtol-thruster-pods">
              {/* ======================================================== */}
              {/* REAR THRUSTER POD (Moved further back to center x = -24) */}
              {/* ======================================================== */}
              <g id="goliath-aft-thruster-unit">
                {/* Articulated Ski Landing Gear (Extends down from belly y=11 to ground y=20) */}
                <g id="goliath-aft-landing-gear">
                  {/* Chassis mounting socket */}
                  <rect x="-25.5" y="10.5" width="3.0" height="1.5" rx="0.4" fill="#0f172a" />
                  {/* Heavy Hydraulic Cylinder Housing */}
                  <rect x="-25.2" y="11.5" width="2.4" height="4.0" rx="0.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.4" />
                  {/* Chrome Sliding Oleo Piston Rod */}
                  <line x1="-24" y1="14.5" x2="-24" y2="19.2" stroke="#f1f5f9" strokeWidth="1.4" strokeLinecap="round" />
                  {/* Dual-Pivot Ankle Knuckle */}
                  <circle cx="-24" cy="19.2" r="0.9" fill="#334155" stroke="#0f172a" strokeWidth="0.3" />
                  <circle cx="-24" cy="19.2" r="0.4" fill="#cbd5e1" />
                  {/* Wide Articulated Ski Footpad resting on ground (y=20.0) */}
                  <path
                    d="M -30,19.2 L -28,20.2 L -20,20.2 L -18,19.2 L -19,19.2 L -21,19.8 L -27,19.8 L -29,19.2 Z"
                    fill="#334155"
                    stroke="#0f172a"
                    strokeWidth="0.5"
                  />
                  {/* Traction cleats beneath ski pad */}
                  <rect x="-26" y="20.2" width="1.2" height="0.5" fill="#0f172a" />
                  <rect x="-23" y="20.2" width="1.2" height="0.5" fill="#0f172a" />
                </g>

                {/* Thruster Pod Cylindrical Casing (Side-Mounted, x=-29 to -19, top y=-8.5 to y=7) */}
                <rect
                  x="-29"
                  y="-6.5"
                  width="10"
                  height="13.5"
                  rx="1.5"
                  fill="url(#goliath-pod-casing)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                {/* Rounded Intake Dome Cap with Metallic Copper Collar */}
                <path
                  d="M -28.5,-6.5 Q -24,-9.0 -19.5,-6.5 Z"
                  fill="url(#goliath-copper-lip)"
                  stroke="#78350f"
                  strokeWidth="0.5"
                />
                <line x1="-28.5" y1="-6.5" x2="-19.5" y2="-6.5" stroke="#78350f" strokeWidth="0.6" />

                {/* Pod Inset Red Status Badge with Gauges */}
                <rect x="-26.5" y="-1.0" width="5.0" height="5.0" rx="0.6" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.4" />
                <circle cx="-24" cy="1.5" r="1.2" fill="#0f172a" />
                <circle cx="-24" cy="1.5" r="0.5" fill="#fbbf24" />

                {/* Forward Aerodynamic Winglet ("8a. STABILIZING FINS (FRONT)") */}
                <polygon
                  points="-19,6.5 -13,8.5 -19,9.5"
                  fill="#cbd5e1"
                  stroke="#0f172a"
                  strokeWidth="0.4"
                />

                {/* Flared Copper Exhaust Nozzle Bell: FROM y=7.0 TO y=11.0! */}
                {/* NOZZLE BELL LIP IS AT y=11.0 -> EXACTLY MATCHES CRAFT BELLY! */}
                <path
                  d="M -27.5,7.0 L -20.5,7.0 L -19.5,11.0 L -28.5,11.0 Z"
                  fill="url(#goliath-copper-lip)"
                  stroke="#78350f"
                  strokeWidth="0.6"
                />
                {/* Cyan Radiant Throat Glow at Nozzle Lip (y=11.0) */}
                <ellipse cx="-24" cy="11.0" rx="4.5" ry="0.9" fill="url(#goliath-thruster-cyan)" />
              </g>

              {/* ======================================================== */}
              {/* FORWARD THRUSTER POD (Center x = 40)                     */}
              {/* ======================================================== */}
              <g id="goliath-fwd-thruster-unit">
                {/* Articulated Ski Landing Gear (Extends down from belly y=11 to ground y=20) */}
                <g id="goliath-fwd-landing-gear">
                  {/* Chassis mounting socket */}
                  <rect x="38.5" y="10.5" width="3.0" height="1.5" rx="0.4" fill="#0f172a" />
                  {/* Heavy Hydraulic Cylinder Housing */}
                  <rect x="38.8" y="11.5" width="2.4" height="4.0" rx="0.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.4" />
                  {/* Chrome Sliding Oleo Piston Rod */}
                  <line x1="40" y1="14.5" x2="40" y2="19.2" stroke="#f1f5f9" strokeWidth="1.4" strokeLinecap="round" />
                  {/* Dual-Pivot Ankle Knuckle */}
                  <circle cx="40" cy="19.2" r="0.9" fill="#334155" stroke="#0f172a" strokeWidth="0.3" />
                  <circle cx="40" cy="19.2" r="0.4" fill="#cbd5e1" />
                  {/* Wide Articulated Ski Footpad resting on ground (y=20.0) */}
                  <path
                    d="M 34,19.2 L 36,20.2 L 44,20.2 L 46,19.2 L 45,19.2 L 43,19.8 L 37,19.8 L 35,19.2 Z"
                    fill="#334155"
                    stroke="#0f172a"
                    strokeWidth="0.5"
                  />
                  {/* Traction cleats beneath ski pad */}
                  <rect x="38" y="20.2" width="1.2" height="0.5" fill="#0f172a" />
                  <rect x="41" y="20.2" width="1.2" height="0.5" fill="#0f172a" />
                </g>

                {/* Thruster Pod Cylindrical Casing (Side-Mounted, x=35 to 45, top y=-8.5 to y=7) */}
                <rect
                  x="35"
                  y="-6.5"
                  width="10"
                  height="13.5"
                  rx="1.5"
                  fill="url(#goliath-pod-casing)"
                  stroke="#0f172a"
                  strokeWidth="0.8"
                />
                {/* Rounded Intake Dome Cap with Metallic Copper Collar */}
                <path
                  d="M 35.5,-6.5 Q 40,-9.0 44.5,-6.5 Z"
                  fill="url(#goliath-copper-lip)"
                  stroke="#78350f"
                  strokeWidth="0.5"
                />
                <line x1="35.5" y1="-6.5" x2="44.5" y2="-6.5" stroke="#78350f" strokeWidth="0.6" />

                {/* Pod Inset Red Status Badge with Gauges */}
                <rect x="37.5" y="-1.0" width="5.0" height="5.0" rx="0.6" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.4" />
                <circle cx="40" cy="1.5" r="1.2" fill="#0f172a" />
                <circle cx="40" cy="1.5" r="0.5" fill="#fbbf24" />

                {/* Forward Aerodynamic Winglet ("8a. STABILIZING FINS (FRONT)") */}
                <polygon
                  points="45,6.5 51,8.5 45,9.5"
                  fill="#cbd5e1"
                  stroke="#0f172a"
                  strokeWidth="0.4"
                />

                {/* Flared Copper Exhaust Nozzle Bell: FROM y=7.0 TO y=11.0! */}
                {/* NOZZLE BELL LIP IS AT y=11.0 -> EXACTLY MATCHES CRAFT BELLY! */}
                <path
                  d="M 36.5,7.0 L 43.5,7.0 L 44.5,11.0 L 35.5,11.0 Z"
                  fill="url(#goliath-copper-lip)"
                  stroke="#78350f"
                  strokeWidth="0.6"
                />
                {/* Cyan Radiant Throat Glow at Nozzle Lip (y=11.0) */}
                <ellipse cx="40" cy="11.0" rx="4.5" ry="0.9" fill="url(#goliath-thruster-cyan)" />
              </g>
            </g>
          </g>
        )}
{/* ========================================================= */}
        {/* MODEL: BEHEMOTH-IX (Dreadnought Planetary Carrier)        */}
        {/* ========================================================= */}
        {modelId === 'behemoth' && (
          <g id="craft-behemoth-model">
            {/* ========================================================= */}
            {/* BEHEMOTH-IX ASYMMETRIC INDUSTRIAL HAULER (Side Blueprint) */}
            {/* ========================================================= */}

            {/* 1. AFT PROPULSION: Twin Main Rocket Torch Bells (x=55..63.5) */}
            <g id="behemoth-aft-propulsion">
              {/* Upper Rocket Bell */}
              <polygon
                points="55,-3 63.5,-4.5 63.5,1.5 55,0"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <ellipse cx="63.5" cy="-1.5" rx="1.2" ry="2.5" fill="#f97316" />
              <ellipse cx="63.5" cy="-1.5" rx="0.6" ry="1.5" fill="#fef08a" />

              {/* Lower Rocket Bell */}
              <polygon
                points="55,4 63.5,2.5 63.5,8.5 55,7"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <ellipse cx="63.5" cy="5.5" rx="1.2" ry="2.5" fill="#f97316" />
              <ellipse cx="63.5" cy="5.5" rx="0.6" ry="1.5" fill="#fef08a" />
            </g>

            {/* 2. VENTRAL VTOL LIFT-FAN THRUSTER PODS (x=-18 and x=36) */}
            <g id="behemoth-vtol-thrusters">
              {/* Front VTOL Thruster (x=-18) */}
              <rect x="-23.5" y="6" width="11" height="4.5" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <polygon
                points="-22.5,10.5 -24.2,16 -11.8,16 -13.5,10.5"
                fill="#334155"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              <line x1="-23.2" y1="12.8" x2="-12.8" y2="12.8" stroke="#d97706" strokeWidth="0.9" />
              <line x1="-23.8" y1="14.6" x2="-12.2" y2="14.6" stroke="#d97706" strokeWidth="0.9" />
              <ellipse cx="-18" cy="16" rx="5.5" ry="1.5" fill="#0284c7" />
              <ellipse cx="-18" cy="16" rx="3.2" ry="0.9" fill="#e0f2fe" />

              {/* Rear VTOL Thruster (x=36) */}
              <rect x="30.5" y="6" width="11" height="4.5" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
              <polygon
                points="31.5,10.5 29.8,16 42.2,16 40.5,10.5"
                fill="#334155"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              <line x1="30.8" y1="12.8" x2="41.2" y2="12.8" stroke="#d97706" strokeWidth="0.9" />
              <line x1="30.2" y1="14.6" x2="41.8" y2="14.6" stroke="#d97706" strokeWidth="0.9" />
              <ellipse cx="36" cy="16" rx="5.5" ry="1.5" fill="#0284c7" />
              <ellipse cx="36" cy="16" rx="3.2" ry="0.9" fill="#e0f2fe" />
            </g>

            {/* 3. LANDING GEAR SYSTEM */}
            <g id="behemoth-landing-gear">
              {/* Front Ski Rocker Assembly (x=-26, ground y=22) */}
              <rect x="-28" y="10" width="4" height="3" fill="#334155" stroke="#0f172a" strokeWidth="0.7" />
              <line x1="-26" y1="12.5" x2="-26" y2="19.5" stroke="#94a3b8" strokeWidth="2.4" />
              <line x1="-26" y1="15" x2="-26" y2="19.5" stroke="#f8fafc" strokeWidth="1.2" />
              {/* Scissor link */}
              <polyline points="-26,14 -22.5,16 -26,18.5" stroke="#64748b" strokeWidth="1.0" fill="none" />
              <circle cx="-22.5" cy="16" r="0.9" fill="#f97316" />
              {/* Front Ski Footpad */}
              <polygon
                points="-34,20 -32,22 -20,22 -18,20.5 -20,18.8 -32,18.8"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <rect x="-31" y="20.8" width="11" height="1.2" fill="#f97316" />

              {/* Rear Heavy Caterpillar Track Unit (x=48, ground y=22) */}
              <line x1="43" y1="11" x2="41" y2="17" stroke="#475569" strokeWidth="2.0" />
              <line x1="53" y1="11" x2="55" y2="17" stroke="#475569" strokeWidth="2.0" />
              <line x1="43" y1="12" x2="41.5" y2="17.5" stroke="#f1f5f9" strokeWidth="1.0" />
              <line x1="53" y1="12" x2="54.5" y2="17.5" stroke="#f1f5f9" strokeWidth="1.0" />
              {/* Track Carriage Frame */}
              <rect x="36" y="16.5" width="24" height="5.5" fill="#0f172a" stroke="#334155" strokeWidth="0.9" />
              <rect x="35.5" y="20.4" width="25" height="1.6" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
              {/* Track Cleats */}
              <g stroke="#475569" strokeWidth="0.8">
                <line x1="37" y1="20.4" x2="37" y2="22" />
                <line x1="40" y1="20.4" x2="40" y2="22" />
                <line x1="43" y1="20.4" x2="43" y2="22" />
                <line x1="46" y1="20.4" x2="46" y2="22" />
                <line x1="49" y1="20.4" x2="49" y2="22" />
                <line x1="52" y1="20.4" x2="52" y2="22" />
                <line x1="55" y1="20.4" x2="55" y2="22" />
                <line x1="58" y1="20.4" x2="58" y2="22" />
              </g>
              {/* Bogie Wheels */}
              <circle cx="38.5" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="38.5" cy="18.8" r="0.5" fill="#f97316" />
              <circle cx="42.3" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="42.3" cy="18.8" r="0.5" fill="#f97316" />
              <circle cx="46.1" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="46.1" cy="18.8" r="0.5" fill="#f97316" />
              <circle cx="49.9" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="49.9" cy="18.8" r="0.5" fill="#f97316" />
              <circle cx="53.7" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="53.7" cy="18.8" r="0.5" fill="#f97316" />
              <circle cx="57.5" cy="18.8" r="1.4" fill="#475569" stroke="#94a3b8" strokeWidth="0.6" />
              <circle cx="57.5" cy="18.8" r="0.5" fill="#f97316" />
              {/* Hazard marks on carriage */}
              <polygon points="38,17.2 40,17.2 39,19.8 37,19.8" fill="#f97316" />
              <polygon points="56,17.2 58,17.2 57,19.8 55,19.8" fill="#f97316" />
            </g>

            {/* 4. MAIN PORTSIDE GANTRY TRUSS STRUCTURE (x=-66 to x=-26) */}
            <g id="behemoth-gantry-truss">
              {/* Gantry Backing Plate */}
              <polygon points="-66,-9 -26,-9 -26,10 -56,4 -66,2" fill="#0f172a" />
              {/* Upper Heavy Chord I-Beam */}
              <rect x="-66" y="-9" width="40" height="3.2" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
              {/* Orange Overhead Runner Rail */}
              <rect x="-65" y="-7.2" width="38" height="1.2" fill="#f97316" />
              {/* Lower Angled Chord */}
              <polygon points="-66,2 -56,4 -26,10 -26,7.8 -56,2.2 -66,0.4" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
              {/* Warren Truss Diagonals */}
              <g stroke="#475569" strokeWidth="1.3">
                <line x1="-66" y1="-6.5" x2="-66" y2="1.2" />
                <line x1="-66" y1="-6.5" x2="-56" y2="3.2" />
                <line x1="-66" y1="1.2" x2="-56" y2="-6.5" />
                <line x1="-56" y1="-6.5" x2="-56" y2="3.2" />
                <line x1="-56" y1="-6.5" x2="-46" y2="5.2" />
                <line x1="-56" y1="3.2" x2="-46" y2="-6.5" />
                <line x1="-46" y1="-6.5" x2="-46" y2="5.2" />
                <line x1="-46" y1="-6.5" x2="-36" y2="7.2" />
                <line x1="-46" y1="5.2" x2="-36" y2="-6.5" />
                <line x1="-36" y1="-6.5" x2="-36" y2="7.2" />
                <line x1="-36" y1="-6.5" x2="-26" y2="9.0" />
                <line x1="-36" y1="7.2" x2="-26" y2="-6.5" />
                <line x1="-26" y1="-6.5" x2="-26" y2="9.0" />
              </g>
              {/* Nose Cap & Pitot Air Data Sensor Probe */}
              <polygon points="-66,-9 -68,-3.5 -68,0 -66,2" fill="#f97316" stroke="#0f172a" strokeWidth="0.8" />
              <line x1="-68" y1="-2" x2="-72" y2="-2" stroke="#94a3b8" strokeWidth="0.9" />
              <circle cx="-72" cy="-2" r="0.6" fill="#e2e8f0" />
              {/* Floodlight Projector */}
              <rect x="-65.5" y="-5.5" width="2.5" height="3.5" fill="#0f172a" />
              <ellipse cx="-65.5" cy="-3.75" rx="0.8" ry="1.4" fill="#38bdf8" />
            </g>

            {/* 5. MAIN HULL PLATING & ENGINEERING DECK (x=-26 to x=56) */}
            <g id="behemoth-main-hull">
              {/* Primary Hull Shell */}
              <polygon
                points="-26,-9 -22,-13 -12,-7 4,-7 6,-21 22,-21 24,-7 56,-6 56,11 -26,11"
                fill="#f1f5f9"
                stroke="#475569"
                strokeWidth="1.0"
              />
              {/* Panel Lines */}
              <g stroke="#64748b" strokeWidth="0.7">
                <line x1="-12" y1="-7" x2="-12" y2="11" />
                <line x1="4" y1="-7" x2="4" y2="11" />
                <line x1="26" y1="-7" x2="26" y2="11" />
                <line x1="42" y1="-6" x2="42" y2="11" />
                <line x1="-26" y1="2" x2="56" y2="2" />
                <line x1="-26" y1="7" x2="56" y2="7" />
              </g>

              {/* Aft Fusion Reactor Louvers & Plasma Glow */}
              <rect x="30" y="-4" width="22" height="8" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
              <ellipse cx="41" cy="0" rx="7" ry="2.5" fill="#0284c7" />
              <ellipse cx="41" cy="0" rx="4" ry="1.2" fill="#38bdf8" />
              <g stroke="#0f172a" strokeWidth="0.9">
                <line x1="32" y1="-3" x2="32" y2="3" />
                <line x1="35" y1="-3" x2="35" y2="3" />
                <line x1="38" y1="-3" x2="38" y2="3" />
                <line x1="41" y1="-3" x2="41" y2="3" />
                <line x1="44" y1="-3" x2="44" y2="3" />
                <line x1="47" y1="-3" x2="47" y2="3" />
                <line x1="50" y1="-3" x2="50" y2="3" />
              </g>

              {/* Keel Hazard Chevrons */}
              <rect x="28" y="8" width="26" height="2.5" fill="#f97316" />
              <g stroke="#0f172a" strokeWidth="0.8">
                <line x1="30" y1="8" x2="32" y2="10.5" />
                <line x1="34" y1="8" x2="36" y2="10.5" />
                <line x1="38" y1="8" x2="40" y2="10.5" />
                <line x1="42" y1="8" x2="44" y2="10.5" />
                <line x1="46" y1="8" x2="48" y2="10.5" />
                <line x1="50" y1="8" x2="52" y2="10.5" />
              </g>
            </g>

            {/* 6. COCKPIT / TACTICAL POST (x=-26 to -12, y=-13 to -2) */}
            <g id="behemoth-cockpit">
              <polygon
                points="-26,-9 -22,-13 -13,-8.5 -13,-2 -26,-2"
                fill="#e2e8f0"
                stroke="#334155"
                strokeWidth="0.8"
              />
              {/* Cyan Visor */}
              <polygon
                points="-24.5,-9.5 -21.5,-12 -14.5,-8.5 -14.5,-3.5 -24.5,-3.5"
                fill="#0284c7"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              {/* White Mullions */}
              <line x1="-19.5" y1="-10.8" x2="-19.5" y2="-3.5" stroke="#f8fafc" strokeWidth="0.7" />
              <line x1="-24.5" y1="-6.5" x2="-14.5" y2="-6.5" stroke="#f8fafc" strokeWidth="0.7" />
              {/* Specular Highlight */}
              <polygon points="-23,-9.8 -20.5,-11.5 -17,-9.5 -21,-8.0" fill="rgba(255,255,255,0.4)" />
              {/* Roof FLIR Sensor Turret */}
              <circle cx="-18" cy="-13.5" r="1.4" fill="#1e293b" />
              <circle cx="-18" cy="-13.5" r="0.7" fill="#38bdf8" />
            </g>

            {/* 7. STARBOARD TYT CONTROL TOWER (x=4 to 24, y=-22 to -7) */}
            <g id="behemoth-control-tower">
              <polygon points="4,-7 6,-21 22,-21 24,-7" fill="#f1f5f9" stroke="#334155" strokeWidth="0.9" />
              {/* Orange Band */}
              <rect x="11" y="-21" width="6" height="14" fill="#f97316" />
              {/* Panoramic Observation Windows */}
              <rect x="7" y="-19.5" width="14" height="4.2" fill="#0284c7" stroke="#0f172a" strokeWidth="0.7" />
              <line x1="11" y1="-19.5" x2="11" y2="-15.3" stroke="#f8fafc" strokeWidth="0.6" />
              <line x1="17" y1="-19.5" x2="17" y2="-15.3" stroke="#f8fafc" strokeWidth="0.6" />
              {/* Stencil TYT */}
              <text x="14" y="-10.5" fill="#ffffff" fontSize="3.2" fontFamily="monospace" fontWeight="bold" textAnchor="middle">TYT</text>
              {/* Lattice Comms Mast */}
              <line x1="14" y1="-21" x2="14" y2="-34" stroke="#475569" strokeWidth="1.0" />
              <line x1="12" y1="-21" x2="14" y2="-26" stroke="#475569" strokeWidth="0.8" />
              <line x1="16" y1="-21" x2="14" y2="-26" stroke="#475569" strokeWidth="0.8" />
              <line x1="12" y1="-26" x2="14" y2="-31" stroke="#475569" strokeWidth="0.8" />
              <line x1="16" y1="-26" x2="14" y2="-31" stroke="#475569" strokeWidth="0.8" />
              {/* Radar Dish */}
              <ellipse cx="9" cy="-27" rx="3.5" ry="2.2" fill="#94a3b8" stroke="#334155" strokeWidth="0.6" />
              {/* Top Antenna Probe Tip */}
              <line x1="14" y1="-34" x2="14" y2="-38" stroke="#94a3b8" strokeWidth="0.8" />
              {/* USER REQUIREMENT: Blinking LED Strobe on Top of Antenna */}
              <circle cx="14" cy="-38" r="3.2" fill="rgba(239, 68, 68, 0.4)" />
              <circle cx="14" cy="-38" r="1.5" fill="#f97316" />
              <circle cx="14" cy="-38" r="0.8" fill="#ffffff" />
            </g>

            {/* 8. FUSELAGE STENCILING: BEHEMOTH-IX (Moved right, clear of thrusters) */}
            <g id="behemoth-stenciling">
              <text x="9.5" y="1.5" fill="#0f172a" fontSize="4.2" fontFamily="sans-serif" fontWeight="900" textAnchor="start">BEHEMOTH-IX</text>
              <text x="9.5" y="4.5" fill="#f97316" fontSize="2.2" fontFamily="monospace" fontWeight="bold" textAnchor="start">BH-900 DREADNOUGHT // ARES</text>
            </g>

            {/* 9. SIDE CARGO DOOR & GANTRY CRANE HATCH (x=-4 to 26, y=-5.5 to 11) */}
            <g id="behemoth-cargo-door">
              <rect x="-4" y="-5.5" width="30" height="16.5" fill="#cbd5e1" stroke="#475569" strokeWidth="1.0" />
              {/* Horizontal Ribs */}
              <g stroke="#64748b" strokeWidth="0.8">
                <line x1="-4" y1="-1.5" x2="26" y2="-1.5" />
                <line x1="-4" y1="2.5" x2="26" y2="2.5" />
                <line x1="-4" y1="6.5" x2="26" y2="6.5" />
              </g>
              {/* Safety Chevrons */}
              <rect x="-4" y="-5.5" width="30" height="1.2" fill="#f97316" />
              <rect x="-4" y="9.8" width="30" height="1.2" fill="#f97316" />
              <text x="11" y="-3.0" fill="#0f172a" fontSize="2.0" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CARGO HOLD // ASYMMETRIC CRANE</text>
              {/* Lock Pins */}
              <circle cx="-2" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="2" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="6" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="10" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="14" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="18" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="22" cy="-4.9" r="0.5" fill="#f97316" />
              <circle cx="-2" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="2" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="6" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="10" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="14" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="18" cy="10.4" r="0.5" fill="#f97316" />
              <circle cx="22" cy="10.4" r="0.5" fill="#f97316" />
            </g>

            {/* 10. VEHICLE LOADING RAMP HATCH (Closed & Locked in hangar view) */}
            <g id="behemoth-closed-ramp-hatch">
              <rect x="-38" y="4.5" width="17" height="5.5" fill="#0f172a" stroke="#334155" strokeWidth="0.8" />
              <rect x="-37.5" y="4.8" width="16" height="4.8" fill="#94a3b8" stroke="#1e293b" strokeWidth="0.6" />
              <line x1="-37" y1="6.4" x2="-22" y2="6.4" stroke="#475569" strokeWidth="0.5" />
              <line x1="-37" y1="8.0" x2="-22" y2="8.0" stroke="#475569" strokeWidth="0.5" />
              <circle cx="-22" cy="9.2" r="1.1" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
              <circle cx="-30" cy="9.2" r="0.9" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
              <circle cx="-37" cy="9.2" r="0.9" fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
              <rect x="-35.5" y="4.2" width="2.5" height="1.2" fill="#f97316" />
              <rect x="-24.5" y="4.2" width="2.5" height="1.2" fill="#f97316" />
              <circle cx="-36.5" cy="5.5" r="0.5" fill="#22c55e" />
              <circle cx="-22.5" cy="5.5" r="0.5" fill="#22c55e" />
            </g>
          </g>
        )}
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
            {/* 1. Bow Searchlight Beams (background light cones) */}
            <polygon points="58,-12 95,8 95,40 58,-2" fill="url(#mammoth-floodlight-beam)" pointerEvents="none" />
            <polygon points="60,-4 98,18 98,44 60,6" fill="url(#mammoth-floodlight-beam)" pointerEvents="none" />

            {/* 2. Main Propulsion Nozzle Assembly (stern center) */}
            <g>
              <rect x="-48" y="8" width="22" height="22" rx="3" fill="#394447" stroke="#172125" strokeWidth="1.2" />
              <rect x="-50" y="8" width="5" height="22" rx="2.5" fill="#D4A62B" stroke="#172125" strokeWidth="1.0" />
              <rect x="-46" y="12" width="12" height="14" rx="2" fill="#1B2528" stroke="#172125" strokeWidth="1.0" />
              <rect x="-45" y="13" width="9" height="12" rx="2" fill="#F2C96A" opacity="0.5" />
            </g>

            {/* 3. Twin Primary Vectored Thruster Pods (lower rear) */}
            <g>
              <rect x="-38" y="-6" width="20" height="13" rx="2.5" fill="#394447" stroke="#172125" strokeWidth="1.1" />
              <rect x="-40" y="-6" width="4" height="13" rx="2" fill="#D4A62B" />
              <rect x="-37" y="-4" width="11" height="9" rx="2" fill="#1B2528" />
              <rect x="-36" y="-3" width="8" height="7" rx="2" fill="#F2C96A" opacity="0.5" />
              <rect x="-38" y="10" width="20" height="13" rx="2.5" fill="#394447" stroke="#172125" strokeWidth="1.1" />
              <rect x="-40" y="10" width="4" height="13" rx="2" fill="#D4A62B" />
              <rect x="-37" y="12" width="11" height="9" rx="2" fill="#1B2528" />
              <rect x="-36" y="13" width="8" height="7" rx="2" fill="#F2C96A" opacity="0.5" />
            </g>

            {/* 4. Landing Gear (4 articulated legs) */}
            <g>
              <line x1="-34" y1="21" x2="-52" y2="34" stroke="#59686A" strokeWidth="3.0" />
              <line x1="-34" y1="23" x2="-58" y2="30" stroke="#D4A62B" strokeWidth="1.6" />
              <line x1="-58" y1="30" x2="-52" y2="34" stroke="#DDE4DF" strokeWidth="1.0" />
              <rect x="-60" y="35" width="16" height="5" rx="2" fill="#252E32" stroke="#172125" strokeWidth="1.0" />
              <rect x="-60" y="35" width="16" height="5" rx="2" fill="url(#mammoth-hazard)" />

              <line x1="-10" y1="21" x2="-24" y2="34" stroke="#59686A" strokeWidth="3.0" />
              <line x1="-10" y1="23" x2="-30" y2="30" stroke="#D4A62B" strokeWidth="1.6" />
              <line x1="-30" y1="30" x2="-24" y2="34" stroke="#DDE4DF" strokeWidth="1.0" />
              <rect x="-32" y="35" width="16" height="5" rx="2" fill="#252E32" stroke="#172125" strokeWidth="1.0" />
              <rect x="-32" y="35" width="16" height="5" rx="2" fill="url(#mammoth-hazard)" />

              <line x1="20" y1="21" x2="6" y2="34" stroke="#59686A" strokeWidth="3.0" />
              <line x1="20" y1="23" x2="0" y2="30" stroke="#D4A62B" strokeWidth="1.6" />
              <line x1="0" y1="30" x2="6" y2="34" stroke="#DDE4DF" strokeWidth="1.0" />
              <rect x="-2" y="35" width="16" height="5" rx="2" fill="#252E32" stroke="#172125" strokeWidth="1.0" />
              <rect x="-2" y="35" width="16" height="5" rx="2" fill="url(#mammoth-hazard)" />

              <line x1="48" y1="21" x2="34" y2="34" stroke="#59686A" strokeWidth="3.0" />
              <line x1="48" y1="23" x2="28" y2="30" stroke="#D4A62B" strokeWidth="1.6" />
              <line x1="28" y1="30" x2="34" y2="34" stroke="#DDE4DF" strokeWidth="1.0" />
              <rect x="26" y="35" width="16" height="5" rx="2" fill="#252E32" stroke="#172125" strokeWidth="1.0" />
              <rect x="26" y="35" width="16" height="5" rx="2" fill="url(#mammoth-hazard)" />
            </g>

            {/* 5. Lower Hull / Cargo Deck Skirt */}
            <polygon points="-60,10 60,10 62,22 -62,22" fill="#252E32" stroke="#172125" strokeWidth="1.4" />
            <line x1="-62" y1="16" x2="62" y2="16" stroke="#303A3E" strokeWidth="1.2" />
            <line x1="-62" y1="19" x2="62" y2="19" stroke="#303A3E" strokeWidth="1.2" />
            <rect x="-54" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="-36" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="-18" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="0" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="18" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="36" y="12" width="4" height="3" rx="1" fill="#E86F42" />
            <rect x="54" y="12" width="4" height="3" rx="1" fill="#E86F42" />

            {/* 6. Main Cargo Hold A (forward lower deck) */}
            <g>
              <rect x="8" y="-6" width="50" height="18" rx="2" fill="#252E32" stroke="#172125" strokeWidth="1.2" />
              <line x1="12" y1="-5" x2="12" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="18" y1="-5" x2="18" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="24" y1="-5" x2="24" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="30" y1="-5" x2="30" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="36" y1="-5" x2="36" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="42" y1="-5" x2="42" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="48" y1="-5" x2="48" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <line x1="54" y1="-5" x2="54" y2="11" stroke="#303A3E" strokeWidth="0.8" />
              <rect x="8" y="-6" width="50" height="18" rx="2" fill="none" stroke="#D4A62B" strokeWidth="1.2" />
              <text x="33" y="1" fill="#E0B33A" fontSize="4" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MAMMOTH</text>
              <text x="33" y="6" fill="#E0B33A" fontSize="4" fontFamily="monospace" fontWeight="bold" textAnchor="middle">RIG</text>
              <text x="33" y="-3" fill="#DDE4DF" fontSize="2.6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CARGO</text>
              <rect x="10" y="-4" width="46" height="14" rx="1.5" fill="#1B2528" />
              <rect x="14" y="2" width="6" height="6" rx="1" fill="#B08D57" stroke="#7A5C34" strokeWidth="0.8" />
              <circle cx="17" cy="5" r="2.2" fill="#5A4526" />
              <rect x="23" y="2" width="6" height="6" rx="1" fill="#B08D57" stroke="#7A5C34" strokeWidth="0.8" />
              <circle cx="26" cy="5" r="2.2" fill="#5A4526" />
              <rect x="32" y="2" width="6" height="6" rx="1" fill="#B08D57" stroke="#7A5C34" strokeWidth="0.8" />
              <circle cx="35" cy="5" r="2.2" fill="#5A4526" />
              <rect x="41" y="2" width="6" height="6" rx="1" fill="#B08D57" stroke="#7A5C34" strokeWidth="0.8" />
              <circle cx="44" cy="5" r="2.2" fill="#5A4526" />
              <rect x="50" y="2" width="6" height="6" rx="1" fill="#B08D57" stroke="#7A5C34" strokeWidth="0.8" />
              <circle cx="53" cy="5" r="2.2" fill="#5A4526" />
            </g>

            {/* 7. Central Hull & Engineering Deck */}
            <polygon points="-60,-8 60,-8 62,10 -62,10" fill="#647477" stroke="#172125" strokeWidth="1.6" />
            <line x1="-30" y1="-8" x2="-30" y2="10" stroke="#394447" strokeWidth="1.0" />
            <line x1="0" y1="-8" x2="0" y2="10" stroke="#394447" strokeWidth="1.0" />
            <line x1="30" y1="-8" x2="30" y2="10" stroke="#394447" strokeWidth="1.0" />
            <line x1="-62" y1="4" x2="62" y2="4" stroke="#394447" strokeWidth="1.0" />
            <rect x="-55" y="-18" width="30" height="12" rx="2" fill="#394447" stroke="#172125" strokeWidth="1.1" />
            <line x1="-55" y1="-12" x2="-25" y2="-12" stroke="#D4A62B" strokeWidth="1.4" />
            <line x1="-55" y1="-7" x2="-25" y2="-7" stroke="#D4A62B" strokeWidth="1.4" />

            {/* 8. Upper Deck Personnel Quarters */}
            <polygon points="-45,-8 -45,-32 -10,-32 -5,-8" fill="#647477" stroke="#172125" strokeWidth="1.4" />
            <line x1="-45" y1="-20" x2="-8" y2="-20" stroke="#394447" strokeWidth="0.8" />
            <line x1="-26" y1="-32" x2="-26" y2="-8" stroke="#394447" strokeWidth="0.8" />
            <rect x="-38" y="-30" width="8" height="4" rx="1" fill="#394447" stroke="#172125" strokeWidth="0.8" />
            <rect x="-20" y="-30" width="8" height="4" rx="1" fill="#394447" stroke="#172125" strokeWidth="0.8" />
            <line x1="-30" y1="-16" x2="-12" y2="-16" stroke="#303A3E" strokeWidth="0.8" />
            <line x1="-30" y1="-13" x2="-12" y2="-13" stroke="#303A3E" strokeWidth="0.8" />

            {/* 9. Command Bridge & Sensor Suite (forward upper) */}
            <g>
              <polygon points="5,-8 8,-40 42,-40 46,-8" fill="#647477" stroke="#172125" strokeWidth="1.4" />
              <line x1="14" y1="-40" x2="14" y2="-8" stroke="#394447" strokeWidth="0.8" />
              <line x1="30" y1="-40" x2="30" y2="-8" stroke="#394447" strokeWidth="0.8" />
              <polygon points="12,-36 36,-36 40,-20 9,-20" fill="#39CBD0" stroke="#0F1B1E" strokeWidth="1.0" />
              <polygon points="14,-33 32,-33 34,-27 13,-27" fill="#55E0E2" opacity="0.5" />
              <rect x="16" y="-38" width="6" height="3" rx="1" fill="#394447" stroke="#172125" strokeWidth="0.7" />
              <rect x="26" y="-38" width="6" height="3" rx="1" fill="#394447" stroke="#172125" strokeWidth="0.7" />
              <rect x="44" y="-30" width="6" height="6" rx="1.5" fill="#39CBD0" stroke="#172125" strokeWidth="0.8" />
              <circle cx="46" cy="-27" r="2" fill="#55E0E2" opacity="0.5" />
            </g>

            {/* 10. Masts, Antennas & Red Beacon */}
            <line x1="20" y1="-40" x2="20" y2="-52" stroke="#394447" strokeWidth="1.4" />
            <circle cx="20" cy="-54" r="2.2" fill="#E84942" />
            <line x1="36" y1="-40" x2="36" y2="-49" stroke="#394447" strokeWidth="1.2" />
            <circle cx="36" cy="-50" r="1.2" fill="#252E32" />

            {/* 11. Blunt Armored Bow with HID Searchlight Banks */}
            <g>
              <polygon points="46,-8 56,-20 62,-20 66,-12 66,4 58,8 46,10" fill="#647477" stroke="#172125" strokeWidth="1.6" />
              <rect x="56" y="-14" width="8" height="4" rx="1" fill="#252E32" stroke="#172125" strokeWidth="0.8" />
              <rect x="57" y="-13" width="6" height="2.4" rx="0.8" fill="#FFF0C9" />
              <rect x="57.5" y="-13" width="5" height="2.4" rx="0.8" fill="#F2C96A" opacity="0.6" />
              <rect x="56" y="-8" width="8" height="4" rx="1" fill="#252E32" stroke="#172125" strokeWidth="0.8" />
              <rect x="57" y="-7" width="6" height="2.4" rx="0.8" fill="#FFF0C9" />
              <rect x="57.5" y="-7" width="5" height="2.4" rx="0.8" fill="#F2C96A" opacity="0.6" />
            </g>

            {/* 12. Fuselage Stencil: MAMMOTH RIG */}
            <text x="-8" y="-1" fill="#E0B33A" fontSize="3.4" fontFamily="sans-serif" fontWeight="900" textAnchor="middle">MAMMOTH RIG</text>
            <text x="-8" y="4" fill="#DDE4DF" fontSize="2.2" fontFamily="monospace" fontWeight="bold" textAnchor="middle">C-95 HEAVY LIFT CARGO</text>
            <polygon points="-30,-18 -26,-13 -34,-13" fill="#DDE4DF" />
            <line x1="-30" y1="-17" x2="-28" y2="-13.6" stroke="#394447" strokeWidth="0.6" />

            {/* 13. Hazard Stripes Along Lower Hull Edge */}
            <rect x="-62" y="22" width="124" height="4" fill="url(#mammoth-hazard)" stroke="#D4A62B" strokeWidth="0.8" />
          </g>
        )}



        {/* ========================================================= */}
        {/* MODEL: VANGUARD EXOSHIP (VB-Exo Crusader)                 */}
        {/* ========================================================= */}
        {modelId === 'vanguard' && (
          <g>
            {/* 1. LANDING GEAR & FOOTPADS (data-part="landing-gear") */}
            <g data-part="landing-gear">
              {/* Rear / Lateral Landing Struts & Footpads (receding in perspective) */}
              <g stroke="#2d2010" strokeLinecap="round">
                {/* Left Rear Leg */}
                <line x1="-14" y1="15" x2="-23" y2="23.5" stroke="#c88617" strokeWidth="2.0" />
                <line x1="-14" y1="15" x2="-23" y2="23.5" stroke="#e5a823" strokeWidth="1.2" />
                <line x1="-23" y1="23.5" x2="-25.5" y2="26.8" stroke="#cbd5e1" strokeWidth="1.1" />
                {/* Right Rear Leg */}
                <line x1="14" y1="15" x2="23" y2="23.5" stroke="#c88617" strokeWidth="2.0" />
                <line x1="14" y1="15" x2="23" y2="23.5" stroke="#e5a823" strokeWidth="1.2" />
                <line x1="23" y1="23.5" x2="25.5" y2="26.8" stroke="#cbd5e1" strokeWidth="1.1" />
              </g>
              {/* Rear Outrigger Footpad Dishes */}
              <g data-part="footpad">
                <ellipse cx="-25.5" cy="27" rx="3.8" ry="1.1" fill="url(#vanguard-dish-pad)" stroke="#2d2010" strokeWidth="0.8" />
                <line x1="-28.5" y1="27" x2="-22.5" y2="27" stroke="#854d0e" strokeWidth="0.5" />
                <circle cx="-25.5" cy="27" r="0.7" fill="#cbd5e1" />
              </g>
              <g data-part="footpad">
                <ellipse cx="25.5" cy="27" rx="3.8" ry="1.1" fill="url(#vanguard-dish-pad)" stroke="#2d2010" strokeWidth="0.8" />
                <line x1="22.5" y1="27" x2="28.5" y2="27" stroke="#854d0e" strokeWidth="0.5" />
                <circle cx="25.5" cy="27" r="0.7" fill="#cbd5e1" />
              </g>

              {/* Front Primary Landing Gear Assembly */}
              {/* Upper Main Struts */}
              <line x1="-8" y1="15.5" x2="-13.5" y2="25" stroke="#2d2010" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="-8" y1="15.5" x2="-13.5" y2="25" stroke="#e5a823" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="8" y1="15.5" x2="13.5" y2="25" stroke="#2d2010" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="8" y1="15.5" x2="13.5" y2="25" stroke="#e5a823" strokeWidth="1.6" strokeLinecap="round" />

              {/* Scissor / Diagonal A-Frame Actuator Struts */}
              <line x1="-2" y1="17.5" x2="-13.5" y2="25" stroke="#2d2010" strokeWidth="1.8" />
              <line x1="-2" y1="17.5" x2="-13.5" y2="25" stroke="#c88617" strokeWidth="1.0" />
              <line x1="2" y1="17.5" x2="13.5" y2="25" stroke="#2d2010" strokeWidth="1.8" />
              <line x1="2" y1="17.5" x2="13.5" y2="25" stroke="#c88617" strokeWidth="1.0" />

              {/* Knee Collar & Wiper Rings */}
              <rect x="-14.8" y="24.2" width="2.6" height="1.8" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
              <rect x="12.2" y="24.2" width="2.6" height="1.8" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />

              {/* Lower Telescoping Chrome Oleo Pistons */}
              <line x1="-13.5" y1="25" x2="-16" y2="30.5" stroke="#2d2010" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="-13.5" y1="25" x2="-16" y2="30.5" stroke="#f8fafc" strokeWidth="1.1" strokeLinecap="round" />
              <line x1="13.5" y1="25" x2="16" y2="30.5" stroke="#2d2010" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="13.5" y1="25" x2="16" y2="30.5" stroke="#f8fafc" strokeWidth="1.1" strokeLinecap="round" />

              {/* Footpad Ball Knuckles */}
              <circle cx="-16" cy="30.5" r="1.1" fill="#475569" stroke="#0f172a" strokeWidth="0.6" />
              <circle cx="16" cy="30.5" r="1.1" fill="#475569" stroke="#0f172a" strokeWidth="0.6" />

              {/* Front Primary Footpad Dishes (Large Disc Saucers) */}
              <g data-part="footpad">
                <ellipse cx="-16" cy="30.5" rx="4.5" ry="1.3" fill="url(#vanguard-dish-pad)" stroke="#2d2010" strokeWidth="0.9" />
                <ellipse cx="-16" cy="30.5" rx="3.3" ry="0.9" fill="none" stroke="#92400e" strokeWidth="0.5" />
                {/* Radial Spokes / Ribs */}
                <line x1="-20.2" y1="30.5" x2="-11.8" y2="30.5" stroke="#78350f" strokeWidth="0.5" />
                <line x1="-18.8" y1="29.9" x2="-13.2" y2="31.1" stroke="#78350f" strokeWidth="0.5" />
                <line x1="-18.8" y1="31.1" x2="-13.2" y2="29.9" stroke="#78350f" strokeWidth="0.5" />
                <circle cx="-16" cy="30.5" r="0.9" fill="#f8fafc" stroke="#2d2010" strokeWidth="0.5" />
              </g>
              <g data-part="footpad">
                <ellipse cx="16" cy="30.5" rx="4.5" ry="1.3" fill="url(#vanguard-dish-pad)" stroke="#2d2010" strokeWidth="0.9" />
                <ellipse cx="16" cy="30.5" rx="3.3" ry="0.9" fill="none" stroke="#92400e" strokeWidth="0.5" />
                {/* Radial Spokes / Ribs */}
                <line x1="11.8" y1="30.5" x2="20.2" y2="30.5" stroke="#78350f" strokeWidth="0.5" />
                <line x1="13.2" y1="29.9" x2="18.8" y2="31.1" stroke="#78350f" strokeWidth="0.5" />
                <line x1="13.2" y1="31.1" x2="18.8" y2="29.9" stroke="#78350f" strokeWidth="0.5" />
                <circle cx="16" cy="30.5" r="0.9" fill="#f8fafc" stroke="#2d2010" strokeWidth="0.5" />
              </g>
            </g>

            {/* 2. TWIN SIDE-MOUNTED PRIMARY THRUSTERS (data-part="engine") */}
            {/* Left Rocket Engine */}
            <g data-part="engine" data-engine="left">
              {/* Upper Gimbal Bracket & Actuator Rods */}
              <rect x="-16.2" y="16.5" width="4.4" height="2.2" rx="0.4" fill="#334155" stroke="#0f172a" strokeWidth="0.7" />
              <line x1="-15.5" y1="16.5" x2="-15.5" y2="18.7" stroke="#94a3b8" strokeWidth="0.6" />
              <line x1="-12.5" y1="16.5" x2="-12.5" y2="18.7" stroke="#94a3b8" strokeWidth="0.6" />
              {/* Turbopump / Injector Dome */}
              <ellipse cx="-14" cy="19.2" rx="2.2" ry="0.8" fill="#475569" stroke="#0f172a" strokeWidth="0.7" />
              <path d="M-16.2 19.2 C-16.2 18.5 -11.8 18.5 -11.8 19.2" fill="#1e293b" />
              {/* Flared Corrugated Rocket Nozzle Bell */}
              <path
                d="M-15.8 19.5 C-15.8 21 -16.8 23 -17.4 24.8 L-10.6 24.8 C-11.2 23 -12.2 21 -12.2 19.5 Z"
                fill="url(#vanguard-thruster-bell)"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              {/* Corrugated Stiffening Rings */}
              <ellipse cx="-14" cy="21.0" rx="2.3" ry="0.4" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              <ellipse cx="-14" cy="22.8" rx="2.8" ry="0.5" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              {/* Dark Combustion Chamber Exit Lip */}
              <ellipse cx="-14" cy="24.8" rx="3.4" ry="0.8" fill="#0f172a" stroke="#64748b" strokeWidth="0.6" />
            </g>

            {/* Right Rocket Engine */}
            <g data-part="engine" data-engine="right">
              {/* Upper Gimbal Bracket & Actuator Rods */}
              <rect x="11.8" y="16.5" width="4.4" height="2.2" rx="0.4" fill="#334155" stroke="#0f172a" strokeWidth="0.7" />
              <line x1="12.5" y1="16.5" x2="12.5" y2="18.7" stroke="#94a3b8" strokeWidth="0.6" />
              <line x1="15.5" y1="16.5" x2="15.5" y2="18.7" stroke="#94a3b8" strokeWidth="0.6" />
              {/* Turbopump / Injector Dome */}
              <ellipse cx="14" cy="19.2" rx="2.2" ry="0.8" fill="#475569" stroke="#0f172a" strokeWidth="0.7" />
              <path d="M11.8 19.2 C11.8 18.5 16.2 18.5 16.2 19.2" fill="#1e293b" />
              {/* Flared Corrugated Rocket Nozzle Bell */}
              <path
                d="M12.2 19.5 C12.2 21 11.2 23 10.6 24.8 L17.4 24.8 C16.8 23 15.8 21 15.8 19.5 Z"
                fill="url(#vanguard-thruster-bell)"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              {/* Corrugated Stiffening Rings */}
              <ellipse cx="14" cy="21.0" rx="2.3" ry="0.4" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              <ellipse cx="14" cy="22.8" rx="2.8" ry="0.5" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              {/* Dark Combustion Chamber Exit Lip */}
              <ellipse cx="14" cy="24.8" rx="3.4" ry="0.8" fill="#0f172a" stroke="#64748b" strokeWidth="0.6" />
            </g>

            {/* 3. MAIN HULL STRUCTURE (data-part="hull") */}
            <g data-part="hull">
              {/* Lower Descent Stage Outer Flank Facets (Darker Shaded Chamfers) */}
              <polygon
                points="-7.5,-2.5 -13,0.5 -17,14.5 -18.5,16.5 -12,19.5 0,18 12,19.5 18.5,16.5 17,14.5 13,0.5 7.5,-2.5"
                fill="url(#vanguard-hull-facet)"
                stroke="#2d2010"
                strokeWidth="1.2"
              />
              {/* Center Recessed Equipment Bulkhead Plate */}
              <polygon
                points="-10,-1 -10,16.5 -7,18 7,18 10,16.5 10,-1"
                fill="url(#vanguard-hull-gold)"
                stroke="#854d0e"
                strokeWidth="0.8"
              />
              {/* Panel Chamfer Seam Lines */}
              <line x1="-10" y1="-1" x2="-13" y2="0.5" stroke="#78350f" strokeWidth="0.8" />
              <line x1="-10" y1="16.5" x2="-18.5" y2="16.5" stroke="#78350f" strokeWidth="0.8" />
              <line x1="10" y1="-1" x2="13" y2="0.5" stroke="#78350f" strokeWidth="0.8" />
              <line x1="10" y1="16.5" x2="18.5" y2="16.5" stroke="#78350f" strokeWidth="0.8" />

              {/* Transitional Neck Collar */}
              <path d="M-6 -4.5 L6 -4.5 L7.5 -2.5 L-7.5 -2.5 Z" fill="#92400e" stroke="#2d2010" strokeWidth="1.0" />
              <line x1="-5.5" y1="-3.5" x2="5.5" y2="-3.5" stroke="#f59e0b" strokeWidth="0.6" />

              {/* Spherical Cockpit Shell */}
              <circle cx="0" cy="-16.5" r="12" fill="url(#vanguard-hull-gold)" stroke="#2d2010" strokeWidth="1.3" />
              {/* Shading Crescent on Cockpit Edge */}
              <path
                d="M-8.5 -25 A 12 12 0 0 0 -8.5 -8 A 12.8 12.8 0 0 1 -8.5 -25 Z"
                fill="#b45309"
                opacity="0.3"
              />

              {/* Flank RCS Thruster / Sensor Blocks */}
              <rect x="-14.6" y="-18.2" width="2.8" height="3.4" rx="0.6" fill="#cf9020" stroke="#2d2010" strokeWidth="0.8" />
              <rect x="-15.5" y="-17.2" width="1.0" height="1.4" rx="0.3" fill="#1e293b" />
              <rect x="11.8" y="-18.2" width="2.8" height="3.4" rx="0.6" fill="#cf9020" stroke="#2d2010" strokeWidth="0.8" />
              <rect x="14.5" y="-17.2" width="1.0" height="1.4" rx="0.3" fill="#1e293b" />

              {/* Upper Left Snorkel / Periscope Cap */}
              <g transform="translate(-7.8 -25.8) rotate(-35)">
                <rect x="-1.2" y="-1.5" width="2.4" height="2.0" rx="0.5" fill="#cbd5e1" stroke="#2d2010" strokeWidth="0.7" />
                <ellipse cx="0" cy="-1.5" rx="1.2" ry="0.6" fill="#38bdf8" />
              </g>
              {/* Upper Right Relief Disc */}
              <circle cx="7" cy="-26.5" r="1.1" fill="#cbd5e1" stroke="#2d2010" strokeWidth="0.6" />

              {/* Umbilical Cable Harness Conduit (Left side into lower stage) */}
              <path
                d="M-11.8 -13.5 C-11.5 -8 -11.0 -4 -9.5 -1.2"
                fill="none"
                stroke="#1e293b"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Harness Clamps */}
              <rect x="-12.3" y="-10.5" width="1.6" height="0.8" fill="#e2e8f0" />
              <rect x="-11.6" y="-5.5" width="1.6" height="0.8" fill="#e2e8f0" />
              {/* Ingress Grommets on Deck */}
              <circle cx="-9.6" cy="-1.2" r="0.6" fill="#0f172a" />
              <circle cx="-8.4" cy="-0.6" r="0.6" fill="#0f172a" />
            </g>

            {/* 4. CANOPY & GOLD IRIS SENSOR (data-part="canopy") */}
            <g data-part="canopy">
              {/* Outer Window Frame Bezel */}
              <circle cx="0" cy="-16.5" r="10.4" fill="#1e293b" stroke="#2d2010" strokeWidth="1.0" />
              <circle cx="0" cy="-16.5" r="9.7" fill="#0f172a" />

              {/* 6 Segmented Radial Panoramic Window Panes */}
              <circle cx="0" cy="-16.5" r="9.6" fill="url(#vanguard-window-glass)" />

              {/* Window Mullions / Structural Spoke Dividers */}
              <g stroke="#0f172a" strokeWidth="1.2" strokeLinecap="square">
                {/* Top & Bottom Vertical Mullions */}
                <line x1="0" y1="-26.1" x2="0" y2="-21.4" />
                <line x1="0" y1="-11.6" x2="0" y2="-6.9" />
                {/* Angled Spokes at 30, 150, 210, 330 degrees */}
                <line x1="-8.2" y1="-21.3" x2="-4.2" y2="-18.9" />
                <line x1="8.2" y1="-21.3" x2="4.2" y2="-18.9" />
                <line x1="-8.2" y1="-11.7" x2="-4.2" y2="-14.1" />
                <line x1="8.2" y1="-11.7" x2="4.2" y2="-14.1" />
              </g>
              {/* Subtle Specular Glare Reflection on Glass Panes */}
              <path
                d="M-7.5 -21 A 9.4 9.4 0 0 1 7.5 -21 A 9.0 9.0 0 0 0 -7.5 -21 Z"
                fill="#ffffff"
                opacity="0.35"
              />

              {/* GOLD IRIS SENSOR */}
              {/* Outer Gold Ring Bezel */}
              <circle cx="0" cy="-16.5" r="4.9" fill="url(#vanguard-iris-gold)" stroke="#854d0e" strokeWidth="0.7" />
              {/* Stepped Concentric Inner Ring */}
              <circle cx="0" cy="-16.5" r="4.1" fill="#ca8a04" stroke="#78350f" strokeWidth="0.5" />
              <circle cx="0" cy="-16.5" r="3.9" fill="url(#vanguard-iris-gold)" />

              {/* Radial Iris Turbine / Diaphragm Blades */}
              <g stroke="#78350f" strokeWidth="0.4" opacity="0.9">
                {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
                  <line
                    key={`iris-${deg}`}
                    x1={Math.sin((deg * Math.PI) / 180) * 2.3}
                    y1={-16.5 - Math.cos((deg * Math.PI) / 180) * 2.3}
                    x2={Math.sin((deg * Math.PI) / 180) * 3.9}
                    y2={-16.5 - Math.cos((deg * Math.PI) / 180) * 3.9}
                  />
                ))}
              </g>

              {/* Inner Stepped Gold Collar */}
              <circle cx="0" cy="-16.5" r="2.3" fill="#ca8a04" stroke="#854d0e" strokeWidth="0.5" />
              {/* Central Sensor Optic Aperture */}
              <circle cx="0" cy="-16.5" r="1.5" fill="#451a03" stroke="#eab308" strokeWidth="0.4" />
              <circle cx="0" cy="-16.5" r="0.8" fill="#fbbf24" />
              <circle cx="-0.3" cy="-16.8" r="0.4" fill="#ffffff" opacity="0.8" />
            </g>

            {/* 5. DETAILS: EQUIPMENT, TANKS, PLUMBING, PLAQUE, ANTENNA MAST (data-part="detail") */}
            <g data-part="detail">
              {/* TOP HALO RING ANTENNA & WHIP SENSOR MAST */}
              {/* Support Lattice Truss */}
              <polygon points="-2.5,-27.5 2.5,-27.5 8,-32 -8,-32" fill="#2d2010" opacity="0.15" />
              <line x1="-8.5" y1="-32" x2="-2.5" y2="-27.5" stroke="#c88617" strokeWidth="1.4" />
              <line x1="8.5" y1="-32" x2="2.5" y2="-27.5" stroke="#c88617" strokeWidth="1.4" />
              <line x1="0" y1="-32.5" x2="0" y2="-27.5" stroke="#e5a823" strokeWidth="1.6" />
              {/* Internal Lattice Diagonal Bracing */}
              <g stroke="#78350f" strokeWidth="0.6">
                <line x1="-7.5" y1="-31.5" x2="-5" y2="-28.5" />
                <line x1="-4" y1="-31.5" x2="-2" y2="-28.5" />
                <line x1="7.5" y1="-31.5" x2="5" y2="-28.5" />
                <line x1="4" y1="-31.5" x2="2" y2="-28.5" />
              </g>

              {/* Halo / Torus Ring Antenna */}
              <ellipse cx="0" cy="-32.5" rx="12" ry="2.5" fill="url(#vanguard-hull-gold)" stroke="#2d2010" strokeWidth="1.0" />
              <ellipse cx="0" cy="-32.5" rx="8.5" ry="1.4" fill="#f8fafc" stroke="#2d2010" strokeWidth="0.8" />
              <ellipse cx="0" cy="-32.5" rx="11" ry="2.1" fill="none" stroke="#fef08a" strokeWidth="0.4" />

              {/* Vertical Probe Mast with Twin-Fork Sensor Tip */}
              <rect x="-0.8" y="-34.5" width="1.6" height="2.0" rx="0.4" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="0" y1="-34.5" x2="0" y2="-38.8" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0" y1="-34.5" x2="0" y2="-38.8" stroke="#94a3b8" strokeWidth="0.6" strokeLinecap="round" />
              {/* Twin-Fork Sensor Head */}
              <path d="M-0.8 -38.8 L0.8 -38.8 M-0.8 -38.8 L-0.8 -40.0 M0.8 -38.8 L0.8 -40.0" stroke="#0f172a" strokeWidth="0.6" fill="none" />

              {/* COPPER FUEL TANK (Left Lower Stage) */}
              <g id="copper-fuel-tank">
                {/* Top/Bottom Mounting Bulkhead Brackets */}
                <rect x="-7" y="1.2" width="2" height="1.8" rx="0.3" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
                <rect x="-7" y="10.8" width="2" height="1.8" rx="0.3" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
                {/* Tank Main Body Cylinder */}
                <rect x="-8.8" y="3.1" width="5.6" height="6.8" fill="url(#vanguard-copper-tank)" stroke="#2d2010" strokeWidth="0.8" />
                {/* Hemispherical Top Dome */}
                <path d="M-8.8 3.1 C-8.8 1.4 -3.2 1.4 -3.2 3.1 Z" fill="url(#vanguard-copper-tank)" stroke="#2d2010" strokeWidth="0.8" />
                {/* Hemispherical Bottom Dome */}
                <path d="M-8.8 9.9 C-8.8 11.6 -3.2 11.6 -3.2 9.9 Z" fill="url(#vanguard-copper-tank)" stroke="#2d2010" strokeWidth="0.8" />
                {/* Circumferential Weld Seam Band */}
                <line x1="-8.8" y1="6.5" x2="-3.2" y2="6.5" stroke="#7c2d12" strokeWidth="0.8" />
                <line x1="-8.8" y1="6.5" x2="-3.2" y2="6.5" stroke="#ea875a" strokeWidth="0.4" />
                {/* Specular Highlight Streak */}
                <line x1="-5.5" y1="2.2" x2="-5.5" y2="10.8" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />

                {/* Intricate Manifold Plumbing Network */}
                {/* Central 4-Way Cross Valve Block */}
                <rect x="-4.8" y="5.7" width="2.0" height="1.6" rx="0.3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="0.5" />
                <circle cx="-3.8" cy="6.5" r="0.6" fill="#64748b" />
                {/* Vertical Feed/Sensor Line */}
                <line x1="-6.0" y1="1.4" x2="-3.8" y2="1.4" stroke="#94a3b8" strokeWidth="0.6" />
                <line x1="-3.8" y1="1.4" x2="-3.8" y2="5.7" stroke="#cbd5e1" strokeWidth="0.6" />
                <line x1="-3.8" y1="7.3" x2="-3.8" y2="11.5" stroke="#cbd5e1" strokeWidth="0.6" />
                <line x1="-3.8" y1="11.5" x2="-6.0" y2="11.5" stroke="#94a3b8" strokeWidth="0.6" />
                {/* Pressure Sensor Needle Probe */}
                <line x1="-3.8" y1="3.5" x2="-3.8" y2="2.5" stroke="#ef4444" strokeWidth="0.5" strokeLinecap="round" />
                {/* Left Bypass Loop */}
                <path d="M-4.8 6.0 C-6.2 6.0 -6.2 7.0 -4.8 7.0" fill="none" stroke="#cbd5e1" strokeWidth="0.5" />
                {/* S-Curve Flex Lines Routing Over to Avionics Bay */}
                <path d="M-2.8 6.0 C-1.5 6.0 -0.5 5.0 2.6 5.5" fill="none" stroke="#cbd5e1" strokeWidth="0.7" />
                <path d="M-2.8 7.0 C-1.0 7.0 -0.5 8.5 2.6 8.0" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
              </g>

              {/* AVIONICS BAY (Right Lower Stage) */}
              <g id="avionics-bay">
                {/* Chassis Box */}
                <rect x="2.6" y="3.2" width="6.4" height="7.2" rx="0.8" fill="url(#vanguard-avionics)" stroke="#1e293b" strokeWidth="0.8" />
                {/* 3 Top Vertical Whip Antennas */}
                <g stroke="#0f172a" strokeLinecap="round">
                  {/* Rubber Mount Boots */}
                  <rect x="3.7" y="2.5" width="1.0" height="0.8" fill="#1e293b" />
                  <rect x="5.3" y="2.5" width="1.0" height="0.8" fill="#1e293b" />
                  <rect x="6.9" y="2.5" width="1.0" height="0.8" fill="#1e293b" />
                  {/* Antenna Rods */}
                  <line x1="4.2" y1="2.5" x2="4.2" y2="-0.5" strokeWidth="0.8" />
                  <line x1="5.8" y1="2.5" x2="5.8" y2="-1.8" strokeWidth="0.8" />
                  <line x1="7.4" y1="2.5" x2="7.4" y2="-1.0" strokeWidth="0.8" />
                </g>

                {/* Multi-Pin Flex Cable Connector Block */}
                <rect x="2.0" y="5.0" width="0.8" height="3.5" rx="0.2" fill="#64748b" stroke="#0f172a" strokeWidth="0.5" />

                {/* Instruments / Gauges on Face */}
                {/* Top Right: Large Circular Dial */}
                <circle cx="7.2" cy="5.2" r="1.3" fill="#0f172a" stroke="#cbd5e1" strokeWidth="0.5" />
                <circle cx="7.2" cy="5.2" r="0.9" fill="#1e293b" />
                <line x1="7.2" y1="5.2" x2="7.8" y2="4.7" stroke="#38bdf8" strokeWidth="0.4" />

                {/* Top Left: Medium Circular Dial / CRT Display */}
                <circle cx="4.5" cy="5.2" r="1.1" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.5" />
                <circle cx="4.5" cy="5.2" r="0.7" fill="#0284c7" />

                {/* Bottom Left: Gauge */}
                <circle cx="4.5" cy="8.0" r="0.9" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.4" />
                <circle cx="4.5" cy="8.0" r="0.5" fill="#38bdf8" />

                {/* Bottom Right: Gauge */}
                <circle cx="7.2" cy="8.0" r="0.9" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.4" />
                <circle cx="7.2" cy="8.0" r="0.5" fill="#e2e8f0" />

                {/* Bottom Center: Fuse Plate & Status Toggle Switch */}
                <rect x="5.4" y="7.5" width="1.0" height="1.2" rx="0.2" fill="#1e293b" />
                <circle cx="5.9" cy="8.1" r="0.3" fill="#22c55e" />
              </g>

              {/* Upper Center Flush Access Hatch */}
              <rect x="0.8" y="-0.8" width="2.4" height="2.0" rx="0.4" fill="#cbd5e1" stroke="#334155" strokeWidth="0.6" />
              <circle cx="2.0" cy="0.2" r="0.3" fill="#475569" />

              {/* IDENTIFICATION PLAQUE */}
              <g id="vanguard-plaque">
                <rect x="-8.5" y="12.4" width="17" height="3.2" rx="0.4" fill="#cbd5e1" stroke="#334155" strokeWidth="0.6" />
                {/* 4 Corner Screws */}
                <circle cx="-7.8" cy="13.1" r="0.3" fill="#475569" />
                <circle cx="7.8" cy="13.1" r="0.3" fill="#475569" />
                <circle cx="-7.8" cy="14.9" r="0.3" fill="#475569" />
                <circle cx="7.8" cy="14.9" r="0.3" fill="#475569" />
                {/* Vanguard 3-Chevron Logo */}
                <g stroke="#0f172a" strokeWidth="0.4" fill="none">
                  <path d="M-6.8 13.5 L-6.2 13.1 L-5.6 13.5" />
                  <path d="M-6.8 14.0 L-6.2 13.6 L-5.6 14.0" />
                  <path d="M-6.8 14.5 L-6.2 14.1 L-5.6 14.5" />
                </g>
                {/* Plaque Text */}
                <text
                  x="-4.8"
                  y="13.6"
                  fill="#0f172a"
                  fontSize="0.8"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="bold"
                  letterSpacing="0.04em"
                >
                  VANGUARD ORBITAL YARDS
                </text>
                <text
                  x="-4.8"
                  y="14.9"
                  fill="#334155"
                  fontSize="0.65"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight="600"
                  letterSpacing="0.02em"
                >
                  (MARS) • VB-Exo Crusader
                </text>
              </g>

              {/* LOWER ACCESS / EGRESS SERVICE HATCH DOOR */}
              <g id="service-door">
                <rect x="0.8" y="16.3" width="2.8" height="4.0" rx="0.5" fill="#cbd5e1" stroke="#334155" strokeWidth="0.6" />
                <rect x="1.2" y="16.7" width="2.0" height="3.2" rx="0.3" fill="#e2e8f0" />
                {/* Grab Handle */}
                <path d="M0.3 17.0 L0.1 17.0 L0.1 18.6 L0.3 18.6" fill="none" stroke="#334155" strokeWidth="0.6" strokeLinecap="round" />
                {/* Toggle Switch / Circuit Breaker */}
                <rect x="-1.2" y="17.2" width="0.8" height="1.2" rx="0.2" fill="#334155" />
                <circle cx="-0.8" cy="17.8" r="0.3" fill="#ef4444" />
              </g>
            </g>

            {/* 6. SUBTLE LANDING BLINKING LIGHTS (data-part="navlight") */}
            <g data-part="navlight">
              {/* Front Gear Knee Landing Alignment Lights */}
              <circle cx="-13.5" cy="25" r="1.3" fill="#fbbf24">
                <animate attributeName="opacity" values="0.15;0.65;0.15" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="-13.5" cy="25" r="0.55" fill="#ffffff" stroke="#d97706" strokeWidth="0.3" />

              <circle cx="13.5" cy="25" r="1.3" fill="#fbbf24">
                <animate attributeName="opacity" values="0.15;0.65;0.15" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="13.5" cy="25" r="0.55" fill="#ffffff" stroke="#d97706" strokeWidth="0.3" />

              {/* Lower Outer Sponson Clearance Beacons */}
              <circle cx="-17.8" cy="16.2" r="1.2" fill="#4ade80">
                <animate attributeName="opacity" values="0.15;0.55;0.15" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="-17.8" cy="16.2" r="0.5" fill="#ffffff" stroke="#16a34a" strokeWidth="0.3" />

              <circle cx="17.8" cy="16.2" r="1.2" fill="#4ade80">
                <animate attributeName="opacity" values="0.15;0.55;0.15" dur="1.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="17.8" cy="16.2" r="0.5" fill="#ffffff" stroke="#16a34a" strokeWidth="0.3" />
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: WASP SCOUT (WS-2 Stinger Micro Lander)             */}
        {/* ========================================================= */}
                {modelId === 'wasp' && (
          <g>
            {/* 1. Landring Gear — Twin Struts & Isolated Footpads */}
            <g stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none">
              <line x1="-12" y1="12" x2="-24" y2="28" />
              <line x1="12" y1="12" x2="24" y2="28" />
            </g>
            <g stroke="#94a3b8" strokeWidth="1.0" strokeLinecap="round" fill="none">
              <line x1="-12" y1="12" x2="-24" y2="28" />
              <line x1="12" y1="12" x2="24" y2="28" />
            </g>
            <g>
              <rect x="-31" y="27.5" width="14" height="4" rx="1.5" fill="#1e293b" />
              <rect x="-29" y="28" width="10" height="2" rx="1" fill="#64748b" />
              <rect x="17" y="27.5" width="14" height="4" rx="1.5" fill="#1e293b" />
              <rect x="19" y="28" width="10" height="2" rx="1" fill="#64748b" />
            </g>

            {/* 2. Wings — Swept Heavy Wings */}
            <path d="M-10 -8 C-20 2 -28 12 -34 20 L-36 28 L-24 24 L-12 20 Z" fill="url(#wasp-hull-dark-grad)" stroke="#1e293b" strokeWidth="1" />
            <path d="M10 -8 C20 2 28 12 34 20 L36 28 L24 24 L12 20 Z" fill="url(#wasp-hull-dark-grad)" stroke="#1e293b" strokeWidth="1" />

            {/* Wing cannon pods + collars */}
            <rect x="-30" y="-4" width="4" height="26" rx="2" fill="url(#wasp-pod-grad)" stroke="#1e293b" strokeWidth="0.8" />
            <rect x="26" y="-4" width="4" height="26" rx="2" fill="url(#wasp-pod-grad)" stroke="#1e293b" strokeWidth="0.8" />
            <path d="M-29 -10 L-27 -10 L-27 -4 L-29 -4 Z" fill="#64748b" stroke="#1e293b" strokeWidth="0.5" />
            <path d="M27 -10 L29 -10 L29 -4 L27 -4 Z" fill="#64748b" stroke="#1e293b" strokeWidth="0.5" />

            {/* 3. Hull — Armored Fuselage, Raised Plate, Crossbrace */}
            <path
              d="M0 -38 L6 -26 C12 -16 16 -6 16 10 L12 24 L-12 24 L-16 10 C-16 -6 -12 -16 -6 -26 Z"
              fill="url(#wasp-hull-light-grad)"
              stroke="#1e293b"
              strokeWidth="1.2"
            />
            <path d="M0 -26 L8 -14 L8 4 L4 8 L-4 8 L-8 4 L-8 -14 Z" fill="url(#wasp-hull-dark-grad)" stroke="#334155" strokeWidth="0.8" />
            <rect x="-10" y="-6" width="20" height="6" rx="1" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />
            <line x1="-8" y1="-3" x2="8" y2="-3" stroke="#1e293b" strokeWidth="1" />

            {/* Engine cylinders (on hull) + ribbing */}
            <rect x="-15" y="4" width="11" height="20" rx="4.5" fill="url(#wasp-pod-grad)" stroke="#1e293b" strokeWidth="1" />
            <rect x="4" y="4" width="11" height="20" rx="4.5" fill="url(#wasp-pod-grad)" stroke="#1e293b" strokeWidth="1" />
            <g stroke="#1e293b" strokeWidth="0.8" opacity="0.6">
              <line x1="-14" y1="12" x2="-5" y2="12" />
              <line x1="-14" y1="15" x2="-5" y2="15" />
              <line x1="-14" y1="18" x2="-5" y2="18" />
              <line x1="-14" y1="21" x2="-5" y2="21" />
              <line x1="5" y1="12" x2="14" y2="12" />
              <line x1="5" y1="15" x2="14" y2="15" />
              <line x1="5" y1="18" x2="14" y2="18" />
              <line x1="5" y1="21" x2="14" y2="21" />
            </g>

            {/* 4. Engine Nozzles */}
            <path d="M-13 24 L-6 24 L-7 28 L-12 28 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <path d="M6 24 L13 24 L12 28 L7 28 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <rect x="-11" y="27" width="4" height="2" fill="#334155" />
            <rect x="7" y="27" width="4" height="2" fill="#334155" />

            {/* 5. Canopy — Deep Inset Cockpit Glass */}
            <path d="M0 -29 L4 -18 L3 -13 L-3 -13 L-4 -18 Z" fill="url(#wasp-canopy-grad)" stroke="#0f172a" strokeWidth="1.2" />
            <path d="M0 -27 L2 -18 L2 -14 M0 -27 L-2 -18 L-2 -14" stroke="#475569" strokeWidth="0.6" fill="none" />

            {/* 6. Details — antennae, accents, fin, decals */}
            <g stroke="#475569" strokeWidth="0.8" strokeLinecap="round">
              <line x1="-3" y1="-32" x2="-3" y2="-39.4" />
              <line x1="3" y1="-32" x2="3" y2="-39.4" />
            </g>
            <circle cx="-3" cy="-39.4" r="0.7" fill="#ef4444" />
            <circle cx="3" cy="-39.4" r="0.7" fill="#10b981" />

            <path d="M-11 -6 L-13 8 L-10 8 L-8 -6 Z" fill="url(#wasp-orange-grad)" stroke="#9a3412" strokeWidth="0.6" />
            <path d="M11 -6 L13 8 L10 8 L8 -6 Z" fill="url(#wasp-orange-grad)" stroke="#9a3412" strokeWidth="0.6" />

            <polygon points="-1,6 1,6 1.5,25 0,27 -1.5,25" fill="url(#wasp-yellow-grad)" stroke="#a16207" strokeWidth="0.5" />
            <polygon points="-29,14 -27,26 -30,26" fill="url(#wasp-yellow-grad)" stroke="#a16207" strokeWidth="0.4" />
            <polygon points="29,14 27,26 30,26" fill="url(#wasp-yellow-grad)" stroke="#a16207" strokeWidth="0.4" />

            <line x1="-6" y1="-20" x2="-14" y2="-12" stroke="#64748b" strokeWidth="0.5" />
            <line x1="6" y1="-20" x2="14" y2="-12" stroke="#64748b" strokeWidth="0.5" />

            <polygon points="0,-4 3,-1 0,2 -3,-1" fill="#facc15" opacity="0.8" />
            <polygon points="0,0 2,2 0,4 -2,2" fill="#facc15" opacity="0.8" />
          </g>
        )}


        {/* ========================================================= */}
        {/* MODEL: KESTREL STUNT (KS-9 Aerobatic Dart)                */}
        {/* ========================================================= */}
        {modelId === 'kestrel' && (
          <g>
            {/* 1. Landing Gear Assembly — Articulated Spring Struts & Titanium Skids */}
            <g strokeLinecap="round">
              {/* Main Oleo Struts */}
              <line x1="-13" y1="10" x2="-24" y2="28" stroke="#475569" strokeWidth="2.2" />
              <line x1="13" y1="10" x2="24" y2="28" stroke="#475569" strokeWidth="2.2" />
              {/* Secondary Scissor Torque Links */}
              <line x1="-7" y1="15" x2="-24" y2="28" stroke="#64748b" strokeWidth="1.2" />
              <line x1="7" y1="15" x2="24" y2="28" stroke="#64748b" strokeWidth="1.2" />
              {/* Chrome Lower Piston Sliders */}
              <line x1="-21" y1="23" x2="-24" y2="28" stroke="#f8fafc" strokeWidth="1.4" />
              <line x1="21" y1="23" x2="24" y2="28" stroke="#f8fafc" strokeWidth="1.4" />
            </g>

            {/* Titanium Landing Skids (strictly isolated subpaths) */}
            <rect x="-30" y="28" width="12" height="3" rx="1.2" fill="url(#kestrel-skid-grad)" stroke="#06b6d4" strokeWidth="0.8" />
            <rect x="-28" y="29.6" width="8" height="1.2" rx="0.5" fill="#0f172a" />
            <rect x="18" y="28" width="12" height="3" rx="1.2" fill="url(#kestrel-skid-grad)" stroke="#06b6d4" strokeWidth="0.8" />
            <rect x="20" y="29.6" width="8" height="1.2" rx="0.5" fill="#0f172a" />

            {/* 2. Forward-Swept Canards */}
            <path d="M-4.5 -18 L-18 -14 L-15 -8 L-5 -10 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" strokeWidth="0.8" />
            <path d="M4.5 -18 L18 -14 L15 -8 L5 -10 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" strokeWidth="0.8" />
            <path d="M-4.5 -18 L-18 -14 L-14 -13 L-4.5 -16 Z" fill="url(#kestrel-cyan-grad)" />
            <path d="M4.5 -18 L18 -14 L14 -13 L4.5 -16 Z" fill="url(#kestrel-cyan-grad)" />

            {/* Main Delta Wings */}
            <path d="M-6 -4 L-35 14 L-36 7 L-35 18 L-22 17.5 L-8 18 L-8 8 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" strokeWidth="0.9" />
            <path d="M6 -4 L35 14 L36 7 L35 18 L22 17.5 L8 18 L8 8 Z" fill="url(#kestrel-wing-grad)" stroke="#1e293b" strokeWidth="0.9" />

            {/* Wingtip Endplates / Vertical Fences */}
            <path d="M-36 6 L-34 6 L-34 18 L-36 18 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.6" />
            <path d="M34 6 L36 6 L36 18 L34 18 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.6" />

            {/* 3. Central Needle Fuselage & Dorsal Ridge */}
            <path d="M0 -38 L3.5 -31 L4.8 -18 L6.5 -4 L8 8 L8 18 L0 20 L-8 18 L-8 8 L-6.5 -4 L-4.8 -18 L-3.5 -31 Z" fill="url(#kestrel-hull-grad)" stroke="#334155" strokeWidth="0.8" />
            <path d="M0 -38 L3.5 -31 L-3.5 -31 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
            <line x1="0" y1="-38" x2="0" y2="-39.4" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M0 -38 L1.2 -30 L1.5 6 L0 18 L-1.5 6 L-1.2 -30 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="0.5" />

            {/* 4. Engine Nacelles & Twin Cryo-Methane Bells */}
            <g stroke="#1e293b" strokeWidth="0.7">
              <path d="M-17 6 L-9 6 L-8.5 18 L-17.5 18 Z" fill="url(#kestrel-nozzle-grad)" />
              <path d="M9 6 L17 6 L17.5 18 L8.5 18 Z" fill="url(#kestrel-nozzle-grad)" />
            </g>
            <path d="M-4 18 L4 18 L2 21 L-2 21 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />

            {/* Left Engine Bell */}
            <path d="M-15.5 18 L-10.5 18 L-9 24 L-17 24 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.7" />
            <rect x="-16" y="18" width="6" height="1.6" fill="#06b6d4" />
            <ellipse cx="-13" cy="23.5" rx="3.5" ry="0.9" fill="#0284c7" />
            <ellipse cx="-13" cy="23.5" rx="1.8" ry="0.5" fill="#38bdf8" />

            {/* Right Engine Bell */}
            <path d="M10.5 18 L15.5 18 L17 24 L9 24 Z" fill="#0f172a" stroke="#334155" strokeWidth="0.7" />
            <rect x="10" y="18" width="6" height="1.6" fill="#06b6d4" />
            <ellipse cx="13" cy="23.5" rx="3.5" ry="0.9" fill="#0284c7" />
            <ellipse cx="13" cy="23.5" rx="1.8" ry="0.5" fill="#38bdf8" />

            {/* 5. Canopy — Faceted Aerobatic Teardrop Bubble */}
            <path d="M0 -25 L4.8 -16 L4.5 -8 L0 -6 L-4.5 -8 L-4.8 -16 Z" fill="#0f172a" stroke="#0891b2" strokeWidth="0.8" />
            <path d="M0 -24 L3.8 -16 L3.6 -9 L0 -7 L-3.6 -9 L-3.8 -16 Z" fill="url(#kestrel-canopy-grad)" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="-3.8" y1="-16" x2="3.8" y2="-16" stroke="#0f172a" strokeWidth="0.9" />
            <ellipse cx="-1.5" cy="-18" rx="1.2" ry="4" transform="rotate(-15 -1.5 -18)" fill="#ffffff" opacity="0.65" />

            {/* 6. Aerobatic Livery, Chevrons & Seams */}
            <path d="M-7 0 L-32 13 L-32 15 L-7 2 Z" fill="url(#kestrel-cyan-grad)" />
            <path d="M7 0 L32 13 L32 15 L7 2 Z" fill="url(#kestrel-cyan-grad)" />
            <path d="M-8 3 L-30 14" stroke="#f8fafc" strokeWidth="0.5" fill="none" opacity="0.9" />
            <path d="M8 3 L30 14" stroke="#f8fafc" strokeWidth="0.5" fill="none" opacity="0.9" />

            {/* Elevon Control Surface Seams */}
            <g stroke="#334155" strokeWidth="0.6" fill="none">
              <line x1="-9" y1="15" x2="-33" y2="15" />
              <line x1="9" y1="15" x2="33" y2="15" />
              <rect x="-22" y="14" width="2" height="3" rx="0.5" fill="#475569" />
              <rect x="-15" y="14" width="2" height="3" rx="0.5" fill="#475569" />
              <rect x="13" y="14" width="2" height="3" rx="0.5" fill="#475569" />
              <rect x="20" y="14" width="2" height="3" rx="0.5" fill="#475569" />
            </g>

            {/* Turbopump Air Intake Louvers */}
            <g stroke="#64748b" strokeWidth="0.5" fill="none">
              <line x1="-15" y1="8" x2="-11" y2="8" />
              <line x1="-15" y1="10.5" x2="-11" y2="10.5" />
              <line x1="-15" y1="13" x2="-11" y2="13" />
              <line x1="11" y1="8" x2="15" y2="8" />
              <line x1="11" y1="10.5" x2="15" y2="10.5" />
              <line x1="11" y1="13" x2="15" y2="13" />
            </g>

            {/* Avionics Seams */}
            <g stroke="#475569" strokeWidth="0.4" fill="none">
              <line x1="-3.2" y1="-28" x2="3.2" y2="-28" />
              <line x1="-3.8" y1="-22" x2="3.8" y2="-22" />
              <circle cx="-5" cy="4" r="0.8" />
              <circle cx="5" cy="4" r="0.8" />
            </g>

            {/* Wingtip RCS Quads */}
            <g fill="#ca8a04">
              <circle cx="-35.5" cy="9" r="0.5" />
              <circle cx="-35.5" cy="11" r="0.5" />
              <circle cx="35.5" cy="9" r="0.5" />
              <circle cx="35.5" cy="11" r="0.5" />
            </g>

            {/* 7. Nav Lights */}
            <circle cx="-35.5" cy="16" r="0.8" fill="#ef4444" />
            <circle cx="35.5" cy="16" r="0.8" fill="#22c55e" />
            <circle cx="0" cy="18.5" r="0.7" fill="#38bdf8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* MODEL: SPECTRE TRANSPORT (SP-7 Stealth Dropship)          */}
        {/* ========================================================= */}
        {modelId === 'spectre' && (
          <g>
            {/* 1. Heavy Transport Landing Gear (Articulated Sponson Struts & Isolated RAM Skids) */}
            <g strokeLinecap="round">
              {/* Heavy Pneumatic Main Struts */}
              <line x1="-16" y1="12" x2="-25" y2="28" stroke="#334155" strokeWidth="2.4" />
              <line x1="16" y1="12" x2="25" y2="28" stroke="#334155" strokeWidth="2.4" />
              {/* Scissor Anti-Torque Hinges */}
              <line x1="-8" y1="16" x2="-25" y2="28" stroke="#475569" strokeWidth="1.4" />
              <line x1="8" y1="16" x2="25" y2="28" stroke="#475569" strokeWidth="1.4" />
              {/* Heavy Hydraulic Piston Sliders */}
              <line x1="-22" y1="22" x2="-25" y2="28" stroke="#cbd5e1" strokeWidth="1.6" />
              <line x1="22" y1="22" x2="25" y2="28" stroke="#cbd5e1" strokeWidth="1.6" />
            </g>

            {/* Left Transport Skid Footpad (strictly isolated subpaths) */}
            <rect x="-31" y="28" width="12" height="3" rx="1.2" fill="url(#spectre-foot-grad)" stroke="#a855f7" strokeWidth="0.8" />
            <rect x="-29" y="29.6" width="8" height="1.2" rx="0.5" fill="#020617" />

            {/* Right Transport Skid Footpad */}
            <rect x="19" y="28" width="12" height="3" rx="1.2" fill="url(#spectre-foot-grad)" stroke="#a855f7" strokeWidth="0.8" />
            <rect x="21" y="29.6" width="8" height="1.2" rx="0.5" fill="#020617" />

            {/* 2. Flanking Heavy-Lift Sponsons & Aerodynamic Chines */}
            <path d="M-10 -12 L-33 6 L-33 14 L-25 15 L-22 18 L-10 18 L-9 6 Z" fill="url(#spectre-sponson-grad)" stroke="#1e1b4b" strokeWidth="0.8" />
            <path d="M10 -12 L33 6 L33 14 L25 15 L22 18 L10 18 L9 6 Z" fill="url(#spectre-sponson-grad)" stroke="#1e1b4b" strokeWidth="0.8" />

            {/* Sponson Leading Edge Stealth Chamfers */}
            <path d="M-10 -12 L-33 6 L-29 7 L-10 -9 Z" fill="#090d16" stroke="#475569" strokeWidth="0.4" />
            <path d="M10 -12 L33 6 L29 7 L10 -9 Z" fill="#090d16" stroke="#475569" strokeWidth="0.4" />

            {/* Outer Sponson Cargo Egress Flanges */}
            <rect x="-33.5" y="8" width="3.5" height="6" rx="0.8" fill="#0f172a" stroke="#a855f7" strokeWidth="0.5" />
            <rect x="30" y="8" width="3.5" height="6" rx="0.8" fill="#0f172a" stroke="#a855f7" strokeWidth="0.5" />

            {/* 3. Central Main Transport Fuselage (Volumetric Cargo & Personnel Hold) */}
            <path d="M0 -36 L6 -34 L11 -20 L13 2 L11 18 L0 20 L-11 18 L-13 2 L-11 -20 L-6 -34 Z" fill="url(#spectre-hull-grad)" stroke="#312e81" strokeWidth="0.9" />

            {/* Faceted Forward Nose Cap / Radar Radome */}
            <path d="M0 -36 L6 -34 L7 -24 L-7 -24 L-6 -34 Z" fill="#020617" stroke="#334155" strokeWidth="0.6" />
            {/* Low-RCS Forward Pitot & Sensor Probe */}
            <line x1="0" y1="-36" x2="0" y2="-39.2" stroke="#94a3b8" strokeWidth="0.9" strokeLinecap="round" />

            {/* Central Cargo Hold Spine & Structural Keel */}
            <path d="M0 -36 L2 -22 L2.5 4 L0 18 L-2.5 4 L-2 -22 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="0.5" />

            {/* Cargo Bay Rear Clamshell Loading Ramp (Distinct Transport Feature) */}
            <path d="M-6 8 L6 8 L5 18 L-5 18 Z" fill="url(#spectre-ramp-grad)" stroke="#6b21a8" strokeWidth="0.7" />
            <polyline points="-5,12 -4,13 -2,12 0,13 2,12 4,13 5,12" fill="none" stroke="#a855f7" strokeWidth="0.7" />
            <line x1="-5" y1="18" x2="5" y2="18" stroke="#cbd5e1" strokeWidth="0.8" />

            {/* 4. Engines (Twin Heavy-Lift 2D Vectoring Nacelles) */}
            {/* Port Heavy Lift Engine */}
            <path d="M-18 6 L-9 6 L-8.5 18 L-18.5 18 Z" fill="url(#spectre-nozzle-grad)" stroke="#1e1b4b" strokeWidth="0.8" />
            <path d="M-17 18 L-10 18 L-9 24 L-18 24 Z" fill="#090d16" stroke="#475569" strokeWidth="0.8" />
            <rect x="-17.5" y="18" width="8" height="1.8" fill="#312e81" />
            <ellipse cx="-13.5" cy="23.5" rx="4" ry="1.0" fill="#1e1b4b" />
            <ellipse cx="-13.5" cy="23.5" rx="2" ry="0.6" fill="#a855f7" />

            {/* Starboard Heavy Lift Engine */}
            <path d="M9 6 L18 6 L18.5 18 L8.5 18 Z" fill="url(#spectre-nozzle-grad)" stroke="#1e1b4b" strokeWidth="0.8" />
            <path d="M10 18 L17 18 L18 24 L9 24 Z" fill="#090d16" stroke="#475569" strokeWidth="0.8" />
            <rect x="9.5" y="18" width="8" height="1.8" fill="#312e81" />
            <ellipse cx="13.5" cy="23.5" rx="4" ry="1.0" fill="#1e1b4b" />
            <ellipse cx="13.5" cy="23.5" rx="2" ry="0.6" fill="#a855f7" />

            {/* Beaver-Tail Aft Aerodynamic Fairing */}
            <path d="M-3.5 18 L3.5 18 L2 21.5 L-2 21.5 Z" fill="#090d16" stroke="#312e81" strokeWidth="0.6" />

            {/* 5. Command Flight Deck (Wide Multi-Pane Bridge Canopy) */}
            <path d="M0 -27 L7 -23 L6.5 -14 L0 -12 L-6.5 -14 L-7 -23 Z" fill="#020617" stroke="#6b21a8" strokeWidth="0.9" />
            <path d="M0 -26 L5.8 -22.5 L5.2 -15 L0 -13 L-5.2 -15 L-5.8 -22.5 Z" fill="url(#spectre-bridge-grad)" stroke="#c084fc" strokeWidth="0.6" />
            <line x1="0" y1="-26" x2="0" y2="-13" stroke="#1e1b4b" strokeWidth="0.8" />
            <line x1="-5.5" y1="-18.5" x2="5.5" y2="-18.5" stroke="#1e1b4b" strokeWidth="0.8" />
            <ellipse cx="-2.5" cy="-21" rx="1.2" ry="3.5" transform="rotate(-15 -2.5 -21)" fill="#ffffff" opacity="0.6" />

            {/* 6. Transport Cabin Details (Airlocks, Observation Ports, Ribs, Lighting) */}
            {/* Side Personnel Airlock Doors */}
            <rect x="-10.5" y="-5" width="2" height="6" rx="0.5" fill="#1e1b4b" stroke="#334155" strokeWidth="0.4" />
            <circle cx="-9.5" cy="-2" r="0.4" fill="#a855f7" />
            <rect x="8.5" y="-5" width="2" height="6" rx="0.5" fill="#1e1b4b" stroke="#334155" strokeWidth="0.4" />
            <circle cx="9.5" cy="-2" r="0.4" fill="#a855f7" />

            {/* Passenger / Sensor Observation Window Ports */}
            <g fill="#c084fc">
              <rect x="-8.5" y="2" width="1.4" height="2.2" rx="0.4" />
              <rect x="-8.5" y="5.5" width="1.4" height="2.2" rx="0.4" />
              <rect x="7.1" y="2" width="1.4" height="2.2" rx="0.4" />
              <rect x="7.1" y="5.5" width="1.4" height="2.2" rx="0.4" />
            </g>

            {/* Luminescent Guidance Strips Along Sponson Flanks */}
            <path d="M-11 -2 L-29 9 L-29 11 L-11 0 Z" fill="url(#spectre-plasma-grad)" />
            <path d="M11 -2 L29 9 L29 11 L11 0 Z" fill="url(#spectre-plasma-grad)" />
            <line x1="-12" y1="2" x2="-27" y2="11" stroke="#e9d5ff" strokeWidth="0.6" opacity="0.85" />
            <line x1="12" y1="2" x2="27" y2="11" stroke="#e9d5ff" strokeWidth="0.6" opacity="0.85" />

            {/* Cargo Bay Tie-Down Latches & Structural Ribs */}
            <g stroke="#334155" strokeWidth="0.5" fill="none">
              <line x1="-5" y1="3" x2="5" y2="3" />
              <line x1="-5.5" y1="-7" x2="5.5" y2="-7" />
              <line x1="-10" y1="13" x2="-24" y2="13" />
              <line x1="10" y1="13" x2="24" y2="13" />
            </g>

            {/* Heavy-Duty Quad RCS Blocks on Sponsons */}
            <g fill="#ca8a04">
              <circle cx="-32.5" cy="9.5" r="0.6" />
              <circle cx="-32.5" cy="12.5" r="0.6" />
              <circle cx="32.5" cy="9.5" r="0.6" />
              <circle cx="32.5" cy="12.5" r="0.6" />
            </g>

            {/* 7. Nav Lights & Beacons */}
            <circle cx="-32.5" cy="14" r="0.8" fill="#ef4444" />
            <circle cx="32.5" cy="14" r="0.8" fill="#22c55e" />
            <circle cx="0" cy="19.5" r="0.8" fill="#c084fc" />
            <circle cx="0" cy="-34" r="0.6" fill="#38bdf8" />
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: TERRA-HOPPER TH-01 (Lightweight Terrestrial Lander)*/}
        {/* ========================================================= */}
        {modelId === 'orion' && (
          <g>
            {/* 1. DORSAL COMMUNICATION ANTENNAS (Background Layer) */}
            {/* Tall Vertical Whip Antenna */}
            <line x1="2" y1="-16" x2="2" y2="-23.5" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="2" cy="-16.2" r="1.1" fill="#1e293b" stroke="#475569" strokeWidth="0.6" />
            {/* Blinking Top Red Antenna Beacon */}
            <g transform="translate(2 -23.5)">
              <circle cx="0" cy="0" r="2.2" fill="#ef4444" opacity="0.4">
                <animate attributeName="opacity" values="0.85;0.05;0.85" dur="1.0s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="0.8" fill="#ef4444">
                <animate attributeName="opacity" values="1.0;0.2;1.0" dur="1.0s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="0.3" fill="#fecaca">
                <animate attributeName="opacity" values="1.0;0.1;1.0" dur="1.0s" repeatCount="indefinite" />
              </circle>
            </g>
            {/* Angled Comms Mast (45° backward rake) */}
            <line x1="6" y1="-16" x2="13.5" y2="-22.5" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="8" y1="-15.5" x2="10" y2="-19.5" stroke="#64748b" strokeWidth="0.7" />
            <circle cx="6" cy="-15.8" r="1.3" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.7" />
            <circle cx="13.5" cy="-22.5" r="0.8" fill="#38bdf8" />

            {/* 2. FAR-SIDE / BACKGROUND STRUCTURES (Shadowed) */}
            {/* Far-Side Upper Canted Fin */}
            <polygon
              points="43,-7 57,-16 58,-12 45,-4"
              fill="#172554"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            {/* Far-Side Lower Canted Fin */}
            <polygon
              points="44,-1 57,11 56,14 43,4"
              fill="#172554"
              stroke="#0f172a"
              strokeWidth="0.8"
            />

            {/* Far-Side Landing Gear Skids (Background Shadow) */}
            {/* Far-Side Front Skid */}
            <g opacity="0.75">
              <line x1="-36" y1="7" x2="-41" y2="17" stroke="#1e293b" strokeWidth="1.4" />
              <polygon points="-46,18.5 -36,18.5 -35,17 -47,17" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
            </g>
            {/* Far-Side Rear Skid */}
            <g opacity="0.75">
              <line x1="34" y1="7" x2="39" y2="17" stroke="#1e293b" strokeWidth="1.4" />
              <polygon points="34,18.5 44,18.5 45,17 33,17" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
            </g>

            {/* 3. UNDERBELLY THERMAL SHIELDING & RETRACTED ACCESS RAMP */}
            {/* Dark Charcoal Heat Shield Lower Plate */}
            <polygon
              points="-42,6 -18,11 28,11 44,7 41,9 -18,12.5 -40,7.5"
              fill="url(#terra-shield-grad)"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            {/* Thermal Shielding Tile Texture & Seams */}
            <g stroke="#334155" strokeWidth="0.5" strokeDasharray="1.5,1.5">
              <line x1="-34" y1="7.2" x2="-34" y2="9.5" />
              <line x1="-28" y1="8" x2="-28" y2="10.5" />
              <line x1="-22" y1="8.8" x2="-22" y2="11.2" />
              <line x1="-12" y1="9.8" x2="-12" y2="12" />
              <line x1="-2" y1="10.2" x2="-2" y2="12.2" />
              <line x1="8" y1="10.2" x2="8" y2="12.2" />
              <line x1="18" y1="9.8" x2="18" y2="11.8" />
              <line x1="28" y1="9.2" x2="28" y2="11" />
              <line x1="36" y1="8.2" x2="36" y2="9.8" />
            </g>
            {/* Retracted Foldable Access Ramp Under Cockpit Chin */}
            <polygon
              points="-47,3.5 -37,7.2 -36,5.8 -45.5,2.4"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="0.7"
            />
            <circle cx="-46.5" cy="3.2" r="0.7" fill="#64748b" />
            <circle cx="-37" cy="6.8" r="0.7" fill="#64748b" />
            <line x1="-44" y1="3.2" x2="-39" y2="5.6" stroke="#eab308" strokeWidth="0.7" strokeDasharray="1.2,1" />

            {/* 4. MAIN CARBON COMPOSITE HULL (BLUE) */}
            <path
              d="M -54,-2 L -38,-9 L -24,-14 L -6,-16.5 L 24,-16.5 L 43,-7 L 44,7 L 28,11 L -18,11 L -38,7 L -54,-2 Z"
              fill="url(#terra-hull-grad)"
              stroke="#172554"
              strokeWidth="1.2"
            />
            {/* Hull Dorsal Spine Chamfer / Upper High-Tech Bevel */}
            <polygon
              points="-38,-9 -24,-14 -6,-16.5 24,-16.5 41,-8 39,-9.5 23,-15.2 -6,-15.2 -23,-13 -36,-8.2"
              fill="#3b82f6"
              opacity="0.8"
            />
            {/* Lower Keel Accent Pinstripe */}
            <path
              d="M -37,6.5 L -18,10.2 L 27,10.2 L 42,6.5"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="0.6"
              opacity="0.7"
            />
            {/* Structural Panel Seams on Forward & Aft Hull */}
            <g stroke="#1e3a8a" strokeWidth="0.8">
              <line x1="-38" y1="-9" x2="-38" y2="7" />
              <line x1="-24" y1="-14" x2="-24" y2="-9" />
              <line x1="24" y1="-16.5" x2="24" y2="-9" />
              <line x1="28" y1="-14" x2="28" y2="10" />
            </g>

            {/* 5. AVIONICS & NAVIGATION BAY (Louvered Dorsal Spine) */}
            <polygon
              points="-22,-14 -7,-16.2 -6,-13.5 -21,-11.5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.7"
            />
            {/* Louvered Ventilation Slats */}
            <g stroke="#64748b" strokeWidth="0.6">
              <line x1="-20" y1="-12.3" x2="-8" y2="-14.5" />
              <line x1="-19.5" y1="-13" x2="-8.5" y2="-15.1" />
              <line x1="-19" y1="-13.7" x2="-9" y2="-15.7" />
            </g>

            {/* 6. ENERGY STORAGE UNIT (Power Core Housing) */}
            <rect x="9" y="-17.5" width="7" height="3.2" rx="1.2" fill="#334155" stroke="#0f172a" strokeWidth="0.7" />
            <rect x="10" y="-17" width="5" height="2" rx="0.6" fill="#1e293b" />
            <circle cx="11.5" cy="-16" r="0.6" fill="#22c55e" />
            <line x1="13.2" y1="-16" x2="14.5" y2="-16" stroke="#38bdf8" strokeWidth="0.6" />

            {/* 7. AFT HYDROGEN/OXYGEN PROPELLANT TANKS */}
            {/* Upper Cylindrical Tank */}
            <g>
              <rect x="29" y="-8.5" width="15" height="8" rx="2.5" fill="url(#terra-tank-grad)" stroke="#1e293b" strokeWidth="0.9" />
              <line x1="30" y1="-7" x2="43" y2="-7" stroke="#ffffff" strokeWidth="0.7" opacity="0.6" />
              <line x1="32" y1="-8.5" x2="32" y2="-0.5" stroke="#292524" strokeWidth="1.2" />
              <line x1="38" y1="-8.5" x2="38" y2="-0.5" stroke="#292524" strokeWidth="1.2" />
              <line x1="42.5" y1="-8.5" x2="42.5" y2="-0.5" stroke="#292524" strokeWidth="1.2" />
              <ellipse cx="44" cy="-4.5" rx="1" ry="3.5" fill="#44403c" stroke="#1c1917" strokeWidth="0.6" />
              <circle cx="44" cy="-4.5" r="0.6" fill="#78716c" />
            </g>
            {/* Lower Cylindrical Tank */}
            <g>
              <rect x="29" y="-1.5" width="15" height="8" rx="2.5" fill="url(#terra-tank-grad)" stroke="#1e293b" strokeWidth="0.9" />
              <line x1="30" y1="0" x2="43" y2="0" stroke="#ffffff" strokeWidth="0.7" opacity="0.6" />
              <line x1="32" y1="-1.5" x2="32" y2="6.5" stroke="#292524" strokeWidth="1.2" />
              <line x1="38" y1="-1.5" x2="38" y2="6.5" stroke="#292524" strokeWidth="1.2" />
              <line x1="42.5" y1="-1.5" x2="42.5" y2="6.5" stroke="#292524" strokeWidth="1.2" />
              <ellipse cx="44" cy="2.5" rx="1" ry="3.5" fill="#44403c" stroke="#1c1917" strokeWidth="0.6" />
              <circle cx="44" cy="2.5" r="0.6" fill="#78716c" />
            </g>
            {/* Cryogenic Plumbing & Feed Valves */}
            <path d="M 28,-4 L 25,-4 L 25,2 L 28,2" fill="none" stroke="#38bdf8" strokeWidth="0.9" />
            <circle cx="26.5" cy="-1" r="0.8" fill="#0284c7" />

            {/* 8. AFT MAIN CRUISE PROPULSION THRUSTERS (Dual Ion Vector Bells) */}
            <g>
              {/* Upper Cruise Nozzle */}
              <polygon points="44,-4.5 49,-5 51,-6 51,-2 49,-3 44,-3.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              <ellipse cx="51" cy="-4" rx="0.9" ry="2.0" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
              <ellipse cx="51" cy="-4" rx="0.4" ry="1.2" fill="#e0f2fe" />
              {/* Lower Cruise Nozzle */}
              <polygon points="44,2.5 49,2 51,1 51,5 49,4 44,3.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              <ellipse cx="51" cy="3" rx="0.9" ry="2.0" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.6" />
              <ellipse cx="51" cy="3" rx="0.4" ry="1.2" fill="#e0f2fe" />
            </g>

            {/* 9. AFT STABILIZATION FINS (Near-Side) */}
            {/* Upper Canted Fin */}
            <polygon
              points="42,-7 59,-17 61,-13 46,-4"
              fill="url(#terra-hull-grad)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            <line x1="42" y1="-7" x2="59" y2="-17" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="43" y1="-6" x2="58" y2="-15.5" stroke="#38bdf8" strokeWidth="0.6" />
            <polygon points="56,-11 60,-13 58,-8 54,-7" fill="#1e293b" />
            {/* Navigation Strobe on Upper Fin Tip */}
            <circle cx="60.5" cy="-15" r="0.7" fill="#ffffff" />
            <circle cx="60.5" cy="-15" r="0.3" fill="#bae6fd" />

            {/* Lower Canted Fin */}
            <polygon
              points="43,0 59,12 58,16 44,5"
              fill="url(#terra-hull-grad)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            <line x1="43" y1="0" x2="59" y2="12" stroke="#0f172a" strokeWidth="1.5" />
            <line x1="44" y1="1" x2="58" y2="11.5" stroke="#38bdf8" strokeWidth="0.6" />
            <polygon points="55,10 58,14 56,15 53,11" fill="#1e293b" />
            {/* Navigation Strobe on Lower Fin Tip */}
            <circle cx="58.5" cy="14" r="0.7" fill="#ef4444" />
            <circle cx="58.5" cy="14" r="0.3" fill="#fecaca" />

            {/* 10. REACTION CONTROL SYSTEM (RCS) THRUSTERS */}
            {/* Forward Chin RCS Quad */}
            <g transform="translate(-48, 0)">
              <polygon points="0,0 -2,-1 -2,1" fill="#475569" stroke="#0f172a" strokeWidth="0.4" />
              <polygon points="0,0 -1,-2 1,-2" fill="#475569" stroke="#0f172a" strokeWidth="0.4" />
              <circle cx="0" cy="0" r="0.9" fill="#1e293b" />
            </g>
            {/* Mid-Dorsal RCS Thruster Block */}
            <g transform="translate(0, -17.2)">
              <rect x="-1.8" y="-1.2" width="3.6" height="1.8" rx="0.5" fill="#334155" stroke="#0f172a" strokeWidth="0.5" />
              <polygon points="-1,0 -1,-2 0,-2 0,0" fill="#64748b" />
              <polygon points="0,0 0,-2 1,-2 1,0" fill="#64748b" />
            </g>
            {/* Aft RCS Nozzle Cluster */}
            <g transform="translate(46, 6.5) rotate(25)">
              <polygon points="0,0 2.5,-1.5 2.5,1.5" fill="#475569" stroke="#0f172a" strokeWidth="0.5" />
              <polygon points="0,0 -1.5,2.5 1.5,2.5" fill="#475569" stroke="#0f172a" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.1" fill="#1e293b" />
            </g>

            {/* 11. INTERNAL CARGO/PERSONNEL COMPARTMENT (Recessed Cutaway Door) */}
            <polygon
              points="-14,-9 17,-9 18,-7.5 18,7.5 17,9 -13,9 -14,7.5"
              fill="#060a12"
              stroke="url(#terra-frame-grad)"
              strokeWidth="1.5"
            />
            {/* Interior Back Wall Lattice Framework (Truss Girders) */}
            <g stroke="#1e293b" strokeWidth="0.8" opacity="0.85">
              <line x1="-12" y1="-8" x2="-4" y2="8" />
              <line x1="-4" y1="-8" x2="-12" y2="8" />
              <line x1="-4" y1="-8" x2="4" y2="8" />
              <line x1="4" y1="-8" x2="-4" y2="8" />
              <line x1="4" y1="-8" x2="12" y2="8" />
              <line x1="12" y1="-8" x2="4" y2="8" />
              <line x1="12" y1="-8" x2="16" y2="8" />
              <line x1="16" y1="-8" x2="12" y2="8" />
            </g>
            {/* Soft Overhead Cabin Downlight Glow */}
            <line x1="-12" y1="-8.2" x2="16" y2="-8.2" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />

            {/* 6 PASSENGER ERGONOMIC SEATS (Arranged in 2 Rows) */}
            {/* Rear Row (3 Seats) */}
            <g transform="translate(-3, -4)">
              <rect x="0" y="0" width="3.4" height="4.5" rx="0.8" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />
              <rect x="0.6" y="-2" width="2.2" height="2" rx="0.6" fill="#334155" />
            </g>
            <g transform="translate(1.5, -4)">
              <rect x="0" y="0" width="3.4" height="4.5" rx="0.8" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />
              <rect x="0.6" y="-2" width="2.2" height="2" rx="0.6" fill="#334155" />
            </g>
            <g transform="translate(6, -4)">
              <rect x="0" y="0" width="3.4" height="4.5" rx="0.8" fill="#1e293b" stroke="#334155" strokeWidth="0.6" />
              <rect x="0.6" y="-2" width="2.2" height="2" rx="0.6" fill="#334155" />
            </g>
            {/* Front Row (3 Seats) */}
            <g transform="translate(-1, -1)">
              <rect x="0" y="0" width="3.6" height="5" rx="0.9" fill="#334155" stroke="#475569" strokeWidth="0.7" />
              <rect x="0.7" y="-2.2" width="2.2" height="2.2" rx="0.7" fill="#475569" />
              <line x1="0" y1="2.2" x2="3.6" y2="2.2" stroke="#1e293b" strokeWidth="0.5" />
            </g>
            <g transform="translate(3.5, -1)">
              <rect x="0" y="0" width="3.6" height="5" rx="0.9" fill="#334155" stroke="#475569" strokeWidth="0.7" />
              <rect x="0.7" y="-2.2" width="2.2" height="2.2" rx="0.7" fill="#475569" />
              <line x1="0" y1="2.2" x2="3.6" y2="2.2" stroke="#1e293b" strokeWidth="0.5" />
            </g>
            <g transform="translate(8, -1)">
              <rect x="0" y="0" width="3.6" height="5" rx="0.9" fill="#334155" stroke="#475569" strokeWidth="0.7" />
              <rect x="0.7" y="-2.2" width="2.2" height="2.2" rx="0.7" fill="#475569" />
              <line x1="0" y1="2.2" x2="3.6" y2="2.2" stroke="#1e293b" strokeWidth="0.5" />
            </g>

            {/* Tactical Avionics Status Screen (Right Bulkhead) */}
            <rect x="12.5" y="-6" width="4.5" height="5.5" rx="0.6" fill="#052e16" stroke="#22c55e" strokeWidth="0.7" />
            <path d="M 13.2,-3.5 L 14,-3.5 L 14.5,-4.8 L 15,-2.2 L 15.4,-3.5 L 16.2,-3.5" fill="none" stroke="#4ade80" strokeWidth="0.5" />
            <rect x="13.2" y="-5.2" width="1.4" height="0.6" fill="#22c55e" />
            <rect x="15" y="-5.2" width="1.4" height="0.6" fill="#22c55e" />
            <line x1="13.2" y1="-1.5" x2="16.2" y2="-1.5" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="0.8,0.6" />

            {/* Sliding Access Door Pocket & Recessed Door Panel (Left) */}
            <g>
              <polygon
                points="-14,-8.5 -5.5,-8.5 -5.5,8.5 -13.5,8.5 -14,7"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <polygon
                points="-12.5,-7 -7,-7 -7,7 -12,7"
                fill="#334155"
                stroke="#1e293b"
                strokeWidth="0.6"
              />
              <rect x="-11.5" y="-4" width="3.5" height="7" rx="0.8" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
              <line x1="-6.5" y1="-2" x2="-6.5" y2="3" stroke="#cbd5e1" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="-13.5" y1="-8" x2="16.5" y2="-8" stroke="#64748b" strokeWidth="0.6" />
              <line x1="-13.5" y1="8" x2="16.5" y2="8" stroke="#64748b" strokeWidth="0.6" />
            </g>

            {/* 12. PILOT COCKPIT (Faceted Panoramic Cyan Visor) */}
            <polygon
              points="-53,-2.5 -38,-9.5 -24,-14.5 -22,-13 -35,-4 -46,0 -51,-0.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.8"
            />
            <polygon
              points="-50.5,-2 -39,-8.5 -36,-4 -46,0"
              fill="url(#terra-visor-grad)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            <polygon
              points="-39,-8.5 -25,-13.5 -23,-12 -36,-4"
              fill="url(#terra-visor-grad)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            <polygon
              points="-37.5,-8.8 -25.2,-13.7 -23.5,-13.7 -34.5,-9.5"
              fill="#e0f2fe"
              opacity="0.85"
            />
            <path
              d="M -47,-1 L -38,-7 L -37,-5.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M -34,-5.5 L -26,-11.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.7"
            />
            <line x1="-39" y1="-8.5" x2="-36" y2="-4" stroke="#0f172a" strokeWidth="1.2" />
            <line x1="-46" y1="0" x2="-36" y2="-4" stroke="#0f172a" strokeWidth="1.0" />

            {/* 13. EXTERNAL SENSOR ARRAY WITH SLOW HORIZONTAL ROTATION */}
            {/* Gimballed Chin Turret just below cabin */}
            <g transform="translate(-50 4.5)">
              {/* Static Yoke Bracket */}
              <polygon points="-3,-3 3,-3 2.2,-1.2 -2.2,-1.2" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
              <circle cx="0" cy="-2.0" r="0.7" fill="#94a3b8" />
              {/* Rotating Sensor Turret Assembly (Slow 3D Horizontal Rotation) */}
              <g>
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1 1; 0.05 1; -1 1; -0.05 1; 1 1"
                  keyTimes="0; 0.25; 0.5; 0.75; 1"
                  dur="7.5s"
                  repeatCount="indefinite"
                />
                {/* Turret Sphere / Casing */}
                <rect x="-2.6" y="-1.5" width="5.2" height="4.4" rx="2.0" fill="#1e293b" stroke="#0f172a" strokeWidth="0.6" />
                <line x1="-2.6" y1="0.7" x2="2.6" y2="0.7" stroke="#475569" strokeWidth="0.5" />
                {/* Primary FLIR / Optical Lens */}
                <circle cx="-0.8" cy="0.7" r="1.3" fill="#0f172a" stroke="#475569" strokeWidth="0.5" />
                <circle cx="-0.8" cy="0.7" r="0.9" fill="#06b6d4" />
                <circle cx="-1.1" cy="0.4" r="0.3" fill="#ffffff" />
                {/* Secondary Optical Aperture */}
                <circle cx="1.1" cy="0.7" r="0.85" fill="#0f172a" stroke="#475569" strokeWidth="0.4" />
                <circle cx="1.1" cy="0.7" r="0.55" fill="#38bdf8" />
                {/* Status Indicator Green LED */}
                <circle cx="0" cy="-0.6" r="0.35" fill="#22c55e" />
              </g>
            </g>

            {/* 14. NOSE HEADLIGHT / INTAKE & NAVIGATION LIGHTS */}
            <polygon
              points="-46,-1.5 -40,1 -40,2.5 -45,1.5"
              fill="#0284c7"
              stroke="#38bdf8"
              strokeWidth="0.7"
            />
            <polygon
              points="-45.5,-1 -40.5,1.2 -40.5,2.1 -44.8,1.2"
              fill="#bae6fd"
            />
            <circle cx="-36" cy="0.5" r="0.9" fill="#f59e0b" stroke="#0f172a" strokeWidth="0.4" />
            <circle cx="-36" cy="0.5" r="0.4" fill="#fef08a" />

            {/* 15. PROMINENT VTOL ION/PLASMA HOVER THRUSTERS */}
            {/* Front VTOL Thruster Assembly (Between Cabin and Access Door, centered at x = -20) */}
            <g>
              {/* Structural Cowling Pod */}
              <polygon
                points="-24,-1.5 -16,-1.5 -16,11 -19,12.2 -23,12.2 -24,11"
                fill="url(#terra-hull-grad)"
                stroke="#0f172a"
                strokeWidth="1.0"
              />
              <polygon points="-23,0 -17,0 -17,10.5 -23,10.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
              <circle cx="-20" cy="1.5" r="0.7" fill="#f59e0b" />
              {/* Large Flared Nozzle Bell */}
              <polygon
                points="-22,11.5 -18,11.5 -16,17.5 -24,17.5"
                fill="url(#terra-bell-grad)"
                stroke="#0f172a"
                strokeWidth="0.9"
              />
              {/* Concentric Cooling Rings */}
              <line x1="-21.5" y1="13" x2="-18.5" y2="13" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="-22.5" y1="14.8" x2="-17.5" y2="14.8" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="-23.5" y1="16.3" x2="-16.5" y2="16.3" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Ion/Plasma Nozzle Exit Aperture */}
              <ellipse cx="-20" cy="17.5" rx="4.0" ry="1.1" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.7" />
              <ellipse cx="-20" cy="17.5" rx="2.5" ry="0.7" fill="#e0f2fe" />
              {/* Downward Ion Plume Glow */}
              <polygon points="-23,17.5 -17,17.5 -15,24.5 -25,24.5" fill="url(#terra-ion-glow)" />
            </g>

            {/* Rear Near-Side Thruster Assembly (VTOL Unit 4 of 4) */}
            <g>
              {/* Structural Cowling Pod */}
              <polygon
                points="18,-1.5 26,-1.5 26,11 23,12.2 19,12.2 18,11"
                fill="url(#terra-hull-grad)"
                stroke="#0f172a"
                strokeWidth="1.0"
              />
              <polygon points="19,0 25,0 25,10.5 19,10.5" fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
              <circle cx="22" cy="1.5" r="0.7" fill="#f59e0b" />
              {/* Large Flared Nozzle Bell */}
              <polygon
                points="20,11.5 24,11.5 26,17.5 18,17.5"
                fill="url(#terra-bell-grad)"
                stroke="#0f172a"
                strokeWidth="0.9"
              />
              {/* Concentric Cooling Rings */}
              <line x1="20.5" y1="13" x2="23.5" y2="13" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="19.5" y1="14.8" x2="24.5" y2="14.8" stroke="#94a3b8" strokeWidth="0.8" />
              <line x1="18.5" y1="16.3" x2="25.5" y2="16.3" stroke="#94a3b8" strokeWidth="0.8" />
              {/* Ion/Plasma Nozzle Exit Aperture */}
              <ellipse cx="22" cy="17.5" rx="4.0" ry="1.1" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.7" />
              <ellipse cx="22" cy="17.5" rx="2.5" ry="0.7" fill="#e0f2fe" />
              {/* Downward Ion Plume Glow */}
              <polygon points="19,17.5 25,17.5 27,24.5 17,24.5" fill="url(#terra-ion-glow)" />
            </g>

            {/* 16. WIDE BALANCED ARTICULATED LANDING GEAR (Foreground Layer) */}
            {/* Forward Heavy Landing Gear Assembly (x = -38) */}
            <g>
              {/* Upper Hydraulic Cylinder Bracket anchored to Hull */}
              <polygon points="-36,6 -31,6 -32,10 -37,10" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              <circle cx="-34" cy="7.5" r="0.9" fill="#475569" stroke="#0f172a" strokeWidth="0.5" />
              {/* Chrome Oleo Shock Absorber Strut */}
              <polygon points="-35,9 -33,9 -37,17.5 -39,17.5" fill="url(#terra-strut-grad)" stroke="#1e293b" strokeWidth="0.6" />
              {/* Articulated Scissor Torque Link (Aft Side) */}
              <polyline points="-34,11 -31.5,13.5 -35.5,15.5" fill="none" stroke="#64748b" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="-31.5" cy="13.5" r="0.6" fill="#cbd5e1" />
              {/* Strut Lower Knuckle Joint */}
              <circle cx="-38" cy="17.5" r="1.2" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
              <circle cx="-38" cy="17.5" r="0.5" fill="#f8fafc" />
              {/* Wide Articulated Titanium Footpad Skid (Ground Contact y = 19.5) */}
              <polygon
                points="-45,16.5 -44,17.5 -32,17.5 -31,16.5 -31,19.5 -45,19.5"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <line x1="-43" y1="18.5" x2="-33" y2="18.5" stroke="#38bdf8" strokeWidth="0.7" />
              {/* Anti-Skid Tread Grooves */}
              <line x1="-41" y1="18" x2="-41" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="-38" y1="18" x2="-38" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="-35" y1="18" x2="-35" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
            </g>

            {/* Rear Heavy Landing Gear Assembly (x = +38) */}
            <g>
              {/* Upper Hydraulic Cylinder Bracket anchored to Hull */}
              <polygon points="31,6 36,6 37,10 32,10" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
              <circle cx="34" cy="7.5" r="0.9" fill="#475569" stroke="#0f172a" strokeWidth="0.5" />
              {/* Chrome Oleo Shock Absorber Strut */}
              <polygon points="33,9 35,9 39,17.5 37,17.5" fill="url(#terra-strut-grad)" stroke="#1e293b" strokeWidth="0.6" />
              {/* Articulated Scissor Torque Link (Forward Side) */}
              <polyline points="34,11 31.5,13.5 35.5,15.5" fill="none" stroke="#64748b" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="31.5" cy="13.5" r="0.6" fill="#cbd5e1" />
              {/* Strut Lower Knuckle Joint */}
              <circle cx="38" cy="17.5" r="1.2" fill="#334155" stroke="#0f172a" strokeWidth="0.6" />
              <circle cx="38" cy="17.5" r="0.5" fill="#f8fafc" />
              {/* Wide Articulated Titanium Footpad Skid (Ground Contact y = 19.5) */}
              <polygon
                points="31,16.5 32,17.5 44,17.5 45,16.5 45,19.5 31,19.5"
                fill="#1e293b"
                stroke="#475569"
                strokeWidth="0.8"
              />
              <line x1="33" y1="18.5" x2="43" y2="18.5" stroke="#38bdf8" strokeWidth="0.7" />
              {/* Anti-Skid Tread Grooves */}
              <line x1="35" y1="18" x2="35" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="38" y1="18" x2="38" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
              <line x1="41" y1="18" x2="41" y2="19.5" stroke="#0f172a" strokeWidth="0.6" />
            </g>

            {/* 17. HULL STENCIL MARKINGS & GRAPHICS */}
            {/* Tactical Code "TH-01" */}
            <text
              x="26"
              y="-10"
              fill="#93c5fd"
              fontSize="2.8"
              fontFamily="monospace"
              fontWeight="900"
              letterSpacing="0.4"
              opacity="0.85"
            >
              TH-01
            </text>
            {/* Sub-label "TERRA-HOPPER" */}
            <text
              x="-4"
              y="10.2"
              fill="#60a5fa"
              fontSize="1.6"
              fontFamily="monospace"
              fontWeight="bold"
              letterSpacing="0.3"
              opacity="0.75"
            >
              TERRA-HOPPER
            </text>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: VALKYRIE TACTICAL (VK-01 Cargo Lifter)              */}
        {/* ========================================================= */}
        {modelId === 'valkyrie' && (
          <g id="valkyrie-root">
            {/* 1. Far-side Background Landing Gear & Pod Shadows */}
            <g opacity="0.5">
              <rect x="-38" y="19.2" width="12" height="2.4" rx="0.8" fill="#090d16" />
              <rect x="18" y="19.2" width="12" height="2.4" rx="0.8" fill="#090d16" />
              <line x1="-32" y1="13" x2="-32" y2="19.2" stroke="#090d16" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="24" y1="13" x2="24" y2="19.2" stroke="#090d16" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* 2. AFT MAIN VECTORING PROPULSION ENGINE & EMPENNAGE */}
            {/* Engine Gimbal Ring & Mounting Collar */}
            <rect x="-55" y="-8.5" width="4.5" height="13" rx="1.2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
            <line x1="-53" y1="-8" x2="-53" y2="4" stroke="#475569" strokeWidth="0.8" />
            {/* Hydraulic Gimbal Actuators */}
            <line x1="-50" y1="-7" x2="-55" y2="-8" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-50" y1="3" x2="-55" y2="3.8" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

            {/* Conical Vectoring Nozzle Bell */}
            <polygon points="-54,-8 -70,-9.5 -70,5.5 -54,4" fill="url(#valkyrie-nozzle-petal)" stroke="#0f172a" strokeWidth="0.9" />

            {/* Nozzle Petal Articulation Seams */}
            <line x1="-54" y1="-8" x2="-70" y2="-9.5" stroke="#090d16" strokeWidth="0.8" />
            <line x1="-54" y1="-5" x2="-70" y2="-6" stroke="#475569" strokeWidth="0.6" />
            <line x1="-54" y1="-2" x2="-70" y2="-2.5" stroke="#334155" strokeWidth="0.6" />
            <line x1="-54" y1="1" x2="-70" y2="1.2" stroke="#475569" strokeWidth="0.6" />
            <line x1="-54" y1="4" x2="-70" y2="5.5" stroke="#090d16" strokeWidth="0.8" />
            {/* Transverse Titanium Stiffener Ribs */}
            <line x1="-64" y1="-8.8" x2="-64" y2="4.8" stroke="#64748b" strokeWidth="0.6" strokeDasharray="1.2 0.8" />
            <line x1="-59" y1="-8.4" x2="-59" y2="4.3" stroke="#64748b" strokeWidth="0.6" strokeDasharray="1.2 0.8" />

            {/* Nozzle Bell Throat Interior Glow */}
            <ellipse cx="-69.5" cy="-2.0" rx="1.8" ry="7.2" fill="url(#valkyrie-nozzle-throat)" />
            <ellipse cx="-69.0" cy="-2.0" rx="0.9" ry="4.8" fill="#38bdf8" opacity="0.85" />
            <ellipse cx="-68.6" cy="-2.0" rx="0.4" ry="2.6" fill="#ffffff" opacity="0.9" />

            {/* Upper Empennage Aerodynamic Cowl Over Engine Root */}
            <polygon points="-36,-17.5 -54,-10.5 -54,-8 -48,-8 -36,-14" fill="url(#valkyrie-crimson-hull)" stroke="#4c0519" strokeWidth="0.8" />
            {/* Empennage Yellow Hazard LEDs */}
            <rect x="-51.5" y="-12.5" width="2.2" height="1.4" rx="0.4" fill="#f59e0b" stroke="#090d16" strokeWidth="0.4">
              <animate attributeName="opacity" values="1;0.4;1" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="-47.5" y="-12.5" width="2.2" height="1.4" rx="0.4" fill="#f59e0b" stroke="#090d16" strokeWidth="0.4">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" repeatCount="indefinite" />
            </rect>
            {/* "DANGER JET EXHAUST" Stencil Arrow */}
            <path d="M -48,-14 L -45,-14 L -43,-12.5 L -45,-11 L -48,-11 Z" fill="#f59e0b" opacity="0.8" />

            {/* 3. PRIMARY CRIMSON BALLISTIC ARMOR HULL */}
            {/* Main Lifting Body Aerodynamic Fuselage */}
            <path
              d="M 64,6 L 56,3 L 42,-4 L 26,-15 L 20,-17 L -36,-17.5 L -52,-10.5 L -54,-8 L -54,4 L -48,10 L -28,14 L -12,16 L 4,16 L 16,15 L 24,13 L 40,11 L 56,10 L 64,6 Z"
              fill="url(#valkyrie-crimson-hull)"
              stroke="#4c0519"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />

            {/* Upper Beveled Armor Deck Plate */}
            <polygon
              points="24,-15 -36,-17.5 -50,-11 -22,-6 14,-6 24,-15"
              fill="url(#valkyrie-crimson-upper)"
              stroke="#580718"
              strokeWidth="0.7"
            />

            {/* Lower Armored Machinery Bay / Belly Heat Shield */}
            <path
              d="M -48,10 L -28,14 L -12,16 L 4,16 L 16,15 L 24,13 L 40,11 L 56,10 L 48,12 L 20,15 L -10,16 L -36,13 Z"
              fill="url(#valkyrie-carbon-dark)"
              stroke="#0f172a"
              strokeWidth="0.8"
            />

            {/* 4. DORSAL SPINE, AIRLOCK, & BOLD "VALKYRIE TACTICAL" STENCILS */}
            {/* Circular Dorsal Docking Hatch / Airlock at x = -24 */}
            <circle cx="-24" cy="-18" r="3.0" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
            <circle cx="-24" cy="-18" r="1.8" fill="#0f172a" stroke="#ef4444" strokeWidth="0.5" />
            <circle cx="-24" cy="-18" r="0.8" fill="#94a3b8" />
            {/* Hatch Perimeter Locking Lugs */}
            <rect x="-27.5" y="-18.4" width="0.9" height="0.8" fill="#e2e8f0" />
            <rect x="-21.4" y="-18.4" width="0.9" height="0.8" fill="#e2e8f0" />
            <rect x="-24.4" y="-21.4" width="0.8" height="0.9" fill="#e2e8f0" />
            <rect x="-24.4" y="-15.5" width="0.8" height="0.9" fill="#e2e8f0" />

            {/* Raised Spine Air Intake Scoop at x = +8 to +13 */}
            <polygon points="7,-17.5 9,-19.2 13,-19.2 14,-17.5" fill="#0f172a" stroke="#ef4444" strokeWidth="0.5" />
            <line x1="9.5" y1="-18.5" x2="12.5" y2="-18.5" stroke="#38bdf8" strokeWidth="0.6" />

            {/* APU Maintenance Hatch at x = -8 to -3 */}
            <rect x="-8.5" y="-16.8" width="5.5" height="2.5" rx="0.5" fill="#1e293b" stroke="#580718" strokeWidth="0.5" />
            <circle cx="-7.5" cy="-15.5" r="0.4" fill="#94a3b8" />
            <circle cx="-4.0" cy="-15.5" r="0.4" fill="#94a3b8" />

            {/* BOLD WHITE STENCILED NAMEPLATE */}
            <text
              x="-16"
              y="-13.3"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="3.3"
              fontFamily="ui-monospace, monospace"
              fontWeight="900"
              letterSpacing="0.08em"
            >
              VALKYRIE
            </text>
            <text
              x="-16"
              y="-11.0"
              textAnchor="middle"
              fill="#fecdd3"
              fontSize="1.7"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
              letterSpacing="0.14em"
            >
              TACTICAL
            </text>

            {/* 5. HEXAGONAL EMBOSSED ARMOR MESH (HONEYCOMB PATTERN) */}
            <g stroke="#580718" strokeWidth="0.45" fill="none" opacity="0.85">
              {/* Row 1 (y = -10.8) */}
              <polygon points="-12,-11.5 -11,-12.3 -9.5,-12.3 -8.5,-11.5 -9.5,-10.7 -11,-10.7" />
              <polygon points="-8.5,-11.5 -7.5,-12.3 -6.0,-12.3 -5.0,-11.5 -6.0,-10.7 -7.5,-10.7" />
              <polygon points="-5.0,-11.5 -4.0,-12.3 -2.5,-12.3 -1.5,-11.5 -2.5,-10.7 -4.0,-10.7" />
              <polygon points="-1.5,-11.5 -0.5,-12.3 1.0,-12.3 2.0,-11.5 1.0,-10.7 -0.5,-10.7" />
              {/* Row 2 (y = -9.2) */}
              <polygon points="-10.2,-9.9 -9.2,-10.7 -7.7,-10.7 -6.7,-9.9 -7.7,-9.1 -9.2,-9.1" />
              <polygon points="-6.7,-9.9 -5.7,-10.7 -4.2,-10.7 -3.2,-9.9 -4.2,-9.1 -5.7,-9.1" />
              <polygon points="-3.2,-9.9 -2.2,-10.7 -0.7,-10.7 0.3,-9.9 -0.7,-9.1 -2.2,-9.1" />
              <polygon points="0.3,-9.9 1.3,-10.7 2.8,-10.7 3.8,-9.9 2.8,-9.1 1.3,-9.1" />
              {/* Row 3 (y = -7.6) */}
              <polygon points="-12,-8.3 -11,-9.1 -9.5,-9.1 -8.5,-8.3 -9.5,-7.5 -11,-7.5" />
              <polygon points="-8.5,-8.3 -7.5,-9.1 -6.0,-9.1 -5.0,-8.3 -6.0,-7.5 -7.5,-7.5" />
              <polygon points="-5.0,-8.3 -4.0,-9.1 -2.5,-9.1 -1.5,-8.3 -2.5,-7.5 -4.0,-7.5" />
              <polygon points="-1.5,-8.3 -0.5,-9.1 1.0,-9.1 2.0,-8.3 1.0,-7.5 -0.5,-7.5" />
            </g>

            {/* 6. THREE RECESSED ANGLED HEAT-SINK / INTAKE VENTS */}
            {/* Vent 1 */}
            <polygon points="-7.5,-8.8 -4.5,-8.8 -5.5,-6.8 -8.5,-6.8" fill="#090d16" stroke="#334155" strokeWidth="0.4" />
            <line x1="-7.0" y1="-7.8" x2="-4.8" y2="-7.8" stroke="#64748b" strokeWidth="0.4" />
            {/* Vent 2 */}
            <polygon points="-1.5,-8.8 1.5,-8.8 0.5,-6.8 -2.5,-6.8" fill="#090d16" stroke="#334155" strokeWidth="0.4" />
            <line x1="-1.0" y1="-7.8" x2="1.2" y2="-7.8" stroke="#64748b" strokeWidth="0.4" />
            {/* Vent 3 */}
            <polygon points="4.5,-8.8 7.5,-8.8 6.5,-6.8 3.5,-6.8" fill="#090d16" stroke="#334155" strokeWidth="0.4" />
            <line x1="5.0" y1="-7.8" x2="7.2" y2="-7.8" stroke="#64748b" strokeWidth="0.4" />

            {/* 7. COCKPIT CANOPY, INTERIOR PILOT, & NOSE ASSEMBLY */}
            {/* Dark Gunmetal Nose Chin Cap */}
            <path d="M 58,4 L 64,6 L 61,8.5 L 56,8.5 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="0.6" />
            {/* Needle Pitot Air Data Sensor Probe */}
            <line x1="64" y1="6" x2="67" y2="6" stroke="#94a3b8" strokeWidth="0.8" strokeLinecap="round" />
            <line x1="66" y1="5.6" x2="66" y2="6.4" stroke="#e2e8f0" strokeWidth="0.4" />

            {/* FLIR / Targeting Electro-Optical Turret Ball at x = 53.5, y = 5.5 */}
            <ellipse cx="53.5" cy="5.5" rx="2.4" ry="2.2" fill="#0f172a" stroke="#334155" strokeWidth="0.6" />
            <circle cx="53.5" cy="5.5" r="1.6" fill="#1e293b" />
            <circle cx="54.2" cy="5.2" r="0.9" fill="#38bdf8" />
            <circle cx="54.5" cy="5.0" r="0.3" fill="#ffffff" />

            {/* Visible Cockpit Interior (Pilot Seat & Dash Glow) */}
            <rect x="29" y="-9" width="3.2" height="4.5" rx="1.0" fill="#334155" />
            <circle cx="30.6" cy="-10" r="1.4" fill="#475569" />
            <path d="M 29.5,-9 L 32,-5" stroke="#dc2626" strokeWidth="0.8" />
            <rect x="36" y="-3.5" width="2.5" height="1.8" rx="0.3" fill="#0369a1" opacity="0.8" />

            {/* Multi-Pane Tinted Windshield & Canopy */}
            {/* Forward Raked Windshield Pane */}
            <polygon
              points="41,-4 54,3 46,3.8 36,-1.5"
              fill="url(#valkyrie-canopy-tint)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            {/* Main Pilot Canopy Pane */}
            <polygon
              points="26,-14 39,-5.5 34,-0.8 26,-2.5"
              fill="url(#valkyrie-canopy-tint)"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            {/* Specular Glare Highlights */}
            <line x1="28" y1="-13" x2="38" y2="-6" stroke="#e0f2fe" strokeWidth="0.6" strokeLinecap="round" opacity="0.8" />
            <line x1="42" y1="-3.5" x2="52" y2="2.5" stroke="#e0f2fe" strokeWidth="0.6" strokeLinecap="round" opacity="0.8" />

            {/* Canopy Sill Micro-Text */}
            <text
              x="39"
              y="2.8"
              fill="#f1f5f9"
              fontSize="1.1"
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
              letterSpacing="0.08em"
            >
              VALKYRIE TACTICAL
            </text>

            {/* Serial Number "VK-01" */}
            <text
              x="23.5"
              y="-5.5"
              fill="#ffffff"
              fontSize="3.1"
              fontFamily="ui-monospace, monospace"
              fontWeight="900"
              letterSpacing="0.04em"
            >
              VK-01
            </text>

            {/* Circular Maintenance Access Port at x = 18, y = -10 */}
            <circle cx="18" cy="-10" r="2.2" fill="#1e293b" stroke="#580718" strokeWidth="0.6" />
            <circle cx="18" cy="-10" r="0.9" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.4" />
            <circle cx="16.5" cy="-10" r="0.25" fill="#e2e8f0" />
            <circle cx="19.5" cy="-10" r="0.25" fill="#e2e8f0" />
            <circle cx="18" cy="-11.5" r="0.25" fill="#e2e8f0" />
            <circle cx="18" cy="-8.5" r="0.25" fill="#e2e8f0" />

            {/* Emergency Ejection Rescue Stencil Box */}
            <rect x="8.5" y="-13" width="6.5" height="2.2" fill="none" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1.0 0.8" />
            <text x="11.7" y="-11.4" textAnchor="middle" fill="#f59e0b" fontSize="1.1" fontFamily="monospace" fontWeight="bold">RESCUE</text>

            {/* 8. MID-FUSELAGE VTOL LIFT INTAKE LOUVERS (+12 to +22) */}
            {/* Aerodynamic Intake Scoop Cavity */}
            <rect x="13" y="-2.5" width="8.5" height="13.2" rx="1.4" fill="#020617" stroke="#0f172a" strokeWidth="0.9" />
            {/* 7 Horizontal Cooling Louvers / Vanes */}
            <line x1="14" y1="-0.8" x2="20.5" y2="-0.8" stroke="#334155" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="1.0" x2="20.5" y2="1.0" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="2.8" x2="20.5" y2="2.8" stroke="#334155" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="4.6" x2="20.5" y2="4.6" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="6.4" x2="20.5" y2="6.4" stroke="#334155" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="8.2" x2="20.5" y2="8.2" stroke="#475569" strokeWidth="0.9" strokeLinecap="round" />
            <line x1="14" y1="10.0" x2="20.5" y2="10.0" stroke="#334155" strokeWidth="0.9" strokeLinecap="round" />
            {/* Upper Crimson Splitter Vane */}
            <path d="M 12.5,-3 L 22,-3 L 21,-1 L 13.5,-1 Z" fill="url(#valkyrie-crimson-accent)" stroke="#580718" strokeWidth="0.5" />

            {/* 9. FUEL RECEPTACLE & PERFORATED SERVICE PANEL (+31 to +37) */}
            <rect x="31" y="4.5" width="6" height="5.2" rx="0.6" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
            {/* Yellow Fuel Filler Cap */}
            <circle cx="33" cy="7.0" r="1.3" fill="#facc15" stroke="#000000" strokeWidth="0.4" />
            <circle cx="33" cy="7.0" r="0.5" fill="#0f172a" />
            {/* Mesh Perforation Matrix */}
            <circle cx="35.5" cy="5.8" r="0.3" fill="#475569" />
            <circle cx="35.5" cy="7.0" r="0.3" fill="#475569" />
            <circle cx="35.5" cy="8.2" r="0.3" fill="#475569" />

            {/* 10. "VALKYRIE" WINGED CREST EMBLEM (-4 to +6) */}
            {/* Winged Crest Golden/Crimson Wings */}
            <g id="valkyrie-crest-badge">
              {/* Left Feather Fan */}
              <path d="M 0,2 C -2,0 -4,1 -5,3 C -3,2.5 -1,2.5 0,3 Z" fill="url(#valkyrie-gold-crest)" />
              <path d="M 0,3 C -2,1.5 -4,2.5 -4.5,4.5 C -3,4 -1,3.5 0,4 Z" fill="#dc2626" />
              {/* Right Feather Fan */}
              <path d="M 0,2 C 2,0 4,1 5,3 C 3,2.5 1,2.5 0,3 Z" fill="url(#valkyrie-gold-crest)" />
              <path d="M 0,3 C 2,1.5 4,2.5 4.5,4.5 C 3,4 1,3.5 0,4 Z" fill="#dc2626" />
              {/* Central Armored Winged Helm */}
              <ellipse cx="0" cy="3.5" rx="1.6" ry="2.0" fill="#1e293b" stroke="#eab308" strokeWidth="0.5" />
              <polygon points="-1.2,2.8 1.2,2.8 0,4.2" fill="#facc15" />
              {/* Plaque Banner */}
              <rect x="-4.5" y="5.5" width="9.0" height="2.8" rx="0.5" fill="#090d16" stroke="#eab308" strokeWidth="0.5" />
              <text
                x="0"
                y="7.6"
                textAnchor="middle"
                fill="#fef08a"
                fontSize="1.9"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                letterSpacing="0.08em"
              >
                VALKYRIE
              </text>
            </g>

            {/* Flank Avionics Status Indicators & Stencils */}
            {/* 3 Vertical Red Status Bars */}
            <rect x="8.0" y="2.2" width="2.0" height="0.8" rx="0.2" fill="#ef4444" />
            <rect x="8.0" y="3.6" width="2.0" height="0.8" rx="0.2" fill="#ef4444" />
            <rect x="8.0" y="5.0" width="2.0" height="0.8" rx="0.2" fill="#ef4444" />
            {/* Caution Stencil */}
            <text x="6.8" y="7.5" fill="#facc15" fontSize="0.9" fontFamily="monospace" fontWeight="bold">CAUTION</text>

            {/* 11. SEALED CARGO RAMP DOOR (-24 to -10) */}
            <rect x="-24" y="-1.5" width="14" height="13.5" rx="1.2" fill="#1e293b" stroke="#0f172a" strokeWidth="0.9" />
            {/* Inner Structural Reinforcement Bevel */}
            <rect x="-22.5" y="0.2" width="11" height="10" rx="0.8" fill="#111827" stroke="#334155" strokeWidth="0.5" />
            {/* Embossed Structural Cross-Rib Bracing */}
            <line x1="-22" y1="0.5" x2="-12" y2="10" stroke="#1f2937" strokeWidth="0.8" />
            <line x1="-12" y1="0.5" x2="-22" y2="10" stroke="#1f2937" strokeWidth="0.8" />
            {/* Heavy Latch Handle Mechanism */}
            <rect x="-12.5" y="4.5" width="1.2" height="2.2" rx="0.3" fill="#e2e8f0" stroke="#0f172a" strokeWidth="0.3" />
            {/* Hydraulic Hinge Step at Bottom */}
            <rect x="-20" y="11.0" width="6.0" height="1.0" rx="0.3" fill="#475569" />
            {/* Stencil */}
            <text x="-17" y="1.4" textAnchor="middle" fill="#f59e0b" fontSize="0.9" fontFamily="monospace">CARGO RAMP</text>

            {/* 12. FLANK SPONSON WING & OUTBOARD WINGTIP POD */}
            {/* Swept Stub Wing */}
            <polygon points="-46,4 -24,4 -22,7.5 -46,7.5" fill="url(#valkyrie-crimson-hull)" stroke="#580718" strokeWidth="0.7" />
            {/* Cylindrical Outboard Wingtip Pod (-50 to -30) */}
            <rect x="-50" y="4.6" width="20" height="2.8" rx="1.4" fill="#1e293b" stroke="#0f172a" strokeWidth="0.7" />
            <line x1="-48" y1="6.0" x2="-32" y2="6.0" stroke="#475569" strokeWidth="0.6" />

            {/* Forward Starboard Navigation Strobe (Green) */}
            <circle cx="-30.5" cy="6.0" r="1.1" fill="#10b981" />
            <circle cx="-30.5" cy="6.0" r="2.8" fill="#10b981" opacity="0.4">
              <animate attributeName="opacity" values="0.8;0.1;0.8;0.1;0.05" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* Aft Port Navigation Strobe (Red) */}
            <circle cx="-49.5" cy="6.0" r="1.1" fill="#ef4444" />
            <circle cx="-49.5" cy="6.0" r="2.8" fill="#ef4444" opacity="0.4">
              <animate attributeName="opacity" values="0.1;0.8;0.1;0.8;0.05" dur="1.2s" repeatCount="indefinite" />
            </circle>

            {/* Auxiliary Booster / Nacelle Fairing Above Wing (-52 to -22) */}
            <path d="M -50,-6 L -26,-6 L -24,-3 L -50,-3 Z" fill="#111827" stroke="#334155" strokeWidth="0.6" />
            {/* Two Rectangular Yellow Status / Caution Lights */}
            <rect x="-29" y="-5.4" width="2.4" height="1.6" rx="0.3" fill="#facc15" stroke="#000000" strokeWidth="0.3" />
            <rect x="-25.5" y="-5.4" width="2.4" height="1.6" rx="0.3" fill="#facc15" stroke="#000000" strokeWidth="0.3" />

            {/* 13. PROMINENT VTOL LIFT THRUSTER ASSEMBLIES (FORWARD & AFT) */}
            {/* Ventral Keel Propellant Manifold Conduit linking thrusters */}
            <path d="M -22,14 L 14,14 L 14,15.2 L -22,15.2 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="0.6" />
            <line x1="-18" y1="14.6" x2="10" y2="14.6" stroke="#475569" strokeWidth="0.5" strokeDasharray="1.5 1.0" />

            {/* AFT VTOL THRUSTER ASSEMBLY (Aligned to leftThrusterPos at x = -26) */}
            <g id="valkyrie-vtol-aft">
              {/* Mounting Gimbal Collar */}
              <rect x="-29" y="12.2" width="6" height="2.2" rx="0.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
              {/* Hydraulic Gimbal Actuators */}
              <line x1="-28.5" y1="12.0" x2="-27.5" y2="14.2" stroke="#94a3b8" strokeWidth="0.9" />
              <line x1="-23.5" y1="12.0" x2="-24.5" y2="14.2" stroke="#94a3b8" strokeWidth="0.9" />
              {/* Flared Conical Nozzle Bell */}
              <polygon points="-28.5,14 -23.5,14 -22.2,18.0 -29.8,18.0" fill="url(#valkyrie-vtol-bell)" stroke="#0f172a" strokeWidth="0.8" />
              {/* Exterior Stiffener / Cooling Ribs */}
              <line x1="-27.8" y1="14.2" x2="-28.8" y2="17.8" stroke="#475569" strokeWidth="0.5" />
              <line x1="-26.0" y1="14.2" x2="-26.0" y2="17.8" stroke="#64748b" strokeWidth="0.5" />
              <line x1="-24.2" y1="14.2" x2="-23.2" y2="17.8" stroke="#475569" strokeWidth="0.5" />
              {/* Dark Nozzle Exhaust Exit Rim */}
              <ellipse cx="-26" cy="18.0" rx="3.8" ry="0.95" fill="#090d16" stroke="#1e293b" strokeWidth="0.6" />
              {/* Glowing Throat Interior */}
              <ellipse cx="-26" cy="17.8" rx="2.4" ry="0.5" fill="#38bdf8" opacity="0.85" />
              <ellipse cx="-26" cy="17.8" rx="1.1" ry="0.25" fill="#ffffff" opacity="0.95" />
            </g>

            {/* FORWARD VTOL THRUSTER ASSEMBLY (Aligned to rightThrusterPos at x = +18) */}
            <g id="valkyrie-vtol-fwd">
              {/* Mounting Gimbal Collar under intake louvers */}
              <rect x="15" y="12.2" width="6" height="2.2" rx="0.5" fill="#1e293b" stroke="#0f172a" strokeWidth="0.8" />
              {/* Hydraulic Gimbal Actuators */}
              <line x1="15.5" y1="12.0" x2="16.5" y2="14.2" stroke="#94a3b8" strokeWidth="0.9" />
              <line x1="20.5" y1="12.0" x2="19.5" y2="14.2" stroke="#94a3b8" strokeWidth="0.9" />
              {/* Flared Conical Nozzle Bell */}
              <polygon points="15.5,14 20.5,14 21.8,18.0 14.2,18.0" fill="url(#valkyrie-vtol-bell)" stroke="#0f172a" strokeWidth="0.8" />
              {/* Exterior Stiffener / Cooling Ribs */}
              <line x1="16.2" y1="14.2" x2="15.2" y2="17.8" stroke="#475569" strokeWidth="0.5" />
              <line x1="18.0" y1="14.2" x2="18.0" y2="17.8" stroke="#64748b" strokeWidth="0.5" />
              <line x1="19.8" y1="14.2" x2="20.8" y2="17.8" stroke="#475569" strokeWidth="0.5" />
              {/* Dark Nozzle Exhaust Exit Rim */}
              <ellipse cx="18" cy="18.0" rx="3.8" ry="0.95" fill="#090d16" stroke="#1e293b" strokeWidth="0.6" />
              {/* Glowing Throat Interior */}
              <ellipse cx="18" cy="17.8" rx="2.4" ry="0.5" fill="#38bdf8" opacity="0.85" />
              <ellipse cx="18" cy="17.8" rx="1.1" ry="0.25" fill="#ffffff" opacity="0.95" />
            </g>

            {/* 14. HEAVY GROUND LANDING GEAR SKIDS */}
            {/* Forward Landing Gear (x = +24) */}
            <g id="valkyrie-gear-fwd">
              {/* Hydraulic Cylinder */}
              <line x1="24" y1="13" x2="24" y2="19.2" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
              {/* Chrome Oleo Piston */}
              <line x1="24" y1="16" x2="24" y2="19.2" stroke="#f1f5f9" strokeWidth="1.3" strokeLinecap="round" />
              {/* Scissor Torque Link */}
              <polyline points="22,14 20,16.5 24,18.5" fill="none" stroke="#475569" strokeWidth="0.8" />
              {/* Pivot Knuckle */}
              <circle cx="24" cy="19.2" r="1.3" fill="#0f172a" stroke="#facc15" strokeWidth="0.5" />
              {/* Articulated Footpad Skid */}
              <rect x="18" y="19.2" width="12" height="2.6" rx="0.8" fill="#0f172a" stroke="#eab308" strokeWidth="0.8" />
              {/* Hazard Stripes */}
              <line x1="20" y1="19.4" x2="22" y2="21.6" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="24" y1="19.4" x2="26" y2="21.6" stroke="#f59e0b" strokeWidth="0.8" />
            </g>

            {/* Rear Landing Gear (x = -32) */}
            <g id="valkyrie-gear-rear">
              {/* Hydraulic Cylinder */}
              <line x1="-32" y1="13" x2="-32" y2="19.2" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" />
              {/* Chrome Oleo Piston */}
              <line x1="-32" y1="16" x2="-32" y2="19.2" stroke="#f1f5f9" strokeWidth="1.3" strokeLinecap="round" />
              {/* Scissor Torque Link */}
              <polyline points="-34,14 -36,16.5 -32,18.5" fill="none" stroke="#475569" strokeWidth="0.8" />
              {/* Pivot Knuckle */}
              <circle cx="-32" cy="19.2" r="1.3" fill="#0f172a" stroke="#facc15" strokeWidth="0.5" />
              {/* Articulated Footpad Skid */}
              <rect x="-38" y="19.2" width="12" height="2.6" rx="0.8" fill="#0f172a" stroke="#eab308" strokeWidth="0.8" />
              {/* Hazard Stripes */}
              <line x1="-36" y1="19.4" x2="-34" y2="21.6" stroke="#f59e0b" strokeWidth="0.8" />
              <line x1="-32" y1="19.4" x2="-30" y2="21.6" stroke="#f59e0b" strokeWidth="0.8" />
            </g>
          </g>
        )}

        {/* ========================================================= */}
        {/* MODEL: JUGGERNAUT LIFTER (JG-1200 Heavy Rover Carrier)    */}
        {/* ========================================================= */}
        {modelId === 'juggernaut' && (
          <g>
            {/* Front ramp, shown partially deployed (mid-animation) */}
            <polygon points="-58,12 -73,11 -72,17 -56,17" fill="#40423E" stroke="#20251F" strokeWidth="1.3" />
            <line x1="-58" y1="12" x2="-73" y2="11" stroke="#F0D256" strokeWidth="1" />
            <line x1="-56" y1="17" x2="-72" y2="17" stroke="#F0D256" strokeWidth="1" />
            <line x1="-68" y1="15" x2="-64" y2="13" stroke="#20251F" strokeWidth="0.8" />
            <line x1="-63" y1="13" x2="-59" y2="15" stroke="#20251F" strokeWidth="0.8" />
            <line x1="-58" y1="11" x2="-60" y2="16" stroke="#A09D8F" strokeWidth="1.2" />
            <line x1="-57" y1="11" x2="-59" y2="16" stroke="#80691F" strokeWidth="2.2" />

            {/* Bow thrusters (outer port/inner port at y=28) - animated pulse */}
            <ellipse cx="-62" cy="28" rx="4.5" ry="4" fill="#1e293b" stroke="#20251F" strokeWidth="1.2" />
            <ellipse cx="-62" cy="27" rx="3" ry="1.5" fill="#D5B43D" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="-48" cy="28" rx="3.5" ry="4" fill="#1e293b" stroke="#20251F" strokeWidth="1.2" />
            <ellipse cx="-48" cy="27" rx="2.5" ry="1.5" fill="#D5B43D" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite" />
            </ellipse>

            {/* Main circular rear propulsion assembly */}
            <ellipse cx="67" cy="-1" rx="12" ry="17" fill="#67665E" stroke="#20251F" strokeWidth="1.5" />
            <ellipse cx="67" cy="-1" rx="10" ry="15" fill="none" stroke="#A09D8F" strokeWidth="1" />
            <ellipse cx="67" cy="-1" rx="8" ry="14" fill="none" stroke="#A09D8F" strokeWidth="0.8" />
            <ellipse cx="67" cy="-1" rx="5" ry="12" fill="#40423E" stroke="#20251F" strokeWidth="1" />
            <rect x="54" y="-15" width="4" height="3" fill="#D5B43D" />
            <rect x="54" y="12" width="4" height="3" fill="#D5B43D" />

            {/* Stern thrusters at bottom of main engine (y≈16) - animated pulse sync with engine */}
            <ellipse cx="67" cy="16" rx="3.5" ry="2.5" fill="#1e293b" stroke="#20251F" strokeWidth="1.2" />
            <ellipse cx="67" cy="15.5" rx="2.5" ry="1.2" fill="#D5B43D" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="79" cy="16" rx="3.5" ry="2.5" fill="#1e293b" stroke="#20251F" strokeWidth="1.2" />
            <ellipse cx="79" cy="15.5" rx="2.5" ry="1.2" fill="#D5B43D" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="85" cy="16" rx="4.5" ry="2.5" fill="#1e293b" stroke="#20251F" strokeWidth="1.2" />
            <ellipse cx="85" cy="15.5" rx="3" ry="1.2" fill="#D5B43D" opacity="0.8">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite" />
            </ellipse>

            {/* Three downward lift-engine bells with exhaust */}
            <g fill="#78776D" stroke="#20251F" strokeWidth="1">
              <rect x="-34" y="14" width="8" height="7" rx="1" />
              <polygon points="-35,20 -25,20 -23,31 -37,31" />
              <rect x="-4" y="14" width="8" height="7" rx="1" />
              <polygon points="-5,20 5,20 7,31 -7,31" />
              <rect x="26" y="14" width="8" height="7" rx="1" />
              <polygon points="25,20 35,20 37,31 23,31" />
            </g>
            <g stroke="#A09D8F" strokeWidth="0.7">
              <line x1="-35" y1="23" x2="-25" y2="23" /><line x1="-35" y1="26" x2="-25" y2="26" /><line x1="-35" y1="29" x2="-25" y2="29" />
              <line x1="-5" y1="23" x2="5" y2="23" /><line x1="-5" y1="26" x2="5" y2="26" /><line x1="-5" y1="29" x2="5" y2="29" />
              <line x1="25" y1="23" x2="35" y2="23" /><line x1="25" y1="26" x2="35" y2="26" /><line x1="25" y1="29" x2="35" y2="29" />
            </g>
            <g fill="#FFF1A8" opacity="0.65">
              <ellipse cx="-30" cy="32" rx="6" ry="3" /><ellipse cx="0" cy="32" rx="6" ry="3" /><ellipse cx="30" cy="32" rx="6" ry="3" />
            </g>

            {/* Tracked landing bogies and suspension */}
            <g fill="#3E4D39" stroke="#20251F" strokeWidth="1.1">
              <rect x="-67" y="35" width="24" height="5" rx="2" /><rect x="-24" y="35" width="24" height="5" rx="2" /><rect x="30" y="35" width="24" height="5" rx="2" />
            </g>
            <g fill="#242D25">
              <circle cx="-63" cy="37.5" r="2" /><circle cx="-58" cy="37.5" r="2" /><circle cx="-53" cy="37.5" r="2" /><circle cx="-20" cy="37.5" r="2" /><circle cx="-15" cy="37.5" r="2" /><circle cx="-10" cy="37.5" r="2" /><circle cx="34" cy="37.5" r="2" /><circle cx="39" cy="37.5" r="2" /><circle cx="44" cy="37.5" r="2" />
            </g>
            <g stroke="#344735" strokeWidth="4"><line x1="-50" y1="18" x2="-56" y2="35" /><line x1="-18" y1="18" x2="-20" y2="35" /><line x1="38" y1="18" x2="42" y2="35" /><line x1="58" y1="18" x2="58" y2="35" /></g>
            <g stroke="#A09D8F" strokeWidth="1"><line x1="-50" y1="20" x2="-56" y2="34" /><line x1="-18" y1="20" x2="-20" y2="34" /><line x1="38" y1="20" x2="42" y2="34" /><line x1="58" y1="20" x2="58" y2="34" /></g>

            {/* Open-sided multi-deck cargo bay */}
            <rect x="-22" y="-1" width="58" height="23" rx="1.5" fill="#40423E" stroke="#20251F" strokeWidth="1.4" />
            <g stroke="#9A988B" strokeWidth="0.8"><line x1="-20" y1="5" x2="34" y2="5" /><line x1="-20" y1="12" x2="34" y2="12" /><line x1="-20" y1="19" x2="34" y2="19" /><line x1="-16" y1="1" x2="-16" y2="22" /><line x1="-2" y1="1" x2="-2" y2="22" /><line x1="12" y1="1" x2="12" y2="22" /><line x1="26" y1="1" x2="26" y2="22" /></g>
            <g fill="#4E6845" stroke="#20251F" strokeWidth="0.5">
              <rect x="-18" y="0" width="8" height="2.5" rx="0.6" /><rect x="8" y="0" width="8" height="2.5" rx="0.6" /><rect x="-8" y="7" width="8" height="2.5" rx="0.6" /><rect x="18" y="7" width="8" height="2.5" rx="0.6" /><rect x="-18" y="14" width="8" height="2.5" rx="0.6" /><rect x="6" y="14" width="8" height="2.5" rx="0.6" />
            </g>

            {/* Lower armored hull */}
            <path d="M-67 8 L56 8 L58 22 L39 25 L-42 24 L-65 20 Z" fill="#344735" stroke="#20251F" strokeWidth="1.8" />

            {/* Main wedge-shaped fuselage, left-facing bow */}
            <path d="M-70 -25 L-55 -42 L-30 -48 L44 -42 L57 -30 L58 9 L38 14 L-48 13 L-68 5 Z" fill="url(#juggernaut-hull-grad)" stroke="#20251F" strokeWidth="1.8" />
            <path d="M-66 -24 L-48 -38 L-30 -8 L-40 12 L-64 7 Z" fill="#4C633F" stroke="#20251F" strokeWidth="1.1" />
            <path d="M38 -37 L52 -28 L54 -9 L38 -6 Z" fill="#829968" stroke="#20251F" strokeWidth="1.1" />
            <g stroke="#344735" strokeWidth="0.9" fill="none"><line x1="-40" y1="-40" x2="-40" y2="8" /><line x1="-10" y1="-45" x2="-10" y2="7" /><line x1="22" y1="-44" x2="22" y2="8" /><line x1="39" y1="-36" x2="39" y2="7" /><line x1="-53" y1="-12" x2="-35" y2="-12" /><line x1="5" y1="-35" x2="32" y2="-35" /></g>
            <g fill="#344735" stroke="#20251F" strokeWidth="0.6"><rect x="-62" y="-3" width="8" height="5" /><rect x="-50" y="3" width="8" height="3" /><rect x="-26" y="-38" width="12" height="4" /><rect x="27" y="-29" width="9" height="4" /><rect x="44" y="0" width="8" height="4" /></g>
            <g stroke="#20251F" strokeWidth="1.1"><line x1="0" y1="-38" x2="3" y2="-33" /><line x1="4" y1="-38" x2="7" y2="-33" /><line x1="8" y1="-37" x2="11" y2="-32" /></g>

            {/* Gold reinforcement bands */}
            <g fill="#D5B43D" stroke="#20251F" strokeWidth="1.1"><path d="M-17 -43 L-11 -43 L-9 10 L-18 10 Z" /><path d="M19 -43 L25 -43 L27 10 L18 10 Z" /></g>
            <g stroke="#80691F" strokeWidth="0.75"><line x1="-16" y1="-38" x2="-11" y2="-38" /><line x1="-16" y1="-33" x2="-11" y2="-33" /><line x1="-16" y1="-28" x2="-11" y2="-28" /><line x1="-16" y1="-23" x2="-11" y2="-23" /><line x1="-16" y1="-18" x2="-11" y2="-18" /><line x1="-16" y1="-13" x2="-11" y2="-13" /><line x1="-16" y1="-8" x2="-11" y2="-8" /><line x1="20" y1="-38" x2="25" y2="-38" /><line x1="20" y1="-33" x2="25" y2="-33" /><line x1="20" y1="-28" x2="25" y2="-28" /><line x1="20" y1="-23" x2="25" y2="-23" /><line x1="20" y1="-18" x2="25" y2="-18" /><line x1="20" y1="-13" x2="25" y2="-13" /><line x1="20" y1="-8" x2="25" y2="-8" /></g>

            {/* Octagonal front service hatch */}
            <path d="M-54 -20 L-47 -26 L-38 -26 L-34 -20 L-34 4 L-40 9 L-50 7 L-55 0 Z" fill="#40423E" stroke="#20251F" strokeWidth="1.4" />
            <path d="M-37 -25 L-34 -20 L-34 4 L-40 9" fill="none" stroke="#D5B43D" strokeWidth="1.4" />
            <g stroke="#344735" strokeWidth="0.8"><line x1="-48" y1="-22" x2="-40" y2="-22" /><line x1="-48" y1="-17" x2="-39" y2="-17" /><line x1="-48" y1="3" x2="-39" y2="3" /></g>

            {/* Bow face, observation band, paired sensor arrays */}
            <path d="M-70 -25 L-73 -15 L-70 5 L-62 8 L-59 -27 Z" fill="#6D8558" stroke="#20251F" strokeWidth="1.5" />
            <rect x="-68" y="-18" width="3" height="10" fill="#D5B43D" /><rect x="-67" y="-2" width="3" height="8" fill="#D5B43D" />
            <path d="M-65 -18 L-47 -20 L-42 -15 L-46 -11 L-66 -11 Z" fill="#303A39" stroke="#20251F" strokeWidth="1.1" />
            <g stroke="#9BA79A" strokeWidth="0.8"><line x1="-62" y1="-16" x2="-53" y2="-17" /><line x1="-50" y1="-17" x2="-46" y2="-16" /></g>
            <g fill="#78776D" stroke="#20251F" strokeWidth="0.9"><ellipse cx="-70" cy="-9" rx="4" ry="2.2" /><ellipse cx="-70" cy="-1" rx="4" ry="2.2" /></g>
            <g stroke="#262B25" strokeWidth="0.8"><line x1="-73" y1="-10" x2="-84" y2="-15" /><line x1="-73" y1="-9" x2="-85" y2="-9" /><line x1="-73" y1="-8" x2="-83" y2="-3" /><line x1="-73" y1="-2" x2="-84" y2="-7" /><line x1="-73" y1="-1" x2="-85" y2="-1" /><line x1="-73" y1="0" x2="-83" y2="5" /></g>

            {/* Bridge and crew quarters */}
            <path d="M-52 -42 L-45 -53 L-22 -56 L-14 -45 L-17 -35 L-48 -34 Z" fill="#829968" stroke="#20251F" strokeWidth="1.5" />
            <path d="M-48 -43 L-27 -46 L-20 -41 L-24 -36 L-49 -36 Z" fill="#303A39" stroke="#20251F" strokeWidth="1.1" />
            <g stroke="#9BA79A" strokeWidth="0.8"><line x1="-44" y1="-41" x2="-36" y2="-42" /><line x1="-33" y1="-43" x2="-26" y2="-42" /></g>
            <path d="M-39 -54 L-35 -59 L-21 -59 L-17 -54 Z" fill="#91A878" stroke="#20251F" strokeWidth="1.2" />
            <rect x="-34" y="-57" width="12" height="3" rx="0.8" fill="#303A39" stroke="#20251F" strokeWidth="0.8" />
            <rect x="-48" y="-49" width="6" height="3" fill="#D5B43D" /><rect x="-18" y="-48" width="5" height="3" fill="#D5B43D" />

            {/* Dorsal antenna and animated lights */}
            <line x1="-27" y1="-59" x2="-27" y2="-72" stroke="#20251F" strokeWidth="1.1" />
            <line x1="-36" y1="-58" x2="-36" y2="-65" stroke="#20251F" strokeWidth="1.1" />
            <line x1="-18" y1="-55" x2="-18" y2="-63" stroke="#20251F" strokeWidth="1.1" />
            <circle cx="-27" cy="-73" r="1.8" fill="#F5DD70"><animate attributeName="opacity" values="0.25;1;0.25" dur="0.7s" repeatCount="indefinite" /></circle>
            <circle cx="-36" cy="-66" r="1.2" fill="#E84942"><animate attributeName="opacity" values="1;0.2;1" dur="1.15s" repeatCount="indefinite" /></circle>

            {/* Illuminated JUGGERNAUT LIFTER side plaque */}
            <rect x="-2" y="-18" width="31" height="13" rx="2" fill="#3C4B36" stroke="#80691F" strokeWidth="1.4" />
            <rect x="-1" y="-17" width="29" height="11" rx="1.7" fill="none" stroke="#F0D256" strokeWidth="1.4" />
            <text x="13.5" y="-13" fill="#F4F0D7" fontSize="4.1" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">JUGGERNAUT</text>
            <text x="13.5" y="-8" fill="#F4F0D7" fontSize="4.1" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">LIFTER</text>

            {/* Rear RCS rods and machinery */}
            <g stroke="#20251F" strokeWidth="0.9"><line x1="45" y1="-35" x2="57" y2="-42" /><line x1="48" y1="-33" x2="62" y2="-38" /><line x1="51" y1="-31" x2="65" y2="-31" /><line x1="52" y1="8" x2="63" y2="14" /><line x1="54" y1="6" x2="66" y2="10" /></g>
            <rect x="30" y="-25" width="10" height="7" rx="1" fill="#78776D" stroke="#20251F" strokeWidth="0.8" />
            <g stroke="#D5B43D" strokeWidth="0.8"><line x1="33" y1="-23" x2="38" y2="-23" /><line x1="33" y1="-20" x2="38" y2="-20" /></g>
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

        {modelId === 'vulcan' && (
          <g id="vulcan-root">
            {/* 1. Far-side gear struts and engine bells */}
            <path
              d="M-34,9 L-37,17.5 L-35,17.5"
              stroke="#161d15"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="-38.5"
              y="17.5"
              width="7"
              height="2"
              rx="0.5"
              fill="#101510"
              stroke="#0a0d09"
              strokeWidth="0.6"
            />

            <path
              d="M44,9 L44,17.5"
              stroke="#161d15"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <rect
              x="40.5"
              y="17.5"
              width="7"
              height="2"
              rx="0.5"
              fill="#101510"
              stroke="#0a0d09"
              strokeWidth="0.6"
            />

            <rect
              x="64"
              y="-8"
              width="5"
              height="5"
              rx="0.8"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <rect
              x="64"
              y="-1"
              width="5"
              height="5"
              rx="0.8"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.8"
            />

            {/* 2. Underslung central belly propellant tank pod */}
            <path
              d="M-4,12.5 L14,12.5 C16.5,12.5 17.5,14 17.5,16 C17.5,17.5 16,18.5 13.5,18.5 L-3.5,18.5 C-6,18.5 -7.5,17.5 -7.5,16 C-7.5,14 -6.5,12.5 -4,12.5 Z"
              fill="url(#vulcan-belly-tank)"
              stroke="#0b0e0a"
              strokeWidth="1.0"
            />
            <rect
              x="-2"
              y="12.5"
              width="2"
              height="6"
              fill="#181f17"
              stroke="#0b0e0a"
              strokeWidth="0.5"
            />
            <rect
              x="10"
              y="12.5"
              width="2"
              height="6"
              fill="#181f17"
              stroke="#0b0e0a"
              strokeWidth="0.5"
            />
            <circle
              cx="4"
              cy="15.5"
              r="1.0"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="0.4"
            />
            <line
              x1="4"
              y1="14.5"
              x2="4"
              y2="12.5"
              stroke="#64748b"
              strokeWidth="0.6"
            />
            <path
              d="M-3,14 L13,14"
              stroke="#485942"
              strokeWidth="0.5"
              opacity="0.6"
            />

            {/* Umbilical conduits */}
            <path
              d="M-15,12 C-13,14 -9,14 -7,12.5"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.2"
            />
            <path
              d="M14,12.5 C16,14.5 18,14 20,12"
              fill="none"
              stroke="#0f172a"
              strokeWidth="1.0"
            />

            {/* 3. VTOL lift engine nozzles */}
            <rect
              x="-26.5"
              y="10.5"
              width="5"
              height="3"
              rx="0.5"
              fill="#1e241c"
              stroke="#0f140f"
              strokeWidth="0.8"
            />
            <path
              d="M-26.5,13.5 L-21.5,13.5 L-20.5,16.5 L-27.5,16.5 Z"
              fill="url(#vulcan-bell)"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <ellipse
              cx="-24"
              cy="16.5"
              rx="3.5"
              ry="0.8"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.5"
            />
            <ellipse
              cx="-24"
              cy="16.3"
              rx="2.0"
              ry="0.4"
              fill="#f59e0b"
              opacity="0.85"
            />

            <rect
              x="33.5"
              y="10.5"
              width="5"
              height="3"
              rx="0.5"
              fill="#1e241c"
              stroke="#0f140f"
              strokeWidth="0.8"
            />
            <path
              d="M33.5,13.5 L38.5,13.5 L39.5,16.5 L32.5,16.5 Z"
              fill="url(#vulcan-bell)"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <ellipse
              cx="36"
              cy="16.5"
              rx="3.5"
              ry="0.8"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.5"
            />
            <ellipse
              cx="36"
              cy="16.3"
              rx="2.0"
              ry="0.4"
              fill="#f59e0b"
              opacity="0.85"
            />

            {/* 4. Lower mechanical conduit bay */}
            <polygon
              points="-46,5 -8,5 -8,12.5 -40,12.5 -46,9"
              fill="url(#vulcan-mech-bay)"
              stroke="#0d110d"
              strokeWidth="1.0"
            />
            <line
              x1="-42"
              y1="7"
              x2="-10"
              y2="7"
              stroke="#374151"
              strokeWidth="1.0"
            />
            <line
              x1="-40"
              y1="9.5"
              x2="-12"
              y2="9.5"
              stroke="#1f2937"
              strokeWidth="1.4"
            />
            <line
              x1="-38"
              y1="11"
              x2="-15"
              y2="11"
              stroke="#4b5563"
              strokeWidth="0.8"
            />
            <rect
              x="-38"
              y="6"
              width="3"
              height="5"
              rx="0.5"
              fill="#2d3748"
              stroke="#1a202c"
              strokeWidth="0.5"
            />
            <rect
              x="-26"
              y="6.5"
              width="3.5"
              height="4.5"
              rx="0.5"
              fill="#2d3748"
              stroke="#1a202c"
              strokeWidth="0.5"
            />
            <rect
              x="-14"
              y="6"
              width="3"
              height="5"
              rx="0.5"
              fill="#2d3748"
              stroke="#1a202c"
              strokeWidth="0.5"
            />

            {/* 5. Center module: Aegis emblem & Drone Operator Airlock */}
            <polygon
              points="-8,-19 18,-19 18,12.5 -8,12.5"
              fill="url(#vulcan-olive-plate)"
              stroke="#111611"
              strokeWidth="1.2"
            />
            <line
              x1="-8"
              y1="-19"
              x2="-8"
              y2="12.5"
              stroke="#111611"
              strokeWidth="1.4"
            />
            <line
              x1="18"
              y1="-19"
              x2="18"
              y2="12.5"
              stroke="#111611"
              strokeWidth="1.4"
            />
            <line
              x1="4"
              y1="-18"
              x2="4"
              y2="11.5"
              stroke="#1e271c"
              strokeWidth="1.0"
            />

            {/* Upper dorsal spine catwalk & antenna */}
            <rect
              x="-7"
              y="-20.5"
              width="24"
              height="2"
              fill="#1e241c"
              stroke="#0f140f"
              strokeWidth="0.7"
            />
            <line
              x1="-6"
              y1="-19.5"
              x2="16"
              y2="-19.5"
              stroke="#4b5563"
              strokeWidth="0.6"
            />
            <line
              x1="14"
              y1="-20.5"
              x2="14"
              y2="-25.5"
              stroke="#94a3b8"
              strokeWidth="0.8"
            />
            <circle cx="14" cy="-25.5" r="0.6" fill="#ef4444" />

            {/* Aegis Dynamics Logo Emblem */}
            <polygon
              points="1,-6 -2,-1 0,-1 1,-3 2,-1 4,-1"
              fill="#e2e8f0"
              stroke="#0f172a"
              strokeWidth="0.4"
            />
            <polygon
              points="1,-8 -3,0 -1,0 1,-4 3,0 5,0"
              fill="#cbd5e1"
              opacity="0.8"
            />
            <text
              x="1"
              y="2.5"
              fontFamily="monospace, sans-serif"
              fontSize="2.6"
              fontWeight="900"
              fill="#e2e8f0"
              letterSpacing="0.5"
              textAnchor="middle"
            >
              AEGIS
            </text>
            <text
              x="1"
              y="5.2"
              fontFamily="monospace, sans-serif"
              fontSize="1.4"
              fontWeight="700"
              fill="#94a3b8"
              letterSpacing="0.8"
              textAnchor="middle"
            >
              DYNAMICS
            </text>

            {/* Drone Operator Airlock / Docking Bay Hatch */}
            <rect
              x="5.5"
              y="-7.5"
              width="11"
              height="15"
              rx="1.0"
              fill="#2d3728"
              stroke="#161c14"
              strokeWidth="1.0"
            />
            <rect
              x="6.8"
              y="-6.2"
              width="8.4"
              height="12.4"
              rx="0.6"
              fill="#1f271c"
              stroke="#111611"
              strokeWidth="0.8"
            />
            <rect
              x="8.2"
              y="-4.5"
              width="5.6"
              height="7.5"
              rx="1.0"
              fill="#f8fafc"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <rect
              x="9.2"
              y="-3.2"
              width="3.6"
              height="5"
              rx="0.5"
              fill="#334155"
              stroke="#0f172a"
              strokeWidth="0.5"
            />
            <circle cx="11" cy="-0.7" r="1.1" fill="#0f172a" />
            <line
              x1="7.2"
              y1="-3"
              x2="8.2"
              y2="-3"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            <line
              x1="7.2"
              y1="1.5"
              x2="8.2"
              y2="1.5"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            <line
              x1="13.8"
              y1="-3"
              x2="14.8"
              y2="-3"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            <line
              x1="13.8"
              y1="1.5"
              x2="14.8"
              y2="1.5"
              stroke="#64748b"
              strokeWidth="0.8"
            />
            <circle cx="8" cy="5" r="0.5" fill="#22c55e" />
            <circle cx="9.5" cy="5" r="0.5" fill="#eab308" />

            {/* 6. Forward Green Armor Flank with R-17 Stencil */}
            <polygon
              points="-46,-19 -8,-19 -8,5 -38,5 -46,3"
              fill="url(#vulcan-olive-plate)"
              stroke="#111611"
              strokeWidth="1.2"
            />
            <polygon
              points="-44,-17 -10,-17 -10,3 -37,3 -44,1"
              fill="url(#vulcan-olive-flank)"
              opacity="0.6"
            />
            <polygon
              points="-45.5,-12 -42.5,-12 -44,-6 -47,-6"
              fill="url(#vulcan-hazard)"
              stroke="#1e293b"
              strokeWidth="0.5"
            />

            {/* Weathered Stencil R-17 */}
            <path
              d="M-35,-4 L-35,3 M-35,-4 L-30.5,-4 C-29,-4 -28,-3 -28,-1.5 C-28,0 -29,1 -30.5,1 L-35,1 M-31,1 L-28,3"
              stroke="#f8fafc"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
              opacity="0.9"
            />
            <line
              x1="-35"
              y1="-1.5"
              x2="-35"
              y2="-0.5"
              stroke="#3c4a36"
              strokeWidth="1.8"
            />
            <line
              x1="-26"
              y1="-0.5"
              x2="-23"
              y2="-0.5"
              stroke="#f8fafc"
              strokeWidth="1.6"
              strokeLinecap="square"
              opacity="0.9"
            />
            <path
              d="M-20,-2 L-18.5,-4 L-18.5,3 M-20.5,3 L-16.5,3"
              stroke="#f8fafc"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
              opacity="0.9"
            />
            <line
              x1="-18.5"
              y1="-1.5"
              x2="-18.5"
              y2="-0.5"
              stroke="#3c4a36"
              strokeWidth="1.8"
            />
            <path
              d="M-15,-4 L-9.5,-4 L-13,3"
              stroke="#f8fafc"
              strokeWidth="1.6"
              strokeLinecap="square"
              strokeLinejoin="miter"
              fill="none"
              opacity="0.9"
            />
            <line
              x1="-12.5"
              y1="-1"
              x2="-11.2"
              y2="-0.5"
              stroke="#3c4a36"
              strokeWidth="1.8"
            />

            <rect
              x="-37"
              y="-15"
              width="2"
              height="1.2"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.3"
            />
            <rect
              x="-18"
              y="-15"
              width="2"
              height="1.2"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.3"
            />
            <circle
              cx="-13"
              cy="1"
              r="0.9"
              fill="#1e271c"
              stroke="#485942"
              strokeWidth="0.5"
            />

            {/* 7. Forward Cockpit Cab (White) */}
            <polygon
              points="-68,-19 -46,-19 -46,3 -54,3 -66,-1 -70,-6 -68,-19"
              fill="url(#vulcan-white-cab)"
              stroke="#0f172a"
              strokeWidth="1.3"
            />
            <polygon
              points="-68,-19 -46,-19 -44,-16 -65,-16 -70,-15"
              fill="#ffffff"
              stroke="#cbd5e1"
              strokeWidth="0.6"
            />
            <polygon
              points="-69,-15 -62,-15 -60,-8 -67,-8"
              fill="#090d14"
              stroke="#0f172a"
              strokeWidth="1.0"
            />
            <polygon
              points="-68.2,-14.2 -62.8,-14.2 -61.2,-9 -66.5,-9"
              fill="#0f172a"
            />
            <polygon
              points="-67.5,-13.5 -64,-13.5 -65,-10 -67,-10"
              fill="#38bdf8"
              opacity="0.65"
            />
            <polygon
              points="-64.5,-13.5 -63,-13.5 -61.5,-9.5 -63,-9.5"
              fill="#0284c7"
              opacity="0.5"
            />
            <line
              x1="-64.5"
              y1="-14.5"
              x2="-63.5"
              y2="-8.5"
              stroke="#f8fafc"
              strokeWidth="1.0"
            />

            {/* White Chin & FLIR */}
            <polygon
              points="-70,-6 -66,-1 -58,-1 -58,3 -66,3 -71,0"
              fill="#e2e8f0"
              stroke="#0f172a"
              strokeWidth="0.9"
            />
            <circle
              cx="-67"
              cy="1"
              r="1.4"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <circle cx="-67" cy="1" r="0.6" fill="#38bdf8" />
            <line
              x1="-70"
              y1="-1"
              x2="-72"
              y2="-1"
              stroke="#475569"
              strokeWidth="0.8"
            />
            <line
              x1="-58"
              y1="-19"
              x2="-58"
              y2="-1"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />
            <line
              x1="-52"
              y1="-19"
              x2="-52"
              y2="3"
              stroke="#cbd5e1"
              strokeWidth="0.8"
            />

            {/* Diagonal Crimson Red Slash Stripe */}
            <polygon
              points="-47,-19 -42,-19 -38,-13 -43,-13"
              fill="url(#vulcan-red-stripe)"
              stroke="#7f1d1d"
              strokeWidth="0.6"
            />
            <line
              x1="-47"
              y1="-19"
              x2="-43"
              y2="-13"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <line
              x1="-42"
              y1="-19"
              x2="-38"
              y2="-13"
              stroke="#0f172a"
              strokeWidth="0.6"
            />

            {/* 8. Aft Superstructure, Command Deck & Turret */}
            <polygon
              points="18,-19 22,-22 42,-22 56,-16 66,-10 66,9 50,9 50,12.5 18,12.5"
              fill="url(#vulcan-olive-plate)"
              stroke="#111611"
              strokeWidth="1.3"
            />
            <polygon
              points="25,-21 38,-21 40,-18 24,-18"
              fill="#090d14"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <polygon
              points="26,-20.5 37,-20.5 38.5,-18.5 25.5,-18.5"
              fill="#0284c7"
              opacity="0.6"
            />
            <line
              x1="31"
              y1="-21"
              x2="31"
              y2="-18"
              stroke="#3c4a36"
              strokeWidth="0.8"
            />

            {/* Dorsal Turret */}
            <path
              d="M28,-22 L35,-22 L34,-25 L29,-25 Z"
              fill="#242c23"
              stroke="#0f140f"
              strokeWidth="0.8"
            />
            <circle
              cx="31.5"
              cy="-23.5"
              r="1.5"
              fill="#3c4a36"
              stroke="#111611"
              strokeWidth="0.5"
            />
            <rect
              x="25"
              y="-24.8"
              width="5"
              height="2"
              rx="0.5"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <line
              x1="25"
              y1="-24.3"
              x2="19"
              y2="-24.3"
              stroke="#64748b"
              strokeWidth="0.9"
            />
            <line
              x1="25"
              y1="-23.3"
              x2="19"
              y2="-23.3"
              stroke="#64748b"
              strokeWidth="0.9"
            />
            <rect x="18" y="-24.7" width="1.5" height="0.8" fill="#0f172a" />
            <rect x="18" y="-23.7" width="1.5" height="0.8" fill="#0f172a" />

            {/* Outrigger Sponson Armor */}
            <polygon
              points="20,-14 56,-14 62,-6 62,5 50,7 20,7"
              fill="url(#vulcan-olive-flank)"
              stroke="#111611"
              strokeWidth="1.0"
            />
            <rect
              x="24"
              y="-11"
              width="6"
              height="5"
              rx="0.5"
              fill="#2c3727"
              stroke="#111611"
              strokeWidth="0.6"
            />
            <rect
              x="34"
              y="-11"
              width="8"
              height="5"
              rx="0.5"
              fill="#2c3727"
              stroke="#111611"
              strokeWidth="0.6"
            />
            <rect
              x="46"
              y="-10"
              width="7"
              height="12"
              rx="0.5"
              fill="#333f2e"
              stroke="#161c14"
              strokeWidth="0.8"
            />
            <circle
              cx="27"
              cy="-1.5"
              r="1.2"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.5"
            />
            <circle cx="27" cy="-1.5" r="0.5" fill="#ef4444" />

            {/* Lower Aft Contrasting White Armor Housing */}
            <polygon
              points="50,9 66,9 66,16 54,16 50,12.5"
              fill="url(#vulcan-white-cab)"
              stroke="#0f172a"
              strokeWidth="1.1"
            />
            <line
              x1="56"
              y1="9"
              x2="56"
              y2="16"
              stroke="#cbd5e1"
              strokeWidth="0.7"
            />
            <line
              x1="64"
              y1="11"
              x2="64"
              y2="14"
              stroke="#475569"
              strokeWidth="0.8"
              strokeDasharray="0.8,0.8"
            />

            {/* Main Aft Vectoring Engine Block */}
            <polygon
              points="66,-9 70,-7 70,5 66,7"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="1.0"
            />
            <rect
              x="69"
              y="-6.5"
              width="2.5"
              height="4.5"
              rx="0.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.6"
            />
            <ellipse
              cx="71.5"
              cy="-4.2"
              rx="0.8"
              ry="1.8"
              fill="#f59e0b"
              opacity="0.8"
            />
            <rect
              x="69"
              y="0.5"
              width="2.5"
              height="4.5"
              rx="0.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.6"
            />
            <ellipse
              cx="71.5"
              cy="2.8"
              rx="0.8"
              ry="1.8"
              fill="#f59e0b"
              opacity="0.8"
            />

            {/* 9. Landing Gear & Footpads */}
            {/* Forward Landing Gear */}
            <rect
              x="-35"
              y="6"
              width="6"
              height="4"
              rx="0.8"
              fill="#2d3748"
              stroke="#0f172a"
              strokeWidth="1.0"
            />
            <circle
              cx="-32"
              cy="8"
              r="1.2"
              fill="#64748b"
              stroke="#0f172a"
              strokeWidth="0.5"
            />
            <path
              d="M-32,8 L-36,13.5 L-32,18"
              fill="none"
              stroke="#475569"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle
              cx="-36"
              cy="13.5"
              r="1.0"
              fill="#94a3b8"
              stroke="#0f172a"
              strokeWidth="0.5"
            />
            <rect
              x="-33"
              y="10"
              width="2"
              height="8.5"
              fill="url(#vulcan-chrome)"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <rect
              x="-33.5"
              y="13"
              width="3"
              height="1.2"
              rx="0.3"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.4"
            />

            {/* Forward Footpad */}
            <circle
              cx="-32"
              cy="18"
              r="1.3"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <path
              d="M-37,18.5 L-27,18.5 L-26,20 L-38,20 Z"
              fill="url(#vulcan-footpad)"
              stroke="#0b0e0a"
              strokeWidth="1.1"
            />
            <rect
              x="-38.5"
              y="20"
              width="13"
              height="1.5"
              rx="0.5"
              fill="#090d12"
              stroke="#1e293b"
              strokeWidth="0.6"
            />
            <circle cx="-36" cy="20.7" r="0.4" fill="#94a3b8" />
            <circle cx="-32" cy="20.7" r="0.4" fill="#94a3b8" />
            <circle cx="-28" cy="20.7" r="0.4" fill="#94a3b8" />

            {/* Aft Landing Gear */}
            <rect
              x="39"
              y="8"
              width="6"
              height="4"
              rx="0.8"
              fill="#2d3748"
              stroke="#0f172a"
              strokeWidth="1.0"
            />
            <circle
              cx="42"
              cy="10"
              r="1.2"
              fill="#64748b"
              stroke="#0f172a"
              strokeWidth="0.5"
            />
            <rect
              x="41"
              y="11"
              width="2"
              height="7.5"
              fill="url(#vulcan-chrome)"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <rect
              x="40.5"
              y="13"
              width="3"
              height="1.2"
              rx="0.3"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.4"
            />
            <rect
              x="40.5"
              y="15.5"
              width="3"
              height="1.2"
              rx="0.3"
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.4"
            />
            <line
              x1="39"
              y1="9"
              x2="41"
              y2="17.5"
              stroke="#334155"
              strokeWidth="1.2"
            />

            {/* Aft Footpad */}
            <circle
              cx="42"
              cy="18"
              r="1.4"
              fill="#475569"
              stroke="#0f172a"
              strokeWidth="0.6"
            />
            <path
              d="M36,18.5 L48,18.5 L49,20 L35,20 Z"
              fill="url(#vulcan-footpad)"
              stroke="#0b0e0a"
              strokeWidth="1.1"
            />
            <rect
              x="34.5"
              y="20"
              width="15"
              height="1.5"
              rx="0.5"
              fill="#090d12"
              stroke="#1e293b"
              strokeWidth="0.6"
            />
            <circle cx="37" cy="20.7" r="0.4" fill="#94a3b8" />
            <circle cx="42" cy="20.7" r="0.4" fill="#94a3b8" />
            <circle cx="47" cy="20.7" r="0.4" fill="#94a3b8" />

            {/* 10. Human Scale Reference Technician */}
            <g id="vulcan-crew-scale" opacity="0.85">
              <circle cx="-64" cy="13.2" r="0.9" fill="#1e293b" />
              <circle cx="-64" cy="13.2" r="0.4" fill="#f59e0b" />
              <path
                d="M-65,14.1 L-63,14.1 L-62.8,17.2 L-65.2,17.2 Z"
                fill="#0f172a"
              />
              <line
                x1="-64.5"
                y1="17.2"
                x2="-64.5"
                y2="20"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              <line
                x1="-63.5"
                y1="17.2"
                x2="-63.5"
                y2="20"
                stroke="#0f172a"
                strokeWidth="0.8"
              />
              <rect
                x="-62.7"
                y="15"
                width="0.8"
                height="1.2"
                rx="0.2"
                fill="#38bdf8"
              />
            </g>
          </g>
        )}

      </svg>
    </div>
  );
};
