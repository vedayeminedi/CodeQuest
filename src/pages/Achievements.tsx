import React, { useState, useEffect } from 'react';
import { Award, Sparkles, CheckCircle2, Lock, Filter, Share2 } from 'lucide-react';
import { Achievement, AchievementCategory } from '../types';
import { achievementService } from '../services/achievementService';
import { AchievementCard } from '../components/cards/AchievementCard';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const Achievements: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [category, setCategory] = useState<AchievementCategory | 'All'>('All');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/achievements?category={category}
    const loadAchievements = async () => {
      setIsLoading(true);
      try {
        const res = await achievementService.getAchievements(category);
        if (res.success) {
          setAchievements(res.data);
        }
      } catch (err) {
        console.error('Failed to load achievements:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAchievements();
  }, [category]);

  const filteredAchievements = achievements.filter((a) => {
    if (statusFilter === 'unlocked') return a.isUnlocked;
    if (statusFilter === 'locked') return !a.isUnlocked;
    return true;
  });

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalXPFromBadges = achievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, curr) => acc + curr.xpReward, 0);

  const categories: (AchievementCategory | 'All')[] = [
    'All',
    'Problem Solving',
    'Streaks',
    'Mastery',
    'Speed',
    'Community',
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            Milestone Trophies
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Badges & Achievements
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Complete milestones, demonstrate algorithmic mastery, maintain streaks, and collect exclusive rarity badges.
          </p>
        </div>

        {/* Total Badges Stat Card */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shrink-0 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-mono text-white">
                {unlockedCount} / {achievements.length}
              </span>
              <span className="text-xs text-purple-400 font-bold">
                ({Math.round((unlockedCount / (achievements.length || 1)) * 100)}%)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              +{totalXPFromBadges.toLocaleString()} XP earned from trophies
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Category Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Unlocked / Locked Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-xl self-end sm:self-auto">
          {(['all', 'unlocked', 'locked'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={() => setSelectedAchievement(achievement)}
          />
        ))}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAchievement(null)}
          title={selectedAchievement.title}
          description={`Category: ${selectedAchievement.category}`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Badge rarity={selectedAchievement.rarity} />
                <span className="text-xs text-slate-400">Rarity Tier</span>
              </div>
              <span className="font-mono font-bold text-purple-300 text-sm">
                +{selectedAchievement.xpReward} XP Reward
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedAchievement.description}
            </p>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Milestone Progress</span>
                <span className="font-mono font-bold text-white">
                  {selectedAchievement.currentProgress} / {selectedAchievement.maxProgress}
                </span>
              </div>
              <ProgressBar
                value={selectedAchievement.currentProgress}
                max={selectedAchievement.maxProgress}
                size="sm"
                variant={selectedAchievement.rarity === 'Legendary' ? 'gradient' : 'purple'}
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-500">
                {selectedAchievement.isUnlocked
                  ? `Unlocked on ${selectedAchievement.unlockedAt}`
                  : 'Locked · Complete criteria to unlock'}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAchievement(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
