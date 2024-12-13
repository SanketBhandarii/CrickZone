import React, { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import Dwwn from "./Dwwn";
import Runs from "./Runs";
import CurrentScore from "./CurrentScore";
import { Context } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import Winner from "../winner/Winner";
import Voice from "./Voice";
import SpeecFeatureInfo from "./speechFeatureInfo/SpeecFeatureInfo";
import axios from "axios";

function CrickContainer() {
  const {
    wicket,
    currentOver,
    over,
    currentRun,
    setCurrentRun,
    setRun,
    run,
    setWicket,
    setCurrentOver,
    setBall,
    match,
    setMatch,
    inning,
    teamInfo,
    setMatchWinner,
  } = useContext(Context);

  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (teamInfo === false) {
      navigate("/zone");
    }
    setCurrentOver(0);
    setRun(0);
    setWicket(0);
    setBall(0);
    setCurrentRun([]);
  }, [navigate]);

  useEffect(() => {
    if (wicket >= 10 || currentOver >= over) {
      if (match === 1) {
        localStorage.setItem("t1run", run);
        localStorage.setItem("t1wicket", wicket);
      } else if (match === 2) {
        const t1Run = parseInt(localStorage.getItem("t1run"), 10);
        const t1Wicket = parseInt(localStorage.getItem("t1wicket"), 10);

        let result;
        if (run > t1Run) {
          result = `Team ${inning} Won The Match`;
        } else if (run < t1Run) {
          result = `Team ${localStorage.getItem("t1name")} Won The Match`;
        } else if (run === t1Run) {
          result = "Match Draw";
        }
        setMatchWinner(result);
        setShowConfetti(true);

        const confettiTimeout = setTimeout(() => {
          setShowConfetti(false);
        }, 15000);

        return () => clearTimeout(confettiTimeout);
      }
    }
  }, [wicket, currentOver, over, run, inning, match, setMatchWinner]);

  function startSecondInning() {
    setCurrentOver(0);
    setRun(0);
    setWicket(0);
    setBall(0);
    setMatch(2);
  }

  return (
    <>
      {wicket >= 10 || currentOver >= over ? (
        match === 2 ? (
          <div className="fixed inset-0 flex float justify-center items-center bg-opacity-80 z-50 p-4">
            {showConfetti && (
              <div className="fixed inset-0 z-50 pointer-events-none">
                <Confetti />
              </div>
            )}
            <div className="w-full relative bg-gradient-to-r from-blue-700 to-sky-600 text-white  rounded-lg shadow-2xl py-11 px-4 max-w-md winner">
              <Winner />
            </div>
          </div>
        ) : (
          <div className="h-auto max-w-md w-full py-12 bg-white rounded-xl flex flex-col items-center justify-center gap-4 mx-4 sm:mx-auto">
            <h5 className="font-semibold text-xl text-center text-neutral-800">
              Innings over
            </h5>
            <h5
              className={`text-neutral-800 font-semibold text-lg text-center ${
                match === 2 ? "hidden" : "block"
              }`}
            >
              <span className="text-sky-600">
                {localStorage.getItem("t1name")}
              </span>{" "}
              score: {run} runs {wicket} wicket(s)
            </h5>
            {match === 1 && (
              <button
                className="w-full max-w-xs max-scrn3:w-52 px-4 py-2 bg-sky-500 hover:bg-sky-600 font-semibold rounded-md text-slate-200 cursor-pointer text-md transition duration-200"
                onClick={startSecondInning}
              >
                Start 2nd inning
              </button>
            )}
          </div>
        )
      ) : (
        <div className="flex flex-col gap-2 w-full items-center">
          <div className="h-auto w-[600px] max-scrn4:w-full max-scrn4:max-w-lg py-12 bg-white rounded-xl flex flex-col items-center gap-4 mx-1">
            <div className="flex gap-3 justify-center text-white text-lg flex-wrap">
              {currentRun.map((r, index) => (
                <h5
                  key={index}
                  className={`${
                    r === "W"
                      ? "bg-red-600"
                      : r === 6
                      ? "bg-amber-600"
                      : "bg-cyan-700"
                  } px-4 py-2 rounded-full text-white`}
                >
                  {r}
                </h5>
              ))}
            </div>
            <Runs />
            <Dwwn />
            <CurrentScore />
          </div>
          <SpeecFeatureInfo />
        </div>
      )}
      <div className="fixed bottom-4 right-4 z-50">
        <Voice />
      </div>
    </>
  );
}

export default CrickContainer;
