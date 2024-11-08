"use client";
import React, { useState } from "react";

const AdminPage = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  return (
    <div className="flex h-screen">
      {/* Content Wrapper */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        {/* Main Content Area */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {selectedPage === "Dashboard" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
              <p className="mb-4">Welcome to the admin dashboard!</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Total Users</h3>
                  <p className="text-2xl">1,200</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Active Sessions</h3>
                  <p className="text-2xl">345</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">New Orders</h3>
                  <p className="text-2xl">57</p>
                </div>
              </div>
            </div>
          )}

          {selectedPage === "Users" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Users</h2>
              <p className="mb-4">Manage users here.</p>
            </div>
          )}

          {selectedPage === "Settings" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Settings</h2>
              <p className="mb-4">Configure settings here.</p>
            </div>
          )}

          {selectedPage === "Reports" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Reports</h2>
              <p className="mb-4">View reports here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
