'use client';

import React from 'react';
import { X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export function CrmRingStrategyModal({ isOpen, onClose, onSave }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        data-tl="crm-ring-strategy-modal"
        className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Ring Strategy</h2>
            <p className="text-xs text-gray-500 mt-0.5">Choose how calls ring across your connected devices.</p>
          </div>
          <button
            type="button"
            data-tl="crm-ring-strategy-close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Ring Strategy Option */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ring Strategy</label>
            <div className="relative">
              <select
                defaultValue="Ring all devices simultaneously"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs font-medium appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Ring all devices simultaneously">Ring all devices simultaneously</option>
                <option value="Ring sequentially">Ring sequentially</option>
                <option value="Round robin">Round robin</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>

          {/* Ring Duration */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ring Duration</label>
            <div className="relative">
              <select
                defaultValue="20 seconds"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs font-medium appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="15 seconds">15 seconds</option>
                <option value="20 seconds">20 seconds</option>
                <option value="30 seconds">30 seconds</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>

          {/* Connected Devices Toggles */}
          <div className="space-y-2 pt-1">
            <span className="font-semibold text-gray-700 block">Ring Devices</span>
            
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-medium text-gray-800">Desktop App</span>
              <div className="w-8 h-4.5 bg-[#7014D9] rounded-full flex items-center p-0.5 cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-white ml-auto shadow-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-medium text-gray-800">Mobile App</span>
              <div className="w-8 h-4.5 bg-[#7014D9] rounded-full flex items-center p-0.5 cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-white ml-auto shadow-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-medium text-gray-800">Desk Phone</span>
              <div className="w-8 h-4.5 bg-[#7014D9] rounded-full flex items-center p-0.5 cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-white ml-auto shadow-xs" />
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="font-medium text-gray-800">Web Browser</span>
              <div className="w-8 h-4.5 bg-gray-300 rounded-full flex items-center p-0.5 cursor-pointer">
                <div className="w-3.5 h-3.5 rounded-full bg-white shadow-xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            type="button"
            data-tl="crm-ring-strategy-cancel"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-ring-strategy-save"
            onClick={() => {
              if (onSave) onSave();
              onClose();
            }}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#7014D9] hover:bg-[#5E11B8] rounded-xl shadow-xs transition-colors"
          >
            <Check size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
