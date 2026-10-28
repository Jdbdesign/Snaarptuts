"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COPY } from "../admin-data";
import { initials, PEOPLE_COPY, tint, type Department, type Person } from "../people-data";
import { showAdminToast } from "./AdminToast";

const O = PEOPLE_COPY.org;
const COLS_WIDE = "grid-cols-[minmax(150px,1.2fr)_minmax(190px,1.4fr)_70px_150px_100px_80px_40px]";
const COLS_NARROW = "grid-cols-[1fr_130px_90px_36px]";

/** A department's soft pill: coloured dot and text on a tint of the same colour. */
function DeptPill({ dept }: { dept?: Department }) {
  if (!dept) return <span className="text-[#9aa0ab]">—</span>;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-medium" style={{ background: `${dept.color}1F`, color: dept.color }}>
      <i className="h-1.5 w-1.5 rounded-full" style={{ background: dept.color }} />
      {dept.name}
    </span>
  );
}

function Popover({ children }: { children: ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="tl-pop-in absolute right-0 top-[34px] z-30 w-[210px] rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)]"
    >
      {children}
    </div>
  );
}

/**
 * Admin Panel > Organization (login.snaarp.com/admin/organization), content area only. Scene variables:
 * `users`, `depts`, `orgFilter` (department id, "" = all members), `orgMenu` (id of the person whose row
 * menu is open); `dialog` = "newdept" opens the New Department dialog.
 */
