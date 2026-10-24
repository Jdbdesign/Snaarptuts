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
import { Step11CopyPaste } from "@/scenes/snaarp-doc/Step11CopyPaste";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-doc/step11-script";
import { Step12Undo } from "@/scenes/snaarp-doc/Step12Undo";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-doc/step12-script";
import { Step13FindReplace } from "@/scenes/snaarp-doc/Step13FindReplace";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/snaarp-doc/step13-script";
import { Step14Mode } from "@/scenes/snaarp-doc/Step14Mode";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/snaarp-doc/step14-script";
import { Step15AddComment } from "@/scenes/snaarp-doc/Step15AddComment";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/snaarp-doc/step15-script";
import { Step16ManageComments } from "@/scenes/snaarp-doc/Step16ManageComments";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/snaarp-doc/step16-script";
import { Step17Outline } from "@/scenes/snaarp-doc/Step17Outline";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/snaarp-doc/step17-script";
import type { Tutorial } from "./types";

/**
 * Snaarp Doc: "How to use Snaarp Doc". The step list is PROVISIONAL (more steps will come from later
 * recordings): steps 1 to 9 come from Snaarp_Doc_flow.mp4, steps 10 to 13 from Snaarp_Doc_edit.mp4, steps 14 and up from Snaarp_Doc_view.mp4. To add a step, give it a `scene`
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
    {
      id: "copy-paste",
      title: "Copy and paste text",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step11CopyPaste, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "select-delete-undo",
      title: "Select all, delete and undo",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step12Undo, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "find-replace",
      title: "Find and replace",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step13FindReplace, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "editing-mode",
      title: "Change the editing mode",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step14Mode, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "comments-add",
      title: "Open Comments and add a comment",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step15AddComment, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
    {
      id: "comments-manage",
      title: "Manage comments",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step16ManageComments, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "document-outline",
      title: "Use the Document outline",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step17Outline, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know the basics of Snaarp Doc.",
  },
};
