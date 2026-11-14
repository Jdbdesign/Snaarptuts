"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_OAUTH_APP } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeOAuthAppModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meOAuthModalOpen", false);
  const [name, setName] = useState("Acme Studio Booking Sync");
  const [uris, setUris] = useState("https://example.com/callback, https://example.com/auth/callback");
  const [scopes, setScopes] = useState<string[]>(["bookings:read", "event_types:read"]);

  if (!isOpen) return null;

  const toggleScope = (sc: string) => {
    if (scopes.includes(sc)) {
      setScopes(scopes.filter((s) => s !== sc));
    } else {
      setScopes([...scopes, sc]);
    }
  };

  const availableScopes = [
    { id: "bookings:read", label: "bookings:read" },
    { id: "bookings:write", label: "bookings:write" },
    { id: "event_types:read", label: "event_types:read" },
    { id: "event_types:write", label: "event_types:write" },
    { id: "availability:read", label: "availability:read" },
    { id: "webhooks:read", label: "webhooks:read" },
    { id: "webhooks:write", label: "webhooks:write" },
  ];

  return (
    <div
      data-tl="me-oauth-overlay"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="me-oauth-modal"
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">Register OAuth App</h2>
          <button
            type="button"
            data-tl="me-oauth-modal-close"
            onClick={() => tl.setVar("meOAuthModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">App Name *</label>
            <input
              type="text"
              data-tl="me-oauth-name-input"
              value={name}
              placeholder="e.g. Acme Studio Booking Sync"
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Redirect URIs *</label>
            <input
              type="text"
              data-tl="me-oauth-uris-input"
              value={uris}
              placeholder="https://example.com/callback, https://example.com/auth/callback"
              onChange={(e) => setUris(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
            <p className="text-[11px] text-gray-400 mt-1">Comma-separated list of allowed callback URLs</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Scopes *</label>
            <div className="grid grid-cols-2 gap-2 bg-gray-50/70 border border-gray-200/80 rounded-xl p-3">
              {availableScopes.map((sc) => (
                <label
                  key={sc.id}
                  data-tl={`me-oauth-scope-${sc.id.replace(":", "-")}`}
                  className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={scopes.includes(sc.id)}
                    onChange={() => toggleScope(sc.id)}
                    className="rounded border-gray-300 text-[#7014D9] focus:ring-[#7014D9] w-4 h-4"
                  />
                  <span className="font-mono text-[11px]">{sc.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-oauth-modal-cancel"
            onClick={() => tl.setVar("meOAuthModalOpen", false)}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-oauth-modal-submit"
            onClick={() => {
              tl.setVar("meOAuthAppsList", [
                {
                  ...SAMPLE_OAUTH_APP,
                  name: name || SAMPLE_OAUTH_APP.name,
                  redirectUris: uris || SAMPLE_OAUTH_APP.redirectUris,
                  scopes: scopes.length > 0 ? scopes : SAMPLE_OAUTH_APP.scopes,
                },
              ]);
              tl.setVar("meToastMessage", "OAuth app registered successfully.");
              tl.setVar("meToastType", "success");
              tl.setVar("meOAuthModalOpen", false);
            }}
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
