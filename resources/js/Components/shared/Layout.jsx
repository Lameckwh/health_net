// resources/js/Components/Layout.jsx
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar /> {/* Sidebar will take full height */}
            <div className="flex flex-col flex-1"> {/* Main content area */}
                <Header />
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
