import { SHEETS_URLS } from "@/components/sheets/sheets-data";

export const URLS = SHEETS_URLS;

export const CAPTIONS = {
  select: "Select the data for your chart",
  open: "Click Insert, then Chart",
  inserted: "A chart appears over the cells and the Chart editor opens",
  type: "Open Chart type to see every kind of chart",
  pick: (label: string) => `Choose ${label}`,
  stacking: "Stacking lets the series pile up. Choose Standard",
  range: "Data range shows which cells feed the chart",
  xaxis: "X-axis holds the labels along the bottom",
  series: "Tick a series to show it, untick it to hide it",
  reorder: "Drag a series by its handle to change the order",
  line: "The chart ends up as a line chart",
};
