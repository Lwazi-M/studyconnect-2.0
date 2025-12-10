/**
 * FILE: src/app/profile/edit/page.tsx
 * TITLE: Edit Profile Screen
 * PURPOSE: 
 * This page allows the user to update their personal details.
 * * KEY FEATURES:
 * 1. Form Inputs: Fields for Name, Degree, Year, and Bio.
 * 2. Sticky Footer: The "Save Changes" button stays fixed at the bottom of the screen,
 * even if the form is long and scrolling.
 * 3. Flexbox Layout: Uses a clever CSS trick (flex-col + flex-1) to ensure the 
 * layout fills the screen height, pushing the footer down naturally.
 * 4. Dark Mode: All inputs and backgrounds adapt to dark themes.
 */

"use client"; // Needs to be client-side for navigation and interactivity.

import Link from "next/link"; // Tool for linking back to the Profile page.

export default function EditProfile() {
  return (
    // MAIN CONTAINER SETUP:
    // 1. 'min-h-full': Forces the container to be at least as tall as the phone screen.
    // 2. 'flex flex-col': Stacks items vertically (Header -> Form -> Footer).
    // This layout is crucial for the "Sticky Footer" to work correctly.
    <main className="bg-transparent font-sans min-h-full flex flex-col">
      
      {/* SCROLLABLE CONTENT AREA:
          'flex-1': This magic class tells this div to "grow" and take up all available space.
          If the form is short, this empty space pushes the Save Button to the bottom.
          If the form is long, this area becomes scrollable.
          'pb-24': Adds padding at the bottom so the last input isn't hidden behind the button.
      */}
      <div className="flex-1 p-6 pb-24">
        
        {/* --- HEADER --- */}
        <header className="flex items-center mb-8">
          {/* Back Button: Takes us back to the main Profile view */}
          <Link href="/profile" className="p-2 -ml-2 mr-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </Link>
          <h1 className="text-xl font-bold text-black dark:text-white">Edit Profile</h1>
        </header>

        {/* --- FORM SECTION --- */}
        <div className="space-y-6">
          
          {/* Profile Picture Editor */}
          <div className="flex flex-col items-center mb-6">
             {/* Current Avatar Display */}
             <div className="w-24 h-24 bg-blue-500 rounded-full mb-3 border-4 border-gray-100 dark:border-gray-800 flex items-center justify-center text-4xl shadow-lg">
                👨🏾‍🎓
             </div>
             {/* Change Photo Link (Visual only for this demo) */}
             <button className="text-blue-600 dark:text-blue-400 text-sm font-bold hover:underline">Change Photo</button>
          </div>

          {/* Name Input Field */}
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
             <input 
               type="text" 
               defaultValue="Thabo Nkosi" // Pre-filled value
               className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors shadow-sm"
             />
          </div>

          {/* Degree Input Field */}
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Degree / Major</label>
             <input 
               type="text" 
               defaultValue="BSc Computer Science" 
               className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors shadow-sm"
             />
          </div>

          {/* Year Input Field */}
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Year of Study</label>
             <input 
               type="text" 
               defaultValue="3rd Year" 
               className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors shadow-sm"
             />
          </div>

          {/* Bio Text Area (Multi-line input) */}
          <div>
             <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Bio</label>
             <textarea 
               defaultValue="Aspiring software engineer. Love React and Tailwind!" 
               // 'resize-none': Prevents the user from dragging the corner to resize the box
               className="w-full bg-white dark:bg-gray-900 p-4 rounded-xl text-gray-900 dark:text-white font-medium outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 h-32 resize-none transition-colors shadow-sm"
             />
          </div>

        </div>
      </div>

      {/* --- STICKY FOOTER BUTTON --- 
          This section stays "stuck" to the bottom of the screen.
          'sticky bottom-0': The CSS rule that makes it stick.
          'backdrop-blur-xl': Gives it that frosty, see-through glass effect over the content behind it.
      */}
      <div className="sticky bottom-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-6 z-50">
         <Link href="/profile" className="block w-full">
            <button className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform hover:bg-gray-900 dark:hover:bg-gray-200">
               Save Changes
            </button>
         </Link>
      </div>

    </main>
  );
}