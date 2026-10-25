"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { INSERT_MENU, INSERT_SUBMENUS, type InsertSubId, type InsertSubItem } from "./insert-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "Insert". */
const NARROW_ZOOM = 2.4;

/** Which submenu is open: "" (none), "break", "page-elements", or "toc" (the Table of contents card inside Page elements). */
export type InsertSub = "" | InsertSubId | "toc";

type Props = {
  open: boolean;
  sub: InsertSub;
};

const CARD = "rounded-[10px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
const ROW = "mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors";

/**
 * The Insert menu card, anchored under "Insert" in the DocEditor menu row. Pass it in the editor's `overlay`.
 * Drive it with clickInsertMenu / hoverInsertItem / hoverInsertSub / chooseInsertItem (insert-menu-timeline.ts).
 * Items carry data-tl="insert-item-<id>", submenu rows "insert-sub-<id>"; the card itself "insert-menu-card".
 * Submenus are children of their row, so they follow it and open to the right of it.
 */
export function InsertMenu({ open, sub }: Props) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="insert-menu"
      className={`pointer-events-none absolute left-[144px] top-[57px] z-20 w-[165px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="insert-menu-card" className={CARD}>
        {INSERT_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => {
              const subOpen = !!it.submenu && open && (sub === it.submenu || (it.submenu === "page-elements" && sub === "toc"));
              return (
                <div
                  key={it.id}
                  data-tl={`insert-item-${it.id}`}
                  data-disabled={!!it.disabled}
                  className={`relative ${ROW} ${it.disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"} ${subOpen ? "bg-[#F1F2F5]" : ""}`}
                >
                  <Icon name={it.icon} size={13} className="shrink-0" />
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
                  {it.submenu && <Icon name="chevronRight" size={9} className="mr-[3px] shrink-0 text-[#4b5060]" />}
                  {it.submenu && <SubCard items={INSERT_SUBMENUS[it.submenu]} shown={subOpen} sub={sub} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A card to the right of its parent row. Its rows may carry a nested card of their own. */
function SubCard({ items, shown, sub }: { items: InsertSubItem[]; shown: boolean; sub: InsertSub }) {
  return (
    <div
      data-tl={`insert-submenu-${items[0].id}`}
      className={`absolute left-[calc(100%+1px)] top-[-4px] z-10 w-max min-w-[118px] transition-opacity duration-150 motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={CARD}>
        {items.map((s) => {
          const nestedOpen = !!s.nested && shown && sub === "toc";
          return (
            <div
              key={s.id}
              data-tl={`insert-sub-${s.id}`}
              className={`relative ${ROW} whitespace-nowrap text-[#1f2430] data-[hover=true]:bg-[#F1F2F5] ${nestedOpen ? "bg-[#F1F2F5]" : ""}`}
            >
              <span className="flex-1 pr-[8px]">{s.label}</span>
              {s.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{s.shortcut}</span>}
              {s.nested && <Icon name="chevronRight" size={9} className="mr-[3px] shrink-0 text-[#4b5060]" />}
              {s.nested && (
                <div
                  className={`absolute left-[calc(100%+1px)] top-[-4px] z-10 w-max min-w-[128px] transition-opacity duration-150 motion-reduce:transition-none ${
                    nestedOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className={CARD}>
                    {s.nested.map((group, g) => (
                      <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
                        {group.map((n) => (
                          <div
                            key={n.id}
                            data-tl={`insert-sub-${n.id}`}
                            className={`${ROW} whitespace-nowrap text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]`}
                          >
                            <span className="pr-[8px]">{n.label}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
