/**
 * FILE: src/app/layout.tsx
 * TITLE: Root Layout (The Master Template)
 * * PURPOSE: 
 * This file serves as the "wrapper" for every single page in your application.
 * If you add something here (like a navigation bar or a background color), 
 * it will appear on EVERY page automatically.
 * * KEY FEATURES:
 * 1. Sets up the Global Font (Inter).
 * 2. Manages Dark Mode vs Light Mode preferences.
 * 3. Creates the visual "iPhone 16 Pro Max" frame that wraps your app.
 * 4. Displays the Status Bar (Time, Battery) and Bottom Navigation.
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Import the master stylesheet for Tailwind CSS
import BottomNav from "./components/BottomNav";
import Image from "next/image";
import { ThemeProvider } from "./components/ThemeProvider"; // This tool manages Dark/Light mode switching

// Load the "Inter" font from Google to ensure text looks clean and modern
const inter = Inter({ subsets: ["latin"] });

// METADATA: This controls what appears in the browser tab and search results.
// It's like the ID card for your website.
export const metadata: Metadata = {
  title: "StudyConnect",
  description: "Student collaboration platform",
};

// ROOT LAYOUT COMPONENT
// This function wraps every page. The 'children' argument represents the 
// specific page the user is currently looking at (e.g., Dashboard or Chat).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'suppressHydrationWarning' stops Next.js from complaining if the server 
    // thinks it's Light Mode but the user's browser is in Dark Mode.
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-200 dark:bg-gray-900 min-h-screen flex items-center justify-center py-10 overflow-hidden transition-colors duration-300`}>
        
        {/* THEME PROVIDER: 
            This acts like a "Manager" that sits at the top level. 
            It remembers if the user prefers Dark or Light mode and applies it to everything inside.
        */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* --- iPHONE 16 PRO MAX FRAME START --- 
              This entire div block creates the visual appearance of a phone.
              It serves as a "container" to limit the app's width and height.
          */}
          <div className="relative w-[400px] h-[850px] bg-black rounded-[60px] shadow-[0_0_0_12px_#333,0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-black overflow-hidden ring-4 ring-gray-800/50 flex flex-col transition-all duration-300">
            
            {/* Dynamic Island: The black pill shape at the top of modern iPhones */}
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-50 flex items-center justify-center pointer-events-none">
               <div className="w-24 h-full bg-black rounded-full relative">
                  {/* Camera Lens */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-[#1a1a1a] rounded-full border border-[#2a2a2a]"></div>
               </div>
            </div>

            {/* Visual Buttons: Volume and Power buttons on the side of the phone frame */}
            <div className="absolute top-[200px] -right-[18px] w-[10px] h-[100px] bg-gray-800 rounded-r-lg shadow-sm"></div>
            <div className="absolute top-[180px] -left-[18px] w-[10px] h-[60px] bg-gray-800 rounded-l-lg shadow-sm"></div>
            <div className="absolute top-[250px] -left-[18px] w-[10px] h-[60px] bg-gray-800 rounded-l-lg shadow-sm"></div>
            <div className="absolute top-[120px] -left-[18px] w-[10px] h-[35px] bg-orange-900 rounded-l-lg shadow-sm"></div>

            {/* --- ACTUAL SCREEN AREA --- 
                This is where your app lives. Everything inside this div is what the user interacts with.
                'dark:bg-gray-950' means: "If Dark Mode is ON, turn the background almost black."
            */}
            <div className="w-full h-full bg-white dark:bg-gray-950 rounded-[50px] overflow-hidden relative flex flex-col transition-colors duration-300">
              
              {/* Background Watermark 
                  It sits behind everything (z-0) and has very low opacity so it's subtle.
              */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.03] dark:invert">
                  <Image
                    src="/watermark.png"
                    alt="Watermark"
                    width={250} 
                    height={250}
                    priority
                  />
              </div>

              {/* Status Bar: The time, wifi, and battery icons at the top */}
              <div className="absolute top-0 w-full h-14 z-40 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm flex justify-between items-end px-8 pb-2 transition-colors duration-300">
                 <span className="text-black dark:text-white font-bold text-sm tracking-wide">9:41</span>
                 <div className="flex items-center gap-2 text-black dark:text-white">
                    {/* Wifi Icon */}
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                    {/* Battery Icon */}
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"></path></svg>
                 </div>
              </div>

              {/* CONTENT INJECTOR:
                  This is the most important part. Next.js takes the specific page you asked for
                  (like /chat or /profile) and "injects" it right here into the {children} variable.
                  This ensures every page renders INSIDE the phone frame.
              */}
              <div className="flex-1 overflow-y-auto no-scrollbar pt-14 relative z-10">
                 {children}
              </div>

              {/* Bottom Navigation: The menu bar at the bottom.
                  It contains logic to auto-hide itself when inside a chat. */}
              <BottomNav />
              
            </div>
          </div>
        </ThemeProvider>

      </body>
    </html>
  );
}