import React, { useContext, useState } from "react";
import CrickLogo from "../../assets/CrickLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { Context } from "../../store/Context";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const { setTimeToShowHeader } = useContext(Context);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`, {
        withCredentials: true,
      });

      if (response.data.msg == "Logout Successfull") {
        setTimeToShowHeader(false);
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      navigate("/login");
    }
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed top-0 mt-2 left-0 w-full py-3 px-[10%] text-white flex justify-between items-center z-[100]">
      <a
        href="/"
        className="text-2xl flex items-center gap-3 text-white font-bold"
      >
        <img
          src={CrickLogo}
          className="w-12 rounded-full"
          alt="CrickZone Logo"
        />
        <h1>
          Crick<span className="text-sky-400">Zone</span>
        </h1>
      </a>
      <i
        className="fa-solid fa-bars text-2xl hidden max-scrn1:block cursor-pointer"
        onClick={toggleMenu}
      ></i>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-bg-clr1 text-white transition-transform transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } z-50 max-scrn1:block`}
      >
        <div className="flex justify-end p-6">
          <i
            className="fa-solid fa-circle-xmark text-5xl cursor-pointer"
            onClick={toggleMenu}
          ></i>
        </div>
        <ul className="flex flex-col mx-7 gap-7 pt-3 text-white font-font_1 text-xl font-semibold">
          <NavLink to="/usermatches" onClick={toggleMenu}>
            <i className="fa-solid fa-circle-user text-4xl px-2"></i>
          </NavLink>
          <NavLink to="/" onClick={toggleMenu}>
            <li className="cursor-pointer py-2 px-2 text-sky-400">Play 🥎</li>
          </NavLink>
          <NavLink to="/features" onClick={toggleMenu}>
            <li className="cursor-pointer py-2 px-2">Features</li>
          </NavLink>
          <NavLink to="/about" onClick={toggleMenu}>
            <li className="cursor-pointer py-2 px-2">About Us</li>
          </NavLink>
          <NavLink to="/" onClick={toggleMenu}>
            <li className="cursor-pointer py-2 px-2">Contact</li>
          </NavLink>
          <button
            onClick={logout}
            className="flex items-center text-black text-lg gap-2 p-2 rounded-lg bg-lime-400 hover:bg-lime-600 transition duration-300"
          >
            <p>Logout</p>
          </button>
        </ul>
      </div>

      {/* Desktop Menu */}
      <nav className="relative text-lg text-white font-medium flex items-center space-x-6 max-scrn1:hidden">
        <NavLink to="/" className="text-sky-400">
          Play
        </NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/">Contact</NavLink>
        <button
          onClick={logout}
          className="flex items-center text-black text-lg gap-2 p-2 rounded-lg bg-lime-400 hover:bg-lime-600 transition duration-300"
        >
          <p>Logout</p>
        </button>
        <NavLink to="/usermatches">
          <i className="fa-solid fa-circle-user text-4xl"></i>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
