import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  FilePlus,
  BookOpen,
  Phone,
  Info,
  Menu,
  X,
  CheckCircle2,
} from "lucide-react";

const menuItems = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "Report Case", path: "/report", icon: <FilePlus size={20} /> },
  { name: "Helpful Resources", path: "/resources", icon: <BookOpen size={20} /> },
  { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
  { name: "About", path: "/about", icon: <Info size={20} /> },
  { name: "Case status", path: "/case status", icon: <CheckCircle2 size={20} /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button (Mobile Only) */}
      <button
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-purple-600 text-white shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 
        w-3/4 sm:w-64 md:w-64 z-40 overflow-hidden`}
      >
        <div className="p-5 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
          <nav className="flex-1 flex flex-col justify-start space-y-2 overflow-y-auto no-scrollbar">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-700 ${
                    isActive ? "bg-gray-800 text-blue-400" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
