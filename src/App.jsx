import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/HomeSection/Home";
import Contact from "./Pages/Contact/Contact";
import Pricing from "./Pages/Pricing/Pricing";
import Nopage from "./components/UI/Nopage";
import Footer from "./layouts/footer";
import Address from "./layouts/Address";
import Trainer from "./Pages/Trainers/Trainer";
import Login from "./Pages/Auth/Login";
import ForgetPassword from "./Pages/Auth/ForgetPass";
import PasswordReset from "./Pages/Auth/PasswordReset";
import Users from "./Pages/Management/User";
import Dashboard from "./Pages/Management/Dashboard";
import Sidebar from "./layouts/Sidebar"

// Layout for website pages (with Navbar and Footer)
function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Address className="bg-neutral-950 text-white md:flex justify-center gap-40 px-8 py-8" />
      <Footer />
    </>
  );
}

// Layout for management system pages (with Sidebar)
function ManagementLayout({ children }) {
  return (
    <div className="flex min-h-screen"> {/* Flex container for sidebar and content */}
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6"> {/* Main content area */}
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Website Pages */}
      <Route path="/" element={<WebsiteLayout><Home /></WebsiteLayout>} />
      <Route path="/home" element={<WebsiteLayout><Home /></WebsiteLayout>} />
      <Route path="/pricing" element={<WebsiteLayout><Pricing /></WebsiteLayout>} />
      <Route path="/contact" element={<WebsiteLayout><Contact /></WebsiteLayout>} />
      <Route path="/trainers" element={<WebsiteLayout><Trainer /></WebsiteLayout>} />

      {/* Authentication Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Management System Pages */}
      <Route path="/dashboard" element={<ManagementLayout><Dashboard /></ManagementLayout>} />
      <Route path="/users" element={<ManagementLayout><Users /></ManagementLayout>} />
      {/* 404 Page */}
      <Route path="*" element={<Nopage />} />
    </Routes>
  );
}

export default App;
