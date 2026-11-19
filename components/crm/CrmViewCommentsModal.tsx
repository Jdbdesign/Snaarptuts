'use client';

import React from 'react';
import type { ProspectComment } from './crm-data';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prospectName?: string;
  comments?: ProspectComment[];
}

export function CrmViewCommentsModal({
  isOpen,
  onClose,
  prospectName = 'Alex Morgan',
  comments = [
    {
      id: 'comm-1',
      author: 'Jane Doe',
      text: 'Follow-up completed. Awaiting confirmation of next steps.',
      date: 'Today, 10:15 AM',
    },
  ],
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-view-comments-overlay"
    >
      <div
        className="relative w-full max-w-[460px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 flex flex-col gap-4"
        data-tl="crm-view-comments-modal"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900" data-tl="crm-view-comments-title">
              Comments
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Linked to {prospectName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            data-tl="crm-view-comments-close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Comment list */}
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {comments.map((c) => (
            <div key={c.id} className="p-3 bg-[#FAF5FF] border border-[#DDD6FE] rounded-xl flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#7014D9] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {c.author.charAt(0)}
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900">{c.author}</span>
                  <span className="text-[10px] text-gray-400">{c.date}</span>
                </div>
                <p className="text-gray-700 mt-1 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs font-semibold"
            data-tl="crm-view-comments-done"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
