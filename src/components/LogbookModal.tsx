import React, { useState, useMemo, useRef } from 'react';
import { PlanetConfig } from '../types';
import { PLANETS } from '../game/planets';
import { convertCustomMapToPlanet } from '../game/customMapConverter';
import { getSavedCustomMaps } from '../utils/customMapsStorage';
import { getPlanetRecord, getWorldSummary, getStoredScores, canonicalPlanetId, WorldSummary, PlanetRecord } from '../utils/scoreStorage';
import { getAllMedals, getMedalColorClass, getMedalBadgeClass, Medal } from '../utils/medals';
import { PlanetGraphic } from './PlanetGraphic';
import { X, Award, Package, Truck, Clock, Star, Heart, Trophy, MapPin, Sparkles, BookOpen, Target, ChevronLeft, ChevronRight } from 'lucide-react';

interface LogbookModalProps { isOpen: boolean; onClose: () => void; }

function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
}
function getMissionRecordExists(planetId: string): boolean {
  return (getPlanetRecord(canonicalPlanetId(planetId)).completedCount || 0) > 0;
}
function formatDate(isoString: string): string {
  try { return new Date(isoString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return 'Unknown'; }
}
function getRank(score: number | null, highScore: number | null): string {
  if (!score || !highScore) return '—';
  const pct = score / highScore;
  if (pct >= 0.95) return 'S';
  if (pct >= 0.85) return 'A';
  if (pct >= 0.7) return 'B';
  if (pct >= 0.55) return 'C';
  return 'D';
}
const rankColors: Record<string, string> = {
  S: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
  A: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40',
  B: 'text-sky-400 border-sky-500/40 bg-sky-950/40',
  C: 'text-amber-400 border-amber-500/40 bg-amber-950/40',
  D: 'text-slate-400 border-slate-500/40 bg-slate-950/40',
  '—': 'text-slate-500 border-slate-600/40 bg-slate-900/40',
};

export const LogbookModal: React.FC<LogbookModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const allMedals = useMemo(() => getAllMedals(), []);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Build the world list fresh every time the modal opens:
  // official PLANETS + any saved custom maps the player has flown.
  const worldEntries = useMemo(() => {
    const entries: Array<{ planet: PlanetConfig; record: PlanetRecord }> = PLANETS.map(p => ({
      planet: p,
      record: getPlanetRecord(p.id),
    }));
    const seenIds = new Set(PLANETS.map(p => p.id));
    for (const custom of getSavedCustomMaps()) {
      const planet = convertCustomMapToPlanet(custom);
      const canonId = canonicalPlanetId(planet.id);
      // Only list custom maps the player has actually flown (avoid cluttering
      // the Logbook with untouched official defaults / starter templates).
      if (!getMissionRecordExists(canonId)) continue;
      if (seenIds.has(canonId)) continue;
      seenIds.add(canonId);
      entries.push({ planet: { ...planet, id: canonId }, record: getPlanetRecord(canonId) });
    }
    return entries;
  }, [isOpen, activeTab, allMedals]);

  const worldSummary = useMemo(
    () => getWorldSummary(worldEntries.map(w => ({ id: w.planet.id, name: w.planet.name }))),
    [worldEntries]
  );

  // Aggregate which medals have ever been earned across all worlds.
  const earnedMedalIds = useMemo(() => {
    const set = new Set<string>();
    const scores = getStoredScores();
    for (const rec of Object.values(scores)) {
      for (const medalId of Object.keys(rec.medalsEarned || {})) {
        set.add(medalId);
      }
    }
    return set;
  }, [isOpen, activeTab, worldSummary]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'all', label: 'All Worlds', planet: null as PlanetConfig | null },
    ...worldEntries.map(w => ({ id: w.planet.id, label: w.planet.name.replace(/\s*\(Custom Edition\)/gi, '').replace(/^Custom:\s*/i, ''), planet: w.planet })),
  ];

  const goToTab = (dir: number) => {
    const idx = tabs.findIndex(t => t.id === activeTab);
    const next = idx + dir;
    if (next >= 0 && next < tabs.length) setActiveTab(tabs[next].id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    touchEndX.current = null;
    touchEndY.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchEndX.current = t.clientX;
    touchEndY.current = t.clientY;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null || touchStartY.current === null || touchEndY.current === null) return;
    const dx = touchEndX.current - touchStartX.current;
    const dy = touchEndY.current - touchStartY.current;
    // Horizontal swipe only (avoid clashing with vertical page scroll)
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) {
      if (dx < 0) goToTab(1);   // swipe left -> next tab
      else goToTab(-1);         // swipe right -> previous tab
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') goToTab(1);
    if (e.key === 'ArrowLeft') goToTab(-1);
  };

  return (
    <div id="logbook-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200" onKeyDown={handleKeyDown} role="dialog" aria-modal="true" aria-label="Mission Logbook">
      <div className="w-full max-w-4xl max-h-[90vh] bg-slate-950/95 border border-sky-400/30 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col animate-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-4 border-b border-white/10 sticky top-0 bg-slate-950/95 backdrop-blur-xl z-10 rounded-t-2xl">
          <h2 className="text-lg sm:text-xl font-mono font-bold text-sky-300 flex items-center gap-2"><BookOpen className="w-5 h-5" /> MISSION LOGBOOK</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close Logbook"><X className="w-5 h-5" /></button>
        </div>
        <div className="flex gap-1 p-2 border-b border-white/5 overflow-x-auto scrollbar-hide flex-shrink-0" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={isActive} aria-controls={`panel-${tab.id}`} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-mono font-medium whitespace-nowrap shrink-0 transition-all ${isActive ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
              {tab.planet ? <PlanetGraphic planet={tab.planet} size={18} showGlow={false} /> : <MapPin className="w-3.5 h-3.5 shrink-0" />}
              <span>{tab.label}</span>
            </button>;
          })}
        </div>
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          role="tabpanel"
          id={`panel-${activeTab}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {activeTab === 'all' ? (
            <AllWorldsPanel summary={worldSummary} medals={allMedals} earnedMedalIds={earnedMedalIds} />
          ) : (() => {
            const w = worldEntries.find(r => r.planet.id === activeTab);
            return w ? <PlanetPanel planet={w.planet} record={w.record} medals={allMedals} /> : null;
          })()}
        </div>
        <div className="p-3 border-t border-white/10 bg-slate-900/50 rounded-b-2xl">
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-[11px] font-mono text-slate-400">
            <button
              type="button"
              onClick={() => goToTab(-1)}
              disabled={activeTab === tabs[0].id}
              className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-default"
              aria-label="Previous world"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="flex items-center gap-1"><Trophy className="w-3 h-3" />{worldSummary.uniqueMedalsCount}/{allMedals.length} Unique</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3" />{worldSummary.totalMedalsCount} Earned</span>
            <span className="flex items-center gap-1"><Package className="w-3 h-3" />{worldSummary.totalCargoCollected}</span>
            <span className="flex items-center gap-1"><Truck className="w-3 h-3" />{worldSummary.totalRoversCollected}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatTime(worldSummary.totalFlightTimeSec)}</span>
            <button
              type="button"
              onClick={() => goToTab(1)}
              disabled={activeTab === tabs[tabs.length - 1].id}
              className="p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-default"
              aria-label="Next world"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function AllWorldsPanel({ summary, medals, earnedMedalIds }: { summary: WorldSummary; medals: Medal[]; earnedMedalIds: Set<string> }) {
  return (
    <div className="space-y-6">
      {summary.totalLandings === 0 && (
        <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-950/30 text-sky-300 text-sm font-mono text-center">
          No missions recorded yet — complete a soft landing on any world to log your stats, medals &amp; records here.
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard icon={Trophy} label="Total Landings" value={summary.totalLandings} color="amber" />
        <StatCard icon={Clock} label="Est. Flight Time" value={formatTime(summary.totalFlightTimeSec)} color="sky" />
        <StatCard icon={Package} label="Cargo Collected" value={summary.totalCargoCollected} color="amber" />
        <StatCard icon={Truck} label="Rovers Collected" value={summary.totalRoversCollected} color="teal" />
        <StatCard icon={Star} label="Unique Medals" value={`${summary.uniqueMedalsCount}/${medals.length}`} color="purple" />
        <StatCard icon={Sparkles} label="Total Medals" value={summary.totalMedalsCount} color="rose" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {summary.favoritePlanet && <HighlightCard icon={Heart} title="Favorite World" value={summary.favoritePlanet.name} subtitle={`${summary.favoritePlanet.landings} landings`} color="rose" />}
        {summary.firstLandingOverall && <HighlightCard icon={MapPin} title="First Touchdown" value={summary.firstLandingOverall.planetId.toUpperCase()} subtitle={formatDate(summary.firstLandingOverall.date)} color="sky" />}
        {summary.bestOverallScore && <HighlightCard icon={Trophy} title="Best Score" value={summary.bestOverallScore.score.toLocaleString()} subtitle={`On ${summary.bestOverallScore.planetId.toUpperCase()}`} color="amber" />}
      </div>
      <div>
        <h3 className="text-sm font-mono font-bold text-slate-300 mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-400" /> MEDAL COLLECTION</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {medals.map(m => <MedalBadge key={m.id} medal={m} earned={earnedMedalIds.has(m.id)} compact />)}
        </div>
      </div>
    </div>
  );
}

function PlanetPanel({ planet, record, medals }: { planet: PlanetConfig; record: ReturnType<typeof getPlanetRecord>; medals: Medal[] }) {
  const rank = getRank(record.highScore, record.highScore);
  const earnedMedalIds = new Set(Object.keys(record.medalsEarned || {}));
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 p-4 bg-slate-900/50 border border-white/5 rounded-xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center shrink-0"><PlanetGraphic planet={planet} size={72} showGlow={true} /></div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-mono font-bold text-white truncate">{planet.name}</h3>
          <div className="flex items-center gap-2 mt-1 text-xs font-mono"><span className={`px-2 py-0.5 rounded ${getDifficultyColor(planet.difficulty)}`}>{planet.difficulty.toUpperCase()}</span><span className="text-slate-500">•</span><span className="text-slate-400">{planet.category}</span></div>
        </div>
        <div className="text-right shrink-0"><div className={`text-3xl font-mono font-extrabold ${rankColors[rank] || rankColors['—']} px-4 py-1 rounded-xl`}>{rank}</div><div className="text-[10px] font-mono text-slate-500 mt-1">RANK</div></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Trophy} label="Best Score" value={record.highScore?.toLocaleString() || '—'} color="amber" />
        <StatCard icon={Clock} label="Best Time" value={record.bestTime ? `${record.bestTime.toFixed(1)}s` : '—'} color="sky" />
        <StatCard icon={Award} label="Landings" value={record.completedCount} color="emerald" />
        <StatCard icon={Sparkles} label="Medals" value={Object.keys(record.medalsEarned || {}).length} color="purple" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Package} label="Total Cargo" value={record.totalCargoCollected} color="amber" />
        <StatCard icon={Truck} label="Total Rovers" value={record.totalRoversCollected} color="teal" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {record.firstLandingDate && <StatCard icon={MapPin} label="First Landing" value={formatDate(record.firstLandingDate)} color="sky" />}
        {record.lastPlayedDate && <StatCard icon={Clock} label="Last Played" value={formatDate(record.lastPlayedDate)} color="slate" />}
      </div>
      <div><h3 className="text-sm font-mono font-bold text-slate-300 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> MEDALS EARNED</h3><div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">{medals.map(m => <MedalBadge key={m.id} medal={m} earned={earnedMedalIds.has(m.id)} count={record.medalsEarned?.[m.id] || 0} />)}</div></div>
      <div><h3 className="text-sm font-mono font-bold text-slate-300 mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-sky-400" /> PERSONAL BESTS</h3><div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><PersonalBestCard label="Min Fuel Used" value="—" /><PersonalBestCard label="Min Time" value={record.bestTime ? `${record.bestTime.toFixed(1)}s` : '—'} /><PersonalBestCard label="Max Cargo" value="—" /><PersonalBestCard label="Max Rovers" value="—" /></div></div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = { amber: 'border-amber-500/30 bg-amber-950/30 text-amber-300', sky: 'border-sky-500/30 bg-sky-950/30 text-sky-300', emerald: 'border-emerald-500/30 bg-emerald-950/30 text-emerald-300', teal: 'border-teal-500/30 bg-teal-950/30 text-teal-300', purple: 'border-purple-500/30 bg-purple-950/30 text-purple-300', rose: 'border-rose-500/30 bg-rose-950/30 text-rose-300', slate: 'border-slate-500/30 bg-slate-950/30 text-slate-300' };
  const cls = colors[color] || colors.slate;
  return <div className={`p-3 rounded-xl border ${cls}`}><div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 mb-1"><Icon className="w-3 h-3" /><span>{label.toUpperCase()}</span></div><div className="text-lg sm:text-xl font-mono font-bold">{value}</div></div>;
}
function HighlightCard({ icon: Icon, title, value, subtitle, color }: { icon: React.ComponentType<{ className?: string }>; title: string; value: string; subtitle: string; color: string }) {
  const colors: Record<string, string> = { amber: 'border-amber-500/30 bg-amber-950/30', sky: 'border-sky-500/30 bg-sky-950/30', emerald: 'border-emerald-500/30 bg-emerald-950/30', teal: 'border-teal-500/30 bg-teal-950/30', purple: 'border-purple-500/30 bg-purple-950/30', rose: 'border-rose-500/30 bg-rose-950/30', slate: 'border-slate-500/30 bg-slate-950/30' };
  const cls = colors[color] || colors.slate;
  return <div className={`p-4 rounded-xl border ${cls}`}><div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mb-1"><Icon className="w-3 h-3" /><span>{title.toUpperCase()}</span></div><div className="text-lg font-mono font-bold text-white">{value}</div><div className="text-xs text-slate-400">{subtitle}</div></div>;
}
function MedalBadge({ medal, earned, count = 0, compact = false }: { medal: Medal; earned: boolean; count?: number; compact?: boolean }) {
  const Icon = medal.icon; const colorClass = earned ? getMedalColorClass(medal.color) : 'border-slate-600/30 bg-slate-900/30 text-slate-500'; const badgeClass = earned ? getMedalBadgeClass(medal.color) : 'bg-slate-800/50 text-slate-500 border-slate-600/30';
  return <div className={`group relative p-2.5 rounded-xl border transition-all ${colorClass}`} title={earned ? `${medal.title} — ${medal.description}${count > 1 ? ` (×${count})` : ''}` : `Locked: ${medal.description}`}><div className="flex items-center justify-center"><Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${earned ? '' : 'opacity-30'}`} /></div>{!compact && earned && count > 1 && <div className={`absolute -top-1 -right-1 ${badgeClass} text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full`}>×{count}</div>}{!compact && <div className="mt-1.5 text-[10px] font-mono text-center text-slate-500 line-clamp-1 px-1">{medal.title}</div>}</div>;
}
function PersonalBestCard({ label, value }: { label: string; value: string }) { return <div className="p-3 rounded-xl border border-slate-700/50 bg-slate-900/50"><div className="text-[10px] font-mono text-slate-500 mb-1">{label.toUpperCase()}</div><div className="text-sm font-mono font-bold text-slate-300">{value}</div></div>; }
function getDifficultyColor(difficulty: string): string { switch (difficulty.toLowerCase()) { case 'trivial': return 'bg-emerald-900/40 text-emerald-300 border-emerald-500/30'; case 'easy': return 'bg-sky-900/40 text-sky-300 border-sky-500/30'; case 'moderate': return 'bg-amber-900/40 text-amber-300 border-amber-500/30'; case 'hard': return 'bg-orange-900/40 text-orange-300 border-orange-500/30'; case 'extreme': return 'bg-rose-900/40 text-rose-300 border-rose-500/30'; default: return 'bg-slate-800/40 text-slate-300 border-slate-500/30'; } }
