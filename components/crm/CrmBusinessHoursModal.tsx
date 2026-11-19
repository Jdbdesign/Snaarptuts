'use client';

import React from 'react';
import { X, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
}

export function CrmBusinessHoursModal({ isOpen, onClose, onSave }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div
        data-tl="crm-business-hours-modal"
        className="w-full max-w-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900">Business Hours</h2>
            <p className="text-xs text-gray-500 mt-0.5">Set your availability schedule for receiving calls.</p>
          </div>
          <button
            type="button"
            data-tl="crm-business-hours-close"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Time Zone */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Time Zone</label>
            <div className="relative">
              <select
                defaultValue="(GMT+01:00) West Africa Time (Lagos)"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs font-medium appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="(GMT+01:00) West Africa Time (Lagos)">(GMT+01:00) West Africa Time (Lagos)</option>
                <option value="(GMT+00:00) Greenwich Mean Time (London)">(GMT+00:00) Greenwich Mean Time (London)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <span className="font-semibold text-gray-700 block mb-2">Weekly Schedule</span>
            <div className="space-y-1.5 border border-gray-100 rounded-xl p-3 bg-gray-50/50">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-3.5 bg-[#7014D9] rounded-full flex items-center p-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white ml-auto shadow-2xs" />
                    </div>
                    <span className="font-medium text-gray-800 w-24">{day}</span>
                  </div>
                  <span className="text-gray-600 font-mono text-[11px]">09:00 AM - 06:00 PM</span>
                </div>
              ))}
              {['Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-3.5 bg-gray-300 rounded-full flex items-center p-0.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-2xs" />
                    </div>
                    <span className="font-medium text-gray-400 w-24">{day}</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">Closed</span>
                </div>
              ))}
            </div>
          </div>

          {/* After Hours Action */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">After Hours Action</label>
            <div className="relative">
              <select
                defaultValue="Send to voicemail"
                className="w-full bg-[#F8FAFC] border border-gray-200 rounded-xl px-3 py-2 text-gray-800 text-xs font-medium appearance-none focus:outline-none focus:border-[#7014D9]"
              >
                <option value="Send to voicemail">Send to voicemail</option>
                <option value="Forward to mobile">Forward to mobile</option>
                <option value="Play closed greeting">Play closed greeting</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <span className="text-[10px]">▼</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            type="button"
            data-tl="crm-business-hours-cancel"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-business-hours-save"
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
