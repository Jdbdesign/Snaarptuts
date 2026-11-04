import { Step1 } from "@/scenes/drive/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/drive/step1/script";
import { Step2 } from "@/scenes/drive/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/drive/step2/script";
import { Step3 } from "@/scenes/drive/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/drive/step3/script";
import { Step4 } from "@/scenes/drive/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/drive/step4/script";
import { Step5 } from "@/scenes/drive/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/drive/step5/script";
import { Step6 } from "@/scenes/drive/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/drive/step6/script";
import { Step7 } from "@/scenes/drive/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/drive/step7/script";
import { Step8 } from "@/scenes/drive/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/drive/step8/script";
import { Step9 } from "@/scenes/drive/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/drive/step9/script";
import { Step10 } from "@/scenes/drive/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/drive/step10/script";
import { Step11 } from "@/scenes/drive/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/drive/step11/script";
import { Step12 } from "@/scenes/drive/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/drive/step12/script";
import { Step13 } from "@/scenes/drive/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/drive/step13/script";
import { Step14 } from "@/scenes/drive/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/drive/step14/script";
import { Step15 } from "@/scenes/drive/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/drive/step15/script";
import { Step16 } from "@/scenes/drive/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/drive/step16/script";
import { Step17 } from "@/scenes/drive/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/drive/step17/script";
import { Step18 } from "@/scenes/drive/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/drive/step18/script";
import { Step19 } from "@/scenes/drive/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/drive/step19/script";
import { Step20 } from "@/scenes/drive/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/drive/step20/script";
import { Step21 } from "@/scenes/drive/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/drive/step21/script";
import { Step22 } from "@/scenes/drive/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/drive/step22/script";
import { Step23 } from "@/scenes/drive/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/drive/step23/script";
import { Step24 } from "@/scenes/drive/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/drive/step24/script";
import { Step25 } from "@/scenes/drive/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/drive/step25/script";
import { Step26 } from "@/scenes/drive/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/drive/step26/script";
import { Step27 } from "@/scenes/drive/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/drive/step27/script";
import { Step28 } from "@/scenes/drive/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/drive/step28/script";
import { Step29 } from "@/scenes/drive/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/drive/step29/script";
import { Step30 } from "@/scenes/drive/step30/Step30";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/drive/step30/script";
import { Step31 } from "@/scenes/drive/step31/Step31";
import { runStep31, STEP31_DURATION_MS } from "@/scenes/drive/step31/script";
import { Step32 } from "@/scenes/drive/step32/Step32";
import { runStep32, STEP32_DURATION_MS } from "@/scenes/drive/step32/script";

import { DRIVE_URLS } from "@/components/drive/drive-data";
import type { Tutorial } from "./types";

export const drive: Tutorial = {
  product: {
    id: "drive",
    name: "Snaarp Drive",
    railLabel: "Snaarp Drive",
    logo: "drive",
    aliases: ["drive", "cloud", "storage", "files", "photos", "documents"],
  },
  steps: [
    {
      id: "drive-home",
      title: "Your Drive home",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "switch-to-photos",
      title: "Switch to Photos",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "photos-moments",
      title: "Moments",
      url: DRIVE_URLS.photos,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "photos-albums",
      title: "Albums",
      url: DRIVE_URLS.photosMoments,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "photos-favorites",
      title: "Favorites in Photos",
      url: DRIVE_URLS.photosAlbums,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "change-photo-layout",
      title: "Change the photo layout",
      url: DRIVE_URLS.photos,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "jump-to-month",
      title: "Jump to a month",
      url: DRIVE_URLS.photos,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "back-to-files",
      title: "Back to Files",
      url: DRIVE_URLS.photos,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "filter-recent-files",
      title: "Filter your recent files",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "create-or-upload",
      title: "Create or upload",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "my-files",
      title: "My Files",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "sort-your-files",
      title: "Sort your files",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "change-the-view",
      title: "Change the view",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "details-panel",
      title: "Open the details panel",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "meetings",
      title: "Meetings",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "photos-from-sidebar",
      title: "Photos from the sidebar",
      url: DRIVE_URLS.meetings,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "shared-files",
      title: "Shared files",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "favorites",
      title: "Favorites",
      url: DRIVE_URLS.shared,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "recycle-bin",
      title: "Recycle Bin",
      url: DRIVE_URLS.favorites,
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "workspaces",
      title: "Workspaces",
      url: DRIVE_URLS.trash,
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "back-to-home",
      title: "Back to Home",
      url: DRIVE_URLS.workspaces,
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "start-new-folder",
      title: "Start a new folder",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
    {
      id: "name-colour-folder",
      title: "Name and colour the folder",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step23,
        run: runStep23,
        durationMs: STEP23_DURATION_MS,
      },
    },
    {
      id: "see-new-folder",
      title: "See your new folder",
      url: DRIVE_URLS.dashboard,
      scene: {
        Component: Step24,
        run: runStep24,
        durationMs: STEP24_DURATION_MS,
      },
    },
    {
      id: "upload-file",
      title: "Upload a file",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step25,
        run: runStep25,
        durationMs: STEP25_DURATION_MS,
      },
    },
    {
      id: "track-upload",
      title: "Track the upload",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step26,
        run: runStep26,
        durationMs: STEP26_DURATION_MS,
      },
    },
    {
      id: "upload-folder",
      title: "Upload a folder",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step27,
        run: runStep27,
        durationMs: STEP27_DURATION_MS,
      },
    },
    {
      id: "open-uploaded-folder",
      title: "Open the uploaded folder",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step28,
        run: runStep28,
        durationMs: STEP28_DURATION_MS,
      },
    },
    {
      id: "create-markdown-document",
      title: "Create a Markdown document",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step29,
        run: runStep29,
        durationMs: STEP29_DURATION_MS,
      },
    },
    {
      id: "edit-save-document",
      title: "Edit and save the document",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step30,
        run: runStep30,
        durationMs: STEP30_DURATION_MS,
      },
    },
    {
      id: "create-text-document",
      title: "Create a text document",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step31,
        run: runStep31,
        durationMs: STEP31_DURATION_MS,
      },
    },
    {
      id: "import-from-other-drives",
      title: "Import from other drives",
      url: DRIVE_URLS.files,
      scene: {
        Component: Step32,
        run: runStep32,
        durationMs: STEP32_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Photos & Media", from: "switch-to-photos" },
    { title: "Files & Storage", from: "back-to-files" },
    { title: "Navigation & Spaces", from: "meetings" },
    { title: "Create & Upload", from: "start-new-folder" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now create and upload files in Snaarp Drive.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
