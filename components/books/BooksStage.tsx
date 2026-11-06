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
import { BooksInvoicesView } from "./BooksInvoicesView";
import { BooksNewInvoiceView } from "./BooksNewInvoiceView";
import { BooksInvoiceDetailView } from "./BooksInvoiceDetailView";
import { BooksEditInvoiceView } from "./BooksEditInvoiceView";
import { BooksReceiptsView } from "./BooksReceiptsView";
import { BooksNewReceiptView } from "./BooksNewReceiptView";
import { BooksReceiptDetailView } from "./BooksReceiptDetailView";
import { BooksEditReceiptView } from "./BooksEditReceiptView";
import { BooksRecurringInvoicesView } from "./BooksRecurringInvoicesView";
import { BooksNewRecurringInvoiceView } from "./BooksNewRecurringInvoiceView";
import { BooksRecurringDetailView } from "./BooksRecurringDetailView";
import { BooksEditRecurringInvoiceView } from "./BooksEditRecurringInvoiceView";
import { BooksPaymentsView } from "./BooksPaymentsView";
import { BooksPaymentDetailView } from "./BooksPaymentDetailView";
import { BooksEditPaymentView } from "./BooksEditPaymentView";
import { BooksRecordPaymentView } from "./BooksRecordPaymentView";
import { BooksCreditNotesView } from "./BooksCreditNotesView";
import { BooksCreditNoteDetailView } from "./BooksCreditNoteDetailView";
import { BooksNewCreditNoteView } from "./BooksNewCreditNoteView";

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
      {currentView === "invoices" && <BooksInvoicesView tl={tl} />}
      {currentView === "new-invoice" && <BooksNewInvoiceView tl={tl} />}
      {currentView === "invoice-detail" && <BooksInvoiceDetailView tl={tl} />}
      {currentView === "edit-invoice" && <BooksEditInvoiceView tl={tl} />}
      {currentView === "receipts" && <BooksReceiptsView tl={tl} />}
      {currentView === "new-receipt" && <BooksNewReceiptView tl={tl} />}
      {currentView === "receipt-detail" && <BooksReceiptDetailView tl={tl} />}
      {currentView === "edit-receipt" && <BooksEditReceiptView tl={tl} />}
      {currentView === "recurring" && <BooksRecurringInvoicesView tl={tl} />}
      {currentView === "new-recurring" && <BooksNewRecurringInvoiceView tl={tl} />}
      {currentView === "recurring-detail" && <BooksRecurringDetailView tl={tl} />}
      {currentView === "edit-recurring" && <BooksEditRecurringInvoiceView tl={tl} />}
      {currentView === "payments" && <BooksPaymentsView tl={tl} />}
      {currentView === "payment-details" && <BooksPaymentDetailView tl={tl} />}
      {currentView === "edit-payment" && <BooksEditPaymentView tl={tl} />}
      {currentView === "new-payment" && <BooksRecordPaymentView tl={tl} />}
      {currentView === "credit-notes" && <BooksCreditNotesView tl={tl} />}
      {currentView === "credit-note-details" && <BooksCreditNoteDetailView tl={tl} />}
      {currentView === "new-credit-note" && <BooksNewCreditNoteView tl={tl} />}
    </BooksShell>
  );
}
