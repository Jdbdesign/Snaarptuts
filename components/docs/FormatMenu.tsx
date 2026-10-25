"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { FORMAT_MENU, FORMAT_SUBMENUS, type FormatSubId, type FormatSubItem } from "./format-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "Format". */
const NARROW_ZOOM = 2.4;

/** Which submenu is open: "" (none), "text", "paragraph", "align" or "bullets". */
export type FormatSub = "" | FormatSubId;

type Props = {
  open: boolean;
  sub: FormatSub;
};

const CARD = "rounded-[10px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
const ROW = "mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors";

/**
 * The Format menu card, anchored under "Format" in the DocEditor menu row. Pass it in the editor's `overlay`.
 * Drive it with clickFormatMenu / hoverFormatItem / chooseFormatSub (format-timeline.ts).
 * Items carry data-tl="format-item-<id>", submenu rows "format-sub-<id>"; the card itself "format-menu-card".
 * Submenus are children of their row, so they follow it and open to the right of it.
 */
export function FormatMenu({ open, sub }: Props) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="format-menu"
      className={`pointer-events-none absolute left-[185px] top-[57px] z-20 w-[172px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div data-tl="format-menu-card" className={CARD}>
        {FORMAT_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => {
              const subOpen = !!it.submenu && open && sub === it.submenu;
              return (
                <div
                  key={it.id}
                  data-tl={`format-item-${it.id}`}
                  data-disabled={!!it.disabled}
                  className={`relative ${ROW} ${it.disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"} ${subOpen ? "bg-[#F1F2F5]" : ""}`}
                >
                  {it.icon && <Icon name={it.icon} size={13} className="shrink-0" />}
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
                  {it.submenu && <Icon name="chevronRight" size={9} className="mr-[3px] shrink-0 text-[#4b5060]" />}
                  {it.submenu && <SubCard id={it.submenu} shown={subOpen} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A card to the right of its parent row. */
function SubCard({ id, shown }: { id: FormatSubId; shown: boolean }) {
  return (
    <div
      data-tl={`format-submenu-${id}`}
      className={`absolute left-[calc(100%+1px)] top-[-4px] z-10 w-max min-w-[118px] transition-opacity duration-150 motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className={CARD}>
        {FORMAT_SUBMENUS[id].map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((s) => (
              <SubRow key={s.id} item={s} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SubRow({ item }: { item: FormatSubItem }) {
  return (
    <div
      data-tl={`format-sub-${item.id}`}
      className={`${ROW} whitespace-nowrap text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]`}
      style={item.height ? { height: item.height } : undefined}
    >
      <span
        className="flex-1 pr-[8px]"
        style={item.font ? { fontSize: item.font.size, fontWeight: item.font.weight } : undefined}
      >
        {item.label}
      </span>
      {item.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{item.shortcut}</span>}
    </div>
  );
}
