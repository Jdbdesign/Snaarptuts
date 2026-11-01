import type { Timeline } from "@/lib/timeline";
import {
  beginWorkforce,
  finishWorkforce,
  pressOn,
} from "@/components/workforce/workforce-timeline";
import { CAPTIONS, URLS } from "./data";

export const STEP114_DURATION_MS = 10500;

export async function runStep114(tl: Timeline) {
  beginWorkforce(tl, URLS.trainingCategories, "training-categories", "overview", [0.45, 0.28], true);
  tl.setVar("wfTrainingExpanded", true);
  tl.setVar("wfTrainingSub", "categories");
  tl.setVar("wfCreateCategoryModalOpen", false);
  tl.setVar("wfCategoryNameText", "");

  // 1. Click + Create Category
  await tl.at(500);
  tl.showCaption(CAPTIONS.createCategory);
  await pressOn(tl, "[data-tl=btn-create-category]", { ms: 600 });
  tl.setVar("wfCreateCategoryModalOpen", true);
  await tl.wait(400);

  // 2. Type Category Name
  await tl.at(3200);
  tl.showCaption(CAPTIONS.typeCategoryName);
  await pressOn(tl, "[data-tl=input-category-name]", { ms: 500 });
  await tl.typeText("[data-tl=input-category-name]", "Engineering", {
    varName: "wfCategoryNameText",
    cps: 12,
  });
  await tl.wait(400);

  // 3. Click Save Category
  await tl.at(6800);
  tl.showCaption(CAPTIONS.saveCategory);
  await pressOn(tl, "[data-tl=btn-save-category]", { ms: 600 });
  tl.setVar("wfCreateCategoryModalOpen", false);
  await tl.wait(400);

  // Finish
  await tl.at(9800);
  await finishWorkforce(tl);
}
