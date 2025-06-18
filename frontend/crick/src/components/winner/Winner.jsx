import { useContext, useEffect } from "react"
import { Context } from "../../store/Context"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Home, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"

function Winner() {
  const { run, wicket, inning, t2name, matchWinner, setTossWinner, over, setUserMatchInfo, userMatchInfo } =
    useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    const t1name = localStorage.getItem("t1name")
    setTossWinner("")
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    async function addMatch() {
      if (!matchWinner) {
        return
      }
      try {
        const req = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/match/createMatch`,
          {
            date: formattedDate,
            over: over,
            teams: `${t1name} vs ${inning}`,
            result: matchWinner,
          },
          { withCredentials: true },
        )
      } catch (error) {
        console.error("Error adding match:", error)
      }
    }

    addMatch()
  }, [matchWinner])

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header - Compact */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h1 className="text-lg font-semibold text-white">Match Complete</h1>
              </div>
              <p className="text-green-400 font-medium">{matchWinner}</p>
            </div>

            {/* Scores - Compact Grid */}
            <div className="grid grid-cols-3 gap-3 items-center">
              <div className="text-center p-3 bg-zinc-800 rounded-lg">
                <p className="text-zinc-400 text-xs mb-1">{localStorage.getItem("t1name")}</p>
                <p className="text-lg font-bold text-white">
                  {localStorage.getItem("t1run")}/{localStorage.getItem("t1wicket")}
                </p>
              </div>

              <div className="text-center">
                <span className="text-zinc-500 text-sm font-medium">VS</span>
              </div>

              <div className="text-center p-3 bg-zinc-800 rounded-lg">
                <p className="text-zinc-400 text-xs mb-1">{inning}</p>
                <p className="text-lg font-bold text-white">
                  {run}/{wicket}
                </p>
              </div>
            </div>

            {/* Match Info - Single Line */}
            <div className="flex justify-between items-center text-xs text-zinc-400 px-2">
              <span>{over} Overs • Match</span>
              <span>📸 Screenshot ready</span>
            </div>

            {/* Actions - Compact */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => navigate("/usermatches")}
                variant="outline"
                size="sm"
                className="bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                <Home className="w-4 h-4 mr-1" />
                History
              </Button>
              <Button
                onClick={() => navigate("/zone/play")}
                size="sm"
                className="bg-white text-black hover:bg-zinc-200"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                New Match
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Winner
