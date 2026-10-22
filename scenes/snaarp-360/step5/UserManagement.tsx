"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { NEW_USER } from "./step5-data";

const COLUMNS = "grid-cols-[40px_230px_260px_120px_90px_100px_110px_1fr]";

const outlineBtn =
  "flex h-9 items-center gap-2 rounded-[10px] border border-[#E6E6EC] bg-white px-3.5 text-[13px] font-medium";

/**
 * Screens A and C: User Management inside the owner portal (AdminLayout).
 * Scene variables: created (the new user exists), sel (0-1 share of the email that is selected).
 */
export function UserManagement({ tl }: { tl: Timeline }) {
  const created = useTimelineVar(tl, "created", false);
  const narrow = useNarrow();
  const count = created ? 1 : 0;

  const stats: { label: string; value: string; icon: IconName; tile: string }[] = [
    { label: "Active Users", value: String(count), icon: "users", tile: "bg-[#E4F6EA] text-[#22A06B]" },
    { label: "Inactive Users", value: "0", icon: "userX", tile: "bg-[#FDECEC] text-[#E5484D]" },
    { label: "Administrators", value: "0", icon: "shield", tile: "bg-[#E8F0FE] text-[#3B82F6]" },
    { label: "Total Storage Used", value: "0.0 MB", icon: "database", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
  ];

  return (
    <div className="tl-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-[26px] font-semibold leading-[34px]">User Management</h1>
        <div className="flex gap-2.5">
          <span className={outlineBtn}>
            <Icon name="key" size={15} />
            Bulk Signature
          </span>
          <span className={outlineBtn}>
            <Icon name="upload" size={15} />
            Bulk User Upload
          </span>
          <button
            data-tl="btn-add-user"
            onClick={() => tl.setVar("modal", true)}
            className="flex h-9 items-center gap-2 rounded-[10px] bg-[#111] px-4 text-[13px] font-medium text-white transition-transform duration-150 data-[pressed=true]:scale-95"
          >
            <Icon name="plus" size={14} />
            Add User
          </button>
        </div>
      </div>

      <div className={`mt-[22px] grid gap-4 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex h-[99px] items-center justify-between rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]"
          >
            <div>
              <p className="text-[24px] font-bold leading-8">{s.value}</p>
              <p className="text-[14px] leading-5 text-[#6b7280]">{s.label}</p>
            </div>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
          </div>
        ))}
      </div>

      <div
        className={`mt-5 grid gap-4 rounded-2xl border border-[#F0F0F4] bg-white p-5 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}
      >
        {(
          [
            ["Department", "All members"],
            ["Role", "All Roles"],
            ["Domains", "All Domains"],
            ["Sort by", "Name (A-Z)"],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <p className="text-[12px] font-medium text-[#4b5060]">{label}</p>
            <div className="mt-1.5 flex h-[38px] items-center justify-between rounded-lg border border-[#E1E4EE] px-3 text-[13px]">
              {value}
              <Icon name="chevronDown" size={14} className="text-[#6b7280]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-[#F0F0F4] bg-white">
        <div className="flex items-center justify-between px-6 pb-3 pt-[22px]">
          <h2 className="text-[18px] font-bold">Users Directory</h2>
          <div className="flex gap-2.5">
            <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
              <Icon name="download" size={14} />
              Export
            </span>
            <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
              <Icon name="refresh" size={14} />
              Refresh
            </span>
          </div>
        </div>

        <div className="flex gap-6 border-b border-[#F0F0F4] px-6 text-[13px] font-medium">
          <span className="flex items-center gap-2 border-b-2 border-[#111] pb-2.5">
            <Icon name="users" size={15} />
            Active Users
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#111] px-1 text-[10.5px] text-white">
              {count}
            </span>
          </span>
          <span className="flex items-center gap-2 pb-2.5 text-[#6b7280]">
            <Icon name="ban" size={15} />
            Suspended Users
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F0F0F4] px-1 text-[10.5px]">
              0
            </span>
          </span>
        </div>

        <div className="px-6 pt-4">
          <div className="flex h-[38px] w-[340px] items-center gap-2.5 rounded-lg border border-[#E6E6EC] px-3 text-[13px] text-[#9aa0ab]">
            <Icon name="search" size={15} />
            Search users by name or email...
          </div>
        </div>

        <div className={`mt-4 ${narrow ? "no-scrollbar overflow-x-auto" : ""}`}>
          <div className="min-w-[1008px]">
            <div
              className={`grid ${COLUMNS} items-center border-y border-[#F0F0F4] bg-[#FAFAFB] px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]`}
            >
              <Checkbox checked={false} size={15} />
              <span>User</span>
              <span>Email</span>
              <span>Department</span>
              <span>Status</span>
              <span>Storage</span>
              <span>Last active</span>
              <span>Actions</span>
            </div>

            {created ? <UserRow tl={tl} /> : <EmptyState />}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center px-6 pb-[60px] pt-[52px] text-center">
      <Icon name="users" size={44} className="text-[#C9CDD6]" />
      <p className="mt-3 text-[15px] font-medium text-[#4b5060]">No users found</p>
    </div>
  );
}

function UserRow({ tl }: { tl: Timeline }) {
  const sel = useTimelineVar(tl, "sel", 0);

  return (
    <div data-tl="row-sam" className={`tl-row-in grid ${COLUMNS} items-center px-6 py-[17px] text-[14px]`}>
      <Checkbox checked={false} size={15} />
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6] text-[11px] font-semibold text-white">
          {NEW_USER.initials}
        </span>
        <b className="font-semibold">
          {NEW_USER.first} {NEW_USER.last}
        </b>
      </div>
      <span>
        <span
          data-tl="user-email"
          className="bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(#B3D4FC, #B3D4FC)",
            backgroundSize: `${sel * 100}% 100%`,
          }}
        >
          {NEW_USER.email}
        </span>
      </span>
      <span className="text-[#9aa0ab]">-</span>
      <span>
        <span className="rounded-full bg-[#DCF5E6] px-2.5 py-[3px] text-[11.5px] font-semibold text-[#1B7F4B]">
          Active
        </span>
      </span>
      <span className="leading-[18px]">
        0.0 MB
        <span className="block text-[11.5px] text-[#9aa0ab]">0% used</span>
      </span>
      <span className="text-[#6b7280]">Never</span>
      <span className="text-[#6b7280]">
        <Icon name="dots" size={18} />
      </span>
    </div>
  );
}
