import { Step1 } from "@/scenes/pdf/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/pdf/step1/script";
import { Step2 } from "@/scenes/pdf/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/pdf/step2/script";
import { Step3 } from "@/scenes/pdf/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/pdf/step3/script";
import { Step4 } from "@/scenes/pdf/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/pdf/step4/script";
import { Step5 } from "@/scenes/pdf/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/pdf/step5/script";
import { Step6 } from "@/scenes/pdf/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/pdf/step6/script";
import { Step7 } from "@/scenes/pdf/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/pdf/step7/script";
import { Step8 } from "@/scenes/pdf/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/pdf/step8/script";
import { Step9 } from "@/scenes/pdf/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/pdf/step9/script";
import { Step10 } from "@/scenes/pdf/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/pdf/step10/script";
import { Step11 } from "@/scenes/pdf/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/pdf/step11/script";
import { Step12 } from "@/scenes/pdf/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/pdf/step12/script";
import type { Tutorial } from "./types";

export const PDF_URLS = {
  dashboard: "https://pdf.snaarp.com/dashboard",
  upload: "https://pdf.snaarp.com/upload",
  editor: "https://pdf.snaarp.com/editor/doc-sample-resume",
};

export const pdf: Tutorial = {
  product: {
    id: "pdf",
    name: "Snaarp PDF",
    logo: "pdf",
    aliases: ["snaarp-pdf", "editor", "files"],
  },
  steps: [
    {
      id: "pdf-meet",
      title: "Meet Snaarp PDF",
      url: PDF_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "pdf-browse-files",
      title: "Browse your files",
      url: PDF_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "pdf-upload-file",
      title: "Upload a file from My files",
      url: PDF_URLS.dashboard,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "pdf-upload-to-edit",
      title: "Upload a PDF to edit",
      url: PDF_URLS.upload,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "pdf-meet-editor",
      title: "Meet the editor",
      url: PDF_URLS.editor,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "pdf-add-edit-text",
      title: "Add and edit text",
      url: PDF_URLS.editor,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "pdf-redact-text",
      title: "Redact sensitive text",
      url: PDF_URLS.editor,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "pdf-highlight-draw",
      title: "Highlight and draw",
      url: PDF_URLS.editor,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "pdf-add-image",
      title: "Add an image",
      url: PDF_URLS.editor,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "pdf-add-shapes",
      title: "Add shapes and marks",
      url: PDF_URLS.editor,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "pdf-sign-document",
      title: "Sign your document",
      url: PDF_URLS.editor,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "pdf-finish-download",
      title: "Finish and download",
      url: PDF_URLS.dashboard,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Overview", from: "pdf-meet" },
    { title: "My files", from: "pdf-browse-files" },
    { title: "Edit a PDF", from: "pdf-meet-editor" },
  ],
  completion: {
    title: "You're all set",
    text: "You can now upload, organize, edit, redact, and sign your PDF documents with Snaarp PDF.",
    replayLabel: "Replay",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
