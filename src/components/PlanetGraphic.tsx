import React, { useMemo } from 'react';
import { PlanetConfig } from '../types';

interface PlanetGraphicProps {
  planet: PlanetConfig;
  size?: number; // pixel width/height (default: 48)
  className?: string;
  showGlow?: boolean;
}

export const PlanetGraphic: React.FC<PlanetGraphicProps> = ({
  planet,
  size = 48,
  className = '',
  showGlow = true,
}) => {
  const planetId = planet.id;

  // Generate deterministic visual characteristics from planet ID and seed
  const customSeed = useMemo(() => {
    let hash = planet.seed || 12345;
    for (let i = 0; i < (planet.name || '').length; i++) {
      hash = (hash * 31 + planet.name.charCodeAt(i)) & 0xffffff;
    }
    return Math.abs(hash);
  }, [planet.seed, planet.name]);

  // Generate unique stable deterministic craters, rings, bands, continents
  const visualTraits = useMemo(() => {
    const seed = customSeed;

    // Has rings? (e.g. 50% of custom maps get majestic rings, plus specific official worlds)
    const hasRings = planetId === 'titan' || planetId === 'vespera' || (planetId.startsWith('custom') && seed % 2 === 0);
    const ringAngle = -15 - (seed % 25);
    const ringRadiusX = 54 + (seed % 8);
    const ringRadiusY = 12 + (seed % 6);
    const ringWidth = 1.6 + ((seed % 10) / 10);

    // Craters & impact spots
    const craterCount = 4 + (seed % 4);
    const craters = [];
    for (let i = 0; i < craterCount; i++) {
      const angle = (seed * (i + 1) * 43) % 360;
      const dist = 0.15 + (((seed * (i + 2) * 23) % 60) / 100) * 0.45;
      const r = 2.2 + (((seed * (i + 4) * 29) % 50) / 100) * 4.2;
      const cx = 50 + Math.cos((angle * Math.PI) / 180) * dist * 38;
      const cy = 50 + Math.sin((angle * Math.PI) / 180) * dist * 38;
      craters.push({ cx, cy, r });
    }

    // Atmospheric Storm Eye
    const hasStorm = seed % 3 === 0;
    const stormX = 42 + (seed % 24);
    const stormY = 38 + ((seed * 7) % 28);
    const stormRx = 6 + (seed % 4);
    const stormRy = 3.5 + (seed % 3);

    // Cloud / Mineral Band paths
    const bandY1 = 28 + (seed % 12);
    const bandY2 = 48 + ((seed * 3) % 12);
    const bandY3 = 68 + ((seed * 5) % 12);

    return {
      hasRings,
      ringAngle,
      ringRadiusX,
      ringRadiusY,
      ringWidth,
      craters,
      hasStorm,
      stormX,
      stormY,
      stormRx,
      stormRy,
      bandY1,
      bandY2,
      bandY3,
    };
  }, [customSeed, planetId]);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Atmospheric Glow Halo */}
      {showGlow && (
        <div
          className="absolute inset-0 rounded-full blur-md opacity-75 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle, ${planet.theme.glowColor || planet.theme.terrainAccent} 0%, rgba(0,0,0,0) 70%)`,
          }}
        />
      )}

      {/* SVG Celestial Body */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md relative z-10 overflow-visible"
      >
        <defs>
          {/* 3D Spherical Surface Shading */}
          <radialGradient
            id={`sphere-light-${planetId}`}
            cx="30%"
            cy="26%"
            r="70%"
            fx="26%"
            fy="22%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="72%" stopColor="#000000" stopOpacity="0.60" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </radialGradient>

          {/* Atmospheric Rayleigh Scattering Rim */}
          <radialGradient id={`atmo-rim-${planetId}`} cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor={planet.theme.terrainAccent} stopOpacity="0" />
            <stop offset="93%" stopColor={planet.theme.terrainAccent} stopOpacity="0.60" />
            <stop offset="100%" stopColor={planet.theme.terrainBorder} stopOpacity="0.90" />
          </radialGradient>

          {/* Custom Planet Base Shaders */}
          <radialGradient id={`custom-base-${planetId}`} cx="34%" cy="30%" r="66%">
            <stop offset="0%" stopColor={planet.theme.terrainAccent} />
            <stop offset="45%" stopColor={planet.theme.terrainBorder} />
            <stop offset="82%" stopColor={planet.theme.terrainFill} />
            <stop offset="100%" stopColor="#030712" />
          </radialGradient>

          {/* Specific Official Planet Surface Shaders */}
          {planetId === 'luna' && (
            <radialGradient id="luna-base" cx="40%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="60%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </radialGradient>
          )}

          {planetId === 'ares' && (
            <radialGradient id="ares-base" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="85%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#431407" />
            </radialGradient>
          )}

          {planetId === 'titan' && (
            <radialGradient id="titan-base" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="45%" stopColor="#0d9488" />
              <stop offset="80%" stopColor="#115e59" />
              <stop offset="100%" stopColor="#042f2e" />
            </radialGradient>
          )}

          {planetId === 'ceres' && (
            <radialGradient id="ceres-base" cx="38%" cy="32%" r="60%">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="50%" stopColor="#9333ea" />
              <stop offset="85%" stopColor="#581c87" />
              <stop offset="100%" stopColor="#2e1065" />
            </radialGradient>
          )}

          {planetId === 'vespera' && (
            <radialGradient id="vespera-base" cx="35%" cy="28%" r="65%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="40%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#6b21a8" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>
          )}

          {planetId === 'glacies' && (
            <radialGradient id="glacies-base" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="80%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>
          )}

          {/* Clip path to planet sphere */}
          <clipPath id={`planet-clip-${planetId}`}>
            <circle cx="50" cy="50" r="45" />
          </clipPath>
        </defs>

        {/* Back portion of Planetary Rings (rendered behind planet sphere) */}
        {visualTraits.hasRings && (
          <ellipse
            cx="50"
            cy="50"
            rx={visualTraits.ringRadiusX}
            ry={visualTraits.ringRadiusY}
            fill="none"
            stroke={planet.theme.terrainAccent}
            strokeWidth={visualTraits.ringWidth}
            opacity="0.5"
            transform={`rotate(${visualTraits.ringAngle} 50 50)`}
          />
        )}

        {/* Planet Base Body */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={
            planetId === 'luna'
              ? 'url(#luna-base)'
              : planetId === 'ares'
              ? 'url(#ares-base)'
              : planetId === 'titan'
              ? 'url(#titan-base)'
              : planetId === 'ceres'
              ? 'url(#ceres-base)'
              : planetId === 'vespera'
              ? 'url(#vespera-base)'
              : planetId === 'glacies'
              ? 'url(#glacies-base)'
              : `url(#custom-base-${planetId})`
          }
        />

        {/* Clipped Planetary Surface Features */}
        <g clipPath={`url(#planet-clip-${planetId})`}>
          {/* LUNA FEATURES */}
          {planetId === 'luna' && (
            <>
              <path d="M32 30 Q44 24 54 34 Q58 48 48 56 Q36 58 30 46 Z" fill="#475569" opacity="0.55" />
              <path d="M58 52 Q72 46 76 60 Q70 74 56 70 Q50 62 58 52 Z" fill="#334155" opacity="0.6" />
              <path d="M22 60 Q34 54 36 68 Q28 78 18 72 Z" fill="#475569" opacity="0.45" />
              {[
                { cx: 38, cy: 38, r: 6 },
                { cx: 62, cy: 32, r: 4.5 },
                { cx: 48, cy: 68, r: 7.5 },
                { cx: 26, cy: 48, r: 3.5 },
                { cx: 68, cy: 58, r: 5 },
              ].map((c, i) => (
                <g key={i}>
                  <circle cx={c.cx} cy={c.cy} r={c.r} fill="#1e293b" opacity="0.75" />
                  <path
                    d={`M${c.cx - c.r} ${c.cy} A ${c.r} ${c.r} 0 0 1 ${c.cx} ${c.cy - c.r}`}
                    stroke="#f8fafc"
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.8"
                  />
                </g>
              ))}
            </>
          )}

          {/* ARES FEATURES */}
          {planetId === 'ares' && (
            <>
              <ellipse cx="50" cy="9" rx="19" ry="7" fill="#f8fafc" opacity="0.92" />
              <path d="M20 46 Q38 42 55 49 T82 45" stroke="#431407" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.8" />
              <path d="M24 28 Q36 22 45 30 Q38 38 26 36 Z" fill="#7c2d12" opacity="0.5" />
              <path d="M52 64 Q70 58 74 74 Q58 84 46 76 Z" fill="#431407" opacity="0.6" />
            </>
          )}

          {/* TITAN FEATURES */}
          {planetId === 'titan' && (
            <>
              <path d="M34 22 Q48 16 58 24 Q52 34 38 32 Z" fill="#042f2e" opacity="0.85" />
              <path d="M58 32 Q74 26 80 38 Q70 48 56 42 Z" fill="#042f2e" opacity="0.8" />
              <path d="M5 40 Q45 36 95 42" stroke="#2dd4bf" strokeWidth="5" opacity="0.4" fill="none" />
              <path d="M5 60 Q50 56 95 62" stroke="#14b8a6" strokeWidth="4" opacity="0.45" fill="none" />
            </>
          )}

          {/* CERES FEATURES */}
          {planetId === 'ceres' && (
            <>
              <path d="M20 25 L45 15 L70 30 L55 55 L25 45 Z" fill="#4c1d95" opacity="0.4" />
              <circle cx="48" cy="42" r="7" fill="#1e1b4b" />
              <circle cx="48" cy="42" r="3.5" fill="#ffffff" opacity="0.95" />
              <circle cx="68" cy="28" r="2.2" fill="#ffffff" opacity="0.9" />
            </>
          )}

          {/* VESPERA FEATURES */}
          {planetId === 'vespera' && (
            <>
              <path d="M5 28 Q45 22 95 30" stroke="#c084fc" strokeWidth="5" opacity="0.55" fill="none" />
              <path d="M5 45 Q50 38 95 48" stroke="#e879f9" strokeWidth="6" opacity="0.5" fill="none" />
              <path d="M5 64 Q45 58 95 66" stroke="#9333ea" strokeWidth="5.5" opacity="0.6" fill="none" />
              <ellipse cx="64" cy="46" rx="9" ry="5.5" fill="#f43f5e" opacity="0.8" />
              <ellipse cx="64" cy="46" rx="5" ry="3" fill="#fda4af" opacity="0.95" />
            </>
          )}

          {/* GLACIES FEATURES */}
          {planetId === 'glacies' && (
            <>
              <ellipse cx="50" cy="8" rx="24" ry="8" fill="#ffffff" opacity="0.95" />
              <path d="M12 36 Q42 30 88 38" stroke="#bae6fd" strokeWidth="3" opacity="0.6" fill="none" />
              <path d="M18 58 Q48 52 82 62" stroke="#7dd3fc" strokeWidth="4" opacity="0.5" fill="none" />
              <path d="M24 76 Q54 70 78 78" stroke="#38bdf8" strokeWidth="3.5" opacity="0.4" fill="none" />
            </>
          )}

          {/* UNIQUE PROCEDURAL / CUSTOM MAP SURFACE RENDERING */}
          {!['luna', 'ares', 'titan', 'ceres', 'vespera', 'glacies'].includes(planetId) && (
            <>
              {/* Dynamic Atmospheric Flow Bands */}
              <path
                d={`M 5 ${visualTraits.bandY1} Q 48 ${visualTraits.bandY1 - 6} 95 ${visualTraits.bandY1 + 4}`}
                stroke={planet.theme.terrainAccent}
                strokeWidth="5"
                opacity="0.45"
                fill="none"
              />
              <path
                d={`M 5 ${visualTraits.bandY2} Q 52 ${visualTraits.bandY2 - 8} 95 ${visualTraits.bandY2 + 2}`}
                stroke={planet.theme.terrainBorder}
                strokeWidth="4.5"
                opacity="0.5"
                fill="none"
              />
              <path
                d={`M 8 ${visualTraits.bandY3} Q 50 ${visualTraits.bandY3 - 4} 92 ${visualTraits.bandY3 + 6}`}
                stroke={planet.theme.terrainAccent}
                strokeWidth="3.5"
                opacity="0.4"
                fill="none"
              />

              {/* Storm Eye Feature if present */}
              {visualTraits.hasStorm && (
                <g>
                  <ellipse
                    cx={visualTraits.stormX}
                    cy={visualTraits.stormY}
                    rx={visualTraits.stormRx}
                    ry={visualTraits.stormRy}
                    fill={planet.theme.terrainAccent}
                    opacity="0.85"
                  />
                  <ellipse
                    cx={visualTraits.stormX}
                    cy={visualTraits.stormY}
                    rx={visualTraits.stormRx * 0.55}
                    ry={visualTraits.stormRy * 0.55}
                    fill="#ffffff"
                    opacity="0.9"
                  />
                </g>
              )}

              {/* Procedural Craters & Continents */}
              {visualTraits.craters.map((c, idx) => (
                <g key={idx}>
                  <circle cx={c.cx} cy={c.cy} r={c.r} fill={planet.theme.terrainFill} opacity="0.8" />
                  <path
                    d={`M${c.cx - c.r} ${c.cy} A ${c.r} ${c.r} 0 0 1 ${c.cx} ${c.cy - c.r}`}
                    stroke={planet.theme.terrainAccent}
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.85"
                  />
                </g>
              ))}
            </>
          )}

          {/* 3D Global Spherical Lighting Overlay */}
          <circle cx="50" cy="50" r="45" fill={`url(#sphere-light-${planetId})`} />

          {/* Atmospheric Rayleigh Scattering Edge Glow */}
          <circle cx="50" cy="50" r="45" fill={`url(#atmo-rim-${planetId})`} />
        </g>

        {/* Specular Glint Reflection */}
        <ellipse
          cx="33"
          cy="25"
          rx="11"
          ry="5.5"
          transform="rotate(-26 33 25)"
          fill="#ffffff"
          opacity="0.25"
        />

        {/* Front portion of Planetary Rings (rendered over the planet sphere) */}
        {visualTraits.hasRings && (
          <ellipse
            cx="50"
            cy="50"
            rx={visualTraits.ringRadiusX + 2}
            ry={visualTraits.ringRadiusY + 1}
            fill="none"
            stroke={planet.theme.terrainBorder}
            strokeWidth={visualTraits.ringWidth * 0.8}
            opacity="0.65"
            transform={`rotate(${visualTraits.ringAngle} 50 50)`}
          />
        )}
      </svg>
    </div>
  );
};
