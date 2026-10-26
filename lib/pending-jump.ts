/**
 * A search result in another product opens that product's page and must land on a given step.
 * The page is a fresh player, so the choice travels in this module-level slot (client side only).
 * It expires after a few seconds so a navigation that never happened cannot jump a later visit.
 */
type Jump = { productId: string; step: number; at: number };

const EXPIRES_MS = 5000;
let pending: Jump | null = null;

export function setPendingJump(productId: string, step: number) {
  pending = { productId, step, at: Date.now() };
}

/** Read without clearing, so a render that runs twice sees the same answer. */
export function peekPendingJump(productId: string): number | null {
  if (!pending || pending.productId !== productId || Date.now() - pending.at > EXPIRES_MS) return null;
  return pending.step;
}

export function clearPendingJump() {
  pending = null;
}
