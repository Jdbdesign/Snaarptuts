"use client";

import type { Timeline } from "@/lib/timeline";
import { useTimelineVar } from "@/lib/useTimelineVar";
import {
  ArrowLeft,
  ChevronDown,
  Home,
  ImageIcon,
  X,
} from "lucide-react";
import {
  type BookItem,
  EXPENSE_ACCOUNTS,
  INCOME_ACCOUNTS,
  TAX_RATES,
  UNITS_LIST,
  VENDORS_LIST,
} from "./books-data";

type Props = {
  tl: Timeline;
};

export function BooksNewItemView({ tl }: Props) {
  const editingItem = useTimelineVar<BookItem | null>(
    tl,
    "booksEditingItem",
    null
  );
  const isEdit = !!editingItem;

  // Form field state from timeline variables
  const name = useTimelineVar<string>(
    tl,
    "booksFormName",
    editingItem ? editingItem.name : ""
  );
  const itemType = useTimelineVar<"goods" | "service">(
    tl,
    "booksFormType",
    editingItem ? editingItem.type : "goods"
  );
  const unit = useTimelineVar<string>(
    tl,
    "booksFormUnit",
    editingItem ? editingItem.usageUnit : ""
  );
  const sellingPrice = useTimelineVar<string>(
    tl,
    "booksFormSellingPrice",
    editingItem ? editingItem.sellingPrice.toString() : ""
  );
  const salesAccount = useTimelineVar<string>(
    tl,
    "booksFormSalesAccount",
    editingItem ? editingItem.salesAccount : ""
  );
  const salesDesc = useTimelineVar<string>(
    tl,
    "booksFormSalesDesc",
    editingItem ? editingItem.description : ""
  );
  const salesTax = useTimelineVar<string>(
    tl,
    "booksFormSalesTax",
    editingItem ? editingItem.tax : "VAT Standard (20%)"
  );

  const costPrice = useTimelineVar<string>(
    tl,
    "booksFormCostPrice",
    editingItem ? editingItem.costPrice.toString() : ""
  );
  const purchaseAccount = useTimelineVar<string>(
    tl,
    "booksFormPurchaseAccount",
    editingItem ? editingItem.purchaseAccount : ""
  );
  const purchaseDesc = useTimelineVar<string>(
    tl,
    "booksFormPurchaseDesc",
    editingItem ? editingItem.purchaseDescription : ""
  );
  const purchaseTax = useTimelineVar<string>(
    tl,
    "booksFormPurchaseTax",
    editingItem ? editingItem.tax : "VAT Standard (20%)"
  );
  const vendor = useTimelineVar<string>(
    tl,
    "booksFormVendor",
    editingItem?.vendor || ""
  );

  // Dropdown menus visibility
  const isUnitOpen = useTimelineVar<boolean>(tl, "booksFormUnitOpen", false);
  const isSalesAccountOpen = useTimelineVar<boolean>(
    tl,
    "booksFormSalesAccountOpen",
    false
  );
  const isPurchaseAccountOpen = useTimelineVar<boolean>(
    tl,
    "booksFormPurchaseAccountOpen",
    false
  );
  const isVendorOpen = useTimelineVar<boolean>(
    tl,
    "booksFormVendorOpen",
    false
  );

  // Selected image
  const img1 = useTimelineVar<string | null>(tl, "booksSelectedImage", null);
  const img2 = useTimelineVar<string | null>(tl, "booksFormImage", null);
  const selectedImage = img1 || img2;

  // Validation error state
  const purchaseAccountError = useTimelineVar<boolean>(
    tl,
    "booksPurchaseAccountError",
    false
  );

  // Saving spinner / state
  const isSaving = useTimelineVar<boolean>(tl, "booksSavingItem", false);

  const handleSave = () => {
    // If purchase account is empty, show validation error
    if (!purchaseAccount) {
      tl.setVar("booksPurchaseAccountError", true);
      return;
    }

    tl.setVar("booksPurchaseAccountError", false);
    tl.setVar("booksSavingItem", true);

    setTimeout(() => {
      tl.setVar("booksSavingItem", false);
      if (isEdit && editingItem) {
        // Update existing item
        const updated: BookItem = {
          ...editingItem,
          name: name || editingItem.name,
          type: itemType,
          usageUnit: unit || editingItem.usageUnit,
          sellingPrice: parseFloat(sellingPrice) || editingItem.sellingPrice,
          rate: parseFloat(sellingPrice) || editingItem.rate,
          salesAccount: salesAccount || editingItem.salesAccount,
          description: salesDesc || editingItem.description,
          costPrice: parseFloat(costPrice) || editingItem.costPrice,
          purchaseRate: parseFloat(costPrice) || editingItem.purchaseRate,
          purchaseAccount: purchaseAccount || editingItem.purchaseAccount,
          purchaseDescription: purchaseDesc || editingItem.purchaseDescription,
          tax: salesTax,
          vendor: vendor || editingItem.vendor,
        };
        tl.setVar("booksCurrentItem", updated);
        tl.setVar("booksView", "item-detail");
        tl.setVar("booksToastMessage", "Item updated successfully.");
        tl.setVar("booksToastOpen", true);
      } else {
        // New item created
        const isFoodFarm = (name || "").toLowerCase().includes("food farm");
        const isConsulting = (name || "").toLowerCase().includes("consulting");
        const newItem: BookItem = {
          id: isFoodFarm ? "food-farm-1" : isConsulting ? "consulting-1" : `item-${Date.now()}`,
          name: name || (isFoodFarm ? "Food Farm" : isConsulting ? "Business Setup Consulting" : "New Item"),
          type: itemType,
          usageUnit: unit || (isConsulting ? "hr" : "kg"),
          sellingPrice: parseFloat(sellingPrice) || (isConsulting ? 120 : 200),
          rate: parseFloat(sellingPrice) || (isConsulting ? 120 : 200),
          salesAccount: salesAccount || (isConsulting ? "4001 — Service Income" : "4000 — Sales"),
          description: salesDesc || (isConsulting ? "Comprehensive business setup consulting" : "Farm food for local industries"),
          costPrice: parseFloat(costPrice) || (isConsulting ? 60 : 200),
          purchaseRate: parseFloat(costPrice) || (isConsulting ? 60 : 200),
          purchaseAccount: purchaseAccount || (isConsulting ? "5004 — Consultant Expense" : "5000 — Cost of Goods Sold"),
          purchaseDescription: purchaseDesc || (isConsulting ? "Professional business setup advisory" : "Price of items"),
          tax: salesTax || "VAT Standard (20%)",
          vendor: vendor || (isConsulting ? "Harvest Wholesale Ltd" : "Green Fields Supplies Ltd"),
          status: "active",
          createdAt: new Date().toISOString(),
        };

        const existing = tl.getVar<BookItem[]>("booksItems", []);
        tl.setVar("booksItems", [newItem, ...existing.filter((x) => x.id !== newItem.id)]);
        tl.setVar("booksCurrentItem", newItem);
        tl.setVar("booksView", "products");
        tl.setVar("booksToastMessage", "Item created successfully.");
        tl.setVar("booksToastOpen", true);
      }
    }, 400);
  };

  const handleCancel = () => {
    if (isEdit) {
      tl.setVar("booksView", "item-detail");
    } else {
      tl.setVar("booksView", "products");
    }
  };

  return (
    <div
      data-tl="books-new-item-view"
      className="flex-1 flex flex-col bg-white overflow-y-auto relative"
    >
      {/* Top breadcrumb bar */}
      <div className="flex items-center justify-between px-8 py-3.5 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <button
            data-tl="breadcrumb-back"
            onClick={handleCancel}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">›</span>
            <button
              onClick={() => tl.setVar("booksView", "products")}
              className="text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Products
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">
              {isEdit ? "Edit" : "New"}
            </span>
          </div>
        </div>

        <button
          data-tl="btn-close-form"
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main form container */}
      <div className="max-w-4xl px-8 py-6 space-y-6">
        <h1
          data-tl="form-title"
          className="text-xl font-bold text-gray-900"
        >
          {isEdit ? "Edit Item" : "New Item"}
        </h1>

        {/* Top block: Name, Type, Unit + Image box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                <span className="text-red-500 font-bold mr-0.5">*</span> Name
              </label>
              <input
                data-tl="input-item-name"
                type="text"
                value={name}
                onChange={(e) => tl.setVar("booksFormName", e.target.value)}
                placeholder="Enter item name"
                className="w-full max-w-md px-3 py-1.5 text-xs text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Type
              </label>
              <div className="flex items-center gap-5 pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                  <input
                    data-tl="radio-type-goods"
                    type="radio"
                    name="itemType"
                    checked={itemType === "goods"}
                    onChange={() => tl.setVar("booksFormType", "goods")}
                    className="h-3.5 w-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Goods</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800">
                  <input
                    data-tl="radio-type-service"
                    type="radio"
                    name="itemType"
                    checked={itemType === "service"}
                    onChange={() => tl.setVar("booksFormType", "service")}
                    className="h-3.5 w-3.5 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Service</span>
                </label>
              </div>
            </div>

            {/* Unit */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-medium text-gray-700">
                Unit
              </label>
              <div className="relative max-w-md">
                <button
                  type="button"
                  data-tl="select-unit"
                  onClick={() => tl.setVar("booksFormUnitOpen", !isUnitOpen)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span className={unit ? "text-gray-900" : "text-gray-400"}>
                    {unit || "Select or type to add"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isUnitOpen && (
                  <div
                    data-tl="unit-dropdown"
                    className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-30 py-1"
                  >
                    {UNITS_LIST.map((u) => (
                      <button
                        key={u}
                        type="button"
                        data-tl={`unit-opt-${u}`}
                        onClick={() => {
                          tl.setVar("booksFormUnit", u);
                          tl.setVar("booksFormUnitOpen", false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                          unit === u
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Image upload box */}
          <div className="md:col-span-1">
            <div
              data-tl="box-image-upload"
              onClick={() => tl.setVar("booksImagePickerOpen", true)}
              className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-lg p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors min-h-[140px] bg-gray-50/50"
            >
              {selectedImage ? (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-16 h-16 rounded overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={selectedImage}
                      alt="Product thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] text-blue-600 font-medium">
                    Change photo
                  </span>
                </div>
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                  <p className="text-xs text-gray-500">
                    Drag image(s) here or
                  </p>
                  <p className="text-xs text-blue-600 font-medium hover:underline mt-0.5">
                    Browse images
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Section: Sales Information */}
        <div className="pt-4 border-t border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked
              readOnly
              className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300"
            />
            <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Sales Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Selling Price */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                <span className="text-red-500 font-bold mr-0.5">*</span> Selling
                Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs text-gray-400">
                  GBP
                </span>
                <input
                  data-tl="input-selling-price"
                  type="text"
                  value={sellingPrice}
                  onChange={(e) =>
                    tl.setVar("booksFormSellingPrice", e.target.value)
                  }
                  placeholder="0.00"
                  className="w-full pl-12 pr-3 py-1.5 text-xs text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Sales Account */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-medium text-gray-700">
                <span className="text-red-500 font-bold mr-0.5">*</span> Account
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-sales-account"
                  onClick={() =>
                    tl.setVar(
                      "booksFormSalesAccountOpen",
                      !isSalesAccountOpen
                    )
                  }
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span
                    className={salesAccount ? "text-gray-900" : "text-gray-400"}
                  >
                    {salesAccount || "Select an account *"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isSalesAccountOpen && (
                  <div
                    data-tl="sales-account-dropdown"
                    className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-30 py-1"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Income Accounts
                    </div>
                    {INCOME_ACCOUNTS.map((acc) => {
                      const code = acc.split(" ")[0];
                      return (
                        <button
                          key={acc}
                          type="button"
                          data-tl={`sales-account-${code}`}
                          onClick={() => {
                            tl.setVar("booksFormSalesAccount", acc);
                            tl.setVar("booksFormSalesAccountOpen", false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                            salesAccount === acc
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                data-tl="textarea-sales-desc"
                value={salesDesc}
                onChange={(e) =>
                  tl.setVar("booksFormSalesDesc", e.target.value)
                }
                rows={2}
                placeholder="Description"
                className="w-full px-3 py-1.5 text-xs text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
              />
            </div>

            {/* Tax */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Tax
              </label>
              <select
                data-tl="select-sales-tax"
                value={salesTax}
                onChange={(e) =>
                  tl.setVar("booksFormSalesTax", e.target.value)
                }
                className="w-full px-3 py-1.5 text-xs bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {TAX_RATES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section: Purchase Information */}
        <div className="pt-4 border-t border-gray-200 space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked
              readOnly
              className="h-3.5 w-3.5 text-blue-600 rounded border-gray-300"
            />
            <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-wide">
              Purchase Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost Price */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                <span className="text-red-500 font-bold mr-0.5">*</span> Cost
                Price
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-xs text-gray-400">
                  GBP
                </span>
                <input
                  data-tl="input-cost-price"
                  type="text"
                  value={costPrice}
                  onChange={(e) =>
                    tl.setVar("booksFormCostPrice", e.target.value)
                  }
                  placeholder="0.00"
                  className="w-full pl-12 pr-3 py-1.5 text-xs text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Purchase Account (with required validation error) */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-medium text-gray-700">
                <span className="text-red-500 font-bold mr-0.5">*</span> Account
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-purchase-account"
                  onClick={() =>
                    tl.setVar(
                      "booksFormPurchaseAccountOpen",
                      !isPurchaseAccountOpen
                    )
                  }
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs bg-white border ${
                    purchaseAccountError
                      ? "border-red-500 ring-1 ring-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                >
                  <span
                    className={
                      purchaseAccount ? "text-gray-900" : "text-gray-400"
                    }
                  >
                    {purchaseAccount || "Select an account *"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isPurchaseAccountOpen && (
                  <div
                    data-tl="purchase-account-dropdown"
                    className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-30 py-1"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Expense Accounts
                    </div>
                    {EXPENSE_ACCOUNTS.map((acc) => {
                      const code = acc.split(" ")[0];
                      return (
                        <button
                          key={acc}
                          type="button"
                          data-tl={`purchase-account-${code}`}
                          onClick={() => {
                            tl.setVar("booksFormPurchaseAccount", acc);
                            tl.setVar("booksPurchaseAccountError", false);
                            tl.setVar("booksFormPurchaseAccountOpen", false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                            purchaseAccount === acc
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              {purchaseAccountError && (
                <p
                  data-tl="error-purchase-account"
                  className="text-[11px] text-red-600 pt-0.5"
                >
                  This field is required
                </p>
              )}
            </div>

            {/* Purchase Description */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                data-tl="textarea-purchase-desc"
                value={purchaseDesc}
                onChange={(e) =>
                  tl.setVar("booksFormPurchaseDesc", e.target.value)
                }
                rows={2}
                placeholder="Description"
                className="w-full px-3 py-1.5 text-xs text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
              />
            </div>

            {/* Purchase Tax */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-700">
                Tax
              </label>
              <select
                data-tl="select-purchase-tax"
                value={purchaseTax}
                onChange={(e) =>
                  tl.setVar("booksFormPurchaseTax", e.target.value)
                }
                className="w-full px-3 py-1.5 text-xs bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {TAX_RATES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Vendor */}
            <div className="space-y-1 relative md:col-span-2 max-w-md">
              <label className="block text-xs font-medium text-gray-700">
                Preferred Vendor
              </label>
              <div className="relative">
                <button
                  type="button"
                  data-tl="select-preferred-vendor"
                  onClick={() =>
                    tl.setVar("booksFormVendorOpen", !isVendorOpen)
                  }
                  className="w-full flex items-center justify-between px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-md shadow-sm text-left focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <span className={vendor ? "text-gray-900" : "text-gray-400"}>
                    {vendor || "Select a vendor"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isVendorOpen && (
                  <div
                    data-tl="vendor-dropdown"
                    className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto z-30 py-1"
                  >
                    {VENDORS_LIST.map((v) => (
                      <button
                        key={v}
                        type="button"
                        data-tl={`vendor-opt-${v.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => {
                          tl.setVar("booksFormVendor", v);
                          tl.setVar("booksFormVendorOpen", false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                          vendor === v
                            ? "bg-blue-50 text-blue-600 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-6 flex items-center gap-3">
          <button
            data-tl="btn-save-item"
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-[#2563EB] hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-sm transition-colors cursor-pointer flex items-center gap-2"
          >
            {isSaving && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </button>

          <button
            data-tl="btn-cancel-item"
            onClick={handleCancel}
            className="px-4 py-2 text-xs text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
