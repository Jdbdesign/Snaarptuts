"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { ZeusToggle } from "./ZeusToggle";
import type { ZeusSettingsTab } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusSettingsView({ tl }: Props) {
  // Active tab
  const activeTab = useTimelineVar<ZeusSettingsTab>(tl, "zeusSettingsTab", "profile");

  // Profile fields
  const firstName = useTimelineVar<string>(tl, "zeusProfileFirstName", "Jane");
  const lastName = useTimelineVar<string>(tl, "zeusProfileLastName", "Doe");
  const email = useTimelineVar<string>(tl, "zeusProfileEmail", "jane@example.com");
  const phone = useTimelineVar<string>(tl, "zeusProfilePhone", "");
  const profileSaving = useTimelineVar<boolean>(tl, "zeusProfileSaving", false);

  // Password fields
  const pwdCurrent = useTimelineVar<string>(tl, "zeusPasswordCurrent", "");
  const pwdNew = useTimelineVar<string>(tl, "zeusPasswordNew", "");
  const pwdConfirm = useTimelineVar<string>(tl, "zeusPasswordConfirm", "");
  const showCurrent = useTimelineVar<boolean>(tl, "zeusPasswordShowCurrent", false);
  const showNew = useTimelineVar<boolean>(tl, "zeusPasswordShowNew", false);
  const showConfirm = useTimelineVar<boolean>(tl, "zeusPasswordShowConfirm", false);
  const pwdSaving = useTimelineVar<boolean>(tl, "zeusPasswordSaving", false);

  // 2FA
  const is2faEnabled = useTimelineVar<boolean>(tl, "zeus2faEnabled", false);
  const is2faSetupOpen = useTimelineVar<boolean>(tl, "zeus2faSetupOpen", false);
  const code2fa = useTimelineVar<string>(tl, "zeus2faCode", "");
  const is2faVerifying = useTimelineVar<boolean>(tl, "zeus2faVerifying", false);

  // Notifications
  const notifEmail = useTimelineVar<boolean>(tl, "zeusNotifEmail", true);
  const notifPush = useTimelineVar<boolean>(tl, "zeusNotifPush", true);
  const notifSms = useTimelineVar<boolean>(tl, "zeusNotifSms", false);
  const notifSaving = useTimelineVar<boolean>(tl, "zeusNotifSaving", false);

  // Account
  const rememberMe = useTimelineVar<boolean>(tl, "zeusAccountRememberMe", false);

  // Toasts
  const settingsToasts = useTimelineVar<Array<{ id: string; text: string }>>(
    tl,
    "zeusSettingsToasts",
    []
  );

  const handleTabChange = (tab: ZeusSettingsTab) => {
    tl.setVar("zeusSettingsTab", tab);
  };

  return (
    <div
      data-tl="zeus-settings-scroller"
      data-scroller
      className="h-full w-full overflow-y-auto no-scrollbar py-8 px-6 flex flex-col items-center bg-[#F6F6F8] font-sans"
    >
      <div className="w-full max-w-2xl space-y-4">
        {/* Page Title */}
        <h1
          data-tl="zeus-settings-title"
          className="text-2xl font-bold text-gray-900 text-center mb-4 tracking-tight"
        >
          Settings
        </h1>

        {/* Tab switch bar */}
        <div
          data-tl="zeus-settings-tabs"
          className="w-full flex items-center bg-gray-100/90 p-1 rounded-2xl mb-6 shadow-2xs"
        >
          <button
            type="button"
            data-tl="zeus-tab-profile"
            onClick={() => handleTabChange("profile")}
            className={`flex-1 py-2 px-6 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "profile"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900 font-medium"
            }`}
          >
            Profile
          </button>
          <button
            type="button"
            data-tl="zeus-tab-security"
            onClick={() => handleTabChange("security")}
            className={`flex-1 py-2 px-6 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "security"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900 font-medium"
            }`}
          >
            Security
          </button>
          <button
            type="button"
            data-tl="zeus-tab-notifications"
            onClick={() => handleTabChange("notifications")}
            className={`flex-1 py-2 px-6 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "notifications"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900 font-medium"
            }`}
          >
            Notifications
          </button>
          <button
            type="button"
            data-tl="zeus-tab-account"
            onClick={() => handleTabChange("account")}
            className={`flex-1 py-2 px-6 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "account"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-900 font-medium"
            }`}
          >
            Account
          </button>
        </div>

        {/* 1. Profile Tab Panel */}
        {activeTab === "profile" && (
          <div
            data-tl="zeus-profile-card"
            className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4"
          >
            <h2 className="text-sm font-semibold text-gray-900">Profile</h2>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  data-tl="profile-first-name"
                  value={firstName}
                  onChange={(e) => tl.setVar("zeusProfileFirstName", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  data-tl="profile-last-name"
                  value={lastName}
                  onChange={(e) => tl.setVar("zeusProfileLastName", e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div data-tl="profile-email-container">
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Email <span className="text-gray-400 font-normal">(read-only)</span>
              </label>
              <input
                type="email"
                data-tl="profile-email"
                value={email}
                readOnly
                disabled
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 bg-gray-50/80 text-xs text-gray-500 cursor-not-allowed select-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Phone
              </label>
              <input
                type="text"
                data-tl="profile-phone"
                value={phone}
                placeholder="+44 7700 900123"
                onChange={(e) => tl.setVar("zeusProfilePhone", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
              />
            </div>

            {/* Photo */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Photo
              </label>
              <div className="flex items-center gap-3">
                <div
                  data-tl="profile-avatar-circle"
                  className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7014D9] flex items-center justify-center font-bold text-sm shadow-2xs"
                >
                  J
                </div>
                <button
                  type="button"
                  data-tl="profile-change-photo"
                  className="px-3.5 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors shadow-2xs"
                >
                  Change photo
                </button>
              </div>
            </div>

            {/* Save Profile Button */}
            <div className="pt-2">
              <button
                type="button"
                data-tl="profile-save-btn"
                disabled={profileSaving}
                className="px-5 py-2 rounded-xl bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center min-w-[110px]"
              >
                {profileSaving ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </span>
                ) : (
                  "Save Profile"
                )}
              </button>
            </div>
          </div>
        )}

        {/* 2. Security Tab Panel */}
        {activeTab === "security" && (
          <div className="space-y-4">
            {/* Card 1: Change Password */}
            <div
              data-tl="zeus-password-card"
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4"
            >
              <h2 className="text-sm font-semibold text-gray-900">Change Password</h2>

              {/* Current Password */}
              <div data-tl="pwd-current-container">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    data-tl="pwd-current-input"
                    value={pwdCurrent}
                    onChange={(e) => tl.setVar("zeusPasswordCurrent", e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
                  />
                  <button
                    type="button"
                    data-tl="pwd-current-eye"
                    onClick={() => tl.setVar("zeusPasswordShowCurrent", !showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showCurrent ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div data-tl="pwd-new-container">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    data-tl="pwd-new-input"
                    value={pwdNew}
                    placeholder="Minimum 8 characters"
                    onChange={(e) => tl.setVar("zeusPasswordNew", e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
                  />
                  <button
                    type="button"
                    data-tl="pwd-new-eye"
                    onClick={() => tl.setVar("zeusPasswordShowNew", !showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showNew ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div data-tl="pwd-confirm-container">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    data-tl="pwd-confirm-input"
                    value={pwdConfirm}
                    onChange={(e) => tl.setVar("zeusPasswordConfirm", e.target.value)}
                    className="w-full pl-3.5 pr-10 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9]"
                  />
                  <button
                    type="button"
                    data-tl="pwd-confirm-eye"
                    onClick={() => tl.setVar("zeusPasswordShowConfirm", !showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Change Password Button */}
              <div className="pt-2">
                <button
                  type="button"
                  data-tl="pwd-save-btn"
                  disabled={pwdSaving}
                  className="px-5 py-2 rounded-xl bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center min-w-[130px]"
                >
                  {pwdSaving ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Updating...</span>
                    </span>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: Two-Factor Authentication */}
            <div
              data-tl="twofa-card"
              className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6"
            >
              <h2 className="text-sm font-semibold text-gray-900 mb-2">
                Two-Factor Authentication
              </h2>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    data-tl="twofa-status-text"
                    className="text-xs font-medium text-gray-800"
                  >
                    {is2faEnabled
                      ? "Two-factor authentication is enabled"
                      : "Two-factor authentication is disabled"}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1 max-w-md leading-relaxed">
                    Use an authenticator app (Google Authenticator, Authy, 1Password, etc.) to protect your account with a time-based code.
                  </p>
                </div>

                {!is2faSetupOpen && (
                  <button
                    type="button"
                    data-tl="twofa-toggle-btn"
                    onClick={() => {
                      if (is2faEnabled) {
                        tl.setVar("zeus2faEnabled", false);
                      } else {
                        tl.setVar("zeus2faSetupOpen", true);
                      }
                    }}
                    className={`shrink-0 px-5 py-2 rounded-xl text-xs font-medium transition-colors ${
                      is2faEnabled
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        : "bg-[#7014D9] hover:bg-[#5B0FB3] text-white shadow-xs"
                    }`}
                  >
                    {is2faEnabled ? "Disable" : "Enable"}
                  </button>
                )}
              </div>

              {/* Setup Panel */}
              {is2faSetupOpen && (
                <div data-tl="twofa-setup-panel" className="border-t border-gray-100 mt-4 pt-4">
                  <div className="flex items-start gap-4">
                    {/* Sample QR code SVG */}
                    <div
                      data-tl="twofa-qr-container"
                      className="w-[140px] h-[140px] rounded-xl border border-gray-200 bg-white p-2.5 flex items-center justify-center shrink-0 shadow-2xs"
                    >
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full text-gray-900"
                        fill="currentColor"
                      >
                        {/* Top-left position marker */}
                        <rect x="5" y="5" width="28" height="28" rx="2" fill="currentColor" />
                        <rect x="9" y="9" width="20" height="20" rx="1" fill="white" />
                        <rect x="13" y="13" width="12" height="12" rx="1" fill="currentColor" />

                        {/* Top-right position marker */}
                        <rect x="67" y="5" width="28" height="28" rx="2" fill="currentColor" />
                        <rect x="71" y="9" width="20" height="20" rx="1" fill="white" />
                        <rect x="75" y="13" width="12" height="12" rx="1" fill="currentColor" />

                        {/* Bottom-left position marker */}
                        <rect x="5" y="67" width="28" height="28" rx="2" fill="currentColor" />
                        <rect x="9" y="71" width="20" height="20" rx="1" fill="white" />
                        <rect x="13" y="75" width="12" height="12" rx="1" fill="currentColor" />

                        {/* Data matrix dots */}
                        <rect x="38" y="7" width="6" height="6" />
                        <rect x="48" y="7" width="6" height="6" />
                        <rect x="58" y="15" width="6" height="6" />
                        <rect x="38" y="23" width="6" height="6" />
                        <rect x="48" y="27" width="6" height="6" />
                        <rect x="7" y="38" width="6" height="6" />
                        <rect x="17" y="44" width="6" height="6" />
                        <rect x="27" y="38" width="6" height="6" />
                        <rect x="38" y="38" width="6" height="6" />
                        <rect x="48" y="44" width="6" height="6" />
                        <rect x="58" y="38" width="6" height="6" />
                        <rect x="68" y="44" width="6" height="6" />
                        <rect x="78" y="38" width="6" height="6" />
                        <rect x="88" y="44" width="6" height="6" />
                        <rect x="38" y="54" width="6" height="6" />
                        <rect x="48" y="58" width="6" height="6" />
                        <rect x="58" y="54" width="6" height="6" />
                        <rect x="68" y="62" width="6" height="6" />
                        <rect x="78" y="54" width="6" height="6" />
                        <rect x="38" y="68" width="6" height="6" />
                        <rect x="48" y="74" width="6" height="6" />
                        <rect x="58" y="68" width="6" height="6" />
                        <rect x="68" y="74" width="6" height="6" />
                        <rect x="78" y="68" width="6" height="6" />
                        <rect x="88" y="74" width="6" height="6" />
                        <rect x="38" y="84" width="6" height="6" />
                        <rect x="48" y="88" width="6" height="6" />
                        <rect x="58" y="84" width="6" height="6" />
                        <rect x="72" y="88" width="6" height="6" />
                        <rect x="84" y="84" width="6" height="6" />
                      </svg>
                    </div>

                    {/* Step 1 details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs text-gray-900">
                        1. Scan the QR code
                      </h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                        Open your authenticator app and scan the code, or enter the setup key manually.
                      </p>

                      <div className="mt-2.5">
                        <span className="block text-[11px] text-gray-600 font-medium mb-1">
                          Setup key
                        </span>
                        <div
                          data-tl="twofa-setup-key"
                          className="bg-gray-100 rounded-lg px-3 py-1.5 text-[11px] font-mono text-gray-700 tracking-wider inline-block select-all"
                        >
                          SAMPLEKEY2ZEUS4DEMO0001
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 details */}
                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <h3 className="font-semibold text-xs text-gray-900 mb-1.5">
                      2. Enter the 6-digit code
                    </h3>
                    <input
                      type="text"
                      data-tl="twofa-code-input"
                      value={code2fa}
                      placeholder="123456"
                      maxLength={6}
                      onChange={(e) => tl.setVar("zeus2faCode", e.target.value)}
                      className="w-56 px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7014D9]/20 focus:border-[#7014D9] mb-3"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        data-tl="twofa-verify-btn"
                        disabled={is2faVerifying}
                        className="px-5 py-2 rounded-xl bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center min-w-[120px]"
                      >
                        {is2faVerifying ? (
                          <span className="flex items-center gap-1.5">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Verifying...</span>
                          </span>
                        ) : (
                          "Verify & Enable"
                        )}
                      </button>
                      <button
                        type="button"
                        data-tl="twofa-cancel-btn"
                        onClick={() => tl.setVar("zeus2faSetupOpen", false)}
                        className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Notifications Tab Panel */}
        {activeTab === "notifications" && (
          <div
            data-tl="zeus-notifications-card"
            className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6 space-y-4"
          >
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Notifications</h2>

            {/* Email Notifications */}
            <div
              data-tl="notif-row-email"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white"
            >
              <div>
                <p className="text-xs font-semibold text-gray-900">Email Notifications</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Receive updates via email</p>
              </div>
              <ZeusToggle
                data-tl="notif-toggle-email"
                enabled={notifEmail}
                onChange={() => tl.setVar("zeusNotifEmail", !notifEmail)}
              />
            </div>

            {/* Push Notifications */}
            <div
              data-tl="notif-row-push"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white"
            >
              <div>
                <p className="text-xs font-semibold text-gray-900">Push Notifications</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Browser and mobile push alerts</p>
              </div>
              <ZeusToggle
                data-tl="notif-toggle-push"
                enabled={notifPush}
                onChange={() => tl.setVar("zeusNotifPush", !notifPush)}
              />
            </div>

            {/* SMS Notifications */}
            <div
              data-tl="notif-row-sms"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white"
            >
              <div>
                <p className="text-xs font-semibold text-gray-900">SMS Notifications</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Text message alerts</p>
              </div>
              <ZeusToggle
                data-tl="notif-toggle-sms"
                enabled={notifSms}
                onChange={() => tl.setVar("zeusNotifSms", !notifSms)}
              />
            </div>

            {/* Save Preferences Button */}
            <div className="pt-2">
              <button
                type="button"
                data-tl="notif-save-btn"
                disabled={notifSaving}
                className="px-5 py-2 rounded-xl bg-[#7014D9] hover:bg-[#5B0FB3] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center min-w-[130px]"
              >
                {notifSaving ? (
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </span>
                ) : (
                  "Save Preferences"
                )}
              </button>
            </div>
          </div>
        )}

        {/* 4. Account Tab Panel */}
        {activeTab === "account" && (
          <div
            data-tl="zeus-account-card"
            className="bg-white rounded-2xl border border-gray-100 shadow-xs p-6"
          >
            <h2 className="text-sm font-semibold text-gray-900 mb-1">Account</h2>
            <p className="text-[11px] text-gray-500">Signed in as</p>
            <p className="text-xs font-semibold text-gray-800 mb-4">jane@example.com</p>

            <div
              data-tl="account-row-remember"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white"
            >
              <div>
                <p className="text-xs font-semibold text-gray-900">Remember me</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Keep me signed in on this device between sessions
                </p>
              </div>
              <ZeusToggle
                data-tl="account-toggle-remember"
                enabled={rememberMe}
                onChange={() => tl.setVar("zeusAccountRememberMe", !rememberMe)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Settings Bottom-Right Toasts */}
      {settingsToasts.length > 0 && (
        <div
          data-tl="zeus-settings-toasts-container"
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 items-end pointer-events-none"
        >
          {settingsToasts.map((t, idx) => (
            <div
              key={t.id}
              data-tl={`zeus-settings-toast-${idx}`}
              className="flex items-center gap-2.5 bg-[#DCFCE7] border border-[#86EFAC] px-5 py-3 rounded-2xl shadow-md text-emerald-900 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
