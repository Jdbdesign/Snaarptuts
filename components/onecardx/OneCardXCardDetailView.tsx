"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

function OcxPortraitFace({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 240" fill="none" className={`w-full h-full ${className}`}>
      <rect width="200" height="240" fill="#2B2D32" />
      <path d="M20 240 C30 180 60 170 100 170 C140 170 170 180 180 240 Z" fill="#18191C" />
      <path d="M85 150 L100 185 L115 150 Z" fill="#18191C" />
      <path d="M80 120 L80 160 C80 170 120 170 120 160 L120 120 Z" fill="#7C5743" />
      <ellipse cx="100" cy="105" rx="38" ry="48" fill="#8B634B" />
      <path d="M72 105 C72 145 85 155 100 155 C115 155 128 145 128 105 C122 135 110 148 100 148 C90 148 78 135 72 105 Z" fill="#1C1613" />
      <path d="M88 122 C94 118 106 118 112 122 C108 126 92 126 88 122 Z" fill="#1C1613" />
      <path d="M62 90 C62 60 78 52 100 52 C122 52 138 60 138 90 C138 70 125 60 100 60 C75 60 62 70 62 90 Z" fill="#151210" />
      <rect x="74" y="92" width="22" height="16" rx="4" stroke="#111" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
      <rect x="104" y="92" width="22" height="16" rx="4" stroke="#111" strokeWidth="2.5" fill="rgba(255,255,255,0.15)" />
      <line x1="96" y1="100" x2="104" y2="100" stroke="#111" strokeWidth="2.5" />
      <circle cx="85" cy="100" r="2.5" fill="#111" />
      <circle cx="115" cy="100" r="2.5" fill="#111" />
    </svg>
  );
}

type Props = {
  tl: Timeline;
  onOpenPublicPreview?: () => void;
  onClosePublicPreview?: () => void;
  onCopyLink?: () => void;
};

