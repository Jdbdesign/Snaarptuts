"use client";

import { Icon, type IconName } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { NEW_USER, OWNER } from "./step5-data";

const COLUMNS = "grid-cols-[320px_300px_110px_110px_110px_1fr]";

const STATS: { label: string; value: number; icon: IconName; tile: string }[] = [
  { label: "Active Users", value: 2, icon: "userCheck", tile: "bg-[#E4F6EA] text-[#22A06B]" },
  { label: "Suspended Users", value: 0, icon: "ban", tile: "bg-[#FFF0E0] text-[#F28C28]" },
  { label: "Administrators", value: 2, icon: "shield", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
];

const ROWS = [
  { id: "jane", initials: OWNER.initials, name: OWNER.name, email: OWNER.email, role: "Owner", tone: "bg-[#F3E6FF] text-[#7014D9]" },
  { id: "sam", initials: NEW_USER.initials, name: `${NEW_USER.first} ${NEW_USER.last}`, email: NEW_USER.email, role: "Admin", tone: "bg-[#F3E6FF] text-[#7014D9]" },
];

/** Screen G: Admin Panel, Users (login.snaarp.com/admin/users), content area only. */
export function AdminPanelUsers() {
  const narrow = useNarrow();

  return (
    <div className="tl-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-semibold leading-[34px]">Users</h1>
          <p className="mt-1 text-[14px] text-[#6b7280]">Manage the people in your organization.</p>
        </div>
        <span className="flex h-10 items-center gap-2 rounded-[10px] bg-brand px-[18px] text-[13px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(112,20,217,0.6)]">
          <Icon name="plus" size={14} />
          Create user
        </span>
      </div>

      <div className={`mt-6 grid gap-5 ${narrow ? "grid-cols-2" : "grid-cols-3"}`}>
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex h-[92px] items-center gap-4 rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
            <div>
              <p className="text-[24px] font-bold leading-8">{s.value}</p>
              <p className="text-[12px] leading-4 text-[#6b7280]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#F0F0F4] bg-white">
        <div className="flex items-center justify-between px-6 pb-3 pt-[22px]">
          <h2 className="text-[18px] font-bold">Users Directory</h2>
          <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
            <Icon name="refresh" size={14} />
            Refresh
          </span>
        </div>

        <div className="flex gap-6 border-b border-[#F0F0F4] px-6 text-[13px] font-medium">
          <span className="flex items-center gap-2 border-b-2 border-[#111] pb-2.5">
            <Icon name="users" size={15} />
            Active Users
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#111] px-1 text-[10.5px] text-white">
              2
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
              <span>User</span>
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span>Last active</span>
              <span>Actions</span>
            </div>
            {ROWS.map((r) => (
              <div
                key={r.id}
                data-tl={`prow-${r.id}`}
                className={`grid ${COLUMNS} items-center rounded-lg px-6 py-[15px] text-[14px]`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3E6FF] text-[11px] font-semibold text-brand">
                    {r.initials}
                  </span>
                  <b className="font-semibold">{r.name}</b>
                </div>
                <span className="text-[#4b5060]">{r.email}</span>
                <span>
                  <span className={`rounded-full px-3 py-[3px] text-[11.5px] font-semibold ${r.tone}`}>{r.role}</span>
                </span>
                <span className="text-[13px] font-medium text-[#1B7F4B]">Active</span>
                <span className="text-[#6b7280]">Never</span>
                <span className="text-[#6b7280]">
                  <Icon name="dots" size={18} className="rotate-90" />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}
