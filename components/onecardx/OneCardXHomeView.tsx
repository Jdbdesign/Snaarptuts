"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";

type Props = {
  tl: Timeline;
  onSelectCreateOrgCard?: () => void;
};

export function OneCardXHomeView({ onSelectCreateOrgCard }: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* 1. Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            data-tl="home-welcome-title"
            className="text-2xl font-bold tracking-tight text-[#111827]"
          >
            Welcome to OneCardX
          </h1>
          <p
            data-tl="home-welcome-subtitle"
            className="text-sm text-[#6B7280] mt-0.5"
          >
            Turn every introduction into a chance to grow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            data-tl="btn-onboarding-playlist"
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-gray-50 shadow-2xs"
          >
            <Icon name="play" size={13} className="text-[#6B7280]" />
            <span>Onboarding Playlist</span>
          </button>
          <button
            type="button"
            data-tl="btn-help-center"
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-gray-50 shadow-2xs"
          >
            <Icon name="info" size={13} className="text-[#6B7280]" />
            <span>Help Center</span>
          </button>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Create an Organization Card */}
          <button
            type="button"
            data-tl="quick-action-org-card"
            onClick={onSelectCreateOrgCard}
            className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 text-left transition-all hover:border-[#7014D9] hover:shadow-md group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-[#7014D9] mb-3 group-hover:scale-105 transition-transform">
              <Icon name="p360" size={20} />
            </div>
            <span className="font-semibold text-sm text-[#111827] group-hover:text-[#7014D9] transition-colors">
              Create an Organization Card
            </span>
            <span className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Build a company-wide ID card for your team members.
            </span>
          </button>

          {/* Card 2: Set Up an Email Signature */}
          <button
            type="button"
            data-tl="quick-action-signature"
            className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 text-left transition-all hover:border-[#7014D9] hover:shadow-md group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#2563EB] mb-3 group-hover:scale-105 transition-transform">
              <Icon name="pencil" size={20} />
            </div>
            <span className="font-semibold text-sm text-[#111827] group-hover:text-[#7014D9] transition-colors">
              Set Up an Email Signature
            </span>
            <span className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Generate consistent email signatures across the org.
            </span>
          </button>

          {/* Card 3: Get the Mobile App */}
          <button
            type="button"
            data-tl="quick-action-mobile"
            className="flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 text-left transition-all hover:border-[#7014D9] hover:shadow-md group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-[#059669] mb-3 group-hover:scale-105 transition-transform">
              <Icon name="cfApps" size={20} />
            </div>
            <span className="font-semibold text-sm text-[#111827] group-hover:text-[#7014D9] transition-colors">
              Get the Mobile App
            </span>
            <span className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Share digital business cards directly from your phone.
            </span>
          </button>

          {/* Card 4: Invite Your Team [Popular] */}
          <button
            type="button"
            data-tl="quick-action-invite"
            className="relative flex flex-col rounded-xl border border-[#E5E7EB] bg-white p-4 text-left transition-all hover:border-[#7014D9] hover:shadow-md group cursor-pointer"
          >
            <span className="absolute top-3 right-3 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-[#7014D9]">
              Popular
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-[#D97706] mb-3 group-hover:scale-105 transition-transform">
              <Icon name="userPlus" size={20} />
            </div>
            <span className="font-semibold text-sm text-[#111827] group-hover:text-[#7014D9] transition-colors">
              Invite Your Team
            </span>
            <span className="text-xs text-[#6B7280] mt-1 leading-relaxed">
              Deploy cards to employees with bulk invitations.
            </span>
          </button>
        </div>
      </div>

      {/* 3. Promo Banner: "Your First Impression Starts Here" */}
      <div
        data-tl="home-promo-banner"
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#7014D9] via-[#852EE6] to-[#4F46E5] p-6 text-white shadow-lg"
      >
        <div className="relative z-10 max-w-xl">
          <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xs mb-2">
            Brand Essentials
          </span>
          <h3 className="text-xl font-bold">Your First Impression Starts Here</h3>
          <p className="mt-1 text-xs text-purple-100 leading-relaxed">
            Unify your team’s digital presence with branded smart cards, live QR sharing,
            and instant contact exchange that syncs with your Snaarp suite.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              data-tl="btn-promo-action"
              onClick={onSelectCreateOrgCard}
              className="rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#7014D9] hover:bg-purple-50 transition-colors shadow-xs"
            >
              Get Started Now
            </button>
            <span className="text-xs text-purple-200">Takes less than 2 minutes</span>
          </div>
        </div>

        {/* Decorative background visual elements */}
        <div className="absolute -right-8 -bottom-10 h-56 w-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 top-6 h-28 w-28 rounded-full border border-white/20 pointer-events-none" />
      </div>

      {/* 4. Getting Started Section */}
      <div
        data-tl="getting-started-card"
        className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-2xs"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">Getting Started</h3>
            <p className="text-xs text-[#6B7280]">Complete these 3 steps to finish organization setup.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-1/3 rounded-full bg-[#7014D9]" />
            </div>
            <span className="text-xs font-semibold text-[#7014D9]">1/3 Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-purple-50/40 p-3.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7014D9] text-white">
              <Icon name="check" size={13} />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#111827]">1. Create organization card</p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Define layout, brand colors, and badges.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-400 font-semibold text-xs">
              2
            </div>
            <div>
              <p className="text-xs font-semibold text-[#111827]">2. Deploy to team members</p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Publish card to your organization workspace.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3.5">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-400 font-semibold text-xs">
              3
            </div>
            <div>
              <p className="text-xs font-semibold text-[#111827]">3. Track card engagement</p>
              <p className="text-[11px] text-[#6B7280] mt-0.5">Measure views, contact saves, and shares.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
