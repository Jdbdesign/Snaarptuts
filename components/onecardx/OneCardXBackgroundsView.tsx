"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { VIRTUAL_BACKGROUNDS_CATEGORIES } from "./onecardx-data";

type Props = {
  tl: Timeline;
};

export function OneCardXBackgroundsView({ tl }: Props) {
  const activeLayout = useTimelineVar<
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left"
  >(tl, "ocxBgLayout", "bottom-left");

  const selectedBg = useTimelineVar(tl, "ocxSelectedBg", "sunset-lake");
  const uploadedBg = useTimelineVar(tl, "ocxUploadedBg", false);
  const showName = useTimelineVar(tl, "ocxShowName", true);
  const showTitle = useTimelineVar(tl, "ocxShowTitle", true);
  const showCompany = useTimelineVar(tl, "ocxShowCompany", true);
  const showEmail = useTimelineVar(tl, "ocxShowEmail", false);
  const showPhone = useTimelineVar(tl, "ocxShowPhone", false);
  const showQr = useTimelineVar(tl, "ocxShowQr", true);

  // Layout badge and QR positions
  const isBottomLeft = activeLayout === "bottom-left";
  const isBottomRight = activeLayout === "bottom-right";
  const isTopLeft = activeLayout === "top-left";
  const isTopRight = activeLayout === "top-right";
  const isCenterLeft = activeLayout === "center-left";

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 Cols): Live 16:9 Virtual Background Mockup */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          <div
            data-tl="bg-preview-card"
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200 select-none flex flex-col justify-between p-4"
          >
            {/* Background Image / Gradient */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-300 ${
                uploadedBg
                  ? "bg-gradient-to-tr from-emerald-900 via-teal-800 to-sky-700"
                  : selectedBg === "sunset-lake"
                  ? "bg-gradient-to-tr from-amber-600 via-orange-500 to-rose-900"
                  : selectedBg === "beach-waves"
                  ? "bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-700"
                  : selectedBg === "golden-meadow"
                  ? "bg-gradient-to-tr from-yellow-500 via-amber-600 to-orange-800"
                  : selectedBg === "deep-ocean"
                  ? "bg-gradient-to-tr from-blue-700 via-indigo-800 to-slate-950"
                  : selectedBg === "purple-flow"
                  ? "bg-gradient-to-tr from-purple-800 via-purple-600 to-indigo-900"
                  : selectedBg === "pastel-mesh"
                  ? "bg-gradient-to-tr from-pink-300 via-yellow-200 to-cyan-300"
                  : selectedBg === "curved-lines"
                  ? "bg-gradient-to-tr from-slate-200 via-gray-300 to-slate-400"
                  : "bg-gradient-to-tr from-orange-700 via-rose-700 to-purple-900"
              }`}
            />

            {/* Subtle scene tree/water overlay details */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* QR Code Container */}
            {showQr && (
              <div
                data-tl="bg-qr-code"
                className={`absolute z-10 p-1.5 bg-white rounded-xl shadow-lg ${
                  isBottomLeft || isCenterLeft
                    ? "top-4 right-4"
                    : isBottomRight
                    ? "top-4 left-4"
                    : isTopLeft
                    ? "bottom-4 right-4"
                    : "bottom-4 left-4"
                }`}
              >
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.5">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
            )}

            {/* User Details Badge Pill */}
            <div
              data-tl="bg-user-badge"
              className={`absolute z-10 max-w-[220px] rounded-2xl bg-black/75 backdrop-blur-md p-3 text-white shadow-xl transition-all duration-300 ${
                isBottomLeft
                  ? "bottom-4 left-4 text-left"
                  : isBottomRight
                  ? "bottom-4 right-4 text-left"
                  : isTopLeft
                  ? "top-4 left-4 text-left"
                  : isTopRight
                  ? "top-4 right-4 text-left"
                  : "top-1/2 left-4 -translate-y-1/2 text-left"
              }`}
            >
              {showName && (
                <div data-tl="bg-badge-name" className="text-xs font-bold leading-tight">
                  Alex Morgan
                </div>
              )}
              {showTitle && (
                <div data-tl="bg-badge-title" className="text-[10px] text-gray-300 leading-tight">
                  Product Designer
                </div>
              )}
              {showCompany && (
                <div data-tl="bg-badge-company" className="text-[10px] text-gray-400 leading-tight">
                  Acme Ltd
                </div>
              )}
              {showEmail && (
                <div className="text-[9px] text-gray-400 mt-1 truncate">
                  alex.morgan@snaarp.com
                </div>
              )}
              {showPhone && (
                <div className="text-[9px] text-gray-400 truncate">
                  +44 20 7946 0192
                </div>
              )}
            </div>
          </div>

          {/* Download Button */}
          <button
            type="button"
            data-tl="btn-download-bg"
            className="w-48 rounded-full bg-[#7014D9] py-2.5 text-xs font-semibold text-white hover:bg-[#5E10B8] transition-colors shadow-sm cursor-pointer text-center"
          >
            Download
          </button>
          <p className="text-[11px] text-gray-400">Saved as a 1920 × 1080 jpg</p>

          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-blue-500">zoom</span>
            <span className="text-purple-600">Teams</span>
            <span className="text-emerald-500">Meet</span>
          </div>
        </div>

        {/* Right Column (7 Cols): Virtual Backgrounds Settings */}
        <div className="lg:col-span-7 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-2xs space-y-6">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Virtual Backgrounds</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Create and download virtual backgrounds that showcase your cards.
            </p>
          </div>

          {/* 1. Card Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">Card</label>
            <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3.5 py-2">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-800">
                <span className="h-3 w-1 rounded-full bg-[#7014D9]" />
                <span>Engineering Team</span>
              </div>
              <button
                type="button"
                data-tl="btn-change-card"
                className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>

          {/* 2. Layout Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">Layout</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: "top-left", name: "Top Left" },
                { id: "top-right", name: "Top Right" },
                { id: "bottom-left", name: "Bottom Left" },
                { id: "bottom-right", name: "Bottom Right" },
                { id: "center-left", name: "Center Left" },
              ].map((layout) => {
                const isSelected = activeLayout === layout.id;
                return (
                  <button
                    key={layout.id}
                    type="button"
                    data-tl={`layout-opt-${layout.id}`}
                    onClick={() => tl.setVar("ocxBgLayout", layout.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#7014D9] bg-[#FBF8FF] text-[#7014D9] ring-1 ring-[#7014D9]"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-4 w-6 rounded-xs bg-gray-200 relative mb-1">
                      <span
                        className={`absolute h-1.5 w-2 rounded-2xs bg-[#7014D9] ${
                          layout.id === "top-left"
                            ? "top-0.5 left-0.5"
                            : layout.id === "top-right"
                            ? "top-0.5 right-0.5"
                            : layout.id === "bottom-left"
                            ? "bottom-0.5 left-0.5"
                            : layout.id === "bottom-right"
                            ? "bottom-0.5 right-0.5"
                            : "top-1 left-0.5"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-medium leading-tight">
                      {layout.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Details to Show */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-700">
              Details to show
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: "name", label: "Name", val: showName, key: "ocxShowName" },
                { id: "title", label: "Job Title", val: showTitle, key: "ocxShowTitle" },
                { id: "company", label: "Company", val: showCompany, key: "ocxShowCompany" },
                { id: "email", label: "Email", val: showEmail, key: "ocxShowEmail" },
                { id: "phone", label: "Phone", val: showPhone, key: "ocxShowPhone" },
                { id: "qr", label: "QR Code", val: showQr, key: "ocxShowQr" },
              ].map((item) => (
                <label
                  key={item.id}
                  data-tl={`detail-toggle-${item.id}`}
                  className="flex items-center gap-2 cursor-pointer text-gray-700"
                >
                  <input
                    type="checkbox"
                    data-tl={`check-detail-${item.id}`}
                    checked={item.val}
                    onChange={(e) => tl.setVar(item.key, e.target.checked)}
                    className="h-4 w-4 rounded-sm border-gray-300 text-[#7014D9] focus:ring-[#7014D9]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Backgrounds Grid */}
          <div className="space-y-4 pt-1 border-t border-gray-100">
            <div>
              <label className="block text-xs font-semibold text-gray-700">
                Backgrounds
              </label>
              <div className="mt-2 space-y-1">
                <span className="text-[11px] text-gray-500 font-medium">Upload your own</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    data-tl="btn-upload-background"
                    onClick={() => {
                      tl.setVar("ocxUploadedBg", true);
                      tl.setVar("ocxSelectedBg", "uploaded");
                    }}
                    className="flex h-16 w-24 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-[10px] text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Upload</span>
                  </button>

                  {uploadedBg && (
                    <button
                      type="button"
                      data-tl="thumb-bg-uploaded"
                      onClick={() => {
                        tl.setVar("ocxUploadedBg", true);
                        tl.setVar("ocxSelectedBg", "uploaded");
                      }}
                      className="relative h-16 w-24 rounded-xl overflow-hidden border-2 border-[#7014D9] shadow-xs bg-gradient-to-tr from-emerald-900 via-teal-800 to-sky-700 cursor-pointer"
                    >
                      <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7014D9] text-white text-[9px] font-bold">
                        ✓
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Featured & Categories */}
            {VIRTUAL_BACKGROUNDS_CATEGORIES.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <span className="text-[11px] text-gray-500 font-medium">{cat.name}</span>
                <div className="grid grid-cols-4 gap-2">
                  {cat.items.map((item) => {
                    const isSelected = selectedBg === item.id && !uploadedBg;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-tl={`thumb-bg-${item.id}`}
                        onClick={() => {
                          tl.setVar("ocxUploadedBg", false);
                          tl.setVar("ocxSelectedBg", item.id);
                        }}
                        className={`relative h-14 rounded-xl overflow-hidden bg-gradient-to-tr ${item.gradient} transition-all cursor-pointer ${
                          isSelected
                            ? "ring-2 ring-[#7014D9] ring-offset-1"
                            : "hover:opacity-90"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7014D9] text-white text-[9px] font-bold">
                            ✓
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
