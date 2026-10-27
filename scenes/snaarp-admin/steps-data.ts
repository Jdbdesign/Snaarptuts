import { URL_USERS } from "./admin-data";
import { FIX_EMAIL, MANUAL_ROW, NEW_DEPARTMENT, PEOPLE_COPY } from "./people-data";

/* Snaarp Admin, steps 5-12. Recordings: ref/admin/v179.mp4 (Users page, products, Organization) and the earlier Create user steps. */

export const URL_ORGANIZATION = "login.snaarp.com/admin/organization";
export { URL_USERS };

export const CAPTIONS = {
  // 5 Bulk users
  bulkOpen: "Click Bulk user",
  bulkTemplate: "Click CSV template to get the sample file",
  bulkChoose: `Click Choose file and pick ${PEOPLE_COPY.bulkRows.file}`,
  bulkReview: "Check the rows. One row needs fixing",
  bulkFix: "Type the missing email address",
  bulkAddRow: "Click Add row to add one more person",
  bulkManual: "Type the new person's details",
  bulkCreate: "Click Create 4 users",
  bulkDone: "The new people are at the top of the directory",
  // 6 Filters
  search: "Type a name or email in the search box",
  dept: "Open All departments and tick a department",
  deptClear: "Click Clear filters",
  product: "Open All products and choose Snaarp Books",
  productClear: "Click Clear filters to see everyone again",
  role: "Open the Role menu to change a person's role",
  // 7 Add product
  findPriya: "Search for the person, here Priya",
  openProducts: "Open the Products dropdown",
  scrollAdd: "Scroll to ADD PRODUCT",
  addBooks: "Click the plus next to Snaarp Books",
  addedBooks: "Priya now has one more product",
  // 8 Remove product
  findAlex: "Search for the person, here Alex",
  removeBooks: "Click the minus next to Snaarp Books",
  removedBooks: "Alex now has one product fewer",
  // 9 Departments
  openOrg: "Click Organization",
  filterList: "The Filter list shows every department and its members",
  engineering: "Click Engineering",
  hr: "Click HR",
  humanResources: "Click Human Resources",
  sales: "Sales has no members yet",
  all: "Click All members to see everyone",
  // 10 New department
  newDept: "Click New Department",
  deptName: `Type the name: ${NEW_DEPARTMENT.name}`,
  deptDesc: "Add a short description",
  deptColor: "Pick a colour",
  deptCreate: "Click Create",
  deptCreated: "Design is in the list, with no members yet",
  // 11 Add member
  allMembers: "Start from All members",
  rowMenu: "Open the three dots on a person's row",
  moveTo: `Choose ${NEW_DEPARTMENT.name} under Move to department`,
  memberAdded: "Click Design to see the new member",
  // 12 Filter by department
  openDept: "Open All departments",
  tickDesign: `Tick ${NEW_DEPARTMENT.name}`,
  onlyDesign: "Only the Design members are listed",
  clearDept: "Click Clear filters",
};

export const SEARCH_PRIYA = "priya";
export const SEARCH_ALEX = "alex";
export const SEARCH_NAME = "lena";
export { FIX_EMAIL, MANUAL_ROW };
