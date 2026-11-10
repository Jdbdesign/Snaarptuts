"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { ME_URLS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeIntegrationsHubView({ tl }: Props) {
  const cards = [
    {
      id: "calendars",
      title: "Calendars",
      desc: "Connect Google Calendar, Outlook, or Exchange",
      url: ME_URLS.integrationsCalendars,
      view: "integrations-calendars",
      tlKey: "me-integrations-card-calendars",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      ),
    },
    {
      id: "video",
      title: "Video Conferencing",
      desc: "Connect Zoom, Google Meet, Microsoft Teams, or Snaarp Meet",
      url: ME_URLS.integrationsVideo,
      view: "integrations-video",
      tlKey: "me-integrations-card-video",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "payments",
      title: "Payments",
      desc: "Connect Stripe or PayPal for paid bookings",
      url: ME_URLS.integrationsPayments,
      view: "integrations-payments",
      tlKey: "me-integrations-card-payments",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      id: "crm",
      title: "APPS and CRM",
      desc: "Connect Salesforce or HubSpot",
      url: ME_URLS.integrationsCrm,
      view: "integrations-crm",
      tlKey: "me-integrations-card-crm",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      data-tl="me-integrations-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Meet Integrations</h1>
        <p className="text-sm text-gray-500">
          Connect your favourite tools to Snaarp Me to automate scheduling, sync calendars, and streamline workflows.
        </p>
      </div>

      {/* Grid */}
      <div data-tl="me-integrations-grid" className="grid grid-cols-2 gap-6">
        {cards.map((c) => (
          <button
            key={c.id}
            type="button"
            data-tl={c.tlKey}
            onClick={() => {
              tl.setUrl(c.url);
              tl.setVar("meView", c.view);
            }}
            className="group bg-white border border-gray-200 hover:border-[#7014D9]/40 hover:shadow-md rounded-2xl p-6 transition-all text-left flex items-start justify-between cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center shrink-0">
                {c.icon}
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-bold text-gray-900 group-hover:text-[#7014D9] transition-colors">
                  {c.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.desc}</p>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#F5EEFF] text-gray-400 group-hover:text-[#7014D9] flex items-center justify-center transition-colors shrink-0 mt-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
