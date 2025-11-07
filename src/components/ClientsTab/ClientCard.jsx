import { useState } from "react";

export function ClientCard({ client, onRefresh, userRole }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: client.name,
    email: client.email,
    contact_number: client.contact_number || "",
    company_name: client.company_name || "",
    notes: client.notes || "",
  });

  const handleUpdate = async () => {
    try {
      const response = await fetch("/api/clients/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: client.id, ...editData }),
      });
      if (response.ok) {
        setIsEditing(false);
        onRefresh();
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        const response = await fetch("/api/clients/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: client.id }),
        });
        if (response.ok) {
          onRefresh();
        }
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm bg-white dark:bg-[#121212] text-black dark:text-white"
            placeholder="Name"
          />
          <input
            type="email"
            value={editData.email}
            onChange={(e) =>
              setEditData({ ...editData, email: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm bg-white dark:bg-[#121212] text-black dark:text-white"
            placeholder="Email"
          />
          <input
            type="tel"
            value={editData.contact_number}
            onChange={(e) =>
              setEditData({ ...editData, contact_number: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm bg-white dark:bg-[#121212] text-black dark:text-white"
            placeholder="Contact Number"
          />
          <input
            type="text"
            value={editData.company_name}
            onChange={(e) =>
              setEditData({ ...editData, company_name: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm bg-white dark:bg-[#121212] text-black dark:text-white"
            placeholder="Company Name"
          />
          <textarea
            value={editData.notes}
            onChange={(e) =>
              setEditData({ ...editData, notes: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm bg-white dark:bg-[#121212] text-black dark:text-white"
            placeholder="Notes"
            rows="2"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-800 rounded-2xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            {client.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {client.email}
          </p>
          {client.company_name && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Company: {client.company_name}
            </p>
          )}
          {client.contact_number && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {client.contact_number}
            </p>
          )}
        </div>
        {userRole !== "client" && (
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}