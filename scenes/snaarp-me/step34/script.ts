import type { Timeline } from "@/lib/timeline";
import {
  beginMe,
  finishMe,
  pressOn,
  typeIntoVar,
} from "@/components/me/me-timeline";
import { ME_URLS } from "@/components/me/me-data";
import { STEP34_DATA } from "./data";

export const STEP34_DURATION_MS = STEP34_DATA.durationMs;

export async function runStep34(tl: Timeline) {
  beginMe(tl, ME_URLS.settingsProfile, "settings-profile", [0.45, 0.35], 34);

  // Beat 1: Full name
  await tl.at(200);
  tl.showCaption(STEP34_DATA.captions.name);
  await pressOn(tl, "[data-tl=me-profile-fullname-input]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-profile-fullname-input]", "meSettingsProfileName", "Jane Doe", { msPerChar: 40 });
  await tl.wait(1000);

  // Beat 2: Timezone
  await tl.at(3000);
  tl.showCaption(STEP34_DATA.captions.timezone);
  await pressOn(tl, "[data-tl=me-profile-use-device-tz]", { ms: 600 });
  await tl.wait(1200);

  // Beat 3: Change Photo
  await tl.at(5200);
  tl.showCaption(STEP34_DATA.captions.changePhoto);
  await pressOn(tl, "[data-tl=me-profile-change-photo]", { ms: 600 });
  await tl.wait(800);

  // Beat 4: Select Photo & Submit
  await tl.at(7000);
  tl.showCaption(STEP34_DATA.captions.selectPhoto);
  await pressOn(tl, "[data-tl=me-picker-item-1]", { ms: 500 });
  await tl.wait(400);
  await pressOn(tl, "[data-tl=me-image-picker-submit]", { ms: 500 });
  await tl.wait(1000);

  // Beat 5: Save Changes
  await tl.at(9800);
  tl.showCaption(STEP34_DATA.captions.saveProfile);
  await pressOn(tl, "[data-tl=me-profile-save-btn]", { ms: 600 });
  await tl.wait(1400);

  // Beat 6: Password fields
  await tl.at(12200);
  tl.showCaption(STEP34_DATA.captions.password);
  await pressOn(tl, "[data-tl=me-profile-curr-pw]", { ms: 600 });
  await typeIntoVar(tl, "[data-tl=me-profile-curr-pw]", "mePasswordCurrent", "CurrentPass123!", { msPerChar: 35 });
  await pressOn(tl, "[data-tl=me-profile-new-pw]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-profile-new-pw]", "mePasswordNew", "NewSecretPass456!", { msPerChar: 35 });
  await pressOn(tl, "[data-tl=me-profile-confirm-pw]", { ms: 500 });
  await typeIntoVar(tl, "[data-tl=me-profile-confirm-pw]", "mePasswordConfirm", "NewSecretPass456!", { msPerChar: 35 });
  await tl.wait(1000);

  // Beat 7: Change Password Button
  await tl.at(18500);
  tl.showCaption(STEP34_DATA.captions.changePassword);
  await pressOn(tl, "[data-tl=me-profile-change-pw-btn]", { ms: 600 });
  await tl.wait(1800);

  // Finish
  await tl.at(21200);
  tl.hideCaption();
  tl.clearHighlight();
  await finishMe(tl, undefined, 1200);
}
