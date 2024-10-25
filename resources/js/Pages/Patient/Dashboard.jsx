// resources/js/Pages/Patient/Dashboard.jsx
import React from "react";
import Layout from "../../Components/shared/Layout";
import { Head } from "@inertiajs/react";

const Dashboard = ({ role }) => {
    return (
        <>
            <Head title="Dashboard" />
            <Layout role={role}>
                <h1 className="text-2xl font-bold">Patient Dashboard</h1>
                {/* Patient dashboard content goes here */}
            </Layout>
        </>
    );
};

export default Dashboard;
