"use client";

import { Checkbox } from "@/components/admin/Checkbox";
import { ToastHost } from "@/components/admin/Toast";
import { TypedField } from "@/components/admin/TypedField";
import { Icon } from "@/components/icons";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { DarkPanel } from "../step3/DarkPanel";

const LINK_BLUE = "#2F5BE0";

/**
 * Screen D: the user login (login.snaarp.com/login), a 50/50 split. Unlike the admin sign-in it
 * keeps a BLACK button. No browser autofill list or "Save password?" popup is drawn on purpose.
 */
export function UserLogin({ tl }: SceneProps) {
  const narrow = useNarrow();
  const loggingIn = useTimelineVar(tl, "loggingIn", false);

  return (
    <div className="relative flex h-full w-full bg-white">
      {!narrow && <DarkPanel />}
      <div className="flex h-full min-w-0 flex-1 items-center justify-center pb-[40px]">
        <div className="w-[450px]">
          <h1 className="text-center text-[26px] font-bold leading-8 text-ink">Login to Snaarp</h1>
          <p className="mt-2 text-center text-[14px] leading-6 text-muted">Welcome back! Please enter your details</p>

          <label className="mt-8 block text-[13px] font-medium leading-5 text-ink">Email Address</label>
          <TypedField
            tl={tl}
            id="login-email"
            placeholder="Enter your email"
            tone="dark"
            className="mt-[7px] h-[50px] text-[14.5px]"
          />

          <label className="mt-5 block text-[13px] font-medium leading-5 text-ink">Password</label>
          <TypedField
            tl={tl}
            id="login-password"
            placeholder="Enter your password"
            mask
            tone="dark"
            right={<Icon name="eye" size={17} className="text-[#a3a8b4]" />}
            className="mt-[7px] h-[50px] text-[14.5px]"
          />

          <span className="mt-[22px] flex items-center gap-2.5 text-[14px] font-medium text-ink">
            <Checkbox checked />
            Remember Me
          </span>

          <button
            data-tl="btn-login"
            className={`mt-5 flex h-[49px] w-full items-center justify-center gap-2.5 rounded-lg text-[14px] font-bold text-white transition-[background,transform] duration-150 data-[pressed=true]:scale-[0.98] ${
              loggingIn ? "bg-[#6B7080]" : "bg-[#111]"
            }`}
          >
            {loggingIn && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {loggingIn ? "Logging in..." : "Login"}
          </button>

          <p className="mt-6 text-center text-[14px] text-[#4b5060]">
            Don&apos;t have an account?{" "}
            <b className="font-semibold" style={{ color: LINK_BLUE }}>
              Sign up for Business
            </b>
          </p>
        </div>
      </div>

      <ToastHost tl={tl} position="bottom-left" />
    </div>
  );
}
