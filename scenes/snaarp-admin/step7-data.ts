import { URL_USERS } from "./admin-data";

/* Snaarp Admin, step 7 - Add the user to another product. Recording: ref/admin/Snaarp_Admin_add_users.mp4 (about 2:40-3:00). The internal product names in the recording's list are left out. */

export const URL = URL_USERS;

/** What is typed into the list's search box. */
export const SEARCH = "Books";

export const CAPTIONS = {
  open: "Open the product list under Add products",
  scroll: "Scroll to see the products Sam does not have yet",
  search: `Type ${SEARCH} to filter the list`,
  choose: "Choose Snaarp Books",
  add: "Click Add",
  added: "Snaarp Books is now in Sam's list",
};
