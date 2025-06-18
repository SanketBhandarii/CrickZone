import { useContext } from "react"
import { Context } from "../../store/Context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock } from "lucide-react"

function CurrentScore() {
  const { run, wicket, match, inning, currentRun, currentOver, over, ball } = useContext(Context)

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Live Score</h3>
        </div>

        <div className="text-center space-y-4">
          {/* Current Run Display */}
          <div className="flex gap-2 justify-center flex-wrap">
            {currentRun.map((r, index) => (
              <Badge
                key={index}
                className={`${
                  r === "W"
                    ? "bg-red-500/20 text-red-400 border-red-500/20"
                    : r === 6
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/20"
                      : "bg-zinc-700/50 text-zinc-300 border-zinc-700/50"
                }`}
              >
                {r}
              </Badge>
            ))}
          </div>

          {/* Team Batting */}
          <div>
            <p className="text-lg mb-2 text-white">
              <span className="text-blue-400 font-semibold">{inning}</span> Is Batting 🏏
            </p>
            <div className="text-5xl font-bold text-white mb-2">
              {run}/{wicket}
            </div>
            <p className="text-zinc-400">runs/wickets</p>
          </div>

          {/* Over Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-zinc-400" />
              <span className="text-zinc-400 text-sm">
                Over: {currentOver}.{ball}/{over}
              </span>
            </div>
          </div>

          {/* Target Display */}
          {match == 2 && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 font-semibold">
                Target: {Number.parseInt(localStorage.getItem("t1run")) + 1}
              </p>
              <p className="text-zinc-400 text-sm">
                Need {Number.parseInt(localStorage.getItem("t1run")) + 1 - run} runs in{" "}
                {(over - currentOver) * 6 - ball} balls
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentScore
