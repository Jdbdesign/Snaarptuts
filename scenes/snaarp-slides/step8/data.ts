import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 8 - Share your presentation. The recording only hovers File > Share (Share with others, Publish to web);
 * the Share dialog is the one from Snaarp Doc, and the Publish to web dialog is ours (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then hover Share",
  others: "Click Share with others",
  type: "Type the email of the person you want to share with",
  added: "They are added with access to your presentation",
  access: "Choose who else can open it. Here, anyone with the link",
  role: "Choose what people with the link can do",
  copy: "Click Copy link to share it",
  done: "Click Done",
  publishOpen: "To put it on the web, open File, then Share",
  publish: "Click Publish to web",
  publishClick: "Click Publish",
  live: "Your presentation is live. Copy the link to share it",
  stop: "You can stop publishing at any time",
  finish: "Click Done",
};

export const TOASTS = { linkCopied: "Link copied" };
