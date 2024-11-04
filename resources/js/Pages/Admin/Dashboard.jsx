import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import {
    HiTrash,
    HiRefresh,
    HiOutlineDocumentText,
    HiOutlineUserAdd,
} from "react-icons/hi";
import Layout from "@/Components/shared/Layout";
import { Head, Link } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import { MdLocalHospital, MdOutlineReportProblem } from "react-icons/md";

const Dashboard = ({ users, role, currentUserId, auth }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "physician",
    });

    // Calculate the number of users for each role
    const roleCounts = users.reduce(
        (acc, user) => {
            if (user.role === "admin") acc.admins += 1;
            if (user.role === "physician") acc.physicians += 1;
            if (user.role === "pharmacist") acc.pharmacists += 1;
            if (user.role === "patient") acc.patients += 1;
            return acc;
        },
        { admins: 0, physicians: 0, pharmacists: 0, patients: 0 }
    );

    const handleRoleChange = (userId, newRole) => {
        Inertia.post(
            `/admin/users/${userId}/update-role`,
            { role: newRole },
            {
                onSuccess: () =>
                    toast.success("User role updated successfully."),
            }
        );
    };

    const handleDeactivate = (userId) => {
        if (confirm("Are you sure you want to deactivate this user?")) {
            Inertia.post(
                `/admin/users/${userId}/deactivate`,
                {},
                {
                    onSuccess: () =>
                        toast.success("User deactivated successfully."),
                }
            );
        }
    };

    const handleActivate = (userId) => {
        if (confirm("Are you sure you want to reactivate this user?")) {
            Inertia.post(
                `/admin/users/${userId}/activate`,
                {},
                {
                    onSuccess: () =>
                        toast.success("User activated successfully."),
                }
            );
        }
    };

    const handleAddUser = () => {
        Inertia.post("/admin/users/create", newUser, {
            onSuccess: () => {
                toast.success("User added successfully.");
                setShowAddUserForm(false);
                setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    role: "physician",
                });
            },
            onError: (errors) => {
                Object.values(errors).forEach((err) => toast.error(err));
            },
        });
    };

    // Exclude the current user from the list and filter based on the search query
    const filteredUsers = users
        .filter((user) => user.id !== currentUserId)
        .filter(
            (user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            <Head title="User Management" />
            <Layout role={role} authUser={auth.user}>
                <div className="flex gap-4">
                <ToastContainer />

                    <BoxWrapperApplications>
                        {/* Admins Box */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                <MdLocalHospital className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Admins
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        {roleCounts.admins}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </BoxWrapperApplications>

                    <BoxWrapperApplications>
                        {/* Physicians Box */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
                                <MdOutlineReportProblem className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Physicians
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        {roleCounts.physicians}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </BoxWrapperApplications>

                    <BoxWrapperApplications>
                        {/* Patients Box */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                                <HiOutlineDocumentText className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Patients
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        {roleCounts.patients}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </BoxWrapperApplications>
                    <BoxWrapperApplications>
                        {/* Pharmacists */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                                <HiOutlineDocumentText className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Pharmacist
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        {roleCounts.pharmacists}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </BoxWrapperApplications>
                </div>

                {/* Modal for adding user */}
                {showAddUserForm && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                            <h3 className="text-xl font-semibold mb-4">
                                Add New User
                            </h3>
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={() => setShowAddUserForm(false)}
                            >
                                X
                            </button>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newUser.name}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            name: e.target.value,
                                        })
                                    }
                                    className="p-2 border rounded-md"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className="p-2 border rounded-md"
                                />
                                <select
                                    value={newUser.role}
                                    onChange={(e) =>
                                        setNewUser({
                                            ...newUser,
                                            role: e.target.value,
                                        })
                                    }
                                    className="p-2 border rounded-md"
                                >
                                    <option value="physician">Physician</option>
                                    <option value="patient">Patient</option>
                                    <option value="admin">Admin</option>
                                    <option value="pharmacist">
                                        Pharmacist
                                    </option>
                                </select>
                                <button
                                    onClick={handleAddUser}
                                    className="bg-blue-600 text-white py-2 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Button to toggle modal */}
                <div className="flex justify-end mt-4 mb-2">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex gap-1"
                        onClick={() => setShowAddUserForm(true)}
                    >
                        <HiOutlineUserAdd className="text-xl text-white" />
                        <div>Add User</div>
                    </button>
                </div>

                <div className="p-6 bg-white rounded-md shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold">
                            User Management
                        </h2>
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
                                            onChange={(e) =>
                                                handleRoleChange(
                                                    user.id,
                                                    e.target.value
                                                )
                                            }
                                            className="p-1 bg-white w-3/4 border rounded text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:border-blue-500"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="physician">
                                                Physician
                                            </option>
                                            <option value="pharmacist">
                                                Pharmacist
                                            </option>
                                            <option value="patient">
                                                Patient
                                            </option>
                                        </select>
                                    </td>
                                    <td
                                        className={`p-2 border ${
                                            user.status === "active"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {user.status === "active"
                                            ? "Active"
                                            : "Inactive"}
                                    </td>
                                    <td className="p-2 border">
                                        {user.status === "active" ? (
                                            <button
                                                onClick={() =>
                                                    handleDeactivate(user.id)
                                                }
                                                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 mr-2"
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleActivate(user.id)
                                                }
                                                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 mr-2"
                                            >
                                                Activate
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                console.log(
                                                    "Delete user",
                                                    user.id
                                                )
                                            }
                                            className="bg-gray-300 p-2 rounded-md hover:bg-gray-400"
                                        >
                                            <HiTrash className="text-red-700" />
                                        </button>
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

// BoxWrapper component for the statistics boxes
function BoxWrapperApplications({ children }) {
    return (
        <div className="bg-[#EEEEEE] rounded-lg p-4 flex-1 flex items-center w-full justify-between">
            {children}
        </div>
    );
}

export default Dashboard;
