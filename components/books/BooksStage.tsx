"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import { BooksShell } from "./BooksShell";
import { BooksHomeView } from "./BooksHomeView";
import { BooksProductsView } from "./BooksProductsView";
import { BooksNewItemView } from "./BooksNewItemView";
import { BooksItemDetailView } from "./BooksItemDetailView";
import { BooksCustomersView } from "./BooksCustomersView";
import { BooksNewCustomerView } from "./BooksNewCustomerView";
import { BooksCustomerDetailView } from "./BooksCustomerDetailView";
import { BooksQuotesView } from "./BooksQuotesView";
import { BooksNewQuoteView } from "./BooksNewQuoteView";
import { BooksQuoteDetailView } from "./BooksQuoteDetailView";
import { BooksEditQuoteView } from "./BooksEditQuoteView";

type Props = {
  tl: Timeline;
};

export function BooksStage({ tl }: Props) {
  const currentView = useTimelineVar<string>(tl, "booksView", "home");
  const fade = useTimelineVar<boolean>(tl, "fade", false);

  return (
    <BooksShell
      tl={tl}
      overlay={
        fade ? (
          <div
            data-tl="end-fade"
            className="pointer-events-none absolute inset-0 z-50 bg-white"
          />
        ) : null
      }
    >
      {currentView === "home" && <BooksHomeView tl={tl} />}
      {currentView === "products" && <BooksProductsView tl={tl} />}
      {currentView === "new-item" && <BooksNewItemView tl={tl} />}
      {currentView === "item-detail" && <BooksItemDetailView tl={tl} />}
      {currentView === "customers" && <BooksCustomersView tl={tl} />}
      {currentView === "new-customer" && <BooksNewCustomerView tl={tl} />}
      {currentView === "customer-detail" && <BooksCustomerDetailView tl={tl} />}
      {currentView === "quotes" && <BooksQuotesView tl={tl} />}
      {currentView === "new-quote" && <BooksNewQuoteView tl={tl} />}
      {currentView === "quote-detail" && <BooksQuoteDetailView tl={tl} />}
      {currentView === "edit-quote" && <BooksEditQuoteView tl={tl} />}
    </BooksShell>
  );
}
