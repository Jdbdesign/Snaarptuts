"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  COPY,
  COUNTS,
  DIRECTORY_USERS,
  NEW_USER,
  productById,
  productsLabel,
  ROW_ACTIONS,
  ROW_ROLES,
  START_PRODUCTS,
} from "../admin-data";
import { ProductIcon } from "./ProductIcon";

/** Which row popover is open: the Role dropdown, the Products dropdown or the Actions menu of one row. */
export type RowMenu = { kind: "role" | "products" | "actions"; id: string };

const COLUMNS_WIDE = "grid-cols-[minmax(180px,1.2fr)_minmax(190px,1.3fr)_170px_90px_150px_90px_64px]";
const COLUMNS_NARROW = "grid-cols-[1fr_118px_132px_40px]";

const STATS: { id: "active" | "suspended" | "admins"; icon: IconName; tile: string }[] = [
  { id: "active", icon: "userCheck", tile: "bg-[#E4F6EA] text-[#22A06B]" },
  { id: "suspended", icon: "ban", tile: "bg-[#FFF0E0] text-[#F28C28]" },
  { id: "admins", icon: "shield", tile: "bg-[#F1E8FD] text-[#8B5CF6]" },
];

type Row = {
  id: string;
  name: string;
  sub?: string;
  email: string;
  role: string;
  products: string[] | number | string;
};

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
        active ? "border-[#7C39ED] shadow-[0_0_0_3px_rgba(124,57,237,0.14)]" : "border-[#E5E7EB]"
      }`}
    >
      <span className="truncate">{children}</span>
      <Icon name="chevronDown" size={13} className="shrink-0 text-[#6b7280]" />
    </button>
  );
}

function Popover({ open, className = "", children }: { open: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute z-30 rounded-xl border border-[#EEEEF2] bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(17,17,17,0.25)] ${
        open ? "tl-pop-in" : "hidden"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Admin Panel > Users (login.snaarp.com/admin/users), content area only. Scene variables: `created` (the new
 * user exists: page 3 of 41 with just that row), `rowMenu` (the open popover), `userProducts` (what the new
 * user has). The existing 40 people are a static sample on page 1.
 */
export function UsersPage({ tl }: { tl: Timeline }) {
  const narrow = useNarrow();
  const created = useTimelineVar(tl, "created", false);
  const menu = useTimelineVar<RowMenu | null>(tl, "rowMenu", null);
  const owned = useTimelineVar<string[]>(tl, "userProducts", START_PRODUCTS);

  const active = created ? COUNTS.after : COUNTS.before;
  const rows: Row[] = created
    ? [{ id: NEW_USER.id, name: `${NEW_USER.first} ${NEW_USER.last}`, sub: NEW_USER.job, email: NEW_USER.email, role: "User", products: owned }]
    : DIRECTORY_USERS.map((u) => ({ ...u, products: u.products }));
  const showing = created ? `Showing ${active}–${active} of ${active}` : `Showing 1–${COPY.pageSize} of ${active}`;
  const pages = Math.ceil(active / COPY.pageSize);
  const page = created ? pages : 1;

  const toggle = (kind: RowMenu["kind"], id: string) =>
    tl.setVar("rowMenu", menu && menu.kind === kind && menu.id === id ? null : { kind, id });
  const isOpen = (kind: RowMenu["kind"], id: string) => !!menu && menu.kind === kind && menu.id === id;

  const cols = narrow ? COLUMNS_NARROW : COLUMNS_WIDE;
  const heads = narrow
    ? [COPY.columns.user, COPY.columns.role, COPY.columns.products, ""]
    : [COPY.columns.user, COPY.columns.email, COPY.columns.role, COPY.columns.status, COPY.columns.products, COPY.columns.lastActive, COPY.columns.actions];

  return (
    <div onClick={() => tl.setVar("rowMenu", null)}>
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
              <p className="text-[24px] font-bold leading-8">
                {s.id === "active" ? active : s.id === "suspended" ? COUNTS.suspended : COUNTS.admins}
              </p>
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
              {active}
            </span>
          </span>
          <span className="flex items-center gap-2 pb-2.5 text-[#6b7280]">
            <Icon name="ban" size={15} />
            {COPY.tabs.suspended}
            <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F0F0F4] px-1 text-[10.5px]">
              {COUNTS.suspended}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 px-6 pt-4">
          <div className="flex h-[38px] min-w-0 flex-1 items-center gap-2.5 rounded-full border border-[#E6E6EC] px-3.5 text-[13px] text-[#9aa0ab] md:max-w-[340px]">
            <Icon name="search" size={15} className="shrink-0" />
            <span className="truncate">{COPY.search}</span>
          </div>
          {!narrow && (
            <>
              <span className="flex h-[38px] w-[170px] items-center justify-between rounded-full border border-[#E6E6EC] px-3.5 text-[13px] text-[#9aa0ab]">
                {COPY.allDepartments}
                <Icon name="chevronDown" size={14} />
              </span>
              <span className="flex h-[38px] w-[150px] items-center justify-between rounded-full border border-[#E6E6EC] px-3.5 text-[13px]">
                {COPY.allProducts}
                <Icon name="chevronDown" size={14} />
              </span>
            </>
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

          {rows.map((r) => {
            const productIds = Array.isArray(r.products) ? r.products : null;
            const productText = productIds ? productsLabel(productIds) : typeof r.products === "number" ? `${r.products} products` : r.products;
            const interactive = r.id === NEW_USER.id;
            return (
              <div
                key={r.id}
                data-tl={`row-${r.id}`}
                className={`grid ${cols} items-center gap-3 px-6 py-[13px] text-[13.5px] ${interactive ? "tl-fade-in" : ""}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3E6FF] text-[11px] font-semibold text-brand">
                    {interactive ? NEW_USER.initials : r.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <b className="block truncate font-semibold">{r.name}</b>
                    {r.sub && <span className="block truncate text-[11.5px] text-[#8b909c]">{r.sub}</span>}
                  </div>
                </div>

                {!narrow && <span className="truncate text-[#4b5060]">{r.email}</span>}

                <div className="relative min-w-0">
                  {interactive ? (
                    <Pill hook={`role-${r.id}`} active={isOpen("role", r.id)} onClick={() => toggle("role", r.id)}>
                      {r.role}
                    </Pill>
                  ) : (
                    <span className="flex h-8 w-fit items-center gap-2 rounded-lg border border-[#E5E7EB] px-2.5 text-[12.5px]">
                      {r.role}
                      <Icon name="chevronDown" size={13} className="text-[#6b7280]" />
                    </span>
                  )}
                  <Popover open={isOpen("role", r.id)} className="left-0 top-[38px] w-[220px]">
                    {ROW_ROLES.map((role) => (
                      <div
                        key={role}
                        data-tl={`role-opt-${role.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => tl.setVar("rowMenu", null)}
                        className={`flex h-9 items-center justify-between rounded-lg px-3 text-[13px] transition-colors data-[hover=true]:bg-[#F4ECFF] ${
                          role === r.role ? "font-semibold text-brand" : "text-[#2a2d36]"
                        }`}
                      >
                        {role}
                        {role === r.role && <Icon name="check" size={14} />}
                      </div>
                    ))}
                  </Popover>
                </div>

                {!narrow && (
                  <span>
                    <span className="rounded-full bg-[#E8F8EE] px-2.5 py-[3px] text-[11.5px] font-semibold text-[#1B7F4B]">{COPY.status}</span>
                  </span>
                )}

                <div className="relative min-w-0">
                  {interactive ? (
                    <Pill hook={`products-${r.id}`} active={isOpen("products", r.id)} onClick={() => toggle("products", r.id)}>
                      {productText}
                    </Pill>
                  ) : (
                    <span className="flex h-8 w-fit max-w-full items-center gap-2 rounded-lg border border-[#E5E7EB] px-2.5 text-[12.5px]">
                      <span className="truncate">{productText}</span>
                      <Icon name="chevronDown" size={13} className="shrink-0 text-[#6b7280]" />
                    </span>
                  )}
                  {productIds && (
                    <Popover open={isOpen("products", r.id)} className="left-0 top-[38px] w-[200px]">
                      <div data-tl="products-list">
                        {productIds.map((id) => (
                          <div key={id} data-tl={`products-item-${id}`} className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-[13px] text-[#2a2d36]">
                            <ProductIcon product={productById(id)} size={18} />
                            {productById(id).name}
                          </div>
                        ))}
                      </div>
                    </Popover>
                  )}
                </div>

                {!narrow && <span className="text-[#6b7280]">{COPY.lastActive}</span>}

                <div className="relative">
                  {interactive ? (
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
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center text-[#6b7280]">
                      <Icon name="dots" size={18} />
                    </span>
                  )}
                  <Popover open={isOpen("actions", r.id)} className="right-0 top-[36px] w-[190px]">
                    {ROW_ACTIONS.map((a) => (
                      <div
                        key={a.id}
                        data-tl={`action-${a.id}`}
                        onClick={() => {
                          tl.setVar("rowMenu", null);
                          if (a.id === "products") tl.setVar("dialog", "manage");
                        }}
                        className={`flex h-9 items-center gap-2.5 rounded-lg px-3 text-[13px] font-medium transition-colors data-[hover=true]:bg-[#F3F4F6] ${
                          a.gap ? "mt-1 border-t border-[#F0F0F4] pt-1" : ""
                        } ${a.danger ? "text-[#E5484D]" : "text-[#2a2d36]"}`}
                      >
                        {a.icon && <Icon name={a.icon} size={15} className="shrink-0" />}
                        {a.label}
                      </div>
                    ))}
                  </Popover>
                </div>
              </div>
            );
          })}
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
