"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  Key,
  Webhook,
  Plus,
  Copy,
  Info,
} from "lucide-react";
import type { ZeusApiKey, ZeusWebhook } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusIntegrationsView({ tl }: Props) {
  const apiKeys = useTimelineVar<ZeusApiKey[]>(tl, "zeusApiKeys", []);
  const createApiKeyOpen = useTimelineVar<boolean>(tl, "zeusCreateApiKeyOpen", false);
  const newApiKeyName = useTimelineVar<string>(tl, "zeusNewApiKeyName", "");

  const webhooks = useTimelineVar<ZeusWebhook[]>(tl, "zeusWebhooks", []);
  const createWebhookOpen = useTimelineVar<boolean>(tl, "zeusCreateWebhookOpen", false);
  const newWebhookName = useTimelineVar<string>(tl, "zeusNewWebhookName", "");
  const newWebhookUrl = useTimelineVar<string>(tl, "zeusNewWebhookUrl", "");
  const newWebhookEvents = useTimelineVar<string[]>(tl, "zeusNewWebhookEvents", ["Contact Revealed", "Added to List"]);

  const handleCreateApiKey = () => {
    const name = newApiKeyName.trim() || "Zeus Production";
    const newKey: ZeusApiKey = {
      id: "key-1",
      name,
      keyMasked: "zk_sample_••••••••",
      createdAt: "10/11/2026",
      status: "active",
    };
    tl.setVar("zeusApiKeys", [newKey, ...apiKeys]);
    tl.setVar("zeusCreateApiKeyOpen", false);
    tl.setVar("zeusToast", {
      text: "API key created",
      subtext: `"${name}" is ready to use`,
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  const handleCreateWebhook = () => {
    const name = newWebhookName.trim() || "Acme CRM";
    const url = newWebhookUrl.trim() || "https://example.com/webhooks/zeus";
    const events = newWebhookEvents.length > 0 ? newWebhookEvents : ["Contact Revealed", "Added to List"];

    const newWh: ZeusWebhook = {
      id: "wh-1",
      name,
      url,
      events,
      status: "active",
      createdAt: "10/11/2026",
    };
    tl.setVar("zeusWebhooks", [newWh, ...webhooks]);
    tl.setVar("zeusCreateWebhookOpen", false);
    tl.setVar("zeusToast", {
      text: "Webhook created",
      subtext: `"${name}" is active`,
    });
    setTimeout(() => {
      tl.setVar("zeusToast", null);
    }, 2500);
  };

  return (
    <div data-tl="zeus-integrations-view" className="h-full w-full overflow-y-auto bg-[#F6F6F8] p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Integrations</h1>
          <p className="text-xs text-gray-500 mt-1">
            Connect Zeus to your CRM via webhooks and API keys.
          </p>
        </div>

        {/* Section 1: API Keys */}
        <div data-tl="zeus-api-keys-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-[#7014D9]" />
                <span>API Keys</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Use API keys to authenticate requests from your applications.
              </p>
            </div>

            {!createApiKeyOpen && (
              <button
                type="button"
                data-tl="btn-create-api-key"
                onClick={() => tl.setVar("zeusCreateApiKeyOpen", true)}
                className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Key</span>
              </button>
            )}
          </div>

          {/* Form to create Key */}
          {createApiKeyOpen && (
            <div data-tl="form-create-api-key" className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 mb-4 animate-in fade-in duration-150">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Key Name
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  data-tl="input-api-key-name"
                  placeholder="e.g. Zeus Production"
                  value={newApiKeyName}
                  onChange={(e) => tl.setVar("zeusNewApiKeyName", e.target.value)}
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                />
                <button
                  type="button"
                  data-tl="btn-cancel-create-api-key"
                  onClick={() => tl.setVar("zeusCreateApiKeyOpen", false)}
                  className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-confirm-create-api-key"
                  onClick={handleCreateApiKey}
                  className="px-4 py-2 text-xs font-bold bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Create
                </button>
              </div>
            </div>
          )}

          {/* Active API Keys List */}
          {apiKeys.length > 0 ? (
            <div className="space-y-2">
              {apiKeys.map((k) => (
                <div
                  key={k.id}
                  data-tl="api-key-row-zeus-production"
                  className="p-3.5 bg-gray-50 border border-gray-200/80 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{k.name}</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-xs text-gray-600 font-semibold">{k.keyMasked}</span>
                      <button type="button" className="p-1 text-gray-400 hover:text-gray-700 rounded">
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-400">Created {k.createdAt}</span>
                </div>
              ))}
            </div>
          ) : !createApiKeyOpen ? (
            <div className="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
              No API keys created yet. Click Create Key to generate one.
            </div>
          ) : null}
        </div>

        {/* Section 2: Webhooks */}
        <div data-tl="zeus-webhooks-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <Webhook className="w-4 h-4 text-[#7014D9]" />
                <span>Webhooks</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Receive real-time notifications when leads are revealed or lists update.
              </p>
            </div>

            {!createWebhookOpen && (
              <button
                type="button"
                data-tl="btn-add-webhook"
                onClick={() => tl.setVar("zeusCreateWebhookOpen", true)}
                className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Webhook</span>
              </button>
            )}
          </div>

          {/* Form to create Webhook */}
          {createWebhookOpen && (
            <div data-tl="form-create-webhook" className="bg-gray-50 border border-gray-200/80 rounded-xl p-5 mb-4 space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Webhook Name
                </label>
                <input
                  type="text"
                  data-tl="input-webhook-name"
                  placeholder="e.g. Acme CRM"
                  value={newWebhookName}
                  onChange={(e) => tl.setVar("zeusNewWebhookName", e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Endpoint URL
                </label>
                <input
                  type="text"
                  data-tl="input-webhook-url"
                  placeholder="https://example.com/webhooks/zeus"
                  value={newWebhookUrl}
                  onChange={(e) => tl.setVar("zeusNewWebhookUrl", e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7014D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Trigger Events
                </label>
                <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      data-tl="checkbox-webhook-event-revealed"
                      checked={newWebhookEvents.includes("Contact Revealed")}
                      onChange={(e) => {
                        const evs = e.target.checked
                          ? [...newWebhookEvents, "Contact Revealed"]
                          : newWebhookEvents.filter((ev) => ev !== "Contact Revealed");
                        tl.setVar("zeusNewWebhookEvents", evs);
                      }}
                      className="rounded text-[#7014D9]"
                    />
                    <span>Contact Revealed</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      data-tl="checkbox-webhook-event-exported"
                      checked={newWebhookEvents.includes("Contact Exported")}
                      onChange={(e) => {
                        const evs = e.target.checked
                          ? [...newWebhookEvents, "Contact Exported"]
                          : newWebhookEvents.filter((ev) => ev !== "Contact Exported");
                        tl.setVar("zeusNewWebhookEvents", evs);
                      }}
                      className="rounded text-[#7014D9]"
                    />
                    <span>Contact Exported</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      data-tl="checkbox-webhook-event-list"
                      checked={newWebhookEvents.includes("Added to List")}
                      onChange={(e) => {
                        const evs = e.target.checked
                          ? [...newWebhookEvents, "Added to List"]
                          : newWebhookEvents.filter((ev) => ev !== "Added to List");
                        tl.setVar("zeusNewWebhookEvents", evs);
                      }}
                      className="rounded text-[#7014D9]"
                    />
                    <span>Added to List</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  data-tl="btn-cancel-webhook"
                  onClick={() => tl.setVar("zeusCreateWebhookOpen", false)}
                  className="px-3.5 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  data-tl="btn-confirm-create-webhook"
                  onClick={handleCreateWebhook}
                  className="px-4 py-2 text-xs font-bold bg-[#7014D9] hover:bg-[#5B0FB3] text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Create Webhook
                </button>
              </div>
            </div>
          )}

          {/* Webhooks List */}
          {webhooks.length > 0 ? (
            <div className="space-y-2">
              {webhooks.map((wh) => (
                <div
                  key={wh.id}
                  data-tl="webhook-row-acme-crm"
                  className="p-3.5 bg-gray-50 border border-gray-200/80 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{wh.name}</span>
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                        Active
                      </span>
                    </div>
                    <span className="text-xs text-blue-600 font-mono mt-0.5 block">{wh.url}</span>
                    <div className="flex items-center gap-1.5 mt-2">
                      {wh.events.map((ev) => (
                        <span
                          key={ev}
                          className="bg-purple-50 text-[#7014D9] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#7014D9]/20"
                        >
                          {ev}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-400">Created {wh.createdAt}</span>
                </div>
              ))}
            </div>
          ) : !createWebhookOpen ? (
            <div className="py-6 text-center text-xs text-gray-400 border border-dashed border-gray-200 rounded-xl">
              No webhooks configured yet. Click Add Webhook to connect your CRM.
            </div>
          ) : null}
        </div>

        {/* Section 3: How to set up */}
        <div data-tl="zeus-setup-guide" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#7014D9]" />
            <span>How to set up</span>
          </h2>

          <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-[#F5EEFF] text-[#7014D9] font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <p>Create an API key above to authenticate your requests</p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-[#F5EEFF] text-[#7014D9] font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <p>Add a webhook endpoint URL from your application or CRM</p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-[#F5EEFF] text-[#7014D9] font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <p>Select which events should trigger webhook notifications</p>
            </div>

            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="w-5 h-5 rounded-full bg-[#F5EEFF] text-[#7014D9] font-bold text-xs flex items-center justify-center shrink-0">
                4
              </span>
              <p>Test your integration and start receiving real-time lead updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
