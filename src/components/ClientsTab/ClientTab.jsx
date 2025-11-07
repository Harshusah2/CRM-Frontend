import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ClientForm } from "./ClientForm";
import { useAuth } from "../../context/AuthContext";

export function ClientsTab() {

  const { user, getClients, adminCreateClient, deleteClient } = useAuth();

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchClients = async () => {
    try {
      const data = await getClients();
      // console.log("getClients response:", data);

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

      setClients(list);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  // render guard: ensure clients is an array
  const clientsArray = Array.isArray(clients) ? clients : [];
  
  useEffect(() => {
    fetchClients();
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
      await adminCreateClient(formData);
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        password: "", // Add password field for admin creation
      });
      fetchClients(); // it refreh the list after creating a client
    } catch (error) {
      console.error("Error creating client:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  const handleDelete = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await deleteClient(clientId);
      fetchClients(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Failed to delete client");
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          {/* {(user?.role === "admin" || user?.role === "staff") && ( */}
          {user?.role === "admin" && (

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#a9d94a] text-black rounded-lg hover:bg-[#95c235] transition-colors"
            >
              <Plus size={20} />
              Add Client
            </button>
          )}
        </div>

        {showForm && (
          <ClientForm
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
          {clients.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No clients found
            </div>
          ) : (
            clientsArray.map((client) => (
              <div
                key={client._id}
                className="bg-[#1E1E1E] rounded-[10px] border border-[#262626] p-[2px] p-4 flex justify-between items-center"
              >
                <h3 className="text-[20px] font-semibold text-[#ffffff]">
                  {client.name}
                </h3>
                <p className="text-[#898989]">{client.email}</p>
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="p-2 text-[#ffffff] hover:text-[#ff6347] bg-[#1E1E1E] transition-colors"
                    title="Delete client"
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