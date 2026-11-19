'use client';

import React from 'react';
import type { Timeline } from '@/lib/timeline';
import { useTimelineVar } from '@/lib/useTimelineVar';

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

export function CrmAddCommentModal({ tl, isOpen, onClose, onSubmit }: Props) {
  const commentText = useTimelineVar<string>(tl, 'field:crm_comment_text', '');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      data-tl="crm-add-comment-overlay"
    >
      <div
        className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 p-6 flex flex-col gap-4"
        data-tl="crm-add-comment-modal"
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900" data-tl="crm-add-comment-title">
            Add Comment
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            data-tl="crm-add-comment-close"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div>
          <textarea
            rows={4}
            placeholder="Write your comment..."
            value={commentText}
            readOnly
            className="w-full p-3 bg-white border border-[#7014D9] rounded-xl text-xs text-gray-900 outline-hidden shadow-2xs resize-none"
            data-tl="crm-comment-textarea"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50"
            data-tl="crm-comment-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(commentText || 'Follow-up completed. Awaiting confirmation of next steps.')}
            className="px-5 py-1.5 bg-[#7014D9] hover:bg-[#5810B0] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            data-tl="crm-comment-submit"
          >
            <svg className="w-3.5 h-3.5 rotate-45 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Add Comment</span>
          </button>
        </div>
      </div>
    </div>
  );
}
