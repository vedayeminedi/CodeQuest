import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, Sparkles, Filter, Search } from 'lucide-react';
import { LearningPath } from '../types';
import { learningPathService } from '../services/learningPathService';
import { LearningPathCard } from '../components/cards/LearningPathCard';

export const LearningPaths: React.FC = () => {
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/learning-paths
    const fetchPaths = async () => {
      try {
        const res = await learningPathService.getLearningPaths();
        if (res.success) {
          setPaths(res.data);
        }
      } catch (err) {
        console.error('Failed to load learning paths:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, []);

  const filteredPaths = paths.filter((p) => {
    const matchesCategory =
      category === 'All' || p.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      search.trim() === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            Structured Curriculum
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Learning Paths & Roadmaps
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Step-by-step sequential curriculum designed by industry software engineers. Gain hands-on practice, earn XP, and unlock badges.
          </p>
        </div>

        {/* Global Summary Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Available Tracks</span>
            <span className="text-lg font-bold text-white font-mono">{paths.length} Core Paths</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search learning paths (e.g. Python, Algorithms, Web)..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Algorithms', 'Language', 'Development'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Learning Paths */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-80 bg-slate-900/50 border border-slate-800 rounded-2xl animate-pulse p-6"
            />
          ))}
        </div>
      ) : filteredPaths.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-base font-bold text-slate-300">No learning paths match your filter</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or search term.</p>
        </div>
      )}
    </div>
  );
};
