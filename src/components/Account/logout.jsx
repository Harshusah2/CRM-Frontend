import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Logout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/account/signin",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#121212] flex items-center justify-center p-[20px]">
      <div className="w-full max-w-[400px] h-[300px] rounded-[10px] bg-[#ffffff] dark:bg-[#1E1E1E] border border-[#ffffff] dark:border-[#ffffff] p-[10px] shadow-[50px]">
        <div className="mb-8 text-center mt-[25px]">
          <div className="flex items-center justify-center mb-4">
            <div className="w-[30px] h-[30px] p-[10px] bg-[#A4D74C] rounded-full flex items-center justify-center">
              <LogOut size={24} className="text-[#080808]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#ffffff] dark:text-white mb-2">
            Sign Out
          </h1>
          <p className="text-[#dcdcdc] dark:text-gray-400">
            Are you sure you want to sign out?
          </p>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full rounded-[5px] bg-[#A4D74C] text-[#080808] p-[10px] font-semibold text-base transition-colors hover:bg-[#94C63A] active:bg-[#84B530] mb-3"
        >
          Sign Out
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full rounded-[5px] border border-gray-200 dark:border-gray-700 text-[#080808] dark:text-[#[#080808]] p-[10px] font-semibold transition-colors hover:bg-[#d3d3d3] dark:hover:bg-[#d3d3d3] active:bg-[#d3d3d3] dark:active:bg-[#d3d3d3] flex items-center justify-center"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}