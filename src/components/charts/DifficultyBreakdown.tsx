import React from 'react';
import { UserProfile } from '../../types';

interface DifficultyBreakdownProps {
  data: UserProfile['solvedByDifficulty'];
  totalSolved: number;
}

export const DifficultyBreakdown: React.FC<DifficultyBreakdownProps> = ({
  data,
  totalSolved,
}) => {
  const easyPct = Math.round((data.easy / data.totalEasy) * 100);
  const medPct = Math.round((data.medium / data.totalMedium) * 100);
  const hardPct = Math.round((data.hard / data.totalHard) * 100);

  const totalPool = data.totalEasy + data.totalMedium + data.totalHard;
  const overallPct = Math.round((totalSolved / totalPool) * 100);

  return (
    <div className="w-full space-y-4">
      {/* Center circle summary */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-200">Difficulty Breakdown</h4>
          <p className="text-xs text-slate-400">{totalSolved} of {totalPool} problems solved</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-mono font-bold text-purple-300">{overallPct}%</span>
          <span className="text-[10px] text-slate-400 block">Completed</span>
        </div>
      </div>

      {/* Easy Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Easy
          </span>
          <span className="font-mono text-slate-300 text-xs">
            {data.easy} / {data.totalEasy} <span className="text-slate-500">({easyPct}%)</span>
          </span>
        </div>
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/50"
            style={{ width: `${easyPct}%` }}
          />
        </div>
      </div>

      {/* Medium Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Medium
          </span>
          <span className="font-mono text-slate-300 text-xs">
            {data.medium} / {data.totalMedium} <span className="text-slate-500">({medPct}%)</span>
          </span>
        </div>
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
          <div
            className="bg-amber-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-amber-500/50"
            style={{ width: `${medPct}%` }}
          />
        </div>
      </div>

      {/* Hard Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-rose-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Hard
          </span>
          <span className="font-mono text-slate-300 text-xs">
            {data.hard} / {data.totalHard} <span className="text-slate-500">({hardPct}%)</span>
          </span>
        </div>
        <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-slate-700/40">
          <div
            className="bg-rose-500 h-full rounded-full transition-all duration-500 shadow-sm shadow-rose-500/50"
            style={{ width: `${hardPct}%` }}
          />
        </div>
      </div>
    </div>
  );
};
