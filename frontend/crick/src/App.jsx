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
  // const firstVisit = sessionStorage.getItem("firstVisit");
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
        }, 2700);
      }
    }
    // if (navigate) {
    //   if (!firstVisit) {
    //     sessionStorage.setItem("firstVisit", true);
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 3000);
    //   } else {
    //     setLoading(false);
    //   }
    // }
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
        style: { backgroundColor: "#162845", color: "white" },
        type: "success",
      }
    );
  }, []);

  return loading ? (
    <Intro />
  ) : (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center px-3 as">
      {timeToShowHeader ? <Header /> : null}
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
