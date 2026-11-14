"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ME_URLS,
  type ApiKeyItem,
  type WebhookItem,
  type OAuthAppItem,
} from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeDeveloperSettingsView({ tl }: Props) {
  const activeTab = useTimelineVar<"apikeys" | "webhooks" | "oauth" | "embed">(
    tl,
    "meDevActiveTab",
    "apikeys"
  );
  const isLoading = useTimelineVar<boolean>(tl, "meDevLoading", false);
  const apiKeys = useTimelineVar<ApiKeyItem[]>(tl, "meApiKeysList", []);
  const webhooks = useTimelineVar<WebhookItem[]>(tl, "meWebhooksList", []);
  const oauthApps = useTimelineVar<OAuthAppItem[]>(tl, "meOAuthAppsList", []);

  const embedMode = useTimelineVar<string>(tl, "meEmbedMode", "Inline Embed");
  const embedEventType = useTimelineVar<string>(
    tl,
    "meEmbedEventType",
    "Creative meeting with the Team"
  );
  const embedSelector = useTimelineVar<string>(tl, "meEmbedSelector", "#snaarp-me-embed");
  const embedCopied = useTimelineVar<boolean>(tl, "meEmbedCopied", false);

  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const generatedCode = `<!-- Snaarp Me Embed Widget -->
<div id="${embedSelector.replace("#", "")}"></div>
<script
  src="https://snaarp.me/embed.js"
  data-url="https://snaarp.me/jane/${getSlug(embedEventType)}"
  data-target="${embedSelector}"
  async>
</script>`;

  return (
    <div data-tl="me-dev-settings-page" className="p-8 max-w-6xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-tl="me-dev-back"
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
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Developer Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage API keys, webhooks, OAuth apps, and embed integrations.</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        <button
          type="button"
          data-tl="me-dev-tab-apikeys"
          onClick={() => tl.setVar("meDevActiveTab", "apikeys")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "apikeys"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          API Keys
        </button>

        <button
          type="button"
          data-tl="me-dev-tab-webhooks"
          onClick={() => tl.setVar("meDevActiveTab", "webhooks")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "webhooks"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Webhooks
        </button>

        <button
          type="button"
          data-tl="me-dev-tab-oauth"
          onClick={() => tl.setVar("meDevActiveTab", "oauth")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "oauth"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          OAuth Apps
        </button>

        <button
          type="button"
          data-tl="me-dev-tab-embed"
          onClick={() => tl.setVar("meDevActiveTab", "embed")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "embed"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Embed Code
        </button>
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div data-tl="me-dev-loading" className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#7014D9] border-t-transparent animate-spin"></div>
          <span className="text-xs text-gray-400 font-medium">Loading developer settings...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: API Keys */}
          {activeTab === "apikeys" && (
            <div data-tl="me-dev-apikeys-panel" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">API keys allow external applications to authenticate with your account.</p>
                <button
                  type="button"
                  data-tl="me-dev-create-key-btn"
                  onClick={() => tl.setVar("meApiKeyModalOpen", true)}
                  className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Create API Key
                </button>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
                {apiKeys.length === 0 ? (
                  <div className="py-14 text-center text-xs text-gray-400 font-medium">
                    No API keys yet. Create one to get started.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Key</th>
                        <th className="px-6 py-3">Created</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {apiKeys.map((k) => (
                        <tr key={k.id} data-tl="me-dev-apikey-row" className="hover:bg-gray-50/50">
                          <td className="px-6 py-4 font-bold text-gray-900">{k.name}</td>
                          <td className="px-6 py-4">
                            <span className="font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-[11px]">
                              {k.key}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">{k.created}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              data-tl="me-dev-apikey-delete"
                              onClick={() => {
                                tl.setVar("meApiKeysList", []);
                                tl.setVar("meToastMessage", "API key revoked.");
                                tl.setVar("meToastType", "success");
                              }}
                              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Webhooks */}
          {activeTab === "webhooks" && (
            <div data-tl="me-dev-webhooks-panel" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Receive real-time notifications when events occur in your account.</p>
                <button
                  type="button"
                  data-tl="me-dev-add-webhook-btn"
                  onClick={() => tl.setVar("meWebhookModalOpen", true)}
                  className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Webhook
                </button>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
                {webhooks.length === 0 ? (
                  <div className="py-14 text-center text-xs text-gray-400 font-medium">
                    No webhooks configured. Add one to receive event notifications.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {webhooks.map((wh) => (
                      <div
                        key={wh.id}
                        data-tl="me-dev-webhook-row"
                        className="p-5 px-6 flex items-center justify-between hover:bg-gray-50/50"
                      >
                        <div>
                          <p className="font-mono text-xs font-bold text-gray-900">{wh.url}</p>
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            {wh.events.map((ev) => (
                              <span
                                key={ev}
                                className="bg-[#F5EEFF] text-[#7014D9] text-[10px] font-mono font-medium px-2 py-0.5 rounded-full"
                              >
                                {ev}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          data-tl="me-dev-webhook-delete"
                          onClick={() => {
                            tl.setVar("meWebhooksList", []);
                            tl.setVar("meToastMessage", "Webhook removed.");
                            tl.setVar("meToastType", "success");
                          }}
                          className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: OAuth Apps */}
          {activeTab === "oauth" && (
            <div data-tl="me-dev-oauth-panel" className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">Register OAuth applications to integrate with the Snaarp Me API.</p>
                <button
                  type="button"
                  data-tl="me-dev-register-app-btn"
                  onClick={() => tl.setVar("meOAuthModalOpen", true)}
                  className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Register App
                </button>
              </div>

              <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
                {oauthApps.length === 0 ? (
                  <div className="py-14 text-center text-xs text-gray-400 font-medium">
                    No OAuth apps registered. Register one to enable third-party integrations.
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {oauthApps.map((app) => (
                      <div
                        key={app.id}
                        data-tl="me-dev-oauth-row"
                        className="p-5 px-6 flex items-center justify-between hover:bg-gray-50/50"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-gray-900">{app.name}</h4>
                          <p className="text-[11px] text-gray-500 font-mono">{app.redirectUris}</p>
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap pt-1">
                            {app.scopes.map((sc) => (
                              <span
                                key={sc}
                                className="bg-gray-100 text-gray-700 text-[10px] font-mono px-2 py-0.5 rounded-full"
                              >
                                {sc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          data-tl="me-dev-oauth-delete"
                          onClick={() => {
                            tl.setVar("meOAuthAppsList", []);
                            tl.setVar("meToastMessage", "OAuth app deleted.");
                            tl.setVar("meToastType", "success");
                          }}
                          className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Embed Code */}
          {activeTab === "embed" && (
            <div data-tl="me-dev-embed-panel" className="space-y-6">
              <p className="text-xs text-gray-500">Generate embed code to add scheduling to your website.</p>

              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left Configuration (5 of 12) */}
                <div data-tl="me-dev-embed-config" className="col-span-5 bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-gray-900">Configuration</h3>
                  <p className="text-xs text-gray-500">Customize your embed widget</p>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Embed Mode</label>
                    <select
                      data-tl="me-dev-embed-mode"
                      value={embedMode}
                      onChange={(e) => tl.setVar("meEmbedMode", e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 cursor-pointer"
                    >
                      <option value="Inline Embed">Inline Embed</option>
                      <option value="Popup Widget">Popup Widget</option>
                      <option value="Popup Button">Popup Button</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Event Type</label>
                    <select
                      data-tl="me-dev-embed-event-type"
                      value={embedEventType}
                      onChange={(e) => tl.setVar("meEmbedEventType", e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20 cursor-pointer"
                    >
                      <option value="Creative meeting with the Team">Creative meeting with the Team</option>
                      <option value="Standup Meeting with developers">Standup Meeting with developers</option>
                      <option value="Quick Sync">Quick Sync</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Container Selector</label>
                    <input
                      type="text"
                      data-tl="me-dev-embed-selector"
                      value={embedSelector}
                      onChange={(e) => tl.setVar("meEmbedSelector", e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-mono text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
                    />
                  </div>
                </div>

                {/* Right Generated Code (7 of 12) */}
                <div data-tl="me-dev-embed-code-card" className="col-span-7 bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">Generated Code</h3>
                      <p className="text-xs text-gray-500">Copy and paste into your website</p>
                    </div>

                    <button
                      type="button"
                      data-tl="me-dev-embed-copy-btn"
                      onClick={() => {
                        tl.setVar("meEmbedCopied", true);
                        tl.setVar("meToastMessage", "Embed code copied to clipboard!");
                        tl.setVar("meToastType", "success");
                      }}
                      className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {embedCopied ? (
                        <>
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-[#1E1E2E] rounded-xl p-4 text-xs font-mono text-gray-200 overflow-x-auto leading-relaxed border border-gray-800">
                    <pre><code>{generatedCode}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
