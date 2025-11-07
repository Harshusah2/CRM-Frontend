import { useAuth } from "../../context/AuthContext";

export function ClientForm({ formData, setFormData, onSubmit, onCancel }) {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    return (
        <form onSubmit={onSubmit} className="mb-8 bg-[#1E1E1E] rounded-[10px] border border-[#262626] p-[20px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] p-[20px]">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-[30px] p-3 rounded-[10px] bg-[#121212] border border-[#262626] text-[#ffffff] focus:ring-2 focus:ring-[#a9d94a]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-[30px] p-3 rounded-[10px] bg-[#121212] border border-[#262626] text-[#ffffff] focus:ring-2 focus:ring-[#a9d94a]"
                    />
                </div>

                {isAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-[30px] p-3 rounded-[10px] bg-[#121212] border border-[#262626] text-[#ffffff] focus:ring-2 focus:ring-[#a9d94a]"
                    />
                  </div>
                )}
            </div>

            <div className="flex justify-end gap-[10px]">
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-[10px] text-gray-300 hover:bg-[#262626] rounded-[10px] transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="p-[10px] bg-[#a9d94a] text-black rounded-[10px] hover:bg-[#95c235] transition-colors"
                >
                    Save Client
                </button>
            </div>
        </form>
    );
}