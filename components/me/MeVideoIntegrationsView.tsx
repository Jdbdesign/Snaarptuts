"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { ME_URLS } from "./me-data";
import { ZoomIcon, GoogleMeetIcon } from "./me-brand-marks";
import { ProductLogo } from "@/components/icons";

interface Props {
  tl: Timeline;
}

export function MeVideoIntegrationsView({ tl }: Props) {
  return (
    <div
      data-tl="me-video-integrations-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Back Link */}
      <button
        type="button"
        data-tl="me-video-back-link"
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
        <h1 className="text-2xl font-bold text-gray-900">Video Conferencing</h1>
        <p className="text-sm text-gray-500">
          Connect your video conferencing accounts to automatically generate meeting links for bookings
        </p>
      </div>

      {/* Cards List */}
      <div data-tl="me-video-integrations-list" className="flex flex-col gap-4">
        {/* Snaarp Meet (Connected) */}
        <div
          data-tl="me-video-card-snaarp-meet"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F5EEFF] text-[#7014D9] flex items-center justify-center shrink-0">
              <ProductLogo name="meet" size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-gray-900">Snaarp Meet</span>
                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  Connected
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use Snaarp Meet to automatically create meeting rooms for your Snaarp Me bookings
              </p>

              {/* Gray Details Box */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 mt-3 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-semibold text-gray-500">Account ID:</span>
                    <span className="font-mono text-gray-700">acct-sample-0001</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-semibold text-gray-500">Email:</span>
                    <span className="font-mono text-gray-700">jane@example.com</span>
                  </div>
                </div>

                <button
                  type="button"
                  data-tl="me-video-disconnect-snaarp-meet"
                  className="border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Zoom */}
        <div
          data-tl="me-video-card-zoom"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <ZoomIcon size={26} />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">Zoom</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your Zoom account to automatically create meeting links for your bookings
              </p>
            </div>
          </div>

          <button
            type="button"
            data-tl="me-video-connect-zoom"
            className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            Connect
          </button>
        </div>

        {/* Google Meet */}
        <div
          data-tl="me-video-card-google-meet"
          className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
              <GoogleMeetIcon size={26} />
            </div>
            <div>
              <h2 className="font-bold text-base text-gray-900">Google Meet</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Create Google Meet links for bookings using your connected Google Calendar
              </p>
            </div>
          </div>

          <div
            data-tl="me-video-status-google-meet"
            className="text-xs text-gray-500 bg-gray-100 px-3.5 py-1.5 rounded-lg font-medium"
          >
            Uses connected Google Calendar
          </div>
        </div>
      </div>
    </div>
  );
}
