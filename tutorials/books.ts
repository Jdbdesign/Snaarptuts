import type { Tutorial } from "./types";
import { Step1 } from "@/scenes/books/step1/Step1";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/books/step1/script";
import { Step2 } from "@/scenes/books/step2/Step2";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/books/step2/script";
import { Step3 } from "@/scenes/books/step3/Step3";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/books/step3/script";
import { Step4 } from "@/scenes/books/step4/Step4";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/books/step4/script";
import { Step5 } from "@/scenes/books/step5/Step5";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/books/step5/script";
import { Step6 } from "@/scenes/books/step6/Step6";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/books/step6/script";
import { Step7 } from "@/scenes/books/step7/Step7";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/books/step7/script";
import { Step8 } from "@/scenes/books/step8/Step8";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/books/step8/script";
import { Step9 } from "@/scenes/books/step9/Step9";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/books/step9/script";
import { Step10 } from "@/scenes/books/step10/Step10";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/books/step10/script";
import { Step11 } from "@/scenes/books/step11/Step11";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/books/step11/script";
import { Step12 } from "@/scenes/books/step12/Step12";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/books/step12/script";
import { Step13 } from "@/scenes/books/step13/Step13";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/books/step13/script";
import { Step14 } from "@/scenes/books/step14/Step14";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/books/step14/script";
import { Step15 } from "@/scenes/books/step15/Step15";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/books/step15/script";
import { Step16 } from "@/scenes/books/step16/Step16";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/books/step16/script";
import { Step17 } from "@/scenes/books/step17/Step17";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/books/step17/script";
import { Step18 } from "@/scenes/books/step18/Step18";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/books/step18/script";
import { Step19 } from "@/scenes/books/step19/Step19";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/books/step19/script";
import { Step20 } from "@/scenes/books/step20/Step20";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/books/step20/script";
import { Step21 } from "@/scenes/books/step21/Step21";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/books/step21/script";
import { Step22 } from "@/scenes/books/step22/Step22";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/books/step22/script";
import { Step23 } from "@/scenes/books/step23/Step23";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/books/step23/script";
import { Step24 } from "@/scenes/books/step24/Step24";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/books/step24/script";
import { Step25 } from "@/scenes/books/step25/Step25";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/books/step25/script";
import { Step26 } from "@/scenes/books/step26/Step26";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/books/step26/script";
import { Step27 } from "@/scenes/books/step27/Step27";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/books/step27/script";
import { Step28 } from "@/scenes/books/step28/Step28";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/books/step28/script";
import { Step29 } from "@/scenes/books/step29/Step29";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/books/step29/script";
import { Step30 } from "@/scenes/books/step30/Step30";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/books/step30/script";
import { Step31 } from "@/scenes/books/step31/Step31";
import { runStep31, STEP31_DURATION_MS } from "@/scenes/books/step31/script";
import { Step32 } from "@/scenes/books/step32/Step32";
import { runStep32, STEP32_DURATION_MS } from "@/scenes/books/step32/script";
import { Step33 } from "@/scenes/books/step33/Step33";
import { runStep33, STEP33_DURATION_MS } from "@/scenes/books/step33/script";
import { Step34 } from "@/scenes/books/step34/Step34";
import { runStep34, STEP34_DURATION_MS } from "@/scenes/books/step34/script";
import { Step35 } from "@/scenes/books/step35/Step35";
import { runStep35, STEP35_DURATION_MS } from "@/scenes/books/step35/script";
import { Step36 } from "@/scenes/books/step36/Step36";
import { runStep36, STEP36_DURATION_MS } from "@/scenes/books/step36/script";
import { Step37 } from "@/scenes/books/step37/Step37";
import { runStep37, STEP37_DURATION_MS } from "@/scenes/books/step37/script";
import { BOOKS_URLS } from "@/components/books/books-data";

