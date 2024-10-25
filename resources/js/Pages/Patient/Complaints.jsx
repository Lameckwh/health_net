import Layout from "@/Components/shared/Layout";
import { Head } from "@inertiajs/react";
import React from "react";

const Complaints = ({ role }) => {
    return (
        <>
            <Head title="Complaints" />
            <Layout role={role}>
                <div>
                    <h1>Complaints</h1>
                </div>
            </Layout>
        </>
    );
}

export default Complaints;
