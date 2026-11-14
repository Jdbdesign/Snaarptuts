"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeBrandingSettingsView({ tl }: Props) {
  const displayName = useTimelineVar<string>(tl, "meBrandingDisplayName", "Jane Doe");
  const photoSelected = useTimelineVar<boolean>(tl, "meBrandingPhotoSelected", false);
  const primaryColor = useTimelineVar<string>(tl, "meBrandingPrimaryColor", "#6366f1");
  const secondaryColor = useTimelineVar<string>(tl, "meBrandingSecondaryColor", "#818cf8");
  const buttonStyle = useTimelineVar<"rounded" | "square" | "pill">(tl, "meBrandingButtonStyle", "rounded");
  const welcomeMsg = useTimelineVar<string>(tl, "meBrandingWelcomeMsg", "");

  const getButtonRadiusClass = () => {
    if (buttonStyle === "square") return "rounded-none";
    if (buttonStyle === "pill") return "rounded-full";
    return "rounded-xl";
  };

  return (
    <div data-tl="me-branding-settings-page" className="p-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-tl="me-branding-back"
        onClick={() => {
          tl.setVar("meView", "settings");
          tl.setVar("meUrl", ME_URLS.settings);
        }}
        className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 mb-4 group cursor-pointer"
      >
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Settings
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Branding Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Customize the appearance of your public booking pages.</p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Form Column (7 of 12) */}
        <div className="col-span-7 bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              data-tl="me-branding-display-name"
              placeholder="e.g. John Smith or Acme Consulting"
              value={displayName}
              onChange={(e) => tl.setVar("meBrandingDisplayName", e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
            <p className="text-[11px] text-gray-400 mt-1">This appears as the organizer name on your public booking page</p>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Profile Picture</label>
            {photoSelected ? (
              <div className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7014D9] to-indigo-500 flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">avatar-profile-1.png</p>
                  <p className="text-[11px] text-gray-400">Custom profile photo</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    data-tl="me-branding-change-photo"
                    onClick={() => {
                      tl.setVar("meImagePickerTarget", "branding");
                      tl.setVar("meImagePickerOpen", true);
                    }}
                    className="text-xs font-semibold text-[#7014D9] hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    data-tl="me-branding-remove-photo"
                    onClick={() => tl.setVar("meBrandingPhotoSelected", false)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                data-tl="me-branding-upload-photo"
                onClick={() => {
                  tl.setVar("meImagePickerTarget", "branding");
                  tl.setVar("meImagePickerOpen", true);
                }}
                className="w-full border-2 border-dashed border-gray-200 hover:border-[#7014D9] rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-gray-50/50 hover:bg-[#F5EEFF]/20"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-gray-700">Upload Snaarp Me profile picture</span>
                <span className="text-[11px] text-gray-400">PNG, JPG up to 2MB</span>
              </button>
            )}
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  data-tl="me-branding-primary-swatch"
                  value={primaryColor}
                  onChange={(e) => tl.setVar("meBrandingPrimaryColor", e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 p-0.5 cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  data-tl="me-branding-primary-color"
                  value={primaryColor}
                  onChange={(e) => tl.setVar("meBrandingPrimaryColor", e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Used for buttons and accents</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  data-tl="me-branding-secondary-swatch"
                  value={secondaryColor}
                  onChange={(e) => tl.setVar("meBrandingSecondaryColor", e.target.value)}
                  className="w-8 h-8 rounded-lg border border-gray-200 p-0.5 cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  data-tl="me-branding-secondary-color"
                  value={secondaryColor}
                  onChange={(e) => tl.setVar("meBrandingSecondaryColor", e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#7014D9]"
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Used for hover states and highlights</p>
            </div>
          </div>

          {/* Button Style */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Button Style</label>
            <div className="grid grid-cols-3 gap-3">
              {(["rounded", "square", "pill"] as const).map((style) => (
                <button
                  key={style}
                  type="button"
                  data-tl={`me-branding-style-${style}`}
                  onClick={() => tl.setVar("meBrandingButtonStyle", style)}
                  className={`border rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    buttonStyle === style
                      ? "border-[#7014D9] bg-[#F5EEFF]/40 text-[#7014D9] font-bold"
                      : "border-gray-200 hover:border-gray-300 text-gray-600 font-medium"
                  }`}
                >
                  <div
                    style={{ backgroundColor: primaryColor }}
                    className={`w-16 h-6 text-white text-[10px] flex items-center justify-center font-bold ${
                      style === "square" ? "rounded-none" : style === "pill" ? "rounded-full" : "rounded-md"
                    }`}
                  >
                    Button
                  </div>
                  <span className="text-xs capitalize">{style}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Message */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">Welcome Message</label>
              <span className="text-[11px] text-gray-400">{welcomeMsg.length}/500 characters</span>
            </div>
            <textarea
              data-tl="me-branding-welcome-msg"
              rows={3}
              placeholder="e.g. Welcome! Pick a time that suits you."
              value={welcomeMsg}
              onChange={(e) => tl.setVar("meBrandingWelcomeMsg", e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 resize-none"
            />
          </div>

          {/* Save Changes */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              data-tl="me-branding-save-btn"
              onClick={() => {
                tl.setVar("meToastMessage", "Branding settings saved.");
                tl.setVar("meToastType", "success");
              }}
              className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Live Preview Column (5 of 12) */}
        <div className="col-span-5 sticky top-8">
          <div data-tl="me-branding-live-preview" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
              <div>
                <h2 className="text-sm font-bold text-gray-900">Live Preview</h2>
                <p className="text-[11px] text-gray-400">Preview of your booking page appearance</p>
              </div>
              <span className="bg-[#F5EEFF] text-[#7014D9] text-[10px] font-bold px-2 py-0.5 rounded-full">
                Preview
              </span>
            </div>

            {/* Mock Booking Page */}
            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-100 flex flex-col items-center text-center">
              {photoSelected ? (
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7014D9] to-indigo-500 flex items-center justify-center text-white font-bold text-xl shadow-xs ring-2 ring-white">
                  JD
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#7014D9] flex items-center justify-center text-white font-bold text-xl shadow-xs ring-2 ring-white">
                  JD
                </div>
              )}

              <h3 className="text-sm font-bold text-gray-900 mt-3">{displayName || "Jane Doe"}</h3>
              <p className="text-[11px] text-gray-500 mt-1 max-w-xs leading-relaxed">
                {welcomeMsg || "Welcome to my scheduling page. Please follow the instructions to add an event to the calendar."}
              </p>

              {/* Sample Event Types */}
              <div className="w-full space-y-3 mt-5">
                <div className="bg-white border border-gray-200 rounded-xl p-3.5 flex items-center justify-between text-left shadow-2xs">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">30 Minute Meeting</h4>
                    <p className="text-[10px] text-gray-400">30 min · Video call</p>
                  </div>
                  <button
                    type="button"
                    style={{ backgroundColor: primaryColor }}
                    className={`text-white text-[10px] font-bold px-3 py-1.5 shadow-2xs ${getButtonRadiusClass()}`}
                  >
                    Book
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-3.5 flex items-center justify-between text-left shadow-2xs">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">60 Minute Consultation</h4>
                    <p className="text-[10px] text-gray-400">60 min · Video call</p>
                  </div>
                  <button
                    type="button"
                    style={{ backgroundColor: primaryColor }}
                    className={`text-white text-[10px] font-bold px-3 py-1.5 shadow-2xs ${getButtonRadiusClass()}`}
                  >
                    Book
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 mt-5 font-medium">
                Powered by <span className="font-bold text-gray-600">Snaarp Me</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
