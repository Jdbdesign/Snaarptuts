import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

type Props = {
  open: boolean;
  width: number;
  title: string;
  /** data-tl on the white card, so a script can ring the whole dialog. */
  hook: string;
  /** data-tl of the scrolling body, for tl.scrollPanelTo. */
  scrollId: string;
  /** Hook of the close (x) button. */
  closeHook: string;
  onClose: () => void;
  /** Pinned under the scrolling body (the Create user buttons). */
  footer?: ReactNode;
  /** Runs when the body is clicked (closes open lists). */
  onBodyClick?: () => void;
  children: ReactNode;
};

/**
 * The dialog frame of the Admin Panel: grey backdrop, white card, title and x, a scrolling body and an
 * optional pinned footer. It stays mounted so it can fade in and out.
 */
export function AdminDialog({ open, width, title, hook, scrollId, closeHook, onClose, footer, onBodyClick, children }: Props) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-0 z-40 flex items-center justify-center pb-[56px] transition-opacity duration-300 motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#1a1a24]/45" />
      <div
        role="dialog"
        aria-modal="true"
        data-tl={hook}
        className={`relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-100" : "scale-95"
        }`}
        style={{ width: `min(${width}px, calc(100% - 32px))`, maxHeight: "calc(100% - 120px)" }}
      >
        <div className="flex shrink-0 items-center justify-between px-6 pb-3 pt-5">
          <h2 className="text-[17px] font-bold">{title}</h2>
          <button
            data-tl={closeHook}
            aria-label="Close"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#6b7280] transition-[background,transform] data-[pressed=true]:scale-90 hover:bg-[#F3F4F6]"
          >
            <Icon name="x" size={16} />
          </button>
        </div>
        <div
          data-tl={scrollId}
          onClick={onBodyClick}
          className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-5 [transform:translateZ(0)]"
        >
          {children}
        </div>
        {footer && <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[#F0F0F4] px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
