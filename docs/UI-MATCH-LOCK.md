# UI MATCH: SNAARP LOCK (Password Manager)
Reference recording: `C:\Users\HP\Downloads\1109(1).mp4` (1386x720, 6:04).
Target design width: 1440px. Route: `/tutorials/snaarp-lock`. Config: `tutorials/snaarp-lock.ts`.

---

## 1. App Shell (Suite Rail, Sidebar, Top Bar)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `suite-rail` | Far left column | Width ~54px, full height | Background `#F6F6F6`, border-r `#E5E7EB` | Vertical app icons with labels: Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Me, CRM, Logout at bottom |
| `suite-rail-lock` | Suite rail item 9 | ~44x44px pill | Background `#EDE9FE`, text `#7C3AED` | Lock icon, label "Lock" |
| `sidebar` | Left navigation | Width ~240px, full height | Background `#FFFFFF`, border-r `#EBECEF` | Logo row, 4 nav items, Report a Bug at bottom |
| `sidebar-logo` | Top of sidebar | ~240x60px, px-5 py-4 | Purple tile `#7014D9` with white "S" | Bold "SnaarpLock" (15px `#111827`), subtitle "PASSWORD MANAGER" (9px uppercase `#9CA3AF`) |
| `sidebar-nav` | Middle of sidebar | Spacing `gap-1`, px-3 py-2 | Font 13px Poppins Medium | 4 items: Dashboard, Vaults, Organizations, Import |
| `nav-lock-dashboard` | Sidebar item 1 | Rounded-lg px-3 py-2.5 | Active: bg `#F3E8FF`, text `#7C3AED`, right purple dot | LayoutDashboard icon, "Dashboard" |
| `nav-lock-vaults` | Sidebar item 2 | Rounded-lg px-3 py-2.5 | Inactive: text `#4B5563`, hover bg `#F9FAFB` | Shield/Lock icon, "Vaults" |
| `nav-lock-orgs` | Sidebar item 3 | Rounded-lg px-3 py-2.5 | Inactive: text `#4B5563` | Building2 icon, "Organizations" |
| `nav-lock-import` | Sidebar item 4 | Rounded-lg px-3 py-2.5 | Inactive: text `#4B5563` | ArrowDownToLine icon, "Import" |
| `sidebar-bug-btn` | Bottom of sidebar | Pinned at bottom, px-4 py-3 | Text `#EF4444`, hover bg `#FEF2F2` | Bug icon, "Report a Bug" |
| `topbar` | Top of content area | Height ~56px, border-b `#E5E7EB` | Background `#FFFFFF`, px-6 | Search box center/left, apps grid & avatar right |
| `topbar-search` | Left of topbar | Width ~380px, height ~36px | Input bg `#F3F4F6`, border `#E5E7EB`, rounded-full | Search icon, placeholder "Search vault items..." |
| `topbar-grid-btn` | Right of topbar | 32x32px, text `#6B7280` | Hover bg `#F3F4F6`, rounded-lg | 3x3 apps grid icon |
| `topbar-avatar` | Far right of topbar | 32x32px, rounded-full | Background `#7014D9`, text `#FFFFFF` | Initial "J" (Jane Doe) |

---

