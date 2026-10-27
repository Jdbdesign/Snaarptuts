"use client";

import type { ReactNode } from "react";
import { Icon, type LogoName, ProductLogo } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { MENU_ITEMS, RAIL_ITEMS } from "./admin-data";
import { ToastHost } from "./Toast";

type Props = {
  tl: Timeline;
  /** Which menu item is the dark "active" pill. */
  active: string;
  onNavigate?: (menuId: string) => void;
  /** Sidebar items. Defaults to the 360 portal menu; Snaarp Mail admin adds Migration. */
  menuItems?: typeof MENU_ITEMS;
  /** Drop the sidebar and the wide header pieces on a phone (pages that are zoomed in need the room). */
  compactOnNarrow?: boolean;
  /** Rendered above everything (modals). */
  overlay?: ReactNode;
  children: ReactNode;
};

/**
 * The Snaarp admin shell: far-left icon rail, second sidebar menu, top bar and a scrolling
 * main area. Shared by every admin step so it is never duplicated.
 */
export function AdminLayout({ tl, active, onNavigate, menuItems, compactOnNarrow, overlay, children }: Props) {
  const narrow = useNarrow();

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white text-ink">
      {!narrow && <IconRail />}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header compact={narrow && !!compactOnNarrow} />
        <div className="flex min-h-0 flex-1">
          {!(narrow && compactOnNarrow) && <Sidebar active={active} onNavigate={onNavigate} items={menuItems ?? MENU_ITEMS} />}
          <main
            data-tl="admin-main"
            className="no-scrollbar min-w-0 flex-1 overflow-y-auto bg-[#F7F7F9] px-8 pb-10 pt-[22px]"
          >
            {children}
          </main>
        </div>
      </div>

      <ToastHost tl={tl} />
      {overlay}
    </div>
  );
}

/** Far-left slim rail. The Admin Panel reuses it with its own list of items. */
export function IconRail({ items = RAIL_ITEMS }: { items?: { label: string; logo: LogoName }[] }) {
  return (
    <aside className="flex h-full w-[68px] shrink-0 flex-col items-center border-r border-[#F0F0F4] bg-white pt-[26px]">
      <Icon name="menu" size={20} className="text-[#4b5060]" />
      <ul className="mt-[42px] flex flex-col gap-[27px]">
        {items.map((r) => (
          <li key={r.label} className="flex flex-col items-center gap-[5px]">
            <ProductLogo name={r.logo} size={20} className="rounded-[6px]" />
            <span className="text-[8px] leading-[10px] text-[#6b7280]">{r.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Header({ compact }: { compact?: boolean }) {
  return (
    <header className="relative flex h-[85px] shrink-0 items-center border-b border-[#F0F0F4] bg-white">
      <p className="w-[252px] pl-[22px] text-[24px] font-bold tracking-tight">Snaarp</p>
      {!compact && (<>
      <div
        className="absolute flex h-9 items-center justify-center gap-2 rounded-lg border border-[#E6E6EC] bg-white text-[12.5px] font-medium"
        style={{ left: 305, width: 150 }}
      >
        <Icon name="arrowLeft" size={15} />
        Back to user app
      </div>
      <div
        className="absolute flex h-9 items-center gap-2.5 rounded-lg border border-[#EEEEF2] bg-[#F7F7F9] px-3.5 text-[13.5px] text-[#8b909c]"
        style={{ left: 473, width: 316 }}
      >
        <Icon name="search" size={16} />
        Search...
      </div>
      </>)}
      <div className="absolute right-9 flex items-center gap-[26px] text-[#4b5060]">
        <Icon name="bell" size={20} />
        <Icon name="help" size={20} />
        <Icon name="grid4" size={20} />
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F28C28] text-[12px] font-semibold text-white">
            JD
          </span>
          <span className="leading-4">
            <b className="block text-[13px] font-semibold text-ink">Jane Doe</b>
            <span className="text-[11px] text-[#9aa0ab]">Owner</span>
          </span>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active, onNavigate, items }: { active: string; onNavigate?: (id: string) => void; items: typeof MENU_ITEMS }) {
  return (
    <nav className="flex h-full w-[252px] shrink-0 flex-col border-r border-[#F0F0F4] bg-white px-3.5 pt-[23px]">
      <ul className="flex flex-col gap-1">
        {items.map((m) => (
          <li
            key={m.id}
            data-tl={`menu-${m.id}`}
            onClick={() => onNavigate?.(m.id)}
            className={`flex h-10 items-center gap-3 rounded-[10px] px-3 text-[15px] font-medium transition-[background,transform] duration-150 data-[pressed=true]:scale-[0.98] ${
              m.id === active ? "bg-[#0E0E10] text-white" : "text-[#2a2d36] data-[hover=true]:bg-[#F3F3F6]"
            }`}
          >
            <Icon name={m.icon} size={19} />
            {m.label}
          </li>
        ))}
      </ul>

      <div className="mt-[19px] rounded-xl border border-[#F0F0F4] bg-[#FAFAFB] px-3.5 py-3">
        <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.08em] text-[#4b5060]">
          <span className="flex items-center gap-2">
            <Icon name="storage" size={15} />
            STORAGE
          </span>
          <span>0%</span>
        </div>
        <div className="mt-2.5 h-1 rounded-full bg-[#E9E9EE]" />
        <p className="mt-2.5 text-[11px] text-[#6b7280]">0 MB / 600.00 GB</p>
      </div>

      <div className="flex-1" />
      <div className="-mx-3.5 flex h-[60px] items-center gap-3 border-t border-[#F0F0F4] px-6 text-[14px] font-medium text-[#E5484D]">
        <Icon name="bug" size={18} />
        <span className="text-[#E5484D]">Report a Bug</span>
      </div>
    </nav>
  );
}
