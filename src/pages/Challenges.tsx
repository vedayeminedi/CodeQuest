import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Code2, LayoutGrid, List, Sparkles, CheckCircle2, CircleDot } from 'lucide-react';
import { Challenge } from '../types';
import { challengeService, ChallengeFilters as FiltersType } from '../services/challengeService';
import { ChallengeFilters } from '../components/challenges/ChallengeFilters';
import { ChallengeTable } from '../components/challenges/ChallengeTable';
import { ChallengeCard } from '../components/cards/ChallengeCard';

export const Challenges: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const [filters, setFilters] = useState<FiltersType>({
    search: searchParams.get('search') || '',
    difficulty: (searchParams.get('difficulty') as any) || 'All',
    topic: (searchParams.get('topic') as any) || 'All',
    status: (searchParams.get('status') as any) || 'All',
    sortBy: 'popularity',
  });

  useEffect(() => {
    // Sync URL search params
    const qSearch = searchParams.get('search');
    if (qSearch !== null && qSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, search: qSearch }));
    }
  }, [searchParams]);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/challenges with query params
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const res = await challengeService.getChallenges(filters);
        if (res.success) {
          setChallenges(res.data);
        }
      } catch (err) {
        console.error('Failed to load challenges:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [filters]);

  const handleFilterChange = (updated: Partial<FiltersType>) => {
    setFilters((prev) => {
      const next = { ...prev, ...updated };
      // update search params in URL
      const params = new URLSearchParams();
      if (next.search) params.set('search', next.search);
      if (next.difficulty && next.difficulty !== 'All') params.set('difficulty', next.difficulty);
      if (next.topic && next.topic !== 'All') params.set('topic', next.topic);
      if (next.status && next.status !== 'All') params.set('status', next.status);
      setSearchParams(params, { replace: true });
      return next;
    });
  };

  const handleReset = () => {
    setFilters({
      search: '',
      difficulty: 'All',
      topic: 'All',
      status: 'All',
      sortBy: 'popularity',
    });
    setSearchParams({}, { replace: true });
  };

  const solvedCount = challenges.filter((c) => c.status === 'Solved').length;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            Algorithmic Practice
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Coding Challenges & LeetCode Bank
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Sharpen your data structures and algorithms skills with real interview questions from top tech companies.
          </p>
        </div>

        {/* View mode toggle & Solved summary */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-mono font-bold">
              {solvedCount} / {challenges.length}
            </span>
            <span className="text-slate-500">Solved</span>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <ChallengeFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {/* Challenge List or Grid */}
      {viewMode === 'table' ? (
        <ChallengeTable challenges={challenges} isLoading={isLoading} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((c) => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      )}
    </div>
  );
};
