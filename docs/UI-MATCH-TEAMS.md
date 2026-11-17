# Snaarp Teams UI-Match Specification & Audit Log

Source video: `C:\Users\HP\Downloads\1116 (1)(2).mp4` (1394x720, 3:37)
Extracted reference frames: `ref/teams/frame_0001.png` - `frame_0434.png`
Reference design resolution: 1440x900 (scaled dynamically in player shell)

---

## Global Design Tokens & Structure

| Surface | Selector | Background | Borders | Typography |
| :--- | :--- | :--- | :--- | :--- |
| Suite Rail | `[data-tl="teams-suite-rail"]` | `#FAFAFC` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 11px medium |
| Teams Left Sidebar | `[data-tl="teams-sidebar"]` | `#FFFFFF` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 13px medium |
| Top Bar | `[data-tl="teams-topbar"]` | `#FFFFFF` (`border-b #E5E7EB`) | `border-b 1px solid #E5E7EB` | Poppins 14px regular |
| Chat List Column | `[data-tl="chat-list-col"]` | `#FFFFFF` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 13px/14px |
| Main Chat Area | `[data-tl="chat-main-area"]` | `#FFFFFF` | None | Poppins 13px/14px |
| Dark Mode | `[data-tl="teams-stage"].is-dark` | `#18181B` panels, `#09090B` bg | `#27272A` borders | White text `#FAFAFA` |
| Primary Purple | Brand accent | `#7014D9` / `#5850EC` | `#5850EC` | White text |
| Active Nav Pill | `bg-[#F3E8FF] text-[#111111]` | Purple left accent bar `#7014D9` | `rounded-xl` | Font 600 |

---

## Step 1: Meet Snaarp Teams (Orientation)
**Video range**: 0:00 - 0:03 (frames 1-6)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Suite rail | `[data-tl="teams-suite-rail"]` | Left 60px rail, hamburger, apps list, Logout | Audited, matches |
| Teams sidebar | `[data-tl="teams-sidebar"]` | Left 160px, Chat, Meet, People, Calendar, Activity, Report a Bug | Audited, matches |
| Search bar | `[data-tl="teams-topbar-search"]` | Center topbar, pill input, placeholder "Search" | Audited, matches |
| Theme toggle | `[data-tl="teams-theme-btn"]` | Sun icon button, top right | Audited, matches |
| Apps grid | `[data-tl="teams-apps-grid-btn"]` | 3x3 grid icon button, top right | Audited, matches |
| User avatar | `[data-tl="teams-avatar-btn"]` | Blue "J" circle avatar with green online badge | Audited, matches |
| Chat actions | `[data-tl="teams-chat-header-actions"]` | Video, Call, Group, Search, Bell buttons in header | Audited, matches |

---

## Step 2: Filter your chats
**Video range**: 0:12 - 0:20 & 0:55 - 1:05 (frames 24-40, 110-130)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Unread tab | `[data-tl="chat-tab-unread"]` | Pill button, empty state "No conversations" | Audited, matches |
| Group tab | `[data-tl="chat-tab-group"]` | Pill button, filters to 3 groups | Audited, matches |
| List search icon | `[data-tl="chat-list-search-toggle"]` | Magnifying glass icon top-right of Chat column | Audited, matches |
| List search input | `[data-tl="chat-list-search-input"]` | Expandable search box above tabs, placeholder "Search" | Audited, matches |
| Filtered list | `[data-tl="chat-list-items"]` | Shows 3 Acme groups matching "Acme" | Audited, matches |
| All tab | `[data-tl="chat-tab-all"]` | Active purple pill, restores all chats | Audited, matches |

---

## Step 3: Use a chat's menu
**Video range**: 0:05 - 0:12 (frames 10-24)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Sam Taylor row | `[data-tl="chat-row-sam-taylor"]` | Selected chat row, hover triggers `...` button | Audited, matches |
| Row more button | `[data-tl="chat-row-more-btn"]` | Three horizontal dots button on right edge of row | Audited, matches |
| Context menu | `[data-tl="chat-context-menu"]` | White floating card with drop shadow | Audited, matches |
| Menu items | `[data-tl^="chat-menu-"]` | Mark as unread, Pin to top, Mute, Hide, Block, Delete (red) | Audited, matches |
| Pin to top click | `[data-tl="chat-menu-pin"]` | Pins Sam Taylor with small pin badge | Audited, matches |

