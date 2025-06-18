import { useContext, useEffect, useState } from "react"
import { Context } from "../../../store/Context"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Crown, BoltIcon as Bat, Shield } from "lucide-react"

function ChooseFor() {
  const [decision, setDecision] = useState("")
  const { tossWinner, setInning, t2name, t1name, teamInfo, inning } = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if (!tossWinner || !teamInfo) {
      navigate("/zone")
    }
  }, [tossWinner, teamInfo, navigate])

  useEffect(() => {
    if (inning) {
      localStorage.setItem("t1name", inning)
    }
  }, [inning])

  const handleDecisionChange = (choice) => {
    setDecision(choice)

    const newInning =
      choice === "Batting"
        ? tossWinner
        : tossWinner === t2name
        ? t1name
        : t2name

    setInning(newInning)
    localStorage.setItem("t1name", newInning)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (decision) {
      navigate("/zone/play")
    } else {
      alert("Please select Batting or Bowling.")
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">🏏 Match Setup</h1>
        <p className="text-zinc-400">Make your strategic choice</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4">
        <Badge variant="secondary" className="bg-zinc-800">1. Teams</Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge variant="secondary" className="bg-zinc-800">2. Toss</Badge>
        <div className="w-8 h-px bg-zinc-700" />
        <Badge variant="default" className="bg-blue-600">3. Choose</Badge>
      </div>

      {/* Main Card */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Toss Winner</h3>
          </div>

          <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg mb-6">
            <p className="text-yellow-400">
              <span className="font-semibold">{tossWinner}</span>, you won the toss! What do you choose?
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-zinc-300">It's Your Call!</h4>

              <RadioGroup
                value={decision}
                onValueChange={handleDecisionChange}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <RadioGroupItem value="Batting" id="batting" className="text-white"/>
                  <Label htmlFor="batting" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <Bat className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-xl">Batting</div>
                      <div className="text-sm text-zinc-400">Set a target for your opponent</div>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 transition-colors">
                  <RadioGroupItem value="Bowling" id="bowling" className="text-white"/>
                  <Label htmlFor="bowling" className="flex items-center gap-3 cursor-pointer flex-1">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-xl">Bowling</div>
                      <div className="text-sm text-zinc-400">Restrict and chase the target</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {decision && (
              <div className="text-center p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm">
                  {tossWinner} will {decision === "Batting" ? "bat" : "bowl"} first
                </p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
              disabled={!decision}
            >
              🚀 Start Match
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-zinc-300 mb-2">💡 Quick Tips:</h4>
        <ul className="text-xs text-zinc-500 space-y-1">
          <li>• Batting first lets you set a target without pressure</li>
          <li>• Bowling first lets you know exactly what to chase</li>
        </ul>
      </div>
    </div>
  )
}

export default ChooseFor
