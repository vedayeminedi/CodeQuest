import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Difficulty, ChallengeTopic, ChallengeStatus } from '../../types';
import { ChallengeFilters as FiltersType } from '../../services/challengeService';

interface ChallengeFiltersProps {
  filters: FiltersType;
  onChange: (updated: Partial<FiltersType>) => void;
  onReset: () => void;
}

const TOPICS: ChallengeTopic[] = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Recursion',
  'Sorting',
  'Searching',
  'Stack & Queue',
];

export const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-xl space-y-4">
      {/* Top Row: Search and Status / Sort Dropdowns */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search problems by title, keywords, or company..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2">
          {/* Status Select */}
          <select
            value={filters.status || 'All'}
            onChange={(e) => onChange({ status: e.target.value as ChallengeStatus | 'All' })}
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Solved">Solved</option>
            <option value="Attempted">Attempted</option>
            <option value="Unsolved">Unsolved</option>
          </select>

          {/* Sort Select */}
          <select
            value={filters.sortBy || 'popularity'}
            onChange={(e) => onChange({ sortBy: e.target.value as any })}
            className="bg-slate-950/80 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="acceptance">Acceptance Rate</option>
            <option value="xp">Highest XP</option>
          </select>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="p-2 text-slate-400 hover:text-slate-200 bg-slate-950/80 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Difficulty Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80">
        <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-purple-400" />
          Difficulty:
        </span>

        {(['All', 'Easy', 'Medium', 'Hard'] as const).map((diff) => {
          const isActive = (filters.difficulty || 'All') === diff;
          let activeStyles = 'bg-purple-600 text-white border-purple-500';
          if (diff === 'Easy' && isActive) activeStyles = 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/40';
          if (diff === 'Medium' && isActive) activeStyles = 'bg-amber-600 text-white border-amber-500 shadow-amber-950/40';
          if (diff === 'Hard' && isActive) activeStyles = 'bg-rose-600 text-white border-rose-500 shadow-rose-950/40';

          return (
            <button
              key={diff}
              onClick={() => onChange({ difficulty: diff })}
              className={`px-3 py-1 rounded-xl text-xs font-medium border transition-all ${
                isActive
                  ? `${activeStyles} shadow-md`
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {diff}
            </button>
          );
        })}
      </div>

      {/* Bottom Row: Topic Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <button
          onClick={() => onChange({ topic: 'All' })}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            (filters.topic || 'All') === 'All'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          All Topics
        </button>
        {TOPICS.map((topic) => {
          const isActive = filters.topic === topic;
          return (
            <button
              key={topic}
              onClick={() => onChange({ topic })}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {topic}
            </button>
          );
        })}
      </div>
    </div>
  );
};
