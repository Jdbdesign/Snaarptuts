"use client";

import type { ReactNode } from "react";
import { Icon, ProductLogo } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { ACTIVE_APP, APP_RAIL_ITEMS, type DocsNavId, NAV_ITEMS, SHELL } from "./docs-data";

/** Narrow screens: the whole layout is enlarged so it stays readable once the scene is scaled down. */
export const DOCS_NARROW_ZOOM = 2.4;

type Props = {
  /** Which sidebar item has the grey fill. null = none (the template gallery). */
  active: DocsNavId | null;
  onNavigate?: (id: DocsNavId) => void;
  /** Rendered above everything (modals, toasts). */
  overlay?: ReactNode;
  children: ReactNode;
};

/**
 * The Snaarp Doc shell: app rail, sidebar, top bar and a content area. Shared by every Snaarp Doc
 * step; it never changes between screens, only `active` and the children do.
 * Under 900px wide the app rail and the sidebar shrink to icon-only columns.
 */
export function DocsLayout({ active, onNavigate, overlay, children }: Props) {
  const narrow = useNarrow();

  return (
    <div data-scroller className="relative h-full w-full overflow-hidden bg-white text-[#111]">
      <div className="flex h-full w-full" style={{ zoom: narrow ? DOCS_NARROW_ZOOM : 1 }}>
        <AppRail slim={narrow} />
        <Sidebar active={active} onNavigate={onNavigate} slim={narrow} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main data-tl="docs-main" className="relative min-h-0 flex-1 overflow-hidden bg-white">
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
    <aside className={`relative flex h-full shrink-0 flex-col items-center border-r border-[#EEEEF1] bg-white pt-[17px] ${slim ? "w-[34px]" : "w-[60px]"}`}>
      <Icon name="menu" size={slim ? 14 : 20} className="text-[#6b7280]" />
      <ul className="mt-[27px] flex min-h-0 flex-col items-center gap-[6.6px] overflow-hidden">
        {APP_RAIL_ITEMS.map((a) => {
          const on = a.id === ACTIVE_APP;
          return (
            <li
              key={a.id}
              data-tl={`app-${a.id}`}
              className={`flex shrink-0 flex-col items-center justify-center rounded-[10px] ${slim ? "h-[26px] w-[26px]" : "h-[44px] w-[52px] gap-[4px]"} ${on ? "bg-[#E6EDFB]" : ""}`}
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

function Sidebar({ active, onNavigate, slim }: { active: DocsNavId | null; onNavigate?: (id: DocsNavId) => void; slim: boolean }) {
  const row = `flex items-center rounded-[7px] text-[11.5px] font-medium text-[#1f2430] transition-[background,transform] duration-150 data-[pressed=true]:scale-[0.98] ${
    slim ? "mx-auto h-[26px] w-[26px] justify-center" : "h-[28px] gap-[8px] px-[12px]"
  }`;
  return (
    <nav className={`flex h-full shrink-0 flex-col border-r border-[#EEEEF1] bg-white ${slim ? "w-[38px]" : "w-[192px]"}`}>
      <div className={`flex h-[40px] shrink-0 items-center border-b border-[#EEEEF1] ${slim ? "justify-center" : "gap-[8px] px-[17px]"}`}>
        <ProductLogo name="docs" size={slim ? 18 : 17} className="rounded-[5px]" />
        {!slim && (
          <>
            <span className="text-[14px] font-semibold tracking-tight">{SHELL.appName}</span>
            <Icon name="chevronLeft" size={13} className="ml-auto text-[#374151]" />
          </>
        )}
      </div>

      <ul className={`flex flex-col gap-[2px] border-b border-[#EEEEF1] pb-[2px] pt-[7px] ${slim ? "" : "px-[6px]"}`}>
        {NAV_ITEMS.map((n) => (
          <li
            key={n.id}
            data-tl={`nav-${n.id}`}
            onClick={() => onNavigate?.(n.id)}
            className={`${row} ${n.id === active ? "bg-[#F3F3F5]" : "data-[hover=true]:bg-[#F7F7F9]"}`}
          >
            <Icon name={n.icon} size={slim ? 14 : 15} className="shrink-0 text-[#374151]" />
            {!slim && n.label}
          </li>
        ))}
      </ul>

      <div className={`pt-[12px] ${slim ? "" : "px-[6px]"}`}>
        {!slim && <p className="flex h-[18px] items-center px-[12px] text-[9px] tracking-[0.03em] text-[#8b909c]">{SHELL.foldersLabel}</p>}
        <div className={`${row} bg-[#F3F3F5] font-normal ${slim ? "" : "mt-[0px]"}`}>
          <Icon name="folder" size={slim ? 14 : 15} className="shrink-0 text-[#374151]" />
          {!slim && SHELL.allDocuments}
        </div>
      </div>

      <div className="flex-1" />
      <div className={`flex flex-col border-t border-[#EEEEF1] py-[5px] ${slim ? "items-center gap-1" : "px-[6px]"}`}>
        <div className={`${row} text-[#C0272D]`}>
          <Icon name="bug" size={slim ? 14 : 15} className="shrink-0" />
          {!slim && SHELL.reportBug}
        </div>
        <div className={row}>
          <Icon name="adminSquare" size={slim ? 16 : 17} className="shrink-0 text-brand" />
          {!slim && SHELL.adminPanel}
        </div>
      </div>
    </nav>
  );
}

function TopBar() {
  return (
    <header className="flex h-[40px] shrink-0 items-center border-b border-[#EEEEF1] bg-white pl-[20px] pr-[14px]">
      <div className="flex items-center gap-[7px] text-[11px] text-[#6b7280]">
        <Icon name="search" size={14} className="text-[#4b5060]" />
        {SHELL.searchPlaceholder}
      </div>
      <div className="ml-auto flex items-center gap-[17px] text-[#1f2430]">
        <Icon name="bell" size={15} />
        <Icon name="sun" size={16} />
        <Icon name="grid4" size={16} />
        <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-brand text-[9px] font-semibold text-white">
          {SHELL.user.initials}
        </span>
      </div>
    </header>
  );
}
