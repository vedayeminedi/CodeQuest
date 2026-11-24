import React from 'react';
import {
  Award,
  Terminal,
  Code,
  Sparkles,
  Flame,
  Zap,
  Crown,
  Network,
  CheckCircle,
  Languages,
  Gauge,
  Target,
  Moon,
  Bot,
  FolderTree,
  Trophy,
  Lock,
} from 'lucide-react';
import { Achievement } from '../../types';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Card } from '../ui/Card';

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onClick,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Network':
        return <Network className="w-5 h-5" />;
      case 'CheckCircle':
        return <CheckCircle className="w-5 h-5" />;
      case 'Languages':
        return <Languages className="w-5 h-5" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Moon':
        return <Moon className="w-5 h-5" />;
      case 'Bot':
        return <Bot className="w-5 h-5" />;
      case 'FolderTree':
        return <FolderTree className="w-5 h-5" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getRarityColors = (rarity: Achievement['rarity'], isUnlocked: boolean) => {
    if (!isUnlocked) {
      return {
        badgeBorder: 'border-slate-800',
        iconBg: 'bg-slate-800 text-slate-500 border-slate-700/50',
      };
    }
    switch (rarity) {
      case 'Common':
        return {
          badgeBorder: 'border-slate-700 hover:border-slate-600',
          iconBg: 'bg-slate-800 text-slate-200 border-slate-600',
        };
      case 'Rare':
        return {
          badgeBorder: 'border-cyan-500/40 hover:border-cyan-500/70 shadow-cyan-950/30',
          iconBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-950/50',
        };
      case 'Epic':
        return {
          badgeBorder: 'border-purple-500/50 hover:border-purple-500/80 shadow-purple-950/40',
          iconBg: 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md shadow-purple-950/50',
        };
      case 'Legendary':
        return {
          badgeBorder: 'border-amber-500/50 hover:border-amber-400 shadow-amber-950/40',
          iconBg: 'bg-gradient-to-tr from-amber-500/30 to-rose-500/30 text-amber-300 border-amber-400/60 shadow-lg shadow-amber-950/60 animate-pulse',
        };
    }
  };

  const colors = getRarityColors(achievement.rarity, achievement.isUnlocked);

  return (
    <Card
      onClick={onClick}
      className={`relative p-5 transition-all duration-200 cursor-pointer ${colors.badgeBorder} ${
        !achievement.isUnlocked ? 'opacity-75 bg-slate-950/60' : 'bg-slate-900/80'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Badge Icon */}
        <div
          className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-transform ${colors.iconBg}`}
        >
          {achievement.isUnlocked ? getIcon(achievement.iconName) : <Lock className="w-5 h-5 text-slate-500" />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4
              className={`text-sm font-bold truncate ${
                achievement.isUnlocked ? 'text-white' : 'text-slate-400'
              }`}
            >
              {achievement.title}
            </h4>
            <Badge rarity={achievement.rarity} size="sm" />
          </div>

          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {achievement.description}
          </p>

          {/* Progress or Unlock timestamp */}
          {achievement.isUnlocked ? (
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Unlocked ({achievement.unlockedAt})
              </span>
              <span className="font-mono text-purple-300 font-bold">
                +{achievement.xpReward} XP
              </span>
            </div>
          ) : (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>
                  Progress: {achievement.currentProgress} / {achievement.maxProgress}
                </span>
                <span className="font-mono text-purple-300 font-bold">
                  +{achievement.xpReward} XP
                </span>
              </div>
              <ProgressBar
                value={achievement.currentProgress}
                max={achievement.maxProgress}
                size="sm"
                variant={achievement.rarity === 'Legendary' ? 'gradient' : 'purple'}
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
