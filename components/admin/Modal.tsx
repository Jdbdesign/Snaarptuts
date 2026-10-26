import type { ReactNode } from "react";

type Props = {
  open: boolean;
  width?: number;
  /**
   * Makes the dialog scroll inside itself when it is taller than the frame.
   * The value becomes the scroll panel's data-tl id, so a script can use
   * tl.scrollPanelTo("[data-tl=<id>]", ...).
   */
  scrollId?: string;
  /** Tallest the dialog may get, in design pixels (scrolling dialogs only). */
  maxHeight?: number;
  /** data-tl on the white card itself, so a script can ring the whole dialog. */
  hook?: string;
  children: ReactNode;
};

/** Dim backdrop (about 55% black) plus a white dialog. Stays mounted so it can fade in and out. */
export function Modal({ open, width = 668, scrollId, maxHeight, hook, children }: Props) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div
        role="dialog"
        aria-modal="true"
        {...(hook ? { "data-tl": hook } : {})}
        className={`relative rounded-[14px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${
          open ? "scale-100" : "scale-95"
        } ${scrollId ? "flex flex-col overflow-hidden" : ""}`}
        style={{
          width,
          ...(scrollId && {
            maxHeight: maxHeight ? `min(calc(100% - 96px), ${maxHeight}px)` : "calc(100% - 96px)",
          }),
        }}
      >
        {scrollId ? (
          <div data-tl={scrollId} className="no-scrollbar min-h-0 flex-1 overflow-y-auto [transform:translateZ(0)]">
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
