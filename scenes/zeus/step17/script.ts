import type { Timeline } from "@/lib/timeline";
import {
  beginZeus,
  finishZeus,
  hoverOn,
  pressOn,
  typeIntoVar,
} from "@/components/zeus/zeus-timeline";
import { ZEUS_URLS, type ZeusApiKey } from "@/components/zeus/zeus-data";

export const STEP17_DURATION_MS = 16000;

export async function runStep17(tl: Timeline) {
  beginZeus(tl, ZEUS_URLS.integrations, "integrations", [0.45, 0.35], 17);

  // Seed API Key from Step 16
  const existingKey: ZeusApiKey = {
    id: "key-1",
    name: "Zeus Production",
    keyMasked: "zk_sample_••••••••",
    createdAt: "10/11/2026",
    status: "active",
  };
  tl.setVar("zeusApiKeys", [existingKey]);

  // Beat 1: Click Add Webhook
  await tl.at(400);
  tl.showCaption("Click Add Webhook to set up real-time event alerts.");
  await pressOn(tl, "[data-tl=btn-add-webhook]", { ms: 600 });
  await tl.wait(800);

  // Beat 2: Enter Name & URL
  await tl.at(2500);
  tl.showCaption("Enter your webhook name and endpoint URL.");
  await pressOn(tl, "[data-tl=input-webhook-name]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=input-webhook-name]",
    "zeusNewWebhookName",
    "Acme CRM",
    { msPerChar: 45 }
  );
  await pressOn(tl, "[data-tl=input-webhook-url]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=input-webhook-url]",
    "zeusNewWebhookUrl",
    "https://example.com/webhooks/zeus",
    { msPerChar: 35 }
  );
  await tl.wait(600);

  // Beat 3: Events inspection
  await tl.at(7500);
  tl.showCaption("Select trigger events for new leads and list updates.");
  await hoverOn(tl, "[data-tl=checkbox-webhook-event-revealed]", { ms: 500 });
  await tl.wait(400);
  await hoverOn(tl, "[data-tl=checkbox-webhook-event-list]", { ms: 400 });
  await tl.wait(800);

  // Beat 4: Create Webhook
  await tl.at(10200);
  tl.showCaption("Click Create Webhook to activate your endpoint.");
  await pressOn(tl, "[data-tl=btn-confirm-create-webhook]", { ms: 600 });
  await tl.wait(1600);

  // Beat 5: Live integration confirmation
  await tl.at(13500);
  tl.showCaption("Your integration is live and ready to receive lead updates.");
  await hoverOn(tl, "[data-tl=webhook-row-acme-crm]", { ms: 600 });
  await tl.wait(1200);

  // Finish
  await tl.at(15200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishZeus(tl);
}
