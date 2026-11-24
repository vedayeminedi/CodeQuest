import React from 'react';
import { cn } from '../../utils/cn';
import { Difficulty, Rarity } from '../../types';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'rose';
  difficulty?: Difficulty;
  rarity?: Rarity;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  difficulty,
  rarity,
  size = 'md',
  ...props
}) => {
  let styleClasses = 'bg-slate-800 text-slate-300 border-slate-700/60';

  if (difficulty) {
    switch (difficulty) {
      case 'Easy':
        styleClasses = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        break;
      case 'Medium':
        styleClasses = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        break;
      case 'Hard':
        styleClasses = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
        break;
    }
  } else if (rarity) {
    switch (rarity) {
      case 'Common':
        styleClasses = 'bg-slate-800/80 text-slate-300 border-slate-700';
        break;
      case 'Rare':
        styleClasses = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-cyan-950/20';
        break;
      case 'Epic':
        styleClasses = 'bg-purple-500/15 text-purple-300 border-purple-500/50 shadow-purple-950/30';
        break;
      case 'Legendary':
        styleClasses = 'bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/40';
        break;
    }
  } else {
    switch (variant) {
      case 'purple':
        styleClasses = 'bg-purple-500/15 text-purple-300 border-purple-500/30';
        break;
      case 'cyan':
        styleClasses = 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
        break;
      case 'emerald':
        styleClasses = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
        break;
      case 'amber':
        styleClasses = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
        break;
      case 'rose':
        styleClasses = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        break;
      case 'outline':
        styleClasses = 'bg-transparent text-slate-400 border-slate-700';
        break;
    }
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border tracking-wide transition-colors',
        sizeClasses,
        styleClasses,
        className
      )}
      {...props}
    >
      {difficulty || rarity || children}
    </span>
  );
};
