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
  const [loading, setLoading] = useState(true); // Loading state to delay rendering
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
          return; // User is authenticated, no action needed
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        navigate("/login");
      } finally {
        const timeoutId = setTimeout(() => {
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

  // Conditional rendering based on loading state
  return loading ? (
    <Intro /> // Show intro while loading
  ) : (
    <div className="min-h-screen flex justify-center items-center px-3 as">
      {timeToShowHeader ? <Header /> : null} {/* Conditionally render header */}
      <Outlet /> {/* Render child routes */}
      <ToastContainer />
    </div>
  );
}

export default App;
