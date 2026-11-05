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
    },
    {
      id: "products-clone-item",
      title: "Products: Clone an item",
      url: BOOKS_URLS.details,
    },
    {
      id: "products-toggle-active",
      title: "Products: Mark an item inactive and active again",
      url: BOOKS_URLS.details,
    },
    {
      id: "products-lock-unlock",
      title: "Products: Lock and unlock an item",
      url: BOOKS_URLS.details,
    },
    {
      id: "products-delete-single",
      title: "Products: Delete an item",
      url: BOOKS_URLS.details,
    },
    {
      id: "products-select-several",
      title: "Products: Select several items",
      url: BOOKS_URLS.products,
    },
    {
      id: "products-delete-several",
      title: "Products: Delete several items at once",
      url: BOOKS_URLS.products,
    },
  ],
  groups: [
    { title: "Navigation & Home", from: "books-find-way-around" },
    { title: "Products & Items", from: "products-browse-filter" },
  ],
  completion: {
    title: "Tour complete",
    text: "You can now manage your Home dashboard, browse, filter, sort, import, export, and create items in Snaarp Books.",
    replayLabel: "Replay tour",
    backLabel: "Back to Snaarp",
    backHref: "https://snaarp.com",
  },
};
