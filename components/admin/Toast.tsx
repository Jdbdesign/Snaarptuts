"use client";

import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";

type ToastState = { id: number; text: string; visible: boolean };

const POSITION = {
  "top-right": { place: "right-4 top-[14px]", hidden: "translate-x-8" },
  "bottom-left": { place: "bottom-5 left-5", hidden: "-translate-x-8" },
  /** Top right but below a 56px top bar (the Cloudflare screens). */
  "below-bar": { place: "right-4 top-[68px]", hidden: "translate-x-8" },
};

/** Light green success toast. Show one from a script with tl.toast(text). */
export function ToastHost({ tl, position = "top-right" }: { tl: Timeline; position?: keyof typeof POSITION }) {
  const toast = useTimelineVar<ToastState | null>(tl, "toast", null);
  const visible = !!toast?.visible;
  const p = POSITION[position];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none absolute z-50 flex w-[370px] items-center gap-3 rounded-xl border border-[#A6E3BC] bg-[#ECFDF3] px-4 py-3.5 shadow-[0_10px_30px_-12px_rgba(20,120,60,0.35)] transition-all duration-300 ease-out ${p.place} ${
        visible ? "translate-x-0 opacity-100" : `${p.hidden} opacity-0`
      }`}
    >
      <Icon name="checkCircle" size={20} className="shrink-0 text-[#22A06B]" />
      <p className="text-[13px] font-medium leading-5 text-[#14532D]">{toast?.text}</p>
    </div>
  );
}
