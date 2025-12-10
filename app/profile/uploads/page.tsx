/**
 * FILE: src/app/profile/uploads/page.tsx
 * TITLE: Manage Uploads Dashboard
 * PURPOSE: 
 * This screen allows users to view a list of their uploaded files and delete them.
 * It serves as a management dashboard for user content.
 * * KEY FEATURES:
 * 1. List View: Displays files with details like type (PDF/DOC), size, and upload date.
 * 2. Delete Simulation: "Fakes" a server deletion process with a loading spinner.
 * 3. State Management: Updates the list locally (removes the item) after deletion.
 * 4. Conditional UI: Shows different button states (Normal vs. Loading) and an empty state if the list is clear.
 */

"use client"; // Required because we use 'useState' to manage the list of files interactively.

import Link from "next/link";
import { useState } from "react";

export default function ManageUploadsPage() {
  // --- MOCK DATABASE (LOCAL STATE) ---
  // In a real app, this data would come from a database (like MongoDB). 
  // Here, we store it in the component's memory ('useState') so we can manipulate it (delete items).
  const [uploads, setUploads] = useState([
    { id: 1, name: "Calculus 101 Finals", type: "PDF", size: "2.4 MB", date: "Oct 12, 2025", autoDelete: "Never" },
    { id: 2, name: "Physics Lab Results", type: "XLS", size: "800 KB", date: "Oct 15, 2025", autoDelete: "Dec 31, 2025" },
    { id: 3, name: "Project Proposal v2", type: "DOC", size: "1.1 MB", date: "Oct 20, 2025", autoDelete: "Never" },
  ]);

  // --- LOADING STATE TRACKER ---
  // We need to know WHICH specific item is being deleted so we can show a spinner ONLY on that button.
  // If we just used a boolean (true/false), all buttons would spin at once!
  // 'deletingId' holds the ID number of the item currently being removed.
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // --- DELETE LOGIC ---
  const handleDelete = (id: number) => {
    // 1. Safety Check: Ask the user to confirm. 
    // This prevents accidental clicks.
    if(!confirm("Are you sure you want to remove this file?")) return;

    // 2. Start Loading: Tell the UI "Item with this ID is busy".
    setDeletingId(id);

    // 3. Server Simulation: Fake a 1.5-second delay.
    // Real servers take time to respond. We simulate this to show off the UI feedback (spinner).
    setTimeout(() => {
        // 4. Portfolio Alert: Inform the recruiter/user what just happened.
        alert(
            "⚠️ PORTFOLIO DEMO MODE\n\n" +
            "Deletion Simulated. In a production app, this would send a DELETE request to your API/Database.\n\n" +
            "The item will now be removed from the view."
        );

        // 5. Update UI: Create a NEW list that filters OUT the deleted item.
        // We look at every item in 'prev' (previous list) and keep it ONLY if its ID doesn't match the deleted one.
        setUploads(prev => prev.filter(item => item.id !== id));
        
        // 6. Stop Loading: Reset the tracker since the action is done.
        setDeletingId(null);
    }, 1500);
  };

  return (
    // Main Container
    // 'p-6': Padding around the edges.
    // 'pb-32': Extra padding at bottom to avoid overlap with navigation.
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* --- HEADER --- */}
      <header className="flex items-center mb-8">
        {/* Back Button -> Returns to Profile Menu */}
        <Link href="/profile" className="p-2 -ml-2 mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </Link>
        <h1 className="text-xl font-bold text-black dark:text-white">Manage Uploads</h1>
      </header>

      {/* --- FILE LIST --- */}
      <div className="space-y-4">
        {/* Loop through our 'uploads' state and create a card for each file */}
        {uploads.map((file) => (
            <div key={file.id} className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-3 transition-all duration-300">
                
                {/* Top Section: File Icon and Name */}
                <div className="flex items-center gap-3">
                    {/* File Type Badge (e.g., PDF) */}
                    <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400">
                        {file.type}
                    </div>
                    {/* File Metadata */}
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-sm truncate">{file.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{file.size} • Uploaded {file.date}</p>
                    </div>
                </div>

                {/* Bottom Section: Controls & Settings */}
                <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-3 mt-1">
                    
                    {/* Setting: Auto-Remove Status */}
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500">Auto-Remove</span>
                        <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">
                            {/* Refresh Icon */}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            {file.autoDelete}
                        </div>
                    </div>

                    {/* Action: Delete Button */}
                    <button 
                        onClick={() => handleDelete(file.id)}
                        // Disable this specific button if it is the one currently deleting
                        disabled={deletingId === file.id}
                        className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                            deletingId === file.id 
                            ? "bg-red-50 dark:bg-red-900/30 text-red-300 dark:text-red-400 cursor-wait" // Loading Style
                            : "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50" // Normal Style
                        }`}
                    >
                        {/* CONDITIONAL CONTENT:
                            If 'deletingId' matches this file's ID, show the Spinner.
                            Otherwise, show the Trash Icon and "Remove" text.
                        */}
                        {deletingId === file.id ? (
                            <>
                                {/* Loading Spinner Icon */}
                                <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Removing...
                            </>
                        ) : (
                            <>
                                {/* Trash Can Icon */}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                Remove
                            </>
                        )}
                    </button>
                </div>
            </div>
        ))}

        {/* --- EMPTY STATE --- */}
        {/* If the array is empty (user deleted everything), show this placeholder. */}
        {uploads.length === 0 && (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
                <p>No uploads found.</p>
                <p className="text-xs mt-2 opacity-50">Uploads you make will appear here.</p>
            </div>
        )}

        {/* Portfolio Disclaimer */}
        <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 font-medium mt-8">
            *This is a portfolio demo. Changes are local-only.
        </p>
      </div>

    </main>
  );
}