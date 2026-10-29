import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

import { CHART } from "@/components/sheets/insert-data";

export const CAPTIONS = {
  tab: "Click the Customize tab",
  style: "Chart style changes how the whole chart looks",
  bg: "Pick a background colour",
  font: "Pick a font",
  palette: "Pick a colour palette and the chart recolours",
  maximize: "Tick Maximize to make the chart bigger",
  titles: "Open Chart & axis titles",
  kind: "Choose which title to edit",
  type: "Type your title",
  vkind: "Now choose Vertical axis title",
  vtype: "Type a title for the side axis",
  format: "Choose the title's font, size, format and colour",
  done: `Your chart now says "${CHART.typed.chart}"`,
};
