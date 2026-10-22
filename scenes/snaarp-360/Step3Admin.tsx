"use client";

import { useTimelineVar } from "@/lib/useTimelineVar";
import type { SceneProps } from "@/tutorials/types";
import { AdminDashboard } from "./step3/AdminDashboard";
import { AdminSignIn } from "./step3/AdminSignIn";
import { LoadingScreen } from "./step3/LoadingScreen";
import { ProductsHome } from "./step3/ProductsHome";

export type Step3Screen = "A" | "B" | "C" | "D";

/** Step 3 — Sign in to Admin: four screens played back to back inside one frame. */
export function Step3Admin({ tl }: SceneProps) {
  const intro = useTimelineVar(tl, "intro", 0);
  const screen = useTimelineVar<Step3Screen>(tl, "screen", "A");
  const fade = useTimelineVar(tl, "fade", false);

  return (
    <div
      className={`relative h-full w-full bg-white transition-opacity duration-700 ${intro >= 1 ? "opacity-100" : "opacity-0"}`}
    >
      <div data-scroller className="relative h-full w-full overflow-hidden">
        {screen === "A" && <ProductsHome tl={tl} />}
        {screen === "B" && <LoadingScreen />}
        {screen === "C" && <AdminSignIn tl={tl} />}
        {screen === "D" && <AdminDashboard tl={tl} />}
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-40 bg-white transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