export function OneCardXCardDetailView({
  tl,
  onOpenPublicPreview,
  onCopyLink,
}: Props) {
  const isCopied = useTimelineVar(tl, "ocxLinkCopied", false);
  const firstName = useTimelineVar(tl, "field:first-name", "Alex");
  const lastName = useTimelineVar(tl, "field:last-name", "Morgan");
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : "Your Name";

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* 1. Header & Actions */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-gray-500">
          <span>Organization cards</span>
          <span>&gt;</span>
          <span className="font-semibold text-[#111827]">Engineering Team</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Action icon buttons */}
          <div className="flex items-center gap-1 text-gray-400">
            <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </button>
            <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </button>
            <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            data-tl="btn-edit-card"
            className="flex items-center gap-1.5 rounded-lg bg-[#7014D9] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5E10B8] shadow-2xs cursor-pointer"
          >
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Strip Container */}
      <div
        data-tl="analytics-strip"
        className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {/* Stat 1: Total views */}
          <div className="flex items-center gap-3.5 px-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Total views</p>
              <p className="text-lg font-bold text-[#111827] leading-tight">0</p>
              <p className="text-[10px] text-gray-400">Times this card was opened</p>
            </div>
          </div>

          {/* Stat 2: Total shares */}
          <div className="flex items-center gap-3.5 px-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Total shares</p>
              <p className="text-lg font-bold text-[#111827] leading-tight">0</p>
              <p className="text-[10px] text-gray-400">Times the card link was shared</p>
            </div>
          </div>

          {/* Stat 3: Contacts saved */}
          <div className="flex items-center gap-3.5 px-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Contacts saved</p>
              <p className="text-lg font-bold text-[#111827] leading-tight">0</p>
              <p className="text-[10px] text-gray-400">Times the card was saved as a contact</p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
          <a
            href="#analytics"
            data-tl="link-view-all-analytics"
            className="text-xs font-semibold text-[#7014D9] hover:underline"
          >
            View all analytics &gt;
          </a>
        </div>
      </div>

      {/* 3. Main Detail: Left Card Preview, Right Share & Toolkit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 Cols): Live Card Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <div
            data-tl="card-live-preview"
            className="w-[280px] h-[480px] rounded-[28px] bg-white shadow-xl border border-gray-100/80 overflow-hidden relative flex flex-col"
          >
            {/* Upper Photo Area */}
            <div className="relative w-full h-[270px] bg-[#F8F9FA] overflow-hidden flex items-center justify-center">
              <div className="w-full h-full">
                <OcxPortraitFace />
              </div>

              {/* Logo Badge (Top-Right) */}
              <div
                data-tl="card-preview-logo"
                className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-[#7014D9] text-white flex items-center justify-center shadow-md border-2 border-white"
              >
                <span className="text-[11px] font-bold">D</span>
              </div>

              {/* Wave Banner */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                  viewBox="0 0 500 80"
                  preserveAspectRatio="none"
                  className="w-full h-10 fill-[#2563EB]"
                >
                  <path d="M0,0 C150,60 350,60 500,0 L500,80 L0,80 Z" opacity="0.4" />
                  <path d="M0,20 C180,80 320,80 500,20 L500,80 L0,80 Z" />
                </svg>
              </div>
            </div>

            {/* Lower Details Area */}
            <div className="flex-1 p-5 flex flex-col justify-start bg-white relative">
              <div
                data-tl="card-preview-badge"
                className="h-6 w-6 rounded-md bg-[#7014D9] text-white flex items-center justify-center shadow-2xs mb-2"
              >
                <svg
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                  <path d="m12 13 9-5M12 13l-9-5M12 13v8" />
                </svg>
              </div>

              <h3 className="font-bold text-base text-[#111827] leading-tight">
                {fullName}
              </h3>
              <p className="text-[11px] text-[#6B7280] mt-0.5">
                Software Engineer · Acme Ltd
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#2563EB] font-medium">
                <svg
                  width={13}
                  height={13}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>Website</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Share Tabs, QR Code, Brand Toolkit */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tabs: Share / Settings */}
          <div className="flex border-b border-gray-200">
            <button
              type="button"
              data-tl="tab-share"
              className="px-5 py-2.5 text-xs font-semibold text-[#7014D9] border-b-2 border-[#7014D9] cursor-pointer"
            >
              Share
            </button>
            <button
              type="button"
              data-tl="tab-settings"
              className="px-5 py-2.5 text-xs font-semibold text-[#6B7280] hover:text-[#111827] border-b-2 border-transparent cursor-pointer transition-colors"
            >
              Settings
            </button>
          </div>

          {/* Section: Your QR Code */}
          <div
            data-tl="card-qr-preview"
            onClick={onOpenPublicPreview}
            className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs flex flex-col items-center text-center cursor-pointer hover:border-purple-300 transition-colors"
          >
            <h3 className="text-sm font-bold text-[#111827]">Your QR Code</h3>

            {/* QR Code Graphic with centered purple id logo */}
            <div className="my-4 h-48 w-48 rounded-2xl bg-white p-3 border border-purple-200 shadow-sm relative flex items-center justify-center">
              {/* Simulated QR Pattern */}
              <div className="grid grid-cols-6 gap-1 w-full h-full p-1 opacity-90">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      i % 7 === 0 || i % 3 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                        ? "bg-[#111827]"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>

              {/* Centered Purple ID Badge in QR */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-xl bg-[#7014D9] text-white flex items-center justify-center shadow-md font-bold text-sm tracking-tight border-2 border-white">
                  id
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B7280]">Scan or click to preview</p>
          </div>

          {/* Section: Share your card */}
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#111827]">Share your card</h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                data-tl="input-share-link"
                value="https://identity.snaarp.com/c/engineering-team-38805cae"
                className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-700 font-mono select-all focus:outline-none"
              />
              <button
                type="button"
                data-tl="btn-copy-link"
                onClick={onCopyLink}
                className={`rounded-full px-5 py-2 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer ${
                  isCopied
                    ? "bg-[#059669]"
                    : "bg-[#7014D9] hover:bg-[#5E10B8]"
                }`}
              >
                {isCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>

            <div>
              <span className="text-xs text-gray-400 block mb-2">Or share by</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-tl="btn-share-email"
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  data-tl="btn-share-text"
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>Text</span>
                </button>
              </div>
            </div>
          </div>

          {/* Section: Your Brand Toolkit */}
          <div
            data-tl="brand-toolkit-section"
            className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-[#111827]">
                Your Brand Toolkit
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Extend your card&apos;s reach with email signatures and virtual backgrounds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                data-tl="toolkit-signature-card"
                className="flex items-center gap-3.5 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors bg-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#111827]">
                    Email Signatures
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">
                    Add your card to your email
                  </p>
                </div>
              </div>

              <div
                data-tl="toolkit-background-card"
                className="flex items-center gap-3.5 rounded-xl border border-gray-200 p-4 hover:border-gray-300 transition-colors bg-white"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5EEFF] text-[#7014D9]">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#111827]">
                    Virtual Backgrounds
                  </h4>
                  <p className="text-[11px] text-[#6B7280]">
                    Show your card in video calls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OneCardXPublicPreviewOverlay({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <div
      data-tl="public-card-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
    >
      <div
        data-tl="public-card-card"
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl relative flex flex-col items-center text-center"
      >
        <button
          type="button"
          data-tl="btn-back-to-app"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="h-16 w-16 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xl font-bold mb-3 shadow-md">
          AM
        </div>
        <h2 className="text-lg font-bold text-[#111827]">Alex Morgan</h2>
        <p className="text-xs text-[#6B7280] mt-0.5">Software Engineer · Acme Ltd</p>
        <div className="mt-4 w-full rounded-2xl bg-gray-50 p-3 text-xs text-gray-600 font-mono select-all">
          https://identity.snaarp.com/c/engineering-team-38805cae
        </div>
      </div>
    </div>
  );
}
