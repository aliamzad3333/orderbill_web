import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">{sidebarOpen ? "Admin" : "A"}</h1>
          <button
            className="p-1 rounded hover:bg-gray-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>

        <nav className="mt-4">
          <Link
            to="/admin/users"
            className="block px-4 py-2 hover:bg-gray-200 rounded"
          >
            User Management
          </Link>
          <Link
            to="/admin/buildings"
            className="block px-4 py-2 hover:bg-gray-200 rounded"
          >
            Building List
          </Link>
          <Link
            to="/admin/reports"
            className="block px-4 py-2 hover:bg-gray-200 rounded"
          >
            Reports
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome, Admin!</h2>
        <p className="mb-6">
          Here you can manage users, buildings, and view reports.
        </p>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Total Buildings</h3>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">$0</p>
          </div>
        </div>

        {/* Placeholder for charts */}
        <div className="bg-white p-4 rounded shadow h-96 flex items-center justify-center text-gray-400">
          Graphs / Reports will appear here
        </div>

        {/* Nested routes */}
        <Outlet />
      </div>
    </div>
  );
}
