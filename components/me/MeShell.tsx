"use client";

import React, { type ReactNode } from "react";
import type { Timeline } from "@/lib/timeline";
import { ProductLogo } from "@/components/icons";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { MePage } from "./me-data";

interface MeShellProps {
  tl: Timeline;
  children: ReactNode;
}

export function MeShell({ tl, children }: MeShellProps) {
  const currentView = useTimelineVar<MePage>(tl, "meView", "dashboard");

  const navItems: { id: MePage | "availability" | "workflows" | "contacts" | "analytics" | "integrations"; label: string; icon: ReactNode; tlKey: string }[] = [
    {
      id: "dashboard",
      label: "Home",
      tlKey: "me-nav-home",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: "event-types",
      label: "Event Type",
      tlKey: "me-nav-event-types",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: "availability",
      label: "Availability",
      tlKey: "me-nav-availability",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendar",
      tlKey: "me-nav-calendar",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "meetings",
      label: "Meetings",
      tlKey: "me-nav-meetings",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15h6" />
        </svg>
      ),
    },
    {
      id: "workflows",
      label: "Workflows",
      tlKey: "me-nav-workflows",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h6" />
        </svg>
      ),
    },
    {
      id: "contacts",
      label: "Contacts",
      tlKey: "me-nav-contacts",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: "analytics",
      label: "Analytics",
      tlKey: "me-nav-analytics",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "integrations",
      label: "Integrations",
      tlKey: "me-nav-integrations",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
  ];

  return (
    <div
      data-scroller
      className="flex h-full w-full select-none overflow-hidden bg-[#F9FAFB] font-['Poppins',sans-serif] text-[#111827]"
    >
      {/* 1. Thin Suite Rail (Far Left) */}
      <aside className="w-[60px] shrink-0 border-r border-gray-200 bg-white flex flex-col items-center justify-between py-3 z-20">
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Hamburger */}
          <button
            type="button"
            data-tl="me-suite-hamburger"
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Product Icons */}
          <div className="flex flex-col items-center gap-3 mt-1">
            <button type="button" data-tl="me-suite-mail" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="mail" size={20} />
            </button>
            <button type="button" data-tl="me-suite-meets" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="meet" size={20} />
            </button>
            <button type="button" data-tl="me-suite-teams" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="teams" size={20} />
            </button>
            <button type="button" data-tl="me-suite-onecardx" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="onecard" size={20} />
            </button>
            <button type="button" data-tl="me-suite-sheets" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="sheet" size={20} />
            </button>
            <button type="button" data-tl="me-suite-docs" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="docs" size={20} />
            </button>
            <button type="button" data-tl="me-suite-slides" className="p-1 rounded-lg hover:bg-gray-100">
              <ProductLogo name="presentation" size={20} />
            </button>
          </div>
        </div>

        {/* Suite Logout */}
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            data-tl="me-suite-logout"
            className="flex flex-col items-center text-gray-500 hover:text-gray-900 group"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-[10px] text-gray-500 mt-0.5">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. Left Sidebar (Navigation) */}
      <aside className="w-[230px] shrink-0 border-r border-gray-200 bg-white flex flex-col justify-between py-4 px-3 z-10">
        <div>
          {/* Logo */}
          <div data-tl="me-brand-logo" className="flex items-center gap-3 px-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-[#7014D9] flex items-center justify-center text-white shadow-xs">
              <ProductLogo name="me" size={22} />
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">Snaarp Me</span>
          </div>

          {/* Nav List */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                (item.id === "dashboard" && currentView === "dashboard") ||
                (item.id === "calendar" && currentView === "calendar") ||
                (item.id === "meetings" && (currentView === "meetings" || currentView === "meeting-detail")) ||
                (item.id === "event-types" && currentView === "event-types");

              return (
                <button
                  key={item.id}
                  type="button"
                  data-tl={item.tlKey}
                  onClick={() => {
                    if (item.id === "dashboard") {
                      tl.setUrl("snaarp.me/dashboard");
                      tl.setVar("meView", "dashboard");
                    } else if (item.id === "event-types") {
                      tl.setUrl("snaarp.me/event-types");
                      tl.setVar("meView", "event-types");
                    } else if (item.id === "calendar") {
                      tl.setUrl("snaarp.me/calendar");
                      tl.setVar("meView", "calendar");
                    } else if (item.id === "meetings") {
                      tl.setUrl("snaarp.me/bookings/a9eb4ed6-bdc7-40c1-affb-f3a5e21cd386");
                      tl.setVar("meView", "meeting-detail");
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#F5EEFF] text-[#7014D9] font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className={isActive ? "text-[#7014D9]" : "text-gray-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Report Bug */}
        <div className="px-2 pt-4 border-t border-gray-100">
          <button
            type="button"
            data-tl="me-nav-report-bug"
            className="flex items-center gap-2.5 text-sm font-medium text-rose-600 hover:text-rose-700 w-full px-2 py-1.5 rounded-lg hover:bg-rose-50/50"
          >
            <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Report a Bug</span>
          </button>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Content Header */}
        <header className="h-[68px] shrink-0 border-b border-gray-200 bg-white px-8 flex items-center justify-between z-10">
          {/* Left: YOUR TEAM card */}
          <div
            data-tl="me-header-team-card"
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-1.5 shadow-2xs flex flex-col justify-center"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              YOUR TEAM
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-900">
              <span>Product Team</span>
              <span className="text-gray-400 font-normal">·</span>
              <span className="text-gray-500 font-normal">Owner</span>
            </div>
          </div>

          {/* Right: User Menu */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              data-tl="me-header-apps"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
              </svg>
            </button>

            <div
              data-tl="me-header-user-profile"
              className="flex items-center gap-3 pl-2 cursor-pointer group"
            >
              <div
                data-tl="me-header-avatar"
                className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-800"
              >
                JD
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-gray-900 leading-tight">Jane Doe</span>
                <span className="text-[10px] text-gray-500 leading-tight">Product Team · Owner</span>
              </div>
              <svg
                data-tl="me-header-chevron"
                className="w-4 h-4 text-gray-400 group-hover:text-gray-600 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </header>

        {/* View Container */}
        <main
          data-me-scroll="true"
          className="flex-1 overflow-y-auto bg-[#F9FAFB] p-8"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
