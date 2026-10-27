"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COPY, DEPARTMENTS, DEPT_STYLE, STATS, type MUser } from "./data";

const COLUMNS = "grid-cols-[40px_220px_250px_150px_90px_100px_120px_1fr]";
const TINTS = ["#3B82F6", "#22A06B", "#E5484D", "#8B5CF6", "#F59E0B", "#14B8A6", "#EC4899"];
const tint = (id: string) => TINTS[[...id].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];
const outlineBtn = "flex h-9 items-center gap-2 rounded-[10px] border border-[#E6E6EC] bg-white px-3.5 text-[13px] font-medium transition-[background,transform] data-[pressed=true]:scale-95";

/**
 * User Management of the email admin (admin.snaarp.com/admin/users). Scene variables: `mUsers` (the people),
 * `mRowMenu` (id of the person whose three-dots menu is open), `mDialog`, `mTarget`.
 */
export function MailUsersPage({ tl }: { tl: Timeline }) {
  const narrow = useNarrow();
  const users = useTimelineVar<MUser[]>(tl, "mUsers", []);
  const menu = useTimelineVar<string>(tl, "mRowMenu", "");
  const active = users.length;

  const stats: { value: string; icon: IconName; tile: string }[] = [
    { value: String(active), icon: "users", tile: "bg-[#E4F6EA] text-[#22A06B]" },
    { value: String(STATS.inactive), icon: "userX", tile: "bg-[#FDECEC] text-[#E5484D]" },
    { value: String(STATS.admins), icon: "shield", tile: "bg-[#E8F0FE] text-[#3B82F6]" },
    { value: STATS.storage, icon: "database", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
  ];
  const open = (dialog: string, target?: string) => {
    tl.setVar("mRowMenu", "");
    if (target) tl.setVar("mTarget", target);
    tl.setVar("mDialog", dialog);
  };

  return (
    <div onClick={() => tl.setVar("mRowMenu", "")}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 data-tl="mu-heading" className="text-[26px] font-semibold leading-[34px]">
          {COPY.title}
        </h1>
        <div className="flex gap-2.5">
          <button
            data-tl="btn-bulk-signature"
            onClick={(e) => {
              e.stopPropagation();
              tl.setVar("sigSel", users.map((u) => u.id));
              open("bulksig");
            }}
            className={outlineBtn}
          >
            <Icon name="key" size={15} />
            {COPY.bulkSignature}
          </button>
          <button
            data-tl="btn-bulk-upload"
            onClick={(e) => {
              e.stopPropagation();
              open("bulkupload");
            }}
            className={outlineBtn}
          >
            <Icon name="upload" size={15} />
            {COPY.bulkUpload}
          </button>
          <span className="flex h-9 items-center gap-2 rounded-[10px] bg-[#111] px-4 text-[13px] font-medium text-white">
            <Icon name="plus" size={14} />
            {COPY.addUser}
          </span>
        </div>
      </div>

      <div className={`mt-[22px] grid gap-4 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
        {stats.map((s, i) => (
          <div key={i} data-tl={`mu-stat-${i}`} className="flex h-[99px] items-center justify-between rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]">
            <div>
              <p className="text-[24px] font-bold leading-8">{s.value}</p>
              <p className="text-[14px] leading-5 text-[#6b7280]">{COPY.stats[i]}</p>
            </div>
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
          </div>
        ))}
      </div>

      <div className={`mt-5 grid gap-4 rounded-2xl border border-[#F0F0F4] bg-white p-5 ${narrow ? "grid-cols-2" : "grid-cols-4"}`}>
        {COPY.filters.map(([label, value]) => (
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
          <h2 className="text-[18px] font-bold">{COPY.directory}</h2>
          <div className="flex gap-2.5">
            {(["download", "refresh"] as const).map((n) => (
              <span key={n} className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
                <Icon name={n} size={14} />
                {n === "download" ? "Export" : "Refresh"}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-6 border-b border-[#F0F0F4] px-6 text-[13px] font-medium">
          <span className="flex items-center gap-2 border-b-2 border-[#111] pb-2.5">
            <Icon name="users" size={15} />
            {COPY.tabs.active}
            <span data-tl="mu-active-badge" className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#111] px-1 text-[10.5px] text-white">
              {active}
            </span>
          </span>
          <span className="flex items-center gap-2 pb-2.5 text-[#6b7280]">
            <Icon name="ban" size={15} />
            {COPY.tabs.suspended}
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F0F0F4] px-1 text-[10.5px]">{STATS.inactive}</span>
          </span>
        </div>
        <div className="px-6 pt-4">
          <div className="flex h-[38px] w-[340px] max-w-full items-center gap-2.5 rounded-lg border border-[#E6E6EC] px-3 text-[13px] text-[#9aa0ab]">
            <Icon name="search" size={15} />
            {COPY.search}
          </div>
        </div>

        <div className={`mt-4 ${narrow ? "no-scrollbar overflow-x-auto" : ""}`}>
          <div className="min-w-[1008px]">
            <div className={`grid ${COLUMNS} items-center border-y border-[#F0F0F4] bg-[#FAFAFB] px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]`}>
              <Checkbox checked={false} size={15} />
              {COPY.columns.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {users.map((u) => {
              const style = DEPT_STYLE[u.dept];
              return (
                <div key={u.id} data-tl={`mu-row-${u.id}`} className={`grid ${COLUMNS} items-center px-6 py-[13px] text-[13.5px] tl-fade-in`}>
                  <Checkbox checked={false} size={15} />
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white" style={{ background: tint(u.id) }}>
                      {u.name[0]}
                    </span>
                    <b className="font-semibold">{u.name}</b>
                  </div>
                  <span className="truncate text-[#4b5060]">{u.email}</span>
                  <span>
                    {style ? (
                      <span className="rounded-full px-2.5 py-[3px] text-[11px] font-medium" style={{ background: style.bg, color: style.fg }}>
                        • {u.dept}
                      </span>
                    ) : (
                      <span className="text-[#9aa0ab]">-</span>
                    )}
                  </span>
                  <span>
                    <span className="rounded-full bg-[#DCF5E6] px-2.5 py-[3px] text-[11.5px] font-semibold text-[#1B7F4B]">Active</span>
                  </span>
                  <span className="leading-[17px]">
                    {u.storage}
                    <span className="block text-[11px] text-[#9aa0ab]">0% used</span>
                  </span>
                  <span className="text-[#6b7280]">{u.last}</span>
                  <div className="relative">
                    <button
                      data-tl={`mu-actions-${u.id}`}
                      aria-label="Actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        tl.setVar("mRowMenu", menu === u.id ? "" : u.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] transition-[background,transform] data-[pressed=true]:scale-90 hover:bg-[#F3F4F6]"
                    >
                      <Icon name="dots" size={18} />
                    </button>
                    {menu === u.id && (
                      <div
                        data-tl="mu-menu"
                        onClick={(e) => e.stopPropagation()}
                        className="tl-pop-in absolute left-[-130px] top-[34px] z-30 w-[190px] rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)]"
                      >
                        {COPY.rowMenu.map((m) => (
                          <div
                            key={m.id}
                            data-tl={`mu-action-${m.id}`}
                            onClick={() => {
                              if (m.id === "aliases") {
                                tl.setVar("aliasTab", "list");
                                open("aliases", u.id);
                              } else if (m.id === "signature") open("signature", u.id);
                              else tl.setVar("mRowMenu", "");
                            }}
                            className={`flex h-8 items-center rounded-lg px-3 text-[12.5px] data-[hover=true]:bg-[#F3F4F6] ${m.danger ? "text-[#E5484D]" : "text-[#2a2d36]"}`}
                          >
                            {m.label}
                          </div>
                        ))}
                        <p className="mt-1 border-t border-[#F0F0F4] px-3 pb-1 pt-2 text-[10.5px] font-semibold text-[#6b7280]">{COPY.moveToDept}</p>
                        {DEPARTMENTS.map((d) => (
                          <div
                            key={d}
                            data-tl={`mu-move-${d.toLowerCase().replace(/\s+/g, "-")}`}
                            onClick={() => {
                              tl.setVar("mUsers", users.map((x) => (x.id === u.id ? { ...x, dept: d } : x)));
                              tl.setVar("mRowMenu", "");
                              tl.toast(COPY.moved(u.name, d));
                            }}
                            className="flex h-7 items-center gap-2 rounded-lg px-3 text-[12px] text-[#2a2d36] data-[hover=true]:bg-[#F3F4F6]"
                          >
                            <i className="h-1.5 w-1.5 rounded-full" style={{ background: DEPT_STYLE[d].fg }} />
                            {d}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
