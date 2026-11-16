import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  hoverOn,
  pressOn,
  pushProjectsToast,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP24_DURATION_MS = 14000;

export async function runStep24(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.integration, "integration", [0.45, 0.35], 24);

  // Beat 1: Review API Docs link
  await tl.at(400);
  tl.showCaption("Review the API Docs for developer specifications.");
  await hoverOn(tl, "[data-tl=integrations-api-docs-btn]", { ms: 600 });
  await tl.wait(800);

  // Beat 2: Click "+ New API Key"
  await tl.at(2500);
  tl.showCaption("Click New API Key to generate a secret key.");
  await pressOn(tl, "[data-tl=integrations-new-api-key-btn]", { ms: 550 });
  tl.setVar("newApiKeyName", "");
  tl.setVar("isApiKeyModalOpen", true);
  await tl.wait(500);

  // Beat 3: Type name
  await tl.at(4800);
  tl.showCaption("Enter the key identifier Production API.");
  await pressOn(tl, "[data-tl=api-key-name-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=api-key-name-input]",
    "newApiKeyName",
    "Production API",
    { msPerChar: 55 }
  );
  await tl.wait(500);

  // Beat 4: Click Generate Key
  await tl.at(7800);
  tl.showCaption("Click Generate Key to issue your secret key.");
  await pressOn(tl, "[data-tl=create-api-key-submit]", { ms: 500 });
  await tl.wait(800);

  // Beat 5: Copy key
  await tl.at(10500);
  tl.showCaption("Copy the API key to your clipboard.");
  await pressOn(tl, "[data-tl=api-key-copy-btn-key-prod-1]", { ms: 500 });
  pushProjectsToast(tl, "Copied", "success");

  await finishProjects(tl, STEP24_DURATION_MS);
}
