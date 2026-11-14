import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP36_DATA } from "./data";

export const STEP36_DURATION_MS = STEP36_DATA.durationMs;

export async function runStep36(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsBranding, "settings-branding", [0.45, 0.35], 36);

  // Beat 1: Display Name
  await tl.at(200);
  tl.showCaption(STEP36_DATA.captions.displayName);
  await pressOn(tl, "[data-tl=me-branding-display-name]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-branding-display-name]", "meBrandingDisplayName", "Jane Doe", { msPerChar: 40 });
  await tl.wait(800);

  // Beat 2: Upload Photo
  await tl.at(3000);
  tl.showCaption(STEP36_DATA.captions.uploadPhoto);
  await pressOn(tl, "[data-tl=me-branding-upload-photo]", { ms: 600 });
  await tl.wait(600);

  // Beat 3: Select Photo & Submit
  await tl.at(5000);
  tl.showCaption(STEP36_DATA.captions.selectPhoto);
  await pressOn(tl, "[data-tl=me-picker-item-1]", { ms: 500 });
  await tl.wait(300);
  await pressOn(tl, "[data-tl=me-image-picker-submit]", { ms: 500 });
  await tl.wait(1000);

  // Beat 4: Colors
  await tl.at(7600);
  tl.showCaption(STEP36_DATA.captions.colors);
  await pressOn(tl, "[data-tl=me-branding-primary-color]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-branding-primary-color]", "meBrandingPrimaryColor", "#7C3AED", { msPerChar: 40 });
  await tl.wait(1000);

  // Beat 5: Button Style
  await tl.at(10800);
  tl.showCaption(STEP36_DATA.captions.buttonStyle);
  await pressOn(tl, "[data-tl=me-branding-style-pill]", { ms: 600 });
  await tl.wait(1200);

  // Beat 6: Welcome Message
  await tl.at(13200);
  tl.showCaption(STEP36_DATA.captions.welcomeMsg);
  await pressOn(tl, "[data-tl=me-branding-welcome-msg]", { ms: 600 });
  await typeIntoVar(
    tl,
    "[data-tl=me-branding-welcome-msg]",
    "meBrandingWelcomeMsg",
    "Welcome! Pick a time that suits you.",
    { msPerChar: 30 }
  );
  await tl.wait(1000);

  // Beat 7: Save Changes
  await tl.at(18200);
  tl.showCaption(STEP36_DATA.captions.saveChanges);
  await pressOn(tl, "[data-tl=me-branding-save-btn]", { ms: 600 });
  await tl.wait(1800);

  // Finish
  await tl.at(21000);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1000);
}
