"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

interface Props {
  tl: Timeline;
}

export function MeImagePickerModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meImagePickerOpen", false);
  const selected = useTimelineVar<string>(tl, "meImagePickerSelected", "avatar-profile-1.png");
  const target = useTimelineVar<string>(tl, "meImagePickerTarget", "profile");

  if (!isOpen) return null;

  const sampleImages = [
    {
      id: "avatar-profile-1.png",
      name: "avatar-profile-1.png",
      tlKey: "me-picker-item-1",
      preview: (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#7014D9] to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-xs">
          JD
        </div>
      ),
    },
    {
      id: "avatar-profile-2.png",
      name: "avatar-profile-2.png",
      tlKey: "me-picker-item-2",
      preview: (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      ),
    },
    {
      id: "avatar-profile-3.png",
      name: "avatar-profile-3.png",
      tlKey: "me-picker-item-3",
      preview: (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div
      data-tl="me-image-picker-overlay"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        data-tl="me-image-picker-modal"
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">Open</h2>
          <button
            type="button"
            data-tl="me-image-picker-close"
            onClick={() => tl.setVar("meImagePickerOpen", false)}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 3 Sample Images Grid */}
        <div className="grid grid-cols-3 gap-3 py-2">
          {sampleImages.map((img) => {
            const isSel = selected === img.id;
            return (
              <button
                key={img.id}
                type="button"
                data-tl={img.tlKey}
                onClick={() => tl.setVar("meImagePickerSelected", img.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                  isSel
                    ? "border-[#7014D9] bg-[#F5EEFF]/50 ring-2 ring-[#7014D9]/20"
                    : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                }`}
              >
                {img.preview}
                <span className="text-[11px] font-medium text-gray-600 mt-2 truncate w-full text-center">
                  {img.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* File name box */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium shrink-0">File name:</span>
          <input
            type="text"
            data-tl="me-image-picker-input"
            value={selected}
            readOnly
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-800 w-full font-mono"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-image-picker-cancel"
            onClick={() => tl.setVar("meImagePickerOpen", false)}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-image-picker-submit"
            onClick={() => {
              if (target === "profile") {
                tl.setVar("meProfilePhotoSelected", true);
              } else if (target === "branding") {
                tl.setVar("meBrandingPhotoSelected", true);
              }
              tl.setVar("meImagePickerOpen", false);
            }}
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}
