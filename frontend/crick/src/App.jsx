import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/navbar/Header";
import Intro from "./components/Zoner/Intro";
import axios from "axios";
import { Context } from "./store/Context";

function App() {
  const { timeToShowHeader } = useContext(Context);
  const [loading, setLoading] = useState(true); // Loading state to delay rendering
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();

    async function getAuth() {
      try {
        const response = await axios.get(`http://localhost:8000/api/home`, {
          withCredentials: true,
        });

        if (response.data.msg !== "Please do login!") {
          return; // User is authenticated, no action needed
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



  // Conditional rendering based on loading state
  return loading ? (
    <Intro /> // Show intro while loading
  ) : (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center px-3 as">
      {timeToShowHeader ? <Header /> : null} {/* Conditionally render header */}
      <Outlet /> {/* Render child routes */}
    </div>
  );
}

export default App;
