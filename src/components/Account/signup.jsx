import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { User, Mail, Lock } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await signUp({ name, email, password, role });
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="w-[420px] bg-[#1E1E1E] rounded-[28px] p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#a9d94a] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-[32px] text-[#ffffff] font-semibold mb-2">Create Account</h1>
          <p className="text-[#898989] text-base">Sign up for your CRM account</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="w-full max-w-[350px]">
              <label className="block text-[#dcdcdc] text-base mb-2.5">Full Name</label>
              <div className="relative">
                <User className="absolute right-[25px] top-1/2 -translate-y-1/2 text-[#898989]" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full h-[52px] bg-[#121212] rounded-full pl-16 pr-4 text-[#dcdcdc] border border-[#333] focus:outline-none focus:border-[#a9d94a] text-base placeholder-[#898989]"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[350px]">
              <label className="block text-[#dcdcdc] text-base mb-2.5">Email</label>
              <div className="relative">
                <Mail className="absolute right-[25px] top-1/2 -translate-y-1/2 text-[#898989]" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full h-[52px] bg-[#121212] rounded-full pl-16 pr-4 text-[#dcdcdc] border border-[#333] focus:outline-none focus:border-[#a9d94a] text-base placeholder-[#898989]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[350px]">
              <label className="block text-[#dcdcdc] text-base mb-2.5">Password</label>
              <div className="relative">
                <Lock className="absolute right-[25px] top-1/2 -translate-y-1/2 text-[#898989]" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full h-[52px] bg-[#121212] rounded-full pl-16 pr-4 text-[#dcdcdc] border border-[#333] focus:outline-none focus:border-[#a9d94a] text-base placeholder-[#898989]"
                  placeholder="Create a password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[350px]">
              <label className="block text-[#dcdcdc] text-base mb-2.5">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="block w-full h-[52px] bg-[#121212] rounded-full px-6 text-[#dcdcdc] border border-[#333] focus:outline-none focus:border-[#a9d94a] text-base"
              >
                <option value="client">Client</option>
                <option value="staff">Staff</option>
                {/* <option value="admin">Admin</option> */}
              </select>
            </div>
          </div>

          {error && (
            <div className="flex justify-center">
              <div className="w-full max-w-[350px] p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="block w-full max-w-[350px] h-[52px] bg-[#a9d94a] text-black font-medium text-base rounded-full hover:bg-[#95c235] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-[#898989] text-base">
            Already have an account?{" "}
            <Link to="/account/signin" className="text-[#a9d94a] hover:text-[#95c235]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}