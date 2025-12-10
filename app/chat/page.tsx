/**
 * FILE: src/app/chat/page.tsx
 * TITLE: Chat Inbox (Conversation List)
 * PURPOSE: 
 * This page displays all the user's active conversations.
 * It serves as the entry point for messaging.
 * * KEY FEATURES:
 * 1. Conversation List: Displays recent chats with previews of the last message.
 * 2. Search Functionality: Filters the list by name (e.g., typing "Nomsa" shows only her chat).
 * 3. Active Status: A horizontal scroll view showing who is currently online.
 * 4. Unread Badges: visual indicators (blue circles) for new messages.
 */

"use client"; // Interactive page (search filtering requires browser execution)

import Link from "next/link";
import { useState } from "react";

// --- MOCK DATABASE ---
// Simulates the data we would get from a backend API (like Firebase or PostgreSQL).
const chats = [
  { 
    id: "nomsa", 
    name: "Nomsa Dlamini", 
    message: "Did you get the answer for Q3?", 
    time: "10:30 AM", 
    unread: 2, 
    color: "bg-blue-400" 
  },
  { 
    id: "studygroup", 
    name: "Study Group A", 
    message: "Thabo: I'll bring the past papers.", 
    time: "Yesterday", 
    unread: 0, 
    color: "bg-purple-400" 
  },
  { 
    id: "khotso", 
    name: "Khotso Mokoena", 
    message: "Thanks man, really appreciate it!", 
    time: "Mon", 
    unread: 0, 
    color: "bg-pink-400" 
  },
];

export default function ChatPage() {
  // --- STATE MANAGEMENT ---
  // 'query' holds the search text. 'setQuery' updates it.
  const [query, setQuery] = useState("");

  // --- FILTER LOGIC ---
  // Loops through all chats and keeps only those where the name matches the search text.
  // Using .toLowerCase() ensures "NOMSA" finds "Nomsa".
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    // Main Container
    // 'bg-transparent': Allows global theme background to show.
    // 'pb-32': Adds padding at bottom so the list isn't hidden behind the navigation bar.
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* --- HEADER --- */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Messages</h1>
        
        {/* 'New Chat' Button: Links to the 'Find Peers' wizard page */}
        <Link href="/chat/new">
           <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-200 dark:shadow-none active:scale-90 transition-transform">
             {/* Plus Icon */}
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
           </button>
        </Link>
      </header>

      {/* --- SEARCH BAR --- */}
      <div className="relative mb-8">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update search state on typing
          placeholder="Search chats..." 
          className="w-full bg-white dark:bg-gray-900 py-3 pl-10 pr-4 rounded-xl shadow-sm text-gray-600 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
        />
        {/* Search Icon (Absolute positioned inside the input) */}
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* --- ACTIVE NOW SECTION --- */}
      {/* Only show this section if the user is NOT searching. 
          This keeps the UI clean when looking for specific results. */}
      {!query && (
        <div className="mb-8">
          <h2 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Active Now</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
             {/* Map over a static list of users to show horizontal scroll logic */}
             {/* User 1: Nomsa */}
             <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-14 h-14 rounded-full bg-blue-400 border-2 border-white dark:border-gray-800 shadow-sm relative">
                    {/* Green Dot = Online Status */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Nomsa</span>
             </div>
             {/* User 2: Khotso */}
             <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-14 h-14 rounded-full bg-purple-400 border-2 border-white dark:border-gray-800 shadow-sm relative">
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Khotso</span>
             </div>
             {/* User 3: Sipho (Grey dot = Offline) */}
             <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-14 h-14 rounded-full bg-yellow-400 border-2 border-white dark:border-gray-800 shadow-sm relative">
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-300 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Sipho</span>
             </div>
             {/* User 4: Zama */}
             <div className="flex flex-col items-center gap-1 min-w-[60px]">
                <div className="w-14 h-14 rounded-full bg-pink-400 border-2 border-white dark:border-gray-800 shadow-sm relative">
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Zama</span>
             </div>
          </div>
        </div>
      )}

      {/* --- MESSAGE LIST --- */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
            {/* Dynamic Header: Changes if filtering */}
            {query ? `Results (${filteredChats.length})` : "Recent"}
        </h2>

        {/* Conditional Rendering: Show list OR 'No Found' message */}
        {filteredChats.length > 0 ? (
            // MAP FUNCTION: Creates a list item for every chat in our database
            filteredChats.map((chat) => (
                <Link href={`/chat/${chat.id}`} key={chat.id}>
                    {/* Chat Card */}
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-center gap-4 active:scale-95 transition-transform mb-2 border border-transparent dark:border-gray-800">
                        {/* Avatar */}
                        <div className={`w-12 h-12 rounded-full ${chat.color} flex-shrink-0`}></div>
                        
                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{chat.name}</h3>
                                {/* Time Stamp (Blue if unread, Grey if read) */}
                                <span className={`text-xs font-bold ${chat.unread > 0 ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>
                                    {chat.time}
                                </span>
                            </div>
                            {/* Message Preview (Truncated text) */}
                            <p className={`text-sm truncate ${chat.unread > 0 ? "text-gray-900 dark:text-gray-200 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
                                {chat.message}
                            </p>
                        </div>

                        {/* Unread Badge (Only visible if unread > 0) */}
                        {chat.unread > 0 && (
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-[10px] font-bold">{chat.unread}</span>
                            </div>
                        )}
                    </div>
                </Link>
            ))
        ) : (
            // Empty State
            <div className="text-center py-10 text-gray-400 text-sm">
                No chats found matching &quot;{query}&quot;
            </div>
        )}
      </div>

    </main>
  );
}