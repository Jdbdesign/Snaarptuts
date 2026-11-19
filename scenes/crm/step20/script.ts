import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn, pushCrmToast } from "@/components/crm/crm-timeline";
import { INITIAL_DIRECTORY_CONTACTS } from "@/components/crm/crm-data";

export const STEP20_DURATION_MS = 25000;

export async function runStep20(tl: Timeline) {
  beginCrm(tl, "crm-contacts-directory", {
    activeNav: "contacts",
    contactsOpen: true,
    directoryContacts: INITIAL_DIRECTORY_CONTACTS,
  });

  // Beat 1: Directory overview
  await tl.at(400);
  tl.showCaption("Access Contacts to view your customer directory, filter records, and track relationships.");
  await hoverOn(tl, "[data-tl=crm-contacts-table]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Filter by status
  await tl.at(4000);
  tl.showCaption("Filter contacts by lead status to focus on high-intent prospects.");
  await pressOn(tl, "[data-tl=crm-status-filter-btn]", { ms: 600 });
  tl.setVar("crm:isStatusFilterOpen", true);
  await tl.wait(800);
  await hoverOn(tl, "[data-tl=crm-status-option-proposal]", { ms: 500 });
  await tl.wait(1000);
  await pressOn(tl, "[data-tl=crm-status-option-all-statuses]", { ms: 500 });
  tl.setVar("crm:selectedStatusFilter", "All statuses");
  tl.setVar("crm:isStatusFilterOpen", false);
  await tl.wait(800);

  // Beat 3: Add Contact drawer
  await tl.at(10000);
  tl.showCaption("Click + Add Contact to open the new contact creation drawer.");
  await pressOn(tl, "[data-tl=crm-contacts-add-btn]", { ms: 600 });
  tl.setVar("crm:isAddContactDrawerOpen", true);
  await tl.wait(800);
  await hoverOn(tl, "[data-tl=crm-add-contact-drawer]", { ms: 600 });
  await tl.wait(1400);
  await pressOn(tl, "[data-tl=crm-add-contact-drawer-cancel]", { ms: 500 });
  tl.setVar("crm:isAddContactDrawerOpen", false);
  await tl.wait(800);

  // Beat 4: Safe contact deletion on Lisa Park
  await tl.at(16500);
  tl.showCaption("Safely remove an outdated contact record by clicking its delete icon.");
  await hoverOn(tl, "[data-tl=crm-contact-delete-lisa]", { ms: 600 });
  await tl.wait(800);
  await pressOn(tl, "[data-tl=crm-contact-delete-lisa]", { ms: 500 });
  const remainingContacts = INITIAL_DIRECTORY_CONTACTS.filter(c => c.id !== 'contact-lisa');
  tl.setVar("crm:directoryContacts", remainingContacts);
  pushCrmToast(tl, "Contact deleted");
  await tl.wait(1200);

  // Beat 5: Review updated count
  await tl.at(21000);
  tl.showCaption("The contact is immediately removed from your directory and the total count updates.");
  await hoverOn(tl, "[data-tl=crm-contacts-count]", { ms: 500 });
  await tl.wait(1500);

  await finishCrm(tl);
}
