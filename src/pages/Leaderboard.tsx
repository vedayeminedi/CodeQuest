import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Flame,
  Sparkles,
  Users,
  Globe,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Search,
} from 'lucide-react';
import { LeaderboardUser, LeaderboardTimeframe } from '../types';
import { leaderboardService } from '../services/leaderboardService';
import { PodiumCard } from '../components/cards/PodiumCard';
import { Tabs } from '../components/ui/Tabs';

export const Leaderboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<LeaderboardTimeframe>('weekly');
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // [BACKEND INTEGRATION POINT] GET /api/v1/leaderboard?timeframe={timeframe}
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const res = await leaderboardService.getLeaderboard(timeframe);
        if (res.success) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  const topThree = users.slice(0, 3);
  const remainingUsers = users.slice(3).filter((u) => {
    return (
      search.trim() === '' ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    );
  });

  const currentUser = users.find((u) => u.isCurrentUser);

  const tabs = [
    { id: 'weekly', label: 'Weekly Sprint', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'global', label: 'All-Time Global', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'friends', label: 'Friends League', icon: <Users className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            Competitive Rankings
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            CodeQuest Leaderboard & Leagues
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
            Compete weekly against algorithmic engineers worldwide. Gain XP by solving challenges and maintaining streaks.
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="shrink-0">
          <Tabs
            tabs={tabs}
            activeTab={timeframe}
            onChange={(id: any) => setTimeframe(id)}
          />
        </div>
      </div>

      {/* Top 3 Podium Showcase */}
      {topThree.length >= 3 && (
        <div className="pt-4">
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-slate-200">Podium of Champions</h2>
            <p className="text-xs text-slate-400">Top performers in the {timeframe} leaderboard</p>
          </div>

          <div className="flex flex-col sm:flex-row items-end justify-center gap-4 max-w-3xl mx-auto">
            <PodiumCard user={topThree[1]} place={2} />
            <PodiumCard user={topThree[0]} place={1} />
            <PodiumCard user={topThree[2]} place={3} />
          </div>
        </div>
      )}

      {/* Current User Spotlight Banner */}
      {currentUser && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/40 border border-purple-500/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              #{currentUser.rank}
            </span>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-2">
                <span>{currentUser.name}</span>
                <span className="text-[10px] font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.2 rounded-full border border-purple-500/30">
                  {currentUser.tier}
                </span>
              </p>
              <p className="text-[11px] text-slate-400">
                You are in the top 5%! Earn 180 XP to overtake rank #{currentUser.rank - 1}.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold self-end sm:self-auto">
            <span className="text-purple-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              {currentUser.xp.toLocaleString()} XP
            </span>
            <span className="text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              {currentUser.streakDays}d
            </span>
          </div>
        </div>
      )}

      {/* Ranking Table */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl space-y-3">
        {/* Search header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-200">Rankings Directory</h3>
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-center">Level</th>
                <th className="py-3 px-4 text-center">Solved</th>
                <th className="py-3 px-4 text-center">Streak</th>
                <th className="py-3 px-4 text-right">XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm">
              {remainingUsers.map((user) => {
                return (
                  <tr
                    key={user.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      user.isCurrentUser ? 'bg-purple-950/20 font-semibold' : ''
                    }`}
                  >
                    {/* Rank with change indicator */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-mono font-bold text-slate-300">#{user.rank}</span>
                        {user.change === 'up' && <ArrowUp className="w-3 h-3 text-emerald-400" />}
                        {user.change === 'down' && <ArrowDown className="w-3 h-3 text-rose-400" />}
                        {user.change === 'same' && <Minus className="w-3 h-3 text-slate-600" />}
                      </div>
                    </td>

                    {/* User Avatar & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-200">{user.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">@{user.username}</p>
                        </div>
                      </div>
                    </td>

                    {/* Tier */}
                    <td className="py-3.5 px-4">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                        {user.tier}
                      </span>
                    </td>

                    {/* Level */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-300">
                      L{user.level}
                    </td>

                    {/* Problems Solved */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                      {user.problemsSolved}
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono text-amber-400">
                      {user.streakDays}d
                    </td>

                    {/* XP Points */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-purple-300">
                      {user.xp.toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
