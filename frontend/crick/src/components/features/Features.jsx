import React from "react";
import { NavLink } from "react-router-dom";
import speechFeature from "../../assets/speechFeature.png";

function Features() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="ml-1 bg-gradient-to-r from-sky-600 to-sky-900 text-white px-8 py-6 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-lg font-bold text-center mb-3">
          Voice Control Feature
        </h1>
        <p className="text-base text-center">
          See the new feature! Use voice commands like{" "}
          <span className="font-bold">"one run"</span> or{" "}
          <span className="font-bold">"wide"</span> to update the score.{" "}
          <NavLink
            to="/"
            className="text-yellow-300 underline hover:text-yellow-400"
          >
            Back
          </NavLink>
        </p>
      </div>
      <div>
        <img src={speechFeature} className="w-width-2 rounded-md shadow-2xl"/>
      </div>
    </div>
  );
}

export default Features;
