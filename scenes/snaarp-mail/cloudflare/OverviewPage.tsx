import { DOMAIN } from "../dns-data";
import { OVERVIEW } from "../cloudflare-data";

/** Cloudflare, Overview of the domain: a status card and a few plain summary cards. */
export function OverviewPage() {
  return (
    <div className="px-10 pb-2 pt-7 max-[899px]:px-4">
      <h1 className="text-[28px] font-normal leading-9 text-[#333]">{OVERVIEW.title}</h1>

      <section className="mt-5 rounded-[4px] border border-[#D9D9D9] bg-white px-6 py-5 max-[899px]:px-4">
        <p className="flex items-center gap-2.5 text-[18px] leading-7 text-[#333]">
          <span className="h-3 w-3 shrink-0 rounded-full bg-[#2FA84F]" />
          <span>
            <b className="font-semibold">{DOMAIN}</b> {OVERVIEW.statusText}
          </span>
        </p>
        <p className="mt-1 pl-[22px] text-[14px] text-[#6B6B6B]">
          {OVERVIEW.statusLabel}: <span className="font-semibold text-[#2FA84F]">{OVERVIEW.status}</span>
        </p>
      </section>

      <div className="mt-4 grid grid-cols-3 gap-4 max-[899px]:grid-cols-1">
        {OVERVIEW.cards.map((c) => (
          <section key={c.label} className="rounded-[4px] border border-[#D9D9D9] bg-white px-6 py-5 max-[899px]:px-4">
            <p className="text-[13px] text-[#6B6B6B]">{c.label}</p>
            <p className="mt-1 text-[22px] leading-8 text-[#333]">{c.value}</p>
          </section>
        ))}
      </div>

      <section className="mt-4 rounded-[4px] border border-[#D9D9D9] bg-white px-6 py-5 max-[899px]:px-4">
        <h2 className="text-[16px] font-semibold leading-6 text-[#333]">{OVERVIEW.nextTitle}</h2>
        <p className="mt-1 text-[14px] leading-6 text-[#555]">{OVERVIEW.nextText}</p>
      </section>
    </div>
  );
}
