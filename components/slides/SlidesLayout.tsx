"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import { APP_RAIL_ITEMS } from "@/components/docs/docs-data";
import { useNarrow } from "@/lib/useNarrow";
import { SHELL, type NavId } from "./slides-data";

/** Narrow screens: the whole layout is enlarged so it stays readable once the scene is scaled down (same as Snaarp Doc). */
export const SLIDES_NARROW_ZOOM = 2.4;

const ACTIVE_APP = "slides";

const NAV: { id: NavId; label: string; icon: "slHome" | "star" | "trash" }[] = [
  { id: "presentations", label: SHELL.navPresentations, icon: "slHome" },
  { id: "starred", label: SHELL.navStarred, icon: "star" },
  { id: "trash", label: SHELL.navTrash, icon: "trash" },
];

type Props = {
  /** Which sidebar item has the blue pill. */
  active: NavId;
  /** Rendered above everything (toasts). */
  overlay?: ReactNode;
  children: ReactNode;
};

/**
 * The Snaarp Slides home shell: app rail, sidebar, top bar and a content area. It never changes between the home,
 * Starred and Trash screens; only `active` and the children do. Under 900px wide the rail and sidebar shrink to icon-only columns.
 * Sidebar items are [data-tl=nav-<id>]; the content area is [data-tl=slides-main].
 */
export function SlidesLayout({ active, overlay, children }: Props) {
  const narrow = useNarrow();
  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#111]">
      <div className="flex h-full w-full" style={{ zoom: narrow ? SLIDES_NARROW_ZOOM : 1 }}>
        <AppRail slim={narrow} />
        <Sidebar active={active} slim={narrow} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar narrow={narrow} />
          <main data-tl="slides-main" className="relative min-h-0 flex-1 overflow-hidden bg-white">
            {children}
          </main>
        </div>
      </div>
      {overlay}
    </div>
  );
}

function AppRail({ slim }: { slim: boolean }) {
  return (
    <aside className={`relative flex h-full shrink-0 flex-col items-center border-r border-[#EEEEF1] bg-white pt-[17px] ${slim ? "w-[34px]" : "w-[59px]"}`}>
      <Icon name="menu" size={slim ? 14 : 19} className="text-[#6b7280]" />
      <ul className="mt-[24px] flex min-h-0 flex-col items-center gap-[6px] overflow-hidden">
        {APP_RAIL_ITEMS.map((a) => {
          const on = a.id === ACTIVE_APP;
          return (
            <li
              key={a.id}
              className={`flex shrink-0 flex-col items-center justify-center rounded-[10px] ${slim ? "h-[26px] w-[26px]" : "h-[44px] w-[50px] gap-[4px]"} ${on ? "bg-[#E8E6F7]" : ""}`}
            >
              <ProductLogo name={a.logo} size={slim ? 16 : 20} className="rounded-[6px]" />
              {!slim && <span className="text-[9px] leading-[11px] text-[#6b7280]">{a.label}</span>}
            </li>
          );
        })}
      </ul>
      <div className={`absolute bottom-[8px] flex flex-col items-center bg-white ${slim ? "" : "w-full gap-[3px] pt-1"}`}>
        <Icon name="logout" size={slim ? 14 : 18} className="text-[#374151]" />
        {!slim && <span className="text-[9px] leading-[11px] text-[#6b7280]">{SHELL.logout}</span>}
      </div>
    </aside>
  );
}

