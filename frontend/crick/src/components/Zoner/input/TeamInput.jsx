import React, { useContext, useEffect, useRef, useState } from "react";
import ContextProvider, { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tp from "../../../assets/tp.mp3";

function TeamInput() {
  const navigate = useNavigate();
  const {
    setT1name,
    setT2name,
    t1name,
    t2name,
    setOver,
    setTeamInfo,
    user
  } = useContext(Context);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.clear();
    // async function getAuth() {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_BACKEND_URL}/api/home`,
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     console.log(response);

    //     if (response.data.msg !== "Please do login!") {
    //       setUser(response.data.username);
    //       setTimeToShowHeader(true);
    //       return;
    //     } else {
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     console.error("Error during authentication check:", error);
    //   }
    // }
    // getAuth();
  }, []); // Add user as dependency to trigger rerender on user change

  useEffect(() => {
    setMessage("");
  }, [t1name, t2name]);

  function handleForm(event) {
    event.preventDefault();
    const isT1nameValid = t1name.trim() !== "" && !/^\s*$/.test(t1name);
    const isT2nameValid = t2name.trim() !== "" && !/^\s*$/.test(t2name);

    if (!isT1nameValid || !isT2nameValid) {
      setMessage("Enter valid names");
      return;
    }
    if (t1name.toLowerCase() === t2name.toLowerCase()) {
      setMessage("Team names must be different.");
      return;
    }

    setMessage("");
    setTeamInfo(true);
    setTimeout(() => {
      navigate("/toss");
    }, 300);
  }

  return (
    <div className="flex mt-5 relative">
      <div className="left h-height-1 w-width-1 flex flex-col justify-center items-center bg-white rounded-tl-lg rounded-bl-lg max-scrn2:rounded-lg shadow-md input-box">
        <div className="bg-sky-500 h-20 items-center font-font_1 justify-center rounded-tl-lg rounded-tr-lg w-full px-7 text-white font-semibold text-lg text-center hidden max-scrn2:flex">
          Welcome
          <br /> to CrickZone!
          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/15/31/tennis-2025095_1280.png"
            width={110}
            className="rounded-full ml-7 rotate"
          />
        </div>
        <form
          action=""
          className="h-96 gap-5 flex flex-col items-center justify-center"
          onSubmit={handleForm}
        >
          <h2 className="text-sky-500 text-lg font-semibold w-64 text-left">
            <p className="text-red-600 text-md w-72">{message}</p>
            Hey there👋,
            <span className="text-amber-700">
              {user ? user : "Let's set up your teams!"}!
            </span>
            <br />
            Fill your team details
          </h2>
          <input
            type="text"
            placeholder="Enter team-1 name"
            onChange={(event) => setT1name(event.target.value)}
            minLength="2"
            maxLength="20"
            required
            className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />
          <input
            type="text"
            placeholder="Enter team-2 name"
            onChange={(event) => setT2name(event.target.value)}
            minLength="2"
            maxLength="20"
            required
            className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />
          <input
            type="number"
            placeholder="No. of overs"
            onChange={(event) => setOver(event.target.value)}
            max="50"
            min="1"
            required
            className="bg-gray-300 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />
          <button className="bg-sky-600 team-btn hover:bg-sky-700 transition duration-300 text-white w-64 flex justify-center rounded-md py-2 px-4">
            Proceed to Toss
          </button>
        </form>
      </div>
      <div className="right flex flex-col gap-5 justify-center items-center rounded-tr-lg rounded-br-lg h-height-1 w-80 bg-sky-600 px-7 text-white font-semibold text-lg max-scrn2:hidden text-center colorChanger">
        <img
          src="https://cdn.pixabay.com/photo/2017/01/31/15/31/tennis-2025095_1280.png"
          width={120}
          className="rounded-full rotate"
        />
        <h2>Welcome🏏! Enter Your Teams & Proceed For Toss</h2>
      </div>
    </div>
  );
}

export default TeamInput;