## 2. Screen 1: Dashboard (`lock.snaarp.com/dashboard`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `dash-header` | Content top | Full width, mb-6 | Title 20px bold `#111827`, sub 12px `#6B7280` | "Dashboard", "Overview of your password vault security" |
| `badge-synced` | Header top right | Height ~28px, px-3, rounded-full | Bg `#ECFDF5`, border `#A7F3D0`, text `#059669` | RefreshCw icon (animate spin on hover), "Synced" |
| `dash-stats-grid` | Below header | 4-column grid, gap-4 | White cards, border `#E5E7EB`, rounded-xl, p-4, shadow-sm | 4 KPI cards |
| `stat-card-vaults` | Stat col 1 | Flex col, gap-2 | Icon tile `#F3E8FF`, icon `#7C3AED` | Lock icon, bold "1", "Total Vaults", green badge "+100%" |
| `stat-card-items` | Stat col 2 | Flex col, gap-2 | Icon tile `#F1F5F9`, icon `#64748B` | Shield icon, bold "2", "Secured Items", green badge "+100%" |
| `stat-card-devices`| Stat col 3 | Flex col, gap-2 | Icon tile `#CCFBF1`, icon `#0D9488` | Smartphone icon, bold "1", "Active Devices", green badge "+100%" |
| `stat-card-sync` | Stat col 4 | Flex col, gap-2 | Icon tile `#FEF3C7`, icon `#D97706` | Clock icon, bold "02:17 PM", "Last Sync" |
| `dash-lower-grid` | Below stats | 2-column layout (left ~45%, right ~55%) | Gap-6 | Connected Devices & Recent Vaults (left), Generator (right) |
| `card-connected-dev`| Left col top | White card, border `#E5E7EB`, rounded-xl, p-5 | Header with Monitor icon in teal tile `#CCFBF1` | "Connected Devices", purple link "Manage ->" |
| `dev-row-chrome` | Inside dev card | Row, items-center, justify-between | Monitor icon, bold "Chrome", grey "Windows • 02:13 PM" | Green online dot `#10B981` on right |
| `card-recent-vaults`| Left col bottom | White card, border `#E5E7EB`, rounded-xl, p-5 | Header with Lock icon in purple tile `#F3E8FF` | "Recent Vaults", purple link "View all ->" |
| `vault-row-social` | Inside recent vaults | Row, hover bg `#F9FAFB`, rounded-lg p-2.5 | Bold "Social Vault", right pill bg `#F3F4F6` text `#4B5563` | "2 items" |
| `card-generator` | Right col | White card, border `#E5E7EB`, rounded-xl, p-5 | Header with Wand2 icon in purple tile `#F3E8FF` | "Password Generator" |
| `gen-segmented` | Inside generator | Segmented pill container, p-1 bg `#F3F4F6` rounded-lg | Active tab bg `#FFFFFF` text `#7C3AED` font-medium shadow-xs | [ Password | Passphrase ] |
| `gen-slider-len` | Password tab | Row with label "Length", value number `#7C3AED` | Range slider with purple track `#7C3AED` | Number "16", range 8 to 64 |
| `gen-checkbox-upper`| Password options | Rounded checkbox, purple `#7C3AED` | Label text 12px `#374151` | "Uppercase (A-Z)" |
| `gen-checkbox-lower`| Password options | Rounded checkbox, purple `#7C3AED` | Label text 12px `#374151` | "Lowercase (a-z)" |
| `gen-checkbox-num` | Password options | Rounded checkbox, purple `#7C3AED` | Label text 12px `#374151` | "Numbers (0-9)" |
| `gen-checkbox-sym` | Password options | Rounded checkbox, purple `#7C3AED` | Label text 12px `#374151` | "Symbols (!@#$)" |
| `gen-btn-generate` | Password tab | Full width button, h-10, rounded-lg | Bg `#7C3AED`, text `#FFFFFF`, hover bg `#6D28D9` | RefreshCw icon, "Generate" |
| `gen-result-box` | Password result | Bg `#F3F4F6`, border `#E5E7EB`, rounded-lg, px-3 py-2.5 | Font mono 13px `#111827`, copy button on right | Generated password string, Copy icon |
| `gen-slider-words` | Passphrase tab | Row with label "Words", value number `#7C3AED` | Range slider with purple track | Number "4", range 3 to 10 |
| `gen-input-sep` | Passphrase tab | Row with label "Separator", input w-12 text-center | Border `#D1D5DB`, rounded, h-8 | "-" |
| `gen-pass-result` | Passphrase result | Bg `#F3F4F6`, border `#E5E7EB`, rounded-lg, px-3 py-2.5 | Font mono 13px `#111827`, copy button | "best-announce-burger-cancel", Copy icon |

