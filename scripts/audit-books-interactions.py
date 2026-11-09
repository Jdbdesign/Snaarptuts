#!/usr/bin/env python3
"""
Audits user interactions across Books steps 135 to 147.
Verifies that every dropdown, radio, checkbox, calendar, text input, or field variable
is visibly opened and clicked/typed by the fake cursor (via pressOn / tl.click)
rather than being silently updated.
"""

import os
import re
import sys

FIELD_VARS = {
    # Vendors
    "booksVendorSearchQuery",
    "booksVendorStatusFilter",
    "booksVendorPaymentTerms",
    "booksVendorNotes",
    "booksNewVendorSalutation",
    "booksNewVendorFirstName",
    "booksNewVendorLastName",
    "booksNewVendorCompanyName",
    "booksNewVendorDisplayName",
    "booksNewVendorEmail",
    "booksNewVendorWorkPhone",
    "booksNewVendorMobile",
    "booksNewVendorTaxRate",
    "booksNewVendorCompanyId",
    "booksNewVendorAccountsPayable",
    "booksNewVendorOpeningBalance",
    "booksNewVendorPaymentTerms",
    "booksNewVendorEnablePortal",
    "booksNewVendorCountry",
    "booksNewVendorAddress",
    "booksNewVendorStreet2",
    "booksNewVendorCity",
    "booksNewVendorState",
    "booksNewVendorZip",
    "booksNewVendorAddressPhone",
    "booksNewVendorFax",
    "booksNewVendorCpSalutation",
    "booksNewVendorCpFirstName",
    "booksNewVendorCpLastName",
    "booksNewVendorCpEmail",
    "booksNewVendorCpWorkPhone",
    "booksNewVendorCpMobile",
    "booksNewVendorCpDesignation",
    # Expenses
    "booksExpenseDate",
    "booksExpenseEmployee",
    "booksExpenseAccount",
    "booksExpenseAmount",
    "booksExpenseAmountIs",
    "booksExpensePaidThrough",
    "booksExpenseTax",
    "booksExpenseVendor",
    "booksExpenseRef",
    "booksExpenseNotes",
    "booksExpenseCustomer",
    "booksExpenseBillable",
    "booksExpenseViewName",
    "booksMileageCalcMethod",
    "booksMileageDistance",
    "booksMileagePaidThrough",
    "booksMileageTax",
    "booksMileageVendor",
    # Recurring Expenses (Part 9)
    "booksRecProfileName",
    "booksRecEmployee",
    "booksRecRepeatEvery",
    "booksRecStartDate",
    "booksRecEndsOn",
    "booksRecNeverExpires",
    "booksRecExpenseAccount",
    "booksRecAmount",
    "booksRecAmountIs",
    "booksRecTax",
    "booksRecPaidThrough",
    "booksRecVendor",
    "booksRecNotes",
    "booksRecCustomerName",
    # Bills (Part 9)
    "booksBillViewMode",
    "booksBillCalendarMonth",
    "booksBillStatusFilter",
    "booksAllBillsView",
    "booksNewBillVendor",
    "booksNewBillNumber",
    "booksNewBillOrderNumber",
    "booksNewBillDate",
    "booksNewBillDueDate",
    "booksNewBillTerms",
    "booksNewBillSubject",
    "booksNewBillNotes",
    "booksNewBillItems",
    "booksBillAttachment",
    # Recurring Bills (Part 10)
    "booksNewRecBillVendor",
    "booksNewRecBillProfileName",
    "booksNewRecBillRepeatEvery",
    "booksNewRecBillStartDate",
    "booksNewRecBillEndsOn",
    "booksNewRecBillNeverExpires",
    "booksNewRecBillAccountsPayable",
    "booksNewRecBillPaymentTerms",
    "booksNewRecBillTaxMode",
    "booksNewRecBillTaxLevel",
    "booksNewRecBillItemName",
    "booksNewRecBillAccount",
    "booksNewRecBillQty",
    "booksNewRecBillRate",
    "booksNewRecBillTax",
    "booksNewRecBillCustomer",
    "booksNewRecBillNotes",
    # Payments Made (Part 10)
    "booksPaymentMadeVendor",
    "booksPaymentMadeAmount",
    "booksPaymentMadePayFull",
    "booksPaymentMadeDate",
    "booksPaymentMadeMode",
    "booksPaymentMadePaidThrough",
    "booksPaymentMadeReference",
    "booksPaymentMadeDeductTds",
    "booksPaymentMadeNotes",
    "booksPaymentMadeAttachedFile",
    # Vendor Credits (Part 10)
    "booksNewVendorCreditVendor",
    "booksNewVendorCreditOrderNumber",
    "booksNewVendorCreditDate",
    "booksNewVendorCreditSubject",
    "booksNewVendorCreditAccountsPayable",
    "booksNewVendorCreditTaxMode",
    "booksNewVendorCreditTaxLevel",
    "booksNewVendorCreditItemName",
    "booksNewVendorCreditAccount",
    "booksNewVendorCreditQty",
    "booksNewVendorCreditRate",
    "booksNewVendorCreditTax",
    "booksNewVendorCreditDiscount",
    "booksNewVendorCreditNotes",
    # Banking (Part 11)
    "booksBankAccountsSearch",
    "booksBankAccountsStatusFilter",
    "booksBankAccountsTypeFilter",
    "booksNewAccountName",
    "booksNewAccountBankName",
    "booksNewAccountNumber",
    "booksNewAccountRoutingCode",
    "booksNewAccountType",
    "booksNewAccountCurrency",
    "booksNewAccountOpeningBalance",
    "booksNewAccountChartOfAccount",
    "booksNewAccountDescription",
    "booksEditAccountDescription",
    "booksTransactionsSearch",
    "booksTransactionsAccountFilter",
    "booksTransactionsTypeFilter",
    "booksCategorizeSearch",
    "booksImportAccount",
    "booksNewTxBankAccount",
    "booksNewTxType",
    "booksNewTxDate",
    "booksNewTxAmount",
    "booksNewTxPayee",
    "booksNewTxReference",
    "booksNewTxDescription",
    "booksNewTxCategoryAccount",
    "booksNewTxNotes",
    # Accountant (Part 12)
    "booksJournalsSearch",
    "booksJournalsView",
    "booksReverseDate",
    "booksPublishOnReverseDate",
    "booksNewTemplateName",
    "booksNewTemplateReference",
    "booksNewTemplateNotes",
    "booksNewTemplateMethod",
    "booksCoaView",
    "booksCoaSearch",
    "booksNewAccountType",
    "booksNewAccountName",
    "booksNewAccountIsSub",
    "booksNewAccountParent",
    "booksNewAccountCode",
    "booksNewAccountDescription",
    "booksEditAccountName",
    "booksEditAccountDesc",
    "booksNewBudgetName",
    "booksNewBudgetYear",
    "booksNewBudgetPeriod",
    "booksNewBudgetIncludeBalanceSheet",
    "booksConfigAccountsSearch",
    # Filing & Compliance (Part 14)
    "booksVatRegNumber",
    "booksVatHmrcRef",
    "booksSaTaxYear",
    "booksSaHmrcRef",
    "booksMtdNiNumber",
    "booksMtdHmrcId",
    # Reports (Part 15)
    "booksReportsSearch",
    "booksPnlCustomFrom",
    "booksPnlCustomTo",
    "booksSalesFromDate",
    "booksSalesToDate",
    "booksCustBalFromDate",
    "booksCustBalToDate",
    "booksTaxFromDate",
    "booksTaxToDate",
    "booksFxFromDate",
    "booksFxToDate",
    "booksTbAsOfDate",
    "booksBsAsOfDate",
}

