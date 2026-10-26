"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { TypedField } from "@/components/admin/TypedField";
import { FlagGB, Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { Timeline } from "@/lib/timeline";
import type { SceneProps } from "@/tutorials/types";
import { BRAND, FORM, PLAN, passwordStrength } from "./signup-data";

/* The Snaarp Mail sign-up page (login.snaarp.com/signup), rebuilt in HTML/CSS at a 1440px design width. */

/** Narrow screens: the dark panel shrinks to a slim header and the form card is enlarged to stay readable. */
const NARROW_ZOOM = 2.7;

const FIELD = "!h-[39px] !rounded-[5px] !border-[#E5E7EB] !px-3 !text-[12px]";

export function Step2Signup({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();

  return (
    <div
      className={`relative h-full w-full bg-white transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}
    >
      <div data-scroller className={`flex h-full w-full overflow-hidden ${narrow ? "flex-col" : ""}`}>
        {narrow ? <SlimHeader /> : <BrandPanel />}
        <FormPanel tl={tl} zoom={narrow ? NARROW_ZOOM : 1} />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function SlimHeader() {
  return (
    <div className="flex h-[110px] shrink-0 items-center justify-center" style={{ background: "#1A2230" }}>
      <span className="text-[44px] font-medium tracking-[0.01em] text-white">{BRAND.wordmark}</span>
    </div>
  );
}

/** Faint low-poly pattern on the dark panel. Purely decorative. */
function PolygonPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 780 693"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="780" height="693" fill="#1B2330" />
      <polygon points="0,0 300,0 130,260" fill="#1F2734" />
      <polygon points="300,0 780,0 560,210 130,260" fill="#1A212D" />
      <polygon points="780,0 780,330 560,210" fill="#1E2532" />
      <polygon points="0,0 130,260 0,420" fill="#19202B" />
      <polygon points="130,260 560,210 400,470" fill="#1D2431" />
      <polygon points="0,420 130,260 400,470 230,693 0,693" fill="#1C2330" />
      <polygon points="560,210 780,330 780,560 400,470" fill="#19202C" />
      <polygon points="400,470 780,560 780,693 230,693" fill="#1B222F" />
      <polygon points="230,693 400,470 520,693" fill="#1F2633" />
    </svg>
  );
}

function BrandPanel() {
  return (
    <div className="relative flex h-full w-[54%] shrink-0 flex-col overflow-hidden text-white">
      <PolygonPattern />
      <div className="relative flex h-full flex-col px-8 pb-9 pt-9">
        <p className="text-center text-[18px] font-medium leading-7">{BRAND.wordmark}</p>
        <h1 className="mt-[46px] text-[28px] font-semibold leading-9">{BRAND.heading}</h1>
        <p className="mt-[19px] max-w-[700px] text-[15px] leading-6 text-[#B7BDC8]">{BRAND.text}</p>

        <ul className="mt-9 flex flex-col gap-[27px]">
          {BRAND.features.map((f) => (
            <li key={f.title} className="flex items-start gap-3.5">
              <span className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-[8px] bg-white text-[#1B2330]">
                <Icon name={f.icon} size={18} />
              </span>
              <div>
                <p className="text-[15px] font-semibold leading-[22px]">{f.title}</p>
                <p className="mt-1 text-[12.5px] leading-[18px] text-[#AEB5C0]">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-auto flex gap-6 text-[11px] text-[#9CA3AF]">
          {BRAND.footerLinks.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FormPanel({ tl, zoom }: { tl: Timeline; zoom: number }) {
  return (
    <div data-tl="form-panel" className="no-scrollbar min-h-0 flex-1 overflow-y-auto bg-white">
      <div className="mx-auto w-[436px] pb-10 pt-[37px]" style={{ zoom }}>
        <SignupCard tl={tl} />
      </div>
    </div>
  );
}

function SignupCard({ tl }: { tl: Timeline }) {
  const submitting = useTimelineVar(tl, "submitting", false);
  const agreed = useTimelineVar(tl, "agree", false);
  const password = useTimelineVar(tl, "field:password", "");
  const strength = passwordStrength(password);

  return (
    <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-6 shadow-[0_6px_24px_-12px_rgba(17,24,39,0.12)]">
      <h2 className="text-center text-[19px] font-semibold leading-7 text-ink">{FORM.title}</h2>
      <p className="mx-auto mt-2 max-w-[300px] text-center text-[12px] leading-[17px] text-[#6B7280]">{FORM.subtitle}</p>

      <div data-tl="plan-box" className="mt-[26px] rounded-[10px] bg-[#F7F8FB] px-4 py-[15px]">
        <p className="text-[9px] font-medium uppercase tracking-[0.04em] text-[#6B7280]">{PLAN.label}</p>
        <p className="mt-1.5 flex items-baseline gap-2 text-ink">
          <span className="text-[17px] font-bold">{PLAN.name}</span>
          <span className="text-[15px] font-semibold">
            {PLAN.price}
            <span className="text-[12px] font-normal text-[#6B7280]">{PLAN.per}</span>
          </span>
        </p>
        <p className="mt-1.5 flex gap-3 text-[11px] leading-4 text-[#6B7280]">
          <span>{PLAN.storage}</span>
          <span>{PLAN.billing}</span>
          <span className="font-medium text-[#15803D]">{PLAN.trial}</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-[18px]">
        <div className="grid grid-cols-2 gap-3">
          <TypedField tl={tl} id="first" placeholder={FORM.placeholders.first} tone="dark" className={FIELD} />
          <TypedField tl={tl} id="last" placeholder={FORM.placeholders.last} tone="dark" className={FIELD} />
        </div>
        <TypedField tl={tl} id="email" placeholder={FORM.placeholders.email} tone="dark" className={FIELD} />
        <TypedField tl={tl} id="org" placeholder={FORM.placeholders.org} tone="dark" className={FIELD} />

        <div
          data-tl="country"
          className="flex h-[39px] items-center gap-2 rounded-[5px] border border-[#E5E7EB] bg-white px-3 text-[12px] text-ink"
        >
          <FlagGB width={14} />
          {FORM.country}
          <Icon name="chevronDown" size={15} className="ml-auto text-[#6B7280]" />
        </div>
        <div className="grid grid-cols-[88px_1fr] gap-3">
          <div
            data-tl="dial"
            className="flex h-[39px] items-center rounded-[5px] border border-[#E5E7EB] bg-white px-3 text-[12px] text-[#4B5563]"
          >
            {FORM.dialCode}
          </div>
          <TypedField tl={tl} id="phone" placeholder={FORM.placeholders.phone} tone="dark" className={FIELD} />
        </div>

        <div>
          <p className="mb-[9px] text-[12px] font-medium leading-4 text-ink">{FORM.passwordLabel}</p>
          <TypedField
            tl={tl}
            id="password"
            placeholder=""
            mask
            tone="dark"
            className={FIELD}
            right={<Icon name="eye" size={14} className="text-[#9CA3AF]" />}
          />
          <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-[#E5E7EB]">
            <div
              data-tl="strength-bar"
              className="h-full rounded-full transition-[width,background-color] duration-300"
              style={{ width: `${strength.width * 100}%`, background: strength.color }}
            />
          </div>
          <p data-tl="strength-text" className="mt-1.5 text-[11px] leading-4 text-[#4B5563]">
            {FORM.strengthLabel} {strength.label}
          </p>
        </div>

        <button
          data-tl="terms"
          onClick={() => tl.setVar("agree", !agreed)}
          className="flex items-start gap-2 text-left text-[10px] leading-[15px] text-[#4B5563]"
        >
          <span className="mt-px">
            <Checkbox checked={agreed} size={14} />
          </span>
          <span>
            {FORM.terms.before}
            <span className="text-[#2563EB]">{FORM.terms.termsLink}</span>
            {FORM.terms.middle}
            <span className="text-[#2563EB]">{FORM.terms.privacyLink}</span>
            {FORM.terms.after}
          </span>
        </button>

        <button
          data-tl="cta-signup"
          disabled={submitting}
          className={`flex h-[39px] w-full items-center justify-center gap-2 rounded-[5px] text-[12px] font-medium text-white transition-[transform,background] duration-200 data-[pressed=true]:scale-[0.98] ${
            submitting ? "pointer-events-none bg-[#7E7E7E]" : "bg-[#111827]"
          }`}
        >
          {submitting && (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {submitting ? FORM.submitting : FORM.submit}
        </button>

        <p data-tl="signup-footer" className="-mt-1 text-center text-[11.5px] text-[#4B5563]">
          {FORM.hasAccount} <span className="font-medium text-[#2563EB]">{FORM.logIn}</span>
        </p>
      </div>
    </div>
  );
}
