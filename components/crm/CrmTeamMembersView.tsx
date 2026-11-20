"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Shield, UserPlus, MoreVertical, ChevronDown } from "lucide-react";
import {
  INITIAL_TEAM_MEMBERS,
  CRM_ACCESS_ROLES,
  type CrmTeamMember,
} from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmTeamMembersView({ tl }: Props) {
  const teamMembers = useTimelineVar<CrmTeamMember[]>(
    tl,
    "crm:teamMembers",
    INITIAL_TEAM_MEMBERS
  );

  return (
    <div
      data-scroller
      className="no-scrollbar flex h-full flex-col overflow-y-auto bg-[#F8F9FA] p-6"
    >
      {/* Header */}
      <div
        data-tl="crm-team-header"
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
            Team Members
          </h1>
          <p className="text-[13px] text-[#6B7280]">
            Users from your Snaarp account. Add or manage them in the accounts admin.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="crm-team-roles-btn"
            onClick={() => {
              tl.setVar("crm:isRolesModalOpen", true);
              tl.setVar("crm:activeRoleId", "admin");
              tl.setVar("crm:isCreatingRole", false);
            }}
            className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3.5 py-2 text-[13px] font-medium text-[#111111] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer transition-colors"
          >
            <Shield size={16} className="text-[#7C3AED]" />
            <span>Roles & permissions</span>
          </button>

          <button
            type="button"
            data-tl="crm-team-add-salesperson-btn"
            className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] px-4 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer transition-colors"
          >
            <UserPlus size={16} />
            <span>Add Salesperson</span>
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div
        data-tl="crm-team-table"
        className="rounded-[16px] border border-[#ECECF1] bg-white p-5 shadow-2xs"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECECF1] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                <th className="pb-3 font-semibold">NAME</th>
                <th className="pb-3 font-semibold">EMAIL</th>
                <th className="pb-3 font-semibold">DEPARTMENT</th>
                <th className="pb-3 font-semibold">ACCOUNT ROLE</th>
                <th className="pb-3 font-semibold">CRM ACCESS</th>
                <th className="pb-3 text-center font-semibold">STATUS</th>
                <th className="pb-3 text-right font-semibold">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3F4F6]">
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  data-tl={`crm-team-row-${member.id}`}
                  className="hover:bg-[#F9FAFB]"
                >
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE9FE] text-[12px] font-bold text-[#7C3AED]">
                        {member.initials}
                      </div>
                      <span className="font-semibold text-[#111111]">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-[#6B7280]">{member.email}</td>
                  <td className="py-3.5 text-[#374151]">{member.department}</td>
                  <td className="py-3.5">
                    <span className="inline-flex rounded-md bg-[#F3F4F6] px-2 py-0.5 text-[12px] font-medium text-[#4B5563]">
                      {member.accountRole}
                    </span>
                  </td>
                  <td className="py-3.5">
                    {member.id === "sam-taylor" ? (
                      <div className="relative inline-block">
                        <select
                          data-tl="crm-team-access-dropdown"
                          value={member.crmAccess}
                          onChange={(e) => {
                            const val = e.target.value;
                            const updated = teamMembers.map((m) =>
                              m.id === "sam-taylor" ? { ...m, crmAccess: val } : m
                            );
                            tl.setVar("crm:teamMembers", updated);
                          }}
                          className="appearance-none rounded-lg border border-[#E5E7EB] bg-white py-1.5 pl-2.5 pr-8 text-[12.5px] font-medium text-[#111111] shadow-2xs focus:border-[#7C3AED] focus:outline-none cursor-pointer"
                        >
                          {CRM_ACCESS_ROLES.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={14}
                          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                        />
                      </div>
                    ) : (
                      <span className="text-[12.5px] font-medium text-[#374151]">
                        {member.crmAccess}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="inline-flex rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#059669]">
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      type="button"
                      className="rounded-md p-1 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111]"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
