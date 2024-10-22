import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Index = () => {
    const { patients } = usePage().props;

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Patients</h2>
                <Link href="/patients/create">
                    <PrimaryButton>Add Patient</PrimaryButton>
                </Link>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="text-left py-2 px-4">Name</th>
                        <th className="text-left py-2 px-4">Gender</th>
                        <th className="text-left py-2 px-4">Date of Birth</th>
                        <th className="text-left py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.id}>
                            <td className="py-2 px-4">{patient.first_name} {patient.last_name}</td>
                            <td className="py-2 px-4">{patient.gender}</td>
                            <td className="py-2 px-4">{patient.date_of_birth}</td>
                            <td className="py-2 px-4">
                                <Link href={`/patients/${patient.id}/edit`} className="text-blue-500 hover:underline">Edit</Link> |
                                <Link href={`/patients/${patient.id}`} className="text-blue-500 hover:underline">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
