import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/navbar/Header";
import Intro from "./components/Zoner/Intro";
import axios from "axios";
import { Context } from "./store/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { timeToShowHeader } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    async function getAuth() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/home`,
          {
            withCredentials: true,
          }
        );

        if (response.data.msg !== "Please do login!") {
          return;
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        navigate("/login");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1210);
      }
    }
    getAuth();
  }, [navigate]);

  useEffect(() => {
    toast(
      <span>
        Check out the latest news{" "}
        <NavLink
          to="/currentnews"
          style={{ color: "lightblue", textDecoration: "underline" }}
        >
          here
        </NavLink>
      </span>,
      {
        position: "bottom-right",
        style: { backgroundColor: "black", color: "white" },
        type: "success",
      }
    );
  }, []);

  return loading ? (
    <Intro />
  ) : (
    <div className="min-h-screen flex justify-center bg-gradient-to-b from-gray-900 to-transparent items-center relative">
      <video
        className="absolute bg-gray-900 top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        style={{ zIndex: -1 }}
      >
        <source src="https://videos.pexels.com/video-files/27745554/12217505_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full flex flex-col items-center">
        {timeToShowHeader ? <Header /> : null}
        <Outlet />
      </div>
      
      <ToastContainer />
    </div>
  );
}

export default App;
