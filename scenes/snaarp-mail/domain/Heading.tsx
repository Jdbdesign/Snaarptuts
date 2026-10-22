import type { ReactNode } from "react";
import { BRAND } from "../domain-data";

/** The centred "Snaarp" wordmark, heading and grey line shared by the first two screens. */
export function Heading({ title, text, big }: { title: string; text: ReactNode; big?: boolean }) {
  return (
    <div className="text-center">
      <p className={`font-bold leading-9 text-[#0F1725] ${big ? "text-[28px]" : "text-[26px]"}`}>{BRAND}</p>
      <h1 className="mt-[3px] text-[15.5px] font-semibold leading-6 text-[#0F1725]">{title}</h1>
      <p className="mt-[3px] text-[10.5px] leading-4 text-[#6B7280]">{text}</p>
    </div>
  );
}
