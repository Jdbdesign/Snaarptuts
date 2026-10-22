"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { DashboardContent } from "@/scenes/snaarp-360/step3/AdminDashboard";
import type { SceneProps } from "@/tutorials/types";
import { MAIL_STATS } from "./finish-data";
import { SetupCompleted } from "./finish/SetupCompleted";

/** Narrow screens: the card is enlarged so it stays readable once the scene is scaled down. */
const NARROW_ZOOM = 1.8;

export type Step9Screen = "a" | "b";

/*
 * Snaarp Mail step 9: A) "Setup Completed!" inside OnboardingShell, then B) the 360 owner dashboard
 * (AdminLayout + DashboardContent) with the Snaarp Mail values. Scene variables: screen, completed, ticks, count, fade.
 */
export function Step9Finish({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const screen = useTimelineVar<Step9Screen>(tl, "screen", "a");
  const completed = useTimelineVar(tl, "completed", false);
  const count = useTimelineVar(tl, "count", 0);
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        {screen === "a" ? (
          <OnboardingShell active="done" completed={completed}>
            <div style={{ zoom: narrow ? NARROW_ZOOM : 1 }} className="min-h-full">
              <SetupCompleted tl={tl} onGo={() => tl.setVar("go", true)} />
            </div>
          </OnboardingShell>
        ) : (
          <div data-scroller className="relative h-full w-full overflow-hidden">
            <AdminLayout tl={tl} active="dashboard">
              <DashboardContent count={count} stats={MAIL_STATS} />
            </AdminLayout>
          </div>
        )}
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
