import { Step1 } from "@/scenes/lock/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/lock/step1/script";
import { Step2 } from "@/scenes/lock/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/lock/step2/script";
import { Step3 } from "@/scenes/lock/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/lock/step3/script";
import { Step4 } from "@/scenes/lock/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/lock/step4/script";
import { Step5 } from "@/scenes/lock/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/lock/step5/script";
import { Step6 } from "@/scenes/lock/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/lock/step6/script";
import { Step7 } from "@/scenes/lock/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/lock/step7/script";
import { Step8 } from "@/scenes/lock/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/lock/step8/script";
import { Step9 } from "@/scenes/lock/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/lock/step9/script";
import { Step10 } from "@/scenes/lock/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/lock/step10/script";
import { Step11 } from "@/scenes/lock/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/lock/step11/script";

import { LOCK_URLS } from "@/components/lock/lock-data";
import type { Tutorial } from "./types";

export const snaarpLock: Tutorial = {
  product: {
    id: "snaarp-lock",
    name: "Snaarp Lock",
    railLabel: "Snaarp Lock",
    logo: "lock",
    aliases: ["lock", "snaarplock", "password-manager", "vault", "credentials", "passwords"],
  },
  steps: [
    {
      id: "lock-dashboard-tour",
      title: "Find your way around the dashboard",
      url: LOCK_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "lock-manage-devices",
      title: "Manage your connected devices",
      url: LOCK_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "lock-generate-password",
      title: "Generate a password and a passphrase",
      url: LOCK_URLS.dashboard,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "lock-browse-vaults",
      title: "Browse and create vaults",
      url: LOCK_URLS.dashboard,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "lock-add-edit-login",
      title: "Add and edit a login",
      url: LOCK_URLS.vaults,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "lock-add-note-card-identity",
      title: "Add a note, a card and an identity",
      url: LOCK_URLS.personalLock,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "lock-filter-delete-vault",
      title: "Filter your items and delete a vault",
      url: LOCK_URLS.personalLock,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "lock-create-organization",
      title: "Create an organization",
      url: LOCK_URLS.organizations,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "lock-invite-member-role",
      title: "Invite a member and set their role",
      url: LOCK_URLS.orgDetail,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "lock-import-chrome",
      title: "Import passwords from Chrome",
      url: LOCK_URLS.import,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "lock-see-imported-passwords",
      title: "See your imported passwords",
      url: LOCK_URLS.vaults,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Password Manager", from: "lock-dashboard-tour" },
    { title: "Organizations", from: "lock-create-organization" },
    { title: "Import Passwords", from: "lock-import-chrome" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now manage password vaults, generate secure credentials, revoke connected sessions, collaborate with organizations, and import your credentials in Snaarp Lock.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
