"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { BRAND, DNS_SUBNAV, NAV, NOTE, TOPBAR, type CfPage } from "./cloudflare-data";
import { CLOUD_ORANGE, Triangle } from "./parts";

/*
 * The Cloudflare dashboard frame (illustration): top bar, left menu and a white content area.
 * Pages go in as children; `active` is the menu item that is highlighted (DNS also opens Records / Settings).
 * Everything the timeline needs sits inside this element's data-scroller, so selectors like
 * [data-tl=cf-nav-dns] work. Under 900px the menu becomes a slim icon column and the dashboard is enlarged.
 */

const NARROW_ZOOM = 2;

type Props = {
  active: CfPage;
  /** The site shown at the top of the menu, e.g. acme-studio.com. */
  domain: string;
  /** Called when a menu item that has a page is clicked. */
  onNavigate: (page: CfPage) => void;
  children: ReactNode;
  /** Drawn over the whole dashboard. */
  overlay?: ReactNode;
};

const PAGES: ReadonlySet<string> = new Set<CfPage>(["overview", "dns"]);

export function CloudflareChrome({ active, domain, onNavigate, children, overlay }: Props) {
  const narrow = useNarrow();
  const zoom = narrow ? NARROW_ZOOM : 1;

  return (
    <div
      data-scroller
      className="relative flex h-full w-full flex-col overflow-hidden bg-white text-[#333]"
      style={{ fontFamily: "var(--font-opensans), 'Open Sans', system-ui, sans-serif" }}
    >
      <TopBar zoom={zoom} />
      <div className="flex min-h-0 flex-1">
        <Sidebar active={active} domain={domain} onNavigate={onNavigate} slim={narrow} zoom={zoom} />
        <div data-tl="content-panel" className="no-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto bg-white">
          <div style={{ zoom }}>
            {children}
            <p className="px-10 pb-5 pt-5 text-[11.5px] leading-4 text-[#9A9A9A] max-[899px]:px-4">{NOTE}</p>
          </div>
        </div>
      </div>
      {overlay}
    </div>
  );
}

function TopBar({ zoom }: { zoom: number }) {
  return (
    <header className="flex h-[56px] shrink-0 items-center justify-between border-b border-[#E3E3E3] bg-white pl-6 pr-6" style={{ zoom }}>
      <div className="flex items-center gap-2">
        <Icon name="cfCloud" size={34} style={{ color: CLOUD_ORANGE }} />
        <span className="text-[13px] font-bold tracking-[0.14em] text-[#3B3B3B]">{BRAND}</span>
      </div>
      <div className="flex items-center gap-7 text-[14px] text-[#444] max-[899px]:gap-4">
        <span className="flex items-center gap-1.5">
          <Icon name="cfPlusCircle" size={16} className="text-[#6B6B6B]" />
          {TOPBAR.addSite}
        </span>
        <span className="flex items-center gap-1.5">
          {TOPBAR.support}
          <Triangle className="text-[#555]" />
        </span>
        <span className="flex items-center gap-1.5 max-[899px]:hidden">
          {TOPBAR.language}
          <Triangle className="text-[#555]" />
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="cfUser" size={22} className="text-[#6B6B6B]" />
          <Triangle className="text-[#555]" />
        </span>
      </div>
    </header>
  );
}

type SidebarProps = Pick<Props, "active" | "domain" | "onNavigate"> & { slim: boolean; zoom: number };

function Sidebar({ active, domain, onNavigate, slim, zoom }: SidebarProps) {
  return (
    <aside
      className={`shrink-0 overflow-hidden border-r border-[#E3E3E3] bg-white ${slim ? "w-[52px]" : "w-[230px]"}`}
      style={{ zoom }}
    >
      <div className={`flex h-[54px] items-center border-b border-[#E3E3E3] ${slim ? "justify-center" : "gap-3 px-5"}`}>
        <Icon name="arrowLeft" size={18} className="shrink-0 text-[#4A6FA5]" />
        {!slim && <span className="truncate text-[14px] font-semibold text-[#333]">{domain}</span>}
      </div>
      <nav className="px-2 pt-2">
        {NAV.map((item) => {
          const on = item.id === active;
          return (
            <div key={item.id}>
              <button
                data-tl={`cf-nav-${item.id}`}
                data-on={on}
                aria-label={item.label}
                onClick={() => PAGES.has(item.id) && onNavigate(item.id as CfPage)}
                className={`flex h-[40px] w-full items-center rounded-[4px] text-left text-[13.5px] transition-colors duration-150 data-[on=true]:bg-[#EFEFEF] data-[on=true]:text-[#1F1F1F] data-[pressed=true]:bg-[#E4E4E4] ${
                  slim ? "justify-center" : "gap-3.5 px-3"
                } ${on ? "" : "text-[#444]"}`}
              >
                <Icon name={item.icon} size={18} className={on ? "text-[#1F1F1F]" : "text-[#5C5C5C]"} />
                {!slim && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.caret && <Triangle size={4} className="text-[#555]" />}
                  </>
                )}
              </button>
              {!slim && item.id === "dns" && on && (
                <div className="tl-fade-in pb-1">
                  {DNS_SUBNAV.map((s, i) => (
                    <div
                      key={s.id}
                      data-tl={`cf-nav-dns-${s.id}`}
                      className={`flex h-[34px] items-center pl-[45px] text-[13.5px] ${i === 0 ? "font-semibold text-[#1F1F1F]" : "text-[#555]"}`}
                    >
                      {s.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
