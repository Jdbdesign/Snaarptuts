"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { ME_URLS } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeSettingsHubView({ tl }: Props) {
  const cards = [
    {
      id: "profile",
      tlKey: "me-settings-card-profile",
      title: "Profile",
      desc: "Manage your name, username, timezone, and profile picture",
      view: "settings-profile" as const,
      url: ME_URLS.settingsProfile,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "team",
      tlKey: "me-settings-card-team",
      title: "Team",
      desc: "Manage team members, roles, and invitations",
      view: "settings-team" as const,
      url: ME_URLS.settingsTeam,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: "branding",
      tlKey: "me-settings-card-branding",
      title: "Branding",
      desc: "Customize your booking page appearance",
      view: "settings-branding" as const,
      url: ME_URLS.settingsBranding,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4 5 5 0 015-5c1.1 0 2 .9 2 2v2a2 2 0 002 2h2a2 2 0 002-2v-1a5 5 0 015-5 4 4 0 014 4v2a4 4 0 01-4 4H7z" />
        </svg>
      ),
    },
    {
      id: "security",
      tlKey: "me-settings-card-security",
      title: "Security",
      desc: "Multi-factor authentication and account security",
      view: null,
      url: null,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "sso",
      tlKey: "me-settings-card-sso",
      title: "SSO",
      desc: "Configure Single Sign-On for your organization",
      view: "settings-sso" as const,
      url: ME_URLS.settingsSso,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      id: "developer",
      tlKey: "me-settings-card-developer",
      title: "Developer",
      desc: "API keys, webhooks, OAuth apps, and embed code",
      view: "settings-developer" as const,
      url: ME_URLS.settingsDeveloper,
      icon: (
        <svg className="w-6 h-6 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div data-tl="me-settings-hub-page" className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and organization settings.</p>
      </div>

      {/* Grid: 3 cols x 2 rows */}
      <div className="grid grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            data-tl={card.tlKey}
            onClick={() => {
              if (card.view && card.url) {
                tl.setVar("meView", card.view);
                tl.setVar("meUrl", card.url);
              }
            }}
            className="group bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs hover:border-[#7014D9]/40 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between min-h-[170px]"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#F5EEFF] flex items-center justify-center transition-colors group-hover:bg-[#ECE0FF]">
                  {card.icon}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#7014D9] group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <h2 className="text-base font-bold text-gray-900 mt-4 tracking-tight group-hover:text-[#7014D9] transition-colors">
                {card.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
