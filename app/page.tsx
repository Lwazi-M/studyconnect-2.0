/**
 * StudyConnect 2.0 - Main Page (The "Digital Phone")
 *
 * This component acts as the entry point for the application.
 * It renders a simulated mobile phone frame centered on the screen.
 * Inside this frame, the actual mobile-first UI is displayed.
 */

// This is the default export for the Home component.
// In Next.js, this renders the route for "/" (the homepage).
export default function Home() {
  return (
    // <main>: The main container for the entire webpage.
    // 'min-h-screen': Forces the container to be at least as tall as the user's screen (100vh).
    // 'flex items-center justify-center': Uses Flexbox to perfectly center the phone in the middle.
    // 'bg-gradient-to-br ...': Creates a background gradient from top-left (br = bottom-right) using 3 colors.
    // 'p-4': Adds padding around the edges so the phone never touches the browser wall on small screens.
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">

      {/* --- THE PHONE CHASSIS (THE FRAME) --- 
        'relative': Establishes a positioning context for children (like the notch).
        'w-[375px] h-[812px]': Sets specific dimensions to mimic an iPhone X/11/12/13 size.
        'bg-black': Sets the bezel color.
        'rounded-[50px]': Gives the phone its signature super-rounded corners.
        'shadow-2xl': Adds a large drop shadow to make it "float" above the gradient.
        'border-[14px]': The thickness of the bezel.
        'overflow-hidden': Ensures content doesn't spill out of the rounded corners.
        'ring-4 ring-black/10': Adds a subtle outer ring for realism.
      */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[50px] shadow-2xl border-[14px] border-black overflow-hidden ring-4 ring-black/10">

        {/* --- THE DYNAMIC ISLAND / NOTCH ---
          'absolute': Positions this element freely on top of the phone screen.
          'top-0': Sticks it to the very top edge.
          'left-1/2 -translate-x-1/2': A classic CSS trick to perfectly center an absolute element horizontally.
          'z-50': A high Z-index ensures the notch stays *above* any scrolling content.
        */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50"></div>

        {/* --- THE SCREEN CONTENT --- 
          'w-full h-full': Fills the available space inside the phone frame.
          'bg-slate-900': Sets the app's background to a dark, professional blue-grey.
          'overflow-y-auto': Allows the user to scroll vertically inside the phone if content overflows.
        */}
        <div className="w-full h-full bg-slate-900 text-white overflow-y-auto">

          {/* --- HEADER (Glassmorphism Effect) ---
            'sticky top-0': Keeps the header fixed at the top while content scrolls under it.
            'z-40': Keeps it above the content but below the notch (z-50).
            'bg-slate-900/60': Sets the background color with 60% opacity.
            'backdrop-blur-md': The KEY to glassmorphism. It blurs everything behind this element.
            'border-b border-white/10': Adds a subtle 10% opacity white line at the bottom.
          */}
          <div className="sticky top-0 z-40 pt-12 pb-4 px-6 bg-slate-900/60 backdrop-blur-md border-b border-white/10 flex justify-between items-center">
            {/* App Title with Gradient Text 
              'bg-clip-text text-transparent': Allows the background gradient to show *only* inside the text letters.
            */}
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              StudyConnect
            </h1>

            {/* Profile Avatar Placeholder (Circle with Gradient) */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-lg"></div>
          </div>

          {/* --- SCROLLABLE CONTENT AREA ---
            'p-6': Adds padding inside the content area.
            'space-y-6': Automatically adds vertical space between every child element (the cards).
          */}
          <div className="p-6 space-y-6">

            {/* --- CARD 1: Recent Activity (Glass) ---
              'bg-white/5': Very subtle (5%) white background.
              'border-white/10': Subtle border.
              'hover:bg-white/10': When mouse hovers, background becomes slightly brighter.
              'transition-all duration-300': Makes the hover effect smooth.
            */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl hover:bg-white/10 transition-all duration-300">
              <h2 className="text-lg font-semibold text-blue-200">Recent Activity</h2>
              <p className="text-sm text-slate-400 mt-2">You helped 3 peers today!</p>
            </div>

            {/* --- CARD 2: Study Session (Liquid Gradient) ---
              'bg-gradient-to-br': Adds a diagonal gradient background.
              'from-blue-600/20': Starts with 20% opacity blue.
            */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm shadow-xl">
              <h2 className="text-lg font-semibold text-white">Next Study Session</h2>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">📚</div>
                <div>
                  <p className="font-medium">Mathematics 101</p>
                  <p className="text-xs text-slate-400">In 30 mins</p>
                </div>
              </div>
            </div>

            {/* Placeholders to force scrolling */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-slate-500 text-sm">More content...</p>
            </div>
            <div className="p-5 rounded-3xl bg-white/5 border border-white/5">
              <p className="text-slate-500 text-sm">More content...</p>
            </div>

          </div>

          {/* --- BOTTOM NAVIGATION BAR (Glass Effect) ---
            'absolute bottom-0': Pins it to the bottom of the phone frame.
            'w-full': Stretches it across.
            'backdrop-blur-lg': Stronger blur for the nav bar.
          */}
          <div className="absolute bottom-0 w-full h-20 bg-slate-900/80 backdrop-blur-lg border-t border-white/10 flex justify-around items-center pb-2">
             <div className="w-6 h-6 rounded-full bg-white/20"></div>
             {/* The Center "Add" Button with Glow */}
             <div className="w-10 h-10 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center text-white font-bold text-xl">+</div>
             <div className="w-6 h-6 rounded-full bg-white/20"></div>
          </div>

        </div>
      </div>
    </main>
  );
}