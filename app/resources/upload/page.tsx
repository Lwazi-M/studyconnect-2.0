/**
 * FILE: src/app/resources/upload/page.tsx
 * TITLE: Upload Resource Page
 * PURPOSE: 
 * This screen allows users to "upload" study materials (PDFs, images, etc.) to the platform.
 * * KEY FEATURES:
 * 1. File Selection: A drag-and-drop style zone to pick files.
 * 2. Form Input: Fields for the title, subject, and optional auto-delete date.
 * 3. Simulated Backend: Since we don't have a real server, we use a 'timeout' 
 * to fake a 2-second upload process, showing a loading spinner to the user.
 * 4. Dark Mode Support: All inputs and backgrounds adapt to dark themes.
 */

// "use client" tells Next.js to run this code in the browser.
// We need this because we are tracking user interactions (clicks, file selection).
"use client";

import Link from "next/link"; // For navigation links
import { useState } from "react"; // For managing local state (memory)

export default function UploadResourcePage() {
  // --- STATE MANAGEMENT (The Component's Memory) ---
  
  // 1. 'file': Stores the actual file object the user selects from their computer.
  //    Initially null because no file is selected yet.
  const [file, setFile] = useState<File | null>(null);
  
  // 2. 'isUploading': A simple True/False flag. 
  //    If True, we show a spinning loader. If False, we show the "Upload" button.
  const [isUploading, setIsUploading] = useState(false);

  // --- EVENT HANDLERS (The Logic) ---

  // This function runs when the user picks a file input.
  // It checks if a file exists and saves it to our 'file' state.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // This function runs when the user clicks "Upload Resource".
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from refreshing (default browser behavior)
    setIsUploading(true); // Turn on the loading spinner

    // SIMULATION: Fake a network request
    // We use setTimeout to wait for 2000 milliseconds (2 seconds).
    // This lets the recruiter see the beautiful loading state we built.
    setTimeout(() => {
      setIsUploading(false); // Turn off the spinner
      
      // Show a professional alert explaining this is a demo
      alert(
        "⚠️ PORTFOLIO DEMO MODE\n\n" +
        "This feature is simulated for demonstration purposes.\n" +
        "In a production environment, this file would be sent to a cloud storage bucket (e.g., AWS S3 or Firebase Storage) and the metadata saved to a database.\n\n" +
        "No data has been sent."
      );
    }, 2000);
  };

  return (
    // Main Container
    // 'bg-transparent': Lets the global background show through.
    // 'pb-32': Adds padding at the bottom so the button isn't covered by the phone frame.
    <main className="bg-transparent p-6 font-sans pb-32">
      
      {/* --- HEADER SECTION --- */}
      <header className="flex items-center mb-8">
        {/* Back Button: Links back to the main Resources list */}
        <Link href="/resources" className="p-2 -ml-2 mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </Link>
        <h1 className="text-xl font-bold text-black dark:text-white">Upload Resource</h1>
      </header>

      {/* --- UPLOAD FORM --- */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. File Drop Zone */}
        {/* This creates a dashed box that looks like a drag-and-drop area. */}
        <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">File</label>
            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                {/* The actual <input> is invisible (opacity-0) but covers the whole box so you can click anywhere */}
                <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {/* CONDITIONAL RENDERING:
                    If 'file' exists (user selected something), show the file icon and name.
                    Else, show the "Tap to upload" prompt.
                */}
                {file ? (
                    // State A: File Selected
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{file.name}</span>
                        <span className="text-xs text-blue-500 dark:text-blue-400 font-bold">Change File</span>
                    </div>
                ) : (
                    // State B: No File Selected (Empty)
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tap to upload a file</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">PDF, DOCX, JPG (Max 10MB)</span>
                    </div>
                )}
            </div>
        </div>

        {/* 2. Title Input Field */}
        <div>
           <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Resource Title</label>
           <input 
             type="text" 
             placeholder="e.g. Calculus Final Exam 2024"
             required
             // Styling: Dark mode background (gray-900) and light text (white)
             className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 shadow-sm border border-transparent dark:border-gray-800 transition-colors placeholder-gray-400 dark:placeholder-gray-600"
           />
        </div>

        {/* 3. Subject Dropdown Selection */}
        <div>
           <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Subject</label>
           <div className="relative">
               <select className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 shadow-sm border border-transparent dark:border-gray-800 appearance-none transition-colors">
                  <option>Mathematics</option>
                  <option>Computer Science</option>
                  <option>Physics</option>
                  <option>Economics</option>
                  <option>Other</option>
               </select>
               {/* Custom Chevron Icon (because default browser arrows look ugly) */}
               <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
               </div>
           </div>
        </div>

        {/* 4. Auto-Delete Toggle (Feature requested for privacy/cleanup) */}
        <div>
           <div className="flex justify-between items-center mb-2">
               <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Auto-Remove Date</label>
               <span className="text-[10px] bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">Optional</span>
           </div>
           <input 
             type="date" 
             className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 shadow-sm border border-transparent dark:border-gray-800 transition-colors"
           />
           <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 ml-1">
              File will be permanently deleted from the database after this date.
           </p>
        </div>

        {/* 5. Submit Button (Sticky to bottom) */}
        <div className="sticky bottom-0 pt-4 pb-4 bg-transparent flex flex-col gap-3">
            <button 
                type="submit"
                // Disable button if no file is selected OR if it's currently uploading
                disabled={!file || isUploading}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    !file || isUploading 
                    ? "bg-gray-300 dark:bg-gray-800 text-gray-500 dark:text-gray-600 cursor-not-allowed" 
                    : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200"
                }`}
            >
               {/* Show Spinner if uploading, otherwise show Text */}
               {isUploading ? (
                 <>
                   <svg className="animate-spin h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Simulating Upload...
                 </>
               ) : (
                 "Upload Resource"
               )}
            </button>
            
            {/* Portfolio Disclaimer */}
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 font-medium px-4">
               *This is a portfolio demo. No files are actually stored on a server.
            </p>
        </div>

      </form>
    </main>
  );
}