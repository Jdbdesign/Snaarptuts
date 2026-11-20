"use client";

import React from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { X, Lock, Plus, AlertTriangle } from "lucide-react";
import {
  CRM_PERMISSION_MODULES,
  CRM_PERMISSION_ACTIONS,
  INITIAL_CRM_ROLES,
  type CrmRoleDefinition,
} from "./crm-data";

interface Props {
  tl: Timeline;
}

export function CrmRolesModal({ tl }: Props) {
  const isOpen = useTimelineVar<boolean>(tl, "crm:isRolesModalOpen", false);
  const activeRoleId = useTimelineVar<string>(tl, "crm:activeRoleId", "admin");
  const isCreatingRole = useTimelineVar<boolean>(tl, "crm:isCreatingRole", false);
  const newRoleName = useTimelineVar<string>(tl, "crm:newRoleName", "");
  const newRoleForecastsView = useTimelineVar<boolean>(tl, "crm:newRoleForecastsView", false);
  const newRoleForecastsCreate = useTimelineVar<boolean>(tl, "crm:newRoleForecastsCreate", false);
  const roles = useTimelineVar<CrmRoleDefinition[]>(tl, "crm:crmRoles", INITIAL_CRM_ROLES);

  if (!isOpen) return null;

  return (
    <div
      data-tl="crm-roles-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-2xs animate-in fade-in duration-150"
    >
      <div
        data-tl="crm-roles-modal"
        className="flex h-[82vh] w-full max-w-[880px] overflow-hidden rounded-[20px] bg-white shadow-2xl animate-in zoom-in-95 duration-150"
      >
        {/* Left Sidebar: Roles list */}
        <div className="flex w-[220px] shrink-0 flex-col justify-between border-r border-[#ECECF1] bg-[#F9FAFB] p-3.5">
          <div className="flex flex-col gap-1">
            <span className="mb-2 px-2.5 text-[10.5px] font-bold uppercase tracking-wider text-[#9CA3AF]">
              ROLES
            </span>

            {roles.map((role) => {
              const isActive = !isCreatingRole && activeRoleId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  data-tl={`crm-role-tab-${role.id}`}
                  onClick={() => {
                    tl.setVar("crm:isCreatingRole", false);
                    tl.setVar("crm:activeRoleId", role.id);
                  }}
                  className={`flex h-9 w-full items-center justify-between rounded-xl px-3 text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#F3ECFC] font-semibold text-[#7C3AED]"
                      : "text-[#4B5563] hover:bg-white hover:text-[#111111]"
                  }`}
                >
                  <span>{role.name}</span>
                  {role.isLocked && <Lock size={13} className="text-[#9CA3AF]" />}
                </button>
              );
            })}
          </div>

          {/* Add New Role Button */}
          <button
            type="button"
            data-tl="crm-roles-new-role-btn"
            onClick={() => {
              tl.setVar("crm:isCreatingRole", true);
            }}
            className={`flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-dashed text-[13px] font-semibold transition-colors cursor-pointer ${
              isCreatingRole
                ? "border-[#7C3AED] bg-[#F3ECFC] text-[#7C3AED]"
                : "border-[#D1D5DB] text-[#4B5563] hover:border-[#7C3AED] hover:text-[#7C3AED]"
            }`}
          >
            <Plus size={15} />
            <span>New role</span>
          </button>
        </div>

        {/* Right Canvas: Role Details / Matrix */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between border-b border-[#ECECF1] px-6 py-4">
            <div>
              <h2 className="text-[17px] font-bold text-[#111111]">
                {isCreatingRole ? "New Role" : "Admin — Permissions"}
              </h2>
              <p className="text-[12px] text-[#6B7280]">
                {isCreatingRole
                  ? "Define custom permissions for this role"
                  : "Full access to every module"}
              </p>
            </div>

            <button
              type="button"
              data-tl="crm-roles-close-btn"
              onClick={() => {
                tl.setVar("crm:isRolesModalOpen", false);
              }}
              className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#111111] cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Canvas Body */}
          <div className="no-scrollbar flex-1 overflow-y-auto p-6">
            {isCreatingRole ? (
              /* New Role Creation Form */
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#374151]">
                      Role Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      data-tl="crm-role-name-input"
                      placeholder="e.g. Sales Associate"
                      value={newRoleName}
                      onChange={(e) => tl.setVar("crm:newRoleName", e.target.value)}
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-[13px] text-[#111111] focus:border-[#7C3AED] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[#374151]">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Brief description (optional)"
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white px-3.5 py-2 text-[13px] text-[#111111] focus:border-[#7C3AED] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Permission Matrix */}
                <div className="rounded-xl border border-[#ECECF1] bg-white p-4">
                  <div className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                    PERMISSIONS MATRIX
                  </div>
                  <table className="w-full text-left text-[12.5px]">
                    <thead>
                      <tr className="border-b border-[#ECECF1] text-[11px] font-semibold text-[#6B7280]">
                        <th className="pb-2.5 font-semibold">MODULE</th>
                        {CRM_PERMISSION_ACTIONS.map((action) => (
                          <th
                            key={action}
                            className="pb-2.5 text-center font-semibold"
                          >
                            {action}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {CRM_PERMISSION_MODULES.map((module) => {
                        const isForecasts = module === "Forecasts";
                        return (
                          <tr key={module} className="hover:bg-[#F9FAFB]">
                            <td className="py-2.5 font-medium text-[#111111]">
                              {module}
                            </td>
                            {CRM_PERMISSION_ACTIONS.map((action) => {
                              const isView = action === "View";
                              const isCreate = action === "Create";
                              const checked =
                                isForecasts &&
                                ((isView && newRoleForecastsView) ||
                                  (isCreate && newRoleForecastsCreate));
                              return (
                                <td
                                  key={action}
                                  className="py-2.5 text-center"
                                >
                                  <input
                                    type="checkbox"
                                    data-tl={
                                      isForecasts
                                        ? isView
                                          ? "crm-perm-forecasts-view"
                                          : isCreate
                                          ? "crm-perm-forecasts-create"
                                          : undefined
                                        : undefined
                                    }
                                    checked={checked}
                                    onChange={(e) => {
                                      if (isForecasts && isView) {
                                        tl.setVar(
                                          "crm:newRoleForecastsView",
                                          e.target.checked
                                        );
                                      } else if (isForecasts && isCreate) {
                                        tl.setVar(
                                          "crm:newRoleForecastsCreate",
                                          e.target.checked
                                        );
                                      }
                                    }}
                                    className="h-4 w-4 rounded accent-[#7C3AED] cursor-pointer"
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => tl.setVar("crm:isCreatingRole", false)}
                    className="rounded-xl border border-[#E5E7EB] px-4 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-[#F9FAFB] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-tl="crm-create-role-submit"
                    onClick={() => {
                      const auditorRole: CrmRoleDefinition = {
                        id: "auditor",
                        name: "Auditor",
                        description: "Audit role with Forecasts access",
                        permissions: {
                          Forecasts: ["View", "Create"],
                        },
                      };
                      tl.setVar("crm:crmRoles", [...roles, auditorRole]);
                      tl.setVar("crm:isCreatingRole", false);
                      tl.setVar("crm:activeRoleId", "auditor");
                    }}
                    className="rounded-xl bg-[#7C3AED] px-5 py-2 text-[13px] font-semibold text-white shadow-xs hover:bg-[#6D28D9] cursor-pointer"
                  >
                    Create role
                  </button>
                </div>
              </div>
            ) : (
              /* Admin Locked Permissions Matrix */
              <div className="flex flex-col gap-4">
                {/* Warning / Lock Banner */}
                <div className="flex items-center gap-3 rounded-xl border border-[#FDE68A] bg-[#FEF3C7] p-3.5 text-[#92400E]">
                  <AlertTriangle size={18} className="shrink-0 text-[#D97706]" />
                  <p className="text-[12.5px] font-medium">
                    Admins always have full access. This role cannot be changed.
                  </p>
                </div>

                {/* Locked Matrix */}
                <div className="rounded-xl border border-[#ECECF1] bg-white p-4">
                  <table className="w-full text-left text-[12.5px]">
                    <thead>
                      <tr className="border-b border-[#ECECF1] text-[11px] font-semibold text-[#6B7280]">
                        <th className="pb-2.5 font-semibold">MODULE</th>
                        {CRM_PERMISSION_ACTIONS.map((action) => (
                          <th
                            key={action}
                            className="pb-2.5 text-center font-semibold"
                          >
                            {action}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {CRM_PERMISSION_MODULES.map((module) => (
                        <tr key={module} className="hover:bg-[#F9FAFB]">
                          <td className="py-2.5 font-medium text-[#111111]">
                            {module}
                          </td>
                          {CRM_PERMISSION_ACTIONS.map((action) => (
                            <td key={action} className="py-2.5 text-center">
                              <input
                                type="checkbox"
                                checked
                                disabled
                                className="h-4 w-4 rounded accent-[#7C3AED] opacity-70 cursor-not-allowed"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
