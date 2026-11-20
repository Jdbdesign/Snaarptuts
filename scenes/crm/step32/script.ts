import type { Timeline } from "@/lib/timeline";
import { beginCrm, finishCrm, pressOn, hoverOn } from "@/components/crm/crm-timeline";
import { INITIAL_PRODUCTS } from "@/components/crm/crm-data";

export const STEP32_DURATION_MS = 28000;

export async function runStep32(tl: Timeline) {
  beginCrm(tl, "crm-admin-users-products", {
    isSystemAdmin: true,
    isAdminUsersScreen: true,
  });
  tl.setUrl("admin.snaarp.com/admin/users");

  // Beat 1: Review organization users in Accounts Admin
  await tl.at(400);
  tl.showCaption("Inspect organization users in the Accounts Admin directory.");
  await hoverOn(tl, "[data-tl=crm-admin-users-header]", { ms: 600 });
  await tl.wait(1500);

  // Beat 2: Return to CRM Products catalogue
  await tl.at(3000);
  tl.showCaption("Click Return to CRM Products.");
  await pressOn(tl, "[data-tl=crm-admin-users-back-btn]");
  tl.setVar("crm:isAdminUsersScreen", false);
  tl.setVar("crm:activeSysNav", "products");
  tl.setUrl("crm.snaarp.com/admin/products");
  await tl.wait(1500);

  // Beat 3: Switch to List view
  await tl.at(6500);
  tl.showCaption("Switch products catalogue to List view.");
  await pressOn(tl, "[data-tl=crm-products-view-list]");
  tl.setVar("crm:productsViewMode", "list");
  await tl.wait(1200);

  // Beat 4: Sort products Name A-Z
  await tl.at(9500);
  tl.showCaption("Sort products alphabetically (Name A-Z).");
  await pressOn(tl, "[data-tl=crm-products-sort-select]");
  tl.setVar("crm:productsSort", "Name A-Z");
  await tl.wait(1200);

  // Beat 5: Open + Add Product modal and cancel
  await tl.at(12500);
  tl.showCaption("Click Add Product to inspect creation fields.");
  await pressOn(tl, "[data-tl=crm-products-add-btn]");
  tl.setVar("crm:isNewProductOpen", true);
  await tl.wait(1600);
  await pressOn(tl, "[data-tl=crm-product-modal-cancel]");
  tl.setVar("crm:isNewProductOpen", false);
  await tl.wait(1000);

  // Beat 6: Edit Lock: Password Manager and cancel
  await tl.at(17000);
  tl.showCaption("Edit product attributes for Lock: Password Manager.");
  await pressOn(tl, "[data-tl=crm-product-edit-lock]");
  tl.setVar("crm:isEditProductOpen", true);
  await tl.wait(1600);
  await pressOn(tl, "[data-tl=crm-edit-product-cancel]");
  tl.setVar("crm:isEditProductOpen", false);
  await tl.wait(1000);

  // Beat 7: Bulk select Books and CRM
  await tl.at(21500);
  tl.showCaption("Select Books and CRM for bulk action.");
  await pressOn(tl, "[data-tl=crm-product-check-books]");
  tl.setVar("crm:selectedProductIds", ["books"]);
  await tl.wait(600);
  await pressOn(tl, "[data-tl=crm-product-check-crm]");
  tl.setVar("crm:selectedProductIds", ["books", "crm"]);
  await tl.wait(1000);

  // Beat 8: Click Delete in bulk bar
  await tl.at(24800);
  tl.showCaption("Click Delete to remove selected products from catalogue.");
  await pressOn(tl, "[data-tl=crm-products-bulk-delete-btn]");
  const remaining = INITIAL_PRODUCTS.filter((p) => p.id !== "books" && p.id !== "crm");
  tl.setVar("crm:products", remaining);
  tl.setVar("crm:selectedProductIds", []);
  tl.setVar("crm:toast", {
    id: "crm-toast-products-deleted",
    message: "2 products deleted",
  });
  await finishCrm(tl);
}
