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
import { BooksVendorsView } from "./BooksVendorsView";
import { BooksVendorDetailView } from "./BooksVendorDetailView";
import { BooksNewVendorView } from "./BooksNewVendorView";
import { BooksExpensesView } from "./BooksExpensesView";
import { BooksExpenseDetailView } from "./BooksExpenseDetailView";
import { BooksRecordExpenseView } from "./BooksRecordExpenseView";
import { BooksRecurringExpensesView } from "./BooksRecurringExpensesView";
import { BooksNewRecurringExpenseView } from "./BooksNewRecurringExpenseView";
import { BooksRecurringExpenseDetailView } from "./BooksRecurringExpenseDetailView";
import { BooksBillsView } from "./BooksBillsView";
import { BooksNewBillView } from "./BooksNewBillView";
import { BooksBillDetailView } from "./BooksBillDetailView";
import { BooksRecurringBillsView } from "./BooksRecurringBillsView";
import { BooksNewRecurringBillView } from "./BooksNewRecurringBillView";
import { BooksRecurringBillDetailView } from "./BooksRecurringBillDetailView";
import { BooksPaymentsMadeView } from "./BooksPaymentsMadeView";
import { BooksRecordPaymentMadeView } from "./BooksRecordPaymentMadeView";
import { BooksPaymentMadeDetailView } from "./BooksPaymentMadeDetailView";
import { BooksVendorCreditsView } from "./BooksVendorCreditsView";
import { BooksNewVendorCreditView } from "./BooksNewVendorCreditView";
import { BooksVendorCreditDetailView } from "./BooksVendorCreditDetailView";
import { BooksBankAccountsView } from "./BooksBankAccountsView";
import { BooksNewBankAccountView } from "./BooksNewBankAccountView";
import { BooksBankAccountDetailView } from "./BooksBankAccountDetailView";
import { BooksEditBankAccountView } from "./BooksEditBankAccountView";
import { BooksBankTransactionsView } from "./BooksBankTransactionsView";
import { BooksNewBankTransactionView } from "./BooksNewBankTransactionView";
import { BooksBankTransactionDetailView } from "./BooksBankTransactionDetailView";

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
      {currentView === "vendors" && <BooksVendorsView tl={tl} />}
      {currentView === "new-vendor" && <BooksNewVendorView tl={tl} />}
      {currentView === "vendor-details" && <BooksVendorDetailView tl={tl} />}
      {currentView === "expenses" && <BooksExpensesView tl={tl} />}
      {currentView === "new-expense" && <BooksRecordExpenseView tl={tl} />}
      {currentView === "expense-details" && <BooksExpenseDetailView tl={tl} />}
      {currentView === "recurring-expenses" && <BooksRecurringExpensesView tl={tl} />}
      {currentView === "new-recurring-expense" && <BooksNewRecurringExpenseView tl={tl} />}
      {currentView === "recurring-expense-detail" && <BooksRecurringExpenseDetailView tl={tl} />}
      {currentView === "bills" && <BooksBillsView tl={tl} />}
      {currentView === "new-bill" && <BooksNewBillView tl={tl} />}
      {currentView === "bill-detail" && <BooksBillDetailView tl={tl} />}
      {currentView === "recurring-bills" && <BooksRecurringBillsView tl={tl} />}
      {currentView === "new-recurring-bill" && <BooksNewRecurringBillView tl={tl} />}
      {currentView === "recurring-bill-detail" && <BooksRecurringBillDetailView tl={tl} />}
      {currentView === "payments-made" && <BooksPaymentsMadeView tl={tl} />}
      {currentView === "new-payment-made" && <BooksRecordPaymentMadeView tl={tl} />}
      {currentView === "payment-made-detail" && <BooksPaymentMadeDetailView tl={tl} />}
      {currentView === "vendor-credits" && <BooksVendorCreditsView tl={tl} />}
      {currentView === "new-vendor-credit" && <BooksNewVendorCreditView tl={tl} />}
      {currentView === "vendor-credit-detail" && <BooksVendorCreditDetailView tl={tl} />}
      {currentView === "bank-accounts" && <BooksBankAccountsView tl={tl} />}
      {currentView === "new-bank-account" && <BooksNewBankAccountView tl={tl} />}
      {currentView === "bank-account-detail" && <BooksBankAccountDetailView tl={tl} />}
      {currentView === "edit-bank-account" && <BooksEditBankAccountView tl={tl} />}
      {currentView === "bank-transactions" && <BooksBankTransactionsView tl={tl} />}
      {currentView === "new-bank-transaction" && <BooksNewBankTransactionView tl={tl} />}
      {currentView === "bank-transaction-detail" && <BooksBankTransactionDetailView tl={tl} />}
    </BooksShell>
  );
}
