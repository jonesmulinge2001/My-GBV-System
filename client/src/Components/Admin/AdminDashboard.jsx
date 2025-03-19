import React from "react";
import { motion } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import { BarChart, FileText, ListChecks, PlusCircle,MessageCircle  } from "lucide-react"; // Import icons

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 min-h-screen fixed">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/manage-reports" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <ListChecks className="w-5 h-5 mr-2" />
              Manage Reports
            </Link>
          </li>
          <li>
            <Link to="/admin/add-resources" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Resources
            </Link>
          </li>
          <li>
            <Link to="/admin/all-resources" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <FileText className="w-5 h-5 mr-2" />
              All Resources
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <BarChart className="w-5 h-5 mr-2" />
              Analytics
            </Link>
            <Link to="/admin/adminreply" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <MessageCircle  className="w-5 h-5 mr-2" />
              User messages
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content (Right Side) */}
      <div className="flex-1 p-10 ml-64"> 
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800"
        >
          Welcome, GBV Admin
        </motion.h1>
        {/* <p className="text-gray-600 mt-2">
          Manage reports, add or remove resources, and oversee platform activities.
        </p> */}

        {/* This will render the selected admin page */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
