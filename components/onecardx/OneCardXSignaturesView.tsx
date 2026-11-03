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
  onChangeCard?: (card: "business" | "id-card") => void;
  onSelectStyle?: (styleIndex: number) => void;
  onSelectApp?: (app: string) => void;
  onSelectOs?: (os: string) => void;
  onCopySignature?: () => void;
};

export function OneCardXSignaturesView({
  tl,
  onChangeCard,
  onSelectStyle,
  onSelectApp,
  onSelectOs,
  onCopySignature,
}: Props) {
  const sigCard = useTimelineVar<"business" | "id-card">(tl, "ocxSigCard", "business");
  const cardDropdownOpen = useTimelineVar(tl, "ocxSigCardDropdownOpen", false);
  const selectedStyle = useTimelineVar<number>(tl, "ocxSigStyle", 3);
  const selectedApp = useTimelineVar<string>(tl, "ocxSigApp", "Gmail");
  const selectedOs = useTimelineVar<string>(tl, "ocxSigOs", "Web");
  const isCopied = useTimelineVar(tl, "ocxSigCopied", false);

  const mailApps = ["Apple", "Gmail", "Other", "Outlook"];
  const osOptions = ["Web", "Mac", "Mobile", "Windows"];

  // Instructions by app & OS
  const getInstructions = () => {
    if (selectedApp === "Gmail" && selectedOs === "Web") {
      return [
        "Copy your signature.",
        'Click the settings gear and click "See all settings".',
        'In the "General" tab, scroll down until you see "Signature".',
        "Click the + button.",
        "Give your signature a name.",
        "Paste the copied signature into the editor.",
        'Click "Save Changes".',
      ];
    }
    if (selectedApp === "Other" || selectedOs === "Mac") {
      return [
        "Copy your signature.",
        "Open your email client settings.",
        "Navigate to the signature section.",
        "Click + to create a new signature.",
        "Paste the copied signature into the editor.",
        "Save your settings.",
      ];
    }
    if (selectedApp === "Outlook") {
      return [
        "Copy your signature.",
        "Click the Settings gear icon.",
        "Select View all Outlook settings.",
        "Go to Mail > Compose and reply.",
        "Under Email signature, click New signature.",
        "Paste your signature into the editor box.",
        "Click Save.",
      ];
    }
    return [
      "Copy your signature.",
      "Open your mail application settings.",
      "Go to Preferences > Signatures.",
      "Create a new signature entry.",
      "Paste the copied signature.",
      "Apply changes and close.",
    ];
  };

  const instructions = getInstructions();

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Pane (7 cols): Live Signature Preview Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[460px] rounded-3xl bg-[#F8F9FA] border border-gray-200/60 p-8">
          <div
            data-tl="signature-preview-card"
            className="w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all animate-in fade-in duration-200"
          >
            {sigCard === "id-card" ? (
              // ID Card Signature layout with purple left strip and link
              <div className="flex rounded-xl overflow-hidden border border-gray-100">
                <div className="w-9 bg-[#7014D9] flex flex-col items-center justify-center gap-2.5 py-4 text-white shrink-0">
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect width={20} height={16} x={2} y={4} rx={2} />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <div className="p-4 flex-1 bg-white">
                  <h3 className="font-bold text-sm text-gray-900 leading-tight">
                    Alex Morgan
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-1 break-all flex items-center gap-1">
                    <span className="text-gray-400">🌐</span>
                    <span>identity.snaarp.com/c/i-d-card-38805cae?p=AcmeLtd</span>
                  </p>
                </div>
              </div>
            ) : selectedStyle === 2 ? (
              // Business Card Style 2 (Row 1 Col 3: Photo on left, Name in center, QR code on right, full-width purple SAVE CONTACT)
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <OcxPortraitFace />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 leading-tight">
                        Alex Morgan
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Product Designer · Acme Ltd
                      </p>
                    </div>
                  </div>

                  {/* Sample QR code */}
                  <div className="h-11 w-11 rounded-md border border-gray-200 p-1 bg-white shrink-0 flex items-center justify-center">
                    <svg width={36} height={36} viewBox="0 0 24 24" fill="currentColor" className="text-gray-900">
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h2v2h-2v-2zm4 0h4v6h-2v-4h-2v-2zm-4 4h2v4h-2v-4zm6 2h2v2h-2v-2z" />
                    </svg>
                  </div>
                </div>

                <button
                  type="button"
                  data-tl="btn-preview-save-contact"
                  className="w-full rounded-lg bg-[#7014D9] py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
                >
                  SAVE CONTACT
                </button>
              </div>
            ) : (
              // Default Business Card Style 3 (Row 1 Col 4: Photo on left, Name in center, purple SAVE CONTACT)
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                    <OcxPortraitFace />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">
                      Alex Morgan
                    </h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Product Designer · Acme Ltd
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  data-tl="btn-preview-save-contact"
                  className="w-full rounded-lg bg-[#7014D9] py-2 text-center text-xs font-bold uppercase tracking-wider text-white shadow-2xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
                >
                  SAVE CONTACT
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane (5 cols): Configuration Controls */}
        <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-2xs">
          {/* 1. Card Section */}
          <div className="relative">
            <h2 className="text-xs font-bold text-gray-900 mb-2">Card</h2>
            <div
              data-tl="sig-card-container"
              className="flex items-center justify-between rounded-xl border border-gray-200 p-3 bg-white hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="h-4 w-1 rounded-full bg-[#7014D9]" />
                <span data-tl="sig-active-card-name" className="text-xs font-semibold text-gray-900">
                  {sigCard === "business" ? "Business Card" : "I D Card"}
                </span>
              </div>
              <button
                type="button"
                data-tl="btn-change-sig-card"
                onClick={() => tl.setVar("ocxSigCardDropdownOpen", !cardDropdownOpen)}
                className="text-xs font-medium text-[#7014D9] hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Dropdown Options */}
            {cardDropdownOpen && (
              <div
                data-tl="sig-card-dropdown"
                className="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl animate-in fade-in zoom-in-95 duration-100"
              >
                <button
                  type="button"
                  data-tl="sig-card-opt-business"
                  onClick={() => {
                    tl.setVar("ocxSigCard", "business");
                    tl.setVar("ocxSigCardDropdownOpen", false);
                    onChangeCard?.("business");
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                    sigCard === "business"
                      ? "bg-[#F5EEFF] text-[#7014D9] font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="h-3.5 w-1 rounded-full bg-[#7014D9]" />
                  <span>Business Card</span>
                </button>
                <button
                  type="button"
                  data-tl="sig-card-opt-id"
                  onClick={() => {
                    tl.setVar("ocxSigCard", "id-card");
                    tl.setVar("ocxSigCardDropdownOpen", false);
                    onChangeCard?.("id-card");
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                    sigCard === "id-card"
                      ? "bg-[#F5EEFF] text-[#7014D9] font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="h-3.5 w-1 rounded-full bg-[#7014D9]" />
                  <span>I D Card</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. Style Grid Section (18 tiles: 5 + 5 + 5 + 3) */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 mb-2">Style</h2>
            <div
              data-tl="sig-styles-grid"
              className="grid grid-cols-5 gap-2"
            >
              {Array.from({ length: 18 }).map((_, idx) => {
                const isSelected = selectedStyle === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    data-tl={`sig-style-tile-${idx}`}
                    onClick={() => {
                      tl.setVar("ocxSigStyle", idx);
                      onSelectStyle?.(idx);
                    }}
                    className={`h-11 rounded-xl border flex items-center justify-center p-1 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#7014D9] bg-[#F5EEFF] ring-2 ring-[#7014D9]/25 shadow-2xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {/* Wireframe thumbnail representations */}
                    {idx === 0 ? (
                      <div className="flex h-full w-full items-center gap-1 rounded bg-gray-50 p-1">
                        <div className="h-full w-2 rounded-xs bg-[#7014D9]" />
                        <div className="space-y-1 flex-1">
                          <div className="h-1 w-full bg-gray-300 rounded-xs" />
                          <div className="h-1 w-2/3 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                    ) : idx === 2 ? (
                      // Style 2 with QR
                      <div className="flex h-full w-full items-center justify-between rounded bg-gray-50 p-1">
                        <div className="h-4 w-4 rounded-full bg-gray-300" />
                        <div className="h-3 w-3 bg-gray-800 rounded-2xs" />
                      </div>
                    ) : idx === 3 ? (
                      // Style 3 with purple accent
                      <div className="flex h-full w-full flex-col justify-between rounded bg-gray-50 p-1">
                        <div className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded-full bg-gray-300" />
                          <div className="h-1 w-4 bg-gray-400 rounded-xs" />
                        </div>
                        <div className="h-1.5 w-full bg-[#7014D9] rounded-xs" />
                      </div>
                    ) : idx === 7 || idx === 12 ? (
                      // Dark badge tile
                      <div className="flex h-full w-full items-center justify-center rounded bg-[#111827] p-1">
                        <div className="h-1.5 w-6 bg-white/70 rounded-xs" />
                      </div>
                    ) : (
                      // Standard mini wireframe
                      <div className="flex h-full w-full items-center gap-1 rounded bg-gray-50 p-1">
                        <div className="h-3 w-3 rounded-xs bg-gray-300" />
                        <div className="space-y-1 flex-1">
                          <div className="h-1 w-full bg-gray-300 rounded-xs" />
                          <div className="h-1 w-1/2 bg-gray-200 rounded-xs" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Platform Section */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 mb-1">Platform</h2>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              MAIL APP
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mailApps.map((app) => {
                const isSelected = selectedApp === app;
                return (
                  <button
                    key={app}
                    type="button"
                    data-tl={`sig-app-${app.toLowerCase()}`}
                    onClick={() => {
                      tl.setVar("ocxSigApp", app);
                      onSelectApp?.(app);
                    }}
                    className={`px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#7014D9] bg-[#F5EEFF] text-[#7014D9] font-semibold"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {app}
                  </button>
                );
              })}
            </div>

            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-1.5">
              OS
            </div>
            <div className="flex flex-wrap gap-1.5">
              {osOptions.map((os) => {
                const isSelected = selectedOs === os;
                return (
                  <button
                    key={os}
                    type="button"
                    data-tl={`sig-os-${os.toLowerCase()}`}
                    onClick={() => {
                      tl.setVar("ocxSigOs", os);
                      onSelectOs?.(os);
                    }}
                    className={`px-3 py-1 rounded-full border text-xs font-medium cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#7014D9] bg-[#F5EEFF] text-[#7014D9] font-semibold"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {os}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Apply Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-gray-900">Apply</h2>
              <button
                type="button"
                data-tl={isCopied ? "btn-copied-signature" : "btn-copy-signature"}
                onClick={() => {
                  tl.setVar("ocxSigCopied", true);
                  onCopySignature?.();
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer ${
                  isCopied
                    ? "bg-emerald-600 text-white"
                    : "bg-[#7014D9] text-white hover:bg-[#5E10B8]"
                }`}
              >
                {isCopied ? (
                  <>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <rect width={14} height={14} x={8} y={8} rx={2} ry={2} />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" strokeLinecap="round" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="mb-2">
              <span
                data-tl="sig-apply-tag"
                className="inline-block rounded-md bg-[#F5EEFF] px-2.5 py-0.5 text-[11px] font-semibold text-[#7014D9]"
              >
                {selectedApp} · {selectedOs}
              </span>
            </div>

            {/* Scrollable Numbered Instructions */}
            <div
              data-tl="sig-apply-instructions"
              className="max-h-44 overflow-y-auto space-y-2 pr-1.5 text-xs text-gray-700 border-t border-gray-100 pt-2"
            >
              {instructions.map((text, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5EEFF] text-[#7014D9] font-bold text-[10px]">
                    {i + 1}
                  </div>
                  <p className="pt-0.5 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
