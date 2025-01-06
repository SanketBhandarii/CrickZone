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
  const [loading, setLoading] = useState(sessionStorage.getItem("firstTime"));
  const navigate = useNavigate();
  const LOADER_DELAY = 2700;

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

        if (response.data.msg === "Please do login!") {
          navigate("/zone/login");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        navigate("/zone/login");
      } finally {
        if (sessionStorage.getItem("firstTime") == null) {
          setTimeout(() => {
            setLoading(false);
          }, LOADER_DELAY);
          sessionStorage.setItem("firstTime", false);
        } else {
          setLoading(false);
        }
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
          style={{ color: "lightblue", textDecoration: "underline", cursor:"pointer"}}
        >
          here
        </NavLink>
      </span>,
      {
        position: "bottom-right",
        style: { backgroundColor: "#162845", color: "white" },
        type: "success",
      }
    );
  }, []);

  if (loading == null) {
    return <Intro />;
  }

  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center px-3 as">
      {timeToShowHeader ? <Header /> : null}
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
