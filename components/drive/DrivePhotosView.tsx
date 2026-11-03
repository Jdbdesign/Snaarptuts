"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Sparkles,
  Grid,
  Image as ImageIcon,
  Star,
  SlidersHorizontal,
  Upload,
  Calendar,
  Search,
  ChevronUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { SAMPLE_PHOTOS } from "./drive-data";

type Props = {
  tl: Timeline;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr",
  "May", "Jun", "Jul", "Aug",
  "Sep", "Oct", "Nov", "Dec",
];

export function DrivePhotosView({ tl }: Props) {
  const activeTab = useTimelineVar<string>(tl, "drivePhotosTab", "gallery");
  const layoutOpen = useTimelineVar(tl, "drivePhotosLayoutOpen", false);
  const layout = useTimelineVar<string>(tl, "drivePhotosLayout", "river");
  const density = useTimelineVar<string>(tl, "drivePhotosDensity", "roomy");
  const dateMode = useTimelineVar<string>(tl, "drivePhotosDateMode", "inline");
  const monthOpen = useTimelineVar(tl, "drivePhotosMonthOpen", false);
  const month = useTimelineVar(tl, "drivePhotosMonth", "Nov 2026");
  const loading = useTimelineVar(tl, "drivePhotosLoading", false);

  const handleTabChange = (tab: string) => {
    tl.setVar("drivePhotosTab", tab);
    let url = "drive.snaarp.com/photos";
    if (tab === "moments") url = "drive.snaarp.com/photos?tab=moments";
    if (tab === "albums") url = "drive.snaarp.com/photos?tab=albums";
    if (tab === "favorites") url = "drive.snaarp.com/photos?tab=favorites";
    tl.setUrl(url);
  };

  return (
    <div
      data-tl="drive-photos-view"
      className="space-y-6 font-['Poppins',sans-serif] text-[#111827] pb-16"
    >
      {/* 1. Top Sub-Tabs Row */}
      <div className="flex items-center justify-between border-b border-[#EBECEF] pb-3">
        {/* Sub-tabs */}
        <div className="flex items-center gap-6 text-[13px] font-medium text-[#6B7280]">
          <button
            type="button"
            data-tl="tab-photos-moments"
            onClick={() => handleTabChange("moments")}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === "moments"
                ? "text-[#7014D9] font-semibold"
                : "hover:text-[#111827]"
            }`}
          >
            <Sparkles size={18} />
            <span>Moments</span>
            {activeTab === "moments" && (
              <div className="h-0.5 w-6 rounded-full bg-[#7014D9]" />
            )}
          </button>

          <button
            type="button"
            data-tl="tab-photos-gallery"
            onClick={() => handleTabChange("gallery")}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === "gallery"
                ? "text-[#7014D9] font-semibold"
                : "hover:text-[#111827]"
            }`}
          >
            <Grid size={18} />
            <span>Gallery</span>
            {activeTab === "gallery" && (
              <div className="h-0.5 w-6 rounded-full bg-[#7014D9]" />
            )}
          </button>

          <button
            type="button"
            data-tl="tab-photos-albums"
            onClick={() => handleTabChange("albums")}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === "albums"
                ? "text-[#7014D9] font-semibold"
                : "hover:text-[#111827]"
            }`}
          >
            <ImageIcon size={18} />
            <span>Albums</span>
            {activeTab === "albums" && (
              <div className="h-0.5 w-6 rounded-full bg-[#7014D9]" />
            )}
          </button>

          <button
            type="button"
            data-tl="tab-photos-favorites"
            onClick={() => handleTabChange("favorites")}
            className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
              activeTab === "favorites"
                ? "text-[#7014D9] font-semibold"
                : "hover:text-[#111827]"
            }`}
          >
            <Star size={18} />
            <span>Favorites</span>
            {activeTab === "favorites" && (
              <div className="h-0.5 w-6 rounded-full bg-[#7014D9]" />
            )}
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="relative flex items-center gap-3">
          <button
            type="button"
            data-tl="btn-photos-layout"
            onClick={() => tl.setVar("drivePhotosLayoutOpen", !layoutOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#4B5563] shadow-2xs hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={14} />
            <span>Layout</span>
          </button>

          {activeTab !== "favorites" && (
            <button
              type="button"
              data-tl="btn-photos-add"
              className="flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-3.5 py-1.5 text-[12px] font-semibold text-white shadow-xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
            >
              <Upload size={14} />
              <span>Add photos</span>
            </button>
          )}

          {/* Layout Popover */}
          {layoutOpen && (
            <div
              data-tl="photos-layout-popover"
              className="absolute right-0 top-11 z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl text-[12px] animate-in fade-in zoom-in-95 duration-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Layout: River, Waterfall, Square */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#6B7280]">Layout</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    data-tl="layout-opt-river"
                    onClick={() => tl.setVar("drivePhotosLayout", "river")}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all cursor-pointer ${
                      layout === "river"
                        ? "border-[#7014D9] bg-purple-50/50 ring-1 ring-[#7014D9]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex gap-1 h-5 w-7">
                      <div className="flex-1 rounded bg-[#7014D9]" />
                      <div className="flex-1 rounded bg-[#7014D9]" />
                    </div>
                    <span className="text-[11px] font-medium text-[#111827]">River</span>
                  </button>

                  <button
                    type="button"
                    data-tl="layout-opt-waterfall"
                    onClick={() => tl.setVar("drivePhotosLayout", "waterfall")}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all cursor-pointer ${
                      layout === "waterfall"
                        ? "border-[#7014D9] bg-purple-50/50 ring-1 ring-[#7014D9]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 h-5 w-7 justify-center">
                      <div className="h-1.5 w-full rounded bg-gray-400" />
                      <div className="h-2 w-3/4 rounded bg-gray-400" />
                    </div>
                    <span className="text-[11px] font-medium text-[#4B5563]">Waterfall</span>
                  </button>

                  <button
                    type="button"
                    data-tl="layout-opt-square"
                    onClick={() => tl.setVar("drivePhotosLayout", "square")}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition-all cursor-pointer ${
                      layout === "square"
                        ? "border-[#7014D9] bg-purple-50/50 ring-1 ring-[#7014D9]"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-0.5 h-5 w-5">
                      <div className="rounded bg-gray-400" />
                      <div className="rounded bg-gray-400" />
                      <div className="rounded bg-gray-400" />
                      <div className="rounded bg-gray-400" />
                    </div>
                    <span className="text-[11px] font-medium text-[#4B5563]">Square</span>
                  </button>
                </div>
              </div>

              {/* Density: Roomy, Compact */}
              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-semibold text-[#6B7280]">Density</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-tl="density-opt-roomy"
                    onClick={() => tl.setVar("drivePhotosDensity", "roomy")}
                    className={`flex-1 rounded-full border py-1 text-center font-medium transition-colors cursor-pointer ${
                      density === "roomy"
                        ? "border-[#7014D9] text-[#7014D9] bg-purple-50/40"
                        : "border-gray-200 text-[#4B5563] hover:bg-gray-50"
                    }`}
                  >
                    Roomy
                  </button>
                  <button
                    type="button"
                    data-tl="density-opt-compact"
                    onClick={() => tl.setVar("drivePhotosDensity", "compact")}
                    className={`flex-1 rounded-full border py-1 text-center font-medium transition-colors cursor-pointer ${
                      density === "compact"
                        ? "border-[#7014D9] text-[#7014D9] bg-purple-50/40"
                        : "border-gray-200 text-[#4B5563] hover:bg-gray-50"
                    }`}
                  >
                    Compact
                  </button>
                </div>
              </div>

              {/* Date: Inline, Dynamic */}
              <div className="mt-4 space-y-1.5">
                <span className="text-[11px] font-semibold text-[#6B7280]">Date</span>
                <p className="text-[10px] text-[#9CA3AF] leading-snug">
                  Inline shows a date above each group. Dynamic keeps one sticky date as you scroll.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    data-tl="date-opt-dynamic"
                    onClick={() => tl.setVar("drivePhotosDateMode", "dynamic")}
                    className={`flex-1 rounded-full border py-1 text-center font-medium transition-colors cursor-pointer ${
                      dateMode === "dynamic"
                        ? "border-[#7014D9] text-[#7014D9] bg-purple-50/40"
                        : "border-gray-200 text-[#4B5563] hover:bg-gray-50"
                    }`}
                  >
                    Dynamic
                  </button>
                  <button
                    type="button"
                    data-tl="date-opt-inline"
                    onClick={() => tl.setVar("drivePhotosDateMode", "inline")}
                    className={`flex-1 rounded-full border py-1 text-center font-medium transition-colors cursor-pointer ${
                      dateMode === "inline"
                        ? "border-[#7014D9] text-[#7014D9] bg-purple-50/40"
                        : "border-gray-200 text-[#4B5563] hover:bg-gray-50"
                    }`}
                  >
                    Inline
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Gallery Tab Content */}
      {activeTab === "gallery" && (
        <div className="space-y-4">
          {/* Header Row: Gallery title + Month chip */}
          <div className="relative flex items-center gap-3">
            <h1 className="text-[20px] font-bold text-[#111827]">Gallery</h1>
            <button
              type="button"
              data-tl="btn-photos-month-picker"
              onClick={() => tl.setVar("drivePhotosMonthOpen", !monthOpen)}
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12px] font-medium text-[#4B5563] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <span>{month}</span>
              <Calendar size={13} className="text-gray-400" />
            </button>

            {/* Month Picker Popover */}
            {monthOpen && (
              <div
                data-tl="photos-month-popover"
                className="absolute left-24 top-9 z-50 w-52 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-2 pb-2 border-b border-gray-100">
                  <span className="text-[13px] font-bold text-[#111827]">2026</span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <button type="button" className="hover:text-gray-700 cursor-pointer">
                      <ChevronUp size={15} />
                    </button>
                    <button type="button" className="hover:text-gray-700 cursor-pointer">
                      <ChevronDown size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-2 text-[11.5px] text-center">
                  {MONTHS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      data-tl={`month-opt-${m.toLowerCase()}`}
                      onClick={() => {
                        tl.setVar("drivePhotosMonth", `${m} 2026`);
                        tl.setVar("drivePhotosMonthOpen", false);
                      }}
                      className={`rounded-lg py-1 transition-colors cursor-pointer ${
                        m === "Nov"
                          ? "border border-[#7014D9] text-[#7014D9] font-bold bg-purple-50/50"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="animate-spin text-[#7014D9]" size={28} />
            </div>
          ) : (
            <div data-tl="photos-gallery-grid" className="space-y-3">
              <span className="text-[12px] font-semibold text-[#6B7280]">Oct 26</span>
              <div className="grid grid-cols-5 gap-3">
                {SAMPLE_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    data-tl={`photo-card-${photo.id}`}
                    className={`relative overflow-hidden rounded-2xl bg-gray-100 shadow-2xs hover:shadow-md transition-shadow cursor-pointer ${photo.aspect}`}
                    style={{ backgroundColor: photo.color }}
                  >
                    <div
                      className="absolute inset-0 opacity-80 mix-blend-multiply"
                      style={{ background: `linear-gradient(135deg, ${photo.color} 0%, ${photo.accent} 100%)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                      <span className="text-[11px] font-medium text-white/90 drop-shadow-xs">
                        {photo.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Moments Tab Content */}
      {activeTab === "moments" && (
        <div data-tl="photos-moments-view" className="space-y-4">
          <h1 className="text-[20px] font-bold text-[#111827]">Your Moments</h1>
          <div className="grid grid-cols-5 gap-3">
            {SAMPLE_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                data-tl={`moment-card-${photo.id}`}
                className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-2xs hover:shadow-md transition-shadow cursor-pointer"
                style={{ backgroundColor: photo.color }}
              >
                <div
                  className="absolute inset-0 opacity-80 mix-blend-multiply"
                  style={{ background: `linear-gradient(135deg, ${photo.color} 0%, ${photo.accent} 100%)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
                  <span className="text-[11px] font-medium text-white/90 drop-shadow-xs">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Albums Tab Content */}
      {activeTab === "albums" && (
        <div data-tl="photos-albums-view" className="flex h-96 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 text-[#7014D9]">
            <ImageIcon size={36} strokeWidth={1.5} />
          </div>
          <h2 className="text-[16px] font-bold text-[#111827]">
            Collect your best moments
          </h2>
          <p className="mt-1 max-w-sm text-[12px] text-[#6B7280]">
            Capture, save, and share your moments in albums for lasting memories.
          </p>
          <button
            type="button"
            data-tl="btn-create-album"
            className="mt-5 flex items-center gap-1.5 rounded-xl bg-[#7014D9] px-4 py-2 text-[12.5px] font-semibold text-white shadow-xs hover:bg-[#5E10B8] transition-colors cursor-pointer"
          >
            <ImageIcon size={15} />
            <span>Create album</span>
          </button>
        </div>
      )}

      {/* 5. Favorites Tab Content */}
      {activeTab === "favorites" && (
        <div data-tl="photos-favorites-view" className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-bold text-[#111827]">Favorites</h1>
            <div className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12px] font-medium text-[#4B5563]">
              <span>Nov 2026</span>
              <Calendar size={13} className="text-gray-400" />
            </div>
          </div>

          <div className="flex h-80 flex-col items-center justify-center text-center">
            <Star size={44} strokeWidth={1.2} className="mb-3 text-[#D1D5DB]" />
            <h2 className="text-[15px] font-bold text-[#111827]">
              No favorites yet
            </h2>
            <p className="mt-1 text-[12px] text-[#6B7280]">
              Star photos in Gallery or Moments and they&apos;ll show up here.
            </p>
          </div>
        </div>
      )}

      {/* Floating Bottom Pill Bar */}
      <div
        data-tl="photos-floating-bar"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 rounded-full border border-gray-200 bg-white/95 backdrop-blur-xs py-1.5 px-2.5 shadow-xl select-none"
      >
        {activeTab !== "favorites" && (
          <button
            type="button"
            data-tl="btn-floating-add"
            className="flex items-center gap-1 rounded-full bg-[#7014D9] px-3.5 py-1 text-[11.5px] font-semibold text-white hover:bg-[#5E10B8] transition-colors cursor-pointer"
          >
            <Upload size={13} />
            <span>Add</span>
          </button>
        )}

        <div className="relative flex items-center">
          <Search size={14} className="absolute left-2.5 text-gray-400" />
          <input
            type="text"
            data-tl="input-search-photos"
            placeholder="Search your photos"
            className="w-48 rounded-full border-none bg-transparent py-1 pl-8 pr-3 text-[12px] text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
