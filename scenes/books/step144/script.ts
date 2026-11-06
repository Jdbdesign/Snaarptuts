import type { Timeline } from "@/lib/timeline";
import {
  beginBooks,
  finishBooks,
  pressOn,
} from "@/components/books/books-timeline";
import { BOOKS_URLS, INITIAL_VENDORS, type VendorItem } from "@/components/books/books-data";
import { CAPTIONS } from "./data";

export const STEP144_DURATION_MS = 6500;

export async function runStep144(tl: Timeline) {
  beginBooks(tl, BOOKS_URLS.newVendor, "new-vendor", [0.45, 0.70]);
  tl.setVar("booksNewVendorSalutation", "Mr.");
  tl.setVar("booksNewVendorFirstName", "Daniel");
  tl.setVar("booksNewVendorLastName", "Brooks");
  tl.setVar("booksNewVendorCompanyName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorDisplayName", "Harbour Logistics Ltd");
  tl.setVar("booksNewVendorEmail", "daniel@example.com");
  tl.setVar("booksNewVendorWorkPhone", "20 7946 0812");
  tl.setVar("booksNewVendorMobile", "7700 900543");
  tl.setVar("booksNewVendorTaxRate", "VAT Standard (20%)");
  tl.setVar("booksNewVendorCompanyId", "HL-2026");
  tl.setVar("booksNewVendorAccountsPayable", "Accounts Payable");
  tl.setVar("booksNewVendorOpeningBalance", "1000");
  tl.setVar("booksNewVendorPaymentTerms", "Net 30");
  tl.setVar("booksNewVendorEnablePortal", true);
  tl.setVar("booksNewVendorCountry", "United Kingdom");
  tl.setVar("booksNewVendorAddress", "10 Acme Street");
  tl.setVar("booksNewVendorCity", "London");
  tl.setVar("booksNewVendorState", "Aberdeen");
  tl.setVar("booksNewVendorZip", "EC1A 1AA");

  await tl.at(400);
  tl.showCaption(CAPTIONS.reviewForm);
  await tl.wait(500);

  tl.showCaption(CAPTIONS.clickSave);
  await pressOn(tl, "[data-tl=btn-save-vendor]");

  const newVendor: VendorItem = {
    id: "vend-harbour",
    name: "Harbour Logistics Ltd",
    companyName: "Harbour Logistics Ltd",
    displayName: "Harbour Logistics Ltd",
    email: "daniel@example.com",
    phone: "+44 20 7946 0812",
    paymentTerms: "Net 30",
    status: "Active",
    salutation: "Mr.",
    firstName: "Daniel",
    lastName: "Brooks",
    workPhone: "20 7946 0812",
    mobile: "7700 900543",
    language: "English",
    taxRate: "VAT Standard (20%)",
    companyId: "HL-2026",
    currency: "GBP- British Pound",
    accountsPayable: "Accounts Payable",
    openingBalance: "1000",
    enablePortal: true,
    country: "United Kingdom",
    address: "10 Acme Street",
    city: "London",
    state: "Aberdeen",
    zipCode: "EC1A 1AA",
    fax: "020 7946 0999",
    taxIdentification: "GB 123 4567 89",
    notes: "Logistics and warehousing partner",
    contactPersons: [],
  };

  const currentVendors = tl.getVar<VendorItem[]>("booksVendors", INITIAL_VENDORS);
  tl.setVar("booksVendors", [newVendor, ...currentVendors.filter(v => v.id !== "vend-harbour")]);
  tl.setVar("booksToastText", "Vendor created successfully");
  tl.setVar("booksToastOpen", true);
  tl.setVar("booksView", "vendors");
  tl.setUrl(BOOKS_URLS.vendors);

  await tl.wait(600);
  tl.showCaption(CAPTIONS.viewInList);
  await pressOn(tl, "[data-tl=vendor-row-harbour]");
  await tl.wait(1000);

  await finishBooks(tl, STEP144_DURATION_MS);
}