LOOKBACK_LINES = 12

def audit_step(step_num: int):
    path = f"scenes/books/step{step_num}/script.ts"
    if not os.path.exists(path):
        return [f"File not found: {path}"]

    errors = []
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for idx, raw_line in enumerate(lines):
        line = raw_line.strip()

        # Check for typeIntoVar
        is_type = "typeIntoVar(" in line
        # Check for tl.setVar on a field variable
        is_field_setvar = False
        matched_var = None
        m = re.search(r'tl\.setVar\(["\']([^"\']+)["\']', line)
        if m:
            var_name = m.group(1)
            if var_name in FIELD_VARS:
                is_field_setvar = True
                matched_var = var_name

        if is_type or is_field_setvar:
            start = max(0, idx - LOOKBACK_LINES)
            preceding = "".join(lines[start:idx])
            has_interaction = "pressOn(" in preceding or "click(" in preceding

            if not has_interaction:
                target = matched_var if is_field_setvar else "typeIntoVar"
                errors.append(
                    f"{path}:{idx+1} Silent fill detected on field '{target}': "
                    f"no pressOn or tl.click within preceding {LOOKBACK_LINES} lines."
                )

    return errors

def main():
    all_errors = []
    for step_num in range(135, 206):
        errs = audit_step(step_num)
        all_errors.extend(errs)

    if all_errors:
        print("interaction audit: FAILED")
        for err in all_errors:
            print(f"  ERROR: {err}")
        sys.exit(1)
    else:
        print("interaction audit: OK")

if __name__ == "__main__":
    main()
