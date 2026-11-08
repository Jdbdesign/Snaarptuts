import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP190_DURATION_MS = 12500;

export async function runStep190(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.auditLogs, "audit-logs", [0.4, 0.3], 190);

  tl.setVar("booksAccountantExpanded", true);
  tl.setVar("booksAuditFilterAction", "All Actions");
  tl.setVar("booksAuditFilterEntity", "All Entities");
  tl.setVar("booksAuditActionDropdownOpen", false);
  tl.setVar("booksAuditEntityDropdownOpen", false);
  tl.setVar("booksAuditLoading", false);
  tl.setVar("booksAuditPage", 1);

  await tl.at(400);
  tl.showCaption(CAPTIONS.viewAuditLogs);
  await ring(tl, "[data-tl=select-filter-action]", 900);
  await tl.wait(200);

  tl.showCaption(CAPTIONS.filterAction);
  await pressOn(tl, "[data-tl=select-filter-action]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=option-action-delete]");
  tl.setVar("booksAuditLoading", true);
  await tl.wait(350);
  tl.setVar("booksAuditLoading", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.filterEntity);
  await pressOn(tl, "[data-tl=select-filter-entity]");
  await tl.wait(300);
  await pressOn(tl, "[data-tl=option-entity-invoice]");
  tl.setVar("booksAuditLoading", true);
  await tl.wait(350);
  tl.setVar("booksAuditLoading", false);
  await tl.wait(400);

  tl.showCaption(CAPTIONS.resetFilters);
  await pressOn(tl, "[data-tl=select-filter-action]");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=option-action-all]");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=select-filter-entity]");
  await tl.wait(250);
  await pressOn(tl, "[data-tl=option-entity-all]");
  await tl.wait(400);

  tl.showCaption(CAPTIONS.paginate);
  await pressOn(tl, "[data-tl=btn-audit-next]");
  await tl.wait(500);
  await pressOn(tl, "[data-tl=btn-audit-prev]");
  await tl.wait(600);

  await finishBooks(tl, STEP190_DURATION_MS);
}
