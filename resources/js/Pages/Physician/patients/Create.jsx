import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';

const Create = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        phone: '',
        address: '',
        nationality: '',
        district: '',
        national_id: '',
        medical_condition: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/patients', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>

            {/* Add input fields for each data */}
            <div className="mb-4">
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div className="mb-4">
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} className="mt-1 block w-full" />
            </div>
            <div className="mb-4">
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            {/* Repeat for other fields */}
            <PrimaryButton type="submit">Add Patient</PrimaryButton>
        </form>
    );
};

export default Create;
