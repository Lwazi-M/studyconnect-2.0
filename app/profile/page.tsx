/**
 * FILE: src/app/profile/page.tsx
 * TITLE: Profile & Settings Dashboard
 * PURPOSE: 
 * This page acts as the user's personal profile and the app's settings menu.
 * * KEY FEATURES:
 * 1. User Overview: Shows the avatar, name, and major/degree.
 * 2. Academic Stats: A quick dashboard for GPA, Attendance, and completed modules.
 * 3. Settings Menu: Links to personal info, modules, uploads, and notifications.
 * 4. Dark Mode Toggle: A switch to change the app's theme (Light vs. Dark).
 */

"use client"; // Required because we use 'useTheme' (interactive hook) and 'useState'.

import Link from "next/link"; // For navigation
import { useTheme } from "next-themes"; // Hook to control Light/Dark mode
import { useEffect, useState } from "react"; // React hooks for state and side effects

export default function ProfilePage() {
  // --- THEME MANAGEMENT ---
  // 'theme': The current theme (e.g., 'dark', 'light', 'system').
  // 'setTheme': Function to change the theme.
  const { theme, setTheme } = useTheme();

  // --- HYDRATION FIX ---
  // Problem: The server doesn't know if the user prefers Dark Mode yet.
  // If the server renders "Light" but the browser renders "Dark", they mismatch (hydration error).
  // Solution: We wait until the component has "mounted" (loaded in the browser) before showing the toggle.
  const [mounted, setMounted] = useState(false);

  // useEffect runs ONCE after the component loads in the browser.
  useEffect(() => {
    setMounted(true); // Now we know we are safe to render the theme UI.
  }, []);

  // If not mounted yet, render nothing to avoid visual glitches.
  if (!mounted) return null;

  return (
    // Main Container
    // 'pb-32': Adds padding at the bottom so content isn't hidden behind the bottom nav bar.
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* --- HEADER / PROFILE CARD --- */}
      <header className="flex flex-col items-center mb-8 pt-4">
        {/* Avatar Circle with Emoji */}
        <div className="w-24 h-24 bg-blue-500 rounded-full mb-4 border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-4xl">
           👨🏾‍🎓
        </div>
        
        {/* Name and Degree */}
        <h1 className="text-2xl font-bold text-black dark:text-white">Thabo Nkosi</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">BSc Computer Science • 3rd Year</p>
        
        {/* Edit Profile Button (Links to /profile/edit) */}
        <Link href="/profile/edit">
           <button className="mt-4 px-6 py-2 bg-black dark:bg-white dark:text-black text-white text-sm font-medium rounded-full shadow-md active:scale-95 transition-transform">
             Edit Profile
           </button>
        </Link>
      </header>

      {/* --- ACADEMIC STATS --- */}
      {/* Grid Layout: 3 Columns for GPA, Attendance, and Completed modules */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        
        {/* Stat 1: GPA */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm flex flex-col items-center justify-center border border-transparent dark:border-gray-800">
           <span className="text-xl font-bold text-blue-600">3.8</span>
           <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">GPA</span>
        </div>
        
        {/* Stat 2: Attendance */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm flex flex-col items-center justify-center border border-transparent dark:border-gray-800">
           <span className="text-xl font-bold text-green-600">85%</span>
           <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Attendance</span>
        </div>
        
        {/* Stat 3: Completed Modules */}
        <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm flex flex-col items-center justify-center border border-transparent dark:border-gray-800">
           <span className="text-xl font-bold text-purple-600">12</span>
           <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Completed</span>
        </div>
      </div>

      {/* --- SETTINGS MENU LIST --- */}
      {/* A container with rounded corners that holds all the menu items */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm overflow-hidden border border-transparent dark:border-gray-800 transition-colors duration-300">
        
        {/* 1. DARK MODE TOGGLE BUTTON */}
        <button 
            // On Click: Check current theme. If 'dark', switch to 'light'. Otherwise, switch to 'dark'.
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
           <div className="flex items-center gap-3">
              {/* Icon Circle */}
              <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-yellow-400 flex items-center justify-center text-white dark:text-black">
                {/* Conditionally render Moon icon (if dark) or Sun icon (if light) */}
                {theme === "dark" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
           </div>
           
           {/* Visual Toggle Switch (The pill shape) */}
           <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${theme === 'dark' ? 'bg-green-500' : 'bg-gray-300'}`}>
                {/* The white circle that moves left/right */}
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`}></div>
           </div>
        </button>

        {/* 2. Menu Item: Personal Info */}
        <Link href="#">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Personal Info</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </Link>

        {/* 3. Menu Item: My Modules */}
        <Link href="#">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">My Modules</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </Link>

        {/* 4. Menu Item: Manage Uploads (Links to our Upload Management Page) */}
        <Link href="/profile/uploads">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Manage Uploads</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </Link>

        {/* 5. Menu Item: Notifications */}
        <Link href="#">
            <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Notifications</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </Link>

        {/* 6. Menu Item: Logout (Danger Zone) */}
        <Link href="#">
            {/* Note the 'text-red-500' class to indicate a destructive action */}
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                </div>
                <span className="text-sm font-medium text-red-500">Log Out</span>
            </div>
            </button>
        </Link>
      </div>

    </main>
  );
}