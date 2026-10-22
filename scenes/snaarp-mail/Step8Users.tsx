"use client";

import { ToastHost } from "@/components/admin/Toast";
import { Icon } from "@/components/icons";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { AddUserModal } from "@/scenes/snaarp-360/step5/AddUserModal";
import type { SceneProps } from "@/tutorials/types";
import { OptionCards } from "./users/OptionCards";
import { TeamTable } from "./users/TeamTable";
import { NEW_USER, PAGE, type TeamUser } from "./users-data";

/* Snaarp Mail onboarding, Users Inbox item: "Add your team members" (login.snaarp.com/onboarding/users) with the 360 Add User modal. */

/** Narrow screens: the card is enlarged so it stays readable once the scene is scaled down. */
const NARROW_ZOOM = 1.8;
const NO_USERS: TeamUser[] = [];

export function Step8Users({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const team = useTimelineVar(tl, "team", NO_USERS);
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <OnboardingShell active="users" overlay={<AddUserModal tl={tl} user={NEW_USER} />}>
          <div className="mx-auto w-[780px] pb-10 pt-[40px]" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
            <section className="rounded-[16px] bg-white px-[24px] pb-[26px] pt-[24px] shadow-[0_10px_44px_-14px_rgba(17,24,39,0.22)]">
              <h1 className="text-[24px] font-bold leading-8 text-[#0A0A0A]">{PAGE.title}</h1>
              <p className="mt-[6px] text-[14px] leading-[22px] text-[#1F2937]">{PAGE.intro}</p>

              <OptionCards stacked={narrow} />

              <div className="mt-[30px] flex items-center gap-3">
                <h2 className="text-[22px] font-bold leading-7 text-[#0A0A0A]">{PAGE.team}</h2>
                <span data-tl="total" className="rounded-[6px] border border-[#E5E7EB] px-[10px] py-[5px] text-[11.5px] leading-4 text-[#1F2937]">
                  {PAGE.total(team.length)}
                </span>
                <span className="ml-auto flex items-center gap-[10px]">
                  <span className="flex h-[37px] items-center gap-2 rounded-[8px] border border-[#E5E7EB] bg-white px-[16px] text-[14px] text-[#0A0A0A]">
                    <Icon name="download" size={16} />
                    {PAGE.export}
                  </span>
                  <button
                    data-tl="btn-add-user"
                    onClick={() => tl.setVar("modal", true)}
                    className="flex h-[37px] items-center gap-2 rounded-[8px] bg-[#0A0A0A] px-[18px] text-[14px] text-white transition-transform duration-150 data-[pressed=true]:scale-[0.97]"
                  >
                    <Icon name="userPlus" size={16} />
                    {PAGE.addUser}
                  </button>
                </span>
              </div>

              <div className="mt-[16px]">
                <TeamTable tl={tl} />
              </div>

              <div className="mt-[40px] flex items-center justify-between">
                <button className="h-[44px] w-[190px] rounded-[8px] border border-[#E5E7EB] bg-white text-[17px] text-[#0A0A0A]">{PAGE.back}</button>
                <button
                  data-tl="btn-continue"
                  className="h-[44px] w-[286px] rounded-[8px] bg-[#0A0A0A] text-[17px] text-white transition-transform duration-150 data-[pressed=true]:scale-[0.98]"
                >
                  {PAGE.continue}
                </button>
              </div>
            </section>
          </div>
        </OnboardingShell>
      </div>
      <ToastHost tl={tl} />
      <div
        className={`pointer-events-none absolute inset-0 z-[60] bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
