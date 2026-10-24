import { Step1Explore } from "@/scenes/snaarp-doc/Step1Explore";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-doc/step1-script";
import { Step2Blank } from "@/scenes/snaarp-doc/Step2Blank";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-doc/step2-script";
import { Step3Tour } from "@/scenes/snaarp-doc/Step3Tour";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-doc/step3-script";
import { Step4Copy } from "@/scenes/snaarp-doc/Step4Copy";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-doc/step4-script";
import { Step5Share } from "@/scenes/snaarp-doc/Step5Share";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-doc/step5-script";
import { Step6Drive } from "@/scenes/snaarp-doc/Step6Drive";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-doc/step6-script";
import { Step7Rename } from "@/scenes/snaarp-doc/Step7Rename";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-doc/step7-script";
import { Step8History } from "@/scenes/snaarp-doc/Step8History";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-doc/step8-script";
import { Step9Print } from "@/scenes/snaarp-doc/Step9Print";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-doc/step9-script";
import { Step10EditMenu } from "@/scenes/snaarp-doc/Step10EditMenu";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-doc/step10-script";
import type { Tutorial } from "./types";

/**
 * Snaarp Doc: "How to use Snaarp Doc". The step list is PROVISIONAL (more steps will come from later
 * recordings): steps 1 to 9 come from Snaarp_Doc_flow.mp4, steps 10 and up from Snaarp_Doc_edit.mp4. To add a step, give it a `scene`
 * ({ Component, run, durationMs }) and add its folder under scenes/snaarp-doc/.
 * Recording: ref/docs/Snaarp_Doc_flow.mp4 (1010x480, 2:15, git-ignored).
 * URL pills are placeholders, except docs.snaarp.com/trash, which was seen in the recording.
 */
export const snaarpDoc: Tutorial = {
  product: { id: "snaarp-doc", name: "Snaarp Doc", logo: "docs" },
  steps: [
    {
      id: "explore",
      title: "Explore Snaarp Doc",
      url: "docs.snaarp.com/documents",
      scene: { Component: Step1Explore, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "create-blank",
      title: "Create a blank document",
      url: "docs.snaarp.com/document/new",
      scene: { Component: Step2Blank, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "editor-file-menu",
      title: "Explore the editor and File menu",
      url: "docs.snaarp.com/document/untitled",
      scene: { Component: Step3Tour, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "make-copy",
      title: "Make a copy",
      url: "docs.snaarp.com/document/untitled",
      scene: { Component: Step4Copy, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "share",
      title: "Share your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step5Share, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "download-drive",
      title: "Download and save to Drive",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step6Drive, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "rename",
      title: "Rename your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step7Rename, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "version-history",
      title: "Check version history",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step8History, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "print",
      title: "Print your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step9Print, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "edit-menu",
      title: "Explore the Edit menu",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step10EditMenu, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know the basics of Snaarp Doc.",
  },
};
