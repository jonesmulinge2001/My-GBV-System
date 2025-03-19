import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">About Us</h1>
        
        <p className="text-gray-600 text-lg text-center mb-6">
          Our mission is to create a safe space for individuals to report gender-based violence (GBV) anonymously, access resources, and seek support. We believe that every person deserves to live without fear and that together, we can work towards a world free from violence.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Vision</h2>
            <p className="text-gray-600">We envision a world where individuals are empowered to speak up against gender-based violence, access justice, and receive support without stigma or fear.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
            <p className="text-gray-600">To provide a secure platform for reporting GBV cases, offering survivors the resources and support they need, and advocating for policies that protect vulnerable communities.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">What We Do</h2>
          <ul className="text-gray-600 list-disc pl-6 space-y-2">
            <li>Provide a secure, anonymous reporting system for GBV survivors.</li>
            <li>Offer educational resources and guides on gender-based violence.</li>
            <li>Connect survivors with legal and psychological support services.</li>
            <li>Advocate for policy changes to combat GBV in communities.</li>
            <li>Organize awareness campaigns and workshops.</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl"><FaFacebook /></a>
            <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl"><FaTwitter /></a>
            <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl"><FaInstagram /></a>
            <a href="#" className="text-blue-700 hover:text-blue-900 text-2xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
