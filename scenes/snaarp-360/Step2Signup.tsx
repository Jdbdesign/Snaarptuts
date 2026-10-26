"use client";

import type { ReactNode } from "react";
import { FlagGB, Icon, type LogoName, ProductLogo } from "@/components/icons";
import { BUSINESS_PRICE_360 } from "./pricing-data";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { Timeline } from "@/lib/timeline";
import type { SceneProps } from "@/tutorials/types";
import { PASSWORD_RULES, PHONE_360 } from "./signup-data";

/* The Snaarp sign-up page, rebuilt in HTML/CSS at a 1440px design width. */

const ORBIT_RADIUS = 175;
const ORBIT_TILES: LogoName[] = ["books", "lock", "mail", "teams", "docs", "me", "crm"];

const FEATURES = [
  { title: "Unified Inbox", text: "Business email, shared mailboxes and aliases on your own domain." },
  { title: "Docs & Collaboration", text: "Write, comment and co-edit documents stored right beside your files." },
  { title: "Team Collaboration", text: "Channels, threads and video rooms that live beside your files." },
  { title: "Client Scheduling", text: "Shareable booking pages that write straight into your calendar." },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Step2Signup({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const narrow = useNarrow();

  return (
    <div
      className={`relative h-full w-full bg-white transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}
    >
      <div data-scroller className="flex h-full w-full overflow-hidden">
        <BrandPanel showFeatures={!narrow} />
        <FormPanel tl={tl} />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function BrandPanel({ showFeatures }: { showFeatures: boolean }) {
  return (
    <div
      className="relative h-full w-1/2 shrink-0 overflow-hidden"
      style={{ background: "linear-gradient(150deg, #8B4DF2 0%, #6A12D6 100%)" }}
    >
      <div
        className="absolute left-1/2 top-[35%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 h-[212px] w-[212px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <ProductLogo
          name="snaarp"
          size={80}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[22px] shadow-[0_10px_30px_-10px_rgba(40,0,100,0.5)] ring-1 ring-white/25"
        />

        <div className="absolute inset-0" style={{ animation: "orbit-spin 24s linear infinite" }}>
          {ORBIT_TILES.map((name, i) => {
            const angle = (i * 2 * Math.PI) / ORBIT_TILES.length;
            const x = Math.sin(angle) * ORBIT_RADIUS;
            const y = -Math.cos(angle) * ORBIT_RADIUS;
            return (
              <div
                key={name}
                className="absolute h-10 w-10"
                style={{
                  left: `calc(50% + ${x}px - 20px)`,
                  top: `calc(50% + ${y}px - 20px)`,
                  animation: "orbit-spin-rev 24s linear infinite",
                }}
              >
                <ProductLogo name={name} size={40} className="rounded-[12px] shadow-[0_8px_18px_-8px_rgba(40,0,100,0.6)] ring-1 ring-white/25" />
              </div>
            );
          })}
        </div>
      </div>

      {showFeatures && (
        <div className="absolute bottom-0 left-0 px-12 pb-6">
          <ul className="flex flex-col gap-[19px]">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-3.5">
                <Icon name="checkCircle" size={22} className="mt-px shrink-0 text-white" />
                <div>
                  <p className="text-[14px] font-semibold leading-5 text-white">{f.title}</p>
                  <p className="mt-0.5 text-[11.5px] leading-4 text-white/70">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[13px] text-white/85">and many more...</p>
          <p className="mt-1 text-[10px] text-white/55">© 2026 Snaarp. All rights reserved.</p>
        </div>
      )}
    </div>
  );
}

function FormPanel({ tl }: { tl: Timeline }) {
  const rules = useTimelineVar(tl, "rules", false);
  const submitting = useTimelineVar(tl, "submitting", false);

  return (
    <div
      data-tl="form-panel"
      className="no-scrollbar h-full w-1/2 shrink-0 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F7F7F9 100%)" }}
    >
      <div className="mx-auto w-[600px] pb-[140px] pt-[50px]">
        <div className="flex items-center gap-3">
          <ProductLogo name="snaarp" size={36} className="rounded-[10px] drop-shadow-[0_6px_12px_rgba(112,20,217,0.25)]" />
          <span className="text-[17px] font-bold text-ink">Snaarp</span>
        </div>
        <h1 className="mt-[22px] text-[26px] font-semibold leading-[34px] text-ink">Sign up for Snaarp</h1>
        <p className="mt-[5px] text-[14px] leading-5 text-muted">
          One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.
        </p>

        <div className="mt-[26px] rounded-[20px] border border-[#F0F0F4] bg-white shadow-[0_14px_44px_-14px_rgba(17,17,17,0.1)]">
          <div className="border-b border-line px-6 pb-[26px] pt-[22px]">
            <div data-tl="plan-header" className="-mx-1.5 -my-1 flex h-10 items-center justify-between rounded-[12px] px-1.5 py-1">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#8b909c]">
                Selected plan
              </span>
              <span className="flex items-center gap-2.5 text-[13px] font-bold text-ink">
                <ProductLogo name="360" size={32} className="rounded-[10px] shadow-[0_6px_14px_-4px_rgba(112,20,217,0.5)]" />
                Snaarp 360
              </span>
            </div>
            <p className="mt-3.5 flex items-baseline gap-1 text-[18px] font-bold leading-6 text-ink">
              Business {BUSINESS_PRICE_360}
              <span className="text-[12.5px] font-normal text-muted">/month</span>
            </p>
            <p className="mt-1.5 text-[12px] leading-[18px] text-[#2a2d36]">
              600 GB Billed monthly 14-day free trial included
            </p>
          </div>

          <div className="flex flex-col gap-3 p-6">
            <div className="grid grid-cols-2 gap-3">
              <Field tl={tl} id="first" placeholder="First Name" />
              <Field tl={tl} id="last" placeholder="Last Name" />
            </div>
            <Field
              tl={tl}
              id="email"
              placeholder="Company Email Address"
              right={<Icon name="sparkle" size={15} className="text-[#a3add0]" />}
              showValidity
            />
            <Field tl={tl} id="org" placeholder="Organization Name" />

            <div
              data-tl="country"
              className="flex h-[46px] items-center gap-2.5 rounded-[10px] border border-[#E6E6EC] bg-white px-4 text-[14px] text-ink"
            >
              <FlagGB />
              {PHONE_360.country}
              <Icon name="chevronDown" size={16} className="ml-auto text-[#6b7280]" />
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-3">
              <div
                data-tl="dial"
                className="flex h-[46px] items-center rounded-[10px] border border-[#E6E6EC] bg-white px-4 text-[14px] text-ink"
              >
                {PHONE_360.dialCode}
              </div>
              <Field tl={tl} id="phone" placeholder="Phone Number" />
            </div>

            <div>
              <Field
                tl={tl}
                id="password"
                placeholder="Password"
                mask
                right={
                  <>
                    <Icon name="magic" size={18} />
                    <Icon name="eye" size={16} className="text-[#a3a8b4]" />
                  </>
                }
              />
              {rules && (
                <ul
                  data-tl="rules"
                  className="tl-fade-in mt-3 grid grid-flow-col grid-rows-3 gap-x-6 gap-y-1.5 px-0.5"
                >
                  {PASSWORD_RULES.map((r) => (
                    <li
                      key={r.id}
                      data-tl={`rule-${r.id}`}
                      className="group flex items-center gap-2 text-[11.5px] leading-4 text-muted"
                    >
                      <Icon
                        name="check"
                        size={13}
                        className="text-[#d3d6dd] transition-colors duration-200 group-data-[ticked=true]:text-[#22a06b]"
                      />
                      {r.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              data-tl="cta-signup"
              disabled={submitting}
              className={`mt-1.5 flex h-[50px] w-full items-center justify-center gap-2.5 rounded-full text-[14px] font-semibold text-white transition-[transform,background] duration-200 data-[pressed=true]:scale-[0.97] ${
                submitting
                  ? "pointer-events-none bg-[#C4A8F4] shadow-[0_12px_26px_-10px_rgba(124,47,230,0.3)]"
                  : "shadow-[0_12px_26px_-8px_rgba(124,47,230,0.55)]"
              }`}
              style={submitting ? undefined : { background: "linear-gradient(90deg, #9B5CF6 0%, #7C2FE6 100%)" }}
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {submitting ? "Creating account..." : "Sign up to Snaarp 360"}
            </button>
          </div>
        </div>

        <div data-tl="signup-footer" className="mt-5 text-center">
          <p className="text-[13px] text-[#4b5060]">
            Already have an account? <span className="font-bold text-brand">Sign in</span>
          </p>
          <p className="mt-3 text-[11.5px] text-muted">
            By signing up you agree to our <span className="underline">Terms of Service</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  tl: Timeline;
  id: string;
  placeholder: string;
  mask?: boolean;
  right?: ReactNode;
  showValidity?: boolean;
};

/** A form field the timeline types into (value lives in the scene variable `field:<id>`). */
function Field({ tl, id, placeholder, mask, right, showValidity }: FieldProps) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focus = useTimelineVar(tl, "focus", "");
  const typing = useTimelineVar(tl, "typing", "");

  const valid = !!showValidity && EMAIL_PATTERN.test(value) && typing !== id;
  const focused = focus === id && !valid;
  const shown = mask ? "•".repeat(value.length) : value;

  return (
    <div>
      <div
        data-tl={`field-${id}`}
        data-focus={focused}
        data-valid={valid}
        onClick={() => tl.setVar("focus", id)}
        className="flex h-[46px] items-center gap-2 rounded-[10px] border border-[#E6E6EC] bg-white px-4 text-[14px] text-ink transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-brand data-[focus=true]:shadow-[0_0_0_0.5px_#7014D9,0_0_0_4px_rgba(112,20,217,0.12)] data-[valid=true]:border-[#34b27b] data-[valid=true]:shadow-[0_0_0_0.5px_#34b27b,0_0_0_4px_rgba(52,178,123,0.1)]"
      >
        <span className="flex min-w-0 flex-1 items-center">
          {value ? (
            <span className={`truncate ${mask ? "tracking-[1.5px]" : ""}`}>{shown}</span>
          ) : null}
          {focused && (
            <i
              className="h-[18px] w-px shrink-0 bg-ink"
              style={{ animation: "caret-blink 1s steps(1) infinite" }}
            />
          )}
          {!value && <span className="truncate text-[#9aa0ab]">{placeholder}</span>}
        </span>
        {right}
      </div>
      {valid && <p className="mt-1.5 text-[12px] leading-4 text-[#22a06b]">Looks good.</p>}
    </div>
  );
}
