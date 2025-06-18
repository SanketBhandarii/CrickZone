import { useContext, useEffect, useState } from "react"
import { Context } from "../../store/Context"
import { handleClick } from "../../utils/handleClick.js"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"
import crick from "../../assets/6-audio.mp3"
import wick from "../../assets/W-audio.mp3"

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
  } = useContext(Context)

  const [aud, setAud] = useState(false)

  useEffect(() => {
    if (ball === 6 && currentOver < over) {
      if (currentOver === over - 1) {
        const currentTeam = localStorage.getItem("t1name")
        if (t2name !== currentTeam) {
          setInning(t2name)
        } else if (t1name !== currentTeam) {
          setInning(t1name)
        }
      }
      setCurrentRun([`${currentOver + 1} over completed`])
      setCurrentOver((prev) => prev + 1)
      setBall(0)
      setTimeout(() => {
        setCurrentRun([])
      }, 2000)
    }
  }, [ball])

  useEffect(() => {
    if (currentRun.at(-1) == 6 || currentRun.at(-1) == "W") {
      setAud(true)
      setTimeout(() => {
        setAud(false)
      }, 6080)
    }
  }, [currentRun, setCurrentRun, run, setRun])

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Score Runs</h3>
        </div>

        {aud ? (
          <audio autoPlay loop>
            <source src={currentRun.at(-1) == "W" ? wick : crick} type="audio/mp3" />
          </audio>
        ) : null}

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((value) => (
            <Button
              key={value}
              variant="outline"
              className={`aspect-auto text-xl font-bold bg-zinc-800 border-zinc-700 hover:bg-neutral-700 transition-all transform hover:text-white shadow-lg hover:shadow-2xl ${
                value === 4
                  ? "text-blue-400 hover:bg-blue-500/20"
                  : value === 6
                    ? "text-yellow-400 hover:bg-yellow-500/20"
                    : "text-white"
              }`}
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
                  setMatchWinner,
                )
              }
            >
              {value}
            </Button>
          ))}
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-500">Tap to score runs</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Runs
