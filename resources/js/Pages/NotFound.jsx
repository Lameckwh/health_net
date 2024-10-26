// File: resources/js/Pages/NotFound.jsx

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Layout from '../Components/shared/Layout';

const NotFound = () => {
    return (
        <>
        <Head title='Page Not Found'/>
                    <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold text-gray-700">404 - Page Not Found</h1>
                <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
                <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Go Back Home
                </Link>
            </div>

        </>


    );
};

export default NotFound;
