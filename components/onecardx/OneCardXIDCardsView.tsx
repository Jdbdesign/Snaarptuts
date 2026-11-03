"use client";

import type { Timeline } from "@/lib/timeline";

function OcxPortraitFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ocxIdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill="url(#ocxIdGrad)" />
      <circle cx="100" cy="85" r="45" fill="#475569" />
      <circle cx="85" cy="80" r="12" fill="#334155" />
      <circle cx="115" cy="80" r="12" fill="#334155" />
      <path d="M 85 98 Q 100 110 115 98" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 200 Q 100 150 150 200 Z" fill="#334155" />
    </svg>
  );
}

type Props = {
  tl?: Timeline;
};

export function OneCardXIDCardsView({}: Props) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 pt-4">
      {/* 1. Centered Header */}
      <div className="text-center space-y-1.5">
        <h1
          data-tl="idcards-title"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Welcome to your ID cards
        </h1>
        <p
          data-tl="idcards-subtitle"
          className="text-xs text-gray-500"
        >
          Tap to view, edit, and manage your cards.
        </p>
      </div>

      {/* 2. Two Cards Grid */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* Card 1: Default ID card */}
        <div
          data-tl="idcard-item-default"
          className="w-[260px] rounded-2xl bg-white border border-gray-200/80 shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
        >
          <div className="relative h-60 w-full bg-slate-800">
            <OcxPortraitFace />
            {/* Purple curve accent */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#7014D9]" />
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Sam Taylor</h3>
              <p className="text-xs text-gray-500 mt-0.5">Acme Ltd</p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-1 rounded-full bg-[#7014D9]" />
                <span className="font-semibold text-gray-700">ID C...</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 font-semibold text-amber-700 text-[9px]">
                  Default
                </span>
                <span className="rounded-full bg-purple-100 px-2 py-0.5 font-semibold text-purple-700 text-[9px]">
                  Org
                </span>
              </div>
              <span className="text-gray-400">24/09/2026</span>
            </div>
          </div>
        </div>

        {/* Card 2: New Engineering Team Org card */}
        <div
          data-tl="idcard-item-engineering-team"
          className="w-[260px] rounded-2xl bg-white border border-gray-200/80 shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
        >
          <div className="relative h-60 w-full bg-slate-800">
            <OcxPortraitFace />
            {/* Logo at top right */}
            <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#7014D9] text-white shadow-xs">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            {/* Teal wave accent */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#0D9488]" />
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900">Sam Taylor</h3>
              <p className="text-xs text-gray-500 mt-0.5">Product Designer at Acme Ltd</p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7014D9] text-white">
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-1 rounded-full bg-[#7014D9]" />
                <span className="font-semibold text-gray-700 truncate max-w-[80px]">
                  Engineering Te...
                </span>
                <span className="rounded-full bg-purple-100 px-2 py-0.5 font-semibold text-purple-700 text-[9px]">
                  Org
                </span>
              </div>
              <span className="text-gray-400">02/11/2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