---

## 3. Screen 2: Devices (`lock.snaarp.com/settings/devices`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `devices-header` | Top of content | Title 20px bold, sub 12px grey | Red outlined button top right | "Devices", "Manage active sessions and connected devices" |
| `btn-revoke-all` | Header top right | Border `#FCA5A5`, text `#EF4444`, bg `#FFFFFF`, rounded-lg | AlertTriangle icon, "Revoke All Others" |
| `devices-list` | Main container | Column of cards, width ~440px, scrollable | White cards, border `#E5E7EB`, rounded-xl, p-3.5, gap-2.5 | 9 device cards (1 Active, 8 Inactive) |
| `device-card-active`| Card 1 | Width ~440px, bg `#FFFFFF` | Green monitor tile `#ECFDF5` with icon `#059669` | "Snaarp SSO" bold, "Chrome • Windows • 203.0.113.10", "Last active: Today at 02:13 PM" |
| `badge-dev-active` | Inside card 1 | Pill bg `#ECFDF5`, text `#059669`, wifi icon | Green pill | "Active" |
| `btn-revoke-1` | Inside card 1 | Text `#EF4444`, hover underline, trash icon | Red text button | "Revoke" |
| `device-card-inact` | Cards 2 to 9 | Width ~440px, bg `#FFFFFF` | Grey monitor tile `#F1F5F9` with icon `#64748B` | "Snaarp SSO" bold, "Chrome • Windows • 203.0.113.xx", "Last active: 11/08/2026 09:30 AM" |
| `badge-dev-inact` | Cards 2 to 9 | Pill bg `#F3F4F6`, text `#6B7280` | Grey pill | "Inactive" |
| `btn-revoke-row` | Cards 2 to 9 | Text `#EF4444`, hover underline, trash icon | Red text button | "Revoke" |

---

## 4. Screen 3: Vaults (`lock.snaarp.com/vaults`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `vaults-header` | Top of content | Title 20px bold, sub 12px grey | Purple button top right | "Vaults", "Organize and manage your credential vaults" |
| `btn-new-vault` | Header top right | Bg `#7C3AED`, text `#FFFFFF`, rounded-lg, px-4 py-2 | Plus icon, "+ New Vault" |
| `box-create-vault` | Below header (when open)| Full-width white card, border `#E5E7EB`, rounded-xl, p-4 | Title "Create New Vault" with Plus icon | Input "Enter vault name...", purple button "Create", "x" icon |
| `vaults-grid` | Main content | Grid of ~175px cards, gap-4 | White card, border `#E5E7EB`, rounded-xl, p-4, shadow-xs | Vault cards |
| `vault-card-social` | Grid item 1 | Width ~175px, min-h-[160px] | Purple lock tile `#F3E8FF`, hover lift, name turns purple | Lock icon, bold "Social Vault", box icon "2 items", clock icon "6/15/2026" |
| `vault-card-actions`| Bottom of card (hover)| Row justify-between, pt-2 border-t `#F3F4F6` | Pencil "Rename" (`#6B7280`), Trash "Delete" (`#EF4444`) | Small text buttons |
| `vault-card-personal`| Grid item 2 (new) | Width ~175px, min-h-[160px] | Purple lock tile `#F3E8FF` | Lock icon, bold "Personal Lock", box icon "0 items", clock icon "Today" |

---

