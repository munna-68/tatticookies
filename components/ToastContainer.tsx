'use client';

import React from 'react';
import { useCart } from '@/lib/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-0 top-[5rem] z-[60] sm:right-5 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-[1.25rem] bg-ink text-white shadow-warm-hover animate-[toast-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)]"
        >
          {toast.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 text-coral shrink-0 mt-0.5" />
          ) : toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-mustard shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            {toast.message && (
              <p className="text-xs text-cream-200/80 mt-0.5 leading-relaxed">{toast.message}</p>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-cream-200/50 hover:text-white p-1 transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
