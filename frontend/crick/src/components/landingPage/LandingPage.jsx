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
        <h1 className="text-3xl cursor-pointer font-extrabold bg-gradient-to-tr from-teal-400 via-blue-400 bg-clip-text text-transparent">
          CrickZone
        </h1>
        <i className="fa-brands fa-github text-3xl cursor-pointer"></i>
      </nav>
      <div className="h-auto flex flex-col justify-center items-center text-center py-20">
        <h2 className="text-4xl font-semibold bg-gradient-to-tr from-teal-400 via-blue-500 to-white bg-clip-text text-transparent mb-4">
          Revolutionizing Cricket Score Tracking
        </h2>
        <p className="text-lg mb-6 max-w-xl">
          CrickZone simplifies cricket scoring with real-time updates and
          seamless match management. It's our small but meaningful effort to
          improve cricket scoring in a smarter way, ensuring accuracy, fun, and
          fairness for all players.
        </p>
        <button
          className="px-8 py-3 text-lg font-bold bg-gradient-to-tr text-white from-teal-500 via-blue-600 to-white text-transparent border-2 border-transparent hover:text-white hover:bg-transparent hover:border-teal-500 hover:border-2 rounded-full transition-all"
          onClick={handleNavigate}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
