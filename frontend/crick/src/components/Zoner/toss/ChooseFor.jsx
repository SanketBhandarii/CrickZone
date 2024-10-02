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
    <div className="flex flex-col items-center justify-center bg-white h-auto p-8 rounded-xl mx-auto mt-20 shadow-md max-w-md w-full">
      {decision ? (
        <h1 className="font-mono text-center text-neutral-800 text-xl font-semibold">
          Let's Start The MATCH 😎
        </h1>
      ) : null}
      <label className="text-neutral-800 text-xl font-semibold py-4 text-center">
        <span className="text-sky-500">{tossWinner}</span>, you won the toss!
        <br />
        What do you choose?
      </label>

      <form
        className="flex flex-col items-center gap-4 mt-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex gap-6">
          <label className="flex items-center font-semibold text-neutral-800 cursor-pointer">
            <input
              type="radio"
              value="Batting"
              onChange={handleSubmit}
              name="choice"
              required
              className="form-radio h-7 w-7 cursor-pointer"
            />
            <span className="ml-2 text-xl">Batting</span>
          </label>

          <label className="flex items-center font-semibold text-neutral-800 cursor-pointer">
            <input
              type="radio"
              value="Bowling"
              onChange={handleSubmit}
              name="choice"
              required
              className="form-radio h-7 w-7"
            />
            <span className="ml-2 text-xl cursor-pointer">Bowling</span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-sky-500 team-btn text-white flex rounded-md py-2 px-6 mt-4 transition duration-300"
        >
          Start Match
        </button>
      </form>
    </div>
  );
}

export default ChooseFor;
