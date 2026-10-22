"use client";

import type { ReactNode } from "react";
import { TypedField } from "@/components/admin/TypedField";
import { ToastHost } from "@/components/admin/Toast";
import { Icon } from "@/components/icons";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { Timeline } from "@/lib/timeline";
import type { SceneProps } from "@/tutorials/types";
import { COMPANY_SIZES, INDUSTRIES, ORG, SAMPLE, slug } from "./org-data";

/* Snaarp Mail onboarding, step 1 of 5 in the sidebar: Organization Details (login.snaarp.com/onboarding/organization). */

/** Narrow screens: the card is enlarged so it stays readable once the page is scaled down. */
const NARROW_ZOOM = 1.9;

const FIELD = "!h-[30px] !rounded-[4px] !border-[#E5E7EB] !px-2.5 !text-[11.5px]";
const LABEL = "mb-[5px] block text-[11.5px] font-medium leading-4 text-[#1F2937]";

export function Step3Organization({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <OnboardingShell active="organization">
          <div className="mx-auto w-[681px] pb-10 pt-[58px]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
            <OrgCard tl={tl} stacked={narrow} />
          </div>
        </OnboardingShell>
      </div>
      <ToastHost tl={tl} />
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function OrgCard({ tl, stacked }: { tl: Timeline; stacked: boolean }) {
  const saving = useTimelineVar(tl, "saving", false);
  const pair = stacked ? "grid grid-cols-1 gap-[18px]" : "grid grid-cols-2 gap-[13px]";

  return (
    <>
      <div
        className={`rounded-[8px] border border-[#E5E7EB] bg-white px-5 pb-5 pt-[17px] shadow-[0_2px_10px_-6px_rgba(17,24,39,0.12)] transition-opacity duration-300 ${saving ? "opacity-60" : ""}`}
      >
        <h2 className="flex items-center gap-2 text-[17px] font-semibold leading-6 text-ink">
          <Icon name="building" size={16} className="text-[#374151]" />
          {ORG.title}
        </h2>
        <p className="mt-0.5 text-[11px] leading-4 text-[#6B7280]">{ORG.subtitle}</p>

        <div className="mt-[14px] flex flex-col gap-[18px]">
          <div>
            <span className={LABEL}>{ORG.labels.name}</span>
            <div
              data-tl="field-name"
              className="flex h-[30px] items-center rounded-[4px] bg-[#E7EFFD] px-2.5 text-[11.5px] text-ink"
            >
              {SAMPLE.name}
            </div>
          </div>

          <SelectField tl={tl} id="industry" label={ORG.labels.industry} placeholder={ORG.placeholders.industry} options={INDUSTRIES} />
          <SelectField tl={tl} id="size" label={ORG.labels.size} placeholder={ORG.placeholders.size} options={COMPANY_SIZES} />

          <div className={pair}>
            <Labeled label={ORG.labels.website}>
              <TypedField tl={tl} id="website" placeholder={ORG.placeholders.website} tone="purple" className={FIELD} />
            </Labeled>
            <Labeled label={ORG.labels.phone}>
              <TypedField tl={tl} id="phone" placeholder={ORG.placeholders.phone} tone="purple" className={FIELD} />
            </Labeled>
          </div>
          <Labeled label={ORG.labels.address}>
            <TypedField tl={tl} id="address" placeholder={ORG.placeholders.address} tone="purple" className={FIELD} />
          </Labeled>
        </div>
      </div>

      <div className="mt-[18px] flex items-center justify-between">
        <button className="h-[28px] rounded-[4px] border border-[#E5E7EB] bg-white px-3.5 text-[11px] font-medium text-ink shadow-[0_1px_2px_rgba(17,24,39,0.05)]">
          {ORG.back}
        </button>
        <button
          data-tl="cta-continue"
          disabled={saving}
          className={`flex h-[28px] items-center justify-center gap-1.5 rounded-[4px] px-4 text-[11px] font-medium text-white transition-[transform,background] duration-200 data-[pressed=true]:scale-[0.96] ${
            saving ? "pointer-events-none bg-[#C4A6F6]" : "bg-[#7C39ED]"
          }`}
        >
          {saving && <span className="h-3 w-3 animate-spin rounded-full border-[1.5px] border-white/50 border-t-white" />}
          {saving ? ORG.saving : ORG.next}
        </button>
      </div>
    </>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className={LABEL}>{label}</span>
      {children}
    </div>
  );
}

type SelectProps = { tl: Timeline; id: string; label: string; placeholder: string; options: string[] };

/**
 * A select the timeline drives: clicking the field toggles the list (scene variable `open`),
 * clicking an option stores it in `field:<id>` and closes the list. Options can be hovered with tl.hover().
 */
function SelectField({ tl, id, label, placeholder, options }: SelectProps) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const open = useTimelineVar(tl, "open", "") === id;

  return (
    <div className="relative">
      <span className={LABEL}>{label}</span>
      <div
        data-tl={`select-${id}`}
        data-open={open}
        onClick={() => tl.setVar("open", open ? "" : id)}
        className="flex h-[30px] items-center rounded-[4px] border border-[#E5E7EB] bg-white px-2.5 text-[11.5px] transition-[border-color,box-shadow] duration-150 data-[open=true]:border-[#7C39ED] data-[open=true]:shadow-[0_0_0_3px_rgba(124,57,237,0.14)]"
      >
        <span className={`flex-1 truncate ${value ? "text-ink" : "text-[#6B7280]"}`}>{value || placeholder}</span>
        <Icon
          name="chevronDown"
          size={14}
          className={`text-[#6B7280] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      <div
        role="listbox"
        className={`absolute inset-x-0 top-full z-30 mt-1 origin-top rounded-[6px] border border-[#E5E7EB] bg-white p-1 shadow-[0_12px_32px_-12px_rgba(17,24,39,0.28)] transition-[opacity,transform] duration-200 ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {options.map((o) => (
          <div
            key={o}
            role="option"
            aria-selected={value === o}
            data-tl={`option-${id}-${slug(o)}`}
            onClick={() => {
              tl.setVar(`field:${id}`, o);
              tl.setVar("open", "");
            }}
            className="flex h-[24px] items-center rounded-[4px] px-3 text-[11.5px] text-[#1F2937] transition-colors duration-150 data-[hover=true]:bg-[#F3F4F6] data-[pressed=true]:bg-[#E5E7EB]"
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}
