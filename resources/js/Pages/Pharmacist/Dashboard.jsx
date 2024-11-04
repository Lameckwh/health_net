// resources/js/Pages/Patient/Dashboard.jsx
import React from "react";
import Layout from "../../Components/shared/Layout";
import { Head, Link } from "@inertiajs/react";
import { MdLocalHospital, MdOutlineReportProblem } from "react-icons/md";
import DoctorsDuties from "../Physician/DoctorsDuties";

const Dashboard = ({ role, auth }) => {
    function BoxWrapperApplications({ children }) {
        return (
            <div className="bg-[#EEEEEE] rounded-lg p-4 flex-1 flex items-center w-full justify-between">
                {children}
            </div>
        );
    }
    return (
        <>
            <Head title="Dashboard" />
            <Layout role={role} authUser={auth.user}>
                <div>
                    <div className="flex space-x-2">
                        <div className="w-3/4">
                            <div className="flex gap-4">
                                <BoxWrapperApplications>
                                    {/* Left section with icon and text */}
                                    <div className="flex items-center">
                                        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                                            <MdLocalHospital className="text-2xl text-white" />
                                        </div>
                                        <div className="pl-4 flex flex-col">
                                            <span className="text-sm text-gray-500 font-light">
                                                Medical Drugs
                                            </span>
                                            <div className="flex items-center">
                                                <strong className="text-xl text-gray-700 font-semibold">
                                                    6
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button aligned to the right-bottom */}
                                    <div className="flex space-x-2 ml-auto mt-auto">
                                        <Link href="/">
                                            {" "}
                                            {/* Use Inertia's Link component */}
                                            {/* <button className="text-gray-600 hover:text-gray-800 border border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                        <HiChevronRight className="text-xl text-gray-600" />
                                    </button> */}
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
                                                Prescriptions
                                            </span>
                                            <div className="flex items-center">
                                                <strong className="text-xl text-gray-700 font-semibold">
                                                    23
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button aligned to the right-bottom */}
                                    <div className="flex space-x-2 ml-auto mt-auto">
                                        <Link href="/">
                                            {" "}
                                            {/* Use Inertia's Link component */}
                                            {/* <button className="text-gray-600 hover:text-gray-800 border border-gray-700 p-2 rounded-md hover:bg-slate-200 hover:border-slate-400">
                                        <HiChevronRight className="text-xl text-gray-600" />
                                    </button> */}
                                        </Link>
                                    </div>
                                </BoxWrapperApplications>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <DoctorsDuties />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Dashboard;
