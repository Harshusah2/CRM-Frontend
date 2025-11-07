import React from "react";
import { Menu, Bell, Search } from "lucide-react";

// export default function Header({ setSidebarOpen }) {
export default function Header() {

  return (
    <header className="bg-[#121212] border-b border-[#444]">
      <div className="max-w-[1200px] mx-auto p-[15px] flex items-center justify-between">
        {/* left: mobile menu (keeps spacing consistent with sidebar) */}
        {/* <div className="flex items-center w-48">
          <button
            onClick={() => setSidebarOpen && setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#161616]"
            aria-label="Open sidebar"
          >
            <Menu size={20} className="text-gray-200" />
          </button>
        </div> */}

        {/* center: search (icon inside input, placeholder shifted right) */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-[540px]">
            <span className="absolute left-[25px] top-1/2 -translate-y-1/2 pointer-events-none text-[#898989]">
              <Search size={20} />
            </span>

            <input
              type="text"
              placeholder="Search..."
              className="w-full h-[52px] pl-[52px] pr-4 rounded-full bg-[#1E1E1E] border border-[#898989] text-sm text-[#ffffff] placeholder-[#898989] focus:outline-none focus:ring-2 focus:ring-[#a9d94a]"
            />
          </div>
        </div>

        {/* right: notification / controls */}
        <div className="flex items-center gap-3 w-48 justify-end">
          <button className="p-3 h-[32px] rounded-full bg-[#1E1E1E] border border-[#898989] hover:bg-[#161616]">
            <Bell size={20} className="text-[#898989]" />
          </button>
        </div>
      </div>
    </header>
  );
}