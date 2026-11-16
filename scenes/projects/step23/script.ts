import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  pressOn,
  pushProjectsToast,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import {
  PROJECTS_URLS,
  type IntegrationApp,
} from "@/components/projects/projects-data";

export const STEP23_DURATION_MS = 18000;

export async function runStep23(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.automations, "automations", [0.12, 0.48], 23);

  // Beat 1: Click Integration in sidebar
  await tl.at(400);
  tl.showCaption("Click Integration in the sidebar to browse connected third-party tools.");
  await pressOn(tl, "[data-tl=nav-integration]", { ms: 600 });
  tl.setUrl(PROJECTS_URLS.integration);
  tl.setVar("projectsView", "integration");
  await tl.wait(500);

  // Beat 2: Category filter
  await tl.at(2600);
  tl.showCaption("Filter by Communication to see messaging integrations.");
  await pressOn(tl, "[data-tl=app-category-communication]", { ms: 550 });
  tl.setVar("appsActiveCategory", "Communication");
  await tl.wait(800);

  await tl.at(4200);
  await pressOn(tl, "[data-tl=app-category-all]", { ms: 500 });
  tl.setVar("appsActiveCategory", "All");
  await tl.wait(500);

  // Beat 3: Search apps
  await tl.at(5600);
  tl.showCaption("Search apps to find developer tooling.");
  await pressOn(tl, "[data-tl=apps-search-input]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=apps-search-input]", "appsSearchQuery", "git", { msPerChar: 60 });
  await tl.wait(800);
  tl.setVar("appsSearchQuery", "");
  await tl.wait(400);

  // Beat 4: Connect Slack
  await tl.at(8600);
  tl.showCaption("Click Connect on Slack to link your team workspace.");
  await pressOn(tl, "[data-tl=app-connect-btn-app-slack]", { ms: 550 });
  const apps1 = tl.getVar<IntegrationApp[]>("integrationAppsList", []);
  tl.setVar(
    "integrationAppsList",
    apps1.map((a) =>
      a.id === "app-slack"
        ? { ...a, connected: true, lastSynced: "11/16/2026, 5:14:42 PM" }
        : a
    )
  );
  pushProjectsToast(tl, "Slack connected", "success");
  await tl.wait(800);

  // Beat 5: Disconnect Slack
  await tl.at(11600);
  tl.showCaption("Click Disconnect to pause synchronization.");
  await pressOn(tl, "[data-tl=app-connect-btn-app-slack]", { ms: 550 });
  const apps2 = tl.getVar<IntegrationApp[]>("integrationAppsList", []);
  tl.setVar(
    "integrationAppsList",
    apps2.map((a) =>
      a.id === "app-slack" ? { ...a, connected: false, lastSynced: undefined } : a
    )
  );
  pushProjectsToast(tl, "Slack disconnected", "info");
  await tl.wait(800);

  // Beat 6: Reconnect Slack
  await tl.at(14400);
  tl.showCaption("Reconnect Slack to keep notifications active.");
  await pressOn(tl, "[data-tl=app-connect-btn-app-slack]", { ms: 550 });
  const apps3 = tl.getVar<IntegrationApp[]>("integrationAppsList", []);
  tl.setVar(
    "integrationAppsList",
    apps3.map((a) =>
      a.id === "app-slack"
        ? { ...a, connected: true, lastSynced: "11/16/2026, 5:14:42 PM" }
        : a
    )
  );
  pushProjectsToast(tl, "Slack connected", "success");

  await finishProjects(tl, STEP23_DURATION_MS);
}
