import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

type Props = {
  open: boolean;
  width: number;
  hook: string;
  scrollId: string;
  title: string;
  subtitle?: ReactNode;
  icon?: IconName;
  closeHook?: string;
  onClose: () => void;
  /** Pinned under the scrolling body. */
  footer?: ReactNode;
  children: ReactNode;
};

/** The dialog frame of the email admin: dark backdrop, white card, small icon + title, x, a scrolling body and an optional footer. */
export function MDialog({ open, width, hook, scrollId, title, subtitle, icon, closeHook, onClose, footer, children }: Props) {
  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-0 z-40 flex items-center justify-center transition-opacity duration-300 motion-reduce:transition-none ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div
        role="dialog"
        aria-modal="true"
        data-tl={hook}
        className={`relative flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "scale-100" : "scale-95"
        }`}
        style={{ width: `min(${width}px, calc(100% - 32px))`, maxHeight: "calc(100% - 64px)" }}
      >
        <div className="flex shrink-0 items-start justify-between px-6 pb-2 pt-5">
          <div>
            <h2 className="flex items-center gap-2 text-[15px] font-bold">
              {icon && <Icon name={icon} size={16} />}
              {title}
            </h2>
            {subtitle && <p className="mt-0.5 text-[12px] text-[#6b7280]">{subtitle}</p>}
          </div>
          <button data-tl={closeHook} aria-label="Close" onClick={onClose} className="flex h-6 w-6 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#F3F4F6]">
            <Icon name="x" size={15} />
          </button>
        </div>
        <div data-tl={scrollId} className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-4 [transform:translateZ(0)]">
          {children}
        </div>
        {footer && <div className="flex shrink-0 items-center justify-end gap-3 px-6 pb-5 pt-2">{footer}</div>}
      </div>
    </div>
  );
}

/** Buttons of the email admin dialogs. `dark` is the solid black one, `ghost` the white one. */
export function DialogButton({
  hook,
  kind = "ghost",
  disabled,
  onClick,
  children,
  className = "",
}: {
  hook: string;
  kind?: "dark" | "ghost" | "purple";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const look =
    kind === "dark"
      ? disabled
        ? "bg-[#8A8A93] text-white"
        : "bg-[#0E0E10] text-white"
      : kind === "purple"
        ? disabled
          ? "bg-[#C9B1F5] text-white"
          : "bg-brand text-white"
        : "border border-[#E1E4EE] bg-white text-[#2a2d36]";
  return (
    <button
      data-tl={hook}
      onClick={() => !disabled && onClick?.()}
      className={`flex h-9 items-center justify-center gap-1.5 rounded-lg px-4 text-[13px] font-medium transition-transform data-[pressed=true]:scale-95 ${look} ${className}`}
    >
      {children}
    </button>
  );
}
