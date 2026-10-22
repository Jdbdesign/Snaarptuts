"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DarkPanel } from "./DarkPanel";

/*
 * Screen C: admin sign-in (admin.snaarp.com/admin/login).
 * The admin portal has its own look: near-black panel and BLUE actions, not the brand purple.
 */
const ADMIN_BLUE = "#2F5BE0";

export function AdminSignIn({ tl }: SceneProps) {
  const narrow = useNarrow();

  return (
    <div className="flex h-full w-full bg-white">
      {!narrow && <DarkPanel />}
      <div className="flex h-full flex-1 justify-center">
        <div className="w-[450px] pt-[160px]">
          <h1 className="text-center text-[26px] font-semibold leading-8 text-ink">Snaarp Admin</h1>
          <p className="mt-2 text-center text-[15px] leading-6 text-muted">Sign in to manage your organization</p>

          <label className="mt-8 block text-[13px] font-medium leading-5 text-ink">Admin Email</label>
          <Input tl={tl} id="admin-email" placeholder="admin@company.com" />

          <label className="mt-6 block text-[13px] font-medium leading-5 text-ink">Password</label>
          <Input
            tl={tl}
            id="admin-password"
            placeholder="Enter your admin password"
            mask
            right={<Icon name="eye" size={17} className="text-[#a3a8b4]" />}
          />

          <div className="mt-[33px] flex items-center justify-between text-[14px]">
            <span className="flex items-center gap-2.5 font-medium text-ink">
              <span className="flex h-4 w-4 items-center justify-center rounded-[4px] bg-[#111] text-white">
                <Icon name="check" size={11} />
              </span>
              Keep me signed in
            </span>
            <span className="font-medium" style={{ color: ADMIN_BLUE }}>
              Forgot Password?
            </span>
          </div>

          <button
            data-tl="cta-admin-signin"
            className="mt-5 h-[49px] w-full rounded-lg text-[14px] font-bold text-white shadow-[0_10px_20px_-10px_rgba(47,91,224,0.7)] transition-transform duration-150 data-[pressed=true]:scale-[0.98]"
            style={{ background: ADMIN_BLUE }}
          >
            Sign in to Admin Portal
          </button>

          <div className="mt-6 border-t border-line pt-5 text-center text-[14px] leading-[31px] text-[#4b5060]">
            <p>
              Looking for your email?{" "}
              <b className="font-semibold" style={{ color: ADMIN_BLUE }}>
                Go to Email Client
              </b>
            </p>
            <p>
              Don&apos;t have an account?{" "}
              <b className="font-semibold" style={{ color: ADMIN_BLUE }}>
                Sign up for Business
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type InputProps = { tl: Timeline; id: string; placeholder: string; mask?: boolean; right?: ReactNode };

/** An input the timeline types into (value lives in the scene variable `field:<id>`). */
function Input({ tl, id, placeholder, mask, right }: InputProps) {
  const value = useTimelineVar(tl, `field:${id}`, "");
  const focus = useTimelineVar(tl, "focus", "");
  const focused = focus === id;
  const shown = mask ? "•".repeat(value.length) : value;

  return (
    <div
      data-tl={`field-${id}`}
      data-focus={focused}
      onClick={() => tl.setVar("focus", id)}
      className="mt-[7px] flex h-[50px] items-center gap-2 rounded-lg border border-[#E1E4EE] bg-[#F4F6FB] px-4 text-[14.5px] text-ink transition-[border-color,box-shadow] duration-150 data-[focus=true]:border-[#2F5BE0] data-[focus=true]:bg-white data-[focus=true]:shadow-[0_0_0_0.5px_#2F5BE0,0_0_0_4px_rgba(47,91,224,0.14)]"
    >
      <span className="flex min-w-0 flex-1 items-center">
        {value ? <span className={`truncate ${mask ? "tracking-[1.5px]" : ""}`}>{shown}</span> : null}
        {focused && (
          <i className="h-[18px] w-px shrink-0 bg-ink" style={{ animation: "caret-blink 1s steps(1) infinite" }} />
        )}
        {!value && <span className="truncate text-[#9aa0ab]">{placeholder}</span>}
      </span>
      {right}
    </div>
  );
}
