import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Code2,
  Terminal,
  Bot,
  Trophy,
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const MobileNav: React.FC = () => {
  const mobileLinks = [
    { to: '/', label: 'Home', icon: LayoutDashboard },
    { to: '/learning-paths', label: 'Paths', icon: Compass },
    { to: '/challenges', label: 'Problems', icon: Code2 },
    { to: '/workspace/cq-101', label: 'IDE', icon: Terminal },
    { to: '/ai-tutor', label: 'AI Tutor', icon: Bot },
    { to: '/leaderboard', label: 'Rank', icon: Trophy },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-xl px-2 flex items-center justify-around z-40">
      {mobileLinks.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors',
                isActive
                  ? 'text-purple-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              )
            }
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </div>
  );
};
