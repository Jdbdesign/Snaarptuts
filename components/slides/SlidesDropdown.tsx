"use client";

import { Icon } from "@/components/icons";
import { SOON } from "./slide-elements-data";
import { DROPDOWN_SUBS, DROPDOWNS, type DropdownId } from "./slides-menus-data";

type Props = {
  menu: DropdownId;
  open: boolean;
  /** Which submenu is open ("" = none). */
  sub: string;
  /** Id of the greyed-out row whose "Coming soon" tooltip shows. */
  tip: string;
  /** Edit: something is selected (Cut, Copy, Delete and Duplicate switch on). */
  hasSelection: boolean;
  /** Edit: something was copied or cut (Paste switches on). */
  hasClipboard: boolean;
  /** View: which toggles are on (a tick shows in front of them). */
  checks: Record<string, boolean>;
};

const card = "rounded-[8px] border border-[#E6E8EC] bg-white py-[6px] shadow-[0_8px_28px_-6px_rgba(17,24,39,0.22)]";

/**
 * The Edit, View or Insert dropdown. SlidesEditor hangs it under its menu label, so it lines up with the label whatever the
 * screen size. Hooks: `<menu>-menu` (the card), `<menu>-group-<n>` (a block between dividers), `<menu>-item-<id>`, `<menu>-sub-<id>` and `<menu>-tip-<id>`.
 */
export function SlidesDropdown({ menu, open, sub, tip, hasSelection, hasClipboard, checks }: Props) {
  return (
    <div
      aria-hidden={!open}
      data-tl={`${menu}-menu`}
      className={`pointer-events-none absolute left-0 top-[24px] z-30 w-[208px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
    >
      <div className={card}>
        {DROPDOWNS[menu].map((group, g) => (
          <div key={g} data-tl={`${menu}-group-${g}`} className={g > 0 ? "mt-[5px] border-t border-[#EEEEF1] pt-[5px]" : ""}>
            {group.map((row) => {
              const enabled = !row.soon && (row.needs === "selection" ? hasSelection : row.needs === "clipboard" ? hasClipboard : true);
              return (
                <div
                  key={row.id}
                  data-tl={`${menu}-item-${row.id}`}
                  data-enabled={enabled}
                  className={`relative flex h-[24px] items-center px-[23px] text-[10.5px] font-normal transition-colors ${
                    enabled ? "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]" : "text-[#A9ADB8]"
                  }`}
                >
                  {row.toggle && checks[row.id] && <Icon name="check" size={10} className="absolute left-[8px] text-[#1f2430]" />}
                  <span className="flex-1 truncate">{row.label}</span>
                  {row.shortcut && <span className="mr-[-12px] text-[8.5px] text-[#A3A8B3]">{row.shortcut}</span>}
                  {row.sub && <Icon name="chevronRight" size={9} className="mr-[-6px] text-[#6b7280]" />}

                  {row.sub && (
                    <div
                      className={`absolute left-full top-[-6px] ml-[2px] w-[158px] transition-opacity duration-150 motion-reduce:transition-none ${
                        open && sub === row.sub ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <div className={card}>
                        {DROPDOWN_SUBS[row.sub].map((s) => (
                          <div
                            key={s.id}
                            data-tl={`${menu}-sub-${s.id}`}
                            className="flex h-[24px] items-center px-[14px] text-[10px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]"
                          >
                            <span className="truncate">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {row.soon && (
                    <div
                      data-tl={`${menu}-tip-${row.id}`}
                      className={`absolute left-[46px] top-[20px] z-10 whitespace-nowrap rounded-[5px] bg-[#111] px-[8px] py-[4px] text-[9.5px] font-normal leading-none text-white shadow-lg transition-opacity duration-150 motion-reduce:transition-none ${
                        open && tip === row.id ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      {SOON}
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
