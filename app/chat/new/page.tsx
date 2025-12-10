/**
 * FILE: src/app/chat/new/page.tsx
 * TITLE: Find Peers / New Chat Wizard
 * PURPOSE: 
 * This page allows users to discover new people to chat with. 
 * Instead of just a list, it acts as a "Wizard" with 3 steps:
 * 1. Main Menu (Choose how to search: Uni, Subject, or Group).
 * 2. Selection Screen (e.g., Pick your University).
 * 3. Results Screen (See a list of students matching your criteria).
 * * KEY FEATURES:
 * - Multi-step navigation without changing the URL (using State).
 * - Advanced Filtering (filtering students by University AND Year).
 * - Dark Mode compatible styling.
 */

"use client"; // Runs in the browser because we need to track which "step" the user is on.

import Link from "next/link";
import { useState } from "react";

// --- MOCK DATABASE ---
// In a real app, you would fetch this list from your server based on the user's location.

// 1. List of Universities (for the Selection Step)
const universities = [
  { id: "ukzn", name: "UKZN", full: "University of KwaZulu-Natal", color: "bg-red-600" },
  { id: "uct", name: "UCT", full: "University of Cape Town", color: "bg-blue-700" },
  { id: "wits", name: "Wits", full: "University of the Witwatersrand", color: "bg-yellow-600" },
  { id: "up", name: "UP", full: "University of Pretoria", color: "bg-blue-900" },
  { id: "uj", name: "UJ", full: "University of Johannesburg", color: "bg-orange-600" },
];

// 2. List of Students (The "Pool" of people we can connect with)
const mockStudents = [
  { name: "Sipho M.", uni: "ukzn", year: "3rd Year", course: "Comp Sci", status: "Looking for study buddy" },
  { name: "Thando Z.", uni: "ukzn", year: "1st Year", course: "Mathematics", status: "Need help with Calc" },
  { name: "Kyle V.", uni: "uct", year: "2nd Year", course: "Economics", status: "Exam prep group?" },
  { name: "Lerato K.", uni: "wits", year: "Honours", course: "Physics", status: "Available to tutor" },
  { name: "Jason D.", uni: "up", year: "1st Year", course: "Informatics", status: "Study Group A" },
];

export default function FindPeersPage() {
  // --- STATE MANAGEMENT ---
  
  // 1. 'step': Controls which "screen" is visible. 
  //    It can be 'menu', 'universities', or 'results'.
  const [step, setStep] = useState<"menu" | "universities" | "results">("menu");
  
  // 2. 'selectedUni': Remembers which university the user clicked on.
  const [selectedUni, setSelectedUni] = useState<string | null>(null);
  
  // 3. 'selectedFilter': Remembers the active filter chip (e.g., "1st Year").
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // --- FILTER LOGIC ---
  // This logic runs automatically before rendering. It takes the full list of students
  // and keeps only the ones that match the user's choices.
  const filteredStudents = mockStudents.filter((s) => {
    // Rule 1: Does the student belong to the selected University?
    if (selectedUni && s.uni !== selectedUni) return false;
    
    // Rule 2: Does the student match the selected Year filter? (Ignore if "All" is selected)
    if (selectedFilter !== "All" && s.year !== selectedFilter) return false;
    
    // If they pass both rules, keep them in the list.
    return true;
  });

  return (
    <main className="flex flex-col min-h-full bg-gray-50 dark:bg-gray-900 font-sans relative transition-colors duration-300">
      
      {/* --- HEADER --- */}
      <header className="bg-white dark:bg-gray-900 px-4 py-3 shadow-sm flex items-center sticky top-0 z-30 transition-colors border-b border-transparent dark:border-gray-800">
        {/* Back Button Logic:
            If we are on the Main Menu, go back to the Chat List (browser history).
            If we are deep inside the wizard (e.g., Results), go back to the Main Menu.
        */}
        <button 
          onClick={() => step === "menu" ? window.history.back() : setStep("menu")}
          className="mr-4 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        
        {/* Dynamic Title: Changes based on the current step */}
        <h1 className="text-xl font-bold text-black dark:text-white">
            {step === "menu" ? "New Message" : step === "universities" ? "Select University" : "Find Students"}
        </h1>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 p-4 pb-24 overflow-y-auto">
        
        {/* VIEW 1: MAIN MENU 
            Shown only when step is "menu".
        */}
        {step === "menu" && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">How do you want to connect?</p>
            
            {/* Button: Find by University */}
            <button 
                onClick={() => setStep("universities")}
                className="w-full bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Find University</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Connect with students at UKZN, UCT, Wits...</p>
                </div>
            </button>

            {/* Button: Find Subjects (Visual Placeholder) */}
            <button className="w-full bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Find Subjects</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Search for Math, CS, Physics modules...</p>
                </div>
            </button>

            {/* Button: Find Study Groups (Visual Placeholder) */}
            <button className="w-full bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Find Study Groups</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Join existing groups in your area</p>
                </div>
            </button>
          </div>
        )}

        {/* VIEW 2: UNIVERSITY LIST 
            Shown when step is "universities".
        */}
        {step === "universities" && (
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
             {universities.map((uni) => (
                <button 
                  key={uni.id}
                  onClick={() => { setSelectedUni(uni.id); setStep("results"); }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center gap-3 hover:border-blue-500 dark:hover:border-blue-500 transition-colors h-32"
                >
                   <div className={`w-12 h-12 rounded-full ${uni.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                      {uni.name}
                   </div>
                   <span className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{uni.full}</span>
                </button>
             ))}
          </div>
        )}

        {/* VIEW 3: RESULTS (STUDENT LIST)
            Shown when step is "results". This is where we see the filtered students.
        */}
        {step === "results" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Filter Chips (Scrollable list of Years) */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
               {["All", "1st Year", "2nd Year", "3rd Year", "Honours"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    // Conditional Styling: Black background if selected, white if not.
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                       selectedFilter === filter 
                       ? "bg-black dark:bg-white text-white dark:text-black" 
                       : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {filter}
                  </button>
               ))}
            </div>

            {/* Results List */}
            <div className="space-y-3">
               <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                 Showing Students at {universities.find(u => u.id === selectedUni)?.name}
               </h2>
               
               {/* Loop through filtered students */}
               {filteredStudents.length > 0 ? (
                 filteredStudents.map((student, index) => (
                   <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300">
                            {student.name.charAt(0)}
                         </div>
                         <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{student.name}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{student.course} • {student.year}</p>
                         </div>
                      </div>
                      <Link href="/chat/khotso"> {/* Placeholder link to a chat */}
                        <button className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                           Message
                        </button>
                      </Link>
                   </div>
                 ))
               ) : (
                 // Empty State
                 <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">
                    No students found for this filter.
                 </div>
               )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}