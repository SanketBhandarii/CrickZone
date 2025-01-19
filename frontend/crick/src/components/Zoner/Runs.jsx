// Runs.js
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/Context";
import { handleClick } from "../../utils/handleClick.js";
import crick from "../../assets/6-audio.mp3"; // Import the function
import wick from "../../assets/W-audio.mp3"; // Import the function

function Runs() {
  const {
    ball,
    setBall,
    run,
    setRun,
    currentRun,
    setInning,
    inning,
    setCurrentRun,
    wicket,
    currentOver,
    setCurrentOver,
    over,
    t1name,
    t2name,
    setMatchWinner,
  } = useContext(Context);

  const [aud, setAud] = useState(false);

  useEffect(() => {
    if (ball === 6 && currentOver < over) {
      if (currentOver === over - 1) {
        const currentTeam = localStorage.getItem("t1name");
        if (t2name !== currentTeam) {
          setInning(t2name);
        } else if (t1name !== currentTeam) {
          setInning(t1name);
        }
      }
      setCurrentRun([`${currentOver + 1} over completed`]);
      setCurrentOver((prev) => prev + 1);
      setBall(0);
      setTimeout(() => {
        setCurrentRun([]);
      }, 2000);
    }
  }, [ball]);

  useEffect(() => {
    if (currentRun.at(-1) == 6 || currentRun.at(-1) == "W") {
      setAud(true);
      setTimeout(() => {
        setAud(false);
      }, 6080);
    }
  }, [currentRun, setCurrentRun, run, setRun]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-2">
      {aud ? (
        <audio autoPlay loop>
          <source
            src={currentRun.at(-1) == "W" ? wick : crick}
            type="audio/mp3"
          />
        </audio>
      ) : null}
      {[1, 2, 3, 4, 5, 6].map((value) => (
        <div
          key={value}
          className="h-11 w-11 bg-sky-500 text-white rounded-md flex justify-center items-center cursor-pointer text-lg hover:bg-sky-700 transition duration-200 transform hover:scale-110 shadow-lg hover:shadow-2xl"
          onClick={() =>
            handleClick(
              value,
              setBall,
              setRun,
              setCurrentRun,
              currentOver,
              over,
              wicket,
              run,
              setCurrentOver,
              inning,
              setMatchWinner
            )
          }
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default Runs;
