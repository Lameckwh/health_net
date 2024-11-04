import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children, role, authUser }) => {
    return (
        <div className="flex h-screen">
            <Sidebar role={role} /> {/* Pass the role prop */}
            <div className="flex flex-col flex-1">
                <Header authUser={authUser} />
                <main className="flex-1 p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};


export default Layout;
