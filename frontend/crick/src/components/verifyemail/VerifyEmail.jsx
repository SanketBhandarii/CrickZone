import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  useEffect(() => {
    async function emailVerification() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/verify/${token}`
        );
      } catch (error) {}
    }
    emailVerification();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center w-full bg-sky-950">
      <div className="text-center p-10 bg-gray-900 rounded-lg shadow-lg">
        <div className="text-2xl text-lime-400 mb-5 flex items-center justify-center gap-2">
          <span className="text-white font-semibold text-2xl">CrickZone</span>-
          <span className="text-lime-400 text-2xl">✔</span>
        </div>
        <h1 className="text-3xl text-white mb-2">Email Verified!</h1>
        <p className="text-base text-gray-400 mb-4">
          Your email has been successfully verified.
        </p>
        <a
          href="https://crick-zone.vercel.app/login"
          className="text-sky-400 underline hover:text-sky-500"
        >
          Back to login
        </a>
      </div>
    </div>
  );
};

export default VerifyEmail;
