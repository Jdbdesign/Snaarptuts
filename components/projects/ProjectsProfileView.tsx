"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  User,
  Mail,
  Camera,
  Save,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import {
  INITIAL_USER_PROFILE,
  type UserProfileData,
} from "./projects-data";
import { pushProjectsToast } from "./projects-timeline";

interface Props {
  tl: Timeline;
}

export function ProjectsProfileView({ tl }: Props) {
  const profile = useTimelineVar<UserProfileData>(
    tl,
    "userProfileData",
    INITIAL_USER_PROFILE
  );
  const fullName = useTimelineVar<string>(tl, "profileFullName", profile.fullName);
  const currentPassword = useTimelineVar<string>(tl, "profileCurrentPassword", "");
  const newPassword = useTimelineVar<string>(tl, "profileNewPassword", "");
  const confirmPassword = useTimelineVar<string>(tl, "profileConfirmPassword", "");
  const showCurrentPassword = useTimelineVar<boolean>(
    tl,
    "profileShowCurrentPassword",
    false
  );
  const showNewPassword = useTimelineVar<boolean>(
    tl,
    "profileShowNewPassword",
    false
  );
  const showConfirmPassword = useTimelineVar<boolean>(
    tl,
    "profileShowConfirmPassword",
    false
  );

  const handleSaveProfile = () => {
    tl.setVar("userProfileData", { ...profile, fullName });
    pushProjectsToast(tl, "Profile updated", "success");
  };

  const handleUpdatePassword = () => {
    tl.setVar("profileCurrentPassword", "");
    tl.setVar("profileNewPassword", "");
    tl.setVar("profileConfirmPassword", "");
    pushProjectsToast(tl, "Password updated", "success");
  };

  return (
    <div
      data-tl="projects-profile-view"
      className="space-y-6 max-w-3xl mx-auto font-sans select-none pb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center">
          <User className="w-5 h-5 text-[#7014D9]" />
        </div>
        <div>
          <h1
            data-tl="profile-page-title"
            className="text-2xl font-bold text-gray-900 tracking-tight"
          >
            Profile
          </h1>
          <p className="text-xs text-gray-500">
            Manage your personal settings
          </p>
        </div>
      </div>

      {/* 1. Profile Information Card */}
      <div
        data-tl="profile-info-card"
        className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-6"
      >
        <div className="flex items-start gap-6">
          {/* Avatar with camera icon */}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="relative">
              <div
                data-tl="profile-avatar-circle"
                className="w-16 h-16 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold text-xl shadow-inner"
              >
                {profile.avatarInitial}
              </div>
              <button
                type="button"
                data-tl="profile-avatar-camera-btn"
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#7014D9] text-white flex items-center justify-center shadow-sm hover:bg-[#5B0FB3] transition-colors"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <span className="text-[10px] text-gray-400">JPEG/PNG, max 2MB</span>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4 text-xs">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  data-tl="profile-name-input"
                  value={fullName}
                  onChange={(e) => tl.setVar("profileFullName", e.target.value)}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 text-xs shadow-2xs"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  readOnly
                  data-tl="profile-email-input"
                  value={profile.email}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 text-xs cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-gray-400">
                Email cannot be changed
              </p>
            </div>

            {/* Save Changes button */}
            <div className="pt-2">
              <button
                type="button"
                data-tl="profile-save-btn"
                onClick={handleSaveProfile}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Change Password Card */}
      <div
        data-tl="profile-password-card"
        className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs space-y-4"
      >
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Lock className="w-4 h-4 text-gray-700" />
          <h2 className="text-sm font-bold text-gray-900">Change Password</h2>
        </div>

        <div className="space-y-3 text-xs">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                data-tl="profile-current-password"
                value={currentPassword}
                onChange={(e) =>
                  tl.setVar("profileCurrentPassword", e.target.value)
                }
                placeholder="Enter current password"
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs shadow-2xs"
              />
              <button
                type="button"
                data-tl="profile-toggle-current-password"
                onClick={() =>
                  tl.setVar(
                    "profileShowCurrentPassword",
                    !showCurrentPassword
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showCurrentPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                data-tl="profile-new-password"
                value={newPassword}
                onChange={(e) => tl.setVar("profileNewPassword", e.target.value)}
                placeholder="At least 8 characters"
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs shadow-2xs"
              />
              <button
                type="button"
                data-tl="profile-toggle-new-password"
                onClick={() =>
                  tl.setVar("profileShowNewPassword", !showNewPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-gray-700">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                data-tl="profile-confirm-password"
                value={confirmPassword}
                onChange={(e) =>
                  tl.setVar("profileConfirmPassword", e.target.value)
                }
                placeholder="Re-enter new password"
                className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#7014D9] text-gray-900 placeholder-gray-400 text-xs shadow-2xs"
              />
              <button
                type="button"
                data-tl="profile-toggle-confirm-password"
                onClick={() =>
                  tl.setVar("profileShowConfirmPassword", !showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Update Password button */}
          <div className="pt-2">
            <button
              type="button"
              data-tl="profile-update-password-btn"
              onClick={handleUpdatePassword}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Update Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Two-Factor Authentication Card */}
      <div
        data-tl="profile-2fa-card"
        className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-2xs flex items-center justify-between"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900">
              Two-Factor Authentication
            </h2>
            <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
              Off
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
            Use an authenticator app (Google Authenticator, Authy, 1Password, etc.) to protect your account with a time-based code.
          </p>
        </div>

        <button
          type="button"
          data-tl="profile-enable-2fa-btn"
          className="px-4 py-2 bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          Enable
        </button>
      </div>
    </div>
  );
}
