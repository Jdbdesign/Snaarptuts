import { Icon } from "@/components/icons";

/** A tiny solid triangle (the dashboard's chevrons and "Edit" arrow). */
export function Triangle({ dir = "down", size = 5, className = "" }: { dir?: "down" | "right"; size?: number; className?: string }) {
  const s =
    dir === "down"
      ? { borderLeft: `${size}px solid transparent`, borderRight: `${size}px solid transparent`, borderTop: `${size + 1}px solid currentColor` }
      : { borderTop: `${size}px solid transparent`, borderBottom: `${size}px solid transparent`, borderLeft: `${size + 1}px solid currentColor` };
  return <i aria-hidden className={`inline-block h-0 w-0 shrink-0 ${className}`} style={s} />;
}

export const CLOUD_ORANGE = "#F6821F";
export const CLOUD_GREY = "#8E8E8E";

/** "Proxied" (orange cloud) or "DNS only" (grey cloud). Records that cannot be proxied just say "DNS only". */
export function ProxyLabel({ proxied, showCloud = true }: { proxied: boolean; showCloud?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#333]">
      {showCloud && <Icon name="cfCloud" size={26} style={{ color: proxied ? CLOUD_ORANGE : CLOUD_GREY }} className="transition-colors duration-200" />}
      {proxied ? "Proxied" : "DNS only"}
    </span>
  );
}
