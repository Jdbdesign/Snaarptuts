"use client";

import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { useNarrow } from "@/lib/useNarrow";
import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { ChooseScreen } from "./domain/ChooseScreen";
import { EnterScreen } from "./domain/EnterScreen";
import { SuccessScreen } from "./domain/SuccessScreen";

/* Snaarp Mail onboarding, Domain item: choose option -> enter domain -> success. The sidebar never re-renders between screens. */

/** Narrow screens: the content is enlarged so it stays readable once the page is scaled down. */
const NARROW_ZOOM = 2;

export function Step4Domain({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const fade = useTimelineVar(tl, "fade", false);
  const screen = useTimelineVar<"a" | "b" | "c">(tl, "screen", "a");
  const narrow = useNarrow();

  return (
    <div className="relative h-full w-full bg-white">
      <div className={`h-full w-full transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}>
        <OnboardingShell active="domain">
          <div key={screen} className="tl-fade-in pb-10" style={{ zoom: narrow ? NARROW_ZOOM : 1 }}>
            {screen === "a" && <ChooseScreen stacked={narrow} />}
            {screen === "b" && <EnterScreen tl={tl} />}
            {screen === "c" && <SuccessScreen />}
          </div>
        </OnboardingShell>
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