---

## Step 4: Start a meeting from the chat list
**Video range**: 0:22 - 1:00 (frames 44-120)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Video camera btn | `[data-tl="chat-list-video-btn"]` | Top-right of Chat list header | Audited, matches |
| Start Meet dialog | `[data-tl="dialog-start-meet"]` | Modal: "Start a snaarpmeet now", "Link valid for 1 hour" | Audited, matches |
| Meeting name | `[data-tl="dialog-meet-name-input"]` | Prefilled "Meeting with Jane Doe" | Audited, matches |
| Share link button | `[data-tl="dialog-meet-share-btn"]` | Copy icon + "Get a link to share" -> green toast | Audited, matches |
| Start meeting btn | `[data-tl="dialog-meet-start-btn"]` | Purple button -> spinner "Creating..." -> opens pre-join | Audited, matches |
| Pre-join video box | `[data-tl="prejoin-video-box"]` | Dark rounded box, Jane badge, avatar "J", mic, camera, effects | Audited, matches |
| Camera toggle | `[data-tl="prejoin-cam-btn"]` | Red circular button with camera-off icon | Audited, matches |
| Mic toggle | `[data-tl="prejoin-mic-btn"]` | Red circular button with mic-off icon | Audited, matches |
| Join now button | `[data-tl="prejoin-join-btn"]` | Blue pill button "Join now" (orientation end state) | Audited, matches |

---

## Step 5: Call a contact
**Video range**: 1:05 - 1:25 (frames 130-170)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Header call icon | `[data-tl="chat-header-call-btn"]` | Phone icon in top-right of chat header, tooltip "Start a call" | Audited, matches |
| Fullscreen call | `[data-tl="call-overlay"]` | `#0F0F10` dark view, ST avatar, "Sam Taylor", "Calling..." | Audited, matches |
| Call controls | `[data-tl="call-mic-btn"]`, `[data-tl="call-add-btn"]` | Mic and user-plus circular buttons | Audited, matches |
| End call button | `[data-tl="call-end-btn"]` | Red circular button with phone-off icon -> returns to chat | Audited, matches |

---

## Step 6: See shared files and photos
**Video range**: 1:00 - 1:20 (frames 120-160)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Files tab | `[data-tl="chat-tab-files"]` | Header tab, thin purple loading bar, empty state | Audited, matches |
| Files empty state | `[data-tl="files-empty-state"]` | "No files shared yet / Files shared in this conversation will appear here" | Audited, matches |
| Photos tab | `[data-tl="chat-tab-photos"]` | Header tab, thin purple loading bar, image card | Audited, matches |
| Sample photo tile | `[data-tl="photo-card-tile"]` | Neutral sample tile "Acme card.png" | Audited, matches |
| Chat tab | `[data-tl="chat-tab-chat"]` | Restores regular chat view | Audited, matches |

---

## Step 7: Start a group chat
**Video range**: 1:25 - 2:20 (frames 170-280)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Group header btn | `[data-tl="chat-header-group-btn"]` | Users icon in chat header, tooltip "Start a group chat" | Audited, matches |
| Group modal | `[data-tl="dialog-group-chat"]` | "Start a group chat", Sam Taylor initial chip, helper line | Audited, matches |
| Search box | `[data-tl="group-search-input"]` | Placeholder "Enter name, email or phone number" | Audited, matches |
| Member candidates | `[data-tl^="group-user-row-"]` | Casey Brown, Jordan Lee, Alex Morgan selected with chips & ticks | Audited, matches |
| Create button | `[data-tl="group-create-btn"]` | Purple button becomes enabled -> creates "New group" | Audited, matches |

---

