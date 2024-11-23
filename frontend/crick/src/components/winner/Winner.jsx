import React, { useContext, useEffect } from "react";
import { Context } from "../../store/Context";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function Winner() {
  const {
    run,
    wicket,
    inning,
    t2name,
    matchWinner,
    setTossWinner,
    over,
    setUserMatchInfo,
    userMatchInfo,
  } = useContext(Context);

  useEffect(() => {
    const t1name = localStorage.getItem("t1name");
    setTossWinner("");
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    async function addMatch() {
      if (!matchWinner) {
        return;
      }
      try {
        const req = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/match/createMatch`,
          {
            date: formattedDate,
            over: over,
            teams: `${t1name} vs ${inning}`,
            result: matchWinner,
            location: "Mumbai",
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error adding match:", error);
      }
    }

    // Call the function to add the match
    addMatch(); 
  }, [matchWinner]);

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold mb-4 text-green-300">
          🏆 Match Winner! 🏆
        </h1>
        <p className="text-lg font-semibold px-2 mb-1 text-white">
          {localStorage.getItem("t1name")} scored{" "}
          {localStorage.getItem("t1run")} runs and{" "}
          {localStorage.getItem("t1wicket")} wicket(s)
        </p>
        <p className="text-lg px-2 font-semibold text-cyan-200">
          {inning} scored {run} runs and {wicket} wicket(s)
        </p>

        {/* Trophy Icon */}
        <i className="fa-solid fa-award ext-yellow-400 bg-yellow-600 rounded-full w-24 py-4 text-6xl mt-4 mb-2"></i>

        <h2 className="text-lg px-2 font-bold mt-4 text-green-300">
          {matchWinner} 🎉
        </h2>
      </div>
      <h1 className="text-white font-semibold text-xl text-center">
        Take Your ScreenShot!📸
      </h1>
    </div>
  );
}

export default Winner;
