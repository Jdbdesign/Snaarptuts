/*
 * Snaarp Slides, step 51 - Meet the toolbar tools. Recording: ref/slides/Snaarp_Slides_final.mp4 (the toolbar shows undo, redo, print, paint format, a 100% zoom box,
 * then select, text, image, shape and line tools; the recording only hovers them, one shows "Insert image" as a tooltip). Every tool is shown working here:
 * text (draw a box and type), undo and redo, paint format (copy a look from one shape to another), zoom, select, image (our in-app picker, not the computer's
 * file window), shape (the same six shapes as Insert > Shape, our own list) and line, and print (opens the print panel). See docs/DECISIONS-AND-DEVIATIONS.md.
 */

export const CAPTIONS = {
  intro: "These are the toolbar tools. Let's try them",
  text: "Click the text tool",
  draw: "Drag a box on the slide",
  type: "Type your text",
  finish: "Click outside to finish",
  undo: "Click Undo to take it back",
  redo: "Click Redo to bring it back",
  copyFrom: "Click the blue box to pick up its look",
  paint: "Click Paint format",
  paintTo: "Click the grey box to paint it",
  painted: "The grey box now matches the blue one",
  zoom: "Click the zoom box",
  zoomPick: "Choose 75%",
  zoomBack: "And back to 100%",
  select: "Click the select tool to go back to normal",
  image: "Click the image tool",
  imagePick: "Pick a picture, then Insert",
  shape: "Click the shape tool and pick a star",
  line: "Click the line tool",
  print: "Click Print",
  printPanel: "The print panel opens. Click Cancel to close it",
  done: "Every tool is one click away",
};
