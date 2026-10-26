import { Step1Explore } from "@/scenes/snaarp-doc/Step1Explore";
import { runStep1, STEP1_DURATION_MS } from "@/scenes/snaarp-doc/step1-script";
import { Step2Blank } from "@/scenes/snaarp-doc/Step2Blank";
import { runStep2, STEP2_DURATION_MS } from "@/scenes/snaarp-doc/step2-script";
import { Step3Tour } from "@/scenes/snaarp-doc/Step3Tour";
import { runStep3, STEP3_DURATION_MS } from "@/scenes/snaarp-doc/step3-script";
import { Step4Copy } from "@/scenes/snaarp-doc/Step4Copy";
import { runStep4, STEP4_DURATION_MS } from "@/scenes/snaarp-doc/step4-script";
import { Step5Share } from "@/scenes/snaarp-doc/Step5Share";
import { runStep5, STEP5_DURATION_MS } from "@/scenes/snaarp-doc/step5-script";
import { Step6Drive } from "@/scenes/snaarp-doc/Step6Drive";
import { runStep6, STEP6_DURATION_MS } from "@/scenes/snaarp-doc/step6-script";
import { Step7Rename } from "@/scenes/snaarp-doc/Step7Rename";
import { runStep7, STEP7_DURATION_MS } from "@/scenes/snaarp-doc/step7-script";
import { Step8History } from "@/scenes/snaarp-doc/Step8History";
import { runStep8, STEP8_DURATION_MS } from "@/scenes/snaarp-doc/step8-script";
import { Step9Print } from "@/scenes/snaarp-doc/Step9Print";
import { runStep9, STEP9_DURATION_MS } from "@/scenes/snaarp-doc/step9-script";
import { Step10EditMenu } from "@/scenes/snaarp-doc/Step10EditMenu";
import { runStep10, STEP10_DURATION_MS } from "@/scenes/snaarp-doc/step10-script";
import { Step11CopyPaste } from "@/scenes/snaarp-doc/Step11CopyPaste";
import { runStep11, STEP11_DURATION_MS } from "@/scenes/snaarp-doc/step11-script";
import { Step12Undo } from "@/scenes/snaarp-doc/Step12Undo";
import { runStep12, STEP12_DURATION_MS } from "@/scenes/snaarp-doc/step12-script";
import { Step13FindReplace } from "@/scenes/snaarp-doc/Step13FindReplace";
import { runStep13, STEP13_DURATION_MS } from "@/scenes/snaarp-doc/step13-script";
import { Step14Mode } from "@/scenes/snaarp-doc/Step14Mode";
import { runStep14, STEP14_DURATION_MS } from "@/scenes/snaarp-doc/step14-script";
import { Step15AddComment } from "@/scenes/snaarp-doc/Step15AddComment";
import { runStep15, STEP15_DURATION_MS } from "@/scenes/snaarp-doc/step15-script";
import { Step16ManageComments } from "@/scenes/snaarp-doc/Step16ManageComments";
import { runStep16, STEP16_DURATION_MS } from "@/scenes/snaarp-doc/step16-script";
import { Step17Outline } from "@/scenes/snaarp-doc/Step17Outline";
import { runStep17, STEP17_DURATION_MS } from "@/scenes/snaarp-doc/step17-script";
import { Step18Layout } from "@/scenes/snaarp-doc/Step18Layout";
import { runStep18, STEP18_DURATION_MS } from "@/scenes/snaarp-doc/step18-script";
import { Step19InsertMenu } from "@/scenes/snaarp-doc/Step19InsertMenu";
import { runStep19, STEP19_DURATION_MS } from "@/scenes/snaarp-doc/step19-script";
import { Step20Image } from "@/scenes/snaarp-doc/Step20Image";
import { runStep20, STEP20_DURATION_MS } from "@/scenes/snaarp-doc/step20-script";
import { Step21Table } from "@/scenes/snaarp-doc/Step21Table";
import { runStep21, STEP21_DURATION_MS } from "@/scenes/snaarp-doc/step21-script";
import { Step22Link } from "@/scenes/snaarp-doc/Step22Link";
import { runStep22, STEP22_DURATION_MS } from "@/scenes/snaarp-doc/step22-script";
import { Step23LineBreak } from "@/scenes/snaarp-doc/Step23LineBreak";
import { runStep23, STEP23_DURATION_MS } from "@/scenes/snaarp-doc/step23-script";
import { Step24Bookmark } from "@/scenes/snaarp-doc/Step24Bookmark";
import { runStep24, STEP24_DURATION_MS } from "@/scenes/snaarp-doc/step24-script";
import { Step25HeaderFooter } from "@/scenes/snaarp-doc/Step25HeaderFooter";
import { runStep25, STEP25_DURATION_MS } from "@/scenes/snaarp-doc/step25-script";
import { Step26Watermark } from "@/scenes/snaarp-doc/Step26Watermark";
import { runStep26, STEP26_DURATION_MS } from "@/scenes/snaarp-doc/step26-script";
import { Step27PageNumbers } from "@/scenes/snaarp-doc/Step27PageNumbers";
import { runStep27, STEP27_DURATION_MS } from "@/scenes/snaarp-doc/step27-script";
import { Step28BlockStyles } from "@/scenes/snaarp-doc/Step28BlockStyles";
import { runStep28, STEP28_DURATION_MS } from "@/scenes/snaarp-doc/step28-script";
import { Step29ESignature } from "@/scenes/snaarp-doc/Step29ESignature";
import { runStep29, STEP29_DURATION_MS } from "@/scenes/snaarp-doc/step29-script";
import { Step30DrawSymbols } from "@/scenes/snaarp-doc/Step30DrawSymbols";
import { runStep30, STEP30_DURATION_MS } from "@/scenes/snaarp-doc/step30-script";
import { Step31FormatMenu } from "@/scenes/snaarp-doc/Step31FormatMenu";
import { runStep31, STEP31_DURATION_MS } from "@/scenes/snaarp-doc/step31-script";
import { Step32FormatText } from "@/scenes/snaarp-doc/Step32FormatText";
import { runStep32, STEP32_DURATION_MS } from "@/scenes/snaarp-doc/step32-script";
import { Step33ParagraphStyles } from "@/scenes/snaarp-doc/Step33ParagraphStyles";
import { runStep33, STEP33_DURATION_MS } from "@/scenes/snaarp-doc/step33-script";
import { Step34AlignIndent } from "@/scenes/snaarp-doc/Step34AlignIndent";
import { runStep34, STEP34_DURATION_MS } from "@/scenes/snaarp-doc/step34-script";
import { Step35Lists } from "@/scenes/snaarp-doc/Step35Lists";
import { runStep35, STEP35_DURATION_MS } from "@/scenes/snaarp-doc/step35-script";
import { Step36HeaderFooter } from "@/scenes/snaarp-doc/Step36HeaderFooter";
import { runStep36, STEP36_DURATION_MS } from "@/scenes/snaarp-doc/step36-script";
import { Step37Orientation } from "@/scenes/snaarp-doc/Step37Orientation";
import { runStep37, STEP37_DURATION_MS } from "@/scenes/snaarp-doc/step37-script";
import { Step38ClearFormatting } from "@/scenes/snaarp-doc/Step38ClearFormatting";
import { runStep38, STEP38_DURATION_MS } from "@/scenes/snaarp-doc/step38-script";
import { Step39ToolsMenu } from "@/scenes/snaarp-doc/Step39ToolsMenu";
import { runStep39, STEP39_DURATION_MS } from "@/scenes/snaarp-doc/step39-script";
import { Step40WordCount } from "@/scenes/snaarp-doc/Step40WordCount";
import { runStep40, STEP40_DURATION_MS } from "@/scenes/snaarp-doc/step40-script";
import { Step41SignDocument } from "@/scenes/snaarp-doc/Step41SignDocument";
import { runStep41, STEP41_DURATION_MS } from "@/scenes/snaarp-doc/step41-script";
import { Step42TypeSignature } from "@/scenes/snaarp-doc/Step42TypeSignature";
import { runStep42, STEP42_DURATION_MS } from "@/scenes/snaarp-doc/step42-script";
import { Step43UploadSignature } from "@/scenes/snaarp-doc/Step43UploadSignature";
import { runStep43, STEP43_DURATION_MS } from "@/scenes/snaarp-doc/step43-script";
import { Step44RequestSignature } from "@/scenes/snaarp-doc/Step44RequestSignature";
import { runStep44, STEP44_DURATION_MS } from "@/scenes/snaarp-doc/step44-script";
import type { Tutorial } from "./types";
import { Step45UndoRedo } from "@/scenes/snaarp-doc/Step45UndoRedo";
import { runStep45, STEP45_DURATION_MS } from "@/scenes/snaarp-doc/step45-script";
import { Step46PrintPaint } from "@/scenes/snaarp-doc/Step46PrintPaint";
import { runStep46, STEP46_DURATION_MS } from "@/scenes/snaarp-doc/step46-script";
import { Step47Zoom } from "@/scenes/snaarp-doc/Step47Zoom";
import { runStep47, STEP47_DURATION_MS } from "@/scenes/snaarp-doc/step47-script";
import { Step48StyleFont } from "@/scenes/snaarp-doc/Step48StyleFont";
import { runStep48, STEP48_DURATION_MS } from "@/scenes/snaarp-doc/step48-script";
import { Step49FontSize } from "@/scenes/snaarp-doc/Step49FontSize";
import { runStep49, STEP49_DURATION_MS } from "@/scenes/snaarp-doc/step49-script";
import { Step50BoldItalic } from "@/scenes/snaarp-doc/Step50BoldItalic";
import { runStep50, STEP50_DURATION_MS } from "@/scenes/snaarp-doc/step50-script";
import { Step51Color } from "@/scenes/snaarp-doc/Step51Color";
import { runStep51, STEP51_DURATION_MS } from "@/scenes/snaarp-doc/step51-script";
import { Step52LinkImage } from "@/scenes/snaarp-doc/Step52LinkImage";
import { runStep52, STEP52_DURATION_MS } from "@/scenes/snaarp-doc/step52-script";
import { Step53Align } from "@/scenes/snaarp-doc/Step53Align";
import { runStep53, STEP53_DURATION_MS } from "@/scenes/snaarp-doc/step53-script";
import { Step54Spacing } from "@/scenes/snaarp-doc/Step54Spacing";
import { runStep54, STEP54_DURATION_MS } from "@/scenes/snaarp-doc/step54-script";
import { Step55Lists } from "@/scenes/snaarp-doc/Step55Lists";
import { runStep55, STEP55_DURATION_MS } from "@/scenes/snaarp-doc/step55-script";
import { Step56Indent } from "@/scenes/snaarp-doc/Step56Indent";
import { runStep56, STEP56_DURATION_MS } from "@/scenes/snaarp-doc/step56-script";
import { Step57ClearSupSub } from "@/scenes/snaarp-doc/Step57ClearSupSub";
import { runStep57, STEP57_DURATION_MS } from "@/scenes/snaarp-doc/step57-script";
import { Step58QuoteRuleTable } from "@/scenes/snaarp-doc/Step58QuoteRuleTable";
import { runStep58, STEP58_DURATION_MS } from "@/scenes/snaarp-doc/step58-script";
import { Step59FullDrawEmoji } from "@/scenes/snaarp-doc/Step59FullDrawEmoji";
import { runStep59, STEP59_DURATION_MS } from "@/scenes/snaarp-doc/step59-script";
import { Step60Modes } from "@/scenes/snaarp-doc/Step60Modes";
import { runStep60, STEP60_DURATION_MS } from "@/scenes/snaarp-doc/step60-script";
import { Step61Meet } from "@/scenes/snaarp-doc/Step61Meet";
import { runStep61, STEP61_DURATION_MS } from "@/scenes/snaarp-doc/step61-script";
import { Step62VersionHistory } from "@/scenes/snaarp-doc/Step62VersionHistory";
import { runStep62, STEP62_DURATION_MS } from "@/scenes/snaarp-doc/step62-script";
import { Step63Apps } from "@/scenes/snaarp-doc/Step63Apps";
import { runStep63, STEP63_DURATION_MS } from "@/scenes/snaarp-doc/step63-script";

