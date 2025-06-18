import { useContext } from "react"
import { Context } from "../../store/Context"
import { handleWick } from "../../utils/handleWick.js"
import { handleSpecialClick } from "../../utils/handleSpecialClick.js"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, AlertTriangle } from "lucide-react"

function Controls() {
  const { wicket, setWicket, over, ball, setBall, setRun, run, currentRun, currentOver, setCurrentRun } =
    useContext(Context)

  function handleWickWrapper(value, msg = "W") {
    handleWick(value, msg, setWicket, setBall, setCurrentRun, wicket, currentOver, over)
  }

  function undo() {
    if (currentRun.length > 0) {
      const lastEntry = currentRun[currentRun.length - 1]
      const newCurrentRun = currentRun.slice(0, -1)
      setCurrentRun(newCurrentRun)

      if (lastEntry === "W" && wicket > 0) {
        setWicket((prevWicket) => prevWicket - 1)
        if (ball > 0) setBall((prevBall) => prevBall - 1)
      } else if (lastEntry === "Dot" && ball > 0) {
        setBall((prevBall) => prevBall - 1)
      } else if (lastEntry === "Wide" || lastEntry === "No ball") {
        setRun((prevRun) => prevRun - 1)
      } else if (!isNaN(lastEntry)) {
        setRun((prevRun) => prevRun - Number.parseInt(lastEntry))
        if (ball > 0) setBall((prevBall) => prevBall - 1)
      }
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Match Controls</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button
            variant="secondary"
            onClick={() => handleWickWrapper(0, "Dot")}
            className="bg-zinc-700 hover:bg-zinc-600 text-white"
          >
            Dot Ball
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleWickWrapper(1, "W")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Wicket
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSpecialClick("Wide", setBall, setRun, setCurrentRun, currentOver, over, wicket)}
            className="bg-zinc-800 border-zinc-700 text-white hover:text-white hover:bg-orange-600 hover:border-orange-500"
          >
            Wide
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSpecialClick("No ball", setBall, setRun, setCurrentRun, currentOver, over, wicket)}
            className="bg-zinc-800 border-zinc-700 text-white hover:text-white hover:bg-orange-600 hover:border-orange-500"
          >
            No Ball
          </Button>

          <Button
            variant="ghost"
            onClick={undo}
            className="text-zinc-300 hover:bg-zinc-700 hover:text-white col-span-2 md:col-span-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-zinc-500">Use these controls for special situations</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default Controls
