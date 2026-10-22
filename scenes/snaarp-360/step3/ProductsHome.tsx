"use client";

import { Icon, ProductLogo } from "@/components/icons";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { PRODUCT_TILES, type ProductTile } from "./step3-data";

type Props = SceneProps & {
  /** Letter in the avatar, top right. */
  avatar?: string;
  /** Products shown once loaded (the skeleton always shows a full grid). */
  tiles?: ProductTile[];
};

/** The Snaarp products home (login.snaarp.com/products). */
export function ProductsHome({ tl, avatar = "J", tiles = PRODUCT_TILES }: Props) {
  const loaded = useTimelineVar(tl, "loaded", false);

  return (
    <div className="relative h-full w-full bg-white">
      <span className="absolute right-7 top-[19px] flex h-10 w-10 items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white shadow-[0_6px_14px_-4px_rgba(112,20,217,0.5)]">
        {avatar}
      </span>

      <div className="mx-auto flex w-[716px] gap-4 pt-[72px]">
        <div
          data-tl="card-emails"
          className="group relative flex h-[86px] flex-1 items-center gap-4 rounded-[14px] bg-brand pl-5 text-[16px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(112,20,217,0.6)] transition-all duration-200 data-[hover=true]:-translate-y-[3px] data-[hover=true]:shadow-[0_20px_36px_-12px_rgba(112,20,217,0.7)] data-[pressed=true]:scale-[0.98]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-brand">
            <Icon name="mail" size={24} />
          </span>
          Create/Configure Emails
          <span className="pointer-events-none absolute left-1/2 top-[calc(100%-8px)] z-10 w-[290px] rounded-md bg-[#2b2b30] px-2.5 py-2 text-[10px] font-medium leading-[14px] text-white opacity-0 shadow-lg transition-opacity duration-200 group-data-[hover=true]:opacity-100">
            Set up business email on your own domain, create mailboxes, add aliases, and manage routing and
            delivery for your organization.
          </span>
        </div>
        <div
          data-tl="card-admin"
          className="flex h-[86px] flex-1 items-center gap-4 rounded-[14px] bg-brand pl-5 text-[16px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(112,20,217,0.6)] transition-all duration-200 data-[hover=true]:-translate-y-[3px] data-[hover=true]:shadow-[0_20px_36px_-12px_rgba(112,20,217,0.7)] data-[pressed=true]:scale-[0.98]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-white text-brand">
            <Icon name="lock" size={24} />
          </span>
          System Admin
        </div>
      </div>

      <div className="mt-[39px] flex flex-col items-center text-center">
        <h1 className="text-[34px] font-bold leading-[44px] text-ink">Welcome</h1>
        <p className="mt-3 w-[378px] text-[14px] leading-[26px] text-muted">
          One Snaarp account for Mail, Docs, Sheet, CRM, and everything else.
        </p>
        <p className={`mt-3.5 text-[13px] text-muted ${loaded ? "" : "invisible"}`}>
          Registered from <b className="font-semibold text-ink">Snaarp Mail</b>
        </p>

        <div className="mt-[22px] inline-flex h-[47px] items-center rounded-full border border-line bg-[#F6F6F8] p-1 shadow-[0_2px_8px_-4px_rgba(17,17,17,0.12)]">
          <span className="flex h-[39px] items-center rounded-full bg-white px-6 text-[13px] font-semibold text-brand shadow-sm">
            Active Products
          </span>
          <span className="px-6 text-[13px] font-semibold text-[#6b7280]">Store</span>
        </div>
      </div>

      <div data-tl="product-grid" className="mx-auto mt-[26px] w-[826px] rounded-[24px] p-5">
        <div className="grid grid-cols-9 gap-y-[52px]">
          {loaded
            ? tiles.map((t, i) => (
                <div key={t.id} className="flex flex-col items-center gap-2.5">
                  <ProductLogo
                    name={t.logo}
                    size={58}
                    className="tl-pop rounded-[16px] shadow-[0_10px_18px_-8px_rgba(112,20,217,0.6)]"
                    style={{ animationDelay: `${i * 40}ms` }}
                  />
                  <span className="tl-pop text-[10.5px] text-muted" style={{ animationDelay: `${i * 40 + 80}ms` }}>
                    {t.label}
                  </span>
                </div>
              ))
            : PRODUCT_TILES.slice(0, 12).map((t) => (
                <div key={t.id} className="flex flex-col items-center gap-3">
                  <span className="tl-shimmer h-[66px] w-[66px] rounded-[18px]" />
                  <span className="tl-shimmer h-2 w-10 rounded-full" />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
