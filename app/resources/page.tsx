/**
 * FILE: src/app/resources/page.tsx
 * TITLE: Resources Library Page
 * PURPOSE: 
 * This page serves as a digital library for students.
 * * KEY FEATURES:
 * 1. Search Bar: Filters resources by title (e.g., "Calculus").
 * 2. Category Chips: Filters resources by subject (e.g., "Math", "Physics").
 * 3. Resource List: Displays files with metadata (size, type) and download buttons.
 * 4. Upload Link: Provides a button to navigate to the "Upload Resource" page.
 */

"use client"; // Interactive page (needs browser JavaScript for filtering)

import Link from "next/link";
import { useState } from "react";

// --- MOCK DATABASE ---
// Simulating a backend API response with a list of file objects.
const allResources = [
  { id: 1, title: "Calculus 101 Finals", subject: "Mathematics", type: "PDF", size: "2.4 MB", color: "bg-red-50 dark:bg-red-900/20", textColor: "text-red-500 dark:text-red-400" },
  { id: 2, title: "Data Structures Notes", subject: "Comp. Sci", type: "DOC", size: "1.1 MB", color: "bg-blue-50 dark:bg-blue-900/20", textColor: "text-blue-500 dark:text-blue-400" },
  { id: 3, title: "Physics Lab Results", subject: "Physics", type: "XLS", size: "800 KB", color: "bg-green-50 dark:bg-green-900/20", textColor: "text-green-600 dark:text-green-400" },
  { id: 4, title: "Linear Algebra Intro", subject: "Mathematics", type: "PDF", size: "3.2 MB", color: "bg-red-50 dark:bg-red-900/20", textColor: "text-red-500 dark:text-red-400" },
  { id: 5, title: "React.js Crash Course", subject: "Comp. Sci", type: "PDF", size: "5.5 MB", color: "bg-blue-50 dark:bg-blue-900/20", textColor: "text-blue-500 dark:text-blue-400" },
];

const categories = ["All", "Mathematics", "Comp. Sci", "Physics"];

export default function ResourcesPage() {
  // --- STATE MANAGEMENT ---
  // 1. searchQuery: Stores text from the input bar.
  // 2. selectedCategory: Stores the currently active filter chip (defaults to "All").
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // --- FILTER LOGIC ---
  // This function runs automatically whenever the state (query or category) changes.
  // It returns a new array containing only the items that match BOTH criteria.
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.subject === selectedCategory;
    
    // Both conditions must be true for the item to appear.
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* Header Section */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
            {/* Back Button (links to Dashboard) */}
            <Link href="/" className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-600 dark:text-gray-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </Link>
            <h1 className="text-2xl font-bold text-black dark:text-white">Resources</h1>
        </div>
        
        <div className="flex gap-2">
            {/* Upload Button: Links to the Upload Page */}
            <Link href="/resources/upload">
                <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-200 dark:shadow-none active:scale-90 transition-transform">
                    {/* Plus Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
            </Link>

            {/* Filter Icon (Visual Placeholder) */}
            <button className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-600 dark:text-gray-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            </button>
        </div>
      </header>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes, papers..." 
          className="w-full bg-white dark:bg-gray-900 py-3 pl-10 pr-4 rounded-xl shadow-sm text-gray-600 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-colors"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* Category Chips (Horizontal Scroll) */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-2 no-scrollbar">
         {categories.map((cat) => (
            <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                // Dynamic Styling: If active, blue background. If inactive, white/grey background.
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-sm border transition-colors ${
                    selectedCategory === cat 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
            >
                {cat}
            </button>
         ))}
      </div>

      {/* Resource List Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mt-2">
            {/* Dynamic Header: "Searching for..." vs "Recently Added" */}
            {searchQuery ? `Searching for "${searchQuery}"` : "Recently Added"}
        </h2>
        
        {/* Conditional Rendering: Show list OR empty state */}
        {filteredResources.length > 0 ? (
            filteredResources.map((file) => (
                // Individual Resource Card
                <div key={file.id} className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm flex items-center border border-gray-50 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-2 transition-colors">
                    {/* File Icon Box (Color coded by file type) */}
                    <div className={`w-12 h-12 rounded-xl ${file.color} flex items-center justify-center mr-4`}>
                        <span className={`${file.textColor} font-bold text-xs`}>{file.type}</span>
                    </div>
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm truncate">{file.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{file.subject} • {file.size}</p>
                    </div>
                    {/* Download Button Icon */}
                    <button className="p-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </button>
                </div>
            ))
        ) : (
            // Empty State (Shown when no results match)
            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <svg className="w-12 h-12 mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-sm">No resources found.</p>
            </div>
        )}
      </div>

    </main>
  );
}