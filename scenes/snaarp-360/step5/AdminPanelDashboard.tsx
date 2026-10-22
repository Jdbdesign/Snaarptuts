"use client";

import { Icon, type IconName } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";

const STATS: { id: string; label: string; value: number; icon: IconName; tile: string }[] = [
  { id: "total", label: "Total Users", value: 2, icon: "users", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
  { id: "active", label: "Active Users", value: 2, icon: "userCheck", tile: "bg-[#E4F6EA] text-[#22A06B]" },
  { id: "admins", label: "Administrators", value: 2, icon: "shield", tile: "bg-[#E8F0FE] text-[#3B82F6]" },
];

const ACTIONS = [
  { title: "Manage Users", text: "View, suspend, or modify user accounts" },
  { title: "Bulk Create Users", text: "Add many teammates at once from a CSV" },
  { title: "Organization", text: "See everyone grouped by department" },
];

/** Screen F: Admin Panel dashboard (login.snaarp.com/admin), content area only. */
export function AdminPanelDashboard() {
  const narrow = useNarrow();

  return (
    <div className="tl-fade-in">
      <h1 className="text-[26px] font-semibold leading-[34px]">Admin Dashboard</h1>
      <p className="mt-1 text-[14px] text-[#6b7280]">Your organization at a glance.</p>

      <div className={`mt-6 grid gap-5 ${narrow ? "grid-cols-2" : "grid-cols-3"}`}>
        {STATS.map((s) => (
          <div
            key={s.id}
            data-tl={`pstat-${s.id}`}
            className="flex h-[92px] items-center gap-4 rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
            <div>
              <p className="text-[12px] leading-4 text-[#6b7280]">{s.label}</p>
              <p className="text-[24px] font-bold leading-8">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-[#F0F0F4] bg-white p-6">
        <h2 className="text-[17px] font-bold">Quick Actions</h2>
        <div className={`mt-4 grid gap-4 ${narrow ? "grid-cols-1" : "grid-cols-3"}`}>
          {ACTIONS.map((a) => (
            <div key={a.title} className="rounded-xl border border-[#E6E6EC] px-5 py-4">
              <p className="text-[14px] font-semibold">{a.title}</p>
              <p className="mt-1 text-[12.5px] leading-5 text-[#6b7280]">{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
