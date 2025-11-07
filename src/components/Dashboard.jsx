import React, { useEffect, useState } from "react";
import { FileText, Users, Briefcase, TrendingUp } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function DashboardTab({ user, userRole, stats: propsStats }) {
  const { user: authUser } = useAuth();
  const currentUser = user || authUser || { name: "User", role: "client" };
  const role = userRole || currentUser.role || "client";
  
  const [currentStats, setCurrentStats] = useState(propsStats || {
    total_clients: 0,
    total_staff: 0,
    // total_admins: 0,
    active_projects: 0,
    // total_users: 0
  });

  useEffect(() => {
    // fetch counts from backend
    const token = localStorage.getItem("token");
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/api/stats/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          signal: controller.signal
        });
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        setCurrentStats(prev => ({ ...prev, ...data }));
      } catch (err) {
        // silent fail, keep defaults
        if (err.name === "AbortError") return;
        console.error("fetchStats error", err);
      }
    };

    fetchStats();
    return () => controller.abort();
  }, []);

  return (
    <div className="w-[1150px] mx-auto">
      <div className="mb-8">
        <h1 className="text-[40px] leading-tight font-extrabold text-white mb-2">
          Welcome, {currentUser.name || "User"}!
        </h1>
        <p className="text-[#9aa6b2] text-lg">
          Here's what's happening in your CRM today
        </p>
      </div>

      {/* Hero / CTA card */}
      <section className="bg-[#1E1E1E] border border-[#262626] rounded-[28px] p-[50px] mb-10">
        <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
          <p className="text-[#9aa6b2] text-xl mb-8">
            Welcome to CRMEdge! You can view your assigned projects and client information here.
          </p>

          <div className="flex items-center gap-[20px]">
            <Link
              to="/clients"
              className="p-[12px] w-[120px] rounded-full bg-[#a9d94a] text-[#000000] font-semibold text-lg hover:bg-[#95c235] transition-colors"
            >
              View Clients
            </Link>

            <Link
              to="/projects"
              className="p-[12px] w-[120px] rounded-full border-2 border-[#2a2a2a] text-[#bfc7cc] text-lg bg-transparent hover:bg-[#151515] transition-colors"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] p-[20px]">
        {/* <StatCard
          title="Total Leads"
          value={currentStats.total_leads ?? 0}
          icon={<FileText size={22} className="text-[#6fb3ff]" />}
        /> */}
        <StatCard
          title="Total Clients"
          value={currentStats.total_clients ?? 0}
          icon={<Users size={22} className="text-[#7be495]" />}
        />
        <StatCard
          title="Active Projects"
          value={currentStats.active_projects ?? 0}
          icon={<Briefcase size={22} className="text-[#c084fc]" />}
        />
        <StatCard
          title="Total Staff"
          value={currentStats.total_staff ?? 0}
          icon={<Users size={22} className="text-[#f6b26b]" />}
        />
      </div>
    </div>
  );
}

/* Stat card component styled to match screenshot */
function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#121212] border border-[#232323] rounded-2xl p-6 flex flex-col justify-between min-h-[120px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0f0f0f] flex items-center justify-center">
            {icon}
          </div>
        </div>
        {/* <div className="text-sm text-[#7bd389]">+0%</div> */}
      </div>

      <div>
        <div className="text-sm text-[#9aa6b2] mb-1">{title}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
    </div>
  );
}