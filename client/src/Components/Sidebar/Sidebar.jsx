import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, FilePlus, BookOpen, Phone, Info, Menu, X } from "lucide-react";

const menuItems = [
  { name: "Home", path: "/", icon: <Home size={20} /> },
  { name: "Report Case", path: "/report", icon: <FilePlus size={20} /> },
  { name: "Helpful Resources", path: "/resources", icon: <BookOpen size={20} /> },
  { name: "Contact", path: "/contact", icon: <Phone size={20} /> },
  { name: "About", path: "/about", icon: <Info size={20} /> },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white p-5 shadow-lg flex flex-col transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:w-64`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-700 ${
                  isActive ? "bg-gray-800 text-blue-400" : ""
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on mobile after clicking
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
