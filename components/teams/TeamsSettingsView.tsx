"use client";

import React from "react";
import { CURRENT_USER, type SettingsTab } from "./teams-data";

interface Props {
  activeTab: SettingsTab;
  firstNameValue?: string;
  lastNameValue?: string;
  phoneValue?: string;
  currPasswordValue?: string;
  newPasswordValue?: string;
  confirmPasswordValue?: string;
  rememberMe: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  onSelectTab: (tab: SettingsTab) => void;
  onSaveProfile: () => void;
  onChangePassword: () => void;
  onToggleRememberMe: () => void;
  onToggleNotification: (key: "email" | "push" | "sms") => void;
  onSavePreferences: () => void;
}

export function TeamsSettingsView({
  activeTab,
  firstNameValue = "Jane",
  lastNameValue = "Doe",
  phoneValue = "",
  currPasswordValue = "",
  newPasswordValue = "",
  confirmPasswordValue = "",
  rememberMe,
  notifications,
  onSelectTab,
  onSaveProfile,
  onChangePassword,
  onToggleRememberMe,
  onToggleNotification,
  onSavePreferences,
}: Props) {
  return (
    <div
      data-tl="teams-settings-view"
      className="flex-1 flex flex-col h-full bg-[#FAFAFC] overflow-y-auto"
    >
      <div className="max-w-4xl w-full mx-auto p-6 md:p-8 space-y-4">
        {/* Top Header */}
        <h1
          data-tl="settings-header-title"
          className="text-xl font-bold text-gray-900"
        >
          Settings
        </h1>

        {/* Gray Pill Bar Tabs */}
        <div
          data-tl="settings-pill-bar"
          className="bg-gray-100 p-1 rounded-xl flex items-center max-w-xl"
        >
          <button
            type="button"
            data-tl="settings-tab-profile"
            onClick={() => onSelectTab("profile")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              activeTab === "profile"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Profile
          </button>

          <button
            type="button"
            data-tl="settings-tab-security"
            onClick={() => onSelectTab("security")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              activeTab === "security"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Security
          </button>

          <button
            type="button"
            data-tl="settings-tab-notifications"
            onClick={() => onSelectTab("notifications")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              activeTab === "notifications"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Notifications
          </button>

          <button
            type="button"
            data-tl="settings-tab-account"
            onClick={() => onSelectTab("account")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer text-center ${
              activeTab === "account"
                ? "bg-white text-gray-900 font-semibold shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Account
          </button>
        </div>

        {/* Tab 1: Profile */}
        {activeTab === "profile" && (
          <div
            data-tl="settings-profile-card"
            className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-xs space-y-4"
          >
            <h2 className="text-sm font-bold text-gray-900">Profile</h2>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  data-tl="settings-first-name-input"
                  value={firstNameValue}
                  readOnly
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  data-tl="settings-last-name-input"
                  value={lastNameValue}
                  readOnly
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Email Read-only */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email{" "}
                <span className="text-gray-400 font-normal">(read-only)</span>
              </label>
              <input
                type="email"
                data-tl="settings-email-input"
                value={CURRENT_USER.email}
                disabled
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                data-tl="settings-phone-input"
                value={phoneValue}
                placeholder="+1 (555) 123-4567"
                readOnly
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            {/* Photo Avatar */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">
                Photo
              </label>
              <div
                data-tl="settings-photo-avatar"
                className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs"
              >
                {CURRENT_USER.avatarText}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="button"
                data-tl="settings-save-profile-btn"
                onClick={onSaveProfile}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Security */}
        {activeTab === "security" && (
          <div className="space-y-4 max-w-xl">
            {/* Change Password Card */}
            <div
              data-tl="settings-change-password-card"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4"
            >
              <h2 className="text-sm font-bold text-gray-900">Change Password</h2>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  data-tl="settings-curr-password-input"
                  value={currPasswordValue}
                  readOnly
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  data-tl="settings-new-password-input"
                  value={newPasswordValue}
                  placeholder="Minimum 8 characters"
                  readOnly
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  data-tl="settings-confirm-password-input"
                  value={confirmPasswordValue}
                  readOnly
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="button"
                  data-tl="settings-change-password-btn"
                  onClick={onChangePassword}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  Change Password
                </button>

                <button
                  type="button"
                  data-tl="settings-forgot-password-link"
                  className="text-xs text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
                >
                  Forgot your current password?
                </button>
              </div>
            </div>

            {/* MFA Card */}
            <div
              data-tl="settings-mfa-card"
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex items-center justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  Multi-Factor Authentication
                </h3>
                <p className="text-xs font-medium text-gray-700 mt-1">
                  Two-factor authentication is disabled
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add an extra layer of security to your account with an
                  authenticator app.
                </p>
              </div>

              <button
                type="button"
                data-tl="settings-enable-2fa-btn"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer shrink-0"
              >
                Enable
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === "notifications" && (
          <div
            data-tl="settings-notifications-card"
            className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-xs space-y-4"
          >
            <h2 className="text-sm font-bold text-gray-900">Notifications</h2>

            <div className="space-y-3">
              {/* Email Notifications */}
              <div className="border border-gray-100 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-2xs">
                <div>
                  <h4 className="text-xs font-semibold text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Receive updates via email
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="settings-toggle-email"
                  onClick={() => onToggleNotification("email")}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                    notifications.email ? "bg-purple-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      notifications.email ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Push Notifications */}
              <div className="border border-gray-100 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-2xs">
                <div>
                  <h4 className="text-xs font-semibold text-gray-900">
                    Push Notifications
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Browser and mobile push alerts
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="settings-toggle-push"
                  onClick={() => onToggleNotification("push")}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                    notifications.push ? "bg-purple-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      notifications.push ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* SMS Notifications */}
              <div className="border border-gray-100 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-2xs">
                <div>
                  <h4 className="text-xs font-semibold text-gray-900">
                    SMS Notifications
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Text message alerts
                  </p>
                </div>
                <button
                  type="button"
                  data-tl="settings-toggle-sms"
                  onClick={() => onToggleNotification("sms")}
                  className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                    notifications.sms ? "bg-purple-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      notifications.sms ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                data-tl="settings-save-prefs-btn"
                onClick={onSavePreferences}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: Account */}
        {activeTab === "account" && (
          <div
            data-tl="settings-account-card"
            className="bg-white border border-gray-200 rounded-2xl p-6 max-w-xl shadow-xs space-y-4"
          >
            <div>
              <h2 className="text-sm font-bold text-gray-900">Account</h2>
              <p className="text-xs font-medium text-gray-400 mt-2">
                Signed in as
              </p>
              <p
                data-tl="settings-account-email"
                className="text-xs font-semibold text-gray-800 mt-0.5"
              >
                {CURRENT_USER.email}
              </p>
            </div>

            <div className="border border-gray-100 rounded-xl p-3.5 flex items-center justify-between bg-white shadow-2xs mt-4">
              <div>
                <h4 className="text-xs font-semibold text-gray-900">
                  Remember me
                </h4>
                <p
                  data-tl="settings-remember-desc"
                  className="text-[11px] text-gray-400 mt-0.5"
                >
                  Keep me signed in on this device between sessions
                </p>
              </div>

              <button
                type="button"
                data-tl="settings-toggle-remember"
                onClick={onToggleRememberMe}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 cursor-pointer transition-colors ${
                  rememberMe ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    rememberMe ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
