import type { Timeline } from "@/lib/timeline";
import { beginTeams, finishTeams } from "@/components/teams/teams-timeline";

export const STEP20_DURATION_MS = 14500;

export async function runStep20(tl: Timeline) {
  // Step 20 starts on Settings > Profile
  beginTeams(tl, "teams-update-profile", {
    activeNav: "settings",
    settingsTab: "profile",
  });

  // Beat 1: First Name
  await tl.at(400);
  tl.showCaption("Enter your first name.");
  await tl.moveCursorTo("[data-tl=settings-first-name-input]", { ms: 600 });
  await tl.click("[data-tl=settings-first-name-input]");
  await tl.typeText("settings-first-name-input", "Jane");
  await tl.wait(1000);

  // Beat 2: Last Name
  await tl.at(2500);
  tl.showCaption("Enter your last name.");
  await tl.moveCursorTo("[data-tl=settings-last-name-input]", { ms: 450 });
  await tl.click("[data-tl=settings-last-name-input]");
  await tl.typeText("settings-last-name-input", "Doe");
  await tl.wait(1000);

  // Beat 3: Phone number
  await tl.at(4600);
  tl.showCaption("Provide your phone number for call and SMS routing.");
  await tl.moveCursorTo("[data-tl=settings-phone-input]", { ms: 500 });
  await tl.click("[data-tl=settings-phone-input]");
  await tl.typeText("settings-phone-input", "+44 7700 900123");
  await tl.wait(1200);

  // Beat 4: Hover read-only email
  await tl.at(7000);
  tl.showCaption("Email is synchronized with your organization directory.");
  await tl.moveCursorTo("[data-tl=settings-email-input]", { ms: 500 });
  await tl.wait(1400);

  // Beat 5: Click Save Profile
  await tl.at(9200);
  tl.showCaption("Click Save Profile to apply your profile updates.");
  await tl.moveCursorTo("[data-tl=settings-save-profile-btn]", { ms: 500 });
  await tl.click("[data-tl=settings-save-profile-btn]");
  await tl.wait(1800);

  finishTeams(tl);
}
