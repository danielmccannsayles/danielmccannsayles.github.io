import { derived } from "svelte/store";
import { availableSeries } from "./project-store.js";

// Color palette in order: red, green, purple, blue
const SERIES_COLORS = [
  "#f06a6a", // --text-accent-red
  "#93da68", // --text-accent-green
  "#a182f8", // --text-accent (purple)
  "#3baef6", // --text-accent-blue
];

// Map series names to colors
export const seriesColorMap = derived(availableSeries, ($availableSeries) => {
  const colorMap = {};
  $availableSeries.forEach((seriesName, index) => {
    colorMap[seriesName] = SERIES_COLORS[index % SERIES_COLORS.length];
  });
  return colorMap;
});

// Helper function to get color for a specific series
export function getSeriesColor(seriesName, colorMap) {
  return colorMap[seriesName] || SERIES_COLORS[0]; // fallback to red
}