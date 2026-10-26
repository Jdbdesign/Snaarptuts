import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 9 - Email the presentation. The recording only shows the File > Email submenu rows (Email this file,
 * Email collaborators); both dialogs are ours (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then hover Email",
  thisFile: "Click Email this file",
  to: "Type who the email is for",
  subject: "Add a subject",
  message: "Write a short message",
  attach: "Choose how to attach it: as a PDF or a PowerPoint file",
  send: "Click Send",
  sent: "Your email is on its way",
  collabOpen: "To write to everyone you work with, open File, then Email",
  collab: "Click Email collaborators",
  tick: "Tick the collaborators you want to email",
  collabMessage: "Add a message for them",
  collabSend: "Click Send",
};
