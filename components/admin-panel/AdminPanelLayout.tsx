"use client";

import type { ReactNode } from "react";
import { IconRail } from "@/components/admin/AdminLayout";
import { ToastHost } from "@/components/admin/Toast";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { PANEL_MENU, PANEL_RAIL_ITEMS } from "./admin-panel-data";

type Props = {
  tl: Timeline;
  /** Which menu item gets the soft purple "active" fill. */
  active: string;
  /** Small page title in the top bar. */
  title: string;
  /** Letter in the avatar, top right. */
  avatar?: string;
  onNavigate?: (menuId: string) => void;
  children: ReactNode;
};

/**
 * The "Admin Panel" an admin user sees at login.snaarp.com/admin: slim icon rail, white menu column
 * with a purple active item, small top bar. It is NOT the owner portal (AdminLayout): it has
 * purple actions and a soft-purple active item instead of a black pill.
 */
export function AdminPanelLayout({ tl, active, title, avatar = "S", onNavigate, children }: Props) {
  const narrow = useNarrow();

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-white text-ink">
      {!narrow && <IconRail items={PANEL_RAIL_ITEMS} />}

      <nav className="flex h-full w-[240px] shrink-0 flex-col border-r border-[#F0F0F4] bg-white px-3.5 pt-[18px]">
        <div className="flex items-center gap-2.5 px-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-brand text-white">
            <Icon name="gear" size={20} />
          </span>
          <b className="text-[16px] font-bold">Admin Panel</b>
        </div>

        <ul className="mt-6 flex flex-col gap-1">
          {PANEL_MENU.map((m) => (
            <li key={m.id} className={m.gap ? "mt-5" : ""}>
              <div
                data-tl={`panel-menu-${m.id}`}
                onClick={() => onNavigate?.(m.id)}
                className={`flex h-10 items-center gap-3 rounded-[10px] px-3 text-[14px] font-medium transition-[background,transform] duration-150 data-[pressed=true]:scale-[0.98] ${
                  m.id === active ? "bg-[#F0E3FF] text-brand" : "text-[#2a2d36] data-[hover=true]:bg-[#F5F5F8]"
                }`}
              >
                <Icon name={m.icon} size={18} />
                {m.label}
              </div>
            </li>
          ))}
        </ul>

        <div className="flex-1" />
        <div className="-mx-3.5 border-t border-[#F0F0F4] px-6 py-4">
          <p className="flex items-center gap-3 text-[14px] font-medium text-[#2a2d36]">
            <Icon name="arrowLeft" size={17} />
            Back to app
          </p>
          <p className="mt-3.5 pl-[29px] text-[12px] text-[#9aa0ab]">Collapse</p>
        </div>
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#F0F0F4] bg-white pl-8 pr-9">
          <p className="text-[14px] font-medium text-[#2a2d36]">{title}</p>
          <div className="flex items-center gap-5 text-[#4b5060]">
            <Icon name="grid4" size={19} />
            <div className="flex items-center gap-1.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">
                {avatar}
              </span>
              <Icon name="chevronDown" size={14} className="text-[#6b7280]" />
            </div>
          </div>
        </header>
        <main
          data-tl="panel-main"
          className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-[#F7F7F9] px-8 pb-10 pt-[26px]"
        >
          {children}
        </main>
      </div>

      <ToastHost tl={tl} />
    </div>
  );
}
