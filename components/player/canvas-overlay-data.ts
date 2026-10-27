/** Copy and limits for the canvas overlay (click to pause / play). Components read from here; nothing is hard-coded in them. */
export const CANVAS_OVERLAY = {
  pauseLabel: "Pause tutorial",
  playLabel: "Play tutorial",
  pausedHint: "Paused. Click to play",
  /** Two toggles closer together than this count as one (accidental double-fire). */
  debounceMs: 150,
  /** A press that moves further than this is a drag or swipe, not a click. */
  dragThresholdPx: 8,
  /** How long the play icon stays on screen after resuming. Matches `.player-play-flash` in globals.css. */
  playFlashMs: 400,
} as const;
