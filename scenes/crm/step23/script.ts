import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP23_DURATION_MS = 24000;

export async function runStep23(tl: Timeline) {
  beginCrm(tl, "crm-messages-channels", {
    activeNav: "messages",
    channelView: "inbox",
    activeChannelFilter: "all",
  });

  // Beat 1: Overview & Chat inspect
  await tl.at(400);
  tl.showCaption("Navigate to Messages to view incoming customer communications in a unified inbox.");
  await hoverOn(tl, "[data-tl=crm-conv-list]", { ms: 600 });
  await tl.wait(1500);
  await pressOn(tl, "[data-tl=crm-conv-item-conv-whatsapp]");
  tl.highlight("[data-tl=crm-messages-chat-thread]");
  await tl.wait(2500);
  tl.clearHighlight();

  // Beat 2: Facebook channel setup
  await tl.at(5800);
  tl.showCaption("Click Facebook to explore social messaging channel integration setup.");
  await pressOn(tl, "[data-tl=crm-channel-filter-facebook]");
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-fb-setup-steps]", { ms: 600 });
  await tl.wait(1500);
  await pressOn(tl, "[data-tl=crm-fb-manual-toggle]");
  await tl.wait(2000);

  // Beat 3: Instagram channel setup
  await tl.at(12200);
  tl.showCaption("Click Instagram to view Instagram Direct Messaging connection options.");
  await pressOn(tl, "[data-tl=crm-channel-filter-instagram]");
  await tl.wait(1500);
  await hoverOn(tl, "[data-tl=crm-ig-setup-steps]", { ms: 600 });
  await tl.wait(2000);

  // Beat 4: WhatsApp and Telegram channel setups
  await tl.at(16800);
  tl.showCaption("Review WhatsApp and Telegram integration guides in inactive setup states.");
  await pressOn(tl, "[data-tl=crm-channel-filter-whatsapp-setup]");
  await tl.wait(1500);
  await pressOn(tl, "[data-tl=crm-channel-filter-telegram]");
  await tl.wait(2000);

  // Beat 5: Return to inbox
  await tl.at(21200);
  tl.showCaption("Click All to return to your active unified messaging inbox.");
  await pressOn(tl, "[data-tl=crm-channel-filter-all]");
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=crm-message-composer-input]", { ms: 500 });
  await tl.wait(1000);

  await finishCrm(tl);
}
