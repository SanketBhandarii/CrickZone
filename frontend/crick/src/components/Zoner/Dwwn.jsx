import React, { useContext } from "react";
import { Context } from "../../store/Context";
import { handleWick } from '../../utils/handleWick.js';
import { handleSpecialClick } from "../../utils/handleSpecialClick.js"; // Ensure correct path

function Dwwn() {
  const {
    wicket,
    setWicket,
    over,
    ball,
    setBall,
    setRun,
    run,
    currentRun,
    currentOver,
    setCurrentOver,
    setCurrentRun,
  } = useContext(Context);

  function handleWickWrapper(value, msg = "W") {
    handleWick(value, msg, setWicket, setBall, setCurrentRun, wicket, currentOver, over);
  }

  function undo() {
    if (currentRun.length > 0) {
      const lastEntry = currentRun[currentRun.length - 1];
      const newCurrentRun = currentRun.slice(0, -1);
      setCurrentRun(newCurrentRun);

      if (lastEntry === "W" && wicket > 0) {
        setWicket((prevWicket) => prevWicket - 1);
        if (ball > 0) setBall((prevBall) => prevBall - 1);
      } else if (lastEntry === "Dot" && ball > 0) {
        setBall((prevBall) => prevBall - 1);
      } else if (lastEntry === "Wide" || lastEntry === "No ball") {
        setRun((prevRun) => prevRun - 1);
      } else if (!isNaN(lastEntry)) {
        setRun((prevRun) => prevRun - parseInt(lastEntry));
        if (ball > 0) setBall((prevBall) => prevBall - 1);
      }
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-2">
      <div
        className="h-auto py-2 px-2 bg-teal-700 rounded-md flex justify-center items-center text-slate-200 cursor-pointer text-md transition duration-200"
        onClick={() => handleWickWrapper(0, "Dot")}
      >
        Dot ball
      </div>
      <div
        className="h-auto px-2 py-2 bg-teal-700 rounded-md flex justify-center items-center text-slate-200 cursor-pointer text-md transition duration-200"
        onClick={() => handleWickWrapper(1, "W")}
      >
        Wicket
      </div>
      <div
        className="h-auto px-2 py-2 bg-teal-700 rounded-md flex justify-center items-center text-slate-200 cursor-pointer text-md transition duration-200"
        onClick={() => handleSpecialClick("Wide", setBall, setRun, setCurrentRun, currentOver, over, wicket)}
      >
        Wide
      </div>
      <div
        className="h-auto px-2 py-2 bg-teal-700 rounded-md flex justify-center items-center text-slate-200 cursor-pointer text-md transition duration-200"
        onClick={() => handleSpecialClick("No ball", setBall, setRun, setCurrentRun, currentOver, over, wicket)}
      >
        No ball
      </div>
      <div
        className="h-auto px-2 py-2 bg-teal-700 rounded-md flex justify-center items-center text-slate-200 cursor-pointer text-md transition duration-200"
        onClick={undo}
      >
        <i className="fa-solid fa-rotate-left"></i>
        Undo
      </div>
    </div>
  );
}

export default Dwwn;
