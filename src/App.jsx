import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar/Navbar';
import Home from './Pages/HomeSection/Home';
import Contact from './Pages/Contact/Contact';
import Pricing from './Pages/Pricing/Pricing';
import Nopage from './components/UI/Nopage';
import Footer from './layouts/footer'
import Address from './layouts/Address';
import Trainer from './Pages/Trainers/Trainer'
function App() {
  return (
    <BrowserRouter>
      {/* Navbar is rendered on all pages */}
      <Navbar />

      {/* Routes for page-specific components */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trainers" element={<Trainer />} />
        {/* <Route path="*" element={<Nopage />} /> */}
      </Routes>
      <Address className=" bg-neutral-950 text-white md:flex justify-center gap-40 px-8 py-8"/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
