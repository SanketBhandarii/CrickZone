import React, { useState, useEffect } from "react";
import CrickLogo from "../../assets/CrickLogo.png";

function Intro() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 1000 ? prev + 2 : 100));
    },100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen bg-black flex flex-col gap-8 items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent" />

      <div className="absolute inset-0">
        {[...Array(70)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationIterationCount:"infinite",
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
        <div
          className="absolute -inset-4 rounded-full border-2 border-blue-400/40 animate-spin"
          style={{ animationDuration: "3s"}}
        />
        <div
          className="absolute -inset-2 rounded-full border border-purple-400/20 animate-spin"
          style={{ animationDuration: "2s", animationDirection: "reverse" }}
        />
        <img
          src={CrickLogo}
          width={200}
          className="rounded-full max-md:w-[100px] shadow-2xl shadow-blue-500/20 animate-pulse"
        />
      </div>
    </div>
  );
}

export default Intro;
