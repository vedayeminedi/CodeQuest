import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, Clock, Sparkles, ArrowRight, Building } from 'lucide-react';
import { Challenge } from '../../types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

interface ChallengeCardProps {
  challenge: Challenge;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Card hoverEffect glow="purple" className="flex flex-col justify-between p-5 relative">
      <div>
        {/* Header: Difficulty & Topic & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge difficulty={challenge.difficulty} size="sm" />
            <Badge variant="outline" size="sm">
              {challenge.topic}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5">
            {challenge.status === 'Solved' && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Solved
              </span>
            )}
            {challenge.status === 'Attempted' && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" /> Attempted
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <NavLink
          to={`/workspace/${challenge.id}`}
          className="text-base font-bold text-slate-100 hover:text-purple-300 transition-colors line-clamp-1 block mb-2"
        >
          {challenge.title}
        </NavLink>

        {/* Description preview */}
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {challenge.description.replace(/[`*#]/g, '')}
        </p>
      </div>

      {/* Footer stats: Companies, Acceptance, XP & Solve CTA */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="text-slate-400 font-mono">
            {challenge.acceptanceRate}% <span className="text-slate-500 text-[10px]">acc</span>
          </span>

          <span className="flex items-center gap-1 text-purple-300 font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            +{challenge.xpReward} XP
          </span>
        </div>

        <NavLink
          to={`/workspace/${challenge.id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all group"
        >
          <span>Solve</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </NavLink>
      </div>
    </Card>
  );
};
