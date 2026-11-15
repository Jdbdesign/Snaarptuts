"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Eye, Download, Search, Bookmark, Zap } from "lucide-react";
import { PLANS_DATA } from "./zeus-data";

interface Props {
  tl: Timeline;
}

export function ZeusBillingView({ tl }: Props) {
  const credits = useTimelineVar<number>(tl, "zeusCredits", 99);

  return (
    <div
      data-tl="zeus-billing-scroll"
      className="h-full overflow-y-auto p-8 bg-[#F6F6F8] select-none"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Billing & Credits
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your plan and track credit usage
          </p>
        </div>

        {/* Current Plan Card */}
        <div
          data-tl="current-plan-card"
          className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-0.5 rounded-full inline-block">
                Free Plan
              </span>
              <p className="text-xs text-gray-500 mt-2 font-medium">Credits This Month</p>
              <div className="text-3xl font-extrabold text-gray-900 mt-1 flex items-baseline gap-1">
                <span>{credits}</span>
                <span className="text-gray-400 text-lg font-normal">/ 100</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F5EEFF] flex items-center justify-center text-[#7014D9]">
              <Zap className="w-6 h-6 fill-[#7014D9]" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 h-2.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${credits}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2 font-medium">
            {100 - credits} credits used • {credits} remaining • Resets monthly
          </p>
        </div>

        {/* How Credits Work */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-3">How Credits Work</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#7014D9] flex items-center justify-center mb-2.5">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-gray-900">Reveal contact info</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">1 credit per reveal</p>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2.5">
                <Download className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-gray-900">Export data</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">1 credit per 5 rows exported</p>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5">
                <Search className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-gray-900">Search & filter</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Free, unlimited</p>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5">
                <Bookmark className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-gray-900">Save lists</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Free, unlimited</p>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="pt-2">
          <h2 className="text-sm font-bold text-gray-900 mb-3">Available Plans</h2>
          <div className="grid grid-cols-4 gap-4">
            {PLANS_DATA.map((plan) => (
              <div
                key={plan.id}
                data-tl={`plan-card-${plan.id}`}
                className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                  plan.id === "basic"
                    ? "border-purple-300 shadow-sm hover:border-[#7014D9]"
                    : "border-gray-200/90"
                }`}
              >
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 min-h-[32px]">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-gray-900">£{plan.price}</span>
                    <span className="text-xs text-gray-400">/mo</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-[#7014D9] bg-[#F5EEFF] px-2.5 py-1 rounded-lg inline-block">
                    {plan.credits}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  {plan.current ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2 rounded-xl text-xs font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                    >
                      Current Plan
                    </button>
                  ) : (
                    <button
                      type="button"
                      data-tl={`btn-upgrade-${plan.id}`}
                      className="w-full py-2 rounded-xl text-xs font-bold bg-[#7014D9] hover:bg-[#5B0FB3] text-white transition-colors shadow-xs"
                    >
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
