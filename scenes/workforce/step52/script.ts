import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  hoverOn,
  pressOn,
  ring,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP52_DURATION_MS = 11000;

export async function runStep52(tl: Timeline) {
  beginWorkforce(tl, URLS.learningCourse, "learning-course", "overview", [0.75, 0.25]);
  tl.setVar("wfCourseCompleted", true);
  tl.setVar("wfLessonCompleted", true);
  tl.setVar("wfLessonState", "ended");
  tl.setVar("wfLessonSeconds", 180);
  tl.setVar("wfUnreadCount", 2);
  tl.setVar("wfCertificateViewerOpen", false);
  tl.setVar("wfCertificateToast", false);

  // 1. Click Download certificate button
  await tl.at(500);
  tl.showCaption(CAPTIONS.clickDownload);
  await pressOn(tl, "[data-tl=btn-download-certificate]", { ms: 600 });
  tl.setVar("wfCertificateToast", true);
  await tl.wait(250);

  // 2. Ring toast notice
  await tl.at(2000);
  tl.showCaption(CAPTIONS.toastNotice);
  await hoverOn(tl, "[data-tl=toast-certificate-downloaded]", { ms: 500 });
  await ring(tl, "[data-tl=toast-certificate-downloaded]", 1200);

  // Toast fades away before viewer opens
  await tl.at(3600);
  tl.setVar("wfCertificateToast", false);

  // 3. Open certificate document viewer overlay
  await tl.at(4000);
  tl.setVar("wfCertificateViewerOpen", true);
  await tl.wait(250);

  // 4. Ring Certificate card
  await tl.at(5000);
  tl.showCaption(CAPTIONS.viewCertificate);
  await hoverOn(tl, "[data-tl=certificate-card]", { ms: 600 });
  await ring(tl, "[data-tl=certificate-card]", 2400);

  // 5. Click close on viewer
  await tl.at(8000);
  tl.showCaption(CAPTIONS.closeCertificate);
  await pressOn(tl, "[data-tl=doc-viewer-close]", { ms: 500 });
  tl.setVar("wfCertificateViewerOpen", false);
  await tl.wait(250);

  await finishWorkforce(tl, 9800, STEP52_DURATION_MS);
}
