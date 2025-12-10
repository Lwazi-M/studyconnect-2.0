/**
 * FILE: src/app/components/ThemeProvider.tsx
 * TITLE: Theme Context Provider
 * PURPOSE: 
 * This component acts as the "Global Switchboard" for the application's appearance.
 * It manages the active theme (Light vs. Dark) and ensures that preference is remembers
 * across all pages and visits.
 * * KEY FEATURES:
 * 1. Global State: It wraps the entire app, making the theme available to every component.
 * 2. Persistence: It saves the user's choice (e.g., "Dark Mode") to their browser's local storage.
 * 3. System Detection: It can automatically detect if the user's computer is set to Dark Mode.
 */

// "use client" is crucial here.
// Because this component uses "Context" (a React feature to pass data globally) and needs
// to read the browser's settings, it must run on the Client (the user's browser), not the Server.
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes"; // The library doing the heavy lifting
import { type ThemeProviderProps } from "next-themes"; // Typescript definitions for safety

// THE COMPONENT FUNCTION
// This function takes two main inputs (props):
// 1. 'children': The rest of our app (Layout, Pages, Buttons) that sits inside this provider.
// 2. '...props': Any settings we want to pass to the library (like 'defaultTheme="system"').
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  
  // We simply wrap the 'children' (our app) with the NextThemesProvider.
  // Think of this like putting a tinted lens over a camera; everything seen through it
  // gets affected by the tint (the theme).
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}