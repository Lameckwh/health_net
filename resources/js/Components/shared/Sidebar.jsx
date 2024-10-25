import React from "react";
import { Link } from "@inertiajs/inertia-react";
import {
    FaUserShield, FaUserMd, FaUser,
    FaCalendarAlt,
    FaStethoscope,
    FaComments,
    FaHeartbeat,
    FaPrescriptionBottleAlt
} from 'react-icons/fa';
import { HiOutlineViewGrid } from "react-icons/hi";

const Sidebar = ({ role }) => {
    const currentPath = window.location.pathname; // Use window.location.pathname

    return (
        <div>
            <nav className="bg-[#07B0F1] text-white w-64 px-4 flex flex-col overflow-auto h-full pt-8">
                <div>
                    <img src="/logo_sidebar.png" className="w-24 object-contain mb-10" />
                </div>
                <ul>
                    {/* Render Admin Items Only if the Role is 'admin' */}
                    {role === 'admin' && (
                        <>
                            <li className="mb-2">
                                <Link
                                    href="/admin-dashboard"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/admin-dashboard' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <HiOutlineViewGrid className="mr-2" /> Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/admin-dashboard"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/admin-users' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaUser className="mr-2" /> Users
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Render Physician Items Only if the Role is 'physician' */}
                    {role === 'physician' && (
                        <>
                            <li className="mb-2">
                                <Link
                                    href="/physician-dashboard"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician-dashboard' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <HiOutlineViewGrid className="mr-2" /> Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/physician/appointments"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician/appointments' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaCalendarAlt className="mr-2" /> Appointments
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/physician/patients"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician/patients' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaUserMd className="mr-2" /> Patients
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/physician/consultations"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician/consultations' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaComments className="mr-2" /> Consultations
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/physician/diagnosis"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician/diagnosis' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaHeartbeat className="mr-2" /> Diagnosis
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/physician/prescriptions"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/physician/prescriptions' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaPrescriptionBottleAlt className="mr-2" /> Prescriptions
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Render Patient Items Only if the Role is 'patient' */}
                    {role === 'patient' && (
                        <>
                            <li className="mb-2">
                                <Link
                                    href="/patient-dashboard"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/patient-dashboard' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <HiOutlineViewGrid className="mr-2" /> Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/patients/complaints"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/patients/complaints' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaUser className="mr-2" /> Complaints
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/patients/medical-history"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/patients/medical-history' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaUser className="mr-2" /> Medical History
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link
                                    href="/patients/appointments"
                                    className={`block p-2 rounded flex items-center ${currentPath === '/patients/appointments' ? 'bg-sky-800' : 'hover:bg-sky-700'}`}
                                >
                                    <FaUser className="mr-2" /> Appointments
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
