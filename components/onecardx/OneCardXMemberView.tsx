"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

function OcxPortraitFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" className={`w-full h-full object-cover ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ocxMemberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="200" height="240" fill="url(#ocxMemberGrad)" />
      <circle cx="100" cy="85" r="45" fill="#475569" />
      <circle cx="85" cy="80" r="12" fill="#334155" />
      <circle cx="115" cy="80" r="12" fill="#334155" />
      <path d="M 85 98 Q 100 110 115 98" stroke="#1E293B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 200 Q 100 150 150 200 Z" fill="#334155" />
    </svg>
  );
}

type Props = {
  tl: Timeline;
  onEditDetails?: () => void;
  onBackToList?: () => void;
};

export function OneCardXMemberView({ tl, onEditDetails, onBackToList }: Props) {
  const isLandscape = useTimelineVar(tl, "ocxMemberLandscape", false);
  const viewsCount = useTimelineVar(tl, "ocxMemberViews", isLandscape ? 2 : 0);
  const sharesCount = useTimelineVar(tl, "ocxMemberShares", isLandscape ? 1 : 0);
  const copied = useTimelineVar(tl, "ocxMemberLinkCopied", false);

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      {/* 1. Header with Breadcrumb and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button
            type="button"
            data-tl="breadcrumb-cards"
            onClick={onBackToList}
            className="hover:text-purple-700 transition-colors cursor-pointer"
          >
            Cards
          </button>
          <span>&gt;</span>
          <span className="text-gray-900 font-semibold">Engineering Team</span>
        </div>

        <div className="flex items-center gap-2">
          {/* 4 round utility icons */}
          <button
            type="button"
            data-tl="btn-member-download"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-2xs"
            title="Download"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button
            type="button"
            data-tl="btn-member-link"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-2xs"
            title="Link"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button
            type="button"
            data-tl="btn-member-qr"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-2xs"
            title="QR Code"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>
          <button
            type="button"
            data-tl="btn-member-mail"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 shadow-2xs"
            title="Email"
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </button>

          {/* Edit my details button */}
          <button
            type="button"
            data-tl="btn-edit-my-details"
            onClick={onEditDetails}
            className="flex items-center gap-1.5 rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-2xs cursor-pointer"
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Edit my details</span>
          </button>
        </div>
      </div>

      {/* 2. Lavender Notice Banner */}
      <div
        data-tl="member-view-banner"
        className="rounded-2xl border border-purple-200/80 bg-[#FAF5FF] p-4 text-xs text-[#7014D9] leading-relaxed shadow-2xs"
      >
        This card is shared by your organization. Click &apos;Edit my details&apos; to set your own name, title, and photo — the design and shared details stay the same for everyone, and your changes never affect other team members.
      </div>

      {/* 3. Analytics Strip */}
      <div
        data-tl="member-analytics-strip"
        className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#6B7280]">Total views</div>
              <div data-tl="stat-member-views" className="text-xl font-bold text-[#111827]">{viewsCount}</div>
              <div className="text-[10px] text-[#9CA3AF]">Times this card was opened</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#6B7280]">Total shares</div>
              <div data-tl="stat-member-shares" className="text-xl font-bold text-[#111827]">{sharesCount}</div>
              <div className="text-[10px] text-[#9CA3AF]">Times the card link was shared</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-[#6B7280]">Contacts saved</div>
              <div className="text-xl font-bold text-[#111827]">0</div>
              <div className="text-[10px] text-[#9CA3AF]">Times the card was saved as a contact</div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
          <span className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer">
            View all analytics &gt;
          </span>
        </div>
      </div>

      {/* 4. Two Columns: Live Card Mockup & Share Tab with QR Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Card Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          {!isLandscape ? (
            /* Portrait ID Card */
            <div
              data-tl="member-portrait-card"
              className="w-full max-w-[280px] rounded-3xl bg-white shadow-xl overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="relative h-64 w-full bg-slate-900">
                <OcxPortraitFace />
                {/* Verified badge */}
                <div className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#7014D9] text-white shadow-md">
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                {/* Wave bar */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#2563EB]" />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-base font-bold text-gray-900">Your Name</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#7014D9] text-white">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">
                    Fill in details to see your card come to life
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Landscape Split Business Card */
            <div
              data-tl="member-landscape-card"
              className="w-full max-w-[360px] rounded-2xl bg-white shadow-xl overflow-hidden border border-gray-200 flex flex-row h-[190px]"
            >
              {/* Left blue panel */}
              <div className="w-[110px] bg-[#2563EB] p-2.5 flex flex-col items-center justify-between shrink-0">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/80 shadow-xs">
                  <OcxPortraitFace />
                </div>
                <div className="bg-white p-1 rounded-md shadow-xs">
                  <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <span className="text-[8px] text-white/90">Scan to connect</span>
              </div>

              {/* Right white panel */}
              <div className="flex-1 p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#7014D9] text-white mb-1.5">
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">Alex Morgan</h4>
                  <p className="text-[10px] text-gray-500">Product Designer at Acme Ltd</p>
                </div>

                <div className="space-y-1 text-[9px] text-gray-600">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0D9488]">🔗</span>
                    <span>www.acme.example</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-[#0D9488]">🔗</span>
                    <span>www.instagram.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: QR Code and Share Links */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-b border-gray-200">
            <span className="inline-block border-b-2 border-[#7014D9] pb-2 text-xs font-semibold text-[#7014D9]">
              Share
            </span>
          </div>

          <div
            data-tl="member-qr-container"
            className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col items-center justify-center space-y-3"
          >
            <h3 className="text-sm font-bold text-gray-900 self-start">Your QR Code</h3>
            <div className="p-3 bg-white rounded-2xl border border-purple-200 shadow-xs">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#7014D9" strokeWidth="2">
                <rect x="2" y="2" width="8" height="8" rx="1" />
                <rect x="14" y="2" width="8" height="8" rx="1" />
                <rect x="2" y="14" width="8" height="8" rx="1" />
                <rect x="14" y="14" width="8" height="8" rx="1" />
                <circle cx="6" cy="6" r="2" fill="#7014D9" />
                <circle cx="18" cy="6" r="2" fill="#7014D9" />
                <circle cx="6" cy="18" r="2" fill="#7014D9" />
                <circle cx="18" cy="18" r="2" fill="#7014D9" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">Scan or click to preview</p>
          </div>

          <div
            data-tl="member-share-card-container"
            className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs space-y-3"
          >
            <h3 className="text-sm font-bold text-gray-900">Share your card</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                data-tl="member-share-url-input"
                value="https://identity.snaarp.com/c/engineering-team-38805cae"
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs text-gray-700 outline-none"
              />
              <button
                type="button"
                data-tl="btn-member-copy-link"
                onClick={() => tl.setVar("ocxMemberLinkCopied", true)}
                className="rounded-full bg-[#7014D9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
