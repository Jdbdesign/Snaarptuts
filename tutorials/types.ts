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

/** A named run of steps (for example a menu). It starts at the step with id `from` and lasts until the next group. */
export type StepGroup = { title: string; from: string };

export type Tutorial = {
  product: {
    id: string;
    name: string;
    /** Label for the rail's product dropdown and its trigger, when it differs from `name` (for example "Sign in to Snaarp 360"). Everywhere else `name` is used. */
    railLabel?: string;
    /** Real logo shown in the rail (a name from PRODUCT_LOGOS). Falls back to the Snaarp mark. */
    logo?: LogoName;
    /** Other words people may type to find this product in the rail search (for example "email" for Snaarp Mail). */
    aliases?: string[];
  };
  steps: Step[];
  /** Optional step groups. The rail search matches on a group's name and shows it under each of its steps. */
  groups?: StepGroup[];
  completion?: Completion;
};
