"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { Modal } from "@/components/admin/Modal";
import { useNarrow } from "@/lib/useNarrow";

/** Same enlargement as DocEditor on narrow screens. */
const NARROW_ZOOM = 2.4;

type Props = {
  open: boolean;
  /** Width in design px. */
  width: number;
  title: string;
  /** Hook for the close X (data-tl). */
  closeHook?: string;
  /** Hook (data-tl) of the white card itself, to ring the whole dialog. */
  cardHook?: string;
  children: ReactNode;
};

/**
 * The frame the Insert menu dialogs share (Page numbers, eSignature, Drawing, Insert Symbol): a dim backdrop, a white
 * card with 14 px corners, the bold title at the top left and a close X at the top right. Pass the dialog's content as
 * children. It is rendered inside the editor's `overlay`, so it covers the editor only.
 */
export function InsertDialog({ open, width, title, closeHook, cardHook, children }: Props) {
  const narrow = useNarrow();
  return (
    <div className="absolute inset-0 z-40 text-[#111]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
      <Modal open={open} width={width} hook={cardHook}>
        <div className="relative px-[20px] pb-[18px] pt-[18px]">
          <span
            {...(closeHook ? { "data-tl": closeHook } : {})}
            className="absolute right-[16px] top-[16px] flex h-[16px] w-[16px] items-center justify-center rounded-full text-[#6b7280]"
          >
            <Icon name="x" size={12} />
          </span>
          <h2 className="text-[14px] font-semibold tracking-tight">{title}</h2>
          {children}
        </div>
      </Modal>
    </div>
  );
}
