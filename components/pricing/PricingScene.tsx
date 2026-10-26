"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { FlagGB, Icon, ProductLogo } from "@/components/icons";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { PRODUCT_TABS, type Plan, type PlanIcon, type PricingData } from "./pricing-types";

/*
 * The Snaarp pricing page, rebuilt in HTML/CSS at a 1440px design width.
 * Shared by every product's "Choose your plan" step: the product passes its own `data`
 * (plans per tab, currency, starting tab and scroll). The layout is never duplicated.
 */

export function PricingScene({ tl, data }: SceneProps & { data: PricingData }) {
  const intro = useTimelineVar(tl, "intro", 0);
  const cards = useTimelineVar(tl, "cards", !!data.cardsVisibleAtStart);
  const fade = useTimelineVar(tl, "fade", false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [tab, setTab] = useState(data.initialTab);
  const plans = data.plansByTab[tab] ?? data.plansByTab[data.initialTab];
  const scroller = useRef<HTMLDivElement>(null);

  // Start the page at the scroll position the recording shows.
  useLayoutEffect(() => {
    if (scroller.current && data.startScroll) scroller.current.scrollTop = data.startScroll;
  }, [data.startScroll]);

  const fadeUp = (on: boolean) =>
    `transition-all duration-700 ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`;

  return (
    <div
      className={`relative h-full w-full bg-white transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}
    >
      <div ref={scroller} data-scroller className="h-full w-full overflow-hidden [transform:translateZ(0)]">
        <Nav currency={data.currency} />
        {/* Extra room below when the page starts scrolled, so the start position is reachable at any window size. */}
        <main className={data.startScroll ? "pb-[600px]" : "pb-24"}>
          <section className={`flex flex-col items-center pt-[98px] ${fadeUp(intro >= 2)}`}>
            <span className="inline-flex h-[26px] items-center rounded-full bg-brand-soft px-4 text-[11px] font-semibold tracking-[0.06em] text-brand">
              PRICING
            </span>
            <h1 className="mt-6 text-center text-[42px] font-bold leading-[1.22] text-ink">
              Simple Pricing That Scales
              <br />
              With Storage
            </h1>
            <p className="mt-5 text-center text-[14px] leading-[26px] text-muted">
              Flexible user limits included in every plan.
              <br />
              Choose the storage tier that fits your organisation.
            </p>

            <div className="mt-9 inline-flex rounded-full bg-[#F3F3F5] p-1">
              {(["monthly", "yearly"] as const).map((b) => (
                <button
                  key={b}
                  data-tl={`toggle-${b}`}
                  onClick={() => setBilling(b)}
                  className={`h-10 rounded-full px-7 text-[13px] font-semibold capitalize transition-all duration-150 data-[pressed=true]:scale-95 ${
                    billing === b ? "bg-brand text-white" : "text-[#555a66]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </section>

          <div
            data-tl="tabs"
            className={`mx-auto mt-11 w-[1176px] rounded-[20px] bg-[#F7F7F9] px-5 py-4 ${fadeUp(intro >= 2)}`}
          >
            {PRODUCT_TABS.map((row, i) => (
              <div
                key={i}
                className={`flex items-center ${i === 0 ? "justify-between" : "mt-1.5 justify-center gap-9"}`}
              >
                {row.map((t) => (
                  <button
                    key={t.id}
                    data-tl={`tab-${t.id}`}
                    onClick={() => setTab(t.id)}
                    className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-all duration-150 data-[pressed=true]:scale-95 ${
                      tab === t.id ? "bg-brand text-white" : "text-[#4b5060]"
                    }`}
                  >
                    <ProductLogo name={t.id} size={24} className="rounded-[7px]" />
                    {t.label}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div
            data-tl="plan-grid"
            className={`mx-auto mt-11 grid w-[1176px] grid-cols-4 gap-[25px] transition-all duration-700 ease-out ${
              cards ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {plans.map((p) => (
              <PlanCard key={`${tab}-${p.id}`} plan={p} swap={tab !== data.initialTab} />
            ))}
          </div>
        </main>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function Nav({ currency }: { currency: PricingData["currency"] }) {
  return (
    <header className="sticky -top-px z-20 flex h-[65px] items-center justify-between border-b border-line bg-white px-[72px] pt-px">
      <div className="flex items-center gap-9">
        <span className="text-[22px] font-bold tracking-tight text-brand">Snaarp</span>
        <nav className="flex items-center gap-8 text-[14px] font-medium text-[#4b5060]">
          <span className="inline-flex items-center gap-1">
            Products <Icon name="chevronDown" size={14} />
          </span>
          <span className="inline-flex items-center gap-1">
            Solution <Icon name="chevronDown" size={14} />
          </span>
          <span>Pricing</span>
          <span>Contact Sales</span>
        </nav>
      </div>
      <div className="flex items-center gap-6 text-[14px] font-medium text-[#4b5060]">
        <span>Login</span>
        {currency.kind === "global" ? (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="globe" size={18} className="text-[#5aa0e6]" />
            Global <Icon name="chevronDown" size={14} />
          </span>
        ) : (
          <span data-tl="currency" className="inline-flex items-center gap-1.5">
            <FlagGB width={16} />
            {currency.code} <Icon name="chevronDown" size={14} />
          </span>
        )}
      </div>
    </header>
  );
}

function PlanCard({ plan, swap }: { plan: Plan; swap: boolean }) {
  const popular = plan.popular;
  const layout = plan.iconLayout ?? { layout: "grid", size: 32 };
  return (
    <div
      data-tl={`plan-${plan.id}`}
      className={`relative flex flex-col rounded-[20px] bg-white p-6 transition-all duration-300 ease-out data-[hover=true]:-translate-y-2 ${swap ? "tl-swap" : ""} ${
        popular
          ? "border-2 border-brand shadow-[0_24px_48px_-16px_rgba(112,20,217,0.28)] data-[hover=true]:shadow-[0_32px_60px_-16px_rgba(112,20,217,0.38)]"
          : "border border-line data-[hover=true]:shadow-[0_20px_40px_-20px_rgba(17,17,17,0.2)]"
      }`}
    >
      {popular && (
        <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-[10px] font-bold tracking-[0.08em] text-white">
          MOST POPULAR
        </span>
      )}
      <span className="inline-flex h-[22px] items-center self-start rounded-full bg-brand-soft px-3 text-[11px] font-medium text-brand">
        14-day free trial
      </span>
      <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">{plan.name}</span>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-[28px] font-bold leading-tight text-ink">{plan.price}</span>
        <span className="text-[13px] text-muted">/month</span>
      </div>
      <span className="mt-1 text-[12px] text-muted">Billed monthly</span>
      <span className="mt-2.5 text-[12px] text-muted">
        Total for 12 months: <b className="font-semibold text-ink">{plan.total}</b>
      </span>
      <span className="mt-4 border-b border-line pb-4 text-[12px] text-muted">{plan.storage}</span>

      <div className={`mt-5 ${layout.layout === "grid" ? "grid grid-cols-6 gap-[6px]" : "flex gap-1"}`}>
        {plan.icons.map((name, i) => (
          <PlanLogo key={`${name}-${i}`} name={name} size={layout.size} />
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-ink">
        <Icon name="check" size={13} className="text-[#9aa0ab]" />
        {plan.headline}
      </div>
      <ul className="mt-3 flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[12.5px] leading-[18px] text-muted">
            <Icon name="check" size={13} className="mt-[3px] shrink-0 text-[#9aa0ab]" />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex-1" />
      <button
        data-tl={`cta-${plan.id}`}
        className={`mt-6 h-[46px] w-full rounded-full text-[14px] font-semibold transition-all duration-150 data-[pressed=true]:scale-95 ${
          popular
            ? "bg-brand text-white shadow-[0_10px_24px_-8px_rgba(112,20,217,0.6)]"
            : "border border-line bg-white text-ink"
        }`}
      >
        Start 14-day free trial
      </button>
    </div>
  );
}

/** One product logo in a plan card. "soon" is the faint outline shield (a product not out yet). */
function PlanLogo({ name, size }: { name: PlanIcon; size: number }) {
  if (name === "soon") {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-[9px] bg-[#F4F0FC] text-[#b7a3e4]"
        style={{ width: size, height: size }}
      >
        <Icon name="shield" size={Math.round(size * 0.55)} />
      </span>
    );
  }
  return <ProductLogo name={name} size={size} className="rounded-[9px]" />;
}
