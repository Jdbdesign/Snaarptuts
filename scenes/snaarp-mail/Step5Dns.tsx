"use client";

import { Icon } from "@/components/icons";
import { DnsRecordCard } from "@/components/onboarding/DnsRecordCard";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DnsModal } from "./dns/DnsModal";
import { DNS_RECORDS, PAGE } from "./dns-data";

/* Snaarp Mail onboarding, DNS item: the "DNS Mapping" page (login.snaarp.com/onboarding/dns) and its modal. */

/** Narrow screens: the page is enlarged so it stays readable once the scene is scaled down. */
const NARROW_ZOOM = 2.3;

export function Step5Dns({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();
  const verifiedCount = useVerifiedCount(tl);
  // Step 7 holds Continue grey for a moment (scene variable `holdContinue`) after the last card is verified.
  const hold = useTimelineVar(tl, "holdContinue", false);
  // Extra room under the page (scene variable `bottomRoom`, step 7) so the last button can scroll clear of the caption.
  const room = useTimelineVar(tl, "bottomRoom", 0);
  const allVerified = verifiedCount === DNS_RECORDS.length && !hold;
  const zoom = narrow ? NARROW_ZOOM : 1;

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <OnboardingShell active="dns" overlay={<DnsModal tl={tl} zoom={zoom} />}>
          <div className={`w-[583px] pt-[55px] ${narrow ? "mx-auto" : "ml-[202px]"}`} style={{ zoom, paddingBottom: 48 + room }}>
            <p className="flex items-center gap-1.5 text-[10px] leading-4 text-[#6B7280]">
              <Icon name="arrowLeft" size={11} />
              {PAGE.back}
            </p>

            <div data-tl="dns-heading" className="-mx-2 mt-[14px] rounded-[8px] px-2 py-1">
              <h1 className="text-[20px] font-semibold leading-7 text-[#0B0B0F]">{PAGE.title}</h1>
              <p className="mt-1.5 text-[11px] leading-[19px] text-[#4B5563]">{PAGE.intro}</p>
            </div>

            <div className="mt-[17px] rounded-[3px] border-l-[3px] border-[#F5C84B] bg-[#FEF9E7] px-[13px] py-[13px]">
              <h2 className="text-[12px] font-semibold leading-4 text-[#0B0B0F]">{PAGE.stepsTitle}</h2>
              <ol className="mt-[9px] flex flex-col gap-[7px]">
                {PAGE.steps.map((t, i) => (
                  <li key={t} className="flex items-start gap-2 text-[10.5px] leading-[15px] text-[#1F2937]">
                    <span className="mt-px flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full bg-[#0B0B0F] text-[8px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="w-[366px] shrink-0">{t}</span>
                    {i === PAGE.steps.length - 1 && (
                      <span className="w-[150px] shrink-0 text-[10.5px] font-medium leading-[15px] text-[#1D4ED8]">{PAGE.stepsLink}</span>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-[17px] flex justify-end">
              <button
                data-tl="cta-publish"
                onClick={() => tl.setVar("modal", true)}
                className="h-[26px] rounded-[4px] bg-[#0B0B0F] px-3 text-[10.5px] font-semibold text-white transition-transform duration-150 data-[pressed=true]:scale-[0.97]"
              >
                {PAGE.publish}
              </button>
            </div>

            <p className="mt-[13px] max-w-[390px] text-[10.5px] leading-[15px] text-[#4B5563]">{PAGE.toContinue}</p>

            <div className="mt-[12px] flex flex-col gap-[14px]">
              {DNS_RECORDS.map((r) => (
                <DnsRecordCard key={r.id} tl={tl} record={r} />
              ))}
            </div>

            <p className="mt-[15px] text-[9.5px] leading-[14px] text-[#6B7280]">
              <span className="font-bold text-[#374151]">{PAGE.note.label}</span>
              {PAGE.note.text}
            </p>

            <button
              data-tl="cta-continue"
              disabled={!allVerified}
              className={`mt-[14px] h-[34px] w-full rounded-[6px] text-[11px] font-medium text-white transition-[background-color,transform] duration-300 data-[pressed=true]:scale-[0.985] ${
                allVerified ? "bg-[#111827]" : "bg-[#9CA3AF]"
              }`}
            >
              {PAGE.continue}
            </button>
          </div>
        </OnboardingShell>
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

/** How many cards are verified (each card keeps its state in the scene variable `dns:<id>`). */
function useVerifiedCount(tl: SceneProps["tl"]) {
  const states = DNS_RECORDS.map((r) => useTimelineVar(tl, `dns:${r.id}`, false)); // eslint-disable-line react-hooks/rules-of-hooks -- fixed-length list
  return states.filter(Boolean).length;
}
