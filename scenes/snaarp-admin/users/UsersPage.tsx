"use client";

import type { ReactNode } from "react";
import { FieldText } from "@/components/admin/TypedField";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { COPY, PRODUCTS, productById, ROW_ACTIONS, ROW_ROLES } from "../admin-data";
import { initials, PEOPLE_COPY, productCount, tint, type Department, type Person } from "../people-data";
import { showAdminToast } from "./AdminToast";
import { ProductIcon } from "./ProductIcon";

/** Which row popover is open: the Role dropdown, the Products dropdown or the Actions menu of one row. */
export type RowMenu = { kind: "role" | "products" | "actions"; id: string };

const COLUMNS_WIDE = "grid-cols-[minmax(170px,1.2fr)_minmax(190px,1.3fr)_170px_90px_150px_90px_64px]";
const COLUMNS_NARROW = "grid-cols-[1fr_118px_132px_40px]";

const STATS: { id: "active" | "suspended" | "admins"; icon: IconName; tile: string }[] = [
  { id: "active", icon: "userCheck", tile: "bg-[#E4F6EA] text-[#22A06B]" },
  { id: "suspended", icon: "ban", tile: "bg-[#FFF0E0] text-[#F28C28]" },
  { id: "admins", icon: "shield", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
];

const BOX =
  "flex h-[38px] items-center justify-between gap-2 rounded-full border bg-white px-3.5 text-[13px] transition-[border-color,box-shadow] duration-150";
const RING = "border-[#7C39ED] shadow-[0_0_0_3px_rgba(124,57,237,0.14)]";

/** A button-like pill with a chevron, used for the Role and Products cells. */
function Pill({ hook, active, onClick, children }: { hook: string; active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      data-tl={hook}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex h-8 max-w-full items-center gap-2 rounded-lg border bg-white px-2.5 text-[12.5px] text-[#2a2d36] transition-[border-color,box-shadow,transform] duration-150 data-[pressed=true]:scale-95 ${
        active ? RING : "border-[#E5E7EB]"
      }`}
    >
      <span className="truncate">{children}</span>
      <Icon name="chevronDown" size={13} className="shrink-0 text-[#6b7280]" />
    </button>
  );
}

function Popover({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`tl-pop-in absolute z-30 rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)] ${className}`}
    >
      {children}
    </div>
  );
}

/** Round plus / minus button inside the Products dropdown. */
function RoundButton({ hook, label, kind, onClick }: { hook: string; label: string; kind: "plus" | "minus"; onClick: () => void }) {
  return (
    <button
      data-tl={hook}
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6b7280] transition-[background,transform] data-[pressed=true]:scale-90 data-[hover=true]:bg-[#F3F4F6]"
    >
      <Icon name={kind === "plus" ? "plus" : "edMinus"} size={12} />
    </button>
  );
}

/** Dept colour for the person's department pill (not shown on the Users page, used by the Organization page). */
export const deptColor = (depts: Department[], name: string) => depts.find((d) => d.name === name)?.color ?? "#9aa0ab";

/**
 * Admin Panel > Users (login.snaarp.com/admin/users), content area only. Scene variables: `users` (every
 * member), `created` (steps 1-4: only the new user is listed, on page 2 of 2), `rowMenu` (the open row popover),
 * `filterMenu` ("dept" | "product"), `deptFilter` (names), `productFilter` (id), `field:usersearch`, `depts`.
 */
export function UsersPage({ tl }: { tl: Timeline }) {
  const narrow = useNarrow();
  const users = useTimelineVar<Person[]>(tl, "users", []);
  const depts = useTimelineVar<Department[]>(tl, "depts", []);
  const created = useTimelineVar(tl, "created", false);
  const menu = useTimelineVar<RowMenu | null>(tl, "rowMenu", null);
  const filterMenu = useTimelineVar<string>(tl, "filterMenu", "");
  const deptFilter = useTimelineVar<string[]>(tl, "deptFilter", []);
  const productFilter = useTimelineVar<string>(tl, "productFilter", "");
  const search = useTimelineVar<string>(tl, "field:usersearch", "");
  const searchFocus = useTimelineVar<string>(tl, "focus", "") === "usersearch";

  const activeUsers = users.filter((u) => !u.suspended);
  const filtered = activeUsers.filter(
    (u) =>
      (!search || `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())) &&
      (deptFilter.length === 0 || deptFilter.includes(u.dept)) &&
      (!productFilter || u.products.includes(productFilter)),
  );
  const filtering = !!search || deptFilter.length > 0 || !!productFilter;
  const rows = created ? filtered.filter((u) => u.id === "sam") : filtering ? filtered : filtered.slice(0, COPY.pageSize);
  const total = created ? activeUsers.length : filtered.length;
  const showing = created
    ? `Showing ${total}–${total} of ${total}`
    : rows.length === 0
      ? "Showing 0 of 0"
      : `Showing 1–${rows.length} of ${total}`;
  const pages = Math.max(1, Math.ceil(total / COPY.pageSize));
  const page = created ? pages : 1;
  const stat = {
    active: activeUsers.length,
    suspended: users.filter((u) => u.suspended).length,
    admins: activeUsers.filter((u) => u.role !== "User").length,
  };

  const setUser = (id: string, patch: Partial<Person>) => tl.setVar("users", users.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  const toggle = (kind: RowMenu["kind"], id: string) => {
    tl.setVar("filterMenu", "");
    tl.setVar("rowMenu", menu && menu.kind === kind && menu.id === id ? null : { kind, id });
  };
  const isOpen = (kind: RowMenu["kind"], id: string) => !!menu && menu.kind === kind && menu.id === id;
  const closeAll = () => {
    tl.setVar("rowMenu", null);
    tl.setVar("filterMenu", "");
  };
  const toggleFilter = (which: "dept" | "product") => {
    tl.setVar("rowMenu", null);
    tl.setVar("focus", "");
    tl.setVar("filterMenu", filterMenu === which ? "" : which);
  };
  const clearFilters = () => {
    tl.setVar("deptFilter", []);
    tl.setVar("productFilter", "");
    tl.setVar("field:usersearch", "");
    closeAll();
  };

  const cols = narrow ? COLUMNS_NARROW : COLUMNS_WIDE;
  const heads = narrow
    ? [COPY.columns.user, COPY.columns.role, COPY.columns.products, ""]
    : [COPY.columns.user, COPY.columns.email, COPY.columns.role, COPY.columns.status, COPY.columns.products, COPY.columns.lastActive, COPY.columns.actions];
  const productLabel = productFilter ? productById(productFilter).name : COPY.allProducts;
  const deptLabel = deptFilter.length === 0 ? COPY.allDepartments : deptFilter.length === 1 ? deptFilter[0] : `${deptFilter.length} departments`;

  return (
    <div onClick={closeAll}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 data-tl="users-heading" className="text-[26px] font-semibold leading-[34px]">
            {COPY.pageTitle}
          </h1>
          <p className="mt-1 text-[14px] text-[#6b7280]">{COPY.pageSubtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {!narrow && (
            <span className="flex h-10 items-center gap-2 rounded-full border border-brand px-[18px] text-[13px] font-semibold text-brand">
              <Icon name="fmEmail" size={15} />
              {COPY.createEmail}
            </span>
          )}
          <button
            data-tl="btn-bulk-user"
            onClick={(e) => {
              e.stopPropagation();
              tl.setVar("dialog", "bulk");
            }}
            className="flex h-10 items-center gap-2 rounded-full px-3 text-[13px] font-medium text-[#2a2d36] transition-[background,transform] data-[pressed=true]:scale-95 hover:bg-[#F0F0F4]"
          >
            <Icon name="users" size={15} />
            {PEOPLE_COPY.bulkUser}
          </button>
          <button
            data-tl="btn-create-user"
            onClick={(e) => {
              e.stopPropagation();
              tl.setVar("dialog", "create");
            }}
            className="flex h-10 items-center gap-2 rounded-full bg-brand px-[18px] text-[13px] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(112,20,217,0.6)] transition-transform data-[pressed=true]:scale-95"
          >
            <Icon name="plus" size={14} />
            {COPY.createUser}
          </button>
        </div>
      </div>

      <div className={`mt-6 grid gap-5 ${narrow ? "grid-cols-2" : "grid-cols-3"}`}>
        {STATS.map((s) => (
          <div
            key={s.id}
            data-tl={`stat-${s.id}`}
            className="flex h-[92px] items-center gap-4 rounded-2xl border border-[#F0F0F4] bg-white px-6 shadow-[0_6px_24px_-14px_rgba(17,17,17,0.12)]"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile}`}>
              <Icon name={s.icon} size={22} />
            </span>
            <div>
              <p className="text-[24px] font-bold leading-8">{stat[s.id]}</p>
              <p className="text-[12px] leading-4 text-[#6b7280]">{COPY.stats[s.id]}</p>
            </div>
          </div>
        ))}
      </div>

      <div data-tl="users-directory" className="mt-6 rounded-2xl border border-[#F0F0F4] bg-white">
        <div className="flex items-center justify-between px-6 pb-3 pt-[22px]">
          <h2 className="text-[18px] font-bold">{COPY.directory}</h2>
          <span className="flex h-[30px] items-center gap-1.5 rounded-lg border border-[#E6E6EC] bg-white px-3 text-[12px] font-medium">
            <Icon name="refresh" size={14} />
            {COPY.refresh}
          </span>
        </div>

        <div className="flex gap-6 border-b border-[#F0F0F4] px-6 text-[13px] font-medium">
          <span className="flex items-center gap-2 border-b-2 border-[#111] pb-2.5">
            <Icon name="users" size={15} />
            {COPY.tabs.active}
            <span data-tl="active-badge" className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#111] px-1 text-[10.5px] text-white">
              {stat.active}
            </span>
          </span>
          <span className="flex items-center gap-2 pb-2.5 text-[#6b7280]">
            <Icon name="ban" size={15} />
            {COPY.tabs.suspended}
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F0F0F4] px-1 text-[10.5px]">
              {stat.suspended}
            </span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-6 pt-4">
          <div
            data-tl="field-usersearch"
            onClick={(e) => {
              e.stopPropagation();
              closeAll();
              tl.setVar("focus", "usersearch");
            }}
            className={`${BOX} min-w-0 flex-1 justify-start md:max-w-[340px] md:flex-none md:basis-[340px] ${searchFocus ? RING : "border-[#E6E6EC]"}`}
          >
            <Icon name="search" size={15} className="shrink-0 text-[#9aa0ab]" />
            <FieldText tl={tl} id="usersearch" placeholder={COPY.search} />
          </div>

          <div className="relative">
            <button
              data-tl="filter-dept"
              onClick={(e) => {
                e.stopPropagation();
                toggleFilter("dept");
              }}
              className={`${BOX} w-[170px] data-[pressed=true]:scale-95 ${deptFilter.length ? "text-ink" : "text-[#9aa0ab]"} ${filterMenu === "dept" ? RING : "border-[#E6E6EC]"}`}
            >
              <span className="truncate">{deptLabel}</span>
              <Icon name="chevronDown" size={14} className="shrink-0" />
            </button>
            {filterMenu === "dept" && (
              <Popover className="left-0 top-[44px] w-[200px]">
                {depts.map((d) => {
                  const on = deptFilter.includes(d.name);
                  return (
                    <div
                      key={d.id}
                      data-tl={`dept-opt-${d.id}`}
                      onClick={() => tl.setVar("deptFilter", on ? deptFilter.filter((n) => n !== d.name) : [...deptFilter, d.name])}
                      className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-[#2a2d36] data-[hover=true]:bg-[#F4ECFF]"
                    >
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${on ? "border-brand bg-brand text-white" : "border-[#CBD0DA]"}`}
                      >
                        {on && <Icon name="check" size={11} />}
                      </span>
                      {d.name}
                    </div>
                  );
                })}
              </Popover>
            )}
          </div>

          <div className="relative">
            <button
              data-tl="filter-product"
              onClick={(e) => {
                e.stopPropagation();
                toggleFilter("product");
              }}
              className={`${BOX} w-[150px] data-[pressed=true]:scale-95 ${filterMenu === "product" ? RING : productFilter ? "border-[#7C39ED]" : "border-[#E6E6EC]"}`}
            >
              <span className="truncate">{productLabel}</span>
              <Icon name="chevronDown" size={14} className="shrink-0" />
            </button>
            {filterMenu === "product" && (
              <Popover className="left-0 top-[44px] w-[190px]">
                <div data-tl="product-filter-list" className="no-scrollbar max-h-[236px] overflow-y-auto">
                  {[{ id: "", name: COPY.allProducts }, ...[...PRODUCTS].sort((a, b) => a.name.localeCompare(b.name))].map((p) => (
                    <div
                      key={p.id || "all"}
                      data-tl={`product-opt-${p.id || "all"}`}
                      onClick={() => {
                        tl.setVar("productFilter", p.id);
                        tl.setVar("filterMenu", "");
                      }}
                      className={`flex h-9 items-center justify-between rounded-lg px-2.5 text-[13px] data-[hover=true]:bg-[#F4ECFF] ${
                        productFilter === p.id ? "font-semibold text-brand" : "text-[#2a2d36]"
                      }`}
                    >
                      {p.name}
                      {productFilter === p.id && <Icon name="check" size={14} />}
                    </div>
                  ))}
                </div>
              </Popover>
            )}
          </div>

          {filtering && (
            <button
              data-tl="btn-clear-filters"
              onClick={(e) => {
                e.stopPropagation();
                clearFilters();
              }}
              className="flex h-[38px] items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-[#2a2d36] transition-[background,transform] data-[pressed=true]:scale-95 hover:bg-[#F0F0F4]"
            >
              <Icon name="x" size={13} />
              {COPY.filters.clear}
            </button>
          )}
        </div>

        <div data-tl="users-table" className="mt-4">
          <div
            className={`grid ${cols} items-center gap-3 border-y border-[#F0F0F4] bg-[#FAFAFB] px-6 py-3 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8b909c]`}
          >
            {heads.map((h, i) => (
              <span key={i}>{h}</span>
            ))}
          </div>

          {rows.length === 0 && <p className="px-6 py-10 text-center text-[13px] text-[#8b909c]">{COPY.filters.noResults}</p>}

          {rows.map((r) => (
            <div
              key={r.id}
              data-tl={`row-${r.id}`}
              className={`grid ${cols} items-center gap-3 px-6 py-[13px] text-[13.5px] ${r.id === "sam" ? "tl-fade-in" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{ background: `${tint(r.id)}22`, color: tint(r.id) }}
                >
                  {initials(r.name)}
                </span>
                <b className="block truncate font-semibold">{r.name}</b>
              </div>

              {!narrow && <span className="truncate text-[#4b5060]">{r.email}</span>}

              <div className="relative min-w-0">
                <Pill hook={`role-${r.id}`} active={isOpen("role", r.id)} onClick={() => toggle("role", r.id)}>
                  {r.role}
                </Pill>
                {isOpen("role", r.id) && (
                  <Popover className="left-0 top-[38px] w-[220px]">
                    {ROW_ROLES.map((role) => (
                      <div
                        key={role}
                        data-tl={`role-opt-${role.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => {
                          setUser(r.id, { role: role as Person["role"] });
                          tl.setVar("rowMenu", null);
                          showAdminToast(tl, COPY.filters.roleChanged(r.name, role));
                        }}
                        className={`flex h-9 items-center justify-between rounded-lg px-3 text-[13px] transition-colors data-[hover=true]:bg-[#F4ECFF] ${
                          role === r.role ? "font-semibold text-brand" : "text-[#2a2d36]"
                        }`}
                      >
                        {role}
                        {role === r.role && <Icon name="check" size={14} />}
                      </div>
                    ))}
                  </Popover>
                )}
              </div>

              {!narrow && (
                <span>
                  <span className="rounded-full bg-[#E8F8EE] px-2.5 py-[3px] text-[11.5px] font-semibold text-[#1B7F4B]">{COPY.status}</span>
                </span>
              )}

              <div className="relative min-w-0">
                <Pill hook={`products-${r.id}`} active={isOpen("products", r.id)} onClick={() => toggle("products", r.id)}>
                  {productCount(r.products)}
                </Pill>
                {isOpen("products", r.id) && (
                  <Popover className="left-0 top-[38px] w-[230px] !p-1">
                    <div data-tl="pp-scroll" className="no-scrollbar max-h-[190px] overflow-y-auto p-0.5">
                      {PRODUCTS.filter((p) => r.products.includes(p.id)).map((p) => (
                        <div key={p.id} data-tl={`pp-item-${p.id}`} className="flex h-9 items-center gap-2.5 rounded-lg px-2 text-[13px] text-[#2a2d36]">
                          <ProductIcon product={p} size={18} />
                          <span className="flex-1 truncate">{p.name}</span>
                          <RoundButton
                            hook={`pp-remove-${p.id}`}
                            label={COPY.product.remove(p.name)}
                            kind="minus"
                            onClick={() => {
                              setUser(r.id, { products: r.products.filter((id) => id !== p.id) });
                              showAdminToast(tl, COPY.product.removed(p.name, r.name));
                            }}
                          />
                        </div>
                      ))}
                      <p data-tl="pp-add-heading" className="px-2 pb-1 pt-2.5 text-[10px] font-semibold tracking-[0.1em] text-[#9aa0ab]">
                        {COPY.product.list}
                      </p>
                      {PRODUCTS.filter((p) => !r.products.includes(p.id)).map((p) => (
                        <div key={p.id} data-tl={`pp-other-${p.id}`} className="flex h-9 items-center gap-2.5 rounded-lg px-2 text-[13px] text-[#2a2d36]">
                          <ProductIcon product={p} size={18} />
                          <span className="flex-1 truncate">{p.name}</span>
                          <RoundButton
                            hook={`pp-add-${p.id}`}
                            label={COPY.product.add(p.name)}
                            kind="plus"
                            onClick={() => {
                              setUser(r.id, { products: [...r.products, p.id] });
                              showAdminToast(tl, COPY.product.added(p.name, r.name));
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </Popover>
                )}
              </div>

              {!narrow && <span className="text-[#6b7280]">{COPY.lastActive}</span>}

              <div className="relative">
                <button
                  data-tl={`actions-${r.id}`}
                  aria-label="Actions"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle("actions", r.id);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6b7280] transition-[background,transform] data-[pressed=true]:scale-90 hover:bg-[#F3F4F6]"
                >
                  <Icon name="dots" size={18} />
                </button>
                {isOpen("actions", r.id) && (
                  <Popover className="right-0 top-[36px] w-[210px]">
                    {ROW_ACTIONS.map((a) => (
                      <div
                        key={a.id}
                        data-tl={`action-${a.id}`}
                        onClick={() => tl.setVar("rowMenu", null)}
                        className={`flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors data-[hover=true]:bg-[#F3F4F6] ${
                          a.gap ? "mt-1 border-t border-[#F0F0F4] pt-1" : ""
                        } ${a.danger ? "text-[#E5484D]" : "text-[#2a2d36]"}`}
                      >
                        {a.icon && <Icon name={a.icon} size={15} className="shrink-0" />}
                        {a.label}
                      </div>
                    ))}
                  </Popover>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 px-6 pb-5 pt-4 text-[12.5px] text-[#6b7280]">
          <span className="flex items-center gap-4">
            {showing}
            {!narrow && (
              <span className="flex items-center gap-2">
                {COPY.rowsPerPage}
                <span className="flex h-8 items-center gap-1.5 rounded-lg border border-[#E5E7EB] px-2.5 text-[#2a2d36]">
                  {COPY.pageSize}
                  <Icon name="chevronDown" size={13} />
                </span>
              </span>
            )}
          </span>
          <span className="flex items-center gap-2">
            <span className={`flex h-8 items-center rounded-full border border-[#E5E7EB] px-3.5 ${page === 1 ? "text-[#b4b8c2]" : "text-[#2a2d36]"}`}>
              {COPY.pageButtons.previous}
            </span>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <span
                key={n}
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  n === page ? "bg-brand font-semibold text-white" : "border border-[#E5E7EB] text-[#2a2d36]"
                }`}
              >
                {n}
              </span>
            ))}
            <span className={`flex h-8 items-center rounded-full border border-[#E5E7EB] px-3.5 ${page === pages ? "text-[#b4b8c2]" : "text-[#2a2d36]"}`}>
              {COPY.pageButtons.next}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
