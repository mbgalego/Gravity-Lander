import React from 'react';
import { ShipModelConfig } from '../types';
import { renderShipHull } from '../game/shipDrawers';

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
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

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
            <canvas ref={canvasRef} width={Math.round(size*2)} height={Math.round(size*2)} style={{width:size,height:size}} className="w-full h-full relative z-10" />
    </div>
  );
};