export const books: Tutorial = {
  product: {
    id: "books",
    name: "Snaarp Books",
    railLabel: "Snaarp Books",
    logo: "books",
    aliases: [
      "books",
      "accounting",
      "invoices",
      "bills",
      "products",
      "items",
      "cashflow",
      "inventory",
    ],
  },
  steps: [
    {
      id: "books-find-way-around",
      title: "Books: Find your way around",
      url: BOOKS_URLS.dashboard,
      scene: {
        Component: Step1,
        run: runStep1,
        durationMs: STEP1_DURATION_MS,
      },
    },
    {
      id: "home-receivables-payables",
      title: "Home: Read your receivables and payables",
      url: BOOKS_URLS.dashboard,
      scene: {
        Component: Step2,
        run: runStep2,
        durationMs: STEP2_DURATION_MS,
      },
    },
    {
      id: "home-cashflow-period",
      title: "Home: Check cash flow by period",
      url: BOOKS_URLS.dashboard,
      scene: {
        Component: Step3,
        run: runStep3,
        durationMs: STEP3_DURATION_MS,
      },
    },
    {
      id: "home-watch-key-accounts",
      title: "Home: Watch key accounts (accrual or cash)",
      url: BOOKS_URLS.dashboard,
      scene: {
        Component: Step4,
        run: runStep4,
        durationMs: STEP4_DURATION_MS,
      },
    },
    {
      id: "home-recent-updates",
      title: "Home: See recent updates",
      url: BOOKS_URLS.dashboard,
      scene: {
        Component: Step5,
        run: runStep5,
        durationMs: STEP5_DURATION_MS,
      },
    },
    {
      id: "products-browse-filter",
      title: "Products: Browse and filter your items",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step6,
        run: runStep6,
        durationMs: STEP6_DURATION_MS,
      },
    },
    {
      id: "products-sort-list",
      title: "Products: Sort the item list",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step7,
        run: runStep7,
        durationMs: STEP7_DURATION_MS,
      },
    },
    {
      id: "products-show-hide-columns",
      title: "Products: Show or hide columns",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step8,
        run: runStep8,
        durationMs: STEP8_DURATION_MS,
      },
    },
    {
      id: "products-import-csv",
      title: "Products: Import items from a CSV file",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step9,
        run: runStep9,
        durationMs: STEP9_DURATION_MS,
      },
    },
    {
      id: "products-export-list",
      title: "Products: Export your item list",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step10,
        run: runStep10,
        durationMs: STEP10_DURATION_MS,
      },
    },
    {
      id: "products-refresh-list",
      title: "Products: Refresh the item list",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step11,
        run: runStep11,
        durationMs: STEP11_DURATION_MS,
      },
    },
    {
      id: "products-create-goods",
      title: "Products: Create a new item (goods)",
      url: BOOKS_URLS.newProduct,
      scene: {
        Component: Step12,
        run: runStep12,
        durationMs: STEP12_DURATION_MS,
      },
    },
    {
      id: "products-create-service",
      title: "Products: Create a service item",
      url: BOOKS_URLS.newProduct,
      scene: {
        Component: Step13,
        run: runStep13,
        durationMs: STEP13_DURATION_MS,
      },
    },
    {
      id: "products-open-details",
      title: "Products: Open an item's details",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step14,
        run: runStep14,
        durationMs: STEP14_DURATION_MS,
      },
    },
    {
      id: "products-check-transactions-history",
      title: "Products: Check an item's transactions and history",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step15,
        run: runStep15,
        durationMs: STEP15_DURATION_MS,
      },
    },
    {
      id: "products-edit-item",
      title: "Products: Edit an item",
      url: BOOKS_URLS.edit,
      scene: {
        Component: Step16,
        run: runStep16,
        durationMs: STEP16_DURATION_MS,
      },
    },
    {
      id: "products-clone-item",
      title: "Products: Clone an item",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step17,
        run: runStep17,
        durationMs: STEP17_DURATION_MS,
      },
    },
    {
      id: "products-toggle-active",
      title: "Products: Mark an item inactive and active again",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step18,
        run: runStep18,
        durationMs: STEP18_DURATION_MS,
      },
    },
    {
      id: "products-lock-unlock",
      title: "Products: Lock and unlock an item",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step19,
        run: runStep19,
        durationMs: STEP19_DURATION_MS,
      },
    },
    {
      id: "products-delete-single",
      title: "Products: Delete an item",
      url: BOOKS_URLS.details,
      scene: {
        Component: Step20,
        run: runStep20,
        durationMs: STEP20_DURATION_MS,
      },
    },
    {
      id: "products-select-several",
      title: "Products: Select several items",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step21,
        run: runStep21,
        durationMs: STEP21_DURATION_MS,
      },
    },
    {
      id: "products-delete-several",
      title: "Products: Delete several items at once",
      url: BOOKS_URLS.products,
      scene: {
        Component: Step22,
        run: runStep22,
        durationMs: STEP22_DURATION_MS,
      },
    },
    {
      id: "customers-open-list",
      title: "Customers: Open the customer list",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step23,
        run: runStep23,
        durationMs: STEP23_DURATION_MS,
      },
    },
    {
      id: "customers-search-filter",
      title: "Customers: Search and filter customers",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step24,
        run: runStep24,
        durationMs: STEP24_DURATION_MS,
      },
    },
    {
      id: "customers-add-business",
      title: "Customers: Add a business customer",
      url: BOOKS_URLS.newCustomer,
      scene: {
        Component: Step25,
        run: runStep25,
        durationMs: STEP25_DURATION_MS,
      },
    },
    {
      id: "customers-add-address",
      title: "Customers: Add billing and shipping addresses",
      url: BOOKS_URLS.newCustomer,
      scene: {
        Component: Step26,
        run: runStep26,
        durationMs: STEP26_DURATION_MS,
      },
    },
    {
      id: "customers-add-individual",
      title: "Customers: Add an individual customer with a contact person",
      url: BOOKS_URLS.newCustomer,
      scene: {
        Component: Step27,
        run: runStep27,
        durationMs: STEP27_DURATION_MS,
      },
    },
    {
      id: "customers-import-csv",
      title: "Customers: Import customers from a CSV file",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step28,
        run: runStep28,
        durationMs: STEP28_DURATION_MS,
      },
    },
    {
      id: "customers-view-edit",
      title: "Customers: View and edit a customer's details",
      url: BOOKS_URLS.customerDetails,
      scene: {
        Component: Step29,
        run: runStep29,
        durationMs: STEP29_DURATION_MS,
      },
    },
    {
      id: "customers-deactivate",
      title: "Customers: Deactivate a customer",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step30,
        run: runStep30,
        durationMs: STEP30_DURATION_MS,
      },
    },
    {
      id: "customers-reactivate",
      title: "Customers: Reactivate a customer",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step31,
        run: runStep31,
        durationMs: STEP31_DURATION_MS,
      },
    },
    {
      id: "customers-delete",
      title: "Customers: Delete a customer",
      url: BOOKS_URLS.customers,
      scene: {
        Component: Step32,
        run: runStep32,
        durationMs: STEP32_DURATION_MS,
      },
    },
    {
      id: "quotes-open-list",
      title: "Quotes: open the Quotes list",
      url: BOOKS_URLS.quotes,
      scene: {
        Component: Step33,
        run: runStep33,
        durationMs: STEP33_DURATION_MS,
      },
    },
    {
      id: "quotes-search",
      title: "Quotes: search for a quote",
      url: BOOKS_URLS.quotes,
      scene: {
        Component: Step34,
        run: runStep34,
        durationMs: STEP34_DURATION_MS,
      },
    },
    {
      id: "quotes-filter-status",
      title: "Quotes: filter quotes by status",
      url: BOOKS_URLS.quotes,
      scene: {
        Component: Step35,
        run: runStep35,
        durationMs: STEP35_DURATION_MS,
      },
    },
    {
      id: "quotes-view-details",
      title: "Quotes: open a quote and read its details",
      url: BOOKS_URLS.quoteDetails,
      scene: {
        Component: Step36,
        run: runStep36,
        durationMs: STEP36_DURATION_MS,
      },
    },
    {
      id: "quotes-send-to-customer",
      title: "Quotes: send a quote to a customer",
      url: BOOKS_URLS.quoteDetails,
      scene: {
        Component: Step37,
        run: runStep37,
        durationMs: STEP37_DURATION_MS,
      },
    },
  ],
  groups: [
    { title: "Navigation & Home", from: "books-find-way-around" },
    { title: "Products & Items", from: "products-browse-filter" },
    { title: "Sales & Customers", from: "customers-open-list" },
    { title: "Quotes", from: "quotes-open-list" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now manage your Home dashboard, catalog items, and client accounts in Snaarp Books.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
