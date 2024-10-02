import React from "react";
import { NavLink } from "react-router-dom";

function SpeecFeatureInfo() {
  return (
    <div className="ml-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-4 rounded-xl shadow-xl max-w-lg">
      <h1 className="text-base font-bold text-center mb-2">
        Voice Control Feature
      </h1>
      <p className="text-sm text-center">
        See the new feature! Use voice commands like{" "}
        <span className="font-bold">"one run"</span> or{" "}
        <span className="font-bold">"wide"</span> to update the score.{" "}
        <NavLink
          to="/features"
          className="text-yellow-300 underline hover:text-yellow-400"
        >
          Check how to use
        </NavLink>
      </p>
    </div>
  );
}

export default SpeecFeatureInfo;
