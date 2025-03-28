import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  
  // Hide footer on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <footer className="bg-blue-900 text-white pt-4 px-6  mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1: About */}
        <div>
          <h3 className="text-sm font-semibold mb-3">About Us</h3>
          <p className="text-gray-400 text-xs">
            Our GBV Reporting System is dedicated to providing a safe space for survivors and activists. 
            We offer secure reporting, access to resources, and community support to help create a violence-free society.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 text-xs space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/report" className="hover:text-blue-400">Report a Case</Link></li>
            <li><Link to="/resources" className="hover:text-blue-400">Helpful Resources</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 text-xs flex items-center">
            <Mail size={16} className="mr-2" /> support@gbvsystem.com
          </p>
          <p className="text-gray-400 text-xs flex items-center mt-2">
            <Phone size={16} className="mr-2" /> +123 456 7890
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} GBV Reporting System. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
