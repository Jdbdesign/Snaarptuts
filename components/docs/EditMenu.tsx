"use client";

import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { EDIT_MENU, editItemDisabled } from "./edit-menu-data";
import type { EditorState } from "./editor-state";

/** Same enlargement as DocEditor on narrow screens, so the menu keeps its place under "Edit". */
const NARROW_ZOOM = 2.4;

type Props = {
  open: boolean;
  editor: EditorState;
};

/**
 * The Edit menu card, anchored under "Edit" in the DocEditor menu row. Pass it in the editor's `overlay`.
 * Which items are greyed out depends on the editor state. Drive it with clickEditMenu / chooseEditMenuItem /
 * hoverEditMenuItem (editor-timeline.ts); items carry data-tl="edit-item-<id>".
 */
export function EditMenu({ open, editor }: Props) {
  const narrow = useNarrow();
  return (
    <div
      aria-hidden={!open}
      data-tl="edit-menu"
      className={`pointer-events-none absolute left-[72px] top-[57px] z-20 w-[250px] transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
      }`}
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div className="rounded-[10px] border border-[#EAEBEF] bg-white py-[3px] shadow-[0_8px_26px_-6px_rgba(17,24,39,0.18)]">
        {EDIT_MENU.map((group, g) => (
          <div key={g} className={g > 0 ? "mt-[3px] border-t border-[#EEEEF1] pt-[3px]" : ""}>
            {group.map((it) => {
              const disabled = editItemDisabled(it.id, editor);
              return (
                <div
                  key={it.id}
                  data-tl={`edit-item-${it.id}`}
                  data-disabled={disabled}
                  className={`mx-[3px] flex h-[24px] items-center gap-[6px] rounded-[6px] px-[5px] text-[11px] transition-colors ${
                    disabled ? "text-[#AEB2BC]" : "text-[#1f2430] data-[hover=true]:bg-[#F1F2F5]"
                  }`}
                >
                  <Icon name={it.icon} size={13} className="shrink-0" />
                  <span className="flex-1 truncate">{it.label}</span>
                  {it.shortcut && <span className="shrink-0 text-[9px] text-[#A3A8B3]">{it.shortcut}</span>}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
