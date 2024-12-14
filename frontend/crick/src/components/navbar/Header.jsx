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
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/logout`,
        {
          withCredentials: true,
        }
      );

      if (response.data.msg == "Logout Successfull") {
        setTimeToShowHeader(false);
        navigate("/zone/login");
        return;
      }
    } catch (error) {
      console.error("Error during authentication check:", error);
      navigate("/zone/login");
    }
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed top-0 mt-2 left-0 w-full py-3 px-[10%] text-white flex justify-between items-center z-[100]">
      <a href="/zone" className="text-2xl cursor-pointer flex items-center gap-3 text-white font-bold">
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
        className={`fixed top-0 left-0 h-full w-64 bg-neutral-800 text-white transition-transform transform ${
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
          <NavLink
            to="/reviews"
            onClick={toggleMenu}
            className="text-white p-2 rounded-lg bg-sky-700 hover:bg-sky-700 transition duration-300"
          >
            <li className="cursor-pointer px-1">Reviews</li>
          </NavLink>
          <button
            onClick={logout}
            className="text-black p-2 rounded-lg bg-lime-400 hover:bg-lime-600 transition duration-300"
          >
            <p className="px-1 text-left">Logout</p>
          </button>
        </ul>
      </div>

      {/* Desktop Menu */}
      <nav className="relative text-lg text-white font-medium flex items-center space-x-6 max-scrn1:hidden">
        <NavLink to="/" className="text-sky-400 flex gap-2 items-center">
          Play
          <i class="fa-solid fa-puzzle-piece text-lime-500 text-xl"></i>
        </NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink
          to="/reviews"
          className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 px-2 py-2 rounded-md"
        >
          Reviews
        </NavLink>
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
