import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP182_DURATION_MS = 11000;

export async function runStep182(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.chooseJournalTemplate, "choose-journal-template", [0.4, 0.3], 182);

  tl.setVar("booksAccountantExpanded", true);
  tl.setVar("booksTemplates", []);

  await tl.at(400);
  tl.showCaption(CAPTIONS.openNewTemplate);
  await pressOn(tl, "[data-tl=btn-new-template]");
  tl.setVar("booksView", "new-journal-template");
  tl.setUrl(BOOKS_URLS.newJournalTemplate);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickName);
  await pressOn(tl, "[data-tl=input-template-name]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeName);
  await tl.typeText("[data-tl=input-template-name]", "Monthly Accrual");
  tl.setVar("booksNewTemplateName", "Monthly Accrual");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickRef);
  await pressOn(tl, "[data-tl=input-template-ref]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeRef);
  await tl.typeText("[data-tl=input-template-ref]", "9382");
  tl.setVar("booksNewTemplateReference", "9382");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.clickNotes);
  await pressOn(tl, "[data-tl=input-template-notes]");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.typeNotes);
  await tl.typeText("[data-tl=input-template-notes]", "Recurring month-end accrual entry");
  tl.setVar("booksNewTemplateNotes", "Recurring month-end accrual entry");
  await tl.wait(300);

  tl.showCaption(CAPTIONS.selectAccrual);
  await pressOn(tl, "[data-tl=radio-type-accrual]");
  tl.setVar("booksNewTemplateMethod", "Accrual and Cash");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.saveTemplate);
  await pressOn(tl, "[data-tl=btn-save-template]");
  tl.toast("Journal template saved successfully");
  tl.setVar("booksTemplates", [
    {
      id: "tpl-1",
      name: "Monthly Accrual",
      reference: "9382",
      notes: "Recurring month-end accrual entry",
      reportingMethod: "Accrual and Cash",
      journalType: "Accrual and Cash",
      currency: "GBP",
      lines: [],
    },
  ]);
  tl.setVar("booksView", "choose-journal-template");
  tl.setUrl(BOOKS_URLS.chooseJournalTemplate);
  await tl.wait(600);

  await finishBooks(tl, STEP182_DURATION_MS);
}
