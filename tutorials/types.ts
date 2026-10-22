import type { ComponentType } from "react";
import type { LogoName } from "@/components/icons";
import type { Timeline } from "@/lib/timeline";

export type SceneProps = { tl: Timeline };

/** A playable scene: the page to draw, plus the script that drives it. */
export type Scene = {
  Component: ComponentType<SceneProps>;
  run: (tl: Timeline) => Promise<void>;
  /** Expected active playing time in ms. Drives the progress line only. */
  durationMs: number;
};

export type Step = {
  id: string;
  title: string;
  /** Plain text shown in the browser URL pill when the step starts (scenes may change it with tl.setUrl). */
  url: string;
  /** Steps without a scene show as "Coming soon" in the rail. */
  scene?: Scene;
};

/** The card shown over the stage when the last step has finished. Every field is optional. */
export type Completion = {
  title?: string;
  text?: string;
  replayLabel?: string;
  backLabel?: string;
  /** Where the "back" link goes. Defaults to https://snaarp.com. */
  backHref?: string;
};

export type Tutorial = {
  product: { id: string; name: string; /** Real logo shown in the rail (a name from PRODUCT_LOGOS). Falls back to the Snaarp mark. */ logo?: LogoName };
  steps: Step[];
  completion?: Completion;
};
