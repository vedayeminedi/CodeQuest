import React from 'react';
import { Crown, Flame, Sparkles } from 'lucide-react';
import { LeaderboardUser } from '../../types';

interface PodiumCardProps {
  user: LeaderboardUser;
  place: 1 | 2 | 3;
}

export const PodiumCard: React.FC<PodiumCardProps> = ({ user, place }) => {
  const placeConfig = {
    1: {
      height: 'h-72 sm:h-80',
      order: 'order-1 sm:order-2',
      crownColor: 'text-amber-400 fill-amber-400',
      ringColor: 'ring-amber-400/80 shadow-lg shadow-amber-500/30',
      cardBg: 'bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-slate-900 border-amber-500/40',
      badgeBg: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black',
      glow: 'shadow-2xl shadow-amber-950/40',
      label: '1st Place',
    },
    2: {
      height: 'h-64 sm:h-72',
      order: 'order-2 sm:order-1',
      crownColor: 'text-slate-300 fill-slate-300',
      ringColor: 'ring-slate-300/80 shadow-lg shadow-slate-400/20',
      cardBg: 'bg-gradient-to-b from-slate-400/10 via-slate-900/90 to-slate-900 border-slate-600/40',
      badgeBg: 'bg-gradient-to-r from-slate-300 to-slate-100 text-slate-950 font-black',
      glow: 'shadow-xl shadow-slate-950/40',
      label: '2nd Place',
    },
    3: {
      height: 'h-60 sm:h-68',
      order: 'order-3',
      crownColor: 'text-amber-700 fill-amber-700',
      ringColor: 'ring-amber-700/80 shadow-lg shadow-amber-800/20',
      cardBg: 'bg-gradient-to-b from-amber-800/10 via-slate-900/90 to-slate-900 border-amber-800/40',
      badgeBg: 'bg-gradient-to-r from-amber-700 to-amber-600 text-amber-100 font-black',
      glow: 'shadow-xl shadow-amber-950/20',
      label: '3rd Place',
    },
  }[place];

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-between p-5 rounded-2xl border ${placeConfig.cardBg} ${placeConfig.glow} ${placeConfig.height} ${placeConfig.order} relative transition-transform hover:-translate-y-1.5 duration-300`}
    >
      {/* Top Crown & Rank Tag */}
      <div className="flex flex-col items-center">
        <Crown className={`w-8 h-8 mb-1 ${placeConfig.crownColor} animate-bounce`} />
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full ${placeConfig.badgeBg} shadow-sm uppercase tracking-wider`}
        >
          #{place}
        </span>
      </div>

      {/* Center Avatar & User Details */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-2.5">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-4 ${placeConfig.ringColor}`}
          />
          <span className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] font-bold text-white px-1.5 py-0.2 rounded-full border-2 border-slate-900">
            L{user.level}
          </span>
        </div>

        <h4 className="text-sm font-bold text-white truncate max-w-[140px]">{user.name}</h4>
        <p className="text-xs text-slate-400 font-mono">@{user.username}</p>

        {user.badge && (
          <span className="text-[10px] font-semibold text-amber-300 mt-1 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
            {user.badge}
          </span>
        )}
      </div>

      {/* Bottom XP & Stats */}
      <div className="w-full pt-3 border-t border-slate-800/80 flex items-center justify-around text-xs">
        <div className="flex items-center gap-1 font-mono font-bold text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{user.xp.toLocaleString()} XP</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400 font-bold">
          <Flame className="w-3.5 h-3.5 fill-amber-500" />
          <span>{user.streakDays}d</span>
        </div>
      </div>
    </div>
  );
};
