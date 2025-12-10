/**
 * FILE: src/app/page.tsx
 * PURPOSE: Main Dashboard / Home Page
 * DESCRIPTION: 
 * This is the first screen the user sees. It acts as a central hub displaying:
 * 1. A greeting and notification bell.
 * 2. A "Global Search" bar that filters through both Peers and Resources.
 * 3. Daily Stats (Streak) and quick links (Resources) when not searching.
 * 4. A list of recent peers to chat with.
 */

// "use client" is a Next.js directive. 
// It tells the framework: "This page has interactive features (like typing in a search bar),
// so please render it in the user's browser (Client-Side), not just on the server."
"use client";

import Link from "next/link"; // Optimized link component for fast page navigation
import { useState } from "react"; // React Hook for managing state (data that changes)

// --- MOCK DATABASE ---
// In a real-world application, this data would be fetched from a backend API (like Firebase or Supabase).
// For this portfolio demonstration, we use static arrays to simulate the data structure.

// 1. Peers Data: Represents other students the user can connect with.
const peers = [
  { id: "nomsa", name: "Nomsa Dlamini", role: "Mathematics • 3rd Year", initials: "ND", color: "bg-blue-400" },
  { id: "khotso", name: "Khotso Mokoena", role: "Computer Science • 2nd Year", initials: "KM", color: "bg-pink-400" },
  { id: "sipho", name: "Sipho Zulu", role: "Physics • 1st Year", initials: "SZ", color: "bg-yellow-400" },
];

// 2. Resources Data: Represents study files available for download.
const resources = [
  { id: 1, title: "Calculus 101 Finals", type: "PDF", color: "bg-red-50 dark:bg-red-900/20", text: "text-red-500 dark:text-red-400" },
  { id: 2, title: "Data Structures Notes", type: "DOC", color: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-500 dark:text-blue-400" },
  { id: 3, title: "Physics Lab Results", type: "XLS", color: "bg-green-50 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400" },
];

export default function Home() {
  // --- STATE MANAGEMENT ---
  // useState is like the "Short-Term Memory" of this component.
  // 'query' holds the text the user types into the search bar.
  // 'setQuery' is the function we call to update that text.
  const [query, setQuery] = useState("");

  // --- SEARCH LOGIC ---
  // We use the .filter() method to create a new list based on the search query.
  // It acts like a sieve: looking at every item and keeping only the ones 
  // where the name includes the text the user typed.
  // We convert everything to .toLowerCase() so that "Math" matches "math" (case-insensitive).
  
  const filteredPeers = peers.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  const filteredResources = resources.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
  
  // Boolean Flag: If the query string has length > 0, we know the user is searching.
  // This helps us toggle the UI between "Dashboard View" and "Search Results View".
  const isSearching = query.length > 0;

  return (
    // Main Container
    // 'bg-transparent': Allows the global watermark and background color (set in layout.tsx) to show through.
    // 'pb-32': Adds padding at the bottom so the last item isn't hidden behind the Floating Bottom Nav.
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* --- HEADER SECTION --- */}
      <header className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">StudyConnect: Good Day,</p>
          <h1 className="text-2xl font-bold text-black dark:text-white">Thabo</h1>
        </div>
        
        {/* Notification Icon Button */}
        <button className="p-2">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>
      </header>

      {/* --- GLOBAL SEARCH BAR --- */}
      <div className="relative mb-8">
        <input 
          type="text" 
          value={query}
          // Bi-directional Binding: When user types, update 'query' state instantly.
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources & peers..." 
          // Tailwind Classes:
          // 'w-full': spans full width.
          // 'dark:bg-gray-900': changes background to dark grey in Dark Mode.
          // 'focus:ring-2': adds a blue outline when clicked.
          className="w-full bg-white dark:bg-gray-900 py-3 pl-10 pr-4 rounded-xl shadow-sm text-gray-600 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
        />
        {/* Magnifying Glass Icon (Positioned absolutely inside the input) */}
        <svg className="w-5 h-5 text-blue-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* --- DEFAULT DASHBOARD VIEW --- */}
      {/* Conditional Rendering:
          The '!isSearching' means "If we are NOT searching".
          This section hides automatically when the user starts typing. */}
      {!isSearching && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          
          {/* 1. Streak Card (Gamification Feature) */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden transition-colors">
            {/* Decorative circle shape in top-right corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-bl-full -mr-2 -mt-2"></div>
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-2xl font-bold text-black dark:text-white">7</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Day Streak</p>
            </div>
          </div>

          {/* 2. Resources Count Card (Quick Link) */}
          <Link href="/resources">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex flex-col justify-between h-32 relative overflow-hidden cursor-pointer hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-bl-full -mr-2 -mt-2"></div>
              <span className="text-2xl">📚</span>
              <div>
                <p className="text-2xl font-bold text-black dark:text-white">5</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Resources</p>
              </div>
            </div>
          </Link>

        </div>
      )}

      {/* --- SEARCH RESULTS / LIST VIEW --- */}
      
      {/* Peers Section */}
      <section className="mb-6">
        <h2 className="text-lg font-bold text-black dark:text-white mb-4">
            {/* Dynamic Header Text: Updates based on search state */}
            {isSearching ? `Peers found (${filteredPeers.length})` : "Recent Peers"}
        </h2>
        <div className="space-y-4">
          
          {/* Conditional Rendering: Check if our filter found any peers */}
          {filteredPeers.length > 0 ? (
            // MAP FUNCTION: This is a "Factory Line". 
            // It loops through the 'filteredPeers' data and outputs a UI Card for each one.
            filteredPeers.map((peer) => (
              <Link href={`/chat/${peer.id}`} key={peer.id}>
                <div className="flex items-center bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-3">
                  {/* Initials Avatar */}
                  <div className={`w-10 h-10 rounded-full ${peer.color} mr-3 flex items-center justify-center text-white font-bold text-xs`}>{peer.initials}</div>
                  
                  {/* Peer Info */}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{peer.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{peer.role}</p>
                  </div>
                  
                  {/* Online Status Dot (Only shown in default view) */}
                  {!isSearching && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                </div>
              </Link>
            ))
          ) : (
             // Fallback State: What we show if the search finds nothing.
             <p className="text-sm text-gray-400 italic">No peers found matching &quot;{query}&quot;</p>
          )}

        </div>
      </section>

      {/* Resources Search Results Section 
          (Only rendered if 'isSearching' is true AND we have results) */}
      {isSearching && (
        <section>
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">Resources found ({filteredResources.length})</h2>
            <div className="space-y-3">
                {filteredResources.length > 0 ? (
                    filteredResources.map((res) => (
                        <div key={res.id} className="bg-white dark:bg-gray-900 p-3 rounded-xl shadow-sm border border-gray-50 dark:border-gray-800 flex items-center">
                            <div className={`w-10 h-10 rounded-lg ${res.color} flex items-center justify-center mr-3`}>
                                <span className={`${res.text} font-bold text-[10px]`}>{res.type}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{res.title}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 italic">No resources found.</p>
                )}
            </div>
        </section>
      )}
      
    </main>
  );
}