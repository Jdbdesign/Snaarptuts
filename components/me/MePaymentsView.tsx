"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS } from "./me-data";
import { StripeIcon, PayPalIcon } from "./me-brand-marks";

interface Props {
  tl: Timeline;
}

export function MePaymentsView({ tl }: Props) {
  const toggleCreative = useTimelineVar<boolean>(tl, "mePaymentsToggleCreative", false);
  const toggleStandup = useTimelineVar<boolean>(tl, "mePaymentsToggleStandup", false);
  const toggleThirty = useTimelineVar<boolean>(tl, "mePaymentsToggleThirty", false);

  const pricingRows = [
    {
      id: "creative",
      name: "Creative meeting with the Team",
      duration: "30 min",
      enabled: toggleCreative,
      toggleVar: "mePaymentsToggleCreative",
      tlToggle: "me-pay-toggle-creative",
      tlEdit: "me-pay-edit-price-creative",
    },
    {
      id: "standup",
      name: "Standup Meeting with developers",
      duration: "30 min",
      enabled: toggleStandup,
      toggleVar: "mePaymentsToggleStandup",
      tlToggle: "me-pay-toggle-standup",
      tlEdit: "me-pay-edit-price-standup",
    },
    {
      id: "thirty",
      name: "30 Minute Meeting",
      duration: "30 min",
      enabled: toggleThirty,
      toggleVar: "mePaymentsToggleThirty",
      tlToggle: "me-pay-toggle-thirty",
      tlEdit: "me-pay-edit-price-thirty",
    },
  ];

  return (
    <div
      data-tl="me-payments-container"
      data-scroller
      className="h-full overflow-y-auto px-8 py-6 max-w-7xl mx-auto"
    >
      {/* Back Link */}
      <button
        type="button"
        data-tl="me-payments-back-link"
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
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-sm text-gray-500">
          Connect payment providers, configure pricing for event types, and manage payment history
        </p>
      </div>

      {/* Payment Providers Section */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">Payment Providers</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Stripe */}
          <div
            data-tl="me-pay-card-stripe"
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                <StripeIcon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">Stripe</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Accept credit card payments through Stripe. Supports one-time and recurring payments.
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                data-tl="me-pay-connect-stripe"
                className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Connect Stripe
              </button>
            </div>
          </div>

          {/* PayPal */}
          <div
            data-tl="me-pay-card-paypal"
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                <PayPalIcon size={28} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">PayPal</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Accept payments via PayPal. Invitees can pay with their PayPal account or credit card.
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                data-tl="me-pay-connect-paypal"
                className="bg-[#7014D9] hover:bg-[#5B0FB3] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                Connect PayPal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Type Pricing Section */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-3">Event Type Pricing</h2>
        <div
          data-tl="me-pay-pricing-table"
          className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
        >
          {pricingRows.map((row, idx) => (
            <div
              key={row.id}
              className={`p-4 flex items-center justify-between ${
                idx > 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-gray-900">{row.name}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {row.duration}
                </span>
              </div>

              <div className="flex items-center gap-6">
                {/* Require Payment Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Require Payment</span>
                  <button
                    type="button"
                    data-tl={row.tlToggle}
                    onClick={() => tl.setVar(row.toggleVar, !row.enabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      row.enabled ? "bg-[#7014D9]" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        row.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Edit Price */}
                <button
                  type="button"
                  data-tl={row.tlEdit}
                  className="text-xs font-semibold text-[#7014D9] hover:underline"
                >
                  Edit Price
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History Section */}
      <div className="mb-12">
        <h2 className="text-base font-bold text-gray-900 mb-3">Payment History</h2>
        <div
          data-tl="me-pay-history-box"
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center text-sm text-gray-400 font-medium"
        >
          No payments recorded yet.
        </div>
      </div>
    </div>
  );
}
