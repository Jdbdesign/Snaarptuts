import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";

export const STEP24_DURATION_MS = 20000;

export async function runStep24(tl: Timeline) {
  beginCrm(tl, "crm-connect-email", {
    activeNav: "messages",
    channelView: "inbox",
    activeChannelFilter: "all",
    isConnectEmailOpen: false,
  });

  // Beat 1: Click Email icon in toolbar to open Connect Email modal
  await tl.at(400);
  tl.showCaption("Click the Email channel icon in the toolbar to connect your business email account.");
  await pressOn(tl, "[data-tl=crm-channel-filter-email]");
  await tl.wait(1500);

  // Beat 2: Account fields
  await tl.at(4200);
  tl.showCaption("Enter your display name and email address for outbound correspondence.");
  await hoverOn(tl, "[data-tl=crm-email-display-name]", { ms: 500 });
  await tl.wait(1200);
  await hoverOn(tl, "[data-tl=crm-email-address]", { ms: 500 });
  await tl.wait(1500);

  // Beat 3: SMTP & IMAP credentials
  await tl.at(8500);
  tl.showCaption("Configure SMTP and IMAP mail servers, ports, and secure authentication.");
  await hoverOn(tl, "[data-tl=crm-email-smtp-host]", { ms: 500 });
  await tl.wait(1000);
  await hoverOn(tl, "[data-tl=crm-email-imap-host]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-email-show-passwords]");
  await tl.wait(1500);

  // Beat 4: Test Connection
  await tl.at(13500);
  tl.showCaption("Click Test Connection to verify server availability before saving.");
  await pressOn(tl, "[data-tl=crm-email-test-btn]");
  await tl.wait(2000);

  // Beat 5: Cancel modal
  await tl.at(17000);
  tl.showCaption("Click Cancel to exit setup and return to your messages inbox.");
  await pressOn(tl, "[data-tl=crm-email-cancel-btn]");
  await tl.wait(1200);

  await finishCrm(tl);
}
