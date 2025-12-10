/**
 * FILE: src/app/chat/profile/[id]/page.tsx
 * TITLE: Dynamic Profile Detail Page
 * PURPOSE: 
 * This page serves as a flexible template to display profile information.
 * It is "Dynamic" because it adapts its content based on the URL ID.
 * * KEY FEATURES:
 * 1. Dynamic Content: Displays different info for "Nomsa" vs "Study Group".
 * 2. Conditional Layouts: If viewing a Group, it shows a Member List. 
 * If viewing a Person, it shows a Bio and Contact Info.
 * 3. Reusable Components: Uses the same buttons and headers for both views.
 * 4. Dark Mode Support: Fully styled for both light and dark themes.
 */

"use client"; // Runs in the browser (needed to read the URL parameters dynamically)

import Link from "next/link";
import { use } from "react"; // A React Hook to "unwrap" the URL parameters safely

// --- MOCK DATABASE ---
// In a real app, this data would live in a secure database like PostgreSQL or MongoDB.
// Here, we simulate it with a JavaScript object acting as a lookup table.
const profiles: Record<string, any> = {
  // User Profile Example
  nomsa: {
    type: "user",
    name: "Nomsa Dlamini",
    initials: "ND",
    color: "bg-blue-400",
    role: "Mathematics • 3rd Year",
    bio: "Math major who loves calculus and statistics. Always down for a study session at the library!",
    commonGroups: ["Study Group A", "Calc 101"],
    email: "nomsa.d@student.university.ac.za"
  },
  // User Profile Example
  khotso: {
    type: "user",
    name: "Khotso Mokoena",
    initials: "KM",
    color: "bg-pink-400",
    role: "Computer Science • 2nd Year",
    bio: "Coding is life. Currently struggling with Algorithms. Let's pair program!",
    commonGroups: ["CS 2024", "Hackathon Team"],
    email: "khotso.m@student.university.ac.za"
  },
  // Group Profile Example (Notice the different data structure: 'members' instead of 'bio')
  studygroup: {
    type: "group",
    name: "Study Group A",
    initials: "SG",
    color: "bg-purple-400",
    description: "Official study group for Calculus 101. We meet every Tuesday and Thursday at the main library.",
    members: [
      { name: "Thabo Nkosi", role: "Admin", you: true },
      { name: "Nomsa Dlamini", role: "Member" },
      { name: "Khotso Mokoena", role: "Member" },
      { name: "Sipho Zulu", role: "Member" },
    ]
  }
};

// COMPONENT DEFINITION
// 'params' is an object containing the dynamic parts of the URL.
// If the URL is '/chat/profile/nomsa', then params.id = "nomsa".
export default function ChatProfilePage({ params }: { params: Promise<{ id: string }> }) {
  
  // Unwrap the 'id' from the parameters
  const { id } = use(params);
  
  // LOOKUP LOGIC:
  // We check if the ID exists in our 'profiles' database. 
  // If not (e.g., random URL), we fallback to 'nomsa' to prevent the app from crashing.
  const profile = profiles[id.toLowerCase()] || profiles['nomsa'];

  return (
    // Main Container
    // 'min-h-full': Ensures background color stretches to the bottom of the content.
    // 'transition-colors': Makes theme switching (Light <-> Dark) smooth instead of instant.
    <main className="bg-gray-50 dark:bg-gray-900 min-h-full font-sans pb-32 transition-colors duration-300">
      
      {/* --- NAVBAR --- */}
      <div className="flex items-center justify-between px-6 pt-6 mb-6">
        {/* Back Button: Dynamically links back to the specific chat we came from */}
        <Link href={`/chat/${id}`} className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </Link>
        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Profile Info</span>
        <div className="w-10"></div> {/* Invisible Spacer to keep the title perfectly centered */}
      </div>

      {/* --- PROFILE CONTENT --- */}
      <div className="px-6">
        
        {/* Avatar Section: Displays Initials in a colored circle */}
        <div className={`w-28 h-28 rounded-full ${profile.color} flex items-center justify-center text-3xl font-bold text-white shadow-lg mx-auto mb-4 border-4 border-white dark:border-gray-900`}>
           {profile.initials}
        </div>

        {/* Name & Role Section */}
        <div className="text-center mb-8">
           <h1 className="text-2xl font-bold text-black dark:text-white mb-1">{profile.name}</h1>
           {/* Conditional Text: If it's a group, show member count. If user, show their role. */}
           <p className="text-gray-500 dark:text-gray-300 text-sm font-medium bg-gray-200 dark:bg-gray-800 inline-block px-3 py-1 rounded-full">
             {profile.type === 'group' ? `${profile.members.length} Members` : profile.role}
           </p>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}
        {/* This block decides WHICH layout to show based on the profile type. */}
        {profile.type === 'group' ? (
          
          // === LAYOUT A: GROUP VIEW ===
          <div className="space-y-4">
             {/* Group Description Card */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Group Description</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{profile.description}</p>
             </div>

             {/* Member List Card */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                   {profile.members.length} Participants
                </h2>
                <div className="space-y-4">
                   {/* Loop through the members array to create a list item for each person */}
                   {profile.members.map((member: any, i: number) => (
                      <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-xs">
                               {member.name.charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                               {member.name} {member.you && <span className="text-gray-400 dark:text-gray-500 font-normal">(You)</span>}
                            </span>
                         </div>
                         {/* Only show "Admin" badge if the member is an admin */}
                         {member.role === 'Admin' && (
                            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded">
                               Admin
                            </span>
                         )}
                      </div>
                   ))}
                </div>
             </div>
          </div>

        ) : (
          
          // === LAYOUT B: USER VIEW ===
          <div className="space-y-4">
             {/* Bio Card */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">About</h2>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
             </div>

             {/* Contact Info Card */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Contact Info</h2>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   </div>
                   <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate">{profile.email}</span>
                </div>
             </div>

             {/* Common Groups Card (Tags) */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">Groups in Common</h2>
                <div className="flex flex-wrap gap-2">
                   {profile.commonGroups.map((group: string) => (
                      <span key={group} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 dark:border-gray-600">
                         {group}
                      </span>
                   ))}
                </div>
             </div>
          </div>
        )}

        {/* --- ACTION BUTTONS --- */}
        <div className="mt-8 flex flex-col gap-3">
           {/* Primary Danger Button (Context Aware: 'Exit Group' vs 'Block User') */}
           <button className="w-full bg-white dark:bg-gray-800 text-red-500 dark:text-red-400 py-4 rounded-xl font-bold text-sm shadow-sm border border-red-50 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              {profile.type === 'group' ? 'Exit Group' : 'Block User'}
           </button>
           {/* Secondary Button */}
           <button className="w-full bg-transparent text-gray-400 dark:text-gray-500 py-2 font-bold text-xs hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Report Problem
           </button>
        </div>

      </div>
    </main>
  );
}