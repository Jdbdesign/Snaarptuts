import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, type ContactPerson } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP27_DURATION_MS = 19000;

export async function runStep27(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.customers, "customers", [0.93, 0.16]);

  // Click + New Customer
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickNew);
  await pressOn(tl, "[data-tl=btn-new-customer]");
  tl.setVar("booksView", "new-customer");
  tl.setUrl(BOOKS_URLS.newCustomer);
  await tl.wait(600);

  // Pick Individual
  tl.showCaption(CAPTIONS.pickIndividual);
  await pressOn(tl, "[data-tl=radio-type-individual]");
  tl.setVar("booksNewCustomerType", "individual");
  await tl.wait(500);

  // Primary Contact
  tl.showCaption(CAPTIONS.typePrimaryContact);
  await pressOn(tl, "[data-tl=select-primary-salutation]");
  tl.setVar("booksSalutationOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=opt-salutation-mrs]");
  tl.setVar("booksCustSalutation", "Mrs.");
  tl.setVar("booksSalutationOpen", false);
  await tl.wait(300);

  await pressOn(tl, "[data-tl=input-primary-first-name]");
  await tl.typeText("[data-tl=input-primary-first-name]", "Helen", { msPerChar: 60 });
  tl.setVar("booksCustFirstName", "Helen");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-primary-last-name]");
  await tl.typeText("[data-tl=input-primary-last-name]", "Carter", { msPerChar: 60 });
  tl.setVar("booksCustLastName", "Carter");
  tl.setVar("booksCustDisplayName", "Helen Carter");
  await tl.wait(300);

  // Email & Phone
  tl.showCaption(CAPTIONS.typeEmailAndPhone);
  await pressOn(tl, "[data-tl=input-customer-email]");
  await tl.typeText("[data-tl=input-customer-email]", "helen.carter@example.com", { msPerChar: 40 });
  tl.setVar("booksCustEmail", "helen.carter@example.com");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-work-phone]");
  await tl.typeText("[data-tl=input-work-phone]", "7700 900140", { msPerChar: 50 });
  tl.setVar("booksCustWorkPhone", "7700 900140");
  await tl.wait(400);

  // Address tab
  tl.showCaption(CAPTIONS.addBillingAddress);
  await pressOn(tl, "[data-tl=tab-address]");
  tl.setVar("booksNewCustomerTab", "address");
  tl.setVar("booksBillingAttention", "Helen Carter");
  tl.setVar("booksBillingCountry", "GB United Kingdom");
  tl.setVar("booksBillingStreet1", "5 Park Row");
  tl.setVar("booksBillingCity", "Leeds");
  tl.setVar("booksBillingZip", "LS1 5HD");
  await tl.wait(400);
  await pressOn(tl, "[data-tl=btn-copy-billing-address]");
  tl.setVar("booksShippingAttention", "Helen Carter");
  tl.setVar("booksShippingCountry", "GB United Kingdom");
  tl.setVar("booksShippingStreet1", "5 Park Row");
  tl.setVar("booksShippingCity", "Leeds");
  tl.setVar("booksShippingZip", "LS1 5HD");
  await tl.wait(500);

  // Contact Persons Tab
  tl.showCaption(CAPTIONS.openContactPersons);
  await pressOn(tl, "[data-tl=tab-contact-persons]");
  tl.setVar("booksNewCustomerTab", "contact");
  await tl.wait(500);

  // Fill Row 1 (Jordan Lee)
  tl.showCaption(CAPTIONS.fillFirstContact);
  await pressOn(tl, "[data-tl=contact-first-name-1]");
  await tl.typeText("[data-tl=contact-first-name-1]", "Jordan", { msPerChar: 50 });
  await pressOn(tl, "[data-tl=contact-last-name-1]");
  await tl.typeText("[data-tl=contact-last-name-1]", "Lee", { msPerChar: 50 });
  await pressOn(tl, "[data-tl=contact-email-1]");
  await tl.typeText("[data-tl=contact-email-1]", "jordan.lee@acme.example", { msPerChar: 40 });
  await pressOn(tl, "[data-tl=contact-work-phone-1]");
  await tl.typeText("[data-tl=contact-work-phone-1]", "7700 900141", { msPerChar: 50 });
  await pressOn(tl, "[data-tl=contact-mobile-1]");
  await tl.typeText("[data-tl=contact-mobile-1]", "7700 900142", { msPerChar: 50 });

  const cp1: ContactPerson = {
    id: "cp-1",
    salutation: "Mr.",
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan.lee@acme.example",
    workPhoneCode: "+44",
    workPhone: "7700 900141",
    mobileCode: "+44",
    mobile: "7700 900142",
  };
  tl.setVar("booksCustContactPersons", [cp1]);
  await tl.wait(500);

  // Click + Add Contact Person
  tl.showCaption(CAPTIONS.addSecondContact);
  await pressOn(tl, "[data-tl=btn-add-contact-person]");
  const cp2: ContactPerson = {
    id: "cp-2",
    salutation: "Ms.",
    firstName: "Alex",
    lastName: "Morgan",
    email: "alex.morgan@acme.example",
    workPhoneCode: "+44",
    workPhone: "7700 900145",
    mobileCode: "+44",
    mobile: "",
  };
  tl.setVar("booksCustContactPersons", [cp1, cp2]);
  await tl.wait(600);

  tl.showCaption(CAPTIONS.fillSecondContact);
  await hoverOn(tl, "[data-tl=row-contact-2]", { ms: 500 });
  await ring(tl, "[data-tl=row-contact-2]", 1200);
  await tl.wait(400);

  // Remove second contact person with red x
  tl.showCaption(CAPTIONS.removeSecondContact);
  await pressOn(tl, "[data-tl=btn-remove-contact-2]");
  tl.setVar("booksCustContactPersons", [cp1]);
  await tl.wait(600);

  // Save
  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-customer]");
  await tl.wait(1000);

  // Verified in Customers List
  tl.showCaption(CAPTIONS.contactComplete);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-customer-1]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP27_DURATION_MS);
}
