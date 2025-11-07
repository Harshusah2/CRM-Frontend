import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Header";
import DashboardTab from "./Dashboard";
// import UsersTab from "./UsersTab";
import ProjectsTab from "./ProjectsTab";
import SettingsTab from "./SettingsTab";
import { ClientsTab } from "./ClientsTab/ClientTab";
import { StaffsTab } from "./StaffsTab/StaffTab";

export default function DisplayHome() {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/account/signin" replace />;

    return (
        <div className="flex min-h-screen bg-[#121212] text-[#ffffff]">
            {/* Sidebar - fixed width */}
            <div className="w-64 flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main content area */}
            <div className="flex-1 min-h-screen">
                <Header />
                
                <main className="ml-[250px]">
                    <div className="max-w-[1200px] mx-auto">
                        <Routes>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardTab />} />
                            <Route path="clients" element={<ClientsTab />} />
                            <Route path="staffs" element={<StaffsTab />} />
                            <Route path="projects" element={<ProjectsTab />} />
                            <Route path="settings" element={<SettingsTab />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}
