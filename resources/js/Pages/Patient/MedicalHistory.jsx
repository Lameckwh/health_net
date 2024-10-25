import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React from "react";

const MedicalHistory = ({ role }) => {
    return (
        <>
            <Head title="Medical History" />
            <Layout role={role}>
                <div>
                    <h1>Medical History</h1>
                </div>
            </Layout>
        </>
    );
}

export default MedicalHistory;
