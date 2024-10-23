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
    return (
        <div>
            <nav className="bg-[#07B0F1] text-white w-64 px-4 flex flex-col overflow-auto h-full pt-8">
                <div>
                    <img src="/logo_sidebar.png" className="w-24  object-contain mb-10" />
                </div>
                <ul>
                    {/* Render Admin Items Only if the Role is 'admin' */}
                    {role === 'admin' && (
                        <>
                            <li className="mb-2">
                                <Link href="/admin-dashboard" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <HiOutlineViewGrid className="mr-2" />Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/admin-users" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaUser className="mr-2" /> Users
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Render Physician Items Only if the Role is 'physician' */}
                    {role === 'physician' && (
                        <>
                            <li className="mb-2">
                                <Link href="/physician-dashboard" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <HiOutlineViewGrid className="mr-2" /> Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/physician/appointments" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaCalendarAlt className="mr-2" /> Appointments
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/physician/patients" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaUserMd className="mr-2" /> Patients
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/physician/consultations" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaComments className="mr-2" /> Consultations
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/physician/diagnosis" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaHeartbeat className="mr-2" /> Diagnosis
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/physician/prescriptions" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaPrescriptionBottleAlt className="mr-2" /> Prescriptions
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Render Patient Items Only if the Role is 'patient' */}
                    {role === 'patient' && (
                        <>
                            <li className="mb-2">
                                <Link href="/patient-dashboard" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <HiOutlineViewGrid className="mr-2" /> Dashboard
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/complaints" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaUser className="mr-2" /> Complaints
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/medical-history" className="hover:bg-sky-700 block p-2 rounded flex items-center">
                                    <FaUser className="mr-2" /> Medical History
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/appointments" className="hover:bg-sky-700 block p-2 rounded flex items-center">
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