## 5. Screen 4: Vault Items (`lock.snaarp.com/vaults/<id>`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `btn-vault-back` | Top left | Circle/rounded button, hover bg `#F3F4F6` | Text `#4B5563`, ArrowLeft icon | Back arrow |
| `vault-items-title` | Top row | Title 20px bold `#111827`, sub 12px `#6B7280` | Flex col | "Vault Items", "2 total items" (or "4 total items", "0 total items") |
| `input-items-search`| Top right | Width ~220px, h-9, rounded-lg | Input bg `#FFFFFF`, border `#D1D5DB` | Search icon, "Search items..." |
| `btn-add-item` | Top far right | Bg `#7C3AED`, text `#FFFFFF`, rounded-lg, px-3.5 py-2 | Plus icon, "+ Add Item" |
| `chips-item-types` | Below title row | Row of 5 chips, gap-2 | Inactive: bg `#FFFFFF` border `#E5E7EB` text `#4B5563`; Active: bg `#7C3AED` text `#FFFFFF` | All (Grid), Login (Key), Secure Note (FileText), Credit Card (CreditCard), Identity (UserCircle) |
| `items-grid` | Main body | Grid of cards ~140px wide, gap-4 | White card, border `#E5E7EB`, rounded-xl, overflow-hidden | Items list |
| `item-card` | Inside grid | Width ~140px, rounded-xl | Top tile bg `#F3F4F6` (or brand logo), bottom info bg `#FFFFFF` | Top: large icon/logo. Bottom: bold title, grey subtitle, badge pill with type |
| `empty-vault-card` | When vault empty | Centered white card ~360px wide, border `#E5E7EB`, rounded-2xl, p-8, text-center | Purple key tile `#F3E8FF` | "No items yet", "Add your first credential to this vault.", purple button "+ Add First Item" |

---

## 6. Screen 5: Add New Item Modal

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `modal-backdrop` | Fixed full screen | Dark overlay `bg-black/40` | Backdrop blur-xs | Overlay |
| `add-item-modal` | Center of screen | Width ~360px, bg `#FFFFFF`, rounded-2xl, p-6, shadow-2xl | Pinned header & footer | Modal container |
| `modal-header` | Top of modal | Title 16px bold `#111827`, sub 12px `#6B7280` | "x" close button top right | "Add New Item", "Save new credentials to your vault" |
| `type-picker-grid` | Below header | 4-column tiles, gap-2 | Inactive: bg `#FFFFFF`, border `#E5E7EB`; Active: bg `#F3E8FF`, border `#7C3AED` | 4 tiles: Login (Key), Note (FileText), Card (CreditCard), Identity (UserCircle) |
| `field-login-name` | Login type | Label 11px uppercase `#6B7280`, input h-9 | Border `#D1D5DB`, focus ring `#7C3AED` | Key icon, placeholder "e.g. Google, Netflix, Bank..." |
| `field-login-url` | Login type | Label 11px, input h-9 | Border `#D1D5DB` | Globe icon, placeholder "https://example.com" |
| `field-login-user` | Login type | Label 11px, input h-9 | Border `#D1D5DB` | User icon, placeholder "you@example.com" |
| `field-login-pass` | Login type | Label 11px, input h-9 | Border `#D1D5DB`, Eye icon on right | Lock icon, placeholder "••••••••••••" |
| `field-login-notes`| Login type | Label 11px, textarea h-16 | Border `#D1D5DB` | FileText icon, placeholder "Additional notes (optional)" |
| `field-note-name` | Note type | Label 11px, input h-9 | Border `#D1D5DB` | FileText icon, placeholder "e.g. WiFi Password, Server Key..." |
| `field-note-body` | Note type | Label 11px, textarea h-28 | Border `#D1D5DB` | Placeholder "Your secure note..." |
| `field-card-name` | Card type | Label 11px, input h-9 | Border `#D1D5DB` | CreditCard icon, placeholder "e.g. Personal Visa, Corporate Card..." |
| `field-card-holder`| Card type | Label 11px, input h-9 | Border `#D1D5DB` | User icon, placeholder "John Doe" |
| `field-card-num` | Card type | Label 11px, input h-9 | Border `#D1D5DB` | CreditCard icon, placeholder "4242 4242 4242 4242" |
| `field-card-mmyy` | Card type | 3 fields row: Month, Year, CVV | Border `#D1D5DB`, text-center | "MM", "YYYY", "123" |
| `field-id-name` | Identity type | Label 11px, input h-9 | Border `#D1D5DB` | UserCircle icon, placeholder "e.g. Passport, Driver License..." |
| `field-id-names` | Identity type | 2 fields row: First Name, Last Name | Border `#D1D5DB` | "John", "Doe" |
| `field-id-email` | Identity type | Label 11px, input h-9 | Border `#D1D5DB` | Mail icon, "john@example.com" |
| `field-id-phone` | Identity type | Label 11px, input h-9 | Border `#D1D5DB` | Phone icon, "+1 (555) 000-0000" |
| `field-id-address` | Identity type | Label 11px, textarea h-14 | Border `#D1D5DB` | MapPin icon, "123 Main St, City, Country" |
| `btn-modal-cancel` | Modal footer left | Text `#6B7280`, hover text `#111827` | Flat text button | "Cancel" |
| `btn-modal-save` | Modal footer right| Bg `#7C3AED`, text `#FFFFFF`, rounded-lg px-4 py-2 | Save icon, hover bg `#6D28D9` | "Save to Vault" |

