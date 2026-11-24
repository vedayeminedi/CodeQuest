import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  Flame,
  Sparkles,
  Bell,
  Menu,
  CheckCircle2,
  Trophy,
  ExternalLink,
  Target,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onOpenMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu }) => {
  const { user, toggleDailyGoal } = useUser();
  const navigate = useNavigate();
  const [showGoalsDropdown, setShowGoalsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/challenges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems, topics, algorithms (e.g. DP, Two Sum)..."
            className="w-full bg-slate-900/90 border border-slate-800 focus:border-purple-500 rounded-xl pl-9 pr-12 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
            ↵
          </kbd>
        </form>
      </div>

      {/* Right: Gamification Badges & Profile Dropdown */}
      <div className="flex items-center gap-2 md:gap-3">
        {user && (
          <>
            {/* Coding Streak Pill */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-bold shadow-sm shadow-amber-950/30"
              title={`${user.streakDays} Day Streak! ${user.streakFreezeRemaining} streak freezes active.`}
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{user.streakDays}d</span>
              <span className="hidden lg:inline text-amber-400/80 font-normal text-[11px]">
                streak
              </span>
            </div>

            {/* Total XP Pill */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 border border-purple-500/30 rounded-xl text-purple-200 text-xs font-bold shadow-sm shadow-purple-950/30"
              title={`${user.currentXp} total XP earned. Level ${user.level}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono">{user.currentXp}</span>
              <span className="text-purple-300 font-mono text-[11px]">XP</span>
            </div>

            {/* Daily Goals Quick Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowGoalsDropdown(!showGoalsDropdown);
                  setShowProfileDropdown(false);
                }}
                className={cn(
                  'relative p-2 rounded-xl border text-slate-300 hover:text-white transition-all',
                  showGoalsDropdown
                    ? 'bg-purple-600/20 border-purple-500/50 text-purple-200'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                )}
                title="Daily Goals"
              >
                <Target className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
              </button>

              {/* Goals Popover */}
              {showGoalsDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-scale-up">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-purple-400" />
                      Daily Coding Goals
                    </h4>
                    <span className="text-[10px] text-purple-400 font-mono font-semibold">
                      Resets in 14h
                    </span>
                  </div>

                  <div className="py-2 space-y-2.5">
                    {user.dailyGoals.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => toggleDailyGoal(goal.id)}
                        className={cn(
                          'p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3',
                          goal.completed
                            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2
                            className={cn(
                              'w-4 h-4 shrink-0 transition-colors',
                              goal.completed ? 'text-emerald-400' : 'text-slate-600'
                            )}
                          />
                          <div>
                            <p
                              className={cn(
                                'text-xs font-medium',
                                goal.completed ? 'line-through text-slate-400' : 'text-slate-200'
                              )}
                            >
                              {goal.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {goal.current} / {goal.target} {goal.unit}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          +{goal.xpReward} XP
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-center">
                    <NavLink
                      to="/profile"
                      onClick={() => setShowGoalsDropdown(false)}
                      className="text-xs text-purple-400 hover:text-purple-300 font-medium"
                    >
                      Configure daily targets →
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500" />
            </button>

            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowGoalsDropdown(false);
                }}
                className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              >
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-purple-500/40"
                />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-scale-up">
                  <div className="p-3 border-b border-slate-800">
                    <p className="text-sm font-bold text-slate-100">{user.name}</p>
                    <p className="text-xs text-slate-400">@{user.username}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400">League:</span>
                      <span className="text-cyan-300 font-bold">{user.tier}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <NavLink
                      to="/profile"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-purple-400" />
                      View Profile & Settings
                    </NavLink>
                    <NavLink
                      to="/leaderboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Rankings & Leagues
                    </NavLink>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        Connected GitHub
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Active</span>
                    </a>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={() => setShowProfileDropdown(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-950/20 rounded-lg transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out (Demo Mode)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
