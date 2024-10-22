import React from "react";
import { Link } from "@inertiajs/inertia-react";
import {
    FaUserShield, FaUserMd, FaUser
} from 'react-icons/fa'; // Importing icons

const Sidebar = () => {
    return (
        <div>
            <nav className="bg-[#07B0F1] text-white w-64 pl-4 flex flex-col overflow-auto h-full pt-8">
                <div className="">
                <img src="/logo_sidebar.png" className="w-24 h-12 object-contain mb-4" />

                </div>
                <ul>
                    {/* Admin Menu Items */}
                    <li className="mb-2">
                        <Link href="/admin-dashboard" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserShield className="mr-2" /> {/* Admin icon */}
                            Admin Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/admin-users" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUser className="mr-2" /> {/* Users icon */}
                            Users
                        </Link>
                    </li>

                    {/* Physician Menu Items */}
                    <li className="mb-2">
                        <Link href="/physician-dashboard" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Physician icon */}
                            Physician Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/appointments" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Appointments icon */}
                            Appointments
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/patients" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Patients icon */}
                            Patients
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/consultations" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Consultations icon */}
                            Consultations
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/diagnosis" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Diagnosis icon */}
                            Diagnosis
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/prescriptions" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUserMd className="mr-2" /> {/* Prescriptions icon */}
                            Prescriptions
                        </Link>
                    </li>

                    {/* Patient Menu Items */}
                    <li className="mb-2">
                        <Link href="/patient-dashboard" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUser className="mr-2" /> {/* Patient icon */}
                            Patient Dashboard
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/complaints" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUser className="mr-2" /> {/* Complaints icon */}
                            Complaints
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/medical-history" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUser className="mr-2" /> {/* Medical History icon */}
                            Medical History
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link href="/appointments" className="hover:bg-gray-700 block p-2 rounded flex items-center">
                            <FaUser className="mr-2" /> {/* Appointments icon */}
                            Appointments
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
