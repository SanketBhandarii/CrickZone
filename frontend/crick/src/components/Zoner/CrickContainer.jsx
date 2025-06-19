import { useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import Runs from "./Runs";
import Controls from "./Dwwn";
import CurrentScore from "./CurrentScore";
import { Context } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import Winner from "../winner/Winner";
import Voice from "./Voice";
import SpeechFeatureInfo from "./speechFeatureInfo/SpeecFeatureInfo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Play } from "lucide-react";

function CrickContainer() {
  const {
    wicket,
    currentOver,
    over,
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
        const t1Run = Number.parseInt(localStorage.getItem("t1run"), 10);
        const t1Wicket = Number.parseInt(localStorage.getItem("t1wicket"), 10);

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
          <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50 p-4">
            {showConfetti && (
              <div className="fixed inset-0 z-50 pointer-events-none">
                <Confetti />
              </div>
            )}
            <Winner />
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto p-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-blue-400" />
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-xl text-white mb-2">
                    Innings Over
                  </h5>
                  <p className="text-zinc-400 mb-4">
                    <span className="text-blue-400 font-semibold">
                      {localStorage.getItem("t1name")}
                    </span>{" "}
                    scored <span className="text-white font-bold">{run}</span>{" "}
                    runs and{" "}
                    <span className="text-white font-bold">{wicket}</span>{" "}
                    wicket(s)
                  </p>
                </div>

                {match === 1 && (
                  <Button
                    onClick={startSecondInning}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start 2nd Inning
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        )
      ) : (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
          {/* Match Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">🏏 Live Match</h1>
            <p className="text-zinc-400">
              {match === 1 ? "First" : "Second"} Innings: {inning} batting
            </p>
          </div>

          {/* Main Game Container */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Score Display */}
            <div className="lg:col-span-1">
              <CurrentScore />
            </div>

            {/* Game Controls */}
            <div className="lg:col-span-2 space-y-6">
              <Runs />
              <Controls />
            </div>
          </div>

          {/* Voice Feature Info */}
          <SpeechFeatureInfo />
        </div>
      )}

      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Voice />
      </div>
    </>
  );
}

export default CrickContainer;
