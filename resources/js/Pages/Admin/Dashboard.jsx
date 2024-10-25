import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { HiTrash, HiRefresh } from "react-icons/hi"; // Import refresh icon
import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import { toast } from 'react-toastify'; // Import toast notifications

const Dashboard = ({ users, role, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleRoleChange = (userId, newRole) => {
    Inertia.post(`/admin/users/${userId}/update-role`, { role: newRole }, {
      onSuccess: () => toast.success("User role updated successfully.")
    });
  };

  const handleDeactivate = (userId) => {
    if (confirm("Are you sure you want to deactivate this user?")) {
      Inertia.post(`/admin/users/${userId}/deactivate`, {}, {
        onSuccess: () => toast.success("User deactivated successfully.")
      });
    }
  };

  const handleActivate = (userId) => {
    if (confirm("Are you sure you want to reactivate this user?")) {
      Inertia.post(`/admin/users/${userId}/activate`, {}, {
        onSuccess: () => toast.success("User activated successfully.")
      });
    }
  };

  // Exclude the current user from the list and filter based on the search query
  const filteredUsers = users
    .filter(user => user.id !== currentUserId)
    .filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <Head title="User Management" />
      <Layout role={role}>
        <div className="p-6 bg-white rounded-md shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md"
            />
          </div>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="p-1 bg-white w-3/4 border rounded text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="physician">Physician</option>
                      <option value="patient">Patient</option>
                    </select>
                  </td>
                  <td className={`p-2 border ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status}
                  </td>
                  <td className="p-2 border flex justify-center items-center gap-2">
                    {user.status === "active" ? (
                      <HiTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeactivate(user.id)}
                      />
                    ) : (
                      <HiRefresh
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleActivate(user.id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
