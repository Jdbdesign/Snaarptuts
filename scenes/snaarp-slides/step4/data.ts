import { SLIDES_URLS } from "@/components/slides/slides-data";

/*
 * Snaarp Slides, step 4 - Start something new. The recording never opens File > New, so the two submenu labels (Presentation,
 * From template) and what each does come from the owner's brief (see docs/DECISIONS-AND-DEVIATIONS.md).
 */

export const URLS = SLIDES_URLS;

export const CAPTIONS = {
  open: "Click File, then hover New",
  options: "New gives you two choices: Presentation or From template",
  template: "Click From template",
  templateInfo: "This opens the template chooser. Pick a ready-made look",
  cancel: "Click Cancel to close it",
  again: "Now open File, then New, then Presentation",
  blank: "Presentation starts a new, blank deck",
  done: "Your new presentation opens, ready to edit",
};
