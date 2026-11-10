"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { ME_URLS } from "./me-data";
import {
  GoogleCalendarIcon,
  OutlookIcon,
  ExchangeIcon,
} from "./me-brand-marks";
import { ProductLogo } from "@/components/icons";

interface Props {
  tl: Timeline;
}

export function MeCalendarIntegrationsView({ tl }: Props) {
  return (
    <div
      data-tl="me-calendar-integrations-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Back Link */}
      <button
        type="button"
        data-tl="me-calendar-back-link"
        onClick={() => {
          tl.setUrl(ME_URLS.integrations);
          tl.setVar("meView", "integrations");
        }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Integrations</span>
      </button>

      {/* Header */}
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calendar Integrations</h1>
        <p className="text-sm text-gray-500">
          Connect your calendars to sync events and check availability.
        </p>
      </div>

      {/* Cards List */}
      <div data-tl="me-cal-integrations-list" className="flex flex-col gap-4">
        {/* Snaarp Meet (Connected) */}
        <div
          data-tl="me-cal-card-snaarp-meet"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center shrink-0">
              <ProductLogo name="meet" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-gray-900">Snaarp Meet</span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  Connected
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 font-mono">jane@example.com</p>
            </div>
          </div>

          <button
            type="button"
            data-tl="me-cal-disconnect-snaarp-meet"
            className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            Disconnect
          </button>
        </div>

        {/* Google Calendar */}
        <div
          data-tl="me-cal-card-google"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <GoogleCalendarIcon size={26} />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">Google Calendar</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your Google Calendar to sync events and check availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            data-tl="me-cal-connect-google"
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Connect
          </button>
        </div>

        {/* Microsoft Outlook */}
        <div
          data-tl="me-cal-card-outlook"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <OutlookIcon size={26} />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">Microsoft Outlook</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your Microsoft Outlook calendar to sync events and check availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            data-tl="me-cal-connect-outlook"
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Connect
          </button>
        </div>

        {/* Microsoft Exchange */}
        <div
          data-tl="me-cal-card-exchange"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <ExchangeIcon size={26} />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">Microsoft Exchange</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your Microsoft Exchange calendar to sync events and check availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            data-tl="me-cal-connect-exchange"
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}
