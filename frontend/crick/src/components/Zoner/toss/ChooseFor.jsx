import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/Context";
import { useNavigate } from "react-router-dom";

function ChooseFor() {
  const [decision, setDecision] = useState("");
  const { tossWinner, setInning, t2name, t1name, teamInfo, inning } =
    useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (tossWinner === "" || !teamInfo) {
      navigate("/zone");
    }
  }, [tossWinner, teamInfo, navigate]);

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
    localStorage.setItem("t1name", newInning);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (decision) {
      navigate("/zone/play");
    } else {
      alert("Please select Batting or Bowling.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-[54vh] max-sm:h-[67vh] w-full max-w-4xl mx-auto mt-1 rounded-lg shadow-xl overflow-hidden  max-sm:mx-3">
      {/* Left Side - Teal */}
      <div className="flex-1 bg-white flex items-center justify-center py-8">
        <div className="text-center ">
          {decision ? (
            <h1 className="text-3xl font-semibold mb-3 animate-bounce max-sm:text-2xl">
              Let's Start <br /> The MATCH! 😎
            </h1>
          ) : (
            <h1 className="text-3xl font-semibold mb-4">It's Your Call!</h1>
          )}
          <label className="text-xl font-semibold mb-4">
            <span className="text-sky-500">{tossWinner}</span>, you won the
            toss!
            <br />
            What do you choose?
          </label>
        </div>
      </div>

      {/* Right Side - Gold */}
      <div className="flex-1 bg-sky-500 flex items-center justify-center py-8">
        <form
          className="flex flex-col items-center gap-6 text-white"
          onSubmit={handleFormSubmit}
        >
          <span className="ml-2 text-2xl font-semibold text-center max-sm:text-xl">
            What Do You Choose?{" "}
          </span>
          <div className="flex flex-col sm:flex-row gap-4">
            <label className="flex items-center font-medium cursor-pointer text-white">
              <input
                type="radio"
                value="Batting"
                onChange={handleSubmit}
                name="choice"
                required
                className="form-radio h-6 w-6 cursor-pointer"
              />
              <span className="ml-1 text-2xl font-semibold max-sm:text-xl">
                Batting
              </span>
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
              <span className="ml-1 text-2xl font-semibold max-sm:text-xl">
                Bowling
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="text-black font-semibold rounded-md py-3 px-6 bg-yellow-400 hover:bg-yellow-500 transition duration-300"
          >
            🚀 Start Match
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChooseFor;
