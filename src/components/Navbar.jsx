import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { MdCurrencyExchange } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";

import icon from "../images/cryptocurrency.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  return (
    <div className="w-full flex justify-center mb-[100px]">
      <div className="px-5 flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white bg-[#12273b]">
        <div>
          <NavLink
            to="/"
            className="text-3xl font-bold flex items-center gap-4"
          >
            <img src={icon} alt="Logo" className="w-[50px] h-[50px]" />
            <h1>CryptoApp</h1>
          </NavLink>
        </div>
        <div className="hidden md:flex gap-[20px] text-xl">
          <NavLink
            to="/"
            className="hover:text-[#1677ff] transition duration-300 flex gap-1 items-center"
          >
            <AiOutlineHome /> Home
          </NavLink>
          <NavLink
            to="/cryptocurrencies"
            className="hover:text-[#1677ff] transition duration-300 flex gap-1 items-center"
          >
            <BsCoin /> Cryptocurrencies
          </NavLink>
          <NavLink
            to="/news"
            className="hover:text-[#1677ff] transition duration-300 flex gap-1 items-center"
          >
            <HiOutlineNewspaper />
            News
          </NavLink>
        </div>

        {/* Hamburger */}
        <div onClick={handleNav} className="md:hidden z-10">
          {nav ? (
            <AiOutlineClose className="text-white" size={20} />
          ) : (
            <HiOutlineMenuAlt4 size={20} />
          )}
        </div>

        {/* Mobile menu dropdown */}
        <div
          onClick={handleNav}
          className={
            nav
              ? "absolute text-white left-0 top-0 w-full bg-[#1E1E1E] px-4 py-7 flex flex-col"
              : "absolute left-[-200%]"
          }
        >
          <div className="w-screen h-1/5 flex flex-col items-center gap-[50px]">
            <h1>CryptoApp</h1>
            <NavLink to="/" className="border-b flex gap-1 items-center">
              <AiOutlineHome /> Home
            </NavLink>
            <NavLink
              to="/cryptocurrencies"
              className="border-b flex gap-1 items-center"
            >
              <BsCoin /> Cryptocurrencies
            </NavLink>
            <NavLink to="/news" className="border-b flex gap-1 items-center">
              <HiOutlineNewspaper />
              News
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
