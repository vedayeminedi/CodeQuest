import React from 'react';
import { AnalyticsData } from '../../types';

interface SkillRadarProps {
  data: AnalyticsData['topicProficiency'];
}

export const SkillRadar: React.FC<SkillRadarProps> = ({ data }) => {
  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-200">Algorithmic Skill Mastery</h4>
          <p className="text-xs text-slate-400">Proficiency scores evaluated from problem test runs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {data.map((item) => {
          let color = 'from-purple-500 to-indigo-500';
          if (item.proficiencyPercentage >= 80) color = 'from-emerald-500 to-teal-400';
          else if (item.proficiencyPercentage >= 60) color = 'from-cyan-500 to-blue-500';
          else if (item.proficiencyPercentage >= 40) color = 'from-purple-500 to-violet-500';
          else color = 'from-amber-500 to-rose-500';

          return (
            <div
              key={item.topic}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-semibold text-slate-200">{item.topic}</span>
                <span className="font-mono text-purple-300 font-bold">
                  {item.proficiencyPercentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-500`}
                  style={{ width: `${item.proficiencyPercentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-1.5 text-[10px] text-slate-400">
                <span>{item.solvedCount} of {item.totalAvailable} solved</span>
                <span>
                  {item.proficiencyPercentage >= 80
                    ? 'Master'
                    : item.proficiencyPercentage >= 60
                    ? 'Proficient'
                    : 'Practicing'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
