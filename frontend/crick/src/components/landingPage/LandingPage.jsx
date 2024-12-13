import React from "react";
import Header from "../navbar/Header";
import { Outlet, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  function handleNavigate(){
    navigate("/zone");
  }
  return (
    <div className="bg-neutral-900 text-white min-h-screen">
     
      <button onClick={handleNavigate} className="bg-sky-800 py-4 px-7 rounded-lg m-7">Get started</button>
    </div>
  );
}

export default LandingPage;
