"use client";

import React, { useState } from "react";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { SHARE_ROLES } from "./crm-data";
import { Share2, Users } from "lucide-react";

interface Props {
  tl: Timeline;
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: string) => void;
}

export function CrmShareDashboardModal({ tl, isOpen, onClose, onSave }: Props) {
  const selectedRoleVar = useTimelineVar<string>(tl, "crm:shareRole", "Everyone in organization");
  const [selectedRole, setSelectedRole] = useState(selectedRoleVar);

  if (!isOpen) return null;

  return (
    <div
      data-tl="crm-share-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150"
    >
      <div className="w-full max-w-[420px] rounded-[20px] border border-[#ECECF1] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center gap-2 text-[#111111]">
          <Share2 size={18} className="text-[#4F46E5]" />
          <h2 className="text-[18px] font-bold">Share Dashboard</h2>
        </div>
        <p className="mt-1 text-[13px] text-[#6B7280]">
          Choose which roles can view this dashboard
        </p>

        <div className="my-5 flex flex-col gap-2">
          {SHARE_ROLES.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <button
                type="button"
                key={role}
                data-tl={`crm-share-role-${role.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => {
                  setSelectedRole(role);
                  tl.setVar("crm:shareRole", role);
                }}
                className={`flex h-11 w-full items-center gap-3 rounded-xl border px-3.5 text-left text-[13.5px] font-medium transition-all ${
                  isSelected
                    ? "border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]"
                    : "border-[#E5E7EB] bg-white text-[#374151] hover:bg-[#F9FAFB]"
                }`}
              >
                {role === "Everyone in organization" && <Users size={16} className="text-[#4F46E5]" />}
                <span>{role}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            data-tl="crm-cancel-share-btn"
            onClick={onClose}
            className="rounded-full px-5 py-2 text-[13px] font-medium text-[#4B5563] hover:bg-[#F3F4F6]"
          >
            Cancel
          </button>
          <button
            type="button"
            data-tl="crm-btn-save-share"
            onClick={() => onSave(selectedRole)}
            className="rounded-full bg-[#4F46E5] px-6 py-2 text-[13px] font-medium text-white shadow-xs hover:bg-[#4338CA]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
