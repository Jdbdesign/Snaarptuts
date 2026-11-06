export interface BookItem {
  id: string;
  name: string;
  purchaseDescription: string;
  purchaseRate: number;
  description: string;
  rate: number;
  usageUnit: string;
  status: "active" | "inactive";
  type: "goods" | "service";
  createdAt: string; // ISO or date string for sorting
  sellingPrice: number;
  costPrice: number;
  salesAccount: string;
  purchaseAccount: string;
  tax: string;
  vendor?: string;
  isLocked?: boolean;
}

export const INITIAL_ACTIVE_ITEMS: BookItem[] = [
  {
    id: "item-1",
    name: "Organic Rice 25kg",
    purchaseDescription: "Bulk rice, 25kg bag",
    purchaseRate: 18.0,
    description: "Organic long-grain rice, 25kg bag",
    rate: 29.0,
    usageUnit: "bag",
    status: "active",
    type: "goods",
    createdAt: "2026-11-04T12:00:00Z",
    sellingPrice: 29.0,
    costPrice: 18.0,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-2",
    name: "Palm Oil 5L",
    purchaseDescription: "Palm oil, 5 litre can",
    purchaseRate: 6.5,
    description: "Palm oil, 5 litre can",
    rate: 11.0,
    usageUnit: "can",
    status: "active",
    type: "goods",
    createdAt: "2026-11-04T11:00:00Z",
    sellingPrice: 11.0,
    costPrice: 6.5,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-3",
    name: "Cassava Flour 10kg",
    purchaseDescription: "Cassava flour, 10kg bag",
    purchaseRate: 7.2,
    description: "Fine cassava flour, 10kg bag",
    rate: 12.5,
    usageUnit: "bag",
    status: "active",
    type: "goods",
    createdAt: "2026-11-04T10:00:00Z",
    sellingPrice: 12.5,
    costPrice: 7.2,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Harvest Wholesale Ltd",
  },
  {
    id: "item-4",
    name: "Yam Tubers",
    purchaseDescription: "Yam tubers, per kg",
    purchaseRate: 1.1,
    description: "Fresh yam tubers, per kg",
    rate: 2.4,
    usageUnit: "kg",
    status: "active",
    type: "goods",
    createdAt: "2026-11-03T16:00:00Z",
    sellingPrice: 2.4,
    costPrice: 1.1,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-5",
    name: "Honey Beans 1kg",
    purchaseDescription: "Honey beans, 1kg",
    purchaseRate: 2.3,
    description: "Honey beans, 1kg",
    rate: 4.2,
    usageUnit: "kg",
    status: "active",
    type: "goods",
    createdAt: "2026-11-03T15:00:00Z",
    sellingPrice: 4.2,
    costPrice: 2.3,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Harvest Wholesale Ltd",
  },
  {
    id: "item-6",
    name: "Ground Pepper 500g",
    purchaseDescription: "Ground pepper, 500g",
    purchaseRate: 1.8,
    description: "Ground pepper, 500g pack",
    rate: 3.6,
    usageUnit: "pack",
    status: "active",
    type: "goods",
    createdAt: "2026-11-03T14:00:00Z",
    sellingPrice: 3.6,
    costPrice: 1.8,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-7",
    name: "Packaging Boxes",
    purchaseDescription: "Cardboard boxes, pack of 50",
    purchaseRate: 9.0,
    description: "Shipping boxes, pack of 50",
    rate: 15.0,
    usageUnit: "pack",
    status: "active",
    type: "goods",
    createdAt: "2026-11-02T13:00:00Z",
    sellingPrice: 15.0,
    costPrice: 9.0,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
  {
    id: "item-8",
    name: "Delivery Fee",
    purchaseDescription: "Courier charge",
    purchaseRate: 4.0,
    description: "Standard UK delivery",
    rate: 7.5,
    usageUnit: "unit",
    status: "active",
    type: "service",
    createdAt: "2026-11-02T12:00:00Z",
    sellingPrice: 7.5,
    costPrice: 4.0,
    salesAccount: "4003 - Shipping Charges",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Standard UK Logistics",
  },
  {
    id: "item-9",
    name: "Consulting Hours",
    purchaseDescription: "Contractor time",
    purchaseRate: 35.0,
    description: "Business consulting, per hour",
    rate: 75.0,
    usageUnit: "hr",
    status: "active",
    type: "service",
    createdAt: "2026-11-02T11:00:00Z",
    sellingPrice: 75.0,
    costPrice: 35.0,
    salesAccount: "4001 - Service Income",
    purchaseAccount: "5004 - Consultant Expense",
    tax: "VAT Standard (20%)",
    vendor: "Harvest Wholesale Ltd",
  },
  {
    id: "item-10",
    name: "Notebook A5",
    purchaseDescription: "Notebook A5, case of 20",
    purchaseRate: 1.2,
    description: "Notebook A5, lined",
    rate: 2.99,
    usageUnit: "pcs",
    status: "active",
    type: "goods",
    createdAt: "2026-11-01T15:00:00Z",
    sellingPrice: 2.99,
    costPrice: 1.2,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
  {
    id: "item-11",
    name: "Gift Hamper",
    purchaseDescription: "Hamper contents and box",
    purchaseRate: 14.0,
    description: "Gift hamper, medium",
    rate: 29.99,
    usageUnit: "box",
    status: "active",
    type: "goods",
    createdAt: "2026-11-01T14:00:00Z",
    sellingPrice: 29.99,
    costPrice: 14.0,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-12",
    name: "Reusable Tote Bag",
    purchaseDescription: "Tote bags, per piece",
    purchaseRate: 0.9,
    description: "Reusable tote bag",
    rate: 3.5,
    usageUnit: "pcs",
    status: "active",
    type: "goods",
    createdAt: "2026-11-01T11:00:00Z",
    sellingPrice: 3.5,
    costPrice: 0.9,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
  {
    id: "item-13",
    name: "Cold Pressed Juice 1L",
    purchaseDescription: "Juice, 1 litre bottle",
    purchaseRate: 2.1,
    description: "Cold pressed juice, 1 litre",
    rate: 4.5,
    usageUnit: "bottle",
    status: "active",
    type: "goods",
    createdAt: "2026-10-31T09:00:00Z",
    sellingPrice: 4.5,
    costPrice: 2.1,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "item-14",
    name: "Storage Jars",
    purchaseDescription: "Jar sets, set of 6",
    purchaseRate: 5.0,
    description: "Storage jars, set of 6",
    rate: 11.0,
    usageUnit: "set",
    status: "active",
    type: "goods",
    createdAt: "2026-10-30T10:00:00Z",
    sellingPrice: 11.0,
    costPrice: 5.0,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
];

export const INITIAL_INACTIVE_ITEMS: BookItem[] = [
  {
    id: "inactive-1",
    name: "Seasonal Gift Basket",
    purchaseDescription: "Seasonal basket contents",
    purchaseRate: 16.0,
    description: "Seasonal gourmet gift basket",
    rate: 35.0,
    usageUnit: "basket",
    status: "inactive",
    type: "goods",
    createdAt: "2026-10-20T10:00:00Z",
    sellingPrice: 35.0,
    costPrice: 16.0,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "inactive-2",
    name: "Clearance Tote Bag",
    purchaseDescription: "End of line tote bags",
    purchaseRate: 0.7,
    description: "Promotional canvas tote bag",
    rate: 2.0,
    usageUnit: "pcs",
    status: "inactive",
    type: "goods",
    createdAt: "2026-10-15T09:00:00Z",
    sellingPrice: 2.0,
    costPrice: 0.7,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
];

export const CSV_IMPORT_ITEMS: BookItem[] = [
  {
    id: "import-1",
    name: "Sesame Seeds 1kg",
    purchaseDescription: "Raw sesame seeds, 1kg bag",
    purchaseRate: 3.2,
    description: "Natural white sesame seeds, 1kg",
    rate: 5.8,
    usageUnit: "kg",
    status: "active",
    type: "goods",
    createdAt: "2026-11-05T08:00:00Z",
    sellingPrice: 5.8,
    costPrice: 3.2,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Green Fields Supplies Ltd",
  },
  {
    id: "import-2",
    name: "Coconut Oil 1L",
    purchaseDescription: "Pure coconut oil, 1 litre bottle",
    purchaseRate: 4.5,
    description: "Organic virgin coconut oil, 1 litre",
    rate: 8.9,
    usageUnit: "bottle",
    status: "active",
    type: "goods",
    createdAt: "2026-11-05T08:01:00Z",
    sellingPrice: 8.9,
    costPrice: 4.5,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Harvest Wholesale Ltd",
  },
  {
    id: "import-3",
    name: "Hand Soap 500ml",
    purchaseDescription: "Liquid hand soap refill, 500ml",
    purchaseRate: 1.4,
    description: "Antibacterial hand soap, 500ml",
    rate: 2.8,
    usageUnit: "bottle",
    status: "active",
    type: "goods",
    createdAt: "2026-11-05T08:02:00Z",
    sellingPrice: 2.8,
    costPrice: 1.4,
    salesAccount: "4000 - Sales",
    purchaseAccount: "5000 - Cost of Goods Sold",
    tax: "VAT Standard (20%)",
    vendor: "Packaging Direct Ltd",
  },
];

export const REFRESHED_NEW_ITEM: BookItem = {
  id: "refresh-1",
  name: "Raw Honey 500g",
  purchaseDescription: "Pure blossom honey, 500g jar",
  purchaseRate: 3.1,
  description: "Raw wildflower honey, 500g",
  rate: 5.95,
  usageUnit: "jar",
  status: "active",
  type: "goods",
  createdAt: "2026-11-05T09:00:00Z",
  sellingPrice: 5.95,
  costPrice: 3.1,
  salesAccount: "4000 - Sales",
  purchaseAccount: "5000 - Cost of Goods Sold",
  tax: "VAT Standard (20%)",
  vendor: "Green Fields Supplies Ltd",
};

export const FOOD_FARM_ITEM: BookItem = {
  id: "food-farm-1",
  name: "Food Farm",
  purchaseDescription: "Farm food for local industries",
  purchaseRate: 200.0,
  description: "Farm food for local industries",
  rate: 200.0,
  usageUnit: "kg",
  status: "active",
  type: "goods",
  createdAt: "2026-11-05T10:00:00Z",
  sellingPrice: 200.0,
  costPrice: 200.0,
  salesAccount: "4000 - Sales",
  purchaseAccount: "5000 - Cost of Goods Sold",
  tax: "VAT Standard (20%)",
  vendor: "Green Fields Supplies Ltd",
};

export const CONSULTING_ITEM: BookItem = {
  id: "consulting-1",
  name: "Business Setup Consulting",
  purchaseDescription: "Professional business setup advisory",
  purchaseRate: 60.0,
  description: "Comprehensive business setup consulting",
  rate: 120.0,
  usageUnit: "hr",
  status: "active",
  type: "service",
  createdAt: "2026-11-05T10:30:00Z",
  sellingPrice: 120.0,
  costPrice: 60.0,
  salesAccount: "4001 - Service Income",
  purchaseAccount: "5004 - Consultant Expense",
  tax: "VAT Standard (20%)",
  vendor: "Harvest Wholesale Ltd",
};

export const FOOD_FARM_TRANSACTIONS = [
  {
    id: "tx-1",
    date: "04/11/2026",
    type: "Invoice",
    reference: "INV-10007",
    contact: "Brightway Stores",
    quantity: 12,
    amount: "£2,400.00",
    status: "Sent",
  },
  {
    id: "tx-2",
    date: "03/11/2026",
    type: "Bill",
    reference: "BILL-005",
    contact: "Green Fields Supplies Ltd",
    quantity: 20,
    amount: "£4,000.00",
    status: "Pending",
  },
  {
    id: "tx-3",
    date: "05/11/2026",
    type: "Invoice",
    reference: "INV-10008",
    contact: "Northfield Cafe",
    quantity: 5,
    amount: "£1,000.00",
    status: "Draft",
  },
];

export interface BookItemHistoryEntry {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  detail?: string;
}

export const FOOD_FARM_HISTORY_DEFAULT: BookItemHistoryEntry[] = [
  {
    id: "h-1",
    action: "Item created",
    user: "Sam Taylor",
    timestamp: "Nov 5, 2026, 10:02 AM",
    detail: "Item created with rate £200.00 and unit kg",
  },
];

// Home data structures
export const BOOKS_RECEIVABLES = {
  unpaid: "£520.80",
  current: "£0.00",
  overdue: "£520.80",
};

export const BOOKS_PAYABLES = {
  unpaid: "£115.20",
  current: "£0.00",
  overdue: "£115.20",
};

export interface CashFlowPeriodData {
  period: string;
  labels: string[];
  incoming: number[];
  outgoing: number[];
  maxVal: number;
}

export const CASH_FLOW_PERIODS: Record<string, CashFlowPeriodData> = {
  "This Month": {
    period: "This Month",
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    incoming: [420, 310, 560, 390],
    outgoing: [180, 250, 340, 210],
    maxVal: 600,
  },
  "Last Month": {
    period: "Last Month",
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    incoming: [380, 440, 310, 520],
    outgoing: [210, 190, 290, 320],
    maxVal: 600,
  },
  "This Quarter": {
    period: "This Quarter",
    labels: ["Sep", "Oct", "Nov"],
    incoming: [1650, 1820, 1680],
    outgoing: [1020, 1150, 980],
    maxVal: 2000,
  },
  "This Week": {
    period: "This Week",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    incoming: [80, 120, 150, 110, 140],
    outgoing: [40, 60, 90, 20, 50],
    maxVal: 200,
  },
  "This Year": {
    period: "This Year",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    incoming: [4800, 5200, 5150, 4200],
    outgoing: [3100, 3400, 3150, 2600],
    maxVal: 6000,
  },
};

export const WATCHLIST_ACCRUAL = [
  { name: "Bank Fees and Charges", code: "5101 · Expense", amount: "£500.00", negative: false },
  { name: "Sales", code: "4000 · Income", amount: "£369.80", negative: false },
  { name: "Advertising and Marketing", code: "5002 · Expense", amount: "£200.00", negative: false },
  { name: "IT and Internet Expenses", code: "5107 · Expense", amount: "-£36.40", negative: true },
];

export const WATCHLIST_CASH = [
  { name: "Bank Fees and Charges", code: "5101 · Expense", amount: "£420.00", negative: false },
  { name: "Sales", code: "4000 · Income", amount: "£310.50", negative: false },
  { name: "Advertising and Marketing", code: "5002 · Expense", amount: "£180.00", negative: false },
  { name: "IT and Internet Expenses", code: "5107 · Expense", amount: "-£24.00", negative: true },
];

export const RECENT_UPDATES = [
  {
    id: "up-1",
    title: "Invoice INV-10006 sent",
    detail: "for Acme Foods Ltd by Sam Taylor",
    date: "Nov 4, 2026, 9:15 AM",
  },
  {
    id: "up-2",
    title: "Invoice INV-10005 partially paid",
    detail: "by Brightway Stores",
    date: "Nov 4, 2026, 8:40 AM",
  },
  {
    id: "up-3",
    title: "Bill BILL-003 pending approval",
    detail: "by Alex Morgan",
    date: "Nov 3, 2026, 4:20 PM",
  },
  {
    id: "up-4",
    title: "Expense EXP-1945 - £200.00",
    detail: "by System",
    date: "Nov 3, 2026, 2:10 PM",
  },
  {
    id: "up-5",
    title: "Invoice INV-10004 sent",
    detail: "for Northfield Cafe by Sam Taylor",
    date: "Nov 2, 2026, 11:30 AM",
  },
  {
    id: "up-6",
    title: "Bill BILL-004 pending approval",
    detail: "by Casey Brown",
    date: "Nov 2, 2026, 10:15 AM",
  },
  {
    id: "up-7",
    title: "Expense EXP-1946 - £48.00",
    detail: "Courier services by Alex Morgan",
    date: "Nov 1, 2026, 3:45 PM",
  },
  {
    id: "up-8",
    title: "Invoice INV-10003 paid",
    detail: "Full payment received for Acme Foods Ltd",
    date: "Oct 31, 2026, 5:00 PM",
  },
  {
    id: "up-9",
    title: "Bill BILL-002 approved",
    detail: "Green Fields Supplies Ltd by Jordan Lee",
    date: "Oct 30, 2026, 1:20 PM",
  },
  {
    id: "up-10",
    title: "Invoice INV-10002 sent",
    detail: "for Brightway Stores by Sam Taylor",
    date: "Oct 29, 2026, 10:00 AM",
  },
];

export const INCOME_ACCOUNTS = [
  "4000 — Sales",
  "4001 — Service Income",
  "4002 — Discount",
  "4003 — Shipping Charges",
  "4004 — Late Fee Income",
  "4005 — Other Charges",
];

export const EXPENSE_ACCOUNTS = [
  "5000 — Cost of Goods Sold",
  "5001 — Raw Materials",
  "5002 — Advertising and Marketing",
  "5003 — Subcontractor Expense",
  "5004 — Consultant Expense",
  "5101 — Bank Fees and Charges",
  "5105 — Depreciation Expense",
  "5107 — IT and Internet Expenses",
];

export const TAX_RATES = [
  "VAT Standard (20%)",
  "VAT Reduced (5%)",
  "Zero Rated (0%)",
  "Exempt",
];

export const UNITS_LIST = [
  "kg",
  "bag",
  "can",
  "pack",
  "pcs",
  "box",
  "bottle",
  "set",
  "unit",
  "hr",
  "pair",
  "roll",
  "carton",
];

export const VENDORS_LIST = [
  "Green Fields Supplies Ltd",
  "Harvest Wholesale Ltd",
  "Standard UK Logistics",
  "Packaging Direct Ltd",
];

export const BOOKS_URLS = {
  dashboard: "books.snaarp.com/dashboard",
  products: "books.snaarp.com/products",
  newProduct: "books.snaarp.com/products/new",
  details: "books.snaarp.com/products/6a3104d6-2f91-4b8a-b33f-bb0b75d6b930",
  edit: "books.snaarp.com/products/6a3104d6-2f91-4b8a-b33f-bb0b75d6b930/edit",
  customers: "books.snaarp.com/customers",
  newCustomer: "books.snaarp.com/customers/new",
  customerDetails: "books.snaarp.com/customers/75dac8f4-2fd9-486a-9518-dc08b4e6db6d",
  quotes: "books.snaarp.com/quotes",
  newQuote: "books.snaarp.com/quotes/new",
  quoteDetails: "books.snaarp.com/quotes/4c5f94a8-451f-4adc-9845-0bef8de60156",
  editQuote: "books.snaarp.com/quotes/4c5f94a8-451f-4adc-9845-0bef8de60156/edit",
  invoices: "books.snaarp.com/invoices",
  newInvoice: "books.snaarp.com/invoices/new",
  invoiceDetails: "books.snaarp.com/invoices/69daed2d-52db-429f-81a2-d8030dc6250e",
  editInvoice: "books.snaarp.com/invoices/69daed2d-52db-429f-81a2-d8030dc6250e/edit",
};

export type BooksPage =
  | "home"
  | "products"
  | "new"
  | "details"
  | "edit"
  | "new-item"
  | "item-detail"
  | "customers"
  | "new-customer"
  | "customer-detail"
  | "quotes"
  | "new-quote"
  | "quote-detail"
  | "edit-quote"
  | "invoices"
  | "new-invoice"
  | "invoice-detail"
  | "edit-invoice";

// ── Customer Data Types & Lists ─────────────────────────────────────────────

export interface ContactPerson {
  id: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  workPhoneCode: string;
  workPhone: string;
  mobileCode: string;
  mobile: string;
}

export interface CustomerAddress {
  attention?: string;
  country?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  fax?: string;
}

export interface CustomerItem {
  id: string;
  type: "business" | "individual";
  salutation?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  displayName: string;
  email: string;
  phoneCode: string;
  phone: string;
  mobileCode?: string;
  mobile?: string;
  status: "active" | "inactive";
  language?: string;
  taxRate?: string;
  companyId?: string;
  currency?: string;
  accountsReceivable?: string;
  openingBalance?: number;
  paymentTerms?: string;
  portalAccess?: boolean;
  billingAddress?: CustomerAddress;
  shippingAddress?: CustomerAddress;
  notes?: string;
  contactPersons?: ContactPerson[];
  createdAt: string;
}

export const INITIAL_ACTIVE_CUSTOMERS: CustomerItem[] = [
  {
    id: "cust-1",
    type: "business",
    companyName: "Acme Foods Ltd",
    displayName: "Acme Foods Ltd",
    email: "accounts@acmefoods.example",
    phoneCode: "+44",
    phone: "7700 900101",
    status: "active",
    billingAddress: {
      attention: "Finance Dept",
      country: "United Kingdom",
      street1: "14 Foundry Lane",
      street2: "",
      city: "Manchester",
      state: "Greater Manchester",
      zipCode: "M1 4AB",
      phone: "+44 7700 900101",
    },
    shippingAddress: {
      attention: "Receiving Bay 2",
      country: "United Kingdom",
      street1: "14 Foundry Lane",
      street2: "",
      city: "Manchester",
      state: "Greater Manchester",
      zipCode: "M1 4AB",
      phone: "+44 7700 900101",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "07891234",
    notes: "Regular supplier orders.",
    createdAt: "2026-11-01T09:00:00Z",
  },
  {
    id: "cust-2",
    type: "business",
    companyName: "Brightway Stores",
    displayName: "Brightway Stores",
    email: "billing@brightway.example",
    phoneCode: "+44",
    phone: "7700 900102",
    status: "active",
    billingAddress: {
      attention: "Accounts Dept",
      country: "United Kingdom",
      street1: "12 Market Street",
      street2: "",
      city: "Leeds",
      state: "Leeds",
      zipCode: "LS1 4AB",
      phone: "+44 7700 900102",
    },
    shippingAddress: {
      attention: "Goods Inward",
      country: "United Kingdom",
      street1: "Unit 4, Dock Road",
      street2: "",
      city: "Leeds",
      state: "Leeds",
      zipCode: "LS10 1AB",
      phone: "+44 7700 900102",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "GB123456789",
    notes: "Pays by bank transfer. Orders weekly.",
    createdAt: "2026-11-02T10:00:00Z",
  },
  {
    id: "cust-3",
    type: "business",
    companyName: "Northfield Cafe",
    displayName: "Northfield Cafe",
    email: "hello@northfieldcafe.example",
    phoneCode: "+44",
    phone: "7700 900103",
    status: "active",
    billingAddress: {
      attention: "Sarah Jenkins",
      country: "United Kingdom",
      street1: "88 The Green",
      street2: "",
      city: "York",
      state: "North Yorkshire",
      zipCode: "YO1 7HH",
      phone: "+44 7700 900103",
    },
    shippingAddress: {
      attention: "Sarah Jenkins",
      country: "United Kingdom",
      street1: "88 The Green",
      street2: "",
      city: "York",
      state: "North Yorkshire",
      zipCode: "YO1 7HH",
      phone: "+44 7700 900103",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "09112233",
    notes: "Weekly bakery and organic bean deliveries.",
    createdAt: "2026-11-02T14:30:00Z",
  },
  {
    id: "cust-4",
    type: "business",
    companyName: "Harvest Tables Ltd",
    displayName: "Harvest Tables Ltd",
    email: "finance@harvesttables.example",
    phoneCode: "+44",
    phone: "114 496 0104",
    status: "active",
    billingAddress: {
      attention: "Accounts Payable",
      country: "United Kingdom",
      street1: "Unit 2, Woodside Park",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S9 1QT",
      phone: "+44 114 496 0104",
    },
    shippingAddress: {
      attention: "Goods Inward",
      country: "United Kingdom",
      street1: "Unit 2, Woodside Park",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S9 1QT",
      phone: "+44 114 496 0104",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "06223344",
    notes: "Wholesale partner.",
    createdAt: "2026-11-03T11:00:00Z",
  },
  {
    id: "cust-5",
    type: "business",
    companyName: "Sterling Interiors",
    displayName: "Sterling Interiors",
    email: "office@sterlinginteriors.example",
    phoneCode: "+44",
    phone: "7700 900105",
    status: "active",
    billingAddress: {
      attention: "Marcus Sterling",
      country: "United Kingdom",
      street1: "76 Commercial Way",
      street2: "",
      city: "Newcastle",
      state: "Tyne and Wear",
      zipCode: "NE1 3DF",
      phone: "+44 7700 900105",
    },
    shippingAddress: {
      attention: "Marcus Sterling",
      country: "United Kingdom",
      street1: "76 Commercial Way",
      street2: "",
      city: "Newcastle",
      state: "Tyne and Wear",
      zipCode: "NE1 3DF",
      phone: "+44 7700 900105",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "05544332",
    notes: "Interior fitouts, monthly invoices.",
    createdAt: "2026-11-03T15:20:00Z",
  },
  {
    id: "cust-6",
    type: "individual",
    salutation: "Mr.",
    firstName: "Casey",
    lastName: "Brown",
    displayName: "Casey Brown",
    email: "casey.brown@acme.example",
    phoneCode: "+44",
    phone: "7700 900106",
    status: "active",
    billingAddress: {
      attention: "Casey Brown",
      country: "United Kingdom",
      street1: "45 High Street",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S1 2AB",
      phone: "+44 7700 900106",
    },
    shippingAddress: {
      attention: "Casey Brown",
      country: "United Kingdom",
      street1: "45 High Street",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S1 2AB",
      phone: "+44 7700 900106",
    },
    taxRate: "VAT Standard (20%)",
    companyId: "GB987654321",
    notes: "Consulting client. Monthly retainer.",
    createdAt: "2026-11-04T08:00:00Z",
  },
];

export const INITIAL_INACTIVE_CUSTOMERS: CustomerItem[] = [
  {
    id: "cust-7",
    type: "business",
    companyName: "Old Mill Traders",
    displayName: "Old Mill Traders",
    email: "accounts@oldmill.example",
    phoneCode: "+44",
    phone: "114 496 0107",
    status: "inactive",
    billingAddress: {
      attention: "Accounts",
      country: "United Kingdom",
      street1: "Old Mill Road",
      street2: "",
      city: "Rotherham",
      state: "South Yorkshire",
      zipCode: "S60 1FB",
      phone: "+44 114 496 0107",
    },
    shippingAddress: {
      attention: "Accounts",
      country: "United Kingdom",
      street1: "Old Mill Road",
      street2: "",
      city: "Rotherham",
      state: "South Yorkshire",
      zipCode: "S60 1FB",
      phone: "+44 114 496 0107",
    },
    notes: "Account paused in Q3.",
    createdAt: "2026-10-15T10:00:00Z",
  },
  {
    id: "cust-8",
    type: "business",
    companyName: "Riverside Studio",
    displayName: "Riverside Studio",
    email: "hello@riversidestudio.example",
    phoneCode: "+44",
    phone: "7700 900108",
    status: "inactive",
    billingAddress: {
      attention: "Design Studio",
      country: "United Kingdom",
      street1: "Studio 3, River Quay",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S3 8NL",
      phone: "+44 7700 900108",
    },
    shippingAddress: {
      attention: "Design Studio",
      country: "United Kingdom",
      street1: "Studio 3, River Quay",
      street2: "",
      city: "Sheffield",
      state: "Sheffield",
      zipCode: "S3 8NL",
      phone: "+44 7700 900108",
    },
    notes: "Seasonal account.",
    createdAt: "2026-10-18T14:00:00Z",
  },
];

export const CSV_IMPORT_CUSTOMERS: CustomerItem[] = [
  {
    id: "cust-import-1",
    type: "business",
    companyName: "Pinewood Catering",
    displayName: "Pinewood Catering",
    email: "catering@pinewood.example",
    phoneCode: "+44",
    phone: "7700 900160",
    status: "active",
    createdAt: "2026-11-05T12:00:00Z",
  },
  {
    id: "cust-import-2",
    type: "business",
    companyName: "Lakeside Florists",
    displayName: "Lakeside Florists",
    email: "orders@lakesideflorists.example",
    phoneCode: "+44",
    phone: "7700 900161",
    status: "active",
    createdAt: "2026-11-05T12:01:00Z",
  },
  {
    id: "cust-import-3",
    type: "business",
    companyName: "Summit Cycles",
    displayName: "Summit Cycles",
    email: "sales@summitcycles.example",
    phoneCode: "+44",
    phone: "7700 900162",
    status: "active",
    createdAt: "2026-11-05T12:02:00Z",
  },
];

export interface CountryCode {
  iso: string;
  name: string;
  code: string;
}

export const COUNTRY_CODES: CountryCode[] = [
  { iso: "GB", name: "United Kingdom", code: "+44" },
  { iso: "US", name: "United States", code: "+1" },
  { iso: "AF", name: "Afghanistan", code: "+93" },
  { iso: "AX", name: "Aland Islands", code: "+358-18" },
  { iso: "AL", name: "Albania", code: "+355" },
  { iso: "DZ", name: "Algeria", code: "+213" },
  { iso: "AS", name: "American Samoa", code: "+1-684" },
  { iso: "AD", name: "Andorra", code: "+376" },
  { iso: "AO", name: "Angola", code: "+244" },
  { iso: "AI", name: "Anguilla", code: "+1-264" },
  { iso: "AE", name: "United Arab Emirates", code: "+971" },
  { iso: "CA", name: "Canada", code: "+1" },
  { iso: "DE", name: "Germany", code: "+49" },
  { iso: "FR", name: "France", code: "+33" },
  { iso: "IE", name: "Ireland", code: "+353" },
  { iso: "RE", name: "Reunion", code: "+262" },
  { iso: "TN", name: "Tunisia", code: "+216" },
  { iso: "UM", name: "United States Minor Outlying Islands", code: "+1" },
];

export const UK_REGIONS = [
  "Aberdeen",
  "Aberdeenshire",
  "Angus",
  "Antrim",
  "Antrim and Newtownabbey",
  "Ards",
  "Ards and North Down",
  "Argyll and Bute",
  "Leeds",
  "Manchester",
  "Newcastle",
  "North Yorkshire",
  "Nottinghamshire",
  "Oxfordshire",
  "Pembrokeshire",
  "Renfrewshire",
  "Scottish Borders",
  "Sheffield",
  "Shetland Islands",
  "Shropshire",
  "South Yorkshire",
  "Tyne and Wear",
  "West Yorkshire",
];

export const PAYMENT_TERMS = [
  "Due on Receipt",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
];

export const SALUTATIONS = ["Mr.", "Mrs.", "Ms.", "Miss", "Dr."];

// ── Quote Data Types & Lists ────────────────────────────────────────────────

export type QuoteStatus = "Draft" | "Sent" | "Accepted" | "Declined" | "Expired";

export interface QuoteLineItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  rate: number;
  tax: string;
  amount: number;
}

export interface QuoteItem {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerId: string;
  date: string;
  expiryDate: string;
  referenceNumber: string;
  salesperson: string;
  projectName: string;
  subject: string;
  amount: number;
  status: QuoteStatus;
  items: QuoteLineItem[];
  subTotal: number;
  discountPercent: number;
  discountAmount: number;
  shipping: number;
  adjustment: number;
  total: number;
  customerNotes: string;
  termsAndConditions: string;
  attachments?: string[];
  customerAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customerEmail: string;
}

export const INITIAL_QUOTES: QuoteItem[] = [
  {
    id: "qt-0008",
    quoteNumber: "QT-0008",
    customerName: "Brightway Stores",
    customerId: "cust-2",
    date: "11/04/2026",
    expiryDate: "11/18/2026",
    referenceNumber: "BW-2026-11",
    salesperson: "Sam Taylor",
    projectName: "Store Refresh 2026",
    subject: "Q4 produce and packaging supply quote",
    amount: 84.0,
    status: "Draft",
    items: [
      {
        id: "qli-1",
        name: "Cassava Flour 10kg",
        quantity: 2,
        rate: 24.0,
        tax: "-",
        amount: 48.0,
      },
      {
        id: "qli-2",
        name: "Packaging Boxes",
        quantity: 3,
        rate: 12.0,
        tax: "-",
        amount: 36.0,
      },
    ],
    subTotal: 84.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 84.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions:
      "Payment due within 14 days of acceptance. Prices are valid until the expiry date. Delivery within 3 working days of order.",
    customerAddress: {
      street: "14 Market Street",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS1 6BG",
      country: "United Kingdom",
    },
    customerEmail: "orders@brightway.example",
  },
  {
    id: "qt-0007",
    quoteNumber: "QT-0007",
    customerName: "Acme Foods Ltd",
    customerId: "cust-1",
    date: "11/02/2026",
    expiryDate: "11/16/2026",
    referenceNumber: "AF-2026-88",
    salesperson: "Sam Taylor",
    projectName: "Wholesale Order",
    subject: "Bulk Organic Rice supply",
    amount: 156.0,
    status: "Draft",
    items: [
      {
        id: "qli-3",
        name: "Organic Rice 25kg",
        quantity: 2,
        rate: 78.0,
        tax: "-",
        amount: 156.0,
      },
    ],
    subTotal: 156.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 156.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions:
      "Payment due within 14 days of acceptance. Prices are valid until the expiry date. Delivery within 3 working days of order.",
    customerAddress: {
      street: "42 High Street",
      city: "Birmingham",
      state: "West Midlands",
      zip: "B2 4XJ",
      country: "United Kingdom",
    },
    customerEmail: "contact@acmefoods.co.uk",
  },
  {
    id: "qt-0006",
    quoteNumber: "QT-0006",
    customerName: "Casey Brown",
    customerId: "cust-5",
    date: "10/28/2026",
    expiryDate: "11/11/2026",
    referenceNumber: "CB-2026-04",
    salesperson: "Sam Taylor",
    projectName: "Private Catering Supplies",
    subject: "Palm Oil seasonal batch",
    amount: 84.0,
    status: "Sent",
    items: [
      {
        id: "qli-4",
        name: "Palm Oil 5L",
        quantity: 4,
        rate: 21.0,
        tax: "-",
        amount: 84.0,
      },
    ],
    subTotal: 84.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 84.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Payment due within 14 days of acceptance.",
    customerAddress: {
      street: "8 Victoria Road",
      city: "Manchester",
      state: "Greater Manchester",
      zip: "M14 6XL",
      country: "United Kingdom",
    },
    customerEmail: "casey.brown@outlook.example",
  },
  {
    id: "qt-0005",
    quoteNumber: "QT-0005",
    customerName: "Sterling Interiors",
    customerId: "cust-4",
    date: "10/24/2026",
    expiryDate: "11/07/2026",
    referenceNumber: "SI-2026-19",
    salesperson: "Sam Taylor",
    projectName: "Studio Renovation Consulting",
    subject: "Consulting advisory package",
    amount: 220.0,
    status: "Expired",
    items: [
      {
        id: "qli-5",
        name: "Business Setup Consulting",
        quantity: 2,
        rate: 110.0,
        tax: "-",
        amount: 220.0,
      },
    ],
    subTotal: 220.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 220.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Prices are valid until the expiry date.",
    customerAddress: {
      street: "27 Regent Street",
      city: "London",
      state: "Greater London",
      zip: "SW1Y 4PE",
      country: "United Kingdom",
    },
    customerEmail: "accounts@sterlinginteriors.co.uk",
  },
  {
    id: "qt-0004",
    quoteNumber: "QT-0004",
    customerName: "Harvest Tables Ltd",
    customerId: "cust-3",
    date: "10/20/2026",
    expiryDate: "11/03/2026",
    referenceNumber: "HT-2026-31",
    salesperson: "Sam Taylor",
    projectName: "Autumn Produce Supply",
    subject: "Fresh organic seasonal produce",
    amount: 450.0,
    status: "Accepted",
    items: [
      {
        id: "qli-6",
        name: "Food Farm",
        quantity: 2,
        rate: 225.0,
        tax: "-",
        amount: 450.0,
      },
    ],
    subTotal: 450.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 450.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Payment due within 14 days of acceptance.",
    customerAddress: {
      street: "5 Mill Lane",
      city: "Sheffield",
      state: "South Yorkshire",
      zip: "S1 2GU",
      country: "United Kingdom",
    },
    customerEmail: "supplies@harvesttables.example",
  },
  {
    id: "qt-0003",
    quoteNumber: "QT-0003",
    customerName: "Northfield Cafe",
    customerId: "cust-6",
    date: "10/15/2026",
    expiryDate: "10/29/2026",
    referenceNumber: "NC-2026-09",
    salesperson: "Sam Taylor",
    projectName: "Spices Regular Reorder",
    subject: "Ground Pepper 500g catering quote",
    amount: 96.0,
    status: "Declined",
    items: [
      {
        id: "qli-7",
        name: "Ground Pepper 500g",
        quantity: 12,
        rate: 8.0,
        tax: "-",
        amount: 96.0,
      },
    ],
    subTotal: 96.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 96.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Prices are valid until the expiry date.",
    customerAddress: {
      street: "18 Northfield Avenue",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS6 2QJ",
      country: "United Kingdom",
    },
    customerEmail: "orders@northfieldcafe.co.uk",
  },
  {
    id: "qt-0002",
    quoteNumber: "QT-0002",
    customerName: "Brightway Stores",
    customerId: "cust-2",
    date: "10/12/2026",
    expiryDate: "10/26/2026",
    referenceNumber: "BW-2026-08",
    salesperson: "Sam Taylor",
    projectName: "Grain Distribution Q4",
    subject: "Bulk Organic Rice supply quote",
    amount: 312.0,
    status: "Sent",
    items: [
      {
        id: "qli-8",
        name: "Organic Rice 25kg",
        quantity: 8,
        rate: 39.0,
        tax: "-",
        amount: 312.0,
      },
    ],
    subTotal: 312.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 312.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Payment due within 14 days of acceptance.",
    customerAddress: {
      street: "14 Market Street",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS1 6BG",
      country: "United Kingdom",
    },
    customerEmail: "orders@brightway.example",
  },
  {
    id: "qt-0001",
    quoteNumber: "QT-0001",
    customerName: "Acme Foods Ltd",
    customerId: "cust-1",
    date: "10/08/2026",
    expiryDate: "10/22/2026",
    referenceNumber: "AF-2026-72",
    salesperson: "Sam Taylor",
    projectName: "Bakery Staples",
    subject: "Cassava Flour bakery quote",
    amount: 168.0,
    status: "Accepted",
    items: [
      {
        id: "qli-9",
        name: "Cassava Flour 10kg",
        quantity: 7,
        rate: 24.0,
        tax: "-",
        amount: 168.0,
      },
    ],
    subTotal: 168.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 168.0,
    customerNotes: "Looking forward for your business.",
    termsAndConditions: "Payment due within 14 days of acceptance.",
    customerAddress: {
      street: "42 High Street",
      city: "Birmingham",
      state: "West Midlands",
      zip: "B2 4XJ",
      country: "United Kingdom",
    },
    customerEmail: "contact@acmefoods.co.uk",
  },
];

export const QUOTE_TAX_OPTIONS = [
  "Select a Tax",
  "VAT Standard (20%)",
  "VAT Reduced (5%)",
  "Zero Rated (0%)",
];

export const QUOTE_SALESPERSONS = ["None", "Sam Taylor"];

export const QUOTE_PROJECTS_BY_CUSTOMER: Record<string, string[]> = {
  "Northfield Cafe": ["Spring Catering Order", "Spices Regular Reorder"],
  "Brightway Stores": ["Store Refresh 2026", "Grain Distribution Q4"],
  "Acme Foods Ltd": ["Wholesale Order", "Bakery Staples"],
  "Harvest Tables Ltd": ["Autumn Produce Supply"],
  "Sterling Interiors": ["Studio Renovation Consulting"],
  "Casey Brown": ["Private Catering Supplies"],
};

// -------------------------------------------------------------
// Invoices Types and Data (Part 4: Sales > Invoices)
// -------------------------------------------------------------

export type InvoiceStatus =
  | "All"
  | "Draft"
  | "Sent"
  | "Unpaid"
  | "Partially Paid"
  | "Paid"
  | "Overdue";

export interface InvoiceLineItem {
  id: string;
  name: string;
  quantity: number;
  rate: number;
  tax: string;
  amount: number;
}

export interface PaymentInstallment {
  id: string;
  label?: string;
  dueDate: string;
  amount: number;
}

export interface PaymentPlan {
  type: "none" | "flexible" | "scheduled";
  pin?: string;
  installments: PaymentInstallment[];
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerId: string;
  date: string;
  dueDate: string;
  terms: string;
  orderNumber?: string;
  accountsReceivable?: string;
  salesperson?: string;
  subject?: string;
  amount: number;
  amountPaid: number;
  balanceDue: number;
  status: "Draft" | "Sent" | "Partially Paid" | "Paid" | "Overdue";
  deliveryPending?: boolean;
  items: InvoiceLineItem[];
  subTotal: number;
  discountPercent: number;
  discountAmount: number;
  shipping: number;
  adjustment: number;
  total: number;
  customerNotes?: string;
  termsAndConditions?: string;
  attachments?: string[];
  customerAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  customerEmail?: string;
  paymentPlan?: PaymentPlan;
}

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "inv-10010",
    invoiceNumber: "INV10010",
    customerName: "Acme Foods Ltd",
    customerId: "cust-1",
    date: "11/4/2026",
    dueDate: "12/4/2026",
    terms: "Net 30",
    orderNumber: "PO-9102",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "Wholesale grain supply",
    amount: 312.0,
    amountPaid: 0.0,
    balanceDue: 312.0,
    status: "Sent",
    deliveryPending: false,
    items: [
      {
        id: "ili-1",
        name: "Organic Rice 25kg",
        quantity: 6,
        rate: 52.0,
        tax: "VAT Standard (20%)",
        amount: 312.0,
      },
    ],
    subTotal: 312.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 312.0,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due within 30 days of the invoice date.",
    customerAddress: {
      street: "42 High Street",
      city: "Birmingham",
      state: "West Midlands",
      zip: "B2 4XJ",
      country: "United Kingdom",
    },
    customerEmail: "contact@acmefoods.co.uk",
  },
  {
    id: "inv-10008",
    invoiceNumber: "INV10008",
    customerName: "Brightway Stores",
    customerId: "cust-2",
    date: "11/2/2026",
    dueDate: "11/2/2026",
    terms: "Due on Receipt",
    orderNumber: "",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "",
    amount: 20.0,
    amountPaid: 0.0,
    balanceDue: 20.0,
    status: "Sent",
    deliveryPending: true,
    items: [
      {
        id: "ili-2",
        name: "Reusable Tote Bag",
        quantity: 1,
        rate: 20.0,
        tax: "-",
        amount: 20.0,
      },
    ],
    subTotal: 20.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 20.0,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "14 Market Street",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS1 6BG",
      country: "United Kingdom",
    },
    customerEmail: "orders@brightway.example",
    paymentPlan: {
      type: "none",
      installments: [],
    },
  },
  {
    id: "inv-10007",
    invoiceNumber: "INV10007",
    customerName: "Brightway Stores",
    customerId: "cust-2",
    date: "11/2/2026",
    dueDate: "11/2/2026",
    terms: "Due on Receipt",
    orderNumber: "PO-8812",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "Speciality pantry order",
    amount: 100.8,
    amountPaid: 0.0,
    balanceDue: 100.8,
    status: "Draft",
    deliveryPending: true,
    items: [
      {
        id: "ili-3",
        name: "Honey Beans 1kg",
        quantity: 4,
        rate: 9.0,
        tax: "-",
        amount: 36.0,
      },
      {
        id: "ili-4",
        name: "Cold Pressed Juice 1L",
        quantity: 8,
        rate: 8.1,
        tax: "-",
        amount: 64.8,
      },
    ],
    subTotal: 100.8,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 100.8,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "14 Market Street",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS1 6BG",
      country: "United Kingdom",
    },
    customerEmail: "orders@brightway.example",
  },
  {
    id: "inv-10006",
    invoiceNumber: "INV10006",
    customerName: "Sterling Interiors",
    customerId: "cust-5",
    date: "10/21/2026",
    dueDate: "10/21/2026",
    terms: "Due on Receipt",
    orderNumber: "",
    accountsReceivable: "Accounts Receivable",
    salesperson: "None",
    subject: "",
    amount: 84.0,
    amountPaid: 0.0,
    balanceDue: 84.0,
    status: "Sent",
    deliveryPending: false,
    items: [
      {
        id: "ili-5",
        name: "Reusable Tote Bag",
        quantity: 4,
        rate: 21.0,
        tax: "-",
        amount: 84.0,
      },
    ],
    subTotal: 84.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 84.0,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "29 St Pauls Square",
      city: "Birmingham",
      state: "West Midlands",
      zip: "B3 1QZ",
      country: "United Kingdom",
    },
    customerEmail: "office@sterlinginteriors.example",
  },
  {
    id: "inv-10003",
    invoiceNumber: "INV10003",
    customerName: "Harvest Tables Ltd",
    customerId: "cust-3",
    date: "10/21/2026",
    dueDate: "10/21/2026",
    terms: "Due on Receipt",
    orderNumber: "HT-OCT-21",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "Autumn produce bulk supply",
    amount: 100.8,
    amountPaid: 0.0,
    balanceDue: 100.8,
    status: "Sent",
    deliveryPending: false,
    items: [
      {
        id: "ili-6",
        name: "Cold Pressed Juice 1L",
        quantity: 12,
        rate: 8.4,
        tax: "-",
        amount: 100.8,
      },
    ],
    subTotal: 100.8,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 100.8,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "5 Mill Lane",
      city: "Sheffield",
      state: "South Yorkshire",
      zip: "S1 2GU",
      country: "United Kingdom",
    },
    customerEmail: "supplies@harvesttables.example",
    paymentPlan: {
      type: "none",
      installments: [],
    },
  },
  {
    id: "inv-10000",
    invoiceNumber: "INV10000",
    customerName: "Northfield Cafe",
    customerId: "cust-6",
    date: "10/21/2026",
    dueDate: "10/21/2026",
    terms: "Due on Receipt",
    orderNumber: "NC-2026-10",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "Cafe staple reorder",
    amount: 84.0,
    amountPaid: 20.0,
    balanceDue: 64.0,
    status: "Partially Paid",
    deliveryPending: false,
    items: [
      {
        id: "ili-7",
        name: "Organic Rice 25kg",
        quantity: 2,
        rate: 42.0,
        tax: "-",
        amount: 84.0,
      },
    ],
    subTotal: 84.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 84.0,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "18 Northfield Avenue",
      city: "Leeds",
      state: "West Yorkshire",
      zip: "LS6 2QJ",
      country: "United Kingdom",
    },
    customerEmail: "orders@northfieldcafe.co.uk",
  },
  {
    id: "inv-09999",
    invoiceNumber: "INV09999",
    customerName: "Casey Brown",
    customerId: "cust-4",
    date: "10/18/2026",
    dueDate: "10/18/2026",
    terms: "Due on Receipt",
    orderNumber: "",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "",
    amount: 84.0,
    amountPaid: 0.0,
    balanceDue: 84.0,
    status: "Draft",
    deliveryPending: false,
    items: [
      {
        id: "ili-8",
        name: "Organic Rice 25kg",
        quantity: 2,
        rate: 42.0,
        tax: "-",
        amount: 84.0,
      },
    ],
    subTotal: 84.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 84.0,
    customerNotes: "Thanks for your business.",
    termsAndConditions: "Payment is due upon receipt of invoice.",
    customerAddress: {
      street: "8 Victoria Road",
      city: "Manchester",
      state: "Greater Manchester",
      zip: "M14 6AB",
      country: "United Kingdom",
    },
    customerEmail: "casey.brown@acme.example",
  },
  {
    id: "inv-0006",
    invoiceNumber: "INV-0006",
    customerName: "Acme Foods Ltd",
    customerId: "cust-1",
    date: "10/15/2026",
    dueDate: "10/15/2026",
    terms: "Due on Receipt",
    orderNumber: "AF-OLD-6",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "Bulk flour supply",
    amount: 252.0,
    amountPaid: 0.0,
    balanceDue: 252.0,
    status: "Overdue",
    deliveryPending: false,
    items: [
      {
        id: "ili-9",
        name: "Cassava Flour 10kg",
        quantity: 10,
        rate: 25.2,
        tax: "-",
        amount: 252.0,
      },
    ],
    subTotal: 252.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 252.0,
    customerNotes: "Overdue invoice notice.",
    termsAndConditions: "Payment is overdue. Immediate settlement requested.",
    customerAddress: {
      street: "42 High Street",
      city: "Birmingham",
      state: "West Midlands",
      zip: "B2 4XJ",
      country: "United Kingdom",
    },
    customerEmail: "contact@acmefoods.co.uk",
  },
  {
    id: "inv-0005",
    invoiceNumber: "INV-0005",
    customerName: "Harvest Tables Ltd",
    customerId: "cust-3",
    date: "9/30/2026",
    dueDate: "9/30/2026",
    terms: "Due on Receipt",
    orderNumber: "HT-SEP-30",
    accountsReceivable: "Accounts Receivable",
    salesperson: "Sam Taylor",
    subject: "September bulk produce",
    amount: 420.0,
    amountPaid: 420.0,
    balanceDue: 0.0,
    status: "Paid",
    deliveryPending: false,
    items: [
      {
        id: "ili-10",
        name: "Organic Rice 25kg",
        quantity: 10,
        rate: 42.0,
        tax: "-",
        amount: 420.0,
      },
    ],
    subTotal: 420.0,
    discountPercent: 0,
    discountAmount: 0,
    shipping: 0,
    adjustment: 0,
    total: 420.0,
    customerNotes: "Paid in full. Thank you!",
    termsAndConditions: "Receipt and settlement acknowledged.",
    customerAddress: {
      street: "5 Mill Lane",
      city: "Sheffield",
      state: "South Yorkshire",
      zip: "S1 2GU",
      country: "United Kingdom",
    },
    customerEmail: "supplies@harvesttables.example",
  },
];

export const INVOICE_TERMS_OPTIONS = [
  "Due on Receipt",
  "Net 15",
  "Net 30",
  "Net 45",
  "Net 60",
];

export const INVOICE_STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "draft", label: "Draft" },
  { id: "sent", label: "Sent" },
  { id: "unpaid", label: "Unpaid" },
  { id: "partially-paid", label: "Partially Paid" },
  { id: "paid", label: "Paid" },
  { id: "overdue", label: "Overdue" },
];



