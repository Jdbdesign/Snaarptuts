"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeSsoSettingsView({ tl }: Props) {
  const activeTab = useTimelineVar<"saml" | "oidc">(tl, "meSsoTab", "saml");
  const entityId = useTimelineVar<string>(tl, "meSsoEntityId", "");
  const ssoUrl = useTimelineVar<string>(tl, "meSsoUrl", "");
  const cert = useTimelineVar<string>(tl, "meSsoCert", "");
  const domain = useTimelineVar<string>(tl, "meSsoDomain", "");

  return (
    <div data-tl="me-sso-settings-page" className="p-8 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-tl="me-sso-back"
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
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Single Sign-On (SSO)</h1>
        <p className="text-sm text-gray-500 mt-1">Configure SAML 2.0 or OpenID Connect authentication.</p>
      </div>

      <div className="space-y-6">
        {/* SSO Status Card */}
        <div data-tl="me-sso-status-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <h2 className="text-base font-bold text-gray-900">SSO Status</h2>
          <p className="text-xs text-gray-500 mt-1">Current Single Sign-On configuration for your organization</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>
            <span className="text-xs font-medium text-gray-600">SSO is not configured yet.</span>
          </div>
        </div>

        {/* Configure SSO Card */}
        <div data-tl="me-sso-config-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-gray-900">Configure SSO</h2>
            <p className="text-xs text-gray-500 mt-1">Set up SAML 2.0 or OpenID Connect for your organization</p>
          </div>

          {/* Protocol Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
            <button
              type="button"
              data-tl="me-sso-tab-saml"
              onClick={() => tl.setVar("meSsoTab", "saml")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                activeTab === "saml"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              SAML 2.0
            </button>
            <button
              type="button"
              data-tl="me-sso-tab-oidc"
              onClick={() => tl.setVar("meSsoTab", "oidc")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                activeTab === "oidc"
                  ? "bg-[#F5EEFF] text-[#7014D9]"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              OpenID Connect
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Entity ID *</label>
              <input
                type="text"
                data-tl="me-sso-entity-id"
                placeholder="https://your-idp.example.com/entity"
                value={entityId}
                onChange={(e) => tl.setVar("meSsoEntityId", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">SSO URL *</label>
              <input
                type="text"
                data-tl="me-sso-url"
                placeholder="https://your-idp.example.com/sso/saml"
                value={ssoUrl}
                onChange={(e) => tl.setVar("meSsoUrl", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">X.509 Certificate *</label>
              <textarea
                data-tl="me-sso-cert"
                rows={4}
                placeholder="-----BEGIN CERTIFICATE-----&#10;MIIDdTCCAl2gAwIBAgIJAP...&#10;-----END CERTIFICATE-----"
                value={cert}
                onChange={(e) => tl.setVar("meSsoCert", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Domain *</label>
              <input
                type="text"
                data-tl="me-sso-domain"
                placeholder="example.com"
                value={domain}
                onChange={(e) => tl.setVar("meSsoDomain", e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
              />
              <p className="text-[11px] text-gray-400 mt-1">Users with this email domain will be redirected to SSO</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              data-tl="me-sso-save-btn"
              onClick={() => {
                tl.setVar("meToastMessage", "SSO configuration saved.");
                tl.setVar("meToastType", "success");
              }}
              className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Save Configuration
            </button>
            <button
              type="button"
              data-tl="me-sso-test-btn"
              onClick={() => {
                tl.setVar("meToastMessage", "SSO connection test succeeded.");
                tl.setVar("meToastType", "success");
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Test SSO Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
