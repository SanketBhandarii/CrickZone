import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gradient-to-b from-gradient1 to-gradient2 h-screen overflow-auto">
      {" "}
      {/* Background gradient from cyan-900 to gray-900 */}
      <div className="absolute top-8 left-8">
        <button
          onClick={() => navigate("/zone")}
          className="flex items-center gap-2 text-white text-lg sm:text-xl"
        >
          <i className="fa-solid fa-circle-left text-3xl sm:text-3xl"></i>
          <span>Back</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-slate-200 mb-8 mt-8">
          About CrickZone
        </h1>
        <div className="bg-slate-700 shadow-lg rounded-lg p-6">
          {" "}
          {/* Card background color */}
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6">
            At CrickZone, our mission is to revolutionize how cricket
            enthusiasts manage their scores and track game statistics. We aim to
            create a user-friendly platform that enhances the enjoyment of the
            game, making it accessible for everyone, from casual players to
            serious enthusiasts.
          </p>
          <h2 className="text-2xl font-bold text-white mb-4">What We Offer</h2>
          <ul className="list-disc list-inside mb-6 text-gray-300">
            <li>Real-time score updates</li>
            <li>Dynamic score tracking for various cricket formats</li>
            <li>User-friendly interface for easy navigation</li>
            <li>
              Voice recognition system for seamless score updates by umpires or
              tournament managers
            </li>
          </ul>
          <h2 className="text-2xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-gray-300 mb-6">
            We believe in the spirit of sportsmanship, teamwork, and fair play.
            Our goal is to make the score tracking system fair and visible to
            all players and users. We have implemented a voice recognition
            system that updates scores only when the match umpire or tournament
            manager speaks, ensuring accuracy and engagement in the game.
          </p>
          <h2 className="text-2xl font-bold text-white mb-4">Join Us!</h2>
          <p className="text-gray-300 mb-6">
            Whether you're a player, coach, or fan, CrickZone welcomes you to be
            a part of our journey. Together, let's make cricket even more
            exciting!
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-300 mb-2">Follow us on social media:</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://twitter.com"
              className="text-blue-400 hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
            <a
              href="https://facebook.com"
              className="text-blue-500 hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="text-pink-400 hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
