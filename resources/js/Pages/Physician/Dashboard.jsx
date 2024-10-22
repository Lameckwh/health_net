// resources/js/Pages/Physician/Dashboard.jsx
import React from "react";
import Layout from "../../Components/shared/Layout";
import { HiChevronRight, HiOutlineDocumentText } from "react-icons/hi";
import { MdLocalHospital, MdOutlineReportProblem } from "react-icons/md";
import { FaHeartbeat } from "react-icons/fa";
import { Link } from "@inertiajs/inertia-react"; // Use Inertia's Link component
import MedicalHistory from "./MedicalHistory";
import Users from "../Admin/Users";
import Treatments from "./Treatments";
import Prescriptions from "./Prescriptions";
import Consultations from "./Consultations";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Diagnosis from "./Diagnosis";
import { Head } from "@inertiajs/react";

const Dashboard = () => {
    function BoxWrapperApplications({ children }) {
        return (
            <div className="bg-[#EEEEEE] rounded-lg p-4 flex-1 flex items-center w-full justify-between">
                {children}
            </div>
        );
    }
    return (
        <>
            <Head title="Welcome" />

                <Layout>


            <div>
                <div className="flex gap-4">
                    <BoxWrapperApplications>
                        {/* Left section with icon and text */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                <MdLocalHospital className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Diagnosis
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        10
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Button aligned to the right-bottom */}
                        <div className="flex space-x-2 ml-auto mt-auto">
                            <Link href="/">
                                {" "}
                                {/* Use Inertia's Link component */}
                                <button className="text-gray-600 hover:text-gray-800 border border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                    <HiChevronRight className="text-xl text-gray-600" />
                                </button>
                            </Link>
                        </div>
                    </BoxWrapperApplications>
                    <BoxWrapperApplications>
                        {/* Left section with icon and text */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
                                <MdOutlineReportProblem className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Complaints
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        10
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Button aligned to the right-bottom */}
                        <div className="flex space-x-2 ml-auto mt-auto">
                            <Link href="/">
                                {" "}
                                {/* Use Inertia's Link component */}
                                <button className="text-gray-600 hover:text-gray-800 border border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                    <HiChevronRight className="text-xl text-gray-600" />
                                </button>
                            </Link>
                        </div>
                    </BoxWrapperApplications>
                    <BoxWrapperApplications>
                        {/* Left section with icon and text */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
                                <FaHeartbeat className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Vitals
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        10
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Button aligned to the right-bottom */}
                        <div className="flex space-x-2 ml-auto mt-auto">
                            <Link href="/">
                                {" "}
                                {/* Use Inertia's Link component */}
                                <button className="text-gray-600 hover:text-gray-800 border  border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                    <HiChevronRight className="text-xl text-gray-600" />
                                </button>
                            </Link>
                        </div>
                    </BoxWrapperApplications>
                    <BoxWrapperApplications>
                        {/* Left section with icon and text */}
                        <div className="flex items-center">
                            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
                                <HiOutlineDocumentText className="text-2xl text-white" />
                            </div>
                            <div className="pl-4 flex flex-col">
                                <span className="text-sm text-gray-500 font-light">
                                    Treatment
                                </span>
                                <div className="flex items-center">
                                    <strong className="text-xl text-gray-700 font-semibold">
                                        10
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Button aligned to the right-bottom */}
                        <div className="flex space-x-2 ml-auto mt-auto">
                            <Link href="/">
                                {" "}
                                {/* Use Inertia's Link component */}
                                <button className="text-gray-600 hover:text-gray-800 border border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                    <HiChevronRight className="text-xl text-gray-600" />
                                </button>
                            </Link>
                        </div>
                    </BoxWrapperApplications>
                </div>
                <div>

                </div>
            </div>


        </Layout>
        </>

    );
};

export default Dashboard;
