"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";

export type AdminToastState = { id: number; text: string; visible: boolean };

/**
 * Show the Admin Panel toast (white card, green check, bottom right). It hides itself after `ms` of active
 * time, so Pause freezes it too. The page's own green toast (ToastHost) is not used here.
 */
export function showAdminToast(tl: Timeline, text: string, ms = 3200) {
  const id = (tl.getVar<AdminToastState | null>("adminToast", null)?.id ?? 0) + 1;
  tl.setVar("adminToast", { id, text, visible: true } satisfies AdminToastState);
  tl.wait(ms)
    .then(() => {
      const cur = tl.getVar<AdminToastState | null>("adminToast", null);
      if (cur?.id === id) tl.setVar("adminToast", { ...cur, visible: false });
    })
    .catch(() => {}); // cancelled with the step
}

export function AdminToast({ tl }: { tl: Timeline }) {
  const toast = useTimelineVar<AdminToastState | null>(tl, "adminToast", null);
  const visible = !!toast?.visible;
  const narrow = useNarrow();

  return (
    <div
      role="status"
      aria-live="polite"
      // Bottom right as in the recording; on a phone the caption sits there, so it moves under the top bar.
      className={`pointer-events-none absolute z-50 ${narrow ? "right-4 top-[72px]" : "bottom-6 right-6"}`}
    >
      <div
        data-tl="admin-toast"
        className={`flex min-w-[270px] items-center gap-3 rounded-xl border border-[#EEEFF3] bg-white py-3 pl-4 pr-3.5 shadow-[0_10px_30px_-10px_rgba(17,24,39,0.3)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <Icon name="circleCheck" size={20} className="shrink-0 text-[#22A06B]" />
        <span className="flex-1 text-[13px] font-medium text-[#111]">{toast?.text}</span>
        <Icon name="x" size={14} className="shrink-0 text-[#9aa0ab]" />
      </div>
    </div>
  );
}
