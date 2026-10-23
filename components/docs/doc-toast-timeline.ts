import type { Timeline } from "@/lib/timeline";
import type { DocToastState } from "./DocToast";

/**
 * Show (or change) the DocToast. Calling it again with new text updates the same toast in place, e.g.
 * loading -> success. `ms` hides it after that much active time, so Pause freezes it too.
 */
export function showDocToast(tl: Timeline, text: string, kind: DocToastState["kind"], ms?: number) {
  const id = (tl.getVar<DocToastState | null>("docToast", null)?.id ?? 0) + 1;
  tl.setVar("docToast", { id, text, kind, visible: true } satisfies DocToastState);
  if (ms) {
    tl.wait(ms)
      .then(() => {
        const cur = tl.getVar<DocToastState | null>("docToast", null);
        if (cur?.id === id) tl.setVar("docToast", { ...cur, visible: false });
      })
      .catch(() => {}); // cancelled with the step
  }
}

export function hideDocToast(tl: Timeline) {
  const cur = tl.getVar<DocToastState | null>("docToast", null);
  if (cur) tl.setVar("docToast", { ...cur, visible: false });
}
