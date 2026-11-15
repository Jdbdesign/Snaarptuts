import type { Timeline } from "@/lib/timeline";
import {
  beginProjects,
  finishProjects,
  pressOn,
  typeIntoVar,
} from "@/components/projects/projects-timeline";
import { PROJECTS_URLS } from "@/components/projects/projects-data";

export const STEP17_DURATION_MS = 24000;

export async function runStep17(tl: Timeline) {
  beginProjects(tl, PROJECTS_URLS.whiteboards, "whiteboards", [0.45, 0.25], 17);

  // Beat 1: Click + New Whiteboard
  await tl.at(400);
  tl.showCaption("Click + New Whiteboard to create a fresh visual diagram.");
  await pressOn(tl, "[data-tl=whiteboards-new-btn]", { ms: 600 });
  await tl.wait(400);

  // Beat 2: Type Whiteboard title
  await tl.at(2400);
  tl.showCaption("Enter the title for your new whiteboard.");
  await pressOn(tl, "[data-tl=new-whiteboard-title-input]", { ms: 500 });
  await typeIntoVar(
    tl,
    "[data-tl=new-whiteboard-title-input]",
    "newWhiteboardTitle",
    "Research Product",
    { msPerChar: 45 }
  );
  await tl.wait(400);

  // Beat 3: Click Create
  await tl.at(4800);
  tl.showCaption("Click Create to launch the whiteboard editor.");
  await pressOn(tl, "[data-tl=new-whiteboard-create-btn]", { ms: 550 });
  await tl.wait(700);

  // Beat 4: Select Diamond tool and draw Diamond 1
  await tl.at(7000);
  tl.showCaption("Select the Diamond tool to draw a flow node.");
  await pressOn(tl, "[data-tl=wb-tool-diamond]", { ms: 500 });
  tl.setVar("wbActiveTool", "diamond");
  await tl.wait(300);

  // Drag out diamond 1
  tl.setVar("isDraggingWbShape", true);
  await tl.moveCursorTo("[data-tl=wb-canvas-surface]", {
    dx: -160,
    dy: -40,
    ms: 750,
    onMove: (cx, cy) => {
      tl.setVar("dragCursorPos", { x: cx, y: cy });
    },
  });
  tl.setVar("isDraggingWbShape", false);
  tl.setVar("dragCursorPos", null);
  tl.setVar("hasDrawnDiamond1", true);
  tl.setVar("wbSelectedShapeId", "diamond-1");
  await tl.wait(800);

  // Beat 5: Select tool and deselect
  await tl.at(10200);
  tl.showCaption("Switch to Select and click the canvas to deselect.");
  await pressOn(tl, "[data-tl=wb-tool-select]", { ms: 450 });
  tl.setVar("wbActiveTool", "select");
  await tl.wait(200);
  await pressOn(tl, "[data-tl=wb-canvas-surface]", { dx: 0, dy: 100, ms: 450 });
  tl.setVar("wbSelectedShapeId", null);
  await tl.wait(600);

  // Beat 6: Select Diamond tool and draw Diamond 2
  await tl.at(12600);
  tl.showCaption("Draw a second diamond node to the right.");
  await pressOn(tl, "[data-tl=wb-tool-diamond]", { ms: 450 });
  tl.setVar("wbActiveTool", "diamond");
  await tl.wait(300);

  tl.setVar("isDraggingWbShape", true);
  await tl.moveCursorTo("[data-tl=wb-canvas-surface]", {
    dx: 140,
    dy: -40,
    ms: 750,
    onMove: (cx, cy) => {
      tl.setVar("dragCursorPos", { x: cx, y: cy });
    },
  });
  tl.setVar("isDraggingWbShape", false);
  tl.setVar("dragCursorPos", null);
  tl.setVar("hasDrawnDiamond2", true);
  tl.setVar("wbSelectedShapeId", "diamond-2");
  await tl.wait(800);

  // Beat 7: Select Arrow tool and connect Diamond 1 to Diamond 2
  await tl.at(15600);
  tl.showCaption("Select the Arrow tool and drag to connect the two nodes.");
  await pressOn(tl, "[data-tl=wb-tool-arrow]", { ms: 450 });
  tl.setVar("wbActiveTool", "arrow");
  await tl.wait(300);

  await tl.moveCursorTo("[data-tl=wb-shape-diamond-1]", { ms: 450 });
  await tl.moveCursorTo("[data-tl=wb-shape-diamond-2]", { ms: 700 });
  tl.setVar("hasDrawnArrow", true);
  await tl.wait(800);

  // Beat 8: Select Text tool and add label "Home Screen"
  await tl.at(18600);
  tl.showCaption("Use the Text tool to label the first flow step.");
  await pressOn(tl, "[data-tl=wb-tool-text]", { ms: 450 });
  tl.setVar("wbActiveTool", "text");
  await tl.wait(300);

  await pressOn(tl, "[data-tl=wb-shape-diamond-1]", { ms: 450 });
  tl.setVar("wbTextEditing", true);
  await typeIntoVar(
    tl,
    "[data-tl=wb-text-editor-input]",
    "wbTextValue",
    "Home Screen",
    { msPerChar: 50 }
  );
  await tl.wait(200);
  tl.setVar("wbTextEditing", false);
  tl.setVar("hasPlacedText", true);
  await tl.wait(600);

  // Beat 9: Save whiteboard
  await tl.at(21800);
  tl.showCaption("Click Save to preserve your visual diagram.");
  await pressOn(tl, "[data-tl=wb-save-btn]", { ms: 550 });
  await tl.wait(800);

  // Finish
  await tl.at(23400);
  tl.hideCaption();
  tl.clearHighlight();
  await finishProjects(tl);
}
