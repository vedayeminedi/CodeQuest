import React, { useState } from 'react';
import { AnalyticsData } from '../../types';

interface ActivityHeatmapProps {
  data: AnalyticsData['heatmapData'];
}

export const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ data }) => {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Group data into weeks (7 days per column)
  const weeks: AnalyticsData['heatmapData'][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const getColorClass = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 0:
        return 'bg-slate-800/60 border border-slate-700/30';
      case 1:
        return 'bg-purple-950 border border-purple-800/50';
      case 2:
        return 'bg-purple-800 border border-purple-600/50';
      case 3:
        return 'bg-purple-600 border border-purple-400/60 shadow-sm shadow-purple-900/50';
      case 4:
        return 'bg-gradient-to-tr from-purple-500 to-cyan-400 border border-cyan-300 shadow-sm shadow-cyan-950/60';
    }
  };

  const totalSubmissions = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-200">Daily Coding Consistency</h4>
          <p className="text-xs text-slate-400">
            {totalSubmissions} problem submissions across the past 4 months
          </p>
        </div>

        {/* Hover details badge */}
        {hoveredDay ? (
          <div className="text-xs bg-slate-950 px-2.5 py-1 rounded-lg border border-purple-500/40 text-purple-200 font-mono">
            {hoveredDay.count} submissions on {hoveredDay.date}
          </div>
        ) : (
          <div className="text-xs text-slate-400 font-mono">Hover a square for details</div>
        )}
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1.5 min-w-[580px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${getColorClass(
                    day.level
                  )}`}
                  title={`${day.count} submissions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
        <span>Less</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-slate-800/60 border border-slate-700/30" />
          <span className="w-3 h-3 rounded-sm bg-purple-950 border border-purple-800/50" />
          <span className="w-3 h-3 rounded-sm bg-purple-800 border border-purple-600/50" />
          <span className="w-3 h-3 rounded-sm bg-purple-600 border border-purple-400/60" />
          <span className="w-3 h-3 rounded-sm bg-gradient-to-tr from-purple-500 to-cyan-400 border border-cyan-300" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
