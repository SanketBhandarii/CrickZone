import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/zone");
  }

  return (
    <div className="bg-landing-page-bg text-white min-h-screen">
      <nav className="py-11 h-auto flex justify-around items-center gap-72 max-md:gap-32 max-sm:gap-20">
        <h1 className="text-3xl cursor-pointer font-extrabold bg-gradient-to-tr from-teal-400 via-blue-400 to-white bg-clip-text text-transparent">
          CrickZone
        </h1>
        <a href="https://github.com/SanketBhandarii/CrickZone">
          <i className="fa-brands fa-github text-3xl cursor-pointer"></i>
        </a>
      </nav>
      <div className="h-auto flex flex-col justify-center items-center text-center py-20 mx-9">
        <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent mb-4">
          Revolutionizing Cricket Score Tracking
        </h2>
        <p className="text-lg mb-6 max-w-xl text-slate-400">
          CrickZone simplifies cricket scoring with real-time updates, seamless
          management, and an effort from our side to ensure accuracy, fun, and
          fairness for all
        </p>
        <button
          className="px-8 py-3 text-lg font-bold bg-sky-600 text-white rounded-full transition-all duration-300 hover:bg-sky-700 hover:shadow-lg"
          onClick={handleNavigate}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