export function OrganizationPage({ tl }: { tl: Timeline }) {
  const narrow = useNarrow();
  const users = useTimelineVar<Person[]>(tl, "users", []);
  const depts = useTimelineVar<Department[]>(tl, "depts", []);
  const filter = useTimelineVar<string>(tl, "orgFilter", "");
  const menu = useTimelineVar<string>(tl, "orgMenu", "");

  const current = depts.find((d) => d.id === filter);
  const members = users.filter((u) => !current || u.dept === current.name).sort((a, b) => a.name.localeCompare(b.name));
  const count = (d: Department) => users.filter((u) => u.dept === d.name).length;
  const cols = narrow ? COLS_NARROW : COLS_WIDE;
  const heads = narrow ? [O.columns[0], O.columns[3], O.columns[4], ""] : [...O.columns, ""];

  const filterItems = [{ id: "", name: O.allMembers, color: "", n: -1 }, ...depts.map((d) => ({ id: d.id, name: d.name, color: d.color, n: count(d) }))];

  return (
    <div onClick={() => tl.setVar("orgMenu", "")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 data-tl="org-heading" className="text-[26px] font-semibold leading-[34px]">
            {O.title}
          </h1>
          <p className="mt-1 text-[14px] text-[#6b7280]">{O.subtitle}</p>
        </div>
        <span className="flex h-[34px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
          <Icon name="refresh" size={14} />
          {O.refresh}
        </span>
      </div>

      <div data-tl="org-card" className={`mt-6 flex overflow-hidden rounded-2xl border border-[#F0F0F4] bg-white ${narrow ? "flex-col" : ""}`}>
        <aside className={`shrink-0 p-4 ${narrow ? "border-b" : "w-[214px] border-r"} border-[#F0F0F4]`}>
          <p className="flex items-center gap-2 px-1 text-[12.5px] font-medium text-[#4b5060]">
            <Icon name="listView" size={14} />
            {O.filter}
          </p>
          <button
            data-tl="btn-new-department"
            onClick={(e) => {
              e.stopPropagation();
              tl.setVar("dialog", "newdept");
            }}
            className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-brand text-[12.5px] font-semibold text-white transition-transform data-[pressed=true]:scale-95"
          >
            <Icon name="plus" size={13} />
            {O.newDepartment}
          </button>
          <ul data-tl="org-filter-list" className={`mt-3 flex gap-0.5 ${narrow ? "flex-wrap" : "flex-col"}`}>
            {filterItems.map((f) => (
              <li key={f.id || "all"}>
                <div
                  data-tl={`org-filter-${f.id || "all"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    tl.setVar("orgFilter", f.id);
                  }}
                  className={`flex h-9 items-center gap-2 rounded-lg px-2.5 text-[12.5px] transition-[background,transform] data-[pressed=true]:scale-[0.98] ${
                    filter === f.id ? "bg-[#F4F4F8] font-medium" : "data-[hover=true]:bg-[#F8F8FA]"
                  }`}
                >
                  <span className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${filter === f.id ? "border-[#111]" : "border-[#CBD0DA]"}`}>
                    {filter === f.id && <i className="h-1.5 w-1.5 rounded-full bg-[#111]" />}
                  </span>
                  {f.color && <i className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: f.color }} />}
                  <span className="min-w-0 flex-1 truncate">{f.name}</span>
                  {f.n >= 0 && <span className="text-[11px] text-[#8b909c]">{f.n}</span>}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        <section className="min-w-0 flex-1 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 data-tl="org-title" className="text-[15px] font-bold">
                {current ? current.name : O.allTitle}
              </h2>
              <p className="mt-0.5 text-[11.5px] text-[#8b909c]">{current ? O.inDept(members.length) : O.total(members.length)}</p>
            </div>
            {!narrow && (
              <div className="flex items-center gap-2 text-[12px] text-[#9aa0ab]">
                <span className="flex h-8 w-[170px] items-center gap-2 rounded-lg border border-[#E6E6EC] px-2.5">
                  <Icon name="search" size={13} />
                  {O.searchMembers}
                </span>
                <span className="flex h-8 items-center rounded-lg border border-[#E6E6EC] px-2.5 font-medium text-[#2a2d36]">{O.sort}</span>
              </div>
            )}
          </div>

          <div data-tl="org-table" className="no-scrollbar mt-3 max-h-[470px] overflow-y-auto">
            <div className={`grid ${cols} items-center gap-3 border-b border-[#F0F0F4] pb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]`}>
              {heads.map((h, i) => (
                <span key={i}>{h}</span>
              ))}
            </div>
            {members.length === 0 && (
              <p data-tl="org-empty" className="py-16 text-center text-[13px] text-[#8b909c]">
                {O.empty}
              </p>
            )}
            {members.map((u) => {
              const dept = depts.find((d) => d.name === u.dept);
              return (
                <div key={u.id} data-tl={`org-row-${u.id}`} className={`grid ${cols} tl-fade-in items-center gap-3 py-[9px] text-[12.5px] ${menu === u.id ? "relative z-20" : ""}`}>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white" style={{ background: tint(u.id) }}>
                      {initials(u.name)}
                    </span>
                    <b className="truncate font-medium">{u.name}</b>
                  </div>
                  {!narrow && <span className="truncate text-[#4b5060]">{u.email}</span>}
                  {!narrow && <span>{u.role === "User" ? "User" : "Admin"}</span>}
                  <span>
                    <DeptPill dept={dept} />
                  </span>
                  <span>
                    <span
                      className={`rounded-full px-2 py-[2px] text-[10.5px] font-semibold ${u.suspended ? "bg-[#FDECEC] text-[#D1343B]" : "bg-[#E8F8EE] text-[#1B7F4B]"}`}
                    >
                      {u.suspended ? O.suspended : O.active}
                    </span>
                  </span>
                  {!narrow && <span className="text-[#6b7280]">{COPY.lastActive}</span>}
                  <div className="relative">
                    <button
                      data-tl={`org-actions-${u.id}`}
                      aria-label="Actions"
                      onClick={(e) => {
                        e.stopPropagation();
                        tl.setVar("orgMenu", menu === u.id ? "" : u.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-[#6b7280] transition-[background,transform] data-[pressed=true]:scale-90 hover:bg-[#F3F4F6]"
                    >
                      <Icon name="dots" size={16} />
                    </button>
                    {menu === u.id && (
                      <Popover>
                        <p data-tl="org-move-heading" className="px-3 pb-1 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9aa0ab]">
                          {O.moveTo}
                        </p>
                        {depts.map((d) => (
                          <div
                            key={d.id}
                            data-tl={`org-move-${d.id}`}
                            onClick={() => {
                              tl.setVar("users", users.map((x) => (x.id === u.id ? { ...x, dept: d.name } : x)));
                              tl.setVar("orgMenu", "");
                              showAdminToast(tl, COPY.filters.moved(u.name, d.name));
                            }}
                            className="flex h-8 items-center gap-2 rounded-lg px-3 text-[12.5px] text-[#2a2d36] data-[hover=true]:bg-[#F4ECFF]"
                          >
                            <i className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
                            {d.name}
                          </div>
                        ))}
                      </Popover>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
