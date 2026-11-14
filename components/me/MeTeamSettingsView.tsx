"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { ME_URLS, SAMPLE_TEAM_INVITE, type TeamInviteItem } from "./me-data";

interface Props {
  tl: Timeline;
}

export function MeTeamSettingsView({ tl }: Props) {
  const activeTab = useTimelineVar<"members" | "invitations">(tl, "meTeamActiveTab", "members");
  const inviteEmail = useTimelineVar<string>(tl, "meTeamInviteEmail", "");
  const inviteRole = useTimelineVar<string>(tl, "meTeamInviteRole", "Member");
  const invitesList = useTimelineVar<TeamInviteItem[]>(tl, "meTeamInvitesList", []);
  const cardBanner = useTimelineVar<string>(tl, "meTeamCardBanner", "");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  return (
    <div data-tl="me-team-settings-page" className="p-8 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        type="button"
        data-tl="me-team-back"
        onClick={() => {
          tl.setVar("meView", "settings");
          tl.setVar("meUrl", ME_URLS.settings);
        }}
        className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1.5 mb-4 group cursor-pointer"
      >
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Settings
      </button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Team Management — Product Team</h1>
        <p className="text-sm text-gray-500 mt-1">Switch accounts from your profile menu. You&apos;re on Product Team as Owner.</p>
      </div>

      {/* Invite Team Member Card */}
      <div data-tl="me-team-invite-card" className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-xs mb-8">
        <h2 className="text-base font-bold text-gray-900 mb-4">Invite Team Member</h2>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="email"
              data-tl="me-team-invite-email"
              placeholder="colleague@example.com"
              value={inviteEmail}
              onChange={(e) => tl.setVar("meTeamInviteEmail", e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7014D9] focus:ring-2 focus:ring-[#7014D9]/20"
            />
          </div>

          {/* Role Dropdown */}
          <div className="relative">
            <button
              type="button"
              data-tl="me-team-invite-role"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-800 flex items-center gap-2 cursor-pointer hover:border-gray-300 min-w-[120px] justify-between"
            >
              <span>{inviteRole}</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {roleDropdownOpen && (
              <div
                data-tl="me-team-role-menu"
                className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20"
              >
                {["Admin", "Manager", "Member"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    data-tl={`me-team-role-opt-${role.toLowerCase()}`}
                    onClick={() => {
                      tl.setVar("meTeamInviteRole", role);
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-[#F5EEFF] hover:text-[#7014D9] flex items-center justify-between cursor-pointer"
                  >
                    <span>{role}</span>
                    {inviteRole === role && (
                      <svg className="w-3.5 h-3.5 text-[#7014D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send Invite Button */}
          <button
            type="button"
            data-tl="me-team-send-invite-btn"
            disabled={!inviteEmail}
            onClick={() => {
              tl.setVar("meTeamInvitesList", [SAMPLE_TEAM_INVITE]);
              tl.setVar("meTeamCardBanner", `Invitation sent to ${inviteEmail || "design@example.com"}`);
              tl.setVar("meTeamActiveTab", "invitations");
            }}
            className="bg-[#7014D9] hover:bg-[#5B0FB3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
          >
            Send Invite
          </button>
        </div>

        {cardBanner && (
          <div data-tl="me-team-card-banner" className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2 mt-4 animate-in fade-in duration-200">
            <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{cardBanner}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 mb-6">
        <button
          type="button"
          data-tl="me-team-tab-members"
          onClick={() => tl.setVar("meTeamActiveTab", "members")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "members"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Members (1)
        </button>

        <button
          type="button"
          data-tl="me-team-tab-invitations"
          onClick={() => tl.setVar("meTeamActiveTab", "invitations")}
          className={`pb-3 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
            activeTab === "invitations"
              ? "border-[#7014D9] text-[#7014D9]"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          Invitations ({invitesList.length})
        </button>
      </div>

      {/* Tab 1: Members */}
      {activeTab === "members" && (
        <div data-tl="me-team-members-list" className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7014D9] text-white flex items-center justify-center font-bold text-sm">
                  JD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900">Jane Doe</span>
                    <span className="bg-[#F5EEFF] text-[#7014D9] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Owner
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">jane@example.com</p>
                </div>
              </div>

              <div className="text-xs text-gray-400 font-medium">
                Joined Sep 20, 2026
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Invitations */}
      {activeTab === "invitations" && (
        <div data-tl="me-team-invitations-list" className="bg-white border border-gray-200/90 rounded-2xl shadow-xs overflow-hidden">
          {invitesList.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400 font-medium">
              No pending invitations.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {invitesList.map((inv) => (
                <div
                  key={inv.id}
                  data-tl="me-team-invite-row"
                  className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{inv.email}</span>
                        <span className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Pending
                        </span>
                        <span className="text-xs text-gray-500 font-medium">· {inv.role}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Sent {inv.sent} · Expires {inv.expires}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      data-tl="me-team-resend-invite"
                      onClick={() => {
                        tl.setVar("meToastMessage", `Invitation resent to ${inv.email}`);
                        tl.setVar("meToastType", "success");
                      }}
                      className="bg-[#F5EEFF] hover:bg-[#ECE0FF] text-[#7014D9] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Resend Invite
                    </button>
                    <button
                      type="button"
                      data-tl="me-team-cancel-invite"
                      onClick={() => {
                        tl.setVar("meTeamInvitesList", []);
                        tl.setVar("meToastMessage", "Invitation cancelled.");
                        tl.setVar("meToastType", "success");
                      }}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel Invite
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
