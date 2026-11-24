import React, { useState } from 'react';
import { AnalyticsData } from '../../types';

interface WeeklyBarChartProps {
  data: AnalyticsData['weeklyActivity'];
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxProblems = Math.max(...data.map((d) => d.problemsSolved), 6);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-slate-200">Weekly Coding Activity</h4>
          <p className="text-xs text-slate-400">Problems solved & XP earned over past 7 days</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500 inline-block" />
            <span className="text-slate-400">Problems Solved</span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-slate-800">
        {data.map((item, index) => {
          const heightPercent = Math.max(15, Math.round((item.problemsSolved / maxProblems) * 100));
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={item.day}
              className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-12 z-20 bg-slate-950 border border-purple-500/50 rounded-lg p-2 shadow-xl text-center whitespace-nowrap pointer-events-none animate-scale-up">
                  <div className="text-[11px] font-bold text-purple-300">
                    {item.day} ({item.date}): {item.problemsSolved} Solved
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    +{item.xpEarned} XP · {item.hoursSpent}h
                  </div>
                </div>
              )}

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-800/80 rounded-t-lg relative flex flex-col justify-end overflow-hidden h-full">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isHovered
                      ? 'bg-gradient-to-t from-purple-500 to-cyan-400 shadow-lg shadow-purple-500/50'
                      : 'bg-gradient-to-t from-purple-700 via-indigo-600 to-purple-500 group-hover:from-purple-600 group-hover:to-cyan-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  <span className="sr-only">{item.problemsSolved} problems</span>
                </div>
              </div>

              {/* Day Label */}
              <span
                className={`text-xs mt-2 transition-colors font-medium ${
                  isHovered ? 'text-purple-300 font-bold' : 'text-slate-400'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-3 text-xs text-slate-400">
        <span>Average: 3.8 problems/day</span>
        <span className="text-emerald-400 font-medium">🔥 100% active this week</span>
      </div>
    </div>
  );
};
