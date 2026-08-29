import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Flame,
  Snowflake,
  Atom,
  Magnet,
  Zap,
  Package,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import { CargoHazardAlert, subscribeCargoAlerts } from '../utils/cargoAlerts';

const ICON_MAP = {
  flame: Flame,
  snowflake: Snowflake,
  atom: Atom,
  magnet: Magnet,
  zap: Zap,
  package: Package,
};

export const CargoHazardToastContainer: React.FC = () => {
  const [currentAlert, setCurrentAlert] = useState<CargoHazardAlert | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const queueRef = useRef<CargoHazardAlert[]>([]);
  const isProcessingRef = useRef(false);
  const dismissTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);

  const processNextInQueue = useCallback(() => {
    if (queueRef.current.length === 0) {
      isProcessingRef.current = false;
      setIsVisible(false);
      setCurrentAlert(null);
      return;
    }

    isProcessingRef.current = true;
    const next = queueRef.current.shift()!;
    setCurrentAlert(next);
    setIsVisible(true);

    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
    }
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    // Auto-dismiss after exactly 5.0 seconds
    dismissTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      transitionTimerRef.current = window.setTimeout(() => {
        processNextInQueue();
      }, 250);
    }, 5000);
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeCargoAlerts((alert) => {
      queueRef.current.push(alert);
      if (!isProcessingRef.current) {
        processNextInQueue();
      }
    });

    return () => {
      unsubscribe();
      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, [processNextInQueue]);

  const handleDismiss = () => {
    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
    }
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    setIsVisible(false);
    transitionTimerRef.current = window.setTimeout(() => {
      processNextInQueue();
    }, 200);
  };

  if (!currentAlert) return null;

  const IconComponent = ICON_MAP[currentAlert.icon] || Package;
  const isHazard = currentAlert.cargoType !== 'standard';

  return (
    <div
      id="cargo-hazard-toast-portal"
      className="fixed top-[108px] sm:top-[92px] inset-x-0 z-[90] pointer-events-none flex justify-center items-start px-3 transition-all duration-300"
    >
      <div
        id={`cargo-toast-${currentAlert.id}`}
        className={`relative flex flex-col gap-1.5 p-2.5 sm:p-3 rounded-2xl bg-slate-950/95 ${currentAlert.borderColor} border backdrop-blur-2xl shadow-2xl max-w-[94vw] sm:max-w-md w-full pointer-events-auto select-none transition-all duration-300 ease-out`}
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.95)',
          opacity: isVisible ? 1 : 0,
          boxShadow: `0 8px 30px ${currentAlert.accentColor}33`,
        }}
      >
        {/* Top Header Row: Status Badge, Title & Dismiss */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {/* Animated Icon Badge */}
            <div
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg shrink-0 flex items-center justify-center ${currentAlert.badgeBg} ${currentAlert.textColor} border ${currentAlert.borderColor} shadow-inner`}
            >
              <IconComponent className="w-3.5 h-3.5" />
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <h4 className="text-xs sm:text-sm font-bold font-mono text-slate-100 uppercase tracking-wide truncate">
                {currentAlert.title}
              </h4>
              <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-slate-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700/60">
                {currentAlert.mass}kg • {currentAlert.weightClass.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800 rounded-lg border border-white/10 transition-colors cursor-pointer shrink-0"
            title="Dismiss Alert"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Hazard Briefing Banner (Simple, Crisp Text Warning) */}
        <div
          className={`px-2.5 py-1 sm:py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono flex items-center gap-2 ${
            isHazard
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
              : 'bg-sky-950/30 border-sky-500/30 text-sky-200'
          }`}
        >
          {isHazard ? (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          )}
          <p className="font-semibold leading-tight">{currentAlert.dangerWarning}</p>
        </div>
      </div>
    </div>
  );
};
