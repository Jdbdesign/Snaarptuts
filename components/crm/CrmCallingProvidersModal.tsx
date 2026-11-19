'use client';

import React from 'react';
import { X, PhoneCall } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CrmCallingProvidersModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        data-tl="crm-calling-providers-modal"
        className="w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Calling Providers</h2>
          <button
            type="button"
            data-tl="crm-calling-providers-close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Provider Card: Talking */}
          <div
            data-tl="crm-provider-talking-card"
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-200/80 shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <PhoneCall size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-gray-900">Talking</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    ✓ Connected
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5">Connected as admin@example.com</p>
              </div>
            </div>

            <button
              type="button"
              data-tl="crm-provider-disconnect-btn"
              className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
