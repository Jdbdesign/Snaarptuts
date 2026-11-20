"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { ArrowLeft, Users, ShieldAlert, ShieldCheck, Search } from "lucide-react";
import { INITIAL_ADMIN_USERS } from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmAdminUsersView({ tl }: Props) {
  return (
    <div
      data-scroller
      className="no-scrollbar flex h-full flex-col overflow-y-auto bg-[#F6F6F8] p-6 text-[#111111]"
    >
      {/* Top Bar with Return to CRM button */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            data-tl="crm-admin-users-back-btn"
            onClick={() => {
              tl.setVar("crm:isAdminUsersScreen", false);
              tl.setVar("crm:activeSysNav", "products");
              tl.setUrl("crm.snaarp.com/admin/products");
            }}
            className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12.5px] font-semibold text-[#111111] shadow-2xs hover:bg-[#F9FAFB] cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Return to CRM Products</span>
          </button>
          <span className="text-[12px] font-medium text-[#9CA3AF]">|</span>
          <span className="text-[12.5px] font-semibold text-[#6B7280]">
            Snaarp Accounts Admin
          </span>
        </div>
      </div>

      {/* Header */}
      <div data-tl="crm-admin-users-header" className="mb-6">
        <h1 className="text-[22px] font-bold tracking-tight text-[#111111]">
          Users
        </h1>
        <p className="text-[13px] text-[#6B7280]">
          Manage the people in your organization.
        </p>
      </div>

      {/* 3 KPI Cards */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Active Users
            </span>
            <Users size={16} className="text-[#059669]" />
          </div>
          <div className="mt-2 text-[28px] font-bold text-[#111111]">17</div>
        </div>

        <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Suspended Users
            </span>
            <ShieldAlert size={16} className="text-[#EF4444]" />
          </div>
          <div className="mt-2 text-[28px] font-bold text-[#111111]">27</div>
        </div>

        <div className="rounded-[16px] border border-[#ECECF1] bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
              Administrators
            </span>
            <ShieldCheck size={16} className="text-[#7C3AED]" />
          </div>
          <div className="mt-2 text-[28px] font-bold text-[#111111]">7</div>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="rounded-[16px] border border-[#ECECF1] bg-white p-5 shadow-2xs">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 border-b border-[#ECECF1] pb-1">
            <button
              type="button"
              className="border-b-2 border-[#7C3AED] px-3 pb-2 text-[13px] font-bold text-[#7C3AED]"
            >
              Active Users (17)
            </button>
            <button
              type="button"
              className="px-3 pb-2 text-[13px] font-medium text-[#6B7280] hover:text-[#111111]"
            >
              Suspended Users (27)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-1.5 text-[12.5px] text-[#6B7280]">
              <Search size={14} className="mr-2 text-[#9CA3AF]" />
              <input
                type="text"
                readOnly
                placeholder="Search users..."
                className="bg-transparent text-[12px] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#ECECF1] text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              <th className="pb-3 font-semibold">NAME</th>
              <th className="pb-3 font-semibold">EMAIL</th>
              <th className="pb-3 font-semibold">ROLE</th>
              <th className="pb-3 font-semibold">DEPARTMENT</th>
              <th className="pb-3 text-center font-semibold">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3F4F6]">
            {INITIAL_ADMIN_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-[#F9FAFB]">
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EDE9FE] text-[11px] font-bold text-[#7C3AED]">
                      {user.initials}
                    </div>
                    <span className="font-semibold text-[#111111]">{user.name}</span>
                  </div>
                </td>
                <td className="py-3 text-[#6B7280]">{user.email}</td>
                <td className="py-3 font-medium text-[#374151]">{user.role}</td>
                <td className="py-3 text-[#6B7280]">{user.department}</td>
                <td className="py-3 text-center">
                  <span className="inline-flex rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
