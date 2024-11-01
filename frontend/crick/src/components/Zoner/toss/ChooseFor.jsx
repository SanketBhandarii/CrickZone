import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";

function ChooseFor() {
  const [decision, setDecision] = useState("");
  const { tossWinner, setInning, t2name, t1name, teamInfo, inning, ball } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (tossWinner === "" || !teamInfo) {
      navigate("/");
    }
  }, [tossWinner, teamInfo, navigate, ball]);

  useEffect(() => {
    if (inning) {
      localStorage.setItem("t1name", inning);
    }
  }, [inning]);

  const handleSubmit = (event) => {
    const choice = event.target.value;
    setDecision(choice);
    const newInning =
      choice === "Batting"
        ? tossWinner
        : tossWinner === t2name
        ? t1name
        : t2name;
    setInning(newInning);
    setTimeout(() => {
      localStorage.setItem("t1name", newInning);
    }, 2);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (decision) {
      setTimeout(() => {
        navigate("/play");
      }, 300);
    } else {
      alert("Please select Batting or Bowling.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-sky-600 h-auto py-12 rounded-2xl mx-auto mt-20 shadow-xl max-w-xl w-full">
      {decision ? (
        <h1 className="text-center text-white text-2xl max-sm:text-xl font-semibold mb-6 animate-bounce">
           Let's Start The MATCH! 😎
        </h1>
      ) : (
        <h1 className="text-center text-white text-2xl font-semibold mb-6">
          It's Your Call!
        </h1>
      )}

      <label className="text-white text-xl font-semibold text-center mb-6">
        <span className="text-yellow-300">{tossWinner}</span>, you won the toss!
        <br />
        What do you choose? 🏏
      </label>

      <form
        className="flex flex-col items-center gap-6 mt-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col sm:flex-row gap-5">
          <label className="flex items-center font-medium text-white cursor-pointer">
            <input
              type="radio"
              value="Batting"
              onChange={handleSubmit}
              name="choice"
              required
              className="form-radio h-6 w-6 cursor-pointer"
            />
            <span className="ml-1 text-xl font-semibold">🏏Batting</span>
          </label>

          <label className="flex items-center font-medium text-white cursor-pointer">
            <input
              type="radio"
              value="Bowling"
              onChange={handleSubmit}
              name="choice"
              required
              className="form-radio h-6 w-6 cursor-pointer"
            />
            <span className="ml-1 text-xl font-semibold">🎯Bowling</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-lime-500 text-black font-semibold rounded-md py-2 px-6 mt-4 transition duration-300 transform hover:scale-105"
        >
          🚀 Start Match
        </button>
      </form>
    </div>
  );
}

export default ChooseFor;
