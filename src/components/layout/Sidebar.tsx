import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Code2,
  Terminal,
  Bot,
  Trophy,
  Award,
  BarChart3,
  User,
  Flame,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onCloseMobile,
}) => {
  const { user } = useUser();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/learning-paths', label: 'Learning Paths', icon: Compass },
    { to: '/challenges', label: 'Challenges', icon: Code2 },
    { to: '/workspace/cq-101', label: 'Workspace', icon: Terminal, badge: 'IDE' },
    { to: '/ai-tutor', label: 'AI Tutor', icon: Bot, badge: 'AI' },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { to: '/achievements', label: 'Achievements', icon: Award },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const currentLevelProgress = user
    ? Math.round((user.currentXp / user.nextLevelXp) * 100)
    : 0;

  return (
    <aside className="w-64 h-screen bg-slate-950/90 border-r border-slate-800/80 flex flex-col shrink-0 select-none backdrop-blur-xl z-30">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
        <NavLink
          to="/"
          onClick={onCloseMobile}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-900/40 group-hover:shadow-purple-600/50 transition-all duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Code<span className="text-purple-400">Quest</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              AI Gamified Learning
            </p>
          </div>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Platform
        </div>

        {navLinks.slice(0, 5).map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-purple-600/15 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-950/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}

        <div className="pt-4 px-3 pb-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Gamification & Stats
        </div>

        {navLinks.slice(5).map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                  isActive
                    ? 'bg-purple-600/15 text-purple-200 border border-purple-500/40 shadow-sm shadow-purple-950/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                )
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                <span>{link.label}</span>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* User Progress Mini Card at Bottom */}
      {user && (
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
          <NavLink
            to="/profile"
            onClick={onCloseMobile}
            className="block p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border border-purple-500/40"
                />
                <span className="absolute -bottom-1 -right-1 bg-purple-600 text-[9px] font-bold text-white px-1 rounded-full border border-slate-900">
                  L{user.level}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-100 truncate group-hover:text-purple-300 transition-colors">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-0.5 text-amber-400 text-xs font-bold">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
                    <span>{user.streakDays}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{user.title}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>

            {/* Level XP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Level {user.level}</span>
                <span className="text-purple-300 font-mono">
                  {user.currentXp} / {user.nextLevelXp} XP
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </aside>
  );
};
