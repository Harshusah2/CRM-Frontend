import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Layout, Users, Briefcase, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isActive = (path) => {
    // treat root/dashboard equally
    const p = location.pathname.toLowerCase();
    if (path === "dashboard") return p === "/" || p.includes("/dashboard");
    return p.includes(path);
  };

  const goToLogout = (e) => {
    e.preventDefault();
    navigate("/account/logout", { replace: true });
  };

  return (
    <aside className="fixed inset-y-0 h-[97%] left-0 w-64 bg-[#0f0f0f] border-r border-[#444] z-10 flex flex-col justify-between overflow-hidden">
      {/* Logo */}
      <div className="justify-center flex p-[35px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#a9d94a] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white" />
          </div>
          <span className="text-[30px] font-bold text-[#ffffff]">CRM</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-4 mt-6 space-y-[10px] p-[20px]">
        <NavItem to="/dashboard" icon={<Layout size={18} />} label="Dashboard" active={isActive("dashboard")} />
        <NavItem to="/clients" icon={<Users size={18} />} label="Clients" active={isActive("clients")} />
        <NavItem to="/staffs" icon={<Users size={18} />} label="Staffs" active={isActive("staffs")} />
        <NavItem to="/projects" icon={<Briefcase size={18} />} label="Projects" active={isActive("projects")} />
        <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" active={isActive("settings")} />
      </nav>

      {/* Footer/profile - anchored at bottom */}
      <div className="p-[20px] w-[200px]">
        <div className="flex items-center gap-[10px] p-[5px] bg-[#778899] mb-[15px]">
          <div className="w-[30px] h-[20px] ml-[3px] rounded-full bg-[#a9d94a] flex justify-center text-[#000000] font-semibold">
            {user?.name?.charAt(0) ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">{user?.name ?? "User"}</div>
            <div className="text-xs text-gray-400 truncate">{user?.email ?? ""}</div>
          </div>
        </div>

        <button
          onClick={goToLogout}
          className="flex bg-[#0f0f0f] justifys-center text-sm w-full p-[10px] hover:bg-[#f08080] transition-colors"
        >
          <LogOut size={16} className=" text-[#898989] ml-[20px]" />
          <span className="text-[#ff0800] absolute right-[60px]">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 mb-1 rounded-full text-sm transition-all duration-150 ${
        active ? "bg-white text-black font-semibold" : "text-gray-400 hover:text-white hover:bg-[#181818]"
      }`}
    >
      <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
