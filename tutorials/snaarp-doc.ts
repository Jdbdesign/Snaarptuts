import { Step1Explore } from "@/scenes/snaarp-doc/Step1Explore";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-doc/step1-script";
import { Step2Blank } from "@/scenes/snaarp-doc/Step2Blank";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-doc/step2-script";
import { Step3Tour } from "@/scenes/snaarp-doc/Step3Tour";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-doc/step3-script";
import { Step4Copy } from "@/scenes/snaarp-doc/Step4Copy";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-doc/step4-script";
import type { Tutorial } from "./types";

/**
 * Snaarp Doc: "How to use Snaarp Doc". The step list is PROVISIONAL (more steps will come from later
 * recordings): steps 1 to 8 are built (7 and 8 are added with their steps), the rest show as "Coming soon". To add a step, give it a `scene`
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
    { id: "share", title: "Share your document", url: "docs.snaarp.com/document/untitled-copy" },
    { id: "download-drive", title: "Download and save to Drive", url: "docs.snaarp.com/document/untitled-copy" },
    { id: "rename", title: "Rename your document", url: "docs.snaarp.com/document/untitled-copy" },
    { id: "version-history", title: "Check version history", url: "docs.snaarp.com/document/version-history" },
    { id: "print", title: "Print your document", url: "docs.snaarp.com/document/untitled-copy" },
  ],
  completion: {
    title: "You're all set",
    text: "You now know the basics of Snaarp Doc.",
  },
};
