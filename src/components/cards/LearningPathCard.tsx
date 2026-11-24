import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Clock,
  BookOpen,
  Sparkles,
  Star,
  ArrowRight,
  Code2,
  Coffee,
  Cpu,
  Globe,
  Network,
} from 'lucide-react';
import { LearningPath } from '../../types';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface LearningPathCardProps {
  path: LearningPath;
}

export const LearningPathCard: React.FC<LearningPathCardProps> = ({ path }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Network':
        return <Network className="w-5 h-5 text-purple-400" />;
      case 'Code':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-teal-400" />;
      default:
        return <Code2 className="w-5 h-5 text-purple-400" />;
    }
  };

  const progressPercent = Math.round((path.completedLessons / path.totalLessons) * 100);

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 hover:shadow-2xl hover:shadow-purple-950/20 transition-all duration-300 flex flex-col justify-between group">
      {/* Top Banner Gradient & Icon */}
      <div className={`p-6 bg-gradient-to-br ${path.bannerGradient} border-b border-slate-800/80 relative`}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md">
            {getIcon(path.iconName)}
          </div>
          <div className="flex items-center gap-2">
            <Badge difficulty={path.difficulty} size="sm" />
            <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-full border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {path.rating}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
          {path.title}
        </h3>
        <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
          {path.description}
        </p>
      </div>

      {/* Middle Stats: Modules, Hours, XP */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <BookOpen className="w-3 h-3" />
              Modules
            </div>
            <p className="text-sm font-bold text-slate-200 mt-0.5">{path.totalModules}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3" />
              Duration
            </div>
            <p className="text-sm font-bold text-slate-200 mt-0.5">{path.estimatedHours} hrs</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Sparkles className="w-3 h-3 text-purple-400" />
              Reward
            </div>
            <p className="text-sm font-bold text-purple-300 mt-0.5">+{path.xpReward} XP</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-400">
              {path.completedLessons} / {path.totalLessons} Lessons Done
            </span>
            <span className="font-mono text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <ProgressBar value={path.completedLessons} max={path.totalLessons} size="sm" variant="purple" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {path.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Link */}
        <NavLink
          to={`/learning-paths/${path.id}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs md:text-sm shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 transition-all duration-200"
        >
          <span>{progressPercent > 0 ? 'Continue Roadmap' : 'Start Path'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>
    </div>
  );
};
