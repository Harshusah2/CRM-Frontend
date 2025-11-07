import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SettingsTab() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // const handleSignOut = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await signOut();
  //     navigate("/signin", { replace: true });
  //   } catch (err) {
  //     console.error("Sign out failed", err);
  //     // optional: show toast / alert
  //   }
  // };

  const goToLogout = (e) => {
    e.preventDefault();
    navigate("/account/logout", { replace: true });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-black dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See your account preferences here
        </p>
      </div>

      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-[10px] p-[8px] max-w-[400px]">
        <div className="mb-6">
          <h3 className="text-[25px] font-semibold text-black dark:text-white mb-4">
            Account Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[20px] text-gray-600 dark:text-gray-400 mb-1">
                Name
              </label>
              <p className="text-black dark:text-white font-medium text-[15px]">
                {user?.name ?? "—"}
              </p>
            </div>
            <div>
              <label className="block text-[20px] text-gray-600 dark:text-gray-400 mb-1">
                Email
              </label>
              <p className="text-black dark:text-white font-medium text-[15px]">
                {user?.email ?? "—"}
              </p>
            </div>
            <div>
              <label className="block text-[20px] text-gray-600 dark:text-gray-400 mb-1">
                Role
              </label>
              <p className="text-black dark:text-white font-medium text-[15px]">
                {user?.role ?? "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex gap-[8px]">
          {/* <button
            onClick={() => navigate("/account/edit")}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-[#a9d94a] text-black rounded-lg font-semibold hover:bg-[#95c235] transition-colors"
          >
            Edit Profile
          </button> */}

          <button
            onClick={goToLogout}
            className="flex items-center p-[10px] text-[#ff0000] dark:text-[#ff0000] hover:bg-[#ffa07a] dark:hover:bg-[#ffa07a] rounded-[10px] transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}