/**
 * FILE: src/app/chat/[id]/page.tsx
 * TITLE: Chat Detail Screen (Conversation View)
 * PURPOSE: 
 * This screen displays a specific conversation between the user and a peer (or group).
 * * KEY FEATURES:
 * 1. Dynamic Routing: The '[id]' in the filename allows this one page to handle ANY chat 
 * (e.g., /chat/nomsa, /chat/khotso) by reading the URL parameter.
 * 2. Message History: Loads a unique conversation for each user ID.
 * 3. Conditional Styling: "Sent" messages are Blue/Right-aligned, "Received" messages are White/Left-aligned.
 * 4. Group Chat Logic: Shows sender names (e.g., "Sipho") only in group contexts.
 */

import Link from "next/link"; // For navigation (Back button, Profile link)

// --- MOCK DATABASE ---
// 1. User Metadata: Stores static details like the user's name, avatar color, and online status.
// This simulates fetching a user profile from a database based on their ID.
const chatData: Record<string, { name: string; initials: string; status: string; color: string }> = {
  nomsa: { 
    name: "Nomsa Dlamini", 
    initials: "ND", 
    status: "Online", 
    color: "bg-blue-400" 
  },
  khotso: { 
    name: "Khotso Mokoena", 
    initials: "KM", 
    status: "Last seen 2h ago", 
    color: "bg-pink-400" 
  },
  studygroup: { 
    name: "Study Group A", 
    initials: "SG", 
    status: "3 Online", 
    color: "bg-purple-400" 
  },
};

// 2. Message History: Stores the actual text logs for each conversation.
// 'isMe: true' -> The message was sent BY the current user (Blue bubble).
// 'isMe: false' -> The message was sent TO the current user (Grey bubble).
// 'senderName' -> Used in group chats to identify who said what.
const messagesDB: Record<string, Array<{ text: string; time: string; isMe: boolean; senderName?: string }>> = {
  nomsa: [
    { text: "Hey Thabo! 👋 Are you coming online for the study group session later?", time: "10:30 AM", isMe: false },
    { text: "Yes! I'll be there.", time: "10:32 AM", isMe: true },
    { text: "Did you get the answer for Q3?", time: "10:33 AM", isMe: false },
  ],
  khotso: [
    { text: "Yo, are you done with the CS assignment?", time: "Mon", isMe: true },
    { text: "Yeah just submitted it now.", time: "Mon", isMe: false },
    { text: "Thanks man, really appreciate the help!", time: "Mon", isMe: false },
  ],
  studygroup: [
    { text: "Guys, are we meeting at the library or online?", time: "Yesterday", isMe: false, senderName: "Sipho" },
    { text: "I think online is better today.", time: "Yesterday", isMe: false, senderName: "Nomsa" },
    { text: "Cool. I'll bring the past papers.", time: "Yesterday", isMe: true },
  ]
};

// COMPONENT DEFINITION
// 'async' is used because in a real app, we would await a database call here.
// 'params' contains the dynamic ID from the URL (e.g., "nomsa").
export default async function ChatDetail({ params }: { params: Promise<{ id: string }> }) {
  
  // Unwrap the URL parameter to get the Chat ID
  const { id } = await params;
  const chatId = id.toLowerCase();
  
  // Fetch Data: Look up the user and messages in our mock DB. 
  // If the ID doesn't exist, fallback to 'nomsa' to prevent crashes.
  const user = chatData[chatId] || chatData['nomsa'];
  const messages = messagesDB[chatId] || [];

  return (
    // Main Container
    // 'flex-col min-h-full': Ensures the chat window fills the entire vertical space.
    <main className="flex flex-col min-h-full bg-gray-50 dark:bg-gray-950 font-sans relative transition-colors duration-300">
      
      {/* --- HEADER SECTION --- */}
      {/* 'sticky top-0': Keeps the header fixed at the top even when you scroll through messages. */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-3 shadow-sm flex items-center sticky top-0 z-30 transition-colors border-b border-transparent dark:border-gray-800">
        
        {/* Back Button */}
        <Link href="/chat" className="mr-4 p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </Link>
        
        {/* User Avatar */}
        <div className={`w-10 h-10 rounded-full ${user.color} flex items-center justify-center text-white font-bold mr-3 text-sm shadow-sm`}>
          {user.initials}
        </div>
        
        {/* User Name & Status */}
        <div>
          <h1 className="font-bold text-gray-900 dark:text-white leading-tight">{user.name}</h1>
          <div className="flex items-center">
            {/* Status Dot: Green if online, Grey if offline */}
            <div className={`w-2 h-2 rounded-full mr-1.5 ${user.status === 'Online' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{user.status}</span>
          </div>
        </div>
        
        {/* Profile Link (3 Dots) */}
        <Link href={`/chat/profile/${id}`} className="ml-auto">
           <button className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
           </button>
        </Link>
      </header>

      {/* --- MESSAGES FEED --- */}
      {/* 'flex-1': Pushes the header up and the input bar down, taking up all available space. */}
      <div className="flex-1 p-4 space-y-4">
        
        {/* Date Divider */}
        <div className="flex justify-center my-4">
           <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full border border-transparent dark:border-gray-800">
             {chatId === 'studygroup' || chatId === 'khotso' ? 'Yesterday' : 'Today'}
           </span>
        </div>

        {/* MESSAGE LOOP:
            We iterate through the 'messages' array and render a bubble for each one.
        */}
        {messages.map((msg, index) => (
          // ALIGNMENT LOGIC:
          // If msg.isMe is true, use 'justify-end' (Right side).
          // If msg.isMe is false, use 'justify-start' (Left side).
          <div key={index} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
             <div 
               className={`
                 max-w-[80%] p-3 rounded-2xl shadow-sm transition-colors
                 ${msg.isMe 
                   ? 'bg-blue-600 rounded-tr-none text-white' // STYLING FOR "ME" (Blue)
                   : 'bg-white dark:bg-gray-800 rounded-tl-none border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200' // STYLING FOR "THEM" (Grey/Dark)
                 }
               `}
             >
                {/* SENDER NAME: Only show this in group chats for other people (not me) */}
                {!msg.isMe && msg.senderName && (
                  <p className={`text-[10px] font-bold mb-1 ${['text-purple-500', 'text-yellow-600', 'text-pink-500'][index % 3]}`}>
                    {msg.senderName}
                  </p>
                )}

                <p className="text-sm">
                  {msg.text}
                </p>
                <span className={`text-[10px] block text-right mt-1 ${msg.isMe ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>
                  {msg.time}
                </span>
             </div>
          </div>
        ))}
      </div>

      {/* --- INPUT AREA --- */}
      {/* 'sticky bottom-0': Keeps the input bar fixed at the bottom of the screen. */}
      <div className="sticky bottom-0 w-full bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 p-4 pb-8 z-20 transition-colors">
         <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-full border border-gray-200 dark:border-gray-700 transition-colors">
            {/* Attachment Button */}
            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            </button>
            {/* Text Input */}
            <input 
              type="text" 
              placeholder={`Message ${user.name.split(' ')[0]}...`}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
            {/* Send Button */}
            <button className="p-2 bg-blue-600 rounded-full text-white shadow-sm hover:bg-blue-700 transition-colors">
               <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
         </div>
      </div>

    </main>
  );
}