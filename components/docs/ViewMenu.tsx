"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import type { EditorMode } from "./editor-data";
import { MODE_MENU, VIEW_MENU, type ViewItemId } from "./view-menu-data";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "View". */
const NARROW_ZOOM = 2.4;

type Props = {
  open: boolean;
  /** Show the Mode submenu. */
  submenu: boolean;
  mode: EditorMode;
  /** Which toggle items are on. */
  checks: { printLayout: boolean; ruler: boolean; nonPrinting: boolean };
};

const TOGGLE_KEY: Partial<Record<ViewItemId, keyof Props["checks"]>> = {
  "print-layout": "printLayout",
  ruler: "ruler",
  "non-printing": "nonPrinting",
};

/**
 * The View menu card, anchored under "View" in the DocEditor menu row. Pass it in the editor's `overlay`.
 * Drive it with clickViewMenu / chooseViewItem / hoverViewItem / chooseMode (view-menu-timeline.ts).
 * Items carry data-tl="view-item-<id>", the Mode submenu "view-sub-<editing|suggesting|viewing>".
 */
export function ViewMenu({ open, submenu, mode, checks }: Props) {
  const narrow = useNarrow();
  const card = "rounded-[10px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]";
  return (
    <div
      aria-hidden={!open}
      data-tl="view-menu"
      className={`pointer-events-none absolute left-[103px] top-[57px] z-20 w-[275px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div className={card}>
        {VIEW_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => {
              const key = TOGGLE_KEY[it.id];
              const checked = key ? checks[key] : false;
              return (
                <div
                  key={it.id}
                  data-tl={`view-item-${it.id}`}
                  data-disabled={!!it.disabled}
                  className={`mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors ${
                    it.disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"
                  } ${it.submenu && open && submenu ? "bg-[#F1F2F5]" : ""}`}
                >
                  <span className="flex w-[13px] shrink-0 items-center justify-center">
                    {it.toggle ? (
                      <Icon name="check" size={11} className={checked ? "text-[#1f2430]" : "text-transparent"} />
                    ) : (
                      it.icon && <Icon name={it.icon} size={13} />
                    )}
                  </span>
                  {it.toggle && it.icon && <Icon name={it.icon} size={12} className="shrink-0 text-[#4b5060]" />}
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
                  {it.submenu && <Icon name="chevronRight" size={9} className="mr-[3px] shrink-0 text-[#4b5060]" />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div
        data-tl="view-submenu"
        className={`absolute left-[278px] top-0 w-[128px] transition-opacity duration-150 motion-reduce:transition-none ${
          open && submenu ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className={card}>
          {MODE_MENU.map((m) => (
            <div
              key={m.id}
              data-tl={`view-sub-${m.id}`}
              className="mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] text-[#1f2430] transition-colors data-[hover=true]:bg-[#F1F2F5]"
            >
              <span className="flex w-[13px] shrink-0 items-center justify-center">
                <Icon name="check" size={11} className={mode === m.id ? "text-[#1f2430]" : "text-transparent"} />
              </span>
              <span className="truncate">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
