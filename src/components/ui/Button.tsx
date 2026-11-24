import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'cyan' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/40 border border-purple-400/20',
      secondary:
        'bg-slate-800/90 hover:bg-slate-700 text-slate-100 border border-slate-700/80 hover:border-slate-600 shadow-md',
      outline:
        'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500',
      ghost:
        'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-100',
      emerald:
        'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/20',
      cyan:
        'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 border border-cyan-400/20',
      danger:
        'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-lg shadow-rose-950/40 border border-rose-400/20',
    }[variant];

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-5 py-3 gap-2.5 font-semibold',
      icon: 'p-2 text-slate-300',
    }[size];

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
