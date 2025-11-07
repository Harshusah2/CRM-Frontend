import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { StaffForm } from "./StaffForm";

export function StaffsTab() {

  const { user, getStaffs, adminCreateStaff, deleteStaff } = useAuth();

  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchStaffs = async () => {
    try {
      const data = await getStaffs();
      // console.log("getStaffs response:", data);

      // normalize response into an array
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

      setStaffs(list);
    } catch (error) {
      console.error("Error fetching staffs:", error);
      setStaffs([]);
    } finally {
      setLoading(false);
    }
  };

  // render guard: ensure staffs is an array
  const StaffsArray = Array.isArray(staffs) ? staffs : [];
  
  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.password) {
        alert('Please fill in all required fields');
        return;
      }

      // console.log('About to submit form data:', {
      //   name: formData.name,
      //   email: formData.email,
      //   passwordLength: formData.password?.length
      // }); 
      await adminCreateStaff(formData);
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        password: "", // Add password field for admin creation
      });
      fetchStaffs(); // it refreh the list after creating a staff
    } catch (error) {
      console.error("Error creating staff:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  const handleDelete = async (staffId) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) {
      return;
    }

    try {
      await deleteStaff(staffId);
      fetchStaffs(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Staffs</h1>
          {user?.role === "admin" && (

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#a9d94a] text-black rounded-lg hover:bg-[#95c235] transition-colors"
            >
              <Plus size={20} />
              Add Staff
            </button>
          )}
        </div>

        {showForm && (
          <StaffForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setFormData({
                name: "",
                email: "",
                password: "",
              });
            }}
          />
        )}

        <div className="grid gap-[10px] mt-[10px]">
          {staffs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No staffs found
            </div>
          ) : (
            StaffsArray.map((staff) => (
              <div
                key={staff._id}
                className="bg-[#1E1E1E] rounded-[10px] border border-[#262626] p-[2px] p-4 flex justify-between items-center"
              >
                <h3 className="text-[20px] font-semibold text-[#ffffff]">
                  {staff.name}
                </h3>
                <p className="text-[#898989]">{staff.email}</p>
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="p-2 text-[#ffffff] hover:text-[#ff6347] bg-[#1E1E1E] transition-colors"
                    title="Delete staff"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}