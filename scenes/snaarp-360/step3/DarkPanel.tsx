import { Icon } from "@/components/icons";
import { ADMIN_FEATURES, ADMIN_FOOTER_LINKS } from "./step3-data";

/** Near-black left panel of the Snaarp sign-in screens: wordmark, three feature rows, footer links. */
export function DarkPanel() {
  return (
    <div
      className="relative h-full w-1/2 shrink-0 overflow-hidden text-white"
      style={{ background: "radial-gradient(120% 90% at 20% 10%, #19191d 0%, #0E0E10 55%, #0A0A0C 100%)" }}
    >
      <p className="absolute left-0 right-0 top-[48px] text-center text-[34px] font-medium tracking-tight">Snaarp</p>

      <ul className="absolute left-[47px] top-[150px] flex w-[570px] flex-col gap-[50px]">
        {ADMIN_FEATURES.map((f) => (
          <li key={f.title} className="flex items-start gap-[18px]">
            <span className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-[12px] bg-white text-[#111]">
              <Icon name={f.icon} size={24} />
            </span>
            <div>
              <p className="text-[18px] font-semibold leading-6">{f.title}</p>
              <p className="mt-1.5 text-[15px] leading-[25px] text-[#C7C7CE]">{f.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-[17px] left-[47px] flex gap-7 text-[13px] text-[#9a9aa3]">
        {ADMIN_FOOTER_LINKS.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}
