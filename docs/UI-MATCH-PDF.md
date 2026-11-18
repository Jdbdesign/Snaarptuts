# Snaarp PDF UI-Match Specification & Audit Log

Source video: `C:\Users\HP\Downloads\1118.mp4` (1386x720, 7:17)
Extracted reference frames: `ref/pdf/frame_0001.png` - `frame_0437.png`
Reference design resolution: 1440x900 (scaled dynamically in player shell)

---

## Global Design Tokens & Structure

| Surface | Selector | Background | Borders | Typography |
| :--- | :--- | :--- | :--- | :--- |
| Suite Rail | `[data-tl="pdf-suite-rail"]` | `#FFFFFF` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 11px medium |
| PDF Left Sidebar | `[data-tl="pdf-sidebar"]` | `#FFFFFF` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 13px medium |
| Top Bar | `[data-tl="pdf-topbar"]` | `#FFFFFF` (`border-b #E5E7EB`) | `border-b 1px solid #E5E7EB` | Poppins 14px regular |
| My Files Main Area | `[data-scroller="pdf-main"]` | `#FFFFFF` / `#FAFAFC` | None | Poppins 13px/14px |
| PDF Editor Header | `[data-tl="editor-header"]` | `#FFFFFF` (`border-b #E5E7EB`) | `border-b 1px solid #E5E7EB` | Poppins 14px 600 |
| PDF Editor Toolbar | `[data-tl="editor-toolbar"]` | `#FFFFFF` (`border-b #E5E7EB`) | `border-b 1px solid #E5E7EB` | Poppins 11px regular |
| PDF Editor Option Bar | `[data-tl="editor-option-bar"]`| `#FFFFFF` (`border-b #E5E7EB`) | `border-b 1px solid #E5E7EB` | Poppins 12px regular |
| Pages Panel | `[data-tl="editor-pages-panel"]` | `#F9FAFB` (`border-r #E5E7EB`) | `border-r 1px solid #E5E7EB` | Poppins 11px 700 uppercase |
| Editor Canvas | `[data-scroller="editor-canvas"]`| `#9CA3AF` / `#6B7280` | None | Real HTML/CSS A4 page |
| Bottom Page/Zoom Pill | `[data-tl="editor-bottom-pill"]` | `#18181B` | `rounded-full` | White text 12px |
| Primary Purple | Brand accent | `#7014D9` | `#7014D9` | White text |
| Active Nav Pill | `bg-[#F3E8FF] text-[#7014D9]` | `#F3E8FF` | `rounded-xl` | Font 600 |
| Red Done Button | `[data-tl="editor-done-btn"]` | `#DC2626` | `rounded-md` | White text 13px 600 |

---

## Step 1: Meet Snaarp PDF (Orientation)
**Video range**: 0:00 - 0:05 (frames 1-10)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Suite rail | `[data-tl="pdf-suite-rail"]` | Left 60px rail, PDF active in purple pill, apps list, Logout | Audited, matches |
| Left menu | `[data-tl="pdf-sidebar"]` | 220px wide, hamburger, PDF logo, My files (active), Upload, Tools, AI Tools, Operations, Report a Bug | Audited, matches |
| Quick cards row | `[data-tl="quick-cards-row"]` | 4 cards: Convert PDF, Edit PDF, Translate PDF, Sign PDF | Audited, matches |
| Files list & tabs | `[data-tl="files-table-container"]` | Tabs: All 1, PDF 1; Table: NAME, SIZE, UPDATED, ACTIONS with Acme Logos (1).pdf | Audited, matches |
| Search box | `[data-tl="files-search-input"]` | Rounded border search input, placeholder "Search files..." | Audited, matches |
| Upload file button | `[data-tl="upload-file-btn"]` | Purple pill `#7014D9`, white text "+ Upload file" | Audited, matches |

---

## Step 2: Browse your files
**Video range**: 0:00 - 0:10 & 0:28 - 0:35 (frames 1-10, 28-35)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Grid view toggle | `[data-tl="view-toggle-grid"]` | 4-squares icon in right toggle capsule, switches to card view | Audited, matches |
| Grid cards | `[data-tl="files-grid-container"]` | Card with pink preview tile, red PDF icon, filename, size | Audited, matches |
| List view toggle | `[data-tl="view-toggle-list"]` | 3-lines icon, switches back to table | Audited, matches |
| PDF tab | `[data-tl="tab-pdf"]` | "PDF 1" filter tab pill | Audited, matches |
| All tab | `[data-tl="tab-all"]` | "All 1" filter tab pill, restores all | Audited, matches |
| Search input | `[data-tl="files-search-input"]` | Types "logos", filters/keeps matching row, clears | Audited, matches |
| Download icon | `[data-tl="action-download-row-1"]` | Tray with arrow down, tooltip "Download" | Audited, matches |
| More options | `[data-tl="action-more-row-1"]` | 3 vertical dots, tooltip "Options" | Audited, matches |

---

