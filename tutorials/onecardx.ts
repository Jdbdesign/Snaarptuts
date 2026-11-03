import { Step1 } from "@/scenes/onecardx/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/onecardx/step1/script";
import { Step2 } from "@/scenes/onecardx/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/onecardx/step2/script";
import { Step3 } from "@/scenes/onecardx/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/onecardx/step3/script";
import { Step4 } from "@/scenes/onecardx/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/onecardx/step4/script";
import { Step5 } from "@/scenes/onecardx/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/onecardx/step5/script";
import { Step6 } from "@/scenes/onecardx/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/onecardx/step6/script";
import { Step7 } from "@/scenes/onecardx/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/onecardx/step7/script";
import { Step8 } from "@/scenes/onecardx/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/onecardx/step8/script";
import { Step9 } from "@/scenes/onecardx/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/onecardx/step9/script";
import { Step10 } from "@/scenes/onecardx/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/onecardx/step10/script";
import { Step11 } from "@/scenes/onecardx/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/onecardx/step11/script";
import { Step12 } from "@/scenes/onecardx/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/onecardx/step12/script";
import { Step13 } from "@/scenes/onecardx/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/onecardx/step13/script";
import { Step14 } from "@/scenes/onecardx/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/onecardx/step14/script";
import { Step15 } from "@/scenes/onecardx/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/onecardx/step15/script";
import { Step16 } from "@/scenes/onecardx/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/onecardx/step16/script";
import { Step17 } from "@/scenes/onecardx/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/onecardx/step17/script";
import { Step18 } from "@/scenes/onecardx/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/onecardx/step18/script";
import { Step19 } from "@/scenes/onecardx/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/onecardx/step19/script";
import { Step20 } from "@/scenes/onecardx/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/onecardx/step20/script";
import { Step21 } from "@/scenes/onecardx/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/onecardx/step21/script";
import { Step22 } from "@/scenes/onecardx/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/onecardx/step22/script";
import { Step23 } from "@/scenes/onecardx/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/onecardx/step23/script";
import { Step24 } from "@/scenes/onecardx/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/onecardx/step24/script";
import { Step25 } from "@/scenes/onecardx/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/onecardx/step25/script";
import { Step26 } from "@/scenes/onecardx/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/onecardx/step26/script";
import { Step27 } from "@/scenes/onecardx/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/onecardx/step27/script";
import { Step28 } from "@/scenes/onecardx/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/onecardx/step28/script";
import { Step29 } from "@/scenes/onecardx/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/onecardx/step29/script";
import { Step30 } from "@/scenes/onecardx/step30/Step30";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/onecardx/step30/script";
import type { Tutorial } from "./types";

export const onecardx: Tutorial = {
  product: {
    id: "onecardx",
    name: "OneCardX",
    railLabel: "One Card X",
    logo: "onecard",
    aliases: ["card", "id", "digital card", "business card", "onecardx"],
  },
  groups: [{ title: "Admin Card Creation", from: "your-onecardx-home" }],
  steps: [
    {
      id: "your-onecardx-home",
      title: "Your OneCardX home",
      url: "onecardx.snaarp.com/home",
      scene: { Component: Step1, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "switch-snaarp-apps",
      title: "Switch Snaarp apps",
      url: "onecardx.snaarp.com/home",
      scene: { Component: Step2, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "open-create-an-organization-card",
      title: "Open Create an Organization Card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step3, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "read-the-card-list",
      title: "Read the card list",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step4, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "start-a-new-organization-card",
      title: "Start a new organization card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step5, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "name-the-card",
      title: "Name the card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step6, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "choose-the-card-type",
      title: "Choose the card type",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step7, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "pick-a-design",
      title: "Pick a design",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step8, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "add-a-profile-photo",
      title: "Add a profile photo",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step9, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "set-colours-and-font",
      title: "Set colours and font",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step10, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "add-your-logo",
      title: "Add your logo",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step11, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "add-a-badge",
      title: "Add a badge",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step12, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "fill-in-the-information",
      title: "Fill in the information",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step13, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "add-contact-fields",
      title: "Add contact fields",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step14, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "save-the-card",
      title: "Save the card",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step15, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
    {
      id: "your-card-is-ready-to-share",
      title: "Your card is ready to share",
      url: "onecardx.snaarp.com/admin/organization-cards/engineering-team",
      scene: { Component: Step16, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "preview-the-public-card",
      title: "Preview the public card",
      url: "onecardx.snaarp.com/admin/organization-cards/engineering-team",
      scene: { Component: Step17, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
    {
      id: "back-to-your-card-list",
      title: "Back to your card list",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step18, run: runStep18, durationMs: STEP18_DURATION_MS },
    },
    {
      id: "limit-who-sees-a-card",
      title: "Limit who sees a card",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step19, run: runStep19, durationMs: STEP19_DURATION_MS },
    },
    {
      id: "pick-specific-people",
      title: "Pick specific people",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step20, run: runStep20, durationMs: STEP20_DURATION_MS },
    },
    {
      id: "preview-the-member-view",
      title: "Preview the member view",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step21, run: runStep21, durationMs: STEP21_DURATION_MS },
    },
    {
      id: "edit-the-design",
      title: "Edit the design",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step22, run: runStep22, durationMs: STEP22_DURATION_MS },
    },
    {
      id: "choose-a-style",
      title: "Choose a style",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step23, run: runStep23, durationMs: STEP23_DURATION_MS },
    },
    {
      id: "colours-logo-and-badge",
      title: "Colours, logo and badge",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step24, run: runStep24, durationMs: STEP24_DURATION_MS },
    },
    {
      id: "fill-in-your-details",
      title: "Fill in your details",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step25, run: runStep25, durationMs: STEP25_DURATION_MS },
    },
    {
      id: "use-each-persons-own-name",
      title: "Use each person's own name",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step26, run: runStep26, durationMs: STEP26_DURATION_MS },
    },
    {
      id: "add-contact-fields-org",
      title: "Add contact fields",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step27, run: runStep27, durationMs: STEP27_DURATION_MS },
    },
    {
      id: "save-the-card-org",
      title: "Save the card",
      url: "onecardx.snaarp.com/admin/organization-cards/editor",
      scene: { Component: Step28, run: runStep28, durationMs: STEP28_DURATION_MS },
    },
    {
      id: "publish-to-everyone",
      title: "Publish to everyone",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step29, run: runStep29, durationMs: STEP29_DURATION_MS },
    },
    {
      id: "see-it-in-id-cards",
      title: "See it in ID Cards",
      url: "onecardx.snaarp.com/admin/organization-cards",
      scene: { Component: Step30, run: runStep30, durationMs: STEP30_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You've created your organization card. Next: how employees use it.",
  },
};
