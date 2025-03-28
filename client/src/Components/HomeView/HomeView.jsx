import React from 'react';
import { motion } from 'framer-motion';
import shal1 from '/assets/shal1.jpg';
import shal2 from '/assets/shal2.jpg';
import shal3 from '/assets/shal3.jpg';
import shal4 from '/assets/shal4.jpg';
import shal5 from '/assets/shal5.jpg';
import shal6 from '/assets/shal6.jpg';
import { Link, useNavigate } from 'react-router-dom';

const HomeView = () => {
  const navigate = useNavigate();
  const images = [
    { src: shal1, text: "Gender-based violence is a violation of human dignity. Break the silence, shatter the chains. Every survivor deserves justice, every voice deserves to be heard. Stand up, speak out, and create a world where safety is a right, not a privilege. Together, we can end the violence." },
    { src: shal2, text: "No excuse, no justification — gender-based violence must end. Every voice raised in solidarity creates a safer world. Let’s break the silence, support survivors, and demand accountability. Together, we can rewrite the future: one where respect, equality, and justice prevail." },
    { src: shal3, text: "Enough is enough. Gender-based violence destroys lives and silences voices. Stand with survivors, speak against oppression, and demand justice. Every voice matters, every action counts. Together, we can break the cycle and build a future free from fear." },
    { src: shal4, text: "Gender-based violence thrives in silence — break it. Stand for justice, speak for the voiceless, and protect the vulnerable. Every survivor matters. Every action sparks change. Together, we can create a world where everyone lives with dignity and respect." },
    { src: shal5, text: "Gender-based violence is a betrayal of humanity. No one should live in fear because of their gender. Speak out, take action, and stand with survivors. Justice, equality, and dignity must prevail. Together, we can break the cycle and create a safer, more just world for all." },
    { src: shal6, text: "Violence against one is violence against all. Gender-based violence must end. Let’s break the silence, uplift survivors, and hold abusers accountable. Stand for equality, speak out for justice, and build a world where safety is a right, not a privilege." }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col -mt-10 items-center justify-center">
      <div className="absolute top-1 right-1 flex space-x-2">
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
        >Login</button>
        <button 
          onClick={() => navigate('/signup')}
          className="px-4 py-2 text-xs bg-green-500 text-white rounded-full hover:bg-green-600 cursor-pointer"
        >Signup</button>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-center -pt-4 "
      >
        <h1 className="text-4xl font-bold text-lg text-gray-800">Welcome to the GBV Reporting System</h1>
        <p className="text-gray-600 mt-2 text-lg">Your voice matters. Report gender-based violence safely and anonymously.</p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex space-x-4"
      >
        <Link to="/report" className="bg-red-500 text-white text-sm px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition">
          Report a Case
        </Link>
        <Link to="/resources" className="bg-blue-500 text-white text-sm px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition">
          Get Help & Enlightening Resources
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 bg-white p-6 rounded-lg shadow-lg max-w-2xl"
      >
        <h2 className="text-2xl font-semibold text-sm text-gray-700">Why Report?</h2>
        <p className="text-gray-600 text-sm mt-2">Reporting GBV helps to create awareness, seek justice, and support survivors in need. Our platform ensures anonymity and provides direct access to essential resources.</p>
      </motion.div>
      <h1 className="text-sm font-bold text-gray-800 mt-12">Helpful Messages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {images.map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-white p-4 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img src={item.src} alt="gbv activist" className="w-full h-60 object-cover rounded-lg" />
            <p className="mt-4 text-gray-700 text-sm">{item.text}</p>
          </motion.div>
          
        ))}
      </div>
    </div>
  );
};

export default HomeView;
