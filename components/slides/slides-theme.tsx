"use client";

import { createContext } from "react";
import { DEFAULT_THEME, type ThemeId } from "./slides-toolbar-data";

/** The deck's theme (Format > Theme, toolbar Theme): every SlideView on screen reads it, so thumbnails, canvas and full screen agree. */
export const ThemeContext = createContext<ThemeId>(DEFAULT_THEME);

/** True for a colour that needs light text on it. */
export function isDark(hex: string): boolean {
  const n = parseInt(hex.replace("#", ""), 16);
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum < 0.5;
}
