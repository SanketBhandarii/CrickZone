import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/zone");
  }

  return (
    <div className="bg-gradient-to-b from-app-bg to-gradient2 text-white min-h-screen">
      <nav className="py-11 h-auto flex justify-around items-center gap-72 max-md:gap-32 max-sm:gap-20">
        <a href="/">
          <h1 className="text-3xl cursor-pointer font-extrabold bg-gradient-to-tr from-teal-400 via-blue-400 to-white bg-clip-text text-transparent">
            CrickZone
          </h1>
        </a>
        <a href="https://github.com/SanketBhandarii/CrickZone">
          <i className="fa-brands fa-github text-3xl cursor-pointer"></i>
        </a>
      </nav>
      <motion.div
        className="card"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 3,
          },
        }}
        viewport={{ once: true }}
      >
        <div className="h-auto flex flex-col justify-center items-center text-center py-14 mx-9">
          <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent mb-4">
            Revolutionizing Cricket Score Tracking
          </h2>
          <p className="text-lg mb-6 max-w-xl text-slate-400">
            CrickZone simplifies cricket scoring with real-time updates,
            seamless management, and an effort from our side to ensure accuracy,
            fun, and fairness for all
          </p>
          <button
            className="px-8 py-3 text-lg font-bold bg-sky-600 text-white rounded-full transition-all duration-300 hover:bg-sky-700 hover:shadow-lg"
            onClick={handleNavigate}
          >
            Get Started
            <i class="fa-solid fa-bolt ml-3"></i>
          </button>
        </div>

          <div className="flex flex-wrap justify-center gap-7 px-5 pb-5">
            <div className="max-w-xs bg-cyan-950 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-4">
                Real-Time Score Updates
              </h3>
              <p className="text-white">
                Stay up-to-date with live scores as your matches unfold, giving
                you immediate updates and insights.
              </p>
            </div>
            <div className="max-w-xs bg-cyan-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-4">
                Dynamic Score Tracking
              </h3>
              <p className="text-white">
                Track scores across various formats of cricket seamlessly, a local match or an official tournament.
              </p>
            </div>
            <div className="max-w-xs bg-cyan-950 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
              <h3 className="text-xl font-semibold text-teal-500 mb-4">
                Voice Recognition System
              </h3>
              <p className="text-white">
                Let your umpires or tournament managers update scores with ease
                using our voice recognition system.
              </p>
            </div>
          </div>
        
      </motion.div>
    </div>
  );
}

export default LandingPage;
