import React, { useState, useEffect } from "react";

import CrickLogo from "../../assets/CrickLogo.png";

function Intro() {
  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-neutral-900 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-ping" style={{animationDuration: '0.7s'}}></div>
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <img
              src={CrickLogo}
              width={200}
              className="rounded-full max-md:w-[100px] transition-transform duration-300"
            />
          </div>
        </div>
        <h1 className="text-center mt-4 text-white">Loading...</h1>
      </div>
    </div>
  );
}

export default Intro;