## Step 3: Upload a file from My files
**Video range**: 0:10 - 1:10 (frames 10-60)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Upload file button | `[data-tl="upload-file-btn"]` | Opens in-app file picker modal | Audited, matches |
| File picker modal | `[data-tl="file-picker-modal"]` | Snaarp modal listing sample files with Open & Cancel | Audited, matches |
| Pick PDF file | `[data-tl="picker-file-acme-project-brief"]` | Selects "Acme Project Brief.pdf" | Audited, matches |
| Picker Open button | `[data-tl="picker-open-btn"]` | Confirms selection | Audited, matches |
| Uploading state | `[data-tl="upload-file-btn"]` | Button changes to "Uploading..." with spinner | Audited, matches |
| Updated list (2 rows)| `[data-tl="files-table-container"]` | Tabs: All 2, PDF 2; New row with "Just now" | Audited, matches |
| Pick image file | `[data-tl="picker-file-site-photo"]` | Selects "Site Photo.jpg" | Audited, matches |
| Updated list (3 rows)| `[data-tl="files-table-container"]` | Tabs: All 3, PDF 2; Image row shows 79.4 KB, "Just now" | Audited, matches |

---

## Step 4: Upload a PDF to edit
**Video range**: 1:10 - 1:50 (frames 65-115)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Left menu Upload | `[data-tl="sidebar-nav-upload"]` | Navigates to `/upload` view | Audited, matches |
| Drop zone | `[data-tl="upload-dropzone"]` | Dashed border container, hover turns lilac `#F5F3FF` | Audited, matches |
| Upload button | `[data-tl="upload-to-edit-btn"]` | Purple button "UPLOAD PDF TO EDIT" | Audited, matches |
| Pick resume PDF | `[data-tl="picker-file-acme-resume"]` | Selects "Acme Resume.pdf" | Audited, matches |
| Storage upload progress| `[data-tl="upload-progress-container"]` | "Uploading to storage...", progress bar, 90% | Audited, matches |
| Processing card | `[data-tl="processing-card"]` | White centered modal, "Processing your document...", green progress bar 0 to 100% | Audited, matches |
| Document loaded | `[data-tl="editor-view"]` | Full editor opens at `/editor/doc-sample-resume`, page 1 of 3 | Audited, matches |

---

## Step 5: Meet the editor
**Video range**: 1:50 - 2:40 (frames 115-165)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Header back & title | `[data-tl="editor-title-group"]` | `← Untitled Document` | Audited, matches |
| Done button | `[data-tl="editor-done-btn"]` | Red rounded button `#DC2626` | Audited, matches |
| Toolbar | `[data-tl="editor-toolbar"]` | 23 tools (Select, Move, Add Text, Edit Text, Redact, Highlight, etc.) | Audited, matches |
| Pages panel | `[data-tl="editor-pages-panel"]` | 3 page thumbnails, page 1 selected | Audited, matches |
| Thumbnail 2 click | `[data-tl="page-thumb-2"]` | Scrolls canvas to page 2, pill shows 2/3 | Audited, matches |
| Thumbnail 1 click | `[data-tl="page-thumb-1"]` | Scrolls canvas back to page 1, pill shows 1/3 | Audited, matches |
| Bottom pill next | `[data-tl="pill-next-page"]` | Advances to page 2 (`2/3`) | Audited, matches |
| Bottom pill prev | `[data-tl="pill-prev-page"]` | Returns to page 1 (`1/3`) | Audited, matches |
| Zoom minus | `[data-tl="pill-zoom-out"]` | Decreases zoom to 90% | Audited, matches |
| Zoom plus | `[data-tl="pill-zoom-in"]` | Increases zoom to 100% | Audited, matches |
| Fit width | `[data-tl="pill-fit-width"]` | Fits page width | Audited, matches |

---

## Step 6: Add and edit text
**Video range**: 2:40 - 3:50 (frames 160-230)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Add Text tool | `[data-tl="tool-add-text"]` | Option bar opens below toolbar | Audited, matches |
| Option bar | `[data-tl="editor-option-bar"]` | Swatch, Helvetica, size 16, B, I, U, alignment, line height | Audited, matches |
| Page text click | `[data-tl="page-text-spot-p1"]` | Click near bottom of page 1 | Audited, matches |
| Text floating box | `[data-tl="text-input-box"]` | Floating card with "Type here...", types "Sign here" | Audited, matches |
| Edit Text tool | `[data-tl="tool-edit-text"]` | Turns lilac, activates editing mode | Audited, matches |
| Text selection | `[data-tl="placed-text-sign-here"]`| Click "Sign here" to select | Audited, matches |
| Size change | `[data-tl="option-font-size"]` | Pick "18" from size dropdown | Audited, matches |
| Bold button | `[data-tl="option-bold-btn"]` | Toggles bold on text | Audited, matches |
| Swatch | `[data-tl="option-color-swatch"]` | Opens palette, keeps black | Audited, matches |
| Deselect text | `[data-tl="editor-page-canvas"]` | Click away, text renders bold | Audited, matches |
| Undo & Redo | `[data-tl="tool-undo"]`, `[data-tl="tool-redo"]` | Click Undo and Redo in toolbar | Audited, matches |

