"use client";

import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { Icon } from "@/components/icons";

export type DocToastState = { id: number; text: string; kind: "success" | "loading"; visible: boolean };

/** Same enlargement as DocEditor on narrow screens, so the toast stays readable. */
const NARROW_ZOOM = 2.4;

/**
 * Small white card at the bottom right of the editor: a black check ("success") or a grey spinner ("loading")
 * and a line of text. Pass it in the editor's `overlay` and drive it with showDocToast / hideDocToast
 * (doc-toast-timeline.ts). The scene variable is `docToast`.
 */
export function DocToast({ tl }: { tl: Timeline }) {
  const toast = useTimelineVar<DocToastState | null>(tl, "docToast", null);
  const narrow = useNarrow();
  const visible = !!toast?.visible;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none absolute bottom-[46px] right-[24px] z-50"
      style={{ zoom: narrow ? NARROW_ZOOM : 1 }}
    >
      <div
        className={`flex min-w-[210px] items-center gap-[10px] rounded-[10px] border border-[#EEEFF3] bg-white px-[14px] py-[11px] shadow-[0_8px_26px_-8px_rgba(17,24,39,0.28)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast?.kind === "loading" ? (
          <span className="h-[15px] w-[15px] shrink-0 animate-spin rounded-full border-2 border-[#D5D8DF] border-t-[#6b7280]" />
        ) : (
          <span className="flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full bg-black text-white">
            <Icon name="check" size={10} />
          </span>
        )}
        <span className="text-[12.5px] font-medium leading-[18px] text-[#111]">{toast?.text}</span>
      </div>
    </div>
  );
}
