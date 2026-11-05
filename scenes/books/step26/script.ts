import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  hoverOn,
  pressOn,
  ring,
} from "@/components/books/books-timeline";
import { BOOKS_URLS } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP26_DURATION_MS = 16000;

export async function runStep26(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newCustomer, "new-customer", [0.45, 0.45]);

  // Seeded Business basics
  tl.setVar("booksNewCustomerType", "business");
  tl.setVar("booksCustSalutation", "Mr.");
  tl.setVar("booksCustFirstName", "Daniel");
  tl.setVar("booksCustLastName", "Green");
  tl.setVar("booksCustCompanyName", "Greenleaf Bakery (Sheffield)");
  tl.setVar("booksCustDisplayName", "Greenleaf Bakery (Sheffield)");
  tl.setVar("booksCustEmail", "sheffield@greenleafbakery.example");
  tl.setVar("booksCustWorkPhoneCode", "+44");
  tl.setVar("booksCustWorkPhone", "114 496 0130");

  // Click Address tab
  await tl.at(400);
  tl.showCaption(CAPTIONS.clickAddressTab);
  await pressOn(tl, "[data-tl=tab-address]");
  tl.setVar("booksNewCustomerTab", "address");
  await tl.wait(500);

  // Billing Attention
  tl.showCaption(CAPTIONS.typeAttention);
  await pressOn(tl, "[data-tl=input-billing-attention]");
  await tl.typeText("[data-tl=input-billing-attention]", "Daniel Green", { msPerChar: 50 });
  tl.setVar("booksBillingAttention", "Daniel Green");
  await tl.wait(300);

  // Country
  tl.showCaption(CAPTIONS.pickCountry);
  await pressOn(tl, "[data-tl=select-billing-country]");
  tl.setVar("booksBillingCountryOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=country-billing-opt-gb]");
  tl.setVar("booksBillingCountry", "GB United Kingdom");
  tl.setVar("booksBillingCountryOpen", false);
  await tl.wait(300);

  // Street Address
  tl.showCaption(CAPTIONS.typeStreet);
  await pressOn(tl, "[data-tl=input-billing-street1]");
  await tl.typeText("[data-tl=input-billing-street1]", "Unit 3, Mill Lane", { msPerChar: 50 });
  tl.setVar("booksBillingStreet1", "Unit 3, Mill Lane");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-billing-street2]");
  await tl.typeText("[data-tl=input-billing-street2]", "Kelham Island", { msPerChar: 50 });
  tl.setVar("booksBillingStreet2", "Kelham Island");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-billing-city]");
  await tl.typeText("[data-tl=input-billing-city]", "Sheffield", { msPerChar: 50 });
  tl.setVar("booksBillingCity", "Sheffield");
  await tl.wait(300);

  // State: Sheffield
  tl.showCaption(CAPTIONS.pickState);
  await pressOn(tl, "[data-tl=select-billing-state]");
  tl.setVar("booksBillingStateOpen", true);
  await tl.wait(300);
  await pressOn(tl, "[data-tl=state-billing-opt-sheffield]");
  tl.setVar("booksBillingState", "Sheffield");
  tl.setVar("booksBillingStateOpen", false);
  await tl.wait(300);

  // Zip Code & Phone
  tl.showCaption(CAPTIONS.typeZipAndPhone);
  await pressOn(tl, "[data-tl=input-billing-zip]");
  await tl.typeText("[data-tl=input-billing-zip]", "S3 8RY", { msPerChar: 60 });
  tl.setVar("booksBillingZip", "S3 8RY");
  await tl.wait(200);

  await pressOn(tl, "[data-tl=input-billing-phone]");
  await tl.typeText("[data-tl=input-billing-phone]", "+44 114 496 0130", { msPerChar: 50 });
  tl.setVar("booksBillingPhone", "+44 114 496 0130");
  await tl.wait(400);

  // Copy billing address
  tl.showCaption(CAPTIONS.copyShipping);
  await pressOn(tl, "[data-tl=btn-copy-billing-address]");
  tl.setVar("booksShippingAttention", "Daniel Green");
  tl.setVar("booksShippingCountry", "GB United Kingdom");
  tl.setVar("booksShippingStreet1", "Unit 3, Mill Lane");
  tl.setVar("booksShippingStreet2", "Kelham Island");
  tl.setVar("booksShippingCity", "Sheffield");
  tl.setVar("booksShippingState", "Sheffield");
  tl.setVar("booksShippingZip", "S3 8RY");
  tl.setVar("booksShippingPhone", "+44 114 496 0130");
  await tl.wait(600);

  // Read Note box
  tl.showCaption(CAPTIONS.readNote);
  await hoverOn(tl, "[data-tl=address-note-box]", { ms: 600 });
  await ring(tl, "[data-tl=address-note-box]", 1600);
  await tl.wait(500);

  // Save
  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-customer]");
  await tl.wait(1000);

  // Verified in Customers List
  tl.showCaption(CAPTIONS.addressComplete);
  await hoverOn(tl, "[data-tl=row-customer-1]", { ms: 600 });
  await ring(tl, "[data-tl=row-customer-1]", 1600);
  await tl.wait(800);

  await finishBooks(tl, STEP26_DURATION_MS);
}
