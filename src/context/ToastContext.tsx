import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'xp';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => void;
  removeToast: (id: string) => void;
  showXPToast: (xp: number, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type, title, message, duration = 4000 }: Omit<ToastItem, 'id'>) => {
      const id = `toast_${Date.now()}_${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, title, message, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const showXPToast = useCallback(
    (xp: number, message?: string) => {
      addToast({
        type: 'xp',
        title: `+${xp} XP Gained!`,
        message: message || 'Great progress on your coding quest!',
        duration: 4500,
      });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showXPToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
        {toasts.map((toast) => {
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${
                toast.type === 'xp'
                  ? 'bg-purple-950/90 border-purple-500/50 text-purple-100 shadow-purple-950/40'
                  : toast.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-950/40'
                  : toast.type === 'error'
                  ? 'bg-rose-950/90 border-rose-500/50 text-rose-100 shadow-rose-950/40'
                  : 'bg-slate-900/90 border-slate-700/60 text-slate-100 shadow-black/50'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {toast.type === 'xp' && <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />}
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
                {toast.message && <p className="text-xs text-slate-300 mt-1">{toast.message}</p>}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
