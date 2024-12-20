import React from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavbarMenu } from "../../mockdata/data";
import { FaDumbbell } from "react-icons/fa6";
import Button from "../../components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn =()=>{
    navigate('/login');
  }

  return (
    <header className="header-area header-sticky h-[80px] bg-transparent text-white absolute w-full z-10">
      <div className="container mx-auto px-17">
        <div className="flex items-center justify-between py-4">
          <Link to ="/home"
            className="gap-1 flex items-center space-x-1 font-extrabold text-xl uppercase tracking-wide">
            <FaDumbbell className="text-xl"/>
            Hercules <span className="text-primary">GYM</span>
          </Link>

          <nav className=" hidden lg:flex items-center space-x-20">
            <ul className="flex items-center space-x-12">
              {NavbarMenu.map((item) => (
                <li key={item.id} className="text-sm font-medium">
                  <Link to={item.link}
                    className="hover:text-primary transition duration-200">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Button label ='SIGN IN' onClick={handleSignIn}/>
          </nav>
            <div className="lg:hidden" onClick={() => setOpen(!open)}>
          <GiHamburgerMenu className="text-4xl " />
          </div>
         </div>
      <HamburgerMenu open={open} />
      </div>
    </header>
  );
};
export default Navbar;
