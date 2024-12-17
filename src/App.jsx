
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Pages/Navbar/Navbar";
import Home from "./Pages/HomeSection/Home";
import Contact from "./Pages/Contact/Contact";
import Pricing from "./Pages/Pricing/Pricing";
import Nopage from "./components/UI/Nopage";
import Footer from "./layouts/footer";
import Address from "./layouts/Address";
import Trainer from "./Pages/Trainers/Trainer";
import Login from "./Pages/Auth/Login";
import PasswordResetForm from "./Pages/Auth/ForgetPass";

function AppLayout({ children }) {
  const location = useLocation();
  const excludeRoutes = ["/login", "/forgot-password",'*'];
  const shouldRenderLayout = !excludeRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderLayout && <Navbar />}
      {children}
      {shouldRenderLayout && (
        <>
          <Address className="bg-neutral-950 text-white md:flex justify-center gap-40 px-8 py-8" />
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>}/>
        <Route path="/home" element={<AppLayout><Home /></AppLayout>}/>
        <Route path="/pricing" element={<AppLayout><Pricing /></AppLayout>}/>
        <Route path="/contact" element={<AppLayout><Contact /></AppLayout>}/>
        <Route path="/trainers" element={<AppLayout> <Trainer /> </AppLayout>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<PasswordResetForm />} />
        <Route path="*" element={<Nopage/>}/>
      </Routes>
  );
}

export default App;
