# UI MATCH: SNAARP LOCK (Password Manager)
Reference recording: `C:\Users\HP\Downloads\1109(1).mp4` (1386x720, 6:04).
Target design width: 1440px. Route: `/tutorials/snaarp-lock`. Config: `tutorials/snaarp-lock.ts`.

---

## 1. App Shell (Suite Rail, Sidebar, Top Bar)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `suite-rail` | Far left column | Width ~54px, full height | Background `#F6F6F6`, border-r `#E5E7EB` | Vertical app icons with labels: Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Me, CRM, Books, Workforce, Project, Zeus, Verifyrit, and Logout pinned at bottom |
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
| "Organization created successfully" | Creating Acme Studio org | White pill, green checkmark, text 12px bold, top-right |
| "Invitation sent successfully" | Sending invite to john@example.com | White pill, green checkmark, text 12px bold, top-right |
| "Role updated" | Changing role from Member to Admin | White pill, green checkmark, text 12px bold, top-right |
| "Found 142 items to import" | Selecting Chrome Passwords.csv in in-app chooser | White pill, green checkmark, text 12px bold, top-right |
| "Successfully imported 142 items!" | Import progress reaches 100% | White pill, green checkmark, text 12px bold, top-right |

---

## 9. Screen 7: Organizations List (`lock.snaarp.com/organizations`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `orgs-header` | Content top | Full width, mb-6 | Title 20px bold `#111827`, sub 12px `#6B7280` | "Organizations", "Collaborate and share vaults with your team" |
| `btn-create-org` | Header top right | Height ~36px, px-4, rounded-lg | Bg `#7C3AED`, text `#FFFFFF`, hover bg `#6D28D9` | Plus icon, "+ Create Organization" |
| `box-create-org` | Above list (when open) | Full width white card, border `#E5E7EB`, rounded-xl, p-4, mb-6, shadow-xs | Header with Building2 icon | "Create New Organization", close button "x" |
| `input-org-name` | Inside create card | Width ~380px, h-9, rounded-lg | Border `#D1D5DB`, focus border `#7C3AED` | Placeholder "Organization name (1-100 characters)" |
| `btn-submit-org` | Inside create card | Height 36px, px-4, rounded-lg | Bg `#7C3AED`, text `#FFFFFF` | "Create" |
| `btn-close-create-org` | Inside create card right | 28x28px, text `#9CA3AF`, hover text `#4B5563` | Flat icon button | "X" |
| `orgs-grid` | Main content | 3-column grid (or card list), gap-4 | White card, border `#E5E7EB`, rounded-xl, p-4, shadow-xs | Organizations cards (~365px wide) |
| `org-card-studio` | Grid item 1 (new) | Width ~365px, rounded-xl, cursor-pointer | Purple building tile `#EDE9FE` with icon `#7C3AED` | Bold "Acme Studio", Users icon "1 members", Calendar icon "Today", chevron right |
| `org-card-ltd` | Grid item 2 (existing) | Width ~365px, rounded-xl, cursor-pointer | Purple building tile `#EDE9FE` with icon `#7C3AED` | Bold "Acme Ltd", Users icon "1 members", Calendar icon "6/15/2026", chevron right |

---

