import React, { useState } from "react";
import { HiUserCircle, HiOutlineLogout, HiOutlineBell, HiChevronDown, HiOutlineChatAlt } from "react-icons/hi";
import { HiOutlineBars3 } from "react-icons/hi2";
import { Link, useForm } from '@inertiajs/inertia-react';

export default function Header({ toggleSidebar, pageTitle = "Health Net", authUser }) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { post } = useForm();

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    }
    if (showMessageDropdown) {
      setShowMessageDropdown(false);
    }
  };

  const toggleMessageDropdown = () => {
    setShowMessageDropdown(!showMessageDropdown);
    if (showProfileDropdown) {
      setShowProfileDropdown(false);
    }
    if (showNotificationDropdown) {
      setShowNotificationDropdown(false);
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    if (showNotificationDropdown) {
      setShowNotificationDropdown(false);
    }
    if (showMessageDropdown) {
      setShowMessageDropdown(false);
    }
  };

  const closeAllDropdowns = () => {
    setShowNotificationDropdown(false);
    setShowProfileDropdown(false);
    setShowMessageDropdown(false);
  };

  const handleLogout = () => {
    post(route('logout')); // Logout via Inertia request
  };

  return (
    <header className="flex-shrink-0 bg-[#EEEEEE] px-4 py-2 flex justify-between items-center z-10">
      {/* Left: Bars Icon and Current Page Title */}
      <div className="flex space-x-2 items-center justify-center">
        <button onClick={toggleSidebar}>
          <HiOutlineBars3 className="text-xl" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          {pageTitle}
        </h1>
      </div>

      {/* Right: Messages, Notification, and Profile Section */}
      <div className="flex items-center space-x-4">
        {/* Messages Icon */}
        <div className="relative">
          <button
            onClick={toggleMessageDropdown}
            className="relative bg-[#07B0F1] text-white rounded-full p-1 focus:outline-none"
          >
            <HiOutlineChatAlt className="w-6 h-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
          </button>
          {showMessageDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="flex items-center text-[0.8rem] p-3 hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                  New message from Jane Smith
                </li>
                <li className="flex items-center p-3 text-[0.8rem] hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <span className="h-2 w-2 bg-yellow-600 rounded-full mr-2"></span>
                  Meeting reminder at 2 PM
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={toggleNotificationDropdown}
            className="relative bg-[#07B0F1] text-white rounded-full p-1 focus:outline-none"
          >
            <HiOutlineBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full"></span>
          </button>
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="flex items-center text-[0.8rem] p-3 hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <span className="h-2 w-2 bg-blue-600 rounded-full mr-2"></span>
                  New leave request from John Doe
                </li>
                <li className="flex items-center p-3 text-[0.8rem] hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <span className="h-2 w-2 bg-yellow-600 rounded-full mr-2"></span>
                  Your password will expire in 3 days
                </li>
                <li className="flex items-center p-3 text-[0.8rem] hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <span className="h-2 w-2 bg-green-600 rounded-full mr-2"></span>
                  New announcement posted
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="relative">
          <button onClick={toggleProfileDropdown} className="relative text-gray-600 focus:outline-none flex items-center gap-0">
            <HiUserCircle className="w-8 h-8" />
            <HiChevronDown className="w-4 h-4 mt-1" />
            <div>
              <span>{authUser ? authUser.name : "Guest"}</span>
            </div>
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <ul className="divide-y divide-gray-200">
                <li className="p-3 hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <Link href="/user-profile">Your Profile</Link>
                </li>
                <li className="p-3 hover:bg-gray-100" onClick={closeAllDropdowns}>
                  <Link href="/user-settings">Settings</Link>
                </li>
                <li className="p-3 hover:bg-gray-100 flex items-center space-x-2 text-red-600 cursor-pointer" onClick={handleLogout}>
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
