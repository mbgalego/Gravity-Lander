import React, { useEffect, useState, useRef } from 'react';
import {
  Trophy,
  Flame,
  Shield,
  Zap,
  Package,
  Truck,
  Star,
  Feather,
  Sparkles,
  Award,
} from 'lucide-react';
import { Achievement, subscribeAchievements } from '../utils/achievements';

const ICON_MAP = {
  trophy: Trophy,
  flame: Flame,
  shield: Shield,
  zap: Zap,
  package: Package,
  truck: Truck,
  star: Star,
  feather: Feather,
  sparkles: Sparkles,
  award: Award,
};

const ACCENT_STYLES = {
  emerald: {
    border: 'border-emerald-500/40',
    iconText: 'text-emerald-400',
    iconBg: 'bg-emerald-500/20 border-emerald-400/30',
    tagText: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
  },
  amber: {
    border: 'border-amber-500/40',
    iconText: 'text-amber-400',
    iconBg: 'bg-amber-500/20 border-amber-400/30',
    tagText: 'text-amber-400',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  sky: {
    border: 'border-sky-500/40',
    iconText: 'text-sky-400',
    iconBg: 'bg-sky-500/20 border-sky-400/30',
    tagText: 'text-sky-400',
    glow: 'shadow-[0_0_20px_rgba(14,165,233,0.15)]',
  },
  purple: {
    border: 'border-purple-500/40',
    iconText: 'text-purple-400',
    iconBg: 'bg-purple-500/20 border-purple-400/30',
    tagText: 'text-purple-400',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  teal: {
    border: 'border-teal-500/40',
    iconText: 'text-teal-400',
    iconBg: 'bg-teal-500/20 border-teal-400/30',
    tagText: 'text-teal-400',
    glow: 'shadow-[0_0_20px_rgba(20,184,166,0.15)]',
  },
};

export const AchievementToastContainer: React.FC = () => {
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const queueRef = useRef<Achievement[]>([]);
  const isProcessingRef = useRef(false);
  const dismissTimerRef = useRef<number | null>(null);

  const processNextInQueue = () => {
    if (queueRef.current.length === 0) {
      isProcessingRef.current = false;
      setIsVisible(false);
      setCurrentToast(null);
      return;
    }

    isProcessingRef.current = true;
    const next = queueRef.current.shift()!;
    setCurrentToast(next);
    setIsVisible(true);

    if (dismissTimerRef.current) {
      window.clearTimeout(dismissTimerRef.current);
    }

    // Auto-dismiss after 3.2 seconds
    dismissTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        processNextInQueue();
      }, 250);
    }, 3200);
  };

  useEffect(() => {
    const unsubscribe = subscribeAchievements((achievement) => {
      queueRef.current.push(achievement);
      if (!isProcessingRef.current) {
        processNextInQueue();
      }
    });

    return () => {
      unsubscribe();
      if (dismissTimerRef.current) {
        window.clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  if (!currentToast) return null;

  const IconComponent = ICON_MAP[currentToast.icon] || Trophy;
  const style = ACCENT_STYLES[currentToast.accentColor] || ACCENT_STYLES.amber;

  return (
    <div
      id="achievement-toast-portal"
      className="fixed top-3 sm:top-4 inset-x-0 z-[100] pointer-events-none flex justify-center items-start px-3"
    >
      <div
        id={`toast-${currentToast.id}`}
        className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-950/90 ${style.border} ${style.glow} border backdrop-blur-xl shadow-2xl max-w-[92vw] sm:max-w-xs select-none transition-all duration-300 ease-out`}
        style={{
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(-14px) scale(0.94)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Compact Icon */}
        <div
          className={`w-7 h-7 rounded-xl shrink-0 flex items-center justify-center ${style.iconBg} ${style.iconText} border shadow-inner`}
        >
          <IconComponent className="w-3.5 h-3.5" />
        </div>

        {/* Minimalist Text Details */}
        <div className="flex-1 min-w-0 pr-0.5">
          <div className="flex items-center gap-1">
            <Sparkles className={`w-2.5 h-2.5 ${style.tagText}`} />
            <span
              className={`font-mono text-[8.5px] font-bold tracking-widest uppercase ${style.tagText}`}
            >
              MILESTONE
            </span>
          </div>
          <div className="font-mono font-bold text-slate-100 text-xs tracking-wide truncate">
            {currentToast.title}
          </div>
          <p className="text-slate-400 text-[10px] font-sans leading-tight truncate">
            {currentToast.description}
          </p>
        </div>
      </div>
    </div>
  );
};