---

## 7. Screen 6: Edit Item Modal

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `edit-modal` | Center of screen | Width ~360px, bg `#FFFFFF`, rounded-2xl, p-6 | Pinned header & footer | Edit item container |
| `edit-header` | Modal header | Row items-center justify-between | ArrowLeft icon, bold title ("Google" / "GitHub") | Details & Advanced tabs on right |
| `tab-edit-details` | Header tab 1 | Active: text `#7C3AED`, border-b-2 `#7C3AED` | Font medium 12px | "Details" |
| `tab-edit-adv` | Header tab 2 | Inactive: text `#6B7280` | Font medium 12px | "Advanced" |
| `edit-field-title` | Form field 1 | Label "Login Title", input h-9 | Border `#D1D5DB` | "Google" (edited to "GitHub") |
| `edit-field-url` | Form field 2 | Label "Website URL", input h-9 | ExternalLink icon on right | "www.google.com" (edited to "https://github.com/example/sample") |
| `edit-field-user` | Form field 3 | Label "Username", input h-9 | Copy icon on right | "jane@example.com" |
| `edit-field-pass` | Form field 4 | Label "Password", input h-9 | Eye & Copy icons on right | "••••••••••••" |
| `edit-field-notes` | Form field 5 | Label "Notes", textarea h-16 | Border `#D1D5DB` | "Just for personal use" |
| `btn-edit-remove` | Footer left | Text `#EF4444`, hover bg `#FEF2F2`, rounded px-2 py-1.5 | Trash icon | "Remove" |
| `btn-edit-cancel` | Footer right 1 | Text `#6B7280`, hover text `#111827` | Flat text button | "Cancel" |
| `btn-edit-save` | Footer right 2 | Bg `#5147C9`, text `#FFFFFF`, rounded-lg px-4 py-2 | Blue-violet filled button (`#5147C9`) | "Save" |

---

## 8. In-App Toasts

| Toast | Trigger | Visuals |
|---|---|---|
| "Copied to clipboard" | Clicking copy on generated password/passphrase | White pill, green checkmark `#10B981`, text 12px bold `#111827`, top-right |
| "Device session revoked" | Clicking Revoke or Revoke All Others | White pill, green checkmark, text 12px bold, top-right |
| "Vault created successfully" | Creating a new vault | White pill, green checkmark, text 12px bold, top-right |
| "Vault deleted" | Clicking Delete on a vault card | White pill, green checkmark, text 12px bold, top-right |
| "Item saved to vault" | Saving Add Item modal | White pill, green checkmark, text 12px bold, top-right |
| "Item updated" | Saving Edit Item modal | White pill, green checkmark, text 12px bold, top-right |
