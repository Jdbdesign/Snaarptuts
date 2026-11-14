"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeProfileSettingsView({ tl }: Props) {
  const fullName = useTimelineVar<string>(tl, "meSettingsProfileName", "Jane Doe");
  const timezone = useTimelineVar<string>(tl, "meSettingsTimezone", "UTC (GMT+0)");
  const photoSelected = useTimelineVar<boolean>(tl, "meProfilePhotoSelected", false);
  const currPw = useTimelineVar<string>(tl, "mePasswordCurrent", "");
  const newPw = useTimelineVar<string>(tl, "mePasswordNew", "");
  const confirmPw = useTimelineVar<string>(tl, "mePasswordConfirm", "");

  return (
    <div data-tl="me-profile-settings-page" className="p-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-tl="me-profile-back"
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
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and preferences</p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column (5 of 12) */}
        <div className="col-span-5 space-y-6">
          {/* Profile Picture Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-gray-900">Profile Picture</h2>
            <p className="text-xs text-gray-500 mt-1">This will be displayed on your profile</p>

            <div className="flex items-center gap-5 mt-5">
              {photoSelected ? (
                <div
                  data-tl="me-profile-avatar-active"
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7014D9] to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-sm ring-4 ring-[#F5EEFF]"
                >
                  JD
                </div>
              ) : (
                <div
                  data-tl="me-profile-avatar-default"
                  className="w-20 h-20 rounded-full bg-[#7014D9] flex items-center justify-center text-white font-bold text-2xl shadow-sm ring-4 ring-[#F5EEFF]"
                >
                  JD
                </div>
              )}

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  data-tl="me-profile-change-photo"
                  onClick={() => {
                    tl.setVar("meImagePickerTarget", "profile");
                    tl.setVar("meImagePickerOpen", true);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  data-tl="me-profile-remove-photo"
                  onClick={() => tl.setVar("meProfilePhotoSelected", false)}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold text-left cursor-pointer pl-1"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          </div>

          {/* Account Status Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-gray-900">Account Status</h2>

            <div className="mt-4 divide-y divide-gray-100 text-xs">
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 font-medium">Email Verified</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-0.5 rounded-full font-semibold">
                  Yes
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 font-medium">MFA Enabled</span>
                <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                  Disabled
                </span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-500 font-medium">Member Since</span>
                <span className="text-gray-800 font-semibold">20/09/2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 of 12) */}
        <div className="col-span-7 space-y-6">
          {/* Account Information Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Account Information</h2>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                data-tl="me-profile-fullname-input"
                value={fullName}
                onChange={(e) => tl.setVar("meSettingsProfileName", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Username</label>
              <input
                type="text"
                data-tl="me-profile-username-input"
                value="jane"
                readOnly
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 cursor-not-allowed"
              />
              <p className="text-[11px] text-gray-400 mt-1">Used in your booking page URL. Spaces are not allowed.</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                data-tl="me-profile-email-input"
                value="jane@example.com"
                disabled
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-500 cursor-not-allowed"
              />
              <p className="text-[11px] text-gray-400 mt-1">Email cannot be changed</p>
            </div>

            {/* Timezone */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700">Timezone</label>
                <button
                  type="button"
                  data-tl="me-profile-use-device-tz"
                  onClick={() => tl.setVar("meSettingsTimezone", "Africa/Lagos")}
                  className="text-[11px] text-[#7014D9] hover:underline font-semibold cursor-pointer"
                >
                  Use device timezone
                </button>
              </div>
              <select
                data-tl="me-profile-timezone-select"
                value={timezone}
                onChange={(e) => tl.setVar("meSettingsTimezone", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 cursor-pointer"
              >
                <option value="UTC (GMT+0)">UTC (GMT+0)</option>
                <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
              </select>
              <p className="text-[11px] text-gray-400 mt-1">
                Choose your timezone, then use Save Changes to confirm. Existing schedules keep their own timezone.
              </p>
            </div>
          </div>

          {/* Change Password Card */}
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-gray-900">Change Password</h2>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                data-tl="me-profile-curr-pw"
                value={currPw}
                placeholder="••••••••"
                onChange={(e) => tl.setVar("mePasswordCurrent", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                data-tl="me-profile-new-pw"
                value={newPw}
                placeholder="••••••••"
                onChange={(e) => tl.setVar("mePasswordNew", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Min 8 chars with uppercase, lowercase, number, and special character
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                data-tl="me-profile-confirm-pw"
                value={confirmPw}
                placeholder="••••••••"
                onChange={(e) => tl.setVar("mePasswordConfirm", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                data-tl="me-profile-change-pw-btn"
                onClick={() => {
                  tl.setVar("meToastMessage", "Password changed successfully.");
                  tl.setVar("meToastType", "success");
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Bottom Save Changes Button */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              data-tl="me-profile-save-btn"
              onClick={() => {
                tl.setVar("meToastMessage", "Profile updated successfully.");
                tl.setVar("meToastType", "success");
              }}
              className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