## 10. Screen 8: Organization Detail (`lock.snaarp.com/organizations/<id>`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `btn-org-back` | Top left | Circle/rounded button, hover bg `#F3F4F6` | Text `#4B5563`, ArrowLeft icon | Back arrow |
| `org-detail-title` | Header next to back | Title 20px bold `#111827`, sub 12px `#6B7280` | Flex col | "Acme Studio", "Manage members and permissions" |
| `card-org-members` | Below header | Width ~500px, bg `#FFFFFF`, border `#E5E7EB`, rounded-xl, p-5, shadow-xs | Header with Users icon in purple tile `#EDE9FE` | Bold "Members", grey count pill "1" / "2", "+ Invite" button |
| `pill-members-count` | Members card header | Pill bg `#F3F4F6`, text `#4B5563`, text-[11px] px-2 py-0.5 rounded-full | Count pill | "1" (then "2") |
| `btn-open-invite` | Members card top right | Height ~32px, px-3, rounded-lg | Bg `#7C3AED`, text `#FFFFFF`, UserPlus icon | "+ Invite" |
| `box-inline-invite` | Inside members card (when open) | Bg `#F9FAFB`, border `#E5E7EB`, rounded-lg, p-3.5, mb-3 | Header with Mail icon "Invite a new member" | Close button "x" |
| `input-invite-email` | Inline invite box | Full width, h-8, rounded-md, text-xs | Border `#D1D5DB`, px-2.5 | Placeholder "member@example.com" |
| `select-invite-role` | Inline invite box | Width ~110px, h-8, rounded-md, text-xs | Border `#D1D5DB`, bg `#FFFFFF`, chevron | "Member" |
| `btn-send-invite` | Inline invite box right | Height 32px, px-3.5, rounded-md, text-xs | Bg `#7C3AED`, text `#FFFFFF` | "Send Invite" |
| `member-row-owner` | Members list row 1 | Row items-center justify-between py-3 border-b `#F3F4F6` | Lilac circle avatar `bg-[#EDE9FE]` text `#7C3AED` with initial "J" | Crown icon, yellow pill `bg-[#FEF3C7] text-[#D97706]` "Owner" |
| `member-row-john` | Members list row 2 | Row items-center justify-between py-3 border-b `#F3F4F6` | Lilac circle avatar `bg-[#EDE9FE]` text `#7C3AED` with initial "J" | User icon, grey pill "Member" (switches to purple "Admin"), role select, remove, transfer |
| `pill-role-member` | Member row 2 badge | Pill bg `#F3F4F6`, text `#4B5563`, text-xs | User icon | "Member" |
| `pill-role-admin` | Member row 2 badge (updated) | Pill bg `#EDE9FE`, text `#7C3AED`, text-xs | Shield icon | "Admin" |
| `select-member-role` | Member row 2 action | Select button / trigger, h-7, px-2, text-xs, border `#E5E7EB` | Dropdown menu: "Member", "Admin" | "Member" (then "Admin") |
| `btn-remove-member` | Member row 2 action | 26x26px, rounded text-[#EF4444] hover bg-[#FEF2F2] | UserMinus icon | Remove button |
| `btn-transfer-owner` | Member row 2 action | 26x26px, rounded text-[#F59E0B] hover bg-[#FFFBEB] | ArrowLeftRight / Repeat icon | Transfer ownership trigger |
| `tooltip-transfer` | Hover on transfer button | Dark pill bg `#1F2937`, text `#FFFFFF`, text-[10px], rounded px-2 py-1 | Tooltip above button | "Transfer ownership" |

---

## 11. Screen 9: Transfer Ownership Modal

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `modal-transfer-backdrop` | Fixed full screen | Dark overlay `bg-black/50` | Backdrop blur-xs | Overlay |
| `modal-transfer-card` | Center screen | Width ~420px, bg `#FFFFFF`, rounded-2xl, p-6, shadow-2xl | Centered content | Modal card |
| `tile-transfer-warning` | Top of card | 44x44px rounded-full bg `#FEF3C7`, text `#D97706` | AlertTriangle / RefreshCw icon | Yellow icon tile |
| `title-transfer` | Below icon | Text 17px bold `#111827`, text-center mt-3 | Heading | "Transfer Ownership" |
| `sub-transfer-warning` | Below title | Text 12px text-[#DC2626] font-medium text-center mt-1 | Warning line | "This action cannot be undone easily" |
| `body-transfer` | Below warning | Text 13px text-[#4B5563] text-center mt-2 leading-relaxed | Body description | "Are you sure you want to transfer ownership? You will be demoted to admin." |
| `btn-transfer-cancel` | Footer left | Width ~48%, h-10, rounded-lg, border `#D1D5DB`, bg `#FFFFFF` | Text `#374151`, font-medium | "Cancel" |
| `btn-transfer-confirm` | Footer right | Width ~48%, h-10, rounded-lg, bg `#F59E0B`, text `#FFFFFF` | Repeat / ArrowLeftRight icon | "Transfer" |

---

## 12. Screen 10: Import Passwords Sources Grid (`lock.snaarp.com/settings/import`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `import-header` | Top of content | Full width, mb-6 | Title 20px bold `#111827`, sub 12px `#6B7280` | "Import Passwords", "Migrate your passwords from another browser or password manager" |
| `import-source-sub` | Below header | Flex items-center gap-2 mb-4 | Upload icon in text `#7C3AED`, text 13px font-semibold `#111827` | "Select source platform" |
| `import-sources-grid` | Main content | 3-column grid (3x3), gap-4 | 9 white cards, border `#E5E7EB`, rounded-xl, p-4, shadow-xs | Source platform cards (~160x85px) |
| `card-import-chrome` | Grid card 1 | Rounded-xl, hover border `#7C3AED`, hover shadow-sm, cursor-pointer | Teal/cyan globe/Chrome tile `#E0F2FE` | "Google Chrome" |
| `card-import-brave` | Grid card 2 | Rounded-xl, cursor-pointer | Orange shield tile `#FFEDD5` | "Brave Browser" |
| `card-import-firefox` | Grid card 3 | Rounded-xl, cursor-pointer | Orange-pink globe tile `#FCE7F3` | "Mozilla Firefox" |
| `card-import-safari` | Grid card 4 | Rounded-xl, cursor-pointer | Light blue compass/globe tile `#E0F2FE` | "Safari" |
| `card-import-1password` | Grid card 5 | Rounded-xl, cursor-pointer | Blue key tile `#DBEAFE` | "1Password" |
| `card-import-bitwarden` | Grid card 6 | Rounded-xl, cursor-pointer | Dark blue shield tile `#E0E7FF` | "Bitwarden" |
| `card-import-dashlane` | Grid card 7 | Rounded-xl, cursor-pointer | Green key tile `#DCFCE7` | "Dashlane" |
| `card-import-truekey` | Grid card 8 | Rounded-xl, cursor-pointer | Pink key tile `#FCE7F3` | "TrueKey" |
| `card-import-dell` | Grid card 9 | Rounded-xl, cursor-pointer | Grey shield tile `#F1F5F9` | "Dell Password Manager" |

---

## 13. Screen 11: Chrome Import & In-App File Chooser

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `btn-chrome-back` | Top left | Circle/rounded button, hover bg `#F3F4F6` | Text `#4B5563`, ArrowLeft icon | Back arrow |
| `chrome-header-title` | Top row next to back | Flex items-center gap-3 | Chrome teal tile `#E0F2FE`, bold title, grey sub | "Google Chrome", "Upload your exported CSV or JSON file" |
| `box-chrome-notice` | Below header | Bg `#EFF6FF`, border `#BFDBFE`, rounded-lg, px-4 py-2.5, mb-5 | Info / HelpCircle icon, text 12px `#1E40AF` | "How to export: Settings -> Passwords -> (three dots) -> Export passwords" |
| `dropzone-chrome` | Below notice | Width full, h-[140px], border-2 border-dashed border-[#DDD6FE], bg-[#FAF5FF], rounded-xl, cursor-pointer | Purple upload icon in `#EDE9FE` tile | "Click to select file", sub "Accepts CSV or JSON file" |
| `dropzone-selected` | Dropzone state after pick | Same container, bg-[#FAF5FF] | FileText / Document icon, text `#7C3AED` bold | "Chrome Passwords.csv" |
| `file-chooser-modal` | Center screen (when open) | Width ~460px, bg `#FFFFFF`, rounded-2xl, p-5, shadow-2xl | Clean in-app dialog, dark overlay | "Select File to Import", sample files list, Cancel, Open |
| `file-row-chrome-csv` | Inside file chooser | Row items-center justify-between p-2.5 rounded-lg hover bg-[#F3E8FF] | FileText icon, bold "Chrome Passwords.csv", grey "CSV File • 18 KB" | Selected row bg `#EDE9FE` |
| `btn-chooser-open` | File chooser footer right | Bg `#7C3AED`, text `#FFFFFF`, rounded-lg px-4 py-2 | Action button | "Open" |
| `btn-chooser-cancel` | File chooser footer left | Text `#6B7280`, rounded px-3 py-2 | Flat text button | "Cancel" |
| `bar-import-summary` | Below dropzone | Row items-center justify-between mt-5 mb-3 | CheckCircle icon `#10B981`, bold "142 items found" | Purple button "Import 142 items" with upload icon |
| `btn-run-import` | Summary row right | Bg `#7C3AED`, text `#FFFFFF`, rounded-lg px-4 py-2 | Upload icon, disabled turns grey `#9CA3AF` | "Import 142 items" |
| `bar-import-progress` | Above table (during import) | Bg `#F3F4F6`, rounded-full h-2 w-full mt-2 overflow-hidden | Purple bar `#7C3AED` transitions 25% -> 60% -> 100% | Text "Importing... 25%" / "60%" / "100%" |
| `table-import-items` | Below summary/progress | Full width, bg `#FFFFFF`, border `#E5E7EB`, rounded-xl, overflow-hidden | Table header bg `#F9FAFB`, scrollable body | Headers: Name | URL | Username |
| `table-footer-count` | Below table rows | Px-4 py-2 text-xs text-[#6B7280] bg `#F9FAFB` border-t `#E5E7EB` | Counter line | "Showing 10 of 142 items" |
| `card-import-complete` | Screen state after 100% | Centered white card ~440px wide, border `#E5E7EB`, rounded-2xl, p-8, text-center, shadow-sm | Green rocket/check tile `#DCFCE7` text `#15803D` | Bold "Import Complete", grey "142 passwords imported successfully into your vault.", purple button "Import More" |

---

## 14. Screen 12: Imported Vault & 142 Items Grid (`lock.snaarp.com/vaults/<id>`)

| Element | Location | Dimensions / Spacing | Colors / Styles | Text / Content |
|---|---|---|---|---|
| `vault-card-chrome` | Vaults grid item 1 | Width ~175px, min-h-[160px] | Purple lock tile `#EDE9FE` with icon `#7C3AED` | Bold "Imported from Chrome", box icon "142 items", clock icon "Today" |
| `vault-items-container` | Inside imported vault | Full width, flex-1, scrollable | Header + filter chips + 4-column grid | 142 items |
| `imported-grid-142` | Grid container | 4-column grid, gap-3.5, pb-12 | 142 cards, rounded-xl, border `#E5E7EB`, bg `#FFFFFF` | Item cards: Github, Figma, Notion, Slack, Dropbox, Spotify, LinkedIn, Canva, Zoom... |
| `item-card-hover` | Hover state | Card transforms -translate-y-0.5 shadow-md | Red trash icon button appears at bottom right | Trash icon `#EF4444` |

---

## 15. Visual Verification & Side-by-Side Comparison

- **Suite Rail (Steps 1–11)**: Side-by-side screenshots at 1920x1080 and 1280x720 compared against frame `010.png`. Full suite rail of 18 apps (Mail, Meets, Teams, One Cardx, Sheets, Docs, Slides, PDF, Lock, Sign, Drive, Me, CRM, Books, Workforce, Project, Zeus, Verifyrit) with Docs scrolled to top and Lock active with `#EDE9FE` pill and `#7C3AED` icon/label. Logout pinned at the bottom. Matches 100%.
- **Step 8 (Create an organization)**: Side-by-side screenshots `step8_1080p.png` and `step8_720p.png` compared with frames `015.png` and `020.png`. Layout, input placeholder, purple button, inline card dismiss button, and resulting card list match 100%.
- **Step 9 (Invite a member and set their role)**: Side-by-side screenshots `step9_1080p.png` and `step9_720p.png` compared with frames `030.png`, `045.png`, and `060.png`. Inline invite block, role select menu, Admin badge update, Transfer ownership tooltip, and Transfer Ownership modal match 100%.
- **Step 10 (Import passwords from Chrome)**: Side-by-side screenshots `step10_1080p.png` and `step10_720p.png` compared with frames `078.png`, `082.png`, `090.png`, and `100.png`. 9 source cards, notice bar, dropzone, in-app file chooser dialog, items table, progress bar, and Import Complete card match 100%.
- **Step 11 (See your imported passwords)**: Side-by-side screenshots `step11_1080p.png` and `step11_720p.png` compared with frames `105.png`, `115.png`, and `120.png`. "Imported from Chrome" vault card, 142 items grid, scroll smoothness, and hover lift with delete icon match 100%.


