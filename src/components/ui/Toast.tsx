import React from 'react';
import { useData } from '../../context/DataContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 transform translate-y-0 shadow-2xl ${
              isSuccess
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100 shadow-emerald-900/20'
                : isError
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-100 shadow-rose-900/20'
                : isWarning
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-100 shadow-amber-900/20'
                : 'bg-dark-800/90 border-brand-purple/40 text-purple-100 shadow-purple-900/20'
            }`}
          >
            <div className="mr-3 mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-brand-purple" />}
            </div>
            <div className="flex-1 pr-2">
              <h4 className="font-semibold text-sm">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs opacity-80 mt-1">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
