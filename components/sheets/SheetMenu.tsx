"use client";

import { Icon } from "@/components/icons";
import { MENUS, MENU_SUBS, UNGROUP_COLS, UNGROUP_ROWS, type MenuId, type SubRow } from "./edit-view-data";

/** What the menus need to know about the sheet: which rows are greyed and which sub-rows carry a tick. */
export type MenuState = {
  canUndo: boolean;
  canRedo: boolean;
  /** Ids of ticked submenu rows (show-bar, comments-hide, zoom-100...). */
  ticks: string[];
  hasRowGroup: boolean;
  hasColGroup: boolean;
  /** Rows whose label changes with the sheet ("Create a filter" -> "Remove filter", "Autocomplete ✓"). */
  labels?: Record<string, string>;
  /** Extra rows at the end of a submenu, by submenu key (the saved filter views). */
  extraSubs?: Record<string, SubRow[]>;
  /** The submenu row that carries a tick (the current font size...). */
  tick?: string[];
};

type Props = {
  menu: MenuId;
  /** Which dropdown is open ("" = none) and which of its submenus. */
  open: string;
  sub: string;
  state: MenuState;
};

const card = "rounded-[10px] border border-[#E6E8EC] bg-white py-[6px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";
/** Submenus whose rows carry a tick area (the recording shows ticks only on these). */
const TICKABLE = new Set(["show", "comments", "zoom", "fontsize"]);

/**
 * The Edit and View dropdowns. They hang inside their label in the menu bar (SheetsEditor `menuSlots`). Rows are
 * [data-tl=menu-item-<id>] and submenu rows [data-tl=menu-sub-<id>]; the card is [data-tl=menu-<edit|view>].
 * Labels, order, groups, glyphs and ticks come from the recording (edit-view-data.ts).
 */
export function SheetMenu({ menu, open, sub, state }: Props) {
  const isOpen = open === menu;
  const subRows = (id: string): SubRow[] => {
    const base = MENU_SUBS[id] ?? [];
    const more = state.extraSubs?.[id] ?? [];
    return id === "group" ? [...base, ...(state.hasRowGroup ? [UNGROUP_ROWS] : []), ...(state.hasColGroup ? [UNGROUP_COLS] : [])] : [...base, ...more];
  };
  const greyed = (id: string, disabled?: boolean) => disabled || (id === "undo" && !state.canUndo) || (id === "redo" && !state.canRedo);

  return (
    <div
      aria-hidden={!isOpen}
      data-tl={`menu-${menu}`}
      className={`pointer-events-none absolute left-0 top-[calc(100%+2px)] z-30 w-[236px] text-left transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      <div className={card}>
        {MENUS[menu].map((group, g) => (
          <div key={g} data-tl={`menu-${menu}-group-${g}`} className={g > 0 ? "mt-[5px] border-t border-[#E8EAED] pt-[5px]" : ""}>
            {group.map((it) => {
              const off = greyed(it.id, it.disabled);
              return (
                <div
                  key={it.id}
                  data-tl={`menu-item-${it.id}`}
                  className={`group relative flex h-[29px] items-center pl-[40px] pr-[14px] text-[13px] transition-colors ${off ? "text-[#A9ADB8]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F3F4]"}`}
                >
                  {it.icon && <Icon name={it.icon} size={17} className={`absolute left-[13px] ${off ? "text-[#B8BCC6]" : "text-[#5F6368]"}`} />}
                  <span className="flex-1 truncate">{state.labels?.[it.id] ?? it.label}</span>
                  {it.shortcut && <span className="text-[11.5px] text-[#A3A8B3]">{it.shortcut}</span>}
                  {it.sub && <Icon name="chevronRight" size={11} className={off ? "text-[#B8BCC6]" : "text-[#6b7280]"} />}

                  {it.tip && (
                    <span className="pointer-events-none absolute left-[78%] top-[-26px] whitespace-nowrap rounded-[6px] bg-[#3C4043] px-[8px] py-[4px] text-[11.5px] text-white opacity-0 transition-opacity duration-150 group-data-[hover=true]:opacity-100">
                      {it.tip}
                    </span>
                  )}
                  {it.sub && !it.disabled && (
                    <div
                      className={`absolute left-full top-[-6px] ml-[2px] w-[216px] transition-opacity duration-150 motion-reduce:transition-none ${
                        isOpen && sub === it.sub ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className={card}>
                        {subRows(it.sub).map((s) => (
                          <div
                            key={s.id}
                            data-tl={`menu-sub-${s.id}`}
                            className={`relative flex h-[29px] items-center text-[13px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F3F4] ${TICKABLE.has(it.sub!) ? "pl-[34px] pr-[16px]" : "px-[16px]"}`}
                          >
                            {(state.ticks.includes(s.id) || state.tick?.includes(s.id)) && <Icon name="check" size={13} className="absolute left-[13px] text-[#3C4043]" />}
                            <span className="truncate">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
