import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React from "react";

const Appointments = ({ role }) => {
    return (
        <>
            <Head title="Appointments" />
            <Layout role={role}>
                <div>
                    <h1>Appointments</h1>
                </div>
            </Layout>
        </>
    );
}

export default Appointments;