/**
 * Snaarp Doc: "How to use Snaarp Doc". Steps 1 to 9 come from Snaarp_Doc_flow.mp4, steps 10 to 13 from Snaarp_Doc_edit.mp4, steps 14 to 18 from Snaarp_Doc_view.mp4, steps 19 to 30 from Snaarp_Doc_insert.mp4, steps 31 to 38 from Snaarp_Doc_format.mp4 (the whole Format menu), steps 39 and 40 from Snaarp_Doc_tools.mp4 (the Tools menu) and steps 41 to 44 from Snaarp_Doc_esignature.mp4 (the eSignature menu). The tutorial is complete at 44 steps (the Help menu is intentionally not included). To add a step, give it a `scene`
 * ({ Component, run, durationMs }) and add its folder under scenes/snaarp-doc/.
 * Recording: ref/docs/Snaarp_Doc_flow.mp4 (1010x480, 2:15, git-ignored).
 * URL pills are placeholders, except docs.snaarp.com/trash, which was seen in the recording.
 */
export const snaarpDoc: Tutorial = {
  product: { id: "snaarp-doc", name: "Snaarp Doc", logo: "docs" },
  steps: [
    {
      id: "explore",
      title: "Explore Snaarp Doc",
      url: "docs.snaarp.com/documents",
      scene: { Component: Step1Explore, run: runStep1, durationMs: STEP1_DURATION_MS },
    },
    {
      id: "create-blank",
      title: "Create a blank document",
      url: "docs.snaarp.com/document/new",
      scene: { Component: Step2Blank, run: runStep2, durationMs: STEP2_DURATION_MS },
    },
    {
      id: "editor-file-menu",
      title: "Explore the editor and File menu",
      url: "docs.snaarp.com/document/untitled",
      scene: { Component: Step3Tour, run: runStep3, durationMs: STEP3_DURATION_MS },
    },
    {
      id: "make-copy",
      title: "Make a copy",
      url: "docs.snaarp.com/document/untitled",
      scene: { Component: Step4Copy, run: runStep4, durationMs: STEP4_DURATION_MS },
    },
    {
      id: "share",
      title: "Share your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step5Share, run: runStep5, durationMs: STEP5_DURATION_MS },
    },
    {
      id: "download-drive",
      title: "Download and save to Drive",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step6Drive, run: runStep6, durationMs: STEP6_DURATION_MS },
    },
    {
      id: "rename",
      title: "Rename your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step7Rename, run: runStep7, durationMs: STEP7_DURATION_MS },
    },
    {
      id: "version-history",
      title: "Check version history",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step8History, run: runStep8, durationMs: STEP8_DURATION_MS },
    },
    {
      id: "print",
      title: "Print your document",
      url: "docs.snaarp.com/document/untitled-copy",
      scene: { Component: Step9Print, run: runStep9, durationMs: STEP9_DURATION_MS },
    },
    {
      id: "edit-menu",
      title: "Explore the Edit menu",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step10EditMenu, run: runStep10, durationMs: STEP10_DURATION_MS },
    },
    {
      id: "copy-paste",
      title: "Copy and paste text",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step11CopyPaste, run: runStep11, durationMs: STEP11_DURATION_MS },
    },
    {
      id: "select-delete-undo",
      title: "Select all, delete and undo",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step12Undo, run: runStep12, durationMs: STEP12_DURATION_MS },
    },
    {
      id: "find-replace",
      title: "Find and replace",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step13FindReplace, run: runStep13, durationMs: STEP13_DURATION_MS },
    },
    {
      id: "editing-mode",
      title: "Change the editing mode",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step14Mode, run: runStep14, durationMs: STEP14_DURATION_MS },
    },
    {
      id: "comments-add",
      title: "Open Comments and add a comment",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step15AddComment, run: runStep15, durationMs: STEP15_DURATION_MS },
    },
    {
      id: "comments-manage",
      title: "Manage comments",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step16ManageComments, run: runStep16, durationMs: STEP16_DURATION_MS },
    },
    {
      id: "document-outline",
      title: "Use the Document outline",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step17Outline, run: runStep17, durationMs: STEP17_DURATION_MS },
    },
    {
      id: "ruler-layout",
      title: "Ruler and layout options",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step18Layout, run: runStep18, durationMs: STEP18_DURATION_MS },
    },
    {
      id: "insert-menu",
      title: "Explore the Insert menu",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step19InsertMenu, run: runStep19, durationMs: STEP19_DURATION_MS },
    },
    {
      id: "insert-image",
      title: "Insert an image",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step20Image, run: runStep20, durationMs: STEP20_DURATION_MS },
    },
    {
      id: "insert-table",
      title: "Insert a table",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step21Table, run: runStep21, durationMs: STEP21_DURATION_MS },
    },
    {
      id: "insert-link",
      title: "Insert a link",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step22Link, run: runStep22, durationMs: STEP22_DURATION_MS },
    },
    {
      id: "line-page-break",
      title: "Add a line or page break",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step23LineBreak, run: runStep23, durationMs: STEP23_DURATION_MS },
    },
    {
      id: "bookmark",
      title: "Add a bookmark",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step24Bookmark, run: runStep24, durationMs: STEP24_DURATION_MS },
    },
    {
      id: "header-footer",
      title: "Add a header and footer",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step25HeaderFooter, run: runStep25, durationMs: STEP25_DURATION_MS },
    },
    {
      id: "watermark",
      title: "Add a watermark",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step26Watermark, run: runStep26, durationMs: STEP26_DURATION_MS },
    },
    {
      id: "page-numbers",
      title: "Add page numbers",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step27PageNumbers, run: runStep27, durationMs: STEP27_DURATION_MS },
    },
    {
      id: "block-styles",
      title: "Quote, checklist and code block",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step28BlockStyles, run: runStep28, durationMs: STEP28_DURATION_MS },
    },
    {
      id: "esignature",
      title: "Add an eSignature",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step29ESignature, run: runStep29, durationMs: STEP29_DURATION_MS },
    },
    {
      id: "draw-symbols",
      title: "Draw and insert symbols",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step30DrawSymbols, run: runStep30, durationMs: STEP30_DURATION_MS },
    },
    {
      id: "format-menu",
      title: "Explore the Format menu",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step31FormatMenu, run: runStep31, durationMs: STEP31_DURATION_MS },
    },
    {
      id: "format-text",
      title: "Format your text",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step32FormatText, run: runStep32, durationMs: STEP32_DURATION_MS },
    },
    {
      id: "paragraph-styles",
      title: "Use paragraph styles",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step33ParagraphStyles, run: runStep33, durationMs: STEP33_DURATION_MS },
    },
    {
      id: "align-indent",
      title: "Align and indent text",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step34AlignIndent, run: runStep34, durationMs: STEP34_DURATION_MS },
    },
    {
      id: "lists",
      title: "Bullets and numbered lists",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step35Lists, run: runStep35, durationMs: STEP35_DURATION_MS },
    },
    {
      id: "headers-footers",
      title: "Headers, footers and page numbers",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step36HeaderFooter, run: runStep36, durationMs: STEP36_DURATION_MS },
    },
    {
      id: "page-orientation",
      title: "Change page orientation",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step37Orientation, run: runStep37, durationMs: STEP37_DURATION_MS },
    },
    {
      id: "clear-formatting",
      title: "Clear formatting",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step38ClearFormatting, run: runStep38, durationMs: STEP38_DURATION_MS },
    },
    {
      id: "tools-menu",
      title: "Explore the Tools menu",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step39ToolsMenu, run: runStep39, durationMs: STEP39_DURATION_MS },
    },
    {
      id: "word-count",
      title: "Check your word count",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step40WordCount, run: runStep40, durationMs: STEP40_DURATION_MS },
    },
    {
      id: "sign-document",
      title: "Sign your document",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step41SignDocument, run: runStep41, durationMs: STEP41_DURATION_MS },
    },
    {
      id: "type-signature",
      title: "Type your signature",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step42TypeSignature, run: runStep42, durationMs: STEP42_DURATION_MS },
    },
    {
      id: "upload-signature",
      title: "Upload a signature image",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step43UploadSignature, run: runStep43, durationMs: STEP43_DURATION_MS },
    },
    {
      id: "request-signature",
      title: "Request a signature",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step44RequestSignature, run: runStep44, durationMs: STEP44_DURATION_MS },
    },
    {
      id: "undo-redo",
      title: "Undo and redo",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step45UndoRedo, run: runStep45, durationMs: STEP45_DURATION_MS },
    },
    {
      id: "print-paint",
      title: "Print and Paint format",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step46PrintPaint, run: runStep46, durationMs: STEP46_DURATION_MS },
    },
    {
      id: "zoom",
      title: "Change the zoom",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step47Zoom, run: runStep47, durationMs: STEP47_DURATION_MS },
    },
    {
      id: "style-font",
      title: "Paragraph styles and fonts",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step48StyleFont, run: runStep48, durationMs: STEP48_DURATION_MS },
    },
    {
      id: "font-size",
      title: "Change the font size",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step49FontSize, run: runStep49, durationMs: STEP49_DURATION_MS },
    },
    {
      id: "bold-italic-underline",
      title: "Bold, italic, underline",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step50BoldItalic, run: runStep50, durationMs: STEP50_DURATION_MS },
    },
    {
      id: "color-highlight",
      title: "Text color and highlight",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step51Color, run: runStep51, durationMs: STEP51_DURATION_MS },
    },
    {
      id: "link-image",
      title: "Insert a link and an image",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step52LinkImage, run: runStep52, durationMs: STEP52_DURATION_MS },
    },
    {
      id: "align",
      title: "Align your text",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step53Align, run: runStep53, durationMs: STEP53_DURATION_MS },
    },
    {
      id: "line-spacing",
      title: "Line spacing",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step54Spacing, run: runStep54, durationMs: STEP54_DURATION_MS },
    },
    {
      id: "toolbar-lists",
      title: "Lists",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step55Lists, run: runStep55, durationMs: STEP55_DURATION_MS },
    },
    {
      id: "indent-outdent",
      title: "Indent and outdent",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step56Indent, run: runStep56, durationMs: STEP56_DURATION_MS },
    },
    {
      id: "clear-sup-sub",
      title: "Clear formatting, superscript and subscript",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step57ClearSupSub, run: runStep57, durationMs: STEP57_DURATION_MS },
    },
    {
      id: "quote-rule-table",
      title: "Quote, horizontal line and table",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step58QuoteRuleTable, run: runStep58, durationMs: STEP58_DURATION_MS },
    },
    {
      id: "full-draw-emoji",
      title: "Full screen, draw and emoji",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step59FullDrawEmoji, run: runStep59, durationMs: STEP59_DURATION_MS },
    },
    {
      id: "editing-modes",
      title: "Editing, Suggesting and Viewing modes",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step60Modes, run: runStep60, durationMs: STEP60_DURATION_MS },
    },
    {
      id: "meet",
      title: "Start or join a meeting",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step61Meet, run: runStep61, durationMs: STEP61_DURATION_MS },
    },
    {
      id: "header-version-history",
      title: "Check version history",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step62VersionHistory, run: runStep62, durationMs: STEP62_DURATION_MS },
    },
    {
      id: "apps-panel",
      title: "Open the Snaarp apps panel",
      url: "docs.snaarp.com/document/project-brief",
      scene: { Component: Step63Apps, run: runStep63, durationMs: STEP63_DURATION_MS },
    },
  ],
  completion: {
    title: "You're all set",
    text: "You now know the basics of Snaarp Doc.",
  },
};
