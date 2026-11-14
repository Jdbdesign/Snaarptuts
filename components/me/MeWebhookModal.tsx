"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SAMPLE_WEBHOOK } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeWebhookModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "meWebhookModalOpen", false);
  const [url, setUrl] = useState("https://example.com/webhooks/snaarp-me");
  const [secret, setSecret] = useState("sample-secret");
  const [events, setEvents] = useState<string[]>(["booking.created", "booking.cancelled"]);

  if (!isOpen) return null;

  const toggleEvent = (ev: string) => {
    if (events.includes(ev)) {
      setEvents(events.filter((e) => e !== ev));
    } else {
      setEvents([...events, ev]);
    }
  };

  const availableEvents = [
    { id: "booking.created", label: "booking.created" },
    { id: "booking.cancelled", label: "booking.cancelled" },
    { id: "booking.rescheduled", label: "booking.rescheduled" },
    { id: "booking.no_show", label: "booking.no_show" },
    { id: "invitee.created", label: "invitee.created" },
  ];

  return (
    <div
      data-tl="me-webhook-overlay"
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div
        data-tl="me-webhook-modal"
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">Add Webhook</h2>
          <button
            type="button"
            data-tl="me-webhook-modal-close"
            onClick={() => tl.setVar("meWebhookModalOpen", false)}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-1 hover:bg-gray-100 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Target URL *</label>
            <input
              type="text"
              data-tl="me-webhook-url-input"
              value={url}
              placeholder="https://example.com/webhooks/snaarp-me"
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Events to Send *</label>
            <div className="space-y-2 bg-gray-50/70 border border-gray-200/80 rounded-xl p-3">
              {availableEvents.map((ev) => (
                <label
                  key={ev.id}
                  data-tl={`me-webhook-ev-${ev.id.replace(".", "-")}`}
                  className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={events.includes(ev.id)}
                    onChange={() => toggleEvent(ev.id)}
                    className="rounded border-gray-300 text-[#7014D9] focus:ring-[#7014D9] w-4 h-4"
                  />
                  <span className="font-mono text-xs">{ev.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Secret (Optional)</label>
            <input
              type="text"
              data-tl="me-webhook-secret-input"
              value={secret}
              placeholder="sample-secret"
              onChange={(e) => setSecret(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
            <p className="text-[11px] text-gray-400 mt-1">Used to verify webhook payloads</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-webhook-modal-cancel"
            onClick={() => tl.setVar("meWebhookModalOpen", false)}
            className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="me-webhook-modal-submit"
            onClick={() => {
              tl.setVar("meWebhooksList", [
                {
                  ...SAMPLE_WEBHOOK,
                  url: url || SAMPLE_WEBHOOK.url,
                  events: events.length > 0 ? events : SAMPLE_WEBHOOK.events,
                },
              ]);
              tl.setVar("meToastMessage", "Webhook added successfully.");
              tl.setVar("meToastType", "success");
              tl.setVar("meWebhookModalOpen", false);
            }}
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
