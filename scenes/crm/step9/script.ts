import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, pushCrmToast } from "@/components/crm/crm-timeline";

export const STEP9_DURATION_MS = 25500;

export async function runStep9(tl: Timeline) {
  beginCrm(tl, "crm-add-contact", {
    activeNav: "prospects",
    salesOpen: true,
    hasImported: true,
    isAddContactOpen: false,
  });

  // Beat 1: Click Add Prospect
  await tl.at(400);
  tl.showCaption("Click Add Prospect to register a new lead in your pipeline.");
  await pressOn(tl, "[data-tl=crm-add-prospect-btn]", { ms: 650 });
  tl.setVar("crm:isAddContactOpen", true);
  await tl.wait(400);

  // Beat 2: Enter Name
  await tl.at(2800);
  tl.showCaption("Enter first name and last name.");
  await pressOn(tl, "[data-tl=crm-contact-field-fname]", { ms: 500 });
  await tl.typeText("crm_contact_fname", "Casey", { msPerChar: 60 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-contact-field-lname]", { ms: 450 });
  await tl.typeText("crm_contact_lname", "Brown", { msPerChar: 60 });
  await tl.wait(400);

  // Beat 3: Enter Email & Phone
  await tl.at(6500);
  tl.showCaption("Enter business email and phone number.");
  await pressOn(tl, "[data-tl=crm-contact-field-email]", { ms: 500 });
  await tl.typeText("crm_contact_email", "casey.brown@example.com", { msPerChar: 35 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-contact-field-phone]", { ms: 450 });
  await tl.typeText("crm_contact_phone", "+44 7700 900123", { msPerChar: 40 });
  await tl.wait(400);

  // Beat 4: Company & Job Title
  await tl.at(10500);
  tl.showCaption("Enter company name and job title.");
  await pressOn(tl, "[data-tl=crm-contact-field-company]", { ms: 450 });
  await tl.typeText("crm_contact_company", "Acme Studio", { msPerChar: 45 });
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-contact-field-job]", { ms: 450 });
  await tl.typeText("crm_contact_job", "Sales Manager", { msPerChar: 45 });
  await tl.wait(400);

  // Beat 5: Scroll & Click Products Add button
  await tl.at(14200);
  tl.showCaption("Click Add to link products to this contact.");
  await tl.scrollPanelTo("[data-tl=crm-add-contact-body]", 260, 500);
  await tl.wait(200);
  await pressOn(tl, "[data-tl=crm-contact-products-btn]", { ms: 500 });
  tl.setVar("crm:isProductsDropdownOpen", true);
  await tl.wait(300);

  // Beat 6: Select PDF
  await tl.at(17200);
  tl.showCaption("Select PDF from your product catalog.");
  await pressOn(tl, "[data-tl=crm-product-option-pdf]", { ms: 500 });
  tl.setVar("crm:selectedProduct", "PDF");
  tl.setVar("crm:isProductsDropdownOpen", false);
  await tl.wait(400);

  // Beat 7: Enter Notes
  await tl.at(19800);
  tl.showCaption("Add initial notes for the sales team.");
  await pressOn(tl, "[data-tl=crm-contact-field-notes]", { ms: 450 });
  await tl.typeText("crm_contact_notes", "Initial enquiry received. Follow up with product information.", { msPerChar: 30 });
  await tl.wait(500);

  // Beat 8: Click Add Contact
  await tl.at(23000);
  tl.showCaption("Click Add Contact to save the record to your pipeline.");
  await pressOn(tl, "[data-tl=crm-contact-submit-btn]", { ms: 600 });
  tl.setVar("crm:isAddContactOpen", false);
  pushCrmToast(tl, "Contact added successfully");

  await finishCrm(tl);
}
