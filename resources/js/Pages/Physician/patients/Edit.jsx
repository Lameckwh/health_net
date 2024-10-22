import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

const Edit = () => {
    const { patient } = usePage().props;
    const [formData, setFormData] = useState({
        first_name: patient.first_name || '',
        last_name: patient.last_name || '',
        gender: patient.gender || '',
        date_of_birth: patient.date_of_birth || '',
        phone: patient.phone || '',
        address: patient.address || '',
        nationality: patient.nationality || '',
        district: patient.district || '',
        national_id: patient.national_id || '',
        medical_condition: patient.medical_condition || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/patients/${patient.id}`, formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
            {/* Render input fields similar to the Create form */}
            <PrimaryButton type="submit">Update Patient</PrimaryButton>
        </form>
    );
};

export default Edit;
