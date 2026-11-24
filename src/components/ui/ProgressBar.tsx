import React from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number; // 0 to 100 or current
  max?: number;
  label?: string;
  showPercent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'purple' | 'cyan' | 'emerald' | 'gradient';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  size = 'md',
  variant = 'purple',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const fillClasses = {
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-500 shadow-sm shadow-purple-500/50',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-sm shadow-cyan-500/50',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50',
    gradient: 'bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400',
  }[variant];

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1.5">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-mono text-purple-300">{percentage}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/50', sizeClasses)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', fillClasses)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
