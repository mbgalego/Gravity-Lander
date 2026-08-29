import React, { useState, useEffect } from 'react';
import {
  GAME_VERSION_HISTORY,
  CURRENT_GAME_VERSION,
  VersionRelease,
} from '../utils/versionHistory';
import { sound } from '../game/sound';
import {
  History,
  X,
  Sparkles,
  Zap,
  Flame,
  Sliders,
  Radio,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<string>(CURRENT_GAME_VERSION);

  useEffect(() => {
    if (isOpen) {
      sound.playLandingChime();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentRelease =
    GAME_VERSION_HISTORY.find((v) => v.version === selectedVersion) ||
    GAME_VERSION_HISTORY[0];

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'physics':
        return <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
      case 'missions':
        return <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'editor':
        return <Sliders className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'audio':
        return <Radio className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      case 'system':
      default:
        return <Rocket className="w-3.5 h-3.5 text-teal-400 shrink-0" />;
    }
  };

  return (
    <div
      id="version-history-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="version-history-modal"
        className="w-full max-w-2xl bg-slate-950/95 border border-sky-400/30 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 text-left my-auto backdrop-blur-2xl text-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sky-500/15 border border-sky-400/40 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <History className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  VERSION HISTORY & CHANGELOG
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 border border-sky-400/40 text-sky-300">
                  {CURRENT_GAME_VERSION}
                </span>
              </div>
              <p className="text-[11px] font-sans text-slate-400">
                Tracking flight engine updates, map revisions, and physical improvements
              </p>
            </div>
          </div>

          <button
            id="btn-close-version-history"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Close Version History"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Version Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/10 shrink-0">
          {GAME_VERSION_HISTORY.map((rel) => {
            const isSelected = rel.version === selectedVersion;
            return (
              <button
                key={rel.version}
                type="button"
                onClick={() => {
                  setSelectedVersion(rel.version);
                  sound.playLandingChime();
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs transition-all whitespace-nowrap cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/60 text-white font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <span>{rel.version}</span>
                {rel.tag && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[9px] font-mono font-bold border ${
                      rel.tagColor || 'bg-slate-800 text-slate-300 border-white/10'
                    }`}
                  >
                    {rel.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Version Details */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin scrollbar-thumb-white/10 text-xs">
          
          {/* Release Overview Banner */}
          <div className="p-3.5 bg-slate-900/70 rounded-2xl border border-sky-400/20 space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-sky-300">
                  {currentRelease.version}
                </span>
                <span className="text-slate-500">•</span>
                <span className="font-sans font-bold text-white text-sm">
                  {currentRelease.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">
                {currentRelease.releaseDate}
              </span>
            </div>
            <p className="font-sans text-slate-300 text-xs leading-relaxed">
              {currentRelease.summary}
            </p>
          </div>

          {/* Categorized Changes */}
          <div className="space-y-3">
            {currentRelease.categories.map((cat, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-900/40 rounded-xl border border-white/5 space-y-2"
              >
                <div className="flex items-center gap-2 font-mono font-bold text-slate-200 text-xs uppercase tracking-wider">
                  {getCategoryIcon(cat.iconType)}
                  <span>{cat.name}</span>
                </div>

                <ul className="space-y-1.5 pl-1">
                  {cat.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2 text-slate-300 font-sans text-xs leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400/80 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between shrink-0">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Gravity Lander v1.3.0 Engine</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
