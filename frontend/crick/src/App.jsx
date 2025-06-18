import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "./Wrapper";
import Toast from "./global/Toast";
import ContextProvider from "./store/Context.jsx";
import CrickContainer from "./components/Zoner/CrickContainer.jsx";
import TeamInput from "./components/Zoner/input/TeamInput.jsx";
import TossCoin from "./components/Zoner/toss/TossCoin.jsx";
import ChooseFor from "./components/Zoner/toss/ChooseFor.jsx";
import Features from "./components/features/Features.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Login from "./components/auth/Login.jsx";
import About from "./components/about/About.jsx";
import UserMatches from "./components/user-matches/UserMatches.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VerifyEmail from "./components/verifyemail/VerifyEmail.jsx";
import Reviews from "./components/review/Reviews.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import CurrentNews from "./components/CurrentNews.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/loader/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    toast(<Toast />, {
      position: "bottom-right",
      style: { backgroundColor: "#162845", color: "white" },
      type: "success",
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/zone",
      element: <Wrapper />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "",
          element: (
            <ProtectedRoute>
              <TeamInput />
            </ProtectedRoute>
          ),
        },
        {
          path: "toss",
          element: (
            <ProtectedRoute>
              <TossCoin />
            </ProtectedRoute>
          ),
        },
        {
          path: "toss/choosefor",
          element: (
            <ProtectedRoute>
              <ChooseFor />
            </ProtectedRoute>
          ),
        },
        {
          path: "play",
          element: (
            <ProtectedRoute>
              <CrickContainer />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/verifyEmail/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/features",
      element: (
        <ProtectedRoute>
          <Features />
        </ProtectedRoute>
      ),
    },
    {
      path: "/usermatches",
      element: (
        <ProtectedRoute>
          <UserMatches />
        </ProtectedRoute>
      ),
    },
    {
      path: "/currentnews",
      element: <CurrentNews />,
    },
    {
      path: "/about",
      element: (
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews",
      element: <Reviews />,
    },
  ]);

  return (
    <ContextProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <LoadingScreen>
          <RouterProvider router={router} />
        </LoadingScreen>
      </GoogleOAuthProvider>
    </ContextProvider>
  );
}

export default App;