function Sidebar({ active, slim }: { active: NavId; slim: boolean }) {
  const row = `flex items-center rounded-full text-[11.5px] text-[#1f2430] transition-[background,transform] duration-150 data-[pressed=true]:scale-[0.98] ${
    slim ? "mx-auto h-[26px] w-[26px] justify-center" : "h-[29px] gap-[9px] px-[13px]"
  }`;
  return (
    <nav className={`flex h-full shrink-0 flex-col border-r border-[#EEEEF1] bg-white ${slim ? "w-[38px]" : "w-[181px]"}`}>
      <div className={`flex h-[52px] shrink-0 items-center ${slim ? "justify-center" : "gap-[9px] px-[19px]"}`}>
        <ProductLogo name="presentation" size={slim ? 18 : 19} className="rounded-[5px]" />
        {!slim && (
          <>
            <span className="text-[14px] text-[#374151]">{SHELL.appName}</span>
            <Icon name="chevronLeft" size={13} className="ml-auto text-[#374151]" />
          </>
        )}
      </div>

      <ul className={`flex flex-col gap-[3px] pt-[2px] ${slim ? "" : "px-[7px]"}`}>
        {NAV.map((n) => (
          <li
            key={n.id}
            data-tl={`nav-${n.id}`}
            className={`${row} ${n.id === active ? "bg-[#E3ECFB] font-medium text-[#2F62C8]" : "data-[hover=true]:bg-[#F3F4F6]"}`}
          >
            <Icon name={n.icon} size={slim ? 14 : 15} className="shrink-0" />
            {!slim && n.label}
          </li>
        ))}
      </ul>

      <div className={`pt-[12px] ${slim ? "" : "px-[7px]"}`}>
        {!slim && <p className="flex h-[20px] items-center px-[13px] text-[9.5px] tracking-[0.03em] text-[#6b7280]">{SHELL.foldersLabel}</p>}
        {!slim && (
          <p className="flex h-[22px] items-center justify-between px-[13px] pt-[4px] text-[9.5px] tracking-[0.03em] text-[#6b7280]">
            {SHELL.foldersLabel}
            <Icon name="plus" size={12} />
          </p>
        )}
        <div className={`${row} mt-[3px] bg-[#E3ECFB] text-[#2F62C8] ${slim ? "" : "text-[11px]"}`}>
          <Icon name="folder" size={slim ? 14 : 14} className="shrink-0" />
          {!slim && SHELL.allPresentations}
        </div>
      </div>

      <div className="flex-1" />
      <div className={`flex flex-col border-t border-[#EEEEF1] py-[6px] ${slim ? "items-center" : "px-[7px]"}`}>
        <div className={`${row} text-[#C0272D]`}>
          <Icon name="bug" size={slim ? 14 : 15} className="shrink-0" />
          {!slim && SHELL.reportBug}
        </div>
      </div>
    </nav>
  );
}

function TopBar({ narrow }: { narrow: boolean }) {
  return (
    <header className="flex h-[52px] shrink-0 items-center border-b border-[#EEEEF1] bg-white pl-[18px] pr-[16px]">
      <div data-tl="slides-search" className={`flex h-[32px] items-center gap-[9px] rounded-full bg-[#F1F2F4] px-[13px] text-[11px] text-[#4b5060] ${narrow ? "w-[250px]" : "w-[422px]"}`}>
        <Icon name="search" size={13} className="text-[#4b5060]" />
        {SHELL.searchPlaceholder}
      </div>
      <div className="ml-auto flex items-center gap-[14px] text-[#374151]">
        <Icon name="users" size={15} />
        <Icon name="grid4" size={15} />
        {!narrow && (
          <span className="flex h-[22px] items-center overflow-hidden rounded-[5px] bg-[#F1F2F4]">
            <span className="flex h-full w-[24px] items-center justify-center"><Icon name="listView" size={12} /></span>
            <span className="flex h-full w-[24px] items-center justify-center bg-[#DCE8FB] text-[#2F62C8]"><Icon name="grid4" size={12} /></span>
          </span>
        )}
        {!narrow && (
          <span className="flex items-center gap-[3px] text-[10.5px]">
            {SHELL.sort}
            <Icon name="chevronDown" size={9} />
          </span>
        )}
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white">
          {SHELL.user.initials}
        </span>
      </div>
    </header>
  );
}
