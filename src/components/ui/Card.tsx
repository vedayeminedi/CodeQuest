import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'purple' | 'cyan' | 'emerald';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = false,
  ...props
}) => {
  const glowClasses = {
    none: '',
    purple: 'hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-950/40',
    cyan: 'hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-950/40',
    emerald: 'hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/40',
  }[glow];

  return (
    <div
      className={cn(
        'bg-slate-900/70 backdrop-blur-md border border-slate-800/80 rounded-2xl p-5 text-slate-100 shadow-xl transition-all duration-200',
        hoverEffect && 'hover:-translate-y-1 hover:border-slate-700 cursor-pointer',
        glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
