import React, { useState, useRef, useEffect, useCallback } from 'react';

interface TouchControlsProps {
  onLeftThrusterChange: (active: boolean) => void;
  onRightThrusterChange: (active: boolean) => void;
  isLeftActive: boolean;
  isRightActive: boolean;
  disabled?: boolean;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
  side: 'left' | 'right';
}

export const TouchControls: React.FC<TouchControlsProps> = ({
  onLeftThrusterChange,
  onRightThrusterChange,
  isLeftActive,
  isRightActive,
  disabled = false,
}) => {
  // Track active pointer IDs on left vs right side of the screen
  const activePointers = useRef<Map<number, 'left' | 'right'>>(new Map());
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const rippleCounter = useRef<number>(0);

  const updateThrusterStates = useCallback(() => {
    let hasLeft = false;
    let hasRight = false;
    activePointers.current.forEach((side) => {
      if (side === 'left') hasLeft = true;
      if (side === 'right') hasRight = true;
    });

    onLeftThrusterChange(hasLeft);
    onRightThrusterChange(hasRight);
  }, [onLeftThrusterChange, onRightThrusterChange]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const midX = rect.width / 2;
    const touchX = e.clientX - rect.left;
    const touchY = e.clientY - rect.top;

    const side: 'left' | 'right' = touchX < midX ? 'left' : 'right';
    activePointers.current.set(e.pointerId, side);

    // Subtle momentary ripple feedback
    const rippleId = ++rippleCounter.current;
    setRipples((prev) => [...prev.slice(-4), { id: rippleId, x: e.clientX, y: e.clientY, side }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId));
    }, 450);

    updateThrusterStates();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || !activePointers.current.has(e.pointerId)) return;
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const midX = rect.width / 2;
    const touchX = e.clientX - rect.left;

    const side: 'left' | 'right' = touchX < midX ? 'left' : 'right';
    if (activePointers.current.get(e.pointerId) !== side) {
      activePointers.current.set(e.pointerId, side);
      updateThrusterStates();
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointers.current.has(e.pointerId)) {
      activePointers.current.delete(e.pointerId);
      updateThrusterStates();
    }
  };

  // Reset when disabled changes or unmounts
  useEffect(() => {
    if (disabled) {
      activePointers.current.clear();
      onLeftThrusterChange(false);
      onRightThrusterChange(false);
    }
  }, [disabled, onLeftThrusterChange, onRightThrusterChange]);

  return (
    <div
      id="invisible-touch-zones"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      className="absolute inset-0 w-full h-full select-none touch-none pointer-events-auto z-10"
      style={{ WebkitUserSelect: 'none', touchAction: 'none' }}
    >
      {/* Dynamic Touch Position Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none rounded-full animate-ping -translate-x-1/2 -translate-y-1/2"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 70,
            height: 70,
            backgroundColor: ripple.side === 'left' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(45, 212, 191, 0.25)',
            border: `1.5px solid ${ripple.side === 'left' ? 'rgba(56, 189, 248, 0.6)' : 'rgba(45, 212, 191, 0.6)'}`,
          }}
        />
      ))}
    </div>
  );
};
