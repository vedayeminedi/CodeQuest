import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  accentColor?: 'purple' | 'cyan' | 'emerald' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'purple',
}) => {
  const iconBgClasses = {
    purple: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  }[accentColor];

  return (
    <Card className="flex items-center justify-between p-5 relative overflow-hidden group">
      {/* Background ambient glow */}
      <div
        className={cn(
          'absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity',
          accentColor === 'purple' && 'bg-purple-500',
          accentColor === 'cyan' && 'bg-cyan-500',
          accentColor === 'emerald' && 'bg-emerald-500',
          accentColor === 'amber' && 'bg-amber-500'
        )}
      />

      <div className="space-y-1 z-10">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-white font-mono tracking-tight">{value}</span>
          {trend && (
            <span
              className={cn(
                'text-[11px] font-bold',
                trend.isPositive ? 'text-emerald-400' : 'text-rose-400'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>

      <div
        className={cn(
          'w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-105',
          iconBgClasses
        )}
      >
        {icon}
      </div>
    </Card>
  );
};