---

## Step 7: Redact sensitive text
**Video range**: 3:50 - 4:30 (frames 230-270)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Redact tool | `[data-tl="tool-redact"]` | Yellow banner appears under toolbar | Audited, matches |
| Redact banner | `[data-tl="redact-banner"]` | Yellow banner: "Drag over sensitive content to mark it for permanent removal..." | Audited, matches |
| Redact box 1 (Name) | `[data-tl="redact-box-name"]` | Black box covers "JANE DOE" | Audited, matches |
| Redact box 2 (Summary)| `[data-tl="redact-box-summary"]`| Black box covers summary phrase | Audited, matches |
| Redact box 3 (Detail) | `[data-tl="redact-box-detail"]` | Black box covers second line | Audited, matches |
| Close Redact | `[data-tl="tool-redact"]` | Banner closes, 3 redaction boxes remain | Audited, matches |

---

## Step 8: Highlight and draw
**Video range**: 4:30 - 5:30 (frames 270-330)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Highlight tool | `[data-tl="tool-highlight"]` | Option bar opens with colors and width chips | Audited, matches |
| Color & width | `[data-tl="swatch-yellow"]`, `[data-tl="width-14px"]` | Yellow dot and width chip selected | Audited, matches |
| Highlight block | `[data-tl="highlight-rect-summary"]` | Translucent yellow rectangle covers summary/experience | Audited, matches |
| Pencil tool | `[data-tl="tool-pencil"]` | Option bar with colors & widths | Audited, matches |
| Black stroke | `[data-tl="canvas-pencil-stroke-black"]`| Thin black loop drawn with `tl.followPath` | Audited, matches |
| Red stroke | `[data-tl="canvas-pencil-stroke-red"]`| Red color dot picked, red loop drawn beside black loop | Audited, matches |

---

## Step 9: Add an image
**Video range**: 5:30 - 6:15 (frames 330-375)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Image tool | `[data-tl="tool-image"]` | Opens in-app file picker | Audited, matches |
| Pick image file | `[data-tl="picker-file-site-photo"]` | Selects "Site Photo.jpg", clicks Open | Audited, matches |
| Image on canvas | `[data-tl="placed-image-card"]` | Neutral sketch placeholder with dashed blue border, handles, red X circle | Audited, matches |
| Resize image | `[data-tl="image-handle-bottom-right"]` | Drags handle to resize | Audited, matches |
| Delete image | `[data-tl="image-delete-circle"]` | Clicks red circle X, image removed | Audited, matches |
| Re-add image | `[data-tl="tool-image"]` | Places image again on page 3 | Audited, matches |

---

## Step 10: Add shapes and marks
**Video range**: 6:15 - 6:55 (frames 375-415)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Ellipse tool | `[data-tl="tool-ellipse"]` | Activates ellipse drawing mode | Audited, matches |
| Ellipse shapes | `[data-tl="canvas-ellipse-1"]`, `[data-tl="canvas-ellipse-2"]` | Two red ovals drawn on page 3 | Audited, matches |
| Cross tool | `[data-tl="tool-cross"]` | Clicks page 3: red X mark placed | Audited, matches |
| Check tool | `[data-tl="tool-check"]` | Clicks below: green checkmark placed | Audited, matches |

---

## Step 11: Sign your document
**Video range**: 6:55 - 7:17 (frames 410-437)

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Sign tool | `[data-tl="tool-sign"]` | Opens "Add Signature" modal | Audited, matches |
| Draw tab | `[data-tl="sig-tab-draw"]` | Scribble drawn with `tl.followPath`, click Done, placed with handles & delete circle | Audited, matches |
| Image tab | `[data-tl="sig-tab-image"]` | Dashed box, picker opens, pick "Signature.png", preview shows, click Done | Audited, matches |
| Type tab | `[data-tl="sig-tab-type"]` | Type "JD", 4 font cards show "JD", pick style 2, color dot, click Done | Audited, matches |
| Saved tab | `[data-tl="sig-tab-saved"]` | Empty state with trash icon, "No saved signatures yet", click Cancel | Audited, matches |

---

## Step 12: Finish and download
**Video range**: Addition based on in-app controls

| Element | Target Selector | Design Specs | Audited State |
| :--- | :--- | :--- | :--- |
| Done button | `[data-tl="editor-done-btn"]` | Red top-right button, triggers processing modal | Audited, matches |
| Processing card | `[data-tl="processing-card"]` | Progress bar 0 to 100%, returns to My files | Audited, matches |
| Toast saved | `[data-tl="pdf-toast"]` | Green success toast "Document saved" | Audited, matches |
| New file row | `[data-tl="row-acme-resume"]` | "Acme Resume.pdf", 312.0 KB, "Just now" | Audited, matches |
| Download icon | `[data-tl="action-download-row-resume"]`| Clicks download icon, shows toast "Download started" | Audited, matches |
| Completion screen | `[data-tl="completion-card"]` | Data-driven completion screen follows step 12 | Audited, matches |
