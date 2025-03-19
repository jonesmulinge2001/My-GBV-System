import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Authentication/signup";
import Login from "./Components/Authentication/Login";
import HomeView from "./Components/HomeView/HomeView";
import Sidebar from "./Components/Sidebar/Sidebar";
import ReportCase from "./Components/ReportCase/ReportCase";
import HelpfulResources from "./Components/HelpfulResources/HelpfulResources";
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManageReports from "./Components/Admin/ManageReports";
import AddResources from "./Components/Admin/AddResources";
import Chatbot from "./Components/Chatbot/Chatbot";
import Footer from "./Components/Footer/Footer";
import AllResources from "./Components/Admin/AllResources";
import Analytics from "./Components/Admin/Analytics";
import ContactReply from "./Components/Admin/ContactReply";

const AppContent = () => {
  const location = useLocation();

  // Hide Sidebar & Footer on Login, Signup, and Admin Pages
  const hideSidebarAndFooter = 
    location.pathname === "/login" || 
    location.pathname === "/signup" || 
    location.pathname.startsWith("/admin"); 

  // State for managing helpful resources
  const [resources, setResources] = useState([
    { title: "Understanding Gender-Based Violence", link: "https://www.rescue.org/article/what-gender-based-violence-and-how-do-we-prevent-it", image: "/default1.jpg" },
    { title: "How to Support Survivors of GBV", link: "https://gbvguidelines.org/wp/wp-content/uploads/2018/03/GBV_PocketGuide021718.pdf", image: "/default2.jpg" },
  ]);

  // Function to add new resources dynamically
  const handleAddResource = (newResource) => {
    setResources((prevResources) => [...prevResources, newResource]);
  };

  return (
    <div className="flex">
      {/* Sidebar hidden on login, signup, and admin pages */}
      {!hideSidebarAndFooter && <Sidebar />}
      <ScrollToTop />

      {/* Main Content Area */}
      <div className={`${hideSidebarAndFooter ? "w-full" : "ml-64"} flex-1 p-4 flex flex-col min-h-screen`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeView />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<ReportCase />} />
          <Route path="/resources" element={<HelpfulResources resources={resources} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="manage-reports" element={<ManageReports />} />
            <Route path="add-resources" element={<AddResources onAddResource={handleAddResource} />} />
            <Route path="all-resources" element={<AllResources/>}/>
            <Route path="analytics" element={<Analytics/>}/>
            <Route path="adminreply" element={<ContactReply/>}/>
          </Route>
        </Routes>

        {/* Chatbot appears on all pages except admin routes */}
        {!location.pathname.startsWith("/admin") && <Chatbot />}

        {/* Show Footer only if not on login, signup, or admin pages */}
        {!hideSidebarAndFooter && <Footer />}
      </div>
    </div>
  );
};

const App = () => (
    <AppContent />
);

export default App;
