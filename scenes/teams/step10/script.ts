import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP10_DURATION_MS = 12500;

export async function runStep10(tl: Timeline) {
  beginTeams(tl, "teams-switch-theme", {
    activeNav: "chat",
    activeChatId: "acme-product-tech",
    filterTab: "group",
    isDark: false,
  });

  // Beat 1: Hover and click theme button (sun -> moon)
  await tl.at(400);
  tl.showCaption(
    "Click the sun icon in the top bar to switch to dark mode."
  );
  await tl.moveCursorTo("[data-tl=teams-theme-btn]", { ms: 600 });
  await tl.click("[data-tl=teams-theme-btn]");
  tl.setVar("teams:isDark", true);
  await tl.wait(3500);

  // Beat 2: Hover and click theme button (moon -> sun)
  await tl.at(5200);
  tl.showCaption("Click again to switch back to light mode.");
  await tl.moveCursorTo("[data-tl=teams-theme-btn]", { ms: 500 });
  await tl.click("[data-tl=teams-theme-btn]");
  tl.setVar("teams:isDark", false);
  await tl.wait(3000);

  finishTeams(tl);
}
