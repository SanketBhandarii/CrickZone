import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/index.css";
import ContextProvider from "./store/Context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import LiveMatch from "./components/CurrentNews.jsx";
import Reviews from "./components/review/Reviews.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import CurrentNews from "./components/CurrentNews.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/zone",
    element: <App />,
    children: [
      {
        path: "",
        element: <TeamInput />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },

      {
        path: "toss",
        element: <TossCoin />,
      },
      {
        path: "toss/choosefor",
        element: <ChooseFor />,
      },
      {
        path: "play",
        element: <CrickContainer />,
      },
    ],
  },
  {
    path: "/verifyEmail/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/usermatches",
    element: <UserMatches />,
  },
  {
    path: "/currentnews",
    element: <CurrentNews />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
]);

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </ContextProvider>
);