## Step 8: Explore a group chat
**Video range**: 2:20 - 2:55 (frames 280-350)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Group header | `[data-tl="group-chat-header"]` | "Acme Product & Tech Team", pencil, Meet now, 8 members, search, bell, more | Audited, matches |
| Members popover | `[data-tl="group-members-popover"]` | "Invite via link", 8 member rows, "Add people", red "Leave" | Audited, matches |
| Find in chat panel | `[data-tl="find-in-chat-panel"]` | Keyword box, "Has attachment" chip, "Search in this chat" empty state | Audited, matches |
| Reaction bar | `[data-tl="message-reaction-bar"]` | Hover message: 👍 ❤️ 😮 😢 😠 emoji bar | Audited, matches |
| Reaction badge | `[data-tl="message-reaction-badge"]` | 👍 1 badge under message card | Audited, matches |

---

## Step 9: Rename and pin a group
**Video range**: 2:55 - 3:10 (frames 350-380)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| More options menu | `[data-tl="group-more-menu"]` | "Rename group", "Pin to top", "Add people" | Audited, matches |
| Rename dialog | `[data-tl="dialog-rename-group"]` | Input prefilled, type "Acme Product Team", Save button | Audited, matches |
| Header & row update| `[data-tl="group-chat-title"]` | Updates immediately to "Acme Product Team" | Audited, matches |
| Pin group | `[data-tl="group-menu-pin"]` | Pinned icon added to group | Audited, matches |

---

## Step 10: Switch the theme
**Video range**: 3:05 - 3:15 (frames 370-390)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Theme button | `[data-tl="teams-theme-btn"]` | Sun icon in top bar | Audited, matches |
| Dark mode stage | `[data-tl="teams-stage"]` | Dark theme applied: `#18181B` panels, moon icon in top bar | Audited, matches |
| Restore light | `[data-tl="teams-theme-btn"]` | Moon clicked -> returns to clean light mode | Audited, matches |

---

## Step 11: Create and manage meeting links
**Video range**: 3:15 - 3:50 (frames 390-420)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Meet left nav | `[data-tl="teams-nav-meet"]` | Switches left menu to "Meet" view | Audited, matches |
| Sub-menu tabs | `[data-tl^="meet-tab-"]` | Meeting links (active), Scheduled meetings, Calls | Audited, matches |
| Create link button | `[data-tl="meet-create-link-btn"]` | Purple button -> spinner -> toast "Meeting link created" | Audited, matches |
| Meeting cards | `[data-tl^="meet-link-card-"]` | Card 1 & Card 2 with link code, active badge, dates | Audited, matches |
| Card action icons | `[data-tl^="card-action-"]` | Copy, Open, Remove with tooltips | Audited, matches |
| Remove second card | `[data-tl="card-action-delete-2"]` | Card 2 removed -> green toast "Meeting link removed" | Audited, matches |

---

## Step 12: Check scheduled meetings and calls
**Video range**: 3:50 - 4:10 (frames 410-430)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Scheduled tab | `[data-tl="meet-tab-scheduled"]` | Empty state illustration, "You don't have anything scheduled" | Audited, matches |
| Connect link hover | `[data-tl="connect-snaarp-me-link"]` | Purple text "Connect Snaarp Me" | Audited, matches |
| Calls tab | `[data-tl="meet-tab-calls"]` | Skeleton loading -> "Recents" 4 call rows | Audited, matches |
| Calls search | `[data-tl="calls-search-input"]` | Type "Sam" -> filters to 2 Sam Taylor rows -> clear | Audited, matches |
| Meeting links tab | `[data-tl="meet-tab-links"]` | Returns to Meeting links view | Audited, matches |

---

## Step 13: Join with a meeting ID
**Video range**: 4:10 - end (frames 425-434)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Join with ID btn | `[data-tl="meet-join-id-btn"]` | Outlined button next to Create link | Audited, matches |
| Join ID dialog | `[data-tl="dialog-join-id"]` | "Join with a meeting ID", input "Meeting ID or link", "Join meeting" | Audited, matches |
| Input typing | `[data-tl="join-id-input"]` | Types "etz-pips-nmk" -> button turns purple | Audited, matches |
| Join submit | `[data-tl="join-id-submit-btn"]` | Opens pre-join "Snaarp Meet" page | Audited, matches |
| Completion Card | `[data-tl="completion-card"]` | "Tour complete", Replay tour, Back to Snaarp | Audited, matches |
