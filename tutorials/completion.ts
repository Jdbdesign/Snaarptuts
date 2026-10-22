import type { Completion, Tutorial } from "./types";

/** The completion card text for a tutorial: its own `completion` config over sensible defaults. */
export function resolveCompletion(tutorial: Tutorial): Required<Completion> {
  return {
    title: "You're all set",
    text: `${tutorial.product.name} is ready.`,
    replayLabel: "Replay tutorial",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
    ...tutorial.completion,
  };
}
