import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  pressOn,
  hoverOn,
  scrollView,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS } from "@/components/zeus/zeus-data";

export const STEP2_DURATION_MS = 11500;

export async function runStep2(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.people, "people", [0.85, 0.05], 2);

  // Beat 1: Click credits pill in top bar
  await tl.at(400);
  tl.showCaption("Click the credits pill to manage your balance and plan.");
  await pressOn(tl, "[data-tl=zeus-credits-pill]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Review balance & usage
  await tl.at(2500);
  tl.showCaption("Check your balance: 99 remaining of 100 on the Free Plan.");
  await hoverOn(tl, "[data-tl=current-plan-card]", { ms: 550 });
  await tl.wait(1500);

  // Beat 3: Scroll down to How Credits Work
  await tl.at(5200);
  tl.showCaption("See how credits are spent: 1 credit per revealed contact info.");
  await scrollView(tl, "[data-tl=zeus-billing-scroll]", 240, 600);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=zeus-billing-scroll]", { ms: 400 });
  await tl.wait(1400);

  // Beat 4: Explore Available Plans & Basic Upgrade
  await tl.at(7800);
  tl.showCaption("Upgrade anytime to get more monthly credits for outbound leads.");
  await scrollView(tl, "[data-tl=zeus-billing-scroll]", 480, 500);
  await tl.wait(300);
  await hoverOn(tl, "[data-tl=btn-upgrade-basic]", { ms: 600 });
  await tl.wait(1200);

  // Finish
  await tl.at(10800);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
