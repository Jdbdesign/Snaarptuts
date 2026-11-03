"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ACCENT_COLORS,
  CARD_DESIGNS,
  SAMPLE_PORTRAITS,
} from "./onecardx-data";

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
  onSaveCard?: () => void;
};

export function OneCardXEditorView({ tl, onSaveCard }: Props) {
  // State from timeline
  const activeTab = useTimelineVar<"card" | "display" | "information" | "fields">(
    tl,
    "ocxActiveTab",
    "card"
  );
  const cardType = useTimelineVar<"id-card" | "business">(tl, "ocxCardType", "id-card");
  const design = useTimelineVar(tl, "ocxDesign", "classic");
  const photoAdded = useTimelineVar(tl, "ocxPhotoAdded", false);
  const photoModalOpen = useTimelineVar(tl, "ocxPhotoModalOpen", false);
  const photoChooserOpen = useTimelineVar(tl, "ocxPhotoChooserOpen", false);
  const photoUploading = useTimelineVar(tl, "ocxPhotoUploading", false);
  const selectedPhotoIdx = useTimelineVar(tl, "ocxSelectedPhotoIdx", 1);
  const accentColor = useTimelineVar(tl, "ocxAccentColor", "#7014D9");
  const font = useTimelineVar(tl, "ocxFont", "Poppins (Default)");
  const logoAdded = useTimelineVar(tl, "ocxLogoAdded", false);
  const logoModalOpen = useTimelineVar(tl, "ocxLogoModalOpen", false);
  const badgeAdded = useTimelineVar(tl, "ocxBadgeAdded", false);
  const badgeModalOpen = useTimelineVar(tl, "ocxBadgeModalOpen", false);
  const useOwnNameChecked = useTimelineVar(tl, "ocxUseOwnNameChecked", false);
  const firstName = useTimelineVar(tl, "field:first-name", "");
  const prefix = useTimelineVar(tl, "field:prefix", "");
  const lastName = useTimelineVar(tl, "field:last-name", "");
  const pronouns = useTimelineVar(tl, "field:pronouns", "");
  const jobTitle = useTimelineVar(tl, "field:title", "");
  const companyName = useTimelineVar(tl, "field:company", "");
  const fieldWebsite = useTimelineVar(tl, "ocxFieldWebsite", false);
  const fieldInstagram = useTimelineVar(tl, "ocxFieldInstagram", false);
  const websiteUrl = useTimelineVar(tl, "field:website-url", "www.acme.example");
  const instagramUrl = useTimelineVar(tl, "field:instagram-url", "www.instagram.com");
  const fieldEmail = useTimelineVar(tl, "ocxFieldEmail", false);
  const isSaving = useTimelineVar(tl, "ocxSavingCard", false);

  const formattedName = [prefix, firstName, lastName].filter(Boolean).join(" ");
  const fullName = formattedName || "Your Name";

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      {/* 1. Breadcrumb Top Row */}
      <div className="flex items-center justify-between text-xs text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <span>ID Cards</span>
          <span>&gt;</span>
          <span className="font-semibold text-[#111827]">Edit Card</span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout: Left Live Mockup, Right Tabs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Pane (5 Cols): Live Card Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-transparent">
          <div
            data-tl="card-live-preview"
            className="w-[280px] h-[480px] rounded-[28px] bg-white shadow-xl border border-gray-100/80 overflow-hidden relative flex flex-col"
          >
            {/* Upper Photo Area */}
            <div className="relative w-full h-[270px] bg-[#F8F9FA] overflow-hidden flex items-center justify-center">
              {photoAdded ? (
                <div className="w-full h-full">
                  <OcxPortraitFace />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                  <svg
                    width={72}
                    height={72}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.2}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              )}

              {/* Logo Badge (Top-Right) */}
              {logoAdded && (
                <div
                  data-tl="card-preview-logo"
                  className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-[#7014D9] text-white flex items-center justify-center shadow-md border-2 border-white"
                >
                  <span className="text-[11px] font-bold">D</span>
                </div>
              )}

              {/* Wave Banner at bottom of photo area */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                <svg
                  viewBox="0 0 500 80"
                  preserveAspectRatio="none"
                  className="w-full h-10"
                  style={{ fill: accentColor }}
                >
                  <path d="M0,0 C150,60 350,60 500,0 L500,80 L0,80 Z" opacity="0.4" />
                  <path d="M0,20 C180,80 320,80 500,20 L500,80 L0,80 Z" />
                </svg>
              </div>
            </div>

            {/* Lower Details Area */}
            <div className="flex-1 p-5 flex flex-col justify-start bg-white relative">
              {/* Badge Icon on Left if added */}
              {badgeAdded && (
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
              )}

              {/* Name */}
              <h3 className="font-bold text-base text-[#111827] leading-tight">
                {fullName}
              </h3>

              {/* Helper or Role Subtext */}
              {pronouns && (
                <p className="text-[10px] text-[#6B7280] leading-none mt-0.5">
                  ({pronouns})
                </p>
              )}
              {fullName === "Your Name" && !jobTitle ? (
                <p className="text-[11px] text-[#9CA3AF] mt-1.5 leading-snug">
                  Fill in details to see your card come to life
                </p>
              ) : (
                <p className="text-[11px] text-[#6B7280] mt-1">
                  {jobTitle && companyName ? `${jobTitle} at ${companyName}` : jobTitle || companyName || "Product Designer at Acme Ltd"}
                </p>
              )}

              {/* Added Links / Fields */}
              <div className="mt-3 space-y-2">
                {fieldWebsite && (
                  <div
                    data-tl="card-preview-field-website"
                    className="flex items-center gap-2 text-xs text-[#111827] font-medium"
                  >
                    <div className="h-5 w-5 rounded-full bg-[#E6F4EA] text-[#059669] flex items-center justify-center shrink-0">
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <span className="truncate">{websiteUrl}</span>
                  </div>
                )}
                {fieldInstagram && (
                  <div
                    data-tl="card-preview-field-instagram"
                    className="flex items-center gap-2 text-xs text-[#111827] font-medium"
                  >
                    <div className="h-5 w-5 rounded-full bg-[#E6F4EA] text-[#059669] flex items-center justify-center shrink-0">
                      <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <span className="truncate">{instagramUrl}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Pane (7 Cols): Tabs & Configuration Form */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-200/80 bg-white shadow-2xs overflow-hidden flex flex-col">
          {/* Tabs Navigation Header */}
          <div className="flex border-b border-gray-200 px-4 pt-2 bg-white">
            <button
              type="button"
              data-tl="tab-card"
              onClick={() => tl.setVar("ocxActiveTab", "card")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "card"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Card
            </button>
            <button
              type="button"
              data-tl="tab-display"
              onClick={() => tl.setVar("ocxActiveTab", "display")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "display"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Display
            </button>
            <button
              type="button"
              data-tl="tab-information"
              onClick={() => tl.setVar("ocxActiveTab", "information")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "information"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Information
            </button>
            <button
              type="button"
              data-tl="tab-fields"
              onClick={() => tl.setVar("ocxActiveTab", "fields")}
              className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === "fields"
                  ? "border-[#7014D9] text-[#7014D9]"
                  : "border-transparent text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Fields
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 space-y-5">
            {/* ----------------- TAB 1: CARD ----------------- */}
            {activeTab === "card" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">Card Type</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    Choose the type of card. ID and Business cards display different fields.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    data-tl="card-type-id-card"
                    onClick={() => tl.setVar("ocxCardType", "id-card")}
                    className={`rounded-2xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative ${
                      cardType === "id-card"
                        ? "border-[#7014D9] bg-[#FAF5FF] shadow-2xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {cardType === "id-card" && (
                      <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xs shadow-2xs">
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                    <div className="h-9 w-9 rounded-full bg-[#F3E8FF] text-[#7014D9] flex items-center justify-center mb-2">
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="font-semibold text-xs text-[#111827] mb-1">
                      ID Card
                    </span>
                    <p className={`text-[11px] ${cardType === "id-card" ? "text-[#7014D9]" : "text-[#6B7280]"}`}>
                      Name, photo, email, phone, social links
                    </p>
                  </div>

                  <div
                    data-tl="card-type-business"
                    onClick={() => tl.setVar("ocxCardType", "business")}
                    className={`rounded-2xl border p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative ${
                      cardType === "business"
                        ? "border-[#7014D9] bg-[#FAF5FF] shadow-2xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {cardType === "business" && (
                      <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-xs shadow-2xs">
                        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                    <div className="h-9 w-9 rounded-full bg-[#1F2937] text-white flex items-center justify-center mb-2">
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="4" y="2" width="16" height="20" rx="2" />
                        <path d="M9 22v-4h6v4" />
                        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                      </svg>
                    </div>
                    <span className="font-semibold text-xs text-[#111827] mb-1">
                      Business
                    </span>
                    <p className="text-[11px] text-[#6B7280]">
                      Profile, about me, address, social links
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 2: DISPLAY ----------------- */}
            {activeTab === "display" && (
              <div className="space-y-6">
                {/* 1. Design Templates Grid */}
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">Design</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5 mb-3">
                    Choose the layout used for this ID card.
                  </p>

                  <div data-tl="design-grid" className="grid grid-cols-5 gap-2.5">
                    {CARD_DESIGNS.map((d) => {
                      const isSelected = design === d.id;
                      return (
                        <div
                          key={d.id}
                          data-tl={`design-${d.id}`}
                          onClick={() => tl.setVar("ocxDesign", d.id)}
                          className={`rounded-xl border p-2 flex flex-col items-center justify-center h-20 text-[10px] font-medium relative cursor-pointer transition-all ${
                            isSelected
                              ? "border-[#7014D9] bg-purple-50/30 ring-2 ring-[#7014D9]/20 text-[#7014D9]"
                              : "border-gray-200 hover:border-gray-300 text-[#4B5563]"
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1 right-1 h-3.5 w-3.5 rounded-full bg-[#7014D9] text-white flex items-center justify-center text-[8px]">
                              ✓
                            </div>
                          )}
                          <div className="w-10 h-6 rounded bg-gradient-to-r from-purple-600 to-indigo-600 mb-1 opacity-80" />
                          <span className="capitalize">{d.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Profile Photo */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-[#111827]">Profile Photo</h3>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                      PRO
                    </span>
                  </div>
                  <p className="text-xs text-[#6B7280] mb-3">
                    Pick which image to show on the card, or upload your own.
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>

                    <button
                      type="button"
                      data-tl="btn-add-photo"
                      onClick={() => tl.setVar("ocxPhotoModalOpen", true)}
                      className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Add Photo or Video
                    </button>
                  </div>

                  {photoAdded && (
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl overflow-hidden border border-gray-200">
                        <OcxPortraitFace />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => tl.setVar("ocxPhotoModalOpen", true)}
                          className="rounded-full border border-gray-300 px-3.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Update ID image
                        </button>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Your ID image is saved to your account and can be used on any card.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Accent Color */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827]">Accent Color</h3>
                  <p className="text-xs text-[#6B7280] mb-3">
                    Sets accents, buttons, icons, waves, and decorative details.
                  </p>

                  <div data-tl="accent-colors-row" className="flex items-center gap-2.5 flex-wrap p-1">
                    {ACCENT_COLORS.map((c) => {
                      const isSelected = accentColor === c.hex;
                      const isBlue = c.id === "blue";
                      return (
                        <button
                          key={c.id}
                          type="button"
                          data-tl={isBlue ? "swatch-blue" : `swatch-${c.id}`}
                          onClick={() => tl.setVar("ocxAccentColor", c.hex)}
                          className="p-0.5 rounded-sm transition-transform cursor-pointer relative flex items-center justify-center hover:scale-105"
                          title={c.name}
                        >
                          <span
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              isSelected ? "ring-2 ring-offset-2 ring-gray-400" : ""
                            }`}
                            style={{ backgroundColor: c.hex }}
                          >
                            {isSelected && (
                              <span className="text-white text-[10px] font-bold">✓</span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3b. Background Color */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827]">Background Color</h3>
                  <p className="text-xs text-[#6B7280] mb-2.5">
                    Use the style default, or replace previously fixed card surfaces with your own color.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full border border-gray-300 text-[11px] font-medium text-gray-700 bg-white shadow-2xs">
                      Auto
                    </span>
                    <button type="button" className="h-6 w-6 rounded-full border border-purple-500 bg-white" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#374151]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#111827]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#1E3A8A]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#0D9488]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#DC2626]" />
                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-1 cursor-pointer">
                      <span className="h-3.5 w-3.5 border border-gray-400 rounded-2xs inline-block" /> Custom
                    </span>
                  </div>
                </div>

                {/* 3c. Font Color */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827]">Font Color</h3>
                  <p className="text-xs text-[#6B7280] mb-2.5">
                    Use automatic contrast, or select the text color used throughout the card.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full border border-gray-300 text-[11px] font-medium text-gray-700 bg-white shadow-2xs">
                      Auto
                    </span>
                    <button type="button" className="h-6 w-6 rounded-full border border-gray-300 bg-white" />
                    <button type="button" className="h-6 w-6 rounded-full border border-gray-200 bg-gray-100" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#111827] ring-2 ring-purple-600 ring-offset-1" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#1E293B]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#7014D9]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#2563EB]" />
                    <button type="button" className="h-6 w-6 rounded-full bg-[#DC2626]" />
                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-1 cursor-pointer">
                      <span className="h-3.5 w-3.5 bg-[#111827] rounded-2xs inline-block" /> Custom
                    </span>
                  </div>
                </div>

                {/* 4. Font Dropdown */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827]">Font</h3>
                  <div className="mt-2">
                    <select
                      data-tl="select-font"
                      value={font}
                      onChange={(e) => tl.setVar("ocxFont", e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-3 py-2 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                    >
                      <option value="Poppins (Default)">Poppins (Default)</option>
                      <option value="Inter">Inter</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Montserrat">Montserrat</option>
                    </select>
                  </div>
                </div>

                {/* 5. Logo */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827]">Logo</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#7014D9] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      D
                    </div>
                    <button
                      type="button"
                      data-tl="btn-add-logo"
                      onClick={() => tl.setVar("ocxLogoModalOpen", true)}
                      className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Add Logo
                    </button>
                    <span className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer">
                      Remove
                    </span>
                  </div>
                </div>

                {/* 6. Badges */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-[#111827]">Badges</h3>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                      PRO
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-md bg-[#7014D9] text-white flex items-center justify-center shadow-2xs">
                      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                        <path d="m12 13 9-5M12 13l-9-5M12 13v8" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      data-tl="btn-add-badge"
                      onClick={() => tl.setVar("ocxBadgeModalOpen", true)}
                      className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Add Badge
                    </button>
                    <span className="text-xs text-gray-500 hover:text-gray-800 cursor-pointer">
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 3: INFORMATION ----------------- */}
            {activeTab === "information" && (
              <div className="space-y-5">
                {/* Top Lavender Card */}
                <div
                  data-tl="own-name-banner"
                  className="rounded-xl border border-purple-200/60 bg-[#F8F4FF] p-4 flex items-start gap-3"
                >
                  <input
                    type="checkbox"
                    data-tl="checkbox-own-name"
                    checked={useOwnNameChecked}
                    onChange={(e) => tl.setVar("ocxUseOwnNameChecked", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#7014D9] focus:ring-[#7014D9]"
                  />
                  <div>
                    <span className="font-semibold text-xs text-[#111827]">
                      Use each person&apos;s own name
                    </span>
                    <p className="text-[11px] text-[#6B7280] mt-0.5 leading-relaxed">
                      Instead of typing one name below, every assigned member sees their
                      own name, title, and pronouns from their profile — not the name you
                      type here.
                    </p>
                  </div>
                </div>

                {/* Personal Inputs (2 Columns) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#111827]">Personal</h3>
                    <button
                      type="button"
                      className="text-xs text-[#7014D9] hover:underline font-medium cursor-pointer"
                    >
                      Select from profile
                    </button>
                  </div>

                  <div className={`grid grid-cols-2 gap-4 ${useOwnNameChecked ? "opacity-50 pointer-events-none" : ""}`}>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Prefix</label>
                      <input
                        type="text"
                        data-tl="input-prefix"
                        value={prefix}
                        placeholder="Dr., Mr., Ms."
                        onChange={(e) => tl.setVar("field:prefix", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">First Name</label>
                      <input
                        type="text"
                        data-tl="input-first-name"
                        value={firstName}
                        placeholder="First name"
                        onChange={(e) => tl.setVar("field:first-name", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Middle Name</label>
                      <input
                        type="text"
                        placeholder="Middle name"
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Last Name</label>
                      <input
                        type="text"
                        data-tl="input-last-name"
                        value={lastName}
                        placeholder="Last name"
                        onChange={(e) => tl.setVar("field:last-name", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Suffix</label>
                      <input
                        type="text"
                        placeholder="Jr., Sr., III"
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Preferred Name</label>
                      <input
                        type="text"
                        placeholder="Nickname"
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Pronouns</label>
                      <input
                        type="text"
                        data-tl="input-pronouns"
                        value={pronouns}
                        placeholder="he/him, she/her"
                        onChange={(e) => tl.setVar("field:pronouns", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Maiden Name</label>
                      <input
                        type="text"
                        placeholder="Maiden name"
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Work (optional) */}
                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827] mb-2">Work (optional)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Title</label>
                      <input
                        type="text"
                        data-tl="input-title"
                        value={jobTitle}
                        placeholder="Job title"
                        onChange={(e) => tl.setVar("field:title", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-500 mb-1">Company</label>
                      <input
                        type="text"
                        data-tl="input-company"
                        value={companyName}
                        placeholder="Company"
                        onChange={(e) => tl.setVar("field:company", e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 4: FIELDS ----------------- */}
            {activeTab === "fields" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-[#111827]">Added Fields</h3>
                  <p className="text-xs text-[#6B7280] mt-0.5 mb-3">
                    Add email, phone, or social links here. They appear on the business card
                    only after you enter a value.
                  </p>

                  {fieldWebsite && (
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          data-tl="input-field-website"
                          value={websiteUrl}
                          onChange={(e) => tl.setVar("field:website-url", e.target.value)}
                          className="w-full rounded-full border border-gray-300 px-4 py-2 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                        />
                        <span className="absolute right-4 top-2 text-[11px] text-gray-400">
                          Website
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxFieldWebsite", false)}
                        className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {fieldInstagram && (
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          data-tl="input-field-instagram"
                          value={instagramUrl}
                          onChange={(e) => tl.setVar("field:instagram-url", e.target.value)}
                          className="w-full rounded-full border border-gray-300 px-4 py-2 text-xs text-[#111827] focus:border-[#7014D9] focus:outline-hidden"
                        />
                        <span className="absolute right-4 top-2 text-[11px] text-gray-400">
                          Link
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => tl.setVar("ocxFieldInstagram", false)}
                        className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="🔍 Search"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 focus:border-[#7014D9] focus:outline-hidden"
                  />
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-[#111827] mb-1">
                    Additional Fields
                  </h3>
                  <p className="text-xs text-[#6B7280] mb-3">
                    Click the field you want to add to your card.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1.5">
                        MOST POPULAR
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          data-tl="chip-website"
                          onClick={() => tl.setVar("ocxFieldWebsite", true)}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-blue-600" />
                          <span>Website</span>
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-indigo-500" />
                          <span>Link</span>
                        </button>
                        <button
                          type="button"
                          data-tl="chip-instagram"
                          onClick={() => tl.setVar("ocxFieldInstagram", true)}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-[#E1306C]" />
                          <span>Instagram</span>
                        </button>
                        <button
                          type="button"
                          data-tl="chip-email"
                          onClick={() => tl.setVar("ocxFieldEmail", true)}
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                          <span>Email</span>
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          <span>Phone</span>
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <span className="h-2 w-2 rounded-full bg-blue-700" />
                          <span>LinkedIn</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar: Cancel and Save Buttons (Bottom-Right) */}
          <div className="border-t border-gray-200 px-6 py-3 bg-white flex items-center justify-end gap-3 mt-auto">
            <button
              type="button"
              data-tl="btn-cancel-editor"
              className="text-xs font-medium text-gray-600 hover:text-gray-900 cursor-pointer px-3 py-1.5"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tl="btn-save-card"
              onClick={onSaveCard}
              disabled={isSaving}
              className={`rounded-lg px-6 py-2 text-xs font-semibold text-white transition-all shadow-2xs cursor-pointer ${
                isSaving ? "bg-[#852EE6] cursor-wait" : "bg-[#7014D9] hover:bg-[#5E10B8]"
              }`}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MODAL: Add Photo or Video */}
      {photoModalOpen && (
        <div
          data-tl="photo-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4"
        >
          <div
            data-tl="photo-modal"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-base font-bold text-[#111827]">
                Add Photo Or Video
              </h3>
              <button
                type="button"
                onClick={() => tl.setVar("ocxPhotoModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="my-4 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              {photoChooserOpen ? (
                /* In-App Portrait Chooser */
                <div className="w-full space-y-3">
                  <p className="text-xs font-semibold text-[#111827]">
                    Select a photo:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {SAMPLE_PORTRAITS.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        data-tl={`picker-photo-${p.id}`}
                        onClick={() => {
                          tl.setVar("ocxSelectedPhotoIdx", i);
                          tl.setVar("ocxPhotoChooserOpen", false);
                          tl.setVar("ocxPhotoAdded", true);
                        }}
                        className={`rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-20 relative ${
                          selectedPhotoIdx === i
                            ? "border-[#7014D9] ring-2 ring-[#7014D9]/20"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <OcxPortraitFace />
                      </button>
                    ))}
                  </div>
                </div>
              ) : photoAdded ? (
                /* Portrait Uploaded State */
                <div className="flex flex-col items-center">
                  <div className="h-28 w-28 rounded-xl overflow-hidden border border-gray-200">
                    <OcxPortraitFace />
                  </div>
                  <button
                    type="button"
                    onClick={() => tl.setVar("ocxPhotoAdded", false)}
                    className="text-xs text-gray-500 hover:underline mt-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                /* Empty Upload Dropzone */
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 text-gray-400 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-4 4-4 4 4" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-[#111827]">
                    Upload an image or video
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    or drag and drop, or paste it here
                  </p>
                </div>
              )}
              <p className="text-[10px] text-gray-400 mt-4">
                The maximum file size is 20MB.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => tl.setVar("ocxPhotoModalOpen", false)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-choose-file"
                onClick={() => tl.setVar("ocxPhotoChooserOpen", true)}
                className="rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] cursor-pointer shadow-2xs"
              >
                Choose File
              </button>
              <button
                type="button"
                data-tl="btn-add-media"
                onClick={() => {
                  tl.setVar("ocxPhotoUploading", true);
                  setTimeout(() => {
                    tl.setVar("ocxPhotoUploading", false);
                    tl.setVar("ocxPhotoModalOpen", false);
                    tl.setVar("ocxPhotoAdded", true);
                  }, 400);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold text-white transition-all cursor-pointer shadow-2xs ${
                  photoAdded ? "bg-[#7014D9] hover:bg-[#5E10B8]" : "bg-purple-300"
                }`}
              >
                {photoUploading ? "Uploading..." : "Add Media"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: Add Logo */}
      {logoModalOpen && (
        <div
          data-tl="logo-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4"
        >
          <div
            data-tl="logo-modal"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-base font-bold text-[#111827]">Add Logo</h3>
              <button
                type="button"
                onClick={() => tl.setVar("ocxLogoModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="my-4 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <div className="h-10 w-10 text-gray-400 mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-4 4-4 4 4" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#111827]">Upload A Logo</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                or drag and drop, or paste it here
              </p>
              <p className="text-[10px] text-gray-400 mt-4">
                Recommended Size: 512 x 512 pixels, 20MB max file size.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => tl.setVar("ocxLogoModalOpen", false)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-choose-logo-logo-acme"
                onClick={() => {
                  tl.setVar("ocxLogoAdded", true);
                  tl.setVar("ocxLogoModalOpen", false);
                }}
                className="rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] cursor-pointer shadow-2xs"
              >
                Choose File
              </button>
              <button
                type="button"
                onClick={() => {
                  tl.setVar("ocxLogoAdded", true);
                  tl.setVar("ocxLogoModalOpen", false);
                }}
                className="rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] cursor-pointer shadow-2xs"
              >
                Add Logo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL: Add Badge */}
      {badgeModalOpen && (
        <div
          data-tl="badge-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-2xs p-4"
        >
          <div
            data-tl="badge-modal"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
          >
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-base font-bold text-[#111827]">Add Badge</h3>
              <button
                type="button"
                onClick={() => tl.setVar("ocxBadgeModalOpen", false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="my-4 border-2 border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              {badgeAdded ? (
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-2xl bg-[#7014D9] text-white flex items-center justify-center shadow-lg mb-2">
                    <svg
                      width={32}
                      height={32}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
                      <path d="m12 13 9-5M12 13l-9-5M12 13v8" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => tl.setVar("ocxBadgeAdded", false)}
                    className="text-xs text-gray-500 hover:underline mt-1 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 text-gray-400 mb-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M12 12v9m-4-4 4-4 4 4" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-[#111827]">Upload A Badge</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    or drag and drop, or paste it here
                  </p>
                </div>
              )}
              <p className="text-[10px] text-gray-400 mt-4">
                Recommended Size: 512 x 512 pixels, 20MB max file size.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => tl.setVar("ocxBadgeModalOpen", false)}
                className="text-xs font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tl="btn-badge-verified"
                onClick={() => {
                  tl.setVar("ocxBadgeAdded", true);
                  tl.setVar("ocxBadgeModalOpen", false);
                }}
                className="rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] cursor-pointer shadow-2xs"
              >
                Choose File
              </button>
              <button
                type="button"
                onClick={() => {
                  tl.setVar("ocxBadgeAdded", true);
                  tl.setVar("ocxBadgeModalOpen", false);
                }}
                className="rounded-full bg-[#7014D9] px-4 py-2 text-xs font-semibold text-white hover:bg-[#5E10B8] cursor-pointer shadow-2xs"
              >
                Add Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
