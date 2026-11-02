"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { URLS } from "./onecardx-data";

type Props = {
  tl: Timeline;
  onOpenPublicPreview?: () => void;
  onClosePublicPreview?: () => void;
  onCopyLink?: () => void;
};

export function OneCardXCardDetailView({
  tl,
  onOpenPublicPreview,
  onClosePublicPreview,
  onCopyLink,
}: Props) {
  const isCopied = useTimelineVar(tl, "ocxLinkCopied", false);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E7EB] bg-white px-5 py-3.5 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6B7280]">Organization cards</span>
          <span className="text-[#D1D5DB]">/</span>
          <span className="font-semibold text-[#111827]">Engineering Team</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-top-preview"
            onClick={onOpenPublicPreview}
            className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-2xs"
          >
            <Icon name="cfApps" size={13} />
            <span>Preview</span>
          </button>
          <button
            type="button"
            data-tl="btn-edit-card"
            className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#5E10B8] shadow-xs"
          >
            <Icon name="pencil" size={13} />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* 2. Analytics Strip */}
      <div
        data-tl="analytics-strip"
        className="grid grid-cols-1 sm:grid-cols-4 gap-4"
      >
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-2xs">
          <p className="text-xs text-[#6B7280]">Total views</p>
          <p className="text-xl font-bold text-[#111827] mt-1">0</p>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-2xs">
          <p className="text-xs text-[#6B7280]">Total shares</p>
          <p className="text-xl font-bold text-[#111827] mt-1">0</p>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-2xs">
          <p className="text-xs text-[#6B7280]">Contacts saved</p>
          <p className="text-xl font-bold text-[#111827] mt-1">0</p>
        </div>
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-2xs flex flex-col justify-between">
          <p className="text-xs text-[#6B7280]">Real-time Tracking</p>
          <a
            href="#analytics"
            data-tl="link-view-all-analytics"
            className="text-xs font-semibold text-[#7014D9] hover:underline"
          >
            View all analytics &rarr;
          </a>
        </div>
      </div>

      {/* 3. Detail Tabs (Share / Settings) */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-2xs overflow-hidden">
        <div className="flex border-b border-[#F3F4F6] px-5 pt-3">
          <button
            type="button"
            data-tl="tab-share"
            className="border-b-2 border-[#7014D9] px-4 py-2 text-xs font-semibold text-[#7014D9]"
          >
            Share
          </button>
          <button
            type="button"
            data-tl="tab-settings"
            className="border-b-2 border-transparent px-4 py-2 text-xs font-semibold text-[#6B7280] hover:text-[#111827]"
          >
            Settings
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Section A: QR Code & Direct Link */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* QR Code Card (5 Cols) */}
            <div
              data-tl="card-qr-preview"
              onClick={onOpenPublicPreview}
              className="md:col-span-5 rounded-2xl border border-purple-100 bg-purple-50/20 p-6 flex flex-col items-center text-center cursor-pointer hover:border-[#7014D9] transition-all group"
            >
              <h3 className="text-sm font-semibold text-[#111827]">
                Your QR Code
              </h3>
              <p className="text-[11px] text-[#6B7280] mt-0.5">
                Scan or click to preview
              </p>

              {/* Simulated QR Code graphic */}
              <div className="my-5 h-44 w-44 rounded-2xl bg-white p-3 shadow-md border border-gray-100 flex flex-col items-center justify-between group-hover:scale-105 transition-transform">
                <div className="grid grid-cols-4 gap-1.5 h-full w-full">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 5 === 0
                          ? "bg-[#111827]"
                          : "bg-purple-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <span className="text-xs font-semibold text-[#7014D9] flex items-center gap-1 group-hover:underline">
                <span>Open card preview</span>
                <Icon name="chevronRight" size={12} />
              </span>
            </div>

            {/* Direct Link & Share Options (7 Cols) */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-[#111827]">
                  Share your card
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Anyone with this link can view the card and save contact details.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    data-tl="input-share-link"
                    value={URLS.publicPreview}
                    className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-3.5 py-2 text-xs text-[#374151] select-all font-mono"
                  />
                  <button
                    type="button"
                    data-tl="btn-copy-link"
                    onClick={onCopyLink}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold text-white transition-all shadow-xs cursor-pointer ${
                      isCopied
                        ? "bg-[#059669]"
                        : "bg-[#7014D9] hover:bg-[#5E10B8]"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Icon name="check" size={13} />
                        <span data-tl="copied-state">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Icon name="edShare" size={13} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-semibold text-[#6B7280] block mb-2">
                  Or share by:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-tl="btn-share-email"
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Icon name="mail" size={13} />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    data-tl="btn-share-text"
                    className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Icon name="chat" size={13} />
                    <span>Text</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Your Brand Toolkit */}
          <div
            data-tl="brand-toolkit-section"
            className="border-t border-gray-100 pt-6 space-y-4"
          >
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">
                Your Brand Toolkit
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                Download assets and virtual backgrounds matching this card.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                data-tl="toolkit-signature-card"
                className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4 hover:border-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB]">
                    <Icon name="pencil" size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#111827]">
                      Email Signatures
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">
                      HTML signature with embedded QR code.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Create
                </button>
              </div>

              <div
                data-tl="toolkit-background-card"
                className="flex items-center justify-between rounded-xl border border-[#E5E7EB] p-4 hover:border-gray-300"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-[#7014D9]">
                    <Icon name="edImage" size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#111827]">
                      Virtual Backgrounds
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Video conferencing backgrounds with QR code.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Generate
                </button>
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
      data-tl="public-preview-stage"
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] p-4 animate-in fade-in duration-200"
    >
      {/* Top Return Chip */}
      <div className="absolute top-6 left-6 z-20">
        <button
          type="button"
          data-tl="btn-back-to-app"
          onClick={onClose}
          className="relative z-10 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-colors shadow-lg cursor-pointer"
        >
          <Icon name="chevronLeft" size={14} />
          <span>Back to the app</span>
        </button>
      </div>

      {/* Centered Digital Business Card Presentation */}
      <div
        data-tl="public-card-card"
        className="w-full max-w-[360px] rounded-3xl bg-white shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-200"
      >
        {/* Header Accent Wave */}
        <div className="h-32 w-full bg-[#2563EB] relative p-4 flex items-start justify-between">
          <span className="text-[11px] font-semibold text-white/80 uppercase tracking-wider">
            Acme Ltd
          </span>
          <div className="h-8 w-8 rounded-lg bg-white/90 text-[#7014D9] flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
        </div>

        {/* Avatar & Card Details */}
        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6">
            <div className="h-24 w-24 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-3xl border-4 border-white shadow-lg">
              AM
            </div>
          </div>

          <div className="pt-14">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-[#111827]">
                Alex Morgan
              </h3>
              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white">
                <Icon name="check" size={10} />
              </span>
            </div>
            <p className="text-xs text-[#4B5563] font-medium mt-0.5">
              Software Engineer · Acme Ltd
            </p>

            {/* Primary Action Button */}
            <button
              type="button"
              data-tl="public-btn-save-contact"
              className="mt-5 w-full rounded-xl bg-[#2563EB] py-3 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors text-center"
            >
              Save Contact
            </button>

            {/* Contact Links */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 text-xs text-gray-700">
                <Icon name="globe" size={15} className="text-[#2563EB]" />
                <span className="font-medium truncate">acme-studio.com</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 text-xs text-gray-700">
                <Icon name="edCamera" size={15} className="text-[#2563EB]" />
                <span className="font-medium truncate">@alexmorgan</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-2.5 text-xs text-gray-700">
                <Icon name="mail" size={15} className="text-[#2563EB]" />
                <span className="font-medium truncate">alex.morgan@acme.com</span>
              </div>
            </div>

            {/* Card Footer Stamp */}
            <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span>Powered by Snaarp OneCardX</span>
              <div className="h-6 w-6 rounded bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-[8px]">
                QR
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
