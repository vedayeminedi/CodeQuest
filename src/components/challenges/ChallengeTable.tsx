import React from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, Clock, CircleDot, Sparkles, ArrowUpRight } from 'lucide-react';
import { Challenge } from '../../types';
import { Badge } from '../ui/Badge';

interface ChallengeTableProps {
  challenges: Challenge[];
  isLoading?: boolean;
}

export const ChallengeTable: React.FC<ChallengeTableProps> = ({
  challenges,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
        <div className="inline-block w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-xs text-slate-400">Loading algorithmic challenges...</p>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
        <p className="text-base font-bold text-slate-300">No matching challenges found</p>
        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters, topic, or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4 w-12 text-center">Status</th>
              <th className="py-3.5 px-4">Problem Title</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">Topic</th>
              <th className="py-3.5 px-4">Difficulty</th>
              <th className="py-3.5 px-4 hidden md:table-cell">Acceptance</th>
              <th className="py-3.5 px-4 text-center">XP Reward</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm">
            {challenges.map((challenge) => {
              return (
                <tr
                  key={challenge.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Status */}
                  <td className="py-3.5 px-4 text-center">
                    {challenge.status === 'Solved' ? (
                      <span title="Solved" className="inline-flex justify-center">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                      </span>
                    ) : challenge.status === 'Attempted' ? (
                      <span title="Attempted" className="inline-flex justify-center">
                        <Clock className="w-4 h-4 text-amber-400 mx-auto" />
                      </span>
                    ) : (
                      <span title="Unsolved" className="inline-flex justify-center">
                        <CircleDot className="w-4 h-4 text-slate-600 mx-auto" />
                      </span>
                    )}
                  </td>

                  {/* Title & Companies */}
                  <td className="py-3.5 px-4">
                    <NavLink
                      to={`/workspace/${challenge.id}`}
                      className="font-semibold text-slate-200 group-hover:text-purple-300 transition-colors inline-block"
                    >
                      {challenge.title}
                    </NavLink>
                    <div className="flex items-center gap-1.5 mt-1">
                      {challenge.companies.slice(0, 2).map((comp) => (
                        <span
                          key={comp}
                          className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Topic */}
                  <td className="py-3.5 px-4 hidden sm:table-cell">
                    <span className="text-xs text-slate-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
                      {challenge.topic}
                    </span>
                  </td>

                  {/* Difficulty */}
                  <td className="py-3.5 px-4">
                    <Badge difficulty={challenge.difficulty} size="sm" />
                  </td>

                  {/* Acceptance */}
                  <td className="py-3.5 px-4 hidden md:table-cell font-mono text-slate-400">
                    {challenge.acceptanceRate}%
                  </td>

                  {/* XP Reward */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-purple-300 font-bold font-mono text-xs bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      +{challenge.xpReward}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <NavLink
                      to={`/workspace/${challenge.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 group-hover:bg-purple-600 text-slate-300 group-hover:text-white text-xs font-semibold border border-slate-700 group-hover:border-purple-500 transition-all shadow-sm"
                    >
                      <span>Solve</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
