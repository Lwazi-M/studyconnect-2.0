/**
 * FILE: src/app/components/BottomNav.tsx
 * TITLE: Bottom Navigation Component
 * PURPOSE: 
 * This component creates the floating navigation bar at the bottom of the screen.
 * It allows users to switch between the main sections: Home, Resources, Chat, and Profile.
 * * KEY FEATURES:
 * 1. Smart Visibility: It automatically hides itself when the user enters a specific chat 
 * or the 'Edit Profile' screen to provide more viewing area.
 * 2. Active State: Visual indicators (blue color + dot) show which page is currently active.
 * 3. Floating Design: Uses a backdrop blur effect to look like a native iOS/Android menu.
 * 4. Dark Mode: Adapts colors for seamless integration with dark themes.
 */

"use client"; // Needs to be client-side to read the current URL path

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current URL

export default function BottomNav() {
  const pathname = usePathname(); // Get the current route (e.g., "/chat")

  // --- VISIBILITY LOGIC ---
  // We want to hide the nav bar on "Detail" pages to give more space for content.
  // 1. If the path starts with "/chat/" AND isn't just "/chat" (meaning we are inside a conversation).
  // 2. If the path is exactly "/profile/edit".
  const shouldHide = (pathname.startsWith("/chat/") && pathname !== "/chat") || pathname === "/profile/edit";

  // If we should hide, return null (render nothing).
  if (shouldHide) {
    return null; 
  }

  // Helper function to check if a specific link is active.
  // Returns true if the current path matches the link path.
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    // Navigation Container
    // 'absolute bottom-8': Positions it near the bottom of the screen.
    // 'backdrop-blur-md': Creates the frosted glass effect.
    // 'transition-colors': Ensures smooth switching between light and dark modes.
    <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between w-[85%] max-w-[300px] z-50 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      
      {/* --- HOME LINK --- */}
      <Link href="/" className="relative group p-2">
        {/* Active Indicator Dot (Only shows if on Home) */}
        {pathname === "/" && (
           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
        {/* Icon: Changes color based on active state and theme */}
        <svg className={`w-6 h-6 transition-colors ${pathname === "/" ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>

      {/* --- RESOURCES LINK --- */}
      <Link href="/resources" className="relative group p-2">
        {isActive("/resources") && (
           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
        <svg className={`w-6 h-6 transition-colors ${isActive("/resources") ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </Link>

      {/* --- CHAT LINK --- */}
      <Link href="/chat" className="relative group p-2">
        {isActive("/chat") && (
           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
        <svg className={`w-6 h-6 transition-colors ${isActive("/chat") ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </Link>

      {/* --- PROFILE LINK --- */}
      <Link href="/profile" className="relative group p-2">
        {isActive("/profile") && (
           <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}
        <svg className={`w-6 h-6 transition-colors ${isActive("/profile") ? "text-blue-500" : "text-gray-400 dark:text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </Link>
      
    </nav>
  );
}