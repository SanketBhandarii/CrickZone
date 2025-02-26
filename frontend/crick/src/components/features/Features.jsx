import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 min-h-screen w-full p-4 justify-center bg-gradient-to-t from-gradient1 to-gradient2">
      <div className="absolute top-8 left-8">
        <button
          onClick={() => navigate("/zone")}
          className="flex items-center gap-2 text-white text-lg sm:text-xl"
        >
          <i className="fa-solid fa-circle-left text-3xl sm:text-3xl"></i>
          <span>Back</span>
        </button>
      </div>
      <h1 className="text-white font-semibold text-2xl">
        More Features To Come !
      </h1>
      <div className="bg-gradient-to-r from-cyan-700 to-cyan-800 text-white px-4 py-6 rounded-2xl shadow-2xl w-full max-w-max">
        <h1 className="text-lg font-bold text-center mb-3">
          Voice Control Feature
        </h1>
        <p className="text-base text-center">
          See the new feature! Use voice commands like{" "}
          <span className="font-bold">"one run"</span> or{" "}
          <span className="font-bold">"wide"</span> to update the score.{" "}
          <NavLink
            to="/ZONE"
            className="text-yellow-300 underline hover:text-yellow-400"
          >
            Back
          </NavLink>
        </p>
      </div>

      <div className="flex justify-center w-full">
        <img
          src="https://res.cloudinary.com/dyrmawqcn/image/upload/v1736140369/speechFeature_tdtds6.png"
          className="w-width-2 rounded-md shadow-2xl"
          alt="Voice Control Feature"
        />
      </div>
    </div>
  );
}

export default Features;
