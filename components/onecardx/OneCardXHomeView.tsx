"use client";

import type { Timeline } from "@/lib/timeline";
import { OcxCardIcon, OcxEmailSigIcon } from "./OneCardXIcons";

type Props = {
  tl?: Timeline;
  onSelectCreateOrgCard?: () => void;
};

export function OneCardXHomeView({ onSelectCreateOrgCard }: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-5 font-['Poppins',sans-serif]">
      {/* 1. Welcome Card */}
      <div
        data-tl="welcome-hero-card"
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
      >
        <h2
          data-tl="home-welcome-title"
          className="text-[22px] font-bold text-[#111827] tracking-tight"
        >
          Welcome to OneCardX
        </h2>
        <p className="mt-1 text-[13px] text-[#6B7280]">
          Turn every introduction into a chance to grow.
        </p>

        <div className="mt-4 flex items-center gap-6 text-[12.5px] font-medium text-[#7014D9]">
          <a
            href="#onboarding-playlist"
            data-tl="link-onboarding-playlist"
            className="flex items-center gap-1.5 hover:underline"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#7014D9] text-[9px] font-bold">
              ▷
            </span>
            <span>Onboarding Playlist →</span>
          </a>

          <a
            href="#help-center"
            data-tl="link-help-center"
            className="flex items-center gap-1.5 hover:underline"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#7014D9] text-[9px] font-bold">
              ?
            </span>
            <span>Help Center →</span>
          </a>
        </div>
      </div>

      {/* 2. Middle Row: Quick Actions (Left) and Promo Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Quick Actions Card */}
        <div
          data-tl="quick-actions-card"
          className="lg:col-span-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[15px] font-bold text-[#111827] mb-3">
              Quick Actions
            </h3>

            <div className="space-y-1">
              {/* Row 1: Create an Organization Card */}
              <div
                data-tl="quick-action-org-card"
                onClick={onSelectCreateOrgCard}
                className="flex items-center justify-between rounded-xl px-2.5 py-2.5 hover:bg-purple-50/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EEFF] text-[#7014D9]">
                    <OcxCardIcon width={16} height={16} />
                  </div>
                  <span className="text-[13px] font-medium text-[#111827] group-hover:text-[#7014D9] transition-colors">
                    Create an Organization Card
                  </span>
                </div>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[#9CA3AF]">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Row 2: Set Up an Email Signature */}
              <div
                data-tl="action-setup-signature"
                className="flex items-center justify-between rounded-xl px-2.5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EEFF] text-[#7014D9]">
                    <OcxEmailSigIcon width={16} height={16} />
                  </div>
                  <span className="text-[13px] font-medium text-[#111827]">
                    Set Up an Email Signature
                  </span>
                </div>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[#9CA3AF]">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Row 3: Get the Mobile App */}
              <div
                data-tl="action-mobile-app"
                className="flex items-center justify-between rounded-xl px-2.5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EEFF] text-[#7014D9]">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <rect x="7" y="2" width="10" height="20" rx="3" />
                      <circle cx="12" cy="18" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-[#111827]">
                    Get the Mobile App
                  </span>
                </div>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[#9CA3AF]">
                  <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Row 4: Invite Your Team */}
              <div
                data-tl="quick-action-invite"
                className="flex items-center justify-between rounded-xl px-2.5 py-2.5 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EEFF] text-[#7014D9]">
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-medium text-[#111827]">
                    Invite Your Team
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#F3E8FF] px-2 py-0.5 text-[10px] font-semibold text-[#7014D9]">
                    Popular
                  </span>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-[#9CA3AF]">
                    <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Digital Business Cards Promo Card */}
        <div
          data-tl="promo-card"
          className="lg:col-span-7 rounded-2xl border border-purple-100/60 bg-[#FBF8FF] p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#7014D9]">
              DIGITAL BUSINESS CARDS
            </span>
            <h3 className="mt-1.5 text-[18px] font-bold text-[#111827]">
              Your First Impression Starts Here
            </h3>
            <p className="mt-2 text-[12.5px] text-[#6B7280] leading-relaxed">
              Design your organization&apos;s card once — pick a color, add your logo and
              details — then publish it to your whole team.
            </p>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <button
              type="button"
              data-tl="btn-promo-create-card"
              onClick={onSelectCreateOrgCard}
              className="text-[13px] font-semibold text-[#7014D9] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Create a card</span>
              <span>→</span>
            </button>

            <div className="flex h-14 w-16 items-center justify-center rounded-2xl bg-[#EDE4FF] text-[#7014D9] shadow-2xs">
              <OcxCardIcon width={28} height={28} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Getting Started Card */}
      <div
        data-tl="getting-started-card"
        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs"
      >
        <h3 className="text-[15px] font-bold text-[#111827] mb-4">
          Getting Started
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div data-tl="getting-started-col-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-bold mb-2.5">
              1
            </div>
            <h4 className="text-[13px] font-semibold text-[#111827]">
              Create your organization&apos;s card
            </h4>
            <p className="mt-1 text-[11.5px] text-[#6B7280] leading-normal">
              Design a card once and publish it to everyone on your team.
            </p>
          </div>

          {/* Step 2 */}
          <div data-tl="getting-started-col-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-bold mb-2.5">
              2
            </div>
            <h4 className="text-[13px] font-semibold text-[#111827]">
              Share it anywhere
            </h4>
            <p className="mt-1 text-[11.5px] text-[#6B7280] leading-normal">
              Send via QR code, email, NFC, or text message.
            </p>
          </div>

          {/* Step 3 */}
          <div data-tl="getting-started-col-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3E8FF] text-[#7014D9] text-xs font-bold mb-2.5">
              3
            </div>
            <h4 className="text-[13px] font-semibold text-[#111827]">
              Grow your network
            </h4>
            <p className="mt-1 text-[11.5px] text-[#6B7280] leading-normal">
              Track views, manage contacts, and stay connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
